const createCarousel = int => {
  const brewCarousel = new Siema({
    selector: '#brews',
    perPage: int,
    draggable: false
  })
  document
    .getElementById('leftButton')
    .addEventListener('click', () => brewCarousel.prev(int))
  document
    .getElementById('rightButton')
    .addEventListener('click', () => brewCarousel.next(int))
}

const changeTitle = location =>
  (document.getElementById('title').innerHTML =
    'Cleveland ' + location + '<br>Brew Review')

const brews = []

const newBrew = (cafe, location, drink, rating, info) => {
  let stars
  if (rating == 3) stars = '<br> &#9733 &#9733 &#9733  '
  else if (rating == 2) stars = '<br> &#9733 &#9733 &#9734  '
  else stars = '<br> &#9733 &#9734 &#9734  '

  const brew = {
    cafe: cafe,
    location: location,
    drink: drink,
    rating: rating,
    stars: stars,
    info: info,
    print() {
      return this.cafe + '<br>' + this.drink + this.stars
    }
  }
  brews.push(brew)
}

const printBrews = brews => {
  changeTitle('')
  removeBrews()
  brews.sort((a, b) => b.rating - a.rating)

  brews.forEach(brew => {
    const brewDiv = document.createElement('div')
    brewDiv.className = 'brew'

    if (brew.rating >= 1) {
      if (document.getElementById('topBrew').innerHTML == '') {
        brewDiv.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" fill="gold" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg> ' +
          brew.print()
        document.getElementById('topBrew').appendChild(brewDiv)
      } else {
        brewDiv.innerHTML = brew.print()
        document.getElementById('brews').appendChild(brewDiv)
      }
    } else if (brew.rating == 2) {
      brewDiv.innerHTML = brew.print()
      document.getElementById('brews').appendChild(brewDiv)
    } else {
      brewDiv.innerHTML = brew.print()
      document.getElementById('brews').appendChild(brewDiv)
    }

    brewDiv.setAttribute('info', brew.location + '<br>' + brew.info)
    brewDiv.addEventListener('click', () => {
      if (brewDiv.getAttribute('info') == brewDiv.innerHTML) {
        brewDiv.innerHTML = brewDiv.getAttribute('og')
      } else {
        brewDiv.setAttribute('og', brewDiv.innerHTML)
        brewDiv.innerHTML = brewDiv.getAttribute('info')
      }
    })
  })
  createCarousel(3)
}

const removeBrews = () => {
  const allBrews = document.getElementsByClassName('allBrews')
  while (allBrews[0].firstChild && allBrews[1].firstChild) {
    allBrews[0].removeChild(allBrews[0].firstChild)
    allBrews[1].removeChild(allBrews[1].firstChild)
  }
}

let event
if (window.innerWidth <= '823') event = 'touchstart'
else event = 'click'
let maps = document.querySelectorAll('path')
let lastClickedMap
maps.forEach((map, i) => {
  map.addEventListener(event, () => {
    if (lastClickedMap != undefined)
      maps[lastClickedMap].setAttribute('fill', 'transparent')
    if (
      map.getAttribute('fill') == 'transparent' &&
      map != maps[lastClickedMap]
    ) {
      lastClickedMap = i
      map.setAttribute('fill', 'rgba(244, 244, 246, 0.25)')
      sortBrewsByLocation(map.getAttribute('alt'), brews)
    } else {
      lastClickedMap = undefined
      map.setAttribute('fill', 'transparent')
      printBrews(brews)
    }
  })
})

const sortBrewsByLocation = (name, brews) => {
  removeBrews()
  let sortedBrews = []
  brews.forEach(brew => {
    if (name == brew.location) sortedBrews.push(brew)
  })
  printBrews(sortedBrews)
  changeTitle(name)
}

newBrew('Rising Star', 'Downtown', 'Iced Mocha', 3, 'Delicious.')
newBrew('Pheonix', 'Westside', 'Hot Mocha', 2, 'Okay.')
newBrew('Duck Rabbit', 'Westside', 'Espresso', 3, 'Amazing.')
newBrew('Rising Star', 'Downtown', 'Coffee', 2, 'Not bad.')
newBrew('Pour', 'Downtown', 'Hot Mocha', 1, 'Too gritty.')
newBrew('Vintage', 'Eastside', 'Coffee', 2, 'Quite rich.')
newBrew('Starbucks', 'Eastside', 'Coffee', 1, 'Bland.')
printBrews(brews)
