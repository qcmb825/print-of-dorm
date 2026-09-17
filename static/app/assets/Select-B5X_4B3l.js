import{A as e,An as t,At as n,B as r,D as i,Dr as a,Dt as o,F as s,H as c,Hn as l,In as u,Jn as d,K as f,Kn as p,L as m,Ln as h,Mn as g,N as _,On as v,Qn as y,R as b,S as x,Sr as S,St as C,U as w,Un as T,Vn as E,Wn as D,Y as O,Zn as k,_n as A,_r as j,_t as M,ar as N,bn as ee,bt as P,cr as F,dn as I,er as L,fn as R,gt as te,ht as ne,ir as re,k as z,kn as B,ln as V,on as H,qn as U,sn as W,un as G,vt as K,wn as q,wt as J,yt as Y,z as X,zn as Z}from"./endpoints-DxQPCLqF.js";import{n as ie,t as Q}from"./Empty-BKQAa2mi.js";import{c as ae,d as oe,f as se,l as ce,n as le,o as ue,p as de,r as fe,s as pe,t as me,u as he}from"./create-Cnw189WE.js";import{i as ge,l as _e,o as ve,r as ye,t as be}from"./Scrollbar-C-sdX_Vk.js";import{n as xe,r as Se,t as Ce}from"./cssr-PC_ZRNdG.js";import{t as we}from"./use-merged-state-BBKZotlX.js";import{n as Te}from"./Input-CRvKg_wY.js";import{$ as Ee,A as De,B as Oe,F as ke,I as Ae,Y as je,ft as Me,q as Ne,z as Pe}from"./index-Dp3yRsNZ.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=j(0),i=j(0),a=v(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),o=X(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),s=e=>{let t=a.value;return t===null?0:t.sum(e)},c=X(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return y(Ve,{startIndexRef:o,endIndexRef:c,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:s}),{listWidthRef:r,scrollLeftRef:i}}var Ue=h({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=E(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=Ce(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Ce(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Ce(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=h({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=J();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:xe,ssr:t}),d(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&_({key:n}):_({index:t})});let n=!1,r=!1;D(()=>{if(n=!1,!r){r=!0;return}_({top:m.value,left:o.value})}),U(()=>{n=!0,r||=!0});let i=X(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),a=v(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:o,listWidthRef:s}=He({columnsRef:S(e,`columns`),renderColRef:S(e,`renderCol`),renderItemWithColsRef:S(e,`renderItemWithCols`)}),c=j(null),l=j(void 0),u=new Map,f=v(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=u.get(n);a!==void 0&&i.add(t,a)}),i}),p=j(0),m=j(0),h=X(()=>Math.max(f.value.getBound(m.value-ne(e.paddingTop))-1,0)),g=v(()=>{let{value:t}=l;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=h.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),_=(e,t)=>{if(typeof e==`number`){C(e,t,`auto`);return}let{left:n,top:r,index:i,key:o,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)C(n,r,c);else if(i!==void 0)x(i,c,l);else if(o!==void 0){let e=a.value.get(o);e!==void 0&&x(e,c,l)}else s===`bottom`?C(0,2**53-1,c):s===`top`&&C(0,0,c)},y,b=null;function x(t,n,r){let i=c.value;if(i==null)return;let{value:a}=f,o=a.sum(t)+ne(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{y=t,b!==null&&window.clearTimeout(b),b=window.setTimeout(()=>{y=void 0,b=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function C(e,t,n){c.value?.scrollTo({left:e,top:t,behavior:n})}function w(t,r){if(n||e.ignoreItemResize||ee(r.target))return;let{value:i}=f,o=a.value.get(t),s=i.get(o),l=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(l===s)return;l-e.itemSize===0?u.delete(t):u.set(t,l-e.itemSize);let d=l-s;if(d===0)return;i.add(o,d);let m=c.value;if(m!=null){if(y===void 0){let e=i.sum(o);m.scrollTop>e&&m.scrollBy(0,d)}else(o<y||o===y&&l+i.sum(o)>m.scrollTop+m.offsetHeight)&&m.scrollBy(0,d);N()}p.value++}let T=!Re(),E=!1;function O(t){var n;(n=e.onScroll)==null||n.call(e,t),(!T||!E)&&N()}function k(t){var n;if((n=e.onWheel)==null||n.call(e,t),T){let e=c.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),N(),E=!0,de(()=>{E=!1})}}}function A(t){if(n||ee(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===l.value)return}else if(t.contentRect.height===l.value&&t.contentRect.width===s.value)return;l.value=t.contentRect.height,s.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function N(){let{value:e}=c;e!=null&&(m.value=e.scrollTop,o.value=e.scrollLeft)}function ee(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:l,listStyle:{overflow:`auto`},keyToIndex:a,itemsStyle:v(()=>{let{itemResizable:t}=e,n=M(f.value.sum());return p.value,[e.itemsStyle,{boxSizing:`content-box`,width:M(i.value),height:t?``:n,minHeight:t?n:``,paddingTop:M(e.paddingTop),paddingBottom:M(e.paddingBottom)}]}),visibleItemsStyle:v(()=>(p.value,{transform:`translateY(${M(f.value.sum(h.value))})`})),viewportItems:g,listElRef:c,itemsElRef:j(null),scrollTo:_,handleListResize:A,handleListScroll:O,handleListWheel:k,handleItemResize:w}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return Z(ye,{onResize:this.handleListResize},{default:()=>{var i;return Z(`div`,l(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):Z(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[Z(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:Z(Ue,{index:s,item:a}),l=i==null?void 0:Z(Ue,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?Z(ye,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Ke=Ce(`[v-hidden]`,{display:`none!important`}),qe=h({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=j(null),r=j(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let a=J();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:xe,ssr:a}),d(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:e}=this;return T(()=>this.sync({showAllItemsBeforeCalculate:!1})),Z(`div`,{class:`v-overflow`,ref:`selfRef`},[L(e,`default`),e.counter?e.counter():Z(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:D,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...je,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:D,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${O(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:O(i,{alpha:.12}),colorBorderedPrimary:O(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:O(i,{alpha:.12}),closeColorPressedPrimary:O(i,{alpha:.18}),borderInfo:`1px solid ${O(a,{alpha:.3})}`,textColorInfo:a,colorInfo:O(a,{alpha:.12}),colorBorderedInfo:O(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:O(a,{alpha:.12}),closeColorPressedInfo:O(a,{alpha:.18}),borderSuccess:`1px solid ${O(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:O(o,{alpha:.12}),colorBorderedSuccess:O(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:O(o,{alpha:.12}),closeColorPressedSuccess:O(o,{alpha:.18}),borderWarning:`1px solid ${O(s,{alpha:.35})}`,textColorWarning:s,colorWarning:O(s,{alpha:.15}),colorBorderedWarning:O(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:O(s,{alpha:.12}),closeColorPressedWarning:O(s,{alpha:.18}),borderError:`1px solid ${O(c,{alpha:.23})}`,textColorError:c,colorError:O(c,{alpha:.1}),colorBorderedError:O(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:O(c,{alpha:.12}),closeColorPressedError:O(c,{alpha:.18})}}var Ye={name:`Tag`,common:f,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=W(`tag`,`
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
`,[G(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),V(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),V(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),V(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),V(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),G(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[V(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),V(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),G(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),G(`icon, avatar`,[G(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),G(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),G(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[I(`disabled`,[H(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[I(`checked`,`color: var(--n-text-color-hover-checkable);`)]),H(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[I(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),G(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[I(`disabled`,[H(`&:hover`,`background-color: var(--n-color-checked-hover);`),H(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...c.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=n(`n-tag`),tt=h({name:`Tag`,props:$e,slots:Object,setup(t){let n=j(null),{mergedBorderedRef:r,mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:s,mergedComponentPropsRef:l}=o(t),u=v(()=>t.size||l?.value?.Tag?.size||`medium`),d=c(`Tag`,`-tag`,Ze,Ye,t,i);y(et,{roundRef:S(t,`round`)});function f(){if(!t.disabled&&t.checkable){let{checked:e,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=t;r&&r(!e),i&&i(!e),n&&n(!e)}}function p(e){if(t.triggerClickOnClose||e.stopPropagation(),!t.disabled){let{onClose:n}=t;n&&m(n,e)}}let h={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},g=e(`Tag`,s,i),_=v(()=>{let{type:e,color:{color:n,textColor:i}={}}=t,a=u.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[R(`colorBordered`,e)]:T,[R(`closeSize`,a)]:E,[R(`closeIconSize`,a)]:D,[R(`fontSize`,a)]:O,[R(`height`,a)]:k,[R(`color`,e)]:A,[R(`textColor`,e)]:j,[R(`border`,e)]:M,[R(`closeIconColor`,e)]:N,[R(`closeIconColorHover`,e)]:ee,[R(`closeIconColorPressed`,e)]:P,[R(`closeColorHover`,e)]:F,[R(`closeColorPressed`,e)]:I}}=d.value,L=te(c);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":M,"--n-close-icon-size":D,"--n-close-color-pressed":I,"--n-close-color-hover":F,"--n-close-border-radius":C,"--n-close-icon-color":N,"--n-close-icon-color-hover":ee,"--n-close-icon-color-pressed":P,"--n-close-icon-color-disabled":N,"--n-close-margin-top":L.top,"--n-close-margin-right":L.right,"--n-close-margin-bottom":L.bottom,"--n-close-margin-left":L.left,"--n-close-size":E,"--n-color":n||(r.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),b=a?w(`tag`,v(()=>{let e=``,{type:n,color:{color:i,textColor:a}={}}=t;return e+=n[0],e+=u.value[0],i&&(e+=`a${z(i)}`),a&&(e+=`b${z(a)}`),r.value&&(e+=`c`),e}),_,t):void 0;return{...h,rtlEnabled:g,mergedClsPrefix:i,contentRef:n,mergedBordered:r,handleClick:f,handleCloseClick:p,cssVars:a?void 0:_,themeClass:b?.themeClass,onRender:b?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:o,onRender:c,$slots:l}=this;c?.();let u=s(l.avatar,t=>t&&(k(),g(`div`,{class:Y(`${e}-tag__avatar`)},[C(()=>t)],2))),d=s(l.icon,t=>t&&(k(),g(`div`,{class:Y(`${e}-tag__icon`)},[C(()=>t)],2)));return k(),g(`div`,{class:Y([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:n,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:o,[`${e}-tag--avatar`]:u,[`${e}-tag--icon`]:d,[`${e}-tag--closable`]:r}]),style:a(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[C(()=>d||u),B(`span`,{class:Y(`${e}-tag__content`),ref:`contentRef`},[C(()=>this.$slots.default?.())],2),!this.checkable&&r?(k(),t(Ne,{key:0,clsPrefix:e,class:Y(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:o,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):C(()=>null),!this.checkable&&this.mergedBordered?(k(),g(`div`,{key:2,class:Y(`${e}-tag__border`),style:a({borderColor:i})},null,6)):C(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(d(()=>{let{value:n}=e;n&&ge.registerHandler(n,t)}),re(e,(e,t)=>{t&&ge.unregisterHandler(t)},{deep:!1}),p(()=>{let{value:t}=e;t&&ge.unregisterHandler(t)}))}var it=h({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=K(`d16ead82505dc285`);return k(),g(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=h({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=E(oe);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):Oe(i[this.labelField],i,!1),s=(k(),g(`div`,l(a,{class:[`${e}-base-select-group-header`,a?.class]}),[C(()=>o)],16));return i.render?i.render({node:s,option:i}):n?n({node:s,option:i,selected:!1}):s}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=h({name:`Checkmark`,render(){return(()=>{let e=K(`3c84eac8ae4e1f96`);return e[0]||=B(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[B(`g`,{fill:`none`},[B(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,n){return k(),t(A,{name:`fade-in-scale-up-transition`},{default:()=>e?(k(),t(r,{key:1,clsPrefix:n,class:Y(`${n}-base-select-option__check`)},{default:()=>Z(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=h({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:f}=E(oe),p=X(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function m(t){let{tmNode:n}=e;n.disabled||d(t,n)}function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e,{value:r}=p;n.disabled||r||f(t,n)}return{multiple:r,isGrouped:X(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:p,isSelected:X(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:g,handleMouseEnter:h,handleClick:m}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:s,renderLabel:c,handleClick:u,handleMouseEnter:d,handleMouseMove:f}=this,p=lt(n,e),m=c?[c(t,n),a&&p]:[Oe(t[this.labelField],t,n),a&&p],h=o?.(t),_=(k(),g(`div`,l(h,{class:[`${e}-base-select-option`,t.class,h?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[h?.style||``,t.style||``],onClick:ot([u,h?.onClick]),onMouseenter:ot([d,h?.onMouseenter]),onMousemove:ot([f,h?.onMousemove])}),[B(`div`,{class:Y(`${e}-base-select-option__content`)},[C(()=>m)],2)],16,ct));return t.render?t.render({node:_,option:t,selected:n}):s?s({node:_,option:t,selected:n}):_}}),dt=W(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[W(`scrollbar`,`
 max-height: var(--n-height);
 `),W(`virtual-list`,`
 max-height: var(--n-height);
 `),W(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[V(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),W(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),W(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),V(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),V(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),V(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),V(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),W(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),W(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[G(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),H(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),H(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),G(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),G(`pending`,[H(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),G(`selected`,`
 color: var(--n-option-text-color-active);
 `,[H(`&::before`,`
 background-color: var(--n-option-color-active);
 `),G(`pending`,[H(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),G(`disabled`,`
 cursor: not-allowed;
 `,[I(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),G(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),V(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Pe({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=h({name:`InternalSelectMenu`,props:{...c.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:i}=o(t),a=e(`InternalSelectMenu`,r,n),s=c(`InternalSelectMenu`,`-internal-select-menu`,dt,Me,t,S(t,`clsPrefix`)),l=j(null),u=j(null),f=j(null),m=v(()=>t.treeMate.getFlattenedNodes()),h=v(()=>le(m.value)),g=j(null);function _(){let{treeMate:e}=t,n=null,{value:r}=t;r===null?n=e.getFirstAvailableNode():(n=t.multiple?e.getNode((r||[])[(r||[]).length-1]):e.getNode(r),(!n||n.disabled)&&(n=e.getFirstAvailableNode())),U(n||null)}function b(){let{value:e}=g;e&&!t.treeMate.getNode(e.key)&&(g.value=null)}let x;re(()=>t.show,e=>{e?x=re(()=>t.treeMate,()=>{t.resetMenuOnOptionsChange?(t.autoPending?_():b(),T(W)):b()},{immediate:!0}):x?.()},{immediate:!0}),p(()=>{x?.()});let C=v(()=>ne(s.value.self[R(`optionHeight`,t.size)])),E=v(()=>te(s.value.self[R(`padding`,t.size)])),D=v(()=>t.multiple&&Array.isArray(t.value)?new Set(t.value):new Set),O=v(()=>{let e=m.value;return e&&e.length===0}),k=v(()=>i?.value?.Select?.renderEmpty);function A(e){let{onToggle:n}=t;n&&n(e)}function M(e){let{onScroll:n}=t;n&&n(e)}function N(e){f.value?.sync(),M(e)}function ee(){f.value?.sync()}function P(){let{value:e}=g;return e||null}function F(e,t){t.disabled||U(t,!1)}function I(e,t){t.disabled||A(t)}function L(e){se(e,`action`)||t.onKeyup?.(e)}function z(e){se(e,`action`)||t.onKeydown?.(e)}function B(e){t.onMousedown?.(e),!t.focusable&&e.preventDefault()}function V(){let{value:e}=g;e&&U(e.getNext({loop:!0}),!0)}function H(){let{value:e}=g;e&&U(e.getPrev({loop:!0}),!0)}function U(e,t=!1){g.value=e,t&&W()}function W(){let e=g.value;if(!e)return;let n=h.value(e.key);n!==null&&(t.virtualScroll?u.value?.scrollTo({index:n}):f.value?.scrollTo({index:n,elSize:C.value}))}function G(e){l.value?.contains(e.target)&&t.onFocus?.(e)}function K(e){l.value?.contains(e.relatedTarget)||t.onBlur?.(e)}y(oe,{handleOptionMouseEnter:F,handleOptionClick:I,valueSetRef:D,pendingTmNodeRef:g,nodePropsRef:S(t,`nodeProps`),showCheckmarkRef:S(t,`showCheckmark`),multipleRef:S(t,`multiple`),valueRef:S(t,`value`),renderLabelRef:S(t,`renderLabel`),renderOptionRef:S(t,`renderOption`),labelFieldRef:S(t,`labelField`),valueFieldRef:S(t,`valueField`)}),y(he,l),d(()=>{let{value:e}=f;e&&e.sync()});let q=v(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:o,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[R(`optionFontSize`,e)]:x,[R(`optionHeight`,e)]:S,[R(`optionPadding`,e)]:C}}=s.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":o,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":te(C,`left`),"--n-option-padding-right":te(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:J}=t,Y=J?w(`internal-select-menu`,v(()=>t.size[0]),q,t):void 0,X={selfRef:l,next:V,prev:H,getPendingTmNode:P};return rt(l,t.onResize),{mergedTheme:s,mergedClsPrefix:n,rtlEnabled:a,virtualListRef:u,scrollbarRef:f,itemSize:C,padding:E,flattenedNodes:m,empty:O,mergedRenderEmpty:k,virtualListContainer(){let{value:e}=u;return e?.listElRef},virtualListContent(){let{value:e}=u;return e?.itemsElRef},doScroll:M,handleFocusin:G,handleFocusout:K,handleKeyUp:L,handleKeyDown:z,handleMouseDown:B,handleVirtualListResize:ee,handleVirtualListScroll:N,cssVars:J?void 0:q,themeClass:Y?.themeClass,onRender:Y?.onRender,...X}},render(){let{$slots:e,virtualScroll:n,clsPrefix:r,mergedTheme:i,themeClass:o,onRender:c}=this;return c?.(),k(),g(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:Y([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,o,this.multiple&&`${r}-base-select-menu--multiple`]),style:a(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[C(()=>s(e.header,e=>e&&(k(),g(`div`,{class:Y(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[C(()=>e)],2)))),this.loading?(k(),g(`div`,{key:0,class:Y(`${r}-base-select-menu__loading`)},[(k(),t(x,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(k(),g(q,{key:1},[this.empty?(k(),g(`div`,{key:1,class:Y(`${r}-base-select-menu__empty`),"data-empty":!0},[C(()=>_(e.empty,()=>[this.mergedRenderEmpty?.()||(k(),t(Q,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(k(),t(be,l({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},this.scrollbarProps),{default:()=>n?(k(),t(Ge,{key:1,ref:`virtualListRef`,class:Y(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(k(),t(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(k(),t(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(k(),g(`div`,{key:4,class:Y(`${r}-base-select-menu-option-wrapper`),style:a({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[C(()=>this.flattenedNodes.map(e=>e.isGroup?(k(),t(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(k(),t(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),C(()=>s(e.action,e=>e&&[(k(),g(`div`,{class:Y(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[C(()=>e)],2)),(k(),t(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=H([W(`base-selection`,`
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
 `,[W(`base-loading`,`
 color: var(--n-loading-color);
 `),W(`base-selection-tags`,`min-height: var(--n-height);`),V(`border, state-border`,`
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
 `),V(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),W(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[V(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),W(`base-selection-overlay`,`
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
 `,[V(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),W(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[V(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),W(`base-selection-tags`,`
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
 `),W(`base-selection-label`,`
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
 `,[W(`base-selection-input`,`
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
 `,[V(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),V(`render-label`,`
 color: var(--n-text-color);
 `)]),I(`disabled`,[H(`&:hover`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),G(`focus`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),G(`active`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),W(`base-selection-label`,`background-color: var(--n-color-active);`),W(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),G(`disabled`,`cursor: not-allowed;`,[V(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),W(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[W(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),V(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),W(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),W(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),W(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[V(`input`,`
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
 `),V(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>G(`${e}-status`,[V(`state-border`,`border: var(--n-border-${e});`),I(`disabled`,[H(`&:hover`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),G(`active`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),W(`base-selection-label`,`background-color: var(--n-color-active-${e});`),W(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),G(`focus`,[V(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),W(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),W(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[H(`&:last-child`,`padding-right: 0;`),W(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[V(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=h({name:`InternalSelection`,props:{...c.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r}=o(t),i=e(`InternalSelection`,r,n),a=j(null),s=j(null),l=j(null),u=j(null),f=j(null),p=j(null),m=j(null),h=j(null),g=j(null),_=j(null),y=j(!1),b=j(!1),x=j(!1),C=c(`InternalSelection`,`-internal-selection`,bt,Ae,t,S(t,`clsPrefix`)),E=v(()=>t.clearable&&!t.disabled&&(x.value||t.active)),D=v(()=>t.selectedOption?t.renderTag?t.renderTag({option:t.selectedOption,handleClose:()=>{}}):t.renderLabel?t.renderLabel(t.selectedOption,!0):Oe(t.selectedOption[t.labelField],t.selectedOption,!0):t.placeholder),O=v(()=>{let e=t.selectedOption;if(e)return e[t.labelField]}),k=v(()=>t.multiple?!!(Array.isArray(t.selectedOptions)&&t.selectedOptions.length):t.selectedOption!==null);function A(){let{value:e}=a;if(e){let{value:n}=s;n&&(n.style.width=`${e.offsetWidth}px`,t.maxTagCount!==`responsive`&&g.value?.sync({showAllItemsBeforeCalculate:!1}))}}function M(){let{value:e}=_;e&&(e.style.display=`none`)}function ee(){let{value:e}=_;e&&(e.style.display=`inline-block`)}re(S(t,`active`),e=>{e||M()}),re(S(t,`pattern`),()=>{t.multiple&&T(A)});function P(e){let{onFocus:n}=t;n&&n(e)}function F(e){let{onBlur:n}=t;n&&n(e)}function I(e){let{onDeleteOption:n}=t;n&&n(e)}function L(e){let{onClear:n}=t;n&&n(e)}function ne(e){let{onPatternInput:n}=t;n&&n(e)}function z(e){(!e.relatedTarget||!l.value?.contains(e.relatedTarget))&&P(e)}function B(e){l.value?.contains(e.relatedTarget)||F(e)}function V(e){L(e)}function H(){x.value=!0}function U(){x.value=!1}function W(e){t.active&&t.filterable&&e.target!==s.value&&e.preventDefault()}function G(e){I(e)}let K=j(!1);function q(e){if(e.key===`Backspace`&&!K.value&&!t.pattern.length){let{selectedOptions:e}=t;e?.length&&G(e[e.length-1])}}let J=null;function Y(e){let{value:n}=a;n&&(n.textContent=e.target.value,A()),t.ignoreComposition&&K.value?J=e:ne(e)}function X(){K.value=!0}function Z(){K.value=!1,t.ignoreComposition&&ne(J),J=null}function ie(e){b.value=!0,t.onPatternFocus?.(e)}function Q(e){b.value=!1,t.onPatternBlur?.(e)}function ae(){if(t.filterable)b.value=!1,p.value?.blur(),s.value?.blur();else if(t.multiple){let{value:e}=u;e?.blur()}else{let{value:e}=f;e?.blur()}}function oe(){t.filterable?(b.value=!1,p.value?.focus()):t.multiple?u.value?.focus():f.value?.focus()}function se(){let{value:e}=s;e&&(ee(),e.focus())}function ce(){let{value:e}=s;e&&e.blur()}function le(e){let{value:t}=m;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=h;return e}function de(){return s.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){t.active||(pe(),fe=window.setTimeout(()=>{k.value&&(y.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),y.value=!1)}re(k,e=>{e||(y.value=!1)}),d(()=>{N(()=>{let e=p.value;e&&(t.disabled?e.removeAttribute(`tabindex`):e.tabIndex=b.value?-1:0)})}),rt(l,t.onResize);let{inlineThemeDisabled:_e}=t,ve=v(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:N,colorActiveError:ee,boxShadowFocusError:P,boxShadowActiveError:F,boxShadowHoverError:I,borderError:L,borderFocusError:ne,borderHoverError:re,borderActiveError:z,clearColor:B,clearColorHover:V,clearColorPressed:H,clearSize:U,arrowSize:W,[R(`height`,e)]:G,[R(`fontSize`,e)]:K}}=C.value,q=te(c),J=te(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":K,"--n-height":G,"--n-padding-single-top":q.top,"--n-padding-multiple-top":J.top,"--n-padding-single-right":q.right,"--n-padding-multiple-right":J.right,"--n-padding-single-left":q.left,"--n-padding-multiple-left":J.left,"--n-padding-single-bottom":q.bottom,"--n-padding-multiple-bottom":J.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":N,"--n-color-active-error":ee,"--n-box-shadow-focus-error":P,"--n-box-shadow-active-error":F,"--n-box-shadow-hover-error":I,"--n-border-error":L,"--n-border-focus-error":ne,"--n-border-hover-error":re,"--n-border-active-error":z,"--n-clear-size":U,"--n-clear-color":B,"--n-clear-color-hover":V,"--n-clear-color-pressed":H,"--n-arrow-size":W,"--n-font-weight":r}}),ye=_e?w(`internal-selection`,v(()=>t.size[0]),ve,t):void 0;return{mergedTheme:C,mergedClearable:E,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:b,filterablePlaceholder:D,label:O,selected:k,showTagsPanel:y,isComposing:K,counterRef:m,counterWrapperRef:h,patternInputMirrorRef:a,patternInputRef:s,selfRef:l,multipleElRef:u,singleElRef:f,patternInputWrapperRef:p,overflowRef:g,inputTagElRef:_,handleMouseDown:W,handleFocusin:z,handleClear:V,handleMouseEnter:H,handleMouseLeave:U,handleDeleteOption:G,handlePatternKeyDown:q,handlePatternInputInput:Y,handlePatternInputBlur:Q,handlePatternInputFocus:ie,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:B,handleCompositionEnd:Z,handleCompositionStart:X,onPopoverUpdateShow:ge,focus:oe,focusInput:se,blur:ae,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:t.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:n,size:r,disabled:i,filterable:o,maxTagCount:s,bordered:c,clsPrefix:u,ellipsisTagPopoverProps:d,onRender:f,renderTag:p,renderLabel:m}=this;f?.();let h=s===`responsive`,_=typeof s==`number`,v=h||_,y=(k(),t(ve,null,{default:()=>(k(),t(Te,{clsPrefix:u,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),b;if(n){let{labelField:e}=this,n=n=>(k(),g(`div`,{class:Y(`${u}-base-selection-tag-wrapper`),key:n.value},[p?(k(),g(q,{key:0},[C(()=>p({option:n,handleClose:()=>{this.handleDeleteOption(n)}}))],64)):(k(),t(tt,{key:1,size:r,closable:!n.disabled,disabled:i,onClose:()=>{this.handleDeleteOption(n)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>m?m(n,!0):Oe(n[e],n,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),a=()=>(_?this.selectedOptions.slice(0,s):this.selectedOptions).map(n),c=o?(k(),g(`div`,{class:Y(`${u}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[B(`input`,l(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:i,value:this.pattern,autofocus:this.autofocus,class:`${u}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),B(`span`,{ref:`patternInputMirrorRef`,class:Y(`${u}-base-selection-input-tag__mirror`)},[C(()=>this.pattern)],2)],2)):null,f=h?()=>(k(),g(`div`,{class:Y(`${u}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(k(),t(tt,{size:r,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:i},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,x;if(_){let e=this.selectedOptions.length-s;e>0&&(x=(n=>(k(),g(`div`,{class:Y(`${u}-base-selection-tag-wrapper`),key:`__counter__`},[(k(),t(tt,{size:r,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:i},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(x))}let S=h?o?(k(),t(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:a,counter:f,tail:()=>c},1032,[`updateCounter`,`getCounter`,`getTail`])):(k(),t(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:a,counter:f},1032,[`updateCounter`,`getCounter`])):_&&x?a().concat(x):a(),w=v?()=>(k(),g(`div`,{class:Y(`${u}-base-selection-popover`)},[h?(k(),g(q,{key:0},[C(()=>a())],64)):(k(),g(q,{key:1},[C(()=>this.selectedOptions.map(n))],64))],2)):void 0,T=v?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...d}:null,E=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(k(),g(`div`,{key:5,class:Y(`${u}-base-selection-placeholder ${u}-base-selection-overlay`)},[B(`div`,{class:Y(`${u}-base-selection-placeholder__inner`)},[C(()=>this.placeholder)],2)],2)):null,D=o?(k(),g(`div`,{key:6,ref:`patternInputWrapperRef`,class:Y(`${u}-base-selection-tags`)},[C(()=>S),h?C(()=>null):(k(),g(q,{key:1},[C(()=>c)],64)),C(()=>y)],2)):(k(),g(`div`,{key:7,ref:`multipleElRef`,class:Y(`${u}-base-selection-tags`),tabindex:i?void 0:0},[C(()=>S),C(()=>y)],10,St));b=(e=>(k(),g(q,{key:8},[v?(k(),t(fe,l({key:0},T,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>D,default:w},1040)):(k(),g(q,{key:1},[C(()=>D)],64)),C(()=>E)],64)))(b)}else if(o){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;b=(e=>(k(),g(`div`,{key:9,ref:`patternInputWrapperRef`,class:Y(`${u}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[B(`input`,l(this.inputProps,{ref:`patternInputRef`,class:`${u}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:i,disabled:i,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),n?(k(),g(`div`,{class:Y(`${u}-base-selection-label__render-label ${u}-base-selection-overlay`),key:`input`},[B(`div`,{class:Y(`${u}-base-selection-overlay__wrapper`)},[p?(k(),g(q,{key:0},[C(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(k(),g(q,{key:1},[m?(k(),g(q,{key:0},[C(()=>m(this.selectedOption,!0))],64)):(k(),g(q,{key:1},[C(()=>Oe(this.label,this.selectedOption,!0))],64))],64))],2)],2)):C(()=>null),t?(k(),g(`div`,{class:Y(`${u}-base-selection-placeholder ${u}-base-selection-overlay`),key:`placeholder`},[B(`div`,{class:Y(`${u}-base-selection-overlay__wrapper`)},[C(()=>this.filterablePlaceholder)],2)],2)):C(()=>null),C(()=>y)],10,Ct)))(b)}else b=(e=>(k(),g(`div`,{key:10,ref:`singleElRef`,class:Y(`${u}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(k(),g(`div`,{class:Y(`${u}-base-selection-placeholder ${u}-base-selection-overlay`),key:`placeholder`},[B(`div`,{class:Y(`${u}-base-selection-placeholder__inner`)},[C(()=>this.placeholder)],2)],2)):(k(),g(`div`,{class:Y(`${u}-base-selection-input`),title:nt(this.label),key:`input`},[B(`div`,{class:Y(`${u}-base-selection-input__content`)},[p?(k(),g(q,{key:0},[C(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(k(),g(q,{key:1},[m?(k(),g(q,{key:0},[C(()=>m(this.selectedOption,!0))],64)):(k(),g(q,{key:1},[C(()=>Oe(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),C(()=>y)],10,Tt)))(b);return k(),g(`div`,{ref:`selfRef`,class:Y([`${u}-base-selection`,this.rtlEnabled&&`${u}-base-selection--rtl`,this.themeClass,e&&`${u}-base-selection--${e}-status`,{[`${u}-base-selection--active`]:this.active,[`${u}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${u}-base-selection--disabled`]:this.disabled,[`${u}-base-selection--multiple`]:this.multiple,[`${u}-base-selection--focus`]:this.focused}]),style:a(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[C(()=>b),c?(k(),g(`div`,{key:0,class:Y(`${u}-base-selection__border`)},null,2)):C(()=>null),c?(k(),g(`div`,{key:2,class:Y(`${u}-base-selection__state-border`)},null,2)):C(()=>null)],46,Et)}}),Ot=H([W(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),W(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Pe({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...c.props,to:ce.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=h({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:a,mergedComponentPropsRef:s}=o(e),l=c(`Select`,`-select`,Ot,De,e,t),u=j(e.defaultValue),d=S(e,`value`),f=we(d,u),p=j(!1),h=j(``),g=Se(e,[`items`,`options`]),_=j([]),y=j([]),x=v(()=>y.value.concat(_.value).concat(g.value)),C=v(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),T=v(()=>{if(e.remote)return g.value;{let{value:t}=x,{value:n}=h;return!n.length||!e.filterable?t:vt(t,C.value,n,e.childrenField)}}),E=v(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return me(T.value,r)}),D=v(()=>yt(x.value,e.valueField,e.childrenField)),O=j(!1),k=we(S(e,`show`),O),A=j(null),M=j(null),N=j(null),{localeRef:ee}=ie(`Select`),P=v(()=>e.placeholder??ee.value.placeholder),F=[],I=j(new Map),L=v(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function R(t){let n=e.remote,{value:r}=I,{value:i}=D,{value:a}=L,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let te=v(()=>{if(e.multiple){let{value:e}=f;return Array.isArray(e)?R(e):[]}return null}),ne=v(()=>{let{value:t}=f;return!e.multiple&&!Array.isArray(t)?t===null?null:R([t])[0]||null:null}),z=i(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:s?.value?.Select?.size||`medium`}}),{mergedSizeRef:B,mergedDisabledRef:V,mergedStatusRef:H}=z;function U(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=z;r&&m(r,t,n),a&&m(a,t,n),i&&m(i,t,n),u.value=t,o(),s()}function W(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=z;n&&m(n,t),r()}function G(){let{onClear:t}=e;t&&m(t)}function K(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=z;n&&m(n,t),i(),r&&Z()}function q(t){let{onSearch:n}=e;n&&m(n,t)}function J(t){let{onScroll:n}=e;n&&m(n,t)}function Y(){let{remote:t,multiple:n}=e;if(t){let{value:t}=I;if(n){let{valueField:n}=e;te.value?.forEach(e=>{t.set(e[n],e)})}else{let n=ne.value;n&&t.set(n[e.valueField],n)}}}function X(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&m(n,t),r&&m(r,t),O.value=t}function Z(){V.value||(X(!0),O.value=!0,e.filterable&&Pe())}function Q(){X(!1)}function ae(){h.value=``,y.value=F}let oe=j(!1);function le(){e.filterable&&(oe.value=!0)}function ue(){e.filterable&&(oe.value=!1,k.value||ae())}function de(){V.value||(k.value?e.filterable?Pe():Q():Z())}function fe(e){N.value?.selfRef?.contains(e.relatedTarget)||(p.value=!1,W(e),Q())}function pe(e){K(e),p.value=!0}function he(){p.value=!0}function ge(e){A.value?.$el.contains(e.relatedTarget)||(p.value=!1,W(e),Q())}function ve(){A.value?.focus(),Q()}function ye(e){k.value&&(A.value?.$el.contains(_e(e))||Q())}function be(t){if(!Array.isArray(t))return[];if(L.value)return Array.from(t);{let{remote:n}=e,{value:r}=D;if(n){let{value:e}=I;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function xe(e){Ce(e.rawNode)}function Ce(t){if(V.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=y,t=e[0]||null;if(t){let e=_.value;e.length?e.push(t):_.value=[t],y.value=F}}if(r&&I.value.set(t[a],t),e.multiple){let e=be(f.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Te(t[a]);~e&&(_.value.splice(e,1),i&&(h.value=``))}}else e.push(t[a]),i&&(h.value=``);U(e,R(e))}else{if(n&&!r){let e=Te(t[a]);~e?_.value=[_.value[e]]:_.value=F}Ne(),Q(),U(t[a],t)}}function Te(t){return _.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){k.value||Z();let{value:n}=t.target;h.value=n;let{tag:r,remote:i}=e;if(q(n),r&&!i){if(!n){y.value=F;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;g.value.some(e=>e[i]===r[i]||e[a]===r[a])||_.value.some(e=>e[i]===r[i]||e[a]===r[a])?y.value=F:y.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Q(),r&&!i&&a&&(_.value=F),G(),n?U([],[]):U(null,null)}function Ae(e){!se(e,`action`)&&!se(e,`empty`)&&!se(e,`header`)&&e.preventDefault()}function je(e){J(e)}function Me(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!A.value?.isComposing){if(k.value){let t=N.value?.getPendingTmNode();t?xe(t):e.filterable||(Q(),Ne())}else if(Z(),e.tag&&oe.value){let t=y.value[0];if(t){let n=t[e.valueField],{value:r}=f;e.multiple&&Array.isArray(r)&&r.includes(n)||Ce(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;k.value&&N.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;k.value?N.value?.next():Z();break;case`Escape`:k.value&&(ke(t),Q()),A.value?.focus()}}function Ne(){A.value?.focus()}function Pe(){A.value?.focusInput()}function Fe(){k.value&&M.value?.syncPosition()}Y(),re(S(e,`options`),Y);let Ie={focus:()=>{A.value?.focus()},focusInput:()=>{A.value?.focusInput()},blur:()=>{A.value?.blur()},blurInput:()=>{A.value?.blurInput()}},Le=v(()=>{let{self:{menuBoxShadow:e}}=l.value;return{"--n-menu-box-shadow":e}}),Re=a?w(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:H,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:E,isMounted:b(),triggerRef:A,menuRef:N,pattern:h,uncontrolledShow:O,mergedShow:k,adjustedTo:ce(e),uncontrolledValue:u,mergedValue:f,followerRef:M,localizedPlaceholder:P,selectedOption:ne,selectedOptions:te,mergedSize:B,mergedDisabled:V,focused:p,activeWithoutMenuOpen:oe,inlineThemeDisabled:a,onTriggerInputFocus:le,onTriggerInputBlur:ue,handleTriggerOrMenuResize:Fe,handleMenuFocus:he,handleMenuBlur:ge,handleMenuTabOut:ve,handleTriggerClick:de,handleToggle:xe,handleDeleteOption:Ce,handlePatternInput:Ee,handleClear:Oe,handleTriggerBlur:fe,handleTriggerFocus:pe,handleKeydown:Me,handleMenuAfterLeave:ae,handleMenuClickOutside:ye,handleMenuScroll:je,handleMenuKeydown:Me,handleMenuMousedown:Ae,mergedTheme:l,cssVars:a?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return k(),g(`div`,{class:Y(`${this.mergedClsPrefix}-select`)},[u(ae,null,{_:1,default:P(()=>[(k(),t(pe,null,{_:1,default:P(()=>(k(),t(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:P(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(k(),t(ue,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===ce.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:P(()=>(k(),t(A,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:P(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),F((k(),t(pt,l(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:P(()=>[this.$slots.empty?.()]),header:P(()=>[this.$slots.header?.()]),action:P(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[ee,this.mergedShow],[Ee,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Ee,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};