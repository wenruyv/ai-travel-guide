const mock = require('../../mock/data.js');

const STORE_KEY = 'chat_conversations';

function loadConversations() {
  const saved = wx.getStorageSync(STORE_KEY);
  if (saved && saved.length) return saved;
  const init = JSON.parse(JSON.stringify(mock.conversations || []));
  wx.setStorageSync(STORE_KEY, init);
  return init;
}

Page({
  data: {
    conversations: [],
  },

  onShow() {
    this.setData({ conversations: loadConversations() });
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
});