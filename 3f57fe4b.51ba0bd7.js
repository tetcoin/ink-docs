(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{110:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,a=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,f=p["".concat(a,".").concat(m)]||p[m]||b[m]||s;return n?o.a.createElement(f,c(c({ref:t},l),{},{components:n})):o.a.createElement(f,c({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,a=new Array(s);a[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var l=2;l<s;l++)a[l]=n[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},71:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return u}));var r=n(2),o=n(6),s=(n(0),n(110)),a={title:'#[ink(selector = "\u2026")]',slug:"/macros-attributes/selector"},c={unversionedId:"macros-attributes/selector",id:"macros-attributes/selector",isDocsHomePage:!1,title:'#[ink(selector = "\u2026")]',description:"Applicable to pro! messages and pro! constructors.",source:"@site/docs/macros-attributes/selector.md",slug:"/macros-attributes/selector",permalink:"/pro-docs/macros-attributes/selector",editUrl:"https://github.com/pro-docs/edit/master/docs/macros-attributes/selector.md",version:"current",sidebar:"reference",previous:{title:"#[ink(payable)]",permalink:"/pro-docs/macros-attributes/payable"},next:{title:"#[ink(storage)]",permalink:"/pro-docs/macros-attributes/storage"}},i=[{value:"Examples",id:"examples",children:[]},{value:"Controlling the messages selector",id:"controlling-the-messages-selector",children:[]}],l={rightToc:i};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Applicable to pro! messages and pro! constructors."),Object(s.b)("p",null,"By default pro! creates a selector for each message and constructor.\nThis is necessary since the contract is compiled to a Wasm blob and functions are invoked by invoking the\nselector, which identifies a method \u2012 method names are no longer available in these underlying layers."),Object(s.b)("p",null,"Using this attribute it is possible to speficy a concrete dispatch selector for the flagged entity. This allows a contract author to precisely control the selectors of their APIs making it possible to rename their API without breakage."),Object(s.b)("p",null,"A selector must consist of four bytes in hex (e.g. ",Object(s.b)("inlineCode",{parentName:"p"},'selector = "0xCAFEBABE"'),")."),Object(s.b)("h2",{id:"examples"},"Examples"),Object(s.b)("pre",null,Object(s.b)("code",Object(r.a)({parentName:"pre"},{className:"language-rust"}),'impl MyStorage {\n    #[ink(message, selector = "0xDEADBEEF")]\n    fn my_message(&self) {}\n}\n')),Object(s.b)("p",null,"\u2026 then the selector of ",Object(s.b)("inlineCode",{parentName:"p"},"my_message")," is simply ",Object(s.b)("inlineCode",{parentName:"p"},"0xDEADBEEF")," since it overrides\nthe composed selector."),Object(s.b)("h2",{id:"controlling-the-messages-selector"},"Controlling the messages selector"),Object(s.b)("p",null,"Every pro! message and pro! constructor has a unique selector with which the\nmessage or constructor can be uniquely identified within the pro! smart contract.\nThese selectors are mainly used to drive the contract's dispatch upon calling it."),Object(s.b)("p",null,"An pro! smart contract author can control the selector of an pro! message or pro!\nconstructor using the ",Object(s.b)("inlineCode",{parentName:"p"},"selector")," flag. An example is shown below:"),Object(s.b)("pre",null,Object(s.b)("code",Object(r.a)({parentName:"pre"},{className:"language-rust"}),'use ink_lang as ink;\n#[ink::contract]\nmod flipper {\n    #[ink(storage)]\n    pub struct Flipper {\n        value: bool,\n    }\n    impl Flipper {\n        #[ink(constructor)]\n        #[ink(selector = "0xDEADBEEF")] // Works on constructors as well.\n        pub fn new(initial_value: bool) -> Self {\n            Flipper { value: false }\n        }\n\n        /// Flips the current value.\n        #[ink(message)]\n        #[ink(selector = "0xCAFEBABE")] // You can either specify selector out-of-line.\n        pub fn flip(&mut self) {\n            self.value = !self.value;\n        }\n        \n        /// Returns the current value.\n        #[ink(message, selector = "0xFEEDBEEF")] // or specify selector inline.\n        pub fn get(&self) -> bool {\n            self.value\n        }\n    }\n}\n')))}u.isMDXComponent=!0}}]);