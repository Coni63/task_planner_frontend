import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-configuration-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class ConfigurationProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
