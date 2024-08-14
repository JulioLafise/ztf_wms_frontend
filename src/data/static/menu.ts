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
    menuId: 'inventory',
    menuUrl: '/app/inventory',
    menuName: 'Inventory',
    icon: 'warehouse',
    description: '',
    children: [
      {
        menuId: 'stock',
        menuUrl: '/stock',
        menuName: 'Stock',
        icon: 'boxes-stacked',
        description: 'Managing inventory',
        roles: ['dev']
      },
      {
        menuId: 'customer-stock',
        menuUrl: '/customer-stock',
        menuName: 'Customer Stock',
        icon: 'people-carry-box',
        description: 'Managing customer stocks',
        roles: ['dev']
      },
      {
        menuId: 'entries',
        menuUrl: '/entries',
        menuName: 'Entries',
        icon: 'dolly',
        description: 'Managing entries',
        roles: ['dev']
      },
      {
        menuId: 'departures',
        menuUrl: '/departures',
        menuName: 'Departures',
        icon: 'truck-ramp-box',
        description: 'Managing departures',
        roles: ['dev']
      },
      {
        menuId: 'purchase-order',
        menuUrl: '/purchase-order',
        menuName: 'Purchase Order',
        icon: 'sheet-plastic',
        description: 'Managing purchase order',
        roles: ['dev']
      },
      {
        menuId: 'products',
        menuUrl: '/products',
        menuName: 'Products',
        icon: 'box',
        description: 'Managing products',
        roles: ['dev']
      },
      {
        menuId: 'customers',
        menuUrl: '/customers',
        menuName: 'Customers',
        icon: 'user-group',
        description: 'Managing customers',
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
        menuId: 'unit-measure',
        menuUrl: '/unit-measure',
        menuName: 'Unit Measure',
        icon: 'ruler',
        description: 'Managing unit measures',
        roles: ['dev'],
      },
      {
        menuId: 'brand',
        menuUrl: '/brand',
        menuName: 'Brands',
        icon: 'copyright',
        description: 'Managing brands',
        roles: ['dev'],
      },
      {
        menuId: 'model',
        menuUrl: '/model',
        menuName: 'Models',
        icon: 'tag',
        description: 'Managing models',
        roles: ['dev'],
      },
      {
        menuId: 'warehouse',
        menuUrl: '/warehouse',
        menuName: 'Warehouses',
        icon: 'warehouse',
        description: 'Managing warehouse',
        roles: ['dev'],
      },
      {
        menuId: 'type-currency',
        menuUrl: '/type-currency',
        menuName: 'Type Currency',
        icon: 'coins',
        description: 'Managing type currency',
        roles: ['dev'],
      },
      {
        menuId: 'countries',
        menuUrl: '/countries',
        menuName: 'Countries',
        icon: 'flag',
        description: 'Managing countries',
        roles: ['dev'],
      },
      {
        menuId: 'product-features',
        menuUrl: '/product-features',
        menuName: 'Product Features',
        icon: 'list-check',
        description: 'Managing product features',
        roles: ['dev'],
      },
      {
        menuId: 'product-kit',
        menuUrl: '/product-kit',
        menuName: 'Product Kit',
        icon: 'boxes-packing',
        description: 'Managing product kit',
        roles: ['dev'],
      },
      {
        menuId: 'product-category',
        menuUrl: '/product-category',
        menuName: 'Product Category',
        icon: 'layer-group',
        description: 'Managing product category',
        roles: ['dev'],
      },
      {
        menuId: 'product-status',
        menuUrl: '/product-status',
        menuName: 'Product Status',
        icon: 'object-ungroup',
        description: 'Managing product status',
        roles: ['dev'],
      },
      {
        menuId: 'colors',
        menuUrl: '/colors',
        menuName: 'Colors',
        icon: 'fill-drip',
        description: 'Managing colors',
        roles: ['dev'],
      },
      {
        menuId: 'entry-type',
        menuUrl: '/entry-type',
        menuName: 'Entry Type',
        icon: 'pen-to-square',
        description: 'Managing entry type',
        roles: ['dev'],
      },
      {
        menuId: 'employees',
        menuUrl: '/employees',
        menuName: 'Employees',
        icon: 'users',
        description: 'Managing employees',
        roles: ['dev'],
      },
      {
        menuId: 'suppliers',
        menuUrl: '/suppliers',
        menuName: 'Suppliers',
        icon: 'truck-field',
        description: 'Managing suppliers',
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
      // {
      //   menuId: 'roles',
      //   menuUrl: '/roles',
      //   menuName: 'Roles',
      //   icon: 'users-gear',
      //   description: 'Managing role access permissions',
      //   roles: ['dev']
      // },
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