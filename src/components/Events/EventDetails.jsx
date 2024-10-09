import { Link, Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../Header.jsx';
import { fetchEventById } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  let {id} = useParams()
  let { data,isPending,isError,error } = useQuery({
    queryKey: ["event"],
    queryFn: () => fetchEventById(id)
  })
  
  let content;
  if(isPending){
    content = <LoadingIndicator/>
  }
  if(isError){
    content = <ErrorBlock title="Could not fetch event data!" message={error.info?.message} />
  }
  if(data){
    content = (
    <article id="event-details">
    <header>
      <h1>{data.title}</h1>
      <nav>
        <button>Delete</button>
        <Link to="edit">Edit</Link>
      </nav>
    </header>
    <div id="event-details-content">
      <img src={`http://localhost:3000/${data.image}`} alt="#" />
      <div id="event-details-info">
        <div>
          <p id="event-details-location">{data.location}</p>
          <time dateTime={`Todo-DateT$Todo-Time`}>{data.time}</time>
        </div>
        <p id="event-details-description">{data.description}</p>
      </div>
    </div>
  </article>
    )
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
      
    </>
  );
}
