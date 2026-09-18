import{B as e,Bt as t,C as n,E as r,F as i,G as a,J as o,L as s,M as c,S as l,St as u,U as d,V as f,W as p,Y as m,Z as h,_ as g,_t as _,at as v,ct as y,it as b,j as x,w as S,z as C}from"./endpoints-BqUstzml.js";import{$t as w,A as T,D as E,E as D,I as O,Jt as k,N as A,Qt as j,S as M,T as ee,Xt as N,Zt as P,_ as F,_t as I,at as L,b as R,dt as te,g as z,in as ne,it as B,k as V,l as H,lt as U,m as re,mt as ie,nt as W,ot as G,qt as K,rt as q,sn as ae,st as J,w as Y}from"./Button-D6v1m03e.js";import{n as oe,t as X}from"./Empty-BMLeTfJJ.js";import{c as se,d as Z,f as ce,l as le,n as ue,o as de,p as fe,r as pe,s as me,t as he,u as ge}from"./create-D9HQUL4-.js";import{i as _e,l as ve,o as ye,r as be,t as xe}from"./Scrollbar-G7EEgfj_.js";import{n as Se,r as Ce,t as Q}from"./cssr-BaIbTHTh.js";import{t as we}from"./use-merged-state-rCtWF78v.js";import{n as Te}from"./Input-C05ahmCJ.js";import{G as Ee,L as De,N as Oe,O as ke,P as Ae,R as je,Z as Me,q as Ne,ut as Pe}from"./index-BxwjwlwC.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=_(0),i=_(0),a=l(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),o=D(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),s=e=>{let t=a.value;return t===null?0:t.sum(e)},c=D(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return m(Ve,{startIndexRef:o,endIndexRef:c,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:s}),{listWidthRef:r,scrollLeftRef:i}}var Ue=c({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=s(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=Q(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[Q(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[Q(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=c({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=te();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:Se,ssr:t}),a(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&S({key:n}):S({index:t})});let n=!1,r=!1;f(()=>{if(n=!1,!r){r=!0;return}S({top:y.value,left:s.value})}),p(()=>{n=!0,r||=!0});let i=D(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=l(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=He({columnsRef:u(e,`columns`),renderColRef:u(e,`renderCol`),renderItemWithColsRef:u(e,`renderItemWithCols`)}),d=_(null),m=_(void 0),h=new Map,g=l(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=h.get(n);a!==void 0&&i.add(t,a)}),i}),v=_(0),y=_(0),b=D(()=>Math.max(g.value.getBound(y.value-W(e.paddingTop))-1,0)),x=l(()=>{let{value:t}=m;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=b.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),S=(e,t)=>{if(typeof e==`number`){E(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)E(n,r,c);else if(i!==void 0)T(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&T(e,c,l)}else s===`bottom`?E(0,2**53-1,c):s===`top`&&E(0,0,c)},C,w=null;function T(t,n,r){let i=d.value;if(i==null)return;let{value:a}=g,o=a.sum(t)+W(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{C=t,w!==null&&window.clearTimeout(w),w=window.setTimeout(()=>{C=void 0,w=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function E(e,t,n){d.value?.scrollTo({left:e,top:t,behavior:n})}function O(t,r){if(n||e.ignoreItemResize||P(r.target))return;let{value:i}=g,a=o.value.get(t),s=i.get(a),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?h.delete(t):h.set(t,c-e.itemSize);let l=c-s;if(l===0)return;i.add(a,l);let u=d.value;if(u!=null){if(C===void 0){let e=i.sum(a);u.scrollTop>e&&u.scrollBy(0,l)}else(a<C||a===C&&c+i.sum(a)>u.scrollTop+u.offsetHeight)&&u.scrollBy(0,l);N()}v.value++}let k=!Re(),A=!1;function j(t){var n;(n=e.onScroll)==null||n.call(e,t),(!k||!A)&&N()}function M(t){var n;if((n=e.onWheel)==null||n.call(e,t),k){let e=d.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),N(),A=!0,fe(()=>{A=!1})}}}function ee(t){if(n||P(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===m.value)return}else if(t.contentRect.height===m.value&&t.contentRect.width===c.value)return;m.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function N(){let{value:e}=d;e!=null&&(y.value=e.scrollTop,s.value=e.scrollLeft)}function P(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:m,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:l(()=>{let{itemResizable:t}=e,n=B(g.value.sum());return v.value,[e.itemsStyle,{boxSizing:`content-box`,width:B(i.value),height:t?``:n,minHeight:t?n:``,paddingTop:B(e.paddingTop),paddingBottom:B(e.paddingBottom)}]}),visibleItemsStyle:l(()=>(v.value,{transform:`translateY(${B(g.value.sum(b.value))})`})),viewportItems:x,listElRef:d,itemsElRef:_(null),scrollTo:S,handleListResize:ee,handleListScroll:j,handleListWheel:M,handleItemResize:O}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return i(be,{onResize:this.handleListResize},{default:()=>{var a;return i(`div`,C(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(a=this.$slots).empty?.call(a):i(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[i(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:a}=this;return this.viewportItems.map(o=>{let s=o[t],c=n.get(s),l=r==null?void 0:i(Ue,{index:c,item:o}),u=a==null?void 0:i(Ue,{index:c,item:o}),d=this.$slots.default({item:o,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?i(be,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}}),$=`v-hidden`,Ke=Q(`[v-hidden]`,{display:`none!important`}),qe=c({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=_(null),r=_(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let o=te();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:Se,ssr:o}),a(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:t}=this;return e(()=>this.sync({showAllItemsBeforeCalculate:!1})),i(`div`,{class:`v-overflow`,ref:`selfRef`},[h(t,`default`),t.counter?t.counter():i(`span`,{style:{display:`inline-block`},ref:`counterRef`}),t.tail?t.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:D,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...Ne,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:D,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${O(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:O(i,{alpha:.12}),colorBorderedPrimary:O(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:O(i,{alpha:.12}),closeColorPressedPrimary:O(i,{alpha:.18}),borderInfo:`1px solid ${O(a,{alpha:.3})}`,textColorInfo:a,colorInfo:O(a,{alpha:.12}),colorBorderedInfo:O(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:O(a,{alpha:.12}),closeColorPressedInfo:O(a,{alpha:.18}),borderSuccess:`1px solid ${O(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:O(o,{alpha:.12}),colorBorderedSuccess:O(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:O(o,{alpha:.12}),closeColorPressedSuccess:O(o,{alpha:.18}),borderWarning:`1px solid ${O(s,{alpha:.35})}`,textColorWarning:s,colorWarning:O(s,{alpha:.15}),colorBorderedWarning:O(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:O(s,{alpha:.12}),closeColorPressedWarning:O(s,{alpha:.18}),borderError:`1px solid ${O(c,{alpha:.23})}`,textColorError:c,colorError:O(c,{alpha:.1}),colorBorderedError:O(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:O(c,{alpha:.12}),closeColorPressedError:O(c,{alpha:.18})}}var Ye={name:`Tag`,common:A,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=k(`tag`,`
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
 `,[j(`disabled`,[K(`&:hover`,`background-color: var(--n-color-checked-hover);`),K(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...V.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=I(`n-tag`),tt=c({name:`Tag`,props:$e,slots:Object,setup(e){let t=_(null),{mergedBorderedRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:a,mergedComponentPropsRef:o}=ie(e),s=l(()=>e.size||o?.value?.Tag?.size||`medium`),c=V(`Tag`,`-tag`,Ze,Ye,e,r);m(et,{roundRef:u(e,`round`)});function d(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function f(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&Y(n,t)}}let p={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},h=F(`Tag`,a,r),g=l(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=s.value,{common:{cubicBezierEaseInOut:o},self:{padding:l,closeMargin:u,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:T,[w(`colorBordered`,t)]:E,[w(`closeSize`,a)]:D,[w(`closeIconSize`,a)]:O,[w(`fontSize`,a)]:k,[w(`height`,a)]:A,[w(`color`,t)]:j,[w(`textColor`,t)]:M,[w(`border`,t)]:ee,[w(`closeIconColor`,t)]:N,[w(`closeIconColorHover`,t)]:P,[w(`closeIconColorPressed`,t)]:F,[w(`closeColorHover`,t)]:I,[w(`closeColorPressed`,t)]:L}}=c.value,R=q(u);return{"--n-font-weight-strong":T,"--n-avatar-size-override":`calc(${A} - 8px)`,"--n-bezier":o,"--n-border-radius":d,"--n-border":ee,"--n-close-icon-size":O,"--n-close-color-pressed":L,"--n-close-color-hover":I,"--n-close-border-radius":C,"--n-close-icon-color":N,"--n-close-icon-color-hover":P,"--n-close-icon-color-pressed":F,"--n-close-icon-color-disabled":N,"--n-close-margin-top":R.top,"--n-close-margin-right":R.right,"--n-close-margin-bottom":R.bottom,"--n-close-margin-left":R.left,"--n-close-size":D,"--n-color":r||(n.value?E:j),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":k,"--n-height":A,"--n-opacity-disabled":f,"--n-padding":l,"--n-text-color":i||M,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),v=i?T(`tag`,l(()=>{let t=``,{type:r,color:{color:i,textColor:a}={}}=e;return t+=r[0],t+=s.value[0],i&&(t+=`a${z(i)}`),a&&(t+=`b${z(a)}`),n.value&&(t+=`c`),t}),g,e):void 0;return{...p,rtlEnabled:h,mergedClsPrefix:r,contentRef:t,mergedBordered:n,handleClick:d,handleCloseClick:f,cssVars:i?void 0:g,themeClass:v?.themeClass,onRender:v?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:i,closable:a,color:{borderColor:s}={},round:c,onRender:l,$slots:u}=this;l?.();let d=M(u.avatar,t=>t&&(o(),r(`div`,{class:G(`${e}-tag__avatar`)},[U(()=>t)],2))),f=M(u.icon,t=>t&&(o(),r(`div`,{class:G(`${e}-tag__icon`)},[U(()=>t)],2)));return o(),r(`div`,{class:G([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:i,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:c,[`${e}-tag--avatar`]:d,[`${e}-tag--icon`]:f,[`${e}-tag--closable`]:a}]),style:t(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[U(()=>f||d),n(`span`,{class:G(`${e}-tag__content`),ref:`contentRef`},[U(()=>this.$slots.default?.())],2),!this.checkable&&a?(o(),S(Ee,{key:0,clsPrefix:e,class:G(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:c,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):U(()=>null),!this.checkable&&this.mergedBordered?(o(),r(`div`,{key:2,class:G(`${e}-tag__border`),style:t({borderColor:s})},null,6)):U(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(a(()=>{let{value:n}=e;n&&_e.registerHandler(n,t)}),b(e,(e,t)=>{t&&_e.unregisterHandler(t)},{deep:!1}),d(()=>{let{value:t}=e;t&&_e.unregisterHandler(t)}))}var it=c({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=L(`d16ead82505dc285`);return o(),r(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=c({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=s(Z);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:i,tmNode:{rawNode:a}}=this,s=i?.(a),c=t?t(a,!1):je(a[this.labelField],a,!1),l=(o(),r(`div`,C(s,{class:[`${e}-base-select-group-header`,s?.class]}),[U(()=>c)],16));return a.render?a.render({node:l,option:a}):n?n({node:l,option:a,selected:!1}):l}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=c({name:`Checkmark`,render(){return(()=>{let e=L(`3c84eac8ae4e1f96`);return e[0]||=n(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[n(`g`,{fill:`none`},[n(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return o(),S(ne,{name:`fade-in-scale-up-transition`},{default:()=>e?(o(),S(E,{key:1,clsPrefix:t,class:G(`${t}-base-select-option__check`)},{default:()=>i(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=c({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:c,valueFieldRef:l,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:p}=s(Z),m=D(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:D(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:m,isSelected:D(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[l.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:c,renderLabel:a,renderOption:o,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:i,isPending:a,isGrouped:s,showCheckmark:c,nodeProps:l,renderOption:u,renderLabel:d,handleClick:f,handleMouseEnter:p,handleMouseMove:m}=this,h=lt(i,e),g=d?[d(t,i),c&&h]:[je(t[this.labelField],t,i),c&&h],_=l?.(t),v=(o(),r(`div`,C(_,{class:[`${e}-base-select-option`,t.class,_?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:i,[`${e}-base-select-option--grouped`]:s,[`${e}-base-select-option--pending`]:a,[`${e}-base-select-option--show-checkmark`]:c}],style:[_?.style||``,t.style||``],onClick:ot([f,_?.onClick]),onMouseenter:ot([p,_?.onMouseenter]),onMousemove:ot([m,_?.onMousemove])}),[n(`div`,{class:G(`${e}-base-select-option__content`)},[U(()=>g)],2)],16,ct));return t.render?t.render({node:v,option:t,selected:i}):u?u({node:v,option:t,selected:i}):v}}),dt=k(`base-select-menu`,`
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
 `,[De({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=c({name:`InternalSelectMenu`,props:{...V.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:i}=ie(t),o=F(`InternalSelectMenu`,r,n),s=V(`InternalSelectMenu`,`-internal-select-menu`,dt,Pe,t,u(t,`clsPrefix`)),c=_(null),f=_(null),p=_(null),h=l(()=>t.treeMate.getFlattenedNodes()),g=l(()=>ue(h.value)),v=_(null);function y(){let{treeMate:e}=t,n=null,{value:r}=t;r===null?n=e.getFirstAvailableNode():(n=t.multiple?e.getNode((r||[])[(r||[]).length-1]):e.getNode(r),(!n||n.disabled)&&(n=e.getFirstAvailableNode())),B(n||null)}function x(){let{value:e}=v;e&&!t.treeMate.getNode(e.key)&&(v.value=null)}let S;b(()=>t.show,n=>{n?S=b(()=>t.treeMate,()=>{t.resetMenuOnOptionsChange?(t.autoPending?y():x(),e(H)):x()},{immediate:!0}):S?.()},{immediate:!0}),d(()=>{S?.()});let C=l(()=>W(s.value.self[w(`optionHeight`,t.size)])),E=l(()=>q(s.value.self[w(`padding`,t.size)])),D=l(()=>t.multiple&&Array.isArray(t.value)?new Set(t.value):new Set),O=l(()=>{let e=h.value;return e&&e.length===0}),k=l(()=>i?.value?.Select?.renderEmpty);function A(e){let{onToggle:n}=t;n&&n(e)}function j(e){let{onScroll:n}=t;n&&n(e)}function M(e){p.value?.sync(),j(e)}function ee(){p.value?.sync()}function N(){let{value:e}=v;return e||null}function P(e,t){t.disabled||B(t,!1)}function I(e,t){t.disabled||A(t)}function L(e){ce(e,`action`)||t.onKeyup?.(e)}function R(e){ce(e,`action`)||t.onKeydown?.(e)}function te(e){t.onMousedown?.(e),!t.focusable&&e.preventDefault()}function z(){let{value:e}=v;e&&B(e.getNext({loop:!0}),!0)}function ne(){let{value:e}=v;e&&B(e.getPrev({loop:!0}),!0)}function B(e,t=!1){v.value=e,t&&H()}function H(){let e=v.value;if(!e)return;let n=g.value(e.key);n!==null&&(t.virtualScroll?f.value?.scrollTo({index:n}):p.value?.scrollTo({index:n,elSize:C.value}))}function U(e){c.value?.contains(e.target)&&t.onFocus?.(e)}function re(e){c.value?.contains(e.relatedTarget)||t.onBlur?.(e)}m(Z,{handleOptionMouseEnter:P,handleOptionClick:I,valueSetRef:D,pendingTmNodeRef:v,nodePropsRef:u(t,`nodeProps`),showCheckmarkRef:u(t,`showCheckmark`),multipleRef:u(t,`multiple`),valueRef:u(t,`value`),renderLabelRef:u(t,`renderLabel`),renderOptionRef:u(t,`renderOption`),labelFieldRef:u(t,`labelField`),valueFieldRef:u(t,`valueField`)}),m(ge,c),a(()=>{let{value:e}=p;e&&e.sync()});let G=l(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:o,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[w(`optionFontSize`,e)]:x,[w(`optionHeight`,e)]:S,[w(`optionPadding`,e)]:C}}=s.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":o,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":q(C,`left`),"--n-option-padding-right":q(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:K}=t,ae=K?T(`internal-select-menu`,l(()=>t.size[0]),G,t):void 0,J={selfRef:c,next:z,prev:ne,getPendingTmNode:N};return rt(c,t.onResize),{mergedTheme:s,mergedClsPrefix:n,rtlEnabled:o,virtualListRef:f,scrollbarRef:p,itemSize:C,padding:E,flattenedNodes:h,empty:O,mergedRenderEmpty:k,virtualListContainer(){let{value:e}=f;return e?.listElRef},virtualListContent(){let{value:e}=f;return e?.itemsElRef},doScroll:j,handleFocusin:U,handleFocusout:re,handleKeyUp:L,handleKeyDown:R,handleMouseDown:te,handleVirtualListResize:ee,handleVirtualListScroll:M,cssVars:K?void 0:G,themeClass:ae?.themeClass,onRender:ae?.onRender,...J}},render(){let{$slots:e,virtualScroll:n,clsPrefix:i,mergedTheme:a,themeClass:s,onRender:c}=this;return c?.(),o(),r(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:G([`${i}-base-select-menu`,`${i}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${i}-base-select-menu--rtl`,s,this.multiple&&`${i}-base-select-menu--multiple`]),style:t(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[U(()=>M(e.header,e=>e&&(o(),r(`div`,{class:G(`${i}-base-select-menu__header`),"data-header":!0,key:`header`},[U(()=>e)],2)))),this.loading?(o(),r(`div`,{key:0,class:G(`${i}-base-select-menu__loading`)},[(o(),S(H,{clsPrefix:i,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(o(),r(g,{key:1},[this.empty?(o(),r(`div`,{key:1,class:G(`${i}-base-select-menu__empty`),"data-empty":!0},[U(()=>R(e.empty,()=>[this.mergedRenderEmpty?.()||(o(),S(X,{theme:a.peers.Empty,themeOverrides:a.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(o(),S(xe,C({key:0,ref:`scrollbarRef`,theme:a.peers.Scrollbar,themeOverrides:a.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},this.scrollbarProps),{default:()=>n?(o(),S(Ge,{key:1,ref:`virtualListRef`,class:G(`${i}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(o(),S(at,{key:e.key,clsPrefix:i,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(o(),S(ut,{clsPrefix:i,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(o(),r(`div`,{key:4,class:G(`${i}-base-select-menu-option-wrapper`),style:t({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[U(()=>this.flattenedNodes.map(e=>e.isGroup?(o(),S(at,{key:e.key,clsPrefix:i,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(o(),S(ut,{clsPrefix:i,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),U(()=>M(e.action,e=>e&&[(o(),r(`div`,{class:G(`${i}-base-select-menu__action`),"data-action":!0,key:`action`},[U(()=>e)],2)),(o(),S(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=K([k(`base-selection`,`
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
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=c({name:`InternalSelection`,props:{...V.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r}=ie(t),i=F(`InternalSelection`,r,n),o=_(null),s=_(null),c=_(null),d=_(null),f=_(null),p=_(null),m=_(null),h=_(null),g=_(null),y=_(null),x=_(!1),S=_(!1),C=_(!1),E=V(`InternalSelection`,`-internal-selection`,bt,Ae,t,u(t,`clsPrefix`)),D=l(()=>t.clearable&&!t.disabled&&(C.value||t.active)),O=l(()=>t.selectedOption?t.renderTag?t.renderTag({option:t.selectedOption,handleClose:()=>{}}):t.renderLabel?t.renderLabel(t.selectedOption,!0):je(t.selectedOption[t.labelField],t.selectedOption,!0):t.placeholder),k=l(()=>{let e=t.selectedOption;if(e)return e[t.labelField]}),A=l(()=>t.multiple?!!(Array.isArray(t.selectedOptions)&&t.selectedOptions.length):t.selectedOption!==null);function j(){let{value:e}=o;if(e){let{value:n}=s;n&&(n.style.width=`${e.offsetWidth}px`,t.maxTagCount!==`responsive`&&g.value?.sync({showAllItemsBeforeCalculate:!1}))}}function M(){let{value:e}=y;e&&(e.style.display=`none`)}function ee(){let{value:e}=y;e&&(e.style.display=`inline-block`)}b(u(t,`active`),e=>{e||M()}),b(u(t,`pattern`),()=>{t.multiple&&e(j)});function N(e){let{onFocus:n}=t;n&&n(e)}function P(e){let{onBlur:n}=t;n&&n(e)}function I(e){let{onDeleteOption:n}=t;n&&n(e)}function L(e){let{onClear:n}=t;n&&n(e)}function R(e){let{onPatternInput:n}=t;n&&n(e)}function te(e){(!e.relatedTarget||!c.value?.contains(e.relatedTarget))&&N(e)}function z(e){c.value?.contains(e.relatedTarget)||P(e)}function ne(e){L(e)}function B(){C.value=!0}function H(){C.value=!1}function U(e){t.active&&t.filterable&&e.target!==s.value&&e.preventDefault()}function re(e){I(e)}let W=_(!1);function G(e){if(e.key===`Backspace`&&!W.value&&!t.pattern.length){let{selectedOptions:e}=t;e?.length&&re(e[e.length-1])}}let K=null;function ae(e){let{value:n}=o;n&&(n.textContent=e.target.value,j()),t.ignoreComposition&&W.value?K=e:R(e)}function J(){W.value=!0}function Y(){W.value=!1,t.ignoreComposition&&R(K),K=null}function oe(e){S.value=!0,t.onPatternFocus?.(e)}function X(e){S.value=!1,t.onPatternBlur?.(e)}function se(){if(t.filterable)S.value=!1,p.value?.blur(),s.value?.blur();else if(t.multiple){let{value:e}=d;e?.blur()}else{let{value:e}=f;e?.blur()}}function Z(){t.filterable?(S.value=!1,p.value?.focus()):t.multiple?d.value?.focus():f.value?.focus()}function ce(){let{value:e}=s;e&&(ee(),e.focus())}function le(){let{value:e}=s;e&&e.blur()}function ue(e){let{value:t}=m;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=h;return e}function fe(){return s.value}let pe=null;function me(){pe!==null&&window.clearTimeout(pe)}function he(){t.active||(me(),pe=window.setTimeout(()=>{A.value&&(x.value=!0)},100))}function ge(){me()}function _e(e){e||(me(),x.value=!1)}b(A,e=>{e||(x.value=!1)}),a(()=>{v(()=>{let e=p.value;e&&(t.disabled?e.removeAttribute(`tabindex`):e.tabIndex=S.value?-1:0)})}),rt(c,t.onResize);let{inlineThemeDisabled:ve}=t,ye=l(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:C,loadingColor:T,colorActiveWarning:D,boxShadowFocusWarning:O,boxShadowActiveWarning:k,boxShadowHoverWarning:A,borderWarning:j,borderFocusWarning:M,borderHoverWarning:ee,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:F,boxShadowActiveError:I,boxShadowHoverError:L,borderError:R,borderFocusError:te,borderHoverError:z,borderActiveError:ne,clearColor:B,clearColorHover:V,clearColorPressed:H,clearSize:U,arrowSize:re,[w(`height`,e)]:ie,[w(`fontSize`,e)]:W}}=E.value,G=q(c),K=q(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":W,"--n-height":ie,"--n-padding-single-top":G.top,"--n-padding-multiple-top":K.top,"--n-padding-single-right":G.right,"--n-padding-multiple-right":K.right,"--n-padding-single-left":G.left,"--n-padding-multiple-left":K.left,"--n-padding-single-bottom":G.bottom,"--n-padding-multiple-bottom":K.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":C,"--n-loading-color":T,"--n-color-active-warning":D,"--n-box-shadow-focus-warning":O,"--n-box-shadow-active-warning":k,"--n-box-shadow-hover-warning":A,"--n-border-warning":j,"--n-border-focus-warning":M,"--n-border-hover-warning":ee,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":F,"--n-box-shadow-active-error":I,"--n-box-shadow-hover-error":L,"--n-border-error":R,"--n-border-focus-error":te,"--n-border-hover-error":z,"--n-border-active-error":ne,"--n-clear-size":U,"--n-clear-color":B,"--n-clear-color-hover":V,"--n-clear-color-pressed":H,"--n-arrow-size":re,"--n-font-weight":r}}),be=ve?T(`internal-selection`,l(()=>t.size[0]),ye,t):void 0;return{mergedTheme:E,mergedClearable:D,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:S,filterablePlaceholder:O,label:k,selected:A,showTagsPanel:x,isComposing:W,counterRef:m,counterWrapperRef:h,patternInputMirrorRef:o,patternInputRef:s,selfRef:c,multipleElRef:d,singleElRef:f,patternInputWrapperRef:p,overflowRef:g,inputTagElRef:y,handleMouseDown:U,handleFocusin:te,handleClear:ne,handleMouseEnter:B,handleMouseLeave:H,handleDeleteOption:re,handlePatternKeyDown:G,handlePatternInputInput:ae,handlePatternInputBlur:X,handlePatternInputFocus:oe,handleMouseEnterCounter:he,handleMouseLeaveCounter:ge,handleFocusout:z,handleCompositionEnd:Y,handleCompositionStart:J,onPopoverUpdateShow:_e,focus:Z,focusInput:ce,blur:se,blurInput:le,updateCounter:ue,getCounter:de,getTail:fe,renderLabel:t.renderLabel,cssVars:ve?void 0:ye,themeClass:be?.themeClass,onRender:be?.onRender}},render(){let{status:e,multiple:i,size:a,disabled:s,filterable:c,maxTagCount:l,bordered:u,clsPrefix:d,ellipsisTagPopoverProps:f,onRender:p,renderTag:m,renderLabel:h}=this;p?.();let _=l===`responsive`,v=typeof l==`number`,y=_||v,b=(o(),S(ye,null,{default:()=>(o(),S(Te,{clsPrefix:d,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),x;if(i){let{labelField:e}=this,t=t=>(o(),r(`div`,{class:G(`${d}-base-selection-tag-wrapper`),key:t.value},[m?(o(),r(g,{key:0},[U(()=>m({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(o(),S(tt,{key:1,size:a,closable:!t.disabled,disabled:s,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>h?h(t,!0):je(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),i=()=>(v?this.selectedOptions.slice(0,l):this.selectedOptions).map(t),u=c?(o(),r(`div`,{class:G(`${d}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[n(`input`,C(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:s,value:this.pattern,autofocus:this.autofocus,class:`${d}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),n(`span`,{ref:`patternInputMirrorRef`,class:G(`${d}-base-selection-input-tag__mirror`)},[U(()=>this.pattern)],2)],2)):null,p=_?()=>(o(),r(`div`,{class:G(`${d}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(o(),S(tt,{size:a,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:s},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,w;if(v){let e=this.selectedOptions.length-l;e>0&&(w=(t=>(o(),r(`div`,{class:G(`${d}-base-selection-tag-wrapper`),key:`__counter__`},[(o(),S(tt,{size:a,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:s},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(w))}let T=_?c?(o(),S(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:i,counter:p,tail:()=>u},1032,[`updateCounter`,`getCounter`,`getTail`])):(o(),S(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:i,counter:p},1032,[`updateCounter`,`getCounter`])):v&&w?i().concat(w):i(),E=y?()=>(o(),r(`div`,{class:G(`${d}-base-selection-popover`)},[_?(o(),r(g,{key:0},[U(()=>i())],64)):(o(),r(g,{key:1},[U(()=>this.selectedOptions.map(t))],64))],2)):void 0,D=y?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...f}:null,O=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(o(),r(`div`,{key:5,class:G(`${d}-base-selection-placeholder ${d}-base-selection-overlay`)},[n(`div`,{class:G(`${d}-base-selection-placeholder__inner`)},[U(()=>this.placeholder)],2)],2)):null,k=c?(o(),r(`div`,{key:6,ref:`patternInputWrapperRef`,class:G(`${d}-base-selection-tags`)},[U(()=>T),_?U(()=>null):(o(),r(g,{key:1},[U(()=>u)],64)),U(()=>b)],2)):(o(),r(`div`,{key:7,ref:`multipleElRef`,class:G(`${d}-base-selection-tags`),tabindex:s?void 0:0},[U(()=>T),U(()=>b)],10,St));x=(e=>(o(),r(g,{key:8},[y?(o(),S(pe,C({key:0},D,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>k,default:E},1040)):(o(),r(g,{key:1},[U(()=>k)],64)),U(()=>O)],64)))(x)}else if(c){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,i=!this.active&&this.selected;x=(e=>(o(),r(`div`,{key:9,ref:`patternInputWrapperRef`,class:G(`${d}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[n(`input`,C(this.inputProps,{ref:`patternInputRef`,class:`${d}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:s,disabled:s,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),i?(o(),r(`div`,{class:G(`${d}-base-selection-label__render-label ${d}-base-selection-overlay`),key:`input`},[n(`div`,{class:G(`${d}-base-selection-overlay__wrapper`)},[m?(o(),r(g,{key:0},[U(()=>m({option:this.selectedOption,handleClose:()=>{}}))],64)):(o(),r(g,{key:1},[h?(o(),r(g,{key:0},[U(()=>h(this.selectedOption,!0))],64)):(o(),r(g,{key:1},[U(()=>je(this.label,this.selectedOption,!0))],64))],64))],2)],2)):U(()=>null),t?(o(),r(`div`,{class:G(`${d}-base-selection-placeholder ${d}-base-selection-overlay`),key:`placeholder`},[n(`div`,{class:G(`${d}-base-selection-overlay__wrapper`)},[U(()=>this.filterablePlaceholder)],2)],2)):U(()=>null),U(()=>b)],10,Ct)))(x)}else x=(e=>(o(),r(`div`,{key:10,ref:`singleElRef`,class:G(`${d}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(o(),r(`div`,{class:G(`${d}-base-selection-placeholder ${d}-base-selection-overlay`),key:`placeholder`},[n(`div`,{class:G(`${d}-base-selection-placeholder__inner`)},[U(()=>this.placeholder)],2)],2)):(o(),r(`div`,{class:G(`${d}-base-selection-input`),title:nt(this.label),key:`input`},[n(`div`,{class:G(`${d}-base-selection-input__content`)},[m?(o(),r(g,{key:0},[U(()=>m({option:this.selectedOption,handleClose:()=>{}}))],64)):(o(),r(g,{key:1},[h?(o(),r(g,{key:0},[U(()=>h(this.selectedOption,!0))],64)):(o(),r(g,{key:1},[U(()=>je(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),U(()=>b)],10,Tt)))(x);return o(),r(`div`,{ref:`selfRef`,class:G([`${d}-base-selection`,this.rtlEnabled&&`${d}-base-selection--rtl`,this.themeClass,e&&`${d}-base-selection--${e}-status`,{[`${d}-base-selection--active`]:this.active,[`${d}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${d}-base-selection--disabled`]:this.disabled,[`${d}-base-selection--multiple`]:this.multiple,[`${d}-base-selection--focus`]:this.focused}]),style:t(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[U(()=>x),u?(o(),r(`div`,{key:0,class:G(`${d}-base-selection__border`)},null,2)):U(()=>null),u?(o(),r(`div`,{key:2,class:G(`${d}-base-selection__state-border`)},null,2)):U(()=>null)],46,Et)}}),Ot=K([k(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),k(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[De({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...V.props,to:le.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=c({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=ie(e),o=V(`Select`,`-select`,Ot,ke,e,t),s=_(e.defaultValue),c=u(e,`value`),d=we(c,s),f=_(!1),p=_(``),m=Ce(e,[`items`,`options`]),h=_([]),g=_([]),v=l(()=>g.value.concat(h.value).concat(m.value)),y=l(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),x=l(()=>{if(e.remote)return m.value;{let{value:t}=v,{value:n}=p;return!n.length||!e.filterable?t:vt(t,y.value,n,e.childrenField)}}),S=l(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return he(x.value,r)}),C=l(()=>yt(v.value,e.valueField,e.childrenField)),w=_(!1),E=we(u(e,`show`),w),D=_(null),O=_(null),k=_(null),{localeRef:A}=oe(`Select`),j=l(()=>e.placeholder??A.value.placeholder),M=[],N=_(new Map),P=l(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function F(t){let n=e.remote,{value:r}=N,{value:i}=C,{value:a}=P,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let I=l(()=>{if(e.multiple){let{value:e}=d;return Array.isArray(e)?F(e):[]}return null}),L=l(()=>{let{value:t}=d;return!e.multiple&&!Array.isArray(t)?t===null?null:F([t])[0]||null:null}),R=re(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:a?.value?.Select?.size||`medium`}}),{mergedSizeRef:te,mergedDisabledRef:z,mergedStatusRef:ne}=R;function B(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:c}=R;r&&Y(r,t,n),a&&Y(a,t,n),i&&Y(i,t,n),s.value=t,o(),c()}function H(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=R;n&&Y(n,t),r()}function U(){let{onClear:t}=e;t&&Y(t)}function W(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=R;n&&Y(n,t),i(),r&&J()}function G(t){let{onSearch:n}=e;n&&Y(n,t)}function K(t){let{onScroll:n}=e;n&&Y(n,t)}function q(){let{remote:t,multiple:n}=e;if(t){let{value:t}=N;if(n){let{valueField:n}=e;I.value?.forEach(e=>{t.set(e[n],e)})}else{let n=L.value;n&&t.set(n[e.valueField],n)}}}function ae(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&Y(n,t),r&&Y(r,t),w.value=t}function J(){z.value||(ae(!0),w.value=!0,e.filterable&&Pe())}function X(){ae(!1)}function se(){p.value=``,g.value=M}let Z=_(!1);function ue(){e.filterable&&(Z.value=!0)}function de(){e.filterable&&(Z.value=!1,E.value||se())}function fe(){z.value||(E.value?e.filterable?Pe():X():J())}function pe(e){k.value?.selfRef?.contains(e.relatedTarget)||(f.value=!1,H(e),X())}function me(e){W(e),f.value=!0}function ge(){f.value=!0}function _e(e){D.value?.$el.contains(e.relatedTarget)||(f.value=!1,H(e),X())}function ye(){D.value?.focus(),X()}function be(e){E.value&&(D.value?.$el.contains(ve(e))||X())}function xe(t){if(!Array.isArray(t))return[];if(P.value)return Array.from(t);{let{remote:n}=e,{value:r}=C;if(n){let{value:e}=N;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function Se(e){Q(e.rawNode)}function Q(t){if(z.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=g,t=e[0]||null;if(t){let e=h.value;e.length?e.push(t):h.value=[t],g.value=M}}if(r&&N.value.set(t[a],t),e.multiple){let e=xe(d.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Te(t[a]);~e&&(h.value.splice(e,1),i&&(p.value=``))}}else e.push(t[a]),i&&(p.value=``);B(e,F(e))}else{if(n&&!r){let e=Te(t[a]);~e?h.value=[h.value[e]]:h.value=M}Ne(),X(),B(t[a],t)}}function Te(t){return h.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){E.value||J();let{value:n}=t.target;p.value=n;let{tag:r,remote:i}=e;if(G(n),r&&!i){if(!n){g.value=M;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;m.value.some(e=>e[i]===r[i]||e[a]===r[a])||h.value.some(e=>e[i]===r[i]||e[a]===r[a])?g.value=M:g.value=[r]}}function De(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&X(),r&&!i&&a&&(h.value=M),U(),n?B([],[]):B(null,null)}function Ae(e){!ce(e,`action`)&&!ce(e,`empty`)&&!ce(e,`header`)&&e.preventDefault()}function je(e){K(e)}function Me(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!D.value?.isComposing){if(E.value){let t=k.value?.getPendingTmNode();t?Se(t):e.filterable||(X(),Ne())}else if(J(),e.tag&&Z.value){let t=g.value[0];if(t){let n=t[e.valueField],{value:r}=d;e.multiple&&Array.isArray(r)&&r.includes(n)||Q(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;E.value&&k.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;E.value?k.value?.next():J();break;case`Escape`:E.value&&(Oe(t),X()),D.value?.focus()}}function Ne(){D.value?.focus()}function Pe(){D.value?.focusInput()}function Fe(){E.value&&O.value?.syncPosition()}q(),b(u(e,`options`),q);let Ie={focus:()=>{D.value?.focus()},focusInput:()=>{D.value?.focusInput()},blur:()=>{D.value?.blur()},blurInput:()=>{D.value?.blurInput()}},Le=l(()=>{let{self:{menuBoxShadow:e}}=o.value;return{"--n-menu-box-shadow":e}}),Re=i?T(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:ne,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:S,isMounted:ee(),triggerRef:D,menuRef:k,pattern:p,uncontrolledShow:w,mergedShow:E,adjustedTo:le(e),uncontrolledValue:s,mergedValue:d,followerRef:O,localizedPlaceholder:j,selectedOption:L,selectedOptions:I,mergedSize:te,mergedDisabled:z,focused:f,activeWithoutMenuOpen:Z,inlineThemeDisabled:i,onTriggerInputFocus:ue,onTriggerInputBlur:de,handleTriggerOrMenuResize:Fe,handleMenuFocus:ge,handleMenuBlur:_e,handleMenuTabOut:ye,handleTriggerClick:fe,handleToggle:Se,handleDeleteOption:Q,handlePatternInput:Ee,handleClear:De,handleTriggerBlur:pe,handleTriggerFocus:me,handleKeydown:Me,handleMenuAfterLeave:se,handleMenuClickOutside:be,handleMenuScroll:je,handleMenuKeydown:Me,handleMenuMousedown:Ae,mergedTheme:o,cssVars:i?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return o(),r(`div`,{class:G(`${this.mergedClsPrefix}-select`)},[x(se,null,{_:1,default:J(()=>[(o(),S(me,null,{_:1,default:J(()=>(o(),S(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:J(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(o(),S(de,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===le.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:J(()=>(o(),S(ne,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:J(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),y((o(),S(pt,C(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:J(()=>[this.$slots.empty?.()]),header:J(()=>[this.$slots.header?.()]),action:J(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[ae,this.mergedShow],[Me,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Me,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};