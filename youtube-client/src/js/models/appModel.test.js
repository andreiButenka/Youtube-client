import appModel from './appModel';

describe('appModel', () => {
  it('Should be an instance of Object', () => {
    expect(appModel).toBeInstanceOf(Object);
  });

  it('Should have a key property', () => {
    expect(appModel.request).toHaveProperty('key');
  });

  it('Should request 15 videos max', () => {
    expect(appModel.request.maxResults).toEqual(15);
  });
});

describe('appModel.execute', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      const p = new Promise((resolve) => {
        resolve({
          ok: true,
          Id: '123',
          json() {
            return { Id: '123' };
          },
        });
      });
      return p;
    });
  });

  it('Should be an instance of Function', () => {
    expect(appModel.execute).toBeInstanceOf(Function);
  });

  it('Should return promise', async () => {
    const response = appModel.execute('https://www.googleapis.com/youtube/v3/search?key=AIzaSyB790rucorcw6W9GXzFtqsWKV4AcvQaSTk&type=video&part=snippet&maxResults=15&q=js');
    expect(response).toBeInstanceOf(Promise);
  });
});

describe('appModel.executeStatistic', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      const p = new Promise((resolve) => {
        resolve({
          ok: true,
          Id: '123',
          json() {
            return { Id: '123' };
          },
        });
      });
      return p;
    });
  });

  it('Should be an instance of Function', () => {
    expect(appModel.executeStatistics).toBeInstanceOf(Function);
  });

  it('Should return promise', async () => {
    const response = appModel.executeStatistics('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyB790rucorcw6W9GXzFtqsWKV4AcvQaSTk&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics');
    expect(response).toBeInstanceOf(Promise);
  });
});
