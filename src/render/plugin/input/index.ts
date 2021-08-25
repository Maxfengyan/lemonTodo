export const hasClass = (elem: any, c: any) => {
  return elem.classList.contains(c);
};
export const addClass = (elem: any, c: any) => {
  elem.classList.add(c);
};
export const removeClass = (elem: any, c: any) => {
  elem.classList.remove(c);
};
export const toggleClass = (elem: any, c: any) => {
  var fn = hasClass(elem, c) ? removeClass : addClass;
  fn(elem, c);
};
