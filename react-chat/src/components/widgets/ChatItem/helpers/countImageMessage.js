const putIn = 'Вложено:';

export const countImageMessage = (length) => {
  switch (length) {
    case 0:
      return ``;
    case 1:
      return `${putIn} ${length} изображение`;
    case 2:
    case 3:
    case 4:
      return `${putIn} ${length} изображения`;
    default:
      return `${putIn} ${length} изображений`;
  }
};
