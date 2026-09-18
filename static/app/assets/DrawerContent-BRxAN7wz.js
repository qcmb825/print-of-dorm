import{B as e,P as t,Pt as n,Q as r,St as i,Tt as a,U as o,V as s,Y as c,dt as l,et as u,ft as d,nt as f,ot as p,rn as m,xt as h,z as g,zt as _}from"./endpoints-C3DHQTsP.js";import{A as v,Jt as y,T as b,Xt as x,Zt as S,_ as C,ct as w,ft as T,in as E,k as D,lt as O,mt as k,ot as A,qt as j,sn as M,w as N,yt as P}from"./Button-Z2R18gr3.js";import{a as F,t as I}from"./Scrollbar-BGGh9xj6.js";import{t as L}from"./use-merged-state-BQRj4oql.js";import{t as R}from"./format-length-BwSo_EUP.js";import{G as ee,I as z,J as B,M as V,X as H,Y as U,Z as W,_ as G,at as K,b as q,ct as J,ot as Y,st as X}from"./index-DTSYBbyr.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=c({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=n(!!e.show),r=n(null),a=u(J),o=0,s=``,c=null,l=n(!1),f=n(!1),m=g(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:_,mergedRtlRef:v}=k(e),y=C(`Drawer`,v,_),b=j,x=e=>{f.value=!0,o=m.value?e.clientY:e.clientX,s=document.body.style.cursor,document.body.style.cursor=m.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{c!==null&&(window.clearTimeout(c),c=null),f.value?l.value=!0:c=window.setTimeout(()=>{l.value=!0},300)},w=()=>{c!==null&&(window.clearTimeout(c),c=null),l.value=!1},{doUpdateHeight:T,doUpdateWidth:E}=a,D=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},O=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function A(t){if(f.value){if(m.value){let n=r.value?.offsetHeight||0,i=o-t.clientY;n+=e.placement===`bottom`?i:-i,n=O(n),T(n),o=t.clientY}else{let n=r.value?.offsetWidth||0,i=o-t.clientX;n+=e.placement===`right`?i:-i,n=D(n),E(n),o=t.clientX}}}function j(){f.value&&(o=0,f.value=!1,document.body.style.cursor=s,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}i(()=>{e.show&&(t.value=!0)}),h(()=>e.show,e=>{e||j()}),p(()=>{j()});let N=g(()=>{let{show:t}=e,n=[[M,t]];return e.showMask||n.push([W,e.onClickoutside,void 0,{capture:!0}]),n});function P(){t.value=!1,e.onAfterLeave?.()}return z(g(()=>e.blockScroll&&t.value)),d(X,r),d(K,null),d(Y,null),{bodyRef:r,rtlEnabled:y,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:t,transitionName:g(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:P,bodyDirectives:N,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:w,isDragging:f,isHoverOnResizeTrigger:l}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?a((l(),o(`div`,Q,[(l(),s(B,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(l(),s(E,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>a(r(`div`,f(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(l(),o(`div`,{key:2,class:A([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(l(),o(`div`,{key:3,class:A([`${t}-drawer-content-wrapper`,this.contentClass]),style:m(this.contentStyle),role:`none`},[O(()=>e.default?.())],6)):(l(),s(I,f({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),w(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[M,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=T;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[j(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),j(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),j(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),j(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),j(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),j(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=T;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[j(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),j(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),j(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),j(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),j(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),j(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=T;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[j(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),j(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),j(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),j(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),j(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),j(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=T;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[j(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),j(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),j(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),j(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),j(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),j(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=j([y(`drawer`,`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[ue(),se(),pe(),ie(),S(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),S(`native-scrollbar`,[y(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),x(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[S(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),y(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),y(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[S(`native-scrollbar`,[y(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),y(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),y(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),y(`drawer-header`,`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[x(`main`,`
 flex: 1;
 `),x(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),y(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),S(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[x(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),S(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[x(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),S(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[x(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),S(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[x(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),j(`body`,[j(`>`,[y(`drawer-container`,`
 position: fixed;
 `)])]),y(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[j(`> *`,`
 pointer-events: all;
 `)]),y(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[S(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),F({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...D.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=c({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:r,inlineThemeDisabled:i}=k(e),a=b(),o=D(`Drawer`,`-drawer`,$,G,e,t),s=n(e.defaultWidth),c=n(e.defaultHeight),l=L(_(e,`width`),s),u=L(_(e,`height`),c),f=g(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(l.value)}),p=g(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(u.value)}),m=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&N(n,t),r&&N(r,t),s.value=t},h=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&N(n,t),r&&N(r,t),c.value=t},y=g(()=>[{width:f.value,height:p.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&T(!1),n&&n(t)}function S(e){x(e)}let C=q();function w(t){e.onEsc?.(),e.show&&e.closeOnEsc&&V(t)&&(C.value||T(!1))}function T(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&N(r,t),i&&N(i,t),n&&!t&&N(n,t)}d(J,{isMountedRef:a,mergedThemeRef:o,mergedClsPrefixRef:t,doUpdateShow:T,doUpdateHeight:h,doUpdateWidth:m});let E=g(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=o.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),O=i?v(`drawer`,void 0,E,e):void 0;return{mergedClsPrefix:t,namespace:r,mergedBodyStyle:y,handleOutsideClick:S,handleMaskClick:x,handleEsc:w,mergedTheme:o,cssVars:i?void 0:E,themeClass:O?.themeClass,onRender:O?.onRender,isMounted:a}},render(){let{mergedClsPrefix:e}=this;return l(),s(U,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),a((l(),o(`div`,{class:A([`${e}-drawer-container`,this.namespace,this.themeClass]),style:m(this.cssVars),role:`none`},[this.showMask?(l(),s(E,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(l(),o(`div`,{key:1,"aria-hidden":!0,class:A([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):O(()=>null),(l(),s(te,f(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),w(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[H,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=c({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=u(J,null);e||P(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:n,mergedClsPrefix:r,nativeScrollbar:i,mergedTheme:a,bodyClass:c,bodyStyle:u,bodyContentClass:d,bodyContentStyle:p,headerClass:h,headerStyle:g,footerClass:_,footerStyle:v,scrollbarProps:y,closable:b,$slots:x}=this;return l(),o(`div`,{role:`none`,class:A([`${r}-drawer-content`,i&&`${r}-drawer-content--native-scrollbar`])},[x.header||n||b?(l(),o(`div`,{key:0,class:A([`${r}-drawer-header`,h]),style:m(g),role:`none`},[e(`div`,{class:A(`${r}-drawer-header__main`),role:`heading`,"aria-level":`1`},[x.header===void 0?(l(),o(t,{key:1},[O(()=>n)],64)):(l(),o(t,{key:0},[O(()=>x.header())],64))],2),O(()=>b&&(l(),s(ee,{onClick:this.handleCloseClick,clsPrefix:r,class:A(`${r}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):O(()=>null),i?(l(),o(`div`,{key:2,class:A([`${r}-drawer-body`,c]),style:m(u),role:`none`},[e(`div`,{class:A([`${r}-drawer-body-content-wrapper`,d]),style:m(p),role:`none`},[O(()=>x.default?.())],6)],6)):(l(),s(I,f({key:3,themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},y,{class:`${r}-drawer-body`,contentClass:[`${r}-drawer-body-content-wrapper`,d],contentStyle:p}),w(x),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),x.footer?(l(),o(`div`,{key:4,class:A([`${r}-drawer-footer`,_]),style:m(v),role:`none`},[O(()=>x.footer())],6)):O(()=>null)],2)}});export{ge as n,_e as t};