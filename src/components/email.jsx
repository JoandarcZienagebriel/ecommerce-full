export default function Name({value, onChange}){

    return(
    <div>
        <input type="email" value={value}  className='w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     outline-none transition-all
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200' onChange={(e)=>onChange(e.target.value)}/>
       
    </div>
    )
}