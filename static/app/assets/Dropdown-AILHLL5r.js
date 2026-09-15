import{$t as e,An as t,Hn as n,I as r,In as i,L as a,Ln as o,M as s,Mn as c,Nn as l,On as u,P as d,Qt as f,Sn as p,St as m,Tt as h,Un as g,Yn as _,bn as v,cr as y,dt as b,ft as x,gn as S,in as C,ln as w,mt as T,nn as E,or as D,pr as O,rn as k,sr as A,tn as j,wn as M,xn as N,yt as P}from"./endpoints-BjKpicAD.js";import{C as F,E as I,S as L,b as R,m as z,r as B,t as ee,v as te,x as V}from"./fade-in-scale-up.cssr-YHRJZfJ_.js";import{c as ne,f as re,i as ie,l as ae,n as H,r as oe,s as se,t as ce}from"./Popover-Da_9Zg5V.js";import{r as U,t as le}from"./create-CLOJQO3W.js";import{t as ue}from"./ChevronRight-Siy-3vy3.js";import{D as de,R as W,S as fe}from"./index-BZmdQ_dZ.js";function pe(e={},t){let n=D({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:a}=e,s=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},l=()=>{(t===void 0||t.value)&&(V(`keydown`,document,s),V(`keyup`,document,c)),t!==void 0&&_(t,e=>{e?(V(`keydown`,document,s),V(`keyup`,document,c)):(R(`keydown`,document,s),R(`keyup`,document,c))})};return te()?(i(l),o(()=>{(t===void 0||t.value)&&(R(`keydown`,document,s),R(`keyup`,document,c))})):l(),A(n)}function G(e){return t=>{e.value=t?t.$el:null}}var me=e(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[E(`color-transition`,{transition:`color .3s var(--n-bezier)`}),E(`depth`,{color:`var(--n-color)`},[f(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),f(`svg`,{height:`1em`,width:`1em`})]),he={...r.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=u({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=P(e),i=r(`Icon`,`-icon`,me,fe,e,t),o=v(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),s=n?a(`icon`,v(()=>`${e.depth||`d`}`),o,e):void 0;return{mergedClsPrefix:t,mergedStyle:v(()=>{let{size:t,color:n}=e;return{fontSize:ae(t),color:n}}),cssVars:n?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$parent:e,depth:n,mergedClsPrefix:r,component:i,onRender:a,themeClass:o}=this;return e?.$options?._n_icon__&&h(`icon`,"don't wrap `n-icon` inside `n-icon`"),a?.(),t(`i`,l(this.$attrs,{role:`img`,class:[`${r}-icon`,o,{[`${r}-icon--depth`]:n,[`${r}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),i?t(i):this.$slots.default?.())}}),K=m(`n-dropdown-menu`),q=m(`n-dropdown`),J=m(`n-dropdown-option`),Y=u({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return n(),M(`div`,{class:b(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=y(e.value),i=null;return _(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=u({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=c(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:a,activeKeyPathRef:o,animatedRef:s,mergedShowRef:l,renderLabelRef:u,renderIconRef:f,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:_,menuPropsRef:b}=t,x=c(J,null),S=c(K),C=c(L),w=v(()=>e.tmNode.rawNode),T=v(()=>{let{value:t}=m;return X(e.tmNode.rawNode,t)}),E=v(()=>{let{disabled:t}=e.tmNode;return t}),D=ye(v(()=>{if(!T.value)return!1;let{key:t,disabled:o}=e.tmNode;if(o)return!1;let{value:s}=n,{value:c}=r,{value:l}=i,{value:u}=a;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,v(()=>r.value===null&&!s.value)),O=v(()=>!!x?.enteringSubmenuRef.value),k=y(!1);g(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:a}=e;a.disabled||l.value&&(i.value=t,r.value=null,n.value=a.key)}function N(){let{tmNode:t}=e;t.disabled||l.value&&n.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:r}=t;r&&!U({target:r},`dropdownOption`)&&!U({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=T,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:p,renderLabel:u,renderIcon:f,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:s,mergedShowSubmenu:v(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:d(()=>{let{value:t}=a,{key:n}=e.tmNode;return t.includes(n)}),childActive:d(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:d(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:h,nodeProps:_,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:r,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:s,renderLabel:c,renderIcon:u,renderOption:d,nodeProps:f,props:m,scrollable:h}=this,g=null;if(i){let e=this.menuProps?.(r,r.children);g=(t=>(n(),p($,l({key:1},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let _={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},v=f?.(r),y=(n(),M(`div`,l({class:[`${a}-dropdown-option`,v?.class],"data-dropdown-option":!0},v),[T(()=>t(`div`,l(_,m),[(n(),M(`div`,{class:b([`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`])},[T(()=>[u?u(r):W(r.icon)])],2)),(n(),M(`div`,{"data-dropdown-option":!0,class:b(`${a}-dropdown-option-body__label`)},[c?(n(),M(S,{key:0},[T(()=>c(r))],64)):(n(),M(S,{key:1},[T(()=>W(r[this.labelField]??r.title))],64))],2)),(n(),M(`div`,{"data-dropdown-option":!0,class:b([`${a}-dropdown-option-body__suffix`,s&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(n(),p(ge,{key:0},{_:1,default:x(()=>(n(),p(ue)))})):T(()=>null)],2))])),this.hasSubmenu?(n(),p(ne,{key:0},{default:()=>[(n(),p(se,null,{default:()=>(n(),M(`div`,{class:b(`${a}-dropdown-offset-container`)},[(n(),p(ie,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(n(),M(`div`,{class:b(`${a}-dropdown-menu-wrapper`)},[e?(n(),p(w,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(n(),M(S,{key:1},[T(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):T(()=>null)],16));return d?d({node:y,option:r}):y}}),be=u({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=c(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=c(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:r,nodeProps:i,renderLabel:a,renderOption:o}=this,{rawNode:s}=this.tmNode,c=(n(),M(`div`,l({class:`${e}-dropdown-option`},i?.(s)),[N(`div`,{class:b(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[N(`div`,{"data-dropdown-option":!0,class:b([`${e}-dropdown-option-body__prefix`,r&&`${e}-dropdown-option-body__prefix--show-icon`])},[T(()=>W(s.icon))],2),N(`div`,{class:b(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(n(),M(S,{key:0},[T(()=>a(s))],64)):(n(),M(S,{key:1},[T(()=>W(s.title??s[this.labelField]))],64))],2),N(`div`,{class:b([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return o?o({node:c,option:s}):c}}),xe=u({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:r,clsPrefix:i}=this,{children:a}=e;return n(),M(S,null,[(n(),p(be,{clsPrefix:i,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),T(()=>a?.map(e=>{let{rawNode:a}=e;return a.show===!1?null:Z(a)?t(Y,{clsPrefix:i,key:e.key}):e.isGroup?(h(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(n(),p(Q,{clsPrefix:i,tmNode:e,parentKey:r,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=u({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:n}}=this.tmNode;return t(`div`,n,[e?.()])}}),$=u({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=c(q);g(K,{showIconRef:v(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:v(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=y(null);return g(F,null),g(I,null),g(L,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:t,scrollable:r}=this,i=this.tmNodes.map(i=>{let{rawNode:a}=i;return a.show===!1?null:ve(a)?(n(),p(Se,{tmNode:i,key:i.key},null,8,[`tmNode`])):Z(a)?(n(),p(Y,{clsPrefix:t,key:i.key},null,8,[`clsPrefix`])):_e(a)?(n(),p(xe,{clsPrefix:t,tmNode:i,parentKey:e,key:i.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(n(),p(Q,{clsPrefix:t,tmNode:i,parentKey:e,key:i.key,props:a.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return n(),M(`div`,{class:b([`${t}-dropdown-menu`,r&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(n(),p(B,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(n(),M(S,{key:1},[T(()=>i)],64)),this.showArrow?(n(),M(S,{key:2},[T(()=>oe({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):T(()=>null)],2)}}),Ce=e(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ee(),e(`dropdown-option`,`
 position: relative;
 `,[f(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[f(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),e(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[f(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),k(`disabled`,[E(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[j(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),f(`&::before`,`background-color: var(--n-option-color-hover);`)]),E(`active`,`
 color: var(--n-option-text-color-active);
 `,[j(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),f(`&::before`,`background-color: var(--n-option-color-active);`)]),E(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[j(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),E(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),E(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[j(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[E(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),j(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[E(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),e(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),j(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),j(`suffix`,`
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
 `,[E(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),e(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),e(`dropdown-menu`,`pointer-events: all;`)]),e(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),e(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),e(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),f(`>`,[e(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),k(`scrollable`,`
 padding: var(--n-padding);
 `),E(`scrollable`,[j(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(H),Ee={...H,...we,...r.props},De=u({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=y(!1),n=re(O(e,`show`),t),i=v(()=>{let{keyField:t,childrenField:n}=e;return le(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=v(()=>i.value.treeNodes),c=y(null),l=y(null),u=y(null),f=v(()=>c.value??l.value??u.value??null),p=v(()=>i.value.getPath(f.value).keyPath),m=v(()=>i.value.getPath(e.value).keyPath),h=d(()=>e.keyboard&&n.value);pe({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:I},Escape:A}},h);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:S}=P(e),w=v(()=>e.size||S?.value?.Dropdown?.size||`medium`),T=r(`Dropdown`,`-dropdown`,Ce,de,e,b);g(q,{labelFieldRef:O(e,`labelField`),childrenFieldRef:O(e,`childrenField`),renderLabelRef:O(e,`renderLabel`),renderIconRef:O(e,`renderIcon`),hoverKeyRef:c,keyboardKeyRef:l,lastToggledSubmenuKeyRef:u,pendingKeyPathRef:p,activeKeyPathRef:m,animatedRef:O(e,`animated`),mergedShowRef:n,nodePropsRef:O(e,`nodeProps`),renderOptionRef:O(e,`renderOption`),menuPropsRef:O(e,`menuProps`),doSelect:E,doUpdateShow:D}),_(n,t=>{!e.animated&&!t&&k()});function E(t,n){let{onSelect:r}=e;r&&s(r,t,n)}function D(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&s(r,n),i&&s(i,n),t.value=n}function k(){c.value=null,l.value=null,u.value=null}function A(){D(!1)}function j(){R(`left`)}function M(){R(`right`)}function N(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(E(e.key,e.rawNode),D(!1))}function L(){let{value:e}=i,{value:t}=f;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=f,{value:{getFirstAvailableNode:n}}=i,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(c.value=null,l.value=r)}let z=v(()=>{let{inverted:t}=e,n=w.value,{common:{cubicBezierEaseInOut:r},self:i}=T.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[C(`optionIconSuffixWidth`,n)]:l,[C(`optionSuffixWidth`,n)]:u,[C(`optionIconPrefixWidth`,n)]:d,[C(`optionPrefixWidth`,n)]:f,[C(`fontSize`,n)]:p,[C(`optionHeight`,n)]:m,[C(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=x?a(`dropdown`,v(()=>`${w.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:b,mergedTheme:T,mergedSize:w,tmNodes:o,mergedShow:n,handleAfterLeave:()=>{e.animated&&k()},doUpdateShow:D,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,n,r,i,a)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},u={ref:G(n),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...r,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:i,onMouseleave:a};return t($,l(this.$attrs,u,c))},{mergedTheme:r}=this,i={show:this.mergedShow,theme:r.peers.Popover,themeOverrides:r.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return n(),p(ce,z(this.$props,Te,i),{_:1,trigger:x(()=>this.$slots.default?.())},16)}});export{G as n,De as t};