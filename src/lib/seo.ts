import { siteConfig } from "@/config/site";

type SeoInput = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
};

export function buildSeo(input: SeoInput = {}) {
  const title = input.title
    ? `${input.title} | ${siteConfig.siteName}`
    : siteConfig.defaultTitle;
  const description = input.description ?? siteConfig.defaultDescription;
  const canonical = new URL(input.pathname ?? "/", siteConfig.siteUrl).toString();
  const image = new URL(input.image ?? siteConfig.defaultOgImage, siteConfig.siteUrl).toString();

  return { title, description, canonical, image };
}
