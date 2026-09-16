import{An as e,Bn as t,Cn as n,Cr as r,D as i,Dn as a,Er as o,Et as s,Fn as c,H as l,I as u,Kn as ee,L as d,Mt as f,Nn as p,On as m,Pn as h,Q as g,R as te,St as ne,Tr as _,V as re,Vn as ie,X as v,Xn as ae,Yn as y,Z as b,Zn as oe,_n as se,_t as ce,an as x,ar as S,at as C,br as le,cn as w,ct as ue,dn as de,dt as T,er as fe,et as pe,f as me,ft as he,gn as ge,hr as E,it as _e,jn as D,kn as O,kt as k,ln as A,lt as ve,m as j,n as M,nr as ye,nt as be,on as N,or as xe,ot as Se,pr as P,pt as Ce,rr as we,rt as F,st as I,tt as L,ut as Te,vt as R,wr as Ee,xt as z,yt as B,zn as V}from"./endpoints-DguQVVk7.js";import{n as De,t as H}from"./Empty-BFjxMWo5.js";import{c as U,l as Oe,o as W,s as G}from"./create-wvpIv_n8.js";import{c as K,l as ke,s as q}from"./Scrollbar-DSXt8xuo.js";import{t as Ae}from"./use-merged-state-DzXhUbEL.js";import{i as je,t as J}from"./Select-BY4yWkgX.js";import{t as Y}from"./FormItem-0b5jkXX7.js";import{t as Me}from"./Input-B9tzuA0A.js";import{t as Ne}from"./InputNumber-CuY-OoLb.js";import{t as Pe}from"./Skeleton-BTWN3gZh.js";import{t as Fe}from"./Switch-GZJ4SM2e.js";import{$ as Ie,N as Le,b as Re,nt as ze,o as X,r as Be,z as Z}from"./index-DwEf3xIY.js";import{t as Ve}from"./eye-DEFw24Y2.js";import{i as He,n as Ue,r as We}from"./paper-BcrXNAgy.js";import{t as Ge}from"./pencil-B6AORxVp.js";import{t as Ke}from"./plus-Bey8VxOd.js";import{t as qe}from"./refresh-cw-CwzhJGPL.js";import{t as Je}from"./trash-DFW2R4e2.js";import{n as Ye}from"./types-DKn5MR2h.js";import{v as Xe}from"./format-D-wfinI7.js";import{t as Ze}from"./PageHeader-Qe33H4Ei.js";var Qe=N(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[x(`>`,[N(`input`,[x(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),x(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),N(`button`,[x(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[w(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),x(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[w(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),x(`*`,[x(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[x(`>`,[N(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),N(`base-selection`,[N(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),N(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),w(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),x(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[x(`>`,[N(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),N(`base-selection`,[N(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),N(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),w(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),$e=c({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=s(e);return ne(`-input-group`,Qe,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return y(),D(`div`,{class:R(`${e}-input-group`)},[z(()=>this.$slots.default?.())],2)}});function et(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function tt(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function nt(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=g(F(e));if(o===1){let e=rt([r,i,a]),o=rt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=rt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=rt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function rt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function it(e){return e=Math.round(e),e>=360?359:e<0?0:e}function at(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var ot={rgb:{hex(e){return L(g(e))},hsl(e){let[t,n,r,i]=g(e);return F([...he(t,n,r),i])},hsv(e){let[t,n,r,i]=g(e);return C([...Ce(t,n,r),i])}},hex:{rgb(e){return I(g(e))},hsl(e){let[t,n,r,i]=g(e);return F([...he(t,n,r),i])},hsv(e){let[t,n,r,i]=g(e);return C([...Ce(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=v(e);return L([...ve(t,n,r),i])},rgb(e){let[t,n,r,i]=v(e);return I([...ve(t,n,r),i])},hsv(e){let[t,n,r,i]=v(e);return C([...ue(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=b(e);return L([...T(t,n,r),i])},rgb(e){let[t,n,r,i]=b(e);return I([...T(t,n,r),i])},hsl(e){let[t,n,r,i]=b(e);return F([...Te(t,n,r),i])}}};function st(e,t,n){return n||=tt(e),n?n===t?e:ot[n][t](e):null}var ct=[`onMousedown`],lt=`12px`,ut=12,Q=`6px`,dt=c({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=E(null);function n(n){t.value&&e.rgba&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-ut);e.onUpdateAlpha(at(o))}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,railBackgroundImage:a(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return y(),D(`div`,{class:R(`${e}-color-picker-slider`),ref:`railRef`,style:_({height:lt,borderRadius:Q}),onMousedown:this.handleMouseDown},[m(`div`,{style:_({borderRadius:Q,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[m(`div`,{class:R(`${e}-color-picker-checkboard`)},null,2),m(`div`,{class:R(`${e}-color-picker-slider__image`),style:_({backgroundImage:this.railBackgroundImage})},null,6)],4),z(()=>this.rgba&&(y(),D(`div`,{style:_({position:`absolute`,left:Q,right:Q,top:0,bottom:0})},[m(`div`,{class:R(`${e}-color-picker-handle`),style:_({left:`calc(${this.alpha*100}% - ${Q})`,borderRadius:Q,width:lt,height:lt})},[m(`div`,{class:R(`${e}-color-picker-handle__fill`),style:_({backgroundColor:I(this.rgba),borderRadius:Q,width:lt,height:lt})},null,6)],6)],4)))],46,ct)}}),ft=k(`n-color-picker`);function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function gt(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function _t(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var vt={paddingSmall:`0 4px`},yt=c({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=E(``),{themeRef:n}=V(ft,null);we(()=>{t.value=r()});function r(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function i(e){t.value=e}function a(n){let i,a;switch(e.label){case`HEX`:a=gt(n),a&&e.onUpdateValue(n),t.value=r();break;case`H`:i=mt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`S`:case`L`:case`V`:i=ht(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`A`:i=_t(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`R`:case`G`:case`B`:i=pt(n),i===!1?t.value=r():e.onUpdateValue(i)}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:i}},render(){let{mergedTheme:e}=this;return y(),O(Me,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:vt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:_(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),bt=[`onClick`],xt=c({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?L:pe)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?C:_e)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?I:Se)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?F:be)(i))}}}},render(){let{clsPrefix:e,modes:t}=this;return y(),D(`div`,{class:R(`${e}-color-picker-input`)},[m(`div`,{class:R(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:_({cursor:t.length===1?``:`pointer`})},[z(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,bt),h($e,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?L:pe)(t)}catch{}return y(),O(yt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(y(),O(yt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),St=[`onClick`,`onKeydown`];function Ct(e,t){if(t===`hsv`){let[t,n,r,i]=b(e);return I([...T(t,n,r),i])}return e}function wt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Tt=c({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=a(()=>e.swatches.map(e=>{let t=tt(e);return{value:e,mode:t,legalValue:Ct(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=wt(r):(f(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:st(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:e}=this;return y(),D(`div`,{class:R(`${e}-color-picker-swatches`)},[z(()=>this.parsedSwatchesRef.map(t=>(y(),D(`div`,{class:R(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[m(`div`,{class:R(`${e}-color-picker-swatch__fill`),style:_({background:t.legalValue})},null,6)],42,St))))],2)}}),Et=[`onClick`],Dt=c({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:r}=V(ft,null);return()=>{let{hsla:i,value:a,clsPrefix:o,onClick:s,disabled:c}=e,l=t.label||r.value;return y(),D(`div`,{class:R([`${o}-color-picker`,c&&`${o}-color-picker--disabled`]),onClick:c?void 0:s},[m(`div`,{class:R(`${o}-color-picker__fill`)},[m(`div`,{class:R(`${o}-color-picker-checkboard`)},null,2),m(`div`,{style:_({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:i?F(i):``})},null,4),a&&i?(y(),D(`div`,{key:0,class:R(`${o}-color-picker__value`),style:_({color:nt(i)?`white`:`black`})},[l?(y(),D(n,{key:0},[z(()=>l(a))],64)):(y(),D(n,{key:1},[z(()=>a)],64))],6)):z(()=>null)],2)],10,Et)}}}),Ot=[`value`,`onChange`],kt=c({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=tt(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(st(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return y(),D(`div`,{class:R(`${e}-color-picker-preview__preview`)},[m(`span`,{class:R(`${e}-color-picker-preview__fill`),style:_({background:this.color||`#000000`})},null,6),m(`input`,{class:R(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Ot)],2)}}),At=[`onMousedown`],jt=`12px`,Mt=12,$=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=c({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=E(null);function n(e){t.value&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=it((n.clientX-a-Nt)/(i-Mt)*360);e.onUpdateHue(o)}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return y(),D(`div`,{class:R(`${e}-color-picker-slider`),style:_({height:jt,borderRadius:$})},[m(`div`,{ref:`railRef`,style:_({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:jt,borderRadius:$,position:`relative`}),onMousedown:this.handleMouseDown},[m(`div`,{style:_({position:`absolute`,left:$,right:$,top:0,bottom:0})},[m(`div`,{class:R(`${e}-color-picker-handle`),style:_({left:`calc((${this.hue}%) / 359 * 100 - ${$})`,borderRadius:$,width:jt,height:jt})},[m(`div`,{class:R(`${e}-color-picker-handle__fill`),style:_({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:$,width:jt,height:jt})},null,6)],6)],4)],44,At)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=c({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=E(null);function n(e){t.value&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),ee=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,ee)}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{palleteRef:t,handleColor:a(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return y(),D(`div`,{class:R(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[m(`div`,{class:R(`${e}-color-picker-pallete__layer`),style:_({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),m(`div`,{class:R(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),z(()=>this.rgba&&(y(),D(`div`,{class:R(`${e}-color-picker-handle`),style:_({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[m(`div`,{class:R(`${e}-color-picker-handle__fill`),style:_({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=x([N(`color-picker-panel`,`
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
 `,[Z(),N(`input`,`
 text-align: center;
 `)]),N(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[x(`&::after`,`
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
 `)]),N(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[w(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),x(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),N(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[w(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),N(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[w(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[A(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),N(`color-picker-preview`,`
 display: flex;
 `,[w(`sliders`,`
 flex: 1 0 auto;
 `),w(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),w(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),w(`input`,`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),N(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[N(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),w(`mode`,`
 width: 72px;
 text-align: center;
 `)]),N(`color-picker-control`,`
 padding: 12px;
 `),N(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[N(`button`,`margin-left: 8px;`)]),N(`color-picker`,`
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
 `,[A(`disabled`,`cursor: not-allowed`),w(`value`,`
 white-space: nowrap;
 position: relative;
 `),w(`fill`,`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),N(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[x(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),N(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[N(`color-picker-swatch`,`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[w(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),x(`&:focus`,`
 outline: none;
 `,[w(`fill`,[x(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Vt={...re.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Oe.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=c({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(e,{slots:t}){let r=null;function o(e){r=e}let c=null,{mergedClsPrefixRef:u,namespaceRef:ee,inlineThemeDisabled:f,mergedComponentPropsRef:p}=s(e),h=i(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:p?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:ne,mergedDisabledRef:oe}=h,{localeRef:se}=De(`global`),x=re(`ColorPicker`,`-color-picker`,Bt,Le,e,u);ae(ft,{themeRef:x,renderLabelRef:le(e,`renderLabel`),colorPickerSlots:t});let S=E(e.defaultShow),w=Ae(le(e,`show`),S);function fe(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&d(n,t),r&&d(r,t),S.value=t}let{defaultValue:me}=e,ge=E(me===void 0?et(e.modes,e.showAlpha):me),k=Ae(le(e,`value`),ge),A=E([k.value]),M=E(0),N=a(()=>tt(k.value)),{modes:xe}=e,P=E(tt(k.value)||xe[0]||`rgb`);function Ee(){let{modes:t}=e,{value:n}=P,r=t.findIndex(e=>e===n);~r?P.value=t[(r+1)%t.length]:P.value=`rgb`}let B,V,H,U,W,G,K,q,je=a(()=>{let{value:e}=k;if(!e)return null;switch(N.value){case`hsv`:return b(e);case`hsl`:return[B,V,H,q]=v(e),[...ue(B,V,H),q];case`rgb`:case`hex`:return[W,G,K,q]=g(e),[...Ce(W,G,K),q]}}),J=a(()=>{let{value:e}=k;if(!e)return null;switch(N.value){case`rgb`:case`hex`:return g(e);case`hsv`:return[B,V,U,q]=b(e),[...T(B,V,U),q];case`hsl`:return[B,V,H,q]=v(e),[...ve(B,V,H),q]}}),Y=a(()=>{let{value:e}=k;if(!e)return null;switch(N.value){case`hsl`:return v(e);case`hsv`:return[B,V,U,q]=b(e),[...Te(B,V,U),q];case`rgb`:case`hex`:return[W,G,K,q]=g(e),[...he(W,G,K),q]}}),Me=a(()=>{switch(P.value){case`rgb`:case`hex`:return J.value;case`hsv`:return je.value;case`hsl`:return Y.value}}),Ne=E(0),Pe=E(1),Fe=E([0,0]);function Ie(t,n){let{value:r}=je,i=Ne.value,a=r?r[3]:1;Fe.value=[t,n];let{showAlpha:o}=e;switch(P.value){case`hsv`:X((o?C:_e)([i,t,n,a]),`cursor`);break;case`hsl`:X((o?F:be)([...Te(i,t,n),a]),`cursor`);break;case`rgb`:X((o?I:Se)([...T(i,t,n),a]),`cursor`);break;case`hex`:X((o?L:pe)([...T(i,t,n),a]),`cursor`)}}function Re(t){Ne.value=t;let{value:n}=je;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=e;switch(P.value){case`hsv`:X((o?C:_e)([t,r,i,a]),`cursor`);break;case`rgb`:X((o?I:Se)([...T(t,r,i),a]),`cursor`);break;case`hex`:X((o?L:pe)([...T(t,r,i),a]),`cursor`);break;case`hsl`:X((o?F:be)([...Te(t,r,i),a]),`cursor`)}}function ze(e){switch(P.value){case`hsv`:[B,V,U]=je.value,X(C([B,V,U,e]),`cursor`);break;case`rgb`:[W,G,K]=J.value,X(I([W,G,K,e]),`cursor`);break;case`hex`:[W,G,K]=J.value,X(L([W,G,K,e]),`cursor`);break;case`hsl`:[B,V,H]=Y.value,X(F([B,V,H,e]),`cursor`)}Pe.value=e}function X(t,n){c=n===`cursor`?t:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=h,{onUpdateValue:a,"onUpdate:value":o}=e;a&&d(a,t),o&&d(o,t),r(),i(),ge.value=t}function Be(e){X(e,`input`),ie(Z)}function Z(t=!0){let{value:n}=k;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=h,{onComplete:a}=e;a&&a(n);let{value:o}=A,{value:s}=M;t&&(o.splice(s+1,o.length,n),M.value=s+1),r(),i()}}function Ve(){let{value:e}=M;e-1<0||(X(A.value[e-1],`input`),Z(!1),M.value=e-1)}function He(){let{value:e}=M;e<0||e+1>=A.value.length||(X(A.value[e+1],`input`),Z(!1),M.value=e+1)}function Ue(){X(null,`input`);let{onClear:t}=e;t&&t(),fe(!1)}function We(){let{value:t}=k,{onConfirm:n}=e;n&&n(t),fe(!1)}let Ge=a(()=>M.value>=1),Ke=a(()=>{let{value:e}=A;return e.length>1&&M.value<e.length-1});ye(w,e=>{e||(A.value=[k.value],M.value=0)}),we(()=>{if(!(c&&c===k.value)){let{value:e}=je;e&&(Ne.value=e[0],Pe.value=e[3],Fe.value=[e[1],e[2]])}c=null});let qe=a(()=>{let{value:e}=ne,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[de(`height`,e)]:l,[de(`fontSize`,e)]:u}}=x.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),Je=f?l(`color-picker`,a(()=>ne.value[0]),qe,e):void 0;function Ye(){let{value:r}=J,{value:i}=Ne,{internalActions:a,modes:o,actions:s}=e,{value:c}=x,{value:l}=u;return(()=>{let u=ce(`550d4636453f407b`);return y(),D(`div`,{class:R([`${l}-color-picker-panel`,Je?.themeClass.value]),onDragstart:u[0]||=e=>{e.preventDefault()},style:_(f?void 0:qe.value)},[m(`div`,{class:R(`${l}-color-picker-control`)},[(y(),O(zt,{clsPrefix:l,rgba:r,displayedHue:i,displayedSv:Fe.value,onUpdateSV:Ie,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),m(`div`,{class:R(`${l}-color-picker-preview`)},[m(`div`,{class:R(`${l}-color-picker-preview__sliders`)},[(y(),O(Ft,{clsPrefix:l,hue:i,onUpdateHue:Re,onComplete:Z},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),e.showAlpha?(y(),O(dt,{key:0,clsPrefix:l,rgba:r,alpha:Pe.value,onUpdateAlpha:ze,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):z(()=>null)],2),e.showPreview?(y(),O(kt,{key:0,clsPrefix:l,mode:P.value,color:J.value&&pe(J.value),onUpdateColor:u[1]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):z(()=>null)],2),(y(),O(xt,{clsPrefix:l,showAlpha:e.showAlpha,mode:P.value,modes:o,onUpdateMode:Ee,value:k.value,valueArr:Me.value,onUpdateValue:Be},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),z(()=>e.swatches?.length&&(()=>{let t=ce(`1de0b88852ebf5cb`);return y(),O(Tt,{clsPrefix:l,mode:P.value,swatches:e.swatches,onUpdateColor:t[0]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),s?.length?(y(),D(`div`,{key:0,class:R(`${l}-color-picker-action`)},[z(()=>s.includes(`confirm`)&&(y(),O(j,{size:`small`,onClick:We,theme:c.peers.Button,themeOverrides:c.peerOverrides.Button},{default:()=>se.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),z(()=>s.includes(`clear`)&&(y(),O(j,{size:`small`,onClick:Ue,disabled:!k.value,theme:c.peers.Button,themeOverrides:c.peerOverrides.Button},{default:()=>se.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):z(()=>null),t.action?(y(),D(`div`,{key:2,class:R(`${l}-color-picker-action`)},[z(()=>t.action?.())],2)):(y(),D(n,{key:3},[a?(y(),D(`div`,{key:0,class:R(`${l}-color-picker-action`)},[z(()=>a.includes(`undo`)&&(y(),O(j,{size:`small`,onClick:Ve,disabled:!Ge.value,theme:c.peers.Button,themeOverrides:c.peerOverrides.Button},{default:()=>se.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),z(()=>a.includes(`redo`)&&(y(),O(j,{size:`small`,onClick:He,disabled:!Ke.value,theme:c.peers.Button,themeOverrides:c.peerOverrides.Button},{default:()=>se.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):z(()=>null)],64))],38)})()}return{mergedClsPrefix:u,namespace:ee,hsla:Y,rgba:J,mergedShow:w,mergedDisabled:oe,isMounted:te(),adjustedTo:Oe(e),mergedValue:k,handleTriggerClick(){oe.value||fe(!0)},setTriggerRef:o,handleClickOutside(e){if(r instanceof Element){if(r.contains(ke(e)))return}else if(r&&r.$el.contains(ke(e)))return;fe(!1)},renderPanel:Ye,cssVars:f?void 0:qe,themeClass:Je?.themeClass,onRender:Je?.onRender}},render(){let{mergedClsPrefix:e,onRender:n}=this;return n?.(),y(),O(U,null,{default:()=>[(y(),O(G,null,{default:()=>{let n=t(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return n.onClick=je([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),u(this.$slots.trigger,ze(n,[`value`,`onClick`,`ref`]),r=>r||(y(),O(Dt,t(n,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(y(),O(W,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Oe.tdkey,to:this.adjustedTo},{_:1,default:B(()=>(y(),O(ge,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:B(()=>this.mergedShow?xe(this.renderPanel(),[[Ie,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-[15px] font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-4`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-4`},Qt={key:0,class:`mt-1 text-[11px] text-ink-4`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-[11px] text-ink-4`},tn={key:0,class:`flex flex-col gap-2`},nn={key:1,class:`panel grid place-items-center py-12`},rn={class:`flex items-start justify-between gap-3`},an={class:`min-w-0 flex-1`},on={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},sn={class:`tnum text-[11px] text-ink-4`},cn={class:`text-[11px] text-ink-4`},ln={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},un=c({__name:`AnnouncementsView`,setup(t){let i=Re(),s=We(),c=E([]),l=E(!0),u=E(!1),d=E(null),f=P({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),g=Object.keys(Ye).map(e=>({label:Ye[e].label,value:e})),te=a(()=>({fontFamily:Ye[f.font_family].css,fontSize:`${f.font_size}px`})),ne=a(()=>[`light`,`dark`].map(e=>{let t=Ue()[e],n=Be(t.paper,f.font_color,f.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:f.font_color,overridden:n}})),re=a(()=>f.content.trim().length>0&&!u.value);function ie(){d.value=null,f.content=``,f.font_family=`system`,f.font_size=15,f.font_color=`#1f2328`}async function v(e=!1){e||(l.value=!0);try{let e=await M.list();c.value=e.announcements}catch(e){i.error(e instanceof me?e.message:`加载公告失败`)}finally{l.value=!1}}async function ae(){if(!re.value)return;u.value=!0;let e={content:f.content.trim(),font_family:f.font_family,font_size:f.font_size,font_color:f.font_color};try{d.value===null?(await M.create(e),i.success(`公告已发布`)):(await M.update(d.value,e),i.success(`公告已更新`)),ie(),await v(!0),await s.load()}catch(e){i.error(e instanceof me?e.message:`保存失败`)}finally{u.value=!1}}function b(e){d.value=e.id,f.content=e.content,f.font_family=e.font_family,f.font_size=e.font_size,f.font_color=e.font_color}async function ce(e){let t=e.is_active!==1;try{await M.setActive(e.id,t),i.success(t?`公告已启用`:`公告已停用`),await v(!0),await s.load()}catch(e){i.error(e instanceof me?e.message:`操作失败`)}}async function x(e){if(await X({title:`删除公告`,content:`确定删除这条公告吗？删除后不可恢复。`,positiveText:`删除`}))try{await M.remove(e.id),i.success(`公告已删除`),d.value===e.id&&ie(),await v(!0),await s.load()}catch(e){i.error(e instanceof me?e.message:`删除失败`)}}return ee(v),(t,i)=>(y(),D(`div`,Ut,[h(Ze,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:S(()=>[h(r(j),{size:`small`,quaternary:``,loading:l.value,onClick:i[0]||=e=>v()},{icon:S(()=>[h(r(qe),{size:15})]),default:S(()=>[i[5]||=p(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),m(`div`,Wt,[m(`section`,Gt,[m(`h3`,Kt,[(y(),O(fe(d.value===null?r(Ke):r(Ge)),{size:15,style:{color:`var(--primary)`}})),p(` `+o(d.value===null?`发布新公告`:`编辑公告 #${d.value}`),1)]),h(r(Y),{label:`公告内容`,"show-feedback":!1},{default:S(()=>[h(r(Me),{value:f.content,"onUpdate:value":i[1]||=e=>f.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),m(`div`,qt,[h(r(Y),{label:`字体`,"show-feedback":!1},{default:S(()=>[h(r(J),{value:f.font_family,"onUpdate:value":i[2]||=e=>f.font_family=e,options:r(g),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),h(r(Y),{label:`字号`,"show-feedback":!1},{default:S(()=>[h(r(Ne),{value:f.font_size,"onUpdate:value":i[3]||=e=>f.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),h(r(Y),{label:`文字颜色`,"show-feedback":!1},{default:S(()=>[h(r(Ht),{value:f.font_color,"onUpdate:value":i[4]||=e=>f.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),m(`div`,Jt,[m(`div`,Yt,[h(r(Ve),{size:12}),i[6]||=p(` 预览 `,-1)]),m(`div`,Xt,[(y(!0),D(n,null,oe(ne.value,t=>(y(),D(`div`,{key:t.key},[m(`div`,Zt,o(t.label),1),m(`div`,{class:`rounded-[12px] border p-3`,style:_({backgroundColor:t.paper,borderColor:t.line})},[m(`p`,{class:`whitespace-pre-wrap break-words`,style:_([te.value,{color:t.ink}])},o(f.content.trim()||`公告内容会显示在这里`),5)],4),t.overridden?(y(),D(`p`,Qt,` 所选颜色与`+o(t.label)+`纸面对比度不足，实际会回落到主题文字色 `,1)):e(``,!0)]))),128))])]),m(`div`,$t,[h(r(j),{type:`primary`,class:`!font-bold shadow-[var(--glow-primary)]`,loading:u.value,disabled:!re.value,onClick:ae},{icon:S(()=>[h(r(He),{size:15})]),default:S(()=>[p(` `+o(d.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),d.value===null?e(``,!0):(y(),O(r(j),{key:0,quaternary:``,onClick:ie},{default:S(()=>[...i[7]||=[p(`取消编辑`,-1)]]),_:1}))]),d.value===null?(y(),D(`p`,en,` 保存后立即对所有用户生效，并自动停用上一条公告。 `)):e(``,!0)]),m(`section`,null,[i[10]||=m(`h3`,{class:`mb-3 font-heading text-[15px] font-bold`},[p(` 历史公告 `),m(`span`,{class:`tech-label ml-2 text-ink-4`},`最近 50 条`)],-1),l.value&&!c.value.length?(y(),D(`div`,tn,[(y(),D(n,null,oe(3,e=>h(r(Pe),{key:e,height:`92px`,sharp:!1})),64))])):c.value.length?(y(),O(se,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:S(()=>[(y(!0),D(n,null,oe(c.value,e=>(y(),D(`li`,{key:e.id,class:Ee([`panel p-3.5`,e.is_active===1&&`border-primary/40`])},[m(`div`,rn,[m(`div`,an,[m(`p`,{class:`line-clamp-2 text-[13px]`,style:_({fontFamily:r(Ye)[e.font_family]?.css})},o(e.content),5),m(`div`,on,[m(`span`,{class:`tech-label rounded-full px-2 py-0.5`,style:_(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-quaternary)`})},o(e.is_active===1?`生效中`:`已停用`),5),m(`span`,sn,[p(` #`+o(e.id)+` · `+o(r(Ye)[e.font_family]?.label??e.font_family)+` `+o(e.font_size)+`px · `,1),m(`span`,{style:_({color:e.font_color})},o(e.font_color),5)]),m(`span`,cn,o(e.author??`系统`)+` · `+o(r(Xe)(e.update_time)),1)])]),h(r(Fe),{value:e.is_active===1,size:`small`,"onUpdate:value":t=>ce(e)},null,8,[`value`,`onUpdate:value`])]),m(`div`,ln,[h(r(j),{size:`tiny`,quaternary:``,onClick:t=>b(e)},{icon:S(()=>[h(r(Ge),{size:12})]),default:S(()=>[i[8]||=p(` 编辑 `,-1)]),_:1},8,[`onClick`]),h(r(j),{size:`tiny`,quaternary:``,onClick:t=>x(e)},{icon:S(()=>[h(r(Je),{size:12})]),default:S(()=>[i[9]||=p(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(y(),D(`div`,nn,[h(r(H),{description:`还没有发布过公告`,size:`small`},{icon:S(()=>[h(r(He),{size:30})]),_:1})]))])])]))}});export{un as default};