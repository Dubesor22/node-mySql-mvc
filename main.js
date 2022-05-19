const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());

const port = 3000;

///////////// DB CONECTION //////////////////////

const db = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "123456",

  database: "expressDB",
});

db.connect();

///////////////ENDPOINTS/////////////////////////

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE expressDB";

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send("Database created...");
  });
});

app.get("/createtable_products", (req, res) => {
  let sql =
    "CREATE TABLE products(id int AUTO_INCREMENT,product_name VARCHAR(55), Price int, PRIMARY KEY(id))";

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send("Products table created...");
  });
});

app.get("/createtable_categories", (req, res) => {
  let sql =
    "CREATE TABLE categories(id int AUTO_INCREMENT,category_name VARCHAR(55), category_body VARCHAR(255), PRIMARY KEY(id))";

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send("Categories table created...");
  });
});

app.get("/createtable_mixed", (req, res) => {
  let sql =
    "CREATE TABLE products_categories(id int AUTO_INCREMENT, product_id int, categories_id int,  FOREIGN KEY(product_id) REFERENCES expressDB.products(id), FOREIGN KEY(categories_id) REFERENCES expressDB.categories(id), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send("mixed table created....");
  });
});

// Ejercicio 2
// Crea un endpoint para añadir un producto nuevo y añade 2 productos nuevos desde el postman
// Crea un endpoint para crear una categoría y añade 2 categorías nuevas desde el postman

app.post("/create_element", (req, res) => {
  let sql = `INSERT INTO products (product_name, Price ) values ('maquina de tatuar xion', 1500), ('agujas Magnum 13mm', 100);`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send("element added...");
  });
});

app.post("/create_category", (req, res) => {
  let sql = `INSERT INTO categories (category_name, category_body ) values ('Maquinas', 'maquinas paratatuaje rotativas'), ('agujas', 'agujas de linea');`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send("category added...");
  });
});

// Ejercicio 3
// Crea un endpoint para actualizar un producto.

app.put("/product_update/:id", (req, res) => {
  let update = req.body.nombre;

  let sql = `UPDATE products SET product_name = '${update}' WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send("Product updated...");
  });
});

// Crea un endpoint para actualizar una categoría.

app.put("/category_update/:id", (req, res) => {
  let update = req.body.nombre;

  let sql = `UPDATE categories SET category_name = '${update}' WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send("category updated...");
  });
});

//  Ejercicio 4

///////////////COMPROBADORES//////////////////////////////

// Crea un endpoint que muestre todos los productos
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products;", (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send(result);
  });
});
// Crea un endpoint que muestre todas las categorías
app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories;", (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send(result);
  });
});

//Crea un endpoint que muestra todos los productos con sus categorías
app.get("/productoscategorias", (req, res) => {
  db.query("SELECT * FROM productoscategorias;", (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

// Crea un endpoint donde puedas seleccionar un producto por id

app.get("/productid/:id", (req, res) => {
  let sql = `SELECT * FROM products WHERE id = ${req.params.id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

// Crea un endpoint que muestre de forma descendente los productos.
app.get("/productdesc", (req, res) => {
  let sql = `SELECT * FROM products ORDER BY id DESC;`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

// Crea un endpoint donde puedas seleccionar una categoría por id

app.get("categoryid/:id", (req, res) => {
  let sql = `SELECT * FROM categories where id = ${req.params.id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Crea un endpoint donde puedas buscar un producto por su nombre

app.get("/productname/:name", (req, res) => {
  let sql = `SELECT * FROM products WHERE product_name = ${req.params.name};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//5.DELETE by id

app.delete("/delete_products/:id", (req, res) => {
  let sql = `DELETE FROM products WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send("Post deleted");
  });
});
/// llamada al Listen

app.listen(port, () => {
  console.log(`servidor levantado en el Puerto: ${port}`);
});
