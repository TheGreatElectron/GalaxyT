
// Declare global Variables
var water = 0;
var food = 0;
var fuel = 0;
var storyIndex = -1;

// Story Objects
var story = [
  {
    maintext: "Cadet Rice, your spaceship is approaching what appears to be a habitable exoplanet, what will you do?",
    mainimg: "img/1.png",
    q1a: "Approach the exoplanet",
    q1b: "Continue on to search for resources",
    explorable: true,
    water: true,
    food: true,
    hydrogen: false
  },
  {
    maintext: "As you leave the habitable exoplanet, you notice a black hole off in the distance. Cadet Rice, what will you do?",
    mainimg: "img/2.png",
    q1a: "Go near the black hole to explore for resources",
    q1b: "Leave the black hole alone and continue onward",
    explorable: false,
    failText: "Oh no Cadet, you have gone too close to the black hole and passed its event horizon!"
  },
  {
    maintext: "Cadet Rice, you see a star in its last stages of life and find yourself surrounded by supernova remnant. Do you:",
    mainimg: "img/3.png",
    q1a: "Explore the remnant for resources",
    q1b: "Continue on to search for resources",
    explorable: true,
    water: true,
    food: false,
    hydrogen: true,
    fuelExplainer: "Depending on the supernova the star ejects gas that is composed of different elements such as silicon, iron, oxygen, carbon, hydrogen and helium."
  },
  {
    maintext: "After traveling 14 lightyears, you encounter a brown dwarf. What will you do?",
    mainimg: "img/4.png",
    q1a: "Explore the brown dwarf for resources",
    q1b: "Continue onward",
    explorable: true,
    water: false,
    food: false,
    hydrogen: true,
    fuelExplainer: "We have found some deuterium (heavy hydrogen) and lithium that can be used as fuel!"
  },
  {
    maintext: "Oh no Cadet! You’ve been hit by jets emitted from active galactic nuclei. The jets go near the speed of light and have set you back 20 lightyears.",
    mainimg: "img/5.png",
    q1a: "Nothing here",
    q1b: "Continue",
    explorable: true,
    water: false,
    food: false,
    hydrogen: false,
  },
  {
    maintext: "Cadet Rice, it seems you’ve come across some molecular clouds. Do you:",
    mainimg: "img/6.png",
    q1a: "Explore the clouds for resources",
    q1b: "Continue on to search for resources",
    explorable: true,
    water: true,
    food: false,
    hydrogen: true,
    fuelExplainer: "Compounds such as water, carbon monoxide even ammonia can be present in molecular clouds. The most common compound is dihydrogen."
  },
  {
    maintext: "As you make your way out of the molecular clouds, you encounter a Wolf-Rayet star. Cadet Rice, what will you do?",
    mainimg: "img/7.png",
    q1a: "Approach the star to search for resources",
    q1b: "Continue onward",
    explorable: false,
    failText: "Ouch! The surface temperature of Wolf-Rayet stars range from 30,000 K to 200,000 K and your spaceship was not equipped for that level of heat. You must restart your mission"
  },
  {
    maintext: "Cadet Rice, you’ve encountered a dark nebula called a Bok globule. Will you choose to:",
    mainimg: "img/8.png",
    q1a: "Explore the nebula for resources",
    q1b: "Continue on to search for resources",
    explorable: true,
    water: false,
    food: false,
    hydrogen: true,
    fuelExplainer: "Bok globules contain dense cosmic dust and gas from which star formation can take place."
  },
  {
    maintext: "Your spaceship picks up high frequencies of energy being emitted from a nearby Quasar. Do you:",
    mainimg: "img/9.png",
    q1a: "Approach the Quasar in a search for resources",
    q1b: "Continue on to search for resources",
    explorable: false,
    failText: "Oh no! This Quasar contained a black hole and the ship was caught in the accretion disk with many other galactic materials surrounding the blackhole!"
  },
  {
    maintext: "You’re in luck Cadet! You’ve approached another habitable exoplanet. What do you choose to do?",
    mainimg: "img/10.png",
    q1a: "Explore exoplanet for resources",
    q1b: "Continue on to search for resources",
    explorable: true,
    water: true,
    food: true,
    hydrogen: true,
    fuelExplainer: " "
  },
  {
    maintext: "After traveling 7 light years, you encounter another brown dwarf. What will you do?",
    mainimg: "img/11.png",
    q1a: "Explore the brown dwarf for resources",
    q1b: "Continue onward",
    explorable: true,
    water: true,
    food: false,
    hydrogen: false,
  }
];

// utility functions

function updateResources() {
  $('.wttext').text(water + " Gallons");
  $('.fdtext').text(food + " Meals");
  $('.fltext').text(fuel + "%");
}

function checkWater(){
  if (story[storyIndex].water){
    // random addition between 5 and 15
    var addition = Math.floor(Math.random() * 11 + 5);
    water += addition;
    updateResources();
    $('.mainText').text("You have found " + addition + " gallons of water");
  } else {
    $('.mainText').text("You couldn't find any water");
  }
}

