import{$t as e,A as t,D as n,Dn as r,I as i,L as a,M as o,Mn as s,Qt as c,R as l,S as u,Sn as d,V as f,Vn as p,_ as m,_r as h,b as g,bn as _,dt as v,fr as y,in as b,lt as x,mt as S,nn as C,rn as w,sr as T,st as E,tn as D,wn as O,xn as k,y as A,yt as j}from"./endpoints-BzNG02YK.js";import{f as M}from"./Popover-Clul5osh.js";import{m as N}from"./index-L7aRyXhJ.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${f(t,{alpha:.2})}`}}var F={name:`Switch`,common:l,self:P},I=e(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[D(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),D(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),D(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),e(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[A({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),D(`checked, unchecked`,`
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
 `),D(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),D(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),c(`&:focus`,[D(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),C(`round`,[D(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[D(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),w(`disabled`,[w(`icon`,[C(`rubber-band`,[C(`pressed`,[D(`rail`,[D(`button`,`max-width: var(--n-button-width-pressed);`)])]),D(`rail`,[c(`&:active`,[D(`button`,`max-width: var(--n-button-width-pressed);`)])]),C(`active`,[C(`pressed`,[D(`rail`,[D(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),D(`rail`,[c(`&:active`,[D(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),C(`active`,[D(`rail`,[D(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),D(`rail`,`
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
 `,[D(`button-icon`,`
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
 `,[A()]),D(`button`,`
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
 `)]),C(`active`,[D(`rail`,`background-color: var(--n-rail-color-active);`)]),C(`loading`,[D(`rail`,`
 cursor: wait;
 `)]),C(`disabled`,[D(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...i.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=r({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=j(e),s=i(`Switch`,`-switch`,I,F,e,t),c=u(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:l,mergedDisabledRef:d}=c,f=T(e.defaultValue),p=y(e,`value`),m=M(p,f),h=_(()=>m.value===e.checkedValue),g=T(!1),v=T(!1),S=_(()=>{let{railStyle:t}=e;if(t)return t({focused:v.value,checked:h.value})});function C(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:s}=c;n&&o(n,t),i&&o(i,t),r&&o(r,t),f.value=t,a(),s()}function w(){let{nTriggerFormFocus:e}=c;e()}function D(){let{nTriggerFormBlur:e}=c;e()}function O(){e.loading||d.value||(m.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue))}function k(){v.value=!0,w()}function A(){v.value=!1,D(),g.value=!1}function N(t){e.loading||d.value||t.key===` `&&(m.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue),g.value=!1)}function P(t){e.loading||d.value||t.key===` `&&(t.preventDefault(),g.value=!0)}let L=_(()=>{let{value:e}=l,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:c,textColor:u,iconColor:d,[b(`buttonHeight`,e)]:f,[b(`buttonWidth`,e)]:p,[b(`buttonWidthPressed`,e)]:m,[b(`railHeight`,e)]:h,[b(`railWidth`,e)]:g,[b(`railBorderRadius`,e)]:_,[b(`buttonBorderRadius`,e)]:v},common:{cubicBezierEaseInOut:y}}=s.value,S,C,w;return z?(S=`calc((${h} - ${f}) / 2)`,C=`max(${h}, ${f})`,w=`max(${g}, calc(${g} + ${f} - ${h}))`):(S=x((E(h)-E(f))/2),C=x(Math.max(E(h),E(f))),w=E(h)>E(f)?g:x(E(g)+E(f)-E(h))),{"--n-bezier":y,"--n-button-border-radius":v,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":C,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":_,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":w,"--n-box-shadow-focus":o,"--n-loading-color":c,"--n-text-color":u,"--n-icon-color":d}}),R=n?a(`switch`,_(()=>l.value[0]),L,e):void 0;return{handleClick:O,handleBlur:A,handleFocus:k,handleKeyup:N,handleKeydown:P,mergedRailStyle:S,pressed:g,mergedClsPrefix:t,mergedValue:m,checked:h,mergedDisabled:d,cssVars:n?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:r,checked:i,mergedRailStyle:a,onRender:o,$slots:c}=this;o?.();let{checked:l,unchecked:u,icon:f,"checked-icon":_,"unchecked-icon":y}=c,b=!(n(f)&&n(_)&&n(y));return p(),O(`div`,{role:`switch`,"aria-checked":i,class:v([`${e}-switch`,this.themeClass,b&&`${e}-switch--icon`,i&&`${e}-switch--active`,r&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:h(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[k(`div`,{class:v(`${e}-switch__rail`),"aria-hidden":`true`,style:h(a)},[S(()=>t(l,n=>t(u,t=>n||t?(p(),O(`div`,{key:4,"aria-hidden":!0,class:v(`${e}-switch__children-placeholder`)},[k(`div`,{class:v(`${e}-switch__rail-placeholder`)},[k(`div`,{class:v(`${e}-switch__button-placeholder`)},null,2),S(()=>n)],2),k(`div`,{class:v(`${e}-switch__rail-placeholder`)},[k(`div`,{class:v(`${e}-switch__button-placeholder`)},null,2),S(()=>t)],2)],2)):null))),k(`div`,{class:v(`${e}-switch__button`)},[S(()=>t(f,n=>t(_,r=>t(y,t=>(p(),d(g,null,{default:()=>this.loading?(p(),d(m,s({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||n)?(p(),O(`div`,{class:v(`${e}-switch__button-icon`),key:r?`checked-icon`:`icon`},[S(()=>r||n)],2)):!this.checked&&(t||n)?(p(),O(`div`,{class:v(`${e}-switch__button-icon`),key:t?`unchecked-icon`:`icon`},[S(()=>t||n)],2)):null},1024)))))),S(()=>t(l,t=>t&&(p(),O(`div`,{key:`checked`,class:v(`${e}-switch__checked`)},[S(()=>t)],2)))),S(()=>t(u,t=>t&&(p(),O(`div`,{key:`unchecked`,class:v(`${e}-switch__unchecked`)},[S(()=>t)],2))))],2)],6)],46,L)}});export{B as t};