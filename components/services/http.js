(function() {
  'use strict';

  const httpService = {

    /**
     * Создание и настройка экземпляра XMLHttpRequest
     * @param {string} method
     * @param {string} url
     * @param {Function} done
     * @param {Function} fail
     * @return {XMLHttpRequest}
     */
    _makeRequest(method, url, done, fail) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.send();

      xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200)  {
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
    get (url) {
      return new Promise((resolve, reject) => {
        this._makeRequest('GET', url, resolve, reject);
      });

    },

    post() {
      throw new Error('post method is not ready yet');
    }
  };

  //export
  window.httpService = httpService;
})();
