import{$t as e,A as t,An as n,At as r,B as i,Dn as a,Dr as o,Dt as s,F as c,H as l,Hn as u,Jn as d,L as f,Ln as p,Mn as m,Mt as h,On as g,Qn as _,Sr as v,St as y,U as b,Un as x,Vn as S,Zn as C,_r as w,ar as ee,bn as T,cr as E,dn as D,fn as O,gt as k,in as A,ir as j,kn as M,ln as N,m as P,on as F,sn as I,un as L,vn as te,vt as R,wn as z,wt as ne,xt as B,yt as V,zn as re}from"./endpoints-DxQPCLqF.js";import{r as H}from"./Scrollbar-C-sdX_Vk.js";import{i as ie,n as U,r as ae,t as W}from"./cssr-PC_ZRNdG.js";import{t as oe}from"./use-merged-state-BBKZotlX.js";import{t as G}from"./ChevronRight-DFEr4PZO.js";import{t as se}from"./Add-muCpiuIX.js";import{B as ce,M as le,ht as ue,it as de,m as fe,q as pe}from"./index-Dp3yRsNZ.js";var me=/\s/;function he(e){for(var t=e.length;t--&&me.test(e.charAt(t)););return t}var ge=/^\s+/;function _e(e){return e&&e.slice(0,he(e)+1).replace(ge,``)}var K=NaN,q=/^[-+]0x[0-9a-f]+$/i,J=/^0b[01]+$/i,Y=/^0o[0-7]+$/i,ve=parseInt;function ye(t){if(typeof t==`number`)return t;if(ue(t))return K;if(e(t)){var n=typeof t.valueOf==`function`?t.valueOf():t;t=e(n)?n+``:n}if(typeof t!=`string`)return t===0?t:+t;t=_e(t);var r=J.test(t);return r||Y.test(t)?ve(t.slice(2),r?2:8):q.test(t)?K:+t}var X=function(){return A.Date.now()},be=`Expected a function`,Z=Math.max,xe=Math.min;function Se(t,n,r){var i,a,o,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof t!=`function`)throw TypeError(be);n=ye(n)||0,e(r)&&(d=!!r.leading,f=`maxWait`in r,o=f?Z(ye(r.maxWait)||0,n):o,p=`trailing`in r?!!r.trailing:p);function m(e){var n=i,r=a;return i=a=void 0,u=e,s=t.apply(r,n),s}function h(e){return u=e,c=setTimeout(v,n),d?m(e):s}function g(e){var t=e-l,r=e-u,i=n-t;return f?xe(i,o-r):i}function _(e){var t=e-l,r=e-u;return l===void 0||t>=n||t<0||f&&r>=o}function v(){var e=X();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&i?m(e):(i=a=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,i=l=a=c=void 0}function x(){return c===void 0?s:y(X())}function S(){var e=X(),t=_(e);if(i=arguments,a=this,l=e,t){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,n),m(l)}return c===void 0&&(c=setTimeout(v,n)),s}return S.cancel=b,S.flush=x,S}var Ce=`Expected a function`;function Q(t,n,r){var i=!0,a=!0;if(typeof t!=`function`)throw TypeError(Ce);return e(r)&&(i=`leading`in r?!!r.leading:i,a=`trailing`in r?!!r.trailing:a),Se(t,n,{leading:i,maxWait:n,trailing:a})}var we=W(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[W(`&::-webkit-scrollbar`,{width:0,height:0})]),$=p({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=w(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=ne();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:U,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return re(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=p({name:`ChevronLeft`,render(){return(()=>{let e=R(`dfe229c2639b2082`);return e[0]||=M(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[M(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=r(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=p({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=S(Ee,null);return t||h(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return C(),m(`div`,{class:V([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:o(this.style)},[y(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...le(De,[`displayDirective`])},je=p({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=S(Ee);return{trigger:d,mergedClosable:g(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:a,label:o,tab:s,value:c,mergedClosable:l,trigger:d,$slots:{default:f}}=this,p=o??s;return C(),m(`div`,{class:V(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(C(),m(`div`,{key:0,class:V(`${t}-tabs-tab-pad`)},null,2)):y(()=>null),(C(),m(`div`,u({key:r,"data-name":r,"data-disabled":a?!0:void 0},u({class:[`${t}-tabs-tab`,c===r&&`${t}-tabs-tab--active`,a&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:d===`click`?this.activateTab:void 0,onMouseenter:d===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[M(`span`,{class:V(`${t}-tabs-tab__label`)},[e?(C(),m(z,{key:0},[M(`div`,{class:V(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(C(),n(i,{clsPrefix:t},{default:()=>(C(),n(se))},1032,[`clsPrefix`]))],64)):(C(),m(z,{key:1},[f?(C(),m(z,{key:0},[y(()=>f())],64)):(C(),m(z,{key:1},[typeof p==`object`?(C(),m(z,{key:0},[y(()=>p)],64)):(C(),m(z,{key:1},[y(()=>ce(p??r))],64))],64))],64))],2),l&&this.type===`card`?(C(),n(pe,{key:0,clsPrefix:t,class:V(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:a},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):y(()=>null)],16,ke))],2)}}),Me=I(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[F(`&.transition-disabled`,[I(`tabs-tab`,`
 transition: none !important;
 `),I(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),I(`tabs-tab-pad`,`
 transition: none !important;
 `)]),L(`segment-type`,[I(`tabs-rail`,[F(`&.transition-disabled`,[I(`tabs-capsule`,`
 transition: none;
 `)])])]),L(`top`,[I(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),L(`left`,[I(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),L(`left, right`,`
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
 `)]),L(`right`,`
 flex-direction: row-reverse;
 `,[I(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),I(`tabs-bar`,`
 left: 0;
 `)]),L(`bottom`,`
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
 `,[L(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),F(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),L(`flex`,[I(`tabs-nav`,`
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
 `,[N(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),N(`prefix`,`padding-right: 16px;`),N(`suffix`,`padding-left: 16px;`)]),L(`top, bottom`,[F(`>`,[I(`tabs-nav`,[I(`tabs-nav-scroll-wrapper`,[F(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),F(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),L(`shadow-start`,[F(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),L(`shadow-end`,[F(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),L(`left, right`,[I(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),F(`>`,[I(`tabs-nav`,[I(`tabs-nav-scroll-wrapper`,[F(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),F(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),L(`shadow-start`,[F(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),L(`shadow-end`,[F(`&::after`,`
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
 `,[F(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),F(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),F(`&.transition-disabled`,[F(`&::before, &::after`,`
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
 `,[L(`disabled`,{cursor:`not-allowed`}),N(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),N(`label`,`
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
 `,[F(`&.transition-disabled`,`
 transition: none;
 `),L(`disabled`,`
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
 `,[F(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),F(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),F(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),F(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),F(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),I(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),L(`line-type, bar-type`,[I(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[F(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),L(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),L(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),I(`tabs-nav`,[N(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),L(`line-type`,[L(`top`,[N(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 bottom: -1px;
 `)]),L(`left`,[N(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 right: -1px;
 `)]),L(`right`,[N(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 left: -1px;
 `)]),L(`bottom`,[N(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 top: -1px;
 `)]),N(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-bar`,`
 border-radius: 0;
 `)]),L(`card-type`,[N(`prefix, suffix`,`
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
 `,[L(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[N(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),D(`disabled`,[F(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),L(`closable`,`padding-inline-end: 8px;`),L(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),L(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),L(`left, right`,`
 flex-direction: column; 
 `,[N(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),I(`tabs-wrapper`,`
 flex-direction: column;
 `),I(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[I(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),L(`top`,[L(`card-type`,[I(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-bottom: 1px solid #0000;
 `)]),I(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),L(`left`,[L(`card-type`,[I(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-right: 1px solid #0000;
 `)]),I(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),L(`right`,[L(`card-type`,[I(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-left: 1px solid #0000;
 `)]),I(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),L(`bottom`,[L(`card-type`,[I(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),N(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[L(`active`,`
 border-top: 1px solid #0000;
 `)]),I(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),I(`tabs-scroll-button`,[L(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),L(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),L(`up`,`
 padding-bottom: 10px;
 `),L(`down`,`
 padding-top: 10px;
 `)])]),Ne=p({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:r,vertical:a,rtl:s,theme:c,themeOverrides:l,handleClick:u}=this,d=r===`next`,f=a?d:s?!d:d;return C(),n(P,{text:!0,disabled:t,size:`small`,theme:c,themeOverrides:l,onClick:u,class:V([`${e}-tabs-scroll-button`,!a&&r===`prev`&&`${e}-tabs-scroll-button--start`,!a&&r===`next`&&`${e}-tabs-scroll-button--end`,a&&r===`prev`&&`${e}-tabs-scroll-button--up`,a&&r===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(C(),n(i,{clsPrefix:e,style:o(a?{transform:`rotate(90deg)`}:void 0)},{default:()=>f?(C(),n(G,{key:1})):(C(),n(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Q,Fe={...l.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=p({name:`Tabs`,props:Fe,slots:Object,setup(e,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a,mergedRtlRef:o}=s(e),c=t(`Tabs`,o,r),u=g(()=>{let{placement:t}=e;return t===`start`?c?.value?`right`:`left`:t===`end`?c?.value?`left`:`right`:t}),p=l(`Tabs`,`-tabs`,Me,fe,e,r),m=w(null),h=w(null),y=w(null),S=w(null),C=w(null),T=w(null),E=w(null),D=w(!0),A=w(!0),M=ae(e,[`labelSize`,`size`]),N=g(()=>M.value?M.value:a?.value?.Tabs?.size||`medium`),P=ae(e,[`activeName`,`value`]),F=w(P.value??e.defaultValue??(n.default?de(n.default())[0]?.props?.name:null)),I=oe(P,F),L={id:0},te=g(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});j(I,()=>{L.id=0,V(),x(()=>{H()})});function R(){let{value:e}=I;return e===null?null:m.value?.querySelector(`[data-name="${e}"]`)}function z(t){if(e.type===`card`)return;let{value:n}=y;if(!n)return;let i=n.style.opacity===`0`;if(t){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o}=e,s=u.value;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(B([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(B([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function ne(){if(e.type===`card`)return;let{value:t}=y;t&&(t.style.opacity=`0`)}function B(e){let{value:t}=y;if(t)for(let n of e)t.style[n]=``}function V(){if(e.type===`card`)return;let t=R();t?z(t):ne()}function re(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function H(){let t=[`top`,`bottom`].includes(u.value),n=R();if(n){if(t){let r=T.value?.$el;if(!r)return;re(r,n,t,e.centerActiveTab)}else{let{value:r}=E;if(!r)return;re(r,n,t,e.centerActiveTab)}}}let U=w(null),W=0,G=null;function se(e){let t=U.value;if(t){W=e.getBoundingClientRect().height;let n=`${W}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};G?(r(),G(),G=null):G=r}}function ce(e){let t=U.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(W,n)}px`};G?(G(),G=null,r()):G=r}}function le(){let t=U.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let ue={value:[]},pe=w(`next`);function me(e){let t=I.value,n=`next`;for(let r of ue.value){if(r===t)break;if(r===e){n=`prev`;break}}pe.value=n,he(e)}function he(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&f(n,t),r&&f(r,t),i&&f(i,t),F.value=t}function ge(t){let{onClose:n}=e;n&&f(n,t)}function _e(e){if([`top`,`bottom`].includes(u.value)){let{value:t}=T;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!c?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=E;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let K=!0;function q(){let{value:e}=y;if(!e)return;K&&=!1;let t=`transition-disabled`;e.classList.add(t),V(),e.classList.remove(t)}let J=w(null);function Y({transitionDisabled:e}){let t=m.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=R();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}j([I],()=>{e.type===`segment`&&x(()=>{Y({transitionDisabled:!1})})}),d(()=>{e.type===`segment`&&Y({transitionDisabled:!0})});let ve=0;function ye(t){if(t.contentRect.width===0&&t.contentRect.height===0||ve===t.contentRect.width)return;ve=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(K||e.justifyContent?.startsWith(`space`))&&q(),n!==`segment`&&$(we())}let X=Pe(ye,64);function be(){let{type:t}=e;t===`line`||t===`bar`?q():t===`segment`&&Y({transitionDisabled:!0})}j([()=>e.justifyContent,()=>e.size],()=>{x(()=>{(e.type===`line`||e.type===`bar`)&&q()})}),j([u,()=>c?.value],()=>{x(()=>{be(),$(we(),{instantly:!0})})}),j(()=>e.type,()=>{x(()=>{let e=h.value;e&&(e.classList.add(`transition-disabled`),be(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Z=w(!1);function xe(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=u.value;if(!Z.value)o===`top`||o===`bottom`?i<n&&(Z.value=!0):a<r&&(Z.value=!0);else{let{value:e}=C;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Z.value=!1):a-r>e.$el.offsetHeight&&(Z.value=!1)}$(T.value?.$el||null)}let Se=Pe(xe,64);function Ce(){let{onAdd:t}=e;t&&t()}let Q=w(!1);function we(){let e=u.value;return(e===`top`||e===`bottom`?T.value?.$el:E.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?S.value:null;n&&n.classList.add(`transition-disabled`);let r=u.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);D.value=i<=1,A.value=i+r>=n-1,Q.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;D.value=t<=1,A.value=t+r>=n-1,Q.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);_(Ee,{triggerRef:v(e,`trigger`),tabStyleRef:v(e,`tabStyle`),tabClassRef:v(e,`tabClass`),addTabStyleRef:v(e,`addTabStyle`),addTabClassRef:v(e,`addTabClass`),paneClassRef:v(e,`paneClass`),paneStyleRef:v(e,`paneStyle`),mergedClsPrefixRef:r,typeRef:v(e,`type`),closableRef:v(e,`closable`),valueRef:I,tabChangeIdRef:L,onBeforeLeaveRef:v(e,`onBeforeLeave`),activateTab:me,handleClose:ge,handleAdd:Ce}),ie(()=>{V(),H()}),ee(()=>{let{value:e}=S;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;D.value?e.classList.remove(n):e.classList.add(n),A.value?e.classList.remove(i):e.classList.add(i)});let De={syncBarPosition:()=>{V()},scrollToCurrentTab:()=>{H()}},Oe=()=>{Y({transitionDisabled:!0})},ke=g(()=>{let{value:t}=N,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[O(`panePadding`,t)]:C,[O(`tabPadding`,r)]:w,[O(`tabPaddingVertical`,r)]:ee,[O(`tabGap`,r)]:T,[O(`tabGap`,`${r}Vertical`)]:E,[O(`tabTextColor`,n)]:D,[O(`tabTextColorActive`,n)]:A,[O(`tabTextColorHover`,n)]:j,[O(`tabTextColorDisabled`,n)]:M,[O(`tabFontSize`,t)]:P},common:{cubicBezierEaseInOut:F}}=p.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":D,"--n-tab-text-color-active":A,"--n-tab-text-color-disabled":M,"--n-tab-text-color-hover":j,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":m,"--n-tab-padding":w,"--n-tab-padding-vertical":ee,"--n-tab-gap":T,"--n-tab-gap-vertical":E,"--n-pane-padding-left":k(C,`left`),"--n-pane-padding-right":k(C,`right`),"--n-pane-padding-top":k(C,`top`),"--n-pane-padding-bottom":k(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=i?b(`tabs`,g(()=>`${N.value[0]}${e.type[0]}`),ke,e):void 0;return{mergedClsPrefix:r,mergedValue:I,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:U,tabsElRef:m,selfElRef:h,barElRef:y,addTabInstRef:C,xScrollInstRef:T,scrollWrapperElRef:S,addTabFixed:Z,tabWrapperStyle:te,handleNavResize:X,mergedSize:N,handleScroll:Te,handleTabsResize:Se,cssVars:i?void 0:ke,themeClass:Ae?.themeClass,animationDirection:pe,renderNameListRef:ue,yScrollElRef:E,handleSegmentResize:Oe,onAnimationBeforeLeave:se,onAnimationEnter:ce,onAnimationAfterEnter:le,onRender:Ae?.onRender,startReachedRef:D,endReachedRef:A,isOverflow:Q,handleButtonClick:_e,mergedTheme:p,rtlEnabled:c,mergedPlacement:u,...De}},render(){let{mergedClsPrefix:e,type:t,mergedPlacement:r,addTabFixed:i,addable:a,mergedSize:s,renderNameListRef:l,onRender:d,paneWrapperClass:f,paneWrapperStyle:p,startReachedRef:h,endReachedRef:g,isOverflow:_,showScrollButton:v,handleButtonClick:b,mergedTheme:x,rtlEnabled:S,$slots:{default:w,prefix:ee,suffix:T}}=this;d?.();let E=w?de(w()).filter(e=>e.type.__TAB_PANE__===!0):[],D=w?de(w()).filter(e=>e.type.__TAB__===!0):[],O=!D.length,k=t===`card`,A=t===`segment`,j=!k&&!A&&this.justifyContent;l.value=[];let N=()=>{let t=(C(),m(`div`,{style:o(this.tabWrapperStyle),class:V(`${e}-tabs-wrapper`)},[j?y(()=>null):(C(),m(`div`,{key:1,class:V(`${e}-tabs-scroll-padding`),style:o(r===`top`||r===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),O?(C(),m(z,{key:2},[y(()=>E.map((e,t)=>(l.value.push(e.props.name),Be((C(),n(je,u(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!j||j===`center`||j===`start`||j===`end`)}),B(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(C(),m(z,{key:3},[y(()=>D.map((e,t)=>(l.value.push(e.props.name),Be(t!==0&&!j?ze(e):e))))],64)),!i&&a&&k?(C(),m(z,{key:4},[y(()=>Re(a,(O?E.length:D.length)!==0))],64)):y(()=>null),j?y(()=>null):(C(),m(`div`,{key:7,class:V(`${e}-tabs-scroll-padding`),style:o({width:`${this.tabsPadding}px`})},null,6)),k?y(()=>null):(C(),m(`div`,{key:9,ref:`barElRef`,class:V(`${e}-tabs-bar`)},null,2))],6));return C(),m(`div`,{ref:`tabsElRef`,class:V(`${e}-tabs-nav-scroll-content`)},[k&&a?(C(),n(H,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(C(),m(z,{key:1},[y(()=>t)],64)),k?(C(),m(`div`,{key:2,class:V(`${e}-tabs-pad`)},null,2)):y(()=>null)],2)},P=A?`top`:r;return C(),m(`div`,{ref:`selfElRef`,class:V([`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${s}-size`,j&&`${e}-tabs--flex`,`${e}-tabs--${P}`,S&&`${e}-tabs--rtl`]),style:o(this.cssVars)},[M(`div`,{class:V([`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${P}`,`${e}-tabs-nav`])},[y(()=>c(ee,t=>t&&(C(),m(`div`,{class:V(`${e}-tabs-nav__prefix`)},[y(()=>t)],2)))),A?(C(),n(H,{key:0,onResize:this.handleSegmentResize},{default:()=>(C(),m(`div`,{class:V(`${e}-tabs-rail`),ref:`tabsElRef`},[M(`div`,{class:V(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[M(`div`,{class:V(`${e}-tabs-wrapper`)},[M(`div`,{class:V(`${e}-tabs-tab`)},null,2)],2)],2),O?(C(),m(z,{key:0},[y(()=>E.map((e,t)=>(l.value.push(e.props.name),C(),n(je,u(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),B(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(C(),m(z,{key:1},[y(()=>D.map((e,t)=>(l.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(C(),m(z,{key:1},[y(()=>v&&_&&(C(),n(Ne,{mergedClsPrefix:e,type:`prev`,vertical:P===`left`||P===`right`,disabled:h,rtl:!!S,theme:x.peers.Button,themeOverrides:x.peerOverrides.Button,onClick:b},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(C(),n(H,{onResize:this.handleNavResize},{default:()=>(C(),m(`div`,{class:V(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(P)?(C(),n($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:N},1032,[`onScroll`])):(C(),m(`div`,{key:1,class:V(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[y(()=>N())],42,[`onScroll`]))],2))},1032,[`onResize`])),y(()=>v&&_&&(C(),n(Ne,{mergedClsPrefix:e,type:`next`,vertical:P===`left`||P===`right`,disabled:g,rtl:!!S,theme:x.peers.Button,themeOverrides:x.peerOverrides.Button,onClick:b},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),i&&a&&k?(C(),m(z,{key:2},[y(()=>Re(a,!0))],64)):y(()=>null),y(()=>c(T,t=>t&&(C(),m(`div`,{class:V(`${e}-tabs-nav__suffix`)},[y(()=>t)],2))))],2),y(()=>O&&(this.animated&&(P===`top`||P===`bottom`)?(C(),m(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:o(p),class:V([`${e}-tabs-pane-wrapper`,f])},[y(()=>Le(E,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(E,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,r,i,a,o,s){let c=[];return e.forEach(e=>{let{name:n,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,s=t===n;if(e.key!==void 0&&(e.key=n),s||o(`show`)||o(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!o(`if`);c.push(t?E(e,[[T,s]]):e)}}),s?(C(),n(te,{name:`${s}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>c},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):c}function Re(e,t){return C(),n(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=a(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};