/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _menu = __webpack_require__(1);
	
	var _form = __webpack_require__(2);
	
	var _model = __webpack_require__(3);
	
	var _http = __webpack_require__(4);
	
	//import
	var menuModel = new _model.Model({
	  resource: 'https://componentsEd.firebaseio.com/menu/-KbF0gr0YWX7qmv3olV1.json',
	  data: {}
	});
	
	var menu = new _menu.Menu({
	  el: document.querySelector('.js-menu')
	});
	
	menuModel.on('update', function (data) {
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
	
	_http.httpService.get('/package.json').then(function (responseText) {
	  console.log('Version number: ' + JSON.parse(responseText).version);
	}, function (xhr) {
	  console.error('Unknown version');
	});
	
	// httpService.get('/components/data/menu.json').then(responseText => {
	//   menu.setData(JSON.parse(responseText));
	//   menu.render();
	// }, xhr => { console.error('Menu render failed') });
	
	var form = new _form.Form({
	  el: document.querySelector('.js-form')
	});
	
	form.on('add', function (event) {
	  if (event.detail) {
	    menu.addItem(event.detail); // обновляю интерфейс
	    menuModel.setData(menu.getData()); // обновляю данные в моделе
	    menuModel.save(); // сохраняю изменения на сервере
	  }
	});
	
	menuModel.fetch();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//import
	var tmpl = window.menuTmpl;
	
	/**
	 * @class Menu
	 * Компонента "Меню"
	 */
	
	var Menu = function () {
	  /**
	  * @constructor
	  * @param  {Object} opts
	  */
	  function Menu(_ref) {
	    var el = _ref.el,
	        _ref$data = _ref.data,
	        data = _ref$data === undefined ? {} : _ref$data;
	
	    _classCallCheck(this, Menu);
	
	    this.el = el;
	    this.data = data;
	    this.tmpl = tmpl;
	    this._onClick = this._onClick.bind(this);
	
	    if ('items' in data) this.render();
	    this._initEvents();
	  }
	  /**
	   * Отрисовка меню
	   */
	
	
	  _createClass(Menu, [{
	    key: 'render',
	    value: function render() {
	
	      this.el.innerHTML = this.tmpl(this.data);
	    }
	
	    /**
	    * записывает данные
	    * @param  {Object} itemData
	    */
	
	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      this.data = data;
	    }
	
	    /**
	    * возвращает данные
	    * @param  {Object} itemData
	    */
	
	  }, {
	    key: 'getData',
	    value: function getData() {
	      return this.data;
	    }
	
	    /**
	    * Удаляем пункт меню из данных
	    * @param  {Object} removedItem
	    */
	
	  }, {
	    key: 'removeItem',
	    value: function removeItem(removedItem) {
	
	      this.data.items = this.data.items.filter(function (item, index) {
	        return index !== removedItem.index;
	      });
	
	      this.render();
	      console.log('remove', removedItem);
	    }
	
	    /**
	     * Добавляем пункт меню из данных
	     * @param  {Object} itemData
	     */
	
	  }, {
	    key: 'addItem',
	    value: function addItem(itemData) {
	      if (!this.data.items) this.data.items = [];
	      this.data.items.push(itemData);
	
	      this.render();
	      console.log('added', itemData);
	    }
	
	    /**
	     * Развешиваем события
	     */
	
	  }, {
	    key: '_initEvents',
	    value: function _initEvents() {
	      this.el.addEventListener('click', this._onClick);
	    }
	
	    /**
	    * Удаление элемента меню
	    * @param  {HTMLElement} item
	    * @private
	    */
	
	  }, {
	    key: '_onRemoveClick',
	    value: function _onRemoveClick(closeButton) {
	      var index = +closeButton.parentNode.dataset.index;
	      this.removeItem({
	        index: index
	      });
	    }
	
	    /**
	    * Удаление элемента меню
	    * @param  {HTMLElement} item
	    * @private
	    */
	
	  }, {
	    key: '_onPickClick',
	    value: function _onPickClick(pickButton) {
	      var index = +pickButton.parentNode.dataset.index;
	      console.log(this.data.items[index].anchor);
	    }
	
	    /**
	     * Показ деталей
	     * @param  {HTMLElement} item
	     * @private
	     */
	
	  }, {
	    key: '_onDetailsClick',
	    value: function _onDetailsClick(item) {
	      item.open = !item.open;
	      console.log(item.open ? 'open' : 'closed');
	    }
	
	    /**
	    * Клик в любую область меню
	    * @param {MouseEvent} event
	    * @private
	    */
	
	  }, {
	    key: '_onClick',
	    value: function _onClick(event) {
	      event.preventDefault();
	      var item = event.target;
	      switch (item.dataset.action) {
	        case 'remove':
	          this._onRemoveClick(item);
	          break;
	        case 'pick':
	          this._onPickClick(item);
	          break;
	        case 'showDetails':
	          this._onDetailsClick(item);
	          break;
	      }
	    }
	  }]);
	
	  return Menu;
	}();
	
	exports.Menu = Menu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//import
	var tmpl = window.formTmpl;
	
	/**
	 * @class Form
	 * Компонента "Форма"
	 */
	
	var Form = function () {
	  /**
	   * @constructor
	   * @param  {Object} options
	   */
	  function Form(_ref) {
	    var el = _ref.el;
	
	    _classCallCheck(this, Form);
	
	    this.el = el;
	    this.tmpl = tmpl;
	
	    this.render();
	    this._initEvents();
	  }
	
	  /**
	   * Отрисовка формы
	   */
	
	
	  _createClass(Form, [{
	    key: 'render',
	    value: function render() {
	      this.el.innerHTML = this.tmpl();
	    }
	
	    /**
	     * Получение значения поля ввода по имени
	     * @param {string}
	     */
	
	  }, {
	    key: 'getValueByName',
	    value: function getValueByName(name) {
	      return this.el.querySelector('[name=' + name + ']').value;
	    }
	
	    /**
	     * Получение данных формы
	     */
	
	  }, {
	    key: 'getData',
	    value: function getData() {
	      var href = this.getValueByName('href');
	      var anchor = this.getValueByName('anchor');
	      var details = this.getValueByName('details');
	      var isEmpty = !(href || anchor || details);
	
	      return isEmpty ? null : { href: href, anchor: anchor, details: details };
	    }
	
	    /**
	     * Подписка на событие
	     * @param {string} name
	     * @param {Function} callback
	     */
	
	  }, {
	    key: 'on',
	    value: function on(name, callback) {
	      this.el.addEventListener(name, callback);
	    }
	
	    /**
	     * Создание и запуск события
	     * @param {string} name
	     * @param {Object} data
	     */
	
	  }, {
	    key: 'trigger',
	    value: function trigger(name, data) {
	      var event = new CustomEvent(name, {
	        bubbles: true,
	        detail: data
	      });
	
	      this.el.dispatchEvent(event);
	    }
	
	    /**
	     * Назначение слушателей событий
	     */
	
	  }, {
	    key: '_initEvents',
	    value: function _initEvents() {
	      this.el.addEventListener('submit', this._onSubmit.bind(this));
	    }
	
	    /**
	     * Обработка отправки формы
	     * @param {FormEvent}
	     */
	
	  }, {
	    key: '_onSubmit',
	    value: function _onSubmit(event) {
	      event.preventDefault();
	      this.trigger('add', this.getData());
	
	      event.target.reset();
	    }
	  }]);
	
	  return Form;
	}();
	
	exports.Form = Form;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Model = function () {
		function Model(_ref) {
			var resource = _ref.resource,
			    _ref$data = _ref.data,
			    data = _ref$data === undefined ? {} : _ref$data;
	
			_classCallCheck(this, Model);
	
			this.resource = resource;
			this._handlers = {};
	
			this.setData(data);
		}
	
		_createClass(Model, [{
			key: 'setData',
			value: function setData(data) {
				this._data = data;
				this.trigger('update', this._data);
			}
		}, {
			key: 'getData',
			value: function getData() {
				return this._data;
			}
		}, {
			key: 'save',
			value: function save() {
				this._makeRequset('PUT', this.resource);
			}
		}, {
			key: 'fetch',
			value: function fetch() {
				this._makeRequset('GET', this.resource);
			}
		}, {
			key: 'on',
			value: function on(name, callback) {
				if (!this._handlers[name]) {
					this._handlers[name] = [];
				}
	
				this._handlers[name].push(callback);
			}
		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				if (this._handlers[name]) {
					this._handlers[name].forEach(function (callback) {
						return callback(data);
					});
				}
			}
		}, {
			key: '_makeRequset',
			value: function _makeRequset(method, resource) {
				var _this = this;
	
				var xhr = new XMLHttpRequest();
				xhr.open(method, resource, true);
				// xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.onreadystatechange = function () {
					if (xhr.readyState !== 4) {
						return;
					}
	
					if (xhr.status === 200) {
						var data = JSON.parse(xhr.responseText);
	
						if (method === 'GET') {
							_this.trigger('fetch', xhr);
							_this.setData(data);
						}
					}
				};
	
				if (method === 'PUT') {
					xhr.send(JSON.stringify(this._data));
				} else {
					xhr.send();
				}
			}
		}]);
	
		return Model;
	}();
	
	exports.Model = Model;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var httpService = {
	
	  /**
	   * Создание и настройка экземпляра XMLHttpRequest
	   * @param {string} method
	   * @param {string} url
	   * @param {Function} done
	   * @param {Function} fail
	   * @return {XMLHttpRequest}
	   */
	  _makeRequest: function _makeRequest(method, url, done, fail) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(method, url);
	    xhr.send();
	
	    xhr.addEventListener('readystatechange', function () {
	
	      if (xhr.readyState !== 4) {
	        return;
	      }
	
	      if (xhr.status === 200) {
	        done(xhr.responseText, xhr);
	      } else {
	        fail(xhr);
	      }
	    });
	
	    return xhr;
	  },
	
	
	  /**
	   * GET запрос
	   * @param {string} url
	   * @return {Promise}
	   */
	  get: function get(url) {
	    var _this = this;
	
	    return new Promise(function (resolve, reject) {
	      _this._makeRequest('GET', url, resolve, reject);
	    });
	  },
	  post: function post() {
	    throw new Error('post method is not ready yet');
	  }
	};
	
	exports.httpService = httpService;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map