import{C as e,D as t,E as n,Et as r,Ht as i,K as a,M as o,N as s,R as c,T as l,Vt as u,X as d,Y as f,Z as p,ct as m,j as h,p as g,u as _,v,vt as y,w as b}from"./endpoints-Dbyqu7A9.js";import{$t as x,A as S,Jt as C,N as w,S as T,Xt as E,Zt as D,_t as O,b as k,k as A,lt as j,mt as M,ot as N,qt as P,t as F,yt as I}from"./Button-BxGCouy9.js";import{t as ee}from"./Empty-D5tr-m-D.js";import{t as L}from"./format-length-BwSo_EUP.js";import{t as R}from"./Alert-Ck9ADUON.js";import{n as z,t as B}from"./Skeleton-DS3ccdy_.js";import{g as V,h as H}from"./useApi-BPuI6ZR9-BbLH-RU-.js";import{d as te,t as ne,v as re}from"./index--aUAD0wK.js";import{t as U}from"./createLucideIcon-BJWlPtaT.js";import{t as ie}from"./download-BUk9jMTy.js";import{t as W}from"./refresh-cw-Dp5G79qe.js";import{_ as G,d as K,f as q,g as J,h as Y,n as ae,p as oe,r as se,t as ce,u as le,v as X,y as ue}from"./format-D6sHWZqo.js";import{t as de}from"./RoleTag-DNUITjEn.js";import{t as fe}from"./PageHeader-Dt_NSc20.js";import{t as pe}from"./StatusTag-KPpEXNj2.js";function me(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...te,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var he={name:`Timeline`,common:w,self:me},Z=1.25,ge=C(`timeline`,`
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
 `)])])]),_e={...A.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=O(`n-timeline`),ve=s({name:`Timeline`,props:_e,setup(e,{slots:n}){let{mergedClsPrefixRef:r}=M(e),i=A(`Timeline`,`-timeline`,ge,he,e,r);return d(Q,{props:e,mergedThemeRef:i,mergedClsPrefixRef:r}),()=>{let{value:i}=r;return f(),t(`div`,{class:N([`${i}-timeline`,e.horizontal&&`${i}-timeline--horizontal`,`${i}-timeline--${e.size}-size`,!e.horizontal&&`${i}-timeline--${e.itemPlacement}-placement`])},[j(()=>n.default?.())],2)}}}),ye=s({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(t){let n=c(Q);n||I(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),z();let{inlineThemeDisabled:r}=M(),i=e(()=>{let{props:{size:e,iconSize:r},mergedThemeRef:i}=n,{type:a}=t,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[x(`iconSize`,e)]:f,[x(`titleMargin`,e)]:p,[x(`titleFontSize`,e)]:m,[x(`circleBorder`,a)]:h,[x(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":L(r)||f}}),a=r?S(`timeline-item`,e(()=>{let{props:{size:e,iconSize:r}}=n,{type:i}=t;return`${e[0]}${r||`a`}${i[0]}`}),i,n.props):void 0;return{mergedClsPrefix:n.mergedClsPrefixRef,cssVars:r?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e,color:n,onRender:r,$slots:i}=this;return r?.(),f(),t(`div`,{class:N([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:u(this.cssVars)},[b(`div`,{class:N(`${e}-timeline-item-timeline`)},[b(`div`,{class:N(`${e}-timeline-item-timeline__line`)},null,2),j(()=>T(i.icon,r=>r?(f(),t(`div`,{key:1,class:N(`${e}-timeline-item-timeline__icon`),style:u({color:n})},[j(()=>r)],6)):(f(),t(`div`,{key:2,class:N(`${e}-timeline-item-timeline__circle`),style:u({borderColor:n})},null,6))))],2),b(`div`,{class:N(`${e}-timeline-item-content`)},[j(()=>T(i.header,n=>n||this.title?(f(),t(`div`,{key:3,class:N(`${e}-timeline-item-content__title`)},[j(()=>n||this.title)],2)):null)),b(`div`,{class:N(`${e}-timeline-item-content__content`)},[j(()=>k(i.default,()=>[this.content]))],2),b(`div`,{class:N(`${e}-timeline-item-content__meta`)},[j(()=>k(i.footer,()=>[this.time]))],2)],2)],6)}}),be=U({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),xe=U({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Se={class:`mx-auto max-w-[1000px]`},Ce={key:0,class:`flex flex-col gap-3`},we={key:1,class:`panel grid place-items-center py-16`},Te={class:`panel mb-3 p-4`},Ee={class:`flex flex-wrap items-start justify-between gap-3`},De={class:`min-w-0`},Oe=[`title`],ke={class:`tech-label mt-1 text-ink-4`},Ae={class:`flex shrink-0 flex-wrap items-center gap-2`},je={key:0,class:`panel mb-3 p-4`},Me={class:`whitespace-pre-wrap break-words text-[13px] leading-6`},Ne={class:`mb-3 grid gap-3 sm:grid-cols-2`},Pe={class:`panel p-4`},Fe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3`},Ie={class:`divide-y`,style:{"border-color":`var(--border)`}},Le={class:`shrink-0 text-[12px] text-ink-4`},Re=[`title`],ze={key:0,class:`mt-1 whitespace-pre-wrap break-words rounded-md p-2 text-[13px] leading-6`,style:{background:`var(--accent-tint-soft)`}},Be={key:1,class:`mt-1 text-[13px] text-ink-4`},Ve={class:`flex flex-col gap-3`},He={class:`panel p-4`},Ue={class:`divide-y`,style:{"border-color":`var(--border)`}},We={class:`shrink-0 text-[12px] text-ink-4`},Ge=[`title`],Ke={class:`panel p-4`},qe={class:`divide-y`,style:{"border-color":`var(--border)`}},Je={class:`shrink-0 text-[12px] text-ink-4`},$=[`title`],Ye={key:1,class:`mt-3 text-[11px] text-ink-4`},Xe={class:`panel p-4`},Ze={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3`},Qe={class:`text-ink-4`},$e={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},et={class:`text-[13px] font-semibold`},tt={class:`text-[12px] text-ink-3`},nt={key:0,class:`mt-0.5 break-words text-[12px] leading-5 text-ink-3`},rt={key:1,class:`text-[12px] leading-6 text-ink-4`},it={class:`tech-label mt-3 text-ink-4`},at=s({__name:`OrderDetailView`,setup(s){let c=H(),d=V(),x=ne(),S=re(),C=e(()=>{let e=Array.isArray(c.params.id)?c.params.id[0]:c.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),w=y(null),T=y([]),E=y(!1),D=y(!1),O=e(()=>x.user?.id??0),k=e(()=>x.advancedAllowed),A=e(()=>{let e=w.value;return!e||e.claimed_by===null||!e.filename?!1:k.value||e.claimed_by===O.value}),j=e(()=>!!w.value&&oe(w.value)),M=e(()=>{let e=w.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?ce[e.color_type]:`黑白`} / ${e.duplex?ae[e.duplex]:`单面`}`},{label:`份数`,value:le(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t}),N=e(()=>{let e=w.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),P=e(()=>{let e=w.value;return e?[{label:`取件码`,value:G(e.pickup_code)},{label:`金额`,value:X(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?q(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?q(e.price_time):null},{label:`提交时间`,value:q(e.create_time)},{label:`最后更新`,value:q(e.update_time)}]:[]});async function I(){if(C.value!==null){E.value=!0;try{let e=await _.detail(C.value);w.value=e.order,T.value=e.logs}catch(e){S.error(e instanceof g?e.message:`加载订单详情失败`)}finally{E.value=!1}}}async function L(){let e=w.value;if(e){D.value=!0;try{await _.download(e.id,Y(e),e.file_size??void 0),await I()}catch(e){S.error(e instanceof g?e.message:`下载失败`)}finally{D.value=!1}}}function z(){d.push(`/staff/orders`)}return a(I),(e,a)=>(f(),t(`div`,Se,[o(fe,{title:w.value?`订单 #${w.value.id}`:`订单详情`,subtitle:`完整的订单信息与操作记录`},{actions:m(()=>[o(r(F),{size:`small`,quaternary:``,onClick:z},{icon:m(()=>[o(r(be),{size:15})]),default:m(()=>[a[1]||=h(` 返回订单台 `,-1)]),_:1}),o(r(F),{size:`small`,quaternary:``,loading:E.value,onClick:a[0]||=e=>I()},{icon:m(()=>[o(r(W),{size:15})]),default:m(()=>[a[2]||=h(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),E.value&&!w.value?(f(),t(`div`,Ce,[o(r(B),{height:`96px`,sharp:!1}),o(r(B),{height:`180px`,sharp:!1}),o(r(B),{height:`240px`,sharp:!1})])):w.value?(f(),t(v,{key:2},[b(`div`,Te,[b(`div`,Ee,[b(`div`,De,[b(`h2`,{class:`truncate text-[17px] font-bold`,title:w.value.preset_content??w.value.filename},i(r(Y)(w.value)),9,Oe),b(`p`,ke,` 提交于 `+i(r(q)(w.value.create_time)),1)]),b(`div`,Ae,[o(pe,{status:w.value.status},null,8,[`status`]),b(`span`,{class:`tnum font-heading text-[18px] font-bold`,style:u({color:w.value.price===null||w.value.price===void 0?`var(--text-quaternary)`:`var(--primary)`})},i(r(X)(w.value.price)),5)])]),!w.value.file_exists&&!j.value?(f(),l(r(R),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:m(()=>[...a[3]||=[h(` 订单记录还在，但落盘的文件已经不在上传目录里。请先确认是不是被人手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):n(``,!0)]),j.value?(f(),t(`section`,je,[a[4]||=b(`h3`,{class:`tech-label mb-1 text-ink-3`},`预设打印服务`,-1),b(`p`,Me,i(w.value.preset_content),1),a[5]||=b(`p`,{class:`mt-2 text-[11px] text-ink-4`},` 这一单没有上传文件。上面这段话是下单当时从预设里抄下来的快照， 即使后来预设被改动或删掉了，这里显示的仍是学生当时看到的原文。 `,-1)])):n(``,!0),b(`div`,Ne,[b(`section`,Pe,[b(`h3`,Fe,[a[6]||=h(` 打印要求 `,-1),!w.value.file_exists&&!j.value?(f(),l(r(xe),{key:0,size:13})):n(``,!0)]),b(`dl`,Ie,[(f(!0),t(v,null,p(M.value,e=>(f(),t(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[b(`dt`,Le,i(e.label),1),b(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},i(e.value??`—`),9,Re)]))),128))]),a[7]||=b(`p`,{class:`mt-2 text-[11px] text-ink-4`},`备注`,-1),w.value.remark?(f(),t(`p`,ze,i(w.value.remark),1)):(f(),t(`p`,Be,`学生没有填写备注`))]),b(`div`,Ve,[b(`section`,He,[a[8]||=b(`h3`,{class:`tech-label mb-1 text-ink-3`},`下单人`,-1),b(`dl`,Ue,[(f(!0),t(v,null,p(N.value,e=>(f(),t(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[b(`dt`,We,i(e.label),1),b(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},i(e.value??`—`),9,Ge)]))),128))])]),b(`section`,Ke,[a[9]||=b(`h3`,{class:`tech-label mb-1 text-ink-3`},`流程信息`,-1),b(`dl`,qe,[(f(!0),t(v,null,p(P.value,e=>(f(),t(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[b(`dt`,Je,i(e.label),1),b(`dd`,{class:`tnum min-w-0 truncate text-right text-[13px]`,title:e.value??``},i(e.value??`—`),9,$)]))),128))]),A.value?(f(),l(r(F),{key:0,size:`small`,block:``,class:`mt-3`,loading:D.value,onClick:L},{icon:m(()=>[o(r(ie),{size:14})]),default:m(()=>[h(` 下载文件（`+i(r(K)(w.value.file_size))+`） `,1)]),_:1},8,[`loading`])):w.value.claimed_by===null?(f(),t(`p`,Ye,` 接单后才能下载文件。 `)):n(``,!0)])])]),b(`section`,Xe,[b(`h3`,Ze,[a[10]||=h(` 操作记录 `,-1),b(`span`,Qe,i(T.value.length)+` 条`,1)]),T.value.length?(f(),l(r(ve),{key:0},{default:m(()=>[(f(!0),t(v,null,p(T.value,e=>(f(),l(r(ye),{key:e.id,time:r(q)(e.create_time),color:r(se)[e.action]},{default:m(()=>[b(`div`,$e,[b(`span`,et,i(e.action_label),1),b(`span`,tt,i(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(f(),l(de,{key:0,role:e.actor_role},null,8,[`role`])):n(``,!0)]),e.detail?(f(),t(`p`,nt,i(e.detail),1)):n(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(f(),t(`p`,rt,` 这一单还没有操作记录。留痕功能是后加的，升级之前发生的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如明确告诉你这里没有。 `))]),b(`p`,it,`最后更新 `+i(r(ue)(w.value.update_time)),1)],64)):(f(),t(`div`,we,[o(r(ee),{description:C.value===null?`订单号不对，检查一下地址栏`:`没有这个订单`},null,8,[`description`])]))]))}});export{at as default};