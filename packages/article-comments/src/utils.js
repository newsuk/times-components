const parseCookie = cookie =>
  cookie.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=");
    acc[key] = value;
    return acc;
  }, {});

const getCpnId = cookie => (cookie ? parseCookie(cookie).eid : undefined);

export default getCpnId;
