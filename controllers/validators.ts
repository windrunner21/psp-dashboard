import {
  RE_ADDRESS,
  RE_BUSINESS_NAME,
  RE_CITY,
  RE_EMAIL,
  RE_IBAN,
  RE_NAME,
  RE_ONLY_DIGITS,
  RE_POSTAL_CODE,
  RE_WEBSITE,
} from "../constants";

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

export function isValidBusinessName(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_BUSINESS_NAME.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}

export function isValidTaxNumber(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_ONLY_DIGITS.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}

export function isValidIBAN(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (
    RE_IBAN.test(targetStrong.value.replace(/\s/g, "")) &&
    targetStrong.value.length == 34
  ) {
    return true;
  } else {
    return false;
  }
}

export function isValidAddress(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_ADDRESS.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}

export function isValidCity(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (RE_CITY.test(targetStrong.value)) {
    return true;
  } else {
    return false;
  }
}

export function isValidPostalCode(target: EventTarget) {
  const targetStrong = target as HTMLTextAreaElement;

  if (
    RE_POSTAL_CODE.test(targetStrong.value) &&
    targetStrong.value.substring(0, 2) == "AZ" &&
    targetStrong.value.length == 6
  ) {
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

export function applyPostalCodePattern(str: string) {
  return str.replace(/^([a-zA-Z]{2})(\d{4})/, "$1$2").toUpperCase();
}
