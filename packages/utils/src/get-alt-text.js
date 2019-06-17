export default asset => {
  if (asset) {
    return asset.title || asset.caption || ''
  }
  return ''
}
