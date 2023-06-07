
/*eslint-disable cypress/no-unnecessary-waiting */
import masteryHomePage from '../../pageObjects/homePage/homePage.json';

const { dtPicker, puDate, dtPickeContainer } = masteryHomePage.addNew;

const getTodayDate = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate());
  cy.get(puDate).click();
  cy.get(dtPicker).contains(dd).click();
};

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dd = String(tomorrow.getDate());
  //cy.get(pu_date).click();
  cy.get(dtPickeContainer).contains(dd).click({ force: true });
};

const getTodayDatePlusTwo = () => {
  const dateplustwo = new Date();
  dateplustwo.setDate(dateplustwo.getDate() + 3);
  const dd = String(dateplustwo.getDate());
  cy.get(puDate).click();
  cy.get(dtPicker).contains(dd).click({ force: true });
};

const getTodaysDateMMDDYYYY = () => {
  const date = new Date();

  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    '/' +
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    '/' +
    date.getFullYear()
  );
};

const datePicker = ({ dateLocator: dateField, dataText: dataTextValue }) => {
  cy.get(dateField).click({ force: true }).clear().type(dataTextValue + '{enter}').wait(6000);
};

const datePickerWithoutWait = ({ dateLocator: dateField, dataText: dataTextValue }) => {
  cy.get(dateField).click({ force: true }).clear().type(dataTextValue).wait(2000).type('{enter}');
};

const prefixWithDate = ({ prefixText: inputData }) => { //updated by Ranjith
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = `${mm}/${dd}/${yyyy}`;
  const targetText = `${inputData}${today}`;
  cy.log(targetText);
  return targetText;
};
const prefixWithDateTime = ({ prefixText: inputData }) => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear().toString().substr(-2);
  const Hr = String(today.getHours());
  const mins = String(today.getMinutes());
  const targetdate = `${mm}${dd}${yyyy}${Hr}${mins}`;
  const targetText = `${inputData}${targetdate}`;
  return targetText;
};
const getTodayDateAlongwithTime = () => { //updated by kavipriya
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const Hr = String(today.getHours());
  const mins = String(today.getMinutes());
  const targetdate = `${mm}/${dd}/${yyyy} ${Hr}:${mins}`;
  return targetdate;
};

const prefixWithDateTimestamp = ({ prefixText: dataInput }) => { //updated by kavipriya
  const targetText = `${dataInput}${getTodayDateAlongwithTime()}`;
  return targetText;
};
const getCurrentDate = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const targetdate = `${mm}/${dd}/${yyyy}`;
  return targetdate;
};
const verifyTomorrowDate = ({
  dateLocator: dateField,
  attribute: getAttr,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dd = String(tomorrow.getDate());
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', dd);
};

const verifyTodayDateMMDD = ({
  dateLocator: dateField,
  attribute: getAttr,
}) => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const targetdate = `${mm}/${dd}`;
  cy.log(targetdate);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', targetdate);
};

const verifyfutureDateMMDD = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
  attribute: getAttr,
}) => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate()).padStart(2, '0');
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber)).padStart(2, '0');
  const targetdate = String(mm + '/' + dd);
  cy.log(targetdate);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', targetdate);
};

const verifyTodayDateDDMM = ({
  dateLocator: dateField,
  attribute: getAttr,
}) => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const targetdate = `${dd}/${mm}`;
  cy.log(targetdate);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', targetdate);
};

const verifyfutureDateDDMM = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
  attribute: getAttr,
}) => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate()).padStart(2, '0');
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber)).padStart(2, '0');
  const targetdate = String(dd + '/' + mm);
  cy.log(targetdate);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', targetdate);
};

const getTimeWithoutSlash = () => {
  const today = new Date();
  today.setTime(today.getTime());
  const Hr = String(today.getHours());
  const mins = String(today.getMinutes());
  const secs = String(today.getSeconds());
  const targetdate = `${Hr}${mins}${secs}`;
  return targetdate;
};

const getTodayDateAlongwithTimeWithoutSlash = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const Hr = String(today.getHours());
  const mins = String(today.getMinutes());
  const secs = String(today.getSeconds());
  const targetdate = `${mm}${dd}${yyyy}${Hr}${mins}${secs}`;
  return targetdate;
};

