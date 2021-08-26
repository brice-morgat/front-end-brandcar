import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandCar } from '../models/brandcars.model';

@Injectable({
  providedIn: 'root'
})
export class BrandcarsService {

  constructor(private http: HttpClient) { }

  private apiServeurUrl = 'http://localhost:8080/api/brandcars';

  /** Get all Brandcars from API */
  public getBrandcars(): Observable<BrandCar[]> {
    return this.http.get<BrandCar[]>(`${this.apiServeurUrl}/all`);
  }
 /** Get single brand car by id from API
  * @param id id of brandcar
  * @return Observable
 */
  public getSingleBrandcar(id: number): Observable<BrandCar> {
    console.log(id)
    return this.http.get<BrandCar>(`${this.apiServeurUrl}/find/${id}`);
  }

  /** Add BrandCar to API
   * @param brandcar 
   * @returns 
   */
  public addBrandcar(brandcar: BrandCar): Observable<BrandCar> {
    return this.http.post<BrandCar>(`${this.apiServeurUrl}/add`, brandcar);
  }

  /** Update BrandCar in API
   * 
   * @param id 
   * @param brandcar 
   */
  public updateBrandcars(id: number, brandcar: BrandCar): Observable<BrandCar> {
    return this.http.put<BrandCar>(`${this.apiServeurUrl}/update/${id}`, brandcar);
  }

  /** Delete BrandCar in API
   * 
   * @param brandcarId 
   * @returns 
   */
  public deleteBrandcar(brandcarId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServeurUrl}/delete/${brandcarId}`);
  }
}
