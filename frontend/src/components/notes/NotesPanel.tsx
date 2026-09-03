import AddNotesForm from "./AddNotesForm";
import type { Task } from "@/types";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
  notes: Task['notes']
}

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <div className="pt-4 border-t border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Notas y Comentarios
        </h4>
      </div>

      <AddNotesForm />

      <div className="mt-6 space-y-3">
        {notes?.length === 0 ? (
          <p className="text-xs text-center text-slate-400 py-4 italic">
            No hay notas en esta tarea. ¡Añade la primera!
          </p>
        ) : (
          notes?.map((note) => (
            <NoteDetail note={note}/>
          ))
        )}
      </div>
    </div>
  )
}