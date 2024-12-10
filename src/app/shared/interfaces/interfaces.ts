export interface Task {
  id: string;
  status: Status;
  project: Project;
  assigned_user: User | null;
  category: Category | null;
  title: string;
  description: string;
  picked_at: string | null;
  estimated_duration: string;
  expected_finalization: string | null;
  estimated_finalization: string | null;
  dependencies: TaskDependency[];
}

export interface Status {
  id: string;
  status: string;
  active_state: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface TaskDependency {
  id: string;
  task_id: string;
  dependency_id: string;
}
