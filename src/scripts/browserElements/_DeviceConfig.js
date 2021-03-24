DeviceConfig()

function DeviceConfig() {
  const devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
  const isMobile = mobileDetect();
  const device = isMobile
    ? { ...isMobile }
    : { type: 'desktop', contentBoxConfig: contentBoxConfig('desktop') };

  window.deviceConfig = {
    ...device,
    devicePixelRatio,
  }
}

function domThreeInterface(deviceType) {
  const initialCameraPos = {}

  return {
    contentBoxConfig: contentBoxConfig(deviceType)
  }
}

function contentBoxConfig(deviceType) {
  const config = {}
  switch (deviceType) {
    case 'desktop':
      config.offsetXfactor = .45;
      config.offsetYfactor = .75;
      break;
    case 'mobile':
      config.offsetXfactor = .125;
      config.offsetYfactor = .75;
      break;
    case '8':
    case '8Plus':
    case 'XR/11':
    case 'X/XS/11Pro/12Mini':
    case 'XSMax/11ProMax':
    case '12/12Pro':
    case '12ProMax': {
      config.offsetXfactor = .125;
      config.offsetYfactor = .75;
      break;
    }
    default:
      config.offsetXfactor = .125;
      config.offsetYfactor = .75;
      break;
  }
  return config;
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
  if (!iPhoneDetected) return {
    type: 'mobile',
    contentBoxConfig: contentBoxConfig('mobile')
  }
  if (iPhoneDetected) return {
    type: 'mobile',
    ...iPhoneDetected,
    contentBoxConfig: contentBoxConfig(iPhoneDetected.model)
  }
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
      model: 'X/XS/11Pro/12Mini'
    }
  }

}
