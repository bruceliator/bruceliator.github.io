window.onload = function() {
  const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/1p-sfkodyAIEzkw5dwwKkePzXJaiZCe25UzzX-NJCaiQ/'
  const monthsDisplayElement = document.getElementById('months');
  const netCountDisplayElement = document.getElementById('net_count');
  const areaDisplayElement = document.getElementById('area');

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

  function getDataFromString(string) {
    const match = string.match(/Сплетено:,\s*(\d+)\s*м².*?(\d+)\s*сіток сплетено/);

    if (match) {
      displayResult(match)
    } else {
      console.log("No match found");
    }
  }

  function getDataFromGsheet() {
    fetch(googleSheetsUrl)
      .then(function(response) {
        return response.text();
      })
      .then(function(body) {
        getDataFromString(body)
      });
  }

  if (monthsDisplayElement != null) {
    monthsDisplayElement.textContent = monthsPassed('2022-12-03');
  }

  if (netCountDisplayElement != null) {
    getDataFromGsheet()
  }
}