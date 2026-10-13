// Live numbers come from leetcodeData.liveUrl, refreshed daily by the GitHub profile repo's
// "Refresh LeetCode card" workflow. `snapshot` is shown until (or if) that fetch fails.
export const leetcodeData = {
  profileUrl: 'https://leetcode.com/u/vi-nayKR/',
  liveUrl: 'https://raw.githubusercontent.com/vi-nayKR/vi-nayKR/main/assets/leetcode.json',
  // NeetCode lists shown in the strip (keys of the live JSON) and their display names
  neetcodeLabels: { 'NEETCODE 250': 'NeetCode 250' },
  snapshot: {
    solved: { All: 513, Easy: 163, Medium: 230, Hard: 120 },
    neetcode: {
      'NEETCODE 250': { solved: 243, total: 250 },
      'NEETCODE 150': { solved: 114, total: 150 },
      'BLIND 75': { solved: 63, total: 75 },
    },
  },
};
