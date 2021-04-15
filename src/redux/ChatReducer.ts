const SetThread = 'SET-THREAD';
const AddMessage = 'ADD-MESSAGE';

export type PersonDataType = {
    person: string
    id: number
}

export type ThreadType = {
    id: number
    messages: Array<{
        message: string
        id: number
        owner: string
    }>
    isActive: boolean
}

type TInitialState = {
    PersonsData: Array<PersonDataType>
    Threads: Array<ThreadType>
}

const initialState: TInitialState = {
        PersonsData: [
            {person: "Hermann Schulze", id: 1},
            {person: "Alexandre Pripyatsky", id: 2},
            {person: "Dzjakuj Jakzkusta", id: 3},
            {person: "Kott Taporwrot", id: 4},
            {person: "Khmerhke Rocky", id: 5},
            {person: "Hermann Raich", id: 6},
            {person: "Tsothuus Pathwishwilli", id: 7},
            {person: "Pridurökx Metchjom", id: 8},
            {person: "Ivan Dzierkach", id: 9},
            {person: "D'midorz Schmet", id: 10}
        ],
        Threads: [
            {id: 1, messages: [
                    {message: "Yo", id: 1, owner: "y"},
                    {message: "Hey", id: 2, owner: "y"},
                    {message: "void ones are looking", id: 3, owner: "y"},
                    {message: "E", id: 4, owner: "y"}
                ],
                isActive: true},
            {id: 2, messages: [
                    {message: "yep", id: 1, owner: "y"},
                    {message: "qqq", id: 2, owner: "y"},
                    {message: "Pawaulina Čeuoekka", id: 3, owner: "y"},
                    {message: "q x5", id: 4, owner: "y"}
                ],
                isActive: false},
            {id: 3, messages: [
                    {message: "Credo quia cogito", id: 1, owner: "y"},
                    {message:
                            "From now on deaf to disgorged appeals, complaints\n" +
                            "Distinguish not is right or wrong, is a leader, a rogue, a saint\n" +
                            "How high the demands are, so debauched are the needs\n" +
                            "And I decide to afflict or feed, to reduce or breed\n" +
                            "I have divided universions into nothingness\n" +
                            "These void ones are looking at me in waiting\n", id: 2, owner: "y"},
                    {message: "When only question brings forth infinite answers", id: 3, owner: "y"},
                    {message: "Which of them will trigger for the next state of chaos?", id: 4, owner: "y"}
                ],
                isActive: false},
            {id: 4, messages: [],
                isActive: false},
            {id: 5, messages: [],
                isActive: false},
            {id: 6, messages: [],
                isActive: false},
            {id: 7, messages: [],
                isActive: false},
            {id: 8, messages: [],
                isActive: false},
            {id: 9, messages: [
                    {message: "Are you you?", id: 1, owner: "y"}
                ],
                isActive: false},
            {id: 10, messages: [
                    {message: "Dmidorrz is your real name?", id: 1, owner: "y"}
                ],
                isActive: false},
        ]
    }

const chatReducer = (state=initialState, action: any): TInitialState => {
    switch (action.type) {
        case SetThread:
        {
            return  {
                ...state,
                Threads: state.Threads.map(t => {
                    t.id === action.id
                        ? t.isActive = true
                        : t.isActive = false
                    return t
                })
            }
        }
        case AddMessage:
        {
            return {
                ...state,
                Threads: state.Threads.map(t => {
                    if (t.id === action.id) {
                        t.messages = [...t.messages, action.message]
                    }
                    return t
                })
            }
        }
        default:
            return state;
    }
}

export type SetThreadActionType = {
    type: typeof SetThread
    id: number
}
export const setThread = (id: number): SetThreadActionType => {
    return {type: SetThread, id: id};
}

export type AddMessageActionType = {
    type: typeof AddMessage
    message: string
    id: number
}

export const addMessage = (message: string, id: number): AddMessageActionType => {
    return {type: AddMessage, message: message, id: id}
}

export default chatReducer;