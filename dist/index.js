"use strict";var t=function(i,r){return function(){try{return r||i((r={exports:{}}).exports,r),r.exports}catch(u){throw (r=0, u)}};};var h=t(function(J,j){
var d=require('@stdlib/math-base-special-fast-min/dist'),f=require('@stdlib/blas-base-dcopy/dist').ndarray;function w(i,r,u,y,e,n,o,v,q,c){var p,s,a;return i<=0||n===0||r>=i||(a=d(d(y,i)-u,i-r),a<=0)?e:(p=o+u*n,s=o+r*n,u<r+a&&r<u+a?(f(a,e,n,p,v,q,c),f(a,v,q,c,e,n,s),e):(f(a,e,n,p,e,n,s),e))}j.exports=w
});var _=t(function(K,R){
var l=require('@stdlib/strided-base-stride2offset/dist'),z=h();function A(i,r,u,y,e,n,o,v){var q=l(i,n),c=l(i,v);return z(i,r,u,y,e,n,q,o,v,c)}R.exports=A
});var W=t(function(L,O){
var B=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),E=_(),C=h();B(E,"ndarray",C);O.exports=E
});var D=require("path").join,F=require('@stdlib/utils-try-require/dist'),G=require('@stdlib/assert-is-error/dist'),H=W(),m,b=F(D(__dirname,"./native.js"));G(b)?m=H:m=b;module.exports=m;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
