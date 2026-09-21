import{H as e,Ht as t,K as n,L as r,Lt as i,Ot as a,Q as o,Tt as s,U as c,W as l,Z as u,_t as d,at as f,dt as p,ht as m,lt as h,mt as g,on as _,ot as v,rt as y,st as b,tt as x,ut as S,wt as C}from"./endpoints-BhTSb8lj.js";import{A as w,C as T,D as E,E as D,Gt as O,Jt as k,Kt as A,P as j,T as M,Xt as N,Yt as P,Zt as F,_ as I,an as L,at as R,et as z,ft as ee,h as te,ht as B,it as V,j as H,k as U,lt as ne,nn as W,nt as G,rt as K,st as q,tt as J,u as Y,v as re,x as ie}from"./createLucideIcon-Byg0Q1WZ.js";import{a as ae,n as X}from"./Input-hhssHGKY.js";import{c as Z,d as oe,f as se,l as ce,n as le,o as ue,p as de,r as fe,s as pe,t as me,u as he}from"./create-Jwvhc5_D.js";import{i as ge,l as _e,o as ve,r as ye,t as be}from"./Scrollbar-Cxvob6a1.js";import{n as xe,r as Se,t as Ce}from"./cssr-BReH0P_Z.js";import{t as we}from"./use-merged-state-D-29Gt4l.js";import{$ as Te,B as Ee,P as De,U as Oe,W as Q,Z as ke,_t as Ae,gt as je,rt as Me,vt as Ne,z as Pe}from"./index-Cbuc1RP1.js";var Fe=o({name:`Empty`,render(){return(()=>{let e=K(`15c1a247ae156450`);return e[0]||=c(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[c(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),c(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`})],-1)})()}}),Ie=A(`empty`,`
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
 `)]),Le={...U.props,description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function},Re=o({name:`Empty`,props:Le,slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=ee(t),a=U(`Empty`,`-empty`,Ie,Ne,t,n),{localeRef:o}=ae(`Empty`),s=e(()=>t.description??i?.value?.Empty?.description),c=e(()=>i?.value?.Empty?.renderIcon||(()=>(g(),l(Fe)))),u=e(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{[F(`iconSize`,e)]:r,[F(`fontSize`,e)]:i,textColor:o,iconColor:s,extraTextColor:c}}=a.value;return{"--n-icon-size":r,"--n-font-size":i,"--n-bezier":n,"--n-text-color":o,"--n-icon-color":s,"--n-extra-text-color":c}}),d=r?w(`empty`,e(()=>{let e=``,{size:n}=t;return e+=n[0],e}),u,t):void 0;return{mergedClsPrefix:n,mergedRenderIcon:c,localizedDescription:e(()=>s.value||o.value.description),cssVars:r?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:i}=this;return i?.(),g(),n(`div`,{class:V([`${t}-empty`,this.themeClass]),style:_(this.cssVars)},[this.showIcon?(g(),n(`div`,{key:0,class:V(`${t}-empty__icon`)},[e.icon?(g(),n(r,{key:0},[q(()=>e.icon())],64)):(g(),l(Ae,{key:1,clsPrefix:t},{default:this.mergedRenderIcon},1032,[`clsPrefix`]))],2)):q(()=>null),this.showDescription?(g(),n(`div`,{key:2,class:V(`${t}-empty__description`)},[e.default?(g(),n(r,{key:0},[q(()=>e.default())],64)):(g(),n(r,{key:1},[q(()=>this.localizedDescription)],64))],2)):q(()=>null),e.extra?(g(),n(`div`,{key:4,class:V(`${t}-empty__extra`)},[q(()=>e.extra())],2)):q(()=>null)],6)}});function ze(e){return e&-e}var Be=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=ze(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=ze(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Ve;function He(){return typeof document>`u`?!1:(Ve===void 0&&(Ve=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Ve)}var Ue;function We(){return typeof document>`u`?1:(Ue===void 0&&(Ue=`chrome`in window?window.devicePixelRatio:1),Ue)}var Ge=`VVirtualListXScroll`;function Ke({columnsRef:t,renderColRef:n,renderItemWithColsRef:r}){let a=i(0),o=i(0),s=e(()=>{let e=t.value;if(e.length===0)return null;let n=new Be(e.length,0);return e.forEach((e,t)=>{n.add(t,e.width)}),n}),c=E(()=>{let e=s.value;return e===null?0:Math.max(e.getBound(o.value)-1,0)}),l=e=>{let t=s.value;return t===null?0:t.sum(e)},u=E(()=>{let e=s.value;return e===null?0:Math.min(e.getBound(o.value+a.value)+1,t.value.length-1)});return m(Ge,{startIndexRef:c,endIndexRef:u,columnsRef:t,renderColRef:n,renderItemWithColsRef:r,getLeft:l}),{listWidthRef:a,scrollLeftRef:o}}var qe=o({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=y(Ge);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),Je=Ce(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Ce(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Ce(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ye=o({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(n){let r=ne();Je.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:xe,ssr:r}),p(()=>{let{defaultScrollIndex:e,defaultScrollKey:t}=n;e==null?t!=null&&x({key:t}):x({index:e})});let a=!1,o=!1;b(()=>{if(a=!1,!o){o=!0;return}x({top:_.value,left:l.value})}),S(()=>{a=!0,o||=!0});let s=E(()=>{if(n.renderCol==null&&n.renderItemWithCols==null||n.columns.length===0)return;let e=0;return n.columns.forEach(t=>{e+=t.width}),e}),c=e(()=>{let e=new Map,{keyField:t}=n;return n.items.forEach((n,r)=>{e.set(n[t],r)}),e}),{scrollLeftRef:l,listWidthRef:u}=Ke({columnsRef:t(n,`columns`),renderColRef:t(n,`renderCol`),renderItemWithColsRef:t(n,`renderItemWithCols`)}),d=i(null),f=i(void 0),m=new Map,h=e(()=>{let{items:e,itemSize:t,keyField:r}=n,i=new Be(e.length,t);return e.forEach((e,t)=>{let n=e[r],a=m.get(n);a!==void 0&&i.add(t,a)}),i}),g=i(0),_=i(0),v=E(()=>Math.max(h.value.getBound(_.value-z(n.paddingTop))-1,0)),y=e(()=>{let{value:e}=f;if(e===void 0)return[];let{items:t,itemSize:r}=n,i=v.value,a=Math.min(i+Math.ceil(e/r+1),t.length-1),o=[];for(let e=i;e<=a;++e)o.push(t[e]);return o}),x=(e,t)=>{if(typeof e==`number`){D(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:o,behavior:s,debounce:l=!0}=e;if(n!==void 0||r!==void 0)D(n,r,s);else if(i!==void 0)T(i,s,l);else if(a!==void 0){let e=c.value.get(a);e!==void 0&&T(e,s,l)}else o===`bottom`?D(0,2**53-1,s):o===`top`&&D(0,0,s)},C,w=null;function T(e,t,r){let i=d.value;if(i==null)return;let{value:a}=h,o=a.sum(e)+z(n.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:t});else{C=e,w!==null&&window.clearTimeout(w),w=window.setTimeout(()=>{C=void 0,w=null},16);let{scrollTop:n,offsetHeight:r}=i;if(o>n){let s=a.get(e);o+s<=n+r||i.scrollTo({left:0,top:o+s-r,behavior:t})}else i.scrollTo({left:0,top:o,behavior:t})}}function D(e,t,n){d.value?.scrollTo({left:e,top:t,behavior:n})}function O(e,t){if(a||n.ignoreItemResize||F(t.target))return;let{value:r}=h,i=c.value.get(e),o=r.get(i),s=t.borderBoxSize?.[0]?.blockSize??t.contentRect.height;if(s===o)return;s-n.itemSize===0?m.delete(e):m.set(e,s-n.itemSize);let l=s-o;if(l===0)return;r.add(i,l);let u=d.value;if(u!=null){if(C===void 0){let e=r.sum(i);u.scrollTop>e&&u.scrollBy(0,l)}else(i<C||i===C&&s+r.sum(i)>u.scrollTop+u.offsetHeight)&&u.scrollBy(0,l);P()}g.value++}let k=!He(),A=!1;function j(e){var t;(t=n.onScroll)==null||t.call(n,e),(!k||!A)&&P()}function M(e){var t;if((t=n.onWheel)==null||t.call(n,e),k){let t=d.value;if(t!=null){if(e.deltaX===0&&(t.scrollTop===0&&e.deltaY<=0||t.scrollTop+t.offsetHeight>=t.scrollHeight&&e.deltaY>=0))return;e.preventDefault(),t.scrollTop+=e.deltaY/We(),t.scrollLeft+=e.deltaX/We(),P(),A=!0,de(()=>{A=!1})}}}function N(e){if(a||F(e.target))return;if(n.renderCol==null&&n.renderItemWithCols==null){if(e.contentRect.height===f.value)return}else if(e.contentRect.height===f.value&&e.contentRect.width===u.value)return;f.value=e.contentRect.height,u.value=e.contentRect.width;let{onResize:t}=n;t!==void 0&&t(e)}function P(){let{value:e}=d;e!=null&&(_.value=e.scrollTop,l.value=e.scrollLeft)}function F(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:f,listStyle:{overflow:`auto`},keyToIndex:c,itemsStyle:e(()=>{let{itemResizable:e}=n,t=G(h.value.sum());return g.value,[n.itemsStyle,{boxSizing:`content-box`,width:G(s.value),height:e?``:t,minHeight:e?t:``,paddingTop:G(n.paddingTop),paddingBottom:G(n.paddingBottom)}]}),visibleItemsStyle:e(()=>(g.value,{transform:`translateY(${G(h.value.sum(v.value))})`})),viewportItems:y,listElRef:d,itemsElRef:i(null),scrollTo:x,handleListResize:N,handleListScroll:j,handleListWheel:M,handleItemResize:O}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return x(ye,{onResize:this.handleListResize},{default:()=>{var i;return x(`div`,f(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):x(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[x(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:x(qe,{index:s,item:a}),l=i==null?void 0:x(qe,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?x(ye,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Xe=Ce(`[v-hidden]`,{display:`none!important`}),Ze=o({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=i(null),r=i(null);function a(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let o=ne();return Xe.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:xe,ssr:o}),p(()=>a({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:a}},render(){let{$slots:e}=this;return v(()=>this.sync({showAllItemsBeforeCalculate:!1})),x(`div`,{class:`v-overflow`,ref:`selfRef`},[d(e,`default`),e.counter?e.counter():x(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Qe(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:D,buttonColor2Pressed:O,fontWeightStrong:k}=e;return{...Te,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:k,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:D,colorPressedCheckable:O,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${j(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:j(i,{alpha:.12}),colorBorderedPrimary:j(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:j(i,{alpha:.12}),closeColorPressedPrimary:j(i,{alpha:.18}),borderInfo:`1px solid ${j(a,{alpha:.3})}`,textColorInfo:a,colorInfo:j(a,{alpha:.12}),colorBorderedInfo:j(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:j(a,{alpha:.12}),closeColorPressedInfo:j(a,{alpha:.18}),borderSuccess:`1px solid ${j(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:j(o,{alpha:.12}),colorBorderedSuccess:j(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:j(o,{alpha:.12}),closeColorPressedSuccess:j(o,{alpha:.18}),borderWarning:`1px solid ${j(s,{alpha:.35})}`,textColorWarning:s,colorWarning:j(s,{alpha:.15}),colorBorderedWarning:j(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:j(s,{alpha:.12}),closeColorPressedWarning:j(s,{alpha:.18}),borderError:`1px solid ${j(c,{alpha:.23})}`,textColorError:c,colorError:j(c,{alpha:.1}),colorBorderedError:j(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:j(c,{alpha:.12}),closeColorPressedError:j(c,{alpha:.18})}}var $e={name:`Tag`,common:H,self:Qe},et={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},tt=A(`tag`,`
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
 `,[N(`disabled`,[O(`&:hover`,`background-color: var(--n-color-checked-hover);`),O(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),nt=[`onClick`,`onMouseenter`,`onMouseleave`],rt={...U.props,...et,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},it=B(`n-tag`),at=o({name:`Tag`,props:rt,slots:Object,setup(n){let r=i(null),{mergedBorderedRef:a,mergedClsPrefixRef:o,inlineThemeDisabled:s,mergedRtlRef:c,mergedComponentPropsRef:l}=ee(n),u=e(()=>n.size||l?.value?.Tag?.size||`medium`),d=U(`Tag`,`-tag`,tt,$e,n,o);m(it,{roundRef:t(n,`round`)});function f(){if(!n.disabled&&n.checkable){let{checked:e,onCheckedChange:t,onUpdateChecked:r,"onUpdate:checked":i}=n;r&&r(!e),i&&i(!e),t&&t(!e)}}function p(e){if(n.triggerClickOnClose||e.stopPropagation(),!n.disabled){let{onClose:t}=n;t&&M(t,e)}}let h={setTextContent(e){let{value:t}=r;t&&(t.textContent=e)}},g=re(`Tag`,c,o),_=e(()=>{let{type:e,color:{color:t,textColor:r}={}}=n,i=u.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[F(`colorBordered`,e)]:T,[F(`closeSize`,i)]:E,[F(`closeIconSize`,i)]:D,[F(`fontSize`,i)]:O,[F(`height`,i)]:k,[F(`color`,e)]:A,[F(`textColor`,e)]:j,[F(`border`,e)]:M,[F(`closeIconColor`,e)]:N,[F(`closeIconColorHover`,e)]:P,[F(`closeIconColorPressed`,e)]:I,[F(`closeColorHover`,e)]:L,[F(`closeColorPressed`,e)]:R}}=d.value,z=J(c);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":M,"--n-close-icon-size":D,"--n-close-color-pressed":R,"--n-close-color-hover":L,"--n-close-border-radius":C,"--n-close-icon-color":N,"--n-close-icon-color-hover":P,"--n-close-icon-color-pressed":I,"--n-close-icon-color-disabled":N,"--n-close-margin-top":z.top,"--n-close-margin-right":z.right,"--n-close-margin-bottom":z.bottom,"--n-close-margin-left":z.left,"--n-close-size":E,"--n-color":t||(a.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":r||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),v=s?w(`tag`,e(()=>{let e=``,{type:t,color:{color:r,textColor:i}={}}=n;return e+=t[0],e+=u.value[0],r&&(e+=`a${I(r)}`),i&&(e+=`b${I(i)}`),a.value&&(e+=`c`),e}),_,n):void 0;return{...h,rtlEnabled:g,mergedClsPrefix:o,contentRef:r,mergedBordered:a,handleClick:f,handleCloseClick:p,cssVars:s?void 0:_,themeClass:v?.themeClass,onRender:v?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let u=T(s.avatar,t=>t&&(g(),n(`div`,{class:V(`${e}-tag__avatar`)},[q(()=>t)],2))),d=T(s.icon,t=>t&&(g(),n(`div`,{class:V(`${e}-tag__icon`)},[q(()=>t)],2)));return g(),n(`div`,{class:V([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:a,[`${e}-tag--avatar`]:u,[`${e}-tag--icon`]:d,[`${e}-tag--closable`]:r}]),style:_(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[q(()=>d||u),c(`span`,{class:V(`${e}-tag__content`),ref:`contentRef`},[q(()=>this.$slots.default?.())],2),!this.checkable&&r?(g(),l(ke,{key:0,clsPrefix:e,class:V(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):q(()=>null),!this.checkable&&this.mergedBordered?(g(),n(`div`,{key:2,class:V(`${e}-tag__border`),style:_({borderColor:i})},null,6)):q(()=>null)],46,nt)}});function ot(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function st(e,t){t&&(p(()=>{let{value:n}=e;n&&ge.registerHandler(n,t)}),C(e,(e,t)=>{t&&ge.unregisterHandler(t)},{deep:!1}),h(()=>{let{value:t}=e;t&&ge.unregisterHandler(t)}))}var ct=o({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=K(`d16ead82505dc285`);return g(),n(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),lt=o({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=y(oe);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:r,nodeProps:i,tmNode:{rawNode:a}}=this,o=i?.(a),s=t?t(a,!1):Q(a[this.labelField],a,!1),c=(g(),n(`div`,f(o,{class:[`${e}-base-select-group-header`,o?.class]}),[q(()=>s)],16));return a.render?a.render({node:c,option:a}):r?r({node:c,option:a,selected:!1}):c}});function ut(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var dt=o({name:`Checkmark`,render(){return(()=>{let e=K(`3c84eac8ae4e1f96`);return e[0]||=c(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[c(`g`,{fill:`none`},[c(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ft=[`onClick`,`onMouseenter`,`onMousemove`];function pt(e,t){return g(),l(W,{name:`fade-in-scale-up-transition`},{default:()=>e?(g(),l(Ae,{key:1,clsPrefix:t,class:V(`${t}-base-select-option__check`)},{default:()=>x(dt)},1032,[`clsPrefix`,`class`])):null},1024)}var mt=o({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:f}=y(oe),p=E(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function m(t){let{tmNode:n}=e;n.disabled||d(t,n)}function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e,{value:r}=p;n.disabled||r||f(t,n)}return{multiple:r,isGrouped:E(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:p,isSelected:E(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:g,handleMouseEnter:h,handleClick:m}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:r,isPending:i,isGrouped:a,showCheckmark:o,nodeProps:s,renderOption:l,renderLabel:u,handleClick:d,handleMouseEnter:p,handleMouseMove:m}=this,h=pt(r,e),_=u?[u(t,r),o&&h]:[Q(t[this.labelField],t,r),o&&h],v=s?.(t),y=(g(),n(`div`,f(v,{class:[`${e}-base-select-option`,t.class,v?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:r,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:i,[`${e}-base-select-option--show-checkmark`]:o}],style:[v?.style||``,t.style||``],onClick:ut([d,v?.onClick]),onMouseenter:ut([p,v?.onMouseenter]),onMousemove:ut([m,v?.onMousemove])}),[c(`div`,{class:V(`${e}-base-select-option__content`)},[q(()=>_)],2)],16,ft));return t.render?t.render({node:y,option:t,selected:r}):l?l({node:y,option:t,selected:r}):y}}),ht=A(`base-select-menu`,`
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
 `,[Oe({enterScale:`0.5`})])])]),gt=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],_t=o({name:`InternalSelectMenu`,props:{...U.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(n){let{mergedClsPrefixRef:r,mergedRtlRef:a,mergedComponentPropsRef:o}=ee(n),s=re(`InternalSelectMenu`,a,r),c=U(`InternalSelectMenu`,`-internal-select-menu`,ht,je,n,t(n,`clsPrefix`)),l=i(null),u=i(null),d=i(null),f=e(()=>n.treeMate.getFlattenedNodes()),g=e(()=>le(f.value)),_=i(null);function y(){let{treeMate:e}=n,t=null,{value:r}=n;r===null?t=e.getFirstAvailableNode():(t=n.multiple?e.getNode((r||[])[(r||[]).length-1]):e.getNode(r),(!t||t.disabled)&&(t=e.getFirstAvailableNode())),H(t||null)}function b(){let{value:e}=_;e&&!n.treeMate.getNode(e.key)&&(_.value=null)}let x;C(()=>n.show,e=>{e?x=C(()=>n.treeMate,()=>{n.resetMenuOnOptionsChange?(n.autoPending?y():b(),v(ne)):b()},{immediate:!0}):x?.()},{immediate:!0}),h(()=>{x?.()});let S=e(()=>z(c.value.self[F(`optionHeight`,n.size)])),T=e(()=>J(c.value.self[F(`padding`,n.size)])),E=e(()=>n.multiple&&Array.isArray(n.value)?new Set(n.value):new Set),D=e(()=>{let e=f.value;return e&&e.length===0}),O=e(()=>o?.value?.Select?.renderEmpty);function k(e){let{onToggle:t}=n;t&&t(e)}function A(e){let{onScroll:t}=n;t&&t(e)}function j(e){d.value?.sync(),A(e)}function M(){d.value?.sync()}function N(){let{value:e}=_;return e||null}function P(e,t){t.disabled||H(t,!1)}function I(e,t){t.disabled||k(t)}function L(e){se(e,`action`)||n.onKeyup?.(e)}function R(e){se(e,`action`)||n.onKeydown?.(e)}function te(e){n.onMousedown?.(e),!n.focusable&&e.preventDefault()}function B(){let{value:e}=_;e&&H(e.getNext({loop:!0}),!0)}function V(){let{value:e}=_;e&&H(e.getPrev({loop:!0}),!0)}function H(e,t=!1){_.value=e,t&&ne()}function ne(){let e=_.value;if(!e)return;let t=g.value(e.key);t!==null&&(n.virtualScroll?u.value?.scrollTo({index:t}):d.value?.scrollTo({index:t,elSize:S.value}))}function W(e){l.value?.contains(e.target)&&n.onFocus?.(e)}function G(e){l.value?.contains(e.relatedTarget)||n.onBlur?.(e)}m(oe,{handleOptionMouseEnter:P,handleOptionClick:I,valueSetRef:E,pendingTmNodeRef:_,nodePropsRef:t(n,`nodeProps`),showCheckmarkRef:t(n,`showCheckmark`),multipleRef:t(n,`multiple`),valueRef:t(n,`value`),renderLabelRef:t(n,`renderLabel`),renderOptionRef:t(n,`renderOption`),labelFieldRef:t(n,`labelField`),valueFieldRef:t(n,`valueField`)}),m(he,l),p(()=>{let{value:e}=d;e&&e.sync()});let K=e(()=>{let{size:e}=n,{common:{cubicBezierEaseInOut:t},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:o,actionDividerColor:s,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[F(`optionFontSize`,e)]:x,[F(`optionHeight`,e)]:S,[F(`optionPadding`,e)]:C}}=c.value;return{"--n-height":r,"--n-action-divider-color":s,"--n-action-text-color":h,"--n-bezier":t,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":o,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":J(C,`left`),"--n-option-padding-right":J(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:q}=n,Y=q?w(`internal-select-menu`,e(()=>n.size[0]),K,n):void 0,ie={selfRef:l,next:B,prev:V,getPendingTmNode:N};return st(l,n.onResize),{mergedTheme:c,mergedClsPrefix:r,rtlEnabled:s,virtualListRef:u,scrollbarRef:d,itemSize:S,padding:T,flattenedNodes:f,empty:D,mergedRenderEmpty:O,virtualListContainer(){let{value:e}=u;return e?.listElRef},virtualListContent(){let{value:e}=u;return e?.itemsElRef},doScroll:A,handleFocusin:W,handleFocusout:G,handleKeyUp:L,handleKeyDown:R,handleMouseDown:te,handleVirtualListResize:M,handleVirtualListScroll:j,cssVars:q?void 0:K,themeClass:Y?.themeClass,onRender:Y?.onRender,...ie}},render(){let{$slots:e,virtualScroll:t,clsPrefix:i,mergedTheme:a,themeClass:o,onRender:s}=this;return s?.(),g(),n(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:V([`${i}-base-select-menu`,`${i}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${i}-base-select-menu--rtl`,o,this.multiple&&`${i}-base-select-menu--multiple`]),style:_(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[q(()=>T(e.header,e=>e&&(g(),n(`div`,{class:V(`${i}-base-select-menu__header`),"data-header":!0,key:`header`},[q(()=>e)],2)))),this.loading?(g(),n(`div`,{key:0,class:V(`${i}-base-select-menu__loading`)},[(g(),l(Y,{clsPrefix:i,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(g(),n(r,{key:1},[this.empty?(g(),n(`div`,{key:1,class:V(`${i}-base-select-menu__empty`),"data-empty":!0},[q(()=>ie(e.empty,()=>[this.mergedRenderEmpty?.()||(g(),l(Re,{theme:a.peers.Empty,themeOverrides:a.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(g(),l(be,f({key:0,ref:`scrollbarRef`,theme:a.peers.Scrollbar,themeOverrides:a.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(g(),l(Ye,{key:1,ref:`virtualListRef`,class:V(`${i}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(g(),l(lt,{key:e.key,clsPrefix:i,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(g(),l(mt,{clsPrefix:i,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(g(),n(`div`,{key:4,class:V(`${i}-base-select-menu-option-wrapper`),style:_({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[q(()=>this.flattenedNodes.map(e=>e.isGroup?(g(),l(lt,{key:e.key,clsPrefix:i,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(g(),l(mt,{clsPrefix:i,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),q(()=>T(e.action,e=>e&&[(g(),n(`div`,{class:V(`${i}-base-select-menu__action`),"data-action":!0,key:`action`},[q(()=>e)],2)),(g(),l(ct,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,gt)}});function vt(e){return e.type===`group`}function yt(e){return e.type===`ignored`}function bt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function xt(e,t){return{getIsGroup:vt,getIgnored:yt,getKey(t){return vt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function St(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(vt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(yt(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function Ct(e,t,n){let r=new Map;return e.forEach(e=>{vt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var wt=O([A(`base-selection`,`
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
 `)])])]),Tt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],Et=[`tabindex`],Dt=[`title`],Ot=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],kt=[`tabindex`],At=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],jt=o({name:`InternalSelection`,props:{...U.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(n){let{mergedClsPrefixRef:r,mergedRtlRef:a}=ee(n),o=re(`InternalSelection`,a,r),c=i(null),l=i(null),u=i(null),d=i(null),f=i(null),m=i(null),h=i(null),g=i(null),_=i(null),y=i(null),b=i(!1),x=i(!1),S=i(!1),T=U(`InternalSelection`,`-internal-selection`,wt,Ee,n,t(n,`clsPrefix`)),E=e(()=>n.clearable&&!n.disabled&&(S.value||n.active)),D=e(()=>n.selectedOption?n.renderTag?n.renderTag({option:n.selectedOption,handleClose:()=>{}}):n.renderLabel?n.renderLabel(n.selectedOption,!0):Q(n.selectedOption[n.labelField],n.selectedOption,!0):n.placeholder),O=e(()=>{let e=n.selectedOption;if(e)return e[n.labelField]}),k=e(()=>n.multiple?!!(Array.isArray(n.selectedOptions)&&n.selectedOptions.length):n.selectedOption!==null);function A(){let{value:e}=c;if(e){let{value:t}=l;t&&(t.style.width=`${e.offsetWidth}px`,n.maxTagCount!==`responsive`&&_.value?.sync({showAllItemsBeforeCalculate:!1}))}}function j(){let{value:e}=y;e&&(e.style.display=`none`)}function M(){let{value:e}=y;e&&(e.style.display=`inline-block`)}C(t(n,`active`),e=>{e||j()}),C(t(n,`pattern`),()=>{n.multiple&&v(A)});function N(e){let{onFocus:t}=n;t&&t(e)}function P(e){let{onBlur:t}=n;t&&t(e)}function I(e){let{onDeleteOption:t}=n;t&&t(e)}function L(e){let{onClear:t}=n;t&&t(e)}function R(e){let{onPatternInput:t}=n;t&&t(e)}function z(e){(!e.relatedTarget||!u.value?.contains(e.relatedTarget))&&N(e)}function te(e){u.value?.contains(e.relatedTarget)||P(e)}function B(e){L(e)}function V(){S.value=!0}function H(){S.value=!1}function ne(e){n.active&&n.filterable&&e.target!==l.value&&e.preventDefault()}function W(e){I(e)}let G=i(!1);function K(e){if(e.key===`Backspace`&&!G.value&&!n.pattern.length){let{selectedOptions:e}=n;e?.length&&W(e[e.length-1])}}let q=null;function Y(e){let{value:t}=c;t&&(t.textContent=e.target.value,A()),n.ignoreComposition&&G.value?q=e:R(e)}function ie(){G.value=!0}function ae(){G.value=!1,n.ignoreComposition&&R(q),q=null}function X(e){x.value=!0,n.onPatternFocus?.(e)}function Z(e){x.value=!1,n.onPatternBlur?.(e)}function oe(){if(n.filterable)x.value=!1,m.value?.blur(),l.value?.blur();else if(n.multiple){let{value:e}=d;e?.blur()}else{let{value:e}=f;e?.blur()}}function se(){n.filterable?(x.value=!1,m.value?.focus()):n.multiple?d.value?.focus():f.value?.focus()}function ce(){let{value:e}=l;e&&(M(),e.focus())}function le(){let{value:e}=l;e&&e.blur()}function ue(e){let{value:t}=h;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=g;return e}function fe(){return l.value}let pe=null;function me(){pe!==null&&window.clearTimeout(pe)}function he(){n.active||(me(),pe=window.setTimeout(()=>{k.value&&(b.value=!0)},100))}function ge(){me()}function _e(e){e||(me(),b.value=!1)}C(k,e=>{e||(b.value=!1)}),p(()=>{s(()=>{let e=m.value;e&&(n.disabled?e.removeAttribute(`tabindex`):e.tabIndex=x.value?-1:0)})}),st(u,n.onResize);let{inlineThemeDisabled:ve}=n,ye=e(()=>{let{size:e}=n,{common:{cubicBezierEaseInOut:t},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:C,loadingColor:w,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:I,boxShadowActiveError:L,boxShadowHoverError:R,borderError:z,borderFocusError:ee,borderHoverError:te,borderActiveError:B,clearColor:V,clearColorHover:H,clearColorPressed:U,clearSize:ne,arrowSize:W,[F(`height`,e)]:G,[F(`fontSize`,e)]:K}}=T.value,q=J(c),Y=J(l);return{"--n-bezier":t,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":K,"--n-height":G,"--n-padding-single-top":q.top,"--n-padding-multiple-top":Y.top,"--n-padding-single-right":q.right,"--n-padding-multiple-right":Y.right,"--n-padding-single-left":q.left,"--n-padding-multiple-left":Y.left,"--n-padding-single-bottom":q.bottom,"--n-padding-multiple-bottom":Y.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":C,"--n-loading-color":w,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":L,"--n-box-shadow-hover-error":R,"--n-border-error":z,"--n-border-focus-error":ee,"--n-border-hover-error":te,"--n-border-active-error":B,"--n-clear-size":ne,"--n-clear-color":V,"--n-clear-color-hover":H,"--n-clear-color-pressed":U,"--n-arrow-size":W,"--n-font-weight":r}}),be=ve?w(`internal-selection`,e(()=>n.size[0]),ye,n):void 0;return{mergedTheme:T,mergedClearable:E,mergedClsPrefix:r,rtlEnabled:o,patternInputFocused:x,filterablePlaceholder:D,label:O,selected:k,showTagsPanel:b,isComposing:G,counterRef:h,counterWrapperRef:g,patternInputMirrorRef:c,patternInputRef:l,selfRef:u,multipleElRef:d,singleElRef:f,patternInputWrapperRef:m,overflowRef:_,inputTagElRef:y,handleMouseDown:ne,handleFocusin:z,handleClear:B,handleMouseEnter:V,handleMouseLeave:H,handleDeleteOption:W,handlePatternKeyDown:K,handlePatternInputInput:Y,handlePatternInputBlur:Z,handlePatternInputFocus:X,handleMouseEnterCounter:he,handleMouseLeaveCounter:ge,handleFocusout:te,handleCompositionEnd:ae,handleCompositionStart:ie,onPopoverUpdateShow:_e,focus:se,focusInput:ce,blur:oe,blurInput:le,updateCounter:ue,getCounter:de,getTail:fe,renderLabel:n.renderLabel,cssVars:ve?void 0:ye,themeClass:be?.themeClass,onRender:be?.onRender}},render(){let{status:e,multiple:t,size:i,disabled:a,filterable:o,maxTagCount:s,bordered:u,clsPrefix:d,ellipsisTagPopoverProps:p,onRender:m,renderTag:h,renderLabel:v}=this;m?.();let y=s===`responsive`,b=typeof s==`number`,x=y||b,S=(g(),l(ve,null,{default:()=>(g(),l(X,{clsPrefix:d,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),C;if(t){let{labelField:e}=this,t=t=>(g(),n(`div`,{class:V(`${d}-base-selection-tag-wrapper`),key:t.value},[h?(g(),n(r,{key:0},[q(()=>h({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(g(),l(at,{key:1,size:i,closable:!t.disabled,disabled:a,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>v?v(t,!0):Q(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),u=()=>(b?this.selectedOptions.slice(0,s):this.selectedOptions).map(t),m=o?(g(),n(`div`,{class:V(`${d}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[c(`input`,f(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:a,value:this.pattern,autofocus:this.autofocus,class:`${d}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,Tt),c(`span`,{ref:`patternInputMirrorRef`,class:V(`${d}-base-selection-input-tag__mirror`)},[q(()=>this.pattern)],2)],2)):null,_=y?()=>(g(),n(`div`,{class:V(`${d}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(g(),l(at,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:a},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,w;if(b){let e=this.selectedOptions.length-s;e>0&&(w=(t=>(g(),n(`div`,{class:V(`${d}-base-selection-tag-wrapper`),key:`__counter__`},[(g(),l(at,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:a},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(w))}let T=y?o?(g(),l(Ze,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:u,counter:_,tail:()=>m},1032,[`updateCounter`,`getCounter`,`getTail`])):(g(),l(Ze,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:u,counter:_},1032,[`updateCounter`,`getCounter`])):b&&w?u().concat(w):u(),E=x?()=>(g(),n(`div`,{class:V(`${d}-base-selection-popover`)},[y?(g(),n(r,{key:0},[q(()=>u())],64)):(g(),n(r,{key:1},[q(()=>this.selectedOptions.map(t))],64))],2)):void 0,D=x?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...p}:null,O=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(g(),n(`div`,{key:5,class:V(`${d}-base-selection-placeholder ${d}-base-selection-overlay`)},[c(`div`,{class:V(`${d}-base-selection-placeholder__inner`)},[q(()=>this.placeholder)],2)],2)):null,k=o?(g(),n(`div`,{key:6,ref:`patternInputWrapperRef`,class:V(`${d}-base-selection-tags`)},[q(()=>T),y?q(()=>null):(g(),n(r,{key:1},[q(()=>m)],64)),q(()=>S)],2)):(g(),n(`div`,{key:7,ref:`multipleElRef`,class:V(`${d}-base-selection-tags`),tabindex:a?void 0:0},[q(()=>T),q(()=>S)],10,Et));C=(e=>(g(),n(r,{key:8},[x?(g(),l(fe,f({key:0},D,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>k,default:E},1040)):(g(),n(r,{key:1},[q(()=>k)],64)),q(()=>O)],64)))(C)}else if(o){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,i=!this.active&&this.selected;C=(e=>(g(),n(`div`,{key:9,ref:`patternInputWrapperRef`,class:V(`${d}-base-selection-label`),title:this.patternInputFocused?void 0:ot(this.label)},[c(`input`,f(this.inputProps,{ref:`patternInputRef`,class:`${d}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:a,disabled:a,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,Ot),i?(g(),n(`div`,{class:V(`${d}-base-selection-label__render-label ${d}-base-selection-overlay`),key:`input`},[c(`div`,{class:V(`${d}-base-selection-overlay__wrapper`)},[h?(g(),n(r,{key:0},[q(()=>h({option:this.selectedOption,handleClose:()=>{}}))],64)):(g(),n(r,{key:1},[v?(g(),n(r,{key:0},[q(()=>v(this.selectedOption,!0))],64)):(g(),n(r,{key:1},[q(()=>Q(this.label,this.selectedOption,!0))],64))],64))],2)],2)):q(()=>null),t?(g(),n(`div`,{class:V(`${d}-base-selection-placeholder ${d}-base-selection-overlay`),key:`placeholder`},[c(`div`,{class:V(`${d}-base-selection-overlay__wrapper`)},[q(()=>this.filterablePlaceholder)],2)],2)):q(()=>null),q(()=>S)],10,Dt)))(C)}else C=(e=>(g(),n(`div`,{key:10,ref:`singleElRef`,class:V(`${d}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(g(),n(`div`,{class:V(`${d}-base-selection-placeholder ${d}-base-selection-overlay`),key:`placeholder`},[c(`div`,{class:V(`${d}-base-selection-placeholder__inner`)},[q(()=>this.placeholder)],2)],2)):(g(),n(`div`,{class:V(`${d}-base-selection-input`),title:ot(this.label),key:`input`},[c(`div`,{class:V(`${d}-base-selection-input__content`)},[h?(g(),n(r,{key:0},[q(()=>h({option:this.selectedOption,handleClose:()=>{}}))],64)):(g(),n(r,{key:1},[v?(g(),n(r,{key:0},[q(()=>v(this.selectedOption,!0))],64)):(g(),n(r,{key:1},[q(()=>Q(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),q(()=>S)],10,kt)))(C);return g(),n(`div`,{ref:`selfRef`,class:V([`${d}-base-selection`,this.rtlEnabled&&`${d}-base-selection--rtl`,this.themeClass,e&&`${d}-base-selection--${e}-status`,{[`${d}-base-selection--active`]:this.active,[`${d}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${d}-base-selection--disabled`]:this.disabled,[`${d}-base-selection--multiple`]:this.multiple,[`${d}-base-selection--focus`]:this.focused}]),style:_(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[q(()=>C),u?(g(),n(`div`,{key:0,class:V(`${d}-base-selection__border`)},null,2)):q(()=>null),u?(g(),n(`div`,{key:2,class:V(`${d}-base-selection__state-border`)},null,2)):q(()=>null)],46,At)}}),Mt=O([A(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),A(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Oe({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),Nt={...U.props,to:ce.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},Pt=o({name:`Select`,props:Nt,slots:Object,setup(n){let{mergedClsPrefixRef:r,mergedBorderedRef:a,namespaceRef:o,inlineThemeDisabled:s,mergedComponentPropsRef:c}=ee(n),l=U(`Select`,`-select`,Mt,De,n,r),u=i(n.defaultValue),d=t(n,`value`),f=we(d,u),p=i(!1),m=i(``),h=Se(n,[`items`,`options`]),g=i([]),_=i([]),v=e(()=>_.value.concat(g.value).concat(h.value)),y=e(()=>{let{filter:e}=n;if(e)return e;let{labelField:t,valueField:r}=n;return(e,n)=>{if(!n)return!1;let i=n[t];if(typeof i==`string`)return bt(e,i);let a=n[r];return typeof a==`string`?bt(e,a):typeof a==`number`&&bt(e,String(a))}}),b=e(()=>{if(n.remote)return h.value;{let{value:e}=v,{value:t}=m;return!t.length||!n.filterable?e:St(e,y.value,t,n.childrenField)}}),x=e(()=>{let{valueField:e,childrenField:t}=n,r=xt(e,t);return me(b.value,r)}),S=e(()=>Ct(v.value,n.valueField,n.childrenField)),T=i(!1),E=we(t(n,`show`),T),O=i(null),k=i(null),A=i(null),{localeRef:j}=ae(`Select`),N=e(()=>n.placeholder??j.value.placeholder),P=[],F=i(new Map),I=e(()=>{let{fallbackOption:e}=n;if(e===void 0){let{labelField:e,valueField:t}=n;return n=>({[e]:String(n),[t]:n})}return e===!1?!1:t=>Object.assign(e(t),{value:t})});function L(e){let t=n.remote,{value:r}=F,{value:i}=S,{value:a}=I,o=[];return e.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(t&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let R=e(()=>{if(n.multiple){let{value:e}=f;return Array.isArray(e)?L(e):[]}return null}),z=e(()=>{let{value:e}=f;return!n.multiple&&!Array.isArray(e)?e===null?null:L([e])[0]||null:null}),B=te(n,{mergedSize:e=>{let{size:t}=n;if(t)return t;let{mergedSize:r}=e||{};return r?.value?r.value:c?.value?.Select?.size||`medium`}}),{mergedSizeRef:V,mergedDisabledRef:H,mergedStatusRef:ne}=B;function W(e,t){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=n,{nTriggerFormChange:o,nTriggerFormInput:s}=B;r&&M(r,e,t),a&&M(a,e,t),i&&M(i,e,t),u.value=e,o(),s()}function G(e){let{onBlur:t}=n,{nTriggerFormBlur:r}=B;t&&M(t,e),r()}function K(){let{onClear:e}=n;e&&M(e)}function q(e){let{onFocus:t,showOnFocus:r}=n,{nTriggerFormFocus:i}=B;t&&M(t,e),i(),r&&X()}function J(e){let{onSearch:t}=n;t&&M(t,e)}function Y(e){let{onScroll:t}=n;t&&M(t,e)}function re(){let{remote:e,multiple:t}=n;if(e){let{value:e}=F;if(t){let{valueField:t}=n;R.value?.forEach(n=>{e.set(n[t],n)})}else{let t=z.value;t&&e.set(t[n.valueField],t)}}}function ie(e){let{onUpdateShow:t,"onUpdate:show":r}=n;t&&M(t,e),r&&M(r,e),T.value=e}function X(){H.value||(ie(!0),T.value=!0,n.filterable&&Ne())}function Z(){ie(!1)}function oe(){m.value=``,_.value=P}let le=i(!1);function ue(){n.filterable&&(le.value=!0)}function de(){n.filterable&&(le.value=!1,E.value||oe())}function fe(){H.value||(E.value?n.filterable?Ne():Z():X())}function pe(e){A.value?.selfRef?.contains(e.relatedTarget)||(p.value=!1,G(e),Z())}function he(e){q(e),p.value=!0}function ge(){p.value=!0}function ve(e){O.value?.$el.contains(e.relatedTarget)||(p.value=!1,G(e),Z())}function ye(){O.value?.focus(),Z()}function be(e){E.value&&(O.value?.$el.contains(_e(e))||Z())}function xe(e){if(!Array.isArray(e))return[];if(I.value)return Array.from(e);{let{remote:t}=n,{value:r}=S;if(t){let{value:t}=F;return e.filter(e=>r.has(e)||t.has(e))}return e.filter(e=>r.has(e))}}function Ce(e){Te(e.rawNode)}function Te(e){if(H.value)return;let{tag:t,remote:r,clearFilterAfterSelect:i,valueField:a}=n;if(t&&!r){let{value:e}=_,t=e[0]||null;if(t){let e=g.value;e.length?e.push(t):g.value=[t],_.value=P}}if(r&&F.value.set(e[a],e),n.multiple){let n=xe(f.value),o=n.findIndex(t=>t===e[a]);if(~o){if(n.splice(o,1),t&&!r){let t=Ee(e[a]);~t&&(g.value.splice(t,1),i&&(m.value=``))}}else n.push(e[a]),i&&(m.value=``);W(n,L(n))}else{if(t&&!r){let t=Ee(e[a]);~t?g.value=[g.value[t]]:g.value=P}Me(),Z(),W(e[a],e)}}function Ee(e){return g.value.findIndex(t=>t[n.valueField]===e)}function Oe(e){E.value||X();let{value:t}=e.target;m.value=t;let{tag:r,remote:i}=n;if(J(t),r&&!i){if(!t){_.value=P;return}let{onCreate:e}=n,r=e?e(t):{[n.labelField]:t,[n.valueField]:t},{valueField:i,labelField:a}=n;h.value.some(e=>e[i]===r[i]||e[a]===r[a])||g.value.some(e=>e[i]===r[i]||e[a]===r[a])?_.value=P:_.value=[r]}}function Q(e){e.stopPropagation();let{multiple:t,tag:r,remote:i,clearCreatedOptionsOnClear:a}=n;!t&&n.filterable&&Z(),r&&!i&&a&&(g.value=P),K(),t?W([],[]):W(null,null)}function ke(e){!se(e,`action`)&&!se(e,`empty`)&&!se(e,`header`)&&e.preventDefault()}function Ae(e){Y(e)}function je(e){if(!n.keyboard){e.preventDefault();return}switch(e.key){case` `:if(n.filterable)break;e.preventDefault();case`Enter`:if(!O.value?.isComposing){if(E.value){let e=A.value?.getPendingTmNode();e?Ce(e):n.filterable||(Z(),Me())}else if(X(),n.tag&&le.value){let e=_.value[0];if(e){let t=e[n.valueField],{value:r}=f;n.multiple&&Array.isArray(r)&&r.includes(t)||Te(e)}}}e.preventDefault();break;case`ArrowUp`:if(e.preventDefault(),n.loading)return;E.value&&A.value?.prev();break;case`ArrowDown`:if(e.preventDefault(),n.loading)return;E.value?A.value?.next():X();break;case`Escape`:E.value&&(Pe(e),Z()),O.value?.focus()}}function Me(){O.value?.focus()}function Ne(){O.value?.focusInput()}function Fe(){E.value&&k.value?.syncPosition()}re(),C(t(n,`options`),re);let Ie={focus:()=>{O.value?.focus()},focusInput:()=>{O.value?.focusInput()},blur:()=>{O.value?.blur()},blurInput:()=>{O.value?.blurInput()}},Le=e(()=>{let{self:{menuBoxShadow:e}}=l.value;return{"--n-menu-box-shadow":e}}),Re=s?w(`select`,void 0,Le,n):void 0;return{...Ie,mergedStatus:ne,mergedClsPrefix:r,mergedBordered:a,namespace:o,treeMate:x,isMounted:D(),triggerRef:O,menuRef:A,pattern:m,uncontrolledShow:T,mergedShow:E,adjustedTo:ce(n),uncontrolledValue:u,mergedValue:f,followerRef:k,localizedPlaceholder:N,selectedOption:z,selectedOptions:R,mergedSize:V,mergedDisabled:H,focused:p,activeWithoutMenuOpen:le,inlineThemeDisabled:s,onTriggerInputFocus:ue,onTriggerInputBlur:de,handleTriggerOrMenuResize:Fe,handleMenuFocus:ge,handleMenuBlur:ve,handleMenuTabOut:ye,handleTriggerClick:fe,handleToggle:Ce,handleDeleteOption:Te,handlePatternInput:Oe,handleClear:Q,handleTriggerBlur:pe,handleTriggerFocus:he,handleKeydown:je,handleMenuAfterLeave:oe,handleMenuClickOutside:be,handleMenuScroll:Ae,handleMenuKeydown:je,handleMenuMousedown:ke,mergedTheme:l,cssVars:s?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return g(),n(`div`,{class:V(`${this.mergedClsPrefix}-select`)},[u(Z,null,{_:1,default:R(()=>[(g(),l(pe,null,{_:1,default:R(()=>(g(),l(jt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:R(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(g(),l(ue,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===ce.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:R(()=>(g(),l(W,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:R(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),a((g(),l(_t,f(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:R(()=>[this.$slots.empty?.()]),header:R(()=>[this.$slots.header?.()]),action:R(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[L,this.mergedShow],[Me,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Me,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{ct as a,Re as c,ut as i,xt as n,ot as o,_t as r,Ye as s,Pt as t};