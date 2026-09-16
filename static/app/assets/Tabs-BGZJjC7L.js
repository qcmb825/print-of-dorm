import{A as e,Bn as t,Cn as n,Ct as r,Dn as i,En as a,Et as o,F as s,Fn as c,H as l,Kn as u,L as d,Ln as f,On as p,Qt as m,Tr as h,V as g,Vn as _,Xn as v,Yn as y,_n as b,_t as x,an as S,br as C,bt as w,cn as T,dn as E,hr as D,ht as O,jn as k,jt as A,kn as j,kt as M,ln as N,m as P,nr as F,on as I,or as ee,rn as te,rr as ne,un as L,vt as R,xt as z,yn as re,zn as B}from"./endpoints-DguQVVk7.js";import{r as ie}from"./toString-D0LYGFog.js";import{r as V}from"./Scrollbar-DSXt8xuo.js";import{i as ae,n as H,r as oe,t as U}from"./cssr-BzPMyp1o.js";import{t as se}from"./use-merged-state-DzXhUbEL.js";import{t as W}from"./ChevronRight-cDoqORua.js";import{t as ce}from"./Add-JNn95-NN.js";import{B as le,M as ue,it as de,m as fe,pt as G,q as pe}from"./index-DwEf3xIY.js";var me=/\s/;function he(e){for(var t=e.length;t--&&me.test(e.charAt(t)););return t}var ge=/^\s+/;function _e(e){return e&&e.slice(0,he(e)+1).replace(ge,``)}var K=NaN,q=/^[-+]0x[0-9a-f]+$/i,J=/^0b[01]+$/i,Y=/^0o[0-7]+$/i,ve=parseInt;function ye(e){if(typeof e==`number`)return e;if(ie(e))return K;if(m(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=m(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=_e(e);var n=J.test(e);return n||Y.test(e)?ve(e.slice(2),n?2:8):q.test(e)?K:+e}var X=function(){return te.Date.now()},be=`Expected a function`,Z=Math.max,xe=Math.min;function Se(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(be);t=ye(t)||0,m(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Z(ye(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function h(e){return l=e,s=setTimeout(v,t),u?p(e):o}function g(e){var n=e-c,r=e-l,i=t-n;return d?xe(i,a-r):i}function _(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function v(){var e=X();if(_(e))return y(e);s=setTimeout(v,g(e))}function y(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function b(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function x(){return s===void 0?o:y(X())}function S(){var e=X(),n=_(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return h(c);if(d)return clearTimeout(s),s=setTimeout(v,t),p(c)}return s===void 0&&(s=setTimeout(v,t)),o}return S.cancel=b,S.flush=x,S}var Ce=`Expected a function`;function Q(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ce);return m(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Se(e,t,{leading:r,maxWait:t,trailing:i})}var we=U(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[U(`&::-webkit-scrollbar`,{width:0,height:0})]),$=c({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=D(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=r();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:H,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return f(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=c({name:`ChevronLeft`,render(){return(()=>{let e=x(`dfe229c2639b2082`);return e[0]||=p(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[p(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=M(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=c({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=B(Ee,null);return t||A(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return y(),k(`div`,{class:R([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:h(this.style)},[z(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...ue(De,[`displayDirective`])},je=c({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:a,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:u,onBeforeLeaveRef:d,triggerRef:f,handleAdd:p,activateTab:m,handleClose:h}=B(Ee);return{trigger:f,mergedClosable:i(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?a.value:t}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++u.id;if(t!==n.value){let{value:i}=d;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&u.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:r,name:i,disabled:a,label:o,tab:s,value:c,mergedClosable:l,trigger:u,$slots:{default:d}}=this,f=o??s;return y(),k(`div`,{class:R(`${r}-tabs-tab-wrapper`)},[this.internalLeftPadded?(y(),k(`div`,{key:0,class:R(`${r}-tabs-tab-pad`)},null,2)):z(()=>null),(y(),k(`div`,t({key:i,"data-name":i,"data-disabled":a?!0:void 0},t({class:[`${r}-tabs-tab`,c===i&&`${r}-tabs-tab--active`,a&&`${r}-tabs-tab--disabled`,l&&`${r}-tabs-tab--closable`,e&&`${r}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:u===`click`?this.activateTab:void 0,onMouseenter:u===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[p(`span`,{class:R(`${r}-tabs-tab__label`)},[e?(y(),k(n,{key:0},[p(`div`,{class:R(`${r}-tabs-tab__height-placeholder`)},`\xA0`,2),(y(),j(G,{clsPrefix:r},{default:()=>(y(),j(ce))},1032,[`clsPrefix`]))],64)):(y(),k(n,{key:1},[d?(y(),k(n,{key:0},[z(()=>d())],64)):(y(),k(n,{key:1},[typeof f==`object`?(y(),k(n,{key:0},[z(()=>f)],64)):(y(),k(n,{key:1},[z(()=>le(f??i))],64))],64))],64))],2),l&&this.type===`card`?(y(),j(pe,{key:0,clsPrefix:r,class:R(`${r}-tabs-tab__close`),onClick:this.handleClose,disabled:a},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):z(()=>null)],16,ke))],2)}}),Me=I(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[S(`&.transition-disabled`,[I(`tabs-tab`,`
 transition: none !important;
 `),I(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),I(`tabs-tab-pad`,`
 transition: none !important;
 `)]),N(`segment-type`,[I(`tabs-rail`,[S(`&.transition-disabled`,[I(`tabs-capsule`,`
 transition: none;
 `)])])]),N(`top`,[I(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),N(`left`,[I(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),N(`left, right`,`
 flex-direction: row;
 `,[I(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),I(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),N(`right`,`
 flex-direction: row-reverse;
 `,[I(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),I(`tabs-bar`,`
 left: 0;
 `)]),N(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[I(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),I(`tabs-bar`,`
 top: 0;
 `)]),I(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[I(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),I(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[I(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[N(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),N(`flex`,[I(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[I(`tabs-wrapper`,`
 width: 100%;
 `,[I(`tabs-tab`,`
 margin-right: 0;
 `)])])]),I(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[T(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),T(`prefix`,`padding-right: 16px;`),T(`suffix`,`padding-left: 16px;`)]),N(`top, bottom`,[S(`>`,[I(`tabs-nav`,[I(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),S(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),N(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),N(`shadow-end`,[S(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),N(`left, right`,[I(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),S(`>`,[I(`tabs-nav`,[I(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),S(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),N(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),N(`shadow-end`,[S(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),I(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[I(`tabs-nav-y-scroll`,`
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
 `)])]),I(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),I(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),I(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),I(`tabs-tab`,`
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
 `,[N(`disabled`,{cursor:`not-allowed`}),T(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),T(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),I(`tabs-bar`,`
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
 `),N(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),I(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),I(`tab-pane`,`
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
 `)]),I(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),N(`line-type, bar-type`,[I(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[S(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),N(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),N(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),I(`tabs-nav`,[T(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),N(`line-type`,[N(`top`,[T(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 bottom: -1px;
 `)]),N(`left`,[T(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 right: -1px;
 `)]),N(`right`,[T(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 left: -1px;
 `)]),N(`bottom`,[T(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 top: -1px;
 `)]),T(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-bar`,`
 border-radius: 0;
 `)]),N(`card-type`,[T(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-tab`,`
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
 `,[N(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[T(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),L(`disabled`,[S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),N(`closable`,`padding-inline-end: 8px;`),N(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),N(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),N(`left, right`,`
 flex-direction: column; 
 `,[T(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),I(`tabs-wrapper`,`
 flex-direction: column;
 `),I(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[I(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),N(`top`,[N(`card-type`,[I(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),T(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[N(`active`,`
 border-bottom: 1px solid #0000;
 `)]),I(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),N(`left`,[N(`card-type`,[I(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),T(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[N(`active`,`
 border-right: 1px solid #0000;
 `)]),I(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),N(`right`,[N(`card-type`,[I(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),T(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[N(`active`,`
 border-left: 1px solid #0000;
 `)]),I(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),N(`bottom`,[N(`card-type`,[I(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),T(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[N(`active`,`
 border-top: 1px solid #0000;
 `)]),I(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),I(`tabs-scroll-button`,[N(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),N(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),N(`up`,`
 padding-bottom: 10px;
 `),N(`down`,`
 padding-top: 10px;
 `)])]),Ne=c({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:s}=this,c=n===`next`,l=r?c:i?!c:c;return y(),j(P,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:s,class:R([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(y(),j(G,{clsPrefix:e,style:h(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>l?(y(),j(W,{key:1})):(y(),j(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Q,Fe={...g.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=c({name:`Tabs`,props:Fe,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedComponentPropsRef:s,mergedRtlRef:c}=o(t),f=e(`Tabs`,c,r),p=i(()=>{let{placement:e}=t;return e===`start`?f?.value?`right`:`left`:e===`end`?f?.value?`left`:`right`:e}),m=g(`Tabs`,`-tabs`,Me,fe,t,r),h=D(null),y=D(null),b=D(null),x=D(null),S=D(null),w=D(null),T=D(null),k=D(!0),A=D(!0),j=oe(t,[`labelSize`,`size`]),M=i(()=>j.value?j.value:s?.value?.Tabs?.size||`medium`),N=oe(t,[`activeName`,`value`]),P=D(N.value??t.defaultValue??(n.default?de(n.default())[0]?.props?.name:null)),I=se(N,P),ee={id:0},te=i(()=>{if(t.justifyContent&&t.type!==`card`)return{display:`flex`,justifyContent:t.justifyContent}});F(I,()=>{ee.id=0,B(),_(()=>{V()})});function L(){let{value:e}=I;return e===null?null:h.value?.querySelector(`[data-name="${e}"]`)}function R(e){if(t.type===`card`)return;let{value:n}=b;if(!n)return;let i=n.style.opacity===`0`;if(e){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o}=t,s=p.value;if(e.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(re([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(re([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function z(){if(t.type===`card`)return;let{value:e}=b;e&&(e.style.opacity=`0`)}function re(e){let{value:t}=b;if(t)for(let n of e)t.style[n]=``}function B(){if(t.type===`card`)return;let e=L();e?R(e):z()}function ie(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function V(){let e=[`top`,`bottom`].includes(p.value),n=L();if(n){if(e){let r=w.value?.$el;if(!r)return;ie(r,n,e,t.centerActiveTab)}else{let{value:r}=T;if(!r)return;ie(r,n,e,t.centerActiveTab)}}}let H=D(null),U=0,W=null;function ce(e){let t=H.value;if(t){U=e.getBoundingClientRect().height;let n=`${U}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};W?(r(),W(),W=null):W=r}}function le(e){let t=H.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(U,n)}px`};W?(W(),W=null,r()):W=r}}function ue(){let e=H.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let G={value:[]},pe=D(`next`);function me(e){let t=I.value,n=`next`;for(let r of G.value){if(r===t)break;if(r===e){n=`prev`;break}}pe.value=n,he(e)}function he(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&d(n,e),r&&d(r,e),i&&d(i,e),P.value=e}function ge(e){let{onClose:n}=t;n&&d(n,e)}function _e(e){if([`top`,`bottom`].includes(p.value)){let{value:t}=w;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!f?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=T;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let K=!0;function q(){let{value:e}=b;if(!e)return;K&&=!1;let t=`transition-disabled`;e.classList.add(t),B(),e.classList.remove(t)}let J=D(null);function Y({transitionDisabled:e}){let t=h.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=L();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}F([I],()=>{t.type===`segment`&&_(()=>{Y({transitionDisabled:!1})})}),u(()=>{t.type===`segment`&&Y({transitionDisabled:!0})});let ve=0;function ye(e){if(e.contentRect.width===0&&e.contentRect.height===0||ve===e.contentRect.width)return;ve=e.contentRect.width;let{type:n}=t;(n===`line`||n===`bar`)&&(K||t.justifyContent?.startsWith(`space`))&&q(),n!==`segment`&&$(we())}let X=Pe(ye,64);function be(){let{type:e}=t;e===`line`||e===`bar`?q():e===`segment`&&Y({transitionDisabled:!0})}F([()=>t.justifyContent,()=>t.size],()=>{_(()=>{(t.type===`line`||t.type===`bar`)&&q()})}),F([p,()=>f?.value],()=>{_(()=>{be(),$(we(),{instantly:!0})})}),F(()=>t.type,()=>{_(()=>{let e=y.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Z=D(!1);function xe(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=p.value;if(!Z.value)o===`top`||o===`bottom`?i<n&&(Z.value=!0):a<r&&(Z.value=!0);else{let{value:e}=S;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Z.value=!1):a-r>e.$el.offsetHeight&&(Z.value=!1)}$(w.value?.$el||null)}let Se=Pe(xe,64);function Ce(){let{onAdd:e}=t;e&&e()}let Q=D(!1);function we(){let e=p.value;return(e===`top`||e===`bottom`?w.value?.$el:T.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?x.value:null;n&&n.classList.add(`transition-disabled`);let r=p.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);k.value=i<=1,A.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;k.value=t<=1,A.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);v(Ee,{triggerRef:C(t,`trigger`),tabStyleRef:C(t,`tabStyle`),tabClassRef:C(t,`tabClass`),addTabStyleRef:C(t,`addTabStyle`),addTabClassRef:C(t,`addTabClass`),paneClassRef:C(t,`paneClass`),paneStyleRef:C(t,`paneStyle`),mergedClsPrefixRef:r,typeRef:C(t,`type`),closableRef:C(t,`closable`),valueRef:I,tabChangeIdRef:ee,onBeforeLeaveRef:C(t,`onBeforeLeave`),activateTab:me,handleClose:ge,handleAdd:Ce}),ae(()=>{B(),V()}),ne(()=>{let{value:e}=x;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;k.value?e.classList.remove(n):e.classList.add(n),A.value?e.classList.remove(i):e.classList.add(i)});let De={syncBarPosition:()=>{B()},scrollToCurrentTab:()=>{V()}},Oe=()=>{Y({transitionDisabled:!0})},ke=i(()=>{let{value:e}=M,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:p,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[E(`panePadding`,e)]:C,[E(`tabPadding`,r)]:w,[E(`tabPaddingVertical`,r)]:T,[E(`tabGap`,r)]:D,[E(`tabGap`,`${r}Vertical`)]:k,[E(`tabTextColor`,n)]:A,[E(`tabTextColorActive`,n)]:j,[E(`tabTextColorHover`,n)]:N,[E(`tabTextColorDisabled`,n)]:P,[E(`tabFontSize`,e)]:F},common:{cubicBezierEaseInOut:I}}=m.value;return{"--n-bezier":I,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":F,"--n-tab-text-color":A,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":P,"--n-tab-text-color-hover":N,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":p,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":D,"--n-tab-gap-vertical":k,"--n-pane-padding-left":O(C,`left`),"--n-pane-padding-right":O(C,`right`),"--n-pane-padding-top":O(C,`top`),"--n-pane-padding-bottom":O(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=a?l(`tabs`,i(()=>`${M.value[0]}${t.type[0]}`),ke,t):void 0;return{mergedClsPrefix:r,mergedValue:I,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:H,tabsElRef:h,selfElRef:y,barElRef:b,addTabInstRef:S,xScrollInstRef:w,scrollWrapperElRef:x,addTabFixed:Z,tabWrapperStyle:te,handleNavResize:X,mergedSize:M,handleScroll:Te,handleTabsResize:Se,cssVars:a?void 0:ke,themeClass:Ae?.themeClass,animationDirection:pe,renderNameListRef:G,yScrollElRef:T,handleSegmentResize:Oe,onAnimationBeforeLeave:ce,onAnimationEnter:le,onAnimationAfterEnter:ue,onRender:Ae?.onRender,startReachedRef:k,endReachedRef:A,isOverflow:Q,handleButtonClick:_e,mergedTheme:m,rtlEnabled:f,mergedPlacement:p,...De}},render(){let{mergedClsPrefix:e,type:r,mergedPlacement:i,addTabFixed:a,addable:o,mergedSize:c,renderNameListRef:l,onRender:u,paneWrapperClass:d,paneWrapperStyle:f,startReachedRef:m,endReachedRef:g,isOverflow:_,showScrollButton:v,handleButtonClick:b,mergedTheme:x,rtlEnabled:S,$slots:{default:C,prefix:T,suffix:E}}=this;u?.();let D=C?de(C()).filter(e=>e.type.__TAB_PANE__===!0):[],O=C?de(C()).filter(e=>e.type.__TAB__===!0):[],A=!O.length,M=r===`card`,N=r===`segment`,P=!M&&!N&&this.justifyContent;l.value=[];let F=()=>{let r=(y(),k(`div`,{style:h(this.tabWrapperStyle),class:R(`${e}-tabs-wrapper`)},[P?z(()=>null):(y(),k(`div`,{key:1,class:R(`${e}-tabs-scroll-padding`),style:h(i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),A?(y(),k(n,{key:2},[z(()=>D.map((e,n)=>(l.value.push(e.props.name),Be((y(),j(je,t(e.props,{internalCreatedByPane:!0,internalLeftPadded:n!==0&&(!P||P===`center`||P===`start`||P===`end`)}),w(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(y(),k(n,{key:3},[z(()=>O.map((e,t)=>(l.value.push(e.props.name),Be(t!==0&&!P?ze(e):e))))],64)),!a&&o&&M?(y(),k(n,{key:4},[z(()=>Re(o,(A?D.length:O.length)!==0))],64)):z(()=>null),P?z(()=>null):(y(),k(`div`,{key:7,class:R(`${e}-tabs-scroll-padding`),style:h({width:`${this.tabsPadding}px`})},null,6)),M?z(()=>null):(y(),k(`div`,{key:9,ref:`barElRef`,class:R(`${e}-tabs-bar`)},null,2))],6));return y(),k(`div`,{ref:`tabsElRef`,class:R(`${e}-tabs-nav-scroll-content`)},[M&&o?(y(),j(V,{key:0,onResize:this.handleTabsResize},{default:()=>r},1032,[`onResize`])):(y(),k(n,{key:1},[z(()=>r)],64)),M?(y(),k(`div`,{key:2,class:R(`${e}-tabs-pad`)},null,2)):z(()=>null)],2)},I=N?`top`:i;return y(),k(`div`,{ref:`selfElRef`,class:R([`${e}-tabs`,this.themeClass,`${e}-tabs--${r}-type`,`${e}-tabs--${c}-size`,P&&`${e}-tabs--flex`,`${e}-tabs--${I}`,S&&`${e}-tabs--rtl`]),style:h(this.cssVars)},[p(`div`,{class:R([`${e}-tabs-nav--${r}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`])},[z(()=>s(T,t=>t&&(y(),k(`div`,{class:R(`${e}-tabs-nav__prefix`)},[z(()=>t)],2)))),N?(y(),j(V,{key:0,onResize:this.handleSegmentResize},{default:()=>(y(),k(`div`,{class:R(`${e}-tabs-rail`),ref:`tabsElRef`},[p(`div`,{class:R(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[p(`div`,{class:R(`${e}-tabs-wrapper`)},[p(`div`,{class:R(`${e}-tabs-tab`)},null,2)],2)],2),A?(y(),k(n,{key:0},[z(()=>D.map((e,n)=>(l.value.push(e.props.name),y(),j(je,t(e.props,{internalCreatedByPane:!0,internalLeftPadded:n!==0}),w(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(y(),k(n,{key:1},[z(()=>O.map((e,t)=>(l.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(y(),k(n,{key:1},[z(()=>v&&_&&(y(),j(Ne,{mergedClsPrefix:e,type:`prev`,vertical:I===`left`||I===`right`,disabled:m,rtl:!!S,theme:x.peers.Button,themeOverrides:x.peerOverrides.Button,onClick:b},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(y(),j(V,{onResize:this.handleNavResize},{default:()=>(y(),k(`div`,{class:R(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(y(),j($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:F},1032,[`onScroll`])):(y(),k(`div`,{key:1,class:R(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[z(()=>F())],42,[`onScroll`]))],2))},1032,[`onResize`])),z(()=>v&&_&&(y(),j(Ne,{mergedClsPrefix:e,type:`next`,vertical:I===`left`||I===`right`,disabled:g,rtl:!!S,theme:x.peers.Button,themeOverrides:x.peerOverrides.Button,onClick:b},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),a&&o&&M?(y(),k(n,{key:2},[z(()=>Re(o,!0))],64)):z(()=>null),z(()=>s(E,t=>t&&(y(),k(`div`,{class:R(`${e}-tabs-nav__suffix`)},[z(()=>t)],2))))],2),z(()=>A&&(this.animated&&(I===`top`||I===`bottom`)?(y(),k(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:h(f),class:R([`${e}-tabs-pane-wrapper`,d])},[z(()=>Le(D,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(D,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?ee(e,[[re,c]]):e)}}),o?(y(),j(b,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):s}function Re(e,t){return y(),j(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=a(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};