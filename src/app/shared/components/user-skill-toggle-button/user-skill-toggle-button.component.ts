import { Component, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLabel } from '@angular/material/form-field';
import { UserAssignmentNoUser } from '@shared/interfaces/interfaces';
import { AssignationsService } from '@shared/services/assignations.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-skill-toggle-button',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonToggleModule, MatLabel, CommonModule],
  templateUrl: './user-skill-toggle-button.component.html',
  styleUrl: './user-skill-toggle-button.component.scss',
})
export class UserSkillToggleButtonComponent implements OnInit {
  skillForm: FormGroup;

  @Input() set assignment(value: UserAssignmentNoUser) {
    this._assignment = value;
    this.initForm();
  }
  get assignment(): UserAssignmentNoUser {
    return this._assignment;
  }
  private _assignment!: UserAssignmentNoUser;

  constructor(
    private fb: FormBuilder,
    private assignationsService: AssignationsService,
    private toast: ToastrService
  ) {
    this.skillForm = this.fb.group({
      id: [null],
      user: [null, Validators.required],
      category: [null, Validators.required],
      level: new FormControl('Blocked', Validators.required),
    });
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (this._assignment) {
      this.skillForm.patchValue(
        {
          id: this._assignment.id ?? null,
          user: this._assignment.user ?? null,
          category: this._assignment.category?.id ?? null,
          level: this._assignment.level || 'Blocked',
        },
        { emitEvent: false }
      );
    }
  }

  onChange() {
    this.assignationsService.createOrUpdateAssignment(this.skillForm.value).subscribe({
      next: () => {
        this.toast.success('Assignment updated');
      },
      error: e => {},
      complete: () => {},
    });
  }
}
