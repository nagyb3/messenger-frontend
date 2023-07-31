import React from 'react'

export default function MainSection() {
  const [userToChatWith, setUserToChatWith] = React.useState<null | string>(
    null
  )

  const [newMessageText, setNewMessageText] = React.useState('')

  React.useEffect(() => {
    let params = new URLSearchParams(document.location.search)
    const userSearchParam: string | null = params.get('user')
    if (userSearchParam) {
      setUserToChatWith(userSearchParam)
    }
  }, [])

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:5000/messages/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: 'REPLACE',
        receiver: userToChatWith,
        text: newMessageText,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setNewMessageText('')
        }
      })
      .then((data) => {})
      .catch((error) => console.error(error))
  }

  return (
    <div className="bg-green-200 min-h-[calc(100vh-70px)]">
      {userToChatWith ? (
        <div className="h-full">
          <div className="bg-green-100 h-[70px] border-b-2 border-black flex items-center pl-6 text-xl">
            <p>{userToChatWith}</p>
          </div>
          <div className="absolute bottom-0">
            <form className="m-3 flex" onSubmit={e => submitMessage(e)}>
              <input onChange={e => setNewMessageText(e.target.value)} value={newMessageText}
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
