import{$ as e,A as t,E as n,I as r,U as i,x as a,z as o}from"./useApi-BPuI6ZR9-BM-pFei4.js";import{A as s,O as c,Rt as l,Wt as u,at as d,c as f,et as p,zt as m}from"./createLucideIcon-ClRkaCjD.js";import{ct as h,dt as g}from"./index-DqjpbDj4.js";var _=!1;function v(){if(f&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:s,self:y},x=l([m(`skeleton`,`
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
 `)]),S={...c.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=r({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:r}=d(e),i=n(()=>e.size||r?.value?.Skeleton?.size),a=c(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:n(()=>{let t=a.value,{common:{cubicBezierEaseInOut:n}}=t,r=t.self,{color:o,colorEnd:s,borderRadius:c}=r,l,{circle:d,sharp:f,round:p,width:m,height:h,text:_,animated:v}=e,y=i.value;y!==void 0&&(l=r[u(`height`,y)]);let b=d?m??h??l:m,x=(d?m??h:h)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:p?`4096px`:f?``:c,width:typeof b==`number`?g(b):b,height:typeof x==`number`?g(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:n,style:r,mergedClsPrefix:s,$attrs:c}=this,l=o(`div`,i({class:`${s}-skeleton`,style:r},c));return n>1?(e(),t(a,{key:1},[p(()=>h(n,null).map(e=>[l,`
`]))],64)):l}});export{v as n,C as t};