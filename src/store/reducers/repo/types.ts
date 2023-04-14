import { IIssue, INormalizedIssues } from "models/issuesModel";
import { INormalizedRepo } from "models/repoModel";

interface ISetOFData {
    trello: IIssue[] | null;
    issue?: IIssue | null;
    issueType: string;
}

export interface IDNDPayload {
    currentData: ISetOFData;
    targetData: ISetOFData;
}

export interface RepoState {
    issues: INormalizedIssues;
    repoInfo: INormalizedRepo;
    isLoading: boolean;
    error: string;
}

export enum RepoActionsEnum {
    SET_REPO = 'SET_REPO',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR',
    SET_DND = 'SET_DND'
}

export interface SetRepoAction {
    type: RepoActionsEnum.SET_REPO;
    payload: [INormalizedIssues, INormalizedRepo]
}

export interface SetIsLoadingAction {
    type: RepoActionsEnum.SET_IS_LOADING;
    payload: boolean
}

export interface SetErrorAction {
    type: RepoActionsEnum.SET_ERROR;
    payload: string
}

export interface SetDragAndDrop {
    type: RepoActionsEnum.SET_DND;
    payload: IDNDPayload
}

export type RepoActions = SetRepoAction | SetIsLoadingAction | SetErrorAction | SetDragAndDrop;