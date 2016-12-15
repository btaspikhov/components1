(function() {
  'use strict';
  /**
   * @class Form
   * Компонента "Форма"
   */
  class Form {
    /**
     * @constructor
     * @param  {Object} options
     */
    constructor({el, onSubmit}) {
      this.el = el;
      this.onSubmit = onSubmit;
      this.form = this.el.querySelector('form');

      this.render();
      this._initEvents();
    }

    /**
     * Отрисовка формы
     */
    render() {
      this.el.innerHTML = `
      <form class="form" action="action_page.php">
        <input class="form__input"  type="text" name="href" placeholder="href" value="">
        <input class="form__input" type="text" name="anchor"
        placeholder="anchor" value="">
        <input class="form__input" type="text" name="details"
        placeholder="details" value="">
        <input class="form__submit" type="submit" value="Submit">
      </form>
			`;
    }

    /**
     * Получение значения поля ввода по имени
     * @param {string}
     */
    getValueByName(name) {
      return this.el.querySelector(`[name=${name}]`).value;
    }

    /**
     * Получение данных формы
     */
    getData() {
      return {
        href: this.getValueByName('href'),
        anchor: this.getValueByName('anchor'),
        details: this.getValueByName('details')
      };
    }

    /**
     * Назначение слушателей событий
     */
    _initEvents() {
      this.el.addEventListener('submit', this._onSubmit.bind(this));
    }

    /**
     * Обработка отправки формы
     * @param {FormEvent}
     */
    _onSubmit(event) {
      event.preventDefault();
      let data = this.getData();
      this.onSubmit(data);
      this.form.reset();

    }

  }

  //export

  window.Form = Form;
})();
