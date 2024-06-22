export { galleryItems };

function galleryItems(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}" >
        <img
          src="${webformatURL}"
          alt="${tags}" loading='lazy'width = "360" height = "152"
        /></a> 
      <div class="info">
      <p class="info-item"><b>likes:</b>"${likes}"</p>
      <p class="info-item"><b>Views:</b>"${views}"</p>
      <p class="info-item"><b>Comments:</b>"${comments}"</p>
      <p class="info-item"><b>Downloads:</b>"${downloads}"</p>
      </div>`;
      }
    )
    .join(' ');
}
