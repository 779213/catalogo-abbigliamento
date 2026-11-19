
/* ==========================================
   CATALOGO — CODICE PRINCIPALE
   Per personalizzare il negozio usa config.js
   e products.js.
========================================== */

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
            "Per attivare WhatsApp, inserisci in config.js il numero del negozio " +
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

const COLOR_VARIABLES = {
    background: "--bg",
    surface: "--surface",
    text: "--text",
    muted: "--muted",
    line: "--line",
    accent: "--accent",
    onAccent: "--on-accent",
    buttonBackground: "--button-bg",
    buttonText: "--button-text",
    bannerBackground: "--banner-bg",
    imageBackground: "--image-bg",
    heroBackground: "--hero-bg",
    heroText: "--hero-text",
    heroHighlight: "--hero-highlight"
};

function applyColors(colors) {
    if (!colors) return;

    const root = document.documentElement;

    Object.entries(COLOR_VARIABLES).forEach(([key, variable]) => {
        if (colors[key]) {
            root.style.setProperty(variable, colors[key]);
        }
    });
}

function setupLogo() {
    const storeLogo = document.getElementById("store-logo");
    const brandMark = document.getElementById("brand-mark");

    if (!storeLogo) return;

    storeLogo.alt = "Logo " + store.name;

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

    if (storeLogo.complete) {
        if (storeLogo.naturalWidth > 0) {
            showLogo();
        } else {
            showFallback();
        }
    }
}

function configureStore() {
    storeNameElements.forEach((element) => {
        element.textContent = store.name;
    });

    document.title = store.title || store.name;

    if (storeSubtitle) {
        storeSubtitle.textContent = store.subtitle;
    }

    if (heroDescription) {
        heroDescription.textContent = store.description;
    }

    applyColors(store.colors);

    if (generalWhatsapp) {
        generalWhatsapp.addEventListener("click", (event) => {
            event.preventDefault();

            openWhatsapp(
                "Ciao! Vorrei ricevere informazioni sui vostri prodotti."
            );
        });
    }

    setupLogo();
    setupMotion();
}

/* ==========================================
   MOVIMENTO E ANIMAZIONI
========================================== */

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver =
    "IntersectionObserver" in window &&
    !prefersReducedMotion &&
    store.animations !== false
        ? new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        })
        : null;

function revealOnScroll(element, delay) {
    if (!revealObserver || !element) return;

    element.classList.add("reveal");
    element.style.transitionDelay = delay + "ms";
    revealObserver.observe(element);
}

// Fascia scorrevole: i testi vengono letti da config.js.
function setupTicker() {
    if (!Array.isArray(store.ticker) || store.ticker.length === 0) {
        return;
    }

    const hero = document.querySelector(".hero");
    if (!hero) return;

    const repeats = Math.max(
        1,
        Math.ceil(12 / store.ticker.length)
    );

    const track = document.createElement("div");
    track.className = "ticker-track";

    // Due gruppi uguali permettono uno scorrimento continuo.
    for (let copy = 0; copy < 2; copy += 1) {
        const group = document.createElement("div");
        group.className = "ticker-group";

        if (copy === 1) {
            group.setAttribute("aria-hidden", "true");
        }

        for (let round = 0; round < repeats; round += 1) {
            store.ticker.forEach((text) => {
                group.appendChild(
                    createTextElement("span", "ticker-item", text)
                );
            });
        }

        track.appendChild(group);
    }

    const ticker = document.createElement("div");
    ticker.className = "ticker";
    ticker.appendChild(track);

    hero.after(ticker);
}

function setupMotion() {
    if (store.animations === false) {
        document.documentElement.classList.add("no-motion");
    }

    setupTicker();

    document
        .querySelectorAll(".section-heading, .contact-banner")
        .forEach((element) => revealOnScroll(element, 0));
}

/* ==========================================
   PRODOTTI E GALLERIE
========================================== */

function getProductImages(product) {
    if (Array.isArray(product.images) && product.images.length) {
        return product.images;
    }

    return product.image ? [product.image] : [];
}

function getBoxLabel(box) {
    return box.pieces
        ? "Box da " + box.pieces + " pezzi"
        : "Box all'ingrosso";
}

