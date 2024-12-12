import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-my-teams-team-members',
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class MyTeamsTeamMembersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
