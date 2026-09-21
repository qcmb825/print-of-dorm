import{Dt as e,G as t,Gt as n,H as r,K as i,L as a,Lt as o,M as s,Q as c,U as l,W as u,X as d,Z as f,d as p,dt as m,gt as h,ht as g,j as _,m as v,mt as y,on as b,rt as x,sn as S}from"./endpoints-BhTSb8lj.js";import{A as C,C as w,Gt as T,Jt as E,Kt as D,Yt as O,Zt as k,_t as A,ft as j,ht as M,it as N,j as P,k as F,n as I,st as L,t as R,x as z}from"./createLucideIcon-Byg0Q1WZ.js";import{t as B}from"./format-length-BwSo_EUP.js";import{t as ee}from"./Alert-BAwcMzJI.js";import{n as V,t as H}from"./Skeleton-DLWzDi2d.js";import{t as te}from"./download-CCCsvXzI.js";import{t as U}from"./refresh-cw-UjOv4409.js";import{S as W,h as ne,t as re}from"./index-Cbuc1RP1.js";import{D as G,_ as ie,d as K,f as q,g as J,h as Y,n as ae,p as oe,r as se,t as ce,u as le,v as X,y as ue}from"./format-1rjnJmsR.js";import{t as de}from"./RoleTag-CdLMVIoz.js";import{t as fe}from"./EmptyState-C1GYtP_X.js";import{t as pe}from"./PageHeader-B53776a2.js";import{t as me}from"./StatusTag-D6if0H3-.js";function he(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...ne,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var ge={name:`Timeline`,common:P,self:he},Z=1.25,_e=D(`timeline`,`
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
 `)])])]),ve={...F.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=M(`n-timeline`),ye=c({name:`Timeline`,props:ve,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=j(e),r=F(`Timeline`,`-timeline`,_e,ge,e,n);return g(Q,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return y(),i(`div`,{class:N([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[L(()=>t.default?.())],2)}}}),be=c({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=x(Q);t||A(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),V();let{inlineThemeDisabled:n}=j(),i=r(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[k(`iconSize`,n)]:f,[k(`titleMargin`,n)]:p,[k(`titleFontSize`,n)]:m,[k(`circleBorder`,a)]:h,[k(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":B(r)||f}}),a=n?C(`timeline-item`,r(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),i,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:r}=this;return n?.(),y(),i(`div`,{class:N([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:b(this.cssVars)},[l(`div`,{class:N(`${e}-timeline-item-timeline`)},[l(`div`,{class:N(`${e}-timeline-item-timeline__line`)},null,2),L(()=>w(r.icon,n=>n?(y(),i(`div`,{key:1,class:N(`${e}-timeline-item-timeline__icon`),style:b({color:t})},[L(()=>n)],6)):(y(),i(`div`,{key:2,class:N(`${e}-timeline-item-timeline__circle`),style:b({borderColor:t})},null,6))))],2),l(`div`,{class:N(`${e}-timeline-item-content`)},[L(()=>w(r.header,t=>t||this.title?(y(),i(`div`,{key:3,class:N(`${e}-timeline-item-content__title`)},[L(()=>t||this.title)],2)):null)),l(`div`,{class:N(`${e}-timeline-item-content__content`)},[L(()=>z(r.default,()=>[this.content]))],2),l(`div`,{class:N(`${e}-timeline-item-content__meta`)},[L(()=>z(r.footer,()=>[this.time]))],2)],2)],6)}}),xe=R({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),Se=R({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Ce={class:`mx-auto max-w-[1000px]`},we={key:0,class:`flex flex-col gap-3`},Te={key:1,class:`panel grid place-items-center py-16`},Ee={class:`panel mb-3 p-4`},De={class:`flex flex-wrap items-start justify-between gap-3`},Oe={class:`min-w-0`},ke=[`title`],Ae={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},je={class:`flex shrink-0 flex-wrap items-center gap-2`},Me={key:0,class:`panel mb-3 p-4`},Ne={class:`whitespace-pre-wrap break-words text-sm leading-6`},Pe={class:`mb-3 grid gap-3 sm:grid-cols-2`},Fe={class:`panel p-4`},Ie={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Le={class:`divide-y`,style:{"border-color":`var(--border)`}},Re={class:`shrink-0 text-xs text-ink-3`},ze=[`title`],Be={key:0,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Ve={key:1,class:`mt-1 text-sm text-ink-3`},He={class:`flex flex-col gap-3`},Ue={class:`panel p-4`},We={class:`divide-y`,style:{"border-color":`var(--border)`}},Ge={class:`shrink-0 text-xs text-ink-3`},Ke=[`title`],qe={class:`panel p-4`},Je={class:`divide-y`,style:{"border-color":`var(--border)`}},$={class:`shrink-0 text-xs text-ink-3`},Ye=[`title`],Xe={key:1,class:`mt-3 text-xs text-ink-3`},Ze={class:`panel p-4`},Qe={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},$e={class:`text-ink-3`},et={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},tt={class:`text-sm font-semibold`},nt={class:`text-xs text-ink-3`},rt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},it={key:1,class:`text-xs leading-6 text-ink-3`},at={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},ot=c({__name:`OrderDetailView`,setup(c){let g=_(),x=s(),C=re(),w=W(),T=r(()=>{let e=Array.isArray(g.params.id)?g.params.id[0]:g.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),E=o(null),D=o([]),O=o(!1),k=o(!1),A=r(()=>C.user?.id??0),j=r(()=>C.advancedAllowed),M=r(()=>{let e=E.value;return!e||e.claimed_by===null||!e.filename?!1:j.value||e.claimed_by===A.value}),N=r(()=>!!E.value&&oe(E.value));function P(e){return G[e??`web`]??G.web}let F=r(()=>{let e=E.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?ce[e.color_type]:`黑白`} / ${e.duplex?ae[e.duplex]:`单面`}`},{label:`份数`,value:le(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t}),L=r(()=>{let e=E.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),R=r(()=>{let e=E.value;return e?[{label:`单号`,value:ie(e.pickup_code)},{label:`来源`,value:P(e.source)},{label:`金额`,value:X(e.price)},{label:`预估价`,value:e.est_price===null||e.est_price===void 0?null:e.est_pages?`${X(e.est_price)}（按 ${e.est_pages} 页估算）`:X(e.est_price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?q(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?q(e.price_time):null},{label:`提交时间`,value:q(e.create_time)},{label:`最后更新`,value:q(e.update_time)}]:[]});async function z(){if(T.value!==null){O.value=!0;try{let e=await p.detail(T.value);E.value=e.order,D.value=e.logs}catch(e){w.error(e instanceof v?e.message:`加载订单详情失败`)}finally{O.value=!1}}}async function B(){let e=E.value;if(e){k.value=!0;try{await p.download(e.id,Y(e),e.file_size??void 0),await z()}catch(e){w.error(e instanceof v?e.message:`下载失败`)}finally{k.value=!1}}}function V(){x.push(`/staff/orders`)}return m(z),(r,o)=>(y(),i(`div`,Ce,[f(pe,{title:E.value?`订单 #${E.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:e(()=>[f(n(I),{size:`small`,quaternary:``,onClick:V},{icon:e(()=>[f(n(xe),{size:15})]),default:e(()=>[o[1]||=d(` 返回订单台 `,-1)]),_:1}),f(n(I),{size:`small`,quaternary:``,loading:O.value,onClick:o[0]||=e=>z()},{icon:e(()=>[f(n(U),{size:15})]),default:e(()=>[o[2]||=d(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),O.value&&!E.value?(y(),i(`div`,we,[f(n(H),{height:`96px`,sharp:!1}),f(n(H),{height:`180px`,sharp:!1}),f(n(H),{height:`240px`,sharp:!1})])):E.value?(y(),i(a,{key:2},[l(`div`,Ee,[l(`div`,De,[l(`div`,Oe,[l(`h2`,{class:`truncate text-lg font-bold`,title:E.value.preset_content??E.value.filename},S(n(Y)(E.value)),9,ke),l(`p`,Ae,` 提交于 `+S(n(q)(E.value.create_time)),1)]),l(`div`,je,[f(me,{status:E.value.status},null,8,[`status`]),l(`span`,{class:`tnum font-heading text-xl font-bold`,style:b({color:E.value.price===null||E.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},S(n(X)(E.value.price)),5)])]),!E.value.file_exists&&!N.value?(y(),u(n(ee),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:e(()=>[...o[3]||=[d(` 订单记录还在，落盘的文件已经不在上传目录。先确认是不是被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):t(``,!0)]),N.value?(y(),i(`section`,Me,[o[4]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),l(`p`,Ne,S(E.value.preset_content),1),o[5]||=l(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件。上面那段是下单当时的快照， 预设后来改了或删了，这里显示的仍是学生当时看到的原文。 `,-1)])):t(``,!0),l(`div`,Pe,[l(`section`,Fe,[l(`h3`,Ie,[o[6]||=d(` 打印要求 `,-1),!E.value.file_exists&&!N.value?(y(),u(n(Se),{key:0,size:13})):t(``,!0)]),l(`dl`,Le,[(y(!0),i(a,null,h(F.value,e=>(y(),i(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,Re,S(e.label),1),l(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},S(e.value??`—`),9,ze)]))),128))]),o[7]||=l(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),E.value.remark?(y(),i(`p`,Be,S(E.value.remark),1)):(y(),i(`p`,Ve,`学生没有填写备注`))]),l(`div`,He,[l(`section`,Ue,[o[8]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),l(`dl`,We,[(y(!0),i(a,null,h(L.value,e=>(y(),i(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,Ge,S(e.label),1),l(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},S(e.value??`—`),9,Ke)]))),128))])]),l(`section`,qe,[o[9]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),l(`dl`,Je,[(y(!0),i(a,null,h(R.value,e=>(y(),i(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,$,S(e.label),1),l(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},S(e.value??`—`),9,Ye)]))),128))]),M.value?(y(),u(n(I),{key:0,size:`small`,block:``,class:`mt-3`,loading:k.value,onClick:B},{icon:e(()=>[f(n(te),{size:14})]),default:e(()=>[d(` 下载文件（`+S(n(K)(E.value.file_size))+`） `,1)]),_:1},8,[`loading`])):E.value.claimed_by===null?(y(),i(`p`,Xe,` 接单后才能下载文件。 `)):t(``,!0)])])]),l(`section`,Ze,[l(`h3`,Qe,[o[10]||=d(` 操作记录 `,-1),l(`span`,$e,S(D.value.length)+` 条`,1)]),D.value.length?(y(),u(n(ye),{key:0},{default:e(()=>[(y(!0),i(a,null,h(D.value,r=>(y(),u(n(be),{key:r.id,time:n(q)(r.create_time),color:n(se)[r.action]},{default:e(()=>[l(`div`,et,[l(`span`,tt,S(r.action_label),1),l(`span`,nt,S(r.actor_nickname??`（账号已注销）`),1),r.actor_role?(y(),u(de,{key:0,role:r.actor_role},null,8,[`role`])):t(``,!0)]),r.detail?(y(),i(`p`,rt,S(r.detail),1)):t(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(y(),i(`p`,it,` 这一单还没有操作记录。留痕是后加的，升级前的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如说清这里没有。 `))]),l(`p`,at,`最后更新 `+S(n(ue)(E.value.update_time)),1)],64)):(y(),i(`div`,Te,[f(fe,{tone:`alarm`,code:`ERR / 404`,title:T.value===null?`订单号不对`:`没有这个订单`,hint:`地址栏里的订单号可能被改过，或这一单已经被撤回了`},null,8,[`title`])]))]))}});export{ot as default};