export interface ITask {
  id?: string;
  created_at?: string;
  description: string;
  due_date: string;
  status: string;
  title: string;
  priority: string;
  assignee_id: string;
}

export interface ITasksQueryParams {
  status: string;
  q: string;
  orderByPriorityDirection: 'asc' | 'desc';
}
