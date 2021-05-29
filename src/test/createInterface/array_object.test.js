import { CreateInterface } from '../../serve/createInterface.ts'
describe('validate CreateInterface Array_Object', () => {
  // Проверка что введено array  {id: number, text: string}
  test('data: array  {id: number, text: string}', () => {
    const createInterface = new CreateInterface([{ id: 1, text: '1' }, { id: 2, text: '2' }], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: Name0}interface Name0 {id:number;text:string}')
  })
  // Проверка что введено array  {id: number, text: string, data: string | null}
  test('data: array  {id: number, text: string, data: null}', () => {
    const createInterface = new CreateInterface([{ id: 1, text: '1', data: null }, { id: 2, text: '2', data: null }], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: Name0}interface Name0 {id:number;text:string;data:null}')
  })

  // Проверка что введено array  {id: number, text: string}
  test('data: array  {id: number, text: string}|{id: number, d: string}', () => {
    const createInterface = new CreateInterface([{ id: 1, text: '1' }, { id: 2, d: '2' }], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: Name0 | Name1}interface Name0 {id:number;text:string}interface Name1 {id:number;d:string}')
  })
  // Проверка что введено array  {id: number}, string
  test('data: array  {id: number}|string', () => {
    const createInterface = new CreateInterface([{ id: 1 }, '1'], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: Name0 | string}interface Name0 {id:number}')
  })

  // Проверка что введено array  {id: number}, string[]
  test('data: array  {id: number}|string[]', () => {
    const createInterface = new CreateInterface([{ id: 1 }, ['1', '2']], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: Name0 | (string) []}interface Name0 {id:number}')
  })
})
