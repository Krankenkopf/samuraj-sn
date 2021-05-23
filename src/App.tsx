import React from "react";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/Content/MainPage";
import History from "./components/Content/History/History";
import Activities from "./components/Content/Activities/Activities";
import ContactsContainer from "./components/Content/Contacts/ContactsContainer";
import ProfileContainer from './components/Content/Profile/ProfileContainer'
import Ads from "./components/Content/Ads/Ads";
import Footer from "./components/Footer";
import ChatContainer from "./components/Content/Chat/ChatContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp, TInitThunk} from "./redux/AppReducer";
import {compose} from "redux";
import Preloader from "./components/Preloader";
import {TState} from "./redux/store";

type TMappedState = {
  initialisingComplete: boolean
}

type TDispatchProps = {
  initializeApp: () => TInitThunk
}

class App extends React.Component<TMappedState & TDispatchProps> {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialisingComplete)
      return (
          <div className={'background'}>
            <Preloader />
          </div>
      )



    return (
        <BrowserRouter>
          <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
              <Route path='/main' render={() => <MainPage/>}/>
              <Route path='/login' render={() => <LoginContainer/>}/>
              <Route path='/history' render={() => <History/>}/>
              <Route path='/activities' render={() => <Activities/>}/>
              <Route path='/contacts' render={() => <ContactsContainer/>}/>
              <Route path='/profile/:id?' render={() => <ProfileContainer/>}/>
              {/*@ts-ignore*/}
              <Route path='/chat' render={() => <ChatContainer/>}/>
              <Route path='/ads' render={() => <Ads/>}/>
            </div>
            <Footer/>
          </div>
        </BrowserRouter>
    );

  }
}

let mapStateToProps = (state: TState): TMappedState => {
  return {
    initialisingComplete: state.App.initialisingComplete
  }
}

export default compose(
/*<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>*/
    connect<TMappedState, TDispatchProps, {}, TState>(mapStateToProps, {initializeApp}),
    withRouter)
(App)