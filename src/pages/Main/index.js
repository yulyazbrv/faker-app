import { Flex } from "@mantine/core";
import { Control } from "../../components/Control";
import { FakeTable } from "../../components/Table";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const Main = () => {
  const [region, setRegion] = useState("ru");
  const [seed, setSeed] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    faker.setLocale(region);
    faker.seed(+seed);
    setUsers(generateUsers(20));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, errorCount, seed]);

  const generateUsers = (count, usersLength) => {
    const newUsers = [];
    usersLength = usersLength ? usersLength : 0;
    for (let i = 0; i < count; i++) {
      const user = {
        key: usersLength + i + 1,
        index: usersLength + i + 1,
        id: faker.datatype.uuid(),
        fullName: faker.name.fullName(),
        address: faker.address.streetAddress(),
        phone: faker.phone.number(),
      };

      handleError(user);
      newUsers.push(user);
    }

    return newUsers;
  };

  const loadMoreUsers = () => {
    const newUsers = generateUsers(10, users.length);
    const updatedUsers = [...users, ...newUsers];
    setUsers(updatedUsers);
  };

  const handleSeedChange = (e) => {
    setSeed(e);
  };

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 100000));
  };

  const handleError = (user) => {
    const alphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let j = 0; j < errorCount; j++) {
      const field = faker.helpers.arrayElement([
        "fullName",
        "address",
        "phone",
      ]);
      const value = user[field];

      if (value.length > 0) {
        const type = Math.floor(Math.random() * 3);

        if (type === 0) {
          const index = Math.floor(Math.random() * value.length);
          user[field] = value.slice(0, index) + value.slice(index + 1);
        } else if (type === 1) {
          const index = Math.floor(Math.random() * (value.length + 1));
          const char = alphabet[Math.floor(Math.random() * alphabet.length)];
          user[field] = value.slice(0, index) + char + value.slice(index);
        } else {
          const index = Math.floor(Math.random() * (value.length - 1));
          user[field] =
            value.slice(0, index) +
            value.charAt(index + 1) +
            value.charAt(index) +
            value.slice(index + 2);
        }
      }
    }
  };
  return (
    <Flex direction={"column"} gap={20}>
      <Control
        errorCount={errorCount}
        setErrorCount={setErrorCount}
        seed={seed}
        setRegion={setRegion}
        handleSeedChange={handleSeedChange}
        handleRandomSeed={handleRandomSeed}
      ></Control>
      <FakeTable loadMoreUsers={loadMoreUsers} users={users}></FakeTable>
    </Flex>
  );
};

export { Main };
