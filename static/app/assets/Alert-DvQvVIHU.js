import{A as e,An as t,B as n,Cn as r,D as i,En as a,Fn as o,M as s,R as c,Sn as l,T as u,U as d,W as f,Wn as p,en as m,gt as h,in as g,on as _,pt as v,rn as y,tn as b,ur as x,ut as S,wn as C,xt as w,z as T}from"./endpoints-C6WHjh8m.js";import{B as E,G as D,H as O,U as k,V as A,W as j,X as M,z as N}from"./index-Bx-xSnBt.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:u,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...j,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:u,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${f(i,d(g,{alpha:.25}))}`,colorInfo:f(i,d(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:u,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${f(i,d(_,{alpha:.25}))}`,colorSuccess:f(i,d(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:u,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${f(i,d(v,{alpha:.33}))}`,colorWarning:f(i,d(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:u,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${f(i,d(y,{alpha:.25}))}`,colorError:f(i,d(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:u,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h}}var F={name:`Alert`,common:n,self:P},I=b(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[y(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),g(`closable`,[b(`alert-body`,[y(`title`,`
 padding-right: 24px;
 `)])]),y(`icon`,{color:`var(--n-icon-color)`}),b(`alert-body`,{padding:`var(--n-padding)`},[y(`title`,{color:`var(--n-title-text-color)`}),y(`content`,{color:`var(--n-content-text-color)`})]),N({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),y(`icon`,`
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
 `),y(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),g(`show-icon`,[b(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),g(`right-adjust`,[b(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),b(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[y(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[m(`& +`,[y(`content`,{marginTop:`9px`})])]),y(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),y(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...c.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=t({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:r,mergedRtlRef:a}=w(e),o=c(`Alert`,`-alert`,I,F,e,t),s=i(`Alert`,a,t),u=l(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:s,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:g}=n,{type:v}=e,{left:y,right:b}=S(l);return{"--n-bezier":t,"--n-color":n[_(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[_(`closeColorHover`,v)],"--n-close-color-pressed":n[_(`closeColorPressed`,v)],"--n-close-icon-color":n[_(`closeIconColor`,v)],"--n-close-icon-color-hover":n[_(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[_(`closeIconColorPressed`,v)],"--n-icon-color":n[_(`iconColor`,v)],"--n-border":n[_(`border`,v)],"--n-title-text-color":n[_(`titleTextColor`,v)],"--n-content-text-color":n[_(`contentTextColor`,v)],"--n-line-height":s,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":g,"--n-icon-margin-left":y,"--n-icon-margin-right":b}}),d=r?T(`alert`,l(()=>e.type[0]),u,e):void 0,f=x(!0),p=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:s,mergedClsPrefix:t,mergedBordered:n,visible:f,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(f.value=!1)})},handleAfterLeave:()=>{p()},mergedTheme:o,cssVars:r?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){return this.onRender?.(),p(),C(u,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:t,$slots:n}=this,i={class:[`${t}-alert`,this.themeClass,this.closable&&`${t}-alert--closable`,this.showIcon&&`${t}-alert--show-icon`,!this.title&&this.closable&&`${t}-alert--right-adjust`,this.rtlEnabled&&`${t}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(p(),a(`div`,o({key:1},o(this.$attrs,i)),[h(()=>this.closable&&(p(),C(D,{clsPrefix:t,class:v(`${t}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),h(()=>this.bordered&&(p(),a(`div`,{class:v(`${t}-alert__border`)},null,2))),h(()=>this.showIcon&&(p(),a(`div`,{class:v(`${t}-alert__icon`),"aria-hidden":`true`},[h(()=>e(n.icon,()=>[(p(),C(M,{clsPrefix:t},{default:()=>{switch(this.type){case`success`:return p(),C(A,{key:3});case`info`:return p(),C(O,{key:4});case`warning`:return p(),C(E,{key:5});case`error`:return p(),C(k,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),r(`div`,{class:v([`${t}-alert-body`,this.mergedBordered&&`${t}-alert-body--bordered`])},[h(()=>s(n.header,e=>{let n=e||this.title;return n?(p(),a(`div`,{key:2,class:v(`${t}-alert-body__title`)},[h(()=>n)],2)):null})),h(()=>n.default&&(p(),a(`div`,{class:v(`${t}-alert-body__content`)},[h(()=>n.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};