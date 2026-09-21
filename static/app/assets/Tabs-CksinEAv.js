import{At as e,Dt as t,Et as n,G as r,J as i,K as a,U as o,W as s,Wt as c,_t as l,at as u,cn as d,ct as f,et as p,gt as m,pt as h,rt as g,st as _,z as v,zt as y}from"./endpoints-CdlTyxMC.js";import{A as b,C as x,Gt as S,Jt as C,Kt as w,Rt as T,T as E,Ut as D,Xt as O,Yt as k,Zt as A,_t as j,an as M,ft as N,ht as P,it as F,k as I,lt as ee,n as L,ot as te,rn as ne,rt as re,st as R,tt as z,v as ie}from"./createLucideIcon-DLecE6ZQ.js";import{r as B}from"./Scrollbar-sQP4-hqP.js";import{i as ae,n as V,r as oe,t as H}from"./cssr-DavXoBF8.js";import{t as se}from"./use-merged-state-CNc-nLwj.js";import{t as U}from"./ChevronRight-W9Rq3u0s.js";import{t as W}from"./Add-ChCd_Kez.js";import{I as ce,St as le,W as ue,Z as de,_t as G,ct as fe,g as pe}from"./index-DoHYFKo9.js";var me=/\s/;function he(e){for(var t=e.length;t--&&me.test(e.charAt(t)););return t}var ge=/^\s+/;function _e(e){return e&&e.slice(0,he(e)+1).replace(ge,``)}var K=NaN,q=/^[-+]0x[0-9a-f]+$/i,J=/^0b[01]+$/i,Y=/^0o[0-7]+$/i,ve=parseInt;function ye(e){if(typeof e==`number`)return e;if(le(e))return K;if(T(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=T(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=_e(e);var n=J.test(e);return n||Y.test(e)?ve(e.slice(2),n?2:8):q.test(e)?K:+e}var X=function(){return D.Date.now()},be=`Expected a function`,Z=Math.max,xe=Math.min;function Se(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(be);t=ye(t)||0,T(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Z(ye(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?xe(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=X();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(X())}function x(){var e=X(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ce=`Expected a function`;function Q(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ce);return T(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Se(e,t,{leading:r,maxWait:t,trailing:i})}var we=H(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[H(`&::-webkit-scrollbar`,{width:0,height:0})]),$=p({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=y(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=ee();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:V,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return g(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=p({name:`ChevronLeft`,render(){return(()=>{let e=re(`dfe229c2639b2082`);return e[0]||=r(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[r(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=P(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=p({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=u(Ee,null);return t||j(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return m(),i(`div`,{class:F([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:d(this.style)},[R(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...ce(De,[`displayDirective`])},je=p({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:d,onBeforeLeaveRef:f,triggerRef:p,handleAdd:m,activateTab:h,handleClose:g}=u(Ee);return{trigger:p,mergedClosable:s(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:c,addTabClass:l,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&g(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){m();return}let{name:t}=e,r=++d.id;if(t!==n.value){let{value:i}=f;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&d.id===r&&h(t)}):h(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:o,label:s,tab:c,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=s??c;return m(),i(`div`,{class:F(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(m(),i(`div`,{key:0,class:F(`${t}-tabs-tab-pad`)},null,2)):R(()=>null),(m(),i(`div`,_({key:n,"data-name":n,"data-disabled":o?!0:void 0},_({class:[`${t}-tabs-tab`,l===n&&`${t}-tabs-tab--active`,o&&`${t}-tabs-tab--disabled`,u&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[r(`span`,{class:F(`${t}-tabs-tab__label`)},[e?(m(),i(v,{key:0},[r(`div`,{class:F(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(m(),a(G,{clsPrefix:t},{default:()=>(m(),a(W))},1032,[`clsPrefix`]))],64)):(m(),i(v,{key:1},[f?(m(),i(v,{key:0},[R(()=>f())],64)):(m(),i(v,{key:1},[typeof p==`object`?(m(),i(v,{key:0},[R(()=>p)],64)):(m(),i(v,{key:1},[R(()=>ue(p??n))],64))],64))],64))],2),u&&this.type===`card`?(m(),a(de,{key:0,clsPrefix:t,class:F(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:o},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):R(()=>null)],16,ke))],2)}}),Me=w(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[S(`&.transition-disabled`,[w(`tabs-tab`,`
 transition: none !important;
 `),w(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),w(`tabs-tab-pad`,`
 transition: none !important;
 `)]),k(`segment-type`,[w(`tabs-rail`,[S(`&.transition-disabled`,[w(`tabs-capsule`,`
 transition: none;
 `)])])]),k(`top`,[w(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),k(`left`,[w(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),k(`left, right`,`
 flex-direction: row;
 `,[w(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),w(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),k(`right`,`
 flex-direction: row-reverse;
 `,[w(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),w(`tabs-bar`,`
 left: 0;
 `)]),k(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[w(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),w(`tabs-bar`,`
 top: 0;
 `)]),w(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[w(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),w(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[w(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[k(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),k(`flex`,[w(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[w(`tabs-wrapper`,`
 width: 100%;
 `,[w(`tabs-tab`,`
 margin-right: 0;
 `)])])]),w(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[C(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),C(`prefix`,`padding-right: 16px;`),C(`suffix`,`padding-left: 16px;`)]),k(`top, bottom`,[S(`>`,[w(`tabs-nav`,[w(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),S(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),k(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),k(`shadow-end`,[S(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),k(`left, right`,[w(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),S(`>`,[w(`tabs-nav`,[w(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),S(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),k(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),k(`shadow-end`,[S(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),w(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[w(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[S(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),S(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),S(`&.transition-disabled`,[S(`&::before, &::after`,`
 transition: none;
 `)])]),w(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),w(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),w(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),w(`tabs-tab`,`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[k(`disabled`,{cursor:`not-allowed`}),C(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),C(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),w(`tabs-bar`,`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[S(`&.transition-disabled`,`
 transition: none;
 `),k(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),w(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),w(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[S(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),S(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),S(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),S(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),S(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),w(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),k(`line-type, bar-type`,[w(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[S(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),k(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),k(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),w(`tabs-nav`,[C(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),w(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),k(`line-type`,[k(`top`,[C(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),w(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),w(`tabs-bar`,`
 bottom: -1px;
 `)]),k(`left`,[C(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),w(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),w(`tabs-bar`,`
 right: -1px;
 `)]),k(`right`,[C(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),w(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),w(`tabs-bar`,`
 left: -1px;
 `)]),k(`bottom`,[C(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),w(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),w(`tabs-bar`,`
 top: -1px;
 `)]),C(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),w(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),w(`tabs-bar`,`
 border-radius: 0;
 `)]),k(`card-type`,[C(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),w(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),w(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),w(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[k(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[C(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),O(`disabled`,[S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),k(`closable`,`padding-inline-end: 8px;`),k(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),k(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),k(`left, right`,`
 flex-direction: column; 
 `,[C(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),w(`tabs-wrapper`,`
 flex-direction: column;
 `),w(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[w(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),k(`top`,[k(`card-type`,[w(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),C(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),w(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[k(`active`,`
 border-bottom: 1px solid #0000;
 `)]),w(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),w(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),k(`left`,[k(`card-type`,[w(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),C(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),w(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[k(`active`,`
 border-right: 1px solid #0000;
 `)]),w(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),w(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),k(`right`,[k(`card-type`,[w(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),C(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),w(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[k(`active`,`
 border-left: 1px solid #0000;
 `)]),w(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),w(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),k(`bottom`,[k(`card-type`,[w(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),C(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),w(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[k(`active`,`
 border-top: 1px solid #0000;
 `)]),w(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),w(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),w(`tabs-scroll-button`,[k(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),k(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),k(`up`,`
 padding-bottom: 10px;
 `),k(`down`,`
 padding-top: 10px;
 `)])]),Ne=p({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:o,themeOverrides:s,handleClick:c}=this,l=n===`next`,u=r?l:i?!l:l;return m(),a(L,{text:!0,disabled:t,size:`small`,theme:o,themeOverrides:s,onClick:c,class:F([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(m(),a(G,{clsPrefix:e,style:d(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>u?(m(),a(U,{key:1})):(m(),a(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Q,Fe={...I.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=p({name:`Tabs`,props:Fe,slots:Object,setup(e,{slots:r}){let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o,mergedRtlRef:u}=N(e),d=ie(`Tabs`,u,i),p=s(()=>{let{placement:t}=e;return t===`start`?d?.value?`right`:`left`:t===`end`?d?.value?`left`:`right`:t}),m=I(`Tabs`,`-tabs`,Me,pe,e,i),g=y(null),_=y(null),v=y(null),x=y(null),S=y(null),C=y(null),w=y(null),T=y(!0),D=y(!0),O=oe(e,[`labelSize`,`size`]),k=s(()=>O.value?O.value:o?.value?.Tabs?.size||`medium`),j=oe(e,[`activeName`,`value`]),M=y(j.value??e.defaultValue??(r.default?fe(r.default())[0]?.props?.name:null)),P=se(j,M),F={id:0},ee=s(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});n(P,()=>{F.id=0,R(),f(()=>{V()})});function L(){let{value:e}=P;return e===null?null:g.value?.querySelector(`[data-name="${e}"]`)}function te(t){if(e.type===`card`)return;let{value:n}=v;if(!n)return;let r=n.style.opacity===`0`;if(t){let a=`${i.value}-tabs-bar--disabled`,{barWidth:o}=e,s=p.value;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(re([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(re([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function ne(){if(e.type===`card`)return;let{value:t}=v;t&&(t.style.opacity=`0`)}function re(e){let{value:t}=v;if(t)for(let n of e)t.style[n]=``}function R(){if(e.type===`card`)return;let t=L();t?te(t):ne()}function B(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function V(){let t=[`top`,`bottom`].includes(p.value),n=L();if(n){if(t){let r=C.value?.$el;if(!r)return;B(r,n,t,e.centerActiveTab)}else{let{value:r}=w;if(!r)return;B(r,n,t,e.centerActiveTab)}}}let H=y(null),U=0,W=null;function ce(e){let t=H.value;if(t){U=e.getBoundingClientRect().height;let n=`${U}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};W?(r(),W(),W=null):W=r}}function le(e){let t=H.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(U,n)}px`};W?(W(),W=null,r()):W=r}}function ue(){let t=H.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let de={value:[]},G=y(`next`);function me(e){let t=P.value,n=`next`;for(let r of de.value){if(r===t)break;if(r===e){n=`prev`;break}}G.value=n,he(e)}function he(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&E(n,t),r&&E(r,t),i&&E(i,t),M.value=t}function ge(t){let{onClose:n}=e;n&&E(n,t)}function _e(e){if([`top`,`bottom`].includes(p.value)){let{value:t}=C;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!d?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=w;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let K=!0;function q(){let{value:e}=v;if(!e)return;K&&=!1;let t=`transition-disabled`;e.classList.add(t),R(),e.classList.remove(t)}let J=y(null);function Y({transitionDisabled:e}){let t=g.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=L();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}n([P],()=>{e.type===`segment`&&f(()=>{Y({transitionDisabled:!1})})}),h(()=>{e.type===`segment`&&Y({transitionDisabled:!0})});let ve=0;function ye(t){if(t.contentRect.width===0&&t.contentRect.height===0||ve===t.contentRect.width)return;ve=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(K||e.justifyContent?.startsWith(`space`))&&q(),n!==`segment`&&$(we())}let X=Pe(ye,64);function be(){let{type:t}=e;t===`line`||t===`bar`?q():t===`segment`&&Y({transitionDisabled:!0})}n([()=>e.justifyContent,()=>e.size],()=>{f(()=>{(e.type===`line`||e.type===`bar`)&&q()})}),n([p,()=>d?.value],()=>{f(()=>{be(),$(we(),{instantly:!0})})}),n(()=>e.type,()=>{f(()=>{let e=_.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Z=y(!1);function xe(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=p.value;if(!Z.value)o===`top`||o===`bottom`?i<n&&(Z.value=!0):a<r&&(Z.value=!0);else{let{value:e}=S;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Z.value=!1):a-r>e.$el.offsetHeight&&(Z.value=!1)}$(C.value?.$el||null)}let Se=Pe(xe,64);function Ce(){let{onAdd:t}=e;t&&t()}let Q=y(!1);function we(){let e=p.value;return(e===`top`||e===`bottom`?C.value?.$el:w.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?x.value:null;n&&n.classList.add(`transition-disabled`);let r=p.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);T.value=i<=1,D.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;T.value=t<=1,D.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);l(Ee,{triggerRef:c(e,`trigger`),tabStyleRef:c(e,`tabStyle`),tabClassRef:c(e,`tabClass`),addTabStyleRef:c(e,`addTabStyle`),addTabClassRef:c(e,`addTabClass`),paneClassRef:c(e,`paneClass`),paneStyleRef:c(e,`paneStyle`),mergedClsPrefixRef:i,typeRef:c(e,`type`),closableRef:c(e,`closable`),valueRef:P,tabChangeIdRef:F,onBeforeLeaveRef:c(e,`onBeforeLeave`),activateTab:me,handleClose:ge,handleAdd:Ce}),ae(()=>{R(),V()}),t(()=>{let{value:e}=x;if(!e)return;let{value:t}=i,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;T.value?e.classList.remove(n):e.classList.add(n),D.value?e.classList.remove(r):e.classList.add(r)});let De={syncBarPosition:()=>{R()},scrollToCurrentTab:()=>{V()}},Oe=()=>{Y({transitionDisabled:!0})},ke=s(()=>{let{value:t}=k,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:p,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[A(`panePadding`,t)]:C,[A(`tabPadding`,r)]:w,[A(`tabPaddingVertical`,r)]:T,[A(`tabGap`,r)]:E,[A(`tabGap`,`${r}Vertical`)]:D,[A(`tabTextColor`,n)]:O,[A(`tabTextColorActive`,n)]:j,[A(`tabTextColorHover`,n)]:M,[A(`tabTextColorDisabled`,n)]:N,[A(`tabFontSize`,t)]:P},common:{cubicBezierEaseInOut:F}}=m.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":O,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":p,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":z(C,`left`),"--n-pane-padding-right":z(C,`right`),"--n-pane-padding-top":z(C,`top`),"--n-pane-padding-bottom":z(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=a?b(`tabs`,s(()=>`${k.value[0]}${e.type[0]}`),ke,e):void 0;return{mergedClsPrefix:i,mergedValue:P,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:H,tabsElRef:g,selfElRef:_,barElRef:v,addTabInstRef:S,xScrollInstRef:C,scrollWrapperElRef:x,addTabFixed:Z,tabWrapperStyle:ee,handleNavResize:X,mergedSize:k,handleScroll:Te,handleTabsResize:Se,cssVars:a?void 0:ke,themeClass:Ae?.themeClass,animationDirection:G,renderNameListRef:de,yScrollElRef:w,handleSegmentResize:Oe,onAnimationBeforeLeave:ce,onAnimationEnter:le,onAnimationAfterEnter:ue,onRender:Ae?.onRender,startReachedRef:T,endReachedRef:D,isOverflow:Q,handleButtonClick:_e,mergedTheme:m,rtlEnabled:d,mergedPlacement:p,...De}},render(){let{mergedClsPrefix:e,type:t,mergedPlacement:n,addTabFixed:o,addable:s,mergedSize:c,renderNameListRef:l,onRender:u,paneWrapperClass:f,paneWrapperStyle:p,startReachedRef:h,endReachedRef:g,isOverflow:y,showScrollButton:b,handleButtonClick:S,mergedTheme:C,rtlEnabled:w,$slots:{default:T,prefix:E,suffix:D}}=this;u?.();let O=T?fe(T()).filter(e=>e.type.__TAB_PANE__===!0):[],k=T?fe(T()).filter(e=>e.type.__TAB__===!0):[],A=!k.length,j=t===`card`,M=t===`segment`,N=!j&&!M&&this.justifyContent;l.value=[];let P=()=>{let t=(m(),i(`div`,{style:d(this.tabWrapperStyle),class:F(`${e}-tabs-wrapper`)},[N?R(()=>null):(m(),i(`div`,{key:1,class:F(`${e}-tabs-scroll-padding`),style:d(n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),A?(m(),i(v,{key:2},[R(()=>O.map((e,t)=>(l.value.push(e.props.name),Be((m(),a(je,_(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!N||N===`center`||N===`start`||N===`end`)}),te(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(m(),i(v,{key:3},[R(()=>k.map((e,t)=>(l.value.push(e.props.name),Be(t!==0&&!N?ze(e):e))))],64)),!o&&s&&j?(m(),i(v,{key:4},[R(()=>Re(s,(A?O.length:k.length)!==0))],64)):R(()=>null),N?R(()=>null):(m(),i(`div`,{key:7,class:F(`${e}-tabs-scroll-padding`),style:d({width:`${this.tabsPadding}px`})},null,6)),j?R(()=>null):(m(),i(`div`,{key:9,ref:`barElRef`,class:F(`${e}-tabs-bar`)},null,2))],6));return m(),i(`div`,{ref:`tabsElRef`,class:F(`${e}-tabs-nav-scroll-content`)},[j&&s?(m(),a(B,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(m(),i(v,{key:1},[R(()=>t)],64)),j?(m(),i(`div`,{key:2,class:F(`${e}-tabs-pad`)},null,2)):R(()=>null)],2)},I=M?`top`:n;return m(),i(`div`,{ref:`selfElRef`,class:F([`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${c}-size`,N&&`${e}-tabs--flex`,`${e}-tabs--${I}`,w&&`${e}-tabs--rtl`]),style:d(this.cssVars)},[r(`div`,{class:F([`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`])},[R(()=>x(E,t=>t&&(m(),i(`div`,{class:F(`${e}-tabs-nav__prefix`)},[R(()=>t)],2)))),M?(m(),a(B,{key:0,onResize:this.handleSegmentResize},{default:()=>(m(),i(`div`,{class:F(`${e}-tabs-rail`),ref:`tabsElRef`},[r(`div`,{class:F(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[r(`div`,{class:F(`${e}-tabs-wrapper`)},[r(`div`,{class:F(`${e}-tabs-tab`)},null,2)],2)],2),A?(m(),i(v,{key:0},[R(()=>O.map((e,t)=>(l.value.push(e.props.name),m(),a(je,_(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),te(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(m(),i(v,{key:1},[R(()=>k.map((e,t)=>(l.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(m(),i(v,{key:1},[R(()=>b&&y&&(m(),a(Ne,{mergedClsPrefix:e,type:`prev`,vertical:I===`left`||I===`right`,disabled:h,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(m(),a(B,{onResize:this.handleNavResize},{default:()=>(m(),i(`div`,{class:F(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(m(),a($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:P},1032,[`onScroll`])):(m(),i(`div`,{key:1,class:F(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[R(()=>P())],42,[`onScroll`]))],2))},1032,[`onResize`])),R(()=>b&&y&&(m(),a(Ne,{mergedClsPrefix:e,type:`next`,vertical:I===`left`||I===`right`,disabled:g,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),o&&s&&j?(m(),i(v,{key:2},[R(()=>Re(s,!0))],64)):R(()=>null),R(()=>x(D,t=>t&&(m(),i(`div`,{class:F(`${e}-tabs-nav__suffix`)},[R(()=>t)],2))))],2),R(()=>A&&(this.animated&&(I===`top`||I===`bottom`)?(m(),i(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:d(p),class:F([`${e}-tabs-pane-wrapper`,f])},[R(()=>Le(O,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(O,this.mergedValue,this.renderedNames)))],6)}});function Le(t,n,r,i,o,s,c){let l=[];return t.forEach(t=>{let{name:i,displayDirective:a,"display-directive":o}=t.props,s=e=>a===e||o===e,c=n===i;if(t.key!==void 0&&(t.key=i),c||s(`show`)||s(`show:lazy`)&&r.has(i)){r.has(i)||r.add(i);let n=!s(`if`);l.push(n?e(t,[[M,c]]):t)}}),c?(m(),a(ne,{name:`${c}-transition`,onBeforeLeave:i,onEnter:o,onAfterEnter:s},{default:()=>l},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):l}function Re(e,t){return m(),a(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=o(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};