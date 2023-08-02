const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button")

function calculateTip({ billAmount, tipPercentage, numberOfPeople }) {
  const totalBill = parseFloat(billAmount);
  const tipBillAmount = parseFloat(tipPercentage);
  const people = parseInt(numberOfPeople);

  if (isNaN(totalBill) || isNaN(tipBillAmount) || isNaN(people)) {
    alert('dame un numero valido');
    return;
  }

  let tipAmount = (totalBill * (tipBillAmount / 100)) / people;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * people + totalBill) / people;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `$${tip}`;
  billTotalPerPerson.innerHTML = `$${totalAmount}`;
}

function resetEveryThing() {
  billTipAmount.innerHTML = '$0.00';
  billTotalPerPerson.innerHTML = '$0.00';
  billAmount.value = '';
  numberOfPeople.value = '';
  customTipPercentage.value = '';
}

billAmount.addEventListener('keyup', (e) => {
  console.log(e.target.value);
});

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let tipvalue = e.target.innerText;
    tipvalue = tipvalue.replace('%', '');

    // Trulsy => Existe un valor 0, '', null, undefined, false
    // Hace una negacion !
    // Falsy

    if (!billAmount.value.length) return;
    if (!numberOfPeople.value.length) numberOfPeople.value = 1;

    calculateTip({
      numberOfPeople: numberOfPeople.value,
      billAmount: billAmount.value,
      tipPercentage: tipvalue,
    });
  });
});

customTipPercentage.addEventListener('blur', (e) => {
  if (!billAmount.value.length) {
    resetEveryThing();
    return;
  }

  if (!numberOfPeople.value.length) numberOfPeople.value = 1;

  calculateTip({
    billAmount: billAmount.value,
    tipPercentage: e.target.value,
    numberOfPeople: numberOfPeople.value,
  });
});

resetButton.addEventListener('click', resetEveryThing);