import{A as e,An as t,Bn as n,Dt as r,Er as i,Gn as a,H as o,In as s,L as c,Mn as l,Mt as u,On as d,R as f,Rn as p,St as m,Tt as h,U as g,Vn as _,Xn as v,Zn as y,_n as b,bn as x,gr as S,ir as C,kn as w,ln as T,on as E,rr as D,sn as O,sr as k,un as A,wn as j,xr as M,xt as N,yt as P}from"./endpoints-D7YssODM.js";import{a as F,t as I}from"./Scrollbar-BE5qE3gb.js";import{t as L}from"./use-merged-state-CXRiUPYA.js";import{t as R}from"./format-length-BwSo_EUP.js";import{$ as ee,P as z,Q as B,R as V,S as H,X as U,Z as W,ct as G,lt as K,q,st as J,ut as Y,y as X}from"./index-CTz7zfxj.js";var Z=[`onMouseenter`,`onMouseleave`,`onMousedown`],Q={key:1,role:`none`},te=s({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){let i=S(!!t.show),o=S(null),s=n(Y),c=0,l=``,u=null,f=S(!1),p=S(!1),m=d(()=>t.placement===`top`||t.placement===`bottom`),{mergedClsPrefixRef:h,mergedRtlRef:g}=r(t),_=e(`Drawer`,g,h),v=M,b=e=>{p.value=!0,c=m.value?e.clientY:e.clientX,l=document.body.style.cursor,document.body.style.cursor=m.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,j),document.body.addEventListener(`mouseleave`,v),document.body.addEventListener(`mouseup`,M)},w=()=>{u!==null&&(window.clearTimeout(u),u=null),p.value?f.value=!0:u=window.setTimeout(()=>{f.value=!0},300)},T=()=>{u!==null&&(window.clearTimeout(u),u=null),f.value=!1},{doUpdateHeight:E,doUpdateWidth:O}=s,k=e=>{let{maxWidth:n}=t;if(n&&e>n)return n;let{minWidth:r}=t;return r&&e<r?r:e},A=e=>{let{maxHeight:n}=t;if(n&&e>n)return n;let{minHeight:r}=t;return r&&e<r?r:e};function j(e){if(p.value){if(m.value){let n=o.value?.offsetHeight||0,r=c-e.clientY;n+=t.placement===`bottom`?r:-r,n=A(n),E(n),c=e.clientY}else{let n=o.value?.offsetWidth||0,r=c-e.clientX;n+=t.placement===`right`?r:-r,n=k(n),O(n),c=e.clientX}}}function M(){p.value&&(c=0,p.value=!1,document.body.style.cursor=l,document.body.removeEventListener(`mousemove`,j),document.body.removeEventListener(`mouseup`,M),document.body.removeEventListener(`mouseleave`,v))}C(()=>{t.show&&(i.value=!0)}),D(()=>t.show,e=>{e||M()}),a(()=>{M()});let N=d(()=>{let{show:e}=t,n=[[x,e]];return t.showMask||n.push([ee,t.onClickoutside,void 0,{capture:!0}]),n});function P(){i.value=!1,t.onAfterLeave?.()}return V(d(()=>t.blockScroll&&i.value)),y(K,o),y(J,null),y(G,null),{bodyRef:o,rtlEnabled:_,mergedClsPrefix:s.mergedClsPrefixRef,isMounted:s.isMountedRef,mergedTheme:s.mergedThemeRef,displayed:i,transitionName:d(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[t.placement]),handleAfterLeave:P,bodyDirectives:N,handleMousedownResizeTrigger:b,handleMouseenterResizeTrigger:w,handleMouseleaveResizeTrigger:T,isDragging:p,isHoverOnResizeTrigger:f}},render(){let{$slots:e,mergedClsPrefix:n}=this;return this.displayDirective===`show`||this.displayed||this.show?k((v(),l(`div`,Q,[(v(),t(U,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(v(),t(b,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>k(p(`div`,_(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${n}-drawer`,this.rtlEnabled&&`${n}-drawer--rtl`,`${n}-drawer--${this.placement}-placement`,this.isDragging&&`${n}-drawer--unselectable`,this.nativeScrollbar&&`${n}-drawer--native-scrollbar`]}),[this.resizable?(v(),l(`div`,{key:2,class:P([`${n}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${n}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Z)):null,this.nativeScrollbar?(v(),l(`div`,{key:3,class:P([`${n}-drawer-content-wrapper`,this.contentClass]),style:i(this.contentStyle),role:`none`},[m(()=>e.default?.())],6)):(v(),t(I,_({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${n}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),N(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[x,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:ne,cubicBezierEaseOut:re}=h;function ie({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[E(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ne}`}),E(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${re}`}),E(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),E(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),E(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),E(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ae,cubicBezierEaseOut:oe}=h;function se({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[E(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ae}`}),E(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${oe}`}),E(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),E(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),E(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),E(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:ce,cubicBezierEaseOut:le}=h;function ue({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[E(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${ce}`}),E(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${le}`}),E(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),E(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),E(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),E(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:de,cubicBezierEaseOut:fe}=h;function pe({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[E(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${de}`}),E(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${fe}`}),E(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),E(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),E(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),E(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var $=E([O(`drawer`,`
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
 `),A(`native-scrollbar`,[O(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),T(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[A(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),O(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),O(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[A(`native-scrollbar`,[O(`drawer-body-content-wrapper`,`
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
 `)]),A(`right-placement`,`
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
 `)]),A(`left-placement`,`
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
 `)]),A(`top-placement`,`
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
 `)]),A(`bottom-placement`,`
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
 `)])]),E(`body`,[E(`>`,[O(`drawer-container`,`
 position: fixed;
 `)])]),O(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[E(`> *`,`
 pointer-events: all;
 `)]),O(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[A(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),F({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...o.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=s({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:i}=r(e),a=f(),s=o(`Drawer`,`-drawer`,$,X,e,t),l=S(e.defaultWidth),u=S(e.defaultHeight),p=L(M(e,`width`),l),m=L(M(e,`height`),u),h=d(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:R(p.value)}),_=d(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:R(m.value)}),v=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&c(n,t),r&&c(r,t),l.value=t},b=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&c(n,t),r&&c(r,t),u.value=t},x=d(()=>[{width:h.value,height:_.value},e.drawerStyle||``]);function C(t){let{onMaskClick:n,maskClosable:r}=e;r&&D(!1),n&&n(t)}function w(e){C(e)}let T=H();function E(t){e.onEsc?.(),e.show&&e.closeOnEsc&&z(t)&&(T.value||D(!1))}function D(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=e;r&&c(r,t),i&&c(i,t),n&&!t&&c(n,t)}y(Y,{isMountedRef:a,mergedThemeRef:s,mergedClsPrefixRef:t,doUpdateShow:D,doUpdateHeight:b,doUpdateWidth:v});let O=d(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:c,footerPadding:l,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=s.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":c,"--n-body-padding":d,"--n-footer-padding":l,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),k=i?g(`drawer`,void 0,O,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:x,handleOutsideClick:w,handleMaskClick:C,handleEsc:E,mergedTheme:s,cssVars:i?void 0:O,themeClass:k?.themeClass,onRender:k?.onRender,isMounted:a}},render(){let{mergedClsPrefix:e}=this;return v(),t(W,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),k((v(),l(`div`,{class:P([`${e}-drawer-container`,this.namespace,this.themeClass]),style:i(this.cssVars),role:`none`},[this.showMask?(v(),t(b,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(v(),l(`div`,{key:1,"aria-hidden":!0,class:P([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):m(()=>null),(v(),t(te,_(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),N(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[B,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=s({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=n(Y,null);e||u(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function r(){t(!1)}return{handleCloseClick:r,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:n,nativeScrollbar:r,mergedTheme:a,bodyClass:o,bodyStyle:s,bodyContentClass:c,bodyContentStyle:u,headerClass:d,headerStyle:f,footerClass:p,footerStyle:h,scrollbarProps:g,closable:y,$slots:b}=this;return v(),l(`div`,{role:`none`,class:P([`${n}-drawer-content`,r&&`${n}-drawer-content--native-scrollbar`])},[b.header||e||y?(v(),l(`div`,{key:0,class:P([`${n}-drawer-header`,d]),style:i(f),role:`none`},[w(`div`,{class:P(`${n}-drawer-header__main`),role:`heading`,"aria-level":`1`},[b.header===void 0?(v(),l(j,{key:1},[m(()=>e)],64)):(v(),l(j,{key:0},[m(()=>b.header())],64))],2),m(()=>y&&(v(),t(q,{onClick:this.handleCloseClick,clsPrefix:n,class:P(`${n}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):m(()=>null),r?(v(),l(`div`,{key:2,class:P([`${n}-drawer-body`,o]),style:i(s),role:`none`},[w(`div`,{class:P([`${n}-drawer-body-content-wrapper`,c]),style:i(u),role:`none`},[m(()=>b.default?.())],6)],6)):(v(),t(I,_({key:3,themeOverrides:a.peerOverrides.Scrollbar,theme:a.peers.Scrollbar},g,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,c],contentStyle:u}),N(b),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),b.footer?(v(),l(`div`,{key:4,class:P([`${n}-drawer-footer`,p]),style:i(h),role:`none`},[m(()=>b.footer())],6)):m(()=>null)],2)}});export{ge as n,_e as t};