//select Elements from here, I kept the teams array because that can be confusing
var teamContainer = document.querySelector('.container')

var teams = setTeams(getTeamsArray())
var play = document.querySelector(".play")
var playing = document.querySelectorAll(".playing")
var spot1 = document.querySelector('.opp1')
var spot2 = document.querySelector('.opp2')
var vs = document.querySelector('.vs')
var win = document.querySelector('.winner')



//game states
var round = 1
var match = 0
var place = "player1"
var currentPlayers = []
var x = 0;
var winner
var rounds = createRounds(teams)

//function definitions
function toggle(elem, tog) {
  elem.classList.toggle(tog)
}

//This function puts the teams in the container div innerHTML 
function setTeams(teamsArray) {

  //Reset the containers InnerHTML so that all the teams are gone
  teamContainer.innerHTML = ''
  //Create a temp array so that it holds the removed elements from the holder array
  var temp = []
  var length = teamsArray.length - 1
  for (var i = length; i > (length - 8); i--) {
    var random = Math.floor(Math.random() * (i + 1))
    //Add the element to the teamContainer using InnerHTML and select the element by using the random number to grab from the teamsArray. Once you are done push the selected element into the temp array and remove the element from the teamsArray by using the function splice

    teamContainer.innerHTML += teamsArray[random]
    temp.push(teamsArray.splice(random, 1))

  }
  return document.querySelectorAll('.team')
}
//This simply returns an object of arrays to hold the places of the teams as the go through each round
function createRounds(teams) {
  return {
    round1: [
      { player1: teams[0], player2: teams[1], spot: "spot9" },
      { player1: teams[2], player2: teams[3], spot: "spot10" },
      { player1: teams[4], player2: teams[5], spot: "spot11" },
      { player1: teams[6], player2: teams[7], spot: "spot12" }
    ],
    round2: [
      { player1: "", player2: "", spot: "spot13" },
      { player1: "", player2: "", spot: "spot14" }
    ],
    round3: [
      { player1: "", player2: "", spot: "spot15" }
    ],
    round4: [
      { player1: "" }
    ]
  }
}
//This function should append the classes that will set each team in its appropriate spots
function setSpots(teams) {
  teams.forEach(function (team, index) {
    toggle(team, `spot${index + 1}`)
    //Use a forEach loop to loop over the teams array and pass in a function that calls the toggle function. The first parameter should be teams[index] and the second parameter should say `spot${index+1}`.
  })
  play.disabled = false
}

/*Function you need to create to finish this app:
  changePlayer()
  nextMatch()
  gameOver()
  returnToOriginal()

*/

// Function to change the Players who are playing
function changePlayer() {
  if (place == 'player1') {
    place = "player2"

  }
  else {
    place = "player1"
    x++
  }
  setPlayers()
}
//function to set up next match
function nextMatch() {
  round++
  match = 0
  changePlayer()
  return
}
//When all games are played then return declare the game
function gameOver() {
  play.disabled = true
  playing.forEach(function (p) {
    toggle(p, 'hide')
  })
  toggle(vs, 'hide')
  toggle(win, 'hide')
  returnToOriginal()
}
// Set up a new player game to be played
function returnToOriginal() {
  setTimeout(function () {
    toggle(win, 'hide')
    toggle(vs, 'hide')
    spot1.textContent = ""
    spot2.textContent = ""
    round = 1
    match = 0
    place = "player1"
    x = 0
    currentPlayers = []
    teams = setTeams(getTeamsArray())
    rounds = createRounds(teams)
    setSpots(teams)
    setPlayers()
    playing.forEach(function (p) {
      toggle(p, 'hide')

    })
  }, 3000)
}

//This function set the players who will be currently playing
function setPlayers() {
  currentPlayers = [rounds[`round${round}`][match].player1, rounds[`round${round}`][match].player2]
  playing.forEach(function (p, i) {
    //Uncomment below when the teams are set on the screen
    p.textContent = currentPlayers[i].dataset.name
  })
}

function changeMatch() {

  if (round == 3) {
    gameOver()
    return
  }
  // If round equal 3 call gameOver function then return. 
  // If the last match of the round is played call the nextMatch(), set x back to 0, then return
  if (match >= rounds[`round${round}`].length - 1) {
    nextMatch()
    x = 0
    return
  }
  // At the bottom of the function, Increment match then call the changePlayer() function
  match++
  changePlayer()
}

//changes the position of the winner
function moveTeam(winner, spot) {
  var oldSpot = winner.classList[1]
  //Change the winner from its "oldSpot" to its new spot.
  toggle(winner, oldSpot)
  toggle(winner, spot)
}

//sets the scores 
function playGame(round, match, place) {
  var score1 = Math.random()
  var score2 = Math.random()

  if (score1 > score2) {
    //Set the scores to their appropriate places and then move the winner(team1) into the next round
    spot1.textContent = Math.ceil(score1 * 7)
    spot2.textContent = Math.ceil(score2 * 7) - 1
    rounds[`round${round + 1}`][x][place] = rounds[`round${round}`][match].player1
  }
  if (score1 < score2) {
    //Set the scores to their appropriate places and then move the winner(team2) into the next round
    spot2.textContent = Math.ceil(score2 * 7)
    spot1.textContent = Math.ceil(score1 * 7) - 1
    rounds[`round${round + 1}`][x][place] = rounds[`round${round}`][match].player2
  }

  //return the winner
  return rounds[`round${round + 1}`][x][place]
}

//Event Listeners
play.addEventListener("click", function (e) {
  winner = playGame(round, match, place)
  moveTeam(winner, rounds[`round${round}`][match][`spot`])
  changeMatch()
})

setSpots(teams)
setPlayers()