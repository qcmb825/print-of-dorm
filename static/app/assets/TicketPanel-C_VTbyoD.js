import{Ct as e,J as t,K as n,Kt as r,Ot as i,V as a,Vt as o,X as s,Y as c,Yt as l,_ as u,bt as d,dn as f,et as p,ht as m,jt as h,kt as g,ln as _,nt as v,pt as y,q as b,tt as x,un as S,ut as C,v as w,vt as T,zt as E}from"./endpoints-BlW_rAxP.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as ee,k as B,n as V,nn as H,nt as U,o as W,on as te,rn as G,s as ne,sn as re,st as K,t as q,u as J,ut as ie,v as ae,x as oe}from"./createLucideIcon-LFURxWOJ.js";import{t as Y}from"./Input-tkkSUYWg.js";import{o as se,t as ce}from"./Select-9_V95G69.js";import{r as le}from"./cssr-DcKahh8b.js";import{t as X}from"./FormItem-L-10Fr-g.js";import{n as ue,t as de}from"./DrawerContent-BePm9jSU.js";import{t as fe}from"./Skeleton-DjkyZ8N1.js";import{t as pe}from"./inbox-B71QJ5dh.js";import{t as me}from"./lock-dovufXPF.js";import{t as he}from"./plus-CLEaJGqe.js";import{t as ge}from"./send-BUVulvYo.js";import{C as _e,S as Z,U as ve,ut as ye,v as be}from"./index-DekS4r6X.js";import{c as xe,y as Se}from"./format-1rjnJmsR.js";import{t as Ce}from"./EmptyState-CcpMtycu.js";import{t as we}from"./PageHeader-BrJ4jvgS.js";import{r as Te,t as Ee}from"./dist-_zyxMqOa.js";var De=v({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=o(null),a=o(e.value),c=o(e.value),l=o(`up`),u=o(!1),d=n(()=>u.value?`${e.clsPrefix}-base-slot-machine-current-number--${l.value}-scroll`:null),f=n(()=>u.value?`${e.clsPrefix}-base-slot-machine-old-number--${l.value}-scroll`:null);i(r(e,`value`),(e,t)=>{a.value=t,c.value=e,C(p)});function p(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?m(`up`):n>t&&m(`down`))}function m(e){l.value=e,u.value=!1,C(()=>{t.value?.offsetWidth,u.value=!0})}return()=>{let{clsPrefix:n}=e;return T(),s(`span`,{ref:t,class:z(`${n}-base-slot-machine-number`)},[a.value===null?K(()=>null):(T(),s(`span`,{key:0,class:z([`${n}-base-slot-machine-old-number ${n}-base-slot-machine-old-number--top`,f.value])},[K(()=>a.value)],2)),b(`span`,{class:z([`${n}-base-slot-machine-current-number`,d.value])},[b(`span`,{ref:`numberWrapper`,class:z([`${n}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${n}-base-slot-machine-current-number__inner--not-number`])},[K(()=>c.value)],2)],2),a.value===null?K(()=>null):(T(),s(`span`,{key:2,class:z([`${n}-base-slot-machine-old-number ${n}-base-slot-machine-old-number--bottom`,f.value])},[K(()=>a.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=ie;function Oe({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
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
 `)])])])])]),Ae=v({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){F(`-base-slot-machine`,ke,r(e,`clsPrefix`));let a=o(),c=o(),l=n(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return i(r(e,`value`),(e,t)=>{typeof e==`string`?(c.value=void 0,a.value=void 0):typeof t==`string`?(c.value=e,a.value=void 0):(c.value=e,a.value=t)}),()=>{let{value:n,clsPrefix:r}=e;return typeof n==`number`?(T(),s(`span`,{key:1,class:z(`${r}-base-slot-machine`)},[x(G,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>l.value.map((e,n)=>(T(),t(De,{clsPrefix:r,key:l.value.length-n-1,oldOriginalNumber:a.value,newOriginalNumber:c.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),x(R,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<n?(T(),t(De,{key:2,clsPrefix:r,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(T(),s(`span`,{key:3,class:z(`${r}-base-slot-machine`)},[K(()=>n)],2))}}});function je(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Me={name:`Badge`,common:ee,self:je},Ne=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[j(`as-is`,[A(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ve({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),j(`dot`,[A(`badge-sup`,`
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
 `,[ve({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),A(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),O(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Pe=[`title`],Fe={...B.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Ie=v({name:`Badge`,props:Fe,setup(e,{slots:t}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:a}=L(e),s=B(`Badge`,`-badge`,Ne,Me,e,r),c=o(!1),l=()=>{c.value=!0},u=()=>{c.value=!1},d=n(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!P(t.value)));m(()=>{d.value&&(c.value=!0)});let f=ae(`Badge`,a,r),p=n(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,t)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),h=i?D(`badge`,n(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=N(r)),t}),p,e):void 0,g=n(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:r,appeared:c,showBadge:d,handleAfterEnter:l,handleAfterLeave:u,cssVars:i?void 0:p,themeClass:h?.themeClass,onRender:h?.onRender,offsetStyle:g}},render(){let{mergedClsPrefix:e,onRender:n,themeClass:r,$slots:i}=this;n?.();let a=i.default?.();return T(),s(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,r,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!a}]),style:S(this.cssVars)},[K(()=>a),(T(),t(H,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(T(),s(`sup`,{key:1,class:z(`${e}-badge-sup`),title:se(this.value),style:S(this.offsetStyle)},[K(()=>oe(i.value,()=>[this.dot?null:(T(),t(Ae,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(T(),t(W,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):K(()=>null)],14,Pe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Le=O([O(`@keyframes spin-rotate`,`
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
 `,[ye()])]),A(`spin-body`,`
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
 `)])]),Re={small:20,medium:18,large:16},ze={...B.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Be=v({name:`Spin`,props:ze,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=L(e),i=B(`Spin`,`-spin`,Le,be,e,t),a=n(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{opacitySpinning:a,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?U(t):r[M(`size`,t)],"--n-color":o,"--n-text-color":s}}),s=r?D(`spin`,n(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),a,e):void 0,c=le(e,[`spinning`,`show`]),l=o(!1);return g(t=>{let n;if(c.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=c.value}),{mergedClsPrefix:t,active:l,mergedStrokeWidth:n(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Re[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:a,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$slots:e,mergedClsPrefix:n,description:r}=this,i=e.icon&&this.rotate,a=(r||e.description)&&(T(),s(`div`,{class:z(`${n}-spin-description`)},[K(()=>r||e.description?.())],2)),o=e.icon?(T(),s(`div`,{key:1,class:z([`${n}-spin-body`,this.themeClass])},[b(`div`,{class:z([`${n}-spin`,i&&`${n}-spin--rotate`]),style:S(e.default?``:this.cssVars)},[K(()=>e.icon())],6),K(()=>a)],2)):(T(),s(`div`,{key:2,class:z([`${n}-spin-body`,this.themeClass])},[(T(),t(J,{clsPrefix:n,style:S(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${n}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),K(()=>a)],2));return this.onRender?.(),e.default?(T(),s(`div`,{key:3,class:z([`${n}-spin-container`,this.themeClass]),style:S(this.cssVars)},[b(`div`,{class:z([`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass]),style:S(this.contentStyle)},[K(()=>e.default?.())],6),x(H,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),Ve=q({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),He=q({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),Ue={class:`flex h-full flex-col`},We={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ge={class:`min-w-0`},Ke={class:`truncate font-heading text-base font-bold`},qe={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Je={class:`max-w-[86%]`},Ye={class:`font-semibold`},Xe={class:`tnum`},Ze={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Qe={class:`mt-2 flex items-center justify-between gap-3`},$e={class:`tnum text-2xs text-ink-3`},et=3e3,$=8e3,tt=15e3,nt=v({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(r,{emit:g}){let v=r,E=g,D=Z(),O=o(null),k=o(!1),A=o(``),j=o(!1),M=o(null),N=o(0),P=o($),F=n(()=>O.value?.messages??[]),I=n(()=>O.value?.ticket??null),L=n(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await C();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function ee(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function B(){k.value=!0;try{O.value=await u.detail(v.ticketId),N.value=O.value.last_id??0,E(`changed`)}catch(e){D.error(e instanceof w?e.message:`工单读取失败`)}finally{k.value=!1}}let H=!1;async function U(){if(!H&&O.value){H=!0;try{let e=await u.messagesSince(v.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();O.value.messages.push(...n),P.value=et,e&&!A.value.trim()&&await z(!0),E(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,E(`changed`))}catch{P.value=tt}finally{H=!1}}}async function W(){let e=A.value.trim();if(e){j.value=!0;try{await u.reply(v.ticketId,e),A.value=``,await B(),await z(!0),P.value=et}catch(e){D.error(e instanceof w?e.message:`发送未完成 · 稍后重试`)}finally{j.value=!1}}}async function ne(){try{await u.setStatus(v.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重开`:`工单已关闭`),await B()}catch(e){D.error(e instanceof w?e.message:`工单状态未变更 · 稍后重试`)}}let K=Ee(),{pause:q,resume:J}=Te(()=>void U(),P,{immediate:!1});return i(K,e=>{e===`visible`?(U(),J()):q()}),m(async()=>{await B(),J(),await z(!1)}),i(()=>v.ticketId,async()=>{N.value=0,P.value=$,await B(),await z(!1),J()}),y(q),(n,i)=>(T(),s(`div`,Ue,[b(`header`,We,[b(`div`,Ge,[b(`h3`,Ke,f(I.value?.subject??`读取中`),1),b(`p`,qe,[p(` 工单 `+f(r.ticketId)+` `,1),r.staff&&I.value?(T(),s(a,{key:0},[p(` · 提交人 `+f(I.value.owner_nickname),1)],64)):c(``,!0),I.value?(T(),s(a,{key:1},[p(` · `+f(l(xe)[I.value.status]),1)],64)):c(``,!0)])]),I.value?(T(),t(l(V),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:ne},{icon:h(()=>[(T(),t(e(L.value?l(He):l(me)),{size:14}))]),default:h(()=>[p(` `+f(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):c(``,!0)]),b(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[x(l(Be),{show:k.value&&!F.value.length},{default:h(()=>[x(G,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:h(()=>[(T(!0),s(a,null,d(F.value,e=>(T(),s(`li`,{key:e.id,class:_([`flex`,e.sender_id===r.currentUserId?`justify-end`:`justify-start`])},[b(`div`,Je,[b(`div`,{class:_([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===r.currentUserId?`justify-end`:``])},[b(`span`,Ye,f(e.sender_nickname??`（已注销）`),1),b(`span`,Xe,f(e.create_time?.slice(5,16)??``),1)],2),b(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:S(e.sender_id===r.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},f(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),b(`footer`,Ze,[x(l(Y),{value:A.value,"onUpdate:value":i[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:te(re(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),b(`div`,Qe,[b(`span`,$e,f(A.value.length)+` / 1000`,1),x(l(V),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:W},{icon:h(()=>[x(l(ge),{size:14})]),default:h(()=>[i[1]||=p(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-sm font-semibold`},dt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=v({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let r=Z(),g=o([]),_=o(0),v=o(!0),y=o(`all`),C=o(null),D=o(!1),O=o(!1),k=o(!1),A=E({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=n(()=>g.value.find(e=>e.id===C.value)??null);async function N(e=!1){e||(v.value=!0);try{let e=await u.list(y.value===`all`?void 0:y.value);g.value=e.tickets,_.value=e.unread_total,C.value&&!g.value.some(e=>e.id===C.value)&&(C.value=null)}catch(t){e||r.error(t instanceof w?t.message:`工单读取失败`)}finally{v.value=!1}}function P(e){C.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function F(){if(!A.subject.trim()||!A.body.trim()){r.warning(`标题与描述为必填`);return}k.value=!0;try{let e=await u.create(A.subject.trim(),A.body.trim());r.success(`工单已提交 · 待回复`),O.value=!1,A.subject=``,A.body=``,await N(),C.value=e.id}catch(e){r.error(e instanceof w?e.message:`提交未完成 · 稍后重试`)}finally{k.value=!1}}let I=Ee(),{pause:L,resume:R}=Te(()=>void N(!0),3e4,{immediate:!1});return i(I,e=>e===`visible`?(R(),void N(!0)):L()),i(y,()=>void N()),m(async()=>{await N(),R()}),(n,r)=>(T(),s(`div`,rt,[x(we,{heading:`md`,title:e.staff?`工单处理`:`问题反馈`,subtitle:e.staff?`学生提交的问题与需求 · 回复后对方收到未读提示`:`打印相关问题 · 在此留言给管理员`},{"title-append":h(()=>[_.value?(T(),t(l(Ie),{key:0,value:_.value,type:`warning`},null,8,[`value`])):c(``,!0)]),actions:h(()=>[x(l(ce),{value:y.value,"onUpdate:value":r[0]||=e=>y.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?c(``,!0):(T(),t(l(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:r[1]||=e=>O.value=!0},{icon:h(()=>[x(l(he),{size:15})]),default:h(()=>[r[9]||=p(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),b(`div`,it,[b(`div`,at,[v.value&&!g.value.length?(T(),s(`div`,ot,[(T(),s(a,null,d(4,e=>x(l(fe),{key:e,height:`58px`,sharp:!1})),64))])):g.value.length?(T(),t(G,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:h(()=>[(T(!0),s(a,null,d(g.value,n=>(T(),s(`li`,{key:n.id},[b(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:S({borderColor:`var(--border)`,backgroundColor:C.value===n.id?`var(--muted)`:`transparent`}),"aria-current":C.value===n.id?`true`:void 0,onClick:e=>P(n)},[b(`div`,lt,[b(`span`,ut,f(n.subject),1),n.unread?(T(),t(l(Ie),{key:0,value:n.unread,type:`warning`},null,8,[`value`])):(T(),s(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:S({color:n.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},f(l(xe)[n.status]),5))]),b(`p`,dt,f(n.last_body),1),b(`p`,ft,[p(` 工单 `+f(n.id)+` `,1),e.staff&&n.owner_nickname?(T(),s(a,{key:0},[p(` · `+f(n.owner_nickname),1)],64)):c(``,!0),p(` · `+f(l(Se)(n.update_time))+` · `+f(n.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(T(),s(`div`,st,[x(Ce,{code:`00 / NO TICKET`,title:e.staff?`无工单`:`尚未提交工单`,hint:e.staff?`学生提交后在此列示`:`打印相关问题 · 新建工单提交`},{icon:h(()=>[x(l(pe),{size:28})]),_:1},8,[`title`,`hint`])]))]),b(`div`,pt,[M.value?(T(),t(nt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:r[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(T(),s(`div`,mt,[x(Ce,{code:`00 / NO TICKET`,title:`从左侧选择工单`,hint:`窄屏以抽屉打开`},{icon:h(()=>[x(l(Ve),{size:28})]),_:1})]))])]),x(l(ue),{show:D.value,"onUpdate:show":r[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:h(()=>[x(l(de),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:h(()=>[b(`div`,ht,[M.value?(T(),t(nt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:r[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):c(``,!0)])]),_:1})]),_:1},8,[`show`]),x(l(_e),{show:O.value,"onUpdate:show":r[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:h(()=>[b(`div`,gt,[x(l(V),{quaternary:``,onClick:r[7]||=e=>O.value=!1},{default:h(()=>[...r[10]||=[p(`取消`,-1)]]),_:1}),x(l(V),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:F},{default:h(()=>[...r[11]||=[p(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:h(()=>[x(l(X),{label:`标题`,"show-feedback":!1},{default:h(()=>[x(l(Y),{value:A.subject,"onUpdate:value":r[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),x(l(X),{label:`详细描述`,"show-feedback":!1},{default:h(()=>[x(l(Y),{value:A.body,"onUpdate:value":r[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清单号、遇到的问题与期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};