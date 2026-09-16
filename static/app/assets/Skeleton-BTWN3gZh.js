import{Bn as e,Cn as t,Dn as n,Et as r,Fn as i,G as a,Ln as o,V as s,Yn as c,an as l,dn as u,gt as d,jn as f,on as p,q as m,x as h,xt as g}from"./endpoints-DguQVVk7.js";var _=!1;function v(){if(h&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:a,self:y},x=l([p(`skeleton`,`
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
 `)]),S={...s.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=i({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:i}=r(e),a=n(()=>e.size||i?.value?.Skeleton?.size),o=s(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:n(()=>{let t=o.value,{common:{cubicBezierEaseInOut:n}}=t,r=t.self,{color:i,colorEnd:s,borderRadius:c}=r,l,{circle:f,sharp:p,round:m,width:h,height:g,text:_,animated:v}=e,y=a.value;y!==void 0&&(l=r[u(`height`,y)]);let b=f?h??g??l:h,x=(f?h??g:g)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:f?`50%`:m?`4096px`:p?``:c,width:typeof b==`number`?d(b):b,height:typeof x==`number`?d(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":i,"--n-color-end":s}})}},render(){let{repeat:n,style:r,mergedClsPrefix:i,$attrs:a}=this,s=o(`div`,e({class:`${i}-skeleton`,style:r},a));return n>1?(c(),f(t,{key:1},[g(()=>m(n,null).map(e=>[s,`
`]))],64)):s}});export{v as n,C as t};