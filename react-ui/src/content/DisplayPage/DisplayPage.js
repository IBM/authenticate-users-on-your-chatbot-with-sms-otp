import React from 'react';
import {
    default as DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Loading
  } from 'carbon-components-react';
import './_display-page.scss'
import axios from 'axios';

class DisplayPage  extends React.Component{
    constructor(){
        super()
        this.state = {
            name:"",
            phone:"",
            policy:"",
            address:"",
            loading: true
        }

    }

    componentDidMount(){
        axios.get('http://otp-api-active-oribi.eu-gb.mybluemix.net/api/v1.0/listusers').then(res =>{
            // console.log(res.data)
            const headers = Object.keys(res.data[0])
            .filter((key) => key !== 'id')
            .map((key) => {
                if(key === "premium_date"){
                    res.data = res.data.map(item=>{
                        const darr = item[key].split('/')
                        const date = new Date(darr[2],darr[1],darr[0])
                        console.log(date)
                        item[key] = date.getDate() + "/XX/" + date.getFullYear()
                        return item
                    })
                }
                if(key === "policy_no" || key === "phone_no" || key === "address"){
                    res.data = res.data.map(item=>{
                        console.log(item[key])
                        if(key === "phone_no")
                            item[key] = item[key].toString()
                        item[key] = item[key].slice(0,5) + "XXXXX"
                        return item
                        // console.log(item[key])
                    })
                    // console.log(res.data)
                }
                var separateWord = key.split('_');
                for (var i = 0; i < separateWord.length; i++) {
                    separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                    separateWord[i].substring(1);
                }
                return separateWord.join(' ');
            })
            this.setState({data:res.data, headers, loading:false})
        }).catch(err=>{
            console.log("error",err)
        })
    }

    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return (
            this.state.loading?
            <div>
                <Loading />
            </div>
            :
            
            <div className="bx--grid bx--grid--full-width landing-page" style={{padding:"0", justifyContent:"center", alignItems:"center"}}>
                <div className="bx--row landing-page__banner" style={{padding:"2rem", justifyContent:"center", alignItems:"center", height:"10rem"}}>
                    <div className="bx--col-lg-10 bx--offset-lg-2">
                        <h1 className="landing-page__heading" >
                            Welcome to Sample Insurance Company
                        </h1><br />
                        <p>
                            You can view our policy holders here. To know more details about your policy, ask Watson Assistant Chatbot.
                        </p><br />
                    </div>
                </div>

                <div className="bx--row " style={{padding:"2rem", justifyContent:"center", alignItems:"center", display:"block"}}>
                    <div className="bx--col-lg-8 bx--offset-lg-4">
                    <Table useZebraStyles>
                        <TableHead>
                            <TableRow>
                            {this.state.headers.map((header) => (
                                <TableHeader key={header}>{header}</TableHeader>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map((row) => (
                            <TableRow key={row.id}>
                                {Object.keys(row)
                                .filter((key) => key !== 'id')
                                .map((key) => {
                                    return <TableCell key={key}>{row[key]}</TableCell>;
                                })}
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
            </div>
        );
    }
};

export default DisplayPage;