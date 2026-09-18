import{P as e,Q as t,U as n,Y as r,dt as i,nt as a,z as o}from"./endpoints-C3DHQTsP.js";import{A as s,Gt as c,M as l,O as u,Wt as d,Xt as f,c as p,dt as m,ot as h,tt as g}from"./Button-CRn1PyiM.js";var _=!1;function v(){if(p&&window.CSS&&!_&&(_=!0,`registerProperty`in window?.CSS))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function y(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var b={name:`Skeleton`,common:s,self:y},x=d([c(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),d(`@keyframes skeleton-loading`,`
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
 `)]),S={...u.props,text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}},C=r({name:`Skeleton`,inheritAttrs:!1,props:S,setup(e){v();let{mergedClsPrefixRef:t,mergedComponentPropsRef:n}=m(e),r=o(()=>e.size||n?.value?.Skeleton?.size),i=u(`Skeleton`,`-skeleton`,x,b,e,t);return{mergedClsPrefix:t,style:o(()=>{let t=i.value,{common:{cubicBezierEaseInOut:n}}=t,a=t.self,{color:o,colorEnd:s,borderRadius:c}=a,l,{circle:u,sharp:d,round:p,width:m,height:h,text:_,animated:v}=e,y=r.value;y!==void 0&&(l=a[f(`height`,y)]);let b=u?m??h??l:m,x=(u?m??h:h)??l;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:u?`50%`:p?`4096px`:d?``:c,width:typeof b==`number`?g(b):b,height:typeof x==`number`?g(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":o,"--n-color-end":s}})}},render(){let{repeat:r,style:o,mergedClsPrefix:s,$attrs:c}=this,u=t(`div`,a({class:`${s}-skeleton`,style:o},c));return r>1?(i(),n(e,{key:1},[h(()=>l(r,null).map(e=>[u,`
`]))],64)):u}});export{v as n,C as t};