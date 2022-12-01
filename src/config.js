const Config = {
    taxListing: 0.05,//Used for adding taxt to listing
    taxForBuy: 0.05, //Used for adding taxt when buying items and also used for calculating total earnings
    taxMultDay: 0.01 //Used for adding taxt depending on listing day
}
const items = [
    { label: "Telefon", name: "phone" },
    { label: "Su pompası", name: "waterpump" },
    { label: "Ekmek", name: "bread" },
    { label: "Su", name: "water" },
    { label: "Bayat ekmek", name: "bread_rotten" }
]
function round(number) {
    return (Math.round(number * 100) / 100).toFixed(2)
}
Number.prototype.currencyFormat = function () {
    return new Intl.NumberFormat().format(this);
}
function findItem(name) {
    for (let i = 0; i < exampleInv.length; i++) {
        if (exampleInv[i].name == name) return exampleInv[i]
    }
}
function findOrder(id) {
    for (let i = 0; i < activeList.length; i++) {
        if (activeList[i].id == id) return activeList[i]
    }
}
function findActiveOrder(id) {
    for (let i = 0; i < activeOrders.length; i++) {
        if (activeOrders[i].id == id) return activeOrders[i]
    }
}

Number.prototype.calculateTimeRemaining = function () {
    let target = this.toString().length == 10 ? this * 1000 : this;
    let now = new Date().getTime();
    let passedTime = target - now
    let retval = "";
    if (passedTime >= 31556952000) {
        retval = Math.round(passedTime / 31556952000) + " yıl";
    } else if (passedTime >= 2592000000) {
        retval = Math.round(passedTime / 31556952000) + " ay";
    } else if (passedTime >= 604800000) {
        retval = Math.round(passedTime / 604800000) + " hafta";
    } else if (passedTime >= 3600000) {
        retval = Math.round(passedTime / 3600000) + " saat";
    } else if (passedTime >= 60000) {
        retval = Math.round(passedTime / 60000) + " dakika";
    } else if (passedTime >= 1000) {
        retval = Math.round(passedTime / 1000) + " saniye";
    } else if (passedTime <= 0) {
        retval = "bitti";
    }
    return retval;
}

const exampleInv = [
    { name: "bread", label: "ekmek", count: 50 },
    { name: "water", label: "Su", count: 50 },
    { name: "phone", label: "Telefon", count: 1 },

]
const exampleList = [
    { id: 1, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 2, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 3, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 4, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 5, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 6, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 7, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 8, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 9, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 10, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 11, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 12, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 13, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 14, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 15, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 16, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 17, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 18, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 19, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 20, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 21, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 22, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 23, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 24, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 25, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 26, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 27, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 28, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 29, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 30, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 31, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 32, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 33, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 34, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 35, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 36, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 37, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 38, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 39, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 40, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 41, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 42, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 43, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 44, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 45, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 46, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 47, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 48, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 49, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 50, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 51, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 52, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 53, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 54, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 55, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 56, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 57, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 58, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 59, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 60, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 61, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 62, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 63, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 64, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 65, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 66, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 67, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 68, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 69, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 70, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 71, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 72, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 73, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 74, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 75, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 76, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 77, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 78, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 79, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 80, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 81, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 82, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 83, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 84, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 85, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 86, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 87, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 88, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 89, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 90, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 91, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 92, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 93, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 94, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 95, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 96, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 97, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 98, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 99, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 100, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 101, name: "bread", label: "Ekmek", count: 5, price: 1, weight: 0.1, time: 1670068800 },
    { id: 102, name: "water", label: "Su", count: 7, price: 56, weight: 0.4, time: 1669422440 },
    { id: 103, name: "phone", label: "Makarna", count: 8, price: 48, weight: 0.5, time: 1670068800 },
    { id: 104, name: "bread", label: "Kek", count: 95, price: 69, weight: 0.8, time: 1670068800 },
    { id: 105, name: "bread", label: "Yumurta", count: 52, price: 371, weight: 0.9, time: 1670068800 },
    { id: 106, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 107, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 },
    { id: 108, name: "bread", label: "Et", count: 1, price: 55, weight: 1, time: 1670068800 },
    { id: 109, name: "bread", label: "Pizza", count: 2, price: 66, weight: 0.5, time: 1670068800 }
]