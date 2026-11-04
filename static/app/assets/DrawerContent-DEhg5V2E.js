import{At as e,H as t,Ht as n,J as r,Nt as i,Y as a,Z as o,bt as s,ct as c,dn as l,kt as u,mt as d,ot as f,q as p,qt as m,rt as h,ut as g,yt as _}from"./endpoints-b5Af9CM_.js";import{$t as v,F as y,I as b,L as x,M as S,P as C,St as w,Xt as T,Zt as E,_t as D,dt as O,en as k,ft as A,ht as j,j as M,lt as N,sn as P,un as F,w as I}from"./motion-B_h_1Mmt.js";import{t as L}from"./use-merged-state-CDvziyPh.js";import{t as R}from"./format-length-BwSo_EUP.js";import{A as z,E as ee,F as te,J as B,N as V,O as H,P as U,Q as W,R as G,X as K,Y as q,g as J,m as Y,q as X,v as Z}from"./index-BPOSqwbL.js";function Q(e){let{modalColor:t,textColor1:n,textColor2:r,boxShadow3:i,lineHeight:a,fontWeightStrong:o,dividerColor:s,closeColorHover:c,closeColorPressed:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,borderRadius:p,primaryColorHover:m}=e;return{bodyPadding:`16px 24px`,borderRadius:p,headerPadding:`16px 24px`,footerPadding:`16px 24px`,color:t,textColor:r,titleTextColor:n,titleFontSize:`18px`,titleFontWeight:o,boxShadow:i,lineHeight:a,headerBorderBottom:`1px solid ${s}`,footerBorderTop:`1px solid ${s}`,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeSize:`22px`,closeIconSize:`18px`,closeColorHover:c,closeColorPressed:l,closeBorderRadius:p,resizableTriggerColorHover:m}}var ne=C({name:`Drawer`,common:x,peers:{Scrollbar:W},self:Q}),re=[`onMouseenter`,`onMouseleave`,`onMousedown`],ie={key:1,role:`none`},ae=h({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let r=n(!!t.show),i=n(null),a=c(K),o=0,l=``,f=null,m=n(!1),h=n(!1),g=p(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:_,mergedRtlRef:v}=D(t),y=I(`Drawer`,v,_),b=A,x=e=>{h.value=!0,o=g.value?e.clientY:e.clientX,l=document.body.style.cursor,document.body.style.cursor=g.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,k),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,A)},S=()=>{f!==null&&(window.clearTimeout(f),f=null),h.value?m.value=!0:f=window.setTimeout(()=>{m.value=!0},300)},C=()=>{f!==null&&(window.clearTimeout(f),f=null),m.value=!1},{doUpdateHeight:w,doUpdateWidth:T}=a,E=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},O=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function k(e){if(h.value){if(g.value){let n=i.value?.offsetHeight||0,r=o-e.clientY;n+=t.placement===`bottom`?r:-r,n=O(n),w(n),o=e.clientY}else{let n=i.value?.offsetWidth||0,r=o-e.clientX;n+=t.placement===`right`?r:-r,n=E(n),T(n),o=e.clientX}}}function A(){h.value&&(o=0,h.value=!1,document.body.style.cursor=l,document.body.removeEventListener(`mousemove`,k),document.body.removeEventListener(`mouseup`,A),document.body.removeEventListener(`mouseleave`,b))}e(()=>{t.show&&(r.value=!0)}),u(()=>t.show,e=>{e||A()}),d(()=>{A()});let j=p(()=>{let{show:e}=t,n=[[F,e]];return t.showMask||n.push([te,t.onClickoutside,void 0,{capture:!0}]),n});function M(){r.value=!1,t.onAfterLeave?.()}return Z(p(()=>t.blockScroll&&r.value)),s(q,i),s(X,null),s(B,null),{bodyRef:i,rtlEnabled:y,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:r,transitionName:p(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:M,bodyDirectives:j,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:C,isDragging:h,isHoverOnResizeTrigger:m}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?i((_(),o(`div`,ie,[(_(),a(z,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(_(),a(P,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>i(f(`div`,g(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(_(),o(`div`,{key:2,class:N([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,re)):null,this.nativeScrollbar?(_(),o(`div`,{key:3,class:N([`${t}-drawer-content-wrapper`,this.contentClass]),style:l(this.contentStyle),role:`none`},[A(()=>e.default?.())],6)):(_(),a(H,g({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),O(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[F,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:oe,cubicBezierEaseOut:se}=j;function ce({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[T(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${oe}`}),T(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${se}`}),T(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),T(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),T(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),T(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:le,cubicBezierEaseOut:ue}=j;function de({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[T(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${le}`}),T(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ue}`}),T(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),T(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),T(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),T(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:fe,cubicBezierEaseOut:pe}=j;function $({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[T(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${fe}`}),T(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${pe}`}),T(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),T(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),T(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),T(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:me,cubicBezierEaseOut:he}=j;function ge({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[T(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${me}`}),T(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${he}`}),T(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),T(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),T(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),T(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var _e=T([E(`drawer`,`
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
 `,[$(),de(),ge(),ce(),k(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),k(`native-scrollbar`,[E(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),v(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[k(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),E(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),E(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[k(`native-scrollbar`,[E(`drawer-body-content-wrapper`,`
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
 `,[v(`main`,`
 flex: 1;
 `),v(`close`,`
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
 `)]),k(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[v(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),k(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[v(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),k(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[v(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),k(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[v(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),T(`body`,[T(`>`,[E(`drawer-container`,`
 position: fixed;
 `)])]),E(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[T(`> *`,`
 pointer-events: all;
 `)]),E(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[k(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),G({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),ve=[`onClick`],ye={...y.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},be=h({name:`Drawer`,inheritAttrs:!1,props:ye,setup(e){let{mergedClsPrefixRef:t,namespaceRef:r,inlineThemeDisabled:i}=D(e),a=S(),o=y(`Drawer`,`-drawer`,_e,ne,e,t),c=n(e.defaultWidth),l=n(e.defaultHeight),u=L(m(e,`width`),c),d=L(m(e,`height`),l),f=p(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(u.value)}),h=p(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(d.value)}),g=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&M(n,t),r&&M(r,t),c.value=t},_=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&M(n,t),r&&M(r,t),l.value=t},v=p(()=>[{width:f.value,height:h.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&E(!1),n&&n(t)}function C(e){x(e)}let w=Y();function T(t){e.onEsc?.(),e.show&&e.closeOnEsc&&J(t)&&(w.value||E(!1))}function E(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&M(r,t),i&&M(i,t),n&&!t&&M(n,t)}s(K,{isMountedRef:a,mergedThemeRef:o,mergedClsPrefixRef:t,doUpdateShow:E,doUpdateHeight:_,doUpdateWidth:g});let O=p(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:s,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=o.value;return{"--n-line-height":s,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),k=i?b(`drawer`,void 0,O,e):void 0;return{mergedClsPrefix:t,namespace:r,mergedBodyStyle:v,handleOutsideClick:C,handleMaskClick:x,handleEsc:T,mergedTheme:o,cssVars:i?void 0:O,themeClass:k?.themeClass,onRender:k?.onRender,isMounted:a}},render(){let{mergedClsPrefix:e}=this;return _(),a(V,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),i((_(),o(`div`,{class:N([`${e}-drawer-container`,this.namespace,this.themeClass]),style:l(this.cssVars),role:`none`},[this.showMask?(_(),a(P,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(_(),o(`div`,{key:1,"aria-hidden":!0,class:N([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,ve)):null},1032,[`appear`])):A(()=>null),(_(),a(ae,g(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),O(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[U,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),xe=h({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=c(K,null);e||w(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:n,nativeScrollbar:i,mergedTheme:s,bodyClass:c,bodyStyle:u,bodyContentClass:d,bodyContentStyle:f,headerClass:p,headerStyle:m,footerClass:h,footerStyle:v,scrollbarProps:y,closable:b,$slots:x}=this;return _(),o(`div`,{role:`none`,class:N([`${n}-drawer-content`,i&&`${n}-drawer-content--native-scrollbar`])},[x.header||e||b?(_(),o(`div`,{key:0,class:N([`${n}-drawer-header`,p]),style:l(m),role:`none`},[r(`div`,{class:N(`${n}-drawer-header__main`),role:`heading`,"aria-level":`1`},[x.header===void 0?(_(),o(t,{key:1},[A(()=>e)],64)):(_(),o(t,{key:0},[A(()=>x.header())],64))],2),A(()=>b&&(_(),a(ee,{onClick:this.handleCloseClick,clsPrefix:n,class:N(`${n}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):A(()=>null),i?(_(),o(`div`,{key:2,class:N([`${n}-drawer-body`,c]),style:l(u),role:`none`},[r(`div`,{class:N([`${n}-drawer-body-content-wrapper`,d]),style:l(f),role:`none`},[A(()=>x.default?.())],6)],6)):(_(),a(H,g({key:3,themeOverrides:s.peerOverrides.Scrollbar,theme:s.peers.Scrollbar},y,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,d],contentStyle:f}),O(x),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),x.footer?(_(),o(`div`,{key:4,class:N([`${n}-drawer-footer`,h]),style:l(v),role:`none`},[A(()=>x.footer())],6)):A(()=>null)],2)}});export{be as n,xe as t};