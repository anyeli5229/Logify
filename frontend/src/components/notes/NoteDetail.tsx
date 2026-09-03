import { useAuth } from "@/hooks/useAuth";
import { deleteNote } from "@/services/NoteService";
import type { Note } from "@/types";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";

type NoteDetailProps = {
    note: Note
};

export default function NoteDetail({ note }: NoteDetailProps) {
    const { data: user } = useAuth();
    const canDelete = useMemo(() => note.createdBy === user?.id, [user, note.createdBy]);

    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ["task", taskId] })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    return (
        <div className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-100 transition-all duration-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">{note.user.name}</span>
                <time className="text-[10px] font-medium text-slate-400">
                    {formatDate(note.createdAt)}
                </time>
            </div>

            <div className="flex items-start justify-between gap-3 text-xs">
                <p className="text-slate-600 leading-relaxed wrap-break flex-1">
                    {note.content}
                </p>

                {canDelete && (
                    <button
                        type="button"
                        onClick={() => 
                            mutate({projectId, taskId, noteId: note.id})
                        }
                        className="text-[11px] font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-md transition-all cursor-pointer shrink-0"
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    )
}