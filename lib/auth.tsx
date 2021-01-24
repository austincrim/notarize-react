import * as React from 'react';
import Router from 'next/router';
import firebase from './firebase';

interface User {
  uid: string;
  email: string;
  name: string;
  token: string;
  provider: string;
  photoUrl: string;
}

interface UseAuthValue {
  user: User;
  loading: boolean;
  signinWithGitHub: Function;
  signout: Function;
}

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth(): UseAuthValue {
  return React.useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  async function handleUser(rawUser) {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      // set auth cookie
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      // remove auth cookie
      setLoading(false);
      return false;
    }
  }
  async function signinWithGitHub(redirect) {
    setLoading(true);
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    handleUser(response.user);

    if (redirect) {
      Router.push(redirect);
    }
  }

  function signout() {
    Router.push('/');

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  }

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signout,
  };
}

async function formatUser(user) {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoUrl,
  };
}
