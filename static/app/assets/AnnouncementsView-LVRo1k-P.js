import{At as e,Bt as t,H as n,Ht as r,J as i,Mt as a,Nt as o,X as s,Xt as c,Y as l,Z as u,bt as d,ct as f,dn as p,dt as m,fn as h,gt as ee,h as te,kt as ne,nt as g,q as _,qt as v,r as y,rt as b,tt as x,un as re,ut as ie,wt as ae,xt as oe,y as S,yt as C}from"./endpoints-o6zgEJYN.js";import{$ as se,A as ce,B as w,E as le,G as T,Gt as E,H as ue,I as D,J as de,Jt as O,K as k,Kt as A,L as j,Q as fe,R as M,T as pe,U as N,V as P,W as me,X as he,Y as ge,Yt as F,Z as I,Zt as _e,at as ve,ct as ye,ft as be,h as xe,ht as L,it as R,k as Se,n as z,nn as Ce,q as B,rn as V,rt as we,st as H,t as U,vt as W,w as G}from"./createLucideIcon-BgcK-14v.js";import{a as Te,t as K}from"./Input-OW2egabd.js";import{c as q,l as Ee,o as J,s as Y}from"./create-Dd2UE8Wu.js";import{i as De,t as X}from"./Select-r3lacfHw.js";import{t as Oe}from"./use-merged-state-C2JTXN1m.js";import{t as Z}from"./FormItem-CtsUUcf2.js";import{t as ke}from"./InputNumber-DwqCaaN-.js";import{t as Ae}from"./Skeleton-CmSCsbER.js";import{t as je}from"./Switch-ckW2Ph0t.js";import{t as Me}from"./eye-KKH6B6d8.js";import{i as Ne,n as Pe,r as Fe}from"./paper-DmWj0YQ0.js";import{t as Q}from"./pencil-DKtdEkYo.js";import{t as Ie}from"./plus-CSMRxs1t.js";import{t as Le}from"./refresh-cw-1j7-TXRv.js";import{t as Re}from"./trash-Dujkht7i.js";import{Dt as ze,L as Be,S as Ve,U as He,_t as $,a as Ue,ft as We,st as Ge,u as Ke,vt as qe}from"./index-D-YNI8BG.js";import{x as Je,y as Ye}from"./format-CffqP4Vo.js";import{t as Xe}from"./EmptyState-C1UnLczk.js";import{t as Ze}from"./PageHeader-CyEvycGK.js";var Qe=A(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[E(`>`,[A(`input`,[E(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),E(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),A(`button`,[E(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[O(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),E(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[O(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),E(`*`,[E(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[E(`>`,[A(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),A(`base-selection`,[A(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),A(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),O(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),E(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[E(`>`,[A(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),A(`base-selection`,[A(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),A(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),O(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),$e=b({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=be(e);return ye(`-input-group`,Qe,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return C(),u(`div`,{class:R(`${e}-input-group`)},[H(()=>this.$slots.default?.())],2)}});function et(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function tt(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function nt(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=M(N(e));if(o===1){let e=rt([r,i,a]),o=rt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=rt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=rt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function rt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function it(e){return e=Math.round(e),e>=360?359:e<0?0:e}function at(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var ot={rgb:{hex(e){return P(M(e))},hsl(e){let[t,n,r,i]=M(e);return N([...fe(t,n,r),i])},hsv(e){let[t,n,r,i]=M(e);return T([...se(t,n,r),i])}},hex:{rgb(e){return B(M(e))},hsl(e){let[t,n,r,i]=M(e);return N([...fe(t,n,r),i])},hsv(e){let[t,n,r,i]=M(e);return T([...se(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=D(e);return P([...ge(t,n,r),i])},rgb(e){let[t,n,r,i]=D(e);return B([...ge(t,n,r),i])},hsv(e){let[t,n,r,i]=D(e);return T([...de(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=j(e);return P([...I(t,n,r),i])},rgb(e){let[t,n,r,i]=j(e);return B([...I(t,n,r),i])},hsl(e){let[t,n,r,i]=j(e);return N([...he(t,n,r),i])}}};function st(e,t,n){return n||=tt(e),n?n===t?e:ot[n][t](e):null}var ct=[`onMousedown`],lt=`12px`,ut=12,dt=`6px`,ft=b({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(n){t.value&&e.rgba&&(qe(`mousemove`,document,i),qe(`mouseup`,document,a),i(n))}function i(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-ut);e.onUpdateAlpha(at(o))}function a(){$(`mousemove`,document,i),$(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,railBackgroundImage:_(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return C(),u(`div`,{class:R(`${e}-color-picker-slider`),ref:`railRef`,style:p({height:lt,borderRadius:dt}),onMousedown:this.handleMouseDown},[i(`div`,{style:p({borderRadius:dt,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[i(`div`,{class:R(`${e}-color-picker-checkboard`)},null,2),i(`div`,{class:R(`${e}-color-picker-slider__image`),style:p({backgroundImage:this.railBackgroundImage})},null,6)],4),H(()=>this.rgba&&(C(),u(`div`,{style:p({position:`absolute`,left:dt,right:dt,top:0,bottom:0})},[i(`div`,{class:R(`${e}-color-picker-handle`),style:p({left:`calc(${this.alpha*100}% - ${dt})`,borderRadius:dt,width:lt,height:lt})},[i(`div`,{class:R(`${e}-color-picker-handle__fill`),style:p({backgroundColor:B(this.rgba),borderRadius:dt,width:lt,height:lt})},null,6)],6)],4)))],46,ct)}}),pt=L(`n-color-picker`);function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function gt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function _t(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function vt(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var yt={paddingSmall:`0 4px`},bt=b({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(t){let n=r(``),{themeRef:i}=f(pt,null);e(()=>{n.value=a()});function a(){let{value:e}=t;if(e===null)return``;let{label:n}=t;return n===`HEX`?e:n===`A`?`${Math.floor(e*100)}%`:String(Math.floor(e))}function o(e){n.value=e}function s(e){let r,i;switch(t.label){case`HEX`:i=_t(e),i&&t.onUpdateValue(e),n.value=a();break;case`H`:r=ht(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`S`:case`L`:case`V`:r=gt(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`A`:r=vt(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`R`:case`G`:case`B`:r=mt(e),r===!1?n.value=a():t.onUpdateValue(r)}}return{mergedTheme:i,inputValue:n,handleInputChange:s,handleInputUpdateValue:o}},render(){let{mergedTheme:e}=this;return C(),l(K,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:yt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:p(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),xt=[`onClick`],St=b({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?P:w)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?T:me)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?B:k)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?N:ue)(i))}}}},render(){let{clsPrefix:e,modes:t}=this;return C(),u(`div`,{class:R(`${e}-color-picker-input`)},[i(`div`,{class:R(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:p({cursor:t.length===1?``:`pointer`})},[H(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,xt),g($e,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?P:w)(t)}catch{}return C(),l(bt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(C(),l(bt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),Ct=[`onClick`,`onKeydown`];function wt(e,t){if(t===`hsv`){let[t,n,r,i]=j(e);return B([...I(t,n,r),i])}return e}function Tt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Et=b({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=_(()=>e.swatches.map(e=>{let t=tt(e);return{value:e,mode:t,legalValue:wt(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=Tt(r):(W(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:st(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:e}=this;return C(),u(`div`,{class:R(`${e}-color-picker-swatches`)},[H(()=>this.parsedSwatchesRef.map(t=>(C(),u(`div`,{class:R(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[i(`div`,{class:R(`${e}-color-picker-swatch__fill`),style:p({background:t.legalValue})},null,6)],42,Ct))))],2)}}),Dt=[`onClick`],Ot=b({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:r}=f(pt,null);return()=>{let{hsla:a,value:o,clsPrefix:s,onClick:c,disabled:l}=e,d=t.label||r.value;return C(),u(`div`,{class:R([`${s}-color-picker`,l&&`${s}-color-picker--disabled`]),onClick:l?void 0:c},[i(`div`,{class:R(`${s}-color-picker__fill`)},[i(`div`,{class:R(`${s}-color-picker-checkboard`)},null,2),i(`div`,{style:p({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:a?N(a):``})},null,4),o&&a?(C(),u(`div`,{key:0,class:R(`${s}-color-picker__value`),style:p({color:nt(a)?`white`:`black`})},[d?(C(),u(n,{key:0},[H(()=>d(o))],64)):(C(),u(n,{key:1},[H(()=>o)],64))],6)):H(()=>null)],2)],10,Dt)}}}),kt=[`value`,`onChange`],At=b({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=tt(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(st(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return C(),u(`div`,{class:R(`${e}-color-picker-preview__preview`)},[i(`span`,{class:R(`${e}-color-picker-preview__fill`),style:p({background:this.color||`#000000`})},null,6),i(`input`,{class:R(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,kt)],2)}}),jt=[`onMousedown`],Mt=`12px`,Nt=12,Pt=`6px`,Ft=6,It=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Lt=b({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(e){t.value&&(qe(`mousemove`,document,i),qe(`mouseup`,document,a),i(e))}function i(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=it((n.clientX-a-Ft)/(i-Nt)*360);e.onUpdateHue(o)}function a(){$(`mousemove`,document,i),$(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return C(),u(`div`,{class:R(`${e}-color-picker-slider`),style:p({height:Mt,borderRadius:Pt})},[i(`div`,{ref:`railRef`,style:p({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:It,height:Mt,borderRadius:Pt,position:`relative`}),onMousedown:this.handleMouseDown},[i(`div`,{style:p({position:`absolute`,left:Pt,right:Pt,top:0,bottom:0})},[i(`div`,{class:R(`${e}-color-picker-handle`),style:p({left:`calc((${this.hue}%) / 359 * 100 - ${Pt})`,borderRadius:Pt,width:Mt,height:Mt})},[i(`div`,{class:R(`${e}-color-picker-handle__fill`),style:p({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Pt,width:Mt,height:Mt})},null,6)],6)],4)],44,jt)],6)}}),Rt=[`onMousedown`],zt=`12px`,Bt=`6px`,Vt=b({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(e){t.value&&(qe(`mousemove`,document,i),qe(`mouseup`,document,a),i(e))}function i(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function a(){$(`mousemove`,document,i),$(`mouseup`,document,a),e.onComplete?.()}return{palleteRef:t,handleColor:_(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return C(),u(`div`,{class:R(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[i(`div`,{class:R(`${e}-color-picker-pallete__layer`),style:p({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),i(`div`,{class:R(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),H(()=>this.rgba&&(C(),u(`div`,{class:R(`${e}-color-picker-handle`),style:p({width:zt,height:zt,borderRadius:Bt,left:`calc(${this.displayedSv[0]}% - ${Bt})`,bottom:`calc(${this.displayedSv[1]}% - ${Bt})`})},[i(`div`,{class:R(`${e}-color-picker-handle__fill`),style:p({backgroundColor:this.handleColor,borderRadius:Bt,width:zt,height:zt})},null,6)],6)))],42,Rt)}}),Ht=E([A(`color-picker-panel`,`
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
 `,[He(),A(`input`,`
 text-align: center;
 `)]),A(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[E(`&::after`,`
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
 `)]),A(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[O(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),E(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),A(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[O(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),A(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[O(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[F(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),A(`color-picker-preview`,`
 display: flex;
 `,[O(`sliders`,`
 flex: 1 0 auto;
 `),O(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),O(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),O(`input`,`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),A(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[A(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),O(`mode`,`
 width: 72px;
 text-align: center;
 `)]),A(`color-picker-control`,`
 padding: 12px;
 `),A(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[A(`button`,`margin-left: 8px;`)]),A(`color-picker`,`
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
 `,[F(`disabled`,`cursor: not-allowed`),O(`value`,`
 white-space: nowrap;
 position: relative;
 `),O(`fill`,`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),A(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[E(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),A(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[A(`color-picker-swatch`,`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[O(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),E(`&:focus`,`
 outline: none;
 `,[O(`fill`,[E(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Ut={...Se.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Ee.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Wt=b({name:`ColorPicker`,inheritAttrs:!1,props:Ut,slots:Object,setup(t,{slots:a}){let o=null;function s(e){o=e}let c=null,{mergedClsPrefixRef:f,namespaceRef:h,inlineThemeDisabled:ee,mergedComponentPropsRef:te}=be(t),g=xe(t,{mergedSize:e=>{let{size:n}=t;if(n)return n;let{mergedSize:r}=e||{};return r?.value?r.value:te?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:y,mergedDisabledRef:b}=g,{localeRef:x}=Te(`global`),re=Se(`ColorPicker`,`-color-picker`,Ht,Be,t,f);d(pt,{themeRef:re,renderLabelRef:v(t,`renderLabel`),colorPickerSlots:a});let ie=r(t.defaultShow),ae=Oe(v(t,`show`),ie);function oe(e){let{onUpdateShow:n,"onUpdate:show":r}=t;n&&pe(n,e),r&&pe(r,e),ie.value=e}let{defaultValue:S}=t,E=r(S===void 0?et(t.modes,t.showAlpha):S),O=Oe(v(t,`value`),E),A=r([O.value]),F=r(0),ve=_(()=>tt(O.value)),{modes:ye}=t,L=r(tt(O.value)||ye[0]||`rgb`);function Ce(){let{modes:e}=t,{value:n}=L,r=e.findIndex(e=>e===n);~r?L.value=e[(r+1)%e.length]:L.value=`rgb`}let V,U,W,G,K,q,J,Y,De=_(()=>{let{value:e}=O;if(!e)return null;switch(ve.value){case`hsv`:return j(e);case`hsl`:return[V,U,W,Y]=D(e),[...de(V,U,W),Y];case`rgb`:case`hex`:return[K,q,J,Y]=M(e),[...se(K,q,J),Y]}}),X=_(()=>{let{value:e}=O;if(!e)return null;switch(ve.value){case`rgb`:case`hex`:return M(e);case`hsv`:return[V,U,G,Y]=j(e),[...I(V,U,G),Y];case`hsl`:return[V,U,W,Y]=D(e),[...ge(V,U,W),Y]}}),Z=_(()=>{let{value:e}=O;if(!e)return null;switch(ve.value){case`hsl`:return D(e);case`hsv`:return[V,U,G,Y]=j(e),[...he(V,U,G),Y];case`rgb`:case`hex`:return[K,q,J,Y]=M(e),[...fe(K,q,J),Y]}}),ke=_(()=>{switch(L.value){case`rgb`:case`hex`:return X.value;case`hsv`:return De.value;case`hsl`:return Z.value}}),Ae=r(0),je=r(1),Me=r([0,0]);function Ne(e,n){let{value:r}=De,i=Ae.value,a=r?r[3]:1;Me.value=[e,n];let{showAlpha:o}=t;switch(L.value){case`hsv`:Q((o?T:me)([i,e,n,a]),`cursor`);break;case`hsl`:Q((o?N:ue)([...he(i,e,n),a]),`cursor`);break;case`rgb`:Q((o?B:k)([...I(i,e,n),a]),`cursor`);break;case`hex`:Q((o?P:w)([...I(i,e,n),a]),`cursor`)}}function Pe(e){Ae.value=e;let{value:n}=De;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=t;switch(L.value){case`hsv`:Q((o?T:me)([e,r,i,a]),`cursor`);break;case`rgb`:Q((o?B:k)([...I(e,r,i),a]),`cursor`);break;case`hex`:Q((o?P:w)([...I(e,r,i),a]),`cursor`);break;case`hsl`:Q((o?N:ue)([...he(e,r,i),a]),`cursor`)}}function Fe(e){switch(L.value){case`hsv`:[V,U,G]=De.value,Q(T([V,U,G,e]),`cursor`);break;case`rgb`:[K,q,J]=X.value,Q(B([K,q,J,e]),`cursor`);break;case`hex`:[K,q,J]=X.value,Q(P([K,q,J,e]),`cursor`);break;case`hsl`:[V,U,W]=Z.value,Q(N([V,U,W,e]),`cursor`)}je.value=e}function Q(e,n){c=n===`cursor`?e:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=g,{onUpdateValue:a,"onUpdate:value":o}=t;a&&pe(a,e),o&&pe(o,e),r(),i(),E.value=e}function Ie(e){Q(e,`input`),m(Le)}function Le(e=!0){let{value:n}=O;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=g,{onComplete:a}=t;a&&a(n);let{value:o}=A,{value:s}=F;e&&(o.splice(s+1,o.length,n),F.value=s+1),r(),i()}}function Re(){let{value:e}=F;e-1<0||(Q(A.value[e-1],`input`),Le(!1),F.value=e-1)}function Ve(){let{value:e}=F;e<0||e+1>=A.value.length||(Q(A.value[e+1],`input`),Le(!1),F.value=e+1)}function He(){Q(null,`input`);let{onClear:e}=t;e&&e(),oe(!1)}function $(){let{value:e}=O,{onConfirm:n}=t;n&&n(e),oe(!1)}let Ue=_(()=>F.value>=1),We=_(()=>{let{value:e}=A;return e.length>1&&F.value<e.length-1});ne(ae,e=>{e||(A.value=[O.value],F.value=0)}),e(()=>{if(!(c&&c===O.value)){let{value:e}=De;e&&(Ae.value=e[0],je.value=e[3],Me.value=[e[1],e[2]])}c=null});let Ge=_(()=>{let{value:e}=y,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[_e(`height`,e)]:l,[_e(`fontSize`,e)]:u}}=re.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),Ke=ee?ce(`color-picker`,_(()=>y.value[0]),Ge,t):void 0;function qe(){let{value:e}=X,{value:r}=Ae,{internalActions:o,modes:s,actions:c}=t,{value:d}=re,{value:m}=f;return(()=>{let f=we(`550d4636453f407b`);return C(),u(`div`,{class:R([`${m}-color-picker-panel`,Ke?.themeClass.value]),onDragstart:f[0]||=e=>{e.preventDefault()},style:p(ee?void 0:Ge.value)},[i(`div`,{class:R(`${m}-color-picker-control`)},[(C(),l(Vt,{clsPrefix:m,rgba:e,displayedHue:r,displayedSv:Me.value,onUpdateSV:Ne,onComplete:Le},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),i(`div`,{class:R(`${m}-color-picker-preview`)},[i(`div`,{class:R(`${m}-color-picker-preview__sliders`)},[(C(),l(Lt,{clsPrefix:m,hue:r,onUpdateHue:Pe,onComplete:Le},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),t.showAlpha?(C(),l(ft,{key:0,clsPrefix:m,rgba:e,alpha:je.value,onUpdateAlpha:Fe,onComplete:Le},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):H(()=>null)],2),t.showPreview?(C(),l(At,{key:0,clsPrefix:m,mode:L.value,color:X.value&&w(X.value),onUpdateColor:f[1]||=e=>{Q(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):H(()=>null)],2),(C(),l(St,{clsPrefix:m,showAlpha:t.showAlpha,mode:L.value,modes:s,onUpdateMode:Ce,value:O.value,valueArr:ke.value,onUpdateValue:Ie},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),H(()=>t.swatches?.length&&(()=>{let e=we(`1de0b88852ebf5cb`);return C(),l(Et,{clsPrefix:m,mode:L.value,swatches:t.swatches,onUpdateColor:e[0]||=e=>{Q(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),c?.length?(C(),u(`div`,{key:0,class:R(`${m}-color-picker-action`)},[H(()=>c.includes(`confirm`)&&(C(),l(z,{size:`small`,onClick:$,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>x.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),H(()=>c.includes(`clear`)&&(C(),l(z,{size:`small`,onClick:He,disabled:!O.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>x.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):H(()=>null),a.action?(C(),u(`div`,{key:2,class:R(`${m}-color-picker-action`)},[H(()=>a.action?.())],2)):(C(),u(n,{key:3},[o?(C(),u(`div`,{key:0,class:R(`${m}-color-picker-action`)},[H(()=>o.includes(`undo`)&&(C(),l(z,{size:`small`,onClick:Re,disabled:!Ue.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>x.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),H(()=>o.includes(`redo`)&&(C(),l(z,{size:`small`,onClick:Ve,disabled:!We.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>x.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):H(()=>null)],64))],38)})()}return{mergedClsPrefix:f,namespace:h,hsla:Z,rgba:X,mergedShow:ae,mergedDisabled:b,isMounted:le(),adjustedTo:Ee(t),mergedValue:O,handleTriggerClick(){b.value||oe(!0)},setTriggerRef:s,handleClickOutside(e){if(o instanceof Element){if(o.contains(ze(e)))return}else if(o&&o.$el.contains(ze(e)))return;oe(!1)},renderPanel:qe,cssVars:ee?void 0:Ge,themeClass:Ke?.themeClass,onRender:Ke?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),C(),l(q,null,{default:()=>[(C(),l(Y,null,{default:()=>{let t=ie(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=De([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),G(this.$slots.trigger,We(t,[`value`,`onClick`,`ref`]),n=>n||(C(),l(Ot,ie(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(C(),l(J,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Ee.tdkey,to:this.adjustedTo},{_:1,default:ve(()=>(C(),l(Ce,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:ve(()=>this.mergedShow?o(this.renderPanel(),[[Ge,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Gt=U({name:`map-pin`,size:24,node:[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]}),Kt={class:`mx-auto max-w-[1400px]`},qt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Jt={class:`panel h-fit p-4`},Yt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},Xt={class:`grid grid-cols-2 gap-3`},Zt={class:`mb-3`},Qt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},$t={class:`grid gap-2 sm:grid-cols-2`},en={class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},tn={key:0,class:`mt-1 text-xs text-ink-3`},nn={class:`flex items-center gap-2`},rn={key:0,class:`mt-3 text-xs text-ink-3`},an={class:`panel h-fit p-4`},on={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},sn={class:`mt-3 flex items-center gap-2`},cn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},ln={key:0,class:`flex flex-col gap-2`},un={key:1,class:`panel grid place-items-center py-12`},dn={class:`flex items-start justify-between gap-3`},fn={class:`min-w-0 flex-1`},pn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},mn={class:`tnum text-xs text-ink-3`},hn={class:`text-xs text-ink-3`},gn={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},_n=b({__name:`AnnouncementsView`,setup(e){let o=Ve(),d=Fe(),f=r([]),m=r(!0),ne=r(!1),v=r(null),b=t({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ie=Object.keys(Je).map(e=>({label:Je[e].label,value:e})),se=_(()=>({fontFamily:Je[b.font_family].css,fontSize:`${b.font_size}px`})),ce=_(()=>[`light`,`dark`].map(e=>{let t=Pe()[e],n=Ue(t.paper,b.font_color,b.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:b.font_color,overridden:n}})),w=_(()=>b.content.trim().length>0&&!ne.value);function le(){v.value=null,b.content=``,b.font_family=`system`,b.font_size=15,b.font_color=`#1f2328`}async function T(e=!1){e||(m.value=!0);try{let e=await y.list();f.value=e.announcements}catch(e){o.error(e instanceof S?e.message:`公告读取失败`)}finally{m.value=!1}}async function E(){if(!w.value)return;ne.value=!0;let e={content:b.content.trim(),font_family:b.font_family,font_size:b.font_size,font_color:b.font_color};try{v.value===null?(await y.create(e),o.success(`公告已发布 · 旧公告已停用`)):(await y.update(v.value,e),o.success(`公告已更新`)),le(),await T(!0),await d.load()}catch(e){o.error(e instanceof S?e.message:`保存未生效`)}finally{ne.value=!1}}function ue(e){v.value=e.id,b.content=e.content,b.font_family=e.font_family,b.font_size=e.font_size,b.font_color=e.font_color}async function D(e){let t=e.is_active!==1;try{await y.setActive(e.id,t),o.success(t?`公告已启用 · 学生端可见`:`公告已停用 · 学生端不再显示`),await T(!0),await d.load()}catch(e){o.error(e instanceof S?e.message:t?`启用未完成 · 稍后重试`:`停用未完成 · 稍后重试`)}}async function de(e){if(await Ke({title:`删除公告`,content:`公告将被删除，不可撤销。`,positiveText:`删除`}))try{await y.remove(e.id),o.success(`公告已删除`),v.value===e.id&&le(),await T(!0),await d.load()}catch(e){o.error(e instanceof S?e.message:`删除未生效`)}}let O=t({pickup_place:``,pickup_hours:``}),k=r(!1),A=r(!1);async function j(){try{let e=await te.get();O.pickup_place=e.pickup_place??``,O.pickup_hours=e.pickup_hours??``,A.value=!0}catch(e){o.error(e instanceof S?e.message:`取件信息读取失败`)}}async function fe(){if(!k.value){k.value=!0;try{await te.save({pickup_place:O.pickup_place.trim()||null,pickup_hours:O.pickup_hours.trim()||null}),o.success(`取件信息已保存 · 学生端可取件卡片与取件邮件同步生效`),await j()}catch(e){o.error(e instanceof S?e.message:`保存未生效`)}finally{k.value=!1}}}return ee(()=>{T(),j()}),(e,t)=>(C(),u(`div`,Kt,[g(Ze,{title:`公告管理`,subtitle:`单条生效 · 发布新公告将停用旧公告`},{actions:a(()=>[g(c(z),{size:`small`,quaternary:``,loading:m.value,onClick:t[0]||=e=>T()},{icon:a(()=>[g(c(Le),{size:15})]),default:a(()=>[t[7]||=x(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),i(`div`,qt,[i(`section`,Jt,[i(`h3`,Yt,[(C(),l(ae(v.value===null?c(Ie):c(Q)),{size:15,style:{color:`var(--accent-text)`}})),x(` `+h(v.value===null?`发布新公告`:`编辑公告 #${v.value}`),1)]),g(c(Z),{label:`公告内容`,"show-feedback":!1},{default:a(()=>[g(c(K),{value:b.content,"onUpdate:value":t[1]||=e=>b.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),i(`div`,Xt,[g(c(Z),{label:`字体`,"show-feedback":!1},{default:a(()=>[g(c(X),{value:b.font_family,"onUpdate:value":t[2]||=e=>b.font_family=e,options:c(ie),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),g(c(Z),{label:`字号`,"show-feedback":!1},{default:a(()=>[g(c(ke),{value:b.font_size,"onUpdate:value":t[3]||=e=>b.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),g(c(Z),{label:`文字颜色`,"show-feedback":!1},{default:a(()=>[g(c(Wt),{value:b.font_color,"onUpdate:value":t[4]||=e=>b.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),i(`div`,Zt,[i(`div`,Qt,[g(c(Me),{size:12}),t[8]||=x(` 预览 `,-1)]),i(`div`,$t,[(C(!0),u(n,null,oe(ce.value,e=>(C(),u(`div`,{key:e.key},[i(`div`,en,h(e.label),1),i(`div`,{class:`border p-3`,style:p({backgroundColor:e.paper,borderColor:e.line})},[i(`p`,{class:`whitespace-pre-wrap break-words`,style:p([se.value,{color:e.ink}])},h(b.content.trim()||`公告内容将在此预览`),5)],4),e.overridden?(C(),u(`p`,tn,` 对比度不足 · 已回退至主题文字色 `)):s(``,!0)]))),128))])]),i(`div`,nn,[g(c(z),{type:`primary`,class:`!font-bold`,loading:ne.value,disabled:!w.value,onClick:E},{icon:a(()=>[g(c(Ne),{size:15})]),default:a(()=>[x(` `+h(v.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),v.value===null?s(``,!0):(C(),l(c(z),{key:0,quaternary:``,onClick:le},{default:a(()=>[...t[9]||=[x(`取消编辑`,-1)]]),_:1}))]),v.value===null?(C(),u(`p`,rn,` 发布后立即生效 · 上一条公告同时停用。 `)):s(``,!0)]),i(`section`,an,[i(`h3`,on,[g(c(Gt),{size:15,style:{color:`var(--accent-text)`}}),t[10]||=x(` 取件信息 `,-1)]),g(c(Z),{label:`取件地点`,"show-feedback":!1},{default:a(()=>[g(c(K),{value:O.pickup_place,"onUpdate:value":t[5]||=e=>O.pickup_place=e,maxlength:120,"show-count":``,disabled:!A.value,placeholder:`例：3 号楼宿管室`},null,8,[`value`,`disabled`])]),_:1}),g(c(Z),{label:`取件时间`,"show-feedback":!1},{default:a(()=>[g(c(K),{value:O.pickup_hours,"onUpdate:value":t[6]||=e=>O.pickup_hours=e,maxlength:120,"show-count":``,disabled:!A.value,placeholder:`例：8:00–22:00`},null,8,[`value`,`disabled`])]),_:1}),i(`div`,sn,[g(c(z),{type:`primary`,class:`!font-bold`,size:`small`,loading:k.value,disabled:!A.value,onClick:fe},{default:a(()=>[...t[11]||=[x(` 保存取件信息 `,-1)]]),_:1},8,[`loading`,`disabled`])]),t[12]||=i(`p`,{class:`mt-3 text-xs text-ink-3`},` 学生端的可取件卡片与取件邮件都会显示这两项 · 留空则不显示。 `,-1)]),i(`section`,cn,[t[15]||=i(`h3`,{class:`mb-3 font-heading text-base font-bold`},[x(` 历史公告 `),i(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),m.value&&!f.value.length?(C(),u(`div`,ln,[(C(),u(n,null,oe(3,e=>g(c(Ae),{key:e,height:`92px`,sharp:!1})),64))])):f.value.length?(C(),l(V,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:a(()=>[(C(!0),u(n,null,oe(f.value,e=>(C(),u(`li`,{key:e.id,class:re([`panel p-3.5`,e.is_active===1&&`border-[var(--accent-tint-border)]`])},[i(`div`,dn,[i(`div`,fn,[i(`p`,{class:`line-clamp-2 text-sm`,style:p({fontFamily:c(Je)[e.font_family]?.css})},h(e.content),5),i(`div`,pn,[i(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:p(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},h(e.is_active===1?`生效中`:`已停用`),5),i(`span`,mn,[x(` #`+h(e.id)+` · `+h(c(Je)[e.font_family]?.label??e.font_family)+` `+h(e.font_size)+`px · `,1),i(`span`,{style:p({color:e.font_color})},h(e.font_color),5)]),i(`span`,hn,h(e.author??`系统`)+` · `+h(c(Ye)(e.update_time)),1)])]),g(c(je),{round:!1,value:e.is_active===1,size:`small`,"onUpdate:value":t=>D(e)},null,8,[`value`,`onUpdate:value`])]),i(`div`,gn,[g(c(z),{size:`tiny`,quaternary:``,onClick:t=>ue(e)},{icon:a(()=>[g(c(Q),{size:12})]),default:a(()=>[t[13]||=x(` 编辑 `,-1)]),_:1},8,[`onClick`]),g(c(z),{size:`tiny`,quaternary:``,onClick:t=>de(e)},{icon:a(()=>[g(c(Re),{size:12})]),default:a(()=>[t[14]||=x(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(C(),u(`div`,un,[g(Xe,{code:`00 / NO NOTICE`,title:`暂无公告记录`,hint:`发布后在此列示`},{icon:a(()=>[g(c(Ne),{size:28})]),_:1})]))])])]))}});export{_n as default};