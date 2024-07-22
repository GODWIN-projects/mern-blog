import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from './PostCard'

const Search = () => {

    const [formdata,setFormdata] = useState({
        searchTerm: "",
        sort: "desc",
        category: "uncategorized",
    })
    const [posts,setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search)
        const searchTermURL = urlParams.get('searchTerm')
        const sortURL = urlParams.get('sort')
        const categoryURL = urlParams.get('category')
        if (searchTermURL || sortURL || categoryURL) {
            setFormdata({
                ...formdata,
                sort: sortURL,
                searchTerm: searchTermURL,
                category: categoryURL
            })
        }

        const fetchPosts = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/post/getposts?${searchQuery}`)
            if (!res.ok) {
                setLoading(false)
                return
            }
            if (res.ok) {
                const data = await res.json()
                setPosts(data.posts.slice(0,9))
                setShowMore(data.show)
                setLoading(false)
            }
        }
        fetchPosts()
    },[location.search])


    const handleChange = (e) => {
        if (e.target.id == 'searchTerm'){
            setFormdata({...formdata, searchTerm: e.target.value})
        }
        if (e.target.id == 'sort') {
            const order = e.target.value || 'desc'
            setFormdata({...formdata, sort: order})
        }
        if (e.target.id == 'category') {
            const category = e.target.value || 'uncategorized'
            setFormdata({...formdata, category})
        }
        console.log(formdata)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', formdata.searchTerm)
        urlParams.set('sort',formdata.sort)
        urlParams.set('category', formdata.category)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }


    const handleShowMore = async() => {
        const startIndex = posts.length
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex',startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/post/getposts&${searchQuery}`)
        if (!res.ok) {
            return
        }
        if (res.ok) {
            const data = await res.json()
            setPosts([...posts, ...data.posts.slice(0,9)])
            setShowMore(data.show)
        }
    }


  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                <div className='flex items-center gap-2'>
                    <label className=' whitespace-nowrap font-semibold'>
                        Search Term
                    </label>
                    <TextInput
                        placeholder='Search..'
                        id='searchTerm'
                        type='text'
                        value={formdata.searchTerm}
                        onChange={handleChange}/>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>
                        Sort
                    </label>
                    <Select onChange={handleChange} value={formdata.sort}
                        id='sort'>
                        <option value={'desc'}>Latest</option>
                        <option value="asc">Oldest</option>
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>
                        Category
                    </label>
                    <Select onChange={handleChange} value={formdata.category}
                        id='category'>
                        <option value={"uncategorized"}>Uncategorized</option>
                        <option value={"food"}>Food</option>
                        <option value={"lifestyle"}>LifeStyle</option>
                        <option value={"travel"}>Travel</option>
                        <option value={"others"}>Others</option>
                    </Select>
                </div>
                <Button type='submit' outline gradientDuoTone={"tealToLime"}>
                    Search
                </Button>
            </form>
        </div>
        <div className='w-full'>
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500
                p-3 mt-5'>
                Search Results
            </h1>
            <div className='p-7 flex flex-wrap gap-4 justify-center'>
                {
                    !loading && posts.length === 0 &&
                    (
                        <p className='text-xl text-gray-500'>
                            No posts found
                        </p>
                    )
                }
                {
                    loading && <p className='text-xl text-gray-500'>
                        Loading....</p>
                }
                {
                    !loading && posts && posts.map((post) => {
                        return <PostCard post={post}/>
                    })
                }
                {
                    showMore && <button className='text-blue-500
                    hover:underline p-7 w-full' onClick={handleShowMore}>show more</button>
                }
            </div>
        </div>
    </div>
  )
}

export default Search