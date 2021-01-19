export default function Device() {
  const devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
  const isMobile = mobileDetect();
  const type = isMobile ? 'mobile' : 'desktop';
  const events = isMobile ? [ 'touchStart' ] : ['resize', 'mousemove', 'click'];

  iPadDetect()
  console.dir(window.screen)

  return { device: {
    type,
    devicePixelRatio
  }, events };
}

function iPadDetect() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const testEx = /ipad/i;
  const iPadDetected = testEx.test(userAgent);
}

function mobileDetect() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const testEx = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
  return testEx.test(userAgent);
}
