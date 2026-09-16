import{B as e,Cn as t,Dn as n,Gn as r,St as i,Tn as a,_t as o,in as s,jn as c,mt as l,nn as u,pt as d,sn as f,tn as p,wn as m,xr as h,yn as g,z as _}from"./endpoints-gDUDUnKI.js";import{t as v}from"./use-locale-fRdQHsG2.js";import{t as y}from"./light-yhMVA8HW.js";import{xt as b}from"./index-DmEbPUOi.js";var x=c({name:`Empty`,render(){return(()=>{let e=d(`15c1a247ae156450`);return e[0]||=m(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[m(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),m(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`})],-1)})()}}),S=u(`empty`,`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[s(`icon`,`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[p(`+`,[s(`description`,`
 margin-top: 8px;
 `)])]),s(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),s(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),C={..._.props,description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function},w=c({name:`Empty`,props:C,slots:Object,setup(n){let{mergedClsPrefixRef:o,inlineThemeDisabled:s,mergedComponentPropsRef:c}=i(n),l=_(`Empty`,`-empty`,S,y,n,o),{localeRef:u}=v(`Empty`),d=t(()=>n.description??c?.value?.Empty?.description),p=t(()=>c?.value?.Empty?.renderIcon||(()=>(r(),a(x)))),m=t(()=>{let{size:e}=n,{common:{cubicBezierEaseInOut:t},self:{[f(`iconSize`,e)]:r,[f(`fontSize`,e)]:i,textColor:a,iconColor:o,extraTextColor:s}}=l.value;return{"--n-icon-size":r,"--n-font-size":i,"--n-bezier":t,"--n-text-color":a,"--n-icon-color":o,"--n-extra-text-color":s}}),h=s?e(`empty`,t(()=>{let e=``,{size:t}=n;return e+=t[0],e}),m,n):void 0;return{mergedClsPrefix:o,mergedRenderIcon:p,localizedDescription:t(()=>d.value||u.value.description),cssVars:s?void 0:m,themeClass:h?.themeClass,onRender:h?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:i}=this;return i?.(),r(),n(`div`,{class:l([`${t}-empty`,this.themeClass]),style:h(this.cssVars)},[this.showIcon?(r(),n(`div`,{key:0,class:l(`${t}-empty__icon`)},[e.icon?(r(),n(g,{key:0},[o(()=>e.icon())],64)):(r(),a(b,{key:1,clsPrefix:t},{default:this.mergedRenderIcon},1032,[`clsPrefix`]))],2)):o(()=>null),this.showDescription?(r(),n(`div`,{key:2,class:l(`${t}-empty__description`)},[e.default?(r(),n(g,{key:0},[o(()=>e.default())],64)):(r(),n(g,{key:1},[o(()=>this.localizedDescription)],64))],2)):o(()=>null),e.extra?(r(),n(`div`,{key:4,class:l(`${t}-empty__extra`)},[o(()=>e.extra())],2)):o(()=>null)],6)}});export{w as t};