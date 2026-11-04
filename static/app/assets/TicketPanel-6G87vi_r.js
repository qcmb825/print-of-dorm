import{At as e,Bt as t,H as n,Ht as r,J as i,Mt as a,X as o,Xt as s,Y as c,Z as l,dn as u,dt as d,fn as f,gt as p,kt as m,mt as h,nt as g,q as _,qt as v,rt as y,tt as b,un as x,v as S,wt as C,xt as w,y as T,yt as E}from"./endpoints-kLXNUVGT.js";import{$t as D,C as O,D as k,E as A,F as j,I as M,L as N,S as P,Xt as F,Zt as I,_ as L,_t as R,c as z,cn as B,dn as V,en as H,f as U,fn as ee,ft as W,g as G,ht as K,l as q,lt as J,nn as Y,p as X,pt as Z,sn as te,st as ne,w as re}from"./motion-CI5wB-09.js";import{t as ie}from"./Input-C-Ld-5pg.js";import{s as ae,t as oe}from"./Select-LIOs8Onr.js";import{r as se}from"./cssr-CUQkeDfL.js";import{t as ce}from"./FormItem-CdFciJia.js";import{n as le,t as ue}from"./DrawerContent-DBenSEVh.js";import{t as de}from"./Skeleton-CEMcS5Up.js";import{t as fe}from"./inbox-BWBv5rPQ.js";import{t as pe}from"./lock-DEKfutO3.js";import{t as me}from"./plus-C5Yb_Mts.js";import{t as he}from"./send-BbSWJOdG.js";import{R as ge,f as _e,p as ve,y as ye}from"./index-DJq1mBng.js";import{s as be,y as xe}from"./format-DaAKFgUZ.js";import{t as Se}from"./EmptyState-f7t6xDww.js";import{t as Ce}from"./PageHeader-CID3wiAf.js";import{r as we,t as Te}from"./dist-CmnQA1CA.js";var Ee=y({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=r(null),n=r(e.value),a=r(e.value),o=r(`up`),s=r(!1),c=_(()=>s.value?`${e.clsPrefix}-base-slot-machine-current-number--${o.value}-scroll`:null),u=_(()=>s.value?`${e.clsPrefix}-base-slot-machine-old-number--${o.value}-scroll`:null);m(v(e,`value`),(e,t)=>{n.value=t,a.value=e,d(f)});function f(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?p(`up`):n>t&&p(`down`))}function p(e){o.value=e,s.value=!1,d(()=>{t.value?.offsetWidth,s.value=!0})}return()=>{let{clsPrefix:r}=e;return E(),l(`span`,{ref:t,class:J(`${r}-base-slot-machine-number`)},[n.value===null?W(()=>null):(E(),l(`span`,{key:0,class:J([`${r}-base-slot-machine-old-number ${r}-base-slot-machine-old-number--top`,u.value])},[W(()=>n.value)],2)),i(`span`,{class:J([`${r}-base-slot-machine-current-number`,c.value])},[i(`span`,{ref:`numberWrapper`,class:J([`${r}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${r}-base-slot-machine-current-number__inner--not-number`])},[W(()=>a.value)],2)],2),n.value===null?W(()=>null):(E(),l(`span`,{key:2,class:J([`${r}-base-slot-machine-old-number ${r}-base-slot-machine-old-number--bottom`,u.value])},[W(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=K;function De({duration:e=`.2s`}={}){return[F(`&.fade-up-width-expand-transition-leave-active`,{transition:`
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
 `)])])])])]),ke=y({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){Z(`-base-slot-machine`,Oe,v(e,`clsPrefix`));let t=r(),n=r(),i=_(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return m(v(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:r,clsPrefix:a}=e;return typeof r==`number`?(E(),l(`span`,{key:1,class:J(`${a}-base-slot-machine`)},[g(B,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>i.value.map((e,r)=>(E(),c(Ee,{clsPrefix:a,key:i.value.length-r-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),g(P,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<r?(E(),c(Ee,{key:2,clsPrefix:a,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(E(),l(`span`,{key:3,class:J(`${a}-base-slot-machine`)},[W(()=>r)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:N,self:Ae},Me=F([F(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),I(`badge`,`
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
 `)])])]),Ne=[`title`],Pe={...j.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=y({name:`Badge`,props:Pe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedRtlRef:a}=R(e),o=j(`Badge`,`-badge`,Me,je,e,n),s=r(!1),c=()=>{s.value=!0},l=()=>{s.value=!1},u=_(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!A(t.value)));p(()=>{u.value&&(s.value=!0)});let d=re(`Badge`,a,n),f=_(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[Y(`color`,t)]:a,fontFamily:s,fontSize:c}}=o.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),m=i?M(`badge`,_(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=O(r)),t}),f,e):void 0,h=_(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${d?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:d,mergedClsPrefix:n,appeared:s,showBadge:u,handleAfterEnter:c,handleAfterLeave:l,cssVars:i?void 0:f,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return E(),l(`div`,{class:J([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:u(this.cssVars)},[W(()=>i),(E(),c(te,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(E(),l(`sup`,{key:1,class:J(`${e}-badge-sup`),title:ae(this.value),style:u(this.offsetStyle)},[W(()=>k(r.value,()=>[this.dot?null:(E(),c(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(E(),c(U,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):W(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}});function Ie(e){let{opacityDisabled:t,heightTiny:n,heightSmall:r,heightMedium:i,heightLarge:a,heightHuge:o,primaryColor:s,fontSize:c}=e;return{fontSize:c,textColor:s,sizeTiny:n,sizeSmall:r,sizeMedium:i,sizeLarge:a,sizeHuge:o,color:s,opacitySpinning:t}}var Le={name:`Spin`,common:N,self:Ie},Re=F([F(`@keyframes spin-rotate`,`
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
 `)])]),ze={small:20,medium:18,large:16},Be={...j.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...L,strokeWidth:Number},Ve=y({name:`Spin`,props:Be,slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:i}=R(t),a=j(`Spin`,`-spin`,Re,Le,t,n),o=_(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=a.value,{opacitySpinning:i,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":i,"--n-size":typeof e==`number`?ne(e):r[Y(`size`,e)],"--n-color":o,"--n-text-color":s}}),s=i?M(`spin`,_(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),o,t):void 0,c=se(t,[`spinning`,`show`]),l=r(!1);return e(e=>{let n;if(c.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{l.value=!0},r),e(()=>{clearTimeout(n)});return}}l.value=c.value}),{mergedClsPrefix:n,active:l,mergedStrokeWidth:_(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return ze[typeof n==`number`?`medium`:n]}),cssVars:i?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,a=(n||e.description)&&(E(),l(`div`,{class:J(`${t}-spin-description`)},[W(()=>n||e.description?.())],2)),o=e.icon?(E(),l(`div`,{key:1,class:J([`${t}-spin-body`,this.themeClass])},[i(`div`,{class:J([`${t}-spin`,r&&`${t}-spin--rotate`]),style:u(e.default?``:this.cssVars)},[W(()=>e.icon())],6),W(()=>a)],2)):(E(),l(`div`,{key:2,class:J([`${t}-spin-body`,this.themeClass])},[(E(),c(G,{clsPrefix:t,style:u(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:J(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),W(()=>a)],2));return this.onRender?.(),e.default?(E(),l(`div`,{key:3,class:J([`${t}-spin-container`,this.themeClass]),style:u(this.cssVars)},[i(`div`,{class:J([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:u(this.contentStyle)},[W(()=>e.default?.())],6),g(te,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),He=z({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ue=z({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),We={class:`flex h-full flex-col`},Ge={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ke={class:`min-w-0`},qe={class:`truncate font-heading text-base font-bold`},Je={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ye={class:`max-w-[86%]`},Xe={class:`font-semibold`},Ze={class:`tnum`},Qe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},$e={class:`mt-2 flex items-center justify-between gap-3`},et={class:`tnum text-2xs text-ink-3`},tt=3e3,$=8e3,nt=15e3,rt=y({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:t}){let v=e,y=t,D=_e(),O=r(null),k=r(!1),A=r(``),j=r(!1),M=r(null),N=r(0),P=r($),F=_(()=>O.value?.messages??[]),I=_(()=>O.value?.ticket??null),L=_(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await d();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function H(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function U(){k.value=!0;try{O.value=await S.detail(v.ticketId),N.value=O.value.last_id??0,y(`changed`)}catch(e){D.error(e instanceof T?e.message:`工单读取失败`)}finally{k.value=!1}}let W=!1;async function G(){if(!W&&O.value){W=!0;try{let e=await S.messagesSince(v.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=H();O.value.messages.push(...n),P.value=tt,e&&!A.value.trim()&&await z(!0),y(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),nt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,y(`changed`))}catch{P.value=nt}finally{W=!1}}}async function K(){let e=A.value.trim();if(e){j.value=!0;try{await S.reply(v.ticketId,e),A.value=``,await U(),await z(!0),P.value=tt}catch(e){D.error(e instanceof T?e.message:`发送未完成 · 稍后重试`)}finally{j.value=!1}}}async function J(){try{await S.setStatus(v.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重开`:`工单已关闭`),await U()}catch(e){D.error(e instanceof T?e.message:`工单状态未变更 · 稍后重试`)}}let Y=Te(),{pause:X,resume:Z}=we(()=>void G(),P,{immediate:!1});return m(Y,e=>{e===`visible`?(G(),Z()):X()}),p(async()=>{await U(),Z(),await z(!1)}),m(()=>v.ticketId,async()=>{N.value=0,P.value=$,await U(),await z(!1),Z()}),h(X),(t,r)=>(E(),l(`div`,We,[i(`header`,Ge,[i(`div`,Ke,[i(`h3`,qe,f(I.value?.subject??`读取中`),1),i(`p`,Je,[b(` 工单 `+f(e.ticketId)+` `,1),e.staff&&I.value?(E(),l(n,{key:0},[b(` · 提交人 `+f(I.value.owner_nickname),1)],64)):o(``,!0),I.value?(E(),l(n,{key:1},[b(` · `+f(s(be)[I.value.status]),1)],64)):o(``,!0)])]),I.value?(E(),c(s(q),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:J},{icon:a(()=>[(E(),c(C(L.value?s(Ue):s(pe)),{size:14}))]),default:a(()=>[b(` `+f(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):o(``,!0)]),i(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[g(s(Ve),{show:k.value&&!F.value.length},{default:a(()=>[g(B,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:a(()=>[(E(!0),l(n,null,w(F.value,t=>(E(),l(`li`,{key:t.id,class:x([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[i(`div`,Ye,[i(`div`,{class:x([`mb-1 flex items-center gap-2 text-xs text-ink-3`,t.sender_id===e.currentUserId?`justify-end`:``])},[i(`span`,Xe,f(t.sender_nickname??`（已注销）`),1),i(`span`,Ze,f(t.create_time?.slice(5,16)??``),1)],2),i(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:u(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},f(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),i(`footer`,Qe,[g(s(ie),{value:A.value,"onUpdate:value":r[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:V(ee(K,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),i(`div`,$e,[i(`span`,et,f(A.value.length)+` / 1000`,1),g(s(q),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:K},{icon:a(()=>[g(s(he),{size:14})]),default:a(()=>[r[1]||=b(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),it={class:`mx-auto max-w-6xl`},at={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ot={class:`panel overflow-hidden`},st={key:0,class:`flex flex-col gap-2 p-3`},ct={key:1,class:`grid place-items-center gap-3 py-12`},lt={key:2,class:`grid place-items-center py-12`},ut=[`aria-current`,`onClick`],dt={class:`flex items-start justify-between gap-2`},ft={class:`min-w-0 flex-1 truncate text-sm font-semibold`},pt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},mt={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},ht={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},gt={key:1,class:`grid h-full place-items-center py-16`},_t={class:`h-[82vh]`},vt={class:`flex justify-end gap-2`},yt=y({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let d=_e(),h=r([]),v=r(0),y=r(!0),x=r(`all`),C=r(null),D=r(!1),O=r(!1),k=r(!1),A=t({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=_(()=>h.value.find(e=>e.id===C.value)??null),N=0,P=r(!1);async function F(e=!1){let t=++N;e||(y.value=!0);try{let e=await S.list(x.value===`all`?void 0:x.value);if(t!==N)return;h.value=e.tickets,v.value=e.unread_total,P.value=!1,C.value&&!h.value.some(e=>e.id===C.value)&&(C.value=null)}catch(n){!e&&t===N&&d.error(n instanceof T?n.message:`工单读取失败`),P.value=!0}finally{t===N&&(y.value=!1)}}function I(e){C.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function L(){if(!A.subject.trim()||!A.body.trim()){d.warning(`标题与描述为必填`);return}k.value=!0;try{let e=await S.create(A.subject.trim(),A.body.trim());d.success(`工单已提交 · 待回复`),O.value=!1,A.subject=``,A.body=``,await F(),C.value=e.id}catch(e){d.error(e instanceof T?e.message:`提交未完成 · 稍后重试`)}finally{k.value=!1}}let R=Te(),{pause:z,resume:V}=we(()=>void F(!0),3e4,{immediate:!1});return m(R,e=>e===`visible`?(V(),void F(!0)):z()),m(x,()=>void F()),p(async()=>{await F(),R.value===`visible`&&V()}),(t,r)=>(E(),l(`div`,it,[g(Ce,{heading:`md`,title:e.staff?`工单处理`:`问题反馈`,subtitle:e.staff?`学生提交的问题与需求 · 回复后对方收到未读提示`:`打印相关问题 · 在此留言给管理员`},{"title-append":a(()=>[v.value?(E(),c(s(Fe),{key:0,value:v.value,type:`warning`},null,8,[`value`])):o(``,!0)]),actions:a(()=>[g(s(oe),{value:x.value,"onUpdate:value":r[0]||=e=>x.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?o(``,!0):(E(),c(s(q),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:r[1]||=e=>O.value=!0},{icon:a(()=>[g(s(me),{size:15})]),default:a(()=>[r[10]||=b(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),i(`div`,at,[i(`div`,ot,[y.value&&!h.value.length?(E(),l(`div`,st,[(E(),l(n,null,w(4,e=>g(s(de),{key:e,height:`58px`,sharp:!1})),64))])):P.value&&!h.value.length?(E(),l(`div`,ct,[g(Se,{code:`ERR / NO LOAD`,title:`工单没读到`,hint:`多半是网络没跟上`},{icon:a(()=>[g(s(fe),{size:28})]),_:1}),g(s(q),{size:`small`,onClick:r[2]||=e=>F()},{default:a(()=>[...r[11]||=[b(`重试`,-1)]]),_:1})])):h.value.length?(E(),c(B,{key:3,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:a(()=>[(E(!0),l(n,null,w(h.value,t=>(E(),l(`li`,{key:t.id},[i(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:u({borderColor:`var(--border)`,backgroundColor:C.value===t.id?`var(--muted)`:`transparent`}),"aria-current":C.value===t.id?`true`:void 0,onClick:e=>I(t)},[i(`div`,dt,[i(`span`,ft,f(t.subject),1),t.unread?(E(),c(s(Fe),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(E(),l(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:u({color:t.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},f(s(be)[t.status]),5))]),i(`p`,pt,f(t.last_body),1),i(`p`,mt,[b(` 工单 `+f(t.id)+` `,1),e.staff&&t.owner_nickname?(E(),l(n,{key:0},[b(` · `+f(t.owner_nickname),1)],64)):o(``,!0),b(` · `+f(s(xe)(t.update_time))+` · `+f(t.msg_count)+` 条 `,1)])],12,ut)]))),128))]),_:1})):(E(),l(`div`,lt,[g(Se,{code:`00 / NO TICKET`,title:e.staff?`无工单`:`尚未提交工单`,hint:e.staff?`学生提交后在此列示`:`打印相关问题 · 新建工单提交`},{icon:a(()=>[g(s(fe),{size:28})]),_:1},8,[`title`,`hint`])]))]),i(`div`,ht,[M.value?(E(),c(rt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:r[3]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(E(),l(`div`,gt,[g(Se,{code:`00 / NO TICKET`,title:`从左侧选择工单`,hint:`窄屏以抽屉打开`},{icon:a(()=>[g(s(He),{size:28})]),_:1})]))])]),g(s(le),{show:D.value,"onUpdate:show":r[5]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:a(()=>[g(s(ue),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:a(()=>[i(`div`,_t,[M.value?(E(),c(rt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:r[4]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):o(``,!0)])]),_:1})]),_:1},8,[`show`]),g(s(ve),{show:O.value,"onUpdate:show":r[9]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:a(()=>[i(`div`,vt,[g(s(q),{quaternary:``,onClick:r[8]||=e=>O.value=!1},{default:a(()=>[...r[12]||=[b(`取消`,-1)]]),_:1}),g(s(q),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:L},{default:a(()=>[...r[13]||=[b(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:a(()=>[g(s(ce),{label:`标题`,"show-feedback":!1},{default:a(()=>[g(s(ie),{value:A.subject,"onUpdate:value":r[6]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),g(s(ce),{label:`详细描述`,"show-feedback":!1},{default:a(()=>[g(s(ie),{value:A.body,"onUpdate:value":r[7]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清单号、遇到的问题与期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{yt as t};