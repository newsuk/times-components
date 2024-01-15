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
