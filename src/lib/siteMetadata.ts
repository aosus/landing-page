import type { Metadata } from "next";
import type { Lang } from "@/lib/locale";
import { brandAssets } from "@/lib/brandAssets";

const siteName = "مجتمع أسس";

const homeContent: Record<Lang, { title: string; description: string }> = {
  ar: {
    title: "أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة | مجتمع أسس",
    description:
      "مجتمع أسس هو أكبر مجتمع عربي مختص بإثراء المحتوى العربي في عدة مجالات أهمها البرمجيات الحرة والمفتوحة المصدر، مع عدة مبادرات كالمعجم التقني ومسابقة أسس لكتابة المحتوى.",
  },
  en: {
    title: "The Largest Arabic Community for Free and Open Source Software | Aosus",
    description:
      "Aosus is the largest Arabic community dedicated to enriching Arabic content across many fields, especially free and open source software, with initiatives like the technical glossary and the Aosus writing contest.",
  },
};

const writingContestContent: Record<Lang, { title: string; description: string }> = {
  ar: {
    title: "جائزة أسس للكتابة | مجتمع أسس",
    description:
      "جائزة أسس للكتابة هي جائزة لتحفيز الكتّاب لكتابة مواضيع حول البرمجيات الحرة والمفتوحة، لإثراء المحتوى العربي عنها.",
  },
  en: {
    title: "Aosus Writing Contest | Aosus",
    description:
      "The Aosus writing contest encourages writers to create topics about free and open source software and enrich Arabic content.",
  },
};

const blogContent: Record<Lang, { title: string; description: string }> = {
  ar: {
    title: "المدونة | مجتمع أسس",
    description: "أخبار ومقالات وتحديثات من مجتمع أسس.",
  },
  en: {
    title: "Blog | Aosus",
    description: "News, tutorials, and updates from the Aosus community.",
  },
};

const pageContent: Record<
  Lang,
  Record<"services" | "support-us" | "contact-us", { title: string; description: string }>
> = {
  ar: {
    services: {
      title: "خدمات | مجتمع أسس",
      description: "واجهات وخدمات تحترم الخصوصية تستضيفها أسس.",
    },
    "support-us": {
      title: "ادعمنا | مجتمع أسس",
      description: "ادعم مجتمع أسس عبر التبرع أو المساهمة في المشاريع.",
    },
    "contact-us": {
      title: "اتصل بنا | مجتمع أسس",
      description: "تواصل مع مجتمع أسس عبر القنوات المتاحة.",
    },
  },
  en: {
    services: {
      title: "Services | Aosus",
      description: "Privacy-respecting frontend services hosted by Aosus.",
    },
    "support-us": {
      title: "Support Us | Aosus",
      description: "Support Aosus through donations or by contributing to projects.",
    },
    "contact-us": {
      title: "Contact Us | Aosus",
      description: "Reach Aosus through the available community channels.",
    },
  },
};

function baseOpenGraph(title: string, description: string, images: string[]): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: "website",
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export function homeMetadata(lang: Lang): Metadata {
  const { title, description } = homeContent[lang];

  return baseOpenGraph(title, description, [brandAssets.defaultPreview]);
}

export function writingContestMetadata(lang: Lang): Metadata {
  const { title, description } = writingContestContent[lang];

  return baseOpenGraph(title, description, [brandAssets.writingContestPreview]);
}

export function blogIndexMetadata(lang: Lang): Metadata {
  const { title, description } = blogContent[lang];

  return baseOpenGraph(title, description, [brandAssets.defaultPreview]);
}

export function pageMetadata(lang: Lang, page: keyof (typeof pageContent)[Lang]): Metadata {
  const { title, description } = pageContent[lang][page];

  return baseOpenGraph(title, description, [brandAssets.defaultPreview]);
}

export function articleMetadata(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  thumbnail: string;
}, lang: Lang): Metadata {
  const siteTitle = lang === "ar" ? "مجتمع أسس" : "Aosus";
  const title = `${post.title} - ${siteTitle}`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
    },
  };
}
