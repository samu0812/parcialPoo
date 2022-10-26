import React from 'react'
import { useLibro } from '../Context/Contexto'
import { useNavigate } from 'react-router-dom'


const Crear = () => {
  const { nombre, edicion, autor, setNombre, setAutor, setEdicion, datosLibro} = useLibro();
  const navigate = useNavigate()

  const crearLibro = async(e) =>{
    await datosLibro(e)
    navigate('/')
  }
  

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Agregar Nuevo Libro</h1>

                <form onSubmit={crearLibro}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)}
                            type='text'
                            className= 'form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Edición</label>
                        <input
                            value={edicion}
                            onChange={ (e) => setEdicion(e.target.value)}
                            type='text'
                            className= 'form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Autor</label>
                        <input
                            value={autor}
                            onChange={ (e) => setAutor(e.target.value)}
                            type='text'
                            className= 'form-control'
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>Crear</button>
                    


                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Crear
