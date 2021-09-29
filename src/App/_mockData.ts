const remotes = [
  {
    path: '/iam',
    label: 'Roles Microfrontend',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_1_URL}/app.js`,
    appName: 'reporting_hub_bop_role_ui',
  },
  {
    path: '/transfers',
    label: 'Transfers Microfrontend',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_2_URL}/app.js`,
    appName: 'reporting_hub_bop_trx_ui',
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
