//const newBalance = balance * interest; 
//alert(balance + " * " + interest + " blir: " + newBalance);
let balance = 1000;
const interest = 1.10;
const years = 10;

function interestCalculator(balance, interest, years) {
    for (let i = 0; i < years; i++) {
        balance = balance * interest;
    }
    alert("Behållningen är " + balance + " efter " + years + " år med räntan " + interest + ".");  
}

interestCalculator(1000, 1.10, 1000);

function square(number) {    // Här definierar vi parametern number
    alert(number * number);  // Här använder vi parametern som en variabel
}
//square(4); // Här skickar vi in 4 som parameter 

function addThreeNumbers(number1, number2, number3) {
    alert(number1 + number2 + number3);
}
//addThreeNumbers(1, 2, 3); // Öppnar ett varningsfönster med värdet 6