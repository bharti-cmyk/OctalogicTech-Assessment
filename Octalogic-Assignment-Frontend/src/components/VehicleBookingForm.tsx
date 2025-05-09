import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'

type VehicleModel = {
  id: number
  name: string
}

type VehicleType = {
  id: number
  name: string
  category: string
  vehicles: VehicleModel[]
}

export default function BookingForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleModel: '',
    dateRange: [null, null] as [Date | null, Date | null],
  })
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([])

  useEffect(() => {
    if (formData.wheels) {
      axios
        .get('http://localhost:3000/api/vehicle-types', {
          params: { wheels: formData.wheels },
        })
        .then(res => setVehicleTypes(res.data))
    }
  }, [formData.wheels])

  const selectedType = vehicleTypes.find(
    t => t.id.toString() === formData.vehicleType
  )
  const availableModels = selectedType?.vehicles || []

  const handleNext = () => {
    if (step === 0 && (!formData.firstName || !formData.lastName)) return alert('Enter full name')
    if (step === 1 && !formData.wheels) return alert('Select wheels')
    if (step === 2 && !formData.vehicleType) return alert('Select vehicle type')
    if (step === 3 && !formData.vehicleModel) return alert('Select model')
    if (step === 4 && (!formData.dateRange[0] || !formData.dateRange[1])) return alert('Select date range')

    if (step < 4) setStep(prev => prev + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    try {
      const { firstName, lastName, vehicleModel, dateRange } = formData

      if (!vehicleModel || !dateRange[0] || !dateRange[1]) {
        return alert('Missing booking information')
      }

      const bookingPayload = {
        vehicleId: parseInt(vehicleModel),
        userName: `${firstName} ${lastName}`,
        from: dateRange[0].toISOString(),
        to: dateRange[1].toISOString(),
      }

      await axios.post('http://localhost:3000/api/bookings', bookingPayload)
      alert('Booking Successful')
    } catch (err) {
      console.error(err)
      alert('Booking Failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 0 && (
        <>
          <TextField
            label="First Name"
            fullWidth
            className="mb-4"
            value={formData.firstName}
            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={formData.lastName}
            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
          />
        </>
      )}

      {step === 1 && (
        <RadioGroup
          value={formData.wheels}
          onChange={e => setFormData({ ...formData, wheels: e.target.value })}
        >
          <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
          <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
        </RadioGroup>
      )}

      {step === 2 && (
        <RadioGroup
          value={formData.vehicleType}
          onChange={e => setFormData({ ...formData, vehicleType: e.target.value, vehicleModel: '' })}
        >
          {vehicleTypes.map(type => (
            <FormControlLabel
              key={type.id}
              value={type.id.toString()}
              control={<Radio />}
              label={type.name}
            />
          ))}
        </RadioGroup>
      )}

      {step === 3 && (
        <RadioGroup
          value={formData.vehicleModel}
          onChange={e => setFormData({ ...formData, vehicleModel: e.target.value })}
        >
          {availableModels.map(model => (
            <FormControlLabel
              key={model.id}
              value={model.id.toString()}
              control={<Radio />}
              label={model.name}
            />
          ))}
        </RadioGroup>
      )}

      {step === 4 && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex gap-2">
            <DatePicker
              label="Start Date"
              value={formData.dateRange[0]}
              onChange={date =>
                setFormData({ ...formData, dateRange: [date, formData.dateRange[1]] })
              }
              enableAccessibleFieldDOMStructure={false}
              slots={{ textField: TextField }}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <DatePicker
              label="End Date"
              value={formData.dateRange[1]}
              onChange={date =>
                setFormData({ ...formData, dateRange: [formData.dateRange[0], date] })
              }
              enableAccessibleFieldDOMStructure={false}
              slots={{ textField: TextField }}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </div>
        </LocalizationProvider>
      )}

      <Button className="mt-4 w-full" onClick={handleNext}>
        {step < 4 ? 'Next' : 'Submit'}
      </Button>
    </div>
  )
}
