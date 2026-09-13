import{$t as e,C as t,Cn as n,D as r,Dn as i,En as a,I as o,Jn as s,Kn as c,L as l,Nn as u,O as d,Qt as f,R as p,Rn as m,Sn as h,T as g,Tn as _,Un as v,Vn as y,Yn as b,Zn as x,_ as S,_r as C,_t as w,ar as T,bn as E,dt as D,fr as O,gn as k,gr as A,hr as j,ht as M,in as N,l as P,ln as F,lt as ee,m as te,mn as ne,mt as I,nn as L,o as R,p as re,pn as ie,s as z,sr as B,tn as ae,un as V,v as oe,vr as H,w as se,wn as U,xn as W,yt as G}from"./endpoints-BzNG02YK.js";import{f as ce,t as K}from"./fade-in-scale-up.cssr-6X4IxNMz.js";import{d as le}from"./Popover-Clul5osh.js";import{t as q}from"./Empty-fFh0O0Wj.js";import{a as ue,t as de}from"./Select-B_WX1oDt.js";import{t as J}from"./FormItem-Dlagug_L.js";import{t as Y}from"./Input-CcMAVrek.js";import{n as fe,t as pe}from"./DrawerContent-DMlclj27.js";import{t as me}from"./Skeleton-CUtvLHr9.js";import{b as he,h as ge,y as X}from"./index-L7aRyXhJ.js";import{t as Z}from"./createLucideIcon-qotzimkC.js";import{i as _e,r as ve,t as ye}from"./dist-DslU0kq7.js";import{t as be}from"./lock-B8uqdGzL.js";import{t as xe}from"./plus-CKIItVfc.js";import{s as Se,u as Ce}from"./format-DiIJfET2.js";var we=i({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=B(null),n=B(e.value),r=B(e.value),i=B(`up`),a=B(!1),o=E(()=>a.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),c=E(()=>a.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);s(O(e,`value`),(e,t)=>{n.value=t,r.value=e,u(l)});function l(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?d(`up`):n>t&&d(`down`))}function d(e){i.value=e,a.value=!1,u(()=>{t.value?.offsetWidth,a.value=!0})}return()=>{let{clsPrefix:i}=e;return y(),U(`span`,{ref:t,class:D(`${i}-base-slot-machine-number`)},[n.value===null?I(()=>null):(y(),U(`span`,{key:0,class:D([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,c.value])},[I(()=>n.value)],2)),W(`span`,{class:D([`${i}-base-slot-machine-current-number`,o.value])},[W(`span`,{ref:`numberWrapper`,class:D([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[I(()=>r.value)],2)],2),n.value===null?I(()=>null):(y(),U(`span`,{key:2,class:D([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,c.value])},[I(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=w;function Te({duration:e=`.2s`}={}){return[f(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),f(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),f(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),f(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),f(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),f(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Ee=f([f(`@keyframes n-base-slot-machine-fade-up-in`,`
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
 `,[Te({duration:`.2s`}),te({duration:`.2s`,delay:`0s`}),e(`base-slot-machine-old-number`,`
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
 `)])])])])]),De=i({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){M(`-base-slot-machine`,Ee,O(e,`clsPrefix`));let n=B(),r=B(),i=E(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return s(O(e,`value`),(e,t)=>{typeof e==`string`?(r.value=void 0,n.value=void 0):typeof t==`string`?(r.value=e,n.value=void 0):(r.value=e,n.value=t)}),()=>{let{value:o,clsPrefix:s}=e;return typeof o==`number`?(y(),U(`span`,{key:1,class:D(`${s}-base-slot-machine`)},[a(V,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>i.value.map((e,t)=>(y(),h(we,{clsPrefix:s,key:i.value.length-t-1,oldOriginalNumber:n.value,newOriginalNumber:r.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),a(t,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<o?(y(),h(we,{key:2,clsPrefix:s,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(y(),U(`span`,{key:3,class:D(`${s}-base-slot-machine`)},[I(()=>o)],2))}}});function Oe(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var ke={name:`Badge`,common:p,self:Oe},Ae=f([f(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),e(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[L(`as-is`,[e(`badge-sup`,{position:`static`,transform:`translateX(0)`},[K({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),L(`dot`,[e(`badge-sup`,`
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
 `,[K({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),e(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),f(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),je=[`title`],Me={...o.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Ne=i({name:`Badge`,props:Me,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedRtlRef:a}=G(e),s=o(`Badge`,`-badge`,Ae,ke,e,n),c=B(!1),u=()=>{c.value=!0},d=()=>{c.value=!1},f=E(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!r(t.value)));m(()=>{f.value&&(c.value=!0)});let p=g(`Badge`,a,n),h=E(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[N(`color`,t)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),_=i?l(`badge`,E(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=se(r)),t}),h,e):void 0,v=E(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${p?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:p,mergedClsPrefix:n,appeared:c,showBadge:f,handleAfterEnter:u,handleAfterLeave:d,cssVars:i?void 0:h,themeClass:_?.themeClass,onRender:_?.onRender,offsetStyle:v}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return y(),U(`div`,{class:D([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:C(this.cssVars)},[I(()=>i),(y(),h(F,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(y(),U(`sup`,{key:1,class:D(`${e}-badge-sup`),title:ue(this.value),style:C(this.offsetStyle)},[I(()=>d(r.value,()=>[this.dot?null:(y(),h(De,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(y(),h(re,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):I(()=>null)],14,je)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Pe=f([f(`@keyframes spin-rotate`,`
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
 `,[ce()])]),e(`spin-body`,`
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
 `)])]),Fe={small:20,medium:18,large:16},Ie={...o.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...oe,strokeWidth:Number},Le=i({name:`Spin`,props:Ie,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=G(e),r=o(`Spin`,`-spin`,Pe,ge,e,t),i=E(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?ee(t):i[N(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?l(`spin`,E(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,s=le(e,[`spinning`,`show`]),c=B(!1);return b(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{c.value=!0},r),t(()=>{clearTimeout(n)});return}}c.value=s.value}),{mergedClsPrefix:t,active:c,mergedStrokeWidth:E(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Fe[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,i=(n||e.description)&&(y(),U(`div`,{class:D(`${t}-spin-description`)},[I(()=>n||e.description?.())],2)),o=e.icon?(y(),U(`div`,{key:1,class:D([`${t}-spin-body`,this.themeClass])},[W(`div`,{class:D([`${t}-spin`,r&&`${t}-spin--rotate`]),style:C(e.default?``:this.cssVars)},[I(()=>e.icon())],6),I(()=>i)],2)):(y(),U(`div`,{key:2,class:D([`${t}-spin-body`,this.themeClass])},[(y(),h(S,{clsPrefix:t,style:C(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:D(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),I(()=>i)],2));return this.onRender?.(),e.default?(y(),U(`div`,{key:3,class:D([`${t}-spin-container`,this.themeClass]),style:C(this.cssVars)},[W(`div`,{class:D([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:C(this.contentStyle)},[I(()=>e.default?.())],6),a(F,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),Re=Z({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),ze=Z({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),Be=Z({name:`send`,size:24,node:[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]}),Ve={class:`flex h-full flex-col`},He={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ue={class:`min-w-0`},We={class:`truncate font-heading text-[15px] font-bold`},Ge={class:`tech-label mt-1 text-ink-4`},Ke={class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-[11px] text-ink-4`},$=i({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:t}){let r=e,i=t,o=X(),l=B(null),u=B(!1),d=B(``),f=B(!1),p=E(()=>l.value?.messages??[]),g=E(()=>l.value?.ticket??null),b=E(()=>g.value?.status===`closed`);async function S(){u.value=!0;try{l.value=await R.detail(r.ticketId),i(`changed`)}catch(e){o.error(e instanceof z?e.message:`加载工单失败`)}finally{u.value=!1}}async function w(){let e=d.value.trim();if(e){f.value=!0;try{await R.reply(r.ticketId,e),d.value=``,await S()}catch(e){o.error(e instanceof z?e.message:`发送失败`)}finally{f.value=!1}}}async function T(){try{await R.setStatus(r.ticketId,b.value?`open`:`closed`),o.success(b.value?`工单已重新打开`:`工单已关闭`),await S()}catch(e){o.error(e instanceof z?e.message:`操作失败`)}}return m(S),s(()=>r.ticketId,S),(t,r)=>(y(),U(`div`,Ve,[W(`header`,He,[W(`div`,Ue,[W(`h3`,We,H(g.value?.subject??`加载中…`),1),W(`p`,Ge,[_(` #`+H(e.ticketId)+` `,1),e.staff&&g.value?(y(),U(k,{key:0},[_(` · 提交人 `+H(g.value.owner_nickname),1)],64)):n(``,!0),g.value?(y(),U(k,{key:1},[_(` · `+H(j(Se)[g.value.status]),1)],64)):n(``,!0)])]),g.value?(y(),h(j(P),{key:0,size:`small`,quaternary:``,disabled:u.value,onClick:T},{icon:x(()=>[(y(),h(c(b.value?j(ze):j(be)),{size:14}))]),default:x(()=>[_(` `+H(b.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):n(``,!0)]),W(`div`,Ke,[a(j(Le),{show:u.value&&!p.value.length},{default:x(()=>[a(V,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-y-1`,"move-class":`transition duration-[200ms] ease-out`},{default:x(()=>[(y(!0),U(k,null,v(p.value,t=>(y(),U(`li`,{key:t.id,class:A([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[W(`div`,qe,[W(`div`,{class:A([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,t.sender_id===e.currentUserId?`justify-end`:``])},[W(`span`,Je,H(t.sender_nickname??`（已注销）`),1),W(`span`,Ye,H(t.create_time?.slice(5,16)??``),1)],2),W(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:C(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},H(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])]),W(`footer`,Xe,[a(j(Y),{value:d.value,"onUpdate:value":r[0]||=e=>d.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:b.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:b.value||f.value,onKeydown:ie(ne(w,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),W(`div`,Ze,[W(`span`,Qe,H(d.value.length)+` / 1000`,1),a(j(P),{type:`primary`,size:`small`,loading:f.value,disabled:b.value||!d.value.trim(),class:`!font-bold`,onClick:w},{icon:x(()=>[a(j(Be),{size:14})]),default:x(()=>[r[1]||=_(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),$e={class:`mx-auto max-w-6xl`},et={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},tt={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},nt={class:`mt-0.5 text-[13px] text-ink-3`},rt={class:`flex items-center gap-2`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},dt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-4`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=i({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let t=X(),r=B([]),i=B(0),o=B(!0),c=B(`all`),l=B(null),u=B(!1),d=B(!1),f=B(!1),p=T({subject:``,body:``}),g=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],b=E(()=>r.value.find(e=>e.id===l.value)??null);async function S(e=!1){e||(o.value=!0);try{let e=await R.list(c.value===`all`?void 0:c.value);r.value=e.tickets,i.value=e.unread_total,l.value&&!r.value.some(e=>e.id===l.value)&&(l.value=null)}catch(n){e||t.error(n instanceof z?n.message:`加载工单失败`)}finally{o.value=!1}}function w(e){l.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(u.value=!0)}async function D(){if(!p.subject.trim()||!p.body.trim()){t.warning(`标题和描述都要填`);return}f.value=!0;try{let e=await R.create(p.subject.trim(),p.body.trim());t.success(`工单已提交，等待管理员回复`),d.value=!1,p.subject=``,p.body=``,await S(),l.value=e.id}catch(e){t.error(e instanceof z?e.message:`提交失败`)}finally{f.value=!1}}let O=ye(),{pause:A,resume:M}=ve(()=>void S(!0),3e4,{immediate:!1});return s(O,e=>e===`visible`?(M(),void S(!0)):A()),s(c,()=>void S()),m(async()=>{await S(),M()}),(t,s)=>(y(),U(`div`,$e,[W(`header`,et,[W(`div`,null,[W(`h1`,tt,[_(H(e.staff?`工单处理`:`问题反馈`)+` `,1),i.value?(y(),h(j(Ne),{key:0,value:i.value,type:`warning`},null,8,[`value`])):n(``,!0)]),W(`p`,nt,H(e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),W(`div`,rt,[a(j(de),{value:c.value,"onUpdate:value":s[0]||=e=>c.value=e,options:g,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?n(``,!0):(y(),h(j(P),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:s[1]||=e=>d.value=!0},{icon:x(()=>[a(j(xe),{size:15})]),default:x(()=>[s[9]||=_(` 新建工单 `,-1)]),_:1}))])]),W(`div`,it,[W(`div`,at,[o.value&&!r.value.length?(y(),U(`div`,ot,[(y(),U(k,null,v(4,e=>a(j(me),{key:e,height:`58px`,sharp:!1})),64))])):r.value.length?(y(),h(V,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 -translate-y-1`,"move-class":`transition duration-[200ms] ease-out`},{default:x(()=>[(y(!0),U(k,null,v(r.value,t=>(y(),U(`li`,{key:t.id},[W(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:C({borderColor:`var(--border)`,backgroundColor:l.value===t.id?`var(--muted)`:`transparent`}),"aria-current":l.value===t.id?`true`:void 0,onClick:e=>w(t)},[W(`div`,lt,[W(`span`,ut,H(t.subject),1),t.unread?(y(),h(j(Ne),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(y(),U(`span`,{key:1,class:`tech-label shrink-0`,style:C({color:t.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},H(j(Se)[t.status]),5))]),W(`p`,dt,H(t.last_body),1),W(`p`,ft,[_(` #`+H(t.id)+` `,1),e.staff&&t.owner_nickname?(y(),U(k,{key:0},[_(` · `+H(t.owner_nickname),1)],64)):n(``,!0),_(` · `+H(j(Ce)(t.update_time))+` · `+H(t.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(y(),U(`div`,st,[a(j(q),{description:e.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:x(()=>[a(j(_e),{size:30})]),_:1},8,[`description`])]))]),W(`div`,pt,[b.value?(y(),h($,{key:b.value.id,"ticket-id":b.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:s[2]||=e=>S(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(y(),U(`div`,mt,[a(j(q),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:x(()=>[a(j(Re),{size:30})]),_:1})]))])]),a(j(fe),{show:u.value,"onUpdate:show":s[4]||=e=>u.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:x(()=>[a(j(pe),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:x(()=>[W(`div`,ht,[b.value?(y(),h($,{key:b.value.id,"ticket-id":b.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:s[3]||=e=>S(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):n(``,!0)])]),_:1})]),_:1},8,[`show`]),a(j(he),{show:d.value,"onUpdate:show":s[8]||=e=>d.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:x(()=>[W(`div`,gt,[a(j(P),{quaternary:``,onClick:s[7]||=e=>d.value=!1},{default:x(()=>[...s[10]||=[_(`取消`,-1)]]),_:1}),a(j(P),{type:`primary`,class:`!font-bold`,loading:f.value,onClick:D},{default:x(()=>[...s[11]||=[_(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:x(()=>[a(j(J),{label:`标题`,"show-feedback":!1},{default:x(()=>[a(j(Y),{value:p.subject,"onUpdate:value":s[5]||=e=>p.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),a(j(J),{label:`详细描述`,"show-feedback":!1},{default:x(()=>[a(j(Y),{value:p.body,"onUpdate:value":s[6]||=e=>p.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};