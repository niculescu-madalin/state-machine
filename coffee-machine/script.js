var text = document.getElementById("text");
var cmHistory = document.getElementById("cmHistory");
var btnAddHalf = document.getElementById("btn-addHalf");
var btnAddOne = document.getElementById("btn-addOne");
var btnReset = document.getElementById("btn-reset");
var btnCoffee = document.getElementById("btn-coffee");
var btnExpresso = document.getElementById("btn-expresso");
var btnCapuccino = document.getElementById("btn-capuccino");

const btnWrapper = document.getElementById('buttons-wrapper');

btnWrapper.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  updateState();
})

var currentMoney = 0;
var coffeeMachineHistory = "";

var coffeeMachine = new StateMachine({
    init: 'zero',
    transitions: [
      { name: 'add50cents',     from: 'zero',       to: 'zeroHalf' },
      { name: 'add50cents',     from: 'zeroHalf',   to: 'one' },
      { name: 'add50cents',     from: 'one',        to: 'oneHalf' },
      { name: 'add50cents',     from: 'oneHalf',    to: 'two' },
      { name: 'add1dollar',     from: 'zero',       to: 'one' },
      { name: 'add1dollar',     from: 'one',        to: 'two' },
      { name: 'add1dollar',     from: 'zeroHalf',   to: 'oneHalf'},
      { name: 'getCoffee',      from: 'one',        to: 'zero'},
      { name: 'getCoffee',      from: 'oneHalf',    to: 'zeroHalf'},
      { name: 'getCoffee',      from: 'two',        to: 'one'},
      { name: 'getExpresso',    from: 'oneHalf',    to: 'zero'},
      { name: 'getExpresso',    from: 'two',        to: 'zeroHalf'},
      { name: 'getCapuccino',   from: 'two',        to: 'zero'},
      { name: 'reset',          from: '*',          to: 'zero'}
    ],
    methods: {
      onAdd50cents: function() { 
        cmHistory.innerHTML = "";
        currentMoney += 0.5; 
        coffeeMachineHistory += "50 de bani, ";
      },
      onAdd1dollar: function() { 
        cmHistory.innerHTML = "";
        currentMoney += 1;
        coffeeMachineHistory += "1 leu, ";
      },
      onGetCoffee: function() { 
        currentMoney -= 1;
        coffeeMachineHistory += "cafea, ";
      },
      onGetExpresso: function() { 
        currentMoney -= 1.5;
        coffeeMachineHistory += "expresso, ";
      },
      onGetCapuccino: function() { 
        currentMoney -= 2;
        coffeeMachineHistory += "capuccino, ";
      },
      onReset: function() {
        currentMoney = 0;
        coffeeMachineHistory += "reset ";
        displayHistory();
    }
    },
});

updateState();

function displayHistory() {
    cmHistory.innerHTML = coffeeMachineHistory;
    coffeeMachineHistory = "";
}

function updateState() {
    text.innerHTML = currentMoney;
    switch (currentMoney) {
        case 0:
            btnCoffee.style.display = "none";
            btnCapuccino.style.display = "none";
            btnExpresso.style.display = "none";
            btnAddHalf.style.display = "block";
            btnAddOne.style.display = "block";
            break;
        case 1:
            btnCoffee.style.display = "block";
            break;
        case 1.5:
            btnCoffee.style.display = "block";
            btnExpresso.style.display = "block";
            btnAddOne.style.display = "none";
            break;
        case 2:
            btnCoffee.style.display = "block";
            btnCapuccino.style.display = "block";
            btnExpresso.style.display = "block";
            btnAddHalf.style.display = "none";
            btnAddOne.style.display = "none";
            break;
        default:
            btnCoffee.style.display = "none";
            btnCapuccino.style.display = "none";
            btnExpresso.style.display = "none";
            btnAddHalf.style.display = "block";
            btnAddOne.style.display = "block";
            break;
    }
}


