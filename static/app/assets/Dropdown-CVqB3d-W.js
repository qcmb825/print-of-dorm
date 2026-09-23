import{B as e,Bt as t,Dt as n,G as r,Gt as i,K as a,Y as o,_t as s,ct as c,it as l,ot as u,q as d,tt as f,vt as p}from"./endpoints-ENJhMWK2.js";import{A as m,D as h,Gt as g,Jt as _,Kt as v,T as y,Xt as b,Yt as x,Zt as S,at as C,ft as w,ht as T,it as E,k as D,nn as O,st as k,vt as A}from"./createLucideIcon-BuHP6xwY.js";import{a as j,c as M,f as N,i as P,o as F,r as I,s as L,t as R}from"./create-CWiqdFgG.js";import{t as ee}from"./use-merged-state-D47lIPkq.js";import{t as te}from"./use-keyboard-B29TJJ-T.js";import{t as z}from"./format-length-BwSo_EUP.js";import{t as B}from"./ChevronRight-BrHu79oV.js";import{D as V,M as ne,U as re,W as H,bt as U,ft as ie,tt as ae,xt as oe,yt as W}from"./index-C68jqRF6.js";function G(e){return t=>{e.value=t?t.$el:null}}var se=v(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[x(`color-transition`,{transition:`color .3s var(--n-bezier)`}),x(`depth`,{color:`var(--n-color)`},[g(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),g(`svg`,{height:`1em`,width:`1em`})]),ce={...D.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},le=f({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ce,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=w(e),i=D(`Icon`,`-icon`,se,V,e,t),a=r(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=n?m(`icon`,r(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:t,mergedStyle:r(()=>{let{size:t,color:n}=e;return{fontSize:z(t),color:n}}),cssVars:n?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&A(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),l(`i`,c(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?l(r):this.$slots.default?.())}}),K=T(`n-dropdown-menu`),q=T(`n-dropdown`),J=T(`n-dropdown-option`),Y=f({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return s(),o(`div`,{class:E(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ue(e){return e.type===`group`}function Z(e){return e.type===`divider`}function de(e){return e.type===`render`}function fe(e,r,i){if(!r)return e;let a=t(e.value),o=null;return n(e,e=>{o!==null&&window.clearTimeout(o),e===!0?i&&!i.value?a.value=!0:o=window.setTimeout(()=>{a.value=!0},r):a.value=!1}),a}var Q=f({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=u(q),{hoverKeyRef:i,keyboardKeyRef:a,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:l,mergedShowRef:d,renderLabelRef:f,renderIconRef:m,labelFieldRef:g,childrenFieldRef:_,renderOptionRef:v,nodePropsRef:y,menuPropsRef:b}=n,x=u(J,null),S=u(K),C=u(W),w=r(()=>e.tmNode.rawNode),T=r(()=>{let{value:t}=_;return X(e.tmNode.rawNode,t)}),E=r(()=>{let{disabled:t}=e.tmNode;return t}),D=fe(r(()=>{if(!T.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:r}=i,{value:c}=a,{value:l}=o,{value:u}=s;return r===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,r(()=>a.value===null&&!l.value)),O=r(()=>!!x?.enteringSubmenuRef.value),k=t(!1);p(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:n}=e;n.disabled||d.value&&(o.value=t,a.value=null,i.value=n.key)}function P(){let{tmNode:t}=e;t.disabled||d.value&&i.value!==t.key&&M()}function F(t){if(e.tmNode.disabled||!d.value)return;let{relatedTarget:n}=t;n&&!N({target:n},`dropdownOption`)&&!N({target:n},`scrollbarRail`)&&(i.value=null)}function I(){let{value:t}=T,{tmNode:r}=e;d.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:g,renderLabel:f,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:l,mergedShowSubmenu:r(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:h(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:h(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:h(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:v,nodeProps:y,handleClick:I,handleMouseMove:P,handleMouseEnter:M,handleMouseLeave:F,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:t,rawNode:n,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:a,siblingHasSubmenu:u,renderLabel:f,renderIcon:p,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(r){let e=this.menuProps?.(n,n.children);v=(t=>(s(),d($,c({key:1},e,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=h?.(n),x=(s(),o(`div`,c({class:[`${i}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[k(()=>l(`div`,c(y,g),[(s(),o(`div`,{class:E([`${i}-dropdown-option-body__prefix`,a&&`${i}-dropdown-option-body__prefix--show-icon`])},[k(()=>[p?p(n):H(n.icon)])],2)),(s(),o(`div`,{"data-dropdown-option":!0,class:E(`${i}-dropdown-option-body__label`)},[f?(s(),o(e,{key:0},[k(()=>f(n))],64)):(s(),o(e,{key:1},[k(()=>H(n[this.labelField]??n.title))],64))],2)),(s(),o(`div`,{"data-dropdown-option":!0,class:E([`${i}-dropdown-option-body__suffix`,u&&`${i}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(s(),d(le,{key:0},{_:1,default:C(()=>(s(),d(B)))})):k(()=>null)],2))])),this.hasSubmenu?(s(),d(M,{key:0},{default:()=>[(s(),d(L,null,{default:()=>(s(),o(`div`,{class:E(`${i}-dropdown-offset-container`)},[(s(),d(F,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(s(),o(`div`,{class:E(`${i}-dropdown-menu-wrapper`)},[t?(s(),d(O,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(s(),o(e,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return m?m({node:x,option:n}):x}}),pe=f({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=u(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=u(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:t,hasSubmenu:n,showIcon:r,nodeProps:i,renderLabel:l,renderOption:u}=this,{rawNode:d}=this.tmNode,f=(s(),o(`div`,c({class:`${t}-dropdown-option`},i?.(d)),[a(`div`,{class:E(`${t}-dropdown-option-body ${t}-dropdown-option-body--group`)},[a(`div`,{"data-dropdown-option":!0,class:E([`${t}-dropdown-option-body__prefix`,r&&`${t}-dropdown-option-body__prefix--show-icon`])},[k(()=>H(d.icon))],2),a(`div`,{class:E(`${t}-dropdown-option-body__label`),"data-dropdown-option":!0},[l?(s(),o(e,{key:0},[k(()=>l(d))],64)):(s(),o(e,{key:1},[k(()=>H(d.title??d[this.labelField]))],64))],2),a(`div`,{class:E([`${t}-dropdown-option-body__suffix`,n&&`${t}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return u?u({node:f,option:d}):f}}),me=f({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:t,parentKey:n,clsPrefix:r}=this,{children:i}=t;return s(),o(e,null,[(s(),d(pe,{clsPrefix:r,tmNode:t,key:t.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>i?.map(e=>{let{rawNode:t}=e;return t.show===!1?null:Z(t)?l(Y,{clsPrefix:r,key:e.key}):e.isGroup?(A(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(s(),d(Q,{clsPrefix:r,tmNode:e,parentKey:n,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),he=f({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return l(`div`,t,[e?.()])}}),$=f({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:i}=u(q);p(K,{showIconRef:r(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:r(()=>{let{value:t}=i;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let a=t(null);return p(U,null),p(oe,null),p(W,a),{bodyRef:a}},render(){let{parentKey:t,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(e=>{let{rawNode:i}=e;return i.show===!1?null:de(i)?(s(),d(he,{tmNode:e,key:e.key},null,8,[`tmNode`])):Z(i)?(s(),d(Y,{clsPrefix:n,key:e.key},null,8,[`clsPrefix`])):ue(i)?(s(),d(me,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(s(),d(Q,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key,props:i.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return s(),o(`div`,{class:E([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(s(),d(ae,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(s(),o(e,{key:1},[k(()=>i)],64)),this.showArrow?(s(),o(e,{key:2},[k(()=>j({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),ge=v(`dropdown-menu`,`
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
 `)])]),_e={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},ve=Object.keys(P),ye={...P,..._e,...D.props},be=f({name:`Dropdown`,inheritAttrs:!1,props:ye,setup(e){let a=t(!1),o=ee(i(e,`show`),a),s=r(()=>{let{keyField:t,childrenField:n}=e;return R(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),c=r(()=>s.value.treeNodes),l=t(null),u=t(null),d=t(null),f=r(()=>l.value??u.value??d.value??null),g=r(()=>s.value.getPath(f.value).keyPath),_=r(()=>s.value.getPath(e.value).keyPath),v=h(()=>e.keyboard&&o.value);te({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:j}},v);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:C}=w(e),T=r(()=>e.size||C?.value?.Dropdown?.size||`medium`),E=D(`Dropdown`,`-dropdown`,ge,ne,e,b);p(q,{labelFieldRef:i(e,`labelField`),childrenFieldRef:i(e,`childrenField`),renderLabelRef:i(e,`renderLabel`),renderIconRef:i(e,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:i(e,`animated`),mergedShowRef:o,nodePropsRef:i(e,`nodeProps`),renderOptionRef:i(e,`renderOption`),menuPropsRef:i(e,`menuProps`),doSelect:O,doUpdateShow:k}),n(o,t=>{!e.animated&&!t&&A()});function O(t,n){let{onSelect:r}=e;r&&y(r,t,n)}function k(t){let{"onUpdate:show":n,onUpdateShow:r}=e;n&&y(n,t),r&&y(r,t),a.value=t}function A(){l.value=null,u.value=null,d.value=null}function j(){k(!1)}function M(){z(`left`)}function N(){z(`right`)}function P(){z(`up`)}function F(){z(`down`)}function I(){let e=L();e?.isLeaf&&o.value&&(O(e.key,e.rawNode),k(!1))}function L(){let{value:e}=s,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function z(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=s,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let B=r(()=>{let{inverted:t}=e,n=T.value,{common:{cubicBezierEaseInOut:r},self:i}=E.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[S(`optionIconSuffixWidth`,n)]:l,[S(`optionSuffixWidth`,n)]:u,[S(`optionIconPrefixWidth`,n)]:d,[S(`optionPrefixWidth`,n)]:f,[S(`fontSize`,n)]:p,[S(`optionHeight`,n)]:m,[S(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),V=x?m(`dropdown`,r(()=>`${T.value[0]}${e.inverted?`i`:``}`),B,e):void 0;return{mergedClsPrefix:b,mergedTheme:E,mergedSize:T,tmNodes:c,mergedShow:o,handleAfterLeave:()=>{e.animated&&A()},doUpdateShow:k,cssVars:x?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},u={ref:G(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return l($,c(this.$attrs,u,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return s(),d(I,ie(this.$props,ve,n),{_:1,trigger:C(()=>this.$slots.default?.())},16)}});export{G as n,be as t};