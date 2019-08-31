import appView from './views/appView';
import appModel from './models/appModel';
import appController from './controllers/appController';
import '../css/reset.css';
import '../sass/index.sass';

class App {
  constructor(view, model, controller) {
    this.view = view;
    this.model = model;
    this.controller = controller;
  }

  start() {
    this.view.render();
    this.controller.start();
  }
}

const app = new App(appView, appModel, appController);

app.start();
