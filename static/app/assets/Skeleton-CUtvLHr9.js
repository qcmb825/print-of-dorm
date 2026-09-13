import{$t as e,B as t,Dn as n,I as r,Mn as i,Qt as a,R as o,Vn as s,bn as c,g as l,gn as u,in as d,kn as f,lt as p,mt as m,wn as h,yt as g}from"./endpoints-BzNG02YK.js";var _=!1;function v(){if(l&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:o,self:y},x=a([e(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),a(`@keyframes skeleton-loading`,`
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
 `)]),S={...r.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=n({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:n}=g(e),i=c(()=>e.size||n?.value?.Skeleton?.size),a=r(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:c(()=>{let t=a.value,{common:{cubicBezierEaseInOut:n}}=t,r=t.self,{color:o,colorEnd:s,borderRadius:c}=r,l,{circle:u,sharp:f,round:m,width:h,height:g,text:_,animated:v}=e,y=i.value;y!==void 0&&(l=r[d(`height`,y)]);let b=u?h??g??l:h,x=(u?h??g:g)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:u?`50%`:m?`4096px`:f?``:c,width:typeof b==`number`?p(b):b,height:typeof x==`number`?p(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:e,style:n,mergedClsPrefix:r,$attrs:a}=this,o=f(`div`,i({class:`${r}-skeleton`,style:n},a));return e>1?(s(),h(u,{key:1},[m(()=>t(e,null).map(e=>[o,`
`]))],64)):o}});export{C as t};