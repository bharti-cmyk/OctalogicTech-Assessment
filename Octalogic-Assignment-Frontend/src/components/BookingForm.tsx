import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Stack,
  Paper,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import toast from 'react-hot-toast'
import config from '../config';

const API = config.API;


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

const stepLabels = [
  'Your Name',
  'Select Wheels',
  'Select Vehicle Type',
  'Select Vehicle Model',
  'Choose Date Range',
  'Review & Confirm',
]

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (formData.wheels) {
      axios
        .get(`${API}/vehicle-types`, {
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
    if (step === 0 && (!formData.firstName || !formData.lastName)) return toast.error('Enter full name')
    if (step === 1 && !formData.wheels) return toast.error('Select wheels')
    if (step === 2 && !formData.vehicleType) return toast.error('Select vehicle type')
    if (step === 3 && !formData.vehicleModel) return toast.error('Select model')
    if (step === 4 && (!formData.dateRange[0] || !formData.dateRange[1])) return toast.error('Select date range')

    if (step < 5) setStep(prev => prev + 1)
    else handleSubmit()
  }

  const handleBack = () => {
    if (step > 0) setStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const { firstName, lastName, vehicleModel, dateRange } = formData

      if (!vehicleModel || !dateRange[0] || !dateRange[1]) {
        return toast.error('Missing booking information')
      }

      const bookingPayload = {
        vehicleId: parseInt(vehicleModel),
        userName: `${firstName} ${lastName}`,
        from: dateRange[0].toISOString(),
        to: dateRange[1].toISOString(),
      }

      await axios.post(`${API}/bookings`, bookingPayload)
      toast.success('Booking Successful')
      setStep(0)
      setFormData({
        firstName: '',
        lastName: '',
        wheels: '',
        vehicleType: '',
        vehicleModel: '',
        dateRange: [null, null],
      })
    } catch (err) {
      console.error(err)
      toast.error('Booking Failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: '#f3f4f6',
        px: 2,
        py: 2,
        overflow: 'hidden',
      }}
    >
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 800, p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight="bold">Step {step + 1} of {stepLabels.length}</Typography>
          <Typography variant="body2" color="textSecondary">{stepLabels[step]}</Typography>
        </Box>

        <Stack spacing={4}>
          {step === 0 && (
            <Stack spacing={2} alignItems="center">
              <Typography variant="h6">First, what’s your name?</Typography>
              <TextField
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              />
              <TextField
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Stack>
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
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <DatePicker
                  label="Start Date"
                  value={formData.dateRange[0]}
                  onChange={date => setFormData({ ...formData, dateRange: [date, formData.dateRange[1]] })}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="End Date"
                  value={formData.dateRange[1]}
                  onChange={date => setFormData({ ...formData, dateRange: [formData.dateRange[0], date] })}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Stack>
            </LocalizationProvider>
          )}

          {step === 5 && (
            <Stack spacing={1}>
              <Typography><strong>Name:</strong> {formData.firstName} {formData.lastName}</Typography>
              <Typography><strong>Wheels:</strong> {formData.wheels}</Typography>
              <Typography><strong>Vehicle Type:</strong> {vehicleTypes.find(t => t.id.toString() === formData.vehicleType)?.name}</Typography>
              <Typography><strong>Vehicle Model:</strong> {availableModels.find(m => m.id.toString() === formData.vehicleModel)?.name}</Typography>
              <Typography><strong>Date Range:</strong> {formData.dateRange[0]?.toLocaleDateString()} to {formData.dateRange[1]?.toLocaleDateString()}</Typography>
            </Stack>
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={4}>
          {step > 0 && (
            <Button variant="outlined" onClick={handleBack} fullWidth>Back</Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              isSubmitting ||
              (step === 0 && (!formData.firstName || !formData.lastName)) // Check if first and last name are missing on step 0
            }
            fullWidth
          >
            {step < 5 ? 'Next' : 'Confirm Booking'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
