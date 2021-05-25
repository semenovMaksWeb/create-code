import { confing } from '@/lib/confing'
function CapsElemString (name) {
  return name[0].toUpperCase() + name.slice(1)
}
function toStringAll (inrerfaceNull) {
  inrerfaceNull = inrerfaceNull.slice(1, inrerfaceNull.length - 1)
  inrerfaceNull = 'interface ' + inrerfaceNull
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const beautify = require('js-beautify').js
  // eslint-disable-next-line @typescript-eslint/no-var-requires

  inrerfaceNull = inrerfaceNull.replace(/[\\"]/gi, '')
  inrerfaceNull = inrerfaceNull.replace(/[:]/, '')
  inrerfaceNull = beautify(inrerfaceNull, confing)
  console.log(inrerfaceNull)
  return inrerfaceNull
}

function validate (interfaceCreate) {
  let deleteKey = {}
  const valdate = deleteObject(interfaceCreate, (interfaceCheck, name, key, value) => {
    interfaceCheck[name][key] = null
    const keyValidate = key.replace(/["]/gi, '')
    if (!deleteKey[keyValidate]) {
      deleteKey[keyValidate] = interfaceCreate[value]
    }
  })
  deleteKey = deleteObject(deleteKey)
  const inrerfaceNull = deleteRepeatObject(valdate)
  const all = searchDerevo(inrerfaceNull, deleteKey)
  all.inrerfaceNull = searcrReg(all.inrerfaceNull, all.deleteKey)
  return toStringAll(all.inrerfaceNull)
}
function searcrReg (inrerfaceNull, deleteKey) {
  for (const key in deleteKey) {
    for (const keyInrerfaceNull in inrerfaceNull) {
      const re = new RegExp(`"${key}":null`, 'gi')
      const newsValue = `"${key}":${deleteKey[key]}`
      inrerfaceNull[keyInrerfaceNull] = inrerfaceNull[keyInrerfaceNull].replace(re, newsValue)
      inrerfaceNull[keyInrerfaceNull] = JSON.parse(inrerfaceNull[keyInrerfaceNull])
    }
  }
  inrerfaceNull = JSON.stringify(inrerfaceNull)

  return inrerfaceNull
}
function searchDerevo (inrerfaceNull, deleteKey) {
  const keysInterface = Object.keys(inrerfaceNull)
  const keysDelete = Object.keys(deleteKey)
  for (const key in deleteKey) {
    for (const keyInrerface in inrerfaceNull) {
      if (deleteKey[key] === inrerfaceNull[keyInrerface]) {
        deleteKey[key] = keyInrerface
        const indexInterface = keysInterface.indexOf(keyInrerface)
        const indexDelete = keysDelete.indexOf(key)
        keysInterface.splice(indexInterface, 1)
        keysDelete.splice(indexDelete, 1)
      }
    }
  }
  if (keysInterface.length === 1 && keysDelete.length === 1) {
    deleteKey[keysDelete[0]] = keysInterface[0]
  }
  return { deleteKey, inrerfaceNull }
}
function deleteObject (interfaceCreate, Callback = () => false) {
  const type = ['boolean', 'number', 'string']
  const interfaceCheck = {}
  for (const name in interfaceCreate) {
    interfaceCheck[name] = {}
    for (const [key, value] of Object.entries(interfaceCreate[name])) {
      if (type.includes(value)) {
        interfaceCheck[name][key] = value
      } else {
        Callback(interfaceCheck, name, key, value)
      }
    }
    interfaceCheck[name] = JSON.stringify(interfaceCheck[name])
  }
  return interfaceCheck
}
function deleteRepeatObject (interfaceCheck) {
  for (const key in interfaceCheck) {
    const element = interfaceCheck[key]
    for (const keyCheck in interfaceCheck) {
      const elementCheck = interfaceCheck[keyCheck]
      if (element === elementCheck && keyCheck !== key) {
        // console.log(interfaceCheck[keyCheck])
        delete interfaceCheck[keyCheck]
        // console.log(elementCheck);
      }
    }
  }
  return interfaceCheck
}
function MapAll (json, nameFile, interfaceMy) {
  nameFile = CapsElemString(nameFile)
  let jsonMap
  if (Array.isArray(json)) { // Это массив
    // console.info('info: json это массив');
    jsonMap = json[0]
  } else if (typeof json === 'object') { // это объект
    // console.info('info: json это объект');
    jsonMap = json
  }
  if (!jsonMap) {
    // console.info('info: json не validate');
    return
  }
  const keys = Object.keys(jsonMap)
  interfaceMy[nameFile] = {}
  for (const key in jsonMap) { // создания интерфейса
    if (Object.hasOwnProperty.call(jsonMap, key)) {
      if (typeof jsonMap[key] === 'object') {
        interfaceMy[nameFile][key] = MapAll(jsonMap[key], `${nameFile}${CapsElemString(key)}`, interfaceMy)
      } else {
        interfaceMy[nameFile][key] = typeof jsonMap[key]
      }
    }
  }
  // console.log(nameFile + JSON.stringify(interface))
  return nameFile
}

function start (data, name) {
  let interfaceCreate = {}
  MapAll(
    data,
    name,
    interfaceCreate
  )
  interfaceCreate = validate(interfaceCreate)
  return interfaceCreate
}
export { start }
// test + Пример
// const  a = start(  [
//     {
//         "id": 1697,
//         "name": "1AAAParts",
//         "code": "1aaaparts",
//         "contains_description": false,
//         'text': {
//             'all': '24234',
//             'view': '5'
//         },
//         children: [
//             {
//                 "id": 1697,
//                 "name": "1AAAParts",
//                 "code": "1aaaparts",
//                 "contains_description": false,
//                 'text': {
//                     'all': '24234',
//                     'view': '5'
//                 },
//                 children:[
//                     {
//                         "id": 1697,
//                         "name": "1AAAParts",
//                         "code": "1aaaparts",
//                         "contains_description": false,
//                         'text': {
//                             'all': '24234',
//                             'view': '5'
//                         },
//                         children:[]
//                     }
//                 ]
//             }
//         ]

//     },
// ], 'brand')
// console.log(a);
// test + Пример
