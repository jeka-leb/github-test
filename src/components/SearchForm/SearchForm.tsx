import { FC, useState } from 'react';
import { Button, Row, Form, Input, Col } from 'antd';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useAction } from 'hooks/useAction';

export const SearchForm: FC = () => {

    const [inputValue, setInputValue] = useState('');
    const { fetchIssues } = useAction();
    const { isLoading, error } = useTypedSelector(state => state.repo)
    const onFinish = () => {
        fetchIssues(inputValue)
    };

    return (
        <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
        >
            {error && <div style={{ color: 'red' }}>
                {error}
            </div>}
            <Row justify='space-between' gutter={24}>
                <Col span={16}>
                    <Form.Item
                        name="repo"
                        rules={[{ required: true, message: 'Please enter correct repo!' }]}
                    >
                        <Input
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder='Enter repo URL'
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
                            Load issues
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
