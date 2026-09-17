import{A as e,An as t,B as n,Dt as r,F as i,H as a,In as o,K as s,Mn as c,N as l,O as u,On as d,St as f,U as p,Vn as m,X as h,Xn as g,Y as _,fn as v,gr as y,gt as b,kn as x,ln as S,on as C,sn as w,un as T,yt as E}from"./endpoints-D7YssODM.js";import{G as D,H as O,K as k,U as A,V as j,W as M,q as N}from"./index-CTz7zfxj.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:p,infoColor:m,successColor:g,warningColor:v,errorColor:y,fontSize:b}=e;return{...k,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:p,borderInfo:`1px solid ${h(i,_(m,{alpha:.25}))}`,colorInfo:h(i,_(m,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:m,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:u,closeIconColorInfo:d,closeIconColorHoverInfo:f,closeIconColorPressedInfo:p,borderSuccess:`1px solid ${h(i,_(g,{alpha:.25}))}`,colorSuccess:h(i,_(g,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:g,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:u,closeIconColorSuccess:d,closeIconColorHoverSuccess:f,closeIconColorPressedSuccess:p,borderWarning:`1px solid ${h(i,_(v,{alpha:.33}))}`,colorWarning:h(i,_(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:u,closeIconColorWarning:d,closeIconColorHoverWarning:f,closeIconColorPressedWarning:p,borderError:`1px solid ${h(i,_(y,{alpha:.25}))}`,colorError:h(i,_(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:u,closeIconColorError:d,closeIconColorHoverError:f,closeIconColorPressedError:p}}var F={name:`Alert`,common:s,self:P},I=w(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[S(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),T(`closable`,[w(`alert-body`,[S(`title`,`
 padding-right: 24px;
 `)])]),S(`icon`,{color:`var(--n-icon-color)`}),w(`alert-body`,{padding:`var(--n-padding)`},[S(`title`,{color:`var(--n-title-text-color)`}),S(`content`,{color:`var(--n-content-text-color)`})]),j({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),S(`icon`,`
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
 `),S(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),T(`show-icon`,[w(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),T(`right-adjust`,[w(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),w(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[S(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[C(`& +`,[S(`content`,{marginTop:`9px`})])]),S(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),S(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...a.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=o({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(t){let{mergedClsPrefixRef:n,mergedBorderedRef:i,inlineThemeDisabled:o,mergedRtlRef:s}=r(t),c=a(`Alert`,`-alert`,I,F,t,n),l=e(`Alert`,s,n),u=d(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=c.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:s,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:g}=n,{type:_}=t,{left:y,right:x}=b(l);return{"--n-bezier":e,"--n-color":n[v(`color`,_)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[v(`closeColorHover`,_)],"--n-close-color-pressed":n[v(`closeColorPressed`,_)],"--n-close-icon-color":n[v(`closeIconColor`,_)],"--n-close-icon-color-hover":n[v(`closeIconColorHover`,_)],"--n-close-icon-color-pressed":n[v(`closeIconColorPressed`,_)],"--n-icon-color":n[v(`iconColor`,_)],"--n-border":n[v(`border`,_)],"--n-title-text-color":n[v(`titleTextColor`,_)],"--n-content-text-color":n[v(`contentTextColor`,_)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":s,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":g,"--n-icon-margin-left":y,"--n-icon-margin-right":x}}),f=o?p(`alert`,d(()=>t.type[0]),u,t):void 0,m=y(!0),h=()=>{let{onAfterLeave:e,onAfterHide:n}=t;e&&e(),n&&n()};return{rtlEnabled:l,mergedClsPrefix:n,mergedBordered:i,visible:m,handleCloseClick:()=>{Promise.resolve(t.onClose?.()).then(e=>{e!==!1&&(m.value=!1)})},handleAfterLeave:()=>{h()},mergedTheme:c,cssVars:o?void 0:u,themeClass:f?.themeClass,onRender:f?.onRender}},render(){return this.onRender?.(),g(),t(u,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:r}=this,a={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(g(),c(`div`,m({key:1},m(this.$attrs,a)),[f(()=>this.closable&&(g(),t(N,{clsPrefix:e,class:E(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),f(()=>this.bordered&&(g(),c(`div`,{class:E(`${e}-alert__border`)},null,2))),f(()=>this.showIcon&&(g(),c(`div`,{class:E(`${e}-alert__icon`),"aria-hidden":`true`},[f(()=>l(r.icon,()=>[(g(),t(n,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return g(),t(A,{key:3});case`info`:return g(),t(M,{key:4});case`warning`:return g(),t(O,{key:5});case`error`:return g(),t(D,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),x(`div`,{class:E([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[f(()=>i(r.header,t=>{let n=t||this.title;return n?(g(),c(`div`,{key:2,class:E(`${e}-alert-body__title`)},[f(()=>n)],2)):null})),f(()=>r.default&&(g(),c(`div`,{class:E(`${e}-alert-body__content`)},[f(()=>r.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};