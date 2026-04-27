import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { cvContent } from "../src/data/cv/content";
import { resumeTargetOverlays } from "../src/data/cv/targets";
import {
  getExperienceForResume,
  getProfileForResume,
  getResumePublicationsForTarget,
  sortExperienceByRecentPeriod,
} from "../src/data/cv/selectors";
import { escapeLatex, highlightSelfInAuthors } from "../src/resume/latex";
import type {
  AwardItem,
  DetailItem,
  EducationItem,
  ExperienceItem,
  LeadershipItem,
  PublicationItem,
  Profile,
  ResumeTargetId,
  ResumeVariantId,
} from "../src/data/cv/types";

const projectRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const baseGeneratedResumePaths: Record<ResumeVariantId, string> = {
  applied: resolve(projectRoot, "resume/resume-applied.tex"),
  research: resolve(projectRoot, "resume/resume-research.tex"),
};
const targetedResumeDir = resolve(projectRoot, "resume/targets");

const DOCUMENT_PREAMBLE = String.raw`\documentclass[11pt]{article}
\usepackage[a4paper, margin=0.75in]{geometry}

\usepackage{xcolor}
\usepackage{baskervillef}
\usepackage{CJKutf8}
\usepackage[T1]{fontenc}

\usepackage{titlesec}
\usepackage{multicol}
\usepackage{enumitem}
\usepackage{array}

\usepackage[hidelinks]{hyperref}
\usepackage[super]{nth}

\usepackage{xparse}

\titleformat
  {\section}
  {\it\vspace{3pt}}
  {}
  {0em}
  {}
  [\titlerule\vspace{-5pt}]

\NewDocumentEnvironment{resumeItemList}
  {
    O{0.15in}
    +b
  }
  {
    \begin{itemize}[leftmargin=#1, label={}]
      #2
    \end{itemize}
  }{}

\NewDocumentCommand{\resumeItem}
  {
    O{0.95\textwidth}
    O{0.70\textwidth}
    O{0.25\textwidth}
    m m m m m
  }
  {
    \item
      \begin{tabular*}{#1}[t]{@{\extracolsep{\fill}} p{#2} >{\raggedleft\arraybackslash}p{#3}}
        {\bf #4} & {#5} \\
        {\it\small #6} & {\it\small #7}
      \end{tabular*}

      \ifx\empty#8\else{\small #8}\fi
  }

\NewDocumentEnvironment{resumeDetailItemList}
  {
    O{\small}
    +b
  }
  {
    \begin{itemize}[topsep=0pt]
      #1#2
    \end{itemize}
  }{}

\NewDocumentCommand{\resumeDetailItem}
  {
    O{}
    m
  }
  {
    \item
      \ifx\empty#1\else{\emph{#1}: }\fi#2
  }

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\raggedright

\begin{document}`;

const DOCUMENT_END = String.raw`\end{document}`;

const CONTACT_LABELS = {
  email: "Email",
  usPhone: "US Phone",
  twPhone: "TW Phone",
} as const;

const HEADER_WIDTHS = {
  total: "\\textwidth",
  left: "0.50\\textwidth",
  right: "0.47\\textwidth",
} as const;

type ResumeItemFields = {
  totalWidth?: string;
  leftWidth?: string;
  rightWidth?: string;
  leftPrimary: string;
  rightPrimary: string;
  leftSecondary: string;
  rightSecondary: string;
  body: string;
};

const EXPERIENCE_WIDTHS = {
  total: "0.95\\textwidth",
  left: "0.64\\textwidth",
  right: "0.31\\textwidth",
} as const;

const RESUME_VARIANTS: ResumeVariantId[] = ["applied", "research"];

type GeneratedResumeSpec = {
  variant: ResumeVariantId;
  targetId?: ResumeTargetId;
  label: string;
  outputPath: string;
};

const parseArgs = (argv: string[]) => {
  const args = { variant: undefined as ResumeVariantId | undefined, target: undefined as ResumeTargetId | undefined };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === "--variant" && next) {
      args.variant = next as ResumeVariantId;
      index += 1;
    } else if (current === "--target" && next) {
      args.target = next as ResumeTargetId;
      index += 1;
    }
  }

  return args;
};

