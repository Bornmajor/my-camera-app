
import { registerRootComponent } from 'expo';
import { MyContextProvider } from './context/context';
import MainNavigation from './components/MainNavigation';
export default function App() {


  return (
    <>
    <MyContextProvider>
      <MainNavigation />
    </MyContextProvider>
    </>
   
  );
}



registerRootComponent(App); // Registering the root component