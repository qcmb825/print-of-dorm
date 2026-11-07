import{At as e,J as t,Jt as n,Pt as r,Q as i,U as a,Ut as o,X as s,Y as c,_t as l,bt as u,dt as d,fn as f,ft as p,it as m,jt as h,lt as g,q as _,st as v,xt as y}from"./endpoints-B5qu1zMG.js";import{$t as b,F as x,I as S,Jt as C,L as w,P as T,St as E,Ut as D,Xt as O,Zt as k,_t as A,bt as j,cn as M,ct as N,d as P,dt as ee,en as F,ft as I,j as L,k as te,l as ne,lt as R,mt as re,nn as z,ot as B,tn as V,un as H,w as ie}from"./motion-amoZaQIY.js";import{i as ae,n as U,r as oe,t as W}from"./cssr-CneKOi6G.js";import{t as se}from"./use-merged-state-BlV20yti.js";import{t as ce}from"./ChevronRight-gkZdhTLP.js";import{t as le}from"./Add-CSU0YNBD.js";import{E as ue,H as de,Z as G,b as fe,h as pe,j as K,rt as me}from"./index-DetkDE_U.js";var he=/\s/;function ge(e){for(var t=e.length;t--&&he.test(e.charAt(t)););return t}var q=/^\s+/;function J(e){return e&&e.slice(0,ge(e)+1).replace(q,``)}var Y=NaN,_e=/^[-+]0x[0-9a-f]+$/i,ve=/^0b[01]+$/i,ye=/^0o[0-7]+$/i,be=parseInt;function X(e){if(typeof e==`number`)return e;if(me(e))return Y;if(D(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=D(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=J(e);var n=ve.test(e);return n||ye.test(e)?be(e.slice(2),n?2:8):_e.test(e)?Y:+e}var Z=function(){return C.Date.now()},xe=`Expected a function`,Se=Math.max,Q=Math.min;function Ce(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,f=!0;if(typeof e!=`function`)throw TypeError(xe);t=X(t)||0,D(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?Se(X(n.maxWait)||0,t):a,f=`trailing`in n?!!n.trailing:f);function p(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function m(e){return l=e,s=setTimeout(_,t),u?p(e):o}function h(e){var n=e-c,r=e-l,i=t-n;return d?Q(i,a-r):i}function g(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function _(){var e=Z();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,f&&r?p(e):(r=i=void 0,o)}function y(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function b(){return s===void 0?o:v(Z())}function x(){var e=Z(),n=g(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return m(c);if(d)return clearTimeout(s),s=setTimeout(_,t),p(c)}return s===void 0&&(s=setTimeout(_,t)),o}return x.cancel=y,x.flush=b,x}var $=`Expected a function`;function we(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError($);return D(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ce(e,t,{leading:r,maxWait:t,trailing:i})}var Te=W(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[W(`&::-webkit-scrollbar`,{width:0,height:0})]),Ee=m({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=o(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=re();return Te.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:U,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return v(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),De=m({name:`ChevronLeft`,render(){return(()=>{let e=N(`dfe229c2639b2082`);return e[0]||=c(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[c(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Oe={tabFontSizeSmall:`14px`,tabFontSizeMedium:`14px`,tabFontSizeLarge:`16px`,tabGapSmallLine:`36px`,tabGapMediumLine:`36px`,tabGapLargeLine:`36px`,tabGapSmallLineVertical:`8px`,tabGapMediumLineVertical:`8px`,tabGapLargeLineVertical:`8px`,tabPaddingSmallLine:`6px 0`,tabPaddingMediumLine:`10px 0`,tabPaddingLargeLine:`14px 0`,tabPaddingVerticalSmallLine:`6px 12px`,tabPaddingVerticalMediumLine:`8px 16px`,tabPaddingVerticalLargeLine:`10px 20px`,tabGapSmallBar:`36px`,tabGapMediumBar:`36px`,tabGapLargeBar:`36px`,tabGapSmallBarVertical:`8px`,tabGapMediumBarVertical:`8px`,tabGapLargeBarVertical:`8px`,tabPaddingSmallBar:`4px 0`,tabPaddingMediumBar:`6px 0`,tabPaddingLargeBar:`10px 0`,tabPaddingVerticalSmallBar:`6px 12px`,tabPaddingVerticalMediumBar:`8px 16px`,tabPaddingVerticalLargeBar:`10px 20px`,tabGapSmallCard:`4px`,tabGapMediumCard:`4px`,tabGapLargeCard:`4px`,tabGapSmallCardVertical:`4px`,tabGapMediumCardVertical:`4px`,tabGapLargeCardVertical:`4px`,tabPaddingSmallCard:`8px 16px`,tabPaddingMediumCard:`10px 20px`,tabPaddingLargeCard:`12px 24px`,tabPaddingSmallSegment:`4px 0`,tabPaddingMediumSegment:`6px 0`,tabPaddingLargeSegment:`8px 0`,tabPaddingVerticalLargeSegment:`0 8px`,tabPaddingVerticalSmallCard:`8px 12px`,tabPaddingVerticalMediumCard:`10px 16px`,tabPaddingVerticalLargeCard:`12px 20px`,tabPaddingVerticalSmallSegment:`0 4px`,tabPaddingVerticalMediumSegment:`0 6px`,tabGapSmallSegment:`0`,tabGapMediumSegment:`0`,tabGapLargeSegment:`0`,tabGapSmallSegmentVertical:`0`,tabGapMediumSegmentVertical:`0`,tabGapLargeSegmentVertical:`0`,panePaddingSmall:`8px 0 0 0`,panePaddingMedium:`12px 0 0 0`,panePaddingLarge:`16px 0 0 0`,closeSize:`18px`,closeIconSize:`14px`};function ke(e){let{textColor2:t,primaryColor:n,textColorDisabled:r,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeColorHover:s,closeColorPressed:c,tabColor:l,baseColor:u,dividerColor:d,fontWeight:f,textColor1:p,borderRadius:m,fontSize:h,fontWeightStrong:g}=e;return{...Oe,colorSegment:l,tabFontSizeCard:h,tabTextColorLine:p,tabTextColorActiveLine:n,tabTextColorHoverLine:n,tabTextColorDisabledLine:r,tabTextColorSegment:p,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:r,tabTextColorBar:p,tabTextColorActiveBar:n,tabTextColorHoverBar:n,tabTextColorDisabledBar:r,tabTextColorCard:p,tabTextColorHoverCard:p,tabTextColorActiveCard:n,tabTextColorDisabledCard:r,barColor:n,closeIconColor:i,closeIconColorHover:a,closeIconColorPressed:o,closeColorHover:s,closeColorPressed:c,closeBorderRadius:m,tabColor:l,tabColorSegment:u,tabBorderColor:d,tabFontWeightActive:f,tabFontWeight:f,tabBorderRadius:m,paneTextColor:t,fontWeightStrong:g}}var Ae=T({name:`Tabs`,common:w,peers:{Button:P},self:ke}),je=j(`n-tabs`),Me={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ne=m({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:Me,slots:Object,setup(e){let t=g(je,null);return t||E(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return u(),i(`div`,{class:R([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:f(this.style)},[I(()=>this.$slots.default?.())],6)}}),Pe=[`data-name`,`data-disabled`],Fe={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...pe(Me,[`displayDirective`])},Ie=m({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Fe,setup(e){let{mergedClsPrefixRef:n,valueRef:r,typeRef:i,closableRef:a,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:u,onBeforeLeaveRef:d,triggerRef:f,handleAdd:p,activateTab:m,handleClose:h}=g(je);return{trigger:f,mergedClosable:t(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?a.value:t}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:n,value:r,type:i,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,n=++u.id;if(t!==r.value){let{value:i}=d;i?Promise.resolve(i(e.name,r.value)).then(e=>{e&&u.id===n&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:o,tab:l,value:f,mergedClosable:p,trigger:m,$slots:{default:h}}=this,g=o??l;return u(),i(`div`,{class:R(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(u(),i(`div`,{key:0,class:R(`${t}-tabs-tab-pad`)},null,2)):I(()=>null),(u(),i(`div`,d({key:n,"data-name":n,"data-disabled":r?!0:void 0},d({class:[`${t}-tabs-tab`,f===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,p&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:m===`click`?this.activateTab:void 0,onMouseenter:m===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[c(`span`,{class:R(`${t}-tabs-tab__label`)},[e?(u(),i(a,{key:0},[c(`div`,{class:R(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(u(),s(G,{clsPrefix:t},{default:()=>(u(),s(le))},1032,[`clsPrefix`]))],64)):(u(),i(a,{key:1},[h?(u(),i(a,{key:0},[I(()=>h())],64)):(u(),i(a,{key:1},[typeof g==`object`?(u(),i(a,{key:0},[I(()=>g)],64)):(u(),i(a,{key:1},[I(()=>fe(g??n))],64))],64))],64))],2),p&&this.type===`card`?(u(),s(ue,{key:0,clsPrefix:t,class:R(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:r},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):I(()=>null)],16,Pe))],2)}}),Le=k(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[O(`&.transition-disabled`,[k(`tabs-tab`,`
 transition: none !important;
 `),k(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),k(`tabs-tab-pad`,`
 transition: none !important;
 `)]),F(`segment-type`,[k(`tabs-rail`,[O(`&.transition-disabled`,[k(`tabs-capsule`,`
 transition: none;
 `)])])]),F(`top`,[k(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),F(`left`,[k(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),F(`left, right`,`
 flex-direction: row;
 `,[k(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),k(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),F(`right`,`
 flex-direction: row-reverse;
 `,[k(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),k(`tabs-bar`,`
 left: 0;
 `)]),F(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[k(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),k(`tabs-bar`,`
 top: 0;
 `)]),k(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[k(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),k(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[k(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[F(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),O(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),F(`flex`,[k(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[k(`tabs-wrapper`,`
 width: 100%;
 `,[k(`tabs-tab`,`
 margin-right: 0;
 `)])])]),k(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[b(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),b(`prefix`,`padding-right: 16px;`),b(`suffix`,`padding-left: 16px;`)]),F(`top, bottom`,[O(`>`,[k(`tabs-nav`,[k(`tabs-nav-scroll-wrapper`,[O(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),O(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),F(`shadow-start`,[O(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),F(`shadow-end`,[O(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),F(`left, right`,[k(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),O(`>`,[k(`tabs-nav`,[k(`tabs-nav-scroll-wrapper`,[O(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),O(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),F(`shadow-start`,[O(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),F(`shadow-end`,[O(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),k(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[k(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[O(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),O(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),O(`&.transition-disabled`,[O(`&::before, &::after`,`
 transition: none;
 `)])]),k(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),k(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),k(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),k(`tabs-tab`,`
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
 `,[F(`disabled`,{cursor:`not-allowed`}),b(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),b(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),k(`tabs-bar`,`
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
 `,[O(`&.transition-disabled`,`
 transition: none;
 `),F(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),k(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),k(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[O(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),O(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),O(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),O(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),O(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),k(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),F(`line-type, bar-type`,[k(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[O(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),F(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),F(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),k(`tabs-nav`,[b(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),F(`line-type`,[F(`top`,[b(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 bottom: -1px;
 `)]),F(`left`,[b(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 right: -1px;
 `)]),F(`right`,[b(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 left: -1px;
 `)]),F(`bottom`,[b(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-bar`,`
 top: -1px;
 `)]),b(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-bar`,`
 border-radius: 0;
 `)]),F(`card-type`,[b(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),k(`tabs-tab`,`
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
 `,[F(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[b(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),V(`disabled`,[O(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),F(`closable`,`padding-inline-end: 8px;`),F(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),F(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),F(`left, right`,`
 flex-direction: column; 
 `,[b(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),k(`tabs-wrapper`,`
 flex-direction: column;
 `),k(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[k(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),F(`top`,[F(`card-type`,[k(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),b(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-bottom: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),F(`left`,[F(`card-type`,[k(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),b(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-right: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),F(`right`,[F(`card-type`,[k(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),b(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-left: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),F(`bottom`,[F(`card-type`,[k(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),b(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[F(`active`,`
 border-top: 1px solid #0000;
 `)]),k(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),k(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),k(`tabs-scroll-button`,[F(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),F(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),F(`up`,`
 padding-bottom: 10px;
 `),F(`down`,`
 padding-top: 10px;
 `)])]),Re=m({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:c}=this,l=n===`next`,d=r?l:i?!l:l;return u(),s(ne,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:c,class:R([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(u(),s(G,{clsPrefix:e,style:f(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>d?(u(),s(ce,{key:1})):(u(),s(De,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),ze=we,Be={...x.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ve=m({name:`Tabs`,props:Be,slots:Object,setup(r,{slots:i}){let{mergedClsPrefixRef:a,inlineThemeDisabled:s,mergedComponentPropsRef:c,mergedRtlRef:u}=A(r),d=ie(`Tabs`,u,a),f=t(()=>{let{placement:e}=r;return e===`start`?d?.value?`right`:`left`:e===`end`?d?.value?`left`:`right`:e}),m=x(`Tabs`,`-tabs`,Le,Ae,r,a),g=o(null),_=o(null),v=o(null),b=o(null),C=o(null),w=o(null),T=o(null),E=o(!0),D=o(!0),O=oe(r,[`labelSize`,`size`]),k=t(()=>O.value?O.value:c?.value?.Tabs?.size||`medium`),j=oe(r,[`activeName`,`value`]),M=o(j.value??r.defaultValue??(i.default?de(i.default())[0]?.props?.name:null)),N=se(j,M),P={id:0},ee=t(()=>{if(r.justifyContent&&r.type!==`card`)return{display:`flex`,justifyContent:r.justifyContent}});e(N,()=>{P.id=0,R(),p(()=>{V()})});function F(){let{value:e}=N;return e===null?null:g.value?.querySelector(`[data-name="${e}"]`)}function I(e){if(r.type===`card`)return;let{value:t}=v;if(!t)return;let n=t.style.opacity===`0`;if(e){let i=`${a.value}-tabs-bar--disabled`,{barWidth:o}=r,s=f.value;if(e.dataset.disabled===`true`?t.classList.add(i):t.classList.remove(i),[`top`,`bottom`].includes(s)){if(ne([`top`,`maxHeight`,`height`]),typeof o==`number`&&e.offsetWidth>=o){let n=Math.floor((e.offsetWidth-o)/2)+e.offsetLeft;t.style.left=`${n}px`,t.style.maxWidth=`${o}px`}else t.style.left=`${e.offsetLeft}px`,t.style.maxWidth=`${e.offsetWidth}px`;t.style.width=`8192px`,n&&(t.style.transition=`none`),t.offsetWidth,n&&(t.style.transition=``,t.style.opacity=`1`)}else{if(ne([`left`,`maxWidth`,`width`]),typeof o==`number`&&e.offsetHeight>=o){let n=Math.floor((e.offsetHeight-o)/2)+e.offsetTop;t.style.top=`${n}px`,t.style.maxHeight=`${o}px`}else t.style.top=`${e.offsetTop}px`,t.style.maxHeight=`${e.offsetHeight}px`;t.style.height=`8192px`,n&&(t.style.transition=`none`),t.offsetHeight,n&&(t.style.transition=``,t.style.opacity=`1`)}}}function te(){if(r.type===`card`)return;let{value:e}=v;e&&(e.style.opacity=`0`)}function ne(e){let{value:t}=v;if(t)for(let n of e)t.style[n]=``}function R(){if(r.type===`card`)return;let e=F();e?I(e):te()}function re(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function V(){let e=[`top`,`bottom`].includes(f.value),t=F();if(t){if(e){let n=w.value?.$el;if(!n)return;re(n,t,e,r.centerActiveTab)}else{let{value:n}=T;if(!n)return;re(n,t,e,r.centerActiveTab)}}}let H=o(null),U=0,W=null;function ce(e){let t=H.value;if(t){U=e.getBoundingClientRect().height;let n=`${U}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};W?(r(),W(),W=null):W=r}}function le(e){let t=H.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(U,n)}px`};W?(W(),W=null,r()):W=r}}function ue(){let e=H.value;if(e){e.style.maxHeight=``,e.style.height=``;let{paneWrapperStyle:t}=r;if(typeof t==`string`)e.style.cssText=t;else if(t){let{maxHeight:n,height:r}=t;n!==void 0&&(e.style.maxHeight=n),r!==void 0&&(e.style.height=r)}}}let G={value:[]},fe=o(`next`);function pe(e){let t=N.value,n=`next`;for(let r of G.value){if(r===t)break;if(r===e){n=`prev`;break}}fe.value=n,K(e)}function K(e){let{onActiveNameChange:t,onUpdateValue:n,"onUpdate:value":i}=r;t&&L(t,e),n&&L(n,e),i&&L(i,e),M.value=e}function me(e){let{onClose:t}=r;t&&L(t,e)}function he(e){if([`top`,`bottom`].includes(f.value)){let{value:t}=w;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!d?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=T;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let ge=!0;function q(){let{value:e}=v;if(!e)return;ge&&=!1;let t=`transition-disabled`;e.classList.add(t),R(),e.classList.remove(t)}let J=o(null);function Y({transitionDisabled:e}){let t=g.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=F();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}e([N],()=>{r.type===`segment`&&p(()=>{Y({transitionDisabled:!1})})}),l(()=>{r.type===`segment`&&Y({transitionDisabled:!0})});let _e=0;function ve(e){if(e.contentRect.width===0&&e.contentRect.height===0||_e===e.contentRect.width)return;_e=e.contentRect.width;let{type:t}=r;(t===`line`||t===`bar`)&&(ge||r.justifyContent?.startsWith(`space`))&&q(),t!==`segment`&&$(Ce())}let ye=ze(ve,64);function be(){let{type:e}=r;e===`line`||e===`bar`?q():e===`segment`&&Y({transitionDisabled:!0})}e([()=>r.justifyContent,()=>r.size],()=>{p(()=>{(r.type===`line`||r.type===`bar`)&&q()})}),e([f,()=>d?.value],()=>{p(()=>{be(),$(Ce(),{instantly:!0})})}),e(()=>r.type,()=>{p(()=>{let e=_.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let X=o(!1);function Z(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=f.value;if(!X.value)o===`top`||o===`bottom`?i<n&&(X.value=!0):a<r&&(X.value=!0);else{let{value:e}=C;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(X.value=!1):a-r>e.$el.offsetHeight&&(X.value=!1)}$(w.value?.$el||null)}let xe=ze(Z,64);function Se(){let{onAdd:e}=r;e&&e()}let Q=o(!1);function Ce(){let e=f.value;return(e===`top`||e===`bottom`?w.value?.$el:T.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?b.value:null;n&&n.classList.add(`transition-disabled`);let r=f.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);E.value=i<=1,D.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;E.value=t<=1,D.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let we=ze(e=>{$(e.target)},64);y(je,{triggerRef:n(r,`trigger`),tabStyleRef:n(r,`tabStyle`),tabClassRef:n(r,`tabClass`),addTabStyleRef:n(r,`addTabStyle`),addTabClassRef:n(r,`addTabClass`),paneClassRef:n(r,`paneClass`),paneStyleRef:n(r,`paneStyle`),mergedClsPrefixRef:a,typeRef:n(r,`type`),closableRef:n(r,`closable`),valueRef:N,tabChangeIdRef:P,onBeforeLeaveRef:n(r,`onBeforeLeave`),activateTab:pe,handleClose:me,handleAdd:Se}),ae(()=>{R(),V()}),h(()=>{let{value:e}=b;if(!e)return;let{value:t}=a,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,r=`${t}-tabs-nav-scroll-wrapper--shadow-end`;E.value?e.classList.remove(n):e.classList.add(n),D.value?e.classList.remove(r):e.classList.add(r)});let Te={syncBarPosition:()=>{R()},scrollToCurrentTab:()=>{V()}},Ee=()=>{Y({transitionDisabled:!0})},De=t(()=>{let{value:e}=k,{type:t}=r,n=`${e}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[t]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:p,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[z(`panePadding`,e)]:C,[z(`tabPadding`,n)]:w,[z(`tabPaddingVertical`,n)]:T,[z(`tabGap`,n)]:E,[z(`tabGap`,`${n}Vertical`)]:D,[z(`tabTextColor`,t)]:O,[z(`tabTextColorActive`,t)]:A,[z(`tabTextColorHover`,t)]:j,[z(`tabTextColorDisabled`,t)]:M,[z(`tabFontSize`,e)]:N},common:{cubicBezierEaseInOut:P}}=m.value;return{"--n-bezier":P,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":N,"--n-tab-text-color":O,"--n-tab-text-color-active":A,"--n-tab-text-color-disabled":M,"--n-tab-text-color-hover":j,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":p,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":B(C,`left`),"--n-pane-padding-right":B(C,`right`),"--n-pane-padding-top":B(C,`top`),"--n-pane-padding-bottom":B(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Oe=s?S(`tabs`,t(()=>`${k.value[0]}${r.type[0]}`),De,r):void 0;return{mergedClsPrefix:a,mergedValue:N,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:H,tabsElRef:g,selfElRef:_,barElRef:v,addTabInstRef:C,xScrollInstRef:w,scrollWrapperElRef:b,addTabFixed:X,tabWrapperStyle:ee,handleNavResize:ye,mergedSize:k,handleScroll:we,handleTabsResize:xe,cssVars:s?void 0:De,themeClass:Oe?.themeClass,animationDirection:fe,renderNameListRef:G,yScrollElRef:T,handleSegmentResize:Ee,onAnimationBeforeLeave:ce,onAnimationEnter:le,onAnimationAfterEnter:ue,onRender:Oe?.onRender,startReachedRef:E,endReachedRef:D,isOverflow:Q,handleButtonClick:he,mergedTheme:m,rtlEnabled:d,mergedPlacement:f,...Te}},render(){let{mergedClsPrefix:e,type:t,mergedPlacement:n,addTabFixed:r,addable:o,mergedSize:l,renderNameListRef:p,onRender:m,paneWrapperClass:h,paneWrapperStyle:g,startReachedRef:_,endReachedRef:v,isOverflow:y,showScrollButton:b,handleButtonClick:x,mergedTheme:S,rtlEnabled:C,$slots:{default:w,prefix:T,suffix:E}}=this;m?.();let D=w?de(w()).filter(e=>e.type.__TAB_PANE__===!0):[],O=w?de(w()).filter(e=>e.type.__TAB__===!0):[],k=!O.length,A=t===`card`,j=t===`segment`,M=!A&&!j&&this.justifyContent;p.value=[];let N=()=>{let t=(u(),i(`div`,{style:f(this.tabWrapperStyle),class:R(`${e}-tabs-wrapper`)},[M?I(()=>null):(u(),i(`div`,{key:1,class:R(`${e}-tabs-scroll-padding`),style:f(n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),k?(u(),i(a,{key:2},[I(()=>D.map((e,t)=>(p.value.push(e.props.name),Ge((u(),s(Ie,d(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!M||M===`center`||M===`start`||M===`end`)}),ee(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(u(),i(a,{key:3},[I(()=>O.map((e,t)=>(p.value.push(e.props.name),Ge(t!==0&&!M?We(e):e))))],64)),!r&&o&&A?(u(),i(a,{key:4},[I(()=>Ue(o,(k?D.length:O.length)!==0))],64)):I(()=>null),M?I(()=>null):(u(),i(`div`,{key:7,class:R(`${e}-tabs-scroll-padding`),style:f({width:`${this.tabsPadding}px`})},null,6)),A?I(()=>null):(u(),i(`div`,{key:9,ref:`barElRef`,class:R(`${e}-tabs-bar`)},null,2))],6));return u(),i(`div`,{ref:`tabsElRef`,class:R(`${e}-tabs-nav-scroll-content`)},[A&&o?(u(),s(K,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(u(),i(a,{key:1},[I(()=>t)],64)),A?(u(),i(`div`,{key:2,class:R(`${e}-tabs-pad`)},null,2)):I(()=>null)],2)},P=j?`top`:n;return u(),i(`div`,{ref:`selfElRef`,class:R([`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${l}-size`,M&&`${e}-tabs--flex`,`${e}-tabs--${P}`,C&&`${e}-tabs--rtl`]),style:f(this.cssVars)},[c(`div`,{class:R([`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${P}`,`${e}-tabs-nav`])},[I(()=>te(T,t=>t&&(u(),i(`div`,{class:R(`${e}-tabs-nav__prefix`)},[I(()=>t)],2)))),j?(u(),s(K,{key:0,onResize:this.handleSegmentResize},{default:()=>(u(),i(`div`,{class:R(`${e}-tabs-rail`),ref:`tabsElRef`},[c(`div`,{class:R(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[c(`div`,{class:R(`${e}-tabs-wrapper`)},[c(`div`,{class:R(`${e}-tabs-tab`)},null,2)],2)],2),k?(u(),i(a,{key:0},[I(()=>D.map((e,t)=>(p.value.push(e.props.name),u(),s(Ie,d(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),ee(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(u(),i(a,{key:1},[I(()=>O.map((e,t)=>(p.value.push(e.props.name),t===0?e:We(e))))],64))],2))},1032,[`onResize`])):(u(),i(a,{key:1},[I(()=>b&&y&&(u(),s(Re,{mergedClsPrefix:e,type:`prev`,vertical:P===`left`||P===`right`,disabled:_,rtl:!!C,theme:S.peers.Button,themeOverrides:S.peerOverrides.Button,onClick:x},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(u(),s(K,{onResize:this.handleNavResize},{default:()=>(u(),i(`div`,{class:R(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(P)?(u(),s(Ee,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:N},1032,[`onScroll`])):(u(),i(`div`,{key:1,class:R(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[I(()=>N())],42,[`onScroll`]))],2))},1032,[`onResize`])),I(()=>b&&y&&(u(),s(Re,{mergedClsPrefix:e,type:`next`,vertical:P===`left`||P===`right`,disabled:v,rtl:!!C,theme:S.peers.Button,themeOverrides:S.peerOverrides.Button,onClick:x},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),r&&o&&A?(u(),i(a,{key:2},[I(()=>Ue(o,!0))],64)):I(()=>null),I(()=>te(E,t=>t&&(u(),i(`div`,{class:R(`${e}-tabs-nav__suffix`)},[I(()=>t)],2))))],2),I(()=>k&&(this.animated&&(P===`top`||P===`bottom`)?(u(),i(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:f(g),class:R([`${e}-tabs-pane-wrapper`,h])},[I(()=>He(D,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):He(D,this.mergedValue,this.renderedNames)))],6)}});function He(e,t,n,i,a,o,c){let l=[];return e.forEach(e=>{let{name:i,displayDirective:a,"display-directive":o}=e.props,s=e=>a===e||o===e,c=t===i;if(e.key!==void 0&&(e.key=i),c||s(`show`)||s(`show:lazy`)&&n.has(i)){n.has(i)||n.add(i);let t=!s(`if`);l.push(t?r(e,[[H,c]]):e)}}),c?(u(),s(M,{name:`${c}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>l},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):l}function Ue(e,t){return u(),s(Ie,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function We(e){let t=_(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Ge(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Ne as n,Ve as t};