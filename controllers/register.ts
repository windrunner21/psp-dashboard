import axios from "axios";
import { BATSIGN, HOST, PORT, capitalizeFirstLetter } from "../constants";

export default async function sendSignUpForm(
  name: string,
  surname: string,
  phone: string
) {
  console.log(getRawPhoneNumber(phone));
  const response = await axios.post(
    `http://${HOST}:${PORT}/signup`,
    {
      fullname: generateFullNameFrom(name, surname),
      phone: getRawPhoneNumber(phone),
    },
    {
      headers: {
        "Content-Type": "application/json",
        batsign: BATSIGN,
      },
    }
  );
  return response.status;
}

function generateFullNameFrom(name: string, surname: string) {
  return (
    capitalizeFirstLetter(name).trim() +
    " " +
    capitalizeFirstLetter(surname).trim()
  );
}

function getRawPhoneNumber(phone: string) {
  return phone.replaceAll(/[^\d]/g, "");
}
