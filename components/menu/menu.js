(function() {
  'use strict';

  //import
  let tmpl = window.menuTmpl;

  /**
   * @class Menu
   * Компонента "Меню"
   */
  class Menu {
    /**
		 * @constructor
		 * @param  {Object} opts
		 */
    constructor({el, data}) {
      this.el = el;
      this.data = data;
      this.tmpl = tmpl;
      this._onClick = this._onClick.bind(this);

      if (data != undefined) this.render();
      this._initEvents();
    }
    /**
     * Отрисовка меню
     */
    render() {
      this.el.innerHTML = this.tmpl(this.data);
    }

    /**
		 * Удаляем пункт меню из данных
		 * @param  {Object} removedItem
		 */
		removeItem (removedItem) {

			this.data.items = this.data.items.filter((item, index) => {
				return index !== removedItem.index;
			});

			this.render();
			console.log('remove', removedItem);
		}


		/**
		 * Добавляем пункт меню из данных
		 * @param  {Object} itemData
		 */
		addItem (itemData) {
			this.data.items.push(itemData);

			this.render();
			console.log('added', itemData);
		}


		/**
		 * присвоение данных
		 * @param  {Object} itemData
		 */
		setData (data) {
			this.data = data;
		}

    /**
     * Развешиваем события
     */
    _initEvents() {
      this.el.addEventListener('click', this._onClick);
    }

    /**
		* Удаление элемента меню
		* @param  {HTMLElement} item
		* @private
		*/
    _onRemoveClick(closeButton) {
      let index = +closeButton.parentNode.dataset.index;
      this.removeItem ({
        index
      });
    }

    /**
    * Удаление элемента меню
    * @param  {HTMLElement} item
    * @private
    */
    _onPickClick(pickButton) {
      let index = +pickButton.parentNode.dataset.index;
      console.log(this.data.items[index].anchor);
    }

    /**
     * Показ деталей
     * @param  {HTMLElement} item
     * @private
     */
    _onDetailsClick(item) {
      item.open = !item.open;
      console.log(item.open ? 'open' : 'closed');
    }

    /**
		* Клик в любую область меню
		* @param {MouseEvent} event
		* @private
		*/
    _onClick(event) {
      event.preventDefault();
      let item = event.target;
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

  }


  //export

  window.Menu = Menu;

})();
