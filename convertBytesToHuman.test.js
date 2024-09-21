/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from "./convertBytesToHuman";

test("Возвращает false для неправильного типа данных", () => {
  expect(convertBytesToHuman(0)).toBe(false);
  expect(convertBytesToHuman("123")).toBe(false);
  expect(convertBytesToHuman(null)).toBe(false);
  expect(convertBytesToHuman(-123)).toBe(false);
});

test("Возвращает корректное значение для чисел", () => {
  expect(convertBytesToHuman(576)).toBe("576 bytes");
  expect(convertBytesToHuman(1024)).toBe("1 KB");
  expect(convertBytesToHuman(123123123)).toBe("117.42 MB");
  expect(convertBytesToHuman(34243234322332233)).toBe("30.41 PB");
  expect(convertBytesToHuman(12343242134123431)).toBe("10.96 PB");
  expect(convertBytesToHuman(93459854383254584328)).toBe("81.06 EB");
  expect(convertBytesToHuman(9345985438325458432899)).toBe("7.92 ZB");
});

// другая группа проверок
