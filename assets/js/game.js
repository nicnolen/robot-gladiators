/* GAME FUNCTIONS */

// Function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)+ min);

  return value;
};

// Function to check if the player wants to fight or skip
var fightOrSkip = function() {
  // Ask the player if they'd like to fight or skip using the fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Conditional Recursive Function Call
  // If the `promptFight` is NOT a valid value, then execute the following statements.
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    // Use return to call it again and stop the rest of this function from running
    return fightOrSkip();
  }
  
  // Convert promptFight to all lowercase so you can check with less options
  promptFight = promptFight.toLowerCase();
  
  // If player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // Confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
    // If yes (true), leave fight
    if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // Subtract money from playerInfo.money for skipping but dont let them go into the negative
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        // Stop while() loop using break; and enter the next fight

        //return true if the player wants to leave
        return true;
      }
    }
    return false;
};

// fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// Function to start a new game
var startGame = function() {
  // Reset player stats
  playerInfo.reset();

  // Call the fight function with a loop
  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // Let player know what round they are in, arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

      // Pick new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];

      // Reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // Pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      // If player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // Ask if the player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

// Function to end the entire game
var endGame = function() {
  // If player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.")
  }

  // Ask if the player wants to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // Restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// Function for the shop
var shop = function() {
  // Ask player what they'd like to do
  var shopOptionPrompt = window.prompt (
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

  // Prompt responses will always be a string so convert string to number
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // Use switch to carry out action
  switch (shopOptionPrompt) {
    case 1: 
      playerInfo.refillHealth(); 
      break;
    case 2: 
      playerInfo.upgradeAttack(); 
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
      // Do nothing, so function will end
    default: 
      window.alert("You did not pick a valid option. Try again.");
      // Call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// Function to set name
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
}

/* END GAME FUNCTIONS */

/* GAME INFORMATION / VARIABLES */
// Player information
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

// Robot information
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// Start the game when the page loads
startGame();