function createInfoLine(label, value) {
    const line = document.createElement("p");
    line.className = "product-variants";

    line.append(
        createTextElement("span", "variant-label", label),
        document.createTextNode(value)
    );

    return line;
}

// Crea il riquadro immagini di un prodotto.
// Se ci sono più immagini, abilita frecce, puntini e swipe.
function createGallery(product) {
    const sources = getProductImages(product);
    const slideCount = Math.max(sources.length, 1);

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const track = document.createElement("div");
    track.className = "product-gallery";
    imageWrap.appendChild(track);

    for (let index = 0; index < slideCount; index += 1) {
        const slide = document.createElement("div");
        slide.className = "product-slide";

        const markUnavailable = () => {
            slide.classList.add("image-unavailable");
            slide.setAttribute("role", "img");
            slide.setAttribute(
                "aria-label",
                "Foto non disponibile per " + product.name
            );
        };

        if (sources[index]) {
            const image = document.createElement("img");

            image.className = "product-image";
            image.src = sources[index];

            image.alt = sources.length > 1
                ? product.name + " - foto " +
                (index + 1) + " di " + sources.length
                : product.name;

            image.loading = "lazy";
            image.decoding = "async";

            image.addEventListener("error", () => {
                image.hidden = true;
                markUnavailable();
            }, { once: true });

            slide.appendChild(image);
        } else {
            markUnavailable();
        }

        track.appendChild(slide);
    }

    // Se c'è una sola foto, non servono i comandi della galleria.
    if (slideCount < 2) {
        return imageWrap;
    }

    track.tabIndex = 0;
    track.setAttribute("aria-label", "Foto di " + product.name);

    const dots = document.createElement("div");
    dots.className = "gallery-dots";
    dots.setAttribute("aria-hidden", "true");

    const dotElements = [];

    for (let index = 0; index < slideCount; index += 1) {
        const dot = document.createElement("span");
        dot.className = "gallery-dot";
        dots.appendChild(dot);
        dotElements.push(dot);
    }

    const getCurrentIndex = () =>
        track.clientWidth
            ? Math.round(track.scrollLeft / track.clientWidth)
            : 0;

    const updateDots = () => {
        const current = getCurrentIndex();

        dotElements.forEach((dot, index) => {
            dot.classList.toggle("active", index === current);
        });
    };

    const goTo = (index) => {
        const target = (index + slideCount) % slideCount;

        track.scrollTo({
            left: target * track.clientWidth,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    };

    const createArrow = (className, label, symbol, step) => {
        const arrow = createTextElement(
            "button",
            "gallery-arrow " + className,
            symbol
        );

        arrow.type = "button";
        arrow.setAttribute("aria-label", label + " di " + product.name);

        arrow.addEventListener("click", () => {
            goTo(getCurrentIndex() + step);
        });

        return arrow;
    };

    imageWrap.append(
        createArrow("gallery-arrow-prev", "Foto precedente", "‹", -1),
        createArrow("gallery-arrow-next", "Foto successiva", "›", 1),
        dots
    );

    track.addEventListener("scroll", updateDots, { passive: true });
    updateDots();

    return imageWrap;
}

/* ==========================================
   CREAZIONE SCHEDA PRODOTTO
========================================== */

function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";

    const isBox = Boolean(product.box);
    const isSold = product.sold === true;

    article.classList.toggle("is-sold", isSold);

    const imageWrap = createGallery(product);

    if (isSold) {
        imageWrap.appendChild(
            createTextElement("span", "product-badge", "Venduto")
        );
    }

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
        isBox
            ? formatPrice(product.price) + " / box"
            : formatPrice(product.price)
    );

    const sizes = createTextElement(
        "p",
        "product-sizes",
        isBox
            ? getBoxLabel(product.box)
            : getSizesLabel(product.sizes)
    );

    let variants = null;

    if (isBox) {
        if (product.box.weight) {
            variants = createInfoLine("Peso: ", product.box.weight);
        }
    } else {
        variants = createInfoLine(
            "Colori: ",
            Array.isArray(product.colors) && product.colors.length
                ? product.colors.join(", ")
                : "da verificare"
        );
    }

    const button = createTextElement(
        "button",
        "product-button",
        isSold ? "Venduto" : "Chiedi su WhatsApp"
    );

    button.type = "button";
    button.disabled = isSold;

    button.addEventListener("click", () => {
        const lines = isBox
            ? [
                "Ciao! Vorrei informazioni su questa box all'ingrosso:",
                "",
                "Box: " + product.name,
                "Prezzo box: " + formatPrice(product.price),
                ...(product.box.pieces
                    ? ["Pezzi: " + product.box.pieces]
                    : []),
                ...(product.box.weight
                    ? ["Peso: " + product.box.weight]
                    : []),
                "",
                "Mi confermate la disponibilità?"
            ]
            : [
                "Ciao! Vorrei informazioni su questo prodotto:",
                "",
                "Prodotto: " + product.name,
                "Prezzo indicativo: " + formatPrice(product.price),
                "Taglie indicate: " + (product.sizes || []).join(", "),
                "Colori indicati: " + (product.colors || []).join(", "),
                "",
                "Mi confermate la disponibilità e le varianti?"
            ];

        openWhatsapp(lines.join("\n"));
    });

    article.append(
        ...[
            imageWrap,
            category,
            name,
            price,
            sizes,
            variants,
            button
        ].filter(Boolean)
    );

    return article;
}

