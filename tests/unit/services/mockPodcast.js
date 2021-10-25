const mockBestPodcastData = [
  {
    id: 1133,
    title: 'podcast #2',
    description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
    htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
    webUrl: 'https://bengreenfieldfitness.com',
    imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
    language: 'en',
    numberOfEpisodes: 1039,
    avgEpisodeLength: 4042,
    author: 'Ben Greenfield',
    category: 'Health'
  },
  {
    id: 1132,
    title: 'podcast #1',
    description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
    htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
    webUrl: 'https://bengreenfieldfitness.com',
    imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
    language: 'en',
    numberOfEpisodes: 1039,
    avgEpisodeLength: 4042,
    author: 'Ben Greenfield',
    category: 'Health'
  },
  {
    id: 1134,
    title: 'podcast #3',
    description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
    htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
    webUrl: 'https://bengreenfieldfitness.com',
    imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
    language: 'en',
    numberOfEpisodes: 1039,
    avgEpisodeLength: 4042,
    author: 'Ben Greenfield',
    category: 'Health'
  },
  {
    id: 1135,
    title: 'podcast #4',
    description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
    htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
    webUrl: 'https://bengreenfieldfitness.com',
    imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
    language: 'en',
    numberOfEpisodes: 1039,
    avgEpisodeLength: 4042,
    author: 'Ben Greenfield',
    category: 'Health'
  },
  {
    id: 1136,
    title: 'podcast #5',
    description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
    htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
    webUrl: 'https://bengreenfieldfitness.com',
    imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
    language: 'en',
    numberOfEpisodes: 1039,
    avgEpisodeLength: 4042,
    author: 'Ben Greenfield',
    category: 'Health'
  }
]

const mockBestPodcastsReviews = [
  {
    rating: 10,
    text: 'Nice',
    podcastId: 1132,
    id: 1
  },
  {
    rating: 9,
    text: 'Interesting and witty',
    podcastId: 1133,
    id: 3
  },
  {
    rating: 8,
    text: 'Nice',
    podcastId: 1134,
    id: 4
  },
  {
    rating: 7,
    text: 'Nice',
    podcastId: 1135,
    id: 5
  },
  {
    rating: 6,
    text: 'Nice',
    podcastId: 1136,
    id: 6
  }]

const mockActualBestPodcasts = [{
  author: 'Ben Greenfield',
  avgEpisodeLength: 4042,
  category: 'Health',
  description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
  htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
  id: 1132,
  imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
  language: 'en',
  numberOfEpisodes: 1039,
  title: 'podcast #1',
  webUrl: 'https://bengreenfieldfitness.com'
}, {
  author: 'Ben Greenfield',
  avgEpisodeLength: 4042,
  category: 'Health',
  description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
  htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
  id: 1133,
  imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
  language: 'en',
  numberOfEpisodes: 1039,
  title: 'podcast #2',
  webUrl: 'https://bengreenfieldfitness.com'
}, {
  author: 'Ben Greenfield',
  avgEpisodeLength: 4042,
  category: 'Health',
  description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
  htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
  id: 1134,
  imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
  language: 'en',
  numberOfEpisodes: 1039,
  title: 'podcast #3',
  webUrl: 'https://bengreenfieldfitness.com'
}]

const mockRatingAvgPodcast = [{
  author: 'Ben Greenfield',
  avgEpisodeLength: 4042,
  category: 'Health',
  description: "Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&A's and mind-body-spirit optimizing content from America's top personal trainer.",
  htmlDescription: "<p>Free fitness, nutrition, biohacking, fat loss, anti-aging and cutting-edge health advice from BenGreenfieldFitness.com! Tune in to the latest research, interviews with exercise, diet and medical professionals, and an entertaining mash-up of ancestral wisdom and modern science, along with Q&amp;A's and mind-body-spirit optimizing content from America's top personal trainer.</p>",
  id: 1133,
  imageUrl: 'https://ssl-static.libsyn.com/p/assets/e/0/7/9/e0790c69b0534a14/BGF_Podcast_Logo-2.png',
  language: 'en',
  numberOfEpisodes: 1039,
  title: 'podcast #2',
  webUrl: 'https://bengreenfieldfitness.com'
}]

const mockRatingAvgCalculation = [
  {
    rating: 9,
    text: 'Nice',
    podcastId: 1132,
    id: 1
  },
  {
    rating: 9,
    text: 'Interesting and witty',
    podcastId: 1132,
    id: 3
  },
  {
    rating: 9,
    text: 'Nice',
    podcastId: 1132,
    id: 4
  },
  {
    rating: 10,
    text: 'Nice',
    podcastId: 1133,
    id: 5
  },
  {
    rating: 10,
    text: 'Nice',
    podcastId: 1133,
    id: 6
  }]

module.exports = {
  mockActualBestPodcasts,
  mockBestPodcastsReviews,
  mockBestPodcastData,
  mockRatingAvgCalculation,
  mockRatingAvgPodcast
}
