const getMenuOffset = () => {
  const sectionBar = document.querySelector(".OrientationBar");
  const sectionBarHeight = sectionBar ? sectionBar.offHeight : 0;

  if (window.innerWidth < 1024) {
    return 110;
  }
  if (window.innerWidth < 1320) {
    return 100 + sectionBarHeight;
  }

  return 50 + sectionBarHeight;
};

export const handleOnClickScrollTo = (event, url) => {
  if (url.charAt(0) === "#") {
    event.preventDefault();

    const element = document.getElementById(url.substring(1));
    if (element) {
      const offset = element.getBoundingClientRect().top;
      const top = offset + window.pageYOffset - getMenuOffset();

      window.scrollTo({ top, behavior: "smooth" });
    }
  }
};

export const handleHrefScrollTo = url => (url.charAt(0) === "#" ? null : url);
