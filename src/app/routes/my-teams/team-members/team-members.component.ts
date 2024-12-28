import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AssignationsService } from '@shared/services/assignations.service';
import { Category, CustomUser } from '@shared/interfaces/interfaces';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserSkillToggleButtonComponent } from '@shared/components/user-skill-toggle-button/user-skill-toggle-button.component';
import { UserRoleToggleButtonComponent } from '@shared/components/user-role-toggle-button/user-role-toggle-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-my-teams-team-members',
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    PageHeaderComponent,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    LoadingComponent,
    UserSkillToggleButtonComponent,
    UserRoleToggleButtonComponent,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTeamsTeamMembersComponent implements OnInit {
  members: CustomUser[] = [];
  categories: Category[] = [];

  loading = true;
  step = signal(0);
  constructor(
    private assignationsService: AssignationsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;

    forkJoin({
      members: this.assignationsService.getAllMembers(),
      categories: this.assignationsService.getAllCategories(),
    }).subscribe({
      next: ({ members, categories }) => {
        this.members = members;
        this.categories = categories;
        this.cdr.markForCheck();
      },
      error: e => console.error(e),
      complete: () => (this.loading = false),
    });
  }

  get_icon(user: CustomUser) {
    if (user.roles.includes('ADMIN')) {
      return 'star_rate';
    } else if (user.roles.includes('MANAGER')) {
      return 'verified_user';
    } else if (user.roles.includes('COORDINATOR')) {
      return 'supervisor_account';
    } else if (user.roles.includes('MEMBER')) {
      return 'person';
    } else {
      return 'block';
    }
  }

  get_role(user: CustomUser) {
    if (user.roles.includes('ADMIN')) {
      return 'Admin';
    } else if (user.roles.includes('MANAGER')) {
      return 'Manager';
    } else if (user.roles.includes('COORDINATOR')) {
      return 'Coordinator';
    } else if (user.roles.includes('MEMBER')) {
      return 'Member';
    } else {
      return 'No role assigned';
    }
  }
}
