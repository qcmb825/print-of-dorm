import{B as e,Bt as t,Dt as n,G as r,Gt as i,K as a,Ot as o,Y as s,_t as c,ct as l,ft as u,it as d,jt as f,ln as p,ot as m,q as h,tt as g,vt as _}from"./endpoints-ENJhMWK2.js";import{A as v,E as y,Gt as b,Jt as x,Kt as S,T as C,Yt as w,_t as T,an as E,ft as D,it as O,k,nn as A,ot as j,st as M,ut as N,v as ee}from"./createLucideIcon-BuHP6xwY.js";import{t as P}from"./use-merged-state-D47lIPkq.js";import{t as F}from"./format-length-BwSo_EUP.js";import{H as I,R as te,St as L,Z as R,at as z,bt as B,et as V,nt as H,ot as U,st as W,ut as G,w as K,x as q,xt as J,yt as Y}from"./index-C68jqRF6.js";var X=[`onMouseenter`,`onMouseleave`,`onMousedown`],Z={key:1,role:`none`},Q=g({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let i=t(!!e.show),a=t(null),s=m(L),c=0,l=``,d=null,f=t(!1),p=t(!1),h=r(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:g,mergedRtlRef:v}=D(e),y=ee(`Drawer`,v,g),b=j,x=e=>{p.value=!0,c=h.value?e.clientY:e.clientX,l=document.body.style.cursor,document.body.style.cursor=h.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{d!==null&&(window.clearTimeout(d),d=null),p.value?f.value=!0:d=window.setTimeout(()=>{f.value=!0},300)},C=()=>{d!==null&&(window.clearTimeout(d),d=null),f.value=!1},{doUpdateHeight:w,doUpdateWidth:T}=s,O=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},k=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function A(t){if(p.value){if(h.value){let n=a.value?.offsetHeight||0,r=c-t.clientY;n+=e.placement===`bottom`?r:-r,n=k(n),w(n),c=t.clientY}else{let n=a.value?.offsetWidth||0,r=c-t.clientX;n+=e.placement===`right`?r:-r,n=O(n),T(n),c=t.clientX}}}function j(){p.value&&(c=0,p.value=!1,document.body.style.cursor=l,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}o(()=>{e.show&&(i.value=!0)}),n(()=>e.show,e=>{e||j()}),u(()=>{j()});let M=r(()=>{let{show:t}=e,n=[[E,t]];return e.showMask||n.push([W,e.onClickoutside,void 0,{capture:!0}]),n});function N(){i.value=!1,e.onAfterLeave?.()}return I(r(()=>e.blockScroll&&i.value)),_(J,a),_(Y,null),_(B,null),{bodyRef:a,rtlEnabled:y,mergedClsPrefix:s.mergedClsPrefixRef,isMounted:s.isMountedRef,mergedTheme:s.mergedThemeRef,displayed:i,transitionName:r(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:C,isDragging:p,isHoverOnResizeTrigger:f}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?f((c(),s(`div`,Z,[(c(),h(H,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(c(),h(A,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>f(d(`div`,l(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(c(),s(`div`,{key:2,class:O([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,X)):null,this.nativeScrollbar?(c(),s(`div`,{key:3,class:O([`${t}-drawer-content-wrapper`,this.contentClass]),style:p(this.contentStyle),role:`none`},[M(()=>e.default?.())],6)):(c(),h(V,l({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),j(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[E,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=N;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),b(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=N;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),b(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=N;function $({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),b(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:ue,cubicBezierEaseOut:de}=N;function fe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[b(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ue}`}),b(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${de}`}),b(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),b(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),b(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),b(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var pe=b([S(`drawer`,`
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
 `,[$(),se(),fe(),ie(),w(`unselectable`,`
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
 `),G({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...k.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=g({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:n,namespaceRef:a,inlineThemeDisabled:o}=D(e),s=y(),c=k(`Drawer`,`-drawer`,pe,q,e,n),l=t(e.defaultWidth),u=t(e.defaultHeight),d=P(i(e,`width`),l),f=P(i(e,`height`),u),p=r(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:F(d.value)}),m=r(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:F(f.value)}),h=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&C(n,t),r&&C(r,t),l.value=t},g=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&C(n,t),r&&C(r,t),u.value=t},b=r(()=>[{width:p.value,height:m.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&E(!1),n&&n(t)}function S(e){x(e)}let w=K();function T(t){e.onEsc?.(),e.show&&e.closeOnEsc&&te(t)&&(w.value||E(!1))}function E(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&C(r,t),i&&C(i,t),n&&!t&&C(n,t)}_(L,{isMountedRef:s,mergedThemeRef:c,mergedClsPrefixRef:n,doUpdateShow:E,doUpdateHeight:g,doUpdateWidth:h});let O=r(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=c.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),A=o?v(`drawer`,void 0,O,e):void 0;return{mergedClsPrefix:n,namespace:a,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:T,mergedTheme:c,cssVars:o?void 0:O,themeClass:A?.themeClass,onRender:A?.onRender,isMounted:s}},render(){let{mergedClsPrefix:e}=this;return c(),h(z,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),f((c(),s(`div`,{class:O([`${e}-drawer-container`,this.namespace,this.themeClass]),style:p(this.cssVars),role:`none`},[this.showMask?(c(),h(A,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(c(),s(`div`,{key:1,"aria-hidden":!0,class:O([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):M(()=>null),(c(),h(Q,l(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),j(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[U,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=g({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=m(L,null);e||T(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:t,mergedClsPrefix:n,nativeScrollbar:r,mergedTheme:i,bodyClass:o,bodyStyle:u,bodyContentClass:d,bodyContentStyle:f,headerClass:m,headerStyle:g,footerClass:_,footerStyle:v,scrollbarProps:y,closable:b,$slots:x}=this;return c(),s(`div`,{role:`none`,class:O([`${n}-drawer-content`,r&&`${n}-drawer-content--native-scrollbar`])},[x.header||t||b?(c(),s(`div`,{key:0,class:O([`${n}-drawer-header`,m]),style:p(g),role:`none`},[a(`div`,{class:O(`${n}-drawer-header__main`),role:`heading`,"aria-level":`1`},[x.header===void 0?(c(),s(e,{key:1},[M(()=>t)],64)):(c(),s(e,{key:0},[M(()=>x.header())],64))],2),M(()=>b&&(c(),h(R,{onClick:this.handleCloseClick,clsPrefix:n,class:O(`${n}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):M(()=>null),r?(c(),s(`div`,{key:2,class:O([`${n}-drawer-body`,o]),style:p(u),role:`none`},[a(`div`,{class:O([`${n}-drawer-body-content-wrapper`,d]),style:p(f),role:`none`},[M(()=>x.default?.())],6)],6)):(c(),h(V,l({key:3,themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},y,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,d],contentStyle:f}),j(x),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),x.footer?(c(),s(`div`,{key:4,class:O([`${n}-drawer-footer`,_]),style:p(v),role:`none`},[M(()=>x.footer())],6)):M(()=>null)],2)}});export{ge as n,_e as t};