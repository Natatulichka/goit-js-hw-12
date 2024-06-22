import { getQuery } from './js/pixabay-api';
import { galleryItems } from './js/render-functions';
import iziToast from 'izitoast';
import imageUrl from '../src/img/alert-icon.svg';
import SimpleLightbox from 'simplelightbox';
import { onScroll, onToTopBtn } from './js/scroll';

const { form, gallery, loaderBtn, textInfo } = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loaderBtn: document.querySelector('.js-loader-btn'),
  textInfo: document.querySelector('.js-text-info'),
};

let query = '';
let page;
let perPage;
// let currentHits = 0;
let lightbox = new SimpleLightbox('.gallery-item a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
onScroll();
onToTopBtn();

form.addEventListener('submit', onSearchForm);
loaderBtn.addEventListener('click', onLoadMoreBtn);

function onSearchForm(e) {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  query = e.currentTarget.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';
  loaderBtn.classList.add('hidden');
  if (query === '') {
    iziToast.warning({
      message:
        'The search string cannot be empty. Please specify your search query.',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      messageSize: '16',
      imageWidth: 302,
      close: true,
      closeOnEscape: true,
      closeOnClick: true,
      progressBar: true,
      progressBarColor: '#b51b1b',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      position: 'topRight',
      theme: 'dark',
      iconUrl: imageUrl,
      iconColor: '#FAFAFB',
    });
    return;
  }

  textInfo.textContent = 'Loading images, please wait...';
  textInfo.classList.remove('hidden');
  getQuery(query, page)
    .then(data => {
      perPage = 20;
      const markup = galleryItems(data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();

      currentHits = data.hits.length;
      if (data.totalHits > perPage) {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight - 100,
          behavior: 'smooth',
        });
        loaderBtn.classList.remove('hidden');
      } else {
        loaderBtn.classList.add('hidden');
      }
      if (data.totalHits === 0) {
        gallery.innerHTML = '';
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#ef4040',
          messageColor: '#fff',
          messageSize: '16',
          imageWidth: 302,
          close: true,
          closeOnEscape: true,
          closeOnClick: true,
          progressBar: true,
          progressBarColor: '#b51b1b',
          transitionIn: 'flipInX',
          transitionOut: 'flipOutX',
          position: 'topRight',
          iconUrl: imageUrl,
          iconColor: '#FAFAFB',
          theme: 'dark',
        });

        loaderBtn.classList.add('hidden');
        textInfo.classList.add('hidden');
      }
    })

    .catch(error => console.log(error))
    .finally(() => {
      textInfo.classList.add('hidden');
      form.reset();
    });
}

function onLoadMoreBtn() {
  page += 1;
  perPage = 20;

  getQuery(query, page)
    .then(data => {
      const markup = galleryItems(data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        loaderBtn.classList.add('hidden');
        textInfo.textContent =
          "We're sorry, but you've reached the end of search results.";
        textInfo.classList.remove('hidden');
      }
    })
    .catch(error => console.log(error));
}
