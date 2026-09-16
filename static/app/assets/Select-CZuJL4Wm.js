import{A as e,An as t,B as n,Bn as r,Cn as i,D as a,E as o,En as s,F as c,Fn as l,Gn as u,I as d,In as f,Ln as p,M as m,Mn as h,P as g,Pn as _,Qn as v,R as y,Sn as b,U as x,Vn as S,Wn as C,Zn as w,an as T,br as E,dn as D,dt as O,en as k,ft as A,gt as j,hr as M,in as N,kn as P,lt as ee,mn as F,mt as I,on as L,pt as R,qn as te,rn as z,tn as B,tr as V,ur as H,ut as U,vn as W,vt as ne,w as G,wn as K,wt as q,xt as J,y as Y,z as re,zn as ie}from"./endpoints-BvEVWgoh.js";import{t as ae}from"./use-locale-Q8Ey4eco.js";import{O as oe,a as X,l as Z,n as se,o as Q,p as ce,t as le}from"./fade-in-scale-up.cssr-Bwy9Q-pZ.js";import{a as ue,c as de,d as fe,i as pe,l as me,o as he,t as ge,u as _e}from"./Popover-DhPzouDG.js";import{n as ve,r as ye,t as be}from"./create-CLOJQO3W.js";import{t as xe}from"./Empty-Y8BFr0A1.js";import{i as Se,n as Ce,r as we,t as Te}from"./cssr-CLoLU9gX.js";import{n as Ee}from"./Input-kBxBwjnk.js";import{F as De,G as Oe,P as ke,R as Ae,X as je,Y as Me,k as Ne,q as Pe}from"./index-BMaEOz3J.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=H(0),i=H(0),a=b(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),o=d(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),s=e=>{let t=a.value;return t===null?0:t.sum(e)},c=d(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return u(Ve,{startIndexRef:o,endIndexRef:c,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:s}),{listWidthRef:r,scrollLeftRef:i}}var Ue=t({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=_(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=Te(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Te(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Te(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=t({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=ne();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:Ce,ssr:t}),S(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&y({key:n}):y({index:t})});let n=!1,i=!1;p(()=>{if(n=!1,!i){i=!0;return}y({top:g.value,left:s.value})}),r(()=>{n=!0,i||=!0});let a=d(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=b(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=He({columnsRef:M(e,`columns`),renderColRef:M(e,`renderCol`),renderItemWithColsRef:M(e,`renderItemWithCols`)}),l=H(null),u=H(void 0),f=new Map,m=b(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=f.get(n);a!==void 0&&i.add(t,a)}),i}),h=H(0),g=H(0),_=d(()=>Math.max(m.value.getBound(g.value-ee(e.paddingTop))-1,0)),v=b(()=>{let{value:t}=u;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=_.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),y=(e,t)=>{if(typeof e==`number`){T(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)T(n,r,c);else if(i!==void 0)w(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&w(e,c,l)}else s===`bottom`?T(0,2**53-1,c):s===`top`&&T(0,0,c)},x,C=null;function w(t,n,r){let i=l.value;if(i==null)return;let{value:a}=m,o=a.sum(t)+ee(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{x=t,C!==null&&window.clearTimeout(C),C=window.setTimeout(()=>{x=void 0,C=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function T(e,t,n){l.value?.scrollTo({left:e,top:t,behavior:n})}function E(t,r){if(n||e.ignoreItemResize||F(r.target))return;let{value:i}=m,a=o.value.get(t),s=i.get(a),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?f.delete(t):f.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(a,u);let d=l.value;if(d!=null){if(x===void 0){let e=i.sum(a);d.scrollTop>e&&d.scrollBy(0,u)}else(a<x||a===x&&c+i.sum(a)>d.scrollTop+d.offsetHeight)&&d.scrollBy(0,u);P()}h.value++}let D=!Re(),k=!1;function A(t){var n;(n=e.onScroll)==null||n.call(e,t),(!D||!k)&&P()}function j(t){var n;if((n=e.onWheel)==null||n.call(e,t),D){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),P(),k=!0,fe(()=>{k=!1})}}}function N(t){if(n||F(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===u.value)return}else if(t.contentRect.height===u.value&&t.contentRect.width===c.value)return;u.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function P(){let{value:e}=l;e!=null&&(g.value=e.scrollTop,s.value=e.scrollLeft)}function F(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:u,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:b(()=>{let{itemResizable:t}=e,n=O(m.value.sum());return h.value,[e.itemsStyle,{boxSizing:`content-box`,width:O(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:O(e.paddingTop),paddingBottom:O(e.paddingBottom)}]}),visibleItemsStyle:b(()=>(h.value,{transform:`translateY(${O(m.value.sum(_.value))})`})),viewportItems:v,listElRef:l,itemsElRef:H(null),scrollTo:y,handleListResize:N,handleListScroll:A,handleListWheel:j,handleItemResize:E}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return h(X,{onResize:this.handleListResize},{default:()=>{var i;return h(`div`,l(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):h(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[h(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:h(Ue,{index:s,item:a}),l=i==null?void 0:h(Ue,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?h(X,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Ke=Te(`[v-hidden]`,{display:`none!important`}),qe=t({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=H(null),r=H(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let a=ne();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:Ce,ssr:a}),S(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:e}=this;return f(()=>this.sync({showAllItemsBeforeCalculate:!1})),h(`div`,{class:`v-overflow`,ref:`selfRef`},[te(e,`default`),e.counter?e.counter():h(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...Pe,closeBorderRadius:g,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${x(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:x(i,{alpha:.12}),colorBorderedPrimary:x(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:x(i,{alpha:.12}),closeColorPressedPrimary:x(i,{alpha:.18}),borderInfo:`1px solid ${x(a,{alpha:.3})}`,textColorInfo:a,colorInfo:x(a,{alpha:.12}),colorBorderedInfo:x(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:x(a,{alpha:.12}),closeColorPressedInfo:x(a,{alpha:.18}),borderSuccess:`1px solid ${x(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:x(o,{alpha:.12}),colorBorderedSuccess:x(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:x(o,{alpha:.12}),closeColorPressedSuccess:x(o,{alpha:.18}),borderWarning:`1px solid ${x(s,{alpha:.35})}`,textColorWarning:s,colorWarning:x(s,{alpha:.15}),colorBorderedWarning:x(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:x(s,{alpha:.12}),closeColorPressedWarning:x(s,{alpha:.18}),borderError:`1px solid ${x(c,{alpha:.23})}`,textColorError:c,colorError:x(c,{alpha:.1}),colorBorderedError:x(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:x(c,{alpha:.12}),closeColorPressedError:x(c,{alpha:.18})}}var Ye={name:`Tag`,common:n,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=B(`tag`,`
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
`,[N(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),z(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),z(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),z(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),z(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),N(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[z(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),z(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),N(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),N(`icon, avatar`,[N(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),N(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),N(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[T(`disabled`,[k(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[T(`checked`,`color: var(--n-text-color-hover-checkable);`)]),k(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[T(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),N(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[T(`disabled`,[k(`&:hover`,`background-color: var(--n-color-checked-hover);`),k(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...y.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=q(`n-tag`),tt=t({name:`Tag`,props:$e,slots:Object,setup(e){let t=H(null),{mergedBorderedRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:s,mergedComponentPropsRef:c}=J(e),l=b(()=>e.size||c?.value?.Tag?.size||`medium`),d=y(`Tag`,`-tag`,Ze,Ye,e,r);u(et,{roundRef:M(e,`round`)});function f(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function p(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&g(n,t)}}let m={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},h=a(`Tag`,s,r),_=b(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=l.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:u,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[L(`colorBordered`,t)]:T,[L(`closeSize`,a)]:E,[L(`closeIconSize`,a)]:D,[L(`fontSize`,a)]:O,[L(`height`,a)]:k,[L(`color`,t)]:A,[L(`textColor`,t)]:j,[L(`border`,t)]:M,[L(`closeIconColor`,t)]:N,[L(`closeIconColorHover`,t)]:P,[L(`closeIconColorPressed`,t)]:ee,[L(`closeColorHover`,t)]:F,[L(`closeColorPressed`,t)]:I}}=d.value,R=U(c);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":u,"--n-border":M,"--n-close-icon-size":D,"--n-close-color-pressed":I,"--n-close-color-hover":F,"--n-close-border-radius":C,"--n-close-icon-color":N,"--n-close-icon-color-hover":P,"--n-close-icon-color-pressed":ee,"--n-close-icon-color-disabled":N,"--n-close-margin-top":R.top,"--n-close-margin-right":R.right,"--n-close-margin-bottom":R.bottom,"--n-close-margin-left":R.left,"--n-close-size":E,"--n-color":r||(n.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),v=i?re(`tag`,b(()=>{let t=``,{type:r,color:{color:i,textColor:a}={}}=e;return t+=r[0],t+=l.value[0],i&&(t+=`a${o(i)}`),a&&(t+=`b${o(a)}`),n.value&&(t+=`c`),t}),_,e):void 0;return{...m,rtlEnabled:h,mergedClsPrefix:r,contentRef:t,mergedBordered:n,handleClick:f,handleCloseClick:p,cssVars:i?void 0:_,themeClass:v?.themeClass,onRender:v?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:n,color:{borderColor:r}={},round:a,onRender:o,$slots:c}=this;o?.();let l=m(c.avatar,t=>t&&(C(),s(`div`,{class:R(`${e}-tag__avatar`)},[j(()=>t)],2))),u=m(c.icon,t=>t&&(C(),s(`div`,{class:R(`${e}-tag__icon`)},[j(()=>t)],2)));return C(),s(`div`,{class:R([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:a,[`${e}-tag--avatar`]:l,[`${e}-tag--icon`]:u,[`${e}-tag--closable`]:n}]),style:E(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[j(()=>u||l),i(`span`,{class:R(`${e}-tag__content`),ref:`contentRef`},[j(()=>this.$slots.default?.())],2),!this.checkable&&n?(C(),K(Oe,{key:0,clsPrefix:e,class:R(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):j(()=>null),!this.checkable&&this.mergedBordered?(C(),s(`div`,{key:2,class:R(`${e}-tag__border`),style:E({borderColor:r})},null,6)):j(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(S(()=>{let{value:n}=e;n&&Q.registerHandler(n,t)}),w(e,(e,t)=>{t&&Q.unregisterHandler(t)},{deep:!1}),ie(()=>{let{value:t}=e;t&&Q.unregisterHandler(t)}))}var it=t({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=A(`d16ead82505dc285`);return C(),s(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=t({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=_(_e);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):Ae(i[this.labelField],i,!1),c=(C(),s(`div`,l(a,{class:[`${e}-base-select-group-header`,a?.class]}),[j(()=>o)],16));return i.render?i.render({node:c,option:i}):n?n({node:c,option:i,selected:!1}):c}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=t({name:`Checkmark`,render(){return(()=>{let e=A(`3c84eac8ae4e1f96`);return e[0]||=i(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[i(`g`,{fill:`none`},[i(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return C(),K(D,{name:`fade-in-scale-up-transition`},{default:()=>e?(C(),K(je,{key:1,clsPrefix:t,class:R(`${t}-base-select-option__check`)},{default:()=>h(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=t({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:f,handleOptionMouseEnter:p}=_(_e),m=d(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function v(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:d(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:m,isSelected:d(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:v,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:a,showCheckmark:o,nodeProps:c,renderOption:u,renderLabel:d,handleClick:f,handleMouseEnter:p,handleMouseMove:m}=this,h=lt(n,e),g=d?[d(t,n),o&&h]:[Ae(t[this.labelField],t,n),o&&h],_=c?.(t),v=(C(),s(`div`,l(_,{class:[`${e}-base-select-option`,t.class,_?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:o}],style:[_?.style||``,t.style||``],onClick:ot([f,_?.onClick]),onMouseenter:ot([p,_?.onMouseenter]),onMousemove:ot([m,_?.onMousemove])}),[i(`div`,{class:R(`${e}-base-select-option__content`)},[j(()=>g)],2)],16,ct));return t.render?t.render({node:v,option:t,selected:n}):u?u({node:v,option:t,selected:n}):v}}),dt=B(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[B(`scrollbar`,`
 max-height: var(--n-height);
 `),B(`virtual-list`,`
 max-height: var(--n-height);
 `),B(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[z(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),B(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),B(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),z(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),z(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),z(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),z(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),B(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),B(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[N(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),k(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),k(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),N(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),N(`pending`,[k(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),N(`selected`,`
 color: var(--n-option-text-color-active);
 `,[k(`&::before`,`
 background-color: var(--n-option-color-active);
 `),N(`pending`,[k(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),N(`disabled`,`
 cursor: not-allowed;
 `,[T(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),N(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),z(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[le({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=t({name:`InternalSelectMenu`,props:{...y.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:r}=J(e),i=a(`InternalSelectMenu`,n,t),o=y(`InternalSelectMenu`,`-internal-select-menu`,dt,Me,e,M(e,`clsPrefix`)),s=H(null),c=H(null),l=H(null),d=b(()=>e.treeMate.getFlattenedNodes()),p=b(()=>ve(d.value)),m=H(null);function h(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),B(n||null)}function g(){let{value:t}=m;t&&!e.treeMate.getNode(t.key)&&(m.value=null)}let _;w(()=>e.show,t=>{t?_=w(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?h():g(),f(V)):g()},{immediate:!0}):_?.()},{immediate:!0}),ie(()=>{_?.()});let v=b(()=>ee(o.value.self[L(`optionHeight`,e.size)])),x=b(()=>U(o.value.self[L(`padding`,e.size)])),C=b(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),T=b(()=>{let e=d.value;return e&&e.length===0}),E=b(()=>r?.value?.Select?.renderEmpty);function D(t){let{onToggle:n}=e;n&&n(t)}function O(t){let{onScroll:n}=e;n&&n(t)}function k(e){l.value?.sync(),O(e)}function A(){l.value?.sync()}function j(){let{value:e}=m;return e||null}function N(e,t){t.disabled||B(t,!1)}function P(e,t){t.disabled||D(t)}function F(t){ye(t,`action`)||e.onKeyup?.(t)}function I(t){ye(t,`action`)||e.onKeydown?.(t)}function R(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function te(){let{value:e}=m;e&&B(e.getNext({loop:!0}),!0)}function z(){let{value:e}=m;e&&B(e.getPrev({loop:!0}),!0)}function B(e,t=!1){m.value=e,t&&V()}function V(){let t=m.value;if(!t)return;let n=p.value(t.key);n!==null&&(e.virtualScroll?c.value?.scrollTo({index:n}):l.value?.scrollTo({index:n,elSize:v.value}))}function W(t){s.value?.contains(t.target)&&e.onFocus?.(t)}function ne(t){s.value?.contains(t.relatedTarget)||e.onBlur?.(t)}u(_e,{handleOptionMouseEnter:N,handleOptionClick:P,valueSetRef:C,pendingTmNodeRef:m,nodePropsRef:M(e,`nodeProps`),showCheckmarkRef:M(e,`showCheckmark`),multipleRef:M(e,`multiple`),valueRef:M(e,`value`),renderLabelRef:M(e,`renderLabel`),renderOptionRef:M(e,`renderOption`),labelFieldRef:M(e,`labelField`),valueFieldRef:M(e,`valueField`)}),u(me,s),S(()=>{let{value:e}=l;e&&e.sync()});let G=b(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[L(`optionFontSize`,t)]:x,[L(`optionHeight`,t)]:S,[L(`optionPadding`,t)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":U(C,`left`),"--n-option-padding-right":U(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:K}=e,q=K?re(`internal-select-menu`,b(()=>e.size[0]),G,e):void 0,Y={selfRef:s,next:te,prev:z,getPendingTmNode:j};return rt(s,e.onResize),{mergedTheme:o,mergedClsPrefix:t,rtlEnabled:i,virtualListRef:c,scrollbarRef:l,itemSize:v,padding:x,flattenedNodes:d,empty:T,mergedRenderEmpty:E,virtualListContainer(){let{value:e}=c;return e?.listElRef},virtualListContent(){let{value:e}=c;return e?.itemsElRef},doScroll:O,handleFocusin:W,handleFocusout:ne,handleKeyUp:F,handleKeyDown:I,handleMouseDown:R,handleVirtualListResize:A,handleVirtualListScroll:k,cssVars:K?void 0:G,themeClass:q?.themeClass,onRender:q?.onRender,...Y}},render(){let{$slots:t,virtualScroll:n,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),C(),s(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:R([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`]),style:E(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[j(()=>m(t.header,e=>e&&(C(),s(`div`,{class:R(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[j(()=>e)],2)))),this.loading?(C(),s(`div`,{key:0,class:R(`${r}-base-select-menu__loading`)},[(C(),K(Y,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(C(),s(W,{key:1},[this.empty?(C(),s(`div`,{key:1,class:R(`${r}-base-select-menu__empty`),"data-empty":!0},[j(()=>e(t.empty,()=>[this.mergedRenderEmpty?.()||(C(),K(xe,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(C(),K(se,l({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},this.scrollbarProps),{default:()=>n?(C(),K(Ge,{key:1,ref:`virtualListRef`,class:R(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(C(),K(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(C(),K(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(C(),s(`div`,{key:4,class:R(`${r}-base-select-menu-option-wrapper`),style:E({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[j(()=>this.flattenedNodes.map(e=>e.isGroup?(C(),K(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(C(),K(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),j(()=>m(t.action,e=>e&&[(C(),s(`div`,{class:R(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[j(()=>e)],2)),(C(),K(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=k([B(`base-selection`,`
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
 `,[B(`base-loading`,`
 color: var(--n-loading-color);
 `),B(`base-selection-tags`,`min-height: var(--n-height);`),z(`border, state-border`,`
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
 `),z(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),B(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[z(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),B(`base-selection-overlay`,`
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
 `,[z(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),B(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[z(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),B(`base-selection-tags`,`
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
 `),B(`base-selection-label`,`
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
 `,[B(`base-selection-input`,`
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
 `,[z(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),z(`render-label`,`
 color: var(--n-text-color);
 `)]),T(`disabled`,[k(`&:hover`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),N(`focus`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),N(`active`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),B(`base-selection-label`,`background-color: var(--n-color-active);`),B(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),N(`disabled`,`cursor: not-allowed;`,[z(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),B(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[B(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),z(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),B(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),B(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),B(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[z(`input`,`
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
 `),z(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>N(`${e}-status`,[z(`state-border`,`border: var(--n-border-${e});`),T(`disabled`,[k(`&:hover`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),N(`active`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),B(`base-selection-label`,`background-color: var(--n-color-active-${e});`),B(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),N(`focus`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),B(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),B(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[k(`&:last-child`,`padding-right: 0;`),B(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[z(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=t({name:`InternalSelection`,props:{...y.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=J(e),r=a(`InternalSelection`,n,t),i=H(null),o=H(null),s=H(null),c=H(null),l=H(null),u=H(null),d=H(null),p=H(null),m=H(null),h=H(null),g=H(!1),_=H(!1),x=H(!1),C=y(`InternalSelection`,`-internal-selection`,bt,De,e,M(e,`clsPrefix`)),T=b(()=>e.clearable&&!e.disabled&&(x.value||e.active)),E=b(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Ae(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),D=b(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),O=b(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function k(){let{value:t}=i;if(t){let{value:n}=o;n&&(n.style.width=`${t.offsetWidth}px`,e.maxTagCount!==`responsive`&&m.value?.sync({showAllItemsBeforeCalculate:!1}))}}function A(){let{value:e}=h;e&&(e.style.display=`none`)}function j(){let{value:e}=h;e&&(e.style.display=`inline-block`)}w(M(e,`active`),e=>{e||A()}),w(M(e,`pattern`),()=>{e.multiple&&f(k)});function N(t){let{onFocus:n}=e;n&&n(t)}function P(t){let{onBlur:n}=e;n&&n(t)}function ee(t){let{onDeleteOption:n}=e;n&&n(t)}function F(t){let{onClear:n}=e;n&&n(t)}function I(t){let{onPatternInput:n}=e;n&&n(t)}function R(e){(!e.relatedTarget||!s.value?.contains(e.relatedTarget))&&N(e)}function te(e){s.value?.contains(e.relatedTarget)||P(e)}function z(e){F(e)}function B(){x.value=!0}function V(){x.value=!1}function W(t){e.active&&e.filterable&&t.target!==o.value&&t.preventDefault()}function ne(e){ee(e)}let G=H(!1);function K(t){if(t.key===`Backspace`&&!G.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&ne(t[t.length-1])}}let q=null;function Y(t){let{value:n}=i;n&&(n.textContent=t.target.value,k()),e.ignoreComposition&&G.value?q=t:I(t)}function ie(){G.value=!0}function ae(){G.value=!1,e.ignoreComposition&&I(q),q=null}function oe(t){_.value=!0,e.onPatternFocus?.(t)}function X(t){_.value=!1,e.onPatternBlur?.(t)}function Z(){if(e.filterable)_.value=!1,u.value?.blur(),o.value?.blur();else if(e.multiple){let{value:e}=c;e?.blur()}else{let{value:e}=l;e?.blur()}}function se(){e.filterable?(_.value=!1,u.value?.focus()):e.multiple?c.value?.focus():l.value?.focus()}function Q(){let{value:e}=o;e&&(j(),e.focus())}function ce(){let{value:e}=o;e&&e.blur()}function le(e){let{value:t}=d;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=p;return e}function de(){return o.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){e.active||(pe(),fe=window.setTimeout(()=>{O.value&&(g.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),g.value=!1)}w(O,e=>{e||(g.value=!1)}),S(()=>{v(()=>{let t=u.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=_.value?-1:0)})}),rt(s,e.onResize);let{inlineThemeDisabled:_e}=e,ve=b(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:ee,boxShadowActiveError:F,boxShadowHoverError:I,borderError:R,borderFocusError:te,borderHoverError:z,borderActiveError:B,clearColor:V,clearColorHover:H,clearColorPressed:W,clearSize:ne,arrowSize:G,[L(`height`,t)]:K,[L(`fontSize`,t)]:q}}=C.value,J=U(c),Y=U(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":q,"--n-height":K,"--n-padding-single-top":J.top,"--n-padding-multiple-top":Y.top,"--n-padding-single-right":J.right,"--n-padding-multiple-right":Y.right,"--n-padding-single-left":J.left,"--n-padding-multiple-left":Y.left,"--n-padding-single-bottom":J.bottom,"--n-padding-multiple-bottom":Y.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":ee,"--n-box-shadow-active-error":F,"--n-box-shadow-hover-error":I,"--n-border-error":R,"--n-border-focus-error":te,"--n-border-hover-error":z,"--n-border-active-error":B,"--n-clear-size":ne,"--n-clear-color":V,"--n-clear-color-hover":H,"--n-clear-color-pressed":W,"--n-arrow-size":G,"--n-font-weight":r}}),ye=_e?re(`internal-selection`,b(()=>e.size[0]),ve,e):void 0;return{mergedTheme:C,mergedClearable:T,mergedClsPrefix:t,rtlEnabled:r,patternInputFocused:_,filterablePlaceholder:E,label:D,selected:O,showTagsPanel:g,isComposing:G,counterRef:d,counterWrapperRef:p,patternInputMirrorRef:i,patternInputRef:o,selfRef:s,multipleElRef:c,singleElRef:l,patternInputWrapperRef:u,overflowRef:m,inputTagElRef:h,handleMouseDown:W,handleFocusin:R,handleClear:z,handleMouseEnter:B,handleMouseLeave:V,handleDeleteOption:ne,handlePatternKeyDown:K,handlePatternInputInput:Y,handlePatternInputBlur:X,handlePatternInputFocus:oe,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:te,handleCompositionEnd:ae,handleCompositionStart:ie,onPopoverUpdateShow:ge,focus:se,focusInput:Q,blur:Z,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:e.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:a,maxTagCount:o,bordered:c,clsPrefix:u,ellipsisTagPopoverProps:d,onRender:f,renderTag:p,renderLabel:m}=this;f?.();let h=o===`responsive`,g=typeof o==`number`,_=h||g,v=(C(),K(ce,null,{default:()=>(C(),K(Ee,{clsPrefix:u,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),y;if(t){let{labelField:e}=this,t=t=>(C(),s(`div`,{class:R(`${u}-base-selection-tag-wrapper`),key:t.value},[p?(C(),s(W,{key:0},[j(()=>p({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(C(),K(tt,{key:1,size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>m?m(t,!0):Ae(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),c=()=>(g?this.selectedOptions.slice(0,o):this.selectedOptions).map(t),f=a?(C(),s(`div`,{class:R(`${u}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[i(`input`,l(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${u}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),i(`span`,{ref:`patternInputMirrorRef`,class:R(`${u}-base-selection-input-tag__mirror`)},[j(()=>this.pattern)],2)],2)):null,b=h?()=>(C(),s(`div`,{class:R(`${u}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(C(),K(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,x;if(g){let e=this.selectedOptions.length-o;e>0&&(x=(t=>(C(),s(`div`,{class:R(`${u}-base-selection-tag-wrapper`),key:`__counter__`},[(C(),K(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(x))}let S=h?a?(C(),K(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:b,tail:()=>f},1032,[`updateCounter`,`getCounter`,`getTail`])):(C(),K(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:b},1032,[`updateCounter`,`getCounter`])):g&&x?c().concat(x):c(),w=_?()=>(C(),s(`div`,{class:R(`${u}-base-selection-popover`)},[h?(C(),s(W,{key:0},[j(()=>c())],64)):(C(),s(W,{key:1},[j(()=>this.selectedOptions.map(t))],64))],2)):void 0,T=_?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...d}:null,E=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(C(),s(`div`,{key:5,class:R(`${u}-base-selection-placeholder ${u}-base-selection-overlay`)},[i(`div`,{class:R(`${u}-base-selection-placeholder__inner`)},[j(()=>this.placeholder)],2)],2)):null,D=a?(C(),s(`div`,{key:6,ref:`patternInputWrapperRef`,class:R(`${u}-base-selection-tags`)},[j(()=>S),h?j(()=>null):(C(),s(W,{key:1},[j(()=>f)],64)),j(()=>v)],2)):(C(),s(`div`,{key:7,ref:`multipleElRef`,class:R(`${u}-base-selection-tags`),tabindex:r?void 0:0},[j(()=>S),j(()=>v)],10,St));y=(e=>(C(),s(W,{key:8},[_?(C(),K(ge,l({key:0},T,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>D,default:w},1040)):(C(),s(W,{key:1},[j(()=>D)],64)),j(()=>E)],64)))(y)}else if(a){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;y=(e=>(C(),s(`div`,{key:9,ref:`patternInputWrapperRef`,class:R(`${u}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[i(`input`,l(this.inputProps,{ref:`patternInputRef`,class:`${u}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),n?(C(),s(`div`,{class:R(`${u}-base-selection-label__render-label ${u}-base-selection-overlay`),key:`input`},[i(`div`,{class:R(`${u}-base-selection-overlay__wrapper`)},[p?(C(),s(W,{key:0},[j(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(C(),s(W,{key:1},[m?(C(),s(W,{key:0},[j(()=>m(this.selectedOption,!0))],64)):(C(),s(W,{key:1},[j(()=>Ae(this.label,this.selectedOption,!0))],64))],64))],2)],2)):j(()=>null),t?(C(),s(`div`,{class:R(`${u}-base-selection-placeholder ${u}-base-selection-overlay`),key:`placeholder`},[i(`div`,{class:R(`${u}-base-selection-overlay__wrapper`)},[j(()=>this.filterablePlaceholder)],2)],2)):j(()=>null),j(()=>v)],10,Ct)))(y)}else y=(e=>(C(),s(`div`,{key:10,ref:`singleElRef`,class:R(`${u}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(C(),s(`div`,{class:R(`${u}-base-selection-placeholder ${u}-base-selection-overlay`),key:`placeholder`},[i(`div`,{class:R(`${u}-base-selection-placeholder__inner`)},[j(()=>this.placeholder)],2)],2)):(C(),s(`div`,{class:R(`${u}-base-selection-input`),title:nt(this.label),key:`input`},[i(`div`,{class:R(`${u}-base-selection-input__content`)},[p?(C(),s(W,{key:0},[j(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(C(),s(W,{key:1},[m?(C(),s(W,{key:0},[j(()=>m(this.selectedOption,!0))],64)):(C(),s(W,{key:1},[j(()=>Ae(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),j(()=>v)],10,Tt)))(y);return C(),s(`div`,{ref:`selfRef`,class:R([`${u}-base-selection`,this.rtlEnabled&&`${u}-base-selection--rtl`,this.themeClass,e&&`${u}-base-selection--${e}-status`,{[`${u}-base-selection--active`]:this.active,[`${u}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${u}-base-selection--disabled`]:this.disabled,[`${u}-base-selection--multiple`]:this.multiple,[`${u}-base-selection--focus`]:this.focused}]),style:E(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[j(()=>y),c?(C(),s(`div`,{key:0,class:R(`${u}-base-selection__border`)},null,2)):j(()=>null),c?(C(),s(`div`,{key:2,class:R(`${u}-base-selection__state-border`)},null,2)):j(()=>null)],46,Et)}}),Ot=k([B(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),B(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[le({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...y.props,to:de.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=t({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=J(e),o=y(`Select`,`-select`,Ot,Ne,e,t),s=H(e.defaultValue),l=M(e,`value`),u=Se(l,s),d=H(!1),f=H(``),p=we(e,[`items`,`options`]),m=H([]),h=H([]),_=b(()=>h.value.concat(m.value).concat(p.value)),v=b(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),x=b(()=>{if(e.remote)return p.value;{let{value:t}=_,{value:n}=f;return!n.length||!e.filterable?t:vt(t,v.value,n,e.childrenField)}}),S=b(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return be(x.value,r)}),C=b(()=>yt(_.value,e.valueField,e.childrenField)),T=H(!1),E=Se(M(e,`show`),T),D=H(null),O=H(null),k=H(null),{localeRef:A}=ae(`Select`),j=b(()=>e.placeholder??A.value.placeholder),N=[],P=H(new Map),ee=b(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function F(t){let n=e.remote,{value:r}=P,{value:i}=C,{value:a}=ee,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let I=b(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?F(e):[]}return null}),L=b(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:F([t])[0]||null:null}),R=G(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:a?.value?.Select?.size||`medium`}}),{mergedSizeRef:te,mergedDisabledRef:z,mergedStatusRef:B}=R;function V(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:c}=R;r&&g(r,t,n),a&&g(a,t,n),i&&g(i,t,n),s.value=t,o(),c()}function U(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=R;n&&g(n,t),r()}function W(){let{onClear:t}=e;t&&g(t)}function ne(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=R;n&&g(n,t),i(),r&&X()}function K(t){let{onSearch:n}=e;n&&g(n,t)}function q(t){let{onScroll:n}=e;n&&g(n,t)}function Y(){let{remote:t,multiple:n}=e;if(t){let{value:t}=P;if(n){let{valueField:n}=e;I.value?.forEach(e=>{t.set(e[n],e)})}else{let n=L.value;n&&t.set(n[e.valueField],n)}}}function ie(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&g(n,t),r&&g(r,t),T.value=t}function X(){z.value||(ie(!0),T.value=!0,e.filterable&&Pe())}function Z(){ie(!1)}function se(){f.value=``,h.value=N}let Q=H(!1);function ce(){e.filterable&&(Q.value=!0)}function le(){e.filterable&&(Q.value=!1,E.value||se())}function ue(){z.value||(E.value?e.filterable?Pe():Z():X())}function fe(e){k.value?.selfRef?.contains(e.relatedTarget)||(d.value=!1,U(e),Z())}function pe(e){ne(e),d.value=!0}function me(){d.value=!0}function he(e){D.value?.$el.contains(e.relatedTarget)||(d.value=!1,U(e),Z())}function ge(){D.value?.focus(),Z()}function _e(e){E.value&&(D.value?.$el.contains(oe(e))||Z())}function ve(t){if(!Array.isArray(t))return[];if(ee.value)return Array.from(t);{let{remote:n}=e,{value:r}=C;if(n){let{value:e}=P;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function xe(e){Ce(e.rawNode)}function Ce(t){if(z.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=h,t=e[0]||null;if(t){let e=m.value;e.length?e.push(t):m.value=[t],h.value=N}}if(r&&P.value.set(t[a],t),e.multiple){let e=ve(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Te(t[a]);~e&&(m.value.splice(e,1),i&&(f.value=``))}}else e.push(t[a]),i&&(f.value=``);V(e,F(e))}else{if(n&&!r){let e=Te(t[a]);~e?m.value=[m.value[e]]:m.value=N}Me(),Z(),V(t[a],t)}}function Te(t){return m.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){E.value||X();let{value:n}=t.target;f.value=n;let{tag:r,remote:i}=e;if(K(n),r&&!i){if(!n){h.value=N;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;p.value.some(e=>e[i]===r[i]||e[a]===r[a])||m.value.some(e=>e[i]===r[i]||e[a]===r[a])?h.value=N:h.value=[r]}}function De(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Z(),r&&!i&&a&&(m.value=N),W(),n?V([],[]):V(null,null)}function Oe(e){!ye(e,`action`)&&!ye(e,`empty`)&&!ye(e,`header`)&&e.preventDefault()}function Ae(e){q(e)}function je(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!D.value?.isComposing){if(E.value){let t=k.value?.getPendingTmNode();t?xe(t):e.filterable||(Z(),Me())}else if(X(),e.tag&&Q.value){let t=h.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Ce(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;E.value&&k.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;E.value?k.value?.next():X();break;case`Escape`:E.value&&(ke(t),Z()),D.value?.focus()}}function Me(){D.value?.focus()}function Pe(){D.value?.focusInput()}function Fe(){E.value&&O.value?.syncPosition()}Y(),w(M(e,`options`),Y);let Ie={focus:()=>{D.value?.focus()},focusInput:()=>{D.value?.focusInput()},blur:()=>{D.value?.blur()},blurInput:()=>{D.value?.blurInput()}},Le=b(()=>{let{self:{menuBoxShadow:e}}=o.value;return{"--n-menu-box-shadow":e}}),Re=i?re(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:B,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:S,isMounted:c(),triggerRef:D,menuRef:k,pattern:f,uncontrolledShow:T,mergedShow:E,adjustedTo:de(e),uncontrolledValue:s,mergedValue:u,followerRef:O,localizedPlaceholder:j,selectedOption:L,selectedOptions:I,mergedSize:te,mergedDisabled:z,focused:d,activeWithoutMenuOpen:Q,inlineThemeDisabled:i,onTriggerInputFocus:ce,onTriggerInputBlur:le,handleTriggerOrMenuResize:Fe,handleMenuFocus:me,handleMenuBlur:he,handleMenuTabOut:ge,handleTriggerClick:ue,handleToggle:xe,handleDeleteOption:Ce,handlePatternInput:Ee,handleClear:De,handleTriggerBlur:fe,handleTriggerFocus:pe,handleKeydown:je,handleMenuAfterLeave:se,handleMenuClickOutside:_e,handleMenuScroll:Ae,handleMenuKeydown:je,handleMenuMousedown:Oe,mergedTheme:o,cssVars:i?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return C(),s(`div`,{class:R(`${this.mergedClsPrefix}-select`)},[P(he,null,{_:1,default:I(()=>[(C(),K(ue,null,{_:1,default:I(()=>(C(),K(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:I(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(C(),K(pe,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===de.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:I(()=>(C(),K(D,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:I(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),V((C(),K(pt,l(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:I(()=>[this.$slots.empty?.()]),header:I(()=>[this.$slots.header?.()]),action:I(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[F,this.mergedShow],[Z,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Z,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};