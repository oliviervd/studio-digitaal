import { h, Component } from 'preact';

interface ApiResponseProps {
    endpoint: string;
}

interface ApiResponseState {
    data: never | null;
    loading: boolean;
    error: Error | null;
}

class ApiResponse extends Component<ApiResponseProps, ApiResponseState> {
    state: ApiResponseState = {data: null, loading:true, error:null};
    componentDidMount() {
        const { endpoint } = this.props
        fetch(endpoint)
            .then(response=>response.json())
            .then(data => this.setState({data, loading: false}))
            .catch(error => this.setState({error, loading:false}))
    }

    render({endpoint}: ApiResponseProps, {data, loading, error}: ApiResponseState) {
        return(
            <div className={"api-response"}>
                <h3>example response from {endpoint}</h3>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        )
    }
}

export {ApiResponse}