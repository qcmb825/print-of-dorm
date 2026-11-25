import{b as e,x as t}from"./endpoints-DS4vsVAK.js";import{$ as n,A as r,At as i,D as a,Dt as o,E as s,F as c,Gt as l,I as u,Kt as d,O as f,P as p,St as m,W as h,Wt as g,X as _,bt as v,ft as y,it as b,k as x,lt as S,q as C,tt as w,ut as T,x as E}from"./useApi-BPuI6ZR9-BM-pFei4.js";import{$t as D,A as O,Ht as k,O as A,Rt as j,Vt as M,Wt as N,Xt as P,Yt as F,Z as I,_ as L,a as R,at as z,b as B,en as V,et as H,g as ee,h as U,k as W,l as G,n as K,o as q,rt as te,t as J,tt as Y,u as X,y as ne,zt as Z}from"./createLucideIcon-ClRkaCjD.js";import{o as re,t as ie}from"./Select-Cq0ZZ3tW.js";import{t as ae}from"./use-compitable-C9VlPzQl.js";import{t as oe}from"./FormItem-W4qCwGzE.js";import{t as se}from"./Input-B7tqPKLy.js";import{n as ce,t as le}from"./DrawerContent-Dpns2YTQ.js";import{t as ue}from"./Skeleton-GAcTRQiC.js";import{t as de}from"./inbox-R_-efCXF.js";import{t as fe}from"./lock-CCiabhwE.js";import{t as pe}from"./plus-CUEvZVn2.js";import{t as me}from"./send-BwvRnfRy.js";import{D as he,K as ge,b as _e,dt as ve,x as ye}from"./index-3j4QgkOE.js";import{s as be,y as xe}from"./format-CWkc0wMt.js";import{t as Se}from"./EmptyState-kHSwWPqJ.js";import{t as Ce}from"./PageHeader-mQMCT8KA.js";import{r as we,t as Te}from"./dist-Bl2nBWpK.js";var Ee=u({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=m(null),i=m(e.value),c=m(e.value),l=m(`up`),u=m(!1),d=s(()=>u.value?`${e.clsPrefix}-base-slot-machine-current-number--${l.value}-scroll`:null),f=s(()=>u.value?`${e.clsPrefix}-base-slot-machine-old-number--${l.value}-scroll`:null);S(o(e,`value`),(e,t)=>{i.value=t,c.value=e,h(p)});function p(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?g(`up`):n>t&&g(`down`))}function g(e){l.value=e,u.value=!1,h(()=>{t.value?.offsetWidth,u.value=!0})}return()=>{let{clsPrefix:o}=e;return n(),r(`span`,{ref:t,class:I(`${o}-base-slot-machine-number`)},[i.value===null?H(()=>null):(n(),r(`span`,{key:0,class:I([`${o}-base-slot-machine-old-number ${o}-base-slot-machine-old-number--top`,f.value])},[H(()=>i.value)],2)),a(`span`,{class:I([`${o}-base-slot-machine-current-number`,d.value])},[a(`span`,{ref:`numberWrapper`,class:I([`${o}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${o}-base-slot-machine-current-number__inner--not-number`])},[H(()=>c.value)],2)],2),i.value===null?H(()=>null):(n(),r(`span`,{key:2,class:I([`${o}-base-slot-machine-old-number ${o}-base-slot-machine-old-number--bottom`,f.value])},[H(()=>i.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=te;function De({duration:e=`.2s`}={}){return[j(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),j(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),j(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),j(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),j(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),j(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=j([j(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),j(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),j(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),j(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),Z(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[Z(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),q({duration:`.2s`,delay:`0s`}),Z(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[k(`top`,{transform:`translateY(-100%)`}),k(`bottom`,{transform:`translateY(100%)`}),k(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),k(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),Z(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[k(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),k(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),M(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[k(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=u({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){Y(`-base-slot-machine`,Oe,o(e,`clsPrefix`));let t=m(),i=m(),a=s(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return S(o(e,`value`),(e,n)=>{typeof e==`string`?(i.value=void 0,t.value=void 0):typeof n==`string`?(i.value=e,t.value=void 0):(i.value=e,t.value=n)}),()=>{let{value:o,clsPrefix:s}=e;return typeof o==`number`?(n(),r(`span`,{key:1,class:I(`${s}-base-slot-machine`)},[c(P,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>a.value.map((e,r)=>(n(),f(Ee,{clsPrefix:s,key:a.value.length-r-1,oldOriginalNumber:t.value,newOriginalNumber:i.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),c(U,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<o?(n(),f(Ee,{key:2,clsPrefix:s,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(n(),r(`span`,{key:3,class:I(`${s}-base-slot-machine`)},[H(()=>o)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:O,self:Ae},Me=j([j(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),Z(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[k(`as-is`,[Z(`badge-sup`,{position:`static`,transform:`translateX(0)`},[he({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),k(`dot`,[Z(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[j(`::before`,`border-radius: 4px;`)])]),Z(`badge-sup`,`
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
 `,[he({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),Z(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),j(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...A.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=u({name:`Badge`,props:Pe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=z(e),a=A(`Badge`,`-badge`,Me,je,e,n),o=m(!1),c=()=>{o.value=!0},l=()=>{o.value=!1},u=s(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!ne(t.value)));_(()=>{u.value&&(o.value=!0)});let d=L(`Badge`,i,n),f=s(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[N(`color`,t)]:o,fontFamily:s,fontSize:c}}=a.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||o,"--n-ripple-color":n||o,"--n-bezier":r,"--n-ripple-bezier":i}}),p=r?W(`badge`,s(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=ee(r)),t}),f,e):void 0,h=s(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${d?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:d,mergedClsPrefix:n,appeared:o,showBadge:u,handleAfterEnter:c,handleAfterLeave:l,cssVars:r?void 0:f,themeClass:p?.themeClass,onRender:p?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:i,$slots:a}=this;t?.();let o=a.default?.();return n(),r(`div`,{class:I([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,i,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!o}]),style:l(this.cssVars)},[H(()=>o),(n(),f(F,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(n(),r(`sup`,{key:1,class:I(`${e}-badge-sup`),title:re(this.value),style:l(this.offsetStyle)},[H(()=>B(a.value,()=>[this.dot?null:(n(),f(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(n(),f(R,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):H(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}});function Ie(e){let{opacityDisabled:t,heightTiny:n,heightSmall:r,heightMedium:i,heightLarge:a,heightHuge:o,primaryColor:s,fontSize:c}=e;return{fontSize:c,textColor:s,sizeTiny:n,sizeSmall:r,sizeMedium:i,sizeLarge:a,sizeHuge:o,color:s,opacitySpinning:t}}var Le={name:`Spin`,common:O,self:Ie},Re=j([j(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),Z(`spin-container`,`
 position: relative;
 `,[Z(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[ge()])]),Z(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),Z(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[k(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),Z(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),Z(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[k(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),ze={small:20,medium:18,large:16},Be={...A.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...X,strokeWidth:Number},Ve=u({name:`Spin`,props:Be,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=z(e),r=A(`Spin`,`-spin`,Re,Le,e,t),i=s(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?ve(t):i[N(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?W(`spin`,s(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,o=ae(e,[`spinning`,`show`]),c=m(!1);return T(t=>{let n;if(o.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{c.value=!0},r),t(()=>{clearTimeout(n)});return}}c.value=o.value}),{mergedClsPrefix:t,active:c,mergedStrokeWidth:s(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return ze[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:i}=this,o=e.icon&&this.rotate,s=(i||e.description)&&(n(),r(`div`,{class:I(`${t}-spin-description`)},[H(()=>i||e.description?.())],2)),u=e.icon?(n(),r(`div`,{key:1,class:I([`${t}-spin-body`,this.themeClass])},[a(`div`,{class:I([`${t}-spin`,o&&`${t}-spin--rotate`]),style:l(e.default?``:this.cssVars)},[H(()=>e.icon())],6),H(()=>s)],2)):(n(),r(`div`,{key:2,class:I([`${t}-spin-body`,this.themeClass])},[(n(),f(G,{clsPrefix:t,style:l(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:I(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),H(()=>s)],2));return this.onRender?.(),e.default?(n(),r(`div`,{key:3,class:I([`${t}-spin-container`,this.themeClass]),style:l(this.cssVars)},[a(`div`,{class:I([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:l(this.contentStyle)},[H(()=>e.default?.())],6),c(F,{name:`fade-in-transition`},{default:()=>this.active?u:null},1024)],6)):u}}),He=J({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ue=J({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),We={class:`flex h-full flex-col`},Ge={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ke={class:`min-w-0`},qe={class:`truncate font-heading text-base font-bold`},Je={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ye={class:`max-w-[86%]`},Xe={class:`font-semibold`},Ze={class:`tnum`},Qe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},$e={class:`mt-2 flex items-center justify-between gap-3`},et={class:`tnum text-2xs text-ink-3`},tt=3e3,$=8e3,nt=15e3,rt=u({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(o,{emit:u}){let v=o,T=u,O=_e(),k=m(null),A=m(!1),j=m(``),M=m(!1),N=m(null),F=m(0),I=m($),L=s(()=>k.value?.messages??[]),R=s(()=>k.value?.ticket??null),z=s(()=>R.value?.status===`closed`);function B(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function H(e){await h();let t=N.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&B()?`smooth`:`auto`})}function ee(){let e=N.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function U(){A.value=!0;try{k.value=await e.detail(v.ticketId),F.value=k.value.last_id??0,T(`changed`)}catch(e){O.error(e instanceof t?e.message:`工单读取失败`)}finally{A.value=!1}}let W=!1;async function G(){if(!W&&k.value){W=!0;try{let t=await e.messagesSince(v.ticketId,F.value);t.last_id>F.value&&(F.value=t.last_id);let n=new Set(L.value.map(e=>e.id)),r=t.messages.filter(e=>!n.has(e.id));if(r.length){let e=ee();k.value.messages.push(...r),I.value=tt,e&&!j.value.trim()&&await H(!0),T(`changed`)}else I.value=I.value<$?$:Math.min(Math.round(I.value*1.6),nt);t.status&&k.value.ticket.status!==t.status&&(k.value.ticket.status=t.status,T(`changed`))}catch{I.value=nt}finally{W=!1}}}async function q(){let n=j.value.trim();if(n){M.value=!0;try{await e.reply(v.ticketId,n),j.value=``,await U(),await H(!0),I.value=tt}catch(e){O.error(e instanceof t?e.message:`发送未完成 · 稍后重试`)}finally{M.value=!1}}}async function te(){try{await e.setStatus(v.ticketId,z.value?`open`:`closed`),O.success(z.value?`工单已重开`:`工单已关闭`),await U()}catch(e){O.error(e instanceof t?e.message:`工单状态未变更 · 稍后重试`)}}let J=Te(),{pause:Y,resume:X}=we(()=>void G(),I,{immediate:!1});return S(J,e=>{e===`visible`?(G(),X()):Y()}),_(async()=>{await U(),J.value===`visible`&&X(),await H(!1)}),S(()=>v.ticketId,async()=>{F.value=0,I.value=$,await U(),await H(!1),X()}),C(Y),(e,t)=>(n(),r(`div`,We,[a(`header`,Ge,[a(`div`,Ke,[a(`h3`,qe,d(R.value?.subject??`读取中`),1),a(`p`,Je,[p(` 工单 `+d(o.ticketId)+` `,1),o.staff&&R.value?(n(),r(E,{key:0},[p(` · 提交人 `+d(R.value.owner_nickname),1)],64)):x(``,!0),R.value?(n(),r(E,{key:1},[p(` · `+d(i(be)[R.value.status]),1)],64)):x(``,!0)])]),R.value?(n(),f(i(K),{key:0,size:`small`,quaternary:``,disabled:A.value,onClick:te},{icon:y(()=>[(n(),f(b(z.value?i(Ue):i(fe)),{size:14}))]),default:y(()=>[p(` `+d(z.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):x(``,!0)]),a(`div`,{ref_key:`scroller`,ref:N,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[c(i(Ve),{show:A.value&&!L.value.length},{default:y(()=>[c(P,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:y(()=>[(n(!0),r(E,null,w(L.value,e=>(n(),r(`li`,{key:e.id,class:g([`flex`,e.sender_id===o.currentUserId?`justify-end`:`justify-start`])},[a(`div`,Ye,[a(`div`,{class:g([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===o.currentUserId?`justify-end`:``])},[a(`span`,Xe,d(e.sender_nickname??`（已注销）`),1),a(`span`,Ze,d(e.create_time?.slice(5,16)??``),1)],2),a(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:l(e.sender_id===o.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},d(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),a(`footer`,Qe,[c(i(se),{value:j.value,"onUpdate:value":t[0]||=e=>j.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:z.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:z.value||M.value,onKeydown:D(V(q,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),a(`div`,$e,[a(`span`,et,d(j.value.length)+` / 1000`,1),c(i(K),{type:`primary`,size:`small`,loading:M.value,disabled:z.value||!j.value.trim(),class:`!font-bold`,onClick:q},{icon:y(()=>[c(i(me),{size:14})]),default:y(()=>[t[1]||=p(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),it={class:`mx-auto max-w-6xl`},at={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ot={class:`panel overflow-hidden`},st={key:0,class:`flex flex-col gap-2 p-3`},ct={key:1,class:`grid place-items-center gap-3 py-12`},lt={key:2,class:`grid place-items-center py-12`},ut=[`aria-current`,`onClick`],dt={class:`flex items-start justify-between gap-2`},ft={class:`min-w-0 flex-1 truncate text-sm font-semibold`},pt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},mt={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},ht={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},gt={key:1,class:`grid h-full place-items-center py-16`},_t={class:`h-[82vh]`},vt={class:`flex justify-end gap-2`},yt=u({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(o){let u=_e(),h=m([]),g=m(0),b=m(!0),C=m(`all`),T=m(null),D=m(!1),O=m(!1),k=m(!1),A=v({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=s(()=>h.value.find(e=>e.id===T.value)??null),N=0,F=m(!1);async function I(n=!1){let r=++N;n||(b.value=!0);try{let t=await e.list(C.value===`all`?void 0:C.value);if(r!==N)return;h.value=t.tickets,g.value=t.unread_total,F.value=!1,T.value&&!h.value.some(e=>e.id===T.value)&&(T.value=null)}catch(e){!n&&r===N&&u.error(e instanceof t?e.message:`工单读取失败`),F.value=!0}finally{r===N&&(b.value=!1)}}function L(e){T.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function R(){if(!A.subject.trim()||!A.body.trim()){u.warning(`标题与描述为必填`);return}k.value=!0;try{let t=await e.create(A.subject.trim(),A.body.trim());u.success(`工单已提交 · 待回复`),O.value=!1,A.subject=``,A.body=``,await I(),T.value=t.id}catch(e){u.error(e instanceof t?e.message:`提交未完成 · 稍后重试`)}finally{k.value=!1}}let z=Te(),{pause:B,resume:V}=we(()=>void I(!0),3e4,{immediate:!1});return S(z,e=>e===`visible`?(V(),void I(!0)):B()),S(C,()=>void I()),_(async()=>{await I(),z.value===`visible`&&V()}),(e,t)=>(n(),r(`div`,it,[c(Ce,{heading:`md`,title:o.staff?`工单处理`:`问题反馈`,subtitle:o.staff?`学生提交的问题与需求 · 回复后对方收到未读提示`:`打印相关问题 · 在此留言给管理员`},{"title-append":y(()=>[g.value?(n(),f(i(Fe),{key:0,value:g.value,type:`warning`},null,8,[`value`])):x(``,!0)]),actions:y(()=>[c(i(ie),{value:C.value,"onUpdate:value":t[0]||=e=>C.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),o.staff?x(``,!0):(n(),f(i(K),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:t[1]||=e=>O.value=!0},{icon:y(()=>[c(i(pe),{size:15})]),default:y(()=>[t[10]||=p(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),a(`div`,at,[a(`div`,ot,[b.value&&!h.value.length?(n(),r(`div`,st,[(n(),r(E,null,w(4,e=>c(i(ue),{key:e,height:`58px`,sharp:!1})),64))])):F.value&&!h.value.length?(n(),r(`div`,ct,[c(Se,{code:`ERR / NO LOAD`,title:`工单没读到`,hint:`多半是网络没跟上`},{icon:y(()=>[c(i(de),{size:28})]),_:1}),c(i(K),{size:`small`,onClick:t[2]||=e=>I()},{default:y(()=>[...t[11]||=[p(`重试`,-1)]]),_:1})])):h.value.length?(n(),f(P,{key:3,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:y(()=>[(n(!0),r(E,null,w(h.value,e=>(n(),r(`li`,{key:e.id},[a(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:l({borderColor:`var(--border)`,backgroundColor:T.value===e.id?`var(--muted)`:`transparent`}),"aria-current":T.value===e.id?`true`:void 0,onClick:t=>L(e)},[a(`div`,dt,[a(`span`,ft,d(e.subject),1),e.unread?(n(),f(i(Fe),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(n(),r(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:l({color:e.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},d(i(be)[e.status]),5))]),a(`p`,pt,d(e.last_body),1),a(`p`,mt,[p(` 工单 `+d(e.id)+` `,1),o.staff&&e.owner_nickname?(n(),r(E,{key:0},[p(` · `+d(e.owner_nickname),1)],64)):x(``,!0),p(` · `+d(i(xe)(e.update_time))+` · `+d(e.msg_count)+` 条 `,1)])],12,ut)]))),128))]),_:1})):(n(),r(`div`,lt,[c(Se,{code:`00 / NO TICKET`,title:o.staff?`无工单`:`尚未提交工单`,hint:o.staff?`学生提交后在此列示`:`打印相关问题 · 新建工单提交`},{icon:y(()=>[c(i(de),{size:28})]),_:1},8,[`title`,`hint`])]))]),a(`div`,ht,[M.value?(n(),f(rt,{key:M.value.id,"ticket-id":M.value.id,staff:o.staff,"current-user-id":o.currentUserId,onChanged:t[3]||=e=>I(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(n(),r(`div`,gt,[c(Se,{code:`00 / NO TICKET`,title:`从左侧选择工单`,hint:`窄屏以抽屉打开`},{icon:y(()=>[c(i(He),{size:28})]),_:1})]))])]),c(i(ce),{show:D.value,"onUpdate:show":t[5]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:y(()=>[c(i(le),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:y(()=>[a(`div`,_t,[M.value?(n(),f(rt,{key:M.value.id,"ticket-id":M.value.id,staff:o.staff,"current-user-id":o.currentUserId,onChanged:t[4]||=e=>I(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):x(``,!0)])]),_:1})]),_:1},8,[`show`]),c(i(ye),{show:O.value,"onUpdate:show":t[9]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:y(()=>[a(`div`,vt,[c(i(K),{quaternary:``,onClick:t[8]||=e=>O.value=!1},{default:y(()=>[...t[12]||=[p(`取消`,-1)]]),_:1}),c(i(K),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:R},{default:y(()=>[...t[13]||=[p(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:y(()=>[c(i(oe),{label:`标题`,"show-feedback":!1},{default:y(()=>[c(i(se),{value:A.subject,"onUpdate:value":t[6]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),c(i(oe),{label:`详细描述`,"show-feedback":!1},{default:y(()=>[c(i(se),{value:A.body,"onUpdate:value":t[7]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清单号、遇到的问题与期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{yt as t};