import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Header from '../Header.jsx';
import { deleteEventById, fetchEventById } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  let navigate = useNavigate()
  let {id} = useParams()
  let { data,isPending,isError,error } = useQuery({
    queryKey: ["event",id],
    queryFn: () => fetchEventById(id)
  })
  let mutation = useMutation({
    mutationFn: () => deleteEventById(id),
    onSuccess: () => setTimeout(()=>{navigate("../")},500)
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
    <>
    <header>
      <h1>{data.title}</h1>
      <nav>
        {mutation.isError ? <ErrorBlock title="Could not delete" message={mutation.error.info?.message} /> : mutation.isPending ? <LoadingIndicator/> : <button onClick={()=>mutation.mutate()}>{mutation.data ? "Deleted successfully" : "Delete"}</button>}
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
  </>
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
      <article id="event-details">{content}</article>
    </>
  );
}
