const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

let books = [];

// GET: Restituisci tutti i libri
app.get("/api/libri", (req, res) => {
  res.json(books);
});

// GET: Restituisci un libro
app.get("/api/libri/:codice", (req, res) => {
  const book = books.find(b => b.id === req.params.codice);
  book ? res.json(book) : res.status(404).send("Libro non trovato");
});

// POST: Aggiungi un nuovo libro
app.post("/api/libri", (req, res) => {
  const { title, description, quantity, price, author } = req.body;
  const newBook = {
    id: uuidv4(),
    title,
    description,
    quantity,
    price,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE: Elimina un libro
app.delete("/api/libri/:codice", (req, res) => {
  books = books.filter(b => b.id !== req.params.id);
  res.status(204).send();
});

// GET: libro la quantità di un libro
app.get("/api/libri/:codice/incrementa", (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (book) {
    book.quantity += 1;
    res.json(book);
  } else {
    res.status(404).send("Libro non trovato");
  }
});

// GET: Decrementa la quantità di un libro
app.get("/api/libri/:codice/decrementa", (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (book && book.quantity > 0) {
    book.quantity -= 1;
    res.json(book);
  } else {
    res.status(404).send("Libro non trovato o quantità non disponibile");
  }
});

// Lancia il server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`In ascolto sulla porta ${PORT}`);
});

// Metodo per fermare il server
const closeServer = () => {
  server.close();
};

module.exports = { app, closeServer };
