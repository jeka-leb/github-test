import { INormalizedIssues } from "models/issuesModel";
import { INormalizedRepo } from "models/repoModel";

import { RepoActions, RepoActionsEnum, RepoState } from "./types";

const initialState: RepoState = {
    issues: {} as INormalizedIssues,
    repoInfo: {} as INormalizedRepo,
    isLoading: false,
    error: ''
};

export const repo = (state = initialState, action: RepoActions) => {
    switch (action.type) {
        case RepoActionsEnum.SET_REPO:
            return {
                ...state,
                issues: action.payload[0],
                repoInfo: action.payload[1],
                isLoading: false
            };
        case RepoActionsEnum.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case RepoActionsEnum.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case RepoActionsEnum.SET_DND:
            const { currentData, targetData } = action.payload;
            const isTheSameTrello = currentData.issueType === targetData.issueType
            let indexToAdd;
            let trelloWithAddedIssue;
            const indexToRemove = state.issues[currentData.issueType as keyof typeof state.issues].findIndex(issue =>
                issue.id === currentData.issue?.id);
            const trelloWithRemovedIssue = [
                ...state.issues[currentData.issueType as keyof typeof state.issues].slice(0, indexToRemove),
                ...state.issues[currentData.issueType as keyof typeof state.issues].slice(indexToRemove + 1)
            ];
            if (targetData.issue) {
                indexToAdd = state.issues[targetData.issueType as keyof typeof state.issues].findIndex(issue =>
                    issue.id === targetData.issue?.id);
                trelloWithAddedIssue = [
                    ...state.issues[targetData.issueType as keyof typeof state.issues].slice(0, indexToAdd),
                    currentData.issue,
                    ...state.issues[targetData.issueType as keyof typeof state.issues].slice(indexToAdd),
                ];
                console.log('if', targetData.issue, trelloWithAddedIssue)
            } else {
                trelloWithAddedIssue = [currentData.issue]
                console.log('else', currentData.issue, trelloWithAddedIssue)
            }

            const result = isTheSameTrello ? {
                [currentData.issueType]: [
                    ...trelloWithRemovedIssue.slice(0, indexToAdd),
                    currentData.issue,
                    ...trelloWithRemovedIssue.slice(indexToAdd)
                ]
            } :
                {
                    [currentData.issueType]: trelloWithRemovedIssue,
                    [targetData.issueType]: trelloWithAddedIssue,
                };

            return {
                ...state,
                issues: {
                    ...state.issues,
                    ...result
                }
            };
        default:
            return state
    }
}