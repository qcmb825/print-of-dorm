import{Bt as e,C as t,Ct as n,D as r,E as i,Et as a,Ht as o,K as s,M as c,N as l,T as u,V as d,Vt as f,W as p,Y as m,Z as h,at as g,ct as _,et as v,f as y,gt as b,j as x,ot as S,p as C,v as w,vt as T,w as E}from"./endpoints-DwTyeYJL.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as ee,k as B,n as V,nn as H,nt as U,o as W,on as te,rn as G,s as ne,sn as re,st as K,t as q,u as J,ut as ie,v as ae,x as oe}from"./createLucideIcon-PTKXBJl9.js";import{t as Y}from"./Input-5b3xtR6k.js";import{a as se}from"./Scrollbar-DaH6bqAU.js";import{o as ce,t as le}from"./Select-CeWSMgnH.js";import{r as ue}from"./cssr-IcCwIwdJ.js";import{t as de}from"./FormItem-DINcczKs.js";import{n as fe,t as pe}from"./DrawerContent-DuJTPC6v.js";import{t as me}from"./Skeleton-CjHil_b5.js";import{t as he}from"./inbox-Cqut5auQ.js";import{t as ge}from"./lock-BDRtzQs2.js";import{t as _e}from"./plus-OM9F9-l6.js";import{t as ve}from"./send-BHZsqTbl.js";import{C as ye,S as be,U as X,v as xe}from"./index-CnuM2Ps_.js";import{c as Se,y as Ce}from"./format-Ctvw4JoF.js";import{t as we}from"./EmptyState-x11jBGQH.js";import{t as Te}from"./PageHeader-BP6eG0Dp.js";import{r as Ee,t as De}from"./dist-peGjikc5.js";var Oe=l({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let i=T(null),a=T(e.value),o=T(e.value),s=T(`up`),c=T(!1),l=t(()=>c.value?`${e.clsPrefix}-base-slot-machine-current-number--${s.value}-scroll`:null),u=t(()=>c.value?`${e.clsPrefix}-base-slot-machine-old-number--${s.value}-scroll`:null);g(n(e,`value`),(e,t)=>{a.value=t,o.value=e,d(f)});function f(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?p(`up`):n>t&&p(`down`))}function p(e){s.value=e,c.value=!1,d(()=>{i.value?.offsetWidth,c.value=!0})}return()=>{let{clsPrefix:t}=e;return m(),r(`span`,{ref:i,class:z(`${t}-base-slot-machine-number`)},[a.value===null?K(()=>null):(m(),r(`span`,{key:0,class:z([`${t}-base-slot-machine-old-number ${t}-base-slot-machine-old-number--top`,u.value])},[K(()=>a.value)],2)),E(`span`,{class:z([`${t}-base-slot-machine-current-number`,l.value])},[E(`span`,{ref:`numberWrapper`,class:z([`${t}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${t}-base-slot-machine-current-number__inner--not-number`])},[K(()=>o.value)],2)],2),a.value===null?K(()=>null):(m(),r(`span`,{key:2,class:z([`${t}-base-slot-machine-old-number ${t}-base-slot-machine-old-number--bottom`,u.value])},[K(()=>a.value)],2))],2)}}}),{cubicBezierEaseOut:Z}=ie;function ke({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Z},
 max-width ${e} ${Z},
 transform ${e} ${Z}
 `}),O(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Z},
 max-width ${e} ${Z},
 transform ${e} ${Z}
 `}),O(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),O(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),O(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),O(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Ae=O([O(`@keyframes n-base-slot-machine-fade-up-in`,`
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
 `,[ke({duration:`.2s`}),ne({duration:`.2s`,delay:`0s`}),A(`base-slot-machine-old-number`,`
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
 `)])])])])]),je=l({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){F(`-base-slot-machine`,Ae,n(e,`clsPrefix`));let i=T(),a=T(),o=t(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return g(n(e,`value`),(e,t)=>{typeof e==`string`?(a.value=void 0,i.value=void 0):typeof t==`string`?(a.value=e,i.value=void 0):(a.value=e,i.value=t)}),()=>{let{value:t,clsPrefix:n}=e;return typeof t==`number`?(m(),r(`span`,{key:1,class:z(`${n}-base-slot-machine`)},[c(G,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>o.value.map((e,t)=>(m(),u(Oe,{clsPrefix:n,key:o.value.length-t-1,oldOriginalNumber:i.value,newOriginalNumber:a.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),c(R,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<t?(m(),u(Oe,{key:2,clsPrefix:n,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(m(),r(`span`,{key:3,class:z(`${n}-base-slot-machine`)},[K(()=>t)],2))}}});function Me(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Ne={name:`Badge`,common:ee,self:Me},Pe=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[j(`as-is`,[A(`badge-sup`,{position:`static`,transform:`translateX(0)`},[X({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),j(`dot`,[A(`badge-sup`,`
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
 `,[X({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),A(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),O(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Fe=[`title`],Ie={...B.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Le=l({name:`Badge`,props:Ie,setup(e,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:a}=L(e),o=B(`Badge`,`-badge`,Pe,Ne,e,r),c=T(!1),l=()=>{c.value=!0},u=()=>{c.value=!1},d=t(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!P(n.value)));s(()=>{d.value&&(c.value=!0)});let f=ae(`Badge`,a,r),p=t(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,t)]:a,fontFamily:s,fontSize:c}}=o.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),m=i?D(`badge`,t(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=N(r)),t}),p,e):void 0,h=t(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:r,appeared:c,showBadge:d,handleAfterEnter:l,handleAfterLeave:u,cssVars:i?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:i}=this;t?.();let a=i.default?.();return m(),r(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!a}]),style:f(this.cssVars)},[K(()=>a),(m(),u(H,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(m(),r(`sup`,{key:1,class:z(`${e}-badge-sup`),title:ce(this.value),style:f(this.offsetStyle)},[K(()=>oe(i.value,()=>[this.dot?null:(m(),u(je,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(m(),u(W,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):K(()=>null)],14,Fe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Re=O([O(`@keyframes spin-rotate`,`
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
 `)])]),ze={small:20,medium:18,large:16},Be={...B.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Ve=l({name:`Spin`,props:Be,slots:Object,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=L(e),i=B(`Spin`,`-spin`,Re,xe,e,n),a=t(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{opacitySpinning:a,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?U(t):r[M(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=r?D(`spin`,t(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),a,e):void 0,s=ue(e,[`spinning`,`show`]),c=T(!1);return S(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{c.value=!0},r),t(()=>{clearTimeout(n)});return}}c.value=s.value}),{mergedClsPrefix:n,active:c,mergedStrokeWidth:t(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return ze[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,i=e.icon&&this.rotate,a=(n||e.description)&&(m(),r(`div`,{class:z(`${t}-spin-description`)},[K(()=>n||e.description?.())],2)),o=e.icon?(m(),r(`div`,{key:1,class:z([`${t}-spin-body`,this.themeClass])},[E(`div`,{class:z([`${t}-spin`,i&&`${t}-spin--rotate`]),style:f(e.default?``:this.cssVars)},[K(()=>e.icon())],6),K(()=>a)],2)):(m(),r(`div`,{key:2,class:z([`${t}-spin-body`,this.themeClass])},[(m(),u(J,{clsPrefix:t,style:f(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),K(()=>a)],2));return this.onRender?.(),e.default?(m(),r(`div`,{key:3,class:z([`${t}-spin-container`,this.themeClass]),style:f(this.cssVars)},[E(`div`,{class:z([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:f(this.contentStyle)},[K(()=>e.default?.())],6),c(H,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),He=q({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ue=q({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),We={class:`flex h-full flex-col`},Ge={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ke={class:`min-w-0`},qe={class:`truncate font-heading text-base font-bold`},Je={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ye={class:`max-w-[86%]`},Xe={class:`font-semibold`},Ze={class:`tnum`},Qe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},$e={class:`mt-2 flex items-center justify-between gap-3`},et={class:`tnum text-2xs text-ink-3`},Q=3e3,$=8e3,tt=15e3,nt=l({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(n,{emit:l}){let b=n,S=l,D=be(),O=T(null),k=T(!1),A=T(``),j=T(!1),M=T(null),N=T(0),P=T($),F=t(()=>O.value?.messages??[]),I=t(()=>O.value?.ticket??null),L=t(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await d();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function ee(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function B(){k.value=!0;try{O.value=await y.detail(b.ticketId),N.value=O.value.last_id??0,S(`changed`)}catch(e){D.error(e instanceof C?e.message:`加载工单失败`)}finally{k.value=!1}}let H=!1;async function U(){if(!H&&O.value){H=!0;try{let e=await y.messagesSince(b.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();O.value.messages.push(...n),P.value=Q,e&&!A.value.trim()&&await z(!0),S(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,S(`changed`))}catch{P.value=tt}finally{H=!1}}}async function W(){let e=A.value.trim();if(e){j.value=!0;try{await y.reply(b.ticketId,e),A.value=``,await B(),await z(!0),P.value=Q}catch(e){D.error(e instanceof C?e.message:`发送失败`)}finally{j.value=!1}}}async function ne(){try{await y.setStatus(b.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重新打开`:`工单已关闭`),await B()}catch(e){D.error(e instanceof C?e.message:`操作失败`)}}let K=De(),{pause:q,resume:J}=Ee(()=>void U(),P,{immediate:!1});return g(K,e=>{e===`visible`?(U(),J()):q()}),s(async()=>{await B(),J(),await z(!1)}),g(()=>b.ticketId,async()=>{N.value=0,P.value=$,await B(),await z(!1),J()}),p(q),(t,s)=>(m(),r(`div`,We,[E(`header`,Ge,[E(`div`,Ke,[E(`h3`,qe,o(I.value?.subject??`读取中`),1),E(`p`,Je,[x(` #`+o(n.ticketId)+` `,1),n.staff&&I.value?(m(),r(w,{key:0},[x(` · 提交人 `+o(I.value.owner_nickname),1)],64)):i(``,!0),I.value?(m(),r(w,{key:1},[x(` · `+o(a(Se)[I.value.status]),1)],64)):i(``,!0)])]),I.value?(m(),u(a(V),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:ne},{icon:_(()=>[(m(),u(v(L.value?a(Ue):a(ge)),{size:14}))]),default:_(()=>[x(` `+o(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):i(``,!0)]),E(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[c(a(Ve),{show:k.value&&!F.value.length},{default:_(()=>[c(G,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:_(()=>[(m(!0),r(w,null,h(F.value,t=>(m(),r(`li`,{key:t.id,class:e([`flex`,t.sender_id===n.currentUserId?`justify-end`:`justify-start`])},[E(`div`,Ye,[E(`div`,{class:e([`mb-1 flex items-center gap-2 text-xs text-ink-3`,t.sender_id===n.currentUserId?`justify-end`:``])},[E(`span`,Xe,o(t.sender_nickname??`（已注销）`),1),E(`span`,Ze,o(t.create_time?.slice(5,16)??``),1)],2),E(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:f(t.sender_id===n.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},o(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),E(`footer`,Qe,[c(a(Y),{value:A.value,"onUpdate:value":s[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:te(re(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),E(`div`,$e,[E(`span`,et,o(A.value.length)+` / 1000`,1),c(a(V),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:W},{icon:_(()=>[c(a(ve),{size:14})]),default:_(()=>[s[1]||=x(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-sm font-semibold`},dt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=l({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let n=be(),l=T([]),d=T(0),p=T(!0),v=T(`all`),S=T(null),D=T(!1),O=T(!1),k=T(!1),A=b({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=t(()=>l.value.find(e=>e.id===S.value)??null);async function N(e=!1){e||(p.value=!0);try{let e=await y.list(v.value===`all`?void 0:v.value);l.value=e.tickets,d.value=e.unread_total,S.value&&!l.value.some(e=>e.id===S.value)&&(S.value=null)}catch(t){e||n.error(t instanceof C?t.message:`加载工单失败`)}finally{p.value=!1}}function P(e){S.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function F(){if(!A.subject.trim()||!A.body.trim()){n.warning(`标题和描述都要填`);return}k.value=!0;try{let e=await y.create(A.subject.trim(),A.body.trim());n.success(`工单已提交 · 等待回复`),O.value=!1,A.subject=``,A.body=``,await N(),S.value=e.id}catch(e){n.error(e instanceof C?e.message:`提交失败`)}finally{k.value=!1}}let I=De(),{pause:L,resume:R}=Ee(()=>void N(!0),3e4,{immediate:!1});return g(I,e=>e===`visible`?(R(),void N(!0)):L()),g(v,()=>void N()),s(async()=>{await N(),R()}),(t,n)=>(m(),r(`div`,rt,[c(Te,{heading:`md`,title:e.staff?`工单处理`:`问题反馈`,subtitle:e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`},{"title-append":_(()=>[d.value?(m(),u(a(Le),{key:0,value:d.value,type:`warning`},null,8,[`value`])):i(``,!0)]),actions:_(()=>[c(a(le),{value:v.value,"onUpdate:value":n[0]||=e=>v.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?i(``,!0):(m(),u(a(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:n[1]||=e=>O.value=!0},{icon:_(()=>[c(a(_e),{size:15})]),default:_(()=>[n[9]||=x(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),E(`div`,it,[E(`div`,at,[p.value&&!l.value.length?(m(),r(`div`,ot,[(m(),r(w,null,h(4,e=>c(a(me),{key:e,height:`58px`,sharp:!1})),64))])):l.value.length?(m(),u(G,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:_(()=>[(m(!0),r(w,null,h(l.value,t=>(m(),r(`li`,{key:t.id},[E(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:f({borderColor:`var(--border)`,backgroundColor:S.value===t.id?`var(--muted)`:`transparent`}),"aria-current":S.value===t.id?`true`:void 0,onClick:e=>P(t)},[E(`div`,lt,[E(`span`,ut,o(t.subject),1),t.unread?(m(),u(a(Le),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(m(),r(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:f({color:t.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},o(a(Se)[t.status]),5))]),E(`p`,dt,o(t.last_body),1),E(`p`,ft,[x(` #`+o(t.id)+` `,1),e.staff&&t.owner_nickname?(m(),r(w,{key:0},[x(` · `+o(t.owner_nickname),1)],64)):i(``,!0),x(` · `+o(a(Ce)(t.update_time))+` · `+o(t.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(m(),r(`div`,st,[c(we,{code:`00 / NO TICKET`,title:e.staff?`无工单`:`还没有工单`,hint:e.staff?`学生提交后会自动出现在这里`:`有打印相关的问题，点右上角新建`},{icon:_(()=>[c(a(he),{size:28})]),_:1},8,[`title`,`hint`])]))]),E(`div`,pt,[M.value?(m(),u(nt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:n[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(m(),r(`div`,mt,[c(we,{code:`00 / NO TICKET`,title:`从左侧选一个工单查看详情`,hint:`窄屏会以抽屉形式打开`},{icon:_(()=>[c(a(He),{size:28})]),_:1})]))])]),c(a(fe),{show:D.value,"onUpdate:show":n[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:_(()=>[c(a(pe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:_(()=>[E(`div`,ht,[M.value?(m(),u(nt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:n[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):i(``,!0)])]),_:1})]),_:1},8,[`show`]),c(a(ye),{show:O.value,"onUpdate:show":n[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:_(()=>[E(`div`,gt,[c(a(V),{quaternary:``,onClick:n[7]||=e=>O.value=!1},{default:_(()=>[...n[10]||=[x(`取消`,-1)]]),_:1}),c(a(V),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:F},{default:_(()=>[...n[11]||=[x(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:_(()=>[c(a(de),{label:`标题`,"show-feedback":!1},{default:_(()=>[c(a(Y),{value:A.subject,"onUpdate:value":n[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),c(a(de),{label:`详细描述`,"show-feedback":!1},{default:_(()=>[c(a(Y),{value:A.body,"onUpdate:value":n[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清订单号、遇到的问题、期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};