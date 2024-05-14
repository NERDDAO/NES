import { useEffect, useState } from "react";
import { useMUD } from "./MUDContext";
import { MonsterCatchResult } from "./monsterCatchResult";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

type Props = {
  monsterName: string;
  monsterEmoji: string;
};

export const EncounterScreen = ({ monsterName, monsterEmoji }: Props) => {
  const {
    systemCalls: { throwBall, fleeEncounter },
  } = useMUD();

  const [appear, setAppear] = useState(false);
  useEffect(() => {
    // sometimes the fade-in transition doesn't play, so a timeout is a hacky fix
    const timer = setTimeout(() => setAppear(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={twMerge(
        "flex flex-col gap-10 items-center justify-center bg-black text-white transition-opacity duration-1000",
        appear ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="text-8xl animate-bounce">{monsterEmoji}</div>
      <div>A wild {monsterName} appears!</div>

      <div className="flex gap-2">
        <button
          type="button"
          className="bg-stone-600 hover:ring rounded-lg px-4 py-2"
          onClick={() => {
            toast.promise(
              throwBall(),
              {
                loading: "Throwing emojiball…",
                success: result => {
                  if (result === MonsterCatchResult.Caught) {
                    return `You caught the ${monsterName}!`;
                  } else if (result === MonsterCatchResult.Fled) {
                    return `Oh no, the ${monsterName} fled!`;
                  } else if (result === MonsterCatchResult.Missed) {
                    return "You missed!";
                  } else {
                    throw new Error(`Unexpected catch attempt result: ${MonsterCatchResult[result]}`);
                  }
                },
                error: error => `Error: ${error.message}`,
              },
              {
                success: {
                  duration: 5000,
                  icon: "🎉",
                },
                error: {
                  duration: 5000,
                  icon: "❌",
                },
                loading: {
                  duration: Infinity,
                },
              },
            );
          }}
        >
          ☄️ Throw
        </button>
        <button
          type="button"
          className="bg-stone-800 hover:ring rounded-lg px-4 py-2"
          onClick={async () => {
            const toastId = toast.loading("Running away…");
            await fleeEncounter();
            toast.update(toastId, {
              isLoading: false,
              type: "default",
              render: `You ran away!`,
              autoClose: 5000,
              closeButton: true,
            });
          }}
        >
          🏃‍♂️ Run
        </button>
      </div>
    </div>
  );
};
