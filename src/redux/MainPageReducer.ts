const ADD_POST = 'ADD-POST';

type TInitialState = typeof initialState

let initialState = {
        Texts: [
            {text: "post 1"},
            {text: "post 2"},
            {text: "post 3"},
            {text: "post 4"}
        ]
}

const mainPageReducer = (state=initialState, action: AddPostActionType): TInitialState => {
    switch (action.type) {
        case ADD_POST: {
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

type AddPostActionType = {
    type: typeof ADD_POST
    post: string
}

export const addPost = (post: string): AddPostActionType => {
    return {type: ADD_POST, post: post};
}
export default mainPageReducer