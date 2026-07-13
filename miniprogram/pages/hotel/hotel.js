// pages/hotel/hotel.js 京东酒旅频道页（酒店/机票/门票/度假）
const { jdTravel } = require('../../mock/data.js');

Page({
  data: {
    banner: {},
    tabs: [],
    activeTab: 0,
    hotels: [],
    flights: [],
    tickets: [],
    holidays: [],
  },

  onLoad(options) {
    this.setData({
      banner: jdTravel.banner,
      tabs: jdTravel.tabs,
      hotels: jdTravel.hotels,
      flights: jdTravel.flights,
      tickets: jdTravel.tickets,
      holidays: jdTravel.holidays,
    });
    // 支持从攻略页带 tab 参数进入
    if (options && options.tab) {
      const idx = Number(options.tab);
      if (!isNaN(idx) && idx >= 0 && idx < jdTravel.tabs.length) {
        this.setData({ activeTab: idx });
      }
    }
  },

  onSwitchTab(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.idx) });
  },

  // 预订酒店：搭子拼房再减
  onBook(e) {
    const name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '京东酒旅预订',
      content: `即将预订「${name}」\n邀请搭子拼房可再减 100 元，并叠加 PLUS 返京豆。`,
      confirmText: '确认预订',
      confirmColor: '#e1251b',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '已提交预订，返京豆到账', icon: 'none' });
        }
      },
    });
  },

  // 抢票/预警
  onGrab(e) {
    const name = e.currentTarget.dataset.name;
    wx.showToast({ title: `已加入「${name}」低价监控`, icon: 'none' });
  },

  // 门票/度假下单
  onOrder(e) {
    const name = e.currentTarget.dataset.name;
    wx.showToast({ title: `「${name}」已加入购物车`, icon: 'none' });
  },

  onShareAppMessage() {
    return { title: 'PLUS会员酒旅专享，订酒店最高返8%京豆', path: '/pages/hotel/hotel' };
  },
});