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
    this.setData({ all: mock.buddies, list: mock.buddies });
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
    wx.showModal({
      title: '发起邀约',
      content: `向「${name}」发送同行邀约并开私聊？`,
      confirmText: '发送',
      success: (r) => {
        if (!r.confirm) return;
        const preset = `你好${name}，看到你要去${dest}，我想结伴同行，方便一起吗？`;
        wx.navigateTo({
          url:
            '/pages/chatDetail/chatDetail?id=conv_' +
            (ds.id || name) +
            '&name=' +
            encodeURIComponent(name) +
            '&avatar=' +
            encodeURIComponent(ds.avatar || '🧳') +
            '&preset=' +
            encodeURIComponent(preset),
        });
      },
    });
  },
  onPost() {
    wx.showToast({ title: '发布搭子需求(开发中)', icon: 'none' });
  },
});