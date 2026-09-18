<script setup lang="ts">
/** 登录页的底图：**一张空间站结构图纸**，整页那么大、框住四边。
 *
 *  ── 构图：笔画不进内容区 ──────────────────────────────────────────
 *  这一层只在 xl（≥1280）显示。内容是一张 max-w-[960px] 的两列网格，垂直居中；
 *  SVG 用 preserveAspectRatio="xMidYMid slice" 铺满视口。把内容区反算进 SVG 坐标系，
 *  它在**最窄的 1280×800** 下占 x∈[150,1050]、y∈[104,676] —— 视口越大这块越小。
 *  所以所有笔画都画在这块包络**之外**的边带里（左 / 右 / 上 / 下），图纸就成了
 *  "框住整页的一圈"。这不是审美决定：线进了包络就是"图形压在文字下面"，
 *  那是这套设计里唯一不能碰的红线（见 DESIGN_RULES 第 1 节）。改内容宽度、
 *  改断点、改 viewBox，都要**重新算这块包络**（公式在 git 历史里，一行矩阵乘法）。
 *
 *  ── 笔墨：两档墨色 + 三档粗细 + 一处强调 ─────────────────────────
 *  铅笔墨两档（--blueprint-ink / -fine，靠透明度分主次），强调色只给
 *  引出编号、图框角标、剖切内圈这三处。粗细 0.75 / 1 / 2 **设备像素**，
 *  全部 vector-effect="non-scaling-stroke" —— slice 是按视口缩放的，
 *  不加这条，2px 的轮廓在 2560 宽的屏上会变成 4px，粗细节奏就没了。
 *  （单色单线宽的第一版被评"线条粗细太一致不好看"；青色那版换成了铅笔墨。）
 *
 *  画的是**虚构结构的示意**：环形舱（左，被图纸边裁掉一半）、桁架与补给舱（下）、
 *  太阳翼与散热板（右）、一处剖切详图（右下）。不编图纸编号与尺寸数字 ——
 *  装饰件可以无意义，但不该是假的。
 *
 *  纯装饰：整块 aria-hidden，不可选中，不吃指针事件。视差由外层给（--depth）。
 */
</script>

