/* ==========================================
   SMALLVINTAG3 — CONFIGURAZIONE DEL NEGOZIO
   Per riutilizzare il catalogo con un altro
   negozio modifica solo questo file e
   products.js. Non serve toccare script.js.
========================================== */

const store = {
    name: "SmallVintag3",

    // Titolo della scheda del browser.
    title: "SmallVintag3 | Abbigliamento vintage",

    subtitle: "ABBIGLIAMENTO VINTAGE · DETTAGLIO E INGROSSO",
    description:
        "Capi vintage selezionati, al dettaglio e all'ingrosso. Scopri i pezzi e le box disponibili e scrivici su WhatsApp per informazioni e disponibilità.",

    // Numero WhatsApp con prefisso internazionale,
    // senza + e senza spazi. Esempio: 393331234567
    whatsapp: "393409843901",

    // I pezzi con sold: true vanno in fondo all'elenco.
    // Metti false per lasciarli dove sono.
    soldAtEnd: true,

    // Foglio Google con i prodotti (link CSV di "Pubblica sul web").
    // Se lo lasci vuoto, il catalogo usa products.js.
    sheetUrl: "",

    // Pulsanti dei filtri, nell'ordine in cui compaiono ("Tutti" c'è già).
    // Se cancelli questa riga, le categorie si ricavano dai prodotti.
    categories: ["Box Ingrosso", "T-shirt", "Felpe", "Pantaloni", "Capispalla"],
    // Colori del negozio: tema scuro con verde acido.
    // Se ne cancelli uno, resta quello predefinito di style.css.
    colors: {
        background: "#0a0a0a",
        surface: "#141414",
        text: "#f4f4f0",
        muted: "#9a9a94",
        line: "#2a2a28",

        // Verde acido: dettagli e pulsanti.
        // onAccent è il colore del testo scritto sopra.
        accent: "#c8ff00",
        onAccent: "#0a0a0a",

        buttonBackground: "#c8ff00",
        buttonText: "#0a0a0a",

        bannerBackground: "#141414",
        imageBackground: "#1c1c1a",

        // Parte alta della pagina. Facoltativi: se li cancelli,
        // la parte alta usa il colore accent come sfondo.
        heroBackground: "#0a0a0a",
        heroText: "#f4f4f0",
        heroHighlight: "#c8ff00"
    }
};

// Logo: salva il file in logos/smallvintag3.png (vedi index.html).
// Se il file manca, il catalogo mostra solo il nome del negozio.