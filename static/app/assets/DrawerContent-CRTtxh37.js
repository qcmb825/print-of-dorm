import{$n as e,$t as t,An as n,Hn as r,I as i,L as a,Ln as o,M as s,Mn as c,N as l,Nn as u,On as d,Qt as f,Sn as p,T as m,Un as h,Xn as g,Yn as _,_t as v,bn as y,cr as b,dt as x,fn as S,gn as C,ln as w,mt as T,nn as E,pr as D,pt as O,tn as k,vr as A,wn as j,wt as M,xn as N,yt as P}from"./endpoints-BjKpicAD.js";import{C as F,D as I,E as L,S as R,c as z,f as B,i as V,l as H,n as U,s as W}from"./fade-in-scale-up.cssr-YHRJZfJ_.js";import{f as G,l as K}from"./Popover-Da_9Zg5V.js";import{L as q,N as J,W as Y,v as X,x as Z}from"./index-F9FIAhEV.js";var Q=[`onMouseenter`,`onMouseleave`,`onMousedown`],$={key:1,role:`none`},ee=d({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=b(!!e.show),n=b(null),r=c(I),i=0,a=``,s=null,l=b(!1),u=b(!1),d=y(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:f,mergedRtlRef:p}=P(e),v=m(`Drawer`,p,f),x=j,C=e=>{u.value=!0,i=d.value?e.clientY:e.clientX,a=document.body.style.cursor,document.body.style.cursor=d.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,x),document.body.addEventListener(`mouseup`,j)},w=()=>{s!==null&&(window.clearTimeout(s),s=null),u.value?l.value=!0:s=window.setTimeout(()=>{l.value=!0},300)},T=()=>{s!==null&&(window.clearTimeout(s),s=null),l.value=!1},{doUpdateHeight:E,doUpdateWidth:D}=r,O=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},k=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function A(t){if(u.value){if(d.value){let r=n.value?.offsetHeight||0,a=i-t.clientY;r+=e.placement===`bottom`?a:-a,r=k(r),E(r),i=t.clientY}else{let r=n.value?.offsetWidth||0,a=i-t.clientX;r+=e.placement===`right`?a:-a,r=O(r),D(r),i=t.clientX}}}function j(){u.value&&(i=0,u.value=!1,document.body.style.cursor=a,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,x))}g(()=>{e.show&&(t.value=!0)}),_(()=>e.show,e=>{e||j()}),o(()=>{j()});let M=y(()=>{let{show:t}=e,n=[[S,t]];return e.showMask||n.push([H,e.onClickoutside,void 0,{capture:!0}]),n});function N(){t.value=!1,e.onAfterLeave?.()}return q(y(()=>e.blockScroll&&t.value)),h(L,n),h(R,null),h(F,null),{bodyRef:n,rtlEnabled:v,mergedClsPrefix:r.mergedClsPrefixRef,isMounted:r.isMountedRef,mergedTheme:r.mergedThemeRef,displayed:t,transitionName:y(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:C,handleMouseenterResizeTrigger:w,handleMouseleaveResizeTrigger:T,isDragging:u,isHoverOnResizeTrigger:l}},render(){let{$slots:t,mergedClsPrefix:i}=this;return this.displayDirective===`show`||this.displayed||this.show?e((r(),j(`div`,$,[(r(),p(V,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(r(),p(w,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>e(n(`div`,u(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${i}-drawer`,this.rtlEnabled&&`${i}-drawer--rtl`,`${i}-drawer--${this.placement}-placement`,this.isDragging&&`${i}-drawer--unselectable`,this.nativeScrollbar&&`${i}-drawer--native-scrollbar`]}),[this.resizable?(r(),j(`div`,{key:2,class:x([`${i}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${i}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Q)):null,this.nativeScrollbar?(r(),j(`div`,{key:3,class:x([`${i}-drawer-content-wrapper`,this.contentClass]),style:A(this.contentStyle),role:`none`},[T(()=>t.default?.())],6)):(r(),p(U,u({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${i}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),O(t),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[S,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:te,cubicBezierEaseOut:ne}=v;function re({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[f(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${te}`}),f(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ne}`}),f(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),f(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),f(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),f(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ie,cubicBezierEaseOut:ae}=v;function oe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[f(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ie}`}),f(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ae}`}),f(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),f(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),f(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),f(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:se,cubicBezierEaseOut:ce}=v;function le({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[f(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${se}`}),f(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ce}`}),f(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),f(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),f(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),f(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:ue,cubicBezierEaseOut:de}=v;function fe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[f(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ue}`}),f(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${de}`}),f(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),f(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),f(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),f(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var pe=f([t(`drawer`,`
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
 `,[le(),oe(),fe(),re(),E(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),E(`native-scrollbar`,[t(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),k(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[E(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),t(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),t(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[E(`native-scrollbar`,[t(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),t(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),t(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),t(`drawer-header`,`
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
 `,[k(`main`,`
 flex: 1;
 `),k(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),t(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),E(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[k(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),E(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[k(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),E(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[k(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),E(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[k(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),f(`body`,[f(`>`,[t(`drawer-container`,`
 position: fixed;
 `)])]),t(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[f(`> *`,`
 pointer-events: all;
 `)]),t(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[E(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),B({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...i.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=d({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:r}=P(e),o=l(),c=i(`Drawer`,`-drawer`,pe,X,e,t),u=b(e.defaultWidth),d=b(e.defaultHeight),f=G(D(e,`width`),u),p=G(D(e,`height`),d),m=y(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:K(f.value)}),g=y(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:K(p.value)}),_=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&s(n,t),r&&s(r,t),u.value=t},v=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&s(n,t),r&&s(r,t),d.value=t},x=y(()=>[{width:m.value,height:g.value},e.drawerStyle||``]);function S(t){let{onMaskClick:n,maskClosable:r}=e;r&&E(!1),n&&n(t)}function C(e){S(e)}let w=Z();function T(t){e.onEsc?.(),e.show&&e.closeOnEsc&&J(t)&&(w.value||E(!1))}function E(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&s(r,t),i&&s(i,t),n&&!t&&s(n,t)}h(I,{isMountedRef:o,mergedThemeRef:c,mergedClsPrefixRef:t,doUpdateShow:E,doUpdateHeight:v,doUpdateWidth:_});let O=y(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=c.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),k=r?a(`drawer`,void 0,O,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:x,handleOutsideClick:C,handleMaskClick:S,handleEsc:T,mergedTheme:c,cssVars:r?void 0:O,themeClass:k?.themeClass,onRender:k?.onRender,isMounted:o}},render(){let{mergedClsPrefix:t}=this;return r(),p(W,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),e((r(),j(`div`,{class:x([`${t}-drawer-container`,this.namespace,this.themeClass]),style:A(this.cssVars),role:`none`},[this.showMask?(r(),p(w,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(r(),j(`div`,{key:1,"aria-hidden":!0,class:x([`${t}-drawer-mask`,this.showMask===`transparent`&&`${t}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):T(()=>null),(r(),p(ee,u(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),O(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[z,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=d({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=c(I,null);e||M(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:n,mergedTheme:i,bodyClass:a,bodyStyle:o,bodyContentClass:s,bodyContentStyle:c,headerClass:l,headerStyle:d,footerClass:f,footerStyle:m,scrollbarProps:h,closable:g,$slots:_}=this;return r(),j(`div`,{role:`none`,class:x([`${t}-drawer-content`,n&&`${t}-drawer-content--native-scrollbar`])},[_.header||e||g?(r(),j(`div`,{key:0,class:x([`${t}-drawer-header`,l]),style:A(d),role:`none`},[N(`div`,{class:x(`${t}-drawer-header__main`),role:`heading`,"aria-level":`1`},[_.header===void 0?(r(),j(C,{key:1},[T(()=>e)],64)):(r(),j(C,{key:0},[T(()=>_.header())],64))],2),T(()=>g&&(r(),p(Y,{onClick:this.handleCloseClick,clsPrefix:t,class:x(`${t}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):T(()=>null),n?(r(),j(`div`,{key:2,class:x([`${t}-drawer-body`,a]),style:A(o),role:`none`},[N(`div`,{class:x([`${t}-drawer-body-content-wrapper`,s]),style:A(c),role:`none`},[T(()=>_.default?.())],6)],6)):(r(),p(U,u({key:3,themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},h,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,s],contentStyle:c}),O(_),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),_.footer?(r(),j(`div`,{key:4,class:x([`${t}-drawer-footer`,f]),style:A(m),role:`none`},[T(()=>_.footer())],6)):T(()=>null)],2)}});export{ge as n,_e as t};