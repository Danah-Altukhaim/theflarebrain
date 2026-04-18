import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { Icon } from "./Icon.js";

const STEPS = [
  { title: "Welcome to The Brain", body: "Manage your AI agent's knowledge by chatting. No forms required." },
  { title: "Modules", body: "Your content lives in modules on the left. Branches, promotions, FAQs…" },
  { title: "Try it", body: "Try: “What's in my knowledge base?”" },
  { title: "Preview cards", body: "Every AI edit shows a card. Tweak fields, then confirm." },
  { title: "Test It", body: "Every card has a Test It button. See your bot's response before publishing." },
  { title: "You're ready", body: "Need help? Just ask The Brain." },
];

export function Walkthrough() {
  const [done, setDone] = useState<boolean | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    api<{ walkthroughCompleted: boolean }>("/api/v1/me")
      .then((u) => setDone(u.walkthroughCompleted))
      .catch(() => setDone(true));
  }, []);

  if (done === null || done) return null;

  const s = STEPS[step]!;
  async function finish() {
    await api("/api/v1/me/walkthrough-complete", { method: "POST" });
    setDone(true);
  }

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="card shadow-apple-xl p-6 w-[28rem] max-w-[calc(100vw-2rem)] space-y-4 animate-scale-in">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-apple bg-pair flex items-center justify-center shadow-apple-sm">
            <Icon name="sparkles" size={14} className="text-white" />
          </div>
          <div className="text-[11px] uppercase tracking-widest text-apple-tertiary font-semibold">
            Step {step + 1} of {STEPS.length}
          </div>
        </div>
        <h2 className="text-[20px] font-semibold tracking-tight text-apple-text">{s.title}</h2>
        <p className="text-apple-secondary text-[14px] leading-relaxed">{s.body}</p>
        <div className="flex items-center justify-between pt-2">
          <button onClick={finish} className="btn-ghost text-apple-secondary">
            Skip
          </button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="btn-secondary">
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="btn-primary">
                Next
              </button>
            ) : (
              <button onClick={finish} className="btn-primary">
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
