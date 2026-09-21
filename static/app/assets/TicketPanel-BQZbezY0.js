import{B as e,Bt as t,Ct as n,F as r,Ft as i,H as a,J as o,Nt as s,St as c,Tt as l,U as u,Ut as d,V as f,W as p,X as m,Y as h,_t as g,an as _,f as v,ft as y,in as b,it as x,lt as S,mt as C,p as w,rn as T,st as E}from"./endpoints-BxtGT1Ar.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as ee,k as B,n as V,nn as H,nt as U,o as W,on as te,rn as G,s as ne,sn as re,st as K,t as q,u as J,ut as ie,v as ae,x as oe}from"./createLucideIcon-Cwmwwrzy.js";import{t as Y}from"./Input-Djr8bqhS.js";import{a as se}from"./Scrollbar-BETGIYVH.js";import{o as ce,t as le}from"./Select-CHiBhK_A.js";import{r as ue}from"./cssr-80F65WOY.js";import{t as de}from"./FormItem-BjbMLups.js";import{n as fe,t as pe}from"./DrawerContent-BJjerlth.js";import{t as me}from"./Skeleton-DZ7LHirW.js";import{t as he}from"./inbox-C9GjWRLU.js";import{t as ge}from"./lock-CN9S1kBu.js";import{t as _e}from"./plus-CjK17f9h.js";import{t as ve}from"./send-C5kI4TEL.js";import{C as ye,S as be,U as X,v as xe}from"./index-BjXg75vq.js";import{c as Se,y as Ce}from"./format-BepUAO79.js";import{t as we}from"./EmptyState-WVSzesl1.js";import{t as Te}from"./PageHeader-bFTXjm6b.js";import{r as Ee,t as De}from"./dist-BKERdHxs.js";var Oe=m({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(n){let r=i(null),a=i(n.value),o=i(n.value),s=i(`up`),l=i(!1),u=e(()=>l.value?`${n.clsPrefix}-base-slot-machine-current-number--${s.value}-scroll`:null),d=e(()=>l.value?`${n.clsPrefix}-base-slot-machine-old-number--${s.value}-scroll`:null);c(t(n,`value`),(e,t)=>{a.value=t,o.value=e,x(m)});function m(){let e=n.newOriginalNumber,t=n.oldOriginalNumber;t!==void 0&&e!==void 0&&(e>t?h(`up`):t>e&&h(`down`))}function h(e){s.value=e,l.value=!1,x(()=>{r.value?.offsetWidth,l.value=!0})}return()=>{let{clsPrefix:e}=n;return y(),p(`span`,{ref:r,class:z(`${e}-base-slot-machine-number`)},[a.value===null?K(()=>null):(y(),p(`span`,{key:0,class:z([`${e}-base-slot-machine-old-number ${e}-base-slot-machine-old-number--top`,d.value])},[K(()=>a.value)],2)),f(`span`,{class:z([`${e}-base-slot-machine-current-number`,u.value])},[f(`span`,{ref:`numberWrapper`,class:z([`${e}-base-slot-machine-current-number__inner`,typeof n.value!=`number`&&`${e}-base-slot-machine-current-number__inner--not-number`])},[K(()=>o.value)],2)],2),a.value===null?K(()=>null):(y(),p(`span`,{key:2,class:z([`${e}-base-slot-machine-old-number ${e}-base-slot-machine-old-number--bottom`,d.value])},[K(()=>a.value)],2))],2)}}}),{cubicBezierEaseOut:Z}=ie;function ke({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
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
 `)])])])])]),je=m({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(n){F(`-base-slot-machine`,Ae,t(n,`clsPrefix`));let r=i(),o=i(),s=e(()=>{if(typeof n.value==`string`)return[];if(n.value<1)return[0];let e=[],t=n.value;for(n.max!==void 0&&(t=Math.min(n.max,t));t>=1;)e.push(t%10),t/=10,t=Math.floor(t);return e.reverse(),e});return c(t(n,`value`),(e,t)=>{typeof e==`string`?(o.value=void 0,r.value=void 0):typeof t==`string`?(o.value=e,r.value=void 0):(o.value=e,r.value=t)}),()=>{let{value:e,clsPrefix:t}=n;return typeof e==`number`?(y(),p(`span`,{key:1,class:z(`${t}-base-slot-machine`)},[h(G,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>s.value.map((e,n)=>(y(),a(Oe,{clsPrefix:t,key:s.value.length-n-1,oldOriginalNumber:r.value,newOriginalNumber:o.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),h(R,{key:`+`,width:!0},{default:()=>n.max!==void 0&&n.max<e?(y(),a(Oe,{key:2,clsPrefix:t,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(y(),p(`span`,{key:3,class:z(`${t}-base-slot-machine`)},[K(()=>e)],2))}}});function Me(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Ne={name:`Badge`,common:ee,self:Me},Pe=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
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
 `)])])]),Fe=[`title`],Ie={...B.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Le=m({name:`Badge`,props:Ie,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedRtlRef:o}=L(t),s=B(`Badge`,`-badge`,Pe,Ne,t,r),c=i(!1),l=()=>{c.value=!0},u=()=>{c.value=!1},d=e(()=>t.show&&(t.dot||t.value!==void 0&&!(!t.showZero&&Number(t.value)<=0)||!P(n.value)));S(()=>{d.value&&(c.value=!0)});let f=ae(`Badge`,o,r),p=e(()=>{let{type:e,color:n}=t,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,e)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),m=a?D(`badge`,e(()=>{let e=``,{type:n,color:r}=t;return n&&(e+=n[0]),r&&(e+=N(r)),e}),p,t):void 0,h=e(()=>{let{offset:e}=t;if(!e)return;let[n,r]=e,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:r,appeared:c,showBadge:d,handleAfterEnter:l,handleAfterLeave:u,cssVars:a?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return y(),p(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:b(this.cssVars)},[K(()=>i),(y(),a(H,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(y(),p(`sup`,{key:1,class:z(`${e}-badge-sup`),title:ce(this.value),style:b(this.offsetStyle)},[K(()=>oe(r.value,()=>[this.dot?null:(y(),a(je,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(y(),a(W,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):K(()=>null)],14,Fe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Re=O([O(`@keyframes spin-rotate`,`
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
 `)])]),ze={small:20,medium:18,large:16},Be={...B.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Ve=m({name:`Spin`,props:Be,slots:Object,setup(t){let{mergedClsPrefixRef:r,inlineThemeDisabled:a}=L(t),o=B(`Spin`,`-spin`,Re,xe,t,r),s=e(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=o.value,{opacitySpinning:i,color:a,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":i,"--n-size":typeof e==`number`?U(e):r[M(`size`,e)],"--n-color":a,"--n-text-color":s}}),c=a?D(`spin`,e(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),s,t):void 0,l=ue(t,[`spinning`,`show`]),u=i(!1);return n(e=>{let n;if(l.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{u.value=!0},r),e(()=>{clearTimeout(n)});return}}u.value=l.value}),{mergedClsPrefix:r,active:u,mergedStrokeWidth:e(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return ze[typeof n==`number`?`medium`:n]}),cssVars:a?void 0:s,themeClass:c?.themeClass,onRender:c?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,i=(n||e.description)&&(y(),p(`div`,{class:z(`${t}-spin-description`)},[K(()=>n||e.description?.())],2)),o=e.icon?(y(),p(`div`,{key:1,class:z([`${t}-spin-body`,this.themeClass])},[f(`div`,{class:z([`${t}-spin`,r&&`${t}-spin--rotate`]),style:b(e.default?``:this.cssVars)},[K(()=>e.icon())],6),K(()=>i)],2)):(y(),p(`div`,{key:2,class:z([`${t}-spin-body`,this.themeClass])},[(y(),a(J,{clsPrefix:t,style:b(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),K(()=>i)],2));return this.onRender?.(),e.default?(y(),p(`div`,{key:3,class:z([`${t}-spin-container`,this.themeClass]),style:b(this.cssVars)},[f(`div`,{class:z([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:b(this.contentStyle)},[K(()=>e.default?.())],6),h(H,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),He=q({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ue=q({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),We={class:`flex h-full flex-col`},Ge={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ke={class:`min-w-0`},qe={class:`truncate font-heading text-base font-bold`},Je={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ye={class:`max-w-[86%]`},Xe={class:`font-semibold`},Ze={class:`tnum`},Qe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},$e={class:`mt-2 flex items-center justify-between gap-3`},et={class:`tnum text-2xs text-ink-3`},Q=3e3,$=8e3,tt=15e3,nt=m({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(t,{emit:n}){let s=t,m=n,D=be(),O=i(null),k=i(!1),A=i(``),j=i(!1),M=i(null),N=i(0),P=i($),F=e(()=>O.value?.messages??[]),I=e(()=>O.value?.ticket??null),L=e(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await x();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function ee(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function B(){k.value=!0;try{O.value=await v.detail(s.ticketId),N.value=O.value.last_id??0,m(`changed`)}catch(e){D.error(e instanceof w?e.message:`加载工单失败`)}finally{k.value=!1}}let H=!1;async function U(){if(!H&&O.value){H=!0;try{let e=await v.messagesSince(s.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();O.value.messages.push(...n),P.value=Q,e&&!A.value.trim()&&await z(!0),m(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,m(`changed`))}catch{P.value=tt}finally{H=!1}}}async function W(){let e=A.value.trim();if(e){j.value=!0;try{await v.reply(s.ticketId,e),A.value=``,await B(),await z(!0),P.value=Q}catch(e){D.error(e instanceof w?e.message:`发送失败`)}finally{j.value=!1}}}async function ne(){try{await v.setStatus(s.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重新打开`:`工单已关闭`),await B()}catch(e){D.error(e instanceof w?e.message:`操作失败`)}}let K=De(),{pause:q,resume:J}=Ee(()=>void U(),P,{immediate:!1});return c(K,e=>{e===`visible`?(U(),J()):q()}),S(async()=>{await B(),J(),await z(!1)}),c(()=>s.ticketId,async()=>{N.value=0,P.value=$,await B(),await z(!1),J()}),E(q),(e,n)=>(y(),p(`div`,We,[f(`header`,Ge,[f(`div`,Ke,[f(`h3`,qe,_(I.value?.subject??`读取中`),1),f(`p`,Je,[o(` #`+_(t.ticketId)+` `,1),t.staff&&I.value?(y(),p(r,{key:0},[o(` · 提交人 `+_(I.value.owner_nickname),1)],64)):u(``,!0),I.value?(y(),p(r,{key:1},[o(` · `+_(d(Se)[I.value.status]),1)],64)):u(``,!0)])]),I.value?(y(),a(d(V),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:ne},{icon:l(()=>[(y(),a(g(L.value?d(Ue):d(ge)),{size:14}))]),default:l(()=>[o(` `+_(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):u(``,!0)]),f(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[h(d(Ve),{show:k.value&&!F.value.length},{default:l(()=>[h(G,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:l(()=>[(y(!0),p(r,null,C(F.value,e=>(y(),p(`li`,{key:e.id,class:T([`flex`,e.sender_id===t.currentUserId?`justify-end`:`justify-start`])},[f(`div`,Ye,[f(`div`,{class:T([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===t.currentUserId?`justify-end`:``])},[f(`span`,Xe,_(e.sender_nickname??`（已注销）`),1),f(`span`,Ze,_(e.create_time?.slice(5,16)??``),1)],2),f(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:b(e.sender_id===t.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},_(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),f(`footer`,Qe,[h(d(Y),{value:A.value,"onUpdate:value":n[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:te(re(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),f(`div`,$e,[f(`span`,et,_(A.value.length)+` / 1000`,1),h(d(V),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:W},{icon:l(()=>[h(d(ve),{size:14})]),default:l(()=>[n[1]||=o(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-sm font-semibold`},dt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=m({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(t){let n=be(),m=i([]),g=i(0),x=i(!0),T=i(`all`),E=i(null),D=i(!1),O=i(!1),k=i(!1),A=s({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=e(()=>m.value.find(e=>e.id===E.value)??null);async function N(e=!1){e||(x.value=!0);try{let e=await v.list(T.value===`all`?void 0:T.value);m.value=e.tickets,g.value=e.unread_total,E.value&&!m.value.some(e=>e.id===E.value)&&(E.value=null)}catch(t){e||n.error(t instanceof w?t.message:`加载工单失败`)}finally{x.value=!1}}function P(e){E.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function F(){if(!A.subject.trim()||!A.body.trim()){n.warning(`标题和描述都要填`);return}k.value=!0;try{let e=await v.create(A.subject.trim(),A.body.trim());n.success(`工单已提交 · 等待回复`),O.value=!1,A.subject=``,A.body=``,await N(),E.value=e.id}catch(e){n.error(e instanceof w?e.message:`提交失败`)}finally{k.value=!1}}let I=De(),{pause:L,resume:R}=Ee(()=>void N(!0),3e4,{immediate:!1});return c(I,e=>e===`visible`?(R(),void N(!0)):L()),c(T,()=>void N()),S(async()=>{await N(),R()}),(e,n)=>(y(),p(`div`,rt,[h(Te,{heading:`md`,title:t.staff?`工单处理`:`问题反馈`,subtitle:t.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`},{"title-append":l(()=>[g.value?(y(),a(d(Le),{key:0,value:g.value,type:`warning`},null,8,[`value`])):u(``,!0)]),actions:l(()=>[h(d(le),{value:T.value,"onUpdate:value":n[0]||=e=>T.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),t.staff?u(``,!0):(y(),a(d(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:n[1]||=e=>O.value=!0},{icon:l(()=>[h(d(_e),{size:15})]),default:l(()=>[n[9]||=o(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),f(`div`,it,[f(`div`,at,[x.value&&!m.value.length?(y(),p(`div`,ot,[(y(),p(r,null,C(4,e=>h(d(me),{key:e,height:`58px`,sharp:!1})),64))])):m.value.length?(y(),a(G,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:l(()=>[(y(!0),p(r,null,C(m.value,e=>(y(),p(`li`,{key:e.id},[f(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:b({borderColor:`var(--border)`,backgroundColor:E.value===e.id?`var(--muted)`:`transparent`}),"aria-current":E.value===e.id?`true`:void 0,onClick:t=>P(e)},[f(`div`,lt,[f(`span`,ut,_(e.subject),1),e.unread?(y(),a(d(Le),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(y(),p(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:b({color:e.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},_(d(Se)[e.status]),5))]),f(`p`,dt,_(e.last_body),1),f(`p`,ft,[o(` #`+_(e.id)+` `,1),t.staff&&e.owner_nickname?(y(),p(r,{key:0},[o(` · `+_(e.owner_nickname),1)],64)):u(``,!0),o(` · `+_(d(Ce)(e.update_time))+` · `+_(e.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(y(),p(`div`,st,[h(we,{code:`00 / NO TICKET`,title:t.staff?`无工单`:`还没有工单`,hint:t.staff?`学生提交后会自动出现在这里`:`有打印相关的问题，点右上角新建`},{icon:l(()=>[h(d(he),{size:28})]),_:1},8,[`title`,`hint`])]))]),f(`div`,pt,[M.value?(y(),a(nt,{key:M.value.id,"ticket-id":M.value.id,staff:t.staff,"current-user-id":t.currentUserId,onChanged:n[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(y(),p(`div`,mt,[h(we,{code:`00 / NO TICKET`,title:`从左侧选一个工单查看详情`,hint:`窄屏会以抽屉形式打开`},{icon:l(()=>[h(d(He),{size:28})]),_:1})]))])]),h(d(fe),{show:D.value,"onUpdate:show":n[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:l(()=>[h(d(pe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:l(()=>[f(`div`,ht,[M.value?(y(),a(nt,{key:M.value.id,"ticket-id":M.value.id,staff:t.staff,"current-user-id":t.currentUserId,onChanged:n[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):u(``,!0)])]),_:1})]),_:1},8,[`show`]),h(d(ye),{show:O.value,"onUpdate:show":n[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:l(()=>[f(`div`,gt,[h(d(V),{quaternary:``,onClick:n[7]||=e=>O.value=!1},{default:l(()=>[...n[10]||=[o(`取消`,-1)]]),_:1}),h(d(V),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:F},{default:l(()=>[...n[11]||=[o(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:l(()=>[h(d(de),{label:`标题`,"show-feedback":!1},{default:l(()=>[h(d(Y),{value:A.subject,"onUpdate:value":n[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),h(d(de),{label:`详细描述`,"show-feedback":!1},{default:l(()=>[h(d(Y),{value:A.body,"onUpdate:value":n[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清订单号、遇到的问题、期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};