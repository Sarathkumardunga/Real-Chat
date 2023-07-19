import React from 'react';
import styled from "styled-components";
import Logout from "../components/Logout";
import ChatInput from "../components/ChatInput";
import Messages from "../components/Messages";
import axios from "axios";
import { sendMessageRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, currentUser }) {
  const handleSendMsg = async (msg)=> {
    await axios.post(sendMessageRoute,{
      from: currentUser._id,
      to: currentChat._id,
      message:msg,
    });
  };
  return (
    <>
    {
      currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt="avatar"
              />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <Messages />
          <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
      )}
    </>
  );
}

const Container = styled.div`
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
}
`;