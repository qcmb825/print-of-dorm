import{Dt as e,H as t,In as n,J as r,K as i,Mn as a,On as o,Rn as s,St as c,Vn as l,Xn as u,_t as d,fn as f,on as p,sn as m,wn as h,x as g}from"./endpoints-D7YssODM.js";var _=!1;function v(){if(g&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:i,self:y},x=p([m(`skeleton`,`
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
 `)]),S={...t.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=n({name:`Skeleton`,inheritAttrs:!1,props:S,setup(n){v();let{mergedClsPrefixRef:r,mergedComponentPropsRef:i}=e(n),a=o(()=>n.size||i?.value?.Skeleton?.size),s=t(`Skeleton`,`-skeleton`,x,b,n,r);return{mergedClsPrefix:r,style:o(()=>{let e=s.value,{common:{cubicBezierEaseInOut:t}}=e,r=e.self,{color:i,colorEnd:o,borderRadius:c}=r,l,{circle:u,sharp:p,round:m,width:h,height:g,text:_,animated:v}=n,y=a.value;y!==void 0&&(l=r[f(`height`,y)]);let b=u?h??g??l:h,x=(u?h??g:g)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:u?`50%`:m?`4096px`:p?``:c,width:typeof b==`number`?d(b):b,height:typeof x==`number`?d(x):x,animation:v?``:`none`,"--n-bezier":t,"--n-color-start":i,"--n-color-end":o}})}},render(){let{repeat:e,style:t,mergedClsPrefix:n,$attrs:i}=this,o=s(`div`,l({class:`${n}-skeleton`,style:t},i));return e>1?(u(),a(h,{key:1},[c(()=>r(e,null).map(e=>[o,`
`]))],64)):o}});export{v as n,C as t};