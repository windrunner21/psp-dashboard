// capitalize first letter for name and surname
export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// format phone to more human readable form without country code
export const formatPhone = (value: string) => {
  return value.slice(4).replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
};
