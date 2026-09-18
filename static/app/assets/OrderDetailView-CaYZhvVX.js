import{B as e,H as t,Ht as n,J as r,O as i,P as a,Pt as o,U as s,V as c,Y as l,ct as u,dt as d,et as f,f as p,ft as m,in as h,k as g,l as _,pt as v,q as y,rn as b,wt as x,z as S}from"./endpoints-C3DHQTsP.js";import{A as C,Gt as w,Jt as T,O as E,S as D,Wt as O,Xt as k,b as A,dt as j,gt as M,k as N,mt as P,ot as F,qt as I,rt as L,t as R}from"./Button-CRn1PyiM.js";import{t as ee}from"./Empty-CXHXyX85.js";import{t as z}from"./format-length-BwSo_EUP.js";import{t as B}from"./Alert-C03vQ6Gy.js";import{n as V,t as H}from"./Skeleton-BdqCWvtc.js";import{b as U,p as W,t as te}from"./index-jeQzARWq.js";import{t as G}from"./createLucideIcon-BoaTMI8Y.js";import{t as ne}from"./download-DJ3qVZdR.js";import{t as re}from"./refresh-cw-FX6uGmos.js";import{_ as ie,d as K,f as q,g as J,h as Y,n as ae,p as oe,r as se,t as ce,u as le,v as X,y as ue}from"./format-DMiwIsNr.js";import{t as de}from"./RoleTag-DPFs4BZ3.js";import{t as fe}from"./PageHeader-RVqSvJjd.js";import{t as pe}from"./StatusTag-REtSd5-9.js";function me(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...W,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var he={name:`Timeline`,common:C,self:me},Z=1.25,ge=w(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[T(`horizontal`,`
 flex-direction: row;
 `,[O(`>`,[w(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[T(`dashed-line-type`,[O(`>`,[w(`timeline-item-timeline`,[I(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),O(`>`,[w(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[O(`>`,[I(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),w(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[I(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),T(`right-placement`,[w(`timeline-item`,[w(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),w(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),T(`left-placement`,[w(`timeline-item`,[w(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),w(`timeline-item-timeline`,`
 left: 0;
 `)])]),w(`timeline-item`,`
 position: relative;
 `,[O(`&:last-child`,[w(`timeline-item-timeline`,[I(`line`,`
 display: none;
 `)]),w(`timeline-item-content`,[I(`meta`,`
 margin-bottom: 0;
 `)])]),w(`timeline-item-content`,[I(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),I(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),I(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),T(`dashed-line-type`,[w(`timeline-item-timeline`,[I(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),w(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[I(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),I(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),I(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),_e={...E.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=P(`n-timeline`),ve=l({name:`Timeline`,props:_e,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=j(e),r=E(`Timeline`,`-timeline`,ge,he,e,n);return m(Q,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return d(),s(`div`,{class:L([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[F(()=>t.default?.())],2)}}}),ye=l({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=f(Q);t||M(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),V();let{inlineThemeDisabled:n}=j(),r=S(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[k(`iconSize`,n)]:f,[k(`titleMargin`,n)]:p,[k(`titleFontSize`,n)]:m,[k(`circleBorder`,a)]:h,[k(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":z(r)||f}}),i=n?N(`timeline-item`,S(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),r,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:r,themeClass:i?.themeClass,onRender:i?.onRender}},render(){let{mergedClsPrefix:t,color:n,onRender:r,$slots:i}=this;return r?.(),d(),s(`div`,{class:L([`${t}-timeline-item`,this.themeClass,`${t}-timeline-item--${this.type}-type`,`${t}-timeline-item--${this.lineType}-line-type`]),style:b(this.cssVars)},[e(`div`,{class:L(`${t}-timeline-item-timeline`)},[e(`div`,{class:L(`${t}-timeline-item-timeline__line`)},null,2),F(()=>D(i.icon,e=>e?(d(),s(`div`,{key:1,class:L(`${t}-timeline-item-timeline__icon`),style:b({color:n})},[F(()=>e)],6)):(d(),s(`div`,{key:2,class:L(`${t}-timeline-item-timeline__circle`),style:b({borderColor:n})},null,6))))],2),e(`div`,{class:L(`${t}-timeline-item-content`)},[F(()=>D(i.header,e=>e||this.title?(d(),s(`div`,{key:3,class:L(`${t}-timeline-item-content__title`)},[F(()=>e||this.title)],2)):null)),e(`div`,{class:L(`${t}-timeline-item-content__content`)},[F(()=>A(i.default,()=>[this.content]))],2),e(`div`,{class:L(`${t}-timeline-item-content__meta`)},[F(()=>A(i.footer,()=>[this.time]))],2)],2)],6)}}),be=G({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),xe=G({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Se={class:`mx-auto max-w-[1000px]`},Ce={key:0,class:`flex flex-col gap-3`},we={key:1,class:`panel grid place-items-center py-16`},Te={class:`panel mb-3 p-4`},Ee={class:`flex flex-wrap items-start justify-between gap-3`},De={class:`min-w-0`},Oe=[`title`],ke={class:`tech-label mt-1 text-ink-4 tech-label--cn text-xs`},Ae={class:`flex shrink-0 flex-wrap items-center gap-2`},je={key:0,class:`panel mb-3 p-4`},Me={class:`whitespace-pre-wrap break-words text-sm leading-6`},Ne={class:`mb-3 grid gap-3 sm:grid-cols-2`},Pe={class:`panel p-4`},Fe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Ie={class:`divide-y`,style:{"border-color":`var(--border)`}},Le={class:`shrink-0 text-xs text-ink-4`},Re=[`title`],ze={key:0,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Be={key:1,class:`mt-1 text-sm text-ink-4`},Ve={class:`flex flex-col gap-3`},He={class:`panel p-4`},Ue={class:`divide-y`,style:{"border-color":`var(--border)`}},We={class:`shrink-0 text-xs text-ink-4`},Ge=[`title`],Ke={class:`panel p-4`},qe={class:`divide-y`,style:{"border-color":`var(--border)`}},Je={class:`shrink-0 text-xs text-ink-4`},$=[`title`],Ye={key:1,class:`mt-3 text-xs text-ink-4`},Xe={class:`panel p-4`},Ze={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},Qe={class:`text-ink-4`},$e={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},et={class:`text-sm font-semibold`},tt={class:`text-xs text-ink-3`},nt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},rt={key:1,class:`text-xs leading-6 text-ink-4`},it={class:`tech-label mt-3 text-ink-4 tech-label--cn text-xs`},at=l({__name:`OrderDetailView`,setup(l){let f=i(),m=g(),C=te(),w=U(),T=S(()=>{let e=Array.isArray(f.params.id)?f.params.id[0]:f.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),E=o(null),D=o([]),O=o(!1),k=o(!1),A=S(()=>C.user?.id??0),j=S(()=>C.advancedAllowed),M=S(()=>{let e=E.value;return!e||e.claimed_by===null||!e.filename?!1:j.value||e.claimed_by===A.value}),N=S(()=>!!E.value&&oe(E.value)),P=S(()=>{let e=E.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?ce[e.color_type]:`黑白`} / ${e.duplex?ae[e.duplex]:`单面`}`},{label:`份数`,value:le(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t}),F=S(()=>{let e=E.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),I=S(()=>{let e=E.value;return e?[{label:`取件码`,value:ie(e.pickup_code)},{label:`金额`,value:X(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?q(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?q(e.price_time):null},{label:`提交时间`,value:q(e.create_time)},{label:`最后更新`,value:q(e.update_time)}]:[]});async function L(){if(T.value!==null){O.value=!0;try{let e=await _.detail(T.value);E.value=e.order,D.value=e.logs}catch(e){w.error(e instanceof p?e.message:`加载订单详情失败`)}finally{O.value=!1}}}async function z(){let e=E.value;if(e){k.value=!0;try{await _.download(e.id,Y(e),e.file_size??void 0),await L()}catch(e){w.error(e instanceof p?e.message:`下载失败`)}finally{k.value=!1}}}function V(){m.push(`/staff/orders`)}return u(L),(i,o)=>(d(),s(`div`,Se,[r(fe,{title:E.value?`订单 #${E.value.id}`:`订单详情`,subtitle:`完整的订单信息与操作记录`},{actions:x(()=>[r(n(R),{size:`small`,quaternary:``,onClick:V},{icon:x(()=>[r(n(be),{size:15})]),default:x(()=>[o[1]||=y(` 返回订单台 `,-1)]),_:1}),r(n(R),{size:`small`,quaternary:``,loading:O.value,onClick:o[0]||=e=>L()},{icon:x(()=>[r(n(re),{size:15})]),default:x(()=>[o[2]||=y(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),O.value&&!E.value?(d(),s(`div`,Ce,[r(n(H),{height:`96px`,sharp:!1}),r(n(H),{height:`180px`,sharp:!1}),r(n(H),{height:`240px`,sharp:!1})])):E.value?(d(),s(a,{key:2},[e(`div`,Te,[e(`div`,Ee,[e(`div`,De,[e(`h2`,{class:`truncate text-lg font-bold`,title:E.value.preset_content??E.value.filename},h(n(Y)(E.value)),9,Oe),e(`p`,ke,` 提交于 `+h(n(q)(E.value.create_time)),1)]),e(`div`,Ae,[r(pe,{status:E.value.status},null,8,[`status`]),e(`span`,{class:`tnum font-heading text-xl font-bold`,style:b({color:E.value.price===null||E.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},h(n(X)(E.value.price)),5)])]),!E.value.file_exists&&!N.value?(d(),c(n(B),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:x(()=>[...o[3]||=[y(` 订单记录还在，但落盘的文件已经不在上传目录里。请先确认是不是被人手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):t(``,!0)]),N.value?(d(),s(`section`,je,[o[4]||=e(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),e(`p`,Me,h(E.value.preset_content),1),o[5]||=e(`p`,{class:`mt-2 text-xs text-ink-4`},` 这一单没有上传文件。上面这段话是下单当时从预设里抄下来的快照， 即使后来预设被改动或删掉了，这里显示的仍是学生当时看到的原文。 `,-1)])):t(``,!0),e(`div`,Ne,[e(`section`,Pe,[e(`h3`,Fe,[o[6]||=y(` 打印要求 `,-1),!E.value.file_exists&&!N.value?(d(),c(n(xe),{key:0,size:13})):t(``,!0)]),e(`dl`,Ie,[(d(!0),s(a,null,v(P.value,t=>(d(),s(`div`,{key:t.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[e(`dt`,Le,h(t.label),1),e(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:t.value??``},h(t.value??`—`),9,Re)]))),128))]),o[7]||=e(`p`,{class:`mt-2 text-xs text-ink-4`},`备注`,-1),E.value.remark?(d(),s(`p`,ze,h(E.value.remark),1)):(d(),s(`p`,Be,`学生没有填写备注`))]),e(`div`,Ve,[e(`section`,He,[o[8]||=e(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),e(`dl`,Ue,[(d(!0),s(a,null,v(F.value,t=>(d(),s(`div`,{key:t.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[e(`dt`,We,h(t.label),1),e(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:t.value??``},h(t.value??`—`),9,Ge)]))),128))])]),e(`section`,Ke,[o[9]||=e(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),e(`dl`,qe,[(d(!0),s(a,null,v(I.value,t=>(d(),s(`div`,{key:t.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[e(`dt`,Je,h(t.label),1),e(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:t.value??``},h(t.value??`—`),9,$)]))),128))]),M.value?(d(),c(n(R),{key:0,size:`small`,block:``,class:`mt-3`,loading:k.value,onClick:z},{icon:x(()=>[r(n(ne),{size:14})]),default:x(()=>[y(` 下载文件（`+h(n(K)(E.value.file_size))+`） `,1)]),_:1},8,[`loading`])):E.value.claimed_by===null?(d(),s(`p`,Ye,` 接单后才能下载文件。 `)):t(``,!0)])])]),e(`section`,Xe,[e(`h3`,Ze,[o[10]||=y(` 操作记录 `,-1),e(`span`,Qe,h(D.value.length)+` 条`,1)]),D.value.length?(d(),c(n(ve),{key:0},{default:x(()=>[(d(!0),s(a,null,v(D.value,r=>(d(),c(n(ye),{key:r.id,time:n(q)(r.create_time),color:n(se)[r.action]},{default:x(()=>[e(`div`,$e,[e(`span`,et,h(r.action_label),1),e(`span`,tt,h(r.actor_nickname??`（账号已注销）`),1),r.actor_role?(d(),c(de,{key:0,role:r.actor_role},null,8,[`role`])):t(``,!0)]),r.detail?(d(),s(`p`,nt,h(r.detail),1)):t(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(d(),s(`p`,rt,` 这一单还没有操作记录。留痕功能是后加的，升级之前发生的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如明确告诉你这里没有。 `))]),e(`p`,it,`最后更新 `+h(n(ue)(E.value.update_time)),1)],64)):(d(),s(`div`,we,[r(n(ee),{description:T.value===null?`订单号不对，检查一下地址栏`:`没有这个订单`},null,8,[`description`])]))]))}});export{at as default};