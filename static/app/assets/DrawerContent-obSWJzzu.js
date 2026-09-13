import{$t as e,Dn as t,Hn as n,I as r,In as i,Jn as a,L as o,M as s,Mn as c,N as l,Qn as u,Qt as d,Sn as f,T as p,Vn as m,Yn as h,_r as g,_t as _,bn as v,dt as y,fn as b,fr as x,gn as S,jn as C,kn as w,ln as T,mt as E,nn as D,pt as O,sr as k,tn as A,wn as j,wt as M,xn as N,yt as P}from"./endpoints-BzNG02YK.js";import{C as F,D as I,E as L,S as R,c as z,f as B,i as V,l as H,n as U,s as W}from"./fade-in-scale-up.cssr-6X4IxNMz.js";import{f as G,l as K}from"./Popover-Clul5osh.js";import{A as q,P as J,V as Y,h as X,v as Z}from"./index-DSlgQqc9.js";var Q=[`onMouseenter`,`onMouseleave`,`onMousedown`],$={key:1,role:`none`},ee=t({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=k(!!e.show),r=k(null),o=C(I),s=0,c=``,l=null,u=k(!1),d=k(!1),f=v(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:m,mergedRtlRef:g}=P(e),_=p(`Drawer`,g,m),y=j,x=e=>{d.value=!0,s=f.value?e.clientY:e.clientX,c=document.body.style.cursor,document.body.style.cursor=f.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,y),document.body.addEventListener(`mouseup`,j)},S=()=>{l!==null&&(window.clearTimeout(l),l=null),d.value?u.value=!0:l=window.setTimeout(()=>{u.value=!0},300)},w=()=>{l!==null&&(window.clearTimeout(l),l=null),u.value=!1},{doUpdateHeight:T,doUpdateWidth:E}=o,D=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},O=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function A(t){if(d.value){if(f.value){let n=r.value?.offsetHeight||0,i=s-t.clientY;n+=e.placement===`bottom`?i:-i,n=O(n),T(n),s=t.clientY}else{let n=r.value?.offsetWidth||0,i=s-t.clientX;n+=e.placement===`right`?i:-i,n=D(n),E(n),s=t.clientX}}}function j(){d.value&&(s=0,d.value=!1,document.body.style.cursor=c,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,y))}h(()=>{e.show&&(t.value=!0)}),a(()=>e.show,e=>{e||j()}),i(()=>{j()});let M=v(()=>{let{show:t}=e,n=[[b,t]];return e.showMask||n.push([H,e.onClickoutside,void 0,{capture:!0}]),n});function N(){t.value=!1,e.onAfterLeave?.()}return J(v(()=>e.blockScroll&&t.value)),n(L,r),n(R,null),n(F,null),{bodyRef:r,rtlEnabled:_,mergedClsPrefix:o.mergedClsPrefixRef,isMounted:o.isMountedRef,mergedTheme:o.mergedThemeRef,displayed:t,transitionName:v(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:w,isDragging:d,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?u((m(),j(`div`,$,[(m(),f(V,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(m(),f(T,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>u(w(`div`,c(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(m(),j(`div`,{key:2,class:y([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Q)):null,this.nativeScrollbar?(m(),j(`div`,{key:3,class:y([`${t}-drawer-content-wrapper`,this.contentClass]),style:g(this.contentStyle),role:`none`},[E(()=>e.default?.())],6)):(m(),f(U,c({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),O(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[b,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:te,cubicBezierEaseOut:ne}=_;function re({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[d(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${te}`}),d(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ne}`}),d(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),d(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),d(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),d(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ie,cubicBezierEaseOut:ae}=_;function oe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[d(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ie}`}),d(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ae}`}),d(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),d(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),d(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),d(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:se,cubicBezierEaseOut:ce}=_;function le({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[d(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${se}`}),d(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ce}`}),d(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),d(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),d(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),d(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:ue,cubicBezierEaseOut:de}=_;function fe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[d(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ue}`}),d(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${de}`}),d(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),d(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),d(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),d(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var pe=d([e(`drawer`,`
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
 `,[le(),oe(),fe(),re(),D(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),D(`native-scrollbar`,[e(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),A(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[D(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),e(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),e(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[D(`native-scrollbar`,[e(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),e(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),e(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),e(`drawer-header`,`
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
 `,[A(`main`,`
 flex: 1;
 `),A(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),e(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),D(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[A(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),D(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[A(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),D(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[A(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),D(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[A(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),d(`body`,[d(`>`,[e(`drawer-container`,`
 position: fixed;
 `)])]),e(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[d(`> *`,`
 pointer-events: all;
 `)]),e(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[D(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),B({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...r.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=t({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:i,inlineThemeDisabled:a}=P(e),c=l(),u=r(`Drawer`,`-drawer`,pe,X,e,t),d=k(e.defaultWidth),f=k(e.defaultHeight),p=G(x(e,`width`),d),m=G(x(e,`height`),f),h=v(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:K(p.value)}),g=v(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:K(m.value)}),_=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&s(n,t),r&&s(r,t),d.value=t},y=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&s(n,t),r&&s(r,t),f.value=t},b=v(()=>[{width:h.value,height:g.value},e.drawerStyle||``]);function S(t){let{onMaskClick:n,maskClosable:r}=e;r&&E(!1),n&&n(t)}function C(e){S(e)}let w=Z();function T(t){e.onEsc?.(),e.show&&e.closeOnEsc&&q(t)&&(w.value||E(!1))}function E(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&s(r,t),i&&s(i,t),n&&!t&&s(n,t)}n(I,{isMountedRef:c,mergedThemeRef:u,mergedClsPrefixRef:t,doUpdateShow:E,doUpdateHeight:y,doUpdateWidth:_});let D=v(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:c,borderRadius:l,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=u.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":l,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":c,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),O=a?o(`drawer`,void 0,D,e):void 0;return{mergedClsPrefix:t,namespace:i,mergedBodyStyle:b,handleOutsideClick:C,handleMaskClick:S,handleEsc:T,mergedTheme:u,cssVars:a?void 0:D,themeClass:O?.themeClass,onRender:O?.onRender,isMounted:c}},render(){let{mergedClsPrefix:e}=this;return m(),f(W,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),u((m(),j(`div`,{class:y([`${e}-drawer-container`,this.namespace,this.themeClass]),style:g(this.cssVars),role:`none`},[this.showMask?(m(),f(T,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(m(),j(`div`,{key:1,"aria-hidden":!0,class:y([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):E(()=>null),(m(),f(ee,c(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),O(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[z,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=t({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=C(I,null);e||M(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:n,mergedTheme:r,bodyClass:i,bodyStyle:a,bodyContentClass:o,bodyContentStyle:s,headerClass:l,headerStyle:u,footerClass:d,footerStyle:p,scrollbarProps:h,closable:_,$slots:v}=this;return m(),j(`div`,{role:`none`,class:y([`${t}-drawer-content`,n&&`${t}-drawer-content--native-scrollbar`])},[v.header||e||_?(m(),j(`div`,{key:0,class:y([`${t}-drawer-header`,l]),style:g(u),role:`none`},[N(`div`,{class:y(`${t}-drawer-header__main`),role:`heading`,"aria-level":`1`},[v.header===void 0?(m(),j(S,{key:1},[E(()=>e)],64)):(m(),j(S,{key:0},[E(()=>v.header())],64))],2),E(()=>_&&(m(),f(Y,{onClick:this.handleCloseClick,clsPrefix:t,class:y(`${t}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):E(()=>null),n?(m(),j(`div`,{key:2,class:y([`${t}-drawer-body`,i]),style:g(a),role:`none`},[N(`div`,{class:y([`${t}-drawer-body-content-wrapper`,o]),style:g(s),role:`none`},[E(()=>v.default?.())],6)],6)):(m(),f(U,c({key:3,themeOverrides:r.peerOverrides.Scrollbar,theme:r.peers.Scrollbar},h,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,o],contentStyle:s}),O(v),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),v.footer?(m(),j(`div`,{key:4,class:y([`${t}-drawer-footer`,d]),style:g(p),role:`none`},[E(()=>v.footer())],6)):E(()=>null)],2)}});export{ge as n,_e as t};