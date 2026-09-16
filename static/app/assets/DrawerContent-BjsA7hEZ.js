import{$t as e,Cn as t,E as n,L as r,N as i,Nn as a,P as o,Pn as s,R as c,Rn as l,Sn as u,Tn as d,Tt as f,Un as p,Wn as m,Xn as h,Zn as g,_n as _,bt as v,en as y,er as b,ft as x,ht as S,jn as C,kn as w,lr as T,mr as E,mt as D,nn as O,pn as k,rn as A,un as j,vt as M,xn as N,yr as P}from"./endpoints-Bo2NXLxK.js";import{C as F,D as I,E as L,S as R,c as z,f as B,i as V,l as H,n as U,s as W}from"./fade-in-scale-up.cssr-OU0FjBQD.js";import{f as G,l as K}from"./Popover-D-j5JW7o.js";import{L as q,N as J,W as Y,v as X,x as Z}from"./index-DdbODeTB.js";var Q=[`onMouseenter`,`onMouseleave`,`onMousedown`],$={key:1,role:`none`},ee=w({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let t=T(!!e.show),r=T(null),i=a(I),o=0,s=``,c=null,u=T(!1),d=T(!1),f=N(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:p,mergedRtlRef:_}=v(e),y=n(`Drawer`,_,p),b=j,x=e=>{d.value=!0,o=f.value?e.clientY:e.clientX,s=document.body.style.cursor,document.body.style.cursor=f.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,A),document.body.addEventListener(`mouseleave`,b),document.body.addEventListener(`mouseup`,j)},S=()=>{c!==null&&(window.clearTimeout(c),c=null),d.value?u.value=!0:c=window.setTimeout(()=>{u.value=!0},300)},C=()=>{c!==null&&(window.clearTimeout(c),c=null),u.value=!1},{doUpdateHeight:w,doUpdateWidth:E}=i,D=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},O=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function A(t){if(d.value){if(f.value){let n=r.value?.offsetHeight||0,i=o-t.clientY;n+=e.placement===`bottom`?i:-i,n=O(n),w(n),o=t.clientY}else{let n=r.value?.offsetWidth||0,i=o-t.clientX;n+=e.placement===`right`?i:-i,n=D(n),E(n),o=t.clientX}}}function j(){d.value&&(o=0,d.value=!1,document.body.style.cursor=s,document.body.removeEventListener(`mousemove`,A),document.body.removeEventListener(`mouseup`,j),document.body.removeEventListener(`mouseleave`,b))}g(()=>{e.show&&(t.value=!0)}),h(()=>e.show,e=>{e||j()}),l(()=>{j()});let M=N(()=>{let{show:t}=e,n=[[k,t]];return e.showMask||n.push([H,e.onClickoutside,void 0,{capture:!0}]),n});function P(){t.value=!1,e.onAfterLeave?.()}return q(N(()=>e.blockScroll&&t.value)),m(L,r),m(R,null),m(F,null),{bodyRef:r,rtlEnabled:y,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:t,transitionName:N(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:P,bodyDirectives:M,handleMousedownResizeTrigger:x,handleMouseenterResizeTrigger:S,handleMouseleaveResizeTrigger:C,isDragging:d,isHoverOnResizeTrigger:u}},render(){let{$slots:e,mergedClsPrefix:n}=this;return this.displayDirective===`show`||this.displayed||this.show?b((p(),d(`div`,$,[(p(),t(V,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>(p(),t(j,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>b(C(`div`,s(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${n}-drawer`,this.rtlEnabled&&`${n}-drawer--rtl`,`${n}-drawer--${this.placement}-placement`,this.isDragging&&`${n}-drawer--unselectable`,this.nativeScrollbar&&`${n}-drawer--native-scrollbar`]}),[this.resizable?(p(),d(`div`,{key:2,class:x([`${n}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${n}-drawer__resize-trigger--hover`]),onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger},null,42,Q)):null,this.nativeScrollbar?(p(),d(`div`,{key:3,class:x([`${n}-drawer-content-wrapper`,this.contentClass]),style:P(this.contentStyle),role:`none`},[S(()=>e.default?.())],6)):(p(),t(U,s({key:4},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${n}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),D(e),1040,[`contentStyle`,`contentClass`,`theme`,`themeOverrides`]))]),this.bodyDirectives)},1032,[`name`,`appear`,`onAfterEnter`,`onAfterLeave`]))},1032,[`disabled`,`active`,`autoFocus`,`onEsc`]))])),[[k,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:te,cubicBezierEaseOut:ne}=M;function re({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-bottom`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${te}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${ne}`}),e(`&.${r}-transition-enter-to`,{transform:`translateY(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateY(100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateY(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:ie,cubicBezierEaseOut:ae}=M;function oe({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-left`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${ie}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${ae}`}),e(`&.${r}-transition-enter-to`,{transform:`translateX(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateX(-100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateX(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:se,cubicBezierEaseOut:ce}=M;function le({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-right`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${se}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${ce}`}),e(`&.${r}-transition-enter-to`,{transform:`translateX(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateX(100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateX(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:ue,cubicBezierEaseOut:de}=M;function fe({duration:t=`0.3s`,leaveDuration:n=`0.2s`,name:r=`slide-in-from-top`}={}){return[e(`&.${r}-transition-leave-active`,{transition:`transform ${n} ${ue}`}),e(`&.${r}-transition-enter-active`,{transition:`transform ${t} ${de}`}),e(`&.${r}-transition-enter-to`,{transform:`translateY(0)`}),e(`&.${r}-transition-enter-from`,{transform:`translateY(-100%)`}),e(`&.${r}-transition-leave-from`,{transform:`translateY(0)`}),e(`&.${r}-transition-leave-to`,{transform:`translateY(-100%)`})]}var pe=e([y(`drawer`,`
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
 `,[le(),oe(),fe(),re(),A(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),A(`native-scrollbar`,[y(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),O(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[A(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),y(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),y(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[A(`native-scrollbar`,[y(`drawer-body-content-wrapper`,`
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
 `,[O(`main`,`
 flex: 1;
 `),O(`close`,`
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
 `)]),A(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[O(`resize-trigger`,`
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
 `,[O(`resize-trigger`,`
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
 `,[O(`resize-trigger`,`
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
 `,[O(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),e(`body`,[e(`>`,[y(`drawer-container`,`
 position: fixed;
 `)])]),y(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[e(`> *`,`
 pointer-events: all;
 `)]),y(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[A(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),B({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),me=[`onClick`],he={...r.props,show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function},ge=w({name:`Drawer`,inheritAttrs:!1,props:he,setup(e){let{mergedClsPrefixRef:t,namespaceRef:n,inlineThemeDisabled:a}=v(e),s=o(),l=r(`Drawer`,`-drawer`,pe,X,e,t),u=T(e.defaultWidth),d=T(e.defaultHeight),f=G(E(e,`width`),u),p=G(E(e,`height`),d),h=N(()=>{let{placement:t}=e;return t===`top`||t===`bottom`?``:K(f.value)}),g=N(()=>{let{placement:t}=e;return t===`left`||t===`right`?``:K(p.value)}),_=t=>{let{onUpdateWidth:n,"onUpdate:width":r}=e;n&&i(n,t),r&&i(r,t),u.value=t},y=t=>{let{onUpdateHeight:n,"onUpdate:width":r}=e;n&&i(n,t),r&&i(r,t),d.value=t},b=N(()=>[{width:h.value,height:g.value},e.drawerStyle||``]);function x(t){let{onMaskClick:n,maskClosable:r}=e;r&&D(!1),n&&n(t)}function S(e){x(e)}let C=Z();function w(t){e.onEsc?.(),e.show&&e.closeOnEsc&&J(t)&&(C.value||D(!1))}function D(t){let{onHide:n,onUpdateShow:r,"onUpdate:show":a}=e;r&&i(r,t),a&&i(a,t),n&&!t&&i(n,t)}m(I,{isMountedRef:s,mergedThemeRef:l,mergedClsPrefixRef:t,doUpdateShow:D,doUpdateHeight:y,doUpdateWidth:_});let O=N(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:c,borderRadius:u,bodyPadding:d,titleFontSize:f,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=l.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":u,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":d,"--n-footer-padding":c,"--n-title-text-color":p,"--n-title-font-size":f,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),k=a?c(`drawer`,void 0,O,e):void 0;return{mergedClsPrefix:t,namespace:n,mergedBodyStyle:b,handleOutsideClick:S,handleMaskClick:x,handleEsc:w,mergedTheme:l,cssVars:a?void 0:O,themeClass:k?.themeClass,onRender:k?.onRender,isMounted:s}},render(){let{mergedClsPrefix:e}=this;return p(),t(W,{to:this.to,show:this.show},{default:()=>(this.onRender?.(),b((p(),d(`div`,{class:x([`${e}-drawer-container`,this.namespace,this.themeClass]),style:P(this.cssVars),role:`none`},[this.showMask?(p(),t(j,{key:0,name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?(p(),d(`div`,{key:1,"aria-hidden":!0,class:x([`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`]),onClick:this.handleMaskClick},null,10,me)):null},1032,[`appear`])):S(()=>null),(p(),t(ee,s(this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),D(this.$slots),1040,[`class`,`style`,`blockScroll`,`contentStyle`,`contentClass`,`placement`,`scrollbarProps`,`show`,`displayDirective`,`nativeScrollbar`,`onAfterEnter`,`onAfterLeave`,`trapFocus`,`autoFocus`,`resizable`,`maxHeight`,`minHeight`,`maxWidth`,`minWidth`,`showMask`,`onEsc`,`onClickoutside`]))],6)),[[z,{zIndex:this.zIndex,enabled:this.show}]]))},1032,[`to`,`show`])}}),_e=w({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=a(I,null);e||f(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:n,nativeScrollbar:r,mergedTheme:i,bodyClass:a,bodyStyle:o,bodyContentClass:c,bodyContentStyle:l,headerClass:f,headerStyle:m,footerClass:h,footerStyle:g,scrollbarProps:v,closable:y,$slots:b}=this;return p(),d(`div`,{role:`none`,class:x([`${n}-drawer-content`,r&&`${n}-drawer-content--native-scrollbar`])},[b.header||e||y?(p(),d(`div`,{key:0,class:x([`${n}-drawer-header`,f]),style:P(m),role:`none`},[u(`div`,{class:x(`${n}-drawer-header__main`),role:`heading`,"aria-level":`1`},[b.header===void 0?(p(),d(_,{key:1},[S(()=>e)],64)):(p(),d(_,{key:0},[S(()=>b.header())],64))],2),S(()=>y&&(p(),t(Y,{onClick:this.handleCloseClick,clsPrefix:n,class:x(`${n}-drawer-header__close`),absolute:!0},null,8,[`onClick`,`clsPrefix`,`class`])))],6)):S(()=>null),r?(p(),d(`div`,{key:2,class:x([`${n}-drawer-body`,a]),style:P(o),role:`none`},[u(`div`,{class:x([`${n}-drawer-body-content-wrapper`,c]),style:P(l),role:`none`},[S(()=>b.default?.())],6)],6)):(p(),t(U,s({key:3,themeOverrides:i.peerOverrides.Scrollbar,theme:i.peers.Scrollbar},v,{class:`${n}-drawer-body`,contentClass:[`${n}-drawer-body-content-wrapper`,c],contentStyle:l}),D(b),1040,[`themeOverrides`,`theme`,`class`,`contentClass`,`contentStyle`])),b.footer?(p(),d(`div`,{key:4,class:x([`${n}-drawer-footer`,h]),style:P(g),role:`none`},[S(()=>b.footer())],6)):S(()=>null)],2)}});export{ge as n,_e as t};