import{H as e,Ht as t,K as n,L as r,Lt as i,Ot as a,Q as o,Tt as s,U as c,W as l,at as u,ht as d,lt as f,mt as p,on as m,rt as h,tt as g,wt as _}from"./endpoints-BhTSb8lj.js";import{A as v,E as y,Gt as b,Jt as x,Kt as S,T as C,Yt as w,_t as T,an as E,ft as D,it as O,k,nn as A,ot as j,st as M,ut as N,v as ee}from"./createLucideIcon-Byg0Q1WZ.js";import{a as P,t as F}from"./Scrollbar-Cxvob6a1.js";import{t as I}from"./use-merged-state-D-29Gt4l.js";import{t as L}from"./format-length-BwSo_EUP.js";import{H as te,R,Z as z,dt as B,et as V,ft as H,mt as U,nt as W,pt as G,rt as K,tt as q,w as J,x as Y}from"./index-Cbuc1RP1.js";var X=[`onMouseenter`,`onMouseleave`,`onMousedown`],Z={key:1,role:`none`},Q=o({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let n=i(!!t.show),r=i(null),a=h(U),o=0,c=``,l=null,u=i(!1),p=i(!1),m=e(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:g,mergedRtlRef:v}=D(t),y=ee(`Drawer`,v,g),b=j,x=e=>{p.value=!0,o=m.value?e.clientY:e.clientX,c=document.body.style.cursor,document.body.style.cursor=m.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{l!==null&&(window.clearTimeout(l),l=null),p.value?u.value=!0:l=window.setTimeout(()=>{u.value=!0},300)},C=()=>{l!==null&&(window.clearTimeout(l),l=null),u.value=!1},{doUpdateHeight:w,doUpdateWidth:T}=a,O=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},k=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function A(e){if(p.value){if(m.value){let n=r.value?.offsetHeight||0,i=o-e.clientY;n+=t.placement===`bottom`?i:-i,n=k(n),w(n),o=e.clientY}else{let n=r.value?.offsetWidth||0,i=o-e.clientX;n+=t.placement===`right`?i:-i,n=O(n),T(n),o=e.clientX}}}function j(){p.value&&(o=0,p.value=!1,document.body.style.cursor=c,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}s(()=>{t.show&&(n.value=!0)}),_(()=>t.show,e=>{e||j()}),f(()=>{j()});let M=e(()=>{let{show:e}=t,n=[[E,e]];return t.showMask||n.push([K,t.onClickoutside,void 0,{capture:!0}]),n});function N(){n.value=!1,t.onAfterLeave?.()}return te(e(()=>t.blockScroll&&n.value)),d(G,r),d(B,null),d(H,null),{bodyRef:r,rtlEnabled:y,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:n,transitionName:e(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:C,isDragging:p,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?a((p(),n(`div`,Z,[(p(),l(V,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(p(),l(A,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>a(g(`div`,u(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(p(),n(`div`,{key:2,class:O([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,X)):null,this.nativeScrollbar?(p(),n(`div`,{key:3,class:O([`${t}-drawer-content-wrapper`,this.contentClass]),style:m(this.contentStyle),role:`none`},[M(()=>e.default?.())],6)):(p(),l(F,u({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),j(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[E,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=N;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),b(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=N;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),b(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=N;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),b(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=N;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),b(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=b([S(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),w(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),w(`native-scrollbar`,[S(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),x(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[w(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),S(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),S(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[w(`native-scrollbar`,[S(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),S(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),S(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),S(`drawer-header`,`
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
 `)]),S(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),w(`right-placement`,`
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
 `)]),w(`left-placement`,`
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
 `)]),w(`top-placement`,`
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
 `)]),w(`bottom-placement`,`
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
 `)])]),b(`body`,[b(`>`,[S(`drawer-container`,`
 position: fixed;
 `)])]),S(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[b(`> *`,`
 pointer-events: all;
 `)]),S(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[w(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),P({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...k.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=o({name:`Drawer`,inheritAttrs:!1,props:he,setup(n){let{mergedClsPrefixRef:r,namespaceRef:a,inlineThemeDisabled:o}=D(n),s=y(),c=k(`Drawer`,`-drawer`,$,Y,n,r),l=i(n.defaultWidth),u=i(n.defaultHeight),f=I(t(n,`width`),l),p=I(t(n,`height`),u),m=e(()=>{let{placement:e}=n;return e===`top`||e===`bottom`?``:L(f.value)}),h=e(()=>{let{placement:e}=n;return e===`left`||e===`right`?``:L(p.value)}),g=e=>{let{onUpdateWidth:t,"onUpdate:width":r}=n;t&&C(t,e),r&&C(r,e),l.value=e},_=e=>{let{onUpdateHeight:t,"onUpdate:width":r}=n;t&&C(t,e),r&&C(r,e),u.value=e},b=e(()=>[{width:m.value,height:h.value},n.drawerStyle||``]);function x(e){let{onMaskClick:t,maskClosable:r}=n;r&&E(!1),t&&t(e)}function S(e){x(e)}let w=J();function T(e){n.onEsc?.(),n.show&&n.closeOnEsc&&R(e)&&(w.value||E(!1))}function E(e){let{onHide:t,onUpdateShow:r,"onUpdate:show":i}=n;r&&C(r,e),i&&C(i,e),t&&!e&&C(t,e)}d(U,{isMountedRef:s,mergedThemeRef:c,mergedClsPrefixRef:r,doUpdateShow:E,doUpdateHeight:_,doUpdateWidth:g});let O=e(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=c.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),A=o?v(`drawer`,void 0,O,n):void 0;return{mergedClsPrefix:r,namespace:a,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:T,mergedTheme:c,cssVars:o?void 0:O,themeClass:A?.themeClass,onRender:A?.onRender,isMounted:s}},render(){let{mergedClsPrefix:e}=this;return p(),l(q,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),a((p(),n(`div`,{class:O([`${e}-drawer-container`,this.namespace,this.themeClass]),style:m(this.cssVars),role:`none`},[this.showMask?(p(),l(A,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(p(),n(`div`,{key:1,"aria-hidden":!0,class:O([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):M(()=>null),(p(),l(Q,u(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),j(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[W,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=o({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=h(U,null);e||T(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:i,mergedTheme:a,bodyClass:o,bodyStyle:s,bodyContentClass:d,bodyContentStyle:f,headerClass:h,headerStyle:g,footerClass:_,footerStyle:v,scrollbarProps:y,closable:b,$slots:x}=this;return p(),n(`div`,{role:`none`,class:O([`${t}-drawer-content`,i&&`${t}-drawer-content--native-scrollbar`])},[x.header||e||b?(p(),n(`div`,{key:0,class:O([`${t}-drawer-header`,h]),style:m(g),role:`none`},[c(`div`,{class:O(`${t}-drawer-header__main`),role:`heading`,"aria-level":`1`},[x.header===void 0?(p(),n(r,{key:1},[M(()=>e)],64)):(p(),n(r,{key:0},[M(()=>x.header())],64))],2),M(()=>b&&(p(),l(z,{onClick:this.handleCloseClick,clsPrefix:t,class:O(`${t}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):M(()=>null),i?(p(),n(`div`,{key:2,class:O([`${t}-drawer-body`,o]),style:m(s),role:`none`},[c(`div`,{class:O([`${t}-drawer-body-content-wrapper`,d]),style:m(f),role:`none`},[M(()=>x.default?.())],6)],6)):(p(),l(F,u({key:3,themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},y,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,d],contentStyle:f}),j(x),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),x.footer?(p(),n(`div`,{key:4,class:O([`${t}-drawer-footer`,_]),style:m(v),role:`none`},[M(()=>x.footer())],6)):M(()=>null)],2)}});export{ge as n,_e as t};