const buildGeneratedResumeSpecs = (variant?: ResumeVariantId, targetId?: ResumeTargetId): GeneratedResumeSpec[] => {
  if (targetId) {
    const targetOverlay = resumeTargetOverlays.find((overlay) => overlay.id === targetId);

    if (!targetOverlay) {
      throw new Error(`Unknown resume target: ${targetId}`);
    }

    const selectedVariant = variant ?? targetOverlay.baseVariant;
    return [
      {
        variant: selectedVariant,
        targetId,
        label: `${selectedVariant}:${targetId}`,
        outputPath: resolve(targetedResumeDir, `resume-${targetId}.tex`),
      },
    ];
  }

  if (variant) {
    return [
      {
        variant,
        label: variant,
        outputPath: baseGeneratedResumePaths[variant],
      },
    ];
  }

  return [
    ...RESUME_VARIANTS.map((currentVariant) => ({
      variant: currentVariant,
      label: currentVariant,
      outputPath: baseGeneratedResumePaths[currentVariant],
    })),
    ...resumeTargetOverlays.map((overlay) => ({
      variant: overlay.baseVariant,
      targetId: overlay.id,
      label: `${overlay.baseVariant}:${overlay.id}`,
      outputPath: resolve(targetedResumeDir, `resume-${overlay.id}.tex`),
    })),
  ];
};

const joinBlocks = (blocks: string[]): string => blocks.filter((block) => block.length > 0).join("\n\n");

const renderResumeItem = ({
  totalWidth,
  leftWidth,
  rightWidth,
  leftPrimary,
  rightPrimary,
  leftSecondary,
  rightSecondary,
  body,
}: ResumeItemFields): string => {
  const widthArgs =
    totalWidth && leftWidth && rightWidth ? `[${totalWidth}][${leftWidth}][${rightWidth}]` : "";

  return [
    `  \\resumeItem${widthArgs}`,
    `    {${escapeLatex(leftPrimary)}}{${escapeLatex(rightPrimary)}}`,
    `    {${escapeLatex(leftSecondary)}}{${escapeLatex(rightSecondary)}}`,
    `    {${body}}`,
  ].join("\n");
};

const renderSection = (title: string, body: string): string => {
  return [`\\section{${title}}`, "\\begin{resumeItemList}", body, "\\end{resumeItemList}"].join("\n");
};

const renderSectionEntries = <T>(title: string, entries: T[], renderEntry: (entry: T) => string): string => {
  return renderSection(title, entries.map(renderEntry).join("\n\n"));
};

const getContactByLabel = (profile: Profile, label: string) => {
  return profile.contacts.find((contact) => contact.label === label);
};

const renderDetailItems = (details: DetailItem[]): string => {
  if (details.length === 0) {
    return "";
  }

  const detailLines = details
    .map((detail) => {
      if (detail.label) {
        return `      \\resumeDetailItem[${escapeLatex(detail.label)}]{${escapeLatex(detail.text)}}`;
      }

      return `      \\resumeDetailItem{${escapeLatex(detail.text)}}`;
    })
    .join("\n");

  return `\n    \\begin{resumeDetailItemList}\n${detailLines}\n    \\end{resumeDetailItemList}`;
};

const renderEducation = (item: EducationItem): string => {
  return renderResumeItem({
    leftPrimary: item.institution,
    rightPrimary: item.period,
    leftSecondary: item.degree,
    rightSecondary: item.location,
    body: renderDetailItems(item.details),
  });
};

const renderExperience = (item: ExperienceItem): string => {
  const summary = escapeLatex(item.summary);
  const details = renderDetailItems(item.highlights);
  const body = `${summary}${details}`;
  return renderResumeItem({
    totalWidth: EXPERIENCE_WIDTHS.total,
    leftWidth: EXPERIENCE_WIDTHS.left,
    rightWidth: EXPERIENCE_WIDTHS.right,
    leftPrimary: item.organization.name,
    rightPrimary: item.period,
    leftSecondary: item.role,
    rightSecondary: item.location,
    body,
  });
};

const renderLeadership = (item: LeadershipItem): string => {
  return renderResumeItem({
    leftPrimary: item.organization,
    rightPrimary: item.period,
    leftSecondary: item.role,
    rightSecondary: item.location,
    body: renderDetailItems(item.highlights),
  });
};

