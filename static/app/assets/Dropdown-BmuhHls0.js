import{B as e,C as t,Ct as n,D as r,I as i,N as a,R as o,T as s,U as c,W as l,X as u,Y as d,_t as f,at as p,gt as m,v as h,vt as g,w as _}from"./endpoints-Dbyqu7A9.js";import{$t as v,A as y,E as b,Jt as x,Qt as S,Xt as C,Zt as w,_t as T,bt as E,in as D,k as O,lt as k,mt as A,ot as j,qt as M,st as N,w as P}from"./Button-BxGCouy9.js";import{a as F,c as I,f as L,i as R,o as z,r as B,s as ee,t as te}from"./create-B_R38_j-.js";import{c as V,n as ne,s as H}from"./Scrollbar-C8Z2j7v0.js";import{t as re}from"./use-merged-state-Dr6T6PXv.js";import{t as ie}from"./format-length-BwSo_EUP.js";import{t as ae}from"./ChevronRight-C7N3sksi.js";import{B as U,C as oe,O as se,at as ce,ct as le,lt as ue,nt as de,st as W,z as fe}from"./index--aUAD0wK.js";function G(e={},t){let n=m({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:i}=e,a=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},o=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=()=>{(t===void 0||t.value)&&(V(`keydown`,document,a),V(`keyup`,document,o)),t!==void 0&&p(t,e=>{e?(V(`keydown`,document,a),V(`keyup`,document,o)):(H(`keydown`,document,a),H(`keyup`,document,o))})};return ce()?(c(s),l(()=>{(t===void 0||t.value)&&(H(`keydown`,document,a),H(`keyup`,document,o))})):s(),f(n)}function K(e){return t=>{e.value=t?t.$el:null}}var pe=x(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[w(`color-transition`,{transition:`color .3s var(--n-bezier)`}),w(`depth`,{color:`var(--n-color)`},[M(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),M(`svg`,{height:`1em`,width:`1em`})]),me={...O.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},he=a({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:me,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=A(e),i=O(`Icon`,`-icon`,pe,oe,e,n),a=t(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=r?y(`icon`,t(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:n,mergedStyle:t(()=>{let{size:t,color:n}=e;return{fontSize:ie(t),color:n}}),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:t,depth:n,mergedClsPrefix:r,component:a,onRender:o,themeClass:s}=this;return t?.$options?._n_icon__&&E(`icon`,"don't wrap `n-icon` inside `n-icon`"),o?.(),i(`i`,e(this.$attrs,{role:`img`,class:[`${r}-icon`,s,{[`${r}-icon--depth`]:n,[`${r}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),a?i(a):this.$slots.default?.())}}),q=T(`n-dropdown-menu`),J=T(`n-dropdown`),Y=T(`n-dropdown-option`),X=a({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return d(),r(`div`,{class:j(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Z(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ge(e){return e.type===`group`}function Q(e){return e.type===`divider`}function _e(e){return e.type===`render`}function ve(e,t,n){if(!t)return e;let r=g(e.value),i=null;return p(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var $=a({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let n=o(J),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:l,mergedShowRef:d,renderLabelRef:f,renderIconRef:p,labelFieldRef:m,childrenFieldRef:h,renderOptionRef:_,nodePropsRef:v,menuPropsRef:y}=n,x=o(Y,null),S=o(q),C=o(W),w=t(()=>e.tmNode.rawNode),T=t(()=>{let{value:t}=h;return Z(e.tmNode.rawNode,t)}),E=t(()=>{let{disabled:t}=e.tmNode;return t}),D=ve(t(()=>{if(!T.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:o}=r,{value:c}=i,{value:l}=a,{value:u}=s;return o===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,t(()=>i.value===null&&!l.value)),O=t(()=>!!x?.enteringSubmenuRef.value),k=g(!1);u(Y,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:n}=e;n.disabled||d.value&&(a.value=t,i.value=null,r.value=n.key)}function N(){let{tmNode:t}=e;t.disabled||d.value&&r.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!d.value)return;let{relatedTarget:n}=t;n&&!L({target:n},`dropdownOption`)&&!L({target:n},`scrollbarRail`)&&(r.value=null)}function F(){let{value:t}=T,{tmNode:r}=e;d.value&&!t&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:m,renderLabel:f,renderIcon:p,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:y,popoverBody:C,animated:l,mergedShowSubmenu:t(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:b(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:b(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:b(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:_,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:t,rawNode:n,mergedShowSubmenu:a,clsPrefix:o,siblingHasIcon:c,siblingHasSubmenu:l,renderLabel:u,renderIcon:f,renderOption:p,nodeProps:m,props:g,scrollable:_}=this,v=null;if(a){let t=this.menuProps?.(n,n.children);v=(n=>(d(),s(Se,e({key:1},t,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=m?.(n),x=(d(),r(`div`,e({class:[`${o}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[k(()=>i(`div`,e(y,g),[(d(),r(`div`,{class:j([`${o}-dropdown-option-body__prefix`,c&&`${o}-dropdown-option-body__prefix--show-icon`])},[k(()=>[f?f(n):U(n.icon)])],2)),(d(),r(`div`,{"data-dropdown-option":!0,class:j(`${o}-dropdown-option-body__label`)},[u?(d(),r(h,{key:0},[k(()=>u(n))],64)):(d(),r(h,{key:1},[k(()=>U(n[this.labelField]??n.title))],64))],2)),(d(),r(`div`,{"data-dropdown-option":!0,class:j([`${o}-dropdown-option-body__suffix`,l&&`${o}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(d(),s(he,{key:0},{_:1,default:N(()=>(d(),s(ae)))})):k(()=>null)],2))])),this.hasSubmenu?(d(),s(I,{key:0},{default:()=>[(d(),s(ee,null,{default:()=>(d(),r(`div`,{class:j(`${o}-dropdown-offset-container`)},[(d(),s(z,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(d(),r(`div`,{class:j(`${o}-dropdown-menu-wrapper`)},[t?(d(),s(D,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(d(),r(h,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return p?p({node:x,option:n}):x}}),ye=a({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=o(q),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=o(J);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:t,hasSubmenu:n,showIcon:i,nodeProps:a,renderLabel:o,renderOption:s}=this,{rawNode:c}=this.tmNode,l=(d(),r(`div`,e({class:`${t}-dropdown-option`},a?.(c)),[_(`div`,{class:j(`${t}-dropdown-option-body ${t}-dropdown-option-body--group`)},[_(`div`,{"data-dropdown-option":!0,class:j([`${t}-dropdown-option-body__prefix`,i&&`${t}-dropdown-option-body__prefix--show-icon`])},[k(()=>U(c.icon))],2),_(`div`,{class:j(`${t}-dropdown-option-body__label`),"data-dropdown-option":!0},[o?(d(),r(h,{key:0},[k(()=>o(c))],64)):(d(),r(h,{key:1},[k(()=>U(c.title??c[this.labelField]))],64))],2),_(`div`,{class:j([`${t}-dropdown-option-body__suffix`,n&&`${t}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return s?s({node:l,option:c}):l}}),be=a({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:a}=e;return d(),r(h,null,[(d(),s(ye,{clsPrefix:n,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>a?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Q(r)?i(X,{clsPrefix:n,key:e.key}):e.isGroup?(E(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(d(),s($,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),xe=a({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return i(`div`,t,[e?.()])}}),Se=a({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:n,childrenFieldRef:r}=o(J);u(q,{showIconRef:t(()=>{let t=n.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>t?t(e):e.icon);let{rawNode:n}=e;return t?t(n):n.icon})}),hasSubmenuRef:t(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Z(e,t));let{rawNode:n}=e;return Z(n,t)})})});let i=g(null);return u(le,null),u(ue,null),u(W,i),{bodyRef:i}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,i=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:_e(i)?(d(),s(xe,{tmNode:r,key:r.key},null,8,[`tmNode`])):Q(i)?(d(),s(X,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):ge(i)?(d(),s(be,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(d(),s($,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return d(),r(`div`,{class:j([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(d(),s(ne,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(d(),r(h,{key:1},[k(()=>i)],64)),this.showArrow?(d(),r(h,{key:2},[k(()=>F({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),Ce=x(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[fe(),x(`dropdown-option`,`
 position: relative;
 `,[M(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[M(`&::before`,`
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
 `,[M(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),S(`disabled`,[w(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[C(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),M(`&::before`,`background-color: var(--n-option-color-hover);`)]),w(`active`,`
 color: var(--n-option-text-color-active);
 `,[C(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),M(`&::before`,`background-color: var(--n-option-color-active);`)]),w(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[C(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),w(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),w(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[C(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[w(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),C(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[w(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),x(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),C(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),C(`suffix`,`
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
 `,[w(`has-submenu`,`
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
 `),M(`>`,[x(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),S(`scrollable`,`
 padding: var(--n-padding);
 `),w(`scrollable`,[C(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(R),Ee={...R,...we,...O.props},De=a({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let r=g(!1),i=re(n(e,`show`),r),a=t(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=t(()=>a.value.treeNodes),s=g(null),c=g(null),l=g(null),d=t(()=>s.value??c.value??l.value??null),f=t(()=>a.value.getPath(d.value).keyPath),m=t(()=>a.value.getPath(e.value).keyPath),h=b(()=>e.keyboard&&i.value);G({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:I},Escape:k}},h);let{mergedClsPrefixRef:_,inlineThemeDisabled:x,mergedComponentPropsRef:S}=A(e),C=t(()=>e.size||S?.value?.Dropdown?.size||`medium`),w=O(`Dropdown`,`-dropdown`,Ce,se,e,_);u(J,{labelFieldRef:n(e,`labelField`),childrenFieldRef:n(e,`childrenField`),renderLabelRef:n(e,`renderLabel`),renderIconRef:n(e,`renderIcon`),hoverKeyRef:s,keyboardKeyRef:c,lastToggledSubmenuKeyRef:l,pendingKeyPathRef:f,activeKeyPathRef:m,animatedRef:n(e,`animated`),mergedShowRef:i,nodePropsRef:n(e,`nodeProps`),renderOptionRef:n(e,`renderOption`),menuPropsRef:n(e,`menuProps`),doSelect:T,doUpdateShow:E}),p(i,t=>{!e.animated&&!t&&D()});function T(t,n){let{onSelect:r}=e;r&&P(r,t,n)}function E(t){let{"onUpdate:show":n,onUpdateShow:i}=e;n&&P(n,t),i&&P(i,t),r.value=t}function D(){s.value=null,c.value=null,l.value=null}function k(){E(!1)}function j(){R(`left`)}function M(){R(`right`)}function N(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&i.value&&(T(e.key,e.rawNode),E(!1))}function L(){let{value:e}=a,{value:t}=d;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=d,{value:{getFirstAvailableNode:n}}=a,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(s.value=null,c.value=r)}let z=t(()=>{let{inverted:t}=e,n=C.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[v(`optionIconSuffixWidth`,n)]:l,[v(`optionSuffixWidth`,n)]:u,[v(`optionIconPrefixWidth`,n)]:d,[v(`optionPrefixWidth`,n)]:f,[v(`fontSize`,n)]:p,[v(`optionHeight`,n)]:m,[v(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=x?y(`dropdown`,t(()=>`${C.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:_,mergedTheme:w,mergedSize:C,tmNodes:o,mergedShow:i,handleAfterLeave:()=>{e.animated&&D()},doUpdateShow:E,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let t=(t,n,r,a,o)=>{let{mergedClsPrefix:s,menuProps:c}=this;this.onRender?.();let l=c?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},u={ref:K(n),class:[t,`${s}-dropdown`,`${s}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:s,tmNodes:this.tmNodes,style:[...r,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:a,onMouseleave:o};return i(Se,e(this.$attrs,u,l))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return d(),s(B,de(this.$props,Te,r),{_:1,trigger:N(()=>this.$slots.default?.())},16)}});export{K as n,G as r,De as t};