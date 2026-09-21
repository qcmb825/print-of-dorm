import{Ct as e,Dt as t,G as n,H as r,I as i,It as a,U as o,V as s,Vt as c,Z as l,an as u,ct as d,et as f,it as p,mt as m,nt as h,pt as g,wt as _}from"./endpoints-MMH2_YQj.js";import{A as v,E as y,Gt as b,Jt as x,Kt as S,T as C,Yt as w,_t as T,an as E,ft as D,it as O,k,nn as A,ot as j,st as M,ut as N,v as ee}from"./createLucideIcon-Dgil5eM1.js";import{a as P,t as F}from"./Scrollbar-cO_MZVQX.js";import{t as I}from"./use-merged-state-BnSBV-cQ.js";import{t as L}from"./format-length-BwSo_EUP.js";import{H as te,R,Z as z,dt as B,et as V,ft as H,mt as U,nt as W,pt as G,rt as K,tt as q,w as J,x as Y}from"./index-ChakMpLN.js";var X=[`onMouseenter`,`onMouseleave`,`onMousedown`],Z={key:1,role:`none`},Q=l({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let n=a(!!t.show),r=a(null),i=h(U),o=0,c=``,l=null,u=a(!1),f=a(!1),p=s(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:g,mergedRtlRef:v}=D(t),y=ee(`Drawer`,v,g),b=j,x=e=>{f.value=!0,o=p.value?e.clientY:e.clientX,c=document.body.style.cursor,document.body.style.cursor=p.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{l!==null&&(window.clearTimeout(l),l=null),f.value?u.value=!0:l=window.setTimeout(()=>{u.value=!0},300)},C=()=>{l!==null&&(window.clearTimeout(l),l=null),u.value=!1},{doUpdateHeight:w,doUpdateWidth:T}=i,O=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},k=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function A(e){if(f.value){if(p.value){let n=r.value?.offsetHeight||0,i=o-e.clientY;n+=t.placement===`bottom`?i:-i,n=k(n),w(n),o=e.clientY}else{let n=r.value?.offsetWidth||0,i=o-e.clientX;n+=t.placement===`right`?i:-i,n=O(n),T(n),o=e.clientX}}}function j(){f.value&&(o=0,f.value=!1,document.body.style.cursor=c,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}_(()=>{t.show&&(n.value=!0)}),e(()=>t.show,e=>{e||j()}),d(()=>{j()});let M=s(()=>{let{show:e}=t,n=[[E,e]];return t.showMask||n.push([K,t.onClickoutside,void 0,{capture:!0}]),n});function N(){n.value=!1,t.onAfterLeave?.()}return te(s(()=>t.blockScroll&&n.value)),m(G,r),m(B,null),m(H,null),{bodyRef:r,rtlEnabled:y,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:n,transitionName:s(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:C,isDragging:f,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:r}=this;return this.displayDirective===`show`||this.displayed||this.show?t((g(),n(`div`,Z,[(g(),o(V,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(g(),o(A,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>t(f(`div`,p(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${r}-drawer`,this.rtlEnabled&&`${r}-drawer--rtl`,`${r}-drawer--${this.placement}-placement`,this.isDragging&&`${r}-drawer--unselectable`,this.nativeScrollbar&&`${r}-drawer--native-scrollbar`]}),[this.resizable?(g(),n(`div`,{key:2,class:O([`${r}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${r}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,X)):null,this.nativeScrollbar?(g(),n(`div`,{key:3,class:O([`${r}-drawer-content-wrapper`,this.contentClass]),style:u(this.contentStyle),role:`none`},[M(()=>e.default?.())],6)):(g(),o(F,p({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${r}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),j(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[E,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=N;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),b(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=N;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),b(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=N;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),b(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=N;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),b(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=b([S(`drawer`,`
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
 `),P({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...k.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=l({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=D(e),i=y(),o=k(`Drawer`,`-drawer`,$,Y,e,t),l=a(e.defaultWidth),u=a(e.defaultHeight),d=I(c(e,`width`),l),f=I(c(e,`height`),u),p=s(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:L(d.value)}),h=s(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:L(f.value)}),g=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&C(n,t),r&&C(r,t),l.value=t},_=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&C(n,t),r&&C(r,t),u.value=t},b=s(()=>[{width:p.value,height:h.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&E(!1),n&&n(t)}function S(e){x(e)}let w=J();function T(t){e.onEsc?.(),e.show&&e.closeOnEsc&&R(t)&&(w.value||E(!1))}function E(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&C(r,t),i&&C(i,t),n&&!t&&C(n,t)}m(U,{isMountedRef:i,mergedThemeRef:o,mergedClsPrefixRef:t,doUpdateShow:E,doUpdateHeight:_,doUpdateWidth:g});let O=s(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=o.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),A=r?v(`drawer`,void 0,O,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:T,mergedTheme:o,cssVars:r?void 0:O,themeClass:A?.themeClass,onRender:A?.onRender,isMounted:i}},render(){let{mergedClsPrefix:e}=this;return g(),o(q,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),t((g(),n(`div`,{class:O([`${e}-drawer-container`,this.namespace,this.themeClass]),style:u(this.cssVars),role:`none`},[this.showMask?(g(),o(A,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(g(),n(`div`,{key:1,"aria-hidden":!0,class:O([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):M(()=>null),(g(),o(Q,p(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),j(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[W,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=l({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=h(U,null);e||T(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:a,mergedTheme:s,bodyClass:c,bodyStyle:l,bodyContentClass:d,bodyContentStyle:f,headerClass:m,headerStyle:h,footerClass:_,footerStyle:v,scrollbarProps:y,closable:b,$slots:x}=this;return g(),n(`div`,{role:`none`,class:O([`${t}-drawer-content`,a&&`${t}-drawer-content--native-scrollbar`])},[x.header||e||b?(g(),n(`div`,{key:0,class:O([`${t}-drawer-header`,m]),style:u(h),role:`none`},[r(`div`,{class:O(`${t}-drawer-header__main`),role:`heading`,"aria-level":`1`},[x.header===void 0?(g(),n(i,{key:1},[M(()=>e)],64)):(g(),n(i,{key:0},[M(()=>x.header())],64))],2),M(()=>b&&(g(),o(z,{onClick:this.handleCloseClick,clsPrefix:t,class:O(`${t}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):M(()=>null),a?(g(),n(`div`,{key:2,class:O([`${t}-drawer-body`,c]),style:u(l),role:`none`},[r(`div`,{class:O([`${t}-drawer-body-content-wrapper`,d]),style:u(f),role:`none`},[M(()=>x.default?.())],6)],6)):(g(),o(F,p({key:3,themeOverrides:s.peerOverrides.Scrollbar,theme:s.peers.Scrollbar},y,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,d],contentStyle:f}),j(x),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),x.footer?(g(),n(`div`,{key:4,class:O([`${t}-drawer-footer`,_]),style:u(v),role:`none`},[M(()=>x.footer())],6)):M(()=>null)],2)}});export{ge as n,_e as t};