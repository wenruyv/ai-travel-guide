// 发现页：推荐打卡帖子信息流
const mock = require('../../mock/data.js');

Page({
  data: {
    tabs: ['推荐', '附近', '关注'],
    tabIndex: 0,
    list: [],
  },
  onLoad() {
    this.refresh();
  },
  onShow() {
    // 从打卡页发帖后返回，刷新推荐流
    this.refresh();
  },
  refresh() {
    // 推荐：按点赞热度排序
    const list = mock.checkins.slice().sort((a, b) => b.likes - a.likes);
    this.setData({ list });
  },
  switchTab(e) {
    const idx = e.currentTarget.dataset.idx;
    let list = mock.checkins.slice();
    if (idx === 0) list = list.sort((a, b) => b.likes - a.likes); // 推荐=热度
    else if (idx === 1) list = list.sort(() => Math.random() - 0.5); // 附近=随机
    else list = list.slice(0, 2); // 关注=前两条
    this.setData({ tabIndex: idx, list });
  },
  // 点赞
  onLike(e) {
    const id = e.currentTarget.dataset.id;
    const list = this.data.list.map((p) => {
      if (p.id === id) {
        p.liked = !p.liked;
        p.likes += p.liked ? 1 : -1;
      }
      return p;
    });
    this.setData({ list });
  },
  // 去打卡页
  // 跳转到 AI 攻略生成页（发现页顶部入口）
  goAiGuide() {
    wx.navigateTo({ url: '/pages/aiGuide/aiGuide' });
  },
  goCheckin() {
    wx.navigateTo({ url: '/pages/checkin/checkin' });
  },
  // 查看详情：只显示当前这一条帖子
  viewPost(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/postDetail/postDetail?id=' + id });
  },
});