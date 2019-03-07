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

const printTopBrew = () => {
    brews.map(brew => {
        if(brew.rating >= 3) {
            document.getElementById('topBrew').innerHTML = brew.cafe + '<br>' + "&#9733" + "&#9733"+ "&#9733  " + brew.drink 
        }
    })   
}

newBrew('Rising Star', "Lakewood", 'Iced Mocha', 3, "Super good.")
newBrew("Pheonix", "Cleveland", "Hot Mocha", 2, "It's ok.")


printTopBrew()
