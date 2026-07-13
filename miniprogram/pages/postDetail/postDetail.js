// 帖子详情：只显示当前这一条打卡帖子
const mock = require('../../mock/data.js');

Page({
  data: {
    post: null,
    commentText: '',
  },
  onLoad(options) {
    const id = options.id;
    const post = mock.checkins.find((p) => p.id === id) || null;
    this.setData({ post });
    if (post) {
      wx.setNavigationBarTitle({ title: post.location || '帖子详情' });
    }
  },
  // 私聊帖子作者
  onPrivateChat() {
    const post = this.data.post;
    if (!post) return;
    wx.navigateTo({
      url:
        '/pages/chatDetail/chatDetail?id=conv_post_' +
        post.id +
        '&name=' +
        encodeURIComponent(post.author || '作者') +
        '&avatar=' +
        encodeURIComponent(post.avatar || '💬'),
    });
  },
  // 点赞
  onLike() {
    const post = this.data.post;
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    this.setData({ post });
  },
  onComment(e) {
    this.setData({ commentText: e.detail.value });
  },
  sendComment() {
    const text = this.data.commentText.trim();
    if (!text) return;
    const post = this.data.post;
    post.comments = post.comments.concat({ user: '我', text });
    this.setData({ post, commentText: '' });
  },
});