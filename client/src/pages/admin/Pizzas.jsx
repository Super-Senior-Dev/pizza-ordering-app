import React, { useEffect, useState } from 'react'
import api from '../../api/axios';

const Pizzas = () => {
    const [pizzas,setPizzas]=useState([]);
    const [loading,setLoading]=useState(true);
    const [isAddOpen,setIsAddOpen]=useState(false);
    const [form,setForm]=useState({
        name:"",
        ingredients:"",
        desc:"",
        price:"",
        image:""
    })
    const [editingPizza,setEditingPizza]=useState(null);
    const [isEditOpen,setIsEditOpen]=useState(false)
    const [deletingPizza,setDeletingPizza]=useState(null);
    const [pagination,setPagination]=useState(null);
    const [search,setSearch]=useState('');

    
    const hadleDeletePizza=async()=>{
        if(!deletingPizza) return;
        try{
            await api.delete(`/admin/pizzas/${deletingPizza.id}`)
            setPizzas((prev)=>prev.filter((pizza)=>pizza.id !== deletingPizza.id))
            
            setDeletingPizza(null);
            
        }catch(error){
            console.log(error.response?.data||error.message);
        }
    }
    
    
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setForm((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    
    const openEditModal=(pizza)=>{
        setEditingPizza(pizza);

        setForm({
            name: pizza.name ||"",
            ingredients: pizza.ingredients ||"",
            desc: pizza.description ||"",
            price: pizza.price || "",
            image: pizza.image || ""
        });
        setIsEditOpen(true);
    }

    const handleAddPizza=async (e)=>{
        e.preventDefault();
        try{
            const response=await api.post('/admin/pizzas',form);
            setPizzas((prev)=> [...prev,response.data]);
            setForm({
                name:"",
                ingredients:"",
                desc:"",
                price:"",
                image:""
            })

            setIsAddOpen(false);
        }catch(error){
            console.log("Add pizza request:",error.response?.data)
        }
    }
    const handleUpdatePizza=async (e)=>{
        e.preventDefault();
        try{
            const response= await api.patch(`/admin/pizzas/${editingPizza.id}`,form);
            console.log("updated data:",response.data);
            setPizzas((prev)=>prev.map((pizza)=>pizza.id ===editingPizza.id ? response.data:pizza))
            setIsAddOpen(false)
            setEditingPizza(null);
            setForm({
                name:"",
                ingredients:"",
                image:"",
                price:"",
                desc:""
            });

        }catch(error){
            console.log(error.response?.data||error)
        }
    }

    const fetchPizzas=async(url="/admin/pizzas")=>{
        try{
            setLoading(true);
            const response=await api.get(url);
            console.log("Admin pizzas:",response.data);

            setPizzas(response.data.data);
            setPagination(response.data);
        }catch(error){
            console.log(
                error.response?.data || error.message
            );
        }finally{
            setLoading(false);
        }
    }
    
    const handleSearch=()=>{
        const params =new URLSearchParams();
        if(search.trim()){
            params.append('search',search.trim());
        }

        fetchPizzas(
            params.toString() ? `/admin/pizzas?${params.toString()}`:'/admin/pizzas'
        )
    }

    useEffect(()=>{
      fetchPizzas();  
    },[]);

    if(loading){
        return <div className='p-6 md:p-8'>
            <p className='text-gray-500'>Loading pizzas...</p>
        </div>
    }
  return (
    <div className='p-6 md:p-8'>
      {/* Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
            <p className='text-sm font-medium text-gray-900'>
                Pizza management
            </p>
            <h1 className='mt-1 text-3xl font-bold text-gray-900'>
                Manage Pizzas
            </h1>
            <p className='mt-2 text-gray-500'>
                Add, edit, or remove pizzas from your menu.
            </p>
        </div>
        <button className='rounded-xl bg-red-600 px-5 py-3 font-semibold text-white trasnition hover:bg-red-700' type='button' onClick={()=>setIsAddOpen(true)}>
            + Add Pizza
        </button>
      </div>

      {/* Search */}
      <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
        <div className='relative flex-1'>
            <span className='pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.8}
                    stroke='currentColor'
                    className='h-5 w-5'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.04 6.04a7.5 7.5 0 0 0 10.61 10.61Z'
                    />
                </svg>
            </span>
            <input type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key==='Enter'){
                    handleSearch();
                }
            }}
            placeholder='Search pizzas by name, ingredients, or description'
            className='w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            />
        </div>
        <button type='button'
        onClick={handleSearch}
        className='rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600'
        >
            Search
        </button>
      </div>

      {/* Pizza list */}
      {
        pizzas.length > 0 ? (
            <>
                <div className='mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 '>
                    {pizzas.map((pizza,index)=>(
                        <div key={index} className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm '>

                            {/* Image */}
                            <div className='flex h-48 items-center justify-center bg-gray-100'>
                                {
                                    pizza.image ? (
                                        <img src="https://images.unsplash.com/photo-1579751626657-72bc17010498" alt="Image" 
                                        className='h-full w-full object-cover'
                                        />
                                    ):(
                                        <span className='text-gray-400'>
                                            No image
                                        </span>
                                    )
                                }
                            </div>

                            {/* Content */}
                            <div className='p-5'>
                                <div className='flex items-start justify-between gap-4'>
                                    <h2 className='text-lg font-bold text-gray-900'>
                                        {pizza.name}
                                    </h2>
                                    <span className='shrink-0 font-bold text-red-600'>
                                        ${Number(pizza.price).toFixed(2)}
                                    </span>
                                </div>
                                <p className='mt-3 line-clamp-2 text-sm text-gray-500'>
                                    {pizza.description}
                                </p>
                                <p className='mt-3 text-sm text-gray-600'>
                                    <span className='font-semibold'>Ingredients:</span>{" "}{pizza.ingredients}
                                </p>
                                {/* Actions */}
                                <div className='mt-5 flex gap-3 border-t border-gray-100 pt-4'>
                                    <button className='flex-1 rounded-xl border border-gray-200 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50'
                                    type='button'
                                    onClick={()=>openEditModal(pizza)}
                                    >
                                        Edit
                                    </button>
                                    <button className='flex-1 rounded-xl bg-red-50 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-100'
                                    type='button'
                                    onClick={()=>setDeletingPizza(pizza)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

                {/* Pagination */}

                {
                    pagination && (
                        <div className='mt-8 flex items-center justify-between gap-4'>
                            <button type='button'
                            disabled={!pagination.prev_page_url}
                            onClick={()=>fetchPizzas(pagination.prev_page_url)}
                            className='rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'

                            >
                                ← Previous
                            </button>
                            <p className='text-sm text-gray-500'>
                                Page {pagination.current_page} of {pagination.last_page}
                            </p>
                            <button
                            type='button'
                            className='rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
                            disabled={!pagination.next_page_url}
                            onClick={()=>setPizzas(pagination.next_page_url)}
                            >
                                 Next →
                            </button>
                        </div>
                    )
                }
                
            </>
            
        ) : (
            <div className='mt-8 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center'>
                <p className='font-medium text-gray-900'>
                    No pizzas found.
                </p>
                <p className='mt-2 text-sm text-gray-500'>
                    Add your first pizza to start building your menu
                </p>
            </div>
        )
      }
      {
        isAddOpen &&(
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
                <div className='shadow-xl p-6 bg-white rounded-2xl overflow-y-auto max-w-lg w-full max-h-[90vh]'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-bold text-gray-900'>
                            Add Pizza
                        </h2>
                        <button className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100' type='button' onClick={()=>setIsAddOpen(false)}>
                            ✕
                        </button>
                    </div>
                    <form onSubmit={handleAddPizza} className='mt-6 space-y-5'>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Pizza name
                            </label>
                            <input type="text"
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            required
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Ingredients
                            </label>
                            <input type="text"
                            name='ingredients'
                            value={form.ingredients}
                            onChange={handleChange}
                            required
                            placeholder='Cheese, tomato, chicken'
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Description
                            </label>
                            <textarea name="desc"
                            value={form.desc}
                            onChange={handleChange}
                            required
                            rows="4"
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Price
                            </label>
                            <input type="number"
                            name='price'
                            value={form.price}
                            required
                            min="1"
                            step="0.01"
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Image url
                            </label>
                            <input type="text"
                            name='image'
                            value={form.image}
                            onChange={handleChange}
                            required
                            placeholder='http://...'
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div className='flex gap-3 pt-2'>
                            <button className='flex rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50'
                            type='button'
                            onChange={()=>setIsAddOpen(false)}
                            >
                                Cancel
                            </button>
                            <button type='submit' className='flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700'>
                                Add pizza
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
      }
        {/* Update */}
      {
        isEditOpen && editingPizza && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
                <div className='max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-bold text-gray-900'>
                            Edit Pizza
                        </h2>
                        <button type='button' onClick={()=>{
                            setIsEditOpen(false);
                            setEditingPizza(null);
                        }} className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100'>
                            ✕
                        </button>
                    </div>
                    <form onSubmit={handleUpdatePizza} className='mt-6 space-y-5'>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Pizza name
                            </label>
                            <input type="text"
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            required
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div >
                            <label className='block text-sm font-semibold text-gray-700'>Ingredients</label>
                            <input type="text" 
                            name="ingredients"
                            value={form.ingredients}
                            onChange={handleChange}
                            required
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700'>Description</label>
                            <textarea name="desc"
                            value={form.desc}
                            onChange={handleChange}
                            required 
                            rows="4"
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div >
                            <label className='block text-sm font-semibold text-gray-700'>
                                Price
                            </label>
                            <input type="number"
                            name='price'
                            value={form.price}
                            onChange={handleChange}
                            required
                            min="1"
                            step="0.01"
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div>
                            <label className='block font-semibold text-sm text-gray-700'>
                                Image url
                            </label>
                            <input type="text"
                            name='image'
                            value={form.image}
                            required
                            onChange={handleChange}
                            className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
                            />
                        </div>
                        <div className='flex flex-col gap-3 pt-2 sm:flex-row'>
                            <button className='flex-1 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50'
                            type='button'
                            onClick={()=>{
                                setIsEditOpen(false);
                                setEditingPizza(null);
                            }}

                            >
                                Cancel
                            </button>
                            <button type='submit' 
                            className='flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700'
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
      }
      {/* Delete */}
      {
        deletingPizza &&(
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4'>
                <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'>
                    <h2 className='text-xl font-bold text-gray-900'>
                        Delete Pizza?
                    </h2>
                    <p className='mt-3 text-gray-500'>
                        Are you sure you want to delete{" "}
                        <span className='font-semibold text-gray-900'>{deletingPizza.name}</span>
                        ? This action cannot be indone.
                    </p>
                    <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                        <button type='button'
                        onClick={()=>setDeletingPizza(null)}
                        className='flex-1 rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50'
                        >
                            Cancel
                        </button>
                        <button type='button'
                        onClick={hadleDeletePizza}
                        className='flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700'
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default Pizzas
