import styled from 'styled-components';
import type { NextPage } from 'next';
import ReactPaginate from 'react-paginate';
import JsonData from '../MOCK_DATA.json';

import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const [users, setUsers] = useState(JsonData.slice(0, 50));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(user => (
      <UsersCard key={user.id}>
        <h5>{user.firstName}</h5>
        <h5>{user.lastName}</h5>
        <h6>{user.email}</h6>
      </UsersCard>
    ));

  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <UsersWrapper>{displayUsers}</UsersWrapper>
      <PaginationWrapper>
        <MyPaginate pageCount={pageCount} onPageChange={handlePageChange} />
      </PaginationWrapper>
    </>
  );
};

//Item Styles

const UsersWrapper = styled.div`
  padding: 64px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
`;
const UsersCard = styled.div`
  border: 1px solid gray;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

//Pagination Styles

const PaginationWrapper = styled.div`
  padding: 32px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  gap: 8px;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export default Home;
