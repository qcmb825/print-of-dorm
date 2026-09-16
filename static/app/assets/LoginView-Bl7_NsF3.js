import{$n as e,$t as t,Bn as n,Cn as r,Ct as i,Dn as a,E as o,En as s,Fn as c,Gn as l,Jn as u,Kt as d,L as f,N as p,Nn as m,On as h,Pn as g,R as _,Sn as v,Tn as y,Tt as b,Un as x,Wn as S,Xn as C,Zn as ee,Zt as w,_n as T,_r as E,_t as D,an as O,bn as k,br as A,bt as j,c as M,dn as te,dt as ne,en as N,er as re,ft as P,hn as ie,ht as F,in as ae,j as I,jn as L,kn as R,lr as z,lt as oe,mn as B,mr as V,mt as se,nn as H,pn as ce,rn as U,sr as le,u as ue,vr as de,xn as W,yr as G}from"./endpoints-Bo2NXLxK.js";import{_ as fe,a as pe,j as me}from"./fade-in-scale-up.cssr-OU0FjBQD.js";import{a as K,d as he,f as ge,o as q,p as _e}from"./Popover-D-j5JW7o.js";import{t as J}from"./Select-DBSnqo3r.js";import{n as ve,r as ye,t as Y}from"./FormItem-CPaJ-Rxp.js";import{t as X}from"./Input-7zU6OXzS.js";import{t as Z}from"./ChevronRight-DJ0B0Bz9.js";import{t as be}from"./Add-Bx1F9LbM.js";import{J as xe,R as Se,W as Ce,X as Q,_ as $,d as we,j as Te,p as Ee,t as De,u as Oe,y as ke}from"./index-DdbODeTB.js";import{t as Ae}from"./createLucideIcon-WrAfef2P.js";import{t as je}from"./circle-check-DxsbVpGW.js";import{n as Me,t as Ne}from"./ThemeToggle-BUM8EZK_.js";import{n as Pe}from"./types-rtNxLBzn.js";var Fe=/\s/;function Ie(e){for(var t=e.length;t--&&Fe.test(e.charAt(t)););return t}var Le=/^\s+/;function Re(e){return e&&e.slice(0,Ie(e)+1).replace(Le,``)}var ze=NaN,Be=/^[-+]0x[0-9a-f]+$/i,Ve=/^0b[01]+$/i,He=/^0o[0-7]+$/i,Ue=parseInt;function We(e){if(typeof e==`number`)return e;if(me(e))return ze;if(d(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=d(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=Re(e);var n=Ve.test(e);return n||He.test(e)?Ue(e.slice(2),n?2:8):Be.test(e)?ze:+e}var Ge=function(){return w.Date.now()},Ke=`Expected a function`,qe=Math.max,Je=Math.min;function Ye(e,t,n){var r,i,a,o,s,c,l=0,u=!1,f=!1,p=!0;if(typeof e!=`function`)throw TypeError(Ke);t=We(t)||0,d(n)&&(u=!!n.leading,f=`maxWait`in n,a=f?qe(We(n.maxWait)||0,t):a,p=`trailing`in n?!!n.trailing:p);function m(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function h(e){return l=e,s=setTimeout(v,t),u?m(e):o}function g(e){var n=e-c,r=e-l,i=t-n;return f?Je(i,a-r):i}function _(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||f&&r>=a}function v(){var e=Ge();if(_(e))return y(e);s=setTimeout(v,g(e))}function y(e){return s=void 0,p&&r?m(e):(r=i=void 0,o)}function b(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function x(){return s===void 0?o:y(Ge())}function S(){var e=Ge(),n=_(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return h(c);if(f)return clearTimeout(s),s=setTimeout(v,t),m(c)}return s===void 0&&(s=setTimeout(v,t)),o}return S.cancel=b,S.flush=x,S}var Xe=`Expected a function`;function Ze(e,t,n){var r=!0,i=!0;if(typeof e!=`function`)throw TypeError(Xe);return d(n)&&(r=`leading`in n?!!n.leading:r,i=`trailing`in n?!!n.trailing:i),Ye(e,t,{leading:r,maxWait:t,trailing:i})}var Qe=K(`.v-x-scroll`,{overflow:`auto`,scrollbarWidth:`none`},[K(`&::-webkit-scrollbar`,{width:0,height:0})]),$e=R({name:`XScroll`,props:{disabled:Boolean,onScroll:Function},setup(){let e=z(null);function t(e){e.currentTarget.offsetWidth<e.currentTarget.scrollWidth&&e.deltaY!==0&&(e.currentTarget.scrollLeft+=e.deltaY+e.deltaX,e.preventDefault())}let n=D();return Qe.mount({id:`vueuc/x-scroll`,head:!0,anchorMetaName:q,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...t){var n;(n=e.value)==null||n.scrollTo(...t)}})},render(){return L(`div`,{ref:`selfRef`,onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:`v-x-scroll`},this.$slots)}}),et=R({name:`ChevronLeft`,render(){return(()=>{let e=ne(`dfe229c2639b2082`);return e[0]||=v(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[v(`path`,{d:`M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z`,fill:`currentColor`})],-1)})()}}),tt=N(`form`,[U(`inline`,`
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `,[N(`form-item`,{width:`auto`,marginRight:`18px`},[t(`&:last-child`,{marginRight:0})])])]),nt=[`onSubmit`],rt={...f.props,inline:Boolean,labelWidth:[Number,String],labelAlign:String,labelPlacement:{type:String,default:`top`},model:{type:Object,default:()=>{}},rules:Object,disabled:Boolean,size:String,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:!0},onSubmit:{type:Function,default:e=>{e.preventDefault()}},showLabel:{type:Boolean,default:void 0},validateMessages:Object},it=()=>!0;function at(e){return e===void 0?{paths:null,shouldRuleBeApplied:it}:typeof e==`function`?{paths:null,shouldRuleBeApplied:e}:Array.isArray(e)?{paths:e,shouldRuleBeApplied:it}:e}var ot=R({name:`Form`,props:rt,setup(e){let{mergedClsPrefixRef:t}=j(e);f(`Form`,`-form`,tt,$,e,t);let n={},r=z(void 0),i=e=>{let t=r.value;(t===void 0||e>=t)&&(r.value=e)};function a(){for(let e of Q(n)){let t=n[e];for(let e of t)e.invalidateLabelWidth?.()}}async function o(e,t){let{paths:r,shouldRuleBeApplied:i}=at(t);return await new Promise((t,a)=>{let o=[];for(let e of Q(n)){if(r!==null&&!r.includes(e))continue;let t=n[e];for(let e of t)e.path&&o.push(e.internalValidate(null,i))}Promise.all(o).then(n=>{let r=n.some(e=>!e.valid),i=[],o=[];n.forEach(e=>{e.errors?.length&&i.push(e.errors),e.warnings?.length&&o.push(e.warnings)}),e&&e(i.length?i:void 0,{warnings:o.length?o:void 0}),r?a(i.length?i:void 0):t({warnings:o.length?o:void 0})})})}function s(){for(let e of Q(n)){let t=n[e];for(let e of t)e.restoreValidation()}}return S(ve,{props:e,maxChildLabelWidthRef:r,deriveMaxChildLabelWidth:i}),S(ye,{formItems:n}),Object.assign({validate:o,restoreValidation:s,invalidateLabelWidth:a},{mergedClsPrefix:t})},render(){let{mergedClsPrefix:e}=this;return x(),y(`form`,{class:P([`${e}-form`,this.inline&&`${e}-form--inline`]),onSubmit:this.onSubmit},[F(()=>this.$slots.default?.())],42,nt)}}),st=i(`n-tabs`),ct={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:`if`},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},lt=R({__TAB_PANE__:!0,name:`TabPane`,alias:[`TabPanel`],props:ct,slots:Object,setup(e){let t=m(st,null);return t||b(`tab-pane`,"`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return x(),y(`div`,{class:P([`${this.mergedClsPrefix}-tab-pane`,this.class]),style:G(this.style)},[F(()=>this.$slots.default?.())],6)}}),ut=[`data-name`,`data-disabled`],dt={internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean,...Te(ct,[`displayDirective`])},ft=R({__TAB__:!0,inheritAttrs:!1,name:`Tab`,props:dt,setup(e){let{mergedClsPrefixRef:t,valueRef:n,typeRef:r,closableRef:i,tabStyleRef:a,addTabStyleRef:o,tabClassRef:s,addTabClassRef:c,tabChangeIdRef:l,onBeforeLeaveRef:u,triggerRef:d,handleAdd:f,activateTab:p,handleClose:h}=m(st);return{trigger:d,mergedClosable:W(()=>{if(e.internalAddable)return!1;let{closable:t}=e;return t===void 0?i.value:t}),style:a,addStyle:o,tabClass:s,addTabClass:c,clsPrefix:t,value:n,type:r,handleClose(t){t.stopPropagation(),!e.disabled&&h(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){f();return}let{name:t}=e,r=++l.id;if(t!==n.value){let{value:i}=u;i?Promise.resolve(i(e.name,n.value)).then(e=>{e&&l.id===r&&p(t)}):p(t)}}}},render(){let{internalAddable:e,clsPrefix:t,name:n,disabled:i,label:a,tab:o,value:s,mergedClosable:c,trigger:l,$slots:{default:u}}=this,d=a??o;return x(),y(`div`,{class:P(`${t}-tabs-tab-wrapper`)},[this.internalLeftPadded?(x(),y(`div`,{key:0,class:P(`${t}-tabs-tab-pad`)},null,2)):F(()=>null),(x(),y(`div`,g({key:n,"data-name":n,"data-disabled":i?!0:void 0},g({class:[`${t}-tabs-tab`,s===n&&`${t}-tabs-tab--active`,i&&`${t}-tabs-tab--disabled`,c&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:l===`click`?this.activateTab:void 0,onMouseenter:l===`hover`?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),[v(`span`,{class:P(`${t}-tabs-tab__label`)},[e?(x(),y(T,{key:0},[v(`div`,{class:P(`${t}-tabs-tab__height-placeholder`)},`\xA0`,2),(x(),r(xe,{clsPrefix:t},{default:()=>(x(),r(be))},1032,[`clsPrefix`]))],64)):(x(),y(T,{key:1},[u?(x(),y(T,{key:0},[F(()=>u())],64)):(x(),y(T,{key:1},[typeof d==`object`?(x(),y(T,{key:0},[F(()=>d)],64)):(x(),y(T,{key:1},[F(()=>Se(d??n))],64))],64))],64))],2),c&&this.type===`card`?(x(),r(Ce,{key:0,clsPrefix:t,class:P(`${t}-tabs-tab__close`),onClick:this.handleClose,disabled:i},null,8,[`clsPrefix`,`class`,`onClick`,`disabled`])):F(()=>null)],16,ut))],2)}}),pt=N(`tabs`,`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[t(`&.transition-disabled`,[N(`tabs-tab`,`
 transition: none !important;
 `),N(`tabs-nav-scroll-content`,`
 transition: none !important;
 `),N(`tabs-tab-pad`,`
 transition: none !important;
 `)]),U(`segment-type`,[N(`tabs-rail`,[t(`&.transition-disabled`,[N(`tabs-capsule`,`
 transition: none;
 `)])])]),U(`top`,[N(`tab-pane`,`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),U(`left`,[N(`tab-pane`,`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),U(`left, right`,`
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
 `)]),U(`right`,`
 flex-direction: row-reverse;
 `,[N(`tab-pane`,`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),N(`tabs-bar`,`
 left: 0;
 `)]),U(`bottom`,`
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
 `,[U(`active`,`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),t(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])])]),U(`flex`,[N(`tabs-nav`,`
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
 `,[H(`prefix, suffix`,`
 display: flex;
 align-items: center;
 `),H(`prefix`,`padding-right: 16px;`),H(`suffix`,`padding-left: 16px;`)]),U(`top, bottom`,[t(`>`,[N(`tabs-nav`,[N(`tabs-nav-scroll-wrapper`,[t(`&::before`,`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),t(`&::after`,`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),U(`shadow-start`,[t(`&::before`,`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),U(`shadow-end`,[t(`&::after`,`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]),U(`left, right`,[N(`tabs-nav-scroll-content`,`
 flex-direction: column;
 `),t(`>`,[N(`tabs-nav`,[N(`tabs-nav-scroll-wrapper`,[t(`&::before`,`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),t(`&::after`,`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),U(`shadow-start`,[t(`&::before`,`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),U(`shadow-end`,[t(`&::after`,`
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
 `,[t(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `)]),t(`&::before, &::after`,`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `),t(`&.transition-disabled`,[t(`&::before, &::after`,`
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
 `,[U(`disabled`,{cursor:`not-allowed`}),H(`close`,`
 margin-inline-start: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),H(`label`,`
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
 `,[t(`&.transition-disabled`,`
 transition: none;
 `),U(`disabled`,`
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
 `,[t(`&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),t(`&.next-transition-leave-active, &.prev-transition-leave-active`,`
 position: absolute;
 `),t(`&.next-transition-enter-from, &.prev-transition-leave-to`,`
 transform: translateX(32px);
 opacity: 0;
 `),t(`&.next-transition-leave-to, &.prev-transition-enter-from`,`
 transform: translateX(-32px);
 opacity: 0;
 `),t(`&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to`,`
 transform: translateX(0);
 opacity: 1;
 `)]),N(`tabs-tab-pad`,`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),U(`line-type, bar-type`,[N(`tabs-tab`,`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[t(`&:hover`,{color:`var(--n-tab-text-color-hover)`}),U(`active`,`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),U(`disabled`,{color:`var(--n-tab-text-color-disabled)`})])]),N(`tabs-nav`,[H(`prefix, suffix`,`
 border-color: var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-color: var(--n-tab-border-color);
 `),U(`line-type`,[U(`top`,[H(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),N(`tabs-bar`,`
 bottom: -1px;
 `)]),U(`left`,[H(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),N(`tabs-bar`,`
 right: -1px;
 `)]),U(`right`,[H(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),N(`tabs-bar`,`
 left: -1px;
 `)]),U(`bottom`,[H(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),N(`tabs-nav-scroll-content`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),N(`tabs-bar`,`
 top: -1px;
 `)]),H(`prefix, suffix`,`
 transition: border-color .3s var(--n-bezier);
 `),N(`tabs-nav-scroll-content`,`
 transition: border-color .3s var(--n-bezier);
 `),N(`tabs-bar`,`
 border-radius: 0;
 `)]),U(`card-type`,[H(`prefix, suffix`,`
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
 `,[U(`addable`,`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[H(`height-placeholder`,`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),ae(`disabled`,[t(`&:hover`,`
 color: var(--n-tab-text-color-hover);
 `)])]),U(`closable`,`padding-inline-end: 8px;`),U(`active`,`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),U(`disabled`,`color: var(--n-tab-text-color-disabled);`)])]),U(`left, right`,`
 flex-direction: column; 
 `,[H(`prefix, suffix`,`
 padding: var(--n-tab-padding-vertical);
 `),N(`tabs-wrapper`,`
 flex-direction: column;
 `),N(`tabs-tab-wrapper`,`
 flex-direction: column;
 `,[N(`tabs-tab-pad`,`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),U(`top`,[U(`card-type`,[N(`tabs-scroll-padding`,`border-bottom: 1px solid var(--n-tab-border-color);`),H(`prefix, suffix`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),N(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[U(`active`,`
 border-bottom: 1px solid #0000;
 `)]),N(`tabs-tab-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),N(`tabs-pad`,`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),U(`left`,[U(`card-type`,[N(`tabs-scroll-padding`,`border-right: 1px solid var(--n-tab-border-color);`),H(`prefix, suffix`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),N(`tabs-tab`,`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[U(`active`,`
 border-right: 1px solid #0000;
 `)]),N(`tabs-tab-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `),N(`tabs-pad`,`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),U(`right`,[U(`card-type`,[N(`tabs-scroll-padding`,`border-left: 1px solid var(--n-tab-border-color);`),H(`prefix, suffix`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),N(`tabs-tab`,`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[U(`active`,`
 border-left: 1px solid #0000;
 `)]),N(`tabs-tab-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `),N(`tabs-pad`,`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),U(`bottom`,[U(`card-type`,[N(`tabs-scroll-padding`,`border-top: 1px solid var(--n-tab-border-color);`),H(`prefix, suffix`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),N(`tabs-tab`,`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[U(`active`,`
 border-top: 1px solid #0000;
 `)]),N(`tabs-tab-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `),N(`tabs-pad`,`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])]),N(`tabs-scroll-button`,[U(`start`,`
 padding-left: 10px;
 padding-right: 6px;
 `),U(`end`,`
 padding-right: 10px;
 padding-left: 6px;
 `),U(`up`,`
 padding-bottom: 10px;
 `),U(`down`,`
 padding-top: 10px;
 `)])]),mt=R({name:`TabsButton`,props:{type:{type:String,default:`next`},mergedClsPrefix:{type:String,required:!0},vertical:Boolean,disabled:Boolean,rtl:Boolean,theme:Object,themeOverrides:Object,onClick:Function},setup(e){return{handleClick:()=>{e.disabled||e.onClick?.(e.type)}}},render(){let{mergedClsPrefix:e,disabled:t,type:n,vertical:i,rtl:a,theme:o,themeOverrides:s,handleClick:c}=this,l=n===`next`,u=i?l:a?!l:l;return x(),r(ue,{text:!0,disabled:t,size:`small`,theme:o,themeOverrides:s,onClick:c,class:P([`${e}-tabs-scroll-button`,!i&&n===`prev`&&`${e}-tabs-scroll-button--start`,!i&&n===`next`&&`${e}-tabs-scroll-button--end`,i&&n===`prev`&&`${e}-tabs-scroll-button--up`,i&&n===`next`&&`${e}-tabs-scroll-button--down`])},{icon:()=>(x(),r(xe,{clsPrefix:e,style:G(i?{transform:`rotate(90deg)`}:void 0)},{default:()=>u?(x(),r(Z,{key:1})):(x(),r(et,{key:2}))},1032,[`clsPrefix`,`style`]))},1032,[`disabled`,`theme`,`themeOverrides`,`onClick`,`class`])}}),ht=Ze,gt={...f.props,value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:`click`},type:{type:String,default:`bar`},closable:Boolean,justifyContent:String,size:String,placement:{type:String,default:`top`},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array],showScrollButton:Boolean,centerActiveTab:Boolean},_t=R({name:`Tabs`,props:gt,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a,mergedRtlRef:s}=j(e),l=o(`Tabs`,s,r),u=W(()=>{let{placement:t}=e;return t===`start`?l?.value?`right`:`left`:t===`end`?l?.value?`left`:`right`:t}),d=f(`Tabs`,`-tabs`,pt,Ee,e,r),m=z(null),h=z(null),g=z(null),v=z(null),y=z(null),b=z(null),x=z(null),w=z(!0),T=z(!0),E=he(e,[`labelSize`,`size`]),D=W(()=>E.value?E.value:a?.value?.Tabs?.size||`medium`),k=he(e,[`activeName`,`value`]),A=z(k.value??e.defaultValue??(t.default?fe(t.default())[0]?.props?.name:null)),M=ge(k,A),te={id:0},ne=W(()=>{if(e.justifyContent&&e.type!==`card`)return{display:`flex`,justifyContent:e.justifyContent}});C(M,()=>{te.id=0,F(),c(()=>{I()})});function N(){let{value:e}=M;return e===null?null:m.value?.querySelector(`[data-name="${e}"]`)}function re(t){if(e.type===`card`)return;let{value:n}=g;if(!n)return;let i=n.style.opacity===`0`;if(t){let a=`${r.value}-tabs-bar--disabled`,{barWidth:o}=e,s=u.value;if(t.dataset.disabled===`true`?n.classList.add(a):n.classList.remove(a),[`top`,`bottom`].includes(s)){if(ie([`top`,`maxHeight`,`height`]),typeof o==`number`&&t.offsetWidth>=o){let e=Math.floor((t.offsetWidth-o)/2)+t.offsetLeft;n.style.left=`${e}px`,n.style.maxWidth=`${o}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width=`8192px`,i&&(n.style.transition=`none`),n.offsetWidth,i&&(n.style.transition=``,n.style.opacity=`1`)}else{if(ie([`left`,`maxWidth`,`width`]),typeof o==`number`&&t.offsetHeight>=o){let e=Math.floor((t.offsetHeight-o)/2)+t.offsetTop;n.style.top=`${e}px`,n.style.maxHeight=`${o}px`}else n.style.top=`${t.offsetTop}px`,n.style.maxHeight=`${t.offsetHeight}px`;n.style.height=`8192px`,i&&(n.style.transition=`none`),n.offsetHeight,i&&(n.style.transition=``,n.style.opacity=`1`)}}}function P(){if(e.type===`card`)return;let{value:t}=g;t&&(t.style.opacity=`0`)}function ie(e){let{value:t}=g;if(t)for(let n of e)t.style[n]=``}function F(){if(e.type===`card`)return;let t=N();t?re(t):P()}function ae(e,t,n,r){let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),o=n?`left`:`top`,s=n?`right`:`bottom`,c=0;r?c=(a[o]+a[s])/2-(i[o]+i[s])/2:a[o]<i[o]?c=a[o]-i[o]:a[s]>i[s]&&(c=a[s]-i[s]),c!==0&&e.scrollBy({[o]:c,behavior:`smooth`})}function I(){let t=[`top`,`bottom`].includes(u.value),n=N();if(n){if(t){let r=b.value?.$el;if(!r)return;ae(r,n,t,e.centerActiveTab)}else{let{value:r}=x;if(!r)return;ae(r,n,t,e.centerActiveTab)}}}let L=z(null),R=0,B=null;function se(e){let t=L.value;if(t){R=e.getBoundingClientRect().height;let n=`${R}px`,r=()=>{t.style.height=n,t.style.maxHeight=n};B?(r(),B(),B=null):B=r}}function H(e){let t=L.value;if(t){let n=e.getBoundingClientRect().height,r=()=>{document.body.offsetHeight,t.style.maxHeight=`${n}px`,t.style.height=`${Math.max(R,n)}px`};B?(B(),B=null,r()):B=r}}function ce(){let t=L.value;if(t){t.style.maxHeight=``,t.style.height=``;let{paneWrapperStyle:n}=e;if(typeof n==`string`)t.style.cssText=n;else if(n){let{maxHeight:e,height:r}=n;e!==void 0&&(t.style.maxHeight=e),r!==void 0&&(t.style.height=r)}}}let U={value:[]},le=z(`next`);function ue(e){let t=M.value,n=`next`;for(let r of U.value){if(r===t)break;if(r===e){n=`prev`;break}}le.value=n,de(e)}function de(t){let{onActiveNameChange:n,onUpdateValue:r,"onUpdate:value":i}=e;n&&p(n,t),r&&p(r,t),i&&p(i,t),A.value=t}function G(t){let{onClose:n}=e;n&&p(n,t)}function pe(e){if([`top`,`bottom`].includes(u.value)){let{value:t}=b;if(!t)return;let n=t.$el;if(!n)return;let r=n.offsetWidth,i=!!l?.value,a=e===`next`?r:-r;n.scrollBy({left:i?-a:a,behavior:`smooth`})}else{let{value:t}=x;if(!t)return;let n=t.offsetHeight,r=e===`next`?t.scrollTop+n:t.scrollTop-n;t.scrollTo({top:r,left:0,behavior:`smooth`})}}let me=!0;function K(){let{value:e}=g;if(!e)return;me&&=!1;let t=`transition-disabled`;e.classList.add(t),F(),e.classList.remove(t)}let q=z(null);function J({transitionDisabled:e}){let t=m.value;if(!t)return;e&&t.classList.add(`transition-disabled`);let n=N();n&&q.value&&(q.value.style.width=`${n.offsetWidth}px`,q.value.style.height=`${n.offsetHeight}px`,q.value.style.transform=`translate(${n.offsetLeft}px, ${n.offsetTop}px)`,e&&q.value.offsetWidth),e&&t.classList.remove(`transition-disabled`)}C([M],()=>{e.type===`segment`&&c(()=>{J({transitionDisabled:!1})})}),n(()=>{e.type===`segment`&&J({transitionDisabled:!0})});let ve=0;function ye(t){if(t.contentRect.width===0&&t.contentRect.height===0||ve===t.contentRect.width)return;ve=t.contentRect.width;let{type:n}=e;(n===`line`||n===`bar`)&&(me||e.justifyContent?.startsWith(`space`))&&K(),n!==`segment`&&$(Q())}let Y=ht(ye,64);function X(){let{type:t}=e;t===`line`||t===`bar`?K():t===`segment`&&J({transitionDisabled:!0})}C([()=>e.justifyContent,()=>e.size],()=>{c(()=>{(e.type===`line`||e.type===`bar`)&&K()})}),C([u,()=>l?.value],()=>{c(()=>{X(),$(Q(),{instantly:!0})})}),C(()=>e.type,()=>{c(()=>{let e=h.value;e&&(e.classList.add(`transition-disabled`),X(),e.offsetWidth,e.classList.remove(`transition-disabled`))})});let Z=z(!1);function be(e){let{target:t,contentRect:{width:n,height:r}}=e,i=t.parentElement.parentElement.offsetWidth,a=t.parentElement.parentElement.offsetHeight,o=u.value;if(!Z.value)o===`top`||o===`bottom`?i<n&&(Z.value=!0):a<r&&(Z.value=!0);else{let{value:e}=y;if(!e)return;o===`top`||o===`bottom`?i-n>e.$el.offsetWidth&&(Z.value=!1):a-r>e.$el.offsetHeight&&(Z.value=!1)}$(b.value?.$el||null)}let xe=ht(be,64);function Se(){let{onAdd:t}=e;t&&t()}let Ce=z(!1);function Q(){let e=u.value;return(e===`top`||e===`bottom`?b.value?.$el:x.value)||null}function $(e,t={instantly:!1}){if(!e)return;let n=t.instantly?v.value:null;n&&n.classList.add(`transition-disabled`);let r=u.value;if(r===`top`||r===`bottom`){let{scrollLeft:t,scrollWidth:n,offsetWidth:r}=e,i=Math.abs(t);w.value=i<=1,T.value=i+r>=n-1,Ce.value=r<n-1}else{let{scrollTop:t,scrollHeight:n,offsetHeight:r}=e;w.value=t<=1,T.value=t+r>=n-1,Ce.value=r<n-1}n&&(n.offsetWidth,n.classList.remove(`transition-disabled`))}let we=ht(e=>{$(e.target)},64);S(st,{triggerRef:V(e,`trigger`),tabStyleRef:V(e,`tabStyle`),tabClassRef:V(e,`tabClass`),addTabStyleRef:V(e,`addTabStyle`),addTabClassRef:V(e,`addTabClass`),paneClassRef:V(e,`paneClass`),paneStyleRef:V(e,`paneStyle`),mergedClsPrefixRef:r,typeRef:V(e,`type`),closableRef:V(e,`closable`),valueRef:M,tabChangeIdRef:te,onBeforeLeaveRef:V(e,`onBeforeLeave`),activateTab:ue,handleClose:G,handleAdd:Se}),_e(()=>{F(),I()}),ee(()=>{let{value:e}=v;if(!e)return;let{value:t}=r,n=`${t}-tabs-nav-scroll-wrapper--shadow-start`,i=`${t}-tabs-nav-scroll-wrapper--shadow-end`;w.value?e.classList.remove(n):e.classList.add(n),T.value?e.classList.remove(i):e.classList.add(i)});let Te={syncBarPosition:()=>{F()},scrollToCurrentTab:()=>{I()}},De=()=>{J({transitionDisabled:!0})},Oe=W(()=>{let{value:t}=D,{type:n}=e,r=`${t}${{card:`Card`,bar:`Bar`,line:`Line`,segment:`Segment`}[n]}`,{self:{barColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,tabColor:c,tabBorderColor:l,paneTextColor:u,tabFontWeight:f,tabBorderRadius:p,tabFontWeightActive:m,colorSegment:h,fontWeightStrong:g,tabColorSegment:_,closeSize:v,closeIconSize:y,closeColorHover:b,closeColorPressed:x,closeBorderRadius:S,[O(`panePadding`,t)]:C,[O(`tabPadding`,r)]:ee,[O(`tabPaddingVertical`,r)]:w,[O(`tabGap`,r)]:T,[O(`tabGap`,`${r}Vertical`)]:E,[O(`tabTextColor`,n)]:k,[O(`tabTextColorActive`,n)]:A,[O(`tabTextColorHover`,n)]:j,[O(`tabTextColorDisabled`,n)]:M,[O(`tabFontSize`,t)]:te},common:{cubicBezierEaseInOut:ne}}=d.value;return{"--n-bezier":ne,"--n-color-segment":h,"--n-bar-color":i,"--n-tab-font-size":te,"--n-tab-text-color":k,"--n-tab-text-color-active":A,"--n-tab-text-color-disabled":M,"--n-tab-text-color-hover":j,"--n-pane-text-color":u,"--n-tab-border-color":l,"--n-tab-border-radius":p,"--n-close-size":v,"--n-close-icon-size":y,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-border-radius":S,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-tab-color":c,"--n-tab-font-weight":f,"--n-tab-font-weight-active":m,"--n-tab-padding":ee,"--n-tab-padding-vertical":w,"--n-tab-gap":T,"--n-tab-gap-vertical":E,"--n-pane-padding-left":oe(C,`left`),"--n-pane-padding-right":oe(C,`right`),"--n-pane-padding-top":oe(C,`top`),"--n-pane-padding-bottom":oe(C,`bottom`),"--n-font-weight-strong":g,"--n-tab-color-segment":_}}),ke=i?_(`tabs`,W(()=>`${D.value[0]}${e.type[0]}`),Oe,e):void 0;return{mergedClsPrefix:r,mergedValue:M,renderedNames:new Set,segmentCapsuleElRef:q,tabsPaneWrapperRef:L,tabsElRef:m,selfElRef:h,barElRef:g,addTabInstRef:y,xScrollInstRef:b,scrollWrapperElRef:v,addTabFixed:Z,tabWrapperStyle:ne,handleNavResize:Y,mergedSize:D,handleScroll:we,handleTabsResize:xe,cssVars:i?void 0:Oe,themeClass:ke?.themeClass,animationDirection:le,renderNameListRef:U,yScrollElRef:x,handleSegmentResize:De,onAnimationBeforeLeave:se,onAnimationEnter:H,onAnimationAfterEnter:ce,onRender:ke?.onRender,startReachedRef:w,endReachedRef:T,isOverflow:Ce,handleButtonClick:pe,mergedTheme:d,rtlEnabled:l,mergedPlacement:u,...Te}},render(){let{mergedClsPrefix:e,type:t,mergedPlacement:n,addTabFixed:i,addable:a,mergedSize:o,renderNameListRef:s,onRender:c,paneWrapperClass:l,paneWrapperStyle:u,startReachedRef:d,endReachedRef:f,isOverflow:p,showScrollButton:m,handleButtonClick:h,mergedTheme:_,rtlEnabled:b,$slots:{default:S,prefix:C,suffix:ee}}=this;c?.();let w=S?fe(S()).filter(e=>e.type.__TAB_PANE__===!0):[],E=S?fe(S()).filter(e=>e.type.__TAB__===!0):[],D=!E.length,O=t===`card`,k=t===`segment`,A=!O&&!k&&this.justifyContent;s.value=[];let j=()=>{let t=(x(),y(`div`,{style:G(this.tabWrapperStyle),class:P(`${e}-tabs-wrapper`)},[A?F(()=>null):(x(),y(`div`,{key:1,class:P(`${e}-tabs-scroll-padding`),style:G(n===`top`||n===`bottom`?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`})},null,6)),D?(x(),y(T,{key:2},[F(()=>w.map((e,t)=>(s.value.push(e.props.name),xt((x(),r(ft,g(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0&&(!A||A===`center`||A===`start`||A===`end`)}),se(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))))],64)):(x(),y(T,{key:3},[F(()=>E.map((e,t)=>(s.value.push(e.props.name),xt(t!==0&&!A?bt(e):e))))],64)),!i&&a&&O?(x(),y(T,{key:4},[F(()=>yt(a,(D?w.length:E.length)!==0))],64)):F(()=>null),A?F(()=>null):(x(),y(`div`,{key:7,class:P(`${e}-tabs-scroll-padding`),style:G({width:`${this.tabsPadding}px`})},null,6)),O?F(()=>null):(x(),y(`div`,{key:9,ref:`barElRef`,class:P(`${e}-tabs-bar`)},null,2))],6));return x(),y(`div`,{ref:`tabsElRef`,class:P(`${e}-tabs-nav-scroll-content`)},[O&&a?(x(),r(pe,{key:0,onResize:this.handleTabsResize},{default:()=>t},1032,[`onResize`])):(x(),y(T,{key:1},[F(()=>t)],64)),O?(x(),y(`div`,{key:2,class:P(`${e}-tabs-pad`)},null,2)):F(()=>null)],2)},M=k?`top`:n;return x(),y(`div`,{ref:`selfElRef`,class:P([`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${o}-size`,A&&`${e}-tabs--flex`,`${e}-tabs--${M}`,b&&`${e}-tabs--rtl`]),style:G(this.cssVars)},[v(`div`,{class:P([`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav--${M}`,`${e}-tabs-nav`])},[F(()=>I(C,t=>t&&(x(),y(`div`,{class:P(`${e}-tabs-nav__prefix`)},[F(()=>t)],2)))),k?(x(),r(pe,{key:0,onResize:this.handleSegmentResize},{default:()=>(x(),y(`div`,{class:P(`${e}-tabs-rail`),ref:`tabsElRef`},[v(`div`,{class:P(`${e}-tabs-capsule`),ref:`segmentCapsuleElRef`},[v(`div`,{class:P(`${e}-tabs-wrapper`)},[v(`div`,{class:P(`${e}-tabs-tab`)},null,2)],2)],2),D?(x(),y(T,{key:0},[F(()=>w.map((e,t)=>(s.value.push(e.props.name),x(),r(ft,g(e.props,{internalCreatedByPane:!0,internalLeftPadded:t!==0}),se(e.children?{default:e.children.tab}:void 0),1040,[`internalLeftPadded`]))))],64)):(x(),y(T,{key:1},[F(()=>E.map((e,t)=>(s.value.push(e.props.name),t===0?e:bt(e))))],64))],2))},1032,[`onResize`])):(x(),y(T,{key:1},[F(()=>m&&p&&(x(),r(mt,{mergedClsPrefix:e,type:`prev`,vertical:M===`left`||M===`right`,disabled:d,rtl:!!b,theme:_.peers.Button,themeOverrides:_.peerOverrides.Button,onClick:h},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`]))),(x(),r(pe,{onResize:this.handleNavResize},{default:()=>(x(),y(`div`,{class:P(`${e}-tabs-nav-scroll-wrapper`),ref:`scrollWrapperElRef`},[[`top`,`bottom`].includes(M)?(x(),r($e,{key:0,ref:`xScrollInstRef`,onScroll:this.handleScroll},{default:j},1032,[`onScroll`])):(x(),y(`div`,{key:1,class:P(`${e}-tabs-nav-y-scroll`),onScroll:this.handleScroll,ref:`yScrollElRef`},[F(()=>j())],42,[`onScroll`]))],2))},1032,[`onResize`])),F(()=>m&&p&&(x(),r(mt,{mergedClsPrefix:e,type:`next`,vertical:M===`left`||M===`right`,disabled:f,rtl:!!b,theme:_.peers.Button,themeOverrides:_.peerOverrides.Button,onClick:h},null,8,[`mergedClsPrefix`,`vertical`,`disabled`,`rtl`,`theme`,`themeOverrides`,`onClick`])))],64)),i&&a&&O?(x(),y(T,{key:2},[F(()=>yt(a,!0))],64)):F(()=>null),F(()=>I(ee,t=>t&&(x(),y(`div`,{class:P(`${e}-tabs-nav__suffix`)},[F(()=>t)],2))))],2),F(()=>D&&(this.animated&&(M===`top`||M===`bottom`)?(x(),y(`div`,{key:1,ref:`tabsPaneWrapperRef`,style:G(u),class:P([`${e}-tabs-pane-wrapper`,l])},[F(()=>vt(w,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection))],6)):vt(w,this.mergedValue,this.renderedNames)))],6)}});function vt(e,t,n,i,a,o,s){let c=[];return e.forEach(e=>{let{name:r,displayDirective:i,"display-directive":a}=e.props,o=e=>i===e||a===e,s=t===r;if(e.key!==void 0&&(e.key=r),s||o(`show`)||o(`show:lazy`)&&n.has(r)){n.has(r)||n.add(r);let t=!o(`if`);c.push(t?re(e,[[ce,s]]):e)}}),s?(x(),r(te,{name:`${s}-transition`,onBeforeLeave:i,onEnter:a,onAfterEnter:o},{default:()=>c},1032,[`name`,`onBeforeLeave`,`onEnter`,`onAfterEnter`])):c}function yt(e,t){return x(),r(ft,{ref:`addTabInstRef`,key:`__addable`,name:`__addable`,internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e==`object`&&e.disabled},null,8,[`internalLeftPadded`,`disabled`])}function bt(e){let t=k(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function xt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes(`internalLeftPadded`)||e.dynamicProps.push(`internalLeftPadded`):e.dynamicProps=[`internalLeftPadded`],e}var St=Ae({name:`arrow-right`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]}),Ct=Ae({name:`circle-alert`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`]}),wt=Ae({name:`loader-circle`,size:24,node:[[`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`,key:`13zald`}]],aliases:[`loader-2`]}),Tt=/^[0-9A-Za-z_\u4e00-\u9fa5]{2,20}$/,Et=/^[\u4e00-\u9fa5A-Za-z·]{2,20}$/,Dt=/^\d{4,20}$/,Ot=/^[A-Za-z][A-Za-z0-9_-]{4,19}$/,kt=/^[1-9]\d{4,11}$/,At=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,jt={wechat:`5-20 位，字母开头，可含数字、_ 和 -`,qq:`5-12 位数字，不能以 0 开头`,email:`例：name@example.com`};function Mt(e,t){return e===`wechat`?Ot.test(t):e===`qq`?kt.test(t):At.test(t)}var Nt={wechat:`微信号需为 5-20 位、以字母开头（可含字母、数字、_ 和 -）`,qq:`QQ 号需为 5-12 位数字，且不能以 0 开头`,email:`邮箱格式不正确，例：name@example.com`};function Pt(e){return e.length<8||e.length>64?`密码长度需为 8-64 位`:!/[A-Za-z]/.test(e)||!/\d/.test(e)?`密码需同时包含字母和数字`:null}var Ft={class:`login-shell grid min-h-full place-items-center overflow-hidden px-4 py-8 sm:px-6`},It={class:`relative grid w-full max-w-[960px] items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-16`},Lt={class:`hidden lg:block`},Rt={class:`mt-8 grid max-w-md grid-cols-3 gap-3`},zt={class:`tech-label text-ink-2`},Bt={class:`w-full`},Vt={class:`mb-5 flex items-center justify-between`},Ht={class:`flex items-center gap-2.5`},Ut={class:`grid size-9 place-items-center rounded-[10px] border`,style:{"background-color":`var(--accent-tint-soft)`,"border-color":`var(--accent-tint-border)`,color:`var(--primary)`},"aria-hidden":`true`},Wt={class:`panel login-card p-5 sm:p-6`},Gt={class:`mb-4 flex items-center gap-2`},Kt={class:`font-heading text-[26px] leading-tight font-bold`},qt={class:`mt-1.5 mb-5 text-[13px] text-ink-3`},Jt={class:`grid gap-x-3 sm:grid-cols-2`},Yt={class:`flex w-full gap-2`},Xt={class:`-mt-3 mb-3 text-[11px] text-ink-4`},Zt={class:`grid gap-x-3 sm:grid-cols-2`},Qt=R({__name:`LoginView`,setup(t){let i=De(),o=we(),c=Oe(),d=ke(),f=z(`login`),p=z(!1),m=z(null),g=le({identifier:``,password:``}),_=z(null),b=le({nickname:``,real_name:``,student_id:``,dorm:``,contact_type:`wechat`,contact:``,password:``,confirm_password:``}),S=z(null),C=Object.keys(Pe).map(e=>({label:Pe[e],value:e})),ee={identifier:[{required:!0,message:`请输入姓名或昵称`,trigger:[`blur`,`input`]}],password:[{required:!0,message:`请输入密码`,trigger:[`blur`,`input`]}]},w=W(()=>({nickname:[{required:!0,message:`请输入昵称`,trigger:[`blur`,`input`]},{validator:(e,t)=>Tt.test(t),message:`昵称需为 2-20 位中文、字母、数字或下划线`,trigger:[`blur`,`input`]}],real_name:[{required:!0,message:`请输入姓名`,trigger:[`blur`,`input`]},{validator:(e,t)=>Et.test(t),message:`姓名需为 2-20 位中文或字母`,trigger:[`blur`,`input`]}],student_id:[{required:!0,message:`请输入学号`,trigger:[`blur`,`input`]},{validator:(e,t)=>Dt.test(t),message:`学号需为 4-20 位数字`,trigger:[`blur`,`input`]}],dorm:[{required:!0,message:`请填写宿舍位置`,trigger:[`blur`,`input`]},{validator:(e,t)=>t.trim().length>=2&&t.trim().length<=50,message:`宿舍位置需为 2-50 个字符（写到门牌号）`,trigger:[`blur`,`input`]}],contact:[{required:!0,message:`请填写联系方式`,trigger:[`blur`,`input`]},{validator:(e,t)=>t.length<=50&&Mt(b.contact_type,t),message:`联系方式格式不正确`,trigger:[`blur`,`input`]}],password:[{required:!0,message:`请输入密码`,trigger:[`blur`,`input`]},{validator:(e,t)=>Pt(t)===null,message:`密码需 8-64 位且同时包含字母和数字`,trigger:[`blur`,`input`]},{validator:(e,t)=>t!==b.nickname&&t!==b.student_id,message:`密码不能与昵称或学号相同`,trigger:[`blur`,`input`]}],confirm_password:[{required:!0,message:`请再次输入密码`,trigger:[`blur`,`input`]},{validator:(e,t)=>t===b.password,message:`两次输入的密码不一致`,trigger:[`blur`,`input`]}]}));function D(){let e=c.query.redirect;return typeof e==`string`&&e.startsWith(`/`)&&e.startsWith(`/staff`)===i.isStaff?e:i.isStaff?`/staff/orders`:`/upload`}async function O(){try{await _.value?.validate()}catch{return}p.value=!0;try{await i.login(g.identifier.trim(),g.password),d.success(`登录成功`),await o.replace(D())}catch(e){d.error(e instanceof M?e.message:`登录失败，请稍后重试`)}finally{p.value=!1}}async function k(){try{await S.value?.validate()}catch{return}p.value=!0;try{await i.register({nickname:b.nickname.trim(),real_name:b.real_name.trim(),student_id:b.student_id.trim(),dorm:b.dorm.trim(),contact_type:b.contact_type,contact:b.contact.trim(),password:b.password,confirm_password:b.confirm_password}),d.success(`注册成功`),await o.replace(`/upload`)}catch(e){d.error(e instanceof M?e.message:`注册失败，请稍后重试`)}finally{p.value=!1}}return n(async()=>{try{let e=await fetch(`/hello`);m.value=e.ok}catch{m.value=!1}}),(t,n)=>(x(),y(`div`,Ft,[v(`div`,It,[v(`section`,Lt,[n[11]||=s(`<div class="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style="border-color:var(--accent-tint-border);background-color:var(--accent-tint);"><span class="size-1.5 rounded-full" style="background-color:var(--secondary);box-shadow:var(--glow-secondary);"></span><span class="tech-label text-ink-2">Campus print service</span></div><h1 class="max-w-md font-heading text-[44px] leading-[1.08] font-bold tracking-[-0.04em]"> 从文件到取件，<br><span style="color:var(--primary);">一张单</span>就够了。 </h1><p class="mt-5 max-w-sm text-[15px] leading-7 text-ink-3"> 上传文件、查看进度、凭取件码领取。打印流程清楚，等待也有回应。 </p>`,3),v(`div`,Rt,[(x(),y(T,null,l([`在线提交`,`进度可查`,`凭码取件`],e=>v(`div`,{key:e,class:`border-t pt-3`,style:{"border-color":`var(--border)`}},[v(`span`,zt,A(e),1)])),64))])]),v(`div`,Bt,[v(`div`,Vt,[v(`span`,Ht,[v(`span`,Ut,[h(E(Me),{size:18})]),n[12]||=v(`span`,{class:`flex flex-col leading-none`},[v(`span`,{class:`font-heading text-[15px] font-bold`},`小猫娘打印服务`),v(`span`,{class:`tech-label mt-0.5 text-ink-4`},`Neko Print`)],-1)]),h(Ne)]),v(`div`,Wt,[v(`div`,Gt,[v(`span`,{class:`tech-label inline-flex items-center gap-1.5 rounded-full px-2 py-1`,style:G({color:m.value===!1?`var(--err)`:`var(--secondary)`,backgroundColor:m.value===!1?`#f871711f`:`var(--role-user-bg)`})},[(x(),r(u(m.value===null?E(wt):m.value?E(je):E(Ct)),{size:12,class:de(m.value===null&&`animate-spin`)},null,8,[`class`])),a(` `+A(m.value===null?`正在连接`:m.value?`服务在线`:`服务不可达`),1)],4),n[13]||=v(`span`,{class:`tech-label ml-auto text-ink-4`},`v2`,-1)]),v(`h1`,Kt,A(f.value===`login`?`登录你的账号`:`注册新账号`),1),v(`p`,qt,A(f.value===`login`?`用姓名或昵称登录，提交文件后凭取件码取件。`:`注册后即可上传文件下单，取件码会随订单生成。`),1),h(E(_t),{value:f.value,"onUpdate:value":n[10]||=e=>f.value=e,type:`line`,animated:``},{default:e(()=>[h(E(lt),{name:`login`,tab:`登录`},{default:e(()=>[h(E(ot),{ref_key:`loginRef`,ref:_,model:g,rules:ee,"label-placement":`top`,"show-require-mark":!1,onSubmit:ie(O,[`prevent`])},{default:e(()=>[h(E(Y),{label:`姓名 / 昵称`,path:`identifier`},{default:e(()=>[h(E(X),{value:g.identifier,"onUpdate:value":n[0]||=e=>g.identifier=e,placeholder:`请输入姓名或昵称`,autocomplete:`username`,"input-props":{autocapitalize:`off`,autocorrect:`off`}},null,8,[`value`])]),_:1}),h(E(Y),{label:`密码`,path:`password`},{default:e(()=>[h(E(X),{value:g.password,"onUpdate:value":n[1]||=e=>g.password=e,type:`password`,"show-password-on":`click`,placeholder:`请输入密码`,autocomplete:`current-password`,onKeydown:B(O,[`enter`])},null,8,[`value`])]),_:1}),h(E(ue),{type:`primary`,block:``,size:`large`,loading:p.value,class:`mt-1 !font-bold shadow-[var(--glow-primary)]`,onClick:O},{icon:e(()=>[h(E(St),{size:16})]),default:e(()=>[n[14]||=a(` 登录 `,-1)]),_:1},8,[`loading`])]),_:1},8,[`model`])]),_:1}),h(E(lt),{name:`register`,tab:`注册`},{default:e(()=>[h(E(ot),{ref_key:`registerRef`,ref:S,model:b,rules:w.value,"label-placement":`top`,"show-require-mark":!1,onSubmit:ie(k,[`prevent`])},{default:e(()=>[v(`div`,Jt,[h(E(Y),{label:`昵称`,path:`nickname`},{default:e(()=>[h(E(X),{value:b.nickname,"onUpdate:value":n[2]||=e=>b.nickname=e,placeholder:`登录名，2-20 位`},null,8,[`value`])]),_:1}),h(E(Y),{label:`姓名`,path:`real_name`},{default:e(()=>[h(E(X),{value:b.real_name,"onUpdate:value":n[3]||=e=>b.real_name=e,placeholder:`真实姓名`},null,8,[`value`])]),_:1}),h(E(Y),{label:`学号`,path:`student_id`},{default:e(()=>[h(E(X),{value:b.student_id,"onUpdate:value":n[4]||=e=>b.student_id=e,placeholder:`4-20 位数字`},null,8,[`value`])]),_:1}),h(E(Y),{label:`宿舍位置`,path:`dorm`},{default:e(()=>[h(E(X),{value:b.dorm,"onUpdate:value":n[5]||=e=>b.dorm=e,placeholder:`例：3 号楼 502`},null,8,[`value`])]),_:1})]),h(E(Y),{label:`联系方式`,path:`contact`},{default:e(()=>[v(`div`,Yt,[h(E(J),{value:b.contact_type,"onUpdate:value":n[6]||=e=>b.contact_type=e,options:E(C),class:`!w-[112px] shrink-0`,"consistent-menu-width":!1},null,8,[`value`,`options`]),h(E(X),{value:b.contact,"onUpdate:value":n[7]||=e=>b.contact=e,placeholder:E(jt)[b.contact_type],class:`min-w-0 flex-1`},null,8,[`value`,`placeholder`])])]),_:1}),v(`p`,Xt,A(E(Nt)[b.contact_type]),1),v(`div`,Zt,[h(E(Y),{label:`密码`,path:`password`},{default:e(()=>[h(E(X),{value:b.password,"onUpdate:value":n[8]||=e=>b.password=e,type:`password`,"show-password-on":`click`,placeholder:`8-64 位，含字母和数字`,autocomplete:`new-password`},null,8,[`value`])]),_:1}),h(E(Y),{label:`确认密码`,path:`confirm_password`},{default:e(()=>[h(E(X),{value:b.confirm_password,"onUpdate:value":n[9]||=e=>b.confirm_password=e,type:`password`,"show-password-on":`click`,placeholder:`再输一次`,autocomplete:`new-password`,onKeydown:B(k,[`enter`])},null,8,[`value`])]),_:1})]),h(E(ue),{type:`primary`,block:``,size:`large`,loading:p.value,class:`!font-bold shadow-[var(--glow-primary)]`,onClick:k},{default:e(()=>[...n[15]||=[a(` 注册并登录 `,-1)]]),_:1},8,[`loading`])]),_:1},8,[`model`,`rules`])]),_:1})]),_:1},8,[`value`])]),n[16]||=v(`p`,{class:`mt-4 text-center text-[11px] text-ink-4`},` 管理员账号由超管在后台开通，注册一律为普通用户。 `,-1),n[17]||=v(`p`,{class:`mt-2 text-center text-[11px] text-ink-4`},[v(`a`,{href:`/?ui=classic`,class:`underline decoration-dotted underline-offset-2 hover:text-ink-2`},`换个界面 →`)],-1)])])]))}});export{Qt as default};