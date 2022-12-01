let dropdown = document.getElementById("search-dropdown")
let searchInput = document.getElementById("search-input")
let table = document.getElementById("table")

let activeList = []
let currentPage = 1
let sortOrder = "down"
var countdownSims = []
let totalPage
let reloadProcess = false

function buildList(data, compare, page) { //main function to build list ( data must come final)
    reloadProcess = true
    table.innerHTML = ""
    activeList = data
    if (compare) data.sort(compare)
    totalPage = Math.ceil(data.length / 10)
    if (page == null) page = 0
    let index = (page * 10) == 0 ? 0 : (page * 10)
    currentPage = page

    let max = index !== 0 ? index + 10 : (data.length > 20) ? 10 : data.length
    document.getElementById("page-number").innerHTML = ` <span>Sayfa ${page + 1}/${totalPage}</span>`

    for (let i = 0; i < countdownSims.length; i++) {// clear leftover countDown sims
        countdownSims.clear()
    }

    countdownSims = []

    for (let i = index; i < max; i++) {

        let timeRemaining = data[i].time.calculateTimeRemaining()
        if (timeRemaining.slice(-6) == "saniye") {
            countdownSims.push(new CountdownSim(data[i].id))
        }

        table.innerHTML +=
            `
        <div id="order-${data[i].id}" class="table-entry"  order-id="${data[i].id}" onClick="selectItemFromList(${data[i].id})"> 

        <div>
            <img src="assets/${data[i].name}.png" alt=" ${data[i].name} Image " >
             <span>${data[i].label}</span>
        </div>
        <div>${data[i].price}</div>
        <div>${data[i].count}</div>
        <div>${data[i].weight}</div>
        <div>${timeRemaining}</div>
        </div>

        `
    }

    reloadProcess = false
}
function reloadList() {
    if (reloadProcess) return
    $.post("https://eb_market/refresh", "{}", (retval) => {
        currentPage = 0
        buildList(retval, sortByPrice, 0)
    })
}
function exit() {
    let main = document.getElementById("main-wrap")
    main.style.opacity = "0"
    $.post("https://eb_market/exit", "{}")
}

// PAGE NAV BUTTON FUNCTIONS
function prevPage() {
    if (reloadProcess) return

    if (currentPage > 0) {
        currentPage--
        buildList(activeList, null, currentPage)
    }
}
function nextPage() {
    if (reloadProcess) return
    if (activeList.length < (currentPage + 1) * 10) return
    else {
        currentPage++
        buildList(activeList, null, currentPage)
    }
}
// SEARCH FUNCTION AREA
dropdown.style.display="none"
searchInput.addEventListener("input", () => {
    let input = searchInput.value
    let matches = []
    if (input.length >= 2) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].label.toLocaleLowerCase("tr").indexOf(input.toLocaleLowerCase("tr")) > -1) {
                matches.push(items[i])
            }
        }

        for (let i = 0; i < matches.length; i++) {
            let found = false
            for (let n = 0; n < dropdown.children.length; n++) {
                if (dropdown.children[n].children[1].innerText == matches[i].label) {
                    found = true
                    break
                }
            }

            if (!found) {
                let node = document.createElement("div")
                dropdown.append(node)
                node.outerHTML =
                    `
                    <div class="search-dropdown-entry" onclick="openItem('${matches[i].name}')")>
            <img src="assets/${matches[i].name}.png" alt="${matches[i].name}">
            <span>${matches[i].label}</span> </div>
            `
            }
        }
        let removals = []

        for (let i = 0; i < dropdown.children.length; i++) {
            if (dropdown.children[i].children[1].innerText.toLocaleLowerCase("tr").indexOf(input.toLocaleLowerCase("tr") > -1)) {
                removals.push(dropdown.children[i])
            }
        }
        if (removals.length > 0) {
            for (let i = 0; i < removals.length - 1; i++) {
                removals[i].remove()
            }
        }
        if (matches.length > 0) {
            if (dropdown.style.display == "none") {
                dropdown.style.display = "flex"
                setTimeout(() => {
                    dropdown.style.opacity = "1"
                }, 10);
            }
        }


    } else if (dropdown.style.display == "flex") {
        searchInput.innerHTML = ""
        dropdown.style.opacity = "0"
        setTimeout(() => { dropdown.style.display = "none" }, 500)
    }
})
function openItem(name) {
    if (reloadProcess) return
    reloadProcess=true
    $.post("https://eb_market/openItem",JSON.stringify({name:name}),(retval)=>{
        buildList(retval,sortByPrice,0)
    })
}
// Categories Functions
function openCategory(cat) {
    $.post("https://eb_market/getCategory", JSON.stringify({ cat: cat }), (retval) => {
        resetSortIcon
        buildList(retval, sortByPrice, 0)
    })
}

