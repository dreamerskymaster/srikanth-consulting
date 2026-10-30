#!/bin/bash
# Publish the website from main to Cloudflare Pages (project srikanthk).
#
#   tools/launch.sh              deploy main as it is (under Srikanth Kalyanasundaram's own name)
#   tools/launch.sh "<Brand>"    first apply the brand through a PR into main, then deploy.
#                                Only after the trade mark application for <Brand> has been filed.
#
# After deploying it checks the live pages, pings IndexNow (Bing, Yandex and others),
# and prints the follow-ups (contact form activation, Google Search Console).
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="${1:-}"
SITE="https://srikanthk.pages.dev"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

cd "$REPO"
[ -z "$(git status --porcelain)" ] || { echo "Uncommitted changes in $REPO. Commit or stash them first."; exit 1; }
git checkout -q main
git pull -q origin main

pdf_onepager() {
  # Headless Chrome writes the PDF and then hangs, so poll for the file and stop Chrome.
  local out pid
  out="$(mktemp -d)/onepager.pdf"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$out" "file://$REPO/onepager.html" >/dev/null 2>&1 &
  pid=$!
  for _ in $(seq 1 40); do [ -s "$out" ] && sleep 2 && break; sleep 1; done
  kill "$pid" 2>/dev/null || true
  if [ -s "$out" ]; then cp "$out" "$REPO/srikanth-kalyanasundaram-onepager.pdf"; else echo "WARNING: one-pager PDF was not regenerated"; fi
}

if [ -n "$BRAND" ]; then
  read -r -p "Has the trade mark application for \"$BRAND\" been FILED? [yes/no] " ok
  [ "$ok" = "yes" ] || { echo "Stopped. To launch without the brand: tools/launch.sh"; exit 1; }
  git checkout -q -b brand
  python3 -I tools/apply-brand.py "$BRAND" .
  python3 -I tools/build-llms.py .
  pdf_onepager
  git add -A
  git commit -q -m "Brand the site as $BRAND

The trade mark application has been filed. Header, footer, practice names,
titles, structured data, FAQ, llms files and the one-pager."
  git push -q -u origin brand
  gh pr create --base main --head brand --title "Brand the site as $BRAND" \
    --body "Applies the $BRAND brand with tools/apply-brand.py now that its trade mark application has been filed.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
  gh pr merge brand --merge --delete-branch
  git checkout -q main
  git pull -q origin main
  git branch -D brand 2>/dev/null || true
fi

DIST="$(mktemp -d)/sk-dist"
rsync -a --delete --exclude .git --exclude '*.md' --exclude .gitignore --exclude .DS_Store \
  --exclude .wrangler --exclude tools ./ "$DIST/"
# Run wrangler outside the repo so its .wrangler cache never lands in the site.
( cd "$(dirname "$DIST")" && npx wrangler pages deploy "$DIST" --project-name srikanthk --branch main --commit-dirty=true )

echo "Checking the live site..."
sleep 10
for p in "" about program for-colleges for-corporates posh advisory benefits insights portfolio contact privacy terms thanks robots.txt sitemap.xml llms.txt llms-full.txt; do
  printf "  /%-16s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "$SITE/$p")"
done
curl -s "$SITE/" | grep -q 'id="practices"' && echo "  Four practices: live" || echo "  Four practices: NOT FOUND"
curl -s "$SITE/contact" | grep -q 'formsubmit.co' && echo "  Contact form: wired" || echo "  Contact form: NOT WIRED"

KEY=$(ls "$REPO" | grep -E '^[0-9a-f]{32}\.txt$' | head -1 | sed 's/\.txt$//' || true)
if [ -n "$KEY" ]; then
  URLS=$(grep -o '<loc>[^<]*</loc>' "$REPO/sitemap.xml" | sed 's/<\/*loc>//g' | sed 's/.*/"&"/' | paste -sd, -)
  code=$(curl -s -o /dev/null -w '%{http_code}' -X POST https://api.indexnow.org/indexnow \
    -H 'Content-Type: application/json; charset=utf-8' \
    -d "{\"host\":\"srikanthk.pages.dev\",\"key\":\"$KEY\",\"keyLocation\":\"$SITE/$KEY.txt\",\"urlList\":[$URLS]}")
  echo "  IndexNow ping: HTTP $code (200 or 202 means accepted)"
fi

cat <<'EOF'

Follow-ups:
  1. Contact form: send one test enquiry from https://srikanthk.pages.dev/contact. FormSubmit emails
     mtmdselflove@gmail.com an "Activate Form" link; click it once, then send a second test.
  2. Google Search Console: add the URL-prefix property https://srikanthk.pages.dev/, verify with the
     HTML tag (add the tag to index.html and redeploy with tools/launch.sh), then submit sitemap.xml.
     Add mtmdselflove@gmail.com as an owner. Bing Webmaster Tools can import from Search Console.
EOF
