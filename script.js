
/* ==========================================
   NOVA STREET — CATALOGO DEMO
   Configurazione del negozio
========================================== */

// Per riutilizzare il catalogo con un altro negozio,
// modifica questi valori.
const store = {
    name: "NOVA STREET",
    subtitle: "SNEAKERS · STREETWEAR · DAILY STYLE",
    description:
        "Scopri la nostra selezione di sneakers, abbigliamento e accessori. Trova i tuoi preferiti e contattaci per informazioni e disponibilità.",

    // Numero WhatsApp con prefisso internazionale,
    // senza + e senza spazi.
    whatsapp: "393401220154",

    // Colori personalizzabili del negozio.
    colors: {
        background: "#f7f7f5",
        surface: "#ffffff",
        text: "#20201e",
        muted: "#777772",
        line: "#e6e6e1",
        accent: "#d8f36a",
        buttonBackground: "#20201e",
        buttonText: "#ffffff"
    }
};


/* ==========================================
   DATI DIMOSTRATIVI DEI PRODOTTI
========================================== */

const products = [
    {
        id: 1,
        name: "Sneaker Training Verde Fluo",
        category: "Sneakers",
        price: 89.90,
        sizes: ["40", "41", "42", "43"],
        colors: ["Verde fluo", "Bianco"],
        description: "Sneaker sportiva dal colore deciso.",
        image: "images/sneaker-01.jpg"
    },
    {
        id: 2,
        name: "Sneaker Bordeaux",
        category: "Sneakers",
        price: 69.90,
        sizes: ["40", "41", "42", "43"],
        colors: ["Bordeaux", "Bianco"],
        description: "Un classico in tela e camoscio.",
        image: "images/sneaker-02.jpg"
    },
    {
        id: 3,
        name: "Sneaker Bianca",
        category: "Sneakers",
        price: 79.90,
        sizes: ["40", "41", "42", "43"],
        colors: ["Bianco"],
        description: "Pelle bianca traforata, facile da abbinare.",
        image: "images/sneaker-03.jpg"
    },
    {
        id: 4,
        name: "Felpa Girocollo Nera",
        category: "Abbigliamento",
        price: 49.90,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Nero"],
        description: "Felpa oversize con piccolo ricamo.",
        image: "images/felpa-01.jpg"
    },
    {
        id: 5,
        name: "Maglione Jacquard",
        category: "Abbigliamento",
        price: 79.90,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Panna"],
        description: "Maglione in maglia con grafica jacquard.",
        image: "images/felpa-02.jpg"
    },
    {
        id: 6,
        name: "T-shirt Grafica Anime",
        category: "Abbigliamento",
        price: 29.90,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Nero"],
        description: "T-shirt oversize con stampa colorata.",
        image: "images/tshirt-01.jpg"
    },
    {
        id: 7,
        name: "Pantalone Chino Nero",
        category: "Abbigliamento",
        price: 54.90,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Nero"],
        description: "Taglio slim, adatto a ogni occasione.",
        image: "images/pantalone-01.jpg"
    },
    {
        id: 8,
        name: "Cappellino Denim Palma",
        category: "Accessori",
        price: 24.90,
        sizes: ["Unica"],
        colors: ["Azzurro denim"],
        description: "Cappellino in denim con palma ricamata.",
        image: "images/cappellino-01.jpg"
    },
    {
        id: 9,
        name: "Zaino Verde Oliva",
        category: "Accessori",
        price: 89.90,
        sizes: ["Unica"],
        colors: ["Verde oliva", "Cuoio"],
        description: "Zaino con dettagli in pelle e tasca frontale.",
        image: "images/zaino-01.jpg"
    }
];


/* ==========================================
   ELEMENTI HTML
========================================== */

const storeNameElements = [
    document.getElementById("store-name"),
    document.getElementById("footer-store-name")
].filter(Boolean);

const storeSubtitle = document.getElementById("store-subtitle");
const heroDescription = document.getElementById("hero-description");

const productGrid = document.getElementById("product-grid");
const productCount = document.getElementById("product-count");
const emptyMessage = document.getElementById("empty-message");

