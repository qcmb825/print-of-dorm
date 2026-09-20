import{$ as e,B as t,Bt as n,F as r,Ft as i,H as a,Nt as o,Pt as s,St as c,V as l,W as u,X as d,ft as f,ot as p,pt as m,rt as h,st as g,tt as _}from"./endpoints-C2GocQfh.js";import{A as v,D as y,Gt as b,Jt as x,Kt as S,T as C,Xt as w,Yt as T,Zt as E,at as D,ft as O,ht as k,it as A,k as j,nn as M,st as N,vt as P}from"./createLucideIcon-Bpd2679P.js";import{a as F,c as I,f as L,i as R,o as z,r as B,s as ee,t as te}from"./create-DYFyMSND.js";import{c as V,n as ne,s as H}from"./Scrollbar-CISmNSMK.js";import{t as re}from"./use-merged-state-D_KLSz9B.js";import{t as ie}from"./format-length-BwSo_EUP.js";import{t as ae}from"./ChevronRight-CJfHfYSr.js";import{D as oe,M as se,U as ce,W as U,dt as W,ft as le,lt as ue,ot as de,pt as fe}from"./index-CK-FFwtZ.js";function G(e={},t){let n=o({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:i}=e,a=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},l=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},u=()=>{(t===void 0||t.value)&&(V(`keydown`,document,a),V(`keyup`,document,l)),t!==void 0&&c(t,e=>{e?(V(`keydown`,document,a),V(`keyup`,document,l)):(H(`keydown`,document,a),H(`keyup`,document,l))})};return ue()?(p(u),g(()=>{(t===void 0||t.value)&&(H(`keydown`,document,a),H(`keyup`,document,l))})):u(),s(n)}function K(e){return t=>{e.value=t?t.$el:null}}var pe=S(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[T(`color-transition`,{transition:`color .3s var(--n-bezier)`}),T(`depth`,{color:`var(--n-color)`},[b(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),b(`svg`,{height:`1em`,width:`1em`})]),me={...j.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},he=d({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:me,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=O(e),i=j(`Icon`,`-icon`,pe,oe,e,n),a=t(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=r?v(`icon`,t(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:n,mergedStyle:t(()=>{let{size:t,color:n}=e;return{fontSize:ie(t),color:n}}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:t,depth:n,mergedClsPrefix:r,component:i,onRender:a,themeClass:o}=this;return t?.$options?._n_icon__&&P(`icon`,"don't wrap `n-icon` inside `n-icon`"),a?.(),e(`i`,h(this.$attrs,{role:`img`,class:[`${r}-icon`,o,{[`${r}-icon--depth`]:n,[`${r}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),i?e(i):this.$slots.default?.())}}),q=k(`n-dropdown-menu`),J=k(`n-dropdown`),Y=k(`n-dropdown-option`),X=d({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return f(),u(`div`,{class:A(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Z(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ge(e){return e.type===`group`}function Q(e){return e.type===`divider`}function _e(e){return e.type===`render`}function ve(e,t,n){if(!t)return e;let r=i(e.value),a=null;return c(e,e=>{a!==null&&window.clearTimeout(a),e===!0?n&&!n.value?r.value=!0:a=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var $=d({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=_(J),{hoverKeyRef:r,keyboardKeyRef:a,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:l,mergedShowRef:u,renderLabelRef:d,renderIconRef:f,labelFieldRef:p,childrenFieldRef:h,renderOptionRef:g,nodePropsRef:v,menuPropsRef:b}=n,x=_(Y,null),S=_(q),C=_(W),w=t(()=>e.tmNode.rawNode),T=t(()=>{let{value:t}=h;return Z(e.tmNode.rawNode,t)}),E=t(()=>{let{disabled:t}=e.tmNode;return t}),D=ve(t(()=>{if(!T.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:i}=r,{value:c}=a,{value:l}=o,{value:u}=s;return i===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,t(()=>a.value===null&&!l.value)),O=t(()=>!!x?.enteringSubmenuRef.value),k=i(!1);m(Y,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:n}=e;n.disabled||u.value&&(o.value=t,a.value=null,r.value=n.key)}function N(){let{tmNode:t}=e;t.disabled||u.value&&r.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!u.value)return;let{relatedTarget:n}=t;n&&!L({target:n},`dropdownOption`)&&!L({target:n},`scrollbarRail`)&&(r.value=null)}function F(){let{value:t}=T,{tmNode:r}=e;u.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:p,renderLabel:d,renderIcon:f,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:l,mergedShowSubmenu:t(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:y(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:y(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:y(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:g,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:t,rawNode:n,mergedShowSubmenu:i,clsPrefix:o,siblingHasIcon:s,siblingHasSubmenu:c,renderLabel:l,renderIcon:d,renderOption:p,nodeProps:m,props:g,scrollable:_}=this,v=null;if(i){let e=this.menuProps?.(n,n.children);v=(t=>(f(),a(Se,h({key:1},e,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=m?.(n),x=(f(),u(`div`,h({class:[`${o}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[N(()=>e(`div`,h(y,g),[(f(),u(`div`,{class:A([`${o}-dropdown-option-body__prefix`,s&&`${o}-dropdown-option-body__prefix--show-icon`])},[N(()=>[d?d(n):U(n.icon)])],2)),(f(),u(`div`,{"data-dropdown-option":!0,class:A(`${o}-dropdown-option-body__label`)},[l?(f(),u(r,{key:0},[N(()=>l(n))],64)):(f(),u(r,{key:1},[N(()=>U(n[this.labelField]??n.title))],64))],2)),(f(),u(`div`,{"data-dropdown-option":!0,class:A([`${o}-dropdown-option-body__suffix`,c&&`${o}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(f(),a(he,{key:0},{_:1,default:D(()=>(f(),a(ae)))})):N(()=>null)],2))])),this.hasSubmenu?(f(),a(I,{key:0},{default:()=>[(f(),a(ee,null,{default:()=>(f(),u(`div`,{class:A(`${o}-dropdown-offset-container`)},[(f(),a(z,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(f(),u(`div`,{class:A(`${o}-dropdown-menu-wrapper`)},[t?(f(),a(M,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(f(),u(r,{key:1},[N(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):N(()=>null)],16));return p?p({node:x,option:n}):x}}),ye=d({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=_(q),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=_(J);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:i,renderLabel:a,renderOption:o}=this,{rawNode:s}=this.tmNode,c=(f(),u(`div`,h({class:`${e}-dropdown-option`},i?.(s)),[l(`div`,{class:A(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[l(`div`,{"data-dropdown-option":!0,class:A([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[N(()=>U(s.icon))],2),l(`div`,{class:A(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(f(),u(r,{key:0},[N(()=>a(s))],64)):(f(),u(r,{key:1},[N(()=>U(s.title??s[this.labelField]))],64))],2),l(`div`,{class:A([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return o?o({node:c,option:s}):c}}),be=d({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:t,parentKey:n,clsPrefix:i}=this,{children:o}=t;return f(),u(r,null,[(f(),a(ye,{clsPrefix:i,tmNode:t,key:t.key},null,8,[`clsPrefix`,`tmNode`])),N(()=>o?.map(t=>{let{rawNode:r}=t;return r.show===!1?null:Q(r)?e(X,{clsPrefix:i,key:t.key}):t.isGroup?(P(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(f(),a($,{clsPrefix:i,tmNode:t,parentKey:n,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),xe=d({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:t,props:n}}=this.tmNode;return e(`div`,n,[t?.()])}}),Se=d({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:r}=_(J);m(q,{showIconRef:t(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:t(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Z(e,t));let{rawNode:n}=e;return Z(n,t)})})});let a=i(null);return m(le,null),m(fe,null),m(W,a),{bodyRef:a}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,i=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:_e(i)?(f(),a(xe,{tmNode:r,key:r.key},null,8,[`tmNode`])):Q(i)?(f(),a(X,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):ge(i)?(f(),a(be,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(f(),a($,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return f(),u(`div`,{class:A([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(f(),a(ne,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(f(),u(r,{key:1},[N(()=>i)],64)),this.showArrow?(f(),u(r,{key:2},[N(()=>F({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):N(()=>null)],2)}}),Ce=S(`dropdown-menu`,`
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
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(R),Ee={...R,...we,...j.props},De=d({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let r=i(!1),a=re(n(e,`show`),r),o=t(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),s=t(()=>o.value.treeNodes),l=i(null),u=i(null),d=i(null),f=t(()=>l.value??u.value??d.value??null),p=t(()=>o.value.getPath(f.value).keyPath),h=t(()=>o.value.getPath(e.value).keyPath),g=y(()=>e.keyboard&&a.value);G({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:M},Enter:{prevent:!0,handler:I},Escape:A}},g);let{mergedClsPrefixRef:_,inlineThemeDisabled:b,mergedComponentPropsRef:x}=O(e),S=t(()=>e.size||x?.value?.Dropdown?.size||`medium`),w=j(`Dropdown`,`-dropdown`,Ce,se,e,_);m(J,{labelFieldRef:n(e,`labelField`),childrenFieldRef:n(e,`childrenField`),renderLabelRef:n(e,`renderLabel`),renderIconRef:n(e,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:p,activeKeyPathRef:h,animatedRef:n(e,`animated`),mergedShowRef:a,nodePropsRef:n(e,`nodeProps`),renderOptionRef:n(e,`renderOption`),menuPropsRef:n(e,`menuProps`),doSelect:T,doUpdateShow:D}),c(a,t=>{!e.animated&&!t&&k()});function T(t,n){let{onSelect:r}=e;r&&C(r,t,n)}function D(t){let{"onUpdate:show":n,onUpdateShow:i}=e;n&&C(n,t),i&&C(i,t),r.value=t}function k(){l.value=null,u.value=null,d.value=null}function A(){D(!1)}function M(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&a.value&&(T(e.key,e.rawNode),D(!1))}function L(){let{value:e}=o,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=o,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let z=t(()=>{let{inverted:t}=e,n=S.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[E(`optionIconSuffixWidth`,n)]:l,[E(`optionSuffixWidth`,n)]:u,[E(`optionIconPrefixWidth`,n)]:d,[E(`optionPrefixWidth`,n)]:f,[E(`fontSize`,n)]:p,[E(`optionHeight`,n)]:m,[E(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=b?v(`dropdown`,t(()=>`${S.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:_,mergedTheme:w,mergedSize:S,tmNodes:s,mergedShow:a,handleAfterLeave:()=>{e.animated&&k()},doUpdateShow:D,cssVars:b?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let t=(t,n,r,i,a)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:K(n),class:[t,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...r,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:i,onMouseleave:a};return e(Se,h(this.$attrs,l,c))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return f(),a(B,de(this.$props,Te,r),{_:1,trigger:D(()=>this.$slots.default?.())},16)}});export{K as n,G as r,De as t};