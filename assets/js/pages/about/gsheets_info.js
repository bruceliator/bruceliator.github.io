const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/1p-sfkodyAIEzkw5dwwKkePzXJaiZCe25UzzX-NJCaiQ/'
const monthsDisplayElement = document.getElementById('months');
const netCountDisplayElement = document.getElementById('net_count');
const areaDisplayElement = document.getElementById('area');
const counterDuration = 1000
const headerNetCountDisplayElement = document.getElementById('net-count');
const headerAreaDisplayElement = document.getElementById('area-count');

function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function monthsPassed(startDate) {
  const start = new Date(startDate);
  const current = new Date();
  const timeDiff = current - start;

  return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));
}

function displayResult(result) {
  let areaValue = parseInt(areaDisplayElement.dataset.value);
  let netValue = parseInt(netCountDisplayElement.dataset.value);

  const realAreaValue = parseInt(result[1]);
  const realNetValue = parseInt(result[2]);

  Array.from({ length: (realAreaValue - areaValue) }).forEach((_, i) => {
    setTimeout(() => areaDisplayElement.textContent = numberWithSpaces(areaValue + i + 1), 2 * i)
  });

  Array.from({ length: (realNetValue - netValue) }).forEach((_, i) => {
    setTimeout(() => netCountDisplayElement.textContent = numberWithSpaces(netValue + i + 1), 100 * i)
  });
}

function displayResultHeader(result) {
  let currentAreaValue = parseInt(headerAreaDisplayElement.textContent)
  let currentNetValue = parseInt(headerNetCountDisplayElement.textContent)
  let realAreaValue = parseInt(result[1])
  let realNetValue = parseInt(result[2])
  let areaDiff = realAreaValue - currentAreaValue
  let netDiff = realNetValue - currentNetValue

  let areaSpeed = (counterDuration/areaDiff)
  let netSpeed = (counterDuration/netDiff)

  Array.from({ length: (realAreaValue - currentAreaValue) }).forEach((_, i) => {
    setTimeout(() => headerAreaDisplayElement.textContent = numberWithSpaces(currentAreaValue + i + 1), areaSpeed * i)
  });

  Array.from({ length: (realNetValue - currentNetValue) }).forEach((_, i) => {
    setTimeout(() => headerNetCountDisplayElement.textContent = numberWithSpaces(currentNetValue + i + 1), netSpeed * i)
  });
}


function getDataFromString(string, refreshIntervalId) {
  const match = string.match(/Сплетено:\s*(\d+)\s*м².*?(\d+)\s*сіток сплетено/);
  clearInterval(refreshIntervalId);

  if (match) {
    displayResult(match)
    displayResultHeader(match)
  } else {
    console.log("No match found");
  }
}

function dummyCounter() {
  let currentAreaValue = parseInt(headerAreaDisplayElement.textContent)
  let currentNetValue = parseInt(headerNetCountDisplayElement.textContent)

  headerAreaDisplayElement.textContent = currentAreaValue + 1
  headerNetCountDisplayElement.textContent = currentNetValue + 1
}

function getDataFromGsheet() {
  let refreshIntervalId = setInterval(dummyCounter, 200);

  fetch(googleSheetsUrl)
      .then(function(response) {
        return response.text();
      })
      .then(function(body) {
        getDataFromString(body, refreshIntervalId)
      });
}

if (monthsDisplayElement != null) {
  monthsDisplayElement.textContent = monthsPassed('2022-12-03');
}

if (netCountDisplayElement != null) {
  getDataFromGsheet()
}