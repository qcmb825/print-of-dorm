import{A as e,An as t,B as n,Cn as r,D as i,E as a,En as o,In as s,Kn as c,On as l,Qn as u,R as d,Sn as f,T as p,Tn as m,Vn as h,Wn as g,Yn as _,Zn as v,_t as y,b,br as x,c as S,cr as C,d as w,dn as T,dt as E,en as D,er as O,fn as k,g as A,gn as ee,gt as j,h as M,hn as te,hr as N,in as P,k as F,kn as I,l as L,on as R,pt as z,rn as ne,tn as B,ur as V,vn as H,vr as U,wn as W,xr as G,xt as K,y as q,yr as re,yt as ie,z as J,zn as ae}from"./endpoints-C6WHjh8m.js";import{f as oe,t as Y}from"./fade-in-scale-up.cssr-C2lCbpRI.js";import{t as se}from"./Empty-msIIQZBd.js";import{r as ce}from"./cssr-DbvHbkBG.js";import{a as le,t as ue}from"./Select-CVzOzOUI.js";import{t as de}from"./FormItem-D6vrbCP2.js";import{t as X}from"./Input-VSEZnVny.js";import{n as fe,t as pe}from"./DrawerContent-BBTc8t-w.js";import{t as me}from"./Skeleton-DvgHYHTc.js";import{b as he,h as ge,y as _e}from"./index-Bx-xSnBt.js";import{t as ve}from"./createLucideIcon-D8MPZ7FC.js";import{i as ye,r as be,t as Z}from"./dist-DsdcmrS9.js";import{t as xe}from"./lock-h618eIgN.js";import{t as Se}from"./plus-DRCKhBTn.js";import{t as Ce}from"./send-B9T_Lx1v.js";import{f as we,s as Te}from"./format-BtTa_oUH.js";var Ee=t({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=V(null),n=V(e.value),i=V(e.value),a=V(`up`),c=V(!1),l=f(()=>c.value?`${e.clsPrefix}-base-slot-machine-current-number--${a.value}-scroll`:null),u=f(()=>c.value?`${e.clsPrefix}-base-slot-machine-old-number--${a.value}-scroll`:null);v(N(e,`value`),(e,t)=>{n.value=t,i.value=e,s(d)});function d(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?p(`up`):n>t&&p(`down`))}function p(e){a.value=e,c.value=!1,s(()=>{t.value?.offsetWidth,c.value=!0})}return()=>{let{clsPrefix:a}=e;return g(),o(`span`,{ref:t,class:z(`${a}-base-slot-machine-number`)},[n.value===null?j(()=>null):(g(),o(`span`,{key:0,class:z([`${a}-base-slot-machine-old-number ${a}-base-slot-machine-old-number--top`,u.value])},[j(()=>n.value)],2)),r(`span`,{class:z([`${a}-base-slot-machine-current-number`,l.value])},[r(`span`,{ref:`numberWrapper`,class:z([`${a}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${a}-base-slot-machine-current-number__inner--not-number`])},[j(()=>i.value)],2)],2),n.value===null?j(()=>null):(g(),o(`span`,{key:2,class:z([`${a}-base-slot-machine-old-number ${a}-base-slot-machine-old-number--bottom`,u.value])},[j(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=ie;function De({duration:e=`.2s`}={}){return[D(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),D(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),D(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),D(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),D(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),D(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=D([D(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),D(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),D(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),D(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),B(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[B(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),A({duration:`.2s`,delay:`0s`}),B(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[P(`top`,{transform:`translateY(-100%)`}),P(`bottom`,{transform:`translateY(100%)`}),P(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),P(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),B(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[P(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),P(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),ne(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[P(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=t({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){y(`-base-slot-machine`,Oe,N(e,`clsPrefix`));let t=V(),n=V(),r=f(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return v(N(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:i,clsPrefix:a}=e;return typeof i==`number`?(g(),o(`span`,{key:1,class:z(`${a}-base-slot-machine`)},[I(k,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>r.value.map((e,i)=>(g(),W(Ee,{clsPrefix:a,key:r.value.length-i-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),I(p,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<i?(g(),W(Ee,{key:2,clsPrefix:a,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(g(),o(`span`,{key:3,class:z(`${a}-base-slot-machine`)},[j(()=>i)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:n,self:Ae},Me=D([D(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),B(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[P(`as-is`,[B(`badge-sup`,{position:`static`,transform:`translateX(0)`},[Y({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),P(`dot`,[B(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[D(`::before`,`border-radius: 4px;`)])]),B(`badge-sup`,`
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
 `,[Y({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),B(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),D(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...d.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=t({name:`Badge`,props:Pe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:o}=K(e),s=d(`Badge`,`-badge`,Me,je,e,n),c=V(!1),l=()=>{c.value=!0},u=()=>{c.value=!1},p=f(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!F(t.value)));h(()=>{p.value&&(c.value=!0)});let m=i(`Badge`,o,n),g=f(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[R(`color`,t)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),_=r?J(`badge`,f(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=a(r)),t}),g,e):void 0,v=f(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${m?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:m,mergedClsPrefix:n,appeared:c,showBadge:p,handleAfterEnter:l,handleAfterLeave:u,cssVars:r?void 0:g,themeClass:_?.themeClass,onRender:_?.onRender,offsetStyle:v}},render(){let{mergedClsPrefix:t,onRender:n,themeClass:r,$slots:i}=this;n?.();let a=i.default?.();return g(),o(`div`,{class:z([`${t}-badge`,this.rtlEnabled&&`${t}-badge--rtl`,r,{[`${t}-badge--dot`]:this.dot,[`${t}-badge--as-is`]:!a}]),style:x(this.cssVars)},[j(()=>a),(g(),W(T,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(g(),o(`sup`,{key:1,class:z(`${t}-badge-sup`),title:le(this.value),style:x(this.offsetStyle)},[j(()=>e(i.value,()=>[this.dot?null:(g(),W(ke,{key:2,clsPrefix:t,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(g(),W(M,{key:0,clsPrefix:t},null,8,[`clsPrefix`])):j(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Ie=D([D(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),B(`spin-container`,`
 position: relative;
 `,[B(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[oe()])]),B(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),B(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[P(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),B(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),B(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[P(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Le={small:20,medium:18,large:16},Re={...d.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...b,strokeWidth:Number},ze=t({name:`Spin`,props:Re,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=K(e),r=d(`Spin`,`-spin`,Ie,ge,e,t),i=f(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?E(t):i[R(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?J(`spin`,f(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,o=ce(e,[`spinning`,`show`]),s=V(!1);return u(t=>{let n;if(o.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{s.value=!0},r),t(()=>{clearTimeout(n)});return}}s.value=o.value}),{mergedClsPrefix:t,active:s,mergedStrokeWidth:f(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Le[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,i=e.icon&&this.rotate,a=(n||e.description)&&(g(),o(`div`,{class:z(`${t}-spin-description`)},[j(()=>n||e.description?.())],2)),s=e.icon?(g(),o(`div`,{key:1,class:z([`${t}-spin-body`,this.themeClass])},[r(`div`,{class:z([`${t}-spin`,i&&`${t}-spin--rotate`]),style:x(e.default?``:this.cssVars)},[j(()=>e.icon())],6),j(()=>a)],2)):(g(),o(`div`,{key:2,class:z([`${t}-spin-body`,this.themeClass])},[(g(),W(q,{clsPrefix:t,style:x(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),j(()=>a)],2));return this.onRender?.(),e.default?(g(),o(`div`,{key:3,class:z([`${t}-spin-container`,this.themeClass]),style:x(this.cssVars)},[r(`div`,{class:z([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:x(this.contentStyle)},[j(()=>e.default?.())],6),I(T,{name:`fade-in-transition`},{default:()=>this.active?s:null},1024)],6)):s}}),Be=ve({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ve=ve({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),He={class:`flex h-full flex-col`},Ue={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},We={class:`min-w-0`},Ge={class:`truncate font-heading text-[15px] font-bold`},Ke={class:`tech-label mt-1 text-ink-4`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-[11px] text-ink-4`},$e=3e3,$=8e3,et=15e3,tt=t({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:t}){let n=e,i=t,a=_e(),u=V(null),d=V(!1),p=V(``),y=V(!1),b=V(null),C=V(0),T=V($),E=f(()=>u.value?.messages??[]),D=f(()=>u.value?.ticket??null),A=f(()=>D.value?.status===`closed`);function j(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function M(e){await s();let t=b.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&j()?`smooth`:`auto`})}function N(){let e=b.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function P(){d.value=!0;try{u.value=await S.detail(n.ticketId),C.value=u.value.last_id??0,i(`changed`)}catch(e){a.error(e instanceof L?e.message:`加载工单失败`)}finally{d.value=!1}}let F=!1;async function R(){if(!F&&u.value){F=!0;try{let e=await S.messagesSince(n.ticketId,C.value);e.last_id>C.value&&(C.value=e.last_id);let t=new Set(E.value.map(e=>e.id)),r=e.messages.filter(e=>!t.has(e.id));if(r.length){let e=N();u.value.messages.push(...r),T.value=$e,e&&!p.value.trim()&&await M(!0),i(`changed`)}else T.value=T.value<$?$:Math.min(Math.round(T.value*1.6),et);e.status&&u.value.ticket.status!==e.status&&(u.value.ticket.status=e.status,i(`changed`))}catch{T.value=et}finally{F=!1}}}async function z(){let e=p.value.trim();if(e){y.value=!0;try{await S.reply(n.ticketId,e),p.value=``,await P(),await M(!0),T.value=$e}catch(e){a.error(e instanceof L?e.message:`发送失败`)}finally{y.value=!1}}}async function ne(){try{await S.setStatus(n.ticketId,A.value?`open`:`closed`),a.success(A.value?`工单已重新打开`:`工单已关闭`),await P()}catch(e){a.error(e instanceof L?e.message:`操作失败`)}}let B=Z(),{pause:K,resume:q}=be(()=>void R(),T,{immediate:!1});return v(B,e=>{e===`visible`?(R(),q()):K()}),h(async()=>{await P(),q(),await M(!1)}),v(()=>n.ticketId,async()=>{C.value=0,T.value=$,await P(),await M(!1),q()}),ae(K),(t,n)=>(g(),o(`div`,He,[r(`header`,Ue,[r(`div`,We,[r(`h3`,Ge,G(D.value?.subject??`加载中…`),1),r(`p`,Ke,[l(` #`+G(e.ticketId)+` `,1),e.staff&&D.value?(g(),o(H,{key:0},[l(` · 提交人 `+G(D.value.owner_nickname),1)],64)):m(``,!0),D.value?(g(),o(H,{key:1},[l(` · `+G(U(Te)[D.value.status]),1)],64)):m(``,!0)])]),D.value?(g(),W(U(w),{key:0,size:`small`,quaternary:``,disabled:d.value,onClick:ne},{icon:O(()=>[(g(),W(_(A.value?U(Ve):U(xe)),{size:14}))]),default:O(()=>[l(` `+G(A.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):m(``,!0)]),r(`div`,{ref_key:`scroller`,ref:b,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[I(U(ze),{show:d.value&&!E.value.length},{default:O(()=>[I(k,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:O(()=>[(g(!0),o(H,null,c(E.value,t=>(g(),o(`li`,{key:t.id,class:re([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[r(`div`,qe,[r(`div`,{class:re([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,t.sender_id===e.currentUserId?`justify-end`:``])},[r(`span`,Je,G(t.sender_nickname??`（已注销）`),1),r(`span`,Ye,G(t.create_time?.slice(5,16)??``),1)],2),r(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:x(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},G(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),r(`footer`,Xe,[I(U(X),{value:p.value,"onUpdate:value":n[0]||=e=>p.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:A.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:A.value||y.value,onKeydown:te(ee(z,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),r(`div`,Ze,[r(`span`,Qe,G(p.value.length)+` / 1000`,1),I(U(w),{type:`primary`,size:`small`,loading:y.value,disabled:A.value||!p.value.trim(),class:`!font-bold`,onClick:z},{icon:O(()=>[I(U(Ce),{size:14})]),default:O(()=>[n[1]||=l(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),nt={class:`mx-auto max-w-6xl`},rt={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},it={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},at={class:`mt-0.5 text-[13px] text-ink-3`},ot={class:`flex items-center gap-2`},st={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ct={class:`panel overflow-hidden`},lt={key:0,class:`flex flex-col gap-2 p-3`},ut={key:1,class:`grid place-items-center py-12`},dt=[`aria-current`,`onClick`],ft={class:`flex items-start justify-between gap-2`},pt={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},mt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},ht={class:`tech-label mt-1.5 text-ink-4`},gt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},_t={key:1,class:`grid h-full place-items-center py-16`},vt={class:`h-[82vh]`},yt={class:`flex justify-end gap-2`},bt=t({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let t=_e(),n=V([]),i=V(0),a=V(!0),s=V(`all`),u=V(null),d=V(!1),p=V(!1),_=V(!1),y=C({subject:``,body:``}),b=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],T=f(()=>n.value.find(e=>e.id===u.value)??null);async function E(e=!1){e||(a.value=!0);try{let e=await S.list(s.value===`all`?void 0:s.value);n.value=e.tickets,i.value=e.unread_total,u.value&&!n.value.some(e=>e.id===u.value)&&(u.value=null)}catch(n){e||t.error(n instanceof L?n.message:`加载工单失败`)}finally{a.value=!1}}function D(e){u.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(d.value=!0)}async function A(){if(!y.subject.trim()||!y.body.trim()){t.warning(`标题和描述都要填`);return}_.value=!0;try{let e=await S.create(y.subject.trim(),y.body.trim());t.success(`工单已提交，等待管理员回复`),p.value=!1,y.subject=``,y.body=``,await E(),u.value=e.id}catch(e){t.error(e instanceof L?e.message:`提交失败`)}finally{_.value=!1}}let ee=Z(),{pause:j,resume:M}=be(()=>void E(!0),3e4,{immediate:!1});return v(ee,e=>e===`visible`?(M(),void E(!0)):j()),v(s,()=>void E()),h(async()=>{await E(),M()}),(t,f)=>(g(),o(`div`,nt,[r(`header`,rt,[r(`div`,null,[r(`h1`,it,[l(G(e.staff?`工单处理`:`问题反馈`)+` `,1),i.value?(g(),W(U(Fe),{key:0,value:i.value,type:`warning`},null,8,[`value`])):m(``,!0)]),r(`p`,at,G(e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),r(`div`,ot,[I(U(ue),{value:s.value,"onUpdate:value":f[0]||=e=>s.value=e,options:b,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?m(``,!0):(g(),W(U(w),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:f[1]||=e=>p.value=!0},{icon:O(()=>[I(U(Se),{size:15})]),default:O(()=>[f[9]||=l(` 新建工单 `,-1)]),_:1}))])]),r(`div`,st,[r(`div`,ct,[a.value&&!n.value.length?(g(),o(`div`,lt,[(g(),o(H,null,c(4,e=>I(U(me),{key:e,height:`58px`,sharp:!1})),64))])):n.value.length?(g(),W(k,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:O(()=>[(g(!0),o(H,null,c(n.value,t=>(g(),o(`li`,{key:t.id},[r(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:x({borderColor:`var(--border)`,backgroundColor:u.value===t.id?`var(--muted)`:`transparent`}),"aria-current":u.value===t.id?`true`:void 0,onClick:e=>D(t)},[r(`div`,ft,[r(`span`,pt,G(t.subject),1),t.unread?(g(),W(U(Fe),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(g(),o(`span`,{key:1,class:`tech-label shrink-0`,style:x({color:t.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},G(U(Te)[t.status]),5))]),r(`p`,mt,G(t.last_body),1),r(`p`,ht,[l(` #`+G(t.id)+` `,1),e.staff&&t.owner_nickname?(g(),o(H,{key:0},[l(` · `+G(t.owner_nickname),1)],64)):m(``,!0),l(` · `+G(U(we)(t.update_time))+` · `+G(t.msg_count)+` 条 `,1)])],12,dt)]))),128))]),_:1})):(g(),o(`div`,ut,[I(U(se),{description:e.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:O(()=>[I(U(ye),{size:30})]),_:1},8,[`description`])]))]),r(`div`,gt,[T.value?(g(),W(tt,{key:T.value.id,"ticket-id":T.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:f[2]||=e=>E(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(g(),o(`div`,_t,[I(U(se),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:O(()=>[I(U(Be),{size:30})]),_:1})]))])]),I(U(fe),{show:d.value,"onUpdate:show":f[4]||=e=>d.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:O(()=>[I(U(pe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:O(()=>[r(`div`,vt,[T.value?(g(),W(tt,{key:T.value.id,"ticket-id":T.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:f[3]||=e=>E(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):m(``,!0)])]),_:1})]),_:1},8,[`show`]),I(U(he),{show:p.value,"onUpdate:show":f[8]||=e=>p.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:O(()=>[r(`div`,yt,[I(U(w),{quaternary:``,onClick:f[7]||=e=>p.value=!1},{default:O(()=>[...f[10]||=[l(`取消`,-1)]]),_:1}),I(U(w),{type:`primary`,class:`!font-bold`,loading:_.value,onClick:A},{default:O(()=>[...f[11]||=[l(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:O(()=>[I(U(de),{label:`标题`,"show-feedback":!1},{default:O(()=>[I(U(X),{value:y.subject,"onUpdate:value":f[5]||=e=>y.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),I(U(de),{label:`详细描述`,"show-feedback":!1},{default:O(()=>[I(U(X),{value:y.body,"onUpdate:value":f[6]||=e=>y.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{bt as t};