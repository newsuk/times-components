/* global document */
import { cookieHelper } from "../cookie-helper";

describe.only("cookie helper", () => {
  beforeEach(() => {
    document.cookie =
      "acs_tnl=tid%3D7e8221f5-bd07-4e41-aac1-0976385d0ecb%26eid%3DAAAA002920174%26e%3D1%26a%3DTmVoYSBTcml2YXN0YXZh%26u%3D1910c402-2cf6-40dd-bb1e-4ee24e1e7f6b%26t%3D1513095931%26h%3D39b9e97b7885a332482fdeafb472855d%26cips%3DBBB002920174; ";
    document.cookie =
      "utag_main=v_id:015d647f7c96001850021819e00c05079001b07100c48$_sn:297$_ss:0$_st:1517151707619$_pn:2%3Bexp-session$ses_id:1517149896216%3Bexp-session$_prevpage:article%3Aex-cabinet%20ministers%20ride%20brexit%20gravy%20train%3A%3Acurrent%20edition%3A%3Aarticle%3Bexp-1517153500427; _bizo_np_stats=155%3D1882%2C;";
  });
  it("getCpnId", () => {
    const cpnId = cookieHelper.getCpnId();
    expect(cpnId).toBe("AAAA002920174");
  });
  it("getCips", () => {
    const cipsId = cookieHelper.getCips();
    expect(cipsId).toBe("BBB002920174");
  });
  it("getVistorId", () => {
    const visitorId = cookieHelper.getVistorId();
    expect(visitorId).toBe("015d647f7c96001850021819e00c05079001b07100c48");
  });
  afterEach(() => {
    document.cookie = "";
  });
});
