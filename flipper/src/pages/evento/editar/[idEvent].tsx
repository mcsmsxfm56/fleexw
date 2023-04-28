import React from 'react'
import AppLayout from '@/components/AppLayout/AppLayout'
import CreateEventForm from '../../../components/CrearEvento/CreateEventForm';
import { useRouter } from 'next/router';



const editarEvento = () => {
    const router = useRouter()
    const idEvent = router.query.idEvent as string
    console.log(idEvent);

    return (
        <div className='w-full h-screen'>
            <AppLayout>
                <CreateEventForm idEvent={idEvent} />
            </AppLayout>
        </div>
    )
}

export default editarEvento