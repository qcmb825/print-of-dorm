import{$t as e,Cn as t,Ct as n,Et as r,F as i,L as a,Ln as o,N as s,Nn as c,Pn as l,R as u,Rn as d,Sn as f,Tn as p,Un as m,Wn as h,Xn as g,_n as _,an as v,bt as y,cr as b,en as x,ft as S,ht as C,in as w,jn as T,kn as E,lr as D,mr as O,nn as k,pt as A,rn as j,sr as M,un as N,xn as P}from"./endpoints-Bo2NXLxK.js";import{C as F,E as I,S as L,b as R,m as z,r as B,t as ee,v as te,x as V}from"./fade-in-scale-up.cssr-OU0FjBQD.js";import{c as ne,f as re,i as ie,l as ae,n as H,r as oe,s as se,t as ce}from"./Popover-D-j5JW7o.js";import{r as U,t as le}from"./create-CLOJQO3W.js";import{t as ue}from"./ChevronRight-DJ0B0Bz9.js";import{D as de,R as W,S as fe}from"./index-CKvuuz9X.js";function pe(e={},t){let n=M({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:i}=e,a=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=()=>{(t===void 0||t.value)&&(V(`keydown`,document,a),V(`keyup`,document,s)),t!==void 0&&g(t,e=>{e?(V(`keydown`,document,a),V(`keyup`,document,s)):(R(`keydown`,document,a),R(`keyup`,document,s))})};return te()?(o(c),d(()=>{(t===void 0||t.value)&&(R(`keydown`,document,a),R(`keyup`,document,s))})):c(),b(n)}function G(e){return t=>{e.value=t?t.$el:null}}var me=x(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[j(`color-transition`,{transition:`color .3s var(--n-bezier)`}),j(`depth`,{color:`var(--n-color)`},[e(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),e(`svg`,{height:`1em`,width:`1em`})]),he={...a.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=E({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=y(e),r=a(`Icon`,`-icon`,me,fe,e,t),i=P(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=n?u(`icon`,P(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:P(()=>{let{size:t,color:n}=e;return{fontSize:ae(t),color:n}}),cssVars:n?void 0:i,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:i,onRender:a,themeClass:o}=this;return e?.$options?._n_icon__&&r(`icon`,"don't wrap `n-icon` inside `n-icon`"),a?.(),T(`i`,l(this.$attrs,{role:`img`,class:[`${n}-icon`,o,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),i?T(i):this.$slots.default?.())}}),K=n(`n-dropdown-menu`),q=n(`n-dropdown`),J=n(`n-dropdown-option`),Y=E({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return m(),p(`div`,{class:S(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=D(e.value),i=null;return g(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=E({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=c(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:l,mergedShowRef:u,renderLabelRef:d,renderIconRef:f,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:g,nodePropsRef:_,menuPropsRef:v}=t,y=c(J,null),b=c(K),x=c(L),S=P(()=>e.tmNode.rawNode),C=P(()=>{let{value:t}=m;return X(e.tmNode.rawNode,t)}),w=P(()=>{let{disabled:t}=e.tmNode;return t}),T=ye(P(()=>{if(!C.value)return!1;let{key:t,disabled:i}=e.tmNode;if(i)return!1;let{value:s}=n,{value:c}=r,{value:l}=a,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,P(()=>r.value===null&&!l.value)),E=P(()=>!!y?.enteringSubmenuRef.value),O=D(!1);h(J,{enteringSubmenuRef:O});function k(){O.value=!0}function A(){O.value=!1}function j(){let{parentKey:t,tmNode:i}=e;i.disabled||u.value&&(a.value=t,r.value=null,n.value=i.key)}function M(){let{tmNode:t}=e;t.disabled||u.value&&n.value!==t.key&&j()}function N(t){if(e.tmNode.disabled||!u.value)return;let{relatedTarget:r}=t;r&&!U({target:r},`dropdownOption`)&&!U({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=C,{tmNode:r}=e;u.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:p,renderLabel:d,renderIcon:f,siblingHasIcon:b.showIconRef,siblingHasSubmenu:b.hasSubmenuRef,menuProps:v,popoverBody:x,animated:l,mergedShowSubmenu:P(()=>T.value&&!E.value),rawNode:S,hasSubmenu:C,pending:i(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:i(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:i(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:w,renderOption:g,nodeProps:_,handleClick:F,handleMouseMove:M,handleMouseEnter:j,handleMouseLeave:N,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:A}},render(){let{animated:e,rawNode:n,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:a,siblingHasSubmenu:o,renderLabel:s,renderIcon:c,renderOption:u,nodeProps:d,props:f,scrollable:h}=this,g=null;if(r){let e=this.menuProps?.(n,n.children);g=(n=>(m(),t($,l({key:1},e,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let v={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},y=d?.(n),b=(m(),p(`div`,l({class:[`${i}-dropdown-option`,y?.class],"data-dropdown-option":!0},y),[C(()=>T(`div`,l(v,f),[(m(),p(`div`,{class:S([`${i}-dropdown-option-body__prefix`,a&&`${i}-dropdown-option-body__prefix--show-icon`])},[C(()=>[c?c(n):W(n.icon)])],2)),(m(),p(`div`,{"data-dropdown-option":!0,class:S(`${i}-dropdown-option-body__label`)},[s?(m(),p(_,{key:0},[C(()=>s(n))],64)):(m(),p(_,{key:1},[C(()=>W(n[this.labelField]??n.title))],64))],2)),(m(),p(`div`,{"data-dropdown-option":!0,class:S([`${i}-dropdown-option-body__suffix`,o&&`${i}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(m(),t(ge,{key:0},{_:1,default:A(()=>(m(),t(ue)))})):C(()=>null)],2))])),this.hasSubmenu?(m(),t(ne,{key:0},{default:()=>[(m(),t(se,null,{default:()=>(m(),p(`div`,{class:S(`${i}-dropdown-offset-container`)},[(m(),t(ie,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(m(),p(`div`,{class:S(`${i}-dropdown-menu-wrapper`)},[e?(m(),t(N,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(m(),p(_,{key:1},[C(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):C(()=>null)],16));return u?u({node:b,option:n}):b}}),be=E({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=c(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=c(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:a}=this,{rawNode:o}=this.tmNode,s=(m(),p(`div`,l({class:`${e}-dropdown-option`},r?.(o)),[f(`div`,{class:S(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[f(`div`,{"data-dropdown-option":!0,class:S([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[C(()=>W(o.icon))],2),f(`div`,{class:S(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[i?(m(),p(_,{key:0},[C(()=>i(o))],64)):(m(),p(_,{key:1},[C(()=>W(o.title??o[this.labelField]))],64))],2),f(`div`,{class:S([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return a?a({node:s,option:o}):s}}),xe=E({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:n,clsPrefix:i}=this,{children:a}=e;return m(),p(_,null,[(m(),t(be,{clsPrefix:i,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),C(()=>a?.map(e=>{let{rawNode:a}=e;return a.show===!1?null:Z(a)?T(Y,{clsPrefix:i,key:e.key}):e.isGroup?(r(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(m(),t(Q,{clsPrefix:i,tmNode:e,parentKey:n,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=E({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return T(`div`,t,[e?.()])}}),$=E({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=c(q);h(K,{showIconRef:P(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:P(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=D(null);return h(F,null),h(I,null),h(L,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(i=>{let{rawNode:a}=i;return a.show===!1?null:ve(a)?(m(),t(Se,{tmNode:i,key:i.key},null,8,[`tmNode`])):Z(a)?(m(),t(Y,{clsPrefix:n,key:i.key},null,8,[`clsPrefix`])):_e(a)?(m(),t(xe,{clsPrefix:n,tmNode:i,parentKey:e,key:i.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(m(),t(Q,{clsPrefix:n,tmNode:i,parentKey:e,key:i.key,props:a.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return m(),p(`div`,{class:S([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(m(),t(B,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(m(),p(_,{key:1},[C(()=>i)],64)),this.showArrow?(m(),p(_,{key:2},[C(()=>oe({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):C(()=>null)],2)}}),Ce=x(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ee(),x(`dropdown-option`,`
 position: relative;
 `,[e(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[e(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),x(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[e(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),w(`disabled`,[j(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[k(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),e(`&::before`,`background-color: var(--n-option-color-hover);`)]),j(`active`,`
 color: var(--n-option-text-color-active);
 `,[k(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),e(`&::before`,`background-color: var(--n-option-color-active);`)]),j(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[k(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),j(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),j(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[k(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[j(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),k(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[j(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),x(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),k(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),k(`suffix`,`
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
 `,[j(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),x(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),x(`dropdown-menu`,`pointer-events: all;`)]),x(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),x(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),x(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),e(`>`,[x(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),w(`scrollable`,`
 padding: var(--n-padding);
 `),j(`scrollable`,[k(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(H),Ee={...H,...we,...a.props},De=E({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=D(!1),n=re(O(e,`show`),t),r=P(()=>{let{keyField:t,childrenField:n}=e;return le(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=P(()=>r.value.treeNodes),c=D(null),l=D(null),d=D(null),f=P(()=>c.value??l.value??d.value??null),p=P(()=>r.value.getPath(f.value).keyPath),m=P(()=>r.value.getPath(e.value).keyPath),_=i(()=>e.keyboard&&n.value);pe({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:I},Escape:A}},_);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:S}=y(e),C=P(()=>e.size||S?.value?.Dropdown?.size||`medium`),w=a(`Dropdown`,`-dropdown`,Ce,de,e,b);h(q,{labelFieldRef:O(e,`labelField`),childrenFieldRef:O(e,`childrenField`),renderLabelRef:O(e,`renderLabel`),renderIconRef:O(e,`renderIcon`),hoverKeyRef:c,keyboardKeyRef:l,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:p,activeKeyPathRef:m,animatedRef:O(e,`animated`),mergedShowRef:n,nodePropsRef:O(e,`nodeProps`),renderOptionRef:O(e,`renderOption`),menuPropsRef:O(e,`menuProps`),doSelect:T,doUpdateShow:E}),g(n,t=>{!e.animated&&!t&&k()});function T(t,n){let{onSelect:r}=e;r&&s(r,t,n)}function E(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&s(r,n),i&&s(i,n),t.value=n}function k(){c.value=null,l.value=null,d.value=null}function A(){E(!1)}function j(){R(`left`)}function M(){R(`right`)}function N(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(T(e.key,e.rawNode),E(!1))}function L(){let{value:e}=r,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(i=n.key)}}i!==null&&(c.value=null,l.value=i)}let z=P(()=>{let{inverted:t}=e,n=C.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[v(`optionIconSuffixWidth`,n)]:l,[v(`optionSuffixWidth`,n)]:u,[v(`optionIconPrefixWidth`,n)]:d,[v(`optionPrefixWidth`,n)]:f,[v(`fontSize`,n)]:p,[v(`optionHeight`,n)]:m,[v(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=x?u(`dropdown`,P(()=>`${C.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:b,mergedTheme:w,mergedSize:C,tmNodes:o,mergedShow:n,handleAfterLeave:()=>{e.animated&&k()},doUpdateShow:E,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},c={ref:G(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return T($,l(this.$attrs,c,s))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return m(),t(ce,z(this.$props,Te,r),{_:1,trigger:A(()=>this.$slots.default?.())},16)}});export{G as n,De as t};