import{$t as e,Dn as t,Fn as n,Hn as r,I as i,In as a,Jn as o,L as s,M as c,Mn as l,P as u,Qt as d,Sn as f,St as p,Tt as m,Vn as h,ar as g,bn as _,dt as v,fr as y,ft as b,gn as x,in as S,jn as C,kn as w,ln as T,mt as E,nn as D,or as O,rn as k,sr as A,tn as j,wn as M,xn as N,yt as P}from"./endpoints-BzNG02YK.js";import{C as F,E as I,S as L,b as R,m as z,r as B,t as ee,v as te,x as V}from"./fade-in-scale-up.cssr-6X4IxNMz.js";import{c as ne,f as re,i as ie,l as ae,n as H,r as oe,s as se,t as ce}from"./Popover-Clul5osh.js";import{r as U,t as le}from"./create-CLOJQO3W.js";import{t as ue}from"./ChevronRight-Dmal84e7.js";import{F as W,w as de,y as fe}from"./index-BX2avFHL.js";function pe(e={},t){let r=g({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:i,keyup:s}=e,c=e=>{switch(e.key){case`Control`:r.ctrl=!0;break;case`Meta`:r.command=!0,r.win=!0;break;case`Shift`:r.shift=!0;break;case`Tab`:r.tab=!0}i!==void 0&&Object.keys(i).forEach(t=>{if(t!==e.key)return;let n=i[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},l=e=>{switch(e.key){case`Control`:r.ctrl=!1;break;case`Meta`:r.command=!1,r.win=!1;break;case`Shift`:r.shift=!1;break;case`Tab`:r.tab=!1}s!==void 0&&Object.keys(s).forEach(t=>{if(t!==e.key)return;let n=s[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},u=()=>{(t===void 0||t.value)&&(V(`keydown`,document,c),V(`keyup`,document,l)),t!==void 0&&o(t,e=>{e?(V(`keydown`,document,c),V(`keyup`,document,l)):(R(`keydown`,document,c),R(`keyup`,document,l))})};return te()?(n(u),a(()=>{(t===void 0||t.value)&&(R(`keydown`,document,c),R(`keyup`,document,l))})):u(),O(r)}function G(e){return t=>{e.value=t?t.$el:null}}var me=e(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[D(`color-transition`,{transition:`color .3s var(--n-bezier)`}),D(`depth`,{color:`var(--n-color)`},[d(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),d(`svg`,{height:`1em`,width:`1em`})]),he={...i.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},ge=t({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=P(e),r=i(`Icon`,`-icon`,me,fe,e,t),a=_(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=n?s(`icon`,_(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:t,mergedStyle:_(()=>{let{size:t,color:n}=e;return{fontSize:ae(t),color:n}}),cssVars:n?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&m(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),w(`i`,l(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?w(r):this.$slots.default?.())}}),K=p(`n-dropdown-menu`),q=p(`n-dropdown`),J=p(`n-dropdown-option`),Y=t({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return h(),M(`div`,{class:v(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function _e(e){return e.type===`group`}function Z(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=A(e.value),i=null;return o(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Q=t({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=C(q),{hoverKeyRef:n,keyboardKeyRef:i,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:c,mergedShowRef:l,renderLabelRef:d,renderIconRef:f,labelFieldRef:p,childrenFieldRef:m,renderOptionRef:h,nodePropsRef:g,menuPropsRef:v}=t,y=C(J,null),b=C(K),x=C(L),S=_(()=>e.tmNode.rawNode),w=_(()=>{let{value:t}=m;return X(e.tmNode.rawNode,t)}),T=_(()=>{let{disabled:t}=e.tmNode;return t}),E=ye(_(()=>{if(!w.value)return!1;let{key:t,disabled:r}=e.tmNode;if(r)return!1;let{value:s}=n,{value:c}=i,{value:l}=a,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,_(()=>i.value===null&&!c.value)),D=_(()=>!!y?.enteringSubmenuRef.value),O=A(!1);r(J,{enteringSubmenuRef:O});function k(){O.value=!0}function j(){O.value=!1}function M(){let{parentKey:t,tmNode:r}=e;r.disabled||l.value&&(a.value=t,i.value=null,n.value=r.key)}function N(){let{tmNode:t}=e;t.disabled||l.value&&n.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!l.value)return;let{relatedTarget:r}=t;r&&!U({target:r},`dropdownOption`)&&!U({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=w,{tmNode:r}=e;l.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:p,renderLabel:d,renderIcon:f,siblingHasIcon:b.showIconRef,siblingHasSubmenu:b.hasSubmenuRef,menuProps:v,popoverBody:x,animated:c,mergedShowSubmenu:_(()=>E.value&&!D.value),rawNode:S,hasSubmenu:w,pending:u(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:u(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:u(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:T,renderOption:h,nodeProps:g,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:r,siblingHasIcon:i,siblingHasSubmenu:a,renderLabel:o,renderIcon:s,renderOption:c,nodeProps:u,props:d,scrollable:p}=this,m=null;if(n){let e=this.menuProps?.(t,t.children);m=(t=>(h(),f($,l({key:1},e,{clsPrefix:r,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(m)}let g={class:[`${r}-dropdown-option-body`,this.pending&&`${r}-dropdown-option-body--pending`,this.active&&`${r}-dropdown-option-body--active`,this.childActive&&`${r}-dropdown-option-body--child-active`,this.mergedDisabled&&`${r}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},_=u?.(t),y=(h(),M(`div`,l({class:[`${r}-dropdown-option`,_?.class],"data-dropdown-option":!0},_),[E(()=>w(`div`,l(g,d),[(h(),M(`div`,{class:v([`${r}-dropdown-option-body__prefix`,i&&`${r}-dropdown-option-body__prefix--show-icon`])},[E(()=>[s?s(t):W(t.icon)])],2)),(h(),M(`div`,{"data-dropdown-option":!0,class:v(`${r}-dropdown-option-body__label`)},[o?(h(),M(x,{key:0},[E(()=>o(t))],64)):(h(),M(x,{key:1},[E(()=>W(t[this.labelField]??t.title))],64))],2)),(h(),M(`div`,{"data-dropdown-option":!0,class:v([`${r}-dropdown-option-body__suffix`,a&&`${r}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(h(),f(ge,{key:0},{_:1,default:b(()=>(h(),f(ue)))})):E(()=>null)],2))])),this.hasSubmenu?(h(),f(ne,{key:0},{default:()=>[(h(),f(se,null,{default:()=>(h(),M(`div`,{class:v(`${r}-dropdown-offset-container`)},[(h(),f(ie,{show:this.mergedShowSubmenu,placement:this.placement,to:p&&this.popoverBody||void 0,teleportDisabled:!p},{default:()=>(h(),M(`div`,{class:v(`${r}-dropdown-menu-wrapper`)},[e?(h(),f(T,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>m},1032,[`onBeforeEnter`,`onAfterEnter`])):(h(),M(x,{key:1},[E(()=>m)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):E(()=>null)],16));return c?c({node:y,option:t}):y}}),be=t({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=C(K),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=C(q);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:a}=this,{rawNode:o}=this.tmNode,s=(h(),M(`div`,l({class:`${e}-dropdown-option`},r?.(o)),[N(`div`,{class:v(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[N(`div`,{"data-dropdown-option":!0,class:v([`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`])},[E(()=>W(o.icon))],2),N(`div`,{class:v(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[i?(h(),M(x,{key:0},[E(()=>i(o))],64)):(h(),M(x,{key:1},[E(()=>W(o.title??o[this.labelField]))],64))],2),N(`div`,{class:v([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return a?a({node:s,option:o}):s}}),xe=t({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:r}=e;return h(),M(x,null,[(h(),f(be,{clsPrefix:n,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),E(()=>r?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Z(r)?w(Y,{clsPrefix:n,key:e.key}):e.isGroup?(m(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(h(),f(Q,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=t({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return w(`div`,t,[e?.()])}}),$=t({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=C(q);r(K,{showIconRef:_(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:_(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let i=A(null);return r(F,null),r(I,null),r(L,i),{bodyRef:i}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,r=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:ve(i)?(h(),f(Se,{tmNode:r,key:r.key},null,8,[`tmNode`])):Z(i)?(h(),f(Y,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):_e(i)?(h(),f(xe,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(h(),f(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return h(),M(`div`,{class:v([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(h(),f(B,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>r},1032,[`contentClass`])):(h(),M(x,{key:1},[E(()=>r)],64)),this.showArrow?(h(),M(x,{key:2},[E(()=>oe({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):E(()=>null)],2)}}),Ce=e(`dropdown-menu`,`
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
 `,[d(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[d(`&::before`,`
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
 `,[d(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),k(`disabled`,[D(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[j(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),d(`&::before`,`background-color: var(--n-option-color-hover);`)]),D(`active`,`
 color: var(--n-option-text-color-active);
 `,[j(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),d(`&::before`,`background-color: var(--n-option-color-active);`)]),D(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[j(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),D(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),D(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[j(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[D(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),j(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[D(`show-icon`,`
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
 `,[D(`has-submenu`,`
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
 `),d(`>`,[e(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),k(`scrollable`,`
 padding: var(--n-padding);
 `),D(`scrollable`,[j(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(H),Ee={...H,...we,...i.props},De=t({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=A(!1),n=re(y(e,`show`),t),a=_(()=>{let{keyField:t,childrenField:n}=e;return le(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),l=_(()=>a.value.treeNodes),d=A(null),f=A(null),p=A(null),m=_(()=>d.value??f.value??p.value??null),h=_(()=>a.value.getPath(m.value).keyPath),g=_(()=>a.value.getPath(e.value).keyPath),v=u(()=>e.keyboard&&n.value);pe({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:I},Escape:k}},v);let{mergedClsPrefixRef:b,inlineThemeDisabled:x,mergedComponentPropsRef:C}=P(e),w=_(()=>e.size||C?.value?.Dropdown?.size||`medium`),T=i(`Dropdown`,`-dropdown`,Ce,de,e,b);r(q,{labelFieldRef:y(e,`labelField`),childrenFieldRef:y(e,`childrenField`),renderLabelRef:y(e,`renderLabel`),renderIconRef:y(e,`renderIcon`),hoverKeyRef:d,keyboardKeyRef:f,lastToggledSubmenuKeyRef:p,pendingKeyPathRef:h,activeKeyPathRef:g,animatedRef:y(e,`animated`),mergedShowRef:n,nodePropsRef:y(e,`nodeProps`),renderOptionRef:y(e,`renderOption`),menuPropsRef:y(e,`menuProps`),doSelect:E,doUpdateShow:D}),o(n,t=>{!e.animated&&!t&&O()});function E(t,n){let{onSelect:r}=e;r&&c(r,t,n)}function D(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&c(r,n),i&&c(i,n),t.value=n}function O(){d.value=null,f.value=null,p.value=null}function k(){D(!1)}function j(){R(`left`)}function M(){R(`right`)}function N(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(E(e.key,e.rawNode),D(!1))}function L(){let{value:e}=a,{value:t}=m;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=m,{value:{getFirstAvailableNode:n}}=a,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(d.value=null,f.value=r)}let z=_(()=>{let{inverted:t}=e,n=w.value,{common:{cubicBezierEaseInOut:r},self:i}=T.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[S(`optionIconSuffixWidth`,n)]:l,[S(`optionSuffixWidth`,n)]:u,[S(`optionIconPrefixWidth`,n)]:d,[S(`optionPrefixWidth`,n)]:f,[S(`fontSize`,n)]:p,[S(`optionHeight`,n)]:m,[S(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=x?s(`dropdown`,_(()=>`${w.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:b,mergedTheme:T,mergedSize:w,tmNodes:l,mergedShow:n,handleAfterLeave:()=>{e.animated&&O()},doUpdateShow:D,cssVars:x?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},c={ref:G(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return w($,l(this.$attrs,c,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return h(),f(ce,z(this.$props,Te,n),{_:1,trigger:b(()=>this.$slots.default?.())},16)}});export{G as n,De as t};