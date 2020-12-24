export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isCorrect(val) {
  if (!val || !(val > 0 && val <= 10)) {
    return false;
  } else {
    return true;
  }
}