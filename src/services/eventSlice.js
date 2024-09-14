import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  Events: [
    {
      id: 1,
      text: "hello world",
    },
  ],
};

export const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const event = { id: nanoid(), text: action.payload };
      state.events.push(event);
    },
    dltEvent: (state, action) => {
      state.events = state.events.filter((event) => {
        event.id !== action.payload;
      });
    },
  },
});
export const { addEvent, dltEvent } = EventSlice.actions;
export default EventSlice.reducer