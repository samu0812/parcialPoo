import React ,{ createContext, useContext,useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc, updateDoc} from 'firebase/firestore'
import { db } from '../Services/firebase.js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'


const LibrosContexto = createContext();

export default function ContextoProvider({children}){

    const MySwal = withReactContent(Swal)
    const {id} = useParams()
    const [libros, setLibros] = useState([])
    const[nombre, setNombre] = useState('')
    const[autor, setAutor] = useState('')
    const[edicion, setEdicion] = useState('')
    

    //referencia al db firestore
    const librosCollection = collection(db, "libro")

    //ver todos los DOCS
    const getLibros = async () => {
        const data = await getDocs(librosCollection)

        setLibros(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
    }

    //eliminar
    const deleteLibro = async (id) => {
        const LibroDoc = doc(db, "libro", id)
        await deleteDoc(LibroDoc)
        getLibros()
    }

    const confirDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteLibro(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    //useEfecct
    useEffect( () => {
        getLibros()
    }, [] )

    const datosLibro = async (e) => {
        e.preventDefault()
        await addDoc(librosCollection,  {nombre:nombre, autor:autor, edicion:edicion})
    }


    


    ///

    return(
        <LibrosContexto.Provider value={{MySwal, id, libros, 
        setLibros, setNombre, nombre, autor, setAutor, edicion, setEdicion, confirDelete, useEffect, datosLibro}}>
        {children}
        </LibrosContexto.Provider>
    )

}
export function useLibro() {
    const context = useContext(LibrosContexto);
    if (!context) throw new Error("El context esta Vacio");
    return context;
}