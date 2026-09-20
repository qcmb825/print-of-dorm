import{B as e,Bt as t,C as n,Ct as r,D as i,E as a,Et as o,Ht as s,K as c,M as l,N as u,R as d,T as f,V as ee,Vt as p,X as te,Y as m,Z as ne,at as h,ct as g,et as re,gt as ie,j as _,lt as v,n as y,ot as ae,p as b,v as oe,vt as x,w as S}from"./endpoints-DwTyeYJL.js";import{$ as se,A as ce,B as C,E as le,G as w,Gt as T,H as ue,I as E,J as de,Jt as D,K as fe,Kt as O,L as k,Q as pe,R as A,T as me,U as j,V as M,W as he,X as ge,Y as _e,Yt as N,Z as P,Zt as ve,at as F,ct as ye,ft as be,h as xe,ht as Se,it as I,k as Ce,n as L,nn as R,q as z,rn as we,rt as Te,st as B,vt as V,w as H}from"./createLucideIcon-PTKXBJl9.js";import{a as Ee,t as U}from"./Input-5b3xtR6k.js";import{c as W,l as De,o as G,s as K}from"./create-C3Qg5Xyu.js";import{c as q,l as Oe,s as J}from"./Scrollbar-DaH6bqAU.js";import{i as ke,t as Y}from"./Select-CeWSMgnH.js";import{t as Ae}from"./use-merged-state-CGeMmGLZ.js";import{t as X}from"./FormItem-DINcczKs.js";import{t as je}from"./InputNumber-D1BKKKgf.js";import{t as Me}from"./Skeleton-CjHil_b5.js";import{t as Ne}from"./Switch-CIrQu6_P.js";import{t as Pe}from"./eye-Biqo91WW.js";import{i as Fe,n as Ie,r as Le}from"./paper-dQRTJU2t.js";import{t as Z}from"./pencil-CUeq4JVN.js";import{t as Re}from"./plus-OM9F9-l6.js";import{t as Q}from"./refresh-cw-Bwy6OfZc.js";import{t as ze}from"./trash-5TszmJT-.js";import{L as Be,S as Ve,U as He,a as Ue,ot as We,rt as Ge,u as Ke}from"./index-CnuM2Ps_.js";import{x as $,y as qe}from"./format-Ctvw4JoF.js";import{t as Je}from"./EmptyState-x11jBGQH.js";import{t as Ye}from"./PageHeader-BP6eG0Dp.js";var Xe=O(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[T(`>`,[O(`input`,[T(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),T(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),O(`button`,[T(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[D(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),T(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[D(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),T(`*`,[T(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[T(`>`,[O(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),O(`base-selection`,[O(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),O(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),D(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),T(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[T(`>`,[O(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),O(`base-selection`,[O(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),O(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),D(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),Ze=u({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=be(e);return ye(`-input-group`,Xe,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return m(),i(`div`,{class:I(`${e}-input-group`)},[B(()=>this.$slots.default?.())],2)}});function Qe(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function $e(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function et(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=A(j(e));if(o===1){let e=tt([r,i,a]),o=tt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=tt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=tt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function tt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function nt(e){return e=Math.round(e),e>=360?359:e<0?0:e}function rt(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var it={rgb:{hex(e){return M(A(e))},hsl(e){let[t,n,r,i]=A(e);return j([...pe(t,n,r),i])},hsv(e){let[t,n,r,i]=A(e);return w([...se(t,n,r),i])}},hex:{rgb(e){return z(A(e))},hsl(e){let[t,n,r,i]=A(e);return j([...pe(t,n,r),i])},hsv(e){let[t,n,r,i]=A(e);return w([...se(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=E(e);return M([..._e(t,n,r),i])},rgb(e){let[t,n,r,i]=E(e);return z([..._e(t,n,r),i])},hsv(e){let[t,n,r,i]=E(e);return w([...de(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=k(e);return M([...P(t,n,r),i])},rgb(e){let[t,n,r,i]=k(e);return z([...P(t,n,r),i])},hsl(e){let[t,n,r,i]=k(e);return j([...ge(t,n,r),i])}}};function at(e,t,n){return n||=$e(e),n?n===t?e:it[n][t](e):null}var ot=[`onMousedown`],st=`12px`,ct=12,lt=`6px`,ut=u({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=x(null);function r(n){t.value&&e.rgba&&(q(`mousemove`,document,i),q(`mouseup`,document,a),i(n))}function i(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-ct);e.onUpdateAlpha(rt(o))}function a(){J(`mousemove`,document,i),J(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,railBackgroundImage:n(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:r}},render(){let{clsPrefix:e}=this;return m(),i(`div`,{class:I(`${e}-color-picker-slider`),ref:`railRef`,style:p({height:st,borderRadius:lt}),onMousedown:this.handleMouseDown},[S(`div`,{style:p({borderRadius:lt,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[S(`div`,{class:I(`${e}-color-picker-checkboard`)},null,2),S(`div`,{class:I(`${e}-color-picker-slider__image`),style:p({backgroundImage:this.railBackgroundImage})},null,6)],4),B(()=>this.rgba&&(m(),i(`div`,{style:p({position:`absolute`,left:lt,right:lt,top:0,bottom:0})},[S(`div`,{class:I(`${e}-color-picker-handle`),style:p({left:`calc(${this.alpha*100}% - ${lt})`,borderRadius:lt,width:st,height:st})},[S(`div`,{class:I(`${e}-color-picker-handle__fill`),style:p({backgroundColor:z(this.rgba),borderRadius:lt,width:st,height:st})},null,6)],6)],4)))],46,ot)}}),dt=Se(`n-color-picker`);function ft(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function ht(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function gt(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var _t={paddingSmall:`0 4px`},vt=u({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=x(``),{themeRef:n}=d(dt,null);ae(()=>{t.value=r()});function r(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function i(e){t.value=e}function a(n){let i,a;switch(e.label){case`HEX`:a=ht(n),a&&e.onUpdateValue(n),t.value=r();break;case`H`:i=pt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`S`:case`L`:case`V`:i=mt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`A`:i=gt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`R`:case`G`:case`B`:i=ft(n),i===!1?t.value=r():e.onUpdateValue(i)}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:i}},render(){let{mergedTheme:e}=this;return m(),f(U,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:_t,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:p(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),yt=[`onClick`],bt=u({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?M:C)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?w:he)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?z:fe)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?j:ue)(i))}}}},render(){let{clsPrefix:e,modes:t}=this;return m(),i(`div`,{class:I(`${e}-color-picker-input`)},[S(`div`,{class:I(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:p({cursor:t.length===1?``:`pointer`})},[B(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,yt),l(Ze,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?M:C)(t)}catch{}return m(),f(vt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(m(),f(vt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),xt=[`onClick`,`onKeydown`];function St(e,t){if(t===`hsv`){let[t,n,r,i]=k(e);return z([...P(t,n,r),i])}return e}function Ct(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var wt=u({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=n(()=>e.swatches.map(e=>{let t=$e(e);return{value:e,mode:t,legalValue:St(e,t)}}));function r(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=Ct(r):(V(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:at(r,n,i)}function i(t){e.onUpdateColor(r(t))}function a(e,t){e.key===`Enter`&&i(t)}return{parsedSwatchesRef:t,handleSwatchSelect:i,handleSwatchKeyDown:a}},render(){let{clsPrefix:e}=this;return m(),i(`div`,{class:I(`${e}-color-picker-swatches`)},[B(()=>this.parsedSwatchesRef.map(t=>(m(),i(`div`,{class:I(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[S(`div`,{class:I(`${e}-color-picker-swatch__fill`),style:p({background:t.legalValue})},null,6)],42,xt))))],2)}}),Tt=[`onClick`],Et=u({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:n}=d(dt,null);return()=>{let{hsla:r,value:a,clsPrefix:o,onClick:s,disabled:c}=e,l=t.label||n.value;return m(),i(`div`,{class:I([`${o}-color-picker`,c&&`${o}-color-picker--disabled`]),onClick:c?void 0:s},[S(`div`,{class:I(`${o}-color-picker__fill`)},[S(`div`,{class:I(`${o}-color-picker-checkboard`)},null,2),S(`div`,{style:p({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:r?j(r):``})},null,4),a&&r?(m(),i(`div`,{key:0,class:I(`${o}-color-picker__value`),style:p({color:et(r)?`white`:`black`})},[l?(m(),i(oe,{key:0},[B(()=>l(a))],64)):(m(),i(oe,{key:1},[B(()=>a)],64))],6)):B(()=>null)],2)],10,Tt)}}}),Dt=[`value`,`onChange`],Ot=u({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=$e(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(at(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return m(),i(`div`,{class:I(`${e}-color-picker-preview__preview`)},[S(`span`,{class:I(`${e}-color-picker-preview__fill`),style:p({background:this.color||`#000000`})},null,6),S(`input`,{class:I(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Dt)],2)}}),kt=[`onMousedown`],At=`12px`,jt=12,Mt=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=u({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=x(null);function n(e){t.value&&(q(`mousemove`,document,r),q(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=nt((n.clientX-a-Nt)/(i-jt)*360);e.onUpdateHue(o)}function i(){J(`mousemove`,document,r),J(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return m(),i(`div`,{class:I(`${e}-color-picker-slider`),style:p({height:At,borderRadius:Mt})},[S(`div`,{ref:`railRef`,style:p({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:At,borderRadius:Mt,position:`relative`}),onMousedown:this.handleMouseDown},[S(`div`,{style:p({position:`absolute`,left:Mt,right:Mt,top:0,bottom:0})},[S(`div`,{class:I(`${e}-color-picker-handle`),style:p({left:`calc((${this.hue}%) / 359 * 100 - ${Mt})`,borderRadius:Mt,width:At,height:At})},[S(`div`,{class:I(`${e}-color-picker-handle__fill`),style:p({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Mt,width:At,height:At})},null,6)],6)],4)],44,kt)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=u({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=x(null);function r(e){t.value&&(q(`mousemove`,document,i),q(`mouseup`,document,a),i(e))}function i(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function a(){J(`mousemove`,document,i),J(`mouseup`,document,a),e.onComplete?.()}return{palleteRef:t,handleColor:n(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:r}},render(){let{clsPrefix:e}=this;return m(),i(`div`,{class:I(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[S(`div`,{class:I(`${e}-color-picker-pallete__layer`),style:p({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),S(`div`,{class:I(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),B(()=>this.rgba&&(m(),i(`div`,{class:I(`${e}-color-picker-handle`),style:p({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[S(`div`,{class:I(`${e}-color-picker-handle__fill`),style:p({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=T([O(`color-picker-panel`,`
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
 `,[He(),O(`input`,`
 text-align: center;
 `)]),O(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[T(`&::after`,`
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
 `)]),O(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[D(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),T(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),O(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[D(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),O(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[D(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[N(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),O(`color-picker-preview`,`
 display: flex;
 `,[D(`sliders`,`
 flex: 1 0 auto;
 `),D(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),D(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),D(`input`,`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),O(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[O(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),D(`mode`,`
 width: 72px;
 text-align: center;
 `)]),O(`color-picker-control`,`
 padding: 12px;
 `),O(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[O(`button`,`margin-left: 8px;`)]),O(`color-picker`,`
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
 `,[N(`disabled`,`cursor: not-allowed`),D(`value`,`
 white-space: nowrap;
 position: relative;
 `),D(`fill`,`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),O(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[T(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),O(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[O(`color-picker-swatch`,`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[D(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),T(`&:focus`,`
 outline: none;
 `,[D(`fill`,[T(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Vt={...Ce.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:De.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=u({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(e,{slots:t}){let a=null;function o(e){a=e}let s=null,{mergedClsPrefixRef:c,namespaceRef:l,inlineThemeDisabled:u,mergedComponentPropsRef:d}=be(e),ne=xe(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:d?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:g,mergedDisabledRef:re}=ne,{localeRef:ie}=Ee(`global`),_=Ce(`ColorPicker`,`-color-picker`,Bt,Be,e,c);te(dt,{themeRef:_,renderLabelRef:r(e,`renderLabel`),colorPickerSlots:t});let v=x(e.defaultShow),y=Ae(r(e,`show`),v);function b(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&me(n,t),r&&me(r,t),v.value=t}let{defaultValue:T}=e,D=x(T===void 0?Qe(e.modes,e.showAlpha):T),O=Ae(r(e,`value`),D),N=x([O.value]),F=x(0),ye=n(()=>$e(O.value)),{modes:Se}=e,R=x($e(O.value)||Se[0]||`rgb`);function we(){let{modes:t}=e,{value:n}=R,r=t.findIndex(e=>e===n);~r?R.value=t[(r+1)%t.length]:R.value=`rgb`}let V,H,U,W,G,K,q,J,ke=n(()=>{let{value:e}=O;if(!e)return null;switch(ye.value){case`hsv`:return k(e);case`hsl`:return[V,H,U,J]=E(e),[...de(V,H,U),J];case`rgb`:case`hex`:return[G,K,q,J]=A(e),[...se(G,K,q),J]}}),Y=n(()=>{let{value:e}=O;if(!e)return null;switch(ye.value){case`rgb`:case`hex`:return A(e);case`hsv`:return[V,H,W,J]=k(e),[...P(V,H,W),J];case`hsl`:return[V,H,U,J]=E(e),[..._e(V,H,U),J]}}),X=n(()=>{let{value:e}=O;if(!e)return null;switch(ye.value){case`hsl`:return E(e);case`hsv`:return[V,H,W,J]=k(e),[...ge(V,H,W),J];case`rgb`:case`hex`:return[G,K,q,J]=A(e),[...pe(G,K,q),J]}}),je=n(()=>{switch(R.value){case`rgb`:case`hex`:return Y.value;case`hsv`:return ke.value;case`hsl`:return X.value}}),Me=x(0),Ne=x(1),Pe=x([0,0]);function Fe(t,n){let{value:r}=ke,i=Me.value,a=r?r[3]:1;Pe.value=[t,n];let{showAlpha:o}=e;switch(R.value){case`hsv`:Z((o?w:he)([i,t,n,a]),`cursor`);break;case`hsl`:Z((o?j:ue)([...ge(i,t,n),a]),`cursor`);break;case`rgb`:Z((o?z:fe)([...P(i,t,n),a]),`cursor`);break;case`hex`:Z((o?M:C)([...P(i,t,n),a]),`cursor`)}}function Ie(t){Me.value=t;let{value:n}=ke;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=e;switch(R.value){case`hsv`:Z((o?w:he)([t,r,i,a]),`cursor`);break;case`rgb`:Z((o?z:fe)([...P(t,r,i),a]),`cursor`);break;case`hex`:Z((o?M:C)([...P(t,r,i),a]),`cursor`);break;case`hsl`:Z((o?j:ue)([...ge(t,r,i),a]),`cursor`)}}function Le(e){switch(R.value){case`hsv`:[V,H,W]=ke.value,Z(w([V,H,W,e]),`cursor`);break;case`rgb`:[G,K,q]=Y.value,Z(z([G,K,q,e]),`cursor`);break;case`hex`:[G,K,q]=Y.value,Z(M([G,K,q,e]),`cursor`);break;case`hsl`:[V,H,U]=X.value,Z(j([V,H,U,e]),`cursor`)}Ne.value=e}function Z(t,n){s=n===`cursor`?t:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=ne,{onUpdateValue:a,"onUpdate:value":o}=e;a&&me(a,t),o&&me(o,t),r(),i(),D.value=t}function Re(e){Z(e,`input`),ee(Q)}function Q(t=!0){let{value:n}=O;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=ne,{onComplete:a}=e;a&&a(n);let{value:o}=N,{value:s}=F;t&&(o.splice(s+1,o.length,n),F.value=s+1),r(),i()}}function ze(){let{value:e}=F;e-1<0||(Z(N.value[e-1],`input`),Q(!1),F.value=e-1)}function Ve(){let{value:e}=F;e<0||e+1>=N.value.length||(Z(N.value[e+1],`input`),Q(!1),F.value=e+1)}function He(){Z(null,`input`);let{onClear:t}=e;t&&t(),b(!1)}function Ue(){let{value:t}=O,{onConfirm:n}=e;n&&n(t),b(!1)}let We=n(()=>F.value>=1),Ge=n(()=>{let{value:e}=N;return e.length>1&&F.value<e.length-1});h(y,e=>{e||(N.value=[O.value],F.value=0)}),ae(()=>{if(!(s&&s===O.value)){let{value:e}=ke;e&&(Me.value=e[0],Ne.value=e[3],Pe.value=[e[1],e[2]])}s=null});let Ke=n(()=>{let{value:e}=g,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[ve(`height`,e)]:l,[ve(`fontSize`,e)]:u}}=_.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),$=u?ce(`color-picker`,n(()=>g.value[0]),Ke,e):void 0;function qe(){let{value:n}=Y,{value:r}=Me,{internalActions:a,modes:o,actions:s}=e,{value:l}=_,{value:d}=c;return(()=>{let c=Te(`550d4636453f407b`);return m(),i(`div`,{class:I([`${d}-color-picker-panel`,$?.themeClass.value]),onDragstart:c[0]||=e=>{e.preventDefault()},style:p(u?void 0:Ke.value)},[S(`div`,{class:I(`${d}-color-picker-control`)},[(m(),f(zt,{clsPrefix:d,rgba:n,displayedHue:r,displayedSv:Pe.value,onUpdateSV:Fe,onComplete:Q},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),S(`div`,{class:I(`${d}-color-picker-preview`)},[S(`div`,{class:I(`${d}-color-picker-preview__sliders`)},[(m(),f(Ft,{clsPrefix:d,hue:r,onUpdateHue:Ie,onComplete:Q},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),e.showAlpha?(m(),f(ut,{key:0,clsPrefix:d,rgba:n,alpha:Ne.value,onUpdateAlpha:Le,onComplete:Q},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):B(()=>null)],2),e.showPreview?(m(),f(Ot,{key:0,clsPrefix:d,mode:R.value,color:Y.value&&C(Y.value),onUpdateColor:c[1]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):B(()=>null)],2),(m(),f(bt,{clsPrefix:d,showAlpha:e.showAlpha,mode:R.value,modes:o,onUpdateMode:we,value:O.value,valueArr:je.value,onUpdateValue:Re},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),B(()=>e.swatches?.length&&(()=>{let t=Te(`1de0b88852ebf5cb`);return m(),f(wt,{clsPrefix:d,mode:R.value,swatches:e.swatches,onUpdateColor:t[0]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),s?.length?(m(),i(`div`,{key:0,class:I(`${d}-color-picker-action`)},[B(()=>s.includes(`confirm`)&&(m(),f(L,{size:`small`,onClick:Ue,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>ie.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),B(()=>s.includes(`clear`)&&(m(),f(L,{size:`small`,onClick:He,disabled:!O.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>ie.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):B(()=>null),t.action?(m(),i(`div`,{key:2,class:I(`${d}-color-picker-action`)},[B(()=>t.action?.())],2)):(m(),i(oe,{key:3},[a?(m(),i(`div`,{key:0,class:I(`${d}-color-picker-action`)},[B(()=>a.includes(`undo`)&&(m(),f(L,{size:`small`,onClick:ze,disabled:!We.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>ie.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),B(()=>a.includes(`redo`)&&(m(),f(L,{size:`small`,onClick:Ve,disabled:!Ge.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>ie.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):B(()=>null)],64))],38)})()}return{mergedClsPrefix:c,namespace:l,hsla:X,rgba:Y,mergedShow:y,mergedDisabled:re,isMounted:le(),adjustedTo:De(e),mergedValue:O,handleTriggerClick(){re.value||b(!0)},setTriggerRef:o,handleClickOutside(e){if(a instanceof Element){if(a.contains(Oe(e)))return}else if(a&&a.$el.contains(Oe(e)))return;b(!1)},renderPanel:qe,cssVars:u?void 0:Ke,themeClass:$?.themeClass,onRender:$?.onRender}},render(){let{mergedClsPrefix:t,onRender:n}=this;return n?.(),m(),f(W,null,{default:()=>[(m(),f(K,null,{default:()=>{let n=e(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return n.onClick=ke([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),H(this.$slots.trigger,We(n,[`value`,`onClick`,`ref`]),r=>r||(m(),f(Et,e(n,{clsPrefix:t,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(m(),f(G,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===De.tdkey,to:this.adjustedTo},{_:1,default:F(()=>(m(),f(R,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:F(()=>this.mergedShow?v(this.renderPanel(),[[Ge,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},Qt={key:0,class:`mt-1 text-xs text-ink-3`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-xs text-ink-3`},tn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},nn={key:0,class:`flex flex-col gap-2`},rn={key:1,class:`panel grid place-items-center py-12`},an={class:`flex items-start justify-between gap-3`},on={class:`min-w-0 flex-1`},sn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},cn={class:`tnum text-xs text-ink-3`},ln={class:`text-xs text-ink-3`},un={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},dn=u({__name:`AnnouncementsView`,setup(e){let r=Ve(),u=Le(),d=x([]),ee=x(!0),te=x(!1),h=x(null),v=ie({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ae=Object.keys($).map(e=>({label:$[e].label,value:e})),se=n(()=>({fontFamily:$[v.font_family].css,fontSize:`${v.font_size}px`})),ce=n(()=>[`light`,`dark`].map(e=>{let t=Ie()[e],n=Ue(t.paper,v.font_color,v.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:v.font_color,overridden:n}})),C=n(()=>v.content.trim().length>0&&!te.value);function le(){h.value=null,v.content=``,v.font_family=`system`,v.font_size=15,v.font_color=`#1f2328`}async function w(e=!1){e||(ee.value=!0);try{let e=await y.list();d.value=e.announcements}catch(e){r.error(e instanceof b?e.message:`加载公告失败`)}finally{ee.value=!1}}async function T(){if(!C.value)return;te.value=!0;let e={content:v.content.trim(),font_family:v.font_family,font_size:v.font_size,font_color:v.font_color};try{h.value===null?(await y.create(e),r.success(`公告已发布`)):(await y.update(h.value,e),r.success(`公告已更新`)),le(),await w(!0),await u.load()}catch(e){r.error(e instanceof b?e.message:`保存失败`)}finally{te.value=!1}}function ue(e){h.value=e.id,v.content=e.content,v.font_family=e.font_family,v.font_size=e.font_size,v.font_color=e.font_color}async function E(e){let t=e.is_active!==1;try{await y.setActive(e.id,t),r.success(t?`公告已启用`:`公告已停用`),await w(!0),await u.load()}catch(e){r.error(e instanceof b?e.message:`操作失败`)}}async function de(e){if(await Ke({title:`删除公告`,content:`这条公告会被删除，不可恢复。`,positiveText:`删除`}))try{await y.remove(e.id),r.success(`公告已删除`),h.value===e.id&&le(),await w(!0),await u.load()}catch(e){r.error(e instanceof b?e.message:`删除失败`)}}return c(w),(e,n)=>(m(),i(`div`,Ut,[l(Ye,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:g(()=>[l(o(L),{size:`small`,quaternary:``,loading:ee.value,onClick:n[0]||=e=>w()},{icon:g(()=>[l(o(Q),{size:15})]),default:g(()=>[n[5]||=_(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),S(`div`,Wt,[S(`section`,Gt,[S(`h3`,Kt,[(m(),f(re(h.value===null?o(Re):o(Z)),{size:15,style:{color:`var(--accent-text)`}})),_(` `+s(h.value===null?`发布新公告`:`编辑公告 #${h.value}`),1)]),l(o(X),{label:`公告内容`,"show-feedback":!1},{default:g(()=>[l(o(U),{value:v.content,"onUpdate:value":n[1]||=e=>v.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),S(`div`,qt,[l(o(X),{label:`字体`,"show-feedback":!1},{default:g(()=>[l(o(Y),{value:v.font_family,"onUpdate:value":n[2]||=e=>v.font_family=e,options:o(ae),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),l(o(X),{label:`字号`,"show-feedback":!1},{default:g(()=>[l(o(je),{value:v.font_size,"onUpdate:value":n[3]||=e=>v.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),l(o(X),{label:`文字颜色`,"show-feedback":!1},{default:g(()=>[l(o(Ht),{value:v.font_color,"onUpdate:value":n[4]||=e=>v.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),S(`div`,Jt,[S(`div`,Yt,[l(o(Pe),{size:12}),n[6]||=_(` 预览 `,-1)]),S(`div`,Xt,[(m(!0),i(oe,null,ne(ce.value,e=>(m(),i(`div`,{key:e.key},[S(`div`,Zt,s(e.label),1),S(`div`,{class:`border p-3`,style:p({backgroundColor:e.paper,borderColor:e.line})},[S(`p`,{class:`whitespace-pre-wrap break-words`,style:p([se.value,{color:e.ink}])},s(v.content.trim()||`公告内容会显示在这里`),5)],4),e.overridden?(m(),i(`p`,Qt,` 对比度不足 · 会回落到主题文字色 `)):a(``,!0)]))),128))])]),S(`div`,$t,[l(o(L),{type:`primary`,class:`!font-bold`,loading:te.value,disabled:!C.value,onClick:T},{icon:g(()=>[l(o(Fe),{size:15})]),default:g(()=>[_(` `+s(h.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),h.value===null?a(``,!0):(m(),f(o(L),{key:0,quaternary:``,onClick:le},{default:g(()=>[...n[7]||=[_(`取消编辑`,-1)]]),_:1}))]),h.value===null?(m(),i(`p`,en,` 保存后立即生效，并停用上一条公告。 `)):a(``,!0)]),S(`section`,tn,[n[10]||=S(`h3`,{class:`mb-3 font-heading text-base font-bold`},[_(` 历史公告 `),S(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),ee.value&&!d.value.length?(m(),i(`div`,nn,[(m(),i(oe,null,ne(3,e=>l(o(Me),{key:e,height:`92px`,sharp:!1})),64))])):d.value.length?(m(),f(we,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:g(()=>[(m(!0),i(oe,null,ne(d.value,e=>(m(),i(`li`,{key:e.id,class:t([`panel p-3.5`,e.is_active===1&&`border-[var(--accent-tint-border)]`])},[S(`div`,an,[S(`div`,on,[S(`p`,{class:`line-clamp-2 text-sm`,style:p({fontFamily:o($)[e.font_family]?.css})},s(e.content),5),S(`div`,sn,[S(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:p(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},s(e.is_active===1?`生效中`:`已停用`),5),S(`span`,cn,[_(` #`+s(e.id)+` · `+s(o($)[e.font_family]?.label??e.font_family)+` `+s(e.font_size)+`px · `,1),S(`span`,{style:p({color:e.font_color})},s(e.font_color),5)]),S(`span`,ln,s(e.author??`系统`)+` · `+s(o(qe)(e.update_time)),1)])]),l(o(Ne),{round:!1,value:e.is_active===1,size:`small`,"onUpdate:value":t=>E(e)},null,8,[`value`,`onUpdate:value`])]),S(`div`,un,[l(o(L),{size:`tiny`,quaternary:``,onClick:t=>ue(e)},{icon:g(()=>[l(o(Z),{size:12})]),default:g(()=>[n[8]||=_(` 编辑 `,-1)]),_:1},8,[`onClick`]),l(o(L),{size:`tiny`,quaternary:``,onClick:t=>de(e)},{icon:g(()=>[l(o(ze),{size:12})]),default:g(()=>[n[9]||=_(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(m(),i(`div`,rn,[l(Je,{code:`00 / NO NOTICE`,title:`还没有发布过公告`,hint:`左侧写完保存，就会出现在这里`},{icon:g(()=>[l(o(Fe),{size:28})]),_:1})]))])])]))}});export{dn as default};