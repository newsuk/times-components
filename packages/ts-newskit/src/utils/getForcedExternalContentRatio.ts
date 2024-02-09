// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import { ImageCrops } from '../slices/types';

export const getForcedExternalContentRatio = (
  image: ImageCrops,
  ratio: string
) => {
  if (image.ratio === '*' || !image.ratio) {
    return { ratio, aspectRatio: ratio.replace(':', '/') };
  }
  return { ratio: image.ratio, aspectRatio: image.ratio.replace(':', '/') };
};
