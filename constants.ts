// REGEX
export const RE_DIGIT = new RegExp(/^\d+$/);
export const RE_EMAIL = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const RE_NAME =
  /^[ABCÇDEƏFGHXİJKQLMNOÖPRSŞTUÜVYZA-Z]{1}[abcçdeəfgğhxıijkqlmnoöprsştuüvyza-z]{2,23}$/;
export const RE_ONLY_DIGITS = /^[0-9]*$/;
export const RE_BUSINESS_NAME =
  /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[abcçdeəfgğhxıijkqlmnoöprsştuüvyza-zABCÇDEƏFGHXİJKQLMNOÖPRSŞTUÜVYZA-Z0-9 .]{2,}$/;
export const RE_IBAN =
  /^([a-zA-Z]{2})(\d{2})([a-zA-Z]{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/;
export const RE_ADDRESS =
  /^[abcçdeəfgğhxıijkqlmnoöprsştuüvyza-zABCÇDEƏFGHXİJKQLMNOÖPRSŞTUÜVYZA-Z0-9\s,.']{3,}$/;
export const RE_CITY = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
export const RE_POSTAL_CODE = /^([a-zA-Z]{2})(\d{4})/;
export const RE_WEBSITE =
  /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

// NETWORK
export const CONNECTION = "http";
export const HOST = "localhost";
export const PORT = 2108;
export const BATSIGN =
  "d02481e67e27dea59b47ccb6a4be0629e45ef99031d2b6008551700fb9b060c5";
