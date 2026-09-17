import{$t as e,A as t,An as n,At as r,B as i,Bn as a,Dn as o,Dt as s,Er as c,F as l,H as u,Hn as d,In as f,L as p,Mn as m,Mt as h,On as g,Rn as _,St as v,U as y,Vn as b,Xn as x,Zn as S,bn as C,dn as w,fn as T,gr as E,gt as D,in as O,ir as k,kn as A,ln as j,m as M,on as N,qn as P,rr as F,sn as I,sr as ee,un as L,vn as R,vt as te,wn as z,wt as ne,xr as B,xt as V,yt as H}from"./endpoints-D7YssODM.js";import{r as U}from"./Scrollbar-BE5qE3gb.js";import{i as re,n as W,r as ie,t as G}from"./cssr-Db0WhKUi.js";import{t as ae}from"./use-merged-state-CXRiUPYA.js";import{t as K}from"./ChevronRight-BIWZ6b5U.js";import{t as oe}from"./Add-BDubKSM2.js";import{B as se,M as ce,ht as le,it as ue,m as de,q as fe}from"./index-CTz7zfxj.js";var pe=/\s/;function me(e){for(var t=e.length;t--&&pe.test(e.charAt(t)););return t}var he=/^\s+/;function ge(e){return e&&e.slice(0,me(e)+1).replace(he,``)}var q=NaN,J=/^[-+]0x[0-9a-f]+$/i,Y=/^0b[01]+$/i,X=/^0o[0-7]+$/i,_e=parseInt;function ve(t){if(typeof t==`number`)return t;if(le(t))return q;if(e(t)){var n=typeof t.valueOf==`function`?t.valueOf():t;t=e(n)?n+``:n}if(typeof t!=`string`)return t===0?t:+t;t=ge(t);var r=Y.test(t);return r||X.test(t)?_e(t.slice(2),r?2:8):J.test(t)?q:+t}var Z=function(){return O.Date.now()},ye=`Expected a function`,Q=Math.max,be=Math.min;function xe(t,n,r){var i,a,o,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof t!=`function`)throw TypeError(ye);n=ve(n)||0,e(r)&&(d=!!r.leading,f=`maxWait`in r,o=f?Q(ve(r.maxWait)||0,n):o,p=`trailing`in r?!!r.trailing:p);function m(e){var n=i,r=a;return i=a=void 0,u=e,s=t.apply(r,n),s}function h(e){return u=e,c=setTimeout(v,n),d?m(e):s}function g(e){var t=e-l,r=e-u,i=n-t;return f?be(i,o-r):i}function _(e){var t=e-l,r=e-u;return l===void 0||t>=n||t<0||f&&r>=o}function v(){var e=Z();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&i?m(e):(i=a=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,i=l=a=c=void 0}function x(){return c===void 0?s:y(Z())}function S(){var e=Z(),t=_(e);if(i=arguments,a=this,l=e,t){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,n),m(l)}return c===void 0&&(c=setTimeout(v,n)),s}return S.cancel=b,S.flush=x,S}var Se=`Expected a function`;function Ce(t,n,r){var i=!0,a=!0;if(typeof t!=`function`)throw TypeError(Se);return e(r)&&(i=`leading`in r?!!r.leading:i,a=`trailing`in r?!!r.trailing:a),xe(t,n,{leading:i,maxWait:n,trailing:a})}var we=G(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[G(`&::-webkit-scrollbar`,{width:0,height:0})]),$=f({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=E(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=ne();return we.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:W,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return _(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Te=f({name:`ChevronLeft`,render(){return(()=>{let e=te(`dfe229c2639b2082`);return e[0]||=A(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[A(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),Ee=r(`n-tabs`),De={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Oe=f({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:De,slots:Object,setup(e){let t=a(Ee,null);return t||h(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return x(),m(`div`,{class:H([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:c(this.style)},[v(()=>this.$slots.default?.())],6)}}),ke=[`data-name`,`data-disabled`],Ae={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...ce(De,[`displayDirective`])},je=f({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:Ae,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:o,addTabStyleRef:s,tabClassRef:c,addTabClassRef:l,tabChangeIdRef:u,onBeforeLeaveRef:d,triggerRef:f,handleAdd:p,activateTab:m,handleClose:h}=a(Ee);return{trigger:f,mergedClosable:g(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:o,addStyle:s,tabClass:c,addTabClass:l,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++u.id;if(t!==n.value){let{value:i}=d;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&u.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:r,disabled:a,label:o,tab:s,value:c,mergedClosable:l,trigger:u,$slots:{default:d}}=this,f=o??s;return x(),m(`div`,{class:H(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(x(),m(`div`,{key:0,class:H(`${t}-tabs-tab-pad`)},null,2)):v(()=>null),(x(),m(`div`,b({key:r,"data-name":r,"data-disabled":a?!0:void 0},b({class:[`${t}-tabs-tab`,c===r&&`${t}-tabs-tab--active`,a&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:u===`click`?this.activateTab:void 0,onMouseenter:u===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[A(`span`,{class:H(`${t}-tabs-tab__label`)},[e?(x(),m(z,{key:0},[A(`div`,{class:H(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(x(),n(i,{clsPrefix:t},{default:()=>(x(),n(oe))},1032,[`clsPrefix`]))],64)):(x(),m(z,{key:1},[d?(x(),m(z,{key:0},[v(()=>d())],64)):(x(),m(z,{key:1},[typeof f==`object`?(x(),m(z,{key:0},[v(()=>f)],64)):(x(),m(z,{key:1},[v(()=>se(f??r))],64))],64))],64))],2),l&&this.type===`card`?(x(),n(fe,{key:0,clsPrefix:t,class:H(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:a},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):v(()=>null)],16,ke))],2)}}),Me=I(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[N(`&.transition-disabled`,[I(`tabs-tab`,`
 transition: none !important;
 `),I(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),I(`tabs-tab-pad`,`
 transition: none !important;
 `)]),L(`segment-type`,[I(`tabs-rail`,[N(`&.transition-disabled`,[I(`tabs-capsule`,`
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
 `),N(`&:hover`,`
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
 `,[j(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),j(`prefix`,`padding-right: 16px;`),j(`suffix`,`padding-left: 16px;`)]),L(`top, bottom`,[N(`>`,[I(`tabs-nav`,[I(`tabs-nav-scroll-wrapper`,[N(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),N(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),L(`shadow-start`,[N(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),L(`shadow-end`,[N(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),L(`left, right`,[I(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),N(`>`,[I(`tabs-nav`,[I(`tabs-nav-scroll-wrapper`,[N(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),N(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),L(`shadow-start`,[N(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),L(`shadow-end`,[N(`&::after`,`
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
 `,[N(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),N(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),N(`&.transition-disabled`,[N(`&::before, &::after`,`
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
 `,[L(`disabled`,{cursor:`not-allowed`}),j(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),j(`label`,`
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
 `,[N(`&.transition-disabled`,`
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
 `,[N(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),N(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),N(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),N(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),N(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
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
 `,[N(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),L(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),L(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),I(`tabs-nav`,[j(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),L(`line-type`,[L(`top`,[j(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 bottom: -1px;
 `)]),L(`left`,[j(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 right: -1px;
 `)]),L(`right`,[j(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 left: -1px;
 `)]),L(`bottom`,[j(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),I(`tabs-bar`,`
 top: -1px;
 `)]),j(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),I(`tabs-bar`,`
 border-radius: 0;
 `)]),L(`card-type`,[j(`prefix, suffix`,`
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
 `,[j(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),w(`disabled`,[N(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),L(`closable`,`padding-inline-end: 8px;`),L(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),L(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),L(`left, right`,`
 flex-direction: column; 
 `,[j(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),I(`tabs-wrapper`,`
 flex-direction: column;
 `),I(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[I(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),L(`top`,[L(`card-type`,[I(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),j(`prefix, suffix`,`
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
 `)])]),L(`left`,[L(`card-type`,[I(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),j(`prefix, suffix`,`
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
 `)])]),L(`right`,[L(`card-type`,[I(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),j(`prefix, suffix`,`
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
 `)])]),L(`bottom`,[L(`card-type`,[I(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),j(`prefix, suffix`,`
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
 `)])]),Ne=f({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:r,vertical:a,rtl:o,theme:s,themeOverrides:l,handleClick:u}=this,d=r===`next`,f=a?d:o?!d:d;return x(),n(M,{text:!0,disabled:t,size:`small`,theme:s,themeOverrides:l,onClick:u,class:H([`${e}-tabs-scroll-button`,!a&&r===`prev`&&`${e}-tabs-scroll-button--start`,!a&&r===`next`&&`${e}-tabs-scroll-button--end`,a&&r===`prev`&&`${e}-tabs-scroll-button--up`,a&&r===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(x(),n(i,{clsPrefix:e,style:c(a?{transform:`rotate(90deg)`}:void 0)},{default:()=>f?(x(),n(K,{key:1})):(x(),n(Te,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),Pe=Ce,Fe={...u.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},Ie=f({name:`Tabs`,props:Fe,slots:Object,setup(e,{slots:n}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a,mergedRtlRef:o}=s(e),c=t(`Tabs`,o,r),l=g(()=>{let{placement:t}=e;return t===`start`?c?.value?`right`:`left`:t===`end`?c?.value?`left`:`right`:t}),f=u(`Tabs`,`-tabs`,Me,de,e,r),m=E(null),h=E(null),_=E(null),v=E(null),b=E(null),x=E(null),C=E(null),w=E(!0),O=E(!0),A=ie(e,[`labelSize`,`size`]),j=g(()=>A.value?A.value:a?.value?.Tabs?.size||`medium`),M=ie(e,[`activeName`,`value`]),N=E(M.value??e.defaultValue??(n.default?ue(n.default())[0]?.props?.name:null)),I=ae(M,N),ee={id:0},L=g(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});F(I,()=>{ee.id=0,V(),d(()=>{U()})});function R(){let{value:e}=I;return e===null?null:m.value?.querySelector(`[data-name="${e}"]`)}function te(t){if(e.type===`card`)return;let{value:n}=_;if(!n)return;let i=n.style.opacity===`0`;if(t){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o}=e,s=l.value;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(ne([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(ne([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function z(){if(e.type===`card`)return;let{value:t}=_;t&&(t.style.opacity=`0`)}function ne(e){let{value:t}=_;if(t)for(let n of e)t.style[n]=``}function V(){if(e.type===`card`)return;let t=R();t?te(t):z()}function H(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function U(){let t=[`top`,`bottom`].includes(l.value),n=R();if(n){if(t){let r=x.value?.$el;if(!r)return;H(r,n,t,e.centerActiveTab)}else{let{value:r}=C;if(!r)return;H(r,n,t,e.centerActiveTab)}}}let W=E(null),G=0,K=null;function oe(e){let t=W.value;if(t){G=e.getBoundingClientRect().height;let n=`${G}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};K?(r(),K(),K=null):K=r}}function se(e){let t=W.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(G,n)}px`};K?(K(),K=null,r()):K=r}}function ce(){let t=W.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let le={value:[]},fe=E(`next`);function pe(e){let t=I.value,n=`next`;for(let r of le.value){if(r===t)break;if(r===e){n=`prev`;break}}fe.value=n,me(e)}function me(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&p(n,t),r&&p(r,t),i&&p(i,t),N.value=t}function he(t){let{onClose:n}=e;n&&p(n,t)}function ge(e){if([`top`,`bottom`].includes(l.value)){let{value:t}=x;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!c?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=C;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let q=!0;function J(){let{value:e}=_;if(!e)return;q&&=!1;let t=`transition-disabled`;e.classList.add(t),V(),e.classList.remove(t)}let Y=E(null);function X({transitionDisabled:e}){let t=m.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=R();n&&Y.value&&(Y.value.style.width=`${n.offsetWidth}px`,Y.value.style.height=`${n.offsetHeight}px`,Y.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&Y.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}F([I],()=>{e.type===`segment`&&d(()=>{X({transitionDisabled:!1})})}),P(()=>{e.type===`segment`&&X({transitionDisabled:!0})});let _e=0;function ve(t){if(t.contentRect.width===0&&t.contentRect.height===0||_e===t.contentRect.width)return;_e=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(q||e.justifyContent?.startsWith(`space`))&&J(),n!==`segment`&&$(we())}let Z=Pe(ve,64);function ye(){let{type:t}=e;t===`line`||t===`bar`?J():t===`segment`&&X({transitionDisabled:!0})}F([()=>e.justifyContent,()=>e.size],()=>{d(()=>{(e.type===`line`||e.type===`bar`)&&J()})}),F([l,()=>c?.value],()=>{d(()=>{ye(),$(we(),{instantly:!0})})}),F(()=>e.type,()=>{d(()=>{let e=h.value;e&&(e.classList.add(`transition-disabled`),ye(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Q=E(!1);function be(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=l.value;if(!Q.value)o===`top`||o===`bottom`?i<n&&(Q.value=!0):a<r&&(Q.value=!0);else{let{value:e}=b;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Q.value=!1):a-r>e.$el.offsetHeight&&(Q.value=!1)}$(x.value?.$el||null)}let xe=Pe(be,64);function Se(){let{onAdd:t}=e;t&&t()}let Ce=E(!1);function we(){let e=l.value;return(e===`top`||e===`bottom`?x.value?.$el:C.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?v.value:null;n&&n.classList.add(`transition-disabled`);let r=l.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);w.value=i<=1,O.value=i+r>=n-1,Ce.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;w.value=t<=1,O.value=t+r>=n-1,Ce.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=Pe(e=>{$(e.target)},64);S(Ee,{triggerRef:B(e,`trigger`),tabStyleRef:B(e,`tabStyle`),tabClassRef:B(e,`tabClass`),addTabStyleRef:B(e,`addTabStyle`),addTabClassRef:B(e,`addTabClass`),paneClassRef:B(e,`paneClass`),paneStyleRef:B(e,`paneStyle`),mergedClsPrefixRef:r,typeRef:B(e,`type`),closableRef:B(e,`closable`),valueRef:I,tabChangeIdRef:ee,onBeforeLeaveRef:B(e,`onBeforeLeave`),activateTab:pe,handleClose:he,handleAdd:Se}),re(()=>{V(),U()}),k(()=>{let{value:e}=v;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;w.value?e.classList.remove(n):e.classList.add(n),O.value?e.classList.remove(i):e.classList.add(i)});let De={syncBarPosition:()=>{V()},scrollToCurrentTab:()=>{U()}},Oe=()=>{X({transitionDisabled:!0})},ke=g(()=>{let{value:t}=j,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[T(`panePadding`,t)]:C,[T(`tabPadding`,r)]:w,[T(`tabPaddingVertical`,r)]:E,[T(`tabGap`,r)]:O,[T(`tabGap`,`${r}Vertical`)]:k,[T(`tabTextColor`,n)]:A,[T(`tabTextColorActive`,n)]:M,[T(`tabTextColorHover`,n)]:N,[T(`tabTextColorDisabled`,n)]:P,[T(`tabFontSize`,t)]:F},common:{cubicBezierEaseInOut:I}}=f.value;return{"--n-bezier":I,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":F,"--n-tab-text-color":A,"--n-tab-text-color-active":M,"--n-tab-text-color-disabled":P,"--n-tab-text-color-hover":N,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":m,"--n-tab-padding":w,"--n-tab-padding-vertical":E,"--n-tab-gap":O,"--n-tab-gap-vertical":k,"--n-pane-padding-left":D(C,`left`),"--n-pane-padding-right":D(C,`right`),"--n-pane-padding-top":D(C,`top`),"--n-pane-padding-bottom":D(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),Ae=i?y(`tabs`,g(()=>`${j.value[0]}${e.type[0]}`),ke,e):void 0;return{mergedClsPrefix:r,mergedValue:I,renderedNames:new Set,segmentCapsuleElRef:Y,tabsPaneWrapperRef:W,tabsElRef:m,selfElRef:h,barElRef:_,addTabInstRef:b,xScrollInstRef:x,scrollWrapperElRef:v,addTabFixed:Q,tabWrapperStyle:L,handleNavResize:Z,mergedSize:j,handleScroll:Te,handleTabsResize:xe,cssVars:i?void 0:ke,themeClass:Ae?.themeClass,animationDirection:fe,renderNameListRef:le,yScrollElRef:C,handleSegmentResize:Oe,onAnimationBeforeLeave:oe,onAnimationEnter:se,onAnimationAfterEnter:ce,onRender:Ae?.onRender,startReachedRef:w,endReachedRef:O,isOverflow:Ce,handleButtonClick:ge,mergedTheme:f,rtlEnabled:c,mergedPlacement:l,...De}},render(){let{mergedClsPrefix:e,type:t,mergedPlacement:r,addTabFixed:i,addable:a,mergedSize:o,renderNameListRef:s,onRender:u,paneWrapperClass:d,paneWrapperStyle:f,startReachedRef:p,endReachedRef:h,isOverflow:g,showScrollButton:_,handleButtonClick:y,mergedTheme:S,rtlEnabled:C,$slots:{default:w,prefix:T,suffix:E}}=this;u?.();let D=w?ue(w()).filter(e=>e.type.__TAB_PANE__===!0):[],O=w?ue(w()).filter(e=>e.type.__TAB__===!0):[],k=!O.length,j=t===`card`,M=t===`segment`,N=!j&&!M&&this.justifyContent;s.value=[];let P=()=>{let t=(x(),m(`div`,{style:c(this.tabWrapperStyle),class:H(`${e}-tabs-wrapper`)},[N?v(()=>null):(x(),m(`div`,{key:1,class:H(`${e}-tabs-scroll-padding`),style:c(r===`top`||r===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),k?(x(),m(z,{key:2},[v(()=>D.map((e,t)=>(s.value.push(e.props.name),Be((x(),n(je,b(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!N||N===`center`||N===`start`||N===`end`)}),V(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(x(),m(z,{key:3},[v(()=>O.map((e,t)=>(s.value.push(e.props.name),Be(t!==0&&!N?ze(e):e))))],64)),!i&&a&&j?(x(),m(z,{key:4},[v(()=>Re(a,(k?D.length:O.length)!==0))],64)):v(()=>null),N?v(()=>null):(x(),m(`div`,{key:7,class:H(`${e}-tabs-scroll-padding`),style:c({width:`${this.tabsPadding}px`})},null,6)),j?v(()=>null):(x(),m(`div`,{key:9,ref:`barElRef`,class:H(`${e}-tabs-bar`)},null,2))],6));return x(),m(`div`,{ref:`tabsElRef`,class:H(`${e}-tabs-nav-scroll-content`)},[j&&a?(x(),n(U,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(x(),m(z,{key:1},[v(()=>t)],64)),j?(x(),m(`div`,{key:2,class:H(`${e}-tabs-pad`)},null,2)):v(()=>null)],2)},F=M?`top`:r;return x(),m(`div`,{ref:`selfElRef`,class:H([`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${o}-size`,N&&`${e}-tabs--flex`,`${e}-tabs--${F}`,C&&`${e}-tabs--rtl`]),style:c(this.cssVars)},[A(`div`,{class:H([`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${F}`,`${e}-tabs-nav`])},[v(()=>l(T,t=>t&&(x(),m(`div`,{class:H(`${e}-tabs-nav__prefix`)},[v(()=>t)],2)))),M?(x(),n(U,{key:0,onResize:this.handleSegmentResize},{default:()=>(x(),m(`div`,{class:H(`${e}-tabs-rail`),ref:`tabsElRef`},[A(`div`,{class:H(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[A(`div`,{class:H(`${e}-tabs-wrapper`)},[A(`div`,{class:H(`${e}-tabs-tab`)},null,2)],2)],2),k?(x(),m(z,{key:0},[v(()=>D.map((e,t)=>(s.value.push(e.props.name),x(),n(je,b(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),V(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(x(),m(z,{key:1},[v(()=>O.map((e,t)=>(s.value.push(e.props.name),t===0?e:ze(e))))],64))],2))},1032,[`onResize`])):(x(),m(z,{key:1},[v(()=>_&&g&&(x(),n(Ne,{mergedClsPrefix:e,type:`prev`,vertical:F===`left`||F===`right`,disabled:p,rtl:!!C,theme:S.peers.Button,themeOverrides:S.peerOverrides.Button,onClick:y},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(x(),n(U,{onResize:this.handleNavResize},{default:()=>(x(),m(`div`,{class:H(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(F)?(x(),n($,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:P},1032,[`onScroll`])):(x(),m(`div`,{key:1,class:H(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[v(()=>P())],42,[`onScroll`]))],2))},1032,[`onResize`])),v(()=>_&&g&&(x(),n(Ne,{mergedClsPrefix:e,type:`next`,vertical:F===`left`||F===`right`,disabled:h,rtl:!!C,theme:S.peers.Button,themeOverrides:S.peerOverrides.Button,onClick:y},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),i&&a&&j?(x(),m(z,{key:2},[v(()=>Re(a,!0))],64)):v(()=>null),v(()=>l(E,t=>t&&(x(),m(`div`,{class:H(`${e}-tabs-nav__suffix`)},[v(()=>t)],2))))],2),v(()=>k&&(this.animated&&(F===`top`||F===`bottom`)?(x(),m(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:c(f),class:H([`${e}-tabs-pane-wrapper`,d])},[v(()=>Le(D,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):Le(D,this.mergedValue,this.renderedNames)))],6)}});function Le(e,t,r,i,a,o,s){let c=[];return e.forEach(e=>{let{name:n,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,s=t===n;if(e.key!==void 0&&(e.key=n),s||o(`show`)||o(`show:lazy`)&&r.has(n)){r.has(n)||r.add(n);let t=!o(`if`);c.push(t?ee(e,[[C,s]]):e)}}),s?(x(),n(R,{name:`${s}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>c},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):c}function Re(e,t){return x(),n(je,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function ze(e){let t=o(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}export{Oe as n,Ie as t};