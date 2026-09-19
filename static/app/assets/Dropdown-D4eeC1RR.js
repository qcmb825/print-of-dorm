import{C as e,E as t,F as n,H as r,J as i,L as a,M as o,S as s,St as c,U as l,Y as u,_ as d,_t as f,gt as p,ht as m,it as h,w as g,z as _}from"./endpoints-NGWT2QHn.js";import{$t as v,A as y,E as b,Jt as x,Qt as S,Xt as C,Zt as w,_t as T,bt as E,in as D,k as O,lt as k,mt as A,ot as j,qt as M,st as N,w as P}from"./Button-BESWyFjO.js";import{a as F,c as I,f as L,i as R,o as z,r as B,s as ee,t as te}from"./create-DREZ0fGL.js";import{c as V,n as ne,s as H}from"./Scrollbar-DOdDOhFI.js";import{t as re}from"./use-merged-state-BjnG4E4i.js";import{t as ie}from"./format-length-BwSo_EUP.js";import{t as ae}from"./ChevronRight-ILaiJTj0.js";import{E as oe,L as se,R as U,at as W,et as ce,ot as le,rt as ue,st as de,x as fe}from"./index-DnFKtpL1.js";function pe(e={},t){let n=m({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:i,keyup:a}=e,o=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=()=>{(t===void 0||t.value)&&(V(`keydown`,document,o),V(`keyup`,document,s)),t!==void 0&&h(t,e=>{e?(V(`keydown`,document,o),V(`keyup`,document,s)):(H(`keydown`,document,o),H(`keyup`,document,s))})};return ue()?(r(c),l(()=>{(t===void 0||t.value)&&(H(`keydown`,document,o),H(`keyup`,document,s))})):c(),p(n)}function G(e){return t=>{e.value=t?t.$el:null}}var me=x(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[w(`color-transition`,{transition:`color .3s var(--n-bezier)`}),w(`depth`,{color:`var(--n-color)`},[M(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),M(`svg`,{height:`1em`,width:`1em`})]),he={...O.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=o({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=A(e),r=O(`Icon`,`-icon`,me,fe,e,t),i=s(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?y(`icon`,s(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:s(()=>{let{size:t,color:n}=e;return{fontSize:ie(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:r,component:i,onRender:a,themeClass:o}=this;return e?.$options?._n_icon__&&E(`icon`,"don't wrap `n-icon` inside `n-icon`"),a?.(),n(`i`,_(this.$attrs,{role:`img`,class:[`${r}-icon`,o,{[`${r}-icon--depth`]:t,[`${r}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),i?n(i):this.$slots.default?.())}}),K=T(`n-dropdown-menu`),q=T(`n-dropdown`),J=T(`n-dropdown-option`),Y=o({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return i(),t(`div`,{class:j(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=f(e.value),i=null;return h(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=o({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=a(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:o,activeKeyPathRef:c,animatedRef:l,mergedShowRef:d,renderLabelRef:p,renderIconRef:m,labelFieldRef:h,childrenFieldRef:g,renderOptionRef:_,nodePropsRef:v,menuPropsRef:y}=t,x=a(J,null),S=a(K),C=a(W),w=s(()=>e.tmNode.rawNode),T=s(()=>{let{value:t}=g;return X(e.tmNode.rawNode,t)}),E=s(()=>{let{disabled:t}=e.tmNode;return t}),D=ye(s(()=>{if(!T.value)return!1;let{key:t,disabled:a}=e.tmNode;if(a)return!1;let{value:s}=n,{value:c}=r,{value:l}=i,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,s(()=>r.value===null&&!l.value)),O=s(()=>!!x?.enteringSubmenuRef.value),k=f(!1);u(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:a}=e;a.disabled||d.value&&(i.value=t,r.value=null,n.value=a.key)}function N(){let{tmNode:t}=e;t.disabled||d.value&&n.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!d.value)return;let{relatedTarget:r}=t;r&&!L({target:r},`dropdownOption`)&&!L({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=T,{tmNode:r}=e;d.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:h,renderLabel:p,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:y,popoverBody:C,animated:l,mergedShowSubmenu:s(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:b(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:b(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:b(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:_,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:r,mergedShowSubmenu:a,clsPrefix:o,siblingHasIcon:s,siblingHasSubmenu:c,renderLabel:l,renderIcon:u,renderOption:f,nodeProps:p,props:m,scrollable:h}=this,v=null;if(a){let e=this.menuProps?.(r,r.children);v=(t=>(i(),g($,_({key:1},e,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let y={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=p?.(r),x=(i(),t(`div`,_({class:[`${o}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[k(()=>n(`div`,_(y,m),[(i(),t(`div`,{class:j([`${o}-dropdown-option-body__prefix`,s&&`${o}-dropdown-option-body__prefix--show-icon`])},[k(()=>[u?u(r):U(r.icon)])],2)),(i(),t(`div`,{"data-dropdown-option":!0,class:j(`${o}-dropdown-option-body__label`)},[l?(i(),t(d,{key:0},[k(()=>l(r))],64)):(i(),t(d,{key:1},[k(()=>U(r[this.labelField]??r.title))],64))],2)),(i(),t(`div`,{"data-dropdown-option":!0,class:j([`${o}-dropdown-option-body__suffix`,c&&`${o}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(i(),g(ge,{key:0},{_:1,default:N(()=>(i(),g(ae)))})):k(()=>null)],2))])),this.hasSubmenu?(i(),g(I,{key:0},{default:()=>[(i(),g(ee,null,{default:()=>(i(),t(`div`,{class:j(`${o}-dropdown-offset-container`)},[(i(),g(z,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(i(),t(`div`,{class:j(`${o}-dropdown-menu-wrapper`)},[e?(i(),g(D,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(i(),t(d,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return f?f({node:x,option:r}):x}}),be=o({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=a(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:o}=a(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:o}},render(){let{clsPrefix:n,hasSubmenu:r,showIcon:a,nodeProps:o,renderLabel:s,renderOption:c}=this,{rawNode:l}=this.tmNode,u=(i(),t(`div`,_({class:`${n}-dropdown-option`},o?.(l)),[e(`div`,{class:j(`${n}-dropdown-option-body ${n}-dropdown-option-body--group`)},[e(`div`,{"data-dropdown-option":!0,class:j([`${n}-dropdown-option-body__prefix`,a&&`${n}-dropdown-option-body__prefix--show-icon`])},[k(()=>U(l.icon))],2),e(`div`,{class:j(`${n}-dropdown-option-body__label`),"data-dropdown-option":!0},[s?(i(),t(d,{key:0},[k(()=>s(l))],64)):(i(),t(d,{key:1},[k(()=>U(l.title??l[this.labelField]))],64))],2),e(`div`,{class:j([`${n}-dropdown-option-body__suffix`,r&&`${n}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return c?c({node:u,option:l}):u}}),xe=o({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:r,clsPrefix:a}=this,{children:o}=e;return i(),t(d,null,[(i(),g(be,{clsPrefix:a,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>o?.map(e=>{let{rawNode:t}=e;return t.show===!1?null:Z(t)?n(Y,{clsPrefix:a,key:e.key}):e.isGroup?(E(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(i(),g(Q,{clsPrefix:a,tmNode:e,parentKey:r,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=o({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return n(`div`,t,[e?.()])}}),$=o({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=a(q);u(K,{showIconRef:s(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:s(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=f(null);return u(le,null),u(de,null),u(W,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:n,scrollable:r}=this,a=this.tmNodes.map(t=>{let{rawNode:a}=t;return a.show===!1?null:ve(a)?(i(),g(Se,{tmNode:t,key:t.key},null,8,[`tmNode`])):Z(a)?(i(),g(Y,{clsPrefix:n,key:t.key},null,8,[`clsPrefix`])):_e(a)?(i(),g(xe,{clsPrefix:n,tmNode:t,parentKey:e,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(i(),g(Q,{clsPrefix:n,tmNode:t,parentKey:e,key:t.key,props:a.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return i(),t(`div`,{class:j([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(i(),g(ne,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>a},1032,[`contentClass`])):(i(),t(d,{key:1},[k(()=>a)],64)),this.showArrow?(i(),t(d,{key:2},[k(()=>F({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),Ce=x(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[se(),x(`dropdown-option`,`
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
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(R),Ee={...R,...we,...O.props},De=o({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=f(!1),n=re(c(e,`show`),t),r=s(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),i=s(()=>r.value.treeNodes),a=f(null),o=f(null),l=f(null),d=s(()=>a.value??o.value??l.value??null),p=s(()=>r.value.getPath(d.value).keyPath),m=s(()=>r.value.getPath(e.value).keyPath),g=b(()=>e.keyboard&&n.value);pe({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:I},Escape:k}},g);let{mergedClsPrefixRef:_,inlineThemeDisabled:x,mergedComponentPropsRef:S}=A(e),C=s(()=>e.size||S?.value?.Dropdown?.size||`medium`),w=O(`Dropdown`,`-dropdown`,Ce,oe,e,_);u(q,{labelFieldRef:c(e,`labelField`),childrenFieldRef:c(e,`childrenField`),renderLabelRef:c(e,`renderLabel`),renderIconRef:c(e,`renderIcon`),hoverKeyRef:a,keyboardKeyRef:o,lastToggledSubmenuKeyRef:l,pendingKeyPathRef:p,activeKeyPathRef:m,animatedRef:c(e,`animated`),mergedShowRef:n,nodePropsRef:c(e,`nodeProps`),renderOptionRef:c(e,`renderOption`),menuPropsRef:c(e,`menuProps`),doSelect:T,doUpdateShow:E}),h(n,t=>{!e.animated&&!t&&D()});function T(t,n){let{onSelect:r}=e;r&&P(r,t,n)}function E(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&P(r,n),i&&P(i,n),t.value=n}function D(){a.value=null,o.value=null,l.value=null}function k(){E(!1)}function j(){R(`left`)}function M(){R(`right`)}function N(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(T(e.key,e.rawNode),E(!1))}function L(){let{value:e}=r,{value:t}=d;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=d,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(i=n.key)}}i!==null&&(a.value=null,o.value=i)}let z=s(()=>{let{inverted:t}=e,n=C.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[v(`optionIconSuffixWidth`,n)]:l,[v(`optionSuffixWidth`,n)]:u,[v(`optionIconPrefixWidth`,n)]:d,[v(`optionPrefixWidth`,n)]:f,[v(`fontSize`,n)]:p,[v(`optionHeight`,n)]:m,[v(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=x?y(`dropdown`,s(()=>`${C.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:_,mergedTheme:w,mergedSize:C,tmNodes:i,mergedShow:n,handleAfterLeave:()=>{e.animated&&D()},doUpdateShow:E,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,r,i,a)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:G(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...r,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:i,onMouseleave:a};return n($,_(this.$attrs,l,c))},{mergedTheme:t}=this,r={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return i(),g(B,ce(this.$props,Te,r),{_:1,trigger:N(()=>this.$slots.default?.())},16)}});export{G as n,De as t};