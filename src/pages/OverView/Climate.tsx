import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import { FC } from "react";

interface ClimateProps {}

export const Climate: FC<ClimateProps> = ({}) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Clima</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Noticias atuais</p>
        </CardContent>
      </Card>
    </div>
  );
};
