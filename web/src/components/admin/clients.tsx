import React , { Component, Fragment } from 'react'
import Tables from '../data/tableExpandable'
import BackendCalls from '../../server/backendCalls'
import BackDrop from '../UI/backDrop'

const backend = new BackendCalls()
export default class StoreAdmin extends Component<any> {

    state = {
        openEditor: false,
        products: [],
        data: [ ],
        doneLoading: false 
    }

   async  componentDidMount() {
        const allUsers = await  backend.GetUsers()

        this.setState({
            data: allUsers.data.users,
              doneLoading: true
        })

    }

    openEditor = () => {
        const { openEditor } = {...this.state}
        this.setState( {
            openEditor: !openEditor 
        })
    }
    render () {

                    
       return  (
        <Fragment>
            {this.state.doneLoading ? null : <BackDrop /> }

            
           <Tables data={this.state.data} />
            
        </Fragment>
       )
    }

}