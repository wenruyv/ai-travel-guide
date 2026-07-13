// 攻略详情页：复制修改 + 就地问楼主（问答以小字列在每一步下面）
const mock = require('../../../mock/data.js');

Page({
  data: {
    guide: null,
    editable: false, // 是否为"复制后可编辑"态
    // 提问面板
    askVisible: false,
    askNodeIdx: -1,
    askNodeTitle: '',
    askInput: '',
    quickQs: [], // 该节点作者预设的常见问题（点一下就能问）
    // 每个节点下方展示的问答列表：{ [idx]: [{user,text,isAuthor}] }
    talks: {},
    // AI 行程助手
    aiVisible: false,
    aiMessages: [], // [{from, text}]
    aiPresets: (mock.aiAssistant && mock.aiAssistant.presets) || [],
    fromAi: false,
    rawCollapsed: true, // raw 召回笔记默认折叠
  },

  onLoad(query) {
    let guide = null;
    // 1. 本地攻略（含 g1-g5 结构化 + g6-g9 raw 笔记）
    guide = mock.guides.find((g) => g.id === query.id);
    // 2. AI 生成攻略：id 以 ai_ 开头，从 storage cache 取
    if (!guide && query.id && query.id.indexOf('ai_') === 0) {
      const cache = wx.getStorageSync('ai_guide_cache') || {};
      guide = cache[query.id] || null;
    }
    // 3. raw 笔记未解析：现场调 parseRawGuide + 写入 cache
    if (guide && guide.rawTitle && (!guide.nodes || !guide.nodes.length)) {
      const parsed = mock.parseRawGuide(guide);
      guide = Object.assign({}, guide, { nodes: parsed });
      const cache = wx.getStorageSync('ai_guide_cache') || {};
      cache[guide.id] = guide;
      wx.setStorageSync('ai_guide_cache', cache);
    }
    this.setData({
      guide,
      fromAi: query.from === 'ai' || (guide && (guide.source === 'ai' || guide.source === 'raw')),
    });
    // 把每个节点已有的历史问答直接铺到下方（不再用弹幕）
    if (guide) {
      this.initTalks(guide);
      this.buildRecommend(guide);
    }
  },

  // 根据攻略标签聚合行前装备(京东商品)+匹配酒店，做种草转化
  buildRecommend(guide) {
    const gearMap = mock.gearByTag || {};
    const seen = {};
    const gears = [];
    (guide.tags || []).forEach((tag) => {
      (gearMap[tag] || []).forEach((g) => {
        if (!seen[g.id]) { seen[g.id] = 1; gears.push(g); }
      });
    });
    // 匹配同目的地城市的京东酒店
    const kw = (guide.destination || '').split('·').pop();
    const hotels = (mock.jdTravel.hotels || []).filter(
      (h) => h.city.indexOf(kw) > -1 || (guide.destination || '').indexOf(h.city.split('·').pop()) > -1
    );
    this.setData({ gears, recHotels: hotels });
  },

  // 加入购物车(京东)
  onAddCart(e) {
    const name = e.currentTarget.dataset.name;
    wx.showToast({ title: `已加购：${name}`, icon: 'success' });
  },

  // 去京东预订酒店
  onBookHotel(e) {
    const name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '京东酒旅',
      content: `即将预订「${name}」，搭子拼房可再减，是否继续？`,
      confirmText: '去预订',
      success: () => {},
    });
  },

  // 跳转京东酒旅频道
  goHotel() {
    wx.switchTab ? wx.navigateTo({ url: '/pages/hotel/hotel' }) : wx.navigateTo({ url: '/pages/hotel/hotel' });
  },

  // 初始化各节点历史问答
  initTalks(guide) {
    const talks = {};
    guide.nodes.forEach((node, idx) => {
      talks[idx] = (node.danmu || []).map((d) => ({
        user: d.user,
        text: d.text,
        isAuthor: !!d.isAuthor,
      }));
    });
    this.setData({ talks });
  },

  // 追加一条问答到指定节点下方
  pushTalk(idx, user, text, isAuthor) {
    const arr = (this.data.talks[idx] || []).concat([{ user, text, isAuthor: !!isAuthor }]);
    this.setData({ [`talks[${idx}]`]: arr });
  },

  // 一键复制他人攻略 -> 生成可编辑副本
  onCopy() {
    this.setData({ editable: true });
    wx.showToast({ title: '已复制为我的攻略，可编辑', icon: 'none' });
  },

  // 编辑节点备注
  onEditNote(e) {
    const idx = e.currentTarget.dataset.idx;
    const val = e.detail.value;
    this.setData({ [`guide.nodes[${idx}].note`]: val });
  },

  // 就地问楼主：点击某节点唤起提问输入面板
  openAi() {
    const m = mock.aiAssistant || { name: 'AI 行程助手·小伴', avatar: '🤖', greeting: '有什么需要调整的随时问我～' };
    this.setData({
      aiVisible: true,
      aiMessages: [{ from: 'ai', text: m.greeting }],
    });
  },

  closeAi() {
    this.setData({ aiVisible: false });
  },

  aiPresetTap(e) {
    const v = e.currentTarget.dataset.v;
    this.sendAi(v);
  },

  onAiInput(e) {
    this.setData({ aiInput: e.detail.value });
  },

  doSendAi() {
    const v = this.data.aiInput;
    if (!v || !v.trim()) return;
    this.sendAi(v);
    this.setData({ aiInput: '' });
  },

  sendAi(text) {
    if (!text || !text.trim()) return;
    const user = { from: 'user', text: text.trim() };
    const reply = this.fakeAiReply(text.trim());
    const ai = { from: 'ai', text: reply };
    this.setData({ aiMessages: this.data.aiMessages.concat([user, ai]) });
  },

  fakeAiReply(q) {
    if (/民宿|酒店/.test(q)) return '好的，已把 D2/D4 民宿换成 松赞林卡（带地暖+供氧），点下方的"订同款"可直接预订，PLUS 返 8% 京豆。';
    if (/亲子|小孩|孩子/.test(q)) return '已加入 奈良喂鹿 / 大阪海游馆 / 京都铁道博物馆 3 个亲子点，节奏放慢，午饭提前到 11:30。';
    if (/避人|人少|小众/.test(q)) return '已把清水寺安排在 7:00 前（几乎没人），岚山改成 琉璃光院 小众寺院，比竹林出片又安静。';
    if (/预算|便宜|省钱|减半/.test(q)) return '住宿下调一档民宿（人均砍 150/晚），餐饮改为便利店+定食，景点免费优先。预算从 9800 砍到约 5600。';
    if (/美食|吃/.test(q)) return '已加入：道顿堀蟹道乐 / 黑门市场海胆饭 / 岚山嵯峨野汤豆腐，早晚两顿正餐+1 顿甜品，安排在节点下方的餐饮里。';
    if (/节奏|慢/.test(q)) return '每天砍 1 个景点，D3 哲学之道多留 1 小时散步，D5 奈良半天改成全天+和菓子体验。';
    if (/膝盖|老人|高反|高原|不累/.test(q)) return '稻城 D4 长线改 D5 短线（珍珠海），马站下马改为 电瓶车+短徒步，D6 改成理塘休整。';
    return '已根据你的需求调整，建议先点下方"订同款酒店"查看京东酒旅，订完再回到这里继续调整。';
  },

  onPrivateChat() {
    const g = this.data.guide;
    if (!g) return;
    const name = g.author || '楼主';
    wx.navigateTo({
      url:
        '/pages/chatDetail/chatDetail?id=conv_guide_' +
        g.id +
        '&name=' +
        encodeURIComponent(name) +
        '&avatar=' +
        encodeURIComponent('🧭'),
    });
  },

  onAskNode(e) {
    const idx = e.currentTarget.dataset.idx;
    const node = this.data.guide.nodes[idx];
    const quickQs = node.qa ? Object.keys(node.qa) : [];
    this.setData({
      askVisible: true,
      askNodeIdx: idx,
      askNodeTitle: node.title,
      askInput: '',
      quickQs,
    });
  },

  onAskInput(e) {
    this.setData({ askInput: e.detail.value });
  },

  // 点击快捷问题
  onQuickAsk(e) {
    const q = e.currentTarget.dataset.q;
    this.sendQuestion(q);
  },

  onSendAsk() {
    const q = this.data.askInput.trim();
    if (!q) return;
    this.sendQuestion(q);
  },

  // 提交问题 -> 我的问题先入列，楼主稍后"回复"再入列模拟真人在线答疑）
  sendQuestion(q) {
    const idx = this.data.askNodeIdx;
    const node = this.data.guide.nodes[idx];
    this.pushTalk(idx, '我', q, false);
    this.setData({ askInput: '', askVisible: false });
    wx.showToast({ title: '已问楼主，等TA回复~', icon: 'none' });
    const reply = this.authorReply(node, q);
    const author = (this.data.guide && this.data.guide.author) || '楼主';
    const delay = 1500 + Math.floor(Math.random() * 1500);
    setTimeout(() => this.pushTalk(idx, author, reply, true), delay);
  },

  // 楼主回复命中预设问答则原样答，否则给通用真人式回复
  authorReply(node, q) {
    const qa = node.qa || {};
    const hitKey = Object.keys(qa).find((k) => q.includes(k) || k.includes(q));
    if (hitKey) return qa[hitKey];
    if (q.includes('高反') || q.includes('海拔')) return '这段确实有点高反，提前吃红景天、别剧烈运动就还好~';
    if (q.includes('住') || q.includes('酒店')) return '住宿我一般订评分高、离主景点近的，具体看你预算哈。';
    if (q.includes('吃') || q.includes('美食')) return '当地小馆子比景区里划算，跟着本地人吃准没错！';
    if (q.includes('多少钱') || q.includes('预算') || q.includes('贵')) return '这一段花费我记在行程里了，你可以参考下面的金额~';
    return '这个问题问得好，我当时也纠结过，建议你多留点缓冲时间，随机应变哈~';
  },

  closeAsk() {
    this.setData({ askVisible: false });
  },

  onSave() {
    wx.showToast({ title: '已保存到我的攻略', icon: 'success' });
    this.setData({ editable: false });
  },

  // 折叠/展开 raw 召回笔记
  toggleRawSource() {
    this.setData({ rawCollapsed: !this.data.rawCollapsed });
  },
});