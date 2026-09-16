import{An as e,B as t,En as n,Fn as r,H as i,Mn as a,R as o,Sn as s,Wn as c,dt as l,en as u,gt as d,on as f,tn as p,v as m,vn as h,xt as g}from"./endpoints-BvEVWgoh.js";var _=!1;function v(){if(m&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:t,self:y},x=u([p(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),u(`@keyframes skeleton-loading`,`
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
 `)]),S={...o.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=e({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:n}=g(e),r=s(()=>e.size||n?.value?.Skeleton?.size),i=o(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:s(()=>{let t=i.value,{common:{cubicBezierEaseInOut:n}}=t,a=t.self,{color:o,colorEnd:s,borderRadius:c}=a,u,{circle:d,sharp:p,round:m,width:h,height:g,text:_,animated:v}=e,y=r.value;y!==void 0&&(u=a[f(`height`,y)]);let b=d?h??g??u:h,x=(d?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:m?`4096px`:p?``:c,width:typeof b==`number`?l(b):b,height:typeof x==`number`?l(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:e,style:t,mergedClsPrefix:o,$attrs:s}=this,l=a(`div`,r({class:`${o}-skeleton`,style:t},s));return e>1?(c(),n(h,{key:1},[d(()=>i(e,null).map(e=>[l,`
`]))],64)):l}});export{C as t};