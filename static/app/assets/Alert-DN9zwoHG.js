import{B as e,Ft as t,H as n,V as r,W as i,X as a,ft as o,rt as s}from"./endpoints-BxtGT1Ar.js";import{A as c,C as l,F as u,Gt as d,Jt as f,Kt as p,P as m,Yt as h,Zt as g,ft as _,g as v,it as y,j as b,k as x,st as S,tt as C,v as w,x as T}from"./createLucideIcon-Cwmwwrzy.js";import{G as E,J as D,K as O,X as k,Y as A,Z as j,_t as M,q as N}from"./index-DTOjFR5u.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...k,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:h,borderInfo:`1px solid ${u(i,m(g,{alpha:.25}))}`,colorInfo:u(i,m(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${u(i,m(_,{alpha:.25}))}`,colorSuccess:u(i,m(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${u(i,m(v,{alpha:.33}))}`,colorWarning:u(i,m(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:h,borderError:`1px solid ${u(i,m(y,{alpha:.25}))}`,colorError:u(i,m(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:h}}var F={name:`Alert`,common:b,self:P},I=p(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[f(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),h(`closable`,[p(`alert-body`,[f(`title`,`
 padding-right: 24px;
 `)])]),f(`icon`,{color:`var(--n-icon-color)`}),p(`alert-body`,{padding:`var(--n-padding)`},[f(`title`,{color:`var(--n-title-text-color)`}),f(`content`,{color:`var(--n-content-text-color)`})]),E({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),f(`icon`,`
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
 `),f(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),h(`show-icon`,[p(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),h(`right-adjust`,[p(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),p(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[f(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[d(`& +`,[f(`content`,{marginTop:`9px`})])]),f(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),f(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...x.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=a({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(n){let{mergedClsPrefixRef:r,mergedBorderedRef:i,inlineThemeDisabled:a,mergedRtlRef:o}=_(n),s=x(`Alert`,`-alert`,I,F,n,r),l=w(`Alert`,o,r),u=e(()=>{let{common:{cubicBezierEaseInOut:e},self:t}=s.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:_}=t,{type:v}=n,{left:y,right:b}=C(l);return{"--n-bezier":e,"--n-color":t[g(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":t[g(`closeColorHover`,v)],"--n-close-color-pressed":t[g(`closeColorPressed`,v)],"--n-close-icon-color":t[g(`closeIconColor`,v)],"--n-close-icon-color-hover":t[g(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":t[g(`closeIconColorPressed`,v)],"--n-icon-color":t[g(`iconColor`,v)],"--n-border":t[g(`border`,v)],"--n-title-text-color":t[g(`titleTextColor`,v)],"--n-content-text-color":t[g(`contentTextColor`,v)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":b}}),d=a?c(`alert`,e(()=>n.type[0]),u,n):void 0,f=t(!0),p=()=>{let{onAfterLeave:e,onAfterHide:t}=n;e&&e(),t&&t()};return{rtlEnabled:l,mergedClsPrefix:r,mergedBordered:i,visible:f,handleCloseClick:()=>{Promise.resolve(n.onClose?.()).then(e=>{e!==!1&&(f.value=!1)})},handleAfterLeave:()=>{p()},mergedTheme:s,cssVars:a?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){return this.onRender?.(),o(),n(v,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,a={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(o(),i(`div`,s({key:1},s(this.$attrs,a)),[S(()=>this.closable&&(o(),n(j,{clsPrefix:e,class:y(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),S(()=>this.bordered&&(o(),i(`div`,{class:y(`${e}-alert__border`)},null,2))),S(()=>this.showIcon&&(o(),i(`div`,{class:y(`${e}-alert__icon`),"aria-hidden":`true`},[S(()=>T(t.icon,()=>[(o(),n(M,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return o(),n(N,{key:3});case`info`:return o(),n(D,{key:4});case`warning`:return o(),n(O,{key:5});case`error`:return o(),n(A,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),r(`div`,{class:y([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[S(()=>l(t.header,t=>{let n=t||this.title;return n?(o(),i(`div`,{key:2,class:y(`${e}-alert-body__title`)},[S(()=>n)],2)):null})),S(()=>t.default&&(o(),i(`div`,{class:y(`${e}-alert-body__content`)},[S(()=>t.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};