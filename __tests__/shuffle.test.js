const shuffle = require("../src/shuffle");

describe("shuffle should return an array", () => {
  // CODE HERE
  test('an array return', () => {
    const array = jest.fn(() => true)
    array()
    expect(array).toHaveReturned()
  })
  test('return an array of the same length as the argumennt sent in', () => {
    const array = jest.fn(() => true)
    array()
    const source = jest.fn(() => true)
    source()
    expect(array.length).toEqual(source.length)
  })
});



// check that shuffle returns an array
// check that it returns an array of the same length as the argument sent in
// check that all the same items are in the array
// check that the items have been shuffled around
