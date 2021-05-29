import { CreateInterface } from '../../serve/createInterface.ts'
describe('validate CreateInterface Array_Object', () => {
  // Проверка что введено array  {id: number, text: string}
  test('data: array  {id: number, text: string}', () => {
    const createInterface = new CreateInterface([{ id: 1, text: '1' }, { id: 2, text: '2' }], 'name')
    expect(createInterface.start()).toBe('interface Name0 {id:number;text:string}interface Name {[index: number]: Name0}')
  })
  // Проверка что введено array  {id: number, text: string, data: string | null}
  test('data: array  {id: number, text: string, data: null}', () => {
    const createInterface = new CreateInterface([{ id: 1, text: '1', data: null }, { id: 2, text: '2', data: null }], 'name')
    expect(createInterface.start()).toBe('interface Name0 {id:number;text:string;data:null}interface Name {[index: number]: Name0}')
  })

  // Проверка что введено array  {id: number, text: string}
  test('data: array  {id: number, text: string}|{id: number, d: string}', () => {
    const createInterface = new CreateInterface([{ id: 1, text: '1' }, { id: 2, d: '2' }], 'name')
    expect(createInterface.start()).toBe('interface Name1 {id:number;d:string}interface Name0 {id:number;text:string}interface Name {[index: number]: Name0 | Name1}')
  })
  // Проверка что введено array  {id: number}, string
  test('data: array  {id: number}|string', () => {
    const createInterface = new CreateInterface([{ id: 1 }, '1'], 'name')
    expect(createInterface.start()).toBe('interface Name0 {id:number}interface Name {[index: number]: Name0 | string}')
  })

  // Проверка что введено array  {id: number}, string[]
  test('data: array  {id: number}|string[]', () => {
    const createInterface = new CreateInterface([{ id: 1 }, ['1', '2']], 'name')
    expect(createInterface.start()).toBe('interface Name0 {id:number}interface Name {[index: number]: Name0 | (string) []}')
  })
  // Проверка что введено array  {id: number | boolean}
  test('data: array  {id: number | boolean}', () => {
    const createInterface = new CreateInterface([{ id: 1 }, { id: false }], 'name')
    expect(createInterface.start()).toBe('interface Name0 {id:number|boolean}interface Name {[index: number]: Name0}')
  })

  // Проверка что введено array  {id: number | boolean, children: this}
  test('data: array  {id: number | boolean, children: this}', () => {
    const createInterface = new CreateInterface([{ id: 1, children: { id: 1, children: { id: false, children: {} } } }, { id: false, children: { id: 1, children: { id: true, children: {} } } }], 'name')
    expect(createInterface.start()).toBe('interface Name {id:number;children:Name}')
  })
})
