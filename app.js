
// inital state: cards hidden, start button showing
// onStart: show cards, hide cards, start button hidden
// win state is when pairCount = 8, each time we match pairCount++ and clear the selection
// if match: pairCount++ and clear selection but keep colors visible score++
// if no match hide colors and score--

for (i = 0; i < 16; i++) {

    const base = document.createElement('div');
    base.setAttribute('class', 'background')
    document.getElementById("gameBoard").appendChild(base);
}

let selection = [];
let pairCount = 0;
let score = 0;
let scoreCard = document.createElement('div');
scoreCard.setAttribute('class', 'scoreCard');
document.getElementById('menu').appendChild(scoreCard);
scoreCard.innerText += `Score: ${score}`;


const gameFunctions = {
    pending: 'pending',
    playing: 'playing'
};

let gameState = gameFunctions.pending;


let unshuffled = ['AC3931', '58355E', 'f8961e', '43AA8B', '90BE6D', 'fedc8c', 'DCB8CB', 'da5d1a', 'AC3931', '58355E', 'f8961e', '43AA8B', '90BE6D', 'fedc8c', 'DCB8CB', 'da5d1a']


const startGame = () => {

}

const clickTile = (cls) => {

    console.log(`clicked tile ${cls.target.classList}`)

    // if you arent in a game or if youve already selected the tile etc then return

    if (
        cls.target.classList.contains('visible')
        || gameState === gameFunctions.pending
        || selection.length >= 2
    ) {
        return
    }

    gameState = gameFunctions.pending;
    selection.push(cls.target.className)

    // console.log(`this is your selection: ${selection}`)
    cls.target.classList.add('visible')

    gameState = gameFunctions.playing;

    if (selection.length < 2) return;

    const first = selection[0];
    const second = selection[1];
    let ifMatch = first === second;
    // console.log(ifMatch)
    // console.log(`${first}${second}`)

    if (!ifMatch) {
        // if no match hide the selected tiles and clear the selection after a second or two
        setTimeout(() => {
            gameState = gameFunctions.pending;
            Array.from(document.getElementsByClassName(`${selection[0]}`)).forEach(function (el) {
                el.classList.remove('visible');
            });
            Array.from(document.getElementsByClassName(`${selection[1]}`)).forEach(function (el) {
                el.classList.remove('visible');
            });
            selection = [];
            score--;
            update()
            console.log(score)
            gameState = gameFunctions.playing;
        }, 1000);

        return
    }

    // now only the matching selection remains in the function

    score += 2;
    update()
    pairCount++;
    selection = [];
}

const refresh = () => {
    let parent = document.getElementById('gameBoard');
    while (parent.hasChildNodes()) (
        parent.removeChild(parent.firstChild)
    )

    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value) // shuffled is now an array of hex codes

    for (shuffledCard of shuffled) {

        const tile = document.createElement('div');
        tile.setAttribute('class', 'tileBack')
        document.getElementById("gameBoard").appendChild(tile);

        const div = document.createElement("div");
        div.setAttribute('class', `c${shuffledCard}`)
        tile.appendChild(div);
        div.addEventListener('click', clickTile);
    }

    // show all tiles for 3 seconds and then hide

    // setTimeout(() => {

    gameState = gameFunctions.playing;
    // }, 3000);


}


const startUp = document.createElement('div');
startUp.setAttribute('class', 'startUp')
document.getElementById('menu').appendChild(startUp)
startUp.addEventListener('click', refresh);
startUp.innerText = 'Start'



// win condition is when pairCounter=8

let update = () => {
    // console.log(`${document.getElementsByClassName('scoreCard')}`)
    scoreCard.innerText = `Score: ${score}`
}