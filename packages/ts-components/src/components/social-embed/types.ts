import { eventStatus, vendors, modalType } from './constants';

export type EventStatus = typeof eventStatus[keyof typeof eventStatus];

export type TcData = {
  cmpStatus: string;
  eventStatus: EventStatus;
  listenerId: number;
};

export type VendorName = typeof vendors[keyof typeof vendors];

export type ModalType = typeof modalType[keyof typeof modalType];
