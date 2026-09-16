import{An as e,Cn as t,D as n,En as r,Et as i,Fn as a,Gn as o,In as s,M as c,Mn as l,P as u,Pn as d,Qn as f,Qt as p,R as m,Sn as h,Vn as g,Wn as _,Zn as v,an as y,br as b,d as x,en as S,fn as C,ft as w,gt as T,hr as E,ht as D,in as O,mn as k,on as A,pt as j,qt as M,rn as N,tn as P,tr as F,ur as I,ut as L,vn as R,vt as ee,wn as z,wt as te,xn as B,xt as ne,z as re}from"./endpoints-C6WHjh8m.js";import{_ as ie,a as V,j as H}from"./fade-in-scale-up.cssr-C2lCbpRI.js";import{a as ae,i as oe,n as U,r as se,t as W}from"./cssr-DbvHbkBG.js";import{t as G}from"./ChevronRight-W7GZa1DQ.js";import{t as ce}from"./Add-BhqxawZz.js";import{G as le,R as ue,X as K,j as de,p as fe}from"./index-Bx-xSnBt.js";var pe=/\s/;function me(e){for(var t=e.length;t--&&pe.test(e.charAt(t)););return t}var he=/^\s+/;function ge(e){return e&&e.slice(0,me(e)+1).replace(he,``)}var q=NaN,J=/^[-+]0x[0-9a-f]+$/i,Y=/^0b[01]+$/i,X=/^0o[0-7]+$/i,_e=parseInt;function ve(e){if(typeof e==`number`)return e;if(H(e))return q;if(M(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=M(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=ge(e);var n=Y.test(e);return n||X.test(e)?_e(e.slice(2),n?2:8):J.test(e)?q:+e}var Z=function(){return p.Date.now()},ye=`Expected a function`,Q=Math.max,be=Math.min;function xe(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(ye);t=ve(t)||0,M(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Q(ve(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?be(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Z();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Z())}function x(){var e=Z(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var Se=`Expected a function`;function Ce(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Se);return M(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),xe(e,t,{leading:r,maxWait:t,trailing:i})}var we=W(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[W(`&::-webkit-scrollbar`,{width:0,height:0})]),$=e({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=I(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=ee();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:U,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return l(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=e({name:`ChevronLeft`,render(){return(()=>{let e=w(`dfe229c2639b2082`);return e[0]||=t(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[t(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=te(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=e({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=d(Ee,null);return t||i(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return _(),r(`div`,{class:j([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:b(this.style)},[T(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...de(De,[`displayDirective`])},je=e({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:f,handleAdd:p,activateTab:m,handleClose:g}=d(Ee);return{trigger:f,mergedClosable:h(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&g(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:n,name:i,disabled:o,label:s,tab:c,value:l,mergedClosable:u,trigger:d,$slots:{default:f}}=this,p=s??c;return _(),r(`div`,{class:j(`${n}-tabs-tab-wrapper`)},[this.internalLeftPadded?(_(),r(`div`,{key:0,class:j(`${n}-tabs-tab-pad`)},null,2)):T(()=>null),(_(),r(`div`,a({key:i,"data-name":i,"data-disabled":o?!0:void 0},a({class:[`${n}-tabs-tab`,l===i&&`${n}-tabs-tab--active`,o&&`${n}-tabs-tab--disabled`,u&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[t(`span`,{class:j(`${n}-tabs-tab__label`)},[e?(_(),r(R,{key:0},[t(`div`,{class:j(`${n}-tabs-tab__height-placeholder`)},`\xA0`,2),(_(),z(K,{clsPrefix:n},{default:()=>(_(),z(ce))},1032,[`clsPrefix`]))],64)):(_(),r(R,{key:1},[f?(_(),r(R,{key:0},[T(()=>f())],64)):(_(),r(R,{key:1},[typeof p==`object`?(_(),r(R,{key:0},[T(()=>p)],64)):(_(),r(R,{key:1},[T(()=>ue(p??i))],64))],64))],64))],2),u&&this.type===`card`?(_(),z(le,{key:0,clsPrefix:n,class:j(`${n}-tabs-tab__close`),onClick:this.handleClose,disabled:o},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):T(()=>null)],16,ke))],2)}}),Me=P(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[S(`&.transition-disabled`,[P(`tabs-tab`,`
 transition: none !important;
 `),P(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),P(`tabs-tab-pad`,`
 transition: none !important;
 `)]),O(`segment-type`,[P(`tabs-rail`,[S(`&.transition-disabled`,[P(`tabs-capsule`,`
 transition: none;
 `)])])]),O(`top`,[P(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),O(`left`,[P(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),O(`left, right`,`
 flex-direction: row;
 `,[P(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),P(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),O(`right`,`
 flex-direction: row-reverse;
 `,[P(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),P(`tabs-bar`,`
 left: 0;
 `)]),O(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[P(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),P(`tabs-bar`,`
 top: 0;
 `)]),P(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[P(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),P(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[P(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[O(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),O(`flex`,[P(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[P(`tabs-wrapper`,`
 width: 100%;
 `,[P(`tabs-tab`,`
 margin-right: 0;
 `)])])]),P(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[N(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),N(`prefix`,`padding-right: 16px;`),N(`suffix`,`padding-left: 16px;`)]),O(`top, bottom`,[S(`>`,[P(`tabs-nav`,[P(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),S(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),O(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),O(`shadow-end`,[S(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),O(`left, right`,[P(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),S(`>`,[P(`tabs-nav`,[P(`tabs-nav-scroll-wrapper`,[S(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),S(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),O(`shadow-start`,[S(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),O(`shadow-end`,[S(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),P(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[P(`tabs-nav-y-scroll`,`
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
 `)])]),P(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),P(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),P(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),P(`tabs-tab`,`
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
 `,[O(`disabled`,{cursor:`not-allowed`}),N(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),N(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),P(`tabs-bar`,`
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
 `),O(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),P(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),P(`tab-pane`,`
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
 `)]),P(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),O(`line-type, bar-type`,[P(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[S(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),O(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),O(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),P(`tabs-nav`,[N(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),P(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),O(`line-type`,[O(`top`,[N(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),P(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),P(`tabs-bar`,`
 bottom: -1px;
 `)]),O(`left`,[N(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),P(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),P(`tabs-bar`,`
 right: -1px;
 `)]),O(`right`,[N(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),P(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),P(`tabs-bar`,`
 left: -1px;
 `)]),O(`bottom`,[N(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),P(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),P(`tabs-bar`,`
 top: -1px;
 `)]),N(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),P(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),P(`tabs-bar`,`
 border-radius: 0;
 `)]),O(`card-type`,[N(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),P(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),P(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),P(`tabs-tab`,`
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
 `,[O(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[N(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),y(`disabled`,[S(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),O(`closable`,`padding-inline-end: 8px;`),O(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),O(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),O(`left, right`,`
 flex-direction: column; 
 `,[N(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),P(`tabs-wrapper`,`
 flex-direction: column;
 `),P(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[P(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),O(`top`,[O(`card-type`,[P(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),P(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[O(`active`,`
 border-bottom: 1px solid #0000;
 `)]),P(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),P(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),O(`left`,[O(`card-type`,[P(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),P(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[O(`active`,`
 border-right: 1px solid #0000;
 `)]),P(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),P(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),O(`right`,[O(`card-type`,[P(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),P(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[O(`active`,`
 border-left: 1px solid #0000;
 `)]),P(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),P(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),O(`bottom`,[O(`card-type`,[P(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),P(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[O(`active`,`
 border-top: 1px solid #0000;
 `)]),P(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),P(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),P(`tabs-scroll-button`,[O(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),O(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),O(`up`,`
 padding-bottom: 10px;
 `),O(`down`,`
 padding-top: 10px;
 `)])]),Ne=e({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:s}=this,c=n===`next`,l=r?c:i?!c:c;return _(),z(x,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:s,class:j([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(_(),z(K,{clsPrefix:e,style:b(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>l?(_(),z(G,{key:1})):(_(),z(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Ce,Fe={...m.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=e({name:`Tabs`,props:Fe,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a,mergedRtlRef:c}=ne(e),l=n(`Tabs`,c,r),d=h(()=>{let{placement:t}=e;return t===`start`?l?.value?`right`:`left`:t===`end`?l?.value?`left`:`right`:t}),p=m(`Tabs`,`-tabs`,Me,fe,e,r),_=I(null),y=I(null),b=I(null),x=I(null),S=I(null),C=I(null),w=I(null),T=I(!0),D=I(!0),O=se(e,[`labelSize`,`size`]),k=h(()=>O.value?O.value:a?.value?.Tabs?.size||`medium`),j=se(e,[`activeName`,`value`]),M=I(j.value??e.defaultValue??(t.default?ie(t.default())[0]?.props?.name:null)),N=oe(j,M),P={id:0},F=h(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});v(N,()=>{P.id=0,B(),s(()=>{H()})});function R(){let{value:e}=N;return e===null?null:_.value?.querySelector(`[data-name="${e}"]`)}function ee(t){if(e.type===`card`)return;let{value:n}=b;if(!n)return;let i=n.style.opacity===`0`;if(t){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o}=e,s=d.value;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(te([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(te([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function z(){if(e.type===`card`)return;let{value:t}=b;t&&(t.style.opacity=`0`)}function te(e){let{value:t}=b;if(t)for(let n of e)t.style[n]=``}function B(){if(e.type===`card`)return;let t=R();t?ee(t):z()}function V(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function H(){let t=[`top`,`bottom`].includes(d.value),n=R();if(n){if(t){let r=C.value?.$el;if(!r)return;V(r,n,t,e.centerActiveTab)}else{let{value:r}=w;if(!r)return;V(r,n,t,e.centerActiveTab)}}}let U=I(null),W=0,G=null;function ce(e){let t=U.value;if(t){W=e.getBoundingClientRect().height;let n=`${W}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};G?(r(),G(),G=null):G=r}}function le(e){let t=U.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(W,n)}px`};G?(G(),G=null,r()):G=r}}function ue(){let t=U.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let K={value:[]},de=I(`next`);function pe(e){let t=N.value,n=`next`;for(let r of K.value){if(r===t)break;if(r===e){n=`prev`;break}}de.value=n,me(e)}function me(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&u(n,t),r&&u(r,t),i&&u(i,t),M.value=t}function he(t){let{onClose:n}=e;n&&u(n,t)}function ge(e){if([`top`,`bottom`].includes(d.value)){let{value:t}=C;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!l?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=w;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let q=!0;function J(){let{value:e}=b;if(!e)return;q&&=!1;let t=`transition-disabled`;e.classList.add(t),B(),e.classList.remove(t)}let Y=I(null);function X({transitionDisabled:e}){let t=_.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=R();n&&Y.value&&(Y.value.style.width=`${n.offsetWidth}px`,Y.value.style.height=`${n.offsetHeight}px`,Y.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&Y.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}v([N],()=>{e.type===`segment`&&s(()=>{X({transitionDisabled:!1})})}),g(()=>{e.type===`segment`&&X({transitionDisabled:!0})});let _e=0;function ve(t){if(t.contentRect.width===0&&t.contentRect.height===0||_e===t.contentRect.width)return;_e=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(q||e.justifyContent?.startsWith(`space`))&&J(),n!==`segment`&&$(we())}let Z=Pe(ve,64);function ye(){let{type:t}=e;t===`line`||t===`bar`?J():t===`segment`&&X({transitionDisabled:!0})}v([()=>e.justifyContent,()=>e.size],()=>{s(()=>{(e.type===`line`||e.type===`bar`)&&J()})}),v([d,()=>l?.value],()=>{s(()=>{ye(),$(we(),{instantly:!0})})}),v(()=>e.type,()=>{s(()=>{let e=y.value;e&&(e.classList.add(`transition-disabled`),ye(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Q=I(!1);function be(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=d.value;if(!Q.value)o===`top`||o===`bottom`?i<n&&(Q.value=!0):a<r&&(Q.value=!0);else{let{value:e}=S;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Q.value=!1):a-r>e.$el.offsetHeight&&(Q.value=!1)}$(C.value?.$el||null)}let xe=Pe(be,64);function Se(){let{onAdd:t}=e;t&&t()}let Ce=I(!1);function we(){let e=d.value;return(e===`top`||e===`bottom`?C.value?.$el:w.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?x.value:null;n&&n.classList.add(`transition-disabled`);let r=d.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);T.value=i<=1,D.value=i+r>=n-1,Ce.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;T.value=t<=1,D.value=t+r>=n-1,Ce.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);o(Ee,{triggerRef:E(e,`trigger`),tabStyleRef:E(e,`tabStyle`),tabClassRef:E(e,`tabClass`),addTabStyleRef:E(e,`addTabStyle`),addTabClassRef:E(e,`addTabClass`),paneClassRef:E(e,`paneClass`),paneStyleRef:E(e,`paneStyle`),mergedClsPrefixRef:r,typeRef:E(e,`type`),closableRef:E(e,`closable`),valueRef:N,tabChangeIdRef:P,onBeforeLeaveRef:E(e,`onBeforeLeave`),activateTab:pe,handleClose:he,handleAdd:Se}),ae(()=>{B(),H()}),f(()=>{let{value:e}=x;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;T.value?e.classList.remove(n):e.classList.add(n),D.value?e.classList.remove(i):e.classList.add(i)});let De={syncBarPosition:()=>{B()},scrollToCurrentTab:()=>{H()}},Oe=()=>{X({transitionDisabled:!0})},ke=h(()=>{let{value:t}=k,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[A(`panePadding`,t)]:C,[A(`tabPadding`,r)]:w,[A(`tabPaddingVertical`,r)]:T,[A(`tabGap`,r)]:E,[A(`tabGap`,`${r}Vertical`)]:D,[A(`tabTextColor`,n)]:O,[A(`tabTextColorActive`,n)]:j,[A(`tabTextColorHover`,n)]:M,[A(`tabTextColorDisabled`,n)]:N,[A(`tabFontSize`,t)]:P},common:{cubicBezierEaseInOut:F}}=p.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":O,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":m,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":L(C,`left`),"--n-pane-padding-right":L(C,`right`),"--n-pane-padding-top":L(C,`top`),"--n-pane-padding-bottom":L(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=i?re(`tabs`,h(()=>`${k.value[0]}${e.type[0]}`),ke,e):void 0;return{mergedClsPrefix:r,mergedValue:N,renderedNames:new Set,segmentCapsuleElRef:Y,tabsPaneWrapperRef:U,tabsElRef:_,selfElRef:y,barElRef:b,addTabInstRef:S,xScrollInstRef:C,scrollWrapperElRef:x,addTabFixed:Q,tabWrapperStyle:F,handleNavResize:Z,mergedSize:k,handleScroll:Te,handleTabsResize:xe,cssVars:i?void 0:ke,themeClass:Ae?.themeClass,animationDirection:de,renderNameListRef:K,yScrollElRef:w,handleSegmentResize:Oe,onAnimationBeforeLeave:ce,onAnimationEnter:le,onAnimationAfterEnter:ue,onRender:Ae?.onRender,startReachedRef:T,endReachedRef:D,isOverflow:Ce,handleButtonClick:ge,mergedTheme:p,rtlEnabled:l,mergedPlacement:d,...De}},render(){let{mergedClsPrefix:e,type:n,mergedPlacement:i,addTabFixed:o,addable:s,mergedSize:l,renderNameListRef:u,onRender:d,paneWrapperClass:f,paneWrapperStyle:p,startReachedRef:m,endReachedRef:h,isOverflow:g,showScrollButton:v,handleButtonClick:y,mergedTheme:x,rtlEnabled:S,$slots:{default:C,prefix:w,suffix:E}}=this;d?.();let O=C?ie(C()).filter(e=>e.type.__TAB_PANE__===!0):[],k=C?ie(C()).filter(e=>e.type.__TAB__===!0):[],A=!k.length,M=n===`card`,N=n===`segment`,P=!M&&!N&&this.justifyContent;u.value=[];let F=()=>{let t=(_(),r(`div`,{style:b(this.tabWrapperStyle),class:j(`${e}-tabs-wrapper`)},[P?T(()=>null):(_(),r(`div`,{key:1,class:j(`${e}-tabs-scroll-padding`),style:b(i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),A?(_(),r(R,{key:2},[T(()=>O.map((e,t)=>(u.value.push(e.props.name),Be((_(),z(je,a(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!P||P===`center`||P===`start`||P===`end`)}),D(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(_(),r(R,{key:3},[T(()=>k.map((e,t)=>(u.value.push(e.props.name),Be(t!==0&&!P?ze(e):e))))],64)),!o&&s&&M?(_(),r(R,{key:4},[T(()=>Re(s,(A?O.length:k.length)!==0))],64)):T(()=>null),P?T(()=>null):(_(),r(`div`,{key:7,class:j(`${e}-tabs-scroll-padding`),style:b({width:`${this.tabsPadding}px`})},null,6)),M?T(()=>null):(_(),r(`div`,{key:9,ref:`barElRef`,class:j(`${e}-tabs-bar`)},null,2))],6));return _(),r(`div`,{ref:`tabsElRef`,class:j(`${e}-tabs-nav-scroll-content`)},[M&&s?(_(),z(V,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(_(),r(R,{key:1},[T(()=>t)],64)),M?(_(),r(`div`,{key:2,class:j(`${e}-tabs-pad`)},null,2)):T(()=>null)],2)},I=N?`top`:i;return _(),r(`div`,{ref:`selfElRef`,class:j([`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${l}-size`,P&&`${e}-tabs--flex`,`${e}-tabs--${I}`,S&&`${e}-tabs--rtl`]),style:b(this.cssVars)},[t(`div`,{class:j([`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`])},[T(()=>c(w,t=>t&&(_(),r(`div`,{class:j(`${e}-tabs-nav__prefix`)},[T(()=>t)],2)))),N?(_(),z(V,{key:0,onResize:this.handleSegmentResize},{default:()=>(_(),r(`div`,{class:j(`${e}-tabs-rail`),ref:`tabsElRef`},[t(`div`,{class:j(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[t(`div`,{class:j(`${e}-tabs-wrapper`)},[t(`div`,{class:j(`${e}-tabs-tab`)},null,2)],2)],2),A?(_(),r(R,{key:0},[T(()=>O.map((e,t)=>(u.value.push(e.props.name),_(),z(je,a(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),D(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(_(),r(R,{key:1},[T(()=>k.map((e,t)=>(u.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(_(),r(R,{key:1},[T(()=>v&&g&&(_(),z(Ne,{mergedClsPrefix:e,type:`prev`,vertical:I===`left`||I===`right`,disabled:m,rtl:!!S,theme:x.peers.Button,themeOverrides:x.peerOverrides.Button,onClick:y},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(_(),z(V,{onResize:this.handleNavResize},{default:()=>(_(),r(`div`,{class:j(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(_(),z($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:F},1032,[`onScroll`])):(_(),r(`div`,{key:1,class:j(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[T(()=>F())],42,[`onScroll`]))],2))},1032,[`onResize`])),T(()=>v&&g&&(_(),z(Ne,{mergedClsPrefix:e,type:`next`,vertical:I===`left`||I===`right`,disabled:h,rtl:!!S,theme:x.peers.Button,themeOverrides:x.peerOverrides.Button,onClick:y},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),o&&s&&M?(_(),r(R,{key:2},[T(()=>Re(s,!0))],64)):T(()=>null),T(()=>c(E,t=>t&&(_(),r(`div`,{class:j(`${e}-tabs-nav__suffix`)},[T(()=>t)],2))))],2),T(()=>A&&(this.animated&&(I===`top`||I===`bottom`)?(_(),r(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:b(p),class:j([`${e}-tabs-pane-wrapper`,f])},[T(()=>Le(O,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(O,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?F(e,[[k,c]]):e)}}),o?(_(),z(C,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):s}function Re(e,t){return _(),z(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=B(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};