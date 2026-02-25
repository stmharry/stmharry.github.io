import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { cvContent } from "../src/data/cv/content";
import { escapeLatex, highlightSelfInAuthors } from "../src/resume/latex";
import type {
  AwardItem,
  DetailItem,
  EducationItem,
  ExperienceItem,
  LeadershipItem,
  PublicationItem,
} from "../src/data/cv/types";

const projectRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const templatePath = resolve(projectRoot, "resume/template.tex");
const generatedContentPath = resolve(projectRoot, "resume/generated-content.tex");
const generatedResumePath = resolve(projectRoot, "resume/resume.tex");

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

const renderResumeItem = (
  leftPrimary: string,
  rightPrimary: string,
  leftSecondary: string,
  rightSecondary: string,
  body: string,
): string => {
  return [
    "  \\resumeItem",
    `    {${escapeLatex(leftPrimary)}}{${escapeLatex(rightPrimary)}}`,
    `    {${escapeLatex(leftSecondary)}}{${escapeLatex(rightSecondary)}}`,
    `    {${body}}`,
  ].join("\n");
};

const renderEducation = (item: EducationItem): string => {
  return renderResumeItem(item.institution, item.period, item.degree, item.location, renderDetailItems(item.details));
};

const renderExperience = (item: ExperienceItem): string => {
  const summary = escapeLatex(item.summary);
  const details = renderDetailItems(item.highlights);
  const body = `${summary}${details}`;
  return renderResumeItem(item.organization, item.period, item.role, item.location, body);
};

const renderLeadership = (item: LeadershipItem): string => {
  return renderResumeItem(item.organization, item.period, item.role, item.location, renderDetailItems(item.highlights));
};

const renderAward = (item: AwardItem): string => {
  return renderResumeItem(item.title, String(item.year), item.event, item.location, renderDetailItems(item.details));
};

const renderPublication = (item: PublicationItem): string => {
  const authors = highlightSelfInAuthors(escapeLatex(item.authors));
  const authorBlock = `{\\scriptsize ${authors}}`;
  const citationText = item.citationCount ? `Cited by ${item.citationCount}` : "";
  return renderResumeItem(item.title, String(item.year), item.venue, citationText, authorBlock);
};

const renderHeader = (): string => {
  const emailContact = cvContent.profile.contacts.find((contact) => contact.label === "Email");
  const usPhone = cvContent.profile.contacts.find((contact) => contact.label === "US Phone");
  const twPhone = cvContent.profile.contacts.find((contact) => contact.label === "TW Phone");

  const emailHref = emailContact?.href ?? `mailto:${emailContact?.value ?? ""}`;
  const emailValue = escapeLatex(emailContact?.value ?? "");
  const phoneLine = [usPhone?.value, twPhone?.value].filter(Boolean).join(" / ");

  const bulletLines = cvContent.profile.summaryBullets
    .map((item) => `  \\resumeDetailItem{${escapeLatex(item)}}`)
    .join("\n");

  return [
    "\\begin{center}",
    `  {\\LARGE ${escapeLatex(cvContent.profile.name)}} \\\\`,
    "  \\vspace{4pt}",
    `  \\begin{CJK*}{UTF8}{bkai} ${cvContent.profile.nativeName} \\end{CJK*}`,
    "\\end{center}",
    "",
    "\\begin{resumeItemList}[0in]",
    "  \\resumeItem[\\textwidth][0.50\\textwidth]",
    `  {${escapeLatex(cvContent.profile.headline)}}{\\href{${emailHref}}{${emailValue}}}`,
    `  {${escapeLatex(cvContent.profile.tagline)}}{${escapeLatex(phoneLine)}}`,
    "  {}",
    "\\end{resumeItemList}",
    "",
    "\\begin{resumeDetailItemList}",
    bulletLines,
    "\\end{resumeDetailItemList}",
  ].join("\n");
};

const renderSection = (title: string, body: string): string => {
  return [`\\section{${title}}`, "\\begin{resumeItemList}", body, "\\end{resumeItemList}"].join("\n");
};

const renderDocumentContent = (): string => {
  const education = cvContent.education.map(renderEducation).join("\n\n");
  const experience = cvContent.experience.map(renderExperience).join("\n\n");
  const leadership = cvContent.leadership.map(renderLeadership).join("\n\n");
  const awards = cvContent.awards.map(renderAward).join("\n\n");
  const publications = cvContent.publications.map(renderPublication).join("\n\n");

  return [
    renderHeader(),
    "",
    renderSection("Education", education),
    "",
    renderSection("Professional Experience", experience),
    "",
    renderSection("Leadership Experiences", leadership),
    "",
    renderSection("Awards \\& Honors", awards),
    "",
    "\\newpage",
    "",
    renderSection("Academic Publications", publications),
  ].join("\n");
};

const run = async (): Promise<void> => {
  const template = await readFile(templatePath, "utf8");
  const generatedContent = renderDocumentContent();
  const resumeTex = template.replace("%%__GENERATED_CONTENT__%%", generatedContent);

  await mkdir(resolve(projectRoot, "resume"), { recursive: true });
  await writeFile(generatedContentPath, `${generatedContent}\n`, "utf8");
  await writeFile(generatedResumePath, `${resumeTex}\n`, "utf8");

  console.log("Generated resume LaTeX:");
  console.log(`- ${generatedContentPath}`);
  console.log(`- ${generatedResumePath}`);
};

run().catch((error: unknown) => {
  console.error("Failed to generate resume LaTeX.");
  console.error(error);
  process.exit(1);
});
