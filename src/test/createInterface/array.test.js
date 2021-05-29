import { CreateInterface } from '../../serve/createInterface.ts'
describe('validate CreateInterface Array', () => {
  // Проверка что введено array string
  test('data: array string', () => {
    const createInterface = new CreateInterface(['1', '2', '3'], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: string}')
  })
  // Проверка что введено array number
  test('data: array number', () => {
    const createInterface = new CreateInterface([1, 2, 3, 4, 5], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: number}')
  })
  // Проверка что введено array boolean
  test('data: array boolean', () => {
    const createInterface = new CreateInterface([false, true], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: boolean}')
  })
  // Проверка что введено (boolean, string)[]
  test('data: array (boolean, string)', () => {
    const createInterface = new CreateInterface([false, true, 'das'], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: boolean | string}')
  })
  // Проверка что введено (number ,boolean, string)[]
  test('data: array (number, boolean, string)', () => {
    const createInterface = new CreateInterface([1, true, 'das'], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: number | boolean | string}')
  })
  // Проверка что введено (number, boolean, string, number[])'[]
  test('data: array (number, boolean, string, number[])', () => {
    const createInterface = new CreateInterface([1, true, 'das', [1, 2, 4]], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: number | boolean | string | (number) []}')
  })
  // Проверка что введено (number, boolean, string, (number, boolean)[])[]
  test('data: array (number, boolean, string, (number, boolean)[])', () => {
    const createInterface = new CreateInterface([1, true, 'das', [1, 2, 4, false]], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: number | boolean | string | (number | boolean) []}')
  })

  // Проверка что введено null[]
  test('data: array null[]', () => {
    const createInterface = new CreateInterface([null, null], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: null}')
  })
  // Проверка что введено (null | number)[]
  test('data: array null[] | number', () => {
    const createInterface = new CreateInterface([null, 1], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: null | number}')
  })
  // Проверка что введено (number, boolean, string, (number, boolean)[], (string)[])[]
  test('data: array (number, boolean, string, (number, boolean)[], (string)[])', () => {
    const createInterface = new CreateInterface([1, true, 'das', [1, 2, 4, false], ['1', '2']], 'name')
    expect(createInterface.start()).toBe('interface Name {[index: number]: number | boolean | string | (number | boolean) [] | (string) []}')
  })
})
