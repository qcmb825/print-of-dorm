import{A as e,Bn as t,Dn as n,Et as r,F as i,Fn as a,G as o,H as s,J as c,N as l,O as u,On as d,V as f,Y as p,Yn as m,an as h,cn as g,dn as _,hr as v,ht as y,jn as b,kn as x,ln as S,on as C,vt as w,xt as T}from"./endpoints-DguQVVk7.js";import{G as E,H as D,K as O,U as k,V as A,W as j,pt as M,q as N}from"./index-DwEf3xIY.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:l,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...O,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:l,contentTextColor:l,closeBorderRadius:n,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${p(i,c(g,{alpha:.25}))}`,colorInfo:p(i,c(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:l,closeColorHoverInfo:u,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${p(i,c(_,{alpha:.25}))}`,colorSuccess:p(i,c(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:l,closeColorHoverSuccess:u,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${p(i,c(v,{alpha:.33}))}`,colorWarning:p(i,c(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:l,closeColorHoverWarning:u,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${p(i,c(y,{alpha:.25}))}`,colorError:p(i,c(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:l,closeColorHoverError:u,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:m,closeIconColorPressedError:h}}var F={name:`Alert`,common:o,self:P},I=C(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[g(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),S(`closable`,[C(`alert-body`,[g(`title`,`
 padding-right: 24px;
 `)])]),g(`icon`,{color:`var(--n-icon-color)`}),C(`alert-body`,{padding:`var(--n-padding)`},[g(`title`,{color:`var(--n-title-text-color)`}),g(`content`,{color:`var(--n-content-text-color)`})]),A({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),g(`icon`,`
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
 `),g(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),S(`show-icon`,[C(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),S(`right-adjust`,[C(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),C(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[g(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[h(`& +`,[g(`content`,{marginTop:`9px`})])]),g(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),g(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...f.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=a({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(t){let{mergedClsPrefixRef:i,mergedBorderedRef:a,inlineThemeDisabled:o,mergedRtlRef:c}=r(t),l=f(`Alert`,`-alert`,I,F,t,i),u=e(`Alert`,c,i),d=n(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=l.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:s,iconMargin:c,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:g}=n,{type:v}=t,{left:b,right:x}=y(c);return{"--n-bezier":e,"--n-color":n[_(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[_(`closeColorHover`,v)],"--n-close-color-pressed":n[_(`closeColorPressed`,v)],"--n-close-icon-color":n[_(`closeIconColor`,v)],"--n-close-icon-color-hover":n[_(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[_(`closeIconColorPressed`,v)],"--n-icon-color":n[_(`iconColor`,v)],"--n-border":n[_(`border`,v)],"--n-title-text-color":n[_(`titleTextColor`,v)],"--n-content-text-color":n[_(`contentTextColor`,v)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":s,"--n-icon-margin":c,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":g,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),p=o?s(`alert`,n(()=>t.type[0]),d,t):void 0,m=v(!0),h=()=>{let{onAfterLeave:e,onAfterHide:n}=t;e&&e(),n&&n()};return{rtlEnabled:u,mergedClsPrefix:i,mergedBordered:a,visible:m,handleCloseClick:()=>{Promise.resolve(t.onClose?.()).then(e=>{e!==!1&&(m.value=!1)})},handleAfterLeave:()=>{h()},mergedTheme:l,cssVars:o?void 0:d,themeClass:p?.themeClass,onRender:p?.onRender}},render(){return this.onRender?.(),m(),x(u,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:n}=this,r={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(m(),b(`div`,t({key:1},t(this.$attrs,r)),[T(()=>this.closable&&(m(),x(N,{clsPrefix:e,class:w(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),T(()=>this.bordered&&(m(),b(`div`,{class:w(`${e}-alert__border`)},null,2))),T(()=>this.showIcon&&(m(),b(`div`,{class:w(`${e}-alert__icon`),"aria-hidden":`true`},[T(()=>l(n.icon,()=>[(m(),x(M,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return m(),x(k,{key:3});case`info`:return m(),x(j,{key:4});case`warning`:return m(),x(D,{key:5});case`error`:return m(),x(E,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),d(`div`,{class:w([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[T(()=>i(n.header,t=>{let n=t||this.title;return n?(m(),b(`div`,{key:2,class:w(`${e}-alert-body__title`)},[T(()=>n)],2)):null})),T(()=>n.default&&(m(),b(`div`,{class:w(`${e}-alert-body__content`)},[T(()=>n.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};