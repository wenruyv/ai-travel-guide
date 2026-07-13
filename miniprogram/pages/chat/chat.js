const mock = require('../../mock/data.js');

const STORE_KEY = 'chat_conversations';
const BILL_KEY = 'bill_entries_v2';

function loadConversations() {
  const saved = wx.getStorageSync(STORE_KEY);
  if (saved && saved.length) return saved;
  const init = JSON.parse(JSON.stringify(mock.conversations || []));
  wx.setStorageSync(STORE_KEY, init);
  return init;
}

function loadBillEntries() {
  // 优先用新版本地记账，没有就降级到 mock.bill
  const saved = wx.getStorageSync(BILL_KEY);
  if (saved && saved.length) return saved;
  return (mock.bill && mock.bill.entries) || [];
}

function loadBillMembers() {
  return (mock.bill && mock.bill.members) || [];
}

Page({
  data: {
    conversations: [],
    billSummary: {
      subTitle: '',
      netAmount: '0.00',
      netClass: 'bh-neutral',
      tipText: '查看详情',
    },
  },

  onShow() {
    this.setData({ conversations: loadConversations() });
    this.refreshBillSummary();
  },

  // 算"我的旅账"摘要：未结账笔数 + 我的净额
  refreshBillSummary() {
    const entries = loadBillEntries();
    const members = loadBillMembers();
    const myId = 'u1';
    if (!entries.length || !members.length) {
      this.setData({
        billSummary: { subTitle: '还没有记账', netAmount: '0.00', netClass: 'bh-neutral', tipText: '去记一笔 ›' },
      });
      return;
    }
    // 1. 算每人净额
    const perPerson = entries.reduce((s, e) => s + e.amount, 0) / members.length;
    const paid = {};
    members.forEach((m) => (paid[m.id] = 0));
    entries.forEach((e) => (paid[e.payerId] = (paid[e.payerId] || 0) + e.amount));
    const myNet = +(paid[myId] - perPerson).toFixed(2);

    // 2. 算还有几笔未结清（>0.01 的人头差）
    const balances = members.map((m) => +(paid[m.id] - perPerson).toFixed(2));
    const unsettled = balances.filter((b) => Math.abs(b) > 0.01).length;

    const subTitle = `${entries.length}笔 · ${members.length}人共池`;
    let netClass = 'bh-neutral';
    let tipText = '查看详情 ›';
    if (myNet > 0.01) {
      netClass = 'bh-pos';
      tipText = `应收 ¥${myNet.toFixed(2)} · ${unsettled}人待结 ›`;
    } else if (myNet < -0.01) {
      netClass = 'bh-neg';
      tipText = `应付 ¥${Math.abs(myNet).toFixed(2)} · 去结账 ›`;
    } else {
      tipText = '已经AA平账 🎉';
    }
    this.setData({
      billSummary: {
        subTitle,
        netAmount: myNet.toFixed(2),
        netClass,
        tipText,
      },
    });
  },

  openChat(e) {
    const c = e.currentTarget.dataset.conv;
    const url =
      '/pages/chatDetail/chatDetail?id=' +
      c.id +
      '&name=' +
      encodeURIComponent(c.name) +
      '&avatar=' +
      encodeURIComponent(c.avatar);
    wx.navigateTo({ url });
  },

  // 跳转到旅账详情页（复用原 bill 页面）
  onOpenBill() {
    wx.navigateTo({ url: '/pages/bill/bill' });
  },
});