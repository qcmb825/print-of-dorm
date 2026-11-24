<script setup lang="ts">
/** 登录页的底图：**一张地形勘测图**，整页那么大、框住四边。
 *
 *  ── 构图：笔画不进内容区 ──────────────────────────────────────────
 *  这一层只在 xl（≥1280）显示。内容是一张 max-w-[960px] 的两列网格，垂直居中；
 *  SVG 用 preserveAspectRatio="xMidYMid slice" 铺满视口。把内容区反算进 SVG 坐标系，
 *  它在**最窄的 1280×800** 下占 x∈[150,1050]、y∈[104,676] —— 视口越大这块越小。
 *  所以所有笔画都画在这块包络**之外**的边带里（左 / 右 / 上 / 下），图纸就成了
 *  "框住整页的一圈"。这不是审美决定：线进了包络就是"图形压在文字下面"，
 *  那是这套设计里唯一不能碰的红线。改内容宽度、改断点、改 viewBox，
 *  都要**重新算这块包络**。
 *
 *  ── 笔墨：两档墨色 + 三档粗细 + 一处强调 ─────────────────────────
 *  铅笔墨两档（--blueprint-ink / -fine，靠透明度分主次），强调色只给
 *  引出编号、罗盘北极、测站内圈这三处。粗细 0.75 / 1 / 1.5 / 2 **设备像素**，
 *  全部 vector-effect="non-scaling-stroke" —— slice 是按视口缩放的，
 *  不加这条，2px 的轮廓在 2560 宽的屏上会变成 4px，粗细节奏就没了。
 *
 *  画的是**勘测图的标准件**：罗盘玫瑰（左，被图纸边裁掉一半）、控制点与采样网格（右）、
 *  地形剖面与钻孔柱状（下）、一处测站详图（右下）。不编坐标与高程数字 ——
 *  装饰件可以无意义，但不该是假的。
 *
 *  纯装饰：整块 aria-hidden，不可选中，不吃指针事件。视差由外层给（--depth）。
 */
</script>

