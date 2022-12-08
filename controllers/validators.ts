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

export function applyIBANPattern(str: string) {
  return str
    .replace(
      /^([a-zA-Z]{2})(\d{2})([a-zA-Z]{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/,
      "$1$2 $3 $4 $5 $6 $7 $8"
    )
    .toUpperCase();
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
