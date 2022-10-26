import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLibro } from '../Context/Contexto'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Services/firebase.js'

const Editar = () => {
    const { nombre, edicion, autor, setNombre, setAutor, setEdicion } = useLibro();
    const { id } = useParams()
    const navigate= useNavigate()

    const update = async (e) => {
        e.preventDefault()
        const libro = doc(db, "libro", id)
        const data = { nombre: nombre, autor: autor, edicion: edicion }
        await updateDoc(libro, data)
        navigate('/')
    }

    const getLibrobyId = async (id) => {
        const libro = await getDoc(doc(db, "libro", id))
        if (libro.exists()) {
            setNombre(libro.data().nombre)
            setAutor(libro.data().autor)
            setEdicion(libro.data().edicion)
        } else {
            console.log("NO")
        }

    }
    useEffect(() => {
        getLibrobyId(id)
    }, [])


    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Editar Libro</h1>

                    <form onSubmit={update}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Edición</label>
                            <input
                                value={edicion}
                                onChange={(e) => setEdicion(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Autor</label>
                            <input
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>

                        <button type='submit' className='btn btn-primary'>Update</button>


                    </form>
                </div>
            </div>

        </div>
    )
}

export default Editar
