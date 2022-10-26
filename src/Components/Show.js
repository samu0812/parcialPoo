import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
import { useLibro } from '../Context/Contexto'
const MySwal = withReactContent(Swal)

const Show = () => {
    const {libros, confirDelete,} = useLibro();

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className="d-grid gap-2">
                            <Link to="/crear" className='btn btn-secondary mt-2 mb-2'>Crear</Link>
                        </div>
                        <table className='table table-warning table-hover'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Edición</th>
                                    <th>Autor</th>
                                    <th>Opcion</th>
                                </tr>
                            </thead>

                            <tbody>
                                {libros.map((libro) => (
                                    <tr key={libro.id}>
                                        <td>{libro.nombre}</td>
                                        <td>{libro.edicion}</td>
                                        <td>{libro.autor}</td>
                                        <td>
                                            <Link to={`/editar/${libro.id}`}><i className="fa-solid fa-user-pen"></i></Link>
                                            <button onClick={() => {confirDelete(libro.id)}} className="btn btn-danger"><i className="fa-regular fa-trash-can"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Show