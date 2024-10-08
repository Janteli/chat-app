import { create } from 'zustand'

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
//   from data base array messages
    messages: [],
    setMessage: (messages) => set({messages})    
}))

export default useConversation;