// ******************** Sort FUNCTİONS
function resetSortIcon() {
    let oldImage = document.querySelector(`img[src="assets/${sortOrder}.png"]`)
    oldImage.remove()
    let newImage = document.createElement("img")
    newImage.src = `assets/${sortOrder}.png`
    document.getElementById("sort-price").append(newImage)
}
function sortByName() {
    let oldImage = document.querySelector(`img[src="assets/${sortOrder}.png"]`)
    oldImage.remove()

    if (sortOrder == "down") {
        buildList(activeList, (a, b) => { return a.label.localeCompare(b.label, "tr", { ignorePunctuation: true }) })
        sortOrder = "up"
    } else if (sortOrder == "up") {
        buildList(activeList, (a, b) => { return b.label.localeCompare(a.label, "tr", { ignorePunctuation: true }) })
        sortOrder = "down"
    }
    let newImage = document.createElement("img")
    newImage.src = `assets/${sortOrder}.png`
    document.getElementById("sort-name").append(newImage)

}

function sortByPrice() {
    let oldImage = document.querySelector(`img[src="assets/${sortOrder}.png"]`)
    oldImage.remove()

    if (sortOrder == "down") {
        buildList(activeList, (a, b) => { return a.price - b.price })
        sortOrder = "up"
    } else if (sortOrder == "up") {
        buildList(activeList, (a, b) => { return b.price - a.price })
        sortOrder = "down"

    }
    let newImage = document.createElement("img")
    newImage.src = `assets/${sortOrder}.png`
    document.getElementById("sort-price").append(newImage)

}
function sortByCount() {
    let oldImage = document.querySelector(`img[src="assets/${sortOrder}.png"]`)
    oldImage.remove()

    if (sortOrder == "down") {
        buildList(activeList, (a, b) => { return a.count - b.count })
        sortOrder = "up"
    } else if (sortOrder == "up") {
        buildList(activeList, (a, b) => { return b.count - a.count })
        sortOrder = "down"

    }
    let newImage = document.createElement("img")
    newImage.src = `assets/${sortOrder}.png`
    document.getElementById("sort-count").append(newImage)
}
function sortByWeight() {
    let oldImage = document.querySelector(`img[src="assets/${sortOrder}.png"]`)
    oldImage.remove()

    if (sortOrder == "down") {
        buildList(activeList, (a, b) => { return a.weight - b.weight })
        sortOrder = "up"
    } else if (sortOrder == "up") {
        buildList(activeList, (a, b) => { return b.weight - a.weight })
        sortOrder = "down"

    }
    let newImage = document.createElement("img")
    newImage.src = `assets/${sortOrder}.png`
    document.getElementById("sort-weight").append(newImage)
}
function sortByTime() {
    let oldImage = document.querySelector(`img[src="assets/${sortOrder}.png"]`)
    oldImage.remove()

    if (sortOrder == "down") {
        buildList(activeList, (a, b) => { return a.time - b.time })
        sortOrder = "up"
    } else if (sortOrder == "up") {
        buildList(activeList, (a, b) => { return b.time - a.time })
        sortOrder = "down"
    }
    let newImage = document.createElement("img")
    newImage.src = `assets/${sortOrder}.png`
    document.getElementById("sort-time").append(newImage)
}

//ORDER CREATION
let unitPrice = document.getElementById("item-price-input")
let unitCount = document.getElementById("item-count-input")
let listingDay = document.getElementById("item-time-input")
function openListCreation() {
    buildSelItemList(exampleInv)
    let listingElement = document.getElementById("sell-create-wrap")
    listingElement.style.display = "flex"
    setTimeout(() => {
        listingElement.style.opacity = "1"
    }, 10);
}
function cancelListingCreation() {
    buildSelItemList(exampleInv)
    let listingElement = document.getElementById("sell-create-wrap")
    listingElement.style.display = "none"
    setTimeout(() => {
        listingElement.style.opacity = "0"
    }, 500);
}

