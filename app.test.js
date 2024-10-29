const request = require("supertest");
const { app, closeServer } = require("./app");

describe("Test API gestione libri", () => {
  it("GET /api/libri - dovrebbe restituire un array vuoto di libri", async () => {
    const res = await request(app).get("/api/libri");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/libri - dovrebbe aggiungere un nuovo libro", async () => {
    const nuovoLibro = {
      title: "Il libro dei test",
      description: "Descrizione del libro",
      quantity: 5,
      price: 9.99,
      author: "Mario Rossi",
    };

    const res = await request(app).post("/api/libri").send(nuovoLibro);
    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toBe(nuovoLibro.nome);
    expect(res.body.quantita).toBe(nuovoLibro.quantita);
  });

  it("GET /api/libri/:codice - dovrebbe restituire un singolo libro", async () => {
    const nuovoLibro = {
      title: "Il libro singolo",
      description: "Descrizione singola",
      quantity: 3,
      price: 15.99,
      author: "Luca Bianchi",
    };

    const postRes = await request(app).post("/api/libri").send(nuovoLibro);

    const codiceLibro = postRes.body.id;

    const getRes = await request(app).get(`/api/libri/${codiceLibro}`);
    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body.title).toBe(nuovoLibro.title);
  });

  afterAll((done) => {
    closeServer();
    done();
  });
});
