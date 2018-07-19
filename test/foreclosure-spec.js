const vm = require('vm');
const fs = require('fs');
const chai = require('chai')
chai.should();
const expect = chai.expect;

// foreclosure.js file
const foreclosure = fs.readFileSync(process.cwd() + '/foreclosure.js', { encoding : 'UTF-8' });


describe('foreclosure', function() {
  const context = { data : {} };

  before(function() {
    // runs foreclosure.js file in the context above
    const script = new vm.Script(foreclosure);
    script.runInNewContext(context);
  });

  it('should use strict mode', function() {
    foreclosure.search('\'use strict\';').should.be.above(-1);
  });

  it('should declare a variable named `steve`', function() {
    foreclosure.search('data.steve = null;').should.be.above(-1);
  });

  it('should declare a variable named `stevesLoan`', function() {
    foreclosure.search('data.stevesLoan = null;').should.be.above(-1);
  });

  it('should declare a variable named `monthsUntilEvicted`', function() {
    foreclosure.search('data.monthsUntilEvicted = 0;').should.be.above(-1);
  });

  it('should declare a function named `loan()`', function() {
    expect(context.loan).to.exist;
    (typeof context.loan).should.equal('function');
  });

  describe('loan()', function() {

    describe('returns a literal object that', function() {

      let loan;

      beforeEach(function () {
        loan = context.loan();
      });

      describe('has a key named `getBalance`', function() {

        it('should be an unnamed function expression', function() {
          expect(loan).to.have.property('getBalance');
          (typeof loan.getBalance).should.equal('function');
        });

        it('should create a closure when the function is invoked, and returns the value of the `balance` property of `account`', function() {
          expect(loan.getBalance()).to.equal(286000);
        });

      });

      describe('has a key named `receivePayment`', function() {

        it('should be an unnamed function expression', function() {
          expect(loan).to.have.property('receivePayment');
          (typeof loan.receivePayment).should.equal('function');
        });

        it('should conditionally invoke the `missPayment` function', function() {
          // TODO: hard to test, write one later
        });

        it('should decrement `account.balance` by `amount`', function() {
          loan.receivePayment(2000);
          loan.getBalance().should.equal(284000);
          loan.receivePayment(20000);
          loan.getBalance().should.equal(264000);
        });

      });

      describe('has a key named `getMonthlyPayment`', function() {

        it('should be an unnamed function expression', function() {
          expect(loan).to.have.property('getMonthlyPayment');
          (typeof loan.getMonthlyPayment).should.equal('function');
        });

        it('should create a closure when the function is invoked, and returns the value of the `monthlyPayment` property of `account`', function() {
          loan.getMonthlyPayment().should.equal(1700);
        });

      });

      describe('has a key named `isForeclosed`', function() {

        it('should be an unnamed function expression', function() {
          expect(loan).to.have.property('isForeclosed');
          (typeof loan.isForeclosed).should.equal('function');
        });

        it('should create a closure when the function is invoked, and returns the value of the `foreclosed` property of `account`', function() {
          loan.isForeclosed().should.equal(false);
        });

        it('should be true when payments default 5 times', function() {
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(false);
          loan.receivePayment(0);
          loan.isForeclosed().should.equal(true);
        });
      });
    });
  });

  describe('borrower()', function() {

    describe('returns a literal object that', function() {

      let borrower;

      beforeEach(function () {
        let loan = context.loan();
        borrower = context.borrower(loan);
      });

      describe('has a key named `getFunds`', function() {

        it('should be an unnamed function expression', function() {
          expect(borrower).to.have.property('getFunds');
          (typeof borrower.getFunds).should.equal('function');
        });

        it('should create a closure when the function is invoked, and returns the value of the `funds` property of `account`', function() {
          borrower.getFunds().should.equal(2800);
        });

      });

      describe('has a key named `makePayment`', function() {

        it('should be an unnamed function expression', function() {
          expect(borrower).to.have.property('makePayment');
          (typeof borrower.makePayment).should.equal('function');
        });

        it('should decrement `account.funds` by the amount defined by loan.getMonthlyPayment() if there are sufficient funds', function() {
          borrower.getFunds().should.equal(2800);
          borrower.makePayment();
          borrower.getFunds().should.equal(1100);
        });

        it('should deplete `account.funds` if funds are less than the amount returned by loan.getMonthlyPayment()', function() {
          borrower.getFunds().should.equal(2800);
          borrower.makePayment();
          borrower.getFunds().should.equal(1100);
          borrower.makePayment();
          borrower.getFunds().should.equal(0);
          borrower.makePayment();
          borrower.getFunds().should.equal(0);
        });

      });

      describe('has a key named `payDay`', function() {

        it('should be an unnamed function expression', function() {
          expect(borrower).to.have.property('payDay');
          (typeof borrower.payDay).should.equal('function');
        });

        it('should increment `account.funds` by the amount defined by `account.monthlyIncome`', function() {
          borrower.getFunds().should.equal(2800);
          borrower.payDay();
          borrower.getFunds().should.equal(4150);
        });
      });
    });
  });

  it('should invoke the `loan` function and assign it\'s return value to the `stevesLoan` variable', function() {
    expect(context.data.stevesLoan).to.have.property('getBalance');
    expect(context.data.stevesLoan).to.have.property('receivePayment');
    expect(context.data.stevesLoan).to.have.property('getMonthlyPayment');
    expect(context.data.stevesLoan).to.have.property('isForeclosed');
  });

  it('should invoke the `borrower` function passing in the argument `stevesLoan` and assign it\'s return value to the variabl `steve`', function() {
    expect(context.data.steve).to.have.property('getFunds');
    expect(context.data.steve).to.have.property('makePayment');
    expect(context.data.steve).to.have.property('payDay');
  });

  it('should invoke the `steve.payDay` and `steve.makePayment` functions and increment `month` by `1` while `stevesLoan` is not foreclosed', function() {
    expect(context.data.monthsUntilEvicted).to.equal(13);
    expect(context.data.stevesLoan.getBalance()).to.equal(265650);
    expect(context.data.stevesLoan.isForeclosed()).to.equal(true);
    expect(context.data.steve.getFunds()).to.equal(0);
  });
});
