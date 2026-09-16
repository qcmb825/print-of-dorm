import{$ as e,$n as t,An as n,B as r,Cn as i,Dn as a,En as o,F as s,Fn as c,Gn as l,Hn as u,I as d,In as f,J as p,K as m,Kn as ee,L as h,Ln as te,N as g,O as _,Ot as ne,P as re,Q as v,Qn as ie,R as y,Sr as b,St as ae,T as oe,Tn as x,Tt as se,V as S,X as ce,Xn as le,Z as C,_t as w,an as T,at as ue,br as E,ct as de,dr as D,et as fe,f as O,fn as pe,gr as me,ht as k,in as A,it as he,j,jn as M,kn as N,lr as ge,lt as _e,m as P,mt as F,n as I,nn as L,nr as R,nt as ve,ot as ye,p as z,pn as B,pt as be,q as V,qn as H,rt as U,sn as xe,st as W,tn as G,tr as K,tt as Se,u as q,vt as Ce,wn as J,xr as Y,yn as we,yr as X,z as Te}from"./endpoints-gDUDUnKI.js";import{t as Ee}from"./use-locale-fRdQHsG2.js";import{a as De,i as Oe,o as ke,s as Ae}from"./Popover-DARfIN_e.js";import{t as je}from"./light-B-sUXlRP.js";import{t as Me}from"./Empty-ByG1ebw9.js";import{i as Ne}from"./cssr-nvHT-q9I.js";import{i as Pe,t as Fe}from"./Select-C9WY8ucH.js";import{t as Ie}from"./FormItem-D6pGAAu_.js";import{t as Z}from"./Input-Bz_s8aeD.js";import{t as Le}from"./Add-C0hNnf96.js";import{t as Q}from"./Skeleton-BKWPjkVr.js";import{t as Re}from"./Switch-DyvNrw3D.js";import{N as ze,St as Be,b as Ve,ct as He,mt as $,o as Ue,pt as We,r as Ge,rt as Ke,xt as qe,z as Je}from"./index-DmEbPUOi.js";import{n as Ye,t as Xe}from"./pencil-2_LS1_u9.js";import{i as Ze,n as Qe,r as $e}from"./paper-CxGav1Sl.js";import{t as et}from"./plus-Dsg6aI7q.js";import{t as tt}from"./refresh-cw-4vMvhY75.js";import{t as nt}from"./trash-cgwLqZLz.js";import{n as rt}from"./types-DKn5MR2h.js";import{m as it}from"./format-D36ElkIK.js";import{t as at}from"./PageHeader-cqOWns8s.js";var ot=L(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[G(`>`,[L(`input`,[G(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),G(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),L(`button`,[G(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[A(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),G(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[A(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),G(`*`,[G(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[G(`>`,[L(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),L(`base-selection`,[L(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),L(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),A(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),G(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[G(`>`,[L(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),L(`base-selection`,[L(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),L(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),A(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),st=M({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=ae(e);return Ce(`-input-group`,ot,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return l(),a(`div`,{class:F(`${e}-input-group`)},[w(()=>this.$slots.default?.())],2)}});function ct(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function lt(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function ut(t,n=[255,255,255],r=`AA`){let[i,a,o,s]=p(e(t));if(s===1){let e=dt([i,a,o]),t=dt(n);return(Math.max(e,t)+.05)/(Math.min(e,t)+.05)>=(r===`AA`?4.5:7)}let c=dt([Math.round(i*s+n[0]*(1-s)),Math.round(a*s+n[1]*(1-s)),Math.round(o*s+n[2]*(1-s))]),l=dt(n);return(Math.max(c,l)+.05)/(Math.min(c,l)+.05)>=(r===`AA`?4.5:7)}function dt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function ft(e){return e=Math.round(e),e>=360?359:e<0?0:e}function pt(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var mt={rgb:{hex(e){return C(p(e))},hsl(t){let[n,r,i,a]=p(t);return e([...de(n,r,i),a])},hsv(e){let[t,n,r,i]=p(e);return Se([..._e(t,n,r),i])}},hex:{rgb(e){return U(p(e))},hsl(t){let[n,r,i,a]=p(t);return e([...de(n,r,i),a])},hsv(e){let[t,n,r,i]=p(e);return Se([..._e(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=m(e);return C([...ue(t,n,r),i])},rgb(e){let[t,n,r,i]=m(e);return U([...ue(t,n,r),i])},hsv(e){let[t,n,r,i]=m(e);return Se([...he(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=V(e);return C([...W(t,n,r),i])},rgb(e){let[t,n,r,i]=V(e);return U([...W(t,n,r),i])},hsl(t){let[n,r,i,a]=V(t);return e([...ye(n,r,i),a])}}};function ht(e,t,n){return n||=lt(e),n?n===t?e:mt[n][t](e):null}var gt=[`onMousedown`],_t=`12px`,vt=12,yt=`6px`,bt=M({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=D(null);function n(n){t.value&&e.rgba&&($(`mousemove`,document,r),$(`mouseup`,document,a),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-vt);e.onUpdateAlpha(pt(o))}function a(){We(`mousemove`,document,r),We(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,railBackgroundImage:i(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return l(),a(`div`,{class:F(`${e}-color-picker-slider`),ref:`railRef`,style:Y({height:_t,borderRadius:yt}),onMousedown:this.handleMouseDown},[J(`div`,{style:Y({borderRadius:yt,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[J(`div`,{class:F(`${e}-color-picker-checkboard`)},null,2),J(`div`,{class:F(`${e}-color-picker-slider__image`),style:Y({backgroundImage:this.railBackgroundImage})},null,6)],4),w(()=>this.rgba&&(l(),a(`div`,{style:Y({position:`absolute`,left:yt,right:yt,top:0,bottom:0})},[J(`div`,{class:F(`${e}-color-picker-handle`),style:Y({left:`calc(${this.alpha*100}% - ${yt})`,borderRadius:yt,width:_t,height:_t})},[J(`div`,{class:F(`${e}-color-picker-handle__fill`),style:Y({backgroundColor:U(this.rgba),borderRadius:yt,width:_t,height:_t})},null,6)],6)],4)))],46,gt)}}),xt=se(`n-color-picker`);function St(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function Ct(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function wt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function Tt(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function Et(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var Dt={paddingSmall:`0 4px`},Ot=M({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let n=D(``),{themeRef:r}=c(xt,null);t(()=>{n.value=i()});function i(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function a(e){n.value=e}function o(t){let r,a;switch(e.label){case`HEX`:a=Tt(t),a&&e.onUpdateValue(t),n.value=i();break;case`H`:r=Ct(t),r===!1?n.value=i():e.onUpdateValue(r);break;case`S`:case`L`:case`V`:r=wt(t),r===!1?n.value=i():e.onUpdateValue(r);break;case`A`:r=Et(t),r===!1?n.value=i():e.onUpdateValue(r);break;case`R`:case`G`:case`B`:r=St(t),r===!1?n.value=i():e.onUpdateValue(r)}}return{mergedTheme:r,inputValue:n,handleInputChange:o,handleInputUpdateValue:a}},render(){let{mergedTheme:e}=this;return l(),x(Z,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:Dt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:Y(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),kt=[`onClick`],At=M({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(t){return{handleUnitUpdateValue(n,r){let{showAlpha:i}=t;if(t.mode===`hex`){t.onUpdateValue((i?C:ce)(r));return}let a;switch(a=t.valueArr===null?[0,0,0,0]:Array.from(t.valueArr),t.mode){case`hsv`:a[n]=r,t.onUpdateValue((i?Se:fe)(a));break;case`rgb`:a[n]=r,t.onUpdateValue((i?U:ve)(a));break;case`hsl`:a[n]=r,t.onUpdateValue((i?e:v)(a))}}}},render(){let{clsPrefix:e,modes:t}=this;return l(),a(`div`,{class:F(`${e}-color-picker-input`)},[J(`div`,{class:F(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:Y({cursor:t.length===1?``:`pointer`})},[w(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,kt),n(st,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?C:ce)(t)}catch{}return l(),x(Ot,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(l(),x(Ot,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),jt=[`onClick`,`onKeydown`];function Mt(e,t){if(t===`hsv`){let[t,n,r,i]=V(e);return U([...W(t,n,r),i])}return e}function Nt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Pt=M({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=i(()=>e.swatches.map(e=>{let t=lt(e);return{value:e,mode:t,legalValue:Mt(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=Nt(r):(ne(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:ht(r,n,i)}function r(t){e.onUpdateColor(n(t))}function a(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:a}},render(){let{clsPrefix:e}=this;return l(),a(`div`,{class:F(`${e}-color-picker-swatches`)},[w(()=>this.parsedSwatchesRef.map(t=>(l(),a(`div`,{class:F(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[J(`div`,{class:F(`${e}-color-picker-swatch__fill`),style:Y({background:t.legalValue})},null,6)],42,jt))))],2)}}),Ft=[`onClick`],It=M({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(t){let{colorPickerSlots:n,renderLabelRef:r}=c(xt,null);return()=>{let{hsla:i,value:o,clsPrefix:s,onClick:c,disabled:u}=t,d=n.label||r.value;return l(),a(`div`,{class:F([`${s}-color-picker`,u&&`${s}-color-picker--disabled`]),onClick:u?void 0:c},[J(`div`,{class:F(`${s}-color-picker__fill`)},[J(`div`,{class:F(`${s}-color-picker-checkboard`)},null,2),J(`div`,{style:Y({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:i?e(i):``})},null,4),o&&i?(l(),a(`div`,{key:0,class:F(`${s}-color-picker__value`),style:Y({color:ut(i)?`white`:`black`})},[d?(l(),a(we,{key:0},[w(()=>d(o))],64)):(l(),a(we,{key:1},[w(()=>o)],64))],6)):w(()=>null)],2)],10,Ft)}}}),Lt=[`value`,`onChange`],Rt=M({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=lt(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(ht(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return l(),a(`div`,{class:F(`${e}-color-picker-preview__preview`)},[J(`span`,{class:F(`${e}-color-picker-preview__fill`),style:Y({background:this.color||`#000000`})},null,6),J(`input`,{class:F(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Lt)],2)}}),zt=[`onMousedown`],Bt=`12px`,Vt=12,Ht=`6px`,Ut=6,Wt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Gt=M({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=D(null);function n(e){t.value&&($(`mousemove`,document,r),$(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=ft((n.clientX-a-Ut)/(i-Vt)*360);e.onUpdateHue(o)}function i(){We(`mousemove`,document,r),We(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return l(),a(`div`,{class:F(`${e}-color-picker-slider`),style:Y({height:Bt,borderRadius:Ht})},[J(`div`,{ref:`railRef`,style:Y({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Wt,height:Bt,borderRadius:Ht,position:`relative`}),onMousedown:this.handleMouseDown},[J(`div`,{style:Y({position:`absolute`,left:Ht,right:Ht,top:0,bottom:0})},[J(`div`,{class:F(`${e}-color-picker-handle`),style:Y({left:`calc((${this.hue}%) / 359 * 100 - ${Ht})`,borderRadius:Ht,width:Bt,height:Bt})},[J(`div`,{class:F(`${e}-color-picker-handle__fill`),style:Y({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Ht,width:Bt,height:Bt})},null,6)],6)],4)],44,zt)],6)}}),Kt=[`onMousedown`],qt=`12px`,Jt=`6px`,Yt=M({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=D(null);function n(e){t.value&&($(`mousemove`,document,r),$(`mouseup`,document,a),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function a(){We(`mousemove`,document,r),We(`mouseup`,document,a),e.onComplete?.()}return{palleteRef:t,handleColor:i(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return l(),a(`div`,{class:F(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[J(`div`,{class:F(`${e}-color-picker-pallete__layer`),style:Y({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),J(`div`,{class:F(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),w(()=>this.rgba&&(l(),a(`div`,{class:F(`${e}-color-picker-handle`),style:Y({width:qt,height:qt,borderRadius:Jt,left:`calc(${this.displayedSv[0]}% - ${Jt})`,bottom:`calc(${this.displayedSv[1]}% - ${Jt})`})},[J(`div`,{class:F(`${e}-color-picker-handle__fill`),style:Y({backgroundColor:this.handleColor,borderRadius:Jt,width:qt,height:qt})},null,6)],6)))],42,Kt)}}),Xt=G([L(`color-picker-panel`,`
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
 `,[Je(),L(`input`,`
 text-align: center;
 `)]),L(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[G(`&::after`,`
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
 `)]),L(`color-picker-slider`,`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[A(`image`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),G(`&::after`,`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),L(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[A(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),L(`color-picker-pallete`,`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[A(`layer`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[T(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),L(`color-picker-preview`,`
 display: flex;
 `,[A(`sliders`,`
 flex: 1 0 auto;
 `),A(`preview`,`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),A(`fill`,`
 display: block;
 width: 30px;
 height: 30px;
 `),A(`input`,`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),L(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[L(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),A(`mode`,`
 width: 72px;
 text-align: center;
 `)]),L(`color-picker-control`,`
 padding: 12px;
 `),L(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[L(`button`,`margin-left: 8px;`)]),L(`color-picker`,`
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
 `,[T(`disabled`,`cursor: not-allowed`),A(`value`,`
 white-space: nowrap;
 position: relative;
 `),A(`fill`,`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),L(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[G(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),L(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[L(`color-picker-swatch`,`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[A(`fill`,`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),G(`&:focus`,`
 outline: none;
 `,[A(`fill`,[G(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Zt={...Te.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Ae.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Qt=M({name:`ColorPicker`,inheritAttrs:!1,props:Zt,slots:Object,setup(n,{slots:o}){let c=null;function u(e){c=e}let f=null,{mergedClsPrefixRef:h,namespaceRef:g,inlineThemeDisabled:_,mergedComponentPropsRef:ne}=ae(n),re=oe(n,{mergedSize:e=>{let{size:t}=n;if(t)return t;let{mergedSize:r}=e||{};return r?.value?r.value:ne?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:y,mergedDisabledRef:b}=re,{localeRef:se}=Ee(`global`),S=Te(`ColorPicker`,`-color-picker`,Xt,ze,n,h);ee(xt,{themeRef:S,renderLabelRef:me(n,`renderLabel`),colorPickerSlots:o});let le=D(n.defaultShow),T=Ne(me(n,`show`),le);function E(e){let{onUpdateShow:t,"onUpdate:show":r}=n;t&&s(t,e),r&&s(r,e),le.value=e}let{defaultValue:pe}=n,k=D(pe===void 0?ct(n.modes,n.showAlpha):pe),A=Ne(me(n,`value`),k),j=D([A.value]),M=D(0),N=i(()=>lt(A.value)),{modes:ge}=n,P=D(lt(A.value)||ge[0]||`rgb`);function I(){let{modes:e}=n,{value:t}=P,r=e.findIndex(e=>e===t);~r?P.value=e[(r+1)%e.length]:P.value=`rgb`}let L,R,z,B,H,G,K,q,Ce=i(()=>{let{value:e}=A;if(!e)return null;switch(N.value){case`hsv`:return V(e);case`hsl`:return[L,R,z,q]=m(e),[...he(L,R,z),q];case`rgb`:case`hex`:return[H,G,K,q]=p(e),[..._e(H,G,K),q]}}),X=i(()=>{let{value:e}=A;if(!e)return null;switch(N.value){case`rgb`:case`hex`:return p(e);case`hsv`:return[L,R,B,q]=V(e),[...W(L,R,B),q];case`hsl`:return[L,R,z,q]=m(e),[...ue(L,R,z),q]}}),De=i(()=>{let{value:e}=A;if(!e)return null;switch(N.value){case`hsl`:return m(e);case`hsv`:return[L,R,B,q]=V(e),[...ye(L,R,B),q];case`rgb`:case`hex`:return[H,G,K,q]=p(e),[...de(H,G,K),q]}}),Oe=i(()=>{switch(P.value){case`rgb`:case`hex`:return X.value;case`hsv`:return Ce.value;case`hsl`:return De.value}}),ke=D(0),je=D(1),Me=D([0,0]);function Pe(t,r){let{value:i}=Ce,a=ke.value,o=i?i[3]:1;Me.value=[t,r];let{showAlpha:s}=n;switch(P.value){case`hsv`:Z((s?Se:fe)([a,t,r,o]),`cursor`);break;case`hsl`:Z((s?e:v)([...ye(a,t,r),o]),`cursor`);break;case`rgb`:Z((s?U:ve)([...W(a,t,r),o]),`cursor`);break;case`hex`:Z((s?C:ce)([...W(a,t,r),o]),`cursor`)}}function Fe(t){ke.value=t;let{value:r}=Ce;if(!r)return;let[,i,a,o]=r,{showAlpha:s}=n;switch(P.value){case`hsv`:Z((s?Se:fe)([t,i,a,o]),`cursor`);break;case`rgb`:Z((s?U:ve)([...W(t,i,a),o]),`cursor`);break;case`hex`:Z((s?C:ce)([...W(t,i,a),o]),`cursor`);break;case`hsl`:Z((s?e:v)([...ye(t,i,a),o]),`cursor`)}}function Ie(t){switch(P.value){case`hsv`:[L,R,B]=Ce.value,Z(Se([L,R,B,t]),`cursor`);break;case`rgb`:[H,G,K]=X.value,Z(U([H,G,K,t]),`cursor`);break;case`hex`:[H,G,K]=X.value,Z(C([H,G,K,t]),`cursor`);break;case`hsl`:[L,R,z]=De.value,Z(e([L,R,z,t]),`cursor`)}je.value=t}function Z(e,t){f=t===`cursor`?e:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=re,{onUpdateValue:a,"onUpdate:value":o}=n;a&&s(a,e),o&&s(o,e),r(),i(),k.value=e}function Le(e){Z(e,`input`),te(Q)}function Q(e=!0){let{value:t}=A;if(t){let{nTriggerFormChange:r,nTriggerFormInput:i}=re,{onComplete:a}=n;a&&a(t);let{value:o}=j,{value:s}=M;e&&(o.splice(s+1,o.length,t),M.value=s+1),r(),i()}}function Re(){let{value:e}=M;e-1<0||(Z(j.value[e-1],`input`),Q(!1),M.value=e-1)}function Ve(){let{value:e}=M;e<0||e+1>=j.value.length||(Z(j.value[e+1],`input`),Q(!1),M.value=e+1)}function He(){Z(null,`input`);let{onClear:e}=n;e&&e(),E(!1)}function $(){let{value:e}=A,{onConfirm:t}=n;t&&t(e),E(!1)}let Ue=i(()=>M.value>=1),We=i(()=>{let{value:e}=j;return e.length>1&&M.value<e.length-1});ie(T,e=>{e||(j.value=[A.value],M.value=0)}),t(()=>{if(!(f&&f===A.value)){let{value:e}=Ce;e&&(ke.value=e[0],je.value=e[3],Me.value=[e[1],e[2]])}f=null});let Ge=i(()=>{let{value:e}=y,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[xe(`height`,e)]:l,[xe(`fontSize`,e)]:u}}=S.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),Ke=_?r(`color-picker`,i(()=>y.value[0]),Ge,n):void 0;function qe(){let{value:e}=X,{value:t}=ke,{internalActions:r,modes:i,actions:s}=n,{value:c}=S,{value:u}=h;return(()=>{let d=be(`550d4636453f407b`);return l(),a(`div`,{class:F([`${u}-color-picker-panel`,Ke?.themeClass.value]),onDragstart:d[0]||=e=>{e.preventDefault()},style:Y(_?void 0:Ge.value)},[J(`div`,{class:F(`${u}-color-picker-control`)},[(l(),x(Yt,{clsPrefix:u,rgba:e,displayedHue:t,displayedSv:Me.value,onUpdateSV:Pe,onComplete:Q},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),J(`div`,{class:F(`${u}-color-picker-preview`)},[J(`div`,{class:F(`${u}-color-picker-preview__sliders`)},[(l(),x(Gt,{clsPrefix:u,hue:t,onUpdateHue:Fe,onComplete:Q},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),n.showAlpha?(l(),x(bt,{key:0,clsPrefix:u,rgba:e,alpha:je.value,onUpdateAlpha:Ie,onComplete:Q},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):w(()=>null)],2),n.showPreview?(l(),x(Rt,{key:0,clsPrefix:u,mode:P.value,color:X.value&&ce(X.value),onUpdateColor:d[1]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):w(()=>null)],2),(l(),x(At,{clsPrefix:u,showAlpha:n.showAlpha,mode:P.value,modes:i,onUpdateMode:I,value:A.value,valueArr:Oe.value,onUpdateValue:Le},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),w(()=>n.swatches?.length&&(()=>{let e=be(`1de0b88852ebf5cb`);return l(),x(Pt,{clsPrefix:u,mode:P.value,swatches:n.swatches,onUpdateColor:e[0]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),s?.length?(l(),a(`div`,{key:0,class:F(`${u}-color-picker-action`)},[w(()=>s.includes(`confirm`)&&(l(),x(O,{size:`small`,onClick:$,theme:c.peers.Button,themeOverrides:c.peerOverrides.Button},{default:()=>se.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),w(()=>s.includes(`clear`)&&(l(),x(O,{size:`small`,onClick:He,disabled:!A.value,theme:c.peers.Button,themeOverrides:c.peerOverrides.Button},{default:()=>se.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):w(()=>null),o.action?(l(),a(`div`,{key:2,class:F(`${u}-color-picker-action`)},[w(()=>o.action?.())],2)):(l(),a(we,{key:3},[r?(l(),a(`div`,{key:0,class:F(`${u}-color-picker-action`)},[w(()=>r.includes(`undo`)&&(l(),x(O,{size:`small`,onClick:Re,disabled:!Ue.value,theme:c.peers.Button,themeOverrides:c.peerOverrides.Button},{default:()=>se.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),w(()=>r.includes(`redo`)&&(l(),x(O,{size:`small`,onClick:Ve,disabled:!We.value,theme:c.peers.Button,themeOverrides:c.peerOverrides.Button},{default:()=>se.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):w(()=>null)],64))],38)})()}return{mergedClsPrefix:h,namespace:g,hsla:De,rgba:X,mergedShow:T,mergedDisabled:b,isMounted:d(),adjustedTo:Ae(n),mergedValue:A,handleTriggerClick(){b.value||E(!0)},setTriggerRef:u,handleClickOutside(e){if(c instanceof Element){if(c.contains(Be(e)))return}else if(c&&c.$el.contains(Be(e)))return;E(!1)},renderPanel:qe,cssVars:_?void 0:Ge,themeClass:Ke?.themeClass,onRender:Ke?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),l(),x(ke,null,{default:()=>[(l(),x(De,null,{default:()=>{let t=f(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=Pe([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),re(this.$slots.trigger,He(t,[`value`,`onClick`,`ref`]),n=>n||(l(),x(It,f(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(l(),x(Oe,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Ae.tdkey,to:this.adjustedTo},{_:1,default:k(()=>(l(),x(pe,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:k(()=>this.mergedShow?R(this.renderPanel(),[[Ke,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),$t=M({name:`Remove`,render(){return(()=>{let e=be(`a77472467b8adb0a`);return e[0]||=J(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 512 512`},[J(`line`,{x1:`400`,y1:`256`,x2:`112`,y2:`256`,style:`
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      `})],-1)})()}});function en(e){let{textColorDisabled:t}=e;return{iconColorDisabled:t}}var tn=y({name:`InputNumber`,common:S,peers:{Button:P,Input:je},self:en}),nn=G([L(`input-number-suffix`,`
 display: inline-block;
 margin-right: 10px;
 `),L(`input-number-prefix`,`
 display: inline-block;
 margin-left: 10px;
 `)]);function rn(e){return e==null||typeof e==`string`&&e.trim()===``?null:Number(e)}function an(e){return e.includes(`.`)&&(/^(-)?\d+.*(\.|0)$/.test(e)||/^-?\d*$/.test(e))||e===`-`||e===`-0`}function on(e){return e==null||!Number.isNaN(e)}function sn(e,t){return typeof e==`number`?t===void 0?String(e):e.toFixed(t):``}function cn(e){if(e===null)return null;if(typeof e==`number`)return e;{let t=Number(e);return Number.isNaN(t)?null:t}}var ln=800,un=100,dn={...Te.props,autofocus:Boolean,loading:{type:Boolean,default:void 0},placeholder:String,defaultValue:{type:Number,default:null},value:Number,step:{type:[Number,String],default:1},min:[Number,String],max:[Number,String],size:String,disabled:{type:Boolean,default:void 0},validator:Function,bordered:{type:Boolean,default:void 0},showButton:{type:Boolean,default:!0},buttonPlacement:{type:String,default:`right`},inputProps:Object,readonly:Boolean,clearable:Boolean,keyboard:{type:Object,default:{}},updateValueOnInput:{type:Boolean,default:!0},round:{type:Boolean,default:void 0},parse:Function,format:Function,precision:Number,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onChange:[Function,Array]},fn=M({name:`InputNumber`,props:dn,slots:Object,setup(e){let{mergedBorderedRef:t,mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:a}=ae(e),o=Te(`InputNumber`,`-input-number`,nn,tn,e,n),{localeRef:c}=Ee(`InputNumber`),l=oe(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:a?.value?.InputNumber?.size||`medium`}}),{mergedSizeRef:u,mergedDisabledRef:d,mergedStatusRef:f}=l,m=D(null),ee=D(null),g=D(null),ne=D(e.defaultValue),re=me(e,`value`),v=Ne(re,ne),y=D(``),b=e=>{let t=String(e).split(`.`)[1];return t?t.length:0},x=t=>{let n=[e.min,e.max,e.step,t].map(e=>e===void 0?0:b(e));return Math.max(...n)},se=h(()=>{let{placeholder:t}=e;return t===void 0?c.value.placeholder:t}),S=h(()=>{let t=cn(e.step);return t===null||t===0?1:Math.abs(t)}),ce=h(()=>{let t=cn(e.min);return t===null?null:t}),le=h(()=>{let t=cn(e.max);return t===null?null:t}),C=()=>{let{value:t}=v;if(on(t)){let{format:n,precision:r}=e;n?y.value=n(t):t===null||r===void 0||b(t)>r?y.value=sn(t,void 0):y.value=sn(t,r)}else y.value=String(t)};C();let w=t=>{let{value:n}=v;if(t===n){C();return}let{"onUpdate:value":r,onUpdateValue:i,onChange:a}=e,{nTriggerFormInput:o,nTriggerFormChange:c}=l;a&&s(a,t),i&&s(i,t),r&&s(r,t),ne.value=t,o(),c()},T=({offset:t,doUpdateIfValid:n,fixPrecision:r,isInputing:i})=>{let{value:a}=y;if(i&&an(a))return!1;let o=(e.parse||rn)(a);if(o===null)return n&&w(null),null;if(on(o)){let a=b(o),{precision:s}=e;if(s!==void 0&&s<a&&!r)return!1;let c=Number.parseFloat((o+t).toFixed(s??x(o)));if(on(c)){let{value:t}=le,{value:r}=ce;if(t!==null&&c>t){if(!n||i)return!1;c=t}if(r!==null&&c<r){if(!n||i)return!1;c=r}return e.validator&&!e.validator(c)?!1:(n&&w(c),c)}}return!1},ue=h(()=>T({offset:0,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})===!1),E=h(()=>{let{value:t}=v;if(e.validator&&t===null)return!1;let{value:n}=S;return T({offset:-n,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1}),de=h(()=>{let{value:t}=v;if(e.validator&&t===null)return!1;let{value:n}=S;return T({offset:+n,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1});function fe(t){let{onFocus:n}=e,{nTriggerFormFocus:r}=l;n&&s(n,t),r()}function O(t){if(t.target===m.value?.wrapperElRef)return;let n=T({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0});if(n!==!1){let e=m.value?.inputElRef;e&&(e.value=String(n||``)),v.value===n&&C()}else C();let{onBlur:r}=e,{nTriggerFormBlur:i}=l;r&&s(r,t),i(),te(()=>{C()})}function pe(t){let{onClear:n}=e;n&&s(n,t)}function k(){let{value:t}=de;if(!t){R();return}let{value:n}=v;if(n===null)e.validator||w(M());else{let{value:e}=S;T({offset:e,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}function A(){let{value:t}=E;if(!t){I();return}let{value:n}=v;if(n===null)e.validator||w(M());else{let{value:e}=S;T({offset:-e,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}let he=fe,j=O;function M(){if(e.validator)return null;let{value:t}=ce,{value:n}=le;return t===null?n===null?0:Math.min(0,n):Math.max(0,t)}function N(e){pe(e),w(null)}function ge(e){g.value?.$el.contains(e.target)&&e.preventDefault(),ee.value?.$el.contains(e.target)&&e.preventDefault(),m.value?.activate()}let _e=null,P=null,F=null;function I(){F&&=(window.clearTimeout(F),null),_e&&=(window.clearInterval(_e),null)}let L=null;function R(){L&&=(window.clearTimeout(L),null),P&&=(window.clearInterval(P),null)}function ve(){I(),F=window.setTimeout(()=>{_e=window.setInterval(()=>{A()},un)},ln),$(`mouseup`,document,I,{once:!0})}function ye(){R(),L=window.setTimeout(()=>{P=window.setInterval(()=>{k()},un)},ln),$(`mouseup`,document,R,{once:!0})}let z=()=>{P||k()},B=()=>{_e||A()};function be(t){if(t.key===`Enter`){if(t.target===m.value?.wrapperElRef)return;T({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&m.value?.deactivate()}else if(t.key===`ArrowUp`){if(!de.value||e.keyboard.ArrowUp===!1)return;t.preventDefault(),T({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&k()}else if(t.key===`ArrowDown`){if(!E.value||e.keyboard.ArrowDown===!1)return;t.preventDefault(),T({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&A()}}function V(t){y.value=t,e.updateValueOnInput&&!e.format&&!e.parse&&e.precision===void 0&&T({offset:0,doUpdateIfValid:!0,isInputing:!0,fixPrecision:!1})}ie(v,()=>{C()});let H={focus:()=>m.value?.focus(),blur:()=>m.value?.blur(),select:()=>m.value?.select()},U=_(`InputNumber`,r,n);return{...H,rtlEnabled:U,inputInstRef:m,minusButtonInstRef:ee,addButtonInstRef:g,mergedClsPrefix:n,mergedBordered:t,uncontrolledValue:ne,mergedValue:v,mergedPlaceholder:se,displayedValueInvalid:ue,mergedSize:u,mergedDisabled:d,displayedValue:y,addable:de,minusable:E,mergedStatus:f,handleFocus:he,handleBlur:j,handleClear:N,handleMouseDown:ge,handleAddClick:z,handleMinusClick:B,handleAddMousedown:ye,handleMinusMousedown:ve,handleKeyDown:be,handleUpdateDisplayedValue:V,mergedTheme:o,inputThemeOverrides:{paddingSmall:`0 8px 0 10px`,paddingMedium:`0 8px 0 12px`,paddingLarge:`0 8px 0 14px`},buttonThemeOverrides:i(()=>{let{self:{iconColorDisabled:e}}=o.value,[t,n,r,i]=p(e);return{textColorTextDisabled:`rgb(${t}, ${n}, ${r})`,opacityDisabled:`${i}`}})}},render(){let{mergedClsPrefix:e,$slots:t}=this,n=()=>(l(),x(z,{text:!0,disabled:!this.minusable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleMinusClick,onMousedown:this.handleMinusMousedown,ref:`minusButtonInstRef`},{icon:()=>j(t[`minus-icon`],()=>[(l(),x(qe,{clsPrefix:e},{default:()=>(l(),x($t))},1032,[`clsPrefix`]))])},1032,[`disabled`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`onClick`,`onMousedown`])),r=()=>(l(),x(z,{text:!0,disabled:!this.addable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleAddClick,onMousedown:this.handleAddMousedown,ref:`addButtonInstRef`},{icon:()=>j(t[`add-icon`],()=>[(l(),x(qe,{clsPrefix:e},{default:()=>(l(),x(Le))},1032,[`clsPrefix`]))])},1032,[`disabled`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`onClick`,`onMousedown`]));return l(),a(`div`,{class:F([`${e}-input-number`,this.rtlEnabled&&`${e}-input-number--rtl`])},[(l(),x(Z,{ref:`inputInstRef`,autofocus:this.autofocus,status:this.mergedStatus,bordered:this.mergedBordered,loading:this.loading,value:this.displayedValue,onUpdateValue:this.handleUpdateDisplayedValue,theme:this.mergedTheme.peers.Input,themeOverrides:this.mergedTheme.peerOverrides.Input,builtinThemeOverrides:this.inputThemeOverrides,size:this.mergedSize,placeholder:this.mergedPlaceholder,disabled:this.mergedDisabled,readonly:this.readonly,round:this.round,textDecoration:this.displayedValueInvalid?`line-through`:void 0,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onClear:this.handleClear,clearable:this.clearable,inputProps:this.inputProps,internalLoadingBeforeSuffix:!0},{prefix:()=>this.showButton&&this.buttonPlacement===`both`?[n(),g(t.prefix,t=>t?(l(),a(`span`,{key:1,class:F(`${e}-input-number-prefix`)},[w(()=>t)],2)):null)]:t.prefix?.(),suffix:()=>this.showButton?[g(t.suffix,t=>t?(l(),a(`span`,{key:2,class:F(`${e}-input-number-suffix`)},[w(()=>t)],2)):null),this.buttonPlacement===`right`?n():null,r()]:t.suffix?.()},1032,[`autofocus`,`status`,`bordered`,`loading`,`value`,`onUpdateValue`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`size`,`placeholder`,`disabled`,`readonly`,`round`,`textDecoration`,`onFocus`,`onBlur`,`onKeydown`,`onMousedown`,`onClear`,`clearable`,`inputProps`]))],2)}}),pn={class:`mx-auto max-w-[1400px]`},mn={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},hn={class:`panel h-fit p-4`},gn={class:`mb-3 flex items-center gap-2 font-heading text-[15px] font-bold`},_n={class:`grid grid-cols-2 gap-3`},vn={class:`mb-3`},yn={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-4`},bn={class:`grid gap-2 sm:grid-cols-2`},xn={class:`tech-label mb-1 text-ink-4`},Sn={key:0,class:`mt-1 text-[11px] text-ink-4`},Cn={class:`flex items-center gap-2`},wn={key:0,class:`mt-3 text-[11px] text-ink-4`},Tn={key:0,class:`flex flex-col gap-2`},En={key:1,class:`panel grid place-items-center py-12`},Dn={class:`flex items-start justify-between gap-3`},On={class:`min-w-0 flex-1`},kn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},An={class:`tnum text-[11px] text-ink-4`},jn={class:`text-[11px] text-ink-4`},Mn={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},Nn=M({__name:`AnnouncementsView`,setup(e){let t=Ve(),r=$e(),s=D([]),c=D(!0),d=D(!1),f=D(null),p=ge({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),m=Object.keys(rt).map(e=>({label:rt[e].label,value:e})),ee=i(()=>({fontFamily:rt[p.font_family].css,fontSize:`${p.font_size}px`})),h=i(()=>[`light`,`dark`].map(e=>{let t=Qe()[e],n=Ge(t.paper,p.font_color,p.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:p.font_color,overridden:n}})),te=i(()=>p.content.trim().length>0&&!d.value);function g(){f.value=null,p.content=``,p.font_family=`system`,p.font_size=15,p.font_color=`#1f2328`}async function _(e=!1){e||(c.value=!0);try{let e=await I.list();s.value=e.announcements}catch(e){t.error(e instanceof q?e.message:`加载公告失败`)}finally{c.value=!1}}async function ne(){if(!te.value)return;d.value=!0;let e={content:p.content.trim(),font_family:p.font_family,font_size:p.font_size,font_color:p.font_color};try{f.value===null?(await I.create(e),t.success(`公告已发布`)):(await I.update(f.value,e),t.success(`公告已更新`)),g(),await _(!0),await r.load()}catch(e){t.error(e instanceof q?e.message:`保存失败`)}finally{d.value=!1}}function re(e){f.value=e.id,p.content=e.content,p.font_family=e.font_family,p.font_size=e.font_size,p.font_color=e.font_color}async function v(e){let n=e.is_active!==1;try{await I.setActive(e.id,n),t.success(n?`公告已启用`:`公告已停用`),await _(!0),await r.load()}catch(e){t.error(e instanceof q?e.message:`操作失败`)}}async function ie(e){if(await Ue({title:`删除公告`,content:`确定删除这条公告吗？删除后不可恢复。`,positiveText:`删除`}))try{await I.remove(e.id),t.success(`公告已删除`),f.value===e.id&&g(),await _(!0),await r.load()}catch(e){t.error(e instanceof q?e.message:`删除失败`)}}return u(_),(e,t)=>(l(),a(`div`,pn,[n(at,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:K(()=>[n(X(O),{size:`small`,quaternary:``,loading:c.value,onClick:t[0]||=e=>_()},{icon:K(()=>[n(X(tt),{size:15})]),default:K(()=>[t[5]||=N(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),J(`div`,mn,[J(`section`,hn,[J(`h3`,gn,[(l(),x(le(f.value===null?X(et):X(Xe)),{size:15,style:{color:`var(--primary)`}})),N(` `+b(f.value===null?`发布新公告`:`编辑公告 #${f.value}`),1)]),n(X(Ie),{label:`公告内容`,"show-feedback":!1},{default:K(()=>[n(X(Z),{value:p.content,"onUpdate:value":t[1]||=e=>p.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),J(`div`,_n,[n(X(Ie),{label:`字体`,"show-feedback":!1},{default:K(()=>[n(X(Fe),{value:p.font_family,"onUpdate:value":t[2]||=e=>p.font_family=e,options:X(m),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),n(X(Ie),{label:`字号`,"show-feedback":!1},{default:K(()=>[n(X(fn),{value:p.font_size,"onUpdate:value":t[3]||=e=>p.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),n(X(Ie),{label:`文字颜色`,"show-feedback":!1},{default:K(()=>[n(X(Qt),{value:p.font_color,"onUpdate:value":t[4]||=e=>p.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),J(`div`,vn,[J(`div`,yn,[n(X(Ye),{size:12}),t[6]||=N(` 预览 `,-1)]),J(`div`,bn,[(l(!0),a(we,null,H(h.value,e=>(l(),a(`div`,{key:e.key},[J(`div`,xn,b(e.label),1),J(`div`,{class:`rounded-[12px] border p-3`,style:Y({backgroundColor:e.paper,borderColor:e.line})},[J(`p`,{class:`whitespace-pre-wrap break-words`,style:Y([ee.value,{color:e.ink}])},b(p.content.trim()||`公告内容会显示在这里`),5)],4),e.overridden?(l(),a(`p`,Sn,` 所选颜色与`+b(e.label)+`纸面对比度不足，实际会回落到主题文字色 `,1)):o(``,!0)]))),128))])]),J(`div`,Cn,[n(X(O),{type:`primary`,class:`!font-bold shadow-[var(--glow-primary)]`,loading:d.value,disabled:!te.value,onClick:ne},{icon:K(()=>[n(X(Ze),{size:15})]),default:K(()=>[N(` `+b(f.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),f.value===null?o(``,!0):(l(),x(X(O),{key:0,quaternary:``,onClick:g},{default:K(()=>[...t[7]||=[N(`取消编辑`,-1)]]),_:1}))]),f.value===null?(l(),a(`p`,wn,` 保存后立即对所有用户生效，并自动停用上一条公告。 `)):o(``,!0)]),J(`section`,null,[t[10]||=J(`h3`,{class:`mb-3 font-heading text-[15px] font-bold`},[N(` 历史公告 `),J(`span`,{class:`tech-label ml-2 text-ink-4`},`最近 50 条`)],-1),c.value&&!s.value.length?(l(),a(`div`,Tn,[(l(),a(we,null,H(3,e=>n(X(Q),{key:e,height:`92px`,sharp:!1})),64))])):s.value.length?(l(),x(B,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[200ms] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"move-class":`transition duration-[200ms] ease-out`},{default:K(()=>[(l(!0),a(we,null,H(s.value,e=>(l(),a(`li`,{key:e.id,class:E([`panel p-3.5`,e.is_active===1&&`border-primary/40`])},[J(`div`,Dn,[J(`div`,On,[J(`p`,{class:`line-clamp-2 text-[13px]`,style:Y({fontFamily:X(rt)[e.font_family]?.css})},b(e.content),5),J(`div`,kn,[J(`span`,{class:`tech-label rounded-full px-2 py-0.5`,style:Y(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-quaternary)`})},b(e.is_active===1?`生效中`:`已停用`),5),J(`span`,An,[N(` #`+b(e.id)+` · `+b(X(rt)[e.font_family]?.label??e.font_family)+` `+b(e.font_size)+`px · `,1),J(`span`,{style:Y({color:e.font_color})},b(e.font_color),5)]),J(`span`,jn,b(e.author??`系统`)+` · `+b(X(it)(e.update_time)),1)])]),n(X(Re),{value:e.is_active===1,size:`small`,"onUpdate:value":t=>v(e)},null,8,[`value`,`onUpdate:value`])]),J(`div`,Mn,[n(X(O),{size:`tiny`,quaternary:``,onClick:t=>re(e)},{icon:K(()=>[n(X(Xe),{size:12})]),default:K(()=>[t[8]||=N(` 编辑 `,-1)]),_:1},8,[`onClick`]),n(X(O),{size:`tiny`,quaternary:``,onClick:t=>ie(e)},{icon:K(()=>[n(X(nt),{size:12})]),default:K(()=>[t[9]||=N(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(l(),a(`div`,En,[n(X(Me),{description:`还没有发布过公告`,size:`small`},{icon:K(()=>[n(X(Ze),{size:30})]),_:1})]))])])]))}});export{Nn as default};