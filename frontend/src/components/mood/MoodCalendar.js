import React from 'react'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function MoodCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <StaticDatePicker orientation="landscape" />
    </LocalizationProvider>

  )
}

