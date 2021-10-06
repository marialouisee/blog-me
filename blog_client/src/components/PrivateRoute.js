import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({ path, component, redirectTo = '/login'}) => {
    const { user, authIsDone } = useContext(UserContext);

    if (!authIsDone) {
      return (
        <div className="page-wrapper">
          <h5>Spinner HERE</h5>
        </div>
      );
    }

    if(authIsDone){
        return (
            user? (
                <Route path={path} component={component}></Route>
              ) : (
                <Redirect to={redirectTo} />
              )
        )
    }
}

export default PrivateRoute
