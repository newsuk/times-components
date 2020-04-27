import { showcaseConverter } from "@times-components/storybook";
import showcase from "./article-skeleton.showcase";
import inlineNewsletterPuffShowcase from "./inline-newsletter-puff.showcase";

showcaseConverter(module, showcase);

showcaseConverter(module, inlineNewsletterPuffShowcase);
