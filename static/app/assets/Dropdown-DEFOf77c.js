import{H as e,Ht as t,J as n,Y as r,Z as i,bt as a,ct as o,kt as s,ot as c,q as l,qt as u,rt as d,ut as f,yt as p}from"./endpoints-kLXNUVGT.js";import{$t as m,B as h,Ct as g,F as _,I as v,L as y,N as b,P as x,Xt as S,Zt as C,_t as w,bt as T,en as E,ft as D,j as O,lt as k,nn as A,sn as j,tn as M,ut as N}from"./motion-CI5wB-09.js";import{a as P,c as F,f as I,i as L,o as R,p as z,r as B,s as ee,t as te}from"./create-InMjD4KV.js";import{t as ne}from"./use-merged-state-C8M42QZO.js";import{t as re}from"./use-keyboard-OZwpoca3.js";import{t as ie}from"./format-length-BwSo_EUP.js";import{t as ae}from"./ChevronRight-CjkKh1ei.js";import{B as oe,J as se,Y as ce,b as V,k as le,q as H,y as ue}from"./index-DJq1mBng.js";function U(e){return t=>{e.value=t?t.$el:null}}var de={padding:`4px 0`,optionIconSizeSmall:`14px`,optionIconSizeMedium:`16px`,optionIconSizeLarge:`16px`,optionIconSizeHuge:`18px`,optionSuffixWidthSmall:`14px`,optionSuffixWidthMedium:`14px`,optionSuffixWidthLarge:`16px`,optionSuffixWidthHuge:`16px`,optionIconSuffixWidthSmall:`32px`,optionIconSuffixWidthMedium:`32px`,optionIconSuffixWidthLarge:`36px`,optionIconSuffixWidthHuge:`36px`,optionPrefixWidthSmall:`14px`,optionPrefixWidthMedium:`14px`,optionPrefixWidthLarge:`16px`,optionPrefixWidthHuge:`16px`,optionIconPrefixWidthSmall:`36px`,optionIconPrefixWidthMedium:`36px`,optionIconPrefixWidthLarge:`40px`,optionIconPrefixWidthHuge:`40px`};function fe(e){let{primaryColor:t,textColor2:n,dividerColor:r,hoverColor:i,popoverColor:a,invertedColor:o,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,heightSmall:f,heightMedium:p,heightLarge:m,heightHuge:g,textColor3:_,opacityDisabled:v}=e;return{...de,optionHeightSmall:f,optionHeightMedium:p,optionHeightLarge:m,optionHeightHuge:g,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,optionTextColor:n,optionTextColorHover:n,optionTextColorActive:t,optionTextColorChildActive:t,color:a,dividerColor:r,suffixColor:n,prefixColor:n,optionColorHover:i,optionColorActive:h(t,{alpha:.1}),groupHeaderTextColor:_,optionTextColorInverted:`#BBB`,optionTextColorHoverInverted:`#FFF`,optionTextColorActiveInverted:`#FFF`,optionTextColorChildActiveInverted:`#FFF`,colorInverted:o,dividerColorInverted:`#BBB`,suffixColorInverted:`#BBB`,prefixColorInverted:`#BBB`,optionColorHoverInverted:t,optionColorActiveInverted:t,groupHeaderTextColorInverted:`#AAA`,optionOpacityDisabled:v}}var W=x({name:`Dropdown`,common:y,peers:{Popover:I},self:fe});function pe(e){let{textColorBase:t,opacity1:n,opacity2:r,opacity3:i,opacity4:a,opacity5:o}=e;return{color:t,opacity1Depth:n,opacity2Depth:r,opacity3Depth:i,opacity4Depth:a,opacity5Depth:o}}var me={name:`Icon`,common:y,self:pe},he=C(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[E(`color-transition`,{transition:`color .3s var(--n-bezier)`}),E(`depth`,{color:`var(--n-color)`},[S(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),S(`svg`,{height:`1em`,width:`1em`})]),ge={..._.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},_e=d({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ge,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=w(e),r=_(`Icon`,`-icon`,he,me,e,t),i=l(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?v(`icon`,l(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:l(()=>{let{size:t,color:n}=e;return{fontSize:ie(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&g(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),c(`i`,f(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?c(r):this.$slots.default?.())}}),G=T(`n-dropdown-menu`),K=T(`n-dropdown`),q=T(`n-dropdown-option`),J=d({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return p(),i(`div`,{class:k(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Y(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ve(e){return e.type===`group`}function X(e){return e.type===`divider`}function ye(e){return e.type===`render`}function be(e,n,r){if(!n)return e;let i=t(e.value),a=null;return s(e,e=>{a!==null&&window.clearTimeout(a),e===!0?r&&!r.value?i.value=!0:a=window.setTimeout(()=>{i.value=!0},n):i.value=!1}),i}var Z=d({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=o(K),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:s,pendingKeyPathRef:c,activeKeyPathRef:u,animatedRef:d,mergedShowRef:f,renderLabelRef:p,renderIconRef:m,labelFieldRef:h,childrenFieldRef:g,renderOptionRef:_,nodePropsRef:v,menuPropsRef:y}=n,x=o(q,null),S=o(G),C=o(H),w=l(()=>e.tmNode.rawNode),T=l(()=>{let{value:t}=g;return Y(e.tmNode.rawNode,t)}),E=l(()=>{let{disabled:t}=e.tmNode;return t}),D=be(l(()=>{if(!T.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:a}=r,{value:o}=i,{value:l}=s,{value:u}=c;return a===null?o===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,l(()=>i.value===null&&!d.value)),O=l(()=>!!x?.enteringSubmenuRef.value),k=t(!1);a(q,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:n}=e;n.disabled||f.value&&(s.value=t,i.value=null,r.value=n.key)}function N(){let{tmNode:t}=e;t.disabled||f.value&&r.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!f.value)return;let{relatedTarget:n}=t;n&&!z({target:n},`dropdownOption`)&&!z({target:n},`scrollbarRail`)&&(r.value=null)}function F(){let{value:t}=T,{tmNode:r}=e;f.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:h,renderLabel:p,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:y,popoverBody:C,animated:d,mergedShowSubmenu:l(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:b(()=>{let{value:t}=c,{key:n}=e.tmNode;return t.includes(n)}),childActive:b(()=>{let{value:t}=u,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:b(()=>{let{value:t}=u,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:_,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:t,rawNode:n,mergedShowSubmenu:a,clsPrefix:o,siblingHasIcon:s,siblingHasSubmenu:l,renderLabel:u,renderIcon:d,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(a){let e=this.menuProps?.(n,n.children);v=(t=>(p(),r($,f({key:1},e,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=h?.(n),x=(p(),i(`div`,f({class:[`${o}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[D(()=>c(`div`,f(y,g),[(p(),i(`div`,{class:k([`${o}-dropdown-option-body__prefix`,s&&`${o}-dropdown-option-body__prefix--show-icon`])},[D(()=>[d?d(n):V(n.icon)])],2)),(p(),i(`div`,{"data-dropdown-option":!0,class:k(`${o}-dropdown-option-body__label`)},[u?(p(),i(e,{key:0},[D(()=>u(n))],64)):(p(),i(e,{key:1},[D(()=>V(n[this.labelField]??n.title))],64))],2)),(p(),i(`div`,{"data-dropdown-option":!0,class:k([`${o}-dropdown-option-body__suffix`,l&&`${o}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(p(),r(_e,{key:0},{_:1,default:N(()=>(p(),r(ae)))})):D(()=>null)],2))])),this.hasSubmenu?(p(),r(F,{key:0},{default:()=>[(p(),r(ee,null,{default:()=>(p(),i(`div`,{class:k(`${o}-dropdown-offset-container`)},[(p(),r(R,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(p(),i(`div`,{class:k(`${o}-dropdown-menu-wrapper`)},[t?(p(),r(j,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(p(),i(e,{key:1},[D(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):D(()=>null)],16));return m?m({node:x,option:n}):x}}),xe=d({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=o(G),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=o(K);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:t,hasSubmenu:r,showIcon:a,nodeProps:o,renderLabel:s,renderOption:c}=this,{rawNode:l}=this.tmNode,u=(p(),i(`div`,f({class:`${t}-dropdown-option`},o?.(l)),[n(`div`,{class:k(`${t}-dropdown-option-body ${t}-dropdown-option-body--group`)},[n(`div`,{"data-dropdown-option":!0,class:k([`${t}-dropdown-option-body__prefix`,a&&`${t}-dropdown-option-body__prefix--show-icon`])},[D(()=>V(l.icon))],2),n(`div`,{class:k(`${t}-dropdown-option-body__label`),"data-dropdown-option":!0},[s?(p(),i(e,{key:0},[D(()=>s(l))],64)):(p(),i(e,{key:1},[D(()=>V(l.title??l[this.labelField]))],64))],2),n(`div`,{class:k([`${t}-dropdown-option-body__suffix`,r&&`${t}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return c?c({node:u,option:l}):u}}),Q=d({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:t,parentKey:n,clsPrefix:a}=this,{children:o}=t;return p(),i(e,null,[(p(),r(xe,{clsPrefix:a,tmNode:t,key:t.key},null,8,[`clsPrefix`,`tmNode`])),D(()=>o?.map(e=>{let{rawNode:t}=e;return t.show===!1?null:X(t)?c(J,{clsPrefix:a,key:e.key}):e.isGroup?(g(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(p(),r(Z,{clsPrefix:a,tmNode:e,parentKey:n,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=d({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return c(`div`,t,[e?.()])}}),$=d({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:r}=o(K);a(G,{showIconRef:l(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:l(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Y(e,t));let{rawNode:n}=e;return Y(n,t)})})});let i=t(null);return a(se,null),a(ce,null),a(H,i),{bodyRef:i}},render(){let{parentKey:t,clsPrefix:n,scrollable:a}=this,o=this.tmNodes.map(e=>{let{rawNode:i}=e;return i.show===!1?null:ye(i)?(p(),r(Se,{tmNode:e,key:e.key},null,8,[`tmNode`])):X(i)?(p(),r(J,{clsPrefix:n,key:e.key},null,8,[`clsPrefix`])):ve(i)?(p(),r(Q,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(p(),r(Z,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key,props:i.props,scrollable:a},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return p(),i(`div`,{class:k([`${n}-dropdown-menu`,a&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[a?(p(),r(le,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>o},1032,[`contentClass`])):(p(),i(e,{key:1},[D(()=>o)],64)),this.showArrow?(p(),i(e,{key:2},[D(()=>P({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):D(()=>null)],2)}}),Ce=C(`dropdown-menu`,`
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
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(L),Ee={...L,...we,..._.props},De=d({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let n=t(!1),r=ne(u(e,`show`),n),i=l(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=l(()=>i.value.treeNodes),c=t(null),d=t(null),f=t(null),p=l(()=>c.value??d.value??f.value??null),m=l(()=>i.value.getPath(p.value).keyPath),h=l(()=>i.value.getPath(e.value).keyPath),g=b(()=>e.keyboard&&r.value);re({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:j}},g);let{mergedClsPrefixRef:y,inlineThemeDisabled:x,mergedComponentPropsRef:S}=w(e),C=l(()=>e.size||S?.value?.Dropdown?.size||`medium`),T=_(`Dropdown`,`-dropdown`,Ce,W,e,y);a(K,{labelFieldRef:u(e,`labelField`),childrenFieldRef:u(e,`childrenField`),renderLabelRef:u(e,`renderLabel`),renderIconRef:u(e,`renderIcon`),hoverKeyRef:c,keyboardKeyRef:d,lastToggledSubmenuKeyRef:f,pendingKeyPathRef:m,activeKeyPathRef:h,animatedRef:u(e,`animated`),mergedShowRef:r,nodePropsRef:u(e,`nodeProps`),renderOptionRef:u(e,`renderOption`),menuPropsRef:u(e,`menuProps`),doSelect:E,doUpdateShow:D}),s(r,t=>{!e.animated&&!t&&k()});function E(t,n){let{onSelect:r}=e;r&&O(r,t,n)}function D(t){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&O(r,t),i&&O(i,t),n.value=t}function k(){c.value=null,d.value=null,f.value=null}function j(){D(!1)}function M(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&r.value&&(E(e.key,e.rawNode),D(!1))}function L(){let{value:e}=i,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=i,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(c.value=null,d.value=r)}let z=l(()=>{let{inverted:t}=e,n=C.value,{common:{cubicBezierEaseInOut:r},self:i}=T.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[A(`optionIconSuffixWidth`,n)]:l,[A(`optionSuffixWidth`,n)]:u,[A(`optionIconPrefixWidth`,n)]:d,[A(`optionPrefixWidth`,n)]:f,[A(`fontSize`,n)]:p,[A(`optionHeight`,n)]:m,[A(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=x?v(`dropdown`,l(()=>`${C.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:y,mergedTheme:T,mergedSize:C,tmNodes:o,mergedShow:r,handleAfterLeave:()=>{e.animated&&k()},doUpdateShow:D,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:U(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return c($,f(this.$attrs,l,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return p(),r(B,oe(this.$props,Te,n),{_:1,trigger:N(()=>this.$slots.default?.())},16)}});export{W as n,U as r,De as t};