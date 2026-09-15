import{$n as e,$t as t,A as n,An as r,Dn as i,En as a,Gt as o,Hn as s,I as c,L as l,M as u,Mn as d,Nn as f,On as p,Pn as m,Qn as h,Qt as g,Sn as _,St as v,T as y,Tn as b,Un as x,Wn as S,Xn as C,Xt as w,Yn as T,_r as E,bn as D,cr as O,ct as k,dt as A,fn as j,gn as M,gr as N,gt as ee,in as P,l as F,mn as I,mt as L,nn as R,or as te,pn as z,pr as B,pt as ne,qn as re,rn as V,s as H,tn as U,un as ie,ut as ae,vr as W,wn as G,wt as oe,xn as K,yn as se,yr as q,yt as ce,zn as le}from"./endpoints-BjKpicAD.js";import{_ as ue,a as de,j as fe}from"./fade-in-scale-up.cssr-YHRJZfJ_.js";import{a as J,d as pe,f as me,o as Y,p as he}from"./Popover-Da_9Zg5V.js";import{t as X}from"./Select-XDXSf2oV.js";import{n as ge,r as _e,t as Z}from"./FormItem-BIM3wKqI.js";import{t as Q}from"./Input-BKvixROL.js";import{t as $}from"./ChevronRight-Siy-3vy3.js";import{t as ve}from"./Add-mPlYiHwe.js";import{J as ye,R as be,W as xe,X as Se,_ as Ce,d as we,j as Te,p as Ee,t as De,u as Oe,y as ke}from"./index-F9FIAhEV.js";import{t as Ae}from"./createLucideIcon-BtyG49x8.js";import{t as je}from"./circle-check-BzyIFRk5.js";import{n as Me,t as Ne}from"./ThemeToggle-CqOgWf8L.js";import{n as Pe}from"./types-rtNxLBzn.js";var Fe=/\s/;function Ie(e){for(var t=e.length;t--&&Fe.test(e.charAt(t)););return t}var Le=/^\s+/;function Re(e){return e&&e.slice(0,Ie(e)+1).replace(Le,``)}var ze=NaN,Be=/^[-+]0x[0-9a-f]+$/i,Ve=/^0b[01]+$/i,He=/^0o[0-7]+$/i,Ue=parseInt;function We(e){if(typeof e==`number`)return e;if(fe(e))return ze;if(o(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=o(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Re(e);var n=Ve.test(e);return n||He.test(e)?Ue(e.slice(2),n?2:8):Be.test(e)?ze:+e}var Ge=function(){return w.Date.now()},Ke=`Expected a function`,qe=Math.max,Je=Math.min;function Ye(e,t,n){var r,i,a,s,c,l,u=0,d=!1,f=!1,p=!0;if(typeof e!=`function`)throw TypeError(Ke);t=We(t)||0,o(n)&&(d=!!n.leading,f=`maxWait`in n,a=f?qe(We(n.maxWait)||0,t):a,p=`trailing`in n?!!n.trailing:p);function m(t){var n=r,a=i;return r=i=void 0,u=t,s=e.apply(a,n),s}function h(e){return u=e,c=setTimeout(v,t),d?m(e):s}function g(e){var n=e-l,r=e-u,i=t-n;return f?Je(i,a-r):i}function _(e){var n=e-l,r=e-u;return l===void 0||n>=t||n<0||f&&r>=a}function v(){var e=Ge();if(_(e))return y(e);c=setTimeout(v,g(e))}function y(e){return c=void 0,p&&r?m(e):(r=i=void 0,s)}function b(){c!==void 0&&clearTimeout(c),u=0,r=l=i=c=void 0}function x(){return c===void 0?s:y(Ge())}function S(){var e=Ge(),n=_(e);if(r=arguments,i=this,l=e,n){if(c===void 0)return h(l);if(f)return clearTimeout(c),c=setTimeout(v,t),m(l)}return c===void 0&&(c=setTimeout(v,t)),s}return S.cancel=b,S.flush=x,S}var Xe=`Expected a function`;function Ze(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Xe);return o(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ye(e,t,{leading:r,maxWait:t,trailing:i})}var Qe=J(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[J(`&::-webkit-scrollbar`,{width:0,height:0})]),$e=p({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=O(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=ee();return Qe.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:Y,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return r(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),et=p({name:`ChevronLeft`,render(){return(()=>{let e=ae(`dfe229c2639b2082`);return e[0]||=K(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[K(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),tt=t(`form`,[R(`inline`,`
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `,[t(`form-item`,{width:`auto`,marginRight:`18px`},[g(`&:last-child`,{marginRight:0})])])]),nt=[`onSubmit`],rt={...c.props,inline:Boolean,labelWidth:[Number,String],labelAlign:String,labelPlacement:{type:String,default:`top`},model:{type:Object,default:()=>{}},rules:Object,disabled:Boolean,size:String,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:!0},onSubmit:{type:Function,default:e=>{e.preventDefault()}},showLabel:{type:Boolean,default:void 0},validateMessages:Object},it=()=>!0;function at(e){return e===void 0?{paths:null,shouldRuleBeApplied:it}:typeof e==`function`?{paths:null,shouldRuleBeApplied:e}:Array.isArray(e)?{paths:e,shouldRuleBeApplied:it}:e}var ot=p({name:`Form`,props:rt,setup(e){let{mergedClsPrefixRef:t}=ce(e);c(`Form`,`-form`,tt,Ce,e,t);let n={},r=O(void 0),i=e=>{let t=r.value;(t===void 0||e>=t)&&(r.value=e)};function a(){for(let e of Se(n)){let t=n[e];for(let e of t)e.invalidateLabelWidth?.()}}async function o(e,t){let{paths:r,shouldRuleBeApplied:i}=at(t);return await new Promise((t,a)=>{let o=[];for(let e of Se(n)){if(r!==null&&!r.includes(e))continue;let t=n[e];for(let e of t)e.path&&o.push(e.internalValidate(null,i))}Promise.all(o).then(n=>{let r=n.some(e=>!e.valid),i=[],o=[];n.forEach(e=>{e.errors?.length&&i.push(e.errors),e.warnings?.length&&o.push(e.warnings)}),e&&e(i.length?i:void 0,{warnings:o.length?o:void 0}),r?a(i.length?i:void 0):t({warnings:o.length?o:void 0})})})}function s(){for(let e of Se(n)){let t=n[e];for(let e of t)e.restoreValidation()}}return x(ge,{props:e,maxChildLabelWidthRef:r,deriveMaxChildLabelWidth:i}),x(_e,{formItems:n}),Object.assign({validate:o,restoreValidation:s,invalidateLabelWidth:a},{mergedClsPrefix:t})},render(){let{mergedClsPrefix:e}=this;return s(),G(`form`,{class:A([`${e}-form`,this.inline&&`${e}-form--inline`]),onSubmit:this.onSubmit},[L(()=>this.$slots.default?.())],42,nt)}}),st=v(`n-tabs`),ct={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},lt=p({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:ct,slots:Object,setup(e){let t=d(st,null);return t||oe(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return s(),G(`div`,{class:A([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:W(this.style)},[L(()=>this.$slots.default?.())],6)}}),ut=[`data-name`,`data-disabled`],dt={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...Te(ct,[`displayDirective`])},ft=p({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:dt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:f,handleAdd:p,activateTab:m,handleClose:h}=d(st);return{trigger:f,mergedClosable:D(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){p();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&m(t)}):m(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:r,label:i,tab:a,value:o,mergedClosable:c,trigger:l,$slots:{default:u}}=this,d=i??a;return s(),G(`div`,{class:A(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(s(),G(`div`,{key:0,class:A(`${t}-tabs-tab-pad`)},null,2)):L(()=>null),(s(),G(`div`,f({key:n,"data-name":n,"data-disabled":r?!0:void 0},f({class:[`${t}-tabs-tab`,o===n&&`${t}-tabs-tab--active`,r&&`${t}-tabs-tab--disabled`,c&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:l===`click`?this.activateTab:void 0,onMouseenter:l===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[K(`span`,{class:A(`${t}-tabs-tab__label`)},[e?(s(),G(M,{key:0},[K(`div`,{class:A(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(s(),_(ye,{clsPrefix:t},{default:()=>(s(),_(ve))},1032,[`clsPrefix`]))],64)):(s(),G(M,{key:1},[u?(s(),G(M,{key:0},[L(()=>u())],64)):(s(),G(M,{key:1},[typeof d==`object`?(s(),G(M,{key:0},[L(()=>d)],64)):(s(),G(M,{key:1},[L(()=>be(d??n))],64))],64))],64))],2),c&&this.type===`card`?(s(),_(xe,{key:0,clsPrefix:t,class:A(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:r},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):L(()=>null)],16,ut))],2)}}),pt=t(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[g(`&.transition-disabled`,[t(`tabs-tab`,`
 transition: none !important;
 `),t(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),t(`tabs-tab-pad`,`
 transition: none !important;
 `)]),R(`segment-type`,[t(`tabs-rail`,[g(`&.transition-disabled`,[t(`tabs-capsule`,`
 transition: none;
 `)])])]),R(`top`,[t(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),R(`left`,[t(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),R(`left, right`,`
 flex-direction: row;
 `,[t(`tabs-bar`,`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),t(`tabs-tab`,`
 padding: var(--n-tab-padding-vertical); 
 `)]),R(`right`,`
 flex-direction: row-reverse;
 `,[t(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),t(`tabs-bar`,`
 left: 0;
 `)]),R(`bottom`,`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[t(`tab-pane`,`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),t(`tabs-bar`,`
 top: 0;
 `)]),t(`tabs-rail`,`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[t(`tabs-capsule`,`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 left: 0;
 top: 0;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),t(`tabs-tab-wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[t(`tabs-tab`,`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[R(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),g(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),R(`flex`,[t(`tabs-nav`,`
 width: 100%;
 position: relative;
 `,[t(`tabs-wrapper`,`
 width: 100%;
 `,[t(`tabs-tab`,`
 margin-right: 0;
 `)])])]),t(`tabs-nav`,`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[U(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),U(`prefix`,`padding-right: 16px;`),U(`suffix`,`padding-left: 16px;`)]),R(`top, bottom`,[g(`>`,[t(`tabs-nav`,[t(`tabs-nav-scroll-wrapper`,[g(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),g(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),R(`shadow-start`,[g(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),R(`shadow-end`,[g(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),R(`left, right`,[t(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),g(`>`,[t(`tabs-nav`,[t(`tabs-nav-scroll-wrapper`,[g(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),g(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),R(`shadow-start`,[g(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),R(`shadow-end`,[g(`&::after`,`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),t(`tabs-nav-scroll-wrapper`,`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[t(`tabs-nav-y-scroll`,`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[g(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),g(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),g(`&.transition-disabled`,[g(`&::before, &::after`,`
 transition: none;
 `)])]),t(`tabs-nav-scroll-content`,`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),t(`tabs-wrapper`,`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),t(`tabs-tab-wrapper`,`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),t(`tabs-tab`,`
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
 `,[R(`disabled`,{cursor:`not-allowed`}),U(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),U(`label`,`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),t(`tabs-bar`,`
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
 `,[g(`&.transition-disabled`,`
 transition: none;
 `),R(`disabled`,`
 background-color: var(--n-tab-text-color-disabled)
 `)]),t(`tabs-pane-wrapper`,`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),t(`tab-pane`,`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[g(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),g(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),g(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),g(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),g(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),t(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),R(`line-type, bar-type`,[t(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[g(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),R(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),R(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),t(`tabs-nav`,[U(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),t(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),R(`line-type`,[R(`top`,[U(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),t(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),t(`tabs-bar`,`
 bottom: -1px;
 `)]),R(`left`,[U(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),t(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),t(`tabs-bar`,`
 right: -1px;
 `)]),R(`right`,[U(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),t(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),t(`tabs-bar`,`
 left: -1px;
 `)]),R(`bottom`,[U(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),t(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),t(`tabs-bar`,`
 top: -1px;
 `)]),U(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),t(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),t(`tabs-bar`,`
 border-radius: 0;
 `)]),R(`card-type`,[U(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),t(`tabs-pad`,`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),t(`tabs-tab-pad`,`
 transition: border-color .3s var(--n-bezier);
 `),t(`tabs-tab`,`
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
 `,[R(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[U(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),V(`disabled`,[g(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),R(`closable`,`padding-inline-end: 8px;`),R(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),R(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),R(`left, right`,`
 flex-direction: column; 
 `,[U(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),t(`tabs-wrapper`,`
 flex-direction: column;
 `),t(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[t(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),R(`top`,[R(`card-type`,[t(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),U(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),t(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[R(`active`,`
 border-bottom: 1px solid #0000;
 `)]),t(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),t(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),R(`left`,[R(`card-type`,[t(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),U(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),t(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[R(`active`,`
 border-right: 1px solid #0000;
 `)]),t(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),t(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),R(`right`,[R(`card-type`,[t(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),U(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),t(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[R(`active`,`
 border-left: 1px solid #0000;
 `)]),t(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),t(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),R(`bottom`,[R(`card-type`,[t(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),U(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),t(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[R(`active`,`
 border-top: 1px solid #0000;
 `)]),t(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),t(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),t(`tabs-scroll-button`,[R(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),R(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),R(`up`,`
 padding-bottom: 10px;
 `),R(`down`,`
 padding-top: 10px;
 `)])]),mt=p({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:r,rtl:i,theme:a,themeOverrides:o,handleClick:c}=this,l=n===`next`,u=r?l:i?!l:l;return s(),_(F,{text:!0,disabled:t,size:`small`,theme:a,themeOverrides:o,onClick:c,class:A([`${e}-tabs-scroll-button`,!r&&n===`prev`&&`${e}-tabs-scroll-button--start`,!r&&n===`next`&&`${e}-tabs-scroll-button--end`,r&&n===`prev`&&`${e}-tabs-scroll-button--up`,r&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(s(),_(ye,{clsPrefix:e,style:W(r?{transform:`rotate(90deg)`}:void 0)},{default:()=>u?(s(),_($,{key:1})):(s(),_(et,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),ht=Ze,gt={...c.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},_t=p({name:`Tabs`,props:gt,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i,mergedRtlRef:a}=ce(e),o=y(`Tabs`,a,n),s=D(()=>{let{placement:t}=e;return t===`start`?o?.value?`right`:`left`:t===`end`?o?.value?`left`:`right`:t}),d=c(`Tabs`,`-tabs`,pt,Ee,e,n),f=O(null),p=O(null),h=O(null),g=O(null),_=O(null),v=O(null),b=O(null),S=O(!0),w=O(!0),E=pe(e,[`labelSize`,`size`]),A=D(()=>E.value?E.value:i?.value?.Tabs?.size||`medium`),j=pe(e,[`activeName`,`value`]),M=O(j.value??e.defaultValue??(t.default?ue(t.default())[0]?.props?.name:null)),N=me(j,M),ee={id:0},F=D(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});T(N,()=>{ee.id=0,z(),m(()=>{re()})});function I(){let{value:e}=N;return e===null?null:f.value?.querySelector(`[data-name="${e}"]`)}function L(t){if(e.type===`card`)return;let{value:r}=h;if(!r)return;let i=r.style.opacity===`0`;if(t){let a=`${n.value}-tabs-bar--disabled`,{barWidth:o}=e,c=s.value;if(t.dataset.disabled===`true`?r.classList.add(a):r.classList.remove(a),[`top`,`bottom`].includes(c)){if(te([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;r.style.left=`${e}px`,r.style.maxWidth=`${o}px`}else r.style.left=`${t.offsetLeft}px`,r.style.maxWidth=`${t.offsetWidth}px`;r.style.width=`8192px`,i&&(r.style.transition=`none`),r.offsetWidth,i&&(r.style.transition=``,r.style.opacity=`1`)}else{if(te([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;r.style.top=`${e}px`,r.style.maxHeight=`${o}px`}else r.style.top=`${t.offsetTop}px`,r.style.maxHeight=`${t.offsetHeight}px`;r.style.height=`8192px`,i&&(r.style.transition=`none`),r.offsetHeight,i&&(r.style.transition=``,r.style.opacity=`1`)}}}function R(){if(e.type===`card`)return;let{value:t}=h;t&&(t.style.opacity=`0`)}function te(e){let{value:t}=h;if(t)for(let n of e)t.style[n]=``}function z(){if(e.type===`card`)return;let t=I();t?L(t):R()}function ne(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function re(){let t=[`top`,`bottom`].includes(s.value),n=I();if(n){if(t){let r=v.value?.$el;if(!r)return;ne(r,n,t,e.centerActiveTab)}else{let{value:r}=b;if(!r)return;ne(r,n,t,e.centerActiveTab)}}}let V=O(null),H=0,U=null;function ie(e){let t=V.value;if(t){H=e.getBoundingClientRect().height;let n=`${H}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};U?(r(),U(),U=null):U=r}}function ae(e){let t=V.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(H,n)}px`};U?(U(),U=null,r()):U=r}}function W(){let t=V.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let G={value:[]},oe=O(`next`);function K(e){let t=N.value,n=`next`;for(let r of G.value){if(r===t)break;if(r===e){n=`prev`;break}}oe.value=n,se(e)}function se(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&u(n,t),r&&u(r,t),i&&u(i,t),M.value=t}function q(t){let{onClose:n}=e;n&&u(n,t)}function de(e){if([`top`,`bottom`].includes(s.value)){let{value:t}=v;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!o?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=b;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let fe=!0;function J(){let{value:e}=h;if(!e)return;fe&&=!1;let t=`transition-disabled`;e.classList.add(t),z(),e.classList.remove(t)}let Y=O(null);function X({transitionDisabled:e}){let t=f.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=I();n&&Y.value&&(Y.value.style.width=`${n.offsetWidth}px`,Y.value.style.height=`${n.offsetHeight}px`,Y.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&Y.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}T([N],()=>{e.type===`segment`&&m(()=>{X({transitionDisabled:!1})})}),le(()=>{e.type===`segment`&&X({transitionDisabled:!0})});let ge=0;function _e(t){if(t.contentRect.width===0&&t.contentRect.height===0||ge===t.contentRect.width)return;ge=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(fe||e.justifyContent?.startsWith(`space`))&&J(),n!==`segment`&&Ce(Se())}let Z=ht(_e,64);function Q(){let{type:t}=e;t===`line`||t===`bar`?J():t===`segment`&&X({transitionDisabled:!0})}T([()=>e.justifyContent,()=>e.size],()=>{m(()=>{(e.type===`line`||e.type===`bar`)&&J()})}),T([s,()=>o?.value],()=>{m(()=>{Q(),Ce(Se(),{instantly:!0})})}),T(()=>e.type,()=>{m(()=>{let e=p.value;e&&(e.classList.add(`transition-disabled`),Q(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let $=O(!1);function ve(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=s.value;if(!$.value)o===`top`||o===`bottom`?i<n&&($.value=!0):a<r&&($.value=!0);else{let{value:e}=_;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&($.value=!1):a-r>e.$el.offsetHeight&&($.value=!1)}Ce(v.value?.$el||null)}let ye=ht(ve,64);function be(){let{onAdd:t}=e;t&&t()}let xe=O(!1);function Se(){let e=s.value;return(e===`top`||e===`bottom`?v.value?.$el:b.value)||null}function Ce(e,t={instantly:!1}){if(!e)return;let n=t.instantly?g.value:null;n&&n.classList.add(`transition-disabled`);let r=s.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);S.value=i<=1,w.value=i+r>=n-1,xe.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;S.value=t<=1,w.value=t+r>=n-1,xe.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let we=ht(e=>{Ce(e.target)},64);x(st,{triggerRef:B(e,`trigger`),tabStyleRef:B(e,`tabStyle`),tabClassRef:B(e,`tabClass`),addTabStyleRef:B(e,`addTabStyle`),addTabClassRef:B(e,`addTabClass`),paneClassRef:B(e,`paneClass`),paneStyleRef:B(e,`paneStyle`),mergedClsPrefixRef:n,typeRef:B(e,`type`),closableRef:B(e,`closable`),valueRef:N,tabChangeIdRef:ee,onBeforeLeaveRef:B(e,`onBeforeLeave`),activateTab:K,handleClose:q,handleAdd:be}),he(()=>{z(),re()}),C(()=>{let{value:e}=g;if(!e)return;let{value:t}=n,r=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;S.value?e.classList.remove(r):e.classList.add(r),w.value?e.classList.remove(i):e.classList.add(i)});let Te={syncBarPosition:()=>{z()},scrollToCurrentTab:()=>{re()}},De=()=>{X({transitionDisabled:!0})},Oe=D(()=>{let{value:t}=A,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[P(`panePadding`,t)]:C,[P(`tabPadding`,r)]:w,[P(`tabPaddingVertical`,r)]:T,[P(`tabGap`,r)]:E,[P(`tabGap`,`${r}Vertical`)]:D,[P(`tabTextColor`,n)]:O,[P(`tabTextColorActive`,n)]:j,[P(`tabTextColorHover`,n)]:M,[P(`tabTextColorDisabled`,n)]:N,[P(`tabFontSize`,t)]:ee},common:{cubicBezierEaseInOut:F}}=d.value;return{"--n-bezier":F,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":ee,"--n-tab-text-color":O,"--n-tab-text-color-active":j,"--n-tab-text-color-disabled":N,"--n-tab-text-color-hover":M,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":w,"--n-tab-padding-vertical":T,"--n-tab-gap":E,"--n-tab-gap-vertical":D,"--n-pane-padding-left":k(C,`left`),"--n-pane-padding-right":k(C,`right`),"--n-pane-padding-top":k(C,`top`),"--n-pane-padding-bottom":k(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),ke=r?l(`tabs`,D(()=>`${A.value[0]}${e.type[0]}`),Oe,e):void 0;return{mergedClsPrefix:n,mergedValue:N,renderedNames:new Set,segmentCapsuleElRef:Y,tabsPaneWrapperRef:V,tabsElRef:f,selfElRef:p,barElRef:h,addTabInstRef:_,xScrollInstRef:v,scrollWrapperElRef:g,addTabFixed:$,tabWrapperStyle:F,handleNavResize:Z,mergedSize:A,handleScroll:we,handleTabsResize:ye,cssVars:r?void 0:Oe,themeClass:ke?.themeClass,animationDirection:oe,renderNameListRef:G,yScrollElRef:b,handleSegmentResize:De,onAnimationBeforeLeave:ie,onAnimationEnter:ae,onAnimationAfterEnter:W,onRender:ke?.onRender,startReachedRef:S,endReachedRef:w,isOverflow:xe,handleButtonClick:de,mergedTheme:d,rtlEnabled:o,mergedPlacement:s,...Te}},render(){let{mergedClsPrefix:e,type:t,mergedPlacement:r,addTabFixed:i,addable:a,mergedSize:o,renderNameListRef:c,onRender:l,paneWrapperClass:u,paneWrapperStyle:d,startReachedRef:p,endReachedRef:m,isOverflow:h,showScrollButton:g,handleButtonClick:v,mergedTheme:y,rtlEnabled:b,$slots:{default:x,prefix:S,suffix:C}}=this;l?.();let w=x?ue(x()).filter(e=>e.type.__TAB_PANE__===!0):[],T=x?ue(x()).filter(e=>e.type.__TAB__===!0):[],E=!T.length,D=t===`card`,O=t===`segment`,k=!D&&!O&&this.justifyContent;c.value=[];let j=()=>{let t=(s(),G(`div`,{style:W(this.tabWrapperStyle),class:A(`${e}-tabs-wrapper`)},[k?L(()=>null):(s(),G(`div`,{key:1,class:A(`${e}-tabs-scroll-padding`),style:W(r===`top`||r===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),E?(s(),G(M,{key:2},[L(()=>w.map((e,t)=>(c.value.push(e.props.name),xt((s(),_(ft,f(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!k||k===`center`||k===`start`||k===`end`)}),ne(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(s(),G(M,{key:3},[L(()=>T.map((e,t)=>(c.value.push(e.props.name),xt(t!==0&&!k?bt(e):e))))],64)),!i&&a&&D?(s(),G(M,{key:4},[L(()=>yt(a,(E?w.length:T.length)!==0))],64)):L(()=>null),k?L(()=>null):(s(),G(`div`,{key:7,class:A(`${e}-tabs-scroll-padding`),style:W({width:`${this.tabsPadding}px`})},null,6)),D?L(()=>null):(s(),G(`div`,{key:9,ref:`barElRef`,class:A(`${e}-tabs-bar`)},null,2))],6));return s(),G(`div`,{ref:`tabsElRef`,class:A(`${e}-tabs-nav-scroll-content`)},[D&&a?(s(),_(de,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(s(),G(M,{key:1},[L(()=>t)],64)),D?(s(),G(`div`,{key:2,class:A(`${e}-tabs-pad`)},null,2)):L(()=>null)],2)},N=O?`top`:r;return s(),G(`div`,{ref:`selfElRef`,class:A([`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${o}-size`,k&&`${e}-tabs--flex`,`${e}-tabs--${N}`,b&&`${e}-tabs--rtl`]),style:W(this.cssVars)},[K(`div`,{class:A([`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${N}`,`${e}-tabs-nav`])},[L(()=>n(S,t=>t&&(s(),G(`div`,{class:A(`${e}-tabs-nav__prefix`)},[L(()=>t)],2)))),O?(s(),_(de,{key:0,onResize:this.handleSegmentResize},{default:()=>(s(),G(`div`,{class:A(`${e}-tabs-rail`),ref:`tabsElRef`},[K(`div`,{class:A(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[K(`div`,{class:A(`${e}-tabs-wrapper`)},[K(`div`,{class:A(`${e}-tabs-tab`)},null,2)],2)],2),E?(s(),G(M,{key:0},[L(()=>w.map((e,t)=>(c.value.push(e.props.name),s(),_(ft,f(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),ne(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(s(),G(M,{key:1},[L(()=>T.map((e,t)=>(c.value.push(e.props.name),t===0?e:bt(e))))],64))],2))},1032,[`onResize`])):(s(),G(M,{key:1},[L(()=>g&&h&&(s(),_(mt,{mergedClsPrefix:e,type:`prev`,vertical:N===`left`||N===`right`,disabled:p,rtl:!!b,theme:y.peers.Button,themeOverrides:y.peerOverrides.Button,onClick:v},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(s(),_(de,{onResize:this.handleNavResize},{default:()=>(s(),G(`div`,{class:A(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(N)?(s(),_($e,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:j},1032,[`onScroll`])):(s(),G(`div`,{key:1,class:A(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[L(()=>j())],42,[`onScroll`]))],2))},1032,[`onResize`])),L(()=>g&&h&&(s(),_(mt,{mergedClsPrefix:e,type:`next`,vertical:N===`left`||N===`right`,disabled:m,rtl:!!b,theme:y.peers.Button,themeOverrides:y.peerOverrides.Button,onClick:v},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),i&&a&&D?(s(),G(M,{key:2},[L(()=>yt(a,!0))],64)):L(()=>null),L(()=>n(C,t=>t&&(s(),G(`div`,{class:A(`${e}-tabs-nav__suffix`)},[L(()=>t)],2))))],2),L(()=>E&&(this.animated&&(N===`top`||N===`bottom`)?(s(),G(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:W(d),class:A([`${e}-tabs-pane-wrapper`,u])},[L(()=>vt(w,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):vt(w,this.mergedValue,this.renderedNames)))],6)}});function vt(t,n,r,i,a,o,c){let l=[];return t.forEach(t=>{let{name:i,displayDirective:a,"display-directive":o}=t.props,s=e=>a===e||o===e,c=n===i;if(t.key!==void 0&&(t.key=i),c||s(`show`)||s(`show:lazy`)&&r.has(i)){r.has(i)||r.add(i);let n=!s(`if`);l.push(n?e(t,[[j,c]]):t)}}),c?(s(),_(ie,{name:`${c}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>l},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):l}function yt(e,t){return s(),_(ft,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function bt(e){let t=se(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function xt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var St=Ae({name:`arrow-right`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]}),Ct=Ae({name:`circle-alert`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`]}),wt=Ae({name:`loader-circle`,size:24,node:[[`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`,key:`13zald`}]],aliases:[`loader-2`]}),Tt=/^[0-9A-Za-z_\u4e00-\u9fa5]{2,20}$/,Et=/^[\u4e00-\u9fa5A-Za-z·]{2,20}$/,Dt=/^\d{4,20}$/,Ot=/^[A-Za-z][A-Za-z0-9_-]{4,19}$/,kt=/^[1-9]\d{4,11}$/,At=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,jt={wechat:`5-20 位，字母开头，可含数字、_ 和 -`,qq:`5-12 位数字，不能以 0 开头`,email:`例：name@example.com`};function Mt(e,t){return e===`wechat`?Ot.test(t):e===`qq`?kt.test(t):At.test(t)}var Nt={wechat:`微信号需为 5-20 位、以字母开头（可含字母、数字、_ 和 -）`,qq:`QQ 号需为 5-12 位数字，且不能以 0 开头`,email:`邮箱格式不正确，例：name@example.com`};function Pt(e){return e.length<8||e.length>64?`密码长度需为 8-64 位`:!/[A-Za-z]/.test(e)||!/\d/.test(e)?`密码需同时包含字母和数字`:null}var Ft={class:`login-shell grid min-h-full place-items-center overflow-hidden px-4 py-8 sm:px-6`},It={class:`relative grid w-full max-w-[960px] items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-16`},Lt={class:`hidden lg:block`},Rt={class:`mt-8 grid max-w-md grid-cols-3 gap-3`},zt={class:`tech-label text-ink-2`},Bt={class:`w-full`},Vt={class:`mb-5 flex items-center justify-between`},Ht={class:`flex items-center gap-2.5`},Ut={class:`grid size-9 place-items-center rounded-[10px] border`,style:{"background-color":`var(--accent-tint-soft)`,"border-color":`var(--accent-tint-border)`,color:`var(--primary)`},"aria-hidden":`true`},Wt={class:`panel login-card p-5 sm:p-6`},Gt={class:`mb-4 flex items-center gap-2`},Kt={class:`font-heading text-[26px] leading-tight font-bold`},qt={class:`mt-1.5 mb-5 text-[13px] text-ink-3`},Jt={class:`grid gap-x-3 sm:grid-cols-2`},Yt={class:`flex w-full gap-2`},Xt={class:`-mt-3 mb-3 text-[11px] text-ink-4`},Zt={class:`grid gap-x-3 sm:grid-cols-2`},Qt=p({__name:`LoginView`,setup(e){let t=De(),n=we(),r=Oe(),o=ke(),c=O(`login`),l=O(!1),u=O(null),d=te({identifier:``,password:``}),f=O(null),p=te({nickname:``,real_name:``,student_id:``,dorm:``,contact_type:`wechat`,contact:``,password:``,confirm_password:``}),m=O(null),g=Object.keys(Pe).map(e=>({label:Pe[e],value:e})),v={identifier:[{required:!0,message:`请输入姓名或昵称`,trigger:[`blur`,`input`]}],password:[{required:!0,message:`请输入密码`,trigger:[`blur`,`input`]}]},y=D(()=>({nickname:[{required:!0,message:`请输入昵称`,trigger:[`blur`,`input`]},{validator:(e,t)=>Tt.test(t),message:`昵称需为 2-20 位中文、字母、数字或下划线`,trigger:[`blur`,`input`]}],real_name:[{required:!0,message:`请输入姓名`,trigger:[`blur`,`input`]},{validator:(e,t)=>Et.test(t),message:`姓名需为 2-20 位中文或字母`,trigger:[`blur`,`input`]}],student_id:[{required:!0,message:`请输入学号`,trigger:[`blur`,`input`]},{validator:(e,t)=>Dt.test(t),message:`学号需为 4-20 位数字`,trigger:[`blur`,`input`]}],dorm:[{required:!0,message:`请填写宿舍位置`,trigger:[`blur`,`input`]},{validator:(e,t)=>t.trim().length>=2&&t.trim().length<=50,message:`宿舍位置需为 2-50 个字符（写到门牌号）`,trigger:[`blur`,`input`]}],contact:[{required:!0,message:`请填写联系方式`,trigger:[`blur`,`input`]},{validator:(e,t)=>t.length<=50&&Mt(p.contact_type,t),message:`联系方式格式不正确`,trigger:[`blur`,`input`]}],password:[{required:!0,message:`请输入密码`,trigger:[`blur`,`input`]},{validator:(e,t)=>Pt(t)===null,message:`密码需 8-64 位且同时包含字母和数字`,trigger:[`blur`,`input`]},{validator:(e,t)=>t!==p.nickname&&t!==p.student_id,message:`密码不能与昵称或学号相同`,trigger:[`blur`,`input`]}],confirm_password:[{required:!0,message:`请再次输入密码`,trigger:[`blur`,`input`]},{validator:(e,t)=>t===p.password,message:`两次输入的密码不一致`,trigger:[`blur`,`input`]}]}));function x(){let e=r.query.redirect;return typeof e==`string`&&e.startsWith(`/`)&&e.startsWith(`/staff`)===t.isStaff?e:t.isStaff?`/staff/orders`:`/upload`}async function C(){try{await f.value?.validate()}catch{return}l.value=!0;try{await t.login(d.identifier.trim(),d.password),o.success(`登录成功`),await n.replace(x())}catch(e){o.error(e instanceof H?e.message:`登录失败，请稍后重试`)}finally{l.value=!1}}async function w(){try{await m.value?.validate()}catch{return}l.value=!0;try{await t.register({nickname:p.nickname.trim(),real_name:p.real_name.trim(),student_id:p.student_id.trim(),dorm:p.dorm.trim(),contact_type:p.contact_type,contact:p.contact.trim(),password:p.password,confirm_password:p.confirm_password}),o.success(`注册成功`),await n.replace(`/upload`)}catch(e){o.error(e instanceof H?e.message:`注册失败，请稍后重试`)}finally{l.value=!1}}return le(async()=>{try{let e=await fetch(`/hello`);u.value=e.ok}catch{u.value=!1}}),(e,t)=>(s(),G(`div`,Ft,[K(`div`,It,[K(`section`,Lt,[t[11]||=b(`<div class="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style="border-color:var(--accent-tint-border);background-color:var(--accent-tint);"><span class="size-1.5 rounded-full" style="background-color:var(--secondary);box-shadow:var(--glow-secondary);"></span><span class="tech-label text-ink-2">Campus print service</span></div><h1 class="max-w-md font-heading text-[44px] leading-[1.08] font-bold tracking-[-0.04em]"> 从文件到取件，<br><span style="color:var(--primary);">一张单</span>就够了。 </h1><p class="mt-5 max-w-sm text-[15px] leading-7 text-ink-3"> 上传文件、查看进度、凭取件码领取。打印流程清楚，等待也有回应。 </p>`,3),K(`div`,Rt,[(s(),G(M,null,S([`在线提交`,`进度可查`,`凭码取件`],e=>K(`div`,{key:e,class:`border-t pt-3`,style:{"border-color":`var(--border)`}},[K(`span`,zt,q(e),1)])),64))])]),K(`div`,Bt,[K(`div`,Vt,[K(`span`,Ht,[K(`span`,Ut,[i(N(Me),{size:18})]),t[12]||=K(`span`,{class:`flex flex-col leading-none`},[K(`span`,{class:`font-heading text-[15px] font-bold`},`宿舍打印`),K(`span`,{class:`tech-label mt-0.5 text-ink-4`},`Dorm Print`)],-1)]),i(Ne)]),K(`div`,Wt,[K(`div`,Gt,[K(`span`,{class:`tech-label inline-flex items-center gap-1.5 rounded-full px-2 py-1`,style:W({color:u.value===!1?`var(--err)`:`var(--secondary)`,backgroundColor:u.value===!1?`#f871711f`:`var(--role-user-bg)`})},[(s(),_(re(u.value===null?N(wt):u.value?N(je):N(Ct)),{size:12,class:E(u.value===null&&`animate-spin`)},null,8,[`class`])),a(` `+q(u.value===null?`正在连接`:u.value?`服务在线`:`服务不可达`),1)],4),t[13]||=K(`span`,{class:`tech-label ml-auto text-ink-4`},`v2`,-1)]),K(`h1`,Kt,q(c.value===`login`?`登录你的账号`:`注册新账号`),1),K(`p`,qt,q(c.value===`login`?`用姓名或昵称登录，提交文件后凭取件码取件。`:`注册后即可上传文件下单，取件码会随订单生成。`),1),i(N(_t),{value:c.value,"onUpdate:value":t[10]||=e=>c.value=e,type:`line`,animated:``},{default:h(()=>[i(N(lt),{name:`login`,tab:`登录`},{default:h(()=>[i(N(ot),{ref_key:`loginRef`,ref:f,model:d,rules:v,"label-placement":`top`,"show-require-mark":!1,onSubmit:I(C,[`prevent`])},{default:h(()=>[i(N(Z),{label:`姓名 / 昵称`,path:`identifier`},{default:h(()=>[i(N(Q),{value:d.identifier,"onUpdate:value":t[0]||=e=>d.identifier=e,placeholder:`请输入姓名或昵称`,autocomplete:`username`,"input-props":{autocapitalize:`off`,autocorrect:`off`}},null,8,[`value`])]),_:1}),i(N(Z),{label:`密码`,path:`password`},{default:h(()=>[i(N(Q),{value:d.password,"onUpdate:value":t[1]||=e=>d.password=e,type:`password`,"show-password-on":`click`,placeholder:`请输入密码`,autocomplete:`current-password`,onKeydown:z(C,[`enter`])},null,8,[`value`])]),_:1}),i(N(F),{type:`primary`,block:``,size:`large`,loading:l.value,class:`mt-1 !font-bold shadow-[var(--glow-primary)]`,onClick:C},{icon:h(()=>[i(N(St),{size:16})]),default:h(()=>[t[14]||=a(` 登录 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`model`])]),_:1}),i(N(lt),{name:`register`,tab:`注册`},{default:h(()=>[i(N(ot),{ref_key:`registerRef`,ref:m,model:p,rules:y.value,"label-placement":`top`,"show-require-mark":!1,onSubmit:I(w,[`prevent`])},{default:h(()=>[K(`div`,Jt,[i(N(Z),{label:`昵称`,path:`nickname`},{default:h(()=>[i(N(Q),{value:p.nickname,"onUpdate:value":t[2]||=e=>p.nickname=e,placeholder:`登录名，2-20 位`},null,8,[`value`])]),_:1}),i(N(Z),{label:`姓名`,path:`real_name`},{default:h(()=>[i(N(Q),{value:p.real_name,"onUpdate:value":t[3]||=e=>p.real_name=e,placeholder:`真实姓名`},null,8,[`value`])]),_:1}),i(N(Z),{label:`学号`,path:`student_id`},{default:h(()=>[i(N(Q),{value:p.student_id,"onUpdate:value":t[4]||=e=>p.student_id=e,placeholder:`4-20 位数字`},null,8,[`value`])]),_:1}),i(N(Z),{label:`宿舍位置`,path:`dorm`},{default:h(()=>[i(N(Q),{value:p.dorm,"onUpdate:value":t[5]||=e=>p.dorm=e,placeholder:`例：3 号楼 502`},null,8,[`value`])]),_:1})]),i(N(Z),{label:`联系方式`,path:`contact`},{default:h(()=>[K(`div`,Yt,[i(N(X),{value:p.contact_type,"onUpdate:value":t[6]||=e=>p.contact_type=e,options:N(g),class:`!w-[112px] shrink-0`,"consistent-menu-width":!1},null,8,[`value`,`options`]),i(N(Q),{value:p.contact,"onUpdate:value":t[7]||=e=>p.contact=e,placeholder:N(jt)[p.contact_type],class:`min-w-0 flex-1`},null,8,[`value`,`placeholder`])])]),_:1}),K(`p`,Xt,q(N(Nt)[p.contact_type]),1),K(`div`,Zt,[i(N(Z),{label:`密码`,path:`password`},{default:h(()=>[i(N(Q),{value:p.password,"onUpdate:value":t[8]||=e=>p.password=e,type:`password`,"show-password-on":`click`,placeholder:`8-64 位，含字母和数字`,autocomplete:`new-password`},null,8,[`value`])]),_:1}),i(N(Z),{label:`确认密码`,path:`confirm_password`},{default:h(()=>[i(N(Q),{value:p.confirm_password,"onUpdate:value":t[9]||=e=>p.confirm_password=e,type:`password`,"show-password-on":`click`,placeholder:`再输一次`,autocomplete:`new-password`,onKeydown:z(w,[`enter`])},null,8,[`value`])]),_:1})]),i(N(F),{type:`primary`,block:``,size:`large`,loading:l.value,class:`!font-bold shadow-[var(--glow-primary)]`,onClick:w},{default:h(()=>[...t[15]||=[a(` 注册并登录 `,-1)]]),_:1},8,[`loading`])]),_:1},8,[`model`,`rules`])]),_:1})]),_:1},8,[`value`])]),t[16]||=K(`p`,{class:`mt-4 text-center text-[11px] text-ink-4`},` 管理员账号由超管在后台开通，注册一律为普通用户。 `,-1)])])]))}});export{Qt as default};