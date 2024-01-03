import { Stack } from 'newskit'
import React from 'react'
import { StyledAdBlock } from '../styles'

export const SectionAd = () => {
  return (
    <>
      <Stack
        flow="horizontal-center"
        stackDistribution="center"
        marginBlock="space030"
      >
        ADVERTISEMENT
      </Stack>
      <StyledAdBlock />
    </>
  )
}
