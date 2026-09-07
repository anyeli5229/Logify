import { useDroppable } from '@dnd-kit/core';

type DropTaskProps = {
    status: string;
}

export default function DropTask({ status }: DropTaskProps) {
    const { isOver, setNodeRef } = useDroppable({ id: status });

    return (
        <div
            ref={setNodeRef}
            className={`mt-3 py-3.5 px-4 rounded-xl border-2 border-dashed transition-all duration-200 text-center text-xs font-semibold ${
                isOver
                    ? 'border-indigo-500 bg-indigo-50/60 text-indigo-700 scale-[1.02]'
                    : 'border-slate-200 bg-slate-50/50 text-slate-400 hover:border-slate-300 hover:text-slate-500'
            }`}
        >
            Soltar tarea aquí
        </div>
    )
}