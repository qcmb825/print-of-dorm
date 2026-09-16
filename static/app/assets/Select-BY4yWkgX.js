import{A as e,Bn as t,Cn as n,Ct as r,D as i,Dn as a,Et as o,F as s,Fn as c,G as l,Gn as u,H as d,Hn as f,J as p,Kn as m,L as h,Ln as g,N as _,On as v,Pn as y,Qn as b,R as x,S,Tr as C,V as w,Vn as T,Wn as E,Xn as D,Yn as O,_t as k,an as A,br as j,cn as M,dn as N,gn as P,gt as F,hr as I,ht as L,jn as R,k as z,kn as B,kt as ee,ln as V,mt as te,nr as H,on as U,or as ne,rr as W,un as G,vt as K,xt as q,yn as J,yt as Y,z as X,zn as Z}from"./endpoints-DguQVVk7.js";import{n as re,t as ie}from"./Empty-BFjxMWo5.js";import{c as Q,d as ae,f as oe,l as se,n as ce,o as le,p as ue,r as de,s as fe,t as pe,u as me}from"./create-wvpIv_n8.js";import{i as he,l as ge,o as _e,r as ve,t as ye}from"./Scrollbar-DSXt8xuo.js";import{n as be,r as xe,t as Se}from"./cssr-BzPMyp1o.js";import{t as Ce}from"./use-merged-state-DzXhUbEL.js";import{n as we}from"./Input-B9tzuA0A.js";import{$ as Te,A as Ee,B as De,F as Oe,I as ke,Y as Ae,ft as je,pt as Me,q as Ne,z as Pe}from"./index-DwEf3xIY.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=I(0),i=I(0),o=a(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=X(()=>{let e=o.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),c=e=>{let t=o.value;return t===null?0:t.sum(e)},l=X(()=>{let t=o.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return D(Ve,{startIndexRef:s,endIndexRef:l,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:c}),{listWidthRef:r,scrollLeftRef:i}}var Ue=c({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=Z(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=Se(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Se(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Se(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=c({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=r();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:be,ssr:t}),m(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&x({key:n}):x({index:t})});let n=!1,i=!1;f(()=>{if(n=!1,!i){i=!0;return}x({top:v.value,left:c.value})}),u(()=>{n=!0,i||=!0});let o=X(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),s=a(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:c,listWidthRef:l}=He({columnsRef:j(e,`columns`),renderColRef:j(e,`renderCol`),renderItemWithColsRef:j(e,`renderItemWithCols`)}),d=I(null),p=I(void 0),h=new Map,g=a(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=h.get(n);a!==void 0&&i.add(t,a)}),i}),_=I(0),v=I(0),y=X(()=>Math.max(g.value.getBound(v.value-te(e.paddingTop))-1,0)),b=a(()=>{let{value:t}=p;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=y.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),x=(e,t)=>{if(typeof e==`number`){T(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:o,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)T(n,r,c);else if(i!==void 0)w(i,c,l);else if(a!==void 0){let e=s.value.get(a);e!==void 0&&w(e,c,l)}else o===`bottom`?T(0,2**53-1,c):o===`top`&&T(0,0,c)},S,C=null;function w(t,n,r){let i=d.value;if(i==null)return;let{value:a}=g,o=a.sum(t)+te(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{S=t,C!==null&&window.clearTimeout(C),C=window.setTimeout(()=>{S=void 0,C=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function T(e,t,n){d.value?.scrollTo({left:e,top:t,behavior:n})}function E(t,r){if(n||e.ignoreItemResize||P(r.target))return;let{value:i}=g,a=s.value.get(t),o=i.get(a),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===o)return;c-e.itemSize===0?h.delete(t):h.set(t,c-e.itemSize);let l=c-o;if(l===0)return;i.add(a,l);let u=d.value;if(u!=null){if(S===void 0){let e=i.sum(a);u.scrollTop>e&&u.scrollBy(0,l)}else(a<S||a===S&&c+i.sum(a)>u.scrollTop+u.offsetHeight)&&u.scrollBy(0,l);N()}_.value++}let D=!Re(),O=!1;function k(t){var n;(n=e.onScroll)==null||n.call(e,t),(!D||!O)&&N()}function A(t){var n;if((n=e.onWheel)==null||n.call(e,t),D){let e=d.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),N(),O=!0,ue(()=>{O=!1})}}}function M(t){if(n||P(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===p.value)return}else if(t.contentRect.height===p.value&&t.contentRect.width===l.value)return;p.value=t.contentRect.height,l.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function N(){let{value:e}=d;e!=null&&(v.value=e.scrollTop,c.value=e.scrollLeft)}function P(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:p,listStyle:{overflow:`auto`},keyToIndex:s,itemsStyle:a(()=>{let{itemResizable:t}=e,n=F(g.value.sum());return _.value,[e.itemsStyle,{boxSizing:`content-box`,width:F(o.value),height:t?``:n,minHeight:t?n:``,paddingTop:F(e.paddingTop),paddingBottom:F(e.paddingBottom)}]}),visibleItemsStyle:a(()=>(_.value,{transform:`translateY(${F(g.value.sum(y.value))})`})),viewportItems:b,listElRef:d,itemsElRef:I(null),scrollTo:x,handleListResize:M,handleListScroll:k,handleListWheel:A,handleItemResize:E}},render(){let{itemResizable:e,keyField:n,keyToIndex:r,visibleItemsTag:i}=this;return g(ve,{onResize:this.handleListResize},{default:()=>{var a;return g(`div`,t(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(a=this.$slots).empty?.call(a):g(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[g(i,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:t,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[n],s=r.get(o),c=t==null?void 0:g(Ue,{index:s,item:a}),l=i==null?void 0:g(Ue,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?g(ve,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Ke=Se(`[v-hidden]`,{display:`none!important`}),qe=c({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=I(null),i=I(null);function a(r){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?i.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(r.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let o=r();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:be,ssr:o}),m(()=>a({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:i,sync:a}},render(){let{$slots:e}=this;return T(()=>this.sync({showAllItemsBeforeCalculate:!1})),g(`div`,{class:`v-overflow`,ref:`selfRef`},[b(e,`default`),e.counter?e.counter():g(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...Ae,closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:_,opacityDisabled:d,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${p(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:p(i,{alpha:.12}),colorBorderedPrimary:p(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:p(i,{alpha:.12}),closeColorPressedPrimary:p(i,{alpha:.18}),borderInfo:`1px solid ${p(a,{alpha:.3})}`,textColorInfo:a,colorInfo:p(a,{alpha:.12}),colorBorderedInfo:p(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:p(a,{alpha:.12}),closeColorPressedInfo:p(a,{alpha:.18}),borderSuccess:`1px solid ${p(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:p(o,{alpha:.12}),colorBorderedSuccess:p(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:p(o,{alpha:.12}),closeColorPressedSuccess:p(o,{alpha:.18}),borderWarning:`1px solid ${p(s,{alpha:.35})}`,textColorWarning:s,colorWarning:p(s,{alpha:.15}),colorBorderedWarning:p(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:p(s,{alpha:.12}),closeColorPressedWarning:p(s,{alpha:.18}),borderError:`1px solid ${p(c,{alpha:.23})}`,textColorError:c,colorError:p(c,{alpha:.1}),colorBorderedError:p(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:p(c,{alpha:.12}),closeColorPressedError:p(c,{alpha:.18})}}var Ye={name:`Tag`,common:l,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=U(`tag`,`
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
`,[V(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),M(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),M(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),M(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),M(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),V(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[M(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),M(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),V(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),V(`icon, avatar`,[V(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),V(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),V(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[G(`disabled`,[A(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[G(`checked`,`color: var(--n-text-color-hover-checkable);`)]),A(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[G(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),V(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[G(`disabled`,[A(`&:hover`,`background-color: var(--n-color-checked-hover);`),A(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...w.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=ee(`n-tag`),tt=c({name:`Tag`,props:$e,slots:Object,setup(t){let n=I(null),{mergedBorderedRef:r,mergedClsPrefixRef:i,inlineThemeDisabled:s,mergedRtlRef:c,mergedComponentPropsRef:l}=o(t),u=a(()=>t.size||l?.value?.Tag?.size||`medium`),f=w(`Tag`,`-tag`,Ze,Ye,t,i);D(et,{roundRef:j(t,`round`)});function p(){if(!t.disabled&&t.checkable){let{checked:e,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=t;r&&r(!e),i&&i(!e),n&&n(!e)}}function m(e){if(t.triggerClickOnClose||e.stopPropagation(),!t.disabled){let{onClose:n}=t;n&&h(n,e)}}let g={setTextContent(e){let{value:t}=n;t&&(t.textContent=e)}},_=e(`Tag`,c,i),v=a(()=>{let{type:e,color:{color:n,textColor:i}={}}=t,a=u.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:d,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[N(`colorBordered`,e)]:T,[N(`closeSize`,a)]:E,[N(`closeIconSize`,a)]:D,[N(`fontSize`,a)]:O,[N(`height`,a)]:k,[N(`color`,e)]:A,[N(`textColor`,e)]:j,[N(`border`,e)]:M,[N(`closeIconColor`,e)]:P,[N(`closeIconColorHover`,e)]:F,[N(`closeIconColorPressed`,e)]:I,[N(`closeColorHover`,e)]:R,[N(`closeColorPressed`,e)]:z}}=f.value,B=L(c);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":M,"--n-close-icon-size":D,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":C,"--n-close-icon-color":P,"--n-close-icon-color-hover":F,"--n-close-icon-color-pressed":I,"--n-close-icon-color-disabled":P,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":E,"--n-color":n||(r.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":d,"--n-padding":s,"--n-text-color":i||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),y=s?d(`tag`,a(()=>{let e=``,{type:n,color:{color:i,textColor:a}={}}=t;return e+=n[0],e+=u.value[0],i&&(e+=`a${z(i)}`),a&&(e+=`b${z(a)}`),r.value&&(e+=`c`),e}),v,t):void 0;return{...g,rtlEnabled:_,mergedClsPrefix:i,contentRef:n,mergedBordered:r,handleClick:p,handleCloseClick:m,cssVars:s?void 0:v,themeClass:y?.themeClass,onRender:y?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:n,color:{borderColor:r}={},round:i,onRender:a,$slots:o}=this;a?.();let c=s(o.avatar,t=>t&&(O(),R(`div`,{class:K(`${e}-tag__avatar`)},[q(()=>t)],2))),l=s(o.icon,t=>t&&(O(),R(`div`,{class:K(`${e}-tag__icon`)},[q(()=>t)],2)));return O(),R(`div`,{class:K([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:i,[`${e}-tag--avatar`]:c,[`${e}-tag--icon`]:l,[`${e}-tag--closable`]:n}]),style:C(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[q(()=>l||c),v(`span`,{class:K(`${e}-tag__content`),ref:`contentRef`},[q(()=>this.$slots.default?.())],2),!this.checkable&&n?(O(),B(Ne,{key:0,clsPrefix:e,class:K(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:i,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):q(()=>null),!this.checkable&&this.mergedBordered?(O(),R(`div`,{key:2,class:K(`${e}-tag__border`),style:C({borderColor:r})},null,6)):q(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(m(()=>{let{value:n}=e;n&&he.registerHandler(n,t)}),H(e,(e,t)=>{t&&he.unregisterHandler(t)},{deep:!1}),E(()=>{let{value:t}=e;t&&he.unregisterHandler(t)}))}var it=c({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=k(`d16ead82505dc285`);return O(),R(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=c({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=Z(ae);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:n,renderOption:r,nodeProps:i,tmNode:{rawNode:a}}=this,o=i?.(a),s=n?n(a,!1):De(a[this.labelField],a,!1),c=(O(),R(`div`,t(o,{class:[`${e}-base-select-group-header`,o?.class]}),[q(()=>s)],16));return a.render?a.render({node:c,option:a}):r?r({node:c,option:a,selected:!1}):c}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=c({name:`Checkmark`,render(){return(()=>{let e=k(`3c84eac8ae4e1f96`);return e[0]||=v(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[v(`g`,{fill:`none`},[v(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return O(),B(P,{name:`fade-in-scale-up-transition`},{default:()=>e?(O(),B(Me,{key:1,clsPrefix:t,class:K(`${t}-base-select-option__check`)},{default:()=>g(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=c({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:f}=Z(ae),p=X(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function m(t){let{tmNode:n}=e;n.disabled||d(t,n)}function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e,{value:r}=p;n.disabled||r||f(t,n)}return{multiple:r,isGrouped:X(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:p,isSelected:X(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:g,handleMouseEnter:h,handleClick:m}},render(){let{clsPrefix:e,tmNode:{rawNode:n},isSelected:r,isPending:i,isGrouped:a,showCheckmark:o,nodeProps:s,renderOption:c,renderLabel:l,handleClick:u,handleMouseEnter:d,handleMouseMove:f}=this,p=lt(r,e),m=l?[l(n,r),o&&p]:[De(n[this.labelField],n,r),o&&p],h=s?.(n),g=(O(),R(`div`,t(h,{class:[`${e}-base-select-option`,n.class,h?.class,{[`${e}-base-select-option--disabled`]:n.disabled,[`${e}-base-select-option--selected`]:r,[`${e}-base-select-option--grouped`]:a,[`${e}-base-select-option--pending`]:i,[`${e}-base-select-option--show-checkmark`]:o}],style:[h?.style||``,n.style||``],onClick:ot([u,h?.onClick]),onMouseenter:ot([d,h?.onMouseenter]),onMousemove:ot([f,h?.onMousemove])}),[v(`div`,{class:K(`${e}-base-select-option__content`)},[q(()=>m)],2)],16,ct));return n.render?n.render({node:g,option:n,selected:r}):c?c({node:g,option:n,selected:r}):g}}),dt=U(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[U(`scrollbar`,`
 max-height: var(--n-height);
 `),U(`virtual-list`,`
 max-height: var(--n-height);
 `),U(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[M(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),U(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),U(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),M(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),M(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),M(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),M(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),U(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),U(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[V(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),A(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),A(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),V(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),V(`pending`,[A(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),V(`selected`,`
 color: var(--n-option-text-color-active);
 `,[A(`&::before`,`
 background-color: var(--n-option-color-active);
 `),V(`pending`,[A(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),V(`disabled`,`
 cursor: not-allowed;
 `,[G(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),V(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),M(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Pe({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=c({name:`InternalSelectMenu`,props:{...w.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:i}=o(t),s=e(`InternalSelectMenu`,r,n),c=w(`InternalSelectMenu`,`-internal-select-menu`,dt,je,t,j(t,`clsPrefix`)),l=I(null),u=I(null),f=I(null),p=a(()=>t.treeMate.getFlattenedNodes()),h=a(()=>ce(p.value)),g=I(null);function _(){let{treeMate:e}=t,n=null,{value:r}=t;r===null?n=e.getFirstAvailableNode():(n=t.multiple?e.getNode((r||[])[(r||[]).length-1]):e.getNode(r),(!n||n.disabled)&&(n=e.getFirstAvailableNode())),W(n||null)}function v(){let{value:e}=g;e&&!t.treeMate.getNode(e.key)&&(g.value=null)}let y;H(()=>t.show,e=>{e?y=H(()=>t.treeMate,()=>{t.resetMenuOnOptionsChange?(t.autoPending?_():v(),T(G)):v()},{immediate:!0}):y?.()},{immediate:!0}),E(()=>{y?.()});let b=a(()=>te(c.value.self[N(`optionHeight`,t.size)])),x=a(()=>L(c.value.self[N(`padding`,t.size)])),S=a(()=>t.multiple&&Array.isArray(t.value)?new Set(t.value):new Set),C=a(()=>{let e=p.value;return e&&e.length===0}),O=a(()=>i?.value?.Select?.renderEmpty);function k(e){let{onToggle:n}=t;n&&n(e)}function A(e){let{onScroll:n}=t;n&&n(e)}function M(e){f.value?.sync(),A(e)}function P(){f.value?.sync()}function F(){let{value:e}=g;return e||null}function R(e,t){t.disabled||W(t,!1)}function z(e,t){t.disabled||k(t)}function B(e){oe(e,`action`)||t.onKeyup?.(e)}function ee(e){oe(e,`action`)||t.onKeydown?.(e)}function V(e){t.onMousedown?.(e),!t.focusable&&e.preventDefault()}function U(){let{value:e}=g;e&&W(e.getNext({loop:!0}),!0)}function ne(){let{value:e}=g;e&&W(e.getPrev({loop:!0}),!0)}function W(e,t=!1){g.value=e,t&&G()}function G(){let e=g.value;if(!e)return;let n=h.value(e.key);n!==null&&(t.virtualScroll?u.value?.scrollTo({index:n}):f.value?.scrollTo({index:n,elSize:b.value}))}function K(e){l.value?.contains(e.target)&&t.onFocus?.(e)}function q(e){l.value?.contains(e.relatedTarget)||t.onBlur?.(e)}D(ae,{handleOptionMouseEnter:R,handleOptionClick:z,valueSetRef:S,pendingTmNodeRef:g,nodePropsRef:j(t,`nodeProps`),showCheckmarkRef:j(t,`showCheckmark`),multipleRef:j(t,`multiple`),valueRef:j(t,`value`),renderLabelRef:j(t,`renderLabel`),renderOptionRef:j(t,`renderOption`),labelFieldRef:j(t,`labelField`),valueFieldRef:j(t,`valueField`)}),D(me,l),m(()=>{let{value:e}=f;e&&e.sync()});let J=a(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:o,actionDividerColor:s,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[N(`optionFontSize`,e)]:x,[N(`optionHeight`,e)]:S,[N(`optionPadding`,e)]:C}}=c.value;return{"--n-height":r,"--n-action-divider-color":s,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":o,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":L(C,`left`),"--n-option-padding-right":L(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:Y}=t,X=Y?d(`internal-select-menu`,a(()=>t.size[0]),J,t):void 0,Z={selfRef:l,next:U,prev:ne,getPendingTmNode:F};return rt(l,t.onResize),{mergedTheme:c,mergedClsPrefix:n,rtlEnabled:s,virtualListRef:u,scrollbarRef:f,itemSize:b,padding:x,flattenedNodes:p,empty:C,mergedRenderEmpty:O,virtualListContainer(){let{value:e}=u;return e?.listElRef},virtualListContent(){let{value:e}=u;return e?.itemsElRef},doScroll:A,handleFocusin:K,handleFocusout:q,handleKeyUp:B,handleKeyDown:ee,handleMouseDown:V,handleVirtualListResize:P,handleVirtualListScroll:M,cssVars:Y?void 0:J,themeClass:X?.themeClass,onRender:X?.onRender,...Z}},render(){let{$slots:e,virtualScroll:r,clsPrefix:i,mergedTheme:a,themeClass:o,onRender:c}=this;return c?.(),O(),R(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:K([`${i}-base-select-menu`,`${i}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${i}-base-select-menu--rtl`,o,this.multiple&&`${i}-base-select-menu--multiple`]),style:C(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[q(()=>s(e.header,e=>e&&(O(),R(`div`,{class:K(`${i}-base-select-menu__header`),"data-header":!0,key:`header`},[q(()=>e)],2)))),this.loading?(O(),R(`div`,{key:0,class:K(`${i}-base-select-menu__loading`)},[(O(),B(S,{clsPrefix:i,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(O(),R(n,{key:1},[this.empty?(O(),R(`div`,{key:1,class:K(`${i}-base-select-menu__empty`),"data-empty":!0},[q(()=>_(e.empty,()=>[this.mergedRenderEmpty?.()||(O(),B(ie,{theme:a.peers.Empty,themeOverrides:a.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(O(),B(ye,t({key:0,ref:`scrollbarRef`,theme:a.peers.Scrollbar,themeOverrides:a.peerOverrides.Scrollbar,scrollable:this.scrollable,container:r?this.virtualListContainer:void 0,content:r?this.virtualListContent:void 0,onScroll:r?void 0:this.doScroll},this.scrollbarProps),{default:()=>r?(O(),B(Ge,{key:1,ref:`virtualListRef`,class:K(`${i}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(O(),B(at,{key:e.key,clsPrefix:i,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(O(),B(ut,{clsPrefix:i,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(O(),R(`div`,{key:4,class:K(`${i}-base-select-menu-option-wrapper`),style:C({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[q(()=>this.flattenedNodes.map(e=>e.isGroup?(O(),B(at,{key:e.key,clsPrefix:i,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(O(),B(ut,{clsPrefix:i,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),q(()=>s(e.action,e=>e&&[(O(),R(`div`,{class:K(`${i}-base-select-menu__action`),"data-action":!0,key:`action`},[q(()=>e)],2)),(O(),B(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=A([U(`base-selection`,`
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
 `,[U(`base-loading`,`
 color: var(--n-loading-color);
 `),U(`base-selection-tags`,`min-height: var(--n-height);`),M(`border, state-border`,`
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
 `),M(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),U(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[M(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),U(`base-selection-overlay`,`
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
 `,[M(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),U(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[M(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),U(`base-selection-tags`,`
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
 `),U(`base-selection-label`,`
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
 `,[U(`base-selection-input`,`
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
 `,[M(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),M(`render-label`,`
 color: var(--n-text-color);
 `)]),G(`disabled`,[A(`&:hover`,[M(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),V(`focus`,[M(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),V(`active`,[M(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),U(`base-selection-label`,`background-color: var(--n-color-active);`),U(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),V(`disabled`,`cursor: not-allowed;`,[M(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),U(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[U(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),M(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),U(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),U(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),U(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[M(`input`,`
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
 `),M(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>V(`${e}-status`,[M(`state-border`,`border: var(--n-border-${e});`),G(`disabled`,[A(`&:hover`,[M(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),V(`active`,[M(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),U(`base-selection-label`,`background-color: var(--n-color-active-${e});`),U(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),V(`focus`,[M(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),U(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),U(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[A(`&:last-child`,`padding-right: 0;`),U(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[M(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=c({name:`InternalSelection`,props:{...w.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r}=o(t),i=e(`InternalSelection`,r,n),s=I(null),c=I(null),l=I(null),u=I(null),f=I(null),p=I(null),h=I(null),g=I(null),_=I(null),v=I(null),y=I(!1),b=I(!1),x=I(!1),S=w(`InternalSelection`,`-internal-selection`,bt,ke,t,j(t,`clsPrefix`)),C=a(()=>t.clearable&&!t.disabled&&(x.value||t.active)),E=a(()=>t.selectedOption?t.renderTag?t.renderTag({option:t.selectedOption,handleClose:()=>{}}):t.renderLabel?t.renderLabel(t.selectedOption,!0):De(t.selectedOption[t.labelField],t.selectedOption,!0):t.placeholder),D=a(()=>{let e=t.selectedOption;if(e)return e[t.labelField]}),O=a(()=>t.multiple?!!(Array.isArray(t.selectedOptions)&&t.selectedOptions.length):t.selectedOption!==null);function k(){let{value:e}=s;if(e){let{value:n}=c;n&&(n.style.width=`${e.offsetWidth}px`,t.maxTagCount!==`responsive`&&_.value?.sync({showAllItemsBeforeCalculate:!1}))}}function A(){let{value:e}=v;e&&(e.style.display=`none`)}function M(){let{value:e}=v;e&&(e.style.display=`inline-block`)}H(j(t,`active`),e=>{e||A()}),H(j(t,`pattern`),()=>{t.multiple&&T(k)});function P(e){let{onFocus:n}=t;n&&n(e)}function F(e){let{onBlur:n}=t;n&&n(e)}function R(e){let{onDeleteOption:n}=t;n&&n(e)}function z(e){let{onClear:n}=t;n&&n(e)}function B(e){let{onPatternInput:n}=t;n&&n(e)}function ee(e){(!e.relatedTarget||!l.value?.contains(e.relatedTarget))&&P(e)}function V(e){l.value?.contains(e.relatedTarget)||F(e)}function te(e){z(e)}function U(){x.value=!0}function ne(){x.value=!1}function G(e){t.active&&t.filterable&&e.target!==c.value&&e.preventDefault()}function K(e){R(e)}let q=I(!1);function J(e){if(e.key===`Backspace`&&!q.value&&!t.pattern.length){let{selectedOptions:e}=t;e?.length&&K(e[e.length-1])}}let Y=null;function X(e){let{value:n}=s;n&&(n.textContent=e.target.value,k()),t.ignoreComposition&&q.value?Y=e:B(e)}function Z(){q.value=!0}function re(){q.value=!1,t.ignoreComposition&&B(Y),Y=null}function ie(e){b.value=!0,t.onPatternFocus?.(e)}function Q(e){b.value=!1,t.onPatternBlur?.(e)}function ae(){if(t.filterable)b.value=!1,p.value?.blur(),c.value?.blur();else if(t.multiple){let{value:e}=u;e?.blur()}else{let{value:e}=f;e?.blur()}}function oe(){t.filterable?(b.value=!1,p.value?.focus()):t.multiple?u.value?.focus():f.value?.focus()}function se(){let{value:e}=c;e&&(M(),e.focus())}function ce(){let{value:e}=c;e&&e.blur()}function le(e){let{value:t}=h;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=g;return e}function de(){return c.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){t.active||(pe(),fe=window.setTimeout(()=>{O.value&&(y.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),y.value=!1)}H(O,e=>{e||(y.value=!1)}),m(()=>{W(()=>{let e=p.value;e&&(t.disabled?e.removeAttribute(`tabindex`):e.tabIndex=b.value?-1:0)})}),rt(l,t.onResize);let{inlineThemeDisabled:_e}=t,ve=a(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:C,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:P,colorActiveError:F,boxShadowFocusError:I,boxShadowActiveError:R,boxShadowHoverError:z,borderError:B,borderFocusError:ee,borderHoverError:V,borderActiveError:te,clearColor:H,clearColorHover:U,clearColorPressed:ne,clearSize:W,arrowSize:G,[N(`height`,e)]:K,[N(`fontSize`,e)]:q}}=S.value,J=L(c),Y=L(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":q,"--n-height":K,"--n-padding-single-top":J.top,"--n-padding-multiple-top":Y.top,"--n-padding-single-right":J.right,"--n-padding-multiple-right":Y.right,"--n-padding-single-left":J.left,"--n-padding-multiple-left":Y.left,"--n-padding-single-bottom":J.bottom,"--n-padding-multiple-bottom":Y.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":P,"--n-color-active-error":F,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":R,"--n-box-shadow-hover-error":z,"--n-border-error":B,"--n-border-focus-error":ee,"--n-border-hover-error":V,"--n-border-active-error":te,"--n-clear-size":W,"--n-clear-color":H,"--n-clear-color-hover":U,"--n-clear-color-pressed":ne,"--n-arrow-size":G,"--n-font-weight":r}}),ye=_e?d(`internal-selection`,a(()=>t.size[0]),ve,t):void 0;return{mergedTheme:S,mergedClearable:C,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:b,filterablePlaceholder:E,label:D,selected:O,showTagsPanel:y,isComposing:q,counterRef:h,counterWrapperRef:g,patternInputMirrorRef:s,patternInputRef:c,selfRef:l,multipleElRef:u,singleElRef:f,patternInputWrapperRef:p,overflowRef:_,inputTagElRef:v,handleMouseDown:G,handleFocusin:ee,handleClear:te,handleMouseEnter:U,handleMouseLeave:ne,handleDeleteOption:K,handlePatternKeyDown:J,handlePatternInputInput:X,handlePatternInputBlur:Q,handlePatternInputFocus:ie,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:V,handleCompositionEnd:re,handleCompositionStart:Z,onPopoverUpdateShow:ge,focus:oe,focusInput:se,blur:ae,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:t.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:r,size:i,disabled:a,filterable:o,maxTagCount:s,bordered:c,clsPrefix:l,ellipsisTagPopoverProps:u,onRender:d,renderTag:f,renderLabel:p}=this;d?.();let m=s===`responsive`,h=typeof s==`number`,g=m||h,_=(O(),B(_e,null,{default:()=>(O(),B(we,{clsPrefix:l,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),y;if(r){let{labelField:e}=this,r=t=>(O(),R(`div`,{class:K(`${l}-base-selection-tag-wrapper`),key:t.value},[f?(O(),R(n,{key:0},[q(()=>f({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(O(),B(tt,{key:1,size:i,closable:!t.disabled,disabled:a,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>p?p(t,!0):De(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),c=()=>(h?this.selectedOptions.slice(0,s):this.selectedOptions).map(r),d=o?(O(),R(`div`,{class:K(`${l}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[v(`input`,t(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:a,value:this.pattern,autofocus:this.autofocus,class:`${l}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),v(`span`,{ref:`patternInputMirrorRef`,class:K(`${l}-base-selection-input-tag__mirror`)},[q(()=>this.pattern)],2)],2)):null,b=m?()=>(O(),R(`div`,{class:K(`${l}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(O(),B(tt,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:a},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,x;if(h){let e=this.selectedOptions.length-s;e>0&&(x=(t=>(O(),R(`div`,{class:K(`${l}-base-selection-tag-wrapper`),key:`__counter__`},[(O(),B(tt,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:a},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(x))}let S=m?o?(O(),B(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:b,tail:()=>d},1032,[`updateCounter`,`getCounter`,`getTail`])):(O(),B(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:c,counter:b},1032,[`updateCounter`,`getCounter`])):h&&x?c().concat(x):c(),C=g?()=>(O(),R(`div`,{class:K(`${l}-base-selection-popover`)},[m?(O(),R(n,{key:0},[q(()=>c())],64)):(O(),R(n,{key:1},[q(()=>this.selectedOptions.map(r))],64))],2)):void 0,w=g?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...u}:null,T=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(O(),R(`div`,{key:5,class:K(`${l}-base-selection-placeholder ${l}-base-selection-overlay`)},[v(`div`,{class:K(`${l}-base-selection-placeholder__inner`)},[q(()=>this.placeholder)],2)],2)):null,E=o?(O(),R(`div`,{key:6,ref:`patternInputWrapperRef`,class:K(`${l}-base-selection-tags`)},[q(()=>S),m?q(()=>null):(O(),R(n,{key:1},[q(()=>d)],64)),q(()=>_)],2)):(O(),R(`div`,{key:7,ref:`multipleElRef`,class:K(`${l}-base-selection-tags`),tabindex:a?void 0:0},[q(()=>S),q(()=>_)],10,St));y=(e=>(O(),R(n,{key:8},[g?(O(),B(de,t({key:0},w,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>E,default:C},1040)):(O(),R(n,{key:1},[q(()=>E)],64)),q(()=>T)],64)))(y)}else if(o){let e=this.pattern||this.isComposing,r=this.active?!e:!this.selected,i=!this.active&&this.selected;y=(e=>(O(),R(`div`,{key:9,ref:`patternInputWrapperRef`,class:K(`${l}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[v(`input`,t(this.inputProps,{ref:`patternInputRef`,class:`${l}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:a,disabled:a,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),i?(O(),R(`div`,{class:K(`${l}-base-selection-label__render-label ${l}-base-selection-overlay`),key:`input`},[v(`div`,{class:K(`${l}-base-selection-overlay__wrapper`)},[f?(O(),R(n,{key:0},[q(()=>f({option:this.selectedOption,handleClose:()=>{}}))],64)):(O(),R(n,{key:1},[p?(O(),R(n,{key:0},[q(()=>p(this.selectedOption,!0))],64)):(O(),R(n,{key:1},[q(()=>De(this.label,this.selectedOption,!0))],64))],64))],2)],2)):q(()=>null),r?(O(),R(`div`,{class:K(`${l}-base-selection-placeholder ${l}-base-selection-overlay`),key:`placeholder`},[v(`div`,{class:K(`${l}-base-selection-overlay__wrapper`)},[q(()=>this.filterablePlaceholder)],2)],2)):q(()=>null),q(()=>_)],10,Ct)))(y)}else y=(e=>(O(),R(`div`,{key:10,ref:`singleElRef`,class:K(`${l}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(O(),R(`div`,{class:K(`${l}-base-selection-placeholder ${l}-base-selection-overlay`),key:`placeholder`},[v(`div`,{class:K(`${l}-base-selection-placeholder__inner`)},[q(()=>this.placeholder)],2)],2)):(O(),R(`div`,{class:K(`${l}-base-selection-input`),title:nt(this.label),key:`input`},[v(`div`,{class:K(`${l}-base-selection-input__content`)},[f?(O(),R(n,{key:0},[q(()=>f({option:this.selectedOption,handleClose:()=>{}}))],64)):(O(),R(n,{key:1},[p?(O(),R(n,{key:0},[q(()=>p(this.selectedOption,!0))],64)):(O(),R(n,{key:1},[q(()=>De(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),q(()=>_)],10,Tt)))(y);return O(),R(`div`,{ref:`selfRef`,class:K([`${l}-base-selection`,this.rtlEnabled&&`${l}-base-selection--rtl`,this.themeClass,e&&`${l}-base-selection--${e}-status`,{[`${l}-base-selection--active`]:this.active,[`${l}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${l}-base-selection--disabled`]:this.disabled,[`${l}-base-selection--multiple`]:this.multiple,[`${l}-base-selection--focus`]:this.focused}]),style:C(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[q(()=>y),c?(O(),R(`div`,{key:0,class:K(`${l}-base-selection__border`)},null,2)):q(()=>null),c?(O(),R(`div`,{key:2,class:K(`${l}-base-selection__state-border`)},null,2)):q(()=>null)],46,Et)}}),Ot=A([U(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),U(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Pe({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...w.props,to:se.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=c({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:s,mergedComponentPropsRef:c}=o(e),l=w(`Select`,`-select`,Ot,Ee,e,t),u=I(e.defaultValue),f=j(e,`value`),p=Ce(f,u),m=I(!1),g=I(``),_=xe(e,[`items`,`options`]),v=I([]),y=I([]),b=a(()=>y.value.concat(v.value).concat(_.value)),S=a(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),C=a(()=>{if(e.remote)return _.value;{let{value:t}=b,{value:n}=g;return!n.length||!e.filterable?t:vt(t,S.value,n,e.childrenField)}}),T=a(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return pe(C.value,r)}),E=a(()=>yt(b.value,e.valueField,e.childrenField)),D=I(!1),O=Ce(j(e,`show`),D),k=I(null),A=I(null),M=I(null),{localeRef:N}=re(`Select`),P=a(()=>e.placeholder??N.value.placeholder),F=[],L=I(new Map),R=a(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function z(t){let n=e.remote,{value:r}=L,{value:i}=E,{value:a}=R,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let B=a(()=>{if(e.multiple){let{value:e}=p;return Array.isArray(e)?z(e):[]}return null}),ee=a(()=>{let{value:t}=p;return!e.multiple&&!Array.isArray(t)?t===null?null:z([t])[0]||null:null}),V=i(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:c?.value?.Select?.size||`medium`}}),{mergedSizeRef:te,mergedDisabledRef:U,mergedStatusRef:ne}=V;function W(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=V;r&&h(r,t,n),a&&h(a,t,n),i&&h(i,t,n),u.value=t,o(),s()}function G(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=V;n&&h(n,t),r()}function K(){let{onClear:t}=e;t&&h(t)}function q(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=V;n&&h(n,t),i(),r&&ie()}function J(t){let{onSearch:n}=e;n&&h(n,t)}function Y(t){let{onScroll:n}=e;n&&h(n,t)}function X(){let{remote:t,multiple:n}=e;if(t){let{value:t}=L;if(n){let{valueField:n}=e;B.value?.forEach(e=>{t.set(e[n],e)})}else{let n=ee.value;n&&t.set(n[e.valueField],n)}}}function Z(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&h(n,t),r&&h(r,t),D.value=t}function ie(){U.value||(Z(!0),D.value=!0,e.filterable&&Pe())}function Q(){Z(!1)}function ae(){g.value=``,y.value=F}let ce=I(!1);function le(){e.filterable&&(ce.value=!0)}function ue(){e.filterable&&(ce.value=!1,O.value||ae())}function de(){U.value||(O.value?e.filterable?Pe():Q():ie())}function fe(e){M.value?.selfRef?.contains(e.relatedTarget)||(m.value=!1,G(e),Q())}function me(e){q(e),m.value=!0}function he(){m.value=!0}function _e(e){k.value?.$el.contains(e.relatedTarget)||(m.value=!1,G(e),Q())}function ve(){k.value?.focus(),Q()}function ye(e){O.value&&(k.value?.$el.contains(ge(e))||Q())}function be(t){if(!Array.isArray(t))return[];if(R.value)return Array.from(t);{let{remote:n}=e,{value:r}=E;if(n){let{value:e}=L;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function Se(e){we(e.rawNode)}function we(t){if(U.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=y,t=e[0]||null;if(t){let e=v.value;e.length?e.push(t):v.value=[t],y.value=F}}if(r&&L.value.set(t[a],t),e.multiple){let e=be(p.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Te(t[a]);~e&&(v.value.splice(e,1),i&&(g.value=``))}}else e.push(t[a]),i&&(g.value=``);W(e,z(e))}else{if(n&&!r){let e=Te(t[a]);~e?v.value=[v.value[e]]:v.value=F}Ne(),Q(),W(t[a],t)}}function Te(t){return v.value.findIndex(n=>n[e.valueField]===t)}function De(t){O.value||ie();let{value:n}=t.target;g.value=n;let{tag:r,remote:i}=e;if(J(n),r&&!i){if(!n){y.value=F;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;_.value.some(e=>e[i]===r[i]||e[a]===r[a])||v.value.some(e=>e[i]===r[i]||e[a]===r[a])?y.value=F:y.value=[r]}}function ke(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Q(),r&&!i&&a&&(v.value=F),K(),n?W([],[]):W(null,null)}function Ae(e){!oe(e,`action`)&&!oe(e,`empty`)&&!oe(e,`header`)&&e.preventDefault()}function je(e){Y(e)}function Me(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!k.value?.isComposing){if(O.value){let t=M.value?.getPendingTmNode();t?Se(t):e.filterable||(Q(),Ne())}else if(ie(),e.tag&&ce.value){let t=y.value[0];if(t){let n=t[e.valueField],{value:r}=p;e.multiple&&Array.isArray(r)&&r.includes(n)||we(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;O.value&&M.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;O.value?M.value?.next():ie();break;case`Escape`:O.value&&(Oe(t),Q()),k.value?.focus()}}function Ne(){k.value?.focus()}function Pe(){k.value?.focusInput()}function Fe(){O.value&&A.value?.syncPosition()}X(),H(j(e,`options`),X);let Ie={focus:()=>{k.value?.focus()},focusInput:()=>{k.value?.focusInput()},blur:()=>{k.value?.blur()},blurInput:()=>{k.value?.blurInput()}},Le=a(()=>{let{self:{menuBoxShadow:e}}=l.value;return{"--n-menu-box-shadow":e}}),Re=s?d(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:ne,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:T,isMounted:x(),triggerRef:k,menuRef:M,pattern:g,uncontrolledShow:D,mergedShow:O,adjustedTo:se(e),uncontrolledValue:u,mergedValue:p,followerRef:A,localizedPlaceholder:P,selectedOption:ee,selectedOptions:B,mergedSize:te,mergedDisabled:U,focused:m,activeWithoutMenuOpen:ce,inlineThemeDisabled:s,onTriggerInputFocus:le,onTriggerInputBlur:ue,handleTriggerOrMenuResize:Fe,handleMenuFocus:he,handleMenuBlur:_e,handleMenuTabOut:ve,handleTriggerClick:de,handleToggle:Se,handleDeleteOption:we,handlePatternInput:De,handleClear:ke,handleTriggerBlur:fe,handleTriggerFocus:me,handleKeydown:Me,handleMenuAfterLeave:ae,handleMenuClickOutside:ye,handleMenuScroll:je,handleMenuKeydown:Me,handleMenuMousedown:Ae,mergedTheme:l,cssVars:s?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return O(),R(`div`,{class:K(`${this.mergedClsPrefix}-select`)},[y(Q,null,{_:1,default:Y(()=>[(O(),B(fe,null,{_:1,default:Y(()=>(O(),B(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:Y(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(O(),B(le,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===se.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:Y(()=>(O(),B(P,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:Y(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),ne((O(),B(pt,t(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:Y(()=>[this.$slots.empty?.()]),header:Y(()=>[this.$slots.header?.()]),action:Y(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[J,this.mergedShow],[Te,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Te,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};