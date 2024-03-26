import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import { FC } from "react";

export const Climate: FC = () => {
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
