import{$ as e,A as t,D as n,E as r,I as i,O as a,St as o,U as s}from"./useApi-BPuI6ZR9-BM-pFei4.js";import{A as c,Ht as l,M as u,O as d,Rt as f,S as p,Vt as m,Wt as h,Z as g,_,at as v,b as y,et as b,h as x,j as S,k as C,zt as w}from"./createLucideIcon-ClRkaCjD.js";import{A as T,M as E,N as D,P as O,at as k,j as A,k as j,ut as M}from"./index-CqtBduvV.js";var N={iconMargin:`11px 8px 0 12px`,iconMarginRtl:`11px 12px 0 8px`,iconSize:`24px`,closeIconSize:`16px`,closeSize:`20px`,closeMargin:`13px 14px 0 0`,closeMarginRtl:`13px 0 0 14px`,padding:`13px`};function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,infoColor:h,successColor:g,warningColor:_,errorColor:v,fontSize:y}=e;return{...N,fontSize:y,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,borderInfo:`1px solid ${u(i,S(h,{alpha:.25}))}`,colorInfo:u(i,S(h,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:h,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:m,borderSuccess:`1px solid ${u(i,S(g,{alpha:.25}))}`,colorSuccess:u(i,S(g,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:g,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:m,borderWarning:`1px solid ${u(i,S(_,{alpha:.33}))}`,colorWarning:u(i,S(_,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:_,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:m,borderError:`1px solid ${u(i,S(v,{alpha:.25}))}`,colorError:u(i,S(v,{alpha:.08})),titleTextColorError:s,iconColorError:v,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:m}}var F={name:`Alert`,common:c,self:P},I=w(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[m(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),l(`closable`,[w(`alert-body`,[m(`title`,`
 padding-right: 24px;
 `)])]),m(`icon`,{color:`var(--n-icon-color)`}),w(`alert-body`,{padding:`var(--n-padding)`},[m(`title`,{color:`var(--n-title-text-color)`}),m(`content`,{color:`var(--n-content-text-color)`})]),j({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),m(`icon`,`
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
 `),m(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),l(`show-icon`,[w(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),l(`right-adjust`,[w(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),w(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[m(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[f(`& +`,[m(`content`,{marginTop:`9px`})])]),m(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),m(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...d.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=i({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,inlineThemeDisabled:i,mergedRtlRef:a}=v(e),s=d(`Alert`,`-alert`,I,F,e,t),c=_(`Alert`,a,t),l=r(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=s.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:g,padding:_}=n,{type:v}=e,{left:y,right:b}=M(l);return{"--n-bezier":t,"--n-color":n[h(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[h(`closeColorHover`,v)],"--n-close-color-pressed":n[h(`closeColorPressed`,v)],"--n-close-icon-color":n[h(`closeIconColor`,v)],"--n-close-icon-color-hover":n[h(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[h(`closeIconColorPressed`,v)],"--n-icon-color":n[h(`iconColor`,v)],"--n-border":n[h(`border`,v)],"--n-title-text-color":n[h(`titleTextColor`,v)],"--n-content-text-color":n[h(`contentTextColor`,v)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":g,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":b}}),u=i?C(`alert`,r(()=>e.type[0]),l,e):void 0,f=o(!0),p=()=>{let{onAfterLeave:t,onAfterHide:n}=e;t&&t(),n&&n()};return{rtlEnabled:c,mergedClsPrefix:t,mergedBordered:n,visible:f,handleCloseClick:()=>{Promise.resolve(e.onClose?.()).then(e=>{e!==!1&&(f.value=!1)})},handleAfterLeave:()=>{p()},mergedTheme:s,cssVars:i?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){return this.onRender?.(),e(),a(x,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:r,$slots:i}=this,o={class:[`${r}-alert`,this.themeClass,this.closable&&`${r}-alert--closable`,this.showIcon&&`${r}-alert--show-icon`,!this.title&&this.closable&&`${r}-alert--right-adjust`,this.rtlEnabled&&`${r}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(e(),t(`div`,s({key:1},s(this.$attrs,o)),[b(()=>this.closable&&(e(),a(O,{clsPrefix:r,class:g(`${r}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),b(()=>this.bordered&&(e(),t(`div`,{class:g(`${r}-alert__border`)},null,2))),b(()=>this.showIcon&&(e(),t(`div`,{class:g(`${r}-alert__icon`),"aria-hidden":`true`},[b(()=>y(i.icon,()=>[(e(),a(k,{clsPrefix:r},{default:()=>{switch(this.type){case`success`:return e(),a(A,{key:3});case`info`:return e(),a(E,{key:4});case`warning`:return e(),a(T,{key:5});case`error`:return e(),a(D,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),n(`div`,{class:g([`${r}-alert-body`,this.mergedBordered&&`${r}-alert-body--bordered`])},[b(()=>p(i.header,n=>{let i=n||this.title;return i?(e(),t(`div`,{key:2,class:g(`${r}-alert-body__title`)},[b(()=>i)],2)):null})),b(()=>i.default&&(e(),t(`div`,{class:g(`${r}-alert-body__content`)},[b(()=>i.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};