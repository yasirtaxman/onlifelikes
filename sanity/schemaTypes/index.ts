import { post } from "./post";
import { author, category, product } from "./documents";
import {
  adSlotBlock,
  bodyImage,
  callout,
  comparisonTable,
  ctaButtonBlock,
  faqItem,
  howWeChose,
  productCardBlock,
  prosCons,
  quickVerdict,
} from "./objects";

export const schemaTypes = [
  // documents
  post,
  category,
  author,
  product,
  // objects / body blocks
  faqItem,
  productCardBlock,
  comparisonTable,
  prosCons,
  callout,
  quickVerdict,
  howWeChose,
  adSlotBlock,
  ctaButtonBlock,
  bodyImage,
];
