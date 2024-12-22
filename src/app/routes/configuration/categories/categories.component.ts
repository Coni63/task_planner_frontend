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
import { Category } from '@shared/interfaces/interfaces';
import { AssignationsService } from '@shared/services/assignations.service';

@Component({
  selector: 'app-configuration-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationCategoriesComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Category[]>;
  categories: Category[] = [];

  constructor(
    private assignationsService: AssignationsService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.assignationsService.getAllCategories().subscribe({
      next: res => {
        this.categories = res;
        this.cdr.markForCheck();
        this.table.renderRows();
      },
      error: e => {},
      complete: () => {},
    });
  }

  openCreateCategoryModal(): void {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.categories.push(result);
      this.cdr.markForCheck();
      this.table.renderRows();
    });
  }

  editCategoryModal(category: Category): void {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: category,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      const index = this.categories.findIndex(category => category.id === result.id);
      if (index !== -1) {
        this.categories[index] = result;
      }

      this.cdr.markForCheck();
      this.table.renderRows();
    });
  }

  deleteCategory(category: Category) {
    if (window.confirm('Are sure you want to delete this project ?')) {
      this.assignationsService.deleteCategory(category).subscribe({
        next: res => {
          this.categories = this.categories.filter(c => c.id !== category.id);
          this.cdr.markForCheck();
          this.table.renderRows();
        },
        error: e => {},
        complete: () => {},
      });
    }
  }
}
