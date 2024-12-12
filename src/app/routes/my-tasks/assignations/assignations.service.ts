import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '@shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AssignationsService {
  constructor(private httpClient: HttpClient) {}

  getMyAssignations() {
    return this.httpClient.get<Task[]>('/api/auth/myself/tasks/');
  }
}
