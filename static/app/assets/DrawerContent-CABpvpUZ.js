import{B as e,C as t,Ct as n,D as r,I as i,N as a,R as o,T as s,Vt as c,W as l,X as u,Y as d,at as f,lt as p,ot as m,v as h,vt as g,w as _}from"./endpoints-Dbyqu7A9.js";import{A as v,Jt as y,T as b,Xt as x,Zt as S,_ as C,ct as w,ft as T,in as E,k as D,lt as O,mt as k,ot as A,qt as j,sn as M,w as N,yt as P}from"./Button-BxGCouy9.js";import{a as F,t as I}from"./Scrollbar-C8Z2j7v0.js";import{t as L}from"./use-merged-state-Dr6T6PXv.js";import{t as R}from"./format-length-BwSo_EUP.js";import{$ as ee,P as z,Q as B,R as V,X as H,Z as U,_ as W,b as G,ct as K,lt as q,q as J,st as Y,ut as X}from"./index--aUAD0wK.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=a({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let n=g(!!e.show),r=g(null),i=o(X),a=0,s=``,c=null,d=g(!1),p=g(!1),h=t(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:_,mergedRtlRef:v}=k(e),y=C(`Drawer`,v,_),b=j,x=e=>{p.value=!0,a=h.value?e.clientY:e.clientX,s=document.body.style.cursor,document.body.style.cursor=h.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{c!==null&&(window.clearTimeout(c),c=null),p.value?d.value=!0:c=window.setTimeout(()=>{d.value=!0},300)},w=()=>{c!==null&&(window.clearTimeout(c),c=null),d.value=!1},{doUpdateHeight:T,doUpdateWidth:E}=i,D=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},O=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function A(t){if(p.value){if(h.value){let n=r.value?.offsetHeight||0,i=a-t.clientY;n+=e.placement===`bottom`?i:-i,n=O(n),T(n),a=t.clientY}else{let n=r.value?.offsetWidth||0,i=a-t.clientX;n+=e.placement===`right`?i:-i,n=D(n),E(n),a=t.clientX}}}function j(){p.value&&(a=0,p.value=!1,document.body.style.cursor=s,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}m(()=>{e.show&&(n.value=!0)}),f(()=>e.show,e=>{e||j()}),l(()=>{j()});let N=t(()=>{let{show:t}=e,n=[[M,t]];return e.showMask||n.push([ee,e.onClickoutside,void 0,{capture:!0}]),n});function P(){n.value=!1,e.onAfterLeave?.()}return V(t(()=>e.blockScroll&&n.value)),u(q,r),u(Y,null),u(K,null),{bodyRef:r,rtlEnabled:y,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:n,transitionName:t(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:P,bodyDirectives:N,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:w,isDragging:p,isHoverOnResizeTrigger:d}},render(){let{$slots:t,mergedClsPrefix:n}=this;return this.displayDirective===`show`||this.displayed||this.show?p((d(),r(`div`,Q,[(d(),s(H,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(d(),s(E,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>p(i(`div`,e(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${n}-drawer`,this.rtlEnabled&&`${n}-drawer--rtl`,`${n}-drawer--${this.placement}-placement`,this.isDragging&&`${n}-drawer--unselectable`,this.nativeScrollbar&&`${n}-drawer--native-scrollbar`]}),[this.resizable?(d(),r(`div`,{key:2,class:A([`${n}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${n}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(d(),r(`div`,{key:3,class:A([`${n}-drawer-content-wrapper`,this.contentClass]),style:c(this.contentStyle),role:`none`},[O(()=>t.default?.())],6)):(d(),s(I,e({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${n}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),w(t),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[M,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=T;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[j(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),j(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),j(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),j(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),j(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),j(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=T;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[j(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),j(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),j(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),j(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),j(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),j(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=T;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[j(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),j(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),j(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),j(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),j(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),j(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=T;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[j(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),j(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),j(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),j(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),j(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),j(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=j([y(`drawer`,`
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
 `),F({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...D.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=a({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:r,namespaceRef:i,inlineThemeDisabled:a}=k(e),o=b(),s=D(`Drawer`,`-drawer`,$,W,e,r),c=g(e.defaultWidth),l=g(e.defaultHeight),d=L(n(e,`width`),c),f=L(n(e,`height`),l),p=t(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(d.value)}),m=t(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(f.value)}),h=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&N(n,t),r&&N(r,t),c.value=t},_=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&N(n,t),r&&N(r,t),l.value=t},y=t(()=>[{width:p.value,height:m.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&T(!1),n&&n(t)}function S(e){x(e)}let C=G();function w(t){e.onEsc?.(),e.show&&e.closeOnEsc&&z(t)&&(C.value||T(!1))}function T(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&N(r,t),i&&N(i,t),n&&!t&&N(n,t)}u(X,{isMountedRef:o,mergedThemeRef:s,mergedClsPrefixRef:r,doUpdateShow:T,doUpdateHeight:_,doUpdateWidth:h});let E=t(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=s.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),O=a?v(`drawer`,void 0,E,e):void 0;return{mergedClsPrefix:r,namespace:i,mergedBodyStyle:y,handleOutsideClick:S,handleMaskClick:x,handleEsc:w,mergedTheme:s,cssVars:a?void 0:E,themeClass:O?.themeClass,onRender:O?.onRender,isMounted:o}},render(){let{mergedClsPrefix:t}=this;return d(),s(U,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),p((d(),r(`div`,{class:A([`${t}-drawer-container`,this.namespace,this.themeClass]),style:c(this.cssVars),role:`none`},[this.showMask?(d(),s(E,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(d(),r(`div`,{key:1,"aria-hidden":!0,class:A([`${t}-drawer-mask`,this.showMask===`transparent`&&`${t}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):O(()=>null),(d(),s(te,e(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),w(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[B,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=a({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=o(X,null);e||P(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:t,mergedClsPrefix:n,nativeScrollbar:i,mergedTheme:a,bodyClass:o,bodyStyle:l,bodyContentClass:u,bodyContentStyle:f,headerClass:p,headerStyle:m,footerClass:g,footerStyle:v,scrollbarProps:y,closable:b,$slots:x}=this;return d(),r(`div`,{role:`none`,class:A([`${n}-drawer-content`,i&&`${n}-drawer-content--native-scrollbar`])},[x.header||t||b?(d(),r(`div`,{key:0,class:A([`${n}-drawer-header`,p]),style:c(m),role:`none`},[_(`div`,{class:A(`${n}-drawer-header__main`),role:`heading`,"aria-level":`1`},[x.header===void 0?(d(),r(h,{key:1},[O(()=>t)],64)):(d(),r(h,{key:0},[O(()=>x.header())],64))],2),O(()=>b&&(d(),s(J,{onClick:this.handleCloseClick,clsPrefix:n,class:A(`${n}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):O(()=>null),i?(d(),r(`div`,{key:2,class:A([`${n}-drawer-body`,o]),style:c(l),role:`none`},[_(`div`,{class:A([`${n}-drawer-body-content-wrapper`,u]),style:c(f),role:`none`},[O(()=>x.default?.())],6)],6)):(d(),s(I,e({key:3,themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},y,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,u],contentStyle:f}),w(x),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),x.footer?(d(),r(`div`,{key:4,class:A([`${n}-drawer-footer`,g]),style:c(v),role:`none`},[O(()=>x.footer())],6)):O(()=>null)],2)}});export{ge as n,_e as t};