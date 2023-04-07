import React ,{Component} from "react"
// import { useParams, useNavigate } from "react-router";
// export function withRouter( Child ) {
//     return ( props ) => {
//       const params = useParams();
//       const navigate = useNavigate();
//       return <Child { ...props } params ={ params } />;
//     }
//   }
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
  export default function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }