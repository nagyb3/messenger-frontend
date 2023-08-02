import React from 'react'

type MessageType = {
  receiver_username: string
  sender_username: string
  text: string
  __v: number
  _id: number
  creation_date: Date
}

type MainSectionPropsType = {
  hasToken: boolean
}

export default function MainSection({ hasToken }: MainSectionPropsType) {
  const [userToChatWith, setUserToChatWith] = React.useState<null | string>(
    null
  )

  const [newMessageText, setNewMessageText] = React.useState('')

  const [messageList, setMessagesList] = React.useState([])

  React.useEffect(() => {
    let params = new URLSearchParams(document.location.search)
    const userSearchParam: string | null = params.get('user')
    if (userSearchParam) {
      setUserToChatWith(userSearchParam)
      fetchChat()
    }
  }, [userToChatWith, messageList])

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_API_URL}/messages/create`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: localStorage.getItem('username'),
        receiver: userToChatWith,
        text: newMessageText,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setNewMessageText('')
          fetchChat()
        }
      })
      .then((data) => {})
      .catch((error) => console.error(error))
  }

  const fetchChat = () => {
    fetch(`${import.meta.env.VITE_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        req_user: localStorage.getItem('username'),
        rec_user: userToChatWith,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setMessagesList(data.messages)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <div className="bg-orange-100 h-[calc(100vh-70px)]">
      { userToChatWith ? (
        <div className="h-full flex flex-col">
          <div className="bg-orange-300 h-[70px] border-b-2 border-black flex items-center pl-6 text-xl">
            <p>{userToChatWith}</p>
          </div>
          <div className="bg-orange-100 flex-1 p-5 flex flex-col gap-3">
            {messageList.map((message: MessageType) => {
              return (
                <div
                  key={message._id}
                  className={
                    message.sender_username === localStorage.getItem('username')
                      ? 'bg-blue-700 text-white rounded p-2 w-fit self-end shadow-[3px_3px_6px_rgba(0,0,0,0.5)]'
                      : 'bg-gray-300 text-black rounded p-2 w-fit border-[1px] border-gray-500 shadow-[3px_3px_6px_rgba(0,0,0,0.3)]'
                  }
                >
                  {message.text}
                </div>
              )
            })}
          </div>
          <div className="">
            <form className="m-3 flex" onSubmit={(e) => submitMessage(e)}>
              <input
                onChange={(e) => setNewMessageText(e.target.value)}
                value={newMessageText}
                type="text"
                className="border-[1px] border-black rounded-lg focus:border-2 p-2 font-lg"
              />
              <input
                type="submit"
                value="SEND"
                className="bg-white font-bold text-xl px-3 py-2 rounded-xl ml-3 border-2 border-black hover:relative hover:top-[2px]"
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-full p-6">
          <h1 className="text-xl text-center">
            Click on a user from the left panel to chat with!
          </h1>
        </div>
      )}
    </div>
  )
}
