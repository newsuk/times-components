const billboard = [970, 250];
const leaderboard = [728, 90];
const mobileStandard = [300, 50];
const wideLeaderboard = [970, 90];

const sizes = {
  header: [
    {
      height: 0,
      sizes: [],
      width: 0
    },
    {
      height: 100,
      sizes: [[320, 50], [320, 48], mobileStandard],
      width: 300
    },
    {
      height: 90,
      sizes: [leaderboard],
      width: 768
    },
    {
      height: 250,
      sizes: [billboard, wideLeaderboard, leaderboard],
      width: 1024
    }
  ],
  intervention: [
    {
      height: 0,
      sizes: [],
      width: 0
    },
    {
      height: 100,
      sizes: [[300, 250], [320, 50], [320, 48], mobileStandard],
      width: 300
    },
    {
      height: 90,
      sizes: [leaderboard],
      width: 768
    },
    {
      height: 250,
      sizes: [billboard, wideLeaderboard, leaderboard],
      width: 1024
    }
  ],
  mpu: [
    {
      height: 0,
      sizes: [],
      width: 0
    },
    {
      height: 250,
      sizes: [[300, 250], [300, 600]],
      width: 300
    }
  ],
  native: [
    {
      height: 250,
      sizes: [[300, 250]],
      width: 300
    },
    {
      height: 90,
      sizes: [leaderboard],
      width: 728
    },
    {
      height: 250,
      sizes: [billboard],
      width: 970
    }
  ],
  pixel: [
    {
      height: 0,
      sizes: [[1, 1]],
      width: 0
    }
  ]
};

export default sizes;
