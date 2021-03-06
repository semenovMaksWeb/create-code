import { CreateInterface } from '../../serve/createInterface.ts'
describe('validate CreateInterface Object', () => {
  test('data: object {}', () => {
    const createInterface = new CreateInterface({}, 'name')
    expect(createInterface.start()).toBe('object')
  })
  // Проверка что введено object {id: number, text: string}
  test('data: object {id: number, text: string}', () => {
    const createInterface = new CreateInterface({ id: 1, text: 'add' }, 'name')
    expect(createInterface.start()).toBe('interface Name {id:number;text:string}')
  })
  // Проверка что введено object {id: number, text: string, data:{a: number, b: boolean}
  test('data: object {id: number, text: string, data:{a: number, b:boolean}', () => {
    const createInterface = new CreateInterface({ id: 1, text: 'add', data: { a: 1, b: false } }, 'name')
    expect(createInterface.start()).toBe('interface NameData {a:number;b:boolean}interface Name {id:number;text:string;data:NameData}')
  })
  // Проверка что введено object {id: number, text: string, data:{a: number, b: null}
  test('data: object {id: number, text: string, data:{a: number, b:null}', () => {
    const createInterface = new CreateInterface({ id: 1, text: 'add', data: { a: 1, b: null } }, 'name')
    expect(createInterface.start()).toBe('interface NameData {a:number;b:null}interface Name {id:number;text:string;data:NameData}')
  })
  // Проверка что введено object {id: number, children: {id:number, children:{}}
  test('data: object  {id: number, children: {id:number, children:{}}', () => {
    const createInterface = new CreateInterface({ id: 1, children: { id: 1, children: { id: 1, children: {} } } }, 'name')
    expect(createInterface.start()).toBe('interface Name {id:number;children:Name | {}}')
  })
})

