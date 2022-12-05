import axios from "axios";
import { BATSIGN, HOST, PORT, CONNECTION } from "../constants";
import { capitalizeFirstLetter } from "../controllers/dataManipulation";

export async function sendOTP(phone: string, type: string, language: string) {
  let status = undefined;

  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/send-otp`,
      {
        phone: getRawPhoneNumber(phone),
      },
      {
        headers: {
          "Content-Type": "application/json",
          batsign: BATSIGN,
          type: type,
          language: language,
        },
      }
    )
    .then(function (response) {
      status = response.status;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        status = error.response.status;
      } else if (error.request) {
        // The request was made but no response was received from the server
        status = 999;
      } else {
        // Something happened in setting up the request that triggered an error
        status = 1000;
      }
    });

  return status;
}

export async function sendSignUpForm(
  name: string,
  surname: string,
  phone: string,
  otp: string
) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/signup`,
      {
        fullname: generateFullNameFrom(name, surname),
        phone: getRawPhoneNumber(phone),
        otp: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
          batsign: BATSIGN,
        },
        withCredentials: true,
      }
    )
    .then(function (response) {
      result = response;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      }
    });

  return result;
}

export async function sendSignInForm(phone: string, otp: string) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/signin`,
      {
        phone: getRawPhoneNumber(phone),
        otp: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
          batsign: BATSIGN,
        },
        withCredentials: true,
      }
    )
    .then(function (response) {
      result = response;
    })
    .catch(function (error) {
      if (error.response) {
        result = error.response;
      }
    });

  return result;
}

function generateFullNameFrom(name: string, surname: string) {
  return (
    capitalizeFirstLetter(name).trim() +
    " " +
    capitalizeFirstLetter(surname).trim()
  );
}

function getRawPhoneNumber(phone: string) {
  return "+994" + phone.replaceAll(/[^\d]/g, "");
}
