import './App.css'
import Map from './Map'
import Sidebar from './Sidebar'

function App() {

  return (
    <>
      <div className='map-container'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <Map />
      </div>
    </>
  )
}

export default App
