import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import { FC } from "react";

interface NoticesProps {}

export const Notices: FC<NoticesProps> = ({}) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Noticias</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Noticias atuais</p>
        </CardContent>
      </Card>
    </div>
  );
};
