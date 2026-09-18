import{B as e,P as t,Pt as n,Q as r,R as i,St as a,Tt as o,U as s,V as c,Y as l,ct as u,dt as d,et as f,ft as p,nt as m,rn as h,rt as g,xt as _,z as v,zt as y}from"./endpoints-C3DHQTsP.js";import{$t as b,A as x,Bt as S,D as C,Gt as w,Jt as T,Qt as E,S as D,Xt as O,Zt as k,_ as A,_t as j,an as M,at as N,ct as P,dt as F,k as I,lt as L,mt as ee,ot as R,qt as z,rt as te,sn as ne,t as B,w as V,yt as re}from"./Button-Z2R18gr3.js";import{r as H}from"./Scrollbar-BGGh9xj6.js";import{i as ie,n as U,r as ae,t as W}from"./cssr-C5sNoWV2.js";import{t as oe}from"./use-merged-state-BQRj4oql.js";import{t as G}from"./ChevronRight-CNoImGe3.js";import{t as se}from"./Add-DSDwCTAQ.js";import{A as ce,G as le,R as ue,f as de,nt as fe,pt as pe}from"./index-D1r-O_m0.js";var me=/\s/;function he(e){for(var t=e.length;t--&&me.test(e.charAt(t)););return t}var ge=/^\s+/;function _e(e){return e&&e.slice(0,he(e)+1).replace(ge,``)}var K=NaN,q=/^[-+]0x[0-9a-f]+$/i,J=/^0b[01]+$/i,Y=/^0o[0-7]+$/i,ve=parseInt;function ye(e){if(typeof e==`number`)return e;if(pe(e))return K;if(S(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=S(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=_e(e);var n=J.test(e);return n||Y.test(e)?ve(e.slice(2),n?2:8):q.test(e)?K:+e}var X=function(){return w.Date.now()},be=`Expected a function`,Z=Math.max,xe=Math.min;function Se(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(be);t=ye(t)||0,S(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Z(ye(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?xe(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=X();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(X())}function x(){var e=X(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Ce=`Expected a function`;function Q(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ce);return S(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Se(e,t,{leading:r,maxWait:t,trailing:i})}var we=W(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[W(`&::-webkit-scrollbar`,{width:0,height:0})]),$=l({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=n(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let r=F();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:U,ssr:r}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return r(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=l({name:`ChevronLeft`,render(){return(()=>{let t=N(`dfe229c2639b2082`);return t[0]||=e(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[e(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=j(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=l({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=f(Ee,null);return t||re(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return d(),s(`div`,{class:R([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:h(this.style)},[L(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...ce(De,[`displayDirective`])},je=l({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:p,activateTab:m,handleClose:h}=f(Ee);return{trigger:d,mergedClosable:v(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:n,clsPrefix:r,name:i,disabled:a,label:o,tab:l,value:u,mergedClosable:f,trigger:p,$slots:{default:h}}=this,g=o??l;return d(),s(`div`,{class:R(`${r}-tabs-tab-wrapper`)},[this.internalLeftPadded?(d(),s(`div`,{key:0,class:R(`${r}-tabs-tab-pad`)},null,2)):L(()=>null),(d(),s(`div`,m({key:i,"data-name":i,"data-disabled":a?!0:void 0},m({class:[`${r}-tabs-tab`,u===i&&`${r}-tabs-tab--active`,a&&`${r}-tabs-tab--disabled`,f&&`${r}-tabs-tab--closable`,n&&`${r}-tabs-tab--addable`,n?this.addTabClass:this.tabClass],onClick:p===`click`?this.activateTab:void 0,onMouseenter:p===`hover`?this.activateTab:void 0,style:n?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[e(`span`,{class:R(`${r}-tabs-tab__label`)},[n?(d(),s(t,{key:0},[e(`div`,{class:R(`${r}-tabs-tab__height-placeholder`)},`\xA0`,2),(d(),c(C,{clsPrefix:r},{default:()=>(d(),c(se))},1032,[`clsPrefix`]))],64)):(d(),s(t,{key:1},[h?(d(),s(t,{key:0},[L(()=>h())],64)):(d(),s(t,{key:1},[typeof g==`object`?(d(),s(t,{key:0},[L(()=>g)],64)):(d(),s(t,{key:1},[L(()=>ue(g??i))],64))],64))],64))],2),f&&this.type===`card`?(d(),c(le,{key:0,clsPrefix:r,class:R(`${r}-tabs-tab__close`),onClick:this.handleClose,disabled:a},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):L(()=>null)],16,ke))],2)}}),Me=T(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[z(`&.transition-disabled`,[T(`tabs-tab`,`
 transition: none !important;
 `),T(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),T(`tabs-tab-pad`,`
 transition: none !important;
 `)]),k(`segment-type`,[T(`tabs-rail`,[z(`&.transition-disabled`,[T(`tabs-capsule`,`
 transition: none;
 `)])])]),k(`top`,[T(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),k(`left`,[T(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),k(`left, right`,`
 flex-direction: row;
 `,[T(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),T(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),k(`right`,`
 flex-direction: row-reverse;
 `,[T(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),T(`tabs-bar`,`
 left: 0;
 `)]),k(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[T(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),T(`tabs-bar`,`
 top: 0;
 `)]),T(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[T(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),T(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[T(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[k(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),z(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),k(`flex`,[T(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[T(`tabs-wrapper`,`
 width: 100%;
 `,[T(`tabs-tab`,`
 margin-right: 0;
 `)])])]),T(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[O(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),O(`prefix`,`padding-right: 16px;`),O(`suffix`,`padding-left: 16px;`)]),k(`top, bottom`,[z(`>`,[T(`tabs-nav`,[T(`tabs-nav-scroll-wrapper`,[z(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),z(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),k(`shadow-start`,[z(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),k(`shadow-end`,[z(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),k(`left, right`,[T(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),z(`>`,[T(`tabs-nav`,[T(`tabs-nav-scroll-wrapper`,[z(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),z(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),k(`shadow-start`,[z(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),k(`shadow-end`,[z(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),T(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[T(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[z(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),z(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),z(`&.transition-disabled`,[z(`&::before, &::after`,`
 transition: none;
 `)])]),T(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),T(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),T(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),T(`tabs-tab`,`
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
 `,[k(`disabled`,{cursor:`not-allowed`}),O(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),O(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),T(`tabs-bar`,`
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
 `,[z(`&.transition-disabled`,`
 transition: none;
 `),k(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),T(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),T(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[z(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),z(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),z(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),z(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),z(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),T(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),k(`line-type, bar-type`,[T(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[z(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),k(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),k(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),T(`tabs-nav`,[O(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),T(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),k(`line-type`,[k(`top`,[O(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),T(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),T(`tabs-bar`,`
 bottom: -1px;
 `)]),k(`left`,[O(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),T(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),T(`tabs-bar`,`
 right: -1px;
 `)]),k(`right`,[O(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),T(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),T(`tabs-bar`,`
 left: -1px;
 `)]),k(`bottom`,[O(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),T(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),T(`tabs-bar`,`
 top: -1px;
 `)]),O(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),T(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),T(`tabs-bar`,`
 border-radius: 0;
 `)]),k(`card-type`,[O(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),T(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),T(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),T(`tabs-tab`,`
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
 `,[O(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),E(`disabled`,[z(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),k(`closable`,`padding-inline-end: 8px;`),k(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),k(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),k(`left, right`,`
 flex-direction: column; 
 `,[O(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),T(`tabs-wrapper`,`
 flex-direction: column;
 `),T(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[T(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),k(`top`,[k(`card-type`,[T(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),O(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),T(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[k(`active`,`
 border-bottom: 1px solid #0000;
 `)]),T(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),T(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),k(`left`,[k(`card-type`,[T(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),O(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),T(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[k(`active`,`
 border-right: 1px solid #0000;
 `)]),T(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),T(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),k(`right`,[k(`card-type`,[T(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),O(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),T(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[k(`active`,`
 border-left: 1px solid #0000;
 `)]),T(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),T(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),k(`bottom`,[k(`card-type`,[T(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),O(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),T(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[k(`active`,`
 border-top: 1px solid #0000;
 `)]),T(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),T(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),T(`tabs-scroll-button`,[k(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),k(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),k(`up`,`
 padding-bottom: 10px;
 `),k(`down`,`
 padding-top: 10px;
 `)])]),Ne=l({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:s}=this,l=n===`next`,u=r?l:i?!l:l;return d(),c(B,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:s,class:R([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(d(),c(C,{clsPrefix:e,style:h(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>u?(d(),c(G,{key:1})):(d(),c(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Q,Fe={...I.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=l({name:`Tabs`,props:Fe,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:o,mergedRtlRef:s}=ee(e),c=A(`Tabs`,s,r),l=v(()=>{let{placement:t}=e;return t===`start`?c?.value?`right`:`left`:t===`end`?c?.value?`left`:`right`:t}),d=I(`Tabs`,`-tabs`,Me,de,e,r),f=n(null),m=n(null),h=n(null),S=n(null),C=n(null),w=n(null),T=n(null),E=n(!0),D=n(!0),O=ae(e,[`labelSize`,`size`]),k=v(()=>O.value?O.value:o?.value?.Tabs?.size||`medium`),j=ae(e,[`activeName`,`value`]),M=n(j.value??e.defaultValue??(t.default?fe(t.default())[0]?.props?.name:null)),N=oe(j,M),P={id:0},F=v(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});_(N,()=>{P.id=0,B(),g(()=>{H()})});function L(){let{value:e}=N;return e===null?null:f.value?.querySelector(`[data-name="${e}"]`)}function R(t){if(e.type===`card`)return;let{value:n}=h;if(!n)return;let i=n.style.opacity===`0`;if(t){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o}=e,s=l.value;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(ne([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(ne([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function z(){if(e.type===`card`)return;let{value:t}=h;t&&(t.style.opacity=`0`)}function ne(e){let{value:t}=h;if(t)for(let n of e)t.style[n]=``}function B(){if(e.type===`card`)return;let t=L();t?R(t):z()}function re(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function H(){let t=[`top`,`bottom`].includes(l.value),n=L();if(n){if(t){let r=w.value?.$el;if(!r)return;re(r,n,t,e.centerActiveTab)}else{let{value:r}=T;if(!r)return;re(r,n,t,e.centerActiveTab)}}}let U=n(null),W=0,G=null;function se(e){let t=U.value;if(t){W=e.getBoundingClientRect().height;let n=`${W}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};G?(r(),G(),G=null):G=r}}function ce(e){let t=U.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(W,n)}px`};G?(G(),G=null,r()):G=r}}function le(){let t=U.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let ue={value:[]},pe=n(`next`);function me(e){let t=N.value,n=`next`;for(let r of ue.value){if(r===t)break;if(r===e){n=`prev`;break}}pe.value=n,he(e)}function he(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&V(n,t),r&&V(r,t),i&&V(i,t),M.value=t}function ge(t){let{onClose:n}=e;n&&V(n,t)}function _e(e){if([`top`,`bottom`].includes(l.value)){let{value:t}=w;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!c?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=T;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let K=!0;function q(){let{value:e}=h;if(!e)return;K&&=!1;let t=`transition-disabled`;e.classList.add(t),B(),e.classList.remove(t)}let J=n(null);function Y({transitionDisabled:e}){let t=f.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=L();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}_([N],()=>{e.type===`segment`&&g(()=>{Y({transitionDisabled:!1})})}),u(()=>{e.type===`segment`&&Y({transitionDisabled:!0})});let ve=0;function ye(t){if(t.contentRect.width===0&&t.contentRect.height===0||ve===t.contentRect.width)return;ve=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(K||e.justifyContent?.startsWith(`space`))&&q(),n!==`segment`&&$(we())}let X=Pe(ye,64);function be(){let{type:t}=e;t===`line`||t===`bar`?q():t===`segment`&&Y({transitionDisabled:!0})}_([()=>e.justifyContent,()=>e.size],()=>{g(()=>{(e.type===`line`||e.type===`bar`)&&q()})}),_([l,()=>c?.value],()=>{g(()=>{be(),$(we(),{instantly:!0})})}),_(()=>e.type,()=>{g(()=>{let e=m.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Z=n(!1);function xe(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=l.value;if(!Z.value)o===`top`||o===`bottom`?i<n&&(Z.value=!0):a<r&&(Z.value=!0);else{let{value:e}=C;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Z.value=!1):a-r>e.$el.offsetHeight&&(Z.value=!1)}$(w.value?.$el||null)}let Se=Pe(xe,64);function Ce(){let{onAdd:t}=e;t&&t()}let Q=n(!1);function we(){let e=l.value;return(e===`top`||e===`bottom`?w.value?.$el:T.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?S.value:null;n&&n.classList.add(`transition-disabled`);let r=l.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);E.value=i<=1,D.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;E.value=t<=1,D.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);p(Ee,{triggerRef:y(e,`trigger`),tabStyleRef:y(e,`tabStyle`),tabClassRef:y(e,`tabClass`),addTabStyleRef:y(e,`addTabStyle`),addTabClassRef:y(e,`addTabClass`),paneClassRef:y(e,`paneClass`),paneStyleRef:y(e,`paneStyle`),mergedClsPrefixRef:r,typeRef:y(e,`type`),closableRef:y(e,`closable`),valueRef:N,tabChangeIdRef:P,onBeforeLeaveRef:y(e,`onBeforeLeave`),activateTab:me,handleClose:ge,handleAdd:Ce}),ie(()=>{B(),H()}),a(()=>{let{value:e}=S;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;E.value?e.classList.remove(n):e.classList.add(n),D.value?e.classList.remove(i):e.classList.add(i)});let De={syncBarPosition:()=>{B()},scrollToCurrentTab:()=>{H()}},Oe=()=>{Y({transitionDisabled:!0})},ke=v(()=>{let{value:t}=k,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:x,closeColorPressed:S,closeBorderRadius:C,[b(`panePadding`,t)]:w,[b(`tabPadding`,r)]:T,[b(`tabPaddingVertical`,r)]:E,[b(`tabGap`,r)]:D,[b(`tabGap`,`${r}Vertical`)]:O,[b(`tabTextColor`,n)]:A,[b(`tabTextColorActive`,n)]:j,[b(`tabTextColorHover`,n)]:M,[b(`tabTextColorDisabled`,n)]:N,[b(`tabFontSize`,t)]:P},common:{cubicBezierEaseInOut:F}}=d.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":A,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":x,"--n-close-color-pressed":S,"--n-close-border-radius":C,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":T,"--n-tab-padding-vertical":E,"--n-tab-gap":D,"--n-tab-gap-vertical":O,"--n-pane-padding-left":te(w,`left`),"--n-pane-padding-right":te(w,`right`),"--n-pane-padding-top":te(w,`top`),"--n-pane-padding-bottom":te(w,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=i?x(`tabs`,v(()=>`${k.value[0]}${e.type[0]}`),ke,e):void 0;return{mergedClsPrefix:r,mergedValue:N,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:U,tabsElRef:f,selfElRef:m,barElRef:h,addTabInstRef:C,xScrollInstRef:w,scrollWrapperElRef:S,addTabFixed:Z,tabWrapperStyle:F,handleNavResize:X,mergedSize:k,handleScroll:Te,handleTabsResize:Se,cssVars:i?void 0:ke,themeClass:Ae?.themeClass,animationDirection:pe,renderNameListRef:ue,yScrollElRef:T,handleSegmentResize:Oe,onAnimationBeforeLeave:se,onAnimationEnter:ce,onAnimationAfterEnter:le,onRender:Ae?.onRender,startReachedRef:E,endReachedRef:D,isOverflow:Q,handleButtonClick:_e,mergedTheme:d,rtlEnabled:c,mergedPlacement:l,...De}},render(){let{mergedClsPrefix:n,type:r,mergedPlacement:i,addTabFixed:a,addable:o,mergedSize:l,renderNameListRef:u,onRender:f,paneWrapperClass:p,paneWrapperStyle:g,startReachedRef:_,endReachedRef:v,isOverflow:y,showScrollButton:b,handleButtonClick:x,mergedTheme:S,rtlEnabled:C,$slots:{default:w,prefix:T,suffix:E}}=this;f?.();let O=w?fe(w()).filter(e=>e.type.__TAB_PANE__===!0):[],k=w?fe(w()).filter(e=>e.type.__TAB__===!0):[],A=!k.length,j=r===`card`,M=r===`segment`,N=!j&&!M&&this.justifyContent;u.value=[];let F=()=>{let e=(d(),s(`div`,{style:h(this.tabWrapperStyle),class:R(`${n}-tabs-wrapper`)},[N?L(()=>null):(d(),s(`div`,{key:1,class:R(`${n}-tabs-scroll-padding`),style:h(i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),A?(d(),s(t,{key:2},[L(()=>O.map((e,t)=>(u.value.push(e.props.name),Be((d(),c(je,m(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!N||N===`center`||N===`start`||N===`end`)}),P(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(d(),s(t,{key:3},[L(()=>k.map((e,t)=>(u.value.push(e.props.name),Be(t!==0&&!N?ze(e):e))))],64)),!a&&o&&j?(d(),s(t,{key:4},[L(()=>Re(o,(A?O.length:k.length)!==0))],64)):L(()=>null),N?L(()=>null):(d(),s(`div`,{key:7,class:R(`${n}-tabs-scroll-padding`),style:h({width:`${this.tabsPadding}px`})},null,6)),j?L(()=>null):(d(),s(`div`,{key:9,ref:`barElRef`,class:R(`${n}-tabs-bar`)},null,2))],6));return d(),s(`div`,{ref:`tabsElRef`,class:R(`${n}-tabs-nav-scroll-content`)},[j&&o?(d(),c(H,{key:0,onResize:this.handleTabsResize},{default:()=>e},1032,[`onResize`])):(d(),s(t,{key:1},[L(()=>e)],64)),j?(d(),s(`div`,{key:2,class:R(`${n}-tabs-pad`)},null,2)):L(()=>null)],2)},I=M?`top`:i;return d(),s(`div`,{ref:`selfElRef`,class:R([`${n}-tabs`,this.themeClass,`${n}-tabs--${r}-type`,`${n}-tabs--${l}-size`,N&&`${n}-tabs--flex`,`${n}-tabs--${I}`,C&&`${n}-tabs--rtl`]),style:h(this.cssVars)},[e(`div`,{class:R([`${n}-tabs-nav--${r}-type`,`${n}-tabs-nav--${I}`,`${n}-tabs-nav`])},[L(()=>D(T,e=>e&&(d(),s(`div`,{class:R(`${n}-tabs-nav__prefix`)},[L(()=>e)],2)))),M?(d(),c(H,{key:0,onResize:this.handleSegmentResize},{default:()=>(d(),s(`div`,{class:R(`${n}-tabs-rail`),ref:`tabsElRef`},[e(`div`,{class:R(`${n}-tabs-capsule`),ref:`segmentCapsuleElRef`},[e(`div`,{class:R(`${n}-tabs-wrapper`)},[e(`div`,{class:R(`${n}-tabs-tab`)},null,2)],2)],2),A?(d(),s(t,{key:0},[L(()=>O.map((e,t)=>(u.value.push(e.props.name),d(),c(je,m(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),P(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(d(),s(t,{key:1},[L(()=>k.map((e,t)=>(u.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(d(),s(t,{key:1},[L(()=>b&&y&&(d(),c(Ne,{mergedClsPrefix:n,type:`prev`,vertical:I===`left`||I===`right`,disabled:_,rtl:!!C,theme:S.peers.Button,themeOverrides:S.peerOverrides.Button,onClick:x},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(d(),c(H,{onResize:this.handleNavResize},{default:()=>(d(),s(`div`,{class:R(`${n}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(d(),c($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:F},1032,[`onScroll`])):(d(),s(`div`,{key:1,class:R(`${n}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[L(()=>F())],42,[`onScroll`]))],2))},1032,[`onResize`])),L(()=>b&&y&&(d(),c(Ne,{mergedClsPrefix:n,type:`next`,vertical:I===`left`||I===`right`,disabled:v,rtl:!!C,theme:S.peers.Button,themeOverrides:S.peerOverrides.Button,onClick:x},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),a&&o&&j?(d(),s(t,{key:2},[L(()=>Re(o,!0))],64)):L(()=>null),L(()=>D(E,e=>e&&(d(),s(`div`,{class:R(`${n}-tabs-nav__suffix`)},[L(()=>e)],2))))],2),L(()=>A&&(this.animated&&(I===`top`||I===`bottom`)?(d(),s(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:h(g),class:R([`${n}-tabs-pane-wrapper`,p])},[L(()=>Le(O,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(O,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,n,r,i,a,s){let l=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,s=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||s(`show`)||s(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!s(`if`);l.push(t?o(e,[[ne,c]]):e)}}),s?(d(),c(M,{name:`${s}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>l},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):l}function Re(e,t){return d(),c(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=i(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};