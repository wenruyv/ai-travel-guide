// 个人中心
const app = getApp();
const mock = require('../../mock/data.js');

Page({
  data: {
    user: {},
    stats: { guides: 3, buddies: 5, checkins: 12 },
    membership: {},
    growthPercent: 0,
    tasks: {},
    menus: [
      { icon: '📝', name: '我的攻略' },
      { icon: '📋', name: '我复制的' },
      { icon: '👥', name: '我的搭子' },
      { icon: '💰', name: '我的旅账' },
      { icon: '🛒', name: '京东酒旅订单' },
      { icon: '⚙️', name: '设置' },
    ],
  },
  onLoad() {
    const m = mock.membership;
    this.setData({
      user: app.globalData.userInfo,
      membership: m,
      growthPercent: Math.min(100, Math.round((m.growth / m.nextLevel) * 100)),
      tasks: mock.tasks,
    });
  },
  // 前往京东酒旅频道
  goHotel() {
    wx.navigateTo({ url: '/pages/hotel/hotel' });
  },
  // 每日签到领京豆
  onSignIn() {
    if (this.data.tasks.signedToday) {
      wx.showToast({ title: '今日已签到', icon: 'none' });
      return;
    }
    const days = this.data.tasks.signInDays + 1;
    const bean = this.data.membership.bean + 5;
    this.setData({ 'tasks.signedToday': true, 'tasks.signInDays': days, 'membership.bean': bean });
    wx.showToast({ title: '签到成功 +5京豆', icon: 'none' });
  },
  // 完成任务
  onTask(e) {
    const id = e.currentTarget.dataset.id;
    const list = this.data.tasks.list.map((t) => {
      if (t.id === id && !t.done) {
        t.done = true;
        t.cta = '已完成';
      }
      return t;
    });
    const task = this.data.tasks.list.find((t) => t.id === id);
    const bean = this.data.membership.bean + (task ? task.reward : 0);
    this.setData({ 'tasks.list': list, 'membership.bean': bean });
    wx.showToast({ title: `任务完成 +${task.reward}京豆`, icon: 'none' });
  },
  onChat() {
    wx.navigateTo({ url: '/pages/chat/chat' });
  },
  onMenu(e) {
    const name = e.currentTarget.dataset.name;
    if (name === '京东酒旅订单') {
      this.goHotel();
      return;
    }
    wx.showToast({ title: `${name}(开发中)`, icon: 'none' });
  },
});