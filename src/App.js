import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

// link of api that will give us tours array
const url = "https://course-api.com/react-tours-project";
// start App Component
function App() {
  // boolean loading state
  const [loading, setLoading] = useState(false);
  //  tours array state
  const [tours, setTours] = useState([]);

// fetch data from api
async function fetchTours(){
  setLoading(true)
  const response=await fetch(url);
  const tours=await response.json();
  setTours(tours);
  setLoading(false)
 }

// fetch data on component did mount
useEffect(()=>{
  fetchTours();
},[])

// remove tour which not interested
function removeTour(id){
  const newTours=tours.filter((item)=>item.id !== id);
  setTours(newTours);
}


  //  check if page loading
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  // if tours ==0 refetch tours
  if(tours.length===0){
    return (<div className="title">
        <h2>No tours left </h2>
        <button className="btn" onClick={fetchTours}>Refetch tours</button>
    </div>)
  }

  // return app component
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
