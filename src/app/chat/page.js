'use client'

import React, { useState } from 'react'
import chatData from '@/data/chatData.json'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

const Chat = () => {
    const loggedUser = chatData.users.find(user => user.id === 'u1');
  const [selectedUser, setSelectedUser] = useState(chatData.users[1]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='flex w-screen h-screen bg-black'>
        {/* for contacts bar */}
        <div className='w-1/4 p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]' id={'contact-lists'}>
            {chatData.users.map((user) => (
                <div key={user.id}>
                    {/* for displaying user profile of friends */}
                    <div 
                        className='flex items-center gap-4 p-2 text-white cursor-pointer hover:bg-gray-400 rounded-2xl' 
                        onClick={() => handleUserClick(user)}
                    >
                        <div className="rounded-full overflow-hidden w-12 h-12">
                            <Image src={user.avatar} alt={user.name} className='object-cover' width={50} height={50} objectFit='cover' />
                        </div>
                        <div>
                            <div className='font-semibold'>{user.name}</div>
                            
                            {(() => {
                                const userChat = chatData.chats.find(chat => 
                                    user.id !== 'u1' && chat.participants.includes(user.id)
                                );
                                return userChat ? <div className='text-sm'>
                                    {userChat.lastMessage.content.length > 30 ? userChat.lastMessage.content.slice(0,30) + '...' : userChat.lastMessage.content}
                                    </div> :
                                 null;
                            })()}
                        </div>
                    </div>
                    {user.id == 'u1' ? <hr className='m-2'></hr> : null}
                </div>
            ))}
        </div>

        {/* for chat section */}
        <div className='w-2/4 rounded-2xl bg-white' id={'chat-window'}>
                <div className='p-4 h-screen space-y-2 w-full flex flex-col justify-between'>
                    <div className='flex items-center'>
                        <div className="rounded-full overflow-hidden w-12 h-12">
                            <Image src={selectedUser.avatar} alt={selectedUser.name} className='object-cover' width={50} height={50} objectFit='cover' />
                        </div>
                        <div className='ml-2 flex items-center space-x-2'>
                            <div className='font-semibold text-black'>{selectedUser.name}</div>
                            <div className={`rounded-full w-4 h-4 ${selectedUser.status.isOnline ? "bg-green-400" : "bg-gray-400"}`}></div>
                        </div>
                    </div>

                    <div className='h-3/4 overflow-y-auto bg-gray-100 rounded-2xl p-4'>
                        {(() => {
                            const chatHistory = chatData.chats.find(chat => 
                            chat.participants.includes(selectedUser.id)
                            )
                            return chatHistory ? <div>{[...chatHistory.messages].reverse().map((message) => {
                                return (<div key={message.id} className={`flex p-4 gap-4 ${message.sender === selectedUser.id ? 'justify-start' : 'justify-end'}`}>
                                            <div className={'flex'}>
                                                    {message.content}
                                            </div>

                                            <div className="rounded-full overflow-hidden w-12 h-12">
                                                <Image src={message.sender === selectedUser.id ? selectedUser.avatar : loggedUser.avatar} alt={message.sender === selectedUser.id ? selectedUser.name : loggedUser.name} className='object-cover' width={50} height={50} objectFit='cover' />
                                            </div>
                                        </div>
                                    
                                )
                            })}</div> 
                            : null
                        })()}
                    </div>

                    <div>
                        <form className='flex items-center'>
                            <Input type="text" className='w-4/5 rounded-2xl p-2' placeholder='Type a message'/>
                            <button type='submit' className='w-1/5 rounded-2xl p-2 bg-[#1C6E8C] text-white m-2'>Send</button>
                        </form> 
                    </div>


                </div>
        </div>

        {/* for displaying user profile */}
        <div className='w-1/4 p-4 items-center flex justify-center' id={'user-profile'}>
            {/* this condition is to prevent the component from rendering before the user state is set */}
            {selectedUser && (
                <div className='space-y-4'>
                    <div className="rounded-full overflow-hidden w-32 h-32 mx-auto">
                        <Image 
                            src={selectedUser.avatar} 
                            alt={selectedUser.name} 
                            className='object-cover' 
                            width={128} 
                            height={128} 
                        />
                    </div>
                    <div className='text-center'>
                        <h2 className='text-xl font-bold text-white'>{selectedUser.name}</h2>
                        <p className='text-gray-600'>{selectedUser.jobRole}</p>
                        <p className='text-gray-600'>{selectedUser.department}</p>
                        <p className='text-gray-600'>{selectedUser.email}</p>
                        <div className='mt-2'>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                selectedUser.status.isOnline ? 'bg-green-400 text-green-800' : 'bg-gray-400 text-gray-800'
                            }`}>
                                {selectedUser.status.isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Chat
