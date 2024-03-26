import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { FC, useEffect, useState } from "react";
import {
  cn,
  getDayOfWeekName,
  getFormattedDate,
  getTime,
  handleMsg,
} from "@/lib/utils";
import {
  RiKeyboardFill,
  RiMic2Fill,
  RiVolumeOffVibrateLine,
} from "react-icons/ri";
import { AivaLogo } from "@components/AivaLogo";
import { useDispatch, useSelector } from "react-redux";
import { audioTranscriptions, chatCommand, textToAudio } from "@/services/chat";
import { RiVolumeVibrateFill } from "react-icons/ri";
import { FaRegStopCircle } from "react-icons/fa";
import { SpinnerTyping } from "@components/SpinnerTyping";
import {
  clearChatCommand,
  selectorChatCommand,
  setAutoPlayAudioText,
  setDataChatCommand,
  setEnableKeyboard,
} from "@/store/reducers/chatCommand";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export const Command: FC = () => {
  const dispatch = useDispatch();
  const { messages, autoPlayAudioText, enableKeyboard } =
    useSelector(selectorChatCommand);
  const [recognizingVoice, setRecognizingVoice] = useState(false);
  const [media, setMedia] = useState<MediaRecorder>();

  const startRecording = () => {
    const chunks: Blob[] = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e: BlobEvent) => {
          chunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          handleAudio(blob);
        };
        mediaRecorder.start();
        setMedia(mediaRecorder);
      })
      .catch((error) => console.error("Erro ao acessar microfone:", error));
  };

  const stopRecording = () => {
    if (media && media?.state === "recording") {
      media.stop();
    }
  };

  const [loading, setLoading] = useState(false);
  const [playingText, setPlayingText] = useState(false);
  const [audioText, setAudioText] = useState<HTMLAudioElement>();
  const [loadingPlayerText, setLoadingPlayerText] = useState(false);

  const playAudioText = async (text: string) => {
    setLoadingPlayerText(true);
    try {
      const audio = await textToAudio(text);
      setAudioText(audio);
      audio.play();
      setPlayingText(true);
      audio.onended = () => {
        setPlayingText(false);
      };
    } catch (e) {
      dispatch(setAutoPlayAudioText(false));
      console.log("Erro ao transcrever audio", e);
    }
    setLoadingPlayerText(false);
  };

  const handleCommand = async (text: string) => {
    const content = `<hrs>${getTime()}, ${getDayOfWeekName()} ${getFormattedDate()}</hrs>. ${text}`;

    messages.push({
      content,
      role: "user",
    });

    const messageAssistant = await chatCommand(messages);
    messages.push(messageAssistant);

    if (autoPlayAudioText) {
      try {
        await playAudioText(messageAssistant);
      } catch (e) {
        console.log("Não foi possível falar o texto", e);
      }
    }

    dispatch(setDataChatCommand(messages));
    setLoading(false);
  };

  const handleAudio = async (blobAudio: Blob) => {
    if (!blobAudio) return;
    setLoading(true);

    const text = await audioTranscriptions(blobAudio);
    await handleCommand(text);
  };

  useEffect(() => {
    if (recognizingVoice) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [recognizingVoice]);

  useEffect(() => {
    //dispatch(clearChatCommand());
  }, []);

  return (
    <Content>
      <SubContent>
        <div
          className={cn(
            "h-full w-full justify-center grid grid-rows-[30px_auto]]"
          )}
        >
          <div>
            <AivaLogo />
          </div>

          {!loading && (
            <div className="flex justify-center">
              {!recognizingVoice && (
                <div className="text w-[50%]">
                  {messages.length >= 2 && (
                    <div>
                      {messages.slice(-2).map((message, index) => {
                        if (message.role == "user") {
                          return (
                            <div
                              key={index}
                              className="font-bold text-[20px] mb-5"
                            >
                              <span>{handleMsg(message.content)}</span>
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <div className="text-[18px] leading-7">
                                <span>{message.content}</span>
                              </div>

                              <div className="flex justify-end">
                                <div>
                                  {!loadingPlayerText && playingText && (
                                    <FaRegStopCircle
                                      onClick={() => {
                                        audioText?.pause();
                                        setPlayingText(false);
                                      }}
                                      className="text-[20px] text-gray-400 hover:text-gray-200 cursor-pointer"
                                    />
                                  )}

                                  {!loadingPlayerText && !playingText && (
                                    <RiVolumeVibrateFill
                                      onClick={() => {
                                        playAudioText(message.content);
                                      }}
                                      className="text-[20px] text-gray-400 hover:text-gray-200 cursor-pointer"
                                    />
                                  )}

                                  {loadingPlayerText && <SpinnerTyping />}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}

                  {!messages.length && (
                    <div className="text-center text-xl">
                      Em que posso ajudar?
                    </div>
                  )}
                </div>
              )}

              {recognizingVoice && (
                <div className="text w-[50%] text-xl text-center">
                  Escutando você...
                </div>
              )}
            </div>
          )}

          {loading && (
            <div className="flex justify-center">
              <SpinnerTyping />
            </div>
          )}

          <div className="sm:w-[500px] mt-20 mx-auto justify-center ">
            <div className="flex my-6 justify-center">
              <Button
                onClick={() =>
                  dispatch(setAutoPlayAudioText(!autoPlayAudioText))
                }
                title="Falar os textos automaticamente."
              >
                {autoPlayAudioText && (
                  <RiVolumeVibrateFill
                    className={cn("text-xl text-green-500")}
                  />
                )}

                {!autoPlayAudioText && (
                  <RiVolumeOffVibrateLine className={cn("text-xl ")} />
                )}
              </Button>

              <Button
                onClick={() => dispatch(setEnableKeyboard(!enableKeyboard))}
              >
                <RiKeyboardFill
                  className={cn(
                    "text-xl",
                    enableKeyboard ? "text-green-500" : ""
                  )}
                />
              </Button>
            </div>

            {enableKeyboard && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // handleSubmit(e);
                }}
                className="flex mb-5 gap-3 justify-center"
              >
                <Input
                  id="content-prompt"
                  /*  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt} */
                  type="text"
                  autoFocus={true}
                  autoComplete="off"
                />

                <Button
                  onMouseDown={() => setRecognizingVoice(true)}
                  onMouseUp={() => setRecognizingVoice(false)}
                  className="bg-gray-800"
                >
                  <RiMic2Fill className="text-2xl text-green-500" />
                </Button>
              </form>
            )}

            {!enableKeyboard && (
              <div className="flex justify-center mt-10">
                <div
                  onMouseDown={() => setRecognizingVoice(true)}
                  onMouseUp={() => setRecognizingVoice(false)}
                  className="bg-gray-800 rounded-full p-5 cursor-pointer hover:opacity-85 z-[1]"
                >
                  <RiMic2Fill className="text-2xl text-green-500" />
                </div>

                {recognizingVoice && (
                  <div className="bg-green-500 rounded-full p-5 animate-ping absolute">
                    <RiMic2Fill className="text-2xl opacity-0" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </SubContent>
    </Content>
  );
};
