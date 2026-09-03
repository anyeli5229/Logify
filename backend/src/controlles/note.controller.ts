import type { Request, Response } from "express"
import { noteSchema } from "../schemas/auth.schema";
import { formatearErroresZod } from "../utils/zodErrors";
import { prisma } from "../config/prisma";

export class NoteController {

    static createNote = async (req: Request<{ projectId: string; taskId: string }>, res: Response) => {
        try {
            const validation = noteSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) })
                return;
            }

            const { content } = validation.data;
            const taskId = req.task.id || req.params.taskId;

            await prisma.note.create({
                data: {
                    content,
                    taskId,
                    createdBy: req.usuario.id
                }
            });

            res.status(201).json({ message: "Nota creada correctamente" });

        } catch (error) {
            res.status(500).json({ error: 'Error al crear la nota' });
        }
    }

    static getAllNotes = async (req: Request<{ projectId: string; taskId: string }>, res: Response) => {
        try {

            const taskId = req.task.id || req.params.taskId;

            const notes = await prisma.note.findMany({
                where: { taskId },
                orderBy: { updatedAt: "desc" },
                include: {
                    user: {
                        select: {
                            id: true, name: true, email: true
                        }
                    }
                }
            });

            res.json(notes);

        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las notas' });
        }
    }

    static deleteNote = async (req: Request<{ projectId: string; taskId: string, noteId: string }>, res: Response) => {
        try {

            const note = await prisma.note.findUnique({
                where: {
                    id: req.params.noteId
                }
            });

            if(!note) {
                res.status(404).json({error: "Nota no encontrada"});
                return;
            }

            if(note.createdBy !== req.usuario.id) {
                res.status(401).json({error: "Sólo el creador de la nota puede eliminarla"});
                return;
            }

            await prisma.note.delete({
                where: { id: req.params.noteId }
            });

            res.json({message: "Nota eliminada correctamente"});

        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la nota' });
        }
    }
}