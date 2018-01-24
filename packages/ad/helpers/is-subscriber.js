'use strict';

module.exports = function () {
    return !window.nuk.user.isMetered && window.nuk.user.isLoggedIn;
};
