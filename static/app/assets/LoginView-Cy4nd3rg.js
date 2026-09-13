import{$t as e,A as t,Dn as n,En as r,Gt as i,Hn as a,I as o,Jn as s,Kn as c,L as l,M as u,Mn as d,Nn as f,Qn as p,Qt as m,Rn as h,Sn as g,St as _,T as v,Tn as y,Vn as b,Xt as x,Yn as S,Zn as C,_r as w,ar as T,bn as E,ct as D,dt as O,fn as k,fr as A,gn as j,gr as M,gt as N,hr as P,in as F,jn as I,kn as ee,l as L,mn as te,mt as R,nn as z,pn as B,pt as ne,rn as re,s as V,sr as H,tn as U,un as W,ut as ie,vr as G,wn as K,wt as ae,xn as q,yn as oe,yt as se}from"./endpoints-BzNG02YK.js";import{_ as ce,a as le,j as ue}from"./fade-in-scale-up.cssr-6X4IxNMz.js";import{a as de,d as fe,f as pe,o as me,p as he}from"./Popover-Clul5osh.js";import{t as ge}from"./Select-Cf4VD2yp.js";import{n as J,r as Y,t as X}from"./FormItem-B6kyjWmA.js";import{t as Z}from"./Input-C2ycArzf.js";import{t as _e}from"./ChevronRight-Dmal84e7.js";import{t as ve}from"./Add-DpTmdd13.js";import{J as Q,R as ye,W as be,X as xe,_ as Se,d as Ce,j as $,p as we,t as Te,u as Ee,y as De}from"./index-RW5_pGlg.js";import{t as Oe}from"./createLucideIcon-qotzimkC.js";import{t as ke}from"./circle-check-D8Jt04xQ.js";import{n as Ae,t as je}from"./ThemeToggle-CXvhW69T.js";import{n as Me}from"./types-rtNxLBzn.js";var Ne=/\s/;function Pe(e){for(var t=e.length;t--&&Ne.test(e.charAt(t)););return t}var Fe=/^\s+/;function Ie(e){return e&&e.slice(0,Pe(e)+1).replace(Fe,``)}var Le=NaN,Re=/^[-+]0x[0-9a-f]+$/i,ze=/^0b[01]+$/i,Be=/^0o[0-7]+$/i,Ve=parseInt;function He(e){if(typeof e==`number`)return e;if(ue(e))return Le;if(i(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=i(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Ie(e);var n=ze.test(e);return n||Be.test(e)?Ve(e.slice(2),n?2:8):Re.test(e)?Le:+e}var Ue=function(){return x.Date.now()},We=`Expected a function`,Ge=Math.max,Ke=Math.min;function qe(e,t,n){var r,a,o,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof e!=`function`)throw TypeError(We);t=He(t)||0,i(n)&&(d=!!n.leading,f=`maxWait`in n,o=f?Ge(He(n.maxWait)||0,t):o,p=`trailing`in n?!!n.trailing:p);function m(t){var n=r,i=a;return r=a=void 0,u=t,s=e.apply(i,n),s}function h(e){return u=e,c=setTimeout(v,t),d?m(e):s}function g(e){var n=e-l,r=e-u,i=t-n;return f?Ke(i,o-r):i}function _(e){var n=e-l,r=e-u;return l===void 0||n>=t||n<0||f&&r>=o}function v(){var e=Ue();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&r?m(e):(r=a=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,r=l=a=c=void 0}function x(){return c===void 0?s:y(Ue())}function S(){var e=Ue(),n=_(e);if(r=arguments,a=this,l=e,n){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,t),m(l)}return c===void 0&&(c=setTimeout(v,t)),s}return S.cancel=b,S.flush=x,S}var Je=`Expected a function`;function Ye(e,t,n){var r=!0,a=!0;if(typeof e!=`function`)throw TypeError(Je);return i(n)&&(r=`leading`in n?!!n.leading:r,a=`trailing`in n?!!n.trailing:a),qe(e,t,{leading:r,maxWait:t,trailing:a})}var Xe=de(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[de(`&::-webkit-scrollbar`,{width:0,height:0})]),Ze=n({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=H(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=N();return Xe.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:me,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return ee(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),Qe=n({name:`ChevronLeft`,render(){return(()=>{let e=ie(`dfe229c2639b2082`);return e[0]||=q(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[q(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),$e=e(`form`,[z(`inline`,`
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `,[e(`form-item`,{width:`auto`,marginRight:`18px`},[m(`&:last-child`,{marginRight:0})])])]),et=[`onSubmit`],tt={...o.props,inline:Boolean,labelWidth:[Number,String],labelAlign:String,labelPlacement:{type:String,default:`top`},model:{type:Object,default:()=>{}},rules:Object,disabled:Boolean,size:String,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:!0},onSubmit:{type:Function,default:e=>{e.preventDefault()}},showLabel:{type:Boolean,default:void 0},validateMessages:Object},nt=()=>!0;function rt(e){return e===void 0?{paths:null,shouldRuleBeApplied:nt}:typeof e==`function`?{paths:null,shouldRuleBeApplied:e}:Array.isArray(e)?{paths:e,shouldRuleBeApplied:nt}:e}var it=n({name:`Form`,props:tt,setup(e){let{mergedClsPrefixRef:t}=se(e);o(`Form`,`-form`,$e,Se,e,t);let n={},r=H(void 0),i=e=>{let t=r.value;(t===void 0||e>=t)&&(r.value=e)};function s(){for(let e of xe(n)){let t=n[e];for(let e of t)e.invalidateLabelWidth?.()}}async function c(e,t){let{paths:r,shouldRuleBeApplied:i}=rt(t);return await new Promise((t,a)=>{let o=[];for(let e of xe(n)){if(r!==null&&!r.includes(e))continue;let t=n[e];for(let e of t)e.path&&o.push(e.internalValidate(null,i))}Promise.all(o).then(n=>{let r=n.some(e=>!e.valid),i=[],o=[];n.forEach(e=>{e.errors?.length&&i.push(e.errors),e.warnings?.length&&o.push(e.warnings)}),e&&e(i.length?i:void 0,{warnings:o.length?o:void 0}),r?a(i.length?i:void 0):t({warnings:o.length?o:void 0})})})}function l(){for(let e of xe(n)){let t=n[e];for(let e of t)e.restoreValidation()}}return a(J,{props:e,maxChildLabelWidthRef:r,deriveMaxChildLabelWidth:i}),a(Y,{formItems:n}),Object.assign({validate:c,restoreValidation:l,invalidateLabelWidth:s},{mergedClsPrefix:t})},render(){let{mergedClsPrefix:e}=this;return b(),K(`form`,{class:O([`${e}-form`,this.inline&&`${e}-form--inline`]),onSubmit:this.onSubmit},[R(()=>this.$slots.default?.())],42,et)}}),at=_(`n-tabs`),ot={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},st=n({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:ot,slots:Object,setup(e){let t=I(at,null);return t||ae(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return b(),K(`div`,{class:O([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:w(this.style)},[R(()=>this.$slots.default?.())],6)}}),ct=[`data-name`,`data-disabled`],lt={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...$(ot,[`displayDirective`])},ut=n({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:lt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:m}=I(at);return{trigger:d,mergedClosable:E(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:i,tab:a,value:o,mergedClosable:s,trigger:c,$slots:{default:l}}=this,u=i??a;return b(),K(`div`,{class:O(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(b(),K(`div`,{key:0,class:O(`${t}-tabs-tab-pad`)},null,2)):R(()=>null),(b(),K(`div`,d({key:n,"data-name":n,"data-disabled":r?!0:void 0},d({class:[`${t}-tabs-tab`,o===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,s&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:c===`click`?this.activateTab:void 0,onMouseenter:c===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[q(`span`,{class:O(`${t}-tabs-tab__label`)},[e?(b(),K(j,{key:0},[q(`div`,{class:O(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(b(),g(Q,{clsPrefix:t},{default:()=>(b(),g(ve))},1032,[`clsPrefix`]))],64)):(b(),K(j,{key:1},[l?(b(),K(j,{key:0},[R(()=>l())],64)):(b(),K(j,{key:1},[typeof u==`object`?(b(),K(j,{key:0},[R(()=>u)],64)):(b(),K(j,{key:1},[R(()=>ye(u??n))],64))],64))],64))],2),s&&this.type===`card`?(b(),g(be,{key:0,clsPrefix:t,class:O(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:r},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):R(()=>null)],16,ct))],2)}}),dt=e(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[m(`&.transition-disabled`,[e(`tabs-tab`,`
 transition: none !important;
 `),e(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),e(`tabs-tab-pad`,`
 transition: none !important;
 `)]),z(`segment-type`,[e(`tabs-rail`,[m(`&.transition-disabled`,[e(`tabs-capsule`,`
 transition: none;
 `)])])]),z(`top`,[e(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),z(`left`,[e(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),z(`left, right`,`
 flex-direction: row;
 `,[e(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),e(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),z(`right`,`
 flex-direction: row-reverse;
 `,[e(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),e(`tabs-bar`,`
 left: 0;
 `)]),z(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[e(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),e(`tabs-bar`,`
 top: 0;
 `)]),e(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[e(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),e(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[e(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[z(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),m(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),z(`flex`,[e(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[e(`tabs-wrapper`,`
 width: 100%;
 `,[e(`tabs-tab`,`
 margin-right: 0;
 `)])])]),e(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[U(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),U(`prefix`,`padding-right: 16px;`),U(`suffix`,`padding-left: 16px;`)]),z(`top, bottom`,[m(`>`,[e(`tabs-nav`,[e(`tabs-nav-scroll-wrapper`,[m(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),m(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),z(`shadow-start`,[m(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),z(`shadow-end`,[m(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),z(`left, right`,[e(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),m(`>`,[e(`tabs-nav`,[e(`tabs-nav-scroll-wrapper`,[m(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),m(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),z(`shadow-start`,[m(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),z(`shadow-end`,[m(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),e(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[e(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[m(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),m(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),m(`&.transition-disabled`,[m(`&::before, &::after`,`
 transition: none;
 `)])]),e(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),e(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),e(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),e(`tabs-tab`,`
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
 `,[z(`disabled`,{cursor:`not-allowed`}),U(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),U(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),e(`tabs-bar`,`
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
 `,[m(`&.transition-disabled`,`
 transition: none;
 `),z(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),e(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),e(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[m(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),m(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),m(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),m(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),m(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),e(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),z(`line-type, bar-type`,[e(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[m(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),z(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),z(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),e(`tabs-nav`,[U(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),e(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),z(`line-type`,[z(`top`,[U(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),e(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),e(`tabs-bar`,`
 bottom: -1px;
 `)]),z(`left`,[U(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),e(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),e(`tabs-bar`,`
 right: -1px;
 `)]),z(`right`,[U(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),e(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),e(`tabs-bar`,`
 left: -1px;
 `)]),z(`bottom`,[U(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),e(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),e(`tabs-bar`,`
 top: -1px;
 `)]),U(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),e(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),e(`tabs-bar`,`
 border-radius: 0;
 `)]),z(`card-type`,[U(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),e(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),e(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),e(`tabs-tab`,`
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
 `,[z(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[U(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),re(`disabled`,[m(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),z(`closable`,`padding-inline-end: 8px;`),z(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),z(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),z(`left, right`,`
 flex-direction: column; 
 `,[U(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),e(`tabs-wrapper`,`
 flex-direction: column;
 `),e(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[e(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),z(`top`,[z(`card-type`,[e(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),U(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),e(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-bottom: 1px solid #0000;
 `)]),e(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),e(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),z(`left`,[z(`card-type`,[e(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),U(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),e(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-right: 1px solid #0000;
 `)]),e(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),e(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),z(`right`,[z(`card-type`,[e(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),U(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),e(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-left: 1px solid #0000;
 `)]),e(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),e(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),z(`bottom`,[z(`card-type`,[e(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),U(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),e(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[z(`active`,`
 border-top: 1px solid #0000;
 `)]),e(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),e(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),e(`tabs-scroll-button`,[z(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),z(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),z(`up`,`
 padding-bottom: 10px;
 `),z(`down`,`
 padding-top: 10px;
 `)])]),ft=n({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:s}=this,c=n===`next`,l=r?c:i?!c:c;return b(),g(L,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:s,class:O([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(b(),g(Q,{clsPrefix:e,style:w(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>l?(b(),g(_e,{key:1})):(b(),g(Qe,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),pt=Ye,mt={...o.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},ht=n({name:`Tabs`,props:mt,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i,mergedRtlRef:c}=se(e),d=v(`Tabs`,c,n),p=E(()=>{let{placement:t}=e;return t===`start`?d?.value?`right`:`left`:t===`end`?d?.value?`left`:`right`:t}),m=o(`Tabs`,`-tabs`,dt,we,e,n),g=H(null),_=H(null),y=H(null),b=H(null),x=H(null),C=H(null),w=H(null),T=H(!0),O=H(!0),k=fe(e,[`labelSize`,`size`]),j=E(()=>k.value?k.value:i?.value?.Tabs?.size||`medium`),M=fe(e,[`activeName`,`value`]),N=H(M.value??e.defaultValue??(t.default?ce(t.default())[0]?.props?.name:null)),P=pe(M,N),I={id:0},ee=E(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});s(P,()=>{I.id=0,B(),f(()=>{re()})});function L(){let{value:e}=P;return e===null?null:g.value?.querySelector(`[data-name="${e}"]`)}function te(t){if(e.type===`card`)return;let{value:r}=y;if(!r)return;let i=r.style.opacity===`0`;if(t){let a=`${n.value}-tabs-bar--disabled`,{barWidth:o}=e,s=p.value;if(t.dataset.disabled===`true`?r.classList.add(a):r.classList.remove(a),[`top`,`bottom`].includes(s)){if(z([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;r.style.left=`${e}px`,r.style.maxWidth=`${o}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width=`8192px`,i&&(r.style.transition=`none`),r.offsetWidth,i&&(r.style.transition=``,r.style.opacity=`1`)}else{if(z([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;r.style.top=`${e}px`,r.style.maxHeight=`${o}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height=`8192px`,i&&(r.style.transition=`none`),r.offsetHeight,i&&(r.style.transition=``,r.style.opacity=`1`)}}}function R(){if(e.type===`card`)return;let{value:t}=y;t&&(t.style.opacity=`0`)}function z(e){let{value:t}=y;if(t)for(let n of e)t.style[n]=``}function B(){if(e.type===`card`)return;let t=L();t?te(t):R()}function ne(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function re(){let t=[`top`,`bottom`].includes(p.value),n=L();if(n){if(t){let r=C.value?.$el;if(!r)return;ne(r,n,t,e.centerActiveTab)}else{let{value:r}=w;if(!r)return;ne(r,n,t,e.centerActiveTab)}}}let V=H(null),U=0,W=null;function ie(e){let t=V.value;if(t){U=e.getBoundingClientRect().height;let n=`${U}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};W?(r(),W(),W=null):W=r}}function G(e){let t=V.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(U,n)}px`};W?(W(),W=null,r()):W=r}}function K(){let t=V.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let ae={value:[]},q=H(`next`);function oe(e){let t=P.value,n=`next`;for(let r of ae.value){if(r===t)break;if(r===e){n=`prev`;break}}q.value=n,le(e)}function le(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&u(n,t),r&&u(r,t),i&&u(i,t),N.value=t}function ue(t){let{onClose:n}=e;n&&u(n,t)}function de(e){if([`top`,`bottom`].includes(p.value)){let{value:t}=C;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!d?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=w;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let me=!0;function ge(){let{value:e}=y;if(!e)return;me&&=!1;let t=`transition-disabled`;e.classList.add(t),B(),e.classList.remove(t)}let J=H(null);function Y({transitionDisabled:e}){let t=g.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=L();n&&J.value&&(J.value.style.width=`${n.offsetWidth}px`,J.value.style.height=`${n.offsetHeight}px`,J.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&J.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}s([P],()=>{e.type===`segment`&&f(()=>{Y({transitionDisabled:!1})})}),h(()=>{e.type===`segment`&&Y({transitionDisabled:!0})});let X=0;function Z(t){if(t.contentRect.width===0&&t.contentRect.height===0||X===t.contentRect.width)return;X=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(me||e.justifyContent?.startsWith(`space`))&&ge(),n!==`segment`&&$(Ce())}let _e=pt(Z,64);function ve(){let{type:t}=e;t===`line`||t===`bar`?ge():t===`segment`&&Y({transitionDisabled:!0})}s([()=>e.justifyContent,()=>e.size],()=>{f(()=>{(e.type===`line`||e.type===`bar`)&&ge()})}),s([p,()=>d?.value],()=>{f(()=>{ve(),$(Ce(),{instantly:!0})})}),s(()=>e.type,()=>{f(()=>{let e=_.value;e&&(e.classList.add(`transition-disabled`),ve(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Q=H(!1);function ye(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=p.value;if(!Q.value)o===`top`||o===`bottom`?i<n&&(Q.value=!0):a<r&&(Q.value=!0);else{let{value:e}=x;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Q.value=!1):a-r>e.$el.offsetHeight&&(Q.value=!1)}$(C.value?.$el||null)}let be=pt(ye,64);function xe(){let{onAdd:t}=e;t&&t()}let Se=H(!1);function Ce(){let e=p.value;return(e===`top`||e===`bottom`?C.value?.$el:w.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?b.value:null;n&&n.classList.add(`transition-disabled`);let r=p.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);T.value=i<=1,O.value=i+r>=n-1,Se.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;T.value=t<=1,O.value=t+r>=n-1,Se.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let Te=pt(e=>{$(e.target)},64);a(at,{triggerRef:A(e,`trigger`),tabStyleRef:A(e,`tabStyle`),tabClassRef:A(e,`tabClass`),addTabStyleRef:A(e,`addTabStyle`),addTabClassRef:A(e,`addTabClass`),paneClassRef:A(e,`paneClass`),paneStyleRef:A(e,`paneStyle`),mergedClsPrefixRef:n,typeRef:A(e,`type`),closableRef:A(e,`closable`),valueRef:P,tabChangeIdRef:I,onBeforeLeaveRef:A(e,`onBeforeLeave`),activateTab:oe,handleClose:ue,handleAdd:xe}),he(()=>{B(),re()}),S(()=>{let{value:e}=b;if(!e)return;let{value:t}=n,r=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;T.value?e.classList.remove(r):e.classList.add(r),O.value?e.classList.remove(i):e.classList.add(i)});let Ee={syncBarPosition:()=>{B()},scrollToCurrentTab:()=>{re()}},De=()=>{Y({transitionDisabled:!0})},Oe=E(()=>{let{value:t}=j,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:d,tabBorderRadius:f,tabFontWeightActive:p,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[F(`panePadding`,t)]:C,[F(`tabPadding`,r)]:w,[F(`tabPaddingVertical`,r)]:T,[F(`tabGap`,r)]:E,[F(`tabGap`,`${r}Vertical`)]:O,[F(`tabTextColor`,n)]:k,[F(`tabTextColorActive`,n)]:A,[F(`tabTextColorHover`,n)]:M,[F(`tabTextColorDisabled`,n)]:N,[F(`tabFontSize`,t)]:P},common:{cubicBezierEaseInOut:I}}=m.value;return{"--n-bezier":I,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":P,"--n-tab-text-color":k,"--n-tab-text-color-active":A,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":f,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":d,"--n-tab-font-weight-active":p,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":O,"--n-pane-padding-left":D(C,`left`),"--n-pane-padding-right":D(C,`right`),"--n-pane-padding-top":D(C,`top`),"--n-pane-padding-bottom":D(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),ke=r?l(`tabs`,E(()=>`${j.value[0]}${e.type[0]}`),Oe,e):void 0;return{mergedClsPrefix:n,mergedValue:P,renderedNames:new Set,segmentCapsuleElRef:J,tabsPaneWrapperRef:V,tabsElRef:g,selfElRef:_,barElRef:y,addTabInstRef:x,xScrollInstRef:C,scrollWrapperElRef:b,addTabFixed:Q,tabWrapperStyle:ee,handleNavResize:_e,mergedSize:j,handleScroll:Te,handleTabsResize:be,cssVars:r?void 0:Oe,themeClass:ke?.themeClass,animationDirection:q,renderNameListRef:ae,yScrollElRef:w,handleSegmentResize:De,onAnimationBeforeLeave:ie,onAnimationEnter:G,onAnimationAfterEnter:K,onRender:ke?.onRender,startReachedRef:T,endReachedRef:O,isOverflow:Se,handleButtonClick:de,mergedTheme:m,rtlEnabled:d,mergedPlacement:p,...Ee}},render(){let{mergedClsPrefix:e,type:n,mergedPlacement:r,addTabFixed:i,addable:a,mergedSize:o,renderNameListRef:s,onRender:c,paneWrapperClass:l,paneWrapperStyle:u,startReachedRef:f,endReachedRef:p,isOverflow:m,showScrollButton:h,handleButtonClick:_,mergedTheme:v,rtlEnabled:y,$slots:{default:x,prefix:S,suffix:C}}=this;c?.();let T=x?ce(x()).filter(e=>e.type.__TAB_PANE__===!0):[],E=x?ce(x()).filter(e=>e.type.__TAB__===!0):[],D=!E.length,k=n===`card`,A=n===`segment`,M=!k&&!A&&this.justifyContent;s.value=[];let N=()=>{let t=(b(),K(`div`,{style:w(this.tabWrapperStyle),class:O(`${e}-tabs-wrapper`)},[M?R(()=>null):(b(),K(`div`,{key:1,class:O(`${e}-tabs-scroll-padding`),style:w(r===`top`||r===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),D?(b(),K(j,{key:2},[R(()=>T.map((e,t)=>(s.value.push(e.props.name),yt((b(),g(ut,d(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!M||M===`center`||M===`start`||M===`end`)}),ne(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(b(),K(j,{key:3},[R(()=>E.map((e,t)=>(s.value.push(e.props.name),yt(t!==0&&!M?vt(e):e))))],64)),!i&&a&&k?(b(),K(j,{key:4},[R(()=>_t(a,(D?T.length:E.length)!==0))],64)):R(()=>null),M?R(()=>null):(b(),K(`div`,{key:7,class:O(`${e}-tabs-scroll-padding`),style:w({width:`${this.tabsPadding}px`})},null,6)),k?R(()=>null):(b(),K(`div`,{key:9,ref:`barElRef`,class:O(`${e}-tabs-bar`)},null,2))],6));return b(),K(`div`,{ref:`tabsElRef`,class:O(`${e}-tabs-nav-scroll-content`)},[k&&a?(b(),g(le,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(b(),K(j,{key:1},[R(()=>t)],64)),k?(b(),K(`div`,{key:2,class:O(`${e}-tabs-pad`)},null,2)):R(()=>null)],2)},P=A?`top`:r;return b(),K(`div`,{ref:`selfElRef`,class:O([`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${o}-size`,M&&`${e}-tabs--flex`,`${e}-tabs--${P}`,y&&`${e}-tabs--rtl`]),style:w(this.cssVars)},[q(`div`,{class:O([`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${P}`,`${e}-tabs-nav`])},[R(()=>t(S,t=>t&&(b(),K(`div`,{class:O(`${e}-tabs-nav__prefix`)},[R(()=>t)],2)))),A?(b(),g(le,{key:0,onResize:this.handleSegmentResize},{default:()=>(b(),K(`div`,{class:O(`${e}-tabs-rail`),ref:`tabsElRef`},[q(`div`,{class:O(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[q(`div`,{class:O(`${e}-tabs-wrapper`)},[q(`div`,{class:O(`${e}-tabs-tab`)},null,2)],2)],2),D?(b(),K(j,{key:0},[R(()=>T.map((e,t)=>(s.value.push(e.props.name),b(),g(ut,d(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),ne(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(b(),K(j,{key:1},[R(()=>E.map((e,t)=>(s.value.push(e.props.name),t===0?e:vt(e))))],64))],2))},1032,[`onResize`])):(b(),K(j,{key:1},[R(()=>h&&m&&(b(),g(ft,{mergedClsPrefix:e,type:`prev`,vertical:P===`left`||P===`right`,disabled:f,rtl:!!y,theme:v.peers.Button,themeOverrides:v.peerOverrides.Button,onClick:_},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(b(),g(le,{onResize:this.handleNavResize},{default:()=>(b(),K(`div`,{class:O(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(P)?(b(),g(Ze,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:N},1032,[`onScroll`])):(b(),K(`div`,{key:1,class:O(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[R(()=>N())],42,[`onScroll`]))],2))},1032,[`onResize`])),R(()=>h&&m&&(b(),g(ft,{mergedClsPrefix:e,type:`next`,vertical:P===`left`||P===`right`,disabled:p,rtl:!!y,theme:v.peers.Button,themeOverrides:v.peerOverrides.Button,onClick:_},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),i&&a&&k?(b(),K(j,{key:2},[R(()=>_t(a,!0))],64)):R(()=>null),R(()=>t(C,t=>t&&(b(),K(`div`,{class:O(`${e}-tabs-nav__suffix`)},[R(()=>t)],2))))],2),R(()=>D&&(this.animated&&(P===`top`||P===`bottom`)?(b(),K(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:w(u),class:O([`${e}-tabs-pane-wrapper`,l])},[R(()=>gt(T,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):gt(T,this.mergedValue,this.renderedNames)))],6)}});function gt(e,t,n,r,i,a,o){let s=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,c=t===r;if(e.key!==void 0&&(e.key=r),c||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);s.push(t?p(e,[[k,c]]):e)}}),o?(b(),g(W,{name:`${o}-transition`,onBeforeLeave:r,onEnter:i,onAfterEnter:a},{default:()=>s},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):s}function _t(e,t){return b(),g(ut,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function vt(e){let t=oe(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function yt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var bt=Oe({name:`arrow-right`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]}),xt=Oe({name:`circle-alert`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`]}),St=Oe({name:`loader-circle`,size:24,node:[[`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`,key:`13zald`}]],aliases:[`loader-2`]}),Ct=/^[0-9A-Za-z_\u4e00-\u9fa5]{2,20}$/,wt=/^[\u4e00-\u9fa5A-Za-z·]{2,20}$/,Tt=/^\d{4,20}$/,Et=/^[A-Za-z][A-Za-z0-9_-]{4,19}$/,Dt=/^[1-9]\d{4,11}$/,Ot=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,kt={wechat:`5-20 位，字母开头，可含数字、_ 和 -`,qq:`5-12 位数字，不能以 0 开头`,email:`例：name@example.com`};function At(e,t){return e===`wechat`?Et.test(t):e===`qq`?Dt.test(t):Ot.test(t)}var jt={wechat:`微信号需为 5-20 位、以字母开头（可含字母、数字、_ 和 -）`,qq:`QQ 号需为 5-12 位数字，且不能以 0 开头`,email:`邮箱格式不正确，例：name@example.com`};function Mt(e){return e.length<8||e.length>64?`密码长度需为 8-64 位`:!/[A-Za-z]/.test(e)||!/\d/.test(e)?`密码需同时包含字母和数字`:null}var Nt={class:`grid min-h-full place-items-center px-4 py-8`},Pt={class:`w-full max-w-[440px]`},Ft={class:`mb-5 flex items-center justify-between`},It={class:`flex items-center gap-2.5`},Lt={class:`grid size-9 place-items-center rounded-[10px] border`,style:{"background-color":`var(--accent-tint-soft)`,"border-color":`var(--accent-tint-border)`,color:`var(--primary)`},"aria-hidden":`true`},Rt={class:`panel p-5 sm:p-6`},zt={class:`mb-4 flex items-center gap-2`},Bt={class:`font-heading text-[26px] leading-tight font-bold`},Vt={class:`mt-1.5 mb-5 text-[13px] text-ink-3`},Ht={class:`grid gap-x-3 sm:grid-cols-2`},Ut={class:`flex w-full gap-2`},Wt={class:`-mt-3 mb-3 text-[11px] text-ink-4`},Gt={class:`grid gap-x-3 sm:grid-cols-2`},Kt=n({__name:`LoginView`,setup(e){let t=Te(),n=Ce(),i=Ee(),a=De(),o=H(`login`),s=H(!1),l=H(null),u=T({identifier:``,password:``}),d=H(null),f=T({nickname:``,real_name:``,student_id:``,dorm:``,contact_type:`wechat`,contact:``,password:``,confirm_password:``}),p=H(null),m=Object.keys(Me).map(e=>({label:Me[e],value:e})),_={identifier:[{required:!0,message:`请输入姓名或昵称`,trigger:[`blur`,`input`]}],password:[{required:!0,message:`请输入密码`,trigger:[`blur`,`input`]}]},v=E(()=>({nickname:[{required:!0,message:`请输入昵称`,trigger:[`blur`,`input`]},{validator:(e,t)=>Ct.test(t),message:`昵称需为 2-20 位中文、字母、数字或下划线`,trigger:[`blur`,`input`]}],real_name:[{required:!0,message:`请输入姓名`,trigger:[`blur`,`input`]},{validator:(e,t)=>wt.test(t),message:`姓名需为 2-20 位中文或字母`,trigger:[`blur`,`input`]}],student_id:[{required:!0,message:`请输入学号`,trigger:[`blur`,`input`]},{validator:(e,t)=>Tt.test(t),message:`学号需为 4-20 位数字`,trigger:[`blur`,`input`]}],dorm:[{required:!0,message:`请填写宿舍位置`,trigger:[`blur`,`input`]},{validator:(e,t)=>t.trim().length>=2&&t.trim().length<=50,message:`宿舍位置需为 2-50 个字符（写到门牌号）`,trigger:[`blur`,`input`]}],contact:[{required:!0,message:`请填写联系方式`,trigger:[`blur`,`input`]},{validator:(e,t)=>t.length<=50&&At(f.contact_type,t),message:`联系方式格式不正确`,trigger:[`blur`,`input`]}],password:[{required:!0,message:`请输入密码`,trigger:[`blur`,`input`]},{validator:(e,t)=>Mt(t)===null,message:`密码需 8-64 位且同时包含字母和数字`,trigger:[`blur`,`input`]},{validator:(e,t)=>t!==f.nickname&&t!==f.student_id,message:`密码不能与昵称或学号相同`,trigger:[`blur`,`input`]}],confirm_password:[{required:!0,message:`请再次输入密码`,trigger:[`blur`,`input`]},{validator:(e,t)=>t===f.password,message:`两次输入的密码不一致`,trigger:[`blur`,`input`]}]}));function x(){let e=i.query.redirect;return typeof e==`string`&&e.startsWith(`/`)&&e.startsWith(`/staff`)===t.isStaff?e:t.isStaff?`/staff/orders`:`/upload`}async function S(){try{await d.value?.validate()}catch{return}s.value=!0;try{await t.login(u.identifier.trim(),u.password),a.success(`登录成功`),await n.replace(x())}catch(e){a.error(e instanceof V?e.message:`登录失败，请稍后重试`)}finally{s.value=!1}}async function D(){try{await p.value?.validate()}catch{return}s.value=!0;try{await t.register({nickname:f.nickname.trim(),real_name:f.real_name.trim(),student_id:f.student_id.trim(),dorm:f.dorm.trim(),contact_type:f.contact_type,contact:f.contact.trim(),password:f.password,confirm_password:f.confirm_password}),a.success(`注册成功`),await n.replace(`/upload`)}catch(e){a.error(e instanceof V?e.message:`注册失败，请稍后重试`)}finally{s.value=!1}}return h(async()=>{try{let e=await fetch(`/hello`);l.value=e.ok}catch{l.value=!1}}),(e,t)=>(b(),K(`div`,Nt,[q(`div`,Pt,[q(`div`,Ft,[q(`span`,It,[q(`span`,Lt,[r(P(Ae),{size:18})]),t[11]||=q(`span`,{class:`flex flex-col leading-none`},[q(`span`,{class:`font-heading text-[15px] font-bold`},`宿舍打印`),q(`span`,{class:`tech-label mt-0.5 text-ink-4`},`Dorm Print`)],-1)]),r(je)]),q(`div`,Rt,[q(`div`,zt,[q(`span`,{class:`tech-label inline-flex items-center gap-1.5 rounded-full px-2 py-1`,style:w({color:l.value===!1?`var(--err)`:`var(--secondary)`,backgroundColor:l.value===!1?`#f871711f`:`var(--role-user-bg)`})},[(b(),g(c(l.value===null?P(St):l.value?P(ke):P(xt)),{size:12,class:M(l.value===null&&`animate-spin`)},null,8,[`class`])),y(` `+G(l.value===null?`正在连接`:l.value?`服务在线`:`服务不可达`),1)],4),t[12]||=q(`span`,{class:`tech-label ml-auto text-ink-4`},`v2`,-1)]),q(`h1`,Bt,G(o.value===`login`?`登录你的账号`:`注册新账号`),1),q(`p`,Vt,G(o.value===`login`?`用姓名或昵称登录，提交文件后凭取件码取件。`:`注册后即可上传文件下单，取件码会随订单生成。`),1),r(P(ht),{value:o.value,"onUpdate:value":t[10]||=e=>o.value=e,type:`line`,animated:``},{default:C(()=>[r(P(st),{name:`login`,tab:`登录`},{default:C(()=>[r(P(it),{ref_key:`loginRef`,ref:d,model:u,rules:_,"label-placement":`top`,"show-require-mark":!1,onSubmit:te(S,[`prevent`])},{default:C(()=>[r(P(X),{label:`姓名 / 昵称`,path:`identifier`},{default:C(()=>[r(P(Z),{value:u.identifier,"onUpdate:value":t[0]||=e=>u.identifier=e,placeholder:`请输入姓名或昵称`,autocomplete:`username`,"input-props":{autocapitalize:`off`,autocorrect:`off`}},null,8,[`value`])]),_:1}),r(P(X),{label:`密码`,path:`password`},{default:C(()=>[r(P(Z),{value:u.password,"onUpdate:value":t[1]||=e=>u.password=e,type:`password`,"show-password-on":`click`,placeholder:`请输入密码`,autocomplete:`current-password`,onKeydown:B(S,[`enter`])},null,8,[`value`])]),_:1}),r(P(L),{type:`primary`,block:``,size:`large`,loading:s.value,class:`mt-1 !font-bold shadow-[var(--glow-primary)]`,onClick:S},{icon:C(()=>[r(P(bt),{size:16})]),default:C(()=>[t[13]||=y(` 登录 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`model`])]),_:1}),r(P(st),{name:`register`,tab:`注册`},{default:C(()=>[r(P(it),{ref_key:`registerRef`,ref:p,model:f,rules:v.value,"label-placement":`top`,"show-require-mark":!1,onSubmit:te(D,[`prevent`])},{default:C(()=>[q(`div`,Ht,[r(P(X),{label:`昵称`,path:`nickname`},{default:C(()=>[r(P(Z),{value:f.nickname,"onUpdate:value":t[2]||=e=>f.nickname=e,placeholder:`登录名，2-20 位`},null,8,[`value`])]),_:1}),r(P(X),{label:`姓名`,path:`real_name`},{default:C(()=>[r(P(Z),{value:f.real_name,"onUpdate:value":t[3]||=e=>f.real_name=e,placeholder:`真实姓名`},null,8,[`value`])]),_:1}),r(P(X),{label:`学号`,path:`student_id`},{default:C(()=>[r(P(Z),{value:f.student_id,"onUpdate:value":t[4]||=e=>f.student_id=e,placeholder:`4-20 位数字`},null,8,[`value`])]),_:1}),r(P(X),{label:`宿舍位置`,path:`dorm`},{default:C(()=>[r(P(Z),{value:f.dorm,"onUpdate:value":t[5]||=e=>f.dorm=e,placeholder:`例：3 号楼 502`},null,8,[`value`])]),_:1})]),r(P(X),{label:`联系方式`,path:`contact`},{default:C(()=>[q(`div`,Ut,[r(P(ge),{value:f.contact_type,"onUpdate:value":t[6]||=e=>f.contact_type=e,options:P(m),class:`!w-[112px] shrink-0`,"consistent-menu-width":!1},null,8,[`value`,`options`]),r(P(Z),{value:f.contact,"onUpdate:value":t[7]||=e=>f.contact=e,placeholder:P(kt)[f.contact_type],class:`min-w-0 flex-1`},null,8,[`value`,`placeholder`])])]),_:1}),q(`p`,Wt,G(P(jt)[f.contact_type]),1),q(`div`,Gt,[r(P(X),{label:`密码`,path:`password`},{default:C(()=>[r(P(Z),{value:f.password,"onUpdate:value":t[8]||=e=>f.password=e,type:`password`,"show-password-on":`click`,placeholder:`8-64 位，含字母和数字`,autocomplete:`new-password`},null,8,[`value`])]),_:1}),r(P(X),{label:`确认密码`,path:`confirm_password`},{default:C(()=>[r(P(Z),{value:f.confirm_password,"onUpdate:value":t[9]||=e=>f.confirm_password=e,type:`password`,"show-password-on":`click`,placeholder:`再输一次`,autocomplete:`new-password`,onKeydown:B(D,[`enter`])},null,8,[`value`])]),_:1})]),r(P(L),{type:`primary`,block:``,size:`large`,loading:s.value,class:`!font-bold shadow-[var(--glow-primary)]`,onClick:D},{default:C(()=>[...t[14]||=[y(` 注册并登录 `,-1)]]),_:1},8,[`loading`])]),_:1},8,[`model`,`rules`])]),_:1})]),_:1},8,[`value`])]),t[15]||=q(`p`,{class:`mt-4 text-center text-[11px] text-ink-4`},` 管理员账号由超管在后台开通，注册一律为普通用户。 `,-1)])]))}});export{Kt as default};