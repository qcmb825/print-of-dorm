import{B as e,Bn as t,Cn as n,Dn as r,F as i,Fn as a,Gn as o,In as s,Kn as c,L as l,Nn as u,Ot as d,Qn as f,St as p,Tn as m,Tt as h,_t as g,an as _,dr as v,fn as y,gr as b,ht as x,in as S,jn as C,lr as w,mt as T,nn as E,on as D,sn as O,tn as k,ur as A,wn as j,yn as M,z as N,zn as P}from"./endpoints-gDUDUnKI.js";import{a as F,i as I,n as L,o as R,r as z,t as B}from"./Popover-DARfIN_e.js";import{r as V,t as ee}from"./create-CLOJQO3W.js";import{i as te}from"./cssr-nvHT-q9I.js";import{t as ne}from"./format-length-BwSo_EUP.js";import{t as re}from"./ChevronRight-DKy2bpZd.js";import{B as H,C as ie,O as ae,Z as oe,_t as se,ct as ce,dt as le,gt as ue,ht as U,mt as W,pt as G,z as de}from"./index-DmEbPUOi.js";function fe(e={},n){let r=w({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:i,keyup:a}=e,o=e=>{switch(e.key){case`Control`:r.ctrl=!0;break;case`Meta`:r.command=!0,r.win=!0;break;case`Shift`:r.shift=!0;break;case`Tab`:r.tab=!0}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=e=>{switch(e.key){case`Control`:r.ctrl=!1;break;case`Meta`:r.command=!1,r.win=!1;break;case`Shift`:r.shift=!1;break;case`Tab`:r.tab=!1}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=()=>{(n===void 0||n.value)&&(W(`keydown`,document,o),W(`keyup`,document,s)),n!==void 0&&f(n,e=>{e?(W(`keydown`,document,o),W(`keyup`,document,s)):(G(`keydown`,document,o),G(`keyup`,document,s))})};return le()?(P(c),t(()=>{(n===void 0||n.value)&&(G(`keydown`,document,o),G(`keyup`,document,s))})):c(),A(r)}function K(e){return t=>{e.value=t?t.$el:null}}var pe=E(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[_(`color-transition`,{transition:`color .3s var(--n-bezier)`}),_(`depth`,{color:`var(--n-color)`},[k(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),k(`svg`,{height:`1em`,width:`1em`})]),me={...N.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},he=C({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:me,setup(t){let{mergedClsPrefixRef:r,inlineThemeDisabled:i}=p(t),a=N(`Icon`,`-icon`,pe,ie,t,r),o=n(()=>{let{depth:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=a.value;if(e!==void 0){let{color:t,[`opacity${e}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":t,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),s=i?e(`icon`,n(()=>`${t.depth||`d`}`),o,t):void 0;return{mergedClsPrefix:r,mergedStyle:n(()=>{let{size:e,color:n}=t;return{fontSize:ne(e),color:n}}),cssVars:i?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&d(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),u(`i`,s(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?u(r):this.$slots.default?.())}}),q=h(`n-dropdown-menu`),J=h(`n-dropdown`),Y=h(`n-dropdown-option`),X=C({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return o(),r(`div`,{class:T(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Z(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ge(e){return e.type===`group`}function Q(e){return e.type===`divider`}function _e(e){return e.type===`render`}function ve(e,t,n){if(!t)return e;let r=v(e.value),i=null;return f(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var $=C({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=a(J),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:u,animatedRef:d,mergedShowRef:f,renderLabelRef:p,renderIconRef:m,labelFieldRef:h,childrenFieldRef:g,renderOptionRef:_,nodePropsRef:y,menuPropsRef:b}=t,x=a(Y,null),S=a(q),C=a(U),w=n(()=>e.tmNode.rawNode),T=n(()=>{let{value:t}=g;return Z(e.tmNode.rawNode,t)}),E=n(()=>{let{disabled:t}=e.tmNode;return t}),D=ve(n(()=>{if(!T.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:a}=r,{value:c}=i,{value:l}=o,{value:u}=s;return a===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,n(()=>i.value===null&&!d.value)),O=n(()=>!!x?.enteringSubmenuRef.value),k=v(!1);c(Y,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:n}=e;n.disabled||f.value&&(o.value=t,i.value=null,r.value=n.key)}function N(){let{tmNode:t}=e;t.disabled||f.value&&r.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!f.value)return;let{relatedTarget:n}=t;n&&!V({target:n},`dropdownOption`)&&!V({target:n},`scrollbarRail`)&&(r.value=null)}function F(){let{value:n}=T,{tmNode:r}=e;f.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:h,renderLabel:p,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:d,mergedShowSubmenu:n(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:l(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:l(()=>{let{value:t}=u,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:l(()=>{let{value:t}=u,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:_,nodeProps:y,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:i,siblingHasIcon:a,siblingHasSubmenu:c,renderLabel:l,renderIcon:d,renderOption:f,nodeProps:p,props:h,scrollable:_}=this,v=null;if(n){let e=this.menuProps?.(t,t.children);v=(t=>(o(),m(Se,s({key:1},e,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let b={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},S=p?.(t),C=(o(),r(`div`,s({class:[`${i}-dropdown-option`,S?.class],"data-dropdown-option":!0},S),[g(()=>u(`div`,s(b,h),[(o(),r(`div`,{class:T([`${i}-dropdown-option-body__prefix`,a&&`${i}-dropdown-option-body__prefix--show-icon`])},[g(()=>[d?d(t):H(t.icon)])],2)),(o(),r(`div`,{"data-dropdown-option":!0,class:T(`${i}-dropdown-option-body__label`)},[l?(o(),r(M,{key:0},[g(()=>l(t))],64)):(o(),r(M,{key:1},[g(()=>H(t[this.labelField]??t.title))],64))],2)),(o(),r(`div`,{"data-dropdown-option":!0,class:T([`${i}-dropdown-option-body__suffix`,c&&`${i}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(o(),m(he,{key:0},{_:1,default:x(()=>(o(),m(re)))})):g(()=>null)],2))])),this.hasSubmenu?(o(),m(R,{key:0},{default:()=>[(o(),m(F,null,{default:()=>(o(),r(`div`,{class:T(`${i}-dropdown-offset-container`)},[(o(),m(I,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(o(),r(`div`,{class:T(`${i}-dropdown-menu-wrapper`)},[e?(o(),m(y,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(o(),r(M,{key:1},[g(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):g(()=>null)],16));return f?f({node:C,option:t}):C}}),ye=C({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=a(q),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:o}=a(J);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:o}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:i,renderLabel:a,renderOption:c}=this,{rawNode:l}=this.tmNode,u=(o(),r(`div`,s({class:`${e}-dropdown-option`},i?.(l)),[j(`div`,{class:T(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[j(`div`,{"data-dropdown-option":!0,class:T([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[g(()=>H(l.icon))],2),j(`div`,{class:T(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(o(),r(M,{key:0},[g(()=>a(l))],64)):(o(),r(M,{key:1},[g(()=>H(l.title??l[this.labelField]))],64))],2),j(`div`,{class:T([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return c?c({node:u,option:l}):u}}),be=C({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:i}=e;return o(),r(M,null,[(o(),m(ye,{clsPrefix:n,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),g(()=>i?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Q(r)?u(X,{clsPrefix:n,key:e.key}):e.isGroup?(d(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(o(),m($,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),xe=C({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return u(`div`,t,[e?.()])}}),Se=C({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:r}=a(J);c(q,{showIconRef:n(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:n(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Z(e,t));let{rawNode:n}=e;return Z(n,t)})})});let i=v(null);return c(ue,null),c(se,null),c(U,i),{bodyRef:i}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,i=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:_e(i)?(o(),m(xe,{tmNode:r,key:r.key},null,8,[`tmNode`])):Q(i)?(o(),m(X,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):ge(i)?(o(),m(be,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(o(),m($,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return o(),r(`div`,{class:T([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(o(),m(oe,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(o(),r(M,{key:1},[g(()=>i)],64)),this.showArrow?(o(),r(M,{key:2},[g(()=>z({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):g(()=>null)],2)}}),Ce=E(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[de(),E(`dropdown-option`,`
 position: relative;
 `,[k(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[k(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),E(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[k(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),D(`disabled`,[_(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[S(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),k(`&::before`,`background-color: var(--n-option-color-hover);`)]),_(`active`,`
 color: var(--n-option-text-color-active);
 `,[S(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),k(`&::before`,`background-color: var(--n-option-color-active);`)]),_(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[S(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),_(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),_(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[S(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[_(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),S(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[_(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),E(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),S(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),S(`suffix`,`
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
 `,[_(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),E(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),E(`dropdown-menu`,`pointer-events: all;`)]),E(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),E(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),E(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),k(`>`,[E(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),D(`scrollable`,`
 padding: var(--n-padding);
 `),_(`scrollable`,[S(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(L),Ee={...L,...we,...N.props},De=C({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(t){let r=v(!1),a=te(b(t,`show`),r),o=n(()=>{let{keyField:e,childrenField:n}=t;return ee(t.options,{getKey(t){return t[e]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),s=n(()=>o.value.treeNodes),u=v(null),d=v(null),m=v(null),h=n(()=>u.value??d.value??m.value??null),g=n(()=>o.value.getPath(h.value).keyPath),_=n(()=>o.value.getPath(t.value).keyPath),y=l(()=>t.keyboard&&a.value);fe({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:I},Escape:A}},y);let{mergedClsPrefixRef:x,inlineThemeDisabled:S,mergedComponentPropsRef:C}=p(t),w=n(()=>t.size||C?.value?.Dropdown?.size||`medium`),T=N(`Dropdown`,`-dropdown`,Ce,ae,t,x);c(J,{labelFieldRef:b(t,`labelField`),childrenFieldRef:b(t,`childrenField`),renderLabelRef:b(t,`renderLabel`),renderIconRef:b(t,`renderIcon`),hoverKeyRef:u,keyboardKeyRef:d,lastToggledSubmenuKeyRef:m,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:b(t,`animated`),mergedShowRef:a,nodePropsRef:b(t,`nodeProps`),renderOptionRef:b(t,`renderOption`),menuPropsRef:b(t,`menuProps`),doSelect:E,doUpdateShow:D}),f(a,e=>{!t.animated&&!e&&k()});function E(e,n){let{onSelect:r}=t;r&&i(r,e,n)}function D(e){let{"onUpdate:show":n,onUpdateShow:a}=t;n&&i(n,e),a&&i(a,e),r.value=e}function k(){u.value=null,d.value=null,m.value=null}function A(){D(!1)}function j(){R(`left`)}function M(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&a.value&&(E(e.key,e.rawNode),D(!1))}function L(){let{value:e}=o,{value:t}=h;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=h,{value:{getFirstAvailableNode:n}}=o,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(u.value=null,d.value=r)}let z=n(()=>{let{inverted:e}=t,n=w.value,{common:{cubicBezierEaseInOut:r},self:i}=T.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[O(`optionIconSuffixWidth`,n)]:l,[O(`optionSuffixWidth`,n)]:u,[O(`optionIconPrefixWidth`,n)]:d,[O(`optionPrefixWidth`,n)]:f,[O(`fontSize`,n)]:p,[O(`optionHeight`,n)]:m,[O(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return e?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=S?e(`dropdown`,n(()=>`${w.value[0]}${t.inverted?`i`:``}`),z,t):void 0;return{mergedClsPrefix:x,mergedTheme:T,mergedSize:w,tmNodes:s,mergedShow:a,handleAfterLeave:()=>{t.animated&&k()},doUpdateShow:D,cssVars:S?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let c=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:K(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return u(Se,s(this.$attrs,l,c))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return o(),m(B,ce(this.$props,Te,n),{_:1,trigger:x(()=>this.$slots.default?.())},16)}});export{K as n,De as t};