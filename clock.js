// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ \‾‾\  /‾‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     |  \  \/  /
// | | | | | |        |  |    |  ___] |     / |     /   \    /
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \     |  |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\    |__|
// MADE ON EARTH BY HUMANS

const dayCount = document.querySelector('#day-count')
const hourCount = document.querySelector('#hour-count')

const startDate = new Date("September 14, 2025 08:00:00 GMT+02:00");
const todayDate = Date.now()

let secondsDifference = (( todayDate - startDate.getTime() ) / 1000)
let years = 0
let days = 0
let hours = 0
let minutes = 0

calculateTime()
display()
displayAbove()

let timeInterval = window.setInterval(updateTime, 1000);


function displayAbove() {
    dayCount.innerHTML = "Depuis ";

    if (years > 1) dayCount.innerHTML += years + " ans, "
    else dayCount.innerHTML += years + " an, "

    if (days > 1) dayCount.innerHTML += days + " jours,"
    else hourCount.innerHTML += days + " jour,"
}

function display() {
    hourCount.innerHTML = "";

    if (hours > 1) hourCount.innerHTML += hours + " heures, "
    else hourCount.innerHTML += hours + " heure, "

    if (minutes > 1) hourCount.innerHTML += minutes + " minutes et "
    else hourCount.innerHTML += minutes + " minute et "

    hourCount.innerHTML += secondsDifference + " secondes"
}

function calculateTime() {
    years = Math.round(secondsDifference / 31_536_000) // 31_536_000 = 60 * 60 * 24 * 365
    secondsDifference %= 31_536_000

    days = Math.round(secondsDifference / 86_400) // 86_400 = 60 * 60 * 24
    secondsDifference %= 86_400

    hours = Math.round(secondsDifference / 3_600) // 3_600 = 60 * 60
    secondsDifference %= 3_600

    minutes = Math.round(secondsDifference / 60)
    secondsDifference %= 60
    secondsDifference = Math.round(secondsDifference)
}

function updateTime() {
    secondsDifference += 1

    if (secondsDifference >= 60) {
        minutes += 1
        secondsDifference = 0

        if (minutes >= 60) {
            hours += 1
            minutes = 0

            if (hours >= 24) {
                days += 1
                hours = 0

                if (days >= 365) {
                    years += 1
                }

                displayAbove()
            }
        }
    }

    display()
}