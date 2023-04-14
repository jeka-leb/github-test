import React, { FC, useState } from 'react';
import { Row, Col } from 'antd';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { IIssue, INormalizedIssues } from 'models/issuesModel';
import { useAction } from 'hooks/useAction';

import { TrelloItems } from './TrelloItems';

enum issueTypeMapToTitle {
    openedIssues = 'To do',
    inProgressIssues = 'In progress',
    closedIssues = 'Closed'
}

export const TrelloItemsContainer: FC = () => {
    const { setDragAndDrop } = useAction();
    const [currentTrello, setCurrentTrello] = useState<IIssue[] | null>(null);
    const [currentIssue, setCurrentIssue] = useState<IIssue | null>(null);
    const [currentIssueType, setCurrentIssueType] = useState('');

    const { issues } =
        useTypedSelector(state => state.repo)

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const dragStartHandler = (e: React.DragEvent<Element>, issue: IIssue, trello: IIssue[], issueType: string) => {
        setCurrentTrello(trello);
        setCurrentIssue(issue);
        setCurrentIssueType(issueType)
    };

    const dropTrelloHandler = (e: React.DragEvent<Element>, trello: IIssue[], issueType: string) => {
        e.preventDefault();
        setDragAndDrop({
            currentData: {
                trello: currentTrello, issueType: currentIssueType, issue: currentIssue
            },
            targetData: {
                trello, issueType,
            }
        })
    };

    const dropHandler = (e: React.DragEvent<Element>, issue: IIssue, trello: IIssue[], issueType: string) => {
        e.preventDefault();
        e.stopPropagation();
        setDragAndDrop({
            currentData: {
                trello: currentTrello, issueType: currentIssueType, issue: currentIssue
            },
            targetData: {
                trello, issueType, issue
            }
        })
    };

    return (
        <Row gutter={16}>
            {Object.entries(issues as INormalizedIssues)?.map(([issueType, issuesByType]) => (
                <Col span={8} key={issueType}>
                    <TrelloItems
                        dragOverHandler={dragOverHandler}
                        dragStartHandler={dragStartHandler}
                        dropHandler={dropHandler}
                        dropTrelloHandler={dropTrelloHandler}
                        trello={issuesByType}
                        issueType={issueType}
                        title={issueTypeMapToTitle[issueType as keyof typeof issueTypeMapToTitle]}
                    />
                </Col>
            ))}
        </Row>
    );
};

