export const RE_DIGIT = new RegExp(/^\d+$/);
export const RE_EMAIL = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const RE_NAME = /^[a-zA-Z ]{2,30}$/;
export const RE_ONLY_DIGITS = /^[0-9]*$/;
export const RE_WEBSITE =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
export function isValidNameSurname(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_NAME.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}

export function isValidEmailAddress(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_EMAIL.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}

export function applyPhoneNumberPattern(str: string, mask: string) {
  if (!mask) return str;

  const numeric = str.replaceAll(/[^\d]/g, "");

  let idx = 0;
  const formated = mask.split("").map((el) => {
    if (el == "#") {
      el = numeric[idx];
      idx++;
    }
    return el;
  });

  return formated.join("");
}

export function applyIBANPattern(str: string, mask: string) {
  if (!mask) return str;

  const numeric = str.replaceAll(/[^0-9a-z]/gi, "");

  let idx = 0;
  const formated = mask.split("").map((el) => {
    if (el == "#") {
      el = numeric[idx].toUpperCase();
      idx++;
    }
    return el;
  });

  return formated.join("");
}

export function isValidTaxNumber(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_ONLY_DIGITS.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}

export function isValidWebsite(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_WEBSITE.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}
