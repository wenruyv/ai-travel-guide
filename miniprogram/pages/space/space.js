// pages/space/space.js
// 旅行空间：3 tab = 行程共编 / 旅帐差额AA / 成员信用
const mock = require('../../mock/data.js');

function loadSpaces() {
  const saved = wx.getStorageSync('travelSpaces');
  if (saved && saved.length) return saved;
  const init = JSON.parse(JSON.stringify(mock.travelSpaces || []));
  wx.setStorageSync('travelSpaces', init);
  return init;
}
function saveSpaces(list) { wx.setStorageSync('travelSpaces', list); }

function loadEdits() {
  return wx.getStorageSync('spaceEdits') || JSON.parse(JSON.stringify(mock.spaceEdits || []));
}
function saveEdits(list) { wx.setStorageSync('spaceEdits', list); }

function loadLedger() {
  return wx.getStorageSync('spaceLedger') || JSON.parse(JSON.stringify(mock.spaceLedger || []));
}
function saveLedger(list) { wx.setStorageSync('spaceLedger', list); }

const CATEGORIES = [
  { key: '交通', icon: '🚗' },
  { key: '住宿', icon: '🏨' },
  { key: '餐饮', icon: '🍜' },
  { key: '门票', icon: '🎫' },
  { key: '购物', icon: '🛍️' },
  { key: '其他', icon: '💰' },
];

