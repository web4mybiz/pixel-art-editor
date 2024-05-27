(()=>{"use strict";var e={338:(e,t,r)=>{var a=r(206);t.createRoot=a.createRoot,t.hydrateRoot=a.hydrateRoot},206:e=>{e.exports=ReactDOM}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const e=React;var t=r.n(e),a=r(338);const n=e=>{let{color:r,onClick:a}=e;return t().createElement("div",{onClick:a,style:{width:20,height:20,backgroundColor:"transparent"===r?"rgba(0,0,0,0)":r,border:"1px solid #000"}})},o=e=>{let{rowData:r,onPixelClick:a}=e;return t().createElement("div",{style:{display:"flex"}},r.map(((e,r)=>t().createElement(n,{key:r,color:e,onClick:()=>a(r)}))))},l=["#FFFFFF","#000000","#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#C0C0C0","transparent"],c="/wp-json/iriz-pixel-api/v1/data",i=()=>{const[r,a]=(0,e.useState)([]),[n,i]=(0,e.useState)(!0),[s,p]=(0,e.useState)("#000000"),[d,F]=(0,e.useState)(!0),[u,m]=(0,e.useState)("Save Pixel Art");return(0,e.useEffect)((()=>{(async()=>{const e=await(async e=>{try{const e=await fetch("".concat(c,"?id=").concat(1));if(!e.ok)throw new Error("Network response was not ok: ".concat(e.statusText));const t=await e.json();return JSON.parse(t.pixels)||Array(16).fill().map((()=>Array(16).fill("#FFFFFF")))}catch(e){return console.error("Error fetching pixel art data:",e),Array(16).fill().map((()=>Array(16).fill("#FFFFFF")))}})();a(e),F(!1)})()}),[1]),d?t().createElement("div",null,"Loading..."):t().createElement("div",null,t().createElement("div",{style:{marginBottom:"10px"}},t().createElement("span",null,"Select Color: "),l.map(((e,r)=>t().createElement("button",{key:r,onClick:()=>p(e),style:{backgroundColor:"transparent"===e?"white":e,border:"2px solid ".concat(e===s?"black":"white"),width:20,height:20,marginRight:5}},"transparent"===e&&"T")))),t().createElement("div",null,r.map(((e,n)=>t().createElement(o,{key:n,rowData:e,onPixelClick:e=>((e,t)=>{const n=r.map(((r,a)=>r.map(((r,n)=>a===e&&n===t?s:r))));a(n),m("Save Pixel Art"),i(!1)})(n,e)}))),t().createElement("button",{onClick:()=>(async(e,t,r)=>{try{const a=new URLSearchParams({pixels:JSON.stringify(e)}),n=await fetch("".concat(c,"?").concat(a),{method:"POST",headers:{"Content-Type":"application/json"}});if(!n.ok)throw new Error("Network response was not ok: ".concat(n.statusText));await n.json(),r("Saved"),t(!0)}catch(e){console.error("Error saving pixel art data:",e)}})(r,i,m),disabled:n},u)))},s=()=>t().createElement("div",null,t().createElement(i,null));a.createRoot(document.getElementById("pixel-admin-app")).render(t().createElement(t().StrictMode,null,t().createElement(s,null)))})()})();