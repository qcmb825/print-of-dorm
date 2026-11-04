import{Ht as e,J as t,Y as n,Z as r,dn as i,q as a,qt as o,rt as s,ut as c,yt as l}from"./endpoints-kLXNUVGT.js";import{$t as u,B as d,E as f,F as p,I as m,L as h,Xt as g,Zt as _,_t as v,at as y,en as b,ft as x,g as S,j as C,k as w,lt as T,nn as E,st as D,tn as O,v as k,x as A,y as j}from"./motion-CI5wB-09.js";import{t as M}from"./use-merged-state-C8M42QZO.js";var N={buttonHeightSmall:`14px`,buttonHeightMedium:`18px`,buttonHeightLarge:`22px`,buttonWidthSmall:`14px`,buttonWidthMedium:`18px`,buttonWidthLarge:`22px`,buttonWidthPressedSmall:`20px`,buttonWidthPressedMedium:`24px`,buttonWidthPressedLarge:`28px`,railHeightSmall:`18px`,railHeightMedium:`22px`,railHeightLarge:`26px`,railWidthSmall:`32px`,railWidthMedium:`40px`,railWidthLarge:`48px`};function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${d(t,{alpha:.2})}`}}var F={name:`Switch`,common:h,self:P},I=_(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[u(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),u(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),u(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),_(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[k({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),u(`checked, unchecked`,`
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
 `),u(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),u(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),g(`&:focus`,[u(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),b(`round`,[u(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[u(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),O(`disabled`,[O(`icon`,[b(`rubber-band`,[b(`pressed`,[u(`rail`,[u(`button`,`max-width: var(--n-button-width-pressed);`)])]),u(`rail`,[g(`&:active`,[u(`button`,`max-width: var(--n-button-width-pressed);`)])]),b(`active`,[b(`pressed`,[u(`rail`,[u(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),u(`rail`,[g(`&:active`,[u(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),b(`active`,[u(`rail`,[u(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),u(`rail`,`
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
 `,[u(`button-icon`,`
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
 `,[k()]),u(`button`,`
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
 `)]),b(`active`,[u(`rail`,`background-color: var(--n-rail-color-active);`)]),b(`loading`,[u(`rail`,`
 cursor: wait;
 `)]),b(`disabled`,[u(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...p.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=s({name:`Switch`,props:R,slots:Object,setup(t){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=v(t),s=p(`Switch`,`-switch`,I,F,t,n),c=A(t,{mergedSize(e){return t.size===void 0?e?e.mergedSize.value:i?.value?.Switch?.size||`medium`:t.size}}),{mergedSizeRef:l,mergedDisabledRef:u}=c,d=e(t.defaultValue),f=o(t,`value`),h=M(f,d),g=a(()=>h.value===t.checkedValue),_=e(!1),b=e(!1),x=a(()=>{let{railStyle:e}=t;if(e)return e({focused:b.value,checked:g.value})});function S(e){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=t,{nTriggerFormInput:a,nTriggerFormChange:o}=c;n&&C(n,e),i&&C(i,e),r&&C(r,e),d.value=e,a(),o()}function w(){let{nTriggerFormFocus:e}=c;e()}function T(){let{nTriggerFormBlur:e}=c;e()}function O(){t.loading||u.value||(h.value===t.checkedValue?S(t.uncheckedValue):S(t.checkedValue))}function k(){b.value=!0,w()}function j(){b.value=!1,T(),_.value=!1}function N(e){t.loading||u.value||e.key===` `&&(h.value===t.checkedValue?S(t.uncheckedValue):S(t.checkedValue),_.value=!1)}function P(e){t.loading||u.value||e.key===` `&&(e.preventDefault(),_.value=!0)}let L=a(()=>{let{value:e}=l,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:c,textColor:u,iconColor:d,[E(`buttonHeight`,e)]:f,[E(`buttonWidth`,e)]:p,[E(`buttonWidthPressed`,e)]:m,[E(`railHeight`,e)]:h,[E(`railWidth`,e)]:g,[E(`railBorderRadius`,e)]:_,[E(`buttonBorderRadius`,e)]:v},common:{cubicBezierEaseInOut:b}}=s.value,x,S,C;return z?(x=`calc((${h} - ${f}) / 2)`,S=`max(${h}, ${f})`,C=`max(${g}, calc(${g} + ${f} - ${h}))`):(x=D((y(h)-y(f))/2),S=D(Math.max(y(h),y(f))),C=y(h)>y(f)?g:D(y(g)+y(f)-y(h))),{"--n-bezier":b,"--n-button-border-radius":v,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":S,"--n-offset":x,"--n-opacity-disabled":t,"--n-rail-border-radius":_,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":C,"--n-box-shadow-focus":o,"--n-loading-color":c,"--n-text-color":u,"--n-icon-color":d}}),R=r?m(`switch`,a(()=>l.value[0]),L,t):void 0;return{handleClick:O,handleBlur:j,handleFocus:k,handleKeyup:N,handleKeydown:P,mergedRailStyle:x,pressed:_,mergedClsPrefix:n,mergedValue:h,checked:g,mergedDisabled:u,cssVars:r?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:a,checked:o,mergedRailStyle:s,onRender:u,$slots:d}=this;u?.();let{checked:p,unchecked:m,icon:h,"checked-icon":g,"unchecked-icon":_}=d,v=!(f(h)&&f(g)&&f(_));return l(),r(`div`,{role:`switch`,"aria-checked":o,class:T([`${e}-switch`,this.themeClass,v&&`${e}-switch--icon`,o&&`${e}-switch--active`,a&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:i(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[t(`div`,{class:T(`${e}-switch__rail`),"aria-hidden":`true`,style:i(s)},[x(()=>w(p,n=>w(m,i=>n||i?(l(),r(`div`,{key:4,"aria-hidden":!0,class:T(`${e}-switch__children-placeholder`)},[t(`div`,{class:T(`${e}-switch__rail-placeholder`)},[t(`div`,{class:T(`${e}-switch__button-placeholder`)},null,2),x(()=>n)],2),t(`div`,{class:T(`${e}-switch__rail-placeholder`)},[t(`div`,{class:T(`${e}-switch__button-placeholder`)},null,2),x(()=>i)],2)],2)):null))),t(`div`,{class:T(`${e}-switch__button`)},[x(()=>w(h,t=>w(g,i=>w(_,a=>(l(),n(j,null,{default:()=>this.loading?(l(),n(S,c({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(i||t)?(l(),r(`div`,{class:T(`${e}-switch__button-icon`),key:i?`checked-icon`:`icon`},[x(()=>i||t)],2)):!this.checked&&(a||t)?(l(),r(`div`,{class:T(`${e}-switch__button-icon`),key:a?`unchecked-icon`:`icon`},[x(()=>a||t)],2)):null},1024)))))),x(()=>w(p,t=>t&&(l(),r(`div`,{key:`checked`,class:T(`${e}-switch__checked`)},[x(()=>t)],2)))),x(()=>w(m,t=>t&&(l(),r(`div`,{key:`unchecked`,class:T(`${e}-switch__unchecked`)},[x(()=>t)],2))))],2)],6)],46,L)}});export{B as t};