function selectSellItem(name) {
    let item = findItem(name)

    unitCount.setAttribute("max", item.count)
    let oldSelected = document.querySelector(`.item-list-entry.selected`)
    if (oldSelected) oldSelected.classList.remove("selected")

    let select = document.querySelector(`.item-list-entry[item-name="${name}"]`)
    if (select) {
        select.classList.add("selected")
    }
    document.getElementById("item-price-input").value = 1
    document.getElementById("item-count-input").value = 1
    document.getElementById("item-time-input").value = 1
    calculateTaxes()
}

function buildSelItemList(data) {//Sell item list build function
    data.sort((a, b) => a.name.localeCompare(b.name, "tr", { ignorePunctuation: true }))
    let innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        innerHTML +=
            `
            <div class="item-list-entry" item-name="${data[i].name}" onclick="selectSellItem('${data[i].name}')">
                <div>
                    <img src="assets/${data[i].name}.png" alt="${data[i].name}">
                    <span>${data[i].label}</span>
                </div>
                <div>${data[i].count}</div>
            </div>
            `
    }
    document.getElementById("item-list").innerHTML = innerHTML
}

unitPrice.addEventListener("input", () => {
    if (unitPrice.value >= parseInt(unitPrice.getAttribute("max"))) {
        unitPrice.value = parseInt(unitPrice.getAttribute("max"))
    } else if (unitPrice.value < parseInt(unitPrice.getAttribute("min"))) {
        unitPrice.value = parseInt(unitPrice.getAttribute("min"))
    }
    calculateTaxes()
})
unitCount.addEventListener("input", () => {
    if (unitCount.value >= parseInt(unitCount.getAttribute("max"))) {
        unitCount.value = parseInt(unitCount.getAttribute("max"))
    } else if (unitCount.value < parseInt(unitCount.getAttribute("min"))) {
        unitCount.value = parseInt(unitCount.getAttribute("min"))
    }
    calculateTaxes()
})
listingDay.addEventListener("input", () => {
    if (listingDay.value >= parseInt(listingDay.getAttribute("max"))) {
        listingDay.value = parseInt(listingDay.getAttribute("max"))
    } else if (listingDay.value < parseInt(listingDay.getAttribute("min"))) {
        listingDay.value = parseInt(listingDay.getAttribute("min"))
    }
    calculateTaxes()
})


function calculateTaxes() {
    let unitFee = (unitPrice.value * unitCount.value) * Config.taxListing
    let listFee = (unitPrice.value * unitCount.value) * (Config.taxMultDay * listingDay.value)
    document.getElementById("calc-fee").value = parseFloat(round(unitFee)).currencyFormat()
    document.getElementById("calc-fee-list").value = parseFloat(round(listFee)).currencyFormat()
    document.getElementById("calc-total-earning").value = parseFloat(round((unitPrice.value * unitCount.value) - unitFee)).currencyFormat()
}
function CountdownSim(id) {
    this.interval = setInterval(() => {
        let order = findOrder(id)
        let timeRemaining = order.time.calculateTimeRemaining()
        let el = document.getElementById("order-" + id)
        if (timeRemaining == "bitti") {
            clearInterval(this.interval)
        } else if (this.interval) {
            el.children[3].innerText = timeRemaining
        }
    }, 100);

    clear = () => {
        this.clearInterval(this.interval)
    }
}
// BUY FUNCTIONS
let buyInput = document.getElementById("buy-count")
let activeOrder
function selectItemFromList(id) {
    activeOrder = findOrder(id)
    let time = document.getElementById(`order-${id}`).children[4].innerText
    if (time != "bitti") {
        document.getElementById("buy-info-img").src = `assets/${activeOrder.name}.png `
        document.getElementById("buy-info-label").innerText = activeOrder.label

        document.getElementById("buy-info-price").children[1].innerText = activeOrder.price
        document.getElementById("buy-info-count").children[1].innerText = activeOrder.count

        buyInput.setAttribute("max", activeOrder.count)
        buyInput.value = 1
        calculatebuyTaxes()
    } else {
        popNotif("Ürünün süresi doldu satın alınamaz")
    }

}
function calculatebuyTaxes() {
    let unitFee = parseFloat(round((activeOrder.price * buyInput.value) * Config.taxListing))
    let total = parseFloat(round((activeOrder.price * buyInput.value) + unitFee))

    document.getElementById("buy-tax").value = unitFee.currencyFormat()
    document.getElementById("buy-total").value = total.currencyFormat()

    let buyElement = document.getElementById("buy-wrap")
    buyElement.style.display = "flex"
    setTimeout(() => {
        buyElement.style.opacity = "1"
    }, 10);


}

