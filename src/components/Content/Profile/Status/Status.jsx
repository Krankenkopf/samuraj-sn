import React from 'react'
import classes from "../Profile.module.css"


class Status extends React.Component {
    state = {
        Status: this.props.status,
        EditMode: false,
        Di4: "Eto kaka9-to di4"
    }

    enableEditMode = () => {
        this.setState({EditMode: true})
    }

    disableEditMode = () => {
        if (this.state.Status !== this.props.status) {
            this.props.updateStatus(this.state.Status)
        }
        this.setState({EditMode: false})
    }

    updateLocalStatus = (e) => {
        this.setState({Status: e.target.value})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status)
        {
            this.setState({Status: this.props.status})
        }
    }

    render() {
        return (
            <>
                {!this.state.EditMode &&
                <div>
                    <span className={classes.status} onDoubleClick={this.enableEditMode}>
                        {this.props.status}
                    </span>
                </div>}
                {this.state.EditMode &&
                <div>
                    <input
                        autoFocus={true}
                        onBlur={this.disableEditMode}
                        onChange={this.updateLocalStatus}
                        value={this.state.Status}/>
                </div>}
            </>
        )
    }
}

export default Status