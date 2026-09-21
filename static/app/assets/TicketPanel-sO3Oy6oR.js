import{Ct as e,Et as t,G as n,H as r,I as i,It as a,Pt as o,U as s,V as c,Vt as l,W as u,Wt as d,X as f,Y as p,Z as m,an as h,at as g,ct as _,ht as v,in as y,m as b,on as x,p as S,pt as C,ut as w,vt as T,wt as E}from"./endpoints-MMH2_YQj.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as B,k as V,n as H,nn as U,nt as W,o as G,on as ee,rn as K,s as te,sn as ne,st as q,t as J,u as Y,ut as re,v as ie,x as ae}from"./createLucideIcon-Dgil5eM1.js";import{t as X}from"./Input-BuVrZL_l.js";import{a as oe}from"./Scrollbar-cO_MZVQX.js";import{o as se,t as ce}from"./Select-BWnC-r81.js";import{r as le}from"./cssr-BbIC9z3Z.js";import{t as Z}from"./FormItem-DYWopddm.js";import{n as ue,t as de}from"./DrawerContent-BNgqLxgi.js";import{t as fe}from"./Skeleton-eb0Rc9Cy.js";import{t as pe}from"./inbox-BGk3uPVC.js";import{t as me}from"./lock-DHZYOxaZ.js";import{t as he}from"./plus-C9hqerMJ.js";import{t as ge}from"./send-_q67fS2l.js";import{C as _e,S as ve,U as ye,v as be}from"./index-ChakMpLN.js";import{c as xe,y as Se}from"./format-1rjnJmsR.js";import{t as Ce}from"./EmptyState-CG8-rmPG.js";import{t as we}from"./PageHeader-FEdpxFLN.js";import{r as Te,t as Ee}from"./dist-BT0e-Yfi.js";var De=m({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(t){let i=a(null),o=a(t.value),s=a(t.value),u=a(`up`),d=a(!1),f=c(()=>d.value?`${t.clsPrefix}-base-slot-machine-current-number--${u.value}-scroll`:null),p=c(()=>d.value?`${t.clsPrefix}-base-slot-machine-old-number--${u.value}-scroll`:null);e(l(t,`value`),(e,t)=>{o.value=t,s.value=e,g(m)});function m(){let e=t.newOriginalNumber,n=t.oldOriginalNumber;n!==void 0&&e!==void 0&&(e>n?h(`up`):n>e&&h(`down`))}function h(e){u.value=e,d.value=!1,g(()=>{i.value?.offsetWidth,d.value=!0})}return()=>{let{clsPrefix:e}=t;return C(),n(`span`,{ref:i,class:z(`${e}-base-slot-machine-number`)},[o.value===null?q(()=>null):(C(),n(`span`,{key:0,class:z([`${e}-base-slot-machine-old-number ${e}-base-slot-machine-old-number--top`,p.value])},[q(()=>o.value)],2)),r(`span`,{class:z([`${e}-base-slot-machine-current-number`,f.value])},[r(`span`,{ref:`numberWrapper`,class:z([`${e}-base-slot-machine-current-number__inner`,typeof t.value!=`number`&&`${e}-base-slot-machine-current-number__inner--not-number`])},[q(()=>s.value)],2)],2),o.value===null?q(()=>null):(C(),n(`span`,{key:2,class:z([`${e}-base-slot-machine-old-number ${e}-base-slot-machine-old-number--bottom`,p.value])},[q(()=>o.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=re;function Oe({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
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
 `,[Oe({duration:`.2s`}),te({duration:`.2s`,delay:`0s`}),A(`base-slot-machine-old-number`,`
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
 `)])])])])]),Ae=m({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(t){F(`-base-slot-machine`,ke,l(t,`clsPrefix`));let r=a(),i=a(),o=c(()=>{if(typeof t.value==`string`)return[];if(t.value<1)return[0];let e=[],n=t.value;for(t.max!==void 0&&(n=Math.min(t.max,n));n>=1;)e.push(n%10),n/=10,n=Math.floor(n);return e.reverse(),e});return e(l(t,`value`),(e,t)=>{typeof e==`string`?(i.value=void 0,r.value=void 0):typeof t==`string`?(i.value=e,r.value=void 0):(i.value=e,r.value=t)}),()=>{let{value:e,clsPrefix:a}=t;return typeof e==`number`?(C(),n(`span`,{key:1,class:z(`${a}-base-slot-machine`)},[f(K,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>o.value.map((e,t)=>(C(),s(De,{clsPrefix:a,key:o.value.length-t-1,oldOriginalNumber:r.value,newOriginalNumber:i.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),f(R,{key:`+`,width:!0},{default:()=>t.max!==void 0&&t.max<e?(C(),s(De,{key:2,clsPrefix:a,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(C(),n(`span`,{key:3,class:z(`${a}-base-slot-machine`)},[q(()=>e)],2))}}});function je(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Me={name:`Badge`,common:B,self:je},Ne=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
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
 `)])])]),Pe=[`title`],Fe={...V.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Ie=m({name:`Badge`,props:Fe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=L(e),o=V(`Badge`,`-badge`,Ne,Me,e,n),s=a(!1),l=()=>{s.value=!0},u=()=>{s.value=!1},d=c(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!P(t.value)));w(()=>{d.value&&(s.value=!0)});let f=ie(`Badge`,i,n),p=c(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,t)]:a,fontFamily:s,fontSize:c}}=o.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),m=r?D(`badge`,c(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=N(r)),t}),p,e):void 0,h=c(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:n,appeared:s,showBadge:d,handleAfterEnter:l,handleAfterLeave:u,cssVars:r?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:r,$slots:i}=this;t?.();let a=i.default?.();return C(),n(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,r,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!a}]),style:h(this.cssVars)},[q(()=>a),(C(),s(U,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(C(),n(`sup`,{key:1,class:z(`${e}-badge-sup`),title:se(this.value),style:h(this.offsetStyle)},[q(()=>ae(i.value,()=>[this.dot?null:(C(),s(Ae,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(C(),s(G,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):q(()=>null)],14,Pe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Le=O([O(`@keyframes spin-rotate`,`
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
 `,[oe()])]),A(`spin-body`,`
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
 `)])]),Re={small:20,medium:18,large:16},ze={...V.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Be=m({name:`Spin`,props:ze,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=L(e),r=V(`Spin`,`-spin`,Le,be,e,t),i=c(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?W(t):i[M(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=n?D(`spin`,c(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,s=le(e,[`spinning`,`show`]),l=a(!1);return E(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=s.value}),{mergedClsPrefix:t,active:l,mergedStrokeWidth:c(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Re[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:i}=this,a=e.icon&&this.rotate,o=(i||e.description)&&(C(),n(`div`,{class:z(`${t}-spin-description`)},[q(()=>i||e.description?.())],2)),c=e.icon?(C(),n(`div`,{key:1,class:z([`${t}-spin-body`,this.themeClass])},[r(`div`,{class:z([`${t}-spin`,a&&`${t}-spin--rotate`]),style:h(e.default?``:this.cssVars)},[q(()=>e.icon())],6),q(()=>o)],2)):(C(),n(`div`,{key:2,class:z([`${t}-spin-body`,this.themeClass])},[(C(),s(Y,{clsPrefix:t,style:h(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),q(()=>o)],2));return this.onRender?.(),e.default?(C(),n(`div`,{key:3,class:z([`${t}-spin-container`,this.themeClass]),style:h(this.cssVars)},[r(`div`,{class:z([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:h(this.contentStyle)},[q(()=>e.default?.())],6),f(U,{name:`fade-in-transition`},{default:()=>this.active?c:null},1024)],6)):c}}),Ve=J({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),He=J({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),Ue={class:`flex h-full flex-col`},We={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ge={class:`min-w-0`},Ke={class:`truncate font-heading text-base font-bold`},qe={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Je={class:`max-w-[86%]`},Ye={class:`font-semibold`},Xe={class:`tnum`},Ze={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Qe={class:`mt-2 flex items-center justify-between gap-3`},$e={class:`tnum text-2xs text-ink-3`},et=3e3,$=8e3,tt=15e3,nt=m({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(o,{emit:l}){let m=o,E=l,D=ve(),O=a(null),k=a(!1),A=a(``),j=a(!1),M=a(null),N=a(0),P=a($),F=c(()=>O.value?.messages??[]),I=c(()=>O.value?.ticket??null),L=c(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await g();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function B(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function V(){k.value=!0;try{O.value=await S.detail(m.ticketId),N.value=O.value.last_id??0,E(`changed`)}catch(e){D.error(e instanceof b?e.message:`加载工单失败`)}finally{k.value=!1}}let U=!1;async function W(){if(!U&&O.value){U=!0;try{let e=await S.messagesSince(m.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=B();O.value.messages.push(...n),P.value=et,e&&!A.value.trim()&&await z(!0),E(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,E(`changed`))}catch{P.value=tt}finally{U=!1}}}async function G(){let e=A.value.trim();if(e){j.value=!0;try{await S.reply(m.ticketId,e),A.value=``,await V(),await z(!0),P.value=et}catch(e){D.error(e instanceof b?e.message:`发送失败`)}finally{j.value=!1}}}async function te(){try{await S.setStatus(m.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重新打开`:`工单已关闭`),await V()}catch(e){D.error(e instanceof b?e.message:`操作失败`)}}let q=Ee(),{pause:J,resume:Y}=Te(()=>void W(),P,{immediate:!1});return e(q,e=>{e===`visible`?(W(),Y()):J()}),w(async()=>{await V(),Y(),await z(!1)}),e(()=>m.ticketId,async()=>{N.value=0,P.value=$,await V(),await z(!1),Y()}),_(J),(e,a)=>(C(),n(`div`,Ue,[r(`header`,We,[r(`div`,Ge,[r(`h3`,Ke,x(I.value?.subject??`读取中`),1),r(`p`,qe,[p(` #`+x(o.ticketId)+` `,1),o.staff&&I.value?(C(),n(i,{key:0},[p(` · 提交人 `+x(I.value.owner_nickname),1)],64)):u(``,!0),I.value?(C(),n(i,{key:1},[p(` · `+x(d(xe)[I.value.status]),1)],64)):u(``,!0)])]),I.value?(C(),s(d(H),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:te},{icon:t(()=>[(C(),s(T(L.value?d(He):d(me)),{size:14}))]),default:t(()=>[p(` `+x(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):u(``,!0)]),r(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[f(d(Be),{show:k.value&&!F.value.length},{default:t(()=>[f(K,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:t(()=>[(C(!0),n(i,null,v(F.value,e=>(C(),n(`li`,{key:e.id,class:y([`flex`,e.sender_id===o.currentUserId?`justify-end`:`justify-start`])},[r(`div`,Je,[r(`div`,{class:y([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===o.currentUserId?`justify-end`:``])},[r(`span`,Ye,x(e.sender_nickname??`（已注销）`),1),r(`span`,Xe,x(e.create_time?.slice(5,16)??``),1)],2),r(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:h(e.sender_id===o.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},x(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),r(`footer`,Ze,[f(d(X),{value:A.value,"onUpdate:value":a[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:ee(ne(G,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),r(`div`,Qe,[r(`span`,$e,x(A.value.length)+` / 1000`,1),f(d(H),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:G},{icon:t(()=>[f(d(ge),{size:14})]),default:t(()=>[a[1]||=p(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-sm font-semibold`},dt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=m({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(l){let m=ve(),g=a([]),_=a(0),y=a(!0),T=a(`all`),E=a(null),D=a(!1),O=a(!1),k=a(!1),A=o({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=c(()=>g.value.find(e=>e.id===E.value)??null);async function N(e=!1){e||(y.value=!0);try{let e=await S.list(T.value===`all`?void 0:T.value);g.value=e.tickets,_.value=e.unread_total,E.value&&!g.value.some(e=>e.id===E.value)&&(E.value=null)}catch(t){e||m.error(t instanceof b?t.message:`加载工单失败`)}finally{y.value=!1}}function P(e){E.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function F(){if(!A.subject.trim()||!A.body.trim()){m.warning(`标题和描述都要填`);return}k.value=!0;try{let e=await S.create(A.subject.trim(),A.body.trim());m.success(`工单已提交 · 等待回复`),O.value=!1,A.subject=``,A.body=``,await N(),E.value=e.id}catch(e){m.error(e instanceof b?e.message:`提交失败`)}finally{k.value=!1}}let I=Ee(),{pause:L,resume:R}=Te(()=>void N(!0),3e4,{immediate:!1});return e(I,e=>e===`visible`?(R(),void N(!0)):L()),e(T,()=>void N()),w(async()=>{await N(),R()}),(e,a)=>(C(),n(`div`,rt,[f(we,{heading:`md`,title:l.staff?`工单处理`:`问题反馈`,subtitle:l.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`},{"title-append":t(()=>[_.value?(C(),s(d(Ie),{key:0,value:_.value,type:`warning`},null,8,[`value`])):u(``,!0)]),actions:t(()=>[f(d(ce),{value:T.value,"onUpdate:value":a[0]||=e=>T.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),l.staff?u(``,!0):(C(),s(d(H),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:a[1]||=e=>O.value=!0},{icon:t(()=>[f(d(he),{size:15})]),default:t(()=>[a[9]||=p(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),r(`div`,it,[r(`div`,at,[y.value&&!g.value.length?(C(),n(`div`,ot,[(C(),n(i,null,v(4,e=>f(d(fe),{key:e,height:`58px`,sharp:!1})),64))])):g.value.length?(C(),s(K,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:t(()=>[(C(!0),n(i,null,v(g.value,e=>(C(),n(`li`,{key:e.id},[r(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:h({borderColor:`var(--border)`,backgroundColor:E.value===e.id?`var(--muted)`:`transparent`}),"aria-current":E.value===e.id?`true`:void 0,onClick:t=>P(e)},[r(`div`,lt,[r(`span`,ut,x(e.subject),1),e.unread?(C(),s(d(Ie),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(C(),n(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:h({color:e.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},x(d(xe)[e.status]),5))]),r(`p`,dt,x(e.last_body),1),r(`p`,ft,[p(` #`+x(e.id)+` `,1),l.staff&&e.owner_nickname?(C(),n(i,{key:0},[p(` · `+x(e.owner_nickname),1)],64)):u(``,!0),p(` · `+x(d(Se)(e.update_time))+` · `+x(e.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(C(),n(`div`,st,[f(Ce,{code:`00 / NO TICKET`,title:l.staff?`无工单`:`还没有工单`,hint:l.staff?`学生提交后会自动出现在这里`:`有打印相关的问题，点右上角新建`},{icon:t(()=>[f(d(pe),{size:28})]),_:1},8,[`title`,`hint`])]))]),r(`div`,pt,[M.value?(C(),s(nt,{key:M.value.id,"ticket-id":M.value.id,staff:l.staff,"current-user-id":l.currentUserId,onChanged:a[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(C(),n(`div`,mt,[f(Ce,{code:`00 / NO TICKET`,title:`从左侧选一个工单查看详情`,hint:`窄屏会以抽屉形式打开`},{icon:t(()=>[f(d(Ve),{size:28})]),_:1})]))])]),f(d(ue),{show:D.value,"onUpdate:show":a[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:t(()=>[f(d(de),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:t(()=>[r(`div`,ht,[M.value?(C(),s(nt,{key:M.value.id,"ticket-id":M.value.id,staff:l.staff,"current-user-id":l.currentUserId,onChanged:a[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):u(``,!0)])]),_:1})]),_:1},8,[`show`]),f(d(_e),{show:O.value,"onUpdate:show":a[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:t(()=>[r(`div`,gt,[f(d(H),{quaternary:``,onClick:a[7]||=e=>O.value=!1},{default:t(()=>[...a[10]||=[p(`取消`,-1)]]),_:1}),f(d(H),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:F},{default:t(()=>[...a[11]||=[p(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:t(()=>[f(d(Z),{label:`标题`,"show-feedback":!1},{default:t(()=>[f(d(X),{value:A.subject,"onUpdate:value":a[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),f(d(Z),{label:`详细描述`,"show-feedback":!1},{default:t(()=>[f(d(X),{value:A.body,"onUpdate:value":a[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清订单号、遇到的问题、期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};