const getTodayDatePlusYears = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
  yearCount: yearCountNumber,

}) => {
  //to pick up the future date
  const currentdate = new Date();
  currentdate.setDate(currentdate.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdate.getDate());
  const mm = String(currentdate.getMonth() + parseInt(monthCountNumber));
  const yyyy = String(
    currentdate.getFullYear() + parseInt(yearCountNumber),
  );
  cy.log(mm + '/' + dd + '/' + yyyy);
  const targetdate = String(mm + '/' + dd + '/' + yyyy);
  cy.get(dateField).click().clear().type(targetdate).type('{enter}');
  return targetdate;
};

const getTodaysDateWithoutSlashMMDDYYYY = () => {
  const date = new Date();

  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    date.getFullYear()
  );
};

const verifyTodayDateWithoutSlashMMDDYYYY = ({
  dateLocator: dateField,
  attribute: getAttr,
}) => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const targetdate = `${mm}${dd}${yyyy}`;
  cy.log(targetdate);
  cy.get(dateField)
    .first()
    .invoke('attr', getAttr)
    .should('contain', targetdate);
};

const getPastYearDateWithYear = () => {
  const date = new Date();
  const prevMonth = date.getMonth() - 11;
  const day = date.getDate();
  const newDate = new Date(date.getFullYear(), prevMonth, day);
  const dd = newDate.getDate();
  const mm = newDate.getMonth();
  const yyyy = newDate.getFullYear();
  cy.log(mm + '/' + dd + '/' + yyyy);
  const targetdate = String(mm + '/' + dd + '/' + yyyy);
  return targetdate;
};

const verifyPastYearDateMonth = ({
  dateLocator: dateField,
  attribute: getAttr,
}) => {
  const todaydate = new Date();
  const prevMonth = todaydate.getMonth() - 11;
  const day = todaydate.getDate();
  const newDate = new Date(todaydate.getFullYear(), prevMonth, day);
  const dd = String(newDate.getDate()).padStart(2, '0');
  const mm = String(newDate.getMonth()).padStart(2, '0');
  const targetdate = `${mm}/${dd}`;
  cy.log(targetdate);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', targetdate);
};

const prefixWithSufixData = ({ prefixText: inputData, sufixText: lastData }) => { //updated by Ranjith and Kavipriya
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = `${mm}${dd}${yyyy}`;
  const targetText = `${inputData}${today}${' '}${lastData}`;
  cy.log(targetText);
  return targetText;
};

const sufixWithEmail = ({ prefixText: inputData, email: emailText }) => { //updated by Ranjith and Kavipriya
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = `${mm}/${dd}/${yyyy}`;
  const targetText = `${inputData}${today}${emailText}`;
  cy.log(targetText);
  return targetText;
};

const prefixWithDateNoSpace = ({ prefixText: inputData }) => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = `${mm}${dd}${yyyy}`;
  const targetText = `${inputData}${today}`;
  cy.log(targetText);
  return targetText;
};

const returntodayDateMMDDYY = () => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate());
  const dd = String(currentdata.getDate()).padStart(2, '0');
  const mm = String(currentdata.getMonth() + 1).padStart(2, '0');
  const yy = String(currentdata.getFullYear()).slice(2, 4);
  const targetdate = String(mm + '/' + dd + '/' + yy);
  //cy.log(targetdate);
  return targetdate;
};

const returntodayDateMMDD = () => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate());
  const dd = String(currentdata.getDate()).padStart(2, '0');
  const mm = String(currentdata.getMonth() + 1).padStart(2, '0');
  const targetdate = String(mm + '/' + dd);
  //cy.log(targetdate);
  return targetdate;
};
const returnfutureDateMMDDYY = ({
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
}) => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate()).padStart(2, '0');
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber)).padStart(2, '0');
  const yy = String(currentdata.getFullYear()).slice(2, 4);
  const targetdate = String(mm + '/' + dd + '/' + yy);
  //cy.log(targetdate);
  return targetdate;
};

const enterTodayDateMMDDYYYY = ({
  dateLocator,
}) => {
  //to pick up the future date
  const currentdata = new Date();
  const dd = String(currentdata.getDate());
  const mm = String(currentdata.getMonth() + 1);
  const yyyy = String(currentdata.getFullYear());
  cy.log(mm + '/' + dd + '/' + yyyy);
  const targetdate = String(mm + '/' + dd + '/' + yyyy);
  cy.get(dateLocator).click().clear().type(targetdate).type('{enter}');
  return targetdate;
};

