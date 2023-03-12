const ChatMessage = (props) => {
    const {sender} = props.message
    console.log(props.message);
  
    return (<>
      <div >
        
        <h1>{sender}</h1>
      </div>
    </>)
  }

  export default ChatMessage