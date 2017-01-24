(function() {
  'use strict';

  //import
  let Menu = window.Menu;
  let Form = window.Form;
  let httpService = window.httpService;

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

  // httpService.get('/package.json').then(responseText => {
  //   console.log(`Version number: ${JSON.parse(responseText).version}`);
  // }, xhr => { console.error('Unknown version') });

  let menu = new Menu({
      el: document.querySelector('.js-menu')
  });

  httpService.get('/components/data/menu.json').then(responseText => {
    menu.setData(JSON.parse(responseText));
    menu.render();
  }, xhr => { console.error('Menu render failed') });

  let form = new Form({
      el: document.querySelector('.js-form'),
      onSubmit: function(data) {
        menu.addItem(data);
      }
  });

})();
