const remotes = [
  {
    path: '/iam',
    label: 'Roles',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_1_URL}/app.js`,
    scope: 'reporting_hub_bop_role_ui',
    permission: 'portalRoles.view',
  },
  {
    path: '/transfers',
    label: 'Transfers',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_2_URL}/app.js`,
    scope: 'reporting_hub_bop_trx_ui',
    permission: 'portalTransfers.view',
  },
  {
    path: '/settlements',
    label: 'Settlements',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_3_URL}/app.js`,
    scope: 'reporting_hub_bop_settlements_ui',
    permission: 'portalSettlements.view',
  },
  {
    path: '/positions',
    label: 'Financial Positions',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_4_URL}/app.js`,
    scope: 'reporting_hub_bop_positions_ui',
    permission: 'portalPositions.view',
  },
];

export default {
  read: {
    delay: 2000,
    call: () => ({
      status: 200,
      data: remotes,
    }),
  },
};
