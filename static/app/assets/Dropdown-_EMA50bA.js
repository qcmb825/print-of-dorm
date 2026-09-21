import{$ as e,B as t,Bt as n,F as r,Ft as i,H as a,St as o,V as s,W as c,X as l,ft as u,pt as d,rt as f,tt as p}from"./endpoints-BxtGT1Ar.js";import{A as m,D as h,Gt as g,Jt as _,Kt as v,T as y,Xt as b,Yt as x,Zt as S,at as C,ft as w,ht as T,it as E,k as D,nn as O,st as k,vt as A}from"./createLucideIcon-Cwmwwrzy.js";import{a as j,c as M,f as N,i as P,o as F,r as I,s as L,t as ee}from"./create-CsZPlDrp.js";import{n as R}from"./Scrollbar-BETGIYVH.js";import{t as te}from"./use-merged-state-CeEUQ4a1.js";import{t as z}from"./use-keyboard-DxANOe09.js";import{t as B}from"./format-length-BwSo_EUP.js";import{t as V}from"./ChevronRight-ThD6pJJ3.js";import{D as ne,M as re,U as H,W as U,dt as W,ft as ie,ot as ae,pt as oe}from"./index-BA85k74C.js";function G(e){return t=>{e.value=t?t.$el:null}}var se=v(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[x(`color-transition`,{transition:`color .3s var(--n-bezier)`}),x(`depth`,{color:`var(--n-color)`},[g(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),g(`svg`,{height:`1em`,width:`1em`})]),ce={...D.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},le=l({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ce,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=w(e),i=D(`Icon`,`-icon`,se,ne,e,n),a=t(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=r?m(`icon`,t(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:n,mergedStyle:t(()=>{let{size:t,color:n}=e;return{fontSize:B(t),color:n}}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:t,depth:n,mergedClsPrefix:r,component:i,onRender:a,themeClass:o}=this;return t?.$options?._n_icon__&&A(`icon`,"don't wrap `n-icon` inside `n-icon`"),a?.(),e(`i`,f(this.$attrs,{role:`img`,class:[`${r}-icon`,o,{[`${r}-icon--depth`]:n,[`${r}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),i?e(i):this.$slots.default?.())}}),K=T(`n-dropdown-menu`),q=T(`n-dropdown`),J=T(`n-dropdown-option`),Y=l({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return u(),c(`div`,{class:E(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ue(e){return e.type===`group`}function Z(e){return e.type===`divider`}function de(e){return e.type===`render`}function fe(e,t,n){if(!t)return e;let r=i(e.value),a=null;return o(e,e=>{a!==null&&window.clearTimeout(a),e===!0?n&&!n.value?r.value=!0:a=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=l({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=p(q),{hoverKeyRef:r,keyboardKeyRef:a,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:l,mergedShowRef:u,renderLabelRef:f,renderIconRef:m,labelFieldRef:g,childrenFieldRef:_,renderOptionRef:v,nodePropsRef:y,menuPropsRef:b}=n,x=p(J,null),S=p(K),C=p(W),w=t(()=>e.tmNode.rawNode),T=t(()=>{let{value:t}=_;return X(e.tmNode.rawNode,t)}),E=t(()=>{let{disabled:t}=e.tmNode;return t}),D=fe(t(()=>{if(!T.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:i}=r,{value:c}=a,{value:l}=o,{value:u}=s;return i===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,t(()=>a.value===null&&!l.value)),O=t(()=>!!x?.enteringSubmenuRef.value),k=i(!1);d(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:n}=e;n.disabled||u.value&&(o.value=t,a.value=null,r.value=n.key)}function P(){let{tmNode:t}=e;t.disabled||u.value&&r.value!==t.key&&M()}function F(t){if(e.tmNode.disabled||!u.value)return;let{relatedTarget:n}=t;n&&!N({target:n},`dropdownOption`)&&!N({target:n},`scrollbarRail`)&&(r.value=null)}function I(){let{value:t}=T,{tmNode:r}=e;u.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:g,renderLabel:f,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:l,mergedShowSubmenu:t(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:h(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:h(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:h(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:v,nodeProps:y,handleClick:I,handleMouseMove:P,handleMouseEnter:M,handleMouseLeave:F,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:t,rawNode:n,mergedShowSubmenu:i,clsPrefix:o,siblingHasIcon:s,siblingHasSubmenu:l,renderLabel:d,renderIcon:p,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(i){let e=this.menuProps?.(n,n.children);v=(t=>(u(),a($,f({key:1},e,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=h?.(n),x=(u(),c(`div`,f({class:[`${o}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[k(()=>e(`div`,f(y,g),[(u(),c(`div`,{class:E([`${o}-dropdown-option-body__prefix`,s&&`${o}-dropdown-option-body__prefix--show-icon`])},[k(()=>[p?p(n):U(n.icon)])],2)),(u(),c(`div`,{"data-dropdown-option":!0,class:E(`${o}-dropdown-option-body__label`)},[d?(u(),c(r,{key:0},[k(()=>d(n))],64)):(u(),c(r,{key:1},[k(()=>U(n[this.labelField]??n.title))],64))],2)),(u(),c(`div`,{"data-dropdown-option":!0,class:E([`${o}-dropdown-option-body__suffix`,l&&`${o}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(u(),a(le,{key:0},{_:1,default:C(()=>(u(),a(V)))})):k(()=>null)],2))])),this.hasSubmenu?(u(),a(M,{key:0},{default:()=>[(u(),a(L,null,{default:()=>(u(),c(`div`,{class:E(`${o}-dropdown-offset-container`)},[(u(),a(F,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(u(),c(`div`,{class:E(`${o}-dropdown-menu-wrapper`)},[t?(u(),a(O,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(u(),c(r,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return m?m({node:x,option:n}):x}}),pe=l({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=p(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=p(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:i,renderLabel:a,renderOption:o}=this,{rawNode:l}=this.tmNode,d=(u(),c(`div`,f({class:`${e}-dropdown-option`},i?.(l)),[s(`div`,{class:E(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[s(`div`,{"data-dropdown-option":!0,class:E([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[k(()=>U(l.icon))],2),s(`div`,{class:E(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(u(),c(r,{key:0},[k(()=>a(l))],64)):(u(),c(r,{key:1},[k(()=>U(l.title??l[this.labelField]))],64))],2),s(`div`,{class:E([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return o?o({node:d,option:l}):d}}),me=l({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:t,parentKey:n,clsPrefix:i}=this,{children:o}=t;return u(),c(r,null,[(u(),a(pe,{clsPrefix:i,tmNode:t,key:t.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>o?.map(t=>{let{rawNode:r}=t;return r.show===!1?null:Z(r)?e(Y,{clsPrefix:i,key:t.key}):t.isGroup?(A(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(u(),a(Q,{clsPrefix:i,tmNode:t,parentKey:n,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),he=l({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:t,props:n}}=this.tmNode;return e(`div`,n,[t?.()])}}),$=l({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:r}=p(q);d(K,{showIconRef:t(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:t(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let a=i(null);return d(ie,null),d(oe,null),d(W,a),{bodyRef:a}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,i=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:de(i)?(u(),a(he,{tmNode:r,key:r.key},null,8,[`tmNode`])):Z(i)?(u(),a(Y,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):ue(i)?(u(),a(me,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(u(),a(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return u(),c(`div`,{class:E([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(u(),a(R,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(u(),c(r,{key:1},[k(()=>i)],64)),this.showArrow?(u(),c(r,{key:2},[k(()=>j({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),ge=v(`dropdown-menu`,`
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
 `)])]),_e={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},ve=Object.keys(P),ye={...P,..._e,...D.props},be=l({name:`Dropdown`,inheritAttrs:!1,props:ye,setup(e){let r=i(!1),a=te(n(e,`show`),r),s=t(()=>{let{keyField:t,childrenField:n}=e;return ee(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),c=t(()=>s.value.treeNodes),l=i(null),u=i(null),f=i(null),p=t(()=>l.value??u.value??f.value??null),g=t(()=>s.value.getPath(p.value).keyPath),_=t(()=>s.value.getPath(e.value).keyPath),v=h(()=>e.keyboard&&a.value);z({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:j}},v);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:C}=w(e),T=t(()=>e.size||C?.value?.Dropdown?.size||`medium`),E=D(`Dropdown`,`-dropdown`,ge,re,e,b);d(q,{labelFieldRef:n(e,`labelField`),childrenFieldRef:n(e,`childrenField`),renderLabelRef:n(e,`renderLabel`),renderIconRef:n(e,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:f,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:n(e,`animated`),mergedShowRef:a,nodePropsRef:n(e,`nodeProps`),renderOptionRef:n(e,`renderOption`),menuPropsRef:n(e,`menuProps`),doSelect:O,doUpdateShow:k}),o(a,t=>{!e.animated&&!t&&A()});function O(t,n){let{onSelect:r}=e;r&&y(r,t,n)}function k(t){let{"onUpdate:show":n,onUpdateShow:i}=e;n&&y(n,t),i&&y(i,t),r.value=t}function A(){l.value=null,u.value=null,f.value=null}function j(){k(!1)}function M(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&a.value&&(O(e.key,e.rawNode),k(!1))}function L(){let{value:e}=s,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=s,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let B=t(()=>{let{inverted:t}=e,n=T.value,{common:{cubicBezierEaseInOut:r},self:i}=E.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[S(`optionIconSuffixWidth`,n)]:l,[S(`optionSuffixWidth`,n)]:u,[S(`optionIconPrefixWidth`,n)]:d,[S(`optionPrefixWidth`,n)]:f,[S(`fontSize`,n)]:p,[S(`optionHeight`,n)]:m,[S(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),V=x?m(`dropdown`,t(()=>`${T.value[0]}${e.inverted?`i`:``}`),B,e):void 0;return{mergedClsPrefix:b,mergedTheme:E,mergedSize:T,tmNodes:c,mergedShow:a,handleAfterLeave:()=>{e.animated&&A()},doUpdateShow:k,cssVars:x?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let t=(t,n,r,i,a)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:G(n),class:[t,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...r,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:i,onMouseleave:a};return e($,f(this.$attrs,l,c))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return u(),a(I,ae(this.$props,ve,r),{_:1,trigger:C(()=>this.$slots.default?.())},16)}});export{G as n,be as t};