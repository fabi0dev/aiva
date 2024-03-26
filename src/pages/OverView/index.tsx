import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@components/Card";
import { Notices } from "./Notices";
import { Climate } from "./Climate";
import { AivaLogo } from "@components/AivaLogo";

export const OverView: FC = () => {
  return (
    <Content>
      <SubContent>
        <AivaLogo />

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Notices />
          </div>
          <div>
            <Climate />
          </div>
        </div>
      </SubContent>
    </Content>
  );
};
