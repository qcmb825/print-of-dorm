import{B as e,H as t,Ht as n,J as r,Mt as i,P as a,Pt as o,St as s,Tt as c,U as l,V as u,Y as d,ct as f,dt as p,et as m,f as h,ft as ee,gt as te,in as g,n as _,nn as ne,nt as v,pt as re,q as y,rn as b,rt as x,wt as S,xt as C,z as w,zt as ie}from"./endpoints-C3DHQTsP.js";import{B as T,C as ae,F as E,G as oe,Gt as D,H as O,I as k,J as se,Jt as A,K as j,L as M,O as ce,Q as le,T as ue,U as de,V as fe,W as N,Wt as P,X as F,Xt as pe,Y as me,Z as he,_t as I,dt as ge,it as _e,k as ve,m as ye,mt as be,nn as L,nt as xe,ot as R,q as Se,qt as z,rt as B,st as V,t as H,tn as U,w as Ce,z as we}from"./Button-CRn1PyiM.js";import{a as Te,t as W}from"./Input-DmZ_0NXr.js";import{c as G,l as Ee,o as K,s as q}from"./create-Bn9KiCnJ.js";import{c as J,l as De,s as Y}from"./Scrollbar-wurFqh-_.js";import{i as Oe,t as X}from"./Select-e5mR0SNI.js";import{t as ke}from"./use-merged-state-BQRj4oql.js";import{t as Z}from"./FormItem-BLpJRgOu.js";import{t as Ae}from"./InputNumber-Crb81INC.js";import{t as je}from"./Skeleton-BdqCWvtc.js";import{t as Me}from"./Switch-CAy3UpNL.js";import{$ as Ne,N as Pe,a as Fe,b as Ie,c as Le,nt as Q,z as Re}from"./index-OMiYk0_-.js";import{t as ze}from"./eye-CeqS78aN.js";import{i as Be,n as Ve,r as He}from"./paper-ClxNDxnx.js";import{t as Ue}from"./pencil-CQHReH5t.js";import{t as We}from"./plus-BtMKabOO.js";import{t as Ge}from"./refresh-cw-FX6uGmos.js";import{t as Ke}from"./trash-DXUV0Cda.js";import{x as $,y as qe}from"./format-DMiwIsNr.js";import{t as Je}from"./EmptyState-CZZIJj8e.js";import{t as Ye}from"./PageHeader-yE9c2LZp.js";var Xe=D(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[P(`>`,[D(`input`,[P(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),P(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),D(`button`,[P(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[z(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),P(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[z(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),P(`*`,[P(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[P(`>`,[D(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),D(`base-selection`,[D(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),D(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),z(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),P(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[P(`>`,[D(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),D(`base-selection`,[D(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),D(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),z(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),Ze=d({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=ge(e);return V(`-input-group`,Xe,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return p(),l(`div`,{class:B(`${e}-input-group`)},[R(()=>this.$slots.default?.())],2)}});function Qe(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function $e(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function et(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=M(O(e));if(o===1){let e=tt([r,i,a]),o=tt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=tt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=tt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function tt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function nt(e){return e=Math.round(e),e>=360?359:e<0?0:e}function rt(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var it={rgb:{hex(e){return T(M(e))},hsl(e){let[t,n,r,i]=M(e);return O([...he(t,n,r),i])},hsv(e){let[t,n,r,i]=M(e);return N([...le(t,n,r),i])}},hex:{rgb(e){return j(M(e))},hsl(e){let[t,n,r,i]=M(e);return O([...he(t,n,r),i])},hsv(e){let[t,n,r,i]=M(e);return N([...le(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=E(e);return T([...se(t,n,r),i])},rgb(e){let[t,n,r,i]=E(e);return j([...se(t,n,r),i])},hsv(e){let[t,n,r,i]=E(e);return N([...Se(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=k(e);return T([...F(t,n,r),i])},rgb(e){let[t,n,r,i]=k(e);return j([...F(t,n,r),i])},hsl(e){let[t,n,r,i]=k(e);return O([...me(t,n,r),i])}}};function at(e,t,n){return n||=$e(e),n?n===t?e:it[n][t](e):null}var ot=[`onMousedown`],st=`12px`,ct=12,lt=`6px`,ut=d({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(n){t.value&&e.rgba&&(J(`mousemove`,document,r),J(`mouseup`,document,i),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-ct);e.onUpdateAlpha(rt(o))}function i(){Y(`mousemove`,document,r),Y(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,railBackgroundImage:w(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:B(`${t}-color-picker-slider`),ref:`railRef`,style:b({height:st,borderRadius:lt}),onMousedown:this.handleMouseDown},[e(`div`,{style:b({borderRadius:lt,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[e(`div`,{class:B(`${t}-color-picker-checkboard`)},null,2),e(`div`,{class:B(`${t}-color-picker-slider__image`),style:b({backgroundImage:this.railBackgroundImage})},null,6)],4),R(()=>this.rgba&&(p(),l(`div`,{style:b({position:`absolute`,left:lt,right:lt,top:0,bottom:0})},[e(`div`,{class:B(`${t}-color-picker-handle`),style:b({left:`calc(${this.alpha*100}% - ${lt})`,borderRadius:lt,width:st,height:st})},[e(`div`,{class:B(`${t}-color-picker-handle__fill`),style:b({backgroundColor:j(this.rgba),borderRadius:lt,width:st,height:st})},null,6)],6)],4)))],46,ot)}}),dt=be(`n-color-picker`);function ft(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function ht(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function gt(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var _t={paddingSmall:`0 4px`},vt=d({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=o(``),{themeRef:n}=m(dt,null);s(()=>{t.value=r()});function r(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function i(e){t.value=e}function a(n){let i,a;switch(e.label){case`HEX`:a=ht(n),a&&e.onUpdateValue(n),t.value=r();break;case`H`:i=pt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`S`:case`L`:case`V`:i=mt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`A`:i=gt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`R`:case`G`:case`B`:i=ft(n),i===!1?t.value=r():e.onUpdateValue(i)}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:i}},render(){let{mergedTheme:e}=this;return p(),u(W,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:_t,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:b(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),yt=[`onClick`],bt=d({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?T:we)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?N:de)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?j:oe)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?O:fe)(i))}}}},render(){let{clsPrefix:t,modes:n}=this;return p(),l(`div`,{class:B(`${t}-color-picker-input`)},[e(`div`,{class:B(`${t}-color-picker-input__mode`),onClick:this.onUpdateMode,style:b({cursor:n.length===1?``:`pointer`})},[R(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,yt),r(Ze,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?T:we)(t)}catch{}return p(),u(vt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(p(),u(vt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),xt=[`onClick`,`onKeydown`];function St(e,t){if(t===`hsv`){let[t,n,r,i]=k(e);return j([...F(t,n,r),i])}return e}function Ct(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var wt=d({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=w(()=>e.swatches.map(e=>{let t=$e(e);return{value:e,mode:t,legalValue:St(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=Ct(r):(I(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:at(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:B(`${t}-color-picker-swatches`)},[R(()=>this.parsedSwatchesRef.map(n=>(p(),l(`div`,{class:B(`${t}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(n)},onKeydown:e=>{this.handleSwatchKeyDown(e,n)}},[e(`div`,{class:B(`${t}-color-picker-swatch__fill`),style:b({background:n.legalValue})},null,6)],42,xt))))],2)}}),Tt=[`onClick`],Et=d({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(t){let{colorPickerSlots:n,renderLabelRef:r}=m(dt,null);return()=>{let{hsla:i,value:o,clsPrefix:s,onClick:c,disabled:u}=t,d=n.label||r.value;return p(),l(`div`,{class:B([`${s}-color-picker`,u&&`${s}-color-picker--disabled`]),onClick:u?void 0:c},[e(`div`,{class:B(`${s}-color-picker__fill`)},[e(`div`,{class:B(`${s}-color-picker-checkboard`)},null,2),e(`div`,{style:b({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:i?O(i):``})},null,4),o&&i?(p(),l(`div`,{key:0,class:B(`${s}-color-picker__value`),style:b({color:et(i)?`white`:`black`})},[d?(p(),l(a,{key:0},[R(()=>d(o))],64)):(p(),l(a,{key:1},[R(()=>o)],64))],6)):R(()=>null)],2)],10,Tt)}}}),Dt=[`value`,`onChange`],Ot=d({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=$e(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(at(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:B(`${t}-color-picker-preview__preview`)},[e(`span`,{class:B(`${t}-color-picker-preview__fill`),style:b({background:this.color||`#000000`})},null,6),e(`input`,{class:B(`${t}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Dt)],2)}}),kt=[`onMousedown`],At=`12px`,jt=12,Mt=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=d({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(e){t.value&&(J(`mousemove`,document,r),J(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=nt((n.clientX-a-Nt)/(i-jt)*360);e.onUpdateHue(o)}function i(){Y(`mousemove`,document,r),Y(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:B(`${t}-color-picker-slider`),style:b({height:At,borderRadius:Mt})},[e(`div`,{ref:`railRef`,style:b({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:At,borderRadius:Mt,position:`relative`}),onMousedown:this.handleMouseDown},[e(`div`,{style:b({position:`absolute`,left:Mt,right:Mt,top:0,bottom:0})},[e(`div`,{class:B(`${t}-color-picker-handle`),style:b({left:`calc((${this.hue}%) / 359 * 100 - ${Mt})`,borderRadius:Mt,width:At,height:At})},[e(`div`,{class:B(`${t}-color-picker-handle__fill`),style:b({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Mt,width:At,height:At})},null,6)],6)],4)],44,kt)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=d({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(e){t.value&&(J(`mousemove`,document,r),J(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function i(){Y(`mousemove`,document,r),Y(`mouseup`,document,i),e.onComplete?.()}return{palleteRef:t,handleColor:w(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:B(`${t}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[e(`div`,{class:B(`${t}-color-picker-pallete__layer`),style:b({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),e(`div`,{class:B(`${t}-color-picker-pallete__layer ${t}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),R(()=>this.rgba&&(p(),l(`div`,{class:B(`${t}-color-picker-handle`),style:b({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[e(`div`,{class:B(`${t}-color-picker-handle__fill`),style:b({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=P([D(`color-picker-panel`,`
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
 `,[Re(),D(`input`,`
 text-align: center;
 `)]),D(`color-picker-checkboard`,`
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
 `)]),D(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[z(`image`,`
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
 `)]),D(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[z(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),D(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[z(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[A(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),D(`color-picker-preview`,`
 display: flex;
 `,[z(`sliders`,`
 flex: 1 0 auto;
 `),z(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),z(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),z(`input`,`
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
 `),z(`mode`,`
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
 `,[A(`disabled`,`cursor: not-allowed`),z(`value`,`
 white-space: nowrap;
 position: relative;
 `),z(`fill`,`
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
 `,[P(`&::after`,`
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
 `,[z(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),P(`&:focus`,`
 outline: none;
 `,[z(`fill`,[P(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Vt={...ce.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Ee.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=d({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(t,{slots:n}){let r=null;function i(e){r=e}let c=null,{mergedClsPrefixRef:d,namespaceRef:f,inlineThemeDisabled:m,mergedComponentPropsRef:h}=ge(t),te=ye(t,{mergedSize:e=>{let{size:n}=t;if(n)return n;let{mergedSize:r}=e||{};return r?.value?r.value:h?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:g,mergedDisabledRef:_}=te,{localeRef:ne}=Te(`global`),v=ce(`ColorPicker`,`-color-picker`,Bt,Pe,t,d);ee(dt,{themeRef:v,renderLabelRef:ie(t,`renderLabel`),colorPickerSlots:n});let re=o(t.defaultShow),y=ke(ie(t,`show`),re);function S(e){let{onUpdateShow:n,"onUpdate:show":r}=t;n&&Ce(n,e),r&&Ce(r,e),re.value=e}let{defaultValue:ae}=t,D=o(ae===void 0?Qe(t.modes,t.showAlpha):ae),A=ke(ie(t,`value`),D),P=o([A.value]),I=o(0),_e=w(()=>$e(A.value)),{modes:be}=t,L=o($e(A.value)||be[0]||`rgb`);function z(){let{modes:e}=t,{value:n}=L,r=e.findIndex(e=>e===n);~r?L.value=e[(r+1)%e.length]:L.value=`rgb`}let V,U,W,G,K,q,J,Y,Oe=w(()=>{let{value:e}=A;if(!e)return null;switch(_e.value){case`hsv`:return k(e);case`hsl`:return[V,U,W,Y]=E(e),[...Se(V,U,W),Y];case`rgb`:case`hex`:return[K,q,J,Y]=M(e),[...le(K,q,J),Y]}}),X=w(()=>{let{value:e}=A;if(!e)return null;switch(_e.value){case`rgb`:case`hex`:return M(e);case`hsv`:return[V,U,G,Y]=k(e),[...F(V,U,G),Y];case`hsl`:return[V,U,W,Y]=E(e),[...se(V,U,W),Y]}}),Z=w(()=>{let{value:e}=A;if(!e)return null;switch(_e.value){case`hsl`:return E(e);case`hsv`:return[V,U,G,Y]=k(e),[...me(V,U,G),Y];case`rgb`:case`hex`:return[K,q,J,Y]=M(e),[...he(K,q,J),Y]}}),Ae=w(()=>{switch(L.value){case`rgb`:case`hex`:return X.value;case`hsv`:return Oe.value;case`hsl`:return Z.value}}),je=o(0),Me=o(1),Ne=o([0,0]);function Fe(e,n){let{value:r}=Oe,i=je.value,a=r?r[3]:1;Ne.value=[e,n];let{showAlpha:o}=t;switch(L.value){case`hsv`:Q((o?N:de)([i,e,n,a]),`cursor`);break;case`hsl`:Q((o?O:fe)([...me(i,e,n),a]),`cursor`);break;case`rgb`:Q((o?j:oe)([...F(i,e,n),a]),`cursor`);break;case`hex`:Q((o?T:we)([...F(i,e,n),a]),`cursor`)}}function Ie(e){je.value=e;let{value:n}=Oe;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=t;switch(L.value){case`hsv`:Q((o?N:de)([e,r,i,a]),`cursor`);break;case`rgb`:Q((o?j:oe)([...F(e,r,i),a]),`cursor`);break;case`hex`:Q((o?T:we)([...F(e,r,i),a]),`cursor`);break;case`hsl`:Q((o?O:fe)([...me(e,r,i),a]),`cursor`)}}function Le(e){switch(L.value){case`hsv`:[V,U,G]=Oe.value,Q(N([V,U,G,e]),`cursor`);break;case`rgb`:[K,q,J]=X.value,Q(j([K,q,J,e]),`cursor`);break;case`hex`:[K,q,J]=X.value,Q(T([K,q,J,e]),`cursor`);break;case`hsl`:[V,U,W]=Z.value,Q(O([V,U,W,e]),`cursor`)}Me.value=e}function Q(e,n){c=n===`cursor`?e:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=te,{onUpdateValue:a,"onUpdate:value":o}=t;a&&Ce(a,e),o&&Ce(o,e),r(),i(),D.value=e}function Re(e){Q(e,`input`),x(ze)}function ze(e=!0){let{value:n}=A;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=te,{onComplete:a}=t;a&&a(n);let{value:o}=P,{value:s}=I;e&&(o.splice(s+1,o.length,n),I.value=s+1),r(),i()}}function Be(){let{value:e}=I;e-1<0||(Q(P.value[e-1],`input`),ze(!1),I.value=e-1)}function Ve(){let{value:e}=I;e<0||e+1>=P.value.length||(Q(P.value[e+1],`input`),ze(!1),I.value=e+1)}function He(){Q(null,`input`);let{onClear:e}=t;e&&e(),S(!1)}function Ue(){let{value:e}=A,{onConfirm:n}=t;n&&n(e),S(!1)}let We=w(()=>I.value>=1),Ge=w(()=>{let{value:e}=P;return e.length>1&&I.value<e.length-1});C(y,e=>{e||(P.value=[A.value],I.value=0)}),s(()=>{if(!(c&&c===A.value)){let{value:e}=Oe;e&&(je.value=e[0],Me.value=e[3],Ne.value=[e[1],e[2]])}c=null});let Ke=w(()=>{let{value:e}=g,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[pe(`height`,e)]:l,[pe(`fontSize`,e)]:u}}=v.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),$=m?ve(`color-picker`,w(()=>g.value[0]),Ke,t):void 0;function qe(){let{value:r}=X,{value:i}=je,{internalActions:o,modes:s,actions:c}=t,{value:f}=v,{value:h}=d;return(()=>{let d=xe(`550d4636453f407b`);return p(),l(`div`,{class:B([`${h}-color-picker-panel`,$?.themeClass.value]),onDragstart:d[0]||=e=>{e.preventDefault()},style:b(m?void 0:Ke.value)},[e(`div`,{class:B(`${h}-color-picker-control`)},[(p(),u(zt,{clsPrefix:h,rgba:r,displayedHue:i,displayedSv:Ne.value,onUpdateSV:Fe,onComplete:ze},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),e(`div`,{class:B(`${h}-color-picker-preview`)},[e(`div`,{class:B(`${h}-color-picker-preview__sliders`)},[(p(),u(Ft,{clsPrefix:h,hue:i,onUpdateHue:Ie,onComplete:ze},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),t.showAlpha?(p(),u(ut,{key:0,clsPrefix:h,rgba:r,alpha:Me.value,onUpdateAlpha:Le,onComplete:ze},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):R(()=>null)],2),t.showPreview?(p(),u(Ot,{key:0,clsPrefix:h,mode:L.value,color:X.value&&we(X.value),onUpdateColor:d[1]||=e=>{Q(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):R(()=>null)],2),(p(),u(bt,{clsPrefix:h,showAlpha:t.showAlpha,mode:L.value,modes:s,onUpdateMode:z,value:A.value,valueArr:Ae.value,onUpdateValue:Re},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),R(()=>t.swatches?.length&&(()=>{let e=xe(`1de0b88852ebf5cb`);return p(),u(wt,{clsPrefix:h,mode:L.value,swatches:t.swatches,onUpdateColor:e[0]||=e=>{Q(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),c?.length?(p(),l(`div`,{key:0,class:B(`${h}-color-picker-action`)},[R(()=>c.includes(`confirm`)&&(p(),u(H,{size:`small`,onClick:Ue,theme:f.peers.Button,themeOverrides:f.peerOverrides.Button},{default:()=>ne.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),R(()=>c.includes(`clear`)&&(p(),u(H,{size:`small`,onClick:He,disabled:!A.value,theme:f.peers.Button,themeOverrides:f.peerOverrides.Button},{default:()=>ne.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):R(()=>null),n.action?(p(),l(`div`,{key:2,class:B(`${h}-color-picker-action`)},[R(()=>n.action?.())],2)):(p(),l(a,{key:3},[o?(p(),l(`div`,{key:0,class:B(`${h}-color-picker-action`)},[R(()=>o.includes(`undo`)&&(p(),u(H,{size:`small`,onClick:Be,disabled:!We.value,theme:f.peers.Button,themeOverrides:f.peerOverrides.Button},{default:()=>ne.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),R(()=>o.includes(`redo`)&&(p(),u(H,{size:`small`,onClick:Ve,disabled:!Ge.value,theme:f.peers.Button,themeOverrides:f.peerOverrides.Button},{default:()=>ne.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):R(()=>null)],64))],38)})()}return{mergedClsPrefix:d,namespace:f,hsla:Z,rgba:X,mergedShow:y,mergedDisabled:_,isMounted:ue(),adjustedTo:Ee(t),mergedValue:A,handleTriggerClick(){_.value||S(!0)},setTriggerRef:i,handleClickOutside(e){if(r instanceof Element){if(r.contains(De(e)))return}else if(r&&r.$el.contains(De(e)))return;S(!1)},renderPanel:qe,cssVars:m?void 0:Ke,themeClass:$?.themeClass,onRender:$?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),p(),u(G,null,{default:()=>[(p(),u(q,null,{default:()=>{let t=v(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=Oe([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),ae(this.$slots.trigger,Q(t,[`value`,`onClick`,`ref`]),n=>n||(p(),u(Et,v(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(p(),u(K,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Ee.tdkey,to:this.adjustedTo},{_:1,default:_e(()=>(p(),u(U,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:_e(()=>this.mergedShow?c(this.renderPanel(),[[Ne,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-4 tech-label--cn text-xs`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-4 tech-label--cn text-xs`},Qt={key:0,class:`mt-1 text-xs text-ink-4`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-xs text-ink-4`},tn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},nn={key:0,class:`flex flex-col gap-2`},rn={key:1,class:`panel grid place-items-center py-12`},an={class:`flex items-start justify-between gap-3`},on={class:`min-w-0 flex-1`},sn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},cn={class:`tnum text-xs text-ink-4`},ln={class:`text-xs text-ink-4`},un={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},dn=d({__name:`AnnouncementsView`,setup(s){let c=Ie(),d=He(),m=o([]),ee=o(!0),v=o(!1),x=o(null),C=i({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ie=Object.keys($).map(e=>({label:$[e].label,value:e})),T=w(()=>({fontFamily:$[C.font_family].css,fontSize:`${C.font_size}px`})),ae=w(()=>[`light`,`dark`].map(e=>{let t=Ve()[e],n=Fe(t.paper,C.font_color,C.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:C.font_color,overridden:n}})),E=w(()=>C.content.trim().length>0&&!v.value);function oe(){x.value=null,C.content=``,C.font_family=`system`,C.font_size=15,C.font_color=`#1f2328`}async function D(e=!1){e||(ee.value=!0);try{let e=await _.list();m.value=e.announcements}catch(e){c.error(e instanceof h?e.message:`加载公告失败`)}finally{ee.value=!1}}async function O(){if(!E.value)return;v.value=!0;let e={content:C.content.trim(),font_family:C.font_family,font_size:C.font_size,font_color:C.font_color};try{x.value===null?(await _.create(e),c.success(`公告已发布`)):(await _.update(x.value,e),c.success(`公告已更新`)),oe(),await D(!0),await d.load()}catch(e){c.error(e instanceof h?e.message:`保存失败`)}finally{v.value=!1}}function k(e){x.value=e.id,C.content=e.content,C.font_family=e.font_family,C.font_size=e.font_size,C.font_color=e.font_color}async function se(e){let t=e.is_active!==1;try{await _.setActive(e.id,t),c.success(t?`公告已启用`:`公告已停用`),await D(!0),await d.load()}catch(e){c.error(e instanceof h?e.message:`操作失败`)}}async function A(e){if(await Le({title:`删除公告`,content:`确定删除这条公告吗？删除后不可恢复。`,positiveText:`删除`}))try{await _.remove(e.id),c.success(`公告已删除`),x.value===e.id&&oe(),await D(!0),await d.load()}catch(e){c.error(e instanceof h?e.message:`删除失败`)}}return f(D),(i,o)=>(p(),l(`div`,Ut,[r(Ye,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:S(()=>[r(n(H),{size:`small`,quaternary:``,loading:ee.value,onClick:o[0]||=e=>D()},{icon:S(()=>[r(n(Ge),{size:15})]),default:S(()=>[o[5]||=y(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),e(`div`,Wt,[e(`section`,Gt,[e(`h3`,Kt,[(p(),u(te(x.value===null?n(We):n(Ue)),{size:15,style:{color:`var(--accent-text)`}})),y(` `+g(x.value===null?`发布新公告`:`编辑公告 #${x.value}`),1)]),r(n(Z),{label:`公告内容`,"show-feedback":!1},{default:S(()=>[r(n(W),{value:C.content,"onUpdate:value":o[1]||=e=>C.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),e(`div`,qt,[r(n(Z),{label:`字体`,"show-feedback":!1},{default:S(()=>[r(n(X),{value:C.font_family,"onUpdate:value":o[2]||=e=>C.font_family=e,options:n(ie),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),r(n(Z),{label:`字号`,"show-feedback":!1},{default:S(()=>[r(n(Ae),{value:C.font_size,"onUpdate:value":o[3]||=e=>C.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),r(n(Z),{label:`文字颜色`,"show-feedback":!1},{default:S(()=>[r(n(Ht),{value:C.font_color,"onUpdate:value":o[4]||=e=>C.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),e(`div`,Jt,[e(`div`,Yt,[r(n(ze),{size:12}),o[6]||=y(` 预览 `,-1)]),e(`div`,Xt,[(p(!0),l(a,null,re(ae.value,n=>(p(),l(`div`,{key:n.key},[e(`div`,Zt,g(n.label),1),e(`div`,{class:`border p-3`,style:b({backgroundColor:n.paper,borderColor:n.line})},[e(`p`,{class:`whitespace-pre-wrap break-words`,style:b([T.value,{color:n.ink}])},g(C.content.trim()||`公告内容会显示在这里`),5)],4),n.overridden?(p(),l(`p`,Qt,` 所选颜色与`+g(n.label)+`纸面对比度不足，实际会回落到主题文字色 `,1)):t(``,!0)]))),128))])]),e(`div`,$t,[r(n(H),{type:`primary`,class:`!font-bold`,loading:v.value,disabled:!E.value,onClick:O},{icon:S(()=>[r(n(Be),{size:15})]),default:S(()=>[y(` `+g(x.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),x.value===null?t(``,!0):(p(),u(n(H),{key:0,quaternary:``,onClick:oe},{default:S(()=>[...o[7]||=[y(`取消编辑`,-1)]]),_:1}))]),x.value===null?(p(),l(`p`,en,` 保存后立即对所有用户生效，并自动停用上一条公告。 `)):t(``,!0)]),e(`section`,tn,[o[10]||=e(`h3`,{class:`mb-3 font-heading text-base font-bold`},[y(` 历史公告 `),e(`span`,{class:`tech-label ml-2 text-ink-4 tech-label--cn text-xs`},`最近 50 条`)],-1),ee.value&&!m.value.length?(p(),l(`div`,nn,[(p(),l(a,null,re(3,e=>r(n(je),{key:e,height:`92px`,sharp:!1})),64))])):m.value.length?(p(),u(L,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:S(()=>[(p(!0),l(a,null,re(m.value,t=>(p(),l(`li`,{key:t.id,class:ne([`panel p-3.5`,t.is_active===1&&`border-[var(--accent-tint-border)]`])},[e(`div`,an,[e(`div`,on,[e(`p`,{class:`line-clamp-2 text-sm`,style:b({fontFamily:n($)[t.font_family]?.css})},g(t.content),5),e(`div`,sn,[e(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:b(t.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-quaternary)`})},g(t.is_active===1?`生效中`:`已停用`),5),e(`span`,cn,[y(` #`+g(t.id)+` · `+g(n($)[t.font_family]?.label??t.font_family)+` `+g(t.font_size)+`px · `,1),e(`span`,{style:b({color:t.font_color})},g(t.font_color),5)]),e(`span`,ln,g(t.author??`系统`)+` · `+g(n(qe)(t.update_time)),1)])]),r(n(Me),{round:!1,value:t.is_active===1,size:`small`,"onUpdate:value":e=>se(t)},null,8,[`value`,`onUpdate:value`])]),e(`div`,un,[r(n(H),{size:`tiny`,quaternary:``,onClick:e=>k(t)},{icon:S(()=>[r(n(Ue),{size:12})]),default:S(()=>[o[8]||=y(` 编辑 `,-1)]),_:1},8,[`onClick`]),r(n(H),{size:`tiny`,quaternary:``,onClick:e=>A(t)},{icon:S(()=>[r(n(Ke),{size:12})]),default:S(()=>[o[9]||=y(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(p(),l(`div`,rn,[r(Je,{code:`00 / NO NOTICE`,title:`还没有发布过公告`,hint:`左侧写完保存，就会出现在这里`},{icon:S(()=>[r(n(Be),{size:28})]),_:1})]))])])]))}});export{dn as default};