#!/usr/bin/env node
/**
 * Prints the posts a list of X accounts published in the last N hours.
 *
 * Used by workflows/topics.md to find what is hot today. Calls the X API recent
 * search endpoint, so it needs an X API bearer token and is billed per post read.
 * Output is plain text for an agent to read. The token is read from .env in the
 * project root, or from the environment.
 *
 *   node workflows/scripts/x-search.mjs 24 TheRundownAI emollick
 *
 * Replies are skipped. Long posts are printed in full (note_tweet).
 */
const COST_PER_POST = 0.005;
const MAX_PAGES = 5;

const [hoursArg, ...accounts] = process.argv.slice(2);
const hours = Number(hoursArg);
if (!Number.isFinite(hours) || accounts.length === 0) {
  console.error('Usage: node workflows/scripts/x-search.mjs <hours> <account> [account...]');
  process.exit(1);
}

try {
  process.loadEnvFile(new URL('../../.env', import.meta.url));
} catch {}

const token = process.env.X_BEARER_TOKEN;
if (!token) {
  console.error('X_BEARER_TOKEN is not set. Get one at https://developer.x.com, then add X_BEARER_TOKEN=... to .env in the project root.');
  process.exit(1);
}

const query = `(${accounts.map((a) => `from:${a.replace(/^@/, '')}`).join(' OR ')}) -is:reply`;
const startTime = new Date(Date.now() - hours * 3600 * 1000).toISOString();

const posts = [];
const users = new Map();
let nextToken;

for (let page = 0; page < MAX_PAGES; page++) {
  const params = new URLSearchParams({
    query,
    start_time: startTime,
    max_results: '100',
    'tweet.fields': 'created_at,public_metrics,note_tweet,author_id',
    expansions: 'author_id',
    'user.fields': 'username',
  });
  if (nextToken) params.set('next_token', nextToken);

  const res = await fetch(`https://api.x.com/2/tweets/search/recent?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.error(`X API error ${res.status}: ${await res.text()}`);
    process.exit(1);
  }

  const body = await res.json();
  for (const user of body.includes?.users ?? []) users.set(user.id, user.username);
  posts.push(...(body.data ?? []));
  nextToken = body.meta?.next_token;
  if (!nextToken) break;
}

for (const post of posts) {
  const username = users.get(post.author_id) ?? post.author_id;
  const likes = post.public_metrics?.like_count ?? 0;
  const text = post.note_tweet?.text ?? post.text;
  console.log(`@${username} · ${post.created_at} · ${likes} likes`);
  console.log(`https://x.com/${username}/status/${post.id}`);
  console.log(`${text}\n`);
}

console.error(`${posts.length} posts read · est. cost ~$${(posts.length * COST_PER_POST).toFixed(2)}`);
