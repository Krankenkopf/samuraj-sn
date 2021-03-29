

let ss = {
    _state: {
        MainPage: {
            Texts: [
                {text: "post 1"},
                {text: "post 2"},
                {text: "post 3"},
                {text: "post 4"}
            ],
            NewText: '',
        },
        Chat: {
            PersonalData: [
                {person: "Hermann Schulze", id: 1},
                {person: "Alexandre Pripyatsky", id: 2},
                {person: "Dzjakuj Jakzkusta", id: 3},
                {person: "Kott Taporwrot", id: 4},
                {person: "Kherhka Rottki", id: 5},
                {person: "Hermann Raich", id: 6},
                {person: "Otsothuus Pathwishwilli", id: 7},
                {person: "Pridurökx Metchjom", id: 8},
                {person: "Ivan Dzierkach", id: 9},
                {person: "D'midorz Schmet(Kek)", id: 10}
            ],
            Threads: [
                {id: 1, messages: [
                        {message: "qq", id: 1, owner: "y"},
                        {message: "Hey", id: 2, owner: "y"},
                        {message: "void ones are looking", id: 3, owner: "y"},
                        {message: "q x5", id: 4, owner: "y"}
                    ],
                    newMessage: ''},
                {id: 2, messages: [
                        {message: "ept", id: 1, owner: "y"},
                        {message: "qqq", id: 2, owner: "y"},
                        {message: "Pawaulina Čeuoekka", id: 3, owner: "y"},
                        {message: "q x5", id: 4, owner: "y"}
                    ],
                    newMessage: ''},
                {id: 3, messages: [
                        {message: "23432", id: 1, owner: "y"},
                        {message: "Credo quia cogito\n" +
                                "From now on deaf to disgorged appeals, complaints\n" +
                                "Distinguish not is right or wrong, is a leader, a rogue, a saint\n" +
                                "How high the demands are, so debauched are the needs\n" +
                                "And I decide to afflict or feed, to reduce or breed\n" +
                                "I have divided universions into nothingness\n" +
                                "These void ones are looking at me in waiting\n" +
                                "When only question brings forth infinite answers\n" +
                                "Which of them will trigger for the next state of chaos?\n", id: 2, owner: "y"},
                        {message: "432qq regrhegregr reg", id: 3, owner: "y"},
                        {message: "q5", id: 4, owner: "y"}
                    ],
                    newMessage: ''},
                {id: 4, messages: [],
                    newMessage: ''},
                {id: 5, messages: [],
                    newMessage: ''},
                {id: 6, messages: [],
                    newMessage: ''},
                {id: 7, messages: [],
                    newMessage: ''},
                {id: 8, messages: [],
                    newMessage: ''},
                {id: 9, messages: [
                        {message: "Are you sdoh?", id: 1, owner: "y"}
                    ],
                    newMessage: ''},
                {id: 10, messages: [
                        {message: "Dmidorrz is your real name?", id: 1, owner: "y"}
                    ],
                    newMessage: ''},
            ],
            CurrentThread: {
                id: undefined,
                messages: []},
                newMessage: '',
            },

    },
    _rerenderAll() {
        let a = 5;
    },

    getState() {
        return this._state;
        },
    subscribe(observer) {
        this._rerenderAll = observer;
    },

    dispatch(action) {
        this._state.MainPage = mainPageReducer(this._state.MainPage, action);
        this._state.Chat = chatReducer(this._state.Chat, action);
        this._rerenderAll(this._state);
    }
}







