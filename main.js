const createCarousel = () => {
    const brewCarousel = new Siema({
        selector: '#brews',
        perPage: 3,
        draggable: false,
    })
    document.getElementById('left').addEventListener('click', () => brewCarousel.prev(3))
    document.getElementById('right').addEventListener('click', () => brewCarousel.next(3))
}

const changeTitle = (location) => document.getElementById('title').innerHTML = location + "<br>Brew Review"

const brews = []

const newBrew = (cafe,location,drink,rating,info) => {
    let stars
    if(rating == 3) stars = "<br> &#9733 &#9733 &#9733  "
    else if(rating == 2) stars = "<br> &#9733 &#9733 &#9734  "
    else stars = "<br> &#9733 &#9734 &#9734  "

    const brew = {
        cafe: cafe,
        location: location,
        drink: drink,
        rating: rating,
        stars: stars,
        info: info,
        print() {
            return this.cafe + this.stars + this.drink
        }
    }
    brews.push(brew)
} 

const printBrews = (brews) => {
    changeTitle("Cuyohoga")
    removeBrews()
    brews.sort((a,b) => b.rating - a.rating)

    brews.map(brew => {
        const brewDiv = document.createElement('div')
        brewDiv.className = 'brew'

        if(brew.rating >= 1) {
            if(document.getElementById('topBrew').innerHTML == ""){
                brewDiv.innerHTML = brew.print()
                document.getElementById('topBrew').appendChild(brewDiv) 
            }else{
                brewDiv.innerHTML = brew.print()
                document.getElementById('brews').appendChild(brewDiv)
            }
        }
        else if(brew.rating == 2){
            brewDiv.innerHTML = brew.print()
            document.getElementById('brews').appendChild(brewDiv)
        }
        else{
            brewDiv.innerHTML = brew.print()
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
    createCarousel()
}

const removeBrews = () => {
    const allBrews = document.getElementsByClassName("allBrews")
    while(allBrews[0].firstChild && allBrews[1].firstChild){
        allBrews[0].removeChild(allBrews[0].firstChild)
        allBrews[1].removeChild(allBrews[1].firstChild)
    }
}

newBrew('Rising Star', "Lakewood", 'Iced Mocha', 3, "Super good.")
newBrew("Pheonix", "Cleveland Westside", "Hot Mocha", 3, "Very nice.")
newBrew("Duck Rabbit", "Cleveland Eastside", "Espresso", 1, "hi")
newBrew("Rising Star", "Cleveland Downtown", "Coffee", 2, "hi")
newBrew("Pour", "Cleveland Eastside", "Not Mocha", 1, "It's ok.")
newBrew("7-Eleven", "Lakewood", "Coffee", 1, "hi")
newBrew("QuickStop", "Cleveland Downtown", "Coffee", 1, "hi")
printBrews(brews)



let maps = document.querySelectorAll('path')

maps.forEach(map => {
    map.addEventListener('click', () => {
        if (map.getAttribute("fill") == "transparent" && areMapsFilled(maps) == false){
            map.setAttribute("fill", "#F4F4F6")
            sortBrewsByLocation(map.getAttribute("alt"),brews)
        }
        else{
            map.setAttribute("fill", "transparent")
            if(areMapsFilled(maps) == false) printBrews(brews)
        }
    })
})

const areMapsFilled = (maps) => {
    let filled = false
    maps.forEach(map => {
        if (map.getAttribute("fill") == "#F4F4F6") filled = true
    })
    return filled
}

const sortBrewsByLocation = (name,brews) => {
    removeBrews()
    let sortedBrews = []
    brews.map(brew => {
        if (name == brew.location) sortedBrews.push(brew)
    })
    printBrews(sortedBrews)
    changeTitle(name)
}


