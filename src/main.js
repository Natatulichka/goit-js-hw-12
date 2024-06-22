import { getQuery } from './js/pixabay-api';
import { galleryItems } from './js/render-functions';
import iziToast from 'izitoast';
import imageUrl from '../src/img/alert-icon.svg';
import SimpleLightbox from 'simplelightbox';
import { onScroll, onToTopBtn } from './js/scroll';
// ==============================================
const { form, gallery, loadMoreBtn, loadElem } = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.js-load-btn'),
  loadElem: document.querySelector('.loader'),
};

let query = '';
let page = 1;
let totalPages = 0;
const perPage = 15;
let lightbox = new SimpleLightbox('.gallery-item a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
onScroll();
onToTopBtn();
// =================================================
form.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

async function onSearchForm(e) {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  query = e.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    showError(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }
  page = 1;
  showLoader();
  hideLoadBtn();
  try {
    const data = await getQuery(query, page);
    totalPages = Math.ceil(data.totalHits / perPage);

    if (totalPages === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoader();
      updateBtnStatus();
      return;
    }
    const markup = galleryItems(data.hits);
    gallery.innerHTML = markup;
  } catch (err) {
    showError('Something went wrong...');
  }
  hideLoader();
  updateBtnStatus();
  form.reset();
}

async function onLoadMoreBtn() {
  page += 1;
  hideLoadBtn();
  showLoader();
  try {
    const data = await getQuery(query, page);
    const markup = galleryItems(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    skipOldElement();
  } catch {
    console.log('error');
  }
  hideLoader();
  updateBtnStatus();
  form.reset();
}

// ===========================
function updateBtnStatus() {
  if (page >= totalPages) {
    hideLoadBtn();

    if (totalPages) {
      showError("We're sorry, but you've reached the end of search results.");
    }
  } else {
    showLoadBtn();
  }
}
function showLoadBtn() {
  loadMoreBtn.classList.remove('hidden');
}
function hideLoadBtn() {
  loadMoreBtn.classList.add('hidden');
}
function showError(message) {
  iziToast.error({
    title: 'Error',
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
    message,
  });
}
function showLoader() {
  loadElem.classList.remove('hidden');
}
function hideLoader() {
  loadElem.classList.add('hidden');
}
function skipOldElement() {
  const liElem = gallery.children[0];
  const height = liElem.getBoundingClientRect().height;

  scrollBy({
    top: height * 3,
    behavior: 'smooth',
  });
}
