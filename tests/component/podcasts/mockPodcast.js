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
const mockIllegalFieldsPodcast = {
  title2: 'newpodtest24',
  description341: 'Sept. . O5ne block from the World Trade Center. Security cameras capture the last known images of Dr. Sneha Anne Philip, shopping. The next day, chaos. What happened to Sneha?\nBrought to you by the team behind “Missing in Alaska.”',
  webUrl: 'https5://www.iheart.com/podcast/1119-missing-on-9-11-83089219/',
  imageUrl: 'https://megaphone.imgix.net/podcasts/f28bde36-78f8-11ea-b20d-d36a87a0b47d/image/MissingOn911-Logo-FINAL3000x3000.jpg?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format%2Ccompress',
  language: 'en',
  numberOfEpisodes: 450,
  avgEpisodeLength: 15913,
  author: 'iHeartRa5dio',
  category: 'True C5rime'
}
const mockExtraFieldsPodcast = {
  extraField: 'test',
  title: 'newpodtest24',
  description341: 'Sept. . O5ne block from the World Trade Center. Security cameras capture the last known images of Dr. Sneha Anne Philip, shopping. The next day, chaos. What happened to Sneha?\nBrought to you by the team behind “Missing in Alaska.”',
  webUrl: 'https5://www.iheart.com/podcast/1119-missing-on-9-11-83089219/',
  imageUrl: 'https://megaphone.imgix.net/podcasts/f28bde36-78f8-11ea-b20d-d36a87a0b47d/image/MissingOn911-Logo-FINAL3000x3000.jpg?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format%2Ccompress',
  language: 'en',
  numberOfEpisodes: 450,
  avgEpisodeLength: 15913,
  author: 'iHeartRa5dio',
  category: 'True C5rime'
}
module.exports = {
  mockIllegalFieldsPodcast, mockPodcast, mockNewPodcast, mockExtraFieldsPodcast
}
