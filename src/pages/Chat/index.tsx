import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { FC, useEffect, useState } from "react";
import { AivaLogo } from "@components/AivaLogo";
import {
  cn,
  getDayOfWeekName,
  getFormattedDate,
  getTime,
  randomHash,
} from "@/lib/utils";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AiOutlineSend } from "react-icons/ai";
import { Chats } from "./Chats";
import { ContentMsg } from "./ContentMsg";
import { useDispatch, useSelector } from "react-redux";
import {
  Messages,
  selectorChats,
  setCurrentChat,
  setLoadingChat,
  setMessageInChatCurrent,
  setNewChat,
} from "@/store/reducers/chats";
import { chatCompletions, chatInitial } from "@/services/chat";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SpinnerTyping } from "@components/SpinnerTyping";

export const Chat: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const { loading, currentId } = useSelector(selectorChats);
  const chatMsgs = useSelector(selectorChats).chats.find(
    (chat) => chat.id == currentId
  );

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (prompt == "") {
      return false;
    }
    const content = `<hrs>${getTime()}, ${getDayOfWeekName()} ${getFormattedDate()}</hrs>. ${prompt}`;
    setPrompt("");
    dispatch(setLoadingChat(true));

    if (!id) {
      await startChat(prompt.substring(0, 20), content);
      return;
    }

    const message: Messages = {
      role: "user",
      content,
    };

    const messagesAll: Messages[] = [...(chatMsgs?.messages as never), message];

    setPrompt("");
    dispatch(setMessageInChatCurrent([message]));

    const data = await chatCompletions(messagesAll);

    if (data?.choices != undefined) {
      const { choices } = data;
      const choicesMsgs = choices.map((choice: { message: Messages }) => {
        return {
          ...choice.message,
        };
      });

      dispatch(setMessageInChatCurrent(choicesMsgs));
    }

    dispatch(setLoadingChat(false));
  };

  const startChat = async (name: string, content: string) => {
    const messages: Messages[] = [];
    const id = randomHash(7);

    dispatch(
      setNewChat({
        id,
        messages: [],
        name,
      })
    );

    dispatch(setCurrentChat(id)); ///seta esse chat

    messages.push({
      content,
      role: "user",
    });

    messages.push(...chatInitial);

    dispatch(setMessageInChatCurrent([...messages]));

    await chatCompletions([...messages]);

    const data = await chatCompletions([...messages]);

    if (data?.choices != undefined) {
      const { choices } = data;
      const choicesMsgs = choices.map((choice: { message: Messages }) => {
        return {
          ...choice.message,
        };
      });

      dispatch(setMessageInChatCurrent(choicesMsgs));
    }

    navigate(`/chat?id=${id}`);
  };

  useEffect(() => {
    document.querySelector("#content-chat")?.scrollTo(0, 99999 * 99999);
    (document.querySelector("#content-prompt") as HTMLElement).focus();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(setCurrentChat(id));
    }
  }, [dispatch, id]);

  return (
    <Content>
      <SubContent maxScreen={true}>
        <div className={cn(" w-full h-full", "grid sm:grid-cols-[300px,auto]")}>
          <div className="hidden sm:block  h-full row-span-1 bg-gray-950">
            <Chats />
          </div>
          <div className="bg-gray-900 grid grid-rows-[55px_auto_80px]">
            <div>
              <AivaLogo />
            </div>
            <div
              id="content-chat"
              className="h-full overflow-auto max-h-[calc(100vh_-_135px)]"
            >
              <div className="w-[800px] min-h-full mx-auto flex">
                {!id && !loading && (
                  <div className="flex w-full justify-center items-end">
                    <div className="text-xl mb-10">Como posso te ajudar?</div>
                  </div>
                )}
                {!id && loading && (
                  <div className="flex w-full justify-center items-end">
                    <div className="text-xl mb-10">
                      <SpinnerTyping />
                    </div>
                  </div>
                )}
                {id && <ContentMsg />}
              </div>
            </div>
            <div className=" w-[800px] mx-auto">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="flex"
              >
                <Input
                  id="content-prompt"
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  placeholder="Diga algo..."
                  type="text"
                  autoFocus={true}
                  autoComplete="off"
                />
                <Button>
                  <AiOutlineSend className="text-2xl" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </SubContent>
    </Content>
  );
};
