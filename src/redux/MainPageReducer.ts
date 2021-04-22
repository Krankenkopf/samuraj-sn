const ADD_POST = 'ADD-POST';

type TInitialState = typeof initialState

let initialState = {
        Texts: [
            {id: 1, text: "post 1"},
            {id: 2, text: "post 2"},
            {id: 3, text: "post 3"},
            {id: 4, text: "post 4"}
        ]
}

const mainPageReducer = (state=initialState, action: AddPostActionType): TInitialState => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
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