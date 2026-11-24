import { D } from "@/lib/site";

export default function sitemap() {
  return ["", "/results", "/contact", "/mona", ...D.faculty.map((f) => `/faculty/${f.id}`)].map((p) => ({ url: `${D.SITE}${p}`, lastModified: new Date() }));
}