function checkFood(){
  if (story[storyIndex].food){
    // random addition between 5 and 15
    var addition = Math.floor(Math.random() * 11 + 5);
    food += addition;
    updateResources();
    $('.mainText').text("You have found " + addition + " meals");
  } else {
    $('.mainText').text("You couldn't find any food");
  }
}

function checkFuel(){
  if (story[storyIndex].hydrogen){
    // random addition between 5 and 15
    var addition = Math.floor(Math.random() * 11 + 5);
    fuel += addition;
    updateResources();
    $('.mainText').text("You have found fuel, you have filled an additional " + addition + "% of your fuel tanks. " + story[storyIndex].fuelExplainer);
  } else {
    $('.mainText').text("You couldn't find any fuel");
  }
}

function useSupplies(){
  // if any are less than 0, end the game
  food -= 3;
  water -= 5;
  fuel -= 5;
  updateResources();
  if (fuel < 0){
    $('.mainText').text('You have run out of fuel, life support systems shutting down. Game Over.');
    // Clear all but one button that returns to the start
    $('.tr1').show();
    $('.tr2').hide();
    $('.tr3').hide();
    $('.tr4').hide();

    $('.choice1').text("Restart Game");
    $('.btn1').off('click').click(initialize);
  } else if (water < 0) {
    $('.mainText').text('You have run out of water. Game Over.');
    // Clear all but one button that returns to the start
    $('.tr1').show();
    $('.tr2').hide();
    $('.tr3').hide();
    $('.tr4').hide();

    $('.choice1').text("Restart Game");
    $('.btn1').off('click').click(initialize);
  } else if (food < 0) {
    $('.mainText').text('You have run out of food. Game Over.');
    // Clear all but one button that returns to the start
    $('.tr1').show();
    $('.tr2').hide();
    $('.tr3').hide();
    $('.tr4').hide();

    $('.choice1').text("Restart Game");
    $('.btn1').off('click').click(initialize);
  }
}

function navigator(){
  storyIndex++;
  console.log(storyIndex);
  if (storyIndex >= 11){
    endGame();
    return;
  }

  $('.tr1').show();
  $('.tr2').show();
  $('.tr3').hide();
  $('.tr4').hide();

  if (storyIndex == 4) $('.tr1').hide();

  $('.btn1').off('click').click(explore);
  $('.btn2').off('click').click(navigator);

  $('.choice1').text(story[storyIndex].q1a);
  $('.choice2').text(story[storyIndex].q1b);

  $('.mainText').text(story[storyIndex].maintext);
  $('.sceneimg').attr('src',story[storyIndex].mainimg);
  useSupplies();
}

function explore(){
  if (story[storyIndex].explorable){

    $('.tr3').show();
    $('.tr4').show();

    $('.choice1').text("Search for Water");
    $('.choice2').text("Search for Food");
    $('.choice3').text("Search for fuel");
    $('.choice4').text("Continue Journey");

    $('.btn1').off('click').click(function() {
      checkWater();
      $('.tr1').hide();
    });
    $('.btn2').off('click').click(function() {
      checkFood();
      $('.tr2').hide();
    });
    $('.btn3').off('click').click(function() {
      checkFuel();
      $('.tr3').hide();
    });
    $('.btn4').off('click').click(navigator);
  } else {
    $('.mainText').text(story[storyIndex].failText);
    // Clear all but one button that returns to the start
    $('.tr1').show();
    $('.tr2').hide();
    $('.tr3').hide();
    $('.tr4').hide();

    $('.choice1').text("Restart Game");
    $('.btn1').off('click').click(initialize);
  }
}

function endGame() {
  $('.mainText').text("Congrats Cadet! You’ve collected enough resources to propel yourself out of Galaxy Tyson and back to your mission base. Best of luck on your next space mission Cadet and remember -  knowledge is power!");
  $('.sceneimg').attr('src','img/12.png');
  $('.tr1').show();
  $('.tr2').hide();
  $('.tr3').hide();
  $('.tr4').hide();

  $('.choice1').text("Restart Game");
  $('.btn1').off('click').click(initialize);
}

function initialize() {
  $('.mainText').text("Welcome to Planet AMNH, Cadet Rice. You have been employed on a crucial space mission. You are currently in Galaxy Tyson, but must leave Galaxy Tyson in order to get to mission base on time. Therefore, you must collect enough materials to propel your rocketship out of Galaxy Tyson. During your trip in the galaxy, you will have a series of choices. You must make the right choices to gain enough survival tools throughout your time in space, which you can do by proving your astrophysics knowledge. Your resources are limited so pay close attention and act wisely if you want to make it to the end of your mission. Good luck Cadet!");
  $('.sceneimg').attr('src','img/0.png');
  $('.tr1').show();
  $('.tr2').hide();
  $('.tr3').hide();
  $('.tr4').hide();

  $('.choice1').text("Start Game");
  storyIndex = -1;
  water = 30;
  food = 21;
  fuel = 50;
  updateResources();
  $('.btn1').off('click').click(navigator);
}

initialize();
