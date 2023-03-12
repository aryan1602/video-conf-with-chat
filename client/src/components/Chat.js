import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import ChatMessage from './ChatMessage';

import { useCollectionData } from 'react-firebase-hooks/firestore'

const Chat = () =>{
    const firestore = firebase.firestore();
    const messageRef = firestore.collection("messages");
    const query = messageRef.where("sender", "==", "aryan");
    const [ messages ] = useCollectionData(query,  {idField: 'id'})
    
    return(
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>
        </>
    )
}


export default Chat