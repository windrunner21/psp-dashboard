// REGEX
export const RE_DIGIT = new RegExp(/^\d+$/);
export const RE_EMAIL = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const RE_NAME =
  /^[ABCÇDEƏFGHXİJKQLMNOÖPRSŞTUÜVYZA-Z]{1}[abcçdeəfgğhxıijkqlmnoöprsştuüvyza-z]{2,23}$/;
export const RE_ONLY_DIGITS = /^[0-9]*$/;
export const RE_WEBSITE =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

// NETWORK
export const CONNECTION = "http";
export const HOST = "192.168.0.148";
export const PORT = 2108;
export const BATSIGN =
  "d02481e67e27dea59b47ccb6a4be0629e45ef99031d2b6008551700fb9b060c5";

// capitalize first letter for name and surname
export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
