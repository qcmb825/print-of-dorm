import{At as e,Dt as t,Et as n,G as r,J as i,K as a,W as o,Wt as s,_t as c,at as l,cn as u,dt as d,et as f,gt as p,rt as m,st as h,z as g,zt as _}from"./endpoints-CdlTyxMC.js";import{A as v,E as y,Gt as b,Jt as x,Kt as S,T as C,Yt as w,_t as T,an as E,ft as D,it as O,k,nn as A,ot as j,st as M,ut as N,v as ee}from"./createLucideIcon-DLecE6ZQ.js";import{a as P,t as F}from"./Scrollbar-sQP4-hqP.js";import{t as I}from"./use-merged-state-CNc-nLwj.js";import{t as L}from"./format-length-BwSo_EUP.js";import{H as te,R,Z as z,dt as B,et as V,ft as H,mt as U,nt as W,pt as G,rt as K,tt as q,w as J,x as Y}from"./index-DoHYFKo9.js";var X=[`onMouseenter`,`onMouseleave`,`onMousedown`],Z={key:1,role:`none`},Q=f({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let r=_(!!e.show),i=_(null),a=l(U),s=0,u=``,f=null,p=_(!1),m=_(!1),h=o(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:g,mergedRtlRef:v}=D(e),y=ee(`Drawer`,v,g),b=j,x=e=>{m.value=!0,s=h.value?e.clientY:e.clientX,u=document.body.style.cursor,document.body.style.cursor=h.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{f!==null&&(window.clearTimeout(f),f=null),m.value?p.value=!0:f=window.setTimeout(()=>{p.value=!0},300)},C=()=>{f!==null&&(window.clearTimeout(f),f=null),p.value=!1},{doUpdateHeight:w,doUpdateWidth:T}=a,O=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},k=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function A(t){if(m.value){if(h.value){let n=i.value?.offsetHeight||0,r=s-t.clientY;n+=e.placement===`bottom`?r:-r,n=k(n),w(n),s=t.clientY}else{let n=i.value?.offsetWidth||0,r=s-t.clientX;n+=e.placement===`right`?r:-r,n=O(n),T(n),s=t.clientX}}}function j(){m.value&&(s=0,m.value=!1,document.body.style.cursor=u,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}t(()=>{e.show&&(r.value=!0)}),n(()=>e.show,e=>{e||j()}),d(()=>{j()});let M=o(()=>{let{show:t}=e,n=[[E,t]];return e.showMask||n.push([K,e.onClickoutside,void 0,{capture:!0}]),n});function N(){r.value=!1,e.onAfterLeave?.()}return te(o(()=>e.blockScroll&&r.value)),c(G,i),c(B,null),c(H,null),{bodyRef:i,rtlEnabled:y,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:r,transitionName:o(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:C,isDragging:m,isHoverOnResizeTrigger:p}},render(){let{$slots:t,mergedClsPrefix:n}=this;return this.displayDirective===`show`||this.displayed||this.show?e((p(),i(`div`,Z,[(p(),a(V,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(p(),a(A,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>e(m(`div`,h(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${n}-drawer`,this.rtlEnabled&&`${n}-drawer--rtl`,`${n}-drawer--${this.placement}-placement`,this.isDragging&&`${n}-drawer--unselectable`,this.nativeScrollbar&&`${n}-drawer--native-scrollbar`]}),[this.resizable?(p(),i(`div`,{key:2,class:O([`${n}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${n}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,X)):null,this.nativeScrollbar?(p(),i(`div`,{key:3,class:O([`${n}-drawer-content-wrapper`,this.contentClass]),style:u(this.contentStyle),role:`none`},[M(()=>t.default?.())],6)):(p(),a(F,h({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${n}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),j(t),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[E,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=N;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),b(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=N;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),b(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=N;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),b(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=N;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),b(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=b([S(`drawer`,`
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
 `),P({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...k.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=f({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=D(e),i=y(),a=k(`Drawer`,`-drawer`,$,Y,e,t),l=_(e.defaultWidth),u=_(e.defaultHeight),d=I(s(e,`width`),l),f=I(s(e,`height`),u),p=o(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:L(d.value)}),m=o(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:L(f.value)}),h=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&C(n,t),r&&C(r,t),l.value=t},g=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&C(n,t),r&&C(r,t),u.value=t},b=o(()=>[{width:p.value,height:m.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&E(!1),n&&n(t)}function S(e){x(e)}let w=J();function T(t){e.onEsc?.(),e.show&&e.closeOnEsc&&R(t)&&(w.value||E(!1))}function E(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&C(r,t),i&&C(i,t),n&&!t&&C(n,t)}c(U,{isMountedRef:i,mergedThemeRef:a,mergedClsPrefixRef:t,doUpdateShow:E,doUpdateHeight:g,doUpdateWidth:h});let O=o(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:o,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=a.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":o,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),A=r?v(`drawer`,void 0,O,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:T,mergedTheme:a,cssVars:r?void 0:O,themeClass:A?.themeClass,onRender:A?.onRender,isMounted:i}},render(){let{mergedClsPrefix:t}=this;return p(),a(q,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),e((p(),i(`div`,{class:O([`${t}-drawer-container`,this.namespace,this.themeClass]),style:u(this.cssVars),role:`none`},[this.showMask?(p(),a(A,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(p(),i(`div`,{key:1,"aria-hidden":!0,class:O([`${t}-drawer-mask`,this.showMask===`transparent`&&`${t}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):M(()=>null),(p(),a(Q,h(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),j(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[W,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=f({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=l(U,null);e||T(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:n,mergedTheme:o,bodyClass:s,bodyStyle:c,bodyContentClass:l,bodyContentStyle:d,headerClass:f,headerStyle:m,footerClass:_,footerStyle:v,scrollbarProps:y,closable:b,$slots:x}=this;return p(),i(`div`,{role:`none`,class:O([`${t}-drawer-content`,n&&`${t}-drawer-content--native-scrollbar`])},[x.header||e||b?(p(),i(`div`,{key:0,class:O([`${t}-drawer-header`,f]),style:u(m),role:`none`},[r(`div`,{class:O(`${t}-drawer-header__main`),role:`heading`,"aria-level":`1`},[x.header===void 0?(p(),i(g,{key:1},[M(()=>e)],64)):(p(),i(g,{key:0},[M(()=>x.header())],64))],2),M(()=>b&&(p(),a(z,{onClick:this.handleCloseClick,clsPrefix:t,class:O(`${t}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):M(()=>null),n?(p(),i(`div`,{key:2,class:O([`${t}-drawer-body`,s]),style:u(c),role:`none`},[r(`div`,{class:O([`${t}-drawer-body-content-wrapper`,l]),style:u(d),role:`none`},[M(()=>x.default?.())],6)],6)):(p(),a(F,h({key:3,themeOverrides:o.peerOverrides.Scrollbar,theme:o.peers.Scrollbar},y,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,l],contentStyle:d}),j(x),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),x.footer?(p(),i(`div`,{key:4,class:O([`${t}-drawer-footer`,_]),style:u(v),role:`none`},[M(()=>x.footer())],6)):M(()=>null)],2)}});export{ge as n,_e as t};