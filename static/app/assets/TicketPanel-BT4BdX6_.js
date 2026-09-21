import{Dt as e,Ft as t,G as n,Gt as r,H as i,Ht as a,K as o,L as s,Lt as c,Q as l,Tt as u,U as d,W as f,X as p,Z as m,an as h,dt as g,gt as _,lt as v,m as y,mt as b,on as x,ot as S,p as C,sn as w,wt as T,yt as E}from"./endpoints-BhTSb8lj.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as ee,k as B,n as V,nn as H,nt as U,o as W,on as te,rn as G,s as ne,sn as re,st as K,t as q,u as J,ut as ie,v as ae,x as oe}from"./createLucideIcon-Byg0Q1WZ.js";import{t as Y}from"./Input-s9ucmaPU.js";import{a as se}from"./Scrollbar-Cxvob6a1.js";import{o as ce,t as le}from"./Select-uWQKAIkq.js";import{r as ue}from"./cssr-4WsKwsZW.js";import{t as X}from"./FormItem-Bv3F220E.js";import{n as de,t as fe}from"./DrawerContent-C-YWNOyT.js";import{t as pe}from"./Skeleton-DLWzDi2d.js";import{t as me}from"./inbox-2Tp6LWrv.js";import{t as he}from"./lock-Hj_nIl3Q.js";import{t as ge}from"./plus-CalSsAlO.js";import{t as _e}from"./send-DsOOnxQS.js";import{C as ve,S as Z,U as ye,v as be}from"./index-6bqWpmDa.js";import{c as xe,y as Se}from"./format-1rjnJmsR.js";import{t as Ce}from"./EmptyState-C1GYtP_X.js";import{t as we}from"./PageHeader-B53776a2.js";import{r as Te,t as Ee}from"./dist-CQGle1_3.js";var De=l({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=c(null),n=c(e.value),r=c(e.value),s=c(`up`),l=c(!1),u=i(()=>l.value?`${e.clsPrefix}-base-slot-machine-current-number--${s.value}-scroll`:null),f=i(()=>l.value?`${e.clsPrefix}-base-slot-machine-old-number--${s.value}-scroll`:null);T(a(e,`value`),(e,t)=>{n.value=t,r.value=e,S(p)});function p(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?m(`up`):n>t&&m(`down`))}function m(e){s.value=e,l.value=!1,S(()=>{t.value?.offsetWidth,l.value=!0})}return()=>{let{clsPrefix:i}=e;return b(),o(`span`,{ref:t,class:z(`${i}-base-slot-machine-number`)},[n.value===null?K(()=>null):(b(),o(`span`,{key:0,class:z([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,f.value])},[K(()=>n.value)],2)),d(`span`,{class:z([`${i}-base-slot-machine-current-number`,u.value])},[d(`span`,{ref:`numberWrapper`,class:z([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[K(()=>r.value)],2)],2),n.value===null?K(()=>null):(b(),o(`span`,{key:2,class:z([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,f.value])},[K(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=ie;function Oe({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
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
 `)])])])])]),Ae=l({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){F(`-base-slot-machine`,ke,a(e,`clsPrefix`));let t=c(),n=c(),r=i(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return T(a(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:i,clsPrefix:a}=e;return typeof i==`number`?(b(),o(`span`,{key:1,class:z(`${a}-base-slot-machine`)},[m(G,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>r.value.map((e,i)=>(b(),f(De,{clsPrefix:a,key:r.value.length-i-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),m(R,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<i?(b(),f(De,{key:2,clsPrefix:a,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(b(),o(`span`,{key:3,class:z(`${a}-base-slot-machine`)},[K(()=>i)],2))}}});function je(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Me={name:`Badge`,common:ee,self:je},Ne=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
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
 `)])])]),Pe=[`title`],Fe={...B.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Ie=l({name:`Badge`,props:Fe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:a}=L(e),o=B(`Badge`,`-badge`,Ne,Me,e,n),s=c(!1),l=()=>{s.value=!0},u=()=>{s.value=!1},d=i(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!P(t.value)));g(()=>{d.value&&(s.value=!0)});let f=ae(`Badge`,a,n),p=i(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,t)]:a,fontFamily:s,fontSize:c}}=o.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),m=r?D(`badge`,i(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=N(r)),t}),p,e):void 0,h=i(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:n,appeared:s,showBadge:d,handleAfterEnter:l,handleAfterLeave:u,cssVars:r?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return b(),o(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:x(this.cssVars)},[K(()=>i),(b(),f(H,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(b(),o(`sup`,{key:1,class:z(`${e}-badge-sup`),title:ce(this.value),style:x(this.offsetStyle)},[K(()=>oe(r.value,()=>[this.dot?null:(b(),f(Ae,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(b(),f(W,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):K(()=>null)],14,Pe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Le=O([O(`@keyframes spin-rotate`,`
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
 `)])]),Re={small:20,medium:18,large:16},ze={...B.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Be=l({name:`Spin`,props:ze,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=L(e),r=B(`Spin`,`-spin`,Le,be,e,t),a=i(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?U(t):i[M(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=n?D(`spin`,i(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),a,e):void 0,s=ue(e,[`spinning`,`show`]),l=c(!1);return u(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=s.value}),{mergedClsPrefix:t,active:l,mergedStrokeWidth:i(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Re[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,i=(n||e.description)&&(b(),o(`div`,{class:z(`${t}-spin-description`)},[K(()=>n||e.description?.())],2)),a=e.icon?(b(),o(`div`,{key:1,class:z([`${t}-spin-body`,this.themeClass])},[d(`div`,{class:z([`${t}-spin`,r&&`${t}-spin--rotate`]),style:x(e.default?``:this.cssVars)},[K(()=>e.icon())],6),K(()=>i)],2)):(b(),o(`div`,{key:2,class:z([`${t}-spin-body`,this.themeClass])},[(b(),f(J,{clsPrefix:t,style:x(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),K(()=>i)],2));return this.onRender?.(),e.default?(b(),o(`div`,{key:3,class:z([`${t}-spin-container`,this.themeClass]),style:x(this.cssVars)},[d(`div`,{class:z([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:x(this.contentStyle)},[K(()=>e.default?.())],6),m(H,{name:`fade-in-transition`},{default:()=>this.active?a:null},1024)],6)):a}}),Ve=q({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),He=q({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),Ue={class:`flex h-full flex-col`},We={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ge={class:`min-w-0`},Ke={class:`truncate font-heading text-base font-bold`},qe={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Je={class:`max-w-[86%]`},Ye={class:`font-semibold`},Xe={class:`tnum`},Ze={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Qe={class:`mt-2 flex items-center justify-between gap-3`},$e={class:`tnum text-2xs text-ink-3`},et=3e3,$=8e3,tt=15e3,nt=l({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(t,{emit:a}){let l=t,u=a,D=Z(),O=c(null),k=c(!1),A=c(``),j=c(!1),M=c(null),N=c(0),P=c($),F=i(()=>O.value?.messages??[]),I=i(()=>O.value?.ticket??null),L=i(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await S();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function ee(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function B(){k.value=!0;try{O.value=await C.detail(l.ticketId),N.value=O.value.last_id??0,u(`changed`)}catch(e){D.error(e instanceof y?e.message:`加载工单失败`)}finally{k.value=!1}}let H=!1;async function U(){if(!H&&O.value){H=!0;try{let e=await C.messagesSince(l.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();O.value.messages.push(...n),P.value=et,e&&!A.value.trim()&&await z(!0),u(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,u(`changed`))}catch{P.value=tt}finally{H=!1}}}async function W(){let e=A.value.trim();if(e){j.value=!0;try{await C.reply(l.ticketId,e),A.value=``,await B(),await z(!0),P.value=et}catch(e){D.error(e instanceof y?e.message:`发送失败`)}finally{j.value=!1}}}async function ne(){try{await C.setStatus(l.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重新打开`:`工单已关闭`),await B()}catch(e){D.error(e instanceof y?e.message:`操作失败`)}}let K=Ee(),{pause:q,resume:J}=Te(()=>void U(),P,{immediate:!1});return T(K,e=>{e===`visible`?(U(),J()):q()}),g(async()=>{await B(),J(),await z(!1)}),T(()=>l.ticketId,async()=>{N.value=0,P.value=$,await B(),await z(!1),J()}),v(q),(i,a)=>(b(),o(`div`,Ue,[d(`header`,We,[d(`div`,Ge,[d(`h3`,Ke,w(I.value?.subject??`读取中`),1),d(`p`,qe,[p(` #`+w(t.ticketId)+` `,1),t.staff&&I.value?(b(),o(s,{key:0},[p(` · 提交人 `+w(I.value.owner_nickname),1)],64)):n(``,!0),I.value?(b(),o(s,{key:1},[p(` · `+w(r(xe)[I.value.status]),1)],64)):n(``,!0)])]),I.value?(b(),f(r(V),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:ne},{icon:e(()=>[(b(),f(E(L.value?r(He):r(he)),{size:14}))]),default:e(()=>[p(` `+w(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):n(``,!0)]),d(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[m(r(Be),{show:k.value&&!F.value.length},{default:e(()=>[m(G,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:e(()=>[(b(!0),o(s,null,_(F.value,e=>(b(),o(`li`,{key:e.id,class:h([`flex`,e.sender_id===t.currentUserId?`justify-end`:`justify-start`])},[d(`div`,Je,[d(`div`,{class:h([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===t.currentUserId?`justify-end`:``])},[d(`span`,Ye,w(e.sender_nickname??`（已注销）`),1),d(`span`,Xe,w(e.create_time?.slice(5,16)??``),1)],2),d(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:x(e.sender_id===t.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},w(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),d(`footer`,Ze,[m(r(Y),{value:A.value,"onUpdate:value":a[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:te(re(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),d(`div`,Qe,[d(`span`,$e,w(A.value.length)+` / 1000`,1),m(r(V),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:W},{icon:e(()=>[m(r(_e),{size:14})]),default:e(()=>[a[1]||=p(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-sm font-semibold`},dt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=l({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(a){let l=Z(),u=c([]),h=c(0),v=c(!0),S=c(`all`),E=c(null),D=c(!1),O=c(!1),k=c(!1),A=t({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=i(()=>u.value.find(e=>e.id===E.value)??null);async function N(e=!1){e||(v.value=!0);try{let e=await C.list(S.value===`all`?void 0:S.value);u.value=e.tickets,h.value=e.unread_total,E.value&&!u.value.some(e=>e.id===E.value)&&(E.value=null)}catch(t){e||l.error(t instanceof y?t.message:`加载工单失败`)}finally{v.value=!1}}function P(e){E.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function F(){if(!A.subject.trim()||!A.body.trim()){l.warning(`标题和描述都要填`);return}k.value=!0;try{let e=await C.create(A.subject.trim(),A.body.trim());l.success(`工单已提交 · 等待回复`),O.value=!1,A.subject=``,A.body=``,await N(),E.value=e.id}catch(e){l.error(e instanceof y?e.message:`提交失败`)}finally{k.value=!1}}let I=Ee(),{pause:L,resume:R}=Te(()=>void N(!0),3e4,{immediate:!1});return T(I,e=>e===`visible`?(R(),void N(!0)):L()),T(S,()=>void N()),g(async()=>{await N(),R()}),(t,i)=>(b(),o(`div`,rt,[m(we,{heading:`md`,title:a.staff?`工单处理`:`问题反馈`,subtitle:a.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`},{"title-append":e(()=>[h.value?(b(),f(r(Ie),{key:0,value:h.value,type:`warning`},null,8,[`value`])):n(``,!0)]),actions:e(()=>[m(r(le),{value:S.value,"onUpdate:value":i[0]||=e=>S.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),a.staff?n(``,!0):(b(),f(r(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:i[1]||=e=>O.value=!0},{icon:e(()=>[m(r(ge),{size:15})]),default:e(()=>[i[9]||=p(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),d(`div`,it,[d(`div`,at,[v.value&&!u.value.length?(b(),o(`div`,ot,[(b(),o(s,null,_(4,e=>m(r(pe),{key:e,height:`58px`,sharp:!1})),64))])):u.value.length?(b(),f(G,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:e(()=>[(b(!0),o(s,null,_(u.value,e=>(b(),o(`li`,{key:e.id},[d(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:x({borderColor:`var(--border)`,backgroundColor:E.value===e.id?`var(--muted)`:`transparent`}),"aria-current":E.value===e.id?`true`:void 0,onClick:t=>P(e)},[d(`div`,lt,[d(`span`,ut,w(e.subject),1),e.unread?(b(),f(r(Ie),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(b(),o(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:x({color:e.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},w(r(xe)[e.status]),5))]),d(`p`,dt,w(e.last_body),1),d(`p`,ft,[p(` #`+w(e.id)+` `,1),a.staff&&e.owner_nickname?(b(),o(s,{key:0},[p(` · `+w(e.owner_nickname),1)],64)):n(``,!0),p(` · `+w(r(Se)(e.update_time))+` · `+w(e.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(b(),o(`div`,st,[m(Ce,{code:`00 / NO TICKET`,title:a.staff?`无工单`:`还没有工单`,hint:a.staff?`学生提交后会自动出现在这里`:`有打印相关的问题，点右上角新建`},{icon:e(()=>[m(r(me),{size:28})]),_:1},8,[`title`,`hint`])]))]),d(`div`,pt,[M.value?(b(),f(nt,{key:M.value.id,"ticket-id":M.value.id,staff:a.staff,"current-user-id":a.currentUserId,onChanged:i[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(b(),o(`div`,mt,[m(Ce,{code:`00 / NO TICKET`,title:`从左侧选一个工单查看详情`,hint:`窄屏会以抽屉形式打开`},{icon:e(()=>[m(r(Ve),{size:28})]),_:1})]))])]),m(r(de),{show:D.value,"onUpdate:show":i[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:e(()=>[m(r(fe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:e(()=>[d(`div`,ht,[M.value?(b(),f(nt,{key:M.value.id,"ticket-id":M.value.id,staff:a.staff,"current-user-id":a.currentUserId,onChanged:i[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):n(``,!0)])]),_:1})]),_:1},8,[`show`]),m(r(ve),{show:O.value,"onUpdate:show":i[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:e(()=>[d(`div`,gt,[m(r(V),{quaternary:``,onClick:i[7]||=e=>O.value=!1},{default:e(()=>[...i[10]||=[p(`取消`,-1)]]),_:1}),m(r(V),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:F},{default:e(()=>[...i[11]||=[p(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:e(()=>[m(r(X),{label:`标题`,"show-feedback":!1},{default:e(()=>[m(r(Y),{value:A.subject,"onUpdate:value":i[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),m(r(X),{label:`详细描述`,"show-feedback":!1},{default:e(()=>[m(r(Y),{value:A.body,"onUpdate:value":i[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清订单号、遇到的问题、期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};