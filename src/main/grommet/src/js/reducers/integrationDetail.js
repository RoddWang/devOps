import { INTEGRATION_ALLINFO_CLEAR} from '../actions/integration';
import { INTEGRATION_DETAIL} from '../actions/integration';


import Immutable  from 'immutable';



export default function integrationDetail(state = Immutable.Map(), action) {
  console.log("integrationOverview",state);
  switch (action.type) {
    case INTEGRATION_DETAIL:
      return state.push(action.data);
    case INTEGRATION_ALLINFO_CLEAR:
      return Immutable.Map();
    default:
      return state;
  }
}


