import React from 'react';
import get from 'lodash/get';

import { AdWrapper, useAdContext } from './AdWrapper';

import { HeaderAdContainer } from './styles';

export const HeaderAdBase :React.FC<{slotName: string}>= ({slotName}) => {
    const { ad } = useAdContext();
	console.log('ad height ')
    return (
        <HeaderAdContainer height={ad ? ad.height : undefined}>
            <div className="ad-container">
                <div id={slotName}>
									ad height is {get(ad, 'height', 0)}
									</div>
            </div>
        </HeaderAdContainer>
    );
};

export const InlineAd = React.memo<{slotName: string}>(({slotName}) => (
    <AdWrapper slotName={slotName}>
        <HeaderAdBase slotName={slotName} />
    </AdWrapper>
));
