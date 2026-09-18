import{B as e,J as t,P as n,Pt as r,Q as i,St as a,Tt as o,U as s,V as c,Y as l,ct as u,dt as d,et as f,ft as p,it as m,mt as h,nt as g,ot as _,rn as v,rt as y,st as b,xt as x,z as S,zt as C}from"./endpoints-C3DHQTsP.js";import{$t as w,A as T,D as E,E as D,I as O,Jt as k,N as A,Qt as j,S as M,T as ee,Xt as N,Zt as P,_ as F,_t as I,at as L,b as R,dt as te,g as z,in as ne,it as B,k as V,l as H,lt as U,m as re,mt as ie,nt as W,ot as G,qt as K,rt as q,sn as ae,st as J,w as Y}from"./Button-Z2R18gr3.js";import{n as oe,t as X}from"./Empty-0YsYqkYn.js";import{c as se,d as Z,f as ce,l as le,n as ue,o as de,p as fe,r as pe,s as me,t as he,u as ge}from"./create-jSv2qRBM.js";import{i as _e,l as ve,o as ye,r as be,t as xe}from"./Scrollbar-BGGh9xj6.js";import{n as Se,r as Ce,t as Q}from"./cssr-BRYMPO8Y.js";import{t as we}from"./use-merged-state-BQRj4oql.js";import{n as Te}from"./Input-CFGDz_y-.js";import{G as Ee,L as De,N as Oe,O as ke,P as Ae,R as je,Z as Me,q as Ne,ut as Pe}from"./index-D71zyNuQ.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let i=r(0),a=r(0),o=S(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=D(()=>{let e=o.value;return e===null?0:Math.max(e.getBound(a.value)-1,0)}),c=e=>{let t=o.value;return t===null?0:t.sum(e)},l=D(()=>{let t=o.value;return t===null?0:Math.min(t.getBound(a.value+i.value)+1,e.value.length-1)});return p(Ve,{startIndexRef:s,endIndexRef:l,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:c}),{listWidthRef:i,scrollLeftRef:a}}var Ue=l({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=f(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=Q(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Q(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Q(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=l({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=te();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:Se,ssr:t}),u(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&y({key:n}):y({index:t})});let n=!1,i=!1;m(()=>{if(n=!1,!i){i=!0;return}y({top:g.value,left:s.value})}),b(()=>{n=!0,i||=!0});let a=D(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=S(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=He({columnsRef:C(e,`columns`),renderColRef:C(e,`renderCol`),renderItemWithColsRef:C(e,`renderItemWithCols`)}),l=r(null),d=r(void 0),f=new Map,p=S(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=f.get(n);a!==void 0&&i.add(t,a)}),i}),h=r(0),g=r(0),_=D(()=>Math.max(p.value.getBound(g.value-W(e.paddingTop))-1,0)),v=S(()=>{let{value:t}=d;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=_.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),y=(e,t)=>{if(typeof e==`number`){E(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)E(n,r,c);else if(i!==void 0)T(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&T(e,c,l)}else s===`bottom`?E(0,2**53-1,c):s===`top`&&E(0,0,c)},x,w=null;function T(t,n,r){let i=l.value;if(i==null)return;let{value:a}=p,o=a.sum(t)+W(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{x=t,w!==null&&window.clearTimeout(w),w=window.setTimeout(()=>{x=void 0,w=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function E(e,t,n){l.value?.scrollTo({left:e,top:t,behavior:n})}function O(t,r){if(n||e.ignoreItemResize||P(r.target))return;let{value:i}=p,a=o.value.get(t),s=i.get(a),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?f.delete(t):f.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(a,u);let d=l.value;if(d!=null){if(x===void 0){let e=i.sum(a);d.scrollTop>e&&d.scrollBy(0,u)}else(a<x||a===x&&c+i.sum(a)>d.scrollTop+d.offsetHeight)&&d.scrollBy(0,u);N()}h.value++}let k=!Re(),A=!1;function j(t){var n;(n=e.onScroll)==null||n.call(e,t),(!k||!A)&&N()}function M(t){var n;if((n=e.onWheel)==null||n.call(e,t),k){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),N(),A=!0,fe(()=>{A=!1})}}}function ee(t){if(n||P(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===d.value)return}else if(t.contentRect.height===d.value&&t.contentRect.width===c.value)return;d.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function N(){let{value:e}=l;e!=null&&(g.value=e.scrollTop,s.value=e.scrollLeft)}function P(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:d,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:S(()=>{let{itemResizable:t}=e,n=B(p.value.sum());return h.value,[e.itemsStyle,{boxSizing:`content-box`,width:B(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:B(e.paddingTop),paddingBottom:B(e.paddingBottom)}]}),visibleItemsStyle:S(()=>(h.value,{transform:`translateY(${B(p.value.sum(_.value))})`})),viewportItems:v,listElRef:l,itemsElRef:r(null),scrollTo:y,handleListResize:ee,handleListScroll:j,handleListWheel:M,handleItemResize:O}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return i(be,{onResize:this.handleListResize},{default:()=>{var a;return i(`div`,g(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(a=this.$slots).empty?.call(a):i(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[i(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:a}=this;return this.viewportItems.map(o=>{let s=o[t],c=n.get(s),l=r==null?void 0:i(Ue,{index:c,item:o}),u=a==null?void 0:i(Ue,{index:c,item:o}),d=this.$slots.default({item:o,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?i(be,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}}),$=`v-hidden`,Ke=Q(`[v-hidden]`,{display:`none!important`}),qe=l({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=r(null),i=r(null);function a(r){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?i.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(r.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let o=te();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:Se,ssr:o}),u(()=>a({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:i,sync:a}},render(){let{$slots:e}=this;return y(()=>this.sync({showAllItemsBeforeCalculate:!1})),i(`div`,{class:`v-overflow`,ref:`selfRef`},[h(e,`default`),e.counter?e.counter():i(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:D,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...Ne,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:D,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${O(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:O(i,{alpha:.12}),colorBorderedPrimary:O(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:O(i,{alpha:.12}),closeColorPressedPrimary:O(i,{alpha:.18}),borderInfo:`1px solid ${O(a,{alpha:.3})}`,textColorInfo:a,colorInfo:O(a,{alpha:.12}),colorBorderedInfo:O(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:O(a,{alpha:.12}),closeColorPressedInfo:O(a,{alpha:.18}),borderSuccess:`1px solid ${O(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:O(o,{alpha:.12}),colorBorderedSuccess:O(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:O(o,{alpha:.12}),closeColorPressedSuccess:O(o,{alpha:.18}),borderWarning:`1px solid ${O(s,{alpha:.35})}`,textColorWarning:s,colorWarning:O(s,{alpha:.15}),colorBorderedWarning:O(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:O(s,{alpha:.12}),closeColorPressedWarning:O(s,{alpha:.18}),borderError:`1px solid ${O(c,{alpha:.23})}`,textColorError:c,colorError:O(c,{alpha:.1}),colorBorderedError:O(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:O(c,{alpha:.12}),closeColorPressedError:O(c,{alpha:.18})}}var Ye={name:`Tag`,common:A,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=k(`tag`,`
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
 `),N(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),N(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),N(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),N(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),P(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[N(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),N(`avatar`,`
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
 `,[j(`disabled`,[K(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[j(`checked`,`color: var(--n-text-color-hover-checkable);`)]),K(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[j(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),P(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[j(`disabled`,[K(`&:hover`,`background-color: var(--n-color-checked-hover);`),K(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...V.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=I(`n-tag`),tt=l({name:`Tag`,props:$e,slots:Object,setup(e){let t=r(null),{mergedBorderedRef:n,mergedClsPrefixRef:i,inlineThemeDisabled:a,mergedRtlRef:o,mergedComponentPropsRef:s}=ie(e),c=S(()=>e.size||s?.value?.Tag?.size||`medium`),l=V(`Tag`,`-tag`,Ze,Ye,e,i);p(et,{roundRef:C(e,`round`)});function u(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function d(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&Y(n,t)}}let f={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},m=F(`Tag`,o,i),h=S(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=c.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:u,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:T,[w(`colorBordered`,t)]:E,[w(`closeSize`,a)]:D,[w(`closeIconSize`,a)]:O,[w(`fontSize`,a)]:k,[w(`height`,a)]:A,[w(`color`,t)]:j,[w(`textColor`,t)]:M,[w(`border`,t)]:ee,[w(`closeIconColor`,t)]:N,[w(`closeIconColorHover`,t)]:P,[w(`closeIconColorPressed`,t)]:F,[w(`closeColorHover`,t)]:I,[w(`closeColorPressed`,t)]:L}}=l.value,R=q(u);return{"--n-font-weight-strong":T,"--n-avatar-size-override":`calc(${A} - 8px)`,"--n-bezier":o,"--n-border-radius":d,"--n-border":ee,"--n-close-icon-size":O,"--n-close-color-pressed":L,"--n-close-color-hover":I,"--n-close-border-radius":C,"--n-close-icon-color":N,"--n-close-icon-color-hover":P,"--n-close-icon-color-pressed":F,"--n-close-icon-color-disabled":N,"--n-close-margin-top":R.top,"--n-close-margin-right":R.right,"--n-close-margin-bottom":R.bottom,"--n-close-margin-left":R.left,"--n-close-size":D,"--n-color":r||(n.value?E:j),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":k,"--n-height":A,"--n-opacity-disabled":f,"--n-padding":s,"--n-text-color":i||M,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),g=a?T(`tag`,S(()=>{let t=``,{type:r,color:{color:i,textColor:a}={}}=e;return t+=r[0],t+=c.value[0],i&&(t+=`a${z(i)}`),a&&(t+=`b${z(a)}`),n.value&&(t+=`c`),t}),h,e):void 0;return{...f,rtlEnabled:m,mergedClsPrefix:i,contentRef:t,mergedBordered:n,handleClick:u,handleCloseClick:d,cssVars:a?void 0:h,themeClass:g?.themeClass,onRender:g?.onRender}},render(){let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:l}=this;o?.();let u=M(l.avatar,e=>e&&(d(),s(`div`,{class:G(`${t}-tag__avatar`)},[U(()=>e)],2))),f=M(l.icon,e=>e&&(d(),s(`div`,{class:G(`${t}-tag__icon`)},[U(()=>e)],2)));return d(),s(`div`,{class:G([`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:u,[`${t}-tag--icon`]:f,[`${t}-tag--closable`]:r}]),style:v(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[U(()=>f||u),e(`span`,{class:G(`${t}-tag__content`),ref:`contentRef`},[U(()=>this.$slots.default?.())],2),!this.checkable&&r?(d(),c(Ee,{key:0,clsPrefix:t,class:G(`${t}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):U(()=>null),!this.checkable&&this.mergedBordered?(d(),s(`div`,{key:2,class:G(`${t}-tag__border`),style:v({borderColor:i})},null,6)):U(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(u(()=>{let{value:n}=e;n&&_e.registerHandler(n,t)}),x(e,(e,t)=>{t&&_e.unregisterHandler(t)},{deep:!1}),_(()=>{let{value:t}=e;t&&_e.unregisterHandler(t)}))}var it=l({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=L(`d16ead82505dc285`);return d(),s(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=l({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=f(Z);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):je(i[this.labelField],i,!1),c=(d(),s(`div`,g(a,{class:[`${e}-base-select-group-header`,a?.class]}),[U(()=>o)],16));return i.render?i.render({node:c,option:i}):n?n({node:c,option:i,selected:!1}):c}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=l({name:`Checkmark`,render(){return(()=>{let t=L(`3c84eac8ae4e1f96`);return t[0]||=e(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[e(`g`,{fill:`none`},[e(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return d(),c(ne,{name:`fade-in-scale-up-transition`},{default:()=>e?(d(),c(E,{key:1,clsPrefix:t,class:G(`${t}-base-select-option__check`)},{default:()=>i(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=l({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:p}=f(Z),m=D(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||d(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:D(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:m,isSelected:D(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:t,tmNode:{rawNode:n},isSelected:r,isPending:i,isGrouped:a,showCheckmark:o,nodeProps:c,renderOption:l,renderLabel:u,handleClick:f,handleMouseEnter:p,handleMouseMove:m}=this,h=lt(r,t),_=u?[u(n,r),o&&h]:[je(n[this.labelField],n,r),o&&h],v=c?.(n),y=(d(),s(`div`,g(v,{class:[`${t}-base-select-option`,n.class,v?.class,{[`${t}-base-select-option--disabled`]:n.disabled,[`${t}-base-select-option--selected`]:r,[`${t}-base-select-option--grouped`]:a,[`${t}-base-select-option--pending`]:i,[`${t}-base-select-option--show-checkmark`]:o}],style:[v?.style||``,n.style||``],onClick:ot([f,v?.onClick]),onMouseenter:ot([p,v?.onMouseenter]),onMousemove:ot([m,v?.onMousemove])}),[e(`div`,{class:G(`${t}-base-select-option__content`)},[U(()=>_)],2)],16,ct));return n.render?n.render({node:y,option:n,selected:r}):l?l({node:y,option:n,selected:r}):y}}),dt=k(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[k(`scrollbar`,`
 max-height: var(--n-height);
 `),k(`virtual-list`,`
 max-height: var(--n-height);
 `),k(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[N(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),k(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),k(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),N(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),N(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),N(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),N(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),k(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),k(`base-select-option`,`
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
 `),K(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),K(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),P(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),P(`pending`,[K(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),P(`selected`,`
 color: var(--n-option-text-color-active);
 `,[K(`&::before`,`
 background-color: var(--n-option-color-active);
 `),P(`pending`,[K(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),P(`disabled`,`
 cursor: not-allowed;
 `,[j(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),P(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),N(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[De({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=l({name:`InternalSelectMenu`,props:{...V.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:i}=ie(e),a=F(`InternalSelectMenu`,n,t),o=V(`InternalSelectMenu`,`-internal-select-menu`,dt,Pe,e,C(e,`clsPrefix`)),s=r(null),c=r(null),l=r(null),d=S(()=>e.treeMate.getFlattenedNodes()),f=S(()=>ue(d.value)),m=r(null);function h(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),B(n||null)}function g(){let{value:t}=m;t&&!e.treeMate.getNode(t.key)&&(m.value=null)}let v;x(()=>e.show,t=>{t?v=x(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?h():g(),y(H)):g()},{immediate:!0}):v?.()},{immediate:!0}),_(()=>{v?.()});let b=S(()=>W(o.value.self[w(`optionHeight`,e.size)])),E=S(()=>q(o.value.self[w(`padding`,e.size)])),D=S(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),O=S(()=>{let e=d.value;return e&&e.length===0}),k=S(()=>i?.value?.Select?.renderEmpty);function A(t){let{onToggle:n}=e;n&&n(t)}function j(t){let{onScroll:n}=e;n&&n(t)}function M(e){l.value?.sync(),j(e)}function ee(){l.value?.sync()}function N(){let{value:e}=m;return e||null}function P(e,t){t.disabled||B(t,!1)}function I(e,t){t.disabled||A(t)}function L(t){ce(t,`action`)||e.onKeyup?.(t)}function R(t){ce(t,`action`)||e.onKeydown?.(t)}function te(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function z(){let{value:e}=m;e&&B(e.getNext({loop:!0}),!0)}function ne(){let{value:e}=m;e&&B(e.getPrev({loop:!0}),!0)}function B(e,t=!1){m.value=e,t&&H()}function H(){let t=m.value;if(!t)return;let n=f.value(t.key);n!==null&&(e.virtualScroll?c.value?.scrollTo({index:n}):l.value?.scrollTo({index:n,elSize:b.value}))}function U(t){s.value?.contains(t.target)&&e.onFocus?.(t)}function re(t){s.value?.contains(t.relatedTarget)||e.onBlur?.(t)}p(Z,{handleOptionMouseEnter:P,handleOptionClick:I,valueSetRef:D,pendingTmNodeRef:m,nodePropsRef:C(e,`nodeProps`),showCheckmarkRef:C(e,`showCheckmark`),multipleRef:C(e,`multiple`),valueRef:C(e,`value`),renderLabelRef:C(e,`renderLabel`),renderOptionRef:C(e,`renderOption`),labelFieldRef:C(e,`labelField`),valueFieldRef:C(e,`valueField`)}),p(ge,s),u(()=>{let{value:e}=l;e&&e.sync()});let G=S(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[w(`optionFontSize`,t)]:x,[w(`optionHeight`,t)]:S,[w(`optionPadding`,t)]:C}}=o.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":q(C,`left`),"--n-option-padding-right":q(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:K}=e,ae=K?T(`internal-select-menu`,S(()=>e.size[0]),G,e):void 0,J={selfRef:s,next:z,prev:ne,getPendingTmNode:N};return rt(s,e.onResize),{mergedTheme:o,mergedClsPrefix:t,rtlEnabled:a,virtualListRef:c,scrollbarRef:l,itemSize:b,padding:E,flattenedNodes:d,empty:O,mergedRenderEmpty:k,virtualListContainer(){let{value:e}=c;return e?.listElRef},virtualListContent(){let{value:e}=c;return e?.itemsElRef},doScroll:j,handleFocusin:U,handleFocusout:re,handleKeyUp:L,handleKeyDown:R,handleMouseDown:te,handleVirtualListResize:ee,handleVirtualListScroll:M,cssVars:K?void 0:G,themeClass:ae?.themeClass,onRender:ae?.onRender,...J}},render(){let{$slots:e,virtualScroll:t,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),d(),s(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:G([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`]),style:v(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[U(()=>M(e.header,e=>e&&(d(),s(`div`,{class:G(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[U(()=>e)],2)))),this.loading?(d(),s(`div`,{key:0,class:G(`${r}-base-select-menu__loading`)},[(d(),c(H,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(d(),s(n,{key:1},[this.empty?(d(),s(`div`,{key:1,class:G(`${r}-base-select-menu__empty`),"data-empty":!0},[U(()=>R(e.empty,()=>[this.mergedRenderEmpty?.()||(d(),c(X,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(d(),c(xe,g({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(d(),c(Ge,{key:1,ref:`virtualListRef`,class:G(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(d(),c(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(d(),c(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(d(),s(`div`,{key:4,class:G(`${r}-base-select-menu-option-wrapper`),style:v({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[U(()=>this.flattenedNodes.map(e=>e.isGroup?(d(),c(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(d(),c(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),U(()=>M(e.action,e=>e&&[(d(),s(`div`,{class:G(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[U(()=>e)],2)),(d(),c(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=K([k(`base-selection`,`
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
 `,[k(`base-loading`,`
 color: var(--n-loading-color);
 `),k(`base-selection-tags`,`min-height: var(--n-height);`),N(`border, state-border`,`
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
 `),N(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),k(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[N(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),k(`base-selection-overlay`,`
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
 `,[N(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),k(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[N(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),k(`base-selection-tags`,`
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
 `),k(`base-selection-label`,`
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
 `,[k(`base-selection-input`,`
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
 `,[N(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),N(`render-label`,`
 color: var(--n-text-color);
 `)]),j(`disabled`,[K(`&:hover`,[N(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),P(`focus`,[N(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),P(`active`,[N(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),k(`base-selection-label`,`background-color: var(--n-color-active);`),k(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),P(`disabled`,`cursor: not-allowed;`,[N(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),k(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[k(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),N(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),k(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),k(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),k(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[N(`input`,`
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
 `),N(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>P(`${e}-status`,[N(`state-border`,`border: var(--n-border-${e});`),j(`disabled`,[K(`&:hover`,[N(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),P(`active`,[N(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),k(`base-selection-label`,`background-color: var(--n-color-active-${e});`),k(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),P(`focus`,[N(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),k(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),k(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[K(`&:last-child`,`padding-right: 0;`),k(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[N(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=l({name:`InternalSelection`,props:{...V.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=ie(e),i=F(`InternalSelection`,n,t),o=r(null),s=r(null),c=r(null),l=r(null),d=r(null),f=r(null),p=r(null),m=r(null),h=r(null),g=r(null),_=r(!1),v=r(!1),b=r(!1),E=V(`InternalSelection`,`-internal-selection`,bt,Ae,e,C(e,`clsPrefix`)),D=S(()=>e.clearable&&!e.disabled&&(b.value||e.active)),O=S(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):je(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),k=S(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),A=S(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function j(){let{value:t}=o;if(t){let{value:n}=s;n&&(n.style.width=`${t.offsetWidth}px`,e.maxTagCount!==`responsive`&&h.value?.sync({showAllItemsBeforeCalculate:!1}))}}function M(){let{value:e}=g;e&&(e.style.display=`none`)}function ee(){let{value:e}=g;e&&(e.style.display=`inline-block`)}x(C(e,`active`),e=>{e||M()}),x(C(e,`pattern`),()=>{e.multiple&&y(j)});function N(t){let{onFocus:n}=e;n&&n(t)}function P(t){let{onBlur:n}=e;n&&n(t)}function I(t){let{onDeleteOption:n}=e;n&&n(t)}function L(t){let{onClear:n}=e;n&&n(t)}function R(t){let{onPatternInput:n}=e;n&&n(t)}function te(e){(!e.relatedTarget||!c.value?.contains(e.relatedTarget))&&N(e)}function z(e){c.value?.contains(e.relatedTarget)||P(e)}function ne(e){L(e)}function B(){b.value=!0}function H(){b.value=!1}function U(t){e.active&&e.filterable&&t.target!==s.value&&t.preventDefault()}function re(e){I(e)}let W=r(!1);function G(t){if(t.key===`Backspace`&&!W.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&re(t[t.length-1])}}let K=null;function ae(t){let{value:n}=o;n&&(n.textContent=t.target.value,j()),e.ignoreComposition&&W.value?K=t:R(t)}function J(){W.value=!0}function Y(){W.value=!1,e.ignoreComposition&&R(K),K=null}function oe(t){v.value=!0,e.onPatternFocus?.(t)}function X(t){v.value=!1,e.onPatternBlur?.(t)}function se(){if(e.filterable)v.value=!1,f.value?.blur(),s.value?.blur();else if(e.multiple){let{value:e}=l;e?.blur()}else{let{value:e}=d;e?.blur()}}function Z(){e.filterable?(v.value=!1,f.value?.focus()):e.multiple?l.value?.focus():d.value?.focus()}function ce(){let{value:e}=s;e&&(ee(),e.focus())}function le(){let{value:e}=s;e&&e.blur()}function ue(e){let{value:t}=p;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=m;return e}function fe(){return s.value}let pe=null;function me(){pe!==null&&window.clearTimeout(pe)}function he(){e.active||(me(),pe=window.setTimeout(()=>{A.value&&(_.value=!0)},100))}function ge(){me()}function _e(e){e||(me(),_.value=!1)}x(A,e=>{e||(_.value=!1)}),u(()=>{a(()=>{let t=f.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=v.value?-1:0)})}),rt(c,e.onResize);let{inlineThemeDisabled:ve}=e,ye=S(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:C,loadingColor:T,colorActiveWarning:D,boxShadowFocusWarning:O,boxShadowActiveWarning:k,boxShadowHoverWarning:A,borderWarning:j,borderFocusWarning:M,borderHoverWarning:ee,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:F,boxShadowActiveError:I,boxShadowHoverError:L,borderError:R,borderFocusError:te,borderHoverError:z,borderActiveError:ne,clearColor:B,clearColorHover:V,clearColorPressed:H,clearSize:U,arrowSize:re,[w(`height`,t)]:ie,[w(`fontSize`,t)]:W}}=E.value,G=q(c),K=q(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":W,"--n-height":ie,"--n-padding-single-top":G.top,"--n-padding-multiple-top":K.top,"--n-padding-single-right":G.right,"--n-padding-multiple-right":K.right,"--n-padding-single-left":G.left,"--n-padding-multiple-left":K.left,"--n-padding-single-bottom":G.bottom,"--n-padding-multiple-bottom":K.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":C,"--n-loading-color":T,"--n-color-active-warning":D,"--n-box-shadow-focus-warning":O,"--n-box-shadow-active-warning":k,"--n-box-shadow-hover-warning":A,"--n-border-warning":j,"--n-border-focus-warning":M,"--n-border-hover-warning":ee,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":F,"--n-box-shadow-active-error":I,"--n-box-shadow-hover-error":L,"--n-border-error":R,"--n-border-focus-error":te,"--n-border-hover-error":z,"--n-border-active-error":ne,"--n-clear-size":U,"--n-clear-color":B,"--n-clear-color-hover":V,"--n-clear-color-pressed":H,"--n-arrow-size":re,"--n-font-weight":r}}),be=ve?T(`internal-selection`,S(()=>e.size[0]),ye,e):void 0;return{mergedTheme:E,mergedClearable:D,mergedClsPrefix:t,rtlEnabled:i,patternInputFocused:v,filterablePlaceholder:O,label:k,selected:A,showTagsPanel:_,isComposing:W,counterRef:p,counterWrapperRef:m,patternInputMirrorRef:o,patternInputRef:s,selfRef:c,multipleElRef:l,singleElRef:d,patternInputWrapperRef:f,overflowRef:h,inputTagElRef:g,handleMouseDown:U,handleFocusin:te,handleClear:ne,handleMouseEnter:B,handleMouseLeave:H,handleDeleteOption:re,handlePatternKeyDown:G,handlePatternInputInput:ae,handlePatternInputBlur:X,handlePatternInputFocus:oe,handleMouseEnterCounter:he,handleMouseLeaveCounter:ge,handleFocusout:z,handleCompositionEnd:Y,handleCompositionStart:J,onPopoverUpdateShow:_e,focus:Z,focusInput:ce,blur:se,blurInput:le,updateCounter:ue,getCounter:de,getTail:fe,renderLabel:e.renderLabel,cssVars:ve?void 0:ye,themeClass:be?.themeClass,onRender:be?.onRender}},render(){let{status:t,multiple:r,size:i,disabled:a,filterable:o,maxTagCount:l,bordered:u,clsPrefix:f,ellipsisTagPopoverProps:p,onRender:m,renderTag:h,renderLabel:_}=this;m?.();let y=l===`responsive`,b=typeof l==`number`,x=y||b,S=(d(),c(ye,null,{default:()=>(d(),c(Te,{clsPrefix:f,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),C;if(r){let{labelField:t}=this,r=e=>(d(),s(`div`,{class:G(`${f}-base-selection-tag-wrapper`),key:e.value},[h?(d(),s(n,{key:0},[U(()=>h({option:e,handleClose:()=>{this.handleDeleteOption(e)}}))],64)):(d(),c(tt,{key:1,size:i,closable:!e.disabled,disabled:a,onClose:()=>{this.handleDeleteOption(e)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>_?_(e,!0):je(e[t],e,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),u=()=>(b?this.selectedOptions.slice(0,l):this.selectedOptions).map(r),m=o?(d(),s(`div`,{class:G(`${f}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[e(`input`,g(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:a,value:this.pattern,autofocus:this.autofocus,class:`${f}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),e(`span`,{ref:`patternInputMirrorRef`,class:G(`${f}-base-selection-input-tag__mirror`)},[U(()=>this.pattern)],2)],2)):null,v=y?()=>(d(),s(`div`,{class:G(`${f}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(d(),c(tt,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:a},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,w;if(b){let e=this.selectedOptions.length-l;e>0&&(w=(t=>(d(),s(`div`,{class:G(`${f}-base-selection-tag-wrapper`),key:`__counter__`},[(d(),c(tt,{size:i,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:a},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(w))}let T=y?o?(d(),c(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:u,counter:v,tail:()=>m},1032,[`updateCounter`,`getCounter`,`getTail`])):(d(),c(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:u,counter:v},1032,[`updateCounter`,`getCounter`])):b&&w?u().concat(w):u(),E=x?()=>(d(),s(`div`,{class:G(`${f}-base-selection-popover`)},[y?(d(),s(n,{key:0},[U(()=>u())],64)):(d(),s(n,{key:1},[U(()=>this.selectedOptions.map(r))],64))],2)):void 0,D=x?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...p}:null,O=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(d(),s(`div`,{key:5,class:G(`${f}-base-selection-placeholder ${f}-base-selection-overlay`)},[e(`div`,{class:G(`${f}-base-selection-placeholder__inner`)},[U(()=>this.placeholder)],2)],2)):null,k=o?(d(),s(`div`,{key:6,ref:`patternInputWrapperRef`,class:G(`${f}-base-selection-tags`)},[U(()=>T),y?U(()=>null):(d(),s(n,{key:1},[U(()=>m)],64)),U(()=>S)],2)):(d(),s(`div`,{key:7,ref:`multipleElRef`,class:G(`${f}-base-selection-tags`),tabindex:a?void 0:0},[U(()=>T),U(()=>S)],10,St));C=(e=>(d(),s(n,{key:8},[x?(d(),c(pe,g({key:0},D,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>k,default:E},1040)):(d(),s(n,{key:1},[U(()=>k)],64)),U(()=>O)],64)))(C)}else if(o){let t=this.pattern||this.isComposing,r=this.active?!t:!this.selected,i=!this.active&&this.selected;C=(t=>(d(),s(`div`,{key:9,ref:`patternInputWrapperRef`,class:G(`${f}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[e(`input`,g(this.inputProps,{ref:`patternInputRef`,class:`${f}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:a,disabled:a,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),i?(d(),s(`div`,{class:G(`${f}-base-selection-label__render-label ${f}-base-selection-overlay`),key:`input`},[e(`div`,{class:G(`${f}-base-selection-overlay__wrapper`)},[h?(d(),s(n,{key:0},[U(()=>h({option:this.selectedOption,handleClose:()=>{}}))],64)):(d(),s(n,{key:1},[_?(d(),s(n,{key:0},[U(()=>_(this.selectedOption,!0))],64)):(d(),s(n,{key:1},[U(()=>je(this.label,this.selectedOption,!0))],64))],64))],2)],2)):U(()=>null),r?(d(),s(`div`,{class:G(`${f}-base-selection-placeholder ${f}-base-selection-overlay`),key:`placeholder`},[e(`div`,{class:G(`${f}-base-selection-overlay__wrapper`)},[U(()=>this.filterablePlaceholder)],2)],2)):U(()=>null),U(()=>S)],10,Ct)))(C)}else C=(t=>(d(),s(`div`,{key:10,ref:`singleElRef`,class:G(`${f}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(d(),s(`div`,{class:G(`${f}-base-selection-placeholder ${f}-base-selection-overlay`),key:`placeholder`},[e(`div`,{class:G(`${f}-base-selection-placeholder__inner`)},[U(()=>this.placeholder)],2)],2)):(d(),s(`div`,{class:G(`${f}-base-selection-input`),title:nt(this.label),key:`input`},[e(`div`,{class:G(`${f}-base-selection-input__content`)},[h?(d(),s(n,{key:0},[U(()=>h({option:this.selectedOption,handleClose:()=>{}}))],64)):(d(),s(n,{key:1},[_?(d(),s(n,{key:0},[U(()=>_(this.selectedOption,!0))],64)):(d(),s(n,{key:1},[U(()=>je(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),U(()=>S)],10,Tt)))(C);return d(),s(`div`,{ref:`selfRef`,class:G([`${f}-base-selection`,this.rtlEnabled&&`${f}-base-selection--rtl`,this.themeClass,t&&`${f}-base-selection--${t}-status`,{[`${f}-base-selection--active`]:this.active,[`${f}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${f}-base-selection--disabled`]:this.disabled,[`${f}-base-selection--multiple`]:this.multiple,[`${f}-base-selection--focus`]:this.focused}]),style:v(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[U(()=>C),u?(d(),s(`div`,{key:0,class:G(`${f}-base-selection__border`)},null,2)):U(()=>null),u?(d(),s(`div`,{key:2,class:G(`${f}-base-selection__state-border`)},null,2)):U(()=>null)],46,Et)}}),Ot=K([k(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),k(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[De({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...V.props,to:le.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=l({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=ie(e),s=V(`Select`,`-select`,Ot,ke,e,t),c=r(e.defaultValue),l=C(e,`value`),u=we(l,c),d=r(!1),f=r(``),p=Ce(e,[`items`,`options`]),m=r([]),h=r([]),g=S(()=>h.value.concat(m.value).concat(p.value)),_=S(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),v=S(()=>{if(e.remote)return p.value;{let{value:t}=g,{value:n}=f;return!n.length||!e.filterable?t:vt(t,_.value,n,e.childrenField)}}),y=S(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return he(v.value,r)}),b=S(()=>yt(g.value,e.valueField,e.childrenField)),w=r(!1),E=we(C(e,`show`),w),D=r(null),O=r(null),k=r(null),{localeRef:A}=oe(`Select`),j=S(()=>e.placeholder??A.value.placeholder),M=[],N=r(new Map),P=S(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function F(t){let n=e.remote,{value:r}=N,{value:i}=b,{value:a}=P,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let I=S(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?F(e):[]}return null}),L=S(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:F([t])[0]||null:null}),R=re(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:te,mergedDisabledRef:z,mergedStatusRef:ne}=R;function B(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=R;r&&Y(r,t,n),a&&Y(a,t,n),i&&Y(i,t,n),c.value=t,o(),s()}function H(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=R;n&&Y(n,t),r()}function U(){let{onClear:t}=e;t&&Y(t)}function W(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=R;n&&Y(n,t),i(),r&&J()}function G(t){let{onSearch:n}=e;n&&Y(n,t)}function K(t){let{onScroll:n}=e;n&&Y(n,t)}function q(){let{remote:t,multiple:n}=e;if(t){let{value:t}=N;if(n){let{valueField:n}=e;I.value?.forEach(e=>{t.set(e[n],e)})}else{let n=L.value;n&&t.set(n[e.valueField],n)}}}function ae(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&Y(n,t),r&&Y(r,t),w.value=t}function J(){z.value||(ae(!0),w.value=!0,e.filterable&&Pe())}function X(){ae(!1)}function se(){f.value=``,h.value=M}let Z=r(!1);function ue(){e.filterable&&(Z.value=!0)}function de(){e.filterable&&(Z.value=!1,E.value||se())}function fe(){z.value||(E.value?e.filterable?Pe():X():J())}function pe(e){k.value?.selfRef?.contains(e.relatedTarget)||(d.value=!1,H(e),X())}function me(e){W(e),d.value=!0}function ge(){d.value=!0}function _e(e){D.value?.$el.contains(e.relatedTarget)||(d.value=!1,H(e),X())}function ye(){D.value?.focus(),X()}function be(e){E.value&&(D.value?.$el.contains(ve(e))||X())}function xe(t){if(!Array.isArray(t))return[];if(P.value)return Array.from(t);{let{remote:n}=e,{value:r}=b;if(n){let{value:e}=N;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function Se(e){Q(e.rawNode)}function Q(t){if(z.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=h,t=e[0]||null;if(t){let e=m.value;e.length?e.push(t):m.value=[t],h.value=M}}if(r&&N.value.set(t[a],t),e.multiple){let e=xe(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Te(t[a]);~e&&(m.value.splice(e,1),i&&(f.value=``))}}else e.push(t[a]),i&&(f.value=``);B(e,F(e))}else{if(n&&!r){let e=Te(t[a]);~e?m.value=[m.value[e]]:m.value=M}Ne(),X(),B(t[a],t)}}function Te(t){return m.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){E.value||J();let{value:n}=t.target;f.value=n;let{tag:r,remote:i}=e;if(G(n),r&&!i){if(!n){h.value=M;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;p.value.some(e=>e[i]===r[i]||e[a]===r[a])||m.value.some(e=>e[i]===r[i]||e[a]===r[a])?h.value=M:h.value=[r]}}function De(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&X(),r&&!i&&a&&(m.value=M),U(),n?B([],[]):B(null,null)}function Ae(e){!ce(e,`action`)&&!ce(e,`empty`)&&!ce(e,`header`)&&e.preventDefault()}function je(e){K(e)}function Me(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!D.value?.isComposing){if(E.value){let t=k.value?.getPendingTmNode();t?Se(t):e.filterable||(X(),Ne())}else if(J(),e.tag&&Z.value){let t=h.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Q(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;E.value&&k.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;E.value?k.value?.next():J();break;case`Escape`:E.value&&(Oe(t),X()),D.value?.focus()}}function Ne(){D.value?.focus()}function Pe(){D.value?.focusInput()}function Fe(){E.value&&O.value?.syncPosition()}q(),x(C(e,`options`),q);let Ie={focus:()=>{D.value?.focus()},focusInput:()=>{D.value?.focusInput()},blur:()=>{D.value?.blur()},blurInput:()=>{D.value?.blurInput()}},Le=S(()=>{let{self:{menuBoxShadow:e}}=s.value;return{"--n-menu-box-shadow":e}}),Re=a?T(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:ne,mergedClsPrefix:t,mergedBordered:n,namespace:i,treeMate:y,isMounted:ee(),triggerRef:D,menuRef:k,pattern:f,uncontrolledShow:w,mergedShow:E,adjustedTo:le(e),uncontrolledValue:c,mergedValue:u,followerRef:O,localizedPlaceholder:j,selectedOption:L,selectedOptions:I,mergedSize:te,mergedDisabled:z,focused:d,activeWithoutMenuOpen:Z,inlineThemeDisabled:a,onTriggerInputFocus:ue,onTriggerInputBlur:de,handleTriggerOrMenuResize:Fe,handleMenuFocus:ge,handleMenuBlur:_e,handleMenuTabOut:ye,handleTriggerClick:fe,handleToggle:Se,handleDeleteOption:Q,handlePatternInput:Ee,handleClear:De,handleTriggerBlur:pe,handleTriggerFocus:me,handleKeydown:Me,handleMenuAfterLeave:se,handleMenuClickOutside:be,handleMenuScroll:je,handleMenuKeydown:Me,handleMenuMousedown:Ae,mergedTheme:s,cssVars:a?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return d(),s(`div`,{class:G(`${this.mergedClsPrefix}-select`)},[t(se,null,{_:1,default:J(()=>[(d(),c(me,null,{_:1,default:J(()=>(d(),c(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:J(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(d(),c(de,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===le.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:J(()=>(d(),c(ne,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:J(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),o((d(),c(pt,g(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:J(()=>[this.$slots.empty?.()]),header:J(()=>[this.$slots.header?.()]),action:J(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[ae,this.mergedShow],[Me,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Me,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};