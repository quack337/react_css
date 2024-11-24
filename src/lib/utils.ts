export function getViewportSize() {
  let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  return {width: vw, height: vh};
}