import{$ as e,An as t,At as n,Bn as r,Ct as i,D as a,Dr as o,Dt as s,Er as c,Fn as l,H as u,Hn as d,I as ee,In as f,L as te,Mn as p,Nt as m,On as h,Pn as g,Q as _,Qn as v,R as ne,St as y,Tr as re,U as ie,Vn as ae,Xn as b,Z as x,Zn as oe,_n as se,at as ce,bt as le,ct as S,dt as ue,f as C,fn as de,ft as w,gr as T,ir as fe,it as E,jn as pe,kn as D,ln as O,lt as me,m as k,mr as he,mt as ge,n as A,nt as j,on as M,or as N,ot as P,pt as _e,qn as F,rr as ve,rt as ye,sn as I,sr as be,st as xe,tr as L,tt as Se,un as Ce,ut as we,vn as R,vt as Te,wn as z,wr as B,xr as Ee,yt as V}from"./endpoints-D7YssODM.js";import{n as De,t as H}from"./Empty-CXl0uUVS.js";import{c as U,l as Oe,o as W,s as G}from"./create-Cf_l9O5p.js";import{c as K,l as ke,s as q}from"./Scrollbar-BE5qE3gb.js";import{t as Ae}from"./use-merged-state-CXRiUPYA.js";import{i as je,t as J}from"./Select-BcJI0Ev_.js";import{t as Y}from"./FormItem-DrAinvPf.js";import{t as Me}from"./Input-C-372aM3.js";import{t as Ne}from"./InputNumber-CitY1iK3.js";import{t as Pe}from"./Skeleton-DZAkXxbB.js";import{t as Fe}from"./Switch-TaFWFlfY.js";import{$ as Ie,N as Le,b as Re,nt as ze,o as X,r as Be,z as Z}from"./index-CTz7zfxj.js";import{t as Ve}from"./eye-DK83Ym54.js";import{i as He,n as Ue,r as We}from"./paper-DezpzOex.js";import{t as Ge}from"./pencil-D8Qtc_o2.js";import{t as Ke}from"./plus-Z2E8uAkP.js";import{t as qe}from"./refresh-cw-CKdIHv9q.js";import{t as Je}from"./trash-CeQwa59o.js";import{n as Ye}from"./types-DKn5MR2h.js";import{v as Xe}from"./format-D-wfinI7.js";import{t as Ze}from"./PageHeader-BRpP6_C5.js";var Qe=I(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[M(`>`,[I(`input`,[M(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),M(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),I(`button`,[M(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[O(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),M(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[O(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),M(`*`,[M(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[M(`>`,[I(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),I(`base-selection`,[I(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),I(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),O(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),M(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[M(`>`,[I(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),I(`base-selection`,[I(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),I(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),O(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),$e=f({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=s(e);return i(`-input-group`,Qe,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return b(),p(`div`,{class:V(`${e}-input-group`)},[y(()=>this.$slots.default?.())],2)}});function et(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function tt(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function nt(t,n=[255,255,255],r=`AA`){let[i,a,o,s]=e(E(t));if(s===1){let e=rt([i,a,o]),t=rt(n);return(Math.max(e,t)+.05)/(Math.min(e,t)+.05)>=(r===`AA`?4.5:7)}let c=rt([Math.round(i*s+n[0]*(1-s)),Math.round(a*s+n[1]*(1-s)),Math.round(o*s+n[2]*(1-s))]),l=rt(n);return(Math.max(c,l)+.05)/(Math.min(c,l)+.05)>=(r===`AA`?4.5:7)}function rt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function it(e){return e=Math.round(e),e>=360?359:e<0?0:e}function at(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var ot={rgb:{hex(t){return j(e(t))},hsl(t){let[n,r,i,a]=e(t);return E([..._e(n,r,i),a])},hsv(t){let[n,r,i,a]=e(t);return P([...ge(n,r,i),a])}},hex:{rgb(t){return S(e(t))},hsl(t){let[n,r,i,a]=e(t);return E([..._e(n,r,i),a])},hsv(t){let[n,r,i,a]=e(t);return P([...ge(n,r,i),a])}},hsl:{hex(e){let[t,n,r,i]=x(e);return j([...we(t,n,r),i])},rgb(e){let[t,n,r,i]=x(e);return S([...we(t,n,r),i])},hsv(e){let[t,n,r,i]=x(e);return P([...me(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=_(e);return j([...w(t,n,r),i])},rgb(e){let[t,n,r,i]=_(e);return S([...w(t,n,r),i])},hsl(e){let[t,n,r,i]=_(e);return E([...ue(t,n,r),i])}}};function st(e,t,n){return n||=tt(e),n?n===t?e:ot[n][t](e):null}var ct=[`onMousedown`],lt=`12px`,ut=12,Q=`6px`,dt=f({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=T(null);function n(n){t.value&&e.rgba&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-ut);e.onUpdateAlpha(at(o))}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,railBackgroundImage:h(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return b(),p(`div`,{class:V(`${e}-color-picker-slider`),ref:`railRef`,style:c({height:lt,borderRadius:Q}),onMousedown:this.handleMouseDown},[D(`div`,{style:c({borderRadius:Q,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[D(`div`,{class:V(`${e}-color-picker-checkboard`)},null,2),D(`div`,{class:V(`${e}-color-picker-slider__image`),style:c({backgroundImage:this.railBackgroundImage})},null,6)],4),y(()=>this.rgba&&(b(),p(`div`,{style:c({position:`absolute`,left:Q,right:Q,top:0,bottom:0})},[D(`div`,{class:V(`${e}-color-picker-handle`),style:c({left:`calc(${this.alpha*100}% - ${Q})`,borderRadius:Q,width:lt,height:lt})},[D(`div`,{class:V(`${e}-color-picker-handle__fill`),style:c({backgroundColor:S(this.rgba),borderRadius:Q,width:lt,height:lt})},null,6)],6)],4)))],46,ct)}}),ft=n(`n-color-picker`);function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function gt(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function _t(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var vt={paddingSmall:`0 4px`},yt=f({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=T(``),{themeRef:n}=r(ft,null);fe(()=>{t.value=i()});function i(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function a(e){t.value=e}function o(n){let r,a;switch(e.label){case`HEX`:a=gt(n),a&&e.onUpdateValue(n),t.value=i();break;case`H`:r=mt(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`S`:case`L`:case`V`:r=ht(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`A`:r=_t(n),r===!1?t.value=i():e.onUpdateValue(r);break;case`R`:case`G`:case`B`:r=pt(n),r===!1?t.value=i():e.onUpdateValue(r)}}return{mergedTheme:n,inputValue:t,handleInputChange:o,handleInputUpdateValue:a}},render(){let{mergedTheme:e}=this;return b(),t(Me,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:vt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:c(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),bt=[`onClick`],xt=f({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?j:Se)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?P:ce)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?S:xe)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?E:ye)(i))}}}},render(){let{clsPrefix:e,modes:n}=this;return b(),p(`div`,{class:V(`${e}-color-picker-input`)},[D(`div`,{class:V(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:c({cursor:n.length===1?``:`pointer`})},[y(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,bt),l($e,null,{default:()=>{let{mode:e,valueArr:n,showAlpha:r}=this;if(e===`hex`){let e=null;try{e=n===null?null:(r?j:Se)(n)}catch{}return b(),t(yt,{key:1,label:`HEX`,showAlpha:r,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(r?`a`:``)).split(``).map((e,r)=>(b(),t(yt,{label:e.toUpperCase(),value:n===null?null:n[r],onUpdateValue:e=>{this.handleUnitUpdateValue(r,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),St=[`onClick`,`onKeydown`];function Ct(e,t){if(t===`hsv`){let[t,n,r,i]=_(e);return S([...w(t,n,r),i])}return e}function wt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Tt=f({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=h(()=>e.swatches.map(e=>{let t=tt(e);return{value:e,mode:t,legalValue:Ct(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=wt(r):(m(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:st(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:e}=this;return b(),p(`div`,{class:V(`${e}-color-picker-swatches`)},[y(()=>this.parsedSwatchesRef.map(t=>(b(),p(`div`,{class:V(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[D(`div`,{class:V(`${e}-color-picker-swatch__fill`),style:c({background:t.legalValue})},null,6)],42,St))))],2)}}),Et=[`onClick`],Dt=f({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:n}=r(ft,null);return()=>{let{hsla:r,value:i,clsPrefix:a,onClick:o,disabled:s}=e,l=t.label||n.value;return b(),p(`div`,{class:V([`${a}-color-picker`,s&&`${a}-color-picker--disabled`]),onClick:s?void 0:o},[D(`div`,{class:V(`${a}-color-picker__fill`)},[D(`div`,{class:V(`${a}-color-picker-checkboard`)},null,2),D(`div`,{style:c({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:r?E(r):``})},null,4),i&&r?(b(),p(`div`,{key:0,class:V(`${a}-color-picker__value`),style:c({color:nt(r)?`white`:`black`})},[l?(b(),p(z,{key:0},[y(()=>l(i))],64)):(b(),p(z,{key:1},[y(()=>i)],64))],6)):y(()=>null)],2)],10,Et)}}}),Ot=[`value`,`onChange`],kt=f({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=tt(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(st(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return b(),p(`div`,{class:V(`${e}-color-picker-preview__preview`)},[D(`span`,{class:V(`${e}-color-picker-preview__fill`),style:c({background:this.color||`#000000`})},null,6),D(`input`,{class:V(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Ot)],2)}}),At=[`onMousedown`],jt=`12px`,Mt=12,$=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=f({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=T(null);function n(e){t.value&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=it((n.clientX-a-Nt)/(i-Mt)*360);e.onUpdateHue(o)}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return b(),p(`div`,{class:V(`${e}-color-picker-slider`),style:c({height:jt,borderRadius:$})},[D(`div`,{ref:`railRef`,style:c({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:jt,borderRadius:$,position:`relative`}),onMousedown:this.handleMouseDown},[D(`div`,{style:c({position:`absolute`,left:$,right:$,top:0,bottom:0})},[D(`div`,{class:V(`${e}-color-picker-handle`),style:c({left:`calc((${this.hue}%) / 359 * 100 - ${$})`,borderRadius:$,width:jt,height:jt})},[D(`div`,{class:V(`${e}-color-picker-handle__fill`),style:c({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:$,width:jt,height:jt})},null,6)],6)],4)],44,At)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=f({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=T(null);function n(e){t.value&&(K(`mousemove`,document,r),K(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function i(){q(`mousemove`,document,r),q(`mouseup`,document,i),e.onComplete?.()}return{palleteRef:t,handleColor:h(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return b(),p(`div`,{class:V(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[D(`div`,{class:V(`${e}-color-picker-pallete__layer`),style:c({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),D(`div`,{class:V(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),y(()=>this.rgba&&(b(),p(`div`,{class:V(`${e}-color-picker-handle`),style:c({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[D(`div`,{class:V(`${e}-color-picker-handle__fill`),style:c({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=M([I(`color-picker-panel`,`
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
 `,[Z(),I(`input`,`
 text-align: center;
 `)]),I(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[M(`&::after`,`
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
 `)]),I(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[O(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),M(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),I(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[O(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),I(`color-picker-pallete`,`
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
 `,[Ce(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),I(`color-picker-preview`,`
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
 `)]),I(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[I(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),O(`mode`,`
 width: 72px;
 text-align: center;
 `)]),I(`color-picker-control`,`
 padding: 12px;
 `),I(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[I(`button`,`margin-left: 8px;`)]),I(`color-picker`,`
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
 `,[Ce(`disabled`,`cursor: not-allowed`),O(`value`,`
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
 `),I(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[M(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),I(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[I(`color-picker-swatch`,`
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
 `),M(`&:focus`,`
 outline: none;
 `,[O(`fill`,[M(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Vt={...u.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Oe.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=f({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(n,{slots:r}){let i=null;function o(e){i=e}let l=null,{mergedClsPrefixRef:ee,namespaceRef:f,inlineThemeDisabled:m,mergedComponentPropsRef:g}=s(n),v=a(n,{mergedSize:e=>{let{size:t}=n;if(t)return t;let{mergedSize:r}=e||{};return r?.value?r.value:g?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:re,mergedDisabledRef:ae}=v,{localeRef:se}=De(`global`),le=u(`ColorPicker`,`-color-picker`,Bt,Le,n,ee);oe(ft,{themeRef:le,renderLabelRef:Ee(n,`renderLabel`),colorPickerSlots:r});let C=T(n.defaultShow),pe=Ae(Ee(n,`show`),C);function O(e){let{onUpdateShow:t,"onUpdate:show":r}=n;t&&te(t,e),r&&te(r,e),C.value=e}let{defaultValue:he}=n,A=T(he===void 0?et(n.modes,n.showAlpha):he),M=Ae(Ee(n,`value`),A),N=T([M.value]),F=T(0),I=h(()=>tt(M.value)),{modes:be}=n,L=T(tt(M.value)||be[0]||`rgb`);function Ce(){let{modes:e}=n,{value:t}=L,r=e.findIndex(e=>e===t);~r?L.value=e[(r+1)%e.length]:L.value=`rgb`}let R,B,H,U,W,G,K,q,je=h(()=>{let{value:t}=M;if(!t)return null;switch(I.value){case`hsv`:return _(t);case`hsl`:return[R,B,H,q]=x(t),[...me(R,B,H),q];case`rgb`:case`hex`:return[W,G,K,q]=e(t),[...ge(W,G,K),q]}}),J=h(()=>{let{value:t}=M;if(!t)return null;switch(I.value){case`rgb`:case`hex`:return e(t);case`hsv`:return[R,B,U,q]=_(t),[...w(R,B,U),q];case`hsl`:return[R,B,H,q]=x(t),[...we(R,B,H),q]}}),Y=h(()=>{let{value:t}=M;if(!t)return null;switch(I.value){case`hsl`:return x(t);case`hsv`:return[R,B,U,q]=_(t),[...ue(R,B,U),q];case`rgb`:case`hex`:return[W,G,K,q]=e(t),[..._e(W,G,K),q]}}),Me=h(()=>{switch(L.value){case`rgb`:case`hex`:return J.value;case`hsv`:return je.value;case`hsl`:return Y.value}}),Ne=T(0),Pe=T(1),Fe=T([0,0]);function Ie(e,t){let{value:r}=je,i=Ne.value,a=r?r[3]:1;Fe.value=[e,t];let{showAlpha:o}=n;switch(L.value){case`hsv`:X((o?P:ce)([i,e,t,a]),`cursor`);break;case`hsl`:X((o?E:ye)([...ue(i,e,t),a]),`cursor`);break;case`rgb`:X((o?S:xe)([...w(i,e,t),a]),`cursor`);break;case`hex`:X((o?j:Se)([...w(i,e,t),a]),`cursor`)}}function Re(e){Ne.value=e;let{value:t}=je;if(!t)return;let[,r,i,a]=t,{showAlpha:o}=n;switch(L.value){case`hsv`:X((o?P:ce)([e,r,i,a]),`cursor`);break;case`rgb`:X((o?S:xe)([...w(e,r,i),a]),`cursor`);break;case`hex`:X((o?j:Se)([...w(e,r,i),a]),`cursor`);break;case`hsl`:X((o?E:ye)([...ue(e,r,i),a]),`cursor`)}}function ze(e){switch(L.value){case`hsv`:[R,B,U]=je.value,X(P([R,B,U,e]),`cursor`);break;case`rgb`:[W,G,K]=J.value,X(S([W,G,K,e]),`cursor`);break;case`hex`:[W,G,K]=J.value,X(j([W,G,K,e]),`cursor`);break;case`hsl`:[R,B,H]=Y.value,X(E([R,B,H,e]),`cursor`)}Pe.value=e}function X(e,t){l=t===`cursor`?e:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=v,{onUpdateValue:a,"onUpdate:value":o}=n;a&&te(a,e),o&&te(o,e),r(),i(),A.value=e}function Be(e){X(e,`input`),d(Z)}function Z(e=!0){let{value:t}=M;if(t){let{nTriggerFormChange:r,nTriggerFormInput:i}=v,{onComplete:a}=n;a&&a(t);let{value:o}=N,{value:s}=F;e&&(o.splice(s+1,o.length,t),F.value=s+1),r(),i()}}function Ve(){let{value:e}=F;e-1<0||(X(N.value[e-1],`input`),Z(!1),F.value=e-1)}function He(){let{value:e}=F;e<0||e+1>=N.value.length||(X(N.value[e+1],`input`),Z(!1),F.value=e+1)}function Ue(){X(null,`input`);let{onClear:e}=n;e&&e(),O(!1)}function We(){let{value:e}=M,{onConfirm:t}=n;t&&t(e),O(!1)}let Ge=h(()=>F.value>=1),Ke=h(()=>{let{value:e}=N;return e.length>1&&F.value<e.length-1});ve(pe,e=>{e||(N.value=[M.value],F.value=0)}),fe(()=>{if(!(l&&l===M.value)){let{value:e}=je;e&&(Ne.value=e[0],Pe.value=e[3],Fe.value=[e[1],e[2]])}l=null});let qe=h(()=>{let{value:e}=re,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[de(`height`,e)]:l,[de(`fontSize`,e)]:u}}=le.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),Je=m?ie(`color-picker`,h(()=>re.value[0]),qe,n):void 0;function Ye(){let{value:e}=J,{value:i}=Ne,{internalActions:a,modes:o,actions:s}=n,{value:l}=le,{value:u}=ee;return(()=>{let d=Te(`550d4636453f407b`);return b(),p(`div`,{class:V([`${u}-color-picker-panel`,Je?.themeClass.value]),onDragstart:d[0]||=e=>{e.preventDefault()},style:c(m?void 0:qe.value)},[D(`div`,{class:V(`${u}-color-picker-control`)},[(b(),t(zt,{clsPrefix:u,rgba:e,displayedHue:i,displayedSv:Fe.value,onUpdateSV:Ie,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),D(`div`,{class:V(`${u}-color-picker-preview`)},[D(`div`,{class:V(`${u}-color-picker-preview__sliders`)},[(b(),t(Ft,{clsPrefix:u,hue:i,onUpdateHue:Re,onComplete:Z},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),n.showAlpha?(b(),t(dt,{key:0,clsPrefix:u,rgba:e,alpha:Pe.value,onUpdateAlpha:ze,onComplete:Z},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):y(()=>null)],2),n.showPreview?(b(),t(kt,{key:0,clsPrefix:u,mode:L.value,color:J.value&&Se(J.value),onUpdateColor:d[1]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):y(()=>null)],2),(b(),t(xt,{clsPrefix:u,showAlpha:n.showAlpha,mode:L.value,modes:o,onUpdateMode:Ce,value:M.value,valueArr:Me.value,onUpdateValue:Be},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),y(()=>n.swatches?.length&&(()=>{let e=Te(`1de0b88852ebf5cb`);return b(),t(Tt,{clsPrefix:u,mode:L.value,swatches:n.swatches,onUpdateColor:e[0]||=e=>{X(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),s?.length?(b(),p(`div`,{key:0,class:V(`${u}-color-picker-action`)},[y(()=>s.includes(`confirm`)&&(b(),t(k,{size:`small`,onClick:We,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>se.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),y(()=>s.includes(`clear`)&&(b(),t(k,{size:`small`,onClick:Ue,disabled:!M.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>se.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):y(()=>null),r.action?(b(),p(`div`,{key:2,class:V(`${u}-color-picker-action`)},[y(()=>r.action?.())],2)):(b(),p(z,{key:3},[a?(b(),p(`div`,{key:0,class:V(`${u}-color-picker-action`)},[y(()=>a.includes(`undo`)&&(b(),t(k,{size:`small`,onClick:Ve,disabled:!Ge.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>se.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),y(()=>a.includes(`redo`)&&(b(),t(k,{size:`small`,onClick:He,disabled:!Ke.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>se.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):y(()=>null)],64))],38)})()}return{mergedClsPrefix:ee,namespace:f,hsla:Y,rgba:J,mergedShow:pe,mergedDisabled:ae,isMounted:ne(),adjustedTo:Oe(n),mergedValue:M,handleTriggerClick(){ae.value||O(!0)},setTriggerRef:o,handleClickOutside(e){if(i instanceof Element){if(i.contains(ke(e)))return}else if(i&&i.$el.contains(ke(e)))return;O(!1)},renderPanel:Ye,cssVars:m?void 0:qe,themeClass:Je?.themeClass,onRender:Je?.onRender}},render(){let{mergedClsPrefix:e,onRender:n}=this;return n?.(),b(),t(U,null,{default:()=>[(b(),t(G,null,{default:()=>{let n=ae(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return n.onClick=je([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),ee(this.$slots.trigger,ze(n,[`value`,`onClick`,`ref`]),r=>r||(b(),t(Dt,ae(n,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(b(),t(W,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Oe.tdkey,to:this.adjustedTo},{_:1,default:le(()=>(b(),t(se,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:le(()=>this.mergedShow?be(this.renderPanel(),[[Ie,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-[15px] font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-4`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-4`},Qt={key:0,class:`mt-1 text-[11px] text-ink-4`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-[11px] text-ink-4`},tn={key:0,class:`flex flex-col gap-2`},nn={key:1,class:`panel grid place-items-center py-12`},rn={class:`flex items-start justify-between gap-3`},an={class:`min-w-0 flex-1`},on={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},sn={class:`tnum text-[11px] text-ink-4`},cn={class:`text-[11px] text-ink-4`},ln={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},un=f({__name:`AnnouncementsView`,setup(e){let n=Re(),r=We(),i=T([]),a=T(!0),s=T(!1),u=T(null),d=he({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ee=Object.keys(Ye).map(e=>({label:Ye[e].label,value:e})),f=h(()=>({fontFamily:Ye[d.font_family].css,fontSize:`${d.font_size}px`})),te=h(()=>[`light`,`dark`].map(e=>{let t=Ue()[e],n=Be(t.paper,d.font_color,d.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:d.font_color,overridden:n}})),m=h(()=>d.content.trim().length>0&&!s.value);function _(){u.value=null,d.content=``,d.font_family=`system`,d.font_size=15,d.font_color=`#1f2328`}async function ne(e=!1){e||(a.value=!0);try{let e=await A.list();i.value=e.announcements}catch(e){n.error(e instanceof C?e.message:`加载公告失败`)}finally{a.value=!1}}async function y(){if(!m.value)return;s.value=!0;let e={content:d.content.trim(),font_family:d.font_family,font_size:d.font_size,font_color:d.font_color};try{u.value===null?(await A.create(e),n.success(`公告已发布`)):(await A.update(u.value,e),n.success(`公告已更新`)),_(),await ne(!0),await r.load()}catch(e){n.error(e instanceof C?e.message:`保存失败`)}finally{s.value=!1}}function ie(e){u.value=e.id,d.content=e.content,d.font_family=e.font_family,d.font_size=e.font_size,d.font_color=e.font_color}async function ae(e){let t=e.is_active!==1;try{await A.setActive(e.id,t),n.success(t?`公告已启用`:`公告已停用`),await ne(!0),await r.load()}catch(e){n.error(e instanceof C?e.message:`操作失败`)}}async function x(e){if(await X({title:`删除公告`,content:`确定删除这条公告吗？删除后不可恢复。`,positiveText:`删除`}))try{await A.remove(e.id),n.success(`公告已删除`),u.value===e.id&&_(),await ne(!0),await r.load()}catch(e){n.error(e instanceof C?e.message:`删除失败`)}}return F(ne),(e,n)=>(b(),p(`div`,Ut,[l(Ze,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:N(()=>[l(B(k),{size:`small`,quaternary:``,loading:a.value,onClick:n[0]||=e=>ne()},{icon:N(()=>[l(B(qe),{size:15})]),default:N(()=>[n[5]||=g(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),D(`div`,Wt,[D(`section`,Gt,[D(`h3`,Kt,[(b(),t(L(u.value===null?B(Ke):B(Ge)),{size:15,style:{color:`var(--primary)`}})),g(` `+o(u.value===null?`发布新公告`:`编辑公告 #${u.value}`),1)]),l(B(Y),{label:`公告内容`,"show-feedback":!1},{default:N(()=>[l(B(Me),{value:d.content,"onUpdate:value":n[1]||=e=>d.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),D(`div`,qt,[l(B(Y),{label:`字体`,"show-feedback":!1},{default:N(()=>[l(B(J),{value:d.font_family,"onUpdate:value":n[2]||=e=>d.font_family=e,options:B(ee),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),l(B(Y),{label:`字号`,"show-feedback":!1},{default:N(()=>[l(B(Ne),{value:d.font_size,"onUpdate:value":n[3]||=e=>d.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),l(B(Y),{label:`文字颜色`,"show-feedback":!1},{default:N(()=>[l(B(Ht),{value:d.font_color,"onUpdate:value":n[4]||=e=>d.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),D(`div`,Jt,[D(`div`,Yt,[l(B(Ve),{size:12}),n[6]||=g(` 预览 `,-1)]),D(`div`,Xt,[(b(!0),p(z,null,v(te.value,e=>(b(),p(`div`,{key:e.key},[D(`div`,Zt,o(e.label),1),D(`div`,{class:`rounded-[12px] border p-3`,style:c({backgroundColor:e.paper,borderColor:e.line})},[D(`p`,{class:`whitespace-pre-wrap break-words`,style:c([f.value,{color:e.ink}])},o(d.content.trim()||`公告内容会显示在这里`),5)],4),e.overridden?(b(),p(`p`,Qt,` 所选颜色与`+o(e.label)+`纸面对比度不足，实际会回落到主题文字色 `,1)):pe(``,!0)]))),128))])]),D(`div`,$t,[l(B(k),{type:`primary`,class:`!font-bold shadow-[var(--glow-primary)]`,loading:s.value,disabled:!m.value,onClick:y},{icon:N(()=>[l(B(He),{size:15})]),default:N(()=>[g(` `+o(u.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),u.value===null?pe(``,!0):(b(),t(B(k),{key:0,quaternary:``,onClick:_},{default:N(()=>[...n[7]||=[g(`取消编辑`,-1)]]),_:1}))]),u.value===null?(b(),p(`p`,en,` 保存后立即对所有用户生效，并自动停用上一条公告。 `)):pe(``,!0)]),D(`section`,null,[n[10]||=D(`h3`,{class:`mb-3 font-heading text-[15px] font-bold`},[g(` 历史公告 `),D(`span`,{class:`tech-label ml-2 text-ink-4`},`最近 50 条`)],-1),a.value&&!i.value.length?(b(),p(`div`,tn,[(b(),p(z,null,v(3,e=>l(B(Pe),{key:e,height:`92px`,sharp:!1})),64))])):i.value.length?(b(),t(R,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:N(()=>[(b(!0),p(z,null,v(i.value,e=>(b(),p(`li`,{key:e.id,class:re([`panel p-3.5`,e.is_active===1&&`border-primary/40`])},[D(`div`,rn,[D(`div`,an,[D(`p`,{class:`line-clamp-2 text-[13px]`,style:c({fontFamily:B(Ye)[e.font_family]?.css})},o(e.content),5),D(`div`,on,[D(`span`,{class:`tech-label rounded-full px-2 py-0.5`,style:c(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-quaternary)`})},o(e.is_active===1?`生效中`:`已停用`),5),D(`span`,sn,[g(` #`+o(e.id)+` · `+o(B(Ye)[e.font_family]?.label??e.font_family)+` `+o(e.font_size)+`px · `,1),D(`span`,{style:c({color:e.font_color})},o(e.font_color),5)]),D(`span`,cn,o(e.author??`系统`)+` · `+o(B(Xe)(e.update_time)),1)])]),l(B(Fe),{value:e.is_active===1,size:`small`,"onUpdate:value":t=>ae(e)},null,8,[`value`,`onUpdate:value`])]),D(`div`,ln,[l(B(k),{size:`tiny`,quaternary:``,onClick:t=>ie(e)},{icon:N(()=>[l(B(Ge),{size:12})]),default:N(()=>[n[8]||=g(` 编辑 `,-1)]),_:1},8,[`onClick`]),l(B(k),{size:`tiny`,quaternary:``,onClick:t=>x(e)},{icon:N(()=>[l(B(Je),{size:12})]),default:N(()=>[n[9]||=g(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(b(),p(`div`,nn,[l(B(H),{description:`还没有发布过公告`,size:`small`},{icon:N(()=>[l(B(He),{size:30})]),_:1})]))])])]))}});export{un as default};