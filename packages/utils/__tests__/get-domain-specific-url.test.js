import getDomainSpecificUrl from "../src/get-domain-specific-url";

const host = {
  uat: {
    com: "uat-thetimes.com",
    couk: "uat-thetimes.co.uk"
  },
  staging: {
    com: "staging-thetimes.com",
    couk: "staging-thetimes.co.uk"
  },
  prod: {
    com: "thetimes.com",
    couk: "thetimes.co.uk"
  }
};

describe("getDomainSpecificUrl()", () => {
  it("should return original url when host is .co.uk", () => {
    const { couk } = host.uat;
    const url = getDomainSpecificUrl(couk, couk);
    expect(url).toEqual(couk);
  });

  it("should return original url when url not matched", () => {
    const { com, couk } = host.uat;
    const url = getDomainSpecificUrl(com, couk);
    expect(url).toEqual(couk);
  });

  describe("imageserver path urls", () => {
    const path = "imageserver/image/mockid";

    it("should return correct uat imageserver url", () => {
      const { com, couk } = host.uat;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });

    it("should return correct staging imageserver url", () => {
      const { com, couk } = host.staging;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });

    it("should return correct prod imageserver url", () => {
      const { com, couk } = host.prod;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });
  });

  describe("archive path urls", () => {
    const path = "tto/archive/frame";

    it("should return correct uat archive url", () => {
      const { com, couk } = host.uat;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });

    it("should return correct staging archive url", () => {
      const { com, couk } = host.staging;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });

    it("should return correct prod archive url", () => {
      const { com, couk } = host.prod;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });
  });

  describe("article path urls", () => {
    const path = "level-one/level-two/mock-slug-bbbbbbbbb";

    it("should return correct uat imageserver url", () => {
      const { com, couk } = host.uat;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });

    it("should return correct staging imageserver url", () => {
      const { com, couk } = host.staging;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });

    it("should return correct prod imageserver url", () => {
      const { com, couk } = host.prod;
      const url = getDomainSpecificUrl(com, `${couk}/${path}`);
      expect(url).toEqual(`${com}/${path}`);
    });
  });

  describe("login subdomain urls", () => {
    const subdomain = "login";

    it("should return correct uat login url", () => {
      const { com, couk } = host.uat;
      const url = getDomainSpecificUrl(com, `${subdomain}.${couk}`);
      expect(url).toEqual(`${subdomain}.${com}`);
    });

    it("should return correct staging login url", () => {
      const { com, couk } = host.staging;
      const url = getDomainSpecificUrl(com, `${subdomain}.${couk}`);
      expect(url).toEqual(`${subdomain}.${com}`);
    });

    it("should return correct prod login url", () => {
      const { com, couk } = host.prod;
      const url = getDomainSpecificUrl(com, `${subdomain}.${couk}`);
      expect(url).toEqual(`${subdomain}.${com}`);
    });
  });
});
