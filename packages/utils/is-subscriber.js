/* global nuk */

/* eslint-disable import/prefer-default-export */

export const isSubscriber = () => !nuk.user.isMetered && nuk.user.isLoggedIn;
