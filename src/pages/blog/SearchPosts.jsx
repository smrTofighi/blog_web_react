import React, { useEffect, useState } from 'react'
import BlogLayout from '../../components/layouts/BlogLayout/BlogLayout'
import axiosInstance from '../../utils/AxiosInstance'
import { API_PATHS } from '../../utils/ApiPath'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BlogPostSummaryCard from './components/BlogPostSummaryCard'
import moment from 'moment'
const SearchPosts = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
     try {
      const response = await axiosInstance.get(API_PATHS.POSTS.SEARCH, {
        params:{ q: query }
      });

      if(response.data){
        setSearchResults(response.data || [])
      }
     } catch (error) {
      console.error("Error fetching blog posts from server", error);
      
     }
  };


  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(()=>{
    console.log('query', query);
    handleSearch();
    return ()=>{ }
  }, [query])
  return (
    <BlogLayout>
      <div >
        <h3 className='text-lg font-medium'>
          Showing search results matching "
         <span className='font-semibold'>{query}</span>"
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          {searchResults.length > 0 && searchResults.map((post)=>(
            <BlogPostSummaryCard key={post._id} title={post.title} coverImageUrl={post.coverImageUrl} description={post.content}
            tags={post.tags}
            updateOn={
              post.updatedAt
              ? moment(post.updatedAt).format("Do MMM YYYY")
              : '-'
            }
            authorName={post.author.name}
            authorProfileImg={post.author.profileImageUrl}
            onClick={() => handleClick(post)}
            />
          ))}
        </div>
      </div>
    </BlogLayout>
  )
}

export default SearchPosts