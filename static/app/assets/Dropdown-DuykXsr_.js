import{An as e,Cn as t,Dt as n,En as r,Fn as i,Gn as a,I as o,Mn as s,P as c,Pn as l,R as u,Rn as d,Sn as f,Wn as p,Zn as m,an as h,cr as g,dn as _,en as v,gt as y,hr as b,in as x,lr as S,mt as C,on as w,pt as T,rn as E,tn as D,ur as O,vn as k,wn as A,wt as j,xt as M,z as N,zn as P}from"./endpoints-BvEVWgoh.js";import{C as F,E as I,S as L,b as R,m as z,r as B,t as ee,v as te,x as V}from"./fade-in-scale-up.cssr-Bwy9Q-pZ.js";import{a as ne,i as re,n as H,o as ie,r as ae,s as oe,t as se}from"./Popover-DhPzouDG.js";import{r as U,t as ce}from"./create-CLOJQO3W.js";import{i as le}from"./cssr-CLoLU9gX.js";import{t as ue}from"./ChevronRight-CbCR9omE.js";import{D as de,R as W,S as fe}from"./index-BMaEOz3J.js";function pe(e={},t){let n=g({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:i}=e,a=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},o=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=()=>{(t===void 0||t.value)&&(V(`keydown`,document,a),V(`keyup`,document,o)),t!==void 0&&m(t,e=>{e?(V(`keydown`,document,a),V(`keyup`,document,o)):(R(`keydown`,document,a),R(`keyup`,document,o))})};return te()?(d(s),P(()=>{(t===void 0||t.value)&&(R(`keydown`,document,a),R(`keyup`,document,o))})):s(),S(n)}function G(e){return t=>{e.value=t?t.$el:null}}var me=D(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[x(`color-transition`,{transition:`color .3s var(--n-bezier)`}),x(`depth`,{color:`var(--n-color)`},[v(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),v(`svg`,{height:`1em`,width:`1em`})]),he={...u.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=e({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=M(e),r=u(`Icon`,`-icon`,me,fe,e,t),i=f(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),a=n?N(`icon`,f(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:f(()=>{let{size:t,color:n}=e;return{fontSize:oe(t),color:n}}),cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:r,component:a,onRender:o,themeClass:c}=this;return e?.$options?._n_icon__&&n(`icon`,"don't wrap `n-icon` inside `n-icon`"),o?.(),s(`i`,i(this.$attrs,{role:`img`,class:[`${r}-icon`,c,{[`${r}-icon--depth`]:t,[`${r}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),a?s(a):this.$slots.default?.())}}),K=j(`n-dropdown-menu`),q=j(`n-dropdown`),J=j(`n-dropdown-option`),Y=e({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return p(),r(`div`,{class:T(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=O(e.value),i=null;return m(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=e({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=l(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:u,mergedShowRef:d,renderLabelRef:p,renderIconRef:m,labelFieldRef:h,childrenFieldRef:g,renderOptionRef:_,nodePropsRef:v,menuPropsRef:y}=t,b=l(J,null),x=l(K),S=l(L),C=f(()=>e.tmNode.rawNode),w=f(()=>{let{value:t}=g;return X(e.tmNode.rawNode,t)}),T=f(()=>{let{disabled:t}=e.tmNode;return t}),E=ye(f(()=>{if(!w.value)return!1;let{key:t,disabled:a}=e.tmNode;if(a)return!1;let{value:o}=n,{value:c}=r,{value:l}=i,{value:u}=s;return o===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,f(()=>r.value===null&&!u.value)),D=f(()=>!!b?.enteringSubmenuRef.value),k=O(!1);a(J,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:a}=e;a.disabled||d.value&&(i.value=t,r.value=null,n.value=a.key)}function N(){let{tmNode:t}=e;t.disabled||d.value&&n.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!d.value)return;let{relatedTarget:r}=t;r&&!U({target:r},`dropdownOption`)&&!U({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=w,{tmNode:r}=e;d.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:h,renderLabel:p,renderIcon:m,siblingHasIcon:x.showIconRef,siblingHasSubmenu:x.hasSubmenuRef,menuProps:y,popoverBody:S,animated:u,mergedShowSubmenu:f(()=>E.value&&!D.value),rawNode:C,hasSubmenu:w,pending:o(()=>{let{value:t}=s,{key:n}=e.tmNode;return t.includes(n)}),childActive:o(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:o(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:T,renderOption:_,nodeProps:v,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:c,renderLabel:l,renderIcon:u,renderOption:d,nodeProps:f,props:m,scrollable:h}=this,g=null;if(n){let e=this.menuProps?.(t,t.children);g=(t=>(p(),A($,i({key:1},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let v={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},b=f?.(t),x=(p(),r(`div`,i({class:[`${a}-dropdown-option`,b?.class],"data-dropdown-option":!0},b),[y(()=>s(`div`,i(v,m),[(p(),r(`div`,{class:T([`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`])},[y(()=>[u?u(t):W(t.icon)])],2)),(p(),r(`div`,{"data-dropdown-option":!0,class:T(`${a}-dropdown-option-body__label`)},[l?(p(),r(k,{key:0},[y(()=>l(t))],64)):(p(),r(k,{key:1},[y(()=>W(t[this.labelField]??t.title))],64))],2)),(p(),r(`div`,{"data-dropdown-option":!0,class:T([`${a}-dropdown-option-body__suffix`,c&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(p(),A(ge,{key:0},{_:1,default:C(()=>(p(),A(ue)))})):y(()=>null)],2))])),this.hasSubmenu?(p(),A(ie,{key:0},{default:()=>[(p(),A(ne,null,{default:()=>(p(),r(`div`,{class:T(`${a}-dropdown-offset-container`)},[(p(),A(re,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(p(),r(`div`,{class:T(`${a}-dropdown-menu-wrapper`)},[e?(p(),A(_,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(p(),r(k,{key:1},[y(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):y(()=>null)],16));return d?d({node:x,option:t}):x}}),be=e({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=l(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=l(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:n,showIcon:a,nodeProps:o,renderLabel:s,renderOption:c}=this,{rawNode:l}=this.tmNode,u=(p(),r(`div`,i({class:`${e}-dropdown-option`},o?.(l)),[t(`div`,{class:T(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[t(`div`,{"data-dropdown-option":!0,class:T([`${e}-dropdown-option-body__prefix`,a&&`${e}-dropdown-option-body__prefix--show-icon`])},[y(()=>W(l.icon))],2),t(`div`,{class:T(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[s?(p(),r(k,{key:0},[y(()=>s(l))],64)):(p(),r(k,{key:1},[y(()=>W(l.title??l[this.labelField]))],64))],2),t(`div`,{class:T([`${e}-dropdown-option-body__suffix`,n&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return c?c({node:u,option:l}):u}}),xe=e({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:i}=this,{children:a}=e;return p(),r(k,null,[(p(),A(be,{clsPrefix:i,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),y(()=>a?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Z(r)?s(Y,{clsPrefix:i,key:e.key}):e.isGroup?(n(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(p(),A(Q,{clsPrefix:i,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=e({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return s(`div`,t,[e?.()])}}),$=e({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=l(q);a(K,{showIconRef:f(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:f(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=O(null);return a(F,null),a(I,null),a(L,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,i=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:ve(i)?(p(),A(Se,{tmNode:r,key:r.key},null,8,[`tmNode`])):Z(i)?(p(),A(Y,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):_e(i)?(p(),A(xe,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(p(),A(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return p(),r(`div`,{class:T([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(p(),A(B,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(p(),r(k,{key:1},[y(()=>i)],64)),this.showArrow?(p(),r(k,{key:2},[y(()=>ae({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):y(()=>null)],2)}}),Ce=D(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[ee(),D(`dropdown-option`,`
 position: relative;
 `,[v(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[v(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),D(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[v(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),h(`disabled`,[x(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[E(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),v(`&::before`,`background-color: var(--n-option-color-hover);`)]),x(`active`,`
 color: var(--n-option-text-color-active);
 `,[E(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),v(`&::before`,`background-color: var(--n-option-color-active);`)]),x(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[E(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),x(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),x(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[E(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[x(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),E(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[x(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),D(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),E(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),E(`suffix`,`
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
 `),D(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),D(`dropdown-menu`,`pointer-events: all;`)]),D(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),D(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),D(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),v(`>`,[D(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),h(`scrollable`,`
 padding: var(--n-padding);
 `),x(`scrollable`,[E(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(H),Ee={...H,...we,...u.props},De=e({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=O(!1),n=le(b(e,`show`),t),r=f(()=>{let{keyField:t,childrenField:n}=e;return ce(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),i=f(()=>r.value.treeNodes),s=O(null),l=O(null),d=O(null),p=f(()=>s.value??l.value??d.value??null),h=f(()=>r.value.getPath(p.value).keyPath),g=f(()=>r.value.getPath(e.value).keyPath),_=o(()=>e.keyboard&&n.value);pe({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:j},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:I},Escape:k}},_);let{mergedClsPrefixRef:v,inlineThemeDisabled:y,mergedComponentPropsRef:x}=M(e),S=f(()=>e.size||x?.value?.Dropdown?.size||`medium`),C=u(`Dropdown`,`-dropdown`,Ce,de,e,v);a(q,{labelFieldRef:b(e,`labelField`),childrenFieldRef:b(e,`childrenField`),renderLabelRef:b(e,`renderLabel`),renderIconRef:b(e,`renderIcon`),hoverKeyRef:s,keyboardKeyRef:l,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:h,activeKeyPathRef:g,animatedRef:b(e,`animated`),mergedShowRef:n,nodePropsRef:b(e,`nodeProps`),renderOptionRef:b(e,`renderOption`),menuPropsRef:b(e,`menuProps`),doSelect:T,doUpdateShow:E}),m(n,t=>{!e.animated&&!t&&D()});function T(t,n){let{onSelect:r}=e;r&&c(r,t,n)}function E(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&c(r,n),i&&c(i,n),t.value=n}function D(){s.value=null,l.value=null,d.value=null}function k(){E(!1)}function A(){R(`left`)}function j(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(T(e.key,e.rawNode),E(!1))}function L(){let{value:e}=r,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=r,i=null;if(t===null){let e=n();e!==null&&(i=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(i=n.key)}}i!==null&&(s.value=null,l.value=i)}let z=f(()=>{let{inverted:t}=e,n=S.value,{common:{cubicBezierEaseInOut:r},self:i}=C.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[w(`optionIconSuffixWidth`,n)]:l,[w(`optionSuffixWidth`,n)]:u,[w(`optionIconPrefixWidth`,n)]:d,[w(`optionPrefixWidth`,n)]:f,[w(`fontSize`,n)]:p,[w(`optionHeight`,n)]:m,[w(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=y?N(`dropdown`,f(()=>`${S.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:v,mergedTheme:C,mergedSize:S,tmNodes:i,mergedShow:n,handleAfterLeave:()=>{e.animated&&D()},doUpdateShow:E,cssVars:y?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,a)=>{let{mergedClsPrefix:o,menuProps:c}=this;this.onRender?.();let l=c?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},u={ref:G(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:a};return s($,i(this.$attrs,u,l))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return p(),A(se,z(this.$props,Te,n),{_:1,trigger:C(()=>this.$slots.default?.())},16)}});export{G as n,De as t};