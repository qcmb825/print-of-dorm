import{$t as e,A as t,D as n,Hn as r,I as i,L as a,M as o,Nn as s,On as c,Qt as l,R as u,S as d,Sn as f,V as p,_ as m,b as h,bn as g,cr as _,dt as v,in as y,lt as b,mt as x,nn as S,pr as C,rn as w,st as T,tn as E,vr as D,wn as O,xn as k,y as A,yt as j}from"./endpoints-BjKpicAD.js";import{f as M}from"./Popover-Da_9Zg5V.js";import{m as N}from"./index-BX-3vdgO.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${p(t,{alpha:.2})}`}}var F={name:`Switch`,common:u,self:P},I=e(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[E(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),E(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),E(`button-placeholder`,`
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
 `,[A({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),E(`checked, unchecked`,`
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
 `),E(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),E(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),l(`&:focus`,[E(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),S(`round`,[E(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[E(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),w(`disabled`,[w(`icon`,[S(`rubber-band`,[S(`pressed`,[E(`rail`,[E(`button`,`max-width: var(--n-button-width-pressed);`)])]),E(`rail`,[l(`&:active`,[E(`button`,`max-width: var(--n-button-width-pressed);`)])]),S(`active`,[S(`pressed`,[E(`rail`,[E(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),E(`rail`,[l(`&:active`,[E(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),S(`active`,[E(`rail`,[E(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),E(`rail`,`
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
 `,[E(`button-icon`,`
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
 `,[A()]),E(`button`,`
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
 `)]),S(`active`,[E(`rail`,`background-color: var(--n-rail-color-active);`)]),S(`loading`,[E(`rail`,`
 cursor: wait;
 `)]),S(`disabled`,[E(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...i.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=c({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=j(e),s=i(`Switch`,`-switch`,I,F,e,t),c=d(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:l,mergedDisabledRef:u}=c,f=_(e.defaultValue),p=C(e,`value`),m=M(p,f),h=g(()=>m.value===e.checkedValue),v=_(!1),x=_(!1),S=g(()=>{let{railStyle:t}=e;if(t)return t({focused:x.value,checked:h.value})});function w(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:s}=c;n&&o(n,t),i&&o(i,t),r&&o(r,t),f.value=t,a(),s()}function E(){let{nTriggerFormFocus:e}=c;e()}function D(){let{nTriggerFormBlur:e}=c;e()}function O(){e.loading||u.value||(m.value===e.checkedValue?w(e.uncheckedValue):w(e.checkedValue))}function k(){x.value=!0,E()}function A(){x.value=!1,D(),v.value=!1}function N(t){e.loading||u.value||t.key===` `&&(m.value===e.checkedValue?w(e.uncheckedValue):w(e.checkedValue),v.value=!1)}function P(t){e.loading||u.value||t.key===` `&&(t.preventDefault(),v.value=!0)}let L=g(()=>{let{value:e}=l,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:c,textColor:u,iconColor:d,[y(`buttonHeight`,e)]:f,[y(`buttonWidth`,e)]:p,[y(`buttonWidthPressed`,e)]:m,[y(`railHeight`,e)]:h,[y(`railWidth`,e)]:g,[y(`railBorderRadius`,e)]:_,[y(`buttonBorderRadius`,e)]:v},common:{cubicBezierEaseInOut:x}}=s.value,S,C,w;return z?(S=`calc((${h} - ${f}) / 2)`,C=`max(${h}, ${f})`,w=`max(${g}, calc(${g} + ${f} - ${h}))`):(S=b((T(h)-T(f))/2),C=b(Math.max(T(h),T(f))),w=T(h)>T(f)?g:b(T(g)+T(f)-T(h))),{"--n-bezier":x,"--n-button-border-radius":v,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":C,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":_,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":w,"--n-box-shadow-focus":o,"--n-loading-color":c,"--n-text-color":u,"--n-icon-color":d}}),R=n?a(`switch`,g(()=>l.value[0]),L,e):void 0;return{handleClick:O,handleBlur:A,handleFocus:k,handleKeyup:N,handleKeydown:P,mergedRailStyle:S,pressed:v,mergedClsPrefix:t,mergedValue:m,checked:h,mergedDisabled:u,cssVars:n?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:i,checked:a,mergedRailStyle:o,onRender:c,$slots:l}=this;c?.();let{checked:u,unchecked:d,icon:p,"checked-icon":g,"unchecked-icon":_}=l,y=!(n(p)&&n(g)&&n(_));return r(),O(`div`,{role:`switch`,"aria-checked":a,class:v([`${e}-switch`,this.themeClass,y&&`${e}-switch--icon`,a&&`${e}-switch--active`,i&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:D(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[k(`div`,{class:v(`${e}-switch__rail`),"aria-hidden":`true`,style:D(o)},[x(()=>t(u,n=>t(d,t=>n||t?(r(),O(`div`,{key:4,"aria-hidden":!0,class:v(`${e}-switch__children-placeholder`)},[k(`div`,{class:v(`${e}-switch__rail-placeholder`)},[k(`div`,{class:v(`${e}-switch__button-placeholder`)},null,2),x(()=>n)],2),k(`div`,{class:v(`${e}-switch__rail-placeholder`)},[k(`div`,{class:v(`${e}-switch__button-placeholder`)},null,2),x(()=>t)],2)],2)):null))),k(`div`,{class:v(`${e}-switch__button`)},[x(()=>t(p,n=>t(g,i=>t(_,t=>(r(),f(h,null,{default:()=>this.loading?(r(),f(m,s({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(i||n)?(r(),O(`div`,{class:v(`${e}-switch__button-icon`),key:i?`checked-icon`:`icon`},[x(()=>i||n)],2)):!this.checked&&(t||n)?(r(),O(`div`,{class:v(`${e}-switch__button-icon`),key:t?`unchecked-icon`:`icon`},[x(()=>t||n)],2)):null},1024)))))),x(()=>t(u,t=>t&&(r(),O(`div`,{key:`checked`,class:v(`${e}-switch__checked`)},[x(()=>t)],2)))),x(()=>t(d,t=>t&&(r(),O(`div`,{key:`unchecked`,class:v(`${e}-switch__unchecked`)},[x(()=>t)],2))))],2)],6)],46,L)}});export{B as t};