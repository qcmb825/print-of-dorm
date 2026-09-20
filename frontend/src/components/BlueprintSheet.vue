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
      <!-- 环上的分段/螺栓线：用 dasharray 画在**圆本身**上。
           上一版是十来个手写坐标的短线，靠算式凑到弧上 —— 凑不准的那几条就读成
           "浮在圆盘旁边的斜线"（用户就是这么看到的）。虚线圆没有这个问题：
           它的每个刻度必然落在圆上，改半径也不会散。 -->
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <circle cx="-20" cy="310" r="130" stroke-dasharray="2 11" />
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
      <!-- 三个补给舱。上一版是"一个矩形 + 一个椭圆"，读起来像没画完 ——
           圆柱在图纸上靠三件事成立：**两条母线**（上下轮廓）、**看得见那一端的整椭圆**、
           **看不见那一端的半椭圆弧**；再加贯通轴线和环肋，它才从矩形变成圆柱。
           只放三个、且都在 SVG x<640（viewport<795）：右下那一带是表单列的
           "学号不在名单上"链接（y≈770 起），舱体探到 x>840 会从它背后穿过。 -->
      <g stroke="var(--blueprint-ink)" stroke-width="1.25" vector-effect="non-scaling-stroke">
        <!-- 舱 A：z 轴圆柱，最长，端面朝右 -->
        <path d="M280 656h92M280 692h92" />
        <ellipse cx="372" cy="674" rx="10" ry="18" />
        <path d="M280 656a10 18 0 0 0 0 36" />
        <!-- 舱 B -->
        <path d="M420 656h80M420 692h80" />
        <ellipse cx="500" cy="674" rx="10" ry="18" />
        <path d="M420 656a10 18 0 0 0 0 36" />
        <!-- 舱 C：端面朝左，与 A/B 相对（图纸上两个方向都画才说明这是通用件） -->
        <path d="M548 656h72M548 692h72" />
        <ellipse cx="548" cy="674" rx="10" ry="18" />
        <path d="M620 656a10 18 0 0 1 0 36" />
      </g>
      <g stroke="var(--blueprint-ink-fine)" stroke-width="0.75" vector-effect="non-scaling-stroke">
        <!-- 贯通轴线（点划线）：三个舱在同一条轴上 -->
        <path d="M266 674h368" stroke-dasharray="12 3 2 3" />
        <!-- 环肋：每个舱两道 -->
        <path d="M310 656v36M315 656v36M462 656v36M467 656v36M580 656v36M585 656v36" />
        <!-- 舱面对接口 -->
        <circle cx="342" cy="656" r="5" />
        <circle cx="446" cy="656" r="4" />
        <!-- 隔热毯的斜剖面带（贴在 A 的外壳上） -->
        <path d="M292 658l12 12M302 656l14 14M314 656l14 14M326 656l14 14" />
        <!-- C 顶上的散热鳍块 -->
        <path d="M556 640h44v16h-44z" />
        <path d="M566 640v16M578 640v16M590 640v16" />
        <!-- 舱与舱之间的对接环（两条短竖线 = 一个法兰） -->
        <path d="M398 666v16M402 666v16M522 666v16M526 666v16" />
        <!-- 舱体到桁架的支柱 -->
        <path d="M330 692v14M350 692v14M460 692v14M480 692v14M570 692v14M590 692v14" />
      </g>

      <!-- ══ 右下：剖切详图（内圈走强调色） ══ -->
      <g stroke="var(--blueprint-ink)" stroke-width="1.5" vector-effect="non-scaling-stroke">
        <circle cx="1128" cy="664" r="44" />
      </g>
      <g stroke="var(--blueprint-accent)" stroke-width="1" vector-effect="non-scaling-stroke">
        <circle cx="1128" cy="664" r="25" />
        <path d="M1128 620v-16M1128 708v16M1084 664h-16M1172 664h16" />
      </g>

      <!-- ══ 引出线与编号（编号走强调色） ══ -->
      <!-- 引出线：四条都必须**两端接上东西**（标签 → 被标注的物件）。
           上一版有两条是悬空的（起笔离标签五十来像素、收笔也没碰到物件），
           在图上读起来就是"浮着的一条斜线"—— 用户报的正是左边那一条。 -->
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
        <text x="36" y="120">01 RING</text>
        <text x="1084" y="412">02</text>
        <text x="1074" y="520">03</text>
        <text x="1064" y="620">04</text>
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
