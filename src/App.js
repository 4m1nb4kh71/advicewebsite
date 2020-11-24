import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
const BASE_PATH = 'https://api.adviceslip.com/advice';
const SEARCH_PATH = `${BASE_PATH}/search/`;

const advicelist = [];

class App extends Component {
    constructor (props){
        super(props);
        this.state = {
            advice:'',advicelist,term:'',
        }
    }
    componentDidMount(){
        this.fetchAdvice();
    }
    onSearchGo = (event)=>{
        this.setState({term:event.target.value});
        console.log (this.state.term);
        event.preventDefault();
    }
    searchAdvice(term){
        axios.get(`${SEARCH_PATH}${term}`)
        .then((response) => { 
            this.setState({advicelist: response.data.slips});
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
      
    }
    transferDataToLocalState = () =>{

    }
    fetchAdvice = () => {
        axios.get (BASE_PATH)
        .then((response)=> {
           const  {advice} = response.data.slip;
            console.log (advice);
            this.setState({advice});
        })
        .catch((error)=> {
            console.log (error);
        });
    }
    render(){
        return (
            <div>
                <h1>{this.state.advice}</h1>
                <div>
                    <input onChange = {this.onSearchGo} type = 'text' />
                    <button onClick = {()=>this.searchAdvice(this.state.term)} type='Submit'>go</button>
                </div>
                <div>
                    { this.state.advicelist!=null ?
                        this.state.advicelist.map((item)=>{
                        
                            return(
                            

                                <div key= {item.id}>
                                    <h5 >{item.advice}</h5>
                                </div>
                            )
                        }
                        )
                        :
                       <h1>no result</h1>
                    }
                
                </div>
            </div>
       
        );
    }
}

export default App;