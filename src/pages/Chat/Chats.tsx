import { cn } from "@/lib/utils";
import { selectorChats } from "@/store/reducers/chats";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ChatsItemProps {
  id: string;
  title: string;
}

export const Chats: FC = () => {
  const navigate = useNavigate();
  const { chats } = useSelector(selectorChats);

  const [searchParams] = useSearchParams();
  const currentId = searchParams.get("id");

  const ItemChat = ({ title, id }: ChatsItemProps) => {
    return (
      <div
        onClick={() => navigate(`/chat?id=${id}`)}
        className={cn(
          "flex cursor-pointer hover:opacity-85 mb-1 -ml-4 p-2 pl-4 rounded-xl",
          currentId == id ? "bg-white bg-opacity-10" : ""
        )}
      >
        <div className={cn(currentId == id ? "font-bold " : "")}>{title}</div>
      </div>
    );
  };

  return (
    <div className="p-5">
      <div className="flex mt-3">
        <div
          onClick={() => navigate(`/chat`)}
          className="text-green-500 font-bold mb-4 flex rounded-lg  items-center gap-2 hover:opacity-85 cursor-pointer"
        >
          Nova Interação
        </div>
      </div>

      {chats.length > 0 && (
        <div className="text-xs my-4 text-gray-400">Todos</div>
      )}

      <div>
        {chats.map((chat, index) => {
          return <ItemChat key={index} title={chat.name} id={chat.id} />;
        })}
      </div>
    </div>
  );
};
