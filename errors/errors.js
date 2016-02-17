
  var Errors =  {};
  module.exports = function ortErrorService() {
    return {
      ApplicationError: Errors.ApplicationError,
      DataError: Errors.DataError,
      DisplayError: Errors.DisplayError,
      AjaxError: Errors.AjaxError,
      HistoryError: Errors.HistoryError,
      GraphError: Errors.GraphError,
      DOMError: Errors.DOMError
    };
  }
  //Errors
  Errors.ApplicationError = function(message) {
    this.name = 'ApplicationError';
    this.message = message || 'unknown exception';
  };
  Errors.ApplicationError.prototype = Object.create(Error);

  /**
   * An Error thrown by the event bus
   *
   * @param {string} message the message
   */
  Errors.DataError = function(message) {
    this.name = 'DataError';
    this.message = message || 'unknown exception';
  };
  Errors.DataError.prototype = new Error();

  /**
   * An Error thrown by the event bus
   *
   * @param {string} message the message
   */
  Errors.DisplayError = function(message) {
    this.name = 'DisplayError';
    this.message = message || 'unknown exception';
  };

  /**
   * An Error thrown by the event bus
   *
   * @param {string} message the message
   */
  Errors.AjaxError = function(message) {
    this.name = 'AjaxError';
    this.message = message || 'unknown exception';
  };
  Errors.AjaxError.prototype = new Error();

  /**
   * An Error thrown by the event bus
   *
   * @param {string} message the message
   */
  Errors.HistoryError = function(message) {
    this.name = 'HistoryError';
    this.message = message || 'unknown exception';
  };
  Errors.HistoryError.prototype = new Error();

  /**
   * An Error thrown by the event bus
   *
   * @param {string} message the message
   */
  Errors.GraphError = function(message) {
    this.name = 'GraphError';
    this.message = message || 'unknown exception';
  };
  Errors.GraphError.prototype = new Error();

  /**
   * An Error thrown by the event bus
   *
   * @param {string} message the message
   */
  Errors.DOMError = function(message) {
    this.name = 'DOMError';
    this.message = message || 'unknown exception';
  };
  Errors.DOMError.prototype = new Error();

