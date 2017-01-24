(function() {
  'use strict';

  //import
  let Menu = window.Menu;
  let Form = window.Form;
  let Model = window.Model;
  let httpService = window.httpService;

  let menuModel = new Model({
  	resource: 'https://componentsEd.firebaseio.com/menu/-KbF0gr0YWX7qmv3olV1.json',
  	data: {}
  });

  let menu = new Menu({
      el: document.querySelector('.js-menu')
  });

  menuModel.on('update', data => {
  	menu.setData(data);
  	menu.render();
  });

  // fetch('http://127.0.0.1:8181/components/data/menu.json')
  // .then(response => response.json())
  // .then(data => {
  //   let menu = new Menu({
  //     el: document.querySelector('.js-menu'),
  //     data
  //   });
  //
  //   let form = new Form({
  //     el: document.querySelector('.js-form'),
  //     onSubmit: function(data) {
  //       menu.addItem(data);
  //     }
  //   });
  //
  // });

  httpService.get('/package.json').then(responseText => {
    console.log(`Version number: ${JSON.parse(responseText).version}`);
  }, xhr => { console.error('Unknown version') });



  // httpService.get('/components/data/menu.json').then(responseText => {
  //   menu.setData(JSON.parse(responseText));
  //   menu.render();
  // }, xhr => { console.error('Menu render failed') });

  let form = new Form({
      el: document.querySelector('.js-form')
  });

  form.on('add', event => {
  	if (event.detail) {
      menu.addItem(event.detail); // обновляю интерфейс
      menuModel.setData(menu.getData()); // обновляю данные в моделе
   	  menuModel.save(); // сохраняю изменения на сервере
    }
  });

  menuModel.fetch();

})();
