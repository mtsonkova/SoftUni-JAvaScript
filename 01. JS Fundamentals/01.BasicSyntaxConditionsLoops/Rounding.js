function solveRounding(num, round) {
    let number = num;
    let precision = round;
    if (precision > 15) {
        precision = 15;
    }
    let result = number.toFixed(precision);
    console.log(parseFloat(result));
}

solveRounding(3.1415926535897932384626433832795, 2);
solveRounding(10.5, 3);