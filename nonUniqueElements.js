/*
You are given a non-empty list of integers (X).

For this task, you should return a list consisting of
only the non-unique elements in this list.

To do so you will need to remove all unique elements
(elements which are contained in a given list only once).

When solving this task, do not change the order of the list.

Example:

input (array of integers): [1, 2, 3, 1, 3]
output (iterable of integers): [1, 3, 1, 3]

1 and 3 are non-unique elements.

More examples:

nonUniqueElements([1, 2, 3, 1, 3]) == [1, 3, 1, 3]
nonUniqueElements([1, 2, 3, 4, 5]) == []
nonUniqueElements([5, 5, 5, 5, 5]) == [5, 5, 5, 5, 5]
nonUniqueElements([10, 9, 10, 10, 9, 8]) == [10, 9, 10, 10, 9]
 */

const ONE_REPETITION = 1;

export default function nonUniqueElements(data) {
  const numOfRepetitions = {};
  (function calculateNumOfRepetitions() {
    data.forEach((el) => {
      if (numOfRepetitions.hasOwnProperty(el)) {
        numOfRepetitions[el] += 1;
      } else {
        numOfRepetitions[el] = ONE_REPETITION;
      }
    });
  })();
  const dataWithoutUniqEl = data.filter(
    (el) => numOfRepetitions[el] !== ONE_REPETITION
  );

  return dataWithoutUniqEl;
}
