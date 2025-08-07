export interface IUpdateTaskRequest {

    dataUpdateTask: {

        title?: string,
        description?: string,
        dueDate?: string,
        priority?: string,
        status?: string
    }
    idTask : string
}