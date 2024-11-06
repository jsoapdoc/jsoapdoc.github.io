import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

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
    DialogModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar') navbar!: ElementRef;
  @Output() themeChange = new EventEmitter<boolean>();
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  userMenuItems: MenuItem[] | undefined;
  notifications: number = 0;
  isDarkTheme = false;
  severity: string = 'info';
  searchModalVisible: boolean = false;
  searchQuery: string = '';

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  isAuthenticated$ = this.authService.isAuthenticated();

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });

    this.items = [];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.userMenuItems = [
      {
        label: 'Account',
        icon: 'pi pi-user',
        routerLink: '/profile',
      },
      {
        label: 'Settings',
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
          this.logout();
          this.router.navigate(['/login']);
        },
      },
    ];
  }

  showSearchModal() {
    this.searchModalVisible = true;
  }

  performSearch() {
    console.log('Testo di ricerca:', this.searchQuery);
    this.searchModalVisible = false;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeChange.emit(this.isDarkTheme);
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    document.body.style.transition = 'background-color 0.5s ease';
    this.navbar.nativeElement.classList.toggle('dark-theme', this.isDarkTheme);
    this.navbar.nativeElement.style.transition = 'background-color 0.5s ease';
  }

  updateBreadcrumb() {
    const root: ActivatedRoute = this.activatedRoute.root;
    this.items = this.createBreadcrumbs(root);
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      const routeTitle: string = child.snapshot.data['title'];
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({ label: routeTitle, routerLink: url });
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  getNotificationsState() {
    switch (true) {
      case this.notifications === 0:
        return 'success';
      case this.notifications === 1:
        return 'info';
      case this.notifications === 2:
        return 'warning';
      case this.notifications >= 3:
        return 'danger';
      default:
        return 'info';
    }
  }

  logout() {
    this.authService.logout();
  }
}
