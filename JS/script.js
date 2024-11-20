//-----------------------------------\\
// ELEMNTI HTML
//-----------------------------------\\

// Prendiamo la row
const rowElement = document.querySelector(".row");
// console.log(rowElement);

// Prendiamo elemento overlay div
const overlayDIV = document.getElementById("overlay-div");
// console.log(overlayDIV);

// Prendiamo l'elemento button nel modale
const btnCloseOverlay = document.getElementById("btnCloseOverlay");
// console.log(btnCloseOverlay);

// Seleziono il div modale
const modalDiv = document.getElementById("modal-div");
// console.log(modalDiv);

const imgModal = document.getElementById("img-in-modal");
// console.log(imgModal);

//-----------------------------------\\
// FUNZIONI
//-----------------------------------\\

// Funzione che inserisce le card
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
            <div class="card p-2" style="width: 18rem">
              <img id="pin" src="./img/pin.svg" alt="" />
              <img src="${thumbnailUrl}" class="card-img-top real-img-card" alt="..." />
              <div class="card-body">
                <p class="card-text">
                  ${title}
                </p>
              </div>
              <div class="text-center">
                <button class="btn btn-danger btnCancellaCard">
                  Cancella Card
                </button>
              </div>
            </div>
          </div>`;

    // Faccio una stringa con i dati html presi dall'oggetto e la mando all' html
    // stringHTML += ;
    baseHTML.innerHTML += stringHTML;
  });
};

// Funzione che al click di una card mostra il modal e cambia url dell'immagine in esso
const checkAttributo = (arrayElementi) => {
  // Itero l'array che contiene le img card html
  arrayElementi.forEach((currElement, currIndex) => {
    // Controllo il src attribute delle immagini prese
    // console.log(currElement.getAttribute("src"));

    // Prendo il search dell'elemento e lo metto in una variabile
    const srcAttributo = currElement.getAttribute("src");

    // Aggiungo un evento click all'elemento img
    currElement.addEventListener("click", (event) => {
      // Impedisco l'aggiornamento della pagina
      event.preventDefault();

      // Disattivo la classe d-none dell'elemento overlayDIV
      overlayDIV.classList.toggle("d-none");

      // Mi crea un elemento immagine html con il giusto percorso url che sarebbe il src dell'immagine iniziale
      imgModal.setAttribute("src", srcAttributo);
    });
  });
};

//-----------------------------------\\
// EVENTI GLOBALI
//-----------------------------------\\

// Aggiungo un evento click al button dell'overlay
btnCloseOverlay.addEventListener("click", (event) => {
  event.preventDefault();
  overlayDIV.classList.toggle("d-none");
});

//-----------------------------------\\
// API CALL
//-----------------------------------\\

axios
  .get("https://jsonplaceholder.typicode.com/photos?_limit=5")
  .then((apiResponse) => {
    let arrayOggettiAPI = apiResponse.data;
    // console.log("risposta api", apiResponse);
    // console.log(
    //   "questo é l'array degli oggetti presi dalla api",
    //   arrayOggettiAPI
    // );

    // Ottenuto l'array degli oggetti dall'API lo mandiamo come parametro alla funzione che ci fa gli elementi e li inserisce in rowElement
    insertHTML(rowElement, arrayOggettiAPI);

    // Prendo tutte le immagini nelle card e le mettiamo in un array di elementi
    const arrayImgCard = document.querySelectorAll(".real-img-card");
    // console.log(arrayImgCard);

    checkAttributo(arrayImgCard);

    // Prendiamo tutte le colonne/cards e le mettiamo in un array
    const arrayCards = document.querySelectorAll(".col");
    // console.log(arrayCards);

    // Prendiamo un array con i nostri button nelle card
    const btnCancellaCard = document.querySelectorAll(".btnCancellaCard");
    // console.log(btnCancellaCard);

    // Ciclo for che itera elementi Cancella Button (uno per card)
    for (let i = 0; i < btnCancellaCard.length; i++) {
      const currButton = btnCancellaCard[i];
      // console.log(currButton + " " + i);

      currButton.addEventListener("click", (event) => {
        event.preventDefault();

        arrayCards[i].classList.add("d-none");
      });
    }
  });
