const mock = require('../../mock/data.js');

const STORE_KEY = 'ai_guide_history';
const CACHE_KEY = 'ai_guide_cache'; // AI 生成的攻略缓存（按 id 存）

function loadHistory() {
  return wx.getStorageSync(STORE_KEY) || mock.aiHistory || [];
}

function saveHistory(list) {
  wx.setStorageSync(STORE_KEY, list);
}

function loadCache() {
  return wx.getStorageSync(CACHE_KEY) || {};
}

function saveCache(obj) {
  wx.setStorageSync(CACHE_KEY, obj);
}

/**
 * 匹配攻略（3 级瀑布）：
 *   1) 本地结构化攻略（g1-g5）
 *   2) 外部 raw 召回 + parseRawGuide 解析（g6-g9 模拟小红书/马蜂窝抓取）
 *   3) mockAiGenerate 动态生成（无任何匹配时兜底）
 *   4) 终极兜底 g1
 * 返回 { id, source }  source: 'local' | 'raw' | 'ai' | 'fallback'
 */
function matchGuide(form) {
  const dest = (form.destination || '').trim();
  const firstWord = dest.split(/\s|·/)[0];

  // 1. 本地结构化攻略（g1-g5：有 nodes）
  const local = mock.guides.find((g) => g.id && g.id <= 'g5' && g.nodes && (dest.includes(g.destination) || g.destination.includes(firstWord) || g.destination.includes(dest)));
  if (local) return { id: local.id, source: 'local' };

  // 2. 外部 raw 召回（g6-g9 是 raw 笔记，无 nodes 需要解析）
  const raw = mock.guides.find((g) => g.rawTitle && (dest.includes(g.destination) || g.destination.includes(firstWord) || g.destination.includes(dest)));
  if (raw) {
    const cache = loadCache();
    if (!cache[raw.id] || !cache[raw.id].nodes) {
      // 解析 raw → 存 cache
      const parsed = mock.parseRawGuide(raw);
      cache[raw.id] = Object.assign({}, raw, { nodes: parsed });
      saveCache(cache);
    }
    return { id: raw.id, source: 'raw' };
  }

  // 3. AI 动态生成
  const ai = mock.mockAiGenerate(form);
  const cache = loadCache();
  cache[ai.id] = ai;
  saveCache(cache);
  return { id: ai.id, source: 'ai' };
}

// 模拟 AI 生成的"思考步骤"
const THINK_STEPS = [
  { t: 300, text: '解析目的地和出行条件…' },
  { t: 900, text: '匹配本地攻略库（9 篇 g1-g9）…' },
  { t: 1500, text: '本地未命中，召回小红书/马蜂窝相似路线…' },
  { t: 2200, text: '按出行条件生成每天节点（时间/交通/住宿/餐饮）…' },
  { t: 2900, text: '结合京东酒旅推荐酒店候选…' },
  { t: 3500, text: '优化路线避免重复，校验预算…' },
  { t: 4000, text: '完成 ✨ 攻略已生成' },
];

Page({
  data: {
    form: {
      destination: '',
      days: 5,
      budgetLevel: '¥3000-8000',
      budgetCustom: '',
      people: '情侣',
      pace: '深度漫游',
      preferences: [],
    },
    options: mock.aiFormOptions,
    scenarios: mock.aiScenarios,
    history: [],
    generating: false,
    thinkText: '',
    thinkPercent: 0,
    // 相似攻略候选
    similarVisible: false,
    similarList: [],
  },

  onShow() {
    this.setData({ history: loadHistory() });
  },

  onInput(e) {
    this.setData({ 'form.destination': e.detail.value });
  },

  pickBudget(e) {
    this.setData({ 'form.budgetLevel': e.currentTarget.dataset.v });
  },

  pickPeople(e) {
    this.setData({ 'form.people': e.currentTarget.dataset.v });
  },

  pickPace(e) {
    this.setData({ 'form.pace': e.currentTarget.dataset.v });
  },

  togglePref(e) {
    const v = e.currentTarget.dataset.v;
    const cur = this.data.form.preferences;
    const next = cur.includes(v) ? cur.filter((x) => x !== v) : cur.concat(v);
    this.setData({ 'form.preferences': next });
  },

  // 减少 / 增加天数
  decDay() {
    const d = Math.max(2, this.data.form.days - 1);
    this.setData({ 'form.days': d });
  },
  incDay() {
    const d = Math.min(20, this.data.form.days + 1);
    this.setData({ 'form.days': d });
  },

  useScenario(e) {
    const s = e.currentTarget.dataset.s;
    this.setData({
      'form.destination': s.name.replace(/\d+ ?日$/, '').replace(/经典|深度|慢游/g, '').trim(),
      'form.days': s.days,
      'form.budgetLevel': s.budget >= 15000 ? '¥15000+' : s.budget >= 8000 ? '¥8000-15000' : s.budget >= 3000 ? '¥3000-8000' : '¥3000 以下',
      'form.people': s.people,
      'form.preferences': s.tags,
    });
    wx.showToast({ title: '已填入场景条件', icon: 'success' });
  },

  // 一键生成
  async onGenerate() {
    const f = this.data.form;
    if (!f.destination.trim()) {
      wx.showToast({ title: '先告诉我去哪儿玩～', icon: 'none' });
      return;
    }
    this.setData({ generating: true, thinkText: THINK_STEPS[0].text, thinkPercent: 5 });
    for (let i = 1; i < THINK_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, THINK_STEPS[i].t - THINK_STEPS[i - 1].t));
      const p = Math.min(99, Math.round(((i + 1) / THINK_STEPS.length) * 100));
      this.setData({ thinkText: THINK_STEPS[i].text, thinkPercent: p });
    }

    // 写入历史（按 source 不同携带不同摘要）
    const matched = matchGuide(f);
    const cache = loadCache();
    const aiObj = matched.source === 'ai' || matched.source === 'cache' ? cache[matched.id] : null;
    const list = loadHistory();
    list.unshift({
      id: 'h_' + Date.now(),
      guideId: matched.id,
      title: f.destination + ' ' + f.days + ' 日' + (matched.source === 'local' ? '（匹配）' : '（AI）'),
      days: f.days,
      budget: parseInt(f.budgetLevel.replace(/[^0-9]/g, '')) || 5000,
      time: '刚刚',
      cover: aiObj ? aiObj.cover : '🤖',
      source: matched.source,
    });
    saveHistory(list.slice(0, 8));

    // 跳转攻略详情：本地攻略直接传 id；AI 生成的也传 id（detail.js 会从 cache 取）
    wx.redirectTo({ url: '/pages/guide/detail/detail?id=' + matched.id + '&from=ai' });
  },

  goGuideList() {
    wx.switchTab({ url: '/pages/guide/list/list' });
  },

  // ===== 找相似攻略（与 AI 一键生成并列）=====

  /**
   * 综合打分：基于 form 多维度匹配攻略库，返回 Top N
   * 维度：目的地(40) + 标签命中(25) + 天数差距(15) + 预算档(10) + 同行人/节奏(10)
   */
  matchSimilarGuides(form) {
    const f = form || this.data.form;
    const dest = (f.destination || '').trim();
    const firstWord = dest.split(/\s|·/)[0];
    const dayGap = Math.abs; // alias

    // 预算档：把 form 档位折成数字上限
    const budgetMap = { '¥3000 以下': 3000, '¥3000-8000': 8000, '¥8000-15000': 15000, '¥15000+': 30000 };
    const userBudget = budgetMap[f.budgetLevel] || 8000;

    const scored = (mock.guides || [])
      .filter((g) => g && (g.id || g.rawTitle)) // 排除明显空数据
      .map((g) => {
        let score = 0;
        const hits = [];
        const gDest = g.destination || '';
        // 1) 目的地匹配（40 分）
        if (dest && gDest && (dest.includes(gDest) || gDest.includes(dest) || (firstWord && gDest.includes(firstWord)))) {
          score += 40;
          hits.push('目的地一致');
        } else if (dest && gDest && (gDest.split(/·/)[0] === dest.split(/·/)[0])) {
          score += 18; // 同省
          hits.push('同省份');
        }
        // 2) 标签命中（25 分，每个 +8，封顶 25）
        const tagHits = (g.tags || []).filter((t) => (f.preferences || []).includes(t));
        if (tagHits.length) {
          score += Math.min(25, tagHits.length * 8);
          tagHits.forEach((t) => hits.push(t));
        }
        // 3) 天数差距（15 分：差距 ≤1 得满分，2 得 10，3 得 6，4+ 得 0）
        if (g.days) {
          const diff = dayGap((g.days || 0) - (f.days || 0));
          if (diff <= 1) { score += 15; hits.push('天数相近'); }
          else if (diff <= 2) score += 10;
          else if (diff <= 3) score += 6;
        }
        // 4) 预算档（10 分：同档 +10，相邻档 +5）
        if (g.budget) {
          const ratio = g.budget / Math.max(userBudget, 1);
          if (ratio >= 0.6 && ratio <= 1.5) { score += 10; hits.push('预算契合'); }
          else if (ratio >= 0.3 && ratio <= 2.5) score += 5;
        }
        // 5) 节奏/同行人暗示（10 分：从 tags/title 推断）
        const tagText = ((g.tags || []).join(',') + ',' + (g.title || '')).toLowerCase();
        if (f.people === '亲子' && /亲子|小孩|家庭/.test(tagText)) { score += 6; hits.push('适合亲子'); }
        if (f.people === '情侣' && /情侣|浪漫|二人/.test(tagText)) { score += 5; hits.push('适合情侣'); }
        if (f.pace === '特种兵打卡' && /打卡|紧凑|多景点/.test(tagText)) { score += 4; }
        if (f.pace === '深度漫游' && /深度|漫游|慢游/.test(tagText)) { score += 4; hits.push('节奏匹配'); }
        // 来源标记
        const source = g.rawTitle ? 'raw' : g.source || 'local';
        return Object.assign({}, g, {
          score: Math.min(100, score),
          hits: hits.slice(0, 3), // 最多展示 3 个命中点
          source,
          cover: g.cover || (g.rawTitle ? '📥' : '✈️'),
        });
      })
      .filter((g) => g.score > 0) // 没命中的不要
      .sort((a, b) => b.score - a.score)
      .slice(0, 4); // 最多 4 张候选

    return scored;
  },

  // 点击"找相似攻略"
  onFindSimilar() {
    if (this.data.generating) return;
    const f = this.data.form;
    if (!f.destination.trim()) {
      wx.showToast({ title: '先告诉我去哪儿玩～', icon: 'none' });
      return;
    }
    const list = this.matchSimilarGuides(f);
    this.setData({ similarVisible: true, similarList: list });
    if (!list.length) {
      wx.showToast({ title: '攻略库没相似的，可让 AI 现编', icon: 'none' });
    } else {
      wx.pageScrollTo({ selector: '.similar-block', duration: 200 });
    }
  },

  // 点开某条相似候选 → 跳详情
  onPickSimilar(e) {
    const g = e.currentTarget.dataset.g;
    if (!g || !g.id) return;
    // raw 笔记需要先解析
    const cache = loadCache();
    if (g.rawTitle && (!cache[g.id] || !cache[g.id].nodes)) {
      const parsed = mock.parseRawGuide(g);
      cache[g.id] = Object.assign({}, g, { nodes: parsed });
      saveCache(cache);
    }
    wx.navigateTo({ url: '/pages/guide/detail/detail?id=' + g.id + '&from=ai' });
  },

  // 收起相似候选
  onClearSimilar() {
    this.setData({ similarVisible: false });
  },

  onOpenHistory(e) {
    const h = e.currentTarget.dataset.h;
    if (h.guideId) {
      wx.navigateTo({ url: '/pages/guide/detail/detail?id=' + h.guideId + '&from=ai' });
    } else {
      // 兼容旧数据：按 title 模糊匹配
      const hit = mock.guides.find((g) => h.title.includes(g.destination));
      wx.navigateTo({ url: '/pages/guide/detail/detail?id=' + (hit ? hit.id : 'g1') + '&from=ai' });
    }
  },
});