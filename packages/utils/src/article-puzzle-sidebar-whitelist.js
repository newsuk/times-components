const CanShowPuzzleSidebar = currentCategory => {
  const allowedCategories = ["life-style", "culture"];
  if (
    currentCategory &&
    allowedCategories.includes(currentCategory.toLowerCase())
  ) {
    return true;
  }
  return false;
};
export default CanShowPuzzleSidebar;
