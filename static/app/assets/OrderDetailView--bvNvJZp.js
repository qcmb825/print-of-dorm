import{F as e,I as t,J as n,K as r,V as i,Vt as a,X as o,Y as s,Yt as c,bt as l,dn as u,et as d,h as f,ht as p,jt as m,nt as h,q as g,st as _,tt as v,un as y,v as b,vt as x,yt as S}from"./endpoints-BlW_rAxP.js";import{A as C,C as w,Gt as T,Jt as E,Kt as D,Yt as O,Zt as k,_t as A,ft as j,ht as M,it as N,j as P,k as F,n as I,st as L,t as R,x as z}from"./createLucideIcon-LFURxWOJ.js";import{t as B}from"./format-length-BwSo_EUP.js";import{t as ee}from"./Alert-IF5ShIVw.js";import{n as V,t as H}from"./Skeleton-DjkyZ8N1.js";import{t as U}from"./download-DxtYmofv.js";import{t as W}from"./file-exclamation-point-C53baJbN.js";import{t as te}from"./refresh-cw-Cy4CLgDj.js";import{S as ne,h as re,t as ie}from"./index-DekS4r6X.js";import{D as G,_ as ae,d as K,f as q,g as J,h as Y,n as oe,p as se,r as ce,t as le,u as ue,v as X,y as de}from"./format-1rjnJmsR.js";import{t as fe}from"./RoleTag-ZBxP0jmz.js";import{t as pe}from"./EmptyState-CcpMtycu.js";import{t as me}from"./PageHeader-BrJ4jvgS.js";import{t as he}from"./StatusTag-Cyvzp2yM.js";function ge(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...re,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var _e={name:`Timeline`,common:P,self:ge},Z=1.25,ve=D(`timeline`,`
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
 `)])])]),ye={...F.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=M(`n-timeline`),be=h({name:`Timeline`,props:ye,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=j(e),r=F(`Timeline`,`-timeline`,ve,_e,e,n);return S(Q,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return x(),o(`div`,{class:N([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[L(()=>t.default?.())],2)}}}),xe=h({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=_(Q);t||A(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),V();let{inlineThemeDisabled:n}=j(),i=r(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[k(`iconSize`,n)]:f,[k(`titleMargin`,n)]:p,[k(`titleFontSize`,n)]:m,[k(`circleBorder`,a)]:h,[k(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":B(r)||f}}),a=n?C(`timeline-item`,r(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),i,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:r}=this;return n?.(),x(),o(`div`,{class:N([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:y(this.cssVars)},[g(`div`,{class:N(`${e}-timeline-item-timeline`)},[g(`div`,{class:N(`${e}-timeline-item-timeline__line`)},null,2),L(()=>w(r.icon,n=>n?(x(),o(`div`,{key:1,class:N(`${e}-timeline-item-timeline__icon`),style:y({color:t})},[L(()=>n)],6)):(x(),o(`div`,{key:2,class:N(`${e}-timeline-item-timeline__circle`),style:y({borderColor:t})},null,6))))],2),g(`div`,{class:N(`${e}-timeline-item-content`)},[L(()=>w(r.header,t=>t||this.title?(x(),o(`div`,{key:3,class:N(`${e}-timeline-item-content__title`)},[L(()=>t||this.title)],2)):null)),g(`div`,{class:N(`${e}-timeline-item-content__content`)},[L(()=>z(r.default,()=>[this.content]))],2),g(`div`,{class:N(`${e}-timeline-item-content__meta`)},[L(()=>z(r.footer,()=>[this.time]))],2)],2)],6)}}),Se=R({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),Ce={class:`mx-auto max-w-[1000px]`},we={key:0,class:`flex flex-col gap-3`},Te={key:1,class:`panel grid place-items-center py-16`},Ee={class:`panel mb-3 p-4`},De={class:`flex flex-wrap items-start justify-between gap-3`},Oe={class:`min-w-0`},ke=[`title`],Ae={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},je={class:`flex shrink-0 flex-wrap items-center gap-2`},Me={key:0,class:`panel mb-3 p-4`},Ne={class:`whitespace-pre-wrap break-words text-sm leading-6`},Pe={class:`mb-3 grid gap-3 sm:grid-cols-2`},Fe={class:`panel p-4`},Ie={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Le={class:`divide-y`,style:{"border-color":`var(--border)`}},Re={class:`shrink-0 text-xs text-ink-3`},ze=[`title`],Be={key:0,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Ve={key:1,class:`mt-1 text-sm text-ink-3`},He={class:`flex flex-col gap-3`},Ue={class:`panel p-4`},We={class:`divide-y`,style:{"border-color":`var(--border)`}},Ge={class:`shrink-0 text-xs text-ink-3`},Ke=[`title`],qe={class:`panel p-4`},Je={class:`divide-y`,style:{"border-color":`var(--border)`}},$={class:`shrink-0 text-xs text-ink-3`},Ye=[`title`],Xe={key:1,class:`mt-3 text-xs text-ink-3`},Ze={class:`panel p-4`},Qe={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},$e={class:`text-ink-3`},et={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},tt={class:`text-sm font-semibold`},nt={class:`text-xs text-ink-3`},rt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},it={key:1,class:`text-xs leading-6 text-ink-3`},at={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},ot=h({__name:`OrderDetailView`,setup(h){let _=e(),S=t(),C=ie(),w=ne(),T=r(()=>{let e=Array.isArray(_.params.id)?_.params.id[0]:_.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),E=a(null),D=a([]),O=a(!1),k=a(!1),A=r(()=>C.user?.id??0),j=r(()=>C.advancedAllowed),M=r(()=>{let e=E.value;return!e||e.claimed_by===null||!e.filename?!1:j.value||e.claimed_by===A.value}),N=r(()=>!!E.value&&se(E.value));function P(e){return G[e??`web`]??G.web}let F=r(()=>{let e=E.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?le[e.color_type]:`黑白`} / ${e.duplex?oe[e.duplex]:`单面`}`},{label:`份数`,value:ue(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t}),L=r(()=>{let e=E.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),R=r(()=>{let e=E.value;return e?[{label:`单号`,value:ae(e.pickup_code)},{label:`来源`,value:P(e.source)},{label:`金额`,value:X(e.price)},{label:`预估价`,value:e.est_price===null||e.est_price===void 0?null:e.est_pages?`${X(e.est_price)}（按 ${e.est_pages} 页估算）`:X(e.est_price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?q(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?q(e.price_time):null},{label:`提交时间`,value:q(e.create_time)},{label:`最后更新`,value:q(e.update_time)}]:[]});async function z(){if(T.value!==null){O.value=!0;try{let e=await f.detail(T.value);E.value=e.order,D.value=e.logs}catch(e){w.error(e instanceof b?e.message:`订单详情读取失败`)}finally{O.value=!1}}}async function B(){let e=E.value;if(e){k.value=!0;try{await f.download(e.id,Y(e),e.file_size??void 0),await z()}catch(e){w.error(e instanceof b?e.message:`下载未完成 · 稍后重试`)}finally{k.value=!1}}}function V(){S.push(`/staff/orders`)}return p(z),(e,t)=>(x(),o(`div`,Ce,[v(me,{title:E.value?`订单 #${E.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:m(()=>[v(c(I),{size:`small`,quaternary:``,onClick:V},{icon:m(()=>[v(c(Se),{size:15})]),default:m(()=>[t[1]||=d(` 返回订单台 `,-1)]),_:1}),v(c(I),{size:`small`,quaternary:``,loading:O.value,onClick:t[0]||=e=>z()},{icon:m(()=>[v(c(te),{size:15})]),default:m(()=>[t[2]||=d(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),O.value&&!E.value?(x(),o(`div`,we,[v(c(H),{height:`96px`,sharp:!1}),v(c(H),{height:`180px`,sharp:!1}),v(c(H),{height:`240px`,sharp:!1})])):E.value?(x(),o(i,{key:2},[g(`div`,Ee,[g(`div`,De,[g(`div`,Oe,[g(`h2`,{class:`truncate text-lg font-bold`,title:E.value.preset_content??E.value.filename},u(c(Y)(E.value)),9,ke),g(`p`,Ae,` 提交于 `+u(c(q)(E.value.create_time)),1)]),g(`div`,je,[v(he,{status:E.value.status},null,8,[`status`]),g(`span`,{class:`tnum font-heading text-xl font-bold`,style:y({color:E.value.price===null||E.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},u(c(X)(E.value.price)),5)])]),!E.value.file_exists&&!N.value?(x(),n(c(ee),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`文件不存在 · 需人工处理`},{default:m(()=>[...t[3]||=[d(` 订单记录仍在，上传目录里已经找不到这份文件。先确认是否被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):s(``,!0)]),N.value?(x(),o(`section`,Me,[t[4]||=g(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),g(`p`,Ne,u(E.value.preset_content),1),t[5]||=g(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件 · 上面那段是下单当时的快照； 预设后来改过或删了，此处仍是学生当时看到的原文。 `,-1)])):s(``,!0),g(`div`,Pe,[g(`section`,Fe,[g(`h3`,Ie,[t[6]||=d(` 打印要求 `,-1),!E.value.file_exists&&!N.value?(x(),n(c(W),{key:0,size:13})):s(``,!0)]),g(`dl`,Le,[(x(!0),o(i,null,l(F.value,e=>(x(),o(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[g(`dt`,Re,u(e.label),1),g(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},u(e.value??`—`),9,ze)]))),128))]),t[7]||=g(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),E.value.remark?(x(),o(`p`,Be,u(E.value.remark),1)):(x(),o(`p`,Ve,`学生未填写备注`))]),g(`div`,He,[g(`section`,Ue,[t[8]||=g(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),g(`dl`,We,[(x(!0),o(i,null,l(L.value,e=>(x(),o(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[g(`dt`,Ge,u(e.label),1),g(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},u(e.value??`—`),9,Ke)]))),128))])]),g(`section`,qe,[t[9]||=g(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),g(`dl`,Je,[(x(!0),o(i,null,l(R.value,e=>(x(),o(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[g(`dt`,$,u(e.label),1),g(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},u(e.value??`—`),9,Ye)]))),128))]),M.value?(x(),n(c(I),{key:0,size:`small`,block:``,class:`mt-3`,loading:k.value,onClick:B},{icon:m(()=>[v(c(U),{size:14})]),default:m(()=>[d(` 下载文件（`+u(c(K)(E.value.file_size))+`） `,1)]),_:1},8,[`loading`])):E.value.claimed_by===null?(x(),o(`p`,Xe,` 尚未接单 · 接单后可下载文件 `)):s(``,!0)])])]),g(`section`,Ze,[g(`h3`,Qe,[t[10]||=d(` 操作记录 `,-1),g(`span`,$e,u(D.value.length)+` 条`,1)]),D.value.length?(x(),n(c(be),{key:0},{default:m(()=>[(x(!0),o(i,null,l(D.value,e=>(x(),n(c(xe),{key:e.id,time:c(q)(e.create_time),color:c(ce)[e.action]},{default:m(()=>[g(`div`,et,[g(`span`,tt,u(e.action_label),1),g(`span`,nt,u(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(x(),n(fe,{key:0,role:e.actor_role},null,8,[`role`])):s(``,!0)]),e.detail?(x(),o(`p`,rt,u(e.detail),1)):s(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(x(),o(`p`,it,` 这一单暂无操作记录 · 留痕功能晚于订单本身，升级前的步骤不做倒推补录。 `))]),g(`p`,at,`最后更新 `+u(c(de)(E.value.update_time)),1)],64)):(x(),o(`div`,Te,[v(pe,{tone:`alarm`,code:`ERR / 404`,title:T.value===null?`订单不存在`:`无此订单 · 核对后重试`,hint:`地址栏里的编号可能有误，或这一单已经被撤回了`},null,8,[`title`])]))]))}});export{ot as default};