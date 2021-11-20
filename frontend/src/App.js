import {Route, Switch} from "react-router-dom";
import {Typography} from "@material-ui/core";

import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import Home from "./containers/Home/Home";
import AddNewItem from "./containers/AddNewItem/AddNewItem";
import SingleItem from "./containers/SingleItem/SingleItem";

const App = () => {
  return (
      <Layout>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/items" exact component={Home} />
              <Route path="/items/add" exact component={AddNewItem} />
              <Route path="/items/:id" exact component={SingleItem} />
              <Route path="/register" component={Registration} />
              <Route path="/login" component={Login} />
              <Route render={() => <Typography variant="h4">Not found</Typography>} />
          </Switch>
      </Layout>
  );
};

export default App;