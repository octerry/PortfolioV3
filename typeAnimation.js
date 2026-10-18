// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ \‾‾\  /‾‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     |  \  \/  /
// | | | | | |        |  |    |  ___] |     / |     /   \    /
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \     |  |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\    |__|
// MADE ON EARTH BY HUMANS

const homescreenDescription = document.querySelector('#homescreen-description')
const homescreenSentence = 'Etudiant dans le Développement Web et les Innovations Informatiques'
let sentenceId = 0;

let letterInterval = window.setInterval(typeLetter, 50);

function typeLetter() {
    homescreenDescription.innerHTML += homescreenSentence[sentenceId]
    sentenceId += 1
    if (sentenceId >= homescreenSentence.length) {
        clearInterval(letterInterval)
    }
}