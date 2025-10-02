// GRAB_CAR
const GRAB_CAR_1 = 8000;
const GRAB_CAR_2 = 7500;
const GRAB_CAR_3 = 7000;
const GRAB_CAR_WAIT = 2000;

// GRAB_SUV
const GRAB_SUV_1 = 9000;
const GRAB_SUV_2 = 8500;
const GRAB_SUV_3 = 8000;
const GRAB_SUV_WAIT = 3000;

// GRAB_BLACK
const GRAB_BLACK_1 = 10000;
const GRAB_BLACK_2 = 9500;
const GRAB_BLACK_3 = 9000;
const GRAB_BLACK_WAIT = 3500;

function calcPhase1(km, price) {
  const rs = km * price;
  return rs;
}

function calcPhase2(km, price) {
  const rs = (km - 1) * price;
  return rs;
}

function calcPhase3(km, price) {
  const rs = (km - 19) * price;
  return rs;
}

function calcWaitingPrice(time, price) {
  let rs = 0;
  if (time >= 3) {
    rs = Math.floor(time / 3) * price;
  }
  return rs;
}
