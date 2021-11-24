window.onload = (event) => {
  const deleteButton = document.getElementById('delete-btn')
  deleteButton.parentNode.removeChild(deleteButton)
}
const savePodcast = async () => {
  const newPodcast = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    htmlDescription: document.getElementById('htmlDescription').value,
    webUrl: document.getElementById('webUrl').value,
    imageUrl: document.getElementById('imageUrl').value,
    language: document.getElementById('language').value,
    numberOfEpisodes: document.getElementById('numberOfEpisodes').value,
    avgEpisodeLength: document.getElementById('avgEpisodeLength').value,
    author: document.getElementById('author').value,
    category: document.getElementById('category').value
  }
  // removes empty fields if sent.
  const formatedPodcast = Object.fromEntries(Object.entries(newPodcast).filter(([_, v]) => (v != null && v !== '')))

  const response = await fetch('http://localhost:3000/podcast/1476061', {
    method: 'PUT',
    body: JSON.stringify(formatedPodcast),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  response.status === 200 ? alert('Podcast Saved Successfully') : alert(`Error updating podcast: ${response.statusText}`)
  return response
}
