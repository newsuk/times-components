'use strict';

module.exports = function () {
    return !nuk.user.isMetered && nuk.user.isLoggedIn;
};
