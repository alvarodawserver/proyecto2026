import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { SubmitEvent } from 'react';
import { route } from 'ziggy-js';

export default function Create() {
    const { data, setData, post } = useForm({
        n_expediente: '',
        descripcion: '',
        tipo_contrato:'',
        importe_estimado:0.00,
        proc_adjudicacion:'',
        fecha_prevista:'',
        fecha_inicio:'',
        unidad_promotora:'',
        duracion_estimada:'',
        estado_expediente:'',
    });


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Crear Contrato',
            href: route('contratos.create'),
        },
    ];

    function submit(e: React.SubmitEvent) {
        e.preventDefault();
        post(route('contratos.store'));
    }

    return (
        <>
        <AppLayout breadcrumbs={breadcrumbs}>


        <form className="form" onSubmit={submit}>
                <div className="flex">
                    <label htmlFor="n_expediente">
                        <input placeholder="" type="text" className="input"
                            id='n_expediente'
                            value={data.n_expediente}
                            onChange={e => setData('n_expediente',e.target.value)}
                            />
                        <span>Número de expediente</span>
                    </label>

                    <label htmlFor="descripcion">
                        <input placeholder="" id='descripcion' type="text" className="input"
                            value={data.descripcion}
                            onChange={e => setData('descripcion',e.target.value)}

                        />
                        <span>Descripción</span>
                    </label>
                </div>

            <label>
                <input placeholder="" type="text" className="input"
                        value={data.tipo_contrato}
                        onChange={e => setData('tipo_contrato',e.target.value)}/>
                <span>Email</span>
            </label>

            <label>
                <input placeholder="" type="text" className="input"
                    value={data.importe_estimado}
                    onChange={e => setData('importe_estimado',
                    e.target.value === '' ? 0.00 : Number(e.target.value))} />
                <span>Password</span>
            </label>
            <label>
                <input placeholder="" type="text" className="input"
                        value={data.proc_adjudicacion}
                        onChange={e => setData('proc_adjudicacion',e.target.value)} />
                <span>Proceso de adjudicación</span>
            </label>
            <button className="submit">Finalizar</button>
        </form>
        </AppLayout>
        </>
    );
}