Page({
  data: {
    space: null,
    guide: null,
    tab: 'plan', // plan | ledger | members
    tabs: [
      { key: 'plan',    label: '📝 行程' },
      { key: 'ledger',  label: '💰 旅帐' },
      { key: 'members', label: '👥 成员' },
    ],
    members: [],
    planNodes: [],     // 当前显示的行程节点（可能被共编改过）
    editNodeIdx: -1,
    editNoteDraft: '',
    edits: [],         // 当前 space 的共编留痕
    ledger: [],        // 当前 space 的账目
    settlements: [],   // 净转账结果
    memberStats: [],   // 成员累计付/应付/净转
    showAddLedger: false,
    newLedger: { title: '', amount: '', category: '餐饮', payerId: '', splits: [] },
    categories: CATEGORIES,
  },

  onLoad(options) {
    const id = options.id;
    if (!id) {
      wx.showToast({ title: '缺少 spaceId', icon: 'none' });
      return;
    }
    this.spaceId = id;
    this.refresh();
  },

  onShow() { this.refresh(); },

  refresh() {
    const spaces = loadSpaces();
    let space = spaces.find((s) => s.id === this.spaceId);
    if (!space) {
      space = (mock.travelSpaces || []).find((s) => s.id === this.spaceId);
    }
    if (!space) {
      wx.showToast({ title: '空间不存在', icon: 'none' });
      return;
    }
    const guide = mock.guides.find((g) => g.id === space.guideId) || null;
    // 行程节点：合并共编后的 note
    const allEdits = loadEdits();
    const spaceEdits = allEdits.filter((e) => e.spaceId === this.spaceId);
    const ledger = loadLedger().filter((l) => l.spaceId === this.spaceId);
    const planNodes = this._mergeEditsToNodes(guide ? guide.nodes : [], spaceEdits);
    const settlements = this._calcSettlements(space.members, ledger);
    const memberStats = this._calcMemberStats(space.members, ledger);

    this.setData({
      space,
      guide,
      members: space.members,
      planNodes,
      edits: spaceEdits.sort((a, b) => b.time.localeCompare(a.time)),
      ledger,
      settlements,
      memberStats,
    });
    wx.setNavigationBarTitle({ title: space.title });
  },

  // ===== 行程共编 =====
  onTab(e) {
    this.setData({ tab: e.currentTarget.dataset.tab });
  },
  onTapNode(e) {
    const idx = e.currentTarget.dataset.idx;
    this.setData({ editNodeIdx: idx, editNoteDraft: this.data.planNodes[idx].note || '' });
  },
  onEditNoteInput(e) {
    this.setData({ editNoteDraft: e.detail.value });
  },
  onCancelEdit() {
    this.setData({ editNodeIdx: -1, editNoteDraft: '' });
  },
  onSaveEdit() {
    const { editNodeIdx: idx, editNoteDraft, planNodes, space } = this.data;
    if (idx < 0) return;
    const oldVal = planNodes[idx].note || '';
    if (oldVal === editNoteDraft) {
      this.setData({ editNodeIdx: -1, editNoteDraft: '' });
      return;
    }
    // 1. 更新内存中的 node
    planNodes[idx].note = editNoteDraft;
    // 2. 追加留痕
    const allEdits = loadEdits();
    allEdits.push({
      id: 'e_' + Date.now(),
      spaceId: space.id,
      userId: 'u1', // 当前用户固定为 u1
      nodeIdx: idx,
      oldVal,
      newVal: editNoteDraft,
      time: new Date().toISOString().slice(0, 16).replace('T', ' '),
      reason: '成员共编',
    });
    saveEdits(allEdits);
    // 3. 持久化到 space（写入 noteOverrides 字段）
    this._persistNodeOverride(space.id, idx, editNoteDraft);
    wx.showToast({ title: '已留痕保存', icon: 'success' });
    this.setData({ editNodeIdx: -1, editNoteDraft: '', planNodes });
    this.refresh();
  },

  _persistNodeOverride(spaceId, idx, note) {
    const spaces = loadSpaces();
    const sp = spaces.find((s) => s.id === spaceId);
    if (!sp) return;
    sp.nodeOverrides = sp.nodeOverrides || {};
    sp.nodeOverrides[idx] = note;
    saveSpaces(spaces);
  },

  _mergeEditsToNodes(baseNodes, edits) {
    // 节点按 (day, seq) 排序
    const sorted = [...baseNodes].sort((a, b) => (a.day - b.day) || (a.seq - b.seq));
    // 末态 note = 最新一次 edit 的 newVal（按 time 升序）
    const latestByNode = {};
    for (const e of edits) {
      latestByNode[e.nodeIdx] = e.newVal;
    }
    return sorted.map((n, i) => ({ ...n, _idx: i, note: latestByNode[i] != null ? latestByNode[i] : n.note }));
  },

  // ===== 旅帐差额AA =====
  onShowAddLedger() {
    const me = this.data.space.members.find((m) => m.id === 'u1');
    this.setData({
      showAddLedger: true,
      newLedger: { title: '', amount: '', category: '餐饮', payerId: me ? me.id : 'u1', splits: this.data.space.members.map((m) => m.id) },
    });
  },
  onCloseAddLedger() { this.setData({ showAddLedger: false }); },

  onLedgerInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ ['newLedger.' + field]: e.detail.value });
  },
  onLedgerCategory(e) {
    this.setData({ 'newLedger.category': CATEGORIES[e.detail.value].key });
  },
  onLedgerPayer(e) {
    this.setData({ 'newLedger.payerId': this.data.space.members[e.detail.value].id });
  },
  onToggleSplit(e) {
    const id = e.currentTarget.dataset.id;
    const splits = this.data.newLedger.splits.includes(id)
      ? this.data.newLedger.splits.filter((s) => s !== id)
      : [...this.data.newLedger.splits, id];
    this.setData({ 'newLedger.splits': splits });
  },

  onSaveLedger() {
    const { newLedger, space } = this.data;
    if (!newLedger.title || !newLedger.amount || !newLedger.payerId || newLedger.splits.length === 0) {
      wx.showToast({ title: '请填完整', icon: 'none' });
      return;
    }
    const ledger = loadLedger();
    ledger.push({
      id: 'l_' + Date.now(),
      spaceId: space.id,
      title: newLedger.title,
      amount: Number(newLedger.amount),
      category: newLedger.category,
      payerId: newLedger.payerId,
      date: new Date().toISOString().slice(0, 10),
      splits: newLedger.splits,
    });
    saveLedger(ledger);
    wx.showToast({ title: '记一笔', icon: 'success' });
    this.setData({ showAddLedger: false });
    this.refresh();
  },

  // 差额AA核心算法：
  // 1. 每笔账目按 splits[] 平摊（amount / splits.length）
  // 2. 计算各人净额 = 已付 - 应付
  // 3. 净转账：贪心配对（最大正+最大负 → 转账），直到清零
  _calcSettlements(members, ledger) {
    const balance = {}; // {memberId: net}
    members.forEach((m) => { balance[m.id] = 0; });
    for (const e of ledger) {
      const share = e.amount / e.splits.length;
      balance[e.payerId] = (balance[e.payerId] || 0) + e.amount; // 垫付记正
      e.splits.forEach((sid) => {
        balance[sid] = (balance[sid] || 0) - share; // 应付记负
      });
    }
    // 贪心配对
    const positives = members.filter((m) => balance[m.id] > 0.01).map((m) => ({ id: m.id, amt: balance[m.id] })).sort((a, b) => b.amt - a.amt);
    const negatives = members.filter((m) => balance[m.id] < -0.01).map((m) => ({ id: m.id, amt: -balance[m.id] })).sort((a, b) => b.amt - a.amt);
    const settlements = [];
    let i = 0, j = 0;
    while (i < positives.length && j < negatives.length) {
      const pay = Math.min(positives[i].amt, negatives[j].amt);
      settlements.push({
        from: negatives[j].id, to: positives[i].id, amount: Math.round(pay * 100) / 100,
      });
      positives[i].amt -= pay;
      negatives[j].amt -= pay;
      if (positives[i].amt < 0.01) i++;
      if (negatives[j].amt < 0.01) j++;
    }
    return settlements.map((s) => ({
      ...s,
      fromName: this._memberName(s.from),
      toName: this._memberName(s.to),
    }));
  },

  _memberName(id) {
    const m = this.data.members.find((m) => m.id === id);
    return m ? m.nickname : id;
  },

  _calcMemberStats(members, ledger) {
    return members.map((m) => {
      const paid = ledger.filter((l) => l.payerId === m.id).reduce((s, l) => s + l.amount, 0);
      const share = ledger.reduce((s, l) => (l.splits.includes(m.id) ? s + l.amount / l.splits.length : s), 0);
      return {
        id: m.id, nickname: m.nickname, avatar: m.avatar,
        paid: Math.round(paid * 100) / 100,
        share: Math.round(share * 100) / 100,
        net: Math.round((paid - share) * 100) / 100,
      };
    });
  },

  // ===== 成员 =====
  onInviteMember() {
    wx.showToast({ title: '分享给搭子(开发中)', icon: 'none' });
  },
});