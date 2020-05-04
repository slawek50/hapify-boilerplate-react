
export function getHash () {
  return window.location.hash.substr(1);
}

export function getQuery () {
  return window.location.search.substr(1);
}

export function getJSONFromUrlParams () {
  const result = {};
  getQuery().split('&').forEach((part) => {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result || {};
}
