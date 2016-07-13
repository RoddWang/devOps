
import {  processStatus } from 'grommet/utils/Rest';

export const GIT_REPO_INFO='GIT_REPO_INFO';
export const GIT_REPO_INFO_LANGUAGES='GIT_REPO_INFO_LANGUAGES';
//gitUrl=git@github.hpe.com:xiang-guan/DevOps.git
export function gitGitHubRepository(gitUrl) {
  let repo = gitUrl.split(":")[1].split(".")[0];
  return dispatch => {
    return fetch('https://github.hpe.com/api/v3/repos/'+repo)
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      console.log("action repository",result);
      return dispatch({type:GIT_REPO_INFO,data:result});
    });
  };
}

//https://github.hpe.com/api/v3/repos/xiang-guan/DevOps/languages
export function gitGitHubRepositoryLanguages(gitUrl) {
  let repo = gitUrl.split(":")[1].split(".")[0];
  return dispatch => {
    return fetch('https://github.hpe.com/api/v3/repos/'+repo+'/languages')
    .then(processStatus)
    .then(response => response.json())
    .then(result => {
      return dispatch({type:GIT_REPO_INFO_LANGUAGES,data:result});
    });
  };
}

