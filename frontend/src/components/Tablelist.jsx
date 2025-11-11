export default function TableList() {
    const clients = [
        { id: 1, name: "John Doe", email: "john@gmail.com", job: "Designer", rate : "100", isactive: true },
         {id: 2, name: "John2 Doe", email: "john2@gmail.com", job: "Manager", rate : "101", isactive: true },
          { id: 3, name: "John3 Doe", email: "john3@gmail.com", job: "Developer", rate : "102", isactive: false },
    ]
    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="hover:bg-base-300">
                        {clients.map((client)=>(
                           <tr>
                            <th>{client.id}</th>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.job}</td>
                            <td>{client.rate}</td>
                            <td>
                                <button className={`btn rounded-xl w-20 ${client.isactive ? `btn-primary`: `btn-outline-primary`}`}> 
                                    {client.isactive ? 'Active': 'Inactive'}
                                </button>

                            </td>
                            <td>
                                <button className=" btn btn-secondary w-20">
                                  Update
                                </button>
                            </td>
                            <td>
                                <button className=" btn btn-accent w-20">
                                  Delete
                                </button>
                            </td>
                        </tr>
                        ))}
                 
  
                    </tbody>
                </table>
            </div>
        </>
    )
}