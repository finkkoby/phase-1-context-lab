/* Your Code Here */
function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}
function createEmployeeRecords(employees) {
    let records = [];
    for (let employee of employees) {
        records.push(createEmployeeRecord(employee));
    }
    return records;
}
function createTimeInEvent(dateStamp="YYYY-MM-DD HHMM") {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.substring(11)),
        date: dateStamp.substring(0, 10)
    });
    return this;
}
function createTimeOutEvent(dateStamp="YYYY-MM-DD HHMM") {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.substring(11)),
        date: dateStamp.substring(0, 10)
    });
    return this;
}
function hoursWorkedOnDate(dateStamp="YYYY-MM-DD") {
    for (let i = 0; i < this.timeInEvents.length; i++) {
        if(this.timeInEvents[i].date === dateStamp) {
            return (this.timeOutEvents[i].hour - this.timeInEvents[i].hour) / 100
        }
    }
}
function wagesEarnedOnDate(dateStamp) {
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    //eligibleDates will be an array of all of the dates on an employee record

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName)
}
function calculatePayroll(array) {
    let payroll = array.reduce(function(pay, e) {
        return pay + allWagesFor.call(e)
    }.bind(this), 0)
    return payroll;
}