import{J as e,K as t,Kt as n,Ot as r,V as i,Vt as a,X as o,at as s,lt as c,nt as l,q as u,st as d,vt as f,yt as p}from"./endpoints-BlW_rAxP.js";import{A as m,D as h,Gt as g,Jt as _,Kt as v,T as y,Xt as b,Yt as x,Zt as S,at as C,ft as w,ht as T,it as E,k as D,nn as O,st as k,vt as A}from"./createLucideIcon-LFURxWOJ.js";import{a as j,c as M,f as N,i as P,o as F,r as I,s as L,t as R}from"./create-vIGd5KlH.js";import{t as ee}from"./use-merged-state-DlIAPIKW.js";import{t as te}from"./use-keyboard-lAqmInLE.js";import{t as z}from"./format-length-BwSo_EUP.js";import{t as B}from"./ChevronRight-onFn5ZfK.js";import{D as V,M as ne,U as re,W as H,bt as U,ft as ie,tt as ae,xt as oe,yt as W}from"./index-D1aJUrAR.js";function G(e){return t=>{e.value=t?t.$el:null}}var se=v(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[x(`color-transition`,{transition:`color .3s var(--n-bezier)`}),x(`depth`,{color:`var(--n-color)`},[g(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),g(`svg`,{height:`1em`,width:`1em`})]),ce={...D.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},le=l({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ce,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=w(e),i=D(`Icon`,`-icon`,se,V,e,n),a=t(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=r?m(`icon`,t(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:n,mergedStyle:t(()=>{let{size:t,color:n}=e;return{fontSize:z(t),color:n}}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&A(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),s(`i`,c(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?s(r):this.$slots.default?.())}}),K=T(`n-dropdown-menu`),q=T(`n-dropdown`),J=T(`n-dropdown-option`),Y=l({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return f(),o(`div`,{class:E(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ue(e){return e.type===`group`}function Z(e){return e.type===`divider`}function de(e){return e.type===`render`}function fe(e,t,n){if(!t)return e;let i=a(e.value),o=null;return r(e,e=>{o!==null&&window.clearTimeout(o),e===!0?n&&!n.value?i.value=!0:o=window.setTimeout(()=>{i.value=!0},t):i.value=!1}),i}var Q=l({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=d(q),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:l,mergedShowRef:u,renderLabelRef:f,renderIconRef:m,labelFieldRef:g,childrenFieldRef:_,renderOptionRef:v,nodePropsRef:y,menuPropsRef:b}=n,x=d(J,null),S=d(K),C=d(W),w=t(()=>e.tmNode.rawNode),T=t(()=>{let{value:t}=_;return X(e.tmNode.rawNode,t)}),E=t(()=>{let{disabled:t}=e.tmNode;return t}),D=fe(t(()=>{if(!T.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:a}=r,{value:c}=i,{value:l}=o,{value:u}=s;return a===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,t(()=>i.value===null&&!l.value)),O=t(()=>!!x?.enteringSubmenuRef.value),k=a(!1);p(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:n}=e;n.disabled||u.value&&(o.value=t,i.value=null,r.value=n.key)}function P(){let{tmNode:t}=e;t.disabled||u.value&&r.value!==t.key&&M()}function F(t){if(e.tmNode.disabled||!u.value)return;let{relatedTarget:n}=t;n&&!N({target:n},`dropdownOption`)&&!N({target:n},`scrollbarRail`)&&(r.value=null)}function I(){let{value:t}=T,{tmNode:r}=e;u.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:g,renderLabel:f,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:l,mergedShowSubmenu:t(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:h(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:h(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:h(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:v,nodeProps:y,handleClick:I,handleMouseMove:P,handleMouseEnter:M,handleMouseLeave:F,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:t,rawNode:n,mergedShowSubmenu:r,clsPrefix:a,siblingHasIcon:l,siblingHasSubmenu:u,renderLabel:d,renderIcon:p,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(r){let t=this.menuProps?.(n,n.children);v=(n=>(f(),e($,c({key:1},t,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=h?.(n),x=(f(),o(`div`,c({class:[`${a}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[k(()=>s(`div`,c(y,g),[(f(),o(`div`,{class:E([`${a}-dropdown-option-body__prefix`,l&&`${a}-dropdown-option-body__prefix--show-icon`])},[k(()=>[p?p(n):H(n.icon)])],2)),(f(),o(`div`,{"data-dropdown-option":!0,class:E(`${a}-dropdown-option-body__label`)},[d?(f(),o(i,{key:0},[k(()=>d(n))],64)):(f(),o(i,{key:1},[k(()=>H(n[this.labelField]??n.title))],64))],2)),(f(),o(`div`,{"data-dropdown-option":!0,class:E([`${a}-dropdown-option-body__suffix`,u&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(f(),e(le,{key:0},{_:1,default:C(()=>(f(),e(B)))})):k(()=>null)],2))])),this.hasSubmenu?(f(),e(M,{key:0},{default:()=>[(f(),e(L,null,{default:()=>(f(),o(`div`,{class:E(`${a}-dropdown-offset-container`)},[(f(),e(F,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(f(),o(`div`,{class:E(`${a}-dropdown-menu-wrapper`)},[t?(f(),e(O,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(f(),o(i,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return m?m({node:x,option:n}):x}}),pe=l({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=d(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=d(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:a,renderOption:s}=this,{rawNode:l}=this.tmNode,d=(f(),o(`div`,c({class:`${e}-dropdown-option`},r?.(l)),[u(`div`,{class:E(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[u(`div`,{"data-dropdown-option":!0,class:E([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[k(()=>H(l.icon))],2),u(`div`,{class:E(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(f(),o(i,{key:0},[k(()=>a(l))],64)):(f(),o(i,{key:1},[k(()=>H(l.title??l[this.labelField]))],64))],2),u(`div`,{class:E([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return s?s({node:d,option:l}):d}}),me=l({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:t,parentKey:n,clsPrefix:r}=this,{children:a}=t;return f(),o(i,null,[(f(),e(pe,{clsPrefix:r,tmNode:t,key:t.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>a?.map(t=>{let{rawNode:i}=t;return i.show===!1?null:Z(i)?s(Y,{clsPrefix:r,key:t.key}):t.isGroup?(A(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(f(),e(Q,{clsPrefix:r,tmNode:t,parentKey:n,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),he=l({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return s(`div`,t,[e?.()])}}),$=l({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:r}=d(q);p(K,{showIconRef:t(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:t(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let i=a(null);return p(U,null),p(oe,null),p(W,i),{bodyRef:i}},render(){let{parentKey:t,clsPrefix:n,scrollable:r}=this,a=this.tmNodes.map(i=>{let{rawNode:a}=i;return a.show===!1?null:de(a)?(f(),e(he,{tmNode:i,key:i.key},null,8,[`tmNode`])):Z(a)?(f(),e(Y,{clsPrefix:n,key:i.key},null,8,[`clsPrefix`])):ue(a)?(f(),e(me,{clsPrefix:n,tmNode:i,parentKey:t,key:i.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(f(),e(Q,{clsPrefix:n,tmNode:i,parentKey:t,key:i.key,props:a.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return f(),o(`div`,{class:E([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(f(),e(ae,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>a},1032,[`contentClass`])):(f(),o(i,{key:1},[k(()=>a)],64)),this.showArrow?(f(),o(i,{key:2},[k(()=>j({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),ge=v(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[re(),v(`dropdown-option`,`
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
 `)])]),_e={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},ve=Object.keys(P),ye={...P,..._e,...D.props},be=l({name:`Dropdown`,inheritAttrs:!1,props:ye,setup(e){let i=a(!1),o=ee(n(e,`show`),i),s=t(()=>{let{keyField:t,childrenField:n}=e;return R(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),c=t(()=>s.value.treeNodes),l=a(null),u=a(null),d=a(null),f=t(()=>l.value??u.value??d.value??null),g=t(()=>s.value.getPath(f.value).keyPath),_=t(()=>s.value.getPath(e.value).keyPath),v=h(()=>e.keyboard&&o.value);te({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:j}},v);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:C}=w(e),T=t(()=>e.size||C?.value?.Dropdown?.size||`medium`),E=D(`Dropdown`,`-dropdown`,ge,ne,e,b);p(q,{labelFieldRef:n(e,`labelField`),childrenFieldRef:n(e,`childrenField`),renderLabelRef:n(e,`renderLabel`),renderIconRef:n(e,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:n(e,`animated`),mergedShowRef:o,nodePropsRef:n(e,`nodeProps`),renderOptionRef:n(e,`renderOption`),menuPropsRef:n(e,`menuProps`),doSelect:O,doUpdateShow:k}),r(o,t=>{!e.animated&&!t&&A()});function O(t,n){let{onSelect:r}=e;r&&y(r,t,n)}function k(t){let{"onUpdate:show":n,onUpdateShow:r}=e;n&&y(n,t),r&&y(r,t),i.value=t}function A(){l.value=null,u.value=null,d.value=null}function j(){k(!1)}function M(){z(`left`)}function N(){z(`right`)}function P(){z(`up`)}function F(){z(`down`)}function I(){let e=L();e?.isLeaf&&o.value&&(O(e.key,e.rawNode),k(!1))}function L(){let{value:e}=s,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function z(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=s,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let B=t(()=>{let{inverted:t}=e,n=T.value,{common:{cubicBezierEaseInOut:r},self:i}=E.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[S(`optionIconSuffixWidth`,n)]:l,[S(`optionSuffixWidth`,n)]:u,[S(`optionIconPrefixWidth`,n)]:d,[S(`optionPrefixWidth`,n)]:f,[S(`fontSize`,n)]:p,[S(`optionHeight`,n)]:m,[S(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),V=x?m(`dropdown`,t(()=>`${T.value[0]}${e.inverted?`i`:``}`),B,e):void 0;return{mergedClsPrefix:b,mergedTheme:E,mergedSize:T,tmNodes:c,mergedShow:o,handleAfterLeave:()=>{e.animated&&A()},doUpdateShow:k,cssVars:x?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let t=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let l=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},u={ref:G(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return s($,c(this.$attrs,u,l))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return f(),e(I,ie(this.$props,ve,r),{_:1,trigger:C(()=>this.$slots.default?.())},16)}});export{G as n,be as t};