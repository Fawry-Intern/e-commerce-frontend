import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';

import { UserService } from '../../../services/user.service';
import { UserDetails } from '../../../models/user/user-details.model';
import { UserTableComponent } from '../../../components/user-table/user-table.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Activity {
  type: 'user' | 'account' | 'system';
  title: string;
  time: Date;
  icon?: string;
}
@Component({
  selector: 'app-admin-user',
  standalone:true,
  imports: [AdminSidebarComponent,UserTableComponent,CommonModule,FormsModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {
  users: UserDetails[] = [];
  filteredUsers: UserDetails[] = [];
  recentActivities: Activity[] = [];
  loading = false;
  error: string | null = null;
  searchQuery: string = '';

  constructor(
      private userService: UserService,

      public router: Router
  ) {}

  ngOnInit(): void {
      this.getAllUsers();
      this.loadRecentActivities();
  }

  getAllUsers() {
      this.loading = true;
      this.error = null;
      this.userService.getAllUsers().subscribe({
          next: (response) => {
              this.users = response;
              this.filteredUsers = response;
              this.loading = false;
              console.log(response)
              this.updateRecentActivities();
          },
          error: (error) => {
              console.error('Error loading users:', error);
              this.error = 'Failed to load users. Please try again.';
              this.loading = false;
          }
      });
  }

  getActiveUsersCount(): number {
      return this.users.filter(user => user.isActive).length;
  }

  updateRecentActivities() {
    
      const recentUsers = [...this.users]
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 5);

      const activities: Activity[] = [];

    
      recentUsers.forEach(user => {
          activities.push({
              type: 'user',
              title: `New user registration: ${user.firstName} ${user.lastName}`,
              time: new Date(),
              icon: 'fa-user-plus'
          });
      });

    
    
      activities.push({
          type: 'system',
          title: 'System Status: Online',
          time: new Date(),
          icon: 'fa-server'
      });

      this.recentActivities = activities;
  }

  loadRecentActivities() {
      if (this.users.length > 0) {
          this.updateRecentActivities();
      }
  }

  filterUsers() {
      if (!this.searchQuery.trim()) {
          this.filteredUsers = this.users;
          return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
  }

  viewAllUsers() {
   
      const usersSection = document.querySelector('.users-table-section');
      if (usersSection) {
          usersSection.scrollIntoView({ behavior: 'smooth' });
      }
  }


}
