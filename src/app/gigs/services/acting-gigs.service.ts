import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface ActingJob {
  id: number;
  title: string;
  role_type: string;
  production_type: string;
  pay_rate: string;
  location: string;
  submission_deadline: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActingGigsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/gigs';

  public gigs = signal<ActingJob[]>([]);
  public isLoading = signal<boolean>(false);

  /**
   * Fetch gigs with optional isPro tier status and city filter
   */
  public async fetchGigs(isPro: boolean = true, city?: string): Promise<void> {
    this.isLoading.set(true);

    const headers = new HttpHeaders({
      'x-user-tier': isPro ? 'pro' : 'free'
    });

    let params = new HttpParams();
    if (city && city !== 'ALL') {
      params = params.set('city', city);
    }

    this.http.get<ActingJob[]>(this.apiUrl, { headers, params }).subscribe({
      next: (data) => {
        this.gigs.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to fetch acting gigs:', err);
        this.gigs.set([]);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Filter gigs by city
   */
  public async fetchGigsByCity(city: string, isPro: boolean = true): Promise<void> {
    return this.fetchGigs(isPro, city);
  }
}
