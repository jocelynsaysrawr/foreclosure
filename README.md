# Foreclosure

## Closure Exercise

1. Fork and clone this project.
1. Open the `foreclosure.js` file in your editor.
1. Run `$ npm install` to install all needed packages for this project.
1. Run `$ npm test` run the tests and have them continually watch for changes and re-run tests automatically.
1. Follow the instructions below, and every time you see this symbol ![Test](http://i.imgur.com/aOEdoDc.png) an additional test should pass.

### Strict Mode

Use strict mode for this exercise. ![Test][test]

### Initialize variables

A global variable named `data` is available to you. This variable is an object.

1. Declare a key named steve on the data object, with an value of null. ![Test][test]
1. Declare a key named stevesLoan on the data object, with an value of null. ![Test][test]
1. Declare a key named monthsUntilEvicted on the data object, with an initial value of 0. ![Test][test]

### loan()

Declare a function named `loan()` that takes `0` arguments ![Test][test]

Write the following statements inside the `loan()` function block

1. Declare a variable named `account` using const, with an initial value being a literal object having the following properties and values:
  - key : `borrowed`, value : `550000`
  - key : `balance`, value : `286000`
  - key : `monthlyPayment`, value : `1700`
  - key : `defaulted`, value : `0`
  - key : `defaultsToForeclose`, value : `5`
  - key : `foreclosed`, value : `false`
1. Declare a function named `missPayment` that takes `0` arguments.
  - Access the `defaulted` property of the `account` variable and increase it's value by `1`.
  - Write a conditional that, when the value of `account.defaulted` is greater than or equal to `account.defaultsToForeclose`, will run the following statement:
    - set the value of the `foreclosed` property of the `account` object to `true`
1. returns a literal object with the following properties:
  - key : `getBalance`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Create a closure by returning the value of `balance` by accessing that property of the locally scoped variable `account`. ![Test][test]
  - key : `receivePayment`, value : an unnamed function expression that takes `1` argument named `amount`. ![Test][test]
    - Create a conditional statement that will run the following statements when `amount` is less than `account.monthlyPayment` :
      - invoke the `missPayment` function with `0` arguments
    - Finally, decrement the value of the `balance` property of the `account` variable, by the value of the `amount` parameter. ![Test][test]
  - key : `getMonthlyPayment`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Create a closure by returning the value of `monthlyPayment` by accessing that property of the locally scoped variable `account`. ![Test][test]
  - key : `isForeclosed`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Create a closure by returning the value of `foreclosed` by accessing that property of the locally scoped variable `account`. ![Test][test]

### borrower()

Declare a function named `borrower()` that takes `1` argument named `loan` ![Test][test]

Write the following statements inside the `borrower()` function block

1. Declare a variable named `account` using const, with an initial value being a literal object having the following properties and values:
  - key : `monthlyIncome`, value : `1350`
  - key : `funds`, value : `2800`
  - key : `loan`, value : `loan`
1. returns a literal object with the following properties:
  - key : `getFunds`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Create a closure by returning the value of `funds` by accessing that property of the locally scoped variable `account`. ![Test][test]
  - key : `makePayment`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Conditionally perform either block of statements
      - if `account.funds` is greater than the value of the loan's monthly payment
        - decrement `account.funds` by the value of the loan's monthly payment
        - invoke the loan's `receivePayment` function, and pass in the value of the loan's monthly payment ![Test][test]
      - otherwise
        - invoke the loan's `receivePayment` function, and pass in the value of the `account`'s current `funds`
        - set the value of the `funds` property of `account` to `0` ![Test][test]
  - key : `payDay`, value : an unnamed function expression that takes `0` arguments. ![Test][test]
    - Increase the value of the `funds` property of `account` by the value of the property `monthlyIncome` of `account` ![Test][test]

### Set variables and "step forward in time"

1. Invoke the `loan` function and assign it's return value to the variable `data.stevesLoan`. ![Test][test]
1. Invoke the `borrower` function passing in the argument `data.stevesLoan` and assign it's return value to the variable `data.steve`. ![Test][test]
1. Create a `while` loop that runs the following statement while `data.stevesLoan` is not foreclosed:
  - `data.steve` invokes `payDay`
  - `data.steve` invokes `makePayment`
  - increment `data.monthsUntilEvicted` by `1` ![Test][test]

### Conclusion

All tests should be passing.
The value of `monthsUntilEvicted` should be 13.
You can tweak some of hardcoded private values such as `loan account.monthlyPayment` and `borrower account.monthlyIncome` a little to inspect the different possible outcomes. however, _be careful!_ if the house never goes into foreclosure, you will encounter an endless loop.

### Bonus

Adjust the `while` loop to also exit when the house has been paid off.

## License

Copyright (c) 2015 Dev League. Licensed under the MIT license.

[test]: http://i.imgur.com/XLSydy0.png
