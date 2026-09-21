import{G as e,H as t,It as n,U as r,V as i,Z as a,it as o,pt as s}from"./endpoints-MMH2_YQj.js";import{A as c,C as l,F as u,Gt as d,Jt as f,Kt as p,P as m,Yt as h,Zt as g,ft as _,g as v,it as y,j as b,k as x,st as S,tt as C,v as w,x as T}from"./createLucideIcon-Dgil5eM1.js";import{G as E,J as D,K as O,X as k,Y as A,Z as j,_t as M,q as N}from"./index-ChakMpLN.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...k,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:h,borderInfo:`1px solid ${u(i,m(g,{alpha:.25}))}`,colorInfo:u(i,m(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${u(i,m(_,{alpha:.25}))}`,colorSuccess:u(i,m(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${u(i,m(v,{alpha:.33}))}`,colorWarning:u(i,m(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:h,borderError:`1px solid ${u(i,m(y,{alpha:.25}))}`,colorError:u(i,m(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:h}}var F={name:`Alert`,common:b,self:P},I=p(`alert`,`
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
 `,[d(`& +`,[f(`content`,{marginTop:`9px`})])]),f(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),f(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...x.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=a({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:r,inlineThemeDisabled:a,mergedRtlRef:o}=_(e),s=x(`Alert`,`-alert`,I,F,e,t),l=w(`Alert`,o,t),u=i(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=s.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:_}=n,{type:v}=e,{left:y,right:b}=C(l);return{"--n-bezier":t,"--n-color":n[g(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[g(`closeColorHover`,v)],"--n-close-color-pressed":n[g(`closeColorPressed`,v)],"--n-close-icon-color":n[g(`closeIconColor`,v)],"--n-close-icon-color-hover":n[g(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[g(`closeIconColorPressed`,v)],"--n-icon-color":n[g(`iconColor`,v)],"--n-border":n[g(`border`,v)],"--n-title-text-color":n[g(`titleTextColor`,v)],"--n-content-text-color":n[g(`contentTextColor`,v)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":b}}),d=a?c(`alert`,i(()=>e.type[0]),u,e):void 0,f=n(!0),p=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:l,mergedClsPrefix:t,mergedBordered:r,visible:f,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(f.value=!1)})},handleAfterLeave:()=>{p()},mergedTheme:s,cssVars:a?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){return this.onRender?.(),s(),r(v,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:n,$slots:i}=this,a={class:[`${n}-alert`,this.themeClass,this.closable&&`${n}-alert--closable`,this.showIcon&&`${n}-alert--show-icon`,!this.title&&this.closable&&`${n}-alert--right-adjust`,this.rtlEnabled&&`${n}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(s(),e(`div`,o({key:1},o(this.$attrs,a)),[S(()=>this.closable&&(s(),r(j,{clsPrefix:n,class:y(`${n}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),S(()=>this.bordered&&(s(),e(`div`,{class:y(`${n}-alert__border`)},null,2))),S(()=>this.showIcon&&(s(),e(`div`,{class:y(`${n}-alert__icon`),"aria-hidden":`true`},[S(()=>T(i.icon,()=>[(s(),r(M,{clsPrefix:n},{default:()=>{switch(this.type){case`success`:return s(),r(N,{key:3});case`info`:return s(),r(D,{key:4});case`warning`:return s(),r(O,{key:5});case`error`:return s(),r(A,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),t(`div`,{class:y([`${n}-alert-body`,this.mergedBordered&&`${n}-alert-body--bordered`])},[S(()=>l(i.header,t=>{let r=t||this.title;return r?(s(),e(`div`,{key:2,class:y(`${n}-alert-body__title`)},[S(()=>r)],2)):null})),S(()=>i.default&&(s(),e(`div`,{class:y(`${n}-alert-body__content`)},[S(()=>i.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};