import{Cn as e,Dn as t,Gn as n,In as r,Nn as i,St as a,U as o,V as s,_t as c,ft as l,jn as u,nn as d,sn as f,tn as p,y as m,yn as h,z as g}from"./endpoints-gDUDUnKI.js";var _=!1;function v(){if(m&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:s,self:y},x=p([d(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),p(`@keyframes skeleton-loading`,`
 0% {
 background: var(--n-color-start);
 }
 40% {
 background: var(--n-color-end);
 }
 80% {
 background: var(--n-color-start);
 }
 100% {
 background: var(--n-color-start);
 }
 `)]),S={...g.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=u({name:`Skeleton`,inheritAttrs:!1,props:S,setup(t){v();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=a(t),i=e(()=>t.size||r?.value?.Skeleton?.size),o=g(`Skeleton`,`-skeleton`,x,b,t,n);return{mergedClsPrefix:n,style:e(()=>{let e=o.value,{common:{cubicBezierEaseInOut:n}}=e,r=e.self,{color:a,colorEnd:s,borderRadius:c}=r,u,{circle:d,sharp:p,round:m,width:h,height:g,text:_,animated:v}=t,y=i.value;y!==void 0&&(u=r[f(`height`,y)]);let b=d?h??g??u:h,x=(d?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:m?`4096px`:p?``:c,width:typeof b==`number`?l(b):b,height:typeof x==`number`?l(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":a,"--n-color-end":s}})}},render(){let{repeat:e,style:a,mergedClsPrefix:s,$attrs:l}=this,u=i(`div`,r({class:`${s}-skeleton`,style:a},l));return e>1?(n(),t(h,{key:1},[c(()=>o(e,null).map(e=>[u,`
`]))],64)):u}});export{v as n,C as t};