import { useRef, useState } from 'react';
import { fetchEvents } from '../../utils/http';
import { useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../UI/LoadingIndicator';
import EventItem from './EventItem.jsx';
export default function FindEventSection() {
  const searchElement = useRef();
  let {data,isLoading,refetch} = useQuery({
    queryKey: ["search"],
    queryFn: async () => fetchEvents(searchElement.current.value),
    enabled: searchElement.current!=undefined
  })  

  function handleSubmit(event) {
    event.preventDefault();
    refetch()
  }
  let content;
  if(data){
    content=(
      <ul className="events-list">
      {data.map((event) => (
        <li key={event.id}>
          <EventItem event={event} />
        </li>
      ))}
    </ul>
    )
  }else if(isLoading){content = <LoadingIndicator/>}
  console.log(searchElement.current)
  return (
    <>
      <section className="content-section" id="all-events-section">
        <header>
          <h2>Find your next event!</h2>
          <form onSubmit={handleSubmit} id="search-form">
            <input
              type="search"
              placeholder="Search events"
              ref={searchElement}
            />
            <button>Search</button>
          </form>
        </header> 
        {searchElement.current ? content : <p>Please enter a search term to find events.</p>}
        
      </section>
    </>
  );
}
