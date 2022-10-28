export const RE_DIGIT = new RegExp(/^\d+$/);
export const RE_EMAIL = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export function isValidEmailAddress(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_EMAIL.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}
