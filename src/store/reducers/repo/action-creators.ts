import { INormalizedIssues } from "models/issuesModel";
import { INormalizedRepo } from "models/repoModel";
import repoService from "api/RepoService";
import { AppDispatch, RootState } from "store";

import {
    RepoActionsEnum, SetErrorAction, SetIsLoadingAction,
    SetRepoAction, IDNDPayload, SetDragAndDrop
} from "./types";

export const repoActionCreators = {
    setRepo: (repos: [INormalizedIssues, INormalizedRepo]): SetRepoAction => ({
        type: RepoActionsEnum.SET_REPO, payload: repos
    }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: RepoActionsEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type: RepoActionsEnum.SET_ERROR, payload }),
    setDragAndDrop: (payload: IDNDPayload): SetDragAndDrop => ({ type: RepoActionsEnum.SET_DND, payload }),

    fetchIssues: (url: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(repoActionCreators.setIsLoading(true));
            const response = await repoService.getNormalizedData(url)
            if (response) {
                const persistedLocalStateString = localStorage.getItem(response[1].id.toString());
                if (persistedLocalStateString) {
                    const persistedState = (JSON.parse(persistedLocalStateString)) as RootState;
                    console.log(persistedState, response)
                    dispatch(repoActionCreators.setRepo([persistedState.repo.issues, persistedState.repo.repoInfo]));
                } else {
                    dispatch(repoActionCreators.setRepo(response))
                }
            }
            dispatch(repoActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(repoActionCreators.setError('Error occured during the loading'))
        }
    },
}