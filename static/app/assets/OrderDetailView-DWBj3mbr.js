import{An as e,B as t,Cn as n,Dn as r,Dt as i,En as a,Fn as o,Gn as s,Hn as c,Kn as l,N as u,Sr as d,St as f,Tn as p,Tt as m,V as h,_t as g,an as _,c as v,dr as y,f as b,in as x,j as S,jn as C,kn as w,mt as T,nn as E,qn as D,sn as O,tn as k,tr as A,u as j,wn as M,xr as N,yn as P,yr as F,z as I}from"./endpoints-gDUDUnKI.js";import{t as L}from"./Empty-ByG1ebw9.js";import{t as R}from"./format-length-BwSo_EUP.js";import{t as z}from"./Alert-Duf6l6xp.js";import{n as B,t as V}from"./Skeleton-BKWPjkVr.js";import{b as ee,d as te,p as ne,t as re,u as ie}from"./index-DmEbPUOi.js";import{t as H}from"./createLucideIcon-B24cT97-.js";import{t as U}from"./download-DLPe4JqW.js";import{t as W}from"./refresh-cw-4vMvhY75.js";import{f as G,l as K,m as q,n as J,p as Y,r as ae,t as oe,u as X}from"./format-D36ElkIK.js";import{t as se}from"./RoleTag-ZVhluZp3.js";import{t as ce}from"./PageHeader-cqOWns8s.js";import{t as le}from"./StatusTag-BMVXZMke.js";function ue(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...ne,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var de={name:`Timeline`,common:h,self:ue},Z=1.25,fe=E(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[_(`horizontal`,`
 flex-direction: row;
 `,[k(`>`,[E(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[_(`dashed-line-type`,[k(`>`,[E(`timeline-item-timeline`,[x(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),k(`>`,[E(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[k(`>`,[x(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),E(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[x(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),_(`right-placement`,[E(`timeline-item`,[E(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),E(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),_(`left-placement`,[E(`timeline-item`,[E(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),E(`timeline-item-timeline`,`
 left: 0;
 `)])]),E(`timeline-item`,`
 position: relative;
 `,[k(`&:last-child`,[E(`timeline-item-timeline`,[x(`line`,`
 display: none;
 `)]),E(`timeline-item-content`,[x(`meta`,`
 margin-bottom: 0;
 `)])]),E(`timeline-item-content`,[x(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),x(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),x(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),_(`dashed-line-type`,[E(`timeline-item-timeline`,[x(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),E(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[x(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),x(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),x(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),pe={...I.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=m(`n-timeline`),me=C({name:`Timeline`,props:pe,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=f(e),i=I(`Timeline`,`-timeline`,fe,de,e,n);return l(Q,{props:e,mergedThemeRef:i,mergedClsPrefixRef:n}),()=>{let{value:i}=n;return s(),r(`div`,{class:T([`${i}-timeline`,e.horizontal&&`${i}-timeline--horizontal`,`${i}-timeline--${e.size}-size`,!e.horizontal&&`${i}-timeline--${e.itemPlacement}-placement`])},[g(()=>t.default?.())],2)}}}),he=C({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let r=o(Q);r||i(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),B();let{inlineThemeDisabled:a}=f(),s=n(()=>{let{props:{size:t,iconSize:n},mergedThemeRef:i}=r,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[O(`iconSize`,t)]:f,[O(`titleMargin`,t)]:p,[O(`titleFontSize`,t)]:m,[O(`circleBorder`,a)]:h,[O(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":R(n)||f}}),c=a?t(`timeline-item`,n(()=>{let{props:{size:t,iconSize:n}}=r,{type:i}=e;return`${t[0]}${n||`a`}${i[0]}`}),s,r.props):void 0;return{mergedClsPrefix:r.mergedClsPrefixRef,cssVars:a?void 0:s,themeClass:c?.themeClass,onRender:c?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:i}=this;return n?.(),s(),r(`div`,{class:T([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:N(this.cssVars)},[M(`div`,{class:T(`${e}-timeline-item-timeline`)},[M(`div`,{class:T(`${e}-timeline-item-timeline__line`)},null,2),g(()=>u(i.icon,n=>n?(s(),r(`div`,{key:1,class:T(`${e}-timeline-item-timeline__icon`),style:N({color:t})},[g(()=>n)],6)):(s(),r(`div`,{key:2,class:T(`${e}-timeline-item-timeline__circle`),style:N({borderColor:t})},null,6))))],2),M(`div`,{class:T(`${e}-timeline-item-content`)},[g(()=>u(i.header,t=>t||this.title?(s(),r(`div`,{key:3,class:T(`${e}-timeline-item-content__title`)},[g(()=>t||this.title)],2)):null)),M(`div`,{class:T(`${e}-timeline-item-content__content`)},[g(()=>S(i.default,()=>[this.content]))],2),M(`div`,{class:T(`${e}-timeline-item-content__meta`)},[g(()=>S(i.footer,()=>[this.time]))],2)],2)],6)}}),ge=H({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),_e=H({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),ve={class:`mx-auto max-w-[1000px]`},ye={key:0,class:`flex flex-col gap-3`},be={key:1,class:`panel grid place-items-center py-16`},xe={class:`panel mb-3 p-4`},Se={class:`flex flex-wrap items-start justify-between gap-3`},Ce={class:`min-w-0`},we=[`title`],Te={class:`tech-label mt-1 text-ink-4`},Ee={class:`flex shrink-0 flex-wrap items-center gap-2`},De={class:`mb-3 grid gap-3 sm:grid-cols-2`},Oe={class:`panel p-4`},ke={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3`},Ae={class:`divide-y`,style:{"border-color":`var(--border)`}},je={class:`shrink-0 text-[12px] text-ink-4`},Me=[`title`],Ne={key:0,class:`mt-1 whitespace-pre-wrap break-words rounded-md p-2 text-[13px] leading-6`,style:{background:`var(--accent-tint-soft)`}},Pe={key:1,class:`mt-1 text-[13px] text-ink-4`},Fe={class:`flex flex-col gap-3`},Ie={class:`panel p-4`},Le={class:`divide-y`,style:{"border-color":`var(--border)`}},Re={class:`shrink-0 text-[12px] text-ink-4`},ze=[`title`],Be={class:`panel p-4`},Ve={class:`divide-y`,style:{"border-color":`var(--border)`}},$={class:`shrink-0 text-[12px] text-ink-4`},He=[`title`],Ue={key:1,class:`mt-3 text-[11px] text-ink-4`},We={class:`panel p-4`},Ge={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3`},Ke={class:`text-ink-4`},qe={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},Je={class:`text-[13px] font-semibold`},Ye={class:`text-[12px] text-ink-3`},Xe={key:0,class:`mt-0.5 break-words text-[12px] leading-5 text-ink-3`},Ze={key:1,class:`text-[12px] leading-6 text-ink-4`},Qe={class:`tech-label mt-3 text-ink-4`},$e=C({__name:`OrderDetailView`,setup(t){let i=ie(),o=te(),l=re(),u=ee(),f=n(()=>{let e=Array.isArray(i.params.id)?i.params.id[0]:i.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),m=y(null),h=y([]),g=y(!1),_=y(!1),x=n(()=>l.user?.id??0),S=n(()=>l.advancedAllowed),C=n(()=>{let e=m.value;return!e||e.claimed_by===null?!1:S.value||e.claimed_by===x.value}),T=n(()=>{let e=m.value;return e?[{label:`规格`,value:`${e.color_type?oe[e.color_type]:`黑白`} / ${e.duplex?J[e.duplex]:`单面`}`},{label:`文件名`,value:e.filename},{label:`文件大小`,value:K(e.file_size)}]:[]}),E=n(()=>{let e=m.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),O=n(()=>{let e=m.value;return e?[{label:`取件码`,value:G(e.pickup_code)},{label:`金额`,value:Y(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?X(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?X(e.price_time):null},{label:`提交时间`,value:X(e.create_time)},{label:`最后更新`,value:X(e.update_time)}]:[]});async function k(){if(f.value!==null){g.value=!0;try{let e=await v.detail(f.value);m.value=e.order,h.value=e.logs}catch(e){u.error(e instanceof j?e.message:`加载订单详情失败`)}finally{g.value=!1}}}async function I(){let e=m.value;if(e){_.value=!0;try{await v.download(e.id,e.filename),await k()}catch(e){u.error(e instanceof j?e.message:`下载失败`)}finally{_.value=!1}}}function R(){o.push(`/staff/orders`)}return c(k),(t,n)=>(s(),r(`div`,ve,[e(ce,{title:m.value?`订单 #${m.value.id}`:`订单详情`,subtitle:`完整的订单信息与操作记录`},{actions:A(()=>[e(F(b),{size:`small`,quaternary:``,onClick:R},{icon:A(()=>[e(F(ge),{size:15})]),default:A(()=>[n[1]||=w(` 返回订单台 `,-1)]),_:1}),e(F(b),{size:`small`,quaternary:``,loading:g.value,onClick:n[0]||=e=>k()},{icon:A(()=>[e(F(W),{size:15})]),default:A(()=>[n[2]||=w(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),g.value&&!m.value?(s(),r(`div`,ye,[e(F(V),{height:`96px`,sharp:!1}),e(F(V),{height:`180px`,sharp:!1}),e(F(V),{height:`240px`,sharp:!1})])):m.value?(s(),r(P,{key:2},[M(`div`,xe,[M(`div`,Se,[M(`div`,Ce,[M(`h2`,{class:`truncate text-[17px] font-bold`,title:m.value.filename},d(m.value.filename),9,we),M(`p`,Te,` 提交于 `+d(F(X)(m.value.create_time)),1)]),M(`div`,Ee,[e(le,{status:m.value.status},null,8,[`status`]),M(`span`,{class:`tnum font-heading text-[18px] font-bold`,style:N({color:m.value.price===null||m.value.price===void 0?`var(--text-quaternary)`:`var(--primary)`})},d(F(Y)(m.value.price)),5)])]),m.value.file_exists?a(``,!0):(s(),p(F(z),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:A(()=>[...n[3]||=[w(` 订单记录还在，但落盘的文件已经不在上传目录里。请先确认是不是被人手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1}))]),M(`div`,De,[M(`section`,Oe,[M(`h3`,ke,[n[4]||=w(` 打印要求 `,-1),m.value.file_exists?a(``,!0):(s(),p(F(_e),{key:0,size:13}))]),M(`dl`,Ae,[(s(!0),r(P,null,D(T.value,e=>(s(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[M(`dt`,je,d(e.label),1),M(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},d(e.value??`—`),9,Me)]))),128))]),n[5]||=M(`p`,{class:`mt-2 text-[11px] text-ink-4`},`备注`,-1),m.value.remark?(s(),r(`p`,Ne,d(m.value.remark),1)):(s(),r(`p`,Pe,`学生没有填写备注`))]),M(`div`,Fe,[M(`section`,Ie,[n[6]||=M(`h3`,{class:`tech-label mb-1 text-ink-3`},`下单人`,-1),M(`dl`,Le,[(s(!0),r(P,null,D(E.value,e=>(s(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[M(`dt`,Re,d(e.label),1),M(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},d(e.value??`—`),9,ze)]))),128))])]),M(`section`,Be,[n[7]||=M(`h3`,{class:`tech-label mb-1 text-ink-3`},`流程信息`,-1),M(`dl`,Ve,[(s(!0),r(P,null,D(O.value,e=>(s(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[M(`dt`,$,d(e.label),1),M(`dd`,{class:`tnum min-w-0 truncate text-right text-[13px]`,title:e.value??``},d(e.value??`—`),9,He)]))),128))]),C.value?(s(),p(F(b),{key:0,size:`small`,block:``,class:`mt-3`,loading:_.value,onClick:I},{icon:A(()=>[e(F(U),{size:14})]),default:A(()=>[w(` 下载文件（`+d(F(K)(m.value.file_size))+`） `,1)]),_:1},8,[`loading`])):m.value.claimed_by===null?(s(),r(`p`,Ue,` 接单后才能下载文件。 `)):a(``,!0)])])]),M(`section`,We,[M(`h3`,Ge,[n[8]||=w(` 操作记录 `,-1),M(`span`,Ke,d(h.value.length)+` 条`,1)]),h.value.length?(s(),p(F(me),{key:0},{default:A(()=>[(s(!0),r(P,null,D(h.value,e=>(s(),p(F(he),{key:e.id,time:F(X)(e.create_time),color:F(ae)[e.action]},{default:A(()=>[M(`div`,qe,[M(`span`,Je,d(e.action_label),1),M(`span`,Ye,d(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(s(),p(se,{key:0,role:e.actor_role},null,8,[`role`])):a(``,!0)]),e.detail?(s(),r(`p`,Xe,d(e.detail),1)):a(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(s(),r(`p`,Ze,` 这一单还没有操作记录。留痕功能是后加的，升级之前发生的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如明确告诉你这里没有。 `))]),M(`p`,Qe,`最后更新 `+d(F(q)(m.value.update_time)),1)],64)):(s(),r(`div`,be,[e(F(L),{description:f.value===null?`订单号不对，检查一下地址栏`:`没有这个订单`},null,8,[`description`])]))]))}});export{$e as default};