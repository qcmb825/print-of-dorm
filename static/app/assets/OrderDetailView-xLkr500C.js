import{An as e,At as t,Bn as n,Dr as r,Dt as i,Er as a,F as o,Fn as s,H as c,In as l,K as u,Mn as d,Mt as f,N as p,On as m,Pn as h,Qn as g,St as _,U as v,Xn as y,Zn as b,f as x,fn as S,gr as C,jn as w,kn as T,l as E,ln as D,m as O,on as k,or as A,qn as ee,sn as j,un as M,wn as N,wr as P,yt as F}from"./endpoints-D7YssODM.js";import{t as te}from"./Empty-CXl0uUVS.js";import{t as I}from"./format-length-BwSo_EUP.js";import{t as L}from"./Alert-CcYBSMtE.js";import{n as R,t as z}from"./Skeleton-DZAkXxbB.js";import{b as B,d as ne,p as re,t as ie,u as ae}from"./index-CTz7zfxj.js";import{t as V}from"./createLucideIcon-CKtBO55A.js";import{t as H}from"./download-CHEa82yh.js";import{t as U}from"./refresh-cw-CKdIHv9q.js";import{_ as W,d as G,f as K,g as q,h as J,l as oe,m as Y,n as se,r as ce,t as le,u as X,v as ue}from"./format-D-wfinI7.js";import{t as de}from"./RoleTag-DcamrybY.js";import{t as fe}from"./PageHeader-BRpP6_C5.js";import{t as pe}from"./StatusTag-Z1OsBz2a.js";function me(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...re,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var he={name:`Timeline`,common:u,self:me},Z=1.25,ge=j(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[M(`horizontal`,`
 flex-direction: row;
 `,[k(`>`,[j(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[M(`dashed-line-type`,[k(`>`,[j(`timeline-item-timeline`,[D(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),k(`>`,[j(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[k(`>`,[D(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),j(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[D(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),M(`right-placement`,[j(`timeline-item`,[j(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),j(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),M(`left-placement`,[j(`timeline-item`,[j(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),j(`timeline-item-timeline`,`
 left: 0;
 `)])]),j(`timeline-item`,`
 position: relative;
 `,[k(`&:last-child`,[j(`timeline-item-timeline`,[D(`line`,`
 display: none;
 `)]),j(`timeline-item-content`,[D(`meta`,`
 margin-bottom: 0;
 `)])]),j(`timeline-item-content`,[D(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),D(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),D(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),M(`dashed-line-type`,[j(`timeline-item-timeline`,[D(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),j(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[D(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),D(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),D(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),_e={...c.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=t(`n-timeline`),ve=l({name:`Timeline`,props:_e,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=i(e),r=c(`Timeline`,`-timeline`,ge,he,e,n);return b(Q,{props:e,mergedThemeRef:r,mergedClsPrefixRef:n}),()=>{let{value:r}=n;return y(),d(`div`,{class:F([`${r}-timeline`,e.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${e.size}-size`,!e.horizontal&&`${r}-timeline--${e.itemPlacement}-placement`])},[_(()=>t.default?.())],2)}}}),ye=l({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=n(Q);t||f(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),R();let{inlineThemeDisabled:r}=i(),a=m(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[S(`iconSize`,n)]:f,[S(`titleMargin`,n)]:p,[S(`titleFontSize`,n)]:m,[S(`circleBorder`,a)]:h,[S(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":I(r)||f}}),o=r?v(`timeline-item`,m(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),a,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:r}=this;return n?.(),y(),d(`div`,{class:F([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:a(this.cssVars)},[T(`div`,{class:F(`${e}-timeline-item-timeline`)},[T(`div`,{class:F(`${e}-timeline-item-timeline__line`)},null,2),_(()=>o(r.icon,n=>n?(y(),d(`div`,{key:1,class:F(`${e}-timeline-item-timeline__icon`),style:a({color:t})},[_(()=>n)],6)):(y(),d(`div`,{key:2,class:F(`${e}-timeline-item-timeline__circle`),style:a({borderColor:t})},null,6))))],2),T(`div`,{class:F(`${e}-timeline-item-content`)},[_(()=>o(r.header,t=>t||this.title?(y(),d(`div`,{key:3,class:F(`${e}-timeline-item-content__title`)},[_(()=>t||this.title)],2)):null)),T(`div`,{class:F(`${e}-timeline-item-content__content`)},[_(()=>p(r.default,()=>[this.content]))],2),T(`div`,{class:F(`${e}-timeline-item-content__meta`)},[_(()=>p(r.footer,()=>[this.time]))],2)],2)],6)}}),be=V({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),xe=V({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),$={class:`mx-auto max-w-[1000px]`},Se={key:0,class:`flex flex-col gap-3`},Ce={key:1,class:`panel grid place-items-center py-16`},we={class:`panel mb-3 p-4`},Te={class:`flex flex-wrap items-start justify-between gap-3`},Ee={class:`min-w-0`},De=[`title`],Oe={class:`tech-label mt-1 text-ink-4`},ke={class:`flex shrink-0 flex-wrap items-center gap-2`},Ae={key:0,class:`panel mb-3 p-4`},je={class:`whitespace-pre-wrap break-words text-[13px] leading-6`},Me={class:`mb-3 grid gap-3 sm:grid-cols-2`},Ne={class:`panel p-4`},Pe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3`},Fe={class:`divide-y`,style:{"border-color":`var(--border)`}},Ie={class:`shrink-0 text-[12px] text-ink-4`},Le=[`title`],Re={key:0,class:`mt-1 whitespace-pre-wrap break-words rounded-md p-2 text-[13px] leading-6`,style:{background:`var(--accent-tint-soft)`}},ze={key:1,class:`mt-1 text-[13px] text-ink-4`},Be={class:`flex flex-col gap-3`},Ve={class:`panel p-4`},He={class:`divide-y`,style:{"border-color":`var(--border)`}},Ue={class:`shrink-0 text-[12px] text-ink-4`},We=[`title`],Ge={class:`panel p-4`},Ke={class:`divide-y`,style:{"border-color":`var(--border)`}},qe={class:`shrink-0 text-[12px] text-ink-4`},Je=[`title`],Ye={key:1,class:`mt-3 text-[11px] text-ink-4`},Xe={class:`panel p-4`},Ze={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3`},Qe={class:`text-ink-4`},$e={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},et={class:`text-[13px] font-semibold`},tt={class:`text-[12px] text-ink-3`},nt={key:0,class:`mt-0.5 break-words text-[12px] leading-5 text-ink-3`},rt={key:1,class:`text-[12px] leading-6 text-ink-4`},it={class:`tech-label mt-3 text-ink-4`},at=l({__name:`OrderDetailView`,setup(t){let n=ae(),i=ne(),o=ie(),c=B(),l=m(()=>{let e=Array.isArray(n.params.id)?n.params.id[0]:n.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),u=C(null),f=C([]),p=C(!1),_=C(!1),v=m(()=>o.user?.id??0),b=m(()=>o.advancedAllowed),S=m(()=>{let e=u.value;return!e||e.claimed_by===null||!e.filename?!1:b.value||e.claimed_by===v.value}),D=m(()=>!!u.value&&K(u.value)),k=m(()=>{let e=u.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?le[e.color_type]:`黑白`} / ${e.duplex?se[e.duplex]:`单面`}`},{label:`份数`,value:oe(e.copies)},{label:`纸张`,value:J(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:X(e.file_size)})),t}),j=m(()=>{let e=u.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),M=m(()=>{let e=u.value;return e?[{label:`取件码`,value:q(e.pickup_code)},{label:`金额`,value:W(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?G(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?G(e.price_time):null},{label:`提交时间`,value:G(e.create_time)},{label:`最后更新`,value:G(e.update_time)}]:[]});async function F(){if(l.value!==null){p.value=!0;try{let e=await E.detail(l.value);u.value=e.order,f.value=e.logs}catch(e){c.error(e instanceof x?e.message:`加载订单详情失败`)}finally{p.value=!1}}}async function I(){let e=u.value;if(e){_.value=!0;try{await E.download(e.id,Y(e)),await F()}catch(e){c.error(e instanceof x?e.message:`下载失败`)}finally{_.value=!1}}}function R(){i.push(`/staff/orders`)}return ee(F),(t,n)=>(y(),d(`div`,$,[s(fe,{title:u.value?`订单 #${u.value.id}`:`订单详情`,subtitle:`完整的订单信息与操作记录`},{actions:A(()=>[s(P(O),{size:`small`,quaternary:``,onClick:R},{icon:A(()=>[s(P(be),{size:15})]),default:A(()=>[n[1]||=h(` 返回订单台 `,-1)]),_:1}),s(P(O),{size:`small`,quaternary:``,loading:p.value,onClick:n[0]||=e=>F()},{icon:A(()=>[s(P(U),{size:15})]),default:A(()=>[n[2]||=h(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),p.value&&!u.value?(y(),d(`div`,Se,[s(P(z),{height:`96px`,sharp:!1}),s(P(z),{height:`180px`,sharp:!1}),s(P(z),{height:`240px`,sharp:!1})])):u.value?(y(),d(N,{key:2},[T(`div`,we,[T(`div`,Te,[T(`div`,Ee,[T(`h2`,{class:`truncate text-[17px] font-bold`,title:u.value.preset_content??u.value.filename},r(P(Y)(u.value)),9,De),T(`p`,Oe,` 提交于 `+r(P(G)(u.value.create_time)),1)]),T(`div`,ke,[s(pe,{status:u.value.status},null,8,[`status`]),T(`span`,{class:`tnum font-heading text-[18px] font-bold`,style:a({color:u.value.price===null||u.value.price===void 0?`var(--text-quaternary)`:`var(--primary)`})},r(P(W)(u.value.price)),5)])]),!u.value.file_exists&&!D.value?(y(),e(P(L),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:A(()=>[...n[3]||=[h(` 订单记录还在，但落盘的文件已经不在上传目录里。请先确认是不是被人手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):w(``,!0)]),D.value?(y(),d(`section`,Ae,[n[4]||=T(`h3`,{class:`tech-label mb-1 text-ink-3`},`预设打印服务`,-1),T(`p`,je,r(u.value.preset_content),1),n[5]||=T(`p`,{class:`mt-2 text-[11px] text-ink-4`},` 这一单没有上传文件。上面这段话是下单当时从预设里抄下来的快照， 即使后来预设被改动或删掉了，这里显示的仍是学生当时看到的原文。 `,-1)])):w(``,!0),T(`div`,Me,[T(`section`,Ne,[T(`h3`,Pe,[n[6]||=h(` 打印要求 `,-1),!u.value.file_exists&&!D.value?(y(),e(P(xe),{key:0,size:13})):w(``,!0)]),T(`dl`,Fe,[(y(!0),d(N,null,g(k.value,e=>(y(),d(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[T(`dt`,Ie,r(e.label),1),T(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},r(e.value??`—`),9,Le)]))),128))]),n[7]||=T(`p`,{class:`mt-2 text-[11px] text-ink-4`},`备注`,-1),u.value.remark?(y(),d(`p`,Re,r(u.value.remark),1)):(y(),d(`p`,ze,`学生没有填写备注`))]),T(`div`,Be,[T(`section`,Ve,[n[8]||=T(`h3`,{class:`tech-label mb-1 text-ink-3`},`下单人`,-1),T(`dl`,He,[(y(!0),d(N,null,g(j.value,e=>(y(),d(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[T(`dt`,Ue,r(e.label),1),T(`dd`,{class:`min-w-0 truncate text-right text-[13px]`,title:e.value??``},r(e.value??`—`),9,We)]))),128))])]),T(`section`,Ge,[n[9]||=T(`h3`,{class:`tech-label mb-1 text-ink-3`},`流程信息`,-1),T(`dl`,Ke,[(y(!0),d(N,null,g(M.value,e=>(y(),d(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[T(`dt`,qe,r(e.label),1),T(`dd`,{class:`tnum min-w-0 truncate text-right text-[13px]`,title:e.value??``},r(e.value??`—`),9,Je)]))),128))]),S.value?(y(),e(P(O),{key:0,size:`small`,block:``,class:`mt-3`,loading:_.value,onClick:I},{icon:A(()=>[s(P(H),{size:14})]),default:A(()=>[h(` 下载文件（`+r(P(X)(u.value.file_size))+`） `,1)]),_:1},8,[`loading`])):u.value.claimed_by===null?(y(),d(`p`,Ye,` 接单后才能下载文件。 `)):w(``,!0)])])]),T(`section`,Xe,[T(`h3`,Ze,[n[10]||=h(` 操作记录 `,-1),T(`span`,Qe,r(f.value.length)+` 条`,1)]),f.value.length?(y(),e(P(ve),{key:0},{default:A(()=>[(y(!0),d(N,null,g(f.value,t=>(y(),e(P(ye),{key:t.id,time:P(G)(t.create_time),color:P(ce)[t.action]},{default:A(()=>[T(`div`,$e,[T(`span`,et,r(t.action_label),1),T(`span`,tt,r(t.actor_nickname??`（账号已注销）`),1),t.actor_role?(y(),e(de,{key:0,role:t.actor_role},null,8,[`role`])):w(``,!0)]),t.detail?(y(),d(`p`,nt,r(t.detail),1)):w(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(y(),d(`p`,rt,` 这一单还没有操作记录。留痕功能是后加的，升级之前发生的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如明确告诉你这里没有。 `))]),T(`p`,it,`最后更新 `+r(P(ue)(u.value.update_time)),1)],64)):(y(),d(`div`,Ce,[s(P(te),{description:l.value===null?`订单号不对，检查一下地址栏`:`没有这个订单`},null,8,[`description`])]))]))}});export{at as default};