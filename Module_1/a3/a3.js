'use strict';
    let a_str, b_str, c_str, a, b, c, sum, average, prod
    a_str = prompt("Enter first number")
    b_str = prompt("Enter second number")
    c_str = prompt("Enter third number")
    a = parseInt(a_str)
    b = parseInt(b_str)
    c = parseInt(c_str)
    sum = a + b + c
    prod = a * b * c
    average = sum / 3
    document.querySelector('#sum').innerHTML = sum;
    document.querySelector('#average').innerHTML = average;
    document.querySelector('#product').innerHTML = prod;