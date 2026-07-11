"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* Booking inquiries POST into this Google Form → linked Google Sheet on studio@solhous.com */
const GFORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfkItbZbYVKJgyJ4VbdlAcnksgkI8LVgyycZ_ZgrMk2Vs4PyA/formResponse";
const GFORM_FIELDS = {
  date: "entry.919456358",
  name: "entry.1143871970",
  occasion: "entry.1962162448",
  contact: "entry.1852360780",
};

type BookingContextValue = { open: () => void };
const BookingContext = createContext<BookingContextValue | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookingModal must be used within BookingModalProvider");
  return ctx;
}

/** Any element wrapped to call open() acts as a `data-book` trigger. */
export function BookMeButton({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const { open } = useBookingModal();
  return (
    <button type="button" className={className} style={style} data-h onClick={open}>
      {children}
    </button>
  );
}

type Step = 0 | 1 | 2 | 3 | 4;

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [values, setValues] = useState({ date: "", name: "", occasion: "", contact: "" });
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [sent, setSent] = useState<boolean | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const occasionInputRef = useRef<HTMLInputElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fire = useCallback(() => {
    const s = shutterRef.current;
    if (!s) return;
    s.classList.remove("fire");
    void s.offsetWidth;
    s.classList.add("fire");
  }, []);

  const open = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
    setStep(0);
    setErrors({});
    setSent(null);
    if (!reduceMotion) fire();
  }, [fire, reduceMotion]);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocusRef.current?.focus();
  }, []);

  const goTo = useCallback((n: Step) => {
    setStep(n);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const focusMap: Record<number, HTMLInputElement | null> = {
      0: dateInputRef.current,
      1: nameInputRef.current,
      2: occasionInputRef.current,
      3: contactInputRef.current,
    };
    const el = focusMap[step];
    if (el) {
      const t = setTimeout(() => el.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [isOpen, step]);

  const submit = useCallback(() => {
    const contact = values.contact.trim();
    if (!contact) {
      setErrors((e) => ({ ...e, 3: "A phone or email so I can reach you." }));
      return;
    }
    const d = values.date.trim();
    const n = values.name.trim();
    const o = values.occasion.trim();

    const fd = new URLSearchParams();
    fd.append(GFORM_FIELDS.date, d);
    fd.append(GFORM_FIELDS.name, n);
    fd.append(GFORM_FIELDS.occasion, o);
    fd.append(GFORM_FIELDS.contact, contact);

    fetch(GFORM_ACTION, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: fd.toString(),
    })
      .then(() => {
        setSent(true);
        if (!reduceMotion) fire();
        setStep(4);
      })
      .catch(() => {
        setSent(false);
        if (!reduceMotion) fire();
        setStep(4);
      });
  }, [values, fire, reduceMotion]);

  const handleNext = useCallback(
    (fromStep: Step) => {
      if (fromStep < 3) goTo((fromStep + 1) as Step);
      else submit();
    },
    [goTo, submit]
  );

  const setField = useCallback(
    (field: keyof typeof values, value: string, errIndex: number) => {
      setValues((v) => ({ ...v, [field]: value }));
      setErrors((e) => ({ ...e, [errIndex]: "" }));
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>("button,input,a");
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [isOpen, close]);

  const n = values.name.trim();
  const d = values.date.trim();
  const mailBody =
    `Day: ${d}\nName: ${n}\nOccasion: ${values.occasion.trim()}\nReach me: ${values.contact.trim()}`;
  const mailHref = `mailto:studio@solhous.com?subject=${encodeURIComponent(
    "Booking inquiry — " + (n || "new")
  )}&body=${encodeURIComponent("Hi Studio Hous,\n\nI'd like to hold a date.\n\n" + mailBody + "\n\nThank you!")}`;

  return (
    <BookingContext.Provider value={{ open }}>
      {children}

      <div className="shutter" id="sh-shutter" aria-hidden="true" ref={shutterRef} />

      <div
        className={`modal${isOpen ? " open" : ""}`}
        id="sh-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sh-bk-title"
        ref={modalRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="booking">
          <span className="mk" id="sh-bk-title">
            STUDIO HOUS · HOLD A DATE
          </span>
          <button className="close" id="sh-close" aria-label="Close booking" onClick={close}>
            ×
          </button>
          <div className="inner">
            <div className="bk-prog" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={i <= Math.min(step, 3) ? "on" : ""} />
              ))}
            </div>
            <div className={`step${step === 0 ? " active" : ""}`} data-step="0">
              <div className="ask">When&rsquo;s the day?</div>
              <div className="hint">
                A date is a feeling before it&rsquo;s a plan. Even a guess is fine — we&rsquo;ll firm it up
                together.
              </div>
              <input
                id="f_date"
                ref={dateInputRef}
                placeholder='e.g. May 9th  ·  or "sometime in May"'
                autoComplete="off"
                value={values.date}
                onChange={(e) => setField("date", e.target.value, 0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleNext(0);
                  }
                }}
              />
              <div className="err" id="e0">
                {errors[0]}
              </div>
              <div className="trust">
                30% holds your date · response within 24 business hours · styling consult included
              </div>
              <div className="row">
                <span className="sc">The day · 1 / 4</span>
                <button className="next" onClick={() => handleNext(0)}>
                  Next ›
                </button>
              </div>
            </div>

            <div className={`step${step === 1 ? " active" : ""}`} data-step="1">
              <div className="ask">Who&rsquo;s it for?</div>
              <div className="hint">A name so I can hold it properly.</div>
              <input
                id="f_name"
                ref={nameInputRef}
                placeholder="Your name"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value, 1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleNext(1);
                  }
                }}
              />
              <div className="err" id="e1">
                {errors[1]}
              </div>
              <div className="row">
                <span className="sc">The name · 2 / 4</span>
                <button className="next" onClick={() => handleNext(1)}>
                  Next ›
                </button>
              </div>
            </div>

            <div className={`step${step === 2 ? " active" : ""}`} data-step="2">
              <div className="ask">What are we celebrating?</div>
              <div className="hint">Grad, prom, a brand, a listing, a season worth keeping.</div>
              <input
                id="f_occasion"
                ref={occasionInputRef}
                placeholder="e.g. my daughter's graduation"
                autoComplete="off"
                value={values.occasion}
                onChange={(e) => setField("occasion", e.target.value, 2)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleNext(2);
                  }
                }}
              />
              <div className="err" id="e2">
                {errors[2]}
              </div>
              <div className="row">
                <span className="sc">The moment · 3 / 4</span>
                <button className="next" onClick={() => handleNext(2)}>
                  Next ›
                </button>
              </div>
            </div>

            <div className={`step${step === 3 ? " active" : ""}`} data-step="3">
              <div className="ask">Where do I reach you?</div>
              <div className="hint">A text, not a form letter. Email or phone.</div>
              <input
                id="f_contact"
                ref={contactInputRef}
                placeholder="Phone or email"
                autoComplete="email"
                value={values.contact}
                onChange={(e) => setField("contact", e.target.value, 3)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submit();
                  }
                }}
              />
              <div className="err" id="e3">
                {errors[3]}
              </div>
              <div className="row">
                <span className="sc">The line · 4 / 4</span>
                <button className="next" id="sh-submitBtn" onClick={submit}>
                  Hold my date ›
                </button>
              </div>
            </div>

            <div className={`step${step === 4 ? " active" : ""}`} data-step="4">
              <div className="ask" id="sh-confirmMsg">
                {sent
                  ? `Got it${n ? ", " + n : ""}.`
                  : "One more tap."}
              </div>
              <div className="hint" id="sh-confirmSmall">
                {sent
                  ? `Your request reached Studio Hous. I'll respond within 24 business hours with availability for ${
                      d || "your day"
                    }, your styling guide, and the next step. Nothing's locked until you are.`
                  : "Your email app will open with everything filled in — just hit send and it reaches Studio Hous. I'll reply within 24 business hours."}
              </div>
              <div className="row">
                <span className="sc">See you soon</span>
                <a
                  className="next"
                  id="sh-mailBtn"
                  href={mailHref}
                  style={{ display: sent ? "none" : undefined }}
                >
                  Or open email ›
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BookingContext.Provider>
  );
}
