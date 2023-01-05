import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, firebaseAuth } from "../../firebase";

export const getTodo = createAsyncThunk("todo/getTodo", async () => {
    const docRef = db.doc(
        db.getFirestore(),
        "todos",
        firebaseAuth.getAuth().currentUser.uid
    );
    const unsub = db.onSnapshot(docRef, (doc) => {
        console.log(doc.data().todo);
    });
    return unsub;
});

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todoList: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getTodo.fulfilled, (state, action) => {
            state.todoList = action.payload;
        });
    },
});
export default todoSlice.reducer;
