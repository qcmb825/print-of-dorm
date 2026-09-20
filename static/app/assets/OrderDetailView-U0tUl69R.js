import{C as e,D as t,E as n,Et as r,Ht as i,K as a,M as o,N as s,R as c,T as l,Vt as u,X as d,Y as f,Z as p,ct as m,j as h,p as g,u as _,v,vt as y,w as b}from"./endpoints-DwTyeYJL.js";import{A as x,C as S,Gt as C,Jt as w,Kt as T,Yt as E,Zt as D,_t as O,ft as k,ht as A,it as j,j as M,k as N,n as P,st as F,t as I,x as L}from"./createLucideIcon-PTKXBJl9.js";import{t as R}from"./format-length-BwSo_EUP.js";import{t as z}from"./Alert-DOP7-oys.js";import{n as B,t as V}from"./Skeleton-CjHil_b5.js";import{g as H,h as ee}from"./useApi-BPuI6ZR9-rTj0-zLE.js";import{t as te}from"./download-CQ2A823_.js";import{t as ne}from"./refresh-cw-Bwy6OfZc.js";import{S as re,h as ie,t as U}from"./index-CnuM2Ps_.js";import{_ as W,d as G,f as K,g as q,h as J,n as Y,p as ae,r as oe,t as se,u as ce,v as X,y as le}from"./format-Ctvw4JoF.js";import{t as ue}from"./RoleTag-BC0_i6bl.js";import{t as de}from"./EmptyState-x11jBGQH.js";import{t as fe}from"./PageHeader-BP6eG0Dp.js";import{t as pe}from"./StatusTag-PRDVsbFX.js";function me(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...ie,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var he={name:`Timeline`,common:M,self:me},Z=1.25,ge=T(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[E(`horizontal`,`
 flex-direction: row;
 `,[C(`>`,[T(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[E(`dashed-line-type`,[C(`>`,[T(`timeline-item-timeline`,[w(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),C(`>`,[T(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[C(`>`,[w(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),T(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[w(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),E(`right-placement`,[T(`timeline-item`,[T(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),T(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),E(`left-placement`,[T(`timeline-item`,[T(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),T(`timeline-item-timeline`,`
 left: 0;
 `)])]),T(`timeline-item`,`
 position: relative;
 `,[C(`&:last-child`,[T(`timeline-item-timeline`,[w(`line`,`
 display: none;
 `)]),T(`timeline-item-content`,[w(`meta`,`
 margin-bottom: 0;
 `)])]),T(`timeline-item-content`,[w(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),w(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),w(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),E(`dashed-line-type`,[T(`timeline-item-timeline`,[w(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),T(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[w(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),w(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),w(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),_e={...N.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=A(`n-timeline`),ve=s({name:`Timeline`,props:_e,setup(e,{slots:n}){let{mergedClsPrefixRef:r}=k(e),i=N(`Timeline`,`-timeline`,ge,he,e,r);return d(Q,{props:e,mergedThemeRef:i,mergedClsPrefixRef:r}),()=>{let{value:i}=r;return f(),t(`div`,{class:j([`${i}-timeline`,e.horizontal&&`${i}-timeline--horizontal`,`${i}-timeline--${e.size}-size`,!e.horizontal&&`${i}-timeline--${e.itemPlacement}-placement`])},[F(()=>n.default?.())],2)}}}),ye=s({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(t){let n=c(Q);n||O(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),B();let{inlineThemeDisabled:r}=k(),i=e(()=>{let{props:{size:e,iconSize:r},mergedThemeRef:i}=n,{type:a}=t,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[D(`iconSize`,e)]:f,[D(`titleMargin`,e)]:p,[D(`titleFontSize`,e)]:m,[D(`circleBorder`,a)]:h,[D(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":R(r)||f}}),a=r?x(`timeline-item`,e(()=>{let{props:{size:e,iconSize:r}}=n,{type:i}=t;return`${e[0]}${r||`a`}${i[0]}`}),i,n.props):void 0;return{mergedClsPrefix:n.mergedClsPrefixRef,cssVars:r?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e,color:n,onRender:r,$slots:i}=this;return r?.(),f(),t(`div`,{class:j([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:u(this.cssVars)},[b(`div`,{class:j(`${e}-timeline-item-timeline`)},[b(`div`,{class:j(`${e}-timeline-item-timeline__line`)},null,2),F(()=>S(i.icon,r=>r?(f(),t(`div`,{key:1,class:j(`${e}-timeline-item-timeline__icon`),style:u({color:n})},[F(()=>r)],6)):(f(),t(`div`,{key:2,class:j(`${e}-timeline-item-timeline__circle`),style:u({borderColor:n})},null,6))))],2),b(`div`,{class:j(`${e}-timeline-item-content`)},[F(()=>S(i.header,n=>n||this.title?(f(),t(`div`,{key:3,class:j(`${e}-timeline-item-content__title`)},[F(()=>n||this.title)],2)):null)),b(`div`,{class:j(`${e}-timeline-item-content__content`)},[F(()=>L(i.default,()=>[this.content]))],2),b(`div`,{class:j(`${e}-timeline-item-content__meta`)},[F(()=>L(i.footer,()=>[this.time]))],2)],2)],6)}}),be=I({name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]}),xe=I({name:`file-exclamation-point`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`file-warning`]}),Se={class:`mx-auto max-w-[1000px]`},Ce={key:0,class:`flex flex-col gap-3`},we={key:1,class:`panel grid place-items-center py-16`},Te={class:`panel mb-3 p-4`},Ee={class:`flex flex-wrap items-start justify-between gap-3`},De={class:`min-w-0`},Oe=[`title`],ke={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ae={class:`flex shrink-0 flex-wrap items-center gap-2`},je={key:0,class:`panel mb-3 p-4`},Me={class:`whitespace-pre-wrap break-words text-sm leading-6`},Ne={class:`mb-3 grid gap-3 sm:grid-cols-2`},Pe={class:`panel p-4`},Fe={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Ie={class:`divide-y`,style:{"border-color":`var(--border)`}},Le={class:`shrink-0 text-xs text-ink-3`},Re=[`title`],ze={key:0,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Be={key:1,class:`mt-1 text-sm text-ink-3`},Ve={class:`flex flex-col gap-3`},He={class:`panel p-4`},Ue={class:`divide-y`,style:{"border-color":`var(--border)`}},We={class:`shrink-0 text-xs text-ink-3`},Ge=[`title`],Ke={class:`panel p-4`},qe={class:`divide-y`,style:{"border-color":`var(--border)`}},Je={class:`shrink-0 text-xs text-ink-3`},$=[`title`],Ye={key:1,class:`mt-3 text-xs text-ink-3`},Xe={class:`panel p-4`},Ze={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},Qe={class:`text-ink-3`},$e={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},et={class:`text-sm font-semibold`},tt={class:`text-xs text-ink-3`},nt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},rt={key:1,class:`text-xs leading-6 text-ink-3`},it={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},at=s({__name:`OrderDetailView`,setup(s){let c=ee(),d=H(),x=U(),S=re(),C=e(()=>{let e=Array.isArray(c.params.id)?c.params.id[0]:c.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),w=y(null),T=y([]),E=y(!1),D=y(!1),O=e(()=>x.user?.id??0),k=e(()=>x.advancedAllowed),A=e(()=>{let e=w.value;return!e||e.claimed_by===null||!e.filename?!1:k.value||e.claimed_by===O.value}),j=e(()=>!!w.value&&ae(w.value)),M=e(()=>{let e=w.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?se[e.color_type]:`黑白`} / ${e.duplex?Y[e.duplex]:`单面`}`},{label:`份数`,value:ce(e.copies)},{label:`纸张`,value:q(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:G(e.file_size)})),t}),N=e(()=>{let e=w.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm}]:[]}),F=e(()=>{let e=w.value;return e?[{label:`取件码`,value:W(e.pickup_code)},{label:`金额`,value:X(e.price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?K(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?K(e.price_time):null},{label:`提交时间`,value:K(e.create_time)},{label:`最后更新`,value:K(e.update_time)}]:[]});async function I(){if(C.value!==null){E.value=!0;try{let e=await _.detail(C.value);w.value=e.order,T.value=e.logs}catch(e){S.error(e instanceof g?e.message:`加载订单详情失败`)}finally{E.value=!1}}}async function L(){let e=w.value;if(e){D.value=!0;try{await _.download(e.id,J(e),e.file_size??void 0),await I()}catch(e){S.error(e instanceof g?e.message:`下载失败`)}finally{D.value=!1}}}function R(){d.push(`/staff/orders`)}return a(I),(e,a)=>(f(),t(`div`,Se,[o(fe,{title:w.value?`订单 #${w.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:m(()=>[o(r(P),{size:`small`,quaternary:``,onClick:R},{icon:m(()=>[o(r(be),{size:15})]),default:m(()=>[a[1]||=h(` 返回订单台 `,-1)]),_:1}),o(r(P),{size:`small`,quaternary:``,loading:E.value,onClick:a[0]||=e=>I()},{icon:m(()=>[o(r(ne),{size:15})]),default:m(()=>[a[2]||=h(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),E.value&&!w.value?(f(),t(`div`,Ce,[o(r(V),{height:`96px`,sharp:!1}),o(r(V),{height:`180px`,sharp:!1}),o(r(V),{height:`240px`,sharp:!1})])):w.value?(f(),t(v,{key:2},[b(`div`,Te,[b(`div`,Ee,[b(`div`,De,[b(`h2`,{class:`truncate text-lg font-bold`,title:w.value.preset_content??w.value.filename},i(r(J)(w.value)),9,Oe),b(`p`,ke,` 提交于 `+i(r(K)(w.value.create_time)),1)]),b(`div`,Ae,[o(pe,{status:w.value.status},null,8,[`status`]),b(`span`,{class:`tnum font-heading text-xl font-bold`,style:u({color:w.value.price===null||w.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},i(r(X)(w.value.price)),5)])]),!w.value.file_exists&&!j.value?(f(),l(r(z),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`服务器上找不到这份文件了`},{default:m(()=>[...a[3]||=[h(` 订单记录还在，落盘的文件已经不在上传目录。先确认是不是被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):n(``,!0)]),j.value?(f(),t(`section`,je,[a[4]||=b(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),b(`p`,Me,i(w.value.preset_content),1),a[5]||=b(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件。上面那段是下单当时的快照， 预设后来改了或删了，这里显示的仍是学生当时看到的原文。 `,-1)])):n(``,!0),b(`div`,Ne,[b(`section`,Pe,[b(`h3`,Fe,[a[6]||=h(` 打印要求 `,-1),!w.value.file_exists&&!j.value?(f(),l(r(xe),{key:0,size:13})):n(``,!0)]),b(`dl`,Ie,[(f(!0),t(v,null,p(M.value,e=>(f(),t(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[b(`dt`,Le,i(e.label),1),b(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},i(e.value??`—`),9,Re)]))),128))]),a[7]||=b(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),w.value.remark?(f(),t(`p`,ze,i(w.value.remark),1)):(f(),t(`p`,Be,`学生没有填写备注`))]),b(`div`,Ve,[b(`section`,He,[a[8]||=b(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),b(`dl`,Ue,[(f(!0),t(v,null,p(N.value,e=>(f(),t(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[b(`dt`,We,i(e.label),1),b(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},i(e.value??`—`),9,Ge)]))),128))])]),b(`section`,Ke,[a[9]||=b(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),b(`dl`,qe,[(f(!0),t(v,null,p(F.value,e=>(f(),t(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[b(`dt`,Je,i(e.label),1),b(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},i(e.value??`—`),9,$)]))),128))]),A.value?(f(),l(r(P),{key:0,size:`small`,block:``,class:`mt-3`,loading:D.value,onClick:L},{icon:m(()=>[o(r(te),{size:14})]),default:m(()=>[h(` 下载文件（`+i(r(G)(w.value.file_size))+`） `,1)]),_:1},8,[`loading`])):w.value.claimed_by===null?(f(),t(`p`,Ye,` 接单后才能下载文件。 `)):n(``,!0)])])]),b(`section`,Xe,[b(`h3`,Ze,[a[10]||=h(` 操作记录 `,-1),b(`span`,Qe,i(T.value.length)+` 条`,1)]),T.value.length?(f(),l(r(ve),{key:0},{default:m(()=>[(f(!0),t(v,null,p(T.value,e=>(f(),l(r(ye),{key:e.id,time:r(K)(e.create_time),color:r(oe)[e.action]},{default:m(()=>[b(`div`,$e,[b(`span`,et,i(e.action_label),1),b(`span`,tt,i(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(f(),l(ue,{key:0,role:e.actor_role},null,8,[`role`])):n(``,!0)]),e.detail?(f(),t(`p`,nt,i(e.detail),1)):n(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(f(),t(`p`,rt,` 这一单还没有操作记录。留痕是后加的，升级前的步骤不会被倒推补录 —— 与其显示一条猜出来的记录，不如说清这里没有。 `))]),b(`p`,it,`最后更新 `+i(r(le)(w.value.update_time)),1)],64)):(f(),t(`div`,we,[o(de,{tone:`alarm`,code:`ERR / 404`,title:C.value===null?`订单号不对`:`没有这个订单`,hint:`地址栏里的订单号可能被改过，或这一单已经被撤回了`},null,8,[`title`])]))]))}});export{at as default};