// 搭子广场：四维筛选(地点/时间/兴趣/预算)
const mock = require('../../mock/data.js');

Page({
  data: {
    all: [],
    list: [],
    filters: { place: '', interest: '', budget: '' },
    interestOptions: ['不限', '徒步', '摄影', '美食', '文艺', '钓鱼', '露营'],
    budgetOptions: ['不限', '1000以下', '1000-3000', '3000以上'],
    interestIndex: 0,
    budgetIndex: 0,
  },
  onLoad() {
    // 给每个搭子预计算攻略摘要字段（封面/标题/目的地/天数）
    const enriched = (mock.buddies || []).map((b) => {
      const g = b.guideId ? mock.guides.find((x) => x.id === b.guideId) : null;
      return {
        ...b,
        guideCover: g ? g.cover : '',
        guideTitle: g ? g.title : '',
        guideDestination: g ? g.destination : '',
        guideDays: g ? g.days : 0,
      };
    });
    this.setData({ all: enriched, list: enriched });
  },
  // 跳转到攻略详情（带 from=buddy，让攻略页显示「邀请搭子」入口）
  onOpenGuide(e) {
    const gid = e.currentTarget.dataset.gid;
    if (!gid) return;
    wx.navigateTo({ url: '/pages/guide/detail/detail?id=' + gid + '&from=buddy' });
  },
  // 未选攻略的搭子：跳到 postBuddy 让用户帮选一份
  onPickGuide(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/postBuddy/postBuddy?pickGuideFor=' + id });
  },
  onPlaceInput(e) {
    this.setData({ 'filters.place': e.detail.value });
  },
  onInterestChange(e) {
    const idx = e.detail.value;
    const val = this.data.interestOptions[idx];
    this.setData({ interestIndex: idx, 'filters.interest': val === '不限' ? '' : val });
  },
  onBudgetChange(e) {
    const idx = e.detail.value;
    this.setData({ budgetIndex: idx, 'filters.budget': this.data.budgetOptions[idx] });
  },
  onFilter() {
    const { place, interest } = this.data.filters;
    const list = this.data.all.filter((b) => {
      const okPlace = !place || b.destination.includes(place);
      const okInterest = !interest || b.interests.includes(interest);
      return okPlace && okInterest;
    });
    this.setData({ list });
    wx.showToast({ title: `匹配到 ${list.length} 位搭子`, icon: 'none' });
  },
  onInvite(e) {
    const ds = e.currentTarget.dataset;
    const name = ds.name;
    const dest = ds.dest || '';
    const buddy = this.data.all.find((b) => b.id === ds.id) || {};
    wx.showModal({
      title: '与「' + name + '」拼成同行',
      content: `你们将共同建立旅行空间，攻略【${buddy.guideId ? this._guideTitle(buddy.guideId) : '未选'}】将作为本次出行路线骨架。`,
      confirmText: '拼成',
      success: (r) => {
        if (!r.confirm) return;
        // 1. 自动建空间
        const space = this._createSpaceOnPair(buddy);
        // 2. 建/复用会话并写回 spaceId
        const convId = 'conv_' + (ds.id || name);
        const conv = this._linkSpaceToConv(convId, space.id, name, ds.avatar, dest);
        // 3. 跳转到聊天详情
        const preset = `你好${name}，看到你要去${dest}，我按攻略【${space.title}】建了咱们的旅行空间，一起共编吧！`;
        wx.navigateTo({
          url:
            '/pages/chatDetail/chatDetail?id=' + conv.id +
            '&name=' + encodeURIComponent(name) +
            '&avatar=' + encodeURIComponent(ds.avatar || '🧳') +
            '&preset=' + encodeURIComponent(preset) +
            '&spaceId=' + space.id,
        });
      },
    });
  },

  _guideTitle(gid) {
    const g = mock.guides.find((g) => g.id === gid);
    return g ? g.title : '未选';
  },

  // 拼成时自动建空间（mock：写入 storage，真实场景用后端 API）
  _createSpaceOnPair(buddy) {
    const guide = mock.guides.find((g) => g.id === buddy.guideId) || {};
    const space = {
      id: 'sp_' + Date.now(),
      guideId: buddy.guideId,
      title: (buddy.destination || guide.destination || '未命名') + '之旅',
      cover: guide.cover || '🧳',
      destination: buddy.destination || guide.destination || '',
      days: guide.days || 0,
      budget: guide.budget || 0,
      travelDate: buddy.dateRange || '',
      createdAt: new Date().toISOString().slice(0, 10),
      members: [
        { id: 'u1', nickname: '我', avatar: '🧑', role: 'member',
          creditScore: 92, pastTrips: 3, tags: ['靠谱', '准时'] },
        { id: buddy.id, nickname: buddy.nickname, avatar: buddy.avatar, role: 'member',
          creditScore: 88, pastTrips: 2, tags: buddy.interests || ['新搭子'] },
      ],
    };
    try {
      const spaces = wx.getStorageSync('travelSpaces') || [];
      spaces.push(space);
      wx.setStorageSync('travelSpaces', spaces);
    } catch (e) {}
    return space;
  },

  _linkSpaceToConv(convId, spaceId, name, avatar, dest) {
    try {
      const convMap = wx.getStorageSync('conversationSpace') || {};
      convMap[convId] = spaceId;
      wx.setStorageSync('conversationSpace', convMap);
    } catch (e) {}
    return { id: convId, spaceId, name, avatar, dest };
  },
  onPost() {
    wx.navigateTo({ url: '/pages/postBuddy/postBuddy' });
  },
});