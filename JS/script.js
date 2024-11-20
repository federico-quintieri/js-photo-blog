// Prendiamo elementi HTML

const rowElement = document.querySelector(".row");
// console.log(rowElement);

let arrayOggettiAPI = "";

// Devo fare una funzione che inserisce una stringa HTML in un certo elemento
const insertHTML = (baseHTML, arrayElementi) => {
  // Accetto un array di oggetti contenenti le informazioni che mi servono

  let stringHTML = "";
  arrayElementi.forEach((currElement) => {
    // Destructuring elemento oggetto
    const { title, thumbnailUrl } = currElement;
    // console.log(title, url, thumbnailUrl);

    // console.log(currElement);

    // Ho creato un nuovo attributo 'data-img-url' nella creazione della card dove ho inserito l'url dell'immagine
    stringHTML = `<div class="col  p-2 d-flex justify-content-center col-lg-4">
            <div class="card p-2" style="width: 18rem" data-img-url="${thumbnailUrl}">
              <img id="pin" src="./img/pin.svg" alt="" />
              <img src="${thumbnailUrl}" class="card-img-top real-img-card" alt="..." />
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
  })
  .then((apiResponse) => {
    //  console.log("Ho ricevuto risposta dall'api", apiResponse);
    arrayOggettiAPI = apiResponse.data;
    // console.log("risposta api", apiResponse);
    // console.log(
    //   "questo é l'array degli oggetti presi dalla api",
    //   arrayOggettiAPI
    // );

    // Ottenuto l'array degli oggetti dall'API lo mandiamo come parametroa alla funzione che ci fa gli elementi e li inserisce in rowElement
    insertHTML(rowElement, arrayOggettiAPI);

    // Prendo tutte le immagini nelle card e le mettiamo in un array di elementi
    const arrayImgCard = document.querySelectorAll(".real-img-card");
    // console.log(arrayImgCard);

    checkAttributo(arrayImgCard);
  });

const overlayDIV = document.getElementById("overlay-div");
// console.log(overlayDIV);

const btnCloseOverlay = document.getElementById("btnCloseOverlay");
console.log(btnCloseOverlay);

btnCloseOverlay.addEventListener("click", (event) => {
  event.preventDefault();
  overlayDIV.classList.toggle("d-none");
});

function checkAttributo(arrayElementi) {
  // Itero l'array che contiene le card html
  arrayElementi.forEach((currElement, currIndex) => {
    // Controllo il src attribute delle immagini prese
    // console.log(currElement.getAttribute("src"));

    // Prendo il search dell'elemento e lo metto in una variabile
    const srcAttributo = currElement.getAttribute("src");

    // Aggiungo un evento click all'elemento img
    currElement.addEventListener("click", (event) => {
      // Impedisco l'aggiornamento della pagina
      event.preventDefault();

      overlayDIV.classList.toggle("d-none");
    });
  });
}

// Se io clicco su un'immagine, posso estrapolare il src e metterlo in una variabile
