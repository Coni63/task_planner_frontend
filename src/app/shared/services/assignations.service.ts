import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Task,
  ApiResponse,
  Status,
  Project,
  UserAssignment,
  Category,
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
    if (project_id) {
      return this.httpClient.get<Task[]>(`/api/tasks/?project=${project_id}`);
    }
    return this.httpClient.get<Task[]>('/api/tasks/');
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
}
