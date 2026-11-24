import{$ as e,A as t,D as n,E as r,Et as i,I as a,O as o,Q as s,T as c,U as l,V as u,W as d,Wt as f,Y as p,ct as m,ft as h,lt as g,x as _,xt as v,z as y}from"./useApi-BPuI6ZR9-B4cwgxoE.js";import{$ as b,A as x,D as S,Ht as C,It as w,O as T,Qt as E,Rt as D,S as O,Ut as k,Vt as A,Wt as j,X as M,Xt as N,Z as P,_ as F,at as ee,ct as I,et as L,i as te,jt as R,k as ne,n as z,nt as re,ut as B,w as V,zt as H}from"./createLucideIcon-DOmk2xkk.js";import{n as U,r as ie,t as W}from"./cssr-B0oJHwb7.js";import{t as ae}from"./use-merged-state-BolkIoXB.js";import{t as oe}from"./use-compitable-CNZVP2TM.js";import{t as se}from"./ChevronRight-8k8A3o8-.js";import{t as ce}from"./Add-DWOC1z4b.js";import{C as le,O as ue,P as de,X as fe,at as pe,gt as me,ut as G,z as K}from"./index-C2IDgugI.js";var he=/\s/;function ge(e){for(var t=e.length;t--&&he.test(e.charAt(t)););return t}var q=/^\s+/;function J(e){return e&&e.slice(0,ge(e)+1).replace(q,``)}var Y=NaN,_e=/^[-+]0x[0-9a-f]+$/i,ve=/^0b[01]+$/i,ye=/^0o[0-7]+$/i,be=parseInt;function X(e){if(typeof e==`number`)return e;if(me(e))return Y;if(R(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=R(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=J(e);var n=ve.test(e);return n||ye.test(e)?be(e.slice(2),n?2:8):_e.test(e)?Y:+e}var Z=function(){return w.Date.now()},xe=`Expected a function`,Se=Math.max,Q=Math.min;function Ce(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(xe);t=X(t)||0,R(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Se(X(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Q(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Z();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Z())}function x(){var e=Z(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var $=`Expected a function`;function we(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError($);return R(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ce(e,t,{leading:r,maxWait:t,trailing:i})}var Te=W(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[W(`&::-webkit-scrollbar`,{width:0,height:0})]),Ee=a({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=v(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=re();return Te.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:U,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return y(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),De=a({name:`ChevronLeft`,render(){return(()=>{let e=M(`dfe229c2639b2082`);return e[0]||=n(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[n(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Oe={tabFontSizeSmall:`14px`,tabFontSizeMedium:`14px`,tabFontSizeLarge:`16px`,tabGapSmallLine:`36px`,tabGapMediumLine:`36px`,tabGapLargeLine:`36px`,tabGapSmallLineVertical:`8px`,tabGapMediumLineVertical:`8px`,tabGapLargeLineVertical:`8px`,tabPaddingSmallLine:`6px 0`,tabPaddingMediumLine:`10px 0`,tabPaddingLargeLine:`14px 0`,tabPaddingVerticalSmallLine:`6px 12px`,tabPaddingVerticalMediumLine:`8px 16px`,tabPaddingVerticalLargeLine:`10px 20px`,tabGapSmallBar:`36px`,tabGapMediumBar:`36px`,tabGapLargeBar:`36px`,tabGapSmallBarVertical:`8px`,tabGapMediumBarVertical:`8px`,tabGapLargeBarVertical:`8px`,tabPaddingSmallBar:`4px 0`,tabPaddingMediumBar:`6px 0`,tabPaddingLargeBar:`10px 0`,tabPaddingVerticalSmallBar:`6px 12px`,tabPaddingVerticalMediumBar:`8px 16px`,tabPaddingVerticalLargeBar:`10px 20px`,tabGapSmallCard:`4px`,tabGapMediumCard:`4px`,tabGapLargeCard:`4px`,tabGapSmallCardVertical:`4px`,tabGapMediumCardVertical:`4px`,tabGapLargeCardVertical:`4px`,tabPaddingSmallCard:`8px 16px`,tabPaddingMediumCard:`10px 20px`,tabPaddingLargeCard:`12px 24px`,tabPaddingSmallSegment:`4px 0`,tabPaddingMediumSegment:`6px 0`,tabPaddingLargeSegment:`8px 0`,tabPaddingVerticalLargeSegment:`0 8px`,tabPaddingVerticalSmallCard:`8px 12px`,tabPaddingVerticalMediumCard:`10px 16px`,tabPaddingVerticalLargeCard:`12px 20px`,tabPaddingVerticalSmallSegment:`0 4px`,tabPaddingVerticalMediumSegment:`0 6px`,tabGapSmallSegment:`0`,tabGapMediumSegment:`0`,tabGapLargeSegment:`0`,tabGapSmallSegmentVertical:`0`,tabGapMediumSegmentVertical:`0`,tabGapLargeSegmentVertical:`0`,panePaddingSmall:`8px 0 0 0`,panePaddingMedium:`12px 0 0 0`,panePaddingLarge:`16px 0 0 0`,closeSize:`18px`,closeIconSize:`14px`};function ke(e){let{textColor2:t,primaryColor:n,textColorDisabled:r,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeColorHover:s,closeColorPressed:c,tabColor:l,baseColor:u,dividerColor:d,fontWeight:f,textColor1:p,borderRadius:m,fontSize:h,fontWeightStrong:g}=e;return{...Oe,colorSegment:l,tabFontSizeCard:h,tabTextColorLine:p,tabTextColorActiveLine:n,tabTextColorHoverLine:n,tabTextColorDisabledLine:r,tabTextColorSegment:p,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:r,tabTextColorBar:p,tabTextColorActiveBar:n,tabTextColorHoverBar:n,tabTextColorDisabledBar:r,tabTextColorCard:p,tabTextColorHoverCard:p,tabTextColorActiveCard:n,tabTextColorDisabledCard:r,barColor:n,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeColorHover:s,closeColorPressed:c,closeBorderRadius:m,tabColor:l,tabColorSegment:u,tabBorderColor:d,tabFontWeightActive:f,tabFontWeight:f,tabBorderRadius:m,paneTextColor:t,fontWeightStrong:g}}var Ae=S({name:`Tabs`,common:x,peers:{Button:te},self:ke}),je=I(`n-tabs`),Me={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ne=a({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:Me,slots:Object,setup(e){let t=u(je,null);return t||B(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return s(),t(`div`,{class:P([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:f(this.style)},[L(()=>this.$slots.default?.())],6)}}),Pe=[`data-name`,`data-disabled`],Fe={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...le(Me,[`displayDirective`])},Ie=a({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Fe,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:i,closableRef:a,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:d,onBeforeLeaveRef:f,triggerRef:p,handleAdd:m,activateTab:h,handleClose:g}=u(je);return{trigger:p,mergedClosable:r(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?a.value:t}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:t,value:n,type:i,handleClose(t){t.stopPropagation(),!e.disabled&&g(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){m();return}let{name:t}=e,r=++d.id;if(t!==n.value){let{value:i}=f;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&d.id===r&&h(t)}):h(t)}}}},render(){let{internalAddable:e,clsPrefix:r,name:i,disabled:a,label:c,tab:u,value:d,mergedClosable:f,trigger:p,$slots:{default:m}}=this,h=c??u;return s(),t(`div`,{class:P(`${r}-tabs-tab-wrapper`)},[this.internalLeftPadded?(s(),t(`div`,{key:0,class:P(`${r}-tabs-tab-pad`)},null,2)):L(()=>null),(s(),t(`div`,l({key:i,"data-name":i,"data-disabled":a?!0:void 0},l({class:[`${r}-tabs-tab`,d===i&&`${r}-tabs-tab--active`,a&&`${r}-tabs-tab--disabled`,f&&`${r}-tabs-tab--closable`,e&&`${r}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:p===`click`?this.activateTab:void 0,onMouseenter:p===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[n(`span`,{class:P(`${r}-tabs-tab__label`)},[e?(s(),t(_,{key:0},[n(`div`,{class:P(`${r}-tabs-tab__height-placeholder`)},`\xA0`,2),(s(),o(pe,{clsPrefix:r},{default:()=>(s(),o(ce))},1032,[`clsPrefix`]))],64)):(s(),t(_,{key:1},[m?(s(),t(_,{key:0},[L(()=>m())],64)):(s(),t(_,{key:1},[typeof h==`object`?(s(),t(_,{key:0},[L(()=>h)],64)):(s(),t(_,{key:1},[L(()=>ue(h??i))],64))],64))],64))],2),f&&this.type===`card`?(s(),o(de,{key:0,clsPrefix:r,class:P(`${r}-tabs-tab__close`),onClick:this.handleClose,disabled:a},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):L(()=>null)],16,Pe))],2)}}),Le=H(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[D(`&.transition-disabled`,[H(`tabs-tab`,`
 transition: none !important;
 `),H(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),H(`tabs-tab-pad`,`
 transition: none !important;
 `)]),C(`segment-type`,[H(`tabs-rail`,[D(`&.transition-disabled`,[H(`tabs-capsule`,`
 transition: none;
 `)])])]),C(`top`,[H(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),C(`left`,[H(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),C(`left, right`,`
 flex-direction: row;
 `,[H(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),H(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),C(`right`,`
 flex-direction: row-reverse;
 `,[H(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),H(`tabs-bar`,`
 left: 0;
 `)]),C(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[H(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),H(`tabs-bar`,`
 top: 0;
 `)]),H(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[H(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),H(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[H(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[C(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),D(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),C(`flex`,[H(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[H(`tabs-wrapper`,`
 width: 100%;
 `,[H(`tabs-tab`,`
 margin-right: 0;
 `)])])]),H(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[A(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),A(`prefix`,`padding-right: 16px;`),A(`suffix`,`padding-left: 16px;`)]),C(`top, bottom`,[D(`>`,[H(`tabs-nav`,[H(`tabs-nav-scroll-wrapper`,[D(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),D(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),C(`shadow-start`,[D(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),C(`shadow-end`,[D(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),C(`left, right`,[H(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),D(`>`,[H(`tabs-nav`,[H(`tabs-nav-scroll-wrapper`,[D(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),D(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),C(`shadow-start`,[D(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),C(`shadow-end`,[D(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),H(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[H(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[D(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),D(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),D(`&.transition-disabled`,[D(`&::before, &::after`,`
 transition: none;
 `)])]),H(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),H(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),H(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),H(`tabs-tab`,`
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
 `)]),H(`tabs-bar`,`
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
 `,[D(`&.transition-disabled`,`
 transition: none;
 `),C(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),H(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),H(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[D(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),D(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),D(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),D(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),D(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),H(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),C(`line-type, bar-type`,[H(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[D(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),C(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),C(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),H(`tabs-nav`,[A(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),H(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),C(`line-type`,[C(`top`,[A(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),H(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),H(`tabs-bar`,`
 bottom: -1px;
 `)]),C(`left`,[A(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),H(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),H(`tabs-bar`,`
 right: -1px;
 `)]),C(`right`,[A(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),H(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),H(`tabs-bar`,`
 left: -1px;
 `)]),C(`bottom`,[A(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),H(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),H(`tabs-bar`,`
 top: -1px;
 `)]),A(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),H(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),H(`tabs-bar`,`
 border-radius: 0;
 `)]),C(`card-type`,[A(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),H(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),H(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),H(`tabs-tab`,`
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
 `),k(`disabled`,[D(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),C(`closable`,`padding-inline-end: 8px;`),C(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),C(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),C(`left, right`,`
 flex-direction: column; 
 `,[A(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),H(`tabs-wrapper`,`
 flex-direction: column;
 `),H(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[H(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),C(`top`,[C(`card-type`,[H(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),A(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),H(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[C(`active`,`
 border-bottom: 1px solid #0000;
 `)]),H(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),H(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),C(`left`,[C(`card-type`,[H(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),A(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),H(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[C(`active`,`
 border-right: 1px solid #0000;
 `)]),H(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),H(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),C(`right`,[C(`card-type`,[H(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),A(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),H(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[C(`active`,`
 border-left: 1px solid #0000;
 `)]),H(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),H(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),C(`bottom`,[C(`card-type`,[H(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),A(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),H(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[C(`active`,`
 border-top: 1px solid #0000;
 `)]),H(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),H(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),H(`tabs-scroll-button`,[C(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),C(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),C(`up`,`
 padding-bottom: 10px;
 `),C(`down`,`
 padding-top: 10px;
 `)])]),Re=a({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:c,handleClick:l}=this,u=n===`next`,d=r?u:i?!u:u;return s(),o(z,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:c,onClick:l,class:P([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(s(),o(pe,{clsPrefix:e,style:f(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>d?(s(),o(se,{key:1})):(s(),o(De,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),ze=we,Be={...T.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ve=a({name:`Tabs`,props:Be,slots:Object,setup(t,{slots:n}){let{mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedComponentPropsRef:s,mergedRtlRef:c}=ee(t),l=F(`Tabs`,c,a),u=r(()=>{let{placement:e}=t;return e===`start`?l?.value?`right`:`left`:e===`end`?l?.value?`left`:`right`:e}),f=T(`Tabs`,`-tabs`,Le,Ae,t,a),h=v(null),_=v(null),y=v(null),b=v(null),x=v(null),S=v(null),C=v(null),w=v(!0),E=v(!0),D=oe(t,[`labelSize`,`size`]),O=r(()=>D.value?D.value:s?.value?.Tabs?.size||`medium`),k=oe(t,[`activeName`,`value`]),A=v(k.value??t.defaultValue??(n.default?fe(n.default())[0]?.props?.name:null)),M=ae(k,A),N={id:0},P=r(()=>{if(t.justifyContent&&t.type!==`card`)return{display:`flex`,justifyContent:t.justifyContent}});m(M,()=>{N.id=0,z(),d(()=>{B()})});function I(){let{value:e}=M;return e===null?null:h.value?.querySelector(`[data-name="${e}"]`)}function L(e){if(t.type===`card`)return;let{value:n}=y;if(!n)return;let r=n.style.opacity===`0`;if(e){let i=`${a.value}-tabs-bar--disabled`,{barWidth:o}=t,s=u.value;if(e.dataset.disabled===`true`?n.classList.add(i):n.classList.remove(i),[`top`,`bottom`].includes(s)){if(R([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let t=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;n.style.left=`${t}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${e.offsetLeft}px`,n.style.maxWidth=`${e.offsetWidth}px`;n.style.width=`8192px`,r&&(n.style.transition=`none`),n.offsetWidth,r&&(n.style.transition=``,n.style.opacity=`1`)}else{if(R([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let t=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;n.style.top=`${t}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${e.offsetTop}px`,n.style.maxHeight=`${e.offsetHeight}px`;n.style.height=`8192px`,r&&(n.style.transition=`none`),n.offsetHeight,r&&(n.style.transition=``,n.style.opacity=`1`)}}}function te(){if(t.type===`card`)return;let{value:e}=y;e&&(e.style.opacity=`0`)}function R(e){let{value:t}=y;if(t)for(let n of e)t.style[n]=``}function z(){if(t.type===`card`)return;let e=I();e?L(e):te()}function re(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function B(){let e=[`top`,`bottom`].includes(u.value),n=I();if(n){if(e){let r=S.value?.$el;if(!r)return;re(r,n,e,t.centerActiveTab)}else{let{value:r}=C;if(!r)return;re(r,n,e,t.centerActiveTab)}}}let H=v(null),U=0,W=null;function se(e){let t=H.value;if(t){U=e.getBoundingClientRect().height;let n=`${U}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};W?(r(),W(),W=null):W=r}}function ce(e){let t=H.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(U,n)}px`};W?(W(),W=null,r()):W=r}}function le(){let e=H.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:n}=t;if(typeof n==`string`)e.style.cssText=n;else if(n){let{maxHeight:t,height:r}=n;t!==void 0&&(e.style.maxHeight=t),r!==void 0&&(e.style.height=r)}}}let ue={value:[]},de=v(`next`);function pe(e){let t=M.value,n=`next`;for(let r of ue.value){if(r===t)break;if(r===e){n=`prev`;break}}de.value=n,me(e)}function me(e){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=t;n&&V(n,e),r&&V(r,e),i&&V(i,e),A.value=e}function K(e){let{onClose:n}=t;n&&V(n,e)}function he(e){if([`top`,`bottom`].includes(u.value)){let{value:t}=S;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!l?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=C;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let ge=!0;function q(){let{value:e}=y;if(!e)return;ge&&=!1;let t=`transition-disabled`;e.classList.add(t),z(),e.classList.remove(t)}let J=v(null);function Y({transitionDisabled:e}){let t=h.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=I();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}m([M],()=>{t.type===`segment`&&d(()=>{Y({transitionDisabled:!1})})}),p(()=>{t.type===`segment`&&Y({transitionDisabled:!0})});let _e=0;function ve(e){if(e.contentRect.width===0&&e.contentRect.height===0||_e===e.contentRect.width)return;_e=e.contentRect.width;let{type:n}=t;(n===`line`||n===`bar`)&&(ge||t.justifyContent?.startsWith(`space`))&&q(),n!==`segment`&&$(Ce())}let ye=ze(ve,64);function be(){let{type:e}=t;e===`line`||e===`bar`?q():e===`segment`&&Y({transitionDisabled:!0})}m([()=>t.justifyContent,()=>t.size],()=>{d(()=>{(t.type===`line`||t.type===`bar`)&&q()})}),m([u,()=>l?.value],()=>{d(()=>{be(),$(Ce(),{instantly:!0})})}),m(()=>t.type,()=>{d(()=>{let e=_.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let X=v(!1);function Z(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=u.value;if(!X.value)o===`top`||o===`bottom`?i<n&&(X.value=!0):a<r&&(X.value=!0);else{let{value:e}=x;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(X.value=!1):a-r>e.$el.offsetHeight&&(X.value=!1)}$(S.value?.$el||null)}let xe=ze(Z,64);function Se(){let{onAdd:e}=t;e&&e()}let Q=v(!1);function Ce(){let e=u.value;return(e===`top`||e===`bottom`?S.value?.$el:C.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?b.value:null;n&&n.classList.add(`transition-disabled`);let r=u.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);w.value=i<=1,E.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;w.value=t<=1,E.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let we=ze(e=>{$(e.target)},64);e(je,{triggerRef:i(t,`trigger`),tabStyleRef:i(t,`tabStyle`),tabClassRef:i(t,`tabClass`),addTabStyleRef:i(t,`addTabStyle`),addTabClassRef:i(t,`addTabClass`),paneClassRef:i(t,`paneClass`),paneStyleRef:i(t,`paneStyle`),mergedClsPrefixRef:a,typeRef:i(t,`type`),closableRef:i(t,`closable`),valueRef:M,tabChangeIdRef:N,onBeforeLeaveRef:i(t,`onBeforeLeave`),activateTab:pe,handleClose:K,handleAdd:Se}),ie(()=>{z(),B()}),g(()=>{let{value:e}=b;if(!e)return;let{value:t}=a,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;w.value?e.classList.remove(n):e.classList.add(n),E.value?e.classList.remove(r):e.classList.add(r)});let Te={syncBarPosition:()=>{z()},scrollToCurrentTab:()=>{B()}},Ee=()=>{Y({transitionDisabled:!0})},De=r(()=>{let{value:e}=O,{type:n}=t,r=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[j(`panePadding`,e)]:C,[j(`tabPadding`,r)]:w,[j(`tabPaddingVertical`,r)]:T,[j(`tabGap`,r)]:E,[j(`tabGap`,`${r}Vertical`)]:D,[j(`tabTextColor`,n)]:k,[j(`tabTextColorActive`,n)]:A,[j(`tabTextColorHover`,n)]:M,[j(`tabTextColorDisabled`,n)]:N,[j(`tabFontSize`,e)]:P},common:{cubicBezierEaseInOut:F}}=f.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":k,"--n-tab-text-color-active":A,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":m,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":G(C,`left`),"--n-pane-padding-right":G(C,`right`),"--n-pane-padding-top":G(C,`top`),"--n-pane-padding-bottom":G(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Oe=o?ne(`tabs`,r(()=>`${O.value[0]}${t.type[0]}`),De,t):void 0;return{mergedClsPrefix:a,mergedValue:M,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:H,tabsElRef:h,selfElRef:_,barElRef:y,addTabInstRef:x,xScrollInstRef:S,scrollWrapperElRef:b,addTabFixed:X,tabWrapperStyle:P,handleNavResize:ye,mergedSize:O,handleScroll:we,handleTabsResize:xe,cssVars:o?void 0:De,themeClass:Oe?.themeClass,animationDirection:de,renderNameListRef:ue,yScrollElRef:C,handleSegmentResize:Ee,onAnimationBeforeLeave:se,onAnimationEnter:ce,onAnimationAfterEnter:le,onRender:Oe?.onRender,startReachedRef:w,endReachedRef:E,isOverflow:Q,handleButtonClick:he,mergedTheme:f,rtlEnabled:l,mergedPlacement:u,...Te}},render(){let{mergedClsPrefix:e,type:r,mergedPlacement:i,addTabFixed:a,addable:c,mergedSize:u,renderNameListRef:d,onRender:p,paneWrapperClass:m,paneWrapperStyle:h,startReachedRef:g,endReachedRef:v,isOverflow:y,showScrollButton:x,handleButtonClick:S,mergedTheme:C,rtlEnabled:w,$slots:{default:T,prefix:E,suffix:D}}=this;p?.();let k=T?fe(T()).filter(e=>e.type.__TAB_PANE__===!0):[],A=T?fe(T()).filter(e=>e.type.__TAB__===!0):[],j=!A.length,M=r===`card`,N=r===`segment`,F=!M&&!N&&this.justifyContent;d.value=[];let ee=()=>{let n=(s(),t(`div`,{style:f(this.tabWrapperStyle),class:P(`${e}-tabs-wrapper`)},[F?L(()=>null):(s(),t(`div`,{key:1,class:P(`${e}-tabs-scroll-padding`),style:f(i===`top`||i===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),j?(s(),t(_,{key:2},[L(()=>k.map((e,t)=>(d.value.push(e.props.name),Ge((s(),o(Ie,l(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!F||F===`center`||F===`start`||F===`end`)}),b(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(s(),t(_,{key:3},[L(()=>A.map((e,t)=>(d.value.push(e.props.name),Ge(t!==0&&!F?We(e):e))))],64)),!a&&c&&M?(s(),t(_,{key:4},[L(()=>Ue(c,(j?k.length:A.length)!==0))],64)):L(()=>null),F?L(()=>null):(s(),t(`div`,{key:7,class:P(`${e}-tabs-scroll-padding`),style:f({width:`${this.tabsPadding}px`})},null,6)),M?L(()=>null):(s(),t(`div`,{key:9,ref:`barElRef`,class:P(`${e}-tabs-bar`)},null,2))],6));return s(),t(`div`,{ref:`tabsElRef`,class:P(`${e}-tabs-nav-scroll-content`)},[M&&c?(s(),o(K,{key:0,onResize:this.handleTabsResize},{default:()=>n},1032,[`onResize`])):(s(),t(_,{key:1},[L(()=>n)],64)),M?(s(),t(`div`,{key:2,class:P(`${e}-tabs-pad`)},null,2)):L(()=>null)],2)},I=N?`top`:i;return s(),t(`div`,{ref:`selfElRef`,class:P([`${e}-tabs`,this.themeClass,`${e}-tabs--${r}-type`,`${e}-tabs--${u}-size`,F&&`${e}-tabs--flex`,`${e}-tabs--${I}`,w&&`${e}-tabs--rtl`]),style:f(this.cssVars)},[n(`div`,{class:P([`${e}-tabs-nav--${r}-type`,`${e}-tabs-nav--${I}`,`${e}-tabs-nav`])},[L(()=>O(E,n=>n&&(s(),t(`div`,{class:P(`${e}-tabs-nav__prefix`)},[L(()=>n)],2)))),N?(s(),o(K,{key:0,onResize:this.handleSegmentResize},{default:()=>(s(),t(`div`,{class:P(`${e}-tabs-rail`),ref:`tabsElRef`},[n(`div`,{class:P(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[n(`div`,{class:P(`${e}-tabs-wrapper`)},[n(`div`,{class:P(`${e}-tabs-tab`)},null,2)],2)],2),j?(s(),t(_,{key:0},[L(()=>k.map((e,t)=>(d.value.push(e.props.name),s(),o(Ie,l(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),b(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(s(),t(_,{key:1},[L(()=>A.map((e,t)=>(d.value.push(e.props.name),t===0?e:We(e))))],64))],2))},1032,[`onResize`])):(s(),t(_,{key:1},[L(()=>x&&y&&(s(),o(Re,{mergedClsPrefix:e,type:`prev`,vertical:I===`left`||I===`right`,disabled:g,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(s(),o(K,{onResize:this.handleNavResize},{default:()=>(s(),t(`div`,{class:P(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(s(),o(Ee,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:ee},1032,[`onScroll`])):(s(),t(`div`,{key:1,class:P(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[L(()=>ee())],42,[`onScroll`]))],2))},1032,[`onResize`])),L(()=>x&&y&&(s(),o(Re,{mergedClsPrefix:e,type:`next`,vertical:I===`left`||I===`right`,disabled:v,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),a&&c&&M?(s(),t(_,{key:2},[L(()=>Ue(c,!0))],64)):L(()=>null),L(()=>O(D,n=>n&&(s(),t(`div`,{class:P(`${e}-tabs-nav__suffix`)},[L(()=>n)],2))))],2),L(()=>j&&(this.animated&&(I===`top`||I===`bottom`)?(s(),t(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:f(h),class:P([`${e}-tabs-pane-wrapper`,m])},[L(()=>He(k,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):He(k,this.mergedValue,this.renderedNames)))],6)}});function He(e,t,n,r,i,a,c){let l=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,s=t===r;if(e.key!==void 0&&(e.key=r),s||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);l.push(t?h(e,[[E,s]]):e)}}),c?(s(),o(N,{name:`${c}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>l},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):l}function Ue(e,t){return s(),o(Ie,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function We(e){let t=c(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Ge(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Ne as n,Ve as t};