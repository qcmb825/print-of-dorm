import{$ as e,At as t,B as n,Bt as r,F as i,G as a,J as o,Jt as s,K as c,P as l,Y as u,_ as d,_t as f,et as p,ln as m,m as h,mt as g,ot as _,q as v,tt as y,un as b,vt as x,yt as S}from"./endpoints-ENJhMWK2.js";import{A as C,C as w,Gt as T,Jt as E,Kt as D,Yt as O,Zt as k,_t as A,ft as j,ht as M,it as N,j as P,k as F,n as I,st as L,t as R,x as z}from"./createLucideIcon-BuHP6xwY.js";import{t as B}from"./format-length-BwSo_EUP.js";import{t as ee}from"./Alert-DaV5R7Gn.js";import{n as V,t as H}from"./Skeleton-BtidWrR-.js";import{t as U}from"./download-DksRKOfE.js";import{t as W}from"./file-exclamation-point-HEFjgcq_.js";import{t as te}from"./refresh-cw-DcBgQ4tW.js";import{S as ne,h as re,t as ie}from"./index-C68jqRF6.js";import{D as G,_ as ae,d as K,f as q,g as J,h as Y,n as oe,p as se,r as ce,t as le,u as ue,v as X,y as de}from"./format-1rjnJmsR.js";import{t as fe}from"./RoleTag-i8mwqLVs.js";import{t as pe}from"./EmptyState-CI99EiSI.js";import{t as me}from"./PageHeader-D0XHtiU7.js";import{t as he}from"./StatusTag-C1VBzzcq.js";function ge(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...re,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var _e={name:`Timeline`,common:P,self:ge},Z=1.25,ve=D(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[O(`horizontal`,`
 flex-direction: row;
 `,[T(`>`,[D(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[O(`dashed-line-type`,[T(`>`,[D(`timeline-item-timeline`,[E(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),T(`>`,[D(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[T(`>`,[E(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),D(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[E(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),O(`right-placement`,[D(`timeline-item`,[D(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),D(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),O(`left-placement`,[D(`timeline-item`,[D(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),D(`timeline-item-timeline`,`
 left: 0;
 `)])]),D(`timeline-item`,`
 position: relative;
 `,[T(`&:last-child`,[D(`timeline-item-timeline`,[E(`line`,`
 display: none;
 `)]),D(`timeline-item-content`,[E(`meta`,`
 margin-bottom: 0;
 `)])]),D(`timeline-item-content`,[E(`title`,`
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
 `)]),O(`dashed-line-type`,[D(`timeline-item-timeline`,[E(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),D(`timeline-item-timeline`,`
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
 `)])])]),ye={...F.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=M(`n-timeline`),be=y({name:`Timeline`,props:ye,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=j(e),r=F(`Timeline`,`-timeline`,ve,_e,e,n);return x(Q,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return f(),u(`div`,{class:N([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[L(()=>t.default?.())],2)}}}),xe=y({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=_(Q);t||A(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),V();let{inlineThemeDisabled:n}=j(),r=a(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[k(`iconSize`,n)]:f,[k(`titleMargin`,n)]:p,[k(`titleFontSize`,n)]:m,[k(`circleBorder`,a)]:h,[k(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":B(r)||f}}),i=n?C(`timeline-item`,a(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),r,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:r,themeClass:i?.themeClass,onRender:i?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:r}=this;return n?.(),f(),u(`div`,{class:N([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:m(this.cssVars)},[c(`div`,{class:N(`${e}-timeline-item-timeline`)},[c(`div`,{class:N(`${e}-timeline-item-timeline__line`)},null,2),L(()=>w(r.icon,n=>n?(f(),u(`div`,{key:1,class:N(`${e}-timeline-item-timeline__icon`),style:m({color:t})},[L(()=>n)],6)):(f(),u(`div`,{key:2,class:N(`${e}-timeline-item-timeline__circle`),style:m({borderColor:t})},null,6))))],2),c(`div`,{class:N(`${e}-timeline-item-content`)},[L(()=>w(r.header,t=>t||this.title?(f(),u(`div`,{key:3,class:N(`${e}-timeline-item-content__title`)},[L(()=>t||this.title)],2)):null)),c(`div`,{class:N(`${e}-timeline-item-content__content`)},[L(()=>z(r.default,()=>[this.content]))],2),c(`div`,{class:N(`${e}-timeline-item-content__meta`)},[L(()=>z(r.footer,()=>[this.time]))],2)],2)],6)}}),Se=R({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),Ce={class:`mx-auto max-w-[1000px]`},we={key:0,class:`flex flex-col gap-3`},Te={key:1,class:`panel grid place-items-center py-16`},Ee={class:`panel mb-3 p-4`},De={class:`flex flex-wrap items-start justify-between gap-3`},Oe={class:`min-w-0`},ke=[`title`],Ae={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},je={class:`flex shrink-0 flex-wrap items-center gap-2`},Me={key:0,class:`panel mb-3 p-4`},Ne={class:`whitespace-pre-wrap break-words text-sm leading-6`},Pe={class:`mb-3 grid gap-3 sm:grid-cols-2`},Fe={class:`panel p-4`},Ie={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Le={class:`divide-y`,style:{"border-color":`var(--border)`}},Re={class:`shrink-0 text-xs text-ink-3`},ze=[`title`],Be={key:0,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Ve={key:1,class:`mt-1 text-sm text-ink-3`},He={class:`flex flex-col gap-3`},Ue={class:`panel p-4`},We={class:`divide-y`,style:{"border-color":`var(--border)`}},Ge={class:`shrink-0 text-xs text-ink-3`},Ke=[`title`],qe={class:`panel p-4`},Je={class:`divide-y`,style:{"border-color":`var(--border)`}},$={class:`shrink-0 text-xs text-ink-3`},Ye=[`title`],Xe={key:1,class:`mt-3 text-xs text-ink-3`},Ze={class:`panel p-4`},Qe={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},$e={class:`text-ink-3`},et={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},tt={class:`text-sm font-semibold`},nt={class:`text-xs text-ink-3`},rt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},it={key:1,class:`text-xs leading-6 text-ink-3`},at={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},ot=y({__name:`OrderDetailView`,setup(_){let y=l(),x=i(),C=ie(),w=ne(),T=a(()=>{let e=Array.isArray(y.params.id)?y.params.id[0]:y.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),E=r(null),D=r([]),O=r(!1),k=r(!1),A=a(()=>C.user?.id??0),j=a(()=>C.advancedAllowed),M=a(()=>{let e=E.value;return!e||e.claimed_by===null||!e.filename?!1:j.value||e.claimed_by===A.value}),N=a(()=>!!E.value&&se(E.value));function P(e){return G[e??`web`]??G.web}let F=a(()=>{let e=E.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?le[e.color_type]:`黑白`} / ${e.duplex?oe[e.duplex]:`单面`}`},{label:`份数`,value:ue(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t}),L=a(()=>{let e=E.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),R=a(()=>{let e=E.value;return e?[{label:`单号`,value:ae(e.pickup_code)},{label:`来源`,value:P(e.source)},{label:`金额`,value:X(e.price)},{label:`预估价`,value:e.est_price===null||e.est_price===void 0?null:e.est_pages?`${X(e.est_price)}（按 ${e.est_pages} 页估算）`:X(e.est_price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?q(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?q(e.price_time):null},{label:`提交时间`,value:q(e.create_time)},{label:`最后更新`,value:q(e.update_time)}]:[]});async function z(){if(T.value!==null){O.value=!0;try{let e=await h.detail(T.value);E.value=e.order,D.value=e.logs}catch(e){w.error(e instanceof d?e.message:`订单详情读取失败`)}finally{O.value=!1}}}async function B(){let e=E.value;if(e){k.value=!0;try{await h.download(e.id,Y(e),e.file_size??void 0),await z()}catch(e){w.error(e instanceof d?e.message:`下载未完成 · 稍后重试`)}finally{k.value=!1}}}function V(){x.push(`/staff/orders`)}return g(z),(r,i)=>(f(),u(`div`,Ce,[p(me,{title:E.value?`订单 #${E.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:t(()=>[p(s(I),{size:`small`,quaternary:``,onClick:V},{icon:t(()=>[p(s(Se),{size:15})]),default:t(()=>[i[1]||=e(` 返回订单台 `,-1)]),_:1}),p(s(I),{size:`small`,quaternary:``,loading:O.value,onClick:i[0]||=e=>z()},{icon:t(()=>[p(s(te),{size:15})]),default:t(()=>[i[2]||=e(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),O.value&&!E.value?(f(),u(`div`,we,[p(s(H),{height:`96px`,sharp:!1}),p(s(H),{height:`180px`,sharp:!1}),p(s(H),{height:`240px`,sharp:!1})])):E.value?(f(),u(n,{key:2},[c(`div`,Ee,[c(`div`,De,[c(`div`,Oe,[c(`h2`,{class:`truncate text-lg font-bold`,title:E.value.preset_content??E.value.filename},b(s(Y)(E.value)),9,ke),c(`p`,Ae,` 提交于 `+b(s(q)(E.value.create_time)),1)]),c(`div`,je,[p(he,{status:E.value.status},null,8,[`status`]),c(`span`,{class:`tnum font-heading text-xl font-bold`,style:m({color:E.value.price===null||E.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},b(s(X)(E.value.price)),5)])]),!E.value.file_exists&&!N.value?(f(),v(s(ee),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`文件不存在 · 需人工处理`},{default:t(()=>[...i[3]||=[e(` 订单记录仍在，上传目录里已经找不到这份文件。先确认是否被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):o(``,!0)]),N.value?(f(),u(`section`,Me,[i[4]||=c(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),c(`p`,Ne,b(E.value.preset_content),1),i[5]||=c(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件 · 上面那段是下单当时的快照； 预设后来改过或删了，此处仍是学生当时看到的原文。 `,-1)])):o(``,!0),c(`div`,Pe,[c(`section`,Fe,[c(`h3`,Ie,[i[6]||=e(` 打印要求 `,-1),!E.value.file_exists&&!N.value?(f(),v(s(W),{key:0,size:13})):o(``,!0)]),c(`dl`,Le,[(f(!0),u(n,null,S(F.value,e=>(f(),u(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[c(`dt`,Re,b(e.label),1),c(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},b(e.value??`—`),9,ze)]))),128))]),i[7]||=c(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),E.value.remark?(f(),u(`p`,Be,b(E.value.remark),1)):(f(),u(`p`,Ve,`学生未填写备注`))]),c(`div`,He,[c(`section`,Ue,[i[8]||=c(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),c(`dl`,We,[(f(!0),u(n,null,S(L.value,e=>(f(),u(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[c(`dt`,Ge,b(e.label),1),c(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},b(e.value??`—`),9,Ke)]))),128))])]),c(`section`,qe,[i[9]||=c(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),c(`dl`,Je,[(f(!0),u(n,null,S(R.value,e=>(f(),u(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[c(`dt`,$,b(e.label),1),c(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},b(e.value??`—`),9,Ye)]))),128))]),M.value?(f(),v(s(I),{key:0,size:`small`,block:``,class:`mt-3`,loading:k.value,onClick:B},{icon:t(()=>[p(s(U),{size:14})]),default:t(()=>[e(` 下载文件（`+b(s(K)(E.value.file_size))+`） `,1)]),_:1},8,[`loading`])):E.value.claimed_by===null?(f(),u(`p`,Xe,` 尚未接单 · 接单后可下载文件 `)):o(``,!0)])])]),c(`section`,Ze,[c(`h3`,Qe,[i[10]||=e(` 操作记录 `,-1),c(`span`,$e,b(D.value.length)+` 条`,1)]),D.value.length?(f(),v(s(be),{key:0},{default:t(()=>[(f(!0),u(n,null,S(D.value,e=>(f(),v(s(xe),{key:e.id,time:s(q)(e.create_time),color:s(ce)[e.action]},{default:t(()=>[c(`div`,et,[c(`span`,tt,b(e.action_label),1),c(`span`,nt,b(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(f(),v(fe,{key:0,role:e.actor_role},null,8,[`role`])):o(``,!0)]),e.detail?(f(),u(`p`,rt,b(e.detail),1)):o(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(f(),u(`p`,it,` 这一单暂无操作记录 · 留痕功能晚于订单本身，升级前的步骤不做倒推补录。 `))]),c(`p`,at,`最后更新 `+b(s(de)(E.value.update_time)),1)],64)):(f(),u(`div`,Te,[p(pe,{tone:`alarm`,code:`ERR / 404`,title:T.value===null?`订单不存在`:`无此订单 · 核对后重试`,hint:`地址栏里的编号可能有误，或这一单已经被撤回了`},null,8,[`title`])]))]))}});export{ot as default};