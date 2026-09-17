import{Dt as e,H as t,Hn as n,J as r,K as i,Ln as a,Mn as o,On as s,St as c,Zn as l,_t as u,fn as d,on as f,sn as p,wn as m,x as h,zn as g}from"./endpoints-DxQPCLqF.js";var _=!1;function v(){if(h&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:i,self:y},x=f([p(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),f(`@keyframes skeleton-loading`,`
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
 `)]),S={...t.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=a({name:`Skeleton`,inheritAttrs:!1,props:S,setup(n){v();let{mergedClsPrefixRef:r,mergedComponentPropsRef:i}=e(n),a=s(()=>n.size||i?.value?.Skeleton?.size),o=t(`Skeleton`,`-skeleton`,x,b,n,r);return{mergedClsPrefix:r,style:s(()=>{let e=o.value,{common:{cubicBezierEaseInOut:t}}=e,r=e.self,{color:i,colorEnd:s,borderRadius:c}=r,l,{circle:f,sharp:p,round:m,width:h,height:g,text:_,animated:v}=n,y=a.value;y!==void 0&&(l=r[d(`height`,y)]);let b=f?h??g??l:h,x=(f?h??g:g)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:f?`50%`:m?`4096px`:p?``:c,width:typeof b==`number`?u(b):b,height:typeof x==`number`?u(x):x,animation:v?``:`none`,"--n-bezier":t,"--n-color-start":i,"--n-color-end":s}})}},render(){let{repeat:e,style:t,mergedClsPrefix:i,$attrs:a}=this,s=g(`div`,n({class:`${i}-skeleton`,style:t},a));return e>1?(l(),o(m,{key:1},[c(()=>r(e,null).map(e=>[s,`
`]))],64)):s}});export{v as n,C as t};