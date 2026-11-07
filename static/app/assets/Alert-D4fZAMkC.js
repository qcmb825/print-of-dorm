import{J as e,Q as t,Ut as n,X as r,Y as i,bt as a,dt as o,it as s}from"./endpoints-B5qu1zMG.js";import{$t as c,B as l,D as u,F as d,I as f,L as p,S as m,V as h,Xt as g,Zt as _,_t as v,en as y,ft as b,k as x,lt as S,nn as C,ot as w,w as T}from"./motion-amoZaQIY.js";import{C as E,E as D,S as O,T as k,Z as A,w as j,x as M}from"./index-DetkDE_U.js";var N={iconMargin:`11px 8px 0 12px`,iconMarginRtl:`11px 12px 0 8px`,iconSize:`24px`,closeIconSize:`16px`,closeSize:`20px`,closeMargin:`13px 14px 0 0`,closeMarginRtl:`13px 0 0 14px`,padding:`13px`};function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...N,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:u,closeColorPressed:d,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:m,borderInfo:`1px solid ${h(i,l(g,{alpha:.25}))}`,colorInfo:h(i,l(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:c,closeColorHoverInfo:u,closeColorPressedInfo:d,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:m,borderSuccess:`1px solid ${h(i,l(_,{alpha:.25}))}`,colorSuccess:h(i,l(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:c,closeColorHoverSuccess:u,closeColorPressedSuccess:d,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:m,borderWarning:`1px solid ${h(i,l(v,{alpha:.33}))}`,colorWarning:h(i,l(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:u,closeColorPressedWarning:d,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:m,borderError:`1px solid ${h(i,l(y,{alpha:.25}))}`,colorError:h(i,l(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:u,closeColorPressedError:d,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:m}}var F={name:`Alert`,common:p,self:P},I=_(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[c(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),y(`closable`,[_(`alert-body`,[c(`title`,`
 padding-right: 24px;
 `)])]),c(`icon`,{color:`var(--n-icon-color)`}),_(`alert-body`,{padding:`var(--n-padding)`},[c(`title`,{color:`var(--n-title-text-color)`}),c(`content`,{color:`var(--n-content-text-color)`})]),M({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),c(`icon`,`
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
 `),c(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),y(`show-icon`,[_(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),y(`right-adjust`,[_(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),_(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[c(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[g(`& +`,[c(`content`,{marginTop:`9px`})])]),c(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),c(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...d.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=s({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(t){let{mergedClsPrefixRef:r,mergedBorderedRef:i,inlineThemeDisabled:a,mergedRtlRef:o}=v(t),s=d(`Alert`,`-alert`,I,F,t,r),c=T(`Alert`,o,r),l=e(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=s.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:g}=n,{type:_}=t,{left:v,right:y}=w(l);return{"--n-bezier":e,"--n-color":n[C(`color`,_)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[C(`closeColorHover`,_)],"--n-close-color-pressed":n[C(`closeColorPressed`,_)],"--n-close-icon-color":n[C(`closeIconColor`,_)],"--n-close-icon-color-hover":n[C(`closeIconColorHover`,_)],"--n-close-icon-color-pressed":n[C(`closeIconColorPressed`,_)],"--n-icon-color":n[C(`iconColor`,_)],"--n-border":n[C(`border`,_)],"--n-title-text-color":n[C(`titleTextColor`,_)],"--n-content-text-color":n[C(`contentTextColor`,_)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":g,"--n-icon-margin-left":v,"--n-icon-margin-right":y}}),u=a?f(`alert`,e(()=>t.type[0]),l,t):void 0,p=n(!0),m=()=>{let{onAfterLeave:e,onAfterHide:n}=t;e&&e(),n&&n()};return{rtlEnabled:c,mergedClsPrefix:r,mergedBordered:i,visible:p,handleCloseClick:()=>{Promise.resolve(t.onClose?.()).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:s,cssVars:a?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){return this.onRender?.(),a(),r(m,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:n}=this,s={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(a(),t(`div`,o({key:1},o(this.$attrs,s)),[b(()=>this.closable&&(a(),r(D,{clsPrefix:e,class:S(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),b(()=>this.bordered&&(a(),t(`div`,{class:S(`${e}-alert__border`)},null,2))),b(()=>this.showIcon&&(a(),t(`div`,{class:S(`${e}-alert__icon`),"aria-hidden":`true`},[b(()=>u(n.icon,()=>[(a(),r(A,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return a(),r(E,{key:3});case`info`:return a(),r(j,{key:4});case`warning`:return a(),r(O,{key:5});case`error`:return a(),r(k,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),i(`div`,{class:S([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[b(()=>x(n.header,n=>{let r=n||this.title;return r?(a(),t(`div`,{key:2,class:S(`${e}-alert-body__title`)},[b(()=>r)],2)):null})),b(()=>n.default&&(a(),t(`div`,{class:S(`${e}-alert-body__content`)},[b(()=>n.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};