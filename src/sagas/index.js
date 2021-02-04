import { put, takeLatest, all } from 'redux-saga/effects';

//Get Country List
function* getCountryList() {

  const json = yield fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe/*')
    .then(response => response.json());

  yield put({ type: "COUNTRY_LIST_RECEIVED", json: json.zones || [{ error: json.message }] });
}

//Fetch Time Zone
function* fetchTime(data) {
  const json = yield fetch('http://api.timezonedb.com/v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone='+ data.param)
    .then(response => response.json());

  yield put({ type: "FETCH_TIME_SUCCESS", json: json || [{ error: json.message }] });
}

function* actionWatcher() {
  yield takeLatest('GET_COUNTRY_LIST', getCountryList)
  yield takeLatest('FETCH_TIME', fetchTime)
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
