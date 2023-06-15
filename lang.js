import { regionsRU, regionsUZ } from './data/regions.js'; 
class ChosenLanguage {
  constructor(lang) {
    this.language = lang || "uz";
    this.isUzbek = lang == "uz";
  }

    setLanguage(language) {
        this.language = language;
    }

    getLanguage() {  
        return this.language;
    }
    greetingContactText(name) {
        if(this.isUzbek) {
        return `\nBotga xush kelibsiz, ${name}! \n\n Iltimos, raqamingizni kiriting:`;
        } else{
            return `\nДобро пожаловать в бот, ${name}! \n\n Пожалуйста, введите свой номер телефона:`;
        }
    }
    contactButtonText() {
        return this.isUzbek ? "📱 Telefon raqamni yuborish" : "📱 Отправить номер телефона";
    }
    regionText() {
        return this.isUzbek ? "Hududni tanlang:" : "Выберите регион:";
    }
    regions() {
        return this.isUzbek ? regionsUZ : regionsRU;
    }
    tireORaccessoriesText() {
        return this.isUzbek ? "Avtoshinalar yoki avtoaksessuarlar" : "Шины или автоаксессуары";
    }
    tireORaccessoriesButtons() {
        return this.isUzbek ? ["Avtoshinalar", "Avtoaksessuarlar"] : ["Шины", "Автоаксессуары"];
    }
    tireSeasonText() {
        return this.isUzbek ? "Iltimos, shina mavsumiy turi tanlang:" : "Пожалуйста, выберите сезонs:";
    }
    tireSeasonButtons() {
        return this.isUzbek ? ["Yozgi", "Qishgi", "Doimiy"] : ["Летние", "Зимние", "Всесезонные"];
    }
    diametersOfTiresText() {
        return this.isUzbek ? "Avtoshina shinasi diamtrini tanlang:" : "Выберите диаметр шины:";
    }
    diameterButtons() {
        let diameters = ["R13", "R14", "R15","R16", "R17", "R18", "R19", "R20", "R21", "R22"];
        return this.divideArray(diameters);
    }
    sizesOfTiresText() {
        return this.isUzbek ? "Avtoshina o'lchamini tanlang:" : "Выберите размер шины:";
    }
    sizesOfTiresButtons() {
        let widths = ["135", "145", "155", "165", "175", "185", "195", "205", "215", "225", "235"];
        return this.divideArray(widths);
    }
    tireBrandsText() {
        return this.isUzbek ? "Avtoshina brendini tanlang:" : "Выберите бренд шины:";
    }
    paymentMethodsText() {
        return this.isUzbek ? "To'lov usulini tanlang:" : "Выберите способ оплаты:";
    }
    // a function that divides an array every 3 elements
    divideArray(array) {
        let dividedArray = [];
        for(let i = 0; i < array.length; i+=3) {
            dividedArray.push(array.slice(i, i+3));
        }
        return dividedArray;
    }
    
}

export default ChosenLanguage;