import{$ as e,A as t,D as n,E as r,Et as i,I as a,O as o,Q as s,U as c,V as l,Wt as u,ct as d,ft as f,lt as p,q as m,x as h,xt as g,z as _}from"./useApi-BPuI6ZR9-B4cwgxoE.js";import{$ as v,A as y,D as b,Ht as x,O as S,Qt as C,Rt as w,T,Vt as E,Yt as D,Z as O,_ as ee,at as k,et as A,k as j,rt as M,ut as N,w as P,zt as F}from"./createLucideIcon-DOmk2xkk.js";import{i as I}from"./Follower-BEcdX2ja.js";import{t as L}from"./use-merged-state-BolkIoXB.js";import{$ as R,B as z,I as te,M as B,P as V,S as H,V as U,W,b as G,et as K,it as q,nt as J,tt as Y,w as X,z as Z}from"./index-C2sVz0d2.js";function Q(e){let{modalColor:t,textColor1:n,textColor2:r,boxShadow3:i,lineHeight:a,fontWeightStrong:o,dividerColor:s,closeColorHover:c,closeColorPressed:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,borderRadius:p,primaryColorHover:m}=e;return{bodyPadding:`16px 24px`,borderRadius:p,headerPadding:`16px 24px`,footerPadding:`16px 24px`,color:t,textColor:r,titleTextColor:n,titleFontSize:`18px`,titleFontWeight:o,boxShadow:i,lineHeight:a,headerBorderBottom:`1px solid ${s}`,footerBorderTop:`1px solid ${s}`,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeSize:`22px`,closeIconSize:`18px`,closeColorHover:c,closeColorPressed:l,closeBorderRadius:p,resizableTriggerColorHover:m}}var ne=b({name:`Drawer`,common:y,peers:{Scrollbar:q},self:Q}),$=[`onMouseenter`,`onMouseleave`,`onMousedown`],re={key:1,role:`none`},ie=a({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let n=g(!!t.show),i=g(null),a=l(J),o=0,s=``,c=null,u=g(!1),f=g(!1),h=r(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:_,mergedRtlRef:v}=k(t),y=ee(`Drawer`,v,_),b=j,x=e=>{f.value=!0,o=h.value?e.clientY:e.clientX,s=document.body.style.cursor,document.body.style.cursor=h.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{c!==null&&(window.clearTimeout(c),c=null),f.value?u.value=!0:c=window.setTimeout(()=>{u.value=!0},300)},w=()=>{c!==null&&(window.clearTimeout(c),c=null),u.value=!1},{doUpdateHeight:T,doUpdateWidth:E}=a,D=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},O=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function A(e){if(f.value){if(h.value){let n=i.value?.offsetHeight||0,r=o-e.clientY;n+=t.placement===`bottom`?r:-r,n=O(n),T(n),o=e.clientY}else{let n=i.value?.offsetWidth||0,r=o-e.clientX;n+=t.placement===`right`?r:-r,n=D(n),E(n),o=e.clientX}}}function j(){f.value&&(o=0,f.value=!1,document.body.style.cursor=s,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}p(()=>{t.show&&(n.value=!0)}),d(()=>t.show,e=>{e||j()}),m(()=>{j()});let M=r(()=>{let{show:e}=t,n=[[C,e]];return t.showMask||n.push([U,t.onClickoutside,void 0,{capture:!0}]),n});function N(){n.value=!1,t.onAfterLeave?.()}return X(r(()=>t.blockScroll&&n.value)),e(Y,i),e(R,null),e(K,null),{bodyRef:i,rtlEnabled:y,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:n,transitionName:r(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:N,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:w,isDragging:f,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:n}=this;return this.displayDirective===`show`||this.displayed||this.show?f((s(),t(`div`,re,[(s(),o(te,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(s(),o(D,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>f(_(`div`,c(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${n}-drawer`,this.rtlEnabled&&`${n}-drawer--rtl`,`${n}-drawer--${this.placement}-placement`,this.isDragging&&`${n}-drawer--unselectable`,this.nativeScrollbar&&`${n}-drawer--native-scrollbar`]}),[this.resizable?(s(),t(`div`,{key:2,class:O([`${n}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${n}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,$)):null,this.nativeScrollbar?(s(),t(`div`,{key:3,class:O([`${n}-drawer-content-wrapper`,this.contentClass]),style:u(this.contentStyle),role:`none`},[A(()=>e.default?.())],6)):(s(),o(V,c({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${n}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),v(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[C,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=M;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[w(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),w(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),w(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),w(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),w(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),w(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=M;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[w(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),w(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),w(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),w(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),w(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),w(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=M;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[w(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),w(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),w(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),w(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),w(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),w(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:me,cubicBezierEaseOut:he}=M;function ge({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[w(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${me}`}),w(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${he}`}),w(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),w(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),w(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),w(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var _e=w([F(`drawer`,`
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
 `,[pe(),ue(),ge(),se(),x(`unselectable`,`
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
 `),W({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),ve=[`onClick`],ye={...S.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},be=a({name:`Drawer`,inheritAttrs:!1,props:ye,setup(t){let{mergedClsPrefixRef:n,namespaceRef:a,inlineThemeDisabled:o}=k(t),s=T(),c=S(`Drawer`,`-drawer`,_e,ne,t,n),l=g(t.defaultWidth),u=g(t.defaultHeight),d=L(i(t,`width`),l),f=L(i(t,`height`),u),p=r(()=>{let{placement:e}=t;return e===`top`||e===`bottom`?``:I(d.value)}),m=r(()=>{let{placement:e}=t;return e===`left`||e===`right`?``:I(f.value)}),h=e=>{let{onUpdateWidth:n,"onUpdate:width":r}=t;n&&P(n,e),r&&P(r,e),l.value=e},_=e=>{let{onUpdateHeight:n,"onUpdate:width":r}=t;n&&P(n,e),r&&P(r,e),u.value=e},v=r(()=>[{width:p.value,height:m.value},t.drawerStyle||``]);function y(e){let{onMaskClick:n,maskClosable:r}=t;r&&w(!1),n&&n(e)}function b(e){y(e)}let x=G();function C(e){t.onEsc?.(),t.show&&t.closeOnEsc&&H(e)&&(x.value||w(!1))}function w(e){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=t;r&&P(r,e),i&&P(i,e),n&&!e&&P(n,e)}e(J,{isMountedRef:s,mergedThemeRef:c,mergedClsPrefixRef:n,doUpdateShow:w,doUpdateHeight:_,doUpdateWidth:h});let E=r(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=c.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),D=o?j(`drawer`,void 0,E,t):void 0;return{mergedClsPrefix:n,namespace:a,mergedBodyStyle:v,handleOutsideClick:b,handleMaskClick:y,handleEsc:C,mergedTheme:c,cssVars:o?void 0:E,themeClass:D?.themeClass,onRender:D?.onRender,isMounted:s}},render(){let{mergedClsPrefix:e}=this;return s(),o(Z,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),f((s(),t(`div`,{class:O([`${e}-drawer-container`,this.namespace,this.themeClass]),style:u(this.cssVars),role:`none`},[this.showMask?(s(),o(D,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(s(),t(`div`,{key:1,"aria-hidden":!0,class:O([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,ve)):null},1032,[`appear`])):A(()=>null),(s(),o(ie,c(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),v(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[z,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),xe=a({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=l(J,null);e||N(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:r,nativeScrollbar:i,mergedTheme:a,bodyClass:l,bodyStyle:d,bodyContentClass:f,bodyContentStyle:p,headerClass:m,headerStyle:g,footerClass:_,footerStyle:y,scrollbarProps:b,closable:x,$slots:S}=this;return s(),t(`div`,{role:`none`,class:O([`${r}-drawer-content`,i&&`${r}-drawer-content--native-scrollbar`])},[S.header||e||x?(s(),t(`div`,{key:0,class:O([`${r}-drawer-header`,m]),style:u(g),role:`none`},[n(`div`,{class:O(`${r}-drawer-header__main`),role:`heading`,"aria-level":`1`},[S.header===void 0?(s(),t(h,{key:1},[A(()=>e)],64)):(s(),t(h,{key:0},[A(()=>S.header())],64))],2),A(()=>x&&(s(),o(B,{onClick:this.handleCloseClick,clsPrefix:r,class:O(`${r}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):A(()=>null),i?(s(),t(`div`,{key:2,class:O([`${r}-drawer-body`,l]),style:u(d),role:`none`},[n(`div`,{class:O([`${r}-drawer-body-content-wrapper`,f]),style:u(p),role:`none`},[A(()=>S.default?.())],6)],6)):(s(),o(V,c({key:3,themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},b,{class:`${r}-drawer-body`,contentClass:[`${r}-drawer-body-content-wrapper`,f],contentStyle:p}),v(S),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),S.footer?(s(),t(`div`,{key:4,class:O([`${r}-drawer-footer`,_]),style:u(y),role:`none`},[A(()=>S.footer())],6)):A(()=>null)],2)}});export{be as n,xe as t};