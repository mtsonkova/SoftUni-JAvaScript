function solveTriangleOfNumbers(num) {
    let output = '';
    for (let row = 1; row <= num; row++) {
        for (let col = 1; col <= row; col++) {
            output += row + ' ';
        }
        console.log(output);
        output = '';
    }
}

solveTriangleOfNumbers(3);