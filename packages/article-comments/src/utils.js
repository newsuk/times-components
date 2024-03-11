const parseCookie = cookie =>
  cookie.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=");
    acc[key] = value;
    return acc;
  }, {});

export const getCpnId = cookie =>
  cookie ? parseCookie(cookie).eid : undefined;
