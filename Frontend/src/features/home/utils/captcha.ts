const CHARACTERS =
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghijkmnopqrstuvwxyz";

export const generateCaptcha = (length = 6): string => {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(
      Math.floor(Math.random() * CHARACTERS.length)
    );
  }

  return result;
};