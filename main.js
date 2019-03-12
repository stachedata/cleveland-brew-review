const brews = []

const newBrew = (cafe,where,drink,rating,info) => {
    const brew = {
        cafe: cafe,
        where: where,
        drink: drink,
        rating: rating,
        info: info
    }
    brews.push(brew)
} 

const printBrews = () => {
    brews.sort((a,b) => b.rating - a.rating)

    brews.map(brew => {
        const brewDiv = document.createElement('div')
        brewDiv.className = 'brew'

        if(brew.rating == 3) {
            if(document.getElementById('topBrew').innerHTML == ""){
                document.getElementById('topBrew').innerHTML = brew.cafe + "<br> &#9733 &#9733 &#9733  " + brew.drink 
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

        brewDiv.setAttribute("info", brew.where + "<br>" + brew.info)
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
newBrew("Rising Star", "Lakewood", "Coffee", 2, "hi")
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