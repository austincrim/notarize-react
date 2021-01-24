import '../styles/globals.css';
import { NotesProvider } from '../components/context/NotesContext';
import { AuthProvider } from '../lib/auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotesProvider>
        <Component {...pageProps} />
      </NotesProvider>
    </AuthProvider>
  );
}

export default MyApp;
