import{An as e,Cn as t,Cr as n,Dn as r,Er as i,Et as a,F as o,Fn as s,G as c,H as l,Kn as u,N as d,Nn as f,On as p,Pn as m,Tr as h,V as g,Xn as _,Yn as v,Zn as y,an as b,ar as x,cn as S,dn as C,f as w,hr as T,jn as E,jt as D,kn as O,kt as k,l as A,ln as j,m as M,on as N,vt as P,xt as F,zn as I}from"./endpoints-DguQVVk7.js";import{t as ee}from"./Empty-BFjxMWo5.js";import{t as L}from"./format-length-BwSo_EUP.js";import{t as te}from"./Alert-CPE2teib.js";import{n as R,t as z}from"./Skeleton-BTWN3gZh.js";import{b as B,d as V,p as ne,t as re,u as ie}from"./index-DwEf3xIY.js";import{t as H}from"./createLucideIcon-BYXIY-5M.js";import{t as ae}from"./download-Bcnjv0Yi.js";import{t as U}from"./refresh-cw-CwzhJGPL.js";import{_ as W,d as G,f as K,g as q,h as J,l as oe,m as Y,n as se,r as ce,t as le,u as X,v as ue}from"./format-D-wfinI7.js";import{t as de}from"./RoleTag-CItEgcUT.js";import{t as fe}from"./PageHeader-Qe33H4Ei.js";import{t as pe}from"./StatusTag-BoodXE5o.js";function me(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...ne,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var he={name:`Timeline`,common:c,self:me},Z=1.25,ge=N(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[j(`horizontal`,`
 flex-direction: row;
 `,[b(`>`,[N(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[j(`dashed-line-type`,[b(`>`,[N(`timeline-item-timeline`,[S(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),b(`>`,[N(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[b(`>`,[S(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),N(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[S(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),j(`right-placement`,[N(`timeline-item`,[N(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),N(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),j(`left-placement`,[N(`timeline-item`,[N(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),N(`timeline-item-timeline`,`
 left: 0;
 `)])]),N(`timeline-item`,`
 position: relative;
 `,[b(`&:last-child`,[N(`timeline-item-timeline`,[S(`line`,`
 display: none;
 `)]),N(`timeline-item-content`,[S(`meta`,`
 margin-bottom: 0;
 `)])]),N(`timeline-item-content`,[S(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),S(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),S(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),j(`dashed-line-type`,[N(`timeline-item-timeline`,[S(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),N(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[S(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),S(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),S(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),_e={...g.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=k(`n-timeline`),ve=s({name:`Timeline`,props:_e,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=a(e),r=g(`Timeline`,`-timeline`,ge,he,e,n);return _(Q,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return v(),E(`div`,{class:P([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[F(()=>t.default?.())],2)}}}),ye=s({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=I(Q);t||D(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),R();let{inlineThemeDisabled:n}=a(),i=r(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[C(`iconSize`,n)]:f,[C(`titleMargin`,n)]:p,[C(`titleFontSize`,n)]:m,[C(`circleBorder`,a)]:h,[C(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":L(r)||f}}),o=n?l(`timeline-item`,r(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),i,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:i,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:r}=this;return n?.(),v(),E(`div`,{class:P([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:h(this.cssVars)},[p(`div`,{class:P(`${e}-timeline-item-timeline`)},[p(`div`,{class:P(`${e}-timeline-item-timeline__line`)},null,2),F(()=>o(r.icon,n=>n?(v(),E(`div`,{key:1,class:P(`${e}-timeline-item-timeline__icon`),style:h({color:t})},[F(()=>n)],6)):(v(),E(`div`,{key:2,class:P(`${e}-timeline-item-timeline__circle`),style:h({borderColor:t})},null,6))))],2),p(`div`,{class:P(`${e}-timeline-item-content`)},[F(()=>o(r.header,t=>t||this.title?(v(),E(`div`,{key:3,class:P(`${e}-timeline-item-content__title`)},[F(()=>t||this.title)],2)):null)),p(`div`,{class:P(`${e}-timeline-item-content__content`)},[F(()=>d(r.default,()=>[this.content]))],2),p(`div`,{class:P(`${e}-timeline-item-content__meta`)},[F(()=>d(r.footer,()=>[this.time]))],2)],2)],6)}}),be=H({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),xe=H({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Se={class:`mx-auto max-w-[1000px]`},Ce={key:0,class:`flex flex-col gap-3`},we={key:1,class:`panel grid place-items-center py-16`},Te={class:`panel mb-3 p-4`},Ee={class:`flex flex-wrap items-start justify-between gap-3`},De={class:`min-w-0`},Oe=[`title`],ke={class:`tech-label mt-1 text-ink-4`},Ae={class:`flex shrink-0 flex-wrap items-center gap-2`},je={key:0,class:`panel mb-3 p-4`},Me={class:`whitespace-pre-wrap break-words text-[13px] leading-6`},Ne={class:`mb-3 grid gap-3 sm:grid-cols-2`},Pe={class:`panel p-4`},Fe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3`},Ie={class:`divide-y`,style:{"border-color":`var(--border)`}},Le={class:`shrink-0 text-[12px] text-ink-4`},Re=[`title`],ze={key:0,class:`mt-1 whitespace-pre-wrap break-words rounded-md p-2 text-[13px] leading-6`,style:{background:`var(--accent-tint-soft)`}},Be={key:1,class:`mt-1 text-[13px] text-ink-4`},Ve={class:`flex flex-col gap-3`},He={class:`panel p-4`},Ue={class:`divide-y`,style:{"border-color":`var(--border)`}},We={class:`shrink-0 text-[12px] text-ink-4`},Ge=[`title`],Ke={class:`panel p-4`},qe={class:`divide-y`,style:{"border-color":`var(--border)`}},Je={class:`shrink-0 text-[12px] text-ink-4`},Ye=[`title`],$={key:1,class:`mt-3 text-[11px] text-ink-4`},Xe={class:`panel p-4`},Ze={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3`},Qe={class:`text-ink-4`},$e={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},et={class:`text-[13px] font-semibold`},tt={class:`text-[12px] text-ink-3`},nt={key:0,class:`mt-0.5 break-words text-[12px] leading-5 text-ink-3`},rt={key:1,class:`text-[12px] leading-6 text-ink-4`},it={class:`tech-label mt-3 text-ink-4`},at=s({__name:`OrderDetailView`,setup(a){let o=ie(),s=V(),c=re(),l=B(),d=r(()=>{let e=Array.isArray(o.params.id)?o.params.id[0]:o.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),g=T(null),_=T([]),b=T(!1),S=T(!1),C=r(()=>c.user?.id??0),D=r(()=>c.advancedAllowed),k=r(()=>{let e=g.value;return!e||e.claimed_by===null||!e.filename?!1:D.value||e.claimed_by===C.value}),j=r(()=>!!g.value&&K(g.value)),N=r(()=>{let e=g.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?le[e.color_type]:`黑白`} / ${e.duplex?se[e.duplex]:`单面`}`},{label:`份数`,value:oe(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:X(e.file_size)})),t}),P=r(()=>{let e=g.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),F=r(()=>{let e=g.value;return e?[{label:`取件码`,value:q(e.pickup_code)},{label:`金额`,value:W(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?G(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?G(e.price_time):null},{label:`提交时间`,value:G(e.create_time)},{label:`最后更新`,value:G(e.update_time)}]:[]});async function I(){if(d.value!==null){b.value=!0;try{let e=await A.detail(d.value);g.value=e.order,_.value=e.logs}catch(e){l.error(e instanceof w?e.message:`加载订单详情失败`)}finally{b.value=!1}}}async function L(){let e=g.value;if(e){S.value=!0;try{await A.download(e.id,Y(e)),await I()}catch(e){l.error(e instanceof w?e.message:`下载失败`)}finally{S.value=!1}}}function R(){s.push(`/staff/orders`)}return u(I),(r,a)=>(v(),E(`div`,Se,[m(fe,{title:g.value?`订单 #${g.value.id}`:`订单详情`,subtitle:`完整的订单信息与操作记录`},{actions:x(()=>[m(n(M),{size:`small`,quaternary:``,onClick:R},{icon:x(()=>[m(n(be),{size:15})]),default:x(()=>[a[1]||=f(` 返回订单台 `,-1)]),_:1}),m(n(M),{size:`small`,quaternary:``,loading:b.value,onClick:a[0]||=e=>I()},{icon:x(()=>[m(n(U),{size:15})]),default:x(()=>[a[2]||=f(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),b.value&&!g.value?(v(),E(`div`,Ce,[m(n(z),{height:`96px`,sharp:!1}),m(n(z),{height:`180px`,sharp:!1}),m(n(z),{height:`240px`,sharp:!1})])):g.value?(v(),E(t,{key:2},[p(`div`,Te,[p(`div`,Ee,[p(`div`,De,[p(`h2`,{class:`truncate text-[17px] font-bold`,title:g.value.preset_content??g.value.filename},i(n(Y)(g.value)),9,Oe),p(`p`,ke,` 提交于 `+i(n(G)(g.value.create_time)),1)]),p(`div`,Ae,[m(pe,{status:g.value.status},null,8,[`status`]),p(`span`,{class:`tnum font-heading text-[18px] font-bold`,style:h({color:g.value.price===null||g.value.price===void 0?`var(--text-quaternary)`:`var(--primary)`})},i(n(W)(g.value.price)),5)])]),!g.value.file_exists&&!j.value?(v(),O(n(te),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:x(()=>[...a[3]||=[f(` 订单记录还在，但落盘的文件已经不在上传目录里。请先确认是不是被人手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):e(``,!0)]),j.value?(v(),E(`section`,je,[a[4]||=p(`h3`,{class:`tech-label mb-1 text-ink-3`},`预设打印服务`,-1),p(`p`,Me,i(g.value.preset_content),1),a[5]||=p(`p`,{class:`mt-2 text-[11px] text-ink-4`},` 这一单没有上传文件。上面这段话是下单当时从预设里抄下来的快照， 即使后来预设被改动或删掉了，这里显示的仍是学生当时看到的原文。 `,-1)])):e(``,!0),p(`div`,Ne,[p(`section`,Pe,[p(`h3`,Fe,[a[6]||=f(` 打印要求 `,-1),!g.value.file_exists&&!j.value?(v(),O(n(xe),{key:0,size:13})):e(``,!0)]),p(`dl`,Ie,[(v(!0),E(t,null,y(N.value,e=>(v(),E(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[p(`dt`,Le,i(e.label),1),p(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},i(e.value??`—`),9,Re)]))),128))]),a[7]||=p(`p`,{class:`mt-2 text-[11px] text-ink-4`},`备注`,-1),g.value.remark?(v(),E(`p`,ze,i(g.value.remark),1)):(v(),E(`p`,Be,`学生没有填写备注`))]),p(`div`,Ve,[p(`section`,He,[a[8]||=p(`h3`,{class:`tech-label mb-1 text-ink-3`},`下单人`,-1),p(`dl`,Ue,[(v(!0),E(t,null,y(P.value,e=>(v(),E(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[p(`dt`,We,i(e.label),1),p(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},i(e.value??`—`),9,Ge)]))),128))])]),p(`section`,Ke,[a[9]||=p(`h3`,{class:`tech-label mb-1 text-ink-3`},`流程信息`,-1),p(`dl`,qe,[(v(!0),E(t,null,y(F.value,e=>(v(),E(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[p(`dt`,Je,i(e.label),1),p(`dd`,{class:`tnum min-w-0 truncate text-right text-[13px]`,title:e.value??``},i(e.value??`—`),9,Ye)]))),128))]),k.value?(v(),O(n(M),{key:0,size:`small`,block:``,class:`mt-3`,loading:S.value,onClick:L},{icon:x(()=>[m(n(ae),{size:14})]),default:x(()=>[f(` 下载文件（`+i(n(X)(g.value.file_size))+`） `,1)]),_:1},8,[`loading`])):g.value.claimed_by===null?(v(),E(`p`,$,` 接单后才能下载文件。 `)):e(``,!0)])])]),p(`section`,Xe,[p(`h3`,Ze,[a[10]||=f(` 操作记录 `,-1),p(`span`,Qe,i(_.value.length)+` 条`,1)]),_.value.length?(v(),O(n(ve),{key:0},{default:x(()=>[(v(!0),E(t,null,y(_.value,t=>(v(),O(n(ye),{key:t.id,time:n(G)(t.create_time),color:n(ce)[t.action]},{default:x(()=>[p(`div`,$e,[p(`span`,et,i(t.action_label),1),p(`span`,tt,i(t.actor_nickname??`（账号已注销）`),1),t.actor_role?(v(),O(de,{key:0,role:t.actor_role},null,8,[`role`])):e(``,!0)]),t.detail?(v(),E(`p`,nt,i(t.detail),1)):e(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(v(),E(`p`,rt,` 这一单还没有操作记录。留痕功能是后加的，升级之前发生的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如明确告诉你这里没有。 `))]),p(`p`,it,`最后更新 `+i(n(ue)(g.value.update_time)),1)],64)):(v(),E(`div`,we,[m(n(ee),{description:d.value===null?`订单号不对，检查一下地址栏`:`没有这个订单`},null,8,[`description`])]))]))}});export{at as default};