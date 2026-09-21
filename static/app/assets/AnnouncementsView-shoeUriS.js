import{Ct as e,Dt as t,Et as n,G as r,H as i,I as a,It as o,Pt as s,U as c,V as l,Vt as u,W as d,Wt as f,X as p,Y as m,Z as h,an as g,at as ee,ht as te,in as ne,it as _,m as re,mt as v,n as y,nt as b,on as x,pt as S,ut as ie,vt as ae,wt as oe}from"./endpoints-MMH2_YQj.js";import{$ as se,A as ce,B as C,E as le,G as w,Gt as T,H as ue,I as de,J as fe,Jt as E,K as pe,Kt as D,L as O,Q as me,R as k,T as he,U as A,V as j,W as ge,X as _e,Y as ve,Yt as M,Z as N,Zt as ye,at as P,ct as be,ft as xe,h as Se,ht as Ce,it as F,k as we,n as I,nn as L,q as R,rn as Te,rt as Ee,st as z,vt as B,w as V}from"./createLucideIcon-Dgil5eM1.js";import{a as De,t as H}from"./Input-BuVrZL_l.js";import{c as U,l as Oe,o as W,s as G}from"./create-DN8YPFSW.js";import{c as K,l as ke,s as q}from"./Scrollbar-cO_MZVQX.js";import{i as Ae,t as J}from"./Select-BWnC-r81.js";import{t as je}from"./use-merged-state-BnSBV-cQ.js";import{t as Y}from"./FormItem-DYWopddm.js";import{t as Me}from"./InputNumber-BA3FiFwX.js";import{t as Ne}from"./Skeleton-eb0Rc9Cy.js";import{t as Pe}from"./Switch-Dp62igMt.js";import{t as Fe}from"./eye-BdGzQOSd.js";import{i as Ie,n as Le,r as Re}from"./paper-VHdcUDVI.js";import{t as X}from"./pencil-CAJ5b7ze.js";import{t as ze}from"./plus-C9hqerMJ.js";import{t as Z}from"./refresh-cw-Dp-DjNKO.js";import{t as Be}from"./trash-CR6epANo.js";import{L as Ve,S as He,U as Ue,a as We,ot as Ge,rt as Ke,u as qe}from"./index-ChakMpLN.js";import{x as Q,y as Je}from"./format-1rjnJmsR.js";import{t as Ye}from"./EmptyState-CG8-rmPG.js";import{t as Xe}from"./PageHeader-FEdpxFLN.js";var Ze=D(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[T(`>`,[D(`input`,[T(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),T(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),D(`button`,[T(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[E(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),T(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[E(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),T(`*`,[T(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[T(`>`,[D(`input`,`
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
 `)])])]),T(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[T(`>`,[D(`input`,`
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
 `)])])])])])]),Qe=h({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=xe(e);return be(`-input-group`,Ze,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return S(),r(`div`,{class:F(`${e}-input-group`)},[z(()=>this.$slots.default?.())],2)}});function $e(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function et(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function tt(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=k(A(e));if(o===1){let e=nt([r,i,a]),o=nt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=nt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=nt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function nt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function rt(e){return e=Math.round(e),e>=360?359:e<0?0:e}function it(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var at={rgb:{hex(e){return j(k(e))},hsl(e){let[t,n,r,i]=k(e);return A([...me(t,n,r),i])},hsv(e){let[t,n,r,i]=k(e);return w([...se(t,n,r),i])}},hex:{rgb(e){return R(k(e))},hsl(e){let[t,n,r,i]=k(e);return A([...me(t,n,r),i])},hsv(e){let[t,n,r,i]=k(e);return w([...se(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=de(e);return j([...ve(t,n,r),i])},rgb(e){let[t,n,r,i]=de(e);return R([...ve(t,n,r),i])},hsv(e){let[t,n,r,i]=de(e);return w([...fe(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=O(e);return j([...N(t,n,r),i])},rgb(e){let[t,n,r,i]=O(e);return R([...N(t,n,r),i])},hsl(e){let[t,n,r,i]=O(e);return A([..._e(t,n,r),i])}}};function ot(e,t,n){return n||=et(e),n?n===t?e:at[n][t](e):null}var st=[`onMousedown`],ct=`12px`,lt=12,ut=`6px`,dt=h({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(n){t.value&&e.rgba&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-lt);e.onUpdateAlpha(it(o))}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,railBackgroundImage:l(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return S(),r(`div`,{class:F(`${e}-color-picker-slider`),ref:`railRef`,style:g({height:ct,borderRadius:ut}),onMousedown:this.handleMouseDown},[i(`div`,{style:g({borderRadius:ut,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[i(`div`,{class:F(`${e}-color-picker-checkboard`)},null,2),i(`div`,{class:F(`${e}-color-picker-slider__image`),style:g({backgroundImage:this.railBackgroundImage})},null,6)],4),z(()=>this.rgba&&(S(),r(`div`,{style:g({position:`absolute`,left:ut,right:ut,top:0,bottom:0})},[i(`div`,{class:F(`${e}-color-picker-handle`),style:g({left:`calc(${this.alpha*100}% - ${ut})`,borderRadius:ut,width:ct,height:ct})},[i(`div`,{class:F(`${e}-color-picker-handle__fill`),style:g({backgroundColor:R(this.rgba),borderRadius:ut,width:ct,height:ct})},null,6)],6)],4)))],46,st)}}),ft=Ce(`n-color-picker`);function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function gt(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function _t(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var vt={paddingSmall:`0 4px`},yt=h({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=o(``),{themeRef:n}=b(ft,null);oe(()=>{t.value=r()});function r(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function i(e){t.value=e}function a(n){let i,a;switch(e.label){case`HEX`:a=gt(n),a&&e.onUpdateValue(n),t.value=r();break;case`H`:i=mt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`S`:case`L`:case`V`:i=ht(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`A`:i=_t(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`R`:case`G`:case`B`:i=pt(n),i===!1?t.value=r():e.onUpdateValue(i)}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:i}},render(){let{mergedTheme:e}=this;return S(),c(H,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:vt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:g(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),bt=[`onClick`],xt=h({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?j:C)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?w:ge)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?R:pe)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?A:ue)(i))}}}},render(){let{clsPrefix:e,modes:t}=this;return S(),r(`div`,{class:F(`${e}-color-picker-input`)},[i(`div`,{class:F(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:g({cursor:t.length===1?``:`pointer`})},[z(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,bt),p(Qe,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?j:C)(t)}catch{}return S(),c(yt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(S(),c(yt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),St=[`onClick`,`onKeydown`];function Ct(e,t){if(t===`hsv`){let[t,n,r,i]=O(e);return R([...N(t,n,r),i])}return e}function wt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Tt=h({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=l(()=>e.swatches.map(e=>{let t=et(e);return{value:e,mode:t,legalValue:Ct(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=wt(r):(B(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:ot(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:e}=this;return S(),r(`div`,{class:F(`${e}-color-picker-swatches`)},[z(()=>this.parsedSwatchesRef.map(t=>(S(),r(`div`,{class:F(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[i(`div`,{class:F(`${e}-color-picker-swatch__fill`),style:g({background:t.legalValue})},null,6)],42,St))))],2)}}),Et=[`onClick`],Dt=h({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:n}=b(ft,null);return()=>{let{hsla:o,value:s,clsPrefix:c,onClick:l,disabled:u}=e,d=t.label||n.value;return S(),r(`div`,{class:F([`${c}-color-picker`,u&&`${c}-color-picker--disabled`]),onClick:u?void 0:l},[i(`div`,{class:F(`${c}-color-picker__fill`)},[i(`div`,{class:F(`${c}-color-picker-checkboard`)},null,2),i(`div`,{style:g({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:o?A(o):``})},null,4),s&&o?(S(),r(`div`,{key:0,class:F(`${c}-color-picker__value`),style:g({color:tt(o)?`white`:`black`})},[d?(S(),r(a,{key:0},[z(()=>d(s))],64)):(S(),r(a,{key:1},[z(()=>s)],64))],6)):z(()=>null)],2)],10,Et)}}}),Ot=[`value`,`onChange`],kt=h({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=et(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(ot(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return S(),r(`div`,{class:F(`${e}-color-picker-preview__preview`)},[i(`span`,{class:F(`${e}-color-picker-preview__fill`),style:g({background:this.color||`#000000`})},null,6),i(`input`,{class:F(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Ot)],2)}}),At=[`onMousedown`],jt=`12px`,Mt=12,$=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=h({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(e){t.value&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=rt((n.clientX-a-Nt)/(i-Mt)*360);e.onUpdateHue(o)}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return S(),r(`div`,{class:F(`${e}-color-picker-slider`),style:g({height:jt,borderRadius:$})},[i(`div`,{ref:`railRef`,style:g({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:jt,borderRadius:$,position:`relative`}),onMousedown:this.handleMouseDown},[i(`div`,{style:g({position:`absolute`,left:$,right:$,top:0,bottom:0})},[i(`div`,{class:F(`${e}-color-picker-handle`),style:g({left:`calc((${this.hue}%) / 359 * 100 - ${$})`,borderRadius:$,width:jt,height:jt})},[i(`div`,{class:F(`${e}-color-picker-handle__fill`),style:g({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:$,width:jt,height:jt})},null,6)],6)],4)],44,At)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=h({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(e){t.value&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{palleteRef:t,handleColor:l(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return S(),r(`div`,{class:F(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[i(`div`,{class:F(`${e}-color-picker-pallete__layer`),style:g({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),i(`div`,{class:F(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),z(()=>this.rgba&&(S(),r(`div`,{class:F(`${e}-color-picker-handle`),style:g({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[i(`div`,{class:F(`${e}-color-picker-handle__fill`),style:g({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=T([D(`color-picker-panel`,`
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
 `,[T(`&::after`,`
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
 `),T(`&:focus`,`
 outline: none;
 `,[E(`fill`,[T(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Vt={...we.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Oe.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=h({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(t,{slots:n}){let s=null;function d(e){s=e}let f=null,{mergedClsPrefixRef:p,namespaceRef:m,inlineThemeDisabled:h,mergedComponentPropsRef:te}=xe(t),ne=Se(t,{mergedSize:e=>{let{size:n}=t;if(n)return n;let{mergedSize:r}=e||{};return r?.value?r.value:te?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:_,mergedDisabledRef:re}=ne,{localeRef:y}=De(`global`),b=we(`ColorPicker`,`-color-picker`,Bt,Ve,t,p);v(ft,{themeRef:b,renderLabelRef:u(t,`renderLabel`),colorPickerSlots:n});let x=o(t.defaultShow),ie=je(u(t,`show`),x);function ae(e){let{onUpdateShow:n,"onUpdate:show":r}=t;n&&he(n,e),r&&he(r,e),x.value=e}let{defaultValue:T}=t,E=o(T===void 0?$e(t.modes,t.showAlpha):T),D=je(u(t,`value`),E),M=o([D.value]),P=o(0),be=l(()=>et(D.value)),{modes:Ce}=t,L=o(et(D.value)||Ce[0]||`rgb`);function Te(){let{modes:e}=t,{value:n}=L,r=e.findIndex(e=>e===n);~r?L.value=e[(r+1)%e.length]:L.value=`rgb`}let B,V,H,U,W,G,K,q,Ae=l(()=>{let{value:e}=D;if(!e)return null;switch(be.value){case`hsv`:return O(e);case`hsl`:return[B,V,H,q]=de(e),[...fe(B,V,H),q];case`rgb`:case`hex`:return[W,G,K,q]=k(e),[...se(W,G,K),q]}}),J=l(()=>{let{value:e}=D;if(!e)return null;switch(be.value){case`rgb`:case`hex`:return k(e);case`hsv`:return[B,V,U,q]=O(e),[...N(B,V,U),q];case`hsl`:return[B,V,H,q]=de(e),[...ve(B,V,H),q]}}),Y=l(()=>{let{value:e}=D;if(!e)return null;switch(be.value){case`hsl`:return de(e);case`hsv`:return[B,V,U,q]=O(e),[..._e(B,V,U),q];case`rgb`:case`hex`:return[W,G,K,q]=k(e),[...me(W,G,K),q]}}),Me=l(()=>{switch(L.value){case`rgb`:case`hex`:return J.value;case`hsv`:return Ae.value;case`hsl`:return Y.value}}),Ne=o(0),Pe=o(1),Fe=o([0,0]);function Ie(e,n){let{value:r}=Ae,i=Ne.value,a=r?r[3]:1;Fe.value=[e,n];let{showAlpha:o}=t;switch(L.value){case`hsv`:X((o?w:ge)([i,e,n,a]),`cursor`);break;case`hsl`:X((o?A:ue)([..._e(i,e,n),a]),`cursor`);break;case`rgb`:X((o?R:pe)([...N(i,e,n),a]),`cursor`);break;case`hex`:X((o?j:C)([...N(i,e,n),a]),`cursor`)}}function Le(e){Ne.value=e;let{value:n}=Ae;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=t;switch(L.value){case`hsv`:X((o?w:ge)([e,r,i,a]),`cursor`);break;case`rgb`:X((o?R:pe)([...N(e,r,i),a]),`cursor`);break;case`hex`:X((o?j:C)([...N(e,r,i),a]),`cursor`);break;case`hsl`:X((o?A:ue)([..._e(e,r,i),a]),`cursor`)}}function Re(e){switch(L.value){case`hsv`:[B,V,U]=Ae.value,X(w([B,V,U,e]),`cursor`);break;case`rgb`:[W,G,K]=J.value,X(R([W,G,K,e]),`cursor`);break;case`hex`:[W,G,K]=J.value,X(j([W,G,K,e]),`cursor`);break;case`hsl`:[B,V,H]=Y.value,X(A([B,V,H,e]),`cursor`)}Pe.value=e}function X(e,n){f=n===`cursor`?e:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=ne,{onUpdateValue:a,"onUpdate:value":o}=t;a&&he(a,e),o&&he(o,e),r(),i(),E.value=e}function ze(e){X(e,`input`),ee(Z)}function Z(e=!0){let{value:n}=D;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=ne,{onComplete:a}=t;a&&a(n);let{value:o}=M,{value:s}=P;e&&(o.splice(s+1,o.length,n),P.value=s+1),r(),i()}}function Be(){let{value:e}=P;e-1<0||(X(M.value[e-1],`input`),Z(!1),P.value=e-1)}function He(){let{value:e}=P;e<0||e+1>=M.value.length||(X(M.value[e+1],`input`),Z(!1),P.value=e+1)}function Ue(){X(null,`input`);let{onClear:e}=t;e&&e(),ae(!1)}function We(){let{value:e}=D,{onConfirm:n}=t;n&&n(e),ae(!1)}let Ge=l(()=>P.value>=1),Ke=l(()=>{let{value:e}=M;return e.length>1&&P.value<e.length-1});e(ie,e=>{e||(M.value=[D.value],P.value=0)}),oe(()=>{if(!(f&&f===D.value)){let{value:e}=Ae;e&&(Ne.value=e[0],Pe.value=e[3],Fe.value=[e[1],e[2]])}f=null});let qe=l(()=>{let{value:e}=_,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[ye(`height`,e)]:l,[ye(`fontSize`,e)]:u}}=b.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),Q=h?ce(`color-picker`,l(()=>_.value[0]),qe,t):void 0;function Je(){let{value:e}=J,{value:o}=Ne,{internalActions:s,modes:l,actions:u}=t,{value:d}=b,{value:f}=p;return(()=>{let p=Ee(`550d4636453f407b`);return S(),r(`div`,{class:F([`${f}-color-picker-panel`,Q?.themeClass.value]),onDragstart:p[0]||=e=>{e.preventDefault()},style:g(h?void 0:qe.value)},[i(`div`,{class:F(`${f}-color-picker-control`)},[(S(),c(zt,{clsPrefix:f,rgba:e,displayedHue:o,displayedSv:Fe.value,onUpdateSV:Ie,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),i(`div`,{class:F(`${f}-color-picker-preview`)},[i(`div`,{class:F(`${f}-color-picker-preview__sliders`)},[(S(),c(Ft,{clsPrefix:f,hue:o,onUpdateHue:Le,onComplete:Z},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),t.showAlpha?(S(),c(dt,{key:0,clsPrefix:f,rgba:e,alpha:Pe.value,onUpdateAlpha:Re,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):z(()=>null)],2),t.showPreview?(S(),c(kt,{key:0,clsPrefix:f,mode:L.value,color:J.value&&C(J.value),onUpdateColor:p[1]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):z(()=>null)],2),(S(),c(xt,{clsPrefix:f,showAlpha:t.showAlpha,mode:L.value,modes:l,onUpdateMode:Te,value:D.value,valueArr:Me.value,onUpdateValue:ze},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),z(()=>t.swatches?.length&&(()=>{let e=Ee(`1de0b88852ebf5cb`);return S(),c(Tt,{clsPrefix:f,mode:L.value,swatches:t.swatches,onUpdateColor:e[0]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),u?.length?(S(),r(`div`,{key:0,class:F(`${f}-color-picker-action`)},[z(()=>u.includes(`confirm`)&&(S(),c(I,{size:`small`,onClick:We,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>y.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),z(()=>u.includes(`clear`)&&(S(),c(I,{size:`small`,onClick:Ue,disabled:!D.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>y.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):z(()=>null),n.action?(S(),r(`div`,{key:2,class:F(`${f}-color-picker-action`)},[z(()=>n.action?.())],2)):(S(),r(a,{key:3},[s?(S(),r(`div`,{key:0,class:F(`${f}-color-picker-action`)},[z(()=>s.includes(`undo`)&&(S(),c(I,{size:`small`,onClick:Be,disabled:!Ge.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>y.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),z(()=>s.includes(`redo`)&&(S(),c(I,{size:`small`,onClick:He,disabled:!Ke.value,theme:d.peers.Button,themeOverrides:d.peerOverrides.Button},{default:()=>y.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):z(()=>null)],64))],38)})()}return{mergedClsPrefix:p,namespace:m,hsla:Y,rgba:J,mergedShow:ie,mergedDisabled:re,isMounted:le(),adjustedTo:Oe(t),mergedValue:D,handleTriggerClick(){re.value||ae(!0)},setTriggerRef:d,handleClickOutside(e){if(s instanceof Element){if(s.contains(ke(e)))return}else if(s&&s.$el.contains(ke(e)))return;ae(!1)},renderPanel:Je,cssVars:h?void 0:qe,themeClass:Q?.themeClass,onRender:Q?.onRender}},render(){let{mergedClsPrefix:e,onRender:n}=this;return n?.(),S(),c(U,null,{default:()=>[(S(),c(G,null,{default:()=>{let t=_(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=Ae([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),V(this.$slots.trigger,Ge(t,[`value`,`onClick`,`ref`]),n=>n||(S(),c(Dt,_(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(S(),c(W,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Oe.tdkey,to:this.adjustedTo},{_:1,default:P(()=>(S(),c(L,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:P(()=>this.mergedShow?t(this.renderPanel(),[[Ke,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},Qt={key:0,class:`mt-1 text-xs text-ink-3`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-xs text-ink-3`},tn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},nn={key:0,class:`flex flex-col gap-2`},rn={key:1,class:`panel grid place-items-center py-12`},an={class:`flex items-start justify-between gap-3`},on={class:`min-w-0 flex-1`},sn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},cn={class:`tnum text-xs text-ink-3`},ln={class:`text-xs text-ink-3`},un={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},dn=h({__name:`AnnouncementsView`,setup(e){let t=He(),u=Re(),h=o([]),ee=o(!0),_=o(!1),v=o(null),b=s({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),oe=Object.keys(Q).map(e=>({label:Q[e].label,value:e})),se=l(()=>({fontFamily:Q[b.font_family].css,fontSize:`${b.font_size}px`})),ce=l(()=>[`light`,`dark`].map(e=>{let t=Le()[e],n=We(t.paper,b.font_color,b.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:b.font_color,overridden:n}})),C=l(()=>b.content.trim().length>0&&!_.value);function le(){v.value=null,b.content=``,b.font_family=`system`,b.font_size=15,b.font_color=`#1f2328`}async function w(e=!1){e||(ee.value=!0);try{let e=await y.list();h.value=e.announcements}catch(e){t.error(e instanceof re?e.message:`加载公告失败`)}finally{ee.value=!1}}async function T(){if(!C.value)return;_.value=!0;let e={content:b.content.trim(),font_family:b.font_family,font_size:b.font_size,font_color:b.font_color};try{v.value===null?(await y.create(e),t.success(`公告已发布`)):(await y.update(v.value,e),t.success(`公告已更新`)),le(),await w(!0),await u.load()}catch(e){t.error(e instanceof re?e.message:`保存失败`)}finally{_.value=!1}}function ue(e){v.value=e.id,b.content=e.content,b.font_family=e.font_family,b.font_size=e.font_size,b.font_color=e.font_color}async function de(e){let n=e.is_active!==1;try{await y.setActive(e.id,n),t.success(n?`公告已启用`:`公告已停用`),await w(!0),await u.load()}catch(e){t.error(e instanceof re?e.message:`操作失败`)}}async function fe(e){if(await qe({title:`删除公告`,content:`这条公告会被删除，不可恢复。`,positiveText:`删除`}))try{await y.remove(e.id),t.success(`公告已删除`),v.value===e.id&&le(),await w(!0),await u.load()}catch(e){t.error(e instanceof re?e.message:`删除失败`)}}return ie(w),(e,t)=>(S(),r(`div`,Ut,[p(Xe,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:n(()=>[p(f(I),{size:`small`,quaternary:``,loading:ee.value,onClick:t[0]||=e=>w()},{icon:n(()=>[p(f(Z),{size:15})]),default:n(()=>[t[5]||=m(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),i(`div`,Wt,[i(`section`,Gt,[i(`h3`,Kt,[(S(),c(ae(v.value===null?f(ze):f(X)),{size:15,style:{color:`var(--accent-text)`}})),m(` `+x(v.value===null?`发布新公告`:`编辑公告 #${v.value}`),1)]),p(f(Y),{label:`公告内容`,"show-feedback":!1},{default:n(()=>[p(f(H),{value:b.content,"onUpdate:value":t[1]||=e=>b.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),i(`div`,qt,[p(f(Y),{label:`字体`,"show-feedback":!1},{default:n(()=>[p(f(J),{value:b.font_family,"onUpdate:value":t[2]||=e=>b.font_family=e,options:f(oe),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),p(f(Y),{label:`字号`,"show-feedback":!1},{default:n(()=>[p(f(Me),{value:b.font_size,"onUpdate:value":t[3]||=e=>b.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),p(f(Y),{label:`文字颜色`,"show-feedback":!1},{default:n(()=>[p(f(Ht),{value:b.font_color,"onUpdate:value":t[4]||=e=>b.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),i(`div`,Jt,[i(`div`,Yt,[p(f(Fe),{size:12}),t[6]||=m(` 预览 `,-1)]),i(`div`,Xt,[(S(!0),r(a,null,te(ce.value,e=>(S(),r(`div`,{key:e.key},[i(`div`,Zt,x(e.label),1),i(`div`,{class:`border p-3`,style:g({backgroundColor:e.paper,borderColor:e.line})},[i(`p`,{class:`whitespace-pre-wrap break-words`,style:g([se.value,{color:e.ink}])},x(b.content.trim()||`公告内容会显示在这里`),5)],4),e.overridden?(S(),r(`p`,Qt,` 对比度不足 · 会回落到主题文字色 `)):d(``,!0)]))),128))])]),i(`div`,$t,[p(f(I),{type:`primary`,class:`!font-bold`,loading:_.value,disabled:!C.value,onClick:T},{icon:n(()=>[p(f(Ie),{size:15})]),default:n(()=>[m(` `+x(v.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),v.value===null?d(``,!0):(S(),c(f(I),{key:0,quaternary:``,onClick:le},{default:n(()=>[...t[7]||=[m(`取消编辑`,-1)]]),_:1}))]),v.value===null?(S(),r(`p`,en,` 保存后立即生效，并停用上一条公告。 `)):d(``,!0)]),i(`section`,tn,[t[10]||=i(`h3`,{class:`mb-3 font-heading text-base font-bold`},[m(` 历史公告 `),i(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),ee.value&&!h.value.length?(S(),r(`div`,nn,[(S(),r(a,null,te(3,e=>p(f(Ne),{key:e,height:`92px`,sharp:!1})),64))])):h.value.length?(S(),c(Te,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:n(()=>[(S(!0),r(a,null,te(h.value,e=>(S(),r(`li`,{key:e.id,class:ne([`panel p-3.5`,e.is_active===1&&`border-[var(--accent-tint-border)]`])},[i(`div`,an,[i(`div`,on,[i(`p`,{class:`line-clamp-2 text-sm`,style:g({fontFamily:f(Q)[e.font_family]?.css})},x(e.content),5),i(`div`,sn,[i(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:g(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},x(e.is_active===1?`生效中`:`已停用`),5),i(`span`,cn,[m(` #`+x(e.id)+` · `+x(f(Q)[e.font_family]?.label??e.font_family)+` `+x(e.font_size)+`px · `,1),i(`span`,{style:g({color:e.font_color})},x(e.font_color),5)]),i(`span`,ln,x(e.author??`系统`)+` · `+x(f(Je)(e.update_time)),1)])]),p(f(Pe),{round:!1,value:e.is_active===1,size:`small`,"onUpdate:value":t=>de(e)},null,8,[`value`,`onUpdate:value`])]),i(`div`,un,[p(f(I),{size:`tiny`,quaternary:``,onClick:t=>ue(e)},{icon:n(()=>[p(f(X),{size:12})]),default:n(()=>[t[8]||=m(` 编辑 `,-1)]),_:1},8,[`onClick`]),p(f(I),{size:`tiny`,quaternary:``,onClick:t=>fe(e)},{icon:n(()=>[p(f(Be),{size:12})]),default:n(()=>[t[9]||=m(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(S(),r(`div`,rn,[p(Ye,{code:`00 / NO NOTICE`,title:`还没有发布过公告`,hint:`左侧写完保存，就会出现在这里`},{icon:n(()=>[p(f(Ie),{size:28})]),_:1})]))])])]))}});export{dn as default};