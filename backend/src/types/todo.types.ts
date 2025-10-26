export interface Todo {
    id?: number;
    title: string;
    description: string;
    is_completed: boolean;
    created_at?: Date;
    updated_at?: Date;
}