import axios from "axios";
import { BATSIGN, HOST, PORT } from "../constants";

export default async function sendSignUpForm(
  name: string,
  surname: string,
  phone: string
) {
  const response = await axios.post(
    `http://${HOST}:${PORT}/signup`,
    {
      fullname: name + " " + surname,
      phone: phone,
    },
    {
      headers: {
        "Content-Type": "application/json",
        batsign: BATSIGN,
      },
    }
  );
  console.log(response.data);

  return response.status;
}
