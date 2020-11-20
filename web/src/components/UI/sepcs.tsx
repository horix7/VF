import React from 'react'
import { ListItem, TextField , Button, List } from '@material-ui/core';

export default class TodoApp extends React.Component<any> {

    state: {[key: string] : any } = { name: "",items: [], text: '' };
  
    handleChange = (e: any) =>  {
        this.setState({ text: e.target.value });
      }
    
      handleSubmit = (e: any) => {
        e.preventDefault();
        if (this.state.text.length === 0) {
          return;
        }
       

        let newSate = {...this.state}
        
        const newItem = newSate.items.concat({
            text: this.state.text,
            id: Date.now()
          })

        this.setState(state => ({
          items: newItem,
          text: ''
        }));
      }

      nameChanger = (e: any) => {
          this.props.name(e.target.value)
          this.setState({
              name: e.target.value
          })

      }

      handleAll = () => {
        this.props.submit({
            name: this.state.name,
            items: [...this.state.items]
        })
      }

        
      render() {
      return (
        <div style={{padding: "10px", width: "300px", backgroundColor: "white"}}>
           
            <TextField
              id="new-todo"
              onChange={this.nameChanger}
              variant="filled"
              label="value"
              color="primary"
            />
           <div className="articleWriterC">
           </div>

        <form onSubmit={this.handleSubmit}>
          <TodoList items={this.state.items} />
           
           <TextField
             id="new-todo"
             onChange={this.handleChange}
             value={this.state.text}
             variant="filled"
             label="value"
             color="secondary"
           />
          <div className="articleWriterC">
          <Button onClick={this.handleSubmit} >
             Add #{this.state.items.length + 1}
           </Button>

           <Button variant="outlined" onClick={this.handleAll} >
             submit
           </Button>
          </div>
         </form>
           
        </div>
      );
    }
  
  
  }
  
  class TodoList extends React.Component<any> {
    render() {
      return (
        <List>
          {this.props.items.map((item: any) => (
            <ListItem key={item.id}>{item.text}</ListItem>
          ))}
        </List>
      );
    }
  }
  