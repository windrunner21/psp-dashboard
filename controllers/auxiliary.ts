import moment from "moment";
import statusStyles from "../components/table/status/Status.module.css";
import { CheckoutSessionStatus } from "./enums/checkout-session-status";

export const formatDate = (value: string) => {
  return moment(value).format("MMM DD, YYYY [at] HH:mm");
};

export const getStyleBySessionStatus = (value: string) => {
  switch (value) {
    case CheckoutSessionStatus.completed:
      return statusStyles.success;
    case CheckoutSessionStatus.expired:
      return statusStyles.warning;
    case CheckoutSessionStatus.open:
      return statusStyles.info;
    default:
      return statusStyles.error;
  }
};
