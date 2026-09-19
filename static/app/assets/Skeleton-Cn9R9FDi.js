import{E as e,F as t,J as n,M as r,S as i,_ as a,z as o}from"./endpoints-NGWT2QHn.js";import{$t as s,F as c,Jt as l,N as u,c as d,it as f,k as p,lt as m,mt as h,qt as g}from"./Button-BESWyFjO.js";var _=!1;function v(){if(d&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:u,self:y},x=g([l(`skeleton`,`
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
 `)]),S={...p.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=r({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:n}=h(e),r=i(()=>e.size||n?.value?.Skeleton?.size),a=p(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:i(()=>{let t=a.value,{common:{cubicBezierEaseInOut:n}}=t,i=t.self,{color:o,colorEnd:c,borderRadius:l}=i,u,{circle:d,sharp:p,round:m,width:h,height:g,text:_,animated:v}=e,y=r.value;y!==void 0&&(u=i[s(`height`,y)]);let b=d?h??g??u:h,x=(d?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:m?`4096px`:p?``:l,width:typeof b==`number`?f(b):b,height:typeof x==`number`?f(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":c}})}},render(){let{repeat:r,style:i,mergedClsPrefix:s,$attrs:l}=this,u=t(`div`,o({class:`${s}-skeleton`,style:i},l));return r>1?(n(),e(a,{key:1},[m(()=>c(r,null).map(e=>[u,`
`]))],64)):u}});export{v as n,C as t};