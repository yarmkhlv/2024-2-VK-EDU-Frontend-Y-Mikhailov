export function generateRandomId(array) {
  const randomId = Math.floor(Math.random() * 10000) + 1;
  const arrayHasThisId = array?.some((el) => el.id === randomId);
  if (arrayHasThisId) {
    return generateRandomId(array);
  }
  return randomId;
}
