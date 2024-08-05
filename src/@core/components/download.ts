import axios from 'axios'
export const base64toBlob = (base64Data: string, contentType: string) => {
  contentType = contentType || ''
  var sliceSize = 1024
  var byteCharacters = atob(base64Data)
  var bytesLength = byteCharacters.length
  var slicesCount = Math.ceil(bytesLength / sliceSize)
  var byteArrays = new Array(slicesCount)

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize
    var end = Math.min(begin + sliceSize, bytesLength)

    var bytes = new Array(end - begin)
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0)
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes)
  }
  return new Blob(byteArrays, {type: contentType})
}

export const download = async (path: any) => {
  try {
    let response = await axios.post(path)
    let fileBlob = base64toBlob(response.data.fileContents, response.data.contentType)

    const url = window.URL.createObjectURL(new Blob([fileBlob]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `FileName.pdf`)

    document.body.appendChild(link)

    link.click()

    link.parentNode?.removeChild(link)
  } catch (e) {}
}
