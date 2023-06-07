import { uniqueNamesGenerator, names, colors } from 'unique-names-generator';
import { getAccessToken, getDataDictionaryFromMinion } from '../networkCalls/commonCalls';

const getErrFromRes = (obj) => {
  let err = {};
  for (const [key, value] of Object.entries(obj).filter(([_, v]) => v !== null)) {
    if (key === 'errors' && value.length !== 0) {
      err = { ...err, errors: value };
      return err;
    };
    if (typeof value === 'object') {
      err = { ...err, ...getErrFromRes(value) };
      if (err.errors) return err;
    };
  }
  return err;
};

const updateVarWithParam = ({ varObj: graphqlVar, mapObj: paramMapObj }) => {
  let graphqlVarStr = JSON.stringify(graphqlVar);
  Object.keys(paramMapObj).forEach(key => {
    if (typeof paramMapObj[key] === 'string') {
      const re = new RegExp(`{{${key}}}`, 'g');
      graphqlVarStr = graphqlVarStr.replace(re, paramMapObj[key]);
    } else if (typeof paramMapObj[key] === 'object') {
      const re = new RegExp(`"{{${key}}}"`, 'g');
      graphqlVarStr = graphqlVarStr.replace(re, JSON.stringify(paramMapObj[key]));
    } else {
      const re = new RegExp(`"{{${key}}}"`, 'g');
      graphqlVarStr = graphqlVarStr.replace(re, paramMapObj[key]);
    };
  });
  return JSON.parse(graphqlVarStr);
};

const pollTimeout = async ({ fn, fnParams, validate, interval, timeout }) => {
  const endTime = Date.now() + timeout;
  let result;
  const executePoll = async (resolve, reject) => {
    try {
      result = await fn(fnParams);
    } catch (err) {
      if (validate({ message: err.message }) && (Date.now() < endTime)) {
        await new Promise(resolve => setTimeout(executePoll, interval, resolve, reject));
      } else {
        return reject(new Error(err));
      }
    };
    return resolve(result);
  };
  return new Promise(executePoll);
};

const validateRLCStatusOpen = ({ message: errMessage }) => {
  return errMessage.includes("Route Life Cycle Status is not 'Open'");
};

const generateRandomAlphaNumByLength = ({ lengthOfString: length }) => {
  return Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase();
};

const genrateRandomName = () => {
  return uniqueNamesGenerator({
    dictionaries: [colors, names],
    style: 'capital',
    separator: ' ',
  });
};

const generateRandomNumberByLength = ({ lengthOfNum: length }) => {
  return Array.from(Array(length), () => Math.random() * 10 | 1 || 1).join('');
};

const getDateWithTargetDay = ({ targetDate: dayCount }) => { //Here dayCount=0 means today
  const today = new Date();
  today.setDate(today.getDate());
  const dateObj = {
    d: String(today.getDate() + dayCount),
    dd: String(today.getDate() + dayCount).padStart(2, '0'),
    m: String(today.getMonth() + 1),
    mm: String(today.getMonth() + 1).padStart(2, '0'),
    yyyy: today.getFullYear(),
    yy: String(today.getFullYear()).slice(2, 4),
    Hr: String(today.getHours()),
    mins: String(today.getMinutes()),
  };
  return dateObj;
};

const getMinionValues = async (minionDDTName, reqValCount) => {
  const accToken = await getAccessToken();
  const getDataDictionaryRes = await getDataDictionaryFromMinion({ bearerToken: accToken });
  const dataDictionaryArr = getDataDictionaryRes?.data?.tenantConfiguration?.types;
  const matchingObject = dataDictionaryArr.find(item => item.name === minionDDTName);
  //If a matching object was found, extract the names of the options where active is true
  const result = matchingObject
    ? matchingObject.options
      .filter(option => option.active)
      .map(option => option.name)
    : [];
  //picking random values based on required count from available options
  const expectedArray = [];
  if (reqValCount > result.length) {
    throw new RangeError('Warning: You are trying to fetch more elements than available - expected values :' + reqValCount + ' actual available values :' + result.length);
  } else {
    for (let i = 0; i < reqValCount; i++) {
      const randomIndex = Math.floor(Math.random() * result.length);
      expectedArray.push(result[randomIndex]);
      result.splice(randomIndex, 1);
    }
  }
  return expectedArray;
};

export {
  generateRandomAlphaNumByLength,
  generateRandomNumberByLength,
  genrateRandomName,
  getDateWithTargetDay,
  getErrFromRes,
  getMinionValues,
  pollTimeout,
  updateVarWithParam,
  validateRLCStatusOpen,
};