const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const categoryList = document.getElementById("category-list");
const generalWhatsapp = document.getElementById("general-whatsapp");


/* ==========================================
   STATO DEL CATALOGO
========================================== */

let selectedCategory = "Tutti";


/* ==========================================
   FUNZIONI DI SUPPORTO
========================================== */

function formatPrice(price) {
    return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR"
    }).format(price);
}


function getSizesLabel(sizes) {
    if (!Array.isArray(sizes) || sizes.length === 0) {
        return "Taglie da verificare";
    }

    if (sizes.length === 1) {
        return sizes[0] === "Unica"
            ? "Taglia unica"
            : "Taglia " + sizes[0];
    }

    return "Taglie: " + sizes.join(", ");
}


function isWhatsappConfigured() {
    return /^\d{8,15}$/.test(String(store.whatsapp));
}


function openWhatsapp(message) {
    if (!isWhatsappConfigured()) {
        alert(
            "Per attivare WhatsApp, inserisci in script.js il numero del negozio " +
            "con prefisso internazionale, senza + e senza spazi."
        );
        return;
    }

    const url =
        "https://wa.me/" +
        store.whatsapp +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
}


function createTextElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = textContent;

    return element;
}


/* ==========================================
   PERSONALIZZAZIONE DEL NEGOZIO
========================================== */

function configureStore() {
    // Nome del negozio nella pagina e nel footer.
    storeNameElements.forEach((element) => {
        element.textContent = store.name;
    });

    // Sottotitolo e descrizione.
    if (storeSubtitle) {
        storeSubtitle.textContent = store.subtitle;
    }

    if (heroDescription) {
        heroDescription.textContent = store.description;
    }

    // Applica i colori configurati sopra.
    const root = document.documentElement;

    root.style.setProperty("--bg", store.colors.background);
    root.style.setProperty("--surface", store.colors.surface);
    root.style.setProperty("--text", store.colors.text);
    root.style.setProperty("--muted", store.colors.muted);
    root.style.setProperty("--line", store.colors.line);
    root.style.setProperty("--accent", store.colors.accent);
    root.style.setProperty("--button-bg", store.colors.buttonBackground);
    root.style.setProperty("--button-text", store.colors.buttonText);

    // Pulsante WhatsApp generale.
    if (generalWhatsapp) {
        generalWhatsapp.addEventListener("click", (event) => {
            event.preventDefault();

            openWhatsapp(
                "Ciao! Vorrei ricevere informazioni sui vostri prodotti."
            );
        });
    }

    // Gestione del logo: viene eseguita subito,
    // non quando si clicca su WhatsApp.
    const storeLogo = document.getElementById("store-logo");
    const brandMark = document.getElementById("brand-mark");

    if (storeLogo) {
        storeLogo.alt = "Logo " + store.name;

        // Limita le dimensioni del logo.
        storeLogo.style.width = "36px";
        storeLogo.style.height = "36px";
        storeLogo.style.maxWidth = "36px";
        storeLogo.style.maxHeight = "36px";
        storeLogo.style.objectFit = "contain";
        storeLogo.style.flexShrink = "0";

        const showLogo = () => {
            storeLogo.hidden = false;

            if (brandMark) {
                brandMark.hidden = true;
            }
        };

        const showFallback = () => {
            storeLogo.hidden = true;

            if (brandMark) {
                brandMark.hidden = false;
            }
        };

        storeLogo.addEventListener("load", showLogo, { once: true });
        storeLogo.addEventListener("error", showFallback, { once: true });

        // Gestisce anche un'immagine già caricata.
        if (storeLogo.complete) {
            if (storeLogo.naturalWidth > 0) {
                showLogo();
            } else {
                showFallback();
            }
        }
    }
}


/* ==========================================
   CREAZIONE DELLE SCHEDE PRODOTTO
========================================== */

