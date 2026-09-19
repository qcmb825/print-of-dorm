import{B as e,H as t,Ht as n,J as r,Mt as i,P as a,Pt as o,St as s,Tt as c,U as l,V as u,Y as d,ct as f,dt as p,et as m,f as h,ft as ee,gt as te,in as g,n as _,nn as ne,nt as v,pt as re,q as y,rn as b,rt as x,wt as S,xt as C,z as w,zt as ie}from"./endpoints-C3DHQTsP.js";import{$ as ae,A as oe,B as T,E as se,G as E,Gt as D,H as ce,I as le,J as ue,Jt as O,K as de,Kt as k,L as A,Q as fe,R as j,T as pe,U as M,V as N,W as me,X as he,Y as ge,Yt as P,Z as F,Zt as _e,at as I,ct as ve,ft as ye,h as be,ht as xe,it as L,k as Se,n as R,nn as z,q as B,rn as Ce,rt as we,st as V,vt as H,w as U}from"./createLucideIcon-9CEg89u7.js";import{a as Te,t as W}from"./Input-zRLlhDJR.js";import{c as G,l as Ee,o as K,s as q}from"./create-DeLYkSpx.js";import{c as J,l as De,s as Y}from"./Scrollbar-DPOED4HB.js";import{i as Oe,t as X}from"./Select-L_psc69K.js";import{t as ke}from"./use-merged-state-BQRj4oql.js";import{t as Ae}from"./FormItem-C34ytQqn.js";import{t as je}from"./InputNumber-UIrKPxdw.js";import{t as Me}from"./Skeleton-Ck2EQlCg.js";import{t as Ne}from"./Switch-CBIicj_T.js";import{t as Pe}from"./eye-CxFGIeLt.js";import{i as Fe,n as Ie,r as Le}from"./paper-Dy5UIvwU.js";import{t as Z}from"./pencil-D32UpEZz.js";import{t as Re}from"./plus-C9OeIB_c.js";import{t as ze}from"./refresh-cw-BvDE-4lm.js";import{t as Be}from"./trash-BQM7BT9S.js";import{F as Ve,S as He,V as Ue,a as We,it as Ge,tt as Ke,u as qe}from"./index-BdS56EoY.js";import{x as Q,y as Je}from"./format-DMiwIsNr.js";import{t as Ye}from"./EmptyState-CYZADLSH.js";import{t as Xe}from"./PageHeader-yE9c2LZp.js";var Ze=k(`input-group`,`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[D(`>`,[k(`input`,[D(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),D(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),k(`button`,[D(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[O(`state-border, border`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),D(`&:not(:first-child)`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[O(`state-border, border`,`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),D(`*`,[D(`&:not(:last-child)`,`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[D(`>`,[k(`input`,`
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
 `)])])]),D(`&:not(:first-child)`,`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[D(`>`,[k(`input`,`
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
 `)])])])])])]),Qe=d({name:`InputGroup`,props:{},setup(e){let{mergedClsPrefixRef:t}=ye(e);return ve(`-input-group`,Ze,t),{mergedClsPrefix:t}},render(){let{mergedClsPrefix:e}=this;return p(),l(`div`,{class:L(`${e}-input-group`)},[V(()=>this.$slots.default?.())],2)}});function $e(e,t){switch(e[0]){case`hex`:return t?`#000000FF`:`#000000`;case`rgb`:return t?`rgba(0, 0, 0, 1)`:`rgb(0, 0, 0)`;case`hsl`:return t?`hsla(0, 0%, 0%, 1)`:`hsl(0, 0%, 0%)`;case`hsv`:return t?`hsva(0, 0%, 0%, 1)`:`hsv(0, 0%, 0%)`}return`#000000`}function et(e){return e===null?null:/^ *#/.test(e)?`hex`:e.includes(`rgb`)?`rgb`:e.includes(`hsl`)?`hsl`:e.includes(`hsv`)?`hsv`:null}function tt(e,t=[255,255,255],n=`AA`){let[r,i,a,o]=j(M(e));if(o===1){let e=nt([r,i,a]),o=nt(t);return(Math.max(e,o)+.05)/(Math.min(e,o)+.05)>=(n===`AA`?4.5:7)}let s=nt([Math.round(r*o+t[0]*(1-o)),Math.round(i*o+t[1]*(1-o)),Math.round(a*o+t[2]*(1-o))]),c=nt(t);return(Math.max(s,c)+.05)/(Math.min(s,c)+.05)>=(n===`AA`?4.5:7)}function nt(e){let[t,n,r]=e.map(e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4));return .2126*t+.7152*n+.0722*r}function rt(e){return e=Math.round(e),e>=360?359:e<0?0:e}function it(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}var at={rgb:{hex(e){return N(j(e))},hsl(e){let[t,n,r,i]=j(e);return M([...fe(t,n,r),i])},hsv(e){let[t,n,r,i]=j(e);return E([...ae(t,n,r),i])}},hex:{rgb(e){return B(j(e))},hsl(e){let[t,n,r,i]=j(e);return M([...fe(t,n,r),i])},hsv(e){let[t,n,r,i]=j(e);return E([...ae(t,n,r),i])}},hsl:{hex(e){let[t,n,r,i]=le(e);return N([...ge(t,n,r),i])},rgb(e){let[t,n,r,i]=le(e);return B([...ge(t,n,r),i])},hsv(e){let[t,n,r,i]=le(e);return E([...ue(t,n,r),i])}},hsv:{hex(e){let[t,n,r,i]=A(e);return N([...F(t,n,r),i])},rgb(e){let[t,n,r,i]=A(e);return B([...F(t,n,r),i])},hsl(e){let[t,n,r,i]=A(e);return M([...he(t,n,r),i])}}};function ot(e,t,n){return n||=et(e),n?n===t?e:at[n][t](e):null}var st=[`onMousedown`],ct=`12px`,lt=12,ut=`6px`,dt=d({name:`AlphaSlider`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(n){t.value&&e.rgba&&(J(`mousemove`,document,r),J(`mouseup`,document,i),r(n))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=(n.clientX-a)/(i-lt);e.onUpdateAlpha(it(o))}function i(){Y(`mousemove`,document,r),Y(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,railBackgroundImage:w(()=>{let{rgba:t}=e;return t?`linear-gradient(to right, rgba(${t[0]}, ${t[1]}, ${t[2]}, 0) 0%, rgba(${t[0]}, ${t[1]}, ${t[2]}, 1) 100%)`:``}),handleMouseDown:n}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:L(`${t}-color-picker-slider`),ref:`railRef`,style:b({height:ct,borderRadius:ut}),onMousedown:this.handleMouseDown},[e(`div`,{style:b({borderRadius:ut,position:`absolute`,left:0,right:0,top:0,bottom:0,overflow:`hidden`})},[e(`div`,{class:L(`${t}-color-picker-checkboard`)},null,2),e(`div`,{class:L(`${t}-color-picker-slider__image`),style:b({backgroundImage:this.railBackgroundImage})},null,6)],4),V(()=>this.rgba&&(p(),l(`div`,{style:b({position:`absolute`,left:ut,right:ut,top:0,bottom:0})},[e(`div`,{class:L(`${t}-color-picker-handle`),style:b({left:`calc(${this.alpha*100}% - ${ut})`,borderRadius:ut,width:ct,height:ct})},[e(`div`,{class:L(`${t}-color-picker-handle__fill`),style:b({backgroundColor:B(this.rgba),borderRadius:ut,width:ct,height:ct})},null,6)],6)],4)))],46,st)}}),ft=xe(`n-color-picker`);function pt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),255)):!1}function mt(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),360)):!1}function ht(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e),100)):!1}function gt(e){let t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function _t(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(Number.parseInt(e)/100,100)):!1}var vt={paddingSmall:`0 4px`},yt=d({name:`ColorInputUnit`,props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){let t=o(``),{themeRef:n}=m(ft,null);s(()=>{t.value=r()});function r(){let{value:t}=e;if(t===null)return``;let{label:n}=e;return n===`HEX`?t:n===`A`?`${Math.floor(t*100)}%`:String(Math.floor(t))}function i(e){t.value=e}function a(n){let i,a;switch(e.label){case`HEX`:a=gt(n),a&&e.onUpdateValue(n),t.value=r();break;case`H`:i=mt(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`S`:case`L`:case`V`:i=ht(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`A`:i=_t(n),i===!1?t.value=r():e.onUpdateValue(i);break;case`R`:case`G`:case`B`:i=pt(n),i===!1?t.value=r():e.onUpdateValue(i)}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:i}},render(){let{mergedTheme:e}=this;return p(),u(W,{size:`small`,placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:vt,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:b(this.label===`A`?`flex-grow: 1.25;`:``)},null,8,[`placeholder`,`theme`,`themeOverrides`,`builtinThemeOverrides`,`value`,`onUpdateValue`,`onChange`,`style`])}}),bt=[`onClick`],xt=d({name:`ColorInput`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){let{showAlpha:r}=e;if(e.mode===`hex`){e.onUpdateValue((r?N:T)(n));return}let i;switch(i=e.valueArr===null?[0,0,0,0]:Array.from(e.valueArr),e.mode){case`hsv`:i[t]=n,e.onUpdateValue((r?E:me)(i));break;case`rgb`:i[t]=n,e.onUpdateValue((r?B:de)(i));break;case`hsl`:i[t]=n,e.onUpdateValue((r?M:ce)(i))}}}},render(){let{clsPrefix:t,modes:n}=this;return p(),l(`div`,{class:L(`${t}-color-picker-input`)},[e(`div`,{class:L(`${t}-color-picker-input__mode`),onClick:this.onUpdateMode,style:b({cursor:n.length===1?``:`pointer`})},[V(()=>this.mode.toUpperCase()+(this.showAlpha?`A`:``))],14,bt),r(Qe,null,{default:()=>{let{mode:e,valueArr:t,showAlpha:n}=this;if(e===`hex`){let e=null;try{e=t===null?null:(n?N:T)(t)}catch{}return p(),u(yt,{key:1,label:`HEX`,showAlpha:n,value:e,onUpdateValue:e=>{this.handleUnitUpdateValue(0,e)}},null,8,[`showAlpha`,`value`,`onUpdateValue`])}return(e+(n?`a`:``)).split(``).map((e,n)=>(p(),u(yt,{label:e.toUpperCase(),value:t===null?null:t[n],onUpdateValue:e=>{this.handleUnitUpdateValue(n,e)}},null,8,[`label`,`value`,`onUpdateValue`])))}},1024)],2)}}),St=[`onClick`,`onKeydown`];function Ct(e,t){if(t===`hsv`){let[t,n,r,i]=A(e);return B([...F(t,n,r),i])}return e}function wt(e){let t=document.createElement(`canvas`).getContext(`2d`);return t?(t.fillStyle=e,t.fillStyle):`#000000`}var Tt=d({name:`ColorPickerSwatches`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){let t=w(()=>e.swatches.map(e=>{let t=et(e);return{value:e,mode:t,legalValue:Ct(e,t)}}));function n(t){let{mode:n}=e,{value:r,mode:i}=t;return i||(i=`hex`,/^[a-zA-Z]+$/.test(r)?r=wt(r):(H(`color-picker`,`color ${r} in swatches is invalid.`),r=`#000000`)),i===n?r:ot(r,n,i)}function r(t){e.onUpdateColor(n(t))}function i(e,t){e.key===`Enter`&&r(t)}return{parsedSwatchesRef:t,handleSwatchSelect:r,handleSwatchKeyDown:i}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:L(`${t}-color-picker-swatches`)},[V(()=>this.parsedSwatchesRef.map(n=>(p(),l(`div`,{class:L(`${t}-color-picker-swatch`),tabindex:0,onClick:()=>{this.handleSwatchSelect(n)},onKeydown:e=>{this.handleSwatchKeyDown(e,n)}},[e(`div`,{class:L(`${t}-color-picker-swatch__fill`),style:b({background:n.legalValue})},null,6)],42,St))))],2)}}),Et=[`onClick`],Dt=d({name:`ColorPickerTrigger`,slots:Object,props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(t){let{colorPickerSlots:n,renderLabelRef:r}=m(ft,null);return()=>{let{hsla:i,value:o,clsPrefix:s,onClick:c,disabled:u}=t,d=n.label||r.value;return p(),l(`div`,{class:L([`${s}-color-picker`,u&&`${s}-color-picker--disabled`]),onClick:u?void 0:c},[e(`div`,{class:L(`${s}-color-picker__fill`)},[e(`div`,{class:L(`${s}-color-picker-checkboard`)},null,2),e(`div`,{style:b({position:`absolute`,left:0,right:0,top:0,bottom:0,backgroundColor:i?M(i):``})},null,4),o&&i?(p(),l(`div`,{key:0,class:L(`${s}-color-picker__value`),style:b({color:tt(i)?`white`:`black`})},[d?(p(),l(a,{key:0},[V(()=>d(o))],64)):(p(),l(a,{key:1},[V(()=>o)],64))],6)):V(()=>null)],2)],10,Et)}}}),Ot=[`value`,`onChange`],kt=d({name:`ColorPreview`,props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{let t=et(e);return!!(!e||t&&t!==`hsv`)}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(t){let n=t.target.value;e.onUpdateColor?.(ot(n.toUpperCase(),e.mode,`hex`)),t.stopPropagation()}return{handleChange:t}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:L(`${t}-color-picker-preview__preview`)},[e(`span`,{class:L(`${t}-color-picker-preview__fill`),style:b({background:this.color||`#000000`})},null,6),e(`input`,{class:L(`${t}-color-picker-preview__input`),type:`color`,value:this.color,onChange:this.handleChange},null,42,Ot)],2)}}),At=[`onMousedown`],jt=`12px`,Mt=12,$=`6px`,Nt=6,Pt=`linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)`,Ft=d({name:`HueSlider`,props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(e){t.value&&(J(`mousemove`,document,r),J(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,left:a}=r.getBoundingClientRect(),o=rt((n.clientX-a-Nt)/(i-Mt)*360);e.onUpdateHue(o)}function i(){Y(`mousemove`,document,r),Y(`mouseup`,document,i),e.onComplete?.()}return{railRef:t,handleMouseDown:n}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:L(`${t}-color-picker-slider`),style:b({height:jt,borderRadius:$})},[e(`div`,{ref:`railRef`,style:b({boxShadow:`inset 0 0 2px 0 rgba(0, 0, 0, .24)`,boxSizing:`border-box`,backgroundImage:Pt,height:jt,borderRadius:$,position:`relative`}),onMousedown:this.handleMouseDown},[e(`div`,{style:b({position:`absolute`,left:$,right:$,top:0,bottom:0})},[e(`div`,{class:L(`${t}-color-picker-handle`),style:b({left:`calc((${this.hue}%) / 359 * 100 - ${$})`,borderRadius:$,width:jt,height:jt})},[e(`div`,{class:L(`${t}-color-picker-handle__fill`),style:b({backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:$,width:jt,height:jt})},null,6)],6)],4)],44,At)],6)}}),It=[`onMousedown`],Lt=`12px`,Rt=`6px`,zt=d({name:`Pallete`,props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){let t=o(null);function n(e){t.value&&(J(`mousemove`,document,r),J(`mouseup`,document,i),r(e))}function r(n){let{value:r}=t;if(!r)return;let{width:i,height:a,left:o,bottom:s}=r.getBoundingClientRect(),c=(s-n.clientY)/a,l=(n.clientX-o)/i,u=100*(l>1?1:l<0?0:l),d=100*(c>1?1:c<0?0:c);e.onUpdateSV(u,d)}function i(){Y(`mousemove`,document,r),Y(`mouseup`,document,i),e.onComplete?.()}return{palleteRef:t,handleColor:w(()=>{let{rgba:t}=e;return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:``}),handleMouseDown:n}},render(){let{clsPrefix:t}=this;return p(),l(`div`,{class:L(`${t}-color-picker-pallete`),onMousedown:this.handleMouseDown,ref:`palleteRef`},[e(`div`,{class:L(`${t}-color-picker-pallete__layer`),style:b({backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`})},null,6),e(`div`,{class:L(`${t}-color-picker-pallete__layer ${t}-color-picker-pallete__layer--shadowed`),style:{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))`}},null,2),V(()=>this.rgba&&(p(),l(`div`,{class:L(`${t}-color-picker-handle`),style:b({width:Lt,height:Lt,borderRadius:Rt,left:`calc(${this.displayedSv[0]}% - ${Rt})`,bottom:`calc(${this.displayedSv[1]}% - ${Rt})`})},[e(`div`,{class:L(`${t}-color-picker-handle__fill`),style:b({backgroundColor:this.handleColor,borderRadius:Rt,width:Lt,height:Lt})},null,6)],6)))],42,It)}}),Bt=D([k(`color-picker-panel`,`
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
 `,[Ue(),k(`input`,`
 text-align: center;
 `)]),k(`color-picker-checkboard`,`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[D(`&::after`,`
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
 `),D(`&::after`,`
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
 `,[D(`&::after`,`
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
 `),D(`&:focus`,`
 outline: none;
 `,[O(`fill`,[D(`&::after`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Vt={...Se.props,value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>[`rgb`,`hex`,`hsl`]},placement:{type:String,default:`bottom-start`},to:Ee.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,onClear:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]},Ht=d({name:`ColorPicker`,inheritAttrs:!1,props:Vt,slots:Object,setup(t,{slots:n}){let r=null;function i(e){r=e}let c=null,{mergedClsPrefixRef:d,namespaceRef:f,inlineThemeDisabled:m,mergedComponentPropsRef:h}=ye(t),te=be(t,{mergedSize:e=>{let{size:n}=t;if(n)return n;let{mergedSize:r}=e||{};return r?.value?r.value:h?.value?.ColorPicker?.size||`medium`}}),{mergedSizeRef:g,mergedDisabledRef:_}=te,{localeRef:ne}=Te(`global`),v=Se(`ColorPicker`,`-color-picker`,Bt,Ve,t,d);ee(ft,{themeRef:v,renderLabelRef:ie(t,`renderLabel`),colorPickerSlots:n});let re=o(t.defaultShow),y=ke(ie(t,`show`),re);function S(e){let{onUpdateShow:n,"onUpdate:show":r}=t;n&&pe(n,e),r&&pe(r,e),re.value=e}let{defaultValue:D}=t,O=o(D===void 0?$e(t.modes,t.showAlpha):D),k=ke(ie(t,`value`),O),P=o([k.value]),I=o(0),ve=w(()=>et(k.value)),{modes:xe}=t,z=o(et(k.value)||xe[0]||`rgb`);function Ce(){let{modes:e}=t,{value:n}=z,r=e.findIndex(e=>e===n);~r?z.value=e[(r+1)%e.length]:z.value=`rgb`}let H,U,W,G,K,q,J,Y,Oe=w(()=>{let{value:e}=k;if(!e)return null;switch(ve.value){case`hsv`:return A(e);case`hsl`:return[H,U,W,Y]=le(e),[...ue(H,U,W),Y];case`rgb`:case`hex`:return[K,q,J,Y]=j(e),[...ae(K,q,J),Y]}}),X=w(()=>{let{value:e}=k;if(!e)return null;switch(ve.value){case`rgb`:case`hex`:return j(e);case`hsv`:return[H,U,G,Y]=A(e),[...F(H,U,G),Y];case`hsl`:return[H,U,W,Y]=le(e),[...ge(H,U,W),Y]}}),Ae=w(()=>{let{value:e}=k;if(!e)return null;switch(ve.value){case`hsl`:return le(e);case`hsv`:return[H,U,G,Y]=A(e),[...he(H,U,G),Y];case`rgb`:case`hex`:return[K,q,J,Y]=j(e),[...fe(K,q,J),Y]}}),je=w(()=>{switch(z.value){case`rgb`:case`hex`:return X.value;case`hsv`:return Oe.value;case`hsl`:return Ae.value}}),Me=o(0),Ne=o(1),Pe=o([0,0]);function Fe(e,n){let{value:r}=Oe,i=Me.value,a=r?r[3]:1;Pe.value=[e,n];let{showAlpha:o}=t;switch(z.value){case`hsv`:Z((o?E:me)([i,e,n,a]),`cursor`);break;case`hsl`:Z((o?M:ce)([...he(i,e,n),a]),`cursor`);break;case`rgb`:Z((o?B:de)([...F(i,e,n),a]),`cursor`);break;case`hex`:Z((o?N:T)([...F(i,e,n),a]),`cursor`)}}function Ie(e){Me.value=e;let{value:n}=Oe;if(!n)return;let[,r,i,a]=n,{showAlpha:o}=t;switch(z.value){case`hsv`:Z((o?E:me)([e,r,i,a]),`cursor`);break;case`rgb`:Z((o?B:de)([...F(e,r,i),a]),`cursor`);break;case`hex`:Z((o?N:T)([...F(e,r,i),a]),`cursor`);break;case`hsl`:Z((o?M:ce)([...he(e,r,i),a]),`cursor`)}}function Le(e){switch(z.value){case`hsv`:[H,U,G]=Oe.value,Z(E([H,U,G,e]),`cursor`);break;case`rgb`:[K,q,J]=X.value,Z(B([K,q,J,e]),`cursor`);break;case`hex`:[K,q,J]=X.value,Z(N([K,q,J,e]),`cursor`);break;case`hsl`:[H,U,W]=Ae.value,Z(M([H,U,W,e]),`cursor`)}Ne.value=e}function Z(e,n){c=n===`cursor`?e:null;let{nTriggerFormChange:r,nTriggerFormInput:i}=te,{onUpdateValue:a,"onUpdate:value":o}=t;a&&pe(a,e),o&&pe(o,e),r(),i(),O.value=e}function Re(e){Z(e,`input`),x(ze)}function ze(e=!0){let{value:n}=k;if(n){let{nTriggerFormChange:r,nTriggerFormInput:i}=te,{onComplete:a}=t;a&&a(n);let{value:o}=P,{value:s}=I;e&&(o.splice(s+1,o.length,n),I.value=s+1),r(),i()}}function Be(){let{value:e}=I;e-1<0||(Z(P.value[e-1],`input`),ze(!1),I.value=e-1)}function He(){let{value:e}=I;e<0||e+1>=P.value.length||(Z(P.value[e+1],`input`),ze(!1),I.value=e+1)}function Ue(){Z(null,`input`);let{onClear:e}=t;e&&e(),S(!1)}function We(){let{value:e}=k,{onConfirm:n}=t;n&&n(e),S(!1)}let Ge=w(()=>I.value>=1),Ke=w(()=>{let{value:e}=P;return e.length>1&&I.value<e.length-1});C(y,e=>{e||(P.value=[k.value],I.value=0)}),s(()=>{if(!(c&&c===k.value)){let{value:e}=Oe;e&&(Me.value=e[0],Ne.value=e[3],Pe.value=[e[1],e[2]])}c=null});let qe=w(()=>{let{value:e}=g,{common:{cubicBezierEaseInOut:t},self:{textColor:n,color:r,panelFontSize:i,boxShadow:a,border:o,borderRadius:s,dividerColor:c,[_e(`height`,e)]:l,[_e(`fontSize`,e)]:u}}=v.value;return{"--n-bezier":t,"--n-text-color":n,"--n-color":r,"--n-panel-font-size":i,"--n-font-size":u,"--n-box-shadow":a,"--n-border":o,"--n-border-radius":s,"--n-height":l,"--n-divider-color":c}}),Q=m?oe(`color-picker`,w(()=>g.value[0]),qe,t):void 0;function Je(){let{value:r}=X,{value:i}=Me,{internalActions:o,modes:s,actions:c}=t,{value:f}=v,{value:h}=d;return(()=>{let d=we(`550d4636453f407b`);return p(),l(`div`,{class:L([`${h}-color-picker-panel`,Q?.themeClass.value]),onDragstart:d[0]||=e=>{e.preventDefault()},style:b(m?void 0:qe.value)},[e(`div`,{class:L(`${h}-color-picker-control`)},[(p(),u(zt,{clsPrefix:h,rgba:r,displayedHue:i,displayedSv:Pe.value,onUpdateSV:Fe,onComplete:ze},null,8,[`clsPrefix`,`rgba`,`displayedHue`,`displayedSv`,`onUpdateSV`,`onComplete`])),e(`div`,{class:L(`${h}-color-picker-preview`)},[e(`div`,{class:L(`${h}-color-picker-preview__sliders`)},[(p(),u(Ft,{clsPrefix:h,hue:i,onUpdateHue:Ie,onComplete:ze},null,8,[`clsPrefix`,`hue`,`onUpdateHue`,`onComplete`])),t.showAlpha?(p(),u(dt,{key:0,clsPrefix:h,rgba:r,alpha:Ne.value,onUpdateAlpha:Le,onComplete:ze},null,8,[`clsPrefix`,`rgba`,`alpha`,`onUpdateAlpha`,`onComplete`])):V(()=>null)],2),t.showPreview?(p(),u(kt,{key:0,clsPrefix:h,mode:z.value,color:X.value&&T(X.value),onUpdateColor:d[1]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`color`])):V(()=>null)],2),(p(),u(xt,{clsPrefix:h,showAlpha:t.showAlpha,mode:z.value,modes:s,onUpdateMode:Ce,value:k.value,valueArr:je.value,onUpdateValue:Re},null,8,[`clsPrefix`,`showAlpha`,`mode`,`modes`,`onUpdateMode`,`value`,`valueArr`,`onUpdateValue`])),V(()=>t.swatches?.length&&(()=>{let e=we(`1de0b88852ebf5cb`);return p(),u(Tt,{clsPrefix:h,mode:z.value,swatches:t.swatches,onUpdateColor:e[0]||=e=>{Z(e,`input`)}},null,8,[`clsPrefix`,`mode`,`swatches`])})())],2),c?.length?(p(),l(`div`,{key:0,class:L(`${h}-color-picker-action`)},[V(()=>c.includes(`confirm`)&&(p(),u(R,{size:`small`,onClick:We,theme:f.peers.Button,themeOverrides:f.peerOverrides.Button},{default:()=>ne.value.confirm},1032,[`onClick`,`theme`,`themeOverrides`]))),V(()=>c.includes(`clear`)&&(p(),u(R,{size:`small`,onClick:Ue,disabled:!k.value,theme:f.peers.Button,themeOverrides:f.peerOverrides.Button},{default:()=>ne.value.clear},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):V(()=>null),n.action?(p(),l(`div`,{key:2,class:L(`${h}-color-picker-action`)},[V(()=>n.action?.())],2)):(p(),l(a,{key:3},[o?(p(),l(`div`,{key:0,class:L(`${h}-color-picker-action`)},[V(()=>o.includes(`undo`)&&(p(),u(R,{size:`small`,onClick:Be,disabled:!Ge.value,theme:f.peers.Button,themeOverrides:f.peerOverrides.Button},{default:()=>ne.value.undo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`]))),V(()=>o.includes(`redo`)&&(p(),u(R,{size:`small`,onClick:He,disabled:!Ke.value,theme:f.peers.Button,themeOverrides:f.peerOverrides.Button},{default:()=>ne.value.redo},1032,[`onClick`,`disabled`,`theme`,`themeOverrides`])))],2)):V(()=>null)],64))],38)})()}return{mergedClsPrefix:d,namespace:f,hsla:Ae,rgba:X,mergedShow:y,mergedDisabled:_,isMounted:se(),adjustedTo:Ee(t),mergedValue:k,handleTriggerClick(){_.value||S(!0)},setTriggerRef:i,handleClickOutside(e){if(r instanceof Element){if(r.contains(De(e)))return}else if(r&&r.$el.contains(De(e)))return;S(!1)},renderPanel:Je,cssVars:m?void 0:qe,themeClass:Q?.themeClass,onRender:Q?.onRender}},render(){let{mergedClsPrefix:e,onRender:t}=this;return t?.(),p(),u(G,null,{default:()=>[(p(),u(q,null,{default:()=>{let t=v(this.$attrs,{ref:this.setTriggerRef,value:this.mergedValue,style:this.cssVars,class:this.themeClass});return t.onClick=Oe([this.mergedDisabled?void 0:this.handleTriggerClick,this.$attrs.onClick]),U(this.$slots.trigger,Ge(t,[`value`,`onClick`,`ref`]),n=>n||(p(),u(Dt,v(t,{clsPrefix:e,hsla:this.hsla,disabled:this.mergedDisabled}),null,16,[`clsPrefix`,`hsla`,`disabled`])))}},1024)),(p(),u(K,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Ee.tdkey,to:this.adjustedTo},{_:1,default:I(()=>(p(),u(z,{name:`fade-in-scale-up-transition`,appear:this.isMounted},{_:1,default:I(()=>this.mergedShow?c(this.renderPanel(),[[Ke,this.handleClickOutside,void 0,{capture:!0}]]):null)},8,[`appear`])))},8,[`placement`,`show`,`containerClass`,`teleportDisabled`,`to`]))]},1024)}}),Ut={class:`mx-auto max-w-[1400px]`},Wt={class:`grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]`},Gt={class:`panel h-fit p-4`},Kt={class:`mb-3 flex items-center gap-2 font-heading text-base font-bold`},qt={class:`grid grid-cols-2 gap-3`},Jt={class:`mb-3`},Yt={class:`tech-label mb-1.5 flex items-center gap-1.5 text-ink-4 tech-label--cn text-xs`},Xt={class:`grid gap-2 sm:grid-cols-2`},Zt={class:`tech-label mb-1 text-ink-4 tech-label--cn text-xs`},Qt={key:0,class:`mt-1 text-xs text-ink-4`},$t={class:`flex items-center gap-2`},en={key:0,class:`mt-3 text-xs text-ink-4`},tn={class:`lg:border-l lg:border-[var(--border)] lg:pl-4`},nn={key:0,class:`flex flex-col gap-2`},rn={key:1,class:`panel grid place-items-center py-12`},an={class:`flex items-start justify-between gap-3`},on={class:`min-w-0 flex-1`},sn={class:`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1`},cn={class:`tnum text-xs text-ink-4`},ln={class:`text-xs text-ink-4`},un={class:`mt-3 flex items-center gap-1.5 border-t pt-2.5`,style:{"border-color":`var(--border)`}},dn=d({__name:`AnnouncementsView`,setup(s){let c=He(),d=Le(),m=o([]),ee=o(!0),v=o(!1),x=o(null),C=i({content:``,font_family:`system`,font_size:15,font_color:`#1f2328`}),ie=Object.keys(Q).map(e=>({label:Q[e].label,value:e})),ae=w(()=>({fontFamily:Q[C.font_family].css,fontSize:`${C.font_size}px`})),oe=w(()=>[`light`,`dark`].map(e=>{let t=Ie()[e],n=We(t.paper,C.font_color,C.font_size);return{key:e,label:e===`dark`?`深色主题`:`浅色主题`,paper:t.paper,line:t.line,ink:n?t.ink:C.font_color,overridden:n}})),T=w(()=>C.content.trim().length>0&&!v.value);function se(){x.value=null,C.content=``,C.font_family=`system`,C.font_size=15,C.font_color=`#1f2328`}async function E(e=!1){e||(ee.value=!0);try{let e=await _.list();m.value=e.announcements}catch(e){c.error(e instanceof h?e.message:`加载公告失败`)}finally{ee.value=!1}}async function D(){if(!T.value)return;v.value=!0;let e={content:C.content.trim(),font_family:C.font_family,font_size:C.font_size,font_color:C.font_color};try{x.value===null?(await _.create(e),c.success(`公告已发布`)):(await _.update(x.value,e),c.success(`公告已更新`)),se(),await E(!0),await d.load()}catch(e){c.error(e instanceof h?e.message:`保存失败`)}finally{v.value=!1}}function ce(e){x.value=e.id,C.content=e.content,C.font_family=e.font_family,C.font_size=e.font_size,C.font_color=e.font_color}async function le(e){let t=e.is_active!==1;try{await _.setActive(e.id,t),c.success(t?`公告已启用`:`公告已停用`),await E(!0),await d.load()}catch(e){c.error(e instanceof h?e.message:`操作失败`)}}async function ue(e){if(await qe({title:`删除公告`,content:`确定删除这条公告吗？删除后不可恢复。`,positiveText:`删除`}))try{await _.remove(e.id),c.success(`公告已删除`),x.value===e.id&&se(),await E(!0),await d.load()}catch(e){c.error(e instanceof h?e.message:`删除失败`)}}return f(E),(i,o)=>(p(),l(`div`,Ut,[r(Xe,{title:`公告管理`,subtitle:`同一时间只有一条生效，发布新公告会自动停用旧的`},{actions:S(()=>[r(n(R),{size:`small`,quaternary:``,loading:ee.value,onClick:o[0]||=e=>E()},{icon:S(()=>[r(n(ze),{size:15})]),default:S(()=>[o[5]||=y(` 刷新 `,-1)]),_:1},8,[`loading`])]),_:1}),e(`div`,Wt,[e(`section`,Gt,[e(`h3`,Kt,[(p(),u(te(x.value===null?n(Re):n(Z)),{size:15,style:{color:`var(--accent-text)`}})),y(` `+g(x.value===null?`发布新公告`:`编辑公告 #${x.value}`),1)]),r(n(Ae),{label:`公告内容`,"show-feedback":!1},{default:S(()=>[r(n(W),{value:C.content,"onUpdate:value":o[1]||=e=>C.content=e,type:`textarea`,maxlength:500,"show-count":``,autosize:{minRows:3,maxRows:6},placeholder:`例：今晚 22:00-23:00 打印点维护，暂停取件。`},null,8,[`value`])]),_:1}),e(`div`,qt,[r(n(Ae),{label:`字体`,"show-feedback":!1},{default:S(()=>[r(n(X),{value:C.font_family,"onUpdate:value":o[2]||=e=>C.font_family=e,options:n(ie),"consistent-menu-width":!1},null,8,[`value`,`options`])]),_:1}),r(n(Ae),{label:`字号`,"show-feedback":!1},{default:S(()=>[r(n(je),{value:C.font_size,"onUpdate:value":o[3]||=e=>C.font_size=e,min:12,max:28,class:`!w-full`},null,8,[`value`])]),_:1})]),r(n(Ae),{label:`文字颜色`,"show-feedback":!1},{default:S(()=>[r(n(Ht),{value:C.font_color,"onUpdate:value":o[4]||=e=>C.font_color=e,"show-alpha":!1,modes:[`hex`]},null,8,[`value`])]),_:1}),e(`div`,Jt,[e(`div`,Yt,[r(n(Pe),{size:12}),o[6]||=y(` 预览 `,-1)]),e(`div`,Xt,[(p(!0),l(a,null,re(oe.value,n=>(p(),l(`div`,{key:n.key},[e(`div`,Zt,g(n.label),1),e(`div`,{class:`border p-3`,style:b({backgroundColor:n.paper,borderColor:n.line})},[e(`p`,{class:`whitespace-pre-wrap break-words`,style:b([ae.value,{color:n.ink}])},g(C.content.trim()||`公告内容会显示在这里`),5)],4),n.overridden?(p(),l(`p`,Qt,` 所选颜色与`+g(n.label)+`纸面对比度不足，实际会回落到主题文字色 `,1)):t(``,!0)]))),128))])]),e(`div`,$t,[r(n(R),{type:`primary`,class:`!font-bold`,loading:v.value,disabled:!T.value,onClick:D},{icon:S(()=>[r(n(Fe),{size:15})]),default:S(()=>[y(` `+g(x.value===null?`发布公告`:`保存修改`),1)]),_:1},8,[`loading`,`disabled`]),x.value===null?t(``,!0):(p(),u(n(R),{key:0,quaternary:``,onClick:se},{default:S(()=>[...o[7]||=[y(`取消编辑`,-1)]]),_:1}))]),x.value===null?(p(),l(`p`,en,` 保存后立即对所有用户生效，并自动停用上一条公告。 `)):t(``,!0)]),e(`section`,tn,[o[10]||=e(`h3`,{class:`mb-3 font-heading text-base font-bold`},[y(` 历史公告 `),e(`span`,{class:`tech-label ml-2 text-ink-4 tech-label--cn text-xs`},`最近 50 条`)],-1),ee.value&&!m.value.length?(p(),l(`div`,nn,[(p(),l(a,null,re(3,e=>r(n(Me),{key:e,height:`92px`,sharp:!1})),64))])):m.value.length?(p(),u(Ce,{key:2,tag:`ul`,class:`flex list-none flex-col gap-3 p-0`,"enter-active-class":`transition duration-[var(--motion-dur-base)] ease-out`,"enter-from-class":`opacity-0 translate-x-1`,"leave-active-class":`transition duration-[var(--motion-dur-fast)] ease-out`,"leave-to-class":`opacity-0`,"move-class":`transition duration-[var(--motion-dur-base)] ease-out`},{default:S(()=>[(p(!0),l(a,null,re(m.value,t=>(p(),l(`li`,{key:t.id,class:ne([`panel p-3.5`,t.is_active===1&&`border-[var(--accent-tint-border)]`])},[e(`div`,an,[e(`div`,on,[e(`p`,{class:`line-clamp-2 text-sm`,style:b({fontFamily:n(Q)[t.font_family]?.css})},g(t.content),5),e(`div`,sn,[e(`span`,{class:`tech-label px-2 py-0.5 tech-label--cn text-xs`,style:b(t.is_active===1?{backgroundColor:`var(--status-ready-bg)`,color:`var(--status-ready)`}:{backgroundColor:`var(--muted)`,color:`var(--text-quaternary)`})},g(t.is_active===1?`生效中`:`已停用`),5),e(`span`,cn,[y(` #`+g(t.id)+` · `+g(n(Q)[t.font_family]?.label??t.font_family)+` `+g(t.font_size)+`px · `,1),e(`span`,{style:b({color:t.font_color})},g(t.font_color),5)]),e(`span`,ln,g(t.author??`系统`)+` · `+g(n(Je)(t.update_time)),1)])]),r(n(Ne),{round:!1,value:t.is_active===1,size:`small`,"onUpdate:value":e=>le(t)},null,8,[`value`,`onUpdate:value`])]),e(`div`,un,[r(n(R),{size:`tiny`,quaternary:``,onClick:e=>ce(t)},{icon:S(()=>[r(n(Z),{size:12})]),default:S(()=>[o[8]||=y(` 编辑 `,-1)]),_:1},8,[`onClick`]),r(n(R),{size:`tiny`,quaternary:``,onClick:e=>ue(t)},{icon:S(()=>[r(n(Be),{size:12})]),default:S(()=>[o[9]||=y(` 删除 `,-1)]),_:1},8,[`onClick`])])],2))),128))]),_:1})):(p(),l(`div`,rn,[r(Ye,{code:`00 / NO NOTICE`,title:`还没有发布过公告`,hint:`左侧写完保存，就会出现在这里`},{icon:S(()=>[r(n(Fe),{size:28})]),_:1})]))])])]))}});export{dn as default};