const renderAward = (item: AwardItem): string => {
  return renderResumeItem({
    leftPrimary: item.title,
    rightPrimary: String(item.year),
    leftSecondary: item.event,
    rightSecondary: item.location,
    body: renderDetailItems(item.details),
  });
};

const renderPublication = (item: PublicationItem): string => {
  const authors = highlightSelfInAuthors(escapeLatex(item.authors));
  const authorBlock = `{\\scriptsize ${authors}}`;
  const citationText = item.citationCount ? `Cited by ${item.citationCount}` : "";
  return renderResumeItem({
    leftPrimary: item.title,
    rightPrimary: String(item.year),
    leftSecondary: item.venue,
    rightSecondary: citationText,
    body: authorBlock,
  });
};

const renderHeader = (profile: Profile): string => {
  const emailContact = getContactByLabel(profile, CONTACT_LABELS.email);
  const usPhone = getContactByLabel(profile, CONTACT_LABELS.usPhone);
  const twPhone = getContactByLabel(profile, CONTACT_LABELS.twPhone);

  const emailHref = emailContact?.href ?? `mailto:${emailContact?.value ?? ""}`;
  const emailValue = escapeLatex(emailContact?.value ?? "");
  const phoneLine = [usPhone?.value, twPhone?.value].filter(Boolean).join(" / ");

  const bulletLines = profile.summaryBullets
    .map((item) => `  \\resumeDetailItem{${escapeLatex(item)}}`)
    .join("\n");

  return [
    "\\begin{center}",
    `  {\\LARGE ${escapeLatex(profile.name)}} \\\\`,
    "  \\vspace{4pt}",
    `  \\begin{CJK*}{UTF8}{bkai} ${profile.nativeName} \\end{CJK*}`,
    "\\end{center}",
    "",
    "\\begin{resumeItemList}[0in]",
    `  \\resumeItem[${HEADER_WIDTHS.total}][${HEADER_WIDTHS.left}][${HEADER_WIDTHS.right}]`,
    `  {${escapeLatex(profile.headline)}}{\\href{${emailHref}}{${emailValue}}}`,
    `  {${escapeLatex(profile.tagline)}}{${escapeLatex(phoneLine)}}`,
    "  {}",
    "\\end{resumeItemList}",
    "",
    "\\begin{resumeDetailItemList}",
    bulletLines,
    "\\end{resumeDetailItemList}",
  ].join("\n");
};

const renderDocumentContent = (
  profile: Profile,
  experience: ExperienceItem[],
  publications: PublicationItem[],
): string => {
  return joinBlocks([
    renderHeader(profile),
    renderSectionEntries("Education", cvContent.education, renderEducation),
    renderSectionEntries("Professional Experience", experience, renderExperience),
    renderSectionEntries("Leadership Experiences", cvContent.leadership, renderLeadership),
    renderSectionEntries("Awards \\& Honors", cvContent.awards, renderAward),
    "\\newpage",
    renderSectionEntries("Selected Publications", publications, renderPublication),
  ]);
};

const run = async (): Promise<void> => {
  const { variant, target } = parseArgs(process.argv.slice(2));
  const generatedResumeSpecs = buildGeneratedResumeSpecs(variant, target);

  await mkdir(resolve(projectRoot, "resume"), { recursive: true });
  await mkdir(targetedResumeDir, { recursive: true });

  for (const spec of generatedResumeSpecs) {
    const targetOverlay = spec.targetId
      ? resumeTargetOverlays.find((overlay) => overlay.id === spec.targetId)
      : undefined;
    const profile = getProfileForResume(cvContent.profile, spec.variant, targetOverlay);
    const variantExperience = getExperienceForResume(cvContent.experience, spec.variant, targetOverlay);
    const experience = sortExperienceByRecentPeriod(variantExperience);
    const publications = getResumePublicationsForTarget(cvContent.publications, spec.variant, targetOverlay);
    const generatedContent = renderDocumentContent(profile, experience, publications);
    const resumeTex = `${DOCUMENT_PREAMBLE}\n\n${generatedContent}\n\n${DOCUMENT_END}\n`;

    await writeFile(spec.outputPath, resumeTex, "utf8");
    console.log(`Generated ${spec.label} resume LaTeX:`);
    console.log(`- ${spec.outputPath}`);
  }
};

run().catch((error: unknown) => {
  console.error("Failed to generate resume LaTeX.");
  console.error(error);
  process.exit(1);
});
