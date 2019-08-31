const appView = {
  render() {
    // main, container and cards wrapper
    const mainNew = document.createElement('main');
    mainNew.id = 'main';
    mainNew.className = 'main';
    const containerNew = document.createElement('div');
    containerNew.id = 'container';
    containerNew.className = 'container';
    const logoNew = document.createElement('div');
    logoNew.id = 'logo';
    logoNew.className = 'logo';
    logoNew.innerHTML = '<span>Most popular</span><br><i class="fab fa-youtube"></i> YouTube videos';
    const formWrapperNew = document.createElement('div');
    formWrapperNew.id = 'form-wrapper';
    formWrapperNew.className = 'form-wrapper';
    const infoCardsNew = document.createElement('div');
    infoCardsNew.id = 'info-cards';
    infoCardsNew.className = 'info-cards';

    // buttons
    // container and cards wrapper
    const controlsNew = document.createElement('div');
    controlsNew.id = 'controls';
    controlsNew.className = 'controls';
    const pageNumberNew = document.createElement('div');
    pageNumberNew.id = 'page-number';
    pageNumberNew.className = 'page-number';
    const beginningNew = document.createElement('button');
    beginningNew.id = 'beginning';
    beginningNew.className = 'beginning button';
    beginningNew.type = 'button';
    const prevNew = document.createElement('button');
    prevNew.id = 'prev';
    prevNew.className = 'prev button';
    prevNew.type = 'button';
    const prevTipNew = document.createElement('div');
    prevTipNew.id = 'prev-tip';
    prevTipNew.className = 'prev-tip';
    prevTipNew.innerHTML = '1';
    const currentNew = document.createElement('button');
    currentNew.id = 'current';
    currentNew.className = 'current button';
    currentNew.type = 'button';
    currentNew.innerHTML = '1';
    const nextNew = document.createElement('button');
    nextNew.id = 'next';
    nextNew.className = 'next button';
    nextNew.type = 'button';
    const nextTipNew = document.createElement('div');
    nextTipNew.id = 'next-tip';
    nextTipNew.className = 'next-tip';
    nextTipNew.innerHTML = '2';

    // form
    const formNew = document.createElement('form');
    formNew.id = 'form';
    formNew.className = 'form';
    formNew.autocomplete = 'off';
    const labelNew = document.createElement('label');
    labelNew.for = 'keyword';
    const inputNew = document.createElement('input');
    inputNew.className = 'keyword';
    inputNew.id = 'keyword';
    inputNew.name = 'keyword';
    inputNew.type = 'text';
    inputNew.placeholder = 'Search video...';
    const searchButtonNew = document.createElement('button');
    searchButtonNew.id = 'search-button';
    searchButtonNew.className = 'search-button';
    searchButtonNew.type = 'submit';
    const searchButtonIconNew = document.createElement('i');
    searchButtonIconNew.className = 'fas fa-search search-icon';
    searchButtonNew.appendChild(searchButtonIconNew);
    formNew.appendChild(labelNew);
    formNew.appendChild(inputNew);
    formNew.appendChild(searchButtonNew);
    const noMatchesNew = document.createElement('div');
    noMatchesNew.id = 'no-matches';
    noMatchesNew.className = 'no-matches';
    noMatchesNew.innerHTML = '<i class="far fa-frown"></i> Oops... There are no matches';
    noMatchesNew.style.display = 'none';

    document.body.appendChild(mainNew);
    mainNew.appendChild(containerNew);
    containerNew.appendChild(formWrapperNew);
    formWrapperNew.appendChild(logoNew);
    formWrapperNew.appendChild(formNew);
    formWrapperNew.appendChild(noMatchesNew);
    containerNew.appendChild(infoCardsNew);
    containerNew.appendChild(controlsNew);
    controlsNew.appendChild(pageNumberNew);
    controlsNew.appendChild(beginningNew);
    controlsNew.appendChild(prevNew);
    prevNew.appendChild(prevTipNew);
    controlsNew.appendChild(currentNew);
    controlsNew.appendChild(nextNew);
    nextNew.appendChild(nextTipNew);
  },
  renderResponse(x) {
    const infoCards = document.getElementById('info-cards');
    const controls = document.getElementById('controls');
    const noMatches = document.getElementById('no-matches');
    if (x.length === 0) {
      noMatches.style.display = 'block';
      controls.style.display = 'none';
    } else {
      noMatches.style.display = 'none';
      for (let i = 0; i < x.length; i += 1) {
        const newItem = document.createElement('div');
        newItem.className = 'info-card';
        const att = document.createAttribute('data-id');
        att.value = x[i].id.videoId;
        newItem.setAttributeNode(att);
        const newImageWrap = document.createElement('div');
        newImageWrap.className = 'info-card__img-wrap';
        const newImg = document.createElement('img');
        newImg.className = 'info-card__img';
        newImg.src = x[i].snippet.thumbnails.medium.url;
        const newHref = document.createElement('a');
        newHref.className = 'info-card__ref';
        if (x[i].snippet.title.length > 50) {
          newHref.innerHTML = `${x[i].snippet.title.slice(0, 47)}...`;
        } else {
          newHref.innerHTML = x[i].snippet.title;
        }
        newHref.href = `https://www.youtube.com/watch?v=${x[i].id.videoId}`;
        newHref.target = '_blanc';
        const newDesc = document.createElement('p');
        newDesc.className = 'info-card__desc';
        if (x[i].snippet.description.length > 120) {
          newDesc.innerHTML = `${x[i].snippet.description.slice(0, 117)}...`;
        } else {
          newDesc.innerHTML = x[i].snippet.description;
        }
        const newAuthor = document.createElement('div');
        newAuthor.className = 'info-card__author';
        newAuthor.innerHTML = `<i class="fas fa-user"></i>${x[i].snippet.channelTitle}`;
        const newDate = document.createElement('div');
        newDate.className = 'info-card__date';
        newDate.innerHTML = `<i class="fas fa-calendar-alt"></i>${x[i].snippet.publishedAt.slice(0, 10)}`;
        infoCards.appendChild(newItem);
        newImageWrap.appendChild(newImg);
        newItem.appendChild(newImageWrap);
        newItem.appendChild(newHref);
        newItem.appendChild(newAuthor);
        newItem.appendChild(newDate);
        newItem.appendChild(newDesc);
      }
    }
  },
  renderResponseStatistics(x) {
    const infoCards = document.getElementById('info-cards');
    const dataAttr = 'data-id';
    const cards = infoCards.children;
    for (let i = 0; i < x.length; i += 1) {
      for (let j = 0; j < cards.length; j += 1) {
        if (cards[j].hasAttribute(dataAttr)) {
          if (cards[j].getAttribute(dataAttr) === x[i].id) {
            const newView = document.createElement('div');
            newView.className = 'info-card__view';
            newView.innerHTML = `<i class="fas fa-eye"></i>${x[i].statistics.viewCount}`;
            cards[j].appendChild(newView);
          }
        }
      }
    }
  },
};
export default appView;
