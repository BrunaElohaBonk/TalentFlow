import './alert.css'

interface AlertProps {
  message: string
  visible: boolean
}

function Alert({ message, visible }: AlertProps) {
  if (!visible) return null

  return (
    <div className="alert-overlay">
      <div className="alert-card">
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Alert