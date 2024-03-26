import { selectorChats } from "@/store/reducers/chats";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ChatItem {
  message: {
    role: string;
    content: string | React.ReactNode;
  };
  noFormat?: boolean;
}

export const ContentMsg: FC = () => {
  const navigate = useNavigate();
  const { chats } = useSelector(selectorChats);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const chatCurrent = chats.filter((chat) => chat.id == id)[0];

  const ChatItem: FC<ChatItem> = ({ message }) => {
    const handleMsg = (content: string) => {
      return content.replace(new RegExp("(<hrs>.*</hrs>).", "gi"), "");
    };
    return (
      <div className="mb-7">
        <div className="font-bold mb-2">
          {message.role == "assistant" ? "Aiva" : "Você"}
        </div>
        <div className="leading-7">
          {handleMsg(message.content?.toString() as string)}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!chatCurrent) {
      navigate("/chat");
    }
  }, []);

  return (
    <div>
      {chatCurrent &&
        chatCurrent.messages
          .filter((message) => message.hidden != true)
          .map((message, index) => <ChatItem key={index} message={message} />)}
    </div>
  );
};
