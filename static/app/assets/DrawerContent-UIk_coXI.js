import{$n as e,B as t,Bn as n,Cn as r,Dn as i,Dt as a,F as o,Fn as s,Gn as c,I as l,In as u,Kn as d,Nn as f,O as p,Qn as m,St as h,Tn as g,_t as _,an as v,bt as y,dr as b,fn as x,gr as S,gt as C,hn as w,in as T,jn as E,mt as D,nn as O,nr as k,tn as A,wn as j,xr as M,yn as N,z as P}from"./endpoints-gDUDUnKI.js";import{i as F}from"./cssr-nvHT-q9I.js";import{t as I}from"./format-length-BwSo_EUP.js";import{P as L,Q as R,R as ee,S as z,X as B,_t as V,gt as H,ht as U,nt as W,ot as G,q as K,rt as q,tt as J,vt as Y,y as X}from"./index-DmEbPUOi.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=E({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let i=b(!!t.show),a=b(null),o=s(Y),c=0,l=``,u=null,f=b(!1),g=b(!1),_=r(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:v,mergedRtlRef:y}=h(t),x=p(`Drawer`,y,v),S=M,C=e=>{g.value=!0,c=_.value?e.clientY:e.clientX,l=document.body.style.cursor,document.body.style.cursor=_.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,j),document.body.addEventListener(`mouseleave`,S),document.body.addEventListener(`mouseup`,M)},T=()=>{u!==null&&(window.clearTimeout(u),u=null),g.value?f.value=!0:u=window.setTimeout(()=>{f.value=!0},300)},E=()=>{u!==null&&(window.clearTimeout(u),u=null),f.value=!1},{doUpdateHeight:D,doUpdateWidth:O}=o,k=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},A=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function j(e){if(g.value){if(_.value){let n=a.value?.offsetHeight||0,r=c-e.clientY;n+=t.placement===`bottom`?r:-r,n=A(n),D(n),c=e.clientY}else{let n=a.value?.offsetWidth||0,r=c-e.clientX;n+=t.placement===`right`?r:-r,n=k(n),O(n),c=e.clientX}}}function M(){g.value&&(c=0,g.value=!1,document.body.style.cursor=l,document.body.removeEventListener(`mousemove`,j),document.body.removeEventListener(`mouseup`,M),document.body.removeEventListener(`mouseleave`,S))}e(()=>{t.show&&(i.value=!0)}),m(()=>t.show,e=>{e||M()}),n(()=>{M()});let N=r(()=>{let{show:e}=t,n=[[w,e]];return t.showMask||n.push([q,t.onClickoutside,void 0,{capture:!0}]),n});function P(){i.value=!1,t.onAfterLeave?.()}return ee(r(()=>t.blockScroll&&i.value)),d(V,a),d(U,null),d(H,null),{bodyRef:a,rtlEnabled:x,mergedClsPrefix:o.mergedClsPrefixRef,isMounted:o.isMountedRef,mergedTheme:o.mergedThemeRef,displayed:i,transitionName:r(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:P,bodyDirectives:N,handleMousedownResizeTrigger:C,handleMouseenterResizeTrigger:T,handleMouseleaveResizeTrigger:E,isDragging:g,isHoverOnResizeTrigger:f}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?k((c(),i(`div`,Q,[(c(),g(R,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(c(),g(x,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>k(f(`div`,u(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?(c(),i(`div`,{key:2,class:D([`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(c(),i(`div`,{key:3,class:D([`${t}-drawer-content-wrapper`,this.contentClass]),style:M(this.contentStyle),role:`none`},[_(()=>e.default?.())],6)):(c(),g(B,u({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),C(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[w,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=y;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[A(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),A(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),A(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),A(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),A(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),A(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=y;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[A(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),A(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),A(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),A(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),A(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),A(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=y;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[A(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),A(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),A(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),A(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),A(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),A(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=y;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[A(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),A(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),A(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),A(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),A(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),A(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=A([O(`drawer`,`
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
 `,[ue(),se(),pe(),ie(),v(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),v(`native-scrollbar`,[O(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),T(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[v(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),O(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),O(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[v(`native-scrollbar`,[O(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),O(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),O(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),O(`drawer-header`,`
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
 `,[T(`main`,`
 flex: 1;
 `),T(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),O(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),v(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[T(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),v(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[T(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),v(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[T(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),v(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[T(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),A(`body`,[A(`>`,[O(`drawer-container`,`
 position: fixed;
 `)])]),O(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[A(`> *`,`
 pointer-events: all;
 `)]),O(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[v(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),G({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...P.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=E({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:n,namespaceRef:i,inlineThemeDisabled:a}=h(e),s=l(),c=P(`Drawer`,`-drawer`,$,X,e,n),u=b(e.defaultWidth),f=b(e.defaultHeight),p=F(S(e,`width`),u),m=F(S(e,`height`),f),g=r(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:I(p.value)}),_=r(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:I(m.value)}),v=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&o(n,t),r&&o(r,t),u.value=t},y=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&o(n,t),r&&o(r,t),f.value=t},x=r(()=>[{width:g.value,height:_.value},e.drawerStyle||``]);function C(t){let{onMaskClick:n,maskClosable:r}=e;r&&D(!1),n&&n(t)}function w(e){C(e)}let T=z();function E(t){e.onEsc?.(),e.show&&e.closeOnEsc&&L(t)&&(T.value||D(!1))}function D(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&o(r,t),i&&o(i,t),n&&!t&&o(n,t)}d(Y,{isMountedRef:s,mergedThemeRef:c,mergedClsPrefixRef:n,doUpdateShow:D,doUpdateHeight:y,doUpdateWidth:v});let O=r(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=c.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),k=a?t(`drawer`,void 0,O,e):void 0;return{mergedClsPrefix:n,namespace:i,mergedBodyStyle:x,handleOutsideClick:w,handleMaskClick:C,handleEsc:E,mergedTheme:c,cssVars:a?void 0:O,themeClass:k?.themeClass,onRender:k?.onRender,isMounted:s}},render(){let{mergedClsPrefix:e}=this;return c(),g(J,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),k((c(),i(`div`,{class:D([`${e}-drawer-container`,this.namespace,this.themeClass]),style:M(this.cssVars),role:`none`},[this.showMask?(c(),g(x,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(c(),i(`div`,{key:1,"aria-hidden":!0,class:D([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):_(()=>null),(c(),g(te,u(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),C(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[W,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=E({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=s(Y,null);e||a(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:n,mergedTheme:r,bodyClass:a,bodyStyle:o,bodyContentClass:s,bodyContentStyle:l,headerClass:d,headerStyle:f,footerClass:p,footerStyle:m,scrollbarProps:h,closable:v,$slots:y}=this;return c(),i(`div`,{role:`none`,class:D([`${t}-drawer-content`,n&&`${t}-drawer-content--native-scrollbar`])},[y.header||e||v?(c(),i(`div`,{key:0,class:D([`${t}-drawer-header`,d]),style:M(f),role:`none`},[j(`div`,{class:D(`${t}-drawer-header__main`),role:`heading`,"aria-level":`1`},[y.header===void 0?(c(),i(N,{key:1},[_(()=>e)],64)):(c(),i(N,{key:0},[_(()=>y.header())],64))],2),_(()=>v&&(c(),g(K,{onClick:this.handleCloseClick,clsPrefix:t,class:D(`${t}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):_(()=>null),n?(c(),i(`div`,{key:2,class:D([`${t}-drawer-body`,a]),style:M(o),role:`none`},[j(`div`,{class:D([`${t}-drawer-body-content-wrapper`,s]),style:M(l),role:`none`},[_(()=>y.default?.())],6)],6)):(c(),g(B,u({key:3,themeOverrides:r.peerOverrides.Scrollbar,theme:r.peers.Scrollbar},h,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,s],contentStyle:l}),C(y),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),y.footer?(c(),i(`div`,{key:4,class:D([`${t}-drawer-footer`,p]),style:M(m),role:`none`},[_(()=>y.footer())],6)):_(()=>null)],2)}});export{ge as n,_e as t};