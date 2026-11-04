import{H as e,Z as t,ot as n,q as r,rt as i,ut as a,yt as o}from"./endpoints-b5Af9CM_.js";import{F as s,L as c,Xt as l,Zt as u,_t as d,ft as f,h as p,nn as m,st as h,z as g}from"./motion-B_h_1Mmt.js";var _=!1;function v(){if(p&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:c,self:y},x=l([u(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),l(`@keyframes skeleton-loading`,`
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
 `)]),S={...s.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=i({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:n}=d(e),i=r(()=>e.size||n?.value?.Skeleton?.size),a=s(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:r(()=>{let t=a.value,{common:{cubicBezierEaseInOut:n}}=t,r=t.self,{color:o,colorEnd:s,borderRadius:c}=r,l,{circle:u,sharp:d,round:f,width:p,height:g,text:_,animated:v}=e,y=i.value;y!==void 0&&(l=r[m(`height`,y)]);let b=u?p??g??l:p,x=(u?p??g:g)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:u?`50%`:f?`4096px`:d?``:c,width:typeof b==`number`?h(b):b,height:typeof x==`number`?h(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:r,style:i,mergedClsPrefix:s,$attrs:c}=this,l=n(`div`,a({class:`${s}-skeleton`,style:i},c));return r>1?(o(),t(e,{key:1},[f(()=>g(r,null).map(e=>[l,`
`]))],64)):l}});export{v as n,C as t};