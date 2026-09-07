
export const isManager = (managerId: string  | undefined, userId: string | undefined) => {
    return managerId === userId
}