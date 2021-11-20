import {Route, Switch} from "react-router-dom";
import {Typography} from "@material-ui/core";

import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import Home from "./containers/Home/Home";

const App = () => {
  return (
      <Layout>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/items" exact component={Home} />
              <Route path="/register" component={Registration} />
              <Route path="/login" component={Login} />
              <Route render={() => <Typography variant="h4">Not found</Typography>} />
          </Switch>
      </Layout>
  );
};

export default App;