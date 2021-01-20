export default function Device() {
  const devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
  const { width, height } = window.screen;
  const isMobile = mobileDetect();
  const device = isMobile ? { ...isMobile } : { type: 'desktop' };
  const events = isMobile ? [ 'touchStart' ] : ['resize', 'mousemove', 'click'];

  iPadDetect()
  //console.dir(screen)

  return { device: {
    ...device,
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
  if (!testEx.test(userAgent)) return false;
  const iPhoneDetected = iPhoneModelDetect();
  if (!iPhoneDetected) return { type: 'mobile' }
  if (iPhoneDetected) return { type: 'mobile', ...iPhoneDetected }

}

function iPhoneModelDetect() {
  //console.dir(screen);
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
  if (width === 414 && height === 736 && dpr === 3) {
    return {
      iPhone,
      model: '8Plus'
    }
  }
  if (width === 375 && height === 812 && dpr === 3) {
    return {
      iPhone,
      model: 'X/XS'
    }
  }
  if (width === 414 && height === 896 && dpr === 2) {
    return {
      iPhone,
      model: 'XR/11'
    }
  }
  if (width === 414 && height === 896 && dpr === 3) {
    return {
      iPhone,
      model: 'XSMax/11ProMax'
    }
  }
  if (width === 375 && height === 812 && dpr === 3) {
    return {
      iPhone,
      model: '11Pro/12Mini'
    }
  }
  if (width === 390 && height === 844 && dpr === 3) {
    return {
      iPhone,
      model: '12/12Pro'
    }
  }
  if (width === 428 && height === 926 && dpr === 3) {
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
