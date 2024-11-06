import get from 'lodash.get';
import { ModalType } from '../types';

export const openPrivacyModal = (type: ModalType, messageId: string) => {
  const loadModal = get(window, `_sp_.${type}.loadPrivacyManagerModal`);

  if (loadModal) {
    loadModal(messageId);
  } else {
    // tslint:disable-next-line:no-console
    console.warn('Sourcepoint LoadPrivacyManagerModal is not available');
  }
};
