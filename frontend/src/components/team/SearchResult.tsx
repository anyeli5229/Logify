import { addMemberById } from "@/services/TeamService";
import type { TeamMember } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type SearchResultProps = {
    user: TeamMember;
    reset: () => void;
}

export default function SearchResult({ user, reset }: SearchResultProps) {

    const params = useParams();
    const projectId = params.projectId!;
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: addMemberById,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]});
            reset();
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    const handleAddMemberToProject = () => {
        const data = { projectId,  id: user.id};
        mutate(data);
    }

  return (
    <div className="px-8 space-y-3">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Resultado encontrado:
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold text-base uppercase shrink-0">
            {user.name.charAt(0)}
          </div>

          <div className="flex flex-col min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={isPending}
          onClick={handleAddMemberToProject}
          className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isPending ? "Agregando..." : "Agregar al proyecto"}
        </button>
      </div>
    </div>
  )
}