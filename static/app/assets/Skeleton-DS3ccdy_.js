import{B as e,C as t,D as n,I as r,N as i,Y as a,v as o}from"./endpoints-Dbyqu7A9.js";import{$t as s,F as c,Jt as l,N as u,c as d,it as f,k as p,lt as m,mt as h,qt as g}from"./Button-BxGCouy9.js";var _=!1;function v(){if(d&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:u,self:y},x=g([l(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),g(`@keyframes skeleton-loading`,`
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
 `)]),S={...p.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=i({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=h(e),i=t(()=>e.size||r?.value?.Skeleton?.size),a=p(`Skeleton`,`-skeleton`,x,b,e,n);return{mergedClsPrefix:n,style:t(()=>{let t=a.value,{common:{cubicBezierEaseInOut:n}}=t,r=t.self,{color:o,colorEnd:c,borderRadius:l}=r,u,{circle:d,sharp:p,round:m,width:h,height:g,text:_,animated:v}=e,y=i.value;y!==void 0&&(u=r[s(`height`,y)]);let b=d?h??g??u:h,x=(d?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:m?`4096px`:p?``:l,width:typeof b==`number`?f(b):b,height:typeof x==`number`?f(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":c}})}},render(){let{repeat:t,style:i,mergedClsPrefix:s,$attrs:l}=this,u=r(`div`,e({class:`${s}-skeleton`,style:i},l));return t>1?(a(),n(o,{key:1},[m(()=>c(t,null).map(e=>[u,`
`]))],64)):u}});export{v as n,C as t};