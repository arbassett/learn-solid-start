import {
    StartServer,
    createHandler,
    renderAsync,
  } from "solid-start/entry-server";
  
  export default createHandler(
    ({forward})=>{ 
     return async (event) => {
        const response = await forward(event);

        response.headers.set('cross-origin-opener-policy', 'same-origin');
        response.headers.set('cross-origin-embedder-policy', 'require-corp');
        response.headers.set('cross-origin-resource-policy', 'cross-origin');
        return response;
      }
    },
    renderAsync( (event) => <StartServer event={event} />)
  );