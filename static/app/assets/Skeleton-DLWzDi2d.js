import{H as e,K as t,L as n,Q as r,at as i,mt as a,tt as o}from"./endpoints-BhTSb8lj.js";import{Gt as s,Kt as c,N as l,Zt as u,ft as d,j as f,k as p,l as m,nt as h,st as g}from"./createLucideIcon-Byg0Q1WZ.js";var _=!1;function v(){if(m&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:f,self:y},x=s([c(`skeleton`,`
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
 `)]),S={...p.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=r({name:`Skeleton`,inheritAttrs:!1,props:S,setup(t){v();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=d(t),i=e(()=>t.size||r?.value?.Skeleton?.size),a=p(`Skeleton`,`-skeleton`,x,b,t,n);return{mergedClsPrefix:n,style:e(()=>{let e=a.value,{common:{cubicBezierEaseInOut:n}}=e,r=e.self,{color:o,colorEnd:s,borderRadius:c}=r,l,{circle:d,sharp:f,round:p,width:m,height:g,text:_,animated:v}=t,y=i.value;y!==void 0&&(l=r[u(`height`,y)]);let b=d?m??g??l:m,x=(d?m??g:g)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:p?`4096px`:f?``:c,width:typeof b==`number`?h(b):b,height:typeof x==`number`?h(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:e,style:r,mergedClsPrefix:s,$attrs:c}=this,u=o(`div`,i({class:`${s}-skeleton`,style:r},c));return e>1?(a(),t(n,{key:1},[g(()=>l(e,null).map(e=>[u,`
`]))],64)):u}});export{v as n,C as t};