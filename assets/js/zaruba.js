---
---
window.addEventListener("load", () => {
  function getResultFromBank() {
    {% for item in site.data.zaruba %}
      getDataFromMono('{{ item.jar_url }}', {{forloop.index}})
    {% endfor %}
  }

  function numberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function appendResultValue(data, fighter_number) {
    let wrapper = document.getElementById(`fighter_${fighter_number}`)
    wrapper.getElementsByClassName("battle__result-money")[0].textContent = numberWithSpaces(data.amount/100) + " ₴"
  }

  function getDataFromMono(url, fighter_number) {
    fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          appendResultValue(data, fighter_number)
        })
        .catch(function (reason) {
          console.error(reason)
        });
  }

  getResultFromBank();
});