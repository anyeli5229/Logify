import type { NoteFormData } from "@/types";
import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/services/NoteService";
import { toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";

export default function AddNotesForm() {
    const initialValues: NoteFormData = { content: "" };

    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;

    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ projectId, taskId, formData });
    };

    return (
        <form onSubmit={handleSubmit(handleAddNote)} noValidate className="space-y-2">
            <div className="flex items-center gap-2">
                <input
                    id="content"
                    type="text"
                    placeholder="Escribe un comentario o nota..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                    {...register("content", {
                        required: "El contenido de la nota es obligatorio"
                    })}
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all duration-200 cursor-pointer disabled:opacity-50 shrink-0"
                >
                    {isPending ? "Guardando..." : "Agregar nota"}
                </button>
            </div>

            {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
        </form>
    )
}