import{A as e,Et as t,G as n,H as r,I as i,It as a,U as o,V as s,W as c,Wt as l,X as u,Y as d,Z as f,an as p,d as m,ht as h,j as g,m as _,mt as v,nt as y,on as b,pt as x,ut as ee}from"./endpoints-MMH2_YQj.js";import{A as S,C,Gt as w,Jt as T,Kt as E,Yt as D,Zt as O,_t as k,ft as A,ht as j,it as M,j as N,k as P,n as F,st as I,t as L,x as R}from"./createLucideIcon-Dgil5eM1.js";import{t as z}from"./format-length-BwSo_EUP.js";import{t as B}from"./Alert-2VpluHj5.js";import{n as V,t as H}from"./Skeleton-eb0Rc9Cy.js";import{t as U}from"./download-BaF5aVB-.js";import{t as W}from"./refresh-cw-Dp-DjNKO.js";import{S as te,h as ne,t as re}from"./index-ChakMpLN.js";import{D as G,_ as ie,d as K,f as q,g as J,h as Y,n as ae,p as oe,r as se,t as ce,u as le,v as X,y as ue}from"./format-1rjnJmsR.js";import{t as de}from"./RoleTag-7XIccQFD.js";import{t as fe}from"./EmptyState-CG8-rmPG.js";import{t as pe}from"./PageHeader-FEdpxFLN.js";import{t as me}from"./StatusTag-5AVoSPuq.js";function he(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...ne,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var ge={name:`Timeline`,common:N,self:he},Z=1.25,_e=E(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
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
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
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
 `)])])]),ve={...P.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=j(`n-timeline`),ye=f({name:`Timeline`,props:ve,setup(e,{slots:t}){let{mergedClsPrefixRef:r}=A(e),i=P(`Timeline`,`-timeline`,_e,ge,e,r);return v(Q,{props:e,mergedThemeRef:i,mergedClsPrefixRef:r}),()=>{let{value:i}=r;return x(),n(`div`,{class:M([`${i}-timeline`,e.horizontal&&`${i}-timeline--horizontal`,`${i}-timeline--${e.size}-size`,!e.horizontal&&`${i}-timeline--${e.itemPlacement}-placement`])},[I(()=>t.default?.())],2)}}}),be=f({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=y(Q);t||k(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),V();let{inlineThemeDisabled:n}=A(),r=s(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[O(`iconSize`,n)]:f,[O(`titleMargin`,n)]:p,[O(`titleFontSize`,n)]:m,[O(`circleBorder`,a)]:h,[O(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":z(r)||f}}),i=n?S(`timeline-item`,s(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),r,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:r,themeClass:i?.themeClass,onRender:i?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:i,$slots:a}=this;return i?.(),x(),n(`div`,{class:M([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:p(this.cssVars)},[r(`div`,{class:M(`${e}-timeline-item-timeline`)},[r(`div`,{class:M(`${e}-timeline-item-timeline__line`)},null,2),I(()=>C(a.icon,r=>r?(x(),n(`div`,{key:1,class:M(`${e}-timeline-item-timeline__icon`),style:p({color:t})},[I(()=>r)],6)):(x(),n(`div`,{key:2,class:M(`${e}-timeline-item-timeline__circle`),style:p({borderColor:t})},null,6))))],2),r(`div`,{class:M(`${e}-timeline-item-content`)},[I(()=>C(a.header,t=>t||this.title?(x(),n(`div`,{key:3,class:M(`${e}-timeline-item-content__title`)},[I(()=>t||this.title)],2)):null)),r(`div`,{class:M(`${e}-timeline-item-content__content`)},[I(()=>R(a.default,()=>[this.content]))],2),r(`div`,{class:M(`${e}-timeline-item-content__meta`)},[I(()=>R(a.footer,()=>[this.time]))],2)],2)],6)}}),xe=L({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),Se=L({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Ce={class:`mx-auto max-w-[1000px]`},we={key:0,class:`flex flex-col gap-3`},Te={key:1,class:`panel grid place-items-center py-16`},Ee={class:`panel mb-3 p-4`},De={class:`flex flex-wrap items-start justify-between gap-3`},Oe={class:`min-w-0`},ke=[`title`],Ae={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},je={class:`flex shrink-0 flex-wrap items-center gap-2`},Me={key:0,class:`panel mb-3 p-4`},Ne={class:`whitespace-pre-wrap break-words text-sm leading-6`},Pe={class:`mb-3 grid gap-3 sm:grid-cols-2`},Fe={class:`panel p-4`},Ie={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Le={class:`divide-y`,style:{"border-color":`var(--border)`}},Re={class:`shrink-0 text-xs text-ink-3`},ze=[`title`],Be={key:0,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Ve={key:1,class:`mt-1 text-sm text-ink-3`},He={class:`flex flex-col gap-3`},Ue={class:`panel p-4`},We={class:`divide-y`,style:{"border-color":`var(--border)`}},Ge={class:`shrink-0 text-xs text-ink-3`},Ke=[`title`],qe={class:`panel p-4`},Je={class:`divide-y`,style:{"border-color":`var(--border)`}},$={class:`shrink-0 text-xs text-ink-3`},Ye=[`title`],Xe={key:1,class:`mt-3 text-xs text-ink-3`},Ze={class:`panel p-4`},Qe={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},$e={class:`text-ink-3`},et={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},tt={class:`text-sm font-semibold`},nt={class:`text-xs text-ink-3`},rt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},it={key:1,class:`text-xs leading-6 text-ink-3`},at={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},ot=f({__name:`OrderDetailView`,setup(f){let v=e(),y=g(),S=re(),C=te(),w=s(()=>{let e=Array.isArray(v.params.id)?v.params.id[0]:v.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),T=a(null),E=a([]),D=a(!1),O=a(!1),k=s(()=>S.user?.id??0),A=s(()=>S.advancedAllowed),j=s(()=>{let e=T.value;return!e||e.claimed_by===null||!e.filename?!1:A.value||e.claimed_by===k.value}),M=s(()=>!!T.value&&oe(T.value));function N(e){return G[e??`web`]??G.web}let P=s(()=>{let e=T.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?ce[e.color_type]:`黑白`} / ${e.duplex?ae[e.duplex]:`单面`}`},{label:`份数`,value:le(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t}),I=s(()=>{let e=T.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),L=s(()=>{let e=T.value;return e?[{label:`单号`,value:ie(e.pickup_code)},{label:`来源`,value:N(e.source)},{label:`金额`,value:X(e.price)},{label:`预估价`,value:e.est_price===null||e.est_price===void 0?null:e.est_pages?`${X(e.est_price)}（按 ${e.est_pages} 页估算）`:X(e.est_price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?q(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?q(e.price_time):null},{label:`提交时间`,value:q(e.create_time)},{label:`最后更新`,value:q(e.update_time)}]:[]});async function R(){if(w.value!==null){D.value=!0;try{let e=await m.detail(w.value);T.value=e.order,E.value=e.logs}catch(e){C.error(e instanceof _?e.message:`加载订单详情失败`)}finally{D.value=!1}}}async function z(){let e=T.value;if(e){O.value=!0;try{await m.download(e.id,Y(e),e.file_size??void 0),await R()}catch(e){C.error(e instanceof _?e.message:`下载失败`)}finally{O.value=!1}}}function V(){y.push(`/staff/orders`)}return ee(R),(e,a)=>(x(),n(`div`,Ce,[u(pe,{title:T.value?`订单 #${T.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:t(()=>[u(l(F),{size:`small`,quaternary:``,onClick:V},{icon:t(()=>[u(l(xe),{size:15})]),default:t(()=>[a[1]||=d(` 返回订单台 `,-1)]),_:1}),u(l(F),{size:`small`,quaternary:``,loading:D.value,onClick:a[0]||=e=>R()},{icon:t(()=>[u(l(W),{size:15})]),default:t(()=>[a[2]||=d(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),D.value&&!T.value?(x(),n(`div`,we,[u(l(H),{height:`96px`,sharp:!1}),u(l(H),{height:`180px`,sharp:!1}),u(l(H),{height:`240px`,sharp:!1})])):T.value?(x(),n(i,{key:2},[r(`div`,Ee,[r(`div`,De,[r(`div`,Oe,[r(`h2`,{class:`truncate text-lg font-bold`,title:T.value.preset_content??T.value.filename},b(l(Y)(T.value)),9,ke),r(`p`,Ae,` 提交于 `+b(l(q)(T.value.create_time)),1)]),r(`div`,je,[u(me,{status:T.value.status},null,8,[`status`]),r(`span`,{class:`tnum font-heading text-xl font-bold`,style:p({color:T.value.price===null||T.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},b(l(X)(T.value.price)),5)])]),!T.value.file_exists&&!M.value?(x(),o(l(B),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:t(()=>[...a[3]||=[d(` 订单记录还在，落盘的文件已经不在上传目录。先确认是不是被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):c(``,!0)]),M.value?(x(),n(`section`,Me,[a[4]||=r(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),r(`p`,Ne,b(T.value.preset_content),1),a[5]||=r(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件。上面那段是下单当时的快照， 预设后来改了或删了，这里显示的仍是学生当时看到的原文。 `,-1)])):c(``,!0),r(`div`,Pe,[r(`section`,Fe,[r(`h3`,Ie,[a[6]||=d(` 打印要求 `,-1),!T.value.file_exists&&!M.value?(x(),o(l(Se),{key:0,size:13})):c(``,!0)]),r(`dl`,Le,[(x(!0),n(i,null,h(P.value,e=>(x(),n(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[r(`dt`,Re,b(e.label),1),r(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},b(e.value??`—`),9,ze)]))),128))]),a[7]||=r(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),T.value.remark?(x(),n(`p`,Be,b(T.value.remark),1)):(x(),n(`p`,Ve,`学生没有填写备注`))]),r(`div`,He,[r(`section`,Ue,[a[8]||=r(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),r(`dl`,We,[(x(!0),n(i,null,h(I.value,e=>(x(),n(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[r(`dt`,Ge,b(e.label),1),r(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},b(e.value??`—`),9,Ke)]))),128))])]),r(`section`,qe,[a[9]||=r(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),r(`dl`,Je,[(x(!0),n(i,null,h(L.value,e=>(x(),n(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[r(`dt`,$,b(e.label),1),r(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},b(e.value??`—`),9,Ye)]))),128))]),j.value?(x(),o(l(F),{key:0,size:`small`,block:``,class:`mt-3`,loading:O.value,onClick:z},{icon:t(()=>[u(l(U),{size:14})]),default:t(()=>[d(` 下载文件（`+b(l(K)(T.value.file_size))+`） `,1)]),_:1},8,[`loading`])):T.value.claimed_by===null?(x(),n(`p`,Xe,` 接单后才能下载文件。 `)):c(``,!0)])])]),r(`section`,Ze,[r(`h3`,Qe,[a[10]||=d(` 操作记录 `,-1),r(`span`,$e,b(E.value.length)+` 条`,1)]),E.value.length?(x(),o(l(ye),{key:0},{default:t(()=>[(x(!0),n(i,null,h(E.value,e=>(x(),o(l(be),{key:e.id,time:l(q)(e.create_time),color:l(se)[e.action]},{default:t(()=>[r(`div`,et,[r(`span`,tt,b(e.action_label),1),r(`span`,nt,b(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(x(),o(de,{key:0,role:e.actor_role},null,8,[`role`])):c(``,!0)]),e.detail?(x(),n(`p`,rt,b(e.detail),1)):c(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(x(),n(`p`,it,` 这一单还没有操作记录。留痕是后加的，升级前的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如说清这里没有。 `))]),r(`p`,at,`最后更新 `+b(l(ue)(T.value.update_time)),1)],64)):(x(),n(`div`,Te,[u(fe,{tone:`alarm`,code:`ERR / 404`,title:w.value===null?`订单号不对`:`没有这个订单`,hint:`地址栏里的订单号可能被改过，或这一单已经被撤回了`},null,8,[`title`])]))]))}});export{ot as default};