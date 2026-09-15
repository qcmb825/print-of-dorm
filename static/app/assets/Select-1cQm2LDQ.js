import{$n as e,$t as t,A as n,An as r,Dn as i,Fn as a,Gn as o,Hn as s,I as c,L as l,Ln as u,M as d,Mn as f,N as p,Nn as m,O as h,On as g,P as _,Pn as v,Qt as y,R as b,Rn as x,S,Sn as C,St as w,T,Un as E,V as D,Xn as ee,Yn as O,_ as k,bn as A,cr as j,ct as M,dt as N,fn as P,ft as F,gn as I,gt as L,in as R,ln as z,lt as B,mt as V,nn as H,pr as U,rn as W,st as G,tn as K,ut as q,vr as J,w as Y,wn as X,xn as Z,yt as te,zn as ne}from"./endpoints-BjKpicAD.js";import{t as re}from"./use-locale-CTQlNLLJ.js";import{O as ie,a as ae,l as Q,n as oe,o as se,p as ce,t as le}from"./fade-in-scale-up.cssr-YHRJZfJ_.js";import{a as ue,c as de,d as fe,f as pe,g as me,h as he,i as ge,m as _e,o as ve,s as ye,t as be,u as xe}from"./Popover-Da_9Zg5V.js";import{n as Se,r as Ce,t as we}from"./create-CLOJQO3W.js";import{t as Te}from"./Empty-C8k9VaTf.js";import{n as Ee}from"./Input-D-xpFETh.js";import{F as De,J as Oe,K as ke,P as Ae,R as je,W as Me,k as Ne,q as Pe}from"./index-BZmdQ_dZ.js";function Fe(e){return e&-e}var Ie=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=Fe(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=Fe(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},Le;function Re(){return typeof document>`u`?!1:(Le===void 0&&(Le=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),Le)}var ze;function Be(){return typeof document>`u`?1:(ze===void 0&&(ze=`chrome`in window?window.devicePixelRatio:1),ze)}var Ve=`VVirtualListXScroll`;function He({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=j(0),i=j(0),a=A(()=>{let t=e.value;if(t.length===0)return null;let n=new Ie(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n}),o=_(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),s=e=>{let t=a.value;return t===null?0:t.sum(e)},c=_(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)});return E(Ve,{startIndexRef:o,endIndexRef:c,columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:s}),{listWidthRef:r,scrollLeftRef:i}}var Ue=g({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=f(Ve);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),We=ue(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[ue(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[ue(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Ge=g({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=L();We.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:ve,ssr:t}),ne(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&v({key:n}):v({index:t})});let n=!1,r=!1;a(()=>{if(n=!1,!r){r=!0;return}v({top:m.value,left:s.value})}),x(()=>{n=!0,r||=!0});let i=_(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=A(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=He({columnsRef:U(e,`columns`),renderColRef:U(e,`renderCol`),renderItemWithColsRef:U(e,`renderItemWithCols`)}),l=j(null),u=j(void 0),d=new Map,f=A(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Ie(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=d.get(n);a!==void 0&&i.add(t,a)}),i}),p=j(0),m=j(0),h=_(()=>Math.max(f.value.getBound(m.value-G(e.paddingTop))-1,0)),g=A(()=>{let{value:t}=u;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=h.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),v=(e,t)=>{if(typeof e==`number`){C(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)C(n,r,c);else if(i!==void 0)S(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&S(e,c,l)}else s===`bottom`?C(0,2**53-1,c):s===`top`&&C(0,0,c)},y,b=null;function S(t,n,r){let i=l.value;if(i==null)return;let{value:a}=f,o=a.sum(t)+G(e.paddingTop);if(!r)i.scrollTo({left:0,top:o,behavior:n});else{y=t,b!==null&&window.clearTimeout(b),b=window.setTimeout(()=>{y=void 0,b=null},16);let{scrollTop:e,offsetHeight:r}=i;if(o>e){let s=a.get(t);o+s<=e+r||i.scrollTo({left:0,top:o+s-r,behavior:n})}else i.scrollTo({left:0,top:o,behavior:n})}}function C(e,t,n){l.value?.scrollTo({left:e,top:t,behavior:n})}function w(t,r){if(n||e.ignoreItemResize||M(r.target))return;let{value:i}=f,a=o.value.get(t),s=i.get(a),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?d.delete(t):d.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(a,u);let m=l.value;if(m!=null){if(y===void 0){let e=i.sum(a);m.scrollTop>e&&m.scrollBy(0,u)}else(a<y||a===y&&c+i.sum(a)>m.scrollTop+m.offsetHeight)&&m.scrollBy(0,u);k()}p.value++}let T=!Re(),E=!1;function D(t){var n;(n=e.onScroll)==null||n.call(e,t),(!T||!E)&&k()}function ee(t){var n;if((n=e.onWheel)==null||n.call(e,t),T){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Be(),e.scrollLeft+=t.deltaX/Be(),k(),E=!0,me(()=>{E=!1})}}}function O(t){if(n||M(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===u.value)return}else if(t.contentRect.height===u.value&&t.contentRect.width===c.value)return;u.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function k(){let{value:e}=l;e!=null&&(m.value=e.scrollTop,s.value=e.scrollLeft)}function M(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:u,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:A(()=>{let{itemResizable:t}=e,n=B(f.value.sum());return p.value,[e.itemsStyle,{boxSizing:`content-box`,width:B(i.value),height:t?``:n,minHeight:t?n:``,paddingTop:B(e.paddingTop),paddingBottom:B(e.paddingBottom)}]}),visibleItemsStyle:A(()=>(p.value,{transform:`translateY(${B(f.value.sum(h.value))})`})),viewportItems:g,listElRef:l,itemsElRef:j(null),scrollTo:v,handleListResize:O,handleListScroll:D,handleListWheel:ee,handleItemResize:w}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:i}=this;return r(ae,{onResize:this.handleListResize},{default:()=>{var a;return r(`div`,m(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(a=this.$slots).empty?.call(a):r(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[r(i,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:i,renderItemWithCols:a}=this;return this.viewportItems.map(o=>{let s=o[t],c=n.get(s),l=i==null?void 0:r(Ue,{index:c,item:o}),u=a==null?void 0:r(Ue,{index:c,item:o}),d=this.$slots.default({item:o,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?r(ae,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}}),$=`v-hidden`,Ke=ue(`[v-hidden]`,{display:`none!important`}),qe=g({name:`Overflow`,props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){let n=j(null),r=j(null);function i(i){let{value:a}=n,{getCounter:o,getTail:s}=e,c;if(c=o===void 0?r.value:o(),!a||!c)return;c.hasAttribute($)&&c.removeAttribute($);let{children:l}=a;if(i.showAllItemsBeforeCalculate)for(let e of l)e.hasAttribute($)&&e.removeAttribute($);let u=a.offsetWidth,d=[],f=t.tail?s?.():null,p=f?f.offsetWidth:0,m=!1,h=a.children.length-+!!t.tail;for(let t=0;t<h-1;++t){if(t<0)continue;let n=l[t];if(m){n.hasAttribute($)||n.setAttribute($,``);continue}n.hasAttribute($)&&n.removeAttribute($);let r=n.offsetWidth;if(p+=r,d[t]=r,p>u){let{updateCounter:n}=e;for(let r=t;r>=0;--r){let i=h-1-r;n===void 0?c.textContent=`${i}`:n(i);let a=c.offsetWidth;if(p-=d[r],p+a<=u||r===0){m=!0,t=r-1,f&&(t===-1?(f.style.maxWidth=`${u-a}px`,f.style.boxSizing=`border-box`):f.style.maxWidth=``);let{onUpdateCount:n}=e;n&&n(i);break}}}}let{onUpdateOverflow:g}=e;m?g!==void 0&&g(!0):(g!==void 0&&g(!1),c.setAttribute($,``))}let a=L();return Ke.mount({id:`vueuc/overflow`,head:!0,anchorMetaName:ve,ssr:a}),ne(()=>i({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:r,sync:i}},render(){let{$slots:e}=this;return v(()=>this.sync({showAllItemsBeforeCalculate:!1})),r(`div`,{class:`v-overflow`,ref:`selfRef`},[o(e,`default`),e.counter?e.counter():r(`span`,{style:{display:`inline-block`},ref:`counterRef`}),e.tail?e.tail():null])}});function Je(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderRadiusSmall:g,fontSizeMini:_,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,heightMini:x,heightTiny:S,heightSmall:C,heightMedium:w,closeColorHover:T,closeColorPressed:E,buttonColor2Hover:ee,buttonColor2Pressed:O,fontWeightStrong:k}=e;return{...ke,closeBorderRadius:g,heightTiny:x,heightSmall:S,heightMedium:C,heightLarge:w,borderRadius:g,opacityDisabled:d,fontSizeTiny:_,fontSizeSmall:v,fontSizeMedium:y,fontSizeLarge:b,fontWeightStrong:k,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:ee,colorPressedCheckable:O,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:T,closeColorPressed:E,borderPrimary:`1px solid ${D(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:D(i,{alpha:.12}),colorBorderedPrimary:D(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:D(i,{alpha:.12}),closeColorPressedPrimary:D(i,{alpha:.18}),borderInfo:`1px solid ${D(a,{alpha:.3})}`,textColorInfo:a,colorInfo:D(a,{alpha:.12}),colorBorderedInfo:D(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:D(a,{alpha:.12}),closeColorPressedInfo:D(a,{alpha:.18}),borderSuccess:`1px solid ${D(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:D(o,{alpha:.12}),colorBorderedSuccess:D(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:D(o,{alpha:.12}),closeColorPressedSuccess:D(o,{alpha:.18}),borderWarning:`1px solid ${D(s,{alpha:.35})}`,textColorWarning:s,colorWarning:D(s,{alpha:.15}),colorBorderedWarning:D(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:D(s,{alpha:.12}),closeColorPressedWarning:D(s,{alpha:.18}),borderError:`1px solid ${D(c,{alpha:.23})}`,textColorError:c,colorError:D(c,{alpha:.1}),colorBorderedError:D(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:D(c,{alpha:.12}),closeColorPressedError:D(c,{alpha:.18})}}var Ye={name:`Tag`,common:b,self:Je},Xe={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},Ze=t(`tag`,`
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
`,[H(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),K(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),K(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),K(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),K(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),H(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[K(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),K(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),H(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),H(`icon, avatar`,[H(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),H(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),H(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[W(`disabled`,[y(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[W(`checked`,`color: var(--n-text-color-hover-checkable);`)]),y(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[W(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),H(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[W(`disabled`,[y(`&:hover`,`background-color: var(--n-color-checked-hover);`),y(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),Qe=[`onClick`,`onMouseenter`,`onMouseleave`],$e={...c.props,...Xe,bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function},et=w(`n-tag`),tt=g({name:`Tag`,props:$e,slots:Object,setup(e){let t=j(null),{mergedBorderedRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedRtlRef:a,mergedComponentPropsRef:o}=te(e),s=A(()=>e.size||o?.value?.Tag?.size||`medium`),u=c(`Tag`,`-tag`,Ze,Ye,e,r);E(et,{roundRef:U(e,`round`)});function f(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function p(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&d(n,t)}}let m={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},h=T(`Tag`,a,r),g=A(()=>{let{type:t,color:{color:r,textColor:i}={}}=e,a=s.value,{common:{cubicBezierEaseInOut:o},self:{padding:c,closeMargin:l,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:y,colorChecked:b,colorCheckedHover:x,colorCheckedPressed:S,closeBorderRadius:C,fontWeightStrong:w,[R(`colorBordered`,t)]:T,[R(`closeSize`,a)]:E,[R(`closeIconSize`,a)]:D,[R(`fontSize`,a)]:ee,[R(`height`,a)]:O,[R(`color`,t)]:k,[R(`textColor`,t)]:A,[R(`border`,t)]:j,[R(`closeIconColor`,t)]:N,[R(`closeIconColorHover`,t)]:P,[R(`closeIconColorPressed`,t)]:F,[R(`closeColorHover`,t)]:I,[R(`closeColorPressed`,t)]:L}}=u.value,z=M(l);return{"--n-font-weight-strong":w,"--n-avatar-size-override":`calc(${O} - 8px)`,"--n-bezier":o,"--n-border-radius":d,"--n-border":j,"--n-close-icon-size":D,"--n-close-color-pressed":L,"--n-close-color-hover":I,"--n-close-border-radius":C,"--n-close-icon-color":N,"--n-close-icon-color-hover":P,"--n-close-icon-color-pressed":F,"--n-close-icon-color-disabled":N,"--n-close-margin-top":z.top,"--n-close-margin-right":z.right,"--n-close-margin-bottom":z.bottom,"--n-close-margin-left":z.left,"--n-close-size":E,"--n-color":r||(n.value?T:k),"--n-color-checkable":_,"--n-color-checked":b,"--n-color-checked-hover":x,"--n-color-checked-pressed":S,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":y,"--n-font-size":ee,"--n-height":O,"--n-opacity-disabled":f,"--n-padding":c,"--n-text-color":i||A,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),_=i?l(`tag`,A(()=>{let t=``,{type:r,color:{color:i,textColor:a}={}}=e;return t+=r[0],t+=s.value[0],i&&(t+=`a${Y(i)}`),a&&(t+=`b${Y(a)}`),n.value&&(t+=`c`),t}),g,e):void 0;return{...m,rtlEnabled:h,mergedClsPrefix:r,contentRef:t,mergedBordered:n,handleClick:f,handleCloseClick:p,cssVars:i?void 0:g,themeClass:_?.themeClass,onRender:_?.onRender}},render(){let{mergedClsPrefix:e,rtlEnabled:t,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:c}=this;o?.();let l=n(c.avatar,t=>t&&(s(),X(`div`,{class:N(`${e}-tag__avatar`)},[V(()=>t)],2))),u=n(c.icon,t=>t&&(s(),X(`div`,{class:N(`${e}-tag__icon`)},[V(()=>t)],2)));return s(),X(`div`,{class:N([`${e}-tag`,this.themeClass,{[`${e}-tag--rtl`]:t,[`${e}-tag--strong`]:this.strong,[`${e}-tag--disabled`]:this.disabled,[`${e}-tag--checkable`]:this.checkable,[`${e}-tag--checked`]:this.checkable&&this.checked,[`${e}-tag--round`]:a,[`${e}-tag--avatar`]:l,[`${e}-tag--icon`]:u,[`${e}-tag--closable`]:r}]),style:J(this.cssVars),onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[V(()=>u||l),Z(`span`,{class:N(`${e}-tag__content`),ref:`contentRef`},[V(()=>this.$slots.default?.())],2),!this.checkable&&r?(s(),C(Me,{key:0,clsPrefix:e,class:N(`${e}-tag__close`),disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0},null,8,[`clsPrefix`,`class`,`disabled`,`onClick`,`focusable`,`round`,`isButtonTag`])):V(()=>null),!this.checkable&&this.mergedBordered?(s(),X(`div`,{key:2,class:N(`${e}-tag__border`),style:J({borderColor:i})},null,6)):V(()=>null)],46,Qe)}});function nt(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function rt(e,t){t&&(ne(()=>{let{value:n}=e;n&&se.registerHandler(n,t)}),O(e,(e,t)=>{t&&se.unregisterHandler(t)},{deep:!1}),u(()=>{let{value:t}=e;t&&se.unregisterHandler(t)}))}var it=g({props:{onFocus:Function,onBlur:Function},setup(e){return()=>(()=>{let t=q(`d16ead82505dc285`);return s(),X(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:t[0]||=t=>e.onFocus?.(t),onBlur:t[1]||=t=>e.onBlur?.(t)},null,32)})()}}),at=g({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=f(he);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):je(i[this.labelField],i,!1),c=(s(),X(`div`,m(a,{class:[`${e}-base-select-group-header`,a?.class]}),[V(()=>o)],16));return i.render?i.render({node:c,option:i}):n?n({node:c,option:i,selected:!1}):c}});function ot(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var st=g({name:`Checkmark`,render(){return(()=>{let e=q(`3c84eac8ae4e1f96`);return e[0]||=Z(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},[Z(`g`,{fill:`none`},[Z(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})])],-1)})()}}),ct=[`onClick`,`onMouseenter`,`onMousemove`];function lt(e,t){return s(),C(z,{name:`fade-in-scale-up-transition`},{default:()=>e?(s(),C(Oe,{key:1,clsPrefix:t,class:N(`${t}-base-select-option__check`)},{default:()=>r(st)},1032,[`clsPrefix`,`class`])):null},1024)}var ut=g({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:p}=f(he),m=_(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||d(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function v(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:_(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:m,isSelected:_(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:v,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:c,renderLabel:l,handleClick:u,handleMouseEnter:d,handleMouseMove:f}=this,p=lt(n,e),h=l?[l(t,n),a&&p]:[je(t[this.labelField],t,n),a&&p],g=o?.(t),_=(s(),X(`div`,m(g,{class:[`${e}-base-select-option`,t.class,g?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[g?.style||``,t.style||``],onClick:ot([u,g?.onClick]),onMouseenter:ot([d,g?.onMouseenter]),onMousemove:ot([f,g?.onMousemove])}),[Z(`div`,{class:N(`${e}-base-select-option__content`)},[V(()=>h)],2)],16,ct));return t.render?t.render({node:_,option:t,selected:n}):c?c({node:_,option:t,selected:n}):_}}),dt=t(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[t(`scrollbar`,`
 max-height: var(--n-height);
 `),t(`virtual-list`,`
 max-height: var(--n-height);
 `),t(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[K(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),t(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),t(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),K(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),K(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),K(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),K(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),t(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),t(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[H(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),y(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),y(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),H(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),H(`pending`,[y(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),H(`selected`,`
 color: var(--n-option-text-color-active);
 `,[y(`&::before`,`
 background-color: var(--n-option-color-active);
 `),H(`pending`,[y(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),H(`disabled`,`
 cursor: not-allowed;
 `,[W(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),H(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),K(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[le({enterScale:`0.5`})])])]),ft=[`tabindex`,`onFocusin`,`onFocusout`,`onKeyup`,`onKeydown`,`onMousedown`,`onMouseenter`,`onMouseleave`],pt=g({name:`InternalSelectMenu`,props:{...c.props,clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:r}=te(e),i=T(`InternalSelectMenu`,n,t),a=c(`InternalSelectMenu`,`-internal-select-menu`,dt,Pe,e,U(e,`clsPrefix`)),o=j(null),s=j(null),d=j(null),f=A(()=>e.treeMate.getFlattenedNodes()),p=A(()=>Se(f.value)),m=j(null);function h(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),H(n||null)}function g(){let{value:t}=m;t&&!e.treeMate.getNode(t.key)&&(m.value=null)}let _;O(()=>e.show,t=>{t?_=O(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?h():g(),v(W)):g()},{immediate:!0}):_?.()},{immediate:!0}),u(()=>{_?.()});let y=A(()=>G(a.value.self[R(`optionHeight`,e.size)])),b=A(()=>M(a.value.self[R(`padding`,e.size)])),x=A(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),S=A(()=>{let e=f.value;return e&&e.length===0}),C=A(()=>r?.value?.Select?.renderEmpty);function w(t){let{onToggle:n}=e;n&&n(t)}function D(t){let{onScroll:n}=e;n&&n(t)}function ee(e){d.value?.sync(),D(e)}function k(){d.value?.sync()}function N(){let{value:e}=m;return e||null}function P(e,t){t.disabled||H(t,!1)}function F(e,t){t.disabled||w(t)}function I(t){Ce(t,`action`)||e.onKeyup?.(t)}function L(t){Ce(t,`action`)||e.onKeydown?.(t)}function z(t){e.onMousedown?.(t),!e.focusable&&t.preventDefault()}function B(){let{value:e}=m;e&&H(e.getNext({loop:!0}),!0)}function V(){let{value:e}=m;e&&H(e.getPrev({loop:!0}),!0)}function H(e,t=!1){m.value=e,t&&W()}function W(){let t=m.value;if(!t)return;let n=p.value(t.key);n!==null&&(e.virtualScroll?s.value?.scrollTo({index:n}):d.value?.scrollTo({index:n,elSize:y.value}))}function K(t){o.value?.contains(t.target)&&e.onFocus?.(t)}function q(t){o.value?.contains(t.relatedTarget)||e.onBlur?.(t)}E(he,{handleOptionMouseEnter:P,handleOptionClick:F,valueSetRef:x,pendingTmNodeRef:m,nodePropsRef:U(e,`nodeProps`),showCheckmarkRef:U(e,`showCheckmark`),multipleRef:U(e,`multiple`),valueRef:U(e,`value`),renderLabelRef:U(e,`renderLabel`),renderOptionRef:U(e,`renderOption`),labelFieldRef:U(e,`labelField`),valueFieldRef:U(e,`valueField`)}),E(_e,o),ne(()=>{let{value:e}=d;e&&e.sync()});let J=A(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:o,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[R(`optionFontSize`,t)]:x,[R(`optionHeight`,t)]:S,[R(`optionPadding`,t)]:C}}=a.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":o,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":M(C,`left`),"--n-option-padding-right":M(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:Y}=e,X=Y?l(`internal-select-menu`,A(()=>e.size[0]),J,e):void 0,Z={selfRef:o,next:B,prev:V,getPendingTmNode:N};return rt(o,e.onResize),{mergedTheme:a,mergedClsPrefix:t,rtlEnabled:i,virtualListRef:s,scrollbarRef:d,itemSize:y,padding:b,flattenedNodes:f,empty:S,mergedRenderEmpty:C,virtualListContainer(){let{value:e}=s;return e?.listElRef},virtualListContent(){let{value:e}=s;return e?.itemsElRef},doScroll:D,handleFocusin:K,handleFocusout:q,handleKeyUp:I,handleKeyDown:L,handleMouseDown:z,handleVirtualListResize:k,handleVirtualListScroll:ee,cssVars:Y?void 0:J,themeClass:X?.themeClass,onRender:X?.onRender,...Z}},render(){let{$slots:e,virtualScroll:t,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),s(),X(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:N([`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`]),style:J(this.cssVars),onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},[V(()=>n(e.header,e=>e&&(s(),X(`div`,{class:N(`${r}-base-select-menu__header`),"data-header":!0,key:`header`},[V(()=>e)],2)))),this.loading?(s(),X(`div`,{key:0,class:N(`${r}-base-select-menu__loading`)},[(s(),C(k,{clsPrefix:r,strokeWidth:20},null,8,[`clsPrefix`]))],2)):(s(),X(I,{key:1},[this.empty?(s(),X(`div`,{key:1,class:N(`${r}-base-select-menu__empty`),"data-empty":!0},[V(()=>h(e.empty,()=>[this.mergedRenderEmpty?.()||(s(),C(Te,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size},null,8,[`theme`,`themeOverrides`,`size`]))]))],2)):(s(),C(oe,m({key:0,ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?(s(),C(Ge,{key:1,ref:`virtualListRef`,class:N(`${r}-virtual-list`),items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?(s(),C(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):e.ignored?null:(s(),C(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))},1032,[`class`,`items`,`itemSize`,`paddingTop`,`paddingBottom`,`onResize`,`onScroll`])):(s(),X(`div`,{key:4,class:N(`${r}-base-select-menu-option-wrapper`),style:J({paddingTop:this.padding.top,paddingBottom:this.padding.bottom})},[V(()=>this.flattenedNodes.map(e=>e.isGroup?(s(),C(at,{key:e.key,clsPrefix:r,tmNode:e},null,8,[`clsPrefix`,`tmNode`])):(s(),C(ut,{clsPrefix:r,key:e.key,tmNode:e},null,8,[`clsPrefix`,`tmNode`]))))],6))},1040,[`theme`,`themeOverrides`,`scrollable`,`container`,`content`,`onScroll`]))],64)),V(()=>n(e.action,e=>e&&[(s(),X(`div`,{class:N(`${r}-base-select-menu__action`),"data-action":!0,key:`action`},[V(()=>e)],2)),(s(),C(it,{onFocus:this.onTabOut,key:`focus-detector`},null,8,[`onFocus`]))]))],46,ft)}});function mt(e){return e.type===`group`}function ht(e){return e.type===`ignored`}function gt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function _t(e,t){return{getIsGroup:mt,getIgnored:ht,getKey(t){return mt(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function vt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(mt(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(ht(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function yt(e,t,n){let r=new Map;return e.forEach(e=>{mt(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var bt=y([t(`base-selection`,`
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
 `,[t(`base-loading`,`
 color: var(--n-loading-color);
 `),t(`base-selection-tags`,`min-height: var(--n-height);`),K(`border, state-border`,`
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
 `),K(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),t(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[K(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),t(`base-selection-overlay`,`
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
 `,[K(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),t(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[K(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),t(`base-selection-tags`,`
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
 `),t(`base-selection-label`,`
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
 `,[t(`base-selection-input`,`
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
 `,[K(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),K(`render-label`,`
 color: var(--n-text-color);
 `)]),W(`disabled`,[y(`&:hover`,[K(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),H(`focus`,[K(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),H(`active`,[K(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),t(`base-selection-label`,`background-color: var(--n-color-active);`),t(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),H(`disabled`,`cursor: not-allowed;`,[K(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),t(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[t(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),K(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),t(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),t(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),t(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[K(`input`,`
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
 `),K(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>H(`${e}-status`,[K(`state-border`,`border: var(--n-border-${e});`),W(`disabled`,[y(`&:hover`,[K(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),H(`active`,[K(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),t(`base-selection-label`,`background-color: var(--n-color-active-${e});`),t(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),H(`focus`,[K(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),t(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),t(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[y(`&:last-child`,`padding-right: 0;`),t(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[K(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),xt=[`disabled`,`value`,`autofocus`,`onBlur`,`onFocus`,`onKeydown`,`onInput`,`onCompositionstart`,`onCompositionend`],St=[`tabindex`],Ct=[`title`],wt=[`value`,`readonly`,`disabled`,`autofocus`,`onFocus`,`onBlur`,`onInput`,`onCompositionstart`,`onCompositionend`],Tt=[`tabindex`],Et=[`onClick`,`onMouseenter`,`onMouseleave`,`onKeydown`,`onFocusin`,`onFocusout`,`onMousedown`],Dt=g({name:`InternalSelection`,props:{...c.props,clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function},setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=te(e),r=T(`InternalSelection`,n,t),i=j(null),a=j(null),o=j(null),s=j(null),u=j(null),d=j(null),f=j(null),p=j(null),m=j(null),h=j(null),g=j(!1),_=j(!1),y=j(!1),b=c(`InternalSelection`,`-internal-selection`,bt,De,e,U(e,`clsPrefix`)),x=A(()=>e.clearable&&!e.disabled&&(y.value||e.active)),S=A(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):je(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),C=A(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),w=A(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function E(){let{value:t}=i;if(t){let{value:n}=a;n&&(n.style.width=`${t.offsetWidth}px`,e.maxTagCount!==`responsive`&&m.value?.sync({showAllItemsBeforeCalculate:!1}))}}function D(){let{value:e}=h;e&&(e.style.display=`none`)}function k(){let{value:e}=h;e&&(e.style.display=`inline-block`)}O(U(e,`active`),e=>{e||D()}),O(U(e,`pattern`),()=>{e.multiple&&v(E)});function N(t){let{onFocus:n}=e;n&&n(t)}function P(t){let{onBlur:n}=e;n&&n(t)}function F(t){let{onDeleteOption:n}=e;n&&n(t)}function I(t){let{onClear:n}=e;n&&n(t)}function L(t){let{onPatternInput:n}=e;n&&n(t)}function z(e){(!e.relatedTarget||!o.value?.contains(e.relatedTarget))&&N(e)}function B(e){o.value?.contains(e.relatedTarget)||P(e)}function V(e){I(e)}function H(){y.value=!0}function W(){y.value=!1}function G(t){e.active&&e.filterable&&t.target!==a.value&&t.preventDefault()}function K(e){F(e)}let q=j(!1);function J(t){if(t.key===`Backspace`&&!q.value&&!e.pattern.length){let{selectedOptions:t}=e;t?.length&&K(t[t.length-1])}}let Y=null;function X(t){let{value:n}=i;n&&(n.textContent=t.target.value,E()),e.ignoreComposition&&q.value?Y=t:L(t)}function Z(){q.value=!0}function re(){q.value=!1,e.ignoreComposition&&L(Y),Y=null}function ie(t){_.value=!0,e.onPatternFocus?.(t)}function ae(t){_.value=!1,e.onPatternBlur?.(t)}function Q(){if(e.filterable)_.value=!1,d.value?.blur(),a.value?.blur();else if(e.multiple){let{value:e}=s;e?.blur()}else{let{value:e}=u;e?.blur()}}function oe(){e.filterable?(_.value=!1,d.value?.focus()):e.multiple?s.value?.focus():u.value?.focus()}function se(){let{value:e}=a;e&&(k(),e.focus())}function ce(){let{value:e}=a;e&&e.blur()}function le(e){let{value:t}=f;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=p;return e}function de(){return a.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){e.active||(pe(),fe=window.setTimeout(()=>{w.value&&(g.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),g.value=!1)}O(w,e=>{e||(g.value=!1)}),ne(()=>{ee(()=>{let t=d.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=_.value?-1:0)})}),rt(o,e.onResize);let{inlineThemeDisabled:_e}=e,ve=A(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:x,borderActive:S,arrowColor:C,arrowColorDisabled:w,loadingColor:T,colorActiveWarning:E,boxShadowFocusWarning:D,boxShadowActiveWarning:ee,boxShadowHoverWarning:O,borderWarning:k,borderFocusWarning:A,borderHoverWarning:j,borderActiveWarning:N,colorActiveError:P,boxShadowFocusError:F,boxShadowActiveError:I,boxShadowHoverError:L,borderError:z,borderFocusError:B,borderHoverError:V,borderActiveError:H,clearColor:U,clearColorHover:W,clearColorPressed:G,clearSize:K,arrowSize:q,[R(`height`,t)]:J,[R(`fontSize`,t)]:Y}}=b.value,X=M(c),Z=M(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":S,"--n-border-focus":y,"--n-border-hover":x,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":Y,"--n-height":J,"--n-padding-single-top":X.top,"--n-padding-multiple-top":Z.top,"--n-padding-single-right":X.right,"--n-padding-multiple-right":Z.right,"--n-padding-single-left":X.left,"--n-padding-multiple-left":Z.left,"--n-padding-single-bottom":X.bottom,"--n-padding-multiple-bottom":Z.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":w,"--n-loading-color":T,"--n-color-active-warning":E,"--n-box-shadow-focus-warning":D,"--n-box-shadow-active-warning":ee,"--n-box-shadow-hover-warning":O,"--n-border-warning":k,"--n-border-focus-warning":A,"--n-border-hover-warning":j,"--n-border-active-warning":N,"--n-color-active-error":P,"--n-box-shadow-focus-error":F,"--n-box-shadow-active-error":I,"--n-box-shadow-hover-error":L,"--n-border-error":z,"--n-border-focus-error":B,"--n-border-hover-error":V,"--n-border-active-error":H,"--n-clear-size":K,"--n-clear-color":U,"--n-clear-color-hover":W,"--n-clear-color-pressed":G,"--n-arrow-size":q,"--n-font-weight":r}}),ye=_e?l(`internal-selection`,A(()=>e.size[0]),ve,e):void 0;return{mergedTheme:b,mergedClearable:x,mergedClsPrefix:t,rtlEnabled:r,patternInputFocused:_,filterablePlaceholder:S,label:C,selected:w,showTagsPanel:g,isComposing:q,counterRef:f,counterWrapperRef:p,patternInputMirrorRef:i,patternInputRef:a,selfRef:o,multipleElRef:s,singleElRef:u,patternInputWrapperRef:d,overflowRef:m,inputTagElRef:h,handleMouseDown:G,handleFocusin:z,handleClear:V,handleMouseEnter:H,handleMouseLeave:W,handleDeleteOption:K,handlePatternKeyDown:J,handlePatternInputInput:X,handlePatternInputBlur:ae,handlePatternInputFocus:ie,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:B,handleCompositionEnd:re,handleCompositionStart:Z,onPopoverUpdateShow:ge,focus:oe,focusInput:se,blur:Q,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:e.renderLabel,cssVars:_e?void 0:ve,themeClass:ye?.themeClass,onRender:ye?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:i,maxTagCount:a,bordered:o,clsPrefix:c,ellipsisTagPopoverProps:l,onRender:u,renderTag:d,renderLabel:f}=this;u?.();let p=a===`responsive`,h=typeof a==`number`,g=p||h,_=(s(),C(ce,null,{default:()=>(s(),C(Ee,{clsPrefix:c,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>this.$slots.arrow?.()},1032,[`clsPrefix`,`loading`,`showArrow`,`showClear`,`onClear`]))},1024)),v;if(t){let{labelField:e}=this,t=t=>(s(),X(`div`,{class:N(`${c}-base-selection-tag-wrapper`),key:t.value},[d?(s(),X(I,{key:0},[V(()=>d({option:t,handleClose:()=>{this.handleDeleteOption(t)}}))],64)):(s(),C(tt,{key:1,size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>f?f(t,!0):je(t[e],t,!0)},1032,[`size`,`closable`,`disabled`,`onClose`]))],2)),o=()=>(h?this.selectedOptions.slice(0,a):this.selectedOptions).map(t),u=i?(s(),X(`div`,{class:N(`${c}-base-selection-input-tag`),ref:`inputTagElRef`,key:`__input-tag__`},[Z(`input`,m(this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${c}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,xt),Z(`span`,{ref:`patternInputMirrorRef`,class:N(`${c}-base-selection-input-tag__mirror`)},[V(()=>this.pattern)],2)],2)):null,y=p?()=>(s(),X(`div`,{class:N(`${c}-base-selection-tag-wrapper`),ref:`counterWrapperRef`},[(s(),C(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r},null,8,[`size`,`onMouseenter`,`onMouseleave`,`disabled`]))],2)):void 0,b;if(h){let e=this.selectedOptions.length-a;e>0&&(b=(t=>(s(),X(`div`,{class:N(`${c}-base-selection-tag-wrapper`),key:`__counter__`},[(s(),C(tt,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`},1032,[`size`,`onMouseenter`,`disabled`]))],2)))(b))}let x=p?i?(s(),C(qe,{key:3,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:y,tail:()=>u},1032,[`updateCounter`,`getCounter`,`getTail`])):(s(),C(qe,{key:4,ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:y},1032,[`updateCounter`,`getCounter`])):h&&b?o().concat(b):o(),S=g?()=>(s(),X(`div`,{class:N(`${c}-base-selection-popover`)},[p?(s(),X(I,{key:0},[V(()=>o())],64)):(s(),X(I,{key:1},[V(()=>this.selectedOptions.map(t))],64))],2)):void 0,w=g?{show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover,...l}:null,T=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?(s(),X(`div`,{key:5,class:N(`${c}-base-selection-placeholder ${c}-base-selection-overlay`)},[Z(`div`,{class:N(`${c}-base-selection-placeholder__inner`)},[V(()=>this.placeholder)],2)],2)):null,E=i?(s(),X(`div`,{key:6,ref:`patternInputWrapperRef`,class:N(`${c}-base-selection-tags`)},[V(()=>x),p?V(()=>null):(s(),X(I,{key:1},[V(()=>u)],64)),V(()=>_)],2)):(s(),X(`div`,{key:7,ref:`multipleElRef`,class:N(`${c}-base-selection-tags`),tabindex:r?void 0:0},[V(()=>x),V(()=>_)],10,St));v=(e=>(s(),X(I,{key:8},[g?(s(),C(be,m({key:0},w,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>E,default:S},1040)):(s(),X(I,{key:1},[V(()=>E)],64)),V(()=>T)],64)))(v)}else if(i){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;v=(e=>(s(),X(`div`,{key:9,ref:`patternInputWrapperRef`,class:N(`${c}-base-selection-label`),title:this.patternInputFocused?void 0:nt(this.label)},[Z(`input`,m(this.inputProps,{ref:`patternInputRef`,class:`${c}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd}),null,16,wt),n?(s(),X(`div`,{class:N(`${c}-base-selection-label__render-label ${c}-base-selection-overlay`),key:`input`},[Z(`div`,{class:N(`${c}-base-selection-overlay__wrapper`)},[d?(s(),X(I,{key:0},[V(()=>d({option:this.selectedOption,handleClose:()=>{}}))],64)):(s(),X(I,{key:1},[f?(s(),X(I,{key:0},[V(()=>f(this.selectedOption,!0))],64)):(s(),X(I,{key:1},[V(()=>je(this.label,this.selectedOption,!0))],64))],64))],2)],2)):V(()=>null),t?(s(),X(`div`,{class:N(`${c}-base-selection-placeholder ${c}-base-selection-overlay`),key:`placeholder`},[Z(`div`,{class:N(`${c}-base-selection-overlay__wrapper`)},[V(()=>this.filterablePlaceholder)],2)],2)):V(()=>null),V(()=>_)],10,Ct)))(v)}else v=(e=>(s(),X(`div`,{key:10,ref:`singleElRef`,class:N(`${c}-base-selection-label`),tabindex:this.disabled?void 0:0},[this.label===void 0?(s(),X(`div`,{class:N(`${c}-base-selection-placeholder ${c}-base-selection-overlay`),key:`placeholder`},[Z(`div`,{class:N(`${c}-base-selection-placeholder__inner`)},[V(()=>this.placeholder)],2)],2)):(s(),X(`div`,{class:N(`${c}-base-selection-input`),title:nt(this.label),key:`input`},[Z(`div`,{class:N(`${c}-base-selection-input__content`)},[d?(s(),X(I,{key:0},[V(()=>d({option:this.selectedOption,handleClose:()=>{}}))],64)):(s(),X(I,{key:1},[f?(s(),X(I,{key:0},[V(()=>f(this.selectedOption,!0))],64)):(s(),X(I,{key:1},[V(()=>je(this.label,this.selectedOption,!0))],64))],64))],2)],10,[`title`])),V(()=>_)],10,Tt)))(v);return s(),X(`div`,{ref:`selfRef`,class:N([`${c}-base-selection`,this.rtlEnabled&&`${c}-base-selection--rtl`,this.themeClass,e&&`${c}-base-selection--${e}-status`,{[`${c}-base-selection--active`]:this.active,[`${c}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${c}-base-selection--disabled`]:this.disabled,[`${c}-base-selection--multiple`]:this.multiple,[`${c}-base-selection--focus`]:this.focused}]),style:J(this.cssVars),onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},[V(()=>v),o?(s(),X(`div`,{key:0,class:N(`${c}-base-selection__border`)},null,2)):V(()=>null),o?(s(),X(`div`,{key:2,class:N(`${c}-base-selection__state-border`)},null,2)):V(()=>null)],46,Et)}}),Ot=y([t(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),t(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[le({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),kt={...c.props,to:xe.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array},At=g({name:`Select`,props:kt,slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=te(e),o=c(`Select`,`-select`,Ot,Ne,e,t),s=j(e.defaultValue),u=U(e,`value`),f=pe(u,s),m=j(!1),h=j(``),g=fe(e,[`items`,`options`]),_=j([]),v=j([]),y=A(()=>v.value.concat(_.value).concat(g.value)),b=A(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return gt(e,i);let a=t[r];return typeof a==`string`?gt(e,a):typeof a==`number`&&gt(e,String(a))}}),x=A(()=>{if(e.remote)return g.value;{let{value:t}=y,{value:n}=h;return!n.length||!e.filterable?t:vt(t,b.value,n,e.childrenField)}}),C=A(()=>{let{valueField:t,childrenField:n}=e,r=_t(t,n);return we(x.value,r)}),w=A(()=>yt(y.value,e.valueField,e.childrenField)),T=j(!1),E=pe(U(e,`show`),T),D=j(null),ee=j(null),k=j(null),{localeRef:M}=re(`Select`),N=A(()=>e.placeholder??M.value.placeholder),P=[],F=j(new Map),I=A(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function L(t){let n=e.remote,{value:r}=F,{value:i}=w,{value:a}=I,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let R=A(()=>{if(e.multiple){let{value:e}=f;return Array.isArray(e)?L(e):[]}return null}),z=A(()=>{let{value:t}=f;return!e.multiple&&!Array.isArray(t)?t===null?null:L([t])[0]||null:null}),B=S(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:a?.value?.Select?.size||`medium`}}),{mergedSizeRef:V,mergedDisabledRef:H,mergedStatusRef:W}=B;function G(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:c}=B;r&&d(r,t,n),a&&d(a,t,n),i&&d(i,t,n),s.value=t,o(),c()}function K(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=B;n&&d(n,t),r()}function q(){let{onClear:t}=e;t&&d(t)}function J(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=B;n&&d(n,t),i(),r&&ae()}function Y(t){let{onSearch:n}=e;n&&d(n,t)}function X(t){let{onScroll:n}=e;n&&d(n,t)}function Z(){let{remote:t,multiple:n}=e;if(t){let{value:t}=F;if(n){let{valueField:n}=e;R.value?.forEach(e=>{t.set(e[n],e)})}else{let n=z.value;n&&t.set(n[e.valueField],n)}}}function ne(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&d(n,t),r&&d(r,t),T.value=t}function ae(){H.value||(ne(!0),T.value=!0,e.filterable&&Pe())}function Q(){ne(!1)}function oe(){h.value=``,v.value=P}let se=j(!1);function ce(){e.filterable&&(se.value=!0)}function le(){e.filterable&&(se.value=!1,E.value||oe())}function ue(){H.value||(E.value?e.filterable?Pe():Q():ae())}function de(e){k.value?.selfRef?.contains(e.relatedTarget)||(m.value=!1,K(e),Q())}function me(e){J(e),m.value=!0}function he(){m.value=!0}function ge(e){D.value?.$el.contains(e.relatedTarget)||(m.value=!1,K(e),Q())}function _e(){D.value?.focus(),Q()}function ve(e){E.value&&(D.value?.$el.contains(ie(e))||Q())}function ye(t){if(!Array.isArray(t))return[];if(I.value)return Array.from(t);{let{remote:n}=e,{value:r}=w;if(n){let{value:e}=F;return t.filter(t=>r.has(t)||e.has(t))}return t.filter(e=>r.has(e))}}function be(e){Se(e.rawNode)}function Se(t){if(H.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=v,t=e[0]||null;if(t){let e=_.value;e.length?e.push(t):_.value=[t],v.value=P}}if(r&&F.value.set(t[a],t),e.multiple){let e=ye(f.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Te(t[a]);~e&&(_.value.splice(e,1),i&&(h.value=``))}}else e.push(t[a]),i&&(h.value=``);G(e,L(e))}else{if(n&&!r){let e=Te(t[a]);~e?_.value=[_.value[e]]:_.value=P}Me(),Q(),G(t[a],t)}}function Te(t){return _.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){E.value||ae();let{value:n}=t.target;h.value=n;let{tag:r,remote:i}=e;if(Y(n),r&&!i){if(!n){v.value=P;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;g.value.some(e=>e[i]===r[i]||e[a]===r[a])||_.value.some(e=>e[i]===r[i]||e[a]===r[a])?v.value=P:v.value=[r]}}function De(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Q(),r&&!i&&a&&(_.value=P),q(),n?G([],[]):G(null,null)}function Oe(e){!Ce(e,`action`)&&!Ce(e,`empty`)&&!Ce(e,`header`)&&e.preventDefault()}function ke(e){X(e)}function je(t){if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!D.value?.isComposing){if(E.value){let t=k.value?.getPendingTmNode();t?be(t):e.filterable||(Q(),Me())}else if(ae(),e.tag&&se.value){let t=v.value[0];if(t){let n=t[e.valueField],{value:r}=f;e.multiple&&Array.isArray(r)&&r.includes(n)||Se(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;E.value&&k.value?.prev();break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;E.value?k.value?.next():ae();break;case`Escape`:E.value&&(Ae(t),Q()),D.value?.focus()}}function Me(){D.value?.focus()}function Pe(){D.value?.focusInput()}function Fe(){E.value&&ee.value?.syncPosition()}Z(),O(U(e,`options`),Z);let Ie={focus:()=>{D.value?.focus()},focusInput:()=>{D.value?.focusInput()},blur:()=>{D.value?.blur()},blurInput:()=>{D.value?.blurInput()}},Le=A(()=>{let{self:{menuBoxShadow:e}}=o.value;return{"--n-menu-box-shadow":e}}),Re=i?l(`select`,void 0,Le,e):void 0;return{...Ie,mergedStatus:W,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:C,isMounted:p(),triggerRef:D,menuRef:k,pattern:h,uncontrolledShow:T,mergedShow:E,adjustedTo:xe(e),uncontrolledValue:s,mergedValue:f,followerRef:ee,localizedPlaceholder:N,selectedOption:z,selectedOptions:R,mergedSize:V,mergedDisabled:H,focused:m,activeWithoutMenuOpen:se,inlineThemeDisabled:i,onTriggerInputFocus:ce,onTriggerInputBlur:le,handleTriggerOrMenuResize:Fe,handleMenuFocus:he,handleMenuBlur:ge,handleMenuTabOut:_e,handleTriggerClick:ue,handleToggle:be,handleDeleteOption:Se,handlePatternInput:Ee,handleClear:De,handleTriggerBlur:de,handleTriggerFocus:me,handleKeydown:je,handleMenuAfterLeave:oe,handleMenuClickOutside:ve,handleMenuScroll:ke,handleMenuKeydown:je,handleMenuMousedown:Oe,mergedTheme:o,cssVars:i?void 0:Le,themeClass:Re?.themeClass,onRender:Re?.onRender}},render(){return s(),X(`div`,{class:N(`${this.mergedClsPrefix}-select`)},[i(de,null,{_:1,default:F(()=>[(s(),C(ye,null,{_:1,default:F(()=>(s(),C(Dt,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{_:1,arrow:F(()=>[this.$slots.arrow?.()])},8,`inlineThemeDisabled.status.inputProps.clsPrefix.showArrow.maxTagCount.ellipsisTagPopoverProps.bordered.active.pattern.placeholder.selectedOption.selectedOptions.multiple.renderTag.renderLabel.filterable.clearable.disabled.size.theme.labelField.valueField.themeOverrides.loading.focused.onClick.onDeleteOption.onPatternInput.onClear.onBlur.onFocus.onKeydown.onPatternBlur.onPatternFocus.onResize.ignoreComposition`.split(`.`))))})),(s(),C(ge,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===xe.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{_:1,default:F(()=>(s(),C(z,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{_:1,default:F(()=>this.mergedShow||this.displayDirective===`show`?(this.onRender?.(),e((s(),C(pt,m(this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{_:1,empty:F(()=>[this.$slots.empty?.()]),header:F(()=>[this.$slots.header?.()]),action:F(()=>[this.$slots.action?.()])},16,`onResize.inlineThemeDisabled.virtualScroll.class.clsPrefix.labelField.valueField.nodeProps.theme.themeOverrides.treeMate.multiple.size.renderOption.renderLabel.value.style.onToggle.onScroll.onFocus.onBlur.onKeydown.onTabOut.onMousedown.show.showCheckmark.resetMenuOnOptionsChange.scrollbarProps`.split(`.`))),this.displayDirective===`show`?[[P,this.mergedShow],[Q,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Q,this.handleMenuClickOutside,void 0,{capture:!0}]])):null)},8,[`appear`,`onAfterLeave`])))},8,[`show`,`to`,`teleportDisabled`,`containerClass`,`width`,`placement`]))])})],2)}});export{nt as a,ot as i,_t as n,Ge as o,pt as r,At as t};