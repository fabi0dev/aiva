import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { FC } from "react";
import { Notices } from "./Notices";
import { AivaLogo } from "@components/AivaLogo";
import { Divider } from "@components/Divider";

export const OverView: FC = () => {
  return (
    <Content>
      <SubContent>
        <AivaLogo />

        <div className="sm:grid sm:grid-cols-2 gap-2">
          <Divider className="sm:hidden" />
          <Notices />
        </div>
      </SubContent>
    </Content>
  );
};
