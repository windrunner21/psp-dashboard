import { RE_EMAIL, RE_NAME, RE_ONLY_DIGITS, RE_WEBSITE } from "../constants";

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

export function applyPhoneNumberPattern(str: string) {
  return str
    .replaceAll(/[^\d]/g, "")
    .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
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
