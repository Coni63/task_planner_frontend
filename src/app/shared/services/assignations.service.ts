import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Task,
  ApiResponse,
  Status,
  Project,
  UserAssignment,
  Category,
  TaskSimple,
  CustomUser,
} from '@shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AssignationsService {
  constructor(private httpClient: HttpClient) {}

  getMyAssignations() {
    return this.httpClient.get<Task[]>('/api/auth/myself/tasks/');
  }

  getAllTasks(project_id?: string) {
    const params = new HttpParams();

    if (project_id) {
      params.set('project', project_id);
    }

    return this.httpClient.get<Task[]>('/api/tasks/', { params: params });
  }

  getHistory(dataTablesParameters: any) {
    return this.httpClient.post<ApiResponse>('/api/tasks-history/', dataTablesParameters);
  }

  getAllStatus() {
    return this.httpClient.get<Status[]>('/api/status/');
  }

  getAllProjects() {
    return this.httpClient.get<Project[]>('/api/projects/');
  }

  getAllCategories() {
    return this.httpClient.get<Category[]>('/api/categories/');
  }

  getUserAssignments() {
    return this.httpClient.get<UserAssignment[]>('/api/user-assignement/');
  }

  createOrUpdateCategory(category: Category) {
    if (category.id) {
      return this.httpClient.put<Category>(`/api/categories/${category.id}/`, category);
    }
    return this.httpClient.post<Category>('/api/categories/', category);
  }

  createOrUpdateStatus(status: Status) {
    if (status.id) {
      return this.httpClient.put<Status>(`/api/status/${status.id}/`, status);
    }
    return this.httpClient.post<Status>('/api/status/', status);
  }

  createOrUpdateProject(project: Project) {
    if (project.id) {
      return this.httpClient.put<Project>(`/api/projects/${project.id}/`, project);
    }
    return this.httpClient.post<Project>('/api/projects/', project);
  }

  deleteProject(project: Project) {
    return this.httpClient.delete<Project>(`/api/projects/${project.id}/`);
  }

  deleteCategory(category: Category) {
    return this.httpClient.delete<Category>(`/api/categories/${category.id}/`);
  }

  deleteStatus(status: Status) {
    return this.httpClient.delete<Status>(`/api/status/${status.id}/`);
  }

  createOrUpdateTask(task: TaskSimple) {
    if (task.id) {
      return this.httpClient.put<Task>(`/api/tasks/${task.id}/`, task);
    }
    return this.httpClient.post<Task>('/api/tasks/', task);
  }

  getAllMembers() {
    return this.httpClient.get<CustomUser[]>('/api/users/');
  }

  createOrUpdateAssignment(assignment: UserAssignment) {
    if (assignment.id) {
      return this.httpClient.put<UserAssignment>(
        `/api/user-assignement/${assignment.id}/`,
        assignment
      );
    }
    return this.httpClient.post<UserAssignment>('/api/user-assignement/', assignment);
  }

  reorderTasks(tasks: Task[]) {
    let data = tasks.map((task, index) => {
      return {
        id: task.id,
        order: index,
      };
    });
    return this.httpClient.put<Task[]>('/api/tasks-order/', data);
  }

  pickNextTask() {
    return this.httpClient.get<Task>('/api/task-pick/');
  }

  patchTask(taskId: string, data: any) {
    return this.httpClient.patch<Task>(`/api/tasks/${taskId}/`, data);
  }
}
