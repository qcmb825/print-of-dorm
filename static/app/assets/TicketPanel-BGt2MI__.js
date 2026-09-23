import{$ as e,At as t,B as n,Bt as r,Dt as i,G as a,Gt as o,J as s,Jt as c,K as l,Ot as u,Rt as d,St as f,Y as p,_ as m,_t as h,cn as g,et as _,ft as v,g as y,ln as b,lt as x,mt as S,q as C,tt as w,un as T,yt as E}from"./endpoints-ENJhMWK2.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as ee,k as B,n as V,nn as H,nt as U,o as W,on as te,rn as G,s as ne,sn as re,st as K,t as q,u as J,ut as ie,v as ae,x as oe}from"./createLucideIcon-BuHP6xwY.js";import{t as Y}from"./Input-w1oxS3Yy.js";import{o as se,t as ce}from"./Select-B2ztKUMz.js";import{r as le}from"./cssr-Dh0SFEJ4.js";import{t as ue}from"./FormItem-CsFopHo6.js";import{n as de,t as fe}from"./DrawerContent-OY2ss_WT.js";import{t as pe}from"./Skeleton-BtidWrR-.js";import{t as me}from"./inbox-CL0KmSNu.js";import{t as he}from"./lock-obj3J5oN.js";import{t as ge}from"./plus-BfM17Gp3.js";import{t as _e}from"./send-CtI_nzCY.js";import{C as ve,S as ye,U as X,ut as be,v as xe}from"./index-C68jqRF6.js";import{c as Se,y as Ce}from"./format-1rjnJmsR.js";import{t as we}from"./EmptyState-CI99EiSI.js";import{t as Te}from"./PageHeader-D0XHtiU7.js";import{r as Ee,t as De}from"./dist-DK1nTJy2.js";var Oe=w({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=r(null),n=r(e.value),s=r(e.value),c=r(`up`),u=r(!1),d=a(()=>u.value?`${e.clsPrefix}-base-slot-machine-current-number--${c.value}-scroll`:null),f=a(()=>u.value?`${e.clsPrefix}-base-slot-machine-old-number--${c.value}-scroll`:null);i(o(e,`value`),(e,t)=>{n.value=t,s.value=e,x(m)});function m(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?g(`up`):n>t&&g(`down`))}function g(e){c.value=e,u.value=!1,x(()=>{t.value?.offsetWidth,u.value=!0})}return()=>{let{clsPrefix:r}=e;return h(),p(`span`,{ref:t,class:z(`${r}-base-slot-machine-number`)},[n.value===null?K(()=>null):(h(),p(`span`,{key:0,class:z([`${r}-base-slot-machine-old-number ${r}-base-slot-machine-old-number--top`,f.value])},[K(()=>n.value)],2)),l(`span`,{class:z([`${r}-base-slot-machine-current-number`,d.value])},[l(`span`,{ref:`numberWrapper`,class:z([`${r}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${r}-base-slot-machine-current-number__inner--not-number`])},[K(()=>s.value)],2)],2),n.value===null?K(()=>null):(h(),p(`span`,{key:2,class:z([`${r}-base-slot-machine-old-number ${r}-base-slot-machine-old-number--bottom`,f.value])},[K(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Z}=ie;function ke({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
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
 `)])])])])]),je=w({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){F(`-base-slot-machine`,Ae,o(e,`clsPrefix`));let t=r(),n=r(),s=a(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return i(o(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:r,clsPrefix:i}=e;return typeof r==`number`?(h(),p(`span`,{key:1,class:z(`${i}-base-slot-machine`)},[_(G,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>s.value.map((e,r)=>(h(),C(Oe,{clsPrefix:i,key:s.value.length-r-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),_(R,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<r?(h(),C(Oe,{key:2,clsPrefix:i,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(h(),p(`span`,{key:3,class:z(`${i}-base-slot-machine`)},[K(()=>r)],2))}}});function Me(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Ne={name:`Badge`,common:ee,self:Me},Pe=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
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
 `)])])]),Fe=[`title`],Ie={...B.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Le=w({name:`Badge`,props:Ie,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedRtlRef:o}=L(e),s=B(`Badge`,`-badge`,Pe,Ne,e,n),c=r(!1),l=()=>{c.value=!0},u=()=>{c.value=!1},d=a(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!P(t.value)));S(()=>{d.value&&(c.value=!0)});let f=ae(`Badge`,o,n),p=a(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,t)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),m=i?D(`badge`,a(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=N(r)),t}),p,e):void 0,h=a(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${f?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:f,mergedClsPrefix:n,appeared:c,showBadge:d,handleAfterEnter:l,handleAfterLeave:u,cssVars:i?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return h(),p(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:b(this.cssVars)},[K(()=>i),(h(),C(H,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(h(),p(`sup`,{key:1,class:z(`${e}-badge-sup`),title:se(this.value),style:b(this.offsetStyle)},[K(()=>oe(r.value,()=>[this.dot?null:(h(),C(je,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(h(),C(W,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):K(()=>null)],14,Fe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Re=O([O(`@keyframes spin-rotate`,`
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
 `,[be()])]),A(`spin-body`,`
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
 `)])]),ze={small:20,medium:18,large:16},Be={...B.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Ve=w({name:`Spin`,props:Be,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=L(e),i=B(`Spin`,`-spin`,Re,xe,e,t),o=a(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{opacitySpinning:a,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?U(t):r[M(`size`,t)],"--n-color":o,"--n-text-color":s}}),s=n?D(`spin`,a(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),o,e):void 0,c=le(e,[`spinning`,`show`]),l=r(!1);return u(t=>{let n;if(c.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=c.value}),{mergedClsPrefix:t,active:l,mergedStrokeWidth:a(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return ze[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,i=(n||e.description)&&(h(),p(`div`,{class:z(`${t}-spin-description`)},[K(()=>n||e.description?.())],2)),a=e.icon?(h(),p(`div`,{key:1,class:z([`${t}-spin-body`,this.themeClass])},[l(`div`,{class:z([`${t}-spin`,r&&`${t}-spin--rotate`]),style:b(e.default?``:this.cssVars)},[K(()=>e.icon())],6),K(()=>i)],2)):(h(),p(`div`,{key:2,class:z([`${t}-spin-body`,this.themeClass])},[(h(),C(J,{clsPrefix:t,style:b(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),K(()=>i)],2));return this.onRender?.(),e.default?(h(),p(`div`,{key:3,class:z([`${t}-spin-container`,this.themeClass]),style:b(this.cssVars)},[l(`div`,{class:z([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:b(this.contentStyle)},[K(()=>e.default?.())],6),_(H,{name:`fade-in-transition`},{default:()=>this.active?a:null},1024)],6)):a}}),He=q({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ue=q({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),We={class:`flex h-full flex-col`},Ge={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ke={class:`min-w-0`},qe={class:`truncate font-heading text-base font-bold`},Je={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ye={class:`max-w-[86%]`},Xe={class:`font-semibold`},Ze={class:`tnum`},Qe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},$e={class:`mt-2 flex items-center justify-between gap-3`},et={class:`tnum text-2xs text-ink-3`},Q=3e3,$=8e3,tt=15e3,nt=w({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(o,{emit:u}){let d=o,w=u,D=ye(),O=r(null),k=r(!1),A=r(``),j=r(!1),M=r(null),N=r(0),P=r($),F=a(()=>O.value?.messages??[]),I=a(()=>O.value?.ticket??null),L=a(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await x();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function ee(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function B(){k.value=!0;try{O.value=await y.detail(d.ticketId),N.value=O.value.last_id??0,w(`changed`)}catch(e){D.error(e instanceof m?e.message:`工单读取失败`)}finally{k.value=!1}}let H=!1;async function U(){if(!H&&O.value){H=!0;try{let e=await y.messagesSince(d.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();O.value.messages.push(...n),P.value=Q,e&&!A.value.trim()&&await z(!0),w(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,w(`changed`))}catch{P.value=tt}finally{H=!1}}}async function W(){let e=A.value.trim();if(e){j.value=!0;try{await y.reply(d.ticketId,e),A.value=``,await B(),await z(!0),P.value=Q}catch(e){D.error(e instanceof m?e.message:`发送未完成 · 稍后重试`)}finally{j.value=!1}}}async function ne(){try{await y.setStatus(d.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重开`:`工单已关闭`),await B()}catch(e){D.error(e instanceof m?e.message:`工单状态未变更 · 稍后重试`)}}let K=De(),{pause:q,resume:J}=Ee(()=>void U(),P,{immediate:!1});return i(K,e=>{e===`visible`?(U(),J()):q()}),S(async()=>{await B(),J(),await z(!1)}),i(()=>d.ticketId,async()=>{N.value=0,P.value=$,await B(),await z(!1),J()}),v(q),(r,i)=>(h(),p(`div`,We,[l(`header`,Ge,[l(`div`,Ke,[l(`h3`,qe,T(I.value?.subject??`读取中`),1),l(`p`,Je,[e(` 工单 `+T(o.ticketId)+` `,1),o.staff&&I.value?(h(),p(n,{key:0},[e(` · 提交人 `+T(I.value.owner_nickname),1)],64)):s(``,!0),I.value?(h(),p(n,{key:1},[e(` · `+T(c(Se)[I.value.status]),1)],64)):s(``,!0)])]),I.value?(h(),C(c(V),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:ne},{icon:t(()=>[(h(),C(f(L.value?c(Ue):c(he)),{size:14}))]),default:t(()=>[e(` `+T(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):s(``,!0)]),l(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[_(c(Ve),{show:k.value&&!F.value.length},{default:t(()=>[_(G,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:t(()=>[(h(!0),p(n,null,E(F.value,e=>(h(),p(`li`,{key:e.id,class:g([`flex`,e.sender_id===o.currentUserId?`justify-end`:`justify-start`])},[l(`div`,Ye,[l(`div`,{class:g([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===o.currentUserId?`justify-end`:``])},[l(`span`,Xe,T(e.sender_nickname??`（已注销）`),1),l(`span`,Ze,T(e.create_time?.slice(5,16)??``),1)],2),l(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:b(e.sender_id===o.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},T(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),l(`footer`,Qe,[_(c(Y),{value:A.value,"onUpdate:value":i[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:te(re(W,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),l(`div`,$e,[l(`span`,et,T(A.value.length)+` / 1000`,1),_(c(V),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:W},{icon:t(()=>[_(c(_e),{size:14})]),default:t(()=>[i[1]||=e(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-sm font-semibold`},dt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=w({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(o){let u=ye(),f=r([]),g=r(0),v=r(!0),x=r(`all`),w=r(null),D=r(!1),O=r(!1),k=r(!1),A=d({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=a(()=>f.value.find(e=>e.id===w.value)??null);async function N(e=!1){e||(v.value=!0);try{let e=await y.list(x.value===`all`?void 0:x.value);f.value=e.tickets,g.value=e.unread_total,w.value&&!f.value.some(e=>e.id===w.value)&&(w.value=null)}catch(t){e||u.error(t instanceof m?t.message:`工单读取失败`)}finally{v.value=!1}}function P(e){w.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function F(){if(!A.subject.trim()||!A.body.trim()){u.warning(`标题与描述为必填`);return}k.value=!0;try{let e=await y.create(A.subject.trim(),A.body.trim());u.success(`工单已提交 · 待回复`),O.value=!1,A.subject=``,A.body=``,await N(),w.value=e.id}catch(e){u.error(e instanceof m?e.message:`提交未完成 · 稍后重试`)}finally{k.value=!1}}let I=De(),{pause:L,resume:R}=Ee(()=>void N(!0),3e4,{immediate:!1});return i(I,e=>e===`visible`?(R(),void N(!0)):L()),i(x,()=>void N()),S(async()=>{await N(),R()}),(r,i)=>(h(),p(`div`,rt,[_(Te,{heading:`md`,title:o.staff?`工单处理`:`问题反馈`,subtitle:o.staff?`学生提交的问题与需求 · 回复后对方收到未读提示`:`打印相关问题 · 在此留言给管理员`},{"title-append":t(()=>[g.value?(h(),C(c(Le),{key:0,value:g.value,type:`warning`},null,8,[`value`])):s(``,!0)]),actions:t(()=>[_(c(ce),{value:x.value,"onUpdate:value":i[0]||=e=>x.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),o.staff?s(``,!0):(h(),C(c(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:i[1]||=e=>O.value=!0},{icon:t(()=>[_(c(ge),{size:15})]),default:t(()=>[i[9]||=e(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),l(`div`,it,[l(`div`,at,[v.value&&!f.value.length?(h(),p(`div`,ot,[(h(),p(n,null,E(4,e=>_(c(pe),{key:e,height:`58px`,sharp:!1})),64))])):f.value.length?(h(),C(G,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:t(()=>[(h(!0),p(n,null,E(f.value,t=>(h(),p(`li`,{key:t.id},[l(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:b({borderColor:`var(--border)`,backgroundColor:w.value===t.id?`var(--muted)`:`transparent`}),"aria-current":w.value===t.id?`true`:void 0,onClick:e=>P(t)},[l(`div`,lt,[l(`span`,ut,T(t.subject),1),t.unread?(h(),C(c(Le),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(h(),p(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:b({color:t.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},T(c(Se)[t.status]),5))]),l(`p`,dt,T(t.last_body),1),l(`p`,ft,[e(` 工单 `+T(t.id)+` `,1),o.staff&&t.owner_nickname?(h(),p(n,{key:0},[e(` · `+T(t.owner_nickname),1)],64)):s(``,!0),e(` · `+T(c(Ce)(t.update_time))+` · `+T(t.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(h(),p(`div`,st,[_(we,{code:`00 / NO TICKET`,title:o.staff?`无工单`:`尚未提交工单`,hint:o.staff?`学生提交后在此列示`:`打印相关问题 · 新建工单提交`},{icon:t(()=>[_(c(me),{size:28})]),_:1},8,[`title`,`hint`])]))]),l(`div`,pt,[M.value?(h(),C(nt,{key:M.value.id,"ticket-id":M.value.id,staff:o.staff,"current-user-id":o.currentUserId,onChanged:i[2]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(h(),p(`div`,mt,[_(we,{code:`00 / NO TICKET`,title:`从左侧选择工单`,hint:`窄屏以抽屉打开`},{icon:t(()=>[_(c(He),{size:28})]),_:1})]))])]),_(c(de),{show:D.value,"onUpdate:show":i[4]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:t(()=>[_(c(fe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:t(()=>[l(`div`,ht,[M.value?(h(),C(nt,{key:M.value.id,"ticket-id":M.value.id,staff:o.staff,"current-user-id":o.currentUserId,onChanged:i[3]||=e=>N(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):s(``,!0)])]),_:1})]),_:1},8,[`show`]),_(c(ve),{show:O.value,"onUpdate:show":i[8]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:t(()=>[l(`div`,gt,[_(c(V),{quaternary:``,onClick:i[7]||=e=>O.value=!1},{default:t(()=>[...i[10]||=[e(`取消`,-1)]]),_:1}),_(c(V),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:F},{default:t(()=>[...i[11]||=[e(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:t(()=>[_(c(ue),{label:`标题`,"show-feedback":!1},{default:t(()=>[_(c(Y),{value:A.subject,"onUpdate:value":i[5]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),_(c(ue),{label:`详细描述`,"show-feedback":!1},{default:t(()=>[_(c(Y),{value:A.body,"onUpdate:value":i[6]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清单号、遇到的问题与期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};