// app.js 旅伴小程序全局逻辑
App({
  globalData: {
    userInfo: {
      nickname: '旅行者小J',
      avatar: '',
      bio: '走过山海，也想遇见同路人',
      tags: ['摄影', '徒步', '美食'],
    },
    // 全局当前旅程(供旅账/打卡共享)
    currentTrip: '2026 川西环线',
  },
  onLaunch() {
    // 预留:微信登录换取 token
    // wx.login(...) -> 调用后端 /api/auth/login
    console.log('旅伴小程序启动');
  },
});