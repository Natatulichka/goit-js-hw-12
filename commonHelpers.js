import{a as S,S as q,i as T}from"./assets/vendor-a7b3a87b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const P=S.create({baseURL:"https://pixabay.com"});async function y(o,e){const s={key:"44351431-da99bbc5aa576d6c36cc46a59",q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:e};return(await P.get("/api",{params:s})).data}function b(o){return o.map(({webformatURL:e,largeImageURL:s,tags:n,likes:t,views:r,comments:i,downloads:O})=>`
        <li class="gallery-item">
      <a class="gallery-link" href="${s}" >
        <img
          src="${e}"
          alt="${n}" loading='lazy'width = "360" height = "152"
        /></a> 
      <div class="info">
      <p class="info-item"><b>likes:</b>"${t}"</p>
      <p class="info-item"><b>Views:</b>"${r}"</p>
      <p class="info-item"><b>Comments:</b>"${i}"</p>
      <p class="info-item"><b>Downloads:</b>"${O}"</p>
      </div>`).join(" ")}const C="/goit-js-hw-12/assets/alert-icon-40fa32d5.svg",u=document.querySelector(".btn-to-top");window.addEventListener("scroll",L);u.addEventListener("click",w);function L(){const o=window.pageYOffset,e=document.documentElement.clientHeight;o>e&&u.classList.add("visible"),o<e&&u.classList.remove("visible")}function w(){window.pageYOffset>0&&window.scrollTo({top:0,behavior:"smooth"})}const{form:v,gallery:p,loadMoreBtn:h,loadElem:E}={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".js-load-btn"),loadElem:document.querySelector(".loader")};let c="",a=1,d=0;const M=15;let $=new q(".gallery-item a",{captions:!0,captionsData:"alt",captionDelay:250});L();w();v.addEventListener("submit",k);h.addEventListener("click",A);async function k(o){if(o.preventDefault(),window.scrollTo({top:0}),c=o.currentTarget.elements.searchQuery.value.trim(),!c){l("The search string cannot be empty. Please specify your search query.");return}a=1,B(),g();try{const e=await y(c,a);if(d=Math.ceil(e.totalHits/M),d===0){l("Sorry, there are no images matching your search query. Please try again!"),m(),f();return}const s=b(e.hits);p.innerHTML=s}catch(e){l(e)}m(),f(),v.reset()}async function A(){a+=1,g(),B();try{const o=await y(c,a),e=b(o.hits);p.insertAdjacentHTML("beforeend",e),$.refresh(),j()}catch{console.log("error")}m(),f()}function f(){a>=d?(g(),d&&l("We're sorry, but you've reached the end of search results.")):F()}function F(){h.classList.remove("hidden")}function g(){h.classList.add("hidden")}function l(o){T.error({title:"Error",backgroundColor:"#ef4040",messageColor:"#fff",messageSize:"16",imageWidth:302,close:!0,closeOnEscape:!0,closeOnClick:!0,progressBar:!0,progressBarColor:"#b51b1b",transitionIn:"flipInX",transitionOut:"flipOutX",position:"topRight",iconUrl:C,iconColor:"#FAFAFB",theme:"dark",message:o})}function B(){E.classList.remove("hidden")}function m(){E.classList.add("hidden")}function j(){const e=p.children[0].getBoundingClientRect().height;scrollBy({top:e*3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map