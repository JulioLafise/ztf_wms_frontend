import { IMenuList } from '@wms/interfaces';

// FOR LINE JUMP add '\n' TO menuName FATHER FOR TITLE

export const menu: IMenuList[] = [
  {
    menuId: 'dashboard',
    menuUrl: '/app/dashboard',
    menuName: 'Dashboard',
    icon: 'chart-column',
    description: '',
    children: [
      {
        menuId: 'metrics',
        menuUrl: '/metrics',
        menuName: 'Metrics',
        icon: 'chart-pie',
        description: '',
        roles: ['dev']
      },
      {
        menuId: 'month-sales',
        menuUrl: '/month-sales',
        menuName: 'Month Sales',
        icon: 'money-bill-trend-up',
        description: '',
        roles: ['dev']
      },
    ],
    roles: ['dev']
  },
  {
    menuId: 'visit-control',
    menuUrl: '/app/visit-control',
    menuName: 'Visit Control',
    icon: 'map-location-dot',
    description: '',
    children: [
      {
        menuId: 'schedule-visit',
        menuUrl: '/schedule-visit',
        menuName: 'Schedule Visit',
        icon: 'calendar-days',
        description: 'Programacion de visita de clientes',
        roles: ['dev']
      },
      {
        menuId: 'customers',
        menuUrl: '/customers',
        menuName: 'Customers',
        icon: 'user-plus',
        description: 'Administracion de clientes',
        roles: ['dev']
      },
      {
        menuId: 'customer-contacts',
        menuUrl: '/customer-contacts',
        menuName: 'Customer Contacts',
        icon: 'id-badge',
        description: 'Administracion de contactos de clientes',
        roles: ['dev']
      },
      {
        menuId: 'customer-locations',
        menuUrl: '/customer-locations',
        menuName: 'Customer Locations',
        icon: 'arrows-to-circle',
        description: 'Locaciones de los clientes',
        roles: ['dev']
      },
    ],
    roles: ['dev']
  },
];

export const settings: IMenuList[] = [
  {
    menuId: 'catalogue',
    menuUrl: '/app/catalogue',
    menuName: 'Catalogue',
    icon: 'book',
    description: '',
    children: [
      {
        menuId: 'departaments',
        menuUrl: '/departaments',
        menuName: 'Departaments',
        icon: 'layer-group',
        description: 'Managing departaments',
        roles: ['dev'],
      },
      {
        menuId: 'appointments',
        menuUrl: '/appointments',
        menuName: 'Appointments',
        icon: 'users',
        description: 'Managing appointments',
        roles: ['dev'],
      },
      {
        menuId: 'visit-types',
        menuUrl: '/visit-types',
        menuName: 'Visit Types',
        icon: 'street-view',
        description: 'Managing visit types',
        roles: ['dev'],
      },
      {
        menuId: 'visit-methods',
        menuUrl: '/visit-methods',
        menuName: 'Visit Methods',
        icon: 'mobile-button',
        description: 'Managing visit methods',
        roles: ['dev'],
      },
      {
        menuId: 'type-personery',
        menuUrl: '/type-personery',
        menuName: 'Type Personery',
        icon: 'address-book',
        description: 'Managing type personery',
        roles: ['dev'],
      },
      {
        menuId: 'employees',
        menuUrl: '/employees',
        menuName: 'Employees',
        icon: 'building-user',
        description: 'Managing employee',
        roles: ['dev'],
      },
    ],
    roles: ['dev'],
  },
  {
    menuId: 'settings',
    menuUrl: '/app/settings',
    menuName: 'Settings',
    icon: 'gears',
    description: '',
    children: [
      {
        menuId: 'roles',
        menuUrl: '/roles',
        menuName: 'Roles',
        icon: 'users-gear',
        description: 'Managing role access permissions',
        roles: ['dev']
      },
      {
        menuId: 'users',
        menuUrl: '/users',
        menuName: 'Users',
        icon: 'address-card',
        description: 'Managing users',
        roles: ['dev']
      },
    ],
    roles: ['dev']
  },
  {
    menuId: 'account',
    menuUrl: '/app/settings',
    menuName: 'Account',
    icon: 'circle-user',
    description: '',
    children: [
      {
        menuId: 'profile',
        menuUrl: '/profile',
        menuName: 'Profile',
        icon: 'key',
        description: 'Modify data profile',
        roles: ['*']
      },
    ],
    roles: ['*']
  },
];