import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import styles from './GoogleAuth.module.css';

const GoogleAuth = ({ isSignedIn, signIn, signOut }) => {
  const [auth, setAuth] = useState(null);

  const CLIENT_ID = process.env.REACT_APP_GoogleAuth_ClientID;

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          const googleAuth = window.gapi.auth2.getAuthInstance();
          if (googleAuth.isSignedIn.get()) {
            signIn(googleAuth.currentUser.get().getId());
          } else {
            signOut();
          }

          googleAuth.isSignedIn.listen((isSignedIn) => {
            if (isSignedIn) {
              signIn(googleAuth.currentUser.get().getId());
            } else {
              signOut();
            }
          });

          setAuth(googleAuth);
        });
    });
  }, []);

  const handleSignIn = () => {
    auth && auth.signIn();
  };

  const handleSignOut = () => {
    auth && auth.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button className={styles['user-btn']} onClick={handleSignOut}>
          Sign Out
        </button>
      );
    } else {
      return (
        <button className={styles['user-btn']} onClick={handleSignIn}>
          Sign In
        </button>
      );
    }
  };

  return <div className={styles.user}>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
