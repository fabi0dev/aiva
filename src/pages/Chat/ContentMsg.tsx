import { handleMsg } from "@/lib/utils";
import { selectorChats } from "@/store/reducers/chats";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

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
    return (
      <div className="mb-7">
        <div className="font-bold mb-2 text-[15px]">
          {message.role == "assistant" ? "Aiva" : "Você"}
        </div>
        <div className="leading-7">
          <ReactMarkdown
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={xonokai}
                    wrapLongLines={true}
                    customStyle={{
                      fontSize: 14,
                      marginTop: 10,
                      backgroundColor: "rgba(0,0,0,.2)",
                      borderRadius: 10,
                      lineHeight: 1.5,
                      border: 0,
                    }}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {handleMsg(message.content?.toString() as string)}
          </ReactMarkdown>
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