<template>
  <div class="blueprint hidden xl:block" aria-hidden="true">
    <!-- 图框与分区刻度用 DOM 画：它们必须贴真实视口，而 SVG 是按比例缩放的。 -->
    <span class="blueprint__frame" data-parallax style="--depth: 4px" />
    <span class="ticks blueprint__zones blueprint__zones--x top-0" data-parallax style="--depth: 4px" />
    <span class="ticks blueprint__zones blueprint__zones--x bottom-0" data-parallax style="--depth: 4px" />
    <span class="vticks blueprint__zones blueprint__zones--y left-0" data-parallax style="--depth: 4px" />
    <span class="vticks blueprint__zones blueprint__zones--y right-0" data-parallax style="--depth: 4px" />

    <svg
      class="blueprint__station"
      viewBox="0 0 1200 780"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      data-parallax
      style="--depth: 15px"
    >
      <!-- ══ 左边带：环形舱（外缘被图纸裁掉，读成"图画到纸边外"） ══ -->
      <g stroke="var(--blueprint-ink)" stroke-width="2" vector-effect="non-scaling-stroke">
        <circle cx="-20" cy="310" r="140" />
      </g>
      <g stroke="var(--blueprint-ink)" stroke-width="1" vector-effect="non-scaling-stroke">
        <circle cx="-20" cy="310" r="118" />
        <circle cx="-20" cy="310" r="34" />
        <!-- 可见的辐条：水平一根 + 45° 两根（其余都在纸外） -->
        <path d="M14 310h84M4 286l59-59M4 334l59 59" />
      </g>
      <!-- 外缘刻度（细墨）：沿外圈右侧弧，径向 10 长 -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M120 310h-10M111.6 262.1l-9.4 4.6M111.6 357.9l-9.4-4.6M87.2 220l-9.3 6.5M87.2 400l-9.3-6.5M50 188.8l-5.7 7.9M50 431.2l-5.7-7.9M4.3 172.1l-3.9 8.5M4.3 447.9l-3.9-8.5" />
      </g>
      <!-- 左边带的竖向尺寸线 -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M116 170v280M110 170h12M110 450h12M110 306h12" />
      </g>

      <!-- ══ 上边带：中心线与横向尺寸线 ══ -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M160 38h880" stroke-dasharray="14 5 3 5" />
        <path d="M170 74h860M170 68v6M1030 68v6M600 68v6" />
      </g>

      <!-- ══ 右边带：太阳翼（带斜剖面线）、对接环、散热板 ══ -->
      <g stroke="var(--blueprint-ink)" stroke-width="2" vector-effect="non-scaling-stroke">
        <path d="M1078 168h118v56h-118zM1078 292h118v56h-118z" />
      </g>
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M1078 168l14 14M1096 168l14 14M1114 168l14 14M1132 168l14 14M1150 168l14 14M1168 168l14 14M1182 182l14 14" />
        <path d="M1078 292l14 14M1096 292l14 14M1114 292l14 14M1132 292l14 14M1150 292l14 14M1168 292l14 14M1182 306l14 14" />
      </g>
      <g stroke="var(--blueprint-ink)" stroke-width="1" vector-effect="non-scaling-stroke">
        <!-- 两片翼之间的桅杆 -->
        <path d="M1130 224v68" />
        <circle cx="1130" cy="470" r="16" />
        <path d="M1118 470h24M1130 458v24" />
        <path d="M1082 560h114v38h-114z" />
        <path d="M1100 560v38M1118 560v38M1136 560v38M1154 560v38M1172 560v38" stroke="var(--blueprint-ink-fine)" stroke-width="0.75" />
      </g>

      <!-- ══ 下边带：主桁架（粗弦杆 + 细腹杆）与三个补给舱 ══
           弦杆 y 692/730 → viewport 830/876：图框下缘在 886，留 10px；
           x 从 240 起：左下角是标题栏，笔画不能压到它的字上。 -->
      <g stroke="var(--blueprint-ink)" stroke-width="2" vector-effect="non-scaling-stroke">
        <path d="M240 692h810M240 730h810" />
      </g>
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M240 692l45 38 45 -38 45 38 45 -38 45 38 45 -38 45 38 45 -38 45 38 45 -38 45 38 45 -38 45 38 45 -38 45 38 45 -38 45 38 45 -38" />
      </g>
      <g stroke="var(--blueprint-ink)" stroke-width="1" vector-effect="non-scaling-stroke">
        <!-- 补给舱：坐在桁架上的圆柱，端盖用椭圆 -->
        <!-- 只放两个舱，且都在 SVG x<560（viewport<672）：右下那一带是表单列的
             "学号不在名单上"链接（y≈770 起），舱体若探到 x>840 会从它背后穿过。 -->
        <path d="M280 640h96v52h-96zM480 640h96v52h-96z" />
        <ellipse cx="376" cy="666" rx="12" ry="26" />
        <ellipse cx="576" cy="666" rx="12" ry="26" />
        <path d="M312 640v52M344 640v52M512 640v52M544 640v52" stroke="var(--blueprint-ink-fine)" stroke-width="0.75" />
        <!-- 舱体与桁架的连接件 -->
        <path d="M328 692v14M528 692v14" stroke="var(--blueprint-ink-fine)" stroke-width="0.75" />
      </g>

      <!-- ══ 右下：剖切详图（内圈走强调色） ══ -->
      <g stroke="var(--blueprint-ink)" stroke-width="1.5" vector-effect="non-scaling-stroke">
        <circle cx="1124" cy="740" r="36" />
      </g>
      <g stroke="var(--blueprint-accent)" stroke-width="1" vector-effect="non-scaling-stroke">
        <circle cx="1124" cy="740" r="20" />
        <path d="M1124 704v-14M1124 776v14M1088 740h-14M1160 740h14" />
      </g>

      <!-- ══ 引出线与编号（编号走强调色） ══ -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <path d="M96 216l-36-44M1120 454v-22M1104 556l-22-14M1088 706l-30-16" />
      </g>
      <g
        fill="var(--blueprint-accent)"
        font-family="var(--stack-mono)"
        font-size="11"
        letter-spacing="0.14em"
      >
        <text x="10" y="122">01 RING</text>
        <text x="1098" y="414">02</text>
        <text x="1094" y="522">03</text>
        <text x="1090" y="676">04</text>
      </g>
    </svg>

    <!-- 标题栏：字段写的都是真事（产品名、版本戳），位置按图纸惯例放左下角 -->
    <div class="blueprint__block" data-parallax style="--depth: 6px">
      <span class="readout">NEKO PRINT SERVICE / 校园打印服务</span>
      <span class="readout">STRUCTURE STUDY · SHEET 1/1</span>
      <span class="readout">REV 2.006</span>
    </div>
  </div>
</template>
