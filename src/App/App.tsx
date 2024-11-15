import React, { useEffect } from 'react';
import { Layout, MessageBox, Spinner } from 'components';
import Router from './Router';
import appConnector, { AppProps } from './connectors';
import { Remote } from './types';
import './App.scss';

function App({ userEmail, onMount, remotes, logout, customization }: AppProps) {
  useEffect(() => {
    onMount();

    document.title = customization.title || 'Mojaloop Finance Portal';
  }, [onMount]);

  let content = null;
  if (remotes.pending || !remotes.initialized) {
    content = <Spinner center />;
  } else if (remotes.error) {
    content = <MessageBox kind="danger">{remotes.error}</MessageBox>;
  } else {
    content = <Router remotes={remotes.data as Remote[]} />;
    content = (
      <>
        <Router remotes={remotes.data as Remote[]} />
      </>
    );
  }

  return (
    <Layout className="layout__container">
      {/* TODO: Preferably we pop up a menu here */}
      <Layout.Navbar username={userEmail} title={customization.title} onUsernameClick={logout}>
        <div className="navbar__user-info">
          {customization.dfspImg ? (
            <img src={customization.dfspImg} className="navbar__email-icon" alt="" />
          ) : null}
        </div>

        <div
          className="rc-layout__navbar__logo"
          style={{
            backgroundImage: customization.titleImage
              ? `url(${customization.titleImage})`
              : undefined,
          }}
        />
      </Layout.Navbar>
      <Layout.Content>{content}</Layout.Content>
    </Layout>
  );
}

export default appConnector(App);