buyInput.addEventListener("input", () => {
    buyInput.value = Math.round(buyInput.value)
    if (buyInput.value >= parseInt(buyInput.getAttribute("max"))) {
        buyInput.value = parseInt(buyInput.getAttribute("max"))
    } else if (buyInput.value < parseInt(buyInput.getAttribute("min"))) {
        buyInput.value = parseInt(buyInput.getAttribute("min"))
    }
    calculatebuyTaxes()
})

function tryBuy(){// final buy attempt

}

function closeBuyMenu() {
    buildSelItemList(exampleInv)
    let listingElement = document.getElementById("buy-wrap")
    listingElement.style.display = "none"
    setTimeout(() => {
        listingElement.style.opacity = "0"
    }, 10);
}

// Notif Function

let notifVisible = false
let notifTimer
window.addEventListener("click", () => {
    if (notifVisible) {
        closeNotif()
    }
})
function popNotif(text) {
    let notif = document.getElementById("notif-wrap")
    notif.children[1].children[0].innerText = text
    notif.style.display = "flex"
    setTimeout(() => {
        notifVisible = true
        notif.style.opacity = "1"
        notifTimer = setTimeout(() => {
            closeNotif()
        }, 3000)
    }, 10)

}
function closeNotif() {
    notifVisible = false
    notif = document.getElementById("notif-wrap")
    notif.style.display = "none"

    setTimeout(() => {
        notif.style.opacity = "0"
    }, 10);

}

// History
let emptyList = []
function openHistory() {
    openActiveOrder()
    buildActiveOrders(emptyList)
    let listingElement = document.getElementById("history-wrap")
    listingElement.style.display = "flex"
    setTimeout(() => {
        listingElement.style.opacity = "1"
    }, 10);
}
function historyExit() {
    let listingElement = document.getElementById("history-wrap")
    listingElement.style.display = "none"
    setTimeout(() => {
        listingElement.style.opacity = "0"
    }, 10);
}
// History Area Top Button Functions
/*
asıl olucak olan kod
$.post("https://eb_market/getActiveOrders",{},(retval)=>{
    buildActiveOrders(retval)
    document.getElementById("history-top").children[0].classList.add("selected")
})
*/
function openActiveOrder() {
    let oldSelected = document.querySelector(`#history-top div.selected`)
    if (oldSelected) oldSelected.classList.remove("selected")
    document.getElementById("history-top").children[0].classList.add("selected")
    buildActiveOrders(emptyList)
}
function openOldOrders() {
    let oldSelected = document.querySelector(`#history-top div.selected`)
    if (oldSelected) oldSelected.classList.remove("selected")
    document.getElementById("history-top").children[1].classList.add("selected")
    buildOldOrders(emptyList)

}
function openOldPurchases() {
    let oldSelected = document.querySelector(`#history-top div.selected`)
    if (oldSelected) oldSelected.classList.remove("selected")
    document.getElementById("history-top").children[2].classList.add("selected")
    buildOldPurchases(emptyList)
}

