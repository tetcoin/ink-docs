(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{72:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return b})),a.d(t,"rightToc",(function(){return o})),a.d(t,"default",(function(){return s}));var n=a(2),r=a(6),i=(a(0),a(96)),c={title:"ink! vs. Solidity",slug:"/ink-vs-solidity"},b={unversionedId:"faq/ink-vs-solidity",id:"faq/ink-vs-solidity",isDocsHomePage:!1,title:"ink! vs. Solidity",description:"Rust is an ideal smart contract language. It is type safe, memory safe, and free of undefined behaviors. It generates small binaries because it doesn\u2019t include extra bloat, like a garbage collector, and advanced optimizations and tree shaking remove dead code. Through compiler flags, Rust can automatically protect against integer overflow.",source:"@site/docs/faq/ink-vs-solidity.md",slug:"/ink-vs-solidity",permalink:"/ink-docs/ink-vs-solidity",editUrl:"https://github.com/ink-docs/edit/master/docs/faq/ink-vs-solidity.md",version:"current",sidebar:"reference",previous:{title:"Frequently Asked Questions",permalink:"/ink-docs/faq"}},o=[],l={rightToc:o};function s(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Rust is an ideal smart contract language. It is type safe, memory safe, and free of undefined behaviors. It generates small binaries because it doesn\u2019t include extra bloat, like a garbage collector, and advanced optimizations and tree shaking remove dead code. Through compiler flags, Rust can automatically protect against integer overflow."),Object(i.b)("p",null,"ink! chooses not to invent a new programming language, but rather adapt a subset of Rust to serve this purpose. As a result, you gain from all of the tooling and support available to the Rust ecosystem for free. In addition, as the language develops, ink! will automatically gain access to new features and functionality, improving how you can write smart contracts in the future."),Object(i.b)("p",null,"Here is a brief comparison of features between ink! and Solidity:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:"left"})),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"ink!"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Solidity"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Virtual Machine"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Any Wasm VM"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"EVM")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Encoding"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Wasm"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"EVM Byte Code")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Language"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Rust"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Standalone")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Overflow Protection"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Enabled by default"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"None")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Constructor Functions"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Multiple"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Single")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Tooling"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Anything that supports Rust"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Custom")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Versioning"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Semantic"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Semantic")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Has Metadata?"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Yes"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Yes")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Multi-File Project"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Planned"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Yes")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Storage Entries"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Variable"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"256 bits")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Supported Types"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Docs"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Docs")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Has Interfaces?"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Yes (Rust Traits)"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Yes")))))}s.isMDXComponent=!0},96:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return f}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),s=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):b(b({},t),e)),a},d=function(e){var t=s(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},O=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,c=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),d=s(a),O=n,f=d["".concat(c,".").concat(O)]||d[O]||p[O]||i;return a?r.a.createElement(f,b(b({ref:t},l),{},{components:a})):r.a.createElement(f,b({ref:t},l))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,c=new Array(i);c[0]=O;var b={};for(var o in t)hasOwnProperty.call(t,o)&&(b[o]=t[o]);b.originalType=e,b.mdxType="string"==typeof e?e:n,c[1]=b;for(var l=2;l<i;l++)c[l]=a[l];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}O.displayName="MDXCreateElement"}}]);