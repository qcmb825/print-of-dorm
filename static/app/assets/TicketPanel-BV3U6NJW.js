import{B as e,H as t,Ht as n,J as r,Mt as i,P as a,Pt as o,St as s,U as c,V as l,Y as u,ct as d,d as f,dt as p,f as m,gt as h,in as g,nn as _,ot as v,pt as y,q as b,rn as x,rt as S,wt as C,xt as w,z as T,zt as E}from"./endpoints-6TYL4VMB.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as ee,k as B,n as V,nn as H,nt as U,o as W,on as te,rn as G,s as ne,sn as re,st as K,t as q,u as J,ut as ie,v as ae,x as oe}from"./createLucideIcon-BnOls5eb.js";import{t as Y}from"./Input-CLtGFe94.js";import{a as se}from"./Scrollbar-8y1rFSO9.js";import{a as ce,t as le}from"./Select-CRbeL82w.js";import{r as ue}from"./cssr-SoXTAoYa.js";import{t as X}from"./FormItem-sQOM9gKm.js";import{n as de,t as fe}from"./DrawerContent-C6gGV_mD.js";import{t as pe}from"./Skeleton-WhbxiWJC.js";import{t as me}from"./inbox-DAidPjEW.js";import{t as he}from"./lock-CTyVIYM-.js";import{t as ge}from"./plus-BhuIf7dl.js";import{t as _e}from"./send-CW0Xe-CU.js";import{C as ve,S as Z,V as ye,v as be}from"./index-CaRy4vYA.js";import{c as xe,y as Se}from"./format-CSaO5IzS.js";import{t as Ce}from"./EmptyState-DYFIaA1s.js";import{t as we}from"./PageHeader-DSlb65D6.js";import{r as Te,t as Ee}from"./dist-DJ941_D0.js";var De=u({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(t){let n=o(null),r=o(t.value),i=o(t.value),a=o(`up`),s=o(!1),l=T(()=>s.value?`${t.clsPrefix}-base-slot-machine-current-number--${a.value}-scroll`:null),u=T(()=>s.value?`${t.clsPrefix}-base-slot-machine-old-number--${a.value}-scroll`:null);w(E(t,`value`),(e,t)=>{r.value=t,i.value=e,S(d)});function d(){let e=t.newOriginalNumber,n=t.oldOriginalNumber;n!==void 0&&e!==void 0&&(e>n?f(`up`):n>e&&f(`down`))}function f(e){a.value=e,s.value=!1,S(()=>{n.value?.offsetWidth,s.value=!0})}return()=>{let{clsPrefix:a}=t;return p(),c(`span`,{ref:n,class:z(`${a}-base-slot-machine-number`)},[r.value===null?K(()=>null):(p(),c(`span`,{key:0,class:z([`${a}-base-slot-machine-old-number ${a}-base-slot-machine-old-number--top`,u.value])},[K(()=>r.value)],2)),e(`span`,{class:z([`${a}-base-slot-machine-current-number`,l.value])},[e(`span`,{ref:`numberWrapper`,class:z([`${a}-base-slot-machine-current-number__inner`,typeof t.value!=`number`&&`${a}-base-slot-machine-current-number__inner--not-number`])},[K(()=>i.value)],2)],2),r.value===null?K(()=>null):(p(),c(`span`,{key:2,class:z([`${a}-base-slot-machine-old-number ${a}-base-slot-machine-old-number--bottom`,u.value])},[K(()=>r.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=ie;function Oe({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),O(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),O(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),O(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),O(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),O(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var ke=O([O(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),O(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),O(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),O(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),A(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[A(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[Oe({duration:`.2s`}),ne({duration:`.2s`,delay:`0s`}),A(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[j(`top`,{transform:`translateY(-100%)`}),j(`bottom`,{transform:`translateY(100%)`}),j(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),j(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),A(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[j(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),j(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),k(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[j(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),Ae=u({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){F(`-base-slot-machine`,ke,E(e,`clsPrefix`));let t=o(),n=o(),i=T(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return w(E(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:a,clsPrefix:o}=e;return typeof a==`number`?(p(),c(`span`,{key:1,class:z(`${o}-base-slot-machine`)},[r(G,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>i.value.map((e,r)=>(p(),l(De,{clsPrefix:o,key:i.value.length-r-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),r(R,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<a?(p(),l(De,{key:2,clsPrefix:o,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(p(),c(`span`,{key:3,class:z(`${o}-base-slot-machine`)},[K(()=>a)],2))}}});function je(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Me={name:`Badge`,common:ee,self:je},Ne=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[j(`as-is`,[A(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ye({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),j(`dot`,[A(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[O(`::before`,`border-radius: 4px;`)])]),A(`badge-sup`,`
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
 `,[ye({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),A(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),O(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Pe=[`title`],Fe={...B.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Ie=u({name:`Badge`,props:Fe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=L(e),a=B(`Badge`,`-badge`,Ne,Me,e,n),s=o(!1),c=()=>{s.value=!0},l=()=>{s.value=!1},u=T(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!P(t.value)));d(()=>{u.value&&(s.value=!0)});let f=ae(`Badge`,i,n),p=T(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,t)]:o,fontFamily:s,fontSize:c}}=a.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||o,"--n-ripple-color":n||o,"--n-bezier":r,"--n-ripple-bezier":i}}),m=r?D(`badge`,T(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=N(r)),t}),p,e):void 0,h=T(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:n,appeared:s,showBadge:u,handleAfterEnter:c,handleAfterLeave:l,cssVars:r?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return p(),c(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:x(this.cssVars)},[K(()=>i),(p(),l(H,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(p(),c(`sup`,{key:1,class:z(`${e}-badge-sup`),title:ce(this.value),style:x(this.offsetStyle)},[K(()=>oe(r.value,()=>[this.dot?null:(p(),l(Ae,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(p(),l(W,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):K(()=>null)],14,Pe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Le=O([O(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),A(`spin-container`,`
 position: relative;
 `,[A(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[se()])]),A(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),A(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[j(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),A(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),A(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[j(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Re={small:20,medium:18,large:16},ze={...B.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Be=u({name:`Spin`,props:ze,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=L(e),r=B(`Spin`,`-spin`,Le,be,e,t),i=T(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?U(t):i[M(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?D(`spin`,T(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,c=ue(e,[`spinning`,`show`]),l=o(!1);return s(t=>{let n;if(c.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=c.value}),{mergedClsPrefix:t,active:l,mergedStrokeWidth:T(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Re[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:t,mergedClsPrefix:n,description:i}=this,a=t.icon&&this.rotate,o=(i||t.description)&&(p(),c(`div`,{class:z(`${n}-spin-description`)},[K(()=>i||t.description?.())],2)),s=t.icon?(p(),c(`div`,{key:1,class:z([`${n}-spin-body`,this.themeClass])},[e(`div`,{class:z([`${n}-spin`,a&&`${n}-spin--rotate`]),style:x(t.default?``:this.cssVars)},[K(()=>t.icon())],6),K(()=>o)],2)):(p(),c(`div`,{key:2,class:z([`${n}-spin-body`,this.themeClass])},[(p(),l(J,{clsPrefix:n,style:x(t.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${n}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),K(()=>o)],2));return this.onRender?.(),t.default?(p(),c(`div`,{key:3,class:z([`${n}-spin-container`,this.themeClass]),style:x(this.cssVars)},[e(`div`,{class:z([`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass]),style:x(this.contentStyle)},[K(()=>t.default?.())],6),r(H,{name:`fade-in-transition`},{default:()=>this.active?s:null},1024)],6)):s}}),Ve=q({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),He=q({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),Ue={class:`flex h-full flex-col`},We={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ge={class:`min-w-0`},Ke={class:`truncate font-heading text-base font-bold`},qe={class:`tech-label mt-1 text-ink-4 tech-label--cn text-xs`},Je={class:`max-w-[86%]`},Ye={class:`font-semibold`},Xe={class:`tnum`},Ze={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Qe={class:`mt-2 flex items-center justify-between gap-3`},$e={class:`tnum text-2xs text-ink-4`},et=3e3,$=8e3,tt=15e3,nt=u({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(i,{emit:s}){let u=i,E=s,D=Z(),O=o(null),k=o(!1),A=o(``),j=o(!1),M=o(null),N=o(0),P=o($),F=T(()=>O.value?.messages??[]),I=T(()=>O.value?.ticket??null),L=T(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await S();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function ee(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function B(){k.value=!0;try{O.value=await f.detail(u.ticketId),N.value=O.value.last_id??0,E(`changed`)}catch(e){D.error(e instanceof m?e.message:`加载工单失败`)}finally{k.value=!1}}let H=!1;async function U(){if(!H&&O.value){H=!0;try{let e=await f.messagesSince(u.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();O.value.messages.push(...n),P.value=et,e&&!A.value.trim()&&await z(!0),E(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,E(`changed`))}catch{P.value=tt}finally{H=!1}}}async function W(){let e=A.value.trim();if(e){j.value=!0;try{await f.reply(u.ticketId,e),A.value=``,await B(),await z(!0),P.value=et}catch(e){D.error(e instanceof m?e.message:`发送失败`)}finally{j.value=!1}}}async function ne(){try{await f.setStatus(u.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重新打开`:`工单已关闭`),await B()}catch(e){D.error(e instanceof m?e.message:`操作失败`)}}let K=Ee(),{pause:q,resume:J}=Te(()=>void U(),P,{immediate:!1});return w(K,e=>{e===`visible`?(U(),J()):q()}),d(async()=>{await B(),J(),await z(!1)}),w(()=>u.ticketId,async()=>{N.value=0,P.value=$,await B(),await z(!1),J()}),v(q),(o,s)=>(p(),c(`div`,Ue,[e(`header`,We,[e(`div`,Ge,[e(`h3`,Ke,g(I.value?.subject??`读取中`),1),e(`p`,qe,[b(` #`+g(i.ticketId)+` `,1),i.staff&&I.value?(p(),c(a,{key:0},[b(` · 提交人 `+g(I.value.owner_nickname),1)],64)):t(``,!0),I.value?(p(),c(a,{key:1},[b(` · `+g(n(xe)[I.value.status]),1)],64)):t(``,!0)])]),I.value?(p(),l(n(V),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:ne},{icon:C(()=>[(p(),l(h(L.value?n(He):n(he)),{size:14}))]),default:C(()=>[b(` `+g(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):t(``,!0)]),e(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[r(n(Be),{show:k.value&&!F.value.length},{default:C(()=>[r(G,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:C(()=>[(p(!0),c(a,null,y(F.value,t=>(p(),c(`li`,{key:t.id,class:_([`flex`,t.sender_id===i.currentUserId?`justify-end`:`justify-start`])},[e(`div`,Je,[e(`div`,{class:_([`mb-1 flex items-center gap-2 text-xs text-ink-4`,t.sender_id===i.currentUserId?`justify-end`:``])},[e(`span`,Ye,g(t.sender_nickname??`（已注销）`),1),e(`span`,Xe,g(t.create_time?.slice(5,16)??``),1)],2),e(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:x(t.sender_id===i.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},g(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),e(`footer`,Ze,[r(n(Y),{value:A.value,"onUpdate:value":s[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:te(re(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),e(`div`,Qe,[e(`span`,$e,g(A.value.length)+` / 1000`,1),r(n(V),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:W},{icon:C(()=>[r(n(_e),{size:14})]),default:C(()=>[s[1]||=b(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-sm font-semibold`},dt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-4 tech-label--cn text-xs`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=u({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(s){let u=Z(),h=o([]),_=o(0),v=o(!0),S=o(`all`),E=o(null),D=o(!1),O=o(!1),k=o(!1),A=i({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=T(()=>h.value.find(e=>e.id===E.value)??null);async function N(e=!1){e||(v.value=!0);try{let e=await f.list(S.value===`all`?void 0:S.value);h.value=e.tickets,_.value=e.unread_total,E.value&&!h.value.some(e=>e.id===E.value)&&(E.value=null)}catch(t){e||u.error(t instanceof m?t.message:`加载工单失败`)}finally{v.value=!1}}function P(e){E.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function F(){if(!A.subject.trim()||!A.body.trim()){u.warning(`标题和描述都要填`);return}k.value=!0;try{let e=await f.create(A.subject.trim(),A.body.trim());u.success(`工单已提交 · 等待回复`),O.value=!1,A.subject=``,A.body=``,await N(),E.value=e.id}catch(e){u.error(e instanceof m?e.message:`提交失败`)}finally{k.value=!1}}let I=Ee(),{pause:L,resume:R}=Te(()=>void N(!0),3e4,{immediate:!1});return w(I,e=>e===`visible`?(R(),void N(!0)):L()),w(S,()=>void N()),d(async()=>{await N(),R()}),(i,o)=>(p(),c(`div`,rt,[r(we,{heading:`md`,title:s.staff?`工单处理`:`问题反馈`,subtitle:s.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`},{"title-append":C(()=>[_.value?(p(),l(n(Ie),{key:0,value:_.value,type:`warning`},null,8,[`value`])):t(``,!0)]),actions:C(()=>[r(n(le),{value:S.value,"onUpdate:value":o[0]||=e=>S.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),s.staff?t(``,!0):(p(),l(n(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:o[1]||=e=>O.value=!0},{icon:C(()=>[r(n(ge),{size:15})]),default:C(()=>[o[9]||=b(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),e(`div`,it,[e(`div`,at,[v.value&&!h.value.length?(p(),c(`div`,ot,[(p(),c(a,null,y(4,e=>r(n(pe),{key:e,height:`58px`,sharp:!1})),64))])):h.value.length?(p(),l(G,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:C(()=>[(p(!0),c(a,null,y(h.value,r=>(p(),c(`li`,{key:r.id},[e(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:x({borderColor:`var(--border)`,backgroundColor:E.value===r.id?`var(--muted)`:`transparent`}),"aria-current":E.value===r.id?`true`:void 0,onClick:e=>P(r)},[e(`div`,lt,[e(`span`,ut,g(r.subject),1),r.unread?(p(),l(n(Ie),{key:0,value:r.unread,type:`warning`},null,8,[`value`])):(p(),c(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:x({color:r.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},g(n(xe)[r.status]),5))]),e(`p`,dt,g(r.last_body),1),e(`p`,ft,[b(` #`+g(r.id)+` `,1),s.staff&&r.owner_nickname?(p(),c(a,{key:0},[b(` · `+g(r.owner_nickname),1)],64)):t(``,!0),b(` · `+g(n(Se)(r.update_time))+` · `+g(r.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(p(),c(`div`,st,[r(Ce,{code:`00 / NO TICKET`,title:s.staff?`无工单`:`还没有工单`,hint:s.staff?`学生提交后会自动出现在这里`:`有打印相关的问题，点右上角新建`},{icon:C(()=>[r(n(me),{size:28})]),_:1},8,[`title`,`hint`])]))]),e(`div`,pt,[M.value?(p(),l(nt,{key:M.value.id,"ticket-id":M.value.id,staff:s.staff,"current-user-id":s.currentUserId,onChanged:o[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(p(),c(`div`,mt,[r(Ce,{code:`00 / NO TICKET`,title:`从左侧选一个工单查看详情`,hint:`窄屏会以抽屉形式打开`},{icon:C(()=>[r(n(Ve),{size:28})]),_:1})]))])]),r(n(de),{show:D.value,"onUpdate:show":o[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:C(()=>[r(n(fe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:C(()=>[e(`div`,ht,[M.value?(p(),l(nt,{key:M.value.id,"ticket-id":M.value.id,staff:s.staff,"current-user-id":s.currentUserId,onChanged:o[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):t(``,!0)])]),_:1})]),_:1},8,[`show`]),r(n(ve),{show:O.value,"onUpdate:show":o[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:C(()=>[e(`div`,gt,[r(n(V),{quaternary:``,onClick:o[7]||=e=>O.value=!1},{default:C(()=>[...o[10]||=[b(`取消`,-1)]]),_:1}),r(n(V),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:F},{default:C(()=>[...o[11]||=[b(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:C(()=>[r(n(X),{label:`标题`,"show-feedback":!1},{default:C(()=>[r(n(Y),{value:A.subject,"onUpdate:value":o[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),r(n(X),{label:`详细描述`,"show-feedback":!1},{default:C(()=>[r(n(Y),{value:A.body,"onUpdate:value":o[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清订单号、遇到的问题、期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};