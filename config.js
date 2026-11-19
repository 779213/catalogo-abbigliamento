
/* ==========================================
   SMALLVINTAG3 — CONFIGURAZIONE NEGOZIO
   Per personalizzare il catalogo modifica questo file.
========================================== */

const store = {
    name: "SmallVintag3",

    title: "SmallVintag3 | Abbigliamento vintage",

    subtitle: "ABBIGLIAMENTO VINTAGE · DETTAGLIO E INGROSSO",

    description: "Capi vintage selezionati, al dettaglio e all'ingrosso. Scopri i pezzi e le box disponibili e scrivici su WhatsApp per informazioni e disponibilità.",

    // Inserisci il numero internazionale senza + e senza spazi.
    whatsapp: "+393409843901",

    // I prodotti venduti vengono mostrati in fondo.
    soldAtEnd: true,

    // Lascia vuoto se non utilizzi Google Sheets.
    sheetUrl: "",

    // Attiva o disattiva le animazioni.
    animations: true,

    // Testi della fascia scorrevole.
    ticker: [
        "Vintage selezionato",
        "Dettaglio & ingrosso",
        "Pezzi unici",
        "Scopri le box disponibili"
    ],

    // Categorie del catalogo.
    categories: [
        "Box Ingrosso",
        "T-shirt",
        "Felpe",
        "Pantaloni",
        "Capispalla"
    ],

    // Identità grafica.
    colors: {
        background: "#0a0a0a",
        surface: "#141414",
        text: "#f4f4ef",
        muted: "#a3a39b",
        line: "#292929",

        accent: "#c8ff00",
        onAccent: "#0a0a0a",

        buttonBackground: "#c8ff00",
        buttonText: "#0a0a0a",

        bannerBackground: "#151515",
        imageBackground: "#1b1b1b",

        heroBackground: "#0a0a0a",
        heroText: "#f4f4ef",
        heroHighlight: "#c8ff00"
    }
};