import{C as e,E as t,J as n,M as r,S as i,_t as a,w as o,z as s}from"./endpoints-BqUstzml.js";import{$t as c,A as l,D as u,I as d,Jt as f,L as p,N as m,S as h,Xt as g,Zt as _,_ as v,b as y,h as b,k as x,lt as S,mt as C,ot as w,qt as T,rt as E}from"./Button-D6v1m03e.js";import{B as D,G as O,H as k,U as A,V as j,W as M,z as N}from"./index-Ch7pazmo.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:u,closeIconColor:f,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...M,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:u,closeIconColor:f,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${p(i,d(g,{alpha:.25}))}`,colorInfo:p(i,d(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:u,closeIconColorInfo:f,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${p(i,d(_,{alpha:.25}))}`,colorSuccess:p(i,d(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:u,closeIconColorSuccess:f,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${p(i,d(v,{alpha:.33}))}`,colorWarning:p(i,d(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:u,closeIconColorWarning:f,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${p(i,d(y,{alpha:.25}))}`,colorError:p(i,d(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:u,closeIconColorError:f,closeIconColorHoverError:m,closeIconColorPressedError:h}}var F={name:`Alert`,common:m,self:P},I=f(`alert`,`
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
 `),_(`closable`,[f(`alert-body`,[g(`title`,`
 padding-right: 24px;
 `)])]),g(`icon`,{color:`var(--n-icon-color)`}),f(`alert-body`,{padding:`var(--n-padding)`},[g(`title`,{color:`var(--n-title-text-color)`}),g(`content`,{color:`var(--n-content-text-color)`})]),N({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),g(`icon`,`
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
 `),_(`show-icon`,[f(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),_(`right-adjust`,[f(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),f(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[g(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[T(`& +`,[g(`content`,{marginTop:`9px`})])]),g(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),g(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...x.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=r({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:r,mergedRtlRef:o}=C(e),s=x(`Alert`,`-alert`,I,F,e,t),u=v(`Alert`,o,t),d=i(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=s.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:l,iconMargin:u,iconMarginRtl:d,closeIconSize:f,closeBorderRadius:p,closeSize:m,closeMargin:h,closeMarginRtl:g,padding:_}=n,{type:v}=e,{left:y,right:b}=E(u);return{"--n-bezier":t,"--n-color":n[c(`color`,v)],"--n-close-icon-size":f,"--n-close-border-radius":p,"--n-close-color-hover":n[c(`closeColorHover`,v)],"--n-close-color-pressed":n[c(`closeColorPressed`,v)],"--n-close-icon-color":n[c(`closeIconColor`,v)],"--n-close-icon-color-hover":n[c(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[c(`closeIconColorPressed`,v)],"--n-icon-color":n[c(`iconColor`,v)],"--n-border":n[c(`border`,v)],"--n-title-text-color":n[c(`titleTextColor`,v)],"--n-content-text-color":n[c(`contentTextColor`,v)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":l,"--n-icon-margin":u,"--n-icon-margin-rtl":d,"--n-close-size":m,"--n-close-margin":h,"--n-close-margin-rtl":g,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":b}}),f=r?l(`alert`,i(()=>e.type[0]),d,e):void 0,p=a(!0),m=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:u,mergedClsPrefix:t,mergedBordered:n,visible:p,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:s,cssVars:r?void 0:d,themeClass:f?.themeClass,onRender:f?.onRender}},render(){return this.onRender?.(),n(),o(b,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:r,$slots:i}=this,a={class:[`${r}-alert`,this.themeClass,this.closable&&`${r}-alert--closable`,this.showIcon&&`${r}-alert--show-icon`,!this.title&&this.closable&&`${r}-alert--right-adjust`,this.rtlEnabled&&`${r}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(n(),t(`div`,s({key:1},s(this.$attrs,a)),[S(()=>this.closable&&(n(),o(O,{clsPrefix:r,class:w(`${r}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),S(()=>this.bordered&&(n(),t(`div`,{class:w(`${r}-alert__border`)},null,2))),S(()=>this.showIcon&&(n(),t(`div`,{class:w(`${r}-alert__icon`),"aria-hidden":`true`},[S(()=>y(i.icon,()=>[(n(),o(u,{clsPrefix:r},{default:()=>{switch(this.type){case`success`:return n(),o(j,{key:3});case`info`:return n(),o(k,{key:4});case`warning`:return n(),o(D,{key:5});case`error`:return n(),o(A,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),e(`div`,{class:w([`${r}-alert-body`,this.mergedBordered&&`${r}-alert-body--bordered`])},[S(()=>h(i.header,e=>{let i=e||this.title;return i?(n(),t(`div`,{key:2,class:w(`${r}-alert-body__title`)},[S(()=>i)],2)):null})),S(()=>i.default&&(n(),t(`div`,{class:w(`${r}-alert-body__content`)},[S(()=>i.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};