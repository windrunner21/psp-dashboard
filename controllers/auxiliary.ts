import moment from "moment";

export const formatDate = (value: string) => {
  return moment(value).format("MMM DD, YYYY [at] HH:mm");
};
