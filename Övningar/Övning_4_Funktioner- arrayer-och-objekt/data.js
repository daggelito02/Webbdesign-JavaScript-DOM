console.log("Del 1 – Funktioner som returnerar värden");

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

console.log("Del 2 – Arrayer");

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

console.log("Del 3 – Objekt");

const movie = {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    rating: 4.7
};

function presentMovie(movie) {
    return `${movie.title} (${movie.year}) 
    av ${movie.director} – betyg: ${movie.rating}/5`;
}

console.log(presentMovie(movie)); // Inception (2010) av Christopher Nolan – betyg: 4.7/5

console.log("Del 4 – Arrayer av objekt");

const cities = [
    { name: "Stockholm",  region: "Svealand",  population: 975551  },
    { name: "Göteborg",   region: "Götaland",  population: 583056  },
    { name: "Malmö",      region: "Götaland",  population: 351749  },
    { name: "Uppsala",    region: "Svealand",  population: 233839  },
    { name: "Linköping",  region: "Götaland",  population: 166617  },
    { name: "Örebro",     region: "Svealand",  population: 155050  },
    { name: "Västerås",   region: "Svealand",  population: 154049  },
    { name: "Umeå",       region: "Norrland",  population: 134467  },
];
console.log(cities[0]);            // hela det första objektet
console.log(cities[0].name);       // "Stockholm"
console.log(cities[0].population); // 975551

for (let i = 0; i < cities.length; i++) {
    console.log(cities[i].name);
}

console.log("Del 5 – Bearbeta data med funktioner");

function largestCity(cities) {
    let largest = cities[0];
    for (let i = 1; i < cities.length; i++) {
        if (cities[i].population > largest.population) {
            largest = cities[i];
        }
    }
    return largest;
}

const result = largestCity(cities);
console.log(result.name + ": " + result.population);
// "Stockholm: 975551"

function citiesInRegion(cities, region) {
    const result = [];
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].region === region) {
            result.push(cities[i]);
        }
    }
    return result;
}

const gotaland = citiesInRegion(cities, "Götaland");
console.log(gotaland.length); // 3

for (let i = 0; i < gotaland.length; i++) {
    console.log(gotaland[i].name);
}
// "Göteborg"
// "Malmö"
// "Linköping"

function averagePopulation(cities) {
    let sum = 0;
    for (let i = 0; i < cities.length; i++) {
        sum += cities[i].population;
    }
    return Math.round(sum / cities.length);
}

console.log(averagePopulation(cities)); // 344547

console.log("Vidare arbete");
console.log("smallestCity");

function smallestCity(cities) {
    let smallest = cities[0];
    for (let i = 1; i < cities.length; i++) {
        if (cities[i].population < smallest.population) {
            //console.log("Smaller city found: " + cities[i].name + " with population " + cities[i].population);
            smallest = cities[i];
        }
    }
    return smallest;
}

const resultSnalest = smallestCity(cities);
console.log(resultSnalest.name + ": " + resultSnalest.population);
// "Umeå: 134467"
console.log("totalPopulation");

function totalPopulation(cities) {
    let sum = 0;
    for (let i = 0; i < cities.length; i++) {
        sum += cities[i].population;
    }
    return sum;
}

console.log(totalPopulation(cities)); // 2067282

console.log("findCity");

function findCity(cities, name) {
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === name) {
            return cities[i];
        }
    }
    return "Inen stad med namnet \"" + name + "\" hittades.";
}


console.log(findCity(cities, "Piteå")); 
// { name: "Malmö", region: "Götaland", population: 271500 }