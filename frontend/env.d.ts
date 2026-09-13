/// <reference types="vite/client" />

// 这里刻意**不写** `declare module '*.vue'` 通配声明：
// vue-tsc 能直接解析 SFC 的真实类型，加了通配反而会把组件 props 全部退化成 any，
// 组件之间传参就失去类型检查了。
