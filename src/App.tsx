import { Layout, Row } from 'antd';

import { SearchForm } from 'components/SearchForm/SearchForm';
import { TrelloItemsContainer } from 'components/TrelloItemsContainer';
import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';

import './App.css';

function App() {

  return (
    <Layout >
      <Layout.Header
        style={{
          padding: 24,
          margin: 0,
          background: 'transparent'
        }}
      >
        <SearchForm />
      </Layout.Header>
      <Layout.Content
        className='h100'
        style={{
          padding: 24,
          margin: 0,
        }}>
        <Row
          justify='start'
          style={{
            padding: 10,
            margin: 0,
          }}
        >
          <BreadCrumbs
          />
        </Row>
        <TrelloItemsContainer />
      </Layout.Content>

    </Layout>
  );
}

export default App;
