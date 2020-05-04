export function upperFirst (string) {
  return string[0].toUpperCase() + string.substr(1);
}

export function pad (source, length, char = '0') {
  const string = source.toString();
  return string.length < length ? pad(char + string, length, char) : string;
}
