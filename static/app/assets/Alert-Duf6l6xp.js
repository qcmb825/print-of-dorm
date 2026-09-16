import{B as e,Cn as t,Dn as n,E as r,G as i,Gn as a,In as o,N as s,O as c,St as l,Tn as u,V as d,W as f,_t as p,an as m,dr as h,dt as g,in as _,j as v,jn as y,mt as b,nn as x,sn as S,tn as C,wn as w,z as T}from"./endpoints-gDUDUnKI.js";import{G as E,H as D,K as O,U as k,V as A,W as j,q as M,xt as N}from"./index-DmEbPUOi.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:a,dividerColor:o,actionColor:s,textColor1:c,textColor2:l,closeColorHover:u,closeColorPressed:d,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...O,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${o}`,color:s,titleTextColor:c,iconColor:l,contentTextColor:l,closeBorderRadius:n,closeColorHover:u,closeColorPressed:d,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${i(a,f(g,{alpha:.25}))}`,colorInfo:i(a,f(g,{alpha:.08})),titleTextColorInfo:c,iconColorInfo:g,contentTextColorInfo:l,closeColorHoverInfo:u,closeColorPressedInfo:d,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${i(a,f(_,{alpha:.25}))}`,colorSuccess:i(a,f(_,{alpha:.08})),titleTextColorSuccess:c,iconColorSuccess:_,contentTextColorSuccess:l,closeColorHoverSuccess:u,closeColorPressedSuccess:d,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${i(a,f(v,{alpha:.33}))}`,colorWarning:i(a,f(v,{alpha:.08})),titleTextColorWarning:c,iconColorWarning:v,contentTextColorWarning:l,closeColorHoverWarning:u,closeColorPressedWarning:d,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${i(a,f(y,{alpha:.25}))}`,colorError:i(a,f(y,{alpha:.08})),titleTextColorError:c,iconColorError:y,contentTextColorError:l,closeColorHoverError:u,closeColorPressedError:d,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h}}var F={name:`Alert`,common:d,self:P},I=x(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[_(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),m(`closable`,[x(`alert-body`,[_(`title`,`
 padding-right: 24px;
 `)])]),_(`icon`,{color:`var(--n-icon-color)`}),x(`alert-body`,{padding:`var(--n-padding)`},[_(`title`,{color:`var(--n-title-text-color)`}),_(`content`,{color:`var(--n-content-text-color)`})]),A({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),_(`icon`,`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),_(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),m(`show-icon`,[x(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),m(`right-adjust`,[x(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),x(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[_(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[C(`& +`,[_(`content`,{marginTop:`9px`})])]),_(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),_(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...T.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=y({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(n){let{mergedClsPrefixRef:r,mergedBorderedRef:i,inlineThemeDisabled:a,mergedRtlRef:o}=l(n),s=T(`Alert`,`-alert`,I,F,n,r),u=c(`Alert`,o,r),d=t(()=>{let{common:{cubicBezierEaseInOut:e},self:t}=s.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:_}=t,{type:v}=n,{left:y,right:b}=g(l);return{"--n-bezier":e,"--n-color":t[S(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":t[S(`closeColorHover`,v)],"--n-close-color-pressed":t[S(`closeColorPressed`,v)],"--n-close-icon-color":t[S(`closeIconColor`,v)],"--n-close-icon-color-hover":t[S(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":t[S(`closeIconColorPressed`,v)],"--n-icon-color":t[S(`iconColor`,v)],"--n-border":t[S(`border`,v)],"--n-title-text-color":t[S(`titleTextColor`,v)],"--n-content-text-color":t[S(`contentTextColor`,v)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":b}}),f=a?e(`alert`,t(()=>n.type[0]),d,n):void 0,p=h(!0),m=()=>{let{onAfterLeave:e,onAfterHide:t}=n;e&&e(),t&&t()};return{rtlEnabled:u,mergedClsPrefix:r,mergedBordered:i,visible:p,handleCloseClick:()=>{Promise.resolve(n.onClose?.()).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:s,cssVars:a?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender}},render(){return this.onRender?.(),a(),u(r,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,r={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(a(),n(`div`,o({key:1},o(this.$attrs,r)),[p(()=>this.closable&&(a(),u(M,{clsPrefix:e,class:b(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),p(()=>this.bordered&&(a(),n(`div`,{class:b(`${e}-alert__border`)},null,2))),p(()=>this.showIcon&&(a(),n(`div`,{class:b(`${e}-alert__icon`),"aria-hidden":`true`},[p(()=>v(t.icon,()=>[(a(),u(N,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return a(),u(k,{key:3});case`info`:return a(),u(j,{key:4});case`warning`:return a(),u(D,{key:5});case`error`:return a(),u(E,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),w(`div`,{class:b([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[p(()=>s(t.header,t=>{let r=t||this.title;return r?(a(),n(`div`,{key:2,class:b(`${e}-alert-body__title`)},[p(()=>r)],2)):null})),p(()=>t.default&&(a(),n(`div`,{class:b(`${e}-alert-body__content`)},[p(()=>t.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};