/* ==========================================
   FILTRAGGIO E ORDINAMENTO
========================================== */

function normalizeCategory(value) {
    return String(value || "").trim().toLowerCase();
}

function getVisibleProducts() {
    const searchTerm = searchInput
        ? searchInput.value.trim().toLocaleLowerCase("it")
        : "";

    let visibleProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "Tutti" ||
            normalizeCategory(product.category) ===
            normalizeCategory(selectedCategory);

        const searchableText = [
            product.name,
            product.category,
            ...(product.colors || []),
            ...(product.sizes || [])
        ].join(" ").toLocaleLowerCase("it");

        return matchesCategory && searchableText.includes(searchTerm);
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

    // I prodotti venduti vengono spostati in fondo.
    if (store.soldAtEnd !== false) {
        visibleProducts = [
            ...visibleProducts.filter((product) => product.sold !== true),
            ...visibleProducts.filter((product) => product.sold === true)
        ];
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

    visibleProducts.forEach((product, index) => {
        const card = createProductCard(product);

        // Le schede compaiono a scalare durante lo scorrimento.
        revealOnScroll(card, (index % 4) * 80);

        productGrid.appendChild(card);
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
   PULSANTI DELLE CATEGORIE
========================================== */

function getCategoryNames() {
    if (Array.isArray(store.categories) && store.categories.length > 0) {
        const listed = store.categories.map(normalizeCategory);

        const unlisted = [
            ...new Set(
                products
                    .filter((product) => product.category)
                    .filter((product) =>
                        !listed.includes(normalizeCategory(product.category))
                    )
                    .map((product) => product.category)
            )
        ];

        if (unlisted.length > 0) {
            console.warn(
                "Categorie dei prodotti non presenti in config.js:",
                unlisted
            );
        }

        return store.categories;
    }

    const names = [];

    products.forEach((product) => {
        const name = String(product.category || "").trim();

        if (
            name &&
            !names.some((other) =>
                normalizeCategory(other) === normalizeCategory(name)
            )
        ) {
            names.push(name);
        }
    });

    return names;
}

function renderCategoryButtons() {
    if (!categoryList) return;

    const categories = ["Tutti", ...getCategoryNames()];

    categoryList.replaceChildren();

    categories.forEach((categoryName) => {
        const isActive = categoryName === selectedCategory;

        const button = createTextElement(
            "button",
            "category-button" + (isActive ? " active" : ""),
            categoryName
        );

        button.type = "button";
        button.dataset.category = categoryName;
        button.setAttribute("aria-pressed", String(isActive));

        categoryList.appendChild(button);
    });
}

/* ==========================================
   EVENTI DELLA PAGINA
========================================== */

if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
}

if (sortSelect) {
    sortSelect.addEventListener("change", renderProducts);
}

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
   LETTURA CSV DA GOOGLE SHEETS
========================================== */

// Legge il CSV rispettando le virgolette e le virgole nelle celle.
function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;

    const source = text.replace(/^\uFEFF/, "");

    for (let index = 0; index < source.length; index += 1) {
        const char = source[index];

        if (inQuotes) {
            if (char === '"' && source[index + 1] === '"') {
                cell += '"';
                index += 1;
            } else if (char === '"') {
                inQuotes = false;
            } else {
                cell += char;
            }
        } else if (char === '"') {
            inQuotes = true;
        } else if (char === ",") {
            row.push(cell);
            cell = "";
        } else if (char === "\n" || char === "\r") {
            if (char === "\r" && source[index + 1] === "\n") {
                index += 1;
            }

            row.push(cell);
            cell = "";
            rows.push(row);
            row = [];
        } else {
            cell += char;
        }
    }

    if (cell !== "" || row.length > 0) {
        row.push(cell);
        rows.push(row);
    }

    return rows;
}

function parsePrice(value) {
    let text = String(value || "").replace(/[^\d.,-]/g, "");

    if (text.includes(",")) {
        text = text.replace(/\./g, "").replace(",", ".");
    }

    const price = parseFloat(text);

    return Number.isFinite(price) ? price : 0;
}

function toList(value) {
    return String(value || "")
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function isSoldValue(value) {
    return /^(si|sì|s|x|yes|true|1|venduto)$/i.test(
        String(value || "").trim()
    );
}

function resolveImage(value) {
    const driveMatch = value.match(
        /drive\.google\.com\/file\/d\/([\w-]+)/
    );

    if (driveMatch) {
        return "https://drive.google.com/thumbnail?id=" +
            driveMatch[1] + "&sz=w1000";
    }

    if (/^(https?:|data:|\/|images\/)/i.test(value)) {
        return value;
    }

    return "images/" + value;
}

function parseSheetProducts(csvText) {
    const rows = parseCsv(csvText);

    if (rows.length < 2) return [];

    const headers = rows[0].map((header) =>
        header.trim().toLowerCase()
    );

    return rows
        .slice(1)
        .map((row) => {
            const get = (columnName) => {
                const columnIndex = headers.indexOf(columnName);

                return columnIndex === -1
                    ? ""
                    : String(row[columnIndex] || "").trim();
            };

            return { get };
        })
        .filter(({ get }) => get("nome") !== "")
        .map(({ get }, index) => {
            const product = {
                id: index + 1,
                name: get("nome"),
                category: get("categoria") || "Altro",
                price: parsePrice(get("prezzo")),
                sizes: toList(get("taglie")),
                colors: toList(get("colori")),
                sold: isSoldValue(get("venduto")),
                images: [1, 2, 3, 4, 5]
                    .map((number) => get("foto" + number))
                    .filter(Boolean)
                    .map(resolveImage)
            };

            if (get("pezzi") !== "") {
                product.box = {
                    pieces: parseInt(get("pezzi"), 10) || undefined,
                    weight: get("peso")
                };
            }

            return product;
        });
}

function showLoadingMessage() {
    if (productCount) {
        productCount.textContent = "";
    }

    if (productGrid) {
        const message = createTextElement(
            "p",
            "empty-message",
            "Caricamento del catalogo…"
        );

        message.style.gridColumn = "1 / -1";
        productGrid.replaceChildren(message);
    }
}

async function loadProductsFromSheet() {
    try {
        const response = await fetch(store.sheetUrl, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("risposta " + response.status);
        }

        const loadedProducts = parseSheetProducts(
            await response.text()
        );

        if (loadedProducts.length === 0) {
            throw new Error("nessun prodotto trovato nel foglio");
        }

        products.splice(0, products.length, ...loadedProducts);

        console.info(
            "Catalogo caricato dal foglio Google: " +
            loadedProducts.length + " prodotti."
        );
    } catch (error) {
        console.warn(
            "Foglio Google non raggiungibile: uso i prodotti di products.js.",
            error
        );
    }
}

/* ==========================================
   AVVIO DELLA PAGINA
========================================== */

async function startCatalog() {
    configureStore();

    if (store.sheetUrl) {
        showLoadingMessage();
        await loadProductsFromSheet();
    }

    renderCategoryButtons();
    renderProducts();
}

startCatalog();