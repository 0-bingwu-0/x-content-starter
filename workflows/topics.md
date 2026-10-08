# Find What's Hot and Pick Topics

## Find what's hot

Only look at posts from the last 24 hours by the accounts below (example accounts; replace them with sources in your field). Don't search anywhere else. Run this once from the project root, and tell me the estimated cost the script prints at the end:

```bash
node workflows/scripts/x-search.mjs 24 TheRundownAI testingcatalog emollick danshipper
```

| Account | What to watch for |
| --- | --- |
| @TheRundownAI | Daily roundup of confirmed AI news |
| @testingcatalog | New and upcoming product features |
| @emollick | How AI is actually used at work and in education |
| @danshipper | Hands-on model tests for writing and knowledge work |

When changing accounts, update both the table and the command. Don't save the raw results.

If the script says `X_BEARER_TOKEN` isn't set, don't look for other sources. Walk me through the setup in the [README](../README.md#x-api), then run it again.

## Pick topics

First read [profile.md](../context/profile.md), the recent posts in [x_posts.md](../output/x_posts.md), and the recent articles in [x_articles/](../output/x_articles/). Then reply like we're chatting, in two parts:

1. **What's hot:** Group posts by story and rank stories by how relevant they are to my background and posting angle. Give each one a sentence or two with the original link. Mark leaks and single-source claims as unconfirmed.
2. **Suggested topics:** One or two. Use the "Posting angle" in my profile to connect a story to what I'm doing. For each, a short paragraph: how I could tell it, why it's worth posting, and whether it fits a Post or an Article (see [write.md](write.md#format)). Build each topic from public facts and the views in my profile. Don't suggest topics that only work with my hands-on testing or personal experience, and don't ask me for either. Avoid repeating recent content. Building on an earlier topic is even better.
