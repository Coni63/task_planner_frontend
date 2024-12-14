import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category, Project, Status, Task, UserAssignment } from '@shared/interfaces/interfaces';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AssignationsService } from '@shared/services/assignations.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent {
  readonly dialogRef = inject(MatDialogRef<TaskModalComponent>);
  readonly data = inject<Task>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);
  readonly assignationsService = inject(AssignationsService);

  users: UserAssignment[] = []; // List of users for the dropdown
  projects: Project[] = []; // List of projects for the dropdown
  statuses: Status[] = []; // List of statuses for the dropdown
  categories: Category[] = []; // List of categories for the dropdown
  tasks: Task[] = []; // List of existing tasks for dependency selection

  taskForm: FormGroup = this.fb.group({
    status: [null, Validators.required],
    project: [null, Validators.required],
    category: [null],
    reference: ['', Validators.required],
    referenceLink: ['', Validators.pattern(/https?:\/\/.+/)], // Valid URL pattern
    comments: [''],
    pickedAt: [{ value: null, disabled: true }], // Read-only field
    estimatedDuration: ['', Validators.required], // Custom input logic may be required for interval format
    expectedFinalization: [null, Validators.required],
    pickedBy: [null],
    reservedForUser: [null],
    dependencies: [[]], // Multi-select for task dependencies
  });

  ngOnInit(): void {
    // Fetch users, projects, statuses, categories, and tasks data
    forkJoin({
      projects: this.assignationsService.getAllProjects(),
      statuses: this.assignationsService.getAllStatus(),
      categories: this.assignationsService.getAllCategories(),
      tasks: this.assignationsService.getAllTasks(),
    }).subscribe(({ projects, statuses, categories, tasks }) => {
      this.projects = projects;
      this.statuses = statuses;
      this.categories = categories;
      this.tasks = tasks;

      console.log('Projects:', projects);
      console.log('Statuses:', statuses);
      console.log('Categories:', categories);
      console.log('Tasks:', tasks);

      // if (this.data) {
      //   this.taskForm.patchValue({
      //     status: this.data.status?.id,
      //     project: this.data.project?.id,
      //     category: this.data.category?.id,
      //     reference: this.data.reference,
      //     referenceLink: this.data.referenceLink,
      //     comments: this.data.comments,
      //     pickedAt: this.data.pickedAt,
      //     estimatedDuration: this.data.estimatedDuration,
      //     expectedFinalization: this.data.expectedFinalization,
      //     pickedBy: this.data.pickedBy,
      //     reservedForUser: this.data.reservedForUser,
      //     dependencies: this.data.dependencies.map(dep => dep.id),
      //   });
      // }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      console.log('Form Data:', this.taskForm.value);
      // Emit or handle form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close({});
  }
}
