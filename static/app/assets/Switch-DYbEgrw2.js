import{An as e,D as t,Dr as n,Dt as r,F as i,H as a,Hn as o,K as s,L as c,Ln as l,M as u,Mn as d,On as f,S as p,Sr as m,St as h,T as g,U as _,Y as v,Zn as y,_r as b,_t as x,dn as S,fn as C,ht as w,kn as T,ln as E,on as D,sn as O,un as k,w as A,yt as j}from"./endpoints-DxQPCLqF.js";import{t as M}from"./use-merged-state-BBKZotlX.js";import{h as N}from"./index-Dp3yRsNZ.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${v(t,{alpha:.2})}`}}var F={name:`Switch`,common:s,self:P},I=O(`switch`,`
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
 `),O(`base-loading`,`
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
 `),D(`&:focus`,[E(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),k(`round`,[E(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[E(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),S(`disabled`,[S(`icon`,[k(`rubber-band`,[k(`pressed`,[E(`rail`,[E(`button`,`max-width: var(--n-button-width-pressed);`)])]),E(`rail`,[D(`&:active`,[E(`button`,`max-width: var(--n-button-width-pressed);`)])]),k(`active`,[k(`pressed`,[E(`rail`,[E(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),E(`rail`,[D(`&:active`,[E(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),k(`active`,[E(`rail`,[E(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),E(`rail`,`
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
 `)]),k(`active`,[E(`rail`,`background-color: var(--n-rail-color-active);`)]),k(`loading`,[E(`rail`,`
 cursor: wait;
 `)]),k(`disabled`,[E(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...a.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=l({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedComponentPropsRef:o}=r(e),s=a(`Switch`,`-switch`,I,F,e,n),l=t(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:o?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:u,mergedDisabledRef:d}=l,p=b(e.defaultValue),h=m(e,`value`),g=M(h,p),v=f(()=>g.value===e.checkedValue),y=b(!1),S=b(!1),T=f(()=>{let{railStyle:t}=e;if(t)return t({focused:S.value,checked:v.value})});function E(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=l;n&&c(n,t),i&&c(i,t),r&&c(r,t),p.value=t,a(),o()}function D(){let{nTriggerFormFocus:e}=l;e()}function O(){let{nTriggerFormBlur:e}=l;e()}function k(){e.loading||d.value||(g.value===e.checkedValue?E(e.uncheckedValue):E(e.checkedValue))}function A(){S.value=!0,D()}function j(){S.value=!1,O(),y.value=!1}function N(t){e.loading||d.value||t.key===` `&&(g.value===e.checkedValue?E(e.uncheckedValue):E(e.checkedValue),y.value=!1)}function P(t){e.loading||d.value||t.key===` `&&(t.preventDefault(),y.value=!0)}let L=f(()=>{let{value:e}=u,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:c,textColor:l,iconColor:d,[C(`buttonHeight`,e)]:f,[C(`buttonWidth`,e)]:p,[C(`buttonWidthPressed`,e)]:m,[C(`railHeight`,e)]:h,[C(`railWidth`,e)]:g,[C(`railBorderRadius`,e)]:_,[C(`buttonBorderRadius`,e)]:v},common:{cubicBezierEaseInOut:y}}=s.value,b,S,T;return z?(b=`calc((${h} - ${f}) / 2)`,S=`max(${h}, ${f})`,T=`max(${g}, calc(${g} + ${f} - ${h}))`):(b=x((w(h)-w(f))/2),S=x(Math.max(w(h),w(f))),T=w(h)>w(f)?g:x(w(g)+w(f)-w(h))),{"--n-bezier":y,"--n-button-border-radius":v,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":S,"--n-offset":b,"--n-opacity-disabled":t,"--n-rail-border-radius":_,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":g,"--n-width":T,"--n-box-shadow-focus":o,"--n-loading-color":c,"--n-text-color":l,"--n-icon-color":d}}),R=i?_(`switch`,f(()=>u.value[0]),L,e):void 0;return{handleClick:k,handleBlur:j,handleFocus:A,handleKeyup:N,handleKeydown:P,mergedRailStyle:T,pressed:y,mergedClsPrefix:n,mergedValue:g,checked:v,mergedDisabled:d,cssVars:i?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:t,mergedDisabled:r,checked:a,mergedRailStyle:s,onRender:c,$slots:l}=this;c?.();let{checked:f,unchecked:m,icon:_,"checked-icon":v,"unchecked-icon":b}=l,x=!(u(_)&&u(v)&&u(b));return y(),d(`div`,{role:`switch`,"aria-checked":a,class:j([`${t}-switch`,this.themeClass,x&&`${t}-switch--icon`,a&&`${t}-switch--active`,r&&`${t}-switch--disabled`,this.round&&`${t}-switch--round`,this.loading&&`${t}-switch--loading`,this.pressed&&`${t}-switch--pressed`,this.rubberBand&&`${t}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:n(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[T(`div`,{class:j(`${t}-switch__rail`),"aria-hidden":`true`,style:n(s)},[h(()=>i(f,e=>i(m,n=>e||n?(y(),d(`div`,{key:4,"aria-hidden":!0,class:j(`${t}-switch__children-placeholder`)},[T(`div`,{class:j(`${t}-switch__rail-placeholder`)},[T(`div`,{class:j(`${t}-switch__button-placeholder`)},null,2),h(()=>e)],2),T(`div`,{class:j(`${t}-switch__rail-placeholder`)},[T(`div`,{class:j(`${t}-switch__button-placeholder`)},null,2),h(()=>n)],2)],2)):null))),T(`div`,{class:j(`${t}-switch__button`)},[h(()=>i(_,n=>i(v,r=>i(b,i=>(y(),e(g,null,{default:()=>this.loading?(y(),e(p,o({key:`loading`,clsPrefix:t,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||n)?(y(),d(`div`,{class:j(`${t}-switch__button-icon`),key:r?`checked-icon`:`icon`},[h(()=>r||n)],2)):!this.checked&&(i||n)?(y(),d(`div`,{class:j(`${t}-switch__button-icon`),key:i?`unchecked-icon`:`icon`},[h(()=>i||n)],2)):null},1024)))))),h(()=>i(f,e=>e&&(y(),d(`div`,{key:`checked`,class:j(`${t}-switch__checked`)},[h(()=>e)],2)))),h(()=>i(m,e=>e&&(y(),d(`div`,{key:`unchecked`,class:j(`${t}-switch__unchecked`)},[h(()=>e)],2))))],2)],6)],46,L)}});export{B as t};