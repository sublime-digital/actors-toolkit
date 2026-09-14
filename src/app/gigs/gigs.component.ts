import { Component, OnInit, AfterViewInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface GigItem {
  title: string;
  role_type: string;
  location: string;
  pay_rate: string;
  submission_deadline: string;
}

// Mock Dataset
const MOCK_GIGS: GigItem[] = [
  {
    title: 'The Last Horizon',
    role_type: 'Lead Role',
    location: 'Los Angeles, CA',
    pay_rate: '$500/day',
    submission_deadline: '2026-10-15'
  },
  {
    title: 'Echoes of Broadway',
    role_type: 'Supporting',
    location: 'NYC, NY',
    pay_rate: '$350/day',
    submission_deadline: '2026-10-20'
  },
  {
    title: 'Midnight Mystery',
    role_type: 'Feature Extra',
    location: 'Atlanta, GA',
    pay_rate: '$200/day',
    submission_deadline: '2026-10-05'
  },
  {
    title: 'Liberty Drama Series',
    role_type: 'Voiceover',
    location: 'Philadelphia, PA',
    pay_rate: '$450/project',
    submission_deadline: '2026-10-18'
  },
  {
    title: 'Neon Nights Feature',
    role_type: 'Lead Role',
    location: 'Las Vegas, NV',
    pay_rate: '$600/day',
    submission_deadline: '2026-11-01'
  },
  {
    title: 'Space & Beyond Commercial',
    role_type: 'Background',
    location: 'Houston, TX',
    pay_rate: '$175/day',
    submission_deadline: '2026-09-30'
  }
];

@Component({
  selector: 'app-gigs',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './gigs.component.html',
  styleUrls: ['./gigs.component.css']
})
export class GigsComponent implements OnInit, AfterViewInit {
  // Form State
  selectedCity = signal<string>('ALL');

  // Table Configuration
  displayedColumns: string[] = ['title', 'role_type', 'location', 'pay_rate', 'submission_deadline'];
  dataSource = new MatTableDataSource<GigItem>(MOCK_GIGS);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    // Custom predicate to filter by location or title/role
    this.dataSource.filterPredicate = (data: GigItem, filter: string) => {
      const normalizedFilter = filter.toLowerCase();
      return (
        data.title.toLowerCase().includes(normalizedFilter) ||
        data.role_type.toLowerCase().includes(normalizedFilter) ||
        data.location.toLowerCase().includes(normalizedFilter)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCityChange(city: string): void {
    this.selectedCity.set(city);
    if (city === 'ALL') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = city.trim().toLowerCase();
    }
  }

  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
