import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesService } from '../../services/sites.service';
import { Site } from '../../models/site.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sites: Site[] = [];

  constructor(private sitesService: SitesService) {}

  ngOnInit(): void {
    this.sitesService.getSites().subscribe({
      next: (sites) => {
        this.sites = sites;
      },
      error: (error) => {
        console.error('Error fetching sites:', error);
      },
    });
  }
}
