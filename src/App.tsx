import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleAuthProvider, User, getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect } from 'firebase/auth'

function App() {
  const [count, setCount] = useState(0)

  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  const handleGoogleLoginButtonClick = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  }

  const handleLogoutButtonClick = () => {
    auth.signOut().then(() => console.log(`logged out!`));
  }

  getRedirectResult(auth)
    .then((result) => {
      if(result){
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential){
          const token = credential.accessToken;

          // The signed-in user info.
          //const newUser = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          
          
        }
      }
      
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.error(errorCode, errorMessage, email, credential);
    });

    onAuthStateChanged(auth, newUser => {
      setUser(newUser);
      console.log(`you are logged in as`, newUser);
    })

  
    useEffect(() =>{
      console.log('new user')
    }, [user]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{user ? `Hello ${user.displayName}!` : 'Vite + React'}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR WOW
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={handleGoogleLoginButtonClick}>
        Login with Google
      </button>
      <br />
      <br />
      <button onClick={handleLogoutButtonClick}>
        Logout
      </button>
    </>
  )
}

export default App
