import colors from "colors";
import app from "./server.js";
import { prisma } from "./config/prisma";

const port = process.env.PORT || 4000;

async function main() {
  try {
    // Verificar conexión rápida con la base de datos vía Prisma
    await prisma.$connect();
    console.log(colors.magenta.bold("Base de datos conectada con éxito vía Prisma"));

    // Arrancar el servidor escuchando en el puerto
    app.listen(port, () => {
      console.log(colors.cyan.bold(`REST API funcionando en el puerto ${port}`));
    });
  } catch (error) {
    console.error(colors.red.bold("Error al conectar con la base de datos:"), error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();