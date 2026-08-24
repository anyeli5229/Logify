import api from "./axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(api, { delayResponse: 500 });

// 1. Simular la lista general de proyectos (para DashboardView)
mock.onGet("/projects").reply(200, [
  {
    id: "1",
    projectName: "Proyecto de Prueba (Mock)",
    clientName: "Cliente Ejemplo",
    description: "Descripción de prueba mientras Supabase se restablece.",
    tasks: []
  },
  {
    id: "2",
    projectName: "E-Commerce App",
    clientName: "Tech Corp",
    description: "Tienda en línea desarrollada con React y Node.",
    tasks: []
  }
]);

// 2. Simular el detalle de un proyecto por ID (para ProjectDetailsView)
mock.onGet(/\/projects\/.+/).reply(200, {
  id: "1",
  projectName: "Proyecto de Prueba (Mock)",
  clientName: "Cliente Ejemplo",
  description: "Descripción de prueba mientras Supabase se restablece.",
  tasks: [
    {
      id: "t1",
      name: "Diseñar interfaz de tareas",
      description: "Crear componentes de TaskList y TaskCard",
      proyect_id: "1",
      status: "IN_PROGRESS"
    },
    {
      id: "t2",
      name: "Conectar formulario de agregar tarea",
      description: "Usar useMutation para crear nuevas tareas",
      proyect_id: "1",
      status: "PENDING"
    }
  ]
})

// Simular GET de una tarea individual
mock.onGet(/\/projects\/.+\/tasks\/.+/).reply(200, {
  id: "t1",
  name: "Diseñar interfaz de tareas",
  description: "Crear componentes de TaskList y TaskCard",
  proyect_id: "1",
  status: "IN_PROGRESS"
});

// Simular PUT/PATCH para actualizar tarea
mock.onPut(/\/projects\/.+\/tasks\/.+/).reply(200, {
  message: "Tarea actualizada correctamente"
});

// Simular DELETE para eliminar tarea
mock.onDelete(/\/projects\/.+\/tasks\/.+/).reply(200, {
  message: "Tarea eliminada correctamente"
});