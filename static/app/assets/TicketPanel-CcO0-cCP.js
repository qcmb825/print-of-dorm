import{$n as e,$t as t,Bn as n,Cn as r,Dn as i,E as a,Fn as o,Gn as s,Jn as c,L as l,O as u,On as d,R as f,Rn as p,Sn as m,T as h,Tn as g,Un as _,Xn as v,Zn as y,_n as b,_r as x,an as S,br as C,bt as w,c as T,dn as E,en as D,ft as O,gt as k,h as A,hn as ee,ht as j,k as M,kn as N,lr as P,m as F,mn as te,mr as I,nn as L,rn as R,s as z,sr as B,u as V,un as H,ut as ne,v as re,vr as ie,vt as U,w as W,wn as G,xn as K,y as ae,yr as q,z as oe}from"./endpoints-Bo2NXLxK.js";import{f as se,t as ce}from"./fade-in-scale-up.cssr-OU0FjBQD.js";import{d as le}from"./Popover-D-j5JW7o.js";import{t as ue}from"./Empty-BU5TN0cX.js";import{a as de,t as fe}from"./Select-DjuS3S1D.js";import{t as pe}from"./FormItem-BuZ9P6tF.js";import{t as J}from"./Input-BKIQbtm5.js";import{n as me,t as he}from"./DrawerContent-BRQzcdOX.js";import{t as ge}from"./Skeleton-CX13lyvs.js";import{b as _e,h as ve,y as ye}from"./index-CKvuuz9X.js";import{t as Y}from"./createLucideIcon-WrAfef2P.js";import{i as be,r as xe,t as X}from"./dist-DsskeZ3b.js";import{t as Se}from"./lock-iezAmB14.js";import{t as Ce}from"./plus-C5ZkAIAU.js";import{s as we,u as Te}from"./format-DiIJfET2.js";var Ee=N({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=P(null),n=P(e.value),r=P(e.value),i=P(`up`),a=P(!1),s=K(()=>a.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),c=K(()=>a.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);v(I(e,`value`),(e,t)=>{n.value=t,r.value=e,o(l)});function l(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?u(`up`):n>t&&u(`down`))}function u(e){i.value=e,a.value=!1,o(()=>{t.value?.offsetWidth,a.value=!0})}return()=>{let{clsPrefix:i}=e;return _(),g(`span`,{ref:t,class:O(`${i}-base-slot-machine-number`)},[n.value===null?j(()=>null):(_(),g(`span`,{key:0,class:O([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,c.value])},[j(()=>n.value)],2)),m(`span`,{class:O([`${i}-base-slot-machine-current-number`,s.value])},[m(`span`,{ref:`numberWrapper`,class:O([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[j(()=>r.value)],2)],2),n.value===null?j(()=>null):(_(),g(`span`,{key:2,class:O([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,c.value])},[j(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Z}=U;function De({duration:e=`.2s`}={}){return[t(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Z},
 max-width ${e} ${Z},
 transform ${e} ${Z}
 `}),t(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Z},
 max-width ${e} ${Z},
 transform ${e} ${Z}
 `}),t(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),t(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),t(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),t(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=t([t(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),t(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),t(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),t(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),D(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[D(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),A({duration:`.2s`,delay:`0s`}),D(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[R(`top`,{transform:`translateY(-100%)`}),R(`bottom`,{transform:`translateY(100%)`}),R(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),R(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),D(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[R(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),R(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),L(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[R(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=N({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){k(`-base-slot-machine`,Oe,I(e,`clsPrefix`));let t=P(),n=P(),i=K(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return v(I(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:a,clsPrefix:o}=e;return typeof a==`number`?(_(),g(`span`,{key:1,class:O(`${o}-base-slot-machine`)},[d(E,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>i.value.map((e,a)=>(_(),r(Ee,{clsPrefix:o,key:i.value.length-a-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),d(W,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<a?(_(),r(Ee,{key:2,clsPrefix:o,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(_(),g(`span`,{key:3,class:O(`${o}-base-slot-machine`)},[j(()=>a)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:oe,self:Ae},Me=t([t(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),D(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[R(`as-is`,[D(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ce({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),R(`dot`,[D(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[t(`::before`,`border-radius: 4px;`)])]),D(`badge-sup`,`
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
 `,[ce({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),D(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),t(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...l.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=N({name:`Badge`,props:Pe,setup(e,{slots:t}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:o}=w(e),s=l(`Badge`,`-badge`,Me,je,e,r),c=P(!1),d=()=>{c.value=!0},p=()=>{c.value=!1},m=K(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!u(t.value)));n(()=>{m.value&&(c.value=!0)});let g=a(`Badge`,o,r),_=K(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[S(`color`,t)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),v=i?f(`badge`,K(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=h(r)),t}),_,e):void 0,y=K(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${g?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:g,mergedClsPrefix:r,appeared:c,showBadge:m,handleAfterEnter:d,handleAfterLeave:p,cssVars:i?void 0:_,themeClass:v?.themeClass,onRender:v?.onRender,offsetStyle:y}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:i}=this;t?.();let a=i.default?.();return _(),g(`div`,{class:O([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!a}]),style:q(this.cssVars)},[j(()=>a),(_(),r(H,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(_(),g(`sup`,{key:1,class:O(`${e}-badge-sup`),title:de(this.value),style:q(this.offsetStyle)},[j(()=>M(i.value,()=>[this.dot?null:(_(),r(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(_(),r(F,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):j(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Ie=t([t(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),D(`spin-container`,`
 position: relative;
 `,[D(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[se()])]),D(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),D(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[R(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),D(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),D(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[R(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Le={small:20,medium:18,large:16},Re={...l.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...ae,strokeWidth:Number},ze=N({name:`Spin`,props:Re,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=w(e),r=l(`Spin`,`-spin`,Ie,ve,e,t),i=K(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?ne(t):i[S(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?f(`spin`,K(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,o=le(e,[`spinning`,`show`]),s=P(!1);return y(t=>{let n;if(o.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{s.value=!0},r),t(()=>{clearTimeout(n)});return}}s.value=o.value}),{mergedClsPrefix:t,active:s,mergedStrokeWidth:K(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Le[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,i=e.icon&&this.rotate,a=(n||e.description)&&(_(),g(`div`,{class:O(`${t}-spin-description`)},[j(()=>n||e.description?.())],2)),o=e.icon?(_(),g(`div`,{key:1,class:O([`${t}-spin-body`,this.themeClass])},[m(`div`,{class:O([`${t}-spin`,i&&`${t}-spin--rotate`]),style:q(e.default?``:this.cssVars)},[j(()=>e.icon())],6),j(()=>a)],2)):(_(),g(`div`,{key:2,class:O([`${t}-spin-body`,this.themeClass])},[(_(),r(re,{clsPrefix:t,style:q(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:O(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),j(()=>a)],2));return this.onRender?.(),e.default?(_(),g(`div`,{key:3,class:O([`${t}-spin-container`,this.themeClass]),style:q(this.cssVars)},[m(`div`,{class:O([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:q(this.contentStyle)},[j(()=>e.default?.())],6),d(H,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),Be=Y({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ve=Y({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),He=Y({name:`send`,size:24,node:[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]}),Ue={class:`flex h-full flex-col`},We={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ge={class:`min-w-0`},Ke={class:`truncate font-heading text-[15px] font-bold`},qe={class:`tech-label mt-1 text-ink-4`},Je={class:`max-w-[86%]`},Ye={class:`font-semibold`},Xe={class:`tnum`},Ze={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Qe={class:`mt-2 flex items-center justify-between gap-3`},$e={class:`tnum text-[11px] text-ink-4`},et=3e3,Q=8e3,tt=15e3,$=N({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(t,{emit:a}){let l=t,u=a,f=ye(),h=P(null),y=P(!1),S=P(``),w=P(!1),D=P(null),O=P(0),k=P(Q),A=K(()=>h.value?.messages??[]),j=K(()=>h.value?.ticket??null),M=K(()=>j.value?.status===`closed`);function N(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function F(e){await o();let t=D.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&N()?`smooth`:`auto`})}function I(){let e=D.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function L(){y.value=!0;try{h.value=await z.detail(l.ticketId),O.value=h.value.last_id??0,u(`changed`)}catch(e){f.error(e instanceof T?e.message:`加载工单失败`)}finally{y.value=!1}}let R=!1;async function B(){if(!R&&h.value){R=!0;try{let e=await z.messagesSince(l.ticketId,O.value);e.last_id>O.value&&(O.value=e.last_id);let t=new Set(A.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=I();h.value.messages.push(...n),k.value=et,e&&!S.value.trim()&&await F(!0),u(`changed`)}else k.value=k.value<Q?Q:Math.min(Math.round(k.value*1.6),tt);e.status&&h.value.ticket.status!==e.status&&(h.value.ticket.status=e.status,u(`changed`))}catch{k.value=tt}finally{R=!1}}}async function H(){let e=S.value.trim();if(e){w.value=!0;try{await z.reply(l.ticketId,e),S.value=``,await L(),await F(!0),k.value=et}catch(e){f.error(e instanceof T?e.message:`发送失败`)}finally{w.value=!1}}}async function ne(){try{await z.setStatus(l.ticketId,M.value?`open`:`closed`),f.success(M.value?`工单已重新打开`:`工单已关闭`),await L()}catch(e){f.error(e instanceof T?e.message:`操作失败`)}}let re=X(),{pause:U,resume:W}=xe(()=>void B(),k,{immediate:!1});return v(re,e=>{e===`visible`?(B(),W()):U()}),n(async()=>{await L(),W(),await F(!1)}),v(()=>l.ticketId,async()=>{O.value=0,k.value=Q,await L(),await F(!1),W()}),p(U),(n,a)=>(_(),g(`div`,Ue,[m(`header`,We,[m(`div`,Ge,[m(`h3`,Ke,C(j.value?.subject??`加载中…`),1),m(`p`,qe,[i(` #`+C(t.ticketId)+` `,1),t.staff&&j.value?(_(),g(b,{key:0},[i(` · 提交人 `+C(j.value.owner_nickname),1)],64)):G(``,!0),j.value?(_(),g(b,{key:1},[i(` · `+C(x(we)[j.value.status]),1)],64)):G(``,!0)])]),j.value?(_(),r(x(V),{key:0,size:`small`,quaternary:``,disabled:y.value,onClick:ne},{icon:e(()=>[(_(),r(c(M.value?x(Ve):x(Se)),{size:14}))]),default:e(()=>[i(` `+C(M.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):G(``,!0)]),m(`div`,{ref_key:`scroller`,ref:D,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[d(x(ze),{show:y.value&&!A.value.length},{default:e(()=>[d(E,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:e(()=>[(_(!0),g(b,null,s(A.value,e=>(_(),g(`li`,{key:e.id,class:ie([`flex`,e.sender_id===t.currentUserId?`justify-end`:`justify-start`])},[m(`div`,Je,[m(`div`,{class:ie([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,e.sender_id===t.currentUserId?`justify-end`:``])},[m(`span`,Ye,C(e.sender_nickname??`（已注销）`),1),m(`span`,Xe,C(e.create_time?.slice(5,16)??``),1)],2),m(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:q(e.sender_id===t.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},C(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),m(`footer`,Ze,[d(x(J),{value:S.value,"onUpdate:value":a[0]||=e=>S.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:M.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:M.value||w.value,onKeydown:te(ee(H,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),m(`div`,Qe,[m(`span`,$e,C(S.value.length)+` / 1000`,1),d(x(V),{type:`primary`,size:`small`,loading:w.value,disabled:M.value||!S.value.trim(),class:`!font-bold`,onClick:H},{icon:e(()=>[d(x(He),{size:14})]),default:e(()=>[a[1]||=i(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),nt={class:`mx-auto max-w-6xl`},rt={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},it={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},at={class:`mt-0.5 text-[13px] text-ink-3`},ot={class:`flex items-center gap-2`},st={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ct={class:`panel overflow-hidden`},lt={key:0,class:`flex flex-col gap-2 p-3`},ut={key:1,class:`grid place-items-center py-12`},dt=[`aria-current`,`onClick`],ft={class:`flex items-start justify-between gap-2`},pt={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},mt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},ht={class:`tech-label mt-1.5 text-ink-4`},gt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},_t={key:1,class:`grid h-full place-items-center py-16`},vt={class:`h-[82vh]`},yt={class:`flex justify-end gap-2`},bt=N({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(t){let a=ye(),o=P([]),c=P(0),l=P(!0),u=P(`all`),f=P(null),p=P(!1),h=P(!1),y=P(!1),S=B({subject:``,body:``}),w=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],D=K(()=>o.value.find(e=>e.id===f.value)??null);async function O(e=!1){e||(l.value=!0);try{let e=await z.list(u.value===`all`?void 0:u.value);o.value=e.tickets,c.value=e.unread_total,f.value&&!o.value.some(e=>e.id===f.value)&&(f.value=null)}catch(t){e||a.error(t instanceof T?t.message:`加载工单失败`)}finally{l.value=!1}}function k(e){f.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(p.value=!0)}async function A(){if(!S.subject.trim()||!S.body.trim()){a.warning(`标题和描述都要填`);return}y.value=!0;try{let e=await z.create(S.subject.trim(),S.body.trim());a.success(`工单已提交，等待管理员回复`),h.value=!1,S.subject=``,S.body=``,await O(),f.value=e.id}catch(e){a.error(e instanceof T?e.message:`提交失败`)}finally{y.value=!1}}let ee=X(),{pause:j,resume:M}=xe(()=>void O(!0),3e4,{immediate:!1});return v(ee,e=>e===`visible`?(M(),void O(!0)):j()),v(u,()=>void O()),n(async()=>{await O(),M()}),(n,a)=>(_(),g(`div`,nt,[m(`header`,rt,[m(`div`,null,[m(`h1`,it,[i(C(t.staff?`工单处理`:`问题反馈`)+` `,1),c.value?(_(),r(x(Fe),{key:0,value:c.value,type:`warning`},null,8,[`value`])):G(``,!0)]),m(`p`,at,C(t.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),m(`div`,ot,[d(x(fe),{value:u.value,"onUpdate:value":a[0]||=e=>u.value=e,options:w,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),t.staff?G(``,!0):(_(),r(x(V),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:a[1]||=e=>h.value=!0},{icon:e(()=>[d(x(Ce),{size:15})]),default:e(()=>[a[9]||=i(` 新建工单 `,-1)]),_:1}))])]),m(`div`,st,[m(`div`,ct,[l.value&&!o.value.length?(_(),g(`div`,lt,[(_(),g(b,null,s(4,e=>d(x(ge),{key:e,height:`58px`,sharp:!1})),64))])):o.value.length?(_(),r(E,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:e(()=>[(_(!0),g(b,null,s(o.value,e=>(_(),g(`li`,{key:e.id},[m(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:q({borderColor:`var(--border)`,backgroundColor:f.value===e.id?`var(--muted)`:`transparent`}),"aria-current":f.value===e.id?`true`:void 0,onClick:t=>k(e)},[m(`div`,ft,[m(`span`,pt,C(e.subject),1),e.unread?(_(),r(x(Fe),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(_(),g(`span`,{key:1,class:`tech-label shrink-0`,style:q({color:e.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},C(x(we)[e.status]),5))]),m(`p`,mt,C(e.last_body),1),m(`p`,ht,[i(` #`+C(e.id)+` `,1),t.staff&&e.owner_nickname?(_(),g(b,{key:0},[i(` · `+C(e.owner_nickname),1)],64)):G(``,!0),i(` · `+C(x(Te)(e.update_time))+` · `+C(e.msg_count)+` 条 `,1)])],12,dt)]))),128))]),_:1})):(_(),g(`div`,ut,[d(x(ue),{description:t.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:e(()=>[d(x(be),{size:30})]),_:1},8,[`description`])]))]),m(`div`,gt,[D.value?(_(),r($,{key:D.value.id,"ticket-id":D.value.id,staff:t.staff,"current-user-id":t.currentUserId,onChanged:a[2]||=e=>O(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(_(),g(`div`,_t,[d(x(ue),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:e(()=>[d(x(Be),{size:30})]),_:1})]))])]),d(x(me),{show:p.value,"onUpdate:show":a[4]||=e=>p.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:e(()=>[d(x(he),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:e(()=>[m(`div`,vt,[D.value?(_(),r($,{key:D.value.id,"ticket-id":D.value.id,staff:t.staff,"current-user-id":t.currentUserId,onChanged:a[3]||=e=>O(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):G(``,!0)])]),_:1})]),_:1},8,[`show`]),d(x(_e),{show:h.value,"onUpdate:show":a[8]||=e=>h.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:e(()=>[m(`div`,yt,[d(x(V),{quaternary:``,onClick:a[7]||=e=>h.value=!1},{default:e(()=>[...a[10]||=[i(`取消`,-1)]]),_:1}),d(x(V),{type:`primary`,class:`!font-bold`,loading:y.value,onClick:A},{default:e(()=>[...a[11]||=[i(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:e(()=>[d(x(pe),{label:`标题`,"show-feedback":!1},{default:e(()=>[d(x(J),{value:S.subject,"onUpdate:value":a[5]||=e=>S.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),d(x(pe),{label:`详细描述`,"show-feedback":!1},{default:e(()=>[d(x(J),{value:S.body,"onUpdate:value":a[6]||=e=>S.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{bt as t};