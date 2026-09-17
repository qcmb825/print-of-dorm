import{$n as e,A as t,An as n,C as r,Ct as i,Dr as a,Dt as o,Er as s,Fn as c,H as l,In as u,Jn as d,K as f,Kn as p,Ln as m,M as h,Mn as g,N as _,O as v,On as y,Or as b,S as x,Sn as S,Sr as C,St as w,Tr as T,Tt as E,U as D,Un as O,Zn as k,_n as A,_r as j,_t as M,ar as ee,d as N,f as P,fn as F,hr as I,ir as L,jn as R,k as z,kn as B,ln as V,m as H,nr as te,on as U,sn as W,sr as G,un as K,v as q,vn as J,wn as Y,xn as ne,y as re,yt as X}from"./endpoints-DxQPCLqF.js";import{t as ie}from"./Empty-BKQAa2mi.js";import{a as ae}from"./Scrollbar-C-sdX_Vk.js";import{r as oe}from"./cssr-PC_ZRNdG.js";import{a as se,t as ce}from"./Select-B5X_4B3l.js";import{t as le}from"./FormItem-C6oMBLDf.js";import{t as Z}from"./Input-CRvKg_wY.js";import{n as ue,t as de}from"./DrawerContent-CYb563JZ.js";import{t as fe}from"./Skeleton-pXXeyKgz.js";import{b as pe,g as me,x as he,z as ge}from"./index-Dp3yRsNZ.js";import{t as _e}from"./createLucideIcon-BiySHSEV.js";import{t as ve}from"./inbox-DDizajt4.js";import{t as ye}from"./lock-BGOOx9px.js";import{t as be}from"./plus-BuEhzJB_.js";import{t as xe}from"./send-C4Fcaygp.js";import{c as Se,y as Ce}from"./format-DZdu6wMQ.js";import{r as we,t as Te}from"./dist-wMci2RCY.js";var Ee=m({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=j(null),n=j(e.value),r=j(e.value),i=j(`up`),a=j(!1),o=y(()=>a.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),s=y(()=>a.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);L(C(e,`value`),(e,t)=>{n.value=t,r.value=e,O(c)});function c(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?l(`up`):n>t&&l(`down`))}function l(e){i.value=e,a.value=!1,O(()=>{t.value?.offsetWidth,a.value=!0})}return()=>{let{clsPrefix:i}=e;return k(),g(`span`,{ref:t,class:X(`${i}-base-slot-machine-number`)},[n.value===null?w(()=>null):(k(),g(`span`,{key:0,class:X([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,s.value])},[w(()=>n.value)],2)),B(`span`,{class:X([`${i}-base-slot-machine-current-number`,o.value])},[B(`span`,{ref:`numberWrapper`,class:X([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[w(()=>r.value)],2)],2),n.value===null?w(()=>null):(k(),g(`span`,{key:2,class:X([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,s.value])},[w(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=E;function De({duration:e=`.2s`}={}){return[U(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),U(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),U(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),U(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),U(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),U(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=U([U(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),U(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),U(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),U(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),W(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[W(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),re({duration:`.2s`,delay:`0s`}),W(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[K(`top`,{transform:`translateY(-100%)`}),K(`bottom`,{transform:`translateY(100%)`}),K(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),K(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),W(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[K(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),K(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),V(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[K(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=m({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){i(`-base-slot-machine`,Oe,C(e,`clsPrefix`));let t=j(),r=j(),a=y(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return L(C(e,`value`),(e,n)=>{typeof e==`string`?(r.value=void 0,t.value=void 0):typeof n==`string`?(r.value=e,t.value=void 0):(r.value=e,t.value=n)}),()=>{let{value:i,clsPrefix:o}=e;return typeof i==`number`?(k(),g(`span`,{key:1,class:X(`${o}-base-slot-machine`)},[u(J,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>a.value.map((e,i)=>(k(),n(Ee,{clsPrefix:o,key:a.value.length-i-1,oldOriginalNumber:t.value,newOriginalNumber:r.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),u(v,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<i?(k(),n(Ee,{key:2,clsPrefix:o,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(k(),g(`span`,{key:3,class:X(`${o}-base-slot-machine`)},[w(()=>i)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:f,self:Ae},Me=U([U(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),W(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[K(`as-is`,[W(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ge({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),K(`dot`,[W(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[U(`::before`,`border-radius: 4px;`)])]),W(`badge-sup`,`
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
 `,[ge({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),W(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),U(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...l.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=m({name:`Badge`,props:Pe,setup(e,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:a}=o(e),s=l(`Badge`,`-badge`,Me,je,e,r),c=j(!1),u=()=>{c.value=!0},f=()=>{c.value=!1},p=y(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!h(n.value)));d(()=>{p.value&&(c.value=!0)});let m=t(`Badge`,a,r),g=y(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[F(`color`,t)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),_=i?D(`badge`,y(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=z(r)),t}),g,e):void 0,v=y(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${m?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:m,mergedClsPrefix:r,appeared:c,showBadge:p,handleAfterEnter:u,handleAfterLeave:f,cssVars:i?void 0:g,themeClass:_?.themeClass,onRender:_?.onRender,offsetStyle:v}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:r,$slots:i}=this;t?.();let o=i.default?.();return k(),g(`div`,{class:X([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,r,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!o}]),style:a(this.cssVars)},[w(()=>o),(k(),n(A,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(k(),g(`sup`,{key:1,class:X(`${e}-badge-sup`),title:se(this.value),style:a(this.offsetStyle)},[w(()=>_(i.value,()=>[this.dot?null:(k(),n(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(k(),n(q,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):w(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Ie=U([U(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),W(`spin-container`,`
 position: relative;
 `,[W(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[ae()])]),W(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),W(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[K(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),W(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),W(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[K(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Le={small:20,medium:18,large:16},Re={...l.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...r,strokeWidth:Number},ze=m({name:`Spin`,props:Re,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=o(e),r=l(`Spin`,`-spin`,Ie,me,e,t),i=y(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?M(t):i[F(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?D(`spin`,y(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,s=oe(e,[`spinning`,`show`]),c=j(!1);return ee(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{c.value=!0},r),t(()=>{clearTimeout(n)});return}}c.value=s.value}),{mergedClsPrefix:t,active:c,mergedStrokeWidth:y(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Le[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:r}=this,i=e.icon&&this.rotate,o=(r||e.description)&&(k(),g(`div`,{class:X(`${t}-spin-description`)},[w(()=>r||e.description?.())],2)),s=e.icon?(k(),g(`div`,{key:1,class:X([`${t}-spin-body`,this.themeClass])},[B(`div`,{class:X([`${t}-spin`,i&&`${t}-spin--rotate`]),style:a(e.default?``:this.cssVars)},[w(()=>e.icon())],6),w(()=>o)],2)):(k(),g(`div`,{key:2,class:X([`${t}-spin-body`,this.themeClass])},[(k(),n(x,{clsPrefix:t,style:a(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:X(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),w(()=>o)],2));return this.onRender?.(),e.default?(k(),g(`div`,{key:3,class:X([`${t}-spin-container`,this.themeClass]),style:a(this.cssVars)},[B(`div`,{class:X([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:a(this.contentStyle)},[w(()=>e.default?.())],6),u(A,{name:`fade-in-transition`},{default:()=>this.active?s:null},1024)],6)):s}}),Be=_e({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ve=_e({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),He={class:`flex h-full flex-col`},Ue={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},We={class:`min-w-0`},Ge={class:`truncate font-heading text-[15px] font-bold`},Ke={class:`tech-label mt-1 text-ink-4`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-[11px] text-ink-4`},$e=3e3,$=8e3,et=15e3,tt=m({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(t,{emit:r}){let i=t,o=r,l=pe(),f=j(null),m=j(!1),h=j(``),_=j(!1),v=j(null),x=j(0),C=j($),w=y(()=>f.value?.messages??[]),E=y(()=>f.value?.ticket??null),D=y(()=>E.value?.status===`closed`);function A(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function M(e){await O();let t=v.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&A()?`smooth`:`auto`})}function ee(){let e=v.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function F(){m.value=!0;try{f.value=await N.detail(i.ticketId),x.value=f.value.last_id??0,o(`changed`)}catch(e){l.error(e instanceof P?e.message:`加载工单失败`)}finally{m.value=!1}}let I=!1;async function z(){if(!I&&f.value){I=!0;try{let e=await N.messagesSince(i.ticketId,x.value);e.last_id>x.value&&(x.value=e.last_id);let t=new Set(w.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();f.value.messages.push(...n),C.value=$e,e&&!h.value.trim()&&await M(!0),o(`changed`)}else C.value=C.value<$?$:Math.min(Math.round(C.value*1.6),et);e.status&&f.value.ticket.status!==e.status&&(f.value.ticket.status=e.status,o(`changed`))}catch{C.value=et}finally{I=!1}}}async function V(){let e=h.value.trim();if(e){_.value=!0;try{await N.reply(i.ticketId,e),h.value=``,await F(),await M(!0),C.value=$e}catch(e){l.error(e instanceof P?e.message:`发送失败`)}finally{_.value=!1}}}async function U(){try{await N.setStatus(i.ticketId,D.value?`open`:`closed`),l.success(D.value?`工单已重新打开`:`工单已关闭`),await F()}catch(e){l.error(e instanceof P?e.message:`操作失败`)}}let W=Te(),{pause:K,resume:q}=we(()=>void z(),C,{immediate:!1});return L(W,e=>{e===`visible`?(z(),q()):K()}),d(async()=>{await F(),q(),await M(!1)}),L(()=>i.ticketId,async()=>{x.value=0,C.value=$,await F(),await M(!1),q()}),p(K),(r,i)=>(k(),g(`div`,He,[B(`header`,Ue,[B(`div`,We,[B(`h3`,Ge,b(E.value?.subject??`加载中…`),1),B(`p`,Ke,[c(` #`+b(t.ticketId)+` `,1),t.staff&&E.value?(k(),g(Y,{key:0},[c(` · 提交人 `+b(E.value.owner_nickname),1)],64)):R(``,!0),E.value?(k(),g(Y,{key:1},[c(` · `+b(T(Se)[E.value.status]),1)],64)):R(``,!0)])]),E.value?(k(),n(T(H),{key:0,size:`small`,quaternary:``,disabled:m.value,onClick:U},{icon:G(()=>[(k(),n(te(D.value?T(Ve):T(ye)),{size:14}))]),default:G(()=>[c(` `+b(D.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):R(``,!0)]),B(`div`,{ref_key:`scroller`,ref:v,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[u(T(ze),{show:m.value&&!w.value.length},{default:G(()=>[u(J,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:G(()=>[(k(!0),g(Y,null,e(w.value,e=>(k(),g(`li`,{key:e.id,class:s([`flex`,e.sender_id===t.currentUserId?`justify-end`:`justify-start`])},[B(`div`,qe,[B(`div`,{class:s([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,e.sender_id===t.currentUserId?`justify-end`:``])},[B(`span`,Je,b(e.sender_nickname??`（已注销）`),1),B(`span`,Ye,b(e.create_time?.slice(5,16)??``),1)],2),B(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:a(e.sender_id===t.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},b(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),B(`footer`,Xe,[u(T(Z),{value:h.value,"onUpdate:value":i[0]||=e=>h.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:D.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:D.value||_.value,onKeydown:ne(S(V,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),B(`div`,Ze,[B(`span`,Qe,b(h.value.length)+` / 1000`,1),u(T(H),{type:`primary`,size:`small`,loading:_.value,disabled:D.value||!h.value.trim(),class:`!font-bold`,onClick:V},{icon:G(()=>[u(T(xe),{size:14})]),default:G(()=>[i[1]||=c(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),nt={class:`mx-auto max-w-6xl`},rt={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},it={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},at={class:`mt-0.5 text-[13px] text-ink-3`},ot={class:`flex items-center gap-2`},st={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ct={class:`panel overflow-hidden`},lt={key:0,class:`flex flex-col gap-2 p-3`},ut={key:1,class:`grid place-items-center py-12`},dt=[`aria-current`,`onClick`],ft={class:`flex items-start justify-between gap-2`},pt={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},mt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},ht={class:`tech-label mt-1.5 text-ink-4`},gt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},_t={key:1,class:`grid h-full place-items-center py-16`},vt={class:`h-[82vh]`},yt={class:`flex justify-end gap-2`},bt=m({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(t){let r=pe(),i=j([]),o=j(0),s=j(!0),l=j(`all`),f=j(null),p=j(!1),m=j(!1),h=j(!1),_=I({subject:``,body:``}),v=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],x=y(()=>i.value.find(e=>e.id===f.value)??null);async function S(e=!1){e||(s.value=!0);try{let e=await N.list(l.value===`all`?void 0:l.value);i.value=e.tickets,o.value=e.unread_total,f.value&&!i.value.some(e=>e.id===f.value)&&(f.value=null)}catch(t){e||r.error(t instanceof P?t.message:`加载工单失败`)}finally{s.value=!1}}function C(e){f.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(p.value=!0)}async function w(){if(!_.subject.trim()||!_.body.trim()){r.warning(`标题和描述都要填`);return}h.value=!0;try{let e=await N.create(_.subject.trim(),_.body.trim());r.success(`工单已提交，等待管理员回复`),m.value=!1,_.subject=``,_.body=``,await S(),f.value=e.id}catch(e){r.error(e instanceof P?e.message:`提交失败`)}finally{h.value=!1}}let E=Te(),{pause:D,resume:O}=we(()=>void S(!0),3e4,{immediate:!1});return L(E,e=>e===`visible`?(O(),void S(!0)):D()),L(l,()=>void S()),d(async()=>{await S(),O()}),(r,d)=>(k(),g(`div`,nt,[B(`header`,rt,[B(`div`,null,[B(`h1`,it,[c(b(t.staff?`工单处理`:`问题反馈`)+` `,1),o.value?(k(),n(T(Fe),{key:0,value:o.value,type:`warning`},null,8,[`value`])):R(``,!0)]),B(`p`,at,b(t.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),B(`div`,ot,[u(T(ce),{value:l.value,"onUpdate:value":d[0]||=e=>l.value=e,options:v,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),t.staff?R(``,!0):(k(),n(T(H),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:d[1]||=e=>m.value=!0},{icon:G(()=>[u(T(be),{size:15})]),default:G(()=>[d[9]||=c(` 新建工单 `,-1)]),_:1}))])]),B(`div`,st,[B(`div`,ct,[s.value&&!i.value.length?(k(),g(`div`,lt,[(k(),g(Y,null,e(4,e=>u(T(fe),{key:e,height:`58px`,sharp:!1})),64))])):i.value.length?(k(),n(J,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:G(()=>[(k(!0),g(Y,null,e(i.value,e=>(k(),g(`li`,{key:e.id},[B(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:a({borderColor:`var(--border)`,backgroundColor:f.value===e.id?`var(--muted)`:`transparent`}),"aria-current":f.value===e.id?`true`:void 0,onClick:t=>C(e)},[B(`div`,ft,[B(`span`,pt,b(e.subject),1),e.unread?(k(),n(T(Fe),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(k(),g(`span`,{key:1,class:`tech-label shrink-0`,style:a({color:e.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},b(T(Se)[e.status]),5))]),B(`p`,mt,b(e.last_body),1),B(`p`,ht,[c(` #`+b(e.id)+` `,1),t.staff&&e.owner_nickname?(k(),g(Y,{key:0},[c(` · `+b(e.owner_nickname),1)],64)):R(``,!0),c(` · `+b(T(Ce)(e.update_time))+` · `+b(e.msg_count)+` 条 `,1)])],12,dt)]))),128))]),_:1})):(k(),g(`div`,ut,[u(T(ie),{description:t.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:G(()=>[u(T(ve),{size:30})]),_:1},8,[`description`])]))]),B(`div`,gt,[x.value?(k(),n(tt,{key:x.value.id,"ticket-id":x.value.id,staff:t.staff,"current-user-id":t.currentUserId,onChanged:d[2]||=e=>S(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(k(),g(`div`,_t,[u(T(ie),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:G(()=>[u(T(Be),{size:30})]),_:1})]))])]),u(T(ue),{show:p.value,"onUpdate:show":d[4]||=e=>p.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:G(()=>[u(T(de),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:G(()=>[B(`div`,vt,[x.value?(k(),n(tt,{key:x.value.id,"ticket-id":x.value.id,staff:t.staff,"current-user-id":t.currentUserId,onChanged:d[3]||=e=>S(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):R(``,!0)])]),_:1})]),_:1},8,[`show`]),u(T(he),{show:m.value,"onUpdate:show":d[8]||=e=>m.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:G(()=>[B(`div`,yt,[u(T(H),{quaternary:``,onClick:d[7]||=e=>m.value=!1},{default:G(()=>[...d[10]||=[c(`取消`,-1)]]),_:1}),u(T(H),{type:`primary`,class:`!font-bold`,loading:h.value,onClick:w},{default:G(()=>[...d[11]||=[c(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:G(()=>[u(T(le),{label:`标题`,"show-feedback":!1},{default:G(()=>[u(T(Z),{value:_.subject,"onUpdate:value":d[5]||=e=>_.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),u(T(le),{label:`详细描述`,"show-feedback":!1},{default:G(()=>[u(T(Z),{value:_.body,"onUpdate:value":d[6]||=e=>_.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{bt as t};