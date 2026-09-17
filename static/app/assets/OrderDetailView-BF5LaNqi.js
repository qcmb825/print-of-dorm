import{$n as e,An as t,At as n,Dr as r,Dt as i,F as a,Fn as o,H as s,In as c,Jn as l,K as u,Ln as d,Mn as f,Mt as p,N as m,On as h,Or as g,Qn as _,St as v,Tr as y,U as b,Vn as x,Zn as S,_r as C,f as w,fn as T,jn as E,kn as D,l as O,ln as k,m as A,on as j,sn as M,sr as N,un as P,wn as F,yt as I}from"./endpoints-DxQPCLqF.js";import{t as ee}from"./Empty-BKQAa2mi.js";import{t as L}from"./format-length-BwSo_EUP.js";import{t as R}from"./Alert-dI_dhZVK.js";import{n as z,t as B}from"./Skeleton-pXXeyKgz.js";import{b as V,d as H,p as te,t as ne,u as re}from"./index-Dp3yRsNZ.js";import{t as U}from"./createLucideIcon-BiySHSEV.js";import{t as ie}from"./download-CE1xP1HH.js";import{t as W}from"./refresh-cw-AMnQKCLK.js";import{_ as G,d as K,f as q,g as J,h as Y,n as ae,p as oe,r as se,t as ce,u as le,v as X,y as ue}from"./format-DZdu6wMQ.js";import{t as de}from"./RoleTag-BfSBXAtn.js";import{t as fe}from"./PageHeader-BqO1i9AW.js";import{t as pe}from"./StatusTag-CiW37OJV.js";function me(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...te,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var he={name:`Timeline`,common:u,self:me},Z=1.25,ge=M(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[P(`horizontal`,`
 flex-direction: row;
 `,[j(`>`,[M(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[P(`dashed-line-type`,[j(`>`,[M(`timeline-item-timeline`,[k(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),j(`>`,[M(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[j(`>`,[k(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),M(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[k(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),P(`right-placement`,[M(`timeline-item`,[M(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),M(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),P(`left-placement`,[M(`timeline-item`,[M(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),M(`timeline-item-timeline`,`
 left: 0;
 `)])]),M(`timeline-item`,`
 position: relative;
 `,[j(`&:last-child`,[M(`timeline-item-timeline`,[k(`line`,`
 display: none;
 `)]),M(`timeline-item-content`,[k(`meta`,`
 margin-bottom: 0;
 `)])]),M(`timeline-item-content`,[k(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),k(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),k(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),P(`dashed-line-type`,[M(`timeline-item-timeline`,[k(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),M(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[k(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),k(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),k(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),_e={...s.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=n(`n-timeline`),ve=d({name:`Timeline`,props:_e,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=i(e),r=s(`Timeline`,`-timeline`,ge,he,e,n);return _(Q,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return S(),f(`div`,{class:I([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[v(()=>t.default?.())],2)}}}),ye=d({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=x(Q);t||p(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),z();let{inlineThemeDisabled:n}=i(),r=h(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[T(`iconSize`,n)]:f,[T(`titleMargin`,n)]:p,[T(`titleFontSize`,n)]:m,[T(`circleBorder`,a)]:h,[T(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":L(r)||f}}),a=n?b(`timeline-item`,h(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),r,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:r,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:i}=this;return n?.(),S(),f(`div`,{class:I([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:r(this.cssVars)},[D(`div`,{class:I(`${e}-timeline-item-timeline`)},[D(`div`,{class:I(`${e}-timeline-item-timeline__line`)},null,2),v(()=>a(i.icon,n=>n?(S(),f(`div`,{key:1,class:I(`${e}-timeline-item-timeline__icon`),style:r({color:t})},[v(()=>n)],6)):(S(),f(`div`,{key:2,class:I(`${e}-timeline-item-timeline__circle`),style:r({borderColor:t})},null,6))))],2),D(`div`,{class:I(`${e}-timeline-item-content`)},[v(()=>a(i.header,t=>t||this.title?(S(),f(`div`,{key:3,class:I(`${e}-timeline-item-content__title`)},[v(()=>t||this.title)],2)):null)),D(`div`,{class:I(`${e}-timeline-item-content__content`)},[v(()=>m(i.default,()=>[this.content]))],2),D(`div`,{class:I(`${e}-timeline-item-content__meta`)},[v(()=>m(i.footer,()=>[this.time]))],2)],2)],6)}}),be=U({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),xe=U({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Se={class:`mx-auto max-w-[1000px]`},Ce={key:0,class:`flex flex-col gap-3`},we={key:1,class:`panel grid place-items-center py-16`},Te={class:`panel mb-3 p-4`},Ee={class:`flex flex-wrap items-start justify-between gap-3`},De={class:`min-w-0`},Oe=[`title`],ke={class:`tech-label mt-1 text-ink-4`},Ae={class:`flex shrink-0 flex-wrap items-center gap-2`},je={key:0,class:`panel mb-3 p-4`},Me={class:`whitespace-pre-wrap break-words text-[13px] leading-6`},Ne={class:`mb-3 grid gap-3 sm:grid-cols-2`},Pe={class:`panel p-4`},Fe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3`},Ie={class:`divide-y`,style:{"border-color":`var(--border)`}},Le={class:`shrink-0 text-[12px] text-ink-4`},Re=[`title`],ze={key:0,class:`mt-1 whitespace-pre-wrap break-words rounded-md p-2 text-[13px] leading-6`,style:{background:`var(--accent-tint-soft)`}},Be={key:1,class:`mt-1 text-[13px] text-ink-4`},Ve={class:`flex flex-col gap-3`},He={class:`panel p-4`},Ue={class:`divide-y`,style:{"border-color":`var(--border)`}},We={class:`shrink-0 text-[12px] text-ink-4`},Ge=[`title`],Ke={class:`panel p-4`},qe={class:`divide-y`,style:{"border-color":`var(--border)`}},Je={class:`shrink-0 text-[12px] text-ink-4`},$=[`title`],Ye={key:1,class:`mt-3 text-[11px] text-ink-4`},Xe={class:`panel p-4`},Ze={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3`},Qe={class:`text-ink-4`},$e={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},et={class:`text-[13px] font-semibold`},tt={class:`text-[12px] text-ink-3`},nt={key:0,class:`mt-0.5 break-words text-[12px] leading-5 text-ink-3`},rt={key:1,class:`text-[12px] leading-6 text-ink-4`},it={class:`tech-label mt-3 text-ink-4`},at=d({__name:`OrderDetailView`,setup(n){let i=re(),a=H(),s=ne(),u=V(),d=h(()=>{let e=Array.isArray(i.params.id)?i.params.id[0]:i.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),p=C(null),m=C([]),_=C(!1),v=C(!1),b=h(()=>s.user?.id??0),x=h(()=>s.advancedAllowed),T=h(()=>{let e=p.value;return!e||e.claimed_by===null||!e.filename?!1:x.value||e.claimed_by===b.value}),k=h(()=>!!p.value&&oe(p.value)),j=h(()=>{let e=p.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?ce[e.color_type]:`黑白`} / ${e.duplex?ae[e.duplex]:`单面`}`},{label:`份数`,value:le(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t}),M=h(()=>{let e=p.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),P=h(()=>{let e=p.value;return e?[{label:`取件码`,value:G(e.pickup_code)},{label:`金额`,value:X(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?q(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?q(e.price_time):null},{label:`提交时间`,value:q(e.create_time)},{label:`最后更新`,value:q(e.update_time)}]:[]});async function I(){if(d.value!==null){_.value=!0;try{let e=await O.detail(d.value);p.value=e.order,m.value=e.logs}catch(e){u.error(e instanceof w?e.message:`加载订单详情失败`)}finally{_.value=!1}}}async function L(){let e=p.value;if(e){v.value=!0;try{await O.download(e.id,Y(e)),await I()}catch(e){u.error(e instanceof w?e.message:`下载失败`)}finally{v.value=!1}}}function z(){a.push(`/staff/orders`)}return l(I),(n,i)=>(S(),f(`div`,Se,[c(fe,{title:p.value?`订单 #${p.value.id}`:`订单详情`,subtitle:`完整的订单信息与操作记录`},{actions:N(()=>[c(y(A),{size:`small`,quaternary:``,onClick:z},{icon:N(()=>[c(y(be),{size:15})]),default:N(()=>[i[1]||=o(` 返回订单台 `,-1)]),_:1}),c(y(A),{size:`small`,quaternary:``,loading:_.value,onClick:i[0]||=e=>I()},{icon:N(()=>[c(y(W),{size:15})]),default:N(()=>[i[2]||=o(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),_.value&&!p.value?(S(),f(`div`,Ce,[c(y(B),{height:`96px`,sharp:!1}),c(y(B),{height:`180px`,sharp:!1}),c(y(B),{height:`240px`,sharp:!1})])):p.value?(S(),f(F,{key:2},[D(`div`,Te,[D(`div`,Ee,[D(`div`,De,[D(`h2`,{class:`truncate text-[17px] font-bold`,title:p.value.preset_content??p.value.filename},g(y(Y)(p.value)),9,Oe),D(`p`,ke,` 提交于 `+g(y(q)(p.value.create_time)),1)]),D(`div`,Ae,[c(pe,{status:p.value.status},null,8,[`status`]),D(`span`,{class:`tnum font-heading text-[18px] font-bold`,style:r({color:p.value.price===null||p.value.price===void 0?`var(--text-quaternary)`:`var(--primary)`})},g(y(X)(p.value.price)),5)])]),!p.value.file_exists&&!k.value?(S(),t(y(R),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:N(()=>[...i[3]||=[o(` 订单记录还在，但落盘的文件已经不在上传目录里。请先确认是不是被人手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):E(``,!0)]),k.value?(S(),f(`section`,je,[i[4]||=D(`h3`,{class:`tech-label mb-1 text-ink-3`},`预设打印服务`,-1),D(`p`,Me,g(p.value.preset_content),1),i[5]||=D(`p`,{class:`mt-2 text-[11px] text-ink-4`},` 这一单没有上传文件。上面这段话是下单当时从预设里抄下来的快照， 即使后来预设被改动或删掉了，这里显示的仍是学生当时看到的原文。 `,-1)])):E(``,!0),D(`div`,Ne,[D(`section`,Pe,[D(`h3`,Fe,[i[6]||=o(` 打印要求 `,-1),!p.value.file_exists&&!k.value?(S(),t(y(xe),{key:0,size:13})):E(``,!0)]),D(`dl`,Ie,[(S(!0),f(F,null,e(j.value,e=>(S(),f(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[D(`dt`,Le,g(e.label),1),D(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},g(e.value??`—`),9,Re)]))),128))]),i[7]||=D(`p`,{class:`mt-2 text-[11px] text-ink-4`},`备注`,-1),p.value.remark?(S(),f(`p`,ze,g(p.value.remark),1)):(S(),f(`p`,Be,`学生没有填写备注`))]),D(`div`,Ve,[D(`section`,He,[i[8]||=D(`h3`,{class:`tech-label mb-1 text-ink-3`},`下单人`,-1),D(`dl`,Ue,[(S(!0),f(F,null,e(M.value,e=>(S(),f(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[D(`dt`,We,g(e.label),1),D(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},g(e.value??`—`),9,Ge)]))),128))])]),D(`section`,Ke,[i[9]||=D(`h3`,{class:`tech-label mb-1 text-ink-3`},`流程信息`,-1),D(`dl`,qe,[(S(!0),f(F,null,e(P.value,e=>(S(),f(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[D(`dt`,Je,g(e.label),1),D(`dd`,{class:`tnum min-w-0 truncate text-right text-[13px]`,title:e.value??``},g(e.value??`—`),9,$)]))),128))]),T.value?(S(),t(y(A),{key:0,size:`small`,block:``,class:`mt-3`,loading:v.value,onClick:L},{icon:N(()=>[c(y(ie),{size:14})]),default:N(()=>[o(` 下载文件（`+g(y(K)(p.value.file_size))+`） `,1)]),_:1},8,[`loading`])):p.value.claimed_by===null?(S(),f(`p`,Ye,` 接单后才能下载文件。 `)):E(``,!0)])])]),D(`section`,Xe,[D(`h3`,Ze,[i[10]||=o(` 操作记录 `,-1),D(`span`,Qe,g(m.value.length)+` 条`,1)]),m.value.length?(S(),t(y(ve),{key:0},{default:N(()=>[(S(!0),f(F,null,e(m.value,e=>(S(),t(y(ye),{key:e.id,time:y(q)(e.create_time),color:y(se)[e.action]},{default:N(()=>[D(`div`,$e,[D(`span`,et,g(e.action_label),1),D(`span`,tt,g(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(S(),t(de,{key:0,role:e.actor_role},null,8,[`role`])):E(``,!0)]),e.detail?(S(),f(`p`,nt,g(e.detail),1)):E(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(S(),f(`p`,rt,` 这一单还没有操作记录。留痕功能是后加的，升级之前发生的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如明确告诉你这里没有。 `))]),D(`p`,it,`最后更新 `+g(y(ue)(p.value.update_time)),1)],64)):(S(),f(`div`,we,[c(y(ee),{description:d.value===null?`订单号不对，检查一下地址栏`:`没有这个订单`},null,8,[`description`])]))]))}});export{at as default};