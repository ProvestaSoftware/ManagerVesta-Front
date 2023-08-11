import React from 'react'
import Input from '../Inputs/Input'

const CheckForm = ({ item }) => {
    return (
        <form>
            <div className='print-form-container'>
                <Input
                    label="Numéro de chéque:"
                    placeholder="Num"
                    type="text"
                    defaultValue={item.num}
                />
                <Input
                    label="Montant:"
                    placeholder="Montant en dinars"
                    type="text"
                    defaultValue={item.montant}
                />
                <Input
                    label="Date:"
                    type="date"
                    defaultValue={item.dueDate}
                />
            </div>
        </form>
    )
}

export default CheckForm