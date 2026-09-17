import{An as e,At as t,Bn as n,Dt as r,Gn as i,H as a,In as o,L as s,Mn as c,Nt as l,On as u,Rn as d,St as f,U as p,Vn as m,Wn as h,Xn as g,Zn as _,_n as v,bt as y,dn as b,fn as x,gr as S,hr as C,kn as w,ln as T,mr as E,on as D,rr as O,sn as k,un as A,wn as j,xr as M,yt as N,z as P}from"./endpoints-D7YssODM.js";import{a as F,c as I,f as L,i as R,o as z,r as B,s as ee,t as te}from"./create-Cf_l9O5p.js";import{c as V,n as ne,s as H}from"./Scrollbar-BE5qE3gb.js";import{t as re}from"./use-merged-state-CXRiUPYA.js";import{t as ie}from"./format-length-BwSo_EUP.js";import{t as ae}from"./ChevronRight-BIWZ6b5U.js";import{B as U,C as oe,O as se,at as ce,ct as le,lt as ue,nt as de,st as W,z as fe}from"./index-CTz7zfxj.js";function pe(e={},t){let n=E({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:a}=e,o=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=()=>{(t===void 0||t.value)&&(V(`keydown`,document,o),V(`keyup`,document,s)),t!==void 0&&O(t,e=>{e?(V(`keydown`,document,o),V(`keyup`,document,s)):(H(`keydown`,document,o),H(`keyup`,document,s))})};return ce()?(h(c),i(()=>{(t===void 0||t.value)&&(H(`keydown`,document,o),H(`keyup`,document,s))})):c(),C(n)}function G(e){return t=>{e.value=t?t.$el:null}}var me=k(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[A(`color-transition`,{transition:`color .3s var(--n-bezier)`}),A(`depth`,{color:`var(--n-color)`},[D(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),D(`svg`,{height:`1em`,width:`1em`})]),he={...a.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=o({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=r(e),i=a(`Icon`,`-icon`,me,oe,e,t),o=u(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),s=n?p(`icon`,u(()=>`${e.depth||`d`}`),o,e):void 0;return{mergedClsPrefix:t,mergedStyle:u(()=>{let{size:t,color:n}=e;return{fontSize:ie(t),color:n}}),cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&l(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),d(`i`,m(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?d(r):this.$slots.default?.())}}),K=t(`n-dropdown-menu`),q=t(`n-dropdown`),J=t(`n-dropdown-option`),Y=o({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return g(),c(`div`,{class:N(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=S(e.value),i=null;return O(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=o({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=n(q),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:d,renderIconRef:f,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:g,menuPropsRef:v}=t,y=n(J,null),b=n(K),x=n(W),C=u(()=>e.tmNode.rawNode),w=u(()=>{let{value:t}=m;return X(e.tmNode.rawNode,t)}),T=u(()=>{let{disabled:t}=e.tmNode;return t}),E=ye(u(()=>{if(!w.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:s}=r,{value:c}=i,{value:l}=a,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,u(()=>i.value===null&&!c.value)),D=u(()=>!!y?.enteringSubmenuRef.value),O=S(!1);_(J,{enteringSubmenuRef:O});function k(){O.value=!0}function A(){O.value=!1}function j(){let{parentKey:t,tmNode:n}=e;n.disabled||l.value&&(a.value=t,i.value=null,r.value=n.key)}function M(){let{tmNode:t}=e;t.disabled||l.value&&r.value!==t.key&&j()}function N(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:n}=t;n&&!L({target:n},`dropdownOption`)&&!L({target:n},`scrollbarRail`)&&(r.value=null)}function F(){let{value:n}=w,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:p,renderLabel:d,renderIcon:f,siblingHasIcon:b.showIconRef,siblingHasSubmenu:b.hasSubmenuRef,menuProps:v,popoverBody:x,animated:c,mergedShowSubmenu:u(()=>E.value&&!D.value),rawNode:C,hasSubmenu:w,pending:P(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:P(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:P(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:T,renderOption:h,nodeProps:g,handleClick:F,handleMouseMove:M,handleMouseEnter:j,handleMouseLeave:N,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:A}},render(){let{animated:t,rawNode:n,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:a,siblingHasSubmenu:o,renderLabel:s,renderIcon:l,renderOption:u,nodeProps:p,props:h,scrollable:_}=this,b=null;if(r){let t=this.menuProps?.(n,n.children);b=(n=>(g(),e($,m({key:1},t,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(b)}let x={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},S=p?.(n),C=(g(),c(`div`,m({class:[`${i}-dropdown-option`,S?.class],"data-dropdown-option":!0},S),[f(()=>d(`div`,m(x,h),[(g(),c(`div`,{class:N([`${i}-dropdown-option-body__prefix`,a&&`${i}-dropdown-option-body__prefix--show-icon`])},[f(()=>[l?l(n):U(n.icon)])],2)),(g(),c(`div`,{"data-dropdown-option":!0,class:N(`${i}-dropdown-option-body__label`)},[s?(g(),c(j,{key:0},[f(()=>s(n))],64)):(g(),c(j,{key:1},[f(()=>U(n[this.labelField]??n.title))],64))],2)),(g(),c(`div`,{"data-dropdown-option":!0,class:N([`${i}-dropdown-option-body__suffix`,o&&`${i}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(g(),e(ge,{key:0},{_:1,default:y(()=>(g(),e(ae)))})):f(()=>null)],2))])),this.hasSubmenu?(g(),e(I,{key:0},{default:()=>[(g(),e(ee,null,{default:()=>(g(),c(`div`,{class:N(`${i}-dropdown-offset-container`)},[(g(),e(z,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(g(),c(`div`,{class:N(`${i}-dropdown-menu-wrapper`)},[t?(g(),e(v,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>b},1032,[`onBeforeEnter`,`onAfterEnter`])):(g(),c(j,{key:1},[f(()=>b)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):f(()=>null)],16));return u?u({node:C,option:n}):C}}),be=o({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=n(K),{renderLabelRef:r,labelFieldRef:i,nodePropsRef:a,renderOptionRef:o}=n(q);return{labelField:i,showIcon:e,hasSubmenu:t,renderLabel:r,nodeProps:a,renderOption:o}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:a}=this,{rawNode:o}=this.tmNode,s=(g(),c(`div`,m({class:`${e}-dropdown-option`},r?.(o)),[w(`div`,{class:N(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[w(`div`,{"data-dropdown-option":!0,class:N([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[f(()=>U(o.icon))],2),w(`div`,{class:N(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[i?(g(),c(j,{key:0},[f(()=>i(o))],64)):(g(),c(j,{key:1},[f(()=>U(o.title??o[this.labelField]))],64))],2),w(`div`,{class:N([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return a?a({node:s,option:o}):s}}),xe=o({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:t,parentKey:n,clsPrefix:r}=this,{children:i}=t;return g(),c(j,null,[(g(),e(be,{clsPrefix:r,tmNode:t,key:t.key},null,8,[`clsPrefix`,`tmNode`])),f(()=>i?.map(t=>{let{rawNode:i}=t;return i.show===!1?null:Z(i)?d(Y,{clsPrefix:r,key:t.key}):t.isGroup?(l(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(g(),e(Q,{clsPrefix:r,tmNode:t,parentKey:n,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=o({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return d(`div`,t,[e?.()])}}),$=o({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:r}=n(q);_(K,{showIconRef:u(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:u(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let i=S(null);return _(le,null),_(ue,null),_(W,i),{bodyRef:i}},render(){let{parentKey:t,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(i=>{let{rawNode:a}=i;return a.show===!1?null:ve(a)?(g(),e(Se,{tmNode:i,key:i.key},null,8,[`tmNode`])):Z(a)?(g(),e(Y,{clsPrefix:n,key:i.key},null,8,[`clsPrefix`])):_e(a)?(g(),e(xe,{clsPrefix:n,tmNode:i,parentKey:t,key:i.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(g(),e(Q,{clsPrefix:n,tmNode:i,parentKey:t,key:i.key,props:a.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return g(),c(`div`,{class:N([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(g(),e(ne,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(g(),c(j,{key:1},[f(()=>i)],64)),this.showArrow?(g(),c(j,{key:2},[f(()=>F({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):f(()=>null)],2)}}),Ce=k(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[fe(),k(`dropdown-option`,`
 position: relative;
 `,[D(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[D(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),k(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[D(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),b(`disabled`,[A(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[T(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),D(`&::before`,`background-color: var(--n-option-color-hover);`)]),A(`active`,`
 color: var(--n-option-text-color-active);
 `,[T(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),D(`&::before`,`background-color: var(--n-option-color-active);`)]),A(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[T(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),A(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),A(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[T(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[A(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),T(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[A(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),k(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),T(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),T(`suffix`,`
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
 `,[A(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),k(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),k(`dropdown-menu`,`pointer-events: all;`)]),k(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),k(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),k(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),D(`>`,[k(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),b(`scrollable`,`
 padding: var(--n-padding);
 `),A(`scrollable`,[T(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(R),Ee={...R,...we,...a.props},De=o({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=S(!1),n=re(M(e,`show`),t),i=u(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=u(()=>i.value.treeNodes),c=S(null),l=S(null),d=S(null),f=u(()=>c.value??l.value??d.value??null),m=u(()=>i.value.getPath(f.value).keyPath),h=u(()=>i.value.getPath(e.value).keyPath),g=P(()=>e.keyboard&&n.value);pe({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:j},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:I},Escape:k}},g);let{mergedClsPrefixRef:v,inlineThemeDisabled:y,mergedComponentPropsRef:b}=r(e),C=u(()=>e.size||b?.value?.Dropdown?.size||`medium`),w=a(`Dropdown`,`-dropdown`,Ce,se,e,v);_(q,{labelFieldRef:M(e,`labelField`),childrenFieldRef:M(e,`childrenField`),renderLabelRef:M(e,`renderLabel`),renderIconRef:M(e,`renderIcon`),hoverKeyRef:c,keyboardKeyRef:l,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:m,activeKeyPathRef:h,animatedRef:M(e,`animated`),mergedShowRef:n,nodePropsRef:M(e,`nodeProps`),renderOptionRef:M(e,`renderOption`),menuPropsRef:M(e,`menuProps`),doSelect:T,doUpdateShow:E}),O(n,t=>{!e.animated&&!t&&D()});function T(t,n){let{onSelect:r}=e;r&&s(r,t,n)}function E(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&s(r,n),i&&s(i,n),t.value=n}function D(){c.value=null,l.value=null,d.value=null}function k(){E(!1)}function A(){R(`left`)}function j(){R(`right`)}function N(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(T(e.key,e.rawNode),E(!1))}function L(){let{value:e}=i,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=i,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(c.value=null,l.value=r)}let z=u(()=>{let{inverted:t}=e,n=C.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[x(`optionIconSuffixWidth`,n)]:l,[x(`optionSuffixWidth`,n)]:u,[x(`optionIconPrefixWidth`,n)]:d,[x(`optionPrefixWidth`,n)]:f,[x(`fontSize`,n)]:p,[x(`optionHeight`,n)]:m,[x(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=y?p(`dropdown`,u(()=>`${C.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:v,mergedTheme:w,mergedSize:C,tmNodes:o,mergedShow:n,handleAfterLeave:()=>{e.animated&&D()},doUpdateShow:E,cssVars:y?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let t=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},c={ref:G(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return d($,m(this.$attrs,c,s))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return g(),e(B,de(this.$props,Te,r),{_:1,trigger:y(()=>this.$slots.default?.())},16)}});export{G as n,De as t};