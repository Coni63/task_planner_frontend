import { Component, OnInit } from '@angular/core';
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
  members = signal<CustomUser[]>([]); // Reactive signal for members
  categories = signal<Category[]>([]); // Reactive signal for categories
  loading = signal(true); // Signal for loading state
  step = signal(0); // Signal for the current step

  constructor(private assignationsService: AssignationsService) {}

  ngOnInit() {
    this.loading.set(true);

    forkJoin({
      members: this.assignationsService.getAllMembers(),
      categories: this.assignationsService.getAllCategories(),
    }).subscribe({
      next: ({ members, categories }) => {
        this.members.set(members);
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: e => {
        console.error(e);
        this.loading.set(false);
      },
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

  onUpdate(data: CustomUser) {
    console.log('onUpdate', data);
    this.onRoleUpdate(data);
  }

  private onRoleUpdate(data: CustomUser) {
    this.members.update(members => members.map(member => (member.id === data.id ? data : member)));
  }
}
