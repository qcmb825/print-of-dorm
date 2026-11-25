import{v as e,x as t}from"./endpoints-DS4vsVAK.js";import{$ as n,A as r,At as i,D as a,E as o,F as s,Gt as c,I as l,Kt as u,O as d,P as f,St as p,V as m,X as h,et as g,ft as _,g as ee,h as te,k as v,tt as y,x as b}from"./useApi-BPuI6ZR9-BM-pFei4.js";import{A as x,Ht as S,O as C,Rt as w,S as T,Vt as E,Wt as D,Z as O,at as k,b as A,ct as j,et as M,k as ne,n as N,ut as P,zt as F}from"./createLucideIcon-ClRkaCjD.js";import{i as I}from"./Follower-6q31WUgd.js";import{t as re}from"./Alert-BRhLrf86.js";import{n as L,t as R}from"./Skeleton-CPSW-qAO.js";import{t as ie}from"./arrow-left-DpxekVDE.js";import{n as z,t as ae}from"./PrintDispatchDialog-C5JQ4q22.js";import{t as oe}from"./file-exclamation-point-BfBUEO0Z.js";import{t as se}from"./printer-Cybdp7SV.js";import{t as ce}from"./refresh-cw-CRpFJkQ8.js";import{b as le,t as ue}from"./index-DqjpbDj4.js";import{D as B,T as V,_ as de,c as fe,d as H,f as pe,g as me,l as U,m as W,n as he,t as G,u as K,v as q,y as ge}from"./format-CWkc0wMt.js";import{t as _e}from"./RoleTag-CcIgf0Ig.js";import{t as ve}from"./EmptyState-D3vatMU2.js";import{t as ye}from"./PageHeader-mQMCT8KA.js";import{t as be}from"./StatusTag-DaNP4c2G.js";var J={titleMarginMedium:`0 0 6px 0`,titleMarginLarge:`-2px 0 6px 0`,titleFontSizeMedium:`14px`,titleFontSizeLarge:`16px`,iconSizeMedium:`14px`,iconSizeLarge:`14px`};function Y(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...J,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var X={name:`Timeline`,common:x,self:Y},Z=1.25,xe=F(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[S(`horizontal`,`
 flex-direction: row;
 `,[w(`>`,[F(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[S(`dashed-line-type`,[w(`>`,[F(`timeline-item-timeline`,[E(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),w(`>`,[F(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[w(`>`,[E(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),F(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[E(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),S(`right-placement`,[F(`timeline-item`,[F(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),F(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),S(`left-placement`,[F(`timeline-item`,[F(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),F(`timeline-item-timeline`,`
 left: 0;
 `)])]),F(`timeline-item`,`
 position: relative;
 `,[w(`&:last-child`,[F(`timeline-item-timeline`,[E(`line`,`
 display: none;
 `)]),F(`timeline-item-content`,[E(`meta`,`
 margin-bottom: 0;
 `)])]),F(`timeline-item-content`,[E(`title`,`
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
 `)]),S(`dashed-line-type`,[F(`timeline-item-timeline`,[E(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),F(`timeline-item-timeline`,`
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
 `)])])]),Se={...C.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=j(`n-timeline`),Ce=l({name:`Timeline`,props:Se,setup(e,{slots:t}){let{mergedClsPrefixRef:i}=k(e),a=C(`Timeline`,`-timeline`,xe,X,e,i);return g(Q,{props:e,mergedThemeRef:a,mergedClsPrefixRef:i}),()=>{let{value:a}=i;return n(),r(`div`,{class:O([`${a}-timeline`,e.horizontal&&`${a}-timeline--horizontal`,`${a}-timeline--${e.size}-size`,!e.horizontal&&`${a}-timeline--${e.itemPlacement}-placement`])},[M(()=>t.default?.())],2)}}}),we=l({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=m(Q);t||P(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),L();let{inlineThemeDisabled:n}=k(),r=o(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[D(`iconSize`,n)]:f,[D(`titleMargin`,n)]:p,[D(`titleFontSize`,n)]:m,[D(`circleBorder`,a)]:h,[D(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":I(r)||f}}),i=n?ne(`timeline-item`,o(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),r,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:r,themeClass:i?.themeClass,onRender:i?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:i,$slots:o}=this;return i?.(),n(),r(`div`,{class:O([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:c(this.cssVars)},[a(`div`,{class:O(`${e}-timeline-item-timeline`)},[a(`div`,{class:O(`${e}-timeline-item-timeline__line`)},null,2),M(()=>T(o.icon,i=>i?(n(),r(`div`,{key:1,class:O(`${e}-timeline-item-timeline__icon`),style:c({color:t})},[M(()=>i)],6)):(n(),r(`div`,{key:2,class:O(`${e}-timeline-item-timeline__circle`),style:c({borderColor:t})},null,6))))],2),a(`div`,{class:O(`${e}-timeline-item-content`)},[M(()=>T(o.header,t=>t||this.title?(n(),r(`div`,{key:3,class:O(`${e}-timeline-item-content__title`)},[M(()=>t||this.title)],2)):null)),a(`div`,{class:O(`${e}-timeline-item-content__content`)},[M(()=>A(o.default,()=>[this.content]))],2),a(`div`,{class:O(`${e}-timeline-item-content__meta`)},[M(()=>A(o.footer,()=>[this.time]))],2)],2)],6)}}),Te={class:`mx-auto max-w-[1000px]`},Ee={key:0,class:`flex flex-col gap-3`},De={key:1,class:`panel grid place-items-center py-16`},Oe={class:`panel mb-3 p-4`},ke={class:`flex flex-wrap items-start justify-between gap-3`},Ae={class:`min-w-0`},je=[`title`],Me={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ne={class:`flex shrink-0 flex-wrap items-center gap-2`},Pe={key:0,class:`mt-4 flex items-end justify-between gap-4 border-t pt-3`,style:{"border-color":`var(--border)`}},Fe={class:`tnum font-heading text-4xl leading-none font-bold tracking-[0.08em] sm:text-5xl`},Ie={key:0,class:`panel mb-3 p-4`},Le={class:`whitespace-pre-wrap break-words text-sm leading-6`},Re={class:`mb-3 grid gap-3 sm:grid-cols-2`},ze={class:`panel p-4`},Be={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Ve={class:`divide-y`,style:{"border-color":`var(--border)`}},He={class:`shrink-0 text-xs text-ink-3`},Ue=[`title`],We={key:0,class:`mt-1.5 text-xs text-ink-3`},Ge={key:1,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Ke={key:2,class:`mt-1 text-sm text-ink-3`},qe={class:`flex flex-col gap-3`},Je={class:`panel p-4`},Ye={class:`divide-y`,style:{"border-color":`var(--border)`}},Xe={class:`shrink-0 text-xs text-ink-3`},Ze=[`title`],Qe={class:`panel p-4`},$e={class:`divide-y`,style:{"border-color":`var(--border)`}},et={class:`shrink-0 text-xs text-ink-3`},tt=[`title`],nt={key:0,class:`mt-3 space-y-1.5`},rt={class:`tnum shrink-0 text-2xs text-ink-3`},it={class:`min-w-0 flex-1`},at=[`title`],ot={key:0},st=[`title`],ct={class:`tnum shrink-0 text-2xs text-ink-3`},lt={key:2,class:`mt-3 text-xs text-ink-3`},ut={key:3,class:`mt-4 border-t pt-3`,style:{"border-color":`var(--border)`}},dt={class:`flex flex-wrap items-center gap-2`},ft={key:0,class:`tnum text-2xs text-ink-3`},pt={key:0,class:`mt-2 border p-2.5 text-xs leading-5`,style:{"border-color":`var(--warn)`,color:`var(--warn)`}},mt={class:`panel p-4`},ht={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},gt={class:`text-ink-3`},_t={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},vt={class:`text-sm font-semibold`},yt={class:`text-xs text-ink-3`},bt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},xt={key:1,class:`text-xs leading-6 text-ink-3`},St={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},$=l({__name:`OrderDetailView`,setup(l){let m=te(),g=ee(),x=ue(),S=le(),C=o(()=>{let e=Array.isArray(m.params.id)?m.params.id[0]:m.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),w=p(null),T=p([]),E=p(!1),D=p(null),O=o(()=>x.user?.id??0),k=o(()=>x.advancedAllowed),A=o(()=>{let e=w.value;return!e||e.claimed_by===null||!e.filename?!1:k.value||e.claimed_by===O.value}),j=o(()=>!!w.value&&pe(w.value));function M(e){return B[e??`web`]??B.web}let ne=o(()=>{let e=w.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?G[e.color_type]:`黑白`} / ${e.duplex?V[e.duplex]:`单面`}`},{label:`份数`,value:U(e.copies)},{label:`纸张`,value:me(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:K(e.file_size)})),t});function P(e){let t=w.value,n=e.price_item_name??t?.price_item_name??null,r=e.paper_name??t?.paper_name??null,i=e.color_type??t?.color_type??null,a=e.duplex??t?.duplex??null,o=e.copies??t?.copies??null,s=[];return n?s.push(n):(s.push(r??`—`),s.push(i?G[i]:`—`)),s.push(a?V[a]:`—`),s.push(o==null?`—`:U(o)),s.join(` · `)}let F=o(()=>{let e=w.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm},{label:`联系方式`,value:fe(e.owner_contact_type,e.owner_contact)}]:[]}),I=o(()=>{let e=w.value;return e?[{label:`单号`,value:de(e.pickup_code)},{label:`来源`,value:M(e.source)},{label:`金额`,value:q(e.price)},{label:`预估价`,value:e.est_price===null||e.est_price===void 0?null:e.est_pages?`${q(e.est_price)}（按 ${e.est_pages} 页估算）`:q(e.est_price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?H(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?H(e.price_time):null},{label:`提交时间`,value:H(e.create_time)},{label:`最后更新`,value:H(e.update_time)}]:[]});async function L(){if(C.value!==null){E.value=!0;try{let t=await e.detail(C.value);w.value=t.order,T.value=t.logs}catch(e){S.error(e instanceof t?e.message:`订单详情读取失败`)}finally{E.value=!1}}}let J=p([]),Y=o(()=>J.value.length>0),X=p(null),Z=o(()=>{let e=w.value;return!e||!Y.value||j.value||!e.filename||e.claimed_by===null||!(k.value||e.claimed_by===O.value)?!1:e.status===`待打印`||e.status===`打印中`});async function xe(){try{let t=await e.printerStatus();J.value=t.printers}catch{J.value=[]}}function Se(){w.value&&Y.value&&(X.value=w.value)}async function Q(){X.value=null,await L()}async function $(n,r,i){let a=w.value;if(a){D.value=n??0;try{await e.download(a.id,r,i,n??void 0),await L()}catch(e){S.error(e instanceof t?e.message:`下载未完成 · 稍后重试`)}finally{D.value=null}}}function Ct(){g.push(`/staff/orders`)}return h(()=>{L(),xe()}),(e,t)=>(n(),r(`div`,Te,[s(ye,{title:w.value?`订单 #${w.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:_(()=>[s(i(N),{size:`small`,quaternary:``,onClick:Ct},{icon:_(()=>[s(i(ie),{size:15})]),default:_(()=>[t[3]||=f(` 返回订单台 `,-1)]),_:1}),s(i(N),{size:`small`,quaternary:``,loading:E.value,onClick:t[0]||=e=>L()},{icon:_(()=>[s(i(ce),{size:15})]),default:_(()=>[t[4]||=f(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),E.value&&!w.value?(n(),r(`div`,Ee,[s(i(R),{height:`96px`,sharp:!1}),s(i(R),{height:`180px`,sharp:!1}),s(i(R),{height:`240px`,sharp:!1})])):w.value?(n(),r(b,{key:2},[a(`div`,Oe,[a(`div`,ke,[a(`div`,Ae,[a(`h2`,{class:`truncate text-lg font-bold`,title:w.value.preset_content??w.value.filename},u(i(W)(w.value)),9,je),a(`p`,Me,` 提交于 `+u(i(H)(w.value.create_time)),1)]),a(`div`,Ne,[s(be,{status:w.value.status},null,8,[`status`]),a(`span`,{class:`tnum font-heading text-xl font-bold`,style:c({color:w.value.price===null||w.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},u(i(q)(w.value.price)),5)])]),w.value.pickup_code?(n(),r(`div`,Pe,[t[5]||=a(`span`,{class:`readout pb-1.5`},`取件单号 / PICKUP CODE`,-1),a(`span`,Fe,u(w.value.pickup_code),1)])):v(``,!0),!w.value.file_exists&&!j.value?(n(),d(i(re),{key:1,type:`warning`,bordered:!1,class:`mt-3`,title:`文件不存在 · 需人工处理`},{default:_(()=>[...t[6]||=[f(` 订单记录仍在，上传目录里已经找不到这份文件。先确认是否被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):v(``,!0)]),j.value?(n(),r(`section`,Ie,[t[7]||=a(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),a(`p`,Le,u(w.value.preset_content),1),t[8]||=a(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件 · 上面那段是下单当时的快照； 预设后来改过或删了，此处仍是学生当时看到的原文。 `,-1)])):v(``,!0),a(`div`,Re,[a(`section`,ze,[a(`h3`,Be,[t[9]||=f(` 打印要求 `,-1),!w.value.file_exists&&!j.value?(n(),d(i(oe),{key:0,size:13})):v(``,!0)]),a(`dl`,Ve,[(n(!0),r(b,null,y(ne.value,e=>(n(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[a(`dt`,He,u(e.label),1),a(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},u(e.value??`—`),9,Ue)]))),128))]),w.value.duplex===`mixed`?(n(),r(`p`,We,` 各份不同，见下方清单。 `)):v(``,!0),t[10]||=a(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),w.value.remark?(n(),r(`p`,Ge,u(w.value.remark),1)):(n(),r(`p`,Ke,`学生未填写备注`))]),a(`div`,qe,[a(`section`,Je,[t[11]||=a(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),a(`dl`,Ye,[(n(!0),r(b,null,y(F.value,e=>(n(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[a(`dt`,Xe,u(e.label),1),a(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},u(e.value??`—`),9,Ze)]))),128))])]),a(`section`,Qe,[t[12]||=a(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),a(`dl`,$e,[(n(!0),r(b,null,y(I.value,e=>(n(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[a(`dt`,et,u(e.label),1),a(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},u(e.value??`—`),9,tt)]))),128))]),A.value&&w.value.files?.length?(n(),r(`ul`,nt,[(n(!0),r(b,null,y(w.value.files,(e,t)=>(n(),r(`li`,{key:e.id,class:`flex items-center gap-2`},[a(`span`,rt,u(t+1)+`.`,1),a(`span`,it,[a(`span`,{class:`block truncate text-xs`,title:e.filename,style:c(e.exists?``:`color: var(--warn)`)},[f(u(e.filename)+` `,1),e.exists?v(``,!0):(n(),r(`span`,ot,`· 不在服务器上了`))],12,at),a(`span`,{class:`block truncate text-2xs text-ink-3`,title:P(e)},u(P(e)),9,st)]),a(`span`,ct,u(e.size===null?``:i(K)(e.size)),1),e.exists?(n(),d(i(N),{key:0,size:`tiny`,quaternary:``,loading:D.value===e.id,title:`下载「${e.filename}」`,onClick:t=>$(e.id,e.filename,e.size??void 0)},{icon:_(()=>[s(i(z),{size:13})]),_:1},8,[`loading`,`title`,`onClick`])):v(``,!0)]))),128))])):A.value?(n(),d(i(N),{key:1,size:`small`,block:``,class:`mt-3`,loading:D.value!==null,onClick:t[1]||=e=>$(w.value.files?.[0]?.id??null,i(W)(w.value),w.value.files?.[0]?.size??w.value.file_size??void 0)},{icon:_(()=>[s(i(z),{size:14})]),default:_(()=>[f(` 下载文件（`+u(i(K)(w.value.file_size))+`） `,1)]),_:1},8,[`loading`])):w.value.claimed_by===null?(n(),r(`p`,lt,` 尚未接单 · 接单后可下载文件 `)):v(``,!0),Z.value?(n(),r(`div`,ut,[a(`div`,dt,[s(i(N),{size:`small`,type:w.value.print_sent_time&&!w.value.print_error?`default`:`primary`,quaternary:!(!w.value.print_sent_time||w.value.print_error),onClick:Se},{icon:_(()=>[s(i(se),{size:14})]),default:_(()=>[f(` `+u(w.value.print_sent_time&&!w.value.print_error?`重新下发到打印机`:`下发打印机`),1)]),_:1},8,[`type`,`quaternary`]),w.value.print_sent_time?(n(),r(`span`,ft,[f(` 上次下发 `+u(i(H)(w.value.print_sent_time))+` `,1),w.value.print_job_id?(n(),r(b,{key:0},[f(`· 任务号 `+u(w.value.print_job_id),1)],64)):v(``,!0)])):v(``,!0)]),w.value.print_error?(n(),r(`p`,pt,` 上次下发失败：`+u(w.value.print_error),1)):v(``,!0)])):v(``,!0)])])]),a(`section`,mt,[a(`h3`,ht,[t[13]||=f(` 操作记录 `,-1),a(`span`,gt,u(T.value.length)+` 条`,1)]),T.value.length?(n(),d(i(Ce),{key:0},{default:_(()=>[(n(!0),r(b,null,y(T.value,e=>(n(),d(i(we),{key:e.id,time:i(H)(e.create_time),color:i(he)[e.action]},{default:_(()=>[a(`div`,_t,[a(`span`,vt,u(e.action_label),1),a(`span`,yt,u(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(n(),d(_e,{key:0,role:e.actor_role},null,8,[`role`])):v(``,!0)]),e.detail?(n(),r(`p`,bt,u(e.detail),1)):v(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(n(),r(`p`,xt,` 这一单暂无操作记录 · 留痕功能晚于订单本身，升级前的步骤不做倒推补录。 `))]),a(`p`,St,`最后更新 `+u(i(ge)(w.value.update_time)),1)],64)):(n(),r(`div`,De,[s(ve,{tone:`alarm`,code:`ERR / 404`,title:C.value===null?`订单不存在`:`无此订单 · 核对后重试`,hint:`地址栏里的编号可能有误，或这一单已经被撤回了`},null,8,[`title`])])),s(ae,{show:X.value!==null,order:X.value,printers:J.value,onClose:t[2]||=e=>X.value=null,onDispatched:Q},null,8,[`show`,`order`,`printers`])]))}});export{$ as default};