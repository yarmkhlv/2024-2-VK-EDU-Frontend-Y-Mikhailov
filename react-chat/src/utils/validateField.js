export function validateField(fieldValue, required, minLength, maxLength) {
  const trimmedFieldValueLength = fieldValue.trim().length;
  if (required && !trimmedFieldValueLength) {
    return 'Поле обязательно к заполнению';
  }
  if (trimmedFieldValueLength < minLength) {
    return `Поле не должно меньше ${minLength} символов`;
  }
  if (trimmedFieldValueLength > maxLength) {
    return `Поле не должно быть больше ${maxLength} символов`;
  }
  return null;
}
