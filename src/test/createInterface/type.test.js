import { CreateInterface } from '../../serve/createInterface.ts'
describe('validate CreateInterface Type', () => {
  // Проверка что введена строка
  test('data: type string', () => {
    const createInterface = new CreateInterface('fsd', 'name')
    expect(createInterface.start()).toBe('string')
  })
  // Проверка что введено число
  test('data: type number', () => {
    const createInterface = new CreateInterface(1, 'name')
    expect(createInterface.start()).toBe('number')
  })
  // Проверка что введено число
  test('data: type null', () => {
    const createInterface = new CreateInterface(null, 'name')
    expect(createInterface.start()).toBe(null)
  })
  // Проверка что введена функция
  test('data: type function', () => {
    const createInterface = new CreateInterface(() => {
      console.log(1)
    }, 'name')
    expect(createInterface.start()).toBe('function')
  })
  // Проверка что введено boolean
  test('data: type boolean', () => {
    const createInterface = new CreateInterface(false, 'name')
    expect(createInterface.start()).toBe('boolean')
  })
})
