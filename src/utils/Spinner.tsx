import { Flex, Spin } from "antd";

const Spinner = () => {
  return (
    <div className="w-screen flex justify-center justify-items-center">
      <div className="flex justify-center justify-items-center">
        <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
      </div>
      
    </div>
  );
}


export default Spinner;