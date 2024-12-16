import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageHeaderComponent } from '@shared';
import { CategoryModalComponent } from '@shared/components/category-modal/category-modal.component';
import { ProjectModalComponent } from '@shared/components/project-modal/project-modal.component';
import { Category, Project } from '@shared/interfaces/interfaces';
import { EllipsisPipe } from '@shared/pipes/ellipsis.pipe';
import { AssignationsService } from '@shared/services/assignations.service';

@Component({
  selector: 'app-configuration-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
  imports: [
    PageHeaderComponent,
    CommonModule,
    MatTableModule,
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    EllipsisPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationProjectsComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Category[]>;
  projects: Project[] = [];

  constructor(
    private assignationsService: AssignationsService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.assignationsService.getAllProjects().subscribe({
      next: res => {
        this.projects = res;
        this.cdr.markForCheck();
        this.table.renderRows();
      },
      error: e => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  openCreateProjectModal(): void {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      data: null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (!result) {
        return;
      }

      this.projects.push(result);
      this.cdr.markForCheck();
      this.table.renderRows();
    });
  }

  editProjectModal(project: Project): void {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      data: project,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      const index = this.projects.findIndex(project => project.id === result.id);
      if (index !== -1) {
        this.projects[index] = result;
      }

      this.cdr.markForCheck();
      this.table.renderRows();
    });
  }

  deleteProject(project: Project) {
    if (window.confirm('Are sure you want to delete this project ?')) {
      this.assignationsService.deleteProject(project).subscribe({
        next: res => {
          this.projects = this.projects.filter(p => p.id !== project.id);
          this.cdr.markForCheck();
          this.table.renderRows();
        },
        error: e => console.error(e),
        complete: () => console.info('complete'),
      });
    }
  }
}
