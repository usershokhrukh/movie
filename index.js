const elMainCard = document.querySelector(".main__cards-first");
const elMainCardsRight = document.querySelector(".main__section-right");
let elMainLimit = document.querySelector(".main__limit");
const api = "https://www.omdbapi.com/?s=panda&apikey=c65fcde9";
const elLoader = document.querySelector(".main__loader");
async function getResponse(url) {
  const request = await axios.get(`${url}`);
  return request;
}

let limit = false;
let limitReport = 10;
try {
  const elSearch = document.querySelector(".main__form-input");
  elSearch.addEventListener("change", (e) => {
    e.preventDefault();
    const inputValue = e.target.value.trim();
    if(limitReport == 0) {
      elLoader.classList.remove("none");
      getData(`https://www.omdbapi.com/?s=${inputValue}&apikey=c65fcde9`);
    }
    elSearch.value = "";
  });
  function getData(link) {
    getResponse(link)
      .then((response) => {
        workData(response.data);
      })
      .catch((error) => console.log(error));
  }
  function workData({Response, Search}) {
    if (Response === "True") {
    elMainLimit = document.querySelector(".main__limit");
    elMainLimit.classList.remove("none");
      limit = true;
      limitReport = 10;
      report();
      let elMainCard = document.querySelector(".main__cards-first");
      let elMainCardsRight = document.querySelector(".main__cards-right");
      elMainCard.innerHTML = "";
      elMainCardsRight.innerHTML = "";
      elLoader.classList.add("none");
      Search?.map((item, index) => {
        elMainCard = document.querySelector(".main__cards-first");
        elMainCardsRight = document.querySelector(".main__cards-right");
        const {Title, Year, Type, Poster} = item;
        if (index === 0) {
          elMainCard.innerHTML += `
            <div class="main__cards main__cards-first-b">
            <img
              class="main__cards-img"
              src=${Poster}
              alt=""
            />
            <div class="main__cards-stats">
              <h2 class="main__cards-stats-title main__cards-stats-title-first">
                ${Title}
              </h2>
              <div class="main__cards-stats-box">
                <p class="main__cards-stats-year main__cards-stats-year-first">
                  Year: <span class="main__cards-stats-year-s">${Year}</span>
                </p>
                <p class="main__cards-stats-type main__cards-stats-type-first">
                  Type: <span class="main__cards-stats-type-s">${Type}</span>
                </p>
              </div>
            </div>
          </div>
          `;
        } else {
          elMainCardsRight.innerHTML += `
            <div class="main__cards">
            <img
              class="main__cards-img"
              src=${Poster}
              alt=""
            />
            <div class="main__cards-stats">
              <h2 class="main__cards-stats-title">${Title}</h2>
              <div class="main__cards-stats-box">
                <p class="main__cards-stats-year">
                  Year: <span class="main__cards-stats-year-s">${Year}</span>
                </p>
                <p class="main__cards-stats-type">
                  Type: <span class="main__cards-stats-type-s">${Type}</span>
                </p>
              </div>
            </div>
          </div>
          `;
        }
      });
    }
  }
  getData(api);
} catch (error) {
  throw new Error(error);
}

function report() {
    elMainLimit = document.querySelector(".main__limit");
    elMainLimit.textContent = `${limitReport}`;
    limitReport--;
}

setInterval(() => {
  if(limitReport != 0) {
    report();
  }else {
    elMainLimit = document.querySelector(".main__limit");
    elMainLimit.classList.add("none");
  }
}, 1000);