import appView from './appView';

describe('appView', () => {
  it('Should be an instance of Object', () => {
    expect(appView).toBeInstanceOf(Object);
  });
});

describe('appView.render', () => {
  it('Should be an instance of Function', () => {
    expect(appView.render).toBeInstanceOf(Function);
  });
  it('Should render main', () => {
    appView.render();
    const firstDocChildTagName = document.body.children[0].tagName;
    expect(firstDocChildTagName).toBe('MAIN');
    document.body.innerHTML = '';
  });
  it('Should render input', () => {
    appView.render();
    const result = document.getElementById('keyword');
    expect(result).toBeTruthy();
    document.body.innerHTML = '';
  });
  it('Should render info cards', () => {
    appView.render();
    const result = document.getElementById('info-cards');
    expect(result).toBeTruthy();
    document.body.innerHTML = '';
  });
  it('Should render info controls', () => {
    appView.render();
    const result = document.getElementById('controls');
    expect(result).toBeTruthy();
    document.body.innerHTML = '';
  });
});

describe('appView.renderResponse', () => {
  it('Should be an instance of Function', () => {
    expect(appView.renderResponse).toBeInstanceOf(Function);
  });
  it('Should render "No matches" notice', () => {
    appView.render();
    const request = '';
    const notice = document.getElementById('no-matches');
    appView.renderResponse(request);
    expect(getComputedStyle(notice).display).toBe('block');
    document.body.innerHTML = '';
  });
});

describe('appView.renderResponseStatistics', () => {
  it('Should be an instance of Function', () => {
    expect(appView.renderResponseStatistics).toBeInstanceOf(Function);
  });
});
