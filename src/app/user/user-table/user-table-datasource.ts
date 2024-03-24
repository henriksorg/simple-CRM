import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { UserService } from '../user-service/user.service';

// TODO: Replace this with your own data model type
export interface UserTableItem {
  firstName: string;
  lastName: string;
  birthDate: number;
  zipCode: string;
  street: string; 
  city: string;
  email: string;
  id: string;
}


// TODO: replace this with real data from your application
// const userData: UserTableItem[] = [
//   {
//     birthDate: 914454000000,
//     zipCode: '73560',
//     street: 'Stauferweg 6',
//     firstName: 'Henrik',
//     lastName: 'Sorg',
//     city: 'Böbingen an der Rems',
//     email: 'henrik@reif-sorg.de'
//   },
//   {
//     lastName: 'Wideman',
//     street: 'Am Seepark',
//     city: 'Freeburrg',
//     birthDate: 992728800000,
//     zipCode: '73542',
//     firstName: 'Helm',
//     email: 'helm@wideman.de'
//   }
// ];


/**
 * Data source for the UserTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserTableDataSource extends DataSource<UserTableItem> {
  userData: UserTableItem[] | undefined;
  data: UserTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private userService: UserService) {
    super();
    
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserTableItem[]> {
    if (!this.paginator || !this.sort) {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  
    // Erstelle Observables für Sortierungs- und Paginierungsereignisse
    const sortChange = this.sort.sortChange;
    const pageChange = this.paginator.page;
  
    // Beobachte Änderungen und lade Daten neu
    return merge(sortChange, pageChange).pipe(
      startWith({}), // Starte mit einem initialen Wert, um Daten sofort zu laden
      switchMap(() => {
        return this.userService.getUsers(); // Lade Benutzerdaten neu        
      }),
      map(data => this.getSortedData([...data])), // Sortiere Daten
      map(data => this.getPagedData(data)) // Paginiere Daten
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserTableItem[]): UserTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserTableItem[]): UserTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