const verifyTodayDateMMDDYY = ({
  dateLocator: dateField,
  attribute: getAttr,
}) => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate());
  const dd = String(currentdata.getDate()).padStart(2, '0');
  const mm = String(currentdata.getMonth() + 1).padStart(2, '0');
  const yy = String(currentdata.getFullYear()).slice(2, 4);
  const targetdate = String(mm + '/' + dd + '/' + yy);
  cy.log(targetdate);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', targetdate);
};

const verifyfutureDateMMDDYY = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
  attribute: getAttr,
}) => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate()).padStart(2, '0');
  const mm = String(currentdata.getMonth() + parseInt(monthCountNumber)).padStart(2, '0');
  const yy = String(currentdata.getFullYear()).slice(2, 4);
  const targetdate = String(mm + '/' + dd + '/' + yy);
  cy.log(targetdate);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', targetdate);
};
const getTodayDatePlusOne = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const targetdate = `${mm}/${dd}/${yyyy}`;
  return targetdate;
};

const getPastDate = ({
  day: dayCountNumber,
  targetDateType: targetDateFormat,
}) => {
  //to pick up the past date
  const todaydate = new Date();
  const prevMonth = todaydate.getMonth() - 11;
  const day = todaydate.getDate() - parseInt(dayCountNumber);
  const newDate = new Date(todaydate.getFullYear(), prevMonth, day);
  const dd = String(newDate.getDate()).padStart(2, '0');
  const mm = String(newDate.getMonth()).padStart(2, '0');
  const yyyy = String(todaydate.getFullYear());
  if (targetDateFormat === 'targetDateWithYear') {
    const targetDate = `${mm}/${dd}/${yyyy}`;
    return targetDate;
  } else if (targetDateFormat === 'targetDateWithoutYear') {
    const targetDate = `${mm}/${dd}`;
    return targetDate;
  }
};
const returnTodayDateMinusOne = () => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate());
  const dd = String(currentdata.getDate() - 1).padStart(2, '0');
  const mm = String(currentdata.getMonth() + 1).padStart(2, '0');
  const yy = String(currentdata.getFullYear()).slice(2, 4);
  const targetdate = String(mm + '/' + dd + '/' + yy);
  //cy.log(targetdate);
  return targetdate;
};
const getTodayDatewithTime = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const Hr = String(today.getHours()).padStart(2, '0');
  const targetDate = `${mm}/${dd} ${Hr}`;
  return targetDate;
};

const getCtDateTimeNow = () => {
  const cstDateTimeNow = new Date(Date.now() - (300 * 60000));
  return cstDateTimeNow;
};

const getTimeWithOffset = ({ timeStamp: val, offset: diffVal }) => {
  const newTime = new Date(val.getTime() + (diffVal * 60000));
  const strVal = newTime.toISOString();
  const timeWithOffset = strVal.slice(11, 13) + ':' + strVal.slice(14, 16);
  return timeWithOffset;
};

const getTimeFromStamp = ({ timeStamp: val }) => {
  const strVal = val.toISOString();
  const timeWithOffset = strVal.slice(11, 13) + ':' + strVal.slice(14, 16);
  return timeWithOffset;
};

const getDateFromIso = ({ timeStamp: value }) => {
  const strValue = value.toISOString();
  const targetDate = strValue.slice(5, 7) + '/' + strValue.slice(8, 10) + '/' + strValue.slice(0, 4);
  return targetDate;
};

const getDateFromIsoWithOffset = ({ timeStamp: value, monthVal: monthCount }) => {
  const newTime = new Date(value);
  newTime.setMonth(value.getMonth() - monthCount);
  const strValue = newTime.toISOString();
  const targetDate = strValue.slice(5, 7) + '/' + strValue.slice(8, 10) + '/' + strValue.slice(0, 4);
  return targetDate;
};

const getTodayTimePlusOneHour = () => {
  const today = new Date();
  today.setTime(today.getTime());
  const Hr = String(today.getHours() + 1).padStart(2, '0');
  const mins = String(today.getMinutes()).padStart(2, '0');
  const targetTime = `${Hr}:${mins}`;
  return targetTime;
};

