const mockPodcast = {
  id: 1132,
  title: 'podcast update mock test',
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
const mockNewPodcast = {
  title: 'podcast update mock test',
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
const badFieldsMockPodcast = {
  illegalField: 0,
  badField: 1,
  mockField: 'string'
}
const badMockUpdate = {
  illegalField: 0,
  badField: 1,
  mockField: 'string'
}
module.exports = {
  badFieldsMockPodcast, mockPodcast, badMockUpdate, mockNewPodcast
}
