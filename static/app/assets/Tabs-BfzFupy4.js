import{At as e,H as t,Ht as n,J as r,K as i,Nt as a,Y as o,Z as s,bt as c,ct as l,dn as u,dt as d,gt as f,kt as p,ot as m,q as h,qt as g,rt as _,ut as v,yt as y}from"./endpoints-o6zgEJYN.js";import{A as b,C as x,Gt as S,Jt as C,Kt as w,Rt as T,T as E,Ut as D,Xt as O,Yt as k,Zt as A,_t as j,an as M,ft as N,ht as P,it as F,k as I,lt as ee,n as L,ot as R,rn as te,rt as ne,st as z,tt as B,v as re}from"./createLucideIcon-BgcK-14v.js";import{i as ie,n as ae,r as oe,t as V}from"./cssr-5PC8QTWR.js";import{t as se}from"./use-merged-state-C2JTXN1m.js";import{t as H}from"./ChevronRight-BnMcjcyl.js";import{t as U}from"./Add-BhYQnvKY.js";import{I as W,Tt as ce,W as le,Z as ue,g as de,jt as fe,mt as pe,rt as G}from"./index-Ci7_zaLo.js";var me=/\s/;function he(e){for(var t=e.length;t--&&me.test(e.charAt(t)););return t}var ge=/^\s+/;function _e(e){return e&&e.slice(0,he(e)+1).replace(ge,``)}var K=NaN,q=/^[-+]0x[0-9a-f]+$/i,J=/^0b[01]+$/i,Y=/^0o[0-7]+$/i,ve=parseInt;function ye(e){if(typeof e==`number`)return e;if(fe(e))return K;if(T(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=T(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=_e(e);var n=J.test(e);return n||Y.test(e)?ve(e.slice(2),n?2:8):q.test(e)?K:+e}var X=function(){return D.Date.now()},be=`Expected a function`,Z=Math.max,xe=Math.min;function Se(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(be);t=ye(t)||0,T(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Z(ye(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?xe(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=X();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(X())}function x(){var e=X(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ce=`Expected a function`;function Q(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ce);return T(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Se(e,t,{leading:r,maxWait:t,trailing:i})}var we=V(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[V(`&::-webkit-scrollbar`,{width:0,height:0})]),$=_({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=n(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let r=ee();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:ae,ssr:r}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return m(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=_({name:`ChevronLeft`,render(){return(()=>{let e=ne(`dfe229c2639b2082`);return e[0]||=r(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[r(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=P(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=_({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=l(Ee,null);return t||j(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return y(),s(`div`,{class:F([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:u(this.style)},[z(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...W(De,[`displayDirective`])},je=_({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:u,onBeforeLeaveRef:d,triggerRef:f,handleAdd:p,activateTab:m,handleClose:g}=l(Ee);return{trigger:f,mergedClosable:h(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&g(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++u.id;if(t!==n.value){let{value:i}=d;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&u.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:n,name:i,disabled:a,label:c,tab:l,value:u,mergedClosable:d,trigger:f,$slots:{default:p}}=this,m=c??l;return y(),s(`div`,{class:F(`${n}-tabs-tab-wrapper`)},[this.internalLeftPadded?(y(),s(`div`,{key:0,class:F(`${n}-tabs-tab-pad`)},null,2)):z(()=>null),(y(),s(`div`,v({key:i,"data-name":i,"data-disabled":a?!0:void 0},v({class:[`${n}-tabs-tab`,u===i&&`${n}-tabs-tab--active`,a&&`${n}-tabs-tab--disabled`,d&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:f===`click`?this.activateTab:void 0,onMouseenter:f===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[r(`span`,{class:F(`${n}-tabs-tab__label`)},[e?(y(),s(t,{key:0},[r(`div`,{class:F(`${n}-tabs-tab__height-placeholder`)},`\xA0`,2),(y(),o(ce,{clsPrefix:n},{default:()=>(y(),o(U))},1032,[`clsPrefix`]))],64)):(y(),s(t,{key:1},[p?(y(),s(t,{key:0},[z(()=>p())],64)):(y(),s(t,{key:1},[typeof m==`object`?(y(),s(t,{key:0},[z(()=>m)],64)):(y(),s(t,{key:1},[z(()=>le(m??i))],64))],64))],64))],2),d&&this.type===`card`?(y(),o(ue,{key:0,clsPrefix:n,class:F(`${n}-tabs-tab__close`),onClick:this.handleClose,disabled:a},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):z(()=>null)],16,ke))],2)}}),Me=w(`tabs`,`
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
 `)])]),Ne=_({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:s,handleClick:c}=this,l=n===`next`,d=r?l:i?!l:l;return y(),o(L,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:s,onClick:c,class:F([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(y(),o(ce,{clsPrefix:e,style:u(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>d?(y(),o(H,{key:1})):(y(),o(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Q,Fe={...I.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=_({name:`Tabs`,props:Fe,slots:Object,setup(t,{slots:r}){let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o,mergedRtlRef:s}=N(t),l=re(`Tabs`,s,i),u=h(()=>{let{placement:e}=t;return e===`start`?l?.value?`right`:`left`:e===`end`?l?.value?`left`:`right`:e}),m=I(`Tabs`,`-tabs`,Me,de,t,i),_=n(null),v=n(null),y=n(null),x=n(null),S=n(null),C=n(null),w=n(null),T=n(!0),D=n(!0),O=oe(t,[`labelSize`,`size`]),k=h(()=>O.value?O.value:o?.value?.Tabs?.size||`medium`),j=oe(t,[`activeName`,`value`]),M=n(j.value??t.defaultValue??(r.default?pe(r.default())[0]?.props?.name:null)),P=se(j,M),F={id:0},ee=h(()=>{if(t.justifyContent&&t.type!==`card`)return{display:`flex`,justifyContent:t.justifyContent}});p(P,()=>{F.id=0,z(),d(()=>{V()})});function L(){let{value:e}=P;return e===null?null:_.value?.querySelector(`[data-name="${e}"]`)}function R(e){if(t.type===`card`)return;let{value:n}=y;if(!n)return;let r=n.style.opacity===`0`;if(e){let a=`${i.value}-tabs-bar--disabled`,{barWidth:o}=t,s=u.value;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(ne([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(ne([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function te(){if(t.type===`card`)return;let{value:e}=y;e&&(e.style.opacity=`0`)}function ne(e){let{value:t}=y;if(t)for(let n of e)t.style[n]=``}function z(){if(t.type===`card`)return;let e=L();e?R(e):te()}function ae(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function V(){let e=[`top`,`bottom`].includes(u.value),n=L();if(n){if(e){let r=C.value?.$el;if(!r)return;ae(r,n,e,t.centerActiveTab)}else{let{value:r}=w;if(!r)return;ae(r,n,e,t.centerActiveTab)}}}let H=n(null),U=0,W=null;function ce(e){let t=H.value;if(t){U=e.getBoundingClientRect().height;let n=`${U}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};W?(r(),W(),W=null):W=r}}function le(e){let t=H.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(U,n)}px`};W?(W(),W=null,r()):W=r}}function ue(){let e=H.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let fe={value:[]},G=n(`next`);function me(e){let t=P.value,n=`next`;for(let r of fe.value){if(r===t)break;if(r===e){n=`prev`;break}}G.value=n,he(e)}function he(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&E(n,e),r&&E(r,e),i&&E(i,e),M.value=e}function ge(e){let{onClose:n}=t;n&&E(n,e)}function _e(e){if([`top`,`bottom`].includes(u.value)){let{value:t}=C;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!l?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=w;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let K=!0;function q(){let{value:e}=y;if(!e)return;K&&=!1;let t=`transition-disabled`;e.classList.add(t),z(),e.classList.remove(t)}let J=n(null);function Y({transitionDisabled:e}){let t=_.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=L();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}p([P],()=>{t.type===`segment`&&d(()=>{Y({transitionDisabled:!1})})}),f(()=>{t.type===`segment`&&Y({transitionDisabled:!0})});let ve=0;function ye(e){if(e.contentRect.width===0&&e.contentRect.height===0||ve===e.contentRect.width)return;ve=e.contentRect.width;let{type:n}=t;(n===`line`||n===`bar`)&&(K||t.justifyContent?.startsWith(`space`))&&q(),n!==`segment`&&$(we())}let X=Pe(ye,64);function be(){let{type:e}=t;e===`line`||e===`bar`?q():e===`segment`&&Y({transitionDisabled:!0})}p([()=>t.justifyContent,()=>t.size],()=>{d(()=>{(t.type===`line`||t.type===`bar`)&&q()})}),p([u,()=>l?.value],()=>{d(()=>{be(),$(we(),{instantly:!0})})}),p(()=>t.type,()=>{d(()=>{let e=v.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Z=n(!1);function xe(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=u.value;if(!Z.value)o===`top`||o===`bottom`?i<n&&(Z.value=!0):a<r&&(Z.value=!0);else{let{value:e}=S;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Z.value=!1):a-r>e.$el.offsetHeight&&(Z.value=!1)}$(C.value?.$el||null)}let Se=Pe(xe,64);function Ce(){let{onAdd:e}=t;e&&e()}let Q=n(!1);function we(){let e=u.value;return(e===`top`||e===`bottom`?C.value?.$el:w.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?x.value:null;n&&n.classList.add(`transition-disabled`);let r=u.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);T.value=i<=1,D.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;T.value=t<=1,D.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);c(Ee,{triggerRef:g(t,`trigger`),tabStyleRef:g(t,`tabStyle`),tabClassRef:g(t,`tabClass`),addTabStyleRef:g(t,`addTabStyle`),addTabClassRef:g(t,`addTabClass`),paneClassRef:g(t,`paneClass`),paneStyleRef:g(t,`paneStyle`),mergedClsPrefixRef:i,typeRef:g(t,`type`),closableRef:g(t,`closable`),valueRef:P,tabChangeIdRef:F,onBeforeLeaveRef:g(t,`onBeforeLeave`),activateTab:me,handleClose:ge,handleAdd:Ce}),ie(()=>{z(),V()}),e(()=>{let{value:e}=x;if(!e)return;let{value:t}=i,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;T.value?e.classList.remove(n):e.classList.add(n),D.value?e.classList.remove(r):e.classList.add(r)});let De={syncBarPosition:()=>{z()},scrollToCurrentTab:()=>{V()}},Oe=()=>{Y({transitionDisabled:!0})},ke=h(()=>{let{value:e}=k,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:p,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[A(`panePadding`,e)]:C,[A(`tabPadding`,r)]:w,[A(`tabPaddingVertical`,r)]:T,[A(`tabGap`,r)]:E,[A(`tabGap`,`${r}Vertical`)]:D,[A(`tabTextColor`,n)]:O,[A(`tabTextColorActive`,n)]:j,[A(`tabTextColorHover`,n)]:M,[A(`tabTextColorDisabled`,n)]:N,[A(`tabFontSize`,e)]:P},common:{cubicBezierEaseInOut:F}}=m.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":O,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":p,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":B(C,`left`),"--n-pane-padding-right":B(C,`right`),"--n-pane-padding-top":B(C,`top`),"--n-pane-padding-bottom":B(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=a?b(`tabs`,h(()=>`${k.value[0]}${t.type[0]}`),ke,t):void 0;return{mergedClsPrefix:i,mergedValue:P,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:H,tabsElRef:_,selfElRef:v,barElRef:y,addTabInstRef:S,xScrollInstRef:C,scrollWrapperElRef:x,addTabFixed:Z,tabWrapperStyle:ee,handleNavResize:X,mergedSize:k,handleScroll:Te,handleTabsResize:Se,cssVars:a?void 0:ke,themeClass:Ae?.themeClass,animationDirection:G,renderNameListRef:fe,yScrollElRef:w,handleSegmentResize:Oe,onAnimationBeforeLeave:ce,onAnimationEnter:le,onAnimationAfterEnter:ue,onRender:Ae?.onRender,startReachedRef:T,endReachedRef:D,isOverflow:Q,handleButtonClick:_e,mergedTheme:m,rtlEnabled:l,mergedPlacement:u,...De}},render(){let{mergedClsPrefix:e,type:n,mergedPlacement:i,addTabFixed:a,addable:c,mergedSize:l,renderNameListRef:d,onRender:f,paneWrapperClass:p,paneWrapperStyle:m,startReachedRef:h,endReachedRef:g,isOverflow:_,showScrollButton:b,handleButtonClick:S,mergedTheme:C,rtlEnabled:w,$slots:{default:T,prefix:E,suffix:D}}=this;f?.();let O=T?pe(T()).filter(e=>e.type.__TAB_PANE__===!0):[],k=T?pe(T()).filter(e=>e.type.__TAB__===!0):[],A=!k.length,j=n===`card`,M=n===`segment`,N=!j&&!M&&this.justifyContent;d.value=[];let P=()=>{let n=(y(),s(`div`,{style:u(this.tabWrapperStyle),class:F(`${e}-tabs-wrapper`)},[N?z(()=>null):(y(),s(`div`,{key:1,class:F(`${e}-tabs-scroll-padding`),style:u(i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),A?(y(),s(t,{key:2},[z(()=>O.map((e,t)=>(d.value.push(e.props.name),Be((y(),o(je,v(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!N||N===`center`||N===`start`||N===`end`)}),R(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(y(),s(t,{key:3},[z(()=>k.map((e,t)=>(d.value.push(e.props.name),Be(t!==0&&!N?ze(e):e))))],64)),!a&&c&&j?(y(),s(t,{key:4},[z(()=>Re(c,(A?O.length:k.length)!==0))],64)):z(()=>null),N?z(()=>null):(y(),s(`div`,{key:7,class:F(`${e}-tabs-scroll-padding`),style:u({width:`${this.tabsPadding}px`})},null,6)),j?z(()=>null):(y(),s(`div`,{key:9,ref:`barElRef`,class:F(`${e}-tabs-bar`)},null,2))],6));return y(),s(`div`,{ref:`tabsElRef`,class:F(`${e}-tabs-nav-scroll-content`)},[j&&c?(y(),o(G,{key:0,onResize:this.handleTabsResize},{default:()=>n},1032,[`onResize`])):(y(),s(t,{key:1},[z(()=>n)],64)),j?(y(),s(`div`,{key:2,class:F(`${e}-tabs-pad`)},null,2)):z(()=>null)],2)},I=M?`top`:i;return y(),s(`div`,{ref:`selfElRef`,class:F([`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${l}-size`,N&&`${e}-tabs--flex`,`${e}-tabs--${I}`,w&&`${e}-tabs--rtl`]),style:u(this.cssVars)},[r(`div`,{class:F([`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`])},[z(()=>x(E,t=>t&&(y(),s(`div`,{class:F(`${e}-tabs-nav__prefix`)},[z(()=>t)],2)))),M?(y(),o(G,{key:0,onResize:this.handleSegmentResize},{default:()=>(y(),s(`div`,{class:F(`${e}-tabs-rail`),ref:`tabsElRef`},[r(`div`,{class:F(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[r(`div`,{class:F(`${e}-tabs-wrapper`)},[r(`div`,{class:F(`${e}-tabs-tab`)},null,2)],2)],2),A?(y(),s(t,{key:0},[z(()=>O.map((e,t)=>(d.value.push(e.props.name),y(),o(je,v(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),R(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(y(),s(t,{key:1},[z(()=>k.map((e,t)=>(d.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(y(),s(t,{key:1},[z(()=>b&&_&&(y(),o(Ne,{mergedClsPrefix:e,type:`prev`,vertical:I===`left`||I===`right`,disabled:h,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(y(),o(G,{onResize:this.handleNavResize},{default:()=>(y(),s(`div`,{class:F(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(y(),o($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:P},1032,[`onScroll`])):(y(),s(`div`,{key:1,class:F(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[z(()=>P())],42,[`onScroll`]))],2))},1032,[`onResize`])),z(()=>b&&_&&(y(),o(Ne,{mergedClsPrefix:e,type:`next`,vertical:I===`left`||I===`right`,disabled:g,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),a&&c&&j?(y(),s(t,{key:2},[z(()=>Re(c,!0))],64)):z(()=>null),z(()=>x(D,t=>t&&(y(),s(`div`,{class:F(`${e}-tabs-nav__suffix`)},[z(()=>t)],2))))],2),z(()=>A&&(this.animated&&(I===`top`||I===`bottom`)?(y(),s(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:u(m),class:F([`${e}-tabs-pane-wrapper`,p])},[z(()=>Le(O,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(O,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,n,r,i,s,c){let l=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":o}=e.props,s=e=>i===e||o===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||s(`show`)||s(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!s(`if`);l.push(t?a(e,[[M,c]]):e)}}),c?(y(),o(te,{name:`${c}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:s},{default:()=>l},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):l}function Re(e,t){return y(),o(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=i(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};