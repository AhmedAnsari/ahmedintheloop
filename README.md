# Ahmed in the loop

Ghulam Ahmed Ansari's personal site for <https://ahmedintheloop.dev/>.
The static files in `site/` contain the homepage and articles.
No framework, dependency installation, or compilation is required.

## Publishing

GitHub Pages uses the **Deploy site** Actions workflow. Run it manually from `main`
after reviewing the changes. Pushing alone does not publish the site. Only `site/`
is included in the deployment artifact.

Before the first deployment, verify domain ownership under the AhmedAnsari account,
set `ahmedintheloop.dev` as this repository's Pages custom domain, and then point
Cloudflare DNS at GitHub Pages. Keep the GitHub verification TXT record in DNS.
Use DNS only, not proxying, for the GitHub Pages records.

This Actions deployment does not use a `CNAME` file. The separate
`AhmedAnsari/AhmedAnsari.github.io` repository is not used by this site.
Do not change its files or Pages settings.

## Articles and citations

Articles live at `site/posts/<slug>/index.html`. Keep their canonical URLs stable.
The article's author, title, publication date, and canonical URL generate its
copyable BibTeX and browser download. The adjacent `.bib` file provides a static
download for readers without JavaScript.

When changing citation metadata, regenerate the adjacent file using the article's
**Download .bib** action and confirm that it matches the displayed citation.
Keep the visible publication date and homepage article listing consistent.

Public source links belong in the articles. Private research notes, raw evidence,
credentials, and local preview artifacts do not belong in this repository.
