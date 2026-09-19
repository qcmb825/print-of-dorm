import{B as e,J as t,P as n,Pt as r,Q as i,St as a,Tt as o,U as s,V as c,Y as l,ct as u,dt as d,et as f,ft as p,it as m,mt as h,nt as g,ot as _,rn as v,rt as y,st as b,xt as x,z as S,zt as C}from"./endpoints-6TYL4VMB.js";import{A as w,C as T,D as E,E as D,Gt as O,Jt as k,Kt as A,P as j,T as M,Xt as N,Yt as P,Zt as F,_ as I,an as L,at as R,et as z,ft as ee,h as te,ht as B,it as V,j as H,k as U,lt as ne,nn as W,nt as G,rt as K,st as q,tt as J,u as Y,v as re,x as ie}from"./createLucideIcon-BnOls5eb.js";import{a as ae,n as X}from"./Input-C6i6JqAy.js";import{c as Z,d as oe,f as se,l as ce,n as le,o as ue,p as de,r as fe,s as pe,t as me,u as he}from"./create-BiwO0CxP.js";import{i as ge,l as _e,o as ve,r as ye,t as be}from"./Scrollbar-8y1rFSO9.js";import{n as xe,r as Se,t as Ce}from"./cssr-DwLMsPLP.js";import{t as we}from"./use-merged-state-C3te6tKt.js";import{H as Q,L as Te,M as Ee,R as De,V as Oe,Y as ke,Z as Ae,gt as je,ht as Me,mt as Ne,tt as Pe}from"./index-DxUQBclL.js";var Fe=l({name:`Empty`,render(){return(()=>{let t=K(`15c1a247ae156450`);return t[0]||=e(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[e(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),e(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`})],-1)})()}}),Ie=A(`empty`,`
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
 `)]),Le={...U.props,description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function},Re=l({name:`Empty`,props:Le,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=ee(e),i=U(`Empty`,`-empty`,Ie,je,e,t),{localeRef:a}=ae(`Empty`),o=S(()=>e.description??r?.value?.Empty?.description),s=S(()=>r?.value?.Empty?.renderIcon||(()=>(d(),c(Fe)))),l=S(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{[F(`iconSize`,t)]:r,[F(`fontSize`,t)]:a,textColor:o,iconColor:s,extraTextColor:c}}=i.value;return{"--n-icon-size":r,"--n-font-size":a,"--n-bezier":n,"--n-text-color":o,"--n-icon-color":s,"--n-extra-text-color":c}}),u=n?w(`empty`,S(()=>{let t=``,{size:n}=e;return t+=n[0],t}),l,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:s,localizedDescription:S(()=>o.value||a.value.description),cssVars:n?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:r}=this;return r?.(),d(),s(`div`,{class:V([`${t}-empty`,this.themeClass]),style:v(this.cssVars)},[this.showIcon?(d(),s(`div`,{key:0,class:V(`${t}-empty__icon`)},[e.icon?(d(),s(n,{key:0},[q(()=>e.icon())],64)):(d(),c(Me,{key:1,clsPrefix:t},{default:this.mergedRenderIcon},1032,[`clsPrefix`]))],2)):q(()=>null),this.showDescription?(d(),s(`div`,{key:2,class:V(`${t}-empty__description`)},[e.default?(d(),s(n,{key:0},[q(()=>e.default())],64)):(d(),s(n,{key:1},[q(()=>this.localizedDescription)],64))],2)):q(()=>null),e.extra?(d(),s(`div`,{key:4,class:V(`${t}-empty__extra`)},[q(()=>e.extra())],2)):q(()=>null)],6)}});function ze(e){return e&-e}var Be=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=ze(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=ze(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Ve;function He(){return typeof document>`u`?!1:(Ve===void 0&&(Ve=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Ve)}var Ue;function We(){return typeof document>`u`?1:(Ue===void 0&&(Ue=`chrome`in window?window.devicePixelRatio:1),Ue)}var Ge=`VVirtualListXScroll`;function Ke({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let i=r(0),a=r(0),o=S(()=>{let t=e.value;if(t.length===0)return null;let n=new Be(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=E(()=>{let e=o.value;return e===null?0:Math.max(e.getBound(a.value)-1,0)}),c=e=>{let t=o.value;return t===null?0:t.sum(e)},l=E(()=>{let t=o.value;return t===null?0:Math.min(t.getBound(a.value+i.value)+1,e.value.length-1)});return p(Ge,{startIndexRef:s,endIndexRef:l,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:c}),{listWidthRef:i,scrollLeftRef:a}}var qe=l({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=f(Ge);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),Je=Ce(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Ce(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Ce(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ye=l({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=ne();Je.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:xe,ssr:t}),u(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&y({key:n}):y({index:t})});let n=!1,i=!1;m(()=>{if(n=!1,!i){i=!0;return}y({top:g.value,left:s.value})}),b(()=>{n=!0,i||=!0});let a=E(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=S(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=Ke({columnsRef:C(e,`columns`),renderColRef:C(e,`renderCol`),renderItemWithColsRef:C(e,`renderItemWithCols`)}),l=r(null),d=r(void 0),f=new Map,p=S(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Be(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=f.get(n);a!==void 0&&i.add(t,a)}),i}),h=r(0),g=r(0),_=E(()=>Math.max(p.value.getBound(g.value-z(e.paddingTop))-1,0)),v=S(()=>{let{value:t}=d;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=_.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),y=(e,t)=>{if(typeof e==`number`){D(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)D(n,r,c);else if(i!==void 0)T(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&T(e,c,l)}else s===`bottom`?D(0,2**53-1,c):s===`top`&&D(0,0,c)},x,w=null;function T(t,n,r){let i=l.value;if(i==null)return;let{value:a}=p,o=a.sum(t)+z(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{x=t,w!==null&&window.clearTimeout(w),w=window.setTimeout(()=>{x=void 0,w=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function D(e,t,n){l.value?.scrollTo({left:e,top:t,behavior:n})}function O(t,r){if(n||e.ignoreItemResize||F(r.target))return;let{value:i}=p,a=o.value.get(t),s=i.get(a),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?f.delete(t):f.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(a,u);let d=l.value;if(d!=null){if(x===void 0){let e=i.sum(a);d.scrollTop>e&&d.scrollBy(0,u)}else(a<x||a===x&&c+i.sum(a)>d.scrollTop+d.offsetHeight)&&d.scrollBy(0,u);P()}h.value++}let k=!He(),A=!1;function j(t){var n;(n=e.onScroll)==null||n.call(e,t),(!k||!A)&&P()}function M(t){var n;if((n=e.onWheel)==null||n.call(e,t),k){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/We(),e.scrollLeft+=t.deltaX/We(),P(),A=!0,de(()=>{A=!1})}}}function N(t){if(n||F(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===d.value)return}else if(t.contentRect.height===d.value&&t.contentRect.width===c.value)return;d.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function P(){let{value:e}=l;e!=null&&(g.value=e.scrollTop,s.value=e.scrollLeft)}function F(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:d,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:S(()=>{let{itemResizable:t}=e,n=G(p.value.sum());return h.value,[e.itemsStyle,{boxSizing:`content-box`,width:G(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:G(e.paddingTop),paddingBottom:G(e.paddingBottom)}]}),visibleItemsStyle:S(()=>(h.value,{transform:`translateY(${G(p.value.sum(_.value))})`})),viewportItems:v,listElRef:l,itemsElRef:r(null),scrollTo:y,handleListResize:N,handleListScroll:j,handleListWheel:M,handleItemResize:O}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return i(ye,{onResize:this.handleListResize},{default:()=>{var a;return i(`div`,g(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(a=this.$slots).empty?.call(a):i(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[i(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:a}=this;return this.viewportItems.map(o=>{let s=o[t],c=n.get(s),l=r==null?void 0:i(qe,{index:c,item:o}),u=a==null?void 0:i(qe,{index:c,item:o}),d=this.$slots.default({item:o,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?i(ye,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}}),$=`v-hidden`,Xe=Ce(`[v-hidden]`,{display:`none!important`}),Ze=l({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=r(null),i=r(null);function a(r){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?i.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(r.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let o=ne();return Xe.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:xe,ssr:o}),u(()=>a({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:i,sync:a}},render(){let{$slots:e}=this;return y(()=>this.sync({showAllItemsBeforeCalculate:!1})),i(`div`,{class:`v-overflow`,ref:`selfRef`},[h(e,`default`),e.counter?e.counter():i(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Qe(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:D,buttonColor2Pressed:O,fontWeightStrong:k}=e;return{...Ae,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:k,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:D,colorPressedCheckable:O,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${j(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:j(i,{alpha:.12}),colorBorderedPrimary:j(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:j(i,{alpha:.12}),closeColorPressedPrimary:j(i,{alpha:.18}),borderInfo:`1px solid ${j(a,{alpha:.3})}`,textColorInfo:a,colorInfo:j(a,{alpha:.12}),colorBorderedInfo:j(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:j(a,{alpha:.12}),closeColorPressedInfo:j(a,{alpha:.18}),borderSuccess:`1px solid ${j(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:j(o,{alpha:.12}),colorBorderedSuccess:j(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:j(o,{alpha:.12}),closeColorPressedSuccess:j(o,{alpha:.18}),borderWarning:`1px solid ${j(s,{alpha:.35})}`,textColorWarning:s,colorWarning:j(s,{alpha:.15}),colorBorderedWarning:j(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:j(s,{alpha:.12}),closeColorPressedWarning:j(s,{alpha:.18}),borderError:`1px solid ${j(c,{alpha:.23})}`,textColorError:c,colorError:j(c,{alpha:.1}),colorBorderedError:j(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:j(c,{alpha:.12}),closeColorPressedError:j(c,{alpha:.18})}}var $e={name:`Tag`,common:H,self:Qe},et={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},tt=A(`tag`,`
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
 `,[N(`disabled`,[O(`&:hover`,`background-color: var(--n-color-checked-hover);`),O(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),nt=[`onClick`,`onMouseenter`,`onMouseleave`],rt={...U.props,...et,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},it=B(`n-tag`),at=l({name:`Tag`,props:rt,slots:Object,setup(e){let t=r(null),{mergedBorderedRef:n,mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:o,mergedComponentPropsRef:s}=ee(e),c=S(()=>e.size||s?.value?.Tag?.size||`medium`),l=U(`Tag`,`-tag`,tt,$e,e,i);p(it,{roundRef:C(e,`round`)});function u(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function d(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&M(n,t)}}let f={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},m=re(`Tag`,o,i),h=S(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=c.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:u,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[F(`colorBordered`,t)]:T,[F(`closeSize`,a)]:E,[F(`closeIconSize`,a)]:D,[F(`fontSize`,a)]:O,[F(`height`,a)]:k,[F(`color`,t)]:A,[F(`textColor`,t)]:j,[F(`border`,t)]:M,[F(`closeIconColor`,t)]:N,[F(`closeIconColorHover`,t)]:P,[F(`closeIconColorPressed`,t)]:I,[F(`closeColorHover`,t)]:L,[F(`closeColorPressed`,t)]:R}}=l.value,z=J(u);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":d,"--n-border":M,"--n-close-icon-size":D,"--n-close-color-pressed":R,"--n-close-color-hover":L,"--n-close-border-radius":C,"--n-close-icon-color":N,"--n-close-icon-color-hover":P,"--n-close-icon-color-pressed":I,"--n-close-icon-color-disabled":N,"--n-close-margin-top":z.top,"--n-close-margin-right":z.right,"--n-close-margin-bottom":z.bottom,"--n-close-margin-left":z.left,"--n-close-size":E,"--n-color":r||(n.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),g=a?w(`tag`,S(()=>{let t=``,{type:r,color:{color:i,textColor:a}={}}=e;return t+=r[0],t+=c.value[0],i&&(t+=`a${I(i)}`),a&&(t+=`b${I(a)}`),n.value&&(t+=`c`),t}),h,e):void 0;return{...f,rtlEnabled:m,mergedClsPrefix:i,contentRef:t,mergedBordered:n,handleClick:u,handleCloseClick:d,cssVars:a?void 0:h,themeClass:g?.themeClass,onRender:g?.onRender}},render(){let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:l}=this;o?.();let u=T(l.avatar,e=>e&&(d(),s(`div`,{class:V(`${t}-tag__avatar`)},[q(()=>e)],2))),f=T(l.icon,e=>e&&(d(),s(`div`,{class:V(`${t}-tag__icon`)},[q(()=>e)],2)));return d(),s(`div`,{class:V([`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:u,[`${t}-tag--icon`]:f,[`${t}-tag--closable`]:r}]),style:v(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[q(()=>f||u),e(`span`,{class:V(`${t}-tag__content`),ref:`contentRef`},[q(()=>this.$slots.default?.())],2),!this.checkable&&r?(d(),c(ke,{key:0,clsPrefix:t,class:V(`${t}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):q(()=>null),!this.checkable&&this.mergedBordered?(d(),s(`div`,{key:2,class:V(`${t}-tag__border`),style:v({borderColor:i})},null,6)):q(()=>null)],46,nt)}});function ot(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function st(e,t){t&&(u(()=>{let{value:n}=e;n&&ge.registerHandler(n,t)}),x(e,(e,t)=>{t&&ge.unregisterHandler(t)},{deep:!1}),_(()=>{let{value:t}=e;t&&ge.unregisterHandler(t)}))}var ct=l({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=K(`d16ead82505dc285`);return d(),s(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),lt=l({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=f(oe);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):Q(i[this.labelField],i,!1),c=(d(),s(`div`,g(a,{class:[`${e}-base-select-group-header`,a?.class]}),[q(()=>o)],16));return i.render?i.render({node:c,option:i}):n?n({node:c,option:i,selected:!1}):c}});function ut(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var dt=l({name:`Checkmark`,render(){return(()=>{let t=K(`3c84eac8ae4e1f96`);return t[0]||=e(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[e(`g`,{fill:`none`},[e(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ft=[`onClick`,`onMouseenter`,`onMousemove`];function pt(e,t){return d(),c(W,{name:`fade-in-scale-up-transition`},{default:()=>e?(d(),c(Me,{key:1,clsPrefix:t,class:V(`${t}-base-select-option__check`)},{default:()=>i(dt)},1032,[`clsPrefix`,`class`])):null},1024)}var mt=l({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:p}=f(oe),m=E(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||d(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:E(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:m,isSelected:E(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:t,tmNode:{rawNode:n},isSelected:r,isPending:i,isGrouped:a,showCheckmark:o,nodeProps:c,renderOption:l,renderLabel:u,handleClick:f,handleMouseEnter:p,handleMouseMove:m}=this,h=pt(r,t),_=u?[u(n,r),o&&h]:[Q(n[this.labelField],n,r),o&&h],v=c?.(n),y=(d(),s(`div`,g(v,{class:[`${t}-base-select-option`,n.class,v?.class,{[`${t}-base-select-option--disabled`]:n.disabled,[`${t}-base-select-option--selected`]:r,[`${t}-base-select-option--grouped`]:a,[`${t}-base-select-option--pending`]:i,[`${t}-base-select-option--show-checkmark`]:o}],style:[v?.style||``,n.style||``],onClick:ut([f,v?.onClick]),onMouseenter:ut([p,v?.onMouseenter]),onMousemove:ut([m,v?.onMousemove])}),[e(`div`,{class:V(`${t}-base-select-option__content`)},[q(()=>_)],2)],16,ft));return n.render?n.render({node:y,option:n,selected:r}):l?l({node:y,option:n,selected:r}):y}}),ht=A(`base-select-menu`,`
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
 `,[Oe({enterScale:`0.5`})])])]),gt=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],_t=l({name:`InternalSelectMenu`,props:{...U.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:i}=ee(e),a=re(`InternalSelectMenu`,n,t),o=U(`InternalSelectMenu`,`-internal-select-menu`,ht,Ne,e,C(e,`clsPrefix`)),s=r(null),c=r(null),l=r(null),d=S(()=>e.treeMate.getFlattenedNodes()),f=S(()=>le(d.value)),m=r(null);function h(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),H(n||null)}function g(){let{value:t}=m;t&&!e.treeMate.getNode(t.key)&&(m.value=null)}let v;x(()=>e.show,t=>{t?v=x(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?h():g(),y(ne)):g()},{immediate:!0}):v?.()},{immediate:!0}),_(()=>{v?.()});let b=S(()=>z(o.value.self[F(`optionHeight`,e.size)])),T=S(()=>J(o.value.self[F(`padding`,e.size)])),E=S(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),D=S(()=>{let e=d.value;return e&&e.length===0}),O=S(()=>i?.value?.Select?.renderEmpty);function k(t){let{onToggle:n}=e;n&&n(t)}function A(t){let{onScroll:n}=e;n&&n(t)}function j(e){l.value?.sync(),A(e)}function M(){l.value?.sync()}function N(){let{value:e}=m;return e||null}function P(e,t){t.disabled||H(t,!1)}function I(e,t){t.disabled||k(t)}function L(t){se(t,`action`)||e.onKeyup?.(t)}function R(t){se(t,`action`)||e.onKeydown?.(t)}function te(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function B(){let{value:e}=m;e&&H(e.getNext({loop:!0}),!0)}function V(){let{value:e}=m;e&&H(e.getPrev({loop:!0}),!0)}function H(e,t=!1){m.value=e,t&&ne()}function ne(){let t=m.value;if(!t)return;let n=f.value(t.key);n!==null&&(e.virtualScroll?c.value?.scrollTo({index:n}):l.value?.scrollTo({index:n,elSize:b.value}))}function W(t){s.value?.contains(t.target)&&e.onFocus?.(t)}function G(t){s.value?.contains(t.relatedTarget)||e.onBlur?.(t)}p(oe,{handleOptionMouseEnter:P,handleOptionClick:I,valueSetRef:E,pendingTmNodeRef:m,nodePropsRef:C(e,`nodeProps`),showCheckmarkRef:C(e,`showCheckmark`),multipleRef:C(e,`multiple`),valueRef:C(e,`value`),renderLabelRef:C(e,`renderLabel`),renderOptionRef:C(e,`renderOption`),labelFieldRef:C(e,`labelField`),valueFieldRef:C(e,`valueField`)}),p(he,s),u(()=>{let{value:e}=l;e&&e.sync()});let K=S(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[F(`optionFontSize`,t)]:x,[F(`optionHeight`,t)]:S,[F(`optionPadding`,t)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":J(C,`left`),"--n-option-padding-right":J(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:q}=e,Y=q?w(`internal-select-menu`,S(()=>e.size[0]),K,e):void 0,ie={selfRef:s,next:B,prev:V,getPendingTmNode:N};return st(s,e.onResize),{mergedTheme:o,mergedClsPrefix:t,rtlEnabled:a,virtualListRef:c,scrollbarRef:l,itemSize:b,padding:T,flattenedNodes:d,empty:D,mergedRenderEmpty:O,virtualListContainer(){let{value:e}=c;return e?.listElRef},virtualListContent(){let{value:e}=c;return e?.itemsElRef},doScroll:A,handleFocusin:W,handleFocusout:G,handleKeyUp:L,handleKeyDown:R,handleMouseDown:te,handleVirtualListResize:M,handleVirtualListScroll:j,cssVars:q?void 0:K,themeClass:Y?.themeClass,onRender:Y?.onRender,...ie}},render(){let{$slots:e,virtualScroll:t,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),d(),s(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:V([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`]),style:v(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[q(()=>T(e.header,e=>e&&(d(),s(`div`,{class:V(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[q(()=>e)],2)))),this.loading?(d(),s(`div`,{key:0,class:V(`${r}-base-select-menu__loading`)},[(d(),c(Y,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(d(),s(n,{key:1},[this.empty?(d(),s(`div`,{key:1,class:V(`${r}-base-select-menu__empty`),"data-empty":!0},[q(()=>ie(e.empty,()=>[this.mergedRenderEmpty?.()||(d(),c(Re,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(d(),c(be,g({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(d(),c(Ye,{key:1,ref:`virtualListRef`,class:V(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(d(),c(lt,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(d(),c(mt,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(d(),s(`div`,{key:4,class:V(`${r}-base-select-menu-option-wrapper`),style:v({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[q(()=>this.flattenedNodes.map(e=>e.isGroup?(d(),c(lt,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(d(),c(mt,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),q(()=>T(e.action,e=>e&&[(d(),s(`div`,{class:V(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[q(()=>e)],2)),(d(),c(ct,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,gt)}});function vt(e){return e.type===`group`}function yt(e){return e.type===`ignored`}function bt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function xt(e,t){return{getIsGroup:vt,getIgnored:yt,getKey(t){return vt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function St(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(vt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(yt(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function Ct(e,t,n){let r=new Map;return e.forEach(e=>{vt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var wt=O([A(`base-selection`,`
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
 `)])])]),Tt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],Et=[`tabindex`],Dt=[`title`],Ot=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],kt=[`tabindex`],At=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],jt=l({name:`InternalSelection`,props:{...U.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=ee(e),i=re(`InternalSelection`,n,t),o=r(null),s=r(null),c=r(null),l=r(null),d=r(null),f=r(null),p=r(null),m=r(null),h=r(null),g=r(null),_=r(!1),v=r(!1),b=r(!1),T=U(`InternalSelection`,`-internal-selection`,wt,De,e,C(e,`clsPrefix`)),E=S(()=>e.clearable&&!e.disabled&&(b.value||e.active)),D=S(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Q(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),O=S(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),k=S(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function A(){let{value:t}=o;if(t){let{value:n}=s;n&&(n.style.width=`${t.offsetWidth}px`,e.maxTagCount!==`responsive`&&h.value?.sync({showAllItemsBeforeCalculate:!1}))}}function j(){let{value:e}=g;e&&(e.style.display=`none`)}function M(){let{value:e}=g;e&&(e.style.display=`inline-block`)}x(C(e,`active`),e=>{e||j()}),x(C(e,`pattern`),()=>{e.multiple&&y(A)});function N(t){let{onFocus:n}=e;n&&n(t)}function P(t){let{onBlur:n}=e;n&&n(t)}function I(t){let{onDeleteOption:n}=e;n&&n(t)}function L(t){let{onClear:n}=e;n&&n(t)}function R(t){let{onPatternInput:n}=e;n&&n(t)}function z(e){(!e.relatedTarget||!c.value?.contains(e.relatedTarget))&&N(e)}function te(e){c.value?.contains(e.relatedTarget)||P(e)}function B(e){L(e)}function V(){b.value=!0}function H(){b.value=!1}function ne(t){e.active&&e.filterable&&t.target!==s.value&&t.preventDefault()}function W(e){I(e)}let G=r(!1);function K(t){if(t.key===`Backspace`&&!G.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&W(t[t.length-1])}}let q=null;function Y(t){let{value:n}=o;n&&(n.textContent=t.target.value,A()),e.ignoreComposition&&G.value?q=t:R(t)}function ie(){G.value=!0}function ae(){G.value=!1,e.ignoreComposition&&R(q),q=null}function X(t){v.value=!0,e.onPatternFocus?.(t)}function Z(t){v.value=!1,e.onPatternBlur?.(t)}function oe(){if(e.filterable)v.value=!1,f.value?.blur(),s.value?.blur();else if(e.multiple){let{value:e}=l;e?.blur()}else{let{value:e}=d;e?.blur()}}function se(){e.filterable?(v.value=!1,f.value?.focus()):e.multiple?l.value?.focus():d.value?.focus()}function ce(){let{value:e}=s;e&&(M(),e.focus())}function le(){let{value:e}=s;e&&e.blur()}function ue(e){let{value:t}=p;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=m;return e}function fe(){return s.value}let pe=null;function me(){pe!==null&&window.clearTimeout(pe)}function he(){e.active||(me(),pe=window.setTimeout(()=>{k.value&&(_.value=!0)},100))}function ge(){me()}function _e(e){e||(me(),_.value=!1)}x(k,e=>{e||(_.value=!1)}),u(()=>{a(()=>{let t=f.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=v.value?-1:0)})}),st(c,e.onResize);let{inlineThemeDisabled:ve}=e,ye=S(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:C,loadingColor:w,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:I,boxShadowActiveError:L,boxShadowHoverError:R,borderError:z,borderFocusError:ee,borderHoverError:te,borderActiveError:B,clearColor:V,clearColorHover:H,clearColorPressed:U,clearSize:ne,arrowSize:W,[F(`height`,t)]:G,[F(`fontSize`,t)]:K}}=T.value,q=J(c),Y=J(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":K,"--n-height":G,"--n-padding-single-top":q.top,"--n-padding-multiple-top":Y.top,"--n-padding-single-right":q.right,"--n-padding-multiple-right":Y.right,"--n-padding-single-left":q.left,"--n-padding-multiple-left":Y.left,"--n-padding-single-bottom":q.bottom,"--n-padding-multiple-bottom":Y.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":C,"--n-loading-color":w,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":L,"--n-box-shadow-hover-error":R,"--n-border-error":z,"--n-border-focus-error":ee,"--n-border-hover-error":te,"--n-border-active-error":B,"--n-clear-size":ne,"--n-clear-color":V,"--n-clear-color-hover":H,"--n-clear-color-pressed":U,"--n-arrow-size":W,"--n-font-weight":r}}),be=ve?w(`internal-selection`,S(()=>e.size[0]),ye,e):void 0;return{mergedTheme:T,mergedClearable:E,mergedClsPrefix:t,rtlEnabled:i,patternInputFocused:v,filterablePlaceholder:D,label:O,selected:k,showTagsPanel:_,isComposing:G,counterRef:p,counterWrapperRef:m,patternInputMirrorRef:o,patternInputRef:s,selfRef:c,multipleElRef:l,singleElRef:d,patternInputWrapperRef:f,overflowRef:h,inputTagElRef:g,handleMouseDown:ne,handleFocusin:z,handleClear:B,handleMouseEnter:V,handleMouseLeave:H,handleDeleteOption:W,handlePatternKeyDown:K,handlePatternInputInput:Y,handlePatternInputBlur:Z,handlePatternInputFocus:X,handleMouseEnterCounter:he,handleMouseLeaveCounter:ge,handleFocusout:te,handleCompositionEnd:ae,handleCompositionStart:ie,onPopoverUpdateShow:_e,focus:se,focusInput:ce,blur:oe,blurInput:le,updateCounter:ue,getCounter:de,getTail:fe,renderLabel:e.renderLabel,cssVars:ve?void 0:ye,themeClass:be?.themeClass,onRender:be?.onRender}},render(){let{status:t,multiple:r,size:i,disabled:a,filterable:o,maxTagCount:l,bordered:u,clsPrefix:f,ellipsisTagPopoverProps:p,onRender:m,renderTag:h,renderLabel:_}=this;m?.();let y=l===`responsive`,b=typeof l==`number`,x=y||b,S=(d(),c(ve,null,{default:()=>(d(),c(X,{clsPrefix:f,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),C;if(r){let{labelField:t}=this,r=e=>(d(),s(`div`,{class:V(`${f}-base-selection-tag-wrapper`),key:e.value},[h?(d(),s(n,{key:0},[q(()=>h({option:e,handleClose:()=>{this.handleDeleteOption(e)}}))],64)):(d(),c(at,{key:1,size:i,closable:!e.disabled,disabled:a,onClose:()=>{this.handleDeleteOption(e)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>_?_(e,!0):Q(e[t],e,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),u=()=>(b?this.selectedOptions.slice(0,l):this.selectedOptions).map(r),m=o?(d(),s(`div`,{class:V(`${f}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[e(`input`,g(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:a,value:this.pattern,autofocus:this.autofocus,class:`${f}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,Tt),e(`span`,{ref:`patternInputMirrorRef`,class:V(`${f}-base-selection-input-tag__mirror`)},[q(()=>this.pattern)],2)],2)):null,v=y?()=>(d(),s(`div`,{class:V(`${f}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(d(),c(at,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:a},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,w;if(b){let e=this.selectedOptions.length-l;e>0&&(w=(t=>(d(),s(`div`,{class:V(`${f}-base-selection-tag-wrapper`),key:`__counter__`},[(d(),c(at,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:a},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(w))}let T=y?o?(d(),c(Ze,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:u,counter:v,tail:()=>m},1032,[`updateCounter`,`getCounter`,`getTail`])):(d(),c(Ze,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:u,counter:v},1032,[`updateCounter`,`getCounter`])):b&&w?u().concat(w):u(),E=x?()=>(d(),s(`div`,{class:V(`${f}-base-selection-popover`)},[y?(d(),s(n,{key:0},[q(()=>u())],64)):(d(),s(n,{key:1},[q(()=>this.selectedOptions.map(r))],64))],2)):void 0,D=x?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...p}:null,O=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(d(),s(`div`,{key:5,class:V(`${f}-base-selection-placeholder ${f}-base-selection-overlay`)},[e(`div`,{class:V(`${f}-base-selection-placeholder__inner`)},[q(()=>this.placeholder)],2)],2)):null,k=o?(d(),s(`div`,{key:6,ref:`patternInputWrapperRef`,class:V(`${f}-base-selection-tags`)},[q(()=>T),y?q(()=>null):(d(),s(n,{key:1},[q(()=>m)],64)),q(()=>S)],2)):(d(),s(`div`,{key:7,ref:`multipleElRef`,class:V(`${f}-base-selection-tags`),tabindex:a?void 0:0},[q(()=>T),q(()=>S)],10,Et));C=(e=>(d(),s(n,{key:8},[x?(d(),c(fe,g({key:0},D,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>k,default:E},1040)):(d(),s(n,{key:1},[q(()=>k)],64)),q(()=>O)],64)))(C)}else if(o){let t=this.pattern||this.isComposing,r=this.active?!t:!this.selected,i=!this.active&&this.selected;C=(t=>(d(),s(`div`,{key:9,ref:`patternInputWrapperRef`,class:V(`${f}-base-selection-label`),title:this.patternInputFocused?void 0:ot(this.label)},[e(`input`,g(this.inputProps,{ref:`patternInputRef`,class:`${f}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:a,disabled:a,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,Ot),i?(d(),s(`div`,{class:V(`${f}-base-selection-label__render-label ${f}-base-selection-overlay`),key:`input`},[e(`div`,{class:V(`${f}-base-selection-overlay__wrapper`)},[h?(d(),s(n,{key:0},[q(()=>h({option:this.selectedOption,handleClose:()=>{}}))],64)):(d(),s(n,{key:1},[_?(d(),s(n,{key:0},[q(()=>_(this.selectedOption,!0))],64)):(d(),s(n,{key:1},[q(()=>Q(this.label,this.selectedOption,!0))],64))],64))],2)],2)):q(()=>null),r?(d(),s(`div`,{class:V(`${f}-base-selection-placeholder ${f}-base-selection-overlay`),key:`placeholder`},[e(`div`,{class:V(`${f}-base-selection-overlay__wrapper`)},[q(()=>this.filterablePlaceholder)],2)],2)):q(()=>null),q(()=>S)],10,Dt)))(C)}else C=(t=>(d(),s(`div`,{key:10,ref:`singleElRef`,class:V(`${f}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(d(),s(`div`,{class:V(`${f}-base-selection-placeholder ${f}-base-selection-overlay`),key:`placeholder`},[e(`div`,{class:V(`${f}-base-selection-placeholder__inner`)},[q(()=>this.placeholder)],2)],2)):(d(),s(`div`,{class:V(`${f}-base-selection-input`),title:ot(this.label),key:`input`},[e(`div`,{class:V(`${f}-base-selection-input__content`)},[h?(d(),s(n,{key:0},[q(()=>h({option:this.selectedOption,handleClose:()=>{}}))],64)):(d(),s(n,{key:1},[_?(d(),s(n,{key:0},[q(()=>_(this.selectedOption,!0))],64)):(d(),s(n,{key:1},[q(()=>Q(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),q(()=>S)],10,kt)))(C);return d(),s(`div`,{ref:`selfRef`,class:V([`${f}-base-selection`,this.rtlEnabled&&`${f}-base-selection--rtl`,this.themeClass,t&&`${f}-base-selection--${t}-status`,{[`${f}-base-selection--active`]:this.active,[`${f}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${f}-base-selection--disabled`]:this.disabled,[`${f}-base-selection--multiple`]:this.multiple,[`${f}-base-selection--focus`]:this.focused}]),style:v(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[q(()=>C),u?(d(),s(`div`,{key:0,class:V(`${f}-base-selection__border`)},null,2)):q(()=>null),u?(d(),s(`div`,{key:2,class:V(`${f}-base-selection__state-border`)},null,2)):q(()=>null)],46,At)}}),Mt=O([A(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),A(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Oe({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),Nt={...U.props,to:ce.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},Pt=l({name:`Select`,props:Nt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=ee(e),s=U(`Select`,`-select`,Mt,Ee,e,t),c=r(e.defaultValue),l=C(e,`value`),u=we(l,c),d=r(!1),f=r(``),p=Se(e,[`items`,`options`]),m=r([]),h=r([]),g=S(()=>h.value.concat(m.value).concat(p.value)),_=S(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return bt(e,i);let a=t[r];return typeof a==`string`?bt(e,a):typeof a==`number`&&bt(e,String(a))}}),v=S(()=>{if(e.remote)return p.value;{let{value:t}=g,{value:n}=f;return!n.length||!e.filterable?t:St(t,_.value,n,e.childrenField)}}),y=S(()=>{let{valueField:t,childrenField:n}=e,r=xt(t,n);return me(v.value,r)}),b=S(()=>Ct(g.value,e.valueField,e.childrenField)),T=r(!1),E=we(C(e,`show`),T),O=r(null),k=r(null),A=r(null),{localeRef:j}=ae(`Select`),N=S(()=>e.placeholder??j.value.placeholder),P=[],F=r(new Map),I=S(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function L(t){let n=e.remote,{value:r}=F,{value:i}=b,{value:a}=I,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let R=S(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?L(e):[]}return null}),z=S(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:L([t])[0]||null:null}),B=te(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:V,mergedDisabledRef:H,mergedStatusRef:ne}=B;function W(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=B;r&&M(r,t,n),a&&M(a,t,n),i&&M(i,t,n),c.value=t,o(),s()}function G(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=B;n&&M(n,t),r()}function K(){let{onClear:t}=e;t&&M(t)}function q(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=B;n&&M(n,t),i(),r&&X()}function J(t){let{onSearch:n}=e;n&&M(n,t)}function Y(t){let{onScroll:n}=e;n&&M(n,t)}function re(){let{remote:t,multiple:n}=e;if(t){let{value:t}=F;if(n){let{valueField:n}=e;R.value?.forEach(e=>{t.set(e[n],e)})}else{let n=z.value;n&&t.set(n[e.valueField],n)}}}function ie(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&M(n,t),r&&M(r,t),T.value=t}function X(){H.value||(ie(!0),T.value=!0,e.filterable&&Pe())}function Z(){ie(!1)}function oe(){f.value=``,h.value=P}let le=r(!1);function ue(){e.filterable&&(le.value=!0)}function de(){e.filterable&&(le.value=!1,E.value||oe())}function fe(){H.value||(E.value?e.filterable?Pe():Z():X())}function pe(e){A.value?.selfRef?.contains(e.relatedTarget)||(d.value=!1,G(e),Z())}function he(e){q(e),d.value=!0}function ge(){d.value=!0}function ve(e){O.value?.$el.contains(e.relatedTarget)||(d.value=!1,G(e),Z())}function ye(){O.value?.focus(),Z()}function be(e){E.value&&(O.value?.$el.contains(_e(e))||Z())}function xe(t){if(!Array.isArray(t))return[];if(I.value)return Array.from(t);{let{remote:n}=e,{value:r}=b;if(n){let{value:e}=F;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function Ce(e){Q(e.rawNode)}function Q(t){if(H.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=h,t=e[0]||null;if(t){let e=m.value;e.length?e.push(t):m.value=[t],h.value=P}}if(r&&F.value.set(t[a],t),e.multiple){let e=xe(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=De(t[a]);~e&&(m.value.splice(e,1),i&&(f.value=``))}}else e.push(t[a]),i&&(f.value=``);W(e,L(e))}else{if(n&&!r){let e=De(t[a]);~e?m.value=[m.value[e]]:m.value=P}Ne(),Z(),W(t[a],t)}}function De(t){return m.value.findIndex(n=>n[e.valueField]===t)}function Oe(t){E.value||X();let{value:n}=t.target;f.value=n;let{tag:r,remote:i}=e;if(J(n),r&&!i){if(!n){h.value=P;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;p.value.some(e=>e[i]===r[i]||e[a]===r[a])||m.value.some(e=>e[i]===r[i]||e[a]===r[a])?h.value=P:h.value=[r]}}function ke(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Z(),r&&!i&&a&&(m.value=P),K(),n?W([],[]):W(null,null)}function Ae(e){!se(e,`action`)&&!se(e,`empty`)&&!se(e,`header`)&&e.preventDefault()}function je(e){Y(e)}function Me(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!O.value?.isComposing){if(E.value){let t=A.value?.getPendingTmNode();t?Ce(t):e.filterable||(Z(),Ne())}else if(X(),e.tag&&le.value){let t=h.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Q(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;E.value&&A.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;E.value?A.value?.next():X();break;case`Escape`:E.value&&(Te(t),Z()),O.value?.focus()}}function Ne(){O.value?.focus()}function Pe(){O.value?.focusInput()}function Fe(){E.value&&k.value?.syncPosition()}re(),x(C(e,`options`),re);let Ie={focus:()=>{O.value?.focus()},focusInput:()=>{O.value?.focusInput()},blur:()=>{O.value?.blur()},blurInput:()=>{O.value?.blurInput()}},Le=S(()=>{let{self:{menuBoxShadow:e}}=s.value;return{"--n-menu-box-shadow":e}}),Re=a?w(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:ne,mergedClsPrefix:t,mergedBordered:n,namespace:i,treeMate:y,isMounted:D(),triggerRef:O,menuRef:A,pattern:f,uncontrolledShow:T,mergedShow:E,adjustedTo:ce(e),uncontrolledValue:c,mergedValue:u,followerRef:k,localizedPlaceholder:N,selectedOption:z,selectedOptions:R,mergedSize:V,mergedDisabled:H,focused:d,activeWithoutMenuOpen:le,inlineThemeDisabled:a,onTriggerInputFocus:ue,onTriggerInputBlur:de,handleTriggerOrMenuResize:Fe,handleMenuFocus:ge,handleMenuBlur:ve,handleMenuTabOut:ye,handleTriggerClick:fe,handleToggle:Ce,handleDeleteOption:Q,handlePatternInput:Oe,handleClear:ke,handleTriggerBlur:pe,handleTriggerFocus:he,handleKeydown:Me,handleMenuAfterLeave:oe,handleMenuClickOutside:be,handleMenuScroll:je,handleMenuKeydown:Me,handleMenuMousedown:Ae,mergedTheme:s,cssVars:a?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return d(),s(`div`,{class:V(`${this.mergedClsPrefix}-select`)},[t(Z,null,{_:1,default:R(()=>[(d(),c(pe,null,{_:1,default:R(()=>(d(),c(jt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:R(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(d(),c(ue,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===ce.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:R(()=>(d(),c(W,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:R(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),o((d(),c(_t,g(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:R(()=>[this.$slots.empty?.()]),header:R(()=>[this.$slots.header?.()]),action:R(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[L,this.mergedShow],[Pe,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Pe,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{ot as a,ut as i,xt as n,Ye as o,_t as r,Re as s,Pt as t};