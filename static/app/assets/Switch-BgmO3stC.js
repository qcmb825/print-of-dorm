import{$t as e,C as t,Cn as n,H as r,L as i,N as a,O as o,Pn as s,R as c,Sn as l,Tn as u,Un as d,an as f,b as p,bt as m,ct as h,en as g,ft as _,ht as v,in as y,j as b,kn as x,lr as S,mr as C,nn as w,rn as T,ut as E,v as D,x as O,xn as k,yr as A,z as j}from"./endpoints-Bo2NXLxK.js";import{f as M}from"./Popover-D-j5JW7o.js";import{m as N}from"./index-DdbODeTB.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:i,textColor3:a}=e;return{...N,iconColor:a,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:i,railBorderRadiusMedium:i,railBorderRadiusLarge:i,buttonBorderRadiusSmall:i,buttonBorderRadiusMedium:i,buttonBorderRadiusLarge:i,boxShadowFocus:`0 0 0 2px ${r(t,{alpha:.2})}`}}var F={name:`Switch`,common:j,self:P},I=g(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[w(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),w(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),w(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),g(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[p({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),w(`checked, unchecked`,`
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
 `),w(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),w(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),e(`&:focus`,[w(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),T(`round`,[w(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[w(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),y(`disabled`,[y(`icon`,[T(`rubber-band`,[T(`pressed`,[w(`rail`,[w(`button`,`max-width: var(--n-button-width-pressed);`)])]),w(`rail`,[e(`&:active`,[w(`button`,`max-width: var(--n-button-width-pressed);`)])]),T(`active`,[T(`pressed`,[w(`rail`,[w(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),w(`rail`,[e(`&:active`,[w(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),T(`active`,[w(`rail`,[w(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),w(`rail`,`
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
 `,[w(`button-icon`,`
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
 `,[p()]),w(`button`,`
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
 `)]),T(`active`,[w(`rail`,`background-color: var(--n-rail-color-active);`)]),T(`loading`,[w(`rail`,`
 cursor: wait;
 `)]),T(`disabled`,[w(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...i.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=x({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:o}=m(e),s=i(`Switch`,`-switch`,I,F,e,n),l=t(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:o?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:u,mergedDisabledRef:d}=l,p=S(e.defaultValue),g=C(e,`value`),_=M(g,p),v=k(()=>_.value===e.checkedValue),y=S(!1),b=S(!1),x=k(()=>{let{railStyle:t}=e;if(t)return t({focused:b.value,checked:v.value})});function w(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:o,nTriggerFormChange:s}=l;n&&a(n,t),i&&a(i,t),r&&a(r,t),p.value=t,o(),s()}function T(){let{nTriggerFormFocus:e}=l;e()}function D(){let{nTriggerFormBlur:e}=l;e()}function O(){e.loading||d.value||(_.value===e.checkedValue?w(e.uncheckedValue):w(e.checkedValue))}function A(){b.value=!0,T()}function j(){b.value=!1,D(),y.value=!1}function N(t){e.loading||d.value||t.key===` `&&(_.value===e.checkedValue?w(e.uncheckedValue):w(e.checkedValue),y.value=!1)}function P(t){e.loading||d.value||t.key===` `&&(t.preventDefault(),y.value=!0)}let L=k(()=>{let{value:e}=u,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:c,textColor:l,iconColor:d,[f(`buttonHeight`,e)]:p,[f(`buttonWidth`,e)]:m,[f(`buttonWidthPressed`,e)]:g,[f(`railHeight`,e)]:_,[f(`railWidth`,e)]:v,[f(`railBorderRadius`,e)]:y,[f(`buttonBorderRadius`,e)]:b},common:{cubicBezierEaseInOut:x}}=s.value,S,C,w;return z?(S=`calc((${_} - ${p}) / 2)`,C=`max(${_}, ${p})`,w=`max(${v}, calc(${v} + ${p} - ${_}))`):(S=E((h(_)-h(p))/2),C=E(Math.max(h(_),h(p))),w=h(_)>h(p)?v:E(h(v)+h(p)-h(_))),{"--n-bezier":x,"--n-button-border-radius":b,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":m,"--n-button-width-pressed":g,"--n-button-height":p,"--n-height":C,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":y,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":_,"--n-rail-width":v,"--n-width":w,"--n-box-shadow-focus":o,"--n-loading-color":c,"--n-text-color":l,"--n-icon-color":d}}),R=r?c(`switch`,k(()=>u.value[0]),L,e):void 0;return{handleClick:O,handleBlur:j,handleFocus:A,handleKeyup:N,handleKeydown:P,mergedRailStyle:x,pressed:y,mergedClsPrefix:n,mergedValue:_,checked:v,mergedDisabled:d,cssVars:r?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:r,mergedRailStyle:i,onRender:a,$slots:c}=this;a?.();let{checked:f,unchecked:p,icon:m,"checked-icon":h,"unchecked-icon":g}=c,y=!(o(m)&&o(h)&&o(g));return d(),u(`div`,{role:`switch`,"aria-checked":r,class:_([`${e}-switch`,this.themeClass,y&&`${e}-switch--icon`,r&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:A(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[l(`div`,{class:_(`${e}-switch__rail`),"aria-hidden":`true`,style:A(i)},[v(()=>b(f,t=>b(p,n=>t||n?(d(),u(`div`,{key:4,"aria-hidden":!0,class:_(`${e}-switch__children-placeholder`)},[l(`div`,{class:_(`${e}-switch__rail-placeholder`)},[l(`div`,{class:_(`${e}-switch__button-placeholder`)},null,2),v(()=>t)],2),l(`div`,{class:_(`${e}-switch__rail-placeholder`)},[l(`div`,{class:_(`${e}-switch__button-placeholder`)},null,2),v(()=>n)],2)],2)):null))),l(`div`,{class:_(`${e}-switch__button`)},[v(()=>b(m,t=>b(h,r=>b(g,i=>(d(),n(O,null,{default:()=>this.loading?(d(),n(D,s({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||t)?(d(),u(`div`,{class:_(`${e}-switch__button-icon`),key:r?`checked-icon`:`icon`},[v(()=>r||t)],2)):!this.checked&&(i||t)?(d(),u(`div`,{class:_(`${e}-switch__button-icon`),key:i?`unchecked-icon`:`icon`},[v(()=>i||t)],2)):null},1024)))))),v(()=>b(f,t=>t&&(d(),u(`div`,{key:`checked`,class:_(`${e}-switch__checked`)},[v(()=>t)],2)))),v(()=>b(p,t=>t&&(d(),u(`div`,{key:`unchecked`,class:_(`${e}-switch__unchecked`)},[v(()=>t)],2))))],2)],6)],46,L)}});export{B as t};