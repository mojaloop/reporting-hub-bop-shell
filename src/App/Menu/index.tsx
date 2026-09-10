import React from 'react';
import { Menu } from 'components';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from 'utils/loader';
import { MenuItemElement } from '@modusbox/react-components/lib/components/Menu/types';
import { Remote } from 'App/types';
import './Menu.scss';

function isActive(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

// A container is fetched when its section is entered, so opening the portal
// costs one request rather than one per remote
function getMenuItems(remotes: Remote[], pathname: string, onChange: (path: string) => void) {
  return remotes.map(({ path, label, menuComponent, url, scope, crossOrigin }) => {
    const children = [<Menu.Item key="back" path="/" label="back to main menu" back />];
    if (isActive(pathname, path)) {
      children.push(
        <Loader
          key="app"
          main={false}
          url={url}
          scope={scope}
          crossOrigin={crossOrigin}
          component={menuComponent}
          pathname={pathname}
          onChange={onChange}
          path={path}
        />,
      );
    }
    return (
      <Menu.Item key={path} path={path} label={label} partial>
        {children}
      </Menu.Item>
    );
  });
}

interface MainMenuProps {
  remotes: Remote[];
}
function MainMenu({ remotes }: MainMenuProps) {
  const history = useHistory();
  const location = useLocation();
  const menuProps = {
    path: '/',
    pathname: location.pathname,
    onChange: history.push,
  };

  const menuItems = getMenuItems(
    remotes,
    location.pathname,
    history.push,
  ) as unknown as MenuItemElement;

  const menu = (
    <Menu {...menuProps}>
      <Menu.Section label="Apps">{menuItems}</Menu.Section>
    </Menu>
  );

  return <div className="app__menu">{menu}</div>;
}

export default MainMenu;
