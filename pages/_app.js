import React from "react";
import {createStore} from "redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import LightLayout from "../components/Layout/LightLayout";
import {ApolloProvider} from "react-apollo";
import client from "../lib/client";

const reducer = (state = {searchTerm: ''}, action) => {
    switch (action.type) {
        case 'SEARCH':
            return {...state, searchTerm: action.payload};
        case 'SELECT_NODE':
            return {...state, selectedNode: action.payload};
        default:
            return state
    }
};

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
const makeStore = (initialState, options) => {
    return createStore(reducer, initialState);
};

class Kartenn extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return {pageProps};

    }

    render() {
        const {Component, pageProps, store} = this.props;

        return (
           <ApolloProvider client={client}>
               <LightLayout store={store}>
                   <Component {...pageProps} store={store} />
               </LightLayout>
           </ApolloProvider>
        );
    }
}

export default withRedux(makeStore)(Kartenn);
