import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
//import { build } from 'vite';

//importing the api key from the .env file
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
;



//options object inside 
export const articleApi = createApi({ 
  reducerPath: 'articleApi',

  //this is the base url for the api as in which api do we want to call and more like the headers 
  baseQuery:fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',

    //setting the headers for the api call
    prepareHeaders: (headers) => {

      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

      return headers
    }

  }),


  endpoints: (builder) => ({
    getSummary: builder.query({
      //this is endpoint so in the website we need to go /summarize
      //we need to also pass the url of the page we want to summarize- this is the params
      //also we can decide how many paragraphs are going to be returned
      //we need to use the encodeURIComponent because the url the user pastes might have special characters
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
    })
  })

})

//redux creates a hook out of the endpoint
//this is called lazy because we can call it whenever we want rather than it immediately running when the component is rendered
//we want it to be lazy because we want to call it when the user clicks the button
export const {useLazyGetSummaryQuery} = articleApi;