import{At as e,Bt as t,H as n,Ht as r,J as i,Mt as a,Nt as o,X as s,Xt as c,Y as l,Z as u,bt as d,ct as f,dn as p,dt as m,fn as h,gt as ee,h as te,kt as ne,nt as g,q as _,qt as v,r as y,rt as b,tt as x,un as re,ut as ie,wt as ae,xt as S,y as C,yt as w}from"./endpoints-b5Af9CM_.js";import{$ as oe,A as se,B as T,E as ce,G as E,Gt as D,H as le,I as O,J as ue,Jt as k,K as A,Kt as j,L as M,Q as de,R as N,T as fe,U as P,V as F,W as pe,X as me,Y as he,Yt as I,Z as L,Zt as ge,at as _e,ct as ve,ft as ye,h as be,ht as R,it as z,k as xe,n as B,nn as Se,q as V,rn as H,rt as Ce,st as U,t as W,vt as G,w as K}from"./createLucideIcon-1904TPEq.js";import{a as we,t as q}from"./Input-MqAQc4rZ.js";import{c as J,l as Te,o as Y,s as X}from"./create-vN5ZHblp.js";import{i as Ee,t as Z}from"./Select-NnEs1qwh.js";import{t as De}from"./use-merged-state-CDvziyPh.js";import{t as Q}from"./FormItem-BryH7DWG.js";import{t as Oe}from"./InputNumber-BnxurazA.js";import{t as ke}from"./Skeleton-ihVqGLRi.js";import{t as Ae}from"./Switch-BOT8v2_x.js";import{t as je}from"./eye-C1Ink3g7.js";import{i as Me,n as Ne,r as Pe}from"./paper-DhHidLD3.js";import{t as $}from"./pencil-BvBTozOL.js";import{t as Fe}from"./plus-qo1T_58T.js";import{t as Ie}from"./refresh-cw-DIa4ASoI.js";import{t as Le}from"./trash-DO-ZgfMK.js";import{E as Re,W as ze,_t as Be,ft as Ve,l as He,m as Ue,st as We,vt as Ge,wt as Ke,z as qe}from"./index-BolV3Ovx.js";import{x as Je,y as Ye}from"./format-DaAKFgUZ.js";import{t as Xe}from"./EmptyState-BTpyr9sx.js";import{t as Ze}from"./PageHeader-xiNYgX1K.js";var Qe=j(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[D(`>`,[j(`input`,[D(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),D(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),j(`button`,[D(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[k(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),D(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[k(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),D(`*`,[D(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[D(`>`,[j(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),j(`base-selection`,[j(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),j(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),k(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),D(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[D(`>`,[j(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),j(`base-selection`,[j(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),j(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),k(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),$e=b({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=ye(e);return ve(`-input-group`,Qe,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return w(),u(`div`,{class:z(`${e}-input-group`)},[U(()=>this.$slots.default?.())],2)}});function et(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function tt(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function nt(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=N(P(e));if(o===1){let e=rt([r,i,a]),o=rt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=rt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=rt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function rt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function it(e){return e=Math.round(e),e>=360?359:e<0?0:e}function at(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var ot={rgb:{hex(e){return F(N(e))},hsl(e){let[t,n,r,i]=N(e);return P([...de(t,n,r),i])},hsv(e){let[t,n,r,i]=N(e);return E([...oe(t,n,r),i])}},hex:{rgb(e){return V(N(e))},hsl(e){let[t,n,r,i]=N(e);return P([...de(t,n,r),i])},hsv(e){let[t,n,r,i]=N(e);return E([...oe(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=O(e);return F([...he(t,n,r),i])},rgb(e){let[t,n,r,i]=O(e);return V([...he(t,n,r),i])},hsv(e){let[t,n,r,i]=O(e);return E([...ue(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=M(e);return F([...L(t,n,r),i])},rgb(e){let[t,n,r,i]=M(e);return V([...L(t,n,r),i])},hsl(e){let[t,n,r,i]=M(e);return P([...me(t,n,r),i])}}};function st(e,t,n){return n||=tt(e),n?n===t?e:ot[n][t](e):null}var ct=[`onMousedown`],lt=`12px`,ut=12,dt=`6px`,ft=b({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(n){t.value&&e.rgba&&(Ge(`mousemove`,document,i),Ge(`mouseup`,document,a),i(n))}function i(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-ut);e.onUpdateAlpha(at(o))}function a(){Be(`mousemove`,document,i),Be(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,railBackgroundImage:_(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return w(),u(`div`,{class:z(`${e}-color-picker-slider`),ref:`railRef`,style:p({height:lt,borderRadius:dt}),onMousedown:this.handleMouseDown},[i(`div`,{style:p({borderRadius:dt,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[i(`div`,{class:z(`${e}-color-picker-checkboard`)},null,2),i(`div`,{class:z(`${e}-color-picker-slider__image`),style:p({backgroundImage:this.railBackgroundImage})},null,6)],4),U(()=>this.rgba&&(w(),u(`div`,{style:p({position:`absolute`,left:dt,right:dt,top:0,bottom:0})},[i(`div`,{class:z(`${e}-color-picker-handle`),style:p({left:`calc(${this.alpha*100}% - ${dt})`,borderRadius:dt,width:lt,height:lt})},[i(`div`,{class:z(`${e}-color-picker-handle__fill`),style:p({backgroundColor:V(this.rgba),borderRadius:dt,width:lt,height:lt})},null,6)],6)],4)))],46,ct)}}),pt=R(`n-color-picker`);function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function gt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function _t(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function vt(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var yt={paddingSmall:`0 4px`},bt=b({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(t){let n=r(``),{themeRef:i}=f(pt,null);e(()=>{n.value=a()});function a(){let{value:e}=t;if(e===null)return``;let{label:n}=t;return n===`HEX`?e:n===`A`?`${Math.floor(e*100)}%`:String(Math.floor(e))}function o(e){n.value=e}function s(e){let r,i;switch(t.label){case`HEX`:i=_t(e),i&&t.onUpdateValue(e),n.value=a();break;case`H`:r=ht(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`S`:case`L`:case`V`:r=gt(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`A`:r=vt(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`R`:case`G`:case`B`:r=mt(e),r===!1?n.value=a():t.onUpdateValue(r)}}return{mergedTheme:i,inputValue:n,handleInputChange:s,handleInputUpdateValue:o}},render(){let{mergedTheme:e}=this;return w(),l(q,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:yt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:p(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),xt=[`onClick`],St=b({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?F:T)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?E:pe)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?V:A)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?P:le)(i))}}}},render(){let{clsPrefix:e,modes:t}=this;return w(),u(`div`,{class:z(`${e}-color-picker-input`)},[i(`div`,{class:z(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:p({cursor:t.length===1?``:`pointer`})},[U(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,xt),g($e,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?F:T)(t)}catch{}return w(),l(bt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(w(),l(bt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),Ct=[`onClick`,`onKeydown`];function wt(e,t){if(t===`hsv`){let[t,n,r,i]=M(e);return V([...L(t,n,r),i])}return e}function Tt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Et=b({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=_(()=>e.swatches.map(e=>{let t=tt(e);return{value:e,mode:t,legalValue:wt(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=Tt(r):(G(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:st(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:e}=this;return w(),u(`div`,{class:z(`${e}-color-picker-swatches`)},[U(()=>this.parsedSwatchesRef.map(t=>(w(),u(`div`,{class:z(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[i(`div`,{class:z(`${e}-color-picker-swatch__fill`),style:p({background:t.legalValue})},null,6)],42,Ct))))],2)}}),Dt=[`onClick`],Ot=b({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:r}=f(pt,null);return()=>{let{hsla:a,value:o,clsPrefix:s,onClick:c,disabled:l}=e,d=t.label||r.value;return w(),u(`div`,{class:z([`${s}-color-picker`,l&&`${s}-color-picker--disabled`]),onClick:l?void 0:c},[i(`div`,{class:z(`${s}-color-picker__fill`)},[i(`div`,{class:z(`${s}-color-picker-checkboard`)},null,2),i(`div`,{style:p({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:a?P(a):``})},null,4),o&&a?(w(),u(`div`,{key:0,class:z(`${s}-color-picker__value`),style:p({color:nt(a)?`white`:`black`})},[d?(w(),u(n,{key:0},[U(()=>d(o))],64)):(w(),u(n,{key:1},[U(()=>o)],64))],6)):U(()=>null)],2)],10,Dt)}}}),kt=[`value`,`onChange`],At=b({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=tt(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(st(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return w(),u(`div`,{class:z(`${e}-color-picker-preview__preview`)},[i(`span`,{class:z(`${e}-color-picker-preview__fill`),style:p({background:this.color||`#000000`})},null,6),i(`input`,{class:z(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,kt)],2)}}),jt=[`onMousedown`],Mt=`12px`,Nt=12,Pt=`6px`,Ft=6,It=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Lt=b({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(e){t.value&&(Ge(`mousemove`,document,i),Ge(`mouseup`,document,a),i(e))}function i(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=it((n.clientX-a-Ft)/(i-Nt)*360);e.onUpdateHue(o)}function a(){Be(`mousemove`,document,i),Be(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return w(),u(`div`,{class:z(`${e}-color-picker-slider`),style:p({height:Mt,borderRadius:Pt})},[i(`div`,{ref:`railRef`,style:p({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:It,height:Mt,borderRadius:Pt,position:`relative`}),onMousedown:this.handleMouseDown},[i(`div`,{style:p({position:`absolute`,left:Pt,right:Pt,top:0,bottom:0})},[i(`div`,{class:z(`${e}-color-picker-handle`),style:p({left:`calc((${this.hue}%) / 359 * 100 - ${Pt})`,borderRadius:Pt,width:Mt,height:Mt})},[i(`div`,{class:z(`${e}-color-picker-handle__fill`),style:p({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Pt,width:Mt,height:Mt})},null,6)],6)],4)],44,jt)],6)}}),Rt=[`onMousedown`],zt=`12px`,Bt=`6px`,Vt=b({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(e){t.value&&(Ge(`mousemove`,document,i),Ge(`mouseup`,document,a),i(e))}function i(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function a(){Be(`mousemove`,document,i),Be(`mouseup`,document,a),e.onComplete?.()}return{palleteRef:t,handleColor:_(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return w(),u(`div`,{class:z(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[i(`div`,{class:z(`${e}-color-picker-pallete__layer`),style:p({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),i(`div`,{class:z(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),U(()=>this.rgba&&(w(),u(`div`,{class:z(`${e}-color-picker-handle`),style:p({width:zt,height:zt,borderRadius:Bt,left:`calc(${this.displayedSv[0]}% - ${Bt})`,bottom:`calc(${this.displayedSv[1]}% - ${Bt})`})},[i(`div`,{class:z(`${e}-color-picker-handle__fill`),style:p({backgroundColor:this.handleColor,borderRadius:Bt,width:zt,height:zt})},null,6)],6)))],42,Rt)}}),Ht=D([j(`color-picker-panel`,`
 margin: 4px 0;
 width: 240px;
 font-size: var(--n-panel-font-size);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 `,[ze(),j(`input`,`
 text-align: center;
 `)]),j(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[D(`&::after`,`
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 12px 12px;
 background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
 background-repeat: repeat;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),j(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[k(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),D(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),j(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[k(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),j(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[k(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[I(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),j(`color-picker-preview`,`
 display: flex;
 `,[k(`sliders`,`
 flex: 1 0 auto;
 `),k(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),k(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),k(`input`,`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),j(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[j(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),k(`mode`,`
 width: 72px;
 text-align: center;
 `)]),j(`color-picker-control`,`
 padding: 12px;
 `),j(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[j(`button`,`margin-left: 8px;`)]),j(`color-picker`,`
 display: inline-block;
 box-sizing: border-box;
 height: var(--n-height);
 font-size: var(--n-font-size);
 width: 100%;
 position: relative;
 cursor: pointer;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[I(`disabled`,`cursor: not-allowed`),k(`value`,`
 white-space: nowrap;
 position: relative;
 `),k(`fill`,`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),j(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[D(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),j(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[j(`color-picker-swatch`,`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[k(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),D(`&:focus`,`
 outline: none;
 `,[k(`fill`,[D(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Ut={...xe.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Te.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Wt=b({name:`ColorPicker`,inheritAttrs:!1,props:Ut,slots:Object,setup(t,{slots:a}){let o=null;function s(e){o=e}let c=null,{mergedClsPrefixRef:f,namespaceRef:h,inlineThemeDisabled:ee,mergedComponentPropsRef:te}=ye(t),g=be(t,{mergedSize:e=>{let{size:n}=t;if(n)return n;let{mergedSize:r}=e||{};return r?.value?r.value:te?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:y,mergedDisabledRef:b}=g,{localeRef:x}=we(`global`),re=xe(`ColorPicker`,`-color-picker`,Ht,qe,t,f);d(pt,{themeRef:re,renderLabelRef:v(t,`renderLabel`),colorPickerSlots:a});let ie=r(t.defaultShow),ae=De(v(t,`show`),ie);function S(e){let{onUpdateShow:n,"onUpdate:show":r}=t;n&&fe(n,e),r&&fe(r,e),ie.value=e}let{defaultValue:C}=t,D=r(C===void 0?et(t.modes,t.showAlpha):C),k=De(v(t,`value`),D),j=r([k.value]),I=r(0),_e=_(()=>tt(k.value)),{modes:ve}=t,R=r(tt(k.value)||ve[0]||`rgb`);function Se(){let{modes:e}=t,{value:n}=R,r=e.findIndex(e=>e===n);~r?R.value=e[(r+1)%e.length]:R.value=`rgb`}let H,W,G,K,q,J,Y,X,Ee=_(()=>{let{value:e}=k;if(!e)return null;switch(_e.value){case`hsv`:return M(e);case`hsl`:return[H,W,G,X]=O(e),[...ue(H,W,G),X];case`rgb`:case`hex`:return[q,J,Y,X]=N(e),[...oe(q,J,Y),X]}}),Z=_(()=>{let{value:e}=k;if(!e)return null;switch(_e.value){case`rgb`:case`hex`:return N(e);case`hsv`:return[H,W,K,X]=M(e),[...L(H,W,K),X];case`hsl`:return[H,W,G,X]=O(e),[...he(H,W,G),X]}}),Q=_(()=>{let{value:e}=k;if(!e)return null;switch(_e.value){case`hsl`:return O(e);case`hsv`:return[H,W,K,X]=M(e),[...me(H,W,K),X];case`rgb`:case`hex`:return[q,J,Y,X]=N(e),[...de(q,J,Y),X]}}),Oe=_(()=>{switch(R.value){case`rgb`:case`hex`:return Z.value;case`hsv`:return Ee.value;case`hsl`:return Q.value}}),ke=r(0),Ae=r(1),je=r([0,0]);function Me(e,n){let{value:r}=Ee,i=ke.value,a=r?r[3]:1;je.value=[e,n];let{showAlpha:o}=t;switch(R.value){case`hsv`:$((o?E:pe)([i,e,n,a]),`cursor`);break;case`hsl`:$((o?P:le)([...me(i,e,n),a]),`cursor`);break;case`rgb`:$((o?V:A)([...L(i,e,n),a]),`cursor`);break;case`hex`:$((o?F:T)([...L(i,e,n),a]),`cursor`)}}function Ne(e){ke.value=e;let{value:n}=Ee;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=t;switch(R.value){case`hsv`:$((o?E:pe)([e,r,i,a]),`cursor`);break;case`rgb`:$((o?V:A)([...L(e,r,i),a]),`cursor`);break;case`hex`:$((o?F:T)([...L(e,r,i),a]),`cursor`);break;case`hsl`:$((o?P:le)([...me(e,r,i),a]),`cursor`)}}function Pe(e){switch(R.value){case`hsv`:[H,W,K]=Ee.value,$(E([H,W,K,e]),`cursor`);break;case`rgb`:[q,J,Y]=Z.value,$(V([q,J,Y,e]),`cursor`);break;case`hex`:[q,J,Y]=Z.value,$(F([q,J,Y,e]),`cursor`);break;case`hsl`:[H,W,G]=Q.value,$(P([H,W,G,e]),`cursor`)}Ae.value=e}function $(e,n){c=n===`cursor`?e:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=g,{onUpdateValue:a,"onUpdate:value":o}=t;a&&fe(a,e),o&&fe(o,e),r(),i(),D.value=e}function Fe(e){$(e,`input`),m(Ie)}function Ie(e=!0){let{value:n}=k;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=g,{onComplete:a}=t;a&&a(n);let{value:o}=j,{value:s}=I;e&&(o.splice(s+1,o.length,n),I.value=s+1),r(),i()}}function Le(){let{value:e}=I;e-1<0||($(j.value[e-1],`input`),Ie(!1),I.value=e-1)}function Re(){let{value:e}=I;e<0||e+1>=j.value.length||($(j.value[e+1],`input`),Ie(!1),I.value=e+1)}function ze(){$(null,`input`);let{onClear:e}=t;e&&e(),S(!1)}function Be(){let{value:e}=k,{onConfirm:n}=t;n&&n(e),S(!1)}let Ve=_(()=>I.value>=1),He=_(()=>{let{value:e}=j;return e.length>1&&I.value<e.length-1});ne(ae,e=>{e||(j.value=[k.value],I.value=0)}),e(()=>{if(!(c&&c===k.value)){let{value:e}=Ee;e&&(ke.value=e[0],Ae.value=e[3],je.value=[e[1],e[2]])}c=null});let Ue=_(()=>{let{value:e}=y,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[ge(`height`,e)]:l,[ge(`fontSize`,e)]:u}}=re.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),We=ee?se(`color-picker`,_(()=>y.value[0]),Ue,t):void 0;function Ge(){let{value:e}=Z,{value:r}=ke,{internalActions:o,modes:s,actions:c}=t,{value:d}=re,{value:m}=f;return(()=>{let f=Ce(`550d4636453f407b`);return w(),u(`div`,{class:z([`${m}-color-picker-panel`,We?.themeClass.value]),onDragstart:f[0]||=e=>{e.preventDefault()},style:p(ee?void 0:Ue.value)},[i(`div`,{class:z(`${m}-color-picker-control`)},[(w(),l(Vt,{clsPrefix:m,rgba:e,displayedHue:r,displayedSv:je.value,onUpdateSV:Me,onComplete:Ie},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),i(`div`,{class:z(`${m}-color-picker-preview`)},[i(`div`,{class:z(`${m}-color-picker-preview__sliders`)},[(w(),l(Lt,{clsPrefix:m,hue:r,onUpdateHue:Ne,onComplete:Ie},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),t.showAlpha?(w(),l(ft,{key:0,clsPrefix:m,rgba:e,alpha:Ae.value,onUpdateAlpha:Pe,onComplete:Ie},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):U(()=>null)],2),t.showPreview?(w(),l(At,{key:0,clsPrefix:m,mode:R.value,color:Z.value&&T(Z.value),onUpdateColor:f[1]||=e=>{$(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):U(()=>null)],2),(w(),l(St,{clsPrefix:m,showAlpha:t.showAlpha,mode:R.value,modes:s,onUpdateMode:Se,value:k.value,valueArr:Oe.value,onUpdateValue:Fe},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),U(()=>t.swatches?.length&&(()=>{let e=Ce(`1de0b88852ebf5cb`);return w(),l(Et,{clsPrefix:m,mode:R.value,swatches:t.swatches,onUpdateColor:e[0]||=e=>{$(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),c?.length?(w(),u(`div`,{key:0,class:z(`${m}-color-picker-action`)},[U(()=>c.includes(`confirm`)&&(w(),l(B,{size:`small`,onClick:Be,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>x.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),U(()=>c.includes(`clear`)&&(w(),l(B,{size:`small`,onClick:ze,disabled:!k.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>x.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):U(()=>null),a.action?(w(),u(`div`,{key:2,class:z(`${m}-color-picker-action`)},[U(()=>a.action?.())],2)):(w(),u(n,{key:3},[o?(w(),u(`div`,{key:0,class:z(`${m}-color-picker-action`)},[U(()=>o.includes(`undo`)&&(w(),l(B,{size:`small`,onClick:Le,disabled:!Ve.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>x.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),U(()=>o.includes(`redo`)&&(w(),l(B,{size:`small`,onClick:Re,disabled:!He.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>x.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):U(()=>null)],64))],38)})()}return{mergedClsPrefix:f,namespace:h,hsla:Q,rgba:Z,mergedShow:ae,mergedDisabled:b,isMounted:ce(),adjustedTo:Te(t),mergedValue:k,handleTriggerClick(){b.value||S(!0)},setTriggerRef:s,handleClickOutside(e){if(o instanceof Element){if(o.contains(Ke(e)))return}else if(o&&o.$el.contains(Ke(e)))return;S(!1)},renderPanel:Ge,cssVars:ee?void 0:Ue,themeClass:We?.themeClass,onRender:We?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),w(),l(J,null,{default:()=>[(w(),l(X,null,{default:()=>{let t=ie(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=Ee([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),K(this.$slots.trigger,Ve(t,[`value`,`onClick`,`ref`]),n=>n||(w(),l(Ot,ie(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(w(),l(Y,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Te.tdkey,to:this.adjustedTo},{_:1,default:_e(()=>(w(),l(Se,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:_e(()=>this.mergedShow?o(this.renderPanel(),[[We,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Gt=W({name:`map-pin`,size:24,node:[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]}),Kt={class:`mx-auto max-w-[1400px]`},qt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Jt={class:`panel h-fit p-4`},Yt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},Xt={class:`grid grid-cols-2 gap-3`},Zt={class:`mb-3`},Qt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},$t={class:`grid gap-2 sm:grid-cols-2`},en={class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},tn={key:0,class:`mt-1 text-xs text-ink-3`},nn={class:`flex items-center gap-2`},rn={key:0,class:`mt-3 text-xs text-ink-3`},an={class:`panel h-fit p-4`},on={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},sn={class:`mt-3 flex items-center gap-2`},cn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},ln={key:0,class:`flex flex-col gap-2`},un={key:1,class:`panel grid place-items-center py-12`},dn={class:`flex items-start justify-between gap-3`},fn={class:`min-w-0 flex-1`},pn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},mn={class:`tnum text-xs text-ink-3`},hn={class:`text-xs text-ink-3`},gn={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},_n=b({__name:`AnnouncementsView`,setup(e){let o=Re(),d=Pe(),f=r([]),m=r(!0),ne=r(!1),v=r(null),b=t({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ie=Object.keys(Je).map(e=>({label:Je[e].label,value:e})),oe=_(()=>({fontFamily:Je[b.font_family].css,fontSize:`${b.font_size}px`})),se=_(()=>[`light`,`dark`].map(e=>{let t=Ne()[e],n=He(t.paper,b.font_color,b.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:b.font_color,overridden:n}})),T=_(()=>b.content.trim().length>0&&!ne.value);function ce(){v.value=null,b.content=``,b.font_family=`system`,b.font_size=15,b.font_color=`#1f2328`}async function E(e=!1){e||(m.value=!0);try{let e=await y.list();f.value=e.announcements}catch(e){o.error(e instanceof C?e.message:`公告读取失败`)}finally{m.value=!1}}async function D(){if(!T.value)return;ne.value=!0;let e={content:b.content.trim(),font_family:b.font_family,font_size:b.font_size,font_color:b.font_color};try{v.value===null?(await y.create(e),o.success(`公告已发布 · 旧公告已停用`)):(await y.update(v.value,e),o.success(`公告已更新`)),ce(),await E(!0),await d.load()}catch(e){o.error(e instanceof C?e.message:`保存未生效`)}finally{ne.value=!1}}function le(e){v.value=e.id,b.content=e.content,b.font_family=e.font_family,b.font_size=e.font_size,b.font_color=e.font_color}async function O(e){let t=e.is_active!==1;try{await y.setActive(e.id,t),o.success(t?`公告已启用 · 学生端可见`:`公告已停用 · 学生端不再显示`),await E(!0),await d.load()}catch(e){o.error(e instanceof C?e.message:t?`启用未完成 · 稍后重试`:`停用未完成 · 稍后重试`)}}async function ue(e){if(await Ue({title:`删除公告`,content:`公告将被删除，不可撤销。`,positiveText:`删除`}))try{await y.remove(e.id),o.success(`公告已删除`),v.value===e.id&&ce(),await E(!0),await d.load()}catch(e){o.error(e instanceof C?e.message:`删除未生效`)}}let k=t({pickup_place:``,pickup_hours:``}),A=r(!1),j=r(!1);async function M(){try{let e=await te.get();k.pickup_place=e.pickup_place??``,k.pickup_hours=e.pickup_hours??``,j.value=!0}catch(e){o.error(e instanceof C?e.message:`取件信息读取失败`)}}async function de(){if(!A.value){A.value=!0;try{await te.save({pickup_place:k.pickup_place.trim()||null,pickup_hours:k.pickup_hours.trim()||null}),o.success(`取件信息已保存 · 学生端可取件卡片与取件邮件同步生效`),await M()}catch(e){o.error(e instanceof C?e.message:`保存未生效`)}finally{A.value=!1}}}return ee(()=>{E(),M()}),(e,t)=>(w(),u(`div`,Kt,[g(Ze,{title:`公告管理`,subtitle:`单条生效 · 发布新公告将停用旧公告`},{actions:a(()=>[g(c(B),{size:`small`,quaternary:``,loading:m.value,onClick:t[0]||=e=>E()},{icon:a(()=>[g(c(Ie),{size:15})]),default:a(()=>[t[7]||=x(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),i(`div`,qt,[i(`section`,Jt,[i(`h3`,Yt,[(w(),l(ae(v.value===null?c(Fe):c($)),{size:15,style:{color:`var(--accent-text)`}})),x(` `+h(v.value===null?`发布新公告`:`编辑公告 #${v.value}`),1)]),g(c(Q),{label:`公告内容`,"show-feedback":!1},{default:a(()=>[g(c(q),{value:b.content,"onUpdate:value":t[1]||=e=>b.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),i(`div`,Xt,[g(c(Q),{label:`字体`,"show-feedback":!1},{default:a(()=>[g(c(Z),{value:b.font_family,"onUpdate:value":t[2]||=e=>b.font_family=e,options:c(ie),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),g(c(Q),{label:`字号`,"show-feedback":!1},{default:a(()=>[g(c(Oe),{value:b.font_size,"onUpdate:value":t[3]||=e=>b.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),g(c(Q),{label:`文字颜色`,"show-feedback":!1},{default:a(()=>[g(c(Wt),{value:b.font_color,"onUpdate:value":t[4]||=e=>b.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),i(`div`,Zt,[i(`div`,Qt,[g(c(je),{size:12}),t[8]||=x(` 预览 `,-1)]),i(`div`,$t,[(w(!0),u(n,null,S(se.value,e=>(w(),u(`div`,{key:e.key},[i(`div`,en,h(e.label),1),i(`div`,{class:`border p-3`,style:p({backgroundColor:e.paper,borderColor:e.line})},[i(`p`,{class:`whitespace-pre-wrap break-words`,style:p([oe.value,{color:e.ink}])},h(b.content.trim()||`公告内容将在此预览`),5)],4),e.overridden?(w(),u(`p`,tn,` 对比度不足 · 已回退至主题文字色 `)):s(``,!0)]))),128))])]),i(`div`,nn,[g(c(B),{type:`primary`,class:`!font-bold`,loading:ne.value,disabled:!T.value,onClick:D},{icon:a(()=>[g(c(Me),{size:15})]),default:a(()=>[x(` `+h(v.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),v.value===null?s(``,!0):(w(),l(c(B),{key:0,quaternary:``,onClick:ce},{default:a(()=>[...t[9]||=[x(`取消编辑`,-1)]]),_:1}))]),v.value===null?(w(),u(`p`,rn,` 发布后立即生效 · 上一条公告同时停用。 `)):s(``,!0)]),i(`section`,an,[i(`h3`,on,[g(c(Gt),{size:15,style:{color:`var(--accent-text)`}}),t[10]||=x(` 取件信息 `,-1)]),g(c(Q),{label:`取件地点`,"show-feedback":!1},{default:a(()=>[g(c(q),{value:k.pickup_place,"onUpdate:value":t[5]||=e=>k.pickup_place=e,maxlength:120,"show-count":``,disabled:!j.value,placeholder:`例：3 号楼宿管室`},null,8,[`value`,`disabled`])]),_:1}),g(c(Q),{label:`取件时间`,"show-feedback":!1},{default:a(()=>[g(c(q),{value:k.pickup_hours,"onUpdate:value":t[6]||=e=>k.pickup_hours=e,maxlength:120,"show-count":``,disabled:!j.value,placeholder:`例：8:00–22:00`},null,8,[`value`,`disabled`])]),_:1}),i(`div`,sn,[g(c(B),{type:`primary`,class:`!font-bold`,size:`small`,loading:A.value,disabled:!j.value,onClick:de},{default:a(()=>[...t[11]||=[x(` 保存取件信息 `,-1)]]),_:1},8,[`loading`,`disabled`])]),t[12]||=i(`p`,{class:`mt-3 text-xs text-ink-3`},` 学生端的可取件卡片与取件邮件都会显示这两项 · 留空则不显示。 `,-1)]),i(`section`,cn,[t[15]||=i(`h3`,{class:`mb-3 font-heading text-base font-bold`},[x(` 历史公告 `),i(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),m.value&&!f.value.length?(w(),u(`div`,ln,[(w(),u(n,null,S(3,e=>g(c(ke),{key:e,height:`92px`,sharp:!1})),64))])):f.value.length?(w(),l(H,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:a(()=>[(w(!0),u(n,null,S(f.value,e=>(w(),u(`li`,{key:e.id,class:re([`panel p-3.5`,e.is_active===1&&`border-[var(--accent-tint-border)]`])},[i(`div`,dn,[i(`div`,fn,[i(`p`,{class:`line-clamp-2 text-sm`,style:p({fontFamily:c(Je)[e.font_family]?.css})},h(e.content),5),i(`div`,pn,[i(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:p(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},h(e.is_active===1?`生效中`:`已停用`),5),i(`span`,mn,[x(` #`+h(e.id)+` · `+h(c(Je)[e.font_family]?.label??e.font_family)+` `+h(e.font_size)+`px · `,1),i(`span`,{style:p({color:e.font_color})},h(e.font_color),5)]),i(`span`,hn,h(e.author??`系统`)+` · `+h(c(Ye)(e.update_time)),1)])]),g(c(Ae),{round:!1,value:e.is_active===1,size:`small`,"onUpdate:value":t=>O(e)},null,8,[`value`,`onUpdate:value`])]),i(`div`,gn,[g(c(B),{size:`tiny`,quaternary:``,onClick:t=>le(e)},{icon:a(()=>[g(c($),{size:12})]),default:a(()=>[t[13]||=x(` 编辑 `,-1)]),_:1},8,[`onClick`]),g(c(B),{size:`tiny`,quaternary:``,onClick:t=>ue(e)},{icon:a(()=>[g(c(Le),{size:12})]),default:a(()=>[t[14]||=x(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(w(),u(`div`,un,[g(Xe,{code:`00 / NO NOTICE`,title:`暂无公告记录`,hint:`发布后在此列示`},{icon:a(()=>[g(c(Me),{size:28})]),_:1})]))])])]))}});export{_n as default};