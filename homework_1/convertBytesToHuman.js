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

const TENTH_POWER_OF_TWO = 1024;

export default function convertBytesToHuman(bytes) {
  const isNotValidBytes =
    typeof bytes !== "number" || !Number.isFinite(bytes) || bytes < 0;
  if (isNotValidBytes) return false;
  if (bytes < TENTH_POWER_OF_TWO) return `${bytes} ${BINARY_PREFIXES[0]}`;

  let prefix = 1;

  return (function recursionFunc(value) {
    const numberWithNewUnits = Number(value / TENTH_POWER_OF_TWO);

    if (numberWithNewUnits > TENTH_POWER_OF_TWO && prefix !== 8) {
      prefix++;
      return recursionFunc(numberWithNewUnits);
    } else {
      const convertedNumber = parseFloat(numberWithNewUnits.toFixed(2));
      return `${convertedNumber} ${BINARY_PREFIXES[prefix]}`;
    }
  })(bytes);
}
