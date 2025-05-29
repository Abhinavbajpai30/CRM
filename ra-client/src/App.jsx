import {Admin, EditGuesser, ListGuesser, Resource, radiantLightTheme, radiantDarkTheme} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./components/users/UserList";
import { UserEdit } from "./components/users/UserEdit";
import { UserCreate } from "./components/users/UserCreate";
import { ClientList } from "./components/clients/ClientList";
import { ClientEdit } from "./components/clients/ClientEdit";
import { ClientCreate } from "./components/clients/ClientCreate";
import Dashboard from "./components/Dashboard";
import authProvider from "./utils/authProvider";
import { ProjectList } from "./components/projects/ProjectList";
import { ProjectEdit } from "./components/projects/ProjectEdit";
import { ProjectCreate } from "./components/projects/ProjectCreate";
import { ContentpieceList } from "./components/contentPieces/ContentpieceList";
import { ContentpieceShow } from "./components/contentPieces/ContentpieceShow";
import { ContentpieceEdit } from "./components/contentPieces/ContentpieceEdit";
import { ContentpieceCreate } from "./components/contentPieces/ContentpieceCreate";

const dataProvider = jsonServerProvider(import.meta.env.VITE_JSON_SERVER_URL);

const App = () => {
  return (
      <Admin dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider} theme={radiantLightTheme} darkTheme={radiantDarkTheme}>
          <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
          <Resource name="clients" list={ClientList} edit={ClientEdit} create={ClientCreate} />
          <Resource name="projects" list={ProjectList} edit={ProjectEdit} create={ProjectCreate}/>
          
          <Resource name="contentPieces" list={ContentpieceList} show={ContentpieceShow} edit={ContentpieceEdit} create={ContentpieceCreate}/>
      </Admin>)
}

export default App
