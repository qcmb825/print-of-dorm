import{A as e,B as t,F as n,Ft as r,H as i,J as a,Tt as o,U as s,Ut as c,V as l,W as u,X as d,Y as f,an as p,ft as m,in as h,k as g,lt as _,mt as v,p as y,pt as b,tt as x,u as S}from"./endpoints-BxtGT1Ar.js";import{A as C,C as w,Gt as T,Jt as E,Kt as D,Yt as O,Zt as k,_t as A,ft as j,ht as M,it as N,j as P,k as F,n as I,st as L,t as R,x as z}from"./createLucideIcon-Cwmwwrzy.js";import{t as B}from"./format-length-BwSo_EUP.js";import{t as V}from"./Alert-C_sVe1Q-.js";import{n as H,t as U}from"./Skeleton-DZ7LHirW.js";import{t as W}from"./download-CXWfclSo.js";import{t as ee}from"./refresh-cw-C4b4mIHk.js";import{S as te,h as ne,t as re}from"./index-BA85k74C.js";import{_ as ie,d as G,f as K,g as q,h as J,n as Y,p as ae,r as oe,t as se,u as ce,v as X,y as le}from"./format-BepUAO79.js";import{t as ue}from"./RoleTag-1BaJTP4Q.js";import{t as de}from"./EmptyState-WVSzesl1.js";import{t as fe}from"./PageHeader-bFTXjm6b.js";import{t as pe}from"./StatusTag-B3gMafrg.js";function me(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...ne,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var he={name:`Timeline`,common:P,self:me},Z=1.25,ge=D(`timeline`,`
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
 `)])])]),_e={...F.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=M(`n-timeline`),ve=d({name:`Timeline`,props:_e,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=j(e),r=F(`Timeline`,`-timeline`,ge,he,e,n);return b(Q,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return m(),u(`div`,{class:N([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[L(()=>t.default?.())],2)}}}),ye=d({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let n=x(Q);n||A(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),H();let{inlineThemeDisabled:r}=j(),i=t(()=>{let{props:{size:t,iconSize:r},mergedThemeRef:i}=n,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[k(`iconSize`,t)]:f,[k(`titleMargin`,t)]:p,[k(`titleFontSize`,t)]:m,[k(`circleBorder`,a)]:h,[k(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":B(r)||f}}),a=r?C(`timeline-item`,t(()=>{let{props:{size:t,iconSize:r}}=n,{type:i}=e;return`${t[0]}${r||`a`}${i[0]}`}),i,n.props):void 0;return{mergedClsPrefix:n.mergedClsPrefixRef,cssVars:r?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:r}=this;return n?.(),m(),u(`div`,{class:N([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:h(this.cssVars)},[l(`div`,{class:N(`${e}-timeline-item-timeline`)},[l(`div`,{class:N(`${e}-timeline-item-timeline__line`)},null,2),L(()=>w(r.icon,n=>n?(m(),u(`div`,{key:1,class:N(`${e}-timeline-item-timeline__icon`),style:h({color:t})},[L(()=>n)],6)):(m(),u(`div`,{key:2,class:N(`${e}-timeline-item-timeline__circle`),style:h({borderColor:t})},null,6))))],2),l(`div`,{class:N(`${e}-timeline-item-content`)},[L(()=>w(r.header,t=>t||this.title?(m(),u(`div`,{key:3,class:N(`${e}-timeline-item-content__title`)},[L(()=>t||this.title)],2)):null)),l(`div`,{class:N(`${e}-timeline-item-content__content`)},[L(()=>z(r.default,()=>[this.content]))],2),l(`div`,{class:N(`${e}-timeline-item-content__meta`)},[L(()=>z(r.footer,()=>[this.time]))],2)],2)],6)}}),be=R({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),xe=R({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Se={class:`mx-auto max-w-[1000px]`},Ce={key:0,class:`flex flex-col gap-3`},we={key:1,class:`panel grid place-items-center py-16`},Te={class:`panel mb-3 p-4`},Ee={class:`flex flex-wrap items-start justify-between gap-3`},De={class:`min-w-0`},Oe=[`title`],ke={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ae={class:`flex shrink-0 flex-wrap items-center gap-2`},je={key:0,class:`panel mb-3 p-4`},Me={class:`whitespace-pre-wrap break-words text-sm leading-6`},Ne={class:`mb-3 grid gap-3 sm:grid-cols-2`},Pe={class:`panel p-4`},Fe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Ie={class:`divide-y`,style:{"border-color":`var(--border)`}},Le={class:`shrink-0 text-xs text-ink-3`},Re=[`title`],ze={key:0,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Be={key:1,class:`mt-1 text-sm text-ink-3`},Ve={class:`flex flex-col gap-3`},He={class:`panel p-4`},Ue={class:`divide-y`,style:{"border-color":`var(--border)`}},We={class:`shrink-0 text-xs text-ink-3`},Ge=[`title`],Ke={class:`panel p-4`},qe={class:`divide-y`,style:{"border-color":`var(--border)`}},Je={class:`shrink-0 text-xs text-ink-3`},$=[`title`],Ye={key:1,class:`mt-3 text-xs text-ink-3`},Xe={class:`panel p-4`},Ze={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},Qe={class:`text-ink-3`},$e={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},et={class:`text-sm font-semibold`},tt={class:`text-xs text-ink-3`},nt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},rt={key:1,class:`text-xs leading-6 text-ink-3`},it={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},at=d({__name:`OrderDetailView`,setup(d){let b=g(),x=e(),C=re(),w=te(),T=t(()=>{let e=Array.isArray(b.params.id)?b.params.id[0]:b.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),E=r(null),D=r([]),O=r(!1),k=r(!1),A=t(()=>C.user?.id??0),j=t(()=>C.advancedAllowed),M=t(()=>{let e=E.value;return!e||e.claimed_by===null||!e.filename?!1:j.value||e.claimed_by===A.value}),N=t(()=>!!E.value&&ae(E.value)),P=t(()=>{let e=E.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?se[e.color_type]:`黑白`} / ${e.duplex?Y[e.duplex]:`单面`}`},{label:`份数`,value:ce(e.copies)},{label:`纸张`,value:q(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:G(e.file_size)})),t}),F=t(()=>{let e=E.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),L=t(()=>{let e=E.value;return e?[{label:`单号`,value:ie(e.pickup_code)},{label:`金额`,value:X(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?K(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?K(e.price_time):null},{label:`提交时间`,value:K(e.create_time)},{label:`最后更新`,value:K(e.update_time)}]:[]});async function R(){if(T.value!==null){O.value=!0;try{let e=await S.detail(T.value);E.value=e.order,D.value=e.logs}catch(e){w.error(e instanceof y?e.message:`加载订单详情失败`)}finally{O.value=!1}}}async function z(){let e=E.value;if(e){k.value=!0;try{await S.download(e.id,J(e),e.file_size??void 0),await R()}catch(e){w.error(e instanceof y?e.message:`下载失败`)}finally{k.value=!1}}}function B(){x.push(`/staff/orders`)}return _(R),(e,t)=>(m(),u(`div`,Se,[f(fe,{title:E.value?`订单 #${E.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:o(()=>[f(c(I),{size:`small`,quaternary:``,onClick:B},{icon:o(()=>[f(c(be),{size:15})]),default:o(()=>[t[1]||=a(` 返回订单台 `,-1)]),_:1}),f(c(I),{size:`small`,quaternary:``,loading:O.value,onClick:t[0]||=e=>R()},{icon:o(()=>[f(c(ee),{size:15})]),default:o(()=>[t[2]||=a(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),O.value&&!E.value?(m(),u(`div`,Ce,[f(c(U),{height:`96px`,sharp:!1}),f(c(U),{height:`180px`,sharp:!1}),f(c(U),{height:`240px`,sharp:!1})])):E.value?(m(),u(n,{key:2},[l(`div`,Te,[l(`div`,Ee,[l(`div`,De,[l(`h2`,{class:`truncate text-lg font-bold`,title:E.value.preset_content??E.value.filename},p(c(J)(E.value)),9,Oe),l(`p`,ke,` 提交于 `+p(c(K)(E.value.create_time)),1)]),l(`div`,Ae,[f(pe,{status:E.value.status},null,8,[`status`]),l(`span`,{class:`tnum font-heading text-xl font-bold`,style:h({color:E.value.price===null||E.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},p(c(X)(E.value.price)),5)])]),!E.value.file_exists&&!N.value?(m(),i(c(V),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:o(()=>[...t[3]||=[a(` 订单记录还在，落盘的文件已经不在上传目录。先确认是不是被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):s(``,!0)]),N.value?(m(),u(`section`,je,[t[4]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),l(`p`,Me,p(E.value.preset_content),1),t[5]||=l(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件。上面那段是下单当时的快照， 预设后来改了或删了，这里显示的仍是学生当时看到的原文。 `,-1)])):s(``,!0),l(`div`,Ne,[l(`section`,Pe,[l(`h3`,Fe,[t[6]||=a(` 打印要求 `,-1),!E.value.file_exists&&!N.value?(m(),i(c(xe),{key:0,size:13})):s(``,!0)]),l(`dl`,Ie,[(m(!0),u(n,null,v(P.value,e=>(m(),u(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,Le,p(e.label),1),l(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},p(e.value??`—`),9,Re)]))),128))]),t[7]||=l(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),E.value.remark?(m(),u(`p`,ze,p(E.value.remark),1)):(m(),u(`p`,Be,`学生没有填写备注`))]),l(`div`,Ve,[l(`section`,He,[t[8]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),l(`dl`,Ue,[(m(!0),u(n,null,v(F.value,e=>(m(),u(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,We,p(e.label),1),l(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},p(e.value??`—`),9,Ge)]))),128))])]),l(`section`,Ke,[t[9]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),l(`dl`,qe,[(m(!0),u(n,null,v(L.value,e=>(m(),u(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,Je,p(e.label),1),l(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},p(e.value??`—`),9,$)]))),128))]),M.value?(m(),i(c(I),{key:0,size:`small`,block:``,class:`mt-3`,loading:k.value,onClick:z},{icon:o(()=>[f(c(W),{size:14})]),default:o(()=>[a(` 下载文件（`+p(c(G)(E.value.file_size))+`） `,1)]),_:1},8,[`loading`])):E.value.claimed_by===null?(m(),u(`p`,Ye,` 接单后才能下载文件。 `)):s(``,!0)])])]),l(`section`,Xe,[l(`h3`,Ze,[t[10]||=a(` 操作记录 `,-1),l(`span`,Qe,p(D.value.length)+` 条`,1)]),D.value.length?(m(),i(c(ve),{key:0},{default:o(()=>[(m(!0),u(n,null,v(D.value,e=>(m(),i(c(ye),{key:e.id,time:c(K)(e.create_time),color:c(oe)[e.action]},{default:o(()=>[l(`div`,$e,[l(`span`,et,p(e.action_label),1),l(`span`,tt,p(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(m(),i(ue,{key:0,role:e.actor_role},null,8,[`role`])):s(``,!0)]),e.detail?(m(),u(`p`,nt,p(e.detail),1)):s(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(m(),u(`p`,rt,` 这一单还没有操作记录。留痕是后加的，升级前的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如说清这里没有。 `))]),l(`p`,it,`最后更新 `+p(c(le)(E.value.update_time)),1)],64)):(m(),u(`div`,we,[f(de,{tone:`alarm`,code:`ERR / 404`,title:T.value===null?`订单号不对`:`没有这个订单`,hint:`地址栏里的订单号可能被改过，或这一单已经被撤回了`},null,8,[`title`])]))]))}});export{at as default};