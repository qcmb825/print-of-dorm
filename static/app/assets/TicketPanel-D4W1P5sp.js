import{$ as e,Dt as t,Et as n,G as r,J as i,K as a,Lt as o,Q as s,W as c,Wt as l,cn as u,ct as d,dt as f,et as p,g as m,gt as h,h as g,kt as _,ln as v,pt as y,q as b,qt as x,sn as S,vt as C,xt as w,z as T,zt as E}from"./endpoints-DvBasrsZ.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as ee,k as B,n as V,nn as H,nt as U,o as W,on as te,rn as G,s as ne,sn as re,st as K,t as q,u as J,ut as ie,v as ae,x as oe}from"./createLucideIcon-Db26embL.js";import{t as Y}from"./Input-BbMbS4NS.js";import{a as se}from"./Scrollbar-CSGBNui4.js";import{o as ce,t as le}from"./Select-C20XV6Q5.js";import{r as ue}from"./cssr-BYP5YhWg.js";import{t as de}from"./FormItem-BhPdBFVZ.js";import{n as fe,t as pe}from"./DrawerContent-r9aN4zOH.js";import{t as me}from"./Skeleton-DBvRgrwr.js";import{t as he}from"./inbox-zzsLKn9U.js";import{t as ge}from"./lock-CgdgQeIa.js";import{t as _e}from"./plus-CMzrFqK9.js";import{t as ve}from"./send-B2kqRg4l.js";import{C as ye,S as be,U as X,v as xe}from"./index-8c74NJ4T.js";import{c as Se,y as Ce}from"./format-1rjnJmsR.js";import{t as we}from"./EmptyState-BecLvEfC.js";import{t as Te}from"./PageHeader-3QUr1BAY.js";import{r as Ee,t as De}from"./dist-CCOFODI8.js";var Oe=p({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=E(null),a=E(e.value),o=E(e.value),s=E(`up`),u=E(!1),f=c(()=>u.value?`${e.clsPrefix}-base-slot-machine-current-number--${s.value}-scroll`:null),p=c(()=>u.value?`${e.clsPrefix}-base-slot-machine-old-number--${s.value}-scroll`:null);n(l(e,`value`),(e,t)=>{a.value=t,o.value=e,d(m)});function m(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?g(`up`):n>t&&g(`down`))}function g(e){s.value=e,u.value=!1,d(()=>{t.value?.offsetWidth,u.value=!0})}return()=>{let{clsPrefix:n}=e;return h(),i(`span`,{ref:t,class:z(`${n}-base-slot-machine-number`)},[a.value===null?K(()=>null):(h(),i(`span`,{key:0,class:z([`${n}-base-slot-machine-old-number ${n}-base-slot-machine-old-number--top`,p.value])},[K(()=>a.value)],2)),r(`span`,{class:z([`${n}-base-slot-machine-current-number`,f.value])},[r(`span`,{ref:`numberWrapper`,class:z([`${n}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${n}-base-slot-machine-current-number__inner--not-number`])},[K(()=>o.value)],2)],2),a.value===null?K(()=>null):(h(),i(`span`,{key:2,class:z([`${n}-base-slot-machine-old-number ${n}-base-slot-machine-old-number--bottom`,p.value])},[K(()=>a.value)],2))],2)}}}),{cubicBezierEaseOut:Z}=ie;function ke({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
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
 `)])])])])]),je=p({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(t){F(`-base-slot-machine`,Ae,l(t,`clsPrefix`));let r=E(),o=E(),s=c(()=>{if(typeof t.value==`string`)return[];if(t.value<1)return[0];let e=[],n=t.value;for(t.max!==void 0&&(n=Math.min(t.max,n));n>=1;)e.push(n%10),n/=10,n=Math.floor(n);return e.reverse(),e});return n(l(t,`value`),(e,t)=>{typeof e==`string`?(o.value=void 0,r.value=void 0):typeof t==`string`?(o.value=e,r.value=void 0):(o.value=e,r.value=t)}),()=>{let{value:n,clsPrefix:c}=t;return typeof n==`number`?(h(),i(`span`,{key:1,class:z(`${c}-base-slot-machine`)},[e(G,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>s.value.map((e,t)=>(h(),a(Oe,{clsPrefix:c,key:s.value.length-t-1,oldOriginalNumber:r.value,newOriginalNumber:o.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),e(R,{key:`+`,width:!0},{default:()=>t.max!==void 0&&t.max<n?(h(),a(Oe,{key:2,clsPrefix:c,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(h(),i(`span`,{key:3,class:z(`${c}-base-slot-machine`)},[K(()=>n)],2))}}});function Me(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Ne={name:`Badge`,common:ee,self:Me},Pe=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
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
 `)])])]),Fe=[`title`],Ie={...B.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Le=p({name:`Badge`,props:Ie,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=L(e),a=B(`Badge`,`-badge`,Pe,Ne,e,n),o=E(!1),s=()=>{o.value=!0},l=()=>{o.value=!1},u=c(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!P(t.value)));y(()=>{u.value&&(o.value=!0)});let d=ae(`Badge`,i,n),f=c(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,t)]:o,fontFamily:s,fontSize:c}}=a.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||o,"--n-ripple-color":n||o,"--n-bezier":r,"--n-ripple-bezier":i}}),p=r?D(`badge`,c(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=N(r)),t}),f,e):void 0,m=c(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${d?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:d,mergedClsPrefix:n,appeared:o,showBadge:u,handleAfterEnter:s,handleAfterLeave:l,cssVars:r?void 0:f,themeClass:p?.themeClass,onRender:p?.onRender,offsetStyle:m}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let o=r.default?.();return h(),i(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!o}]),style:u(this.cssVars)},[K(()=>o),(h(),a(H,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(h(),i(`sup`,{key:1,class:z(`${e}-badge-sup`),title:ce(this.value),style:u(this.offsetStyle)},[K(()=>oe(r.value,()=>[this.dot?null:(h(),a(je,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(h(),a(W,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):K(()=>null)],14,Fe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Re=O([O(`@keyframes spin-rotate`,`
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
 `)])]),ze={small:20,medium:18,large:16},Be={...B.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Ve=p({name:`Spin`,props:Be,slots:Object,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=L(e),i=B(`Spin`,`-spin`,Re,xe,e,n),a=c(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{opacitySpinning:a,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?U(t):r[M(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=r?D(`spin`,c(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),a,e):void 0,s=ue(e,[`spinning`,`show`]),l=E(!1);return t(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=s.value}),{mergedClsPrefix:n,active:l,mergedStrokeWidth:c(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return ze[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:t,mergedClsPrefix:n,description:o}=this,s=t.icon&&this.rotate,c=(o||t.description)&&(h(),i(`div`,{class:z(`${n}-spin-description`)},[K(()=>o||t.description?.())],2)),l=t.icon?(h(),i(`div`,{key:1,class:z([`${n}-spin-body`,this.themeClass])},[r(`div`,{class:z([`${n}-spin`,s&&`${n}-spin--rotate`]),style:u(t.default?``:this.cssVars)},[K(()=>t.icon())],6),K(()=>c)],2)):(h(),i(`div`,{key:2,class:z([`${n}-spin-body`,this.themeClass])},[(h(),a(J,{clsPrefix:n,style:u(t.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${n}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),K(()=>c)],2));return this.onRender?.(),t.default?(h(),i(`div`,{key:3,class:z([`${n}-spin-container`,this.themeClass]),style:u(this.cssVars)},[r(`div`,{class:z([`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass]),style:u(this.contentStyle)},[K(()=>t.default?.())],6),e(H,{name:`fade-in-transition`},{default:()=>this.active?l:null},1024)],6)):l}}),He=q({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ue=q({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),We={class:`flex h-full flex-col`},Ge={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ke={class:`min-w-0`},qe={class:`truncate font-heading text-base font-bold`},Je={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ye={class:`max-w-[86%]`},Xe={class:`font-semibold`},Ze={class:`tnum`},Qe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},$e={class:`mt-2 flex items-center justify-between gap-3`},et={class:`tnum text-2xs text-ink-3`},Q=3e3,$=8e3,tt=15e3,nt=p({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(t,{emit:o}){let l=t,p=o,D=be(),O=E(null),k=E(!1),A=E(``),j=E(!1),M=E(null),N=E(0),P=E($),F=c(()=>O.value?.messages??[]),I=c(()=>O.value?.ticket??null),L=c(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await d();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function ee(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function B(){k.value=!0;try{O.value=await g.detail(l.ticketId),N.value=O.value.last_id??0,p(`changed`)}catch(e){D.error(e instanceof m?e.message:`工单读取失败`)}finally{k.value=!1}}let H=!1;async function U(){if(!H&&O.value){H=!0;try{let e=await g.messagesSince(l.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();O.value.messages.push(...n),P.value=Q,e&&!A.value.trim()&&await z(!0),p(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,p(`changed`))}catch{P.value=tt}finally{H=!1}}}async function W(){let e=A.value.trim();if(e){j.value=!0;try{await g.reply(l.ticketId,e),A.value=``,await B(),await z(!0),P.value=Q}catch(e){D.error(e instanceof m?e.message:`发送未完成 · 稍后重试`)}finally{j.value=!1}}}async function ne(){try{await g.setStatus(l.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重开`:`工单已关闭`),await B()}catch(e){D.error(e instanceof m?e.message:`工单状态未变更 · 稍后重试`)}}let K=De(),{pause:q,resume:J}=Ee(()=>void U(),P,{immediate:!1});return n(K,e=>{e===`visible`?(U(),J()):q()}),y(async()=>{await B(),J(),await z(!1)}),n(()=>l.ticketId,async()=>{N.value=0,P.value=$,await B(),await z(!1),J()}),f(q),(n,o)=>(h(),i(`div`,We,[r(`header`,Ge,[r(`div`,Ke,[r(`h3`,qe,v(I.value?.subject??`读取中`),1),r(`p`,Je,[s(` 工单 `+v(t.ticketId)+` `,1),t.staff&&I.value?(h(),i(T,{key:0},[s(` · 提交人 `+v(I.value.owner_nickname),1)],64)):b(``,!0),I.value?(h(),i(T,{key:1},[s(` · `+v(x(Se)[I.value.status]),1)],64)):b(``,!0)])]),I.value?(h(),a(x(V),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:ne},{icon:_(()=>[(h(),a(w(L.value?x(Ue):x(ge)),{size:14}))]),default:_(()=>[s(` `+v(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):b(``,!0)]),r(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[e(x(Ve),{show:k.value&&!F.value.length},{default:_(()=>[e(G,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:_(()=>[(h(!0),i(T,null,C(F.value,e=>(h(),i(`li`,{key:e.id,class:S([`flex`,e.sender_id===t.currentUserId?`justify-end`:`justify-start`])},[r(`div`,Ye,[r(`div`,{class:S([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===t.currentUserId?`justify-end`:``])},[r(`span`,Xe,v(e.sender_nickname??`（已注销）`),1),r(`span`,Ze,v(e.create_time?.slice(5,16)??``),1)],2),r(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:u(e.sender_id===t.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},v(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),r(`footer`,Qe,[e(x(Y),{value:A.value,"onUpdate:value":o[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:te(re(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),r(`div`,$e,[r(`span`,et,v(A.value.length)+` / 1000`,1),e(x(V),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:W},{icon:_(()=>[e(x(ve),{size:14})]),default:_(()=>[o[1]||=s(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-sm font-semibold`},dt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=p({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(t){let l=be(),d=E([]),f=E(0),p=E(!0),S=E(`all`),w=E(null),D=E(!1),O=E(!1),k=E(!1),A=o({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=c(()=>d.value.find(e=>e.id===w.value)??null);async function N(e=!1){e||(p.value=!0);try{let e=await g.list(S.value===`all`?void 0:S.value);d.value=e.tickets,f.value=e.unread_total,w.value&&!d.value.some(e=>e.id===w.value)&&(w.value=null)}catch(t){e||l.error(t instanceof m?t.message:`工单读取失败`)}finally{p.value=!1}}function P(e){w.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function F(){if(!A.subject.trim()||!A.body.trim()){l.warning(`标题与描述为必填`);return}k.value=!0;try{let e=await g.create(A.subject.trim(),A.body.trim());l.success(`工单已提交 · 待回复`),O.value=!1,A.subject=``,A.body=``,await N(),w.value=e.id}catch(e){l.error(e instanceof m?e.message:`提交未完成 · 稍后重试`)}finally{k.value=!1}}let I=De(),{pause:L,resume:R}=Ee(()=>void N(!0),3e4,{immediate:!1});return n(I,e=>e===`visible`?(R(),void N(!0)):L()),n(S,()=>void N()),y(async()=>{await N(),R()}),(n,o)=>(h(),i(`div`,rt,[e(Te,{heading:`md`,title:t.staff?`工单处理`:`问题反馈`,subtitle:t.staff?`学生提交的问题与需求 · 回复后对方收到未读提示`:`打印相关问题 · 在此留言给管理员`},{"title-append":_(()=>[f.value?(h(),a(x(Le),{key:0,value:f.value,type:`warning`},null,8,[`value`])):b(``,!0)]),actions:_(()=>[e(x(le),{value:S.value,"onUpdate:value":o[0]||=e=>S.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),t.staff?b(``,!0):(h(),a(x(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:o[1]||=e=>O.value=!0},{icon:_(()=>[e(x(_e),{size:15})]),default:_(()=>[o[9]||=s(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),r(`div`,it,[r(`div`,at,[p.value&&!d.value.length?(h(),i(`div`,ot,[(h(),i(T,null,C(4,t=>e(x(me),{key:t,height:`58px`,sharp:!1})),64))])):d.value.length?(h(),a(G,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:_(()=>[(h(!0),i(T,null,C(d.value,e=>(h(),i(`li`,{key:e.id},[r(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:u({borderColor:`var(--border)`,backgroundColor:w.value===e.id?`var(--muted)`:`transparent`}),"aria-current":w.value===e.id?`true`:void 0,onClick:t=>P(e)},[r(`div`,lt,[r(`span`,ut,v(e.subject),1),e.unread?(h(),a(x(Le),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(h(),i(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:u({color:e.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},v(x(Se)[e.status]),5))]),r(`p`,dt,v(e.last_body),1),r(`p`,ft,[s(` 工单 `+v(e.id)+` `,1),t.staff&&e.owner_nickname?(h(),i(T,{key:0},[s(` · `+v(e.owner_nickname),1)],64)):b(``,!0),s(` · `+v(x(Ce)(e.update_time))+` · `+v(e.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(h(),i(`div`,st,[e(we,{code:`00 / NO TICKET`,title:t.staff?`无工单`:`尚未提交工单`,hint:t.staff?`学生提交后在此列示`:`打印相关问题 · 新建工单提交`},{icon:_(()=>[e(x(he),{size:28})]),_:1},8,[`title`,`hint`])]))]),r(`div`,pt,[M.value?(h(),a(nt,{key:M.value.id,"ticket-id":M.value.id,staff:t.staff,"current-user-id":t.currentUserId,onChanged:o[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(h(),i(`div`,mt,[e(we,{code:`00 / NO TICKET`,title:`从左侧选择工单`,hint:`窄屏以抽屉打开`},{icon:_(()=>[e(x(He),{size:28})]),_:1})]))])]),e(x(fe),{show:D.value,"onUpdate:show":o[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:_(()=>[e(x(pe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:_(()=>[r(`div`,ht,[M.value?(h(),a(nt,{key:M.value.id,"ticket-id":M.value.id,staff:t.staff,"current-user-id":t.currentUserId,onChanged:o[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):b(``,!0)])]),_:1})]),_:1},8,[`show`]),e(x(ye),{show:O.value,"onUpdate:show":o[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:_(()=>[r(`div`,gt,[e(x(V),{quaternary:``,onClick:o[7]||=e=>O.value=!1},{default:_(()=>[...o[10]||=[s(`取消`,-1)]]),_:1}),e(x(V),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:F},{default:_(()=>[...o[11]||=[s(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:_(()=>[e(x(de),{label:`标题`,"show-feedback":!1},{default:_(()=>[e(x(Y),{value:A.subject,"onUpdate:value":o[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),e(x(de),{label:`详细描述`,"show-feedback":!1},{default:_(()=>[e(x(Y),{value:A.body,"onUpdate:value":o[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清单号、遇到的问题与期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};