const AddPost = 'ADD-POST';

let initialState = {
        Texts: [
            {text: "post 1"},
            {text: "post 2"},
            {text: "post 3"},
            {text: "post 4"}
        ],
}

const mainPageReducer = (state=initialState, action) => {
    switch (action.type) {
        case AddPost: {
            let newPost = {
                text: action.post
            }
            return {
                ...state,
                Texts: [...state.Texts, newPost]
            };
        }
        default:
            return state;
    }
}

export const addPost = (post) => {
    return {type: AddPost, post: post};
}
export default mainPageReducer;