import{$ as e,A as t,D as n,Dt as r,E as i,Gt as a,I as o,O as s,St as c,T as l,U as u,V as d,W as f,X as p,et as m,lt as h,pt as g,ut as _,x as v,z as y}from"./useApi-BPuI6ZR9-BM-pFei4.js";import{$ as b,A as x,D as S,Ht as C,It as w,O as T,Qt as E,Rt as D,S as O,Ut as k,Vt as A,Wt as j,X as M,Xt as N,Z as P,_ as F,at as ee,ct as I,et as L,i as te,jt as R,k as ne,n as z,nt as re,ut as B,w as V,zt as H}from"./createLucideIcon-ClRkaCjD.js";import{n as U,r as ie,t as W}from"./cssr-BMcTevRl.js";import{t as ae}from"./use-merged-state-BtZAqeDl.js";import{t as oe}from"./use-compitable-C9VlPzQl.js";import{t as se}from"./ChevronRight-CyYiQh9A.js";import{t as ce}from"./Add-BxzoDflF.js";import{C as le,O as ue,P as de,X as fe,at as pe,gt as me,ut as G,z as K}from"./index-3j4QgkOE.js";var he=/\s/;function ge(e){for(var t=e.length;t--&&he.test(e.charAt(t)););return t}var q=/^\s+/;function J(e){return e&&e.slice(0,ge(e)+1).replace(q,``)}var Y=NaN,_e=/^[-+]0x[0-9a-f]+$/i,ve=/^0b[01]+$/i,ye=/^0o[0-7]+$/i,be=parseInt;function X(e){if(typeof e==`number`)return e;if(me(e))return Y;if(R(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=R(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=J(e);var n=ve.test(e);return n||ye.test(e)?be(e.slice(2),n?2:8):_e.test(e)?Y:+e}var Z=function(){return w.Date.now()},xe=`Expected a function`,Se=Math.max,Q=Math.min;function Ce(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(xe);t=X(t)||0,R(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Se(X(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Q(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Z();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Z())}function x(){var e=Z(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var $=`Expected a function`;function we(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError($);return R(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ce(e,t,{leading:r,maxWait:t,trailing:i})}var Te=W(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[W(`&::-webkit-scrollbar`,{width:0,height:0})]),Ee=o({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=c(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=re();return Te.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:U,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return y(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),De=o({name:`ChevronLeft`,render(){return(()=>{let e=M(`dfe229c2639b2082`);return e[0]||=n(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[n(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Oe={tabFontSizeSmall:`14px`,tabFontSizeMedium:`14px`,tabFontSizeLarge:`16px`,tabGapSmallLine:`36px`,tabGapMediumLine:`36px`,tabGapLargeLine:`36px`,tabGapSmallLineVertical:`8px`,tabGapMediumLineVertical:`8px`,tabGapLargeLineVertical:`8px`,tabPaddingSmallLine:`6px 0`,tabPaddingMediumLine:`10px 0`,tabPaddingLargeLine:`14px 0`,tabPaddingVerticalSmallLine:`6px 12px`,tabPaddingVerticalMediumLine:`8px 16px`,tabPaddingVerticalLargeLine:`10px 20px`,tabGapSmallBar:`36px`,tabGapMediumBar:`36px`,tabGapLargeBar:`36px`,tabGapSmallBarVertical:`8px`,tabGapMediumBarVertical:`8px`,tabGapLargeBarVertical:`8px`,tabPaddingSmallBar:`4px 0`,tabPaddingMediumBar:`6px 0`,tabPaddingLargeBar:`10px 0`,tabPaddingVerticalSmallBar:`6px 12px`,tabPaddingVerticalMediumBar:`8px 16px`,tabPaddingVerticalLargeBar:`10px 20px`,tabGapSmallCard:`4px`,tabGapMediumCard:`4px`,tabGapLargeCard:`4px`,tabGapSmallCardVertical:`4px`,tabGapMediumCardVertical:`4px`,tabGapLargeCardVertical:`4px`,tabPaddingSmallCard:`8px 16px`,tabPaddingMediumCard:`10px 20px`,tabPaddingLargeCard:`12px 24px`,tabPaddingSmallSegment:`4px 0`,tabPaddingMediumSegment:`6px 0`,tabPaddingLargeSegment:`8px 0`,tabPaddingVerticalLargeSegment:`0 8px`,tabPaddingVerticalSmallCard:`8px 12px`,tabPaddingVerticalMediumCard:`10px 16px`,tabPaddingVerticalLargeCard:`12px 20px`,tabPaddingVerticalSmallSegment:`0 4px`,tabPaddingVerticalMediumSegment:`0 6px`,tabGapSmallSegment:`0`,tabGapMediumSegment:`0`,tabGapLargeSegment:`0`,tabGapSmallSegmentVertical:`0`,tabGapMediumSegmentVertical:`0`,tabGapLargeSegmentVertical:`0`,panePaddingSmall:`8px 0 0 0`,panePaddingMedium:`12px 0 0 0`,panePaddingLarge:`16px 0 0 0`,closeSize:`18px`,closeIconSize:`14px`};function ke(e){let{textColor2:t,primaryColor:n,textColorDisabled:r,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeColorHover:s,closeColorPressed:c,tabColor:l,baseColor:u,dividerColor:d,fontWeight:f,textColor1:p,borderRadius:m,fontSize:h,fontWeightStrong:g}=e;return{...Oe,colorSegment:l,tabFontSizeCard:h,tabTextColorLine:p,tabTextColorActiveLine:n,tabTextColorHoverLine:n,tabTextColorDisabledLine:r,tabTextColorSegment:p,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:r,tabTextColorBar:p,tabTextColorActiveBar:n,tabTextColorHoverBar:n,tabTextColorDisabledBar:r,tabTextColorCard:p,tabTextColorHoverCard:p,tabTextColorActiveCard:n,tabTextColorDisabledCard:r,barColor:n,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeColorHover:s,closeColorPressed:c,closeBorderRadius:m,tabColor:l,tabColorSegment:u,tabBorderColor:d,tabFontWeightActive:f,tabFontWeight:f,tabBorderRadius:m,paneTextColor:t,fontWeightStrong:g}}var Ae=S({name:`Tabs`,common:x,peers:{Button:te},self:ke}),je=I(`n-tabs`),Me={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ne=o({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:Me,slots:Object,setup(e){let t=d(je,null);return t||B(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return e(),t(`div`,{class:P([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:a(this.style)},[L(()=>this.$slots.default?.())],6)}}),Pe=[`data-name`,`data-disabled`],Fe={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...le(Me,[`displayDirective`])},Ie=o({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Fe,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:a,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:u,onBeforeLeaveRef:f,triggerRef:p,handleAdd:m,activateTab:h,handleClose:g}=d(je);return{trigger:p,mergedClosable:i(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?a.value:t}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&g(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){m();return}let{name:t}=e,r=++u.id;if(t!==n.value){let{value:i}=f;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&u.id===r&&h(t)}):h(t)}}}},render(){let{internalAddable:r,clsPrefix:i,name:a,disabled:o,label:c,tab:l,value:d,mergedClosable:f,trigger:p,$slots:{default:m}}=this,h=c??l;return e(),t(`div`,{class:P(`${i}-tabs-tab-wrapper`)},[this.internalLeftPadded?(e(),t(`div`,{key:0,class:P(`${i}-tabs-tab-pad`)},null,2)):L(()=>null),(e(),t(`div`,u({key:a,"data-name":a,"data-disabled":o?!0:void 0},u({class:[`${i}-tabs-tab`,d===a&&`${i}-tabs-tab--active`,o&&`${i}-tabs-tab--disabled`,f&&`${i}-tabs-tab--closable`,r&&`${i}-tabs-tab--addable`,r?this.addTabClass:this.tabClass],onClick:p===`click`?this.activateTab:void 0,onMouseenter:p===`hover`?this.activateTab:void 0,style:r?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[n(`span`,{class:P(`${i}-tabs-tab__label`)},[r?(e(),t(v,{key:0},[n(`div`,{class:P(`${i}-tabs-tab__height-placeholder`)},`\xA0`,2),(e(),s(pe,{clsPrefix:i},{default:()=>(e(),s(ce))},1032,[`clsPrefix`]))],64)):(e(),t(v,{key:1},[m?(e(),t(v,{key:0},[L(()=>m())],64)):(e(),t(v,{key:1},[typeof h==`object`?(e(),t(v,{key:0},[L(()=>h)],64)):(e(),t(v,{key:1},[L(()=>ue(h??a))],64))],64))],64))],2),f&&this.type===`card`?(e(),s(de,{key:0,clsPrefix:i,class:P(`${i}-tabs-tab__close`),onClick:this.handleClose,disabled:o},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):L(()=>null)],16,Pe))],2)}}),Le=H(`tabs`,`
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
 `)])]),Re=o({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:t,disabled:n,type:r,vertical:i,rtl:o,theme:c,themeOverrides:l,handleClick:u}=this,d=r===`next`,f=i?d:o?!d:d;return e(),s(z,{text:!0,disabled:n,size:`small`,theme:c,themeOverrides:l,onClick:u,class:P([`${t}-tabs-scroll-button`,!i&&r===`prev`&&`${t}-tabs-scroll-button--start`,!i&&r===`next`&&`${t}-tabs-scroll-button--end`,i&&r===`prev`&&`${t}-tabs-scroll-button--up`,i&&r===`next`&&`${t}-tabs-scroll-button--down`])},{icon:()=>(e(),s(pe,{clsPrefix:t,style:a(i?{transform:`rotate(90deg)`}:void 0)},{default:()=>f?(e(),s(se,{key:1})):(e(),s(De,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),ze=we,Be={...T.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ve=o({name:`Tabs`,props:Be,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:a,mergedComponentPropsRef:o,mergedRtlRef:s}=ee(e),l=F(`Tabs`,s,n),u=i(()=>{let{placement:t}=e;return t===`start`?l?.value?`right`:`left`:t===`end`?l?.value?`left`:`right`:t}),d=T(`Tabs`,`-tabs`,Le,Ae,e,n),g=c(null),v=c(null),y=c(null),b=c(null),x=c(null),S=c(null),C=c(null),w=c(!0),E=c(!0),D=oe(e,[`labelSize`,`size`]),O=i(()=>D.value?D.value:o?.value?.Tabs?.size||`medium`),k=oe(e,[`activeName`,`value`]),A=c(k.value??e.defaultValue??(t.default?fe(t.default())[0]?.props?.name:null)),M=ae(k,A),N={id:0},P=i(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});h(M,()=>{N.id=0,z(),f(()=>{B()})});function I(){let{value:e}=M;return e===null?null:g.value?.querySelector(`[data-name="${e}"]`)}function L(t){if(e.type===`card`)return;let{value:r}=y;if(!r)return;let i=r.style.opacity===`0`;if(t){let a=`${n.value}-tabs-bar--disabled`,{barWidth:o}=e,s=u.value;if(t.dataset.disabled===`true`?r.classList.add(a):r.classList.remove(a),[`top`,`bottom`].includes(s)){if(R([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;r.style.left=`${e}px`,r.style.maxWidth=`${o}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width=`8192px`,i&&(r.style.transition=`none`),r.offsetWidth,i&&(r.style.transition=``,r.style.opacity=`1`)}else{if(R([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;r.style.top=`${e}px`,r.style.maxHeight=`${o}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height=`8192px`,i&&(r.style.transition=`none`),r.offsetHeight,i&&(r.style.transition=``,r.style.opacity=`1`)}}}function te(){if(e.type===`card`)return;let{value:t}=y;t&&(t.style.opacity=`0`)}function R(e){let{value:t}=y;if(t)for(let n of e)t.style[n]=``}function z(){if(e.type===`card`)return;let t=I();t?L(t):te()}function re(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function B(){let t=[`top`,`bottom`].includes(u.value),n=I();if(n){if(t){let r=S.value?.$el;if(!r)return;re(r,n,t,e.centerActiveTab)}else{let{value:r}=C;if(!r)return;re(r,n,t,e.centerActiveTab)}}}let H=c(null),U=0,W=null;function se(e){let t=H.value;if(t){U=e.getBoundingClientRect().height;let n=`${U}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};W?(r(),W(),W=null):W=r}}function ce(e){let t=H.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(U,n)}px`};W?(W(),W=null,r()):W=r}}function le(){let t=H.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let ue={value:[]},de=c(`next`);function pe(e){let t=M.value,n=`next`;for(let r of ue.value){if(r===t)break;if(r===e){n=`prev`;break}}de.value=n,me(e)}function me(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&V(n,t),r&&V(r,t),i&&V(i,t),A.value=t}function K(t){let{onClose:n}=e;n&&V(n,t)}function he(e){if([`top`,`bottom`].includes(u.value)){let{value:t}=S;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!l?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=C;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let ge=!0;function q(){let{value:e}=y;if(!e)return;ge&&=!1;let t=`transition-disabled`;e.classList.add(t),z(),e.classList.remove(t)}let J=c(null);function Y({transitionDisabled:e}){let t=g.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=I();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}h([M],()=>{e.type===`segment`&&f(()=>{Y({transitionDisabled:!1})})}),p(()=>{e.type===`segment`&&Y({transitionDisabled:!0})});let _e=0;function ve(t){if(t.contentRect.width===0&&t.contentRect.height===0||_e===t.contentRect.width)return;_e=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(ge||e.justifyContent?.startsWith(`space`))&&q(),n!==`segment`&&$(Ce())}let ye=ze(ve,64);function be(){let{type:t}=e;t===`line`||t===`bar`?q():t===`segment`&&Y({transitionDisabled:!0})}h([()=>e.justifyContent,()=>e.size],()=>{f(()=>{(e.type===`line`||e.type===`bar`)&&q()})}),h([u,()=>l?.value],()=>{f(()=>{be(),$(Ce(),{instantly:!0})})}),h(()=>e.type,()=>{f(()=>{let e=v.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let X=c(!1);function Z(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=u.value;if(!X.value)o===`top`||o===`bottom`?i<n&&(X.value=!0):a<r&&(X.value=!0);else{let{value:e}=x;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(X.value=!1):a-r>e.$el.offsetHeight&&(X.value=!1)}$(S.value?.$el||null)}let xe=ze(Z,64);function Se(){let{onAdd:t}=e;t&&t()}let Q=c(!1);function Ce(){let e=u.value;return(e===`top`||e===`bottom`?S.value?.$el:C.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?b.value:null;n&&n.classList.add(`transition-disabled`);let r=u.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);w.value=i<=1,E.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;w.value=t<=1,E.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let we=ze(e=>{$(e.target)},64);m(je,{triggerRef:r(e,`trigger`),tabStyleRef:r(e,`tabStyle`),tabClassRef:r(e,`tabClass`),addTabStyleRef:r(e,`addTabStyle`),addTabClassRef:r(e,`addTabClass`),paneClassRef:r(e,`paneClass`),paneStyleRef:r(e,`paneStyle`),mergedClsPrefixRef:n,typeRef:r(e,`type`),closableRef:r(e,`closable`),valueRef:M,tabChangeIdRef:N,onBeforeLeaveRef:r(e,`onBeforeLeave`),activateTab:pe,handleClose:K,handleAdd:Se}),ie(()=>{z(),B()}),_(()=>{let{value:e}=b;if(!e)return;let{value:t}=n,r=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;w.value?e.classList.remove(r):e.classList.add(r),E.value?e.classList.remove(i):e.classList.add(i)});let Te={syncBarPosition:()=>{z()},scrollToCurrentTab:()=>{B()}},Ee=()=>{Y({transitionDisabled:!0})},De=i(()=>{let{value:t}=O,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[j(`panePadding`,t)]:C,[j(`tabPadding`,r)]:w,[j(`tabPaddingVertical`,r)]:T,[j(`tabGap`,r)]:E,[j(`tabGap`,`${r}Vertical`)]:D,[j(`tabTextColor`,n)]:k,[j(`tabTextColorActive`,n)]:A,[j(`tabTextColorHover`,n)]:M,[j(`tabTextColorDisabled`,n)]:N,[j(`tabFontSize`,t)]:P},common:{cubicBezierEaseInOut:F}}=d.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":k,"--n-tab-text-color-active":A,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":G(C,`left`),"--n-pane-padding-right":G(C,`right`),"--n-pane-padding-top":G(C,`top`),"--n-pane-padding-bottom":G(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Oe=a?ne(`tabs`,i(()=>`${O.value[0]}${e.type[0]}`),De,e):void 0;return{mergedClsPrefix:n,mergedValue:M,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:H,tabsElRef:g,selfElRef:v,barElRef:y,addTabInstRef:x,xScrollInstRef:S,scrollWrapperElRef:b,addTabFixed:X,tabWrapperStyle:P,handleNavResize:ye,mergedSize:O,handleScroll:we,handleTabsResize:xe,cssVars:a?void 0:De,themeClass:Oe?.themeClass,animationDirection:de,renderNameListRef:ue,yScrollElRef:C,handleSegmentResize:Ee,onAnimationBeforeLeave:se,onAnimationEnter:ce,onAnimationAfterEnter:le,onRender:Oe?.onRender,startReachedRef:w,endReachedRef:E,isOverflow:Q,handleButtonClick:he,mergedTheme:d,rtlEnabled:l,mergedPlacement:u,...Te}},render(){let{mergedClsPrefix:r,type:i,mergedPlacement:o,addTabFixed:c,addable:l,mergedSize:d,renderNameListRef:f,onRender:p,paneWrapperClass:m,paneWrapperStyle:h,startReachedRef:g,endReachedRef:_,isOverflow:y,showScrollButton:x,handleButtonClick:S,mergedTheme:C,rtlEnabled:w,$slots:{default:T,prefix:E,suffix:D}}=this;p?.();let k=T?fe(T()).filter(e=>e.type.__TAB_PANE__===!0):[],A=T?fe(T()).filter(e=>e.type.__TAB__===!0):[],j=!A.length,M=i===`card`,N=i===`segment`,F=!M&&!N&&this.justifyContent;f.value=[];let ee=()=>{let n=(e(),t(`div`,{style:a(this.tabWrapperStyle),class:P(`${r}-tabs-wrapper`)},[F?L(()=>null):(e(),t(`div`,{key:1,class:P(`${r}-tabs-scroll-padding`),style:a(o===`top`||o===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),j?(e(),t(v,{key:2},[L(()=>k.map((t,n)=>(f.value.push(t.props.name),Ge((e(),s(Ie,u(t.props,{internalCreatedByPane:!0,internalLeftPadded:n!==0&&(!F||F===`center`||F===`start`||F===`end`)}),b(t.children?{default:t.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(e(),t(v,{key:3},[L(()=>A.map((e,t)=>(f.value.push(e.props.name),Ge(t!==0&&!F?We(e):e))))],64)),!c&&l&&M?(e(),t(v,{key:4},[L(()=>Ue(l,(j?k.length:A.length)!==0))],64)):L(()=>null),F?L(()=>null):(e(),t(`div`,{key:7,class:P(`${r}-tabs-scroll-padding`),style:a({width:`${this.tabsPadding}px`})},null,6)),M?L(()=>null):(e(),t(`div`,{key:9,ref:`barElRef`,class:P(`${r}-tabs-bar`)},null,2))],6));return e(),t(`div`,{ref:`tabsElRef`,class:P(`${r}-tabs-nav-scroll-content`)},[M&&l?(e(),s(K,{key:0,onResize:this.handleTabsResize},{default:()=>n},1032,[`onResize`])):(e(),t(v,{key:1},[L(()=>n)],64)),M?(e(),t(`div`,{key:2,class:P(`${r}-tabs-pad`)},null,2)):L(()=>null)],2)},I=N?`top`:o;return e(),t(`div`,{ref:`selfElRef`,class:P([`${r}-tabs`,this.themeClass,`${r}-tabs--${i}-type`,`${r}-tabs--${d}-size`,F&&`${r}-tabs--flex`,`${r}-tabs--${I}`,w&&`${r}-tabs--rtl`]),style:a(this.cssVars)},[n(`div`,{class:P([`${r}-tabs-nav--${i}-type`,`${r}-tabs-nav--${I}`,`${r}-tabs-nav`])},[L(()=>O(E,n=>n&&(e(),t(`div`,{class:P(`${r}-tabs-nav__prefix`)},[L(()=>n)],2)))),N?(e(),s(K,{key:0,onResize:this.handleSegmentResize},{default:()=>(e(),t(`div`,{class:P(`${r}-tabs-rail`),ref:`tabsElRef`},[n(`div`,{class:P(`${r}-tabs-capsule`),ref:`segmentCapsuleElRef`},[n(`div`,{class:P(`${r}-tabs-wrapper`)},[n(`div`,{class:P(`${r}-tabs-tab`)},null,2)],2)],2),j?(e(),t(v,{key:0},[L(()=>k.map((t,n)=>(f.value.push(t.props.name),e(),s(Ie,u(t.props,{internalCreatedByPane:!0,internalLeftPadded:n!==0}),b(t.children?{default:t.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(e(),t(v,{key:1},[L(()=>A.map((e,t)=>(f.value.push(e.props.name),t===0?e:We(e))))],64))],2))},1032,[`onResize`])):(e(),t(v,{key:1},[L(()=>x&&y&&(e(),s(Re,{mergedClsPrefix:r,type:`prev`,vertical:I===`left`||I===`right`,disabled:g,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(e(),s(K,{onResize:this.handleNavResize},{default:()=>(e(),t(`div`,{class:P(`${r}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(I)?(e(),s(Ee,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:ee},1032,[`onScroll`])):(e(),t(`div`,{key:1,class:P(`${r}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[L(()=>ee())],42,[`onScroll`]))],2))},1032,[`onResize`])),L(()=>x&&y&&(e(),s(Re,{mergedClsPrefix:r,type:`next`,vertical:I===`left`||I===`right`,disabled:_,rtl:!!w,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,onClick:S},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),c&&l&&M?(e(),t(v,{key:2},[L(()=>Ue(l,!0))],64)):L(()=>null),L(()=>O(D,n=>n&&(e(),t(`div`,{class:P(`${r}-tabs-nav__suffix`)},[L(()=>n)],2))))],2),L(()=>j&&(this.animated&&(I===`top`||I===`bottom`)?(e(),t(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:a(h),class:P([`${r}-tabs-pane-wrapper`,m])},[L(()=>He(k,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):He(k,this.mergedValue,this.renderedNames)))],6)}});function He(t,n,r,i,a,o,c){let l=[];return t.forEach(e=>{let{name:t,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,s=n===t;if(e.key!==void 0&&(e.key=t),s||o(`show`)||o(`show:lazy`)&&r.has(t)){r.has(t)||r.add(t);let n=!o(`if`);l.push(n?g(e,[[E,s]]):e)}}),c?(e(),s(N,{name:`${c}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>l},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):l}function Ue(t,n){return e(),s(Ie,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:n,disabled:typeof t==`object`&&t.disabled},null,8,[`internalLeftPadded`,`disabled`])}function We(e){let t=l(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Ge(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Ne as n,Ve as t};