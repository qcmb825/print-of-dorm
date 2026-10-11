import{Ct as e,J as t,K as n,Kt as r,Mt as i,Ot as a,V as o,Vt as s,X as c,Y as l,Yt as u,bt as d,dn as f,et as p,ht as ee,jt as m,kt as te,ln as ne,lt as h,m as re,nt as g,q as _,r as v,st as y,tt as b,un as x,ut as S,v as C,vt as w,yt as ie,zt as ae}from"./endpoints-BlW_rAxP.js";import{$ as oe,A as se,B as ce,E as le,G as T,Gt as E,H as ue,I as D,J as de,Jt as O,K as k,Kt as A,L as j,Q as fe,R as M,T as pe,U as N,V as P,W as me,X as he,Y as ge,Yt as F,Z as I,Zt as _e,at as ve,ct as ye,ft as be,h as xe,ht as L,it as R,k as Se,n as z,nn as Ce,q as B,rn as V,rt as we,st as H,t as U,vt as W,w as Te}from"./createLucideIcon-LFURxWOJ.js";import{a as Ee,t as G}from"./Input-2jMJ52T3.js";import{c as K,l as De,o as q,s as J}from"./create-vIGd5KlH.js";import{i as Oe,t as Y}from"./Select-CLU1Y82N.js";import{t as ke}from"./use-merged-state-DlIAPIKW.js";import{t as X}from"./FormItem-xTwkZsBr.js";import{t as Ae}from"./InputNumber-DOjWUsD-.js";import{t as je}from"./Skeleton-DjkyZ8N1.js";import{t as Me}from"./Switch-DadRfBE7.js";import{t as Ne}from"./eye-BOWYb79B.js";import{i as Pe,n as Fe,r as Ie}from"./paper-qhM8XEUa.js";import{t as Z}from"./pencil-CYAFh3ay.js";import{t as Le}from"./plus-CLEaJGqe.js";import{t as Re}from"./refresh-cw-Cy4CLgDj.js";import{t as ze}from"./trash-MLf0118c.js";import{Dt as Be,L as Ve,S as He,U as Ue,_t as Q,a as We,ft as Ge,st as Ke,u as qe,vt as Je}from"./index-D1aJUrAR.js";import{x as Ye,y as Xe}from"./format-1rjnJmsR.js";import{t as Ze}from"./EmptyState-CcpMtycu.js";import{t as Qe}from"./PageHeader-BJCLBmjs.js";var $e=A(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[E(`>`,[A(`input`,[E(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),E(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),A(`button`,[E(`&:not(:last-child)`,`
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
 `,[E(`>`,[A(`input`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),A(`base-selection`,[A(`base-selection-label`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),A(`base-selection-tags`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),O(`box-shadow, border, state-border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),E(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[E(`>`,[A(`input`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),A(`base-selection`,[A(`base-selection-label`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),A(`base-selection-tags`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),O(`box-shadow, border, state-border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),et=g({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=be(e);return ye(`-input-group`,$e,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return w(),c(`div`,{class:R(`${e}-input-group`)},[H(()=>this.$slots.default?.())],2)}});function tt(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function nt(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function rt(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=M(N(e));if(o===1){let e=it([r,i,a]),o=it(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=it([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=it(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function it(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function at(e){return e=Math.round(e),e>=360?359:e<0?0:e}function ot(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var st={rgb:{hex(e){return P(M(e))},hsl(e){let[t,n,r,i]=M(e);return N([...fe(t,n,r),i])},hsv(e){let[t,n,r,i]=M(e);return T([...oe(t,n,r),i])}},hex:{rgb(e){return B(M(e))},hsl(e){let[t,n,r,i]=M(e);return N([...fe(t,n,r),i])},hsv(e){let[t,n,r,i]=M(e);return T([...oe(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=D(e);return P([...ge(t,n,r),i])},rgb(e){let[t,n,r,i]=D(e);return B([...ge(t,n,r),i])},hsv(e){let[t,n,r,i]=D(e);return T([...de(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=j(e);return P([...I(t,n,r),i])},rgb(e){let[t,n,r,i]=j(e);return B([...I(t,n,r),i])},hsl(e){let[t,n,r,i]=j(e);return N([...he(t,n,r),i])}}};function ct(e,t,n){return n||=nt(e),n?n===t?e:st[n][t](e):null}var lt=[`onMousedown`],ut=`12px`,dt=12,ft=`6px`,pt=g({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=s(null);function r(n){t.value&&e.rgba&&(Je(`mousemove`,document,i),Je(`mouseup`,document,a),i(n))}function i(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-dt);e.onUpdateAlpha(ot(o))}function a(){Q(`mousemove`,document,i),Q(`mouseup`,document,a),e.onComplete?.()}return{railRef:t,railBackgroundImage:n(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:r}},render(){let{clsPrefix:e}=this;return w(),c(`div`,{class:R(`${e}-color-picker-slider`),ref:`railRef`,style:x({height:ut,borderRadius:ft}),onMousedown:this.handleMouseDown},[_(`div`,{style:x({borderRadius:ft,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[_(`div`,{class:R(`${e}-color-picker-checkboard`)},null,2),_(`div`,{class:R(`${e}-color-picker-slider__image`),style:x({backgroundImage:this.railBackgroundImage})},null,6)],4),H(()=>this.rgba&&(w(),c(`div`,{style:x({position:`absolute`,left:ft,right:ft,top:0,bottom:0})},[_(`div`,{class:R(`${e}-color-picker-handle`),style:x({left:`calc(${this.alpha*100}% - ${ft})`,borderRadius:ft,width:ut,height:ut})},[_(`div`,{class:R(`${e}-color-picker-handle__fill`),style:x({backgroundColor:B(this.rgba),borderRadius:ft,width:ut,height:ut})},null,6)],6)],4)))],46,lt)}}),mt=L(`n-color-picker`);function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function gt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function _t(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function vt(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function yt(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var bt={paddingSmall:`0 4px`},xt=g({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=s(``),{themeRef:n}=y(mt,null);te(()=>{t.value=r()});function r(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function i(e){t.value=e}function a(n){let i,a;switch(e.label){case`HEX`:a=vt(n),a&&e.onUpdateValue(n),t.value=r();break;case`H`:i=gt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`S`:case`L`:case`V`:i=_t(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`A`:i=yt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`R`:case`G`:case`B`:i=ht(n),i===!1?t.value=r():e.onUpdateValue(i)}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:i}},render(){let{mergedTheme:e}=this;return w(),t(G,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:bt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:x(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),St=[`onClick`],Ct=g({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?P:ce)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?T:me)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?B:k)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?N:ue)(i))}}}},render(){let{clsPrefix:e,modes:n}=this;return w(),c(`div`,{class:R(`${e}-color-picker-input`)},[_(`div`,{class:R(`${e}-color-picker-input__mode`),onClick:this.onUpdateMode,style:x({cursor:n.length===1?``:`pointer`})},[H(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,St),b(et,null,{default:()=>{let{mode:e,valueArr:n,showAlpha:r}=this;if(e===`hex`){let e=null;try{e=n===null?null:(r?P:ce)(n)}catch{}return w(),t(xt,{key:1,label:`HEX`,showAlpha:r,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(r?`a`:``)).split(``).map((e,r)=>(w(),t(xt,{label:e.toUpperCase(),value:n===null?null:n[r],onUpdateValue:e=>{this.handleUnitUpdateValue(r,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),wt=[`onClick`,`onKeydown`];function Tt(e,t){if(t===`hsv`){let[t,n,r,i]=j(e);return B([...I(t,n,r),i])}return e}function Et(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Dt=g({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=n(()=>e.swatches.map(e=>{let t=nt(e);return{value:e,mode:t,legalValue:Tt(e,t)}}));function r(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=Et(r):(W(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:ct(r,n,i)}function i(t){e.onUpdateColor(r(t))}function a(e,t){e.key===`Enter`&&i(t)}return{parsedSwatchesRef:t,handleSwatchSelect:i,handleSwatchKeyDown:a}},render(){let{clsPrefix:e}=this;return w(),c(`div`,{class:R(`${e}-color-picker-swatches`)},[H(()=>this.parsedSwatchesRef.map(t=>(w(),c(`div`,{class:R(`${e}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:e=>{this.handleSwatchKeyDown(e,t)}},[_(`div`,{class:R(`${e}-color-picker-swatch__fill`),style:x({background:t.legalValue})},null,6)],42,wt))))],2)}}),Ot=[`onClick`],kt=g({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){let{colorPickerSlots:t,renderLabelRef:n}=y(mt,null);return()=>{let{hsla:r,value:i,clsPrefix:a,onClick:s,disabled:l}=e,u=t.label||n.value;return w(),c(`div`,{class:R([`${a}-color-picker`,l&&`${a}-color-picker--disabled`]),onClick:l?void 0:s},[_(`div`,{class:R(`${a}-color-picker__fill`)},[_(`div`,{class:R(`${a}-color-picker-checkboard`)},null,2),_(`div`,{style:x({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:r?N(r):``})},null,4),i&&r?(w(),c(`div`,{key:0,class:R(`${a}-color-picker__value`),style:x({color:rt(r)?`white`:`black`})},[u?(w(),c(o,{key:0},[H(()=>u(i))],64)):(w(),c(o,{key:1},[H(()=>i)],64))],6)):H(()=>null)],2)],10,Ot)}}}),At=[`value`,`onChange`],jt=g({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=nt(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(ct(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:e}=this;return w(),c(`div`,{class:R(`${e}-color-picker-preview__preview`)},[_(`span`,{class:R(`${e}-color-picker-preview__fill`),style:x({background:this.color||`#000000`})},null,6),_(`input`,{class:R(`${e}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,At)],2)}}),Mt=[`onMousedown`],Nt=`12px`,Pt=12,$=`6px`,Ft=6,It=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Lt=g({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=s(null);function n(e){t.value&&(Je(`mousemove`,document,r),Je(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=at((n.clientX-a-Ft)/(i-Pt)*360);e.onUpdateHue(o)}function i(){Q(`mousemove`,document,r),Q(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:e}=this;return w(),c(`div`,{class:R(`${e}-color-picker-slider`),style:x({height:Nt,borderRadius:$})},[_(`div`,{ref:`railRef`,style:x({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:It,height:Nt,borderRadius:$,position:`relative`}),onMousedown:this.handleMouseDown},[_(`div`,{style:x({position:`absolute`,left:$,right:$,top:0,bottom:0})},[_(`div`,{class:R(`${e}-color-picker-handle`),style:x({left:`calc((${this.hue}%) / 359 * 100 - ${$})`,borderRadius:$,width:Nt,height:Nt})},[_(`div`,{class:R(`${e}-color-picker-handle__fill`),style:x({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:$,width:Nt,height:Nt})},null,6)],6)],4)],44,Mt)],6)}}),Rt=[`onMousedown`],zt=`12px`,Bt=`6px`,Vt=g({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=s(null);function r(e){t.value&&(Je(`mousemove`,document,i),Je(`mouseup`,document,a),i(e))}function i(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function a(){Q(`mousemove`,document,i),Q(`mouseup`,document,a),e.onComplete?.()}return{palleteRef:t,handleColor:n(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:r}},render(){let{clsPrefix:e}=this;return w(),c(`div`,{class:R(`${e}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[_(`div`,{class:R(`${e}-color-picker-pallete__layer`),style:x({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),_(`div`,{class:R(`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),H(()=>this.rgba&&(w(),c(`div`,{class:R(`${e}-color-picker-handle`),style:x({width:zt,height:zt,borderRadius:Bt,left:`calc(${this.displayedSv[0]}% - ${Bt})`,bottom:`calc(${this.displayedSv[1]}% - ${Bt})`})},[_(`div`,{class:R(`${e}-color-picker-handle__fill`),style:x({backgroundColor:this.handleColor,borderRadius:Bt,width:zt,height:zt})},null,6)],6)))],42,Rt)}}),Ht=E([A(`color-picker-panel`,`
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
 `,[Ue(),A(`input`,`
 text-align: center;
 `)]),A(`color-picker-checkboard`,`
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
 `)]),A(`color-picker-slider`,`
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
 `)]),A(`color-picker-handle`,`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[O(`fill`,`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),A(`color-picker-pallete`,`
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
 `,[F(`shadowed`,`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),A(`color-picker-preview`,`
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
 `)]),A(`color-picker-input`,`
 display: flex;
 align-items: center;
 `,[A(`input`,`
 flex-grow: 1;
 flex-basis: 0;
 `),O(`mode`,`
 width: 72px;
 text-align: center;
 `)]),A(`color-picker-control`,`
 padding: 12px;
 `),A(`color-picker-action`,`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[A(`button`,`margin-left: 8px;`)]),A(`color-picker`,`
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
 `,[F(`disabled`,`cursor: not-allowed`),O(`value`,`
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
 `),A(`color-picker-checkboard`,`
 border-radius: var(--n-border-radius);
 `,[E(`&::after`,`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),A(`color-picker-swatches`,`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[A(`color-picker-swatch`,`
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
 `)])])])])]),Ut={...Se.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:De.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Wt=g({name:`ColorPicker`,inheritAttrs:!1,props:Ut,slots:Object,setup(e,{slots:i}){let l=null;function u(e){l=e}let d=null,{mergedClsPrefixRef:f,namespaceRef:p,inlineThemeDisabled:ee,mergedComponentPropsRef:m}=be(e),ne=xe(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:m?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:h,mergedDisabledRef:re}=ne,{localeRef:g}=Ee(`global`),v=Se(`ColorPicker`,`-color-picker`,Ht,Ve,e,f);ie(mt,{themeRef:v,renderLabelRef:r(e,`renderLabel`),colorPickerSlots:i});let y=s(e.defaultShow),b=ke(r(e,`show`),y);function C(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&pe(n,t),r&&pe(r,t),y.value=t}let{defaultValue:ae}=e,E=s(ae===void 0?tt(e.modes,e.showAlpha):ae),O=ke(r(e,`value`),E),A=s([O.value]),F=s(0),ve=n(()=>nt(O.value)),{modes:ye}=e,L=s(nt(O.value)||ye[0]||`rgb`);function Ce(){let{modes:t}=e,{value:n}=L,r=t.findIndex(e=>e===n);~r?L.value=t[(r+1)%t.length]:L.value=`rgb`}let V,U,W,Te,G,K,q,J,Oe=n(()=>{let{value:e}=O;if(!e)return null;switch(ve.value){case`hsv`:return j(e);case`hsl`:return[V,U,W,J]=D(e),[...de(V,U,W),J];case`rgb`:case`hex`:return[G,K,q,J]=M(e),[...oe(G,K,q),J]}}),Y=n(()=>{let{value:e}=O;if(!e)return null;switch(ve.value){case`rgb`:case`hex`:return M(e);case`hsv`:return[V,U,Te,J]=j(e),[...I(V,U,Te),J];case`hsl`:return[V,U,W,J]=D(e),[...ge(V,U,W),J]}}),X=n(()=>{let{value:e}=O;if(!e)return null;switch(ve.value){case`hsl`:return D(e);case`hsv`:return[V,U,Te,J]=j(e),[...he(V,U,Te),J];case`rgb`:case`hex`:return[G,K,q,J]=M(e),[...fe(G,K,q),J]}}),Ae=n(()=>{switch(L.value){case`rgb`:case`hex`:return Y.value;case`hsv`:return Oe.value;case`hsl`:return X.value}}),je=s(0),Me=s(1),Ne=s([0,0]);function Pe(t,n){let{value:r}=Oe,i=je.value,a=r?r[3]:1;Ne.value=[t,n];let{showAlpha:o}=e;switch(L.value){case`hsv`:Z((o?T:me)([i,t,n,a]),`cursor`);break;case`hsl`:Z((o?N:ue)([...he(i,t,n),a]),`cursor`);break;case`rgb`:Z((o?B:k)([...I(i,t,n),a]),`cursor`);break;case`hex`:Z((o?P:ce)([...I(i,t,n),a]),`cursor`)}}function Fe(t){je.value=t;let{value:n}=Oe;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=e;switch(L.value){case`hsv`:Z((o?T:me)([t,r,i,a]),`cursor`);break;case`rgb`:Z((o?B:k)([...I(t,r,i),a]),`cursor`);break;case`hex`:Z((o?P:ce)([...I(t,r,i),a]),`cursor`);break;case`hsl`:Z((o?N:ue)([...he(t,r,i),a]),`cursor`)}}function Ie(e){switch(L.value){case`hsv`:[V,U,Te]=Oe.value,Z(T([V,U,Te,e]),`cursor`);break;case`rgb`:[G,K,q]=Y.value,Z(B([G,K,q,e]),`cursor`);break;case`hex`:[G,K,q]=Y.value,Z(P([G,K,q,e]),`cursor`);break;case`hsl`:[V,U,W]=X.value,Z(N([V,U,W,e]),`cursor`)}Me.value=e}function Z(t,n){d=n===`cursor`?t:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=ne,{onUpdateValue:a,"onUpdate:value":o}=e;a&&pe(a,t),o&&pe(o,t),r(),i(),E.value=t}function Le(e){Z(e,`input`),S(Re)}function Re(t=!0){let{value:n}=O;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=ne,{onComplete:a}=e;a&&a(n);let{value:o}=A,{value:s}=F;t&&(o.splice(s+1,o.length,n),F.value=s+1),r(),i()}}function ze(){let{value:e}=F;e-1<0||(Z(A.value[e-1],`input`),Re(!1),F.value=e-1)}function He(){let{value:e}=F;e<0||e+1>=A.value.length||(Z(A.value[e+1],`input`),Re(!1),F.value=e+1)}function Ue(){Z(null,`input`);let{onClear:t}=e;t&&t(),C(!1)}function Q(){let{value:t}=O,{onConfirm:n}=e;n&&n(t),C(!1)}let We=n(()=>F.value>=1),Ge=n(()=>{let{value:e}=A;return e.length>1&&F.value<e.length-1});a(b,e=>{e||(A.value=[O.value],F.value=0)}),te(()=>{if(!(d&&d===O.value)){let{value:e}=Oe;e&&(je.value=e[0],Me.value=e[3],Ne.value=[e[1],e[2]])}d=null});let Ke=n(()=>{let{value:e}=h,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[_e(`height`,e)]:l,[_e(`fontSize`,e)]:u}}=v.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),qe=ee?se(`color-picker`,n(()=>h.value[0]),Ke,e):void 0;function Je(){let{value:n}=Y,{value:r}=je,{internalActions:a,modes:s,actions:l}=e,{value:u}=v,{value:d}=f;return(()=>{let f=we(`550d4636453f407b`);return w(),c(`div`,{class:R([`${d}-color-picker-panel`,qe?.themeClass.value]),onDragstart:f[0]||=e=>{e.preventDefault()},style:x(ee?void 0:Ke.value)},[_(`div`,{class:R(`${d}-color-picker-control`)},[(w(),t(Vt,{clsPrefix:d,rgba:n,displayedHue:r,displayedSv:Ne.value,onUpdateSV:Pe,onComplete:Re},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),_(`div`,{class:R(`${d}-color-picker-preview`)},[_(`div`,{class:R(`${d}-color-picker-preview__sliders`)},[(w(),t(Lt,{clsPrefix:d,hue:r,onUpdateHue:Fe,onComplete:Re},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),e.showAlpha?(w(),t(pt,{key:0,clsPrefix:d,rgba:n,alpha:Me.value,onUpdateAlpha:Ie,onComplete:Re},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):H(()=>null)],2),e.showPreview?(w(),t(jt,{key:0,clsPrefix:d,mode:L.value,color:Y.value&&ce(Y.value),onUpdateColor:f[1]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):H(()=>null)],2),(w(),t(Ct,{clsPrefix:d,showAlpha:e.showAlpha,mode:L.value,modes:s,onUpdateMode:Ce,value:O.value,valueArr:Ae.value,onUpdateValue:Le},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),H(()=>e.swatches?.length&&(()=>{let n=we(`1de0b88852ebf5cb`);return w(),t(Dt,{clsPrefix:d,mode:L.value,swatches:e.swatches,onUpdateColor:n[0]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),l?.length?(w(),c(`div`,{key:0,class:R(`${d}-color-picker-action`)},[H(()=>l.includes(`confirm`)&&(w(),t(z,{size:`small`,onClick:Q,theme:u.peers.Button,themeOverrides:u.peerOverrides.Button},{default:()=>g.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),H(()=>l.includes(`clear`)&&(w(),t(z,{size:`small`,onClick:Ue,disabled:!O.value,theme:u.peers.Button,themeOverrides:u.peerOverrides.Button},{default:()=>g.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):H(()=>null),i.action?(w(),c(`div`,{key:2,class:R(`${d}-color-picker-action`)},[H(()=>i.action?.())],2)):(w(),c(o,{key:3},[a?(w(),c(`div`,{key:0,class:R(`${d}-color-picker-action`)},[H(()=>a.includes(`undo`)&&(w(),t(z,{size:`small`,onClick:ze,disabled:!We.value,theme:u.peers.Button,themeOverrides:u.peerOverrides.Button},{default:()=>g.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),H(()=>a.includes(`redo`)&&(w(),t(z,{size:`small`,onClick:He,disabled:!Ge.value,theme:u.peers.Button,themeOverrides:u.peerOverrides.Button},{default:()=>g.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):H(()=>null)],64))],38)})()}return{mergedClsPrefix:f,namespace:p,hsla:X,rgba:Y,mergedShow:b,mergedDisabled:re,isMounted:le(),adjustedTo:De(e),mergedValue:O,handleTriggerClick(){re.value||C(!0)},setTriggerRef:u,handleClickOutside(e){if(l instanceof Element){if(l.contains(Be(e)))return}else if(l&&l.$el.contains(Be(e)))return;C(!1)},renderPanel:Je,cssVars:ee?void 0:Ke,themeClass:qe?.themeClass,onRender:qe?.onRender}},render(){let{mergedClsPrefix:e,onRender:n}=this;return n?.(),w(),t(K,null,{default:()=>[(w(),t(J,null,{default:()=>{let n=h(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return n.onClick=Oe([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),Te(this.$slots.trigger,Ge(n,[`value`,`onClick`,`ref`]),r=>r||(w(),t(kt,h(n,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(w(),t(q,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===De.tdkey,to:this.adjustedTo},{_:1,default:ve(()=>(w(),t(Ce,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:ve(()=>this.mergedShow?i(this.renderPanel(),[[Ke,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Gt=U({name:`map-pin`,size:24,node:[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]}),Kt={class:`mx-auto max-w-[1400px]`},qt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Jt={class:`panel h-fit p-4`},Yt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},Xt={class:`grid grid-cols-2 gap-3`},Zt={class:`mb-3`},Qt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs`},$t={class:`grid gap-2 sm:grid-cols-2`},en={class:`tech-label mb-1 text-ink-3 tech-label--cn text-xs`},tn={key:0,class:`mt-1 text-xs text-ink-3`},nn={class:`flex items-center gap-2`},rn={key:0,class:`mt-3 text-xs text-ink-3`},an={class:`panel h-fit p-4`},on={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},sn={class:`mt-3 flex items-center gap-2`},cn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},ln={key:0,class:`flex flex-col gap-2`},un={key:1,class:`panel grid place-items-center py-12`},dn={class:`flex items-start justify-between gap-3`},fn={class:`min-w-0 flex-1`},pn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},mn={class:`tnum text-xs text-ink-3`},hn={class:`text-xs text-ink-3`},gn={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},_n=g({__name:`AnnouncementsView`,setup(r){let i=He(),a=Ie(),te=s([]),h=s(!0),g=s(!1),y=s(null),S=ae({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ie=Object.keys(Ye).map(e=>({label:Ye[e].label,value:e})),oe=n(()=>({fontFamily:Ye[S.font_family].css,fontSize:`${S.font_size}px`})),se=n(()=>[`light`,`dark`].map(e=>{let t=Fe()[e],n=We(t.paper,S.font_color,S.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:S.font_color,overridden:n}})),ce=n(()=>S.content.trim().length>0&&!g.value);function le(){y.value=null,S.content=``,S.font_family=`system`,S.font_size=15,S.font_color=`#1f2328`}async function T(e=!1){e||(h.value=!0);try{let e=await v.list();te.value=e.announcements}catch(e){i.error(e instanceof C?e.message:`公告读取失败`)}finally{h.value=!1}}async function E(){if(!ce.value)return;g.value=!0;let e={content:S.content.trim(),font_family:S.font_family,font_size:S.font_size,font_color:S.font_color};try{y.value===null?(await v.create(e),i.success(`公告已发布 · 旧公告已停用`)):(await v.update(y.value,e),i.success(`公告已更新`)),le(),await T(!0),await a.load()}catch(e){i.error(e instanceof C?e.message:`保存未生效`)}finally{g.value=!1}}function ue(e){y.value=e.id,S.content=e.content,S.font_family=e.font_family,S.font_size=e.font_size,S.font_color=e.font_color}async function D(e){let t=e.is_active!==1;try{await v.setActive(e.id,t),i.success(t?`公告已启用 · 学生端可见`:`公告已停用 · 学生端不再显示`),await T(!0),await a.load()}catch(e){i.error(e instanceof C?e.message:t?`启用未完成 · 稍后重试`:`停用未完成 · 稍后重试`)}}async function de(e){if(await qe({title:`删除公告`,content:`公告将被删除，不可撤销。`,positiveText:`删除`}))try{await v.remove(e.id),i.success(`公告已删除`),y.value===e.id&&le(),await T(!0),await a.load()}catch(e){i.error(e instanceof C?e.message:`删除未生效`)}}let O=ae({pickup_place:``,pickup_hours:``}),k=s(!1),A=s(!1);async function j(){try{let e=await re.get();O.pickup_place=e.pickup_place??``,O.pickup_hours=e.pickup_hours??``,A.value=!0}catch(e){i.error(e instanceof C?e.message:`取件信息读取失败`)}}async function fe(){if(!k.value){k.value=!0;try{await re.save({pickup_place:O.pickup_place.trim()||null,pickup_hours:O.pickup_hours.trim()||null}),i.success(`取件信息已保存 · 学生端可取件卡片与取件邮件同步生效`),await j()}catch(e){i.error(e instanceof C?e.message:`保存未生效`)}finally{k.value=!1}}}return ee(()=>{T(),j()}),(n,r)=>(w(),c(`div`,Kt,[b(Qe,{title:`公告管理`,subtitle:`单条生效 · 发布新公告将停用旧公告`},{actions:m(()=>[b(u(z),{size:`small`,quaternary:``,loading:h.value,onClick:r[0]||=e=>T()},{icon:m(()=>[b(u(Re),{size:15})]),default:m(()=>[r[7]||=p(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),_(`div`,qt,[_(`section`,Jt,[_(`h3`,Yt,[(w(),t(e(y.value===null?u(Le):u(Z)),{size:15,style:{color:`var(--accent-text)`}})),p(` `+f(y.value===null?`发布新公告`:`编辑公告 #${y.value}`),1)]),b(u(X),{label:`公告内容`,"show-feedback":!1},{default:m(()=>[b(u(G),{value:S.content,"onUpdate:value":r[1]||=e=>S.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),_(`div`,Xt,[b(u(X),{label:`字体`,"show-feedback":!1},{default:m(()=>[b(u(Y),{value:S.font_family,"onUpdate:value":r[2]||=e=>S.font_family=e,options:u(ie),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),b(u(X),{label:`字号`,"show-feedback":!1},{default:m(()=>[b(u(Ae),{value:S.font_size,"onUpdate:value":r[3]||=e=>S.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),b(u(X),{label:`文字颜色`,"show-feedback":!1},{default:m(()=>[b(u(Wt),{value:S.font_color,"onUpdate:value":r[4]||=e=>S.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),_(`div`,Zt,[_(`div`,Qt,[b(u(Ne),{size:12}),r[8]||=p(` 预览 `,-1)]),_(`div`,$t,[(w(!0),c(o,null,d(se.value,e=>(w(),c(`div`,{key:e.key},[_(`div`,en,f(e.label),1),_(`div`,{class:`border p-3`,style:x({backgroundColor:e.paper,borderColor:e.line})},[_(`p`,{class:`whitespace-pre-wrap break-words`,style:x([oe.value,{color:e.ink}])},f(S.content.trim()||`公告内容将在此预览`),5)],4),e.overridden?(w(),c(`p`,tn,` 对比度不足 · 已回退至主题文字色 `)):l(``,!0)]))),128))])]),_(`div`,nn,[b(u(z),{type:`primary`,class:`!font-bold`,loading:g.value,disabled:!ce.value,onClick:E},{icon:m(()=>[b(u(Pe),{size:15})]),default:m(()=>[p(` `+f(y.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),y.value===null?l(``,!0):(w(),t(u(z),{key:0,quaternary:``,onClick:le},{default:m(()=>[...r[9]||=[p(`取消编辑`,-1)]]),_:1}))]),y.value===null?(w(),c(`p`,rn,` 发布后立即生效 · 上一条公告同时停用。 `)):l(``,!0)]),_(`section`,an,[_(`h3`,on,[b(u(Gt),{size:15,style:{color:`var(--accent-text)`}}),r[10]||=p(` 取件信息 `,-1)]),b(u(X),{label:`取件地点`,"show-feedback":!1},{default:m(()=>[b(u(G),{value:O.pickup_place,"onUpdate:value":r[5]||=e=>O.pickup_place=e,maxlength:120,"show-count":``,disabled:!A.value,placeholder:`例：3 号楼宿管室`},null,8,[`value`,`disabled`])]),_:1}),b(u(X),{label:`取件时间`,"show-feedback":!1},{default:m(()=>[b(u(G),{value:O.pickup_hours,"onUpdate:value":r[6]||=e=>O.pickup_hours=e,maxlength:120,"show-count":``,disabled:!A.value,placeholder:`例：8:00–22:00`},null,8,[`value`,`disabled`])]),_:1}),_(`div`,sn,[b(u(z),{type:`primary`,class:`!font-bold`,size:`small`,loading:k.value,disabled:!A.value,onClick:fe},{default:m(()=>[...r[11]||=[p(` 保存取件信息 `,-1)]]),_:1},8,[`loading`,`disabled`])]),r[12]||=_(`p`,{class:`mt-3 text-xs text-ink-3`},` 学生端的可取件卡片与取件邮件都会显示这两项 · 留空则不显示。 `,-1)]),_(`section`,cn,[r[15]||=_(`h3`,{class:`mb-3 font-heading text-base font-bold`},[p(` 历史公告 `),_(`span`,{class:`tech-label ml-2 text-ink-3 tech-label--cn text-xs`},`最近 50 条`)],-1),h.value&&!te.value.length?(w(),c(`div`,ln,[(w(),c(o,null,d(3,e=>b(u(je),{key:e,height:`92px`,sharp:!1})),64))])):te.value.length?(w(),t(V,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:m(()=>[(w(!0),c(o,null,d(te.value,e=>(w(),c(`li`,{key:e.id,class:ne([`panel p-3.5`,e.is_active===1&&`border-[var(--accent-tint-border)]`])},[_(`div`,dn,[_(`div`,fn,[_(`p`,{class:`line-clamp-2 text-sm`,style:x({fontFamily:u(Ye)[e.font_family]?.css})},f(e.content),5),_(`div`,pn,[_(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:x(e.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-tertiary)`})},f(e.is_active===1?`生效中`:`已停用`),5),_(`span`,mn,[p(` #`+f(e.id)+` · `+f(u(Ye)[e.font_family]?.label??e.font_family)+` `+f(e.font_size)+`px · `,1),_(`span`,{style:x({color:e.font_color})},f(e.font_color),5)]),_(`span`,hn,f(e.author??`系统`)+` · `+f(u(Xe)(e.update_time)),1)])]),b(u(Me),{round:!1,value:e.is_active===1,size:`small`,"onUpdate:value":t=>D(e)},null,8,[`value`,`onUpdate:value`])]),_(`div`,gn,[b(u(z),{size:`tiny`,quaternary:``,onClick:t=>ue(e)},{icon:m(()=>[b(u(Z),{size:12})]),default:m(()=>[r[13]||=p(` 编辑 `,-1)]),_:1},8,[`onClick`]),b(u(z),{size:`tiny`,quaternary:``,onClick:t=>de(e)},{icon:m(()=>[b(u(ze),{size:12})]),default:m(()=>[r[14]||=p(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(w(),c(`div`,un,[b(Ze,{code:`00 / NO NOTICE`,title:`暂无公告记录`,hint:`发布后在此列示`},{icon:m(()=>[b(u(Pe),{size:28})]),_:1})]))])])]))}});export{_n as default};