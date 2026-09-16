import{$n as e,$t as t,B as n,Cn as r,Dn as i,Dt as a,F as o,Fn as s,Gn as c,Hn as l,In as u,Jt as d,Kn as f,Ln as p,N as m,Nn as h,O as g,Qn as _,Sn as v,St as y,Tn as b,Tt as x,_t as S,an as C,dr as w,dt as T,f as E,gr as D,gt as O,hn as k,in as A,jn as j,mt as M,nn as N,nr as P,on as F,pn as ee,pt as te,sn as I,tn as L,wn as R,xr as z,yn as B,yt as V,z as ne}from"./endpoints-gDUDUnKI.js";import{r as re}from"./toString-DwkOUph0.js";import{a as ie,i as ae,n as H,r as oe,t as U}from"./cssr-nvHT-q9I.js";import{t as W}from"./ChevronRight-DKy2bpZd.js";import{t as G}from"./Add-C0hNnf96.js";import{$ as K,B as se,M as ce,m as le,q as ue,ut as de,xt as q}from"./index-DmEbPUOi.js";var fe=/\s/;function pe(e){for(var t=e.length;t--&&fe.test(e.charAt(t)););return t}var me=/^\s+/;function he(e){return e&&e.slice(0,pe(e)+1).replace(me,``)}var J=NaN,ge=/^[-+]0x[0-9a-f]+$/i,Y=/^0b[01]+$/i,X=/^0o[0-7]+$/i,_e=parseInt;function ve(e){if(typeof e==`number`)return e;if(re(e))return J;if(d(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=d(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=he(e);var n=Y.test(e);return n||X.test(e)?_e(e.slice(2),n?2:8):ge.test(e)?J:+e}var ye=function(){return t.Date.now()},be=`Expected a function`,Z=Math.max,xe=Math.min;function Se(e,t,n){var r,i,a,o,s,c,l=0,u=!1,f=!1,p=!0;if(typeof e!=`function`)throw TypeError(be);t=ve(t)||0,d(n)&&(u=!!n.leading,f=`maxWait`in n,a=f?Z(ve(n.maxWait)||0,t):a,p=`trailing`in n?!!n.trailing:p);function m(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function h(e){return l=e,s=setTimeout(v,t),u?m(e):o}function g(e){var n=e-c,r=e-l,i=t-n;return f?xe(i,a-r):i}function _(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||f&&r>=a}function v(){var e=ye();if(_(e))return y(e);s=setTimeout(v,g(e))}function y(e){return s=void 0,p&&r?m(e):(r=i=void 0,o)}function b(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function x(){return s===void 0?o:y(ye())}function S(){var e=ye(),n=_(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return h(c);if(f)return clearTimeout(s),s=setTimeout(v,t),m(c)}return s===void 0&&(s=setTimeout(v,t)),o}return S.cancel=b,S.flush=x,S}var Ce=`Expected a function`;function Q(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Ce);return d(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Se(e,t,{leading:r,maxWait:t,trailing:i})}var we=U(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[U(`&::-webkit-scrollbar`,{width:0,height:0})]),$=j({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=w(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=V();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:H,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return h(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=j({name:`ChevronLeft`,render(){return(()=>{let e=te(`dfe229c2639b2082`);return e[0]||=R(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[R(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=x(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=j({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=s(Ee,null);return t||a(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return c(),i(`div`,{class:M([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:z(this.style)},[S(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...ce(De,[`displayDirective`])},je=j({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:i,closableRef:a,tabStyleRef:o,addTabStyleRef:c,tabClassRef:l,addTabClassRef:u,tabChangeIdRef:d,onBeforeLeaveRef:f,triggerRef:p,handleAdd:m,activateTab:h,handleClose:g}=s(Ee);return{trigger:p,mergedClosable:r(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?a.value:t}),style:o,addStyle:c,tabClass:l,addTabClass:u,clsPrefix:t,value:n,type:i,handleClose(t){t.stopPropagation(),!e.disabled&&g(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){m();return}let{name:t}=e,r=++d.id;if(t!==n.value){let{value:i}=f;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&d.id===r&&h(t)}):h(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:a,tab:o,value:s,mergedClosable:l,trigger:d,$slots:{default:f}}=this,p=a??o;return c(),i(`div`,{class:M(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(c(),i(`div`,{key:0,class:M(`${t}-tabs-tab-pad`)},null,2)):S(()=>null),(c(),i(`div`,u({key:n,"data-name":n,"data-disabled":r?!0:void 0},u({class:[`${t}-tabs-tab`,s===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[R(`span`,{class:M(`${t}-tabs-tab__label`)},[e?(c(),i(B,{key:0},[R(`div`,{class:M(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(c(),b(q,{clsPrefix:t},{default:()=>(c(),b(G))},1032,[`clsPrefix`]))],64)):(c(),i(B,{key:1},[f?(c(),i(B,{key:0},[S(()=>f())],64)):(c(),i(B,{key:1},[typeof p==`object`?(c(),i(B,{key:0},[S(()=>p)],64)):(c(),i(B,{key:1},[S(()=>se(p??n))],64))],64))],64))],2),l&&this.type===`card`?(c(),b(ue,{key:0,clsPrefix:t,class:M(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:r},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):S(()=>null)],16,ke))],2)}}),Me=N(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[L(`&.transition-disabled`,[N(`tabs-tab`,`
 transition: none !important;
 `),N(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),N(`tabs-tab-pad`,`
 transition: none !important;
 `)]),C(`segment-type`,[N(`tabs-rail`,[L(`&.transition-disabled`,[N(`tabs-capsule`,`
 transition: none;
 `)])])]),C(`top`,[N(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),C(`left`,[N(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),C(`left, right`,`
 flex-direction: row;
 `,[N(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),N(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),C(`right`,`
 flex-direction: row-reverse;
 `,[N(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),N(`tabs-bar`,`
 left: 0;
 `)]),C(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[N(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),N(`tabs-bar`,`
 top: 0;
 `)]),N(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[N(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),N(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[N(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[C(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),L(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),C(`flex`,[N(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[N(`tabs-wrapper`,`
 width: 100%;
 `,[N(`tabs-tab`,`
 margin-right: 0;
 `)])])]),N(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[A(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),A(`prefix`,`padding-right: 16px;`),A(`suffix`,`padding-left: 16px;`)]),C(`top, bottom`,[L(`>`,[N(`tabs-nav`,[N(`tabs-nav-scroll-wrapper`,[L(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),L(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),C(`shadow-start`,[L(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),C(`shadow-end`,[L(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),C(`left, right`,[N(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),L(`>`,[N(`tabs-nav`,[N(`tabs-nav-scroll-wrapper`,[L(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),L(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),C(`shadow-start`,[L(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),C(`shadow-end`,[L(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),N(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[N(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[L(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),L(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),L(`&.transition-disabled`,[L(`&::before, &::after`,`
 transition: none;
 `)])]),N(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),N(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),N(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),N(`tabs-tab`,`
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
 `,[C(`disabled`,{cursor:`not-allowed`}),A(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),A(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),N(`tabs-bar`,`
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
 `,[L(`&.transition-disabled`,`
 transition: none;
 `),C(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),N(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),N(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[L(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),L(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),L(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),L(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),L(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),N(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),C(`line-type, bar-type`,[N(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[L(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),C(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),C(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),N(`tabs-nav`,[A(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),C(`line-type`,[C(`top`,[A(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),N(`tabs-bar`,`
 bottom: -1px;
 `)]),C(`left`,[A(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),N(`tabs-bar`,`
 right: -1px;
 `)]),C(`right`,[A(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),N(`tabs-bar`,`
 left: -1px;
 `)]),C(`bottom`,[A(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),N(`tabs-bar`,`
 top: -1px;
 `)]),A(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),N(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),N(`tabs-bar`,`
 border-radius: 0;
 `)]),C(`card-type`,[A(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),N(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),N(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),N(`tabs-tab`,`
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
 `,[C(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[A(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),F(`disabled`,[L(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),C(`closable`,`padding-inline-end: 8px;`),C(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),C(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),C(`left, right`,`
 flex-direction: column; 
 `,[A(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),N(`tabs-wrapper`,`
 flex-direction: column;
 `),N(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[N(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),C(`top`,[C(`card-type`,[N(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),A(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),N(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[C(`active`,`
 border-bottom: 1px solid #0000;
 `)]),N(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),N(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),C(`left`,[C(`card-type`,[N(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),A(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),N(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[C(`active`,`
 border-right: 1px solid #0000;
 `)]),N(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),N(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),C(`right`,[C(`card-type`,[N(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),A(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),N(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[C(`active`,`
 border-left: 1px solid #0000;
 `)]),N(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),N(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),C(`bottom`,[C(`card-type`,[N(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),A(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),N(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[C(`active`,`
 border-top: 1px solid #0000;
 `)]),N(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),N(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),N(`tabs-scroll-button`,[C(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),C(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),C(`up`,`
 padding-bottom: 10px;
 `),C(`down`,`
 padding-top: 10px;
 `)])]),Ne=j({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:s}=this,l=n===`next`,u=r?l:i?!l:l;return c(),b(E,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:s,class:M([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(c(),b(q,{clsPrefix:e,style:z(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>u?(c(),b(W,{key:1})):(c(),b(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Q,Fe={...ne.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=j({name:`Tabs`,props:Fe,slots:Object,setup(t,{slots:i}){let{mergedClsPrefixRef:a,inlineThemeDisabled:s,mergedComponentPropsRef:c,mergedRtlRef:u}=y(t),d=g(`Tabs`,u,a),m=r(()=>{let{placement:e}=t;return e===`start`?d?.value?`right`:`left`:e===`end`?d?.value?`left`:`right`:e}),h=ne(`Tabs`,`-tabs`,Me,le,t,a),v=w(null),b=w(null),x=w(null),S=w(null),C=w(null),E=w(null),O=w(null),k=w(!0),A=w(!0),j=oe(t,[`labelSize`,`size`]),M=r(()=>j.value?j.value:c?.value?.Tabs?.size||`medium`),N=oe(t,[`activeName`,`value`]),P=w(N.value??t.defaultValue??(i.default?de(i.default())[0]?.props?.name:null)),F=ae(N,P),ee={id:0},te=r(()=>{if(t.justifyContent&&t.type!==`card`)return{display:`flex`,justifyContent:t.justifyContent}});_(F,()=>{ee.id=0,V(),p(()=>{H()})});function L(){let{value:e}=F;return e===null?null:v.value?.querySelector(`[data-name="${e}"]`)}function R(e){if(t.type===`card`)return;let{value:n}=x;if(!n)return;let r=n.style.opacity===`0`;if(e){let i=`${a.value}-tabs-bar--disabled`,{barWidth:o}=t,s=m.value;if(e.dataset.disabled===`true`?n.classList.add(i):n.classList.remove(i),[`top`,`bottom`].includes(s)){if(B([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(B([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function z(){if(t.type===`card`)return;let{value:e}=x;e&&(e.style.opacity=`0`)}function B(e){let{value:t}=x;if(t)for(let n of e)t.style[n]=``}function V(){if(t.type===`card`)return;let e=L();e?R(e):z()}function re(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function H(){let e=[`top`,`bottom`].includes(m.value),n=L();if(n){if(e){let r=E.value?.$el;if(!r)return;re(r,n,e,t.centerActiveTab)}else{let{value:r}=O;if(!r)return;re(r,n,e,t.centerActiveTab)}}}let U=w(null),W=0,G=null;function K(e){let t=U.value;if(t){W=e.getBoundingClientRect().height;let n=`${W}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};G?(r(),G(),G=null):G=r}}function se(e){let t=U.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(W,n)}px`};G?(G(),G=null,r()):G=r}}function ce(){let e=U.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let ue={value:[]},q=w(`next`);function fe(e){let t=F.value,n=`next`;for(let r of ue.value){if(r===t)break;if(r===e){n=`prev`;break}}q.value=n,pe(e)}function pe(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&o(n,e),r&&o(r,e),i&&o(i,e),P.value=e}function me(e){let{onClose:n}=t;n&&o(n,e)}function he(e){if([`top`,`bottom`].includes(m.value)){let{value:t}=E;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!d?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=O;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let J=!0;function ge(){let{value:e}=x;if(!e)return;J&&=!1;let t=`transition-disabled`;e.classList.add(t),V(),e.classList.remove(t)}let Y=w(null);function X({transitionDisabled:e}){let t=v.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=L();n&&Y.value&&(Y.value.style.width=`${n.offsetWidth}px`,Y.value.style.height=`${n.offsetHeight}px`,Y.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&Y.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}_([F],()=>{t.type===`segment`&&p(()=>{X({transitionDisabled:!1})})}),l(()=>{t.type===`segment`&&X({transitionDisabled:!0})});let _e=0;function ve(e){if(e.contentRect.width===0&&e.contentRect.height===0||_e===e.contentRect.width)return;_e=e.contentRect.width;let{type:n}=t;(n===`line`||n===`bar`)&&(J||t.justifyContent?.startsWith(`space`))&&ge(),n!==`segment`&&$(we())}let ye=Pe(ve,64);function be(){let{type:e}=t;e===`line`||e===`bar`?ge():e===`segment`&&X({transitionDisabled:!0})}_([()=>t.justifyContent,()=>t.size],()=>{p(()=>{(t.type===`line`||t.type===`bar`)&&ge()})}),_([m,()=>d?.value],()=>{p(()=>{be(),$(we(),{instantly:!0})})}),_(()=>t.type,()=>{p(()=>{let e=b.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Z=w(!1);function xe(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=m.value;if(!Z.value)o===`top`||o===`bottom`?i<n&&(Z.value=!0):a<r&&(Z.value=!0);else{let{value:e}=C;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Z.value=!1):a-r>e.$el.offsetHeight&&(Z.value=!1)}$(E.value?.$el||null)}let Se=Pe(xe,64);function Ce(){let{onAdd:e}=t;e&&e()}let Q=w(!1);function we(){let e=m.value;return(e===`top`||e===`bottom`?E.value?.$el:O.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?S.value:null;n&&n.classList.add(`transition-disabled`);let r=m.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);k.value=i<=1,A.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;k.value=t<=1,A.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);f(Ee,{triggerRef:D(t,`trigger`),tabStyleRef:D(t,`tabStyle`),tabClassRef:D(t,`tabClass`),addTabStyleRef:D(t,`addTabStyle`),addTabClassRef:D(t,`addTabClass`),paneClassRef:D(t,`paneClass`),paneStyleRef:D(t,`paneStyle`),mergedClsPrefixRef:a,typeRef:D(t,`type`),closableRef:D(t,`closable`),valueRef:F,tabChangeIdRef:ee,onBeforeLeaveRef:D(t,`onBeforeLeave`),activateTab:fe,handleClose:me,handleAdd:Ce}),ie(()=>{V(),H()}),e(()=>{let{value:e}=S;if(!e)return;let{value:t}=a,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;k.value?e.classList.remove(n):e.classList.add(n),A.value?e.classList.remove(r):e.classList.add(r)});let De={syncBarPosition:()=>{V()},scrollToCurrentTab:()=>{H()}},Oe=()=>{X({transitionDisabled:!0})},ke=r(()=>{let{value:e}=M,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:p,colorSegment:m,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[I(`panePadding`,e)]:C,[I(`tabPadding`,r)]:w,[I(`tabPaddingVertical`,r)]:E,[I(`tabGap`,r)]:D,[I(`tabGap`,`${r}Vertical`)]:O,[I(`tabTextColor`,n)]:k,[I(`tabTextColorActive`,n)]:A,[I(`tabTextColorHover`,n)]:j,[I(`tabTextColorDisabled`,n)]:N,[I(`tabFontSize`,e)]:P},common:{cubicBezierEaseInOut:F}}=h.value;return{"--n-bezier":F,"--n-color-segment":m,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":k,"--n-tab-text-color-active":A,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":j,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":p,"--n-tab-padding":w,"--n-tab-padding-vertical":E,"--n-tab-gap":D,"--n-tab-gap-vertical":O,"--n-pane-padding-left":T(C,`left`),"--n-pane-padding-right":T(C,`right`),"--n-pane-padding-top":T(C,`top`),"--n-pane-padding-bottom":T(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=s?n(`tabs`,r(()=>`${M.value[0]}${t.type[0]}`),ke,t):void 0;return{mergedClsPrefix:a,mergedValue:F,renderedNames:new Set,segmentCapsuleElRef:Y,tabsPaneWrapperRef:U,tabsElRef:v,selfElRef:b,barElRef:x,addTabInstRef:C,xScrollInstRef:E,scrollWrapperElRef:S,addTabFixed:Z,tabWrapperStyle:te,handleNavResize:ye,mergedSize:M,handleScroll:Te,handleTabsResize:Se,cssVars:s?void 0:ke,themeClass:Ae?.themeClass,animationDirection:q,renderNameListRef:ue,yScrollElRef:O,handleSegmentResize:Oe,onAnimationBeforeLeave:K,onAnimationEnter:se,onAnimationAfterEnter:ce,onRender:Ae?.onRender,startReachedRef:k,endReachedRef:A,isOverflow:Q,handleButtonClick:he,mergedTheme:h,rtlEnabled:d,mergedPlacement:m,...De}},render(){let{mergedClsPrefix:e,type:t,mergedPlacement:n,addTabFixed:r,addable:a,mergedSize:o,renderNameListRef:s,onRender:l,paneWrapperClass:d,paneWrapperStyle:f,startReachedRef:p,endReachedRef:h,isOverflow:g,showScrollButton:_,handleButtonClick:v,mergedTheme:y,rtlEnabled:x,$slots:{default:C,prefix:w,suffix:T}}=this;l?.();let E=C?de(C()).filter(e=>e.type.__TAB_PANE__===!0):[],D=C?de(C()).filter(e=>e.type.__TAB__===!0):[],k=!D.length,A=t===`card`,j=t===`segment`,N=!A&&!j&&this.justifyContent;s.value=[];let P=()=>{let t=(c(),i(`div`,{style:z(this.tabWrapperStyle),class:M(`${e}-tabs-wrapper`)},[N?S(()=>null):(c(),i(`div`,{key:1,class:M(`${e}-tabs-scroll-padding`),style:z(n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),k?(c(),i(B,{key:2},[S(()=>E.map((e,t)=>(s.value.push(e.props.name),Be((c(),b(je,u(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!N||N===`center`||N===`start`||N===`end`)}),O(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(c(),i(B,{key:3},[S(()=>D.map((e,t)=>(s.value.push(e.props.name),Be(t!==0&&!N?ze(e):e))))],64)),!r&&a&&A?(c(),i(B,{key:4},[S(()=>Re(a,(k?E.length:D.length)!==0))],64)):S(()=>null),N?S(()=>null):(c(),i(`div`,{key:7,class:M(`${e}-tabs-scroll-padding`),style:z({width:`${this.tabsPadding}px`})},null,6)),A?S(()=>null):(c(),i(`div`,{key:9,ref:`barElRef`,class:M(`${e}-tabs-bar`)},null,2))],6));return c(),i(`div`,{ref:`tabsElRef`,class:M(`${e}-tabs-nav-scroll-content`)},[A&&a?(c(),b(K,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(c(),i(B,{key:1},[S(()=>t)],64)),A?(c(),i(`div`,{key:2,class:M(`${e}-tabs-pad`)},null,2)):S(()=>null)],2)},F=j?`top`:n;return c(),i(`div`,{ref:`selfElRef`,class:M([`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${o}-size`,N&&`${e}-tabs--flex`,`${e}-tabs--${F}`,x&&`${e}-tabs--rtl`]),style:z(this.cssVars)},[R(`div`,{class:M([`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${F}`,`${e}-tabs-nav`])},[S(()=>m(w,t=>t&&(c(),i(`div`,{class:M(`${e}-tabs-nav__prefix`)},[S(()=>t)],2)))),j?(c(),b(K,{key:0,onResize:this.handleSegmentResize},{default:()=>(c(),i(`div`,{class:M(`${e}-tabs-rail`),ref:`tabsElRef`},[R(`div`,{class:M(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[R(`div`,{class:M(`${e}-tabs-wrapper`)},[R(`div`,{class:M(`${e}-tabs-tab`)},null,2)],2)],2),k?(c(),i(B,{key:0},[S(()=>E.map((e,t)=>(s.value.push(e.props.name),c(),b(je,u(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),O(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(c(),i(B,{key:1},[S(()=>D.map((e,t)=>(s.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(c(),i(B,{key:1},[S(()=>_&&g&&(c(),b(Ne,{mergedClsPrefix:e,type:`prev`,vertical:F===`left`||F===`right`,disabled:p,rtl:!!x,theme:y.peers.Button,themeOverrides:y.peerOverrides.Button,onClick:v},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(c(),b(K,{onResize:this.handleNavResize},{default:()=>(c(),i(`div`,{class:M(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(F)?(c(),b($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:P},1032,[`onScroll`])):(c(),i(`div`,{key:1,class:M(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[S(()=>P())],42,[`onScroll`]))],2))},1032,[`onResize`])),S(()=>_&&g&&(c(),b(Ne,{mergedClsPrefix:e,type:`next`,vertical:F===`left`||F===`right`,disabled:h,rtl:!!x,theme:y.peers.Button,themeOverrides:y.peerOverrides.Button,onClick:v},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),r&&a&&A?(c(),i(B,{key:2},[S(()=>Re(a,!0))],64)):S(()=>null),S(()=>m(T,t=>t&&(c(),i(`div`,{class:M(`${e}-tabs-nav__suffix`)},[S(()=>t)],2))))],2),S(()=>k&&(this.animated&&(F===`top`||F===`bottom`)?(c(),i(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:z(f),class:M([`${e}-tabs-pane-wrapper`,d])},[S(()=>Le(E,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(E,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?P(e,[[k,c]]):e)}}),o?(c(),b(ee,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):s}function Re(e,t){return c(),b(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=v(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};