import { isLoggedIn, isMeteredExpired, isShared, isMetered } from '../src';

const defaultUserState = {
    isLoggedIn: true,
    isMetered: false,
    isMeteredExpired: false,
    isShared: true
};

describe.only('user state should', () => {
    it('return true if userState isLoggedIn is true', () => {
        const userState = defaultUserState;
        expect(isLoggedIn(userState)).toBe(true);
    });

    it('return true if user.isLoggedIn equals true and iuser.isMeteredExpired equals true', () => {
        const userState = {...defaultUserState, isMeteredExpired: true};
        expect(isMeteredExpired(userState)).toBe(true);
    });

    it('sreturn false if user.isLoggedIn equals true and iuser.isMeteredExpired equals false', () => {
        expect(isMeteredExpired(defaultUserState)).toBe(false);
    });

    it('return true if userState.isShared equals true', () => {
        const userState = {...defaultUserState, isShared: true}
        expect(isShared(userState)).toBe(true);
    });

    it('return true if user.isLoggedIn equals true and user.isMetered equals true', () => {
        const userState = {...defaultUserState, isMetered: true};
        expect(isMetered(userState)).toBe(true);
    });

    it('return true if user.isLoggedIn equals true and user.isMetered equals true', () => {
        expect(isMetered(defaultUserState)).toBe(false);
    });
});