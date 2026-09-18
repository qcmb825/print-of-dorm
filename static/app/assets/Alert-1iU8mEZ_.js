import{B as e,Pt as t,U as n,V as r,Y as i,dt as a,nt as o,z as s}from"./endpoints-C3DHQTsP.js";import{A as c,Gt as l,Jt as u,N as d,O as f,P as p,S as m,Wt as h,Xt as g,_,b as v,dt as y,et as b,h as x,k as S,ot as C,qt as w,rt as T}from"./Button-CRn1PyiM.js";import{t as E}from"./Icon-BdiaXn9O.js";import{B as D,G as O,H as k,U as A,V as j,W as M,z as N}from"./index-D7sZTP68.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:u,closeIconColor:f,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...M,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:u,closeIconColor:f,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${p(i,d(g,{alpha:.25}))}`,colorInfo:p(i,d(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:u,closeIconColorInfo:f,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${p(i,d(_,{alpha:.25}))}`,colorSuccess:p(i,d(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:u,closeIconColorSuccess:f,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${p(i,d(v,{alpha:.33}))}`,colorWarning:p(i,d(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:u,closeIconColorWarning:f,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${p(i,d(y,{alpha:.25}))}`,colorError:p(i,d(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:u,closeIconColorError:f,closeIconColorHoverError:m,closeIconColorPressedError:h}}var F={name:`Alert`,common:c,self:P},I=l(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[w(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),u(`closable`,[l(`alert-body`,[w(`title`,`
 padding-right: 24px;
 `)])]),w(`icon`,{color:`var(--n-icon-color)`}),l(`alert-body`,{padding:`var(--n-padding)`},[w(`title`,{color:`var(--n-title-text-color)`}),w(`content`,{color:`var(--n-content-text-color)`})]),N({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),w(`icon`,`
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
 `),w(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),u(`show-icon`,[l(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),u(`right-adjust`,[l(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),l(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[w(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[h(`& +`,[w(`content`,{marginTop:`9px`})])]),w(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),w(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...f.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=i({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:n,mergedBorderedRef:r,inlineThemeDisabled:i,mergedRtlRef:a}=y(e),o=f(`Alert`,`-alert`,I,F,e,n),c=_(`Alert`,a,n),l=s(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:s,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:_}=n,{type:v}=e,{left:y,right:x}=b(l);return{"--n-bezier":t,"--n-color":n[g(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[g(`closeColorHover`,v)],"--n-close-color-pressed":n[g(`closeColorPressed`,v)],"--n-close-icon-color":n[g(`closeIconColor`,v)],"--n-close-icon-color-hover":n[g(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[g(`closeIconColorPressed`,v)],"--n-icon-color":n[g(`iconColor`,v)],"--n-border":n[g(`border`,v)],"--n-title-text-color":n[g(`titleTextColor`,v)],"--n-content-text-color":n[g(`contentTextColor`,v)],"--n-line-height":s,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":x}}),u=i?S(`alert`,s(()=>e.type[0]),l,e):void 0,d=t(!0),p=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:c,mergedClsPrefix:n,mergedBordered:r,visible:d,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(d.value=!1)})},handleAfterLeave:()=>{p()},mergedTheme:o,cssVars:i?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){return this.onRender?.(),a(),r(x,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:t,$slots:i}=this,s={class:[`${t}-alert`,this.themeClass,this.closable&&`${t}-alert--closable`,this.showIcon&&`${t}-alert--show-icon`,!this.title&&this.closable&&`${t}-alert--right-adjust`,this.rtlEnabled&&`${t}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(a(),n(`div`,o({key:1},o(this.$attrs,s)),[C(()=>this.closable&&(a(),r(O,{clsPrefix:t,class:T(`${t}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),C(()=>this.bordered&&(a(),n(`div`,{class:T(`${t}-alert__border`)},null,2))),C(()=>this.showIcon&&(a(),n(`div`,{class:T(`${t}-alert__icon`),"aria-hidden":`true`},[C(()=>v(i.icon,()=>[(a(),r(E,{clsPrefix:t},{default:()=>{switch(this.type){case`success`:return a(),r(j,{key:3});case`info`:return a(),r(k,{key:4});case`warning`:return a(),r(D,{key:5});case`error`:return a(),r(A,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),e(`div`,{class:T([`${t}-alert-body`,this.mergedBordered&&`${t}-alert-body--bordered`])},[C(()=>m(i.header,e=>{let r=e||this.title;return r?(a(),n(`div`,{key:2,class:T(`${t}-alert-body__title`)},[C(()=>r)],2)):null})),C(()=>i.default&&(a(),n(`div`,{class:T(`${t}-alert-body__content`)},[C(()=>i.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};