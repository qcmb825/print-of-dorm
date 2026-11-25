import{$ as e,A as t,D as n,Dt as r,E as i,I as a,O as o,St as s,U as c,V as l,et as u,lt as d,x as f,z as p}from"./useApi-BPuI6ZR9-BM-pFei4.js";import{A as m,D as h,E as g,Ht as _,O as v,Q as y,Rt as b,Ut as x,Vt as S,Wt as C,Yt as w,Z as T,at as E,ct as D,dt as O,et as k,j as A,k as j,w as M,zt as N}from"./createLucideIcon-ClRkaCjD.js";import{a as P,i as F,o as I,r as L,t as ee}from"./create-BrsEFeoL.js";import{c as R,i as z,n as B,r as te,t as ne}from"./Follower-6q31WUgd.js";import{t as re}from"./use-merged-state-BtZAqeDl.js";import{t as ie}from"./use-keyboard-BVL1GZ7z.js";import{t as ae}from"./ChevronRight-CyYiQh9A.js";import{D as oe,J as se,L as ce,O as V,nt as le,rt as ue,tt as H}from"./index-DqjpbDj4.js";function U(e){return t=>{e.value=t?t.$el:null}}var de={padding:`4px 0`,optionIconSizeSmall:`14px`,optionIconSizeMedium:`16px`,optionIconSizeLarge:`16px`,optionIconSizeHuge:`18px`,optionSuffixWidthSmall:`14px`,optionSuffixWidthMedium:`14px`,optionSuffixWidthLarge:`16px`,optionSuffixWidthHuge:`16px`,optionIconSuffixWidthSmall:`32px`,optionIconSuffixWidthMedium:`32px`,optionIconSuffixWidthLarge:`36px`,optionIconSuffixWidthHuge:`36px`,optionPrefixWidthSmall:`14px`,optionPrefixWidthMedium:`14px`,optionPrefixWidthLarge:`16px`,optionPrefixWidthHuge:`16px`,optionIconPrefixWidthSmall:`36px`,optionIconPrefixWidthMedium:`36px`,optionIconPrefixWidthLarge:`40px`,optionIconPrefixWidthHuge:`40px`};function fe(e){let{primaryColor:t,textColor2:n,dividerColor:r,hoverColor:i,popoverColor:a,invertedColor:o,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,heightSmall:f,heightMedium:p,heightLarge:m,heightHuge:h,textColor3:g,opacityDisabled:_}=e;return{...de,optionHeightSmall:f,optionHeightMedium:p,optionHeightLarge:m,optionHeightHuge:h,borderRadius:s,fontSizeSmall:c,fontSizeMedium:l,fontSizeLarge:u,fontSizeHuge:d,optionTextColor:n,optionTextColorHover:n,optionTextColorActive:t,optionTextColorChildActive:t,color:a,dividerColor:r,suffixColor:n,prefixColor:n,optionColorHover:i,optionColorActive:A(t,{alpha:.1}),groupHeaderTextColor:g,optionTextColorInverted:`#BBB`,optionTextColorHoverInverted:`#FFF`,optionTextColorActiveInverted:`#FFF`,optionTextColorChildActiveInverted:`#FFF`,colorInverted:o,dividerColorInverted:`#BBB`,suffixColorInverted:`#BBB`,prefixColorInverted:`#BBB`,optionColorHoverInverted:t,optionColorActiveInverted:t,groupHeaderTextColorInverted:`#AAA`,optionOpacityDisabled:_}}var W=h({name:`Dropdown`,common:m,peers:{Popover:I},self:fe});function pe(e){let{textColorBase:t,opacity1:n,opacity2:r,opacity3:i,opacity4:a,opacity5:o}=e;return{color:t,opacity1Depth:n,opacity2Depth:r,opacity3Depth:i,opacity4Depth:a,opacity5Depth:o}}var me={name:`Icon`,common:m,self:pe},he=N(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[_(`color-transition`,{transition:`color .3s var(--n-bezier)`}),_(`depth`,{color:`var(--n-color)`},[b(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),b(`svg`,{height:`1em`,width:`1em`})]),ge={...v.props,depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]},_e=a({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:ge,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=E(e),r=v(`Icon`,`-icon`,he,me,e,t),a=i(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=n?j(`icon`,i(()=>`${e.depth||`d`}`),a,e):void 0;return{mergedClsPrefix:t,mergedStyle:i(()=>{let{size:t,color:n}=e;return{fontSize:z(t),color:n}}),cssVars:n?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:e,depth:t,mergedClsPrefix:n,component:r,onRender:i,themeClass:a}=this;return e?.$options?._n_icon__&&O(`icon`,"don't wrap `n-icon` inside `n-icon`"),i?.(),p(`i`,c(this.$attrs,{role:`img`,class:[`${n}-icon`,a,{[`${n}-icon--depth`]:t,[`${n}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?p(r):this.$slots.default?.())}}),G=D(`n-dropdown-menu`),K=D(`n-dropdown`),q=D(`n-dropdown-option`),J=a({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return e(),t(`div`,{class:T(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Y(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ve(e){return e.type===`group`}function X(e){return e.type===`divider`}function ye(e){return e.type===`render`}function be(e,t,n){if(!t)return e;let r=s(e.value),i=null;return d(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var Z=a({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=l(K),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:c,animatedRef:d,mergedShowRef:f,renderLabelRef:p,renderIconRef:m,labelFieldRef:h,childrenFieldRef:_,renderOptionRef:v,nodePropsRef:y,menuPropsRef:b}=t,x=l(q,null),S=l(G),C=l(H),w=i(()=>e.tmNode.rawNode),T=i(()=>{let{value:t}=_;return Y(e.tmNode.rawNode,t)}),E=i(()=>{let{disabled:t}=e.tmNode;return t}),D=be(i(()=>{if(!T.value)return!1;let{key:t,disabled:i}=e.tmNode;if(i)return!1;let{value:s}=n,{value:c}=r,{value:l}=a,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,i(()=>r.value===null&&!d.value)),O=i(()=>!!x?.enteringSubmenuRef.value),k=s(!1);u(q,{enteringSubmenuRef:k});function A(){k.value=!0}function j(){k.value=!1}function M(){let{parentKey:t,tmNode:i}=e;i.disabled||f.value&&(a.value=t,r.value=null,n.value=i.key)}function N(){let{tmNode:t}=e;t.disabled||f.value&&n.value!==t.key&&M()}function P(t){if(e.tmNode.disabled||!f.value)return;let{relatedTarget:r}=t;r&&!R({target:r},`dropdownOption`)&&!R({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=T,{tmNode:r}=e;f.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:h,renderLabel:p,renderIcon:m,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:b,popoverBody:C,animated:d,mergedShowSubmenu:i(()=>D.value&&!O.value),rawNode:w,hasSubmenu:T,pending:g(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:g(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:g(()=>{let{value:t}=c,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:v,nodeProps:y,handleClick:F,handleMouseMove:N,handleMouseEnter:M,handleMouseLeave:P,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:j}},render(){let{animated:n,rawNode:r,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:s,siblingHasSubmenu:l,renderLabel:u,renderIcon:d,renderOption:m,nodeProps:h,props:g,scrollable:_}=this,v=null;if(i){let t=this.menuProps?.(r,r.children);v=(n=>(e(),o($,c({key:1},t,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(v)}let b={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},x=h?.(r),S=(e(),t(`div`,c({class:[`${a}-dropdown-option`,x?.class],"data-dropdown-option":!0},x),[k(()=>p(`div`,c(b,g),[(e(),t(`div`,{class:T([`${a}-dropdown-option-body__prefix`,s&&`${a}-dropdown-option-body__prefix--show-icon`])},[k(()=>[d?d(r):V(r.icon)])],2)),(e(),t(`div`,{"data-dropdown-option":!0,class:T(`${a}-dropdown-option-body__label`)},[u?(e(),t(f,{key:0},[k(()=>u(r))],64)):(e(),t(f,{key:1},[k(()=>V(r[this.labelField]??r.title))],64))],2)),(e(),t(`div`,{"data-dropdown-option":!0,class:T([`${a}-dropdown-option-body__suffix`,l&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(e(),o(_e,{key:0},{_:1,default:y(()=>(e(),o(ae)))})):k(()=>null)],2))])),this.hasSubmenu?(e(),o(te,{key:0},{default:()=>[(e(),o(B,null,{default:()=>(e(),t(`div`,{class:T(`${a}-dropdown-offset-container`)},[(e(),o(ne,{show:this.mergedShowSubmenu,placement:this.placement,to:_&&this.popoverBody||void 0,teleportDisabled:!_},{default:()=>(e(),t(`div`,{class:T(`${a}-dropdown-menu-wrapper`)},[n?(e(),o(w,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>v},1032,[`onBeforeEnter`,`onAfterEnter`])):(e(),t(f,{key:1},[k(()=>v)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):k(()=>null)],16));return m?m({node:S,option:r}):S}}),xe=a({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=l(G),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=l(K);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:r,hasSubmenu:i,showIcon:a,nodeProps:o,renderLabel:s,renderOption:l}=this,{rawNode:u}=this.tmNode,d=(e(),t(`div`,c({class:`${r}-dropdown-option`},o?.(u)),[n(`div`,{class:T(`${r}-dropdown-option-body ${r}-dropdown-option-body--group`)},[n(`div`,{"data-dropdown-option":!0,class:T([`${r}-dropdown-option-body__prefix`,a&&`${r}-dropdown-option-body__prefix--show-icon`])},[k(()=>V(u.icon))],2),n(`div`,{class:T(`${r}-dropdown-option-body__label`),"data-dropdown-option":!0},[s?(e(),t(f,{key:0},[k(()=>s(u))],64)):(e(),t(f,{key:1},[k(()=>V(u.title??u[this.labelField]))],64))],2),n(`div`,{class:T([`${r}-dropdown-option-body__suffix`,i&&`${r}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return l?l({node:d,option:u}):d}}),Q=a({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:n,parentKey:r,clsPrefix:i}=this,{children:a}=n;return e(),t(f,null,[(e(),o(xe,{clsPrefix:i,tmNode:n,key:n.key},null,8,[`clsPrefix`,`tmNode`])),k(()=>a?.map(t=>{let{rawNode:n}=t;return n.show===!1?null:X(n)?p(J,{clsPrefix:i,key:t.key}):t.isGroup?(O(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(e(),o(Z,{clsPrefix:i,tmNode:t,parentKey:r,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Se=a({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return p(`div`,t,[e?.()])}}),$=a({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=l(K);u(G,{showIconRef:i(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:i(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Y(e,t));let{rawNode:n}=e;return Y(n,t)})})});let r=s(null);return u(le,null),u(ue,null),u(H,r),{bodyRef:r}},render(){let{parentKey:n,clsPrefix:r,scrollable:i}=this,a=this.tmNodes.map(t=>{let{rawNode:a}=t;return a.show===!1?null:ye(a)?(e(),o(Se,{tmNode:t,key:t.key},null,8,[`tmNode`])):X(a)?(e(),o(J,{clsPrefix:r,key:t.key},null,8,[`clsPrefix`])):ve(a)?(e(),o(Q,{clsPrefix:r,tmNode:t,parentKey:n,key:t.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(e(),o(Z,{clsPrefix:r,tmNode:t,parentKey:n,key:t.key,props:a.props,scrollable:i},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return e(),t(`div`,{class:T([`${r}-dropdown-menu`,i&&`${r}-dropdown-menu--scrollable`]),ref:`bodyRef`},[i?(e(),o(ce,{key:0,contentClass:`${r}-dropdown-menu__content`},{default:()=>a},1032,[`contentClass`])):(e(),t(f,{key:1},[k(()=>a)],64)),this.showArrow?(e(),t(f,{key:2},[k(()=>P({clsPrefix:r,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):k(()=>null)],2)}}),Ce=N(`dropdown-menu`,`
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
 `)])]),we={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Te=Object.keys(F),Ee={...F,...we,...v.props},De=a({name:`Dropdown`,inheritAttrs:!1,props:Ee,setup(e){let t=s(!1),n=re(r(e,`show`),t),a=i(()=>{let{keyField:t,childrenField:n}=e;return ee(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=i(()=>a.value.treeNodes),c=s(null),l=s(null),f=s(null),p=i(()=>c.value??l.value??f.value??null),m=i(()=>a.value.getPath(p.value).keyPath),h=i(()=>a.value.getPath(e.value).keyPath),_=g(()=>e.keyboard&&n.value);ie({keydown:{ArrowUp:{prevent:!0,handler:P},ArrowRight:{prevent:!0,handler:N},ArrowDown:{prevent:!0,handler:F},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:I},Escape:k}},_);let{mergedClsPrefixRef:y,inlineThemeDisabled:b,mergedComponentPropsRef:x}=E(e),S=i(()=>e.size||x?.value?.Dropdown?.size||`medium`),w=v(`Dropdown`,`-dropdown`,Ce,W,e,y);u(K,{labelFieldRef:r(e,`labelField`),childrenFieldRef:r(e,`childrenField`),renderLabelRef:r(e,`renderLabel`),renderIconRef:r(e,`renderIcon`),hoverKeyRef:c,keyboardKeyRef:l,lastToggledSubmenuKeyRef:f,pendingKeyPathRef:m,activeKeyPathRef:h,animatedRef:r(e,`animated`),mergedShowRef:n,nodePropsRef:r(e,`nodeProps`),renderOptionRef:r(e,`renderOption`),menuPropsRef:r(e,`menuProps`),doSelect:T,doUpdateShow:D}),d(n,t=>{!e.animated&&!t&&O()});function T(t,n){let{onSelect:r}=e;r&&M(r,t,n)}function D(n){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&M(r,n),i&&M(i,n),t.value=n}function O(){c.value=null,l.value=null,f.value=null}function k(){D(!1)}function A(){R(`left`)}function N(){R(`right`)}function P(){R(`up`)}function F(){R(`down`)}function I(){let e=L();e?.isLeaf&&n.value&&(T(e.key,e.rawNode),D(!1))}function L(){let{value:e}=a,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=a,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(c.value=null,l.value=r)}let z=i(()=>{let{inverted:t}=e,n=S.value,{common:{cubicBezierEaseInOut:r},self:i}=w.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[C(`optionIconSuffixWidth`,n)]:l,[C(`optionSuffixWidth`,n)]:u,[C(`optionIconPrefixWidth`,n)]:d,[C(`optionPrefixWidth`,n)]:f,[C(`fontSize`,n)]:p,[C(`optionHeight`,n)]:m,[C(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=b?j(`dropdown`,i(()=>`${S.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:y,mergedTheme:w,mergedSize:S,tmNodes:o,mergedShow:n,handleAfterLeave:()=>{e.animated&&O()},doUpdateShow:D,cssVars:b?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let t=(e,t,n,r,i)=>{let{mergedClsPrefix:a,menuProps:o}=this;this.onRender?.();let s=o?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:U(t),class:[e,`${a}-dropdown`,`${a}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:a,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return p($,c(this.$attrs,l,s))},{mergedTheme:n}=this,r={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return e(),o(L,se(this.$props,Te,r),{_:1,trigger:y(()=>this.$slots.default?.())},16)}});export{W as n,U as r,De as t};