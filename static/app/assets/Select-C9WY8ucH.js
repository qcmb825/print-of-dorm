import{$n as e,An as t,B as n,Bn as r,Cn as i,D as a,Dn as o,F as s,Fn as c,Gn as l,Hn as u,I as d,In as f,Jn as p,Kn as m,L as h,Ln as g,N as _,Nn as v,O as y,Qn as b,Rn as x,St as S,T as C,Tn as w,Tt as T,V as E,Vn as D,W as O,_t as k,an as A,b as j,dr as M,dt as N,fn as P,ft as F,gr as I,hn as L,ht as R,in as z,j as ee,jn as B,mt as V,nn as H,nr as U,on as W,pt as G,sn as K,tn as q,ut as J,wn as Y,xr as X,yn as Z,yt as te,z as ne}from"./endpoints-gDUDUnKI.js";import{t as re}from"./use-locale-fRdQHsG2.js";import{a as ie,c as Q,i as ae,l as oe,o as se,s as ce,t as le,u as ue}from"./Popover-DARfIN_e.js";import{n as de,r as fe,t as pe}from"./create-CLOJQO3W.js";import{t as me}from"./Empty-ByG1ebw9.js";import{i as he,n as ge,r as _e,t as ve}from"./cssr-nvHT-q9I.js";import{n as ye}from"./Input-Bz_s8aeD.js";import{$ as be,A as xe,B as Se,F as Ce,I as we,St as Te,X as Ee,Y as De,bt as Oe,et as ke,q as Ae,rt as je,st as Me,xt as Ne,z as Pe}from"./index-DmEbPUOi.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=M(0),a=M(0),o=i(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),s=h(()=>{let e=o.value;return e===null?0:Math.max(e.getBound(a.value)-1,0)}),c=e=>{let t=o.value;return t===null?0:t.sum(e)},l=h(()=>{let t=o.value;return t===null?0:Math.min(t.getBound(a.value+r.value)+1,e.value.length-1)});return m(Ve,{startIndexRef:s,endIndexRef:l,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:c}),{listWidthRef:r,scrollLeftRef:a}}var Ue=B({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=c(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=ve(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[ve(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[ve(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=B({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=te();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:ge,ssr:t}),u(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&y({key:n}):y({index:t})});let n=!1,r=!1;x(()=>{if(n=!1,!r){r=!0;return}y({top:g.value,left:s.value})}),D(()=>{n=!0,r||=!0});let a=h(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=i(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=He({columnsRef:I(e,`columns`),renderColRef:I(e,`renderCol`),renderItemWithColsRef:I(e,`renderItemWithCols`)}),l=M(null),d=M(void 0),f=new Map,p=i(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=f.get(n);a!==void 0&&i.add(t,a)}),i}),m=M(0),g=M(0),_=h(()=>Math.max(p.value.getBound(g.value-J(e.paddingTop))-1,0)),v=i(()=>{let{value:t}=d;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=_.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),y=(e,t)=>{if(typeof e==`number`){w(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)w(n,r,c);else if(i!==void 0)C(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&C(e,c,l)}else s===`bottom`?w(0,2**53-1,c):s===`top`&&w(0,0,c)},b,S=null;function C(t,n,r){let i=l.value;if(i==null)return;let{value:a}=p,o=a.sum(t)+J(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{b=t,S!==null&&window.clearTimeout(S),S=window.setTimeout(()=>{b=void 0,S=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function w(e,t,n){l.value?.scrollTo({left:e,top:t,behavior:n})}function T(t,r){if(n||e.ignoreItemResize||P(r.target))return;let{value:i}=p,a=o.value.get(t),s=i.get(a),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?f.delete(t):f.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(a,u);let d=l.value;if(d!=null){if(b===void 0){let e=i.sum(a);d.scrollTop>e&&d.scrollBy(0,u)}else(a<b||a===b&&c+i.sum(a)>d.scrollTop+d.offsetHeight)&&d.scrollBy(0,u);N()}m.value++}let E=!Re(),O=!1;function k(t){var n;(n=e.onScroll)==null||n.call(e,t),(!E||!O)&&N()}function A(t){var n;if((n=e.onWheel)==null||n.call(e,t),E){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),N(),O=!0,ue(()=>{O=!1})}}}function j(t){if(n||P(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===d.value)return}else if(t.contentRect.height===d.value&&t.contentRect.width===c.value)return;d.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function N(){let{value:e}=l;e!=null&&(g.value=e.scrollTop,s.value=e.scrollLeft)}function P(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:d,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:i(()=>{let{itemResizable:t}=e,n=F(p.value.sum());return m.value,[e.itemsStyle,{boxSizing:`content-box`,width:F(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:F(e.paddingTop),paddingBottom:F(e.paddingBottom)}]}),visibleItemsStyle:i(()=>(m.value,{transform:`translateY(${F(p.value.sum(_.value))})`})),viewportItems:v,listElRef:l,itemsElRef:M(null),scrollTo:y,handleListResize:j,handleListScroll:k,handleListWheel:A,handleItemResize:T}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return v(be,{onResize:this.handleListResize},{default:()=>{var i;return v(`div`,f(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):v(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[v(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let o=a[t],s=n.get(o),c=r==null?void 0:v(Ue,{index:s,item:a}),l=i==null?void 0:v(Ue,{index:s,item:a}),u=this.$slots.default({item:a,renderedCols:c,renderedItemWithCols:l,index:s})[0];return e?v(be,{key:o,onResize:e=>this.handleItemResize(o,e)},{default:()=>u}):(u.key=o,u)})}})])])}})}}),$=`v-hidden`,Ke=ve(`[v-hidden]`,{display:`none!important`}),qe=B({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=M(null),r=M(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let a=te();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:ge,ssr:a}),u(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:e}=this;return g(()=>this.sync({showAllItemsBeforeCalculate:!1})),v(`div`,{class:`v-overflow`,ref:`selfRef`},[p(e,`default`),e.counter?e.counter():v(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:D,buttonColor2Pressed:k,fontWeightStrong:A}=e;return{...De,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:A,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:D,colorPressedCheckable:k,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${O(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:O(i,{alpha:.12}),colorBorderedPrimary:O(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:O(i,{alpha:.12}),closeColorPressedPrimary:O(i,{alpha:.18}),borderInfo:`1px solid ${O(a,{alpha:.3})}`,textColorInfo:a,colorInfo:O(a,{alpha:.12}),colorBorderedInfo:O(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:O(a,{alpha:.12}),closeColorPressedInfo:O(a,{alpha:.18}),borderSuccess:`1px solid ${O(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:O(o,{alpha:.12}),colorBorderedSuccess:O(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:O(o,{alpha:.12}),closeColorPressedSuccess:O(o,{alpha:.18}),borderWarning:`1px solid ${O(s,{alpha:.35})}`,textColorWarning:s,colorWarning:O(s,{alpha:.15}),colorBorderedWarning:O(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:O(s,{alpha:.12}),closeColorPressedWarning:O(s,{alpha:.18}),borderError:`1px solid ${O(c,{alpha:.23})}`,textColorError:c,colorError:O(c,{alpha:.1}),colorBorderedError:O(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:O(c,{alpha:.12}),closeColorPressedError:O(c,{alpha:.18})}}var Ye={name:`Tag`,common:E,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=H(`tag`,`
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
`,[A(`strong`,`
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
 `),A(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[z(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),z(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),A(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),A(`icon, avatar`,[A(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),A(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),A(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[W(`disabled`,[q(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[W(`checked`,`color: var(--n-text-color-hover-checkable);`)]),q(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[W(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),A(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[W(`disabled`,[q(`&:hover`,`background-color: var(--n-color-checked-hover);`),q(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...ne.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=T(`n-tag`),tt=B({name:`Tag`,props:$e,slots:Object,setup(e){let t=M(null),{mergedBorderedRef:r,mergedClsPrefixRef:o,inlineThemeDisabled:c,mergedRtlRef:l,mergedComponentPropsRef:u}=S(e),d=i(()=>e.size||u?.value?.Tag?.size||`medium`),f=ne(`Tag`,`-tag`,Ze,Ye,e,o);m(et,{roundRef:I(e,`round`)});function p(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function h(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&s(n,t)}}let g={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},_=y(`Tag`,l,o),v=i(()=>{let{type:t,color:{color:n,textColor:i}={}}=e,a=d.value,{common:{cubicBezierEaseInOut:o},self:{padding:s,closeMargin:c,borderRadius:l,opacityDisabled:u,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[K(`colorBordered`,t)]:T,[K(`closeSize`,a)]:E,[K(`closeIconSize`,a)]:D,[K(`fontSize`,a)]:O,[K(`height`,a)]:k,[K(`color`,t)]:A,[K(`textColor`,t)]:j,[K(`border`,t)]:M,[K(`closeIconColor`,t)]:P,[K(`closeIconColorHover`,t)]:F,[K(`closeIconColorPressed`,t)]:I,[K(`closeColorHover`,t)]:L,[K(`closeColorPressed`,t)]:R}}=f.value,z=N(c);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${k} - 8px)`,"--n-bezier":o,"--n-border-radius":l,"--n-border":M,"--n-close-icon-size":D,"--n-close-color-pressed":R,"--n-close-color-hover":L,"--n-close-border-radius":C,"--n-close-icon-color":P,"--n-close-icon-color-hover":F,"--n-close-icon-color-pressed":I,"--n-close-icon-color-disabled":P,"--n-close-margin-top":z.top,"--n-close-margin-right":z.right,"--n-close-margin-bottom":z.bottom,"--n-close-margin-left":z.left,"--n-close-size":E,"--n-color":n||(r.value?T:A),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":O,"--n-height":k,"--n-opacity-disabled":u,"--n-padding":s,"--n-text-color":i||j,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),b=c?n(`tag`,i(()=>{let t=``,{type:n,color:{color:i,textColor:o}={}}=e;return t+=n[0],t+=d.value[0],i&&(t+=`a${a(i)}`),o&&(t+=`b${a(o)}`),r.value&&(t+=`c`),t}),v,e):void 0;return{...g,rtlEnabled:_,mergedClsPrefix:o,contentRef:t,mergedBordered:r,handleClick:p,handleCloseClick:h,cssVars:c?void 0:v,themeClass:b?.themeClass,onRender:b?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:n,color:{borderColor:r}={},round:i,onRender:a,$slots:s}=this;a?.();let c=_(s.avatar,t=>t&&(l(),o(`div`,{class:V(`${e}-tag__avatar`)},[k(()=>t)],2))),u=_(s.icon,t=>t&&(l(),o(`div`,{class:V(`${e}-tag__icon`)},[k(()=>t)],2)));return l(),o(`div`,{class:V([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:i,[`${e}-tag--avatar`]:c,[`${e}-tag--icon`]:u,[`${e}-tag--closable`]:n}]),style:X(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[k(()=>u||c),Y(`span`,{class:V(`${e}-tag__content`),ref:`contentRef`},[k(()=>this.$slots.default?.())],2),!this.checkable&&n?(l(),w(Ae,{key:0,clsPrefix:e,class:V(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:i,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):k(()=>null),!this.checkable&&this.mergedBordered?(l(),o(`div`,{key:2,class:V(`${e}-tag__border`),style:X({borderColor:r})},null,6)):k(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(u(()=>{let{value:n}=e;n&&ke.registerHandler(n,t)}),b(e,(e,t)=>{t&&ke.unregisterHandler(t)},{deep:!1}),r(()=>{let{value:t}=e;t&&ke.unregisterHandler(t)}))}var it=B({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=G(`d16ead82505dc285`);return l(),o(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=B({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=c(oe);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),s=t?t(i,!1):Se(i[this.labelField],i,!1),c=(l(),o(`div`,f(a,{class:[`${e}-base-select-group-header`,a?.class]}),[k(()=>s)],16));return i.render?i.render({node:c,option:i}):n?n({node:c,option:i,selected:!1}):c}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=B({name:`Checkmark`,render(){return(()=>{let e=G(`3c84eac8ae4e1f96`);return e[0]||=Y(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[Y(`g`,{fill:`none`},[Y(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return l(),w(P,{name:`fade-in-scale-up-transition`},{default:()=>e?(l(),w(Ne,{key:1,clsPrefix:t,class:V(`${t}-base-select-option__check`)},{default:()=>v(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=B({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:l,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:p}=c(oe),m=h(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function g(t){let{tmNode:n}=e;n.disabled||f(t,n)}function _(t){let{tmNode:n}=e;n.disabled||p(t,n)}function v(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:h(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:m,isSelected:h(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[l.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:v,handleMouseEnter:_,handleClick:g}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:s,renderOption:c,renderLabel:u,handleClick:d,handleMouseEnter:p,handleMouseMove:m}=this,h=lt(n,e),g=u?[u(t,n),a&&h]:[Se(t[this.labelField],t,n),a&&h],_=s?.(t),v=(l(),o(`div`,f(_,{class:[`${e}-base-select-option`,t.class,_?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[_?.style||``,t.style||``],onClick:ot([d,_?.onClick]),onMouseenter:ot([p,_?.onMouseenter]),onMousemove:ot([m,_?.onMousemove])}),[Y(`div`,{class:V(`${e}-base-select-option__content`)},[k(()=>g)],2)],16,ct));return t.render?t.render({node:v,option:t,selected:n}):c?c({node:v,option:t,selected:n}):v}}),dt=H(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[H(`scrollbar`,`
 max-height: var(--n-height);
 `),H(`virtual-list`,`
 max-height: var(--n-height);
 `),H(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[z(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),H(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),H(`base-select-menu-option-wrapper`,`
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
 `),H(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),H(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[A(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),q(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),q(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),A(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),A(`pending`,[q(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),A(`selected`,`
 color: var(--n-option-text-color-active);
 `,[q(`&::before`,`
 background-color: var(--n-option-color-active);
 `),A(`pending`,[q(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),A(`disabled`,`
 cursor: not-allowed;
 `,[W(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),A(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),z(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Pe({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=B({name:`InternalSelectMenu`,props:{...ne.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:a,mergedComponentPropsRef:o}=S(e),s=y(`InternalSelectMenu`,a,t),c=ne(`InternalSelectMenu`,`-internal-select-menu`,dt,Oe,e,I(e,`clsPrefix`)),l=M(null),d=M(null),f=M(null),p=i(()=>e.treeMate.getFlattenedNodes()),h=i(()=>de(p.value)),_=M(null);function v(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),U(n||null)}function x(){let{value:t}=_;t&&!e.treeMate.getNode(t.key)&&(_.value=null)}let C;b(()=>e.show,t=>{t?C=b(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?v():x(),g(W)):x()},{immediate:!0}):C?.()},{immediate:!0}),r(()=>{C?.()});let w=i(()=>J(c.value.self[K(`optionHeight`,e.size)])),T=i(()=>N(c.value.self[K(`padding`,e.size)])),E=i(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),D=i(()=>{let e=p.value;return e&&e.length===0}),O=i(()=>o?.value?.Select?.renderEmpty);function k(t){let{onToggle:n}=e;n&&n(t)}function A(t){let{onScroll:n}=e;n&&n(t)}function j(e){f.value?.sync(),A(e)}function P(){f.value?.sync()}function F(){let{value:e}=_;return e||null}function L(e,t){t.disabled||U(t,!1)}function R(e,t){t.disabled||k(t)}function z(t){fe(t,`action`)||e.onKeyup?.(t)}function ee(t){fe(t,`action`)||e.onKeydown?.(t)}function B(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function V(){let{value:e}=_;e&&U(e.getNext({loop:!0}),!0)}function H(){let{value:e}=_;e&&U(e.getPrev({loop:!0}),!0)}function U(e,t=!1){_.value=e,t&&W()}function W(){let t=_.value;if(!t)return;let n=h.value(t.key);n!==null&&(e.virtualScroll?d.value?.scrollTo({index:n}):f.value?.scrollTo({index:n,elSize:w.value}))}function G(t){l.value?.contains(t.target)&&e.onFocus?.(t)}function q(t){l.value?.contains(t.relatedTarget)||e.onBlur?.(t)}m(oe,{handleOptionMouseEnter:L,handleOptionClick:R,valueSetRef:E,pendingTmNodeRef:_,nodePropsRef:I(e,`nodeProps`),showCheckmarkRef:I(e,`showCheckmark`),multipleRef:I(e,`multiple`),valueRef:I(e,`value`),renderLabelRef:I(e,`renderLabel`),renderOptionRef:I(e,`renderOption`),labelFieldRef:I(e,`labelField`),valueFieldRef:I(e,`valueField`)}),m(Q,l),u(()=>{let{value:e}=f;e&&e.sync()});let Y=i(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:a,groupHeaderTextColor:o,actionDividerColor:s,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[K(`optionFontSize`,t)]:x,[K(`optionHeight`,t)]:S,[K(`optionPadding`,t)]:C}}=c.value;return{"--n-height":r,"--n-action-divider-color":s,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":a,"--n-option-font-size":x,"--n-group-header-text-color":o,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":N(C,`left`),"--n-option-padding-right":N(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:X}=e,Z=X?n(`internal-select-menu`,i(()=>e.size[0]),Y,e):void 0,te={selfRef:l,next:V,prev:H,getPendingTmNode:F};return rt(l,e.onResize),{mergedTheme:c,mergedClsPrefix:t,rtlEnabled:s,virtualListRef:d,scrollbarRef:f,itemSize:w,padding:T,flattenedNodes:p,empty:D,mergedRenderEmpty:O,virtualListContainer(){let{value:e}=d;return e?.listElRef},virtualListContent(){let{value:e}=d;return e?.itemsElRef},doScroll:A,handleFocusin:G,handleFocusout:q,handleKeyUp:z,handleKeyDown:ee,handleMouseDown:B,handleVirtualListResize:P,handleVirtualListScroll:j,cssVars:X?void 0:Y,themeClass:Z?.themeClass,onRender:Z?.onRender,...te}},render(){let{$slots:e,virtualScroll:t,clsPrefix:n,mergedTheme:r,themeClass:i,onRender:a}=this;return a?.(),l(),o(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:V([`${n}-base-select-menu`,`${n}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${n}-base-select-menu--rtl`,i,this.multiple&&`${n}-base-select-menu--multiple`]),style:X(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[k(()=>_(e.header,e=>e&&(l(),o(`div`,{class:V(`${n}-base-select-menu__header`),"data-header":!0,key:`header`},[k(()=>e)],2)))),this.loading?(l(),o(`div`,{key:0,class:V(`${n}-base-select-menu__loading`)},[(l(),w(j,{clsPrefix:n,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(l(),o(Z,{key:1},[this.empty?(l(),o(`div`,{key:1,class:V(`${n}-base-select-menu__empty`),"data-empty":!0},[k(()=>ee(e.empty,()=>[this.mergedRenderEmpty?.()||(l(),w(me,{theme:r.peers.Empty,themeOverrides:r.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(l(),w(Ee,f({key:0,ref:`scrollbarRef`,theme:r.peers.Scrollbar,themeOverrides:r.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(l(),w(Ge,{key:1,ref:`virtualListRef`,class:V(`${n}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(l(),w(at,{key:e.key,clsPrefix:n,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(l(),w(ut,{clsPrefix:n,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(l(),o(`div`,{key:4,class:V(`${n}-base-select-menu-option-wrapper`),style:X({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[k(()=>this.flattenedNodes.map(e=>e.isGroup?(l(),w(at,{key:e.key,clsPrefix:n,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(l(),w(ut,{clsPrefix:n,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),k(()=>_(e.action,e=>e&&[(l(),o(`div`,{class:V(`${n}-base-select-menu__action`),"data-action":!0,key:`action`},[k(()=>e)],2)),(l(),w(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=q([H(`base-selection`,`
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
 `,[H(`base-loading`,`
 color: var(--n-loading-color);
 `),H(`base-selection-tags`,`min-height: var(--n-height);`),z(`border, state-border`,`
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
 `),H(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[z(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),H(`base-selection-overlay`,`
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
 `)]),H(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[z(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),H(`base-selection-tags`,`
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
 `),H(`base-selection-label`,`
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
 `,[H(`base-selection-input`,`
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
 `)]),W(`disabled`,[q(`&:hover`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),A(`focus`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),A(`active`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),H(`base-selection-label`,`background-color: var(--n-color-active);`),H(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),A(`disabled`,`cursor: not-allowed;`,[z(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),H(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[H(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),z(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),H(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),H(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),H(`base-selection-input-tag`,`
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
 `)]),[`warning`,`error`].map(e=>A(`${e}-status`,[z(`state-border`,`border: var(--n-border-${e});`),W(`disabled`,[q(`&:hover`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),A(`active`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),H(`base-selection-label`,`background-color: var(--n-color-active-${e});`),H(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),A(`focus`,[z(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),H(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),H(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[q(`&:last-child`,`padding-right: 0;`),H(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[z(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=B({name:`InternalSelection`,props:{...ne.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(t){let{mergedClsPrefixRef:r,mergedRtlRef:a}=S(t),o=y(`InternalSelection`,a,r),s=M(null),c=M(null),l=M(null),d=M(null),f=M(null),p=M(null),m=M(null),h=M(null),_=M(null),v=M(null),x=M(!1),C=M(!1),w=M(!1),T=ne(`InternalSelection`,`-internal-selection`,bt,we,t,I(t,`clsPrefix`)),E=i(()=>t.clearable&&!t.disabled&&(w.value||t.active)),D=i(()=>t.selectedOption?t.renderTag?t.renderTag({option:t.selectedOption,handleClose:()=>{}}):t.renderLabel?t.renderLabel(t.selectedOption,!0):Se(t.selectedOption[t.labelField],t.selectedOption,!0):t.placeholder),O=i(()=>{let e=t.selectedOption;if(e)return e[t.labelField]}),k=i(()=>t.multiple?!!(Array.isArray(t.selectedOptions)&&t.selectedOptions.length):t.selectedOption!==null);function A(){let{value:e}=s;if(e){let{value:n}=c;n&&(n.style.width=`${e.offsetWidth}px`,t.maxTagCount!==`responsive`&&_.value?.sync({showAllItemsBeforeCalculate:!1}))}}function j(){let{value:e}=v;e&&(e.style.display=`none`)}function P(){let{value:e}=v;e&&(e.style.display=`inline-block`)}b(I(t,`active`),e=>{e||j()}),b(I(t,`pattern`),()=>{t.multiple&&g(A)});function F(e){let{onFocus:n}=t;n&&n(e)}function L(e){let{onBlur:n}=t;n&&n(e)}function R(e){let{onDeleteOption:n}=t;n&&n(e)}function z(e){let{onClear:n}=t;n&&n(e)}function ee(e){let{onPatternInput:n}=t;n&&n(e)}function B(e){(!e.relatedTarget||!l.value?.contains(e.relatedTarget))&&F(e)}function V(e){l.value?.contains(e.relatedTarget)||L(e)}function H(e){z(e)}function U(){w.value=!0}function W(){w.value=!1}function G(e){t.active&&t.filterable&&e.target!==c.value&&e.preventDefault()}function q(e){R(e)}let J=M(!1);function Y(e){if(e.key===`Backspace`&&!J.value&&!t.pattern.length){let{selectedOptions:e}=t;e?.length&&q(e[e.length-1])}}let X=null;function Z(e){let{value:n}=s;n&&(n.textContent=e.target.value,A()),t.ignoreComposition&&J.value?X=e:ee(e)}function te(){J.value=!0}function re(){J.value=!1,t.ignoreComposition&&ee(X),X=null}function ie(e){C.value=!0,t.onPatternFocus?.(e)}function Q(e){C.value=!1,t.onPatternBlur?.(e)}function ae(){if(t.filterable)C.value=!1,p.value?.blur(),c.value?.blur();else if(t.multiple){let{value:e}=d;e?.blur()}else{let{value:e}=f;e?.blur()}}function oe(){t.filterable?(C.value=!1,p.value?.focus()):t.multiple?d.value?.focus():f.value?.focus()}function se(){let{value:e}=c;e&&(P(),e.focus())}function ce(){let{value:e}=c;e&&e.blur()}function le(e){let{value:t}=m;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=h;return e}function de(){return c.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){t.active||(pe(),fe=window.setTimeout(()=>{k.value&&(x.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),x.value=!1)}b(k,e=>{e||(x.value=!1)}),u(()=>{e(()=>{let e=p.value;e&&(t.disabled?e.removeAttribute(`tabindex`):e.tabIndex=C.value?-1:0)})}),rt(l,t.onResize);let{inlineThemeDisabled:_e}=t,ve=i(()=>{let{size:e}=t,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:x,arrowColor:S,arrowColorDisabled:C,loadingColor:w,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:O,boxShadowHoverWarning:k,borderWarning:A,borderFocusWarning:j,borderHoverWarning:M,borderActiveWarning:P,colorActiveError:F,boxShadowFocusError:I,boxShadowActiveError:L,boxShadowHoverError:R,borderError:z,borderFocusError:ee,borderHoverError:B,borderActiveError:V,clearColor:H,clearColorHover:U,clearColorPressed:W,clearSize:G,arrowSize:q,[K(`height`,e)]:J,[K(`fontSize`,e)]:Y}}=T.value,X=N(c),Z=N(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":x,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":Y,"--n-height":J,"--n-padding-single-top":X.top,"--n-padding-multiple-top":Z.top,"--n-padding-single-right":X.right,"--n-padding-multiple-right":Z.right,"--n-padding-single-left":X.left,"--n-padding-multiple-left":Z.left,"--n-padding-single-bottom":X.bottom,"--n-padding-multiple-bottom":Z.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":S,"--n-arrow-color-disabled":C,"--n-loading-color":w,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":O,"--n-box-shadow-hover-warning":k,"--n-border-warning":A,"--n-border-focus-warning":j,"--n-border-hover-warning":M,"--n-border-active-warning":P,"--n-color-active-error":F,"--n-box-shadow-focus-error":I,"--n-box-shadow-active-error":L,"--n-box-shadow-hover-error":R,"--n-border-error":z,"--n-border-focus-error":ee,"--n-border-hover-error":B,"--n-border-active-error":V,"--n-clear-size":G,"--n-clear-color":H,"--n-clear-color-hover":U,"--n-clear-color-pressed":W,"--n-arrow-size":q,"--n-font-weight":r}}),ye=_e?n(`internal-selection`,i(()=>t.size[0]),ve,t):void 0;return{mergedTheme:T,mergedClearable:E,mergedClsPrefix:r,rtlEnabled:o,patternInputFocused:C,filterablePlaceholder:D,label:O,selected:k,showTagsPanel:x,isComposing:J,counterRef:m,counterWrapperRef:h,patternInputMirrorRef:s,patternInputRef:c,selfRef:l,multipleElRef:d,singleElRef:f,patternInputWrapperRef:p,overflowRef:_,inputTagElRef:v,handleMouseDown:G,handleFocusin:B,handleClear:H,handleMouseEnter:U,handleMouseLeave:W,handleDeleteOption:q,handlePatternKeyDown:Y,handlePatternInputInput:Z,handlePatternInputBlur:Q,handlePatternInputFocus:ie,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:V,handleCompositionEnd:re,handleCompositionStart:te,onPopoverUpdateShow:ge,focus:oe,focusInput:se,blur:ae,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:t.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:i,maxTagCount:a,bordered:s,clsPrefix:c,ellipsisTagPopoverProps:u,onRender:d,renderTag:p,renderLabel:m}=this;d?.();let h=a===`responsive`,g=typeof a==`number`,_=h||g,v=(l(),w(Me,null,{default:()=>(l(),w(ye,{clsPrefix:c,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),y;if(t){let{labelField:e}=this,t=t=>(l(),o(`div`,{class:V(`${c}-base-selection-tag-wrapper`),key:t.value},[p?(l(),o(Z,{key:0},[k(()=>p({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(l(),w(tt,{key:1,size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>m?m(t,!0):Se(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),s=()=>(g?this.selectedOptions.slice(0,a):this.selectedOptions).map(t),d=i?(l(),o(`div`,{class:V(`${c}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[Y(`input`,f(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${c}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),Y(`span`,{ref:`patternInputMirrorRef`,class:V(`${c}-base-selection-input-tag__mirror`)},[k(()=>this.pattern)],2)],2)):null,b=h?()=>(l(),o(`div`,{class:V(`${c}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(l(),w(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,x;if(g){let e=this.selectedOptions.length-a;e>0&&(x=(t=>(l(),o(`div`,{class:V(`${c}-base-selection-tag-wrapper`),key:`__counter__`},[(l(),w(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(x))}let S=h?i?(l(),w(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:b,tail:()=>d},1032,[`updateCounter`,`getCounter`,`getTail`])):(l(),w(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:b},1032,[`updateCounter`,`getCounter`])):g&&x?s().concat(x):s(),C=_?()=>(l(),o(`div`,{class:V(`${c}-base-selection-popover`)},[h?(l(),o(Z,{key:0},[k(()=>s())],64)):(l(),o(Z,{key:1},[k(()=>this.selectedOptions.map(t))],64))],2)):void 0,T=_?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...u}:null,E=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(l(),o(`div`,{key:5,class:V(`${c}-base-selection-placeholder ${c}-base-selection-overlay`)},[Y(`div`,{class:V(`${c}-base-selection-placeholder__inner`)},[k(()=>this.placeholder)],2)],2)):null,D=i?(l(),o(`div`,{key:6,ref:`patternInputWrapperRef`,class:V(`${c}-base-selection-tags`)},[k(()=>S),h?k(()=>null):(l(),o(Z,{key:1},[k(()=>d)],64)),k(()=>v)],2)):(l(),o(`div`,{key:7,ref:`multipleElRef`,class:V(`${c}-base-selection-tags`),tabindex:r?void 0:0},[k(()=>S),k(()=>v)],10,St));y=(e=>(l(),o(Z,{key:8},[_?(l(),w(le,f({key:0},T,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>D,default:C},1040)):(l(),o(Z,{key:1},[k(()=>D)],64)),k(()=>E)],64)))(y)}else if(i){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;y=(e=>(l(),o(`div`,{key:9,ref:`patternInputWrapperRef`,class:V(`${c}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[Y(`input`,f(this.inputProps,{ref:`patternInputRef`,class:`${c}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),n?(l(),o(`div`,{class:V(`${c}-base-selection-label__render-label ${c}-base-selection-overlay`),key:`input`},[Y(`div`,{class:V(`${c}-base-selection-overlay__wrapper`)},[p?(l(),o(Z,{key:0},[k(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(l(),o(Z,{key:1},[m?(l(),o(Z,{key:0},[k(()=>m(this.selectedOption,!0))],64)):(l(),o(Z,{key:1},[k(()=>Se(this.label,this.selectedOption,!0))],64))],64))],2)],2)):k(()=>null),t?(l(),o(`div`,{class:V(`${c}-base-selection-placeholder ${c}-base-selection-overlay`),key:`placeholder`},[Y(`div`,{class:V(`${c}-base-selection-overlay__wrapper`)},[k(()=>this.filterablePlaceholder)],2)],2)):k(()=>null),k(()=>v)],10,Ct)))(y)}else y=(e=>(l(),o(`div`,{key:10,ref:`singleElRef`,class:V(`${c}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(l(),o(`div`,{class:V(`${c}-base-selection-placeholder ${c}-base-selection-overlay`),key:`placeholder`},[Y(`div`,{class:V(`${c}-base-selection-placeholder__inner`)},[k(()=>this.placeholder)],2)],2)):(l(),o(`div`,{class:V(`${c}-base-selection-input`),title:nt(this.label),key:`input`},[Y(`div`,{class:V(`${c}-base-selection-input__content`)},[p?(l(),o(Z,{key:0},[k(()=>p({option:this.selectedOption,handleClose:()=>{}}))],64)):(l(),o(Z,{key:1},[m?(l(),o(Z,{key:0},[k(()=>m(this.selectedOption,!0))],64)):(l(),o(Z,{key:1},[k(()=>Se(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),k(()=>v)],10,Tt)))(y);return l(),o(`div`,{ref:`selfRef`,class:V([`${c}-base-selection`,this.rtlEnabled&&`${c}-base-selection--rtl`,this.themeClass,e&&`${c}-base-selection--${e}-status`,{[`${c}-base-selection--active`]:this.active,[`${c}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${c}-base-selection--disabled`]:this.disabled,[`${c}-base-selection--multiple`]:this.multiple,[`${c}-base-selection--focus`]:this.focused}]),style:X(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[k(()=>y),s?(l(),o(`div`,{key:0,class:V(`${c}-base-selection__border`)},null,2)):k(()=>null),s?(l(),o(`div`,{key:2,class:V(`${c}-base-selection__state-border`)},null,2)):k(()=>null)],46,Et)}}),Ot=q([H(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),H(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Pe({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...ne.props,to:ce.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=B({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:r,namespaceRef:a,inlineThemeDisabled:o,mergedComponentPropsRef:c}=S(e),l=ne(`Select`,`-select`,Ot,xe,e,t),u=M(e.defaultValue),f=I(e,`value`),p=he(f,u),m=M(!1),h=M(``),g=_e(e,[`items`,`options`]),_=M([]),v=M([]),y=i(()=>v.value.concat(_.value).concat(g.value)),x=i(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),w=i(()=>{if(e.remote)return g.value;{let{value:t}=y,{value:n}=h;return!n.length||!e.filterable?t:vt(t,x.value,n,e.childrenField)}}),T=i(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return pe(w.value,r)}),E=i(()=>yt(y.value,e.valueField,e.childrenField)),D=M(!1),O=he(I(e,`show`),D),k=M(null),A=M(null),j=M(null),{localeRef:N}=re(`Select`),P=i(()=>e.placeholder??N.value.placeholder),F=[],L=M(new Map),R=i(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function z(t){let n=e.remote,{value:r}=L,{value:i}=E,{value:a}=R,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let ee=i(()=>{if(e.multiple){let{value:e}=p;return Array.isArray(e)?z(e):[]}return null}),B=i(()=>{let{value:t}=p;return!e.multiple&&!Array.isArray(t)?t===null?null:z([t])[0]||null:null}),V=C(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:c?.value?.Select?.size||`medium`}}),{mergedSizeRef:H,mergedDisabledRef:U,mergedStatusRef:W}=V;function G(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:c}=V;r&&s(r,t,n),a&&s(a,t,n),i&&s(i,t,n),u.value=t,o(),c()}function K(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=V;n&&s(n,t),r()}function q(){let{onClear:t}=e;t&&s(t)}function J(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=V;n&&s(n,t),i(),r&&ie()}function Y(t){let{onSearch:n}=e;n&&s(n,t)}function X(t){let{onScroll:n}=e;n&&s(n,t)}function Z(){let{remote:t,multiple:n}=e;if(t){let{value:t}=L;if(n){let{valueField:n}=e;ee.value?.forEach(e=>{t.set(e[n],e)})}else{let n=B.value;n&&t.set(n[e.valueField],n)}}}function te(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&s(n,t),r&&s(r,t),D.value=t}function ie(){U.value||(te(!0),D.value=!0,e.filterable&&Pe())}function Q(){te(!1)}function ae(){h.value=``,v.value=F}let oe=M(!1);function se(){e.filterable&&(oe.value=!0)}function le(){e.filterable&&(oe.value=!1,O.value||ae())}function ue(){U.value||(O.value?e.filterable?Pe():Q():ie())}function de(e){j.value?.selfRef?.contains(e.relatedTarget)||(m.value=!1,K(e),Q())}function me(e){J(e),m.value=!0}function ge(){m.value=!0}function ve(e){k.value?.$el.contains(e.relatedTarget)||(m.value=!1,K(e),Q())}function ye(){k.value?.focus(),Q()}function be(e){O.value&&(k.value?.$el.contains(Te(e))||Q())}function Se(t){if(!Array.isArray(t))return[];if(R.value)return Array.from(t);{let{remote:n}=e,{value:r}=E;if(n){let{value:e}=L;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function we(e){Ee(e.rawNode)}function Ee(t){if(U.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=v,t=e[0]||null;if(t){let e=_.value;e.length?e.push(t):_.value=[t],v.value=F}}if(r&&L.value.set(t[a],t),e.multiple){let e=Se(p.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=De(t[a]);~e&&(_.value.splice(e,1),i&&(h.value=``))}}else e.push(t[a]),i&&(h.value=``);G(e,z(e))}else{if(n&&!r){let e=De(t[a]);~e?_.value=[_.value[e]]:_.value=F}Ne(),Q(),G(t[a],t)}}function De(t){return _.value.findIndex(n=>n[e.valueField]===t)}function Oe(t){O.value||ie();let{value:n}=t.target;h.value=n;let{tag:r,remote:i}=e;if(Y(n),r&&!i){if(!n){v.value=F;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;g.value.some(e=>e[i]===r[i]||e[a]===r[a])||_.value.some(e=>e[i]===r[i]||e[a]===r[a])?v.value=F:v.value=[r]}}function ke(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Q(),r&&!i&&a&&(_.value=F),q(),n?G([],[]):G(null,null)}function Ae(e){!fe(e,`action`)&&!fe(e,`empty`)&&!fe(e,`header`)&&e.preventDefault()}function je(e){X(e)}function Me(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!k.value?.isComposing){if(O.value){let t=j.value?.getPendingTmNode();t?we(t):e.filterable||(Q(),Ne())}else if(ie(),e.tag&&oe.value){let t=v.value[0];if(t){let n=t[e.valueField],{value:r}=p;e.multiple&&Array.isArray(r)&&r.includes(n)||Ee(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;O.value&&j.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;O.value?j.value?.next():ie();break;case`Escape`:O.value&&(Ce(t),Q()),k.value?.focus()}}function Ne(){k.value?.focus()}function Pe(){k.value?.focusInput()}function Fe(){O.value&&A.value?.syncPosition()}Z(),b(I(e,`options`),Z);let Ie={focus:()=>{k.value?.focus()},focusInput:()=>{k.value?.focusInput()},blur:()=>{k.value?.blur()},blurInput:()=>{k.value?.blurInput()}},Le=i(()=>{let{self:{menuBoxShadow:e}}=l.value;return{"--n-menu-box-shadow":e}}),Re=o?n(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:W,mergedClsPrefix:t,mergedBordered:r,namespace:a,treeMate:T,isMounted:d(),triggerRef:k,menuRef:j,pattern:h,uncontrolledShow:D,mergedShow:O,adjustedTo:ce(e),uncontrolledValue:u,mergedValue:p,followerRef:A,localizedPlaceholder:P,selectedOption:B,selectedOptions:ee,mergedSize:H,mergedDisabled:U,focused:m,activeWithoutMenuOpen:oe,inlineThemeDisabled:o,onTriggerInputFocus:se,onTriggerInputBlur:le,handleTriggerOrMenuResize:Fe,handleMenuFocus:ge,handleMenuBlur:ve,handleMenuTabOut:ye,handleTriggerClick:ue,handleToggle:we,handleDeleteOption:Ee,handlePatternInput:Oe,handleClear:ke,handleTriggerBlur:de,handleTriggerFocus:me,handleKeydown:Me,handleMenuAfterLeave:ae,handleMenuClickOutside:be,handleMenuScroll:je,handleMenuKeydown:Me,handleMenuMousedown:Ae,mergedTheme:l,cssVars:o?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return l(),o(`div`,{class:V(`${this.mergedClsPrefix}-select`)},[t(se,null,{_:1,default:R(()=>[(l(),w(ie,null,{_:1,default:R(()=>(l(),w(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:R(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(l(),w(ae,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===ce.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:R(()=>(l(),w(P,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:R(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),U((l(),w(pt,f(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:R(()=>[this.$slots.empty?.()]),header:R(()=>[this.$slots.header?.()]),action:R(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[L,this.mergedShow],[je,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[je,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};