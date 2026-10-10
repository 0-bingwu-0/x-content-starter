# X Content Starter

If you want to build a personal brand on X, the key is posting consistently. The best way to get reach is to join the conversation: take what everyone is already talking about and add your own angle.

This project has AI do that with you every day: find what's hot, pick a topic, and write it in your voice.

## Getting started

Open this project in StashBase and tell the Agent:

1. **"Set me up."** It asks you a few questions, one at a time: who you are, what you want to post about, who you want to reach, how you sound, what to avoid, and whether you have X Premium. Then it makes the project yours. Paste a few of your past posts when it asks how you sound, and it'll match your style better.
2. **"Find what's hot."** It pulls the last 24 hours of posts from the X accounts you follow, groups them by story, and suggests topics based on your profile and past posts. On the first run, it asks whether you want to set up the [X API](#x-api). If you'd rather skip it, paste a post you came across, or just ask for topic ideas.
3. **"Write the first one."** Or tell it what you want to write about today. It writes a Post or Thread right away and saves it to `output/x_posts.md`. For an X Article, it gives you an outline first.
4. **Any edits you want.** For example, "Make the opening more casual."

The template comes with an example setup: a builder and founder working on a personal knowledge base product. You can try it as is before running setup.

## Make it yours

Setup covers most of it. You can also change things anytime:

* **Your background and writing style** are in `context/profile.md`. Edit it, or just tell the Agent. When you correct how something is written, it remembers.
* **Past posts** go at the top of `output/x_posts.md`. 10–20 that best show your style is enough. Past Articles go in `output/x_articles/`.
* **The accounts you follow** for finding what's hot are in `workflows/topics.md`. Change them to sources in your field, or send the Agent your list.
* **The Agent's persona and rules** are in `AGENTS.md`.

## X API

Finding what's hot needs [Node.js](https://nodejs.org) 20.12+, an Agent that can run local commands, and an [X API](https://developer.x.com) Bearer Token with prepaid credits.

[X API pricing](https://docs.x.com/x-api/getting-started/pricing) is $0.005 per post read: fetching 20–100 posts costs about $0.10–$0.50 in post reads. The script fetches up to 500 posts per run ($2.50 in post reads) and prints that estimate. Returned user records are billed separately at $0.01 each; Agent usage is separate.

Put the token in a `.env` file in the project root (it's in `.gitignore`, so it won't be committed):

```bash
X_BEARER_TOKEN=your-token-here
```

## Files

* `AGENTS.md`: the AI's persona, how it writes for you, and the task index.
* `CLAUDE.md`: points Claude Code to `AGENTS.md`.
* `context/profile.md`: your background, posting goals, posting angle, writing style, and X Premium setting.
* `workflows/setup.md`: the setup Q&A.
* `workflows/topics.md`: how to find what's hot and pick topics, including the accounts you follow.
* `workflows/write.md`: how to write X Posts, Threads, and X Articles.
* `workflows/scripts/x-search.mjs`: pulls recent posts from the given accounts.
* `output/x_posts.md`: your past posts and new ones.
* `output/x_articles/`: X Articles, one file each.
