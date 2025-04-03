import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDetails } from '../../models/user/user-details.model';
import { filter } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() users: UserDetails[] = [];
  filteredUsers: UserDetails[] = [];
  searchQuery = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users']) {
      this.filterUsers();
    }
  }

  getActiveUsersCount(): number {
    return this.filteredUsers.filter(user => user.isActive).length;
  }

  getInactiveUsersCount(): number {
    return this.filteredUsers.filter(user => !user.isActive).length;
  }

  filterUsers() {
    if (this.searchQuery === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  toggleUserStatus(user: UserDetails) {
    if (user.isActive === true) {
      this.userService.deactivateUser(user.id).subscribe({
        next: (response) => {
          user.isActive = false;
        },
        error: (error) => {
          console.error('Error deactivating user:', error);
        }
      });
    } else {
      this.userService.activateUser(user.id).subscribe({
        next: (response) => {
          user.isActive = true;
        },
        error: (error) => {
          console.error('Error activating user:', error);
        }
      });
    }
  }


  viewUserDetails(user: UserDetails) {
    this.router.navigate(['/profile', user.id]);
  }

  deleteUser(user: UserDetails) {
    if (confirm(`Are you sure you want to delete user ${user.firstName} ${user.lastName}?`)) {
   
      console.log('Delete user:', user.id);
    }
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
