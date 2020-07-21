import axios from 'axios';
const getTodos = () => {
    // axios agit comme un fetch
    axios.get('http://127.0.0.1:8000/api/').then(res => {
        this.setState({ data: res.data });
    })
    .catch(err => {
        console.log(err);
    });
    }
export default ({url, data}) => {
    return (
        getTodos
    )
}