import api from "./axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(api, { delayResponse: 500 });

// Simular la lista general de proyectos
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

// REGLA ESPECÍFICA DE TAREAS PRIMERO
// (Debe ir ANTES de la regla genérica de proyectos para que no la atrape primero)
mock.onGet(/\/projects\/[^/]+\/tasks\/[^/]+$/).reply((config) => {
  const taskId = config.url?.split('/').pop();

  if (taskId === 'not-found') {
    return [404, { error: 'La tarea no existe o fue eliminada' }];
  }

  return [
    200,
    {
      id: taskId || 't1',
      name: 'Diseñar interfaz de tareas',
      description: 'Crear componentes de TaskList y TaskCard en React con Tailwind.',
      proyect_id: '1',
      status: 'IN_PROGRESS',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
  ];
});

// Simular el detalle de un proyecto por ID (REGLA GENÉRICA ABAJO)
mock.onGet(/\/projects\/[^/]+$/).reply(200, {
  id: "1",
  projectName: "Proyecto de Prueba (Mock)",
  clientName: "Cliente Ejemplo",
  description: "Descripción de prueba mientras Supabase se restablece.",
  tasks: [
    {
      id: "t1",
      name: "Diseñar interfaz de tareas",
      description: "Crear componentes of TaskList y TaskCard",
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
});

// PUT y DELETE de tareas
mock.onPut(/\/projects\/.+\/tasks\/.+/).reply(200, {
  message: "Tarea actualizada correctamente"
});

mock.onDelete(/\/projects\/.+\/tasks\/.+/).reply(200, {
  message: "Tarea eliminada correctamente"
});

// Actualizar únicamente el estado de una tarea
mock.onPost(/\/projects\/[^/]+\/tasks\/[^/]+\/status$/).reply((config) => {
  const { status } = JSON.parse(config.data || '{}');

  if (!status) {
    return [400, { error: "El nuevo estado es requerido" }];
  }

  return [
    200,
    {
      message: "Estado de la tarea actualizado correctamente",
      status
    }
  ];
});