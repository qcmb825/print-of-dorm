import{$ as e,A as t,D as n,Dt as r,E as i,Gt as a,I as o,O as s,St as c,U as l,V as u,et as d,lt as f,pt as p,q as m,ut as h,x as g,z as _}from"./useApi-BPuI6ZR9-BM-pFei4.js";import{$ as v,A as y,D as b,Ht as x,O as S,Qt as C,Rt as w,T,Vt as E,Yt as D,Z as O,_ as ee,at as k,et as A,k as j,rt as M,ut as N,w as P,zt as F}from"./createLucideIcon-ClRkaCjD.js";import{i as I}from"./Follower-6q31WUgd.js";import{t as L}from"./use-merged-state-BtZAqeDl.js";import{E as R,H as te,I as z,K as B,P as V,R as H,S as U,U as W,V as G,it as K,nt as q,ot as J,rt as Y,tt as X,w as Z}from"./index-DqjpbDj4.js";function Q(e){let{modalColor:t,textColor1:n,textColor2:r,boxShadow3:i,lineHeight:a,fontWeightStrong:o,dividerColor:s,closeColorHover:c,closeColorPressed:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,borderRadius:p,primaryColorHover:m}=e;return{bodyPadding:`16px 24px`,borderRadius:p,headerPadding:`16px 24px`,footerPadding:`16px 24px`,color:t,textColor:r,titleTextColor:n,titleFontSize:`18px`,titleFontWeight:o,boxShadow:i,lineHeight:a,headerBorderBottom:`1px solid ${s}`,footerBorderTop:`1px solid ${s}`,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeSize:`22px`,closeIconSize:`18px`,closeColorHover:c,closeColorPressed:l,closeBorderRadius:p,resizableTriggerColorHover:m}}var ne=b({name:`Drawer`,common:y,peers:{Scrollbar:J},self:Q}),re=[`onMouseenter`,`onMouseleave`,`onMousedown`],ie={key:1,role:`none`},ae=o({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=c(!!e.show),n=c(null),r=u(K),a=0,o=``,s=null,l=c(!1),p=c(!1),g=i(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:_,mergedRtlRef:v}=k(e),y=ee(`Drawer`,v,_),b=j,x=e=>{p.value=!0,a=g.value?e.clientY:e.clientX,o=document.body.style.cursor,document.body.style.cursor=g.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{s!==null&&(window.clearTimeout(s),s=null),p.value?l.value=!0:s=window.setTimeout(()=>{l.value=!0},300)},w=()=>{s!==null&&(window.clearTimeout(s),s=null),l.value=!1},{doUpdateHeight:T,doUpdateWidth:E}=r,D=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},O=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function A(t){if(p.value){if(g.value){let r=n.value?.offsetHeight||0,i=a-t.clientY;r+=e.placement===`bottom`?i:-i,r=O(r),T(r),a=t.clientY}else{let r=n.value?.offsetWidth||0,i=a-t.clientX;r+=e.placement===`right`?i:-i,r=D(r),E(r),a=t.clientX}}}function j(){p.value&&(a=0,p.value=!1,document.body.style.cursor=o,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}h(()=>{e.show&&(t.value=!0)}),f(()=>e.show,e=>{e||j()}),m(()=>{j()});let M=i(()=>{let{show:t}=e,n=[[C,t]];return e.showMask||n.push([W,e.onClickoutside,void 0,{capture:!0}]),n});function N(){t.value=!1,e.onAfterLeave?.()}return R(i(()=>e.blockScroll&&t.value)),d(Y,n),d(X,null),d(q,null),{bodyRef:n,rtlEnabled:y,mergedClsPrefix:r.mergedClsPrefixRef,isMounted:r.isMountedRef,mergedTheme:r.mergedThemeRef,displayed:t,transitionName:i(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:w,isDragging:p,isHoverOnResizeTrigger:l}},render(){let{$slots:n,mergedClsPrefix:r}=this;return this.displayDirective===`show`||this.displayed||this.show?p((e(),t(`div`,ie,[(e(),s(H,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(e(),s(D,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>p(_(`div`,l(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${r}-drawer`,this.rtlEnabled&&`${r}-drawer--rtl`,`${r}-drawer--${this.placement}-placement`,this.isDragging&&`${r}-drawer--unselectable`,this.nativeScrollbar&&`${r}-drawer--native-scrollbar`]}),[this.resizable?(e(),t(`div`,{key:2,class:O([`${r}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${r}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,re)):null,this.nativeScrollbar?(e(),t(`div`,{key:3,class:O([`${r}-drawer-content-wrapper`,this.contentClass]),style:a(this.contentStyle),role:`none`},[A(()=>n.default?.())],6)):(e(),s(z,l({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${r}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),v(n),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[C,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:oe,cubicBezierEaseOut:se}=M;function ce({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[w(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${oe}`}),w(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${se}`}),w(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),w(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),w(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),w(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:le,cubicBezierEaseOut:ue}=M;function de({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[w(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${le}`}),w(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ue}`}),w(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),w(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),w(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),w(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:fe,cubicBezierEaseOut:pe}=M;function $({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[w(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${fe}`}),w(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${pe}`}),w(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),w(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),w(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),w(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:me,cubicBezierEaseOut:he}=M;function ge({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[w(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${me}`}),w(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${he}`}),w(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),w(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),w(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),w(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var _e=w([F(`drawer`,`
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
 `,[$(),de(),ge(),ce(),x(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),x(`native-scrollbar`,[F(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),E(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[x(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),F(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),F(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[x(`native-scrollbar`,[F(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),F(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),F(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),F(`drawer-header`,`
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
 `,[E(`main`,`
 flex: 1;
 `),E(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),F(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),x(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[E(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),x(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[E(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),x(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[E(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),x(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[E(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),w(`body`,[w(`>`,[F(`drawer-container`,`
 position: fixed;
 `)])]),F(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[w(`> *`,`
 pointer-events: all;
 `)]),F(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[x(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),B({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),ve=[`onClick`],ye={...S.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},be=o({name:`Drawer`,inheritAttrs:!1,props:ye,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:a}=k(e),o=T(),s=S(`Drawer`,`-drawer`,_e,ne,e,t),l=c(e.defaultWidth),u=c(e.defaultHeight),f=L(r(e,`width`),l),p=L(r(e,`height`),u),m=i(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:I(f.value)}),h=i(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:I(p.value)}),g=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&P(n,t),r&&P(r,t),l.value=t},_=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&P(n,t),r&&P(r,t),u.value=t},v=i(()=>[{width:m.value,height:h.value},e.drawerStyle||``]);function y(t){let{onMaskClick:n,maskClosable:r}=e;r&&w(!1),n&&n(t)}function b(e){y(e)}let x=U();function C(t){e.onEsc?.(),e.show&&e.closeOnEsc&&Z(t)&&(x.value||w(!1))}function w(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&P(r,t),i&&P(i,t),n&&!t&&P(n,t)}d(K,{isMountedRef:o,mergedThemeRef:s,mergedClsPrefixRef:t,doUpdateShow:w,doUpdateHeight:_,doUpdateWidth:g});let E=i(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=s.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),D=a?j(`drawer`,void 0,E,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:v,handleOutsideClick:b,handleMaskClick:y,handleEsc:C,mergedTheme:s,cssVars:a?void 0:E,themeClass:D?.themeClass,onRender:D?.onRender,isMounted:o}},render(){let{mergedClsPrefix:n}=this;return e(),s(G,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),p((e(),t(`div`,{class:O([`${n}-drawer-container`,this.namespace,this.themeClass]),style:a(this.cssVars),role:`none`},[this.showMask?(e(),s(D,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(e(),t(`div`,{key:1,"aria-hidden":!0,class:O([`${n}-drawer-mask`,this.showMask===`transparent`&&`${n}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,ve)):null},1032,[`appear`])):A(()=>null),(e(),s(ae,l(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),v(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[te,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),xe=o({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=u(K,null);e||N(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:r,mergedClsPrefix:i,nativeScrollbar:o,mergedTheme:c,bodyClass:u,bodyStyle:d,bodyContentClass:f,bodyContentStyle:p,headerClass:m,headerStyle:h,footerClass:_,footerStyle:y,scrollbarProps:b,closable:x,$slots:S}=this;return e(),t(`div`,{role:`none`,class:O([`${i}-drawer-content`,o&&`${i}-drawer-content--native-scrollbar`])},[S.header||r||x?(e(),t(`div`,{key:0,class:O([`${i}-drawer-header`,m]),style:a(h),role:`none`},[n(`div`,{class:O(`${i}-drawer-header__main`),role:`heading`,"aria-level":`1`},[S.header===void 0?(e(),t(g,{key:1},[A(()=>r)],64)):(e(),t(g,{key:0},[A(()=>S.header())],64))],2),A(()=>x&&(e(),s(V,{onClick:this.handleCloseClick,clsPrefix:i,class:O(`${i}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):A(()=>null),o?(e(),t(`div`,{key:2,class:O([`${i}-drawer-body`,u]),style:a(d),role:`none`},[n(`div`,{class:O([`${i}-drawer-body-content-wrapper`,f]),style:a(p),role:`none`},[A(()=>S.default?.())],6)],6)):(e(),s(z,l({key:3,themeOverrides:c.peerOverrides.Scrollbar,theme:c.peers.Scrollbar},b,{class:`${i}-drawer-body`,contentClass:[`${i}-drawer-body-content-wrapper`,f],contentStyle:p}),v(S),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),S.footer?(e(),t(`div`,{key:4,class:O([`${i}-drawer-footer`,_]),style:a(y),role:`none`},[A(()=>S.footer())],6)):A(()=>null)],2)}});export{be as n,xe as t};