import{Ct as e,G as t,H as n,I as r,It as i,U as a,V as o,Vt as s,Z as c,et as l,it as u,mt as d,nt as f,pt as p}from"./endpoints-MMH2_YQj.js";import{A as m,D as h,Gt as g,Jt as _,Kt as v,T as y,Xt as b,Yt as x,Zt as S,at as C,ft as w,ht as T,it as E,k as D,nn as O,st as k,vt as A}from"./createLucideIcon-Dgil5eM1.js";import{a as j,c as M,f as N,i as P,o as F,r as I,s as L,t as ee}from"./create-DN8YPFSW.js";import{n as R}from"./Scrollbar-cO_MZVQX.js";import{t as te}from"./use-merged-state-BnSBV-cQ.js";import{t as z}from"./use-keyboard-BJJkn48_.js";import{t as B}from"./format-length-BwSo_EUP.js";import{t as V}from"./ChevronRight-CHEBJyxX.js";import{D as ne,M as re,U as H,W as U,dt as W,ft as ie,ot as ae,pt as oe}from"./index-ChakMpLN.js";function G(e){return t=>{e.value=t?t.$el:null}}var se=v(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[x(`color-transition`,{transition:`color .3s var(--n-bezier)`}),x(`depth`,{color:`var(--n-color)`},[g(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),g(`svg`,{height:`1em`,width:`1em`})]),ce={...D.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},le=c({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ce,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=w(e),r=D(`Icon`,`-icon`,se,ne,e,t),i=o(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?m(`icon`,o(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:o(()=>{let{size:t,color:n}=e;return{fontSize:B(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&A(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),l(`i`,u(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?l(r):this.$slots.default?.())}}),K=T(`n-dropdown-menu`),q=T(`n-dropdown`),J=T(`n-dropdown-option`),Y=c({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return p(),t(`div`,{class:E(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ue(e){return e.type===`group`}function Z(e){return e.type===`divider`}function de(e){return e.type===`render`}function fe(t,n,r){if(!n)return t;let a=i(t.value),o=null;return e(t,e=>{o!==null&&window.clearTimeout(o),e===!0?r&&!r.value?a.value=!0:o=window.setTimeout(()=>{a.value=!0},n):a.value=!1}),a}var Q=c({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=f(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:l,mergedShowRef:u,renderLabelRef:p,renderIconRef:m,labelFieldRef:g,childrenFieldRef:_,renderOptionRef:v,nodePropsRef:y,menuPropsRef:b}=t,x=f(J,null),S=f(K),C=f(W),w=o(()=>e.tmNode.rawNode),T=o(()=>{let{value:t}=_;return X(e.tmNode.rawNode,t)}),E=o(()=>{let{disabled:t}=e.tmNode;return t}),D=fe(o(()=>{if(!T.value)return!1;let{key:t,disabled:i}=e.tmNode;if(i)return!1;let{value:o}=n,{value:c}=r,{value:l}=a,{value:u}=s;return o===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,o(()=>r.value===null&&!l.value)),O=o(()=>!!x?.enteringSubmenuRef.value),k=i(!1);d(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:i}=e;i.disabled||u.value&&(a.value=t,r.value=null,n.value=i.key)}function P(){let{tmNode:t}=e;t.disabled||u.value&&n.value!==t.key&&M()}function F(t){if(e.tmNode.disabled||!u.value)return;let{relatedTarget:r}=t;r&&!N({target:r},`dropdownOption`)&&!N({target:r},`scrollbarRail`)&&(n.value=null)}function I(){let{value:n}=T,{tmNode:r}=e;u.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:g,renderLabel:p,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:l,mergedShowSubmenu:o(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:h(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:h(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:h(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:v,nodeProps:y,handleClick:I,handleMouseMove:P,handleMouseEnter:M,handleMouseLeave:F,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:n,mergedShowSubmenu:i,clsPrefix:o,siblingHasIcon:s,siblingHasSubmenu:c,renderLabel:d,renderIcon:f,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(i){let e=this.menuProps?.(n,n.children);v=(t=>(p(),a($,u({key:1},e,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=h?.(n),x=(p(),t(`div`,u({class:[`${o}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[k(()=>l(`div`,u(y,g),[(p(),t(`div`,{class:E([`${o}-dropdown-option-body__prefix`,s&&`${o}-dropdown-option-body__prefix--show-icon`])},[k(()=>[f?f(n):U(n.icon)])],2)),(p(),t(`div`,{"data-dropdown-option":!0,class:E(`${o}-dropdown-option-body__label`)},[d?(p(),t(r,{key:0},[k(()=>d(n))],64)):(p(),t(r,{key:1},[k(()=>U(n[this.labelField]??n.title))],64))],2)),(p(),t(`div`,{"data-dropdown-option":!0,class:E([`${o}-dropdown-option-body__suffix`,c&&`${o}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(p(),a(le,{key:0},{_:1,default:C(()=>(p(),a(V)))})):k(()=>null)],2))])),this.hasSubmenu?(p(),a(M,{key:0},{default:()=>[(p(),a(L,null,{default:()=>(p(),t(`div`,{class:E(`${o}-dropdown-offset-container`)},[(p(),a(F,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(p(),t(`div`,{class:E(`${o}-dropdown-menu-wrapper`)},[e?(p(),a(O,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(p(),t(r,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return m?m({node:x,option:n}):x}}),pe=c({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=f(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=f(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:i,showIcon:a,nodeProps:o,renderLabel:s,renderOption:c}=this,{rawNode:l}=this.tmNode,d=(p(),t(`div`,u({class:`${e}-dropdown-option`},o?.(l)),[n(`div`,{class:E(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[n(`div`,{"data-dropdown-option":!0,class:E([`${e}-dropdown-option-body__prefix`,a&&`${e}-dropdown-option-body__prefix--show-icon`])},[k(()=>U(l.icon))],2),n(`div`,{class:E(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[s?(p(),t(r,{key:0},[k(()=>s(l))],64)):(p(),t(r,{key:1},[k(()=>U(l.title??l[this.labelField]))],64))],2),n(`div`,{class:E([`${e}-dropdown-option-body__suffix`,i&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return c?c({node:d,option:l}):d}}),me=c({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:n,clsPrefix:i}=this,{children:o}=e;return p(),t(r,null,[(p(),a(pe,{clsPrefix:i,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>o?.map(e=>{let{rawNode:t}=e;return t.show===!1?null:Z(t)?l(Y,{clsPrefix:i,key:e.key}):e.isGroup?(A(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(p(),a(Q,{clsPrefix:i,tmNode:e,parentKey:n,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),he=c({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return l(`div`,t,[e?.()])}}),$=c({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=f(q);d(K,{showIconRef:o(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:o(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=i(null);return d(ie,null),d(oe,null),d(W,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:n,scrollable:i}=this,o=this.tmNodes.map(t=>{let{rawNode:r}=t;return r.show===!1?null:de(r)?(p(),a(he,{tmNode:t,key:t.key},null,8,[`tmNode`])):Z(r)?(p(),a(Y,{clsPrefix:n,key:t.key},null,8,[`clsPrefix`])):ue(r)?(p(),a(me,{clsPrefix:n,tmNode:t,parentKey:e,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(p(),a(Q,{clsPrefix:n,tmNode:t,parentKey:e,key:t.key,props:r.props,scrollable:i},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return p(),t(`div`,{class:E([`${n}-dropdown-menu`,i&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[i?(p(),a(R,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>o},1032,[`contentClass`])):(p(),t(r,{key:1},[k(()=>o)],64)),this.showArrow?(p(),t(r,{key:2},[k(()=>j({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),ge=v(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[H(),v(`dropdown-option`,`
 position: relative;
 `,[g(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[g(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),v(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[g(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),b(`disabled`,[x(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),g(`&::before`,`background-color: var(--n-option-color-hover);`)]),x(`active`,`
 color: var(--n-option-text-color-active);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),g(`&::before`,`background-color: var(--n-option-color-active);`)]),x(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),x(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),x(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[_(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[x(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),_(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[x(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),v(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),_(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),_(`suffix`,`
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
 `,[x(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),v(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),v(`dropdown-menu`,`pointer-events: all;`)]),v(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),v(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),v(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),g(`>`,[v(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),b(`scrollable`,`
 padding: var(--n-padding);
 `),x(`scrollable`,[_(`content`,`
 padding: var(--n-padding);
 `)])]),_e={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},ve=Object.keys(P),ye={...P,..._e,...D.props},be=c({name:`Dropdown`,inheritAttrs:!1,props:ye,setup(t){let n=i(!1),r=te(s(t,`show`),n),a=o(()=>{let{keyField:e,childrenField:n}=t;return ee(t.options,{getKey(t){return t[e]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),c=o(()=>a.value.treeNodes),l=i(null),u=i(null),f=i(null),p=o(()=>l.value??u.value??f.value??null),g=o(()=>a.value.getPath(p.value).keyPath),_=o(()=>a.value.getPath(t.value).keyPath),v=h(()=>t.keyboard&&r.value);z({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:j}},v);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:C}=w(t),T=o(()=>t.size||C?.value?.Dropdown?.size||`medium`),E=D(`Dropdown`,`-dropdown`,ge,re,t,b);d(q,{labelFieldRef:s(t,`labelField`),childrenFieldRef:s(t,`childrenField`),renderLabelRef:s(t,`renderLabel`),renderIconRef:s(t,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:f,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:s(t,`animated`),mergedShowRef:r,nodePropsRef:s(t,`nodeProps`),renderOptionRef:s(t,`renderOption`),menuPropsRef:s(t,`menuProps`),doSelect:O,doUpdateShow:k}),e(r,e=>{!t.animated&&!e&&A()});function O(e,n){let{onSelect:r}=t;r&&y(r,e,n)}function k(e){let{"onUpdate:show":r,onUpdateShow:i}=t;r&&y(r,e),i&&y(i,e),n.value=e}function A(){l.value=null,u.value=null,f.value=null}function j(){k(!1)}function M(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&r.value&&(O(e.key,e.rawNode),k(!1))}function L(){let{value:e}=a,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=a,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let B=o(()=>{let{inverted:e}=t,n=T.value,{common:{cubicBezierEaseInOut:r},self:i}=E.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[S(`optionIconSuffixWidth`,n)]:l,[S(`optionSuffixWidth`,n)]:u,[S(`optionIconPrefixWidth`,n)]:d,[S(`optionPrefixWidth`,n)]:f,[S(`fontSize`,n)]:p,[S(`optionHeight`,n)]:m,[S(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return e?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),V=x?m(`dropdown`,o(()=>`${T.value[0]}${t.inverted?`i`:``}`),B,t):void 0;return{mergedClsPrefix:b,mergedTheme:E,mergedSize:T,tmNodes:c,mergedShow:r,handleAfterLeave:()=>{t.animated&&A()},doUpdateShow:k,cssVars:x?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},c={ref:G(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return l($,u(this.$attrs,c,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return p(),a(I,ae(this.$props,ve,n),{_:1,trigger:C(()=>this.$slots.default?.())},16)}});export{G as n,be as t};