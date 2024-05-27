function solveVacation(num, group, day) {
    let singlePrice = 0;
    let priceNoDiscount = 0;
    let totalPrice = 0;
    if (group === 'Students') {
        if (day === 'Friday') {
            singlePrice = 8.45;
        } else if (day === 'Saturday') {
            singlePrice = 9.8;
        } else if (day === 'Sunday') {
            singlePrice = 10.46;
        }

    } else if (group === 'Business') {
        if (day === 'Friday') {
            singlePrice = 10.9;
        } else if (day === 'Saturday') {
            singlePrice = 15.6;
        } else if (day === 'Sunday') {
            singlePrice = 16;
        }
    } else if (group === 'Regular') {
        if (day === 'Friday') {
            singlePrice = 15;
        } else if (day === 'Saturday') {
            singlePrice = 20;
        } else if (day === 'Sunday') {
            singlePrice = 22.5;
        }
    }
    priceNoDiscount = num * singlePrice;

    if (group === 'Students' && num >= 30) {
        totalPrice = priceNoDiscount * 0.85;
    } else if (group === 'Business' && num >= 100) {
        totalPrice = (num - 10) * singlePrice;
    } else if (group == 'Regular' && num >= 10 && num <= 20) {
        totalPrice *= 0.95;
    } else {
        totalPrice = priceNoDiscount;
    }

    console.log(`Totla price: ${totalPrice.toFixed(2)}`);
}

solveVacation(30,
    'Students',
    'Sunday'
);

solveVacation(40,
    "Regular",
    "Saturday"
    )