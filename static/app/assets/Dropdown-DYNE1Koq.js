import{An as e,At as t,Dt as n,Gn as r,H as i,Hn as a,Kn as o,L as s,Ln as c,Mn as l,Nt as u,On as d,Qn as f,Sr as p,St as m,U as h,Vn as g,Zn as _,_n as v,_r as y,bt as b,dn as x,fn as S,gr as C,hr as w,ir as T,kn as E,ln as D,on as O,sn as k,un as A,wn as j,yt as M,z as N,zn as P}from"./endpoints-DxQPCLqF.js";import{a as F,c as I,f as L,i as R,o as z,r as B,s as ee,t as te}from"./create-Cnw189WE.js";import{c as V,n as ne,s as H}from"./Scrollbar-C-sdX_Vk.js";import{t as re}from"./use-merged-state-BBKZotlX.js";import{t as ie}from"./format-length-BwSo_EUP.js";import{t as ae}from"./ChevronRight-DFEr4PZO.js";import{B as U,C as oe,O as se,at as ce,ct as le,lt as ue,nt as de,st as W,z as fe}from"./index-Dp3yRsNZ.js";function pe(e={},t){let n=w({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:i,keyup:a}=e,s=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},l=()=>{(t===void 0||t.value)&&(V(`keydown`,document,s),V(`keyup`,document,c)),t!==void 0&&T(t,e=>{e?(V(`keydown`,document,s),V(`keyup`,document,c)):(H(`keydown`,document,s),H(`keyup`,document,c))})};return ce()?(r(l),o(()=>{(t===void 0||t.value)&&(H(`keydown`,document,s),H(`keyup`,document,c))})):l(),C(n)}function G(e){return t=>{e.value=t?t.$el:null}}var me=k(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[A(`color-transition`,{transition:`color .3s var(--n-bezier)`}),A(`depth`,{color:`var(--n-color)`},[O(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),O(`svg`,{height:`1em`,width:`1em`})]),he={...i.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=c({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=n(e),a=i(`Icon`,`-icon`,me,oe,e,t),o=d(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=a.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),s=r?h(`icon`,d(()=>`${e.depth||`d`}`),o,e):void 0;return{mergedClsPrefix:t,mergedStyle:d(()=>{let{size:t,color:n}=e;return{fontSize:ie(t),color:n}}),cssVars:r?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:o}=this;return e?.$options?._n_icon__&&u(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),P(`i`,a(this.$attrs,{role:`img`,class:[`${n}-icon`,o,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?P(r):this.$slots.default?.())}}),K=t(`n-dropdown-menu`),q=t(`n-dropdown`),J=t(`n-dropdown-option`),Y=c({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return _(),l(`div`,{class:M(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=y(e.value),i=null;return T(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=c({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=g(q),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:a,activeKeyPathRef:o,animatedRef:s,mergedShowRef:c,renderLabelRef:l,renderIconRef:u,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:_,menuPropsRef:v}=t,b=g(J,null),x=g(K),S=g(W),C=d(()=>e.tmNode.rawNode),w=d(()=>{let{value:t}=m;return X(e.tmNode.rawNode,t)}),T=d(()=>{let{disabled:t}=e.tmNode;return t}),E=ye(d(()=>{if(!w.value)return!1;let{key:t,disabled:o}=e.tmNode;if(o)return!1;let{value:s}=n,{value:c}=r,{value:l}=i,{value:u}=a;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,d(()=>r.value===null&&!s.value)),D=d(()=>!!b?.enteringSubmenuRef.value),O=y(!1);f(J,{enteringSubmenuRef:O});function k(){O.value=!0}function A(){O.value=!1}function j(){let{parentKey:t,tmNode:a}=e;a.disabled||c.value&&(i.value=t,r.value=null,n.value=a.key)}function M(){let{tmNode:t}=e;t.disabled||c.value&&n.value!==t.key&&j()}function P(t){if(e.tmNode.disabled||!c.value)return;let{relatedTarget:r}=t;r&&!L({target:r},`dropdownOption`)&&!L({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=w,{tmNode:r}=e;c.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:p,renderLabel:l,renderIcon:u,siblingHasIcon:x.showIconRef,siblingHasSubmenu:x.hasSubmenuRef,menuProps:v,popoverBody:S,animated:s,mergedShowSubmenu:d(()=>E.value&&!D.value),rawNode:C,hasSubmenu:w,pending:N(()=>{let{value:t}=a,{key:n}=e.tmNode;return t.includes(n)}),childActive:N(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:N(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:T,renderOption:h,nodeProps:_,handleClick:F,handleMouseMove:M,handleMouseEnter:j,handleMouseLeave:P,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:A}},render(){let{animated:t,rawNode:n,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:o,siblingHasSubmenu:s,renderLabel:c,renderIcon:u,renderOption:d,nodeProps:f,props:p,scrollable:h}=this,g=null;if(r){let t=this.menuProps?.(n,n.children);g=(n=>(_(),e($,a({key:1},t,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let y={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},x=f?.(n),S=(_(),l(`div`,a({class:[`${i}-dropdown-option`,x?.class],"data-dropdown-option":!0},x),[m(()=>P(`div`,a(y,p),[(_(),l(`div`,{class:M([`${i}-dropdown-option-body__prefix`,o&&`${i}-dropdown-option-body__prefix--show-icon`])},[m(()=>[u?u(n):U(n.icon)])],2)),(_(),l(`div`,{"data-dropdown-option":!0,class:M(`${i}-dropdown-option-body__label`)},[c?(_(),l(j,{key:0},[m(()=>c(n))],64)):(_(),l(j,{key:1},[m(()=>U(n[this.labelField]??n.title))],64))],2)),(_(),l(`div`,{"data-dropdown-option":!0,class:M([`${i}-dropdown-option-body__suffix`,s&&`${i}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(_(),e(ge,{key:0},{_:1,default:b(()=>(_(),e(ae)))})):m(()=>null)],2))])),this.hasSubmenu?(_(),e(I,{key:0},{default:()=>[(_(),e(ee,null,{default:()=>(_(),l(`div`,{class:M(`${i}-dropdown-offset-container`)},[(_(),e(z,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(_(),l(`div`,{class:M(`${i}-dropdown-menu-wrapper`)},[t?(_(),e(v,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(_(),l(j,{key:1},[m(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):m(()=>null)],16));return d?d({node:S,option:n}):S}}),be=c({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=g(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=g(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:o}=this,{rawNode:s}=this.tmNode,c=(_(),l(`div`,a({class:`${e}-dropdown-option`},r?.(s)),[E(`div`,{class:M(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[E(`div`,{"data-dropdown-option":!0,class:M([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[m(()=>U(s.icon))],2),E(`div`,{class:M(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[i?(_(),l(j,{key:0},[m(()=>i(s))],64)):(_(),l(j,{key:1},[m(()=>U(s.title??s[this.labelField]))],64))],2),E(`div`,{class:M([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return o?o({node:c,option:s}):c}}),xe=c({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:t,parentKey:n,clsPrefix:r}=this,{children:i}=t;return _(),l(j,null,[(_(),e(be,{clsPrefix:r,tmNode:t,key:t.key},null,8,[`clsPrefix`,`tmNode`])),m(()=>i?.map(t=>{let{rawNode:i}=t;return i.show===!1?null:Z(i)?P(Y,{clsPrefix:r,key:t.key}):t.isGroup?(u(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(_(),e(Q,{clsPrefix:r,tmNode:t,parentKey:n,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=c({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return P(`div`,t,[e?.()])}}),$=c({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=g(q);f(K,{showIconRef:d(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:d(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let r=y(null);return f(le,null),f(ue,null),f(W,r),{bodyRef:r}},render(){let{parentKey:t,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(i=>{let{rawNode:a}=i;return a.show===!1?null:ve(a)?(_(),e(Se,{tmNode:i,key:i.key},null,8,[`tmNode`])):Z(a)?(_(),e(Y,{clsPrefix:n,key:i.key},null,8,[`clsPrefix`])):_e(a)?(_(),e(xe,{clsPrefix:n,tmNode:i,parentKey:t,key:i.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(_(),e(Q,{clsPrefix:n,tmNode:i,parentKey:t,key:i.key,props:a.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return _(),l(`div`,{class:M([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(_(),e(ne,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(_(),l(j,{key:1},[m(()=>i)],64)),this.showArrow?(_(),l(j,{key:2},[m(()=>F({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):m(()=>null)],2)}}),Ce=k(`dropdown-menu`,`
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
 `,[O(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[O(`&::before`,`
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
 `,[O(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),x(`disabled`,[A(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[D(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),O(`&::before`,`background-color: var(--n-option-color-hover);`)]),A(`active`,`
 color: var(--n-option-text-color-active);
 `,[D(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),O(`&::before`,`background-color: var(--n-option-color-active);`)]),A(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[D(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),A(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),A(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[D(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[A(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),D(`prefix`,`
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
 `)]),D(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),D(`suffix`,`
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
 `),O(`>`,[k(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),x(`scrollable`,`
 padding: var(--n-padding);
 `),A(`scrollable`,[D(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(R),Ee={...R,...we,...i.props},De=c({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=y(!1),r=re(p(e,`show`),t),a=d(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=d(()=>a.value.treeNodes),c=y(null),l=y(null),u=y(null),m=d(()=>c.value??l.value??u.value??null),g=d(()=>a.value.getPath(m.value).keyPath),_=d(()=>a.value.getPath(e.value).keyPath),v=N(()=>e.keyboard&&r.value);pe({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:I},Escape:A}},v);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:C}=n(e),w=d(()=>e.size||C?.value?.Dropdown?.size||`medium`),E=i(`Dropdown`,`-dropdown`,Ce,se,e,b);f(q,{labelFieldRef:p(e,`labelField`),childrenFieldRef:p(e,`childrenField`),renderLabelRef:p(e,`renderLabel`),renderIconRef:p(e,`renderIcon`),hoverKeyRef:c,keyboardKeyRef:l,lastToggledSubmenuKeyRef:u,pendingKeyPathRef:g,activeKeyPathRef:_,animatedRef:p(e,`animated`),mergedShowRef:r,nodePropsRef:p(e,`nodeProps`),renderOptionRef:p(e,`renderOption`),menuPropsRef:p(e,`menuProps`),doSelect:D,doUpdateShow:O}),T(r,t=>{!e.animated&&!t&&k()});function D(t,n){let{onSelect:r}=e;r&&s(r,t,n)}function O(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&s(r,n),i&&s(i,n),t.value=n}function k(){c.value=null,l.value=null,u.value=null}function A(){O(!1)}function j(){R(`left`)}function M(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&r.value&&(D(e.key,e.rawNode),O(!1))}function L(){let{value:e}=a,{value:t}=m;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=m,{value:{getFirstAvailableNode:n}}=a,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(c.value=null,l.value=r)}let z=d(()=>{let{inverted:t}=e,n=w.value,{common:{cubicBezierEaseInOut:r},self:i}=E.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[S(`optionIconSuffixWidth`,n)]:l,[S(`optionSuffixWidth`,n)]:u,[S(`optionIconPrefixWidth`,n)]:d,[S(`optionPrefixWidth`,n)]:f,[S(`fontSize`,n)]:p,[S(`optionHeight`,n)]:m,[S(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=x?h(`dropdown`,d(()=>`${w.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:b,mergedTheme:E,mergedSize:w,tmNodes:o,mergedShow:r,handleAfterLeave:()=>{e.animated&&k()},doUpdateShow:O,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let t=(e,t,n,r,i)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:G(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return P($,a(this.$attrs,l,c))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return _(),e(B,de(this.$props,Te,r),{_:1,trigger:b(()=>this.$slots.default?.())},16)}});export{G as n,De as t};