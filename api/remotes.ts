const remotes = [
  {
    path: '/iam',
    label: 'Roles',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_1_URL}/app.js`,
    appName: 'reporting_hub_bop_role_ui',
  },
  {
    path: '/transfers',
    label: 'Transfers',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_2_URL}/app.js`,
    appName: 'reporting_hub_bop_trx_ui',
  },
  {
    path: '/settlements',
    label: 'Settlements',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_3_URL}/app.js`,
    appName: 'reporting_hub_bop_settlements_ui',
  },
  {
    path: '/positions',
    label: 'Financial Positions',
    menuComponent: 'Menu',
    appComponent: 'App',
    url: `${process.env.REMOTE_4_URL}/app.js`,
    appName: 'reporting_hub_bop_positions_ui',
  },
];



export default function readRemotes(req, res) {
  res.status(200).json(remotes);
}
