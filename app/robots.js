import { D } from "@/lib/site";

export default function robots() {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${D.SITE}/sitemap.xml` };
}
