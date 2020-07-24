import axios from 'axios';
class  Requests {
    constructor(options) {
        this.options = options
        this.options.headers= {}
        this.options.headers.Authorization = process.env.REACT_APP_TOKEN
        
        this.data = []
    }
    // function used to iport data from backend
    getData = async () =>{
        // axios agit comme un fetch
        await axios(this.options).then(res => {
            this.data= res.data;
        }).catch(err => {
            console.log(err);
        })
        return this.data 
    }
    // function used to post data to database
    postData = async () =>{
        var result = ""
        // axios agit comme un fetch
        console.log('options: ', this.options)
        await axios(this.options).then(() => {
            result="Success"
        }).catch(err => {
            console.log(err);
            result = "error"
        })
        return result
    }
    // function used to update data in database
    putData = async () =>{
        // axios agit comme un fetch
        await axios(this.options).then(() => {
        }).catch(err => {
            console.log(err);
        })
        return "Success"
    }

    // function used to delete data from database
    deleteData = async () =>{
        // axios agit comme un fetch
        await axios(this.options).then(() => {
        }).catch(err => {
            console.log(err);
        })
        return "Success"
    }

    
}
export default Requests