import{B as e,Pt as t,U as n,V as r,Y as i,dt as a,nt as o,rn as s,z as c,zt as l}from"./endpoints-C3DHQTsP.js";import{$t as u,A as d,I as f,Jt as p,N as m,Qt as h,S as g,Xt as _,Zt as v,d as y,f as b,it as x,k as S,l as C,lt as w,m as T,mt as E,nt as D,ot as O,qt as k,w as A,y as j}from"./Button-Z2R18gr3.js";import{t as M}from"./use-merged-state-BQRj4oql.js";import{p as N}from"./index-DRNg6kq2.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${f(t,{alpha:.2})}`}}var F={name:`Switch`,common:m,self:P},I=p(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[_(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),_(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),_(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),p(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[y({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),_(`checked, unchecked`,`
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
 `),_(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),_(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),k(`&:focus`,[_(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),v(`round`,[_(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[_(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),h(`disabled`,[h(`icon`,[v(`rubber-band`,[v(`pressed`,[_(`rail`,[_(`button`,`max-width: var(--n-button-width-pressed);`)])]),_(`rail`,[k(`&:active`,[_(`button`,`max-width: var(--n-button-width-pressed);`)])]),v(`active`,[v(`pressed`,[_(`rail`,[_(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),_(`rail`,[k(`&:active`,[_(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),v(`active`,[_(`rail`,[_(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),_(`rail`,`
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
 `,[_(`button-icon`,`
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
 `,[y()]),_(`button`,`
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
 `)]),v(`active`,[_(`rail`,`background-color: var(--n-rail-color-active);`)]),v(`loading`,[_(`rail`,`
 cursor: wait;
 `)]),v(`disabled`,[_(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...S.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=i({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=E(e),a=S(`Switch`,`-switch`,I,F,e,n),o=T(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:i?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:s,mergedDisabledRef:f}=o,p=t(e.defaultValue),m=l(e,`value`),h=M(m,p),g=c(()=>h.value===e.checkedValue),_=t(!1),v=t(!1),y=c(()=>{let{railStyle:t}=e;if(t)return t({focused:v.value,checked:g.value})});function b(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:s}=o;n&&A(n,t),i&&A(i,t),r&&A(r,t),p.value=t,a(),s()}function C(){let{nTriggerFormFocus:e}=o;e()}function w(){let{nTriggerFormBlur:e}=o;e()}function O(){e.loading||f.value||(h.value===e.checkedValue?b(e.uncheckedValue):b(e.checkedValue))}function k(){v.value=!0,C()}function j(){v.value=!1,w(),_.value=!1}function N(t){e.loading||f.value||t.key===` `&&(h.value===e.checkedValue?b(e.uncheckedValue):b(e.checkedValue),_.value=!1)}function P(t){e.loading||f.value||t.key===` `&&(t.preventDefault(),_.value=!0)}let L=c(()=>{let{value:e}=s,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:o,boxShadowFocus:c,loadingColor:l,textColor:d,iconColor:f,[u(`buttonHeight`,e)]:p,[u(`buttonWidth`,e)]:m,[u(`buttonWidthPressed`,e)]:h,[u(`railHeight`,e)]:g,[u(`railWidth`,e)]:_,[u(`railBorderRadius`,e)]:v,[u(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:b}}=a.value,S,C,w;return z?(S=`calc((${g} - ${p}) / 2)`,C=`max(${g}, ${p})`,w=`max(${_}, calc(${_} + ${p} - ${g}))`):(S=x((D(g)-D(p))/2),C=x(Math.max(D(g),D(p))),w=D(g)>D(p)?_:x(D(_)+D(p)-D(g))),{"--n-bezier":b,"--n-button-border-radius":y,"--n-button-box-shadow":i,"--n-button-color":o,"--n-button-width":m,"--n-button-width-pressed":h,"--n-button-height":p,"--n-height":C,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":g,"--n-rail-width":_,"--n-width":w,"--n-box-shadow-focus":c,"--n-loading-color":l,"--n-text-color":d,"--n-icon-color":f}}),R=r?d(`switch`,c(()=>s.value[0]),L,e):void 0;return{handleClick:O,handleBlur:j,handleFocus:k,handleKeyup:N,handleKeydown:P,mergedRailStyle:y,pressed:_,mergedClsPrefix:n,mergedValue:h,checked:g,mergedDisabled:f,cssVars:r?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:t,mergedDisabled:i,checked:c,mergedRailStyle:l,onRender:u,$slots:d}=this;u?.();let{checked:f,unchecked:p,icon:m,"checked-icon":h,"unchecked-icon":_}=d,v=!(j(m)&&j(h)&&j(_));return a(),n(`div`,{role:`switch`,"aria-checked":c,class:O([`${t}-switch`,this.themeClass,v&&`${t}-switch--icon`,c&&`${t}-switch--active`,i&&`${t}-switch--disabled`,this.round&&`${t}-switch--round`,this.loading&&`${t}-switch--loading`,this.pressed&&`${t}-switch--pressed`,this.rubberBand&&`${t}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:s(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[e(`div`,{class:O(`${t}-switch__rail`),"aria-hidden":`true`,style:s(l)},[w(()=>g(f,r=>g(p,i=>r||i?(a(),n(`div`,{key:4,"aria-hidden":!0,class:O(`${t}-switch__children-placeholder`)},[e(`div`,{class:O(`${t}-switch__rail-placeholder`)},[e(`div`,{class:O(`${t}-switch__button-placeholder`)},null,2),w(()=>r)],2),e(`div`,{class:O(`${t}-switch__rail-placeholder`)},[e(`div`,{class:O(`${t}-switch__button-placeholder`)},null,2),w(()=>i)],2)],2)):null))),e(`div`,{class:O(`${t}-switch__button`)},[w(()=>g(m,e=>g(h,i=>g(_,s=>(a(),r(b,null,{default:()=>this.loading?(a(),r(C,o({key:`loading`,clsPrefix:t,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(i||e)?(a(),n(`div`,{class:O(`${t}-switch__button-icon`),key:i?`checked-icon`:`icon`},[w(()=>i||e)],2)):!this.checked&&(s||e)?(a(),n(`div`,{class:O(`${t}-switch__button-icon`),key:s?`unchecked-icon`:`icon`},[w(()=>s||e)],2)):null},1024)))))),w(()=>g(f,e=>e&&(a(),n(`div`,{key:`checked`,class:O(`${t}-switch__checked`)},[w(()=>e)],2)))),w(()=>g(p,e=>e&&(a(),n(`div`,{key:`unchecked`,class:O(`${t}-switch__unchecked`)},[w(()=>e)],2))))],2)],6)],46,L)}});export{B as t};