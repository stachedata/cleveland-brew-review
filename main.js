const brews = []

const newBrew = (cafe,location,drink,rating,info) => {
    const brew = {
        cafe: cafe,
        location: location,
        drink: drink,
        rating: rating,
        info: info
    }
    brews.push(brew)
    console.log("push")
} 

const printBrews = () => {
    brews.sort((a,b) => b.rating - a.rating)

    brews.map(brew => {
        const brewDiv = document.createElement('div')
        brewDiv.className = 'brew'

        if(brew.rating == 3) {
            if(document.getElementById('topBrew').innerHTML == ""){
                brewDiv.innerHTML = brew.cafe + "<br> &#9733 &#9733 &#9733  " + brew.drink
                document.getElementById('topBrew').appendChild(brewDiv) 
            }else{
                brewDiv.innerHTML = brew.cafe + "<br> &#9733 &#9733 &#9733  " + brew.drink
                document.getElementById('brews').appendChild(brewDiv)
            }
        }
        else if(brew.rating == 2){
            brewDiv.innerHTML = brew.cafe + "<br> &#9733 &#9733 &#9734  " + brew.drink
            document.getElementById('brews').appendChild(brewDiv)
        }
        else{
            brewDiv.innerHTML = brew.cafe + "<br> &#9733 &#9734 &#9734  " + brew.drink
            document.getElementById('brews').appendChild(brewDiv)
        }

        brewDiv.setAttribute("info", brew.location + "<br>" + brew.info)
        brewDiv.addEventListener('click', () => {
            if(brewDiv.getAttribute("info") == brewDiv.innerHTML) {
                brewDiv.innerHTML = brewDiv.getAttribute("og");
            } 
            else {
                brewDiv.setAttribute("og", brewDiv.innerHTML);
                brewDiv.innerHTML = brewDiv.getAttribute("info");
            }
        })
    }) 
}

newBrew('Rising Star', "Lakewood", 'Iced Mocha', 3, "Super good.")
newBrew("Pour", "Cleveland", "Not Mocha", 1, "It's ok.")
newBrew("Pheonix", "Cleveland", "Hot Mocha", 3, "Very nice.")
newBrew("Duck Rabbit", "Cleveland", "Espresso", 2, "hi")
newBrew("Rising Star", "Downtown Cleveland", "Coffee", 2, "hi")
newBrew("7-Eleven", "Lakewood", "Coffee", 1, "hi")
newBrew("QuickStop", "Cleveland", "Coffee", 1, "hi")
printBrews()

const moveBrews = new Siema({
    selector: '#brews',
    perPage: 3,
    draggable: false,
})
document.getElementById('left').addEventListener('click', () => moveBrews.prev(3))
document.getElementById('right').addEventListener('click', () => moveBrews.next(3))


let maps = document.querySelectorAll('path')

console.log("before click: ",brews)
maps.forEach(map => {
    map.addEventListener('click', () => {
        console.log("click: ",brews)
        if (map.getAttribute("fill") == "transparent" && areMapsFilled(maps) == false){
            map.setAttribute("fill", "#F4F4F6")
            // sortBrews(map.getAttribute("alt"),brews)
        }
        else{
            map.setAttribute("fill", "transparent")
        }
        // let name = map.getAttribute("name")
        // sortBrews(name)
    })
})

const areMapsFilled = (maps) => {
    let filled = false
    maps.forEach(map => {
        if (map.getAttribute("fill") == "#F4F4F6") filled = true
    })
    return filled
}

//testing sorted brews
// const sortBrews = (name,brews) => {
//     let sortedBrews = brews
//     console.log("before sort: ", name)
//     sortedsBrew = brews.map(brew => {
//         if (name != brew.location) sortedBrews.splice(brew, 1)
//     })
//     console.log("after sort: ",sortedBrews[0])
// }