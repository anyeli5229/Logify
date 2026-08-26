export function formatDate(date: string) : string {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(newDate);
}