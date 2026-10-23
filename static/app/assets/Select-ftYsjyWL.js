import{At as e,H as t,Ht as n,J as r,Nt as i,St as a,Y as o,Z as s,bt as c,ct as l,dn as u,dt as d,ft as f,gt as p,ht as m,kt as h,mt as g,nt as _,ot as v,q as y,qt as b,rt as x,ut as S,yt as C}from"./endpoints-o6zgEJYN.js";import{A as w,C as T,D as E,E as D,Gt as O,Jt as k,Kt as A,P as j,T as M,Xt as N,Yt as P,Zt as F,_ as I,an as L,at as R,et as z,ft as ee,h as te,ht as B,it as V,j as H,k as U,lt as ne,nn as W,nt as G,rt as K,st as q,tt as J,u as Y,v as re,x as ie}from"./createLucideIcon-BgcK-14v.js";import{a as ae,n as X}from"./Input-8JTLmgfk.js";import{c as Z,d as oe,f as se,l as ce,n as le,o as ue,p as de,r as fe,s as pe,t as me,u as he}from"./create-CdTL5KYz.js";import{n as ge,r as _e,t as ve}from"./cssr-5PC8QTWR.js";import{t as ye}from"./use-merged-state-C2JTXN1m.js";import{$ as be,B as xe,Dt as Se,Et as Ce,P as we,Tt as Te,U as Ee,W as Q,Z as De,dt as Oe,et as ke,it as Ae,rt as je,st as Me,wt as Ne,z as Pe}from"./index-Ci7_zaLo.js";var Fe=x({name:`Empty`,render(){return(()=>{let e=K(`15c1a247ae156450`);return e[0]||=r(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[r(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),r(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`})],-1)})()}}),Ie=A(`empty`,`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[k(`icon`,`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[O(`+`,[k(`description`,`
 margin-top: 8px;
 `)])]),k(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),k(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Le={...U.props,description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function},Re=x({name:`Empty`,props:Le,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=ee(e),i=U(`Empty`,`-empty`,Ie,Ce,e,t),{localeRef:a}=ae(`Empty`),s=y(()=>e.description??r?.value?.Empty?.description),c=y(()=>r?.value?.Empty?.renderIcon||(()=>(C(),o(Fe)))),l=y(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{[F(`iconSize`,t)]:r,[F(`fontSize`,t)]:a,textColor:o,iconColor:s,extraTextColor:c}}=i.value;return{"--n-icon-size":r,"--n-font-size":a,"--n-bezier":n,"--n-text-color":o,"--n-icon-color":s,"--n-extra-text-color":c}}),u=n?w(`empty`,y(()=>{let t=``,{size:n}=e;return t+=n[0],t}),l,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:c,localizedDescription:y(()=>s.value||a.value.description),cssVars:n?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{$slots:e,mergedClsPrefix:n,onRender:r}=this;return r?.(),C(),s(`div`,{class:V([`${n}-empty`,this.themeClass]),style:u(this.cssVars)},[this.showIcon?(C(),s(`div`,{key:0,class:V(`${n}-empty__icon`)},[e.icon?(C(),s(t,{key:0},[q(()=>e.icon())],64)):(C(),o(Te,{key:1,clsPrefix:n},{default:this.mergedRenderIcon},1032,[`clsPrefix`]))],2)):q(()=>null),this.showDescription?(C(),s(`div`,{key:2,class:V(`${n}-empty__description`)},[e.default?(C(),s(t,{key:0},[q(()=>e.default())],64)):(C(),s(t,{key:1},[q(()=>this.localizedDescription)],64))],2)):q(()=>null),e.extra?(C(),s(`div`,{key:4,class:V(`${n}-empty__extra`)},[q(()=>e.extra())],2)):q(()=>null)],6)}});function ze(e){return e&-e}var Be=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=ze(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=ze(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Ve;function He(){return typeof document>`u`?!1:(Ve===void 0&&(Ve=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Ve)}var Ue;function We(){return typeof document>`u`?1:(Ue===void 0&&(Ue=`chrome`in window?window.devicePixelRatio:1),Ue)}var Ge=`VVirtualListXScroll`;function Ke({columnsRef:e,renderColRef:t,renderItemWithColsRef:r}){let i=n(0),a=n(0),o=y(()=>{let t=e.value;if(t.length===0)return null;let n=new Be(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=E(()=>{let e=o.value;return e===null?0:Math.max(e.getBound(a.value)-1,0)}),l=e=>{let t=o.value;return t===null?0:t.sum(e)},u=E(()=>{let t=o.value;return t===null?0:Math.min(t.getBound(a.value+i.value)+1,e.value.length-1)});return c(Ge,{startIndexRef:s,endIndexRef:u,columnsRef:e,renderColRef:t,renderItemWithColsRef:r,getLeft:l}),{listWidthRef:i,scrollLeftRef:a}}var qe=x({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=l(Ge);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),Je=ve(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[ve(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[ve(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ye=x({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=ne();Je.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:ge,ssr:t}),p(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&S({key:n}):S({index:t})});let r=!1,i=!1;f(()=>{if(r=!1,!i){i=!0;return}S({top:_.value,left:s.value})}),m(()=>{r=!0,i||=!0});let a=E(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=y(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=Ke({columnsRef:b(e,`columns`),renderColRef:b(e,`renderCol`),renderItemWithColsRef:b(e,`renderItemWithCols`)}),l=n(null),u=n(void 0),d=new Map,h=y(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Be(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=d.get(n);a!==void 0&&i.add(t,a)}),i}),g=n(0),_=n(0),v=E(()=>Math.max(h.value.getBound(_.value-z(e.paddingTop))-1,0)),x=y(()=>{let{value:t}=u;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=v.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),S=(e,t)=>{if(typeof e==`number`){D(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)D(n,r,c);else if(i!==void 0)T(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&T(e,c,l)}else s===`bottom`?D(0,2**53-1,c):s===`top`&&D(0,0,c)},C,w=null;function T(t,n,r){let i=l.value;if(i==null)return;let{value:a}=h,o=a.sum(t)+z(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{C=t,w!==null&&window.clearTimeout(w),w=window.setTimeout(()=>{C=void 0,w=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function D(e,t,n){l.value?.scrollTo({left:e,top:t,behavior:n})}function O(t,n){if(r||e.ignoreItemResize||F(n.target))return;let{value:i}=h,a=o.value.get(t),s=i.get(a),c=n.borderBoxSize?.[0]?.blockSize??n.contentRect.height;if(c===s)return;c-e.itemSize===0?d.delete(t):d.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(a,u);let f=l.value;if(f!=null){if(C===void 0){let e=i.sum(a);f.scrollTop>e&&f.scrollBy(0,u)}else(a<C||a===C&&c+i.sum(a)>f.scrollTop+f.offsetHeight)&&f.scrollBy(0,u);P()}g.value++}let k=!He(),A=!1;function j(t){var n;(n=e.onScroll)==null||n.call(e,t),(!k||!A)&&P()}function M(t){var n;if((n=e.onWheel)==null||n.call(e,t),k){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/We(),e.scrollLeft+=t.deltaX/We(),P(),A=!0,de(()=>{A=!1})}}}function N(t){if(r||F(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===u.value)return}else if(t.contentRect.height===u.value&&t.contentRect.width===c.value)return;u.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:n}=e;n!==void 0&&n(t)}function P(){let{value:e}=l;e!=null&&(_.value=e.scrollTop,s.value=e.scrollLeft)}function F(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:u,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:y(()=>{let{itemResizable:t}=e,n=G(h.value.sum());return g.value,[e.itemsStyle,{boxSizing:`content-box`,width:G(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:G(e.paddingTop),paddingBottom:G(e.paddingBottom)}]}),visibleItemsStyle:y(()=>(g.value,{transform:`translateY(${G(h.value.sum(v.value))})`})),viewportItems:x,listElRef:l,itemsElRef:n(null),scrollTo:S,handleListResize:N,handleListScroll:j,handleListWheel:M,handleItemResize:O}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return v(je,{onResize:this.handleListResize},{default:()=>{var i;return v(`div`,S(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):v(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[v(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:v(qe,{index:s,item:a}),l=i==null?void 0:v(qe,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?v(je,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Xe=ve(`[v-hidden]`,{display:`none!important`}),Ze=x({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let r=n(null),i=n(null);function a(n){let{value:a}=r,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?i.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(n.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let o=ne();return Xe.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:ge,ssr:o}),p(()=>a({showAllItemsBeforeCalculate:!1})),{selfRef:r,counterRef:i,sync:a}},render(){let{$slots:e}=this;return d(()=>this.sync({showAllItemsBeforeCalculate:!1})),v(`div`,{class:`v-overflow`,ref:`selfRef`},[a(e,`default`),e.counter?e.counter():v(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Qe(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:D,buttonColor2Pressed:O,fontWeightStrong:k}=e;return{...be,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:k,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:D,colorPressedCheckable:O,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${j(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:j(i,{alpha:.12}),colorBorderedPrimary:j(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:j(i,{alpha:.12}),closeColorPressedPrimary:j(i,{alpha:.18}),borderInfo:`1px solid ${j(a,{alpha:.3})}`,textColorInfo:a,colorInfo:j(a,{alpha:.12}),colorBorderedInfo:j(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:j(a,{alpha:.12}),closeColorPressedInfo:j(a,{alpha:.18}),borderSuccess:`1px solid ${j(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:j(o,{alpha:.12}),colorBorderedSuccess:j(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:j(o,{alpha:.12}),closeColorPressedSuccess:j(o,{alpha:.18}),borderWarning:`1px solid ${j(s,{alpha:.35})}`,textColorWarning:s,colorWarning:j(s,{alpha:.15}),colorBorderedWarning:j(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:j(s,{alpha:.12}),closeColorPressedWarning:j(s,{alpha:.18}),borderError:`1px solid ${j(c,{alpha:.23})}`,textColorError:c,colorError:j(c,{alpha:.1}),colorBorderedError:j(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:j(c,{alpha:.12}),closeColorPressedError:j(c,{alpha:.18})}}var $e={name:`Tag`,common:H,self:Qe},et={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},tt=A(`tag`,`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[P(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),k(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),k(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),k(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),k(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),P(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[k(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),k(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),P(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),P(`icon, avatar`,[P(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),P(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),P(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[N(`disabled`,[O(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[N(`checked`,`color: var(--n-text-color-hover-checkable);`)]),O(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[N(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),P(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[N(`disabled`,[O(`&:hover`,`background-color: var(--n-color-checked-hover);`),O(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),nt=[`onClick`,`onMouseenter`,`onMouseleave`],rt={...U.props,...et,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},it=B(`n-tag`),at=x({name:`Tag`,props:rt,slots:Object,setup(e){let t=n(null),{mergedBorderedRef:r,mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:o,mergedComponentPropsRef:s}=ee(e),l=y(()=>e.size||s?.value?.Tag?.size||`medium`),u=U(`Tag`,`-tag`,tt,$e,e,i);c(it,{roundRef:b(e,`round`)});function d(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function f(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&M(n,t)}}let p={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},m=re(`Tag`,o,i),h=y(()=>{let{type:t,color:{color:n,textColor:i}={}}=e,a=l.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[F(`colorBordered`,t)]:T,[F(`closeSize`,a)]:E,[F(`closeIconSize`,a)]:D,[F(`fontSize`,a)]:O,[F(`height`,a)]:k,[F(`color`,t)]:A,[F(`textColor`,t)]:j,[F(`border`,t)]:M,[F(`closeIconColor`,t)]:N,[F(`closeIconColorHover`,t)]:P,[F(`closeIconColorPressed`,t)]:I,[F(`closeColorHover`,t)]:L,[F(`closeColorPressed`,t)]:R}}=u.value,z=J(c);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":d,"--n-border":M,"--n-close-icon-size":D,"--n-close-color-pressed":R,"--n-close-color-hover":L,"--n-close-border-radius":C,"--n-close-icon-color":N,"--n-close-icon-color-hover":P,"--n-close-icon-color-pressed":I,"--n-close-icon-color-disabled":N,"--n-close-margin-top":z.top,"--n-close-margin-right":z.right,"--n-close-margin-bottom":z.bottom,"--n-close-margin-left":z.left,"--n-close-size":E,"--n-color":n||(r.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),g=a?w(`tag`,y(()=>{let t=``,{type:n,color:{color:i,textColor:a}={}}=e;return t+=n[0],t+=l.value[0],i&&(t+=`a${I(i)}`),a&&(t+=`b${I(a)}`),r.value&&(t+=`c`),t}),h,e):void 0;return{...p,rtlEnabled:m,mergedClsPrefix:i,contentRef:t,mergedBordered:r,handleClick:d,handleCloseClick:f,cssVars:a?void 0:h,themeClass:g?.themeClass,onRender:g?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:n,color:{borderColor:i}={},round:a,onRender:c,$slots:l}=this;c?.();let d=T(l.avatar,t=>t&&(C(),s(`div`,{class:V(`${e}-tag__avatar`)},[q(()=>t)],2))),f=T(l.icon,t=>t&&(C(),s(`div`,{class:V(`${e}-tag__icon`)},[q(()=>t)],2)));return C(),s(`div`,{class:V([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:a,[`${e}-tag--avatar`]:d,[`${e}-tag--icon`]:f,[`${e}-tag--closable`]:n}]),style:u(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[q(()=>f||d),r(`span`,{class:V(`${e}-tag__content`),ref:`contentRef`},[q(()=>this.$slots.default?.())],2),!this.checkable&&n?(C(),o(De,{key:0,clsPrefix:e,class:V(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):q(()=>null),!this.checkable&&this.mergedBordered?(C(),s(`div`,{key:2,class:V(`${e}-tag__border`),style:u({borderColor:i})},null,6)):q(()=>null)],46,nt)}});function ot(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function st(e,t){t&&(p(()=>{let{value:n}=e;n&&Ae.registerHandler(n,t)}),h(e,(e,t)=>{t&&Ae.unregisterHandler(t)},{deep:!1}),g(()=>{let{value:t}=e;t&&Ae.unregisterHandler(t)}))}var ct=x({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=K(`d16ead82505dc285`);return C(),s(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),lt=x({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=l(oe);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):Q(i[this.labelField],i,!1),c=(C(),s(`div`,S(a,{class:[`${e}-base-select-group-header`,a?.class]}),[q(()=>o)],16));return i.render?i.render({node:c,option:i}):n?n({node:c,option:i,selected:!1}):c}});function ut(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var dt=x({name:`Checkmark`,render(){return(()=>{let e=K(`3c84eac8ae4e1f96`);return e[0]||=r(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[r(`g`,{fill:`none`},[r(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ft=[`onClick`,`onMouseenter`,`onMousemove`];function pt(e,t){return C(),o(W,{name:`fade-in-scale-up-transition`},{default:()=>e?(C(),o(Te,{key:1,clsPrefix:t,class:V(`${t}-base-select-option__check`)},{default:()=>v(dt)},1032,[`clsPrefix`,`class`])):null},1024)}var mt=x({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:p}=l(oe),m=E(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:E(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:m,isSelected:E(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:i,isGrouped:a,showCheckmark:o,nodeProps:c,renderOption:l,renderLabel:u,handleClick:d,handleMouseEnter:f,handleMouseMove:p}=this,m=pt(n,e),h=u?[u(t,n),o&&m]:[Q(t[this.labelField],t,n),o&&m],g=c?.(t),_=(C(),s(`div`,S(g,{class:[`${e}-base-select-option`,t.class,g?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:i,[`${e}-base-select-option--show-checkmark`]:o}],style:[g?.style||``,t.style||``],onClick:ut([d,g?.onClick]),onMouseenter:ut([f,g?.onMouseenter]),onMousemove:ut([p,g?.onMousemove])}),[r(`div`,{class:V(`${e}-base-select-option__content`)},[q(()=>h)],2)],16,ft));return t.render?t.render({node:_,option:t,selected:n}):l?l({node:_,option:t,selected:n}):_}}),ht=A(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[A(`scrollbar`,`
 max-height: var(--n-height);
 `),A(`virtual-list`,`
 max-height: var(--n-height);
 `),A(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[k(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),A(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),A(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),k(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),k(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),k(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),k(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),A(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),A(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[P(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),O(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),O(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),P(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),P(`pending`,[O(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),P(`selected`,`
 color: var(--n-option-text-color-active);
 `,[O(`&::before`,`
 background-color: var(--n-option-color-active);
 `),P(`pending`,[O(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),P(`disabled`,`
 cursor: not-allowed;
 `,[N(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),P(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),k(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Ee({enterScale:`0.5`})])])]),gt=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],_t=x({name:`InternalSelectMenu`,props:{...U.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:r,mergedComponentPropsRef:i}=ee(e),a=re(`InternalSelectMenu`,r,t),o=U(`InternalSelectMenu`,`-internal-select-menu`,ht,Ne,e,b(e,`clsPrefix`)),s=n(null),l=n(null),u=n(null),f=y(()=>e.treeMate.getFlattenedNodes()),m=y(()=>le(f.value)),_=n(null);function v(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),H(n||null)}function x(){let{value:t}=_;t&&!e.treeMate.getNode(t.key)&&(_.value=null)}let S;h(()=>e.show,t=>{t?S=h(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?v():x(),d(ne)):x()},{immediate:!0}):S?.()},{immediate:!0}),g(()=>{S?.()});let C=y(()=>z(o.value.self[F(`optionHeight`,e.size)])),T=y(()=>J(o.value.self[F(`padding`,e.size)])),E=y(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),D=y(()=>{let e=f.value;return e&&e.length===0}),O=y(()=>i?.value?.Select?.renderEmpty);function k(t){let{onToggle:n}=e;n&&n(t)}function A(t){let{onScroll:n}=e;n&&n(t)}function j(e){u.value?.sync(),A(e)}function M(){u.value?.sync()}function N(){let{value:e}=_;return e||null}function P(e,t){t.disabled||H(t,!1)}function I(e,t){t.disabled||k(t)}function L(t){se(t,`action`)||e.onKeyup?.(t)}function R(t){se(t,`action`)||e.onKeydown?.(t)}function te(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function B(){let{value:e}=_;e&&H(e.getNext({loop:!0}),!0)}function V(){let{value:e}=_;e&&H(e.getPrev({loop:!0}),!0)}function H(e,t=!1){_.value=e,t&&ne()}function ne(){let t=_.value;if(!t)return;let n=m.value(t.key);n!==null&&(e.virtualScroll?l.value?.scrollTo({index:n}):u.value?.scrollTo({index:n,elSize:C.value}))}function W(t){s.value?.contains(t.target)&&e.onFocus?.(t)}function G(t){s.value?.contains(t.relatedTarget)||e.onBlur?.(t)}c(oe,{handleOptionMouseEnter:P,handleOptionClick:I,valueSetRef:E,pendingTmNodeRef:_,nodePropsRef:b(e,`nodeProps`),showCheckmarkRef:b(e,`showCheckmark`),multipleRef:b(e,`multiple`),valueRef:b(e,`value`),renderLabelRef:b(e,`renderLabel`),renderOptionRef:b(e,`renderOption`),labelFieldRef:b(e,`labelField`),valueFieldRef:b(e,`valueField`)}),c(he,s),p(()=>{let{value:e}=u;e&&e.sync()});let K=y(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[F(`optionFontSize`,t)]:x,[F(`optionHeight`,t)]:S,[F(`optionPadding`,t)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":J(C,`left`),"--n-option-padding-right":J(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:q}=e,Y=q?w(`internal-select-menu`,y(()=>e.size[0]),K,e):void 0,ie={selfRef:s,next:B,prev:V,getPendingTmNode:N};return st(s,e.onResize),{mergedTheme:o,mergedClsPrefix:t,rtlEnabled:a,virtualListRef:l,scrollbarRef:u,itemSize:C,padding:T,flattenedNodes:f,empty:D,mergedRenderEmpty:O,virtualListContainer(){let{value:e}=l;return e?.listElRef},virtualListContent(){let{value:e}=l;return e?.itemsElRef},doScroll:A,handleFocusin:W,handleFocusout:G,handleKeyUp:L,handleKeyDown:R,handleMouseDown:te,handleVirtualListResize:M,handleVirtualListScroll:j,cssVars:q?void 0:K,themeClass:Y?.themeClass,onRender:Y?.onRender,...ie}},render(){let{$slots:e,virtualScroll:n,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:c}=this;return c?.(),C(),s(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:V([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`]),style:u(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[q(()=>T(e.header,e=>e&&(C(),s(`div`,{class:V(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[q(()=>e)],2)))),this.loading?(C(),s(`div`,{key:0,class:V(`${r}-base-select-menu__loading`)},[(C(),o(Y,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(C(),s(t,{key:1},[this.empty?(C(),s(`div`,{key:1,class:V(`${r}-base-select-menu__empty`),"data-empty":!0},[q(()=>ie(e.empty,()=>[this.mergedRenderEmpty?.()||(C(),o(Re,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(C(),o(ke,S({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},this.scrollbarProps),{default:()=>n?(C(),o(Ye,{key:1,ref:`virtualListRef`,class:V(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(C(),o(lt,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(C(),o(mt,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(C(),s(`div`,{key:4,class:V(`${r}-base-select-menu-option-wrapper`),style:u({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[q(()=>this.flattenedNodes.map(e=>e.isGroup?(C(),o(lt,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(C(),o(mt,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),q(()=>T(e.action,e=>e&&[(C(),s(`div`,{class:V(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[q(()=>e)],2)),(C(),o(ct,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,gt)}});function vt(e){return e.type===`group`}function yt(e){return e.type===`ignored`}function bt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function xt(e,t){return{getIsGroup:vt,getIgnored:yt,getKey(t){return vt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function St(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(vt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(yt(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function Ct(e,t,n){let r=new Map;return e.forEach(e=>{vt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var wt=O([A(`base-selection`,`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[A(`base-loading`,`
 color: var(--n-loading-color);
 `),A(`base-selection-tags`,`min-height: var(--n-height);`),k(`border, state-border`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),k(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),A(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[k(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),A(`base-selection-overlay`,`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[k(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),A(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[k(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),A(`base-selection-tags`,`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),A(`base-selection-label`,`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[A(`base-selection-input`,`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[k(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),k(`render-label`,`
 color: var(--n-text-color);
 `)]),N(`disabled`,[O(`&:hover`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),P(`focus`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),P(`active`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),A(`base-selection-label`,`background-color: var(--n-color-active);`),A(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),P(`disabled`,`cursor: not-allowed;`,[k(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),A(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[A(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),k(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),A(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),A(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),A(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[k(`input`,`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),k(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>P(`${e}-status`,[k(`state-border`,`border: var(--n-border-${e});`),N(`disabled`,[O(`&:hover`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),P(`active`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),A(`base-selection-label`,`background-color: var(--n-color-active-${e});`),A(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),P(`focus`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),A(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),A(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[O(`&:last-child`,`padding-right: 0;`),A(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[k(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Tt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],Et=[`tabindex`],Dt=[`title`],Ot=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],kt=[`tabindex`],At=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],jt=x({name:`InternalSelection`,props:{...U.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(t){let{mergedClsPrefixRef:r,mergedRtlRef:i}=ee(t),a=re(`InternalSelection`,i,r),o=n(null),s=n(null),c=n(null),l=n(null),u=n(null),f=n(null),m=n(null),g=n(null),_=n(null),v=n(null),x=n(!1),S=n(!1),C=n(!1),T=U(`InternalSelection`,`-internal-selection`,wt,xe,t,b(t,`clsPrefix`)),E=y(()=>t.clearable&&!t.disabled&&(C.value||t.active)),D=y(()=>t.selectedOption?t.renderTag?t.renderTag({option:t.selectedOption,handleClose:()=>{}}):t.renderLabel?t.renderLabel(t.selectedOption,!0):Q(t.selectedOption[t.labelField],t.selectedOption,!0):t.placeholder),O=y(()=>{let e=t.selectedOption;if(e)return e[t.labelField]}),k=y(()=>t.multiple?!!(Array.isArray(t.selectedOptions)&&t.selectedOptions.length):t.selectedOption!==null);function A(){let{value:e}=o;if(e){let{value:n}=s;n&&(n.style.width=`${e.offsetWidth}px`,t.maxTagCount!==`responsive`&&_.value?.sync({showAllItemsBeforeCalculate:!1}))}}function j(){let{value:e}=v;e&&(e.style.display=`none`)}function M(){let{value:e}=v;e&&(e.style.display=`inline-block`)}h(b(t,`active`),e=>{e||j()}),h(b(t,`pattern`),()=>{t.multiple&&d(A)});function N(e){let{onFocus:n}=t;n&&n(e)}function P(e){let{onBlur:n}=t;n&&n(e)}function I(e){let{onDeleteOption:n}=t;n&&n(e)}function L(e){let{onClear:n}=t;n&&n(e)}function R(e){let{onPatternInput:n}=t;n&&n(e)}function z(e){(!e.relatedTarget||!c.value?.contains(e.relatedTarget))&&N(e)}function te(e){c.value?.contains(e.relatedTarget)||P(e)}function B(e){L(e)}function V(){C.value=!0}function H(){C.value=!1}function ne(e){t.active&&t.filterable&&e.target!==s.value&&e.preventDefault()}function W(e){I(e)}let G=n(!1);function K(e){if(e.key===`Backspace`&&!G.value&&!t.pattern.length){let{selectedOptions:e}=t;e?.length&&W(e[e.length-1])}}let q=null;function Y(e){let{value:n}=o;n&&(n.textContent=e.target.value,A()),t.ignoreComposition&&G.value?q=e:R(e)}function ie(){G.value=!0}function ae(){G.value=!1,t.ignoreComposition&&R(q),q=null}function X(e){S.value=!0,t.onPatternFocus?.(e)}function Z(e){S.value=!1,t.onPatternBlur?.(e)}function oe(){if(t.filterable)S.value=!1,f.value?.blur(),s.value?.blur();else if(t.multiple){let{value:e}=l;e?.blur()}else{let{value:e}=u;e?.blur()}}function se(){t.filterable?(S.value=!1,f.value?.focus()):t.multiple?l.value?.focus():u.value?.focus()}function ce(){let{value:e}=s;e&&(M(),e.focus())}function le(){let{value:e}=s;e&&e.blur()}function ue(e){let{value:t}=m;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=g;return e}function fe(){return s.value}let pe=null;function me(){pe!==null&&window.clearTimeout(pe)}function he(){t.active||(me(),pe=window.setTimeout(()=>{k.value&&(x.value=!0)},100))}function ge(){me()}function _e(e){e||(me(),x.value=!1)}h(k,e=>{e||(x.value=!1)}),p(()=>{e(()=>{let e=f.value;e&&(t.disabled?e.removeAttribute(`tabindex`):e.tabIndex=S.value?-1:0)})}),st(c,t.onResize);let{inlineThemeDisabled:ve}=t,ye=y(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:C,loadingColor:w,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:I,boxShadowActiveError:L,boxShadowHoverError:R,borderError:z,borderFocusError:ee,borderHoverError:te,borderActiveError:B,clearColor:V,clearColorHover:H,clearColorPressed:U,clearSize:ne,arrowSize:W,[F(`height`,e)]:G,[F(`fontSize`,e)]:K}}=T.value,q=J(c),Y=J(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":K,"--n-height":G,"--n-padding-single-top":q.top,"--n-padding-multiple-top":Y.top,"--n-padding-single-right":q.right,"--n-padding-multiple-right":Y.right,"--n-padding-single-left":q.left,"--n-padding-multiple-left":Y.left,"--n-padding-single-bottom":q.bottom,"--n-padding-multiple-bottom":Y.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":C,"--n-loading-color":w,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":L,"--n-box-shadow-hover-error":R,"--n-border-error":z,"--n-border-focus-error":ee,"--n-border-hover-error":te,"--n-border-active-error":B,"--n-clear-size":ne,"--n-clear-color":V,"--n-clear-color-hover":H,"--n-clear-color-pressed":U,"--n-arrow-size":W,"--n-font-weight":r}}),be=ve?w(`internal-selection`,y(()=>t.size[0]),ye,t):void 0;return{mergedTheme:T,mergedClearable:E,mergedClsPrefix:r,rtlEnabled:a,patternInputFocused:S,filterablePlaceholder:D,label:O,selected:k,showTagsPanel:x,isComposing:G,counterRef:m,counterWrapperRef:g,patternInputMirrorRef:o,patternInputRef:s,selfRef:c,multipleElRef:l,singleElRef:u,patternInputWrapperRef:f,overflowRef:_,inputTagElRef:v,handleMouseDown:ne,handleFocusin:z,handleClear:B,handleMouseEnter:V,handleMouseLeave:H,handleDeleteOption:W,handlePatternKeyDown:K,handlePatternInputInput:Y,handlePatternInputBlur:Z,handlePatternInputFocus:X,handleMouseEnterCounter:he,handleMouseLeaveCounter:ge,handleFocusout:te,handleCompositionEnd:ae,handleCompositionStart:ie,onPopoverUpdateShow:_e,focus:se,focusInput:ce,blur:oe,blurInput:le,updateCounter:ue,getCounter:de,getTail:fe,renderLabel:t.renderLabel,cssVars:ve?void 0:ye,themeClass:be?.themeClass,onRender:be?.onRender}},render(){let{status:e,multiple:n,size:i,disabled:a,filterable:c,maxTagCount:l,bordered:d,clsPrefix:f,ellipsisTagPopoverProps:p,onRender:m,renderTag:h,renderLabel:g}=this;m?.();let _=l===`responsive`,v=typeof l==`number`,y=_||v,b=(C(),o(Oe,null,{default:()=>(C(),o(X,{clsPrefix:f,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),x;if(n){let{labelField:e}=this,n=n=>(C(),s(`div`,{class:V(`${f}-base-selection-tag-wrapper`),key:n.value},[h?(C(),s(t,{key:0},[q(()=>h({option:n,handleClose:()=>{this.handleDeleteOption(n)}}))],64)):(C(),o(at,{key:1,size:i,closable:!n.disabled,disabled:a,onClose:()=>{this.handleDeleteOption(n)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>g?g(n,!0):Q(n[e],n,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),u=()=>(v?this.selectedOptions.slice(0,l):this.selectedOptions).map(n),d=c?(C(),s(`div`,{class:V(`${f}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[r(`input`,S(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:a,value:this.pattern,autofocus:this.autofocus,class:`${f}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,Tt),r(`span`,{ref:`patternInputMirrorRef`,class:V(`${f}-base-selection-input-tag__mirror`)},[q(()=>this.pattern)],2)],2)):null,m=_?()=>(C(),s(`div`,{class:V(`${f}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(C(),o(at,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:a},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,w;if(v){let e=this.selectedOptions.length-l;e>0&&(w=(t=>(C(),s(`div`,{class:V(`${f}-base-selection-tag-wrapper`),key:`__counter__`},[(C(),o(at,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:a},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(w))}let T=_?c?(C(),o(Ze,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:u,counter:m,tail:()=>d},1032,[`updateCounter`,`getCounter`,`getTail`])):(C(),o(Ze,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:u,counter:m},1032,[`updateCounter`,`getCounter`])):v&&w?u().concat(w):u(),E=y?()=>(C(),s(`div`,{class:V(`${f}-base-selection-popover`)},[_?(C(),s(t,{key:0},[q(()=>u())],64)):(C(),s(t,{key:1},[q(()=>this.selectedOptions.map(n))],64))],2)):void 0,D=y?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...p}:null,O=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(C(),s(`div`,{key:5,class:V(`${f}-base-selection-placeholder ${f}-base-selection-overlay`)},[r(`div`,{class:V(`${f}-base-selection-placeholder__inner`)},[q(()=>this.placeholder)],2)],2)):null,k=c?(C(),s(`div`,{key:6,ref:`patternInputWrapperRef`,class:V(`${f}-base-selection-tags`)},[q(()=>T),_?q(()=>null):(C(),s(t,{key:1},[q(()=>d)],64)),q(()=>b)],2)):(C(),s(`div`,{key:7,ref:`multipleElRef`,class:V(`${f}-base-selection-tags`),tabindex:a?void 0:0},[q(()=>T),q(()=>b)],10,Et));x=(e=>(C(),s(t,{key:8},[y?(C(),o(fe,S({key:0},D,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>k,default:E},1040)):(C(),s(t,{key:1},[q(()=>k)],64)),q(()=>O)],64)))(x)}else if(c){let e=this.pattern||this.isComposing,n=this.active?!e:!this.selected,i=!this.active&&this.selected;x=(e=>(C(),s(`div`,{key:9,ref:`patternInputWrapperRef`,class:V(`${f}-base-selection-label`),title:this.patternInputFocused?void 0:ot(this.label)},[r(`input`,S(this.inputProps,{ref:`patternInputRef`,class:`${f}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:a,disabled:a,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,Ot),i?(C(),s(`div`,{class:V(`${f}-base-selection-label__render-label ${f}-base-selection-overlay`),key:`input`},[r(`div`,{class:V(`${f}-base-selection-overlay__wrapper`)},[h?(C(),s(t,{key:0},[q(()=>h({option:this.selectedOption,handleClose:()=>{}}))],64)):(C(),s(t,{key:1},[g?(C(),s(t,{key:0},[q(()=>g(this.selectedOption,!0))],64)):(C(),s(t,{key:1},[q(()=>Q(this.label,this.selectedOption,!0))],64))],64))],2)],2)):q(()=>null),n?(C(),s(`div`,{class:V(`${f}-base-selection-placeholder ${f}-base-selection-overlay`),key:`placeholder`},[r(`div`,{class:V(`${f}-base-selection-overlay__wrapper`)},[q(()=>this.filterablePlaceholder)],2)],2)):q(()=>null),q(()=>b)],10,Dt)))(x)}else x=(e=>(C(),s(`div`,{key:10,ref:`singleElRef`,class:V(`${f}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(C(),s(`div`,{class:V(`${f}-base-selection-placeholder ${f}-base-selection-overlay`),key:`placeholder`},[r(`div`,{class:V(`${f}-base-selection-placeholder__inner`)},[q(()=>this.placeholder)],2)],2)):(C(),s(`div`,{class:V(`${f}-base-selection-input`),title:ot(this.label),key:`input`},[r(`div`,{class:V(`${f}-base-selection-input__content`)},[h?(C(),s(t,{key:0},[q(()=>h({option:this.selectedOption,handleClose:()=>{}}))],64)):(C(),s(t,{key:1},[g?(C(),s(t,{key:0},[q(()=>g(this.selectedOption,!0))],64)):(C(),s(t,{key:1},[q(()=>Q(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),q(()=>b)],10,kt)))(x);return C(),s(`div`,{ref:`selfRef`,class:V([`${f}-base-selection`,this.rtlEnabled&&`${f}-base-selection--rtl`,this.themeClass,e&&`${f}-base-selection--${e}-status`,{[`${f}-base-selection--active`]:this.active,[`${f}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${f}-base-selection--disabled`]:this.disabled,[`${f}-base-selection--multiple`]:this.multiple,[`${f}-base-selection--focus`]:this.focused}]),style:u(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[q(()=>x),d?(C(),s(`div`,{key:0,class:V(`${f}-base-selection__border`)},null,2)):q(()=>null),d?(C(),s(`div`,{key:2,class:V(`${f}-base-selection__state-border`)},null,2)):q(()=>null)],46,At)}}),Mt=O([A(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),A(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Ee({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),Nt={...U.props,to:ce.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},Pt=x({name:`Select`,props:Nt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:r,namespaceRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=ee(e),s=U(`Select`,`-select`,Mt,we,e,t),c=n(e.defaultValue),l=b(e,`value`),u=ye(l,c),d=n(!1),f=n(``),p=_e(e,[`items`,`options`]),m=n([]),g=n([]),_=y(()=>g.value.concat(m.value).concat(p.value)),v=y(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return bt(e,i);let a=t[r];return typeof a==`string`?bt(e,a):typeof a==`number`&&bt(e,String(a))}}),x=y(()=>{if(e.remote)return p.value;{let{value:t}=_,{value:n}=f;return!n.length||!e.filterable?t:St(t,v.value,n,e.childrenField)}}),S=y(()=>{let{valueField:t,childrenField:n}=e,r=xt(t,n);return me(x.value,r)}),C=y(()=>Ct(_.value,e.valueField,e.childrenField)),T=n(!1),E=ye(b(e,`show`),T),O=n(null),k=n(null),A=n(null),{localeRef:j}=ae(`Select`),N=y(()=>e.placeholder??j.value.placeholder),P=[],F=n(new Map),I=y(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function L(t){let n=e.remote,{value:r}=F,{value:i}=C,{value:a}=I,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let R=y(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?L(e):[]}return null}),z=y(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:L([t])[0]||null:null}),B=te(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:V,mergedDisabledRef:H,mergedStatusRef:ne}=B;function W(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=B;r&&M(r,t,n),a&&M(a,t,n),i&&M(i,t,n),c.value=t,o(),s()}function G(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=B;n&&M(n,t),r()}function K(){let{onClear:t}=e;t&&M(t)}function q(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=B;n&&M(n,t),i(),r&&X()}function J(t){let{onSearch:n}=e;n&&M(n,t)}function Y(t){let{onScroll:n}=e;n&&M(n,t)}function re(){let{remote:t,multiple:n}=e;if(t){let{value:t}=F;if(n){let{valueField:n}=e;R.value?.forEach(e=>{t.set(e[n],e)})}else{let n=z.value;n&&t.set(n[e.valueField],n)}}}function ie(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&M(n,t),r&&M(r,t),T.value=t}function X(){H.value||(ie(!0),T.value=!0,e.filterable&&Ne())}function Z(){ie(!1)}function oe(){f.value=``,g.value=P}let le=n(!1);function ue(){e.filterable&&(le.value=!0)}function de(){e.filterable&&(le.value=!1,E.value||oe())}function fe(){H.value||(E.value?e.filterable?Ne():Z():X())}function pe(e){A.value?.selfRef?.contains(e.relatedTarget)||(d.value=!1,G(e),Z())}function he(e){q(e),d.value=!0}function ge(){d.value=!0}function ve(e){O.value?.$el.contains(e.relatedTarget)||(d.value=!1,G(e),Z())}function be(){O.value?.focus(),Z()}function xe(e){E.value&&(O.value?.$el.contains(Se(e))||Z())}function Ce(t){if(!Array.isArray(t))return[];if(I.value)return Array.from(t);{let{remote:n}=e,{value:r}=C;if(n){let{value:e}=F;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function Te(e){Ee(e.rawNode)}function Ee(t){if(H.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=g,t=e[0]||null;if(t){let e=m.value;e.length?e.push(t):m.value=[t],g.value=P}}if(r&&F.value.set(t[a],t),e.multiple){let e=Ce(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Q(t[a]);~e&&(m.value.splice(e,1),i&&(f.value=``))}}else e.push(t[a]),i&&(f.value=``);W(e,L(e))}else{if(n&&!r){let e=Q(t[a]);~e?m.value=[m.value[e]]:m.value=P}Me(),Z(),W(t[a],t)}}function Q(t){return m.value.findIndex(n=>n[e.valueField]===t)}function De(t){E.value||X();let{value:n}=t.target;f.value=n;let{tag:r,remote:i}=e;if(J(n),r&&!i){if(!n){g.value=P;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;p.value.some(e=>e[i]===r[i]||e[a]===r[a])||m.value.some(e=>e[i]===r[i]||e[a]===r[a])?g.value=P:g.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Z(),r&&!i&&a&&(m.value=P),K(),n?W([],[]):W(null,null)}function ke(e){!se(e,`action`)&&!se(e,`empty`)&&!se(e,`header`)&&e.preventDefault()}function Ae(e){Y(e)}function je(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!O.value?.isComposing){if(E.value){let t=A.value?.getPendingTmNode();t?Te(t):e.filterable||(Z(),Me())}else if(X(),e.tag&&le.value){let t=g.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Ee(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;E.value&&A.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;E.value?A.value?.next():X();break;case`Escape`:E.value&&(Pe(t),Z()),O.value?.focus()}}function Me(){O.value?.focus()}function Ne(){O.value?.focusInput()}function Fe(){E.value&&k.value?.syncPosition()}re(),h(b(e,`options`),re);let Ie={focus:()=>{O.value?.focus()},focusInput:()=>{O.value?.focusInput()},blur:()=>{O.value?.blur()},blurInput:()=>{O.value?.blurInput()}},Le=y(()=>{let{self:{menuBoxShadow:e}}=s.value;return{"--n-menu-box-shadow":e}}),Re=a?w(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:ne,mergedClsPrefix:t,mergedBordered:r,namespace:i,treeMate:S,isMounted:D(),triggerRef:O,menuRef:A,pattern:f,uncontrolledShow:T,mergedShow:E,adjustedTo:ce(e),uncontrolledValue:c,mergedValue:u,followerRef:k,localizedPlaceholder:N,selectedOption:z,selectedOptions:R,mergedSize:V,mergedDisabled:H,focused:d,activeWithoutMenuOpen:le,inlineThemeDisabled:a,onTriggerInputFocus:ue,onTriggerInputBlur:de,handleTriggerOrMenuResize:Fe,handleMenuFocus:ge,handleMenuBlur:ve,handleMenuTabOut:be,handleTriggerClick:fe,handleToggle:Te,handleDeleteOption:Ee,handlePatternInput:De,handleClear:Oe,handleTriggerBlur:pe,handleTriggerFocus:he,handleKeydown:je,handleMenuAfterLeave:oe,handleMenuClickOutside:xe,handleMenuScroll:Ae,handleMenuKeydown:je,handleMenuMousedown:ke,mergedTheme:s,cssVars:a?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return C(),s(`div`,{class:V(`${this.mergedClsPrefix}-select`)},[_(Z,null,{_:1,default:R(()=>[(C(),o(pe,null,{_:1,default:R(()=>(C(),o(jt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:R(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(C(),o(ue,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===ce.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:R(()=>(C(),o(W,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:R(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),i((C(),o(_t,S(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:R(()=>[this.$slots.empty?.()]),header:R(()=>[this.$slots.header?.()]),action:R(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[L,this.mergedShow],[Me,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Me,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{ct as a,Re as c,ut as i,xt as n,ot as o,_t as r,Ye as s,Pt as t};