import get from 'lodash/get';
import React, { useState, createContext, useEffect, useContext } from 'react';

declare global {
    interface Window {
        hasAdBlock: boolean;
    }
}

type NukAdSlot = {
    advertiser: number;
    campaign: number;
    creative: number;
    height: number;
    isempty: boolean;
    lineitem: number;
    name: string;
    pos: string;
    width: number;
};

// Occasionally on slower networks, the ads will have rendered before we hydrate the React App.
export const getRenderedSlots = (slotName: string): NukAdSlot => {
    return get(
        window,
        'newsUkAdLibraryConfig.stowage.permutiveSlotRenders.slotRender.slot',
        []
    ).find((slot: NukAdSlot) => slot.name === slotName);
};

export const AdContext = createContext<{
    ad: NukAdSlot | null;
}>({
    ad: null
});

const windowAvailable = typeof window !== 'undefined';
console.log('windowAvailable 1', windowAvailable);

export const AdWrapper: React.FC<{
    slotName: string;
}> = ({ children, slotName }) => {
    const [ad, setAd] = useState<NukAdSlot | null>(null);

    const handleAdLoad = (event: { detail: NukAdSlot }) => {
			console.log('the event stuff ', event);
        if (event.detail.name === slotName) {
            setAd(event.detail);
        }
    };

    useEffect(() => {
			console.log('windowAvailable in useEffect 2', windowAvailable);
        if (windowAvailable) {
            const slot = getRenderedSlots(slotName);
						console.log('slot name ', slot);
            if (slot) {
							console.log('slot if ');
                setAd(slot);
            } else {
							console.log('slot else ');
                window.addEventListener<any>(
                    'nukAdLibSlotsRendered',
                    handleAdLoad
                );
            }
        }
				return () => {
					window.removeEventListener<any>(
							'nukAdLibSlotsRendered',
							handleAdLoad
					);
			};
    }, []);

    if ((windowAvailable && window.hasAdBlock) || get(ad, 'isempty', false)) {
        return null;
    }

    return <AdContext.Provider value={{ ad }}>{children}</AdContext.Provider>;
};

export const useAdContext = () => useContext(AdContext);
