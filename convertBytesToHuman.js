/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

const BINARY_PREFIXES = {
  0: "bytes",
  1: "KB",
  2: "MB",
  3: "GB",
  4: "TB",
  5: "PB",
  6: "EB",
  7: "ZB",
  8: "YB",
};

export default function convertBytesToHuman(bytes) {
  const isNotValidBytes = typeof bytes !== "number" || bytes < 1;
  if (isNotValidBytes) return false;
  if (bytes < 1024) return `${bytes} ${BINARY_PREFIXES[prefix]}`;

  let prefix = 1;

  return (function recursionFunc(value) {
    const numberWithNewUnits = value / 1024;

    if (numberWithNewUnits > 1024 && prefix !== 7) {
      prefix++;
      return recursionFunc(numberWithNewUnits);
    } else {
      const convertedNumber = parseFloat(numberWithNewUnits.toFixed(2));
      return `${convertedNumber} ${BINARY_PREFIXES[prefix]}`;
    }
  })(bytes);
}
