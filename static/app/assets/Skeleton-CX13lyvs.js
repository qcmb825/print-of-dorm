import{$t as e,L as t,Pn as n,Tn as r,Un as i,V as a,_ as o,_n as s,an as c,bt as l,en as u,ht as d,jn as f,kn as p,ut as m,xn as h,z as g}from"./endpoints-Bo2NXLxK.js";var _=!1;function v(){if(o&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:g,self:y},x=e([u(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),e(`@keyframes skeleton-loading`,`
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
 `)]),S={...t.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=p({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=l(e),i=h(()=>e.size||r?.value?.Skeleton?.size),a=t(`Skeleton`,`-skeleton`,x,b,e,n);return{mergedClsPrefix:n,style:h(()=>{let t=a.value,{common:{cubicBezierEaseInOut:n}}=t,r=t.self,{color:o,colorEnd:s,borderRadius:l}=r,u,{circle:d,sharp:f,round:p,width:h,height:g,text:_,animated:v}=e,y=i.value;y!==void 0&&(u=r[c(`height`,y)]);let b=d?h??g??u:h,x=(d?h??g:g)??u;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:d?`50%`:p?`4096px`:f?``:l,width:typeof b==`number`?m(b):b,height:typeof x==`number`?m(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:e,style:t,mergedClsPrefix:o,$attrs:c}=this,l=f(`div`,n({class:`${o}-skeleton`,style:t},c));return e>1?(i(),r(s,{key:1},[d(()=>a(e,null).map(e=>[l,`
`]))],64)):l}});export{C as t};