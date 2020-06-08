import MobileDetect from 'mobile-detect';
import fetch from 'isomorphic-fetch';

import { PUSH_SUSCRIBE_URL, PUBLIC_VAPI_KEY } from '../configs/Constants';

export const md = new MobileDetect(navigator.userAgent || navigator.vendor || window.opera);

export const isUserAgentMobile = md.mobile() !== null;

function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const subscribePushAndReload = (registration) => {
  console.log(urlBase64ToUint8Array(PUBLIC_VAPI_KEY));
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPI_KEY),
  })
  .then((subscription) => {
    fetch(PUSH_SUSCRIBE_URL, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      window.location.reload();
    });
  });
};
