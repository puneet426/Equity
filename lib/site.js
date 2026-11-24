import data from "./data.json";

export const D = data;
export const TAGLINE = "Creating a Financial Ecosystem";
export const HELLO = "Hello Equity Classes, I would like to know about the next batch.";
export const wa = (msg) => `https://wa.me/${D.WA_ENQUIRY}?text=${encodeURIComponent(msg)}`;
export const tel = `tel:${D.PHONE_OFFICE}`;
export const facultyById = Object.fromEntries(D.faculty.map((f) => [f.id, f]));
export const leads = D.faculty.filter((f) => f.lead);
export const roster = D.faculty.filter((f) => !f.lead);
export const topper = D.achievers[0];
export const nCA = D.achievers.filter((a) => a.course === "CA").length;
export const nCS = D.achievers.length - nCA;
export const firstName = (name) => {
  const p = name.split(" ");
  return ["CS", "CA", "Prof.", "Adv."].includes(p[0]) ? p[1] : p[0];
};

export const COURSES = ["CA Foundation", "CA Intermediate", "CA Final", "CSEET", "CS Executive", "CS Professional"];

export const TEACH = [
  ["Accounts, Taxation, Costing", "ashish-sultania", "CA"],
  ["Law and Audit", "mona-mohta", "CA"],
  ["Ind AS and Financial Reporting", "harsh-agarwal", "CA Final"],
  ["Taxation and Audit", "vishal-chandra", "CA Final"],
  ["Mathematics", "shankar-kinger", "CA Foundation, CSEET"],
  ["Business Environment, Capital Markets, Strategic Management", "himanshu-chitlangia", "CA, CS"],
  ["Company Law and corporate compliance", "shikha-agarwal", "CS"],
  ["Corporate compliance and governance", "minakshi-agarwal", "CS"],
  ["Commercial, Constitutional and Administrative Law", "shubham-kataruka", "CS"],
];

export const METHOD = [
  ["Small batches", "Batches are kept small so every student gets personal guidance, and the teacher knows your name."],
  ["Concepts before shortcuts", "We teach why an entry or a section works, so it stays with you past the exam hall."],
  ["Notes written for the exam", "Exam-oriented notes and properly curated study material, so you are not hunting through five books."],
  ["Separate doubt sessions", "Dedicated time for questions, outside the lecture, answered with patience."],
  ["Regular mock tests", "You write papers under exam conditions long before the real one."],
  ["A room that pushes you", "A friendly, competitive atmosphere. Students push each other along."],
];

export const FAQ = [
  ["Where exactly is the institute?", "Unit 504, H Square Mall, opposite Pranami Heights in Lalpur, Ranchi, next to Mocha.", { label: "Open it in Google Maps", href: D.MAP_LINK }],
  ["What are the office hours?", "Monday to Saturday, 10:30 AM to 7:00 PM. We are closed on Sunday. Calls and WhatsApp messages sent after hours are answered the next working day."],
  ["What are the fees, and when does the next batch start?", `Fees depend on the course, the level and the batch, so we share the current fee sheet and start dates directly. Call ${D.PHONE_OFFICE_SHOW}, or ask on WhatsApp.`, { label: "Ask on WhatsApp", href: wa("Hello Equity Classes, please share the fee sheet and next batch dates.") }],
  ["Can we talk to someone before joining?", `Yes. Counselling is free. Call ${D.PHONE_OFFICE_SHOW} and we will talk through which level to start with and what the course involves, or visit the institute during office hours.`],
  ["Do you teach both CA and CS?", "Yes. For CA we coach Foundation, Intermediate and Final. For CS we coach CSEET, Executive and Professional."],
];
