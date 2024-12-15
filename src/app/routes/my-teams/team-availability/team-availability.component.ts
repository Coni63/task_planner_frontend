import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-my-teams-team-availability',
  templateUrl: './team-availability.component.html',
  styleUrl: './team-availability.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class MyTeamsTeamAvailabilityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
