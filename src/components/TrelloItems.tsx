import { FC } from 'react';
import { Card, Typography, Descriptions } from 'antd';
import { IIssue } from 'models/issuesModel';


interface TrelloItemsProps {
    trello: IIssue[];
    title: string;
    issueType: string;
    dragOverHandler: (e: any) => void;
    dragStartHandler: (e: any, issue: IIssue, issues: IIssue[], issueType: string) => void;
    dropHandler: (e: any, issue: IIssue, issues: IIssue[], issueType: string) => void;
    dropTrelloHandler: (e: any, issues: IIssue[], issueType: string) => void;
}

export const TrelloItems: FC<TrelloItemsProps> = ({ trello, title, issueType, dragOverHandler,
    dragStartHandler, dropHandler, dropTrelloHandler }) => {

    return (
        <Card
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropTrelloHandler(e, trello, issueType)}
            title={title}
            bordered={false}
        >
            {trello?.map(issue => (
                <Card
                    draggable={true}
                    key={issue.id}
                    hoverable
                    bordered
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragStart={(e) => dragStartHandler(e, issue, trello, issueType)}
                    onDrop={(e) => dropHandler(e, issue, trello, issueType)}
                    style={{
                        marginTop: 10
                    }}
                >
                    <Descriptions title={issue.title} size='small'>
                        <Descriptions.Item >
                            <Typography.Text strong>
                                #{issue.order}
                            </Typography.Text>
                        </Descriptions.Item>
                        <Descriptions.Item >
                            <Typography.Text code>
                                comments: {issue.commentsNumber}
                            </Typography.Text>
                        </Descriptions.Item>
                        {issue.assignee &&
                            <Descriptions.Item >
                                <Typography>
                                    assignee: {issue.assignee?.name}
                                </Typography>
                            </Descriptions.Item>
                        }
                    </Descriptions>
                </Card>
            ))}
        </Card>
    );
};

