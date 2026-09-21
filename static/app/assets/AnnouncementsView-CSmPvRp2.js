import{Dt as e,Ft as t,G as n,Gt as r,H as i,Ht as a,K as o,L as s,Lt as c,Ot as l,Q as u,Tt as d,U as f,W as p,X as m,Z as h,an as ee,at as g,dt as te,gt as ne,ht as re,m as _,mt as v,n as y,on as b,ot as x,rt as S,sn as C,wt as ie,yt as ae}from"./endpoints-BhTSb8lj.js";import{$ as oe,A as se,B as w,E as ce,G as T,Gt as E,H as le,I as D,J as ue,Jt as O,K as de,Kt as k,L as A,Q as fe,R as j,T as pe,U as M,V as N,W as me,X as he,Y as ge,Yt as P,Z as F,Zt as _e,at as I,ct as ve,ft as ye,h as be,ht as xe,it as L,k as Se,n as R,nn as z,q as B,rn as Ce,rt as we,st as V,vt as H,w as U}from"./createLucideIcon-Byg0Q1WZ.js";import{a as Te,t as W}from"./Input-hhssHGKY.js";import{c as G,l as Ee,o as K,s as q}from"./create-Jwvhc5_D.js";import{c as J,l as De,s as Y}from"./Scrollbar-Cxvob6a1.js";import{i as Oe,t as X}from"./Select-CY3A8ZRU.js";import{t as ke}from"./use-merged-state-D-29Gt4l.js";import{t as Z}from"./FormItem-CraJ2cmT.js";import{t as Ae}from"./InputNumber-D_tlgGfJ.js";import{t as je}from"./Skeleton-DLWzDi2d.js";import{t as Me}from"./Switch-CCCo72wh.js";import{t as Ne}from"./eye-DB0l_Sqd.js";import{i as Pe,n as Fe,r as Ie}from"./paper-DXMq3JrH.js";import{t as Q}from"./pencil-Dl-L1biK.js";import{t as Le}from"./plus-CalSsAlO.js";import{t as Re}from"./refresh-cw-UjOv4409.js";import{t as ze}from"./trash-Byx0zg3t.js";import{L as Be,S as Ve,U as He,a as Ue,ot as We,rt as Ge,u as Ke}from"./index-Cbuc1RP1.js";import{x as $,y as qe}from"./format-1rjnJmsR.js";import{t as Je}from"./EmptyState-C1GYtP_X.js";import{t as Ye}from"./PageHeader-B53776a2.js";var Xe=k(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[E(`>`,[k(`input`,[E(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),E(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),k(`button`,[E(`&:not(:last-child)`,`
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
 `,[E(`>`,[k(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),k(`base-selection`,[k(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),k(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),O(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),E(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[E(`>`,[k(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),k(`base-selection`,[k(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),k(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),O(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),Ze=u({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=ye(e);return ve(`-input-group`,Xe,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return v(),o(`div`,{class:L(`${e}-input-group`)},[V(()=>this.$slots.default?.())],2)}});function Qe(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function $e(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function et(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=j(M(e));if(o===1){let e=tt([r,i,a]),o=tt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=tt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=tt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function tt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function nt(e){return e=Math.round(e),e>=360?359:e<0?0:e}function rt(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var it={rgb:{hex(e){return N(j(e))},hsl(e){let[t,n,r,i]=j(e);return M([...fe(t,n,r),i])},hsv(e){let[t,n,r,i]=j(e);return T([...oe(t,n,r),i])}},hex:{rgb(e){return B(j(e))},hsl(e){let[t,n,r,i]=j(e);return M([...fe(t,n,r),i])},hsv(e){let[t,n,r,i]=j(e);return T([...oe(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=D(e);return N([...ge(t,n,r),i])},rgb(e){let[t,n,r,i]=D(e);return B([...ge(t,n,r),i])},hsv(e){let[t,n,r,i]=D(e);return T([...ue(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=A(e);return N([...F(t,n,r),i])},rgb(e){let[t,n,r,i]=A(e);return B([...F(t,n,r),i])},hsl(e){let[t,n,r,i]=A(e);return M([...he(t,n,r),i])}}};function at(e,t,n){return n||=$e(e),n?n===t?e:it[n][t](e):null}var ot=[`onMousedown`],st=`12px`,ct=12,lt=`6px`,ut=u({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=c(null);function n(n){t.value&&e.rgba&&(J(`mousemove`,document,r),J(`mouseup`,document,a),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-ct);e.onUpdateAlpha(rt(o))}function a(){Y(`mousemove`,document,r),Y(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,railBackgroundImage:i(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return v(),o(`div`,{class:L(`${e}-color-picker-slider`),ref:`railRef`,style:b({height:st,borderRadius:lt}),onMousedown:this.handleMouseDown},[f(`div`,{style:b({borderRadius:lt,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[f(`div`,{class:L(`${e}-color-picker-checkboard`)},null,2),f(`div`,{class:L(`${e}-color-picker-slider__image`),style:b({backgroundImage:this.railBackgroundImage})},null,6)],4),V(()=>this.rgba&&(v(),o(`div`,{style:b({position:`absolute`,left:lt,right:lt,top:0,bottom:0})},[f(`div`,{class:L(`${e}-color-picker-handle`),style:b({left:`calc(${this.alpha*100}% - ${lt})`,borderRadius:lt,width:st,height:st})},[f(`div`,{class:L(`${e}-color-picker-handle__fill`),style:b({backgroundColor:B(this.rgba),borderRadius:lt,width:st,height:st})},null,6)],6)],4)))],46,ot)}}),dt=xe(`n-color-picker`);function ft(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function ht(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function gt(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var _t={paddingSmall:`0 4px`},vt=u({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=c(``),{themeRef:n}=S(dt,null);d(()=>{t.value=r()});function r(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function i(e){t.value=e}function a(n){let i,a;switch(e.label){case`HEX`:a=ht(n),a&&e.onUpdateValue(n),t.value=r();break;case`H`:i=pt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`S`:case`L`:case`V`:i=mt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`A`:i=gt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`R`:case`G`:case`B`:i=ft(n),i===!1?t.value=r():e.onUpdateValue(i)}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:i}},render(){let{mergedTheme:e}=this;return v(),p(W,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:_t,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:b(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),yt=[`onClick`],bt=u({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?N:w)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?T:me)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?B:de)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?M:le)(i))}}}},render(){let{clsPrefix:e,modes:t}=this;return v(),o(`div`,{class:L(`${e}-color-picker-input`)},[f(`div`,{class:L(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:b({cursor:t.length===1?``:`pointer`})},[V(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,yt),h(Ze,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?N:w)(t)}catch{}return v(),p(vt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(v(),p(vt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),xt=[`onClick`,`onKeydown`];function St(e,t){if(t===`hsv`){let[t,n,r,i]=A(e);return B([...F(t,n,r),i])}return e}function Ct(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var wt=u({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=i(()=>e.swatches.map(e=>{let t=$e(e);return{value:e,mode:t,legalValue:St(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=Ct(r):(H(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:at(r,n,i)}function r(t){e.onUpdateColor(n(t))}function a(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:a}},render(){let{clsPrefix:e}=this;return v(),o(`div`,{class:L(`${e}-color-picker-swatches`)},[V(()=>this.parsedSwatchesRef.map(t=>(v(),o(`div`,{class:L(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[f(`div`,{class:L(`${e}-color-picker-swatch__fill`),style:b({background:t.legalValue})},null,6)],42,xt))))],2)}}),Tt=[`onClick`],Et=u({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:n}=S(dt,null);return()=>{let{hsla:r,value:i,clsPrefix:a,onClick:c,disabled:l}=e,u=t.label||n.value;return v(),o(`div`,{class:L([`${a}-color-picker`,l&&`${a}-color-picker--disabled`]),onClick:l?void 0:c},[f(`div`,{class:L(`${a}-color-picker__fill`)},[f(`div`,{class:L(`${a}-color-picker-checkboard`)},null,2),f(`div`,{style:b({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:r?M(r):``})},null,4),i&&r?(v(),o(`div`,{key:0,class:L(`${a}-color-picker__value`),style:b({color:et(r)?`white`:`black`})},[u?(v(),o(s,{key:0},[V(()=>u(i))],64)):(v(),o(s,{key:1},[V(()=>i)],64))],6)):V(()=>null)],2)],10,Tt)}}}),Dt=[`value`,`onChange`],Ot=u({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=$e(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(at(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return v(),o(`div`,{class:L(`${e}-color-picker-preview__preview`)},[f(`span`,{class:L(`${e}-color-picker-preview__fill`),style:b({background:this.color||`#000000`})},null,6),f(`input`,{class:L(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Dt)],2)}}),kt=[`onMousedown`],At=`12px`,jt=12,Mt=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=u({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=c(null);function n(e){t.value&&(J(`mousemove`,document,r),J(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=nt((n.clientX-a-Nt)/(i-jt)*360);e.onUpdateHue(o)}function i(){Y(`mousemove`,document,r),Y(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return v(),o(`div`,{class:L(`${e}-color-picker-slider`),style:b({height:At,borderRadius:Mt})},[f(`div`,{ref:`railRef`,style:b({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:At,borderRadius:Mt,position:`relative`}),onMousedown:this.handleMouseDown},[f(`div`,{style:b({position:`absolute`,left:Mt,right:Mt,top:0,bottom:0})},[f(`div`,{class:L(`${e}-color-picker-handle`),style:b({left:`calc((${this.hue}%) / 359 * 100 - ${Mt})`,borderRadius:Mt,width:At,height:At})},[f(`div`,{class:L(`${e}-color-picker-handle__fill`),style:b({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Mt,width:At,height:At})},null,6)],6)],4)],44,kt)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=u({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=c(null);function n(e){t.value&&(J(`mousemove`,document,r),J(`mouseup`,document,a),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function a(){Y(`mousemove`,document,r),Y(`mouseup`,document,a),e.onComplete?.()}return{palleteRef:t,handleColor:i(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:e}=this;return v(),o(`div`,{class:L(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[f(`div`,{class:L(`${e}-color-picker-pallete__layer`),style:b({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),f(`div`,{class:L(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),V(()=>this.rgba&&(v(),o(`div`,{class:L(`${e}-color-picker-handle`),style:b({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[f(`div`,{class:L(`${e}-color-picker-handle__fill`),style:b({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=E([k(`color-picker-panel`,`
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
 `,[He(),k(`input`,`
 text-align: center;
 `)]),k(`color-picker-checkboard`,`
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
 `)]),k(`color-picker-slider`,`
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
 `)]),k(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[O(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),k(`color-picker-pallete`,`
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
 `,[P(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),k(`color-picker-preview`,`
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
 `)]),k(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[k(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),O(`mode`,`
 width: 72px;
 text-align: center;
 `)]),k(`color-picker-control`,`
 padding: 12px;
 `),k(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[k(`button`,`margin-left: 8px;`)]),k(`color-picker`,`
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
 `,[P(`disabled`,`cursor: not-allowed`),O(`value`,`
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
 `),k(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[E(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),k(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[k(`color-picker-swatch`,`
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
 `)])])])])]),Vt={...Se.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Ee.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=u({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(e,{slots:t}){let n=null;function r(e){n=e}let l=null,{mergedClsPrefixRef:u,namespaceRef:m,inlineThemeDisabled:h,mergedComponentPropsRef:ee}=ye(e),g=be(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:ee?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:te,mergedDisabledRef:ne}=g,{localeRef:_}=Te(`global`),y=Se(`ColorPicker`,`-color-picker`,Bt,Be,e,u);re(dt,{themeRef:y,renderLabelRef:a(e,`renderLabel`),colorPickerSlots:t});let S=c(e.defaultShow),C=ke(a(e,`show`),S);function ae(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&pe(n,t),r&&pe(r,t),S.value=t}let{defaultValue:E}=e,O=c(E===void 0?Qe(e.modes,e.showAlpha):E),k=ke(a(e,`value`),O),P=c([k.value]),I=c(0),ve=i(()=>$e(k.value)),{modes:xe}=e,z=c($e(k.value)||xe[0]||`rgb`);function Ce(){let{modes:t}=e,{value:n}=z,r=t.findIndex(e=>e===n);~r?z.value=t[(r+1)%t.length]:z.value=`rgb`}let H,U,W,G,K,q,J,Y,Oe=i(()=>{let{value:e}=k;if(!e)return null;switch(ve.value){case`hsv`:return A(e);case`hsl`:return[H,U,W,Y]=D(e),[...ue(H,U,W),Y];case`rgb`:case`hex`:return[K,q,J,Y]=j(e),[...oe(K,q,J),Y]}}),X=i(()=>{let{value:e}=k;if(!e)return null;switch(ve.value){case`rgb`:case`hex`:return j(e);case`hsv`:return[H,U,G,Y]=A(e),[...F(H,U,G),Y];case`hsl`:return[H,U,W,Y]=D(e),[...ge(H,U,W),Y]}}),Z=i(()=>{let{value:e}=k;if(!e)return null;switch(ve.value){case`hsl`:return D(e);case`hsv`:return[H,U,G,Y]=A(e),[...he(H,U,G),Y];case`rgb`:case`hex`:return[K,q,J,Y]=j(e),[...fe(K,q,J),Y]}}),Ae=i(()=>{switch(z.value){case`rgb`:case`hex`:return X.value;case`hsv`:return Oe.value;case`hsl`:return Z.value}}),je=c(0),Me=c(1),Ne=c([0,0]);function Pe(t,n){let{value:r}=Oe,i=je.value,a=r?r[3]:1;Ne.value=[t,n];let{showAlpha:o}=e;switch(z.value){case`hsv`:Q((o?T:me)([i,t,n,a]),`cursor`);break;case`hsl`:Q((o?M:le)([...he(i,t,n),a]),`cursor`);break;case`rgb`:Q((o?B:de)([...F(i,t,n),a]),`cursor`);break;case`hex`:Q((o?N:w)([...F(i,t,n),a]),`cursor`)}}function Fe(t){je.value=t;let{value:n}=Oe;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=e;switch(z.value){case`hsv`:Q((o?T:me)([t,r,i,a]),`cursor`);break;case`rgb`:Q((o?B:de)([...F(t,r,i),a]),`cursor`);break;case`hex`:Q((o?N:w)([...F(t,r,i),a]),`cursor`);break;case`hsl`:Q((o?M:le)([...he(t,r,i),a]),`cursor`)}}function Ie(e){switch(z.value){case`hsv`:[H,U,G]=Oe.value,Q(T([H,U,G,e]),`cursor`);break;case`rgb`:[K,q,J]=X.value,Q(B([K,q,J,e]),`cursor`);break;case`hex`:[K,q,J]=X.value,Q(N([K,q,J,e]),`cursor`);break;case`hsl`:[H,U,W]=Z.value,Q(M([H,U,W,e]),`cursor`)}Me.value=e}function Q(t,n){l=n===`cursor`?t:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=g,{onUpdateValue:a,"onUpdate:value":o}=e;a&&pe(a,t),o&&pe(o,t),r(),i(),O.value=t}function Le(e){Q(e,`input`),x(Re)}function Re(t=!0){let{value:n}=k;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=g,{onComplete:a}=e;a&&a(n);let{value:o}=P,{value:s}=I;t&&(o.splice(s+1,o.length,n),I.value=s+1),r(),i()}}function ze(){let{value:e}=I;e-1<0||(Q(P.value[e-1],`input`),Re(!1),I.value=e-1)}function Ve(){let{value:e}=I;e<0||e+1>=P.value.length||(Q(P.value[e+1],`input`),Re(!1),I.value=e+1)}function He(){Q(null,`input`);let{onClear:t}=e;t&&t(),ae(!1)}function Ue(){let{value:t}=k,{onConfirm:n}=e;n&&n(t),ae(!1)}let We=i(()=>I.value>=1),Ge=i(()=>{let{value:e}=P;return e.length>1&&I.value<e.length-1});ie(C,e=>{e||(P.value=[k.value],I.value=0)}),d(()=>{if(!(l&&l===k.value)){let{value:e}=Oe;e&&(je.value=e[0],Me.value=e[3],Ne.value=[e[1],e[2]])}l=null});let Ke=i(()=>{let{value:e}=te,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[_e(`height`,e)]:l,[_e(`fontSize`,e)]:u}}=y.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),$=h?se(`color-picker`,i(()=>te.value[0]),Ke,e):void 0;function qe(){let{value:n}=X,{value:r}=je,{internalActions:i,modes:a,actions:c}=e,{value:l}=y,{value:d}=u;return(()=>{let u=we(`550d4636453f407b`);return v(),o(`div`,{class:L([`${d}-color-picker-panel`,$?.themeClass.value]),onDragstart:u[0]||=e=>{e.preventDefault()},style:b(h?void 0:Ke.value)},[f(`div`,{class:L(`${d}-color-picker-control`)},[(v(),p(zt,{clsPrefix:d,rgba:n,displayedHue:r,displayedSv:Ne.value,onUpdateSV:Pe,onComplete:Re},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),f(`div`,{class:L(`${d}-color-picker-preview`)},[f(`div`,{class:L(`${d}-color-picker-preview__sliders`)},[(v(),p(Ft,{clsPrefix:d,hue:r,onUpdateHue:Fe,onComplete:Re},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),e.showAlpha?(v(),p(ut,{key:0,clsPrefix:d,rgba:n,alpha:Me.value,onUpdateAlpha:Ie,onComplete:Re},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):V(()=>null)],2),e.showPreview?(v(),p(Ot,{key:0,clsPrefix:d,mode:z.value,color:X.value&&w(X.value),onUpdateColor:u[1]||=e=>{Q(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):V(()=>null)],2),(v(),p(bt,{clsPrefix:d,showAlpha:e.showAlpha,mode:z.value,modes:a,onUpdateMode:Ce,value:k.value,valueArr:Ae.value,onUpdateValue:Le},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),V(()=>e.swatches?.length&&(()=>{let t=we(`1de0b88852ebf5cb`);return v(),p(wt,{clsPrefix:d,mode:z.value,swatches:e.swatches,onUpdateColor:t[0]||=e=>{Q(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),c?.length?(v(),o(`div`,{key:0,class:L(`${d}-color-picker-action`)},[V(()=>c.includes(`confirm`)&&(v(),p(R,{size:`small`,onClick:Ue,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>_.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),V(()=>c.includes(`clear`)&&(v(),p(R,{size:`small`,onClick:He,disabled:!k.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>_.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):V(()=>null),t.action?(v(),o(`div`,{key:2,class:L(`${d}-color-picker-action`)},[V(()=>t.action?.())],2)):(v(),o(s,{key:3},[i?(v(),o(`div`,{key:0,class:L(`${d}-color-picker-action`)},[V(()=>i.includes(`undo`)&&(v(),p(R,{size:`small`,onClick:ze,disabled:!We.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>_.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),V(()=>i.includes(`redo`)&&(v(),p(R,{size:`small`,onClick:Ve,disabled:!Ge.value,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button},{default:()=>_.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):V(()=>null)],64))],38)})()}return{mergedClsPrefix:u,namespace:m,hsla:Z,rgba:X,mergedShow:C,mergedDisabled:ne,isMounted:ce(),adjustedTo:Ee(e),mergedValue:k,handleTriggerClick(){ne.value||ae(!0)},setTriggerRef:r,handleClickOutside(e){if(n instanceof Element){if(n.contains(De(e)))return}else if(n&&n.$el.contains(De(e)))return;ae(!1)},renderPanel:qe,cssVars:h?void 0:Ke,themeClass:$?.themeClass,onRender:$?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),v(),p(G,null,{default:()=>[(v(),p(q,null,{default:()=>{let t=g(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=Oe([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),U(this.$slots.trigger,We(t,[`value`,`onClick`,`ref`]),n=>n||(v(),p(Et,g(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(v(),p(K,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Ee.tdkey,to:this.adjustedTo},{_:1,default:I(()=>(v(),p(z,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:I(()=>this.mergedShow?l(this.renderPanel(),[[Ge,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},Qt={key:0,class:`mt-1 text-xs text-ink-3`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-xs text-ink-3`},tn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},nn={key:0,class:`flex flex-col gap-2`},rn={key:1,class:`panel grid place-items-center py-12`},an={class:`flex items-start justify-between gap-3`},on={class:`min-w-0 flex-1`},sn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},cn={class:`tnum text-xs text-ink-3`},ln={class:`text-xs text-ink-3`},un={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},dn=u({__name:`AnnouncementsView`,setup(a){let l=Ve(),u=Ie(),d=c([]),g=c(!0),re=c(!1),x=c(null),S=t({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ie=Object.keys($).map(e=>({label:$[e].label,value:e})),oe=i(()=>({fontFamily:$[S.font_family].css,fontSize:`${S.font_size}px`})),se=i(()=>[`light`,`dark`].map(e=>{let t=Fe()[e],n=Ue(t.paper,S.font_color,S.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:S.font_color,overridden:n}})),w=i(()=>S.content.trim().length>0&&!re.value);function ce(){x.value=null,S.content=``,S.font_family=`system`,S.font_size=15,S.font_color=`#1f2328`}async function T(e=!1){e||(g.value=!0);try{let e=await y.list();d.value=e.announcements}catch(e){l.error(e instanceof _?e.message:`加载公告失败`)}finally{g.value=!1}}async function E(){if(!w.value)return;re.value=!0;let e={content:S.content.trim(),font_family:S.font_family,font_size:S.font_size,font_color:S.font_color};try{x.value===null?(await y.create(e),l.success(`公告已发布`)):(await y.update(x.value,e),l.success(`公告已更新`)),ce(),await T(!0),await u.load()}catch(e){l.error(e instanceof _?e.message:`保存失败`)}finally{re.value=!1}}function le(e){x.value=e.id,S.content=e.content,S.font_family=e.font_family,S.font_size=e.font_size,S.font_color=e.font_color}async function D(e){let t=e.is_active!==1;try{await y.setActive(e.id,t),l.success(t?`公告已启用`:`公告已停用`),await T(!0),await u.load()}catch(e){l.error(e instanceof _?e.message:`操作失败`)}}async function ue(e){if(await Ke({title:`删除公告`,content:`这条公告会被删除，不可恢复。`,positiveText:`删除`}))try{await y.remove(e.id),l.success(`公告已删除`),x.value===e.id&&ce(),await T(!0),await u.load()}catch(e){l.error(e instanceof _?e.message:`删除失败`)}}return te(T),(t,i)=>(v(),o(`div`,Ut,[h(Ye,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:e(()=>[h(r(R),{size:`small`,quaternary:``,loading:g.value,onClick:i[0]||=e=>T()},{icon:e(()=>[h(r(Re),{size:15})]),default:e(()=>[i[5]||=m(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),f(`div`,Wt,[f(`section`,Gt,[f(`h3`,Kt,[(v(),p(ae(x.value===null?r(Le):r(Q)),{size:15,style:{color:`var(--accent-text)`}})),m(` `+C(x.value===null?`发布新公告`:`编辑公告 #${x.value}`),1)]),h(r(Z),{label:`公告内容`,"show-feedback":!1},{default:e(()=>[h(r(W),{value:S.content,"onUpdate:value":i[1]||=e=>S.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),f(`div`,qt,[h(r(Z),{label:`字体`,"show-feedback":!1},{default:e(()=>[h(r(X),{value:S.font_family,"onUpdate:value":i[2]||=e=>S.font_family=e,options:r(ie),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),h(r(Z),{label:`字号`,"show-feedback":!1},{default:e(()=>[h(r(Ae),{value:S.font_size,"onUpdate:value":i[3]||=e=>S.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),h(r(Z),{label:`文字颜色`,"show-feedback":!1},{default:e(()=>[h(r(Ht),{value:S.font_color,"onUpdate:value":i[4]||=e=>S.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),f(`div`,Jt,[f(`div`,Yt,[h(r(Ne),{size:12}),i[6]||=m(` 预览 `,-1)]),f(`div`,Xt,[(v(!0),o(s,null,ne(se.value,e=>(v(),o(`div`,{key:e.key},[f(`div`,Zt,C(e.label),1),f(`div`,{class:`border p-3`,style:b({backgroundColor:e.paper,borderColor:e.line})},[f(`p`,{class:`whitespace-pre-wrap break-words`,style:b([oe.value,{color:e.ink}])},C(S.content.trim()||`公告内容会显示在这里`),5)],4),e.overridden?(v(),o(`p`,Qt,` 对比度不足 · 会回落到主题文字色 `)):n(``,!0)]))),128))])]),f(`div`,$t,[h(r(R),{type:`primary`,class:`!font-bold`,loading:re.value,disabled:!w.value,onClick:E},{icon:e(()=>[h(r(Pe),{size:15})]),default:e(()=>[m(` `+C(x.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),x.value===null?n(``,!0):(v(),p(r(R),{key:0,quaternary:``,onClick:ce},{default:e(()=>[...i[7]||=[m(`取消编辑`,-1)]]),_:1}))]),x.value===null?(v(),o(`p`,en,` 保存后立即生效，并停用上一条公告。 `)):n(``,!0)]),f(`section`,tn,[i[10]||=f(`h3`,{class:`mb-3 font-heading text-base font-bold`},[m(` 历史公告 `),f(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),g.value&&!d.value.length?(v(),o(`div`,nn,[(v(),o(s,null,ne(3,e=>h(r(je),{key:e,height:`92px`,sharp:!1})),64))])):d.value.length?(v(),p(Ce,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:e(()=>[(v(!0),o(s,null,ne(d.value,t=>(v(),o(`li`,{key:t.id,class:ee([`panel p-3.5`,t.is_active===1&&`border-[var(--accent-tint-border)]`])},[f(`div`,an,[f(`div`,on,[f(`p`,{class:`line-clamp-2 text-sm`,style:b({fontFamily:r($)[t.font_family]?.css})},C(t.content),5),f(`div`,sn,[f(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:b(t.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},C(t.is_active===1?`生效中`:`已停用`),5),f(`span`,cn,[m(` #`+C(t.id)+` · `+C(r($)[t.font_family]?.label??t.font_family)+` `+C(t.font_size)+`px · `,1),f(`span`,{style:b({color:t.font_color})},C(t.font_color),5)]),f(`span`,ln,C(t.author??`系统`)+` · `+C(r(qe)(t.update_time)),1)])]),h(r(Me),{round:!1,value:t.is_active===1,size:`small`,"onUpdate:value":e=>D(t)},null,8,[`value`,`onUpdate:value`])]),f(`div`,un,[h(r(R),{size:`tiny`,quaternary:``,onClick:e=>le(t)},{icon:e(()=>[h(r(Q),{size:12})]),default:e(()=>[i[8]||=m(` 编辑 `,-1)]),_:1},8,[`onClick`]),h(r(R),{size:`tiny`,quaternary:``,onClick:e=>ue(t)},{icon:e(()=>[h(r(ze),{size:12})]),default:e(()=>[i[9]||=m(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(v(),o(`div`,rn,[h(Je,{code:`00 / NO NOTICE`,title:`还没有发布过公告`,hint:`左侧写完保存，就会出现在这里`},{icon:e(()=>[h(r(Pe),{size:28})]),_:1})]))])])]))}});export{dn as default};