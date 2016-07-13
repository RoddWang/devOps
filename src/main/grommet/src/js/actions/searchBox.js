//import Rest from 'grommet/utils/Rest';
export const OPEN_CREATE_PROJECT_LAYER = 'OPEN_CREATE_PROJECT_LAYER';

export function openNewProjectLayerAction() {
 
  return dispatch => {
    dispatch({type:OPEN_CREATE_PROJECT_LAYER});
  };

};