function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";

    // Contenitore dell'immagine.
    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.decoding = "async";

    // Gestisce le immagini mancanti.
    image.addEventListener("error", () => {
        image.hidden = true;
        imageWrap.classList.add("image-unavailable");
        imageWrap.setAttribute("role", "img");
        imageWrap.setAttribute(
            "aria-label",
            "Foto non disponibile per " + product.name
        );
    }, { once: true });

    imageWrap.appendChild(image);

    // Categoria, nome, prezzo e taglie.
    const category = createTextElement(
        "p",
        "product-category",
        product.category
    );

    const name = createTextElement(
        "h3",
        "product-name",
        product.name
    );

    const price = createTextElement(
        "p",
        "product-price",
        formatPrice(product.price)
    );

    const sizes = createTextElement(
        "p",
        "product-sizes",
        getSizesLabel(product.sizes)
    );

    // Colori disponibili.
    const variants = document.createElement("p");
    variants.className = "product-variants";

    const colorLabel = createTextElement(
        "span",
        "variant-label",
        "Colori: "
    );

    variants.append(
        colorLabel,
        document.createTextNode(
            Array.isArray(product.colors) && product.colors.length
                ? product.colors.join(", ")
                : "da verificare"
        )
    );

    // Descrizione.
    const description = createTextElement(
        "p",
        "product-description",
        product.description || "Contattaci per maggiori informazioni."
    );

    // Pulsante WhatsApp della singola scheda.
    const button = createTextElement(
        "button",
        "product-button",
        "Chiedi su WhatsApp"
    );

    button.type = "button";

    button.addEventListener("click", () => {
        const message = [
            "Ciao! Vorrei informazioni su questo prodotto:",
            "",
            "Prodotto: " + product.name,
            "Prezzo indicativo: " + formatPrice(product.price),
            "Taglie indicate: " + (product.sizes || []).join(", "),
            "Colori indicati: " + (product.colors || []).join(", "),
            "",
            "Mi confermate la disponibilità e le varianti?"
        ].join("\n");

        openWhatsapp(message);
    });

    // Inserisce tutti gli elementi nella scheda.
    article.append(
        imageWrap,
        category,
        name,
        price,
        sizes,
        variants,
        description,
        button
    );

    return article;
}


/* ==========================================
   FILTRAGGIO E ORDINAMENTO
========================================== */

function getVisibleProducts() {
    const searchTerm = searchInput
        ? searchInput.value.trim().toLocaleLowerCase("it")
        : "";

    let visibleProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "Tutti" ||
            product.category === selectedCategory;

        const searchableText = [
            product.name,
            product.category,
            product.description,
            ...(product.colors || []),
            ...(product.sizes || [])
        ].join(" ").toLocaleLowerCase("it");

        const matchesSearch = searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    const sortOption = sortSelect
        ? sortSelect.value
        : "featured";

    if (sortOption === "price-asc") {
        visibleProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
        visibleProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
        visibleProducts.sort((a, b) =>
            a.name.localeCompare(b.name, "it")
        );
    }

    return visibleProducts;
}


/* ==========================================
   AGGIORNAMENTO DEL CATALOGO
========================================== */

function renderProducts() {
    if (!productGrid) return;

    const visibleProducts = getVisibleProducts();

    productGrid.replaceChildren();

    visibleProducts.forEach((product) => {
        productGrid.appendChild(createProductCard(product));
    });

    if (productCount) {
        productCount.textContent =
            visibleProducts.length +
            (visibleProducts.length === 1
                ? " prodotto"
                : " prodotti");
    }

    if (emptyMessage) {
        emptyMessage.hidden = visibleProducts.length !== 0;
    }
}


/* ==========================================
   EVENTI DELLA PAGINA
========================================== */

// Ricerca mentre l'utente digita.
if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
}

// Ordinamento per prezzo o nome.
if (sortSelect) {
    sortSelect.addEventListener("change", renderProducts);
}

// Filtri per categoria.
if (categoryList) {
    categoryList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-category]");

        if (!button) return;

        selectedCategory = button.dataset.category;

        categoryList
            .querySelectorAll(".category-button")
            .forEach((categoryButton) => {
                const isActive = categoryButton === button;

                categoryButton.classList.toggle("active", isActive);

                categoryButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

        renderProducts();
    });
}


/* ==========================================
   AVVIO DELLA PAGINA
========================================== */

configureStore();
renderProducts();
