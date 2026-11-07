import{At as e,J as t,Jt as n,Nt as r,Q as i,St as a,Tt as o,U as s,Ut as c,Vt as l,X as u,Y as d,Z as f,Zt as p,_t as m,b as h,bt as g,dn as _,fn as v,ft as y,ht as b,it as x,jt as S,nt as C,pn as w,rt as T,y as E}from"./endpoints-B5qu1zMG.js";import{$t as D,C as O,D as k,E as A,F as j,I as M,L as N,S as P,Xt as F,Zt as I,_ as L,_t as R,c as z,cn as B,dn as V,en as H,f as U,fn as ee,ft as W,g as G,ht as K,l as q,lt as J,nn as Y,p as X,pt as Z,sn as te,st as ne,w as re}from"./motion-amoZaQIY.js";import{s as ie,t as ae}from"./Select-xfGEX82j.js";import{r as oe}from"./cssr-CneKOi6G.js";import{t as se}from"./FormItem-DS-OJlLv.js";import{t as ce}from"./Input-PoA4tXca.js";import{n as le,t as ue}from"./DrawerContent-CAuzYkbC.js";import{t as de}from"./Skeleton-DBx9cvg9.js";import{t as fe}from"./inbox-C8z4w8E7.js";import{t as pe}from"./lock-DJltcUq2.js";import{t as me}from"./plus-AfJPoBJD.js";import{t as he}from"./send-DSXsYbKs.js";import{R as ge,f as _e,p as ve,y as ye}from"./index-DetkDE_U.js";import{s as be,y as xe}from"./format-CWkc0wMt.js";import{t as Se}from"./EmptyState-D_Y3gkoS.js";import{t as Ce}from"./PageHeader-WvJUOCmW.js";import{r as we,t as Te}from"./dist-vrHYrAdo.js";var Ee=x({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(r){let a=c(null),o=c(r.value),s=c(r.value),l=c(`up`),u=c(!1),f=t(()=>u.value?`${r.clsPrefix}-base-slot-machine-current-number--${l.value}-scroll`:null),p=t(()=>u.value?`${r.clsPrefix}-base-slot-machine-old-number--${l.value}-scroll`:null);e(n(r,`value`),(e,t)=>{o.value=t,s.value=e,y(m)});function m(){let e=r.newOriginalNumber,t=r.oldOriginalNumber;t!==void 0&&e!==void 0&&(e>t?h(`up`):t>e&&h(`down`))}function h(e){l.value=e,u.value=!1,y(()=>{a.value?.offsetWidth,u.value=!0})}return()=>{let{clsPrefix:e}=r;return g(),i(`span`,{ref:a,class:J(`${e}-base-slot-machine-number`)},[o.value===null?W(()=>null):(g(),i(`span`,{key:0,class:J([`${e}-base-slot-machine-old-number ${e}-base-slot-machine-old-number--top`,p.value])},[W(()=>o.value)],2)),d(`span`,{class:J([`${e}-base-slot-machine-current-number`,f.value])},[d(`span`,{ref:`numberWrapper`,class:J([`${e}-base-slot-machine-current-number__inner`,typeof r.value!=`number`&&`${e}-base-slot-machine-current-number__inner--not-number`])},[W(()=>s.value)],2)],2),o.value===null?W(()=>null):(g(),i(`span`,{key:2,class:J([`${e}-base-slot-machine-old-number ${e}-base-slot-machine-old-number--bottom`,p.value])},[W(()=>o.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=K;function De({duration:e=`.2s`}={}){return[F(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),F(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),F(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),F(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),F(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),F(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=F([F(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),F(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),F(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),F(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),I(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[I(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),X({duration:`.2s`,delay:`0s`}),I(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[H(`top`,{transform:`translateY(-100%)`}),H(`bottom`,{transform:`translateY(100%)`}),H(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),H(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),I(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[H(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),H(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),D(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[H(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=x({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(r){Z(`-base-slot-machine`,Oe,n(r,`clsPrefix`));let a=c(),o=c(),s=t(()=>{if(typeof r.value==`string`)return[];if(r.value<1)return[0];let e=[],t=r.value;for(r.max!==void 0&&(t=Math.min(r.max,t));t>=1;)e.push(t%10),t/=10,t=Math.floor(t);return e.reverse(),e});return e(n(r,`value`),(e,t)=>{typeof e==`string`?(o.value=void 0,a.value=void 0):typeof t==`string`?(o.value=e,a.value=void 0):(o.value=e,a.value=t)}),()=>{let{value:e,clsPrefix:t}=r;return typeof e==`number`?(g(),i(`span`,{key:1,class:J(`${t}-base-slot-machine`)},[T(B,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>s.value.map((e,n)=>(g(),u(Ee,{clsPrefix:t,key:s.value.length-n-1,oldOriginalNumber:a.value,newOriginalNumber:o.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),T(P,{key:`+`,width:!0},{default:()=>r.max!==void 0&&r.max<e?(g(),u(Ee,{key:2,clsPrefix:t,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(g(),i(`span`,{key:3,class:J(`${t}-base-slot-machine`)},[W(()=>e)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:N,self:Ae},Me=F([F(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),I(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[H(`as-is`,[I(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ye({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),H(`dot`,[I(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[F(`::before`,`border-radius: 4px;`)])]),I(`badge-sup`,`
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
 `,[ye({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),I(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),F(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...j.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=x({name:`Badge`,props:Pe,setup(e,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:a}=R(e),o=j(`Badge`,`-badge`,Me,je,e,r),s=c(!1),l=()=>{s.value=!0},u=()=>{s.value=!1},d=t(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!A(n.value)));m(()=>{d.value&&(s.value=!0)});let f=re(`Badge`,a,r),p=t(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[Y(`color`,t)]:a,fontFamily:s,fontSize:c}}=o.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),h=i?M(`badge`,t(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=O(r)),t}),p,e):void 0,g=t(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:r,appeared:s,showBadge:d,handleAfterEnter:l,handleAfterLeave:u,cssVars:i?void 0:p,themeClass:h?.themeClass,onRender:h?.onRender,offsetStyle:g}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let a=r.default?.();return g(),i(`div`,{class:J([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!a}]),style:v(this.cssVars)},[W(()=>a),(g(),u(te,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(g(),i(`sup`,{key:1,class:J(`${e}-badge-sup`),title:ie(this.value),style:v(this.offsetStyle)},[W(()=>k(r.value,()=>[this.dot?null:(g(),u(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(g(),u(U,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):W(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}});function Ie(e){let{opacityDisabled:t,heightTiny:n,heightSmall:r,heightMedium:i,heightLarge:a,heightHuge:o,primaryColor:s,fontSize:c}=e;return{fontSize:c,textColor:s,sizeTiny:n,sizeSmall:r,sizeMedium:i,sizeLarge:a,sizeHuge:o,color:s,opacitySpinning:t}}var Le={name:`Spin`,common:N,self:Ie},Re=F([F(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),I(`spin-container`,`
 position: relative;
 `,[I(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[ge()])]),I(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),I(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[H(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),I(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),I(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[H(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),ze={small:20,medium:18,large:16},Be={...j.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...L,strokeWidth:Number},Ve=x({name:`Spin`,props:Be,slots:Object,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=R(e),i=j(`Spin`,`-spin`,Re,Le,e,n),a=t(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{opacitySpinning:a,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?ne(t):r[Y(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=r?M(`spin`,t(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),a,e):void 0,s=oe(e,[`spinning`,`show`]),l=c(!1);return S(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=s.value}),{mergedClsPrefix:n,active:l,mergedStrokeWidth:t(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return ze[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,a=(n||e.description)&&(g(),i(`div`,{class:J(`${t}-spin-description`)},[W(()=>n||e.description?.())],2)),o=e.icon?(g(),i(`div`,{key:1,class:J([`${t}-spin-body`,this.themeClass])},[d(`div`,{class:J([`${t}-spin`,r&&`${t}-spin--rotate`]),style:v(e.default?``:this.cssVars)},[W(()=>e.icon())],6),W(()=>a)],2)):(g(),i(`div`,{key:2,class:J([`${t}-spin-body`,this.themeClass])},[(g(),u(G,{clsPrefix:t,style:v(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:J(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),W(()=>a)],2));return this.onRender?.(),e.default?(g(),i(`div`,{key:3,class:J([`${t}-spin-container`,this.themeClass]),style:v(this.cssVars)},[d(`div`,{class:J([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:v(this.contentStyle)},[W(()=>e.default?.())],6),T(te,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),He=z({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ue=z({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),We={class:`flex h-full flex-col`},Ge={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ke={class:`min-w-0`},qe={class:`truncate font-heading text-base font-bold`},Je={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ye={class:`max-w-[86%]`},Xe={class:`font-semibold`},Ze={class:`tnum`},Qe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},$e={class:`mt-2 flex items-center justify-between gap-3`},et={class:`tnum text-2xs text-ink-3`},tt=3e3,$=8e3,nt=15e3,rt=x({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(n,{emit:l}){let x=n,S=l,D=_e(),O=c(null),k=c(!1),A=c(``),j=c(!1),M=c(null),N=c(0),P=c($),F=t(()=>O.value?.messages??[]),I=t(()=>O.value?.ticket??null),L=t(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await y();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function H(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function U(){k.value=!0;try{O.value=await E.detail(x.ticketId),N.value=O.value.last_id??0,S(`changed`)}catch(e){D.error(e instanceof h?e.message:`工单读取失败`)}finally{k.value=!1}}let W=!1;async function G(){if(!W&&O.value){W=!0;try{let e=await E.messagesSince(x.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=H();O.value.messages.push(...n),P.value=tt,e&&!A.value.trim()&&await z(!0),S(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),nt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,S(`changed`))}catch{P.value=nt}finally{W=!1}}}async function K(){let e=A.value.trim();if(e){j.value=!0;try{await E.reply(x.ticketId,e),A.value=``,await U(),await z(!0),P.value=tt}catch(e){D.error(e instanceof h?e.message:`发送未完成 · 稍后重试`)}finally{j.value=!1}}}async function J(){try{await E.setStatus(x.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重开`:`工单已关闭`),await U()}catch(e){D.error(e instanceof h?e.message:`工单状态未变更 · 稍后重试`)}}let Y=Te(),{pause:X,resume:Z}=we(()=>void G(),P,{immediate:!1});return e(Y,e=>{e===`visible`?(G(),Z()):X()}),m(async()=>{await U(),Z(),await z(!1)}),e(()=>x.ticketId,async()=>{N.value=0,P.value=$,await U(),await z(!1),Z()}),b(X),(e,t)=>(g(),i(`div`,We,[d(`header`,Ge,[d(`div`,Ke,[d(`h3`,qe,w(I.value?.subject??`读取中`),1),d(`p`,Je,[C(` 工单 `+w(n.ticketId)+` `,1),n.staff&&I.value?(g(),i(s,{key:0},[C(` · 提交人 `+w(I.value.owner_nickname),1)],64)):f(``,!0),I.value?(g(),i(s,{key:1},[C(` · `+w(p(be)[I.value.status]),1)],64)):f(``,!0)])]),I.value?(g(),u(p(q),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:J},{icon:r(()=>[(g(),u(o(L.value?p(Ue):p(pe)),{size:14}))]),default:r(()=>[C(` `+w(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):f(``,!0)]),d(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[T(p(Ve),{show:k.value&&!F.value.length},{default:r(()=>[T(B,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:r(()=>[(g(!0),i(s,null,a(F.value,e=>(g(),i(`li`,{key:e.id,class:_([`flex`,e.sender_id===n.currentUserId?`justify-end`:`justify-start`])},[d(`div`,Ye,[d(`div`,{class:_([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===n.currentUserId?`justify-end`:``])},[d(`span`,Xe,w(e.sender_nickname??`（已注销）`),1),d(`span`,Ze,w(e.create_time?.slice(5,16)??``),1)],2),d(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:v(e.sender_id===n.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},w(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),d(`footer`,Qe,[T(p(ce),{value:A.value,"onUpdate:value":t[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:V(ee(K,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),d(`div`,$e,[d(`span`,et,w(A.value.length)+` / 1000`,1),T(p(q),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:K},{icon:r(()=>[T(p(he),{size:14})]),default:r(()=>[t[1]||=C(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),it={class:`mx-auto max-w-6xl`},at={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ot={class:`panel overflow-hidden`},st={key:0,class:`flex flex-col gap-2 p-3`},ct={key:1,class:`grid place-items-center gap-3 py-12`},lt={key:2,class:`grid place-items-center py-12`},ut=[`aria-current`,`onClick`],dt={class:`flex items-start justify-between gap-2`},ft={class:`min-w-0 flex-1 truncate text-sm font-semibold`},pt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},mt={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},ht={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},gt={key:1,class:`grid h-full place-items-center py-16`},_t={class:`h-[82vh]`},vt={class:`flex justify-end gap-2`},yt=x({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(n){let o=_e(),_=c([]),y=c(0),b=c(!0),x=c(`all`),S=c(null),D=c(!1),O=c(!1),k=c(!1),A=l({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=t(()=>_.value.find(e=>e.id===S.value)??null),N=0,P=c(!1);async function F(e=!1){let t=++N;e||(b.value=!0);try{let e=await E.list(x.value===`all`?void 0:x.value);if(t!==N)return;_.value=e.tickets,y.value=e.unread_total,P.value=!1,S.value&&!_.value.some(e=>e.id===S.value)&&(S.value=null)}catch(n){!e&&t===N&&o.error(n instanceof h?n.message:`工单读取失败`),P.value=!0}finally{t===N&&(b.value=!1)}}function I(e){S.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function L(){if(!A.subject.trim()||!A.body.trim()){o.warning(`标题与描述为必填`);return}k.value=!0;try{let e=await E.create(A.subject.trim(),A.body.trim());o.success(`工单已提交 · 待回复`),O.value=!1,A.subject=``,A.body=``,await F(),S.value=e.id}catch(e){o.error(e instanceof h?e.message:`提交未完成 · 稍后重试`)}finally{k.value=!1}}let R=Te(),{pause:z,resume:V}=we(()=>void F(!0),3e4,{immediate:!1});return e(R,e=>e===`visible`?(V(),void F(!0)):z()),e(x,()=>void F()),m(async()=>{await F(),R.value===`visible`&&V()}),(e,t)=>(g(),i(`div`,it,[T(Ce,{heading:`md`,title:n.staff?`工单处理`:`问题反馈`,subtitle:n.staff?`学生提交的问题与需求 · 回复后对方收到未读提示`:`打印相关问题 · 在此留言给管理员`},{"title-append":r(()=>[y.value?(g(),u(p(Fe),{key:0,value:y.value,type:`warning`},null,8,[`value`])):f(``,!0)]),actions:r(()=>[T(p(ae),{value:x.value,"onUpdate:value":t[0]||=e=>x.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),n.staff?f(``,!0):(g(),u(p(q),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:t[1]||=e=>O.value=!0},{icon:r(()=>[T(p(me),{size:15})]),default:r(()=>[t[10]||=C(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),d(`div`,at,[d(`div`,ot,[b.value&&!_.value.length?(g(),i(`div`,st,[(g(),i(s,null,a(4,e=>T(p(de),{key:e,height:`58px`,sharp:!1})),64))])):P.value&&!_.value.length?(g(),i(`div`,ct,[T(Se,{code:`ERR / NO LOAD`,title:`工单没读到`,hint:`多半是网络没跟上`},{icon:r(()=>[T(p(fe),{size:28})]),_:1}),T(p(q),{size:`small`,onClick:t[2]||=e=>F()},{default:r(()=>[...t[11]||=[C(`重试`,-1)]]),_:1})])):_.value.length?(g(),u(B,{key:3,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:r(()=>[(g(!0),i(s,null,a(_.value,e=>(g(),i(`li`,{key:e.id},[d(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:v({borderColor:`var(--border)`,backgroundColor:S.value===e.id?`var(--muted)`:`transparent`}),"aria-current":S.value===e.id?`true`:void 0,onClick:t=>I(e)},[d(`div`,dt,[d(`span`,ft,w(e.subject),1),e.unread?(g(),u(p(Fe),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(g(),i(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:v({color:e.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},w(p(be)[e.status]),5))]),d(`p`,pt,w(e.last_body),1),d(`p`,mt,[C(` 工单 `+w(e.id)+` `,1),n.staff&&e.owner_nickname?(g(),i(s,{key:0},[C(` · `+w(e.owner_nickname),1)],64)):f(``,!0),C(` · `+w(p(xe)(e.update_time))+` · `+w(e.msg_count)+` 条 `,1)])],12,ut)]))),128))]),_:1})):(g(),i(`div`,lt,[T(Se,{code:`00 / NO TICKET`,title:n.staff?`无工单`:`尚未提交工单`,hint:n.staff?`学生提交后在此列示`:`打印相关问题 · 新建工单提交`},{icon:r(()=>[T(p(fe),{size:28})]),_:1},8,[`title`,`hint`])]))]),d(`div`,ht,[M.value?(g(),u(rt,{key:M.value.id,"ticket-id":M.value.id,staff:n.staff,"current-user-id":n.currentUserId,onChanged:t[3]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(g(),i(`div`,gt,[T(Se,{code:`00 / NO TICKET`,title:`从左侧选择工单`,hint:`窄屏以抽屉打开`},{icon:r(()=>[T(p(He),{size:28})]),_:1})]))])]),T(p(le),{show:D.value,"onUpdate:show":t[5]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:r(()=>[T(p(ue),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:r(()=>[d(`div`,_t,[M.value?(g(),u(rt,{key:M.value.id,"ticket-id":M.value.id,staff:n.staff,"current-user-id":n.currentUserId,onChanged:t[4]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):f(``,!0)])]),_:1})]),_:1},8,[`show`]),T(p(ve),{show:O.value,"onUpdate:show":t[9]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:r(()=>[d(`div`,vt,[T(p(q),{quaternary:``,onClick:t[8]||=e=>O.value=!1},{default:r(()=>[...t[12]||=[C(`取消`,-1)]]),_:1}),T(p(q),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:L},{default:r(()=>[...t[13]||=[C(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:r(()=>[T(p(se),{label:`标题`,"show-feedback":!1},{default:r(()=>[T(p(ce),{value:A.subject,"onUpdate:value":t[6]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),T(p(se),{label:`详细描述`,"show-feedback":!1},{default:r(()=>[T(p(ce),{value:A.body,"onUpdate:value":t[7]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清单号、遇到的问题与期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{yt as t};