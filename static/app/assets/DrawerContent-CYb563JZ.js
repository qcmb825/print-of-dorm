import{A as e,An as t,Dr as n,Dt as r,H as i,Hn as a,Kn as o,L as s,Ln as c,Mn as l,Mt as u,On as d,Qn as f,R as p,Sr as m,St as h,Tt as g,U as _,Vn as v,Zn as y,_n as b,_r as x,ar as S,bn as C,cr as w,ir as T,kn as E,ln as D,on as O,sn as k,un as A,wn as j,xt as M,yt as N,zn as P}from"./endpoints-DxQPCLqF.js";import{a as F,t as I}from"./Scrollbar-C-sdX_Vk.js";import{t as L}from"./use-merged-state-BBKZotlX.js";import{t as R}from"./format-length-BwSo_EUP.js";import{$ as ee,P as z,Q as B,R as V,S as H,X as U,Z as W,ct as G,lt as K,q,st as J,ut as Y,y as X}from"./index-Dp3yRsNZ.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=c({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let n=x(!!t.show),i=x(null),a=v(Y),s=0,c=``,l=null,u=x(!1),p=x(!1),m=d(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:h,mergedRtlRef:g}=r(t),_=e(`Drawer`,g,h),y=M,b=e=>{p.value=!0,s=m.value?e.clientY:e.clientX,c=document.body.style.cursor,document.body.style.cursor=m.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,j),document.body.addEventListener(`mouseleave`,y),document.body.addEventListener(`mouseup`,M)},w=()=>{l!==null&&(window.clearTimeout(l),l=null),p.value?u.value=!0:l=window.setTimeout(()=>{u.value=!0},300)},E=()=>{l!==null&&(window.clearTimeout(l),l=null),u.value=!1},{doUpdateHeight:D,doUpdateWidth:O}=a,k=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},A=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function j(e){if(p.value){if(m.value){let n=i.value?.offsetHeight||0,r=s-e.clientY;n+=t.placement===`bottom`?r:-r,n=A(n),D(n),s=e.clientY}else{let n=i.value?.offsetWidth||0,r=s-e.clientX;n+=t.placement===`right`?r:-r,n=k(n),O(n),s=e.clientX}}}function M(){p.value&&(s=0,p.value=!1,document.body.style.cursor=c,document.body.removeEventListener(`mousemove`,j),document.body.removeEventListener(`mouseup`,M),document.body.removeEventListener(`mouseleave`,y))}S(()=>{t.show&&(n.value=!0)}),T(()=>t.show,e=>{e||M()}),o(()=>{M()});let N=d(()=>{let{show:e}=t,n=[[C,e]];return t.showMask||n.push([ee,t.onClickoutside,void 0,{capture:!0}]),n});function P(){n.value=!1,t.onAfterLeave?.()}return V(d(()=>t.blockScroll&&n.value)),f(K,i),f(J,null),f(G,null),{bodyRef:i,rtlEnabled:_,mergedClsPrefix:a.mergedClsPrefixRef,isMounted:a.isMountedRef,mergedTheme:a.mergedThemeRef,displayed:n,transitionName:d(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:P,bodyDirectives:N,handleMousedownResizeTrigger:b,handleMouseenterResizeTrigger:w,handleMouseleaveResizeTrigger:E,isDragging:p,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:r}=this;return this.displayDirective===`show`||this.displayed||this.show?w((y(),l(`div`,Q,[(y(),t(U,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(y(),t(b,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>w(P(`div`,a(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${r}-drawer`,this.rtlEnabled&&`${r}-drawer--rtl`,`${r}-drawer--${this.placement}-placement`,this.isDragging&&`${r}-drawer--unselectable`,this.nativeScrollbar&&`${r}-drawer--native-scrollbar`]}),[this.resizable?(y(),l(`div`,{key:2,class:N([`${r}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${r}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(y(),l(`div`,{key:3,class:N([`${r}-drawer-content-wrapper`,this.contentClass]),style:n(this.contentStyle),role:`none`},[h(()=>e.default?.())],6)):(y(),t(I,a({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${r}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),M(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[C,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=g;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[O(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),O(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),O(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),O(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),O(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),O(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=g;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[O(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),O(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),O(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),O(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),O(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),O(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=g;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[O(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),O(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),O(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),O(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),O(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),O(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=g;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[O(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),O(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),O(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),O(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),O(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),O(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=O([k(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),A(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),A(`native-scrollbar`,[k(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),D(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[A(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),k(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),k(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[A(`native-scrollbar`,[k(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),k(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),k(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),k(`drawer-header`,`
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
 `,[D(`main`,`
 flex: 1;
 `),D(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),k(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),A(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[D(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),A(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[D(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),A(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[D(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),A(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[D(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),O(`body`,[O(`>`,[k(`drawer-container`,`
 position: fixed;
 `)])]),k(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[O(`> *`,`
 pointer-events: all;
 `)]),k(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[A(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),F({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...i.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=c({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:a}=r(e),o=p(),c=i(`Drawer`,`-drawer`,$,X,e,t),l=x(e.defaultWidth),u=x(e.defaultHeight),h=L(m(e,`width`),l),g=L(m(e,`height`),u),v=d(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(h.value)}),y=d(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(g.value)}),b=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&s(n,t),r&&s(r,t),l.value=t},S=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&s(n,t),r&&s(r,t),u.value=t},C=d(()=>[{width:v.value,height:y.value},e.drawerStyle||``]);function w(t){let{onMaskClick:n,maskClosable:r}=e;r&&O(!1),n&&n(t)}function T(e){w(e)}let E=H();function D(t){e.onEsc?.(),e.show&&e.closeOnEsc&&z(t)&&(E.value||O(!1))}function O(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&s(r,t),i&&s(i,t),n&&!t&&s(n,t)}f(Y,{isMountedRef:o,mergedThemeRef:c,mergedClsPrefixRef:t,doUpdateShow:O,doUpdateHeight:S,doUpdateWidth:b});let k=d(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=c.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),A=a?_(`drawer`,void 0,k,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:C,handleOutsideClick:T,handleMaskClick:w,handleEsc:D,mergedTheme:c,cssVars:a?void 0:k,themeClass:A?.themeClass,onRender:A?.onRender,isMounted:o}},render(){let{mergedClsPrefix:e}=this;return y(),t(W,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),w((y(),l(`div`,{class:N([`${e}-drawer-container`,this.namespace,this.themeClass]),style:n(this.cssVars),role:`none`},[this.showMask?(y(),t(b,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(y(),l(`div`,{key:1,"aria-hidden":!0,class:N([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):h(()=>null),(y(),t(te,a(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),M(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[B,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=c({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=v(Y,null);e||u(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:r,nativeScrollbar:i,mergedTheme:o,bodyClass:s,bodyStyle:c,bodyContentClass:u,bodyContentStyle:d,headerClass:f,headerStyle:p,footerClass:m,footerStyle:g,scrollbarProps:_,closable:v,$slots:b}=this;return y(),l(`div`,{role:`none`,class:N([`${r}-drawer-content`,i&&`${r}-drawer-content--native-scrollbar`])},[b.header||e||v?(y(),l(`div`,{key:0,class:N([`${r}-drawer-header`,f]),style:n(p),role:`none`},[E(`div`,{class:N(`${r}-drawer-header__main`),role:`heading`,"aria-level":`1`},[b.header===void 0?(y(),l(j,{key:1},[h(()=>e)],64)):(y(),l(j,{key:0},[h(()=>b.header())],64))],2),h(()=>v&&(y(),t(q,{onClick:this.handleCloseClick,clsPrefix:r,class:N(`${r}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):h(()=>null),i?(y(),l(`div`,{key:2,class:N([`${r}-drawer-body`,s]),style:n(c),role:`none`},[E(`div`,{class:N([`${r}-drawer-body-content-wrapper`,u]),style:n(d),role:`none`},[h(()=>b.default?.())],6)],6)):(y(),t(I,a({key:3,themeOverrides:o.peerOverrides.Scrollbar,theme:o.peers.Scrollbar},_,{class:`${r}-drawer-body`,contentClass:[`${r}-drawer-body-content-wrapper`,u],contentStyle:d}),M(b),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),b.footer?(y(),l(`div`,{key:4,class:N([`${r}-drawer-footer`,m]),style:n(g),role:`none`},[h(()=>b.footer())],6)):h(()=>null)],2)}});export{ge as n,_e as t};