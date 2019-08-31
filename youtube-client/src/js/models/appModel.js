import appView from '../views/appView';

const appModel = {
  request: {
    key: 'AIzaSyB790rucorcw6W9GXzFtqsWKV4AcvQaSTk',
    part: 'snippet',
    maxResults: 15,
    order: 'viewCount',
    type: 'video',
  },
  requestStatistics: {
    part: 'snippet,contentDetails,statistics',
  },
  callAppController: '',
  execute() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.request.key}&type=${this.request.type}&part=${this.request.part}&maxResults=${this.request.maxResults}&pageToken=${this.request.pageToken}&order=${this.request.order}&q=${this.request.q}`;
    return fetch(url)
      .then(response => response.json())
      .then((response) => {
        const arr = [];
        for (let i = 0; i < response.items.length; i += 1) {
          arr.push(response.items[i].id.videoId);
        }
        appView.renderResponse(response.items);
        appModel.requestStatistics.id = arr.join(',');
        appModel.request.pageToken = response.nextPageToken;
        appModel.executeStatistics();
        appModel.callAppController();
      })
      /* eslint-disable no-console */
      .catch((err) => { console.log('Execute error', err); });
    /* eslint-enable no-console */
  },
  executeStatistics() {
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${this.request.key}&id=${this.requestStatistics.id}&part=${this.requestStatistics.part}`;
    return fetch(url)
      .then(response => response.json())
      .then((response) => {
        appView.renderResponseStatistics(response.items);
      })
      /* eslint-disable no-console */
      .catch((err) => { console.log('Execute error', err); });
    /* eslint-enable no-console */
  },
};

export default appModel;
