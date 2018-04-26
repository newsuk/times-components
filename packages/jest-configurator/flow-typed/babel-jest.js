// @flow

declare module "babel-jest" {
  declare export function process(
    src: string,
    filename: string,
    config: {},
    transformOptions?: {}
  ): string;

  declare export function getCacheKey(
    fileData: string,
    filename: string,
    configString: string,
    options?: {}
  ): string;
}
