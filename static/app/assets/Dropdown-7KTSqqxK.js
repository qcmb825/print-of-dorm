import{Bn as e,Cn as t,Dn as n,Et as r,Fn as i,H as a,L as o,Ln as s,Mt as c,On as l,Un as u,V as d,Wn as f,Xn as p,Yn as m,an as h,br as g,cn as _,dn as v,gn as y,hr as b,jn as x,kn as S,kt as C,ln as w,mr as T,nr as E,on as D,pr as O,un as k,vt as A,xt as j,yt as M,z as N,zn as P}from"./endpoints-DguQVVk7.js";import{a as F,c as I,f as L,i as R,o as z,r as B,s as ee,t as te}from"./create-wvpIv_n8.js";import{c as V,n as ne,s as H}from"./Scrollbar-DSXt8xuo.js";import{t as re}from"./use-merged-state-DzXhUbEL.js";import{t as ie}from"./format-length-BwSo_EUP.js";import{t as ae}from"./ChevronRight-cDoqORua.js";import{B as U,C as oe,O as se,at as ce,ct as le,lt as ue,nt as de,st as W,z as fe}from"./index-DwEf3xIY.js";function pe(e={},t){let n=O({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:i}=e,a=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}r!==void 0&&Object.keys(r).forEach(t=>{if(t!==e.key)return;let n=r[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},o=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},s=()=>{(t===void 0||t.value)&&(V(`keydown`,document,a),V(`keyup`,document,o)),t!==void 0&&E(t,e=>{e?(V(`keydown`,document,a),V(`keyup`,document,o)):(H(`keydown`,document,a),H(`keyup`,document,o))})};return ce()?(u(s),f(()=>{(t===void 0||t.value)&&(H(`keydown`,document,a),H(`keyup`,document,o))})):s(),T(n)}function G(e){return t=>{e.value=t?t.$el:null}}var me=D(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[w(`color-transition`,{transition:`color .3s var(--n-bezier)`}),w(`depth`,{color:`var(--n-color)`},[h(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),h(`svg`,{height:`1em`,width:`1em`})]),he={...d.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=i({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:i}=r(e),o=d(`Icon`,`-icon`,me,oe,e,t),s=n(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=o.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),c=i?a(`icon`,n(()=>`${e.depth||`d`}`),s,e):void 0;return{mergedClsPrefix:t,mergedStyle:n(()=>{let{size:t,color:n}=e;return{fontSize:ie(t),color:n}}),cssVars:i?void 0:s,themeClass:c?.themeClass,onRender:c?.onRender}},render(){let{$parent:t,depth:n,mergedClsPrefix:r,component:i,onRender:a,themeClass:o}=this;return t?.$options?._n_icon__&&c(`icon`,"don't wrap `n-icon` inside `n-icon`"),a?.(),s(`i`,e(this.$attrs,{role:`img`,class:[`${r}-icon`,o,{[`${r}-icon--depth`]:n,[`${r}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),i?s(i):this.$slots.default?.())}}),K=C(`n-dropdown-menu`),q=C(`n-dropdown`),J=C(`n-dropdown-option`),Y=i({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return m(),x(`div`,{class:A(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=b(e.value),i=null;return E(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=i({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=P(q),{hoverKeyRef:r,keyboardKeyRef:i,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:u,renderIconRef:d,labelFieldRef:f,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:g,menuPropsRef:_}=t,v=P(J,null),y=P(K),x=P(W),S=n(()=>e.tmNode.rawNode),C=n(()=>{let{value:t}=m;return X(e.tmNode.rawNode,t)}),w=n(()=>{let{disabled:t}=e.tmNode;return t}),T=ye(n(()=>{if(!C.value)return!1;let{key:t,disabled:n}=e.tmNode;if(n)return!1;let{value:s}=r,{value:c}=i,{value:l}=a,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,n(()=>i.value===null&&!c.value)),E=n(()=>!!v?.enteringSubmenuRef.value),D=b(!1);p(J,{enteringSubmenuRef:D});function O(){D.value=!0}function k(){D.value=!1}function A(){let{parentKey:t,tmNode:n}=e;n.disabled||l.value&&(a.value=t,i.value=null,r.value=n.key)}function j(){let{tmNode:t}=e;t.disabled||l.value&&r.value!==t.key&&A()}function M(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:n}=t;n&&!L({target:n},`dropdownOption`)&&!L({target:n},`scrollbarRail`)&&(r.value=null)}function F(){let{value:n}=C,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:f,renderLabel:u,renderIcon:d,siblingHasIcon:y.showIconRef,siblingHasSubmenu:y.hasSubmenuRef,menuProps:_,popoverBody:x,animated:c,mergedShowSubmenu:n(()=>T.value&&!E.value),rawNode:S,hasSubmenu:C,pending:N(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:N(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:N(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:w,renderOption:h,nodeProps:g,handleClick:F,handleMouseMove:j,handleMouseEnter:A,handleMouseLeave:M,handleSubmenuBeforeEnter:O,handleSubmenuAfterEnter:k}},render(){let{animated:n,rawNode:r,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:c,renderLabel:l,renderIcon:u,renderOption:d,nodeProps:f,props:p,scrollable:h}=this,g=null;if(i){let t=this.menuProps?.(r,r.children);g=(n=>(m(),S($,e({key:1},t,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let _={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},v=f?.(r),b=(m(),x(`div`,e({class:[`${a}-dropdown-option`,v?.class],"data-dropdown-option":!0},v),[j(()=>s(`div`,e(_,p),[(m(),x(`div`,{class:A([`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`])},[j(()=>[u?u(r):U(r.icon)])],2)),(m(),x(`div`,{"data-dropdown-option":!0,class:A(`${a}-dropdown-option-body__label`)},[l?(m(),x(t,{key:0},[j(()=>l(r))],64)):(m(),x(t,{key:1},[j(()=>U(r[this.labelField]??r.title))],64))],2)),(m(),x(`div`,{"data-dropdown-option":!0,class:A([`${a}-dropdown-option-body__suffix`,c&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(m(),S(ge,{key:0},{_:1,default:M(()=>(m(),S(ae)))})):j(()=>null)],2))])),this.hasSubmenu?(m(),S(I,{key:0},{default:()=>[(m(),S(ee,null,{default:()=>(m(),x(`div`,{class:A(`${a}-dropdown-offset-container`)},[(m(),S(z,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(m(),x(`div`,{class:A(`${a}-dropdown-menu-wrapper`)},[n?(m(),S(y,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(m(),x(t,{key:1},[j(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):j(()=>null)],16));return d?d({node:b,option:r}):b}}),be=i({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=P(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=P(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:n,hasSubmenu:r,showIcon:i,nodeProps:a,renderLabel:o,renderOption:s}=this,{rawNode:c}=this.tmNode,u=(m(),x(`div`,e({class:`${n}-dropdown-option`},a?.(c)),[l(`div`,{class:A(`${n}-dropdown-option-body ${n}-dropdown-option-body--group`)},[l(`div`,{"data-dropdown-option":!0,class:A([`${n}-dropdown-option-body__prefix`,i&&`${n}-dropdown-option-body__prefix--show-icon`])},[j(()=>U(c.icon))],2),l(`div`,{class:A(`${n}-dropdown-option-body__label`),"data-dropdown-option":!0},[o?(m(),x(t,{key:0},[j(()=>o(c))],64)):(m(),x(t,{key:1},[j(()=>U(c.title??c[this.labelField]))],64))],2),l(`div`,{class:A([`${n}-dropdown-option-body__suffix`,r&&`${n}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return s?s({node:u,option:c}):u}}),xe=i({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:n,clsPrefix:r}=this,{children:i}=e;return m(),x(t,null,[(m(),S(be,{clsPrefix:r,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),j(()=>i?.map(e=>{let{rawNode:t}=e;return t.show===!1?null:Z(t)?s(Y,{clsPrefix:r,key:e.key}):e.isGroup?(c(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(m(),S(Q,{clsPrefix:r,tmNode:e,parentKey:n,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=i({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return s(`div`,t,[e?.()])}}),$=i({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:r}=P(q);p(K,{showIconRef:n(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:n(()=>{let{value:t}=r;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let i=b(null);return p(le,null),p(ue,null),p(W,i),{bodyRef:i}},render(){let{parentKey:e,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(t=>{let{rawNode:i}=t;return i.show===!1?null:ve(i)?(m(),S(Se,{tmNode:t,key:t.key},null,8,[`tmNode`])):Z(i)?(m(),S(Y,{clsPrefix:n,key:t.key},null,8,[`clsPrefix`])):_e(i)?(m(),S(xe,{clsPrefix:n,tmNode:t,parentKey:e,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(m(),S(Q,{clsPrefix:n,tmNode:t,parentKey:e,key:t.key,props:i.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return m(),x(`div`,{class:A([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(m(),S(ne,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(m(),x(t,{key:1},[j(()=>i)],64)),this.showArrow?(m(),x(t,{key:2},[j(()=>F({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):j(()=>null)],2)}}),Ce=D(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[fe(),D(`dropdown-option`,`
 position: relative;
 `,[h(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[h(`&::before`,`
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
 `,[h(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),k(`disabled`,[w(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),h(`&::before`,`background-color: var(--n-option-color-hover);`)]),w(`active`,`
 color: var(--n-option-text-color-active);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),h(`&::before`,`background-color: var(--n-option-color-active);`)]),w(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),w(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),w(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[_(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[w(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),_(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[w(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),D(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),_(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),_(`suffix`,`
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
 `),h(`>`,[D(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),k(`scrollable`,`
 padding: var(--n-padding);
 `),w(`scrollable`,[_(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(R),Ee={...R,...we,...d.props},De=i({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=b(!1),i=re(g(e,`show`),t),s=n(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),c=n(()=>s.value.treeNodes),l=b(null),u=b(null),f=b(null),m=n(()=>l.value??u.value??f.value??null),h=n(()=>s.value.getPath(m.value).keyPath),_=n(()=>s.value.getPath(e.value).keyPath),y=N(()=>e.keyboard&&i.value);pe({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:I},Escape:A}},y);let{mergedClsPrefixRef:x,inlineThemeDisabled:S,mergedComponentPropsRef:C}=r(e),w=n(()=>e.size||C?.value?.Dropdown?.size||`medium`),T=d(`Dropdown`,`-dropdown`,Ce,se,e,x);p(q,{labelFieldRef:g(e,`labelField`),childrenFieldRef:g(e,`childrenField`),renderLabelRef:g(e,`renderLabel`),renderIconRef:g(e,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:f,pendingKeyPathRef:h,activeKeyPathRef:_,animatedRef:g(e,`animated`),mergedShowRef:i,nodePropsRef:g(e,`nodeProps`),renderOptionRef:g(e,`renderOption`),menuPropsRef:g(e,`menuProps`),doSelect:D,doUpdateShow:O}),E(i,t=>{!e.animated&&!t&&k()});function D(t,n){let{onSelect:r}=e;r&&o(r,t,n)}function O(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&o(r,n),i&&o(i,n),t.value=n}function k(){l.value=null,u.value=null,f.value=null}function A(){O(!1)}function j(){R(`left`)}function M(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&i.value&&(D(e.key,e.rawNode),O(!1))}function L(){let{value:e}=s,{value:t}=m;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=m,{value:{getFirstAvailableNode:n}}=s,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let z=n(()=>{let{inverted:t}=e,n=w.value,{common:{cubicBezierEaseInOut:r},self:i}=T.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[v(`optionIconSuffixWidth`,n)]:l,[v(`optionSuffixWidth`,n)]:u,[v(`optionIconPrefixWidth`,n)]:d,[v(`optionPrefixWidth`,n)]:f,[v(`fontSize`,n)]:p,[v(`optionHeight`,n)]:m,[v(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=S?a(`dropdown`,n(()=>`${w.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:x,mergedTheme:T,mergedSize:w,tmNodes:c,mergedShow:i,handleAfterLeave:()=>{e.animated&&k()},doUpdateShow:O,cssVars:S?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let t=(t,n,r,i,a)=>{let{mergedClsPrefix:o,menuProps:c}=this;this.onRender?.();let l=c?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},u={ref:G(n),class:[t,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...r,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:i,onMouseleave:a};return s($,e(this.$attrs,u,l))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return m(),S(B,de(this.$props,Te,r),{_:1,trigger:M(()=>this.$slots.default?.())},16)}});export{G as n,De as t};