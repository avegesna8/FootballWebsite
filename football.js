//const { get } = require('https');

// Global Variables
const apiUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams';
const nflTeams = []
chosenTeams = []
currentTeam = null
playerData = null
currentPlayer = null
player1Score = 0
player2Score = 0
currentUser = "Player 1"
computerMode = false
const player1Team = {
    QB: null,        
    RB: null,        
    TE: null,        
    WR: null,        
    OLine: null,     
    Defense: null,
    QBOverall: null,
    RBOverall: null,
    TEOverall: null,
    WROverall: null,
    OLineOverall: null,
    DefenseOverall: null    
};
const player2Team = {
    QB: null,        
    RB: null,        
    TE: null,        
    WR: null,        
    OLine: null,     
    Defense: null,
    QBOverall: null,
    RBOverall: null,
    TEOverall: null,
    WROverall: null,
    OLineOverall: null,
    DefenseOverall: null 
};
const computerTeam = {
  QB: null,        
  RB: null,        
  TE: null,        
  WR: null,        
  OLine: null,     
  Defense: null,
  QBOverall: null,
  RBOverall: null,
  TEOverall: null,
  WROverall: null,
  OLineOverall: null,
  DefenseOverall: null    
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to fetch NFL teams from the API
async function fetchNFLTeams() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch NFL teams');
        }

        const data = await response.json();
        
        // Extract team data
        const teamData = data.sports[0].leagues[0].teams.map(team => ({
            id: team.team.id,
            abbreviation: team.team.abbreviation,
            displayName: team.team.displayName,
            location: team.team.location,
            color: team.team.color,
            imageUrl: team.team.logos[0].href
        }));

        teamData.forEach(team => {
            nflTeams.push(team.displayName)
        });

        return teamData;
    } catch (error) {
        console.error(error);
    }
}

//Print Out NFL Teams
function printNFLTeams() {
    for (let i = 0; i < nflTeams.length; i++) {
        console.log(nflTeams[i])
    }
}

//Retrieve and Print out Random NFL Team
async function getRandomTeam() {
    await fetchNFLTeams()
    // Filter out elements from nflTeams that are not present in choosenTeams
    teamsRemaining = nflTeams.filter(element => !chosenTeams.includes(element));

    // Check if there are elements left after filtering
    if (teamsRemaining.length === 0) {
        return null; // Return null if no elements are left
    }

    // Get a random index within teamsRemaning
    const randomIndex = Math.floor(Math.random() * teamsRemaining.length);

    // Return the random element
    return teamsRemaining[randomIndex];

}

