const oppoStatus = [
    {
      "K_OPPO_STATUS": 1,
      "STATUS": "1. Initial Contact",
      "SUCCESS": 0
    },
    {
      "K_OPPO_STATUS": 2,
      "STATUS": "2. Demonstration",
      "SUCCESS": 25
    },
    {
      "K_OPPO_STATUS": 3,
      "STATUS": "3. Proposal",
      "SUCCESS": 50
    },
    {
      "K_OPPO_STATUS": 4,
      "STATUS": "4. Negotiation",
      "SUCCESS": 75
    },
    {
      "K_OPPO_STATUS": 5,
      "STATUS": "5. Order",
      "SUCCESS": 100
    }
];


const FormComponent = class {
    constructor() {
    }

    start() {
        for(var i = 0; i < oppoStatus.length; i++) {
            var status = oppoStatus[i]['STATUS'];
            var success = oppoStatus[i]['SUCCESS'];
            var option = document.createElement("option");
            option.textContent = status;
            option.value = success;
            select.appendChild(option);
        }
    }
}

var input = document.getElementsByName("success")[0];
var select = document.getElementsByName("status")[0];
select.onchange = function() {
    input.value = select.options[select.selectedIndex].value;
}

var output = document.getElementsByClassName("output")[0];
var form = document.forms[0];
form.onsubmit = function(event) {
  // Preventing page refresh
  event.preventDefault();

  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  output.innerText = JSON.stringify(value);
}
  
const fc = new FormComponent();
fc.start();