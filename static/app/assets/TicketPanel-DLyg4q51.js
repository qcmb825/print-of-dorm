import{b as e,x as t}from"./endpoints-DS4vsVAK.js";import{A as n,D as r,E as i,Et as a,F as o,Gt as s,I as c,O as l,P as u,Q as d,Ut as f,W as p,Wt as m,Y as h,ct as g,dt as _,et as v,k as y,kt as b,lt as x,q as S,rt as C,x as w,xt as T,yt as E}from"./useApi-BPuI6ZR9-B4cwgxoE.js";import{$t as D,A as O,Ht as k,O as A,Rt as j,Vt as M,Wt as N,Xt as ee,Yt as P,Z as F,_ as I,a as L,at as R,b as z,en as B,et as V,g as te,h as H,k as U,l as W,n as G,o as ne,rt as re,t as K,tt as q,u as J,y as ie,zt as Y}from"./createLucideIcon-DOmk2xkk.js";import{o as ae,t as oe}from"./Select-CwP9Y4-G.js";import{t as se}from"./use-compitable-CNZVP2TM.js";import{t as ce}from"./FormItem-Mf9--UpS.js";import{t as X}from"./Input-MFwo36ak.js";import{n as le,t as ue}from"./DrawerContent-Bs9E0-ix.js";import{t as de}from"./Skeleton-CuJo4Xhy.js";import{t as fe}from"./inbox-Be0zQoI3.js";import{t as pe}from"./lock-CaxhaQBT.js";import{t as me}from"./plus-CWpSZBq2.js";import{t as he}from"./send-DixikVsw.js";import{D as ge,K as _e,b as ve,dt as ye,x as be}from"./index-Cvvcc2yn.js";import{s as xe,y as Se}from"./format-CWkc0wMt.js";import{t as Z}from"./EmptyState-BO5ZEcuG.js";import{t as Ce}from"./PageHeader-CBIsP70Y.js";import{r as we,t as Te}from"./dist-eM4ecntm.js";var Ee=c({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=T(null),o=T(e.value),s=T(e.value),c=T(`up`),l=T(!1),u=i(()=>l.value?`${e.clsPrefix}-base-slot-machine-current-number--${c.value}-scroll`:null),f=i(()=>l.value?`${e.clsPrefix}-base-slot-machine-old-number--${c.value}-scroll`:null);g(a(e,`value`),(e,t)=>{o.value=t,s.value=e,p(m)});function m(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?h(`up`):n>t&&h(`down`))}function h(e){c.value=e,l.value=!1,p(()=>{t.value?.offsetWidth,l.value=!0})}return()=>{let{clsPrefix:i}=e;return d(),n(`span`,{ref:t,class:F(`${i}-base-slot-machine-number`)},[o.value===null?V(()=>null):(d(),n(`span`,{key:0,class:F([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,f.value])},[V(()=>o.value)],2)),r(`span`,{class:F([`${i}-base-slot-machine-current-number`,u.value])},[r(`span`,{ref:`numberWrapper`,class:F([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[V(()=>s.value)],2)],2),o.value===null?V(()=>null):(d(),n(`span`,{key:2,class:F([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,f.value])},[V(()=>o.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=re;function De({duration:e=`.2s`}={}){return[j(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),j(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),j(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),j(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),j(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),j(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=j([j(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),j(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),j(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),j(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),Y(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[Y(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),ne({duration:`.2s`,delay:`0s`}),Y(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[k(`top`,{transform:`translateY(-100%)`}),k(`bottom`,{transform:`translateY(100%)`}),k(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),k(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),Y(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[k(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),k(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),M(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[k(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=c({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){q(`-base-slot-machine`,Oe,a(e,`clsPrefix`));let t=T(),r=T(),s=i(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return g(a(e,`value`),(e,n)=>{typeof e==`string`?(r.value=void 0,t.value=void 0):typeof n==`string`?(r.value=e,t.value=void 0):(r.value=e,t.value=n)}),()=>{let{value:i,clsPrefix:a}=e;return typeof i==`number`?(d(),n(`span`,{key:1,class:F(`${a}-base-slot-machine`)},[o(ee,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>s.value.map((e,n)=>(d(),l(Ee,{clsPrefix:a,key:s.value.length-n-1,oldOriginalNumber:t.value,newOriginalNumber:r.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),o(H,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<i?(d(),l(Ee,{key:2,clsPrefix:a,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(d(),n(`span`,{key:3,class:F(`${a}-base-slot-machine`)},[V(()=>i)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:O,self:Ae},Me=j([j(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),Y(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[k(`as-is`,[Y(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ge({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),k(`dot`,[Y(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[j(`::before`,`border-radius: 4px;`)])]),Y(`badge-sup`,`
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
 `,[ge({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),Y(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),j(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...A.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=c({name:`Badge`,props:Pe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:a}=R(e),o=A(`Badge`,`-badge`,Me,je,e,n),s=T(!1),c=()=>{s.value=!0},l=()=>{s.value=!1},u=i(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!ie(t.value)));h(()=>{u.value&&(s.value=!0)});let d=I(`Badge`,a,n),f=i(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[N(`color`,t)]:a,fontFamily:s,fontSize:c}}=o.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),p=r?U(`badge`,i(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=te(r)),t}),f,e):void 0,m=i(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${d?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:d,mergedClsPrefix:n,appeared:s,showBadge:u,handleAfterEnter:c,handleAfterLeave:l,cssVars:r?void 0:f,themeClass:p?.themeClass,onRender:p?.onRender,offsetStyle:m}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:r,$slots:i}=this;t?.();let a=i.default?.();return d(),n(`div`,{class:F([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,r,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!a}]),style:m(this.cssVars)},[V(()=>a),(d(),l(P,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(d(),n(`sup`,{key:1,class:F(`${e}-badge-sup`),title:ae(this.value),style:m(this.offsetStyle)},[V(()=>z(i.value,()=>[this.dot?null:(d(),l(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(d(),l(L,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):V(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}});function Ie(e){let{opacityDisabled:t,heightTiny:n,heightSmall:r,heightMedium:i,heightLarge:a,heightHuge:o,primaryColor:s,fontSize:c}=e;return{fontSize:c,textColor:s,sizeTiny:n,sizeSmall:r,sizeMedium:i,sizeLarge:a,sizeHuge:o,color:s,opacitySpinning:t}}var Le={name:`Spin`,common:O,self:Ie},Re=j([j(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),Y(`spin-container`,`
 position: relative;
 `,[Y(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[_e()])]),Y(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),Y(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[k(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),Y(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),Y(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[k(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),ze={small:20,medium:18,large:16},Be={...A.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...J,strokeWidth:Number},Ve=c({name:`Spin`,props:Be,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=R(e),r=A(`Spin`,`-spin`,Re,Le,e,t),a=i(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?ye(t):i[N(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=n?U(`spin`,i(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),a,e):void 0,s=se(e,[`spinning`,`show`]),c=T(!1);return x(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{c.value=!0},r),t(()=>{clearTimeout(n)});return}}c.value=s.value}),{mergedClsPrefix:t,active:c,mergedStrokeWidth:i(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return ze[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:i}=this,a=e.icon&&this.rotate,s=(i||e.description)&&(d(),n(`div`,{class:F(`${t}-spin-description`)},[V(()=>i||e.description?.())],2)),c=e.icon?(d(),n(`div`,{key:1,class:F([`${t}-spin-body`,this.themeClass])},[r(`div`,{class:F([`${t}-spin`,a&&`${t}-spin--rotate`]),style:m(e.default?``:this.cssVars)},[V(()=>e.icon())],6),V(()=>s)],2)):(d(),n(`div`,{key:2,class:F([`${t}-spin-body`,this.themeClass])},[(d(),l(W,{clsPrefix:t,style:m(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:F(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),V(()=>s)],2));return this.onRender?.(),e.default?(d(),n(`div`,{key:3,class:F([`${t}-spin-container`,this.themeClass]),style:m(this.cssVars)},[r(`div`,{class:F([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:m(this.contentStyle)},[V(()=>e.default?.())],6),o(P,{name:`fade-in-transition`},{default:()=>this.active?c:null},1024)],6)):c}}),He=K({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ue=K({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),We={class:`flex h-full flex-col`},Ge={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ke={class:`min-w-0`},qe={class:`truncate font-heading text-base font-bold`},Je={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ye={class:`max-w-[86%]`},Xe={class:`font-semibold`},Ze={class:`tnum`},Qe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},$e={class:`mt-2 flex items-center justify-between gap-3`},et={class:`tnum text-2xs text-ink-3`},tt=3e3,$=8e3,nt=15e3,rt=c({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(a,{emit:c}){let x=a,E=c,O=ve(),k=T(null),A=T(!1),j=T(``),M=T(!1),N=T(null),P=T(0),F=T($),I=i(()=>k.value?.messages??[]),L=i(()=>k.value?.ticket??null),R=i(()=>L.value?.status===`closed`);function z(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function V(e){await p();let t=N.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&z()?`smooth`:`auto`})}function te(){let e=N.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function H(){A.value=!0;try{k.value=await e.detail(x.ticketId),P.value=k.value.last_id??0,E(`changed`)}catch(e){O.error(e instanceof t?e.message:`工单读取失败`)}finally{A.value=!1}}let U=!1;async function W(){if(!U&&k.value){U=!0;try{let t=await e.messagesSince(x.ticketId,P.value);t.last_id>P.value&&(P.value=t.last_id);let n=new Set(I.value.map(e=>e.id)),r=t.messages.filter(e=>!n.has(e.id));if(r.length){let e=te();k.value.messages.push(...r),F.value=tt,e&&!j.value.trim()&&await V(!0),E(`changed`)}else F.value=F.value<$?$:Math.min(Math.round(F.value*1.6),nt);t.status&&k.value.ticket.status!==t.status&&(k.value.ticket.status=t.status,E(`changed`))}catch{F.value=nt}finally{U=!1}}}async function ne(){let n=j.value.trim();if(n){M.value=!0;try{await e.reply(x.ticketId,n),j.value=``,await H(),await V(!0),F.value=tt}catch(e){O.error(e instanceof t?e.message:`发送未完成 · 稍后重试`)}finally{M.value=!1}}}async function re(){try{await e.setStatus(x.ticketId,R.value?`open`:`closed`),O.success(R.value?`工单已重开`:`工单已关闭`),await H()}catch(e){O.error(e instanceof t?e.message:`工单状态未变更 · 稍后重试`)}}let K=Te(),{pause:q,resume:J}=we(()=>void W(),F,{immediate:!1});return g(K,e=>{e===`visible`?(W(),J()):q()}),h(async()=>{await H(),K.value===`visible`&&J(),await V(!1)}),g(()=>x.ticketId,async()=>{P.value=0,F.value=$,await H(),await V(!1),J()}),S(q),(e,t)=>(d(),n(`div`,We,[r(`header`,Ge,[r(`div`,Ke,[r(`h3`,qe,s(L.value?.subject??`读取中`),1),r(`p`,Je,[u(` 工单 `+s(a.ticketId)+` `,1),a.staff&&L.value?(d(),n(w,{key:0},[u(` · 提交人 `+s(L.value.owner_nickname),1)],64)):y(``,!0),L.value?(d(),n(w,{key:1},[u(` · `+s(b(xe)[L.value.status]),1)],64)):y(``,!0)])]),L.value?(d(),l(b(G),{key:0,size:`small`,quaternary:``,disabled:A.value,onClick:re},{icon:_(()=>[(d(),l(C(R.value?b(Ue):b(pe)),{size:14}))]),default:_(()=>[u(` `+s(R.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):y(``,!0)]),r(`div`,{ref_key:`scroller`,ref:N,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[o(b(Ve),{show:A.value&&!I.value.length},{default:_(()=>[o(ee,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:_(()=>[(d(!0),n(w,null,v(I.value,e=>(d(),n(`li`,{key:e.id,class:f([`flex`,e.sender_id===a.currentUserId?`justify-end`:`justify-start`])},[r(`div`,Ye,[r(`div`,{class:f([`mb-1 flex items-center gap-2 text-xs text-ink-3`,e.sender_id===a.currentUserId?`justify-end`:``])},[r(`span`,Xe,s(e.sender_nickname??`（已注销）`),1),r(`span`,Ze,s(e.create_time?.slice(5,16)??``),1)],2),r(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:m(e.sender_id===a.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},s(e.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),r(`footer`,Qe,[o(b(X),{value:j.value,"onUpdate:value":t[0]||=e=>j.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:R.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:R.value||M.value,onKeydown:D(B(ne,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),r(`div`,$e,[r(`span`,et,s(j.value.length)+` / 1000`,1),o(b(G),{type:`primary`,size:`small`,loading:M.value,disabled:R.value||!j.value.trim(),class:`!font-bold`,onClick:ne},{icon:_(()=>[o(b(he),{size:14})]),default:_(()=>[t[1]||=u(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),it={class:`mx-auto max-w-6xl`},at={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ot={class:`panel overflow-hidden`},st={key:0,class:`flex flex-col gap-2 p-3`},ct={key:1,class:`grid place-items-center gap-3 py-12`},lt={key:2,class:`grid place-items-center py-12`},ut=[`aria-current`,`onClick`],dt={class:`flex items-start justify-between gap-2`},ft={class:`min-w-0 flex-1 truncate text-sm font-semibold`},pt={class:`mt-1 line-clamp-2 text-xs text-ink-3`},mt={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},ht={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},gt={key:1,class:`grid h-full place-items-center py-16`},_t={class:`h-[82vh]`},vt={class:`flex justify-end gap-2`},yt=c({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(a){let c=ve(),f=T([]),p=T(0),x=T(!0),S=T(`all`),C=T(null),D=T(!1),O=T(!1),k=T(!1),A=E({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=i(()=>f.value.find(e=>e.id===C.value)??null),N=0,P=T(!1);async function F(n=!1){let r=++N;n||(x.value=!0);try{let t=await e.list(S.value===`all`?void 0:S.value);if(r!==N)return;f.value=t.tickets,p.value=t.unread_total,P.value=!1,C.value&&!f.value.some(e=>e.id===C.value)&&(C.value=null)}catch(e){!n&&r===N&&c.error(e instanceof t?e.message:`工单读取失败`),P.value=!0}finally{r===N&&(x.value=!1)}}function I(e){C.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function L(){if(!A.subject.trim()||!A.body.trim()){c.warning(`标题与描述为必填`);return}k.value=!0;try{let t=await e.create(A.subject.trim(),A.body.trim());c.success(`工单已提交 · 待回复`),O.value=!1,A.subject=``,A.body=``,await F(),C.value=t.id}catch(e){c.error(e instanceof t?e.message:`提交未完成 · 稍后重试`)}finally{k.value=!1}}let R=Te(),{pause:z,resume:B}=we(()=>void F(!0),3e4,{immediate:!1});return g(R,e=>e===`visible`?(B(),void F(!0)):z()),g(S,()=>void F()),h(async()=>{await F(),R.value===`visible`&&B()}),(e,t)=>(d(),n(`div`,it,[o(Ce,{heading:`md`,title:a.staff?`工单处理`:`问题反馈`,subtitle:a.staff?`学生提交的问题与需求 · 回复后对方收到未读提示`:`打印相关问题 · 在此留言给管理员`},{"title-append":_(()=>[p.value?(d(),l(b(Fe),{key:0,value:p.value,type:`warning`},null,8,[`value`])):y(``,!0)]),actions:_(()=>[o(b(oe),{value:S.value,"onUpdate:value":t[0]||=e=>S.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),a.staff?y(``,!0):(d(),l(b(G),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:t[1]||=e=>O.value=!0},{icon:_(()=>[o(b(me),{size:15})]),default:_(()=>[t[10]||=u(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),r(`div`,at,[r(`div`,ot,[x.value&&!f.value.length?(d(),n(`div`,st,[(d(),n(w,null,v(4,e=>o(b(de),{key:e,height:`58px`,sharp:!1})),64))])):P.value&&!f.value.length?(d(),n(`div`,ct,[o(Z,{code:`ERR / NO LOAD`,title:`工单没读到`,hint:`多半是网络没跟上`},{icon:_(()=>[o(b(fe),{size:28})]),_:1}),o(b(G),{size:`small`,onClick:t[2]||=e=>F()},{default:_(()=>[...t[11]||=[u(`重试`,-1)]]),_:1})])):f.value.length?(d(),l(ee,{key:3,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:_(()=>[(d(!0),n(w,null,v(f.value,e=>(d(),n(`li`,{key:e.id},[r(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:m({borderColor:`var(--border)`,backgroundColor:C.value===e.id?`var(--muted)`:`transparent`}),"aria-current":C.value===e.id?`true`:void 0,onClick:t=>I(e)},[r(`div`,dt,[r(`span`,ft,s(e.subject),1),e.unread?(d(),l(b(Fe),{key:0,value:e.unread,type:`warning`},null,8,[`value`])):(d(),n(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:m({color:e.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},s(b(xe)[e.status]),5))]),r(`p`,pt,s(e.last_body),1),r(`p`,mt,[u(` 工单 `+s(e.id)+` `,1),a.staff&&e.owner_nickname?(d(),n(w,{key:0},[u(` · `+s(e.owner_nickname),1)],64)):y(``,!0),u(` · `+s(b(Se)(e.update_time))+` · `+s(e.msg_count)+` 条 `,1)])],12,ut)]))),128))]),_:1})):(d(),n(`div`,lt,[o(Z,{code:`00 / NO TICKET`,title:a.staff?`无工单`:`尚未提交工单`,hint:a.staff?`学生提交后在此列示`:`打印相关问题 · 新建工单提交`},{icon:_(()=>[o(b(fe),{size:28})]),_:1},8,[`title`,`hint`])]))]),r(`div`,ht,[M.value?(d(),l(rt,{key:M.value.id,"ticket-id":M.value.id,staff:a.staff,"current-user-id":a.currentUserId,onChanged:t[3]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(d(),n(`div`,gt,[o(Z,{code:`00 / NO TICKET`,title:`从左侧选择工单`,hint:`窄屏以抽屉打开`},{icon:_(()=>[o(b(He),{size:28})]),_:1})]))])]),o(b(le),{show:D.value,"onUpdate:show":t[5]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:_(()=>[o(b(ue),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:_(()=>[r(`div`,_t,[M.value?(d(),l(rt,{key:M.value.id,"ticket-id":M.value.id,staff:a.staff,"current-user-id":a.currentUserId,onChanged:t[4]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):y(``,!0)])]),_:1})]),_:1},8,[`show`]),o(b(be),{show:O.value,"onUpdate:show":t[9]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:_(()=>[r(`div`,vt,[o(b(G),{quaternary:``,onClick:t[8]||=e=>O.value=!1},{default:_(()=>[...t[12]||=[u(`取消`,-1)]]),_:1}),o(b(G),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:L},{default:_(()=>[...t[13]||=[u(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:_(()=>[o(b(ce),{label:`标题`,"show-feedback":!1},{default:_(()=>[o(b(X),{value:A.subject,"onUpdate:value":t[6]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),o(b(ce),{label:`详细描述`,"show-feedback":!1},{default:_(()=>[o(b(X),{value:A.body,"onUpdate:value":t[7]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清单号、遇到的问题与期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{yt as t};