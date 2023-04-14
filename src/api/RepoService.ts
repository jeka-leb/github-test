import { IGitHubIssue, IIssue, IUser, IssueState, IUserNormolized, INormalizedIssues } from "models/issuesModel";
import { IRepo, INormalizedRepo } from 'models/repoModel'

//'https://github.com/facebook/react'

class RepoService {

    getNormalizedData = async (url: string): Promise<[INormalizedIssues, INormalizedRepo]> => {
        const { newUrlForIssues, newUrlForRepos } = this.transformURL(url);
        const issuesResponse = await this.getData(newUrlForIssues);
        const repoResponse = await this.getData(newUrlForRepos);
        const issues = await issuesResponse.json();
        const repo = await repoResponse.json();
        const normalizedIssues = (issues as IGitHubIssue[])?.map(issue => this.normalizeIssue(issue))
        const normalizeRepo = this.normalizedRepo((repo as IRepo));

        return [{
            openedIssues: normalizedIssues.filter(issue => issue.state === IssueState.OPEN),
            inProgressIssues: normalizedIssues.filter(issue => issue.state === IssueState.INPROGRESS),
            closedIssues: normalizedIssues.filter(issue => issue.state === IssueState.CLOSED),
        }, normalizeRepo]
    }

    private transformURL = (initialUrl: string): { [props: string]: string } => {
        const urlObject = new URL(initialUrl);
        const urlArr = urlObject.pathname.split('/');
        const newUrlForIssues = `https://api.github.com/repos/${urlArr[1]}/${urlArr[2]}/issues?per_page=10`;
        const newUrlForRepos = `https://api.github.com/repos/${urlArr[1]}/${urlArr[2]}`;

        return {
            newUrlForIssues,
            newUrlForRepos
        }
    }

    private getData = async (url: string): Promise<Response> => {
        const response = await fetch(url, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
                accept: 'application/vnd.github+json',
            },
        });
        if (!response.ok) throw new Error('Somthing went wrong!')

        return response
    }

    private normalizeIssue = (issue: IGitHubIssue): IIssue => {
        let state

        if (issue.state === IssueState.CLOSED) {
            state = IssueState.CLOSED
        } else if (issue.state === IssueState.OPEN
            && (issue.assignee || issue.assignees?.length)
        ) {
            state = IssueState.INPROGRESS
        } else {
            state = IssueState.OPEN
        }

        return {
            id: issue.id,
            order: issue.number,
            title: issue.title,
            createdAt: issue.created_at,
            closedAt: issue.closed_at,
            commentsNumber: issue.comments,
            user: this.normalizeUser(issue.user),
            state,
            assignee: issue.assignee ? this.normalizeUser(issue.assignee) : undefined,
            assignees: issue.assignees?.map((assignee) => this.normalizeUser(assignee)),
        }
    }

    private normalizeUser = (user: IUser): IUserNormolized => {

        return {
            id: user.id,
            name: user.login,
        }
    }

    private normalizedRepo = (repo: IRepo): INormalizedRepo => {
        return {
            id: repo.id,
            name: repo.name,
            owner: repo.owner.login,
            ownerUrl: repo.owner.html_url,
            url: repo.clone_url,
            stargazers_count: repo.stargazers_count
        }
    }
}

const repoService = new RepoService();
export default repoService;