<template>
  <div class="blueprint hidden xl:block" aria-hidden="true">
    <!-- 图框与分区刻度用 DOM 画：它们必须贴真实视口，而 SVG 是按比例缩放的。 -->
    <span class="blueprint__frame" data-parallax style="--depth: 3px" />
    <span class="ticks blueprint__zones blueprint__zones--x top-0" data-parallax style="--depth: 3px" />
    <span class="ticks blueprint__zones blueprint__zones--x bottom-0" data-parallax style="--depth: 3px" />
    <span class="vticks blueprint__zones blueprint__zones--y left-0" data-parallax style="--depth: 3px" />
    <span class="vticks blueprint__zones blueprint__zones--y right-0" data-parallax style="--depth: 3px" />

    <svg
      class="blueprint__station"
      viewBox="0 0 1200 780"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      data-parallax
      style="--depth: 5px"
    >
      <!-- ══ 左边带：罗盘玫瑰（外缘被图纸裁掉，读成"图画到纸边外"） ══ -->
      <g stroke="var(--blueprint-ink)" stroke-width="2" vector-effect="non-scaling-stroke">
        <circle cx="-20" cy="310" r="140" />
      </g>
      <g stroke="var(--blueprint-ink)" stroke-width="1" vector-effect="non-scaling-stroke">
        <circle cx="-20" cy="310" r="118" />
        <circle cx="-20" cy="310" r="34" />
        <!-- 可见的方位辐条：水平一根 + 45° 两根（其余都在纸外） -->
        <path d="M14 310h84M4 286l59-59M4 334l59 59" />
      </g>
      <!-- 方位刻度：虚线画在**圆本身**上，每个刻度必然落在圆上，改半径也不会散 -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <circle cx="-20" cy="310" r="130" stroke-dasharray="2 11" />
      </g>
      <!-- 北极标记：可见弧段上唯一的强调色点（勘测图的"北"必须一眼可辨） -->
      <g stroke="var(--blueprint-accent)" stroke-width="1" vector-effect="non-scaling-stroke">
        <circle cx="39" cy="208" r="4" />
        <path d="M39 196v-8" />
      </g>
      <g fill="var(--blueprint-accent)" font-family="var(--stack-mono)" font-size="11" letter-spacing="0.14em">
        <text x="46" y="192">N</text>
      </g>
      <!-- 左边带的竖向图廓线 -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M116 170v280M110 170h12M110 450h12M110 306h12" />
      </g>

      <!-- ══ 上边带：图廓中心线与坐标格标注线 ══ -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M160 38h880" stroke-dasharray="14 5 3 5" />
        <path d="M170 74h860M170 68v6M1030 68v6M600 68v6" />
      </g>

      <!-- ══ 右边带：三角点（控制点）、水准点、采样网格 ══ -->
      <g stroke="var(--blueprint-ink)" stroke-width="1.5" vector-effect="non-scaling-stroke">
        <!-- 三角点：测绘控制网的标准符号（三角 + 中心点） -->
        <path d="M1130 178l26 44h-52z" />
        <path d="M1130 308l26 44h-52z" />
      </g>
      <g stroke="var(--blueprint-ink)" stroke-width="1" vector-effect="non-scaling-stroke">
        <circle cx="1130" cy="206" r="2.5" />
        <circle cx="1130" cy="336" r="2.5" />
        <!-- 两点之间的观测线（控制网的边） -->
        <path d="M1130 222v86" stroke="var(--blueprint-ink-fine)" stroke-width="0.75" stroke-dasharray="6 4" />
        <!-- 水准点：圆 + 十字 -->
        <circle cx="1130" cy="470" r="16" />
        <path d="M1118 470h24M1130 458v24" />
      </g>
      <!-- 采样网格：虚点线阵（物探/化探的测网） -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M1082 552h114M1082 576h114M1082 600h114" stroke-dasharray="1 8" />
      </g>

      <!-- ══ 下边带：地形剖面（地表线 + 基线 + 高程短尺），挂两个钻孔柱状 ══
           基线 y 730 → viewport 876：图框下缘在 886，留 10px；
           x 从 240 起：左下角是标题栏，笔画不能压到它的字上。 -->
      <g stroke="var(--blueprint-ink)" stroke-width="2" vector-effect="non-scaling-stroke">
        <path d="M240 730h810" />
      </g>
      <g stroke="var(--blueprint-ink)" stroke-width="1.5" vector-effect="non-scaling-stroke">
        <!-- 地表线：折线即剖面，起伏刻意不规则 —— 等距正弦读起来是"画的波浪"，
             不是地形 -->
        <path d="M240 700l64-8 80 12 96-24 80 16 80-28 80 22 80-14 80 24 80-12 90 18" />
      </g>
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <!-- 高程短尺：从基线向上的不等长竖刻 -->
        <path d="M285 730v-10M375 730v-16M465 730v-8M555 730v-14M645 730v-10M735 730v-18M825 730v-8M915 730v-12M1005 730v-10" />
        <!-- 剖面点划线（图幅中线） -->
        <path d="M240 664h560" stroke-dasharray="12 3 2 3" />
      </g>
      <!-- 钻孔柱状：顶面恰好接在地表线上（地质剖面的画法），内部两道分层 -->
      <g stroke="var(--blueprint-ink)" stroke-width="1" vector-effect="non-scaling-stroke">
        <path d="M516 690h24v40h-24zM516 706h24" />
        <path d="M676 688h24v42h-24zM676 700h24M676 714h24" />
      </g>

      <!-- ══ 右下：测站详图（内圈走强调色） ══ -->
      <g stroke="var(--blueprint-ink)" stroke-width="1.5" vector-effect="non-scaling-stroke">
        <circle cx="1128" cy="664" r="44" />
      </g>
      <g stroke="var(--blueprint-accent)" stroke-width="1" vector-effect="non-scaling-stroke">
        <circle cx="1128" cy="664" r="25" />
        <path d="M1128 620v-16M1128 708v16M1084 664h-16M1172 664h16" />
      </g>

      <!-- ══ 引出线与编号（编号走强调色） ══ -->
      <!-- 引出线：每条都必须**两端接上东西**（标签 → 被标注的物件），
           悬空的斜线在图上读起来就是"浮着的一条线"。 -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M46 126v64" />
        <path d="M1108 418l16 32" />
        <path d="M1100 526l-8 32" />
        <path d="M1088 626l10 6" />
      </g>
      <g
        fill="var(--blueprint-accent)"
        font-family="var(--stack-mono)"
        font-size="11"
        letter-spacing="0.14em"
      >
        <text x="36" y="120">01 COMPASS</text>
        <text x="1084" y="412">02</text>
        <text x="1074" y="520">03</text>
        <text x="1064" y="620">04</text>
      </g>
    </svg>

  </div>
</template>
