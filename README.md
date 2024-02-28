# Vercel Cron - GitHub Streak Freezer

> Vercel Cron Job to freeze :ice_cube: your GitHub streak :fire:

## What is this?

This is a [Vercel Cron Job](https://vercel.com/docs/cron-jobs) that periodically monitors your GitHub activity and preserve your streak by creating a commit to your [special repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme).

Create one if you don't have one yet.

![Malte Ubl's GitHub Streak](https://user-images.githubusercontent.com/89679/87104885-2425a900-c20e-11ea-9d06-d5e513fece95.png)

> Extreme example of a GitHub streak.

## How to Deploy

Click the button below to deploy this repository to Vercel, and fill in the [Environment Variables](#environment-variables).

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/devjiwonchoi/vercel-cron-github-streak-freezer&env=CRON_SECRET,GITHUB_ACCESS_TOKEN,GITHUB_USERNAME)

### Environment Variables

- `CRON_SECRET`: [Secret key to secure your cron job invocations](https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs)
- `GITHUB_ACCESS_TOKEN`: Your [GitHub Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)
- `GITHUB_USERNAME`: Your GitHub username

### Cron Job Schedule (UTC)

You can modify the cron job schedule in [`vercel.json`](./vercel.json) through the [cron expressions](https://vercel.com/docs/cron-jobs#cron-expressions):

```json
{
  "crons": [
    {
      "path": "/api/streak-freezer",
      "schedule": "0 0 * * *"
    }
  ]
}
```

> This cron job is scheduled to run every day at midnight (UTC).

We recommend you to use [crontab guru](https://crontab.guru) to generate your cron expressions. This project is set to Korean Standard Time (UTC+9) 23:30.
