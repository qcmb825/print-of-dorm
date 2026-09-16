import{$n as e,A as t,An as n,B as r,Bn as i,Cn as a,D as o,Dn as s,E as c,En as l,Gn as u,Hn as d,Ln as f,O as p,Qn as m,Sr as h,St as g,Tn as _,V as v,Xn as y,_ as b,_n as x,_t as S,an as C,b as w,br as T,bt as E,dr as D,f as O,fn as k,ft as A,g as ee,gn as te,gr as j,in as ne,j as M,jn as N,kn as P,l as F,lr as I,mt as L,nn as R,pn as z,qn as B,sn as V,tn as H,tr as U,u as W,vt as G,wn as K,x as re,xr as q,yn as J,yr as Y,z as X}from"./endpoints-gDUDUnKI.js";import{t as ie}from"./Empty-ByG1ebw9.js";import{r as ae}from"./cssr-nvHT-q9I.js";import{a as oe,t as se}from"./Select-C9WY8ucH.js";import{t as ce}from"./FormItem-D6pGAAu_.js";import{t as Z}from"./Input-Bz_s8aeD.js";import{n as le,t as ue}from"./DrawerContent-UIk_coXI.js";import{t as de}from"./Skeleton-BKWPjkVr.js";import{b as fe,g as pe,ot as me,x as he,z as ge}from"./index-DmEbPUOi.js";import{t as _e}from"./createLucideIcon-B24cT97-.js";import{t as ve}from"./inbox-DGyQUj_U.js";import{t as ye}from"./lock-D8DvjNtA.js";import{t as be}from"./plus-Dsg6aI7q.js";import{t as xe}from"./send-DhzvqwE_.js";import{c as Se,m as Ce}from"./format-D36ElkIK.js";import{r as we,t as Te}from"./dist-BvnZ258g.js";var Ee=N({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=D(null),n=D(e.value),r=D(e.value),i=D(`up`),o=D(!1),c=a(()=>o.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),l=a(()=>o.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);m(j(e,`value`),(e,t)=>{n.value=t,r.value=e,f(d)});function d(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?p(`up`):n>t&&p(`down`))}function p(e){i.value=e,o.value=!1,f(()=>{t.value?.offsetWidth,o.value=!0})}return()=>{let{clsPrefix:i}=e;return u(),s(`span`,{ref:t,class:L(`${i}-base-slot-machine-number`)},[n.value===null?S(()=>null):(u(),s(`span`,{key:0,class:L([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,l.value])},[S(()=>n.value)],2)),K(`span`,{class:L([`${i}-base-slot-machine-current-number`,c.value])},[K(`span`,{ref:`numberWrapper`,class:L([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[S(()=>r.value)],2)],2),n.value===null?S(()=>null):(u(),s(`span`,{key:2,class:L([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,l.value])},[S(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=E;function De({duration:e=`.2s`}={}){return[H(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),H(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),H(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),H(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),H(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),H(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=H([H(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),H(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),H(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),H(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),R(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[R(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),b({duration:`.2s`,delay:`0s`}),R(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[C(`top`,{transform:`translateY(-100%)`}),C(`bottom`,{transform:`translateY(100%)`}),C(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),C(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),R(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[C(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),C(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),ne(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[C(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=N({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){G(`-base-slot-machine`,Oe,j(e,`clsPrefix`));let t=D(),r=D(),i=a(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return m(j(e,`value`),(e,n)=>{typeof e==`string`?(r.value=void 0,t.value=void 0):typeof n==`string`?(r.value=e,t.value=void 0):(r.value=e,t.value=n)}),()=>{let{value:a,clsPrefix:o}=e;return typeof a==`number`?(u(),s(`span`,{key:1,class:L(`${o}-base-slot-machine`)},[n(z,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>i.value.map((e,n)=>(u(),_(Ee,{clsPrefix:o,key:i.value.length-n-1,oldOriginalNumber:t.value,newOriginalNumber:r.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),n(c,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<a?(u(),_(Ee,{key:2,clsPrefix:o,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(u(),s(`span`,{key:3,class:L(`${o}-base-slot-machine`)},[S(()=>a)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:v,self:Ae},Me=H([H(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),R(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[C(`as-is`,[R(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ge({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),C(`dot`,[R(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[H(`::before`,`border-radius: 4px;`)])]),R(`badge-sup`,`
 background: var(--n-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: #FFF;
 position: absolute;
 height: 18px;
 line-height: 18px;
 border-radius: 9px;
 padding: 0 6px;
 text-align: center;
 font-size: var(--n-font-size);
 transform: translateX(-50%);
 left: 100%;
 bottom: calc(100% - 9px);
 font-variant-numeric: tabular-nums;
 z-index: 2;
 display: flex;
 align-items: center;
 `,[ge({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),R(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),H(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...X.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=N({name:`Badge`,props:Pe,setup(e,{slots:n}){let{mergedClsPrefixRef:i,inlineThemeDisabled:s,mergedRtlRef:c}=g(e),l=X(`Badge`,`-badge`,Me,je,e,i),u=D(!1),f=()=>{u.value=!0},m=()=>{u.value=!1},h=a(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!t(n.value)));d(()=>{h.value&&(u.value=!0)});let _=p(`Badge`,c,i),v=a(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[V(`color`,t)]:a,fontFamily:o,fontSize:s}}=l.value;return{"--n-font-size":s,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),y=s?r(`badge`,a(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=o(r)),t}),v,e):void 0,b=a(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${_?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:_,mergedClsPrefix:i,appeared:u,showBadge:h,handleAfterEnter:f,handleAfterLeave:m,cssVars:s?void 0:v,themeClass:y?.themeClass,onRender:y?.onRender,offsetStyle:b}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return u(),s(`div`,{class:L([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:q(this.cssVars)},[S(()=>i),(u(),_(k,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(u(),s(`sup`,{key:1,class:L(`${e}-badge-sup`),title:oe(this.value),style:q(this.offsetStyle)},[S(()=>M(r.value,()=>[this.dot?null:(u(),_(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(u(),_(ee,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):S(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Ie=H([H(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),R(`spin-container`,`
 position: relative;
 `,[R(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[me()])]),R(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),R(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[C(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),R(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),R(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[C(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Le={small:20,medium:18,large:16},Re={...X.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...re,strokeWidth:Number},ze=N({name:`Spin`,props:Re,slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:i}=g(t),o=X(`Spin`,`-spin`,Ie,pe,t,n),s=a(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=o.value,{opacitySpinning:i,color:a,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":i,"--n-size":typeof e==`number`?A(e):r[V(`size`,e)],"--n-color":a,"--n-text-color":s}}),c=i?r(`spin`,a(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),s,t):void 0,l=ae(t,[`spinning`,`show`]),u=D(!1);return e(e=>{let n;if(l.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{u.value=!0},r),e(()=>{clearTimeout(n)});return}}u.value=l.value}),{mergedClsPrefix:n,active:u,mergedStrokeWidth:a(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return Le[typeof n==`number`?`medium`:n]}),cssVars:i?void 0:s,themeClass:c?.themeClass,onRender:c?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:r}=this,i=e.icon&&this.rotate,a=(r||e.description)&&(u(),s(`div`,{class:L(`${t}-spin-description`)},[S(()=>r||e.description?.())],2)),o=e.icon?(u(),s(`div`,{key:1,class:L([`${t}-spin-body`,this.themeClass])},[K(`div`,{class:L([`${t}-spin`,i&&`${t}-spin--rotate`]),style:q(e.default?``:this.cssVars)},[S(()=>e.icon())],6),S(()=>a)],2)):(u(),s(`div`,{key:2,class:L([`${t}-spin-body`,this.themeClass])},[(u(),_(w,{clsPrefix:t,style:q(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:L(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),S(()=>a)],2));return this.onRender?.(),e.default?(u(),s(`div`,{key:3,class:L([`${t}-spin-container`,this.themeClass]),style:q(this.cssVars)},[K(`div`,{class:L([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:q(this.contentStyle)},[S(()=>e.default?.())],6),n(k,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),Be=_e({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ve=_e({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),He={class:`flex h-full flex-col`},Ue={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},We={class:`min-w-0`},Ge={class:`truncate font-heading text-[15px] font-bold`},Ke={class:`tech-label mt-1 text-ink-4`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-[11px] text-ink-4`},$e=3e3,$=8e3,et=15e3,tt=N({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:t}){let r=e,o=t,c=fe(),p=D(null),g=D(!1),v=D(``),b=D(!1),S=D(null),C=D(0),w=D($),E=a(()=>p.value?.messages??[]),k=a(()=>p.value?.ticket??null),A=a(()=>k.value?.status===`closed`);function ee(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function j(e){await f();let t=S.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&ee()?`smooth`:`auto`})}function ne(){let e=S.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function M(){g.value=!0;try{p.value=await F.detail(r.ticketId),C.value=p.value.last_id??0,o(`changed`)}catch(e){c.error(e instanceof W?e.message:`加载工单失败`)}finally{g.value=!1}}let N=!1;async function I(){if(!N&&p.value){N=!0;try{let e=await F.messagesSince(r.ticketId,C.value);e.last_id>C.value&&(C.value=e.last_id);let t=new Set(E.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ne();p.value.messages.push(...n),w.value=$e,e&&!v.value.trim()&&await j(!0),o(`changed`)}else w.value=w.value<$?$:Math.min(Math.round(w.value*1.6),et);e.status&&p.value.ticket.status!==e.status&&(p.value.ticket.status=e.status,o(`changed`))}catch{w.value=et}finally{N=!1}}}async function L(){let e=v.value.trim();if(e){b.value=!0;try{await F.reply(r.ticketId,e),v.value=``,await M(),await j(!0),w.value=$e}catch(e){c.error(e instanceof W?e.message:`发送失败`)}finally{b.value=!1}}}async function R(){try{await F.setStatus(r.ticketId,A.value?`open`:`closed`),c.success(A.value?`工单已重新打开`:`工单已关闭`),await M()}catch(e){c.error(e instanceof W?e.message:`操作失败`)}}let V=Te(),{pause:H,resume:G}=we(()=>void I(),w,{immediate:!1});return m(V,e=>{e===`visible`?(I(),G()):H()}),d(async()=>{await M(),G(),await j(!1)}),m(()=>r.ticketId,async()=>{C.value=0,w.value=$,await M(),await j(!1),G()}),i(H),(t,r)=>(u(),s(`div`,He,[K(`header`,Ue,[K(`div`,We,[K(`h3`,Ge,h(k.value?.subject??`加载中…`),1),K(`p`,Ke,[P(` #`+h(e.ticketId)+` `,1),e.staff&&k.value?(u(),s(J,{key:0},[P(` · 提交人 `+h(k.value.owner_nickname),1)],64)):l(``,!0),k.value?(u(),s(J,{key:1},[P(` · `+h(Y(Se)[k.value.status]),1)],64)):l(``,!0)])]),k.value?(u(),_(Y(O),{key:0,size:`small`,quaternary:``,disabled:g.value,onClick:R},{icon:U(()=>[(u(),_(y(A.value?Y(Ve):Y(ye)),{size:14}))]),default:U(()=>[P(` `+h(A.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):l(``,!0)]),K(`div`,{ref_key:`scroller`,ref:S,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[n(Y(ze),{show:g.value&&!E.value.length},{default:U(()=>[n(z,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:U(()=>[(u(!0),s(J,null,B(E.value,t=>(u(),s(`li`,{key:t.id,class:T([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[K(`div`,qe,[K(`div`,{class:T([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,t.sender_id===e.currentUserId?`justify-end`:``])},[K(`span`,Je,h(t.sender_nickname??`（已注销）`),1),K(`span`,Ye,h(t.create_time?.slice(5,16)??``),1)],2),K(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:q(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},h(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),K(`footer`,Xe,[n(Y(Z),{value:v.value,"onUpdate:value":r[0]||=e=>v.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:A.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:A.value||b.value,onKeydown:te(x(L,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),K(`div`,Ze,[K(`span`,Qe,h(v.value.length)+` / 1000`,1),n(Y(O),{type:`primary`,size:`small`,loading:b.value,disabled:A.value||!v.value.trim(),class:`!font-bold`,onClick:L},{icon:U(()=>[n(Y(xe),{size:14})]),default:U(()=>[r[1]||=P(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),nt={class:`mx-auto max-w-6xl`},rt={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},it={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},at={class:`mt-0.5 text-[13px] text-ink-3`},ot={class:`flex items-center gap-2`},st={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ct={class:`panel overflow-hidden`},lt={key:0,class:`flex flex-col gap-2 p-3`},ut={key:1,class:`grid place-items-center py-12`},dt=[`aria-current`,`onClick`],ft={class:`flex items-start justify-between gap-2`},pt={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},mt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},ht={class:`tech-label mt-1.5 text-ink-4`},gt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},_t={key:1,class:`grid h-full place-items-center py-16`},vt={class:`h-[82vh]`},yt={class:`flex justify-end gap-2`},bt=N({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let t=fe(),r=D([]),i=D(0),o=D(!0),c=D(`all`),f=D(null),p=D(!1),g=D(!1),v=D(!1),y=I({subject:``,body:``}),b=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],x=a(()=>r.value.find(e=>e.id===f.value)??null);async function S(e=!1){e||(o.value=!0);try{let e=await F.list(c.value===`all`?void 0:c.value);r.value=e.tickets,i.value=e.unread_total,f.value&&!r.value.some(e=>e.id===f.value)&&(f.value=null)}catch(n){e||t.error(n instanceof W?n.message:`加载工单失败`)}finally{o.value=!1}}function C(e){f.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(p.value=!0)}async function w(){if(!y.subject.trim()||!y.body.trim()){t.warning(`标题和描述都要填`);return}v.value=!0;try{let e=await F.create(y.subject.trim(),y.body.trim());t.success(`工单已提交，等待管理员回复`),g.value=!1,y.subject=``,y.body=``,await S(),f.value=e.id}catch(e){t.error(e instanceof W?e.message:`提交失败`)}finally{v.value=!1}}let T=Te(),{pause:E,resume:k}=we(()=>void S(!0),3e4,{immediate:!1});return m(T,e=>e===`visible`?(k(),void S(!0)):E()),m(c,()=>void S()),d(async()=>{await S(),k()}),(t,a)=>(u(),s(`div`,nt,[K(`header`,rt,[K(`div`,null,[K(`h1`,it,[P(h(e.staff?`工单处理`:`问题反馈`)+` `,1),i.value?(u(),_(Y(Fe),{key:0,value:i.value,type:`warning`},null,8,[`value`])):l(``,!0)]),K(`p`,at,h(e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),K(`div`,ot,[n(Y(se),{value:c.value,"onUpdate:value":a[0]||=e=>c.value=e,options:b,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?l(``,!0):(u(),_(Y(O),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:a[1]||=e=>g.value=!0},{icon:U(()=>[n(Y(be),{size:15})]),default:U(()=>[a[9]||=P(` 新建工单 `,-1)]),_:1}))])]),K(`div`,st,[K(`div`,ct,[o.value&&!r.value.length?(u(),s(`div`,lt,[(u(),s(J,null,B(4,e=>n(Y(de),{key:e,height:`58px`,sharp:!1})),64))])):r.value.length?(u(),_(z,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:U(()=>[(u(!0),s(J,null,B(r.value,t=>(u(),s(`li`,{key:t.id},[K(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:q({borderColor:`var(--border)`,backgroundColor:f.value===t.id?`var(--muted)`:`transparent`}),"aria-current":f.value===t.id?`true`:void 0,onClick:e=>C(t)},[K(`div`,ft,[K(`span`,pt,h(t.subject),1),t.unread?(u(),_(Y(Fe),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(u(),s(`span`,{key:1,class:`tech-label shrink-0`,style:q({color:t.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},h(Y(Se)[t.status]),5))]),K(`p`,mt,h(t.last_body),1),K(`p`,ht,[P(` #`+h(t.id)+` `,1),e.staff&&t.owner_nickname?(u(),s(J,{key:0},[P(` · `+h(t.owner_nickname),1)],64)):l(``,!0),P(` · `+h(Y(Ce)(t.update_time))+` · `+h(t.msg_count)+` 条 `,1)])],12,dt)]))),128))]),_:1})):(u(),s(`div`,ut,[n(Y(ie),{description:e.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:U(()=>[n(Y(ve),{size:30})]),_:1},8,[`description`])]))]),K(`div`,gt,[x.value?(u(),_(tt,{key:x.value.id,"ticket-id":x.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:a[2]||=e=>S(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(u(),s(`div`,_t,[n(Y(ie),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:U(()=>[n(Y(Be),{size:30})]),_:1})]))])]),n(Y(le),{show:p.value,"onUpdate:show":a[4]||=e=>p.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:U(()=>[n(Y(ue),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:U(()=>[K(`div`,vt,[x.value?(u(),_(tt,{key:x.value.id,"ticket-id":x.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:a[3]||=e=>S(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):l(``,!0)])]),_:1})]),_:1},8,[`show`]),n(Y(he),{show:g.value,"onUpdate:show":a[8]||=e=>g.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:U(()=>[K(`div`,yt,[n(Y(O),{quaternary:``,onClick:a[7]||=e=>g.value=!1},{default:U(()=>[...a[10]||=[P(`取消`,-1)]]),_:1}),n(Y(O),{type:`primary`,class:`!font-bold`,loading:v.value,onClick:w},{default:U(()=>[...a[11]||=[P(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:U(()=>[n(Y(ce),{label:`标题`,"show-feedback":!1},{default:U(()=>[n(Y(Z),{value:y.subject,"onUpdate:value":a[5]||=e=>y.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),n(Y(ce),{label:`详细描述`,"show-feedback":!1},{default:U(()=>[n(Y(Z),{value:y.body,"onUpdate:value":a[6]||=e=>y.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{bt as t};