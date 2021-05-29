export class CreateInterface {
    constructor(date, nameInterface) {
        this.interfaceRes = '';
        this.interfaceResObj = {};
        this.interfaceObj = {};
        this.date = date;
        this.nameInterface = this.transformNameInterface(nameInterface);
    }
    // Запуск создания интерфейсов на основе данных
    start() {
        // console.log(this.date.length);
        if (typeof this.date === 'object' && this.date === null) {
        }
        else if (typeof this.date === 'object' && this.date.length) {
            this.endNameInterface(`interface ${this.nameInterface} {[index: number]: ${this.createArray()}}`);
        }
        else if (typeof this.date === 'object') {
            this.endNameInterface(`interface ${this.nameInterface} {${this.createObject(undefined, undefined, true)}}`);
        }
        else {
            this.interfaceRes = typeof this.date;
            return this.interfaceRes;
        }
        if (Object.keys(this.interfaceObj).length > 0) {
            this.transformObjectRes();
        }
        return this.interfaceRes;
    }
    // Валидация каждого элемента массива!
    checkArray(date = this.date, name) {
        if (typeof date === 'object' && date.length) {
            return this.createArrayLevel2(date);
        }
        else if (typeof date === 'object') {
            return this.cteateObjectNews(date, name);
        }
        else {
            return typeof date;
        }
    }
    createArrayAll(data = this.date) {
        const typeArray = [];
        for (const [index, element] of data.entries()) {
            const check = this.checkArray(element, `${this.nameInterface}${index}`);
            if (check) {
                typeArray.push(check);
            }
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return [...new Set(typeArray)].join(' | ');
    }
    // Создания интерфейса 1ур массив и возвращания его типов в виде строки
    createArray(data = this.date) {
        return this.createArrayAll(data);
    }
    // Создания типа массива в массиве
    createArrayLevel2(data = this.date) {
        return `(${this.createArrayAll(data)}) []`;
    }
    checkObject(data = this.date, key) {
        if (typeof data === 'object' && data.length) {
            return this.createArrayLevel2(data);
        }
        else if (typeof data === 'object') {
            return this.cteateObjectNews(data, this.nameInterface + this.transformNameInterface(key));
        }
        else {
            return typeof data;
        }
    }
    createObjectAll(data = this.date, name = this.nameInterface, top = false) {
        const type = {};
        for (const key in data) {
            type[key] = this.checkObject(data[key], key);
        }
        if (top) {
            this.interfaceResObj = type;
            return this.transformObjectValidString(type);
        }
        return this.addInterfaceObj(type, name);
    }
    cteateObjectNews(data = this.date, name = this.nameInterface) {
        return this.createObjectAll(data, name);
    }
    createObject(data = this.date, name = this.nameInterface, top = false) {
        let res = this.createObjectAll(data, name, top);
        res = this.validateDerevo();
        res = this.transformObjectValidString(res);
        return res;
    }
    // Трансформация имени интерфейса
    transformNameInterface(name = this.nameInterface) {
        return name[0].toUpperCase() + name.slice(1);
    }
    transformObjectRes() {
        for (const interfaceObjKey in this.interfaceObj) {
            this.interfaceObj[interfaceObjKey] = this.transformObjectValidString(this.interfaceObj[interfaceObjKey]);
            this.endNameInterface(`interface ${interfaceObjKey} {${this.interfaceObj[interfaceObjKey]}}`);
        }
    }
    // Удалить лишние {}
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-types
    transformObjectValidString(type) {
        let res;
        if (typeof type === 'object') {
            res = JSON.stringify(type).replace(new RegExp('[\{\}"\\\\]', 'gi'), '');
            return res.replace(new RegExp('[\,]', 'gi'), ';');
        }
        else {
            res = type.replace(new RegExp('[\{\}"\\\\]', 'gi'), '');
            return res.replace(new RegExp('[\,]', 'gi'), ';');
        }
    }
    // добавить в конец генерируемого кода текст
    endNameInterface(data) {
        this.interfaceRes += data;
    }
    // добавить в начало генерируемого кода текст
    startNameInterface(data) {
        this.interfaceRes = data + this.interfaceRes;
    }
    addInterfaceObj(interfaceAdd = this.date, name = this.nameInterface) {
        const check = this.validateInterface(interfaceAdd);
        if (!check) {
            this.interfaceObj[name] = interfaceAdd;
            return name;
        }
        return check;
    }
    validateInterface(interfaceAdd = this.date) {
        const keysInterfaceObj = this.mapInterfaceObj();
        const keysInterfaceAdd = Object.keys(interfaceAdd);
        return keysInterfaceObj.filter((e) => JSON.stringify(e.type) === JSON.stringify(keysInterfaceAdd))[0]?.name;
        // return keysInterfaceObj.some(e => JSON.stringify(e.type) === JSON.stringify(keysInterfaceAdd ))
    }
    validateDerevo() {
        const keysInterfaceResObj = Object.keys(this.interfaceResObj);
        const keysInterfaceObj = this.mapInterfaceObj();
        // console.log(keysInterfaceObj)
        // console.log(keysInterfaceResObj)
        const check = keysInterfaceObj.filter((e) => JSON.stringify(e.type) === JSON.stringify(keysInterfaceResObj));
        if (check[0]) {
            const nameDelete = check[0].name;
            delete this.interfaceObj[nameDelete];
            for (const [key, value] of Object.entries(this.interfaceResObj)) {
                if (this.interfaceResObj[key] === nameDelete) {
                    this.interfaceResObj[key] = this.nameInterface;
                }
            }
        }
        return this.interfaceResObj;
    }
    mapInterfaceObj() {
        const keysInterfaceObj = [];
        for (const key in this.interfaceObj) {
            keysInterfaceObj.push({ name: key, type: Object.keys(this.interfaceObj[key]) });
        }
        return keysInterfaceObj;
    }
}
//# sourceMappingURL=createInterface.js.map