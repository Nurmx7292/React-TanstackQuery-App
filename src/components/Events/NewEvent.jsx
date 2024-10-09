import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { client } from '../../App.jsx';

export default function NewEvent() {
  const navigate = useNavigate();
  let { mutate,isPending,data,isError,error } = useMutation({
    mutationFn: (event)=>createNewEvent(event),
    onSuccess: ()=>{
      console.log(error)
      client.refetchQueries(["events"])
      navigate("../")
    }
  })
  function handleSubmit(formData) {
    console.log(formData)
    mutate({event: formData})
  }
  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
          {isPending && (<><div>Loading...</div></>)} 
          {!isPending && (<><Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>)
          }
      </EventForm>
      {isError && <ErrorBlock title="Something happened" message={error.info?.message || "Error"} />}
    </Modal>
  );
}
