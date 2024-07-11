import { h, Component } from 'preact';
import {useState} from "react";

interface ApiResponseProps {
    endpoint: string;
}

interface ApiResponseState {
    data: never | null;
    loading: boolean;
    error: Error | null;
    isCollapsed: false;
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

    toggleCollapse = () => { // Event handler to toggle collapse state
        this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
        console.log(this.state.isCollapsed)
    };

    render({endpoint}: ApiResponseProps, {data, loading, error}: ApiResponseState) {
        return(
            <div className={"api-response"}>
                <div className={"collapse-title"}>
                    <h3> x </h3>
                    <h3 onClick={this.toggleCollapse}>example response from {endpoint}</h3>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && <pre className={this.state.isCollapsed ? "hidden" : "visible"}>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        )
    }
}

export {ApiResponse}