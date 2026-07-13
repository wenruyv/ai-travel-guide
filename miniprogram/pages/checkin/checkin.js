// 打卡：统一为"帖子"形式，支持多图上传 + 评论 + 点赞
const mock = require('../../mock/data.js');

Page({
  data: {
    all: [],
    // 发帖弹窗
    showPost: false,
    form: { location: '', note: '', images: [], tags: '' },
    // 评论输入
    commentBoxId: '',
    commentText: '',
  },
  onLoad() {
    this.setData({ all: mock.checkins });
  },

  // 打开发帖
  openPost() {
    this.setData({ showPost: true, form: { location: '', note: '', images: [], tags: '' } });
  },
  closePost() {
    this.setData({ showPost: false });
  },
  // 选择多张图片（用 emoji 占位模拟上传）
  chooseImages() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        // Demo：用占位图标代表已上传的图片
        const placeholders = ['🖼️', '📷', '🌄', '🏞️', '🌅', '🎞️', '🏔️', '🌊', '⛺'];
        const cur = this.data.form.images;
        const add = res.tempFilePaths.map((p, i) => placeholders[(cur.length + i) % placeholders.length]);
        this.setData({ 'form.images': cur.concat(add) });
      },
      fail: () => {
        // 开发者工具未授权时，直接追加一个占位图
        const cur = this.data.form.images;
        const placeholders = ['🖼️', '📷', '🌄', '🏞️', '🌅'];
        this.setData({ 'form.images': cur.concat(placeholders[cur.length % placeholders.length]) });
      },
    });
  },
  removeImage(e) {
    const idx = e.currentTarget.dataset.idx;
    const images = this.data.form.images.filter((_, i) => i !== idx);
    this.setData({ 'form.images': images });
  },
  onLocation(e) {
    this.setData({ 'form.location': e.detail.value });
  },
  onNote(e) {
    this.setData({ 'form.note': e.detail.value });
  },
  onTags(e) {
    this.setData({ 'form.tags': e.detail.value });
  },
  // 发布帖子
  publishPost() {
    const f = this.data.form;
    if (!f.location) {
      wx.showToast({ title: '请填写打卡地点', icon: 'none' });
      return;
    }
    if (f.images.length === 0) {
      wx.showToast({ title: '请至少上传一张图片', icon: 'none' });
      return;
    }
    const post = {
      id: 'c' + Date.now(),
      type: '打卡',
      icon: '📍',
      author: '我',
      avatar: '😎',
      location: f.location,
      date: new Date().toISOString().slice(0, 10),
      images: f.images,
      note: f.note || '记录这一刻',
      tags: f.tags ? f.tags.split(/[,，\s]+/).filter(Boolean) : [],
      likes: 0,
      liked: false,
      comments: [],
    };
    mock.checkins.unshift(post);
    this.setData({ all: mock.checkins, showPost: false });
    wx.showToast({ title: '发布成功', icon: 'success' });
  },

  // 点赞
  onLike(e) {
    const id = e.currentTarget.dataset.id;
    const all = this.data.all.map((p) => {
      if (p.id === id) {
        p.liked = !p.liked;
        p.likes += p.liked ? 1 : -1;
      }
      return p;
    });
    this.setData({ all });
  },

  // 展开/收起评论输入框
  toggleComment(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ commentBoxId: this.data.commentBoxId === id ? '' : id, commentText: '' });
  },
  onComment(e) {
    this.setData({ commentText: e.detail.value });
  },
  sendComment(e) {
    const id = e.currentTarget.dataset.id;
    const text = this.data.commentText.trim();
    if (!text) return;
    const all = this.data.all.map((p) => {
      if (p.id === id) p.comments = p.comments.concat({ user: '我', text });
      return p;
    });
    this.setData({ all, commentText: '', commentBoxId: '' });
  },

  viewMap() {
    wx.showToast({ title: '足迹地图(需地图组件)', icon: 'none' });
  },
});