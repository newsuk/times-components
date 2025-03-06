const CanShowPuzzleSidebar = currentsection => {
  const allowedSections = ["times2"];
  if (
    currentsection &&
    allowedSections.includes(currentsection.toLowerCase())
  ) {
    return true;
  }
  return false;
};
export default CanShowPuzzleSidebar;
