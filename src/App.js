import React, { Component } from 'react'
import './App.css';
import Container from './components/Container';
import Header from './components/Header/Header';
import District from './components/District';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default class App extends Component {


  constructor(){
    super();
    
    this.state = {
      list:[],
      searchTerm :'',
      sortOder:'',
      dateFilter:[],
      dateFilterItem:''
    }    

  }

    setFilterItem = arg => this.setState({dateFilterItem:arg})
  affectedPecentage =(key,mode)=>{
      let dataPack = []
      dataPack = this.state.list.map((items,i)=>Object.keys(items)
      .map(item=> 
        ((parseInt(this.state.list[i][item].total['confirmed']) + 
        parseInt(this.state.list[i][item].total['deceased'])) /
        parseInt(this.state.list[i][item].meta['population'])) *100
        ))
        
        mode === 'asc' ? 
        dataPack.sort(function(a, b){return a-b}):
        dataPack.sort(function(a, b){return a-b}).reverse();
        let oderItem = []
        dataPack.map(item => {
            this.state.list.map((items,i)=>{
              Object.keys(items).map(k=>{
        let value = ((parseInt(this.state.list[i][k].total['confirmed']) + 
                    parseInt(this.state.list[i][k].total['deceased'])) /
                    parseInt(this.state.list[i][k].meta['population'])) *100

                if(value == item){
                  oderItem.push({[k]:this.state.list[i][k]})
                }
              })
            })
        })
    this.setState({list:oderItem})
  }

  dateFilter =(arg)=>{
      this.setState({dateFilter:arg})
  }

  ascSort = (key,mode) =>{
    let dataPack = []
    dataPack = this.state.list.map((items,i) => Object.keys(items).map(item =>parseInt(this.state.list[i][item].total[key])))
    mode === 'asc'?
    dataPack.sort(function(a, b){return a-b}):
    dataPack.sort(function(a, b){return a-b}).reverse();

    let oderItem = []
    dataPack.map(item => {
        this.state.list.map((items,i)=>{
          Object.keys(items).map(k=>{
            if(this.state.list[i][k].total[key] == item){
              oderItem.push({[k]:this.state.list[i][k]})
            }
          })
        })
    })
    this.setState({list:oderItem})
  }  


  vaccinatedPercent = (key,mode)=>{
    let dataPack = []
    dataPack = this.state.list.map((items,i)=> Object.keys(items).map(item=> parseInt(this.state.list[i][item].total['vaccinated1'])) )
    mode === 'asc'?
    dataPack.sort(function(a, b){return a-b}):
    dataPack.sort(function(a, b){return a-b}).reverse();


    let oderItem = []
    dataPack.map(item => {
        this.state.list.map((items,i)=>{
          Object.keys(items).map(k=>{
            if(this.state.list[i][k].total['vaccinated1'] == item){
              oderItem.push({[k]:this.state.list[i][k]})
            }
          })
        })
    })
    this.setState({list:oderItem})
  }


    setSearchTerm = (term) => this.setState({searchTerm:term});
    setSortasc = (label,mode) => {
      if(label == 'confirmed'){
          this.ascSort(label,mode)
      }
      if(label=='affected'){
        this.affectedPecentage(label,mode)
      }
      if(label == 'vaccinated'){
        this.vaccinatedPercent(label,mode)
      }
    }

  
  componentDidMount(){
    fetch('https://data.covid19india.org/v4/min/data.min.json')
    .then(res=>res.json())
    .then((data)=>{
      let order = []
      Object.keys(data).map(item=>order.push({[item]:data[item]}))
      this.setState({list:order})
    })
    // .then(()=>this.stateSplit())
  }

  render() {

    // this.stateSplit()
    if(this.state.list.length != 0){

    return (
      <div>
        <BrowserRouter>
            <Routes>
                <Route 
                  path='/' 
                  element = {<Header 
                  setSearchTerm = { this.setSearchTerm } 
                  setSortasc = {this.setSortasc}
                  dateFilter = {this.dateFilter}
                  setFilterItem = {this.setFilterItem}
                  />} 
                  
                >
                <Route
                path='/'
                element={ <Container
                  dateFilter ={this.state.dateFilter} 
                  searchTerm = {this.state.searchTerm}  
                  lists ={this.state.list} 
                  dateFil = {this.state.dateFilterItem}
                  /> 
                } 
                >

                </Route>
                </Route>  
                <Route
                  path="/district"
                  element={<District />}
                >
                </Route>
            </Routes>    
        </BrowserRouter>
      </div>
    )
    }
  }
}
