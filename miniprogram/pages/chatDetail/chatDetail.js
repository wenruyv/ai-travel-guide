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
    space: null, // 已建空间
    spaceId: '',
    countdown: '', // 距离出发天数
  },

  onLoad(options) {
    const name = options.name ? decodeURIComponent(options.name) : '对话';
    const avatar = options.avatar ? decodeURIComponent(options.avatar) : '💬';
    const preset = options.preset ? decodeURIComponent(options.preset) : '';
    const convId = options.id || ('conv_' + name);
    const spaceId = options.spaceId || '';

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

    // 加载空间：storage 优先，mock 回退
    let space = null;
    if (spaceId) {
      const spaces = wx.getStorageSync('travelSpaces') || [];
      space = spaces.find((s) => s.id === spaceId) || null;
      if (!space) {
        // 从 mock 找
        space = (mock.travelSpaces || []).find((s) => s.id === spaceId) || null;
      }
      // 写回 convMap
      const convMap = wx.getStorageSync('conversationSpace') || {};
      convMap[convId] = spaceId;
      wx.setStorageSync('conversationSpace', convMap);
    } else {
      // 没传 spaceId 时尝试按 convId 查
      const convMap = wx.getStorageSync('conversationSpace') || {};
      const linked = convMap[convId];
      if (linked) {
        const spaces = wx.getStorageSync('travelSpaces') || [];
        space = spaces.find((s) => s.id === linked)
          || (mock.travelSpaces || []).find((s) => s.id === linked)
          || null;
      }
    }

    this.setData({
      convId: conv.id,
      name: conv.name,
      avatar: conv.avatar,
      messages: conv.messages,
      space,
      spaceId: space ? space.id : '',
      countdown: space ? this._countdown(space.travelDate) : '',
    });
    this.scrollBottom();
  },

  _countdown(dateRange) {
    if (!dateRange) return '';
    // 解析"10.01 - 10.07" 这种格式
    const m = dateRange.match(/(\d{1,2})\.(\d{1,2})/);
    if (!m) return '';
    const year = new Date().getFullYear();
    const target = new Date(year, parseInt(m[1]) - 1, parseInt(m[2]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `还有${diff}天出发`;
    if (diff === 0) return '今天出发';
    return `已出发${Math.abs(diff)}天`;
  },

  onOpenSpace() {
    if (!this.data.space) return;
    wx.navigateTo({
      url: '/pages/space/space?id=' + this.data.space.id + '&fromChat=1',
    });
  },

  onCreateSpace() {
    wx.showModal({
      title: '建旅行空间',
      content: '需要先选攻略（与搭子的路线契约），是否前往攻略库挑选？',
      success: (r) => {
        if (!r.confirm) return;
        wx.navigateTo({ url: '/pages/guide/list/list' });
      },
    });
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