//To return Date in YYYYMMDD format
const getDateYYYYMMDD = ({
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
  yearCount: yearCountNumber,
}) => {
  const today = new Date();
  const dd = String(today.getDate() + dayCountNumber).padStart(2, '0');
  const mm = String(today.getMonth() + monthCountNumber).padStart(2, '0'); //January is 0!
  const yyyy = String(today.getFullYear() + yearCountNumber);
  const targetdate = String(yyyy + mm + dd);
  cy.log(targetdate);
  return targetdate;
};
const verifyTodayDateMinusOneMMDD = ({
  dateLocator: dateField,
  attribute: getAttr,
}) => {
  const today = new Date();
  today.setDate(today.getDate());
  const dd = String(today.getDate() - 1).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const targetdate = `${mm}/${dd}`;
  cy.log(targetdate);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', targetdate);
};

const returnFutureDateWithFormat = ({
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
  targetDateType: targetDateFormat,
}) => {
  //to pick up the future date
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() + parseInt(dayCountNumber));
  const dd = String(currentdata.getDate()).padStart(2, '0');
  currentdata.setMonth(currentdata.getMonth() + parseInt(monthCountNumber));
  const mm = String(currentdata.getMonth()).padStart(2, '0');
  const yyyy = String(currentdata.getFullYear());
  if (targetDateFormat === 'targetDateWithYear') {
    const targetDate = `${mm}/${dd}/${yyyy}`;
    return targetDate;
  } else if (targetDateFormat === 'targetDateWithoutYear') {
    const targetDate = `${mm}/${dd}`;
    return targetDate;
  }
};

const returnPastDateWithFormat = ({ //past date based on month
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
  targetDateType: targetDateFormat,
}) => {
  //to pick up the future date
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate() - parseInt(dayCountNumber));
  const dd = String(currentdata.getDate()).padStart(2, '0');
  currentdata.setMonth(currentdata.getMonth() - parseInt(monthCountNumber));
  const mm = String(currentdata.getMonth()).padStart(2, '0');
  const yyyy = String(currentdata.getFullYear());
  const yy = String(currentdata.getFullYear().toString().slice(-2));
  if (targetDateFormat === 'targetDateWithYear') {
    const targetDate = `${mm}/${dd}/${yyyy}`;
    return targetDate;
  } else if (targetDateFormat === 'targetDateWithDDMMYY') {
    const targetDate = `${dd}/${mm}/${yy}`;
    return targetDate;
  } else if (targetDateFormat === 'targetDateWithoutYear') {
    const targetDate = `${mm}/${dd}`;
    return targetDate;
  }
};

//To return Date in YYYY-MM-DD format
const getDateYYYYMMDDWithDash = ({
  dayCount: dayCountNumber,
  monthCount: monthCountNumber,
  yearCount: yearCountNumber,
}) => {
  const today = new Date();
  const dd = String(today.getDate() + dayCountNumber).padStart(2, '0');
  const mm = String(today.getMonth() + monthCountNumber).padStart(2, '0'); //January is 0!
  const yyyy = String(today.getFullYear() + yearCountNumber);
  const targetdate = `${yyyy}-${mm}-${dd}`;
  cy.log(targetdate);
  return targetdate;
};
const datePickerWithoutClear = ({ dateLocator: dateField, dataText: dataTextValue }) => {
  cy.get(dateField).click({ force: true }).type(dataTextValue + '{enter}').wait(6000);
};
const datePickerFirstElement = ({ dateLocator: dateField, dataText: dataTextValue }) => { //updateddByDeepak
  cy.get(dateField).first().click({ force: true }).type(dataTextValue + '{enter}').wait(5000);
};

const datePickerLastElement = ({ dateLocator: dateField, dataText: dataTextValue }) => {
  cy.get(dateField).last().click({ force: true }).type(dataTextValue + '{enter}').wait(5000);//updateddByDeepak
};

const returnTodayUSDateMMDDYYYY = () => {
  const chicagoDatetimeStr = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
  //create new Date object
  const dateChicago = new Date(chicagoDatetimeStr);
  //year as (YYYY) format
  const year = dateChicago.getFullYear();
  //month as (MM) format
  const month = ('0' + (dateChicago.getMonth() + 1)).slice(-2);
  //date as (DD) format
  const date = ('0' + dateChicago.getDate()).slice(-2);
  //date time in MMDDYYYY format
  const dateTime = month + '/' + date + '/' + year;
  cy.log(dateTime);
  return dateTime;
};

