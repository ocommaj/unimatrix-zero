export default function Device() {
  const devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
  const isMobile = mobileDetect();
  const device = isMobile ? { ...isMobile } : { type: 'desktop' };
  const events = isMobile ? [ 'touchStart' ] : ['resize', 'mousemove', 'click'];

  iPadDetect()

  return { device: {
    ...device,
    devicePixelRatio,
  }, events };
}

function iPadDetect() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const testEx = /ipad/i;
  const iPadDetected = testEx.test(userAgent);
}

export function mobileDetect() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const testEx = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
  if (!testEx.test(userAgent)) return false;
  const iPhoneDetected = iPhoneModelDetect();
  if (!iPhoneDetected) return { type: 'mobile' }
  if (iPhoneDetected) return { type: 'mobile', ...iPhoneDetected }
}

function iPhoneModelDetect() {
  const { width, height } = window.screen;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const dpr = devicePixelRatio;
  const testEx = /iphone/i;
  if (!testEx.test(userAgent)) {
    return false
  }
  const iPhone = true;
  if (width/height === 375/667 && dpr === 2) {
    return {
      iPhone,
      model: '8'
    }
  }
  if (width/height === 414/736 && dpr === 3) {
    return {
      iPhone,
      model: '8Plus'
    }
  }
  if (width/height === 375/812 && dpr === 3) {
    return {
      iPhone,
      model: 'X/XS/11Pro/12Mini'
    }
  }
  if (width/height === 414/896) {
    return {
      iPhone,
      model: dpr === 2 ? 'XR/11' : 'XSMax/11ProMax'
    }
  }

  if (width/height === 390/844 && dpr === 3) {
    return {
      iPhone,
      model: '12/12Pro'
    }
  }
  if (width/height === 428/926 && dpr === 3) {
    return {
      iPhone,
      model: '12ProMax'
    }
  }
  else {
    return {
      iPhone,
      model: 'X/Xs'
    }
  }

}
