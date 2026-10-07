// Del 1 – Funktioner som returnerar värden

// function square(n) {
//     return n * n;
// }

// const result = square(5);
// console.log(result); // 25
// console.log(square(3) + square(4)); // 9 + 16 = 25

function interestCalculator(balance, interest, years) {
    for (let i = 0; i < years; i++) {
        balance = balance + balance * interest / 100;
    }
    return balance;
}

// const savings = interestCalculator(1000, 5, 10);
// const savings2 = interestCalculator(1010, 5, 10);
// const savings3 = interestCalculator(1020, 5, 10);
// console.log(savings); // 1628.894627777173
// console.log(savings2); 
// console.log(savings3); 

// const temperatures = [17, 21, 19, 24, 22, 18, 20];
// console.log(temperatures[0]); // 17  (det första elementet)
// console.log(temperatures[3]); // 24  (det fjärde elementet)
// console.log(temperatures[temperatures.length - 1]); // 20
// for (let i = 0; i < temperatures.length; i++) {
//     console.log(temperatures[i]);
// }

const evenNumbers = [];           // tom array 
evenNumbers.push(2);              // [2] 
evenNumbers.push(4);              // [2, 4] 
evenNumbers.push(6);              // [2, 4, 6]
console.log(evenNumbers.length);  // 3

// Del 2 – Arrayer

const temperatures = [17, 21, 19, 24, 22, 18, 20];
const warm = [];

for (let i = 0; i < temperatures.length; i++) {
    if (temperatures[i] >= 21) {
        warm.push(temperatures[i]);
    }
}

console.log(warm); // [21, 24, 22]

function sum(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}

console.log(sum(temperatures)); // 141

function average(numbers) {
    const mean = sum(numbers) / numbers.length;
    return Math.round(mean * 10) / 10;
}

console.log(average(temperatures)); // 20.1

function highest(numbers) {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

console.log(highest(temperatures)); // 24

// Del 3 – Objekt


// Del 4 – Arrayer av objekt

// Del 5 – Bearbeta data med funktioner