const returnTodayUSDateMMDD = () => {
  const chicagoDatetimeStr = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
  //create new Date object
  const dateChicago = new Date(chicagoDatetimeStr);
  //month as (MM) format
  const month = ('0' + (dateChicago.getMonth() + 1)).slice(-2);
  //date as (DD) format
  const date = ('0' + dateChicago.getDate()).slice(-2);
  //date time in MMDDYYYY format
  const dateTime = month + '/' + date;
  cy.log(dateTime);
  return dateTime;
};

const getTodayTimePlusTwoHour = () => {
  const today = new Date();
  today.setTime(today.getTime());
  const Hr = String(today.getHours() + 2).padStart(2, '0');
  const mins = String(today.getMinutes()).padStart(2, '0');
  const targetTime = `${Hr}:${mins}`;
  return targetTime;
};

const getTodayTime = () => {
  const today = new Date();
  today.setTime(today.getTime());
  const Hr = String(today.getHours() + 0).padStart(2, '0');
  const mins = String(today.getMinutes()).padStart(2, '0');
  const targetTime = `${Hr}:${mins}`;
  return targetTime;
};

const getTodayTimeMinusTwoMins = () => {
  const today = new Date();
  today.setTime(today.getTime());
  const Hr = String(today.getHours() + 0).padStart(2, '0');
  const mins = String(today.getMinutes() - 2).padStart(2, '0');
  const targetTime = `${Hr}:${mins}`;
  return targetTime;
};

const getTodayTimePlusThirtyMins = () => {
  const today = new Date();
  today.setTime(today.getTime());
  const Hr = String(today.getHours() + 0).padStart(2, '0');
  const mins = String(today.getMinutes() + 30).padStart(2, '0');
  const targetTime = `${Hr}:${mins}`;
  return targetTime;
};

const getTodayTimeMinusOneMins = () => {
  const today = new Date();
  today.setTime(today.getTime());
  const Hr = String(today.getHours() + 0).padStart(2, '0');
  const mins = String(today.getMinutes() - 1).padStart(2, '0');
  const targetTime = `${Hr}:${mins}`;
  return targetTime;
};

const returnPastUSDate = ({ dayCount: dayCountNumber }) => {
  const chicagoDatetimeStr = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
  //create new Date object
  const dateChicago = new Date(chicagoDatetimeStr);
  dateChicago.setDate(dateChicago.getDate() - (dayCountNumber));
  //year as (YYYY) format
  const year = dateChicago.getFullYear();
  //month as (MM) format
  const month = ('0' + (dateChicago.getMonth() + 1)).slice(-2);
  //date as (DD) format
  const date = ('0' + (dateChicago.getDate())).slice(-2);
  //date time in MMDDYYYY format
  const dateTime = month + '/' + date + '/' + year;
  cy.log(dateTime);
  return dateTime;
};

const verifyPastUSDateMMDD = ({
  dateLocator: dateField,
  dayCount: dayCountNumber,
  attribute: getAttr,
}) => {
  const chicagoDatetimeStr = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
  //create new Date object
  const dateChicago = new Date(chicagoDatetimeStr);
  dateChicago.setDate(dateChicago.getDate() - (dayCountNumber));
  //month as (MM) format
  const month = ('0' + (dateChicago.getMonth() + 1)).slice(-2);
  //date as (DD) format
  const date = ('0' + (dateChicago.getDate())).slice(-2);
  //date time in MMDDYYYY format
  const dateTime = month + '/' + date;
  cy.log(dateTime);
  cy.get(dateField).first().invoke('attr', getAttr).should('contain', dateTime);
};

const getTodayDatePlusFour = () => {
  const today = new Date();
  today.setDate(today.getDate() + 4);
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const targetdate = `${mm}/${dd}/${yyyy}`;
  return targetdate;
};

const todayDatePlusTwo = () => {
  const today = new Date();
  today.setDate(today.getDate() + 2);
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const targetdate = `${mm}/${dd}/${yyyy}`;
  return targetdate;
};

const todayDatePlusFive = () => {
  const today = new Date();
  today.setDate(today.getDate() + 5);
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const targetdate = `${mm}/${dd}/${yyyy}`;
  return targetdate;
};

const todayDatePlusThree = () => {
  const today = new Date();
  today.setDate(today.getDate() + 3);
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  const targetdate = `${mm}/${dd}/${yyyy}`;
  return targetdate;
};

