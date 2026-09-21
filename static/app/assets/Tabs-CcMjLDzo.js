import{H as e,Ht as t,K as n,L as r,Lt as i,Ot as a,Q as o,Tt as s,U as c,V as l,W as u,at as d,dt as f,ht as p,mt as m,on as h,ot as g,rt as _,tt as v,wt as y}from"./endpoints-BhTSb8lj.js";import{A as b,C as x,Gt as S,Jt as C,Kt as w,Rt as T,T as E,Ut as D,Xt as O,Yt as k,Zt as A,_t as j,an as M,ft as N,ht as P,it as F,k as I,lt as ee,n as L,ot as te,rn as ne,rt as re,st as R,tt as z,v as ie}from"./createLucideIcon-Byg0Q1WZ.js";import{r as B}from"./Scrollbar-Cxvob6a1.js";import{i as ae,n as V,r as oe,t as H}from"./cssr-BReH0P_Z.js";import{t as se}from"./use-merged-state-D-29Gt4l.js";import{t as U}from"./ChevronRight-CVANZsAO.js";import{t as W}from"./Add-0BPYlYzB.js";import{I as ce,St as le,W as ue,Z as de,_t as G,ct as fe,g as pe}from"./index-Cbuc1RP1.js";var me=/\s/;function he(e){for(var t=e.length;t--&&me.test(e.charAt(t)););return t}var ge=/^\s+/;function _e(e){return e&&e.slice(0,he(e)+1).replace(ge,``)}var K=NaN,q=/^[-+]0x[0-9a-f]+$/i,J=/^0b[01]+$/i,Y=/^0o[0-7]+$/i,ve=parseInt;function ye(e){if(typeof e==`number`)return e;if(le(e))return K;if(T(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=T(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=_e(e);var n=J.test(e);return n||Y.test(e)?ve(e.slice(2),n?2:8):q.test(e)?K:+e}var X=function(){return D.Date.now()},be=`Expected a function`,Z=Math.max,xe=Math.min;function Se(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(be);t=ye(t)||0,T(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Z(ye(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?xe(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=X();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(X())}function x(){var e=X(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ce=`Expected a function`;function Q(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ce);return T(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Se(e,t,{leading:r,maxWait:t,trailing:i})}var we=H(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[H(`&::-webkit-scrollbar`,{width:0,height:0})]),$=o({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=i(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=ee();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:V,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return v(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=o({name:`ChevronLeft`,render(){return(()=>{let e=re(`dfe229c2639b2082`);return e[0]||=c(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[c(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=P(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=o({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=_(Ee,null);return t||j(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return m(),n(`div`,{class:F([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:h(this.style)},[R(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...ce(De,[`displayDirective`])},je=o({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(t){let{mergedClsPrefixRef:n,valueRef:r,typeRef:i,closableRef:a,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:u,onBeforeLeaveRef:d,triggerRef:f,handleAdd:p,activateTab:m,handleClose:h}=_(Ee);return{trigger:f,mergedClosable:e(()=>{if(t.internalAddable)return!1;let{closable:e}=t;return e===void 0?a.value:e}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:n,value:r,type:i,handleClose(e){e.stopPropagation(),!t.disabled&&h(t.name)},activateTab(){if(t.disabled)return;if(t.internalAddable){p();return}let{name:e}=t,n=++u.id;if(e!==r.value){let{value:i}=d;i?Promise.resolve(i(t.name,r.value)).then(t=>{t&&u.id===n&&m(e)}):m(e)}}}},render(){let{internalAddable:e,clsPrefix:t,name:i,disabled:a,label:o,tab:s,value:l,mergedClosable:f,trigger:p,$slots:{default:h}}=this,g=o??s;return m(),n(`div`,{class:F(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(m(),n(`div`,{key:0,class:F(`${t}-tabs-tab-pad`)},null,2)):R(()=>null),(m(),n(`div`,d({key:i,"data-name":i,"data-disabled":a?!0:void 0},d({class:[`${t}-tabs-tab`,l===i&&`${t}-tabs-tab--active`,a&&`${t}-tabs-tab--disabled`,f&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:p===`click`?this.activateTab:void 0,onMouseenter:p===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[c(`span`,{class:F(`${t}-tabs-tab__label`)},[e?(m(),n(r,{key:0},[c(`div`,{class:F(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(m(),u(G,{clsPrefix:t},{default:()=>(m(),u(W))},1032,[`clsPrefix`]))],64)):(m(),n(r,{key:1},[h?(m(),n(r,{key:0},[R(()=>h())],64)):(m(),n(r,{key:1},[typeof g==`object`?(m(),n(r,{key:0},[R(()=>g)],64)):(m(),n(r,{key:1},[R(()=>ue(g??i))],64))],64))],64))],2),f&&this.type===`card`?(m(),u(de,{key:0,clsPrefix:t,class:F(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:a},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):R(()=>null)],16,ke))],2)}}),Me=w(`tabs`,`
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
 `)])]),Ne=o({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:s}=this,c=n===`next`,l=r?c:i?!c:c;return m(),u(L,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:s,class:F([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(m(),u(G,{clsPrefix:e,style:h(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>l?(m(),u(U,{key:1})):(m(),u(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Q,Fe={...I.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=o({name:`Tabs`,props:Fe,slots:Object,setup(n,{slots:r}){let{mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedComponentPropsRef:c,mergedRtlRef:l}=N(n),u=ie(`Tabs`,l,a),d=e(()=>{let{placement:e}=n;return e===`start`?u?.value?`right`:`left`:e===`end`?u?.value?`left`:`right`:e}),m=I(`Tabs`,`-tabs`,Me,pe,n,a),h=i(null),_=i(null),v=i(null),x=i(null),S=i(null),C=i(null),w=i(null),T=i(!0),D=i(!0),O=oe(n,[`labelSize`,`size`]),k=e(()=>O.value?O.value:c?.value?.Tabs?.size||`medium`),j=oe(n,[`activeName`,`value`]),M=i(j.value??n.defaultValue??(r.default?fe(r.default())[0]?.props?.name:null)),P=se(j,M),F={id:0},ee=e(()=>{if(n.justifyContent&&n.type!==`card`)return{display:`flex`,justifyContent:n.justifyContent}});y(P,()=>{F.id=0,R(),g(()=>{V()})});function L(){let{value:e}=P;return e===null?null:h.value?.querySelector(`[data-name="${e}"]`)}function te(e){if(n.type===`card`)return;let{value:t}=v;if(!t)return;let r=t.style.opacity===`0`;if(e){let i=`${a.value}-tabs-bar--disabled`,{barWidth:o}=n,s=d.value;if(e.dataset.disabled===`true`?t.classList.add(i):t.classList.remove(i),[`top`,`bottom`].includes(s)){if(re([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let n=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;t.style.left=`${n}px`,t.style.maxWidth=`${o}px`}else t.style.left=`${e.offsetLeft}px`,t.style.maxWidth=`${e.offsetWidth}px`;t.style.width=`8192px`,r&&(t.style.transition=`none`),t.offsetWidth,r&&(t.style.transition=``,t.style.opacity=`1`)}else{if(re([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let n=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;t.style.top=`${n}px`,t.style.maxHeight=`${o}px`}else t.style.top=`${e.offsetTop}px`,t.style.maxHeight=`${e.offsetHeight}px`;t.style.height=`8192px`,r&&(t.style.transition=`none`),t.offsetHeight,r&&(t.style.transition=``,t.style.opacity=`1`)}}}function ne(){if(n.type===`card`)return;let{value:e}=v;e&&(e.style.opacity=`0`)}function re(e){let{value:t}=v;if(t)for(let n of e)t.style[n]=``}function R(){if(n.type===`card`)return;let e=L();e?te(e):ne()}function B(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function V(){let e=[`top`,`bottom`].includes(d.value),t=L();if(t){if(e){let r=C.value?.$el;if(!r)return;B(r,t,e,n.centerActiveTab)}else{let{value:r}=w;if(!r)return;B(r,t,e,n.centerActiveTab)}}}let H=i(null),U=0,W=null;function ce(e){let t=H.value;if(t){U=e.getBoundingClientRect().height;let n=`${U}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};W?(r(),W(),W=null):W=r}}function le(e){let t=H.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(U,n)}px`};W?(W(),W=null,r()):W=r}}function ue(){let e=H.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:t}=n;if(typeof t==`string`)e.style.cssText=t;else if(t){let{maxHeight:n,height:r}=t;n!==void 0&&(e.style.maxHeight=n),r!==void 0&&(e.style.height=r)}}}let de={value:[]},G=i(`next`);function me(e){let t=P.value,n=`next`;for(let r of de.value){if(r===t)break;if(r===e){n=`prev`;break}}G.value=n,he(e)}function he(e){let{onActiveNameChange:t,onUpdateValue:r,"onUpdate:value":i}=n;t&&E(t,e),r&&E(r,e),i&&E(i,e),M.value=e}function ge(e){let{onClose:t}=n;t&&E(t,e)}function _e(e){if([`top`,`bottom`].includes(d.value)){let{value:t}=C;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!u?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=w;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let K=!0;function q(){let{value:e}=v;if(!e)return;K&&=!1;let t=`transition-disabled`;e.classList.add(t),R(),e.classList.remove(t)}let J=i(null);function Y({transitionDisabled:e}){let t=h.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=L();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}y([P],()=>{n.type===`segment`&&g(()=>{Y({transitionDisabled:!1})})}),f(()=>{n.type===`segment`&&Y({transitionDisabled:!0})});let ve=0;function ye(e){if(e.contentRect.width===0&&e.contentRect.height===0||ve===e.contentRect.width)return;ve=e.contentRect.width;let{type:t}=n;(t===`line`||t===`bar`)&&(K||n.justifyContent?.startsWith(`space`))&&q(),t!==`segment`&&$(we())}let X=Pe(ye,64);function be(){let{type:e}=n;e===`line`||e===`bar`?q():e===`segment`&&Y({transitionDisabled:!0})}y([()=>n.justifyContent,()=>n.size],()=>{g(()=>{(n.type===`line`||n.type===`bar`)&&q()})}),y([d,()=>u?.value],()=>{g(()=>{be(),$(we(),{instantly:!0})})}),y(()=>n.type,()=>{g(()=>{let e=_.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Z=i(!1);function xe(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=d.value;if(!Z.value)o===`top`||o===`bottom`?i<n&&(Z.value=!0):a<r&&(Z.value=!0);else{let{value:e}=S;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Z.value=!1):a-r>e.$el.offsetHeight&&(Z.value=!1)}$(C.value?.$el||null)}let Se=Pe(xe,64);function Ce(){let{onAdd:e}=n;e&&e()}let Q=i(!1);function we(){let e=d.value;return(e===`top`||e===`bottom`?C.value?.$el:w.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?x.value:null;n&&n.classList.add(`transition-disabled`);let r=d.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);T.value=i<=1,D.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;T.value=t<=1,D.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);p(Ee,{triggerRef:t(n,`trigger`),tabStyleRef:t(n,`tabStyle`),tabClassRef:t(n,`tabClass`),addTabStyleRef:t(n,`addTabStyle`),addTabClassRef:t(n,`addTabClass`),paneClassRef:t(n,`paneClass`),paneStyleRef:t(n,`paneStyle`),mergedClsPrefixRef:a,typeRef:t(n,`type`),closableRef:t(n,`closable`),valueRef:P,tabChangeIdRef:F,onBeforeLeaveRef:t(n,`onBeforeLeave`),activateTab:me,handleClose:ge,handleAdd:Ce}),ae(()=>{R(),V()}),s(()=>{let{value:e}=x;if(!e)return;let{value:t}=a,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;T.value?e.classList.remove(n):e.classList.add(n),D.value?e.classList.remove(r):e.classList.add(r)});let De={syncBarPosition:()=>{R()},scrollToCurrentTab:()=>{V()}},Oe=()=>{Y({transitionDisabled:!0})},ke=e(()=>{let{value:e}=k,{type:t}=n,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[t]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:p,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[A(`panePadding`,e)]:C,[A(`tabPadding`,r)]:w,[A(`tabPaddingVertical`,r)]:T,[A(`tabGap`,r)]:E,[A(`tabGap`,`${r}Vertical`)]:D,[A(`tabTextColor`,t)]:O,[A(`tabTextColorActive`,t)]:j,[A(`tabTextColorHover`,t)]:M,[A(`tabTextColorDisabled`,t)]:N,[A(`tabFontSize`,e)]:P},common:{cubicBezierEaseInOut:F}}=m.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":O,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":p,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":z(C,`left`),"--n-pane-padding-right":z(C,`right`),"--n-pane-padding-top":z(C,`top`),"--n-pane-padding-bottom":z(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=o?b(`tabs`,e(()=>`${k.value[0]}${n.type[0]}`),ke,n):void 0;return{mergedClsPrefix:a,mergedValue:P,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:H,tabsElRef:h,selfElRef:_,barElRef:v,addTabInstRef:S,xScrollInstRef:C,scrollWrapperElRef:x,addTabFixed:Z,tabWrapperStyle:ee,handleNavResize:X,mergedSize:k,handleScroll:Te,handleTabsResize:Se,cssVars:o?void 0:ke,themeClass:Ae?.themeClass,animationDirection:G,renderNameListRef:de,yScrollElRef:w,handleSegmentResize:Oe,onAnimationBeforeLeave:ce,onAnimationEnter:le,onAnimationAfterEnter:ue,onRender:Ae?.onRender,startReachedRef:T,endReachedRef:D,isOverflow:Q,handleButtonClick:_e,mergedTheme:m,rtlEnabled:u,mergedPlacement:d,...De}},render(){let{mergedClsPrefix:e,type:t,mergedPlacement:i,addTabFixed:a,addable:o,mergedSize:s,renderNameListRef:l,onRender:f,paneWrapperClass:p,paneWrapperStyle:g,startReachedRef:_,endReachedRef:v,isOverflow:y,showScrollButton:b,handleButtonClick:S,mergedTheme:C,rtlEnabled:w,$slots:{default:T,prefix:E,suffix:D}}=this;f?.();let O=T?fe(T()).filter(e=>e.type.__TAB_PANE__===!0):[],k=T?fe(T()).filter(e=>e.type.__TAB__===!0):[],A=!k.length,j=t===`card`,M=t===`segment`,N=!j&&!M&&this.justifyContent;l.value=[];let P=()=>{let t=(m(),n(`div`,{style:h(this.tabWrapperStyle),class:F(`${e}-tabs-wrapper`)},[N?R(()=>null):(m(),n(`div`,{key:1,class:F(`${e}-tabs-scroll-padding`),style:h(i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),A?(m(),n(r,{key:2},[R(()=>O.map((e,t)=>(l.value.push(e.props.name),Be((m(),u(je,d(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!N||N===`center`||N===`start`||N===`end`)}),te(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(m(),n(r,{key:3},[R(()=>k.map((e,t)=>(l.value.push(e.props.name),Be(t!==0&&!N?ze(e):e))))],64)),!a&&o&&j?(m(),n(r,{key:4},[R(()=>Re(o,(A?O.length:k.length)!==0))],64)):R(()=>null),N?R(()=>null):(m(),n(`div`,{key:7,class:F(`${e}-tabs-scroll-padding`),style:h({width:`${this.tabsPadding}px`})},null,6)),j?R(()=>null):(m(),n(`div`,{key:9,ref:`barElRef`,class:F(`${e}-tabs-bar`)},null,2))],6));return m(),n(`div`,{ref:`tabsElRef`,class:F(`${e}-tabs-nav-scroll-content`)},[j&&o?(m(),u(B,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(m(),n(r,{key:1},[R(()=>t)],64)),j?(m(),n(`div`,{key:2,class:F(`${e}-tabs-pad`)},null,2)):R(()=>null)],2)},I=M?`top`:i;return m(),n(`div`,{ref:`selfElRef`,class:F([`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,N&&`${e}-tabs--flex`,`${e}-tabs--${I}`,w&&`${e}-tabs--rtl`]),style:h(this.cssVars)},[c(`div`,{class:F([`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`])},[R(()=>x(E,t=>t&&(m(),n(`div`,{class:F(`${e}-tabs-nav__prefix`)},[R(()=>t)],2)))),M?(m(),u(B,{key:0,onResize:this.handleSegmentResize},{default:()=>(m(),n(`div`,{class:F(`${e}-tabs-rail`),ref:`tabsElRef`},[c(`div`,{class:F(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[c(`div`,{class:F(`${e}-tabs-wrapper`)},[c(`div`,{class:F(`${e}-tabs-tab`)},null,2)],2)],2),A?(m(),n(r,{key:0},[R(()=>O.map((e,t)=>(l.value.push(e.props.name),m(),u(je,d(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),te(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(m(),n(r,{key:1},[R(()=>k.map((e,t)=>(l.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(m(),n(r,{key:1},[R(()=>b&&y&&(m(),u(Ne,{mergedClsPrefix:e,type:`prev`,vertical:I===`left`||I===`right`,disabled:_,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(m(),u(B,{onResize:this.handleNavResize},{default:()=>(m(),n(`div`,{class:F(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(m(),u($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:P},1032,[`onScroll`])):(m(),n(`div`,{key:1,class:F(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[R(()=>P())],42,[`onScroll`]))],2))},1032,[`onResize`])),R(()=>b&&y&&(m(),u(Ne,{mergedClsPrefix:e,type:`next`,vertical:I===`left`||I===`right`,disabled:v,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),a&&o&&j?(m(),n(r,{key:2},[R(()=>Re(o,!0))],64)):R(()=>null),R(()=>x(D,t=>t&&(m(),n(`div`,{class:F(`${e}-tabs-nav__suffix`)},[R(()=>t)],2))))],2),R(()=>A&&(this.animated&&(I===`top`||I===`bottom`)?(m(),n(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:h(g),class:F([`${e}-tabs-pane-wrapper`,p])},[R(()=>Le(O,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(O,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,n,r,i,o,s){let c=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":o}=e.props,s=e=>i===e||o===e,l=t===r;if(e.key!==void 0&&(e.key=r),l||s(`show`)||s(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!s(`if`);c.push(t?a(e,[[M,l]]):e)}}),s?(m(),u(ne,{name:`${s}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:o},{default:()=>c},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):c}function Re(e,t){return m(),u(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=l(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};