export const Comma = (value: string) => {
  var str = value.replace(/,/g, '')
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export const Point = (value: string) => {
  var data = value.split('.')
  var res =
    data.length > 1 && data[1] !== ''
      ? data[0] + '.' + String(data[1]).padEnd(3, '0')
      : value + '.000'
  return res
}
