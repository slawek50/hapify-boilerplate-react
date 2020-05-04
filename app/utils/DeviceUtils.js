import MobileDetect from 'mobile-detect';

export const md = new MobileDetect(navigator.userAgent || navigator.vendor || window.opera);

export const isUserAgentMobile = md.mobile() !== null;