const returnTodayDateMinusOneMMDD = () => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate());
  const dd = String(currentdata.getDate() - 1).padStart(2, '0');
  const mm = String(currentdata.getMonth() + 1).padStart(2, '0');
  const targetdate = String(mm + '/' + dd);
  //cy.log(targetdate);
  return targetdate;
};

const returnTodayDateMinusOneDD = () => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate());
  const dd = String(currentdata.getDate() - 1).padStart(2, '0');
  const targetdate = String(dd);
  //cy.log(targetdate);
  return targetdate;
};

const getTodayDatePlusOneMMDD = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const targetdate = String(mm + '/' + dd);
  return targetdate;
};

const returnPastUSDateMMDD = ({ dayCount: dayCountNumber }) => {
  const chicagoDatetimeStr = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
  //create new Date object
  const dateChicago = new Date(chicagoDatetimeStr);
  dateChicago.setDate(dateChicago.getDate() - (dayCountNumber));
  //month as (MM) format
  const month = ('0' + (dateChicago.getMonth() + 1)).slice(-2);
  //date as (DD) format
  const date = ('0' + (dateChicago.getDate())).slice(-2);
  //date time in MMDDYYYY format
  const dateTime = month + '/' + date;
  cy.log(dateTime);
  return dateTime;
};

const returntodayDateDDMM = () => {
  const currentdata = new Date();
  currentdata.setDate(currentdata.getDate());
  const dd = String(currentdata.getDate()).padStart(2, '0');
  const mm = String(currentdata.getMonth() + 1).padStart(2, '0');
  const targetdate = String(dd + '/' + mm);
  //cy.log(targetdate);
  return targetdate;
};

const getTodayDatePlusSevenMMDD = () => {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  const dd = String(today.getDate());
  const mm = String(today.getMonth());
  const targetdate = String(mm + '/' + dd);
  return targetdate;
};
export const getDayName = ({ strDate: dateStr, localeName: locale }) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

export {
  getTodayDate,
  getTomorrowDate,
  getTodayDatePlusTwo,
  getTodaysDateMMDDYYYY,
  datePicker,
  getTodayDatePlusOne,
  prefixWithDate,
  getTodayDateAlongwithTime,
  prefixWithDateTimestamp,
  getCurrentDate,
  prefixWithDateTime,
  verifyTomorrowDate,
  verifyTodayDateMMDD,
  verifyfutureDateMMDD,
  getTimeWithoutSlash,
  getTodayDateAlongwithTimeWithoutSlash,
  getTodayDatePlusYears,
  getTodaysDateWithoutSlashMMDDYYYY,
  verifyTodayDateWithoutSlashMMDDYYYY,
  getPastYearDateWithYear,
  verifyPastYearDateMonth,
  prefixWithSufixData,
  sufixWithEmail,
  prefixWithDateNoSpace,
  returntodayDateMMDDYY,
  getDateFromIsoWithOffset,
  returnfutureDateMMDDYY,
  enterTodayDateMMDDYYYY,
  verifyTodayDateMMDDYY,
  verifyfutureDateMMDDYY,
  getPastDate,
  getDateYYYYMMDD,
  getCtDateTimeNow,
  getTimeFromStamp,
  returnTodayDateMinusOne,
  getTodayDatewithTime,
  getDateFromIso,
  getTimeWithOffset,
  datePickerWithoutWait,
  getTodayTimePlusOneHour,
  verifyTodayDateMinusOneMMDD,
  returntodayDateMMDD,
  returntodayDateDDMM,
  returnFutureDateWithFormat,
  getDateYYYYMMDDWithDash,
  datePickerWithoutClear,
  datePickerFirstElement,
  datePickerLastElement,
  verifyfutureDateDDMM,
  verifyTodayDateDDMM,
  returnTodayUSDateMMDDYYYY,
  returnTodayUSDateMMDD,
  getTodayTimePlusTwoHour,
  getTodayTime,
  getTodayTimeMinusTwoMins,
  getTodayTimePlusThirtyMins,
  getTodayTimeMinusOneMins,
  returnPastDateWithFormat,
  returnPastUSDate,
  verifyPastUSDateMMDD,
  getTodayDatePlusFour,
  todayDatePlusTwo,
  todayDatePlusFive,
  todayDatePlusThree,
  returnTodayDateMinusOneMMDD,
  getTodayDatePlusOneMMDD,
  getTodayDatePlusSevenMMDD,
  returnTodayDateMinusOneDD,
  returnPastUSDateMMDD,
};