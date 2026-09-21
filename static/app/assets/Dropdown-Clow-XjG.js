import{H as e,Ht as t,K as n,L as r,Lt as i,Q as a,U as o,W as s,at as c,ht as l,mt as u,rt as d,tt as f,wt as p}from"./endpoints-BhTSb8lj.js";import{A as m,D as h,Gt as g,Jt as _,Kt as v,T as y,Xt as b,Yt as x,Zt as S,at as C,ft as w,ht as T,it as E,k as D,nn as O,st as k,vt as A}from"./createLucideIcon-Byg0Q1WZ.js";import{a as j,c as M,f as N,i as P,o as F,r as I,s as L,t as ee}from"./create-BFrjrzjd.js";import{n as R}from"./Scrollbar-Cxvob6a1.js";import{t as te}from"./use-merged-state-D-29Gt4l.js";import{t as z}from"./use-keyboard-DNBgxPtI.js";import{t as B}from"./format-length-BwSo_EUP.js";import{t as V}from"./ChevronRight-CVANZsAO.js";import{D as ne,M as re,U as H,W as U,dt as W,ft as ie,ot as ae,pt as oe}from"./index-6bqWpmDa.js";function G(e){return t=>{e.value=t?t.$el:null}}var se=v(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[x(`color-transition`,{transition:`color .3s var(--n-bezier)`}),x(`depth`,{color:`var(--n-color)`},[g(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),g(`svg`,{height:`1em`,width:`1em`})]),ce={...D.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},le=a({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ce,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=w(t),i=D(`Icon`,`-icon`,se,ne,t,n),a=e(()=>{let{depth:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(e!==void 0){let{color:t,[`opacity${e}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":t,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=r?m(`icon`,e(()=>`${t.depth||`d`}`),a,t):void 0;return{mergedClsPrefix:n,mergedStyle:e(()=>{let{size:e,color:n}=t;return{fontSize:B(e),color:n}}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&A(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),f(`i`,c(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?f(r):this.$slots.default?.())}}),K=T(`n-dropdown-menu`),q=T(`n-dropdown`),J=T(`n-dropdown-option`),Y=a({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return u(),n(`div`,{class:E(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ue(e){return e.type===`group`}function Z(e){return e.type===`divider`}function de(e){return e.type===`render`}function fe(e,t,n){if(!t)return e;let r=i(e.value),a=null;return p(e,e=>{a!==null&&window.clearTimeout(a),e===!0?n&&!n.value?r.value=!0:a=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=a({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(t){let n=d(q),{hoverKeyRef:r,keyboardKeyRef:a,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:u,mergedShowRef:f,renderLabelRef:p,renderIconRef:m,labelFieldRef:g,childrenFieldRef:_,renderOptionRef:v,nodePropsRef:y,menuPropsRef:b}=n,x=d(J,null),S=d(K),C=d(W),w=e(()=>t.tmNode.rawNode),T=e(()=>{let{value:e}=_;return X(t.tmNode.rawNode,e)}),E=e(()=>{let{disabled:e}=t.tmNode;return e}),D=fe(e(()=>{if(!T.value)return!1;let{key:e,disabled:n}=t.tmNode;if(n)return!1;let{value:i}=r,{value:c}=a,{value:l}=o,{value:u}=s;return i===null?c===null?l!==null&&u.includes(e):u.includes(e)&&u[u.length-1]!==e:u.includes(e)}),300,e(()=>a.value===null&&!u.value)),O=e(()=>!!x?.enteringSubmenuRef.value),k=i(!1);l(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:e,tmNode:n}=t;n.disabled||f.value&&(o.value=e,a.value=null,r.value=n.key)}function P(){let{tmNode:e}=t;e.disabled||f.value&&r.value!==e.key&&M()}function F(e){if(t.tmNode.disabled||!f.value)return;let{relatedTarget:n}=e;n&&!N({target:n},`dropdownOption`)&&!N({target:n},`scrollbarRail`)&&(r.value=null)}function I(){let{value:e}=T,{tmNode:r}=t;f.value&&!e&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:g,renderLabel:p,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:u,mergedShowSubmenu:e(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:h(()=>{let{value:e}=s,{key:n}=t.tmNode;return e.includes(n)}),childActive:h(()=>{let{value:e}=c,{key:n}=t.tmNode,r=e.findIndex(e=>n===e);return r!==-1&&r<e.length-1}),active:h(()=>{let{value:e}=c,{key:n}=t.tmNode,r=e.findIndex(e=>n===e);return r!==-1&&r===e.length-1}),mergedDisabled:E,renderOption:v,nodeProps:y,handleClick:I,handleMouseMove:P,handleMouseEnter:M,handleMouseLeave:F,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:l,renderLabel:d,renderIcon:p,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(i){let e=this.menuProps?.(t,t.children);v=(t=>(u(),s($,c({key:1},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=h?.(t),x=(u(),n(`div`,c({class:[`${a}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[k(()=>f(`div`,c(y,g),[(u(),n(`div`,{class:E([`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`])},[k(()=>[p?p(t):U(t.icon)])],2)),(u(),n(`div`,{"data-dropdown-option":!0,class:E(`${a}-dropdown-option-body__label`)},[d?(u(),n(r,{key:0},[k(()=>d(t))],64)):(u(),n(r,{key:1},[k(()=>U(t[this.labelField]??t.title))],64))],2)),(u(),n(`div`,{"data-dropdown-option":!0,class:E([`${a}-dropdown-option-body__suffix`,l&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(u(),s(le,{key:0},{_:1,default:C(()=>(u(),s(V)))})):k(()=>null)],2))])),this.hasSubmenu?(u(),s(M,{key:0},{default:()=>[(u(),s(L,null,{default:()=>(u(),n(`div`,{class:E(`${a}-dropdown-offset-container`)},[(u(),s(F,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(u(),n(`div`,{class:E(`${a}-dropdown-menu-wrapper`)},[e?(u(),s(O,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(u(),n(r,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return m?m({node:x,option:t}):x}}),pe=a({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=d(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=d(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:i,nodeProps:a,renderLabel:s,renderOption:l}=this,{rawNode:d}=this.tmNode,f=(u(),n(`div`,c({class:`${e}-dropdown-option`},a?.(d)),[o(`div`,{class:E(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[o(`div`,{"data-dropdown-option":!0,class:E([`${e}-dropdown-option-body__prefix`,i&&`${e}-dropdown-option-body__prefix--show-icon`])},[k(()=>U(d.icon))],2),o(`div`,{class:E(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[s?(u(),n(r,{key:0},[k(()=>s(d))],64)):(u(),n(r,{key:1},[k(()=>U(d.title??d[this.labelField]))],64))],2),o(`div`,{class:E([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return l?l({node:f,option:d}):f}}),me=a({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:i}=this,{children:a}=e;return u(),n(r,null,[(u(),s(pe,{clsPrefix:i,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>a?.map(e=>{let{rawNode:n}=e;return n.show===!1?null:Z(n)?f(Y,{clsPrefix:i,key:e.key}):e.isGroup?(A(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(u(),s(Q,{clsPrefix:i,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),he=a({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return f(`div`,t,[e?.()])}}),$=a({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(t){let{renderIconRef:n,childrenFieldRef:r}=d(q);l(K,{showIconRef:e(()=>{let e=n.value;return t.tmNodes.some(t=>{if(t.isGroup)return t.children?.some(({rawNode:t})=>e?e(t):t.icon);let{rawNode:n}=t;return e?e(n):n.icon})}),hasSubmenuRef:e(()=>{let{value:e}=r;return t.tmNodes.some(t=>{if(t.isGroup)return t.children?.some(({rawNode:t})=>X(t,e));let{rawNode:n}=t;return X(n,e)})})});let a=i(null);return l(ie,null),l(oe,null),l(W,a),{bodyRef:a}},render(){let{parentKey:e,clsPrefix:t,scrollable:i}=this,a=this.tmNodes.map(n=>{let{rawNode:r}=n;return r.show===!1?null:de(r)?(u(),s(he,{tmNode:n,key:n.key},null,8,[`tmNode`])):Z(r)?(u(),s(Y,{clsPrefix:t,key:n.key},null,8,[`clsPrefix`])):ue(r)?(u(),s(me,{clsPrefix:t,tmNode:n,parentKey:e,key:n.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(u(),s(Q,{clsPrefix:t,tmNode:n,parentKey:e,key:n.key,props:r.props,scrollable:i},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return u(),n(`div`,{class:E([`${t}-dropdown-menu`,i&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[i?(u(),s(R,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>a},1032,[`contentClass`])):(u(),n(r,{key:1},[k(()=>a)],64)),this.showArrow?(u(),n(r,{key:2},[k(()=>j({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),ge=v(`dropdown-menu`,`
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
 `)])]),_e={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},ve=Object.keys(P),ye={...P,..._e,...D.props},be=a({name:`Dropdown`,inheritAttrs:!1,props:ye,setup(n){let r=i(!1),a=te(t(n,`show`),r),o=e(()=>{let{keyField:e,childrenField:t}=n;return ee(n.options,{getKey(t){return t[e]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[t]}})}),s=e(()=>o.value.treeNodes),c=i(null),u=i(null),d=i(null),f=e(()=>c.value??u.value??d.value??null),g=e(()=>o.value.getPath(f.value).keyPath),_=e(()=>o.value.getPath(n.value).keyPath),v=h(()=>n.keyboard&&a.value);z({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:j}},v);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:C}=w(n),T=e(()=>n.size||C?.value?.Dropdown?.size||`medium`),E=D(`Dropdown`,`-dropdown`,ge,re,n,b);l(q,{labelFieldRef:t(n,`labelField`),childrenFieldRef:t(n,`childrenField`),renderLabelRef:t(n,`renderLabel`),renderIconRef:t(n,`renderIcon`),hoverKeyRef:c,keyboardKeyRef:u,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:t(n,`animated`),mergedShowRef:a,nodePropsRef:t(n,`nodeProps`),renderOptionRef:t(n,`renderOption`),menuPropsRef:t(n,`menuProps`),doSelect:O,doUpdateShow:k}),p(a,e=>{!n.animated&&!e&&A()});function O(e,t){let{onSelect:r}=n;r&&y(r,e,t)}function k(e){let{"onUpdate:show":t,onUpdateShow:i}=n;t&&y(t,e),i&&y(i,e),r.value=e}function A(){c.value=null,u.value=null,d.value=null}function j(){k(!1)}function M(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&a.value&&(O(e.key,e.rawNode),k(!1))}function L(){let{value:e}=o,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=o,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(c.value=null,u.value=r)}let B=e(()=>{let{inverted:e}=n,t=T.value,{common:{cubicBezierEaseInOut:r},self:i}=E.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[S(`optionIconSuffixWidth`,t)]:l,[S(`optionSuffixWidth`,t)]:u,[S(`optionIconPrefixWidth`,t)]:d,[S(`optionPrefixWidth`,t)]:f,[S(`fontSize`,t)]:p,[S(`optionHeight`,t)]:m,[S(`optionIconSize`,t)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return e?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),V=x?m(`dropdown`,e(()=>`${T.value[0]}${n.inverted?`i`:``}`),B,n):void 0;return{mergedClsPrefix:b,mergedTheme:E,mergedSize:T,tmNodes:s,mergedShow:a,handleAfterLeave:()=>{n.animated&&A()},doUpdateShow:k,cssVars:x?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:G(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return f($,c(this.$attrs,l,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return u(),s(I,ae(this.$props,ve,n),{_:1,trigger:C(()=>this.$slots.default?.())},16)}});export{G as n,be as t};