import {
    sendTrackingData,
    TrackingData,
    WindowWithUtag
} from './sendTrackingData';

const windowWithUtag = (window as any) as WindowWithUtag;

describe('sendTrackingData is NOT been called', () => {
    it('should not call the function without the data arguments', () => {
        const mockFunc = jest.fn();

        windowWithUtag.utag = {
            link: mockFunc
        };

        sendTrackingData();
        expect(mockFunc).not.toBeCalled();
    });

    it('should not call the function if window.utag is not defined', () => {
        const data: TrackingData = {};

        windowWithUtag.utag = undefined;

        expect(() => {
            sendTrackingData(data);
        }).not.toThrow();
    });
});

describe('sendTrackingData is been called and fire tracking', () => {
    it('should call the function', () => {
        const mockFunc = jest.fn();
        const data: TrackingData = {};

        windowWithUtag.utag = {
            link: mockFunc
        };

        sendTrackingData(data);

        setTimeout(() => {
            expect(mockFunc).toBeCalled();
        }, 0);
    });
});
