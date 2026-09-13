import{$t as e,A as t,Dn as n,En as r,Hn as i,I as a,In as o,Jn as s,L as c,Ln as l,M as u,Mn as d,N as f,Nn as p,O as m,P as h,Pn as g,Qn as _,Qt as v,R as y,Rn as b,S as x,Sn as S,St as C,T as w,V as T,Vn as E,Wn as D,Yn as O,_ as k,_r as A,bn as j,ct as M,dt as N,fn as P,fr as F,ft as I,gn as L,gt as R,in as z,jn as B,kn as V,ln as ee,lt as H,mt as U,nn as W,rn as G,sr as K,st as te,tn as q,ut as ne,w as J,wn as Y,xn as X,yt as re}from"./endpoints-BzNG02YK.js";import{t as ie}from"./use-locale-3Rzs6P0a.js";import{O as ae,a as Z,l as Q,n as oe,o as se,p as ce,t as le}from"./fade-in-scale-up.cssr-6X4IxNMz.js";import{a as ue,c as de,d as fe,f as pe,g as me,h as he,i as ge,m as _e,o as ve,s as ye,t as be,u as xe}from"./Popover-Clul5osh.js";import{n as Se,r as Ce,t as we}from"./create-CLOJQO3W.js";import{t as Te}from"./Empty-5DowR1d3.js";import{n as Ee}from"./Input-CfXXkHU_.js";import{E as De,F as Oe,G as ke,M as Ae,U as je,V as Me,W as Ne,j as Pe}from"./index-BX2avFHL.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=K(0),a=K(0),o=j(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=h(()=>{let e=o.value;return e===null?0:Math.max(e.getBound(a.value)-1,0)}),c=e=>{let t=o.value;return t===null?0:t.sum(e)},l=h(()=>{let t=o.value;return t===null?0:Math.min(t.getBound(a.value+r.value)+1,e.value.length-1)});return i(Ve,{startIndexRef:s,endIndexRef:l,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:c}),{listWidthRef:r,scrollLeftRef:a}}var Ue=n({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=B(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=ue(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[ue(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[ue(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=n({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=R();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:ve,ssr:t}),b(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&y({key:n}):y({index:t})});let n=!1,r=!1;g(()=>{if(n=!1,!r){r=!0;return}y({top:m.value,left:o.value})}),l(()=>{n=!0,r||=!0});let i=h(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),a=j(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:o,listWidthRef:s}=He({columnsRef:F(e,`columns`),renderColRef:F(e,`renderCol`),renderItemWithColsRef:F(e,`renderItemWithCols`)}),c=K(null),u=K(void 0),d=new Map,f=j(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=d.get(n);a!==void 0&&i.add(t,a)}),i}),p=K(0),m=K(0),_=h(()=>Math.max(f.value.getBound(m.value-te(e.paddingTop))-1,0)),v=j(()=>{let{value:t}=u;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=_.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),y=(e,t)=>{if(typeof e==`number`){w(e,t,`auto`);return}let{left:n,top:r,index:i,key:o,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)w(n,r,c);else if(i!==void 0)C(i,c,l);else if(o!==void 0){let e=a.value.get(o);e!==void 0&&C(e,c,l)}else s===`bottom`?w(0,2**53-1,c):s===`top`&&w(0,0,c)},x,S=null;function C(t,n,r){let i=c.value;if(i==null)return;let{value:a}=f,o=a.sum(t)+te(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{x=t,S!==null&&window.clearTimeout(S),S=window.setTimeout(()=>{x=void 0,S=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function w(e,t,n){c.value?.scrollTo({left:e,top:t,behavior:n})}function T(t,r){if(n||e.ignoreItemResize||N(r.target))return;let{value:i}=f,o=a.value.get(t),s=i.get(o),l=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(l===s)return;l-e.itemSize===0?d.delete(t):d.set(t,l-e.itemSize);let u=l-s;if(u===0)return;i.add(o,u);let m=c.value;if(m!=null){if(x===void 0){let e=i.sum(o);m.scrollTop>e&&m.scrollBy(0,u)}else(o<x||o===x&&l+i.sum(o)>m.scrollTop+m.offsetHeight)&&m.scrollBy(0,u);M()}p.value++}let E=!Re(),D=!1;function O(t){var n;(n=e.onScroll)==null||n.call(e,t),(!E||!D)&&M()}function k(t){var n;if((n=e.onWheel)==null||n.call(e,t),E){let e=c.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),M(),D=!0,me(()=>{D=!1})}}}function A(t){if(n||N(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===u.value)return}else if(t.contentRect.height===u.value&&t.contentRect.width===s.value)return;u.value=t.contentRect.height,s.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function M(){let{value:e}=c;e!=null&&(m.value=e.scrollTop,o.value=e.scrollLeft)}function N(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:u,listStyle:{overflow:`auto`},keyToIndex:a,itemsStyle:j(()=>{let{itemResizable:t}=e,n=H(f.value.sum());return p.value,[e.itemsStyle,{boxSizing:`content-box`,width:H(i.value),height:t?``:n,minHeight:t?n:``,paddingTop:H(e.paddingTop),paddingBottom:H(e.paddingBottom)}]}),visibleItemsStyle:j(()=>(p.value,{transform:`translateY(${H(f.value.sum(_.value))})`})),viewportItems:v,listElRef:c,itemsElRef:K(null),scrollTo:y,handleListResize:A,handleListScroll:O,handleListWheel:k,handleItemResize:T}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return V(Z,{onResize:this.handleListResize},{default:()=>{var i;return V(`div`,d(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):V(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[V(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:V(Ue,{index:s,item:a}),l=i==null?void 0:V(Ue,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?V(Z,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Ke=ue(`[v-hidden]`,{display:`none!important`}),qe=n({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=K(null),r=K(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let a=R();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:ve,ssr:a}),b(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:e}=this;return p(()=>this.sync({showAllItemsBeforeCalculate:!1})),V(`div`,{class:`v-overflow`,ref:`selfRef`},[D(e,`default`),e.counter?e.counter():V(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...je,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${T(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:T(i,{alpha:.12}),colorBorderedPrimary:T(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:T(i,{alpha:.12}),closeColorPressedPrimary:T(i,{alpha:.18}),borderInfo:`1px solid ${T(a,{alpha:.3})}`,textColorInfo:a,colorInfo:T(a,{alpha:.12}),colorBorderedInfo:T(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:T(a,{alpha:.12}),closeColorPressedInfo:T(a,{alpha:.18}),borderSuccess:`1px solid ${T(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:T(o,{alpha:.12}),colorBorderedSuccess:T(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:T(o,{alpha:.12}),closeColorPressedSuccess:T(o,{alpha:.18}),borderWarning:`1px solid ${T(s,{alpha:.35})}`,textColorWarning:s,colorWarning:T(s,{alpha:.15}),colorBorderedWarning:T(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:T(s,{alpha:.12}),closeColorPressedWarning:T(s,{alpha:.18}),borderError:`1px solid ${T(c,{alpha:.23})}`,textColorError:c,colorError:T(c,{alpha:.1}),colorBorderedError:T(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:T(c,{alpha:.12}),closeColorPressedError:T(c,{alpha:.18})}}var Ye={name:`Tag`,common:y,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=e(`tag`,`
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
`,[W(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),q(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),q(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),q(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),q(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),W(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[q(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),q(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),W(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),W(`icon, avatar`,[W(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),W(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),W(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[G(`disabled`,[v(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[G(`checked`,`color: var(--n-text-color-hover-checkable);`)]),v(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[G(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),W(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[G(`disabled`,[v(`&:hover`,`background-color: var(--n-color-checked-hover);`),v(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...a.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=C(`n-tag`),tt=n({name:`Tag`,props:$e,slots:Object,setup(e){let t=K(null),{mergedBorderedRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:o,mergedRtlRef:s,mergedComponentPropsRef:l}=re(e),d=j(()=>e.size||l?.value?.Tag?.size||`medium`),f=a(`Tag`,`-tag`,Ze,Ye,e,r);i(et,{roundRef:F(e,`round`)});function p(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function m(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&u(n,t)}}let h={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},g=w(`Tag`,s,r),_=j(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=d.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:u,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[z(`colorBordered`,t)]:T,[z(`closeSize`,a)]:E,[z(`closeIconSize`,a)]:D,[z(`fontSize`,a)]:O,[z(`height`,a)]:k,[z(`color`,t)]:A,[z(`textColor`,t)]:j,[z(`border`,t)]:N,[z(`closeIconColor`,t)]:P,[z(`closeIconColorHover`,t)]:F,[z(`closeIconColorPressed`,t)]:I,[z(`closeColorHover`,t)]:L,[z(`closeColorPressed`,t)]:R}}=f.value,B=M(c);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":N,"--n-close-icon-size":D,"--n-close-color-pressed":R,"--n-close-color-hover":L,"--n-close-border-radius":C,"--n-close-icon-color":P,"--n-close-icon-color-hover":F,"--n-close-icon-color-pressed":I,"--n-close-icon-color-disabled":P,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":E,"--n-color":r||(n.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":u,"--n-padding":s,"--n-text-color":i||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),v=o?c(`tag`,j(()=>{let t=``,{type:r,color:{color:i,textColor:a}={}}=e;return t+=r[0],t+=d.value[0],i&&(t+=`a${J(i)}`),a&&(t+=`b${J(a)}`),n.value&&(t+=`c`),t}),_,e):void 0;return{...h,rtlEnabled:g,mergedClsPrefix:r,contentRef:t,mergedBordered:n,handleClick:p,handleCloseClick:m,cssVars:o?void 0:_,themeClass:v?.themeClass,onRender:v?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let c=t(s.avatar,t=>t&&(E(),Y(`div`,{class:N(`${e}-tag__avatar`)},[U(()=>t)],2))),l=t(s.icon,t=>t&&(E(),Y(`div`,{class:N(`${e}-tag__icon`)},[U(()=>t)],2)));return E(),Y(`div`,{class:N([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:n,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:a,[`${e}-tag--avatar`]:c,[`${e}-tag--icon`]:l,[`${e}-tag--closable`]:r}]),style:A(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[U(()=>l||c),X(`span`,{class:N(`${e}-tag__content`),ref:`contentRef`},[U(()=>this.$slots.default?.())],2),!this.checkable&&r?(E(),S(Me,{key:0,clsPrefix:e,class:N(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):U(()=>null),!this.checkable&&this.mergedBordered?(E(),Y(`div`,{key:2,class:N(`${e}-tag__border`),style:A({borderColor:i})},null,6)):U(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(b(()=>{let{value:n}=e;n&&se.registerHandler(n,t)}),s(e,(e,t)=>{t&&se.unregisterHandler(t)},{deep:!1}),o(()=>{let{value:t}=e;t&&se.unregisterHandler(t)}))}var it=n({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=ne(`d16ead82505dc285`);return E(),Y(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=n({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=B(he);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):Oe(i[this.labelField],i,!1),s=(E(),Y(`div`,d(a,{class:[`${e}-base-select-group-header`,a?.class]}),[U(()=>o)],16));return i.render?i.render({node:s,option:i}):n?n({node:s,option:i,selected:!1}):s}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=n({name:`Checkmark`,render(){return(()=>{let e=ne(`3c84eac8ae4e1f96`);return e[0]||=X(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[X(`g`,{fill:`none`},[X(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return E(),S(ee,{name:`fade-in-scale-up-transition`},{default:()=>e?(E(),S(ke,{key:1,clsPrefix:t,class:N(`${t}-base-select-option__check`)},{default:()=>V(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=n({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:f}=B(he),p=h(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function m(t){let{tmNode:n}=e;n.disabled||d(t,n)}function g(t){let{tmNode:n}=e;n.disabled||f(t,n)}function _(t){let{tmNode:n}=e,{value:r}=p;n.disabled||r||f(t,n)}return{multiple:r,isGrouped:h(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:p,isSelected:h(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:_,handleMouseEnter:g,handleClick:m}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:s,renderLabel:c,handleClick:l,handleMouseEnter:u,handleMouseMove:f}=this,p=lt(n,e),m=c?[c(t,n),a&&p]:[Oe(t[this.labelField],t,n),a&&p],h=o?.(t),g=(E(),Y(`div`,d(h,{class:[`${e}-base-select-option`,t.class,h?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[h?.style||``,t.style||``],onClick:ot([l,h?.onClick]),onMouseenter:ot([u,h?.onMouseenter]),onMousemove:ot([f,h?.onMousemove])}),[X(`div`,{class:N(`${e}-base-select-option__content`)},[U(()=>m)],2)],16,ct));return t.render?t.render({node:g,option:t,selected:n}):s?s({node:g,option:t,selected:n}):g}}),dt=e(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[e(`scrollbar`,`
 max-height: var(--n-height);
 `),e(`virtual-list`,`
 max-height: var(--n-height);
 `),e(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[q(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),e(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),e(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),q(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),q(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),q(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),q(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),e(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),e(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[W(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),v(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),v(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),W(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),W(`pending`,[v(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),W(`selected`,`
 color: var(--n-option-text-color-active);
 `,[v(`&::before`,`
 background-color: var(--n-option-color-active);
 `),W(`pending`,[v(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),W(`disabled`,`
 cursor: not-allowed;
 `,[G(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),W(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),q(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[le({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=n({name:`InternalSelectMenu`,props:{...a.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:r}=re(e),l=w(`InternalSelectMenu`,n,t),u=a(`InternalSelectMenu`,`-internal-select-menu`,dt,Ne,e,F(e,`clsPrefix`)),d=K(null),f=K(null),m=K(null),h=j(()=>e.treeMate.getFlattenedNodes()),g=j(()=>Se(h.value)),_=K(null);function v(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),U(n||null)}function y(){let{value:t}=_;t&&!e.treeMate.getNode(t.key)&&(_.value=null)}let x;s(()=>e.show,t=>{t?x=s(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?v():y(),p(W)):y()},{immediate:!0}):x?.()},{immediate:!0}),o(()=>{x?.()});let S=j(()=>te(u.value.self[z(`optionHeight`,e.size)])),C=j(()=>M(u.value.self[z(`padding`,e.size)])),T=j(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),E=j(()=>{let e=h.value;return e&&e.length===0}),D=j(()=>r?.value?.Select?.renderEmpty);function O(t){let{onToggle:n}=e;n&&n(t)}function k(t){let{onScroll:n}=e;n&&n(t)}function A(e){m.value?.sync(),k(e)}function N(){m.value?.sync()}function P(){let{value:e}=_;return e||null}function I(e,t){t.disabled||U(t,!1)}function L(e,t){t.disabled||O(t)}function R(t){Ce(t,`action`)||e.onKeyup?.(t)}function B(t){Ce(t,`action`)||e.onKeydown?.(t)}function V(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function ee(){let{value:e}=_;e&&U(e.getNext({loop:!0}),!0)}function H(){let{value:e}=_;e&&U(e.getPrev({loop:!0}),!0)}function U(e,t=!1){_.value=e,t&&W()}function W(){let t=_.value;if(!t)return;let n=g.value(t.key);n!==null&&(e.virtualScroll?f.value?.scrollTo({index:n}):m.value?.scrollTo({index:n,elSize:S.value}))}function G(t){d.value?.contains(t.target)&&e.onFocus?.(t)}function q(t){d.value?.contains(t.relatedTarget)||e.onBlur?.(t)}i(he,{handleOptionMouseEnter:I,handleOptionClick:L,valueSetRef:T,pendingTmNodeRef:_,nodePropsRef:F(e,`nodeProps`),showCheckmarkRef:F(e,`showCheckmark`),multipleRef:F(e,`multiple`),valueRef:F(e,`value`),renderLabelRef:F(e,`renderLabel`),renderOptionRef:F(e,`renderOption`),labelFieldRef:F(e,`labelField`),valueFieldRef:F(e,`valueField`)}),i(_e,d),b(()=>{let{value:e}=m;e&&e.sync()});let ne=j(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:o,actionDividerColor:s,optionTextColorPressed:c,optionTextColor:l,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[z(`optionFontSize`,t)]:x,[z(`optionHeight`,t)]:S,[z(`optionPadding`,t)]:C}}=u.value;return{"--n-height":r,"--n-action-divider-color":s,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":o,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":l,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":c,"--n-option-padding":C,"--n-option-padding-left":M(C,`left`),"--n-option-padding-right":M(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:J}=e,Y=J?c(`internal-select-menu`,j(()=>e.size[0]),ne,e):void 0,X={selfRef:d,next:ee,prev:H,getPendingTmNode:P};return rt(d,e.onResize),{mergedTheme:u,mergedClsPrefix:t,rtlEnabled:l,virtualListRef:f,scrollbarRef:m,itemSize:S,padding:C,flattenedNodes:h,empty:E,mergedRenderEmpty:D,virtualListContainer(){let{value:e}=f;return e?.listElRef},virtualListContent(){let{value:e}=f;return e?.itemsElRef},doScroll:k,handleFocusin:G,handleFocusout:q,handleKeyUp:R,handleKeyDown:B,handleMouseDown:V,handleVirtualListResize:N,handleVirtualListScroll:A,cssVars:J?void 0:ne,themeClass:Y?.themeClass,onRender:Y?.onRender,...X}},render(){let{$slots:e,virtualScroll:n,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),E(),Y(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:N([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`]),style:A(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[U(()=>t(e.header,e=>e&&(E(),Y(`div`,{class:N(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[U(()=>e)],2)))),this.loading?(E(),Y(`div`,{key:0,class:N(`${r}-base-select-menu__loading`)},[(E(),S(k,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(E(),Y(L,{key:1},[this.empty?(E(),Y(`div`,{key:1,class:N(`${r}-base-select-menu__empty`),"data-empty":!0},[U(()=>m(e.empty,()=>[this.mergedRenderEmpty?.()||(E(),S(Te,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(E(),S(oe,d({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},this.scrollbarProps),{default:()=>n?(E(),S(Ge,{key:1,ref:`virtualListRef`,class:N(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(E(),S(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(E(),S(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(E(),Y(`div`,{key:4,class:N(`${r}-base-select-menu-option-wrapper`),style:A({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[U(()=>this.flattenedNodes.map(e=>e.isGroup?(E(),S(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(E(),S(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),U(()=>t(e.action,e=>e&&[(E(),Y(`div`,{class:N(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[U(()=>e)],2)),(E(),S(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=v([e(`base-selection`,`
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
 `,[e(`base-loading`,`
 color: var(--n-loading-color);
 `),e(`base-selection-tags`,`min-height: var(--n-height);`),q(`border, state-border`,`
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
 `),q(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),e(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[q(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),e(`base-selection-overlay`,`
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
 `,[q(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),e(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[q(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),e(`base-selection-tags`,`
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
 `),e(`base-selection-label`,`
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
 `,[e(`base-selection-input`,`
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
 `,[q(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),q(`render-label`,`
 color: var(--n-text-color);
 `)]),G(`disabled`,[v(`&:hover`,[q(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),W(`focus`,[q(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),W(`active`,[q(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),e(`base-selection-label`,`background-color: var(--n-color-active);`),e(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),W(`disabled`,`cursor: not-allowed;`,[q(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),e(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[e(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),q(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),e(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),e(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),e(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[q(`input`,`
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
 `),q(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(t=>W(`${t}-status`,[q(`state-border`,`border: var(--n-border-${t});`),G(`disabled`,[v(`&:hover`,[q(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${t});
 border: var(--n-border-hover-${t});
 `)]),W(`active`,[q(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${t});
 border: var(--n-border-active-${t});
 `),e(`base-selection-label`,`background-color: var(--n-color-active-${t});`),e(`base-selection-tags`,`background-color: var(--n-color-active-${t});`)]),W(`focus`,[q(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${t});
 border: var(--n-border-focus-${t});
 `)])])]))]),e(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),e(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[v(`&:last-child`,`padding-right: 0;`),e(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[q(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=n({name:`InternalSelection`,props:{...a.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=re(e),r=w(`InternalSelection`,n,t),i=K(null),o=K(null),l=K(null),u=K(null),d=K(null),f=K(null),m=K(null),h=K(null),g=K(null),_=K(null),v=K(!1),y=K(!1),x=K(!1),S=a(`InternalSelection`,`-internal-selection`,bt,Ae,e,F(e,`clsPrefix`)),C=j(()=>e.clearable&&!e.disabled&&(x.value||e.active)),T=j(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Oe(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),E=j(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),D=j(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function k(){let{value:t}=i;if(t){let{value:n}=o;n&&(n.style.width=`${t.offsetWidth}px`,e.maxTagCount!==`responsive`&&g.value?.sync({showAllItemsBeforeCalculate:!1}))}}function A(){let{value:e}=_;e&&(e.style.display=`none`)}function N(){let{value:e}=_;e&&(e.style.display=`inline-block`)}s(F(e,`active`),e=>{e||A()}),s(F(e,`pattern`),()=>{e.multiple&&p(k)});function P(t){let{onFocus:n}=e;n&&n(t)}function I(t){let{onBlur:n}=e;n&&n(t)}function L(t){let{onDeleteOption:n}=e;n&&n(t)}function R(t){let{onClear:n}=e;n&&n(t)}function B(t){let{onPatternInput:n}=e;n&&n(t)}function V(e){(!e.relatedTarget||!l.value?.contains(e.relatedTarget))&&P(e)}function ee(e){l.value?.contains(e.relatedTarget)||I(e)}function H(e){R(e)}function U(){x.value=!0}function W(){x.value=!1}function G(t){e.active&&e.filterable&&t.target!==o.value&&t.preventDefault()}function te(e){L(e)}let q=K(!1);function ne(t){if(t.key===`Backspace`&&!q.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&te(t[t.length-1])}}let J=null;function Y(t){let{value:n}=i;n&&(n.textContent=t.target.value,k()),e.ignoreComposition&&q.value?J=t:B(t)}function X(){q.value=!0}function ie(){q.value=!1,e.ignoreComposition&&B(J),J=null}function ae(t){y.value=!0,e.onPatternFocus?.(t)}function Z(t){y.value=!1,e.onPatternBlur?.(t)}function Q(){if(e.filterable)y.value=!1,f.value?.blur(),o.value?.blur();else if(e.multiple){let{value:e}=u;e?.blur()}else{let{value:e}=d;e?.blur()}}function oe(){e.filterable?(y.value=!1,f.value?.focus()):e.multiple?u.value?.focus():d.value?.focus()}function se(){let{value:e}=o;e&&(N(),e.focus())}function ce(){let{value:e}=o;e&&e.blur()}function le(e){let{value:t}=m;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=h;return e}function de(){return o.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){e.active||(pe(),fe=window.setTimeout(()=>{D.value&&(v.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),v.value=!1)}s(D,e=>{e||(v.value=!1)}),b(()=>{O(()=>{let t=f.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=y.value?-1:0)})}),rt(l,e.onResize);let{inlineThemeDisabled:_e}=e,ve=j(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:C,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:N,borderActiveWarning:P,colorActiveError:F,boxShadowFocusError:I,boxShadowActiveError:L,boxShadowHoverError:R,borderError:B,borderFocusError:V,borderHoverError:ee,borderActiveError:H,clearColor:U,clearColorHover:W,clearColorPressed:G,clearSize:K,arrowSize:te,[z(`height`,t)]:q,[z(`fontSize`,t)]:ne}}=S.value,J=M(c),Y=M(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":ne,"--n-height":q,"--n-padding-single-top":J.top,"--n-padding-multiple-top":Y.top,"--n-padding-single-right":J.right,"--n-padding-multiple-right":Y.right,"--n-padding-single-left":J.left,"--n-padding-multiple-left":Y.left,"--n-padding-single-bottom":J.bottom,"--n-padding-multiple-bottom":Y.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":N,"--n-border-active-warning":P,"--n-color-active-error":F,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":L,"--n-box-shadow-hover-error":R,"--n-border-error":B,"--n-border-focus-error":V,"--n-border-hover-error":ee,"--n-border-active-error":H,"--n-clear-size":K,"--n-clear-color":U,"--n-clear-color-hover":W,"--n-clear-color-pressed":G,"--n-arrow-size":te,"--n-font-weight":r}}),ye=_e?c(`internal-selection`,j(()=>e.size[0]),ve,e):void 0;return{mergedTheme:S,mergedClearable:C,mergedClsPrefix:t,rtlEnabled:r,patternInputFocused:y,filterablePlaceholder:T,label:E,selected:D,showTagsPanel:v,isComposing:q,counterRef:m,counterWrapperRef:h,patternInputMirrorRef:i,patternInputRef:o,selfRef:l,multipleElRef:u,singleElRef:d,patternInputWrapperRef:f,overflowRef:g,inputTagElRef:_,handleMouseDown:G,handleFocusin:V,handleClear:H,handleMouseEnter:U,handleMouseLeave:W,handleDeleteOption:te,handlePatternKeyDown:ne,handlePatternInputInput:Y,handlePatternInputBlur:Z,handlePatternInputFocus:ae,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:ee,handleCompositionEnd:ie,handleCompositionStart:X,onPopoverUpdateShow:ge,focus:oe,focusInput:se,blur:Q,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:e.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:i,maxTagCount:a,bordered:o,clsPrefix:s,ellipsisTagPopoverProps:c,onRender:l,renderTag:u,renderLabel:f}=this;l?.();let p=a===`responsive`,m=typeof a==`number`,h=p||m,g=(E(),S(ce,null,{default:()=>(E(),S(Ee,{clsPrefix:s,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),_;if(t){let{labelField:e}=this,t=t=>(E(),Y(`div`,{class:N(`${s}-base-selection-tag-wrapper`),key:t.value},[u?(E(),Y(L,{key:0},[U(()=>u({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(E(),S(tt,{key:1,size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>f?f(t,!0):Oe(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),o=()=>(m?this.selectedOptions.slice(0,a):this.selectedOptions).map(t),l=i?(E(),Y(`div`,{class:N(`${s}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[X(`input`,d(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${s}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),X(`span`,{ref:`patternInputMirrorRef`,class:N(`${s}-base-selection-input-tag__mirror`)},[U(()=>this.pattern)],2)],2)):null,v=p?()=>(E(),Y(`div`,{class:N(`${s}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(E(),S(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,y;if(m){let e=this.selectedOptions.length-a;e>0&&(y=(t=>(E(),Y(`div`,{class:N(`${s}-base-selection-tag-wrapper`),key:`__counter__`},[(E(),S(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(y))}let b=p?i?(E(),S(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:v,tail:()=>l},1032,[`updateCounter`,`getCounter`,`getTail`])):(E(),S(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:v},1032,[`updateCounter`,`getCounter`])):m&&y?o().concat(y):o(),x=h?()=>(E(),Y(`div`,{class:N(`${s}-base-selection-popover`)},[p?(E(),Y(L,{key:0},[U(()=>o())],64)):(E(),Y(L,{key:1},[U(()=>this.selectedOptions.map(t))],64))],2)):void 0,C=h?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...c}:null,w=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(E(),Y(`div`,{key:5,class:N(`${s}-base-selection-placeholder ${s}-base-selection-overlay`)},[X(`div`,{class:N(`${s}-base-selection-placeholder__inner`)},[U(()=>this.placeholder)],2)],2)):null,T=i?(E(),Y(`div`,{key:6,ref:`patternInputWrapperRef`,class:N(`${s}-base-selection-tags`)},[U(()=>b),p?U(()=>null):(E(),Y(L,{key:1},[U(()=>l)],64)),U(()=>g)],2)):(E(),Y(`div`,{key:7,ref:`multipleElRef`,class:N(`${s}-base-selection-tags`),tabindex:r?void 0:0},[U(()=>b),U(()=>g)],10,St));_=(e=>(E(),Y(L,{key:8},[h?(E(),S(be,d({key:0},C,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>T,default:x},1040)):(E(),Y(L,{key:1},[U(()=>T)],64)),U(()=>w)],64)))(_)}else if(i){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;_=(e=>(E(),Y(`div`,{key:9,ref:`patternInputWrapperRef`,class:N(`${s}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[X(`input`,d(this.inputProps,{ref:`patternInputRef`,class:`${s}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),n?(E(),Y(`div`,{class:N(`${s}-base-selection-label__render-label ${s}-base-selection-overlay`),key:`input`},[X(`div`,{class:N(`${s}-base-selection-overlay__wrapper`)},[u?(E(),Y(L,{key:0},[U(()=>u({option:this.selectedOption,handleClose:()=>{}}))],64)):(E(),Y(L,{key:1},[f?(E(),Y(L,{key:0},[U(()=>f(this.selectedOption,!0))],64)):(E(),Y(L,{key:1},[U(()=>Oe(this.label,this.selectedOption,!0))],64))],64))],2)],2)):U(()=>null),t?(E(),Y(`div`,{class:N(`${s}-base-selection-placeholder ${s}-base-selection-overlay`),key:`placeholder`},[X(`div`,{class:N(`${s}-base-selection-overlay__wrapper`)},[U(()=>this.filterablePlaceholder)],2)],2)):U(()=>null),U(()=>g)],10,Ct)))(_)}else _=(e=>(E(),Y(`div`,{key:10,ref:`singleElRef`,class:N(`${s}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(E(),Y(`div`,{class:N(`${s}-base-selection-placeholder ${s}-base-selection-overlay`),key:`placeholder`},[X(`div`,{class:N(`${s}-base-selection-placeholder__inner`)},[U(()=>this.placeholder)],2)],2)):(E(),Y(`div`,{class:N(`${s}-base-selection-input`),title:nt(this.label),key:`input`},[X(`div`,{class:N(`${s}-base-selection-input__content`)},[u?(E(),Y(L,{key:0},[U(()=>u({option:this.selectedOption,handleClose:()=>{}}))],64)):(E(),Y(L,{key:1},[f?(E(),Y(L,{key:0},[U(()=>f(this.selectedOption,!0))],64)):(E(),Y(L,{key:1},[U(()=>Oe(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),U(()=>g)],10,Tt)))(_);return E(),Y(`div`,{ref:`selfRef`,class:N([`${s}-base-selection`,this.rtlEnabled&&`${s}-base-selection--rtl`,this.themeClass,e&&`${s}-base-selection--${e}-status`,{[`${s}-base-selection--active`]:this.active,[`${s}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${s}-base-selection--disabled`]:this.disabled,[`${s}-base-selection--multiple`]:this.multiple,[`${s}-base-selection--focus`]:this.focused}]),style:A(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[U(()=>_),o?(E(),Y(`div`,{key:0,class:N(`${s}-base-selection__border`)},null,2)):U(()=>null),o?(E(),Y(`div`,{key:2,class:N(`${s}-base-selection__state-border`)},null,2)):U(()=>null)],46,Et)}}),Ot=v([e(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),e(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[le({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...a.props,to:xe.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=n({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:o}=re(e),l=a(`Select`,`-select`,Ot,De,e,t),d=K(e.defaultValue),p=F(e,`value`),m=pe(p,d),h=K(!1),g=K(``),_=fe(e,[`items`,`options`]),v=K([]),y=K([]),b=j(()=>y.value.concat(v.value).concat(_.value)),S=j(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),C=j(()=>{if(e.remote)return _.value;{let{value:t}=b,{value:n}=g;return!n.length||!e.filterable?t:vt(t,S.value,n,e.childrenField)}}),w=j(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return we(C.value,r)}),T=j(()=>yt(b.value,e.valueField,e.childrenField)),E=K(!1),D=pe(F(e,`show`),E),O=K(null),k=K(null),A=K(null),{localeRef:M}=ie(`Select`),N=j(()=>e.placeholder??M.value.placeholder),P=[],I=K(new Map),L=j(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function R(t){let n=e.remote,{value:r}=I,{value:i}=T,{value:a}=L,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let z=j(()=>{if(e.multiple){let{value:e}=m;return Array.isArray(e)?R(e):[]}return null}),B=j(()=>{let{value:t}=m;return!e.multiple&&!Array.isArray(t)?t===null?null:R([t])[0]||null:null}),V=x(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:ee,mergedDisabledRef:H,mergedStatusRef:U}=V;function W(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=V;r&&u(r,t,n),a&&u(a,t,n),i&&u(i,t,n),d.value=t,o(),s()}function G(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=V;n&&u(n,t),r()}function te(){let{onClear:t}=e;t&&u(t)}function q(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=V;n&&u(n,t),i(),r&&Z()}function ne(t){let{onSearch:n}=e;n&&u(n,t)}function J(t){let{onScroll:n}=e;n&&u(n,t)}function Y(){let{remote:t,multiple:n}=e;if(t){let{value:t}=I;if(n){let{valueField:n}=e;z.value?.forEach(e=>{t.set(e[n],e)})}else{let n=B.value;n&&t.set(n[e.valueField],n)}}}function X(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&u(n,t),r&&u(r,t),E.value=t}function Z(){H.value||(X(!0),E.value=!0,e.filterable&&Ne())}function Q(){X(!1)}function oe(){g.value=``,y.value=P}let se=K(!1);function ce(){e.filterable&&(se.value=!0)}function le(){e.filterable&&(se.value=!1,D.value||oe())}function ue(){H.value||(D.value?e.filterable?Ne():Q():Z())}function de(e){A.value?.selfRef?.contains(e.relatedTarget)||(h.value=!1,G(e),Q())}function me(e){q(e),h.value=!0}function he(){h.value=!0}function ge(e){O.value?.$el.contains(e.relatedTarget)||(h.value=!1,G(e),Q())}function _e(){O.value?.focus(),Q()}function ve(e){D.value&&(O.value?.$el.contains(ae(e))||Q())}function ye(t){if(!Array.isArray(t))return[];if(L.value)return Array.from(t);{let{remote:n}=e,{value:r}=T;if(n){let{value:e}=I;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function be(e){Se(e.rawNode)}function Se(t){if(H.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=y,t=e[0]||null;if(t){let e=v.value;e.length?e.push(t):v.value=[t],y.value=P}}if(r&&I.value.set(t[a],t),e.multiple){let e=ye(m.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Te(t[a]);~e&&(v.value.splice(e,1),i&&(g.value=``))}}else e.push(t[a]),i&&(g.value=``);W(e,R(e))}else{if(n&&!r){let e=Te(t[a]);~e?v.value=[v.value[e]]:v.value=P}Me(),Q(),W(t[a],t)}}function Te(t){return v.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){D.value||Z();let{value:n}=t.target;g.value=n;let{tag:r,remote:i}=e;if(ne(n),r&&!i){if(!n){y.value=P;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;_.value.some(e=>e[i]===r[i]||e[a]===r[a])||v.value.some(e=>e[i]===r[i]||e[a]===r[a])?y.value=P:y.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Q(),r&&!i&&a&&(v.value=P),te(),n?W([],[]):W(null,null)}function ke(e){!Ce(e,`action`)&&!Ce(e,`empty`)&&!Ce(e,`header`)&&e.preventDefault()}function Ae(e){J(e)}function je(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!O.value?.isComposing){if(D.value){let t=A.value?.getPendingTmNode();t?be(t):e.filterable||(Q(),Me())}else if(Z(),e.tag&&se.value){let t=y.value[0];if(t){let n=t[e.valueField],{value:r}=m;e.multiple&&Array.isArray(r)&&r.includes(n)||Se(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;D.value&&A.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;D.value?A.value?.next():Z();break;case`Escape`:D.value&&(Pe(t),Q()),O.value?.focus()}}function Me(){O.value?.focus()}function Ne(){O.value?.focusInput()}function Fe(){D.value&&k.value?.syncPosition()}Y(),s(F(e,`options`),Y);let Ie={focus:()=>{O.value?.focus()},focusInput:()=>{O.value?.focusInput()},blur:()=>{O.value?.blur()},blurInput:()=>{O.value?.blurInput()}},Le=j(()=>{let{self:{menuBoxShadow:e}}=l.value;return{"--n-menu-box-shadow":e}}),Re=i?c(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:U,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:w,isMounted:f(),triggerRef:O,menuRef:A,pattern:g,uncontrolledShow:E,mergedShow:D,adjustedTo:xe(e),uncontrolledValue:d,mergedValue:m,followerRef:k,localizedPlaceholder:N,selectedOption:B,selectedOptions:z,mergedSize:ee,mergedDisabled:H,focused:h,activeWithoutMenuOpen:se,inlineThemeDisabled:i,onTriggerInputFocus:ce,onTriggerInputBlur:le,handleTriggerOrMenuResize:Fe,handleMenuFocus:he,handleMenuBlur:ge,handleMenuTabOut:_e,handleTriggerClick:ue,handleToggle:be,handleDeleteOption:Se,handlePatternInput:Ee,handleClear:Oe,handleTriggerBlur:de,handleTriggerFocus:me,handleKeydown:je,handleMenuAfterLeave:oe,handleMenuClickOutside:ve,handleMenuScroll:Ae,handleMenuKeydown:je,handleMenuMousedown:ke,mergedTheme:l,cssVars:i?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return E(),Y(`div`,{class:N(`${this.mergedClsPrefix}-select`)},[r(de,null,{_:1,default:I(()=>[(E(),S(ye,null,{_:1,default:I(()=>(E(),S(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:I(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(E(),S(ge,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===xe.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:I(()=>(E(),S(ee,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:I(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),_((E(),S(pt,d(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:I(()=>[this.$slots.empty?.()]),header:I(()=>[this.$slots.header?.()]),action:I(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[P,this.mergedShow],[Q,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Q,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};