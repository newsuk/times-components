import { userShouldUpdateName } from "../../src/utils";


const mockLocalStorage = {
    _storage: {},
    getItem: jest.fn((key) => {
      return mockLocalStorage._storage[key];
    }),
    setItem: jest.fn((key, value) => {
      mLocalStorage._storage[key] = value;
    }),
  }
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
  })



  describe('userShouldUpdateName()', () => {
    it('it should return early if no username', () => {
      userShouldUpdateName('John');
      expect(mockLocalStorage.setItem).not.toBeCalledWith('realNameCommentingBannerViewCount', '123');
    })
  //     jest.spyOn(window, 'addEventListener').mockImplementationOnce((event, handler, options) => {
  // return {detail: { displayName: 'Mock Name', email: 'mock@mock.com', id: '12345', username: 'Mock Smith'}}
  //     })
  //     expect(window.addEventListener).toBeCalledWith('spot-im-user-auth-success')


    it('calls the Render endpoint to check if the display name is a pseudonym', () => {

    })

    it('sets realNameCommentingBannerViewCount to 3 if username is pseudonym and value for realNameCommentingBannerViewCount has not been set', () => {
      //let
    })

    it('sets isRealNameCommentingBannerVisible to true if username is pseudonym and value for realNameCommentingBannerViewCount has not been set', () => {

    })
    it('triggers the commenting banner when user uses a pseudonym', () => {

    })

  })
