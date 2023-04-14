import { FC } from 'react';
import { Breadcrumb } from 'antd';
import { useTypedSelector } from 'hooks/useTypedSelector';

export const BreadCrumbs: FC = () => {

    const { repoInfo } = useTypedSelector(state => state.repo);
    const items = [
        { title: <a href={repoInfo.ownerUrl} target="_blank">{repoInfo.owner}</a> },
        { title: <a href={repoInfo.url} target="_blank">{repoInfo.name}</a>, },
        { title: `${repoInfo.stargazers_count}` }
    ]
    return (
        <>
            {
                Object.keys(repoInfo).length ? (
                    <Breadcrumb
                        data-testid='repo-bread-crumbs'
                        items={items}
                    />
                ) : null
            }
        </>
    );
};