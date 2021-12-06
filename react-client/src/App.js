import './App.css'
import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import Podcasts from './containers/Podcasts/Podcasts'
import ViewPodcast from './containers/ViewPodcast/ViewPodcast'
import EditPodcast from './containers/EditPodcast/EditPodcast'
import AddReview from './containers/AddReview/AddReview'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/podcast' element={<Podcasts />} />
          <Route path='/podcast/*' element={<ViewPodcast />} />
          <Route path='/' element={<Navigate to='/podcast' />} />
          <Route path='/podcast/edit/*' element={<EditPodcast />} />
          <Route path='/podcast/new-review/*' element={<AddReview />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App