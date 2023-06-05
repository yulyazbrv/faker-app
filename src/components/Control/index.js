import { Button, Flex, NumberInput, Select, Slider } from "@mantine/core";

const Control = (props) => {
  const {
    setRegion,
    errorCount,
    seed,
    setErrorCount,
    handleSeedChange,
    handleRandomSeed
  } = props;
  return (
    <Flex direction={"row"} justify={"space-around"} align={"flex-start"}>
      <Select
        label="Region:"
        placeholder="Pick one"
        onChange={(value) => setRegion(value)}
        data={[
          { value: "ru", label: "Russia" },
          { value: "en", label: "USA" },
          { value: "it", label: "Italian" },
          { value: "fr", label: "French" },
        ]}
      />
      <Flex direction={"column"} gap={2}>
        <NumberInput
          defaultValue={0}
          placeholder="errors"
          label="Number of errors"
          withAsterisk
          step={0.5}
          min={0}
          max={1000}
          value={errorCount}
          onChange={setErrorCount}
        />
        <Slider value={errorCount} onChange={setErrorCount} />
      </Flex>
      <Flex direction={"row"} align={"flex-end"} gap={2}>
        <NumberInput
          defaultValue={0}
          placeholder="seed"
          label="Seed"
          withAsterisk
          value={seed}
          onChange={handleSeedChange}
        />
        <Button onClick={handleRandomSeed}>Generate</Button>
      </Flex>
    </Flex>
  );
};

export { Control };
