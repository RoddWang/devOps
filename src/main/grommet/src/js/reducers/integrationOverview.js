import { INTEGRATION_ALLINFO ,INTEGRATION_ALLINFO_CLEAR} from '../actions/integration';


import Immutable  from 'immutable';


export default function integrationOverview(state = Immutable.Map(), action) {
  console.log("integrationOverview",state);
  let newState;
  switch (action.type) {
    case INTEGRATION_ALLINFO:
      newState = Immutable.Map(action.data);
      return newState;
    case INTEGRATION_ALLINFO_CLEAR:
      return Immutable.Map();
    default:
      return state;
  }
}


