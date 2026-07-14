# -*- coding: utf-8 -*-
"""
旅伴 LvBan · 功能架构图生成脚本  (v3.0 · 更生动 + 更严谨)
========================================================
一张图讲清整个系统，兼顾"感染力"与"技术严谨"：
  · 顶层    用户画像 ↔ 京东生态（双向价值流）
  · 主链路  挑攻略 → 看攻略 → 约搭子 → 进空间 → 旅账AA → 京东下单
  · 护城河  问真人楼主 / 找相似攻略(5维打分) / 节点共编留痕
  · 底座    数据(6 storage key) / AI(4大算法) / 京东API
  · 严谨标注 14页面·6模块·5TabBar、算法复杂度、权重、召回瀑布
  · 图例    颜色语义 + 箭头语义说明

输出：./旅伴_功能架构图.png  (3200×2340 高清)

设计说明
--------
  * 配色：京东蓝 #2f80ed 主色 + 京东红 #e1251b 转化色 + 金/绿/紫点缀。
  * 层次：所有卡片带柔和投影(shadow patch)，主链路色带带深浅渐变感。
  * 图标：matplotlib 不渲染彩色 emoji，统一用 Unicode 几何符号
          (◎ ★ ♥ ■ ¥ ● ▲ ◆ ▶ ▼)，兼容 macOS 系统字体。
  * 字体：PingFang SC / Heiti SC 兜底，零缺字警告。

运行：python3 draw_architecture.py
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle
from matplotlib.lines import Line2D

# ============== 字体（兼容 macOS） ==============
plt.rcParams['font.sans-serif'] = ['PingFang SC', 'Heiti SC', 'STHeiti',
                                    'Microsoft YaHei', 'Arial Unicode MS', 'DejaVu Sans']
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['axes.unicode_minus'] = False

# ============== 京东主色 ==============
JD_BLUE   = "#2f80ed"
JD_RED    = "#e1251b"
JD_GOLD   = "#f5a623"
JD_GREEN  = "#27ae60"
JD_PURPLE = "#8e44ad"
JD_GREY   = "#5a6c7d"
INK       = "#2c3e50"
SOFT_BG   = "#f7f9fc"
PALE_BLUE = "#eaf2fe"
PALE_RED  = "#fdebe9"
PALE_GRN  = "#e8f6ee"
PALE_GLD  = "#fdf3df"
PALE_PUR  = "#f1eaf6"
SHADOW    = "#c7d0da"

# ============== 画布 ==============
fig, ax = plt.subplots(figsize=(20, 14.6), dpi=160)
ax.set_xlim(0, 100)
ax.set_ylim(0, 76)
ax.set_aspect('equal')
ax.axis('off')
fig.patch.set_facecolor('white')
ax.add_patch(patches.Rectangle((0, 0), 100, 76, facecolor=SOFT_BG, zorder=0))


# ============== 通用：带投影的圆角卡片 ==============
def card(x, y, w, h, edge, face, lw=1.8, rs=1.0, pad=0.4, shadow=True, z=2):
    """画一张带柔和投影的圆角矩形卡片，返回主 patch。"""
    if shadow:
        sh = FancyBboxPatch((x + 0.35, y - 0.45), w, h,
                            boxstyle=f"round,pad={pad},rounding_size={rs}",
                            linewidth=0, facecolor=SHADOW, alpha=0.55, zorder=z - 1)
        ax.add_patch(sh)
    box = FancyBboxPatch((x, y), w, h,
                         boxstyle=f"round,pad={pad},rounding_size={rs}",
                         linewidth=lw, edgecolor=edge, facecolor=face, zorder=z)
    ax.add_patch(box)
    return box


# ============== 顶部大标题 ==============
card(6, 70, 88, 4.6, JD_BLUE, PALE_BLUE, lw=2.2, rs=1.2, pad=0.6)
ax.text(50, 73.2, "旅 伴  LvBan · 功 能 架 构 图",
        ha='center', va='center', fontsize=26, fontweight='bold', color=JD_BLUE, zorder=3)
ax.text(50, 70.9,
        "挑攻略 → 约搭子 → 进空间共编 → 旅账差额AA → 京东下单   ｜   "
        "一个微信小程序、跑通一次旅行筹备全链路",
        ha='center', va='center', fontsize=11.5, color=JD_GREY, style='italic', zorder=3)
# 右上角规模徽标
for i, (txt, col) in enumerate([("14 页面", JD_BLUE), ("6 模块", JD_PURPLE),
                                 ("5 TabBar", JD_GREEN)]):
    bx = 68 + i * 9.2
    ax.add_patch(FancyBboxPatch((bx, 70.4), 8.4, 1.8,
                 boxstyle="round,pad=0.15,rounding_size=0.9",
                 linewidth=1.3, edgecolor=col, facecolor='white', zorder=4))
    ax.text(bx + 4.2, 71.3, txt, ha='center', va='center',
            fontsize=9.5, fontweight='bold', color=col, zorder=5)


# ============== 顶层：用户 & 京东生态 ==============
# 左：用户画像
card(4, 60, 27, 7.2, JD_PURPLE, PALE_PUR, lw=1.8, rs=1.0)
uc = Circle((9, 63.6), 1.7, facecolor=JD_PURPLE, edgecolor='white', linewidth=2.2, zorder=4)
ax.add_patch(uc)
ax.text(9, 63.6, "U", ha='center', va='center', fontsize=15,
        fontweight='bold', color='white', zorder=5)
ax.text(18.5, 65.4, "用户层  USER", ha='center', va='center',
        fontsize=15, fontweight='bold', color=JD_PURPLE, zorder=3)
ax.text(18.5, 63.2, "25–35 岁城市白领 · 结伴出行者", ha='center', va='center',
        fontsize=10, color=JD_GREY, zorder=3)
ax.text(18.5, 61.4, "微信小程序 · 零安装 · 一次旅行全链路", ha='center', va='center',
        fontsize=9.5, color=JD_GREY, zorder=3)

# 右：京东生态
card(69, 60, 27, 7.2, JD_RED, PALE_RED, lw=1.8, rs=1.0)
js = patches.Rectangle((73.6, 62), 3.3, 3.3, facecolor=JD_RED,
                       edgecolor='white', linewidth=2.2, zorder=4)
ax.add_patch(js)
ax.text(75.25, 63.65, "JD", ha='center', va='center', fontsize=12,
        fontweight='bold', color='white', zorder=5)
ax.text(84.5, 65.4, "京东生态  JD.COM", ha='center', va='center',
        fontsize=15, fontweight='bold', color=JD_RED, zorder=3)
ax.text(84.5, 63.2, "京东酒旅 · 自营装备 · PLUS 会员", ha='center', va='center',
        fontsize=10, color=JD_GREY, zorder=3)
ax.text(84.5, 61.4, "返京豆 / 拼房减额 / 一键加购", ha='center', va='center',
        fontsize=9.5, color=JD_GREY, zorder=3)

# 中间双向价值流（细线 + 小圆点）连到中央京东种草卡两侧
ax.add_line(Line2D([31.5, 39.3], [63.6, 63.6], color=JD_BLUE, linewidth=2.6,
                   zorder=3, solid_capstyle='round'))
ax.add_patch(Circle((35.4, 63.6), 0.42, facecolor=JD_BLUE,
                    edgecolor='white', linewidth=1.0, zorder=4))
ax.text(35.4, 65.0, "点开", ha='center', va='center',
        fontsize=9.5, color=JD_BLUE, fontweight='bold', zorder=3)
ax.add_line(Line2D([60.7, 69], [63.6, 63.6], color=JD_RED, linewidth=2.6,
                   zorder=3, solid_capstyle='round'))
ax.add_patch(Circle((64.85, 63.6), 0.42, facecolor=JD_RED,
                    edgecolor='white', linewidth=1.0, zorder=4))
ax.text(64.85, 65.0, "种草", ha='center', va='center',
        fontsize=9.5, color=JD_RED, fontweight='bold', zorder=3)

# 中央：京东生态种草卡（放在"点开"与"种草"之间，突出商业内核）
card(39.5, 57.4, 21, 9.8, JD_RED, '#fff6f5', lw=1.6, rs=0.9, z=4)
ax.text(50, 65.6, "● 京东生态 · 贯穿全链路商业内核",
        ha='center', va='center', fontsize=9.5, fontweight='bold',
        color=JD_RED, zorder=5)
funnel = [
    ("种草1", "攻略行前装备", "冲锋衣/徒步鞋 → 加购"),
    ("种草2", "酒店拼房减额", "邀搭子拼房 −100 元"),
    ("种草3", "PLUS 会员", "返京豆 / 专属价"),
    ("种草4", "任务领豆留存", "发攻略/记账领京豆"),
]
fy0 = 63.3
for i, (tag, head, note) in enumerate(funnel):
    fy = fy0 - i * 1.55
    ax.add_patch(Circle((41.2, fy), 0.62, facecolor=JD_RED,
                        edgecolor='white', linewidth=1.0, zorder=5))
    ax.text(41.2, fy, str(i + 1), ha='center', va='center',
            fontsize=7.5, fontweight='bold', color='white', zorder=6)
    ax.text(42.6, fy, f"{head}", ha='left', va='center',
            fontsize=8.2, fontweight='bold', color=JD_RED, zorder=5)
    ax.text(42.6, fy - 0.7, note, ha='left', va='center',
            fontsize=7.0, color=JD_GREY, zorder=5)


# ============== 主链路：6 个核心步骤 ==============
# (x_center, icon, title, subtitle, edge, face)
steps = [
    (11.5, "◎", "01 挑攻略", "AI 一键生成\n或 找相似 Top4", JD_BLUE,   PALE_BLUE),
    (27.8, "★", "02 看攻略", "13.5KB 最大单页\n问楼主 + 节点详情", JD_PURPLE, PALE_PUR),
    (44.1, "♥", "03 约搭子", "四维筛选 + 匹配度\n拼成同行 = 建空间", JD_GOLD,   PALE_GLD),
    (60.4, "■", "04 进空间", "节点共编留痕\nAI 行程助手", JD_GREEN,  PALE_GRN),
    (76.7, "¥", "05 旅账AA", "差额贪心 1~2 笔\n京东订单导入", JD_RED,    PALE_RED),
    (93.0, "●", "06 京东", "酒旅/装备/PLUS\n4 层种草漏斗", JD_RED,    PALE_RED),
]
step_y = 47
step_h = 11
step_w = 14.6
for x, icon, title, sub, edge, face in steps:
    card(x - step_w / 2, step_y - step_h / 2, step_w, step_h,
         edge, face, lw=2.2, rs=1.6, pad=0.5, z=3)
    # 顶部色带
    band = FancyBboxPatch((x - step_w / 2, step_y + step_h / 2 - 2.3), step_w, 2.3,
                          boxstyle="round,pad=0.02,rounding_size=0.4",
                          linewidth=0, facecolor=edge, alpha=0.95, zorder=4)
    ax.add_patch(band)
    ax.text(x, step_y + step_h / 2 - 1.15, title, ha='center', va='center',
            fontsize=13, fontweight='bold', color='white', zorder=5)
    # 中部大圆图标
    ic = Circle((x, step_y + 0.6), 2.15, facecolor=edge,
                edgecolor='white', linewidth=2.5, zorder=5)
    ax.add_patch(ic)
    ax.text(x, step_y + 0.6, icon, ha='center', va='center',
            fontsize=22, fontweight='bold', color='white', zorder=6)
    ax.text(x, step_y - 3.4, sub, ha='center', va='center',
            fontsize=9, color=INK, zorder=5)

# 主链路连接（细线 + 小圆点，去掉大三角箭头）
for i in range(len(steps) - 1):
    x_from = steps[i][0] + step_w / 2
    x_to = steps[i + 1][0] - step_w / 2
    col = JD_RED if i == len(steps) - 2 else '#9aa7b4'
    ax.add_line(Line2D([x_from, x_to], [step_y, step_y],
                        color=col, linewidth=2.2, zorder=3,
                        solid_capstyle='round'))
    # 中点小圆点提示流向
    xm = (x_from + x_to) / 2
    ax.add_patch(Circle((xm, step_y), 0.42, facecolor=col,
                        edgecolor='white', linewidth=1.0, zorder=4))


# ============== 三大护城河（差异化亮点） ==============
moats_y = 30
# (x_center, head, body, edge, face, link_step_index)
moats = [
    (17, "★ 护城河①  问真人楼主",
     "节点下方小字问答 · 楼主头像+昵称透明\n不是 AI · 不是弹幕 · 是真人答主",
     JD_PURPLE, PALE_PUR, 1),
    (50, "★ 护城河②  找相似攻略",
     "5 维加权：目的地40/tags25/天数15/预算10/节奏10\nTop4 候选 + 命中点 chip 透明化",
     JD_BLUE, PALE_BLUE, 0),
    (83, "★ 护城河③  节点共编留痕",
     "nodeOverrides + spaceEdits 双记录\n保留「谁动了我的攻略」协作痕迹",
     JD_GREEN, PALE_GRN, 3),
]
moat_w = 30
moat_h = 9
for x, head, body, edge, face, idx in moats:
    card(x - moat_w / 2, moats_y - moat_h / 2, moat_w, moat_h,
         edge, face, lw=1.6, rs=1.0, z=3)
    ax.text(x, moats_y + 2.7, head, ha='center', va='center',
            fontsize=12, fontweight='bold', color=edge, zorder=4)
    ax.text(x, moats_y - 1.2, body, ha='center', va='center',
            fontsize=9, color=INK, zorder=4)
    # 虚线连回对应主链路步骤
    sx = steps[idx][0]
    edge2 = steps[idx][4]
    arr = FancyArrowPatch((x, moats_y + moat_h / 2), (sx, step_y - step_h / 2),
                          arrowstyle='-', linestyle=(0, (4, 3)),
                          color=edge2, linewidth=1.4, alpha=0.7,
                          connectionstyle="arc3,rad=0.16", zorder=2)
    ax.add_patch(arr)


# ============== 底层：三大底座 ==============
base_y = 11
bases = [
    (17, "■ 数据底座  DATA",
     "mock/data.js：攻略/搭子/旅账/京东/PLUS\nwx.storageSync × 6 keys 跨页持久化",
     JD_BLUE, PALE_BLUE),
    (50, "▲ AI 底座  AI",
     "4 大算法：5维打分·差额AA(O(n log n))\n召回3级瀑布·种草漏斗 · 行程助手",
     JD_GOLD, PALE_GLD),
    (83, "● 京东 API 底座  JD",
     "酒旅/机票/门票/装备 · PLUS/京豆/任务\n订单 → 旅账自动按人均入账",
     JD_RED, PALE_RED),
]
base_w = 30
base_h = 9
for x, head, body, edge, face in bases:
    card(x - base_w / 2, base_y - base_h / 2, base_w, base_h,
         edge, face, lw=1.6, rs=1.0, z=3)
    ax.text(x, base_y + 2.7, head, ha='center', va='center',
            fontsize=12.5, fontweight='bold', color=edge, zorder=4)
    ax.text(x, base_y - 1.2, body, ha='center', va='center',
            fontsize=9, color=INK, zorder=4)
    # 点线向上汇入护城河层
    arr = FancyArrowPatch((x, base_y + base_h / 2), (x, moats_y - moat_h / 2),
                          arrowstyle='->,head_width=6,head_length=8',
                          color=edge, linewidth=1.5, alpha=0.5,
                          linestyle=':', zorder=2)
    ax.add_patch(arr)


# ============== 层次标签（左侧竖排语义带） ==============
layer_labels = [
    (step_y, "主链路 FLOW", JD_BLUE),
    (moats_y, "护城河 MOAT", JD_PURPLE),
    (base_y, "底座 BASE", JD_GREEN),
]
for ly, txt, col in layer_labels:
    ax.add_patch(FancyBboxPatch((0.6,ly - 1.2), 2.6, 2.4,
                 boxstyle="round,pad=0.1,rounding_size=0.5",
                 linewidth=0, facecolor=col, alpha=0.9, zorder=3))
    ax.text(1.9, ly, txt, ha='center', va='center', rotation=90,
            fontsize=8, fontweight='bold', color='white', zorder=4)


# ============== 右下角图例 ==============
lg_x, lg_y, lg_w, lg_h = 68, 1.2, 30, 5.4
card(lg_x, lg_y, lg_w, lg_h, '#bdc3c7', 'white', lw=1.2, rs=0.6, z=5)
ax.text(lg_x + 1.2, lg_y + lg_h - 1.0, "◆ 图例 LEGEND",
        fontsize=9.5, fontweight='bold', color=INK, va='center', zorder=6)
legend_items = [
    (JD_BLUE, "内容/数据"), (JD_PURPLE, "协作/社区"),
    (JD_GREEN, "空间/共编"), (JD_RED, "京东转化"), (JD_GOLD, "AI 算法"),
]
for i, (col, lab) in enumerate(legend_items):
    lx = lg_x + 1.4 + (i % 3) * 9.6
    lyy = lg_y + lg_h - 2.4 - (i // 3) * 1.9
    ax.add_patch(Circle((lx, lyy), 0.5, facecolor=col, edgecolor='white',
                        linewidth=0.8, zorder=6))
    ax.text(lx + 1.0, lyy, lab, fontsize=8.5, color=JD_GREY, va='center', zorder=6)
# 箭头语义
ax.annotate("", xy=(lg_x + 22, lg_y + 1.0), xytext=(lg_x + 19.5, lg_y + 1.0),
            arrowprops=dict(arrowstyle='->', color='#34495e', lw=1.6), zorder=6)
ax.text(lg_x + 22.4, lg_y + 1.0, "主流程", fontsize=8, color=JD_GREY, va='center', zorder=6)


# ============== 保存 ==============
plt.tight_layout()
out_path = "旅伴_功能架构图.png"
plt.savefig(out_path, dpi=160, bbox_inches='tight', facecolor='white')
print(f"[OK] 已生成：{out_path}")
print(f"     分辨率：约 3200x2340 (20x14.6 英寸 × DPI 160)")