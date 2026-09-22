import{$ as e,At as t,Dt as n,Et as r,G as i,J as a,K as o,Lt as s,Q as c,W as l,Wt as u,_t as d,at as f,cn as p,ct as m,et as h,g as ee,gt as g,kt as _,ln as v,pt as te,q as ne,qt as y,r as b,sn as re,st as ie,vt as ae,xt as oe,z as se,zt as x}from"./endpoints-DvBasrsZ.js";import{$ as ce,A as le,B as S,E as ue,G as C,Gt as w,H as de,I as T,J as fe,Jt as E,K as pe,Kt as D,L as O,Q as me,R as k,T as he,U as A,V as j,W as ge,X as _e,Y as ve,Yt as M,Z as N,Zt as ye,at as P,ct as be,ft as xe,h as Se,ht as Ce,it as F,k as we,n as I,nn as L,q as R,rn as Te,rt as Ee,st as z,vt as B,w as V}from"./createLucideIcon-Db26embL.js";import{a as De,t as H}from"./Input-BbMbS4NS.js";import{c as U,l as Oe,o as W,s as G}from"./create-CbkBlf1q.js";import{c as K,l as ke,s as q}from"./Scrollbar-CSGBNui4.js";import{i as Ae,t as J}from"./Select-C20XV6Q5.js";import{t as je}from"./use-merged-state-Ba0Wtz3K.js";import{t as Y}from"./FormItem-BhPdBFVZ.js";import{t as Me}from"./InputNumber-BA1RUjRN.js";import{t as Ne}from"./Skeleton-DBvRgrwr.js";import{t as Pe}from"./Switch-D7tAopUJ.js";import{t as Fe}from"./eye-CZdk0uRK.js";import{i as Ie,n as Le,r as Re}from"./paper-Cf5iz7G-.js";import{t as X}from"./pencil-CWs3XmBu.js";import{t as ze}from"./plus-CMzrFqK9.js";import{t as Z}from"./refresh-cw-MlXHdErd.js";import{t as Be}from"./trash-elEPV1JO.js";import{L as Ve,S as He,U as Ue,a as We,ot as Ge,rt as Ke,u as qe}from"./index-8c74NJ4T.js";import{x as Q,y as Je}from"./format-1rjnJmsR.js";import{t as Ye}from"./EmptyState-BecLvEfC.js";import{t as Xe}from"./PageHeader-3QUr1BAY.js";var Ze=D(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[w(`>`,[D(`input`,[w(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),w(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),D(`button`,[w(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[E(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),w(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[E(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),w(`*`,[w(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[w(`>`,[D(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),D(`base-selection`,[D(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),D(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),E(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),w(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[w(`>`,[D(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),D(`base-selection`,[D(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),D(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),E(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),Qe=h({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=xe(e);return be(`-input-group`,Ze,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return g(),a(`div`,{class:F(`${e}-input-group`)},[z(()=>this.$slots.default?.())],2)}});function $e(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function et(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function tt(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=k(A(e));if(o===1){let e=nt([r,i,a]),o=nt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=nt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=nt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function nt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function rt(e){return e=Math.round(e),e>=360?359:e<0?0:e}function it(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var at={rgb:{hex(e){return j(k(e))},hsl(e){let[t,n,r,i]=k(e);return A([...me(t,n,r),i])},hsv(e){let[t,n,r,i]=k(e);return C([...ce(t,n,r),i])}},hex:{rgb(e){return R(k(e))},hsl(e){let[t,n,r,i]=k(e);return A([...me(t,n,r),i])},hsv(e){let[t,n,r,i]=k(e);return C([...ce(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=T(e);return j([...ve(t,n,r),i])},rgb(e){let[t,n,r,i]=T(e);return R([...ve(t,n,r),i])},hsv(e){let[t,n,r,i]=T(e);return C([...fe(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=O(e);return j([...N(t,n,r),i])},rgb(e){let[t,n,r,i]=O(e);return R([...N(t,n,r),i])},hsl(e){let[t,n,r,i]=O(e);return A([..._e(t,n,r),i])}}};function ot(e,t,n){return n||=et(e),n?n===t?e:at[n][t](e):null}var st=[`onMousedown`],ct=`12px`,lt=12,ut=`6px`,dt=h({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=x(null);function n(n){t.value&&e.rgba&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-lt);e.onUpdateAlpha(it(o))}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,railBackgroundImage:l(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return g(),a(`div`,{class:F(`${e}-color-picker-slider`),ref:`railRef`,style:p({height:ct,borderRadius:ut}),onMousedown:this.handleMouseDown},[i(`div`,{style:p({borderRadius:ut,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[i(`div`,{class:F(`${e}-color-picker-checkboard`)},null,2),i(`div`,{class:F(`${e}-color-picker-slider__image`),style:p({backgroundImage:this.railBackgroundImage})},null,6)],4),z(()=>this.rgba&&(g(),a(`div`,{style:p({position:`absolute`,left:ut,right:ut,top:0,bottom:0})},[i(`div`,{class:F(`${e}-color-picker-handle`),style:p({left:`calc(${this.alpha*100}% - ${ut})`,borderRadius:ut,width:ct,height:ct})},[i(`div`,{class:F(`${e}-color-picker-handle__fill`),style:p({backgroundColor:R(this.rgba),borderRadius:ut,width:ct,height:ct})},null,6)],6)],4)))],46,st)}}),ft=Ce(`n-color-picker`);function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function gt(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function _t(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var vt={paddingSmall:`0 4px`},yt=h({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=x(``),{themeRef:r}=f(ft,null);n(()=>{t.value=i()});function i(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function a(e){t.value=e}function o(n){let r,a;switch(e.label){case`HEX`:a=gt(n),a&&e.onUpdateValue(n),t.value=i();break;case`H`:r=mt(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`S`:case`L`:case`V`:r=ht(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`A`:r=_t(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`R`:case`G`:case`B`:r=pt(n),r===!1?t.value=i():e.onUpdateValue(r)}}return{mergedTheme:r,inputValue:t,handleInputChange:o,handleInputUpdateValue:a}},render(){let{mergedTheme:e}=this;return g(),o(H,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:vt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:p(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),bt=[`onClick`],xt=h({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?j:S)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?C:ge)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?R:pe)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?A:de)(i))}}}},render(){let{clsPrefix:t,modes:n}=this;return g(),a(`div`,{class:F(`${t}-color-picker-input`)},[i(`div`,{class:F(`${t}-color-picker-input__mode`),onClick:this.onUpdateMode,style:p({cursor:n.length===1?``:`pointer`})},[z(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,bt),e(Qe,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?j:S)(t)}catch{}return g(),o(yt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(g(),o(yt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),St=[`onClick`,`onKeydown`];function Ct(e,t){if(t===`hsv`){let[t,n,r,i]=O(e);return R([...N(t,n,r),i])}return e}function wt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Tt=h({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=l(()=>e.swatches.map(e=>{let t=et(e);return{value:e,mode:t,legalValue:Ct(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=wt(r):(B(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:ot(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:e}=this;return g(),a(`div`,{class:F(`${e}-color-picker-swatches`)},[z(()=>this.parsedSwatchesRef.map(t=>(g(),a(`div`,{class:F(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[i(`div`,{class:F(`${e}-color-picker-swatch__fill`),style:p({background:t.legalValue})},null,6)],42,St))))],2)}}),Et=[`onClick`],Dt=h({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:n}=f(ft,null);return()=>{let{hsla:r,value:o,clsPrefix:s,onClick:c,disabled:l}=e,u=t.label||n.value;return g(),a(`div`,{class:F([`${s}-color-picker`,l&&`${s}-color-picker--disabled`]),onClick:l?void 0:c},[i(`div`,{class:F(`${s}-color-picker__fill`)},[i(`div`,{class:F(`${s}-color-picker-checkboard`)},null,2),i(`div`,{style:p({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:r?A(r):``})},null,4),o&&r?(g(),a(`div`,{key:0,class:F(`${s}-color-picker__value`),style:p({color:tt(r)?`white`:`black`})},[u?(g(),a(se,{key:0},[z(()=>u(o))],64)):(g(),a(se,{key:1},[z(()=>o)],64))],6)):z(()=>null)],2)],10,Et)}}}),Ot=[`value`,`onChange`],kt=h({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=et(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(ot(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return g(),a(`div`,{class:F(`${e}-color-picker-preview__preview`)},[i(`span`,{class:F(`${e}-color-picker-preview__fill`),style:p({background:this.color||`#000000`})},null,6),i(`input`,{class:F(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Ot)],2)}}),At=[`onMousedown`],jt=`12px`,Mt=12,$=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=h({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=x(null);function n(e){t.value&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=rt((n.clientX-a-Nt)/(i-Mt)*360);e.onUpdateHue(o)}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return g(),a(`div`,{class:F(`${e}-color-picker-slider`),style:p({height:jt,borderRadius:$})},[i(`div`,{ref:`railRef`,style:p({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:jt,borderRadius:$,position:`relative`}),onMousedown:this.handleMouseDown},[i(`div`,{style:p({position:`absolute`,left:$,right:$,top:0,bottom:0})},[i(`div`,{class:F(`${e}-color-picker-handle`),style:p({left:`calc((${this.hue}%) / 359 * 100 - ${$})`,borderRadius:$,width:jt,height:jt})},[i(`div`,{class:F(`${e}-color-picker-handle__fill`),style:p({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:$,width:jt,height:jt})},null,6)],6)],4)],44,At)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=h({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=x(null);function n(e){t.value&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{palleteRef:t,handleColor:l(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return g(),a(`div`,{class:F(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[i(`div`,{class:F(`${e}-color-picker-pallete__layer`),style:p({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),i(`div`,{class:F(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),z(()=>this.rgba&&(g(),a(`div`,{class:F(`${e}-color-picker-handle`),style:p({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[i(`div`,{class:F(`${e}-color-picker-handle__fill`),style:p({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=w([D(`color-picker-panel`,`
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
 `,[Ue(),D(`input`,`
 text-align: center;
 `)]),D(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[w(`&::after`,`
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
 `)]),D(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[E(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),w(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),D(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[E(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),D(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[E(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[M(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),D(`color-picker-preview`,`
 display: flex;
 `,[E(`sliders`,`
 flex: 1 0 auto;
 `),E(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),E(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),E(`input`,`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),D(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[D(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),E(`mode`,`
 width: 72px;
 text-align: center;
 `)]),D(`color-picker-control`,`
 padding: 12px;
 `),D(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[D(`button`,`margin-left: 8px;`)]),D(`color-picker`,`
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
 `,[M(`disabled`,`cursor: not-allowed`),E(`value`,`
 white-space: nowrap;
 position: relative;
 `),E(`fill`,`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),D(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[w(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),D(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[D(`color-picker-swatch`,`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[E(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),w(`&:focus`,`
 outline: none;
 `,[E(`fill`,[w(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Vt={...we.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Oe.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=h({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(e,{slots:t}){let s=null;function c(e){s=e}let f=null,{mergedClsPrefixRef:h,namespaceRef:ee,inlineThemeDisabled:_,mergedComponentPropsRef:v}=xe(e),te=Se(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:v?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:ne,mergedDisabledRef:y}=te,{localeRef:b}=De(`global`),re=we(`ColorPicker`,`-color-picker`,Bt,Ve,e,h);d(ft,{themeRef:re,renderLabelRef:u(e,`renderLabel`),colorPickerSlots:t});let ie=x(e.defaultShow),ae=je(u(e,`show`),ie);function oe(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&he(n,t),r&&he(r,t),ie.value=t}let{defaultValue:w}=e,E=x(w===void 0?$e(e.modes,e.showAlpha):w),D=je(u(e,`value`),E),M=x([D.value]),P=x(0),be=l(()=>et(D.value)),{modes:Ce}=e,L=x(et(D.value)||Ce[0]||`rgb`);function Te(){let{modes:t}=e,{value:n}=L,r=t.findIndex(e=>e===n);~r?L.value=t[(r+1)%t.length]:L.value=`rgb`}let B,V,H,U,W,G,K,q,Ae=l(()=>{let{value:e}=D;if(!e)return null;switch(be.value){case`hsv`:return O(e);case`hsl`:return[B,V,H,q]=T(e),[...fe(B,V,H),q];case`rgb`:case`hex`:return[W,G,K,q]=k(e),[...ce(W,G,K),q]}}),J=l(()=>{let{value:e}=D;if(!e)return null;switch(be.value){case`rgb`:case`hex`:return k(e);case`hsv`:return[B,V,U,q]=O(e),[...N(B,V,U),q];case`hsl`:return[B,V,H,q]=T(e),[...ve(B,V,H),q]}}),Y=l(()=>{let{value:e}=D;if(!e)return null;switch(be.value){case`hsl`:return T(e);case`hsv`:return[B,V,U,q]=O(e),[..._e(B,V,U),q];case`rgb`:case`hex`:return[W,G,K,q]=k(e),[...me(W,G,K),q]}}),Me=l(()=>{switch(L.value){case`rgb`:case`hex`:return J.value;case`hsv`:return Ae.value;case`hsl`:return Y.value}}),Ne=x(0),Pe=x(1),Fe=x([0,0]);function Ie(t,n){let{value:r}=Ae,i=Ne.value,a=r?r[3]:1;Fe.value=[t,n];let{showAlpha:o}=e;switch(L.value){case`hsv`:X((o?C:ge)([i,t,n,a]),`cursor`);break;case`hsl`:X((o?A:de)([..._e(i,t,n),a]),`cursor`);break;case`rgb`:X((o?R:pe)([...N(i,t,n),a]),`cursor`);break;case`hex`:X((o?j:S)([...N(i,t,n),a]),`cursor`)}}function Le(t){Ne.value=t;let{value:n}=Ae;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=e;switch(L.value){case`hsv`:X((o?C:ge)([t,r,i,a]),`cursor`);break;case`rgb`:X((o?R:pe)([...N(t,r,i),a]),`cursor`);break;case`hex`:X((o?j:S)([...N(t,r,i),a]),`cursor`);break;case`hsl`:X((o?A:de)([..._e(t,r,i),a]),`cursor`)}}function Re(e){switch(L.value){case`hsv`:[B,V,U]=Ae.value,X(C([B,V,U,e]),`cursor`);break;case`rgb`:[W,G,K]=J.value,X(R([W,G,K,e]),`cursor`);break;case`hex`:[W,G,K]=J.value,X(j([W,G,K,e]),`cursor`);break;case`hsl`:[B,V,H]=Y.value,X(A([B,V,H,e]),`cursor`)}Pe.value=e}function X(t,n){f=n===`cursor`?t:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=te,{onUpdateValue:a,"onUpdate:value":o}=e;a&&he(a,t),o&&he(o,t),r(),i(),E.value=t}function ze(e){X(e,`input`),m(Z)}function Z(t=!0){let{value:n}=D;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=te,{onComplete:a}=e;a&&a(n);let{value:o}=M,{value:s}=P;t&&(o.splice(s+1,o.length,n),P.value=s+1),r(),i()}}function Be(){let{value:e}=P;e-1<0||(X(M.value[e-1],`input`),Z(!1),P.value=e-1)}function He(){let{value:e}=P;e<0||e+1>=M.value.length||(X(M.value[e+1],`input`),Z(!1),P.value=e+1)}function Ue(){X(null,`input`);let{onClear:t}=e;t&&t(),oe(!1)}function We(){let{value:t}=D,{onConfirm:n}=e;n&&n(t),oe(!1)}let Ge=l(()=>P.value>=1),Ke=l(()=>{let{value:e}=M;return e.length>1&&P.value<e.length-1});r(ae,e=>{e||(M.value=[D.value],P.value=0)}),n(()=>{if(!(f&&f===D.value)){let{value:e}=Ae;e&&(Ne.value=e[0],Pe.value=e[3],Fe.value=[e[1],e[2]])}f=null});let qe=l(()=>{let{value:e}=ne,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[ye(`height`,e)]:l,[ye(`fontSize`,e)]:u}}=re.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),Q=_?le(`color-picker`,l(()=>ne.value[0]),qe,e):void 0;function Je(){let{value:n}=J,{value:r}=Ne,{internalActions:s,modes:c,actions:l}=e,{value:u}=re,{value:d}=h;return(()=>{let f=Ee(`550d4636453f407b`);return g(),a(`div`,{class:F([`${d}-color-picker-panel`,Q?.themeClass.value]),onDragstart:f[0]||=e=>{e.preventDefault()},style:p(_?void 0:qe.value)},[i(`div`,{class:F(`${d}-color-picker-control`)},[(g(),o(zt,{clsPrefix:d,rgba:n,displayedHue:r,displayedSv:Fe.value,onUpdateSV:Ie,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),i(`div`,{class:F(`${d}-color-picker-preview`)},[i(`div`,{class:F(`${d}-color-picker-preview__sliders`)},[(g(),o(Ft,{clsPrefix:d,hue:r,onUpdateHue:Le,onComplete:Z},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),e.showAlpha?(g(),o(dt,{key:0,clsPrefix:d,rgba:n,alpha:Pe.value,onUpdateAlpha:Re,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):z(()=>null)],2),e.showPreview?(g(),o(kt,{key:0,clsPrefix:d,mode:L.value,color:J.value&&S(J.value),onUpdateColor:f[1]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):z(()=>null)],2),(g(),o(xt,{clsPrefix:d,showAlpha:e.showAlpha,mode:L.value,modes:c,onUpdateMode:Te,value:D.value,valueArr:Me.value,onUpdateValue:ze},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),z(()=>e.swatches?.length&&(()=>{let t=Ee(`1de0b88852ebf5cb`);return g(),o(Tt,{clsPrefix:d,mode:L.value,swatches:e.swatches,onUpdateColor:t[0]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),l?.length?(g(),a(`div`,{key:0,class:F(`${d}-color-picker-action`)},[z(()=>l.includes(`confirm`)&&(g(),o(I,{size:`small`,onClick:We,theme:u.peers.Button,themeOverrides:u.peerOverrides.Button},{default:()=>b.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),z(()=>l.includes(`clear`)&&(g(),o(I,{size:`small`,onClick:Ue,disabled:!D.value,theme:u.peers.Button,themeOverrides:u.peerOverrides.Button},{default:()=>b.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):z(()=>null),t.action?(g(),a(`div`,{key:2,class:F(`${d}-color-picker-action`)},[z(()=>t.action?.())],2)):(g(),a(se,{key:3},[s?(g(),a(`div`,{key:0,class:F(`${d}-color-picker-action`)},[z(()=>s.includes(`undo`)&&(g(),o(I,{size:`small`,onClick:Be,disabled:!Ge.value,theme:u.peers.Button,themeOverrides:u.peerOverrides.Button},{default:()=>b.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),z(()=>s.includes(`redo`)&&(g(),o(I,{size:`small`,onClick:He,disabled:!Ke.value,theme:u.peers.Button,themeOverrides:u.peerOverrides.Button},{default:()=>b.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):z(()=>null)],64))],38)})()}return{mergedClsPrefix:h,namespace:ee,hsla:Y,rgba:J,mergedShow:ae,mergedDisabled:y,isMounted:ue(),adjustedTo:Oe(e),mergedValue:D,handleTriggerClick(){y.value||oe(!0)},setTriggerRef:c,handleClickOutside(e){if(s instanceof Element){if(s.contains(ke(e)))return}else if(s&&s.$el.contains(ke(e)))return;oe(!1)},renderPanel:Je,cssVars:_?void 0:qe,themeClass:Q?.themeClass,onRender:Q?.onRender}},render(){let{mergedClsPrefix:e,onRender:n}=this;return n?.(),g(),o(U,null,{default:()=>[(g(),o(G,null,{default:()=>{let t=ie(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=Ae([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),V(this.$slots.trigger,Ge(t,[`value`,`onClick`,`ref`]),n=>n||(g(),o(Dt,ie(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(g(),o(W,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Oe.tdkey,to:this.adjustedTo},{_:1,default:P(()=>(g(),o(L,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:P(()=>this.mergedShow?t(this.renderPanel(),[[Ke,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},Qt={key:0,class:`mt-1 text-xs text-ink-3`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-xs text-ink-3`},tn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},nn={key:0,class:`flex flex-col gap-2`},rn={key:1,class:`panel grid place-items-center py-12`},an={class:`flex items-start justify-between gap-3`},on={class:`min-w-0 flex-1`},sn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},cn={class:`tnum text-xs text-ink-3`},ln={class:`text-xs text-ink-3`},un={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},dn=h({__name:`AnnouncementsView`,setup(t){let n=He(),r=Re(),u=x([]),d=x(!0),f=x(!1),m=x(null),h=s({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ie=Object.keys(Q).map(e=>({label:Q[e].label,value:e})),ce=l(()=>({fontFamily:Q[h.font_family].css,fontSize:`${h.font_size}px`})),le=l(()=>[`light`,`dark`].map(e=>{let t=Le()[e],n=We(t.paper,h.font_color,h.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:h.font_color,overridden:n}})),S=l(()=>h.content.trim().length>0&&!f.value);function ue(){m.value=null,h.content=``,h.font_family=`system`,h.font_size=15,h.font_color=`#1f2328`}async function C(e=!1){e||(d.value=!0);try{let e=await b.list();u.value=e.announcements}catch(e){n.error(e instanceof ee?e.message:`公告读取失败`)}finally{d.value=!1}}async function w(){if(!S.value)return;f.value=!0;let e={content:h.content.trim(),font_family:h.font_family,font_size:h.font_size,font_color:h.font_color};try{m.value===null?(await b.create(e),n.success(`公告已发布 · 旧公告已停用`)):(await b.update(m.value,e),n.success(`公告已更新`)),ue(),await C(!0),await r.load()}catch(e){n.error(e instanceof ee?e.message:`保存未生效`)}finally{f.value=!1}}function de(e){m.value=e.id,h.content=e.content,h.font_family=e.font_family,h.font_size=e.font_size,h.font_color=e.font_color}async function T(e){let t=e.is_active!==1;try{await b.setActive(e.id,t),n.success(t?`公告已启用 · 学生端可见`:`公告已停用 · 学生端不再显示`),await C(!0),await r.load()}catch(e){n.error(e instanceof ee?e.message:t?`启用未完成 · 稍后重试`:`停用未完成 · 稍后重试`)}}async function fe(e){if(await qe({title:`删除公告`,content:`公告将被删除，不可撤销。`,positiveText:`删除`}))try{await b.remove(e.id),n.success(`公告已删除`),m.value===e.id&&ue(),await C(!0),await r.load()}catch(e){n.error(e instanceof ee?e.message:`删除未生效`)}}return te(C),(t,n)=>(g(),a(`div`,Ut,[e(Xe,{title:`公告管理`,subtitle:`单条生效 · 发布新公告将停用旧公告`},{actions:_(()=>[e(y(I),{size:`small`,quaternary:``,loading:d.value,onClick:n[0]||=e=>C()},{icon:_(()=>[e(y(Z),{size:15})]),default:_(()=>[n[5]||=c(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),i(`div`,Wt,[i(`section`,Gt,[i(`h3`,Kt,[(g(),o(oe(m.value===null?y(ze):y(X)),{size:15,style:{color:`var(--accent-text)`}})),c(` `+v(m.value===null?`发布新公告`:`编辑公告 #${m.value}`),1)]),e(y(Y),{label:`公告内容`,"show-feedback":!1},{default:_(()=>[e(y(H),{value:h.content,"onUpdate:value":n[1]||=e=>h.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),i(`div`,qt,[e(y(Y),{label:`字体`,"show-feedback":!1},{default:_(()=>[e(y(J),{value:h.font_family,"onUpdate:value":n[2]||=e=>h.font_family=e,options:y(ie),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),e(y(Y),{label:`字号`,"show-feedback":!1},{default:_(()=>[e(y(Me),{value:h.font_size,"onUpdate:value":n[3]||=e=>h.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),e(y(Y),{label:`文字颜色`,"show-feedback":!1},{default:_(()=>[e(y(Ht),{value:h.font_color,"onUpdate:value":n[4]||=e=>h.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),i(`div`,Jt,[i(`div`,Yt,[e(y(Fe),{size:12}),n[6]||=c(` 预览 `,-1)]),i(`div`,Xt,[(g(!0),a(se,null,ae(le.value,e=>(g(),a(`div`,{key:e.key},[i(`div`,Zt,v(e.label),1),i(`div`,{class:`border p-3`,style:p({backgroundColor:e.paper,borderColor:e.line})},[i(`p`,{class:`whitespace-pre-wrap break-words`,style:p([ce.value,{color:e.ink}])},v(h.content.trim()||`公告内容将在此预览`),5)],4),e.overridden?(g(),a(`p`,Qt,` 对比度不足 · 已回退至主题文字色 `)):ne(``,!0)]))),128))])]),i(`div`,$t,[e(y(I),{type:`primary`,class:`!font-bold`,loading:f.value,disabled:!S.value,onClick:w},{icon:_(()=>[e(y(Ie),{size:15})]),default:_(()=>[c(` `+v(m.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),m.value===null?ne(``,!0):(g(),o(y(I),{key:0,quaternary:``,onClick:ue},{default:_(()=>[...n[7]||=[c(`取消编辑`,-1)]]),_:1}))]),m.value===null?(g(),a(`p`,en,` 发布后立即生效 · 上一条公告同时停用。 `)):ne(``,!0)]),i(`section`,tn,[n[10]||=i(`h3`,{class:`mb-3 font-heading text-base font-bold`},[c(` 历史公告 `),i(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),d.value&&!u.value.length?(g(),a(`div`,nn,[(g(),a(se,null,ae(3,t=>e(y(Ne),{key:t,height:`92px`,sharp:!1})),64))])):u.value.length?(g(),o(Te,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:_(()=>[(g(!0),a(se,null,ae(u.value,t=>(g(),a(`li`,{key:t.id,class:re([`panel p-3.5`,t.is_active===1&&`border-[var(--accent-tint-border)]`])},[i(`div`,an,[i(`div`,on,[i(`p`,{class:`line-clamp-2 text-sm`,style:p({fontFamily:y(Q)[t.font_family]?.css})},v(t.content),5),i(`div`,sn,[i(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:p(t.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},v(t.is_active===1?`生效中`:`已停用`),5),i(`span`,cn,[c(` #`+v(t.id)+` · `+v(y(Q)[t.font_family]?.label??t.font_family)+` `+v(t.font_size)+`px · `,1),i(`span`,{style:p({color:t.font_color})},v(t.font_color),5)]),i(`span`,ln,v(t.author??`系统`)+` · `+v(y(Je)(t.update_time)),1)])]),e(y(Pe),{round:!1,value:t.is_active===1,size:`small`,"onUpdate:value":e=>T(t)},null,8,[`value`,`onUpdate:value`])]),i(`div`,un,[e(y(I),{size:`tiny`,quaternary:``,onClick:e=>de(t)},{icon:_(()=>[e(y(X),{size:12})]),default:_(()=>[n[8]||=c(` 编辑 `,-1)]),_:1},8,[`onClick`]),e(y(I),{size:`tiny`,quaternary:``,onClick:e=>fe(t)},{icon:_(()=>[e(y(Be),{size:12})]),default:_(()=>[n[9]||=c(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(g(),a(`div`,rn,[e(Ye,{code:`00 / NO NOTICE`,title:`暂无公告记录`,hint:`发布后在此列示`},{icon:_(()=>[e(y(Ie),{size:28})]),_:1})]))])])]))}});export{dn as default};