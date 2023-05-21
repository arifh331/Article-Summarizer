import React from 'react'
import { useEffect, useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

function Demo() {
 //article is object of the url of the article and the summary
 const [article, setArticle] = useState({
  url: '',
  summary: ''
 })

//I am goint to have a list of all the articles that I have summarized
const [allArticles, setAllArticles] = useState([])

//state for copyied
const [copied,setCopied]=useState('')


 
 //this is the hook that will fetch the data from the api
 //the function that will actually call to get the summary of the article
 const [getSummary,{error,isFetching}] = useLazyGetSummaryQuery() 
 


 //useEffect because we want to put the articles in local storage
 useEffect(()=>{

  //this is getting the data from the local storage
  const articlesFromLocalStorage=JSON.parse(localStorage.getItem('articles'))
  
  //if there is data(articles) in the local storage, then we want to set the articles to the data from the local storage
  if (articlesFromLocalStorage){
    setAllArticles(articlesFromLocalStorage)
  }

 },[])
 
 //this is the async function that will fetch the data from the api and handle the request
 const handleSubmit = async (e) => {
  e.preventDefault()
  const {data} = await getSummary({articleUrl:article.url})
  
  //if the data is not null, then we want to update the article with the summary
  if (data?.summary){ 
    const newArticle= {...article,summary:data.summary};
    
    //we want to add the new article to the list of all articles
    const updatedAllArticles=[newArticle,...allArticles]
    //we want to update the list of all articles
    setAllArticles(updatedAllArticles)

    setArticle(newArticle)
    
    //we want to save the updatedarticleslist to the local storage
    localStorage.setItem('articles',JSON.stringify(updatedAllArticles))
    console.log(newArticle)

  
  

    
  }
 }
  
 const handleCopy =(copyUrl)=>{
  setCopied(copyUrl)
  //this is the built in function that will copy the text to the clipboard
  navigator.clipboard.writeText(copyUrl)
  
  //after a bit of time we want to show that the copy has been successful
  setTimeout(()=>setCopied(false), 3000)
 }


  return (
    <section className='mt-16 w-full max-w-xl'>

      {/* THere is going to be the search bar where you add the url */}
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>

          <img src={linkIcon} className='absolute left-0 my-2 ml-2 w-5'/>
          <input type='url' placeholder='Enter the URL' value={article.url} onChange={(e)=>setArticle({
            ...article,url:e.target.value})} required className='url_input peer'/>

          {/* The peer focus simply means that when I focus on the bar, everything becomes focus, including the end */}

          <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>↵ </button>

        </form>

        {/* We want to be able to see past urls so this a url history section */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item,index) => (
            
            //over in the old articles, we want to be able to click on the oldarticle and display old summary without making a call
            <div key={`link-${index}`} onClick={()=>setArticle(item)} className='link_card'> 
              <div className='copy_btn' onClick={()=>handleCopy(item.url)}>
                
                {/* I am displaying the copy icon here  */}
                {/* If it is succesfully copied show a tick otherwise show copy icon */}
                <img src={copied === item.url ? tick :copy} 
                alt='copy_icon' className='w-[40%] h-[40%] object-contain' />
                
              </div>
              
              {/* I am displaying the previous url here and if it is too long the truncate class is giving dots */}
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>
              
            </div>
          
          ))}
        </div>
      </div>

      {/* Display the results */}

      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>Well that wasn't supposed to happen
          <br />
          <span className='font-satoshi font-normal text-gray-700'>{error?.data?.error}</span>
          </p>
        ):(
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>

              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
              </div>
              
            </div>
          )
        )}
        
     
      </div>

    </section>
  )
}

export default Demo