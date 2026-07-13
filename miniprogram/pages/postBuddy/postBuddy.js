// pages/postBuddy/postBuddy.js
// 发布搭子需求：必填攻略（攻略即契约），拼成后自动建旅行空间
const mock = require('../../mock/data.js');

Page({
  data: {
    form: {
      nickname: '',
      avatar: '🧳',
      destination: '',
      dateRange: '',
      budget: '',
      interests: [],
      intro: '',
      guideId: '', // 必填
    },
    avatarOptions: ['🧳', '🧗', '🎒', '🏕️', '🎣', '🦌', '🌸', '🗼', '🧑', '🐱'],
    avatarIndex: 0,
    interestOptions: [
      { name: '徒步', selected: false },
      { name: '摄影', selected: false },
      { name: '美食', selected: false },
      { name: '文艺', selected: false },
      { name: '钓鱼', selected: false },
      { name: '露营', selected: false },
      { name: '自驾', selected: false },
      { name: '赏樱', selected: false },
      { name: '购物', selected: false },
      { name: '寺庙', selected: false },
      { name: '性价比', selected: false },
    ],
    guides: [],
    selectedGuide: null,
    showGuidePicker: false,
    canSubmit: false,
  },

  onLoad() {
    this.setData({ guides: mock.guides });
  },

  onNicknameInput(e) { this.setData({ 'form.nickname': e.detail.value }); this._checkCanSubmit(); },
  onDestInput(e)     { this.setData({ 'form.destination': e.detail.value }); this._checkCanSubmit(); },
  onDateInput(e)     { this.setData({ 'form.dateRange': e.detail.value }); this._checkCanSubmit(); },
  onBudgetInput(e)   { this.setData({ 'form.budget': e.detail.value }); this._checkCanSubmit(); },
  onIntroInput(e)    { this.setData({ 'form.intro': e.detail.value }); this._checkCanSubmit(); },

  onAvatarChange(e) {
    const idx = e.detail.value;
    this.setData({ avatarIndex: idx, 'form.avatar': this.data.avatarOptions[idx] });
  },

  onToggleInterest(e) {
    const name = e.currentTarget.dataset.name;
    const list = this.data.interestOptions.map((it) =>
      it.name === name ? { ...it, selected: !it.selected } : it
    );
    const interests = list.filter((it) => it.selected).map((it) => it.name);
    this.setData({ interestOptions: list, 'form.interests': interests });
    this._checkCanSubmit();
  },

  onPickGuide() {
    this.setData({ showGuidePicker: true });
  },
  onClosePicker() {
    this.setData({ showGuidePicker: false });
  },
  onSelectGuide(e) {
    const id = e.currentTarget.dataset.id;
    const selectedGuide = this.data.guides.find((g) => g.id === id) || null;
    // 自动同步目的地（如果用户还没填）
    const updates = { 'form.guideId': id, selectedGuide, showGuidePicker: false };
    if (selectedGuide && !this.data.form.destination) {
      updates['form.destination'] = selectedGuide.destination;
    }
    this.setData(updates);
    this._checkCanSubmit();
  },

  onAiGenerate() {
    wx.showModal({
      title: 'AI 生成攻略',
      content: '根据你的目的地和兴趣，让 AI 生成专属攻略（演示版将跳转到 aiGuide 页面）',
      success: (r) => {
        if (!r.confirm) return;
        wx.navigateTo({
          url: '/pages/aiGuide/aiGuide?auto=1&destination=' + encodeURIComponent(this.data.form.destination || '日本·关西'),
        });
      },
    });
  },

  _checkCanSubmit() {
    const f = this.data.form;
    const canSubmit =
      f.nickname && f.destination && f.dateRange && f.budget &&
      f.interests.length > 0 && f.intro && f.guideId;
    this.setData({ canSubmit });
  },

  onSubmit() {
    if (!this.data.canSubmit) {
      wx.showToast({ title: '请填写完整并选择攻略', icon: 'none' });
      return;
    }
    // mock：写入 storage（buddy.js 列表读自 storage 或 mock，本轮先 toast 提示）
    const newBuddy = { ...this.data.form, match: 80 };
    try {
      wx.setStorageSync('posted_buddies', wx.getStorageSync('posted_buddies') || []);
      const list = wx.getStorageSync('posted_buddies');
      list.push({ ...newBuddy, id: 'b' + Date.now(), postedAt: new Date().toISOString() });
      wx.setStorageSync('posted_buddies', list);
    } catch (e) {}
    wx.showToast({ title: '发布成功！', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 800);
  },
});