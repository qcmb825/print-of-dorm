import{At as e,Bt as t,H as n,Ht as r,J as i,Mt as a,Nt as o,X as s,Xt as c,Y as l,Z as u,bt as d,ct as f,dn as p,dt as m,fn as h,gt as ee,h as te,kt as ne,nt as g,q as _,qt as v,r as re,rt as y,tt as b,un as ie,ut as ae,wt as oe,xt as se,y as x,yt as S}from"./endpoints-b5Af9CM_.js";import{$ as ce,$t as C,A as w,Ct as T,F as le,G as ue,H as E,I as de,J as D,K as O,L as k,M as fe,P as pe,Q as A,U as j,W as M,X as N,Xt as P,Y as me,Z as he,Zt as F,_t as ge,bt as _e,c as I,cn as L,ct as ve,d as R,en as z,et as ye,ft as B,it as be,j as xe,l as V,lt as H,nn as Se,nt as U,pt as W,q as Ce,rt as we,sn as G,tt as Te,ut as K,x as Ee}from"./motion-B_h_1Mmt.js";import{n as q,o as De,t as J}from"./Input-DQKl3xSF.js";import{c as Y,l as Oe,o as ke,s as Ae}from"./create-By2Tyq9y.js";import{a as je,t as Me}from"./Select-DjVm1mD8.js";import{t as Ne}from"./use-merged-state-CDvziyPh.js";import{t as X}from"./FormItem-Q0Af9sqb.js";import{t as Pe}from"./InputNumber-CL9Jq1i-.js";import{t as Fe}from"./Switch-BahVSvd0.js";import{t as Ie}from"./Skeleton-Dt3d2utW.js";import{t as Z}from"./eye-qV5PkN8p.js";import{n as Le,r as Q,t as Re}from"./paper-B09BwjXs.js";import{t as ze}from"./pencil-meOV_1nU.js";import{t as Be}from"./plus-C9YbtYBU.js";import{t as Ve}from"./refresh-cw-aYoGQSHb.js";import{t as He}from"./trash-Dc5epi5J.js";import{$ as Ue,B as We,F as Ge,G as $,K as Ke,c as qe,f as Je,r as Ye,y as Xe}from"./index-BPOSqwbL.js";import{x as Ze,y as Qe}from"./format-DaAKFgUZ.js";import{t as $e}from"./EmptyState-DbDQ8R3f.js";import{t as et}from"./PageHeader-xiNYgX1K.js";var tt=F(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[P(`>`,[F(`input`,[P(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),P(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),F(`button`,[P(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[C(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),P(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[C(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),P(`*`,[P(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[P(`>`,[F(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),F(`base-selection`,[F(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),F(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),C(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),P(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[P(`>`,[F(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),F(`base-selection`,[F(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),F(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),C(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),nt=y({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=ge(e);return W(`-input-group`,tt,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return S(),u(`div`,{class:H(`${e}-input-group`)},[B(()=>this.$slots.default?.())],2)}});function rt(e){let{fontSize:t,boxShadow2:n,popoverColor:r,textColor2:i,borderRadius:a,borderColor:o,heightSmall:s,heightMedium:c,heightLarge:l,fontSizeSmall:u,fontSizeMedium:d,fontSizeLarge:f,dividerColor:p}=e;return{panelFontSize:t,boxShadow:n,color:r,textColor:i,borderRadius:a,border:`1px solid ${o}`,heightSmall:s,heightMedium:c,heightLarge:l,fontSizeSmall:u,fontSizeMedium:d,fontSizeLarge:f,dividerColor:p}}var it=pe({name:`ColorPicker`,common:k,peers:{Input:q,Button:R},self:rt});function at(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function ot(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function st(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=M(D(e));if(o===1){let e=ct([r,i,a]),o=ct(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=ct([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=ct(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function ct(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function lt(e){return e=Math.round(e),e>=360?359:e<0?0:e}function ut(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var dt={rgb:{hex(e){return O(M(e))},hsl(e){let[t,n,r,i]=M(e);return D([...we(t,n,r),i])},hsv(e){let[t,n,r,i]=M(e);return N([...be(t,n,r),i])}},hex:{rgb(e){return A(M(e))},hsl(e){let[t,n,r,i]=M(e);return D([...we(t,n,r),i])},hsv(e){let[t,n,r,i]=M(e);return N([...be(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=E(e);return O([...ye(t,n,r),i])},rgb(e){let[t,n,r,i]=E(e);return A([...ye(t,n,r),i])},hsv(e){let[t,n,r,i]=E(e);return N([...ce(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=j(e);return O([...U(t,n,r),i])},rgb(e){let[t,n,r,i]=j(e);return A([...U(t,n,r),i])},hsl(e){let[t,n,r,i]=j(e);return D([...Te(t,n,r),i])}}};function ft(e,t,n){return n||=ot(e),n?n===t?e:dt[n][t](e):null}var pt=[`onMousedown`],mt=`12px`,ht=12,gt=`6px`,_t=y({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(n){t.value&&e.rgba&&(Ke(`mousemove`,document,i),Ke(`mouseup`,document,a),i(n))}function i(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-ht);e.onUpdateAlpha(ut(o))}function a(){$(`mousemove`,document,i),$(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,railBackgroundImage:_(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return S(),u(`div`,{class:H(`${e}-color-picker-slider`),ref:`railRef`,style:p({height:mt,borderRadius:gt}),onMousedown:this.handleMouseDown},[i(`div`,{style:p({borderRadius:gt,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[i(`div`,{class:H(`${e}-color-picker-checkboard`)},null,2),i(`div`,{class:H(`${e}-color-picker-slider__image`),style:p({backgroundImage:this.railBackgroundImage})},null,6)],4),B(()=>this.rgba&&(S(),u(`div`,{style:p({position:`absolute`,left:gt,right:gt,top:0,bottom:0})},[i(`div`,{class:H(`${e}-color-picker-handle`),style:p({left:`calc(${this.alpha*100}% - ${gt})`,borderRadius:gt,width:mt,height:mt})},[i(`div`,{class:H(`${e}-color-picker-handle__fill`),style:p({backgroundColor:A(this.rgba),borderRadius:gt,width:mt,height:mt})},null,6)],6)],4)))],46,pt)}}),vt=_e(`n-color-picker`);function yt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function bt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function xt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function St(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function Ct(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var wt={paddingSmall:`0 4px`},Tt=y({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(t){let n=r(``),{themeRef:i}=f(vt,null);e(()=>{n.value=a()});function a(){let{value:e}=t;if(e===null)return``;let{label:n}=t;return n===`HEX`?e:n===`A`?`${Math.floor(e*100)}%`:String(Math.floor(e))}function o(e){n.value=e}function s(e){let r,i;switch(t.label){case`HEX`:i=St(e),i&&t.onUpdateValue(e),n.value=a();break;case`H`:r=bt(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`S`:case`L`:case`V`:r=xt(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`A`:r=Ct(e),r===!1?n.value=a():t.onUpdateValue(r);break;case`R`:case`G`:case`B`:r=yt(e),r===!1?n.value=a():t.onUpdateValue(r)}}return{mergedTheme:i,inputValue:n,handleInputChange:s,handleInputUpdateValue:o}},render(){let{mergedTheme:e}=this;return S(),l(J,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:wt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:p(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),Et=[`onClick`],Dt=y({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?O:ue)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?N:me)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?A:he)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?D:Ce)(i))}}}},render(){let{clsPrefix:e,modes:t}=this;return S(),u(`div`,{class:H(`${e}-color-picker-input`)},[i(`div`,{class:H(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:p({cursor:t.length===1?``:`pointer`})},[B(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,Et),g(nt,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?O:ue)(t)}catch{}return S(),l(Tt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(S(),l(Tt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),Ot=[`onClick`,`onKeydown`];function kt(e,t){if(t===`hsv`){let[t,n,r,i]=j(e);return A([...U(t,n,r),i])}return e}function At(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var jt=y({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=_(()=>e.swatches.map(e=>{let t=ot(e);return{value:e,mode:t,legalValue:kt(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=At(r):(T(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:ft(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:e}=this;return S(),u(`div`,{class:H(`${e}-color-picker-swatches`)},[B(()=>this.parsedSwatchesRef.map(t=>(S(),u(`div`,{class:H(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[i(`div`,{class:H(`${e}-color-picker-swatch__fill`),style:p({background:t.legalValue})},null,6)],42,Ot))))],2)}}),Mt=[`onClick`],Nt=y({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:r}=f(vt,null);return()=>{let{hsla:a,value:o,clsPrefix:s,onClick:c,disabled:l}=e,d=t.label||r.value;return S(),u(`div`,{class:H([`${s}-color-picker`,l&&`${s}-color-picker--disabled`]),onClick:l?void 0:c},[i(`div`,{class:H(`${s}-color-picker__fill`)},[i(`div`,{class:H(`${s}-color-picker-checkboard`)},null,2),i(`div`,{style:p({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:a?D(a):``})},null,4),o&&a?(S(),u(`div`,{key:0,class:H(`${s}-color-picker__value`),style:p({color:st(a)?`white`:`black`})},[d?(S(),u(n,{key:0},[B(()=>d(o))],64)):(S(),u(n,{key:1},[B(()=>o)],64))],6)):B(()=>null)],2)],10,Mt)}}}),Pt=[`value`,`onChange`],Ft=y({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=ot(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(ft(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return S(),u(`div`,{class:H(`${e}-color-picker-preview__preview`)},[i(`span`,{class:H(`${e}-color-picker-preview__fill`),style:p({background:this.color||`#000000`})},null,6),i(`input`,{class:H(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Pt)],2)}}),It=[`onMousedown`],Lt=`12px`,Rt=12,zt=`6px`,Bt=6,Vt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ht=y({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(e){t.value&&(Ke(`mousemove`,document,i),Ke(`mouseup`,document,a),i(e))}function i(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=lt((n.clientX-a-Bt)/(i-Rt)*360);e.onUpdateHue(o)}function a(){$(`mousemove`,document,i),$(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return S(),u(`div`,{class:H(`${e}-color-picker-slider`),style:p({height:Lt,borderRadius:zt})},[i(`div`,{ref:`railRef`,style:p({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Vt,height:Lt,borderRadius:zt,position:`relative`}),onMousedown:this.handleMouseDown},[i(`div`,{style:p({position:`absolute`,left:zt,right:zt,top:0,bottom:0})},[i(`div`,{class:H(`${e}-color-picker-handle`),style:p({left:`calc((${this.hue}%) / 359 * 100 - ${zt})`,borderRadius:zt,width:Lt,height:Lt})},[i(`div`,{class:H(`${e}-color-picker-handle__fill`),style:p({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:zt,width:Lt,height:Lt})},null,6)],6)],4)],44,It)],6)}}),Ut=[`onMousedown`],Wt=`12px`,Gt=`6px`,Kt=y({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=r(null);function n(e){t.value&&(Ke(`mousemove`,document,i),Ke(`mouseup`,document,a),i(e))}function i(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function a(){$(`mousemove`,document,i),$(`mouseup`,document,a),e.onComplete?.()}return{palleteRef:t,handleColor:_(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return S(),u(`div`,{class:H(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[i(`div`,{class:H(`${e}-color-picker-pallete__layer`),style:p({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),i(`div`,{class:H(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),B(()=>this.rgba&&(S(),u(`div`,{class:H(`${e}-color-picker-handle`),style:p({width:Wt,height:Wt,borderRadius:Gt,left:`calc(${this.displayedSv[0]}% - ${Gt})`,bottom:`calc(${this.displayedSv[1]}% - ${Gt})`})},[i(`div`,{class:H(`${e}-color-picker-handle__fill`),style:p({backgroundColor:this.handleColor,borderRadius:Gt,width:Wt,height:Wt})},null,6)],6)))],42,Ut)}}),qt=P([F(`color-picker-panel`,`
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
 `,[Xe(),F(`input`,`
 text-align: center;
 `)]),F(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[P(`&::after`,`
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
 `)]),F(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[C(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),P(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),F(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[C(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),F(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[C(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[z(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),F(`color-picker-preview`,`
 display: flex;
 `,[C(`sliders`,`
 flex: 1 0 auto;
 `),C(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),C(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),C(`input`,`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),F(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[F(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),C(`mode`,`
 width: 72px;
 text-align: center;
 `)]),F(`color-picker-control`,`
 padding: 12px;
 `),F(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[F(`button`,`margin-left: 8px;`)]),F(`color-picker`,`
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
 `,[z(`disabled`,`cursor: not-allowed`),C(`value`,`
 white-space: nowrap;
 position: relative;
 `),C(`fill`,`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),F(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[P(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),F(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[F(`color-picker-swatch`,`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[C(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),P(`&:focus`,`
 outline: none;
 `,[C(`fill`,[P(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Jt={...le.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Oe.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Yt=y({name:`ColorPicker`,inheritAttrs:!1,props:Jt,slots:Object,setup(t,{slots:a}){let o=null;function s(e){o=e}let c=null,{mergedClsPrefixRef:f,namespaceRef:h,inlineThemeDisabled:ee,mergedComponentPropsRef:te}=ge(t),g=Ee(t,{mergedSize:e=>{let{size:n}=t;if(n)return n;let{mergedSize:r}=e||{};return r?.value?r.value:te?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:re,mergedDisabledRef:y}=g,{localeRef:b}=De(`global`),ie=le(`ColorPicker`,`-color-picker`,qt,it,t,f);d(vt,{themeRef:ie,renderLabelRef:v(t,`renderLabel`),colorPickerSlots:a});let ae=r(t.defaultShow),oe=Ne(v(t,`show`),ae);function se(e){let{onUpdateShow:n,"onUpdate:show":r}=t;n&&xe(n,e),r&&xe(r,e),ae.value=e}let{defaultValue:x}=t,C=r(x===void 0?at(t.modes,t.showAlpha):x),w=Ne(v(t,`value`),C),T=r([w.value]),k=r(0),pe=_(()=>ot(w.value)),{modes:P}=t,F=r(ot(w.value)||P[0]||`rgb`);function _e(){let{modes:e}=t,{value:n}=F,r=e.findIndex(e=>e===n);~r?F.value=e[(r+1)%e.length]:F.value=`rgb`}let I,L,R,z,W,G,K,q,J=_(()=>{let{value:e}=w;if(!e)return null;switch(pe.value){case`hsv`:return j(e);case`hsl`:return[I,L,R,q]=E(e),[...ce(I,L,R),q];case`rgb`:case`hex`:return[W,G,K,q]=M(e),[...be(W,G,K),q]}}),Y=_(()=>{let{value:e}=w;if(!e)return null;switch(pe.value){case`rgb`:case`hex`:return M(e);case`hsv`:return[I,L,z,q]=j(e),[...U(I,L,z),q];case`hsl`:return[I,L,R,q]=E(e),[...ye(I,L,R),q]}}),ke=_(()=>{let{value:e}=w;if(!e)return null;switch(pe.value){case`hsl`:return E(e);case`hsv`:return[I,L,z,q]=j(e),[...Te(I,L,z),q];case`rgb`:case`hex`:return[W,G,K,q]=M(e),[...we(W,G,K),q]}}),Ae=_(()=>{switch(F.value){case`rgb`:case`hex`:return Y.value;case`hsv`:return J.value;case`hsl`:return ke.value}}),je=r(0),Me=r(1),X=r([0,0]);function Pe(e,n){let{value:r}=J,i=je.value,a=r?r[3]:1;X.value=[e,n];let{showAlpha:o}=t;switch(F.value){case`hsv`:Z((o?N:me)([i,e,n,a]),`cursor`);break;case`hsl`:Z((o?D:Ce)([...Te(i,e,n),a]),`cursor`);break;case`rgb`:Z((o?A:he)([...U(i,e,n),a]),`cursor`);break;case`hex`:Z((o?O:ue)([...U(i,e,n),a]),`cursor`)}}function Fe(e){je.value=e;let{value:n}=J;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=t;switch(F.value){case`hsv`:Z((o?N:me)([e,r,i,a]),`cursor`);break;case`rgb`:Z((o?A:he)([...U(e,r,i),a]),`cursor`);break;case`hex`:Z((o?O:ue)([...U(e,r,i),a]),`cursor`);break;case`hsl`:Z((o?D:Ce)([...Te(e,r,i),a]),`cursor`)}}function Ie(e){switch(F.value){case`hsv`:[I,L,z]=J.value,Z(N([I,L,z,e]),`cursor`);break;case`rgb`:[W,G,K]=Y.value,Z(A([W,G,K,e]),`cursor`);break;case`hex`:[W,G,K]=Y.value,Z(O([W,G,K,e]),`cursor`);break;case`hsl`:[I,L,R]=ke.value,Z(D([I,L,R,e]),`cursor`)}Me.value=e}function Z(e,n){c=n===`cursor`?e:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=g,{onUpdateValue:a,"onUpdate:value":o}=t;a&&xe(a,e),o&&xe(o,e),r(),i(),C.value=e}function Le(e){Z(e,`input`),m(Q)}function Q(e=!0){let{value:n}=w;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=g,{onComplete:a}=t;a&&a(n);let{value:o}=T,{value:s}=k;e&&(o.splice(s+1,o.length,n),k.value=s+1),r(),i()}}function Re(){let{value:e}=k;e-1<0||(Z(T.value[e-1],`input`),Q(!1),k.value=e-1)}function ze(){let{value:e}=k;e<0||e+1>=T.value.length||(Z(T.value[e+1],`input`),Q(!1),k.value=e+1)}function Be(){Z(null,`input`);let{onClear:e}=t;e&&e(),se(!1)}function Ve(){let{value:e}=w,{onConfirm:n}=t;n&&n(e),se(!1)}let He=_(()=>k.value>=1),We=_(()=>{let{value:e}=T;return e.length>1&&k.value<e.length-1});ne(oe,e=>{e||(T.value=[w.value],k.value=0)}),e(()=>{if(!(c&&c===w.value)){let{value:e}=J;e&&(je.value=e[0],Me.value=e[3],X.value=[e[1],e[2]])}c=null});let Ge=_(()=>{let{value:e}=re,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[Se(`height`,e)]:l,[Se(`fontSize`,e)]:u}}=ie.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),$=ee?de(`color-picker`,_(()=>re.value[0]),Ge,t):void 0;function Ke(){let{value:e}=Y,{value:r}=je,{internalActions:o,modes:s,actions:c}=t,{value:d}=ie,{value:m}=f;return(()=>{let f=ve(`550d4636453f407b`);return S(),u(`div`,{class:H([`${m}-color-picker-panel`,$?.themeClass.value]),onDragstart:f[0]||=e=>{e.preventDefault()},style:p(ee?void 0:Ge.value)},[i(`div`,{class:H(`${m}-color-picker-control`)},[(S(),l(Kt,{clsPrefix:m,rgba:e,displayedHue:r,displayedSv:X.value,onUpdateSV:Pe,onComplete:Q},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),i(`div`,{class:H(`${m}-color-picker-preview`)},[i(`div`,{class:H(`${m}-color-picker-preview__sliders`)},[(S(),l(Ht,{clsPrefix:m,hue:r,onUpdateHue:Fe,onComplete:Q},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),t.showAlpha?(S(),l(_t,{key:0,clsPrefix:m,rgba:e,alpha:Me.value,onUpdateAlpha:Ie,onComplete:Q},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):B(()=>null)],2),t.showPreview?(S(),l(Ft,{key:0,clsPrefix:m,mode:F.value,color:Y.value&&ue(Y.value),onUpdateColor:f[1]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):B(()=>null)],2),(S(),l(Dt,{clsPrefix:m,showAlpha:t.showAlpha,mode:F.value,modes:s,onUpdateMode:_e,value:w.value,valueArr:Ae.value,onUpdateValue:Le},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),B(()=>t.swatches?.length&&(()=>{let e=ve(`1de0b88852ebf5cb`);return S(),l(jt,{clsPrefix:m,mode:F.value,swatches:t.swatches,onUpdateColor:e[0]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),c?.length?(S(),u(`div`,{key:0,class:H(`${m}-color-picker-action`)},[B(()=>c.includes(`confirm`)&&(S(),l(V,{size:`small`,onClick:Ve,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>b.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),B(()=>c.includes(`clear`)&&(S(),l(V,{size:`small`,onClick:Be,disabled:!w.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>b.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):B(()=>null),a.action?(S(),u(`div`,{key:2,class:H(`${m}-color-picker-action`)},[B(()=>a.action?.())],2)):(S(),u(n,{key:3},[o?(S(),u(`div`,{key:0,class:H(`${m}-color-picker-action`)},[B(()=>o.includes(`undo`)&&(S(),l(V,{size:`small`,onClick:Re,disabled:!He.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>b.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),B(()=>o.includes(`redo`)&&(S(),l(V,{size:`small`,onClick:ze,disabled:!We.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>b.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):B(()=>null)],64))],38)})()}return{mergedClsPrefix:f,namespace:h,hsla:ke,rgba:Y,mergedShow:oe,mergedDisabled:y,isMounted:fe(),adjustedTo:Oe(t),mergedValue:w,handleTriggerClick(){y.value||se(!0)},setTriggerRef:s,handleClickOutside(e){if(o instanceof Element){if(o.contains(Ue(e)))return}else if(o&&o.$el.contains(Ue(e)))return;se(!1)},renderPanel:Ke,cssVars:ee?void 0:Ge,themeClass:$?.themeClass,onRender:$?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),S(),l(Y,null,{default:()=>[(S(),l(Ae,null,{default:()=>{let t=ae(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=je([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),w(this.$slots.trigger,We(t,[`value`,`onClick`,`ref`]),n=>n||(S(),l(Nt,ae(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(S(),l(ke,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Oe.tdkey,to:this.adjustedTo},{_:1,default:K(()=>(S(),l(G,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:K(()=>this.mergedShow?o(this.renderPanel(),[[Ge,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Xt=I({name:`map-pin`,size:24,node:[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]}),Zt={class:`mx-auto max-w-[1400px]`},Qt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},$t={class:`panel h-fit p-4`},en={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},tn={class:`grid grid-cols-2 gap-3`},nn={class:`mb-3`},rn={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},an={key:0,class:`mt-1 text-xs text-ink-3`},on={class:`flex items-center gap-2`},sn={key:0,class:`mt-3 text-xs text-ink-3`},cn={class:`panel h-fit p-4`},ln={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},un={class:`mt-3 flex items-center gap-2`},dn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},fn={key:0,class:`flex flex-col gap-2`},pn={key:1,class:`panel grid place-items-center py-12`},mn={class:`flex items-start justify-between gap-3`},hn={class:`min-w-0 flex-1`},gn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},_n={class:`tnum text-xs text-ink-3`},vn={class:`text-xs text-ink-3`},yn={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},bn=y({__name:`AnnouncementsView`,setup(e){let o=Je(),d=Le(),f=r([]),m=r(!0),ne=r(!1),v=r(null),y=t({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ae=Object.keys(Ze).map(e=>({label:Ze[e].label,value:e})),ce=_(()=>({fontFamily:Ze[y.font_family].css,fontSize:`${y.font_size}px`})),C=_(()=>{let e=Re(),t=Ye(e.paper,y.font_color,y.font_size);return{paper:e.paper,line:e.line,ink:t?e.ink:y.font_color,overridden:t}}),w=_(()=>y.content.trim().length>0&&!ne.value);function T(){v.value=null,y.content=``,y.font_family=`system`,y.font_size=15,y.font_color=`#1f2328`}async function le(e=!1){e||(m.value=!0);try{let e=await re.list();f.value=e.announcements}catch(e){o.error(e instanceof x?e.message:`公告读取失败`)}finally{m.value=!1}}async function ue(){if(!w.value)return;ne.value=!0;let e={content:y.content.trim(),font_family:y.font_family,font_size:y.font_size,font_color:y.font_color};try{v.value===null?(await re.create(e),o.success(`公告已发布 · 旧公告已停用`)):(await re.update(v.value,e),o.success(`公告已更新`)),T(),await le(!0),await d.load()}catch(e){o.error(e instanceof x?e.message:`保存未生效`)}finally{ne.value=!1}}function E(e){v.value=e.id,y.content=e.content,y.font_family=e.font_family,y.font_size=e.font_size,y.font_color=e.font_color}async function de(e){let t=e.is_active!==1;try{await re.setActive(e.id,t),o.success(t?`公告已启用 · 学生端可见`:`公告已停用 · 学生端不再显示`),await le(!0),await d.load()}catch(e){o.error(e instanceof x?e.message:t?`启用未完成 · 稍后重试`:`停用未完成 · 稍后重试`)}}async function D(e){if(await qe({title:`删除公告`,content:`公告将被删除，不可撤销。`,positiveText:`删除`}))try{await re.remove(e.id),o.success(`公告已删除`),v.value===e.id&&T(),await le(!0),await d.load()}catch(e){o.error(e instanceof x?e.message:`删除未生效`)}}let O=t({pickup_place:``,pickup_hours:``}),k=r(!1),fe=r(!1);async function pe(){try{let e=await te.get();O.pickup_place=e.pickup_place??``,O.pickup_hours=e.pickup_hours??``,fe.value=!0}catch(e){o.error(e instanceof x?e.message:`取件信息读取失败`)}}async function A(){if(!k.value){k.value=!0;try{await te.save({pickup_place:O.pickup_place.trim()||null,pickup_hours:O.pickup_hours.trim()||null}),o.success(`取件信息已保存 · 学生端可取件卡片与取件邮件同步生效`),await pe()}catch(e){o.error(e instanceof x?e.message:`保存未生效`)}finally{k.value=!1}}}return ee(()=>{le(),pe()}),(e,t)=>(S(),u(`div`,Zt,[g(et,{title:`公告管理`,subtitle:`单条生效 · 发布新公告将停用旧公告`},{actions:a(()=>[g(c(V),{size:`small`,quaternary:``,loading:m.value,onClick:t[0]||=e=>le()},{icon:a(()=>[g(c(Ve),{size:15})]),default:a(()=>[t[7]||=b(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),i(`div`,Qt,[i(`section`,$t,[i(`h3`,en,[(S(),l(oe(v.value===null?c(Be):c(ze)),{size:15,style:{color:`var(--accent-text)`}})),b(` `+h(v.value===null?`发布新公告`:`编辑公告 #${v.value}`),1)]),g(c(X),{label:`公告内容`,"show-feedback":!1},{default:a(()=>[g(c(J),{value:y.content,"onUpdate:value":t[1]||=e=>y.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),i(`div`,tn,[g(c(X),{label:`字体`,"show-feedback":!1},{default:a(()=>[g(c(Me),{value:y.font_family,"onUpdate:value":t[2]||=e=>y.font_family=e,options:c(ae),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),g(c(X),{label:`字号`,"show-feedback":!1},{default:a(()=>[g(c(Pe),{value:y.font_size,"onUpdate:value":t[3]||=e=>y.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),g(c(X),{label:`文字颜色`,"show-feedback":!1},{default:a(()=>[g(c(Yt),{value:y.font_color,"onUpdate:value":t[4]||=e=>y.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),i(`div`,nn,[i(`div`,rn,[g(c(Z),{size:12}),t[8]||=b(` 预览 `,-1)]),i(`div`,null,[i(`div`,{class:`border p-3`,style:p({backgroundColor:C.value.paper,borderColor:C.value.line})},[i(`p`,{class:`whitespace-pre-wrap break-words`,style:p([ce.value,{color:C.value.ink}])},h(y.content.trim()||`公告内容将在此预览`),5)],4),C.value.overridden?(S(),u(`p`,an,` 对比度不足 · 已回退至主题文字色 `)):s(``,!0)])]),i(`div`,on,[g(c(V),{type:`primary`,class:`!font-bold`,loading:ne.value,disabled:!w.value,onClick:ue},{icon:a(()=>[g(c(Q),{size:15})]),default:a(()=>[b(` `+h(v.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),v.value===null?s(``,!0):(S(),l(c(V),{key:0,quaternary:``,onClick:T},{default:a(()=>[...t[9]||=[b(`取消编辑`,-1)]]),_:1}))]),v.value===null?(S(),u(`p`,sn,` 发布后立即生效 · 上一条公告同时停用。 `)):s(``,!0)]),i(`section`,cn,[i(`h3`,ln,[g(c(Xt),{size:15,style:{color:`var(--accent-text)`}}),t[10]||=b(` 取件信息 `,-1)]),g(c(X),{label:`取件地点`,"show-feedback":!1},{default:a(()=>[g(c(J),{value:O.pickup_place,"onUpdate:value":t[5]||=e=>O.pickup_place=e,maxlength:120,"show-count":``,disabled:!fe.value,placeholder:`例：3 号楼宿管室`},null,8,[`value`,`disabled`])]),_:1}),g(c(X),{label:`取件时间`,"show-feedback":!1},{default:a(()=>[g(c(J),{value:O.pickup_hours,"onUpdate:value":t[6]||=e=>O.pickup_hours=e,maxlength:120,"show-count":``,disabled:!fe.value,placeholder:`例：8:00–22:00`},null,8,[`value`,`disabled`])]),_:1}),i(`div`,un,[g(c(V),{type:`primary`,class:`!font-bold`,size:`small`,loading:k.value,disabled:!fe.value,onClick:A},{default:a(()=>[...t[11]||=[b(` 保存取件信息 `,-1)]]),_:1},8,[`loading`,`disabled`])]),t[12]||=i(`p`,{class:`mt-3 text-xs text-ink-3`},` 学生端的可取件卡片与取件邮件都会显示这两项 · 留空则不显示。 `,-1)]),i(`section`,dn,[t[15]||=i(`h3`,{class:`mb-3 font-heading text-base font-bold`},[b(` 历史公告 `),i(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),m.value&&!f.value.length?(S(),u(`div`,fn,[(S(),u(n,null,se(3,e=>g(c(Ie),{key:e,height:`92px`,sharp:!1})),64))])):f.value.length?(S(),l(L,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:a(()=>[(S(!0),u(n,null,se(f.value,e=>(S(),u(`li`,{key:e.id,class:ie([`panel p-3.5`,e.is_active===1&&`border-[var(--accent-tint-border)]`])},[i(`div`,mn,[i(`div`,hn,[i(`p`,{class:`line-clamp-2 text-sm`,style:p({fontFamily:c(Ze)[e.font_family]?.css})},h(e.content),5),i(`div`,gn,[i(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:p(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},h(e.is_active===1?`生效中`:`已停用`),5),i(`span`,_n,[b(` #`+h(e.id)+` · `+h(c(Ze)[e.font_family]?.label??e.font_family)+` `+h(e.font_size)+`px · `,1),i(`span`,{style:p({color:e.font_color})},h(e.font_color),5)]),i(`span`,vn,h(e.author??`系统`)+` · `+h(c(Qe)(e.update_time)),1)])]),g(c(Fe),{round:!1,value:e.is_active===1,size:`small`,"onUpdate:value":t=>de(e)},null,8,[`value`,`onUpdate:value`])]),i(`div`,yn,[g(c(V),{size:`tiny`,quaternary:``,onClick:t=>E(e)},{icon:a(()=>[g(c(ze),{size:12})]),default:a(()=>[t[13]||=b(` 编辑 `,-1)]),_:1},8,[`onClick`]),g(c(V),{size:`tiny`,quaternary:``,onClick:t=>D(e)},{icon:a(()=>[g(c(He),{size:12})]),default:a(()=>[t[14]||=b(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(S(),u(`div`,pn,[g($e,{code:`00 / NO NOTICE`,title:`暂无公告记录`,hint:`发布后在此列示`},{icon:a(()=>[g(c(Q),{size:28})]),_:1})]))])])]))}});export{bn as default};