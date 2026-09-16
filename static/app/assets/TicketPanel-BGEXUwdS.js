import{A as e,An as t,C as n,Cn as r,Cr as i,Dn as a,Er as o,Et as s,Fn as c,G as l,H as u,Kn as d,M as f,N as p,Nn as m,O as h,On as g,Pn as _,S as v,St as y,Tr as b,V as x,Vn as S,Wn as C,Yn as w,Zn as T,_n as E,an as D,ar as O,bn as k,br as A,cn as j,d as M,dn as N,er as ee,f as P,gn as F,gt as te,hr as I,jn as L,k as R,kn as z,ln as B,m as V,nr as H,on as U,pr as W,rr as G,v as K,vt as q,wr as J,wt as Y,xn as ne,xt as X,y as re}from"./endpoints-DguQVVk7.js";import{t as ie}from"./Empty-BFjxMWo5.js";import{a as ae}from"./Scrollbar-DSXt8xuo.js";import{r as oe}from"./cssr-BzPMyp1o.js";import{a as se,t as ce}from"./Select-BY4yWkgX.js";import{t as le}from"./FormItem-0b5jkXX7.js";import{t as Z}from"./Input-B9tzuA0A.js";import{n as ue,t as de}from"./DrawerContent-C5iBDyiG.js";import{t as fe}from"./Skeleton-BTWN3gZh.js";import{b as pe,g as me,x as he,z as ge}from"./index-DwEf3xIY.js";import{t as _e}from"./createLucideIcon-BYXIY-5M.js";import{t as ve}from"./inbox-BB1cz1q_.js";import{t as ye}from"./lock-CiQDna3D.js";import{t as be}from"./plus-Bey8VxOd.js";import{t as xe}from"./send-BfH8Hyog.js";import{c as Se,v as Ce}from"./format-D-wfinI7.js";import{r as we,t as Te}from"./dist-H-VlWBwe.js";var Ee=c({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=I(null),n=I(e.value),r=I(e.value),i=I(`up`),o=I(!1),s=a(()=>o.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),c=a(()=>o.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);H(A(e,`value`),(e,t)=>{n.value=t,r.value=e,S(l)});function l(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?u(`up`):n>t&&u(`down`))}function u(e){i.value=e,o.value=!1,S(()=>{t.value?.offsetWidth,o.value=!0})}return()=>{let{clsPrefix:i}=e;return w(),L(`span`,{ref:t,class:q(`${i}-base-slot-machine-number`)},[n.value===null?X(()=>null):(w(),L(`span`,{key:0,class:q([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,c.value])},[X(()=>n.value)],2)),g(`span`,{class:q([`${i}-base-slot-machine-current-number`,s.value])},[g(`span`,{ref:`numberWrapper`,class:q([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[X(()=>r.value)],2)],2),n.value===null?X(()=>null):(w(),L(`span`,{key:2,class:q([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,c.value])},[X(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=Y;function De({duration:e=`.2s`}={}){return[D(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),D(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),D(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),D(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),D(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),D(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=D([D(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),D(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),D(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),D(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),U(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[U(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),re({duration:`.2s`,delay:`0s`}),U(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[B(`top`,{transform:`translateY(-100%)`}),B(`bottom`,{transform:`translateY(100%)`}),B(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),B(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),U(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[B(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),B(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),j(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[B(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=c({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){y(`-base-slot-machine`,Oe,A(e,`clsPrefix`));let t=I(),n=I(),r=a(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return H(A(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:i,clsPrefix:a}=e;return typeof i==`number`?(w(),L(`span`,{key:1,class:q(`${a}-base-slot-machine`)},[_(E,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>r.value.map((e,i)=>(w(),z(Ee,{clsPrefix:a,key:r.value.length-i-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),_(h,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<i?(w(),z(Ee,{key:2,clsPrefix:a,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(w(),L(`span`,{key:3,class:q(`${a}-base-slot-machine`)},[X(()=>i)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:l,self:Ae},Me=D([D(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),U(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[B(`as-is`,[U(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ge({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),B(`dot`,[U(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[D(`::before`,`border-radius: 4px;`)])]),U(`badge-sup`,`
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
 `,[ge({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),U(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),D(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...x.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=c({name:`Badge`,props:Pe,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:o}=s(t),c=x(`Badge`,`-badge`,Me,je,t,r),l=I(!1),p=()=>{l.value=!0},m=()=>{l.value=!1},h=a(()=>t.show&&(t.dot||t.value!==void 0&&!(!t.showZero&&Number(t.value)<=0)||!f(n.value)));d(()=>{h.value&&(l.value=!0)});let g=e(`Badge`,o,r),_=a(()=>{let{type:e,color:n}=t,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[N(`color`,e)]:a,fontFamily:o,fontSize:s}}=c.value;return{"--n-font-size":s,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),v=i?u(`badge`,a(()=>{let e=``,{type:n,color:r}=t;return n&&(e+=n[0]),r&&(e+=R(r)),e}),_,t):void 0,y=a(()=>{let{offset:e}=t;if(!e)return;let[n,r]=e,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${g?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:g,mergedClsPrefix:r,appeared:l,showBadge:h,handleAfterEnter:p,handleAfterLeave:m,cssVars:i?void 0:_,themeClass:v?.themeClass,onRender:v?.onRender,offsetStyle:y}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return w(),L(`div`,{class:q([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:b(this.cssVars)},[X(()=>i),(w(),z(F,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(w(),L(`sup`,{key:1,class:q(`${e}-badge-sup`),title:se(this.value),style:b(this.offsetStyle)},[X(()=>p(r.value,()=>[this.dot?null:(w(),z(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(w(),z(K,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):X(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Ie=D([D(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),U(`spin-container`,`
 position: relative;
 `,[U(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[ae()])]),U(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),U(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[B(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),U(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),U(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[B(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Le={small:20,medium:18,large:16},Re={...x.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...n,strokeWidth:Number},ze=c({name:`Spin`,props:Re,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=s(e),r=x(`Spin`,`-spin`,Ie,me,e,t),i=a(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?te(t):i[N(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=n?u(`spin`,a(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,c=oe(e,[`spinning`,`show`]),l=I(!1);return G(t=>{let n;if(c.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=c.value}),{mergedClsPrefix:t,active:l,mergedStrokeWidth:a(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Le[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,i=(n||e.description)&&(w(),L(`div`,{class:q(`${t}-spin-description`)},[X(()=>n||e.description?.())],2)),a=e.icon?(w(),L(`div`,{key:1,class:q([`${t}-spin-body`,this.themeClass])},[g(`div`,{class:q([`${t}-spin`,r&&`${t}-spin--rotate`]),style:b(e.default?``:this.cssVars)},[X(()=>e.icon())],6),X(()=>i)],2)):(w(),L(`div`,{key:2,class:q([`${t}-spin-body`,this.themeClass])},[(w(),z(v,{clsPrefix:t,style:b(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:q(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),X(()=>i)],2));return this.onRender?.(),e.default?(w(),L(`div`,{key:3,class:q([`${t}-spin-container`,this.themeClass]),style:b(this.cssVars)},[g(`div`,{class:q([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:b(this.contentStyle)},[X(()=>e.default?.())],6),_(F,{name:`fade-in-transition`},{default:()=>this.active?a:null},1024)],6)):a}}),Be=_e({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ve=_e({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),He={class:`flex h-full flex-col`},Ue={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},We={class:`min-w-0`},Ge={class:`truncate font-heading text-[15px] font-bold`},Ke={class:`tech-label mt-1 text-ink-4`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-[11px] text-ink-4`},$e=3e3,$=8e3,et=15e3,tt=c({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:n}){let s=e,c=n,l=pe(),u=I(null),f=I(!1),p=I(``),h=I(!1),v=I(null),y=I(0),x=I($),D=a(()=>u.value?.messages??[]),A=a(()=>u.value?.ticket??null),j=a(()=>A.value?.status===`closed`);function N(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function F(e){await S();let t=v.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&N()?`smooth`:`auto`})}function te(){let e=v.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function R(){f.value=!0;try{u.value=await M.detail(s.ticketId),y.value=u.value.last_id??0,c(`changed`)}catch(e){l.error(e instanceof P?e.message:`加载工单失败`)}finally{f.value=!1}}let B=!1;async function U(){if(!B&&u.value){B=!0;try{let e=await M.messagesSince(s.ticketId,y.value);e.last_id>y.value&&(y.value=e.last_id);let t=new Set(D.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=te();u.value.messages.push(...n),x.value=$e,e&&!p.value.trim()&&await F(!0),c(`changed`)}else x.value=x.value<$?$:Math.min(Math.round(x.value*1.6),et);e.status&&u.value.ticket.status!==e.status&&(u.value.ticket.status=e.status,c(`changed`))}catch{x.value=et}finally{B=!1}}}async function W(){let e=p.value.trim();if(e){h.value=!0;try{await M.reply(s.ticketId,e),p.value=``,await R(),await F(!0),x.value=$e}catch(e){l.error(e instanceof P?e.message:`发送失败`)}finally{h.value=!1}}}async function G(){try{await M.setStatus(s.ticketId,j.value?`open`:`closed`),l.success(j.value?`工单已重新打开`:`工单已关闭`),await R()}catch(e){l.error(e instanceof P?e.message:`操作失败`)}}let K=Te(),{pause:q,resume:Y}=we(()=>void U(),x,{immediate:!1});return H(K,e=>{e===`visible`?(U(),Y()):q()}),d(async()=>{await R(),Y(),await F(!1)}),H(()=>s.ticketId,async()=>{y.value=0,x.value=$,await R(),await F(!1),Y()}),C(q),(n,a)=>(w(),L(`div`,He,[g(`header`,Ue,[g(`div`,We,[g(`h3`,Ge,o(A.value?.subject??`加载中…`),1),g(`p`,Ke,[m(` #`+o(e.ticketId)+` `,1),e.staff&&A.value?(w(),L(r,{key:0},[m(` · 提交人 `+o(A.value.owner_nickname),1)],64)):t(``,!0),A.value?(w(),L(r,{key:1},[m(` · `+o(i(Se)[A.value.status]),1)],64)):t(``,!0)])]),A.value?(w(),z(i(V),{key:0,size:`small`,quaternary:``,disabled:f.value,onClick:G},{icon:O(()=>[(w(),z(ee(j.value?i(Ve):i(ye)),{size:14}))]),default:O(()=>[m(` `+o(j.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):t(``,!0)]),g(`div`,{ref_key:`scroller`,ref:v,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[_(i(ze),{show:f.value&&!D.value.length},{default:O(()=>[_(E,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:O(()=>[(w(!0),L(r,null,T(D.value,t=>(w(),L(`li`,{key:t.id,class:J([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[g(`div`,qe,[g(`div`,{class:J([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,t.sender_id===e.currentUserId?`justify-end`:``])},[g(`span`,Je,o(t.sender_nickname??`（已注销）`),1),g(`span`,Ye,o(t.create_time?.slice(5,16)??``),1)],2),g(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:b(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},o(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),g(`footer`,Xe,[_(i(Z),{value:p.value,"onUpdate:value":a[0]||=e=>p.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:j.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:j.value||h.value,onKeydown:k(ne(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),g(`div`,Ze,[g(`span`,Qe,o(p.value.length)+` / 1000`,1),_(i(V),{type:`primary`,size:`small`,loading:h.value,disabled:j.value||!p.value.trim(),class:`!font-bold`,onClick:W},{icon:O(()=>[_(i(xe),{size:14})]),default:O(()=>[a[1]||=m(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),nt={class:`mx-auto max-w-6xl`},rt={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},it={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},at={class:`mt-0.5 text-[13px] text-ink-3`},ot={class:`flex items-center gap-2`},st={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ct={class:`panel overflow-hidden`},lt={key:0,class:`flex flex-col gap-2 p-3`},ut={key:1,class:`grid place-items-center py-12`},dt=[`aria-current`,`onClick`],ft={class:`flex items-start justify-between gap-2`},pt={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},mt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},ht={class:`tech-label mt-1.5 text-ink-4`},gt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},_t={key:1,class:`grid h-full place-items-center py-16`},vt={class:`h-[82vh]`},yt={class:`flex justify-end gap-2`},bt=c({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let n=pe(),s=I([]),c=I(0),l=I(!0),u=I(`all`),f=I(null),p=I(!1),h=I(!1),v=I(!1),y=W({subject:``,body:``}),x=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],S=a(()=>s.value.find(e=>e.id===f.value)??null);async function C(e=!1){e||(l.value=!0);try{let e=await M.list(u.value===`all`?void 0:u.value);s.value=e.tickets,c.value=e.unread_total,f.value&&!s.value.some(e=>e.id===f.value)&&(f.value=null)}catch(t){e||n.error(t instanceof P?t.message:`加载工单失败`)}finally{l.value=!1}}function D(e){f.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(p.value=!0)}async function k(){if(!y.subject.trim()||!y.body.trim()){n.warning(`标题和描述都要填`);return}v.value=!0;try{let e=await M.create(y.subject.trim(),y.body.trim());n.success(`工单已提交，等待管理员回复`),h.value=!1,y.subject=``,y.body=``,await C(),f.value=e.id}catch(e){n.error(e instanceof P?e.message:`提交失败`)}finally{v.value=!1}}let A=Te(),{pause:j,resume:N}=we(()=>void C(!0),3e4,{immediate:!1});return H(A,e=>e===`visible`?(N(),void C(!0)):j()),H(u,()=>void C()),d(async()=>{await C(),N()}),(n,a)=>(w(),L(`div`,nt,[g(`header`,rt,[g(`div`,null,[g(`h1`,it,[m(o(e.staff?`工单处理`:`问题反馈`)+` `,1),c.value?(w(),z(i(Fe),{key:0,value:c.value,type:`warning`},null,8,[`value`])):t(``,!0)]),g(`p`,at,o(e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),g(`div`,ot,[_(i(ce),{value:u.value,"onUpdate:value":a[0]||=e=>u.value=e,options:x,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?t(``,!0):(w(),z(i(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:a[1]||=e=>h.value=!0},{icon:O(()=>[_(i(be),{size:15})]),default:O(()=>[a[9]||=m(` 新建工单 `,-1)]),_:1}))])]),g(`div`,st,[g(`div`,ct,[l.value&&!s.value.length?(w(),L(`div`,lt,[(w(),L(r,null,T(4,e=>_(i(fe),{key:e,height:`58px`,sharp:!1})),64))])):s.value.length?(w(),z(E,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:O(()=>[(w(!0),L(r,null,T(s.value,n=>(w(),L(`li`,{key:n.id},[g(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:b({borderColor:`var(--border)`,backgroundColor:f.value===n.id?`var(--muted)`:`transparent`}),"aria-current":f.value===n.id?`true`:void 0,onClick:e=>D(n)},[g(`div`,ft,[g(`span`,pt,o(n.subject),1),n.unread?(w(),z(i(Fe),{key:0,value:n.unread,type:`warning`},null,8,[`value`])):(w(),L(`span`,{key:1,class:`tech-label shrink-0`,style:b({color:n.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},o(i(Se)[n.status]),5))]),g(`p`,mt,o(n.last_body),1),g(`p`,ht,[m(` #`+o(n.id)+` `,1),e.staff&&n.owner_nickname?(w(),L(r,{key:0},[m(` · `+o(n.owner_nickname),1)],64)):t(``,!0),m(` · `+o(i(Ce)(n.update_time))+` · `+o(n.msg_count)+` 条 `,1)])],12,dt)]))),128))]),_:1})):(w(),L(`div`,ut,[_(i(ie),{description:e.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:O(()=>[_(i(ve),{size:30})]),_:1},8,[`description`])]))]),g(`div`,gt,[S.value?(w(),z(tt,{key:S.value.id,"ticket-id":S.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:a[2]||=e=>C(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(w(),L(`div`,_t,[_(i(ie),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:O(()=>[_(i(Be),{size:30})]),_:1})]))])]),_(i(ue),{show:p.value,"onUpdate:show":a[4]||=e=>p.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:O(()=>[_(i(de),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:O(()=>[g(`div`,vt,[S.value?(w(),z(tt,{key:S.value.id,"ticket-id":S.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:a[3]||=e=>C(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):t(``,!0)])]),_:1})]),_:1},8,[`show`]),_(i(he),{show:h.value,"onUpdate:show":a[8]||=e=>h.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:O(()=>[g(`div`,yt,[_(i(V),{quaternary:``,onClick:a[7]||=e=>h.value=!1},{default:O(()=>[...a[10]||=[m(`取消`,-1)]]),_:1}),_(i(V),{type:`primary`,class:`!font-bold`,loading:v.value,onClick:k},{default:O(()=>[...a[11]||=[m(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:O(()=>[_(i(le),{label:`标题`,"show-feedback":!1},{default:O(()=>[_(i(Z),{value:y.subject,"onUpdate:value":a[5]||=e=>y.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),_(i(le),{label:`详细描述`,"show-feedback":!1},{default:O(()=>[_(i(Z),{value:y.body,"onUpdate:value":a[6]||=e=>y.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{bt as t};