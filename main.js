const brews = []

const newBrew = (cafe,where,drink,rating,info) => {
    brew = {
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
    })   
}


newBrew('Rising Star', "Lakewood", 'Iced Mocha', 3, "Super good.")
newBrew("Pour", "Cleveland", "Not Mocha", 1, "It's ok.")
newBrew("Pheonix", "Cleveland", "Hot Mocha", 3, "Very nice.")
newBrew("Duck Rabbit", "Cleveland", "Espresso", 2, "")
newBrew("Rising Star", "Lakewood", "Coffee", 2, "")
newBrew("7-Eleven", "Lakewood", "Coffee", 1, "")
newBrew("QuickStop", "Cleveland", "Coffee", 1, "")


printBrews()