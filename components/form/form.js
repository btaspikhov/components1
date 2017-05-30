
  //import
  let tmpl = window.formTmpl;

  /**
   * @class Form
   * Компонента "Форма"
   */
  class Form {
    /**
     * @constructor
     * @param  {Object} options
     */
    constructor({el}) {
      this.el = el;
      this.tmpl = tmpl;

      this.render();
      this._initEvents();
    }

    /**
     * Отрисовка формы
     */
    render() {
      this.el.innerHTML = this.tmpl();
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
      let href = this.getValueByName('href');
      let anchor = this.getValueByName('anchor');
      let details = this.getValueByName('details');
      let isEmpty = !(href || anchor || details);

      return (isEmpty) ? null : { href, anchor, details };
    }

    /**
     * Подписка на событие
     * @param {string} name
     * @param {Function} callback
     */
    on (name, callback) {
      this.el.addEventListener(name, callback);
    }

    /**
     * Создание и запуск события
     * @param {string} name
     * @param {Object} data
     */
    trigger (name, data) {
      let event = new CustomEvent(name, {
        bubbles: true,
        detail: data
      });

      this.el.dispatchEvent(event);
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
      this.trigger('add', this.getData());

      event.target.reset();

    }

  }

  export {Form};
