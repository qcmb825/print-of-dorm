import{$t as e,An as t,B as n,Hn as r,I as i,Nn as a,On as o,Qt as s,R as c,bn as l,g as u,gn as d,in as f,lt as p,mt as m,wn as h,yt as g}from"./endpoints-BjKpicAD.js";var _=!1;function v(){if(u&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:c,self:y},x=s([e(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),s(`@keyframes skeleton-loading`,`
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
 `)]),S={...i.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=o({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:n}=g(e),r=l(()=>e.size||n?.value?.Skeleton?.size),a=i(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:l(()=>{let t=a.value,{common:{cubicBezierEaseInOut:n}}=t,i=t.self,{color:o,colorEnd:s,borderRadius:c}=i,l,{circle:u,sharp:d,round:m,width:h,height:g,text:_,animated:v}=e,y=r.value;y!==void 0&&(l=i[f(`height`,y)]);let b=u?h??g??l:h,x=(u?h??g:g)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:u?`50%`:m?`4096px`:d?``:c,width:typeof b==`number`?p(b):b,height:typeof x==`number`?p(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:e,style:i,mergedClsPrefix:o,$attrs:s}=this,c=t(`div`,a({class:`${o}-skeleton`,style:i},s));return e>1?(r(),h(d,{key:1},[m(()=>n(e,null).map(e=>[c,`
`]))],64)):c}});export{C as t};