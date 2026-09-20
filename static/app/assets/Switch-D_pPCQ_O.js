import{B as e,Bt as t,Ft as n,H as r,V as i,W as a,X as o,ft as s,in as c,rt as l}from"./endpoints-C2GocQfh.js";import{A as u,C as d,Gt as f,Jt as p,Kt as m,P as h,T as g,Xt as _,Yt as v,Zt as y,b,et as x,f as S,ft as C,h as w,it as T,j as E,k as D,nt as O,p as k,st as A,u as j}from"./createLucideIcon-Bpd2679P.js";import{t as M}from"./use-merged-state-D_KLSz9B.js";import{_ as N}from"./index-DWVYnnt7.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${h(t,{alpha:.2})}`}}var F={name:`Switch`,common:E,self:P},I=m(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[p(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),p(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),p(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),m(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[S({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),p(`checked, unchecked`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),p(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),p(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),f(`&:focus`,[p(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),v(`round`,[p(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[p(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),_(`disabled`,[_(`icon`,[v(`rubber-band`,[v(`pressed`,[p(`rail`,[p(`button`,`max-width: var(--n-button-width-pressed);`)])]),p(`rail`,[f(`&:active`,[p(`button`,`max-width: var(--n-button-width-pressed);`)])]),v(`active`,[v(`pressed`,[p(`rail`,[p(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),p(`rail`,[f(`&:active`,[p(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),v(`active`,[p(`rail`,[p(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),p(`rail`,`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[p(`button-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[S()]),p(`button`,`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),v(`active`,[p(`rail`,`background-color: var(--n-rail-color-active);`)]),v(`loading`,[p(`rail`,`
 cursor: wait;
 `)]),v(`disabled`,[p(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...D.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=o({name:`Switch`,props:R,slots:Object,setup(r){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=C(r),s=D(`Switch`,`-switch`,I,F,r,i),c=w(r,{mergedSize(e){return r.size===void 0?e?e.mergedSize.value:o?.value?.Switch?.size||`medium`:r.size}}),{mergedSizeRef:l,mergedDisabledRef:d}=c,f=n(r.defaultValue),p=t(r,`value`),m=M(p,f),h=e(()=>m.value===r.checkedValue),_=n(!1),v=n(!1),b=e(()=>{let{railStyle:e}=r;if(e)return e({focused:v.value,checked:h.value})});function S(e){let{"onUpdate:value":t,onChange:n,onUpdateValue:i}=r,{nTriggerFormInput:a,nTriggerFormChange:o}=c;t&&g(t,e),i&&g(i,e),n&&g(n,e),f.value=e,a(),o()}function T(){let{nTriggerFormFocus:e}=c;e()}function E(){let{nTriggerFormBlur:e}=c;e()}function k(){r.loading||d.value||(m.value===r.checkedValue?S(r.uncheckedValue):S(r.checkedValue))}function A(){v.value=!0,T()}function j(){v.value=!1,E(),_.value=!1}function N(e){r.loading||d.value||e.key===` `&&(m.value===r.checkedValue?S(r.uncheckedValue):S(r.checkedValue),_.value=!1)}function P(e){r.loading||d.value||e.key===` `&&(e.preventDefault(),_.value=!0)}let L=e(()=>{let{value:e}=l,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:c,textColor:u,iconColor:d,[y(`buttonHeight`,e)]:f,[y(`buttonWidth`,e)]:p,[y(`buttonWidthPressed`,e)]:m,[y(`railHeight`,e)]:h,[y(`railWidth`,e)]:g,[y(`railBorderRadius`,e)]:_,[y(`buttonBorderRadius`,e)]:v},common:{cubicBezierEaseInOut:b}}=s.value,S,C,w;return z?(S=`calc((${h} - ${f}) / 2)`,C=`max(${h}, ${f})`,w=`max(${g}, calc(${g} + ${f} - ${h}))`):(S=O((x(h)-x(f))/2),C=O(Math.max(x(h),x(f))),w=x(h)>x(f)?g:O(x(g)+x(f)-x(h))),{"--n-bezier":b,"--n-button-border-radius":v,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":C,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":_,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":w,"--n-box-shadow-focus":o,"--n-loading-color":c,"--n-text-color":u,"--n-icon-color":d}}),R=a?u(`switch`,e(()=>l.value[0]),L,r):void 0;return{handleClick:k,handleBlur:j,handleFocus:A,handleKeyup:N,handleKeydown:P,mergedRailStyle:b,pressed:_,mergedClsPrefix:i,mergedValue:m,checked:h,mergedDisabled:d,cssVars:a?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:n,mergedRailStyle:o,onRender:u,$slots:f}=this;u?.();let{checked:p,unchecked:m,icon:h,"checked-icon":g,"unchecked-icon":_}=f,v=!(b(h)&&b(g)&&b(_));return s(),a(`div`,{role:`switch`,"aria-checked":n,class:T([`${e}-switch`,this.themeClass,v&&`${e}-switch--icon`,n&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:c(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[i(`div`,{class:T(`${e}-switch__rail`),"aria-hidden":`true`,style:c(o)},[A(()=>d(p,t=>d(m,n=>t||n?(s(),a(`div`,{key:4,"aria-hidden":!0,class:T(`${e}-switch__children-placeholder`)},[i(`div`,{class:T(`${e}-switch__rail-placeholder`)},[i(`div`,{class:T(`${e}-switch__button-placeholder`)},null,2),A(()=>t)],2),i(`div`,{class:T(`${e}-switch__rail-placeholder`)},[i(`div`,{class:T(`${e}-switch__button-placeholder`)},null,2),A(()=>n)],2)],2)):null))),i(`div`,{class:T(`${e}-switch__button`)},[A(()=>d(h,t=>d(g,n=>d(_,i=>(s(),r(k,null,{default:()=>this.loading?(s(),r(j,l({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(n||t)?(s(),a(`div`,{class:T(`${e}-switch__button-icon`),key:n?`checked-icon`:`icon`},[A(()=>n||t)],2)):!this.checked&&(i||t)?(s(),a(`div`,{class:T(`${e}-switch__button-icon`),key:i?`unchecked-icon`:`icon`},[A(()=>i||t)],2)):null},1024)))))),A(()=>d(p,t=>t&&(s(),a(`div`,{key:`checked`,class:T(`${e}-switch__checked`)},[A(()=>t)],2)))),A(()=>d(m,t=>t&&(s(),a(`div`,{key:`unchecked`,class:T(`${e}-switch__unchecked`)},[A(()=>t)],2))))],2)],6)],46,L)}});export{B as t};