import{A as e,Bn as t,Cn as n,Dn as r,Et as i,Fn as a,H as o,L as s,Ln as c,On as l,R as u,Tr as d,V as f,Wn as p,Xn as m,Yn as h,an as g,br as _,bt as v,cn as y,gn as b,hr as x,jn as S,jt as C,kn as w,ln as T,nr as E,on as D,or as O,rr as k,vt as A,wt as j,xt as M,yn as N,zn as P}from"./endpoints-DguQVVk7.js";import{a as F,t as I}from"./Scrollbar-DSXt8xuo.js";import{t as L}from"./use-merged-state-DzXhUbEL.js";import{t as R}from"./format-length-BwSo_EUP.js";import{$ as ee,P as z,Q as B,R as V,S as H,X as U,Z as W,ct as G,lt as K,q,st as J,ut as Y,y as X}from"./index-DwEf3xIY.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=a({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let n=x(!!t.show),a=x(null),o=P(Y),s=0,c=``,l=null,u=x(!1),d=x(!1),f=r(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:h,mergedRtlRef:g}=i(t),_=e(`Drawer`,g,h),v=A,y=e=>{d.value=!0,s=f.value?e.clientY:e.clientX,c=document.body.style.cursor,document.body.style.cursor=f.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,O),document.body.addEventListener(`mouseleave`,v),document.body.addEventListener(`mouseup`,A)},b=()=>{l!==null&&(window.clearTimeout(l),l=null),d.value?u.value=!0:l=window.setTimeout(()=>{u.value=!0},300)},S=()=>{l!==null&&(window.clearTimeout(l),l=null),u.value=!1},{doUpdateHeight:C,doUpdateWidth:w}=o,T=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},D=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function O(e){if(d.value){if(f.value){let n=a.value?.offsetHeight||0,r=s-e.clientY;n+=t.placement===`bottom`?r:-r,n=D(n),C(n),s=e.clientY}else{let n=a.value?.offsetWidth||0,r=s-e.clientX;n+=t.placement===`right`?r:-r,n=T(n),w(n),s=e.clientX}}}function A(){d.value&&(s=0,d.value=!1,document.body.style.cursor=c,document.body.removeEventListener(`mousemove`,O),document.body.removeEventListener(`mouseup`,A),document.body.removeEventListener(`mouseleave`,v))}k(()=>{t.show&&(n.value=!0)}),E(()=>t.show,e=>{e||A()}),p(()=>{A()});let j=r(()=>{let{show:e}=t,n=[[N,e]];return t.showMask||n.push([ee,t.onClickoutside,void 0,{capture:!0}]),n});function M(){n.value=!1,t.onAfterLeave?.()}return V(r(()=>t.blockScroll&&n.value)),m(K,a),m(J,null),m(G,null),{bodyRef:a,rtlEnabled:_,mergedClsPrefix:o.mergedClsPrefixRef,isMounted:o.isMountedRef,mergedTheme:o.mergedThemeRef,displayed:n,transitionName:r(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:M,bodyDirectives:j,handleMousedownResizeTrigger:y,handleMouseenterResizeTrigger:b,handleMouseleaveResizeTrigger:S,isDragging:d,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:n}=this;return this.displayDirective===`show`||this.displayed||this.show?O((h(),S(`div`,Q,[(h(),w(U,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(h(),w(b,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>O(c(`div`,t(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${n}-drawer`,this.rtlEnabled&&`${n}-drawer--rtl`,`${n}-drawer--${this.placement}-placement`,this.isDragging&&`${n}-drawer--unselectable`,this.nativeScrollbar&&`${n}-drawer--native-scrollbar`]}),[this.resizable?(h(),S(`div`,{key:2,class:A([`${n}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${n}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(h(),S(`div`,{key:3,class:A([`${n}-drawer-content-wrapper`,this.contentClass]),style:d(this.contentStyle),role:`none`},[M(()=>e.default?.())],6)):(h(),w(I,t({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${n}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),v(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[N,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=j;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[g(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),g(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),g(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),g(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),g(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),g(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=j;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[g(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),g(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),g(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),g(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),g(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),g(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=j;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[g(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),g(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),g(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),g(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),g(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),g(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=j;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[g(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),g(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),g(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),g(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),g(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),g(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=g([D(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),T(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),T(`native-scrollbar`,[D(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),y(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[T(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),D(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),D(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[T(`native-scrollbar`,[D(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),D(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),D(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),D(`drawer-header`,`
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
 `,[y(`main`,`
 flex: 1;
 `),y(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),D(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),T(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[y(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),T(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[y(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),T(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[y(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),T(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[y(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),g(`body`,[g(`>`,[D(`drawer-container`,`
 position: fixed;
 `)])]),D(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[g(`> *`,`
 pointer-events: all;
 `)]),D(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[T(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),F({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...f.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=a({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:a}=i(e),c=u(),l=f(`Drawer`,`-drawer`,$,X,e,t),d=x(e.defaultWidth),p=x(e.defaultHeight),h=L(_(e,`width`),d),g=L(_(e,`height`),p),v=r(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(h.value)}),y=r(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(g.value)}),b=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&s(n,t),r&&s(r,t),d.value=t},S=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&s(n,t),r&&s(r,t),p.value=t},C=r(()=>[{width:v.value,height:y.value},e.drawerStyle||``]);function w(t){let{onMaskClick:n,maskClosable:r}=e;r&&O(!1),n&&n(t)}function T(e){w(e)}let E=H();function D(t){e.onEsc?.(),e.show&&e.closeOnEsc&&z(t)&&(E.value||O(!1))}function O(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&s(r,t),i&&s(i,t),n&&!t&&s(n,t)}m(Y,{isMountedRef:c,mergedThemeRef:l,mergedClsPrefixRef:t,doUpdateShow:O,doUpdateHeight:S,doUpdateWidth:b});let k=r(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:c,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=l.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":c,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),A=a?o(`drawer`,void 0,k,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:C,handleOutsideClick:T,handleMaskClick:w,handleEsc:D,mergedTheme:l,cssVars:a?void 0:k,themeClass:A?.themeClass,onRender:A?.onRender,isMounted:c}},render(){let{mergedClsPrefix:e}=this;return h(),w(W,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),O((h(),S(`div`,{class:A([`${e}-drawer-container`,this.namespace,this.themeClass]),style:d(this.cssVars),role:`none`},[this.showMask?(h(),w(b,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(h(),S(`div`,{key:1,"aria-hidden":!0,class:A([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):M(()=>null),(h(),w(te,t(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),v(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[B,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=a({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=P(Y,null);e||C(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:r,nativeScrollbar:i,mergedTheme:a,bodyClass:o,bodyStyle:s,bodyContentClass:c,bodyContentStyle:u,headerClass:f,headerStyle:p,footerClass:m,footerStyle:g,scrollbarProps:_,closable:y,$slots:b}=this;return h(),S(`div`,{role:`none`,class:A([`${r}-drawer-content`,i&&`${r}-drawer-content--native-scrollbar`])},[b.header||e||y?(h(),S(`div`,{key:0,class:A([`${r}-drawer-header`,f]),style:d(p),role:`none`},[l(`div`,{class:A(`${r}-drawer-header__main`),role:`heading`,"aria-level":`1`},[b.header===void 0?(h(),S(n,{key:1},[M(()=>e)],64)):(h(),S(n,{key:0},[M(()=>b.header())],64))],2),M(()=>y&&(h(),w(q,{onClick:this.handleCloseClick,clsPrefix:r,class:A(`${r}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):M(()=>null),i?(h(),S(`div`,{key:2,class:A([`${r}-drawer-body`,o]),style:d(s),role:`none`},[l(`div`,{class:A([`${r}-drawer-body-content-wrapper`,c]),style:d(u),role:`none`},[M(()=>b.default?.())],6)],6)):(h(),w(I,t({key:3,themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},_,{class:`${r}-drawer-body`,contentClass:[`${r}-drawer-body-content-wrapper`,c],contentStyle:u}),v(b),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),b.footer?(h(),S(`div`,{key:4,class:A([`${r}-drawer-footer`,m]),style:d(g),role:`none`},[M(()=>b.footer())],6)):M(()=>null)],2)}});export{ge as n,_e as t};