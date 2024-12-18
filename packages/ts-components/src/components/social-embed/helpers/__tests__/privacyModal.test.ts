import get from 'lodash.get';
import { openPrivacyModal } from '../privacyModal';

jest.mock('lodash.get', () => jest.fn());

describe('openPrivacyModal', () => {
  const type: 'gdpr' = 'gdpr';
  const messageId = 'test-message-id';

  afterEach(() => {
    jest.clearAllMocks();
    delete (window as any)._sp_;
  });

  it('calls the loadPrivacyManagerModal function when available', () => {
    const loadPrivacyManagerModalMock = jest.fn();
    (window as any)._sp_ = {
      gdpr: {
        loadPrivacyManagerModal: loadPrivacyManagerModalMock
      }
    };

    (get as jest.Mock).mockReturnValue(loadPrivacyManagerModalMock);

    openPrivacyModal(type, messageId);

    expect(get).toHaveBeenCalledWith(
      window,
      `_sp_.${type}.loadPrivacyManagerModal`
    );
    expect(loadPrivacyManagerModalMock).toHaveBeenCalledWith(messageId);
  });

  it('logs a warning if loadPrivacyManagerModal is not available', () => {
    const consoleWarnMock = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {
        // Empty block
      });

    (get as jest.Mock).mockReturnValue(undefined);

    openPrivacyModal(type, messageId);

    expect(get).toHaveBeenCalledWith(
      window,
      `_sp_.${type}.loadPrivacyManagerModal`
    );
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Sourcepoint LoadPrivacyManagerModal is not available'
    );

    consoleWarnMock.mockRestore();
  });
});
