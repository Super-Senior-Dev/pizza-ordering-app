import React from 'react'

const StatusBadges = ({status}) => {
    const styles={
        pending:'bg-yellow-50 text-yellow-700',
        preparing:'bg-blue-50 text-blue-700',
        delivered:'bg-green-50 text-green-700',
        canceled:'bg-red-50 text-red-700'
    }
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
        styles[status]||'bg-gray-50 text-gray-700'
    }`}>
      {status}
    </span>
  )
}

export default StatusBadges;
