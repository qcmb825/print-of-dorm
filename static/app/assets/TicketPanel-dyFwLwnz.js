import{B as e,H as t,Ht as n,J as r,Mt as i,O as a,P as o,Pt as s,St as c,U as l,V as u,Y as d,ct as f,d as p,dt as m,f as h,gt as g,in as _,nn as v,ot as y,pt as b,q as x,rn as S,rt as C,wt as w,xt as T,z as E,zt as D}from"./endpoints-C3DHQTsP.js";import{$t as O,A as k,Jt as A,N as j,Xt as M,Zt as N,_ as P,a as F,an as I,b as L,cn as ee,ft as R,g as z,h as B,in as V,it as H,k as U,l as W,ln as te,lt as G,mt as K,o as q,ot as J,qt as Y,t as X,u as ne,ut as re,y as ie}from"./Button-Z2R18gr3.js";import{t as ae}from"./Empty-QR24Z1Aa.js";import{a as oe}from"./Scrollbar-BGGh9xj6.js";import{r as se}from"./cssr-HeYm7atP.js";import{a as ce,t as le}from"./Select-CpgGoaX_.js";import{t as ue}from"./FormItem-BcLVR_sY.js";import{t as Z}from"./Input-D3Q3RyKg.js";import{n as de,t as fe}from"./DrawerContent-sNhmRZtn.js";import{t as pe}from"./Skeleton-CBiD6sMD.js";import{L as me,m as he,v as ge,y as _e}from"./index-BUbOvEe1.js";import{t as ve}from"./createLucideIcon-BoaTMI8Y.js";import{t as ye}from"./inbox-LXTs3hbv.js";import{t as be}from"./lock-Bb7ubSn7.js";import{t as xe}from"./plus-BtMKabOO.js";import{t as Se}from"./send-_7aAMNuU.js";import{c as Ce,y as we}from"./format-DMiwIsNr.js";import{r as Te,t as Ee}from"./dist-ZIudcFNW.js";var De=d({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(t){let n=s(null),r=s(t.value),i=s(t.value),a=s(`up`),o=s(!1),c=E(()=>o.value?`${t.clsPrefix}-base-slot-machine-current-number--${a.value}-scroll`:null),u=E(()=>o.value?`${t.clsPrefix}-base-slot-machine-old-number--${a.value}-scroll`:null);T(D(t,`value`),(e,t)=>{r.value=t,i.value=e,C(d)});function d(){let e=t.newOriginalNumber,n=t.oldOriginalNumber;n!==void 0&&e!==void 0&&(e>n?f(`up`):n>e&&f(`down`))}function f(e){a.value=e,o.value=!1,C(()=>{n.value?.offsetWidth,o.value=!0})}return()=>{let{clsPrefix:a}=t;return m(),l(`span`,{ref:n,class:J(`${a}-base-slot-machine-number`)},[r.value===null?G(()=>null):(m(),l(`span`,{key:0,class:J([`${a}-base-slot-machine-old-number ${a}-base-slot-machine-old-number--top`,u.value])},[G(()=>r.value)],2)),e(`span`,{class:J([`${a}-base-slot-machine-current-number`,c.value])},[e(`span`,{ref:`numberWrapper`,class:J([`${a}-base-slot-machine-current-number__inner`,typeof t.value!=`number`&&`${a}-base-slot-machine-current-number__inner--not-number`])},[G(()=>i.value)],2)],2),r.value===null?G(()=>null):(m(),l(`span`,{key:2,class:J([`${a}-base-slot-machine-old-number ${a}-base-slot-machine-old-number--bottom`,u.value])},[G(()=>r.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=R;function Oe({duration:e=`.2s`}={}){return[Y(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),Y(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),Y(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),Y(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),Y(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),Y(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var ke=Y([Y(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),Y(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),Y(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),Y(`@keyframes n-base-slot-machine-fade-down-out`,`
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
 `,[Oe({duration:`.2s`}),q({duration:`.2s`,delay:`0s`}),A(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[N(`top`,{transform:`translateY(-100%)`}),N(`bottom`,{transform:`translateY(100%)`}),N(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),N(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),A(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[N(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),N(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),M(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[N(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),Ae=d({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){re(`-base-slot-machine`,ke,D(e,`clsPrefix`));let t=s(),n=s(),i=E(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return T(D(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:a,clsPrefix:o}=e;return typeof a==`number`?(m(),l(`span`,{key:1,class:J(`${o}-base-slot-machine`)},[r(I,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>i.value.map((e,r)=>(m(),u(De,{clsPrefix:o,key:i.value.length-r-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),r(B,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<a?(m(),u(De,{key:2,clsPrefix:o,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(m(),l(`span`,{key:3,class:J(`${o}-base-slot-machine`)},[G(()=>a)],2))}}});function je(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Me={name:`Badge`,common:j,self:je},Ne=Y([Y(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[N(`as-is`,[A(`badge-sup`,{position:`static`,transform:`translateX(0)`},[me({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),N(`dot`,[A(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[Y(`::before`,`border-radius: 4px;`)])]),A(`badge-sup`,`
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
 `,[me({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),A(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),Y(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Pe=[`title`],Fe={...U.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Ie=d({name:`Badge`,props:Fe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=K(e),a=U(`Badge`,`-badge`,Ne,Me,e,n),o=s(!1),c=()=>{o.value=!0},l=()=>{o.value=!1},u=E(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!ie(t.value)));f(()=>{u.value&&(o.value=!0)});let d=P(`Badge`,i,n),p=E(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[O(`color`,t)]:o,fontFamily:s,fontSize:c}}=a.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||o,"--n-ripple-color":n||o,"--n-bezier":r,"--n-ripple-bezier":i}}),m=r?k(`badge`,E(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=z(r)),t}),p,e):void 0,h=E(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${d?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:d,mergedClsPrefix:n,appeared:o,showBadge:u,handleAfterEnter:c,handleAfterLeave:l,cssVars:r?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return m(),l(`div`,{class:J([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:S(this.cssVars)},[G(()=>i),(m(),u(V,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(m(),l(`sup`,{key:1,class:J(`${e}-badge-sup`),title:ce(this.value),style:S(this.offsetStyle)},[G(()=>L(r.value,()=>[this.dot?null:(m(),u(Ae,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(m(),u(F,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):G(()=>null)],14,Pe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Le=Y([Y(`@keyframes spin-rotate`,`
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
 `,[N(`rotate`,`
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
 `,[N(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Re={small:20,medium:18,large:16},ze={...U.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...ne,strokeWidth:Number},Be=d({name:`Spin`,props:ze,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=K(e),r=U(`Spin`,`-spin`,Le,he,e,t),i=E(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?H(t):i[O(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?k(`spin`,E(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,o=se(e,[`spinning`,`show`]),l=s(!1);return c(t=>{let n;if(o.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=o.value}),{mergedClsPrefix:t,active:l,mergedStrokeWidth:E(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Re[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:t,mergedClsPrefix:n,description:i}=this,a=t.icon&&this.rotate,o=(i||t.description)&&(m(),l(`div`,{class:J(`${n}-spin-description`)},[G(()=>i||t.description?.())],2)),s=t.icon?(m(),l(`div`,{key:1,class:J([`${n}-spin-body`,this.themeClass])},[e(`div`,{class:J([`${n}-spin`,a&&`${n}-spin--rotate`]),style:S(t.default?``:this.cssVars)},[G(()=>t.icon())],6),G(()=>o)],2)):(m(),l(`div`,{key:2,class:J([`${n}-spin-body`,this.themeClass])},[(m(),u(W,{clsPrefix:n,style:S(t.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:J(`${n}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),G(()=>o)],2));return this.onRender?.(),t.default?(m(),l(`div`,{key:3,class:J([`${n}-spin-container`,this.themeClass]),style:S(this.cssVars)},[e(`div`,{class:J([`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass]),style:S(this.contentStyle)},[G(()=>t.default?.())],6),r(V,{name:`fade-in-transition`},{default:()=>this.active?s:null},1024)],6)):s}}),Ve=ve({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),He=ve({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),Ue={class:`flex h-full flex-col`},We={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ge={class:`min-w-0`},Ke={class:`truncate font-heading text-base font-bold`},qe={class:`tech-label mt-1 text-ink-4 tech-label--cn text-xs`},Je={class:`max-w-[86%]`},Ye={class:`font-semibold`},Xe={class:`tnum`},Ze={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Qe={class:`mt-2 flex items-center justify-between gap-3`},$e={class:`tnum text-2xs text-ink-4`},et=3e3,$=8e3,tt=15e3,nt=d({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(i,{emit:a}){let c=i,d=a,D=ge(),O=s(null),k=s(!1),A=s(``),j=s(!1),M=s(null),N=s(0),P=s($),F=E(()=>O.value?.messages??[]),L=E(()=>O.value?.ticket??null),R=E(()=>L.value?.status===`closed`);function z(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function B(e){await C();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&z()?`smooth`:`auto`})}function V(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function H(){k.value=!0;try{O.value=await p.detail(c.ticketId),N.value=O.value.last_id??0,d(`changed`)}catch(e){D.error(e instanceof h?e.message:`加载工单失败`)}finally{k.value=!1}}let U=!1;async function W(){if(!U&&O.value){U=!0;try{let e=await p.messagesSince(c.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=V();O.value.messages.push(...n),P.value=et,e&&!A.value.trim()&&await B(!0),d(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,d(`changed`))}catch{P.value=tt}finally{U=!1}}}async function G(){let e=A.value.trim();if(e){j.value=!0;try{await p.reply(c.ticketId,e),A.value=``,await H(),await B(!0),P.value=et}catch(e){D.error(e instanceof h?e.message:`发送失败`)}finally{j.value=!1}}}async function K(){try{await p.setStatus(c.ticketId,R.value?`open`:`closed`),D.success(R.value?`工单已重新打开`:`工单已关闭`),await H()}catch(e){D.error(e instanceof h?e.message:`操作失败`)}}let q=Ee(),{pause:J,resume:Y}=Te(()=>void W(),P,{immediate:!1});return T(q,e=>{e===`visible`?(W(),Y()):J()}),f(async()=>{await H(),Y(),await B(!1)}),T(()=>c.ticketId,async()=>{N.value=0,P.value=$,await H(),await B(!1),Y()}),y(J),(a,s)=>(m(),l(`div`,Ue,[e(`header`,We,[e(`div`,Ge,[e(`h3`,Ke,_(L.value?.subject??`加载中…`),1),e(`p`,qe,[x(` #`+_(i.ticketId)+` `,1),i.staff&&L.value?(m(),l(o,{key:0},[x(` · 提交人 `+_(L.value.owner_nickname),1)],64)):t(``,!0),L.value?(m(),l(o,{key:1},[x(` · `+_(n(Ce)[L.value.status]),1)],64)):t(``,!0)])]),L.value?(m(),u(n(X),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:K},{icon:w(()=>[(m(),u(g(R.value?n(He):n(be)),{size:14}))]),default:w(()=>[x(` `+_(R.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):t(``,!0)]),e(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[r(n(Be),{show:k.value&&!F.value.length},{default:w(()=>[r(I,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:w(()=>[(m(!0),l(o,null,b(F.value,t=>(m(),l(`li`,{key:t.id,class:v([`flex`,t.sender_id===i.currentUserId?`justify-end`:`justify-start`])},[e(`div`,Je,[e(`div`,{class:v([`mb-1 flex items-center gap-2 text-xs text-ink-4`,t.sender_id===i.currentUserId?`justify-end`:``])},[e(`span`,Ye,_(t.sender_nickname??`（已注销）`),1),e(`span`,Xe,_(t.create_time?.slice(5,16)??``),1)],2),e(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:S(t.sender_id===i.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},_(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),e(`footer`,Ze,[r(n(Z),{value:A.value,"onUpdate:value":s[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:R.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:R.value||j.value,onKeydown:ee(te(G,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),e(`div`,Qe,[e(`span`,$e,_(A.value.length)+` / 1000`,1),r(n(X),{type:`primary`,size:`small`,loading:j.value,disabled:R.value||!A.value.trim(),class:`!font-bold`,onClick:G},{icon:w(()=>[r(n(Se),{size:14})]),default:w(()=>[s[1]||=x(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},at={class:`flex items-baseline gap-2 font-heading text-xl font-bold sm:text-2xl`},ot={key:0,class:`tech-label shrink-0 text-2xs text-ink-3`},st={class:`flex items-center gap-2`},ct={class:`mt-0.5 text-sm text-ink-3`},lt={class:`flex items-center gap-2`},ut={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},dt={class:`panel overflow-hidden`},ft={key:0,class:`flex flex-col gap-2 p-3`},pt={key:1,class:`grid place-items-center py-12`},mt=[`aria-current`,`onClick`],ht={class:`flex items-start justify-between gap-2`},gt={class:`min-w-0 flex-1 truncate text-sm font-semibold`},_t={class:`mt-1 line-clamp-2 text-xs text-ink-3`},vt={class:`tech-label mt-1.5 text-ink-4 tech-label--cn text-xs`},yt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},bt={key:1,class:`grid h-full place-items-center py-16`},xt={class:`h-[82vh]`},St={class:`flex justify-end gap-2`},Ct=d({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(c){let d=ge(),g=E(()=>a().meta.code),v=s([]),y=s(0),C=s(!0),D=s(`all`),O=s(null),k=s(!1),A=s(!1),j=s(!1),M=i({subject:``,body:``}),N=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],P=E(()=>v.value.find(e=>e.id===O.value)??null);async function F(e=!1){e||(C.value=!0);try{let e=await p.list(D.value===`all`?void 0:D.value);v.value=e.tickets,y.value=e.unread_total,O.value&&!v.value.some(e=>e.id===O.value)&&(O.value=null)}catch(t){e||d.error(t instanceof h?t.message:`加载工单失败`)}finally{C.value=!1}}function L(e){O.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(k.value=!0)}async function ee(){if(!M.subject.trim()||!M.body.trim()){d.warning(`标题和描述都要填`);return}j.value=!0;try{let e=await p.create(M.subject.trim(),M.body.trim());d.success(`工单已提交，等待管理员回复`),A.value=!1,M.subject=``,M.body=``,await F(),O.value=e.id}catch(e){d.error(e instanceof h?e.message:`提交失败`)}finally{j.value=!1}}let R=Ee(),{pause:z,resume:B}=Te(()=>void F(!0),3e4,{immediate:!1});return T(R,e=>e===`visible`?(B(),void F(!0)):z()),T(D,()=>void F()),f(async()=>{await F(),B()}),(i,a)=>(m(),l(`div`,rt,[e(`header`,it,[e(`div`,null,[e(`h1`,at,[g.value?(m(),l(`span`,ot,_(g.value)+` //`,1)):t(``,!0),e(`span`,st,_(c.staff?`工单处理`:`问题反馈`),1),y.value?(m(),u(n(Ie),{key:1,value:y.value,type:`warning`},null,8,[`value`])):t(``,!0)]),e(`p`,ct,_(c.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),e(`div`,lt,[r(n(le),{value:D.value,"onUpdate:value":a[0]||=e=>D.value=e,options:N,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),c.staff?t(``,!0):(m(),u(n(X),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:a[1]||=e=>A.value=!0},{icon:w(()=>[r(n(xe),{size:15})]),default:w(()=>[a[9]||=x(` 新建工单 `,-1)]),_:1}))])]),e(`div`,ut,[e(`div`,dt,[C.value&&!v.value.length?(m(),l(`div`,ft,[(m(),l(o,null,b(4,e=>r(n(pe),{key:e,height:`58px`,sharp:!1})),64))])):v.value.length?(m(),u(I,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:w(()=>[(m(!0),l(o,null,b(v.value,r=>(m(),l(`li`,{key:r.id},[e(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:S({borderColor:`var(--border)`,backgroundColor:O.value===r.id?`var(--muted)`:`transparent`}),"aria-current":O.value===r.id?`true`:void 0,onClick:e=>L(r)},[e(`div`,ht,[e(`span`,gt,_(r.subject),1),r.unread?(m(),u(n(Ie),{key:0,value:r.unread,type:`warning`},null,8,[`value`])):(m(),l(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:S({color:r.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},_(n(Ce)[r.status]),5))]),e(`p`,_t,_(r.last_body),1),e(`p`,vt,[x(` #`+_(r.id)+` `,1),c.staff&&r.owner_nickname?(m(),l(o,{key:0},[x(` · `+_(r.owner_nickname),1)],64)):t(``,!0),x(` · `+_(n(we)(r.update_time))+` · `+_(r.msg_count)+` 条 `,1)])],12,mt)]))),128))]),_:1})):(m(),l(`div`,pt,[r(n(ae),{description:c.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:w(()=>[r(n(ye),{size:30})]),_:1},8,[`description`])]))]),e(`div`,yt,[P.value?(m(),u(nt,{key:P.value.id,"ticket-id":P.value.id,staff:c.staff,"current-user-id":c.currentUserId,onChanged:a[2]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(m(),l(`div`,bt,[r(n(ae),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:w(()=>[r(n(Ve),{size:30})]),_:1})]))])]),r(n(de),{show:k.value,"onUpdate:show":a[4]||=e=>k.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:w(()=>[r(n(fe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:w(()=>[e(`div`,xt,[P.value?(m(),u(nt,{key:P.value.id,"ticket-id":P.value.id,staff:c.staff,"current-user-id":c.currentUserId,onChanged:a[3]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):t(``,!0)])]),_:1})]),_:1},8,[`show`]),r(n(_e),{show:A.value,"onUpdate:show":a[8]||=e=>A.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:w(()=>[e(`div`,St,[r(n(X),{quaternary:``,onClick:a[7]||=e=>A.value=!1},{default:w(()=>[...a[10]||=[x(`取消`,-1)]]),_:1}),r(n(X),{type:`primary`,class:`!font-bold`,loading:j.value,onClick:ee},{default:w(()=>[...a[11]||=[x(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:w(()=>[r(n(ue),{label:`标题`,"show-feedback":!1},{default:w(()=>[r(n(Z),{value:M.subject,"onUpdate:value":a[5]||=e=>M.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),r(n(ue),{label:`详细描述`,"show-feedback":!1},{default:w(()=>[r(n(Z),{value:M.body,"onUpdate:value":a[6]||=e=>M.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{Ct as t};