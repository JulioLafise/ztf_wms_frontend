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
    ],
    roles: ['dev']
  },
  {
    menuId: 'visit-control',
    menuUrl: '/app/inventory',
    menuName: 'Inventory',
    icon: 'warehouse',
    description: '',
    children: [
      {
        menuId: 'kardex',
        menuUrl: '/kardex',
        menuName: 'Kardex',
        icon: 'boxes-stacked',
        description: 'Listado del Inventario actual',
        roles: ['dev']
      },
      {
        menuId: 'entries',
        menuUrl: '/entries',
        menuName: 'Entries',
        icon: 'dolly',
        description: 'Manejo de las Entradas',
        roles: ['dev']
      },
      {
        menuId: 'departures',
        menuUrl: '/departures',
        menuName: 'Departures',
        icon: 'id-badge',
        description: 'Manejo de las Salidas',
        roles: ['truck-ramp-box']
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