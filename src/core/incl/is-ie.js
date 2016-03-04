"use strict";

module.export = function () {
  return (navigator.appVersion.indexOf('MSIE 10') !== -1 ||
  navigator.appVersion.indexOf('Trident') !== -1);
};
