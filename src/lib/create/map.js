function validate (res, startSting, endSting) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const beautify = require('js-beautify').js
  res = startSting + JSON.stringify(res) + endSting
  res = res.replace(/"/gi, '')
  res = res + '}'
  res = beautify(res, { indent_size: 2, space_in_empty_paren: true })
  return res
}
function checkData (data, api, res, str = 'api.') {
  data.forEach((element, index) => {
    if (typeof element === 'string') {
      res[element] = str + api[index]
    } else if (typeof element === 'object') {
      // console.log(element);
      res[element.name] = {}
      checkData(element.array, api[index].array, res[element.name], (str + element.name + '.'))
    }
  })
}
function createStartString (name, inrerfaceApiName, inrerfaceName, topArray) {
  if (!topArray) {
    return `function ${name}(api:${inrerfaceApiName}):${inrerfaceName} {const res = `
  }
  if (topArray) {
    return `function ${name}(api:${inrerfaceApiName}):${inrerfaceName} {const res;
    api.forEach(element => { res.push(`
  }
}
function createEndString (name, inrerfaceApiName, inrerfaceName, topArray) {
  if (!topArray) {
    return ' return res'
  }
  if (topArray) {
    return ')});'
  }
}
function start (data, api, name, topArray = false, inrerfaceApiName, inrerfaceName) {
  var res = {}
  const startSting = createStartString(name, inrerfaceApiName, inrerfaceName, topArray)
  const endSting = createEndString(name, inrerfaceApiName, inrerfaceName, topArray)

  checkData(data, api, res)
  res = validate(res, startSting, endSting)
  return res
}

const data = ['id', 'text', { array: ['view', { array: ['id', 'text'], name: 'text', isArray: true }], name: 'data' }]
const api = ['id', 'text', { array: ['view', { array: ['id', 'text'], name: 'text', isArray: true }], name: 'api' }]
const name = 'brandMap'
const inrerfaceApiName = 'BrandApi'
const inrerfaceName = 'BrandVuex'
const topArray = true
console.log(start(data, api, name, topArray, inrerfaceApiName, inrerfaceName))
