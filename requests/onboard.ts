import axios from "axios";
import { HOST, PORT, CONNECTION } from "../constants";

export async function sendOnboardStep0(
  businessId: string,
  legalEntityType: string
) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/onboard/step0`,
      {
        businessId: businessId,
        legalEntityType: legalEntityType,
      },
      {
        headers: {
          "Content-Type": "application/json",
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
  businessId: string,
  legalFullName: string,
  legalEmail: String,
  legalPhone: string
) {
  let result;
  await axios
    .post(
      `${CONNECTION}://${HOST}:${PORT}/onboard/step1`,
      {
        businessId: businessId,
        legalFullName: legalFullName,
        legalEmail: legalEmail,
        legalPhone: getRawPhoneNumber(legalPhone),
      },
      {
        headers: {
          "Content-Type": "application/json",
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
  businessId: string,
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
        businessId: businessId,
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
  businessId: string,
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
        businessId: businessId,
        address: address,
        city: city,
        postalCode: postalCode,
        contactPhone: getRawPhoneNumber(contactPhone),
        website: website,
      },
      {
        headers: {
          "Content-Type": "application/json",
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
  businessId: string,
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
        businessId: businessId,
        stateRegister: stateRegister,
        taxNumber: taxNumber,
        identificationCard: identificationCard,
        bankRequisites: bankRequisites,
      },
      {
        headers: {
          "Content-Type": "application/json",
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