// Active order Functions
let activeOrders = []
let selectedActiveOrder
function buildActiveOrders(data) {
    data.sort((a, b) => { return a.time - b.time })
    activeOrders = data
    selectedActiveOrder = null
    let innerHTML = ""
    if (data.length == 0) {
        innerHTML =
            ` 
        <div class="history-table-entry disabled">
        <div>Hiç sonuç yok</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
         </div>
        `
    } else {
        for (let i = 0; i < data.length; i++) {
            innerHTML += `
        <div class="history-table-entry") order-id=${data[i].id}" onclick="selectActiveOrders(${data[i].id}))">
        <div>
            <img src="assets/${data[i].name}.png" alt="${data[i].name}">
            <span>${data[i].label}</span>
        </div>
        <div>$${data[i].price}</div>
        <div>${data[i].count} / (${data[i].totalCount})</div>
        <div>${data[i].time.calculateTimeRemaining()})</div>
        <div>${data[i].createDate.dateFormat()} </div>
        </div>
    `
        }
    }
    let hHeader = document.getElementById("history-table-header")
    hHeader.children[2].innerText = "Adet"
    hHeader.children[3].innerHTML = `Kalan Süre  <img src="assets/down.png" alt="downImage">`
    hHeader.children[4].innerText = "Yayın Tarihi"


    document.getElementById("history-table-entry-area").innerHTML = innerHTML
    document.getElementById("history-remove-order").classList.add("disabled")
}

// Old order Functions
function buildOldOrders(data) {
    data.sort((a, b) => { return a.time - b.time })
    activeOrders = data
    selectedActiveOrder = null
    let innerHTML = ""
    if (data.length == 0) {
        innerHTML =
            ` 
        <div class="history-table-entry disabled">
        <div>Hiç sonuç yok</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
         </div>
        `
    } else {
        for (let i = 0; i < data.length; i++) {
            innerHTML += `
        <div class="history-table-entry")">
        <div>
            <img src="assets/${data[i].name}.png" alt="${data[i].name}">
            <span>${data[i].label}</span>
        </div>
        <div>$${data[i].price}</div>
        <div>${data[i].totalCount - data[i].count} / (${data[i].totalCount})</div>
        <div>${data[i].time.dateFormat()})</div>
        <div>${data[i].createDate.dateFormat()} </div>
        </div>
    `
        }
    }
    let hHeader = document.getElementById("history-table-header")
    hHeader.children[2].innerText = "Satış"
    hHeader.children[3].innerHTML = `Bitiş Tarihi <img src="assets/down.png" alt="downImage">`
    hHeader.children[4].innerText = "Yayın Tarihi"


    document.getElementById("history-table-entry-area").innerHTML = innerHTML
    document.getElementById("history-remove-order").classList.add("disabled")
}
// Old  Purchases Functions
function buildOldPurchases(data) {
    data.sort((a, b) => { return a.time - b.time })
    activeOrders = data
    selectedActiveOrder = null
    let innerHTML = ""
    if (data.length == 0) {
        innerHTML =
            ` 
        <div class="history-table-entry disabled">
        <div>Hiç sonuç yok</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
         </div>
        `
    } else {
        for (let i = 0; i < data.length; i++) {
            innerHTML += `
        <div class="history-table-entry")">
        <div>
            <img src="assets/${data[i].name}.png" alt="${data[i].name}">
            <span>${data[i].label}</span>
        </div>
        <div>$${data[i].price}</div>
        <div>${data[i].count}</div>
        <div>${data[i].total})</div>
        <div>${data[i].time.dateFormat()} </div>
        </div>
    `
        }
    }
    let hHeader = document.getElementById("history-table-header")
    hHeader.children[2].innerText = "Adet"
    hHeader.children[3].innerText = "Toplam"
    hHeader.children[4].innerHTML = `Tarih <img src="assets/down.png" alt="downImage">
    `


    document.getElementById("history-table-entry-area").innerHTML = innerHTML
    document.getElementById("history-remove-order").classList.add("disabled")
}
function selectActiveOrders(id) {
    selectedActiveOrder = findActiveOrder(id)

    let oldSelected = document.querySelector(`.history-table-entry.selected`)
    if (oldSelected) oldSelected.classList.remove("selected")

    let el = document.querySelector(`.history-table-entry[item-id="${id}"]`)
    el.classList.add("selected")
}
function removeActiveOrder() {
    if (!selectedActiveOrder) return
    $.post("https://eb_market/removeActiveOrder", JSON.stringify(orderId = selectedActiveOrder.id), (retval) => {
        buildActiveOrders(retval) // force refresh to the list
    })

}


buildList(exampleList, sortByPrice(), currentPage);
