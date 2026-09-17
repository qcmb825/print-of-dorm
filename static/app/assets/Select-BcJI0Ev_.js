import{$n as e,A as t,An as n,At as r,B as i,Bn as a,D as o,Dt as s,Er as c,F as l,Fn as u,Gn as d,H as f,Hn as p,In as m,K as h,Kn as g,L as _,Mn as v,N as y,On as b,R as x,Rn as S,S as C,St as w,U as T,Un as E,Vn as D,Xn as O,Y as k,Zn as A,_n as j,_t as M,bn as ee,bt as N,dn as P,fn as F,gr as I,gt as L,ht as R,ir as z,k as B,kn as V,ln as H,on as U,qn as W,rr as te,sn as G,sr as ne,un as K,vt as re,wn as q,wt as J,xr as Y,yt as X,z as Z}from"./endpoints-D7YssODM.js";import{n as ie,t as Q}from"./Empty-CXl0uUVS.js";import{c as ae,d as oe,f as se,l as ce,n as le,o as ue,p as de,r as fe,s as pe,t as me,u as he}from"./create-Cf_l9O5p.js";import{i as ge,l as _e,o as ve,r as ye,t as be}from"./Scrollbar-BE5qE3gb.js";import{n as xe,r as Se,t as Ce}from"./cssr-Db0WhKUi.js";import{t as we}from"./use-merged-state-CXRiUPYA.js";import{n as Te}from"./Input-C-372aM3.js";import{$ as Ee,A as De,B as Oe,F as ke,I as Ae,Y as je,ft as Me,q as Ne,z as Pe}from"./index-CTz7zfxj.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=I(0),i=I(0),a=b(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),o=Z(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),s=e=>{let t=a.value;return t===null?0:t.sum(e)},c=Z(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return A(Ve,{startIndexRef:o,endIndexRef:c,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:s}),{listWidthRef:r,scrollLeftRef:i}}var Ue=m({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:o}=a(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:o,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=Ce(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Ce(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Ce(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=m({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=J();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:xe,ssr:t}),W(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&_({key:n}):_({index:t})});let n=!1,r=!1;E(()=>{if(n=!1,!r){r=!0;return}_({top:p.value,left:o.value})}),g(()=>{n=!0,r||=!0});let i=Z(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),a=b(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:o,listWidthRef:s}=He({columnsRef:Y(e,`columns`),renderColRef:Y(e,`renderCol`),renderItemWithColsRef:Y(e,`renderItemWithCols`)}),c=I(null),l=I(void 0),u=new Map,d=b(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=u.get(n);a!==void 0&&i.add(t,a)}),i}),f=I(0),p=I(0),m=Z(()=>Math.max(d.value.getBound(p.value-R(e.paddingTop))-1,0)),h=b(()=>{let{value:t}=l;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=m.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),_=(e,t)=>{if(typeof e==`number`){S(e,t,`auto`);return}let{left:n,top:r,index:i,key:o,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)S(n,r,c);else if(i!==void 0)x(i,c,l);else if(o!==void 0){let e=a.value.get(o);e!==void 0&&x(e,c,l)}else s===`bottom`?S(0,2**53-1,c):s===`top`&&S(0,0,c)},v,y=null;function x(t,n,r){let i=c.value;if(i==null)return;let{value:a}=d,o=a.sum(t)+R(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{v=t,y!==null&&window.clearTimeout(y),y=window.setTimeout(()=>{v=void 0,y=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function S(e,t,n){c.value?.scrollTo({left:e,top:t,behavior:n})}function C(t,r){if(n||e.ignoreItemResize||j(r.target))return;let{value:i}=d,o=a.value.get(t),s=i.get(o),l=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(l===s)return;l-e.itemSize===0?u.delete(t):u.set(t,l-e.itemSize);let p=l-s;if(p===0)return;i.add(o,p);let m=c.value;if(m!=null){if(v===void 0){let e=i.sum(o);m.scrollTop>e&&m.scrollBy(0,p)}else(o<v||o===v&&l+i.sum(o)>m.scrollTop+m.offsetHeight)&&m.scrollBy(0,p);A()}f.value++}let w=!Re(),T=!1;function D(t){var n;(n=e.onScroll)==null||n.call(e,t),(!w||!T)&&A()}function O(t){var n;if((n=e.onWheel)==null||n.call(e,t),w){let e=c.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),A(),T=!0,de(()=>{T=!1})}}}function k(t){if(n||j(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===l.value)return}else if(t.contentRect.height===l.value&&t.contentRect.width===s.value)return;l.value=t.contentRect.height,s.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function A(){let{value:e}=c;e!=null&&(p.value=e.scrollTop,o.value=e.scrollLeft)}function j(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:l,listStyle:{overflow:`auto`},keyToIndex:a,itemsStyle:b(()=>{let{itemResizable:t}=e,n=M(d.value.sum());return f.value,[e.itemsStyle,{boxSizing:`content-box`,width:M(i.value),height:t?``:n,minHeight:t?n:``,paddingTop:M(e.paddingTop),paddingBottom:M(e.paddingBottom)}]}),visibleItemsStyle:b(()=>(f.value,{transform:`translateY(${M(d.value.sum(m.value))})`})),viewportItems:h,listElRef:c,itemsElRef:I(null),scrollTo:_,handleListResize:k,handleListScroll:D,handleListWheel:O,handleItemResize:C}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return S(ye,{onResize:this.handleListResize},{default:()=>{var i;return S(`div`,D(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):S(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[S(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:S(Ue,{index:s,item:a}),l=i==null?void 0:S(Ue,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?S(ye,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Ke=Ce(`[v-hidden]`,{display:`none!important`}),qe=m({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=I(null),r=I(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let a=J();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:xe,ssr:a}),W(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:t}=this;return p(()=>this.sync({showAllItemsBeforeCalculate:!1})),S(`div`,{class:`v-overflow`,ref:`selfRef`},[e(t,`default`),t.counter?t.counter():S(`span`,{style:{display:`inline-block`},ref:`counterRef`}),t.tail?t.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:D,buttonColor2Pressed:O,fontWeightStrong:A}=e;return{...je,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:D,colorPressedCheckable:O,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${k(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:k(i,{alpha:.12}),colorBorderedPrimary:k(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:k(i,{alpha:.12}),closeColorPressedPrimary:k(i,{alpha:.18}),borderInfo:`1px solid ${k(a,{alpha:.3})}`,textColorInfo:a,colorInfo:k(a,{alpha:.12}),colorBorderedInfo:k(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:k(a,{alpha:.12}),closeColorPressedInfo:k(a,{alpha:.18}),borderSuccess:`1px solid ${k(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:k(o,{alpha:.12}),colorBorderedSuccess:k(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:k(o,{alpha:.12}),closeColorPressedSuccess:k(o,{alpha:.18}),borderWarning:`1px solid ${k(s,{alpha:.35})}`,textColorWarning:s,colorWarning:k(s,{alpha:.15}),colorBorderedWarning:k(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:k(s,{alpha:.12}),closeColorPressedWarning:k(s,{alpha:.18}),borderError:`1px solid ${k(c,{alpha:.23})}`,textColorError:c,colorError:k(c,{alpha:.1}),colorBorderedError:k(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:k(c,{alpha:.12}),closeColorPressedError:k(c,{alpha:.18})}}var Ye={name:`Tag`,common:h,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=G(`tag`,`
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
`,[K(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),H(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),H(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),H(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),H(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),K(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[H(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),H(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),K(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),K(`icon, avatar`,[K(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),K(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),K(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[P(`disabled`,[U(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[P(`checked`,`color: var(--n-text-color-hover-checkable);`)]),U(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[P(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),K(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[P(`disabled`,[U(`&:hover`,`background-color: var(--n-color-checked-hover);`),U(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...f.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=r(`n-tag`),tt=m({name:`Tag`,props:$e,slots:Object,setup(e){let n=I(null),{mergedBorderedRef:r,mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:o,mergedComponentPropsRef:c}=s(e),l=b(()=>e.size||c?.value?.Tag?.size||`medium`),u=f(`Tag`,`-tag`,Ze,Ye,e,i);A(et,{roundRef:Y(e,`round`)});function d(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function p(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&_(n,t)}}let m={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},h=t(`Tag`,o,i),g=b(()=>{let{type:t,color:{color:n,textColor:i}={}}=e,a=l.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[F(`colorBordered`,t)]:T,[F(`closeSize`,a)]:E,[F(`closeIconSize`,a)]:D,[F(`fontSize`,a)]:O,[F(`height`,a)]:k,[F(`color`,t)]:A,[F(`textColor`,t)]:j,[F(`border`,t)]:M,[F(`closeIconColor`,t)]:ee,[F(`closeIconColorHover`,t)]:N,[F(`closeIconColorPressed`,t)]:P,[F(`closeColorHover`,t)]:I,[F(`closeColorPressed`,t)]:R}}=u.value,z=L(c);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":d,"--n-border":M,"--n-close-icon-size":D,"--n-close-color-pressed":R,"--n-close-color-hover":I,"--n-close-border-radius":C,"--n-close-icon-color":ee,"--n-close-icon-color-hover":N,"--n-close-icon-color-pressed":P,"--n-close-icon-color-disabled":ee,"--n-close-margin-top":z.top,"--n-close-margin-right":z.right,"--n-close-margin-bottom":z.bottom,"--n-close-margin-left":z.left,"--n-close-size":E,"--n-color":n||(r.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),v=a?T(`tag`,b(()=>{let t=``,{type:n,color:{color:i,textColor:a}={}}=e;return t+=n[0],t+=l.value[0],i&&(t+=`a${B(i)}`),a&&(t+=`b${B(a)}`),r.value&&(t+=`c`),t}),g,e):void 0;return{...m,rtlEnabled:h,mergedClsPrefix:i,contentRef:n,mergedBordered:r,handleClick:d,handleCloseClick:p,cssVars:a?void 0:g,themeClass:v?.themeClass,onRender:v?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let u=l(s.avatar,t=>t&&(O(),v(`div`,{class:X(`${e}-tag__avatar`)},[w(()=>t)],2))),d=l(s.icon,t=>t&&(O(),v(`div`,{class:X(`${e}-tag__icon`)},[w(()=>t)],2)));return O(),v(`div`,{class:X([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:a,[`${e}-tag--avatar`]:u,[`${e}-tag--icon`]:d,[`${e}-tag--closable`]:r}]),style:c(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[w(()=>d||u),V(`span`,{class:X(`${e}-tag__content`),ref:`contentRef`},[w(()=>this.$slots.default?.())],2),!this.checkable&&r?(O(),n(Ne,{key:0,clsPrefix:e,class:X(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):w(()=>null),!this.checkable&&this.mergedBordered?(O(),v(`div`,{key:2,class:X(`${e}-tag__border`),style:c({borderColor:i})},null,6)):w(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(W(()=>{let{value:n}=e;n&&ge.registerHandler(n,t)}),te(e,(e,t)=>{t&&ge.unregisterHandler(t)},{deep:!1}),d(()=>{let{value:t}=e;t&&ge.unregisterHandler(t)}))}var it=m({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=re(`d16ead82505dc285`);return O(),v(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=m({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=a(oe);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):Oe(i[this.labelField],i,!1),s=(O(),v(`div`,D(a,{class:[`${e}-base-select-group-header`,a?.class]}),[w(()=>o)],16));return i.render?i.render({node:s,option:i}):n?n({node:s,option:i,selected:!1}):s}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=m({name:`Checkmark`,render(){return(()=>{let e=re(`3c84eac8ae4e1f96`);return e[0]||=V(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[V(`g`,{fill:`none`},[V(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return O(),n(j,{name:`fade-in-scale-up-transition`},{default:()=>e?(O(),n(i,{key:1,clsPrefix:t,class:X(`${t}-base-select-option__check`)},{default:()=>S(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=m({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:o,renderOptionRef:s,labelFieldRef:c,valueFieldRef:l,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:p}=a(oe),m=Z(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:Z(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:m,isSelected:Z(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[l.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:c,renderLabel:o,renderOption:s,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:s,renderLabel:c,handleClick:l,handleMouseEnter:u,handleMouseMove:d}=this,f=lt(n,e),p=c?[c(t,n),a&&f]:[Oe(t[this.labelField],t,n),a&&f],m=o?.(t),h=(O(),v(`div`,D(m,{class:[`${e}-base-select-option`,t.class,m?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[m?.style||``,t.style||``],onClick:ot([l,m?.onClick]),onMouseenter:ot([u,m?.onMouseenter]),onMousemove:ot([d,m?.onMousemove])}),[V(`div`,{class:X(`${e}-base-select-option__content`)},[w(()=>p)],2)],16,ct));return t.render?t.render({node:h,option:t,selected:n}):s?s({node:h,option:t,selected:n}):h}}),dt=G(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[G(`scrollbar`,`
 max-height: var(--n-height);
 `),G(`virtual-list`,`
 max-height: var(--n-height);
 `),G(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[H(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),G(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),G(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),H(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),H(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),H(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),H(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),G(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),G(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[K(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),U(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),U(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),K(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),K(`pending`,[U(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),K(`selected`,`
 color: var(--n-option-text-color-active);
 `,[U(`&::before`,`
 background-color: var(--n-option-color-active);
 `),K(`pending`,[U(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),K(`disabled`,`
 cursor: not-allowed;
 `,[P(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),K(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),H(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Pe({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=m({name:`InternalSelectMenu`,props:{...f.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:i}=s(e),a=t(`InternalSelectMenu`,r,n),o=f(`InternalSelectMenu`,`-internal-select-menu`,dt,Me,e,Y(e,`clsPrefix`)),c=I(null),l=I(null),u=I(null),m=b(()=>e.treeMate.getFlattenedNodes()),h=b(()=>le(m.value)),g=I(null);function _(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),U(n||null)}function v(){let{value:t}=g;t&&!e.treeMate.getNode(t.key)&&(g.value=null)}let y;te(()=>e.show,t=>{t?y=te(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?_():v(),p(G)):v()},{immediate:!0}):y?.()},{immediate:!0}),d(()=>{y?.()});let x=b(()=>R(o.value.self[F(`optionHeight`,e.size)])),S=b(()=>L(o.value.self[F(`padding`,e.size)])),C=b(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),w=b(()=>{let e=m.value;return e&&e.length===0}),E=b(()=>i?.value?.Select?.renderEmpty);function D(t){let{onToggle:n}=e;n&&n(t)}function O(t){let{onScroll:n}=e;n&&n(t)}function k(e){u.value?.sync(),O(e)}function j(){u.value?.sync()}function M(){let{value:e}=g;return e||null}function ee(e,t){t.disabled||U(t,!1)}function N(e,t){t.disabled||D(t)}function P(t){se(t,`action`)||e.onKeyup?.(t)}function z(t){se(t,`action`)||e.onKeydown?.(t)}function B(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function V(){let{value:e}=g;e&&U(e.getNext({loop:!0}),!0)}function H(){let{value:e}=g;e&&U(e.getPrev({loop:!0}),!0)}function U(e,t=!1){g.value=e,t&&G()}function G(){let t=g.value;if(!t)return;let n=h.value(t.key);n!==null&&(e.virtualScroll?l.value?.scrollTo({index:n}):u.value?.scrollTo({index:n,elSize:x.value}))}function ne(t){c.value?.contains(t.target)&&e.onFocus?.(t)}function K(t){c.value?.contains(t.relatedTarget)||e.onBlur?.(t)}A(oe,{handleOptionMouseEnter:ee,handleOptionClick:N,valueSetRef:C,pendingTmNodeRef:g,nodePropsRef:Y(e,`nodeProps`),showCheckmarkRef:Y(e,`showCheckmark`),multipleRef:Y(e,`multiple`),valueRef:Y(e,`value`),renderLabelRef:Y(e,`renderLabel`),renderOptionRef:Y(e,`renderOption`),labelFieldRef:Y(e,`labelField`),valueFieldRef:Y(e,`valueField`)}),A(he,c),W(()=>{let{value:e}=u;e&&e.sync()});let re=b(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[F(`optionFontSize`,t)]:x,[F(`optionHeight`,t)]:S,[F(`optionPadding`,t)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":L(C,`left`),"--n-option-padding-right":L(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:q}=e,J=q?T(`internal-select-menu`,b(()=>e.size[0]),re,e):void 0,X={selfRef:c,next:V,prev:H,getPendingTmNode:M};return rt(c,e.onResize),{mergedTheme:o,mergedClsPrefix:n,rtlEnabled:a,virtualListRef:l,scrollbarRef:u,itemSize:x,padding:S,flattenedNodes:m,empty:w,mergedRenderEmpty:E,virtualListContainer(){let{value:e}=l;return e?.listElRef},virtualListContent(){let{value:e}=l;return e?.itemsElRef},doScroll:O,handleFocusin:ne,handleFocusout:K,handleKeyUp:P,handleKeyDown:z,handleMouseDown:B,handleVirtualListResize:j,handleVirtualListScroll:k,cssVars:q?void 0:re,themeClass:J?.themeClass,onRender:J?.onRender,...X}},render(){let{$slots:e,virtualScroll:t,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),O(),v(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:X([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`]),style:c(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[w(()=>l(e.header,e=>e&&(O(),v(`div`,{class:X(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[w(()=>e)],2)))),this.loading?(O(),v(`div`,{key:0,class:X(`${r}-base-select-menu__loading`)},[(O(),n(C,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(O(),v(q,{key:1},[this.empty?(O(),v(`div`,{key:1,class:X(`${r}-base-select-menu__empty`),"data-empty":!0},[w(()=>y(e.empty,()=>[this.mergedRenderEmpty?.()||(O(),n(Q,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(O(),n(be,D({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(O(),n(Ge,{key:1,ref:`virtualListRef`,class:X(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(O(),n(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(O(),n(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(O(),v(`div`,{key:4,class:X(`${r}-base-select-menu-option-wrapper`),style:c({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[w(()=>this.flattenedNodes.map(e=>e.isGroup?(O(),n(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(O(),n(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),w(()=>l(e.action,e=>e&&[(O(),v(`div`,{class:X(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[w(()=>e)],2)),(O(),n(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=U([G(`base-selection`,`
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
 `,[G(`base-loading`,`
 color: var(--n-loading-color);
 `),G(`base-selection-tags`,`min-height: var(--n-height);`),H(`border, state-border`,`
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
 `),H(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),G(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[H(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),G(`base-selection-overlay`,`
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
 `,[H(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),G(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[H(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),G(`base-selection-tags`,`
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
 `),G(`base-selection-label`,`
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
 `,[G(`base-selection-input`,`
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
 `,[H(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),H(`render-label`,`
 color: var(--n-text-color);
 `)]),P(`disabled`,[U(`&:hover`,[H(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),K(`focus`,[H(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),K(`active`,[H(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),G(`base-selection-label`,`background-color: var(--n-color-active);`),G(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),K(`disabled`,`cursor: not-allowed;`,[H(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),G(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[G(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),H(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),G(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),G(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),G(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[H(`input`,`
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
 `),H(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>K(`${e}-status`,[H(`state-border`,`border: var(--n-border-${e});`),P(`disabled`,[U(`&:hover`,[H(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),K(`active`,[H(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),G(`base-selection-label`,`background-color: var(--n-color-active-${e});`),G(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),K(`focus`,[H(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),G(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),G(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[U(`&:last-child`,`padding-right: 0;`),G(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[H(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=m({name:`InternalSelection`,props:{...f.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(e){let{mergedClsPrefixRef:n,mergedRtlRef:r}=s(e),i=t(`InternalSelection`,r,n),a=I(null),o=I(null),c=I(null),l=I(null),u=I(null),d=I(null),m=I(null),h=I(null),g=I(null),_=I(null),v=I(!1),y=I(!1),x=I(!1),S=f(`InternalSelection`,`-internal-selection`,bt,Ae,e,Y(e,`clsPrefix`)),C=b(()=>e.clearable&&!e.disabled&&(x.value||e.active)),w=b(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Oe(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),E=b(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),D=b(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function O(){let{value:t}=a;if(t){let{value:n}=o;n&&(n.style.width=`${t.offsetWidth}px`,e.maxTagCount!==`responsive`&&g.value?.sync({showAllItemsBeforeCalculate:!1}))}}function k(){let{value:e}=_;e&&(e.style.display=`none`)}function A(){let{value:e}=_;e&&(e.style.display=`inline-block`)}te(Y(e,`active`),e=>{e||k()}),te(Y(e,`pattern`),()=>{e.multiple&&p(O)});function j(t){let{onFocus:n}=e;n&&n(t)}function M(t){let{onBlur:n}=e;n&&n(t)}function ee(t){let{onDeleteOption:n}=e;n&&n(t)}function N(t){let{onClear:n}=e;n&&n(t)}function P(t){let{onPatternInput:n}=e;n&&n(t)}function R(e){(!e.relatedTarget||!c.value?.contains(e.relatedTarget))&&j(e)}function B(e){c.value?.contains(e.relatedTarget)||M(e)}function V(e){N(e)}function H(){x.value=!0}function U(){x.value=!1}function G(t){e.active&&e.filterable&&t.target!==o.value&&t.preventDefault()}function ne(e){ee(e)}let K=I(!1);function re(t){if(t.key===`Backspace`&&!K.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&ne(t[t.length-1])}}let q=null;function J(t){let{value:n}=a;n&&(n.textContent=t.target.value,O()),e.ignoreComposition&&K.value?q=t:P(t)}function X(){K.value=!0}function Z(){K.value=!1,e.ignoreComposition&&P(q),q=null}function ie(t){y.value=!0,e.onPatternFocus?.(t)}function Q(t){y.value=!1,e.onPatternBlur?.(t)}function ae(){if(e.filterable)y.value=!1,d.value?.blur(),o.value?.blur();else if(e.multiple){let{value:e}=l;e?.blur()}else{let{value:e}=u;e?.blur()}}function oe(){e.filterable?(y.value=!1,d.value?.focus()):e.multiple?l.value?.focus():u.value?.focus()}function se(){let{value:e}=o;e&&(A(),e.focus())}function ce(){let{value:e}=o;e&&e.blur()}function le(e){let{value:t}=m;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=h;return e}function de(){return o.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){e.active||(pe(),fe=window.setTimeout(()=>{D.value&&(v.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),v.value=!1)}te(D,e=>{e||(v.value=!1)}),W(()=>{z(()=>{let t=d.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=y.value?-1:0)})}),rt(c,e.onResize);let{inlineThemeDisabled:_e}=e,ve=b(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:C,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:ee,colorActiveError:N,boxShadowFocusError:P,boxShadowActiveError:I,boxShadowHoverError:R,borderError:z,borderFocusError:B,borderHoverError:V,borderActiveError:H,clearColor:U,clearColorHover:W,clearColorPressed:te,clearSize:G,arrowSize:ne,[F(`height`,t)]:K,[F(`fontSize`,t)]:re}}=S.value,q=L(c),J=L(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":re,"--n-height":K,"--n-padding-single-top":q.top,"--n-padding-multiple-top":J.top,"--n-padding-single-right":q.right,"--n-padding-multiple-right":J.right,"--n-padding-single-left":q.left,"--n-padding-multiple-left":J.left,"--n-padding-single-bottom":q.bottom,"--n-padding-multiple-bottom":J.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":ee,"--n-color-active-error":N,"--n-box-shadow-focus-error":P,"--n-box-shadow-active-error":I,"--n-box-shadow-hover-error":R,"--n-border-error":z,"--n-border-focus-error":B,"--n-border-hover-error":V,"--n-border-active-error":H,"--n-clear-size":G,"--n-clear-color":U,"--n-clear-color-hover":W,"--n-clear-color-pressed":te,"--n-arrow-size":ne,"--n-font-weight":r}}),ye=_e?T(`internal-selection`,b(()=>e.size[0]),ve,e):void 0;return{mergedTheme:S,mergedClearable:C,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:y,filterablePlaceholder:w,label:E,selected:D,showTagsPanel:v,isComposing:K,counterRef:m,counterWrapperRef:h,patternInputMirrorRef:a,patternInputRef:o,selfRef:c,multipleElRef:l,singleElRef:u,patternInputWrapperRef:d,overflowRef:g,inputTagElRef:_,handleMouseDown:G,handleFocusin:R,handleClear:V,handleMouseEnter:H,handleMouseLeave:U,handleDeleteOption:ne,handlePatternKeyDown:re,handlePatternInputInput:J,handlePatternInputBlur:Q,handlePatternInputFocus:ie,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:B,handleCompositionEnd:Z,handleCompositionStart:X,onPopoverUpdateShow:ge,focus:oe,focusInput:se,blur:ae,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:e.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:t,size:r,disabled:i,filterable:a,maxTagCount:o,bordered:s,clsPrefix:l,ellipsisTagPopoverProps:u,onRender:d,renderTag:f,renderLabel:p}=this;d?.();let m=o===`responsive`,h=typeof o==`number`,g=m||h,_=(O(),n(ve,null,{default:()=>(O(),n(Te,{clsPrefix:l,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),y;if(t){let{labelField:e}=this,t=t=>(O(),v(`div`,{class:X(`${l}-base-selection-tag-wrapper`),key:t.value},[f?(O(),v(q,{key:0},[w(()=>f({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(O(),n(tt,{key:1,size:r,closable:!t.disabled,disabled:i,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>p?p(t,!0):Oe(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),s=()=>(h?this.selectedOptions.slice(0,o):this.selectedOptions).map(t),c=a?(O(),v(`div`,{class:X(`${l}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[V(`input`,D(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:i,value:this.pattern,autofocus:this.autofocus,class:`${l}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),V(`span`,{ref:`patternInputMirrorRef`,class:X(`${l}-base-selection-input-tag__mirror`)},[w(()=>this.pattern)],2)],2)):null,d=m?()=>(O(),v(`div`,{class:X(`${l}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(O(),n(tt,{size:r,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:i},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,b;if(h){let e=this.selectedOptions.length-o;e>0&&(b=(t=>(O(),v(`div`,{class:X(`${l}-base-selection-tag-wrapper`),key:`__counter__`},[(O(),n(tt,{size:r,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:i},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(b))}let x=m?a?(O(),n(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:d,tail:()=>c},1032,[`updateCounter`,`getCounter`,`getTail`])):(O(),n(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:d},1032,[`updateCounter`,`getCounter`])):h&&b?s().concat(b):s(),S=g?()=>(O(),v(`div`,{class:X(`${l}-base-selection-popover`)},[m?(O(),v(q,{key:0},[w(()=>s())],64)):(O(),v(q,{key:1},[w(()=>this.selectedOptions.map(t))],64))],2)):void 0,C=g?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...u}:null,T=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(O(),v(`div`,{key:5,class:X(`${l}-base-selection-placeholder ${l}-base-selection-overlay`)},[V(`div`,{class:X(`${l}-base-selection-placeholder__inner`)},[w(()=>this.placeholder)],2)],2)):null,E=a?(O(),v(`div`,{key:6,ref:`patternInputWrapperRef`,class:X(`${l}-base-selection-tags`)},[w(()=>x),m?w(()=>null):(O(),v(q,{key:1},[w(()=>c)],64)),w(()=>_)],2)):(O(),v(`div`,{key:7,ref:`multipleElRef`,class:X(`${l}-base-selection-tags`),tabindex:i?void 0:0},[w(()=>x),w(()=>_)],10,St));y=(e=>(O(),v(q,{key:8},[g?(O(),n(fe,D({key:0},C,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>E,default:S},1040)):(O(),v(q,{key:1},[w(()=>E)],64)),w(()=>T)],64)))(y)}else if(a){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;y=(e=>(O(),v(`div`,{key:9,ref:`patternInputWrapperRef`,class:X(`${l}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[V(`input`,D(this.inputProps,{ref:`patternInputRef`,class:`${l}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:i,disabled:i,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),n?(O(),v(`div`,{class:X(`${l}-base-selection-label__render-label ${l}-base-selection-overlay`),key:`input`},[V(`div`,{class:X(`${l}-base-selection-overlay__wrapper`)},[f?(O(),v(q,{key:0},[w(()=>f({option:this.selectedOption,handleClose:()=>{}}))],64)):(O(),v(q,{key:1},[p?(O(),v(q,{key:0},[w(()=>p(this.selectedOption,!0))],64)):(O(),v(q,{key:1},[w(()=>Oe(this.label,this.selectedOption,!0))],64))],64))],2)],2)):w(()=>null),t?(O(),v(`div`,{class:X(`${l}-base-selection-placeholder ${l}-base-selection-overlay`),key:`placeholder`},[V(`div`,{class:X(`${l}-base-selection-overlay__wrapper`)},[w(()=>this.filterablePlaceholder)],2)],2)):w(()=>null),w(()=>_)],10,Ct)))(y)}else y=(e=>(O(),v(`div`,{key:10,ref:`singleElRef`,class:X(`${l}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(O(),v(`div`,{class:X(`${l}-base-selection-placeholder ${l}-base-selection-overlay`),key:`placeholder`},[V(`div`,{class:X(`${l}-base-selection-placeholder__inner`)},[w(()=>this.placeholder)],2)],2)):(O(),v(`div`,{class:X(`${l}-base-selection-input`),title:nt(this.label),key:`input`},[V(`div`,{class:X(`${l}-base-selection-input__content`)},[f?(O(),v(q,{key:0},[w(()=>f({option:this.selectedOption,handleClose:()=>{}}))],64)):(O(),v(q,{key:1},[p?(O(),v(q,{key:0},[w(()=>p(this.selectedOption,!0))],64)):(O(),v(q,{key:1},[w(()=>Oe(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),w(()=>_)],10,Tt)))(y);return O(),v(`div`,{ref:`selfRef`,class:X([`${l}-base-selection`,this.rtlEnabled&&`${l}-base-selection--rtl`,this.themeClass,e&&`${l}-base-selection--${e}-status`,{[`${l}-base-selection--active`]:this.active,[`${l}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${l}-base-selection--disabled`]:this.disabled,[`${l}-base-selection--multiple`]:this.multiple,[`${l}-base-selection--focus`]:this.focused}]),style:c(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[w(()=>y),s?(O(),v(`div`,{key:0,class:X(`${l}-base-selection__border`)},null,2)):w(()=>null),s?(O(),v(`div`,{key:2,class:X(`${l}-base-selection__state-border`)},null,2)):w(()=>null)],46,Et)}}),Ot=U([G(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),G(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Pe({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...f.props,to:ce.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=m({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=s(e),c=f(`Select`,`-select`,Ot,De,e,t),l=I(e.defaultValue),u=Y(e,`value`),d=we(u,l),p=I(!1),m=I(``),h=Se(e,[`items`,`options`]),g=I([]),v=I([]),y=b(()=>v.value.concat(g.value).concat(h.value)),S=b(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),C=b(()=>{if(e.remote)return h.value;{let{value:t}=y,{value:n}=m;return!n.length||!e.filterable?t:vt(t,S.value,n,e.childrenField)}}),w=b(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return me(C.value,r)}),E=b(()=>yt(y.value,e.valueField,e.childrenField)),D=I(!1),O=we(Y(e,`show`),D),k=I(null),A=I(null),j=I(null),{localeRef:M}=ie(`Select`),ee=b(()=>e.placeholder??M.value.placeholder),N=[],P=I(new Map),F=b(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function L(t){let n=e.remote,{value:r}=P,{value:i}=E,{value:a}=F,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let R=b(()=>{if(e.multiple){let{value:e}=d;return Array.isArray(e)?L(e):[]}return null}),z=b(()=>{let{value:t}=d;return!e.multiple&&!Array.isArray(t)?t===null?null:L([t])[0]||null:null}),B=o(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:a?.value?.Select?.size||`medium`}}),{mergedSizeRef:V,mergedDisabledRef:H,mergedStatusRef:U}=B;function W(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=B;r&&_(r,t,n),a&&_(a,t,n),i&&_(i,t,n),l.value=t,o(),s()}function G(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=B;n&&_(n,t),r()}function ne(){let{onClear:t}=e;t&&_(t)}function K(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=B;n&&_(n,t),i(),r&&Z()}function re(t){let{onSearch:n}=e;n&&_(n,t)}function q(t){let{onScroll:n}=e;n&&_(n,t)}function J(){let{remote:t,multiple:n}=e;if(t){let{value:t}=P;if(n){let{valueField:n}=e;R.value?.forEach(e=>{t.set(e[n],e)})}else{let n=z.value;n&&t.set(n[e.valueField],n)}}}function X(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&_(n,t),r&&_(r,t),D.value=t}function Z(){H.value||(X(!0),D.value=!0,e.filterable&&Pe())}function Q(){X(!1)}function ae(){m.value=``,v.value=N}let oe=I(!1);function le(){e.filterable&&(oe.value=!0)}function ue(){e.filterable&&(oe.value=!1,O.value||ae())}function de(){H.value||(O.value?e.filterable?Pe():Q():Z())}function fe(e){j.value?.selfRef?.contains(e.relatedTarget)||(p.value=!1,G(e),Q())}function pe(e){K(e),p.value=!0}function he(){p.value=!0}function ge(e){k.value?.$el.contains(e.relatedTarget)||(p.value=!1,G(e),Q())}function ve(){k.value?.focus(),Q()}function ye(e){O.value&&(k.value?.$el.contains(_e(e))||Q())}function be(t){if(!Array.isArray(t))return[];if(F.value)return Array.from(t);{let{remote:n}=e,{value:r}=E;if(n){let{value:e}=P;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function xe(e){Ce(e.rawNode)}function Ce(t){if(H.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=v,t=e[0]||null;if(t){let e=g.value;e.length?e.push(t):g.value=[t],v.value=N}}if(r&&P.value.set(t[a],t),e.multiple){let e=be(d.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Te(t[a]);~e&&(g.value.splice(e,1),i&&(m.value=``))}}else e.push(t[a]),i&&(m.value=``);W(e,L(e))}else{if(n&&!r){let e=Te(t[a]);~e?g.value=[g.value[e]]:g.value=N}Ne(),Q(),W(t[a],t)}}function Te(t){return g.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){O.value||Z();let{value:n}=t.target;m.value=n;let{tag:r,remote:i}=e;if(re(n),r&&!i){if(!n){v.value=N;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;h.value.some(e=>e[i]===r[i]||e[a]===r[a])||g.value.some(e=>e[i]===r[i]||e[a]===r[a])?v.value=N:v.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Q(),r&&!i&&a&&(g.value=N),ne(),n?W([],[]):W(null,null)}function Ae(e){!se(e,`action`)&&!se(e,`empty`)&&!se(e,`header`)&&e.preventDefault()}function je(e){q(e)}function Me(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!k.value?.isComposing){if(O.value){let t=j.value?.getPendingTmNode();t?xe(t):e.filterable||(Q(),Ne())}else if(Z(),e.tag&&oe.value){let t=v.value[0];if(t){let n=t[e.valueField],{value:r}=d;e.multiple&&Array.isArray(r)&&r.includes(n)||Ce(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;O.value&&j.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;O.value?j.value?.next():Z();break;case`Escape`:O.value&&(ke(t),Q()),k.value?.focus()}}function Ne(){k.value?.focus()}function Pe(){k.value?.focusInput()}function Fe(){O.value&&A.value?.syncPosition()}J(),te(Y(e,`options`),J);let Ie={focus:()=>{k.value?.focus()},focusInput:()=>{k.value?.focusInput()},blur:()=>{k.value?.blur()},blurInput:()=>{k.value?.blurInput()}},Le=b(()=>{let{self:{menuBoxShadow:e}}=c.value;return{"--n-menu-box-shadow":e}}),Re=i?T(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:U,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:w,isMounted:x(),triggerRef:k,menuRef:j,pattern:m,uncontrolledShow:D,mergedShow:O,adjustedTo:ce(e),uncontrolledValue:l,mergedValue:d,followerRef:A,localizedPlaceholder:ee,selectedOption:z,selectedOptions:R,mergedSize:V,mergedDisabled:H,focused:p,activeWithoutMenuOpen:oe,inlineThemeDisabled:i,onTriggerInputFocus:le,onTriggerInputBlur:ue,handleTriggerOrMenuResize:Fe,handleMenuFocus:he,handleMenuBlur:ge,handleMenuTabOut:ve,handleTriggerClick:de,handleToggle:xe,handleDeleteOption:Ce,handlePatternInput:Ee,handleClear:Oe,handleTriggerBlur:fe,handleTriggerFocus:pe,handleKeydown:Me,handleMenuAfterLeave:ae,handleMenuClickOutside:ye,handleMenuScroll:je,handleMenuKeydown:Me,handleMenuMousedown:Ae,mergedTheme:c,cssVars:i?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return O(),v(`div`,{class:X(`${this.mergedClsPrefix}-select`)},[u(ae,null,{_:1,default:N(()=>[(O(),n(pe,null,{_:1,default:N(()=>(O(),n(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:N(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(O(),n(ue,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===ce.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:N(()=>(O(),n(j,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:N(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),ne((O(),n(pt,D(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:N(()=>[this.$slots.empty?.()]),header:N(()=>[this.$slots.header?.()]),action:N(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[ee,this.mergedShow],[Ee,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Ee,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};