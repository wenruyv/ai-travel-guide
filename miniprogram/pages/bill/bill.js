// 旅账：多人记账 + 智能AA + 一键结算（数据源：本地 storage，与 chat 旅账摘要共享）
const mock = require('../../mock/data.js');

const STORE_KEY = 'bill_entries_v2';

function loadEntries() {
  const saved = wx.getStorageSync(STORE_KEY);
  if (saved && saved.length) return saved;
  // 首次进入：把 mock 数据搬进 storage
  const init = JSON.parse(JSON.stringify((mock.bill && mock.bill.entries) || []));
  wx.setStorageSync(STORE_KEY, init);
  return init;
}

function saveEntries(list) {
  wx.setStorageSync(STORE_KEY, list);
}

Page({
  data: {
    trip: {},
    entries: [],
    total: 0,
    perPerson: 0,
    categories: ['交通', '住宿', '餐饮', '门票', '购物', '其他'],
    showAdd: false,
    form: { amount: '', category: '交通', desc: '', payerIndex: 0 },
    settlements: [],
    showJd: false,
    jdOrders: [],
  },

  onShow() {
    this.setData({ jdOrders: mock.jdOrders || [] });
    this.compute();
  },

  compute() {
    const members = (mock.bill && mock.bill.members) || [];
    const tripName = (mock.bill && mock.bill.tripName) || '旅账';
    const entries = loadEntries();
    const total = entries.reduce((s, e) => s + e.amount, 0);
    const perPerson = members.length ? +(total / members.length).toFixed(2) : 0;
    this.setData({
      trip: { tripName, members },
      entries,
      total: +total.toFixed(2),
      perPerson,
    });
    this.calcSettlement(entries, members, perPerson);
  },

  // 智能AA：贪心配对（最大正+最大负 → 转账），最少笔数净转账
  calcSettlement(entries, members, perPerson) {
    const paid = {};
    members.forEach((m) => (paid[m.id] = 0));
    entries.forEach((e) => (paid[e.payerId] = (paid[e.payerId] || 0) + e.amount));
    const balances = members.map((m) => ({
      id: m.id,
      name: m.name,
      net: +(paid[m.id] - perPerson).toFixed(2),
    }));
    const debtors = balances.filter((b) => b.net < -0.01).map((b) => ({ ...b }));
    const creditors = balances.filter((b) => b.net > 0.01).map((b) => ({ ...b }));
    const result = [];
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const pay = Math.min(-debtors[i].net, creditors[j].net);
      result.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount: +pay.toFixed(2),
      });
      debtors[i].net += pay;
      creditors[j].net -= pay;
      if (Math.abs(debtors[i].net) < 0.01) i++;
      if (Math.abs(creditors[j].net) < 0.01) j++;
    }
    this.setData({ settlements: result });
  },

  openAdd() { this.setData({ showAdd: true }); },
  closeAdd() { this.setData({ showAdd: false }); },
  onAmount(e) { this.setData({ 'form.amount': e.detail.value }); },
  onDesc(e) { this.setData({ 'form.desc': e.detail.value }); },
  onCategory(e) { this.setData({ 'form.category': this.data.categories[e.detail.value] }); },
  onPayer(e) { this.setData({ 'form.payerIndex': e.detail.value }); },

  saveEntry() {
    const f = this.data.form;
    const amount = parseFloat(f.amount);
    if (!amount || amount <= 0) {
      wx.showToast({ title: '请输入正确金额', icon: 'none' });
      return;
    }
    const payer = this.data.trip.members[f.payerIndex];
    const list = loadEntries();
    list.unshift({
      id: 'e' + Date.now(),
      payer: payer.name,
      payerId: payer.id,
      amount,
      category: f.category,
      desc: f.desc || f.category,
      splitType: '均摊',
      date: new Date().toISOString().slice(0, 10),
    });
    saveEntries(list);
    this.setData({ showAdd: false, form: { amount: '', category: '交通', desc: '', payerIndex: 0 } });
    this.compute();
    wx.showToast({ title: '记账成功', icon: 'success' });
  },

  onSettle() {
    if (this.data.settlements.length === 0) {
      wx.showToast({ title: '已经AA平账啦', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '一键结算',
      content: '将按清单发起微信转账（Demo仅展示）',
      confirmText: '去结算',
      success: (r) => {
        if (r.confirm) wx.showToast({ title: '结算跳转(开发中)', icon: 'none' });
      },
    });
  },

  openJd() { this.setData({ showJd: true }); },
  closeJd() { this.setData({ showJd: false }); },

  importJd(e) {
    const order = this.data.jdOrders.find((o) => o.id === e.currentTarget.dataset.id);
    if (!order) return;
    const payer = this.data.trip.members[0];
    const catMap = { 住宿: '住宿', 门票: '门票', 装备: '购物' };
    const list = loadEntries();
    list.unshift({
      id: 'jd' + Date.now(),
      payer: payer.name,
      payerId: payer.id,
      amount: order.amount,
      category: catMap[order.category] || '其他',
      desc: '京东订单 · ' + order.name,
      splitType: '均摊',
      date: new Date().toISOString().slice(0, 10),
    });
    saveEntries(list);
    this.setData({ showJd: false });
    this.compute();
    wx.showToast({ title: '已导入并按人数均摊', icon: 'none' });
  },
});