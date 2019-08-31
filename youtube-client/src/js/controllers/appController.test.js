import appController from './appController';
import appView from '../views/appView';

describe('appController', () => {
  it('Should be an instance of Object', () => {
    expect(appController).toBeInstanceOf(Object);
  });
  it('Should have an index property', () => {
    expect(appController).toHaveProperty('index');
  });
});

describe('appController.start', () => {
  it('Should be an instance of Function', () => {
    expect(appController.start).toBeInstanceOf(Function);
  });
  it('Should set formWrapper value', () => {
    appView.render();
    const expected = document.getElementById('form-wrapper');
    appController.start();
    expect(appController.formWrapper).toEqual(expected);
    document.body.innerHTML = '';
  });
  it('Should set input value', () => {
    appView.render();
    const expected = document.getElementById('keyword');
    appController.start();
    expect(appController.input).toEqual(expected);
    document.body.innerHTML = '';
  });
  it('Should set logo value', () => {
    appView.render();
    const expected = document.getElementById('logo');
    appController.start();
    expect(appController.logo).toEqual(expected);
    document.body.innerHTML = '';
  });
  it('Should set info cards value', () => {
    appView.render();
    const expected = document.getElementById('info-cards');
    appController.start();
    expect(appController.infoCards).toEqual(expected);
    document.body.innerHTML = '';
  });
});

describe('appController.prevButtonHandler', () => {
  it('Should be an instance of Function', () => {
    expect(appController.prevButtonHandler).toBeInstanceOf(Function);
  });
  it('Should decrease marker value on click', () => {
    appView.render();
    appController.start();
    appController.marker = 0;
    appController.prevButtonHandler();
    appController.prevButtonHandler();
    expect(appController.marker).toBe(-2);
    appController.marker = '';
    document.body.innerHTML = '';
  });
  it('Should decrease index value on click', () => {
    appView.render();
    appController.start();
    appController.index = 10;
    appController.prevButtonHandler();
    appController.prevButtonHandler();
    expect(appController.index).toBe(8);
    appController.index = '';
    document.body.innerHTML = '';
  });
});

describe('appController.beginningButtonHandler', () => {
  it('Should be an instance of Function', () => {
    expect(appController.beginningButtonHandler).toBeInstanceOf(Function);
  });
  it('Should set marker value equal to negative value of index', () => {
    appView.render();
    appController.start();
    appController.index = 5;
    appController.beginningButtonHandler();
    expect(appController.marker).toBe(-5);
    appController.marker = '';
    appController.index = '';
    document.body.innerHTML = '';
  });
  it('Should set index value to 0', () => {
    appView.render();
    appController.start();
    appController.index = 5;
    appController.beginningButtonHandler();
    expect(appController.index).toBe(0);
    appController.marker = '';
    appController.index = '';
    document.body.innerHTML = '';
  });
});

describe('appController.nextButtonHandler', () => {
  it('Should be an instance of Function', () => {
    expect(appController.nextButtonHandler).toBeInstanceOf(Function);
  });
  it('Should increase marker value on click', () => {
    appView.render();
    appController.start();
    appController.marker = 0;
    appController.nextButtonHandler();
    appController.nextButtonHandler();
    expect(appController.marker).toBe(2);
    appController.marker = '';
    document.body.innerHTML = '';
  });
  it('Should increase index value on click', () => {
    appView.render();
    appController.start();
    appController.index = 7;
    appController.nextButtonHandler();
    appController.nextButtonHandler();
    expect(appController.index).toBe(9);
    appController.index = '';
    document.body.innerHTML = '';
  });
});

describe('appController.formHandler', () => {
  it('Should be an instance of Function', () => {
    expect(appController.formHandler).toBeInstanceOf(Function);
  });
});

describe('appController.slider', () => {
  it('Should be an instance of Function', () => {
    expect(appController.slider).toBeInstanceOf(Function);
  });
});

describe('appController.actualResizeHandler', () => {
  it('Should be an instance of Function', () => {
    expect(appController.actualResizeHandler).toBeInstanceOf(Function);
  });
});

describe('appController.resizeThrottler', () => {
  it('Should be an instance of Function', () => {
    expect(appController.resizeThrottler).toBeInstanceOf(Function);
  });
});
