import './App.css';
import Home from './pages/home/Home';
import Welcome from './pages/welcome/Welcome';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import {onError} from '@apollo/client/link/error';
import { AppContextProvider } from './context/AppContext';

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path})=>{
      alert(`GraphQL Error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: "https://stagewoodtc.herokuapp.com/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://stagewoodtc.herokuapp.com/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/welcome" component={Welcome} />
          </Switch>
        </BrowserRouter>
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default App;


