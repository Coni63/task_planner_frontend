import { Routes } from '@angular/router';
import { MyTeamsTeamMembersComponent } from './team-members/team-members.component';
import { MyTeamsTeamAvailabilityComponent } from './team-availability/team-availability.component';

export const routes: Routes = [{ path: 'team-members', component: MyTeamsTeamMembersComponent },
{ path: 'team-availability', component: MyTeamsTeamAvailabilityComponent }
];
