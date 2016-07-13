import Immutable  from 'immutable';
import {GIT_REPO_INFO }from '../actions/codeRepository';
import { INTEGRATION_ALLINFO_CLEAR } from '../actions/integration';
import { GIT_REPO_INFO_LANGUAGES} from '../actions/codeRepository';
const defaultRepository = Immutable.Map({
  git:Immutable.Map({repository:Immutable.Map(),
  language:Immutable.Map()})
});
export default function code(state = defaultRepository, action) {
  console.log("code repository",state);

  switch (action.type) {
    case GIT_REPO_INFO:
      console.log("code repository GIT_REPO_INFO",state);
      let git_repository =  state.get('git').set('repository',Immutable.Map(action.data));
      return state.set('git',git_repository);
    case GIT_REPO_INFO_LANGUAGES:
      let git_language =  state.get('git').set('language',Immutable.Map(action.data));
      return state.set('git',git_language);
    case INTEGRATION_ALLINFO_CLEAR:
      return defaultRepository;
    default:
      return state;
  }
}


