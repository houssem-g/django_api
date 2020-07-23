import axios from 'axios';
class  Requests {
    constructor(options) {
        this.options = options
        this.data = []
    }

    // get dataDb() {
    //     return this.getData()
    // }
    getData = async () =>{
        // axios agit comme un fetch
        
        await axios(this.options).then(res => {
            this.data= res.data;
        }).catch(err => {
            console.log(err);
        })
        return this.data
        
    }

    
}
export default Requests