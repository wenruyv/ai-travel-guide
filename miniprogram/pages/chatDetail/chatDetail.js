const mock = require('../../mock/data.js');

const STORE_KEY = 'chat_conversations';

// 读取会话（storage 优先，回落到 mock 初始数据）
function loadConversations() {
  const saved = wx.getStorageSync(STORE_KEY);
  if (saved && saved.length) return saved;
  const init = JSON.parse(JSON.stringify(mock.conversations || []));
  wx.setStorageSync(STORE_KEY, init);
  return init;
}

function saveConversations(list) {
  wx.setStorageSync(STORE_KEY, list);
}

function nowTime() {
  const d = new Date();
  const p = (n) => (n < 10 ? '0' + n : '' + n);
  return p(d.getHours()) + ':' + p(d.getMinutes());
}

Page({
  data: {
    convId: '',
    name: '',
    avatar: '💬',
    messages: [],
    input: '',
    scrollTop: 0,
  },

  onLoad(options) {
    const name = options.name ? decodeURIComponent(options.name) : '对话';
    const avatar = options.avatar ? decodeURIComponent(options.avatar) : '💬';
    const preset = options.preset ? decodeURIComponent(options.preset) : '';
    const convId = options.id || ('conv_' + name);

    wx.setNavigationBarTitle({ title: name });

    let list = loadConversations();
    let conv = list.find((c) => c.id === convId || c.name === name);
    if (!conv) {
      conv = { id: convId, name, avatar, lastMsg: '', time: nowTime(), unread: 0, messages: [] };
      list.unshift(conv);
    }
    conv.unread = 0;

    // 发起邀约等场景：自动发送一条预置消息
    if (preset) {
      conv.messages.push({ from: 'me', text: preset, time: nowTime() });
      conv.lastMsg = preset;
      conv.time = nowTime();
      // 模拟对方自动回复
      const reply = '收到你的消息啦，我们详细聊聊行程吧～';
      conv.messages.push({ from: 'other', text: reply, time: nowTime() });
      conv.lastMsg = reply;
    }

    saveConversations(list);

    this.setData({
      convId: conv.id,
      name: conv.name,
      avatar: conv.avatar,
      messages: conv.messages,
    });
    this.scrollBottom();
  },

  onInput(e) {
    this.setData({ input: e.detail.value });
  },

  send() {
    const text = (this.data.input || '').trim();
    if (!text) return;
    const t = nowTime();
    let list = loadConversations();
    let conv = list.find((c) => c.id === this.data.convId);
    if (!conv) return;
    conv.messages.push({ from: 'me', text, time: t });
    conv.lastMsg = text;
    conv.time = t;
    conv.unread = 0;
    saveConversations(list);
    this.setData({ messages: conv.messages, input: '' });
    this.scrollBottom();

    // 模拟对方延迟回复
    setTimeout(() => {
      let l2 = loadConversations();
      let c2 = l2.find((c) => c.id === this.data.convId);
      if (!c2) return;
      const reply = '好的，收到～稍后我详细回复你哈！';
      c2.messages.push({ from: 'other', text: reply, time: nowTime() });
      c2.lastMsg = reply;
      c2.time = nowTime();
      saveConversations(l2);
      this.setData({ messages: c2.messages });
      this.scrollBottom();
    }, 800);
  },

  scrollBottom() {
    this.setData({ scrollTop: 999999 + Math.random() });
  },
});