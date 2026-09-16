import{$t as e,Bn as t,C as n,Cn as r,Ct as i,E as a,F as o,Fn as s,H as c,In as l,Kn as u,L as d,N as f,Nn as p,On as m,P as h,Pn as g,R as _,Rn as v,Sn as y,T as b,Tn as x,Un as S,Wn as C,Xn as w,Zn as T,_n as E,_t as D,an as O,bt as k,ct as A,dt as j,en as M,er as N,ft as P,ht as F,in as I,j as L,jn as R,k as z,kn as B,lr as V,lt as ee,mr as H,nn as U,pn as te,pt as W,rn as G,un as ne,ut as K,v as re,xn as q,yr as J,z as ie,zn as ae}from"./endpoints-Bo2NXLxK.js";import{t as oe}from"./use-locale-DuDWdR74.js";import{O as se,a as Y,l as X,n as ce,o as Z,p as le,t as ue}from"./fade-in-scale-up.cssr-OU0FjBQD.js";import{a as de,c as fe,d as pe,f as me,g as he,h as ge,i as _e,m as ve,o as ye,s as be,t as xe,u as Se}from"./Popover-D-j5JW7o.js";import{n as Ce,r as we,t as Te}from"./create-CLOJQO3W.js";import{t as Ee}from"./Empty-Da-1mTMD.js";import{n as De}from"./Input-7zU6OXzS.js";import{F as Oe,J as ke,K as Ae,P as je,R as Q,W as Me,k as Ne,q as Pe}from"./index-DdbODeTB.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=V(0),i=V(0),a=q(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=o(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),c=e=>{let t=a.value;return t===null?0:t.sum(e)},l=o(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return C(Ve,{startIndexRef:s,endIndexRef:l,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:c}),{listWidthRef:r,scrollLeftRef:i}}var Ue=B({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=p(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=de(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[de(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[de(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=B({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let n=D();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:ye,ssr:n}),t(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&y({key:n}):y({index:t})});let r=!1,i=!1;l(()=>{if(r=!1,!i){i=!0;return}y({top:g.value,left:c.value})}),ae(()=>{r=!0,i||=!0});let a=o(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),s=q(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:c,listWidthRef:u}=He({columnsRef:H(e,`columns`),renderColRef:H(e,`renderCol`),renderItemWithColsRef:H(e,`renderItemWithCols`)}),d=V(null),f=V(void 0),p=new Map,m=q(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=p.get(n);a!==void 0&&i.add(t,a)}),i}),h=V(0),g=V(0),_=o(()=>Math.max(m.value.getBound(g.value-A(e.paddingTop))-1,0)),v=q(()=>{let{value:t}=f;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=_.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),y=(e,t)=>{if(typeof e==`number`){C(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:o,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)C(n,r,c);else if(i!==void 0)S(i,c,l);else if(a!==void 0){let e=s.value.get(a);e!==void 0&&S(e,c,l)}else o===`bottom`?C(0,2**53-1,c):o===`top`&&C(0,0,c)},b,x=null;function S(t,n,r){let i=d.value;if(i==null)return;let{value:a}=m,o=a.sum(t)+A(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{b=t,x!==null&&window.clearTimeout(x),x=window.setTimeout(()=>{b=void 0,x=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function C(e,t,n){d.value?.scrollTo({left:e,top:t,behavior:n})}function w(t,n){if(r||e.ignoreItemResize||N(n.target))return;let{value:i}=m,a=s.value.get(t),o=i.get(a),c=n.borderBoxSize?.[0]?.blockSize??n.contentRect.height;if(c===o)return;c-e.itemSize===0?p.delete(t):p.set(t,c-e.itemSize);let l=c-o;if(l===0)return;i.add(a,l);let u=d.value;if(u!=null){if(b===void 0){let e=i.sum(a);u.scrollTop>e&&u.scrollBy(0,l)}else(a<b||a===b&&c+i.sum(a)>u.scrollTop+u.offsetHeight)&&u.scrollBy(0,l);M()}h.value++}let T=!Re(),E=!1;function O(t){var n;(n=e.onScroll)==null||n.call(e,t),(!T||!E)&&M()}function k(t){var n;if((n=e.onWheel)==null||n.call(e,t),T){let e=d.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),M(),E=!0,he(()=>{E=!1})}}}function j(t){if(r||N(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===f.value)return}else if(t.contentRect.height===f.value&&t.contentRect.width===u.value)return;f.value=t.contentRect.height,u.value=t.contentRect.width;let{onResize:n}=e;n!==void 0&&n(t)}function M(){let{value:e}=d;e!=null&&(g.value=e.scrollTop,c.value=e.scrollLeft)}function N(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:f,listStyle:{overflow:`auto`},keyToIndex:s,itemsStyle:q(()=>{let{itemResizable:t}=e,n=K(m.value.sum());return h.value,[e.itemsStyle,{boxSizing:`content-box`,width:K(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:K(e.paddingTop),paddingBottom:K(e.paddingBottom)}]}),visibleItemsStyle:q(()=>(h.value,{transform:`translateY(${K(m.value.sum(_.value))})`})),viewportItems:v,listElRef:d,itemsElRef:V(null),scrollTo:y,handleListResize:j,handleListScroll:O,handleListWheel:k,handleItemResize:w}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return R(Y,{onResize:this.handleListResize},{default:()=>{var i;return R(`div`,g(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):R(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[R(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:R(Ue,{index:s,item:a}),l=i==null?void 0:R(Ue,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?R(Y,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Ke=de(`[v-hidden]`,{display:`none!important`}),qe=B({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:n}){let r=V(null),i=V(null);function a(t){let{value:a}=r,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?i.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(t.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=n.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!n.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let o=D();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:ye,ssr:o}),t(()=>a({showAllItemsBeforeCalculate:!1})),{selfRef:r,counterRef:i,sync:a}},render(){let{$slots:e}=this;return s(()=>this.sync({showAllItemsBeforeCalculate:!1})),R(`div`,{class:`v-overflow`,ref:`selfRef`},[u(e,`default`),e.counter?e.counter():R(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:w,heightMedium:T,closeColorHover:E,closeColorPressed:D,buttonColor2Hover:O,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...Ae,closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:w,heightLarge:T,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:O,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:E,closeColorPressed:D,borderPrimary:`1px solid ${c(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:c(i,{alpha:.12}),colorBorderedPrimary:c(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:c(i,{alpha:.12}),closeColorPressedPrimary:c(i,{alpha:.18}),borderInfo:`1px solid ${c(a,{alpha:.3})}`,textColorInfo:a,colorInfo:c(a,{alpha:.12}),colorBorderedInfo:c(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:c(a,{alpha:.12}),closeColorPressedInfo:c(a,{alpha:.18}),borderSuccess:`1px solid ${c(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:c(o,{alpha:.12}),colorBorderedSuccess:c(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:c(o,{alpha:.12}),closeColorPressedSuccess:c(o,{alpha:.18}),borderWarning:`1px solid ${c(s,{alpha:.35})}`,textColorWarning:s,colorWarning:c(s,{alpha:.15}),colorBorderedWarning:c(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:c(s,{alpha:.12}),closeColorPressedWarning:c(s,{alpha:.18}),borderError:`1px solid ${c(l,{alpha:.23})}`,textColorError:l,colorError:c(l,{alpha:.1}),colorBorderedError:c(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:c(l,{alpha:.12}),closeColorPressedError:c(l,{alpha:.18})}}var Ye={name:`Tag`,common:ie,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=M(`tag`,`
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
 `),U(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),U(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),U(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),U(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),G(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[U(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),U(`avatar`,`
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
 `,[I(`disabled`,[e(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[I(`checked`,`color: var(--n-text-color-hover-checkable);`)]),e(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[I(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),G(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[I(`disabled`,[e(`&:hover`,`background-color: var(--n-color-checked-hover);`),e(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...d.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=i(`n-tag`),tt=B({name:`Tag`,props:$e,slots:Object,setup(e){let t=V(null),{mergedBorderedRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:o,mergedComponentPropsRef:s}=k(e),c=q(()=>e.size||s?.value?.Tag?.size||`medium`),l=d(`Tag`,`-tag`,Ze,Ye,e,r);C(et,{roundRef:H(e,`round`)});function u(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function p(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&f(n,t)}}let m={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},h=a(`Tag`,o,r),g=q(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=c.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:u,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[O(`colorBordered`,t)]:T,[O(`closeSize`,a)]:E,[O(`closeIconSize`,a)]:D,[O(`fontSize`,a)]:k,[O(`height`,a)]:A,[O(`color`,t)]:j,[O(`textColor`,t)]:M,[O(`border`,t)]:N,[O(`closeIconColor`,t)]:P,[O(`closeIconColorHover`,t)]:F,[O(`closeIconColorPressed`,t)]:I,[O(`closeColorHover`,t)]:L,[O(`closeColorPressed`,t)]:R}}=l.value,z=ee(u);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${A} - 8px)`,"--n-bezier":o,"--n-border-radius":d,"--n-border":N,"--n-close-icon-size":D,"--n-close-color-pressed":R,"--n-close-color-hover":L,"--n-close-border-radius":C,"--n-close-icon-color":P,"--n-close-icon-color-hover":F,"--n-close-icon-color-pressed":I,"--n-close-icon-color-disabled":P,"--n-close-margin-top":z.top,"--n-close-margin-right":z.right,"--n-close-margin-bottom":z.bottom,"--n-close-margin-left":z.left,"--n-close-size":E,"--n-color":r||(n.value?T:j),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":k,"--n-height":A,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||M,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),v=i?_(`tag`,q(()=>{let t=``,{type:r,color:{color:i,textColor:a}={}}=e;return t+=r[0],t+=c.value[0],i&&(t+=`a${b(i)}`),a&&(t+=`b${b(a)}`),n.value&&(t+=`c`),t}),g,e):void 0;return{...m,rtlEnabled:h,mergedClsPrefix:r,contentRef:t,mergedBordered:n,handleClick:u,handleCloseClick:p,cssVars:i?void 0:g,themeClass:v?.themeClass,onRender:v?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:n,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let c=L(s.avatar,t=>t&&(S(),x(`div`,{class:P(`${e}-tag__avatar`)},[F(()=>t)],2))),l=L(s.icon,t=>t&&(S(),x(`div`,{class:P(`${e}-tag__icon`)},[F(()=>t)],2)));return S(),x(`div`,{class:P([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:a,[`${e}-tag--avatar`]:c,[`${e}-tag--icon`]:l,[`${e}-tag--closable`]:n}]),style:J(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[F(()=>l||c),y(`span`,{class:P(`${e}-tag__content`),ref:`contentRef`},[F(()=>this.$slots.default?.())],2),!this.checkable&&n?(S(),r(Me,{key:0,clsPrefix:e,class:P(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):F(()=>null),!this.checkable&&this.mergedBordered?(S(),x(`div`,{key:2,class:P(`${e}-tag__border`),style:J({borderColor:i})},null,6)):F(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,n){n&&(t(()=>{let{value:t}=e;t&&Z.registerHandler(t,n)}),w(e,(e,t)=>{t&&Z.unregisterHandler(t)},{deep:!1}),v(()=>{let{value:t}=e;t&&Z.unregisterHandler(t)}))}var it=B({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=j(`d16ead82505dc285`);return S(),x(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=B({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=p(ge);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):Q(i[this.labelField],i,!1),s=(S(),x(`div`,g(a,{class:[`${e}-base-select-group-header`,a?.class]}),[F(()=>o)],16));return i.render?i.render({node:s,option:i}):n?n({node:s,option:i,selected:!1}):s}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=B({name:`Checkmark`,render(){return(()=>{let e=j(`3c84eac8ae4e1f96`);return e[0]||=y(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[y(`g`,{fill:`none`},[y(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return S(),r(ne,{name:`fade-in-scale-up-transition`},{default:()=>e?(S(),r(ke,{key:1,clsPrefix:t,class:P(`${t}-base-select-option__check`)},{default:()=>R(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=B({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:s,labelFieldRef:c,valueFieldRef:l,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:m}=p(ge),h=o(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function g(t){let{tmNode:n}=e;n.disabled||f(t,n)}function _(t){let{tmNode:n}=e;n.disabled||m(t,n)}function v(t){let{tmNode:n}=e,{value:r}=h;n.disabled||r||m(t,n)}return{multiple:r,isGrouped:o(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:h,isSelected:o(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[l.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:c,renderLabel:a,renderOption:s,handleMouseMove:v,handleMouseEnter:_,handleClick:g}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:s,renderLabel:c,handleClick:l,handleMouseEnter:u,handleMouseMove:d}=this,f=lt(n,e),p=c?[c(t,n),a&&f]:[Q(t[this.labelField],t,n),a&&f],m=o?.(t),h=(S(),x(`div`,g(m,{class:[`${e}-base-select-option`,t.class,m?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[m?.style||``,t.style||``],onClick:ot([l,m?.onClick]),onMouseenter:ot([u,m?.onMouseenter]),onMousemove:ot([d,m?.onMousemove])}),[y(`div`,{class:P(`${e}-base-select-option__content`)},[F(()=>p)],2)],16,ct));return t.render?t.render({node:h,option:t,selected:n}):s?s({node:h,option:t,selected:n}):h}}),dt=M(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[M(`scrollbar`,`
 max-height: var(--n-height);
 `),M(`virtual-list`,`
 max-height: var(--n-height);
 `),M(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[U(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),M(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),M(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),U(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),U(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),U(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),U(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),M(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),M(`base-select-option`,`
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
 `),e(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),e(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),G(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),G(`pending`,[e(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),G(`selected`,`
 color: var(--n-option-text-color-active);
 `,[e(`&::before`,`
 background-color: var(--n-option-color-active);
 `),G(`pending`,[e(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),G(`disabled`,`
 cursor: not-allowed;
 `,[I(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),G(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),U(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[ue({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=B({name:`InternalSelectMenu`,props:{...d.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:i}=k(e),o=a(`InternalSelectMenu`,r,n),c=d(`InternalSelectMenu`,`-internal-select-menu`,dt,Pe,e,H(e,`clsPrefix`)),l=V(null),u=V(null),f=V(null),p=q(()=>e.treeMate.getFlattenedNodes()),m=q(()=>Ce(p.value)),h=V(null);function g(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),W(n||null)}function y(){let{value:t}=h;t&&!e.treeMate.getNode(t.key)&&(h.value=null)}let b;w(()=>e.show,t=>{t?b=w(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?g():y(),s(G)):y()},{immediate:!0}):b?.()},{immediate:!0}),v(()=>{b?.()});let x=q(()=>A(c.value.self[O(`optionHeight`,e.size)])),S=q(()=>ee(c.value.self[O(`padding`,e.size)])),T=q(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),E=q(()=>{let e=p.value;return e&&e.length===0}),D=q(()=>i?.value?.Select?.renderEmpty);function j(t){let{onToggle:n}=e;n&&n(t)}function M(t){let{onScroll:n}=e;n&&n(t)}function N(e){f.value?.sync(),M(e)}function P(){f.value?.sync()}function F(){let{value:e}=h;return e||null}function I(e,t){t.disabled||W(t,!1)}function L(e,t){t.disabled||j(t)}function R(t){we(t,`action`)||e.onKeyup?.(t)}function z(t){we(t,`action`)||e.onKeydown?.(t)}function B(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function U(){let{value:e}=h;e&&W(e.getNext({loop:!0}),!0)}function te(){let{value:e}=h;e&&W(e.getPrev({loop:!0}),!0)}function W(e,t=!1){h.value=e,t&&G()}function G(){let t=h.value;if(!t)return;let n=m.value(t.key);n!==null&&(e.virtualScroll?u.value?.scrollTo({index:n}):f.value?.scrollTo({index:n,elSize:x.value}))}function ne(t){l.value?.contains(t.target)&&e.onFocus?.(t)}function K(t){l.value?.contains(t.relatedTarget)||e.onBlur?.(t)}C(ge,{handleOptionMouseEnter:I,handleOptionClick:L,valueSetRef:T,pendingTmNodeRef:h,nodePropsRef:H(e,`nodeProps`),showCheckmarkRef:H(e,`showCheckmark`),multipleRef:H(e,`multiple`),valueRef:H(e,`value`),renderLabelRef:H(e,`renderLabel`),renderOptionRef:H(e,`renderOption`),labelFieldRef:H(e,`labelField`),valueFieldRef:H(e,`valueField`)}),C(ve,l),t(()=>{let{value:e}=f;e&&e.sync()});let re=q(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:o,actionDividerColor:s,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[O(`optionFontSize`,t)]:x,[O(`optionHeight`,t)]:S,[O(`optionPadding`,t)]:C}}=c.value;return{"--n-height":r,"--n-action-divider-color":s,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":o,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":ee(C,`left`),"--n-option-padding-right":ee(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:J}=e,ie=J?_(`internal-select-menu`,q(()=>e.size[0]),re,e):void 0,ae={selfRef:l,next:U,prev:te,getPendingTmNode:F};return rt(l,e.onResize),{mergedTheme:c,mergedClsPrefix:n,rtlEnabled:o,virtualListRef:u,scrollbarRef:f,itemSize:x,padding:S,flattenedNodes:p,empty:E,mergedRenderEmpty:D,virtualListContainer(){let{value:e}=u;return e?.listElRef},virtualListContent(){let{value:e}=u;return e?.itemsElRef},doScroll:M,handleFocusin:ne,handleFocusout:K,handleKeyUp:R,handleKeyDown:z,handleMouseDown:B,handleVirtualListResize:P,handleVirtualListScroll:N,cssVars:J?void 0:re,themeClass:ie?.themeClass,onRender:ie?.onRender,...ae}},render(){let{$slots:e,virtualScroll:t,clsPrefix:n,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),S(),x(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:P([`${n}-base-select-menu`,`${n}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${n}-base-select-menu--rtl`,a,this.multiple&&`${n}-base-select-menu--multiple`]),style:J(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[F(()=>L(e.header,e=>e&&(S(),x(`div`,{class:P(`${n}-base-select-menu__header`),"data-header":!0,key:`header`},[F(()=>e)],2)))),this.loading?(S(),x(`div`,{key:0,class:P(`${n}-base-select-menu__loading`)},[(S(),r(re,{clsPrefix:n,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(S(),x(E,{key:1},[this.empty?(S(),x(`div`,{key:1,class:P(`${n}-base-select-menu__empty`),"data-empty":!0},[F(()=>z(e.empty,()=>[this.mergedRenderEmpty?.()||(S(),r(Ee,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(S(),r(ce,g({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(S(),r(Ge,{key:1,ref:`virtualListRef`,class:P(`${n}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(S(),r(at,{key:e.key,clsPrefix:n,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(S(),r(ut,{clsPrefix:n,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(S(),x(`div`,{key:4,class:P(`${n}-base-select-menu-option-wrapper`),style:J({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[F(()=>this.flattenedNodes.map(e=>e.isGroup?(S(),r(at,{key:e.key,clsPrefix:n,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(S(),r(ut,{clsPrefix:n,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),F(()=>L(e.action,e=>e&&[(S(),x(`div`,{class:P(`${n}-base-select-menu__action`),"data-action":!0,key:`action`},[F(()=>e)],2)),(S(),r(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=e([M(`base-selection`,`
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
 `,[M(`base-loading`,`
 color: var(--n-loading-color);
 `),M(`base-selection-tags`,`min-height: var(--n-height);`),U(`border, state-border`,`
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
 `),U(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),M(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[U(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),M(`base-selection-overlay`,`
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
 `,[U(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),M(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[U(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),M(`base-selection-tags`,`
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
 `),M(`base-selection-label`,`
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
 `,[M(`base-selection-input`,`
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
 `,[U(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),U(`render-label`,`
 color: var(--n-text-color);
 `)]),I(`disabled`,[e(`&:hover`,[U(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),G(`focus`,[U(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),G(`active`,[U(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),M(`base-selection-label`,`background-color: var(--n-color-active);`),M(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),G(`disabled`,`cursor: not-allowed;`,[U(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),M(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[M(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),U(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),M(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),M(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),M(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[U(`input`,`
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
 `),U(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(t=>G(`${t}-status`,[U(`state-border`,`border: var(--n-border-${t});`),I(`disabled`,[e(`&:hover`,[U(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${t});
 border: var(--n-border-hover-${t});
 `)]),G(`active`,[U(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${t});
 border: var(--n-border-active-${t});
 `),M(`base-selection-label`,`background-color: var(--n-color-active-${t});`),M(`base-selection-tags`,`background-color: var(--n-color-active-${t});`)]),G(`focus`,[U(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${t});
 border: var(--n-border-focus-${t});
 `)])])]))]),M(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),M(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[e(`&:last-child`,`padding-right: 0;`),M(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[U(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=B({name:`InternalSelection`,props:{...d.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(e){let{mergedClsPrefixRef:n,mergedRtlRef:r}=k(e),i=a(`InternalSelection`,r,n),o=V(null),c=V(null),l=V(null),u=V(null),f=V(null),p=V(null),m=V(null),h=V(null),g=V(null),v=V(null),y=V(!1),b=V(!1),x=V(!1),S=d(`InternalSelection`,`-internal-selection`,bt,Oe,e,H(e,`clsPrefix`)),C=q(()=>e.clearable&&!e.disabled&&(x.value||e.active)),E=q(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Q(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),D=q(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),A=q(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function j(){let{value:t}=o;if(t){let{value:n}=c;n&&(n.style.width=`${t.offsetWidth}px`,e.maxTagCount!==`responsive`&&g.value?.sync({showAllItemsBeforeCalculate:!1}))}}function M(){let{value:e}=v;e&&(e.style.display=`none`)}function N(){let{value:e}=v;e&&(e.style.display=`inline-block`)}w(H(e,`active`),e=>{e||M()}),w(H(e,`pattern`),()=>{e.multiple&&s(j)});function P(t){let{onFocus:n}=e;n&&n(t)}function F(t){let{onBlur:n}=e;n&&n(t)}function I(t){let{onDeleteOption:n}=e;n&&n(t)}function L(t){let{onClear:n}=e;n&&n(t)}function R(t){let{onPatternInput:n}=e;n&&n(t)}function z(e){(!e.relatedTarget||!l.value?.contains(e.relatedTarget))&&P(e)}function B(e){l.value?.contains(e.relatedTarget)||F(e)}function U(e){L(e)}function te(){x.value=!0}function W(){x.value=!1}function G(t){e.active&&e.filterable&&t.target!==c.value&&t.preventDefault()}function ne(e){I(e)}let K=V(!1);function re(t){if(t.key===`Backspace`&&!K.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&ne(t[t.length-1])}}let J=null;function ie(t){let{value:n}=o;n&&(n.textContent=t.target.value,j()),e.ignoreComposition&&K.value?J=t:R(t)}function ae(){K.value=!0}function oe(){K.value=!1,e.ignoreComposition&&R(J),J=null}function se(t){b.value=!0,e.onPatternFocus?.(t)}function Y(t){b.value=!1,e.onPatternBlur?.(t)}function X(){if(e.filterable)b.value=!1,p.value?.blur(),c.value?.blur();else if(e.multiple){let{value:e}=u;e?.blur()}else{let{value:e}=f;e?.blur()}}function ce(){e.filterable?(b.value=!1,p.value?.focus()):e.multiple?u.value?.focus():f.value?.focus()}function Z(){let{value:e}=c;e&&(N(),e.focus())}function le(){let{value:e}=c;e&&e.blur()}function ue(e){let{value:t}=m;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=h;return e}function fe(){return c.value}let pe=null;function me(){pe!==null&&window.clearTimeout(pe)}function he(){e.active||(me(),pe=window.setTimeout(()=>{A.value&&(y.value=!0)},100))}function ge(){me()}function _e(e){e||(me(),y.value=!1)}w(A,e=>{e||(y.value=!1)}),t(()=>{T(()=>{let t=p.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=b.value?-1:0)})}),rt(l,e.onResize);let{inlineThemeDisabled:ve}=e,ye=q(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:C,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:k,boxShadowHoverWarning:A,borderWarning:j,borderFocusWarning:M,borderHoverWarning:N,borderActiveWarning:P,colorActiveError:F,boxShadowFocusError:I,boxShadowActiveError:L,boxShadowHoverError:R,borderError:z,borderFocusError:B,borderHoverError:V,borderActiveError:H,clearColor:U,clearColorHover:te,clearColorPressed:W,clearSize:G,arrowSize:ne,[O(`height`,t)]:K,[O(`fontSize`,t)]:re}}=S.value,q=ee(c),J=ee(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":re,"--n-height":K,"--n-padding-single-top":q.top,"--n-padding-multiple-top":J.top,"--n-padding-single-right":q.right,"--n-padding-multiple-right":J.right,"--n-padding-single-left":q.left,"--n-padding-multiple-left":J.left,"--n-padding-single-bottom":q.bottom,"--n-padding-multiple-bottom":J.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":k,"--n-box-shadow-hover-warning":A,"--n-border-warning":j,"--n-border-focus-warning":M,"--n-border-hover-warning":N,"--n-border-active-warning":P,"--n-color-active-error":F,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":L,"--n-box-shadow-hover-error":R,"--n-border-error":z,"--n-border-focus-error":B,"--n-border-hover-error":V,"--n-border-active-error":H,"--n-clear-size":G,"--n-clear-color":U,"--n-clear-color-hover":te,"--n-clear-color-pressed":W,"--n-arrow-size":ne,"--n-font-weight":r}}),be=ve?_(`internal-selection`,q(()=>e.size[0]),ye,e):void 0;return{mergedTheme:S,mergedClearable:C,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:b,filterablePlaceholder:E,label:D,selected:A,showTagsPanel:y,isComposing:K,counterRef:m,counterWrapperRef:h,patternInputMirrorRef:o,patternInputRef:c,selfRef:l,multipleElRef:u,singleElRef:f,patternInputWrapperRef:p,overflowRef:g,inputTagElRef:v,handleMouseDown:G,handleFocusin:z,handleClear:U,handleMouseEnter:te,handleMouseLeave:W,handleDeleteOption:ne,handlePatternKeyDown:re,handlePatternInputInput:ie,handlePatternInputBlur:Y,handlePatternInputFocus:se,handleMouseEnterCounter:he,handleMouseLeaveCounter:ge,handleFocusout:B,handleCompositionEnd:oe,handleCompositionStart:ae,onPopoverUpdateShow:_e,focus:ce,focusInput:Z,blur:X,blurInput:le,updateCounter:ue,getCounter:de,getTail:fe,renderLabel:e.renderLabel,cssVars:ve?void 0:ye,themeClass:be?.themeClass,onRender:be?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:i,filterable:a,maxTagCount:o,bordered:s,clsPrefix:c,ellipsisTagPopoverProps:l,onRender:u,renderTag:d,renderLabel:f}=this;u?.();let p=o===`responsive`,m=typeof o==`number`,h=p||m,_=(S(),r(le,null,{default:()=>(S(),r(De,{clsPrefix:c,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),v;if(t){let{labelField:e}=this,t=t=>(S(),x(`div`,{class:P(`${c}-base-selection-tag-wrapper`),key:t.value},[d?(S(),x(E,{key:0},[F(()=>d({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(S(),r(tt,{key:1,size:n,closable:!t.disabled,disabled:i,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>f?f(t,!0):Q(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),s=()=>(m?this.selectedOptions.slice(0,o):this.selectedOptions).map(t),u=a?(S(),x(`div`,{class:P(`${c}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[y(`input`,g(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:i,value:this.pattern,autofocus:this.autofocus,class:`${c}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),y(`span`,{ref:`patternInputMirrorRef`,class:P(`${c}-base-selection-input-tag__mirror`)},[F(()=>this.pattern)],2)],2)):null,b=p?()=>(S(),x(`div`,{class:P(`${c}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(S(),r(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:i},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,C;if(m){let e=this.selectedOptions.length-o;e>0&&(C=(t=>(S(),x(`div`,{class:P(`${c}-base-selection-tag-wrapper`),key:`__counter__`},[(S(),r(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:i},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(C))}let w=p?a?(S(),r(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:b,tail:()=>u},1032,[`updateCounter`,`getCounter`,`getTail`])):(S(),r(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:b},1032,[`updateCounter`,`getCounter`])):m&&C?s().concat(C):s(),T=h?()=>(S(),x(`div`,{class:P(`${c}-base-selection-popover`)},[p?(S(),x(E,{key:0},[F(()=>s())],64)):(S(),x(E,{key:1},[F(()=>this.selectedOptions.map(t))],64))],2)):void 0,D=h?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...l}:null,O=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(S(),x(`div`,{key:5,class:P(`${c}-base-selection-placeholder ${c}-base-selection-overlay`)},[y(`div`,{class:P(`${c}-base-selection-placeholder__inner`)},[F(()=>this.placeholder)],2)],2)):null,k=a?(S(),x(`div`,{key:6,ref:`patternInputWrapperRef`,class:P(`${c}-base-selection-tags`)},[F(()=>w),p?F(()=>null):(S(),x(E,{key:1},[F(()=>u)],64)),F(()=>_)],2)):(S(),x(`div`,{key:7,ref:`multipleElRef`,class:P(`${c}-base-selection-tags`),tabindex:i?void 0:0},[F(()=>w),F(()=>_)],10,St));v=(e=>(S(),x(E,{key:8},[h?(S(),r(xe,g({key:0},D,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>k,default:T},1040)):(S(),x(E,{key:1},[F(()=>k)],64)),F(()=>O)],64)))(v)}else if(a){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;v=(e=>(S(),x(`div`,{key:9,ref:`patternInputWrapperRef`,class:P(`${c}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[y(`input`,g(this.inputProps,{ref:`patternInputRef`,class:`${c}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:i,disabled:i,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),n?(S(),x(`div`,{class:P(`${c}-base-selection-label__render-label ${c}-base-selection-overlay`),key:`input`},[y(`div`,{class:P(`${c}-base-selection-overlay__wrapper`)},[d?(S(),x(E,{key:0},[F(()=>d({option:this.selectedOption,handleClose:()=>{}}))],64)):(S(),x(E,{key:1},[f?(S(),x(E,{key:0},[F(()=>f(this.selectedOption,!0))],64)):(S(),x(E,{key:1},[F(()=>Q(this.label,this.selectedOption,!0))],64))],64))],2)],2)):F(()=>null),t?(S(),x(`div`,{class:P(`${c}-base-selection-placeholder ${c}-base-selection-overlay`),key:`placeholder`},[y(`div`,{class:P(`${c}-base-selection-overlay__wrapper`)},[F(()=>this.filterablePlaceholder)],2)],2)):F(()=>null),F(()=>_)],10,Ct)))(v)}else v=(e=>(S(),x(`div`,{key:10,ref:`singleElRef`,class:P(`${c}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(S(),x(`div`,{class:P(`${c}-base-selection-placeholder ${c}-base-selection-overlay`),key:`placeholder`},[y(`div`,{class:P(`${c}-base-selection-placeholder__inner`)},[F(()=>this.placeholder)],2)],2)):(S(),x(`div`,{class:P(`${c}-base-selection-input`),title:nt(this.label),key:`input`},[y(`div`,{class:P(`${c}-base-selection-input__content`)},[d?(S(),x(E,{key:0},[F(()=>d({option:this.selectedOption,handleClose:()=>{}}))],64)):(S(),x(E,{key:1},[f?(S(),x(E,{key:0},[F(()=>f(this.selectedOption,!0))],64)):(S(),x(E,{key:1},[F(()=>Q(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),F(()=>_)],10,Tt)))(v);return S(),x(`div`,{ref:`selfRef`,class:P([`${c}-base-selection`,this.rtlEnabled&&`${c}-base-selection--rtl`,this.themeClass,e&&`${c}-base-selection--${e}-status`,{[`${c}-base-selection--active`]:this.active,[`${c}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${c}-base-selection--disabled`]:this.disabled,[`${c}-base-selection--multiple`]:this.multiple,[`${c}-base-selection--focus`]:this.focused}]),style:J(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[F(()=>v),s?(S(),x(`div`,{key:0,class:P(`${c}-base-selection__border`)},null,2)):F(()=>null),s?(S(),x(`div`,{key:2,class:P(`${c}-base-selection__state-border`)},null,2)):F(()=>null)],46,Et)}}),Ot=e([M(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),M(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[ue({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...d.props,to:Se.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=B({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:r,namespaceRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=k(e),s=d(`Select`,`-select`,Ot,Ne,e,t),c=V(e.defaultValue),l=H(e,`value`),u=me(l,c),p=V(!1),m=V(``),g=pe(e,[`items`,`options`]),v=V([]),y=V([]),b=q(()=>y.value.concat(v.value).concat(g.value)),x=q(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),S=q(()=>{if(e.remote)return g.value;{let{value:t}=b,{value:n}=m;return!n.length||!e.filterable?t:vt(t,x.value,n,e.childrenField)}}),C=q(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return Te(S.value,r)}),T=q(()=>yt(b.value,e.valueField,e.childrenField)),E=V(!1),D=me(H(e,`show`),E),O=V(null),A=V(null),j=V(null),{localeRef:M}=oe(`Select`),N=q(()=>e.placeholder??M.value.placeholder),P=[],F=V(new Map),I=q(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function L(t){let n=e.remote,{value:r}=F,{value:i}=T,{value:a}=I,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let R=q(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?L(e):[]}return null}),z=q(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:L([t])[0]||null:null}),B=n(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:ee,mergedDisabledRef:U,mergedStatusRef:te}=B;function W(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=B;r&&f(r,t,n),a&&f(a,t,n),i&&f(i,t,n),c.value=t,o(),s()}function G(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=B;n&&f(n,t),r()}function ne(){let{onClear:t}=e;t&&f(t)}function K(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=B;n&&f(n,t),i(),r&&Y()}function re(t){let{onSearch:n}=e;n&&f(n,t)}function J(t){let{onScroll:n}=e;n&&f(n,t)}function ie(){let{remote:t,multiple:n}=e;if(t){let{value:t}=F;if(n){let{valueField:n}=e;R.value?.forEach(e=>{t.set(e[n],e)})}else{let n=z.value;n&&t.set(n[e.valueField],n)}}}function ae(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&f(n,t),r&&f(r,t),E.value=t}function Y(){U.value||(ae(!0),E.value=!0,e.filterable&&Pe())}function X(){ae(!1)}function ce(){m.value=``,y.value=P}let Z=V(!1);function le(){e.filterable&&(Z.value=!0)}function ue(){e.filterable&&(Z.value=!1,D.value||ce())}function de(){U.value||(D.value?e.filterable?Pe():X():Y())}function fe(e){j.value?.selfRef?.contains(e.relatedTarget)||(p.value=!1,G(e),X())}function he(e){K(e),p.value=!0}function ge(){p.value=!0}function _e(e){O.value?.$el.contains(e.relatedTarget)||(p.value=!1,G(e),X())}function ve(){O.value?.focus(),X()}function ye(e){D.value&&(O.value?.$el.contains(se(e))||X())}function be(t){if(!Array.isArray(t))return[];if(I.value)return Array.from(t);{let{remote:n}=e,{value:r}=T;if(n){let{value:e}=F;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function xe(e){Ce(e.rawNode)}function Ce(t){if(U.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=y,t=e[0]||null;if(t){let e=v.value;e.length?e.push(t):v.value=[t],y.value=P}}if(r&&F.value.set(t[a],t),e.multiple){let e=be(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Ee(t[a]);~e&&(v.value.splice(e,1),i&&(m.value=``))}}else e.push(t[a]),i&&(m.value=``);W(e,L(e))}else{if(n&&!r){let e=Ee(t[a]);~e?v.value=[v.value[e]]:v.value=P}Me(),X(),W(t[a],t)}}function Ee(t){return v.value.findIndex(n=>n[e.valueField]===t)}function De(t){D.value||Y();let{value:n}=t.target;m.value=n;let{tag:r,remote:i}=e;if(re(n),r&&!i){if(!n){y.value=P;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;g.value.some(e=>e[i]===r[i]||e[a]===r[a])||v.value.some(e=>e[i]===r[i]||e[a]===r[a])?y.value=P:y.value=[r]}}function Oe(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&X(),r&&!i&&a&&(v.value=P),ne(),n?W([],[]):W(null,null)}function ke(e){!we(e,`action`)&&!we(e,`empty`)&&!we(e,`header`)&&e.preventDefault()}function Ae(e){J(e)}function Q(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!O.value?.isComposing){if(D.value){let t=j.value?.getPendingTmNode();t?xe(t):e.filterable||(X(),Me())}else if(Y(),e.tag&&Z.value){let t=y.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Ce(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;D.value&&j.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;D.value?j.value?.next():Y();break;case`Escape`:D.value&&(je(t),X()),O.value?.focus()}}function Me(){O.value?.focus()}function Pe(){O.value?.focusInput()}function Fe(){D.value&&A.value?.syncPosition()}ie(),w(H(e,`options`),ie);let Ie={focus:()=>{O.value?.focus()},focusInput:()=>{O.value?.focusInput()},blur:()=>{O.value?.blur()},blurInput:()=>{O.value?.blurInput()}},Le=q(()=>{let{self:{menuBoxShadow:e}}=s.value;return{"--n-menu-box-shadow":e}}),Re=a?_(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:te,mergedClsPrefix:t,mergedBordered:r,namespace:i,treeMate:C,isMounted:h(),triggerRef:O,menuRef:j,pattern:m,uncontrolledShow:E,mergedShow:D,adjustedTo:Se(e),uncontrolledValue:c,mergedValue:u,followerRef:A,localizedPlaceholder:N,selectedOption:z,selectedOptions:R,mergedSize:ee,mergedDisabled:U,focused:p,activeWithoutMenuOpen:Z,inlineThemeDisabled:a,onTriggerInputFocus:le,onTriggerInputBlur:ue,handleTriggerOrMenuResize:Fe,handleMenuFocus:ge,handleMenuBlur:_e,handleMenuTabOut:ve,handleTriggerClick:de,handleToggle:xe,handleDeleteOption:Ce,handlePatternInput:De,handleClear:Oe,handleTriggerBlur:fe,handleTriggerFocus:he,handleKeydown:Q,handleMenuAfterLeave:ce,handleMenuClickOutside:ye,handleMenuScroll:Ae,handleMenuKeydown:Q,handleMenuMousedown:ke,mergedTheme:s,cssVars:a?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return S(),x(`div`,{class:P(`${this.mergedClsPrefix}-select`)},[m(fe,null,{_:1,default:W(()=>[(S(),r(be,null,{_:1,default:W(()=>(S(),r(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:W(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(S(),r(_e,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===Se.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:W(()=>(S(),r(ne,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:W(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),N((S(),r(pt,g(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:W(()=>[this.$slots.empty?.()]),header:W(()=>[this.$slots.header?.()]),action:W(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[te,this.mergedShow],[X,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[X,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};