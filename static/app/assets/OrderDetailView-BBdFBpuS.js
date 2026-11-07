import{J as e,L as t,Nt as n,Q as r,R as i,St as a,U as o,Ut as s,X as c,Y as l,Z as u,Zt as d,_ as f,_t as ee,b as p,bt as m,fn as h,it as g,lt as _,nt as v,pn as y,rt as b,xt as x}from"./endpoints-B5qu1zMG.js";import{$t as S,D as C,F as w,I as T,L as E,St as D,Xt as O,Zt as k,_t as A,bt as j,en as M,ft as N,k as P,l as F,lt as I,nn as L}from"./motion-amoZaQIY.js";import{l as te}from"./create-CDGXcugE.js";import{t as ne}from"./Alert-D4fZAMkC.js";import{n as R,t as z}from"./Skeleton-DBx9cvg9.js";import{t as re}from"./arrow-left-Dmg3dITU.js";import{n as B,t as ie}from"./PrintDispatchDialog-DtEkYyHw.js";import{t as ae}from"./file-exclamation-point-CjbgN2jh.js";import{t as oe}from"./printer-BTNzS5Ig.js";import{t as se}from"./refresh-cw--48cij0W.js";import{f as ce,t as le}from"./index-DetkDE_U.js";import{D as V,T as H,_ as ue,c as de,d as U,f as fe,g as pe,l as W,m as G,n as me,t as he,u as K,v as q,y as ge}from"./format-CWkc0wMt.js";import{t as _e}from"./RoleTag-C1EN5lyJ.js";import{t as ve}from"./EmptyState-D_Y3gkoS.js";import{t as ye}from"./PageHeader-WvJUOCmW.js";import{t as be}from"./StatusTag-BBsGH_71.js";var J={titleMarginMedium:`0 0 6px 0`,titleMarginLarge:`-2px 0 6px 0`,titleFontSizeMedium:`14px`,titleFontSizeLarge:`16px`,iconSizeMedium:`14px`,iconSizeLarge:`14px`};function Y(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...J,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var X={name:`Timeline`,common:E,self:Y},Z=1.25,xe=k(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[M(`horizontal`,`
 flex-direction: row;
 `,[O(`>`,[k(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[M(`dashed-line-type`,[O(`>`,[k(`timeline-item-timeline`,[S(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),O(`>`,[k(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[O(`>`,[S(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),k(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[S(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),M(`right-placement`,[k(`timeline-item`,[k(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),k(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),M(`left-placement`,[k(`timeline-item`,[k(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),k(`timeline-item-timeline`,`
 left: 0;
 `)])]),k(`timeline-item`,`
 position: relative;
 `,[O(`&:last-child`,[k(`timeline-item-timeline`,[S(`line`,`
 display: none;
 `)]),k(`timeline-item-content`,[S(`meta`,`
 margin-bottom: 0;
 `)])]),k(`timeline-item-content`,[S(`title`,`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),S(`content`,`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),S(`meta`,`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),M(`dashed-line-type`,[k(`timeline-item-timeline`,[S(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),k(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[S(`circle`,`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),S(`icon`,`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),S(`line`,`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),Se={...w.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=j(`n-timeline`),Ce=g({name:`Timeline`,props:Se,setup(e,{slots:t}){let{mergedClsPrefixRef:n}=A(e),i=w(`Timeline`,`-timeline`,xe,X,e,n);return x(Q,{props:e,mergedThemeRef:i,mergedClsPrefixRef:n}),()=>{let{value:i}=n;return m(),r(`div`,{class:I([`${i}-timeline`,e.horizontal&&`${i}-timeline--horizontal`,`${i}-timeline--${e.size}-size`,!e.horizontal&&`${i}-timeline--${e.itemPlacement}-placement`])},[N(()=>t.default?.())],2)}}}),we=g({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(t){let n=_(Q);n||D(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),R();let{inlineThemeDisabled:r}=A(),i=e(()=>{let{props:{size:e,iconSize:r},mergedThemeRef:i}=n,{type:a}=t,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[L(`iconSize`,e)]:f,[L(`titleMargin`,e)]:ee,[L(`titleFontSize`,e)]:p,[L(`circleBorder`,a)]:m,[L(`iconColor`,a)]:h},common:{cubicBezierEaseInOut:g}}=i.value;return{"--n-bezier":g,"--n-circle-border":m,"--n-icon-color":h,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":p,"--n-title-font-weight":u,"--n-title-margin":ee,"--n-title-text-color":o,"--n-icon-size":te(r)||f}}),a=r?T(`timeline-item`,e(()=>{let{props:{size:e,iconSize:r}}=n,{type:i}=t;return`${e[0]}${r||`a`}${i[0]}`}),i,n.props):void 0;return{mergedClsPrefix:n.mergedClsPrefixRef,cssVars:r?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:i}=this;return n?.(),m(),r(`div`,{class:I([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:h(this.cssVars)},[l(`div`,{class:I(`${e}-timeline-item-timeline`)},[l(`div`,{class:I(`${e}-timeline-item-timeline__line`)},null,2),N(()=>P(i.icon,n=>n?(m(),r(`div`,{key:1,class:I(`${e}-timeline-item-timeline__icon`),style:h({color:t})},[N(()=>n)],6)):(m(),r(`div`,{key:2,class:I(`${e}-timeline-item-timeline__circle`),style:h({borderColor:t})},null,6))))],2),l(`div`,{class:I(`${e}-timeline-item-content`)},[N(()=>P(i.header,t=>t||this.title?(m(),r(`div`,{key:3,class:I(`${e}-timeline-item-content__title`)},[N(()=>t||this.title)],2)):null)),l(`div`,{class:I(`${e}-timeline-item-content__content`)},[N(()=>C(i.default,()=>[this.content]))],2),l(`div`,{class:I(`${e}-timeline-item-content__meta`)},[N(()=>C(i.footer,()=>[this.time]))],2)],2)],6)}}),Te={class:`mx-auto max-w-[1000px]`},Ee={key:0,class:`flex flex-col gap-3`},De={key:1,class:`panel grid place-items-center py-16`},Oe={class:`panel mb-3 p-4`},ke={class:`flex flex-wrap items-start justify-between gap-3`},Ae={class:`min-w-0`},je=[`title`],Me={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ne={class:`flex shrink-0 flex-wrap items-center gap-2`},Pe={key:0,class:`panel mb-3 p-4`},Fe={class:`whitespace-pre-wrap break-words text-sm leading-6`},Ie={class:`mb-3 grid gap-3 sm:grid-cols-2`},Le={class:`panel p-4`},Re={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},ze={class:`divide-y`,style:{"border-color":`var(--border)`}},Be={class:`shrink-0 text-xs text-ink-3`},Ve=[`title`],He={key:0,class:`mt-1.5 text-xs text-ink-3`},Ue={key:1,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},We={key:2,class:`mt-1 text-sm text-ink-3`},Ge={class:`flex flex-col gap-3`},Ke={class:`panel p-4`},qe={class:`divide-y`,style:{"border-color":`var(--border)`}},Je={class:`shrink-0 text-xs text-ink-3`},Ye=[`title`],Xe={class:`panel p-4`},Ze={class:`divide-y`,style:{"border-color":`var(--border)`}},Qe={class:`shrink-0 text-xs text-ink-3`},$e=[`title`],et={key:0,class:`mt-3 space-y-1.5`},tt={class:`tnum shrink-0 text-2xs text-ink-3`},nt={class:`min-w-0 flex-1`},rt=[`title`],it={key:0},at=[`title`],ot={class:`tnum shrink-0 text-2xs text-ink-3`},st={key:2,class:`mt-3 text-xs text-ink-3`},ct={key:3,class:`mt-4 border-t pt-3`,style:{"border-color":`var(--border)`}},lt={class:`flex flex-wrap items-center gap-2`},ut={key:0,class:`tnum text-2xs text-ink-3`},dt={key:0,class:`mt-2 border p-2.5 text-xs leading-5`,style:{"border-color":`var(--warn)`,color:`var(--warn)`}},ft={class:`panel p-4`},pt={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},mt={class:`text-ink-3`},ht={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},gt={class:`text-sm font-semibold`},_t={class:`text-xs text-ink-3`},vt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},yt={key:1,class:`text-xs leading-6 text-ink-3`},bt={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},$=g({__name:`OrderDetailView`,setup(g){let _=t(),x=i(),S=le(),C=ce(),w=e(()=>{let e=Array.isArray(_.params.id)?_.params.id[0]:_.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),T=s(null),E=s([]),D=s(!1),O=s(null),k=e(()=>S.user?.id??0),A=e(()=>S.advancedAllowed),j=e(()=>{let e=T.value;return!e||e.claimed_by===null||!e.filename?!1:A.value||e.claimed_by===k.value}),M=e(()=>!!T.value&&fe(T.value));function N(e){return V[e??`web`]??V.web}let P=e(()=>{let e=T.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?he[e.color_type]:`黑白`} / ${e.duplex?H[e.duplex]:`单面`}`},{label:`份数`,value:W(e.copies)},{label:`纸张`,value:pe(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t});function I(e){let t=T.value,n=e.price_item_name??t?.price_item_name??null,r=e.paper_name??t?.paper_name??null,i=e.color_type??t?.color_type??null,a=e.duplex??t?.duplex??null,o=e.copies??t?.copies??null,s=[];return n?s.push(n):(s.push(r??`—`),s.push(i?he[i]:`—`)),s.push(a?H[a]:`—`),s.push(o==null?`—`:W(o)),s.join(` · `)}let L=e(()=>{let e=T.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm},{label:`联系方式`,value:de(e.owner_contact_type,e.owner_contact)}]:[]}),te=e(()=>{let e=T.value;return e?[{label:`单号`,value:ue(e.pickup_code)},{label:`来源`,value:N(e.source)},{label:`金额`,value:q(e.price)},{label:`预估价`,value:e.est_price===null||e.est_price===void 0?null:e.est_pages?`${q(e.est_price)}（按 ${e.est_pages} 页估算）`:q(e.est_price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?U(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?U(e.price_time):null},{label:`提交时间`,value:U(e.create_time)},{label:`最后更新`,value:U(e.update_time)}]:[]});async function R(){if(w.value!==null){D.value=!0;try{let e=await f.detail(w.value);T.value=e.order,E.value=e.logs}catch(e){C.error(e instanceof p?e.message:`订单详情读取失败`)}finally{D.value=!1}}}let J=s([]),Y=e(()=>J.value.length>0),X=s(null),Z=e(()=>{let e=T.value;return!e||!Y.value||M.value||!e.filename||e.claimed_by===null||!(A.value||e.claimed_by===k.value)?!1:e.status===`待打印`||e.status===`打印中`});async function xe(){try{let e=await f.printerStatus();J.value=e.printers}catch{J.value=[]}}function Se(){T.value&&Y.value&&(X.value=T.value)}async function Q(){X.value=null,await R()}async function $(e,t,n){let r=T.value;if(r){O.value=e??0;try{await f.download(r.id,t,n,e??void 0),await R()}catch(e){C.error(e instanceof p?e.message:`下载未完成 · 稍后重试`)}finally{O.value=null}}}function xt(){x.push(`/staff/orders`)}return ee(()=>{R(),xe()}),(e,t)=>(m(),r(`div`,Te,[b(ye,{title:T.value?`订单 #${T.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:n(()=>[b(d(F),{size:`small`,quaternary:``,onClick:xt},{icon:n(()=>[b(d(re),{size:15})]),default:n(()=>[t[3]||=v(` 返回订单台 `,-1)]),_:1}),b(d(F),{size:`small`,quaternary:``,loading:D.value,onClick:t[0]||=e=>R()},{icon:n(()=>[b(d(se),{size:15})]),default:n(()=>[t[4]||=v(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),D.value&&!T.value?(m(),r(`div`,Ee,[b(d(z),{height:`96px`,sharp:!1}),b(d(z),{height:`180px`,sharp:!1}),b(d(z),{height:`240px`,sharp:!1})])):T.value?(m(),r(o,{key:2},[l(`div`,Oe,[l(`div`,ke,[l(`div`,Ae,[l(`h2`,{class:`truncate text-lg font-bold`,title:T.value.preset_content??T.value.filename},y(d(G)(T.value)),9,je),l(`p`,Me,` 提交于 `+y(d(U)(T.value.create_time)),1)]),l(`div`,Ne,[b(be,{status:T.value.status},null,8,[`status`]),l(`span`,{class:`tnum font-heading text-xl font-bold`,style:h({color:T.value.price===null||T.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},y(d(q)(T.value.price)),5)])]),!T.value.file_exists&&!M.value?(m(),c(d(ne),{key:0,type:`warning`,bordered:!1,class:`mt-3`,title:`文件不存在 · 需人工处理`},{default:n(()=>[...t[5]||=[v(` 订单记录仍在，上传目录里已经找不到这份文件。先确认是否被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):u(``,!0)]),M.value?(m(),r(`section`,Pe,[t[6]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),l(`p`,Fe,y(T.value.preset_content),1),t[7]||=l(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件 · 上面那段是下单当时的快照； 预设后来改过或删了，此处仍是学生当时看到的原文。 `,-1)])):u(``,!0),l(`div`,Ie,[l(`section`,Le,[l(`h3`,Re,[t[8]||=v(` 打印要求 `,-1),!T.value.file_exists&&!M.value?(m(),c(d(ae),{key:0,size:13})):u(``,!0)]),l(`dl`,ze,[(m(!0),r(o,null,a(P.value,e=>(m(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,Be,y(e.label),1),l(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},y(e.value??`—`),9,Ve)]))),128))]),T.value.duplex===`mixed`?(m(),r(`p`,He,` 各份不同，见下方清单。 `)):u(``,!0),t[9]||=l(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),T.value.remark?(m(),r(`p`,Ue,y(T.value.remark),1)):(m(),r(`p`,We,`学生未填写备注`))]),l(`div`,Ge,[l(`section`,Ke,[t[10]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),l(`dl`,qe,[(m(!0),r(o,null,a(L.value,e=>(m(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,Je,y(e.label),1),l(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},y(e.value??`—`),9,Ye)]))),128))])]),l(`section`,Xe,[t[11]||=l(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),l(`dl`,Ze,[(m(!0),r(o,null,a(te.value,e=>(m(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[l(`dt`,Qe,y(e.label),1),l(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},y(e.value??`—`),9,$e)]))),128))]),j.value&&T.value.files?.length?(m(),r(`ul`,et,[(m(!0),r(o,null,a(T.value.files,(e,t)=>(m(),r(`li`,{key:e.id,class:`flex items-center gap-2`},[l(`span`,tt,y(t+1)+`.`,1),l(`span`,nt,[l(`span`,{class:`block truncate text-xs`,title:e.filename,style:h(e.exists?``:`color: var(--warn)`)},[v(y(e.filename)+` `,1),e.exists?u(``,!0):(m(),r(`span`,it,`· 不在服务器上了`))],12,rt),l(`span`,{class:`block truncate text-2xs text-ink-3`,title:I(e)},y(I(e)),9,at)]),l(`span`,ot,y(e.size===null?``:d(K)(e.size)),1),e.exists?(m(),c(d(F),{key:0,size:`tiny`,quaternary:``,loading:O.value===e.id,title:`下载「${e.filename}」`,onClick:t=>$(e.id,e.filename,e.size??void 0)},{icon:n(()=>[b(d(B),{size:13})]),_:1},8,[`loading`,`title`,`onClick`])):u(``,!0)]))),128))])):j.value?(m(),c(d(F),{key:1,size:`small`,block:``,class:`mt-3`,loading:O.value!==null,onClick:t[1]||=e=>$(T.value.files?.[0]?.id??null,d(G)(T.value),T.value.files?.[0]?.size??T.value.file_size??void 0)},{icon:n(()=>[b(d(B),{size:14})]),default:n(()=>[v(` 下载文件（`+y(d(K)(T.value.file_size))+`） `,1)]),_:1},8,[`loading`])):T.value.claimed_by===null?(m(),r(`p`,st,` 尚未接单 · 接单后可下载文件 `)):u(``,!0),Z.value?(m(),r(`div`,ct,[l(`div`,lt,[b(d(F),{size:`small`,type:T.value.print_sent_time&&!T.value.print_error?`default`:`primary`,quaternary:!(!T.value.print_sent_time||T.value.print_error),onClick:Se},{icon:n(()=>[b(d(oe),{size:14})]),default:n(()=>[v(` `+y(T.value.print_sent_time&&!T.value.print_error?`重新下发到打印机`:`下发打印机`),1)]),_:1},8,[`type`,`quaternary`]),T.value.print_sent_time?(m(),r(`span`,ut,[v(` 上次下发 `+y(d(U)(T.value.print_sent_time))+` `,1),T.value.print_job_id?(m(),r(o,{key:0},[v(`· 任务号 `+y(T.value.print_job_id),1)],64)):u(``,!0)])):u(``,!0)]),T.value.print_error?(m(),r(`p`,dt,` 上次下发失败：`+y(T.value.print_error),1)):u(``,!0)])):u(``,!0)])])]),l(`section`,ft,[l(`h3`,pt,[t[12]||=v(` 操作记录 `,-1),l(`span`,mt,y(E.value.length)+` 条`,1)]),E.value.length?(m(),c(d(Ce),{key:0},{default:n(()=>[(m(!0),r(o,null,a(E.value,e=>(m(),c(d(we),{key:e.id,time:d(U)(e.create_time),color:d(me)[e.action]},{default:n(()=>[l(`div`,ht,[l(`span`,gt,y(e.action_label),1),l(`span`,_t,y(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(m(),c(_e,{key:0,role:e.actor_role},null,8,[`role`])):u(``,!0)]),e.detail?(m(),r(`p`,vt,y(e.detail),1)):u(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(m(),r(`p`,yt,` 这一单暂无操作记录 · 留痕功能晚于订单本身，升级前的步骤不做倒推补录。 `))]),l(`p`,bt,`最后更新 `+y(d(ge)(T.value.update_time)),1)],64)):(m(),r(`div`,De,[b(ve,{tone:`alarm`,code:`ERR / 404`,title:w.value===null?`订单不存在`:`无此订单 · 核对后重试`,hint:`地址栏里的编号可能有误，或这一单已经被撤回了`},null,8,[`title`])])),b(ie,{show:X.value!==null,order:X.value,printers:J.value,onClose:t[2]||=e=>X.value=null,onDispatched:Q},null,8,[`show`,`order`,`printers`])]))}});export{$ as default};