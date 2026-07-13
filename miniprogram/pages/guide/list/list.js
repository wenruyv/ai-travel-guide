// 攻略社区列表页
const mock = require('../../../mock/data.js');

Page({
  data: {
    keyword: '',
    guides: [],
    allGuides: [],
  },
  onLoad() {
    this.setData({ guides: mock.guides, allGuides: mock.guides });
  },
  onInput(e) {
    this.setData({ keyword: e.detail.value });
  },
  // 关键词检索：标题/目的地/标签
  onSearch() {
    const kw = this.data.keyword.trim();
    if (!kw) {
      this.setData({ guides: this.data.allGuides });
      return;
    }
    const list = this.data.allGuides.filter((g) => {
      return (
        g.title.includes(kw) ||
        g.destination.includes(kw) ||
        g.tags.some((t) => t.includes(kw))
      );
    });
    this.setData({ guides: list });
  },
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/guide/detail/detail?id=${id}` });
  },
  onPublish() {
    wx.showToast({ title: '发布攻略(开发中)', icon: 'none' });
  },
});