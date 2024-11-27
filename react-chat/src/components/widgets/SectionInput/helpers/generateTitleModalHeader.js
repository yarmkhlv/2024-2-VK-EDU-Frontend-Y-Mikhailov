export function generateTitleModalHeader(length) {
  switch (length) {
    case 0:
      return ``;
    case 1:
      return `Выбрано ${length} изображение`;
    case 2:
    case 3:
    case 4:
      return `Выбрано ${length} изображения`;
    default:
      return `Выбрано ${length} изображений`;
  }
}
