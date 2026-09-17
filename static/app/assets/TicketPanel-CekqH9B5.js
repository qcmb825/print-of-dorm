import{A as e,An as t,C as n,Ct as r,Dr as i,Dt as a,Er as o,Fn as s,Gn as c,H as l,Hn as u,In as d,K as f,M as p,Mn as m,N as h,O as g,On as _,Pn as v,Qn as y,S as b,Sn as x,St as S,Tr as C,Tt as w,U as T,Xn as E,_n as D,_t as O,d as k,f as A,fn as j,gr as M,ir as ee,jn as N,k as P,kn as F,ln as I,m as L,mr as R,on as z,or as B,qn as V,rr as H,sn as U,tr as te,un as W,v as G,vn as K,wn as q,wr as J,xn as ne,xr as Y,y as re,yt as X}from"./endpoints-D7YssODM.js";import{t as ie}from"./Empty-CXl0uUVS.js";import{a as ae}from"./Scrollbar-BE5qE3gb.js";import{r as oe}from"./cssr-Db0WhKUi.js";import{a as se,t as ce}from"./Select-BcJI0Ev_.js";import{t as le}from"./FormItem-DrAinvPf.js";import{t as Z}from"./Input-C-372aM3.js";import{n as ue,t as de}from"./DrawerContent-DZsKcius.js";import{t as fe}from"./Skeleton-DZAkXxbB.js";import{b as pe,g as me,x as he,z as ge}from"./index-CTz7zfxj.js";import{t as _e}from"./createLucideIcon-CKtBO55A.js";import{t as ve}from"./inbox-B499Cwp3.js";import{t as ye}from"./lock-DEonhVsf.js";import{t as be}from"./plus-Z2E8uAkP.js";import{t as xe}from"./send-1yEnFaWS.js";import{c as Se,v as Ce}from"./format-D-wfinI7.js";import{r as we,t as Te}from"./dist-Bjcx7Mfe.js";var Ee=d({name:`SlotMachineNumber`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){let t=M(null),n=M(e.value),r=M(e.value),i=M(`up`),a=M(!1),o=_(()=>a.value?`${e.clsPrefix}-base-slot-machine-current-number--${i.value}-scroll`:null),s=_(()=>a.value?`${e.clsPrefix}-base-slot-machine-old-number--${i.value}-scroll`:null);H(Y(e,`value`),(e,t)=>{n.value=t,r.value=e,u(c)});function c(){let t=e.newOriginalNumber,n=e.oldOriginalNumber;n!==void 0&&t!==void 0&&(t>n?l(`up`):n>t&&l(`down`))}function l(e){i.value=e,a.value=!1,u(()=>{t.value?.offsetWidth,a.value=!0})}return()=>{let{clsPrefix:i}=e;return E(),m(`span`,{ref:t,class:X(`${i}-base-slot-machine-number`)},[n.value===null?S(()=>null):(E(),m(`span`,{key:0,class:X([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--top`,s.value])},[S(()=>n.value)],2)),F(`span`,{class:X([`${i}-base-slot-machine-current-number`,o.value])},[F(`span`,{ref:`numberWrapper`,class:X([`${i}-base-slot-machine-current-number__inner`,typeof e.value!=`number`&&`${i}-base-slot-machine-current-number__inner--not-number`])},[S(()=>r.value)],2)],2),n.value===null?S(()=>null):(E(),m(`span`,{key:2,class:X([`${i}-base-slot-machine-old-number ${i}-base-slot-machine-old-number--bottom`,s.value])},[S(()=>n.value)],2))],2)}}}),{cubicBezierEaseOut:Q}=w;function De({duration:e=`.2s`}={}){return[z(`&.fade-up-width-expand-transition-leave-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),z(`&.fade-up-width-expand-transition-enter-active`,{transition:`
 opacity ${e} ${Q},
 max-width ${e} ${Q},
 transform ${e} ${Q}
 `}),z(`&.fade-up-width-expand-transition-enter-to`,{opacity:1,transform:`translateX(0) translateY(0)`}),z(`&.fade-up-width-expand-transition-enter-from`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`}),z(`&.fade-up-width-expand-transition-leave-from`,{opacity:1,transform:`translateY(0)`}),z(`&.fade-up-width-expand-transition-leave-to`,{maxWidth:`0 !important`,opacity:0,transform:`translateY(60%)`})]}var Oe=z([z(`@keyframes n-base-slot-machine-fade-up-in`,`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),z(`@keyframes n-base-slot-machine-fade-down-in`,`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),z(`@keyframes n-base-slot-machine-fade-up-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),z(`@keyframes n-base-slot-machine-fade-down-out`,`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),U(`base-slot-machine`,`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[U(`base-slot-machine-number`,`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[De({duration:`.2s`}),re({duration:`.2s`,delay:`0s`}),U(`base-slot-machine-old-number`,`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[W(`top`,{transform:`translateY(-100%)`}),W(`bottom`,{transform:`translateY(100%)`}),W(`down-scroll`,{animation:`n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),W(`up-scroll`,{animation:`n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1})]),U(`base-slot-machine-current-number`,`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[W(`down-scroll`,{animation:`n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),W(`up-scroll`,{animation:`n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)`,animationIterationCount:1}),I(`inner`,`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[W(`not-number`,`
 right: unset;
 left: 0;
 `)])])])])]),ke=d({name:`BaseSlotMachine`,props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){r(`-base-slot-machine`,Oe,Y(e,`clsPrefix`));let n=M(),i=M(),a=_(()=>{if(typeof e.value==`string`)return[];if(e.value<1)return[0];let t=[],n=e.value;for(e.max!==void 0&&(n=Math.min(e.max,n));n>=1;)t.push(n%10),n/=10,n=Math.floor(n);return t.reverse(),t});return H(Y(e,`value`),(e,t)=>{typeof e==`string`?(i.value=void 0,n.value=void 0):typeof t==`string`?(i.value=e,n.value=void 0):(i.value=e,n.value=t)}),()=>{let{value:r,clsPrefix:o}=e;return typeof r==`number`?(E(),m(`span`,{key:1,class:X(`${o}-base-slot-machine`)},[s(K,{name:`fade-up-width-expand-transition`,tag:`span`},{default:()=>a.value.map((e,r)=>(E(),t(Ee,{clsPrefix:o,key:a.value.length-r-1,oldOriginalNumber:n.value,newOriginalNumber:i.value,value:e},null,8,[`clsPrefix`,`oldOriginalNumber`,`newOriginalNumber`,`value`])))},1024),s(g,{key:`+`,width:!0},{default:()=>e.max!==void 0&&e.max<r?(E(),t(Ee,{key:2,clsPrefix:o,value:`+`},null,8,[`clsPrefix`])):null},1024)],2)):(E(),m(`span`,{key:3,class:X(`${o}-base-slot-machine`)},[S(()=>r)],2))}}});function Ae(e){let{errorColor:t,infoColor:n,successColor:r,warningColor:i,fontFamily:a}=e;return{color:t,colorInfo:n,colorSuccess:r,colorError:t,colorWarning:i,fontSize:`12px`,fontFamily:a}}var je={name:`Badge`,common:f,self:Ae},Me=z([z(`@keyframes badge-wave-spread`,{from:{boxShadow:`0 0 0.5px 0px var(--n-ripple-color)`,opacity:.6},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`,opacity:0}}),U(`badge`,`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[W(`as-is`,[U(`badge-sup`,{position:`static`,transform:`translateX(0)`},[ge({transformOrigin:`left bottom`,originalTransform:`translateX(0)`})])]),W(`dot`,[U(`badge-sup`,`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[z(`::before`,`border-radius: 4px;`)])]),U(`badge-sup`,`
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
 `,[ge({transformOrigin:`left bottom`,originalTransform:`translateX(-50%)`}),U(`base-wave`,{zIndex:1,animationDuration:`2s`,animationIterationCount:`infinite`,animationDelay:`1s`,animationTimingFunction:`var(--n-ripple-bezier)`,animationName:`badge-wave-spread`}),z(`&::before`,`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),Ne=[`title`],Pe={...l.props,value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:`default`},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array},Fe=d({name:`Badge`,props:Pe,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:o}=a(t),s=l(`Badge`,`-badge`,Me,je,t,r),c=M(!1),u=()=>{c.value=!0},d=()=>{c.value=!1},f=_(()=>t.show&&(t.dot||t.value!==void 0&&!(!t.showZero&&Number(t.value)<=0)||!p(n.value)));V(()=>{f.value&&(c.value=!0)});let m=e(`Badge`,o,r),h=_(()=>{let{type:e,color:n}=t,{common:{cubicBezierEaseInOut:r,cubicBezierEaseOut:i},self:{[j(`color`,e)]:a,fontFamily:o,fontSize:c}}=s.value;return{"--n-font-size":c,"--n-font-family":o,"--n-color":n||a,"--n-ripple-color":n||a,"--n-bezier":r,"--n-ripple-bezier":i}}),g=i?T(`badge`,_(()=>{let e=``,{type:n,color:r}=t;return n&&(e+=n[0]),r&&(e+=P(r)),e}),h,t):void 0,v=_(()=>{let{offset:e}=t;if(!e)return;let[n,r]=e,i=typeof n==`number`?`${n}px`:n,a=typeof r==`number`?`${r}px`:r;return{transform:`translate(calc(${m?.value?`50%`:`-50%`} + ${i}), ${a})`}});return{rtlEnabled:m,mergedClsPrefix:r,appeared:c,showBadge:f,handleAfterEnter:u,handleAfterLeave:d,cssVars:i?void 0:h,themeClass:g?.themeClass,onRender:g?.onRender,offsetStyle:v}},render(){let{mergedClsPrefix:e,onRender:n,themeClass:r,$slots:i}=this;n?.();let a=i.default?.();return E(),m(`div`,{class:X([`${e}-badge`,this.rtlEnabled&&`${e}-badge--rtl`,r,{[`${e}-badge--dot`]:this.dot,[`${e}-badge--as-is`]:!a}]),style:o(this.cssVars)},[S(()=>a),(E(),t(D,{name:`fade-in-scale-up-transition`,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?(E(),m(`sup`,{key:1,class:X(`${e}-badge-sup`),title:se(this.value),style:o(this.offsetStyle)},[S(()=>h(i.value,()=>[this.dot?null:(E(),t(ke,{key:2,clsPrefix:e,appeared:this.appeared,max:this.max,value:this.value},null,8,[`clsPrefix`,`appeared`,`max`,`value`]))])),this.processing?(E(),t(G,{key:0,clsPrefix:e},null,8,[`clsPrefix`])):S(()=>null)],14,Ne)):null},1032,[`onAfterEnter`,`onAfterLeave`]))],6)}}),Ie=z([z(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),U(`spin-container`,`
 position: relative;
 `,[U(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[ae()])]),U(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),U(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[W(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),U(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),U(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[W(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Le={small:20,medium:18,large:16},Re={...l.props,contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number,...n,strokeWidth:Number},ze=d({name:`Spin`,props:Re,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=a(e),r=l(`Spin`,`-spin`,Ie,me,e,t),i=_(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{opacitySpinning:a,color:o,textColor:s}=i;return{"--n-bezier":n,"--n-opacity-spinning":a,"--n-size":typeof t==`number`?O(t):i[j(`size`,t)],"--n-color":o,"--n-text-color":s}}),o=n?T(`spin`,_(()=>{let{size:t}=e;return typeof t==`number`?String(t):t[0]}),i,e):void 0,s=oe(e,[`spinning`,`show`]),c=M(!1);return ee(t=>{let n;if(s.value){let{delay:r}=e;if(r){n=window.setTimeout(()=>{c.value=!0},r),t(()=>{clearTimeout(n)});return}}c.value=s.value}),{mergedClsPrefix:t,active:c,mergedStrokeWidth:_(()=>{let{strokeWidth:t}=e;if(t!==void 0)return t;let{size:n}=e;return Le[typeof n==`number`?`medium`:n]}),cssVars:n?void 0:i,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$slots:e,mergedClsPrefix:n,description:r}=this,i=e.icon&&this.rotate,a=(r||e.description)&&(E(),m(`div`,{class:X(`${n}-spin-description`)},[S(()=>r||e.description?.())],2)),c=e.icon?(E(),m(`div`,{key:1,class:X([`${n}-spin-body`,this.themeClass])},[F(`div`,{class:X([`${n}-spin`,i&&`${n}-spin--rotate`]),style:o(e.default?``:this.cssVars)},[S(()=>e.icon())],6),S(()=>a)],2)):(E(),m(`div`,{key:2,class:X([`${n}-spin-body`,this.themeClass])},[(E(),t(b,{clsPrefix:n,style:o(e.default?``:this.cssVars),stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:X(`${n}-spin`)},null,8,[`clsPrefix`,`style`,`stroke`,`stroke-width`,`radius`,`scale`,`class`])),S(()=>a)],2));return this.onRender?.(),e.default?(E(),m(`div`,{key:3,class:X([`${n}-spin-container`,this.themeClass]),style:o(this.cssVars)},[F(`div`,{class:X([`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass]),style:o(this.contentStyle)},[S(()=>e.default?.())],6),s(D,{name:`fade-in-transition`},{default:()=>this.active?c:null},1024)],6)):c}}),Be=_e({name:`message-square-plus`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M12 8v6`,key:`1ib9pf`}],[`path`,{d:`M9 11h6`,key:`1fldmi`}]]}),Ve=_e({name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]}),He={class:`flex h-full flex-col`},Ue={class:`flex items-start justify-between gap-3 border-b px-4 py-3`,style:{"border-color":`var(--border)`}},We={class:`min-w-0`},Ge={class:`truncate font-heading text-[15px] font-bold`},Ke={class:`tech-label mt-1 text-ink-4`},qe={class:`max-w-[86%]`},Je={class:`font-semibold`},Ye={class:`tnum`},Xe={class:`border-t px-4 py-3`,style:{"border-color":`var(--border)`}},Ze={class:`mt-2 flex items-center justify-between gap-3`},Qe={class:`tnum text-[11px] text-ink-4`},$e=3e3,$=8e3,et=15e3,tt=d({__name:`TicketDetail`,props:{ticketId:{},staff:{type:Boolean},currentUserId:{}},emits:[`changed`],setup(e,{emit:n}){let r=e,a=n,l=pe(),d=M(null),f=M(!1),p=M(``),h=M(!1),g=M(null),b=M(0),S=M($),w=_(()=>d.value?.messages??[]),T=_(()=>d.value?.ticket??null),D=_(()=>T.value?.status===`closed`);function O(){return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}async function j(e){await u();let t=g.value;t&&t.scrollTo({top:t.scrollHeight,behavior:e&&O()?`smooth`:`auto`})}function ee(){let e=g.value;return!e||e.scrollHeight-e.scrollTop-e.clientHeight<80}async function P(){f.value=!0;try{d.value=await k.detail(r.ticketId),b.value=d.value.last_id??0,a(`changed`)}catch(e){l.error(e instanceof A?e.message:`加载工单失败`)}finally{f.value=!1}}let I=!1;async function R(){if(!I&&d.value){I=!0;try{let e=await k.messagesSince(r.ticketId,b.value);e.last_id>b.value&&(b.value=e.last_id);let t=new Set(w.value.map(e=>e.id)),n=e.messages.filter(e=>!t.has(e.id));if(n.length){let e=ee();d.value.messages.push(...n),S.value=$e,e&&!p.value.trim()&&await j(!0),a(`changed`)}else S.value=S.value<$?$:Math.min(Math.round(S.value*1.6),et);e.status&&d.value.ticket.status!==e.status&&(d.value.ticket.status=e.status,a(`changed`))}catch{S.value=et}finally{I=!1}}}async function z(){let e=p.value.trim();if(e){h.value=!0;try{await k.reply(r.ticketId,e),p.value=``,await P(),await j(!0),S.value=$e}catch(e){l.error(e instanceof A?e.message:`发送失败`)}finally{h.value=!1}}}async function U(){try{await k.setStatus(r.ticketId,D.value?`open`:`closed`),l.success(D.value?`工单已重新打开`:`工单已关闭`),await P()}catch(e){l.error(e instanceof A?e.message:`操作失败`)}}let W=Te(),{pause:G,resume:Y}=we(()=>void R(),S,{immediate:!1});return H(W,e=>{e===`visible`?(R(),Y()):G()}),V(async()=>{await P(),Y(),await j(!1)}),H(()=>r.ticketId,async()=>{b.value=0,S.value=$,await P(),await j(!1),Y()}),c(G),(n,r)=>(E(),m(`div`,He,[F(`header`,Ue,[F(`div`,We,[F(`h3`,Ge,i(T.value?.subject??`加载中…`),1),F(`p`,Ke,[v(` #`+i(e.ticketId)+` `,1),e.staff&&T.value?(E(),m(q,{key:0},[v(` · 提交人 `+i(T.value.owner_nickname),1)],64)):N(``,!0),T.value?(E(),m(q,{key:1},[v(` · `+i(J(Se)[T.value.status]),1)],64)):N(``,!0)])]),T.value?(E(),t(J(L),{key:0,size:`small`,quaternary:``,disabled:f.value,onClick:U},{icon:B(()=>[(E(),t(te(D.value?J(Ve):J(ye)),{size:14}))]),default:B(()=>[v(` `+i(D.value?`重开`:`关闭`),1)]),_:1},8,[`disabled`])):N(``,!0)]),F(`div`,{ref_key:`scroller`,ref:g,class:`min-h-0 flex-1 overflow-y-auto px-4 py-3`},[s(J(ze),{show:f.value&&!w.value.length},{default:B(()=>[s(K,{tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:B(()=>[(E(!0),m(q,null,y(w.value,t=>(E(),m(`li`,{key:t.id,class:C([`flex`,t.sender_id===e.currentUserId?`justify-end`:`justify-start`])},[F(`div`,qe,[F(`div`,{class:C([`mb-1 flex items-center gap-2 text-[11px] text-ink-4`,t.sender_id===e.currentUserId?`justify-end`:``])},[F(`span`,Je,i(t.sender_nickname??`（已注销）`),1),F(`span`,Ye,i(t.create_time?.slice(5,16)??``),1)],2),F(`div`,{class:`rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words`,style:o(t.sender_id===e.currentUserId?{backgroundColor:`var(--accent-tint)`,borderColor:`var(--accent-tint-border)`}:{backgroundColor:`var(--muted)`,borderColor:`var(--border)`})},i(t.body),5)])],2))),128))]),_:1})]),_:1},8,[`show`])],512),F(`footer`,Xe,[s(J(Z),{value:p.value,"onUpdate:value":r[0]||=e=>p.value=e,type:`textarea`,maxlength:1e3,autosize:{minRows:2,maxRows:5},placeholder:D.value?`工单已关闭，先重新打开再回复`:`输入回复内容，Enter 发送`,disabled:D.value||h.value,onKeydown:ne(x(z,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`placeholder`,`disabled`,`onKeydown`]),F(`div`,Ze,[F(`span`,Qe,i(p.value.length)+` / 1000`,1),s(J(L),{type:`primary`,size:`small`,loading:h.value,disabled:D.value||!p.value.trim(),class:`!font-bold`,onClick:z},{icon:B(()=>[s(J(xe),{size:14})]),default:B(()=>[r[1]||=v(` 发送 `,-1)]),_:1},8,[`loading`,`disabled`])])])]))}}),nt={class:`mx-auto max-w-6xl`},rt={class:`mb-4 flex flex-wrap items-center justify-between gap-3`},it={class:`flex items-center gap-2 font-heading text-lg font-bold sm:text-xl`},at={class:`mt-0.5 text-[13px] text-ink-3`},ot={class:`flex items-center gap-2`},st={class:`grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]`},ct={class:`panel overflow-hidden`},lt={key:0,class:`flex flex-col gap-2 p-3`},ut={key:1,class:`grid place-items-center py-12`},dt=[`aria-current`,`onClick`],ft={class:`flex items-start justify-between gap-2`},pt={class:`min-w-0 flex-1 truncate text-[13px] font-semibold`},mt={class:`mt-1 line-clamp-2 text-[12px] text-ink-3`},ht={class:`tech-label mt-1.5 text-ink-4`},gt={class:`panel hidden min-h-[420px] overflow-hidden lg:block`},_t={key:1,class:`grid h-full place-items-center py-16`},vt={class:`h-[82vh]`},yt={class:`flex justify-end gap-2`},bt=d({__name:`TicketPanel`,props:{staff:{type:Boolean},currentUserId:{}},setup(e){let n=pe(),r=M([]),a=M(0),c=M(!0),l=M(`all`),u=M(null),d=M(!1),f=M(!1),p=M(!1),h=R({subject:``,body:``}),g=[{label:`全部`,value:`all`},{label:`进行中`,value:`open`},{label:`已关闭`,value:`closed`}],b=_(()=>r.value.find(e=>e.id===u.value)??null);async function x(e=!1){e||(c.value=!0);try{let e=await k.list(l.value===`all`?void 0:l.value);r.value=e.tickets,a.value=e.unread_total,u.value&&!r.value.some(e=>e.id===u.value)&&(u.value=null)}catch(t){e||n.error(t instanceof A?t.message:`加载工单失败`)}finally{c.value=!1}}function S(e){u.value=e.id,window.matchMedia(`(max-width: 1023px)`).matches&&(d.value=!0)}async function C(){if(!h.subject.trim()||!h.body.trim()){n.warning(`标题和描述都要填`);return}p.value=!0;try{let e=await k.create(h.subject.trim(),h.body.trim());n.success(`工单已提交，等待管理员回复`),f.value=!1,h.subject=``,h.body=``,await x(),u.value=e.id}catch(e){n.error(e instanceof A?e.message:`提交失败`)}finally{p.value=!1}}let w=Te(),{pause:T,resume:D}=we(()=>void x(!0),3e4,{immediate:!1});return H(w,e=>e===`visible`?(D(),void x(!0)):T()),H(l,()=>void x()),V(async()=>{await x(),D()}),(n,_)=>(E(),m(`div`,nt,[F(`header`,rt,[F(`div`,null,[F(`h1`,it,[v(i(e.staff?`工单处理`:`问题反馈`)+` `,1),a.value?(E(),t(J(Fe),{key:0,value:a.value,type:`warning`},null,8,[`value`])):N(``,!0)]),F(`p`,at,i(e.staff?`学生提交的问题与需求，回复后对方会看到未读提示`:`有打印相关的问题，在这里留言给管理员`),1)]),F(`div`,ot,[s(J(ce),{value:l.value,"onUpdate:value":_[0]||=e=>l.value=e,options:g,size:`small`,class:`!w-[112px]`,"consistent-menu-width":!1},null,8,[`value`]),e.staff?N(``,!0):(E(),t(J(L),{key:0,type:`primary`,size:`small`,class:`!font-bold`,onClick:_[1]||=e=>f.value=!0},{icon:B(()=>[s(J(be),{size:15})]),default:B(()=>[_[9]||=v(` 新建工单 `,-1)]),_:1}))])]),F(`div`,st,[F(`div`,ct,[c.value&&!r.value.length?(E(),m(`div`,lt,[(E(),m(q,null,y(4,e=>s(J(fe),{key:e,height:`58px`,sharp:!1})),64))])):r.value.length?(E(),t(K,{key:2,tag:`ul`,class:`flex max-h-[62vh] list-none flex-col overflow-y-auto p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:B(()=>[(E(!0),m(q,null,y(r.value,n=>(E(),m(`li`,{key:n.id},[F(`button`,{type:`button`,class:`w-full border-b px-3.5 py-3 text-left transition-colors`,style:o({borderColor:`var(--border)`,backgroundColor:u.value===n.id?`var(--muted)`:`transparent`}),"aria-current":u.value===n.id?`true`:void 0,onClick:e=>S(n)},[F(`div`,ft,[F(`span`,pt,i(n.subject),1),n.unread?(E(),t(J(Fe),{key:0,value:n.unread,type:`warning`},null,8,[`value`])):(E(),m(`span`,{key:1,class:`tech-label shrink-0`,style:o({color:n.status===`open`?`var(--secondary)`:`var(--text-quaternary)`})},i(J(Se)[n.status]),5))]),F(`p`,mt,i(n.last_body),1),F(`p`,ht,[v(` #`+i(n.id)+` `,1),e.staff&&n.owner_nickname?(E(),m(q,{key:0},[v(` · `+i(n.owner_nickname),1)],64)):N(``,!0),v(` · `+i(J(Ce)(n.update_time))+` · `+i(n.msg_count)+` 条 `,1)])],12,dt)]))),128))]),_:1})):(E(),m(`div`,ut,[s(J(ie),{description:e.staff?`暂无工单`:`还没有工单`,size:`small`},{icon:B(()=>[s(J(ve),{size:30})]),_:1},8,[`description`])]))]),F(`div`,gt,[b.value?(E(),t(tt,{key:b.value.id,"ticket-id":b.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:_[2]||=e=>x(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):(E(),m(`div`,_t,[s(J(ie),{description:`从左侧选一个工单查看详情`,size:`small`},{icon:B(()=>[s(J(Be),{size:30})]),_:1})]))])]),s(J(ue),{show:d.value,"onUpdate:show":_[4]||=e=>d.value=e,width:`min(92vw, 440px)`,placement:`right`},{default:B(()=>[s(J(de),{"native-scrollbar":!1,"body-content-style":`padding: 0`},{default:B(()=>[F(`div`,vt,[b.value?(E(),t(tt,{key:b.value.id,"ticket-id":b.value.id,staff:e.staff,"current-user-id":e.currentUserId,onChanged:_[3]||=e=>x(!0)},null,8,[`ticket-id`,`staff`,`current-user-id`])):N(``,!0)])]),_:1})]),_:1},8,[`show`]),s(J(he),{show:f.value,"onUpdate:show":_[8]||=e=>f.value=e,preset:`card`,title:`新建工单`,class:`max-w-[520px]`,bordered:!1},{footer:B(()=>[F(`div`,yt,[s(J(L),{quaternary:``,onClick:_[7]||=e=>f.value=!1},{default:B(()=>[..._[10]||=[v(`取消`,-1)]]),_:1}),s(J(L),{type:`primary`,class:`!font-bold`,loading:p.value,onClick:C},{default:B(()=>[..._[11]||=[v(` 提交工单 `,-1)]]),_:1},8,[`loading`])])]),default:B(()=>[s(J(le),{label:`标题`,"show-feedback":!1},{default:B(()=>[s(J(Z),{value:h.subject,"onUpdate:value":_[5]||=e=>h.subject=e,maxlength:60,"show-count":``,placeholder:`一句话说明问题`},null,8,[`value`])]),_:1}),s(J(le),{label:`详细描述`,"show-feedback":!1},{default:B(()=>[s(J(Z),{value:h.body,"onUpdate:value":_[6]||=e=>h.body=e,type:`textarea`,maxlength:1e3,"show-count":``,autosize:{minRows:4,maxRows:8},placeholder:`请写清订单号、遇到的问题和期望的处理方式`},null,8,[`value`])]),_:1})]),_:1},8,[`show`])]))}});export{bt as t};