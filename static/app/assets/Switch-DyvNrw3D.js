import{A as e,B as t,C as n,Cn as r,Dn as i,F as a,Gn as o,In as s,N as c,S as l,St as u,T as d,Tn as f,V as p,W as m,_t as h,an as g,b as _,dr as v,ft as y,gr as b,in as x,jn as S,mt as C,nn as w,on as T,sn as E,tn as D,ut as O,wn as k,xr as A,z as j}from"./endpoints-gDUDUnKI.js";import{i as M}from"./cssr-nvHT-q9I.js";import{h as N}from"./index-DmEbPUOi.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${m(t,{alpha:.2})}`}}var F={name:`Switch`,common:p,self:P},I=w(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[x(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),x(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),x(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),w(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[l({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),x(`checked, unchecked`,`
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
 `),x(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),x(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),D(`&:focus`,[x(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),g(`round`,[x(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[x(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),T(`disabled`,[T(`icon`,[g(`rubber-band`,[g(`pressed`,[x(`rail`,[x(`button`,`max-width: var(--n-button-width-pressed);`)])]),x(`rail`,[D(`&:active`,[x(`button`,`max-width: var(--n-button-width-pressed);`)])]),g(`active`,[g(`pressed`,[x(`rail`,[x(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),x(`rail`,[D(`&:active`,[x(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),g(`active`,[x(`rail`,[x(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),x(`rail`,`
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
 `,[x(`button-icon`,`
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
 `,[l()]),x(`button`,`
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
 `)]),g(`active`,[x(`rail`,`background-color: var(--n-rail-color-active);`)]),g(`loading`,[x(`rail`,`
 cursor: wait;
 `)]),g(`disabled`,[x(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...j.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=S({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedComponentPropsRef:o}=u(e),s=j(`Switch`,`-switch`,I,F,e,n),c=d(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:o?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:l,mergedDisabledRef:f}=c,p=v(e.defaultValue),m=b(e,`value`),h=M(m,p),g=r(()=>h.value===e.checkedValue),_=v(!1),x=v(!1),S=r(()=>{let{railStyle:t}=e;if(t)return t({focused:x.value,checked:g.value})});function C(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:o,nTriggerFormChange:s}=c;n&&a(n,t),i&&a(i,t),r&&a(r,t),p.value=t,o(),s()}function w(){let{nTriggerFormFocus:e}=c;e()}function T(){let{nTriggerFormBlur:e}=c;e()}function D(){e.loading||f.value||(h.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue))}function k(){x.value=!0,w()}function A(){x.value=!1,T(),_.value=!1}function N(t){e.loading||f.value||t.key===` `&&(h.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue),_.value=!1)}function P(t){e.loading||f.value||t.key===` `&&(t.preventDefault(),_.value=!0)}let L=r(()=>{let{value:e}=l,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:c,textColor:u,iconColor:d,[E(`buttonHeight`,e)]:f,[E(`buttonWidth`,e)]:p,[E(`buttonWidthPressed`,e)]:m,[E(`railHeight`,e)]:h,[E(`railWidth`,e)]:g,[E(`railBorderRadius`,e)]:_,[E(`buttonBorderRadius`,e)]:v},common:{cubicBezierEaseInOut:b}}=s.value,x,S,C;return z?(x=`calc((${h} - ${f}) / 2)`,S=`max(${h}, ${f})`,C=`max(${g}, calc(${g} + ${f} - ${h}))`):(x=y((O(h)-O(f))/2),S=y(Math.max(O(h),O(f))),C=O(h)>O(f)?g:y(O(g)+O(f)-O(h))),{"--n-bezier":b,"--n-button-border-radius":v,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":S,"--n-offset":x,"--n-opacity-disabled":t,"--n-rail-border-radius":_,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":C,"--n-box-shadow-focus":o,"--n-loading-color":c,"--n-text-color":u,"--n-icon-color":d}}),R=i?t(`switch`,r(()=>l.value[0]),L,e):void 0;return{handleClick:D,handleBlur:A,handleFocus:k,handleKeyup:N,handleKeydown:P,mergedRailStyle:S,pressed:_,mergedClsPrefix:n,mergedValue:h,checked:g,mergedDisabled:f,cssVars:i?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:t,mergedDisabled:r,checked:a,mergedRailStyle:l,onRender:u,$slots:d}=this;u?.();let{checked:p,unchecked:m,icon:g,"checked-icon":v,"unchecked-icon":y}=d,b=!(e(g)&&e(v)&&e(y));return o(),i(`div`,{role:`switch`,"aria-checked":a,class:C([`${t}-switch`,this.themeClass,b&&`${t}-switch--icon`,a&&`${t}-switch--active`,r&&`${t}-switch--disabled`,this.round&&`${t}-switch--round`,this.loading&&`${t}-switch--loading`,this.pressed&&`${t}-switch--pressed`,this.rubberBand&&`${t}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:A(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[k(`div`,{class:C(`${t}-switch__rail`),"aria-hidden":`true`,style:A(l)},[h(()=>c(p,e=>c(m,n=>e||n?(o(),i(`div`,{key:4,"aria-hidden":!0,class:C(`${t}-switch__children-placeholder`)},[k(`div`,{class:C(`${t}-switch__rail-placeholder`)},[k(`div`,{class:C(`${t}-switch__button-placeholder`)},null,2),h(()=>e)],2),k(`div`,{class:C(`${t}-switch__rail-placeholder`)},[k(`div`,{class:C(`${t}-switch__button-placeholder`)},null,2),h(()=>n)],2)],2)):null))),k(`div`,{class:C(`${t}-switch__button`)},[h(()=>c(g,e=>c(v,r=>c(y,a=>(o(),f(n,null,{default:()=>this.loading?(o(),f(_,s({key:`loading`,clsPrefix:t,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||e)?(o(),i(`div`,{class:C(`${t}-switch__button-icon`),key:r?`checked-icon`:`icon`},[h(()=>r||e)],2)):!this.checked&&(a||e)?(o(),i(`div`,{class:C(`${t}-switch__button-icon`),key:a?`unchecked-icon`:`icon`},[h(()=>a||e)],2)):null},1024)))))),h(()=>c(p,e=>e&&(o(),i(`div`,{key:`checked`,class:C(`${t}-switch__checked`)},[h(()=>e)],2)))),h(()=>c(m,e=>e&&(o(),i(`div`,{key:`unchecked`,class:C(`${t}-switch__unchecked`)},[h(()=>e)],2))))],2)],6)],46,L)}});export{B as t};