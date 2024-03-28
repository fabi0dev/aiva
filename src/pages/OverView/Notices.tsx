import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import { FaRegCircle } from "react-icons/fa";

import { FC, useEffect } from "react";
import { Link } from "@components/Link";
import { GetNotices } from "@/services/server";
import { selectorNotices, setNotices } from "@/store/reducers/notices";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerTyping } from "@components/SpinnerTyping";

export const Notices: FC<NoticesProps> = () => {
  const dispatch = useDispatch();
  const { success, g1, local } = useSelector(selectorNotices);
  const NoticesItem: FC<NoticesItemProps> = ({ title, link }) => {
    return (
      <div className="mb-2">
        <div className="flex items-center gap-3">
          <div>
            <FaRegCircle />
          </div>
          <Link target="_blank" href={link}>
            {title}
          </Link>
        </div>
      </div>
    );
  };

  const NoticesItemImg: FC<NoticesItemImgProps> = ({ title, link, img }) => {
    return (
      <div className="mb-2">
        <Link target="_blank" href={link}>
          <div className="grid grid-cols-[100px_auto] items-center gap-3">
            <div
              style={{ backgroundImage: `url('${img}')` }}
              className="w-[100px] h-[50px] bg-slate-900 bg-cover  bg-no-repeat rounded-sm"
            ></div>
            <div className=" line-clamp-2">{title}</div>
          </div>
        </Link>
      </div>
    );
  };

  const getDataNotices = async () => {
    const data = await GetNotices();
    dispatch(setNotices(data));
  };

  useEffect(() => {
    getDataNotices();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas notícias</CardTitle>
      </CardHeader>

      <CardContent className="text-[13px]">
        {!g1 && <SpinnerTyping />}
        {success && (
          <div>
            {g1.slice(0, 3).map((notice, index) => (
              <NoticesItem
                key={index}
                title={notice.title}
                link={notice.link}
              />
            ))}

            <div className="my-2 font-bold">Em Tocantins</div>
            <div className="grid grid-cols-2">
              {local.slice(0, 4).map((notice, index) => (
                <NoticesItemImg
                  key={index}
                  title={notice.title}
                  link={notice.link}
                  img={notice.image}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface NoticesProps {}
interface NoticesItemProps {
  title: string;
  link: string;
}

interface NoticesItemImgProps {
  title: string;
  link: string;
  img: string | undefined;
}
