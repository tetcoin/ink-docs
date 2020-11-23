(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{105:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return h}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},b=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),b=p(n),m=r,h=b["".concat(i,".").concat(m)]||b[m]||u[m]||o;return n?a.a.createElement(h,s(s({ref:t},l),{},{components:n})):a.a.createElement(h,s({ref:t},l))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},88:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),o=(n(0),n(105)),i={title:"Why WebAssembly for Smart Contracts?",slug:"/why-webassembly-for-smart-contracts"},s={unversionedId:"intro/why-webassembly",id:"intro/why-webassembly",isDocsHomePage:!1,title:"Why WebAssembly for Smart Contracts?",description:"* High performance: Wasm is high performance \u2014 it\u2019s built to be as close to native machine code as possible while still being platform independent.",source:"@site/docs/intro/why-webassembly.md",slug:"/why-webassembly-for-smart-contracts",permalink:"/ink-docs/why-webassembly-for-smart-contracts",editUrl:"https://github.com/ink-docs/edit/master/docs/intro/why-webassembly.md",version:"current",sidebar:"reference",previous:{title:"Why Rust for Smart Contracts?",permalink:"/ink-docs/why-rust-for-smart-contracts"},next:{title:"How it works \u2012 Substrate",permalink:"/ink-docs/how-it-works"}},c=[],l={rightToc:c};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"High performance:")," Wasm is high performance \u2014 it\u2019s built to be as close to native machine code as possible while still being platform independent."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"Small size")," It facilitates small binaries to ship over the internet to devices with potentially slow internet connection. This is a great fit for the space-constrainted blockchain world."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"General VM & bytecode:"),"It was developed so that code can be deployed in any browser with the same result. Contrary to the EVM it was not developed towards a very specific use case, this has the benefit of a lot of tooling being available and large companies putting a lot of resources into furthering Wasm development."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"Efficient JIT execution:"),"64 and 32-bit integer operation support that maps one-to-one with CPU instructions."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"Minimalistic")," Formal spec that fits on a single page"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"Deterministic execution:"),"Wasm is easily made deterministic by removing floating point operations, which is necessary for consensus algorithms."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"Open Standards > Custom Solutions:"),"Wasm is a standard for web browsers developed by W3C workgroup that includes Google, Mozilla, and others. There\u2019s been many years of work put into Wasm, both by compiler and standardisation teams."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"Many languages available:")," Wasm expands the family of languages available to smart contract developers to include Rust, C/C++, C#, Typescript, Haxe, and Kotlin. This means you can write smart contracts in whichever language you\u2019re familiar with, though we\u2019re partial to Rust due to its lack of runtime overhead and inherent security properties."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"Memory-safe, sandboxed, and platform-independent.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"LLVM support"),"Supported by the LLVM compiler infrastructure project, meaning that Wasm benefits from over a decade of LLVM\u2019s compiler optimisation."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("span",{class:"highlight"},"Large companies involved:")," Continually developed by major companies such as Google, Apple, Microsoft, Mozilla, and Facebook.")))}p.isMDXComponent=!0}}]);