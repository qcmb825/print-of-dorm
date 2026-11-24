import{$ as e,A as t,D as n,E as r,Et as i,I as a,O as o,Q as s,U as c,V as l,ct as u,x as d,xt as f,z as p}from"./useApi-BPuI6ZR9-B4cwgxoE.js";import{A as m,D as h,E as g,Ht as _,O as v,Q as y,Rt as b,Ut as x,Vt as S,Wt as C,Yt as w,Z as T,at as E,ct as D,dt as O,et as k,j as A,k as j,w as M,zt as N}from"./createLucideIcon-DOmk2xkk.js";import{a as P,i as F,o as I,r as L,t as ee}from"./create-CaFUzi-4.js";import{c as R,i as z,n as B,r as te,t as ne}from"./Follower-SYJ94bba.js";import{t as re}from"./use-merged-state-BolkIoXB.js";import{t as ie}from"./use-keyboard-ClAlS29u.js";import{t as ae}from"./ChevronRight-8k8A3o8-.js";import{D as oe,J as se,L as ce,O as V,nt as le,rt as ue,tt as H}from"./index-C2IDgugI.js";function U(e){return t=>{e.value=t?t.$el:null}}var de={padding:`4px 0`,optionIconSizeSmall:`14px`,optionIconSizeMedium:`16px`,optionIconSizeLarge:`16px`,optionIconSizeHuge:`18px`,optionSuffixWidthSmall:`14px`,optionSuffixWidthMedium:`14px`,optionSuffixWidthLarge:`16px`,optionSuffixWidthHuge:`16px`,optionIconSuffixWidthSmall:`32px`,optionIconSuffixWidthMedium:`32px`,optionIconSuffixWidthLarge:`36px`,optionIconSuffixWidthHuge:`36px`,optionPrefixWidthSmall:`14px`,optionPrefixWidthMedium:`14px`,optionPrefixWidthLarge:`16px`,optionPrefixWidthHuge:`16px`,optionIconPrefixWidthSmall:`36px`,optionIconPrefixWidthMedium:`36px`,optionIconPrefixWidthLarge:`40px`,optionIconPrefixWidthHuge:`40px`};function fe(e){let{primaryColor:t,textColor2:n,dividerColor:r,hoverColor:i,popoverColor:a,invertedColor:o,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,heightSmall:f,heightMedium:p,heightLarge:m,heightHuge:h,textColor3:g,opacityDisabled:_}=e;return{...de,optionHeightSmall:f,optionHeightMedium:p,optionHeightLarge:m,optionHeightHuge:h,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,optionTextColor:n,optionTextColorHover:n,optionTextColorActive:t,optionTextColorChildActive:t,color:a,dividerColor:r,suffixColor:n,prefixColor:n,optionColorHover:i,optionColorActive:A(t,{alpha:.1}),groupHeaderTextColor:g,optionTextColorInverted:`#BBB`,optionTextColorHoverInverted:`#FFF`,optionTextColorActiveInverted:`#FFF`,optionTextColorChildActiveInverted:`#FFF`,colorInverted:o,dividerColorInverted:`#BBB`,suffixColorInverted:`#BBB`,prefixColorInverted:`#BBB`,optionColorHoverInverted:t,optionColorActiveInverted:t,groupHeaderTextColorInverted:`#AAA`,optionOpacityDisabled:_}}var W=h({name:`Dropdown`,common:m,peers:{Popover:I},self:fe});function pe(e){let{textColorBase:t,opacity1:n,opacity2:r,opacity3:i,opacity4:a,opacity5:o}=e;return{color:t,opacity1Depth:n,opacity2Depth:r,opacity3Depth:i,opacity4Depth:a,opacity5Depth:o}}var me={name:`Icon`,common:m,self:pe},he=N(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[_(`color-transition`,{transition:`color .3s var(--n-bezier)`}),_(`depth`,{color:`var(--n-color)`},[b(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),b(`svg`,{height:`1em`,width:`1em`})]),ge={...v.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},_e=a({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ge,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=E(e),i=v(`Icon`,`-icon`,he,me,e,t),a=r(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:i}=r;return{"--n-bezier":n,"--n-color":e,"--n-opacity":i}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=n?j(`icon`,r(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:t,mergedStyle:r(()=>{let{size:t,color:n}=e;return{fontSize:z(t),color:n}}),cssVars:n?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&O(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),p(`i`,c(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?p(r):this.$slots.default?.())}}),G=D(`n-dropdown-menu`),K=D(`n-dropdown`),q=D(`n-dropdown-option`),J=a({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return s(),t(`div`,{class:T(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Y(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ve(e){return e.type===`group`}function X(e){return e.type===`divider`}function ye(e){return e.type===`render`}function be(e,t,n){if(!t)return e;let r=f(e.value),i=null;return u(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Z=a({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(t){let n=l(K),{hoverKeyRef:i,keyboardKeyRef:a,lastToggledSubmenuKeyRef:o,pendingKeyPathRef:s,activeKeyPathRef:c,animatedRef:u,mergedShowRef:d,renderLabelRef:p,renderIconRef:m,labelFieldRef:h,childrenFieldRef:_,renderOptionRef:v,nodePropsRef:y,menuPropsRef:b}=n,x=l(q,null),S=l(G),C=l(H),w=r(()=>t.tmNode.rawNode),T=r(()=>{let{value:e}=_;return Y(t.tmNode.rawNode,e)}),E=r(()=>{let{disabled:e}=t.tmNode;return e}),D=be(r(()=>{if(!T.value)return!1;let{key:e,disabled:n}=t.tmNode;if(n)return!1;let{value:r}=i,{value:c}=a,{value:l}=o,{value:u}=s;return r===null?c===null?l!==null&&u.includes(e):u.includes(e)&&u[u.length-1]!==e:u.includes(e)}),300,r(()=>a.value===null&&!u.value)),O=r(()=>!!x?.enteringSubmenuRef.value),k=f(!1);e(q,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:e,tmNode:n}=t;n.disabled||d.value&&(o.value=e,a.value=null,i.value=n.key)}function N(){let{tmNode:e}=t;e.disabled||d.value&&i.value!==e.key&&M()}function P(e){if(t.tmNode.disabled||!d.value)return;let{relatedTarget:n}=e;n&&!R({target:n},`dropdownOption`)&&!R({target:n},`scrollbarRail`)&&(i.value=null)}function F(){let{value:e}=T,{tmNode:r}=t;d.value&&!e&&!r.disabled&&(n.doSelect(r.key,r.rawNode),n.doUpdateShow(!1))}return{labelField:h,renderLabel:p,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:u,mergedShowSubmenu:r(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:g(()=>{let{value:e}=s,{key:n}=t.tmNode;return e.includes(n)}),childActive:g(()=>{let{value:e}=c,{key:n}=t.tmNode,r=e.findIndex(e=>n===e);return r!==-1&&r<e.length-1}),active:g(()=>{let{value:e}=c,{key:n}=t.tmNode,r=e.findIndex(e=>n===e);return r!==-1&&r===e.length-1}),mergedDisabled:E,renderOption:v,nodeProps:y,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:e,rawNode:n,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:a,siblingHasSubmenu:l,renderLabel:u,renderIcon:f,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(r){let e=this.menuProps?.(n,n.children);v=(t=>(s(),o($,c({key:1},e,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let b={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},x=h?.(n),S=(s(),t(`div`,c({class:[`${i}-dropdown-option`,x?.class],"data-dropdown-option":!0},x),[k(()=>p(`div`,c(b,g),[(s(),t(`div`,{class:T([`${i}-dropdown-option-body__prefix`,a&&`${i}-dropdown-option-body__prefix--show-icon`])},[k(()=>[f?f(n):V(n.icon)])],2)),(s(),t(`div`,{"data-dropdown-option":!0,class:T(`${i}-dropdown-option-body__label`)},[u?(s(),t(d,{key:0},[k(()=>u(n))],64)):(s(),t(d,{key:1},[k(()=>V(n[this.labelField]??n.title))],64))],2)),(s(),t(`div`,{"data-dropdown-option":!0,class:T([`${i}-dropdown-option-body__suffix`,l&&`${i}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(s(),o(_e,{key:0},{_:1,default:y(()=>(s(),o(ae)))})):k(()=>null)],2))])),this.hasSubmenu?(s(),o(te,{key:0},{default:()=>[(s(),o(B,null,{default:()=>(s(),t(`div`,{class:T(`${i}-dropdown-offset-container`)},[(s(),o(ne,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(s(),t(`div`,{class:T(`${i}-dropdown-menu-wrapper`)},[e?(s(),o(w,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(s(),t(d,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return m?m({node:S,option:n}):S}}),xe=a({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=l(G),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=l(K);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:r,showIcon:i,nodeProps:a,renderLabel:o,renderOption:l}=this,{rawNode:u}=this.tmNode,f=(s(),t(`div`,c({class:`${e}-dropdown-option`},a?.(u)),[n(`div`,{class:T(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[n(`div`,{"data-dropdown-option":!0,class:T([`${e}-dropdown-option-body__prefix`,i&&`${e}-dropdown-option-body__prefix--show-icon`])},[k(()=>V(u.icon))],2),n(`div`,{class:T(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[o?(s(),t(d,{key:0},[k(()=>o(u))],64)):(s(),t(d,{key:1},[k(()=>V(u.title??u[this.labelField]))],64))],2),n(`div`,{class:T([`${e}-dropdown-option-body__suffix`,r&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return l?l({node:f,option:u}):f}}),Q=a({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:n,clsPrefix:r}=this,{children:i}=e;return s(),t(d,null,[(s(),o(xe,{clsPrefix:r,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>i?.map(e=>{let{rawNode:t}=e;return t.show===!1?null:X(t)?p(J,{clsPrefix:r,key:e.key}):e.isGroup?(O(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(s(),o(Z,{clsPrefix:r,tmNode:e,parentKey:n,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=a({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return p(`div`,t,[e?.()])}}),$=a({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(t){let{renderIconRef:n,childrenFieldRef:i}=l(K);e(G,{showIconRef:r(()=>{let e=n.value;return t.tmNodes.some(t=>{if(t.isGroup)return t.children?.some(({rawNode:t})=>e?e(t):t.icon);let{rawNode:n}=t;return e?e(n):n.icon})}),hasSubmenuRef:r(()=>{let{value:e}=i;return t.tmNodes.some(t=>{if(t.isGroup)return t.children?.some(({rawNode:t})=>Y(t,e));let{rawNode:n}=t;return Y(n,e)})})});let a=f(null);return e(le,null),e(ue,null),e(H,a),{bodyRef:a}},render(){let{parentKey:e,clsPrefix:n,scrollable:r}=this,i=this.tmNodes.map(t=>{let{rawNode:i}=t;return i.show===!1?null:ye(i)?(s(),o(Se,{tmNode:t,key:t.key},null,8,[`tmNode`])):X(i)?(s(),o(J,{clsPrefix:n,key:t.key},null,8,[`clsPrefix`])):ve(i)?(s(),o(Q,{clsPrefix:n,tmNode:t,parentKey:e,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(s(),o(Z,{clsPrefix:n,tmNode:t,parentKey:e,key:t.key,props:i.props,scrollable:r},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return s(),t(`div`,{class:T([`${n}-dropdown-menu`,r&&`${n}-dropdown-menu--scrollable`]),ref:`bodyRef`},[r?(s(),o(ce,{key:0,contentClass:`${n}-dropdown-menu__content`},{default:()=>i},1032,[`contentClass`])):(s(),t(d,{key:1},[k(()=>i)],64)),this.showArrow?(s(),t(d,{key:2},[k(()=>P({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),Ce=N(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[oe(),N(`dropdown-option`,`
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
 `)]),N(`dropdown-option-body`,`
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
 `),x(`disabled`,[_(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[S(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),b(`&::before`,`background-color: var(--n-option-color-hover);`)]),_(`active`,`
 color: var(--n-option-text-color-active);
 `,[S(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),b(`&::before`,`background-color: var(--n-option-color-active);`)]),_(`child-active`,`
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
 `),N(`icon`,`
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
 `),N(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),N(`dropdown-menu`,`pointer-events: all;`)]),N(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),N(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),N(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),b(`>`,[N(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),x(`scrollable`,`
 padding: var(--n-padding);
 `),_(`scrollable`,[S(`content`,`
 padding: var(--n-padding);
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(F),Ee={...F,...we,...v.props},De=a({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(t){let n=f(!1),a=re(i(t,`show`),n),o=r(()=>{let{keyField:e,childrenField:n}=t;return ee(t.options,{getKey(t){return t[e]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),s=r(()=>o.value.treeNodes),c=f(null),l=f(null),d=f(null),p=r(()=>c.value??l.value??d.value??null),m=r(()=>o.value.getPath(p.value).keyPath),h=r(()=>o.value.getPath(t.value).keyPath),_=g(()=>t.keyboard&&a.value);ie({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:I},Escape:k}},_);let{mergedClsPrefixRef:y,inlineThemeDisabled:b,mergedComponentPropsRef:x}=E(t),S=r(()=>t.size||x?.value?.Dropdown?.size||`medium`),w=v(`Dropdown`,`-dropdown`,Ce,W,t,y);e(K,{labelFieldRef:i(t,`labelField`),childrenFieldRef:i(t,`childrenField`),renderLabelRef:i(t,`renderLabel`),renderIconRef:i(t,`renderIcon`),hoverKeyRef:c,keyboardKeyRef:l,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:m,activeKeyPathRef:h,animatedRef:i(t,`animated`),mergedShowRef:a,nodePropsRef:i(t,`nodeProps`),renderOptionRef:i(t,`renderOption`),menuPropsRef:i(t,`menuProps`),doSelect:T,doUpdateShow:D}),u(a,e=>{!t.animated&&!e&&O()});function T(e,n){let{onSelect:r}=t;r&&M(r,e,n)}function D(e){let{"onUpdate:show":r,onUpdateShow:i}=t;r&&M(r,e),i&&M(i,e),n.value=e}function O(){c.value=null,l.value=null,d.value=null}function k(){D(!1)}function A(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&a.value&&(T(e.key,e.rawNode),D(!1))}function L(){let{value:e}=o,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=o,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(c.value=null,l.value=r)}let z=r(()=>{let{inverted:e}=t,n=S.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[C(`optionIconSuffixWidth`,n)]:l,[C(`optionSuffixWidth`,n)]:u,[C(`optionIconPrefixWidth`,n)]:d,[C(`optionPrefixWidth`,n)]:f,[C(`fontSize`,n)]:p,[C(`optionHeight`,n)]:m,[C(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return e?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=b?j(`dropdown`,r(()=>`${S.value[0]}${t.inverted?`i`:``}`),z,t):void 0;return{mergedClsPrefix:y,mergedTheme:w,mergedSize:S,tmNodes:s,mergedShow:a,handleAfterLeave:()=>{t.animated&&O()},doUpdateShow:D,cssVars:b?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let e=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:U(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return p($,c(this.$attrs,l,s))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return s(),o(L,se(this.$props,Te,n),{_:1,trigger:y(()=>this.$slots.default?.())},16)}});export{W as n,U as r,De as t};