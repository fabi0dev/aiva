import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { FC } from "react";
import { AivaLogo } from "@components/AivaLogo";

export const Chat: FC = () => {
  return (
    <Content>
      <SubContent>
        <AivaLogo />

        <div className="grid grid-cols-2 gap-2"></div>
      </SubContent>
    </Content>
  );
};
