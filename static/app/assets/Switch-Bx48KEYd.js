import{An as e,B as t,Cn as n,En as r,Fn as i,M as a,P as o,R as s,S as c,Sn as l,U as u,Wn as d,an as f,br as p,dt as m,en as h,gt as g,hr as _,in as v,k as y,lt as b,on as x,pt as S,rn as C,tn as w,ur as T,w as E,wn as D,x as O,xt as k,y as A,z as j}from"./endpoints-C6WHjh8m.js";import{i as M}from"./cssr-DbvHbkBG.js";import{m as N}from"./index-Bx-xSnBt.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${u(t,{alpha:.2})}`}}var F={name:`Switch`,common:t,self:P},I=w(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[C(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),C(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),C(`button-placeholder`,`
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
 `,[O({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),C(`checked, unchecked`,`
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
 `),C(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),C(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),h(`&:focus`,[C(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),v(`round`,[C(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[C(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),f(`disabled`,[f(`icon`,[v(`rubber-band`,[v(`pressed`,[C(`rail`,[C(`button`,`max-width: var(--n-button-width-pressed);`)])]),C(`rail`,[h(`&:active`,[C(`button`,`max-width: var(--n-button-width-pressed);`)])]),v(`active`,[v(`pressed`,[C(`rail`,[C(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),C(`rail`,[h(`&:active`,[C(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),v(`active`,[C(`rail`,[C(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),C(`rail`,`
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
 `,[C(`button-icon`,`
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
 `,[O()]),C(`button`,`
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
 `)]),v(`active`,[C(`rail`,`background-color: var(--n-rail-color-active);`)]),v(`loading`,[C(`rail`,`
 cursor: wait;
 `)]),v(`disabled`,[C(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...s.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=e({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=k(e),i=s(`Switch`,`-switch`,I,F,e,t),a=E(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:c,mergedDisabledRef:u}=a,d=T(e.defaultValue),f=_(e,`value`),p=M(f,d),h=l(()=>p.value===e.checkedValue),g=T(!1),v=T(!1),y=l(()=>{let{railStyle:t}=e;if(t)return t({focused:v.value,checked:h.value})});function S(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:s,nTriggerFormChange:c}=a;n&&o(n,t),i&&o(i,t),r&&o(r,t),d.value=t,s(),c()}function C(){let{nTriggerFormFocus:e}=a;e()}function w(){let{nTriggerFormBlur:e}=a;e()}function D(){e.loading||u.value||(p.value===e.checkedValue?S(e.uncheckedValue):S(e.checkedValue))}function O(){v.value=!0,C()}function A(){v.value=!1,w(),g.value=!1}function N(t){e.loading||u.value||t.key===` `&&(p.value===e.checkedValue?S(e.uncheckedValue):S(e.checkedValue),g.value=!1)}function P(t){e.loading||u.value||t.key===` `&&(t.preventDefault(),g.value=!0)}let L=l(()=>{let{value:e}=c,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:a,buttonColor:o,boxShadowFocus:s,loadingColor:l,textColor:u,iconColor:d,[x(`buttonHeight`,e)]:f,[x(`buttonWidth`,e)]:p,[x(`buttonWidthPressed`,e)]:h,[x(`railHeight`,e)]:g,[x(`railWidth`,e)]:_,[x(`railBorderRadius`,e)]:v,[x(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:S}}=i.value,C,w,T;return z?(C=`calc((${g} - ${f}) / 2)`,w=`max(${g}, ${f})`,T=`max(${_}, calc(${_} + ${f} - ${g}))`):(C=m((b(g)-b(f))/2),w=m(Math.max(b(g),b(f))),T=b(g)>b(f)?_:m(b(_)+b(f)-b(g))),{"--n-bezier":S,"--n-button-border-radius":y,"--n-button-box-shadow":a,"--n-button-color":o,"--n-button-width":p,"--n-button-width-pressed":h,"--n-button-height":f,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":g,"--n-rail-width":_,"--n-width":T,"--n-box-shadow-focus":s,"--n-loading-color":l,"--n-text-color":u,"--n-icon-color":d}}),R=n?j(`switch`,l(()=>c.value[0]),L,e):void 0;return{handleClick:D,handleBlur:A,handleFocus:O,handleKeyup:N,handleKeydown:P,mergedRailStyle:y,pressed:g,mergedClsPrefix:t,mergedValue:p,checked:h,mergedDisabled:u,cssVars:n?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:o,mergedRailStyle:s,onRender:l,$slots:u}=this;l?.();let{checked:f,unchecked:m,icon:h,"checked-icon":_,"unchecked-icon":v}=u,b=!(y(h)&&y(_)&&y(v));return d(),r(`div`,{role:`switch`,"aria-checked":o,class:S([`${e}-switch`,this.themeClass,b&&`${e}-switch--icon`,o&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:p(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[n(`div`,{class:S(`${e}-switch__rail`),"aria-hidden":`true`,style:p(s)},[g(()=>a(f,t=>a(m,i=>t||i?(d(),r(`div`,{key:4,"aria-hidden":!0,class:S(`${e}-switch__children-placeholder`)},[n(`div`,{class:S(`${e}-switch__rail-placeholder`)},[n(`div`,{class:S(`${e}-switch__button-placeholder`)},null,2),g(()=>t)],2),n(`div`,{class:S(`${e}-switch__rail-placeholder`)},[n(`div`,{class:S(`${e}-switch__button-placeholder`)},null,2),g(()=>i)],2)],2)):null))),n(`div`,{class:S(`${e}-switch__button`)},[g(()=>a(h,t=>a(_,n=>a(v,a=>(d(),D(c,null,{default:()=>this.loading?(d(),D(A,i({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(n||t)?(d(),r(`div`,{class:S(`${e}-switch__button-icon`),key:n?`checked-icon`:`icon`},[g(()=>n||t)],2)):!this.checked&&(a||t)?(d(),r(`div`,{class:S(`${e}-switch__button-icon`),key:a?`unchecked-icon`:`icon`},[g(()=>a||t)],2)):null},1024)))))),g(()=>a(f,t=>t&&(d(),r(`div`,{key:`checked`,class:S(`${e}-switch__checked`)},[g(()=>t)],2)))),g(()=>a(m,t=>t&&(d(),r(`div`,{key:`unchecked`,class:S(`${e}-switch__unchecked`)},[g(()=>t)],2))))],2)],6)],46,L)}});export{B as t};