import{At as e,J as t,Jt as n,Q as r,U as i,Ut as a,X as o,Y as s,bt as c,dt as l,it as u,lt as d,st as f,xt as p}from"./endpoints-B5qu1zMG.js";import{$t as m,B as h,Ct as g,F as _,I as v,L as y,N as b,P as x,Xt as S,Zt as C,_t as w,bt as T,en as E,ft as D,j as O,lt as k,nn as A,sn as j,tn as M,ut as N}from"./motion-amoZaQIY.js";import{a as P,c as F,i as I,l as L,m as R,o as z,p as B,r as ee,s as te,t as ne}from"./create-CDGXcugE.js";import{t as re}from"./use-merged-state-BlV20yti.js";import{t as ie}from"./use-keyboard-DSu6bQZp.js";import{t as ae}from"./ChevronRight-gkZdhTLP.js";import{B as oe,J as se,Y as ce,b as V,k as le,q as H,y as ue}from"./index-DetkDE_U.js";function U(e){return t=>{e.value=t?t.$el:null}}var de={padding:`4px 0`,optionIconSizeSmall:`14px`,optionIconSizeMedium:`16px`,optionIconSizeLarge:`16px`,optionIconSizeHuge:`18px`,optionSuffixWidthSmall:`14px`,optionSuffixWidthMedium:`14px`,optionSuffixWidthLarge:`16px`,optionSuffixWidthHuge:`16px`,optionIconSuffixWidthSmall:`32px`,optionIconSuffixWidthMedium:`32px`,optionIconSuffixWidthLarge:`36px`,optionIconSuffixWidthHuge:`36px`,optionPrefixWidthSmall:`14px`,optionPrefixWidthMedium:`14px`,optionPrefixWidthLarge:`16px`,optionPrefixWidthHuge:`16px`,optionIconPrefixWidthSmall:`36px`,optionIconPrefixWidthMedium:`36px`,optionIconPrefixWidthLarge:`40px`,optionIconPrefixWidthHuge:`40px`};function fe(e){let{primaryColor:t,textColor2:n,dividerColor:r,hoverColor:i,popoverColor:a,invertedColor:o,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,heightSmall:f,heightMedium:p,heightLarge:m,heightHuge:g,textColor3:_,opacityDisabled:v}=e;return{...de,optionHeightSmall:f,optionHeightMedium:p,optionHeightLarge:m,optionHeightHuge:g,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,optionTextColor:n,optionTextColorHover:n,optionTextColorActive:t,optionTextColorChildActive:t,color:a,dividerColor:r,suffixColor:n,prefixColor:n,optionColorHover:i,optionColorActive:h(t,{alpha:.1}),groupHeaderTextColor:_,optionTextColorInverted:`#BBB`,optionTextColorHoverInverted:`#FFF`,optionTextColorActiveInverted:`#FFF`,optionTextColorChildActiveInverted:`#FFF`,colorInverted:o,dividerColorInverted:`#BBB`,suffixColorInverted:`#BBB`,prefixColorInverted:`#BBB`,optionColorHoverInverted:t,optionColorActiveInverted:t,groupHeaderTextColorInverted:`#AAA`,optionOpacityDisabled:v}}var W=x({name:`Dropdown`,common:y,peers:{Popover:B},self:fe});function pe(e){let{textColorBase:t,opacity1:n,opacity2:r,opacity3:i,opacity4:a,opacity5:o}=e;return{color:t,opacity1Depth:n,opacity2Depth:r,opacity3Depth:i,opacity4Depth:a,opacity5Depth:o}}var me={name:`Icon`,common:y,self:pe},he=C(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[E(`color-transition`,{transition:`color .3s var(--n-bezier)`}),E(`depth`,{color:`var(--n-color)`},[S(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),S(`svg`,{height:`1em`,width:`1em`})]),ge={..._.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},_e=u({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ge,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=w(e),i=_(`Icon`,`-icon`,he,me,e,n),a=t(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=r?v(`icon`,t(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:n,mergedStyle:t(()=>{let{size:t,color:n}=e;return{fontSize:L(t),color:n}}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&g(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),f(`i`,l(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?f(r):this.$slots.default?.())}}),G=T(`n-dropdown-menu`),K=T(`n-dropdown`),q=T(`n-dropdown-option`),J=u({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return c(),r(`div`,{class:k(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Y(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ve(e){return e.type===`group`}function X(e){return e.type===`divider`}function ye(e){return e.type===`render`}function be(t,n,r){if(!n)return t;let i=a(t.value),o=null;return e(t,e=>{o!==null&&window.clearTimeout(o),e===!0?r&&!r.value?i.value=!0:o=window.setTimeout(()=>{i.value=!0},n):i.value=!1}),i}var Z=u({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=d(K),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:l,mergedShowRef:u,renderLabelRef:f,renderIconRef:m,labelFieldRef:h,childrenFieldRef:g,renderOptionRef:_,nodePropsRef:v,menuPropsRef:y}=n,x=d(q,null),S=d(G),C=d(H),w=t(()=>e.tmNode.rawNode),T=t(()=>{let{value:t}=g;return Y(e.tmNode.rawNode,t)}),E=t(()=>{let{disabled:t}=e.tmNode;return t}),D=be(t(()=>{if(!T.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:a}=r,{value:c}=i,{value:l}=o,{value:u}=s;return a===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,t(()=>i.value===null&&!l.value)),O=t(()=>!!x?.enteringSubmenuRef.value),k=a(!1);p(q,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:n}=e;n.disabled||u.value&&(o.value=t,i.value=null,r.value=n.key)}function N(){let{tmNode:t}=e;t.disabled||u.value&&r.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!u.value)return;let{relatedTarget:n}=t;n&&!R({target:n},`dropdownOption`)&&!R({target:n},`scrollbarRail`)&&(r.value=null)}function F(){let{value:t}=T,{tmNode:r}=e;u.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:h,renderLabel:f,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:y,popoverBody:C,animated:l,mergedShowSubmenu:t(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:b(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:b(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:b(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:_,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:a,siblingHasIcon:s,siblingHasSubmenu:u,renderLabel:d,renderIcon:p,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(n){let e=this.menuProps?.(t,t.children);v=(t=>(c(),o($,l({key:1},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=h?.(t),x=(c(),r(`div`,l({class:[`${a}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[D(()=>f(`div`,l(y,g),[(c(),r(`div`,{class:k([`${a}-dropdown-option-body__prefix`,s&&`${a}-dropdown-option-body__prefix--show-icon`])},[D(()=>[p?p(t):V(t.icon)])],2)),(c(),r(`div`,{"data-dropdown-option":!0,class:k(`${a}-dropdown-option-body__label`)},[d?(c(),r(i,{key:0},[D(()=>d(t))],64)):(c(),r(i,{key:1},[D(()=>V(t[this.labelField]??t.title))],64))],2)),(c(),r(`div`,{"data-dropdown-option":!0,class:k([`${a}-dropdown-option-body__suffix`,u&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(c(),o(_e,{key:0},{_:1,default:N(()=>(c(),o(ae)))})):D(()=>null)],2))])),this.hasSubmenu?(c(),o(F,{key:0},{default:()=>[(c(),o(te,null,{default:()=>(c(),r(`div`,{class:k(`${a}-dropdown-offset-container`)},[(c(),o(z,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(c(),r(`div`,{class:k(`${a}-dropdown-menu-wrapper`)},[e?(c(),o(j,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(c(),r(i,{key:1},[D(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):D(()=>null)],16));return m?m({node:x,option:t}):x}}),xe=u({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=d(G),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=d(K);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:a,renderLabel:o,renderOption:u}=this,{rawNode:d}=this.tmNode,f=(c(),r(`div`,l({class:`${e}-dropdown-option`},a?.(d)),[s(`div`,{class:k(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[s(`div`,{"data-dropdown-option":!0,class:k([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[D(()=>V(d.icon))],2),s(`div`,{class:k(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[o?(c(),r(i,{key:0},[D(()=>o(d))],64)):(c(),r(i,{key:1},[D(()=>V(d.title??d[this.labelField]))],64))],2),s(`div`,{class:k([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return u?u({node:f,option:d}):f}}),Q=u({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:a}=e;return c(),r(i,null,[(c(),o(xe,{clsPrefix:n,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),D(()=>a?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:X(r)?f(J,{clsPrefix:n,key:e.key}):e.isGroup?(g(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(c(),o(Z,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=u({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return f(`div`,t,[e?.()])}}),$=u({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:r}=d(K);p(G,{showIconRef:t(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:t(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Y(e,t));let{rawNode:n}=e;return Y(n,t)})})});let i=a(null);return p(se,null),p(ce,null),p(H,i),{bodyRef:i}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,a=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:ye(i)?(c(),o(Se,{tmNode:r,key:r.key},null,8,[`tmNode`])):X(i)?(c(),o(J,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):ve(i)?(c(),o(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(c(),o(Z,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return c(),r(`div`,{class:k([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(c(),o(le,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>a},1032,[`contentClass`])):(c(),r(i,{key:1},[D(()=>a)],64)),this.showArrow?(c(),r(i,{key:2},[D(()=>P({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):D(()=>null)],2)}}),Ce=C(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ue(),C(`dropdown-option`,`
 position: relative;
 `,[S(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[S(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),C(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[S(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),M(`disabled`,[E(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[m(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),S(`&::before`,`background-color: var(--n-option-color-hover);`)]),E(`active`,`
 color: var(--n-option-text-color-active);
 `,[m(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),S(`&::before`,`background-color: var(--n-option-color-active);`)]),E(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[m(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),E(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),E(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[m(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[E(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),m(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[E(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),C(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),m(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),m(`suffix`,`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[E(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),C(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),C(`dropdown-menu`,`pointer-events: all;`)]),C(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),C(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),C(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),S(`>`,[C(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),M(`scrollable`,`
 padding: var(--n-padding);
 `),E(`scrollable`,[m(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(I),Ee={...I,...we,..._.props},De=u({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(r){let i=a(!1),o=re(n(r,`show`),i),s=t(()=>{let{keyField:e,childrenField:t}=r;return ne(r.options,{getKey(t){return t[e]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[t]}})}),c=t(()=>s.value.treeNodes),l=a(null),u=a(null),d=a(null),f=t(()=>l.value??u.value??d.value??null),m=t(()=>s.value.getPath(f.value).keyPath),h=t(()=>s.value.getPath(r.value).keyPath),g=b(()=>r.keyboard&&o.value);ie({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:j}},g);let{mergedClsPrefixRef:y,inlineThemeDisabled:x,mergedComponentPropsRef:S}=w(r),C=t(()=>r.size||S?.value?.Dropdown?.size||`medium`),T=_(`Dropdown`,`-dropdown`,Ce,W,r,y);p(K,{labelFieldRef:n(r,`labelField`),childrenFieldRef:n(r,`childrenField`),renderLabelRef:n(r,`renderLabel`),renderIconRef:n(r,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:m,activeKeyPathRef:h,animatedRef:n(r,`animated`),mergedShowRef:o,nodePropsRef:n(r,`nodeProps`),renderOptionRef:n(r,`renderOption`),menuPropsRef:n(r,`menuProps`),doSelect:E,doUpdateShow:D}),e(o,e=>{!r.animated&&!e&&k()});function E(e,t){let{onSelect:n}=r;n&&O(n,e,t)}function D(e){let{"onUpdate:show":t,onUpdateShow:n}=r;t&&O(t,e),n&&O(n,e),i.value=e}function k(){l.value=null,u.value=null,d.value=null}function j(){D(!1)}function M(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&o.value&&(E(e.key,e.rawNode),D(!1))}function L(){let{value:e}=s,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=s,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let z=t(()=>{let{inverted:e}=r,t=C.value,{common:{cubicBezierEaseInOut:n},self:i}=T.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[A(`optionIconSuffixWidth`,t)]:l,[A(`optionSuffixWidth`,t)]:u,[A(`optionIconPrefixWidth`,t)]:d,[A(`optionPrefixWidth`,t)]:f,[A(`fontSize`,t)]:p,[A(`optionHeight`,t)]:m,[A(`optionIconSize`,t)]:h}=i,g={"--n-bezier":n,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return e?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=x?v(`dropdown`,t(()=>`${C.value[0]}${r.inverted?`i`:``}`),z,r):void 0;return{mergedClsPrefix:y,mergedTheme:T,mergedSize:C,tmNodes:c,mergedShow:o,handleAfterLeave:()=>{r.animated&&k()},doUpdateShow:D,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},c={ref:U(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return f($,l(this.$attrs,c,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return c(),o(ee,oe(this.$props,Te,n),{_:1,trigger:N(()=>this.$slots.default?.())},16)}});export{W as n,U as r,De as t};