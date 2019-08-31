import appModel from '../models/appModel';


const [marker, index, x0, locked, windowWidth,
  factor, currentWindowWidth, resizeTimeout,
  formWrapper, logo, form, noMatches, input,
  container, infoCards, searchButton, controls,
  current, pageNumber, beginning, prev,
  prevTip, next, nextTip] = new Array(24).fill('');

const appController = {
  marker,
  index,
  x0,
  locked,
  windowWidth,
  factor,
  currentWindowWidth,
  resizeTimeout,
  formWrapper,
  logo,
  form,
  noMatches,
  input,
  container,
  infoCards,
  searchButton,
  controls,
  current,
  pageNumber,
  beginning,
  prev,
  prevTip,
  next,
  nextTip,
  start() {
    this.formWrapper = document.getElementById('form-wrapper');
    this.logo = document.getElementById('logo');
    this.form = document.getElementById('form');
    this.noMatches = document.getElementById('no-matches');
    this.input = document.getElementById('keyword');
    this.container = document.getElementById('container');
    this.infoCards = document.getElementById('info-cards');
    this.searchButton = document.getElementById('search-button');
    this.controls = document.getElementById('controls');
    this.current = document.getElementById('current');
    this.pageNumber = document.getElementById('page-number');
    this.beginning = document.getElementById('beginning');
    this.prev = document.getElementById('prev');
    this.prevTip = document.getElementById('prev-tip');
    this.next = document.getElementById('next');
    this.nextTip = document.getElementById('next-tip');
    this.prev.addEventListener('click', this.prevButtonHandler);
    this.beginning.addEventListener('click', this.beginningButtonHandler);
    this.next.addEventListener('click', this.nextButtonHandler);
    this.form.addEventListener('submit', this.formHandler);
    window.addEventListener('resize', appController.resizeThrottler, false);
    appController.currentWindowWidth = window.innerWidth;
  },
  prevButtonHandler() {
    appController.marker -= 1;
    // console.log('i', appController.index);
    if (appController.index > 0) {
      appController.index -= 1;
      appController.factor = 1;
      appController.infoCards.classList.add('smooth');
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.infoCards.style.setProperty('--factor', appController.factor);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if (+getComputedStyle(document.getElementById('info-cards')).getPropertyValue('--index').trim() === 0) {
      appController.prev.style.display = 'none';
    }
    if (+getComputedStyle(document.getElementById('info-cards')).getPropertyValue('--index').trim() === 1) {
      appController.beginning.style.display = 'none';
    }
    // console.log(appController.marker);
  },
  beginningButtonHandler() {
    appController.infoCards.classList.add('smooth');
    appController.marker = 0 - appController.index;
    appController.index = 0;
    appController.infoCards.style.setProperty('--index', appController.index);
    appController.beginning.style.display = 'none';
    appController.prev.style.display = 'none';
    appController.current.innerHTML = '1';
    appController.nextTip.innerHTML = appController.index + 2;
  },
  nextButtonHandler() {
    appController.marker += 1;
    appController.index += 1;
    appController.factor = 1;
    appController.infoCards.classList.add('smooth');
    appController.infoCards.style.setProperty('--index', appController.index);
    if (appController.index > 1) {
      appController.beginning.style.display = 'flex';
    }
    appController.nextTip.innerHTML = appController.index + 2;
    appController.current.innerHTML = appController.index + 1;
    appController.prev.style.display = 'flex';
    appController.prevTip.innerHTML = appController.index;
    if ((appController.marker === 2 && window.innerWidth > 1200)
    || (appController.marker === 3 && window.innerWidth <= 1200 && window.innerWidth > 850)
    || (appController.marker === 6 && window.innerWidth <= 850 && window.innerWidth > 576)
    || (appController.marker === 12 && window.innerWidth <= 576)) {
      setTimeout(() => {
        appController.infoCards.classList.remove('smooth');
        appModel.execute();
      }, 300);
    }
  },
  formHandler(e) {
    e.preventDefault();
    appModel.callAppController = appController.slider;
    appController.formWrapper.style.transform = 'translateY(calc(-100% + 110px))';
    appController.infoCards.style.display = 'flex';
    appController.controls.style.display = 'flex';
    appController.infoCards.innerHTML = '';
    appModel.request.q = appController.input.value;
    appModel.request.pageToken = '';
    appController.infoCards.style.setProperty('--index', 0);
    appController.prev.style.display = 'none';
    appController.beginning.style.display = 'none';
    appModel.execute();
  },
  slider() {
    const unify = e => (e.changedTouches ? e.changedTouches[0] : e);

    const lock = (e) => {
      appController.prevTip.innerHTML = appController.index;
      appController.current.innerHTML = appController.index + 1;
      appController.nextTip.innerHTML = appController.index + 2;
      appController.pageNumber.innerHTML = appController.index + 1;
      appController.x0 = unify(e).clientX;
      appController.infoCards.classList.toggle('smooth', !(appController.locked = true));
    };

    const drag = (e) => {
      e.preventDefault();
      if (appController.locked) {
        appController.infoCards.style.setProperty('--translation', `${Math.round(unify(e).clientX - appController.x0)}px`);
      }
    };

    const move = (e) => {
      appController.infoCards.classList.add('smooth');
      appController.pageNumber.style.display = 'none';
      if (appController.locked) {
        const dx = unify(e).clientX - appController.x0;
        const s = Math.sign(dx);
        appController.factor = +(s * dx / appController.windowWidth).toFixed(2);
        if (dx > 0 && appController.index !== 0) {
          appController.marker -= 1;
        }
        if (dx < 0) {
          appController.marker += 1;
        }
        if ((appController.index > 0 || s < 0) && appController.factor > 0.2) {
          appController.infoCards.style.setProperty('--index', appController.index -= s);
          appController.factor = 1 - appController.factor;
        }

        appController.infoCards.style.setProperty('--translation', '0px');
        appController.infoCards.style.setProperty('--factor', appController.factor);
        appController.infoCards.classList.toggle('smooth', !(appController.locked = false));
        appController.x0 = null;
        if ((appController.marker === 2 && window.innerWidth > 1200)
          || (appController.marker === 3 && window.innerWidth <= 1200 && window.innerWidth > 850)
          || (appController.marker === 6 && window.innerWidth <= 850 && window.innerWidth > 576)
          || (appController.marker === 12 && window.innerWidth <= 576)) {
          setTimeout(() => {
            appController.marker = 0;
            appController.infoCards.classList.remove('smooth');
            appController.infoCards.removeEventListener('mousedown', lock);
            appController.infoCards.removeEventListener('touchstart', lock);
            appModel.execute();
          }, 300);
        }
      }
      appController.prevTip.innerHTML = appController.index;
      appController.current.innerHTML = appController.index + 1;
      appController.nextTip.innerHTML = appController.index + 2;
      if (appController.index === 0) {
        appController.prev.style.display = 'none';
        appController.beginning.style.display = 'none';
      }
      if (appController.index > 0) {
        appController.beginning.style.display = 'flex';
        appController.prev.style.display = 'flex';
      }
      if (appController.index === 1) {
        appController.beginning.style.display = 'none';
      }
    };

    const size = () => { appController.windowWidth = window.innerWidth; };
    appController.marker = 0;
    const N = appController.infoCards.children.length;

    appController.index = +getComputedStyle(document.getElementById('info-cards')).getPropertyValue('--index').trim() || 0;
    appController.x0 = null;
    appController.locked = false;
    appController.prevTip.innerHTML = appController.index;
    appController.current.innerHTML = appController.index + 1;
    appController.nextTip.innerHTML = appController.index + 2;

    size();
    appController.infoCards.style.setProperty('--number-of-cards', N);

    appController.infoCards.addEventListener('mousedown', lock, false);
    appController.infoCards.addEventListener('touchstart', lock, false);

    appController.infoCards.addEventListener('mousemove', drag, false);
    appController.infoCards.addEventListener('touchmove', drag, false);

    appController.infoCards.addEventListener('mouseup', move, false);
    appController.infoCards.addEventListener('touchend', move, false);
  },
  actualResizeHandler() {
    const temp = appController.currentWindowWidth;

    appController.currentWindowWidth = window.innerWidth;

    if (temp <= 576 && (appController.currentWindowWidth > 576
    && appController.currentWindowWidth <= 850)) {
      appController.index = Math.floor(appController.index / 2);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker / 2);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if (temp <= 576 && (appController.currentWindowWidth > 850
    && appController.currentWindowWidth <= 1200)) {
      appController.index = Math.floor(appController.index / 3);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker / 3);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if (temp <= 576 && appController.currentWindowWidth > 1200) {
      appController.index = Math.floor(appController.index / 4);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker / 4);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 576 && temp <= 850) && appController.currentWindowWidth <= 576) {
      appController.index = Math.floor(appController.index * 2);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker * 2);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 576 && temp <= 850) && (appController.currentWindowWidth > 850
    && appController.currentWindowWidth <= 1200)) {
      appController.index = Math.floor(appController.index / 1.5);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker / 1.5);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 576 && temp <= 850) && appController.currentWindowWidth > 1200) {
      appController.index = Math.floor(appController.index / 2);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker / 2);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 850 && temp <= 1200) && appController.currentWindowWidth <= 576) {
      appController.index = Math.floor(appController.index * 3);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker * 3);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 850 && temp <= 1200) && (appController.currentWindowWidth > 576
    && appController.currentWindowWidth <= 850)) {
      appController.index = Math.floor(appController.index * 1.5);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker * 1.5);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 850 && temp <= 1200) && appController.currentWindowWidth > 1200) {
      appController.index = Math.floor(appController.index / 1.3);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker / 1.3);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 1200) && appController.currentWindowWidth <= 576) {
      appController.index = Math.floor(appController.index * 4);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker * 4);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 1200) && (appController.currentWindowWidth > 576
    && appController.currentWindowWidth <= 850)) {
      appController.index = Math.floor(appController.index * 2);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.floor(appController.marker * 2);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
    if ((temp > 1200) && (appController.currentWindowWidth > 850
    && appController.currentWindowWidth <= 1200)) {
      appController.index = Math.ceil(appController.index * 1.33);
      if (appController.index === 0) {
        appController.beginning.style.display = 'none';
        appController.prev.style.display = 'none';
      }
      appController.marker = Math.ceil(appController.marker * 1.33);
      appController.infoCards.style.setProperty('--index', appController.index);
      appController.nextTip.innerHTML = appController.index + 2;
      appController.current.innerHTML = appController.index + 1;
      appController.prevTip.innerHTML = appController.index;
    }
  },
  resizeThrottler() {
    if (!appController.resizeTimeout) {
      appController.resizeTimeout = setTimeout(() => {
        appController.resizeTimeout = null;
        appController.actualResizeHandler();
      }, 1000);
    }
  },
};

export default appController;