//Display Random Teams and Adds it to Chosen Teams
async function displayTeam() {
    currentTeam = await getRandomTeam()
    chosenTeams.push(currentTeam)
    document.getElementById("teamLogo").style.display = "inline-block"
    //const teamLogo = document.getElementById("teamLogo");
    teamData =  await fetchNFLTeams()
    team = teamData.find(team => team.displayName === currentTeam);
    teamLogo.src = team.imageUrl
    
    document.getElementById("team").textContent = currentTeam

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to handle player 1's choice
async function choosePosition1(position) {
    teamData =  await fetchNFLTeams()

    nflData = await depthChart()
    
    
    
    console.log(currentTeam)

    
    team = teamData.find(team => team.displayName === currentTeam);
    
    playerName = null
    if (team) {
        if (position === "QB") {
            currentPlayer = nflData[currentTeam]["QB"]
            overall = nflData[currentTeam]["QBOverall"]
            player1Team.QB = currentPlayer
            player1Team.QBOverall = parseInt(overall)
            document.getElementById("QB1").textContent = currentPlayer
            document.getElementById("QB1Overall").textContent = overall
            disablePlayer1Choices();
            document.getElementById("pickTeam").disabled = false;
        } else if (position === "RB") {
          
            currentPlayer = nflData[currentTeam]["RB"]
            overall = nflData[currentTeam]["RBOverall"]
            player1Team.RB = currentPlayer
            player1Team.RBOverall = parseInt(overall)
            document.getElementById("RB1").textContent = currentPlayer
            document.getElementById("RB1Overall").textContent = overall
            disablePlayer1Choices();
            document.getElementById("pickTeam").disabled = false;
            
        } else if (position === "WR") {
          
            currentPlayer = nflData[currentTeam]["WR"]
            overall = nflData[currentTeam]["WROverall"]
            player1Team.WR = currentPlayer
            player1Team.WROverall = parseInt(overall)
            document.getElementById("WR1").textContent = currentPlayer
            document.getElementById("WR1Overall").textContent = overall
            disablePlayer1Choices();
            document.getElementById("pickTeam").disabled = false;
            
        } else if (position === "TE") {
          
            currentPlayer = nflData[currentTeam]["TE"]
            overall = nflData[currentTeam]["TEOverall"]
            player1Team.TE = currentPlayer
            player1Team.TEOverall = parseInt(overall)
            document.getElementById("TE1").textContent = currentPlayer
            document.getElementById("TE1Overall").textContent = overall
            disablePlayer1Choices();
            document.getElementById("pickTeam").disabled = false;
            
        } else if (position === "OLine") {
          
          currentPlayer = nflData[currentTeam]["OLine"]
          rating = nflData[currentTeam]["OLineOverall"]
          number = ratingToNumber(rating)
          player1Team.OLine = currentPlayer
          player1Team.OLineOverall = number
          document.getElementById("OLine1").textContent = currentPlayer
          document.getElementById("OLine1Overall").textContent = rating
          disablePlayer1Choices();
          document.getElementById("pickTeam").disabled = false;
          
        } else if (position === "Defense") {
          
          currentPlayer = nflData[currentTeam]["Defense"]
          rating = nflData[currentTeam]["DefenseOverall"]
          number = ratingToNumber(rating)
          player1Team.Defense = currentPlayer
          player1Team.DefenseOverall = number
          document.getElementById("Defense1").textContent = currentPlayer
          document.getElementById("Defense1Overall").textContent = rating
          disablePlayer1Choices();
          document.getElementById("pickTeam").disabled = false;
          
        } else {
          document.getElementById("Defense1").textContent = "ERROR"
          //ERROR
        }
              
    } else {
        console.error(`Team '${currentTeam}' not found.`);
        return null;
    }

    if (computerMode) {
      currentUser = "Computer"
      //document.getElementById("RB1").textContent = "Computer Mode Activated"
      const button = document.getElementById("pickTeam")
      button.click();
    } else {
      currentUser = "Player 2"
    }
     

}

function ratingToNumber(rating) {
    number = 0
    if (rating === "A+") {
      number = 100
    } else if (rating == "A-") {
      number = 95
    } else if (rating == "B+") {
      number = 90
    } else if (rating == "B-") {
      number = 85
    } else if (rating == "C+") {
      number = 80
    } else if (rating == "C-") {
      number = 75
    } else {
      //rating == "F+"
      number = 70
    }
    return number
}

// Function to check if all positions are selected for a player 1
function allPlayer1PositionsSelected() {
  for (const position in player1Team) {
    if (player1Team[position] === null) {
        return false; // At least one position is not selected
    }
  }
  return true; // All positions are selected
}

// Function to check if all positions are selected for player 2
function allPlayer2PositionsSelected() {
  for (const position in player2Team) {
    if (player2Team[position] === null) {
        return false; // At least one position is not selected
    }
  }
  return true; // All positions are selected
}

// Function to handle player 2's choice
async function choosePosition2(position) {
  
  teamData =  await fetchNFLTeams()
  
  
  nflData = await depthChart()

  
  team = teamData.find(team => team.displayName === currentTeam);
  
  playerName = null
  if (team) {
      if (position === "QB") {
          currentPlayer = nflData[currentTeam]["QB"]
          overall = nflData[currentTeam]["QBOverall"]
          player2Team.QBOverall = parseInt(overall)
          player2Team.QB = currentPlayer
          document.getElementById("QB2").textContent = currentPlayer
          document.getElementById("QB2Overall").textContent = overall
          disablePlayer2Choices();
          document.getElementById("pickTeam").disabled = false;
      } else if (position === "RB") {
          currentPlayer = nflData[currentTeam]["RB"]
          overall = nflData[currentTeam]["RBOverall"]
          player2Team.RBOverall = parseInt(overall)
          player2Team.RB = currentPlayer
          document.getElementById("RB2").textContent = currentPlayer
          document.getElementById("RB2Overall").textContent = overall
          disablePlayer2Choices();
          document.getElementById("pickTeam").disabled = false;
      } else if (position === "WR") {
        
         currentPlayer = nflData[currentTeam]["WR"]
         overall = nflData[currentTeam]["WROverall"]
          player2Team.WR = currentPlayer
          player2Team.WROverall = parseInt(overall)
          document.getElementById("WR2").textContent = currentPlayer
          document.getElementById("WR2Overall").textContent = overall
          disablePlayer2Choices();
          
          document.getElementById("pickTeam").disabled = false;
          
      } else if (position === "TE") {
        
          currentPlayer = nflData[currentTeam]["TE"]
          overall = nflData[currentTeam]["TEOverall"]
          player2Team.TE = currentPlayer
          player2Team.TEOverall = parseInt(overall)
          document.getElementById("TE2").textContent = currentPlayer
          document.getElementById("TE2Overall").textContent = overall
          disablePlayer2Choices();
          document.getElementById("pickTeam").disabled = false;
          
      } else if (position === "OLine") {
        
          currentPlayer = nflData[currentTeam]["OLine"]
          rating = nflData[currentTeam]["OLineOverall"]
          number = ratingToNumber(rating)
          player2Team.OLine = currentPlayer
          player2Team.OLineOverall = number
          document.getElementById("OLine2").textContent = currentPlayer
          document.getElementById("OLine2Overall").textContent = rating
          disablePlayer2Choices();
          document.getElementById("pickTeam").disabled = false;
          
      } else if (position === "Defense") {
        
          currentPlayer = nflData[currentTeam]["Defense"]
          rating = nflData[currentTeam]["DefenseOverall"]
          number = ratingToNumber(rating)
          player2Team.Defense = currentPlayer
          player2Team.DefenseOverall = number
          document.getElementById("Defense2").textContent = currentPlayer
          document.getElementById("Defense2Overall").textContent = rating
          disablePlayer2Choices();
          document.getElementById("pickTeam").disabled = false;
          
      } else {
        //ERROR
      }
      
            
  } else {
      console.error(`Team '${currentTeam}' not found.`);
      
      return null;
  }
  currentUser = "Player 1"
  if (allPlayer1PositionsSelected && allPlayer2PositionsSelected()) {
    endGame();
  }

}

//Function to Rest Chosen Teams Back to Every NFL Team
function resetTeams() {
    chosenTeams = nflTeams
}

async function disablePlayer1Choices() {
  document.getElementById("chooseQB1").disabled = true;
  document.getElementById("chooseRB1").disabled = true;
  document.getElementById("chooseWR1").disabled = true;
  document.getElementById("chooseTE1").disabled = true;
  document.getElementById("chooseOLine1").disabled = true;
  document.getElementById("chooseDefense1").disabled = true;
  
}

async function disablePlayer2Choices() {
  document.getElementById("chooseQB2").disabled = true;
  document.getElementById("chooseRB2").disabled = true;
  document.getElementById("chooseWR2").disabled = true;
  document.getElementById("chooseTE2").disabled = true;
  document.getElementById("chooseOLine2").disabled = true;
  document.getElementById("chooseDefense2").disabled = true;
  
}
async function enablePlayer2Choices() {
  document.getElementById("chooseQB2").disabled = false;
  document.getElementById("chooseRB2").disabled = false;
  document.getElementById("chooseWR2").disabled = false;
  document.getElementById("chooseTE2").disabled = false;
  document.getElementById("chooseOLine2").disabled = false;
  document.getElementById("chooseDefense2").disabled = false;
}

async function enablePlayer1Choices() {
  document.getElementById("chooseQB1").disabled = false;
  document.getElementById("chooseRB1").disabled = false;
  document.getElementById("chooseWR1").disabled = false;
  document.getElementById("chooseTE1").disabled = false;
  document.getElementById("chooseOLine1").disabled = false;
  document.getElementById("chooseDefense1").disabled = false;
}


document.addEventListener("DOMContentLoaded", function() {
    disablePlayer1Choices();
    disablePlayer2Choices();
});

async function choosePositionComputer() {
  proceed = false
  teamData = await fetchNFLTeams()
  nflData = await depthChart()
  setTimeout(() => {
  
    team = teamData.find(team => team.displayName === currentTeam);
    if (!team) {
      document.getElementById("RB1").textContent = "ERROR"
    }
  
    playerName = null
    
    //document.getElementById("RB1").textContent = currentTeam
    qbOverall = 0
    rbOverall = 0
    wrOverall = 0
    teOverall = 0
    oLineOverall = 0
    defenseOverall = 0

    if (computerTeam.QB == null) {
      qbOverall = parseInt(nflData[currentTeam]["QBOverall"])
    }
    if (computerTeam.RB == null) {
      rbOverall = parseInt(nflData[currentTeam]["RBOverall"])
    }
    if (computerTeam.WR == null) {
      wrOverall = parseInt(nflData[currentTeam]["WROverall"])    
    }
    if (computerTeam.TE == null) {
      teOverall = parseInt(nflData[currentTeam]["TEOverall"])   
     }
    if (computerTeam.OLine == null) {
      oLineOverall = ratingToNumber(nflData[currentTeam]["OLineOverall"])
    }
    if (computerTeam.Defense == null) {
      defenseOverall = ratingToNumber(nflData[currentTeam]["DefenseOverall"])
    }
    
 
    max = Math.max(qbOverall, rbOverall, wrOverall, teOverall, oLineOverall, defenseOverall);
    //document.getElementById("RB1").textContent = max.toString()

    if (qbOverall == max && computerTeam.QB == null) {
      //document.getElementById("RB1").textContent = "QB"
      currentPlayer = nflData[currentTeam]["QB"]
      computerTeam.QBOverall = qbOverall
      computerTeam.QB = currentPlayer
      document.getElementById("QBComp").textContent = currentPlayer
      document.getElementById("QBCompOverall").textContent = qbOverall
      // document.getElementById("pickTeam").disabled = false;
      proceed = true
    } else if (rbOverall == max && computerTeam.RB == null) {
      //document.getElementById("RB1").textContent = "RB"
      currentPlayer = nflData[currentTeam]["RB"]
      computerTeam.RBOverall = rbOverall
      computerTeam.RB = currentPlayer
      document.getElementById("RBComp").textContent = currentPlayer
      document.getElementById("RBCompOverall").textContent = rbOverall
      // document.getElementById("pickTeam").disabled = false;
      proceed = true
    } else if (wrOverall == max && computerTeam.WR == null) {
      //document.getElementById("RB1").textContent = "WR"
      currentPlayer = nflData[currentTeam]["WR"]
      computerTeam.WROverall = wrOverall
      computerTeam.WR = currentPlayer
      document.getElementById("WRComp").textContent = currentPlayer
      document.getElementById("WRCompOverall").textContent = wrOverall
      // document.getElementById("pickTeam").disabled = false;
      proceed = true
    } else if (teOverall ==  max && computerTeam.TE == null) {
      //document.getElementById("RB1").textContent = "TE"
      currentPlayer = nflData[currentTeam]["TE"]
      computerTeam.TEOverall = teOverall
      computerTeam.TE = currentPlayer
      document.getElementById("TEComp").textContent = currentPlayer
      document.getElementById("TECompOverall").textContent = teOverall
      // document.getElementById("pickTeam").disabled = false;
      proceed = true
    } else if (oLineOverall == max && computerTeam.OLine == null) {
      //document.getElementById("RB1").textContent = "OLine"
      currentPlayer = nflData[currentTeam]["OLine"]
      computerTeam.OLineOverall = oLineOverall
      computerTeam.OLine = currentPlayer
      document.getElementById("OLineComp").textContent = currentPlayer
      document.getElementById("OLineCompOverall").textContent = nflData[currentTeam]["OLineOverall"]
      // document.getElementById("pickTeam").disabled = false;
      proceed = true
    } else if (defenseOverall == max && computerTeam.Defense == null) {
      //document.getElementById("RB1").textContent = "Defense"
      currentPlayer = nflData[currentTeam]["Defense"]
      computerTeam.DefenseOverall = defenseOverall
      computerTeam.Defense = currentPlayer
      document.getElementById("DefenseComp").textContent = currentPlayer
      document.getElementById("DefenseCompOverall").textContent = nflData[currentTeam]["DefenseOverall"]
      proceed = true
      // document.getElementById("pickTeam").disabled = false;
    } else {

      //ERROR
      document.getElementById("RB1").textContent = "ERROR"
      proceed = true
    }
    currentUser = "Player 1"
    if (proceed) {
      if (allComputerPositionsSelected()) {
        //document.getElementById("RB1").textContent = "END"
        endGame();
      } else {
        document.getElementById("pickTeam").disabled = false;
      }
    }
  }, 0);
  
  

}

// Function to check if all positions are selected for Computer
function allComputerPositionsSelected() {
  // if (computerTeam.QB != null && computerTeam.RB != null && computerTeam.TE != null && computerTeam.WR != null
  //   && computerTeam.OLine != null && computerTeam.Defense != null && computerTeam.QBOverall != null &&
  //   computerTeam.RBOverall != null && computerTeam.TEOverall != null && computerTeam.WROverall != null &&
  //   computerTeam.OLine != null && computerTeam.DefenseOverall != null) {
  //       return true
  //   } else {
  //     return false
  //   }


  for (const position in computerTeam) {
    if (computerTeam[position] === null) {
        return false; // At least one position is not selected
    }
  }
  return true; // All positions are selected
}

// Get references to the initial screen and the main content divs
var initialScreen = document.getElementById("initialScreen");
var mainContent = document.getElementById("mainContent");

// Get reference to the Start button
//var startButton = document.getElementById("startButton");


// // Add event listener to the Start button
// startButton.addEventListener("click", function() {
//     // Hide the initial screen
//     initialScreen.style.display = "none";
//     // Show the main content
//     mainContent.style.display = "block";
// });



//document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners to the buttons
    document.getElementById("chooseQB1").addEventListener("click", () => {
      choosePosition1("QB")
    });
    
    document.getElementById("chooseQB2").addEventListener("click", () => {
      choosePosition2("QB")
    });

    document.getElementById("chooseRB1").addEventListener("click", () => {
      choosePosition1("RB")
    });
    
    document.getElementById("chooseRB2").addEventListener("click", () => {
      choosePosition2("RB")
    });
    

    document.getElementById("chooseWR1").addEventListener("click", () => {
      choosePosition1("WR")
    });
    
    document.getElementById("chooseWR2").addEventListener("click", () => {
      choosePosition2("WR")
    });

    document.getElementById("chooseTE1").addEventListener("click", () => {
      choosePosition1("TE")
    });
    
    document.getElementById("chooseTE2").addEventListener("click", () => {
      choosePosition2("TE")
    });

    document.getElementById("chooseOLine1").addEventListener("click", () => {
      choosePosition1("OLine")
    });
    
    document.getElementById("chooseOLine2").addEventListener("click", () => {
      choosePosition2("OLine")
    });
    document.getElementById("chooseDefense1").addEventListener("click", () => {
      choosePosition1("Defense")
    });
    
    document.getElementById("chooseDefense2").addEventListener("click", () => {
      choosePosition2("Defense")
    });

    document.getElementById("twoPlayer").addEventListener("click", () => {
      // Hide the initial screen
      initialScreen.style.display = "none";
      // Show the main content
      mainContent.style.display = "block";
      document.getElementById("ComputerTeam").style.display = "none"
      document.getElementById("computerMode").style.display = "none"
    })

    document.getElementById("singlePlayer").addEventListener("click", () => {
      // Hide the initial screen
      initialScreen.style.display = "none";
      // Show the main content
      mainContent.style.display = "block";
      document.getElementById("PlayerB").style.display = "none"
      activateComputerMode()
    });

    document.getElementById("playAgain").addEventListener("click", () => {
      restartGame()
    });

    function activateComputerMode() {
      computerMode = true
      document.getElementById("computerMode").style.display= "none"
    }
    
    
    document.getElementById("pickTeam").addEventListener("click", () => {
      if (!computerMode) {
        document.getElementById("computerMode").style.display= "none"
      }
      if (currentUser == "Player 1") {
        enablePlayer1Choices();
        disablePlayer2Choices();
        if (player1Team.QB !== null) {
          document.getElementById("chooseQB1").disabled = true;
        }
        if (player1Team.RB !== null) {
          document.getElementById("chooseRB1").disabled = true;
        }
        if (player1Team.WR !== null) {
          document.getElementById("chooseWR1").disabled = true;
        }
        if (player1Team.TE !== null) {
          document.getElementById("chooseTE1").disabled = true;
        }
        if (player1Team.OLine !== null) {
          document.getElementById("chooseOLine1").disabled = true;
        }
        if (player1Team.Defense !== null) {
          document.getElementById("chooseDefense1").disabled = true;
        }
        callDisplayTeam();
        disableTeamButton();

      } else if (currentUser == "Player 2") {
        enablePlayer2Choices();
        disablePlayer1Choices();
        if (player2Team.QB !== null) {
          document.getElementById("chooseQB2").disabled = true;
        }
        if (player2Team.RB !== null) {
          document.getElementById("chooseRB2").disabled = true;
        }
        if (player2Team.WR !== null) {
          document.getElementById("chooseWR2").disabled = true;
        }
        if (player2Team.TE !== null) {
          document.getElementById("chooseTE2").disabled = true;
        }
        if (player2Team.OLine !== null) {
          document.getElementById("chooseOLine2").disabled = true;
        }
        if (player2Team.Defense !== null) {
          document.getElementById("chooseDefense2").disabled = true;
        }
        callDisplayTeam();
        disableTeamButton();
      } else {
        disablePlayer1Choices();
        callDisplayTeam();
        disableTeamButton();
        choosePositionComputer();
        
      }

    });
  
async function callDisplayTeam() {
  await displayTeam();
}
    
async function disableTeamButton() {
  document.getElementById("pickTeam").disabled = true;
}
async function enableTeamButton() {
  document.getElementById("pickTeam").disabled = false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END Game
function endGame() {
  if (computerMode) {
    disableTeamButton();
    document.getElementById("playAgain").style.display = "block";
    totalPlayer1Rating = player1Team.QBOverall + player1Team.RBOverall + player1Team.WROverall + player1Team.TEOverall + player1Team.OLineOverall + player1Team.DefenseOverall
    totalComputerRating = computerTeam.QBOverall + computerTeam.RBOverall + computerTeam.WROverall + computerTeam.TEOverall + computerTeam.OLineOverall + computerTeam.DefenseOverall
    if (totalPlayer1Rating > totalComputerRating) {
      document.getElementById("Winner").textContent = "Player A"
      player1Score += 1
      document.getElementById("player1Score").textContent = player1Score.toString()
    } else if (totalPlayer1Rating < totalComputerRating) {
      document.getElementById("Winner").textContent = "Player B".toString()
      player2Score += 1
      document.getElementById("player2Score").textContent = player2Score
    } else {
      //Tie Game
      document.getElementById("Winner").textContent = "Tie"
    }
  } else {
    disableTeamButton();
    document.getElementById("playAgain").style.display = "block";
    totalPlayer1Rating = player1Team.QBOverall + player1Team.RBOverall + player1Team.WROverall + player1Team.TEOverall + player1Team.OLineOverall + player1Team.DefenseOverall
    totalPlayer2Rating = player2Team.QBOverall + player2Team.RBOverall + player2Team.WROverall + player2Team.TEOverall + player2Team.OLineOverall + player2Team.DefenseOverall
    if (totalPlayer1Rating > totalPlayer2Rating) {
      document.getElementById("Winner").textContent = "Player A"
      player1Score += 1
      document.getElementById("player1Score").textContent = player1Score.toString()
    } else if (totalPlayer1Rating < totalPlayer2Rating) {
      document.getElementById("Winner").textContent = "Player B".toString()
      player2Score += 1
      document.getElementById("player2Score").textContent = player2Score
    } else {
      //Tie Game
      document.getElementById("Winner").textContent = "Tie"
    }
  }
    
}

function restartGame() {
  document.getElementById("playAgain").style.display = "none";
  enableTeamButton();
  chosenTeams = []
  currentTeam = null
  playerData = null
  currentPlayer = null
  currentUser = "Player 1"
  player1Team.QB = null
  player1Team.RB = null
  player1Team.TE = null
  player1Team.WR = null
  player1Team.OLine = null
  player1Team.Defense = null
  player1Team.QBOverall = null
  player1Team.RBOverall = null
  player1Team.TEOverall = null
  player1Team.WROverall = null
  player1Team.OLineOverall = null
  player1Team.DefenseOverall = null

  document.getElementById("QB1").textContent = ""
  document.getElementById("QB1Overall").textContent = ""
  document.getElementById("RB1").textContent = ""
  document.getElementById("RB1Overall").textContent = ""
  document.getElementById("WR1").textContent = ""
  document.getElementById("WR1Overall").textContent = ""
  document.getElementById("TE1").textContent = ""
  document.getElementById("TE1Overall").textContent = ""
  document.getElementById("OLine1").textContent = ""
  document.getElementById("OLine1Overall").textContent = ""
  document.getElementById("Defense1").textContent = ""
  document.getElementById("Defense1Overall").textContent = ""

  if (!computerMode) {
    player2Team.QB = null
    player2Team.RB = null
    player2Team.TE = null
    player2Team.WR = null
    player2Team.OLine = null
    player2Team.Defense = null
    player2Team.QBOverall = null
    player2Team.RBOverall = null
    player2Team.TEOverall = null
    player2Team.WROverall = null
    player2Team.OLineOverall = null
    player2Team.DefenseOverall = null
  
    document.getElementById("QB2").textContent = ""
    document.getElementById("QB2Overall").textContent = ""
    document.getElementById("RB2").textContent = ""
    document.getElementById("RB2Overall").textContent = ""
    document.getElementById("WR2").textContent = ""
    document.getElementById("WR2Overall").textContent = ""
    document.getElementById("TE2").textContent = ""
    document.getElementById("TE2Overall").textContent = ""
    document.getElementById("OLine2").textContent = ""
    document.getElementById("OLine2Overall").textContent = ""
    document.getElementById("Defense2").textContent = ""
    document.getElementById("Defense2Overall").textContent = ""
  } else {
    computerTeam.QB = null
    computerTeam.RB = null
    computerTeam.TE = null
    computerTeam.WR = null
    computerTeam.OLine = null
    computerTeam.Defense = null
    computerTeam.QBOverall = null
    computerTeam.RBOverall = null
    computerTeam.TEOverall = null
    computerTeam.WROverall = null
    computerTeam.OLineOverall = null
    computerTeam.DefenseOverall = null
  
    document.getElementById("QBComp").textContent = ""
    document.getElementById("QBCompOverall").textContent = ""
    document.getElementById("RBComp").textContent = ""
    document.getElementById("RBCompOverall").textContent = ""
    document.getElementById("WRComp").textContent = ""
    document.getElementById("WRCompOverall").textContent = ""
    document.getElementById("TEComp").textContent = ""
    document.getElementById("TECompOverall").textContent = ""
    document.getElementById("OLineComp").textContent = ""
    document.getElementById("OLineCompOverall").textContent = ""
    document.getElementById("DefenseComp").textContent = ""
    document.getElementById("DefenseCompOverall").textContent = ""
  }

  document.getElementById("Winner").textContent = ""
}


async function depthChart() {
    const nflData = {
        "Buffalo Bills": {
          "QB": "Josh Allen",
          "RB": "James Cook",
          "WR": "Khalil Shakir",
          "TE": "Dalton Kincaid",
          "OLine": "Bills OLine",
          "Defense": "Bills Defense",
          "QBOverall": "94",
          "RBOverall": "75",
          "WROverall": "70",
          "TEOverall": "76",
          "OLineOverall": "B-",
          "DefenseOverall": "B+"
        },
        "Miami Dolphins": {
          "QB": "Tua Tagovailoa",
          "RB": "Raheem Mostert",
          "WR": "Tyreek Hill",
          "TE": "Jonnu Smith",
          "OLine": "Dolphins OLine",
          "Defense": "Dolphins Defense",
          "QBOverall": "83",
          "RBOverall": "79",
          "WROverall": "98",
          "TEOverall": "74",
          "OLineOverall": "C+",
          "DefenseOverall": "C+"
        },
        "New England Patriots": {
          "QB": "Drake Maye",
          "RB": "Rhamondre Stevenson",
          "WR": "Kendrick Bourne",
          "TE": "Hunter Henry",
          "OLine": "Patriots OLine",
          "Defense": "Patriors Defense",
          "QBOverall": "68",
          "RBOverall": "80",
          "WROverall": "78",
          "TEOverall": "81",
          "OLineOverall": "C-",
          "DefenseOverall": "A-"
        },
        "New York Jets": {
          "QB": "Aaron Rodgers",
          "RB": "Breece Hall",
          "WR": "Garrett Wilson",
          "TE": "Tyler Conklin",
          "OLine": "Jets OLine",
          "Defense": "Jets Defense",
          "QBOverall": "86",
          "RBOverall": "82",
          "WROverall": "84",
          "TEOverall": "78",
          "OLineOverall": "B+",
          "DefenseOverall": "A+"
        },
        "Baltimore Ravens": {
          "QB": "Lamar Jackson",
          "RB": "Derrick Henry",
          "WR": "Zay Flowers",
          "TE": "Mark Andrews",
          "OLine": "Ravens OLine",
          "Defense": "Ravnes Defense",
          "QBOverall": "91",
          "RBOverall": "94",
          "WROverall": "77",
          "TEOverall": "95",
          "OLineOverall": "B-",
          "DefenseOverall": "A+"
        },
        "Cincinnati Bengals": {
          "QB": "Joe Burrow",
          "RB": "Zack Moss",
          "WR": "Ja'Marr Chase",
          "TE": "Mike Gesicki",
          "OLine": "Bengals OLine",
          "Defense": "Bengals Defense",
          "QBOverall": "95",
          "RBOverall": "72",
          "WROverall": "94",
          "TEOverall": "81",
          "OLineOverall": "B+",
          "DefenseOverall": "C-"
        },
        "Cleveland Browns": {
          "QB": "Deshaun Watson",
          "RB": "Nick Chubb",
          "WR": "Amari Cooper",
          "TE": "David Njoku",
          "OLine": "Browns OLine",
          "Defense": "Browns Defense",
          "QBOverall": "78",
          "RBOverall": "97",
          "WROverall": "91",
          "TEOverall": "84",
          "OLineOverall": "A+",
          "DefenseOverall": "A+"
        },
        "Pittsburgh Steelers": {
          "QB": "Russell Wilson",
          "RB": "Najee Harris",
          "WR": "George Pickens",
          "TE": "Pat Freiermuth",
          "OLine": "Steelers OLine",
          "Defense": "Steelers Defense",
          "QBOverall": "77",
          "RBOverall": "83",
          "WROverall": "80",
          "TEOverall": "85",
          "OLineOverall": "C+",
          "DefenseOverall": "A+"
        },
        "Houston Texans": {
          "QB": "C.J. Stroud",
          "RB": "Joe Mixon",
          "WR": "Stefon Diggs",
          "TE": "Dalton Schultz",
          "OLine": "Texans OLine",
          "Defense": "Texans Defense",
          "QBOverall": "85",
          "RBOverall": "87",
          "WROverall": "96",
          "TEOverall": "82",
          "OLineOverall": "A-",
          "DefenseOverall": "B-"
        },
        "Indianapolis Colts": {
          "QB": "Anthony Richardson",
          "RB": "Jonathan Taylor",
          "WR": "Michael Pittman Jr.",
          "TE": "Kylen Granson",
          "OLine": "Colts OLine",
          "Defense": "Colts Defense",
          "QBOverall": "70",
          "RBOverall": "89",
          "WROverall": "85",
          "TEOverall": "68",
          "OLineOverall": "A-",
          "DefenseOverall": "C+"
        },
        "Jacksonville Jaguars": {
          "QB": "Trevor Lawrence",
          "RB": "Travis Etienne Jr.",
          "WR": "Christian Kirk",
          "TE": "Evan Engram",
          "OLine": "Jaguars OLine",
          "Defense": "Jaguars Defense",
          "QBOverall": "82",
          "RBOverall": "84",
          "WROverall": "85",
          "TEOverall": "84",
          "OLineOverall": "C+",
          "DefenseOverall": "B+"
        },
        "Tennessee Titans": {
          "QB": "Will Levis",
          "RB": "Tony Pollard",
          "WR": "Calvin Ridley",
          "TE": "Chigoziem Okonkwo",
          "OLine": "Titans OLine",
          "Defense": "Titans Defense",
          "QBOverall": "69",
          "RBOverall": "88",
          "WROverall": "85",
          "TEOverall": "71",
          "OLineOverall": "C-",
          "DefenseOverall": "C+"
        },
        "Denver Broncos": {
          "QB": "Bo Nix",
          "RB": "Javonte Williams",
          "WR": "Courtland Sutton",
          "TE": "Adam Trautman",
          "OLine": "Broncos OLine",
          "Defense": "Broncos Defense",
          "QBOverall": "68",
          "RBOverall": "82",
          "WROverall": "82",
          "TEOverall": "72",
          "OLineOverall": "B-",
          "DefenseOverall": "F+"
        },
        "Kansas City Chiefs": {
          "QB": "Patrick Mahomes",
          "RB": "Isiah Pacheco",
          "WR": "Rashee Rice",
          "TE": "Travis Kelce",
          "OLine": "Chiefs OLine",
          "Defense": "Chiefs Defense",
          "QBOverall": "99",
          "RBOverall": "80",
          "WROverall": "73",
          "TEOverall": "99",
          "OLineOverall": "A-",
          "DefenseOverall": "A+"
        },
        "Las Vegas Raiders": {
          "QB": "Aidan O'Connell",
          "RB": "Zamir White",
          "WR": "Davante Adams",
          "TE": "Brock Bowers",
          "OLine": "Raiders OLine",
          "Defense": "Raiders Defense",
          "QBOverall": "67",
          "RBOverall": "70",
          "WROverall": "97",
          "TEOverall": "73",
          "OLineOverall": "F+",
          "DefenseOverall": "A-"
        },
        "Los Angeles Chargers": {
          "QB": "Justin Herbert",
          "RB": "Gus Edwards",
          "WR": "Joshua Palmer",
          "TE": "Will Dissly",
          "OLine": "Chargers OLine",
          "Defense": "Chargers Defense",
          "QBOverall": "87",
          "RBOverall": "77",
          "WROverall": "78",
          "TEOverall": "77",
          "OLineOverall": "B+",
          "DefenseOverall": "C-"
        },
        "Dallas Cowboys": {
          "QB": "Dak Prescott",
          "RB": "Ezekiel Elliott",
          "WR": "CeeDee Lamb",
          "TE": "Jake Ferguson",
          "OLine": "Cowboys OLine",
          "Defense": "Cowboys Defense",
          "QBOverall": "87",
          "RBOverall": "70",
          "WROverall": "90",
          "TEOverall": "71",
          "OLineOverall": "B-",
          "DefenseOverall": "A+"
        },
        "New York Giants": {
          "QB": "Daniel Jones",
          "RB": "Devin Singletary",
          "WR": "Malik Nabers",
          "TE": "Darren Waller",
          "OLine": "Giants OLine",
          "Defense": "Giants Defense",
          "QBOverall": "75",
          "RBOverall": "80",
          "WROverall": "68",
          "TEOverall": "86",
          "OLineOverall": "C+",
          "DefenseOverall": "C-"
        },
        "Philadelphia Eagles": {
          "QB": "Jalen Hurts",
          "RB": "Saquon Barkley",
          "WR": "A.J. Brown",
          "TE": "Dallas Goedert",
          "OLine": "Eagles OLine",
          "Defense": "Eagles Defense",
          "QBOverall": "88",
          "RBOverall": "93",
          "WROverall": "91",
          "TEOverall": "89",
          "OLineOverall": "A+",
          "DefenseOverall": "C+"
        },
        "Washington Commanders": {
          "QB": "Jayden Daniels",
          "RB": "Austin Ekeler",
          "WR": "Terry McLaurin",
          "TE": "Zach Ertz",
          "OLine": "Commanders OLine",
          "Defense": "Commanders Defense",
          "QBOverall": "71",
          "RBOverall": "89",
          "WROverall": "92",
          "TEOverall": "83",
          "OLineOverall": "F+",
          "DefenseOverall": "F+"
        },
        "Chicago Bears": {
            "QB": "Caleb Williams",
            "RB": "D'Andre Swift",
            "WR": "DJ Moore",
            "TE": "Cole Kmet",
            "OLine": "Bears OLine",
            "Defense": "Bears Defense",
            "QBOverall": "73",
            "RBOverall": "81",
            "WROverall": "86",
            "TEOverall": "79",
            "OLineOverall": "A-",
            "DefenseOverall": "B-"
          },
          "Detroit Lions": {
            "QB": "Jared Goff",
            "RB": "David Montgomery",
            "WR": "Amon-Ra St. Brown",
            "TE": "Sam LaPorta",
            "OLine": "Lions OLine",
            "Defense": "Lions Defense",
            "QBOverall": "80",
            "RBOverall": "82",
            "WROverall": "87",
            "TEOverall": "70",
            "OLineOverall": "A+",
            "DefenseOverall": "B+"
          },
          "Green Bay Packers": {
            "QB": "Jordan Love",
            "RB": "Josh Jacobs",
            "WR": "Christian Watson",
            "TE": "Luke Musgrave",
            "OLine": "Packers OLine",
            "Defense": "Packers Defense",
            "QBOverall": "79",
            "RBOverall": "95",
            "WROverall": "77",
            "TEOverall": "66",
            "OLineOverall": "A+",
            "DefenseOverall": "B-"
          },
          "Minnesota Vikings": {
            "QB": "Sam Darnold",
            "RB": "Aaron Jones",
            "WR": "Justin Jefferson",
            "TE": "T.J. Hockenson",
            "OLine": "Vikings OLine",
            "Defense": "Vikings Defense",
            "QBOverall": "71",
            "RBOverall": "88",
            "WROverall": "99",
            "TEOverall": "90",
            "OLineOverall": "A-",
            "DefenseOverall": "B+"
          },
          "Atlanta Falcons": {
            "QB": "Kirk Cousins",
            "RB": "Bijan Robinson",
            "WR": "Drake London",
            "TE": "Kyle Pitts",
            "OLine": "Falcons OLine",
            "Defense": "Falcons Defense",
            "QBOverall": "84",
            "RBOverall": "81",
            "WROverall": "80",
            "TEOverall": "87",
            "OLineOverall": "A+",
            "DefenseOverall": "B-"
          },
          "Carolina Panthers": {
            "QB": "Bryce Young",
            "RB": "Chuba Hubbard",
            "WR": "Diontae Johnson",
            "TE": "Tommy Tremble",
            "OLine": "Panthers OLine",
            "Defense": "Panthers Defense",
            "QBOverall": "74",
            "RBOverall": "75",
            "WROverall": "82",
            "TEOverall": "71",
            "OLineOverall": "C+",
            "DefenseOverall": "C-"
          },
          "New Orleans Saints": {
            "QB": "Derek Carr",
            "RB": "Alvin Kamara",
            "WR": "Chris Olave",
            "TE": "Juwan Johnson",
            "OLine": "Saints OLine",
            "Defense": "Saints Defense",
            "QBOverall": "78",
            "RBOverall": "86",
            "WROverall": "84",
            "TEOverall": "75",
            "OLineOverall": "C-",
            "DefenseOverall": "A-"
          },
          "Tampa Bay Buccaneers": {
            "QB": "Baker Mayfield",
            "RB": "Rachaad White",
            "WR": "Mike Evans",
            "TE": "Cade Otton",
            "OLine": "Buccaneers OLine",
            "Defense": "Buccaneers Defense",
            "QBOverall": "72",
            "RBOverall": "75",
            "WROverall": "90",
            "TEOverall": "73",
            "OLineOverall": "B+",
            "DefenseOverall": "B+"
          },
          "Arizona Cardinals": {
            "QB": "Kyler Murray",
            "RB": "James Conner",
            "WR": "Marvin Harrison Jr.",
            "TE": "Trey McBride",
            "OLine": "Cardinals OLine",
            "Defense": "Cardinals Defense",
            "QBOverall": "79",
            "RBOverall": "77",
            "WROverall": "74",
            "TEOverall": "74",
            "OLineOverall": "C-",
            "DefenseOverall": "C-"
          },
          "Los Angeles Rams": {
            "QB": "Matthew Stafford",
            "RB": "Kyren Williams",
            "WR": "Cooper Kupp",
            "TE": "Tyler Higbee",
            "OLine": "Rams OLine",
            "Defense": "Rams Defense",
            "QBOverall": "80",
            "RBOverall": "75",
            "WROverall": "96",
            "TEOverall": "80",
            "OLineOverall": "B+",
            "DefenseOverall": "B-"
          },
          "San Francisco 49ers": {
            "QB": "Brock Purdy",
            "RB": "Christian McCaffrey",
            "WR": "Deebo Samuel",
            "TE": "George Kittle",
            "OLine": "49ers OLine",
            "Defense": "49ers Defense",
            "QBOverall": "80",
            "RBOverall": "96",
            "WROverall": "89",
            "TEOverall": "96",
            "OLineOverall": "B-",
            "DefenseOverall": "A+"
          },
          "Seattle Seahawks": {
            "QB": "Geno Smith",
            "RB": "Kenneth Walker III",
            "WR": "DK Metcalf",
            "TE": "Noah Fant",
            "OLine": "Seahawks OLine",
            "Defense": "Seahawks Defense",
            "QBOverall": "81",
            "RBOverall": "87",
            "WROverall": "88",
            "TEOverall": "78",
            "OLineOverall": "C-",
            "DefenseOverall": "C+"
          }
      };
    return nflData
}


async function readFile() {
  const fs = require('fs');

  // Path to your CSV file
  const filePath = '/Users/abhinnvegesna/Desktop/Football Game Website/maddennfl24fullplayerratings.csv';

  return new Promise((resolve, reject) => {
    // Read the CSV file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            reject(err); // Reject the promise if there's an error
            return;
        }

        // Split the data into rows
        const rows = data.split('\n');
        resolve(rows); // Resolve the promise with the rows
    });
  });
}



async function returnOverall() {
  
  
  nflData = await depthChart()

  rows = await readFile()

  // Iterate over each team in nflData
for (const teamName in nflData) {
  const team = nflData[teamName];
  
  // Iterate over each player in the current team
  for (const position in team) {
    const playerName = team[position];
    
    // Iterate over each row in the CSV data
    for (const row of rows) {
      const specificPlayer = row.split(';');
      const playerData = {
        name: specificPlayer[2],
        overall: specificPlayer[3]
      };
      
      // Check if the player's name matches with the current player in the team
      if (playerData.name === playerName) {
        console.log(`${playerData.name} - Overall: ${playerData.overall}`);
      }
    }
  }
}
} 


async function start() {
  await displayTeam()
  choosePosition1("RB")
}

document.getElementById("player1Score").textContent = player1Score.toString()
document.getElementById("player2Score").textContent = player2Score.toString()


