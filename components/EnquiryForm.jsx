"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { D, COURSES, tel } from "@/lib/site";
import { WhatsApp } from "./Icons";

const STAGES = ["In Class 11", "In Class 12", "Finished Class 12", "In college / graduate", "Already registered with ICAI / ICSI", "Parent enquiring"];
const ease = [0.16, 1, 0.3, 1];

const User = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.2-4 4.2-6 8-6s6.8 2 8 6" /></svg>);
const Mobile = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>);
const Check = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);

const cleanPhone = (p) => p.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");

export function buildMessage(v) {
  return [
    "Hello Equity Classes, I would like to know about the next batch.",
    v.name.trim() && `Name: ${v.name.trim()}`,
    cleanPhone(v.phone) && `Mobile: ${cleanPhone(v.phone)}`,
    v.course && `Course: ${v.course}`,
    v.stage && `Currently: ${v.stage}`,
    v.note.trim() && `Note: ${v.note.trim()}`,
  ].filter(Boolean).join("\n");
}

export default function EnquiryForm({ withPreview = false }) {
  const [v, setV] = useState({ name: "", phone: "", course: "", stage: "", note: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const statusRef = useRef(null);
  const set = (k) => (e) => { setV({ ...v, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: "" }); setSent(false); };

  const ok = { name: v.name.trim().length >= 2, phone: /^[6-9]\d{9}$/.test(cleanPhone(v.phone)), course: !!v.course };
  const done = Object.values(ok).filter(Boolean).length;
  const pct = Math.round((done / 3) * 100);

  const submit = (e) => {
    e.preventDefault();
    const n = {};
    if (!ok.name) n.name = "Please enter the student's name.";
    if (!ok.phone) n.phone = "Enter a 10-digit Indian mobile number, like 98765 43210.";
    if (!ok.course) n.course = "Pick the exam you are preparing for, or “Not sure yet”.";
    setErr(n);
    if (Object.keys(n).length) { document.getElementById(`f-${Object.keys(n)[0]}`)?.focus(); return; }
    const url = `https://wa.me/${D.WA_ENQUIRY}?text=${encodeURIComponent(buildMessage(v))}`;
    const handheld = /Instagram|FBAN|FBAV|Line\/|Snapchat/i.test(navigator.userAgent) || matchMedia("(pointer: coarse)").matches;
    setSent(true);
    setTimeout(() => statusRef.current?.focus(), 60);
    if (handheld) location.href = url;
    else if (!window.open(url, "_blank", "noopener")) location.href = url;
  };

  const form = (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form-head">
        <div>
          <h3>Ask about the next batch</h3>
          <p className="form-sub">Three quick answers. WhatsApp opens with your message ready, and a counsellor replies during office hours.</p>
        </div>
        <div className="meter" role="img" aria-label={`${done} of 3 required answers filled`}>
          <svg viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="19" className="meter-bg" />
            <motion.circle cx="22" cy="22" r="19" className="meter-fg" initial={false} animate={{ pathLength: pct / 100, opacity: pct ? 1 : 0 }} transition={{ duration: 0.6, ease }} />
          </svg>
          <b>{done}/3</b>
        </div>
      </div>

      <div className={`field${err.name ? " has-err" : ""}${ok.name ? " is-ok" : ""}`}>
        <label htmlFor="f-name">Student&apos;s name</label>
        <div className="inp">
          <span className="inp-ico"><User /></span>
          <input id="f-name" value={v.name} onChange={set("name")} autoComplete="name" placeholder="Full name" aria-invalid={!!err.name} aria-describedby="e-name" />
          <span className="inp-ok" aria-hidden="true"><Check /></span>
        </div>
        <p className="err" id="e-name" aria-live="polite">{err.name}</p>
      </div>
      <div className={`field${err.phone ? " has-err" : ""}${ok.phone ? " is-ok" : ""}`}>
        <label htmlFor="f-phone">Mobile number</label>
        <div className="inp">
          <span className="inp-ico inp-ico--cc">+91</span>
          <input id="f-phone" type="tel" inputMode="tel" value={v.phone} onChange={set("phone")} autoComplete="tel-national" placeholder="98765 43210" aria-invalid={!!err.phone} aria-describedby="e-phone" />
          <span className="inp-ok" aria-hidden="true"><Check /></span>
        </div>
        <p className="err" id="e-phone" aria-live="polite">{err.phone}</p>
      </div>
      <fieldset className={`field${err.course ? " has-err" : ""}`} aria-describedby="e-course">
        <legend>Preparing for</legend>
        <div className="chips">
          {[...COURSES, "Not sure yet"].map((c, i) => (
            <label key={c}>
              <input type="radio" name="course" value={c} checked={v.course === c} onChange={set("course")} id={i === 0 ? "f-course" : undefined} />
              <span><i aria-hidden="true"><Check /></i>{c}</span>
            </label>
          ))}
        </div>
        <p className="err" id="e-course" aria-live="polite">{err.course}</p>
      </fieldset>
      <div className="field-row">
        <div className="field">
          <label htmlFor="f-stage">Where are you now? <small>(optional)</small></label>
          <select id="f-stage" value={v.stage} onChange={set("stage")}>
            <option value="">Choose one</option>
            {STAGES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-note">Anything else? <small>(optional)</small></label>
        <textarea id="f-note" rows={3} value={v.note} onChange={set("note")} placeholder="Preferred timing, attempt month, subjects you find hard" />
      </div>
      <div className="form-actions">
        <motion.button className={`btn btn--gold btn--shine btn--send${done === 3 ? " is-ready" : ""}`} type="submit" whileTap={{ scale: 0.97 }}>
          <WhatsApp />Send on WhatsApp
        </motion.button>
        <small>Or call <a className="link" href={tel}>{D.PHONE_OFFICE_SHOW}</a></small>
      </div>
      <AnimatePresence>
        {sent && (
          <motion.div className="form-ok" role="status" tabIndex={-1} ref={statusRef}
            initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="form-ok-ico"><Check /></span>
            <span>Your message is ready in WhatsApp. Press send there and we will reply during office hours (Mon to Sat, 10:30 AM to 7 PM).
              If WhatsApp did not open, call <a className="link" href={tel}>{D.PHONE_OFFICE_SHOW}</a>.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );

  if (!withPreview) return form;

  const lines = buildMessage(v).split("\n");
  return (
    <div className="enq">
      <div className="enq-form">{form}</div>
      <div className="phone" aria-hidden="true">
        <div className="phone-notch" />
        <div className="phone-top">
          <Image src="/img/logo-round.png" alt="" width={36} height={36} />
          <div><b>Equity Classes</b><small>usually replies in office hours</small></div>
        </div>
        <div className="phone-chat">
          <p className="chat-day">Today</p>
          <motion.div className="bubble bubble--in" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            Hello! Tell us which course you are preparing for and we will share the next batch dates. 📚
          </motion.div>
          <motion.div className="bubble bubble--out" layout transition={{ duration: 0.3 }}>
            {lines.map((l, i) => <span key={i}>{l}</span>)}
            <em>now ✓✓</em>
          </motion.div>
          {done < 3 && <div className="typing"><i /><i /><i /></div>}
        </div>
        <div className="phone-bar"><span>Your message, written as you type</span><i><WhatsApp /></i></div>
      </div>
    </div>
  );
}
