import React from "react"
// import { render } from '@testing-library/react';

import { replaceFlags } from '../replaceFlags';

const mockDomContainer = (
    <>
        <div className="Opta-TeamName Opta-Winner">Italy</div>
        <div className="Opta-TeamName Opta-Winner">Spain</div>
        <div className="Opta-TeamName Opta-Winner">Portugal</div>
    </>
)

describe('replaceFlags', () => {
  it('should replace images', async () => {
    // render(mockDomContainer)
    replaceFlags(mockDomContainer)
    expect(replaceFlags).toHaveBeenCalledTimes(1);
  });

});