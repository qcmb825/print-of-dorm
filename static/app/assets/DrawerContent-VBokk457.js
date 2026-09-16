import{An as e,Cn as t,D as n,En as r,Et as i,F as a,Fn as o,Gn as s,Mn as c,P as l,Pn as u,Qn as d,R as f,Sn as p,Wn as m,Zn as h,br as g,dn as _,en as v,gt as y,hr as b,ht as x,in as S,mn as C,pt as w,rn as T,tn as E,tr as D,ur as O,vn as k,wn as A,xt as j,yt as M,z as N,zn as P}from"./endpoints-BvEVWgoh.js";import{C as ee,D as F,E as I,S as L,c as R,f as z,i as B,l as V,n as H,s as U}from"./fade-in-scale-up.cssr-Bwy9Q-pZ.js";import{s as W}from"./Popover-DhPzouDG.js";import{i as G}from"./cssr-CLoLU9gX.js";import{G as K,L as q,N as J,v as Y,x as X}from"./index-BMaEOz3J.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},$=e({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=O(!!e.show),r=O(null),i=u(F),a=0,o=``,c=null,l=O(!1),f=O(!1),m=p(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:g,mergedRtlRef:_}=j(e),v=n(`Drawer`,_,g),y=A,b=e=>{f.value=!0,a=m.value?e.clientY:e.clientX,o=document.body.style.cursor,document.body.style.cursor=m.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,k),document.body.addEventListener(`mouseleave`,y),document.body.addEventListener(`mouseup`,A)},x=()=>{c!==null&&(window.clearTimeout(c),c=null),f.value?l.value=!0:c=window.setTimeout(()=>{l.value=!0},300)},S=()=>{c!==null&&(window.clearTimeout(c),c=null),l.value=!1},{doUpdateHeight:w,doUpdateWidth:T}=i,E=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},D=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function k(t){if(f.value){if(m.value){let n=r.value?.offsetHeight||0,i=a-t.clientY;n+=e.placement===`bottom`?i:-i,n=D(n),w(n),a=t.clientY}else{let n=r.value?.offsetWidth||0,i=a-t.clientX;n+=e.placement===`right`?i:-i,n=E(n),T(n),a=t.clientX}}}function A(){f.value&&(a=0,f.value=!1,document.body.style.cursor=o,document.body.removeEventListener(`mousemove`,k),document.body.removeEventListener(`mouseup`,A),document.body.removeEventListener(`mouseleave`,y))}d(()=>{e.show&&(t.value=!0)}),h(()=>e.show,e=>{e||A()}),P(()=>{A()});let M=p(()=>{let{show:t}=e,n=[[C,t]];return e.showMask||n.push([V,e.onClickoutside,void 0,{capture:!0}]),n});function N(){t.value=!1,e.onAfterLeave?.()}return q(p(()=>e.blockScroll&&t.value)),s(I,r),s(L,null),s(ee,null),{bodyRef:r,rtlEnabled:v,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:t,transitionName:p(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:b,handleMouseenterResizeTrigger:x,handleMouseleaveResizeTrigger:S,isDragging:f,isHoverOnResizeTrigger:l}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?D((m(),r(`div`,Q,[(m(),A(B,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(m(),A(_,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>D(c(`div`,o(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(m(),r(`div`,{key:2,class:w([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(m(),r(`div`,{key:3,class:w([`${t}-drawer-content-wrapper`,this.contentClass]),style:g(this.contentStyle),role:`none`},[y(()=>e.default?.())],6)):(m(),A(H,o({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),x(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[C,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:te,cubicBezierEaseOut:ne}=M;function re({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[v(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${te}`}),v(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ne}`}),v(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),v(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),v(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),v(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ie,cubicBezierEaseOut:ae}=M;function oe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[v(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ie}`}),v(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ae}`}),v(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),v(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),v(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),v(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:se,cubicBezierEaseOut:ce}=M;function le({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[v(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${se}`}),v(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ce}`}),v(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),v(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),v(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),v(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:ue,cubicBezierEaseOut:de}=M;function fe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[v(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ue}`}),v(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${de}`}),v(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),v(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),v(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),v(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var pe=v([E(`drawer`,`
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
 `,[le(),oe(),fe(),re(),S(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),S(`native-scrollbar`,[E(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),T(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[S(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),E(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),E(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[S(`native-scrollbar`,[E(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),E(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),E(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),E(`drawer-header`,`
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
 `,[T(`main`,`
 flex: 1;
 `),T(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),E(`drawer-footer`,`
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
 `,[T(`resize-trigger`,`
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
 `,[T(`resize-trigger`,`
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
 `,[T(`resize-trigger`,`
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
 `,[T(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),v(`body`,[v(`>`,[E(`drawer-container`,`
 position: fixed;
 `)])]),E(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[v(`> *`,`
 pointer-events: all;
 `)]),E(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[S(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),z({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...f.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=e({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=j(e),i=a(),o=f(`Drawer`,`-drawer`,pe,Y,e,t),c=O(e.defaultWidth),u=O(e.defaultHeight),d=G(b(e,`width`),c),m=G(b(e,`height`),u),h=p(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:W(d.value)}),g=p(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:W(m.value)}),_=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&l(n,t),r&&l(r,t),c.value=t},v=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&l(n,t),r&&l(r,t),u.value=t},y=p(()=>[{width:h.value,height:g.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&T(!1),n&&n(t)}function S(e){x(e)}let C=X();function w(t){e.onEsc?.(),e.show&&e.closeOnEsc&&J(t)&&(C.value||T(!1))}function T(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&l(r,t),i&&l(i,t),n&&!t&&l(n,t)}s(F,{isMountedRef:i,mergedThemeRef:o,mergedClsPrefixRef:t,doUpdateShow:T,doUpdateHeight:v,doUpdateWidth:_});let E=p(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=o.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),D=r?N(`drawer`,void 0,E,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:y,handleOutsideClick:S,handleMaskClick:x,handleEsc:w,mergedTheme:o,cssVars:r?void 0:E,themeClass:D?.themeClass,onRender:D?.onRender,isMounted:i}},render(){let{mergedClsPrefix:e}=this;return m(),A(U,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),D((m(),r(`div`,{class:w([`${e}-drawer-container`,this.namespace,this.themeClass]),style:g(this.cssVars),role:`none`},[this.showMask?(m(),A(_,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(m(),r(`div`,{key:1,"aria-hidden":!0,class:w([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):y(()=>null),(m(),A($,o(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),x(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[R,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=e({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=u(F,null);e||i(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:n,nativeScrollbar:i,mergedTheme:a,bodyClass:s,bodyStyle:c,bodyContentClass:l,bodyContentStyle:u,headerClass:d,headerStyle:f,footerClass:p,footerStyle:h,scrollbarProps:_,closable:v,$slots:b}=this;return m(),r(`div`,{role:`none`,class:w([`${n}-drawer-content`,i&&`${n}-drawer-content--native-scrollbar`])},[b.header||e||v?(m(),r(`div`,{key:0,class:w([`${n}-drawer-header`,d]),style:g(f),role:`none`},[t(`div`,{class:w(`${n}-drawer-header__main`),role:`heading`,"aria-level":`1`},[b.header===void 0?(m(),r(k,{key:1},[y(()=>e)],64)):(m(),r(k,{key:0},[y(()=>b.header())],64))],2),y(()=>v&&(m(),A(K,{onClick:this.handleCloseClick,clsPrefix:n,class:w(`${n}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):y(()=>null),i?(m(),r(`div`,{key:2,class:w([`${n}-drawer-body`,s]),style:g(c),role:`none`},[t(`div`,{class:w([`${n}-drawer-body-content-wrapper`,l]),style:g(u),role:`none`},[y(()=>b.default?.())],6)],6)):(m(),A(H,o({key:3,themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},_,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,l],contentStyle:u}),x(b),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),b.footer?(m(),r(`div`,{key:4,class:w([`${n}-drawer-footer`,p]),style:g(h),role:`none`},[y(()=>b.footer())],6)):y(()=>null)],2)}});export{ge as n,_e as t};