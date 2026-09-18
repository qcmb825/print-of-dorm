import{U as e,Y as t,dt as n,zt as r}from"./endpoints-C3DHQTsP.js";import{A as i,Gt as a,Wt as o,ot as s,rt as c,st as l}from"./Button-CRn1PyiM.js";var u={iconSizeTiny:`28px`,iconSizeSmall:`34px`,iconSizeMedium:`40px`,iconSizeLarge:`46px`,iconSizeHuge:`52px`};function d(e){let{textColorDisabled:t,iconColor:n,textColor2:r,fontSizeTiny:i,fontSizeSmall:a,fontSizeMedium:o,fontSizeLarge:s,fontSizeHuge:c}=e;return{...u,fontSizeTiny:i,fontSizeSmall:a,fontSizeMedium:o,fontSizeLarge:s,fontSizeHuge:c,textColor:t,iconColor:n,extraTextColor:r}}var f={name:`Empty`,common:i,self:d},p=a(`base-icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[o(`svg`,`
 height: 1em;
 width: 1em;
 `)]),m=[`onClick`,`onMousedown`,`onMouseup`,`role`,`aria-label`,`aria-hidden`,`aria-disabled`],h=t({name:`BaseIcon`,props:{role:String,ariaLabel:String,ariaDisabled:{type:Boolean,default:void 0},ariaHidden:{type:Boolean,default:void 0},clsPrefix:{type:String,required:!0},onClick:Function,onMousedown:Function,onMouseup:Function},setup(e){l(`-base-icon`,p,r(e,`clsPrefix`))},render(){return n(),e(`i`,{class:c(`${this.clsPrefix}-base-icon`),onClick:this.onClick,onMousedown:this.onMousedown,onMouseup:this.onMouseup,role:this.role,"aria-label":this.ariaLabel,"aria-hidden":this.ariaHidden,"aria-disabled":this.ariaDisabled},[s(()=>this.$slots.default?.())],42,m)}});export{f as n,d as r,h as t};