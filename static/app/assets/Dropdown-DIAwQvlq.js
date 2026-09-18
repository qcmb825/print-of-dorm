import{B as e,Mt as t,Nt as n,P as r,Pt as i,Q as a,U as o,V as s,Y as c,at as l,dt as u,et as d,ft as f,nt as p,ot as m,xt as h,z as g,zt as _}from"./endpoints-C3DHQTsP.js";import{A as v,D as y,Gt as b,Jt as x,Kt as S,T as C,Xt as w,Yt as T,Zt as E,at as D,ft as O,ht as k,it as A,k as j,nn as M,st as N,vt as P}from"./createLucideIcon-9CEg89u7.js";import{a as F,c as I,f as L,i as R,o as z,r as B,s as ee,t as te}from"./create-CEH9Lumf.js";import{c as V,n as ne,s as H}from"./Scrollbar-DPOED4HB.js";import{t as re}from"./use-merged-state-BQRj4oql.js";import{t as ie}from"./format-length-BwSo_EUP.js";import{t as ae}from"./ChevronRight-C4sGf6Jf.js";import{A as oe,H as U,T as se,V as ce,dt as le,it as ue,lt as W,st as de,ut as fe}from"./index-4zHUoSEB.js";function pe(e={},r){let i=t({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:a,keyup:o}=e,s=e=>{switch(e.key){case`Control`:i.ctrl=!0;break;case`Meta`:i.command=!0,i.win=!0;break;case`Shift`:i.shift=!0;break;case`Tab`:i.tab=!0}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=e=>{switch(e.key){case`Control`:i.ctrl=!1;break;case`Meta`:i.command=!1,i.win=!1;break;case`Shift`:i.shift=!1;break;case`Tab`:i.tab=!1}o!==void 0&&Object.keys(o).forEach(t=>{if(t!==e.key)return;let n=o[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},u=()=>{(r===void 0||r.value)&&(V(`keydown`,document,s),V(`keyup`,document,c)),r!==void 0&&h(r,e=>{e?(V(`keydown`,document,s),V(`keyup`,document,c)):(H(`keydown`,document,s),H(`keyup`,document,c))})};return de()?(l(u),m(()=>{(r===void 0||r.value)&&(H(`keydown`,document,s),H(`keyup`,document,c))})):u(),n(i)}function G(e){return t=>{e.value=t?t.$el:null}}var me=S(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[T(`color-transition`,{transition:`color .3s var(--n-bezier)`}),T(`depth`,{color:`var(--n-color)`},[b(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),b(`svg`,{height:`1em`,width:`1em`})]),he={...j.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=c({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=O(e),r=j(`Icon`,`-icon`,me,se,e,t),i=g(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?v(`icon`,g(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:g(()=>{let{size:t,color:n}=e;return{fontSize:ie(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:o}=this;return e?.$options?._n_icon__&&P(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),a(`i`,p(this.$attrs,{role:`img`,class:[`${n}-icon`,o,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?a(r):this.$slots.default?.())}}),K=k(`n-dropdown-menu`),q=k(`n-dropdown`),J=k(`n-dropdown-option`),Y=c({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return u(),o(`div`,{class:A(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=i(e.value),a=null;return h(e,e=>{a!==null&&window.clearTimeout(a),e===!0?n&&!n.value?r.value=!0:a=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=c({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=d(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:u,renderIconRef:p,labelFieldRef:m,childrenFieldRef:h,renderOptionRef:_,nodePropsRef:v,menuPropsRef:b}=t,x=d(J,null),S=d(K),C=d(W),w=g(()=>e.tmNode.rawNode),T=g(()=>{let{value:t}=h;return X(e.tmNode.rawNode,t)}),E=g(()=>{let{disabled:t}=e.tmNode;return t}),D=ye(g(()=>{if(!T.value)return!1;let{key:t,disabled:i}=e.tmNode;if(i)return!1;let{value:s}=n,{value:c}=r,{value:l}=a,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,g(()=>r.value===null&&!c.value)),O=g(()=>!!x?.enteringSubmenuRef.value),k=i(!1);f(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:i}=e;i.disabled||l.value&&(a.value=t,r.value=null,n.value=i.key)}function N(){let{tmNode:t}=e;t.disabled||l.value&&n.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:r}=t;r&&!L({target:r},`dropdownOption`)&&!L({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=T,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:m,renderLabel:u,renderIcon:p,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:c,mergedShowSubmenu:g(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:y(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:y(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:y(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:_,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:i,siblingHasIcon:c,siblingHasSubmenu:l,renderLabel:d,renderIcon:f,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(n){let e=this.menuProps?.(t,t.children);v=(t=>(u(),s($,p({key:1},e,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=h?.(t),x=(u(),o(`div`,p({class:[`${i}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[N(()=>a(`div`,p(y,g),[(u(),o(`div`,{class:A([`${i}-dropdown-option-body__prefix`,c&&`${i}-dropdown-option-body__prefix--show-icon`])},[N(()=>[f?f(t):U(t.icon)])],2)),(u(),o(`div`,{"data-dropdown-option":!0,class:A(`${i}-dropdown-option-body__label`)},[d?(u(),o(r,{key:0},[N(()=>d(t))],64)):(u(),o(r,{key:1},[N(()=>U(t[this.labelField]??t.title))],64))],2)),(u(),o(`div`,{"data-dropdown-option":!0,class:A([`${i}-dropdown-option-body__suffix`,l&&`${i}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(u(),s(ge,{key:0},{_:1,default:D(()=>(u(),s(ae)))})):N(()=>null)],2))])),this.hasSubmenu?(u(),s(I,{key:0},{default:()=>[(u(),s(ee,null,{default:()=>(u(),o(`div`,{class:A(`${i}-dropdown-offset-container`)},[(u(),s(z,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(u(),o(`div`,{class:A(`${i}-dropdown-menu-wrapper`)},[e?(u(),s(M,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(u(),o(r,{key:1},[N(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):N(()=>null)],16));return m?m({node:x,option:t}):x}}),be=c({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=d(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=d(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:t,hasSubmenu:n,showIcon:i,nodeProps:a,renderLabel:s,renderOption:c}=this,{rawNode:l}=this.tmNode,d=(u(),o(`div`,p({class:`${t}-dropdown-option`},a?.(l)),[e(`div`,{class:A(`${t}-dropdown-option-body ${t}-dropdown-option-body--group`)},[e(`div`,{"data-dropdown-option":!0,class:A([`${t}-dropdown-option-body__prefix`,i&&`${t}-dropdown-option-body__prefix--show-icon`])},[N(()=>U(l.icon))],2),e(`div`,{class:A(`${t}-dropdown-option-body__label`),"data-dropdown-option":!0},[s?(u(),o(r,{key:0},[N(()=>s(l))],64)):(u(),o(r,{key:1},[N(()=>U(l.title??l[this.labelField]))],64))],2),e(`div`,{class:A([`${t}-dropdown-option-body__suffix`,n&&`${t}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return c?c({node:d,option:l}):d}}),xe=c({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:i}=e;return u(),o(r,null,[(u(),s(be,{clsPrefix:n,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),N(()=>i?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Z(r)?a(Y,{clsPrefix:n,key:e.key}):e.isGroup?(P(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(u(),s(Q,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=c({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return a(`div`,t,[e?.()])}}),$=c({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=d(q);f(K,{showIconRef:g(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:g(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=i(null);return f(fe,null),f(le,null),f(W,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,i=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:ve(i)?(u(),s(Se,{tmNode:r,key:r.key},null,8,[`tmNode`])):Z(i)?(u(),s(Y,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):_e(i)?(u(),s(xe,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(u(),s(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return u(),o(`div`,{class:A([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(u(),s(ne,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(u(),o(r,{key:1},[N(()=>i)],64)),this.showArrow?(u(),o(r,{key:2},[N(()=>F({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):N(()=>null)],2)}}),Ce=S(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ce(),S(`dropdown-option`,`
 position: relative;
 `,[b(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[b(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),S(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[b(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),w(`disabled`,[T(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[x(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),b(`&::before`,`background-color: var(--n-option-color-hover);`)]),T(`active`,`
 color: var(--n-option-text-color-active);
 `,[x(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),b(`&::before`,`background-color: var(--n-option-color-active);`)]),T(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[x(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),T(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),T(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[x(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[T(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),x(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[T(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),S(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),x(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),x(`suffix`,`
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
 `,[T(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),S(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),S(`dropdown-menu`,`pointer-events: all;`)]),S(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),S(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),S(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),b(`>`,[S(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),w(`scrollable`,`
 padding: var(--n-padding);
 `),T(`scrollable`,[x(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(R),Ee={...R,...we,...j.props},De=c({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=i(!1),n=re(_(e,`show`),t),r=g(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),a=g(()=>r.value.treeNodes),o=i(null),s=i(null),c=i(null),l=g(()=>o.value??s.value??c.value??null),u=g(()=>r.value.getPath(l.value).keyPath),d=g(()=>r.value.getPath(e.value).keyPath),p=y(()=>e.keyboard&&n.value);pe({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:A}},p);let{mergedClsPrefixRef:m,inlineThemeDisabled:b,mergedComponentPropsRef:x}=O(e),S=g(()=>e.size||x?.value?.Dropdown?.size||`medium`),w=j(`Dropdown`,`-dropdown`,Ce,oe,e,m);f(q,{labelFieldRef:_(e,`labelField`),childrenFieldRef:_(e,`childrenField`),renderLabelRef:_(e,`renderLabel`),renderIconRef:_(e,`renderIcon`),hoverKeyRef:o,keyboardKeyRef:s,lastToggledSubmenuKeyRef:c,pendingKeyPathRef:u,activeKeyPathRef:d,animatedRef:_(e,`animated`),mergedShowRef:n,nodePropsRef:_(e,`nodeProps`),renderOptionRef:_(e,`renderOption`),menuPropsRef:_(e,`menuProps`),doSelect:T,doUpdateShow:D}),h(n,t=>{!e.animated&&!t&&k()});function T(t,n){let{onSelect:r}=e;r&&C(r,t,n)}function D(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&C(r,n),i&&C(i,n),t.value=n}function k(){o.value=null,s.value=null,c.value=null}function A(){D(!1)}function M(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(T(e.key,e.rawNode),D(!1))}function L(){let{value:e}=r,{value:t}=l;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=l,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(i=n.key)}}i!==null&&(o.value=null,s.value=i)}let z=g(()=>{let{inverted:t}=e,n=S.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[E(`optionIconSuffixWidth`,n)]:l,[E(`optionSuffixWidth`,n)]:u,[E(`optionIconPrefixWidth`,n)]:d,[E(`optionPrefixWidth`,n)]:f,[E(`fontSize`,n)]:p,[E(`optionHeight`,n)]:m,[E(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=b?v(`dropdown`,g(()=>`${S.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:m,mergedTheme:w,mergedSize:S,tmNodes:a,mergedShow:n,handleAfterLeave:()=>{e.animated&&k()},doUpdateShow:D,cssVars:b?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:G(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return a($,p(this.$attrs,l,c))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return u(),s(B,ue(this.$props,Te,n),{_:1,trigger:D(()=>this.$slots.default?.())},16)}});export{G as n,De as t};