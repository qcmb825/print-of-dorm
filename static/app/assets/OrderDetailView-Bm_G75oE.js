import{v as e,x as t}from"./endpoints-DS4vsVAK.js";import{$ as n,A as r,D as i,E as a,F as o,Gt as s,I as c,O as l,P as u,Q as d,V as f,Wt as p,Y as m,dt as h,et as g,g as _,h as ee,k as v,kt as y,x as b,xt as x}from"./useApi-BPuI6ZR9-B4cwgxoE.js";import{A as S,Ht as C,O as w,Rt as T,S as E,Vt as D,Wt as O,Z as k,at as A,b as j,ct as M,et as N,k as P,n as F,ut as I,zt as L}from"./createLucideIcon-DOmk2xkk.js";import{i as R}from"./Follower-CGry6gTm.js";import{t as te}from"./Alert-Bb3LNGqb.js";import{n as z,t as B}from"./Skeleton-CPooQKdx.js";import{t as ne}from"./arrow-left-DRX1eLfp.js";import{n as V,t as re}from"./PrintDispatchDialog-D6ir3O6I.js";import{t as ie}from"./file-exclamation-point-7BKL-Qn_.js";import{t as ae}from"./printer-ASpnvqQC.js";import{t as oe}from"./refresh-cw-Da8SktBV.js";import{b as se,t as ce}from"./index-DkAHFkWq.js";import{D as H,T as U,_ as le,c as ue,d as W,f as de,g as fe,l as pe,m as me,n as he,t as ge,u as G,v as K,y as _e}from"./format-CWkc0wMt.js";import{t as ve}from"./RoleTag-BYMFgWZ2.js";import{t as ye}from"./EmptyState-Bkd1FQkw.js";import{t as be}from"./PageHeader-CBIsP70Y.js";import{t as xe}from"./StatusTag-9qy5Bw7a.js";var q={titleMarginMedium:`0 0 6px 0`,titleMarginLarge:`-2px 0 6px 0`,titleFontSizeMedium:`14px`,titleFontSizeLarge:`16px`,iconSizeMedium:`14px`,iconSizeLarge:`14px`};function J(e){let{textColor3:t,infoColor:n,errorColor:r,successColor:i,warningColor:a,textColor1:o,textColor2:s,railColor:c,fontWeightStrong:l,fontSize:u}=e;return{...q,contentFontSize:u,titleFontWeight:l,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${n}`,circleBorderError:`2px solid ${r}`,circleBorderSuccess:`2px solid ${i}`,circleBorderWarning:`2px solid ${a}`,iconColor:t,iconColorInfo:n,iconColorError:r,iconColorSuccess:i,iconColorWarning:a,titleTextColor:o,contentTextColor:s,metaTextColor:t,lineColor:c}}var Y={name:`Timeline`,common:S,self:J},X=1.25,Z=L(`timeline`,`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${X};
`,[C(`horizontal`,`
 flex-direction: row;
 `,[T(`>`,[L(`timeline-item`,`
 flex-shrink: 0;
 padding-right: 40px;
 `,[C(`dashed-line-type`,[T(`>`,[L(`timeline-item-timeline`,[D(`line`,`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),T(`>`,[L(`timeline-item-content`,`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[T(`>`,[D(`meta`,`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),L(`timeline-item-timeline`,`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[D(`line`,`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),C(`right-placement`,[L(`timeline-item`,[L(`timeline-item-content`,`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),L(`timeline-item-timeline`,`
 width: var(--n-icon-size);
 right: 0;
 `)])]),C(`left-placement`,[L(`timeline-item`,[L(`timeline-item-content`,`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),L(`timeline-item-timeline`,`
 left: 0;
 `)])]),L(`timeline-item`,`
 position: relative;
 `,[T(`&:last-child`,[L(`timeline-item-timeline`,[D(`line`,`
 display: none;
 `)]),L(`timeline-item-content`,[D(`meta`,`
 margin-bottom: 0;
 `)])]),L(`timeline-item-content`,[D(`title`,`
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
 `)]),C(`dashed-line-type`,[L(`timeline-item-timeline`,[D(`line`,`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),L(`timeline-item-timeline`,`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${X} / 2 - var(--n-icon-size) / 2);
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
 `)])])]),Se={...w.props,horizontal:Boolean,itemPlacement:{type:String,default:`left`},size:{type:String,default:`medium`},iconSize:Number},Q=M(`n-timeline`),Ce=c({name:`Timeline`,props:Se,setup(e,{slots:t}){let{mergedClsPrefixRef:i}=A(e),a=w(`Timeline`,`-timeline`,Z,Y,e,i);return n(Q,{props:e,mergedThemeRef:a,mergedClsPrefixRef:i}),()=>{let{value:n}=i;return d(),r(`div`,{class:k([`${n}-timeline`,e.horizontal&&`${n}-timeline--horizontal`,`${n}-timeline--${e.size}-size`,!e.horizontal&&`${n}-timeline--${e.itemPlacement}-placement`])},[N(()=>t.default?.())],2)}}}),we=c({name:`TimelineItem`,props:{time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:`default`},type:{type:String,default:`default`}},slots:Object,setup(e){let t=f(Q);t||I(`timeline-item`,"`n-timeline-item` must be placed inside `n-timeline`."),z();let{inlineThemeDisabled:n}=A(),r=a(()=>{let{props:{size:n,iconSize:r},mergedThemeRef:i}=t,{type:a}=e,{self:{titleTextColor:o,contentTextColor:s,metaTextColor:c,lineColor:l,titleFontWeight:u,contentFontSize:d,[O(`iconSize`,n)]:f,[O(`titleMargin`,n)]:p,[O(`titleFontSize`,n)]:m,[O(`circleBorder`,a)]:h,[O(`iconColor`,a)]:g},common:{cubicBezierEaseInOut:_}}=i.value;return{"--n-bezier":_,"--n-circle-border":h,"--n-icon-color":g,"--n-content-font-size":d,"--n-content-text-color":s,"--n-line-color":l,"--n-meta-text-color":c,"--n-title-font-size":m,"--n-title-font-weight":u,"--n-title-margin":p,"--n-title-text-color":o,"--n-icon-size":R(r)||f}}),i=n?P(`timeline-item`,a(()=>{let{props:{size:n,iconSize:r}}=t,{type:i}=e;return`${n[0]}${r||`a`}${i[0]}`}),r,t.props):void 0;return{mergedClsPrefix:t.mergedClsPrefixRef,cssVars:n?void 0:r,themeClass:i?.themeClass,onRender:i?.onRender}},render(){let{mergedClsPrefix:e,color:t,onRender:n,$slots:a}=this;return n?.(),d(),r(`div`,{class:k([`${e}-timeline-item`,this.themeClass,`${e}-timeline-item--${this.type}-type`,`${e}-timeline-item--${this.lineType}-line-type`]),style:p(this.cssVars)},[i(`div`,{class:k(`${e}-timeline-item-timeline`)},[i(`div`,{class:k(`${e}-timeline-item-timeline__line`)},null,2),N(()=>E(a.icon,n=>n?(d(),r(`div`,{key:1,class:k(`${e}-timeline-item-timeline__icon`),style:p({color:t})},[N(()=>n)],6)):(d(),r(`div`,{key:2,class:k(`${e}-timeline-item-timeline__circle`),style:p({borderColor:t})},null,6))))],2),i(`div`,{class:k(`${e}-timeline-item-content`)},[N(()=>E(a.header,t=>t||this.title?(d(),r(`div`,{key:3,class:k(`${e}-timeline-item-content__title`)},[N(()=>t||this.title)],2)):null)),i(`div`,{class:k(`${e}-timeline-item-content__content`)},[N(()=>j(a.default,()=>[this.content]))],2),i(`div`,{class:k(`${e}-timeline-item-content__meta`)},[N(()=>j(a.footer,()=>[this.time]))],2)],2)],6)}}),Te={class:`mx-auto max-w-[1000px]`},Ee={key:0,class:`flex flex-col gap-3`},De={key:1,class:`panel grid place-items-center py-16`},Oe={class:`panel mb-3 p-4`},ke={class:`flex flex-wrap items-start justify-between gap-3`},Ae={class:`min-w-0`},je=[`title`],Me={class:`tech-label mt-1 text-ink-3 tech-label--cn text-xs`},Ne={class:`flex shrink-0 flex-wrap items-center gap-2`},Pe={key:0,class:`mt-4 flex items-end justify-between gap-4 border-t pt-3`,style:{"border-color":`var(--border)`}},Fe={class:`tnum font-heading text-4xl leading-none font-bold tracking-[0.08em] sm:text-5xl`},Ie={key:0,class:`panel mb-3 p-4`},Le={class:`whitespace-pre-wrap break-words text-sm leading-6`},Re={class:`mb-3 grid gap-3 sm:grid-cols-2`},ze={class:`panel p-4`},Be={class:`tech-label mb-1 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Ve={class:`divide-y`,style:{"border-color":`var(--border)`}},He={class:`shrink-0 text-xs text-ink-3`},Ue=[`title`],We={key:0,class:`mt-1.5 text-xs text-ink-3`},Ge={key:1,class:`mt-1 whitespace-pre-wrap break-words p-2 text-sm leading-6`,style:{background:`var(--accent-tint-soft)`}},Ke={key:2,class:`mt-1 text-sm text-ink-3`},qe={class:`flex flex-col gap-3`},Je={class:`panel p-4`},Ye={class:`divide-y`,style:{"border-color":`var(--border)`}},Xe={class:`shrink-0 text-xs text-ink-3`},Ze=[`title`],Qe={class:`panel p-4`},$e={class:`divide-y`,style:{"border-color":`var(--border)`}},et={class:`shrink-0 text-xs text-ink-3`},tt=[`title`],nt={key:0,class:`mt-3 space-y-1.5`},rt={class:`tnum shrink-0 text-2xs text-ink-3`},it={class:`min-w-0 flex-1`},at=[`title`],ot={key:0},st=[`title`],ct={class:`tnum shrink-0 text-2xs text-ink-3`},lt={key:2,class:`mt-3 text-xs text-ink-3`},ut={key:3,class:`mt-4 border-t pt-3`,style:{"border-color":`var(--border)`}},dt={class:`flex flex-wrap items-center gap-2`},ft={key:0,class:`tnum text-2xs text-ink-3`},pt={key:0,class:`mt-2 border p-2.5 text-xs leading-5`,style:{"border-color":`var(--warn)`,color:`var(--warn)`}},mt={class:`panel p-4`},ht={class:`tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3 tech-label--cn text-xs`},gt={class:`text-ink-3`},_t={class:`flex flex-wrap items-center gap-x-1.5 gap-y-1`},vt={class:`text-sm font-semibold`},yt={class:`text-xs text-ink-3`},bt={key:0,class:`mt-0.5 break-words text-xs leading-5 text-ink-3`},xt={key:1,class:`text-xs leading-6 text-ink-3`},St={class:`tech-label mt-3 text-ink-3 tech-label--cn text-xs`},$=c({__name:`OrderDetailView`,setup(n){let c=ee(),f=_(),S=ce(),C=se(),w=a(()=>{let e=Array.isArray(c.params.id)?c.params.id[0]:c.params.id,t=Number(e);return Number.isInteger(t)&&t>0?t:null}),T=x(null),E=x([]),D=x(!1),O=x(null),k=a(()=>S.user?.id??0),A=a(()=>S.advancedAllowed),j=a(()=>{let e=T.value;return!e||e.claimed_by===null||!e.filename?!1:A.value||e.claimed_by===k.value}),M=a(()=>!!T.value&&de(T.value));function N(e){return H[e??`web`]??H.web}let P=a(()=>{let e=T.value;if(!e)return[];let t=[{label:`规格`,value:`${e.color_type?ge[e.color_type]:`黑白`} / ${e.duplex?U[e.duplex]:`单面`}`},{label:`份数`,value:pe(e.copies)},{label:`纸张`,value:fe(e.paper_name)},{label:`纸张备注`,value:e.paper_remark}];return e.filename&&(t.push({label:`文件名`,value:e.filename}),t.push({label:`文件大小`,value:G(e.file_size)})),t});function I(e){let t=T.value,n=e.price_item_name??t?.price_item_name??null,r=e.paper_name??t?.paper_name??null,i=e.color_type??t?.color_type??null,a=e.duplex??t?.duplex??null,o=e.copies??t?.copies??null,s=[];return n?s.push(n):(s.push(r??`—`),s.push(i?ge[i]:`—`)),s.push(a?U[a]:`—`),s.push(o==null?`—`:pe(o)),s.join(` · `)}let L=a(()=>{let e=T.value;return e?[{label:`账号昵称`,value:e.owner_nickname},{label:`姓名`,value:e.owner_real_name},{label:`学号`,value:e.owner_student_id},{label:`宿舍`,value:e.owner_dorm},{label:`联系方式`,value:ue(e.owner_contact_type,e.owner_contact)}]:[]}),R=a(()=>{let e=T.value;return e?[{label:`单号`,value:le(e.pickup_code)},{label:`来源`,value:N(e.source)},{label:`金额`,value:K(e.price)},{label:`预估价`,value:e.est_price===null||e.est_price===void 0?null:e.est_pages?`${K(e.est_price)}（按 ${e.est_pages} 页估算）`:K(e.est_price)},{label:`接单人`,value:e.claimer_nickname},{label:`接单时间`,value:e.claim_time?W(e.claim_time):null},{label:`计费人`,value:e.pricer_nickname},{label:`计费时间`,value:e.price_time?W(e.price_time):null},{label:`提交时间`,value:W(e.create_time)},{label:`最后更新`,value:W(e.update_time)}]:[]});async function z(){if(w.value!==null){D.value=!0;try{let t=await e.detail(w.value);T.value=t.order,E.value=t.logs}catch(e){C.error(e instanceof t?e.message:`订单详情读取失败`)}finally{D.value=!1}}}let q=x([]),J=a(()=>q.value.length>0),Y=x(null),X=a(()=>{let e=T.value;return!e||!J.value||M.value||!e.filename||e.claimed_by===null||!(A.value||e.claimed_by===k.value)?!1:e.status===`待打印`||e.status===`打印中`});async function Z(){try{let t=await e.printerStatus();q.value=t.printers}catch{q.value=[]}}function Se(){T.value&&J.value&&(Y.value=T.value)}async function Q(){Y.value=null,await z()}async function $(n,r,i){let a=T.value;if(a){O.value=n??0;try{await e.download(a.id,r,i,n??void 0),await z()}catch(e){C.error(e instanceof t?e.message:`下载未完成 · 稍后重试`)}finally{O.value=null}}}function Ct(){f.push(`/staff/orders`)}return m(()=>{z(),Z()}),(e,t)=>(d(),r(`div`,Te,[o(be,{title:T.value?`订单 #${T.value.id}`:`订单详情`,subtitle:`订单信息与操作记录`},{actions:h(()=>[o(y(F),{size:`small`,quaternary:``,onClick:Ct},{icon:h(()=>[o(y(ne),{size:15})]),default:h(()=>[t[3]||=u(` 返回订单台 `,-1)]),_:1}),o(y(F),{size:`small`,quaternary:``,loading:D.value,onClick:t[0]||=e=>z()},{icon:h(()=>[o(y(oe),{size:15})]),default:h(()=>[t[4]||=u(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`title`]),D.value&&!T.value?(d(),r(`div`,Ee,[o(y(B),{height:`96px`,sharp:!1}),o(y(B),{height:`180px`,sharp:!1}),o(y(B),{height:`240px`,sharp:!1})])):T.value?(d(),r(b,{key:2},[i(`div`,Oe,[i(`div`,ke,[i(`div`,Ae,[i(`h2`,{class:`truncate text-lg font-bold`,title:T.value.preset_content??T.value.filename},s(y(me)(T.value)),9,je),i(`p`,Me,` 提交于 `+s(y(W)(T.value.create_time)),1)]),i(`div`,Ne,[o(xe,{status:T.value.status},null,8,[`status`]),i(`span`,{class:`tnum font-heading text-xl font-bold`,style:p({color:T.value.price===null||T.value.price===void 0?`var(--text-quaternary)`:`var(--accent-text)`})},s(y(K)(T.value.price)),5)])]),T.value.pickup_code?(d(),r(`div`,Pe,[t[5]||=i(`span`,{class:`readout pb-1.5`},`取件单号 / PICKUP CODE`,-1),i(`span`,Fe,s(T.value.pickup_code),1)])):v(``,!0),!T.value.file_exists&&!M.value?(d(),l(y(te),{key:1,type:`warning`,bordered:!1,class:`mt-3`,title:`文件不存在 · 需人工处理`},{default:h(()=>[...t[6]||=[u(` 订单记录仍在，上传目录里已经找不到这份文件。先确认是否被手工清理过， 再决定这一单怎么处理。 `,-1)]]),_:1})):v(``,!0)]),M.value?(d(),r(`section`,Ie,[t[7]||=i(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`预设打印服务`,-1),i(`p`,Le,s(T.value.preset_content),1),t[8]||=i(`p`,{class:`mt-2 text-xs text-ink-3`},` 这一单没有上传文件 · 上面那段是下单当时的快照； 预设后来改过或删了，此处仍是学生当时看到的原文。 `,-1)])):v(``,!0),i(`div`,Re,[i(`section`,ze,[i(`h3`,Be,[t[9]||=u(` 打印要求 `,-1),!T.value.file_exists&&!M.value?(d(),l(y(ie),{key:0,size:13})):v(``,!0)]),i(`dl`,Ve,[(d(!0),r(b,null,g(P.value,e=>(d(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[i(`dt`,He,s(e.label),1),i(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},s(e.value??`—`),9,Ue)]))),128))]),T.value.duplex===`mixed`?(d(),r(`p`,We,` 各份不同，见下方清单。 `)):v(``,!0),t[10]||=i(`p`,{class:`mt-2 text-xs text-ink-3`},`备注`,-1),T.value.remark?(d(),r(`p`,Ge,s(T.value.remark),1)):(d(),r(`p`,Ke,`学生未填写备注`))]),i(`div`,qe,[i(`section`,Je,[t[11]||=i(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`下单人`,-1),i(`dl`,Ye,[(d(!0),r(b,null,g(L.value,e=>(d(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[i(`dt`,Xe,s(e.label),1),i(`dd`,{class:`min-w-0 truncate text-right text-sm`,title:e.value??``},s(e.value??`—`),9,Ze)]))),128))])]),i(`section`,Qe,[t[12]||=i(`h3`,{class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},`流程信息`,-1),i(`dl`,$e,[(d(!0),r(b,null,g(R.value,e=>(d(),r(`div`,{key:e.label,class:`flex items-baseline justify-between gap-3 py-1.5`,style:{"border-color":`var(--border)`}},[i(`dt`,et,s(e.label),1),i(`dd`,{class:`tnum min-w-0 truncate text-right text-sm`,title:e.value??``},s(e.value??`—`),9,tt)]))),128))]),j.value&&T.value.files?.length?(d(),r(`ul`,nt,[(d(!0),r(b,null,g(T.value.files,(e,t)=>(d(),r(`li`,{key:e.id,class:`flex items-center gap-2`},[i(`span`,rt,s(t+1)+`.`,1),i(`span`,it,[i(`span`,{class:`block truncate text-xs`,title:e.filename,style:p(e.exists?``:`color: var(--warn)`)},[u(s(e.filename)+` `,1),e.exists?v(``,!0):(d(),r(`span`,ot,`· 不在服务器上了`))],12,at),i(`span`,{class:`block truncate text-2xs text-ink-3`,title:I(e)},s(I(e)),9,st)]),i(`span`,ct,s(e.size===null?``:y(G)(e.size)),1),e.exists?(d(),l(y(F),{key:0,size:`tiny`,quaternary:``,loading:O.value===e.id,title:`下载「${e.filename}」`,onClick:t=>$(e.id,e.filename,e.size??void 0)},{icon:h(()=>[o(y(V),{size:13})]),_:1},8,[`loading`,`title`,`onClick`])):v(``,!0)]))),128))])):j.value?(d(),l(y(F),{key:1,size:`small`,block:``,class:`mt-3`,loading:O.value!==null,onClick:t[1]||=e=>$(T.value.files?.[0]?.id??null,y(me)(T.value),T.value.files?.[0]?.size??T.value.file_size??void 0)},{icon:h(()=>[o(y(V),{size:14})]),default:h(()=>[u(` 下载文件（`+s(y(G)(T.value.file_size))+`） `,1)]),_:1},8,[`loading`])):T.value.claimed_by===null?(d(),r(`p`,lt,` 尚未接单 · 接单后可下载文件 `)):v(``,!0),X.value?(d(),r(`div`,ut,[i(`div`,dt,[o(y(F),{size:`small`,type:T.value.print_sent_time&&!T.value.print_error?`default`:`primary`,quaternary:!(!T.value.print_sent_time||T.value.print_error),onClick:Se},{icon:h(()=>[o(y(ae),{size:14})]),default:h(()=>[u(` `+s(T.value.print_sent_time&&!T.value.print_error?`重新下发到打印机`:`下发打印机`),1)]),_:1},8,[`type`,`quaternary`]),T.value.print_sent_time?(d(),r(`span`,ft,[u(` 上次下发 `+s(y(W)(T.value.print_sent_time))+` `,1),T.value.print_job_id?(d(),r(b,{key:0},[u(`· 任务号 `+s(T.value.print_job_id),1)],64)):v(``,!0)])):v(``,!0)]),T.value.print_error?(d(),r(`p`,pt,` 上次下发失败：`+s(T.value.print_error),1)):v(``,!0)])):v(``,!0)])])]),i(`section`,mt,[i(`h3`,ht,[t[13]||=u(` 操作记录 `,-1),i(`span`,gt,s(E.value.length)+` 条`,1)]),E.value.length?(d(),l(y(Ce),{key:0},{default:h(()=>[(d(!0),r(b,null,g(E.value,e=>(d(),l(y(we),{key:e.id,time:y(W)(e.create_time),color:y(he)[e.action]},{default:h(()=>[i(`div`,_t,[i(`span`,vt,s(e.action_label),1),i(`span`,yt,s(e.actor_nickname??`（账号已注销）`),1),e.actor_role?(d(),l(ve,{key:0,role:e.actor_role},null,8,[`role`])):v(``,!0)]),e.detail?(d(),r(`p`,bt,s(e.detail),1)):v(``,!0)]),_:2},1032,[`time`,`color`]))),128))]),_:1})):(d(),r(`p`,xt,` 这一单暂无操作记录 · 留痕功能晚于订单本身，升级前的步骤不做倒推补录。 `))]),i(`p`,St,`最后更新 `+s(y(_e)(T.value.update_time)),1)],64)):(d(),r(`div`,De,[o(ye,{tone:`alarm`,code:`ERR / 404`,title:w.value===null?`订单不存在`:`无此订单 · 核对后重试`,hint:`地址栏里的编号可能有误，或这一单已经被撤回了`},null,8,[`title`])])),o(re,{show:Y.value!==null,order:Y.value,printers:q.value,onClose:t[2]||=e=>Y.value=null,onDispatched:Q},null,8,[`show`,`order`,`printers`])]))}});export{$ as default};