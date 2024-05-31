/* PRIMER ENTREGA 
   Nombre: Tur Valentin
   Carrera: Tecnicatura Universitaria en Tecnologias Web

  Rest API Crud 
  Métodos:
  . GET /autos
  . POST /autos
  . GET /autos/:id
  . PUT /autos/:id
  . DELETE /autos/:id
*/

//Mi trabajo se basa en una Rest Api de una Consecionaria/Local/Casa de compra-venta de autos usados. Utilizando los distintos métodos HTTP para hacer funcional el proyecto. Con .GET se obtiene la lista de todos los autos disponibles para ser comprados y tambien dependiendo de la URL se puede obtener un auto en particular. Con .POST se realiza la carga de un auto a la lista con sus respectivas características (Al comprar un auto, este se agrega a la lista de autos disponibles). Con .PUT se puede actualizar cualquier característica de cualquier auto (como por ejemplo actualizar el precio de un vehiculo). Y finalizando con .DELETE te permite sacar un vehiculo de la lista de autos disponibles para la compra (Por ejemplo si un auto es comprado, este se elimine de la lista para no generar confusiones en el usuario).

const express = require("express");
const morgan = require("morgan");

const app = express();

let autos = [];
autos.push({
  Modelo: "Toyota Corolla",
  Precio: 14000,
  Km: 10500,
  Año: 2012,
  id: 1,
  Disponible: true,
});
autos.push({
  Modelo: "Honda Civic",
  Precio: 17000,
  Km: 89000,
  Año: 2017,
  id: 2,
  Disponible: true,
});

autos.push({
  Modelo: "Ford Focus",
  Precio: 12000,
  Km: 97000,
  Año: 2015,
  id: 3,
  Disponible: false,
});

autos.push({
  Modelo: "Volkswagen Gol Power",
  Precio: 6000,
  Km: 146000,
  Año: 2007,
  id: 4,
  Disponible: true,
});

app.use(morgan("dev"));
app.use(express.json());

app.get("/autos", (req, res) => {
  const autosDisponibles = autos.filter((auto) => auto.disponible);
  res.json(autosDisponibles);
});

app.post("/autos", (req, res) => {
  const nuevoAuto = req.body;
  nuevoAuto.id = autos.length + 1;
  nuevoAuto.disponible = true;
  autos.push(nuevoAuto);
  res.status(201).json(console.log("Vehículo agregado correctamente."));
});

app.put("/autos/:id", (req, res) => {
  const autoId = parseInt(req.params.id);
  const updatedData = req.body;

  const autoIndex = autos.findIndex((auto) => auto.id === autoId);
  if (autoIndex !== -1) {
    autos[autoIndex] = { ...autos[autoIndex], ...updatedData };
    res.json(console.log("Vehículo actualizado correctamente."));
  } else {
    res.status(404).json({ error: "Vehículo no encontrado." });
  }
});

app.delete("/autos/:id", (req, res) => {
  const autoId = parseInt(req.params.id);

  const index = autos.findIndex((auto) => auto.id === autoId);
  if (index !== -1) {
    autos.splice(index, 1);
    res.json(console.log("Vehículo eliminado correctamente."));
  } else {
    res.status(404).json({ error: "Vehículo no encontrado." });
  }
});

app.get("/autos/:id", (req, res) => {
  const autoId = parseInt(req.params.id);

  const auto = autos.find((auto) => auto.id === autoId);
  if (auto) {
    res.json(auto);
  } else {
    res.status(404).json({ error: "Vehículo no encontrado." });
  }
});

app.listen(3000, () => {
  console.log("Servidor escuchando en puerto 3000...");
});
