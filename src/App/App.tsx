import React, { useEffect } from 'react';
import { Layout, MessageBox, Spinner } from 'components';
import Router from './Router';
import appConnector, { AppProps } from './connectors';
import { Remote } from './types';
import './default_App.scss';

function App({ userEmail, onMount, remotes, logout }: AppProps) {
  useEffect(() => {
    onMount();

    const scssPath = process.env.REACT_APP_SCSS;
    document.title = process.env.REACT_APP_TITLE || 'Mojaloop Finance Portal';

    if (scssPath) {
      import(`${scssPath}`).then(() => {}).catch(() => {});
    }
  }, [onMount]);

  let content = null;
  if (remotes.pending || !remotes.initialized) {
    content = <Spinner center />;
  } else if (remotes.error) {
    content = <MessageBox kind="danger">{remotes.error}</MessageBox>;
  } else {
    content = <Router remotes={remotes.data as Remote[]} />;
  }

  return (
    <Layout className="layout__container">
      {/* TODO: Preferably we pop up a menu here */}
      <Layout.Navbar
        username={userEmail}
        title={process.env.REACT_APP_TITLE || 'Mojaloops Finance Portal'}
        onUsernameClick={logout}
      >
        <div className="navbar__user-info">
          <img src={process.env.REACT_APP_DFSP_IMG} className="navbar__email-icon" alt="" />
        </div>

        <div className="rc-layout__navbar__logo" />
      </Layout.Navbar>
      <Layout.Content>{content}</Layout.Content>
    </Layout>
  );
}

export default appConnector(App);
