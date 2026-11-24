import{A as e,D as t,E as n,Et as r,I as i,O as a,Q as o,U as s,Wt as c,xt as l}from"./useApi-BPuI6ZR9-B4cwgxoE.js";import{A as u,Ht as d,O as f,Rt as p,S as m,Ut as h,Vt as g,Wt as _,Z as v,at as y,d as b,et as x,f as S,j as C,k as w,l as T,m as E,w as D,y as O,zt as k}from"./createLucideIcon-DOmk2xkk.js";import{t as A}from"./use-merged-state-BolkIoXB.js";import{dt as j,lt as M}from"./index-C2IDgugI.js";var N={buttonHeightSmall:`14px`,buttonHeightMedium:`18px`,buttonHeightLarge:`22px`,buttonWidthSmall:`14px`,buttonWidthMedium:`18px`,buttonWidthLarge:`22px`,buttonWidthPressedSmall:`20px`,buttonWidthPressedMedium:`24px`,buttonWidthPressedLarge:`28px`,railHeightSmall:`18px`,railHeightMedium:`22px`,railHeightLarge:`26px`,railWidthSmall:`32px`,railWidthMedium:`40px`,railWidthLarge:`48px`};function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${C(t,{alpha:.2})}`}}var F={name:`Switch`,common:u,self:P},I=k(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[g(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),g(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),g(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),k(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[b({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),g(`checked, unchecked`,`
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
 `),g(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),g(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),p(`&:focus`,[g(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),d(`round`,[g(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[g(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),h(`disabled`,[h(`icon`,[d(`rubber-band`,[d(`pressed`,[g(`rail`,[g(`button`,`max-width: var(--n-button-width-pressed);`)])]),g(`rail`,[p(`&:active`,[g(`button`,`max-width: var(--n-button-width-pressed);`)])]),d(`active`,[d(`pressed`,[g(`rail`,[g(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),g(`rail`,[p(`&:active`,[g(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),d(`active`,[g(`rail`,[g(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),g(`rail`,`
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
 `,[g(`button-icon`,`
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
 `,[b()]),g(`button`,`
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
 `)]),d(`active`,[g(`rail`,`background-color: var(--n-rail-color-active);`)]),d(`loading`,[g(`rail`,`
 cursor: wait;
 `)]),d(`disabled`,[g(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...f.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=i({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:i,mergedComponentPropsRef:a}=y(e),o=f(`Switch`,`-switch`,I,F,e,t),s=E(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:a?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:c,mergedDisabledRef:u}=s,d=l(e.defaultValue),p=r(e,`value`),m=A(p,d),h=n(()=>m.value===e.checkedValue),g=l(!1),v=l(!1),b=n(()=>{let{railStyle:t}=e;if(t)return t({focused:v.value,checked:h.value})});function x(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=s;n&&D(n,t),i&&D(i,t),r&&D(r,t),d.value=t,a(),o()}function S(){let{nTriggerFormFocus:e}=s;e()}function C(){let{nTriggerFormBlur:e}=s;e()}function T(){e.loading||u.value||(m.value===e.checkedValue?x(e.uncheckedValue):x(e.checkedValue))}function O(){v.value=!0,S()}function k(){v.value=!1,C(),g.value=!1}function N(t){e.loading||u.value||t.key===` `&&(m.value===e.checkedValue?x(e.uncheckedValue):x(e.checkedValue),g.value=!1)}function P(t){e.loading||u.value||t.key===` `&&(t.preventDefault(),g.value=!0)}let L=n(()=>{let{value:e}=c,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:s,loadingColor:l,textColor:u,iconColor:d,[_(`buttonHeight`,e)]:f,[_(`buttonWidth`,e)]:p,[_(`buttonWidthPressed`,e)]:m,[_(`railHeight`,e)]:h,[_(`railWidth`,e)]:g,[_(`railBorderRadius`,e)]:v,[_(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:b}}=o.value,x,S,C;return z?(x=`calc((${h} - ${f}) / 2)`,S=`max(${h}, ${f})`,C=`max(${g}, calc(${g} + ${f} - ${h}))`):(x=j((M(h)-M(f))/2),S=j(Math.max(M(h),M(f))),C=M(h)>M(f)?g:j(M(g)+M(f)-M(h))),{"--n-bezier":b,"--n-button-border-radius":y,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":S,"--n-offset":x,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":C,"--n-box-shadow-focus":s,"--n-loading-color":l,"--n-text-color":u,"--n-icon-color":d}}),R=i?w(`switch`,n(()=>c.value[0]),L,e):void 0;return{handleClick:T,handleBlur:k,handleFocus:O,handleKeyup:N,handleKeydown:P,mergedRailStyle:b,pressed:g,mergedClsPrefix:t,mergedValue:m,checked:h,mergedDisabled:u,cssVars:i?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:n,mergedDisabled:r,checked:i,mergedRailStyle:l,onRender:u,$slots:d}=this;u?.();let{checked:f,unchecked:p,icon:h,"checked-icon":g,"unchecked-icon":_}=d,y=!(O(h)&&O(g)&&O(_));return o(),e(`div`,{role:`switch`,"aria-checked":i,class:v([`${n}-switch`,this.themeClass,y&&`${n}-switch--icon`,i&&`${n}-switch--active`,r&&`${n}-switch--disabled`,this.round&&`${n}-switch--round`,this.loading&&`${n}-switch--loading`,this.pressed&&`${n}-switch--pressed`,this.rubberBand&&`${n}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:c(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[t(`div`,{class:v(`${n}-switch__rail`),"aria-hidden":`true`,style:c(l)},[x(()=>m(f,r=>m(p,i=>r||i?(o(),e(`div`,{key:4,"aria-hidden":!0,class:v(`${n}-switch__children-placeholder`)},[t(`div`,{class:v(`${n}-switch__rail-placeholder`)},[t(`div`,{class:v(`${n}-switch__button-placeholder`)},null,2),x(()=>r)],2),t(`div`,{class:v(`${n}-switch__rail-placeholder`)},[t(`div`,{class:v(`${n}-switch__button-placeholder`)},null,2),x(()=>i)],2)],2)):null))),t(`div`,{class:v(`${n}-switch__button`)},[x(()=>m(h,t=>m(g,r=>m(_,i=>(o(),a(S,null,{default:()=>this.loading?(o(),a(T,s({key:`loading`,clsPrefix:n,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||t)?(o(),e(`div`,{class:v(`${n}-switch__button-icon`),key:r?`checked-icon`:`icon`},[x(()=>r||t)],2)):!this.checked&&(i||t)?(o(),e(`div`,{class:v(`${n}-switch__button-icon`),key:i?`unchecked-icon`:`icon`},[x(()=>i||t)],2)):null},1024)))))),x(()=>m(f,t=>t&&(o(),e(`div`,{key:`checked`,class:v(`${n}-switch__checked`)},[x(()=>t)],2)))),x(()=>m(p,t=>t&&(o(),e(`div`,{key:`unchecked`,class:v(`${n}-switch__unchecked`)},[x(()=>t)],2))))],2)],6)],46,L)}});export{B as t};