/* ==========================================
   PRODOTTI DIMOSTRATIVI
   Sostituisci nomi, prezzi, taglie e foto con
   i dati reali del negozio. Le foto vanno nella
   cartella images/.
========================================== */

/*
   Campi di ogni prodotto:
   - image: una foto singola
   - images: più foto (scorrono nella card con frecce e swipe);
     se presente ha la precedenza su image
   - box: { pieces, weight } per le box all'ingrosso
     (al posto di sizes e colors)
*/

const products = [
    {
        id: 1,
        name: "T-shirt Nike",
        category: "T-shirt",
        price: 89.90,
        sizes: ["M"],
        image: "images/t-shirt-nike.jpg"
    },
    {
        id: 2,
        name: "Felpa Nike",
        category: "Felpe",
        price: 69.90,
        sizes: ["S"],
        image: "images/felpa-nike.jpg"
    },
    {
        id: 3,
        name: "Giacca Nike",
        category: "Capispalla",
        price: 79.90,
        sizes: ["XL"],
        image: "images/giacca-nike.jpg"
    },
    {
        id: 4,
        name: "Polo Lacoste",
        category: "T-shirt",
        price: 49.90,
        sizes: ["XL"],
        image: "images/polo-lacoste.jpg"
    },
    {
        id: 5,
        name: "T-shirt Adidas",
        category: "T-shirt",
        price: 79.90,
        sizes: ["L"],
        image: "images/t-shirt-adidas.jpg"
    },
    {
        id: 6,
        name: "Giacca Adidas",
        category: "Capispalla",
        price: 29.90,
        sizes: ["S"],
        image: "images/giacca-adidas.jpg"
    },
    {
        id: 7,
        name: "Felpa Adidas",
        category: "Felpe",
        price: 54.90,
        sizes: ["M"],
        image: "images/felpa-adidas.jpg"
    },
    {
        id: 8,
        name: "Maglione Moncler",
        category: "Felpe",
        price: 24.90,
        sizes: ["S"],
        image: "images/maglione-moncler.jpg"
    },

    {
        id: 9,
        name: "Box Streetwear Mix",
        category: "Box Ingrosso",
        price: 249.00,
        box: { pieces: 30, weight: "circa 12 kg" },
        images: [
            "images/box-ingrosso.jpg",
            "images/felpa-adidas.jpg",
            "images/felpa-nike.jpg",
            "images/maglione-moncler.jpg",
            "images/polo-lacoste.jpg"
        ]
    },
    {
        id: 10,
        name: "Box Abbigliamento Mix",
        category: "Box Ingrosso",
        price: 189.00,
        box: { pieces: 40, weight: "circa 8 kg" },
        sold: true,
        images: [
            "images/box-ingrosso.jpg",
            "images/t-shirt-adidas.jpg",
            "images/giacca-nike.jpg",
            "images/t-shirt-adidas.jpg",
            "images/t-shirt-nike.jpg",

        ]
    }
];