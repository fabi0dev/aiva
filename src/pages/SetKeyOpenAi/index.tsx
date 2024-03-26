import { Content } from "@components/Content";
import { SubContent } from "@components/SubContent";
import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import axios from "axios";
import { SpinnerTyping } from "@components/SpinnerTyping";
import { useDispatch } from "react-redux";
import { setApiKey } from "@/store/reducers/apiKeyOpenAI";
import { useNavigate } from "react-router-dom";

export const SetKeyOpenAi: FC = () => {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validate, setValidate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              content: "Fale: Que a chave foi validada com sucesso!",
              role: "user",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
        }
      );
      dispatch(setApiKey(key));
      setValidate(true);
    } catch (e) {
      setError("A chave informada não é válida.");
    }
    setLoading(false);
  };
  return (
    <Content>
      <SubContent>
        <div className={cn("h-full w-full  justify-center pt-[100px]")}>
          <div className="mx-auto sm:w-[500px]">
            <div className="text-2xl font-bold text-center">
              <span className="text-green-500">Aiva</span> / Chave de API
            </div>

            {!validate && (
              <div className="my-4 text-center">
                Para continuar você dever adicionar sua chave de{" "}
                <a
                  className="text-green-400 underline"
                  target="_blank"
                  href="https://platform.openai.com/api-keys"
                >
                  API OpenAI
                </a>
              </div>
            )}

            {!validate && (
              <form onSubmit={handleSubmit} className="mx-auto sm:w-[80%]">
                <Input
                  onChange={(e) => setKey(e.target.value)}
                  disabled={loading}
                />

                <div className="mt-3 text-xs text-red-400">{error}</div>
                {!loading && (
                  <div className="text-center">
                    <Button
                      variant={key != "" ? "success" : "default"}
                      className={cn("mt-5")}
                    >
                      Validar
                    </Button>
                  </div>
                )}

                {loading && <SpinnerTyping />}
              </form>
            )}

            {validate && (
              <div className="text-center mt-3">
                <div>Sua chave foi validada com sucesso!</div>
                <Button
                  onClick={() => navigate("/")}
                  variant={"success"}
                  className={cn("mt-5")}
                >
                  Seguir
                </Button>
              </div>
            )}
          </div>

          <div className="w-[500px] mt-20 mx-auto flex justify-center ">
            <div className="flex justify-center items-center gap-16 "></div>
          </div>
        </div>
      </SubContent>
    </Content>
  );
};
