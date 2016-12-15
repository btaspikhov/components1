(function() {
  'use strict';
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
      this._onClick = this._onClick.bind(this);

      this.render();
      this._initEvents();
    }
    /**
     * Отрисовка меню
     */
    render() {
      function getMenuItems (items) {
				return items.map((item, index) => {
					return `<li class="menu__item" data-index="${index}">
										<a class="" href="${item.href}" data-action="pick">
											${item.anchor}
										</a>
										<details data-action="showDetails">${item.details}</details>
										<i class="close" data-action="remove"></i>
									</li>`;
				}).join('');
			}

			this.el.innerHTML = `
					<div class="menu">
						<span class="menu__title">
							${this.data.title}
						</span>
						<ul class="menu__list">
							${getMenuItems(this.data.items)}
						</ul>
					</div>
			`;
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
