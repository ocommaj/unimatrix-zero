export default function Device() {
  const isMobile = detectMobile();
  const type = isMobile ? 'mobile' : 'desktop';
  const devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
  const events = isMobile ? [ 'touchStart' ] : ['resize', 'mousemove', 'click'];

  console.dir(window.screen)

  return { device: {
    type,
    devicePixelRatio
  }, events };
}

function detectMobile() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const testEx =
    /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
  return testEx.test(userAgent);
}
