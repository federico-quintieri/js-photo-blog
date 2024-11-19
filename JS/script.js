// Prendiamo elementi HTML

const rowElement = document.querySelector(".row");
console.log(rowElement);

let arrayOggettiAPI = [];

// Devo fare una funzione che inserisce una stringa HTML in un certo elemento
const insertHTML = (baseHTML, arrayElementi) => {
  // Accetto un array di oggetti contenenti le informazioni che mi servono

  let stringHTML = "";
  arrayElementi.forEach((currElement) => {
    // Destructuring elemento oggetto
    const { title, url, thumbnailUrl } = currElement;
    console.log(title, url, thumbnailUrl);

    // console.log(currElement);

    stringHTML = `<div class="col  p-2 d-flex justify-content-center col-lg-4">
            <div class="card p-2" style="width: 18rem">
              <img id="pin" src="./img/pin.svg" alt="" />
              <img src="${thumbnailUrl}" class="card-img-top" alt="..." />
              <div class="card-body">
                <p class="card-text">
                  ${title}
                </p>
              </div>
            </div>
          </div>`;

    // Faccio una stringa con i dati html presi dall'oggetto e la mando all' html
    // stringHTML += ;
    baseHTML.innerHTML += stringHTML;
  });
};

// Faccio oggetto per limitare risultato API
const parametri = {
  _limit: 5,
};

// Faccio chiamato API tramite axios
axios
  .get("https://jsonplaceholder.typicode.com/photos", {
    params: parametri,
    timeout: 5000,
  })
  .then((apiResponse) => {
    // console.log("Ho ricevuto risposta dall'api", apiResponse);
    arrayOggettiAPI = apiResponse.data;
    console.log(arrayOggettiAPI);

    // Ottenuto l'array degli oggetti dall'API lo mandiamo come parametroa alla funzione che ci fa gli elementi e li inserisce in rowElement
    insertHTML(rowElement, arrayOggettiAPI);
  });
