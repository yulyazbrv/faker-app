import { Button, Flex } from "@mantine/core";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const CSVButton = (props) => {
  const { data } = props;
  const exportToCSV = () => {
    const csv = Papa.unparse(data, {
      header: true,
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "users.csv");
  };
  return (
    <Flex w={"100"}>
      <Button onClick={exportToCSV}>Export to CSV {data.length} users</Button>
    </Flex>
  );
};

export { CSVButton };
