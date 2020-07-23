import axios from 'axios';
class  Requests {
    constructor(options) {
        this.options = options
        this.options.headers= {}
        this.options.headers.Authorization = 'token d34a596df943a1c86a6f5650475b0ff5da56a007'
        
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
        // axios agit comme un fetch
        await axios(this.options).then(() => {
        }).catch(err => {
            console.log(err);
        })
        return "Success"
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