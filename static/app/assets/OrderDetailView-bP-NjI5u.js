import{A as e,Bt as t,C as n,E as r,G as i,J as a,L as o,M as s,S as c,T as l,Tt as u,Vt as d,X as f,Y as p,_ as m,_t as h,f as g,j as _,l as v,st as y,w as b}from"./endpoints-NGWT2QHn.js";import{$t as x,A as S,Jt as C,N as w,S as T,Xt as E,Zt as D,_t as O,b as k,k as A,lt as j,mt as M,ot as N,qt as P,t as F,yt as I}from"./Button-BESWyFjO.js";import{t as ee}from"./Empty-B08g2mL-.js";import{t as L}from"./format-length-BwSo_EUP.js";import{t as R}from"./Alert-DKt31xwN.js";import{n as z,t as B}from"./Skeleton-Cn9R9FDi.js";import{g as V,h as H}from"./useApi-BPuI6ZR9-CKtBFLX2.js";import{d as te,t as ne,v as re}from"./index-DnFKtpL1.js";import{t as U}from"./createLucideIcon-DvJrk0KK.js";import{t as ie}from"./download-lLiwrl1N.js";import{t as W}from"./refresh-cw-DM6vKZs4.js";import{_ as G,d as K,f as q,g as J,h as Y,n as ae,p as oe,r as se,t as ce,u as le,v as X,y as ue}from"./format-D6sHWZqo.js";import{t as de}from"./RoleTag-BlN8qsxx.js";import{t as fe}from"./PageHeader-Bd29-yIC.js";import{t as pe}from"./StatusTag-DquxDB-W.js";function me(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...te,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var he={name:`Timeline`,common:w,self:me},Z=1.25,ge=C(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[D(`horizontal`,`
 flex-direction: row;
 `,[P(`>`,[C(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[D(`dashed-line-type`,[P(`>`,[C(`timeline-item-timeline`,[E(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),P(`>`,[C(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[P(`>`,[E(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),C(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[E(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),D(`right-placement`,[C(`timeline-item`,[C(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),C(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),D(`left-placement`,[C(`timeline-item`,[C(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),C(`timeline-item-timeline`,`
 left: 0;
 `)])]),C(`timeline-item`,`
 position: relative;
 `,[P(`&:last-child`,[C(`timeline-item-timeline`,[E(`line`,`
 display: none;
 `)]),C(`timeline-item-content`,[E(`meta`,`
 margin-bottom: 0;
 `)])]),C(`timeline-item-content`,[E(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),E(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),E(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),D(`dashed-line-type`,[C(`timeline-item-timeline`,[E(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),C(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[E(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),E(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),E(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),_e={...A.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=O(`n-timeline`),ve=s({name:`Timeline`,props:_e,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=M(e),i=A(`Timeline`,`-timeline`,ge,he,e,n);return p(Q,{props:e,mergedThemeRef:i,mergedClsPrefixRef:n}),()=>{let{value:i}=n;return a(),r(`div`,{class:N([`${i}-timeline`,e.horizontal&&`${i}-timeline--horizontal`,`${i}-timeline--${e.size}-size`,!e.horizontal&&`${i}-timeline--${e.itemPlacement}-placement`])},[j(()=>t.default?.())],2)}}}),ye=s({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=o(Q);t||I(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),z();let{inlineThemeDisabled:n}=M(),r=c(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[x(`iconSize`,n)]:f,[x(`titleMargin`,n)]:p,[x(`titleFontSize`,n)]:m,[x(`circleBorder`,a)]:h,[x(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":L(r)||f}}),i=n?S(`timeline-item`,c(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),r,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:r,themeClass:i?.themeClass,onRender:i?.onRender}},render(){let{mergedClsPrefix:e,color:i,onRender:o,$slots:s}=this;return o?.(),a(),r(`div`,{class:N([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:t(this.cssVars)},[n(`div`,{class:N(`${e}-timeline-item-timeline`)},[n(`div`,{class:N(`${e}-timeline-item-timeline__line`)},null,2),j(()=>T(s.icon,n=>n?(a(),r(`div`,{key:1,class:N(`${e}-timeline-item-timeline__icon`),style:t({color:i})},[j(()=>n)],6)):(a(),r(`div`,{key:2,class:N(`${e}-timeline-item-timeline__circle`),style:t({borderColor:i})},null,6))))],2),n(`div`,{class:N(`${e}-timeline-item-content`)},[j(()=>T(s.header,t=>t||this.title?(a(),r(`div`,{key:3,class:N(`${e}-timeline-item-content__title`)},[j(()=>t||this.title)],2)):null)),n(`div`,{class:N(`${e}-timeline-item-content__content`)},[j(()=>k(s.default,()=>[this.content]))],2),n(`div`,{class:N(`${e}-timeline-item-content__meta`)},[j(()=>k(s.footer,()=>[this.time]))],2)],2)],6)}}),be=U({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),xe=U({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Se={class:`mx-auto max-w-[1000px]`},Ce={key:0,class:`flex flex-col gap-3`},we={key:1,class:`panel grid place-items-center py-16`},Te={class:`panel mb-3 p-4`},Ee={class:`flex flex-wrap items-start justify-between gap-3`},De={class:`min-w-0`},Oe=[`title`],ke={class:`tech-label mt-1 text-ink-4`},Ae={class:`flex shrink-0 flex-wrap items-center gap-2`},je={key:0,class:`panel mb-3 p-4`},Me={class:`whitespace-pre-wrap break-words text-[13px] leading-6`},Ne={class:`mb-3 grid gap-3 sm:grid-cols-2`},Pe={class:`panel p-4`},Fe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3`},Ie={class:`divide-y`,style:{"border-color":`var(--border)`}},Le={class:`shrink-0 text-[12px] text-ink-4`},Re=[`title`],ze={key:0,class:`mt-1 whitespace-pre-wrap break-words rounded-md p-2 text-[13px] leading-6`,style:{background:`var(--accent-tint-soft)`}},Be={key:1,class:`mt-1 text-[13px] text-ink-4`},Ve={class:`flex flex-col gap-3`},He={class:`panel p-4`},Ue={class:`divide-y`,style:{"border-color":`var(--border)`}},We={class:`shrink-0 text-[12px] text-ink-4`},Ge=[`title`],Ke={class:`panel p-4`},qe={class:`divide-y`,style:{"border-color":`var(--border)`}},Je={class:`shrink-0 text-[12px] text-ink-4`},$=[`title`],Ye={key:1,class:`mt-3 text-[11px] text-ink-4`},Xe={class:`panel p-4`},Ze={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3`},Qe={class:`text-ink-4`},$e={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},et={class:`text-[13px] font-semibold`},tt={class:`text-[12px] text-ink-3`},nt={key:0,class:`mt-0.5 break-words text-[12px] leading-5 text-ink-3`},rt={key:1,class:`text-[12px] leading-6 text-ink-4`},it={class:`tech-label mt-3 text-ink-4`},at=s({__name:`OrderDetailView`,setup(o){let s=H(),p=V(),x=ne(),S=re(),C=c(()=>{let e=Array.isArray(s.params.id)?s.params.id[0]:s.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),w=h(null),T=h([]),E=h(!1),D=h(!1),O=c(()=>x.user?.id??0),k=c(()=>x.advancedAllowed),A=c(()=>{let e=w.value;return!e||e.claimed_by===null||!e.filename?!1:k.value||e.claimed_by===O.value}),j=c(()=>!!w.value&&oe(w.value)),M=c(()=>{let e=w.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?ce[e.color_type]:`黑白`} / ${e.duplex?ae[e.duplex]:`单面`}`},{label:`份数`,value:le(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t}),N=c(()=>{let e=w.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),P=c(()=>{let e=w.value;return e?[{label:`取件码`,value:G(e.pickup_code)},{label:`金额`,value:X(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?q(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?q(e.price_time):null},{label:`提交时间`,value:q(e.create_time)},{label:`最后更新`,value:q(e.update_time)}]:[]});async function I(){if(C.value!==null){E.value=!0;try{let e=await v.detail(C.value);w.value=e.order,T.value=e.logs}catch(e){S.error(e instanceof g?e.message:`加载订单详情失败`)}finally{E.value=!1}}}async function L(){let e=w.value;if(e){D.value=!0;try{await v.download(e.id,Y(e),e.file_size??void 0),await I()}catch(e){S.error(e instanceof g?e.message:`下载失败`)}finally{D.value=!1}}}function z(){p.push(`/staff/orders`)}return i(I),(i,o)=>(a(),r(`div`,Se,[_(fe,{title:w.value?`订单 #${w.value.id}`:`订单详情`,subtitle:`完整的订单信息与操作记录`},{actions:y(()=>[_(u(F),{size:`small`,quaternary:``,onClick:z},{icon:y(()=>[_(u(be),{size:15})]),default:y(()=>[o[1]||=e(` 返回订单台 `,-1)]),_:1}),_(u(F),{size:`small`,quaternary:``,loading:E.value,onClick:o[0]||=e=>I()},{icon:y(()=>[_(u(W),{size:15})]),default:y(()=>[o[2]||=e(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),E.value&&!w.value?(a(),r(`div`,Ce,[_(u(B),{height:`96px`,sharp:!1}),_(u(B),{height:`180px`,sharp:!1}),_(u(B),{height:`240px`,sharp:!1})])):w.value?(a(),r(m,{key:2},[n(`div`,Te,[n(`div`,Ee,[n(`div`,De,[n(`h2`,{class:`truncate text-[17px] font-bold`,title:w.value.preset_content??w.value.filename},d(u(Y)(w.value)),9,Oe),n(`p`,ke,` 提交于 `+d(u(q)(w.value.create_time)),1)]),n(`div`,Ae,[_(pe,{status:w.value.status},null,8,[`status`]),n(`span`,{class:`tnum font-heading text-[18px] font-bold`,style:t({color:w.value.price===null||w.value.price===void 0?`var(--text-quaternary)`:`var(--primary)`})},d(u(X)(w.value.price)),5)])]),!w.value.file_exists&&!j.value?(a(),b(u(R),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:y(()=>[...o[3]||=[e(` 订单记录还在，但落盘的文件已经不在上传目录里。请先确认是不是被人手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):l(``,!0)]),j.value?(a(),r(`section`,je,[o[4]||=n(`h3`,{class:`tech-label mb-1 text-ink-3`},`预设打印服务`,-1),n(`p`,Me,d(w.value.preset_content),1),o[5]||=n(`p`,{class:`mt-2 text-[11px] text-ink-4`},` 这一单没有上传文件。上面这段话是下单当时从预设里抄下来的快照， 即使后来预设被改动或删掉了，这里显示的仍是学生当时看到的原文。 `,-1)])):l(``,!0),n(`div`,Ne,[n(`section`,Pe,[n(`h3`,Fe,[o[6]||=e(` 打印要求 `,-1),!w.value.file_exists&&!j.value?(a(),b(u(xe),{key:0,size:13})):l(``,!0)]),n(`dl`,Ie,[(a(!0),r(m,null,f(M.value,e=>(a(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[n(`dt`,Le,d(e.label),1),n(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},d(e.value??`—`),9,Re)]))),128))]),o[7]||=n(`p`,{class:`mt-2 text-[11px] text-ink-4`},`备注`,-1),w.value.remark?(a(),r(`p`,ze,d(w.value.remark),1)):(a(),r(`p`,Be,`学生没有填写备注`))]),n(`div`,Ve,[n(`section`,He,[o[8]||=n(`h3`,{class:`tech-label mb-1 text-ink-3`},`下单人`,-1),n(`dl`,Ue,[(a(!0),r(m,null,f(N.value,e=>(a(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[n(`dt`,We,d(e.label),1),n(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},d(e.value??`—`),9,Ge)]))),128))])]),n(`section`,Ke,[o[9]||=n(`h3`,{class:`tech-label mb-1 text-ink-3`},`流程信息`,-1),n(`dl`,qe,[(a(!0),r(m,null,f(P.value,e=>(a(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[n(`dt`,Je,d(e.label),1),n(`dd`,{class:`tnum min-w-0 truncate text-right text-[13px]`,title:e.value??``},d(e.value??`—`),9,$)]))),128))]),A.value?(a(),b(u(F),{key:0,size:`small`,block:``,class:`mt-3`,loading:D.value,onClick:L},{icon:y(()=>[_(u(ie),{size:14})]),default:y(()=>[e(` 下载文件（`+d(u(K)(w.value.file_size))+`） `,1)]),_:1},8,[`loading`])):w.value.claimed_by===null?(a(),r(`p`,Ye,` 接单后才能下载文件。 `)):l(``,!0)])])]),n(`section`,Xe,[n(`h3`,Ze,[o[10]||=e(` 操作记录 `,-1),n(`span`,Qe,d(T.value.length)+` 条`,1)]),T.value.length?(a(),b(u(ve),{key:0},{default:y(()=>[(a(!0),r(m,null,f(T.value,e=>(a(),b(u(ye),{key:e.id,time:u(q)(e.create_time),color:u(se)[e.action]},{default:y(()=>[n(`div`,$e,[n(`span`,et,d(e.action_label),1),n(`span`,tt,d(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(a(),b(de,{key:0,role:e.actor_role},null,8,[`role`])):l(``,!0)]),e.detail?(a(),r(`p`,nt,d(e.detail),1)):l(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(a(),r(`p`,rt,` 这一单还没有操作记录。留痕功能是后加的，升级之前发生的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如明确告诉你这里没有。 `))]),n(`p`,it,`最后更新 `+d(u(ue)(w.value.update_time)),1)],64)):(a(),r(`div`,we,[_(u(ee),{description:C.value===null?`订单号不对，检查一下地址栏`:`没有这个订单`},null,8,[`description`])]))]))}});export{at as default};