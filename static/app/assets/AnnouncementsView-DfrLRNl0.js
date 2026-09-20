import{B as e,Bt as t,Ct as n,Et as r,F as i,Ft as a,H as o,J as s,Nt as c,St as l,Tt as u,U as d,Ut as f,V as p,W as m,X as h,Y as g,_t as ee,an as _,ft as v,in as y,it as te,lt as ne,mt as re,n as b,p as x,pt as S,rn as ie,rt as C,tt as ae}from"./endpoints-C2GocQfh.js";import{$ as oe,A as se,B as ce,E as le,G as w,Gt as T,H as ue,I as E,J as de,Jt as D,K as fe,Kt as O,L as k,Q as pe,R as A,T as me,U as j,V as M,W as he,X as ge,Y as _e,Yt as N,Z as P,Zt as ve,at as F,ct as ye,ft as be,h as xe,ht as Se,it as I,k as Ce,n as L,nn as R,q as z,rn as we,rt as Te,st as B,vt as V,w as H}from"./createLucideIcon-Bpd2679P.js";import{a as Ee,t as U}from"./Input-5-_N6fit.js";import{c as W,l as De,o as G,s as K}from"./create-DYFyMSND.js";import{c as q,l as Oe,s as J}from"./Scrollbar-CISmNSMK.js";import{i as ke,t as Y}from"./Select-D6c6Amad.js";import{t as Ae}from"./use-merged-state-D_KLSz9B.js";import{t as je}from"./FormItem-1qYoQ_UO.js";import{t as Me}from"./InputNumber-DmPLUNvu.js";import{t as Ne}from"./Skeleton-BBqbZ9HY.js";import{t as Pe}from"./Switch-C7h2tjMt.js";import{t as Fe}from"./eye-PY5DPXDd.js";import{i as Ie,n as Le,r as Re}from"./paper-1Ie6Cgh2.js";import{t as X}from"./pencil-DXJW5PMB.js";import{t as ze}from"./plus-BbgcSz1n.js";import{t as Z}from"./refresh-cw-CMkcLwc3.js";import{t as Be}from"./trash-BjVYWzwb.js";import{L as Ve,S as He,U as Ue,a as We,ot as Ge,rt as Ke,u as qe}from"./index-CK-FFwtZ.js";import{x as Q,y as Je}from"./format-Ctvw4JoF.js";import{t as Ye}from"./EmptyState-Bgu14dKD.js";import{t as Xe}from"./PageHeader-CcBrnZvZ.js";var Ze=O(`input-group`,`
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
 `)])])])])])]),Qe=h({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=be(e);return ye(`-input-group`,Ze,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return v(),m(`div`,{class:I(`${e}-input-group`)},[B(()=>this.$slots.default?.())],2)}});function $e(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function et(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function tt(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=A(j(e));if(o===1){let e=nt([r,i,a]),o=nt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=nt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=nt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function nt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function rt(e){return e=Math.round(e),e>=360?359:e<0?0:e}function it(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var at={rgb:{hex(e){return M(A(e))},hsl(e){let[t,n,r,i]=A(e);return j([...pe(t,n,r),i])},hsv(e){let[t,n,r,i]=A(e);return w([...oe(t,n,r),i])}},hex:{rgb(e){return z(A(e))},hsl(e){let[t,n,r,i]=A(e);return j([...pe(t,n,r),i])},hsv(e){let[t,n,r,i]=A(e);return w([...oe(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=E(e);return M([..._e(t,n,r),i])},rgb(e){let[t,n,r,i]=E(e);return z([..._e(t,n,r),i])},hsv(e){let[t,n,r,i]=E(e);return w([...de(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=k(e);return M([...P(t,n,r),i])},rgb(e){let[t,n,r,i]=k(e);return z([...P(t,n,r),i])},hsl(e){let[t,n,r,i]=k(e);return j([...ge(t,n,r),i])}}};function ot(e,t,n){return n||=et(e),n?n===t?e:at[n][t](e):null}var st=[`onMousedown`],ct=`12px`,lt=12,ut=`6px`,dt=h({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(t){let n=a(null);function r(e){n.value&&t.rgba&&(q(`mousemove`,document,i),q(`mouseup`,document,o),i(e))}function i(e){let{value:r}=n;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(e.clientX-a)/(i-lt);t.onUpdateAlpha(it(o))}function o(){J(`mousemove`,document,i),J(`mouseup`,document,o),t.onComplete?.()}return{railRef:n,railBackgroundImage:e(()=>{let{rgba:e}=t;return e?`linear-gradient(to right, rgba(${e[0]}, ${e[1]}, ${e[2]}, 0) 0%, rgba(${e[0]}, ${e[1]}, ${e[2]}, 1) 100%)`:``}),handleMouseDown:r}},render(){let{clsPrefix:e}=this;return v(),m(`div`,{class:I(`${e}-color-picker-slider`),ref:`railRef`,style:y({height:ct,borderRadius:ut}),onMousedown:this.handleMouseDown},[p(`div`,{style:y({borderRadius:ut,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[p(`div`,{class:I(`${e}-color-picker-checkboard`)},null,2),p(`div`,{class:I(`${e}-color-picker-slider__image`),style:y({backgroundImage:this.railBackgroundImage})},null,6)],4),B(()=>this.rgba&&(v(),m(`div`,{style:y({position:`absolute`,left:ut,right:ut,top:0,bottom:0})},[p(`div`,{class:I(`${e}-color-picker-handle`),style:y({left:`calc(${this.alpha*100}% - ${ut})`,borderRadius:ut,width:ct,height:ct})},[p(`div`,{class:I(`${e}-color-picker-handle__fill`),style:y({backgroundColor:z(this.rgba),borderRadius:ut,width:ct,height:ct})},null,6)],6)],4)))],46,st)}}),ft=Se(`n-color-picker`);function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function gt(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function _t(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var vt={paddingSmall:`0 4px`},yt=h({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=a(``),{themeRef:r}=ae(ft,null);n(()=>{t.value=i()});function i(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function o(e){t.value=e}function s(n){let r,a;switch(e.label){case`HEX`:a=gt(n),a&&e.onUpdateValue(n),t.value=i();break;case`H`:r=mt(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`S`:case`L`:case`V`:r=ht(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`A`:r=_t(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`R`:case`G`:case`B`:r=pt(n),r===!1?t.value=i():e.onUpdateValue(r)}}return{mergedTheme:r,inputValue:t,handleInputChange:s,handleInputUpdateValue:o}},render(){let{mergedTheme:e}=this;return v(),o(U,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:vt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:y(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),bt=[`onClick`],xt=h({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?M:ce)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?w:he)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?z:fe)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?j:ue)(i))}}}},render(){let{clsPrefix:e,modes:t}=this;return v(),m(`div`,{class:I(`${e}-color-picker-input`)},[p(`div`,{class:I(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:y({cursor:t.length===1?``:`pointer`})},[B(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,bt),g(Qe,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?M:ce)(t)}catch{}return v(),o(yt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(v(),o(yt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),St=[`onClick`,`onKeydown`];function Ct(e,t){if(t===`hsv`){let[t,n,r,i]=k(e);return z([...P(t,n,r),i])}return e}function wt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Tt=h({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(t){let n=e(()=>t.swatches.map(e=>{let t=et(e);return{value:e,mode:t,legalValue:Ct(e,t)}}));function r(e){let{mode:n}=t,{value:r,mode:i}=e;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=wt(r):(V(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:ot(r,n,i)}function i(e){t.onUpdateColor(r(e))}function a(e,t){e.key===`Enter`&&i(t)}return{parsedSwatchesRef:n,handleSwatchSelect:i,handleSwatchKeyDown:a}},render(){let{clsPrefix:e}=this;return v(),m(`div`,{class:I(`${e}-color-picker-swatches`)},[B(()=>this.parsedSwatchesRef.map(t=>(v(),m(`div`,{class:I(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[p(`div`,{class:I(`${e}-color-picker-swatch__fill`),style:y({background:t.legalValue})},null,6)],42,St))))],2)}}),Et=[`onClick`],Dt=h({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:n}=ae(ft,null);return()=>{let{hsla:r,value:a,clsPrefix:o,onClick:s,disabled:c}=e,l=t.label||n.value;return v(),m(`div`,{class:I([`${o}-color-picker`,c&&`${o}-color-picker--disabled`]),onClick:c?void 0:s},[p(`div`,{class:I(`${o}-color-picker__fill`)},[p(`div`,{class:I(`${o}-color-picker-checkboard`)},null,2),p(`div`,{style:y({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:r?j(r):``})},null,4),a&&r?(v(),m(`div`,{key:0,class:I(`${o}-color-picker__value`),style:y({color:tt(r)?`white`:`black`})},[l?(v(),m(i,{key:0},[B(()=>l(a))],64)):(v(),m(i,{key:1},[B(()=>a)],64))],6)):B(()=>null)],2)],10,Et)}}}),Ot=[`value`,`onChange`],kt=h({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=et(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(ot(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return v(),m(`div`,{class:I(`${e}-color-picker-preview__preview`)},[p(`span`,{class:I(`${e}-color-picker-preview__fill`),style:y({background:this.color||`#000000`})},null,6),p(`input`,{class:I(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Ot)],2)}}),At=[`onMousedown`],jt=`12px`,Mt=12,$=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=h({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=a(null);function n(e){t.value&&(q(`mousemove`,document,r),q(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=rt((n.clientX-a-Nt)/(i-Mt)*360);e.onUpdateHue(o)}function i(){J(`mousemove`,document,r),J(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return v(),m(`div`,{class:I(`${e}-color-picker-slider`),style:y({height:jt,borderRadius:$})},[p(`div`,{ref:`railRef`,style:y({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:jt,borderRadius:$,position:`relative`}),onMousedown:this.handleMouseDown},[p(`div`,{style:y({position:`absolute`,left:$,right:$,top:0,bottom:0})},[p(`div`,{class:I(`${e}-color-picker-handle`),style:y({left:`calc((${this.hue}%) / 359 * 100 - ${$})`,borderRadius:$,width:jt,height:jt})},[p(`div`,{class:I(`${e}-color-picker-handle__fill`),style:y({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:$,width:jt,height:jt})},null,6)],6)],4)],44,At)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=h({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(t){let n=a(null);function r(e){n.value&&(q(`mousemove`,document,i),q(`mouseup`,document,o),i(e))}function i(e){let{value:r}=n;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-e.clientY)/a,l=(e.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);t.onUpdateSV(u,d)}function o(){J(`mousemove`,document,i),J(`mouseup`,document,o),t.onComplete?.()}return{palleteRef:n,handleColor:e(()=>{let{rgba:e}=t;return e?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:``}),handleMouseDown:r}},render(){let{clsPrefix:e}=this;return v(),m(`div`,{class:I(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[p(`div`,{class:I(`${e}-color-picker-pallete__layer`),style:y({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),p(`div`,{class:I(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),B(()=>this.rgba&&(v(),m(`div`,{class:I(`${e}-color-picker-handle`),style:y({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[p(`div`,{class:I(`${e}-color-picker-handle__fill`),style:y({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=T([O(`color-picker-panel`,`
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
 `,[Ue(),O(`input`,`
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
 `)])])])])]),Vt={...Ce.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:De.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=h({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(r,{slots:s}){let c=null;function u(e){c=e}let d=null,{mergedClsPrefixRef:f,namespaceRef:h,inlineThemeDisabled:g,mergedComponentPropsRef:ee}=be(r),_=xe(r,{mergedSize:e=>{let{size:t}=r;if(t)return t;let{mergedSize:n}=e||{};return n?.value?n.value:ee?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:ne,mergedDisabledRef:re}=_,{localeRef:b}=Ee(`global`),x=Ce(`ColorPicker`,`-color-picker`,Bt,Ve,r,f);S(ft,{themeRef:x,renderLabelRef:t(r,`renderLabel`),colorPickerSlots:s});let ie=a(r.defaultShow),C=Ae(t(r,`show`),ie);function ae(e){let{onUpdateShow:t,"onUpdate:show":n}=r;t&&me(t,e),n&&me(n,e),ie.value=e}let{defaultValue:T}=r,D=a(T===void 0?$e(r.modes,r.showAlpha):T),O=Ae(t(r,`value`),D),N=a([O.value]),F=a(0),ye=e(()=>et(O.value)),{modes:Se}=r,R=a(et(O.value)||Se[0]||`rgb`);function we(){let{modes:e}=r,{value:t}=R,n=e.findIndex(e=>e===t);~n?R.value=e[(n+1)%e.length]:R.value=`rgb`}let V,H,U,W,G,K,q,J,ke=e(()=>{let{value:e}=O;if(!e)return null;switch(ye.value){case`hsv`:return k(e);case`hsl`:return[V,H,U,J]=E(e),[...de(V,H,U),J];case`rgb`:case`hex`:return[G,K,q,J]=A(e),[...oe(G,K,q),J]}}),Y=e(()=>{let{value:e}=O;if(!e)return null;switch(ye.value){case`rgb`:case`hex`:return A(e);case`hsv`:return[V,H,W,J]=k(e),[...P(V,H,W),J];case`hsl`:return[V,H,U,J]=E(e),[..._e(V,H,U),J]}}),je=e(()=>{let{value:e}=O;if(!e)return null;switch(ye.value){case`hsl`:return E(e);case`hsv`:return[V,H,W,J]=k(e),[...ge(V,H,W),J];case`rgb`:case`hex`:return[G,K,q,J]=A(e),[...pe(G,K,q),J]}}),Me=e(()=>{switch(R.value){case`rgb`:case`hex`:return Y.value;case`hsv`:return ke.value;case`hsl`:return je.value}}),Ne=a(0),Pe=a(1),Fe=a([0,0]);function Ie(e,t){let{value:n}=ke,i=Ne.value,a=n?n[3]:1;Fe.value=[e,t];let{showAlpha:o}=r;switch(R.value){case`hsv`:X((o?w:he)([i,e,t,a]),`cursor`);break;case`hsl`:X((o?j:ue)([...ge(i,e,t),a]),`cursor`);break;case`rgb`:X((o?z:fe)([...P(i,e,t),a]),`cursor`);break;case`hex`:X((o?M:ce)([...P(i,e,t),a]),`cursor`)}}function Le(e){Ne.value=e;let{value:t}=ke;if(!t)return;let[,n,i,a]=t,{showAlpha:o}=r;switch(R.value){case`hsv`:X((o?w:he)([e,n,i,a]),`cursor`);break;case`rgb`:X((o?z:fe)([...P(e,n,i),a]),`cursor`);break;case`hex`:X((o?M:ce)([...P(e,n,i),a]),`cursor`);break;case`hsl`:X((o?j:ue)([...ge(e,n,i),a]),`cursor`)}}function Re(e){switch(R.value){case`hsv`:[V,H,W]=ke.value,X(w([V,H,W,e]),`cursor`);break;case`rgb`:[G,K,q]=Y.value,X(z([G,K,q,e]),`cursor`);break;case`hex`:[G,K,q]=Y.value,X(M([G,K,q,e]),`cursor`);break;case`hsl`:[V,H,U]=je.value,X(j([V,H,U,e]),`cursor`)}Pe.value=e}function X(e,t){d=t===`cursor`?e:null;let{nTriggerFormChange:n,nTriggerFormInput:i}=_,{onUpdateValue:a,"onUpdate:value":o}=r;a&&me(a,e),o&&me(o,e),n(),i(),D.value=e}function ze(e){X(e,`input`),te(Z)}function Z(e=!0){let{value:t}=O;if(t){let{nTriggerFormChange:n,nTriggerFormInput:i}=_,{onComplete:a}=r;a&&a(t);let{value:o}=N,{value:s}=F;e&&(o.splice(s+1,o.length,t),F.value=s+1),n(),i()}}function Be(){let{value:e}=F;e-1<0||(X(N.value[e-1],`input`),Z(!1),F.value=e-1)}function He(){let{value:e}=F;e<0||e+1>=N.value.length||(X(N.value[e+1],`input`),Z(!1),F.value=e+1)}function Ue(){X(null,`input`);let{onClear:e}=r;e&&e(),ae(!1)}function We(){let{value:e}=O,{onConfirm:t}=r;t&&t(e),ae(!1)}let Ge=e(()=>F.value>=1),Ke=e(()=>{let{value:e}=N;return e.length>1&&F.value<e.length-1});l(C,e=>{e||(N.value=[O.value],F.value=0)}),n(()=>{if(!(d&&d===O.value)){let{value:e}=ke;e&&(Ne.value=e[0],Pe.value=e[3],Fe.value=[e[1],e[2]])}d=null});let qe=e(()=>{let{value:e}=ne,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[ve(`height`,e)]:l,[ve(`fontSize`,e)]:u}}=x.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),Q=g?se(`color-picker`,e(()=>ne.value[0]),qe,r):void 0;function Je(){let{value:e}=Y,{value:t}=Ne,{internalActions:n,modes:a,actions:c}=r,{value:l}=x,{value:u}=f;return(()=>{let d=Te(`550d4636453f407b`);return v(),m(`div`,{class:I([`${u}-color-picker-panel`,Q?.themeClass.value]),onDragstart:d[0]||=e=>{e.preventDefault()},style:y(g?void 0:qe.value)},[p(`div`,{class:I(`${u}-color-picker-control`)},[(v(),o(zt,{clsPrefix:u,rgba:e,displayedHue:t,displayedSv:Fe.value,onUpdateSV:Ie,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),p(`div`,{class:I(`${u}-color-picker-preview`)},[p(`div`,{class:I(`${u}-color-picker-preview__sliders`)},[(v(),o(Ft,{clsPrefix:u,hue:t,onUpdateHue:Le,onComplete:Z},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),r.showAlpha?(v(),o(dt,{key:0,clsPrefix:u,rgba:e,alpha:Pe.value,onUpdateAlpha:Re,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):B(()=>null)],2),r.showPreview?(v(),o(kt,{key:0,clsPrefix:u,mode:R.value,color:Y.value&&ce(Y.value),onUpdateColor:d[1]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):B(()=>null)],2),(v(),o(xt,{clsPrefix:u,showAlpha:r.showAlpha,mode:R.value,modes:a,onUpdateMode:we,value:O.value,valueArr:Me.value,onUpdateValue:ze},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),B(()=>r.swatches?.length&&(()=>{let e=Te(`1de0b88852ebf5cb`);return v(),o(Tt,{clsPrefix:u,mode:R.value,swatches:r.swatches,onUpdateColor:e[0]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),c?.length?(v(),m(`div`,{key:0,class:I(`${u}-color-picker-action`)},[B(()=>c.includes(`confirm`)&&(v(),o(L,{size:`small`,onClick:We,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>b.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),B(()=>c.includes(`clear`)&&(v(),o(L,{size:`small`,onClick:Ue,disabled:!O.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>b.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):B(()=>null),s.action?(v(),m(`div`,{key:2,class:I(`${u}-color-picker-action`)},[B(()=>s.action?.())],2)):(v(),m(i,{key:3},[n?(v(),m(`div`,{key:0,class:I(`${u}-color-picker-action`)},[B(()=>n.includes(`undo`)&&(v(),o(L,{size:`small`,onClick:Be,disabled:!Ge.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>b.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),B(()=>n.includes(`redo`)&&(v(),o(L,{size:`small`,onClick:He,disabled:!Ke.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>b.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):B(()=>null)],64))],38)})()}return{mergedClsPrefix:f,namespace:h,hsla:je,rgba:Y,mergedShow:C,mergedDisabled:re,isMounted:le(),adjustedTo:De(r),mergedValue:O,handleTriggerClick(){re.value||ae(!0)},setTriggerRef:u,handleClickOutside(e){if(c instanceof Element){if(c.contains(Oe(e)))return}else if(c&&c.$el.contains(Oe(e)))return;ae(!1)},renderPanel:Je,cssVars:g?void 0:qe,themeClass:Q?.themeClass,onRender:Q?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),v(),o(W,null,{default:()=>[(v(),o(K,null,{default:()=>{let t=C(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=ke([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),H(this.$slots.trigger,Ge(t,[`value`,`onClick`,`ref`]),n=>n||(v(),o(Dt,C(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(v(),o(G,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===De.tdkey,to:this.adjustedTo},{_:1,default:F(()=>(v(),o(R,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:F(()=>this.mergedShow?r(this.renderPanel(),[[Ke,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},Qt={key:0,class:`mt-1 text-xs text-ink-3`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-xs text-ink-3`},tn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},nn={key:0,class:`flex flex-col gap-2`},rn={key:1,class:`panel grid place-items-center py-12`},an={class:`flex items-start justify-between gap-3`},on={class:`min-w-0 flex-1`},sn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},cn={class:`tnum text-xs text-ink-3`},ln={class:`text-xs text-ink-3`},un={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},dn=h({__name:`AnnouncementsView`,setup(t){let n=He(),r=Re(),l=a([]),h=a(!0),te=a(!1),S=a(null),C=c({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ae=Object.keys(Q).map(e=>({label:Q[e].label,value:e})),oe=e(()=>({fontFamily:Q[C.font_family].css,fontSize:`${C.font_size}px`})),se=e(()=>[`light`,`dark`].map(e=>{let t=Le()[e],n=We(t.paper,C.font_color,C.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:C.font_color,overridden:n}})),ce=e(()=>C.content.trim().length>0&&!te.value);function le(){S.value=null,C.content=``,C.font_family=`system`,C.font_size=15,C.font_color=`#1f2328`}async function w(e=!1){e||(h.value=!0);try{let e=await b.list();l.value=e.announcements}catch(e){n.error(e instanceof x?e.message:`加载公告失败`)}finally{h.value=!1}}async function T(){if(!ce.value)return;te.value=!0;let e={content:C.content.trim(),font_family:C.font_family,font_size:C.font_size,font_color:C.font_color};try{S.value===null?(await b.create(e),n.success(`公告已发布`)):(await b.update(S.value,e),n.success(`公告已更新`)),le(),await w(!0),await r.load()}catch(e){n.error(e instanceof x?e.message:`保存失败`)}finally{te.value=!1}}function ue(e){S.value=e.id,C.content=e.content,C.font_family=e.font_family,C.font_size=e.font_size,C.font_color=e.font_color}async function E(e){let t=e.is_active!==1;try{await b.setActive(e.id,t),n.success(t?`公告已启用`:`公告已停用`),await w(!0),await r.load()}catch(e){n.error(e instanceof x?e.message:`操作失败`)}}async function de(e){if(await qe({title:`删除公告`,content:`这条公告会被删除，不可恢复。`,positiveText:`删除`}))try{await b.remove(e.id),n.success(`公告已删除`),S.value===e.id&&le(),await w(!0),await r.load()}catch(e){n.error(e instanceof x?e.message:`删除失败`)}}return ne(w),(e,t)=>(v(),m(`div`,Ut,[g(Xe,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:u(()=>[g(f(L),{size:`small`,quaternary:``,loading:h.value,onClick:t[0]||=e=>w()},{icon:u(()=>[g(f(Z),{size:15})]),default:u(()=>[t[5]||=s(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),p(`div`,Wt,[p(`section`,Gt,[p(`h3`,Kt,[(v(),o(ee(S.value===null?f(ze):f(X)),{size:15,style:{color:`var(--accent-text)`}})),s(` `+_(S.value===null?`发布新公告`:`编辑公告 #${S.value}`),1)]),g(f(je),{label:`公告内容`,"show-feedback":!1},{default:u(()=>[g(f(U),{value:C.content,"onUpdate:value":t[1]||=e=>C.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),p(`div`,qt,[g(f(je),{label:`字体`,"show-feedback":!1},{default:u(()=>[g(f(Y),{value:C.font_family,"onUpdate:value":t[2]||=e=>C.font_family=e,options:f(ae),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),g(f(je),{label:`字号`,"show-feedback":!1},{default:u(()=>[g(f(Me),{value:C.font_size,"onUpdate:value":t[3]||=e=>C.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),g(f(je),{label:`文字颜色`,"show-feedback":!1},{default:u(()=>[g(f(Ht),{value:C.font_color,"onUpdate:value":t[4]||=e=>C.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),p(`div`,Jt,[p(`div`,Yt,[g(f(Fe),{size:12}),t[6]||=s(` 预览 `,-1)]),p(`div`,Xt,[(v(!0),m(i,null,re(se.value,e=>(v(),m(`div`,{key:e.key},[p(`div`,Zt,_(e.label),1),p(`div`,{class:`border p-3`,style:y({backgroundColor:e.paper,borderColor:e.line})},[p(`p`,{class:`whitespace-pre-wrap break-words`,style:y([oe.value,{color:e.ink}])},_(C.content.trim()||`公告内容会显示在这里`),5)],4),e.overridden?(v(),m(`p`,Qt,` 对比度不足 · 会回落到主题文字色 `)):d(``,!0)]))),128))])]),p(`div`,$t,[g(f(L),{type:`primary`,class:`!font-bold`,loading:te.value,disabled:!ce.value,onClick:T},{icon:u(()=>[g(f(Ie),{size:15})]),default:u(()=>[s(` `+_(S.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),S.value===null?d(``,!0):(v(),o(f(L),{key:0,quaternary:``,onClick:le},{default:u(()=>[...t[7]||=[s(`取消编辑`,-1)]]),_:1}))]),S.value===null?(v(),m(`p`,en,` 保存后立即生效，并停用上一条公告。 `)):d(``,!0)]),p(`section`,tn,[t[10]||=p(`h3`,{class:`mb-3 font-heading text-base font-bold`},[s(` 历史公告 `),p(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),h.value&&!l.value.length?(v(),m(`div`,nn,[(v(),m(i,null,re(3,e=>g(f(Ne),{key:e,height:`92px`,sharp:!1})),64))])):l.value.length?(v(),o(we,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:u(()=>[(v(!0),m(i,null,re(l.value,e=>(v(),m(`li`,{key:e.id,class:ie([`panel p-3.5`,e.is_active===1&&`border-[var(--accent-tint-border)]`])},[p(`div`,an,[p(`div`,on,[p(`p`,{class:`line-clamp-2 text-sm`,style:y({fontFamily:f(Q)[e.font_family]?.css})},_(e.content),5),p(`div`,sn,[p(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:y(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},_(e.is_active===1?`生效中`:`已停用`),5),p(`span`,cn,[s(` #`+_(e.id)+` · `+_(f(Q)[e.font_family]?.label??e.font_family)+` `+_(e.font_size)+`px · `,1),p(`span`,{style:y({color:e.font_color})},_(e.font_color),5)]),p(`span`,ln,_(e.author??`系统`)+` · `+_(f(Je)(e.update_time)),1)])]),g(f(Pe),{round:!1,value:e.is_active===1,size:`small`,"onUpdate:value":t=>E(e)},null,8,[`value`,`onUpdate:value`])]),p(`div`,un,[g(f(L),{size:`tiny`,quaternary:``,onClick:t=>ue(e)},{icon:u(()=>[g(f(X),{size:12})]),default:u(()=>[t[8]||=s(` 编辑 `,-1)]),_:1},8,[`onClick`]),g(f(L),{size:`tiny`,quaternary:``,onClick:t=>de(e)},{icon:u(()=>[g(f(Be),{size:12})]),default:u(()=>[t[9]||=s(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(v(),m(`div`,rn,[g(Ye,{code:`00 / NO NOTICE`,title:`还没有发布过公告`,hint:`左侧写完保存，就会出现在这里`},{icon:u(()=>[g(f(Ie),{size:28})]),_:1})]))])])]))}});export{dn as default};