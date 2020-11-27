import React, {Component, Fragment, Key} from 'react'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import BackendCalls from '../../server/backendCalls'
import { Dropdown } from '@fluentui/react';
import { DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CircularProgress, Typography } from '@material-ui/core';
import ectoPic  from '../../assets/normalabs.png'
import mesopic  from '../../assets/mediumabs.png'
import endoPic  from '../../assets/belly.png'
import { Link } from 'react-router-dom';

const backend = new BackendCalls()

export default class FitnessPlanForm extends Component<any> {

    state: {[key: string] : any } = {
        loading: true ,
        loadingValid: false,
        formData: {},
        answers: {}
    }

    getQuestionData = async () => {
        const formData =  await backend.GetQuestions()

        this.setState({
            loading: false ,
            formData: {...formData.data.article.data}
        })

    }

    componentDidMount() {
        this.getQuestionData()
    }

    biggestInput = (arr: any ) => {

    let counts: { [key: string ] : any } = {}, max = 0, res;

    for (let v in arr) {
      counts[arr[v]] = (counts[arr[v]] || 0) + 1;
      if (counts[arr[v]] > max) { 
        max = counts[arr[v]];
        res = arr[v];
      }

    }
    let results = [];
    for (let k in counts){
      if (counts[k] === max){
        //console.log(k + " occurs " + counts[k] + " times");
        results.push(k);
      }
    }
    return res
}

    handleEventCahnge = (e: any, value: any ) => {
        let newState = {...this.state}
        let answers = newState.answers
        answers[e] = value 
        this.setState({
            answers: answers
        })

        console.log(this.state)

    }

    checkAllAndSubmit= () => {
       if(Object.keys(this.state.formData).length === Object.keys(this.state.answers).length)  {
           const answers = Object.keys({...this.state.answers}).map((elem: string) => {
               return this.state.answers[elem].answers
           })

           const results = this.biggestInput(answers)

           let counts: {[key: string ] : any} = {}

           answers.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

           console.log(counts)
           this.setState({
               loadingValid: true
           })
           
           setTimeout(() => {
                this.setState({
                    loadingValid : false ,
                    results: results
                })
           }, 3000);
       } else {
           alert("Missing Some Information ")
       }   
    }
    render() {


        const getInfo: any  = (obj: any)  => {

           const arr =  Object.keys(obj).map((elem: string) => {
                return {
                    text: obj[elem],
                    key: elem
                };
            });

            return arr
        }

        
        

        return (
            <Fragment>
                

             {this.state.results ? <> 
                {this.state.results === "ectomorph" ? <> 
                <Typography color="primary"  variant="h5" style={{textTransform: "uppercase"}} > Your Body Type Is <br/> {this.state.results}  </Typography>
                <img src={ectoPic} width="320" alt=""/>
               
                </> : this.state.results === "endomorph" ? <> 
                <Typography color="primary"  variant="h5" style={{textTransform: "uppercase"}} > Your Body Type Is <br/> {this.state.results}  </Typography>
                <img src={endoPic} width="320" alt=""/>
               
                </> : this.state.results === "mesomorph" ? <> 
                <Typography color="primary"  variant="h5" style={{textTransform: "uppercase"}} > Your Body Type Is <br/> {this.state.results}  </Typography>
                <img src={mesopic} width="320" alt=""/>
               
                </> : null }

                

             </> : <> 
                {!this.state.loadingValid ?  <> 
                {this.state.loading ?  <div>
                    <CircularProgress />
                    
                </div> : <>
                <Label> Provide Your Information To determine Your Fitness/Meal Plan </Label>
                    {Object.keys(this.state.formData).map((elem: string, key: Key) => (
                        <div style={{marginTop: "10px"}} key={key}>
                        <Dropdown 
                            label={elem}
                            options={getInfo(this.state.formData[elem])}
                            onChange={(event: any, option: any) => this.handleEventCahnge(elem, {text: option.text, answers: option.key})}
                        />

                        </div>
                        
                    ))}
                </>}
                </> : <Spinner size={SpinnerSize.large} label="Caliculating your Results ..." /> }
             </>}

                <DialogFooter>
                {this.state.results ? <>
                <Typography color="primary" > Request Your Personlized Fitness/Meal Plan </Typography>
                <br/>
                <br/>
                <Link to={"/mealrequest/" + this.state.results } onClick={() => {
                localStorage.setItem("mealPlan", JSON.stringify({...this.state.formData, price: 20 })) }} >
                <PrimaryButton onClick={this.checkAllAndSubmit} text={"Checkout" + " " + localStorage.currency +  (20 * Number(localStorage.rate)).toString() }/ >
                </Link>
                 </> : <> 
                 <DefaultButton onClick={this.props.close} text="close" />
                 <PrimaryButton onClick={this.checkAllAndSubmit} text="submit" /> 

                 </>}
              </DialogFooter>
            </Fragment>
        )
    }

}