const categories = {
    resource: {
        label: "Malzemeler",
        icon: "",
    },
    food: {
        label: "Besinler"
    },
    tool: {
        label: "Araçlar",
    },
}
[
    { name: "bread", label: "Ekmek", count: 5, price: 65, time: "4 gün" },
    { name: "bread", label: "Ekmek", count: 7, price: 56, time: "6 gün" },
    { name: "bread", label: "Ekmek", count: 8, price: 48, time: "1 gün" },
    { name: "bread", label: "Ekmek", count: 95, price: 69, time: "8 gün" },
    { name: "bread", label: "Ekmek", count: 52, price: 371, time: "12 gün" },
    { name: "bread", label: "Ekmek", count: 1, price: 55, time: "6 gün" },
    { name: "bread", label: "Ekmek", count: 2, price: 66, time: "2 gün" }
]
// (a,b)=>{a.count>b.count}


/* v1

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
                node.classList.add("search-dropdown-entry")
                node.innerHTML =
                    `
            <img src="assets/${matches[i].name}.png" alt="${matches[i].name}">
            <span>${matches[i].label}</span> 
            `
                dropdown.append(node)
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
 */
/* v2

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
                node.classList.add("search-dropdown-entry")
                dropdown.append(node)
                node.innerHTML =
                    `
            <img src="assets/${matches[i].name}.png" alt="${matches[i].name}">
            <span>${matches[i].label}</span> 
            `
            }
        }
        let removals = []

        for (let i = 0; i < dropdown.children.length; i++) {
            if (dropdown.children[i].children[1].innerText.toLocaleLowerCase("tr").indexOf(input.toLocaleLowerCase("tr")) > -1) {
                removals.push(dropdown.children[i])
            }
        }
        if (removals.length > 0) {
            for (let i = 0; i < removals.length - 1; i++) {
                removals[i].remove()
            }
        }
        if (matches.length > 0) {
            if (dropdown.style.opacity == "0") {
                dropdown.style.display = "1"
             dropdown.style.pointerEvents="all"
            }
        }
    } else if (dropdown.style.opacity == "1") {
        searchInput.innerHTML = ""
        dropdown.style.pointerEvents = "none"
        dropdown.style.opacity="0"
    }
})
*/