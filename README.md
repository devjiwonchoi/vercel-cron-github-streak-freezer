# Vercel Cron - GitHub Streak Freezer

> Vercel Cron Job to freeze :ice_cube: your GitHub streak :fire:

## What is this?

This is a [Vercel Cron Job](https://vercel.com/docs/cron-jobs) that periodically monitors your GitHub activity and preserves your streak by creating a commit to your [special repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme).

Create one if you don't have one yet.
![Jiwon Choi's GitHub Activities](https://github.com/devjiwonchoi/vercel-cron-github-streak-freezer/assets/120007119/56e1ff79-14b1-426a-83e7-39bc3088f122)

> Example of GitHub Activities

The Cron Job will create a `github-streak-freezer.md` file to your special repository.

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

## Local Development

1. Clone this repository.
2. Install dependencies with `pnpm i`.
3. Run [`pnpm vercel dev`](https://vercel.com/docs/cli) to start the development server.

## Troubleshooting

- You can view the status of the cron job in the [Vercel Dashboard](https://vercel.com/devjiwonchoi/vercel-cron-github-streak-freezer/settings/cron-jobs) > Project Settings > Cron Jobs.
- You can view the logs of the cron job in the [Vercel Runtime Logs](https://vercel.com/docs/observability/runtime-logs).

### Status Codes

> We do not override the default error codes of Vercel.
> See [Vercel Error Codes](https://vercel.com/docs/errors) for more information.

- `200`: The cron job found an activity for today, did not creat a commit.
- `201`: The cron job successfully created a commit.
- `401`: The request was not authorized to run the cron job.
- `403`: The environment variable `GITHUB_USERNAME` was not provided.
