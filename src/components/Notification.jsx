export const Notification = ({ message, isError }) => {
  if (message === '') {
    return null
  }
  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return <div style={style}>{message}</div>
}
