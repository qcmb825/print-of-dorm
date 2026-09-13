import{$t as e,C as t,Cn as n,D as r,Dn as i,En as a,I as o,Jn as s,Kn as c,L as l,Nn as u,O as d,Qt as f,R as p,Rn as m,Sn as h,T as g,Tn as _,Un as v,Vn as y,Yn as b,Zn as x,_ as S,_r as C,_t as w,ar as T,bn as E,dt as D,fr as O,gn as k,gr as A,hr as j,ht as M,in as N,l as P,ln as F,lt as ee,m as te,mn as ne,mt as I,nn as L,o as R,p as re,pn as ie,s as z,sr as B,tn as ae,un as oe,v as se,vr as V,w as ce,wn as H,xn as U,yt as W}from"./endpoints-BzNG02YK.js";import{f as le,t as G}from"./fade-in-scale-up.cssr-6X4IxNMz.js";import{d as ue}from"./Popover-Clul5osh.js";import{t as K}from"./Empty-5DowR1d3.js";import{a as de,t as fe}from"./Select-Bz9XFvtb.js";import{t as q}from"./FormItem-Df9ez1_O.js";import{t as J}from"./Input-CfXXkHU_.js";import{n as pe,t as me}from"./DrawerContent-DoM0uyvE.js";import{t as he}from"./Skeleton-CUtvLHr9.js";import{_ as ge,f as _e,g as Y}from"./index-BX2avFHL.js";import{t as X}from"./createLucideIcon-qotzimkC.js";import{i as ve,r as ye,t as be}from"./dist-DslU0kq7.js";import{t as xe}from"./lock-B8uqdGzL.js";import{t as Se}from"./plus-CKIItVfc.js";import{s as Z,u as Ce}from"./format-DiIJfET2.js";var Q=i({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=B(null),n=B(e.value),r=B(e.value),i=B(`up`),a=B(!1),o=E(()=>a.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),c=E(()=>a.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);s(O(e,`value`),(e,t)=>{n.value=t,r.value=e,u(l)});function l(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?d(`up`):n>t&&d(`down`))}function d(e){i.value=e,a.value=!1,u(()=>{t.value?.offsetWidth,a.value=!0})}return()=>{let{clsPrefix:i}=e;return y(),H(`span`,{ref:t,class:D(`${i}-base-slot-machine-number`)},[n.value===null?I(()=>null):(y(),H(`span`,{key:0,class:D([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,c.value])},[I(()=>n.value)],2)),U(`span`,{class:D([`${i}-base-slot-machine-current-number`,o.value])},[U(`span`,{ref:`numberWrapper`,class:D([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[I(()=>r.value)],2)],2),n.value===null?I(()=>null):(y(),H(`span`,{key:2,class:D([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,c.value])},[I(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:$}=w;function we({duration:e=`.2s`}={}){return[f(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${$},
 max-width ${e} ${$},
 transform ${e} ${$}
 `}),f(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${$},
 max-width ${e} ${$},
 transform ${e} ${$}
 `}),f(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),f(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),f(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),f(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Te=f([f(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),f(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),f(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),f(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),e(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[e(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[we({duration:`.2s`}),te({duration:`.2s`,delay:`0s`}),e(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[L(`top`,{transform:`translateY(-100%)`}),L(`bottom`,{transform:`translateY(100%)`}),L(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),L(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),e(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[L(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),L(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),ae(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[L(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),Ee=i({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){M(`-base-slot-machine`,Te,O(e,`clsPrefix`));let n=B(),r=B(),i=E(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return s(O(e,`value`),(e,t)=>{typeof e==`string`?(r.value=void 0,n.value=void 0):typeof t==`string`?(r.value=e,n.value=void 0):(r.value=e,n.value=t)}),()=>{let{value:o,clsPrefix:s}=e;return typeof o==`number`?(y(),H(`span`,{key:1,class:D(`${s}-base-slot-machine`)},[a(oe,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>i.value.map((e,t)=>(y(),h(Q,{clsPrefix:s,key:i.value.length-t-1,oldOriginalNumber:n.value,newOriginalNumber:r.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),a(t,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<o?(y(),h(Q,{key:2,clsPrefix:s,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(y(),H(`span`,{key:3,class:D(`${s}-base-slot-machine`)},[I(()=>o)],2))}}});function De(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Oe={name:`Badge`,common:p,self:De},ke=f([f(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),e(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[L(`as-is`,[e(`badge-sup`,{position:`static`,transform:`translateX(0)`},[G({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),L(`dot`,[e(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[f(`::before`,`border-radius: 4px;`)])]),e(`badge-sup`,`
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
 `,[G({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),e(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),f(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ae=[`title`],je={...o.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Me=i({name:`Badge`,props:je,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedRtlRef:a}=W(e),s=o(`Badge`,`-badge`,ke,Oe,e,n),c=B(!1),u=()=>{c.value=!0},d=()=>{c.value=!1},f=E(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!r(t.value)));m(()=>{f.value&&(c.value=!0)});let p=g(`Badge`,a,n),h=E(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[N(`color`,t)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),_=i?l(`badge`,E(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=ce(r)),t}),h,e):void 0,v=E(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${p?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:p,mergedClsPrefix:n,appeared:c,showBadge:f,handleAfterEnter:u,handleAfterLeave:d,cssVars:i?void 0:h,themeClass:_?.themeClass,onRender:_?.onRender,offsetStyle:v}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return y(),H(`div`,{class:D([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:C(this.cssVars)},[I(()=>i),(y(),h(F,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(y(),H(`sup`,{key:1,class:D(`${e}-badge-sup`),title:de(this.value),style:C(this.offsetStyle)},[I(()=>d(r.value,()=>[this.dot?null:(y(),h(Ee,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(y(),h(re,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):I(()=>null)],14,Ae)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Ne=f([f(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),e(`spin-container`,`
 position: relative;
 `,[e(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[le()])]),e(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),e(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[L(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),e(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),e(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[L(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Pe={small:20,medium:18,large:16},Fe={...o.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...se,strokeWidth:Number},Ie=i({name:`Spin`,props:Fe,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=W(e),r=o(`Spin`,`-spin`,Ne,_e,e,t),i=E(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?ee(t):i[N(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?l(`spin`,E(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,s=ue(e,[`spinning`,`show`]),c=B(!1);return b(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{c.value=!0},r),t(()=>{clearTimeout(n)});return}}c.value=s.value}),{mergedClsPrefix:t,active:c,mergedStrokeWidth:E(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Pe[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,i=(n||e.description)&&(y(),H(`div`,{class:D(`${t}-spin-description`)},[I(()=>n||e.description?.())],2)),o=e.icon?(y(),H(`div`,{key:1,class:D([`${t}-spin-body`,this.themeClass])},[U(`div`,{class:D([`${t}-spin`,r&&`${t}-spin--rotate`]),style:C(e.default?``:this.cssVars)},[I(()=>e.icon())],6),I(()=>i)],2)):(y(),H(`div`,{key:2,class:D([`${t}-spin-body`,this.themeClass])},[(y(),h(S,{clsPrefix:t,style:C(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:D(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),I(()=>i)],2));return this.onRender?.(),e.default?(y(),H(`div`,{key:3,class:D([`${t}-spin-container`,this.themeClass]),style:C(this.cssVars)},[U(`div`,{class:D([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:C(this.contentStyle)},[I(()=>e.default?.())],6),a(F,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),Le=X({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Re=X({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),ze=X({name:`send`,size:24,node:[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]}),Be={class:`flex h-full flex-col`},Ve={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},He={class:`min-w-0`},Ue={class:`truncate font-heading text-[15px] font-bold`},We={class:`tech-label mt-1 text-ink-4`},Ge={class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},Ke={class:`flex list-none flex-col gap-3 p-0`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-[11px] text-ink-4`},$e=i({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:t}){let r=e,i=t,o=Y(),l=B(null),u=B(!1),d=B(``),f=B(!1),p=E(()=>l.value?.messages??[]),g=E(()=>l.value?.ticket??null),b=E(()=>g.value?.status===`closed`);async function S(){u.value=!0;try{l.value=await R.detail(r.ticketId),i(`changed`)}catch(e){o.error(e instanceof z?e.message:`加载工单失败`)}finally{u.value=!1}}async function w(){let e=d.value.trim();if(e){f.value=!0;try{await R.reply(r.ticketId,e),d.value=``,await S()}catch(e){o.error(e instanceof z?e.message:`发送失败`)}finally{f.value=!1}}}async function T(){try{await R.setStatus(r.ticketId,b.value?`open`:`closed`),o.success(b.value?`工单已重新打开`:`工单已关闭`),await S()}catch(e){o.error(e instanceof z?e.message:`操作失败`)}}return m(S),s(()=>r.ticketId,S),(t,r)=>(y(),H(`div`,Be,[U(`header`,Ve,[U(`div`,He,[U(`h3`,Ue,V(g.value?.subject??`加载中…`),1),U(`p`,We,[_(` #`+V(e.ticketId)+` `,1),e.staff&&g.value?(y(),H(k,{key:0},[_(` · 提交人 `+V(g.value.owner_nickname),1)],64)):n(``,!0),g.value?(y(),H(k,{key:1},[_(` · `+V(j(Z)[g.value.status]),1)],64)):n(``,!0)])]),g.value?(y(),h(j(P),{key:0,size:`small`,quaternary:``,disabled:u.value,onClick:T},{icon:x(()=>[(y(),h(c(b.value?j(Re):j(xe)),{size:14}))]),default:x(()=>[_(` `+V(b.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):n(``,!0)]),U(`div`,Ge,[a(j(Ie),{show:u.value&&!p.value.length},{default:x(()=>[U(`ul`,Ke,[(y(!0),H(k,null,v(p.value,t=>(y(),H(`li`,{key:t.id,class:A([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[U(`div`,qe,[U(`div`,{class:A([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,t.sender_id===e.currentUserId?`justify-end`:``])},[U(`span`,Je,V(t.sender_nickname??`（已注销）`),1),U(`span`,Ye,V(t.create_time?.slice(5,16)??``),1)],2),U(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:C(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},V(t.body),5)])],2))),128))])]),_:1},8,[`show`])]),U(`footer`,Xe,[a(j(J),{value:d.value,"onUpdate:value":r[0]||=e=>d.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:b.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:b.value||f.value,onKeydown:ie(ne(w,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),U(`div`,Ze,[U(`span`,Qe,V(d.value.length)+` / 1000`,1),a(j(P),{type:`primary`,size:`small`,loading:f.value,disabled:b.value||!d.value.trim(),class:`!font-bold`,onClick:w},{icon:x(()=>[a(j(ze),{size:14})]),default:x(()=>[r[1]||=_(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),et={class:`mx-auto max-w-6xl`},tt={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},nt={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},rt={class:`mt-0.5 text-[13px] text-ink-3`},it={class:`flex items-center gap-2`},at={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ot={class:`panel overflow-hidden`},st={key:0,class:`flex flex-col gap-2 p-3`},ct={key:1,class:`grid place-items-center py-12`},lt={key:2,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`},ut=[`aria-current`,`onClick`],dt={class:`flex items-start justify-between gap-2`},ft={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},pt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},mt={class:`tech-label mt-1.5 text-ink-4`},ht={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},gt={key:1,class:`grid h-full place-items-center py-16`},_t={class:`h-[82vh]`},vt={class:`flex justify-end gap-2`},yt=i({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let t=Y(),r=B([]),i=B(0),o=B(!0),c=B(`all`),l=B(null),u=B(!1),d=B(!1),f=B(!1),p=T({subject:``,body:``}),g=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],b=E(()=>r.value.find(e=>e.id===l.value)??null);async function S(e=!1){e||(o.value=!0);try{let e=await R.list(c.value===`all`?void 0:c.value);r.value=e.tickets,i.value=e.unread_total,l.value&&!r.value.some(e=>e.id===l.value)&&(l.value=null)}catch(n){e||t.error(n instanceof z?n.message:`加载工单失败`)}finally{o.value=!1}}function w(e){l.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(u.value=!0)}async function D(){if(!p.subject.trim()||!p.body.trim()){t.warning(`标题和描述都要填`);return}f.value=!0;try{let e=await R.create(p.subject.trim(),p.body.trim());t.success(`工单已提交，等待管理员回复`),d.value=!1,p.subject=``,p.body=``,await S(),l.value=e.id}catch(e){t.error(e instanceof z?e.message:`提交失败`)}finally{f.value=!1}}let O=be(),{pause:A,resume:M}=ye(()=>void S(!0),3e4,{immediate:!1});return s(O,e=>e===`visible`?(M(),void S(!0)):A()),s(c,()=>void S()),m(async()=>{await S(),M()}),(t,s)=>(y(),H(`div`,et,[U(`header`,tt,[U(`div`,null,[U(`h1`,nt,[_(V(e.staff?`工单处理`:`问题反馈`)+` `,1),i.value?(y(),h(j(Me),{key:0,value:i.value,type:`warning`},null,8,[`value`])):n(``,!0)]),U(`p`,rt,V(e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),U(`div`,it,[a(j(fe),{value:c.value,"onUpdate:value":s[0]||=e=>c.value=e,options:g,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?n(``,!0):(y(),h(j(P),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:s[1]||=e=>d.value=!0},{icon:x(()=>[a(j(Se),{size:15})]),default:x(()=>[s[9]||=_(` 新建工单 `,-1)]),_:1}))])]),U(`div`,at,[U(`div`,ot,[o.value&&!r.value.length?(y(),H(`div`,st,[(y(),H(k,null,v(4,e=>a(j(he),{key:e,height:`58px`,sharp:!1})),64))])):r.value.length?(y(),H(`ul`,lt,[(y(!0),H(k,null,v(r.value,t=>(y(),H(`li`,{key:t.id},[U(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:C({borderColor:`var(--border)`,backgroundColor:l.value===t.id?`var(--muted)`:`transparent`}),"aria-current":l.value===t.id?`true`:void 0,onClick:e=>w(t)},[U(`div`,dt,[U(`span`,ft,V(t.subject),1),t.unread?(y(),h(j(Me),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(y(),H(`span`,{key:1,class:`tech-label shrink-0`,style:C({color:t.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},V(j(Z)[t.status]),5))]),U(`p`,pt,V(t.last_body),1),U(`p`,mt,[_(` #`+V(t.id)+` `,1),e.staff&&t.owner_nickname?(y(),H(k,{key:0},[_(` · `+V(t.owner_nickname),1)],64)):n(``,!0),_(` · `+V(j(Ce)(t.update_time))+` · `+V(t.msg_count)+` 条 `,1)])],12,ut)]))),128))])):(y(),H(`div`,ct,[a(j(K),{description:e.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:x(()=>[a(j(ve),{size:30})]),_:1},8,[`description`])]))]),U(`div`,ht,[b.value?(y(),h($e,{key:b.value.id,"ticket-id":b.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:s[2]||=e=>S(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(y(),H(`div`,gt,[a(j(K),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:x(()=>[a(j(Le),{size:30})]),_:1})]))])]),a(j(pe),{show:u.value,"onUpdate:show":s[4]||=e=>u.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:x(()=>[a(j(me),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:x(()=>[U(`div`,_t,[b.value?(y(),h($e,{key:b.value.id,"ticket-id":b.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:s[3]||=e=>S(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):n(``,!0)])]),_:1})]),_:1},8,[`show`]),a(j(ge),{show:d.value,"onUpdate:show":s[8]||=e=>d.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:x(()=>[U(`div`,vt,[a(j(P),{quaternary:``,onClick:s[7]||=e=>d.value=!1},{default:x(()=>[...s[10]||=[_(`取消`,-1)]]),_:1}),a(j(P),{type:`primary`,class:`!font-bold`,loading:f.value,onClick:D},{default:x(()=>[...s[11]||=[_(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:x(()=>[a(j(q),{label:`标题`,"show-feedback":!1},{default:x(()=>[a(j(J),{value:p.subject,"onUpdate:value":s[5]||=e=>p.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),a(j(q),{label:`详细描述`,"show-feedback":!1},{default:x(()=>[a(j(J),{value:p.body,"onUpdate:value":s[6]||=e=>p.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{yt as t};