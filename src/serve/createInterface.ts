interface InterfaceObj {
  name: string;
  type: string[];
}

export class CreateInterface {
        interfaceRes = '';
        interfaceResObj: any = {}
        interfaceObj: any = {};
        nameInterface: string;
        date: any;
        constructor (date: any, nameInterface: string) {
          this.date = date
          this.nameInterface = this.transformNameInterface(nameInterface)
        }

        // Запуск создания интерфейсов на основе данных
        start (): any {
          if (typeof this.date === 'object' && this.date === null) {
            return null
          }
          if (typeof this.date === 'object' && this.date.length) {
            this.endNameInterface(
                    `interface ${this.nameInterface} {[index: number]: ${this.createArray()}}`
            )
          } else if (typeof this.date === 'object') {
            this.endNameInterface(
                    `interface ${this.nameInterface} {${this.createObject(undefined, undefined, true)}}`
            )
          } else {
            this.interfaceRes = typeof this.date
            return this.interfaceRes
          }
          if (Object.keys(this.interfaceObj).length > 0) {
            this.transformObjectRes()
          }
          return this.interfaceRes
        }

        // Валидация каждого элемента массива!
        checkArray (date:any = this.date, name?: string): any {
          const check = this.checkNullAndType(date)
          if (check) {
            return check
          }
          if (typeof date === 'object' && date.length) {
            return this.createArrayLevel2(date)
          } else if (typeof date === 'object') {
            return this.cteateObjectNews(date, name)
          }
        }

        createArrayAll (data:any = this.date):string {
          const typeArray = []
          for (const [index, element] of data.entries()) {
            // console.trace(element)
            const check = this.checkArray(element, `${this.nameInterface}${index}`)
            // console.trace(check)
            if (check) {
              typeArray.push(check)
            }
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return [...new Set(typeArray)].join(' | ')
        }

        // Создания интерфейса 1ур массив и возвращания его типов в виде строки
        createArray (data:any = this.date): string {
          return this.createArrayAll(data)
        }

        // Создания типа массива в массиве
        createArrayLevel2 (data:any = this.date): string {
          return `(${this.createArrayAll(data)}) []`
        }

        checkObject (data:any = this.date, key: string): any {
          const check = this.checkNullAndType(data)
          if (check) {
            return check
          }
          if (typeof data === 'object' && data === null) {
            return null
          } else if (typeof data === 'object' && data.length) {
            return this.createArrayLevel2(data)
          } else if (typeof data === 'object') {
            return this.cteateObjectNews(data, this.nameInterface + this.transformNameInterface(key))
          }
        }

        checkNullAndType (data:any):any {
          if (typeof data === 'object' && data === null) {
            return 'null'
          }
          if (typeof data !== 'object') {
            return typeof data
          }
          return undefined
        }

        createObjectAll (data:any = this.date, name = this.nameInterface, top = false): string {
          const type: any = {}
          for (const key in data) {
            type[key] = this.checkObject(data[key], key)
          }
          if (top) {
            this.interfaceResObj = type
            return this.transformObjectValidString(type)
          }
          return this.addInterfaceObj(type, name)
        }

        cteateObjectNews (data:any = this.date, name = this.nameInterface): string {
          return this.createObjectAll(data, name)
        }

        createObject (data:any = this.date, name = this.nameInterface, top = false): string {
          let res = this.createObjectAll(data, name, top)
          res = this.validateDerevo()
          res = this.transformObjectValidString(res)
          return res
        }

        // Трансформация имени интерфейса
        transformNameInterface (name: string = this.nameInterface): string {
          return name[0].toUpperCase() + name.slice(1)
        }

        transformObjectRes ():void {
          for (const interfaceObjKey in this.interfaceObj) {
            this.interfaceObj[interfaceObjKey] = this.transformObjectValidString(this.interfaceObj[interfaceObjKey])
            this.startNameInterface(`interface ${interfaceObjKey} {${this.interfaceObj[interfaceObjKey]}}`)
          }
        }

        // Удалить лишние {}
        transformObjectValidString (type: any): string {
          let res
          if (typeof type === 'object') {
            res = JSON.stringify(type).replace(new RegExp('[\{\}"\\\\]', 'gi'), '')
            return res.replace(new RegExp('[\,]', 'gi'), ';')
          } else {
            res = type.replace(new RegExp('[\{\}"\\\\]', 'gi'), '')
            return res.replace(new RegExp('[\,]', 'gi'), ';')
          }
        }

        // добавить в конец генерируемого кода текст
        endNameInterface (data:string): void {
          this.interfaceRes += data
        }

        // добавить в начало генерируемого кода текст
        startNameInterface (data:string): void {
          this.interfaceRes = data + this.interfaceRes
        }

        addInterfaceObj (interfaceAdd: any = this.date, name:string = this.nameInterface): string {
          const check = this.validateInterface(interfaceAdd)
          if (!check) {
            // console.trace(check)
            this.interfaceObj[name] = interfaceAdd
            return name
          }
          this.interfaceObj[check.name] = this.validateObjectNewsType(interfaceAdd, check.name)
          return check.name
        }

        validateObjectNewsType (interfaceAdd: any, nameCloneInterface: string): any {
          for (const key in this.interfaceObj[nameCloneInterface]) {
            const valueArray = this.interfaceObj[nameCloneInterface][key].split('|')
            const typeCheck = valueArray.filter((e:any) => e === interfaceAdd[key])[0]
            if (!typeCheck) {
              this.interfaceObj[nameCloneInterface][key] += `|${interfaceAdd[key]}`
            }
          }
          return this.interfaceObj[nameCloneInterface]
        }

        validateInterface (interfaceAdd: any = this.date):InterfaceObj {
          const keysInterfaceObj: Array<InterfaceObj> = this.mapInterfaceObj()
          const keysInterfaceAdd = Object.keys(interfaceAdd)
          // console.log(keysInterfaceObj, keysInterfaceObj)
          return keysInterfaceObj.filter((e: InterfaceObj) => JSON.stringify(e.type) === JSON.stringify(keysInterfaceAdd))[0]
          // return keysInterfaceObj.some(e => JSON.stringify(e.type) === JSON.stringify(keysInterfaceAdd ))
        }

        validateDerevo (): any {
          const keysInterfaceResObj = Object.keys(this.interfaceResObj)
          const keysInterfaceObj: any = this.mapInterfaceObj()
          const check = keysInterfaceObj.filter((e: any) => JSON.stringify(e.type) === JSON.stringify(keysInterfaceResObj))
          if (check[0]) {
            const nameDelete = check[0].name
            delete this.interfaceObj[nameDelete]
            for (const [key] of Object.entries(this.interfaceResObj)) {
              if (this.interfaceResObj[key] === nameDelete) {
                this.interfaceResObj[key] = this.nameInterface
              }
            }
          }
          return this.interfaceResObj
        }

        mapInterfaceObj (): Array<InterfaceObj> {
          const keysInterfaceObj = [] as Array<InterfaceObj>
          for (const key in this.interfaceObj) {
            keysInterfaceObj.push({ name: key, type: Object.keys(this.interfaceObj[key]) })
          }
          return keysInterfaceObj
        }
}
