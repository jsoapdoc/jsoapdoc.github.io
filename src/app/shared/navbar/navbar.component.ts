import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    MenuModule,
    BadgeModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  userMenuItems: MenuItem[] | undefined;
  notifications: number = 3;

  ngOnInit() {
    this.items = [
      { label: 'Electronics' },
      { label: 'Computer' },
      { label: 'Accessories' },
      { label: 'Keyboard' },
      { label: 'Wireless' },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.userMenuItems = [
      {
        label: 'Profilo',
        icon: 'pi pi-user',
        routerLink: '/profile',
      },
      {
        label: 'Impostazioni',
        icon: 'pi pi-cog',
        routerLink: '/settings',
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          // logica logout
        },
      },
    ];
  }

  onSearch(event: any) {
    // logica ricerca
  }
}
