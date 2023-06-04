import { Flex, Loader, Table } from "@mantine/core";
import "./style.css";
import useInfiniteScroll from "react-infinite-scroll-hook";

const FakeTable = (props) => {
  const { users, loadMoreUsers } = props;
  const hasNextPage = true;
  const [infiniteRef] = useInfiniteScroll({
    loading: null,
    hasNextPage: true,
    onLoadMore: loadMoreUsers,
    rootMargin: "0px 0px 400px 0px",
  });
  const rows = users.map((element, i) => (
    <tr key={element.id}>
      <th scope="row">{i + 1}</th>
      <td>{element.id}</td>
      <td>{element.fullName}</td>
      <td>{element.address}</td>
      <td>{element.phone}</td>
    </tr>
  ));
  return (
    <Flex>
      <Table>
        <thead>
          <tr>
            <th>index</th>
            <th>id</th>
            <th>full name</th>
            <th>address</th>
            <th>phone number</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          {hasNextPage && (
            <tr ref={infiniteRef}>
              <td colSpan="5">
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Flex>
  );
};

export { FakeTable };
