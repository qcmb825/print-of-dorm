import{$t as e,C as t,Cn as n,D as r,Dn as i,En as a,Hn as o,I as s,L as c,O as l,On as u,Pn as d,Qn as f,Qt as p,R as m,Sn as h,T as g,Wn as _,Xn as v,Yn as y,_ as b,_r as x,_t as S,bn as C,cr as w,dt as T,gn as E,gr as D,ht as O,in as k,l as A,ln as j,lt as ee,m as te,mn as ne,mt as M,nn as N,o as P,or as re,p as ie,pn as ae,pr as F,qn as oe,s as I,tn as se,un as L,v as ce,vr as R,w as le,wn as z,xn as B,yr as V,yt as H,zn as U}from"./endpoints-BjKpicAD.js";import{f as ue,t as W}from"./fade-in-scale-up.cssr-YHRJZfJ_.js";import{d as de}from"./Popover-Da_9Zg5V.js";import{t as G}from"./Empty-Bx6N9Igc.js";import{a as fe,t as pe}from"./Select-dHhEU-c9.js";import{t as K}from"./FormItem-0Kp4OhJ9.js";import{t as q}from"./Input-DhnZM-aT.js";import{n as me,t as he}from"./DrawerContent-BbWPAQ3o.js";import{t as ge}from"./Skeleton-ByR_YrNP.js";import{b as _e,h as ve,y as J}from"./index-BX-3vdgO.js";import{t as Y}from"./createLucideIcon-BtyG49x8.js";import{i as ye,r as be,t as xe}from"./dist-CDiOp3Wx.js";import{t as Se}from"./lock-Ba4xmh9X.js";import{t as Ce}from"./plus-C5xEYaPH.js";import{s as X,u as we}from"./format-DiIJfET2.js";var Z=u({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=w(null),n=w(e.value),r=w(e.value),i=w(`up`),a=w(!1),s=C(()=>a.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),c=C(()=>a.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);y(F(e,`value`),(e,t)=>{n.value=t,r.value=e,d(l)});function l(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?u(`up`):n>t&&u(`down`))}function u(e){i.value=e,a.value=!1,d(()=>{t.value?.offsetWidth,a.value=!0})}return()=>{let{clsPrefix:i}=e;return o(),z(`span`,{ref:t,class:T(`${i}-base-slot-machine-number`)},[n.value===null?M(()=>null):(o(),z(`span`,{key:0,class:T([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,c.value])},[M(()=>n.value)],2)),B(`span`,{class:T([`${i}-base-slot-machine-current-number`,s.value])},[B(`span`,{ref:`numberWrapper`,class:T([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[M(()=>r.value)],2)],2),n.value===null?M(()=>null):(o(),z(`span`,{key:2,class:T([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,c.value])},[M(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=S;function Te({duration:e=`.2s`}={}){return[p(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),p(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),p(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),p(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),p(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),p(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Ee=p([p(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),p(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),p(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),p(`@keyframes n-base-slot-machine-fade-down-out`,`
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
 `,[N(`top`,{transform:`translateY(-100%)`}),N(`bottom`,{transform:`translateY(100%)`}),N(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),N(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),e(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[N(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),N(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),se(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[N(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),De=u({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){O(`-base-slot-machine`,Ee,F(e,`clsPrefix`));let n=w(),r=w(),a=C(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return y(F(e,`value`),(e,t)=>{typeof e==`string`?(r.value=void 0,n.value=void 0):typeof t==`string`?(r.value=e,n.value=void 0):(r.value=e,n.value=t)}),()=>{let{value:s,clsPrefix:c}=e;return typeof s==`number`?(o(),z(`span`,{key:1,class:T(`${c}-base-slot-machine`)},[i(L,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>a.value.map((e,t)=>(o(),h(Z,{clsPrefix:c,key:a.value.length-t-1,oldOriginalNumber:n.value,newOriginalNumber:r.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),i(t,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<s?(o(),h(Z,{key:2,clsPrefix:c,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(o(),z(`span`,{key:3,class:T(`${c}-base-slot-machine`)},[M(()=>s)],2))}}});function Oe(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var ke={name:`Badge`,common:m,self:Oe},Ae=p([p(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),e(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[N(`as-is`,[e(`badge-sup`,{position:`static`,transform:`translateX(0)`},[W({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),N(`dot`,[e(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[p(`::before`,`border-radius: 4px;`)])]),e(`badge-sup`,`
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
 `,[W({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),e(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),p(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),je=[`title`],Me={...s.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Ne=u({name:`Badge`,props:Me,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedRtlRef:a}=H(e),o=s(`Badge`,`-badge`,Ae,ke,e,n),l=w(!1),u=()=>{l.value=!0},d=()=>{l.value=!1},f=C(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!r(t.value)));U(()=>{f.value&&(l.value=!0)});let p=g(`Badge`,a,n),m=C(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[k(`color`,t)]:a,fontFamily:s,fontSize:c}}=o.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),h=i?c(`badge`,C(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=le(r)),t}),m,e):void 0,_=C(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${p?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:p,mergedClsPrefix:n,appeared:l,showBadge:f,handleAfterEnter:u,handleAfterLeave:d,cssVars:i?void 0:m,themeClass:h?.themeClass,onRender:h?.onRender,offsetStyle:_}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return o(),z(`div`,{class:T([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:R(this.cssVars)},[M(()=>i),(o(),h(j,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(o(),z(`sup`,{key:1,class:T(`${e}-badge-sup`),title:fe(this.value),style:R(this.offsetStyle)},[M(()=>l(r.value,()=>[this.dot?null:(o(),h(De,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(o(),h(ie,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):M(()=>null)],14,je)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Pe=p([p(`@keyframes spin-rotate`,`
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
 `,[ue()])]),e(`spin-body`,`
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
 `,[N(`rotate`,`
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
 `,[N(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Fe={small:20,medium:18,large:16},Ie={...s.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...ce,strokeWidth:Number},Le=u({name:`Spin`,props:Ie,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=H(e),r=s(`Spin`,`-spin`,Pe,ve,e,t),i=C(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?ee(t):i[k(`size`,t)],"--n-color":o,"--n-text-color":s}}),a=n?c(`spin`,C(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,o=de(e,[`spinning`,`show`]),l=w(!1);return v(t=>{let n;if(o.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{l.value=!0},r),t(()=>{clearTimeout(n)});return}}l.value=o.value}),{mergedClsPrefix:t,active:l,mergedStrokeWidth:C(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Fe[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,a=(n||e.description)&&(o(),z(`div`,{class:T(`${t}-spin-description`)},[M(()=>n||e.description?.())],2)),s=e.icon?(o(),z(`div`,{key:1,class:T([`${t}-spin-body`,this.themeClass])},[B(`div`,{class:T([`${t}-spin`,r&&`${t}-spin--rotate`]),style:R(e.default?``:this.cssVars)},[M(()=>e.icon())],6),M(()=>a)],2)):(o(),z(`div`,{key:2,class:T([`${t}-spin-body`,this.themeClass])},[(o(),h(b,{clsPrefix:t,style:R(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:T(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),M(()=>a)],2));return this.onRender?.(),e.default?(o(),z(`div`,{key:3,class:T([`${t}-spin-container`,this.themeClass]),style:R(this.cssVars)},[B(`div`,{class:T([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:R(this.contentStyle)},[M(()=>e.default?.())],6),i(j,{name:`fade-in-transition`},{default:()=>this.active?s:null},1024)],6)):s}}),Re=Y({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),ze=Y({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),Be=Y({name:`send`,size:24,node:[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]}),Ve={class:`flex h-full flex-col`},He={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ue={class:`min-w-0`},We={class:`truncate font-heading text-[15px] font-bold`},Ge={class:`tech-label mt-1 text-ink-4`},Ke={class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-[11px] text-ink-4`},$=u({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:t}){let r=e,s=t,c=J(),l=w(null),u=w(!1),d=w(``),p=w(!1),m=C(()=>l.value?.messages??[]),g=C(()=>l.value?.ticket??null),v=C(()=>g.value?.status===`closed`);async function b(){u.value=!0;try{l.value=await P.detail(r.ticketId),s(`changed`)}catch(e){c.error(e instanceof I?e.message:`加载工单失败`)}finally{u.value=!1}}async function S(){let e=d.value.trim();if(e){p.value=!0;try{await P.reply(r.ticketId,e),d.value=``,await b()}catch(e){c.error(e instanceof I?e.message:`发送失败`)}finally{p.value=!1}}}async function T(){try{await P.setStatus(r.ticketId,v.value?`open`:`closed`),c.success(v.value?`工单已重新打开`:`工单已关闭`),await b()}catch(e){c.error(e instanceof I?e.message:`操作失败`)}}return U(b),y(()=>r.ticketId,b),(t,r)=>(o(),z(`div`,Ve,[B(`header`,He,[B(`div`,Ue,[B(`h3`,We,V(g.value?.subject??`加载中…`),1),B(`p`,Ge,[a(` #`+V(e.ticketId)+` `,1),e.staff&&g.value?(o(),z(E,{key:0},[a(` · 提交人 `+V(g.value.owner_nickname),1)],64)):n(``,!0),g.value?(o(),z(E,{key:1},[a(` · `+V(D(X)[g.value.status]),1)],64)):n(``,!0)])]),g.value?(o(),h(D(A),{key:0,size:`small`,quaternary:``,disabled:u.value,onClick:T},{icon:f(()=>[(o(),h(oe(v.value?D(ze):D(Se)),{size:14}))]),default:f(()=>[a(` `+V(v.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):n(``,!0)]),B(`div`,Ke,[i(D(Le),{show:u.value&&!m.value.length},{default:f(()=>[i(L,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:f(()=>[(o(!0),z(E,null,_(m.value,t=>(o(),z(`li`,{key:t.id,class:x([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[B(`div`,qe,[B(`div`,{class:x([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,t.sender_id===e.currentUserId?`justify-end`:``])},[B(`span`,Je,V(t.sender_nickname??`（已注销）`),1),B(`span`,Ye,V(t.create_time?.slice(5,16)??``),1)],2),B(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:R(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},V(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])]),B(`footer`,Xe,[i(D(q),{value:d.value,"onUpdate:value":r[0]||=e=>d.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:v.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:v.value||p.value,onKeydown:ae(ne(S,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),B(`div`,Ze,[B(`span`,Qe,V(d.value.length)+` / 1000`,1),i(D(A),{type:`primary`,size:`small`,loading:p.value,disabled:v.value||!d.value.trim(),class:`!font-bold`,onClick:S},{icon:f(()=>[i(D(Be),{size:14})]),default:f(()=>[r[1]||=a(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),$e={class:`mx-auto max-w-6xl`},et={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},tt={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},nt={class:`mt-0.5 text-[13px] text-ink-3`},rt={class:`flex items-center gap-2`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center py-12`},ct=[`aria-current`,`onClick`],lt={class:`flex items-start justify-between gap-2`},ut={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},dt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},ft={class:`tech-label mt-1.5 text-ink-4`},pt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},mt={key:1,class:`grid h-full place-items-center py-16`},ht={class:`h-[82vh]`},gt={class:`flex justify-end gap-2`},_t=u({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let t=J(),r=w([]),s=w(0),c=w(!0),l=w(`all`),u=w(null),d=w(!1),p=w(!1),m=w(!1),g=re({subject:``,body:``}),v=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],b=C(()=>r.value.find(e=>e.id===u.value)??null);async function x(e=!1){e||(c.value=!0);try{let e=await P.list(l.value===`all`?void 0:l.value);r.value=e.tickets,s.value=e.unread_total,u.value&&!r.value.some(e=>e.id===u.value)&&(u.value=null)}catch(n){e||t.error(n instanceof I?n.message:`加载工单失败`)}finally{c.value=!1}}function S(e){u.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(d.value=!0)}async function T(){if(!g.subject.trim()||!g.body.trim()){t.warning(`标题和描述都要填`);return}m.value=!0;try{let e=await P.create(g.subject.trim(),g.body.trim());t.success(`工单已提交，等待管理员回复`),p.value=!1,g.subject=``,g.body=``,await x(),u.value=e.id}catch(e){t.error(e instanceof I?e.message:`提交失败`)}finally{m.value=!1}}let O=xe(),{pause:k,resume:j}=be(()=>void x(!0),3e4,{immediate:!1});return y(O,e=>e===`visible`?(j(),void x(!0)):k()),y(l,()=>void x()),U(async()=>{await x(),j()}),(t,y)=>(o(),z(`div`,$e,[B(`header`,et,[B(`div`,null,[B(`h1`,tt,[a(V(e.staff?`工单处理`:`问题反馈`)+` `,1),s.value?(o(),h(D(Ne),{key:0,value:s.value,type:`warning`},null,8,[`value`])):n(``,!0)]),B(`p`,nt,V(e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),B(`div`,rt,[i(D(pe),{value:l.value,"onUpdate:value":y[0]||=e=>l.value=e,options:v,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?n(``,!0):(o(),h(D(A),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:y[1]||=e=>p.value=!0},{icon:f(()=>[i(D(Ce),{size:15})]),default:f(()=>[y[9]||=a(` 新建工单 `,-1)]),_:1}))])]),B(`div`,it,[B(`div`,at,[c.value&&!r.value.length?(o(),z(`div`,ot,[(o(),z(E,null,_(4,e=>i(D(ge),{key:e,height:`58px`,sharp:!1})),64))])):r.value.length?(o(),h(L,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:f(()=>[(o(!0),z(E,null,_(r.value,t=>(o(),z(`li`,{key:t.id},[B(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:R({borderColor:`var(--border)`,backgroundColor:u.value===t.id?`var(--muted)`:`transparent`}),"aria-current":u.value===t.id?`true`:void 0,onClick:e=>S(t)},[B(`div`,lt,[B(`span`,ut,V(t.subject),1),t.unread?(o(),h(D(Ne),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(o(),z(`span`,{key:1,class:`tech-label shrink-0`,style:R({color:t.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},V(D(X)[t.status]),5))]),B(`p`,dt,V(t.last_body),1),B(`p`,ft,[a(` #`+V(t.id)+` `,1),e.staff&&t.owner_nickname?(o(),z(E,{key:0},[a(` · `+V(t.owner_nickname),1)],64)):n(``,!0),a(` · `+V(D(we)(t.update_time))+` · `+V(t.msg_count)+` 条 `,1)])],12,ct)]))),128))]),_:1})):(o(),z(`div`,st,[i(D(G),{description:e.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:f(()=>[i(D(ye),{size:30})]),_:1},8,[`description`])]))]),B(`div`,pt,[b.value?(o(),h($,{key:b.value.id,"ticket-id":b.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:y[2]||=e=>x(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(o(),z(`div`,mt,[i(D(G),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:f(()=>[i(D(Re),{size:30})]),_:1})]))])]),i(D(me),{show:d.value,"onUpdate:show":y[4]||=e=>d.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:f(()=>[i(D(he),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:f(()=>[B(`div`,ht,[b.value?(o(),h($,{key:b.value.id,"ticket-id":b.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:y[3]||=e=>x(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):n(``,!0)])]),_:1})]),_:1},8,[`show`]),i(D(_e),{show:p.value,"onUpdate:show":y[8]||=e=>p.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:f(()=>[B(`div`,gt,[i(D(A),{quaternary:``,onClick:y[7]||=e=>p.value=!1},{default:f(()=>[...y[10]||=[a(`取消`,-1)]]),_:1}),i(D(A),{type:`primary`,class:`!font-bold`,loading:m.value,onClick:T},{default:f(()=>[...y[11]||=[a(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:f(()=>[i(D(K),{label:`标题`,"show-feedback":!1},{default:f(()=>[i(D(q),{value:g.subject,"onUpdate:value":y[5]||=e=>g.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),i(D(K),{label:`详细描述`,"show-feedback":!1},{default:f(()=>[i(D(q),{value:g.body,"onUpdate:value":y[6]||=e=>g.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{_t as t};