import{Bn as e,D as t,Dn as n,Et as r,F as i,Fn as a,G as o,H as s,J as c,L as l,M as u,On as d,S as f,T as p,Tr as m,V as h,Yn as g,an as _,br as v,cn as y,dn as b,gt as x,hr as S,jn as C,kn as w,ln as T,mt as E,on as D,un as O,vt as k,w as A,xt as j}from"./endpoints-DguQVVk7.js";import{t as M}from"./use-merged-state-DzXhUbEL.js";import{h as N}from"./index-DwEf3xIY.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${c(t,{alpha:.2})}`}}var F={name:`Switch`,common:o,self:P},I=D(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[y(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),y(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),y(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),D(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[A({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),y(`checked, unchecked`,`
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
 `),y(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),y(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),_(`&:focus`,[y(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),T(`round`,[y(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[y(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),O(`disabled`,[O(`icon`,[T(`rubber-band`,[T(`pressed`,[y(`rail`,[y(`button`,`max-width: var(--n-button-width-pressed);`)])]),y(`rail`,[_(`&:active`,[y(`button`,`max-width: var(--n-button-width-pressed);`)])]),T(`active`,[T(`pressed`,[y(`rail`,[y(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),y(`rail`,[_(`&:active`,[y(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),T(`active`,[y(`rail`,[y(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),y(`rail`,`
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
 `,[y(`button-icon`,`
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
 `,[A()]),y(`button`,`
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
 `)]),T(`active`,[y(`rail`,`background-color: var(--n-rail-color-active);`)]),T(`loading`,[y(`rail`,`
 cursor: wait;
 `)]),T(`disabled`,[y(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...h.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=a({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=r(e),c=h(`Switch`,`-switch`,I,F,e,i),u=t(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:o?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:d,mergedDisabledRef:f}=u,p=S(e.defaultValue),m=v(e,`value`),g=M(m,p),_=n(()=>g.value===e.checkedValue),y=S(!1),C=S(!1),w=n(()=>{let{railStyle:t}=e;if(t)return t({focused:C.value,checked:_.value})});function T(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=u;n&&l(n,t),i&&l(i,t),r&&l(r,t),p.value=t,a(),o()}function D(){let{nTriggerFormFocus:e}=u;e()}function O(){let{nTriggerFormBlur:e}=u;e()}function k(){e.loading||f.value||(g.value===e.checkedValue?T(e.uncheckedValue):T(e.checkedValue))}function A(){C.value=!0,D()}function j(){C.value=!1,O(),y.value=!1}function N(t){e.loading||f.value||t.key===` `&&(g.value===e.checkedValue?T(e.uncheckedValue):T(e.checkedValue),y.value=!1)}function P(t){e.loading||f.value||t.key===` `&&(t.preventDefault(),y.value=!0)}let L=n(()=>{let{value:e}=d,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:s,textColor:l,iconColor:u,[b(`buttonHeight`,e)]:f,[b(`buttonWidth`,e)]:p,[b(`buttonWidthPressed`,e)]:m,[b(`railHeight`,e)]:h,[b(`railWidth`,e)]:g,[b(`railBorderRadius`,e)]:_,[b(`buttonBorderRadius`,e)]:v},common:{cubicBezierEaseInOut:y}}=c.value,S,C,w;return z?(S=`calc((${h} - ${f}) / 2)`,C=`max(${h}, ${f})`,w=`max(${g}, calc(${g} + ${f} - ${h}))`):(S=x((E(h)-E(f))/2),C=x(Math.max(E(h),E(f))),w=E(h)>E(f)?g:x(E(g)+E(f)-E(h))),{"--n-bezier":y,"--n-button-border-radius":v,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":C,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":_,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":w,"--n-box-shadow-focus":o,"--n-loading-color":s,"--n-text-color":l,"--n-icon-color":u}}),R=a?s(`switch`,n(()=>d.value[0]),L,e):void 0;return{handleClick:k,handleBlur:j,handleFocus:A,handleKeyup:N,handleKeydown:P,mergedRailStyle:w,pressed:y,mergedClsPrefix:i,mergedValue:g,checked:_,mergedDisabled:f,cssVars:a?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:t,mergedDisabled:n,checked:r,mergedRailStyle:a,onRender:o,$slots:s}=this;o?.();let{checked:c,unchecked:l,icon:h,"checked-icon":_,"unchecked-icon":v}=s,y=!(u(h)&&u(_)&&u(v));return g(),C(`div`,{role:`switch`,"aria-checked":r,class:k([`${t}-switch`,this.themeClass,y&&`${t}-switch--icon`,r&&`${t}-switch--active`,n&&`${t}-switch--disabled`,this.round&&`${t}-switch--round`,this.loading&&`${t}-switch--loading`,this.pressed&&`${t}-switch--pressed`,this.rubberBand&&`${t}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:m(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[d(`div`,{class:k(`${t}-switch__rail`),"aria-hidden":`true`,style:m(a)},[j(()=>i(c,e=>i(l,n=>e||n?(g(),C(`div`,{key:4,"aria-hidden":!0,class:k(`${t}-switch__children-placeholder`)},[d(`div`,{class:k(`${t}-switch__rail-placeholder`)},[d(`div`,{class:k(`${t}-switch__button-placeholder`)},null,2),j(()=>e)],2),d(`div`,{class:k(`${t}-switch__rail-placeholder`)},[d(`div`,{class:k(`${t}-switch__button-placeholder`)},null,2),j(()=>n)],2)],2)):null))),d(`div`,{class:k(`${t}-switch__button`)},[j(()=>i(h,n=>i(_,r=>i(v,i=>(g(),w(p,null,{default:()=>this.loading?(g(),w(f,e({key:`loading`,clsPrefix:t,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||n)?(g(),C(`div`,{class:k(`${t}-switch__button-icon`),key:r?`checked-icon`:`icon`},[j(()=>r||n)],2)):!this.checked&&(i||n)?(g(),C(`div`,{class:k(`${t}-switch__button-icon`),key:i?`unchecked-icon`:`icon`},[j(()=>i||n)],2)):null},1024)))))),j(()=>i(c,e=>e&&(g(),C(`div`,{key:`checked`,class:k(`${t}-switch__checked`)},[j(()=>e)],2)))),j(()=>i(l,e=>e&&(g(),C(`div`,{key:`unchecked`,class:k(`${t}-switch__unchecked`)},[j(()=>e)],2))))],2)],6)],46,L)}});export{B as t};