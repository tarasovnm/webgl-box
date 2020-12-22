export function geometryFromSize(length = 1, width = 1, height = 1) {

  return [
    [-length / 2, -height / 2, width / 2],
    [length / 2, -height / 2, width / 2],
    [-length / 2, height / 2, width / 2],
    [length / 2, height / 2, width / 2],
    [-length / 2, -height / 2, -width / 2],
    [length / 2, -height / 2, -width / 2],
    [-length / 2, height / 2, -width / 2],
    [length / 2, height / 2, -width / 2],
  ]
}