import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-configuration-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  standalone: true,
  imports: [PageHeaderComponent]
})
export class ConfigurationStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
