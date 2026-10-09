# X Content Starter

If you want to build a personal brand on X, the key is posting consistently. The best way to get reach is to join the conversation: take what everyone is already talking about and add your own angle.

This project has AI do that with you every day: find what's hot, pick a topic, and write it in your voice.

## Getting started

Open this project in StashBase and tell the Agent:

1. **"Find what's hot."** It pulls the last 24 hours of posts from the X accounts you follow, groups them by story, and suggests topics based on your profile and past posts. On the first run, it asks whether you want to set up the [X API](#x-api). If you'd rather try it first, skip the setup and paste a post you came across. It'll suggest how to join that conversation instead.
2. **"Write the first one."** It gives you an outline first. Once you approve it, it writes an X Post or X Article and saves it to `output/`.
3. **Any edits you want.** For example, "Make the opening more casual."

The template comes with an example setup: a builder and founder working on a personal knowledge base product. Try it as is, then make it yours.

## Make it yours

1. **Edit `context/profile.md`, plus the persona and writing style in `AGENTS.md`.** The more specific, the more it sounds like you.
2. **Add your past posts.** Paste them into `output/x_posts.md`. 10–20 that best show your style is enough. If you've written Articles, put them in `output/x_articles/` and replace the example.
3. **Change the account list in `workflows/topics.md`** to the sources in your field.

Or just send the Agent your background, past posts, and the accounts you want to follow, and let it make the changes.

## X API

Finding what's hot needs [Node.js](https://nodejs.org) 20.12+, an Agent that can run local commands, and an [X API](https://developer.x.com) Bearer Token with prepaid credits.

[X API pricing](https://docs.x.com/x-api/getting-started/pricing) is $0.005 per post read: fetching 20–100 posts costs about $0.10–$0.50 in post reads. The script fetches up to 500 posts per run ($2.50 in post reads) and prints that estimate. Returned user records are billed separately at $0.01 each; Agent usage is separate.

Put the token in a `.env` file in the project root (it's in `.gitignore`, so it won't be committed):

```bash
X_BEARER_TOKEN=your-token-here
```

## Files

* `AGENTS.md`: the AI's persona, your writing style, and the task index.
* `CLAUDE.md`: points Claude Code to `AGENTS.md`.
* `context/profile.md`: your background, posting goals, and posting angle.
* `workflows/topics.md`: how to find what's hot and pick topics, including the accounts you follow.
* `workflows/write.md`: how to write X Posts and X Articles.
* `workflows/scripts/x-search.mjs`: pulls recent posts from the given accounts.
* `output/x_posts.md`: your past posts and new ones.
* `output/x_articles/`: X Articles, one file each.
