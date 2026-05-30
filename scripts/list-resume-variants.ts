import {
  defaultPublicResumeVariant,
  publicResumeVariants,
  resumeVariants,
} from "../src/data/cv/variants";

const args = new Set(process.argv.slice(2));
const variants = args.has("--public") ? publicResumeVariants : resumeVariants;

if (args.has("--default-public")) {
  console.log(defaultPublicResumeVariant.id);
} else {
  variants.forEach((variant) => {
    console.log(variant.id);
  });
}
