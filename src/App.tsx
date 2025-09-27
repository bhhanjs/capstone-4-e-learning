import useRouterElements from "./routes/elements";
import AppInitializer from "./components/shared/app-initial";
import InactiveAutoLogout from "./routes/auth-security/auto-logout";

function App() {
  const elements = useRouterElements();
  return (
    <InactiveAutoLogout>
      <AppInitializer>{elements}</AppInitializer>
    </InactiveAutoLogout>
  );
}

export default App;
