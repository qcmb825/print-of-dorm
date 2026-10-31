import{At as e,Bt as t,H as n,Ht as r,J as i,Mt as a,X as o,Xt as s,Y as c,Z as l,dn as u,dt as d,fn as f,gt as p,kt as m,mt as h,nt as g,q as _,qt as v,rt as y,tt as b,un as x,v as S,wt as C,xt as w,y as T,yt as E}from"./endpoints-b5Af9CM_.js";import{A as D,Gt as O,Jt as k,Kt as A,Yt as j,Zt as M,_ as N,b as P,ct as F,d as I,ft as L,g as R,it as z,j as B,k as V,n as H,nn as U,nt as W,o as G,on as ee,rn as K,s as te,sn as ne,st as q,t as J,u as Y,ut as re,v as ie,x as ae}from"./createLucideIcon-1904TPEq.js";import{t as X}from"./Input-SxUFbf2x.js";import{o as oe,t as se}from"./Select-DJo88foU.js";import{r as ce}from"./cssr-BXuBvlDi.js";import{t as le}from"./FormItem-CkG_Pvmj.js";import{n as ue,t as de}from"./DrawerContent-QNZ80Xn7.js";import{t as fe}from"./Skeleton-ihVqGLRi.js";import{t as pe}from"./inbox-DaWGGRNX.js";import{t as me}from"./lock-e6vpBt5d.js";import{t as he}from"./plus-qo1T_58T.js";import{t as ge}from"./send-JC9LiAgs.js";import{C as _e,S as ve,U as ye,ut as be,v as xe}from"./index-Cx_bL40U.js";import{s as Se,y as Ce}from"./format-DaAKFgUZ.js";import{t as Z}from"./EmptyState-C7u8hOHj.js";import{t as we}from"./PageHeader-Dt-2aTBc.js";import{r as Te,t as Ee}from"./dist-CB31sAh2.js";var De=y({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=r(null),n=r(e.value),a=r(e.value),o=r(`up`),s=r(!1),c=_(()=>s.value?`${e.clsPrefix}-base-slot-machine-current-number--${o.value}-scroll`:null),u=_(()=>s.value?`${e.clsPrefix}-base-slot-machine-old-number--${o.value}-scroll`:null);m(v(e,`value`),(e,t)=>{n.value=t,a.value=e,d(f)});function f(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?p(`up`):n>t&&p(`down`))}function p(e){o.value=e,s.value=!1,d(()=>{t.value?.offsetWidth,s.value=!0})}return()=>{let{clsPrefix:r}=e;return E(),l(`span`,{ref:t,class:z(`${r}-base-slot-machine-number`)},[n.value===null?q(()=>null):(E(),l(`span`,{key:0,class:z([`${r}-base-slot-machine-old-number ${r}-base-slot-machine-old-number--top`,u.value])},[q(()=>n.value)],2)),i(`span`,{class:z([`${r}-base-slot-machine-current-number`,c.value])},[i(`span`,{ref:`numberWrapper`,class:z([`${r}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${r}-base-slot-machine-current-number__inner--not-number`])},[q(()=>a.value)],2)],2),n.value===null?q(()=>null):(E(),l(`span`,{key:2,class:z([`${r}-base-slot-machine-old-number ${r}-base-slot-machine-old-number--bottom`,u.value])},[q(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=re;function Oe({duration:e=`.2s`}={}){return[O(`&.fade-up-width-expand-transition-leave-active`,{transition:`
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
 `,[Oe({duration:`.2s`}),te({duration:`.2s`,delay:`0s`}),A(`base-slot-machine-old-number`,`
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
 `)])])])])]),Ae=y({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){F(`-base-slot-machine`,ke,v(e,`clsPrefix`));let t=r(),n=r(),i=_(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return m(v(e,`value`),(e,r)=>{typeof e==`string`?(n.value=void 0,t.value=void 0):typeof r==`string`?(n.value=e,t.value=void 0):(n.value=e,t.value=r)}),()=>{let{value:r,clsPrefix:a}=e;return typeof r==`number`?(E(),l(`span`,{key:1,class:z(`${a}-base-slot-machine`)},[g(K,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>i.value.map((e,r)=>(E(),c(De,{clsPrefix:a,key:i.value.length-r-1,oldOriginalNumber:t.value,newOriginalNumber:n.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),g(R,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<r?(E(),c(De,{key:2,clsPrefix:a,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(E(),l(`span`,{key:3,class:z(`${a}-base-slot-machine`)},[q(()=>r)],2))}}});function je(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var Me={name:`Badge`,common:B,self:je},Ne=O([O(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),A(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[j(`as-is`,[A(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ye({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),j(`dot`,[A(`badge-sup`,`
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
 `,[ye({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),A(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),O(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Pe=[`title`],Fe={...V.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Ie=y({name:`Badge`,props:Fe,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedRtlRef:a}=L(e),o=V(`Badge`,`-badge`,Ne,Me,e,n),s=r(!1),c=()=>{s.value=!0},l=()=>{s.value=!1},u=_(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!P(t.value)));p(()=>{u.value&&(s.value=!0)});let d=ie(`Badge`,a,n),f=_(()=>{let{type:t,color:n}=e,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[M(`color`,t)]:a,fontFamily:s,fontSize:c}}=o.value;return{"--n-font-size":c,"--n-font-family":s,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),m=i?D(`badge`,_(()=>{let t=``,{type:n,color:r}=e;return n&&(t+=n[0]),r&&(t+=N(r)),t}),f,e):void 0,h=_(()=>{let{offset:t}=e;if(!t)return;let[n,r]=t,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${d?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:d,mergedClsPrefix:n,appeared:s,showBadge:u,handleAfterEnter:c,handleAfterLeave:l,cssVars:i?void 0:f,themeClass:m?.themeClass,onRender:m?.onRender,offsetStyle:h}},render(){let{mergedClsPrefix:e,onRender:t,themeClass:n,$slots:r}=this;t?.();let i=r.default?.();return E(),l(`div`,{class:z([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,n,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!i}]),style:u(this.cssVars)},[q(()=>i),(E(),c(U,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(E(),l(`sup`,{key:1,class:z(`${e}-badge-sup`),title:oe(this.value),style:u(this.offsetStyle)},[q(()=>ae(r.value,()=>[this.dot?null:(E(),c(Ae,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(E(),c(G,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):q(()=>null)],14,Pe)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Le=O([O(`@keyframes spin-rotate`,`
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
 `)])]),Re={small:20,medium:18,large:16},ze={...V.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...I,strokeWidth:Number},Be=y({name:`Spin`,props:ze,slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:i}=L(t),a=V(`Spin`,`-spin`,Le,xe,t,n),o=_(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=a.value,{opacitySpinning:i,color:o,textColor:s}=r;return{"--n-bezier":n,"--n-opacity-spinning":i,"--n-size":typeof e==`number`?W(e):r[M(`size`,e)],"--n-color":o,"--n-text-color":s}}),s=i?D(`spin`,_(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),o,t):void 0,c=ce(t,[`spinning`,`show`]),l=r(!1);return e(e=>{let n;if(c.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{l.value=!0},r),e(()=>{clearTimeout(n)});return}}l.value=c.value}),{mergedClsPrefix:n,active:l,mergedStrokeWidth:_(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return Re[typeof n==`number`?`medium`:n]}),cssVars:i?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,description:n}=this,r=e.icon&&this.rotate,a=(n||e.description)&&(E(),l(`div`,{class:z(`${t}-spin-description`)},[q(()=>n||e.description?.())],2)),o=e.icon?(E(),l(`div`,{key:1,class:z([`${t}-spin-body`,this.themeClass])},[i(`div`,{class:z([`${t}-spin`,r&&`${t}-spin--rotate`]),style:u(e.default?``:this.cssVars)},[q(()=>e.icon())],6),q(()=>a)],2)):(E(),l(`div`,{key:2,class:z([`${t}-spin-body`,this.themeClass])},[(E(),c(Y,{clsPrefix:t,style:u(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:z(`${t}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),q(()=>a)],2));return this.onRender?.(),e.default?(E(),l(`div`,{key:3,class:z([`${t}-spin-container`,this.themeClass]),style:u(this.cssVars)},[i(`div`,{class:z([`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass]),style:u(this.contentStyle)},[q(()=>e.default?.())],6),g(U,{name:`fade-in-transition`},{default:()=>this.active?o:null},1024)],6)):o}}),Ve=J({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),He=J({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),Ue={class:`flex h-full flex-col`},We={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},Ge={class:`min-w-0`},Ke={class:`truncate font-heading text-base font-bold`},qe={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Je={class:`max-w-[86%]`},Ye={class:`font-semibold`},Xe={class:`tnum`},Ze={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Qe={class:`mt-2 flex items-center justify-between gap-3`},$e={class:`tnum text-2xs text-ink-3`},et=3e3,$=8e3,tt=15e3,nt=y({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:t}){let v=e,y=t,D=ve(),O=r(null),k=r(!1),A=r(``),j=r(!1),M=r(null),N=r(0),P=r($),F=_(()=>O.value?.messages??[]),I=_(()=>O.value?.ticket??null),L=_(()=>I.value?.status===`closed`);function R(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function z(e){await d();let t=M.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&R()?`smooth`:`auto`})}function B(){let e=M.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function V(){k.value=!0;try{O.value=await S.detail(v.ticketId),N.value=O.value.last_id??0,y(`changed`)}catch(e){D.error(e instanceof T?e.message:`工单读取失败`)}finally{k.value=!1}}let U=!1;async function W(){if(!U&&O.value){U=!0;try{let e=await S.messagesSince(v.ticketId,N.value);e.last_id>N.value&&(N.value=e.last_id);let t=new Set(F.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=B();O.value.messages.push(...n),P.value=et,e&&!A.value.trim()&&await z(!0),y(`changed`)}else P.value=P.value<$?$:Math.min(Math.round(P.value*1.6),tt);e.status&&O.value.ticket.status!==e.status&&(O.value.ticket.status=e.status,y(`changed`))}catch{P.value=tt}finally{U=!1}}}async function G(){let e=A.value.trim();if(e){j.value=!0;try{await S.reply(v.ticketId,e),A.value=``,await V(),await z(!0),P.value=et}catch(e){D.error(e instanceof T?e.message:`发送未完成 · 稍后重试`)}finally{j.value=!1}}}async function te(){try{await S.setStatus(v.ticketId,L.value?`open`:`closed`),D.success(L.value?`工单已重开`:`工单已关闭`),await V()}catch(e){D.error(e instanceof T?e.message:`工单状态未变更 · 稍后重试`)}}let q=Ee(),{pause:J,resume:Y}=Te(()=>void W(),P,{immediate:!1});return m(q,e=>{e===`visible`?(W(),Y()):J()}),p(async()=>{await V(),Y(),await z(!1)}),m(()=>v.ticketId,async()=>{N.value=0,P.value=$,await V(),await z(!1),Y()}),h(J),(t,r)=>(E(),l(`div`,Ue,[i(`header`,We,[i(`div`,Ge,[i(`h3`,Ke,f(I.value?.subject??`读取中`),1),i(`p`,qe,[b(` 工单 `+f(e.ticketId)+` `,1),e.staff&&I.value?(E(),l(n,{key:0},[b(` · 提交人 `+f(I.value.owner_nickname),1)],64)):o(``,!0),I.value?(E(),l(n,{key:1},[b(` · `+f(s(Se)[I.value.status]),1)],64)):o(``,!0)])]),I.value?(E(),c(s(H),{key:0,size:`small`,quaternary:``,disabled:k.value,onClick:te},{icon:a(()=>[(E(),c(C(L.value?s(He):s(me)),{size:14}))]),default:a(()=>[b(` `+f(L.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):o(``,!0)]),i(`div`,{ref_key:`scroller`,ref:M,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[g(s(Be),{show:k.value&&!F.value.length},{default:a(()=>[g(K,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:a(()=>[(E(!0),l(n,null,w(F.value,t=>(E(),l(`li`,{key:t.id,class:x([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[i(`div`,Je,[i(`div`,{class:x([`mb-1 flex items-center gap-2 text-xs text-ink-3`,t.sender_id===e.currentUserId?`justify-end`:``])},[i(`span`,Ye,f(t.sender_nickname??`（已注销）`),1),i(`span`,Xe,f(t.create_time?.slice(5,16)??``),1)],2),i(`div`,{class:`border px-3 py-2 text-sm whitespace-pre-wrap break-words`,style:u(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},f(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),i(`footer`,Ze,[g(s(X),{value:A.value,"onUpdate:value":r[0]||=e=>A.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:L.value?`工单已关闭 · 先重开再回复`:`写回复，Enter 发送`,disabled:L.value||j.value,onKeydown:ee(ne(G,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),i(`div`,Qe,[i(`span`,$e,f(A.value.length)+` / 1000`,1),g(s(H),{type:`primary`,size:`small`,loading:j.value,disabled:L.value||!A.value.trim(),class:`!font-bold`,onClick:G},{icon:a(()=>[g(s(ge),{size:14})]),default:a(()=>[r[1]||=b(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),rt={class:`mx-auto max-w-6xl`},it={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},at={class:`panel overflow-hidden`},ot={key:0,class:`flex flex-col gap-2 p-3`},st={key:1,class:`grid place-items-center gap-3 py-12`},ct={key:2,class:`grid place-items-center py-12`},lt=[`aria-current`,`onClick`],ut={class:`flex items-start justify-between gap-2`},dt={class:`min-w-0 flex-1 truncate text-sm font-semibold`},ft={class:`mt-1 line-clamp-2 text-xs text-ink-3`},pt={class:`tech-label mt-1.5 text-ink-3 tech-label--cn text-xs`},mt={class:`panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4`},ht={key:1,class:`grid h-full place-items-center py-16`},gt={class:`h-[82vh]`},_t={class:`flex justify-end gap-2`},vt=y({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let d=ve(),h=r([]),v=r(0),y=r(!0),x=r(`all`),C=r(null),D=r(!1),O=r(!1),k=r(!1),A=t({subject:``,body:``}),j=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],M=_(()=>h.value.find(e=>e.id===C.value)??null),N=0,P=r(!1);async function F(e=!1){let t=++N;e||(y.value=!0);try{let e=await S.list(x.value===`all`?void 0:x.value);if(t!==N)return;h.value=e.tickets,v.value=e.unread_total,P.value=!1,C.value&&!h.value.some(e=>e.id===C.value)&&(C.value=null)}catch(n){!e&&t===N&&d.error(n instanceof T?n.message:`工单读取失败`),P.value=!0}finally{t===N&&(y.value=!1)}}function I(e){C.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(D.value=!0)}async function L(){if(!A.subject.trim()||!A.body.trim()){d.warning(`标题与描述为必填`);return}k.value=!0;try{let e=await S.create(A.subject.trim(),A.body.trim());d.success(`工单已提交 · 待回复`),O.value=!1,A.subject=``,A.body=``,await F(),C.value=e.id}catch(e){d.error(e instanceof T?e.message:`提交未完成 · 稍后重试`)}finally{k.value=!1}}let R=Ee(),{pause:z,resume:B}=Te(()=>void F(!0),3e4,{immediate:!1});return m(R,e=>e===`visible`?(B(),void F(!0)):z()),m(x,()=>void F()),p(async()=>{await F(),R.value===`visible`&&B()}),(t,r)=>(E(),l(`div`,rt,[g(we,{heading:`md`,title:e.staff?`工单处理`:`问题反馈`,subtitle:e.staff?`学生提交的问题与需求 · 回复后对方收到未读提示`:`打印相关问题 · 在此留言给管理员`},{"title-append":a(()=>[v.value?(E(),c(s(Ie),{key:0,value:v.value,type:`warning`},null,8,[`value`])):o(``,!0)]),actions:a(()=>[g(s(se),{value:x.value,"onUpdate:value":r[0]||=e=>x.value=e,options:j,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?o(``,!0):(E(),c(s(H),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:r[1]||=e=>O.value=!0},{icon:a(()=>[g(s(he),{size:15})]),default:a(()=>[r[10]||=b(` 新建工单 `,-1)]),_:1}))]),_:1},8,[`title`,`subtitle`]),i(`div`,it,[i(`div`,at,[y.value&&!h.value.length?(E(),l(`div`,ot,[(E(),l(n,null,w(4,e=>g(s(fe),{key:e,height:`58px`,sharp:!1})),64))])):P.value&&!h.value.length?(E(),l(`div`,st,[g(Z,{code:`ERR / NO LOAD`,title:`工单没读到`,hint:`多半是网络没跟上`},{icon:a(()=>[g(s(pe),{size:28})]),_:1}),g(s(H),{size:`small`,onClick:r[2]||=e=>F()},{default:a(()=>[...r[11]||=[b(`重试`,-1)]]),_:1})])):h.value.length?(E(),c(K,{key:3,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:a(()=>[(E(!0),l(n,null,w(h.value,t=>(E(),l(`li`,{key:t.id},[i(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:u({borderColor:`var(--border)`,backgroundColor:C.value===t.id?`var(--muted)`:`transparent`}),"aria-current":C.value===t.id?`true`:void 0,onClick:e=>I(t)},[i(`div`,ut,[i(`span`,dt,f(t.subject),1),t.unread?(E(),c(s(Ie),{key:0,value:t.unread,type:`warning`},null,8,[`value`])):(E(),l(`span`,{key:1,class:`tech-label shrink-0 tech-label--cn text-xs`,style:u({color:t.status===`open`?`var(--status-printing)`:`var(--text-tertiary)`})},f(s(Se)[t.status]),5))]),i(`p`,ft,f(t.last_body),1),i(`p`,pt,[b(` 工单 `+f(t.id)+` `,1),e.staff&&t.owner_nickname?(E(),l(n,{key:0},[b(` · `+f(t.owner_nickname),1)],64)):o(``,!0),b(` · `+f(s(Ce)(t.update_time))+` · `+f(t.msg_count)+` 条 `,1)])],12,lt)]))),128))]),_:1})):(E(),l(`div`,ct,[g(Z,{code:`00 / NO TICKET`,title:e.staff?`无工单`:`尚未提交工单`,hint:e.staff?`学生提交后在此列示`:`打印相关问题 · 新建工单提交`},{icon:a(()=>[g(s(pe),{size:28})]),_:1},8,[`title`,`hint`])]))]),i(`div`,mt,[M.value?(E(),c(nt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:r[3]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(E(),l(`div`,ht,[g(Z,{code:`00 / NO TICKET`,title:`从左侧选择工单`,hint:`窄屏以抽屉打开`},{icon:a(()=>[g(s(Ve),{size:28})]),_:1})]))])]),g(s(ue),{show:D.value,"onUpdate:show":r[5]||=e=>D.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:a(()=>[g(s(de),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:a(()=>[i(`div`,gt,[M.value?(E(),c(nt,{key:M.value.id,"ticket-id":M.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:r[4]||=e=>F(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):o(``,!0)])]),_:1})]),_:1},8,[`show`]),g(s(_e),{show:O.value,"onUpdate:show":r[9]||=e=>O.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:a(()=>[i(`div`,_t,[g(s(H),{quaternary:``,onClick:r[8]||=e=>O.value=!1},{default:a(()=>[...r[12]||=[b(`取消`,-1)]]),_:1}),g(s(H),{type:`primary`,class:`!font-bold`,loading:k.value,onClick:L},{default:a(()=>[...r[13]||=[b(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:a(()=>[g(s(le),{label:`标题`,"show-feedback":!1},{default:a(()=>[g(s(X),{value:A.subject,"onUpdate:value":r[6]||=e=>A.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),g(s(le),{label:`详细描述`,"show-feedback":!1},{default:a(()=>[g(s(X),{value:A.body,"onUpdate:value":r[7]||=e=>A.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`写清单号、遇到的问题与期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{vt as t};