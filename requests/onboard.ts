import axios from "axios";
import { BATSIGN, HOST, PORT, CONNECTION } from "../constants";

export async function sendOnboardStep0(legalEntityType: string) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/onboard/step0`,
      {
        legalEntityType: legalEntityType,
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

export async function sendOnboardStep1(
  legalFullName: string,
  legalEmail: String,
  legalPhone: string
) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/onboard/step1`,
      {
        legalFullName: legalFullName,
        legalEmail: legalEmail,
        legalPhone: getRawPhoneNumber(legalPhone),
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

export async function sendOnboardStep2(
  vat: boolean,
  legalBusinessName: string,
  displayBusinessName: string,
  taxNumber: string,
  iban: string,
  businessType?: string
) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/onboard/step2`,
      {
        businessType: businessType,
        vat: vat,
        legalBusinessName: legalBusinessName,
        displayBusinessName: displayBusinessName,
        taxNumber: taxNumber,
        iban: iban,
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

export async function sendOnboardStep3(
  address: string,
  city: String,
  postalCode: string,
  contactPhone: string,
  website: string
) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/onboard/step3`,
      {
        address: address,
        city: city,
        postalCode: postalCode,
        contactPhone: getRawPhoneNumber(contactPhone),
        website: website,
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

export async function sendOnboardStep4(
  taxNumber: String,
  identificationCard: string,
  bankRequisites: string,
  stateRegister?: string
) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/onboard/step4`,
      {
        stateRegister: stateRegister,
        taxNumber: taxNumber,
        identificationCard: identificationCard,
        bankRequisites: bankRequisites,
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

function getRawPhoneNumber(phone: string) {
  return "+994" + phone.replaceAll(/[^\d]/g, "");
}
