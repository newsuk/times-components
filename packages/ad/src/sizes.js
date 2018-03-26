// Sizes
const leaderboard = [728, 90];
const wideLeaderboard = [970, 90];
const billboard = [970, 250];
const mobileStandard = [300, 50];

const sizes = {
  header: [
    {
      width: 0,
      height: 0,
      sizes: []
    },
    {
      width: 300,
      height: 100,
      sizes: [[320, 50], [320, 48], mobileStandard]
    },
    {
      width: 768,
      height: 90,
      sizes: [leaderboard]
    },
    {
      width: 1024,
      height: 250,
      sizes: [billboard, wideLeaderboard, leaderboard]
    }
  ],
  intervention: [
    {
      width: 0,
      height: 0,
      sizes: []
    },
    {
      width: 300,
      height: 100,
      sizes: [[300, 250], [320, 50], [320, 48], mobileStandard]
    },
    {
      width: 768,
      height: 90,
      sizes: [leaderboard]
    },
    {
      width: 1024,
      height: 250,
      sizes: [billboard, wideLeaderboard, leaderboard]
    }
  ],
  pixel: [
    {
      width: 0,
      height: 0,
      sizes: [[1, 1]]
    }
  ]
};

export default sizes;
