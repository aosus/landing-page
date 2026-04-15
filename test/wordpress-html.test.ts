import { describe, expect, it } from "vitest";
import { convertWordPressHtmlToMarkdown } from "../src/lib/wordpress-html";

describe("convertWordPressHtmlToMarkdown", () => {
  it("collapses legacy WordPress link preview cards to bare URLs", () => {
    const output = convertWordPressHtmlToMarkdown(`
      <p>before</p>
      <div class="vlp-link-container vlp-template-default wp-block-visual-link-preview-link">
        <a href="https://mozilla-l10n.github.io/introduction/" class="vlp-link" title="Localization at Mozilla" rel="nofollow" target="_blank"></a>
        <div class="vlp-link-text-container">
          <div class="vlp-link-title">Localization at Mozilla</div>
          <div class="vlp-link-summary">Introduction to localization at Mozilla, and how to become a localizer</div>
        </div>
      </div>
      <p>after</p>
    `);

    expect(output).toContain("before");
    expect(output).toContain("https://mozilla-l10n.github.io/introduction/");
    expect(output).toContain("after");
    expect(output).not.toContain("Localization at Mozilla");
    expect(output).not.toContain("Introduction to localization");
  });

  it("drops WordPress social links and button blocks", () => {
    const output = convertWordPressHtmlToMarkdown(`
      <p>before</p>
      <ul class="wp-block-social-links has-visible-labels is-layout-flex wp-block-social-links-is-layout-flex">
        <li class="wp-social-link wp-social-link-twitter wp-block-social-link">
          <a href="https://twitter.com/aosusdotorg" class="wp-block-social-link-anchor">Twitter</a>
        </li>
      </ul>
      <div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
        <div class="wp-block-button">
          <a class="wp-block-button__link" href="https://opencollective.com/aosus">Donate</a>
        </div>
      </div>
      <p>after</p>
    `);

    expect(output).toContain("before");
    expect(output).toContain("after");
    expect(output).not.toContain("Twitter");
    expect(output).not.toContain("Donate");
    expect(output).not.toContain("opencollective.com/aosus");
  });
});
