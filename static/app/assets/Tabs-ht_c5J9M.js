import{B as e,P as t,Pt as n,Q as r,R as i,St as a,Tt as o,U as s,V as c,Y as l,ct as u,dt as d,et as f,ft as p,nt as m,rn as h,rt as g,xt as _,z as v,zt as y}from"./endpoints-C3DHQTsP.js";import{Gt as b,Ht as x,Jt as S,Lt as C,O as w,S as T,Wt as E,Xt as D,Yt as O,_ as k,at as A,ct as j,dt as M,et as N,gt as P,in as F,k as I,mt as ee,nn as te,nt as L,ot as R,qt as z,rt as B,t as V,w as H}from"./Button-CRn1PyiM.js";import{r as U}from"./Scrollbar-wurFqh-_.js";import{t as W}from"./Icon-BdiaXn9O.js";import{i as ne,n as G,r as re,t as K}from"./cssr-CxNfIB4h.js";import{t as ie}from"./use-merged-state-BQRj4oql.js";import{t as q}from"./ChevronRight-DzNIkslx.js";import{t as ae}from"./Add-DncSSljO.js";import{B as oe,M as se,ht as ce,it as le,m as ue,q as de}from"./index-B7Qb4NYl.js";var fe=/\s/;function pe(e){for(var t=e.length;t--&&fe.test(e.charAt(t)););return t}var me=/^\s+/;function he(e){return e&&e.slice(0,pe(e)+1).replace(me,``)}var J=NaN,Y=/^[-+]0x[0-9a-f]+$/i,X=/^0b[01]+$/i,Z=/^0o[0-7]+$/i,ge=parseInt;function _e(e){if(typeof e==`number`)return e;if(ce(e))return J;if(C(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=C(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=he(e);var n=X.test(e);return n||Z.test(e)?ge(e.slice(2),n?2:8):Y.test(e)?J:+e}var ve=function(){return x.Date.now()},ye=`Expected a function`,Q=Math.max,be=Math.min;function xe(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(ye);t=_e(t)||0,C(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Q(_e(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?be(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=ve();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(ve())}function x(){var e=ve(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Se=`Expected a function`;function Ce(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Se);return C(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),xe(e,t,{leading:r,maxWait:t,trailing:i})}var we=K(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[K(`&::-webkit-scrollbar`,{width:0,height:0})]),$=l({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=n(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let r=j();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:G,ssr:r}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return r(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=l({name:`ChevronLeft`,render(){return(()=>{let t=L(`dfe229c2639b2082`);return t[0]||=e(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[e(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=ee(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=l({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=f(Ee,null);return t||P(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return d(),s(`div`,{class:B([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:h(this.style)},[R(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...se(De,[`displayDirective`])},je=l({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:p,activateTab:m,handleClose:h}=f(Ee);return{trigger:d,mergedClosable:v(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:n,clsPrefix:r,name:i,disabled:a,label:o,tab:l,value:u,mergedClosable:f,trigger:p,$slots:{default:h}}=this,g=o??l;return d(),s(`div`,{class:B(`${r}-tabs-tab-wrapper`)},[this.internalLeftPadded?(d(),s(`div`,{key:0,class:B(`${r}-tabs-tab-pad`)},null,2)):R(()=>null),(d(),s(`div`,m({key:i,"data-name":i,"data-disabled":a?!0:void 0},m({class:[`${r}-tabs-tab`,u===i&&`${r}-tabs-tab--active`,a&&`${r}-tabs-tab--disabled`,f&&`${r}-tabs-tab--closable`,n&&`${r}-tabs-tab--addable`,n?this.addTabClass:this.tabClass],onClick:p===`click`?this.activateTab:void 0,onMouseenter:p===`hover`?this.activateTab:void 0,style:n?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[e(`span`,{class:B(`${r}-tabs-tab__label`)},[n?(d(),s(t,{key:0},[e(`div`,{class:B(`${r}-tabs-tab__height-placeholder`)},`\xA0`,2),(d(),c(W,{clsPrefix:r},{default:()=>(d(),c(ae))},1032,[`clsPrefix`]))],64)):(d(),s(t,{key:1},[h?(d(),s(t,{key:0},[R(()=>h())],64)):(d(),s(t,{key:1},[typeof g==`object`?(d(),s(t,{key:0},[R(()=>g)],64)):(d(),s(t,{key:1},[R(()=>oe(g??i))],64))],64))],64))],2),f&&this.type===`card`?(d(),c(de,{key:0,clsPrefix:r,class:B(`${r}-tabs-tab__close`),onClick:this.handleClose,disabled:a},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):R(()=>null)],16,ke))],2)}}),Me=b(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[E(`&.transition-disabled`,[b(`tabs-tab`,`
 transition: none !important;
 `),b(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),b(`tabs-tab-pad`,`
 transition: none !important;
 `)]),S(`segment-type`,[b(`tabs-rail`,[E(`&.transition-disabled`,[b(`tabs-capsule`,`
 transition: none;
 `)])])]),S(`top`,[b(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),S(`left`,[b(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),S(`left, right`,`
 flex-direction: row;
 `,[b(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),b(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),S(`right`,`
 flex-direction: row-reverse;
 `,[b(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),b(`tabs-bar`,`
 left: 0;
 `)]),S(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[b(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),b(`tabs-bar`,`
 top: 0;
 `)]),b(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[b(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),b(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[b(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[S(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),E(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),S(`flex`,[b(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[b(`tabs-wrapper`,`
 width: 100%;
 `,[b(`tabs-tab`,`
 margin-right: 0;
 `)])])]),b(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[z(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),z(`prefix`,`padding-right: 16px;`),z(`suffix`,`padding-left: 16px;`)]),S(`top, bottom`,[E(`>`,[b(`tabs-nav`,[b(`tabs-nav-scroll-wrapper`,[E(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),E(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),S(`shadow-start`,[E(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),S(`shadow-end`,[E(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),S(`left, right`,[b(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),E(`>`,[b(`tabs-nav`,[b(`tabs-nav-scroll-wrapper`,[E(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),E(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),S(`shadow-start`,[E(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),S(`shadow-end`,[E(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),b(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[b(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[E(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),E(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),E(`&.transition-disabled`,[E(`&::before, &::after`,`
 transition: none;
 `)])]),b(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),b(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),b(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),b(`tabs-tab`,`
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
 `,[S(`disabled`,{cursor:`not-allowed`}),z(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),z(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),b(`tabs-bar`,`
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
 `,[E(`&.transition-disabled`,`
 transition: none;
 `),S(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),b(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),b(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[E(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),E(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),E(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),E(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),E(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),b(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),S(`line-type, bar-type`,[b(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[E(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),S(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),S(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),b(`tabs-nav`,[z(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),S(`line-type`,[S(`top`,[z(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b(`tabs-bar`,`
 bottom: -1px;
 `)]),S(`left`,[z(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),b(`tabs-bar`,`
 right: -1px;
 `)]),S(`right`,[z(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),b(`tabs-bar`,`
 left: -1px;
 `)]),S(`bottom`,[z(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),b(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),b(`tabs-bar`,`
 top: -1px;
 `)]),z(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-bar`,`
 border-radius: 0;
 `)]),S(`card-type`,[z(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),b(`tabs-tab`,`
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
 `,[S(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[z(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),O(`disabled`,[E(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),S(`closable`,`padding-inline-end: 8px;`),S(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),S(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),S(`left, right`,`
 flex-direction: column; 
 `,[z(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),b(`tabs-wrapper`,`
 flex-direction: column;
 `),b(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[b(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),S(`top`,[S(`card-type`,[b(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[S(`active`,`
 border-bottom: 1px solid #0000;
 `)]),b(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),b(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),S(`left`,[S(`card-type`,[b(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),b(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[S(`active`,`
 border-right: 1px solid #0000;
 `)]),b(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),b(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),S(`right`,[S(`card-type`,[b(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),b(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[S(`active`,`
 border-left: 1px solid #0000;
 `)]),b(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),b(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),S(`bottom`,[S(`card-type`,[b(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),z(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),b(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[S(`active`,`
 border-top: 1px solid #0000;
 `)]),b(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),b(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),b(`tabs-scroll-button`,[S(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),S(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),S(`up`,`
 padding-bottom: 10px;
 `),S(`down`,`
 padding-top: 10px;
 `)])]),Ne=l({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:s}=this,l=n===`next`,u=r?l:i?!l:l;return d(),c(V,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:s,class:B([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(d(),c(W,{clsPrefix:e,style:h(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>u?(d(),c(q,{key:1})):(d(),c(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Ce,Fe={...w.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=l({name:`Tabs`,props:Fe,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:o,mergedRtlRef:s}=M(e),c=k(`Tabs`,s,r),l=v(()=>{let{placement:t}=e;return t===`start`?c?.value?`right`:`left`:t===`end`?c?.value?`left`:`right`:t}),d=w(`Tabs`,`-tabs`,Me,ue,e,r),f=n(null),m=n(null),h=n(null),b=n(null),x=n(null),S=n(null),C=n(null),T=n(!0),E=n(!0),O=re(e,[`labelSize`,`size`]),A=v(()=>O.value?O.value:o?.value?.Tabs?.size||`medium`),j=re(e,[`activeName`,`value`]),P=n(j.value??e.defaultValue??(t.default?le(t.default())[0]?.props?.name:null)),F=ie(j,P),ee={id:0},te=v(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});_(F,()=>{ee.id=0,V(),g(()=>{W()})});function L(){let{value:e}=F;return e===null?null:f.value?.querySelector(`[data-name="${e}"]`)}function R(t){if(e.type===`card`)return;let{value:n}=h;if(!n)return;let i=n.style.opacity===`0`;if(t){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o}=e,s=l.value;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(B([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(B([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function z(){if(e.type===`card`)return;let{value:t}=h;t&&(t.style.opacity=`0`)}function B(e){let{value:t}=h;if(t)for(let n of e)t.style[n]=``}function V(){if(e.type===`card`)return;let t=L();t?R(t):z()}function U(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function W(){let t=[`top`,`bottom`].includes(l.value),n=L();if(n){if(t){let r=S.value?.$el;if(!r)return;U(r,n,t,e.centerActiveTab)}else{let{value:r}=C;if(!r)return;U(r,n,t,e.centerActiveTab)}}}let G=n(null),K=0,q=null;function ae(e){let t=G.value;if(t){K=e.getBoundingClientRect().height;let n=`${K}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};q?(r(),q(),q=null):q=r}}function oe(e){let t=G.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(K,n)}px`};q?(q(),q=null,r()):q=r}}function se(){let t=G.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let ce={value:[]},de=n(`next`);function fe(e){let t=F.value,n=`next`;for(let r of ce.value){if(r===t)break;if(r===e){n=`prev`;break}}de.value=n,pe(e)}function pe(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&H(n,t),r&&H(r,t),i&&H(i,t),P.value=t}function me(t){let{onClose:n}=e;n&&H(n,t)}function he(e){if([`top`,`bottom`].includes(l.value)){let{value:t}=S;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!c?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=C;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let J=!0;function Y(){let{value:e}=h;if(!e)return;J&&=!1;let t=`transition-disabled`;e.classList.add(t),V(),e.classList.remove(t)}let X=n(null);function Z({transitionDisabled:e}){let t=f.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=L();n&&X.value&&(X.value.style.width=`${n.offsetWidth}px`,X.value.style.height=`${n.offsetHeight}px`,X.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&X.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}_([F],()=>{e.type===`segment`&&g(()=>{Z({transitionDisabled:!1})})}),u(()=>{e.type===`segment`&&Z({transitionDisabled:!0})});let ge=0;function _e(t){if(t.contentRect.width===0&&t.contentRect.height===0||ge===t.contentRect.width)return;ge=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(J||e.justifyContent?.startsWith(`space`))&&Y(),n!==`segment`&&$(we())}let ve=Pe(_e,64);function ye(){let{type:t}=e;t===`line`||t===`bar`?Y():t===`segment`&&Z({transitionDisabled:!0})}_([()=>e.justifyContent,()=>e.size],()=>{g(()=>{(e.type===`line`||e.type===`bar`)&&Y()})}),_([l,()=>c?.value],()=>{g(()=>{ye(),$(we(),{instantly:!0})})}),_(()=>e.type,()=>{g(()=>{let e=m.value;e&&(e.classList.add(`transition-disabled`),ye(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Q=n(!1);function be(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=l.value;if(!Q.value)o===`top`||o===`bottom`?i<n&&(Q.value=!0):a<r&&(Q.value=!0);else{let{value:e}=x;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Q.value=!1):a-r>e.$el.offsetHeight&&(Q.value=!1)}$(S.value?.$el||null)}let xe=Pe(be,64);function Se(){let{onAdd:t}=e;t&&t()}let Ce=n(!1);function we(){let e=l.value;return(e===`top`||e===`bottom`?S.value?.$el:C.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?b.value:null;n&&n.classList.add(`transition-disabled`);let r=l.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);T.value=i<=1,E.value=i+r>=n-1,Ce.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;T.value=t<=1,E.value=t+r>=n-1,Ce.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);p(Ee,{triggerRef:y(e,`trigger`),tabStyleRef:y(e,`tabStyle`),tabClassRef:y(e,`tabClass`),addTabStyleRef:y(e,`addTabStyle`),addTabClassRef:y(e,`addTabClass`),paneClassRef:y(e,`paneClass`),paneStyleRef:y(e,`paneStyle`),mergedClsPrefixRef:r,typeRef:y(e,`type`),closableRef:y(e,`closable`),valueRef:F,tabChangeIdRef:ee,onBeforeLeaveRef:y(e,`onBeforeLeave`),activateTab:fe,handleClose:me,handleAdd:Se}),ne(()=>{V(),W()}),a(()=>{let{value:e}=b;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;T.value?e.classList.remove(n):e.classList.add(n),E.value?e.classList.remove(i):e.classList.add(i)});let De={syncBarPosition:()=>{V()},scrollToCurrentTab:()=>{W()}},Oe=()=>{Z({transitionDisabled:!0})},ke=v(()=>{let{value:t}=A,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[D(`panePadding`,t)]:C,[D(`tabPadding`,r)]:w,[D(`tabPaddingVertical`,r)]:T,[D(`tabGap`,r)]:E,[D(`tabGap`,`${r}Vertical`)]:O,[D(`tabTextColor`,n)]:k,[D(`tabTextColorActive`,n)]:j,[D(`tabTextColorHover`,n)]:M,[D(`tabTextColorDisabled`,n)]:P,[D(`tabFontSize`,t)]:F},common:{cubicBezierEaseInOut:I}}=d.value;return{"--n-bezier":I,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":F,"--n-tab-text-color":k,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":P,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":O,"--n-pane-padding-left":N(C,`left`),"--n-pane-padding-right":N(C,`right`),"--n-pane-padding-top":N(C,`top`),"--n-pane-padding-bottom":N(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=i?I(`tabs`,v(()=>`${A.value[0]}${e.type[0]}`),ke,e):void 0;return{mergedClsPrefix:r,mergedValue:F,renderedNames:new Set,segmentCapsuleElRef:X,tabsPaneWrapperRef:G,tabsElRef:f,selfElRef:m,barElRef:h,addTabInstRef:x,xScrollInstRef:S,scrollWrapperElRef:b,addTabFixed:Q,tabWrapperStyle:te,handleNavResize:ve,mergedSize:A,handleScroll:Te,handleTabsResize:xe,cssVars:i?void 0:ke,themeClass:Ae?.themeClass,animationDirection:de,renderNameListRef:ce,yScrollElRef:C,handleSegmentResize:Oe,onAnimationBeforeLeave:ae,onAnimationEnter:oe,onAnimationAfterEnter:se,onRender:Ae?.onRender,startReachedRef:T,endReachedRef:E,isOverflow:Ce,handleButtonClick:he,mergedTheme:d,rtlEnabled:c,mergedPlacement:l,...De}},render(){let{mergedClsPrefix:n,type:r,mergedPlacement:i,addTabFixed:a,addable:o,mergedSize:l,renderNameListRef:u,onRender:f,paneWrapperClass:p,paneWrapperStyle:g,startReachedRef:_,endReachedRef:v,isOverflow:y,showScrollButton:b,handleButtonClick:x,mergedTheme:S,rtlEnabled:C,$slots:{default:w,prefix:E,suffix:D}}=this;f?.();let O=w?le(w()).filter(e=>e.type.__TAB_PANE__===!0):[],k=w?le(w()).filter(e=>e.type.__TAB__===!0):[],j=!k.length,M=r===`card`,N=r===`segment`,P=!M&&!N&&this.justifyContent;u.value=[];let F=()=>{let e=(d(),s(`div`,{style:h(this.tabWrapperStyle),class:B(`${n}-tabs-wrapper`)},[P?R(()=>null):(d(),s(`div`,{key:1,class:B(`${n}-tabs-scroll-padding`),style:h(i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),j?(d(),s(t,{key:2},[R(()=>O.map((e,t)=>(u.value.push(e.props.name),Be((d(),c(je,m(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!P||P===`center`||P===`start`||P===`end`)}),A(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(d(),s(t,{key:3},[R(()=>k.map((e,t)=>(u.value.push(e.props.name),Be(t!==0&&!P?ze(e):e))))],64)),!a&&o&&M?(d(),s(t,{key:4},[R(()=>Re(o,(j?O.length:k.length)!==0))],64)):R(()=>null),P?R(()=>null):(d(),s(`div`,{key:7,class:B(`${n}-tabs-scroll-padding`),style:h({width:`${this.tabsPadding}px`})},null,6)),M?R(()=>null):(d(),s(`div`,{key:9,ref:`barElRef`,class:B(`${n}-tabs-bar`)},null,2))],6));return d(),s(`div`,{ref:`tabsElRef`,class:B(`${n}-tabs-nav-scroll-content`)},[M&&o?(d(),c(U,{key:0,onResize:this.handleTabsResize},{default:()=>e},1032,[`onResize`])):(d(),s(t,{key:1},[R(()=>e)],64)),M?(d(),s(`div`,{key:2,class:B(`${n}-tabs-pad`)},null,2)):R(()=>null)],2)},I=N?`top`:i;return d(),s(`div`,{ref:`selfElRef`,class:B([`${n}-tabs`,this.themeClass,`${n}-tabs--${r}-type`,`${n}-tabs--${l}-size`,P&&`${n}-tabs--flex`,`${n}-tabs--${I}`,C&&`${n}-tabs--rtl`]),style:h(this.cssVars)},[e(`div`,{class:B([`${n}-tabs-nav--${r}-type`,`${n}-tabs-nav--${I}`,`${n}-tabs-nav`])},[R(()=>T(E,e=>e&&(d(),s(`div`,{class:B(`${n}-tabs-nav__prefix`)},[R(()=>e)],2)))),N?(d(),c(U,{key:0,onResize:this.handleSegmentResize},{default:()=>(d(),s(`div`,{class:B(`${n}-tabs-rail`),ref:`tabsElRef`},[e(`div`,{class:B(`${n}-tabs-capsule`),ref:`segmentCapsuleElRef`},[e(`div`,{class:B(`${n}-tabs-wrapper`)},[e(`div`,{class:B(`${n}-tabs-tab`)},null,2)],2)],2),j?(d(),s(t,{key:0},[R(()=>O.map((e,t)=>(u.value.push(e.props.name),d(),c(je,m(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),A(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(d(),s(t,{key:1},[R(()=>k.map((e,t)=>(u.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(d(),s(t,{key:1},[R(()=>b&&y&&(d(),c(Ne,{mergedClsPrefix:n,type:`prev`,vertical:I===`left`||I===`right`,disabled:_,rtl:!!C,theme:S.peers.Button,themeOverrides:S.peerOverrides.Button,onClick:x},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(d(),c(U,{onResize:this.handleNavResize},{default:()=>(d(),s(`div`,{class:B(`${n}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(d(),c($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:F},1032,[`onScroll`])):(d(),s(`div`,{key:1,class:B(`${n}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[R(()=>F())],42,[`onScroll`]))],2))},1032,[`onResize`])),R(()=>b&&y&&(d(),c(Ne,{mergedClsPrefix:n,type:`next`,vertical:I===`left`||I===`right`,disabled:v,rtl:!!C,theme:S.peers.Button,themeOverrides:S.peerOverrides.Button,onClick:x},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),a&&o&&M?(d(),s(t,{key:2},[R(()=>Re(o,!0))],64)):R(()=>null),R(()=>T(D,e=>e&&(d(),s(`div`,{class:B(`${n}-tabs-nav__suffix`)},[R(()=>e)],2))))],2),R(()=>j&&(this.animated&&(I===`top`||I===`bottom`)?(d(),s(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:h(g),class:B([`${n}-tabs-pane-wrapper`,p])},[R(()=>Le(O,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(O,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,n,r,i,a,s){let l=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,s=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||s(`show`)||s(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!s(`if`);l.push(t?o(e,[[F,c]]):e)}}),s?(d(),c(te,{name:`${s}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>l},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):l}function Re(e,t){return d(),c(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=i(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};