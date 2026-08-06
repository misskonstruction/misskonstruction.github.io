# Safely complete the Blitz memorial deployment after GitHub recovers

## What the failed runs mean

GitHub’s official status currently shows an active **major outage** affecting both **GitHub Actions** and **GitHub Pages**. This matches the failed runs, stalled jobs, and GitHub unicorn error you are seeing.

A run that is already marked **failed will not automatically retry** when the outage ends. Your current live website remains unchanged and safe, but the Blitz category update will need one fresh deployment after GitHub has recovered.

## What to do

1. **Wait until the outage is resolved.** Do not change the site, workflow, branch, or Pages settings during the outage.
2. Check GitHub’s official status at **[githubstatus.com](https://www.githubstatus.com)**. Look under **GitHub Actions** and **GitHub Pages**; wait until both say **Operational** and the active incident says **Resolved**.
3. After recovery, open the repository’s **Actions** tab and open the most recent failed **Deploy to GitHub Pages** run.
4. Select **Re-run jobs → Re-run all jobs** once. If the failed-run page still crashes, use **Run workflow** on the workflow’s main Actions page instead; this creates a clean new run without changing site code.
5. Wait for both the custom deploy and GitHub’s Pages publishing run to turn green, then verify `misskonstruction.github.io/blog` contains the **In Loving Memory of Blitz** card.

## Safety

- No code or workflow changes are proposed.
- Do not push an empty commit, change the Pages branch, or repeatedly rerun jobs.
- The existing live site stays online until a complete new build is successfully published.
- If a fresh run fails after GitHub reports both services operational, inspect that new run’s error before making any changes.

## Official status links

- Live status: [githubstatus.com](https://www.githubstatus.com)
- Current incident: [GitHub incident details](https://stspg.io/rcz3fcm83sff)
- Optional: use **Subscribe to Updates** on the status page for an email when the incident is resolved.