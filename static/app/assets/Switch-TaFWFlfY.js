import{An as e,D as t,Dt as n,Er as r,F as i,H as a,In as o,K as s,L as c,M as l,Mn as u,On as d,S as f,St as p,T as m,U as h,Vn as g,Xn as _,Y as v,_t as y,dn as b,fn as x,gr as S,ht as C,kn as w,ln as T,on as E,sn as D,un as O,w as k,xr as A,yt as j}from"./endpoints-D7YssODM.js";import{t as M}from"./use-merged-state-CXRiUPYA.js";import{h as N}from"./index-CTz7zfxj.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${v(t,{alpha:.2})}`}}var F={name:`Switch`,common:s,self:P},I=D(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[T(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),T(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),T(`button-placeholder`,`
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
 `,[k({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),T(`checked, unchecked`,`
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
 `),T(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),T(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),E(`&:focus`,[T(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),O(`round`,[T(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[T(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),b(`disabled`,[b(`icon`,[O(`rubber-band`,[O(`pressed`,[T(`rail`,[T(`button`,`max-width: var(--n-button-width-pressed);`)])]),T(`rail`,[E(`&:active`,[T(`button`,`max-width: var(--n-button-width-pressed);`)])]),O(`active`,[O(`pressed`,[T(`rail`,[T(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),T(`rail`,[E(`&:active`,[T(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),O(`active`,[T(`rail`,[T(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),T(`rail`,`
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
 `,[T(`button-icon`,`
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
 `,[k()]),T(`button`,`
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
 `)]),O(`active`,[T(`rail`,`background-color: var(--n-rail-color-active);`)]),O(`loading`,[T(`rail`,`
 cursor: wait;
 `)]),O(`disabled`,[T(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...a.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=o({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:o}=n(e),s=a(`Switch`,`-switch`,I,F,e,r),l=t(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:o?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:u,mergedDisabledRef:f}=l,p=S(e.defaultValue),m=A(e,`value`),g=M(m,p),_=d(()=>g.value===e.checkedValue),v=S(!1),b=S(!1),w=d(()=>{let{railStyle:t}=e;if(t)return t({focused:b.value,checked:_.value})});function T(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=l;n&&c(n,t),i&&c(i,t),r&&c(r,t),p.value=t,a(),o()}function E(){let{nTriggerFormFocus:e}=l;e()}function D(){let{nTriggerFormBlur:e}=l;e()}function O(){e.loading||f.value||(g.value===e.checkedValue?T(e.uncheckedValue):T(e.checkedValue))}function k(){b.value=!0,E()}function j(){b.value=!1,D(),v.value=!1}function N(t){e.loading||f.value||t.key===` `&&(g.value===e.checkedValue?T(e.uncheckedValue):T(e.checkedValue),v.value=!1)}function P(t){e.loading||f.value||t.key===` `&&(t.preventDefault(),v.value=!0)}let L=d(()=>{let{value:e}=u,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:c,textColor:l,iconColor:d,[x(`buttonHeight`,e)]:f,[x(`buttonWidth`,e)]:p,[x(`buttonWidthPressed`,e)]:m,[x(`railHeight`,e)]:h,[x(`railWidth`,e)]:g,[x(`railBorderRadius`,e)]:_,[x(`buttonBorderRadius`,e)]:v},common:{cubicBezierEaseInOut:b}}=s.value,S,w,T;return z?(S=`calc((${h} - ${f}) / 2)`,w=`max(${h}, ${f})`,T=`max(${g}, calc(${g} + ${f} - ${h}))`):(S=y((C(h)-C(f))/2),w=y(Math.max(C(h),C(f))),T=C(h)>C(f)?g:y(C(g)+C(f)-C(h))),{"--n-bezier":b,"--n-button-border-radius":v,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":w,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":_,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":T,"--n-box-shadow-focus":o,"--n-loading-color":c,"--n-text-color":l,"--n-icon-color":d}}),R=i?h(`switch`,d(()=>u.value[0]),L,e):void 0;return{handleClick:O,handleBlur:j,handleFocus:k,handleKeyup:N,handleKeydown:P,mergedRailStyle:w,pressed:v,mergedClsPrefix:r,mergedValue:g,checked:_,mergedDisabled:f,cssVars:i?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:t,mergedDisabled:n,checked:a,mergedRailStyle:o,onRender:s,$slots:c}=this;s?.();let{checked:d,unchecked:h,icon:v,"checked-icon":y,"unchecked-icon":b}=c,x=!(l(v)&&l(y)&&l(b));return _(),u(`div`,{role:`switch`,"aria-checked":a,class:j([`${t}-switch`,this.themeClass,x&&`${t}-switch--icon`,a&&`${t}-switch--active`,n&&`${t}-switch--disabled`,this.round&&`${t}-switch--round`,this.loading&&`${t}-switch--loading`,this.pressed&&`${t}-switch--pressed`,this.rubberBand&&`${t}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:r(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[w(`div`,{class:j(`${t}-switch__rail`),"aria-hidden":`true`,style:r(o)},[p(()=>i(d,e=>i(h,n=>e||n?(_(),u(`div`,{key:4,"aria-hidden":!0,class:j(`${t}-switch__children-placeholder`)},[w(`div`,{class:j(`${t}-switch__rail-placeholder`)},[w(`div`,{class:j(`${t}-switch__button-placeholder`)},null,2),p(()=>e)],2),w(`div`,{class:j(`${t}-switch__rail-placeholder`)},[w(`div`,{class:j(`${t}-switch__button-placeholder`)},null,2),p(()=>n)],2)],2)):null))),w(`div`,{class:j(`${t}-switch__button`)},[p(()=>i(v,n=>i(y,r=>i(b,i=>(_(),e(m,null,{default:()=>this.loading?(_(),e(f,g({key:`loading`,clsPrefix:t,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||n)?(_(),u(`div`,{class:j(`${t}-switch__button-icon`),key:r?`checked-icon`:`icon`},[p(()=>r||n)],2)):!this.checked&&(i||n)?(_(),u(`div`,{class:j(`${t}-switch__button-icon`),key:i?`unchecked-icon`:`icon`},[p(()=>i||n)],2)):null},1024)))))),p(()=>i(d,e=>e&&(_(),u(`div`,{key:`checked`,class:j(`${t}-switch__checked`)},[p(()=>e)],2)))),p(()=>i(h,e=>e&&(_(),u(`div`,{key:`unchecked`,class:j(`${t}-switch__unchecked`)},[p(()=>e)],2))))],2)],6)],46,L)}});export{B as t};