import{H as e,Ht as t,I as n,J as r,L as i,Mt as a,X as o,Xt as s,Y as c,Z as l,bt as u,ct as d,dn as f,fn as p,g as m,gt as h,nt as g,q as _,rt as v,tt as y,xt as b,y as ee,yt as x}from"./endpoints-o6zgEJYN.js";import{A as S,C,Gt as w,Jt as T,Kt as E,Yt as D,Zt as O,_t as k,ft as A,ht as j,it as M,j as N,k as P,n as F,st as I,x as L}from"./createLucideIcon-BgcK-14v.js";import{t as R}from"./format-length-BwSo_EUP.js";import{t as te}from"./Alert-CyZXSjke.js";import{n as z,t as B}from"./Skeleton-CmSCsbER.js";import{t as ne}from"./arrow-left-DwEhVoum.js";import{t as V}from"./download-CeKqXVYY.js";import{t as re}from"./file-exclamation-point-CrhEgVYU.js";import{t as ie}from"./refresh-cw-1j7-TXRv.js";import{S as ae,h as H,t as oe}from"./index-Ci7_zaLo.js";import{D as U,T as W,_ as se,c as ce,d as G,f as le,g as ue,l as K,m as q,n as de,t as J,u as Y,v as X,y as fe}from"./format-CffqP4Vo.js";import{t as pe}from"./RoleTag-Dq_4hCkZ.js";import{t as me}from"./EmptyState-C1UnLczk.js";import{t as he}from"./PageHeader-CyEvycGK.js";import{t as ge}from"./StatusTag-RwYHzrfv.js";function Z(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...H,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var _e={name:`Timeline`,common:N,self:Z},Q=1.25,ve=E(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Q};
`,[D(`horizontal`,`
 flex-direction: row;
 `,[w(`>`,[E(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[D(`dashed-line-type`,[w(`>`,[E(`timeline-item-timeline`,[T(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),w(`>`,[E(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[w(`>`,[T(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),E(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[T(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),D(`right-placement`,[E(`timeline-item`,[E(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),E(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),D(`left-placement`,[E(`timeline-item`,[E(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),E(`timeline-item-timeline`,`
 left: 0;
 `)])]),E(`timeline-item`,`
 position: relative;
 `,[w(`&:last-child`,[E(`timeline-item-timeline`,[T(`line`,`
 display: none;
 `)]),E(`timeline-item-content`,[T(`meta`,`
 margin-bottom: 0;
 `)])]),E(`timeline-item-content`,[T(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),T(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),T(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),D(`dashed-line-type`,[E(`timeline-item-timeline`,[T(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),E(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Q} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[T(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),T(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),T(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),ye={...P.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},$=j(`n-timeline`),be=v({name:`Timeline`,props:ye,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=A(e),r=P(`Timeline`,`-timeline`,ve,_e,e,n);return u($,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return x(),l(`div`,{class:M([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[I(()=>t.default?.())],2)}}}),xe=v({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=d($);t||k(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),z();let{inlineThemeDisabled:n}=A(),r=_(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[O(`iconSize`,n)]:f,[O(`titleMargin`,n)]:p,[O(`titleFontSize`,n)]:m,[O(`circleBorder`,a)]:h,[O(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":R(r)||f}}),i=n?S(`timeline-item`,_(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),r,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:r,themeClass:i?.themeClass,onRender:i?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:i}=this;return n?.(),x(),l(`div`,{class:M([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:f(this.cssVars)},[r(`div`,{class:M(`${e}-timeline-item-timeline`)},[r(`div`,{class:M(`${e}-timeline-item-timeline__line`)},null,2),I(()=>C(i.icon,n=>n?(x(),l(`div`,{key:1,class:M(`${e}-timeline-item-timeline__icon`),style:f({color:t})},[I(()=>n)],6)):(x(),l(`div`,{key:2,class:M(`${e}-timeline-item-timeline__circle`),style:f({borderColor:t})},null,6))))],2),r(`div`,{class:M(`${e}-timeline-item-content`)},[I(()=>C(i.header,t=>t||this.title?(x(),l(`div`,{key:3,class:M(`${e}-timeline-item-content__title`)},[I(()=>t||this.title)],2)):null)),r(`div`,{class:M(`${e}-timeline-item-content__content`)},[I(()=>L(i.default,()=>[this.content]))],2),r(`div`,{class:M(`${e}-timeline-item-content__meta`)},[I(()=>L(i.footer,()=>[this.time]))],2)],2)],6)}}),Se={class:`mx-auto max-w-[1000px]`},Ce={key:0,class:`flex flex-col gap-3`},we={key:1,class:`panel grid place-items-center py-16`},Te={class:`panel mb-3 p-4`},Ee={class:`flex flex-wrap items-start justify-between gap-3`},De={class:`min-w-0`},Oe=[`title`],ke={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ae={class:`flex shrink-0 flex-wrap items-center gap-2`},je={key:0,class:`panel mb-3 p-4`},Me={class:`whitespace-pre-wrap break-words text-sm leading-6`},Ne={class:`mb-3 grid gap-3 sm:grid-cols-2`},Pe={class:`panel p-4`},Fe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Ie={class:`divide-y`,style:{"border-color":`var(--border)`}},Le={class:`shrink-0 text-xs text-ink-3`},Re=[`title`],ze={key:0,class:`mt-1.5 text-xs text-ink-3`},Be={key:1,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Ve={key:2,class:`mt-1 text-sm text-ink-3`},He={class:`flex flex-col gap-3`},Ue={class:`panel p-4`},We={class:`divide-y`,style:{"border-color":`var(--border)`}},Ge={class:`shrink-0 text-xs text-ink-3`},Ke=[`title`],qe={class:`panel p-4`},Je={class:`divide-y`,style:{"border-color":`var(--border)`}},Ye={class:`shrink-0 text-xs text-ink-3`},Xe=[`title`],Ze={key:0,class:`mt-3 space-y-1.5`},Qe={class:`tnum shrink-0 text-2xs text-ink-3`},$e={class:`min-w-0 flex-1`},et=[`title`],tt={key:0},nt=[`title`],rt={class:`tnum shrink-0 text-2xs text-ink-3`},it={key:2,class:`mt-3 text-xs text-ink-3`},at={class:`panel p-4`},ot={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},st={class:`text-ink-3`},ct={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},lt={class:`text-sm font-semibold`},ut={class:`text-xs text-ink-3`},dt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},ft={key:1,class:`text-xs leading-6 text-ink-3`},pt={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},mt=v({__name:`OrderDetailView`,setup(u){let d=n(),v=i(),S=oe(),C=ae(),w=_(()=>{let e=Array.isArray(d.params.id)?d.params.id[0]:d.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),T=t(null),E=t([]),D=t(!1),O=t(null),k=_(()=>S.user?.id??0),A=_(()=>S.advancedAllowed),j=_(()=>{let e=T.value;return!e||e.claimed_by===null||!e.filename?!1:A.value||e.claimed_by===k.value}),M=_(()=>!!T.value&&le(T.value));function N(e){return U[e??`web`]??U.web}let P=_(()=>{let e=T.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?J[e.color_type]:`黑白`} / ${e.duplex?W[e.duplex]:`单面`}`},{label:`份数`,value:K(e.copies)},{label:`纸张`,value:ue(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:Y(e.file_size)})),t});function I(e){let t=T.value,n=e.price_item_name??t?.price_item_name??null,r=e.paper_name??t?.paper_name??null,i=e.color_type??t?.color_type??null,a=e.duplex??t?.duplex??null,o=e.copies??t?.copies??null,s=[];return n?s.push(n):(s.push(r??`—`),s.push(i?J[i]:`—`)),s.push(a?W[a]:`—`),s.push(o==null?`—`:K(o)),s.join(` · `)}let L=_(()=>{let e=T.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm},{label:`联系方式`,value:ce(e.owner_contact_type,e.owner_contact)}]:[]}),R=_(()=>{let e=T.value;return e?[{label:`单号`,value:se(e.pickup_code)},{label:`来源`,value:N(e.source)},{label:`金额`,value:X(e.price)},{label:`预估价`,value:e.est_price===null||e.est_price===void 0?null:e.est_pages?`${X(e.est_price)}（按 ${e.est_pages} 页估算）`:X(e.est_price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?G(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?G(e.price_time):null},{label:`提交时间`,value:G(e.create_time)},{label:`最后更新`,value:G(e.update_time)}]:[]});async function z(){if(w.value!==null){D.value=!0;try{let e=await m.detail(w.value);T.value=e.order,E.value=e.logs}catch(e){C.error(e instanceof ee?e.message:`订单详情读取失败`)}finally{D.value=!1}}}async function H(e,t,n){let r=T.value;if(r){O.value=e??0;try{await m.download(r.id,t,n,e??void 0),await z()}catch(e){C.error(e instanceof ee?e.message:`下载未完成 · 稍后重试`)}finally{O.value=null}}}function Z(){v.push(`/staff/orders`)}return h(z),(t,n)=>(x(),l(`div`,Se,[g(he,{title:T.value?`订单 #${T.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:a(()=>[g(s(F),{size:`small`,quaternary:``,onClick:Z},{icon:a(()=>[g(s(ne),{size:15})]),default:a(()=>[n[2]||=y(` 返回订单台 `,-1)]),_:1}),g(s(F),{size:`small`,quaternary:``,loading:D.value,onClick:n[0]||=e=>z()},{icon:a(()=>[g(s(ie),{size:15})]),default:a(()=>[n[3]||=y(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),D.value&&!T.value?(x(),l(`div`,Ce,[g(s(B),{height:`96px`,sharp:!1}),g(s(B),{height:`180px`,sharp:!1}),g(s(B),{height:`240px`,sharp:!1})])):T.value?(x(),l(e,{key:2},[r(`div`,Te,[r(`div`,Ee,[r(`div`,De,[r(`h2`,{class:`truncate text-lg font-bold`,title:T.value.preset_content??T.value.filename},p(s(q)(T.value)),9,Oe),r(`p`,ke,` 提交于 `+p(s(G)(T.value.create_time)),1)]),r(`div`,Ae,[g(ge,{status:T.value.status},null,8,[`status`]),r(`span`,{class:`tnum font-heading text-xl font-bold`,style:f({color:T.value.price===null||T.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},p(s(X)(T.value.price)),5)])]),!T.value.file_exists&&!M.value?(x(),c(s(te),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`文件不存在 · 需人工处理`},{default:a(()=>[...n[4]||=[y(` 订单记录仍在，上传目录里已经找不到这份文件。先确认是否被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):o(``,!0)]),M.value?(x(),l(`section`,je,[n[5]||=r(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),r(`p`,Me,p(T.value.preset_content),1),n[6]||=r(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件 · 上面那段是下单当时的快照； 预设后来改过或删了，此处仍是学生当时看到的原文。 `,-1)])):o(``,!0),r(`div`,Ne,[r(`section`,Pe,[r(`h3`,Fe,[n[7]||=y(` 打印要求 `,-1),!T.value.file_exists&&!M.value?(x(),c(s(re),{key:0,size:13})):o(``,!0)]),r(`dl`,Ie,[(x(!0),l(e,null,b(P.value,e=>(x(),l(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[r(`dt`,Le,p(e.label),1),r(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},p(e.value??`—`),9,Re)]))),128))]),T.value.duplex===`mixed`?(x(),l(`p`,ze,` 各份不同，见下方清单。 `)):o(``,!0),n[8]||=r(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),T.value.remark?(x(),l(`p`,Be,p(T.value.remark),1)):(x(),l(`p`,Ve,`学生未填写备注`))]),r(`div`,He,[r(`section`,Ue,[n[9]||=r(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),r(`dl`,We,[(x(!0),l(e,null,b(L.value,e=>(x(),l(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[r(`dt`,Ge,p(e.label),1),r(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},p(e.value??`—`),9,Ke)]))),128))])]),r(`section`,qe,[n[10]||=r(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),r(`dl`,Je,[(x(!0),l(e,null,b(R.value,e=>(x(),l(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[r(`dt`,Ye,p(e.label),1),r(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},p(e.value??`—`),9,Xe)]))),128))]),j.value&&T.value.files?.length?(x(),l(`ul`,Ze,[(x(!0),l(e,null,b(T.value.files,(e,t)=>(x(),l(`li`,{key:e.id,class:`flex items-center gap-2`},[r(`span`,Qe,p(t+1)+`.`,1),r(`span`,$e,[r(`span`,{class:`block truncate text-xs`,title:e.filename,style:f(e.exists?``:`color: var(--warn)`)},[y(p(e.filename)+` `,1),e.exists?o(``,!0):(x(),l(`span`,tt,`· 不在服务器上了`))],12,et),r(`span`,{class:`block truncate text-2xs text-ink-3`,title:I(e)},p(I(e)),9,nt)]),r(`span`,rt,p(e.size===null?``:s(Y)(e.size)),1),e.exists?(x(),c(s(F),{key:0,size:`tiny`,quaternary:``,loading:O.value===e.id,title:`下载「${e.filename}」`,onClick:t=>H(e.id,e.filename,e.size??void 0)},{icon:a(()=>[g(s(V),{size:13})]),_:1},8,[`loading`,`title`,`onClick`])):o(``,!0)]))),128))])):j.value?(x(),c(s(F),{key:1,size:`small`,block:``,class:`mt-3`,loading:O.value!==null,onClick:n[1]||=e=>H(T.value.files?.[0]?.id??null,s(q)(T.value),T.value.files?.[0]?.size??T.value.file_size??void 0)},{icon:a(()=>[g(s(V),{size:14})]),default:a(()=>[y(` 下载文件（`+p(s(Y)(T.value.file_size))+`） `,1)]),_:1},8,[`loading`])):T.value.claimed_by===null?(x(),l(`p`,it,` 尚未接单 · 接单后可下载文件 `)):o(``,!0)])])]),r(`section`,at,[r(`h3`,ot,[n[11]||=y(` 操作记录 `,-1),r(`span`,st,p(E.value.length)+` 条`,1)]),E.value.length?(x(),c(s(be),{key:0},{default:a(()=>[(x(!0),l(e,null,b(E.value,e=>(x(),c(s(xe),{key:e.id,time:s(G)(e.create_time),color:s(de)[e.action]},{default:a(()=>[r(`div`,ct,[r(`span`,lt,p(e.action_label),1),r(`span`,ut,p(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(x(),c(pe,{key:0,role:e.actor_role},null,8,[`role`])):o(``,!0)]),e.detail?(x(),l(`p`,dt,p(e.detail),1)):o(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(x(),l(`p`,ft,` 这一单暂无操作记录 · 留痕功能晚于订单本身，升级前的步骤不做倒推补录。 `))]),r(`p`,pt,`最后更新 `+p(s(fe)(T.value.update_time)),1)],64)):(x(),l(`div`,we,[g(me,{tone:`alarm`,code:`ERR / 404`,title:w.value===null?`订单不存在`:`无此订单 · 核对后重试`,hint:`地址栏里的编号可能有误，或这一单已经被撤回了`},null,8,[`title`])]))]))}});export{mt as default};