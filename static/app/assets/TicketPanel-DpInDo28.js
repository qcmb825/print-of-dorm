import{$ as e,A as t,B as n,Bt as r,C as i,E as a,G as o,J as s,M as c,S as l,St as u,T as d,Tt as f,U as p,Vt as m,X as h,_ as g,_t as _,at as v,d as y,f as b,ht as x,it as S,j as C,st as w,w as T,zt as E}from"./endpoints-BqUstzml.js";import{$t as D,A as O,Jt as k,N as A,Xt as j,Zt as M,_ as N,a as P,an as F,b as I,cn as L,ft as R,g as z,h as ee,in as B,it as te,k as V,l as H,ln as ne,lt as U,mt as W,o as re,ot as G,qt as K,t as q,u as J,ut as ie,y as ae}from"./Button-D6v1m03e.js";import{t as oe}from"./Empty-B6U8ANm4.js";import{a as se}from"./Scrollbar-G7EEgfj_.js";import{r as ce}from"./cssr-BTmfuE7e.js";import{a as le,t as ue}from"./Select-B132II2C.js";import{t as Y}from"./FormItem-MWSOBT5v.js";import{t as X}from"./Input-EYrOr6kt.js";import{n as de,t as fe}from"./DrawerContent-CpIfDq1N.js";import{t as pe}from"./Skeleton-BiHZ9XXv.js";import{L as me,m as he,v as ge,y as _e}from"./index-Ch7pazmo.js";import{t as ve}from"./createLucideIcon-DWlWqmfZ.js";import{t as ye}from"./inbox-CySVruBW.js";import{t as be}from"./lock-D-DttQYY.js";import{t as xe}from"./plus-AtJnMoDf.js";import{t as Se}from"./send-42N6atbK.js";import{c as Ce,y as we}from"./format-DMiwIsNr.js";import{r as Te,t as Ee}from"./dist-WH0Ugp74.js";var Z=c({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=_(null),r=_(e.value),o=_(e.value),c=_(`up`),d=_(!1),f=l(()=>d.value?`${e.clsPrefix}-base-slot-machine-current-number--${c.value}-scroll`:null),p=l(()=>d.value?`${e.clsPrefix}-base-slot-machine-old-number--${c.value}-scroll`:null);S(u(e,`value`),(e,t)=>{r.value=t,o.value=e,n(m)});function m(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?h(`up`):n>t&&h(`down`))}function h(e){c.value=e,d.value=!1,n(()=>{t.value?.offsetWidth,d.value=!0})}return()=>{let{clsPrefix:n}=e;return s(),a(`span`,{ref:t,class:G(`${n}-base-slot-machine-number`)},[r.value===null?U(()=>null):(s(),a(`span`,{key:0,class:G([`${n}-base-slot-machine-old-number ${n}-base-slot-machine-old-number--top`,p.value])},[U(()=>r.value)],2)),i(`span`,{class:G([`${n}-base-slot-machine-current-number`,f.value])},[i(`span`,{ref:`numberWrapper`,class:G([`${n}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${n}-base-slot-machine-current-number__inner--not-number`])},[U(()=>o.value)],2)],2),r.value===null?U(()=>null):(s(),a(`span`,{key:2,class:G([`${n}-base-slot-machine-old-number ${n}-base-slot-machine-old-number--bottom`,p.value])},[U(()=>r.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=R;function De({duration:e=`.2s`}={}){return[K(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),K(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),K(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),K(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),K(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),K(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=K([K(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),K(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),K(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),K(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),k(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[k(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),re({duration:`.2s`,delay:`0s`}),k(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[M(`top`,{transform:`translateY(-100%)`}),M(`bottom`,{transform:`translateY(100%)`}),M(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),M(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),k(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[M(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),M(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),j(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[M(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=c({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){ie(`-base-slot-machine`,Oe,u(e,`clsPrefix`));let t=_(),n=_(),r=l(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return S(u(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:i,clsPrefix:o}=e;return typeof i==`number`?(s(),a(`span`,{key:1,class:G(`${o}-base-slot-machine`)},[C(F,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>r.value.map((e,i)=>(s(),T(Z,{clsPrefix:o,key:r.value.length-i-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),C(ee,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<i?(s(),T(Z,{key:2,clsPrefix:o,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(s(),a(`span`,{key:3,class:G(`${o}-base-slot-machine`)},[U(()=>i)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:A,self:Ae},Me=K([K(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),k(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[M(`as-is`,[k(`badge-sup`,{position:`static`,transform:`translateX(0)`},[me({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),M(`dot`,[k(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[K(`::before`,`border-radius: 4px;`)])]),k(`badge-sup`,`
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
 `,[me({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),k(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),K(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...V.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=c({name:`Badge`,props:Pe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=W(e),a=V(`Badge`,`-badge`,Me,je,e,n),s=_(!1),c=()=>{s.value=!0},u=()=>{s.value=!1},d=l(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!ae(t.value)));o(()=>{d.value&&(s.value=!0)});let f=N(`Badge`,i,n),p=l(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[D(`color`,t)]:o,fontFamily:s,fontSize:c}}=a.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||o,"--n-ripple-color":n||o,"--n-bezier":r,"--n-ripple-bezier":i}}),m=r?O(`badge`,l(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=z(r)),t}),p,e):void 0,h=l(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:n,appeared:s,showBadge:d,handleAfterEnter:c,handleAfterLeave:u,cssVars:r?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:i}=this;t?.();let o=i.default?.();return s(),a(`div`,{class:G([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!o}]),style:r(this.cssVars)},[U(()=>o),(s(),T(B,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(s(),a(`sup`,{key:1,class:G(`${e}-badge-sup`),title:le(this.value),style:r(this.offsetStyle)},[U(()=>I(i.value,()=>[this.dot?null:(s(),T(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(s(),T(P,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):U(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Ie=K([K(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),k(`spin-container`,`
 position: relative;
 `,[k(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[se()])]),k(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),k(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[M(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),k(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),k(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[M(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Le={small:20,medium:18,large:16},Re={...V.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...J,strokeWidth:Number},ze=c({name:`Spin`,props:Re,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=W(e),r=V(`Spin`,`-spin`,Ie,he,e,t),i=l(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?te(t):i[D(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?O(`spin`,l(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,o=ce(e,[`spinning`,`show`]),s=_(!1);return v(t=>{let n;if(o.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{s.value=!0},r),t(()=>{clearTimeout(n)});return}}s.value=o.value}),{mergedClsPrefix:t,active:s,mergedStrokeWidth:l(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Le[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,o=e.icon&&this.rotate,c=(n||e.description)&&(s(),a(`div`,{class:G(`${t}-spin-description`)},[U(()=>n||e.description?.())],2)),l=e.icon?(s(),a(`div`,{key:1,class:G([`${t}-spin-body`,this.themeClass])},[i(`div`,{class:G([`${t}-spin`,o&&`${t}-spin--rotate`]),style:r(e.default?``:this.cssVars)},[U(()=>e.icon())],6),U(()=>c)],2)):(s(),a(`div`,{key:2,class:G([`${t}-spin-body`,this.themeClass])},[(s(),T(H,{clsPrefix:t,style:r(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:G(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),U(()=>c)],2));return this.onRender?.(),e.default?(s(),a(`div`,{key:3,class:G([`${t}-spin-container`,this.themeClass]),style:r(this.cssVars)},[i(`div`,{class:G([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:r(this.contentStyle)},[U(()=>e.default?.())],6),C(B,{name:`fade-in-transition`},{default:()=>this.active?l:null},1024)],6)):l}}),Be=ve({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ve=ve({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),He={class:`flex h-full flex-col`},Ue={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},We={class:`min-w-0`},Ge={class:`truncate font-heading text-base font-bold`},Ke={class:`tech-label mt-1 text-ink-4 tech-label--cn text-xs`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-2xs text-ink-4`},$e=3e3,$=8e3,et=15e3,tt=c({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(c,{emit:u}){let v=c,x=u,D=ge(),O=_(null),k=_(!1),A=_(``),j=_(!1),M=_(null),N=_(0),P=_($),I=l(()=>O.value?.messages??[]),R=l(()=>O.value?.ticket??null),z=l(()=>R.value?.status===`closed`);function ee(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function B(e){await n();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&ee()?`smooth`:`auto`})}function te(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function V(){k.value=!0;try{O.value=await y.detail(v.ticketId),N.value=O.value.last_id??0,x(`changed`)}catch(e){D.error(e instanceof b?e.message:`加载工单失败`)}finally{k.value=!1}}let H=!1;async function U(){if(!H&&O.value){H=!0;try{let e=await y.messagesSince(v.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(I.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=te();O.value.messages.push(...n),P.value=$e,e&&!A.value.trim()&&await B(!0),x(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),et);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,x(`changed`))}catch{P.value=et}finally{H=!1}}}async function W(){let e=A.value.trim();if(e){j.value=!0;try{await y.reply(v.ticketId,e),A.value=``,await V(),await B(!0),P.value=$e}catch(e){D.error(e instanceof b?e.message:`发送失败`)}finally{j.value=!1}}}async function re(){try{await y.setStatus(v.ticketId,z.value?`open`:`closed`),D.success(z.value?`工单已重新打开`:`工单已关闭`),await V()}catch(e){D.error(e instanceof b?e.message:`操作失败`)}}let G=Ee(),{pause:K,resume:J}=Te(()=>void U(),P,{immediate:!1});return S(G,e=>{e===`visible`?(U(),J()):K()}),o(async()=>{await V(),J(),await B(!1)}),S(()=>v.ticketId,async()=>{N.value=0,P.value=$,await V(),await B(!1),J()}),p(K),(n,o)=>(s(),a(`div`,He,[i(`header`,Ue,[i(`div`,We,[i(`h3`,Ge,m(R.value?.subject??`加载中…`),1),i(`p`,Ke,[t(` #`+m(c.ticketId)+` `,1),c.staff&&R.value?(s(),a(g,{key:0},[t(` · 提交人 `+m(R.value.owner_nickname),1)],64)):d(``,!0),R.value?(s(),a(g,{key:1},[t(` · `+m(f(Ce)[R.value.status]),1)],64)):d(``,!0)])]),R.value?(s(),T(f(q),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:re},{icon:w(()=>[(s(),T(e(z.value?f(Ve):f(be)),{size:14}))]),default:w(()=>[t(` `+m(z.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):d(``,!0)]),i(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[C(f(ze),{show:k.value&&!I.value.length},{default:w(()=>[C(F,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:w(()=>[(s(!0),a(g,null,h(I.value,e=>(s(),a(`li`,{key:e.id,class:E([`flex`,e.sender_id===c.currentUserId?`justify-end`:`justify-start`])},[i(`div`,qe,[i(`div`,{class:E([`mb-1 flex items-center gap-2 text-xs text-ink-4`,e.sender_id===c.currentUserId?`justify-end`:``])},[i(`span`,Je,m(e.sender_nickname??`（已注销）`),1),i(`span`,Ye,m(e.create_time?.slice(5,16)??``),1)],2),i(`div`,{class:`rounded-xl border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:r(e.sender_id===c.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},m(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),i(`footer`,Xe,[C(f(X),{value:A.value,"onUpdate:value":o[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:z.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:z.value||j.value,onKeydown:L(ne(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),i(`div`,Ze,[i(`span`,Qe,m(A.value.length)+` / 1000`,1),C(f(q),{type:`primary`,size:`small`,loading:j.value,disabled:z.value||!A.value.trim(),class:`!font-bold`,onClick:W},{icon:w(()=>[C(f(Se),{size:14})]),default:w(()=>[o[1]||=t(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),nt={class:`mx-auto max-w-6xl`},rt={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},it={class:`flex items-center gap-2 font-heading text-xl font-bold sm:text-2xl`},at={class:`mt-0.5 text-sm text-ink-3`},ot={class:`flex items-center gap-2`},st={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ct={class:`panel overflow-hidden`},lt={key:0,class:`flex flex-col gap-2 p-3`},ut={key:1,class:`grid place-items-center py-12`},dt=[`aria-current`,`onClick`],ft={class:`flex items-start justify-between gap-2`},pt={class:`min-w-0 flex-1 truncate text-sm font-semibold`},mt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ht={class:`tech-label mt-1.5 text-ink-4 tech-label--cn text-xs`},gt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},_t={key:1,class:`grid h-full place-items-center py-16`},vt={class:`h-[82vh]`},yt={class:`flex justify-end gap-2`},bt=c({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let n=ge(),c=_([]),u=_(0),p=_(!0),v=_(`all`),E=_(null),D=_(!1),O=_(!1),k=_(!1),A=x({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=l(()=>c.value.find(e=>e.id===E.value)??null);async function N(e=!1){e||(p.value=!0);try{let e=await y.list(v.value===`all`?void 0:v.value);c.value=e.tickets,u.value=e.unread_total,E.value&&!c.value.some(e=>e.id===E.value)&&(E.value=null)}catch(t){e||n.error(t instanceof b?t.message:`加载工单失败`)}finally{p.value=!1}}function P(e){E.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function I(){if(!A.subject.trim()||!A.body.trim()){n.warning(`标题和描述都要填`);return}k.value=!0;try{let e=await y.create(A.subject.trim(),A.body.trim());n.success(`工单已提交，等待管理员回复`),O.value=!1,A.subject=``,A.body=``,await N(),E.value=e.id}catch(e){n.error(e instanceof b?e.message:`提交失败`)}finally{k.value=!1}}let L=Ee(),{pause:R,resume:z}=Te(()=>void N(!0),3e4,{immediate:!1});return S(L,e=>e===`visible`?(z(),void N(!0)):R()),S(v,()=>void N()),o(async()=>{await N(),z()}),(n,o)=>(s(),a(`div`,nt,[i(`header`,rt,[i(`div`,null,[i(`h1`,it,[t(m(e.staff?`工单处理`:`问题反馈`)+` `,1),u.value?(s(),T(f(Fe),{key:0,value:u.value,type:`warning`},null,8,[`value`])):d(``,!0)]),i(`p`,at,m(e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),i(`div`,ot,[C(f(ue),{value:v.value,"onUpdate:value":o[0]||=e=>v.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?d(``,!0):(s(),T(f(q),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:o[1]||=e=>O.value=!0},{icon:w(()=>[C(f(xe),{size:15})]),default:w(()=>[o[9]||=t(` 新建工单 `,-1)]),_:1}))])]),i(`div`,st,[i(`div`,ct,[p.value&&!c.value.length?(s(),a(`div`,lt,[(s(),a(g,null,h(4,e=>C(f(pe),{key:e,height:`58px`,sharp:!1})),64))])):c.value.length?(s(),T(F,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:w(()=>[(s(!0),a(g,null,h(c.value,n=>(s(),a(`li`,{key:n.id},[i(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:r({borderColor:`var(--border)`,backgroundColor:E.value===n.id?`var(--muted)`:`transparent`}),"aria-current":E.value===n.id?`true`:void 0,onClick:e=>P(n)},[i(`div`,ft,[i(`span`,pt,m(n.subject),1),n.unread?(s(),T(f(Fe),{key:0,value:n.unread,type:`warning`},null,8,[`value`])):(s(),a(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:r({color:n.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},m(f(Ce)[n.status]),5))]),i(`p`,mt,m(n.last_body),1),i(`p`,ht,[t(` #`+m(n.id)+` `,1),e.staff&&n.owner_nickname?(s(),a(g,{key:0},[t(` · `+m(n.owner_nickname),1)],64)):d(``,!0),t(` · `+m(f(we)(n.update_time))+` · `+m(n.msg_count)+` 条 `,1)])],12,dt)]))),128))]),_:1})):(s(),a(`div`,ut,[C(f(oe),{description:e.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:w(()=>[C(f(ye),{size:30})]),_:1},8,[`description`])]))]),i(`div`,gt,[M.value?(s(),T(tt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:o[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(s(),a(`div`,_t,[C(f(oe),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:w(()=>[C(f(Be),{size:30})]),_:1})]))])]),C(f(de),{show:D.value,"onUpdate:show":o[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:w(()=>[C(f(fe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:w(()=>[i(`div`,vt,[M.value?(s(),T(tt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:o[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):d(``,!0)])]),_:1})]),_:1},8,[`show`]),C(f(_e),{show:O.value,"onUpdate:show":o[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:w(()=>[i(`div`,yt,[C(f(q),{quaternary:``,onClick:o[7]||=e=>O.value=!1},{default:w(()=>[...o[10]||=[t(`取消`,-1)]]),_:1}),C(f(q),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:I},{default:w(()=>[...o[11]||=[t(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:w(()=>[C(f(Y),{label:`标题`,"show-feedback":!1},{default:w(()=>[C(f(X),{value:A.subject,"onUpdate:value":o[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),C(f(Y),{label:`详细描述`,"show-feedback":!1},{default:w(()=>[C(f(X),{value:A.body,"onUpdate:value":o[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{bt as t};